import { pool } from '../../database';
import { LikeData, SongData } from './types';
import schemaName from '../../../config';

export const getSongByAudio = async (audio: string): Promise<any> => {
  try {
    const songResult = await pool.query(`SELECT * FROM ${schemaName}.songs WHERE audio = $1`, [audio]);
    const songId = songResult.rows[0]?.id;
    if (!songId) {
      return null;
    }
    const artistResult = await pool.query(
      `SELECT * 
     FROM ${schemaName}.song_artists AS song_artists
     JOIN ${schemaName}.users AS users ON users.id = song_artists.user_id
     WHERE song_artists.song_id = $1`,
      [songId],
    );

    const artists = artistResult.rows.map((row) => row);

    return { ...songResult.rows[0], artists };
  } catch (error) {
    console.log(error);
  }
};

export const getLikesBySongId = async (song_id: number): Promise<LikeData[]> => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT ON (${schemaName}.likes.user_id)
        ${schemaName}.likes.user_id, ${schemaName}.likes.song_id, ${schemaName}.users.display_name, ${schemaName}.users.profile_picture, ${schemaName}.users.wallet
        FROM ${schemaName}.likes
        JOIN ${schemaName}.users ON ${schemaName}.likes.user_id = ${schemaName}.users.id
        WHERE ${schemaName}.likes.song_id = $1`,
      [song_id],
    );

    const likes = result.rows.map((row) => ({
      user_id: row.user_id,
      song_id: row.song_id,
      display_name: row.display_name,
      profile_picture: row.profile_picture,
      wallet: row.wallet,
    }));
    console.log(likes);

    return likes;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export async function createSong(songData: SongData, user_id: number) {
  const { audio, cover, duration, isPublic, track_name, type, submission_data, cyanite_id, created, total_likes } = songData;

  // Begin a transaction
  await pool.query('BEGIN');

  try {
    // Insert the new song into the song table
    const songQuery = `
        INSERT INTO ${schemaName}.songs (
          audio, cover, duration, public, track_name, type,
          submission_data, cyanite_id, created, total_likes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id;
      `;

    const songValues = [audio, cover, duration, isPublic, track_name, type, submission_data, cyanite_id, created, total_likes];

    const songResult = await pool.query(songQuery, songValues);
    const songId = songResult.rows[0].id;

    // Insert the song artist into the song_artists table
    const artistQuery = `
        INSERT INTO ${schemaName}.song_artists (song_id, user_id, verified, ownership_percent)
        VALUES ($1, $2, $3, $4);
      `;

    // Assuming the user is verified and has 100% ownership by default
    const verified = true;
    const ownership_percent = 100;

    const artistValues = [songId, user_id, verified, ownership_percent];
    await pool.query(artistQuery, artistValues);

    // Commit the transaction
    await pool.query('COMMIT');

    return { songId, ...songData, user_id, verified, ownership_percent };
  } catch (error: any) {
    // Rollback the transaction in case of an error
    await pool.query('ROLLBACK');
    throw new Error(`Unable to create song: ${error.message}`);
  }
}

export async function deleteSong(song_id: number) {
  // Begin a transaction
  await pool.query('BEGIN');

  try {
    // Delete song's likes
    const deleteLikesQuery = `
        DELETE FROM ${schemaName}.likes WHERE song_id = $1;
      `;
    await pool.query(deleteLikesQuery, [song_id]);

    // Delete song's artists entries
    const deleteSongArtistsQuery = `
        DELETE FROM ${schemaName}.song_artists WHERE song_id = $1;
      `;
    await pool.query(deleteSongArtistsQuery, [song_id]);

    // Delete song
    const deleteSongQuery = `
        DELETE FROM ${schemaName}.songs WHERE id = $1;
      `;
    await pool.query(deleteSongQuery, [song_id]);

    // Commit the transaction
    await pool.query('COMMIT');

    return { success: true, message: 'Song deleted successfully.' };
  } catch (error: any) {
    // Rollback the transaction in case of an error
    await pool.query('ROLLBACK');
    throw new Error(`Unable to delete song: ${error.message}`);
  }
};

export const likeSong = async (songId: number, userId: number) => {
  try {
    await pool.query('BEGIN');

    const userDataQuery = `SELECT display_name FROM ${schemaName}.users WHERE id = $1`;
    const userResult = await pool.query(userDataQuery, [userId]);
    const displayName = userResult.rows[0].display_name;

    const songDataQuery = `SELECT track_name FROM ${schemaName}.songs WHERE id = $1`;
    const songResult = await pool.query(songDataQuery, [songId]);
    const trackName = songResult.rows[0].track_name;

    // Create a new event in heds.song_events table
    const eventType = 'song_like'; 
    const eventData = {
      message: 'liked a track',
      subject: `${trackName} by ${displayName}`,
    };

    const songEventQuery = `
      INSERT INTO ${schemaName}.song_events (event_type, event_data, timestamp, song_id, user_id)
      VALUES ($1, $2, $3, NOW(), $4);
    `;
    const songEventValues = [eventType, JSON.stringify(eventData), new Date(), songId, userId];
    await pool.query(songEventQuery, songEventValues);

    // Increment total_likes in heds.songs table
    const updateTotalLikesQuery = `UPDATE ${schemaName}.songs SET total_likes = total_likes + 1 WHERE id = $1`;
    await pool.query(updateTotalLikesQuery, [songId]);

    // Update heds.likes table with song_id and user_id
    const likesQuery = `INSERT INTO ${schemaName}.likes (song_id, user_id) VALUES ($1, $2)`;
    await pool.query(likesQuery, [songId, userId]);

    await pool.query('COMMIT');
  } catch (error: any) {
    await pool.query('ROLLBACK');
    throw new Error(`Unable to like song: ${error.message}`);
  }
};

export const unlikeSong = async (songId: number, userId: number) => {
  try {
    await pool.query('BEGIN');

    // Remove the like from heds.likes table
    const removeLikeQuery = `DELETE FROM ${schemaName}.likes WHERE song_id = $1 AND user_id = $2`;
    await pool.query(removeLikeQuery, [songId, userId]);

    // Decrement total_likes in heds.songs table
    const updateTotalLikesQuery = `UPDATE ${schemaName}.songs SET total_likes = total_likes - 1 WHERE id = $1`;
    await pool.query(updateTotalLikesQuery, [songId]);

    // Remove the like event from heds.song_events table
    const removeSongEventQuery = `
      DELETE FROM ${schemaName}.song_events
      WHERE song_id = $1 AND user_id = $2 AND event_type = 'song_like';
    `;
    await pool.query(removeSongEventQuery, [songId, userId]);

    await pool.query('COMMIT');
  } catch (error: any) {
    await pool.query('ROLLBACK');
    throw new Error(`Unable to unlike song: ${error.message}`);
  }
};

export const getSongEventsById = async (song_id: number) => {
  const query = `SELECT * FROM ${schemaName}.song_events WHERE song_id = $1`;
  const { rows } = await pool.query(query, [song_id]);
  return rows;
};
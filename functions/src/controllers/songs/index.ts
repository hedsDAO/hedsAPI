import { pool } from '../../database';
import { SongData } from './types';
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

export const getSongsByAudio = async (audioIds: string[]): Promise<any[]> => {
  try {
    const songsResult = await pool.query(`SELECT * FROM ${schemaName}.songs WHERE audio = ANY($1)`, [audioIds]);
    if (!songsResult.rows.length) {
      return [];
    }

    const songIds = songsResult.rows.map((song) => song.id);
    const artistResult = await pool.query(
      `SELECT *
       FROM ${schemaName}.song_artists AS song_artists
       JOIN ${schemaName}.users AS users ON users.id = song_artists.user_id
       WHERE song_artists.song_id = ANY($1)`,
      [songIds],
    );

    const artistMap: { [songId: string]: any[] } = {};

    artistResult.rows.forEach((row) => {
      if (!artistMap[row.song_id]) {
        artistMap[row.song_id] = [];
      }
      artistMap[row.song_id].push(row);
    });

    const songsWithArtists = songsResult.rows.map((song) => ({
      ...song,
      artists: artistMap[song.id] || [],
    }));

    return songsWithArtists;
  } catch (error: any) {
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
}

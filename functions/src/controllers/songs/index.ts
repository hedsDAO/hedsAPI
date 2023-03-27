import { pool } from '../../database';
import { SongData } from './types';

export const getSongByAudio = async (audio: string): Promise<any> => {
    const songResult = await pool.query(
      'SELECT id FROM heds.songs WHERE audio = $1',
      [audio]
    );
  
    const songId = songResult.rows[0]?.id;
    if (!songId) {
      throw new Error('Song not found');
    }
  
    const artistResult = await pool.query(
      'SELECT user_id FROM heds.song_artists WHERE song_id = $1',
      [songId]
    );
  
    const artists = artistResult.rows.map(row => row.user_id);
  
    return { ...songResult.rows[0], artists };
  };
  
export async function createSong(songData: SongData, user_id: number) {
    const {
      audio,
      cover,
      duration,
      isPublic,
      track_name,
      type,
      submission_data,
      cyanite_id,
      created,
      total_likes,
    } = songData;
  
    // Begin a transaction
    await pool.query('BEGIN');
  
    try {
      // Insert the new song into the song table
      const songQuery = `
        INSERT INTO heds.songs (
          audio, cover, duration, public, track_name, type,
          submission_data, cyanite_id, created, total_likes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id;
      `;
  
      const songValues = [
        audio,
        cover,
        duration,
        isPublic,
        track_name,
        type,
        submission_data,
        cyanite_id,
        created,
        total_likes,
      ];
  
      const songResult = await pool.query(songQuery, songValues);
      const songId = songResult.rows[0].id;
  
      // Insert the song artist into the song_artists table
      const artistQuery = `
        INSERT INTO heds.song_artists (song_id, user_id, verified, ownership_percent)
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
  };

  export async function deleteSong(song_id: number) {
    // Begin a transaction
    await pool.query('BEGIN');
  
    try {
      // Delete song's likes
      const deleteLikesQuery = `
        DELETE FROM heds.likes WHERE song_id = $1;
      `;
      await pool.query(deleteLikesQuery, [song_id]);
  
      // Delete song's artists entries
      const deleteSongArtistsQuery = `
        DELETE FROM heds.song_artists WHERE song_id = $1;
      `;
      await pool.query(deleteSongArtistsQuery, [song_id]);
  
      // Delete song
      const deleteSongQuery = `
        DELETE FROM heds.songs WHERE id = $1;
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
  


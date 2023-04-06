import { pool } from '../../database';
import { LikeData, SongData } from '../songs/types';
import schemaName from '../../../config';

export const addLike = async (user_id: number, song_id: number) => {
    if (!user_id || !song_id) {
        throw new Error('Request body is missing');
      }
    try {

    // Begin a transaction
    await pool.query('BEGIN');

    // Add the like to the likes table
    const insertQuery = `
      INSERT INTO ${schemaName}.likes (user_id, song_id) VALUES ($1, $2);
    `;
    await pool.query(insertQuery, [user_id, song_id]);

    // Update the total likes for the song in the songs table
    const updateSongLikes = `
      UPDATE ${schemaName}.songs
      SET total_likes = COALESCE(total_likes, 0) + 1
      WHERE id = $1;
    `;
    await pool.query(updateSongLikes, [song_id]);

    // Commit the transaction
    await pool.query('COMMIT');
      return;
    } catch (error: any) {
      await pool.query('ROLLBACK');
      return error;
    }
  };
  
  export const removeLike = async (user_id: number, song_id: number) => {
    if (!user_id || !song_id) {
        throw new Error('Request body is missing');
      }
    try {  
    // Begin a transaction
    await pool.query('BEGIN');

    // Remove the like from the likes table
    const deleteQuery = `
      DELETE FROM ${schemaName}.likes WHERE user_id = $1 AND song_id = $2;
    `;
    await pool.query(deleteQuery, [user_id, song_id]);

    // Update the total likes for the song in the songs table if it has at least one like
    const updateSongLikes =  `
    UPDATE ${schemaName}.songs
    SET total_likes = CASE
      WHEN total_likes > 1 THEN total_likes - 1
      ELSE 0
    END
    WHERE id = $1 AND total_likes IS NOT NULL;
  `;
    await pool.query(updateSongLikes, [song_id]);

    // Commit the transaction
    await pool.query('COMMIT');
      return;
    } catch (error: any) {
      await pool.query('ROLLBACK');
      return error;
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

  export const getLikesByUserId = async (user_id: number): Promise<SongData[]> => {
    try {
    const likeResult = await pool.query(`SELECT song_id FROM ${schemaName}.likes WHERE user_id = $1`, [user_id]);
  
    const likedSongIds = likeResult.rows.map((row) => row.song_id);
  
    if (likedSongIds.length === 0) {
      return [];
    }
  
    const songResult = await pool.query(`SELECT * FROM ${schemaName}.songs WHERE id = ANY($1::int[])`, [likedSongIds]);
  
    const likedSongs = songResult.rows;
  
    return likedSongs;
    } catch (error: any) {
        return error;
    }
  };
  
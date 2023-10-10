import { pool } from '../../database';
import { UserData } from './types';
import { SongData } from '../songs/types';
import schemaName from '../../../config';

export const getArtistsAndCurators = async () => {
  const artistsResult = await pool.query(`
      SELECT profile_picture, id, display_name, wallet 
      FROM ${schemaName}.users 
      WHERE role = 'artist'
    `);

  const curatorsResult = await pool.query(`
      SELECT u.profile_picture, u.id, u.display_name, u.wallet 
      FROM ${schemaName}.users u
      JOIN ${schemaName}.tape_sample_artists tsa ON u.id = tsa.user_id
      WHERE u.role = 'artist'
    `);

  return {
    artists: artistsResult.rows,
    curators: curatorsResult.rows,
  };
};

export const getUserByWallet = async (wallet: string) => {
  console.log(schemaName);
  const query = `SELECT * FROM ${schemaName}.users WHERE wallet = $1`;
  const { rows } = await pool.query(query, [wallet]);
  return rows[0];
};

export const updateUser = async (user_id: number, data: any) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const query = `UPDATE ${schemaName}.users SET ${keys.map((key, i) => `${key} = $${i + 1}`)} WHERE id = $${keys.length + 1} RETURNING *`;
  const { rows } = await pool.query(query, [...values, user_id]);
  return rows[0];
};

export const getUserSongs = async (userId: number) => {
  const query = `SELECT * FROM ${schemaName}.songs INNER JOIN ${schemaName}.song_artists ON ${schemaName}.songs.id = ${schemaName}.song_artists.song_id WHERE ${schemaName}.song_artists.user_id = $1`;
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

export const getUserLikes = async (user_id: number): Promise<SongData[]> => {
  const likeResult = await pool.query(`SELECT song_id FROM ${schemaName}.likes WHERE user_id = $1`, [user_id]);

  const likedSongIds = likeResult.rows.map((row) => row.song_id);

  if (likedSongIds.length === 0) {
    return [];
  }

  const songResult = await pool.query(`SELECT * FROM ${schemaName}.songs WHERE id = ANY($1::int[])`, [likedSongIds]);

  const likedSongs = songResult.rows;

  return likedSongs;
};

export const getUserEvents = async (userId: number) => {
  const query = `SELECT * FROM ${schemaName}.user_events WHERE user_id = $1`;
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

export async function createUser(userData: UserData) {
  const { badges, banner, collection, description, display_name, joined, profile_picture, votes, wallet, spotlight, role } = userData;

  const query = `
      INSERT INTO ${schemaName}.users (
        badges, banner, collection, description, display_name,
        joined, profile_picture, votes, wallet, spotlight, role
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

  const values = [badges, banner, collection, description, display_name, joined, profile_picture, votes, wallet, spotlight, role];

  try {
    await pool.query('BEGIN');

    const result = await pool.query(query, values);
    const user = result.rows[0];
    const dateObject = new Date(joined);
    const joinedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;

    const eventType = 'user_created';
    const eventData = {
      message: `joined heds`,
      subject: joinedDate,
    };

    const userEventQuery = `
      INSERT INTO ${schemaName}.user_events (event_type, event_data, event_timestamp, user_id)
      VALUES ($1, $2, $3, $4);
    `;

    const userEventValues = [eventType, JSON.stringify(eventData), new Date().toISOString().slice(0, 19).replace('T', ' '), user.id];
    await pool.query(userEventQuery, userEventValues);

    await pool.query('COMMIT');

    return user;
  } catch (error: any) {
    await pool.query('ROLLBACK');
    throw new Error(`Unable to create user: ${error.message}`);
  }
}

export async function deleteUser(user_id: number) {
  // Begin a transaction
  await pool.query('BEGIN');

  try {
    // Delete user's likes
    const deleteLikesQuery = `
        DELETE FROM ${schemaName}.likes WHERE user_id = $1;
      `;
    await pool.query(deleteLikesQuery, [user_id]);

    // Delete user's song artists entries
    const deleteSongArtistsQuery = `
        DELETE FROM ${schemaName}.song_artists WHERE user_id = $1;
      `;
    await pool.query(deleteSongArtistsQuery, [user_id]);

    // Delete user's events
    const deleteUserEventsQuery = `
        DELETE FROM ${schemaName}.user_events WHERE user_id = $1;
      `;
    await pool.query(deleteUserEventsQuery, [user_id]);

    // Delete user
    const deleteUserQuery = `
        DELETE FROM ${schemaName}.users WHERE id = $1;
      `;
    await pool.query(deleteUserQuery, [user_id]);

    // Commit the transaction
    await pool.query('COMMIT');

    return { success: true, message: 'User deleted successfully.' };
  } catch (error: any) {
    // Rollback the transaction in case of an error
    await pool.query('ROLLBACK');
    throw new Error(`Unable to delete user: ${error.message}`);
  }
}

export const addSongToListeningHistory = async (user_id: number, song_id: number) => {
  try {
    await pool.query(
      `INSERT INTO ${schemaName}.listening_history (user_id, song_id, last_played)
       VALUES ($1, $2, NOW());`,
      [user_id, song_id],
    );

    return { message: 'Song added to listening history' };
  } catch (error: any) {
    throw new Error(`Unable to add song to listening history: ${error.message}`);
  }
};

export const getUserListeningHistory = async (user_id: number) => {
  const query = `
    SELECT
      ${schemaName}.listening_history.*,
      ${schemaName}.songs.*,
      ${schemaName}.song_artists.user_id AS artist_id,
      ${schemaName}.users.display_name AS artist_name
    FROM ${schemaName}.listening_history
    INNER JOIN ${schemaName}.songs ON ${schemaName}.listening_history.song_id = ${schemaName}.songs.id
    INNER JOIN ${schemaName}.song_artists ON ${schemaName}.songs.id = ${schemaName}.song_artists.song_id
    INNER JOIN ${schemaName}.users ON ${schemaName}.song_artists.user_id = ${schemaName}.users.id
    WHERE ${schemaName}.listening_history.user_id = $1
    ORDER BY ${schemaName}.listening_history.last_played DESC
  `;
  const { rows } = await pool.query(query, [user_id]);
  return rows;
};

export const getManyUsersByWalletId = async (walletIds: string[]) => {
  const lowercaseWalletIds = walletIds.map((walletId) => walletId.toLowerCase());
  const { rows } = await pool.query(`SELECT profile_picture, display_name, wallet FROM ${schemaName}.users WHERE wallet = ANY($1)`, [lowercaseWalletIds]);
  return rows;
};

export const getUserById = async (user_id: string) => {
  const query = `SELECT * FROM ${schemaName}.users WHERE id = $1`;
  const { rows } = await pool.query(query, [+user_id]);
  return rows[0];
}

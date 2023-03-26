import { pool } from '../../database';

export const getUserByWallet = async (wallet: string) => {
  const query = 'SELECT * FROM heds.users WHERE wallet = $1';
  const { rows } = await pool.query(query, [wallet]);
  return rows[0];
};

export const updateUser = async (user_id: number, data: any) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const query = `UPDATE heds.users SET ${keys.map((key, i) => `${key} = $${i + 2}`)} WHERE user_id = $1`;
  await pool.query(query, [user_id, ...values]);
};

export const getUserSongs = async (userId: number) => {
    const query = 'SELECT * FROM heds.songs INNER JOIN heds.song_artists ON heds.songs.id = heds.song_artists.song_id WHERE heds.song_artists.user_id = $1';
    const { rows } = await pool.query(query, [userId]);
    return rows;
  };  

export const getUserLikes = async (userId: number) => {
    const query = 'SELECT * FROM heds.likes WHERE user_id = $1';
    const { rows } = await pool.query(query, [userId]);
    return rows;
  };

export const getUserEvents = async (userId: number) => {
    const query = 'SELECT * FROM heds.user_events WHERE user_id = $1';
    const { rows } = await pool.query(query, [userId]);
    return rows;
  };

  export async function createUser(userData: any) {
    const {
      badges,
      banner,
      collection,
      description,
      display_name,
      history,
      joined,
      profile_picture,
      votes,
      wallet,
      spotlight,
      role
    } = userData;
  
    const query = `
      INSERT INTO heds.users (
        badges, banner, collection, description, display_name, history,
        joined, profile_picture, votes, wallet, spotlight, role
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;
  
    const values = [
      badges, banner, collection, description, display_name, history,
      joined, profile_picture, votes, wallet, spotlight, role
    ];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`Unable to create user: ${error.message}`);
    }
  };

  export async function deleteUser(user_id: number) {
    // Begin a transaction
    await pool.query('BEGIN');
  
    try {
      // Delete user's likes
      const deleteLikesQuery = `
        DELETE FROM heds.likes WHERE user_id = $1;
      `;
      await pool.query(deleteLikesQuery, [user_id]);
  
      // Delete user's song artists entries
      const deleteSongArtistsQuery = `
        DELETE FROM heds.song_artists WHERE user_id = $1;
      `;
      await pool.query(deleteSongArtistsQuery, [user_id]);
  
      // Delete user's events
      const deleteUserEventsQuery = `
        DELETE FROM heds.user_events WHERE user_id = $1;
      `;
      await pool.query(deleteUserEventsQuery, [user_id]);
  
      // Delete user
      const deleteUserQuery = `
        DELETE FROM heds.users WHERE id = $1;
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
  

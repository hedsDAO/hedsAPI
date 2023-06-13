import { pool } from '../../database';
import { TapeData } from './types';
import { SongData } from '../songs/types';
import schemaName from '../../../config';

export const getAllTapes = async () => {
  const { rows } = await pool.query(`SELECT id, name, image FROM ${schemaName}.tapes`);
  return rows;
};

export const getTapeById = async (tapeId: number) => {
  const query = `
    SELECT t.*, u.id AS sample_artist_id, u.wallet AS sample_artist_wallet, u.display_name AS sample_artist_display_name, u.profile_picture AS sample_artist_profile_picture
    FROM ${schemaName}.tapes t
    LEFT JOIN ${schemaName}.tape_sample_artists tsa ON t.id = tsa.tape_id
    LEFT JOIN ${schemaName}.users u ON tsa.user_id = u.id
    WHERE t.id = $1;
  `;
  const { rows } = await pool.query(query, [tapeId]);

  if (rows.length === 0) {
    return null;
  }

  const tapeData: TapeData = {
    id: rows[0].id,
    contract: rows[0].contract,
    name: rows[0].name,
    merkle_root: rows[0].merkle_root,
    description: rows[0].description,
    image: rows[0].image,
    proposal_id: rows[0].proposal_id,
    tape_video: rows[0].video,
    bpm: rows[0].bpm,
    timeline: rows[0].timeline,
    tape_type: rows[0].type,
    splits: rows[0].splits,
    links: rows[0].links,
    sample_artists: [],
  };

  rows.forEach((row) => {
    if (row.sample_artist_id) {
      tapeData.sample_artists.push({
        id: row.sample_artist_id,
        display_name: row.sample_artist_display_name,
        profile_picture: row.sample_artist_profile_picture,
        wallet: row.sample_artist_wallet,
      });
    }
  });

  return tapeData;
};

export const getTapeSongs = async (tape_id: number) => {
  try {
    const songQuery = `
      SELECT
        s.*
      FROM ${schemaName}.songs s
      WHERE s.tape_id = $1
    `;
    const songResult = await pool.query(songQuery, [tape_id]);

    // Map over the songs and fetch artist details for each
    const songsWithArtists = await Promise.all(songResult.rows.map(async (song) => {
      const artistQuery = `
        SELECT
          u.id as artist_id,
          u.display_name as artist_display_name,
          u.profile_picture as artist_profile_picture,
          u.wallet as artist_wallet
        FROM ${schemaName}.song_artists sa
        INNER JOIN ${schemaName}.users u ON sa.user_id = u.id
        WHERE sa.song_id = $1
      `;
      const artistResult = await pool.query(artistQuery, [song.id]);
      const artists = artistResult.rows;

      // Return the song with its associated artists
      return { ...song, artists };
    }));

    return songsWithArtists;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveTapeAndSampleSong = async (tapeData: TapeData, songData: SongData, curatorWallet: string): Promise<any> => {
  await pool.query('BEGIN');
  try {

  const { rows: curatorRow } = await pool.query(`SELECT id FROM ${schemaName}.users WHERE wallet = $1`, [curatorWallet]);
  const curatorId = curatorRow[0].id;

  const { name, description, image, proposal_id, bpm, timeline, tape_type, splits, links } = tapeData;

  const { rows: tapeRows } = await pool.query(
    `INSERT INTO ${schemaName}.tapes (contract, name, description, image, proposal_id, video, bpm, timeline, type, splits, links) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    ["", name, description, image, proposal_id, "", bpm, timeline, tape_type, splits, links],
  );

  const newTape = tapeRows[0];

  await pool.query(`INSERT INTO ${schemaName}.tape_sample_artists (tape_id, user_id) VALUES ($1, $2)`, [newTape.id, curatorId]);
  
  // Create a new song
  const { audio, cover, duration, track_name, song_type, submission_data, cyanite_id, track_data } = songData;
  
  const {rows: songId} = await pool.query(
    `INSERT INTO ${schemaName}.songs ( tape_id, audio, cover, duration, public, track_name, type, submission_data, cyanite_id, created, total_likes, track_data, video) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 0, $12) RETURNING id`,
    [ newTape.id, audio, cover, duration, true, track_name, song_type, submission_data, cyanite_id, new Date(), track_data, ""],
  );

  // Add entry to song_artists table
  await pool.query(
    `INSERT INTO ${schemaName}.song_artists (song_id, user_id, verified, ownership_percent) VALUES ($1, $2, $3, $4)`,
    [songId, curatorId, true, 100],
  );

  return newTape;
  } catch (error: any) {
    await pool.query('ROLLBACK');
    throw new Error(`Unable to create tape: ${error.message}`);
  }
};

export const updateTape = async (tape_id: number, tapeData: Partial<TapeData>): Promise<any> => {
  const keys = Object.keys(tapeData);

  if (keys.length === 0) {
    throw new Error('No data provided to update');
  }

  let query = `UPDATE ${schemaName}.tapes SET `;
  const values = [];

  for (let i = 1; i <= keys.length; i++) {
    const key = keys[i - 1] as keyof Partial<TapeData>;
    query += `${key} = $${i}, `;
    values.push(tapeData[key]);
  }

  query = query.slice(0, -2); // remove trailing comma and space
  query += ` WHERE id = $${keys.length + 1} RETURNING *`;
  values.push(tape_id);

  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const deleteTape = async (tape_id: number): Promise<any> => {
  const { rows } = await pool.query(`DELETE FROM ${schemaName}.tapes WHERE id = $1 RETURNING *`, [tape_id]);
  return rows[0];
};

export const getTapeContractArgs = async (): Promise<any> => {
  const { rows } = await pool.query(`
    SELECT id, contract, name, image FROM ${schemaName}.tapes
  `);
  return rows;
};

import { pool } from '../../database';
import { TapeData } from './types';
import schemaName from '../../../config';

export const getAllTapes = async () => {
  const { rows } = await pool.query(`SELECT id, name, image FROM ${schemaName}.tapes`);
  return rows;
};

export const getTapeById = async (tapeId: number) => {
  const query = `
    SELECT t.*, u.id AS sample_artist_id, u.display_name AS sample_artist_display_name, u.profile_picture AS sample_artist_profile_picture
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
    video: rows[0].video,
    bpm: rows[0].bpm,
    timeline: rows[0].timeline,
    type: rows[0].type,
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
      });
    }
  });

  return tapeData;
};

export const getTapeSongs = async (tape_id: number): Promise<any> => {
  const query = `
    SELECT
      s.*,
      u.id as artist_id,
      u.display_name as artist_display_name,
      u.profile_picture as artist_profile_picture
      u.wallet as artist_wallet
    FROM ${schemaName}.songs s
    INNER JOIN ${schemaName}.song_artists sa ON s.id = sa.song_id
    INNER JOIN ${schemaName}.users u ON sa.user_id = u.id
    WHERE s.tape_id = $1
  `;
  const { rows } = await pool.query(query, [tape_id]);

  return rows;
};

export const createTape = async (tapeData: TapeData): Promise<any> => {
  const { contract, name, description, image, proposal_id, video, bpm, timeline, type, splits, links } = tapeData;

  const { rows } = await pool.query(
    `INSERT INTO ${schemaName}.tapes (contract, name, description, image, proposal_id, video, bpm, timeline, type, splits, links) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    [contract, name, description, image, proposal_id, video, bpm, timeline, type, splits, links],
  );

  return rows[0];
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

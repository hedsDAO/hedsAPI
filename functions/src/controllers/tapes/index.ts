import { pool } from '../../database';
import { TapeData } from './types';

export const getTapeById = async (tapeId: number) => {
  const query = 'SELECT * FROM heds.tapes WHERE id = $1';
  const { rows } = await pool.query(query, [tapeId]);
  return rows[0];
};

export const getTapeSongs = async (tape_id: number): Promise<any> => {
    const { rows } = await pool.query(
      'SELECT * FROM heds.songs WHERE tape_id = $1',
      [tape_id]
    );
  
    return rows;
  };
  
  
  export const createTape = async (tapeData: TapeData): Promise<any> => {
    const { contract, name, description, image, proposal_id, video, bpm, timeline, type, splits, links } = tapeData;
  
    const { rows } = await pool.query(
      'INSERT INTO heds.tapes (contract, name, description, image, proposal_id, video, bpm, timeline, type, splits, links) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [contract, name, description, image, proposal_id, video, bpm, timeline, type, splits, links]
    );
  
    return rows[0];
  };

  export const updateTape = async (tape_id: number, tapeData: Partial<TapeData>): Promise<any> => {
    const keys = Object.keys(tapeData);
  
    if (keys.length === 0) {
      throw new Error('No data provided to update');
    }
  
    let query = 'UPDATE heds.tapes SET ';
    let values = [];
  
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
    const { rows } = await pool.query('DELETE FROM heds.tapes WHERE id = $1 RETURNING *', [tape_id]);
    return rows[0];
  };

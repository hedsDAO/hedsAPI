import { pool } from '../../database';

export const getTapeById = async (tapeId: number) => {
  const query = 'SELECT * FROM heds.tapes WHERE id = $1';
  const { rows } = await pool.query(query, [tapeId]);
  return rows[0];
};

export const getTapeSongs = async (tapeId: number) => {
  const tape = await getTapeById(tapeId);
  if (!tape) return [];

  const trackIds = tape.tracks;
  const query = `
    SELECT
      heds.songs.*
    FROM
      heds.songs
      INNER JOIN heds.tape_track ON heds.songs.id = heds.tape_track.song_id
    WHERE
      heds.tape_track.id = ANY($1)
  `;
  const { rows } = await pool.query(query, [trackIds]);
  return rows;
};

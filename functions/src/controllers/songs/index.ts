import { Configuration, OpenAIApi } from 'openai';
import schemaName from '../../../config';
import * as common from '../../common';
import * as randomData from '../../data/randomData';
import * as functions from 'firebase-functions';
import { pool } from '../../database';
import { pinAudioToGateway } from '../pinata/pinAudioToGateway-v2';
import { pinImageToGateway } from '../pinata/pinImageToGateway-v2';
import { unpinHashFromGateway } from '../pinata/unpinHashFromGateway-v2';
import { TapeData } from '../tapes/types';

import { CreateSongRequestBody, LikeData } from './types';

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

export const getSongEventsById = async (song_id: number) => {
  const query = `SELECT * FROM ${schemaName}.song_events WHERE song_id = $1`;
  const { rows } = await pool.query(query, [song_id]);
  return rows;
};

export async function createSong(requestData: CreateSongRequestBody) {
  // Begin a transaction
  await pool.query('BEGIN');
  functions.logger.log('createSong controller');

  // Query strings
  const songArtistQuery = `INSERT INTO ${schemaName}.song_artists (song_id, user_id, verified, ownership_percent) VALUES ($1, $2, $3, $4)`;
  const songEventsQuery = `INSERT INTO ${schemaName}.song_events (event_type, event_data, event_timestamp, song_id, user_id) VALUES ($1, $2, $3, $4, $5)`;
  const songQuery = `INSERT INTO ${schemaName}.songs (tape_id, audio, cover, duration, public, track_name, type, submission_data, cyanite_id, created, 
      total_likes, track_data, video) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *
    `;

  // Declared variables
  let tapeCover, tapeName, audioIpfsHash, imageIpfsHash, imageUrl, formattedSubId, newSongQueryResult, songId;

  // generate random submission id
  const { tempAudioRef, user_id, tape_id, duration } = requestData;
  const { adjectives, animals } = randomData;
  const randomAdj = Math.ceil(Math.random() * adjectives.length);
  const randomAnimal = Math.ceil(Math.random() * animals.length);
  const submissionId = [adjectives[randomAdj], animals[randomAnimal]].join(' ');
  functions.logger.log(submissionId, 'submissionId');

  try {
    // generate image from submission id
    const openai: OpenAIApi = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
    const prompt = common.generatePrompt(submissionId);
    const generatedImage = await openai.createImage({ prompt, n: 1, size: '256x256' });
    imageUrl = generatedImage?.data?.data?.[0]?.url;
    const splitWords = submissionId.split(' ');
    formattedSubId = splitWords[0]?.toLowerCase() + splitWords[1]?.toUpperCase();
    functions.logger.log(imageUrl, 'imageUrl');
  } catch (error: any) {
    functions.logger.log('error generating image in createSong controller');
    throw new Error(`Unable to generate image: ${error.message}`);
  }

  try {
    // query tape and get tape name
    const tapeQuery = `SELECT * FROM ${schemaName}.tapes WHERE id = $1`;
    const tapeQueryResponse = await pool.query(tapeQuery, [tape_id]);
    const tapeData: TapeData = tapeQueryResponse?.rows?.[0];
    const { image, name } = tapeData;
    tapeCover = image;
    tapeName = name;
    functions.logger.log(tapeData, 'tapeData', tapeQueryResponse, 'tapeQueryResponse');
  } catch (error: any) {
    functions.logger.log('error getting tape data in createSong controller');
    throw new Error(`Unable to get tape data: ${error.message}`);
  }

  try {
    // pin audio and image to IPFS
    if (imageUrl) imageIpfsHash = await pinImageToGateway(imageUrl, user_id, tape_id, submissionId);
    if (!imageIpfsHash) throw new Error(`Unable to pin image to gateway`);
    audioIpfsHash = await pinAudioToGateway(tempAudioRef, user_id, tape_id, submissionId);
    functions.logger.log(audioIpfsHash, 'audioIpfsHash', imageIpfsHash, 'imageIpfsHash');
  } catch (error: any) {
    functions.logger.log('error pinning audio or image to gateway in createSong controller');
    throw new Error(`Unable to pin audio or image to gateway: ${error.message}`);
  }

  try {
    // add track to song table
    functions.logger.log('update song table');
    const song_type = 'submission';
    const audio = `${common.ipfsPrefix}${audioIpfsHash}`;
    const sub_image = `${common.ipfsPrefix}${imageIpfsHash}`;
    const submission_data = JSON.stringify({ sub_image, sub_id: formattedSubId });
    const track_data = JSON.stringify({ tape_name: tapeName });
    const newSongData = [tape_id, audio, tapeCover, duration, false, formattedSubId, song_type, submission_data, null, new Date(), 0, track_data, null];
    newSongQueryResult = await pool.query(songQuery, newSongData);
  } catch (error: any) {
    functions.logger.log('error updating song table in createSong controller');
    await pool.query('ROLLBACK');
    throw new Error(`Unable to update song table: ${error.message}`);
  }

  try {
    // add artist to song_artists table
    functions.logger.log('update song_artists table');
    songId = newSongQueryResult?.rows?.[0]?.id;
    const songArtistData = [songId, user_id, true, 100];
    await pool.query(songArtistQuery, songArtistData);
    await pool.query('COMMIT');
  } catch (error: any) {
    functions.logger.log('error creating submission in createSong controller');
    await pool.query('ROLLBACK');
    throw new Error(`Unable to create song: ${error.message}`);
  }
  
  try {
    // add event to song_events table
    functions.logger.log('update song_events table');
    const event_type = 'tape_submission';
    const eventData = JSON.stringify({ message: 'submitted to a tape', subject: tapeName });
    await pool.query(songEventsQuery, [event_type, eventData, new Date(), songId, user_id]);
  } catch (error: any) {
    functions.logger.log('error creating submission event in createSong controller');
    await pool.query('ROLLBACK');
    throw new Error(`Unable to create song event: ${error.message}`);
  }

  functions.logger.log('new submission', newSongQueryResult?.rows?.[0])
  return { newSubmission: newSongQueryResult?.rows?.[0] };
}

export async function deleteSong(song_id: number) {
  // Begin a transaction
  await pool.query('BEGIN');
  functions.logger.log('deleteSong controller');

  try {
    const songQuery = `SELECT * FROM ${schemaName}.songs WHERE id = $1`;
    const songResult = await pool.query(songQuery, [song_id]);
    const song = songResult.rows[0];
    const { submission_data, audio } = song;
    const { sub_image } = JSON.parse(submission_data);

    // parse hashes from song and image urls
    const audioHash = audio.split(common.ipfsPrefix)[1];
    const imageHash = sub_image.split(common.ipfsPrefix)[1];
    functions.logger.log(audioHash, 'audioHash', imageHash, 'imageHash');

    // Unpin files from IPFS
    await unpinHashFromGateway(audioHash);
    await unpinHashFromGateway(imageHash);

    // Delete song's likes
    const deleteLikesQuery = `DELETE FROM ${schemaName}.likes WHERE song_id = $1`;
    await pool.query(deleteLikesQuery, [song_id]);

    // Delete song's events
    const deleteEventsQuery = `DELETE FROM ${schemaName}.song_events WHERE song_id = $1`;
    await pool.query(deleteEventsQuery, [song_id]);

    // Delete song's artists entries
    const deleteSongArtistsQuery = `DELETE FROM ${schemaName}.song_artists WHERE song_id = $1`;
    await pool.query(deleteSongArtistsQuery, [song_id]);

    // Delete song
    const deleteSongQuery = `DELETE FROM ${schemaName}.songs WHERE id = $1`;
    await pool.query(deleteSongQuery, [song_id]);

    // Commit the transaction
    await pool.query('COMMIT');

    return { success: true, message: 'Song deleted successfully.' };
  } catch (error: any) {
    // Rollback the transaction in case of an error
    functions.logger.log('error deleting song in deleteSong controller');
    await pool.query('ROLLBACK');
    throw new Error(`Unable to delete song: ${error.message}`);
  }
}

export const likeSong = async (songId: number, userId: number) => {
  try {
    await pool.query('BEGIN');

    const userDataQuery = `SELECT display_name FROM ${schemaName}.users WHERE id = $1`;
    const userResult = await pool.query(userDataQuery, [userId]);
    const displayName = userResult.rows[0].display_name;
    const songDataQuery = `SELECT track_name, public FROM ${schemaName}.songs WHERE id = $1`;
    const songResult = await pool.query(songDataQuery, [songId]);
    const trackName = songResult.rows[0].track_name;
    const isPublic = songResult.rows[0].public;
    const artistIdQuery = `SELECT user_id FROM ${schemaName}.song_artists WHERE song_id = $1`;
    const artistIdResult = await pool.query(artistIdQuery, [songId]);
    const artistId = artistIdResult.rows[0].user_id;
    const artistDataQuery = `SELECT display_name FROM ${schemaName}.users WHERE id = $1`;
    const artistResult = await pool.query(artistDataQuery, [artistId]);
    const artistName = artistResult.rows[0].display_name;

    // Create a new event in heds.song_events table
    const eventType = 'song_like';
    const eventData = {
      message: `${displayName} liked a track`,
      subject: `${trackName} by ${isPublic ? artistName : 'Anonymous'}`,
    };

    const songEventQuery = `
    INSERT INTO ${schemaName}.song_events (event_type, event_data, event_timestamp, song_id, user_id)
    VALUES ($1, $2, $3, $4, $5);
  `;
    const songEventValues = [eventType, JSON.stringify(eventData), new Date().toISOString().slice(0, 19).replace('T', ' '), songId, userId];
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

export const getManySongs = async (songHashes: string[]) => {
  try {
    const prefixedSongHashes = songHashes.map((hash) => `https://www.heds.cloud/ipfs/${hash}`);
    const songResult = await pool.query(`SELECT * FROM ${schemaName}.songs WHERE audio = ANY($1)`, [prefixedSongHashes]);
    if (songResult.rows.length === 0) return null;
    return songResult.rows;
  } catch (error) {
    console.log(error);
    return;
  }
};

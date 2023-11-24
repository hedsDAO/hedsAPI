// import { Configuration, OpenAIApi } from 'openai';
// import * as common from '../../common';
// import * as randomData from '../../data/randomData';
// import * as functions from 'firebase-functions';
import { unpinFromIpfs } from '../utils/pinata';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export interface CreateSongRequestBody {
  tempAudioRef: string;
  user_id: number;
  tape_id: number;
  duration: number;
}

export const getSongByAudio = async (audio: string): Promise<any> => {
  try {
    const song = await prisma.songs.findFirst({
      where: { audio },
      include: {
        song_artists: {
          select: {
            user_id: true,
            users: {
              select: {
                display_name: true,
                profile_picture: true,
                wallet: true,
              },
            },
          },
        },
      },
    });

    if (!song) return null;

    return song;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLikesBySongId = async (songId: number) => {
  try {
    const likes = await prisma.likes.findMany({
      where: { song_id: songId },
      select: {
        user_id: true,
        song_id: true,
        users: {
          select: {
            display_name: true,
            profile_picture: true,
            wallet: true,
          },
        },
      },
    });

    return likes.map((like) => ({
      user_id: like.user_id,
      song_id: like.song_id,
      display_name: like.users?.display_name,
      profile_picture: like.users?.profile_picture,
      wallet: like.users?.wallet,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getLatestTrackSong = async () => {
  const song = await prisma.songs.findFirst({
    where: { type: 'track' },
    orderBy: { created: 'desc' },
    include: {
      song_artists: {
        select: {
          user_id: true,
          users: {
            select: {
              display_name: true,
              profile_picture: true,
              wallet: true,
            },
          },
        },
      },
    },
  });
  return song;
};

// export async function createSong(requestData: CreateSongRequestBody) {
//   // Define and initialize variables
//   let tapeCover, tapeName, audioIpfsHash, imageIpfsHash, imageUrl, formattedSubId, newSong;

//   // Destructure request data
//   const { tempAudioRef, user_id, tape_id, duration } = requestData;
//   const { adjectives, animals } = randomData;
//   const randomAdj = Math.ceil(Math.random() * adjectives.length);
//   const randomAnimal = Math.ceil(Math.random() * animals.length);
//   const submissionId = [adjectives[randomAdj], animals[randomAnimal]].join(' ');

//   try {
//     // Generate image from submission id
//     const openai: OpenAIApi = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
//     const prompt = common.generatePrompt(submissionId);
//     const generatedImage = await openai.createImage({ prompt, n: 1, size: '256x256' });
//     imageUrl = generatedImage?.data?.data?.[0]?.url;
//     if (!imageUrl) throw 'no image url';
//     const splitWords = submissionId.split(' ');
//     formattedSubId = splitWords[0]?.toLowerCase() + splitWords[1]?.toUpperCase();
//     functions.logger.log(imageUrl, 'imageUrl');

//     // Query tape and set tape name and cover
//     const tapeData = await prisma.tapes.findUnique({
//       where: { id: tape_id },
//       select: { name: true, image: true },
//     });
//     if (!tapeData) throw new Error('Tape not found');
//     tapeCover = tapeData.image;
//     tapeName = tapeData.name;

//     // Pin audio and image to IPFS
//     imageIpfsHash = await pinFileToIpfs(imageUrl, user_id, tape_id, submissionId);
//     audioIpfsHash = await pinAudioToGateway(tempAudioRef, user_id, tape_id, submissionId);

//     // Add track to song table
//     newSong = await prisma.songs.create({
//       data: {
//         tape_id,
//         audio: `${common.ipfsPrefix}${audioIpfsHash}`,
//         cover: tapeCover,
//         duration,
//         public: false,
//         track_name: formattedSubId,
//         type: 'submission',
//         submission_data: JSON.stringify({ sub_image: `${common.ipfsPrefix}${imageIpfsHash}`, sub_id: formattedSubId }),
//         track_data: JSON.stringify({ tape_name: tapeName }),
//         created: new Date(),
//         total_likes: 0,
//       },
//     });

//     // Add artist to song_artists table
//     await prisma.song_artists.create({
//       data: {
//         song_id: newSong.id,
//         user_id,
//         verified: true,
//         ownership_percent: 100,
//       },
//     });

//     // Add event to song_events table
//     await prisma.song_events.create({
//       data: {
//         event_type: 'tape_submission',
//         event_data: JSON.stringify({ message: 'submitted to a tape', subject: tapeName }),
//         event_timestamp: new Date(),
//         song_id: newSong.id,
//         user_id,
//       },
//     });
//   } catch (error) {
//     console.error('Error in createSong:', error);
//     throw new Error(`Unable to create song: ${error}`);
//   }

//   console.log('New submission:', newSong);
//   return { newSubmission: newSong };
// }

export const deleteSong = async (songId: number) => {
  try {
    await prisma.$transaction(async (prisma) => {
      const song = await prisma.songs.findUnique({
        where: { id: songId },
        select: {
          audio: true,
          submission_data: true,
        },
      });

      if (!song?.audio || !song?.submission_data) throw new Error('Song not found');

      const submissionData = typeof song.submission_data === 'string' ? JSON.parse(song.submission_data) : song.submission_data;
      if (typeof submissionData !== 'object' || !submissionData.sub_image) {
        throw new Error('Invalid submission data');
      }

      const songHash = song.audio.split('/ipfs/')[1];
      const subImageHash = submissionData.sub_image.split('/ipfs/')[1];
      try {
        await unpinFromIpfs(songHash);
        await unpinFromIpfs(subImageHash);
      } catch (error) {
        console.error('Error unpinning song or sub image:', error);
        throw error;
      }
      await prisma.likes.deleteMany({ where: { song_id: songId } });
      await prisma.song_artists.deleteMany({ where: { song_id: songId } });
      await prisma.songs.delete({ where: { id: songId } });
    });
    return { success: true, message: 'Song deleted successfully.' };
  } catch (error) {
    console.error('Error in deleteSong:', error);
    return { success: false, message: error };
  }
};

export const likeSong = async (songId: number, userId: number) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { display_name: true },
    });

    if (!user) throw new Error('User not found');

    const song = await prisma.songs.findUnique({
      where: { id: songId },
      select: { track_name: true, public: true },
    });

    if (!song) throw new Error('Song not found');

    const songArtist = await prisma.song_artists.findFirst({
      where: { song_id: songId },
      select: { user_id: true },
    });

    if (!songArtist?.user_id) throw new Error('Artist not found');

    const artist = await prisma.users.findUnique({
      where: { id: songArtist.user_id },
      select: { display_name: true },
    });

    if (!artist) throw new Error('Artist not found');

    await prisma.songs.update({
      where: { id: songId },
      data: { total_likes: { increment: 1 } },
    });

    await prisma.likes.create({
      data: {
        song_id: songId,
        user_id: userId,
      },
    });

    return { success: true, message: 'Song liked successfully.' };
  } catch (error: any) {
    console.error('Error in likeSong:', error);
    throw new Error(`Unable to like song: ${error.message}`);
  }
};

export const unlikeSong = async (songId: number, userId: number) => {
  try {
    await prisma.$transaction([
      prisma.likes.deleteMany({
        where: { song_id: songId, user_id: userId },
      }),
      prisma.songs.update({
        where: { id: songId },
        data: { total_likes: { decrement: 1 } },
      }),
    ]);
    return { success: true, message: 'Song unliked successfully.' };
  } catch (error) {
    console.error('Error in unlikeSong:', error);
    return null;
  }
};

export const getManySongs = async (songHashes: string[]) => {
  try {
    const songs = await prisma.songs.findMany({
      where: {
        audio: { in: songHashes.map((hash) => `https://www.heds.cloud/ipfs/${hash}`) },
      },
      include: {
        song_artists: {
          select: {
            user_id: true,
            users: {
              select: {
                display_name: true,
                profile_picture: true,
                wallet: true,
              },
            },
          },
        },
      },
    });

    return songs;
  } catch (error) {
    console.error('Error in getManySongs:', error);
    return null;
  }
};

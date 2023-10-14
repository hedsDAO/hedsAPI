import { PrismaClient, tapes as TapeData, songs as SongData, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Retrieves all tapes with select properties: id, name, and image.
 * @async
 * @throws Will throw an error if unable to retrieve tapes.
 * @returns {Promise} Promise object represents array of tapes.
 */
export const getAllTapes = async () => {
  try {
    return await prisma.tapes.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};


/**
 * Retrieves a tape by its ID with associated sample artists.
 * @async
 * @param {number} tapeId - The ID of the tape.
 * @throws Will throw an error if unable to retrieve the tape.
 * @returns {Promise} Promise object represents the tape or null if not found.
 */
export const getTapeById = async (tapeId: number) => {
  try {
    const tape = await prisma.tapes.findUnique({
      where: { id: tapeId },
      include: {
        tape_sample_artists: {
          select: {
            id: true,
            users: {
              select: {
                id: true,
                display_name: true,
                profile_picture: true,
                wallet: true,
              },
            },
          },
        },
      },
    });

    if (!tape) return null;
    return tape;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Retrieves songs associated with a given tape ID, including song artists.
 * @async
 * @param {number} tapeId - The ID of the tape.
 * @throws Will throw an error if unable to retrieve songs.
 * @returns {Promise} Promise object represents array of songs.
 */
export const getTapeSongs = async (tapeId: number) => {
  try {
    const songs = await prisma.songs.findMany({
      where: { tape_id: tapeId },
      include: {
        song_artists: {
          select: {
            id: true,
            users: {
              select: {
                id: true,
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
    console.error(error);
    throw error;
  }
};

/**
 * Saves a tape along with a sample song.
 * @async
 * @param {TapeData} tapeData - Data of the tape to be created.
 * @param {SongData} songData - Data of the song to be created.
 * @param {string} curatorWallet - Wallet identifier of the curator.
 * @throws Will throw an error if curator is not found or if unable to create tape or song.
 * @returns {Promise} Promise object represents the new tape created.
 */
export const saveTapeAndSampleSong = async (tapeData: TapeData, songData: SongData, curatorWallet: string): Promise<any> => {
  const curator = await prisma.users.findUnique({ where: { wallet: curatorWallet } });

  if (!curator?.id) {
    throw new Error('Curator not found');
  }

  try {
    const newTape = await prisma.tapes.create({
        data: {
            contract: tapeData.contract,
            name: tapeData.name,
            merkle_root: tapeData.merkle_root,
            description: tapeData.description,
            image: tapeData.image,
            proposal_id: tapeData.proposal_id,
            video: tapeData.video,
            bpm: tapeData.bpm,
            timeline: tapeData.timeline as Prisma.InputJsonValue,
            type: tapeData.type,
            splits: tapeData.splits,
            links: tapeData.links as Prisma.InputJsonValue,
            tape_sample_artists: {
              create: {
                user_id: curator.id
              }
            }
          }
    });

    const song = await prisma.songs.create({
      data: {
        audio: songData.audio,
        cover: songData.cover,
        duration: songData.duration,
        track_name: songData.track_name,
        type: songData.type,
        submission_data: songData.submission_data as Prisma.InputJsonValue,
        cyanite_id: songData.cyanite_id,
        track_data: songData.track_data as Prisma.InputJsonValue,
        tape_id: newTape.id
      },
    });

    await prisma.song_artists.create({
      data: {
        song_id: song.id,
        user_id: curator.id,
        verified: true,
        ownership_percent: 100,
      },
    });

    return newTape;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Updates a tape with provided data.
 * @async
 * @param {number} tapeId - ID of the tape to be updated.
 * @param {Partial<TapeData>} tapeData - Partial data of the tape to update.
 * @throws Will throw an error if unable to update the tape.
 * @returns {Promise} Promise object represents the updated tape.
 */
export const updateTape = async (tapeId: number, tapeData: Partial<TapeData>): Promise<any> => {
    try {

      return await prisma.tapes.update({
        where: { id: tapeId },
        data: {
            ...tapeData,
            timeline: tapeData.timeline  as Prisma.InputJsonValue,
            links: tapeData.links  as Prisma.InputJsonValue
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

/**
 * Deletes a tape by its ID.
 * @async
 * @param {number} tapeId - The ID of the tape to delete.
 * @throws Will throw an error if unable to delete the tape.
 * @returns {Promise} Promise object represents the result of deletion operation.
 */
export const deleteTape = async (tapeId: number) => {
  try {
    return await prisma.tapes.delete({ where: { id: tapeId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Retrieves contract arguments for tapes with select properties.
 * @async
 * @throws Will throw an error if unable to retrieve contract arguments.
 * @returns {Promise} Promise object represents array of tape contract arguments.
 */
export const getTapeContractArgs = async () => {
  try {
    return await prisma.tapes.findMany({
      select: {
        id: true,
        contract: true,
        name: true,
        image: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Counts tracks for each artist and returns the result.
 * @async
 * @throws Will throw an error if unable to count artist tracks.
 * @returns {Promise} Promise object represents count of tracks for each artist.
 */
export const countArtistTracks = async () => {
    try {
      const result = await prisma.$executeRaw`SELECT user_id as artist_id, COUNT(song_id) as track_count FROM song_artists GROUP BY user_id`;
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

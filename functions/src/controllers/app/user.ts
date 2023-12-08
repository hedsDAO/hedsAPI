// import { UserData } from './types';
// import { SongData } from '../songs/types';
// import schemaName from '../../../config';
import { user_role_type } from '@prisma/client';
import * as functions from 'firebase-functions';
import { prisma } from '../../../prisma/client';

/**
 * Creates a new user data object with the provided wallet address.
 *
 * @param {string} wallet - The wallet address of the new user.
 * @returns {Object} - The new user data object.
 */
export const createNewUserData = (wallet: string) => {
  return {
    badges: JSON.stringify([
      {
        name: 'Visitor',
        image: 'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1',
        description: 'Welcome to heds.',
      },
    ]),
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
    collection: {},
    description: '',
    display_name: '',
    joined: Date.now(),
    profile_picture:
      'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0x000000000000000000000000000000.png?alt=media&token=55cb53fe-736d-4b1e-bcd0-bf17bc7146dc',
    wallet: wallet.toLowerCase(),
    spotlight: null,
    role: 'user' as user_role_type,
  };
};

/**
 * Retrieve all users from the database.
 *
 * @returns {Promise<Object[]>} Array of all users.
 */
export const getAllUsers = async () => {
  try {
    const allUsers = await prisma.users.findMany();
    functions.logger.log('all users', allUsers);
    return allUsers;
  } catch (e) {
    functions.logger.log('error in controller', e);
    return;
  }
};

/**
 * Retrieve both artists and curators from the database.
 *
 * @returns {Promise<Object>} Object containing arrays of artists and curators.
 */
export const getArtistsAndCurators = async () => {
  try {
    const artists = await prisma.users.findMany({
      where: { role: 'artist' },
      select: {
        profile_picture: true,
        id: true,
        display_name: true,
        wallet: true,
      },
    });

    const curators = await prisma.tape_sample_artists.findMany({
      include: {
        users: {
          select: {
            profile_picture: true,
            id: true,
            display_name: true,
            wallet: true,
          },
        },
      },
    });

    return {
      artists,
      curators: curators.map((curator) => curator.users),
    };
  } catch (e) {
    functions.logger.log('error in controller', e);
    return;
  }
};

/**
 * Retrieve a user by their wallet identifier.
 *
 * @param {string} wallet - User's wallet identifier.
 * @returns {Promise<Object|null>} User object or null.
 */
export const getUserByWallet = async (wallet: string) => {
  functions.logger.log('wallet', wallet);
  try {
    let user = await prisma.users.findFirst({
      where: { wallet },
    });
    functions.logger.log('existing user', user);
    if (!user) {
      const newUser = createNewUserData(wallet);
      user = await prisma.users.create({ data: newUser });
      functions.logger.log('new user', user);
    }

    return user;
  } catch (e) {
    functions.logger.log('error in controller', e);
    return;
  }
};

/**
 * Retrieve a user by their email address.
 *
 * @param {string} email - User's email address.
 * @returns {Promise<Object|null>} User object or null.
 */
export const getUserByEmaill = async (email: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: { email },
    });
    return user;
  } catch (e) {
    functions.logger.log('error in controller', e);
    return;
  }
};

/**
 * Retrieve a user by their phone number.
 *
 * @param {string} phone_number - User's phone number.
 * @returns {Promise<Object|null>} User object or null.
 */
export const getUserByPhoneNumber = async (phone_number: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: { phone_number },
    });
    return user;
  } catch (e) {
    functions.logger.log('error in controller', e);
    return;
  }
};

/**
 * Retrieve a user by id.
 *
 * @param {string} id - User's id.
 * @returns {Promise<Object|null>} User object or null.
 */
export const getUserById = async (id: number) => {
  try {
    const user = await prisma.users.findFirst({
      where: { id },
      include: {
        events: true,
        event_rsvps: true,
        likes: true,
        listening_history: true,
      },
    });
    return user;
  } catch (e) {
    functions.logger.log('error in controller', e);
    return;
  }
};

/**
 * Update a user's data in the database.
 *
 * @param {number} user_id - ID of the user to update.
 * @param {any} data - Data to update for the user.
 * @returns {Promise<Object>} Updated user object.
 */
export const updateUser = async (user_id: number, data: any) => {
  try {
    const updatedUser = await prisma.users.update({
      where: { id: user_id },
      data,
    });
    return updatedUser;
  } catch (e) {
    functions.logger.log('error in controller', e);
    return;
  }
};

/**
 * Retrieve all songs associated with a specific user.
 *
 * @param {number} userId - ID of the user.
 * @returns {Promise<Object[]>} Array of songs.
 */
export const getUserSongs = async (userId: number) => {
  try {
    const songs = await prisma.songs.findMany({
      where: {
        song_artists: {
          some: {
            user_id: userId,
          },
        },
      },
    });
    return songs;
  } catch (e) {
    functions.logger.log('error in controller', e);
    return;
  }
};

/**
 * Retrieve all songs liked by a specific user.
 *
 * @param {number} user_id - ID of the user.
 * @returns {Promise<Object[]>} Array of liked songs.
 */
export const getUserLikes = async (user_id: number) => {
  try {
    const likedSongIds = await prisma.likes.findMany({
      where: { user_id },
      select: {
        song_id: true,
      },
    });

    if (likedSongIds.length === 0) {
      return [];
    }

    const likedSongs = await prisma.songs.findMany({
      where: {
        id: {
          in: likedSongIds.map((like) => like?.song_id).filter((id): id is number => id !== null),
        },
      },
    });

    return likedSongs;
  } catch (e) {
    functions.logger.log('error in controller', e);
    return;
  }
};

/**
 * Create a new user and log a user creation event.
 *
 * @param {any} userData - Data for the new user.
 * @returns {Promise<Object>} Created user object.
 */
export const createUser = async (userData: any) => {
  try {
    functions.logger.log('user data body', userData);
    const user = await prisma.users.create({
      data: userData,
      include: {
        events: true,
        event_rsvps: true,
      },
    });
    functions.logger.log('user creared', user);

    return user;
  } catch (error: any) {
    functions.logger.log('error in user creation controller', error);
    throw new Error(`Unable to create user: ${error.message}`);
  }
};

/**
 * Delete a user and their associated data from the database.
 *
 * @param {number} user_id - ID of the user to delete.
 * @returns {Promise<Object>} Deletion status object.
 */
export const deleteUser = async (user_id: number) => {
  try {
    await prisma.$transaction([
      prisma.likes.deleteMany({ where: { user_id } }),
      prisma.song_artists.deleteMany({ where: { user_id } }),
      prisma.users.delete({ where: { id: user_id } }),
    ]);

    return { success: true, message: 'User deleted successfully.' };
  } catch (error: any) {
    functions.logger.log('error in controller', error);
    throw new Error(`Unable to delete user: ${error.message}`);
  }
};

/**
 * Add a song to a user's listening history.
 *
 * @param {number} user_id - ID of the user.
 * @param {number} song_id - ID of the song.
 * @returns {Promise<Object>} Confirmation object.
 */
export const addSongToListeningHistory = async (user_id: number, song_id: number) => {
  try {
    await prisma.listening_history.create({
      data: {
        user_id,
        song_id,
        last_played: Date.now(),
      },
    });

    return { message: 'Song added to listening history' };
  } catch (error: any) {
    functions.logger.log('error in controller', error);
    throw new Error(`Unable to add song to listening history: ${error.message}`);
  }
};

/**
 * Retrieve a user's listening history.
 *
 * @param {number} user_id - ID of the user.
 * @returns {Promise<Object[]>} Array of songs in the user's listening history.
 */
export const getUserListeningHistory = async (user_id: number) => {
  try {
    const history = await prisma.listening_history.findMany({
      where: { user_id },
      orderBy: { last_played: 'desc' },
      include: {
        songs: {
          include: {
            song_artists: {
              include: {
                users: {
                  select: {
                    display_name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return history.map((item) => ({
      ...item,
      ...item.songs,
      artist_id: item.songs?.song_artists[0].user_id,
      artist_name: item.songs?.song_artists[0].users?.display_name,
    }));
  } catch (error: any) {
    functions.logger.log('error in controller', error);
    throw new Error(`Unable to get user listening history: ${error.message}`);
  }
};

/**
 * Retrieve multiple users by their user identifiers.
 *
 * @param {number[]} userIds - Array of wallet identifiers.
 * @returns {Promise<Object[]>} Array of user objects.
 */
export const getManyUsersByUserId = async (userIds: number[]) => {
  try {
    const users = await prisma.users.findMany({
      where: {
        id: {
          in: userIds.map((userId) => userId),
        },
      },
      select: {
        id: true,
        profile_picture: true,
        display_name: true,
        wallet: true,
      },
    });

    return users;
  } catch (error: any) {
    functions.logger.log('error in controller', error);
    throw new Error(`Unable to get users by user id: ${error.message}`);
  }
};

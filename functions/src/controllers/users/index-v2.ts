import {PrismaClient} from "@prisma/client";
// import { UserData } from './types';
// import { SongData } from '../songs/types';
// import schemaName from '../../../config';
import * as functions from "firebase-functions";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  try {
    const allUsers = await prisma.users.findMany();
    functions.logger.log("all users", allUsers);
    return allUsers;
  } catch (e) {
    functions.logger.log("error in controller", e);
    return;
  }
};

export const getArtistsAndCurators = async () => {
  try {
    const artists = await prisma.users.findMany({
      where: {role: "artist"},
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
    functions.logger.log("error in controller", e);
    return;
  }
};

export const getUserByWallet = async (wallet: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: {wallet},
    });
    return user;
  } catch (e) {
    functions.logger.log("error in controller", e);
    return;
  }
};

export const updateUser = async (user_id: number, data: any) => {
  try {
    const updatedUser = await prisma.users.update({
      where: {id: user_id},
      data,
    });
    return updatedUser;
  } catch (e) {
    functions.logger.log("error in controller", e);
    return;
  }
};

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
    functions.logger.log("error in controller", e);
    return;
  }
};

export const getUserLikes = async (user_id: number) => {
  try {
    const likedSongIds = await prisma.likes.findMany({
      where: {user_id},
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
    functions.logger.log("error in controller", e);
    return;
  }
};

export const getUserEvents = async (userId: number) => {
  try {
    const userEvents = await prisma.user_events.findMany({
      where: {user_id: userId},
    });
    return userEvents;
  } catch (e) {
    functions.logger.log("error in controller", e);
    return;
  }
};

export const createUser = async (userData: any) => {
  try {
    const user = await prisma.users.create({
      data: userData,
    });

    const eventType = "user_created";
    const eventData = {
      message: "joined heds",
      subject: `${new Date(userData.joined).toLocaleDateString()}`,
    };

    await prisma.user_events.create({
      data: {
        event_type: eventType,
        event_data: JSON.stringify(eventData),
        event_timestamp: new Date(),
        user_id: user.id,
      },
    });

    return user;
  } catch (error: any) {
    functions.logger.log("error in controller", error);
    throw new Error(`Unable to create user: ${error.message}`);
  }
};

export const deleteUser = async (user_id: number) => {
  try {
    await prisma.$transaction([
      prisma.likes.deleteMany({where: {user_id}}),
      prisma.song_artists.deleteMany({where: {user_id}}),
      prisma.user_events.deleteMany({where: {user_id}}),
      prisma.users.delete({where: {id: user_id}}),
    ]);

    return {success: true, message: "User deleted successfully."};
  } catch (error: any) {
    functions.logger.log("error in controller", error);
    throw new Error(`Unable to delete user: ${error.message}`);
  }
};

export const addSongToListeningHistory = async (user_id: number, song_id: number) => {
  try {
    await prisma.listening_history.create({
      data: {
        user_id,
        song_id,
        last_played: new Date(),
      },
    });

    return {message: "Song added to listening history"};
  } catch (error: any) {
    functions.logger.log("error in controller", error);
    throw new Error(`Unable to add song to listening history: ${error.message}`);
  }
};

export const getUserListeningHistory = async (user_id: number) => {
  try {
    const history = await prisma.listening_history.findMany({
      where: {user_id},
      orderBy: {last_played: "desc"},
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
    functions.logger.log("error in controller", error);
    throw new Error(`Unable to get user listening history: ${error.message}`);
  }
};

export const getManyUsersByWalletId = async (walletIds: string[]) => {
  try {
    const users = await prisma.users.findMany({
      where: {
        wallet: {
          in: walletIds.map((walletId) => walletId.toLowerCase()),
        },
      },
      select: {
        profile_picture: true,
        display_name: true,
        wallet: true,
      },
    });

    return users;
  } catch (error: any) {
    functions.logger.log("error in controller", error);
    throw new Error(`Unable to get users by wallet ID: ${error.message}`);
  }
};

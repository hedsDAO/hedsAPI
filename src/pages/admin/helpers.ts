import { Tape } from '@models/common';

export const formatProposalPayload = (tape: Tape) => {
  const choices = tape.songs.map((song) => {
    return {
      artist: song.artists,
      media: song.audio,
      id: song.id,
      image: song.cover,
      name: song.track_name,
      wallet_id: song.artists.map((artist) => artist.artist_wallet),
    };
  });
  const startTime = tape.timeline.vote.start;
  const endTime = tape.timeline.vote.end;
  const state = 0;
  const method = 0;
  return {
    choices,
    startTime,
    endTime,
    state,
    method,
  };
};

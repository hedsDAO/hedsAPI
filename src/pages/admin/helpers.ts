import { Tape } from '@models/common';
import { ogAddressesAndVp } from '@/pages/admin/model/constants';
import { tapesAndVpWeights } from '@/pages/user/models/constants';
import { StrategyName } from 'hedsvote';

export const formatProposalPayload = (tape: Tape) => {
  const tapeNumber = tape.name.slice(tape.name.length - 2);
  const choices = tape.songs
  .filter((song) => song.type !== "sample")
  .map((song) => {
    const artist = song.artists.length > 1 ? song.artists.map((artist) => artist.artist_display_name) : song.artists.length ? song.artists[0].artist_display_name : null;
    const walletId = song.artists.length > 1 ? song.artists.map((artist) => artist.artist_wallet) : song.artists.length ?  song.artists[0].artist_wallet : null;

    return {
      artist: artist,
      media: song.audio,
      id: song.id,
      image: song.submission_data.sub_image,
      name: song.track_name,
      walletId: walletId,
      location: `heds/hedstape/${tapeNumber}`
    };
  });

  const startTime = new Date(tape.timeline.vote.start);
  const endTime = new Date(tape.timeline.vote.end);
  const method = 0;
  return {
    choices,
    startTime,
    endTime,
    method,
  };
};

export const formatStrategiesPayload = (artistsWallets: string[]) => {
  const artistsVp = artistsWallets.reduce((acc, wallet) => ({ ...acc, [wallet]: 15 }), {});

  const tapeContracts = Object.keys(tapesAndVpWeights);
  const tapeVp = new Array(tapeContracts.length).fill(5);

  const whitelistArtists = {
    name: StrategyName.WHITELIST,
    network: '1',
    params: {
      addresses: artistsVp
    }
  };

  const whitelistOG = {
    name: StrategyName.WHITELIST,
    network: '1',
    params: {
      addresses: ogAddressesAndVp,
    }
  };

  const ERC721 = {
    name: StrategyName.ERC721,
    network: '1',
    params: {
      symbol: 'HED',
      tokens: tapeContracts,
      weights: tapeVp,
    },
  };

  return [whitelistArtists, whitelistOG, ERC721];
};

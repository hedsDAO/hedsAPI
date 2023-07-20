import { Tape } from '@models/common';
import { ogAddressesAndVp } from '@/pages/admin/model/constants';
import { tapesAndVpWeights } from '@/pages/user/models/constants';
import { StrategyName } from 'hedsvote';

export const formatProposalPayload = (tape: Tape) => {
  const choices = tape.songs.map((song) => {
    return {
      artist: song.artists.map((artist) => artist.artist_display_name),
      media: song.audio,
      id: song.id,
      image: song.cover,
      name: song.track_name,
      wallet_id: song.artists.map((artist) => artist.artist_wallet),
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
  const tapeVp = Object.values(tapesAndVpWeights);

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

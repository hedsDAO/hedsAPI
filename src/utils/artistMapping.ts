import { ArtistMapping, TrackMetadata, TrackArtistMetadata } from 'src/models/common';

const artistMapping = ([wallets, artistMapping, space, tape, id, isSample]: [Array<string>, ArtistMapping, string, string, string, boolean]): Array<TrackArtistMetadata> => {
  const mappingTank: Array<TrackArtistMetadata> = [];
  wallets.map((address: string) => {
    if (address in artistMapping) {
      const currentTrack: TrackMetadata = isSample ? artistMapping[address]?.samples[space][tape][id] : artistMapping[address]?.tracks[space][tape][id];
      const { displayName, profilePicture, wallet } = artistMapping[address];
      const { duration, track, audio } = currentTrack;
      mappingTank.push({
        displayName,
        profilePicture,
        wallet,
        duration: duration || null,
        track: track || null,
        audio: audio || null,
      });
    }
  });
  return mappingTank;
};

export default artistMapping;

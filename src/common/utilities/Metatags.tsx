import { Song, Tape, User } from '@/models/common';
import { VoteState } from '@/pages/vote/models/voteModel';
import { DateTime } from 'luxon';
import { Helmet } from 'react-helmet';

export enum MetatagTypes {
  LANDING = 0,
  EXPLORE,
  SONG,
  USER,
  TAPE,
  VOTE,
  ARTISTS,
  TAPES,
  FAQ,
  NOTFOUND,
}

export const Metatags = ({
  type,
  song,
  tape,
  user,
  vote,
  children,
}: {
  type: MetatagTypes;
  song?: Song;
  user?: User;
  tape?: Tape;
  vote?: VoteState;
  children: React.ReactNode;
}) => (
  <>
    <Helmet>
      {type === MetatagTypes.LANDING && <LandingMetatags />}
      {type === MetatagTypes.EXPLORE && <ExploreMetatags />}
      {type === MetatagTypes.SONG && <SongMetatags song={song} />}
      {type === MetatagTypes.USER && <UserMetatags user={user} />}
      {type === MetatagTypes.TAPE && <TapeMetatags tape={tape} />}
      {type === MetatagTypes.VOTE && <VoteMetatags vote={vote} />}
      {type === MetatagTypes.ARTISTS && <ArtistsMetatags />}
      {type === MetatagTypes.TAPES && <TapesMetatags />}
      {type === MetatagTypes.FAQ && <FAQMetatags />}
      {type === MetatagTypes.NOTFOUND && <NotFoundMetatags />}
    </Helmet>
    {children}
  </>
);

const LandingMetatags = () => (
  <>
    <title>heds</title>
    <meta name="description" content="A media curation company and cultural brand that allows creative communities to collaborate." />
    <meta property="og:title" content="heds" />
    <meta property="og:description" content="A media curation company and cultural brand that allows creative communities to collaborate." />
    <meta property="og:image" content="https://www.heds.cloud/ipfs/QmYV7wrFP8B4NrQnCrAydoKUx7T9jGCRLH3xHqUVnAC9c2" />
    <meta property="og:url" content="https://www.heds.app" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="heds" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@hedsDAO" />
    <meta name="twitter:site" content="@hedsDAO" />
  </>
);

const ExploreMetatags = () => (
  <>
    <title>heds - explore</title>
    <meta name="description" content="Explore the heds catalog and new releases" />
    <meta property="og:title" content="heds - explore" />
    <meta property="og:description" content="Explore the heds catalog and new releases" />
    <meta property="og:image" content="https://www.heds.cloud/ipfs/QmYV7wrFP8B4NrQnCrAydoKUx7T9jGCRLH3xHqUVnAC9c2" />
    <meta property="og:url" content="https://www.heds.app/explore" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="heds" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@hedsDAO" />
    <meta name="twitter:site" content="@hedsDAO" />
  </>
);

const SongMetatags = ({ song }: { song: Song }) => {
  const isPublic = song?.public;
  const anon = 'Anonymous';
  return (
    <>
      <Helmet>
        <title>
          {song?.track_name} by {isPublic ? song?.artists?.map((e) => e?.display_name)?.join(', ') : anon}
        </title>
        <meta name="description" content={`Listen to ${song?.track_name} by ${isPublic ? song?.artists?.map((e) => e?.display_name)?.join(', ') : anon}`} />
        <meta property="og:title" content={`${song?.track_name} by ${isPublic ? song?.artists?.map((e) => e?.display_name)?.join(', ') : anon}`} />
        <meta
          property="og:description"
          content={`Listen to ${song?.track_name} by ${isPublic ? song?.artists?.map((e) => e?.display_name)?.join(', ') : anon}`}
        />
        <meta property="og:image" content={song?.cover} />
        <meta property="og:url" content={`https://www.heds.app/song/${song?.id}`} />
        <meta property="og:type" content="music.song" />
        {song?.duration > 0 ? <meta property="music:duration" content={`${song?.duration}`} /> : <></>}
        <meta property="music:album" content={`https://www.heds.app/tape/${song?.tape_id}`} />
        {song?.track_data?.track_no > 0 ? <meta property="music:album:track" content={`${song?.track_data?.track_no}`} /> : <></>}
        {isPublic ? song?.artists?.map((artist, i) => <meta key={i} property="music:musician" content={`https://www.heds.app/u/${artist?.wallet}`} />) : <></>}
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="heds" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@hedsDAO" />
        <meta name="twitter:site" content="@hedsDAO" />
      </Helmet>
    </>
  );
};

const UserMetatags = ({ user }: { user: User }) => (
  <>
    <Helmet>
      <title>heds - {user?.display_name || user?.twitter_handle}</title>
      <meta name="description" content={`View ${user?.display_name || user?.twitter_handle}'s heds profile.`} />
      <meta property="og:title" content={`heds - ${user?.display_name || user?.twitter_handle}`} />
      <meta property="og:description" content={`View ${user?.display_name || user?.twitter_handle}'s heds profile.`} />
      <meta property="og:image" content={user?.profile_picture} />
      <meta property="og:url" content={`https://www.heds.app/u/${user?.wallet}`} />
      <meta property="og:type" content="profile" />
      <meta property="profile:username" content={user?.display_name || user?.twitter_handle} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="heds" />
      <meta name="twitter:card" content="summary" />
      {user?.twitter_handle ? <meta name="twitter:creator" content={user?.twitter_handle} /> : <></>}
      <meta name="twitter:site" content="@hedsDAO" />
    </Helmet>
  </>
);

const TapeMetatags = ({ tape }: { tape: Tape }) => (
  <>
    <Helmet>
      <title>
        {tape?.name} - curated by {tape?.sampleArtists?.map((e) => e?.display_name).join(', ')}
      </title>
      <meta name="description" content={`Listen to ${tape?.name} curated by ${tape?.sampleArtists?.map((e) => e?.display_name).join(', ')} on heds.`} />
      <meta property="og:title" content={`${tape?.name} - curated by ${tape?.sampleArtists?.map((e) => e?.display_name).join(', ')}`} />
      <meta property="og:description" content={`Listen to ${tape?.name} curated by ${tape?.sampleArtists?.map((e) => e?.display_name).join(', ')} on heds.`} />
      <meta property="og:image" content={tape?.image} />
      <meta property="og:url" content={`https://www.heds.app/tape/${tape?.id}`} />
      <meta property="og:type" content="music.album" />
      {tape?.sampleArtists?.length > 1 ? <></> : <meta property="music:musician" content={`https://www.heds.app/u/${tape?.sampleArtists?.[0]?.wallet}`} />}
      <meta property="music:release_date" content={DateTime.fromMillis(tape?.timeline.mint?.end).toFormat('yyyy LLLL dddd')} />
      {tape.songs.map((song, i) => (
        <meta key={i} property="music:song" content={`https://www.heds.app/song/${song.audio?.split('/ipfs/')[1]}`} />
      ))}
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="heds" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@hedsDAO" />
      <meta name="twitter:site" content="@hedsDAO" />
    </Helmet>
  </>
);

const ArtistsMetatags = () => (
  <>
    <title>heds - artists</title>
    <meta name="description" content="Explore the heds artists and curators" />
    <meta property="og:title" content="heds - artists" />
    <meta property="og:description" content="Explore the heds artists and curators" />
    <meta property="og:image" content="https://www.heds.cloud/ipfs/QmYV7wrFP8B4NrQnCrAydoKUx7T9jGCRLH3xHqUVnAC9c2" />
    <meta property="og:url" content="https://www.heds.app/artists" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="heds" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@hedsDAO" />
    <meta name="twitter:site" content="@hedsDAO" />
  </>
);

const TapesMetatags = () => (
  <>
    <title>heds - tapes</title>
    <meta name="description" content="Explore the hedsTAPES and our collaborations" />
    <meta property="og:title" content="heds - tapes" />
    <meta property="og:description" content="Explore the hedsTAPES and our collaborations" />
    <meta property="og:image" content="https://www.heds.cloud/ipfs/QmYV7wrFP8B4NrQnCrAydoKUx7T9jGCRLH3xHqUVnAC9c2" />
    <meta property="og:url" content="https://www.heds.app/tapes" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="heds" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@hedsDAO" />
    <meta name="twitter:site" content="@hedsDAO" />
  </>
);

const NotFoundMetatags = () => (
  <>
    <title>heds - 404</title>
    <meta name="description" content="The page you're looking for couldn't be found" />
    <meta property="og:title" content="heds - 404" />
    <meta property="og:description" content="The page you're looking for couldn't be found" />
    <meta property="og:image" content="https://www.heds.cloud/ipfs/QmYV7wrFP8B4NrQnCrAydoKUx7T9jGCRLH3xHqUVnAC9c2" />
    <meta property="og:url" content="https://www.heds.app/404" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="heds" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@hedsDAO" />
    <meta name="twitter:site" content="@hedsDAO" />
  </>
);

const VoteMetatags = ({ vote }: { vote: VoteState }) => (
  <>
    <title>heds - {vote?.title}</title>
    <meta name="description" content={vote?.description} />
    <meta property="og:title" content={`heds - ${vote?.title}`} />
    <meta property="og:description" content={vote?.description} />
    <meta property="og:image" content="https://www.heds.cloud/ipfs/QmYV7wrFP8B4NrQnCrAydoKUx7T9jGCRLH3xHqUVnAC9c2" />
    <meta property="og:url" content={`https://www.heds.app/vote/${vote?.ipfs_hash}`} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="heds" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@hedsDAO" />
    <meta name="twitter:site" content="@hedsDAO" />
  </>
);

const FAQMetatags = () => (
  <>
    <title>heds - FAQ</title>
    <meta name="description" content={'frequently asked questions'} />
    <meta property="og:title" content={`heds - FAQ`} />
    <meta property="og:description" content={'frequently asked questions'} />
    <meta property="og:image" content="https://www.heds.cloud/ipfs/QmYV7wrFP8B4NrQnCrAydoKUx7T9jGCRLH3xHqUVnAC9c2" />
    <meta property="og:url" content={`https://www.heds.app/faq`} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="heds" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@hedsDAO" />
    <meta name="twitter:site" content="@hedsDAO" />
  </>
);

import { ChakraProps } from '@chakra-ui/react';

/**
 * @global
 * @const STATS_DATA : data for stats section on explore page.
 * @const OPENSEA_EVENTS_CLOUD_FUNCTION : url for opensea events cloud function.
 */

export const STATS_DATA = [
  { label: 'Tapes Minted', value: '734' },
  { label: 'Value Generated', value: '$234,517' },
  { label: 'Submissions', value: '438' },
  { label: 'Unique Minters', value: '207' },
];

export const OPENSEA_EVENTS_CLOUD_FUNCTION = `https://us-central1-heds-104d8.cloudfunctions.net/activeListings`;
export const OPENSEA_LIMIT = 2;

/**
 * @component <Explore/>
 * @const MAX_TOP_ARTISTS : Max number of top artists to display.
 * @const HEDS_IMG_PROPS : chakra image style props for heddot image.
 */

export const MAX_TOP_ARTISTS = 4;
export const HEDS_IMG_PROPS = {
  opacity: '50%',
  zIndex: '10',
  top: '24',
  left: '72%',
  maxH: '50rem',
  display: {
    lg: 'block',
    base: 'none',
  },
  position: 'absolute',
  objectFit: 'contain',
  style: { filter: 'invert(0.75)' },
} as ChakraProps;

/**
 * @component <HedsSolo/>
 * @const HEDS_SOLO_HEADING : heading for HedsSolo page.
 * @const HEDS_SOLO_TITLE : title for HedsSolo page.
 * @const HEDS_SOLO_DESC : description for HedsSolo page.
 * @const HEDS_SOLO_ARTIST : dabow - current address for hedSOLO spotlight
 */

export const HEDS_SOLO_HEADING = 'introducing';
export const HEDS_SOLO_TITLE = 'hedSOLO';
export const HEDS_SOLO_DESC = `heds is honored to introduce the second artist(s) featured via our hedSOLO drops. Created by electronic music legends and heds OG's oshi and sober rob, "LAZER BUCK" is a new experimental bass heavy project from the duo.`;
export const HEDS_SOLO_ARTIST = '0x8b5c660acd1ab7011143ccf615b6b9adf68e7904';
export const HEDS_SOLO_SOUND_LINK = 'https://www.sound.xyz/heds/lazer-buck-adrenochrome';

/**
 * @component <HedsPlayer/>
 * @const HEDS_PLAYER_HEADING : heading for HedsPlayer page.
 * @const BOX_ONE_TITLE : title for box one.
 * @const BOX_ONE_DESC : description for box one.
 * @const BOX_ONE_DATE : deadline for box one.
 * @const BOX_TWO_DESC : description for box two.
 * @const HEDS_PLAYER_ARTIST : 2osc - hedsPlayer artist.
 */

export const HEDS_PLAYER_HEADING = 'hedsPLAYER';
export const BOX_ONE_TITLE = 'heds x secret garden';
export const BOX_ONE_DESC = 'release type: collabTAPE';
export const BOX_ONE_DATE = 'mint date: FEBRUARY 1ST. 2023';
export const BOX_TWO_DESC = `in collaboration with three oscillators & secretgarden.fm, we've invited heds artists to participate in the creation of the first hedsPLAYER, a curated stem player & NFT collection`;
export const HEDS_PLAYER_ARTIST = '0x0a7c3007f2156ff8db9579efb7adbbd7212d3c3c';

/**
 * @component <LatestTape/>
 * @const LATEST_TAPE_HEADING : heading for latest tape page.
 * @const LATEST_TAPE_TITLE : title for latest tape page.
 * @const LATEST_TAPE_DESC : description for latest tape page.
 * @const LATEST_TAPE_ARTIST : dabow - current address for latest tape spotlight
 */

export const LATEST_TAPE_HEADING = 'COMMUNITY CURATION COMPLETE';
export const LATEST_TAPE_TITLE = 'hedsTAPE 11';
export const LATEST_TAPE_DESC =
  "The iconic mija has offered her inimitable take on a wide variety of electronic projects. For the first hedsTAPE of 2023, we're beyond excited to invite her on as the curator for HT11.";
export const LATEST_TAPE_ARTIST = '0xe4c80780cc7fc7047bccb30e2cbcb67400752a88';
export const LATEST_TAPE_LINK = '/listen/heds/hedstape/11';
export const LATEST_TAPE_PROMO_IMG =
  'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/promo%2Fartists%2F1.jpeg?alt=media&token=7df1c199-4fc9-4f02-b854-b42376770fe1';

/**
 * @component <MostAppearances/>
 * @const MOST_AP_TITLE : title for MostAppearances page.
 * @const MOST_AP_DESC : description for MostAppearances page.
 * @const MOST_AP_BUTTON : view all artists button text.
 */

export const MOST_AP_TITLE = 'Most Appearances';
export const MOST_AP_DESC = 'these artists have been voted on to multiple hedsTAPES via our curation community.';
export const MOST_AP_BUTTON = 'all artists';

/**
 * @component <ActiveListings/>
 * @const LISTINGS_TITLE : title for MostAppearances page.
 * @const LISTINGS_DESC : description for MostAppearances page.
 * @const LISTINGS_BUTTON : view all listings button text.
 */

export const LISTINGS_TITLE = 'Active Listings';
export const LISTINGS_DESC = 'available heds projects to add to your collection.';

import { ChakraProps } from '@chakra-ui/react';

/**
 * @global
 * @const ALL_TAPE_SLUGS : creates array of url slugs to fetch opensea events:
 * @const STATS_DATA : data for stats section on explore page.
 */

export const STATS_DATA = [
  { label: 'Tapes Minted', value: '734' },
  { label: 'Value Generated', value: '$234,517' },
  { label: 'Submissions', value: '438' },
  { label: 'Unique Minters', value: '207' },
];

const SLUG_TANK = Array.apply(null, { length: 10 });
export const ALL_TAPE_SLUGS = SLUG_TANK.map((_: null, i: number) => 'hedstape-' + (i + 1));

/**
 * @component <Explore/>
 * @const MAX_TOP_ARTISTS : Max number of top artists to display.
 * @const HEDS_IMG_PROPS : chakra image style props for heddot image.
 */

export const MAX_TOP_ARTISTS = 4;
export const HEDS_IMG_PROPS = {
  opacity: '50%',
  top: '24',
  left: '72%',
  maxH: '50rem',
  position: 'absolute',
  objectFit: 'contain',
  style: { filter: 'invert(0.75)' },
  src: '/heddot.png',
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
export const HEDS_SOLO_DESC = 'a new look into the worldwide heds community, featuring solo releases from artists representing the future of music.';
export const HEDS_SOLO_ARTIST = '0xd4a1b8f85e4df6afb1c66e54250ae9e216fc388d';

/**
 * @component <NewestTape/>
 * @const NEWEST_TAPE_HEADING : heading for NewestTape page.
 * @const BOX_ONE_TITLE : title for box one.
 * @const BOX_ONE_DESC : description for box one.
 * @const BOX_ONE_DATE : deadline for box one.
 * @const BOX_TWO_DESC : description for box two.
 * @const NEWEST_TAPE_ARTIST : 2osc - newest tape artist.
 */

export const NEWEST_TAPE_HEADING = 'NEWEST TAPE';
export const BOX_ONE_TITLE = 'heds x secret garden';
export const BOX_ONE_DESC = 'release type: collabTAPE';
export const BOX_ONE_DATE = 'mint date: FEBRUARY 3RD. 2023';
export const BOX_TWO_DESC = `in collaboration with three oscillators & secretgarden.fm, we've invited heds artists to participate in the creation of the first hedsPLAYER, acurated stem player & NFT collection`;
export const NEWEST_TAPE_ARTIST = '0x0a7c3007f2156ff8db9579efb7adbbd7212d3c3c';

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

export const LISTINGS_TITLE = 'Most Appearances';
export const LISTINGS_DESC = 'these artists have been voted on to multiple hedsTAPES via our curation community.';
export const LISTINGS_BUTTON = 'see all';

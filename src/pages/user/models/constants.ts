/**
 * @constant {string[]} USER_NAV_TABS
 * @description Array of strings that contains the names of the tabs used in
 * the User component.
 */
export const USER_NAV_TABS: string[] = ['Collection', 'Likes', 'Discography'];

/**
 * @constant {string} ARTIST_TEXT
 * @description String that contains the text for the 'ARTIST' Text element on the spotlight component.
 */
export const ARTIST_TEXT: string = 'ARTIST';

/**
 * @constant {string} VP_TOOLTIP_TEXT
 * @description String that contains descriptive text for the VP Tooltip.
 */

export const VP_TOOLTIP_TEXT = 'This number is calculated by your collection items and their weights';

/**
 * @constant { [key: string]: number } tapesAndVpWeights
 * @description Object that contains the weights for the tapes and VP
 */

export const tapesAndVpWeights: { [key: string]: number } = {
  '0xde8a0b17d3dc0468adc65309881d9d6a6cd66372': 9,
  '0x5083cf11003f2b25ca7456717e6dc980545002e5': 6,
  '0x567e687c93103010962f9e9cf5730ae8dbfc6d41': 5,
  '0x8045fd700946a00436923f37d08f280ade3b4af6': 7,
  '0x8f36eb094f7b960a234a482d4d8ffb8b37f728c6': 6,
  '0x885236535d5cf7033bdc5bc1050cad7fdf4970a6': 5,
  '0x20f2717f113d0b3815124876f3d72f8e1179341e': 6,
  '0xa2aced918e8cff703b8bb4129a30146a1dc35675': 7,
  '0xeb8377be44222e90388ff8bb04be27f9bfc6a98e': 8,
  '0x9f396644ec4b2a2bc3c6cf665d29165dde0e83f1': 7,
  '0xfdf7d7ffe3d363f858644057ebc62afabb99152a': 7,
  '0xb18510437452dad3fe78e518afab1f314540db68': 7,
  '0xdac992430bd547e91e9a4631d92f7613ffa47e47': 5,
  '0x904d764440ad567091c7f1f5265b6cce445efc96': 5,
};

/**
 * @constant {string} STOCK_IMAGE - URL for the stock spotlight image.
 * @constant {string} STOCK_HEADER - stock header text for the spotlight component.
 * @constant {string} STOCK_DESC - stock description text for the spotlight component.
 */

export const STOCK_IMAGE = 'https://www.heds.cloud/ipfs/QmQZPNohaxYn3JXwRFXzixZUatT263psYfZaWzCiNmR4c4';
export const STOCK_HEADER = 'Spotlight';
export const STOCK_DESC = `There's nothing here...`;

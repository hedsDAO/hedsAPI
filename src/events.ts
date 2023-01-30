import ReactGA from 'react-ga4';

/**Intialize GA */
export const initGA = () => ReactGA.initialize('G-EES6VXHESQ');

/** PAGEVIEWS */
export const setPageViewEvents = () => {
  ReactGA.send({ hitType: 'pageview', page: '/' });
  ReactGA.send({ hitType: 'pageview', page: '/explore' });
  ReactGA.send({ hitType: 'pageview', page: '/vote' });
  ReactGA.send({ hitType: 'pageview', page: '/arists' });
  ReactGA.send({ hitType: 'pageview', page: '/tapes' });
  return;
};

/** EVENTS */

// Connect
export const connectWallet = () => ReactGA.event({ category: 'Connect', action: 'Connect Wallet' });
export const connectMetamask = () => ReactGA.event({ category: 'Connect', action: 'Connect Metamask' });
export const connectWalletConnect = () => ReactGA.event({ category: 'Connect', action: 'Connect WalletConnect' });
export const connectMetamaskSuccess = () => ReactGA.event({ category: 'Connect', action: 'Connect Metamask Success' });
export const connectWalletConnectSuccess = () => ReactGA.event({ category: 'Connect', action: 'Connect WalletConnect Success' });

// Explore

export const clickHedsSoloFeatureLink = () => ReactGA.event({ category: 'Explore', action: 'Click Heds Solo Feature Card Link' });
export const clickNewestTapeFeatureLink = () => ReactGA.event({ category: 'Explore', action: 'Click Newest Tape Feature Card Link' });
export const clickSeeAllArtist = () => ReactGA.event({ category: 'Explore', action: 'Click See All Artist' });
export const clickLinkToArtistFromMostAppearancesCard = () => ReactGA.event({ category: 'Explore', action: 'Click Link To Artist From Most Appearances Card' });
export const clickLinkToTapeFromMostAppearancesCard = () => ReactGA.event({ category: 'Explore', action: 'Click Link To Tape From Most Appearances Card' });
export const clickSeeAllActiveListings = () => ReactGA.event({ category: 'Explore', action: 'Click See All Active Listings' });
export const clickLinkToSecondaryListing = () => ReactGA.event({ category: 'Explore', action: 'Click Link To Secondary Listing' });

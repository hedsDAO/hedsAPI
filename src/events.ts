import ReactGA from 'react-ga4';

/**Intialize GA */
export const initGA = () => ReactGA.initialize('G-EWK413GWSB');

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

// Explore Page
export const clickHedsSoloFeatureLink = () => ReactGA.event({ category: 'Explore Page', action: 'Click Heds Solo Feature Card Link' });
export const clickNewestTapeFeatureLink = () => ReactGA.event({ category: 'Explore Page', action: 'Click Newest Tape Feature Card Link' });
export const clickSeeAllArtist = () => ReactGA.event({ category: 'Explore Page', action: 'Click See All Artist' });
export const clickLinkToArtistFromMostAppearancesCard = () => ReactGA.event({ category: 'Explore Page', action: 'Click Link To Artist From Most Appearances Card' });
export const clickLinkToTapeFromMostAppearancesCard = () => ReactGA.event({ category: 'Explore Page', action: 'Click Link To Tape From Most Appearances Card' });
export const clickSeeAllActiveListings = () => ReactGA.event({ category: 'Explore Page', action: 'Click See All Active Listings' });
export const clickLinkToSecondaryListing = () => ReactGA.event({ category: 'Explore Page', action: 'Click Link To Secondary Listing' });

// Tapes Page
export const clickTapeCard = (tape: string) => ReactGA.event({ category: 'Tapes Page', action: 'Click Tape Card', label: tape });
export const clickToggleCollabTape = () => ReactGA.event({ category: 'Tapes Page', action: 'Click Toggle Collab Tape' });

// Artists Page
export const clickCuratorCard = (curator: string) => ReactGA.event({ category: 'Artists Page', action: 'Click Curator Card', label: curator });
export const clickArtistCard = (artist: string) => ReactGA.event({ category: 'Artists Page', action: 'Click Artist Card', label: artist });

// Vote Page
export const clickViewVoteFromHeaderCarousel = (tape: string) => ReactGA.event({ category: 'Vote Page', action: 'Click View Vote From Header Carousel', label: tape });
export const clickVoteCardFromVoteLanding = (tape: string) => ReactGA.event({ category: 'Vote Page', action: 'Click Vote Card From Vote Landing', label: tape });

// Tape Page
export const clickViewAllTapes = () => ReactGA.event({ category: 'Tape Page', action: 'Click View All Tapes' });
export const clickPlayTapeVideo = (tape: string) => ReactGA.event({ category: 'Tape Page', action: 'Click Play Tape Video', label: tape  });
export const clickLinkToOpensea = (tape: string) => ReactGA.event({ category: 'Tape Page', action: 'Click Link To Opensea', label: tape });
export const clickLinkToOpenseaNextToMintButton = (tape: string) => ReactGA.event({ category: 'Tape Page', action: 'Click Link To Opensea - Button in Tape Timeline', label: tape });
export const clickLinkToEtherscan = (tape: string) => ReactGA.event({ category: 'Tape Page', action: 'Click Link To Etherscan', label: tape });
export const clickSubmitButton = (tape: string) => ReactGA.event({ category: 'Tape Page', action: 'Click Submit Button', label: tape });
export const clickDownloadSampleButton = (tape: string) => ReactGA.event({ category: 'Tape Page', action: 'Click Download Sample Button', label: tape });
export const clickDownloadSampleButtonInModal = (tape: string) => ReactGA.event({ category: 'Tape Page', action: 'Click Download Sample Button In Modal', label: tape });
export const clickViewVoteResultsButton = (tape: string) => ReactGA.event({ category: 'Tape Page', action: 'Click View Vote Results Button', label: tape });
export const clickViewLiveVoteButton = (tape: string) => ReactGA.event({ category: 'Tape Page', action: 'Click View Live Vote Button', label: tape });
export const clickMintButton = (tape: string) => ReactGA.event({ category: 'Tape Page', action: 'Click Mint Button', label: tape });

import { DocumentData } from "firebase/firestore";

export interface HedsTapeListing {
  market: any;
  tokenId: any;
  price: any;
  name: any;
  image: any;
  listed: any;
  link: any;
  seller: string;
}

export interface ExploreState {
  isLoading: boolean;
  secondaryListings: HedsTapeListing[];
  hasFetchedAllListings: boolean;
  scrollDataMax: number;
  exploreData: DocumentData;
  carouselOrder: string[];
}

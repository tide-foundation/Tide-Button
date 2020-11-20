export interface Config {
  homeUrl: string;
  serverUrl: string;
  chosenOrk: string;
  vendorPublic: string;
  hashedReturnUrl: string;
  vendorName: string;
  orks: string[];
  debug?: boolean;
}

export interface Config {
  mode: string;
  homeUrl: string;
  serverUrl: string;
  chosenOrk: string;
  vendorPublic: string;
  hashedReturnUrl: string;
  vendorName: string;
  orks: string[];
  debug?: boolean;

  formData?: any;
  keepOpen: boolean;
  overrideText?: string;
}

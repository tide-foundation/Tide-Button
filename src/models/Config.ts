export interface Config {
  mode?: ModeType;
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
  manualElementId?: string;
}

export type ModeType = "auto" | "button" | "frame" | "manual";

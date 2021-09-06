export {};

declare global {
  interface Config {
    mode?: ModeType;
    homeUrl: string;
    serverUrl: string;
    chosenOrk: string;
    vendorPublic: string;
    hashedReturnUrl: string;
    vendorName: string;
    orks: string[];
    debug?: boolean;
    returnUrl?: string;

    formData?: any;
    keepOpen: boolean;
    overrideText?: string;
    manualElementId?: string;
    demoMode: boolean;
    logo?: string;
    stylesheet?: string;

    finalizeAuthentication: (account: any) => void;
  }

  type ModeType = "auto" | "button" | "frame" | "manual" | "redirect";

  // Auto:       popup opens immediately
  // Button:     generated a tide button given an id
  // Frame:      Embeds an enclave iframe into the page given an id
  // Manual:     Attach your own event listener
  // Redirect    Redirects to a full page enclave
}

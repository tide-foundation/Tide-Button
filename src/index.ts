import mitt from "mitt";
import { initFrame } from "./modes/frame-mode";
import { initManual } from "./modes/manual-mode";
import { openAuth } from "./modes/open-popup";
import { initRedirect } from "./modes/redirect-mode";

type Events = {
  updateButtonStatus: string;
  updateButtonProcessing: boolean;
};

export const emitter = mitt<Events>();

var config: Config;
var mode: ModeType;

export default function init(configuration: Config) {
  console.log("inside tide");
  config = configuration;
  if (document.readyState === "complete") {
    // When navigating back to the page in an SPA we need to give the page time to load.
    setTimeout(() => run(), 200);
  } else window.onload = () => run();

  function run() {
    mode = config.mode != null && config.mode != "auto" ? config.mode : "auto";

    if (mode == "auto") openAuth(config);
    else if (mode == "manual") initManual(config);
    else if (mode == "redirect") initRedirect(config);
    else if (mode == "frame") initFrame(config);
  }
}

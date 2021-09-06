import { openAuth } from "./open-popup";

var config: Config;

export function initManual(c: Config) {
  config = c;

  executeManual();
}

function executeManual() {
  if (config.manualElementId == null) throw Error("No element ID was provided to initialize Tide");
  var ele = document.getElementById(config.manualElementId)!;
  ele.addEventListener("click", () => openAuth(config));
}

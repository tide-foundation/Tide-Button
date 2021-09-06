var iframeElement: HTMLElement;

var config: Config;
var win: Window;

export function initFrame(c: Config) {
  config = c;
  createFrame();
}

function createFrame() {
  iframeElement = document.getElementById("tide")!;

  var ifrm = document.createElement("iframe");
  ifrm.id = "tide-frame";

  ifrm.name = config.homeUrl;
  ifrm.setAttribute("src", `${config.chosenOrk}${assembleHashParams()}`);
  ifrm.style.width = "550px";
  ifrm.style.height = "650px";
  iframeElement.appendChild(ifrm);
  win = ifrm.contentWindow!;
  ifrm.onload = () => win.postMessage("tide-check-load", config.chosenOrk);
}

function assembleHashParams() {
  return `#origin=${config.homeUrl}`;
}

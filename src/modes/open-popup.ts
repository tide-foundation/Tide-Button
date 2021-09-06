import { emitter } from "../index";
var win: Window;
var closeCheck: number;
var config: Config;

export function openAuth(c: Config) {
  config = c;
  // Initialize
  win = window.open(config.chosenOrk, config.homeUrl, `width=${config.debug ? "550" : "550"}, height=650,top=150px,right=${window.innerWidth / 2}`)!; // Using name as home url. This is a dirty way I found to feed in the return url initially

  emitter.emit("updateButtonStatus", "Awaiting Login");
  emitter.emit("updateButtonProcessing", true);

  win.focus();

  // Check for window close
  closeCheck = window.setInterval(() => {
    if (win.closed) {
      emitter.emit("updateButtonStatus", "Window closed without action");
      emitter.emit("updateButtonProcessing", false);
      clearInterval(closeCheck);
    }
  }, 100);
}

// Listen for events
window.addEventListener("message", (e) => {
  if (e.data.type == "tide-onload") {
    win.postMessage({ type: "tide-init", ...config }, config.chosenOrk);
  }

  if (e.data.type == "tide-authenticated") handleFinishAuthentication(e.data);
  if (e.data.type == "tide-failed") handleTideFailed(e.data);
  if (e.data.type == "tide-change-ork") handleChangeOrk(e.data);
  if (e.data.type == "tide-form") handleReceiveData(e.data);
  if (e.data.type == "tide-close") closeWindow();
});

function handleFinishAuthentication(data: any) {
  clearInterval(closeCheck);
  config.finalizeAuthentication(data);
  emitter.emit("updateButtonStatus", "Complete");
}

function handleReceiveData(data: any) {
  window.dispatchEvent(new CustomEvent("tide-form", { detail: data }));
}

function closeWindow() {
  if (config.mode == "frame") return;
  clearInterval(closeCheck);
  win.close();
  emitter.emit("updateButtonProcessing", false);
  // win = null;
}

function handleTideFailed(data: any) {
  clearInterval(closeCheck);
  win.close();
  emitter.emit("updateButtonStatus", data.data.error);
}

function handleChangeOrk(data: any) {
  clearInterval(closeCheck);
  config.chosenOrk = data.data.newOrk;
  openAuth(config);
}

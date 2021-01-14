import { Config } from "./models/Config";
import { btnHtml } from "./btn-html";

var closeCheck: number;
var win: Window;
var btn: Element;
var iframeElement: Element;
var logo: Element;
var logoBack: Element;

var config: Config;

function createButton() {
  btn = document.getElementById("tide");
  if (btn == null) return;
  btn.innerHTML = btnHtml;

  logo = document.getElementById("tide-logo");
  logoBack = document.getElementById("logo-back");

  if (config.overrideText != null) {
    var btnText = document.getElementById("tide-title");
    btnText.innerHTML = config.overrideText;
  }

  btn.addEventListener("click", () => openAuth());
}

function createFrame(config: Config) {
  iframeElement = document.getElementById("tide");
  if (iframeElement == null) return;

  var ifrm = document.createElement("iframe");
  ifrm.id = "tide-frame";
  ifrm.name = "testing";
  ifrm.setAttribute("src", config.chosenOrk);
  ifrm.style.width = "550px";
  ifrm.style.height = "650px";
  iframeElement.appendChild(ifrm);
}

// Listen for events
window.addEventListener("message", (e) => {
  console.log(e.data);
  if (e.data.type == "tide-onload") {
    console.log("loaded");
    win.postMessage(
      {
        type: "tide-init",
        serverUrl: config.serverUrl,
        vendorPublic: config.vendorPublic,
        hashedReturnUrl: config.hashedReturnUrl,
        orks: config.orks,
        vendorName: config.vendorName,
        debug: config.debug,
        formData: config.formData,
        keepOpen: true,
      },
      config.chosenOrk
    );
  }

  if (e.data.type == "tide-authenticated") handleFinishAuthentication(e.data);
  if (e.data.type == "tide-failed") handleTideFailed(e.data);
  if (e.data.type == "tide-change-ork") handleChangeOrk(e.data);
  if (e.data.type == "tide-form") handleReceiveData(e.data);
  if (e.data.type == "tide-close") closeWindow();
});

function openAuth() {
  // Initialize
  win = window.open(config.chosenOrk, config.homeUrl, `width=${config.debug ? "550" : "550"}, height=650,top=0,right=0`); // Using name as home url. This is a dirty way I found to feed in the return url initially
  if (win == null) return;
  updateStatus("Awaiting login");
  toggleProcessing(true);

  // Check for window close
  closeCheck = window.setInterval(() => {
    if (win.closed) handleCloseEarly();
  }, 100);
}

function updateStatus(msg: string) {
  document.getElementById("status-text").innerHTML = msg;
}

function handleCloseEarly() {
  updateStatus("Window closed without action");
  clearInterval(closeCheck);
  toggleProcessing(false);
}

function handleFinishAuthentication(data: any) {
  clearInterval(closeCheck);
  updateStatus("Finishing authentication");

  if (data.data.autoClose) closeWindow();
  window.dispatchEvent(new CustomEvent("tide-auth", { detail: data }));

  updateStatus("Complete");
}

function handleReceiveData(data: any) {
  window.dispatchEvent(new CustomEvent("tide-form", { detail: data }));
}

function closeWindow() {
  clearInterval(closeCheck);
  win.close();
  toggleProcessing(false);
  win = null;
}

function handleTideFailed(data: any) {
  clearInterval(closeCheck);
  win.close();
  updateStatus(data.data.error);
}

function handleChangeOrk(data: any) {
  clearInterval(closeCheck);
  config.chosenOrk = data.data.newOrk;
  openAuth();
}

function toggleProcessing(on: boolean) {
  logo.classList[on ? "add" : "remove"]("processing");
  logoBack.classList[on ? "add" : "remove"]("processing");
}

export function init(configuration: Config) {
  config = configuration;
  console.log(config);
  window.onload = () => {
    if (config.mode == null || config.mode == "" || config.mode == "button") createButton();
    else createFrame(config);
  };
}

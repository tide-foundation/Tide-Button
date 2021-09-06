import { btnHtml } from "../btn-html";
import { openAuth } from "./open-popup";

import { emitter } from "../index";

var btn: HTMLElement;
var logo: HTMLElement;
var logoBack: HTMLElement;
var statusText: HTMLElement;
var config: Config;

export function initButton(c: Config) {
  config = c;
  createButton();
}

function createButton() {
  config = config;
  btn = document.getElementById("tide")!;
  logo = document.getElementById("tide-logo")!;
  logoBack = document.getElementById("logo-back")!;
  statusText = document.getElementById("status-text")!;

  btn.innerHTML = btnHtml;

  if (config.overrideText != null) {
    var btnText = document.getElementById("tide-title")!;
    btnText.innerHTML = config.overrideText;
  }

  btn.addEventListener("click", () => openAuth(config));

  emitter.on("updateButtonStatus", (s: string) => (statusText.innerHTML = s));
  emitter.on("updateButtonProcessing", (on: boolean) => {
    logo.classList[on ? "add" : "remove"]("processing");
    logoBack.classList[on ? "add" : "remove"]("processing");
  });
}

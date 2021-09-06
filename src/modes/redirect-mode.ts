var config: Config;

export function initRedirect(c: Config) {
  config = c;
  redirect();
}

function redirect() {
  // Replace to cull dauth from back history
  window.location.replace(`${config.chosenOrk}/`);
}

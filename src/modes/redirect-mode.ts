var config: Config;

export function initRedirect(c: Config) {
  config = c;
  checkQuery();
}

function checkQuery() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  let data = Object.fromEntries(urlSearchParams.entries()).data;

  if (data == null) return redirect();

  var parsed = JSON.parse(decodeURIComponent(data));
  config.finalizeAuthentication(parsed);
}

function redirect() {
  config.returnUrl = window.location.href;
  window.location.replace(`${config.chosenOrk}?data=${encodeURIComponent(JSON.stringify(config))}`);
}

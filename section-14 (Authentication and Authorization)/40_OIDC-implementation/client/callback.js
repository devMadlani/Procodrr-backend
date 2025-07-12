const code = new URLSearchParams(location.search).get("code");
console.log(code);
if (code) {
  window.opener.postMessage({ code }, "*");
  window.close();
}

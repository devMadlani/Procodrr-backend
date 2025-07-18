const sid = new URLSearchParams(location.search).get("sid");
const baseURL = "http://localhost:4000";
if (sid) {
  const res = await fetch(`${baseURL}/session-cookie?sid=${sid}`, {
    credentials: "include",
  });
  if (res.status === 200) {
    window.opener.postMessage({ message: "success" }, "*");
    window.close();
  }
} else {
  window.opener.postMessage({ message: "failure" }, "*");
  window.close();
}

const res = await fetch("http://192.168.192.182:4000");

// console.log(res);

// const data = await res.text();
// console.log(data);

// res.headers.forEach((value, key) => {
//   console.log(key, value);
// });

const decoder = new TextDecoder();
for await (const chunk of res.body) {
  document.write(decoder.decode(chunk));
}



console.log("c startrd");

for (let i = 0; i < 1000000000; i++) {
  if (i % 400000000 == 0) {
    console.log(i);
  }
}

// console.timeEnd()
const myObj = {
  then(resolve) {
    setTimeout(() => {
      h1.addEventListener("click", () => {
        resolve("resolved ");
      });
    }, 2000);
  },
};

const data = await myObj;
console.log(data);

// myObj.then((data) => {
//   console.log(data);
// });

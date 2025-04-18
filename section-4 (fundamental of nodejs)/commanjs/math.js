function sum(...num) {
  return num.reduce((a, b) => a + b);
}

function product(...num) {
  return num.reduce((a, b) => a * b);
}
console.log(module);
module.exports = {
  sum,
  product,
};

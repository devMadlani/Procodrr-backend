let arr = [3, 2, 6, 4, 1, 7];
let n = arr.length;

// Bubble Sort
// for (let i = 0; i < n - 1; i++) {
//   for (let j = 0; j <= n - 1 - i; j++) {
//     if (arr[j] > arr[j + 1]) {
//       let temp = arr[j + 1];
//       arr[j + 1] = arr[j];
//       arr[j] = temp;
//     }
//   }
// }

// Insertion Sort
// for (let i = 0; i < n - 1; i++) {
//   for (let j = i + 1; j > 0; j--) {
//     if (arr[j] < arr[j - 1]) {
//       let temp = arr[j];
//       arr[j] = arr[j - 1];
//       arr[j - 1] = temp;
//     }
//   }
// }

// Selection Sort
// for (let i = 0; i < n - 1; i++) {
//   let min = i;
//   for (let j = i + 1; j < n - 1; j++) {
//     if (arr[min] > arr[j]) {
//       let temp = arr[min];
//       arr[min] = arr[j];
//       arr[j] = temp;
//     }
//   }
// }

console.log(arr);

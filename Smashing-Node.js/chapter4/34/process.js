console.log(1);

process.nextTick(() => {
  console.log(3);
});

// console.log(2);

// 可以类比于setTimeout的使用情景

// console.log(1);

// setTimeout(() => {
//   console.log(3);
// });

// console.log(2);
let fibonacci = [];
// 斐波纳切数列数列前两个数定为1
fibonacci[1] = 1;
fibonacci[2] = 1;
// 斐波纳切数列，每一项等于前两项之和
for(let i=3; i<20; i++) {
  fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
}
// 求和
let sum = fibonacci.reduce((x, y) => {
  return x+y;
});

console.log(sum);
for(let i=1; i<fibonacci.length; i++) {
  console.log(fibonacci[i]);
}
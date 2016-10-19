// 只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值
function* fibs() {
  var a = 0;
  var b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
// fibs是一个Generator函数，原生具有Iterator接口。结构赋值会依次从这个接口获取值

var [first, second, third, fourth, fifth, sixth] = fibs();

console.log(fifth);
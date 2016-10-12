var tmp = 123;

if (true) {
  tmp = 'abc';
  let tmp;
}
// 上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明前，对tmp赋值会报错
// 暂时性死区temporal dead zone
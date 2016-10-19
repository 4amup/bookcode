// 对象解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量
var obj = {
  p: [
    'hello',
    {y: 'world'}
  ]
};

var {p: [x, {y}]} = obj;
// 这里的p是模式，而不是变量，因此不会被赋值

console.log(x, y);
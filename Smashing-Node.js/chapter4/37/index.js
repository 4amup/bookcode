// 直接以exports输出模块内容
// let a = require('./module_a');
// console.log(a.name);
// console.log(a.data);
// console.log(a.getPrivate());

// 直接将module.exports重写，输出对象
let Person = require('./person');
let john = new Person('john');
john.talk();
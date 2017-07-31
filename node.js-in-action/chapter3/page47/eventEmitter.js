// 所有能触发事件的对象都是 EventEmitter 类的实例
const EventEmitter = require('events').EventEmitter

let channel = new EventEmitter();

// 监听自定义事件，后跟一个异步函数
channel.on('join', () => {
  console.log('Welcome!')
})

// 必须发射相应的事件才行
channel.emit('join')
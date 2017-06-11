// 以下例子展示了一个只有单个监听器的 EventEmitter 实例。
// eventEmitter.on() 方法用于注册监听器，eventEmitter.emit() 方法用于触发事件。
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('发生了一个事件！');
});
myEmitter.emit('event');
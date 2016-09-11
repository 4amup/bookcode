// process test
// process.nextTick()将会在下一轮事件循环中调用
process.nextTick(function(){
  console.log('nextTick callback!');
});
console.log('nextTick was set!');
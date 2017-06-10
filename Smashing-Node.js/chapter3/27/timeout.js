var start = Date.now();

setTimeout(function() {
  console.log(Date.now() - start);
  for(let i=0; i<1000000000; i++) {}; // 用一个循环占时间
}, 1000);

setTimeout(function() {
  console.log(Date.now() - start);
}, 2000);
// Tips：
// 第一个setTimeout执行时for循环阻塞了事件轮询，所以setTimeout并非那么准时
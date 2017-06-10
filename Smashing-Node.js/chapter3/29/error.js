function c () {
  b();
};
function b () {
  a();
};
function a () {
  setTimeout(() => {
    throw new Error('here');
  }, 10);
};

c();

// 在node.js中要捕获一个未来才会执行到的函数所抛出的错误时不可能的。

// 以下代码永远不会执行
// try {
//   setTimeout(() => {
//     throw new Error('here');
//   }, 10);
// } catch (error) {};

// 这就是为什么在node.js中，每一步都需要正确进行错误处理的原因了。一旦遗漏，你就会发现发生发生了错误后很难追踪，因为上下文信息丢失了。
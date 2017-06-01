function addLoadEvent(f) {
  // 先将window.onload引用的函数保存到这个局部变量
  let oldonload = window.onload;
  if(typeof window.onload != 'function') {
    window.onload = f;
  } else {
    window.onload = function () {
      oldonload();
      f();
    }
  }
}
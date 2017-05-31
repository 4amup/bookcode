function addLoadEvent (f) {
    let oldonload = window.onload; //保存一个window.onload的引用
    if(typeof window.onload != 'function') {
        // 如果window.onload还没有绑定事件处理函数
        // 就给它绑定一个
        window.onload = f;
    } else {
        window.onload = function () {
            oldonload();
            f();
        }
    }
}
// 递归的思想，把待执行的函数变成一个队列存放
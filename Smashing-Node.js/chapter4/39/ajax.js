// 在现代浏览器中，发起一个Ajax请求，并通过stateChange事件监听数据何时到达
const ajax = new XMLHttpRequest;

ajax.addEventListener('stateChange', () => {
  if(ajax.readyState == 4 && ajax.responseText) {
    alert('we got some data: ' + ajax.responseText);
  }
});

ajax.open('GET', '/my-page');
ajax.send(null);
window.onload = () => {
  let ws = new WebSocket('ws://localhost:3000/test');

  // 一连接就开始监听鼠标移动事件，并将位置信息发送给服务端
  ws.onopen = () => {
    console.log('ws is open!');
    document.onmousemove = (event) => {
      ws.send(JSON.stringify({ x: event.clientX, y: event.clientY}));
    }
  }

  // 初始化客户端的状态
  let initialized;

  ws.onmessage = (msgev) => {
    let obj = JSON.parse(msgev.data);

    if(!initialized) {
      initialized = true;
      for(let id in obj) {
        move(id, obj[id]);
      }
    } else {
      // 其他信息不是改变位置信息就是断开连接消息
      if('disconnect' === obj.type) {
        remove(obj.id);
      } else {
        move(obj.id, obj.pos);
      }
    }
  }

  // 声明函数move和remove函数
  function move (id, pos) {
    let cursor = document.getElementById('cursor-' + id);

    if(!cursor) {
      cursor = document.createElement('img');
      cursor.id = 'cursor-' + id;
      cursor.src = '/cursor.png';
      cursor.style.position = 'absolute';
      document.body.appendChild(cursor);
    }

    cursor.style.left = pos.x + 'px';
    cursor.style.top = pos.y + 'px';
  }

  function remove (id) {
    let cursor = document.getElementById('cursor-' + id);
    cursor.parentNode.removeChild(cursor);
  }

  ws.onclose = () => {
    console.log('ws is closed!')
  }
}
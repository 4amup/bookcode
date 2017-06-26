window.onload = () => {
  // 创建一个实例
  let socket = io();

  // 监听连接事件
  socket.on('connect', () => {
    // 通过join事件发送昵称
    socket.emit('join', prompt('What is your name?'));

    // 显示聊天窗口
    document.getElementById('chat').style.display = 'block';

    // 监听广播服务端广播的连接信息
    socket.on('annoucement', (msg) => {
      let li = document.createElement('li');
      li.className = 'annoucement';
      li.innerHTML = msg;
      document.getElementById('messages').appendChild(li);
    });
  });
  
  // 功能函数-立即将本客户端发送的消息返回，不通过服务器
  function addMessage (from, text) {
    let li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `<b>${from}</b>: ${text}`;
    document.getElementById('messages').appendChild(li);
  }
  // 广播聊天消息
  let input = document.getElementById('input');
  document.getElementById('form').onsubmit = () => {
    // 立即显示消息，不通过服务器
    addMessage('me', input.value);
    // 然后再向服务端发送消息
    socket.emit('text', input.value);

    // 重置输入框
    input.value = '';
    input.focus();

    return false;
  }
  // 监听服务器发送过来的text事件
  socket.on('text', addMessage);
}
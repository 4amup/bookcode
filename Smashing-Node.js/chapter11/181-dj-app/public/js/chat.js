window.onload = function ()  {
  const socket = io();
  socket.on('connect', function ()  {
    // 通过join事件发送昵称
    socket.emit('join', prompt('What is your nickname?'));
    // 显示聊天窗口
    document.getElementById('chat').style.display = 'block';

    socket.on('announcement', function (msg)  {
      let li = document.createElement('li');
      li.className = 'announcement';
      li.innerHTML = msg;
      document.getElementById('messages').appendChild(li);
    });
  });
  // 发送消息函数
  function addMessage (from, text) {
    let li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `<b>${from}</b>： ${text}`;
    document.getElementById('messages').appendChild(li);
    return li;
  }

  let input = document.getElementById('input');
  document.getElementById('form').onsubmit = function ()  {
    let li = addMessage('me', input.value);
    socket.emit('text', input.value, function (data)  {
      li.className = 'confirmed';
      li.title = data;
    });
    // 重置输入框
    input.value = '';
    input.focus();
    return;
  }
  // text事件的监听
  socket.on('text', addMessage);
  // 播放选定的歌曲
  let playing = document.getElementById('playing');
  function play (song) {
    if(!song) return;
    playing.innerHTML = `<hr><b>Now display the album image</b><br>歌曲名：${song.name}，演唱者：${song.artists[0].name} <br>`;
    let img = document.createElement('img');
    img.style.width = '200px'
    img.src = song.album.picUrl;
    playing.appendChild(img);
  };

  socket.on('song', play);

  // 查询表单
  let form = document.getElementById('dj');
  let results = document.getElementById('results');
  // 显示form元素
  form.style.display = 'block';
  form.onsubmit = function ()  {
    // 二次查询时，将results重置
    results.innerHTML = '';
    
    socket.emit('search', document.getElementById('s').value, function (obj) {
      console.log('收到api返回的对象');
      let songs = obj.result.songs;
      songs.forEach(function (song)  {
        let li = document.createElement('li');
        li.innerHTML = `歌曲名：${song.name}，演唱者：${song.artists[0].name}`;
        let a = document.createElement('a');
        a.href = '#';
        a.innerHTML = 'Select';
        a.onclick = function ()  {
          socket.emit('song', song);
          return false;
        }
        li.appendChild(a);
        results.appendChild(li);
      });
    });
    return false;
  }

  // 收到elect事件后将from元素class设为isDJ
  socket.on('elected', function ()  {
    form.className = 'isDJ';
  });
}
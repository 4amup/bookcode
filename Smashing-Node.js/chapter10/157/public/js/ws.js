let lastMessage;

window.onload = () => {
  // create socket
  let ws = new WebSocket('ws://localhost:3000');
  ws.onopen = () => {
    // send first ping
    ping();
  }
  ws.onmessage = (ev) => {
    console.log('got: ' + ev.data);
    document.getElementById('latency').innerHTML = new Date() - lastMessage;
    // ping again
    ping();
  }
  function ping () {
    // record the timestamp
    lastMessage = new Date();
    // send the message
    ws.send('ping');
  }
}
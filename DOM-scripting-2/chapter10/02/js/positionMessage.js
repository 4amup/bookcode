function positionMessage () {
  if(!document.getElementById('message')) return;
  let elem = document.getElementById('message');
  elem.style.position = 'absolute';
  elem.style.left = '50px';
  elem.style.top = '100px';
}

addLoadEvent(positionMessage);
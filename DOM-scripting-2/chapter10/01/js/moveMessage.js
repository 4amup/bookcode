function moveMessage() {
  let elem = document.getElementById('message');
  if (!elem) return;
  elem.style.left = '200px';
  console.log('I changed my position');
}

function addLoadEvent (f) {
  let oldonload = window.onload;
  if(typeof window.onload != 'function') {
    window.onload = f;
  } else {
    window.onload = function () {
      oldonload()
      f()
    }
  }
}
function moveElement(elementID, final_x, final_y, interval) {
  let elem = document.getElementById(elementID);
  if (!elem) return;
  let xpos = parseInt(elem.style.left);
  let ypos = parseInt(elem.style.top);
  if(xpos === final_x && ypos === final_y) {
    return true;
  }
  if(xpos < final_x) {
    xpos++;
  }
  if(xpos > final_x) {
    xpos--;
  }
  if(ypos < final_y) {
    ypos++;
  }
  if(ypos > final_y) {
    ypos--;
  }
  elem.style.left = xpos + 'px';
  elem.style.top = ypos + 'px';
  let repeat = `moveElement('${elementID}', ${final_x}, ${final_y}, ${interval})`;
  movement = setTimeout(repeat, interval);
}
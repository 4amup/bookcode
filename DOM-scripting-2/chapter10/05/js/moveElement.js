function moveElement(elementID, final_x, final_y, interval) {
  let elem = document.getElementById(elementID);
  if (!elem) return;
  // 每次运行前将setTimeout清除掉
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  let xpos = parseInt(elem.style.left);
  let ypos = parseInt(elem.style.top);
  if(xpos === final_x && ypos === final_y) {
    return true;
  }
  // 逻辑：离得较远的元素，能较快的移动过去，每次不再是固定1像素，而是依据距离而定
  let dist_x = Math.ceil(Math.abs(xpos-final_x)/10);
  let dist_y = Math.ceil(Math.abs(ypos-final_y)/10);
  if(xpos < final_x) {
    xpos+=dist_x;
  }
  if(xpos > final_x) {
    xpos-=dist_x;
  }
  if(ypos < final_y) {
    ypos+=dist_y;
  }
  if(ypos > final_y) {
    ypos-=dist_y;
  }
  elem.style.left = xpos + 'px';
  elem.style.top = ypos + 'px';
  let repeat = `moveElement('${elementID}', ${final_x}, ${final_y}, ${interval})`;
  // movement是个全局变量，这不是个好的解决方案
  elem.movement = setTimeout(repeat, interval);
}
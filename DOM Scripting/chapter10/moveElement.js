function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {return true};
  if (xpos < final_x) {xpos++};
  if (xpos > final_x) {xpos--};
  if (ypos < final_y) {ypos++};
  if (ypos > final_y) {ypos--};
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
//setTimeout()函数的第一个参数必须是字符串变量，需要带引号的，所以这里需要字符串拼接的操作，不太懂这一段
  // var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  movement = setTimeout("moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")",interval);
}
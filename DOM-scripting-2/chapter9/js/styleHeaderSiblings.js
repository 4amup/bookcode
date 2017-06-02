function styleHeaderSiblings () {
  let headers = document.getElementsByTagName('h1');
  for (let i=0; i<headers.length; i++) {
    let elem = getNextElement(headers[i].nextSibling);
    elem.style.fontWeight = "bold";
    elem.style.fontSize = "1.2em";
  }
}

// 此函数主要用于获取下一个*元素*节点，获取不到就会一直向下寻找
function getNextElement(node) {
  if(node.nodeType === 1) {
    return node;
  }
  if(node.nextSibling) {
    // 递归调用自身
    return getNextElement(node.nextSibling);
  }
  return null;
}
window.onload = styleHeaderSiblings;
function styleElementSiblings(tag,theclass) {
  //check getElementsByTagName
  if (!document.getElementsByTagName) {return false};
  //把所有h1元素保存到headers数组中
  var elems = document.getElementsByTagName(tag);
  var elem;
  //遍历elems，并摘出所有的元素节点来
  for (var i = 0; i < elems.length; i++) {
    elem = getNextElement(elems[i].nextSibling);
    addClass(elem,theclass);
  }
}

//nodeType值为1的是元素节点，2是属性节点，3是文本节点，这是三个常用的
//本函数主要功能就是返回元素节点
function getNextElement(node) {
  if (node.nodeType == 1) {
    return node;
  }
  if (node.nextSibling) {
    return getNextElement(node.nextSibling)
  }
  return null;
}

function addClass(element,value) {
  if (!element.className) {
    element.className = value
  }else{
    newClassName = element.className;
    newClassName+=" ";
    newClassName+=value;
    element.className = newClassName;
  }
}
addLoadEvent(function(){styleElementSiblings("h1","intro")});
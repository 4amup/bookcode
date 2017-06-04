// 顺序加载函数，可复用
function addLoadEvent (f) {
  let oldonload = window.onlaod;
  if(typeof window.onload != 'function') {
    window.onload = f;
  } else {
    window.onload = () => {
      oldonload();
      f();
    }
  }
}

// DOM插入函数
function insertAfter (newElement, targetElement) {
  let parent = targetElement.parentNode;
  if(parent.lastChild === targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

// 添加类的函数
function addClass (element, value) {
  if(!element.className) {
    element.className = value;
  } else {
    let newClassName = element.className;
    newClassName += " ";
    newClassName += value;
    element.className = newClassName;
  }
}

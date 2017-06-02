function stripeTable () {
  let tables = document.getElementsByTagName('table');

  for(let i=0; i<tables.length; i++) {
    let odd = false; // 初始化奇数行为false
    let rows = tables[i].getElementsByTagName('tr');
    for(let i=0; i<rows.length; i++) {
      if(odd) { // 如果是奇数行就加上背景色
        addClass(rows[i], "odd");
        odd = false; // 并把odd再次置为false
      } else {
        odd = true; // 如果odd是false，直接设置为true，参与下次循环
      }
    }
  }
}

function addClass(element, value) {
  if(!element.className) {
    element.className = value;
  } else {
    let newClassName = element.className;
    newClassName += " ";
    newClassName += value;
    element.className = newClassName;
  }
}

addLoadEvent(stripeTable);
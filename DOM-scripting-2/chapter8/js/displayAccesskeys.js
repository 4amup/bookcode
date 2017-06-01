function displayAccesskeys () {
  // 取得所用链接
  let links = document.getElementsByTagName("a");
  // 数组保存访问键
  let akeys = [];
  // 遍历链接
  for (let i=0; i<links.length; i++) {
    let current_link = links[i];
    // 如果没有这个accesskey属性，则跳出循环
    if(!current_link.getAttribute('accesskey')) continue;
    // 有的话，就取得accesskey的值
    let key = current_link.getAttribute('accesskey');
    // 取得链接文本
    let text = current_link.lastChild.nodeValue;
    // 添加到数组
    akeys[key] = text;
  }

  // 创建列表
  let list = document.createElement("ul");
  // 遍历访问键
  for (key in akeys) {
    let text = akeys[key];
    // 创建放到li中的字符串
    let str = `${key}:${text}`;
    // 创建列表项
    let item = document.createElement('li');
    let item_text = document.createTextNode(str);
    item.appendChild(item_text);
    // 把列表项添加到ul中
    list.appendChild(item);
  }

  // 创建标题
  let header = document.createElement("h3");
  var header_text = document.createTextNode("Accesskeys");
  header.appendChild(header_text);
  // 将标题添加到主页
  document.body.appendChild(header);
  // 把列表添加到页面中
  document.body.appendChild(list);
}

addLoadEvent(displayAccesskeys);
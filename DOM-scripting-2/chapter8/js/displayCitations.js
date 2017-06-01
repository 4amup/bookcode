function displayCitations () {
  // 获取blockquote元素nodelist
  let quotes = document.getElementsByTagName("blockquote");
  
  // 遍历这个nodelist
  for(let i=0; i<quotes.length; i++) {
    if(!quotes[i].getAttribute("cite")) continue;
    let url = quotes[i].getAttribute("cite"); // 主要变量
    let quoteChildren = quotes[i].getElementsByTagName("*");
    // 检验是否含有子元素
    if(quoteChildren.length < 1) continue;
    let elem = quoteChildren[quoteChildren.length-1]; // 主要变量
    // 开始创建链接
    let link = document.createElement("a");
    let link_text = document.createTextNode("source");
    link.appendChild(link_text);
    link.setAttribute("href", url);
    // 插入DOM
    let superscript = document.createElement("sup");
    superscript.appendChild(link);
    elem.appendChild(superscript);
  }
}
addLoadEvent(displayCitations);
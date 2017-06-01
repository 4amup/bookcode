function displayAbbreviations () {
  let abbreviations = document.getElementsByTagName("abbr");
  if(abbreviations.length < 1) return;
  var defs = [];

  // 循环遍历DOM中的abbr元素，并将title和value存储到defs数组
  for(let i=0; i<abbreviations.length; i++) {
    let current_abbr = abbreviations[i];
    let definition = abbreviations[i].getAttribute("title");
    let key = abbreviations[i].lastChild.nodeValue;
    defs[key] = definition;
  }
  // 开始生成dl
  let dlist = document.createElement("dl");
  // for-in只能用于数组，不能用于NodeList
  // 生成了相应的节点
  for (key in defs) {
    let definition = defs[key];

    let dtitle = document.createElement("dt");
    let dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);

    let ddesc = document.createElement("dd");
    let ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }

  // 创建一个标题
  let header = document.createElement("h2");
  let header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);

  // 开始插入DOM，使用的是HTML—DOM
  document.body.appendChild(header);
  document.body.appendChild(dlist);
}

addLoadEvent(displayAbbreviations);
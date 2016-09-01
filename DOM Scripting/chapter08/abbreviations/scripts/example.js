function displayAbbreviations() {
	if (!document.getElementsByTagName || !document.createTextNode || !document.createElement) {return false};
	//提取内容，并添加到数组defs，也就是“瓤”。
	var abbreviations = document.getElementsByTagName("abbr");
	if (abbreviations.length<1) {return false};
	var defs = new Array();
	//遍历缩略词
	for (var i = 0; i < abbreviations.length; i++) {
		var current_abbr = abbreviations[i];
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}
	//创建标记，也就是“容器”,并把上面创建的“瓤”加到容器中来。
	var dlist = document.createElement("dl");
	for(key in defs){
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	//将带瓤的容器放到文档（html）中
	var header = document.createElement("h2");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(dlist);
}
addLoadEvent(displayAbbreviations);
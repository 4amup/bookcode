function displayCitations() {
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) {return false};
	//取得所有的引用（blockquote）
	var quotes = document.getElementsByTagName("blockquote");
	//遍历引用
	for (var i = 0; i < quotes.length; i++) {
	//如果没有cite属性，跳出并继续下一次循环
		if (!quotes[i].getAttribute("cite")) {continue};
	//有cite属性的话，保存cite属性		
		var url = quotes[i].getAttribute("cite");
	//取得所有引用中的所有元素节点
		var quoteChildren = quotes[i].getElementsByTagName("*");
	//如果没元素节点，跳出并继续下一次循环
		if (quoteChildren.length<1) {continue};
	//取得引用中的最后一个元素节点
		var elem = quoteChildren[quoteChildren.length-1];
	//创建标记，并组合成一个DocumentFragment对象
		var link = document.createElement("a");
		var link_text = document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href",url);

		var superscript = document.createElement("sup");
		superscript.appendChild(link);
	//将标记添加到引用中的最后一个元素节点
		elem.appendChild(superscript);
	}
}
	//将本执行函数排入需要onload事件发生后执行的队列中
addLoadEvent(displayCitations);
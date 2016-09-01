function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}else{
		parent.appendChild(newElement,targetElement.nextSibling);
	}
}
function addClass(element,value){
	if (!element.className) {
		element.className = value;
	}else{
		newClassName = element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className = newClassName;
	}
}
// 以上是常用的几个功能性函数，是通用的
function highLightPage() {
	// 以上是检查正确性的代码，并取得nav元素数组（虽然只有一个）
	if (!document.getElementsByTagName) {return false};
	if (!document.getElementById) {return false};
	var headers = document.getElementsByTagName("header");
	if (headers.length == 0) {return false};
	var navs = headers[0].getElementsByTagName("nav");
	if (navs.length == 0) {return false};
	// 取得链接数组，
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	// 循环对比找到是本页面的地址，添加here类
	for (var i = 0; i < links.length; i++) {
		linkurl = links[i].getAttribute("href");
		if (window.location.href.indexOf(linkurl) != -1) {
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}
function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {elem.style.left = "0px";}
  if (!elem.style.top) {elem.style.top = "0px";}
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
  	// ceil是向上取整，floor是向下取整，round是四舍五入取整
    dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
  	dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}
function prepareSlideshow() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("intro")) return false;
  var intro = document.getElementById("intro");
  var slideshow = document.createElement("div");
  slideshow.setAttribute("id","slideshow");

  var frame = document.createElement("img");
  frame.setAttribute("src","images/frame.gif");
  frame.setAttribute("alt","");
  frame.setAttribute("id","frame");
  slideshow.appendChild(frame);

  var preview = document.createElement("img");
  preview.setAttribute("src","images/slideshow.gif");
  preview.setAttribute("alt","a glimpse of what awaits you");
  preview.setAttribute("id","preview");
  slideshow.appendChild(preview);
  insertAfter(slideshow,intro);

  var links = document.getElementsByTagName("a");
  var destination;
  for (var i = 0; i < links.length; i++) {
  	links[i].onmouseover = function () {
  		destination = this.getAttribute("href");
      if (destination.indexOf("index.html") != -1) {
        moveElement("preview",0,0,5);
      }
      if (destination.indexOf("about.html") != -1) {
        moveElement("preview",-150,0,5);
      }
      if (destination.indexOf("photos.html") != -1) {
        moveElement("preview",-300,0,5);
      }
      if (destination.indexOf("live.html") != -1) {
        moveElement("preview",-450,0,5);
      }
      if (destination.indexOf("contact.html") != -1) {
        moveElement("preview",-600,0,5);
      }
  	}
  }
}
// 根据传入的id设置显示该section部分，其余隐藏
function showSection(id) {
  var section = document.getElementsByTagName("section");
  for (var i = 0; i < section.length; i++) {
    if (section[i].getAttribute("id") != id) {
      section[i].style.display = "none";
    } else {
      section[i].style.display = "block";
    }
  }
}
function prepareInternalnav() {
  if (!document.getElementsByTagName) {return false};
  if (!document.getElementById) {return false};
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) {return false};
  var navs = articles[0].getElementsByTagName("nav");
  if (navs.length == 0) {return false};
  var nav = navs[0];
  var links = nav.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    // split()方法，根据传入的分隔符参数把一个字符串分成两或多部分的一个方法,返回的是一个数组
    var sectionId = links[i].getAttribute("href").split("#")[1];
    if (!document.getElementById(sectionId)) {continue};
    // 页面加载后，需要默认隐藏所有部分
    document.getElementById(sectionId).style.display = "none";
    // destination是一个永久的属性
    links[i].destination = sectionId;
    links[i].onclick = function(){
      showSection(this.destination);
      return false;
    }
  }
}
// 直接套用第7章图片库的函数代码
function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/placeholder.gif");
  placeholder.setAttribute("alt","my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var desctext = document.createTextNode("choose an image");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  insertAfter(placeholder,gallery);
  insertAfter(description,placeholder);
}

function prepareGallery() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for ( var i=0; i < links.length; i++) {
    links[i].onclick = function() {
      return showPic(this);
  }
    links[i].onkeypress = links[i].onclick;
  }
}

function showPic(whichpic) {
  if (!document.getElementById("placeholder")) return true;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  if (!document.getElementById("description")) return false;
  if (whichpic.getAttribute("title")) {
    var text = whichpic.getAttribute("title");
  } else {
    var text = "";
  }
  var description = document.getElementById("description");
  if (description.firstChild.nodeType == 3) {
    description.firstChild.nodeValue = text;
  }
  return false;
}
//live.html
function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  for (var i=0; i<tables.length; i++) {
    var odd = false;
    var rows = tables[i].getElementsByTagName("tr");
    for (var j=0; j<rows.length; j++) {
      if (odd == true) {
        addClass(rows[j],"odd");
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}

function highlightRows() {
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length; i++) {
    rows[i].oldClassName = rows[i].className
    rows[i].onmouseover = function() {
      addClass(this,"highlight");
    }
    rows[i].onmouseout = function() {
      this.className = this.oldClassName
    }
  }
}

function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1) return false;
  var defs = new Array();
  for (var i=0; i<abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) continue;
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  var dlist = document.createElement("dl");
  for (key in defs) {
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
  if (dlist.childNodes.length < 1) return false;
  var header = document.createElement("h3");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  articles[0].appendChild(header);
  articles[0].appendChild(dlist);
}
// contact.html
// 作用就是在用户单击label标签的时候自动获得焦点
function focusLabels() {
  if (!document.getElementsByTagName) {return false};
  var labels = document.getElementsByTagName("label");
  for (var i = 0; i < labels.length; i++) {
    labels[i].onclick = function () {
      var id = this.getAttribute("for");
      if (!document.getElementById(id)) {return false};
      var element = document.getElementById(id);
      element.focus();
    }
  }
}
// 作用
// 取得placeholder的值并临时座位相应表单字段的value
// 在字段获得焦点时，删除value值
// 如果用户并没有在字段中输入文本且离开了当前字段，则重新应用placeholder
function resetFields(whichform) {
	// 省略检查了，现代哪个浏览器都支持placeholder属性的
  // if (document.form.input.placeholder) {return false};
  for (var i = 0; i < whichform.elements.length; i++) {
    var element = whichform.elements[i];
    // 如果遇到是submit标签，则跳过
    if (element.type == "submit") {continue};
    var check = element.placeholder || element.getAttribute("placeholder");
    if (!check) {continue}; // 如果没有placeholder为空，就跳过
    element.onfocus = function () {
      var text = this.placeholder || this.getAttribute("placeholder");
      if (this.value == text) {
        this.className = "";
        this.value = "";
      }
    }
    // 功能是让onblur事件在用户把焦点移出表单字段时触发
    element.onblur = function() {
      if (this.value == "") {
        this.className = "placeholder";
        this.value = this.placeholder || this.getAttribute('placeholder');
      }
    }
    element.onblur();
  }
}
// 循环遍历文档中的所有form对象，并将每个form对象传给restFields函数，预处理函数
function prepareForms() {
  for (var i = 0; i < document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function () {
    	if (!validateForm(this)) {return false};
    	var article = document.getElementsByTagName("article")[0];
    	if (submitFormWithAjax(this,article)) {return false};
      return true;
    }
  }
}
// 表单验证功能，现代浏览器基本都已经实现了原生的表单验证功能
	// 检查用户是否在表单中输入了内容
function isFilled(field) {
  if (field.value.replace(' ','').length == 0) {return false};
  var placeholder = field.placeholder || field.getAttribute('placeholder');
  return (field.value != placeholder);
}
	// 检查电子邮件输入情况
function isEmail(field) {
  return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}
	// 整体的表单验证函数,里面callback isFilled和isEmail
	// 作用
	// 循环遍历form中的elements数组，发现required就把元素传给isFilled函数
	// isFilled返回false，显示警告信息，validateForm返回false
	// isEmail同理
function validateForm(whichform) {
  for (var i = 0; i < whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.required) {
      if (!isFilled(element)) {
        alert("Please fill in the "+element.name+" field.");
        return false;
      }
    }
    if (element.type == "email") {
      if (!isEmail(element)) {
        alert("The "+element.name+" field must be a valid email address.");
        return false;
      }
    }
  }
  return true;
}
// 下面开始解决Ajax的问题
function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined") {
    XMLHttpRequest = function () {
      try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
        catch (e) {}
      try {return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
        catch (e) {}
      try {return new ActiveXObject("Msxml2.XMLHTTP");}
        catch (e) {}
      return false;
    }
  }
  return new XMLHttpRequest();
}
// 接受一个DOM元素参数，将它的所有子元素都删掉，然后将loading.gif添加到该元素
function displayAjaxLoading(element) {
  while(element.hasChildNodes()){
    element.removeChild(element.lastChild);
  }
  var content = document.createElement("img");
  content.setAttribute("src","images/test.gif");
  content.setAttribute("alt","Loading...");
  element.appendChild(content);
}
function submitFormWithAjax(whichform,thetarget) {
  // 以上是建立一个XMLHttpRequest对象，并通过displayAjaxLoading载入load.gif
  var request = getHTTPObject();
  if (!request) {return false};
  displayAjaxLoading(thetarget);
  // 创建一个URL字符串，并通过POST请求发送到服务器
  var dataParts = [];
  var element;
  for (var i = 0; i < whichform.elements.length; i++) {
    element = whichform.elements[i];
    // 添加一条检查语句
    if (!element.name || !element.value) {continue};
    dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
  }
  var data = dataParts.join('&');
  // 向原始表单的action属性指定的处理函数发送POST请求
  request.open('POST',whichform.getAttribute("action"),true);
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.onreadystatechange = function(){
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length>0) {
					thetarget.innerHTML = matches[1];
				}else{
					thetarget.innerHTML = "<p>Oop, there was an error. Sorry.<p>";
				}
			}
		}
	};
	request.send(data);
	return true; 
}
addLoadEvent(focusLabels);
addLoadEvent(prepareSlideshow);
addLoadEvent(highLightPage);
addLoadEvent(prepareInternalnav);
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(prepareForms);

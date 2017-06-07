// 顺序加载函数，可复用
function addLoadEvent (f) {
  let oldonload = window.onload;
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

// 动画函数moveElement
function moveElement(elementID, final_x, final_y, interval) {
  let elem = document.getElementById(elementID);
  if (!elem) return;
  // 每次运行前将setTimeout清除掉
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  // 对left和top的安全检查
  if(!elem.style.left) {elem.style.left = '0px'};
  if(!elem.style.top) {elem.style.top = '0px'};
  // 正常对元素的left和top属性取值
  let xpos = parseInt(elem.style.left);
  let ypos = parseInt(elem.style.top);
  if(xpos === final_x && ypos === final_y) {
    return true;
  }
  // 逻辑：离得较远的元素，能较快的移动过去，每次不再是固定1像素，而是依据距离而定
  let dist_x = Math.ceil(Math.abs(xpos-final_x)/10);
  let dist_y = Math.ceil(Math.abs(ypos-final_y)/10);
  if(xpos < final_x) {
    xpos+=dist_x;
  }
  if(xpos > final_x) {
    xpos-=dist_x;
  }
  if(ypos < final_y) {
    ypos+=dist_y;
  }
  if(ypos > final_y) {
    ypos-=dist_y;
  }
  elem.style.left = xpos + 'px';
  elem.style.top = ypos + 'px';
  let repeat = `moveElement('${elementID}', ${final_x}, ${final_y}, ${interval})`;
  // movement是个全局变量，这不是个好的解决方案
  elem.movement = setTimeout(repeat, interval);
}

// 为了实现幻灯片元素，鼠标放在链接上，自动显示缩略图
function prepareSlideshow() {
  // 在文档中插入展示的节点
  let intro = document.getElementById('intro')
  if(!intro) return;
  let slideshow = document.createElement('div');
  slideshow.setAttribute('id', 'slideshow');
  let preview = document.createElement('img');
  preview.setAttribute('src', 'images/slideshow.gif');
  preview.setAttribute('alt', 'a glimpse of what awaits you');
  preview.setAttribute('id', 'preview');
  slideshow.appendChild(preview);
  insertAfter(slideshow, intro);

  // 再插入一个窗口的半透明的图
  let frame = document.createElement('img');
  frame.setAttribute('src', 'images/frame.gif');
  frame.setAttribute('alt', 'a frame');
  frame.setAttribute('id', 'frame');
  slideshow.appendChild(frame);

  // 根据链接显示动画效果
  let links = document.getElementsByTagName('a');
  let destination;
  for(let i=0; i<links.length; i++) {
    links[i].onmouseover = function () {
      let destination = this.getAttribute("href");
      if(destination.indexOf('index.html') != -1) {
        moveElement('preview', 0, 0, 5);
      }
      if(destination.indexOf('about.html') != -1) {
        moveElement('preview', -150, 0, 5);
      }
      if(destination.indexOf('photo.html') != -1) {
        moveElement('preview', -300, 0, 5);
      }
      if(destination.indexOf('live.html') != -1) {
        moveElement('preview', -450, 0, 5);
      }
      if(destination.indexOf('contact.html') != -1) {
        moveElement('preview', -600, 0, 5);
      }
    }
  }
}

// 隐藏section
function showSection(id) {
  let sections = document.getElementsByTagName('section');
  for (let i=0; i<sections.length; i++) {
    if(sections[i].getAttribute('id') != id) {
      sections[i].style.display = 'none';
    } else {
      sections[i].style.display = 'block';
    }
  }
}

// 为article中的链接绑定事件
function prepareInternalnav () {
  let articles = document.getElementsByTagName('article');
  if(articles.length === 0) return;
  let navs = articles[0].getElementsByTagName('nav');
  if(navs.length === 0) return;
  let nav = navs[0];
  let links = nav.getElementsByTagName('a');
  for(let i=0; i<links.length; i++) {
    // 将#后面的字符串提取出来并赋值
    let sectionId = links[i].getAttribute('href').split('#')[1];
    if(!document.getElementById(sectionId)) continue;
    // 隐藏所有section
    document.getElementById(sectionId).style.display = 'none';
    // 这里之所以采用属性的方式赋值，是因为作用域的限制
    links[i].destination = sectionId;
    // 绑定点击事件
    links[i].onclick = function () {
      showSection(this.destination);
      return false;
    }
  }
}

// 显示图片函数，以前做过
function showPic(whichpic) {
  let placeholder = document.getElementById('placeholder');
  let description = document.getElementById('description');
  if(!placeholder) return;
  let source = whichpic.getAttribute('href');
  placeholder.setAttribute('src', source);

  if(description) {
    let text = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : '';
    description.firstChild.nodeValue =text;
  }
  return true;
}
// 用于插入默认的图片元素
function preparePlaceholder() {
  let gallery = document.getElementById('imagegallery');
  if(!gallery) return;
  // 插入图片
  let placeholder = document.createElement('img');
  placeholder.setAttribute('id', 'placeholder');
  placeholder.setAttribute('src', 'images/placeholder.gif');
  placeholder.setAttribute('alt', 'my image gallery');
  // 插入描述文字
  let description = document.createElement('p');
  description.setAttribute('id', 'description');
  let desctext = document.createTextNode('Choose an image');
  description.appendChild(desctext);
  insertAfter(description, gallery);
  insertAfter(placeholder, description);
}
// photo.html事件绑定
function prepareGallery () {
  let gallery = document.getElementById('imagegallery');
  if(!gallery) return;
  let links = gallery.getElementsByTagName('a');
  for(let i=0; i<links.length; i++) {
    links[i].onclick = function() {
      return !showPic(this);
    }
  }
}
// live.html
function stripeTables() {
  let tables = document.getElementsByTagName('table');
  for(let i=0; i<tables.length; i++) {
    let odd = false;
    let rows = tables[i].getElementsByTagName('tr');
    for(let i=0; i<rows.length; i++) {
      if(odd) {
        addClass(rows[i], 'odd');
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}
// 改变背景颜色
function highlightRows() {
  let rows = document.getElementsByTagName('tr');
  for(let i=0; i<rows.length; i++) {
    rows[i].oldClassName = rows[i].className;
    rows[i].onmouseover = function() {
      addClass(this, 'highlight');
    }
    // 鼠标移除后，恢复原先的class
    rows[i].onmouseout = function() {
      this.className = this.oldClassName;
    }
  }
}

// 显示缩写词
function displayAbbreviations() {
  let abbreviations = document.getElementsByTagName('abbr');
  if(abbreviations.length<1) return;
  var defs = [];
  for(let i=0; i<abbreviations.length; i++) {
    let current_abbr = abbreviations[i];
    if(current_abbr.childNodes.length < 1) continue;
    let definition = current_abbr.getAttribute('title');
    let key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  let dlist = document.createElement('dl');
  for(key in defs) {
    let definition = defs[key];
    let dtitle = document.createElement('dt');
    let dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    let ddesc = document.createElement('dd');
    let ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if(dlist.childNodes.length<1) return;
  let header = document.createElement('h3');
  let header_text = document.createTextNode('Abbreviations');
  header.appendChild(header_text);
  let articles = document.getElementsByTagName('article');
  if(articles.length === 0) return;
  let container = articles[0];
  container.appendChild(header);
  container.appendChild(dlist);
}

// contact.html 点击label元素为对应的input获得焦点
function focusLabels() {
  let labels = document.getElementsByTagName('label');
  for(let i=0; i<labels.length; i++) {
    if(!labels[i].getAttribute('for')) continue;
    labels[i].onclick = function() {
      let id = this.getAttribute('for');
      if(!document.getElementById(id)) return;
      let element = document.getElementById(id);
      element.focus();
    }
  }
}
// 取得placeholder，将其作为临时值赋值给value
function resetFields(form) {
  for(let i=0; i<form.length; i++) {
    let element = form.elements[i];
    if(element.type === 'submit') continue;
    let check = element.placeholder || element.getAttribute('placeholder');
    if(!check) continue;
    element.onfocus = function() {
      let text = this.placeholder || this.getAttribute('placeholder');
      if(this.value === text) {
        this.className = '';
        this.value = "";
      }
    }
    element.onblur = function() {
      if(this.value === "") {
        this.className = 'placeholder';
        this.value = this.placeholder || this.getAttribute('placeholder');
      }
    }
    element.onblur();
  }
}
// 表单验证函数
function isFilled(field) {
  if(field.value.replace(' ', '').length === 0) return;
  let placeholder = field.placeholder || field.getAttribute('placeholder');
  return (field.value != placeholder);
}
function isEmail(field) {
  return (field.value.indexOf("@") != -1 && field.value.indexOf('.') != -1); 
}
function validateForm(form) {
  for(let i=0; i<form.elements.length; i++) {
    let element = form.elements[i];
    if(element.required) {
      if(!isfilled(element)) {
        alert(`Please fill in the ${element.name}field.`);
        return;
      }
    }
    if(element.type = 'email') {
      if(!isEmail(element)) {
        if(!isEmail(element)) {
          alert(`The ${element.name}field must be a valid email address.`);
          return;
        }
      }
    }
  }
  return true;
}

// Ajax
function displayAjaxLoading(element) {
  while(element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
  let content = document.createElement('img');
  content.setAttribute('src', 'images/loading.gif');
  content.setAttribute('alt', 'Loading...');
  element.appendchild(content);
}
function submitFormWithAjax(whichform, thetarget) {
  // 创建xml对象
  let request = new XMLHttpRequest();
  // 在某对象中显示过度图像
  displayAjaxLoading(thetarget);
  let dataParts = [];
  for(let i=0; i<whichform.elements.length; i++) {
    let element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }
  // 将数据连接在一起
  let data = dataParts.join('&');
  request.open('POST', whichform.getAttribute('action'), true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.onreadystatechange = function() {
    if(request.readyState === 4) {
      if(request.status === 200 || request.status ===0) {
        let matches = request.responseText.match('/<article>([\s\S]+)</article>/');
        if(matches.length>0) {
          thetarget.innerHTML = matches[1];
        } else {
          thetarget.innerHTML = '<p>Oop, there was an error. Sorry.</p>'
        }
      } else {
        thetarget.innerHTML = '<p>'+request.statusText+'</p>';
      }
    }
  }
  request.send(data);
  return true;
};
// 提交表单的函数
function prepareForms() {
  for(let i=0; i<document.forms.length; i++) {
    let thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function() {
      if(!validataForm(this)) return;
      let article = document.getElementsByTagName('article')[0];
      if(submitFormWithAjax(this, article)) return;
      return true;
    }
  }
}

addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
// photo.html
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
// live.html
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
// contact.html
addLoadEvent(focusLabels);
    // 表单验证
addLoadEvent(prepareForms);
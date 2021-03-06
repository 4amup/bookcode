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
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
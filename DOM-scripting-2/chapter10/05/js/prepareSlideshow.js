function prepareSlideshow() {
  // 取得DOM中的相关元素
  let slideshow = document.createElement('div');
  slideshow.setAttribute('id', 'slideshow');
  let preview = document.createElement('img');
  preview.setAttribute('src', 'images/topics.gif');
  preview.setAttribute('alt', 'building blocks of web design');
  preview.setAttribute('id', 'preview');
  slideshow.appendChild(preview);
  let list = document.getElementById('linklist');
  insertAfter(slideshow, list);
  // 取得所有链接
  let links = list.getElementsByTagName('a');
  // 为mouseover事件添加动画效果
  links[0].onmouseover = function () {
    moveElement('preview', -100, 0, 10);
  };
  links[1].onmouseover = function () {
    moveElement('preview', -200, 0, 10);
  };
  links[2].onmouseover = function () {
    moveElement('preview', -300, 0, 10);
  }
}
addLoadEvent(prepareSlideshow);
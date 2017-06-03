function prepareSlideshow() {
  // 取得DOM中的相关元素
  let preview = document.getElementById('preview');
  let list = document.getElementById('linklist');
  // 检查
  if(!preview || !list) return;
  // init，设置基础样式
  preview.style.position = 'absolute';
  preview.style.left = '0px';
  preview.style.top = '0px';
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
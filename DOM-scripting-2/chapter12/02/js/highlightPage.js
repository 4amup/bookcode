function highlightPage() {
  let headers = document.getElementsByTagName('header');
  if(headers.length === 0) return;
  let navs = headers[0].getElementsByTagName('nav');
  if(navs.length === 0) return;

  let links = navs[0].getElementsByTagName('a');
  for(let i=0; i<links.length; i++) {
    let linkurl = links[i].getAttribute('href');
    // 检查当前地址的url是否包含遍历中的某个链接，是则添加类后结束循环
    if(window.location.href.indexOf(linkurl) != -1) {
      links[i].className = 'here';
      break;
    }
  }
}

addLoadEvent(highlightPage);
function prepareGallery () {
    // 存放变量
    let gallery = document.getElementById("imagegallery");
    let links = gallery.getElementsByTagName("a");
    // 检查内容
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!gallery) return false;
    // 功能部分
    for(let i=0; i<links.length; i++) {
        links[i].onclick = function () {
            showPic(this);
            return false;
        }
    }
}

function showPic (whichpic) {
    let source = whichpic.getAttribute('href'),
        placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src', source);
}

// 以下函数是可以复用的，以后添加到自己的代码库里
function addLoadEvent (f) {
    var oldonload = window.onload; // 把现有的window.onload事件处理函数的值存入变量
    if(typeof window.onload != 'function') { 
        // 如果在这个处理函数上没绑定任何函数
        // 就像平时那样把f赋值给window.onload;
        window.onload = f;
    } else {
        // 如果已经绑定了函数
        // 就把新函数加到末尾执行
        window.onload = function () {
            oldonload();
            f();
        }
    }
}

addLoadEvent(prepareGallery);
window.onload = prepareLinks;

function prepareLinks () {
    // 对象检测技术，保证向后兼容
    if(!document.getElementsByTagName) return false;
    
    var links = document.getElementsByTagName("a");
    for (var i=0; i<links.length; i++) {
        if(links[i].getAttribute("class") === "popup") {
            links[i].onclick = function () {
                popUp(this.getAttribute("href"));
                return false;
            }
        }
    }
}

function popUp (url) {
    window.open(url, "popup", "width-320,height=480");
}
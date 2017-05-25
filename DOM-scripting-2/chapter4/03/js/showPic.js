function showPic (whichpic) {
    let source = whichpic.getAttribute('href'),
        placeholder = document.getElementById('placeholder'),
        text = whichpic.getAttribute('title'),
        description = document.getElementById('description');
    placeholder.setAttribute('src', source);
    description.firstChild.nodeValue = text; // nodeValue属性的使用
    // description.textContent = text; // 这是我的写法，书上的写法略旧了点
}
function countBodyChildren () {
    var body_element = document.getElementsByTagName('body')[0];
    alert(body_element.childNodes.length);
}

// window.onload = countBodyChildren;
function showPic (whichpic) {
    let source = whichpic.getAttribute('href'),
        placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src', source);
}
function countBodyChildren () {
    var body_element = document.getElementsByTagName('body')[0];
    alert(body_element.childNodes.length);
}

window.onload = countBodyChildren;
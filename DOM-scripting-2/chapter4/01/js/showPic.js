function showPic (whichpic) {
    let source = whichpic.getAttribute('href'),
        placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src', source);
}
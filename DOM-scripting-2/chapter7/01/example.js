window.onload = function() {
    let testdiv = document.getElementById('testdiv');
    let para = document.createElement('p');
    testdiv.appendChild(para);
    let txt = document.createTextNode('Hello world');
    para.appendChild(txt);
}
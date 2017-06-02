window.onload = function () {
  var paras = document.getElementsByTagName("p");
  for(let i=0; i<paras.length; i++) {
    paras[i].onclick = function() {
      alert("You clicked on a paragraph.");
    }
  }

  let para = document.getElementById("example");
  alert(typeof para.nodeName);
  alert(typeof para.style);
  alert(`The color is ${para.style.color}`);
  alert(`The font family is ${para.style.fontFamily}`);
  alert(`The font size is ${para.style.fontSize}`);
}
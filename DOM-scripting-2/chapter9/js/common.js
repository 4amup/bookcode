window.onload = function () {
  var paras = document.getElementsByTagName("p");
  for(let i=0; i<paras.length; i++) {
    paras[i].onclick = function() {
      alert("You clicked on a paragraph.");
    }
  }

  let para = document.getElementById("example");
  para.style.color = "black";
  para.style.font = "2em 'Times', serif";
}
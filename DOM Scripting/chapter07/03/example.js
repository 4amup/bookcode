window.onload = function() {
	var para = document.createElement("p");
	var text1 = document.createTextNode("This is");
	para.appendChild(text1);
	var emphasis = document.createElement("em");
	var text2 = document.createTextNode("my");
	emphasis.appendChild(text2);
	para.appendChild(emphasis);
	var text3 = document.createTextNode(" content.");
	para.appendChild(text3);
	var testdiv = document.getElementById("testdiv");
	testdiv.appendChild(para);
}
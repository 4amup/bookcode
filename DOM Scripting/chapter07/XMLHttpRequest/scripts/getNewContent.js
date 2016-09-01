function getNewContent(){
	var request = getHTTPObject();
	if (true) {
		request.open("GET","example.txt",true);
		request.onreadystatechange = function(){
			if (request.readyState == 4) {
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				para.appendChild(txt);
				document.getElementById("new").appendChild(para);
			}
		};
		request.send(null);
	}else{
		alert("Sorry, your browster doesn\'t support XMLHttpRequest");
	}
}
addLoadEvent(getNewContent);
var needitem;
var menu = document.getElementsByClassName("fortext")[0];
var infoselect; //控制太中的节点
var menuitem; //选中的目录节点
var zhe = document.getElementsByClassName("zhe")[0];
var add = document.getElementsByClassName("add")[0];
var change = document.getElementsByClassName("change")[0];
var alot = document.getElementsByClassName("alot")[0];
var ok = document.getElementsByClassName("constrol-ok")[0];
var no = document.getElementsByClassName("constrol-no")[0];
add.onclick = onclickforadd;
var biaoji = true;

function onclickforadd(e) {
	initconstrol();
	e = e || window.event;
	var thisitem = e.currentTarget;
	var thespanfather = document.getElementsByClassName("selectcategorg")[0];
	for(var a = 0; a < thespanfather.children.length; a++) {
		if(thespanfather.children[a].getAttribute("item") == menuitem.className) {
			thespanfather.children[a].style.background = "white";
			thespanfather.children[a].style.color = "black";
			infoselect = thespanfather.children[a];
		}
	}
	menu.style.display = "none";
	menu.style.opacity = "0";
	zhe.style.display = "block";
	var stryle = "";
	//document.getElementsByClassName("info")[0].value = menuitem.innerText;
	biaoji = true;
}

change.onclick = onclickforchange;

function onclickforchange(e) {
	if(menuitem.className == "maininfo") {
		alert("文档根节点不能进行修改");
		return;
	}
	biaoji = false;
	initconstrol();
	e = e || window.event;
	var thisitem = e.currentTarget;
	var thespanfather = document.getElementsByClassName("selectcategorg")[0];
	for(var a = 0; a < thespanfather.children.length; a++) {
		if(thespanfather.children[a].getAttribute("item") == menuitem.className) {
			thespanfather.children[a].style.background = "white";
			thespanfather.children[a].style.color = "black";
			infoselect = thespanfather.children[a];
		}
	}
	menu.style.display = "none";
	menu.style.opacity = "0";
	zhe.style.display = "block";
	var stryle = "";
	if(menuitem.className != "magic-editor-code") {
		document.getElementsByClassName("info")[0].value = menuitem.innerText;
	}else{
		document.getElementsByClassName("info")[0].value = menuitem.getElementsByClassName("magic-editor-code-code")[0].innerText;
	}
	document.getElementsByClassName("style-textarea")[0].value = menuitem.getAttribute("style");
}
alot.onclick = onclickfordelete;

function onclickfordelete() {
	if(menuitem.className == "maininfo") {
		alert("文档根节点不能进行删除");
		return;
	}
	initconstrol();
	document.getElementsByClassName("maininfo")[0].removeChild(menuitem);
}
no.onclick = onclickforno;

function onclickforno() {
	clickinfo = {};
	zhe.style.display = "none";
	infoselect = undefined;
}
ok.onclick = onclickforok;

function onclickforok() {
	function addstyle(itemsss, styles) {
		var one = styles.split(";");
		for(var a = 0; a < one.length; a++) {
			var b = one[a].split(":");
			if(b.length <= 0) {
				return;
			}
			itemsss.style[b[0]] = b[1];
		}
	}

	function addinfo() {
		console.log(biaoji);
		if(infoselect.getAttribute("item").startsWith("magic-editor-h")) {
			var newitem = createH(infoselect.getAttribute("item"), infovalue)
			addstyle(newitem, style);
			document.getElementsByClassName("maininfo")[0].insertBefore(newitem, menuitem);
			if(biaoji == false) {
				document.getElementsByClassName("maininfo")[0].removeChild(menuitem);
			}
		} else if(infoselect.getAttribute("item") == "magic-editor-quotes") {
			var needvalue = infovalue.split("\n");
			var newitem = createquotes(needvalue);
			addstyle(newitem, style);
			document.getElementsByClassName("maininfo")[0].insertBefore(newitem, menuitem);
			if(biaoji == false) {
				document.getElementsByClassName("maininfo")[0].removeChild(menuitem);
			}
		} else if(infoselect.getAttribute("item") == "magic-editor-quotes-introduction") {
			var newitem = createintroduction(infovalue);
			addstyle(newitem, style);
			document.getElementsByClassName("maininfo")[0].insertBefore(newitem, menuitem);
			if(biaoji == false) {
				document.getElementsByClassName("maininfo")[0].removeChild(menuitem);
			}
		} else if(infoselect.getAttribute("item") == "magic-editor-code") {
			var needvalue = infovalue.split("\n");
			var newitem = createCode(needvalue);
			addstyle(newitem, style);
			document.getElementsByClassName("maininfo")[0].insertBefore(newitem, menuitem);
			if(biaoji == false) {
				document.getElementsByClassName("maininfo")[0].removeChild(menuitem);
			}
		} else if(infoselect.getAttribute("item") == "magic-editor-code-img") {
			var needvalue = infovalue.split("\n");
			var newitem = createImg(needvalue);
			addstyle(newitem, style);
			document.getElementsByClassName("maininfo")[0].insertBefore(newitem, menuitem);
			if(biaoji == false) {
				document.getElementsByClassName("maininfo")[0].removeChild(menuitem);
			}
		} else if(infoselect.getAttribute("item") == "magic-editor-title") {
			var newitem = createTitle(infovalue);
			addstyle(newitem, style);
			document.getElementsByClassName("maininfo")[0].insertBefore(newitem, menuitem);
			if(biaoji == false) {
				document.getElementsByClassName("maininfo")[0].removeChild(menuitem);
			}
		} else {
			if(biaoji == false) {
				var newitem = document.createElement("div");
				newitem.className = infoselect.getAttribute("item");
				newitem.innerHTML = infovalue;
				addstyle(newitem, style);
				document.getElementsByClassName("maininfo")[0].insertBefore(newitem, menuitem);
				document.getElementsByClassName("maininfo")[0].removeChild(menuitem);
			} else {
				console.log("ol");
				var needitem = document.createElement("div");
				needitem.className = infoselect.getAttribute("item");
				needitem.innerHTML = infovalue;
				addstyle(needitem, style);
				document.getElementsByClassName("maininfo")[0].insertBefore(needitem, menuitem);
			}
		}
	}

	function addnewinfo() {
		if(infoselect.getAttribute("item").startsWith("magic-editor-h")) {
			var newitem = createH(infoselect.getAttribute("item"), infovalue)
			document.getElementsByClassName("maininfo")[0].appendChild(newitem);
		} else if(infoselect.getAttribute("item") == "magic-editor-quotes") {
			var needvalue = infovalue.split("\n");
			var newitem = createquotes(needvalue);
			document.getElementsByClassName("maininfo")[0].appendChild(newitem);
		} else if(infoselect.getAttribute("item") == "magic-editor-quotes-introduction") {
			var newitem = createintroduction(infovalue);
			document.getElementsByClassName("maininfo")[0].appendChild(newitem);
		} else if(infoselect.getAttribute("item") == "magic-editor-code") {
			var needvalue = infovalue.split("\n");
			var newitem = createCode(needvalue);
			document.getElementsByClassName("maininfo")[0].appendChild(newitem);
		} else if(infoselect.getAttribute("item") == "magic-editor-code-img") {
			var needvalue = infovalue.split("\n");
			var newitem = createImg(needvalue);
			document.getElementsByClassName("maininfo")[0].appendChild(newitem);
		} else if(infoselect.getAttribute("item") == "magic-editor-title") {
			var newitem = createTitle(infovalue);
			document.getElementsByClassName("maininfo")[0].appendChild(newitem);
			//document.getElementsByClassName("maininfo")[0].appendChild(newitem);
		} else {
			var d = document.createElement("div");
			d.className = infoselect.getAttribute("item");
			d.innerHTML = infovalue;
			addstyle(d, style);
			document.getElementsByClassName("maininfo")[0].appendChild(d);
		}
	}
	if(menuitem.className != "maininfo") {
		var style = document.getElementsByClassName("style-textarea")[0].value;
		var infovalue = document.getElementsByClassName("info")[0].value;
		//menuitem.className = infoselect.getAttribute("item");
		addinfo();
		initconstrol();
		document.getElementsByClassName("zhe")[0].style.display = "none";
		initallMaintext();
	} else {
		var style = document.getElementsByClassName("style-textarea")[0].value;
		var infovalue = document.getElementsByClassName("info")[0].value;
		addnewinfo();
		initconstrol();
		document.getElementsByClassName("zhe")[0].style.display = "none";
		initallMaintext();
	}
}

function getClassNameFromspan(info) {
	switch(info) {
		case "title":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[0];
			break;
		case "quotes":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[1];
			break;
		case "text-Y":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[2];
			break;
		case "text-N":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[3];
			break;
		case "H1":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[4];
			break;
		case "H2":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[5];
			break;
		case "H3":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[6];
			break;
		case "H4":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[7];
			break;
		case "H5":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[8];
			break;
		case "H6":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[9];
			break;
		case "IMG":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[10];
			break;
		case "CODE":
			return document.getElementsByClassName("selectcategorg")[0].getElementsByTagName("span")[11];
			break;
	}
}

function initallMaintext() {
	var maininfo = document.getElementsByClassName("maininfo")[0];
	for(var a = 0; a < maininfo.children.length; a++) {
		maininfo.children[a].style.cursor = "pointer";
		maininfo.children[a].onmouseover = function(e) {
			for(var a = 0; a < maininfo.children.length; a++) {
				maininfo.children[a].style.background = "";
			}
			e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.3)";
		}
		maininfo.children[a].oncontextmenu = function(e) {
			needitem = e.currentTarget;
			menuitem = e.currentTarget;
			e.cancelBubble;
			e.preventDefault();
			e.stopPropagation();
			menu.style.display = "block";
			menu.style.opacity = "1";
			menu.style.top = e.pageY + "px";
			menu.style.left = e.pageX + "px";
		}
	}
}

window.onload = function() {
	addScoll(document.getElementsByClassName("mytext")[0], document.getElementsByClassName("fathermaininfo")[0], {
		"theWayColor": "rgba(0,0,0,0)",
		"theSblingColor": "rgba(255, 255, 255, 0.5)"
	});
	document.getElementsByClassName("maininfo")[0].oncontextmenu = function(e) {
		needitem = e.currentTarget;
		menuitem = e.currentTarget;
		e.cancelBubble;
		e.preventDefault();
		e.stopPropagation();
		menu.style.display = "block";
		menu.style.opacity = "1";
		menu.style.top = e.pageY + "px";
		menu.style.left = e.pageX + "px";
	}
	initallMaintext();
	addclickforSelectone();
	document.getElementsByClassName("send")[0].onclick = function() {
		document.getElementsByClassName("zhe22")[0].style.display = "block";
	}
	document.getElementsByClassName("oneok")[0].onclick = function() {
		document.getElementsByClassName("zhe22")[0].style.display = "none";
		var categroy = document.getElementById("textforfenlei"); //分类
		alert(categroy.value);
		var biaoqian = document.getElementById("textforbiaoqian");
		var aside = document.createElement("aside");
		var nav = document.createElement("nav");
		aside.className = "aboutme";
		nav.className = "otherText";
		aside.innerHTML = '<div class="aboutme-out"><div class="title"><span class="about-meinfo">文章标题:</span><span class="text-title"></span></div><div class="headimg"><img src="img/logo.jpg" /></div><div class="auther"><span class="about-meinfo">作者:</span><span class="authername">K&nbsp;Y&nbsp;S</span></div><div class="release"><span class="about-meinfo"><i class="iconfont icon-8" style="color: greenyellow;"></i>发布时间:</span><span class="release"></span></div></div></aside>';
		nav.innerHTML = '<nav class="otherText"><div class="bq-text"></div><div class="fg-text"></div><div class="sx-text"><div class="beforetext"><a href="" rel="before"><< 上一篇文章</a></div><div class="nexttext"><a href="" rel="next">下一篇文章 >></a></div></div></nav>';
		var title = aside.getElementsByClassName("text-title")[0];
		var titleinfo = document.getElementsByClassName("magic-editor-title")[0];
		title.innerHTML = titleinfo.innerHTML;
		var whitetime = aside.getElementsByClassName("release")[1];
		var date = new Date();
		whitetime.innerHTML = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate()) + " " + date.getHours() + ":" + date.getMinutes();
		var categroylist = categroy.value.split(":");
		var biaoqianlist = biaoqian.value.split(":");
		biaoqianlist.forEach(function(item) {
			var aaa = document.createElement("span");
			aaa.innerHTML = '<i class="textlianjie iconfont icon-tag-copy"></i>';
			aaa.children[0].innerHTML = item;
			nav.getElementsByClassName("bq-text")[0].appendChild(aaa);
		});
		var maininfo = document.getElementsByClassName("maininfo")[0];
		for(var a = 0; a < maininfo.children.length; a++) {
			maininfo.children[a].style.cursor = "";
			maininfo.children[a].style.backgroundColor = "";
			console.log("oooo");
		}

		//-----------------------!!!!
		console.log(document.getElementsByClassName("maininfo")[0].innerHTML);
	    var maininfo = document.getElementsByClassName("maininfo")[0];
var img = maininfo.getElementsByTagName('img')[0] ?maininfo.getElementsByTagName('img')[0].src  : "img/003.jpg";

var title = maininfo.getElementsByClassName('magic-editor-title')[0].innerText;

var content = maininfo.getElementsByClassName('magic-editor-N')[0]? maininfo.getElementsByClassName('magic-editor-N')[0].innerHTML:"";

var time = whitetime.innerHTML;


var tlink ="artical.html";
var user = "安妮小雅";
var views = 30;
var likes = 10;

var articalItem = {
	"time":time,
	"user":user,
	"views":148,
	"likes":35,
	"link":"artical.html",
	"img":img,
	"title":title,
	"content":content,
	//文章列表中的小段
	"category":categroy.value
}
console.log( articalItem);

		//-----------------------!!!!

		document.getElementsByClassName("maininfo")[0].appendChild(aside);
		document.getElementsByClassName("maininfo")[0].appendChild(nav);
	}
	document.getElementsByClassName("twono")[0].onclick = function() {
		document.getElementsByClassName("zhe22")[0].style.display = "none";
		var categroy = document.getElementById("textforfenlei");
		var biaoqian = document.getElementById("textforbiaoqian");
		categroy.value = "";
		biaoqian.value = "";
		initallMaintext();
	}
}

function initconstrol() {
	var aaa = document.getElementsByClassName("selectcategorg")[0];
	var bbb = document.getElementsByClassName("style-textarea")[0];
	var ccc = document.getElementsByClassName("info")[0];
	for(var a = 0; a < aaa.children.length; a++) {
		aaa.children[a].style.background = "";
		aaa.children[a].style.color = "white";
	}
	bbb.value = "";
	ccc.value = "";
}

function addclickforSelectone() {
	var aaa = document.getElementsByClassName("selectcategorg")[0];
	for(var a = 0; a < aaa.children.length; a++) {
		aaa.children[a].onclick = function(e) {
			infoselect = e.currentTarget;
			var aaa = document.getElementsByClassName("selectcategorg")[0];
			for(var a = 0; a < aaa.children.length; a++) {
				aaa.children[a].style.background = "";
				aaa.children[a].style.color = "white";
			}
			e.currentTarget.style.background = "white";
			e.currentTarget.style.color = "black";
		}
	}
}

function createH(classname, infovalue) {
	var newitem = document.createElement(infoselect.getAttribute("item").split("-")[2]);
	var a = document.createElement("a");
	newitem.className = classname;
	a.id = infovalue == "" || infovalue == undefined ? "no info" : infovalue;
	a.name = infovalue == "" || infovalue == undefined ? "no info" : infovalue;
	a.innerHTML = infovalue == "" || infovalue == undefined ? "no info" : infovalue;
	newitem.appendChild(a);
	return newitem;
}

function createquotes(textlist) {
	var aside = document.createElement("aside");
	aside.className = "magic-editor-quotes";
	aside.innerHTML = '<div class="magic-editor-quotes-cn"></div><div class="magic-editor-quotes-en"></div>';
	aside.children[0].innerHTML = textlist[0] == "" || textlist[0] == undefined ? "no info" : textlist[0];
	aside.children[1].innerHTML = textlist[1] == "" || textlist[1] == undefined ? "no info" : textlist[1];
	return aside;
}

function createintroduction(textlist) {
	var section = document.createElement("section");
	section.className = "magic-editor-quotes-introduction";
	section.innerHTML = textlist == "" || textlist == undefined ? "no info" : textlist;
	return section;
}

function createImg(info) {
	var d = document.createElement("div");
	d.className = "magic-editor-code-img";
	var img = document.createElement("img");
	img.src = info == "" || info == undefined ? "no info" : info;;
	d.appendChild(img);
	return d;
}

function createCode(infos) {
	var figure = document.createElement("figure");
	figure.className = "magic-editor-code";
	figure.innerHTML = '<div class="needscoll"><table><tbody><tr><td><pre class="magic-editor-code-number"></pre></td><td><pre class="magic-editor-code-code"></pre></td></tr></tbody></table></div>';
	var number = figure.getElementsByClassName("magic-editor-code-number")[0];
	var code = figure.getElementsByClassName("magic-editor-code-code")[0];
	for(var a = 0; a < infos.length; a++) {
		var div1 = document.createElement("div");
		var div2 = document.createElement("div");
		div1.classname = "magic-editor-code-number";
		div1.innerHTML = "" + (a + 1);
		div2.className = "magic-editor-code-line";
		div2.innerHTML = infos[a];
		number.appendChild(div1);
		code.appendChild(div2);
	}
	return figure;
}

function createTitle(infos) {
	var h1 = document.createElement("h1");
	h1.className = "magic-editor-title";
	h1.innerHTML = infos == "" || infos == undefined ? "no info" : infos;
	return h1;
}
document.body.onclick = function() {
	menu.style.display = "none";
	menu.style.opacity = "0";
}
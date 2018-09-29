var canvas = document.getElementById("canvas");
var cxt = canvas.getContext('2d');

var w = canvas.width;
var h = canvas.height;
var x = w/2,y = w/2, r = w/3;
//画底色背景   环形
for (var i=0;i<5;i++) {
	cxt.beginPath();
	cxt.arc(x,y,r*(1-i*0.2), 0 , 360*Math.PI/180, false);
	cxt.closePath();
	cxt.strokeStyle = "#888";
	cxt.stroke();
	if (i%2==1) {
		cxt.fillStyle = "#eee";
	}else{
		cxt.fillStyle = '#fff';   
	}
	cxt.fill();
}
var bian = skill.length;
var posArr = [];
var degree = (2 * Math.PI) / bian;

for (var i=0;i<bian; i++) {
	var x = Math.cos( i * degree);
	var y = Math.sin( i * degree);
	//画每一条从中心点出发的射线
	cxt.moveTo(w/2,h/2);
	cxt.lineTo( x *r +w/2,y*r+h/2);
	cxt.strokeStyle = "#ddd";
	cxt.stroke();
	//每一个技能的名字
	cxt.fillStyle = "gray";
	var newX,newY;
	var posX = x * r +w/2;
	var posY = y*r+h/2;
	if (posX <r) {
		newX = r + (posX - r)*1.8;
	}else{
		newX = r + (posX - r)*1;
	}
	if (posY<r) {
		newY = r + (posY - r)*1.3;
	}else{
		newY = r + (posY - r)*1.1;
	}
	cxt.fillText(skill[i].name+'('+skill[i].size+'%)',newX, newY);
	var pos = {
		"x":x* skill[i].size /100 * r +w/2,
		"y":y* skill[i].size /100 * r + h/2
	}
	posArr.push( pos );
}
//画多边形 并填充
//cxt.fillStyle ="rgba(81,181,132,0.5)";
//cxt.strokeStyle = "rgb(81,181,132)";
//cxt.beginPath();
//for (var i=0;i<posArr.length;i++) {
//	console.log(posArr[i]);
//	cxt.lineTo(posArr[i].x,posArr[i].y);
//}
//cxt.closePath();
//cxt.stroke();
//cxt.fill();
//在每一个点上画小圆
cxt.fillStyle = "rgb(81,181,132)";
for (var i=0;i<posArr.length;i++) {
	cxt.beginPath();
	cxt.arc( posArr[i].x,posArr[i].y,3,0,360*Math.PI/180,false);
	cxt.closePath();
	cxt.fill();
}
var skillEle = document.getElementById("skill");
canvas.onmousemove = function(e){
	e = e||window.event;
	var thisL = this.getBoundingClientRect().left;
	var thisT = this.getBoundingClientRect().top;
	var mouseX = e.clientX - thisL;
	var mouseY = e.clientY - thisT;
//	if (mouseX) {
//		
//	}
	var item = document.createElement("div");
	item.style.width = "300px";
	item.style.height = 300+"px";
	item.style.background = "hotpink";
	item.style.position ="absolute";
	item.style.left = mouseX +"px";
	item.style.top  = mouseY +"px";
//	skillEle.appendChild(item);
}

var tree = document.getElementById("tree");
var cxt2 = tree.getContext('2d');
//画多边形 并填充
cxt2.fillStyle ="rgba(81,181,132,0.5)";
cxt2.strokeStyle = "rgb(81,181,132)";
cxt2.beginPath();
for (var i=0;i<posArr.length;i++) {
//	console.log(posArr[i]);
	cxt2.lineTo(posArr[i].x,posArr[i].y);
}
cxt2.closePath();
cxt2.stroke();
cxt2.fill();

tree.onmouseover = function( e ){
	cxt2.clearRect(0,0,w,h);	
	cxt2.fillStyle ="rgba(81,181,132,0.8)";
	cxt2.strokeStyle = "rgb(81,181,132)";
	cxt2.beginPath();
	for (var i=0;i<posArr.length;i++) {
//		console.log(posArr[i]);
		cxt2.lineTo(posArr[i].x,posArr[i].y);
	}
	cxt2.closePath();
	cxt2.stroke();
	cxt2.fill();
}
tree.onmouseout = function(){
	cxt2.clearRect(0,0,w,h);
	cxt2.fillStyle ="rgba(81,181,132,0.4)";
	cxt2.strokeStyle = "rgb(81,181,132)";
	cxt2.beginPath();
	for (var i=0;i<posArr.length;i++) {
//		console.log(posArr[i]);
		cxt2.lineTo(posArr[i].x,posArr[i].y);
	}
	cxt2.closePath();
	cxt2.stroke();
	cxt2.fill();
}
//移动到每一个技能点的时候， 出现一个小板块
tree.onmousemove = function( e ){
	e = e||window.event;
	var thisL = this.getBoundingClientRect().left;
	var thisT = this.getBoundingClientRect().top;
	var mouseX = e.clientX - thisL;  //鼠标相对与tree的左边
	var mouseY = e.clientY - thisT;
	
//	cxt2.beginPath();
//	cxt2.arc(posArr[0].x,posArr[0].y,6,0,360*Math.PI/180,false);
//	cxt2.fillStyle = "red";
//	cxt2.fill();
//	cxt2.closePath();
//	console.log(posArr[0].x+","+posArr[0].y);
//	console.log(mouseY);
	if ( Math.abs( mouseY - posArr[0][y])<20  ) {
		alert(1);
	}
	for (var i=0;i<posArr.length;i++) {
		if ( Math.abs( mouseY - posArr[0][y])<20  ) {
//			Math.abs( mouseX - posArr[i][x])<20 &&  Math.abs( mouseY - posArr[i][y])<20
			
			var item = document.createElement("div");
			item.style.width = "100px";
			item.style.height = 80+"px";
			item.style.background = "hotpink";
			item.style.position ="absolute";
			item.style.left = e.clientX +"px";
			item.style.top  = e.clientY +"px";
			item.style.zIndex = 5;
			skillEle.appendChild(item);
			return ;
		}
	}
}
var div1 = mainWrap.getElementsByClassName('aboutme')[0].getElementsByTagName('div')[0];

var div2 = mainWrap.getElementsByClassName('aboutme')[0].getElementsByTagName('div')[1];
var xiaoya = div1.getElementsByTagName('section')[0];
var contact = div1.getElementsByTagName('section')[1];
contact.style.transform = "rotateY(0deg)";
tree.style.transform = "scale(1)";

setTimeout( function(){
	move( xiaoya,{"opacity":1},500,function(){
	move(div1,{"top":50},500,function(){
		move( contact,{"opacity":1},400,function(){
			move(div1,{"left":0,"top":0},500,function(){
				move(div2,{"right":0},400,"","backOut");
			},"easeOut")
		},"linear");
	},"linear");
},"linear");
},600);




var html = document.getElementsByTagName('html')[0];
var rightWrap = document.getElementById("rightWrap");
var mainWrap = document.getElementById("mainWrap");
var rightOpenBtn = document.getElementById("rightOpenBtn");
var menuWrap = document.getElementById("menuWrap");
var categoryList = document.getElementById("categoryList");
var recommend = document.getElementById("recommend");
var rightInner = document.getElementById("rightInner");
var rightOpenOrClose = true;
//var articals = document.getElementsByTagName('article');

function getStyle( obj ,attr){
	if (obj.currentStyle) {
		return parseFloat( obj.currentStyle[attr]);
	}else{
		return parseFloat( getComputedStyle(obj,null)[attr]);
	}
}


//----------------------------------------------------------
//生成页面上所有的文章
function createArticals( parent ,w,cur){
	var bgcArr = ["rgb(239,206,232)","rgb(243,215,181","rgb(253,255,223)","rgb(218,249,206)","rgb(199,179,209)"];
	var bgcArr2 = ["rgba(235,149,52,0.5)","rgba(224,70,21,0.5)","rgba(125,194,52,0.5)"];
	var start = (cur-1) * 6 ;
//	console.log(start);
	//截取相应页的文章
	for (var i=start;i< articalArr.length && i <start +6;i++) {
		var section = document.createElement("section");
		section.style.background = bgcArr[i%bgcArr.length];
//		section.style.border = "1px solid "+bgcArr2[i%bgcArr2.length]
		var div = document.createElement("div");
		div.className = "artical clearfix";
		section.appendChild(div);	
		var a =document.createElement("a");
		a.href = articalArr[i].link;

		a.className = "left";
		a.innerHTML = "<img src="+ articalArr[i].img  +" />";
		div.appendChild(a);
		var artical = document.createElement("article");
		artical.className = "left";		
		var atitle = document.createElement("a");
		atitle.href = articalArr[i].link;
		atitle.innerHTML = "<h3>"+ articalArr[i].title +"</h3>";
		var ptxt = document.createElement("p");
		if(w<=600) {
			ptxt.innerHTML = articalArr[i].content.substr(0,60)+"...";
		}else if( w <1200){
			ptxt.innerHTML = articalArr[i].content.substr(0,88)+"...";
		}else{
			ptxt.innerHTML = articalArr[i].content.substr(0,168)+"...";
		}
		artical.appendChild(atitle);
		artical.appendChild(ptxt);
		div.appendChild(artical);
		var details = document.createElement("p");
		details.className = "details";
		details.innerHTML = "<span><i class='iconfont icon-zuozhe'></i>"+articalArr[i].user+"</span><span><i class = 'iconfont icon-shijian'></i>"+articalArr[i].time +"</span><span><i class='iconfont icon-leimupinleifenleileibie'></i>"+articalArr[i].category+"</span><span><i class='iconfont icon-kanguo'></i>"+articalArr[i].views+"</span><span><i class='iconfont icon-xihuan'></i>"+articalArr[i].likes+"</span>";
		section.appendChild(details);
		parent.appendChild(section);
	}
}
//添加页码
function addPages( allPages  ){
	if (mainWrap.getElementsByTagName('footer')[0]) {
		mainWrap.removeChild(mainWrap.getElementsByTagName('footer')[0]);
	}
	var footer = document.createElement("footer");
	var prev = document.createElement("a");
	prev.className = "prev";
	prev.href = "#";
	prev.innerHTML = "<em><</em>";
	footer.appendChild(prev);
	prev.onclick = function(){
		cur--;
		if (cur<=1) {
			cur=1;
		}
		mainWrap.innerHTML = "";
		createArticals( mainWrap, w , cur);
		addPages();
		changePage( cur);
	}
	var next  = document.createElement("a");
	next.className = "next";
	next.href = "#";
	next.innerHTML = "<em>></em>";
	footer.appendChild(next);
	next.onclick = function(){
		cur++;
		if (cur>sumPages) {
			cur = sumPages;
		}
		mainWrap.innerHTML = "";
		createArticals( mainWrap, w , cur);
		addPages();
		changePage( cur);
		// 生成相应的文章列表  createArticals
	}
	var pages = document.createElement("div");
	pages.className  ="pages";
//	pages.innerHTML = "<a href='#'>1</a><a href='#'>2</a><span class='cur'>3</span><a href='#'>4</a><a href='#'>5</a><span>...</span><a href='#'>34</a>";
	footer.appendChild(pages);
	mainWrap.appendChild(footer);
}

function changePage( cur ){
	var pages = document.getElementsByClassName('pages')[0];
	var prevBtn = document.getElementsByClassName('prev')[0];
	var nextBtn = document.getElementsByClassName('next')[0];
	var str = "";
	if (cur<=0 || cur >sumPages) {
		return ;
	}
	if (sumPages <=6 ) {
		if (cur==1) {
			prevBtn.style.display = "none";
		}
		if (cur == sumPages) {
			nextBtn.style.display = "none";
		}
		for (var i=1;i<=sumPages;i++) {
			if (i ==cur) {
				str += "<span class='cur'>"+ cur+"</span>";
			}else{
				str+="<a href='#'>"+ i+ "</a>";
			}
		}
		pages.innerHTML = str;
		
	}else{
		var str = "";
		if (cur == sumPages) {
			nextBtn.style.display = "none";
		}
		if (cur<=3) {
			for (var i=1;i<=sumPages;i++) {
				if (i<= 3) {
					if (i ==cur) {
						str+="<span class='cur'>"+ i+"</span>";	
					}else{
						str+="<a href='#'>"+i+"</a>";
					}
				}else{
					str+="<span>...</span>";
					str+="<a href='#'>"+sumPages+"</a>";
					break;
				}
			}
		}else if( cur <= sumPages-3){
			str+="<a href='#'>"+1+"</a><span>...</span>";
			str+="<a href='#'>"+(cur-1)+"</a>";
			str+="<span class='cur'>"+cur+"</span>";
			str+="<a href='#'>"+(cur+1)+"</a>";
			str+="<span>...</span><a href='#'>"+sumPages+"</a>";
		}else{
			str+="<a href='#'>"+1+"</a><a href='#'>"+2+"</a><span>...</span>";
			str+="<a href='#'>"+(cur-1)+"</a>";
			str+="<span class='cur'>"+cur+"</span>";
			for (var i= cur+1;i<=sumPages;i++) {
				str+="<a href='#'>"+i+"</a>";
			}
		}
		pages.innerHTML = str;
	}
	
	var abtns = pages.getElementsByTagName('a');
	for (var i=0;i<abtns.length;i++) {
		abtns[i].onclick = function(){
		console.log(this.innerHTML);
				cur = parseInt( this.innerHTML );
				mainWrap.innerHTML = "";
				createArticals( mainWrap ,w, cur);
				addPages( sumPages);
				changePage(cur);
			}
	}
}

//-----------------------------------------------------------

rightOpenBtn.onclick = function() {
	//收回 、展开 右侧部分	
	if (rightOpenOrClose) {
		rightWrap.style.width = 0;
		this.style.right = 0.6+'rem';
		this.innerHTML = "<<";
		this.style.fontSize = 0.4+'rem';
		mainWrap.style.right = 0;
		rightOpenOrClose = false;
	}else{
		rightWrap.style.width = 5+'rem';
		this.style.right = 5+"rem";
		this.innerHTML = "×";
		this.style.fontSize = 0.8+'rem';
		mainWrap.style.right = 5+'rem';
		rightOpenOrClose = true;
	}
}

//左侧展开收回
var openLeftBtn = document.getElementById("leftOpenBtn");
var leftOpenOrClose = false;  //默认是关的
openLeftBtn.onclick = function(){
	if (!leftOpenOrClose) {
		leftOpenOrClose = true;
		menuWrap.style.left = 0;
		this.innerHTML = "&laquo;";
		this.style.left = 5+"rem";
		this.style.opacity = 0.8;
	}else{
		leftOpenOrClose = false;
		menuWrap.style.left = -6+"rem";
		this.innerHTML ="&equiv;";
		this.style.left = 0+"rem";
		this.style.opacity = 0.3;
	}	
}

//搜索部分
var form1 = document.getElementById("form1");
var searchText = form1.searchText;
var searchBtn = form1.searchBtn;

searchText.oninput = function(){
	if (this.value=="") {
		this.nextElementSibling.style.right = 1.2+"rem";
		this.style.borderColor = "#ccc";
	}else{
		this.nextElementSibling.style.right = 0.5+"rem";
		this.style.borderColor = "rgb(255,133,0)";
	}
}

searchBtn.onclick = function(){
	if (searchText.value=="") {
		searchText.placeholder = '输入内容进行搜索';
		return;
	}else{
		form1.submit();
		searchText.value = "";
		searchText.placeholder = "搜索";
		//请求新的文章
		
		
		
	}
}
var myBody = document.getElementById("mybody");
var leftInner = document.getElementsByClassName('leftInner')[0];
//右侧滚动条
addScoll( rightInner, rightWrap, {"useLeft":true});
//给body加滚动条
addScoll( myBody,document.body,{});
//给左侧加滚动条
addScoll( leftInner,menuWrap,{});
function stopBubble(e){
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}else{
		window.event.cancelBubble = true;
	}
}

//推荐文章加鼠标移动事件
recommend.onmousemove = function( ev){
	ev = ev||window.even;
	moveBoard( ev, this);
}
recommend.onmouseout = function(){
	this.style.transform = "rotateX(0) rotateY(0) translateZ(0px)";
}
//友链加上鼠标移动事件
var friendLink = document.getElementById("friendLink");//友链
friendLink.onmousemove = function(ev){
	ev = ev||window.even;
	moveBoard( ev, this);
}

friendLink.onmouseout = function(){
	this.style.transform = "rotateX(0) rotateY(0) translateZ(0px)";
}

//鼠标移动特效
function moveBoard(ev , obj ){
	var w = obj.offsetWidth;
	var h = obj.offsetHeight;
	//box 的中心点
	var centerX = w/2;
	var centerY = h/2;
	//获取鼠标在box中的位置
//	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;				
	var mouseX = ev.clientX - obj.getBoundingClientRect().left;
	var mouseY =  ev.clientY - obj.getBoundingClientRect().top; //鼠标在box中的坐标，坐标原点是box的左上角	
	var xc = mouseX - centerX;
	var yc = mouseY - centerY;
	//坐标原点相当与元素中心点， xc,yc是鼠标相对于中心点的坐标
	var xdeg, ydeg;
	xdeg = -yc*0.0625;
	ydeg = xc*0.0625;
	obj.style.transform = "rotateX(" + xdeg + "deg) rotateY(" + ydeg + "deg) translateZ(50px)";
}

var bgcArr3 = ["rgba(235,149,52,0.5)","rgba(224,70,21,0.5)","rgba(125,194,52,0.5)"];
var bgcArr = ["rgb(239,206,232)","rgb(243,215,181","rgb(253,255,223)","rgb(218,249,206)","rgb(199,179,209)"];
//添加推荐
addToRecomm();
function addToRecomm(){
	var h3 = document.createElement("h3");
	h3.innerHTML = recommendInfo.title;
	recommend.appendChild(h3);
	var ul = document.createElement("ul");
	ul.className = "recommList";
	var recommList = recommendInfo.recommList;
	for (var j=0 ; j < recommList.length; j++) {
		var alink = recommList[j].link;
		var title = recommList[j].title;
		var li = document.createElement("li");
		var i = document.createElement("i");
		var a = document.createElement("a");
		a.href = alink;
		a.title = title;
		a.innerHTML = title;
		li.appendChild(i);
		li.appendChild(a);
//		li.style.background = bgcArr[j%bgcArr.length];
		ul.appendChild(li);
		a.onclick = function(){
			//跳转到文章推荐
			alert(1);
			cur  = 2;
			mainWrap.innerHTML = "";
			createArticals( mainWrap ,w, cur);
			addPages( sumPages);
			changePage(cur);	
//			if ( ! isIndex) {
//				//不是首页的，让section footer显示
//				
//			}else{
//				
//			}
			alert( window.location.href);
			
			
		}	
	}
	recommend.appendChild(ul);
}
//添加友链
addToFriend();
function addToFriend(){
	var h3 = document.createElement("h3");
	h3.innerHTML = friendLinkInfo.title;
	friendLink.appendChild(h3);
	var friendList = friendLinkInfo.links;
	for (var i=0;i<friendList.length;i++) {
		var a = document.createElement("a");
		a.style.background = bgcArr3[i%bgcArr3.length];
		a.href = friendList[i].link;
		a.title = friendList[i].name;
		var span = document.createElement("span");
		span.innerHTML = a.title;
		a.appendChild(span);
		friendLink.appendChild(a);
	}
}

//添加目录分类
var w = document.documentElement.clientWidth||document.body.clientWidth;
var cur,sumPages;
var len = articalArr.length;
sumPages = Math.ceil( len / 6 );
cur = 1;
createArticals( mainWrap ,w, cur);
addPages( sumPages);
changePage(cur);

addToCategory();
function addToCategory(){
	var div = document.createElement("div");
	div.className = "categoryInner";
	var info = categoryInfo.info;
	for (var i=0;i<info.length; i++) {
		var nav = document.createElement("nav");
		nav.style.background =  bgcArr3[i%bgcArr3.length];
		var a = document.createElement("a");
		a.href = info[i].link;
		a.title = info[i].name;
		nav.appendChild(a);
		var span = document.createElement("span");
		span.innerHTML = info[i].name;
		a.appendChild(span);
		var span2 = span.cloneNode();
		span2.innerHTML = "("+info[i].num+")";
		a.appendChild(span2);
		div.appendChild(nav);
		a.onclick = function(){
			// 知道类
			//请求这个类的文章
			//后台发来这个类的所有文章Json
			// 解析Json存入  articalArr数组中，
			//渲染相应页面的文章，数组的长度，计算出总页码
			//页码被点击的时候，
			// 6 篇一页
			mainWrap.innerHTML = "";
			len = articalArr.length;
			// 1-6 7-12 13-18 19-24
			sumPages = Math.ceil( len / 6 );
			cur = 1;
			//展示当前页码
			//展示当前页码的文章
			createArticals( mainWrap ,w, cur);
			addPages( sumPages);
			changePage(cur);
		}
	}	
	categoryList.appendChild(div);
}

//点击页码，更换文章

var oldnav;
var navs = categoryList.getElementsByTagName('nav');
for (var i=0;i<navs.length;i++) {
	navs[i].onclick = function(){
		if (oldnav) {
			oldnav.style.borderLeftWidth = 0;
			this.style.borderLeft = "0.2rem solid #20B2AA";
			oldnav = this;
		}else{
			this.style.borderLeft = "0.2rem solid #20B2AA";
			oldnav = this;
		}
	}
	move(navs[i],{"right":0},1100+50*i,"","");	
}
//初始的动态效果
var h3 = recommend.getElementsByTagName('h3')[0];
var recomList = recommend.getElementsByTagName('ul')[0];
var friendh3 = friendLink.getElementsByTagName('h3')[0];
var categoryInner = categoryList.getElementsByTagName('div')[0];
var header = document.getElementById("head");
var headerImg = header.getElementsByTagName('div')[0];
var pSlogn = header.getElementsByTagName('p')[0];
document.onreadystatechange = function(){
	if (document.readyState == "complete") {
			move(headerImg,{"top":0},300,function(){
			move(pSlogn,{"right":0},400,function(){
				move( categoryList,{"opacity":1},400,function(){},"easeOut");
			},"linear");
		},"linear")
		setTimeout( function(){
			move(mainWrap,{"opacity":1},400,"","easeOut");
		},80);
		setTimeout(function(){
			move( recommend ,{"left":0},400,function(){
				move( h3,{"top":0},400,function(){ },"linear");
				move( recomList,{'top':0},400,'','linear')
			},"easeOut");
			move( friendLink ,{"opacity":1},600,function(){
				move( friendh3,{"top":0},600,"","bounceIn");
			},"easeOut");
		},500);
	}
}

function move(obj, j, duration, fn, ease) {
	var ease = ease || "linear"
	var oldTime = new Date().getTime();
	var d = duration;
	var s = {};
	for(var attr in j) {
		s[attr] = {};
		s[attr].b = parseFloat(getComputedStyle(obj)[attr]);
		s[attr].c = parseFloat(j[attr]) - s[attr].b;
	}
	obj.timer = setInterval(function() {
		var t = new Date().getTime() - oldTime;
		if(t >= d) {
			t = d
		}
		for(var attr in s) {
			var c = s[attr].c;
			var b = s[attr].b;
			var v = Tween[ease](t, b, c, d); //计算当前值
			if(attr == "opacity") {
				obj.style[attr] = v;
			} else {
				obj.style[attr] = v + "px";
			}
		}
		if(t == d) {
			clearInterval(obj.timer);
			fn && fn();
		}
	}, 16)
	//大多数屏幕的刷新频率是60次/秒,1000/60 = 16ms, 如果时间大于这个16ms就会出现卡顿 
}
var panel = document.getElementById('panel');
var btns = panel.getElementsByTagName('button');
//自定义右键菜单
document.oncontextmenu = function(e){
	panel.style.display = "block";
	panel.style.left = e.clientX+"px";
	panel.style.top = e.clientY+"px";	
	return false; //阻止浏览器的默认行为
}
btns[0].onclick = function(){
	console.log( getStyle(mainWrap,null)["top"]  );
}

//点击页面生成小星星
document.onclick = function(e){
	panel.style.display = "none";
	var star = document.createElement("img");
	star.src = "img/star.png";
	star.style.width = 40+"px";
	star.style.height = 40+"px";
	star.style.borderRadius = "50%";
	star.style.position = "fixed";
	var sT = e.clientY;
	star.style.left = e.clientX - 20+"px";
	star.style.top = e.clientY - 20+"px";
	document.body.appendChild(star);
	
	move(star,{"top":sT - 200,"opacity":0},800,function(){
		document.body.removeChild(star);
	},"easeIn");
	
}

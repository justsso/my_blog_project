//生成页面上所有的文章
function createArticals( parent ,w,cur){
	var bgcArr = ["rgb(239,206,232)","rgb(243,215,181","rgb(253,255,223)","rgb(218,249,206)","rgb(199,179,209)"];
	var bgcArr2 = ["rgba(235,149,52,0.5)","rgba(224,70,21,0.5)","rgba(125,194,52,0.5)"];
	var start = (cur-1) * 6 ;
	console.log(start);
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
		details.innerHTML = "<span><i class='iconfont icon-zuozhe'></i>"+articalArr[i].user+"</span><span><i class = 'iconfont icon-shijian'></i>"+articalArr[i].time +"</span><span><i class='iconfont icon-leimupinleifenleileibie'></i>"+articalArr[i].category+"</span><span><i class='iconfont icon-kanguo'></i>"+articalArr[i].views+"人看过 </span><span><i class='iconfont icon-xihuan'></i>"+articalArr[i].likes+"人喜欢</span>";
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
		//请求cur 
		changePage( cur);
		// 生成相应的文章列表  createArticals
		
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
}


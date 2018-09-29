//scoolitem表示要滚动的元素   thediv 表示需要进行滚动元素的父元素
function addScoll(scollitem, thediv, info, onscocllend) {
	var useLeft = info.useLeft == undefined ? false : info.useLeft;
	console.log(useLeft);
	var thewaycolor = info.theWayColor == undefined ? "rgba(255, 255, 255, 0.38)" : info.theWayColor;
	var thesblingcolor = info.theSblingColor == undefined ? "rgba(208, 207, 207, 0.34)" : info.theSblingColor;
	var thehoverwidth = parseInt(info.theHoverWidth == undefined ? "8px" : info.theHoverWidth);
	var thewidth = parseInt(info.thewidth == undefined ? "8px" : info.theWidth);
	var pathway, sblingBlock;
	var grandscollitem = scollitem.parentElement;
	scollitem.style.overflow = "hidden";
	thediv.style.overflow = "hidden";
	//注意存在bug
	scollitem.style.height = "100%";
	scollitem.style.position="relative";
	//设置相关的数据进行
	function addstyle(stylearr, dom) {
		for(var aaa in stylearr) {
			dom.style[aaa] = stylearr[aaa];
		}
		return dom;
	}

	function getStyleNumber(dom, item, what) {
		return window.parseInt(window.getComputedStyle(dom, null)[item]);
	}

	function createneeddom() {
		pathway = document.createElement("div");
		pathway.className = "he";
		pathway.style.opacity = "0";
		pathway.style.transition = "all .4s";
		sblingBlock = document.createElement("div");
		sblingBlock.className = "two";
		sblingBlock.style.transition = "all .4s";
		pathway.appendChild(sblingBlock);
		thediv.appendChild(pathway);
	}

	function changeinfo(xxx) {
		var infoforpathway = {
			"height": "100%",
			"background": thewaycolor,
			"width": "8px",
			"borderRadius": "4px",
			"position": "absolute",
			"top": "0"
		}
		if(xxx == true) {
			infoforpathway.left = "0";
		} else {
			infoforpathway.right = "0";
		}
		addstyle(infoforpathway, pathway);
		var infoforsblingblock = {
			//注意有一像素的补正
			"height": "" + (Math.round((((getStyleNumber(scollitem, "height", null) / parseInt(scollitem.scrollHeight))) * getStyleNumber(pathway, "height", null)) + 1)) + "px",
			"top": "" + Math.round(((parseInt(scollitem.scrollTop) / parseInt(scollitem.scrollHeight)) * getStyleNumber(scollitem, "height", null)) + 1) + "px",
			"width": "8px",
			"position": "absolute",
			//"background": "rgba(208, 207, 207, 0.34)",
			"background": thesblingcolor,
			"borderRadius": "4px",
			"opacity": "1"
		}
		addstyle(infoforsblingblock, sblingBlock);
	}
	createneeddom();
	changeinfo(useLeft);
	addEv();

	function addEv() {
		//监听是否是pc端的事件
		function browserRedirect() {
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsMidp = sUserAgent.match(/midp/i) == "midp";
			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
			var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
			var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
			if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
				return "pn";
			} else {
				return "pc";
			}
		}
		if(browserRedirect() == "pc") {
			addeventForScoll();
		} else {
			thediv.style.overflow = "auto";
			scollitem.style.overflow = "";
			if(onscocllend != undefined) {
				thediv.addEventListener("touchmove", onscocllend);
			}
		}
	}

	function addeventForScoll() {
		//设置鼠标滚轮事件--因为自定义的滚动条的宽度太窄了所以暂时不进行相关的操作
		var moveinfo = 0;
		var clean;
		sblingBlock.ondrag = function(e) {
			e.preventDefault();
		}
		sblingBlock.ondragstart = function(e) {
			e.preventDefault();
		}

		function forOther(e) {
			e = e || window.event;
			window.clearTimeout(clean);
			pathway.style.opacity = "1";
			var number = e.wheelDelta == undefined ? e.detail : e.wheelDelta;
			e.stopPropagation();
			e.preventDefault();
			if(number <= 0) {
				moveinfo += 60;
			} else {
				moveinfo -= 60;
			}
			if(moveinfo <= 0) {
				moveinfo = 0;
			}
			if(moveinfo >= parseInt(scollitem.scrollHeight) - parseInt(getComputedStyle(scollitem).height)) {
				moveinfo = parseInt(scollitem.scrollHeight) - parseInt(getComputedStyle(scollitem).height);
				if(onscocllend != undefined) {
					onscocllend();
				}
			}
			scollitem.scrollTop = moveinfo;
			preindex = parseInt(sblingBlock.style.top);
			changeinfo(useLeft);
			clean = window.setTimeout(function() {
				pathway.style.opacity = "0";
			}, 1000);
		}

		function forFirefox(e) {
			e = e || window.event;
			window.clearTimeout(clean);
			pathway.style.opacity = "1";
			var number = e.wheelDelta == undefined ? e.detail : e.wheelDelta;
			e.stopPropagation();
			e.preventDefault();
			if(number <= 0) {
				moveinfo -= 60;
			} else {
				moveinfo += 60;
			}
			if(moveinfo <= 0) {
				moveinfo = 0;
			}
			if(moveinfo >= parseInt(scollitem.scrollHeight) - parseInt(getComputedStyle(scollitem).height)) {
				moveinfo = parseInt(scollitem.scrollHeight) - parseInt(getComputedStyle(scollitem).height);
				if(onscocllend != undefined) {
					onscocllend();
				}
			}
			scollitem.scrollTop = moveinfo;
			preindex = parseInt(sblingBlock.style.top);
			changeinfo(useLeft);
			clean = window.setTimeout(function() {
				pathway.style.opacity = "0";
			}, 1000);
		}

		function onitemhover() {
			window.clearTimeout(clean);
			pathway.style.width = thehoverwidth + "px";
			pathway.style.borderRadius = thehoverwidth / 2 + "px";
			sblingBlock.style.width = thehoverwidth + "px";
			sblingBlock.style.borderRadius = thehoverwidth / 2 + "px";
			pathway.style.opacity = "1";
		}

		function onitemout() {
			pathway.style.width = thewidth + "px";
			pathway.style.borderRadius = thewidth / 2 + "px";
			sblingBlock.style.width = thewidth + "px";
			sblingBlock.style.borderRadius = thewidth / 2 + "px";
			pathway.style.opacity = "0";
		}

		function onitemdown(e) {
			premouseway = e.pageY;
			pathway.style.transition = "";
			sblingBlock.style.transition = "";
			pathway.onmouseleave = null;
			thediv.onmousemove = function(e) {
				e.preventDefault();
				pathway.style.opacity = "1";
				var nowway = e.pageY;
				var needmove = nowway - premouseway;
				premouseway = nowway;
				var ceshiBottom = parseInt(sblingBlock.style.top) + parseInt(sblingBlock.style.height) + needmove;
				var ceshiTop = parseInt(sblingBlock.style.top) + needmove;
				if(ceshiTop < 0 || ceshiBottom > parseInt(window.getComputedStyle(pathway, null).height)) {
					needmove = 0;
				}
				var needtop = parseInt(sblingBlock.style.top) + needmove;
				sblingBlock.style.top = needtop + "px";
				moveinfo = (needtop / parseInt(window.getComputedStyle(pathway, null).height)) * parseInt(scollitem.scrollHeight);
				if(needtop <= 0) {
					moveinfo = 0;
				}
				if(needtop >= parseInt(window.getComputedStyle(pathway, null).height) - parseInt(getComputedStyle(sblingBlock).height)) {
					moveinfo = parseInt(scollitem.scrollHeight) - parseInt(getComputedStyle(scollitem).height);
				}
				scollitem.scrollTop = moveinfo;
				preindex = parseInt(sblingBlock.style.top);
				//changeinfo(useLeft);
			}
		}

		function onitemup() {
			thediv.onmousemove = null;
			pathway.style.transition = "all .4s";
			sblingBlock.style.transition = "all .4s";
			pathway.style.width = thewidth + "px";
			pathway.style.borderRadius = thewidth / 2 + "px";
			sblingBlock.style.width = thewidth + "px";
			sblingBlock.style.borderRadius = thewidth / 2 + "px";
			clean = window.setTimeout(function() {
				pathway.style.opacity = "0";
			}, 1000);
		}

		function onallleave() {
			thediv.onmousemove = null;
			pathway.style.transition = "all .4s";
			sblingBlock.style.transition = "all .4s";
			pathway.style.width = thewidth + "px";
			pathway.style.borderRadius = thewidth / 2 + "px";
			sblingBlock.style.width = thewidth + "px";
			sblingBlock.style.borderRadius = thewidth / 2 + "px";
			clean = window.setTimeout(function() {
				pathway.style.opacity = "0";
			}, 1000);
		}
		var premouseway = 0;
		pathway.onmouseenter = onitemhover; //鼠标移入轨道事件
		pathway.onmouseleave = onitemout; //鼠标移出轨道事件
		sblingBlock.onmousedown = onitemdown; //滑块点击事件
		thediv.onmouseup = onitemup; //外部鼠标松开事件
		thediv.onmouseleave = onallleave; //鼠标移出区域事件
		scollitem.onmousewheel = forOther;
		scollitem.addEventListener("DOMMouseScroll", forFirefox);
	}
}
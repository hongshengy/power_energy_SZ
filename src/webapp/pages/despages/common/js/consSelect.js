var consSelectMethod = null;//选中客户后调用的方法
var consShowSize = 12;//分页 一页显示的数量
var consSelectAllCons = null;//所有的客户
var consSelectGroupCons = null;//分组客户
var consSelectSearchCons = null;//根据查询条件查询的客户
var consSelectCon = null;//选中的客户
var consSelectURL = null;//查询客户的URL
var consSelectURLhasRoot = null;//是否有根节点（区域服务中心）
var consSelectIsGroup = false;

//js入口
$(function(){
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码
		
		
		//添加选择客户的HTML代码
		var width = (document.body.clientWidth-800)/2;
		var cons_html = '<div id="consSelectWindow" style="position:absolute;left:'+width+'px;background-color:#E7EAE9;">'
			+'<div id="consSelectCenter" style="width:800px;">'
			+'<div id="consSelectCenterTop" style="width:790px;height:80px;background-color:#fff;margin:5px 5px 0px 5px;">'
			+'<label style="color:#3EB3A5;font-weight:bold;position:relative;top:3px;left:3px;">最近访问</label>'
			+'<table style="width:100%;">'
			+'<colgroup><col width="20%"/><col width="20%"/><col width="20%"/><col width="20%"/><col width="20%"/></colgroup>'
			+'<tr><td id="consSelectCenterTop1"></td><td id="consSelectCenterTop2"></td><td id="consSelectCenterTop3"></td><td id="consSelectCenterTop4"></td><td id="consSelectCenterTop5"></td></tr>'
			+'<tr><td id="consSelectCenterTop6"></td><td id="consSelectCenterTop7"></td><td id="consSelectCenterTop8"></td><td id="consSelectCenterTop9"></td><td id="consSelectCenterTop10"></td></tr>'
			+'</table>'
			+'</div>'//consSelectCenterTop
			+'<div id="consSelectCenterBottom" style="width:790px;padding:5px;">'
			+'<div id="consSelectCenterBottomDiv1" style="width:100%;height:36px;line-height:36px;">'
			+'<div id="consSelectCenterBottomDiv11" style="float:left;width:190px;height:100%;background-color:#fff;text-align:center;">'
//			+'<div style="float:left;width:50%;height:100%;font-size:24px;cursor: pointer;">分组</div><div style="float:left;width:50%;height:100%;font-size:24px;line-height:36px;cursor: pointer;">客户</div>'
//			+'<input id="consSelectType" type="button">&nbsp;&nbsp;<font style="color:#3EB3A5;font-weight:bold">客户/分组</font>'
			+'<div style="width:150px;height:32px;margin:2px 20px;border-radius:8px;background-color:#E7EAE9;">'
			+'<div class="consSelectCenterBottomDivGroup active">客户</div><div class="consSelectCenterBottomDivGroup">分组</div>'
			+'</div>'
			+'</div>'//consSelectCenterBottomDiv11
			+'<div id="consSelectCenterBottomDiv12" style="float:left;margin-left:5px;width:595px;height:100%;background-color:#fff;">'
			+'<div>'
			+'<span style="margin-left:5px;">查询：<input id="consSelect_cons" type="text" style="width:155px;"/></span>'
//			+'<span style="margin-left:10px;"><a id="consSelect_cons_btn" href="#" class="easyui-linkbutton c100 shadow">查询</a></span>'
//			+'<span id="consSelect_consKey_pre" style="margin-left:10px;">关键字：</span>'
			+'<span id="consSelect_consKey" style="margin-left:10px;"></span>'
			+'<span id="consSelect_delete" style="position:relative;top:3px;cursor: pointer;display:none;"><img src="'+webContextRoot+'/pages/despages/common/jquery-easyui-1.5.1/themes/icons/edit_remove.png"></span>'
			+'</div>'
			+'</div>'//consSelectCenterBottomDiv12
			+'</div>'//consSelectCenterBottomDiv1
			+'<div id="consSelectCenterBottomDiv2" style="width:100%;background-color:#fff;margin-top:5px;">'
			+'<div id="consSelectCenterBottomDiv21" style="float:left;width:190px;height:330px;background-color:#fff;margin-right:5px;display:none;">'
			//分组
			+'</div>'//consSelectCenterBottomDiv21
			+'<div id="consSelectCenterBottomDiv22" style="float:left;width:790px;height:330px;margin:0px 0px 5px 0px;background-color:#fff;">'
			+'<div id="consSelectCenterBottomDiv22_cons" style="width:790px;height:310px;">'
			//客户
			+'</div>'//consSelectCenterBottomDiv22_cons
			+'<div id="consSelectCenterBottomDiv22_page" style="width:790px;height:20px;align:center;text-align:center;">'
			+'<div style="float:left;">'
			//分页
			+'</div>'
			+'</div>'//consSelectCenterBottomDiv22_page
			+'</div>'//consSelectCenterBottomDiv22
			+'</div>'//consSelectCenterBottomDiv2
			+'</div>'//consSelectCenterBottom
			+'</div>'//consSelectCenter
			+'<div id="consSelectBottom" style="width:790px;height:25px;text-align:right;margin:0px 5px;"></div>'
			+'</div>';//consSelectWindow
		cons_html += '<img id="consSelectShowBtn" style="position:absolute;" src="'+webContextRoot+'/pages/despages/common/images/hide.png"/>';
		//移除左侧树
		var bodyClass = $("body").attr("class");
		if(bodyClass!=null&&bodyClass.indexOf("easyui-layout") != -1){
			$("body").layout('remove','west');
			$("body").append(cons_html);
		}else{
			$("body").prepend(cons_html);
		}
		
		//先隐藏
		$("#consSelectWindow").css("box-shadow","");
		$("#consSelectWindow").css("background-color","");
		$("#consSelectCenter").hide();
		$("#consSelectShowBtn").attr("src",webContextRoot+"/pages/despages/common/images/changeCustomer.png");
		//历史记录  隐藏
		$("#consSelectCenterTop table").hide();
		setConsCss(false);
		//查询客户类型
//		$("#consSelectType").switchbutton({
//			onText:'客户',
//			offText:'分组',
//			onChange:function(checked){
////				console.log(checked);
////				console.log($("#consSelectType").switchbutton('options').checked);
//				if(checked)	{
//					//分组
//					consShowSize = 9;
//					$("#consSelectCenterBottomDiv12").children().hide();
//					consGroup();
//				}else{
//					//客户
//					consShowSize = 12;
//					$("#consSelectCenterBottomDiv12").children().show();
//					consSearch();
//				}
//				setConsCss(checked);
//			}
//		});
//		$("#consSelectType").switchbutton('disable');
		//客户搜索文本框
		$("#consSelect_cons").textbox({
			prompt : '客户名称/客户编号',
			iconWidth:32,
			icons: [{
				iconCls:'icon-search',
				handler: function(e){
					consSearch();
				}
			}]
		});
		//客户搜索文本框  回车事件
		$("#consSelect_cons").textbox('textbox').keydown(function(e){
			if(e.keyCode == 13){
				consSearch();
//				console.log(pinyinUtil.getFirstLetter($("#consSelect_cons").textbox('getValue')));
			}
		});
		//隐藏、显示样式
		$("#consSelectShowBtn").click(function(){
			if(!$("#consSelectCenter").is(":hidden")){//隐藏事件
				$("#consSelectWindow").css("box-shadow","");
				$("#consSelectWindow").css("background-color","");
				$("#consSelectCenter").slideUp();
				$("#consSelectShowBtn").attr("src",webContextRoot+"/pages/despages/common/images/changeCustomer.png");
//				$("#consSelectShowBtn").val("显示");
			}else{//显示事件
				$("#consSelectWindow").css("box-shadow","3px 3px 3px rgba(34,25,25,0.5)");
				$("#consSelectWindow").css("background-color","#E7EAE9");
				$("#consSelectCenter").slideDown();
				$("#consSelectShowBtn").attr("src",webContextRoot+"/pages/despages/common/images/hide.png");
//				$("#consSelectShowBtn").val("隐藏");
			}
		});
		//点击其他地方 隐藏事件
		$(document).on('click',function(e){
			$("#consSelectWindow").css("box-shadow","");
			$("#consSelectWindow").css("background-color","");
			$("#consSelectCenter").slideUp();
			$("#consSelectShowBtn").attr("src",webContextRoot+"/pages/despages/common/images/changeCustomer.png");
		});
		$("#consSelectWindow").on('click',function(e){
			e.stopPropagation();
		});
		$("#consSelectShowBtn").on('click',function(e){
			e.stopPropagation();
		});
		
		//删除关键字 事件
		$("#consSelect_delete").click(function(){
			//输入框为空
			$("#consSelect_cons").textbox("setValue","");
			//图标隐藏
			$("#consSelect_delete").hide();
			//查询
			consSearch();
		});
		
		//隐藏显示 按键 移动
//		$('#consSelectShowBtn').draggable({ 
//			cursor:'pointer',
//			axis:'h'
//		}); 
		
	}
	
});

/**
 * 对客户数组 布局 
 * @param result 
 * @param index 分组 组的下标
 */
function arrangeCons(result,index){
	if(consShowSize == 12){
		var cons = result[0].children;
		var consSize = cons.length;
		var consPages = Math.ceil(consSize/consShowSize);
		//先清空
		$("#consSelectCenterBottomDiv22_cons").html("");
		//循环排版
		if(consPages!=0){
			for(var i = 0; i < (consPages==1?consSize:consShowSize); i++){
				$("#consSelectCenterBottomDiv22_cons").append('<div id="consSelect_'+cons[i].id+'" class="consSelect_cons"><div>'+cons[i].text+'</div><div>('+cons[i].consNo+')<br>'
						+'<font style="color:red">'+cons[i].voltCode+'/'+cons[i].contractCap+'kVA</font></div></div>');
				$("#consSelect_"+cons[i].id+" div:first-child").attr("title",cons[i].text);
				$("#consSelect_"+cons[i].id+" div:last-child").attr("title",cons[i].consNo);
			}	
		}
		//事件
		consDbclick();
		//布局分页
		arrangePages(1,consPages,consSize);
	}else{
		var cons = result[index].children;
		var consSize = cons.length;
		var consPages = Math.ceil(consSize/consShowSize);
		//左边分组布局
		$("#consSelectCenterBottomDiv21").html("");
		for(var i = 0; i < result.length; i++){
			$("#consSelectCenterBottomDiv21").append('<div id="consGroup_'+i+'" class="group"></div>');
			$("#consGroup_"+i).text("("+result[i].children.length+")"+result[i].text);
			$("#consGroup_"+i).attr("title",result[i].text);
			if(i == index) $("#consGroup_"+i).addClass("active");
		}
		//先清空
		$("#consSelectCenterBottomDiv22_cons").html("");
		//右边客户布局
		for(var i = 0; i < (consPages==1?consSize:consShowSize); i++){
//			$("#consSelectCenterBottomDiv22_cons").append('<div id="consSelect_'+cons[i].id+'" class="consSelect_cons">'+cons[i].text+'<br>('+cons[i].consNo+')<br>'+cons[i].voltCode+'/'+cons[i].contractCap+'kVA</div>');
//			$("#consSelectCenterBottomDiv22_cons").append('<div id="consSelect_'+cons[i].id+'" class="consSelect_cons"><div>'+cons[i].text+'</div><div>('+cons[i].consNo+')<br>'+cons[i].voltCode+'/'+cons[i].contractCap+'kVA</div></div>');
			$("#consSelectCenterBottomDiv22_cons").append('<div id="consSelect_'+cons[i].id+'" class="consSelect_cons"><div>'+cons[i].text+'</div><div>('+cons[i].consNo+')<br>'
					+'<font style="color:red">'+cons[i].voltCode+'/'+cons[i].contractCap+'kVA</font></div></div>');
			$("#consSelect_"+cons[i].id+" div:first-child").attr("title",cons[i].text);
			$("#consSelect_"+cons[i].id+" div:last-child").attr("title",cons[i].consNo);
		}	
		//点击分组事件
		$("#consSelectCenterBottomDiv21 .group").click(function(){
			//清空选中样式
			$("#consSelectCenterBottomDiv21 .active").removeClass("active");
			//添加选中样式
			$(this).addClass("active");
			//获取选中分组的下标
			index = $(this).attr("id");
			index = index.substr(10);
			//选中分组的客户、数量、总页数
			cons = result[index].children;
			consSize = cons.length;
			consPages = Math.ceil(consSize/consShowSize);
			
			//先清空
			$("#consSelectCenterBottomDiv22_cons").html("");
			//右边客户布局
			for(var i = 0; i < (consPages==1?consSize:consShowSize); i++){
//				$("#consSelectCenterBottomDiv22_cons").append('<div id="consSelect_'+cons[i].id+'" class="consSelect_cons">'+cons[i].text+'<br>('+cons[i].consNo+')<br>'+cons[i].voltCode+'/'+cons[i].contractCap+'kVA</div>');
//				$("#consSelectCenterBottomDiv22_cons").append('<div id="consSelect_'+cons[i].id+'" class="consSelect_cons"><div>'+cons[i].text+'</div><div>('+cons[i].consNo+')<br>'+cons[i].voltCode+'/'+cons[i].contractCap+'kVA</div></div>');
				$("#consSelectCenterBottomDiv22_cons").append('<div id="consSelect_'+cons[i].id+'" class="consSelect_cons"><div>'+cons[i].text+'</div><div>('+cons[i].consNo+')<br>'
						+'<font style="color:red">'+cons[i].voltCode+'/'+cons[i].contractCap+'kVA</font></div></div>');
				$("#consSelect_"+cons[i].id+" div:first-child").attr("title",cons[i].text);
				$("#consSelect_"+cons[i].id+" div:last-child").attr("title",cons[i].consNo);
			}	
			//点击客户事件
			consDbclick();
			//布局分页
			arrangePages(1,consPages,consSize);
		});
		//点击客户事件
		consDbclick();
		//布局分页
		arrangePages(1,consPages,consSize);
	}
}

/**
 * 设置客户显示样式
 * @param width
 */
function setConsCss(group){
	//判断是否分组
	if(group){
		$("#consSelectCenterBottomDiv21").show();
		$("#consSelectCenterBottomDiv22").css("width","595px");
		var consSelectCenterBottomDiv22_children = $("#consSelectCenterBottomDiv22").children();
		$(consSelectCenterBottomDiv22_children[0]).css("width","595px");
		$(consSelectCenterBottomDiv22_children[1]).css("width","595px");
	}else{
		$("#consSelectCenterBottomDiv21").hide();
		$("#consSelectCenterBottomDiv22").css("width","790px");
		var consSelectCenterBottomDiv22_children = $("#consSelectCenterBottomDiv22").children();
		$(consSelectCenterBottomDiv22_children[0]).css("width","790px");
		$(consSelectCenterBottomDiv22_children[1]).css("width","790px");
	}
	//设置分页样式
	var pages = $("#consSelectCenterBottomDiv22_page").children().children(".page");
	var pagesTotalLength = $("#consSelectCenterBottomDiv22_page").css("width").replace("px","");
	var pagesMarginWidth = (pagesTotalLength-pages.length*30)/2;
	$($("#consSelectCenterBottomDiv22_page").children()[0]).css("margin","0px "+pagesMarginWidth+"px");
}

/**
 * 客户选择窗口加载
 */
function consSelect(url,isRoot,tips){
	consSelectURL = url;
	consSelectURLhasRoot = isRoot;
	//加载客户
	$.ajax({	
		url:consSelectURL,
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			//获取所有客户信息
			consSelectAllCons = deepCopy(result);
			consSelectSearchCons = deepCopy(result);
//			var cons = result[0].children;
			if(isRoot){
				consSelectCon =  result[0];
			}else{
				if(result[0].children.length > 0){
					consSelectCon = result[0].children[0];
				}else{
					$.messager.alert('提示', tips, 'warning');
					return ;
				}
			}
			eval(consSelectMethod);
//			console.log(consSelectCon);
			//历史记录  显示
			$("#consSelectCenterTop table").show();
			//布局
			if(!consSelectIsGroup) arrangeCons(consSelectAllCons);
			//隐藏
//			$("#consSelectCenter").slideUp();
//			$("#consSelectShowBtn").val("显示");
		}
	});
	//加载分组客户
	$.ajax({	
		url:consSelectURL,
		data:{
			'isGroup':1
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			//获取分组客户信息
			consSelectGroupCons = result;
			
//			$("#consSelectType").switchbutton('enable');
			$(".consSelectCenterBottomDivGroup").click(function(){
				//移除样式
				$("#consSelectCenterBottomDiv11 .active").removeClass("active");
				//设置样式
				$(this).addClass("active");
				//判断选择类型
				if($(this).text()=='分组') consSelectIsGroup = true;
				else consSelectIsGroup = false;
				//客户显示
				if(consSelectIsGroup){
					//分组
					consShowSize = 9;
					$("#consSelectCenterBottomDiv12").children().hide();
					consGroup();
				}else{
					//客户
					consShowSize = 12;
					$("#consSelectCenterBottomDiv12").children().show();
					consSearch();
				}
				setConsCss(consSelectIsGroup);
			});
			
		}
	});
	//加载历史记录
	mergeHistoryCons();
	
}

/**
 * 客户双击选中事件
 */
function consDbclick(){
	$(".consSelect_cons").dblclick(function(){
		//客户ID
		consId = $(this).attr("id").substr(11);
		mergeHistoryCons();
		//如需要其他字段根据客户ID，从所有的客户信息里查询
		for(var i in consSelectAllCons[0].children){
			if(consSelectAllCons[0].children[i].id == consId){
				consSelectCon = consSelectAllCons[0].children[i];
				break;
			}
		}
		//选择客户后加载的方法
		if(consSelectMethod!=null){
			eval(consSelectMethod);
		}
		//隐藏
		$("#consSelectWindow").css("box-shadow","");
		$("#consSelectWindow").css("background-color","");
		$("#consSelectCenter").slideUp();
		$("#consSelectShowBtn").attr("src",webContextRoot+"/pages/despages/common/images/changeCustomer.png");
//		$("#consSelectShowBtn").val("显示");
	});
}

/**
 * 布局分页
 * @param currentPage 当前页
 * @param consPages 总页数
 * @param consSize 客户数量
 */
function arrangePages(currentPage,consPages,consSize){
	$("#consSelectCenterBottomDiv22_page").children().html("");
	//分页
	var consPagesHtml = '<div class="page disabled">首页</div>';
	consPagesHtml += '<div class="page">1</div>';
	if(consPages > 7){//分页大于7个  省略号
		if(currentPage < 5){
			consPagesHtml += '<div class="page">2</div>';
			consPagesHtml += '<div class="page">3</div>';
			consPagesHtml += '<div class="page">4</div>';
			consPagesHtml += '<div class="page">5</div>';
			consPagesHtml += '<div class="page disabled">...</div>';
			consPagesHtml += '<div class="page">'+consPages+'</div>';
		}else if(consPages-currentPage<4){
			consPagesHtml += '<div class="page disabled">...</div>';
			consPagesHtml += '<div class="page">'+(consPages-4)+'</div>';
			consPagesHtml += '<div class="page">'+(consPages-3)+'</div>';
			consPagesHtml += '<div class="page">'+(consPages-2)+'</div>';
			consPagesHtml += '<div class="page">'+(consPages-1)+'</div>';
			consPagesHtml += '<div class="page">'+consPages+'</div>';
		}else{
			consPagesHtml += '<div class="page disabled">...</div>';
			consPagesHtml += '<div class="page">'+(currentPage-2)+'</div>';
			consPagesHtml += '<div class="page">'+(currentPage-1)+'</div>';
			consPagesHtml += '<div class="page">'+currentPage+'</div>';
			consPagesHtml += '<div class="page">'+(parseInt(currentPage)+1)+'</div>';
			consPagesHtml += '<div class="page">'+(parseInt(currentPage)+2)+'</div>';
			consPagesHtml += '<div class="page disabled">...</div>';
			consPagesHtml += '<div class="page">'+consPages+'</div>';
		}
	}else{//分页不大于7个  原样显示
		for(var i = 2;i <= consPages; i++){
			consPagesHtml += '<div class="page">'+i+'</div>';
		}
	}
	consPagesHtml += '<div class="page disabled">尾页</div>';
	$("#consSelectCenterBottomDiv22_page").children().append(consPagesHtml);
	//设置分页样式
	var pages = $("#consSelectCenterBottomDiv22_page").children().children(".page");
	var pagesTotalLength = $("#consSelectCenterBottomDiv22_page").css("width").replace("px","");
	var pagesMarginWidth = (pagesTotalLength-pages.length*30)/2;
	$($("#consSelectCenterBottomDiv22_page").children()[0]).css("margin","0px "+pagesMarginWidth+"px");
	//当前页添加样式
	for(var i = 0; i < pages.length; i++){
		if(parseInt($(pages[i]).text())==currentPage){
			$(pages[i]).addClass("active");
		}
	}
	//首页、尾页添加样式
	if(currentPage == 1 && consPages > 1){
		for(var i = 0; i < pages.length; i++){
			if($(pages[i]).text()=='首页'){
				$(pages[i]).addClass("disabled");
			}
			if($(pages[i]).text()=='尾页'){
				$(pages[i]).removeClass("disabled");
			}
		}
	}else if(currentPage == consPages && currentPage > 1){
		for(var i = 0; i < pages.length; i++){
			if($(pages[i]).text()=='首页'){
				$(pages[i]).removeClass("disabled");
			}
			if($(pages[i]).text()=='尾页'){
				$(pages[i]).addClass("disabled");
			}
		}
	}else if(currentPage > 1 && currentPage < consPages){
		for(var i = 0; i < pages.length; i++){
			if($(pages[i]).text()=='首页'){
				$(pages[i]).removeClass("disabled");
			}
			if($(pages[i]).text()=='尾页'){
				$(pages[i]).removeClass("disabled");
			}
		}
	}
	//分页事件
	$("#consSelectCenterBottomDiv22_page .page").click(function(){
//		console.log($(this).attr("class"));
		//判断是否有效的分页
		if($(this).attr("class").length<6){
			//当前页样式
//			$("#consSelectCenterBottomDiv22_page .active").removeClass("active");
//			$(this).addClass("active");
			//调整客户显示
			var currentPage = $(this).text();
			if(currentPage=='首页') currentPage = 1;
			else if(currentPage=='尾页') currentPage = consPages;
			//先清空
			$("#consSelectCenterBottomDiv22_cons").html("");
			//循环排版
			for(var i = 0; i < (currentPage == consPages ? consSize-(currentPage-1)*consShowSize:consShowSize); i++){
					$("#consSelectCenterBottomDiv22_cons").append('<div id="consSelect_'+consSelectSearchCons[0].children[(currentPage-1)*consShowSize+i].id+'" class="consSelect_cons">'
							+'<div>'+consSelectSearchCons[0].children[(currentPage-1)*consShowSize+i].text+'</div><div>('+consSelectSearchCons[0].children[(currentPage-1)*consShowSize+i].consNo+')<br>'
							+'<font style="color:red">'+consSelectSearchCons[0].children[(currentPage-1)*consShowSize+i].voltCode+'/'+consSelectSearchCons[0].children[(currentPage-1)*consShowSize+i].contractCap+'kVA</font></div></div>');
					$("#consSelect_"+consSelectSearchCons[0].children[(currentPage-1)*consShowSize+i].id+" div:first-child").attr("title",consSelectSearchCons[0].children[(currentPage-1)*consShowSize+i].text);
					$("#consSelect_"+consSelectSearchCons[0].children[(currentPage-1)*consShowSize+i].id+" div:last-child").attr("title",consSelectSearchCons[0].children[(currentPage-1)*consShowSize+i].consNo);
			}
			//分页
			arrangePages(currentPage,consPages,consSize);
			//事件
			consDbclick();
		}
	});
}

/**
 * 客户查询事件
 */
function consSearch(){
//	console.log(window.location.href);
//	$.messager.alert('提示', window.location.href, 'warning');
	consSelectSearchCons = deepCopy(consSelectAllCons);
	//获取查询关键字
	var searchKey = $.trim($("#consSelect_cons").textbox('getValue'));
	if(searchKey!=''&&searchKey.length>0){
		//设置关键字
		$("#consSelect_consKey").text("关键字："+searchKey);
		$("#consSelect_delete").show();
		//移除客户
		removeCons(consSelectSearchCons);
	}else{
		//设置关键字
		$("#consSelect_consKey").text(searchKey);
		$("#consSelect_delete").hide();
	}
	
	/**
	 * 移除非关键字的客户
	 */
	function removeCons(cons){
		for(var i = 0; i < cons[0].children.length; i++){
			if(pinyinUtil.getFirstLetter(cons[0].children[i].text).indexOf(pinyinUtil.getFirstLetter(searchKey).toUpperCase())==-1){
				if(cons[0].children[i].consNo.indexOf(searchKey)==-1){
					cons[0].children.splice(i,1);
					removeCons(cons);
				}
			}
		}
		return true;
	}
	//排版布局
	arrangeCons(consSelectSearchCons);
}

/**
 * 客户分组
 */
function consGroup(){
	if(consSelectGroupCons!=null&&consSelectGroupCons.length>0){
		arrangeCons(consSelectGroupCons,0);
		//分组滚动条样式
		if(consSelectGroupCons.length > 7){
			$("#consSelectCenterBottomDiv21").css("overflow-y","scroll");
		}else{
			$("#consSelectCenterBottomDiv21 .group").css("width","180px");
		}
	}else{
		$.messager.alert('提示', '没有客户分组信息', 'warning');
	}
}

/**
 * 更新/查询 历史记录
 * consId 为空 查询
 * consId 有值 更新并查询
 */
function mergeHistoryCons(){
//	console.log(top.userId,consId,funcId);
	
	$.ajax({	
		url:webContextRoot + "destree/mergeHistoryCons.action",
		data:{
			'treeModel.hasRoot' : consSelectURLhasRoot==true?1:0,
			'treeModel.userId' : top.userId,
			'treeModel.consId' : consId,
			'treeModel.funcId' : funcId
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			for(var i = 0; i < result.length; i++){
				$("#consSelectCenterTop"+(parseInt(i)+1)).html("<a href='#' id='consSelectCenterTop_"+result[i].id+"'>"+result[i].text+"</a>");
				$("#consSelectCenterTop"+(parseInt(i)+1)).attr("title",result[i].text);
				$("#consSelectCenterTop"+(parseInt(i)+1)).addClass("active");
			}
			$("#consSelectCenterTop .active").dblclick(function(){
				consId = $($(this).children()[0]).attr("id").substr(20);
				//如需要其他字段根据客户ID，从所有的历史客户信息里查询
				for(var i = 0; i < result.length; i++){
					if(result[i].id == consId){
						consSelectCon = result[i];
						mergeHistoryCons();
						break;
					}
				}
//				for(var i in consSelectAllCons[0].children){
//					if(consSelectAllCons[0].children[i].id == consId){
//						consSelectCon = consSelectAllCons[0].children[i];
//						break;
//					}
//				}
				//选择客户后加载的方法
				if(consSelectMethod!=null){
					eval(consSelectMethod);
				}
				//隐藏
				$("#consSelectWindow").css("box-shadow","");
				$("#consSelectWindow").css("background-color","");
				$("#consSelectCenter").slideUp();
				$("#consSelectShowBtn").attr("src",webContextRoot+"/pages/despages/common/images/changeCustomer.png");
//				$("#consSelectShowBtn").val("显示");
			});
		}
	});
}



/**
 * 深度拷贝
 */
function deepCopy(obj){
	var result = isClass(obj)=='Array'?[] : {};
	for(key in obj){
		var copy = obj[key];
		if(isClass(copy)=='Object'){
			result[key] = arguments.callee(copy);
		}else if(isClass(copy)=='Array'){
			result[key] = arguments.callee(copy);
		}else{
			result[key] = obj[key];
		}
	}
	return result;
}

/**
 * 判断对象类型
 * @param o
 * @returns
 */
function isClass(o){
	if(o === null) return 'Null';
	if(o === undefined) return 'Undefined';
	return Object.prototype.toString.call(o).slice(8,-1);
}
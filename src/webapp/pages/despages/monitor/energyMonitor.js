/**
 * <p>
 * Title: 能效图
 * </p>
 * <p>
 * Description: 能效图
 * </p>
 * <p>
 * Copyright: Copyright (c) 2016
 * </p>
 * <p>
 * Company: 江苏方天电力技术有限公司
 * </p>
 * ============================================================ 功能描述：能效图
 * ============================================================ 更新时间：2017.05.18
 * 更新人：陶萍 更新内容：新建 ============================================================
 */
var isFirst = true;
var consSelectHasRoot = false;//是否有区域能源根节点
var consSelectAllCons = null;//所有的客户
//var consSelectAllOrg = null;//所有的区域中心
var consSelectHistoryCons = null;//历史记录里的客户
var consSelectCon = null;//选中的客户
var consSelectCons = [];
var cons_datagrid_list = [];//easyui-datagrid 显示的列表
var consSelectMethod = null;//选中客户后调用的方法
var consSelectKey = '';//搜索关键字
var consSelectMultiselect = false;//定义是否多选
var consSelectHistoryCons = null;//历史记录里的客户
var consList_all_flag = true;//第一次
$(function() {
	if(consNamePage==null || consNamePage==''|| consNamePage=="null"){
		$('#divDHSmall').removeClass('visible');
	}else{
		$('#divDHFull').addClass('visible');
		$('#divDHSmall').addClass('visible');
	}
	
	$(document).scroll(function() {
		$("#divDHFull").css("top", $(document).scrollTop());
		$("#divDHSmall").css("top", $(document).scrollTop());
	});
	// 5秒刷新SVG实时数据
	setInterval(bindSvgSet, 5000);
	
	var browser=navigator.appName;
	var bversion=navigator.appVersion;
	var version=bversion.split(";");
	var trimVersion=version[1];//.replace(/[]/g,"");
	if(browser=="Microsoft Internet Explorer"&&trimVersion==" MSIE 8.0"){
		$.messager.alert('提示', '不支持IE8浏览器', 'warning');
		return ;
	}
	/*----------------------左侧导航功能begin--------------------*/
	if(consNamePage==null || consNamePage==''|| consNamePage=="null"){
//	$('#treeleftQyTree').tree({
//		// modeType=13，过滤含有一次图的客户
//		url:webContextRoot +'destree/queryTree.action?modeType=13',//查询树及诶单
//		method : 'get',
//		multiple : true,// 是否支持多选
//		onBeforeLoad : function(node) {// 请求之前
//
//		},
//		onClick : function(node) {
//			//全局变量清空
//			svgList = [];
//			mpRef = [];
//			mpidByOracle="";
//			devIdByOracle="";
//			svgId = "";
//			//svg名称切换控件为空
////			$("#divSvgSelect").html("");
//			//导航树展开隐藏
//			$('#divDHFull').addClass('visible');
//			treeNodeType = node.type;
//			if (treeNodeType == '0') {// 区域能源节点
//				$.messager.alert('提示', '请选择用能客户', 'warning');
//			}
//			if (treeNodeType == '1') {// 企业节点
//				consId = node.id;
//				consName = node.text;
////				userTranId = 0;
//				svgType=1;
//				$('#divWaiting').window('open'); 
//				getSfgSubs();
//			}
//		},
//		onLoadSuccess : function(node) {
////			$("#divSvgSelect").html("");
//			svgId = "";
//			if (consId == 0) {
//				if ($('#treeleftQyTree').tree('getRoots').length > 0
//						&& $('#treeleftQyTree').tree('getRoots')[0].children.length > 0) {
//					//设置企业编号
//					consId = $('#treeleftQyTree').tree('getRoots')[0].children[0].id;
//					//设置企业名称
//					consName = $('#treeleftQyTree').tree('getRoots')[0].children[0].text;
//					//初始化用户变编号为0
//					userTranId = 0;
//					//默认第一个树节点选中
//					$("#_easyui_tree_2").addClass("tree-node-selected");
//				}
//			}
//			svgType=1;
//			$('#divWaiting').window('open'); 
//			getSfgSubs();
//		}
//	});
		var fileName = location.href;
		fileName.substr(0,fileName.lastIndexOf("/")).lastIndexOf("/");
		funcId = fileName.substr(fileName.substr(0,fileName.lastIndexOf("/")).lastIndexOf("/")+1);
		funcId = funcId.substr(0,funcId.indexOf("?")).replace("/","_");
		$('#treeleftQyTree').panel({
			 collapsible:false,
			 content:'<div id="cons_history" style="width:100%;height:181px;"><div style="width:100%;height:25px;background-color:rgb(17,164,161);color:#fff;line-height:24px;">'
				 +'<div style="width:207px;height:25px;margin:0 10px;"><img style="position:relative;top:4px;" src="'+webContextRoot+'pages/despages/common/images/quickSearch_file.png"/>&nbsp;最近访问</div></div><div id="cons_history_cons" style="width:100%;height:155px;background-color:rgb(242,242,242);"></div></div>'
				 +'<div id="cons_quickSearch" style="position: absolute;top:210px;width:100%;height:60px;cursor:pointer;"><img src="'+webContextRoot+'pages/despages/common/images/quickSearch_large.png"/></div>'
				 +'<div id="cons_datagrid_div" style="position: absolute;top:270px;bottom:0px;width:100%;"><div id="cons_datagrid"></div></div>'
		 });
		 $("#cons_datagrid").datagrid({
//			 nowrap:true,
			 fit:true,
			 fitColumns:true,
			 striped: true,
			 singleSelect: !consSelectMultiselect,
			 onSelect:function(rowIndex, rowData){
				 if(!consSelectMultiselect){//单选
					 //取消最近访问的样式
					 $("#cons_history_cons .active").removeClass("active");
					 consSelectCon = rowData;
				 }else{//多选
//					 consSelectCons.push(rowData);
					 if(!consSelectMultiselectValidate(rowData,"+")){
						 $("#cons_datagrid").datagrid("unselectRow",rowIndex);
					 }
//					 var Selections = $("#cons_datagrid").datagrid("getSelections");
//					 console.log(Selections);
				 }
				 //选择客户后加载的方法
				 if(consSelectMethod!=null){
					 eval(consSelectMethod);
					 //更新最近访问
					 updateLatelyCons(rowData.id);
				 }
			 },
			 onUnselect:function(rowIndex, rowData){
				 if(consSelectMultiselect){
//					 for(var i = 0; i < consSelectCons.length; i++){
//						 if(consSelectCons[i].id == rowData.id){
//							 consSelectCons.splice(i,1);
//							 break;
//						 } 
//					 }
					 //选择客户后加载的方法
					 if(consSelectMethod!=null){
						 if(!consSelectMultiselectValidate(rowData,"-")){
							 $("#cons_datagrid").datagrid("selectRow",rowIndex);
						 }
						 eval(consSelectMethod);
					 }
				 }
			 },
			 onLoadSuccess:function(data){
				 if(data.total > 0){
					 if(consSelectMultiselect){
						//取消最近访问的样式
						$("#cons_history_cons .active").removeClass("active");
						consSelectCons = [];
					 }
					 $("#cons_datagrid").datagrid("selectRow",0);
				 }
			 },
			 columns:[[
					    {field:'id',title:'id',hidden:true,width:50,align:'center'},
					    {field:'consNo',title:'户号',hidden:true,width:200,align:'center',
					    	formatter: function(value,row,index){
								return '<div title="'+value+'">'+value+'</div>';
							}
					    },
					    {field:'text',title:'客户',width:200,align:'center',
					    	formatter: function(value,row,index){
					    		return '<div class="cons_datagrid_cons" title="'+value+'">'+value+'</div>';
							}
					    },
					]]
		 });
		 
		 //快搜窗口
		 var cons_html = '<div id="cons_quickSearch_window1" style="z-index:100;position:absolute;top:60px;bottom:60px;left:240px;right:240px;display:none;background-color:rgb(240,243,248)">'
			 //窗口取消按钮
			 +'<div style="position:absolute;top:16px;right:16px;cursor: pointer;" onclick="cons_quickSearch_window1_cancel();"><img style="width:24px;height:24px;" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/clear.png"/></div>'
			 //快搜Logo
			 +'<div id="cons_quickSearch_window1_logo" style="position:absolute;top:60px;width:100%;height:60px;align:center;"><div style="width:220px;height:60px;margin:0 auto;"><img src="'+webContextRoot+'pages/despages/common/images/quickSearch_large.png"/></div></div>'
			 //快搜搜索文本框
			 +'<div style="position:absolute;top:140px;left:100px;right:160px;height:30px;"><input id="cons_quickSearch_window1_input" maxlength="32" type="text" style="width:100%;height:100%" onkeyup="ValidateValue(this)"></div>'
			 //快搜历史记录
			 +'<div id="cons_quickSearch_window1_history" style="position:absolute;top:176px;left:100px;right:156px;height:100px;display:none;background-color:#fff;box-shadow:3px 3px 3px rgba(34,25,25,0.5);border-style:solid;border-width:1px;border-color:#000;">'
			 //快搜历史记录 取消按钮
			 +'<div class="history_cancel"  style="position:absolute;top:10px;right:10px;cursor: pointer;"><img style="width:16px;height:16px;" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/clear.png"/></div>'
			 +'<label style="position:absolute;top:10px;left:22px;font-weight: bold">最近搜索内容</label>'
			 +'<div style="position:absolute;top:30px;left:20px;right:20px;"><table>'
			 +'<tr><td></td><td></td><td></td><td></td></tr>'
			 +'<tr><td></td><td></td><td></td><td></td></tr>'
			 +'</table></div>'
			 +'</div>'
			 //快搜搜索按键
			 +'<div style="position:absolute;top:139px;right:96px;height:30px;width:60px;"><img src="'+webContextRoot+'pages/despages/common/images/tk-12.png" onclick="cons_quickSearch_window_search();" style="cursor: pointer;"/></div>'
			 //信息
			 +'<div style="position:absolute;bottom:40px;width:100%;text-align:center;color:rgb(165,165,165);line-height:24px;">客户信息搜索引擎<br/>国网江苏省电力公司版权 Copyright 2013-2017<br/>江苏方天电力技术有限公司技术支持</div>'
			 +'</div>';
		 
		 //快搜窗口1
		 $("body").append(cons_html);
		 
		 cons_html ='<div id="cons_quickSearch_window2" style="z-index:100;position:absolute;top:60px;bottom:60px;left:240px;right:240px;display:none;background-color:rgb(240,243,248)">'
				//窗口取消按钮
				 +'<div style="position:absolute;top:16px;right:16px;cursor: pointer;" onclick="cons_quickSearch_window2_cancel();"><img style="width:24px;height:24px;" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/clear.png"/></div>'
				 //快搜Logo
				 +'<div style="position:absolute;top:40px;left:10px;"><img src="'+webContextRoot+'pages/despages/common/images/quickSearch_little.png"/></div>'
				 //快搜搜索文本框
				 +'<div style="position:absolute;top:40px;left:110px;right:160px;height:30px;"><input id="cons_quickSearch_window2_input" maxlength="32" type="text" style="width:100%;height:100%" onkeyup="ValidateValue(this)"></div>'
				 //快搜历史记录
				 +'<div id="cons_quickSearch_window2_history" style="position:absolute;top:76px;left:110px;right:156px;height:100px;display:none;background-color:#fff;box-shadow:3px 3px 3px rgba(34,25,25,0.5);border-style:solid;border-width:1px;border-color:#000;z-index:101;">'
				 //快搜历史记录 取消按钮
				 +'<div class="history_cancel"  style="position:absolute;top:10px;right:10px;cursor: pointer;"><img style="width:16px;height:16px;" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/clear.png"/></div>'
				 +'<label style="position:absolute;top:10px;left:22px;font-weight: bold">最近搜索内容</label>'
				 +'<div style="position:absolute;top:30px;left:20px;right:20px;"><table>'
				 +'<tr><td></td><td></td><td></td><td></td></tr>'
				 +'<tr><td></td><td></td><td></td><td></td></tr>'
				 +'</table></div>'
				 +'</div>'
				 //快搜搜索按键
				 +'<div style="position:absolute;top:39px;right:96px;height:30px;width:60px;"><img src="'+webContextRoot+'pages/despages/common/images/tk-12.png" onclick="cons_quickSearch_window_search();" style="cursor: pointer;"/></div>';
				
				//全选 分页 确定
				cons_html += '<div id="cons_quickSearch_window2_bottom" style="position:absolute;bottom:10px;height:20px;width:100%;">'
					+'<input id="consList_all" type="checkbox"/>'
					+'<label>全选</label>'
					+'<div id="cons_quickSearch_window2_bottom_pages" style="align:center;margin:0 auto;height:100%;width:330px;"></div>'
					+'<div style="position:absolute;bottom:-1px;right:20px;"><img src="'+webContextRoot+'pages/despages/common/images/tk-13.png"/></div>'
					+'</div>';
				
				//搜索结果
				cons_html +='<div id="cons_quickSearch_window2_search_result" style="position:absolute;top:82px;height:30px;left:10px;right:10px;line-height:30px;font-size:18px;border-color:rgb(153,153,153);white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">'
					+'您搜索的关键字为“<font id="cons_quickSearch_window2_key" color="red"></font>”,共为您搜索到<font id="cons_quickSearch_window2_count"></font>个结果</div>';
				//客户列表
				cons_html +='<div id="consListShow" style="position:absolute;top:120px;bottom:40px;left:10px;right:10px;border-style:solid;border-width:1px;border-color:rgb(153,153,153);overflow-y:scroll;overflow-x:hidden;">'
					+'</div>';
				
		 //快搜窗口2
		 $("body").append(cons_html);		
		 //页面遮盖层
		 $("body").append('<div id="cons_quickSearch_cover" style="z-index:99;position:absolute;top:0px;bottom:0px;left:0px;right:0px;display:none;background-color:#000;opacity:0.5;"></div>');
		 //窗口遮盖层
		 var window_cover_html = '<div id="cons_quickSearch_window_cover" style="display:none;z-index:101;position:absolute;top:60px;bottom:60px;left:240px;right:240px;opacity:0.5;background: #e6e6e6;border: 1px solid #ddd;-moz-border-radius:5px 5px 5px 5px;-webkit-border-radius: 5px 5px 5px 5px;border-radius: 5px 5px 5px 5px;">'
			 +'<div style="position:absolute;top:50%;left:50%;width:310px;height:32px;">'
			 +'<div style="position:relative;top:-16px;left:-155px;width:310px;height:32px;font-size:28px;line-height:32px;vertical-align:middle;"><img src="'+webContextRoot+'pages/despages/common/lightbox/dist/images/loading.gif"/>'
			 +'<label style="position:relative;top:-4px;">正在加载，请稍候……</label></div></div>'
			 +'</div>';
		 $("body").append(window_cover_html);
		 
		 //快搜搜索框焦点事件
		 $("#cons_quickSearch_window1_input").focus(function(){
			 $("#cons_quickSearch_window1_history").show();
		 });
		 $("#cons_quickSearch_window2_input").focus(function(){
			 $("#cons_quickSearch_window2_history").show();
		 });
		 //快搜搜索框  回车事件
		 $("#cons_quickSearch_window1_input").keydown(function(e){
			 if(e.keyCode == 13){
				 cons_quickSearch_window_search();
			 }
		 });
		 $("#cons_quickSearch_window2_input").keydown(function(e){
			 if(e.keyCode == 13){
				 cons_quickSearch_window_search();
			 }
		 });
		 //历史记录取消事件
		 $(".history_cancel").click(function(){
			 $(this).parent().hide();
		 });
		 
		 //页面的搜索事件
		 $("#cons_quickSearch").click(function(){
			 $("#cons_quickSearch_window1_input").val("");
			 $("#cons_quickSearch_window1_history").hide();
			 //搜索窗口显示
			 $("#cons_quickSearch_window1").show();
			 //页面遮盖层显示
			 $("#cons_quickSearch_cover").show();
			 
			 cons_datagrid_list = [];
//			 for(var i = 0; i < consSelectAllOrg.length; i++){
//				cons_datagrid_list.push({
//					'id':consSelectAllOrg[i].id,
//					'consNo':consSelectAllOrg[i].id,
//					'text':consSelectAllOrg[i].text
//				});
//			}
		 });
		 
		//历史记录 点击事件
		$("#cons_quickSearch_window1_history table td").click(function(){
			if($(this).attr("class").indexOf("active") != -1){
				$("#cons_quickSearch_window1_input").val($(this).text());
			}
		});
		$("#cons_quickSearch_window2_history table td").click(function(){
			if($(this).attr("class").indexOf("active") != -1){
				$("#cons_quickSearch_window2_input").val($(this).text());
			}
		});
		//历史记录 双击事件
		$("#cons_quickSearch_window1_history table td").dblclick(function(){
			if($(this).attr("class").indexOf("active") != -1){
				cons_quickSearch_window_search();
			}
		});
		$("#cons_quickSearch_window2_history table td").dblclick(function(){
			if($(this).attr("class").indexOf("active") != -1){
				cons_quickSearch_window_search();
			}
		});
		consSelectMethod = "consSelectMethodLoad()";
		consSelectHasRoot = false;
		consSelectSearch("",true);
		$($("#cons_quickSearch_window1_history").next()[0]).css("right","100px");
		$($("#cons_quickSearch_window2_history").next()[0]).css("right","100px");
		$($("#cons_quickSearch_window1_logo").next()[0]).css("height","36px");
		$($("#cons_quickSearch_window1_input").parent()).css("height","36px");
	}else{			
		$("#divSvgSelect").html("");
		svgId = "";
		//根据企业编号获取第一个用户变编号
		svgType=1;
		$('#divWaiting').window('open'); 
		getSfgSubs();
	}
	//全局变量清空
//	svgList = [];
//	mpRef = [];
//	mpidByOracle="";
//	devIdByOracle="";
//	svgId = "";
	
//	svgType=1;
//	$('#divWaiting').window('open'); 
//	getSfgSubs();

	$(window).resize(function() {		
		//SVG图自适应
		SetSVGViewBox();
	});
});

/***
 * 导航查询
 */
//$('#consSelect').combobox({
//	// modeType=13，过滤含有一次图的客户
//	url : webContextRoot + 'destree/queryTree.action?modeType=13&isQyCode=false&ziMu=',
//	valueField : 'id',
//	textField : 'text',
//	onChange : function(newValue, oldValue) {
//		if (isNaN(newValue)) {
//			newValue = $('#consSelect').combobox('getText');
//			// modeType=13，过滤含有一次图的客户
//			$.getJSON(webContextRoot+ 'destree/queryTree.action?modeType=13&isQyCode=false&ziMu='+ newValue, {},
//					function(json) {$('#consSelect').combobox('loadData',json);});
//		}else{
//			newValue = $('#consSelect').combobox('getText');
//			// modeType=13，过滤含有一次图的客户
//			$.getJSON(webContextRoot+ 'destree/queryTree.action?modeType=13&isQyCode=false&ziMu=',{}, function(json) {
//				$('#consSelect').combobox('loadData',json);});
//		}
//	},
//	onLoadSuccess : function(node) {
//		$("a").removeClass("combo-arrow");
//	}
//});
/***
 * 导航查询，按enter键，树节点选中
 */
//$(document).keyup(function(event){
//	var consSelectText=$('#consSelect').combobox('getText');
//	var treeleftroot=$('#treeleftQyTree').tree('getRoots');
//	if(event.keyCode==13 && consSelectText!=""){
//		if (treeleftroot.length > 0
//				&& treeleftroot[0].children.length > 0) {
//			var isExistroot=0;
//			for(var i=0,len=treeleftroot[0].children.length;i<len;i++){
//				if(treeleftroot[0].children[i].text==consSelectText){
//					$("#"+treeleftroot[0].children[i].domId).addClass("tree-node-selected");
//					isExistroot=1;
//				}
//			}
//			if(isExistroot==1){
//				for(var i=0,len=treeleftroot[0].children.length;i<len;i++){
//					if(treeleftroot[0].children[i].text!=consSelectText){
//						$("#"+treeleftroot[0].children[i].domId).removeClass("tree-node-selected");
//					}
//				}
//			}
//		}
//	}
//});
function consSelectMethodLoad(){
//	console.log(consSelectAllCons,consSelectCon);
	
	if(consSelectCon.id.length < 4){	// 区域能源节点
		$("#clickTree").hide();
		$("#contentId").show();
		content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/projectManage/tranOverview.jsp?orgNo='+consSelectCon.id+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
		$("#contentId").empty();
		$('#contentId').append(content);
	}else{		// 企业节点
		$("#contentId").hide();
		$("#clickTree").show();
		consId = consSelectCon.id;				// 把树节点id赋给企业id
		consName = consSelectCon.text;			// 把树节点的值赋给企业名称
		//全局变量清空
		svgList = [];
		mpRef = [];
		mpidByOracle="";
		devIdByOracle="";
		svgId = "";
		$('#divDHFull').addClass('visible');
		svgType=1;
		$('#divWaiting').window('open'); 
		getSfgSubs();
	}
}
/*******************************************************************************
 * 开关动画切换
 * 
 * @param svgId
 * @param dataValue
 * @param xy
 * @param oneOrTwo
 */
function IniFunc(svgId, dataValue, xy, oneOrTwo) {
	for (var i = 0, len = svgId.length; i < len; i++) {
		(function() {
			var myData = parseInt(dataValue[i]);
			var myId = svgId[i];
			$("#rec_" + myId).bind("click", function() {
				Open_Close($('#' + myId), xy, oneOrTwo, myData);
			});
		})();
	}
}
/*******************************************************************************
 * 开关动画
 * 
 * @param obj
 * @param isY
 * @param num
 * @param oldValue
 */
function Open_Close(obj, isY, num, oldValue) {
	/*
	 * if (typeof ($(obj).attr("close")) == "undefined" || $(obj).attr("close") ==
	 * "false") { $(obj).attr("close", "true"); if (num == 1) { $(obj).attr(isY +
	 * "1", $(obj).attr(isY + "2")); } else { $(obj).attr(isY + "2",
	 * $(obj).attr(isY + "1")); } } else { $(obj).attr("close", "false");
	 * $(obj).attr(isY + num, oldValue); }
	 */
}
/*******************************************************************************
 * 当前显示开关状态
 * 
 * @param obj
 * @param isY
 * @param num
 * @param oldValue
 * @param isClose,1:true,0:flase
 */
function Open_Close_current(obj, isY, num, oldValue, isClose) {
	if (!isClose) {
		$(obj).attr("close", "false");
		$(obj).attr(isY + num, oldValue);
	} else {
		$(obj).attr("close", "true");
		if (num == 1) {
			$(obj).attr(isY + "1", $(obj).attr(isY + "2"));
		} else {
			$(obj).attr(isY + "2", $(obj).attr(isY + "1"));
		}
	}
}
/***
 * 选中SVG编号
 */
var selectSvgId="";
/*******************************************************************************
 * 获取一次接线图配置
 */
function getSvg() {
	$.ajax({
		type : "post",
		url : webContextRoot + 'energySvgMonitor/querySutEnergy.action',
		dataType : "json",
		data : {
//			'userTranId' : userTranId
			'userTranId' : consId
		},
		success : function(data) {
			/***
			 * 第一次加载SVG列表显示
			 */
			if(svgId==""&&data.length>1){
				var divCircle="";
				var liCircleId=[];
				var liCircleName=[];
				for (var i = 0, len = data.length; i < len; i++) {	
					/***
					 * 初始化加载默认显示第一个SVG
					 */
					if(i==0){
						selectSvgId=data[i].svgId;
					}
					/***
					 * 显示SVG列表名称
					 */					
					if(i==0){
						divCircle+="<div class='circle circleSelect' id='li"+ data[i].svgId+"' onclick='selectSvg("+ data[i].svgId+ ")'></div>";
					}else{
						divCircle+="<div class='circle circleNormal' id='li"+ data[i].svgId+"' onclick='selectSvg("+ data[i].svgId+ ")'></div>";
					}
					liCircleId[liCircleId.length]="li"+ data[i].svgId;
					liCircleName[liCircleName.length]= data[i].svgName;
				}
				$("#divCircle").html(divCircle);
				
				for(var i=0,len=liCircleId.length;i<len;i++){
					showCircleTip(liCircleId[i],liCircleName[i]);
				}
				

				/***
				 * 默认第一个SVG选项被选中，SVG图默认显示第一个
				 */
				var arr=$("#ulSvgNameSelect").find("div");
				/***
				 * 遍历所有SVG名称，第一个默认选中
				 */
				$.each(arr, function(index, domEle) {	
					if(index==0){
						/***
						 * 第一个SVG名称默认选中样式
						 */
						$("#"+domEle.id).addClass("btnSelect");
						$("#"+domEle.id).removeClass("btnNormal");
					}	
				});
			}
			
			if (data.length > 0) {
				/***
				 * 初始化时，默认显示第一个SVG图
				 */
				if(selectSvgId==""){
					selectSvgId=data[0].svgId;
				}
				/***
				 * 初始化加载第一个SVG内容
				 */
				if (data[0].svg.trim() == ""&&svgId=="") {
					/***
					 * 没有SVG图，显示尚未配置监控信息
					 */
					setNoSvg();
					/***
					 * SVG编号赋空值
					 */
					selectSvgId="";
					/***
					 * 等待框关闭
					 */
					$('#divWaiting').window('close'); 
				} else {
					if (svgId == "") {
						/***
						 * 初始化显示第一个SVG
						 */
						document.getElementById('liSVG').innerHTML = data[0].svg;						
					} else {
						/***
						 * 切换显示对应选中的SVG图
						 */
						for (var i = 0, len = data.length; i < len; i++) {
							if (data[i].svgId == svgId) {
								document.getElementById('liSVG').innerHTML = data[i].svg;
							}
						}				
					}
					if(document.getElementById('liSVG').innerHTML==""){
						/***
						 * 没有SVG图，显示尚未配置监控信息
						 */
						setNoSvg();
						/***
						 * 关闭等待框
						 */
						$('#divWaiting').window('close'); 
					}else{
//						/***
//						 * svg_Main高度
//						 */
//						ht = $("#svg_Main").attr("height");
//						/***
//						 * svg_Main宽度
//						 */
//						wd = $("#svg_Main").attr("width");
//						/***
//						 * svg_Main自适应高度、宽度
//						 */
//						document.getElementById("svg_Main").setAttribute("viewBox","0 0 "+ (wd-350)+" " + ht);
						SetSVGViewBox();
						
						/***
						 * 初始化页面提示信息为空
						 */
						document.getElementById('divNoEnergyMessage').innerHTML = "";
						
						/***
						 * 绑定SVG数据库配置信息
						 */
						bindOracleSusSVG();								
						/***
						 * SVG图拖动
						 */
						$("#liSVG").pep();						
					}						
				}
			} else {
				/***
				 * 没有SVG图，显示尚未配置监控信息
				 */
				setNoSvg();
				/***
				 * 关闭等待框
				 */
				$('#divWaiting').window('close'); 
			}
		}
	});
}
/*******************************************************************************
 * 提示信息
 * 
 * @param svgId
 * @param conts
 */
function showTip(svgId,conts) {	
	//判断是否是谷歌浏览器
	var isChrome=navigator.userAgent.toLowerCase().match(/chrome/)!=null;
	if(isChrome){
//		$("#" + svgId).webuiPopover('destroy').webuiPopover({
//			cache : false,
//			trigger : "hover",
//			content : "<div style='font-size: 12px;'>"+conts+"</div>",
//			placement : "auto-top",
//			animation : "pop"
//		});
		$("#" + svgId).webuiPopover('destroy').webuiPopover({
			cache : false,
			content : "<div style='font-size: 12px;white-space:nowrap;'>"+conts+"</div>",
			placement:'top-left',
			trigger:'hover',
			animation : "pop"
		});
	}else{
		$('#' + svgId).tooltip({
			position : 'top',
			content : "<div class='lt' style='font-size: 12px;'>"+conts+"</div>"//,
		});
	}
}
function showCircleTip(svgId,conts){
	$("#" + svgId).webuiPopover('destroy').webuiPopover({
		cache : false,
		trigger : "hover",
		content : conts,
		width:200,
		placement : "auto-top",
		animation : "pop"
	});
}
/*******************************************************************************
 * 读取数据库SVG配置信息
 */
var mpidByOracle = "";
var devIdByOracle = "";
var svgList = [];
var mpRef = [];
var svgId = "";
var svgNameItem = "";
var errorTime=3;
function bindOracleSusSVG() {
	svgList = [];
	mpRef = [];
	mpidByOracle="";
	devIdByOracle="";	
	$.ajax({
				type : "post",
				url : webContextRoot + 'energySvgMonitor/queryOracleSusEnergy.action',
				dataType : "json",
				data : {
					'svgId':selectSvgId
				},
				complete:function(XMLHttpRequest,textStatus){
					$('#divWaiting').window('close'); 
				},
				success : function(data) {
					selectSvgId="";
					svgList = data;
					var divIds = "";
					// if(data.length>0){
					// mpidByOracle=data[0].sfMpId;
					// devIdByOracle=data[0].deviceId;
					// }
					// svg编号
					var svgArr = [];
					// 数值
					var dataValueArr = [];
					// 横向或纵向显示开关
					var xyArr = [];
					// 显示开关位置
					var oneOrTwoArr = [];
					// 点击事件弹出详细：devClick显示状态值，yx_click和yc_click显示dataValue
					var runStatusOrValue = "";
					// 提示显示状态，或者显示值
					var runStatusOrValueType = "";
					// 判断是否无信号，当前时间与采集时间，相差3分钟以上为无信号
					// var date = new Date();
					// var currentdate = date.getFullYear() + "-"+
					// (date.getMonth() + 1) + "-" + date.getDate()
					// + " " + date.getHours() + ":" + date.getMinutes()+ ":" +
					// date.getSeconds();
					var millDiff = 0;
					tips = "";
					collTime = "";
					workStatus = "";					

					var svgSetObj = [];// data[i].susSVGList;

					for (var i = 0, len = data.length; i < len; i++) {
						if(i==len-1){
							if(data[i].errorTime!=null&&data[i].errorTime!=""){
								errorTime=data[i].errorTime;
							}
						}
						if (svgId == "") {
							svgSetObj = data[0].susSVGList;
						} else {
							if (svgId == data[i].svgId) {
								svgSetObj = data[i].susSVGList;
							}
						}
						for (var j = 0, length = svgSetObj.length; j < length; j++) {
							if (svgSetObj[j].sfMpId != null&& svgSetObj[j].sfMpId.length > 0) {
								mpidByOracle += (mpidByOracle.length > 0 ? ",": "")+ svgSetObj[j].sfMpId;
								
								if (typeof (mpRef[svgSetObj[j].sfMpId]) == "undefined") {
									mpRef[svgSetObj[j].sfMpId] = [];
									mpRef[svgSetObj[j].sfMpId][0] = svgSetObj[j];
								} else {
									mpRef[svgSetObj[j].sfMpId][mpRef[svgSetObj[j].sfMpId].length] = svgSetObj[j];
								}
							}
							if (svgSetObj[j].deviceId != null&& svgSetObj[j].deviceId.length > 0) {
								devIdByOracle += (devIdByOracle.length > 0 ? ",": "")+ svgSetObj[j].deviceId;
							}
							if(svgSetObj[j].isSwitch == "1")
							{
								if (svgSetObj[j].openobjId != "") {
									$("#" + svgSetObj[j].openobjId).attr("display","none");
								}
								if (svgSetObj[j].stopObjId != "") {
									$("#" + svgSetObj[j].stopObjId).attr("display",
											"none");
								}
								if (svgSetObj[j].noSingleId != "") {
									$("#" + svgSetObj[j].noSingleId).attr(
											"display", "none");
								}
	
								if (svgSetObj[j].origPosition!= ""&&svgSetObj[j].openType.trim()=="2") {
									svgArr[svgArr.length] = svgSetObj[j].objId;
									dataValueArr[dataValueArr.length] = svgSetObj[j].origPosition;
									xyArr[xyArr.length] = svgSetObj[j].dirct;
									oneOrTwoArr[oneOrTwoArr.length] = svgSetObj[j].oneOrTwo;
								}
							}
								// 投运
								if (svgSetObj[j].runStatus == "1") {
									if (svgSetObj[j].stopObjId != "") {
										$("#" + svgSetObj[j].stopObjId).attr("display", "none");
									}
								}
	
								if (svgSetObj[j].runStatus == "2") {
									if (svgSetObj[j].stopObjId != "") {
										$("#" + svgSetObj[j].stopObjId).attr("display", "block");
										$("#" + svgSetObj[j].objId).attr("display","none");
									}
								}
							

							// 设置颜色
							if (svgSetObj[j].selfVoltColor != null
									&& svgSetObj[j].selfVoltColor != "") {
								devColor = svgSetObj[j].selfVoltColor;
							} else {
								devColor = svgSetObj[j].voltColor;
							}

							// 依靠电压等级
							if (svgSetObj[j].byVolt == "1") {
								// 运行状态
								if (svgSetObj[j].runStatus == '1') {
									setStrokeOrFillColor(svgSetObj[j].objId,svgSetObj[j].stopType, devColor);
								} else {
									setStrokeOrFillColor(svgSetObj[j].objId,
											svgSetObj[j].stopType, devColor);
									if (svgSetObj[j].stopType == "1") {
										$("#" + svgSetObj[j].objId).attr("display", "none");
										$("#" + svgSetObj[j].stopObjId).attr("display", "block");
									}

									setControlColor(svgSetObj[j].objId, "stroke", "#FF6600",svgSetObj[j].stopType);
								}
							} else {
								if (svgSetObj[j].runStatus == '1') {
									if (svgSetObj[j].sfMpId != null
											&& svgSetObj[j].sfMpId.length > 0)
										// 数值
										if (svgSetObj[j].isSwitch != "1") {
//											if (millDiff > 3) {
//												if (svgSetObj[j].stopType == "2") {
////													$("#" + svgSetObj[j].objId).text("NS");
//													setControlColor(svgSetObj[j].objId, "fill", "#ff0000",svgSetObj[j].stopType);
//												}
//
//											} else {
												switch (svgSetObj[j].stopType) {
												case "2":
													setControlColor(svgSetObj[j].objId, "fill", "#FF6600",svgSetObj[j].stopType);
													break;
												case "3":
													setControlColor(svgSetObj[j].objId, "fill", devColor,svgSetObj[j].stopType);
													break;
												case "4":
													setControlColor(svgSetObj[j].objId, "stroke", devColor,svgSetObj[j].stopType);
													break;
												}
//											}
										} else {
											if (svgSetObj[j].stopType.trim() == "4") {
												setControlColor(svgSetObj[j].objId, "stroke", devColor,svgSetObj[j].stopType);
											}											
										}

								} else {// 根据停运
									setStrokeOrFillColor(svgSetObj[j].objId,svgSetObj[j].stopType, devColor);
									if (svgSetObj[j].stopType == "1") {
										$("#" + svgSetObj[j].objId).attr("display", "none");
										$("#" + svgSetObj[j].stopObjId).attr("display", "block");
									} else {
										setControlColor(svgSetObj[j].objId, "stroke", "#FF6600",svgSetObj[j].stopType);
									}
								}
							}
							
							switch(svgSetObj[j].openType.trim()){
								case "1":
									if (svgSetObj[j].openobjId != "") {
										$("#" + svgSetObj[j].objId).attr("display", "none");
										$("#" + svgSetObj[j].openobjId).attr("display", "block");
									}
									break;
								case "2"://x、y
									
									break;
								case "3":
									if(svgSetObj[j].runStatus == '1'){
										setStrokeOrFillColor(svgSetObj[j].objId,svgSetObj[j].stopType, devColor);
									}else{
										setControlColor(svgSetObj[j].objId, "fill", "none",svgSetObj[j].stopType);
										setControlColor(svgSetObj[j].objId, "stroke", "#FF6600",svgSetObj[j].stopType);
									}
									
									break;
								case "4"://更改填充色
									break;
								case "5"://更改边框
									break;
							}
//							// 1红色 2橙色 3黄色 4灰色
//							switch (svgSetObj[j].alarmLevel) {
//							case "1":
//								// $("#" +
//								// svgSetObj.objId).attr("stroke","red");
//								// $("#" +
//								// svgSetObj.objId).children().attr("stroke",
//								// "red");
//								break;
//							case "2":
//								setControlColor(svgSetObj[j].objId, "fill", "#DB533F");
//								break;
//							case "3":
//								setControlColor(svgSetObj[j].objId, "fill", "yellow");
//								break;
//							case "4":
//								$("#" + svgSetObj[j].objId).attr("display","none");
//								$("#" + svgSetObj[j].alarmObjId).attr("display", "block");
//								break;
//							}

							// 提示
							collTime = svgSetObj[j].collTime;
							// 当点击事件是dev_click，显示运行状态，其他状况显示值
							if (svgSetObj[j].clickEvent != "YC_Click") {
								runStatusOrValue = svgSetObj[j].runStatus == "1" ? "运行"
										: "停运";
								runStatusOrValueType = "投运状态";
							} else {
								runStatusOrValue = svgSetObj[j].dataValue;
								runStatusOrValueType = "<div class='flt mgl36'>值</div>";
							}
							if (svgSetObj[j].isSwitch == "1") {
								workStatus = "";//parseInt(svgSetObj[j].dataValue) == 1 ? "合": "分";
							}
							tips = "";
							if (svgSetObj[j].sfMpId != "") {
								tips = "测点名称：" + svgSetObj[j].mpName + "<br/>";
							}
							if (svgSetObj[j].devName != "") {
								tips += "<div class='flt mgl12'>设备名：</div>" + svgSetObj[j].devName + "<br/>";
							}
							if (svgSetObj[j].clickEvent == "DEV_Click") {
								tips += runStatusOrValueType + "："+ runStatusOrValue;

							} else {
								tips += "采集时间：" + collTime + "<br/>"+ runStatusOrValueType + "："+ runStatusOrValue;
							}
							if (svgSetObj[j].isSwitch == "1") {
								tips += "<br/>工作状态：" + workStatus;
							}
							(function() {
								var _objid = svgSetObj[j].objId;
								var ct = tips;
								showTip(_objid, ct);

							})();
							
							$("#" + svgSetObj[j].objId).attr("cursor","pointer");
							if (svgSetObj[j].stopObjId != "") {
								(function() {
									var _objid = svgSetObj[j].stopObjId;
									var ct = tips;
									showTip(_objid, ct);
								})();								
								$("#" + svgSetObj[j].stopObjId).attr("cursor","pointer");
							}
							if (svgSetObj[j].noSingleId != "") {
								(function() {
									var _objid = svgSetObj[j].noSingleId;
									var ct = tips;
									showTip(_objid, ct);
								})();

								$("#" + svgSetObj[j].noSingleId).attr("cursor","pointer");
							}
							if (svgSetObj[j].openobjId != "") {

								(function() {
									var _objid = svgSetObj[j].openobjId;
									var ct = tips;
									showTip(_objid, ct);

								})();
								$("#" + svgSetObj[j].openobjId).attr("cursor","pointer");
							}
							// 点击事件
							if (svgSetObj[j].clickEvent != null
									&& svgSetObj[j].clickEvent != "") {								
								clickEvent(svgSetObj[j].deviceType,svgSetObj[j].deviceId,svgSetObj[j].objId,svgSetObj[j].clickEvent,svgSetObj[j].subsId,svgSetObj[j].mpCode,svgSetObj[j].sfMpId);
								if (svgSetObj[j].openobjId != "") {
									clickEvent(svgSetObj[j].deviceType,svgSetObj[j].deviceId,svgSetObj[j].openobjId,svgSetObj[j].clickEvent,svgSetObj[j].subsId,svgSetObj[j].mpCode,svgSetObj[j].sfMpId);
								}
								if (svgSetObj[j].stopObjId != "") {
									clickEvent(svgSetObj[j].deviceType,svgSetObj[j].deviceId,svgSetObj[j].stopObjId,svgSetObj[j].clickEvent,svgSetObj[j].subsId,svgSetObj[j].mpCode,svgSetObj[j].sfMpId);
								}
								if (svgSetObj[j].noSingleId != "") {
									clickEvent(svgSetObj[j].deviceType,svgSetObj[j].deviceId,svgSetObj[j].noSingleId,svgSetObj[j].clickEvent,svgSetObj[j].subsId,svgSetObj[j].mpCode,svgSetObj[j].sfMpId);
								}
							}
							
							// console.log(svgSetObj.objId + "---byVolt:"+
							// svgSetObj.byVolt + "---runStatus:"+
							// svgSetObj.runStatus + "----isSwitch:"+
							// svgSetObj.isSwitch + "-----"+
							// svgSetObj.dataValue+"------stopType"+svgSetObj.stopType+"--------collTime:"+svgSetObj.collTime);
						}
					}

					IniFunc(svgArr, dataValueArr, xyArr, oneOrTwoArr);
					bindSvgSet();

					deviceSum = 0;
					for (var i = 0, len = svgSetObj.length; i < len; i++) {
						if (svgSetObj[i].sfMpId != ""
								&& divIds.indexOf(svgSetObj[i].deviceId) < 0) {
							divIds += svgSetObj[i].deviceId + "";
							deviceSum++;
						}
					}
				}
			});
}
// 设备总数
var deviceSum = 0;

/**
 * 实时监控绑定数据
 */
function bindSvgSet() {
	/***************************************************************************
	 * 刷新时间
	 */
	// getSysDate();
	// var devColor = "";
	$.ajax({
		type : "post",
		url : webContextRoot + 'energySvgMonitor/querySusEnergy.action',
		dataType : "json",
		data : {
			'sfMpId' : mpidByOracle,
			'deviceId' : devIdByOracle//,
//			'userTranId' : userTranId
		},
		success : function(data) {
			bindDataSveObject(data);
		}
	});
}
var tips = "";
var workStatus = "";
var collTime = "";
/*******************************************************************************
 * 绑定实时数据
 * 
 * @param data
 */
function bindDataSveObject(data) {
	// svg编号
	var svgArr = [];
	// 数值
	var dataValueArr = [];
	// 横向或纵向显示开关
	var xyArr = [];
	// 显示开关位置
	var oneOrTwoArr = [];
	// 点击事件弹出详细：devClick显示状态值，yx_click和yc_click显示dataValue
	var runStatusOrValue = "";
	// 提示显示状态，或者显示值
	var runStatusOrValueType = "";
	// 判断是否无信号，当前时间与采集时间，相差3分钟以上为无信号
	var date = new Date();
	var currentdate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
			+ date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
			+ ":" + date.getSeconds();
	var millDiff = 0;
	tips = "";//提示
	collTime = "";//采集时间
	workStatus = "";//工作状态

	for (var i = 0, len = data.length; i < len; i++) {
		if (typeof (mpRef[data[i].sfMpId]) == "undefined") {
			break;
		} else {
			var svgObjs = mpRef[data[i].sfMpId];
			for (var svgIndex = 0, svgLen = svgObjs.length; svgIndex < svgLen; svgIndex++) {
				var svgObj = mpRef[data[i].sfMpId][svgIndex];
				
				
				//millDiff = MillDiff(currentdate, data[i].collTime);//间隔时间，大于3分钟显示无信号
				millDiff = MillDiff(data[i].sysTime, data[i].collTime);
				if(svgObj.isSwitch == "1")//判断是否为开关
				{
					if (svgObj.origPosition!= ""&&svgObj.openType.trim()=="2") {//开关类型为2，并且原始位置不为空
						svgArr[svgArr.length] = svgObj.objId;//赋值控件编号数组
						dataValueArr[dataValueArr.length] = svgObj.origPosition;//赋值，原始位置
						xyArr[xyArr.length] = svgObj.dirct;//开关方向x或y数组赋值
						oneOrTwoArr[oneOrTwoArr.length] = svgObj.oneOrTwo;//数组左右上下
					}
					/** ********************开关begin********************** */
					// 0：开1：关
					if (parseInt(data[i].dataValue) == 0) {
						// 投运
						if (data[i].runStatus == "1") {
							if (svgObj.openobjId != "") {//开关id
								$("#" + svgObj.openobjId).attr("display", "block");//运行状态，开关编号不为空，显示开关控件
								$("#" + svgObj.objId).attr("display", "none");//运行状态，开关编号不为空，隐藏对象控件
							}
							if (svgObj.stopObjId != "") {//停运id
								$("#" + svgObj.stopObjId).attr("display", "none");//运行状态，停运编号不为空，隐藏停运控件
								$("#" + svgObj.objId).attr("display", "none");//运行状态，停运编号不为空，隐藏对象控件
							}
						} else {
							if (svgObj.openobjId != "") {
								$("#" + svgObj.openobjId).attr("display", "none");//停运状态，开关编号不为空，隐藏开关控件
								$("#" + svgObj.objId).attr("display", "none");//停运状态，开关编号不为空，隐藏对象控件
							}
							if (svgObj.stopObjId != "") {
								$("#" + svgObj.stopObjId).attr("display", "block");//停运状态，停运编号不为空，显示停运控件
								$("#" + svgObj.objId).attr("display", "none");//停运状态，停运编号不为空，隐藏对象控件
							}
						}

						if (svgObj.origPosition!= ""&&svgObj.openType.trim()=="2") {
							Open_Close_current("#" + svgObj.objId, svgObj.dirct,
									svgObj.oneOrTwo, svgObj.origPosition, false);//初始化开关位置
						}
					} else if (parseInt(data[i].dataValue) == 1) {
						if (svgObj.openobjId != "") {
							$("#" + svgObj.objId).attr("display", "block");//显示对象控件
							$("#" + svgObj.openobjId).attr("display", "none");//隐藏开关控件
						}
						if (svgObj.origPosition!= ""&&svgObj.openType.trim()=="2") {
							Open_Close_current("#" + svgObj.objId, svgObj.dirct,
									svgObj.oneOrTwo, svgObj.origPosition, true);//初始化开关位置
						}
					}
					/** ********************开关end********************** */
				}
				// 设置颜色
				if (svgObj.selfVoltColor != null && svgObj.selfVoltColor != "") {
					devColor = svgObj.selfVoltColor;
				} else {
					devColor = svgObj.voltColor;
				}
				// 依靠电压等级
				if (svgObj.byVolt == "1") {
					// 运行状态
					if (data[i].runStatus == '1') {
						//运行
						setStrokeOrFillColor(svgObj.objId, svgObj.stopType,devColor);
					} else {//停运
						//停运
						setStrokeOrFillColor(svgObj.objId, svgObj.stopType,devColor);
						if (svgObj.stopType == "1") {//更换对象模式
							$("#" + svgObj.objId).attr("display", "none");//隐藏对象控件
							$("#" + svgObj.stopObjId).attr("display", "block");//显示停运控件
						}
						setControlColor(svgObj.objId,"stroke","#FF6600");
					}
				} else {
					if (data[i].runStatus == '1') {
						// 数值
						if (svgObj.isSwitch != "1") {//不是开关
//							if (millDiff > 3) {//无信号
//								if (svgObj.stopType == "2") {//停运状态为2，是文本
////									$("#" + svgObj.objId).text("NS");//文本显示为NS
//									//setControlColor(svgObj.objId,"fill","#ff0000");//设置颜色为红色
//									$("#" + svgObj.objId).text((Math.round(data[i].dataValue * 100) / 100)+ '');//文本赋值
//								}
//
//							} else {
								$("#" + svgObj.objId).text((Math.round(data[i].dataValue * 100) / 100)+ ' '+svgObj.mpUnit);//文本赋值
								switch (svgObj.stopType) {
								case "2":
									//文本
									setControlColor(svgObj.objId,"fill","#FF6600");
									break;
								case "3":
									//变更填充色fill
									setControlColor(svgObj.objId,"fill",devColor);
									break;
								case "4":
									//变更填充色stroke
									setControlColor(svgObj.objId,"stroke",devColor);
									break;
								}
//							}
						} else {
							setControlColor(svgObj.objId,"stroke","none");
							if (svgObj.stopType.trim() == "4") {
								setControlColor(svgObj.objId,"stroke",devColor);//设置边框颜色
							}
							if (millDiff > errorTime && svgObj.noSingleId!="") {
									$("#" + svgObj.noSingleId).attr("display", "block");//大于3分钟显示无信号控件
							}else if(svgObj.noSingleId!=""){
								$("#" + svgObj.noSingleId).attr("display", "none");//小于3分钟，隐藏无信号控件
							}
						}

					} else {// 根据停运
						setStrokeOrFillColor(svgObj.objId, svgObj.stopType,devColor);//设置对象颜色
						if (svgObj.stopType == "1") {//更换对象
							$("#" + svgObj.objId).attr("display", "none");//隐藏对象编号
							$("#" + svgObj.stopObjId).attr("display", "block");//显示停运控件
						}
						if (svgObj.isSwitch == "1"){//开关
							setControlColor(svgObj.objId,"stroke","#FF6600");//设置边框为白色
							setControlColor(svgObj.objId,"fill","none");//不设置填充色
						}						
					}
				}
				if (errorTime > millDiff) {
					switch(svgObj.openType.trim()){
						case "1"://1：更换对象模式
							if (parseInt(data[i].dataValue)==0) {//0：开1：关
								$("#" + svgObj.objId).attr("display", "none");//隐藏对象控件
								$("#" + svgObj.openobjId).attr("display", "block");//显示开关控件
							}else{
								$("#" + svgObj.objId).attr("display", "block");//显示对象控件
								$("#" + svgObj.openobjId).attr("display", "none");//隐藏开关控件
							}
							break;
						case "2"://x、y	2、动态模式
							
							break;
						case "3"://3、方框开关
							if(parseInt(data[i].dataValue)==0){//0：开1：关
								setControlColor(svgObj.objId,"fill","none");
							}else{
								setControlColor(svgObj.objId,"fill",devColor);
							}
							if(data[i].runStatus == '1'){//运行
								setStrokeOrFillColor(svgObj.objId,svgObj.stopType, devColor);//设置控件颜色
							}else{//停运
								setControlColor(svgObj.objId,"fill","none");//不设置填充色
								setControlColor(svgObj.objId,"stroke","#FF6600");//边框设置白色
							}
							
							break;
						case "4"://更改填充色
							if(parseInt(data[i].dataValue)==0){//0：开1：关
								setControlColor(svgObj.objId,"fill","#00FF00");//设置填充色绿色
							}else{
								setControlColor(svgObj.objId,"fill","red");//设置填充色红色
							}
							break;
						case "5"://更改边框
							if(parseInt(data[i].dataValue)==0){
								setControlColor(svgObj.objId,"stroke","#00FF00");//设置边框绿色
							}else{
								setControlColor(svgObj.objId,"stroke","red");//设置边框红色
							}
							break;
					}
				}
				
				
				// 1红色 2橙色 3黄色 4灰色
				switch (data[i].alarmLevel) {
					case "1"://红色
						if(svgObj.alarmMode=="0"){//边框变色
							setControlColor(svgObj.objId,"stroke","red");//边框设置红色
						}else if(svgObj.alarmMode=="3"){//替换对象
							$("#" + svgObj.objId).attr("display","none");//对象控件隐藏
							$("#" + svgObj.alarmObjId).attr("display", "block");//告警控件显示
						}else{//填充色、文本
							setControlColor(svgObj.objId,"fill","red");//填充色设置红色
						}
						break;
					case "2"://2橙色 
						if(svgObj.alarmMode=="0"){//边框变色
							setControlColor(svgObj.objId,"stroke","#DB533F");//边框设置橙色 
						}else if(svgObj.alarmMode=="3"){//替换对象
							$("#" + svgObj.objId).attr("display","none");//对象控件隐藏
							$("#" + svgObj.alarmObjId).attr("display", "block");//告警控件显示
						}else{//填充色、文本
							setControlColor(svgObj.objId,"fill","#DB533F");//填充色设置橙色 
						}
						break;
					case "3"://3黄色 
						if(svgObj.alarmMode=="0"){//边框变色
							setControlColor(svgObj.objId,"stroke","yellow");//边框设置黄色 
						}else if(svgObj.alarmMode=="3"){//替换对象
							$("#" + svgObj.objId).attr("display","none");//对象控件隐藏
							$("#" + svgObj.alarmObjId).attr("display", "block");//告警控件显示
						}else{//填充色、文本
							setControlColor(svgObj.objId,"fill","yellow");//填充色设置黄色 
						}
						break;
					case "4"://4灰色
						if(svgObj.alarmMode=="0"){//边框变色
							setControlColor(svgObj.objId,"stroke","#D1D1D1");//边框设置灰色
						}else if(svgObj.alarmMode=="3"){//替换对象
							$("#" + svgObj.objId).attr("display","none");//对象控件隐藏
							$("#" + svgObj.alarmObjId).attr("display", "block");//告警控件显示
						}else{//填充色、文本
							setControlColor(svgObj.objId,"fill","#D1D1D1");//填充色设置灰色
						}
						break;
				}

				// 提示
				collTime = data[i].collTime;
				// 当点击事件是dev_click，显示运行状态，其他状况显示值
				if (svgObj.clickEvent != "YC_Click") {
					runStatusOrValue = data[i].runStatus == "1" ? "运行" : "停运";
					runStatusOrValueType = "投运状态";
				} else {
					runStatusOrValue = data[i].dataValue;
					runStatusOrValueType = "<div class='flt mgl36'>值</div>";
				}
				if (svgObj.isSwitch == "1") {
					workStatus = parseInt(data[i].dataValue) == 1 ?  "合（1）": "分（0）";//"关" : "开";
				}

				tips = "";
				if (svgObj.sfMpId != "") {
					tips = "测点名称：" + svgObj.mpName + "<br/>";
				}

				if (svgObj.devName != "") {
					tips += "<div class='flt mgl12'>设备名：</div>" + svgObj.devName + "<br/>";
				}
				if (svgObj.clickEvent == "DEV_Click") {
					tips += runStatusOrValueType + "：" + runStatusOrValue;

				} else {
					tips += "采集时间：" + collTime + "<br/>" + runStatusOrValueType
							+ "：" + runStatusOrValue;
				}
				if (svgObj.isSwitch == "1") {
					tips += "<br/>工作状态：" + workStatus;
				}

				showTip(svgObj.objId, tips);

				$("#" + svgObj.objId).attr("cursor", "pointer");
				if (svgObj.stopObjId != "") {
					showTip(svgObj.stopObjId, tips);
				}
				if (svgObj.noSingleId != "") {
					showTip(svgObj.noSingleId, tips);
				}
				if (svgObj.openobjId != "") {
					showTip(svgObj.openobjId, tips);
				}
				// 点击事件
				if (svgObj.clickEvent != null && svgObj.clickEvent != "") {
					clickEvent(svgObj.deviceType, svgObj.deviceId,svgObj.objId,svgObj.clickEvent,data[i].userTranId,svgObj.mpCode,svgObj.sfMpId);
					if (svgObj.openobjId != "") {
						clickEvent(svgObj.deviceType, data[i].deviceId,svgObj.openobjId,svgObj.clickEvent,data[i].userTranId,svgObj.mpCode,svgObj.sfMpId);
					}
					if (svgObj.stopObjId != "") {
						clickEvent(svgObj.deviceType, data[i].deviceId,svgObj.stopObjId,svgObj.clickEvent,data[i].userTranId,svgObj.mpCode,svgObj.sfMpId);
					}
					if (svgObj.noSingleId != "") {
						clickEvent(svgObj.deviceType, data[i].deviceId,svgObj.noSingleId,svgObj.clickEvent,data[i].userTranId,svgObj.mpCode,svgObj.sfMpId);
					}
				}

			}
		}
		// console.log(data[i].objId + "---byVolt:"+
		// data[i].byVolt + "---runStatus:"+
		// data[i].runStatus + "----isSwitch:"+
		// data[i].isSwitch + "-----"+
		// data[i].dataValue+"------stopType"+data[i].stopType+"--------collTime:"+data[i].collTime);
	}
	IniFunc(svgArr, dataValueArr, xyArr, oneOrTwoArr);
}
/***
 * 高度
 */
var ht = 809;
/***
 * 宽度
 */
var wd = 1429;

/**
 * SVG自适应
 */
var isChangeBig=1;
function SetSVGViewBox() {
	/***
	 * 获取高度、宽度
	 */
	if(isFirst == true){
		var ht1 = $(window)[0].innerHeight;
		var wd2 = $(window)[0].innerWidth;
		isFirst = false;
	}else if(isFirst == false){
		var ht1 = $(window).height();
		var wd2 = $(window).width();
	}

    document.getElementById("svg_Main").setAttribute("viewBox","0 0 1600 900");
//    document.getElementById("svg_Main").setAttribute("viewBox","0 0 "+ wd2+" " + ht1);
	/***
	 * 修改高度、宽度自适应
	 */
	$("#svg_Main").attr("height",ht1);
	$("#svg_Main").attr("width", wd2);
	/***
	 * 修改高度、宽度自适应
	 */
	$("#svg_Main").attr("height",( ht1)*isChangeBig);
	$("#svg_Main").attr("width", (wd2)*isChangeBig);
}


/*******************************************************************************
 * 点击调用事件
 * 
 * @param devType
 * @param devId
 * @param objId
 */
//var userTranId=0;
function clickEvent(devType, devId, objId,clickType,userTranId,mpCode,sfMpId) {
	(function() {
//		$("#" + objId).bind("click",
//			function() {
//			if(clickType=="DEV_Click"){
//				OpenWinUnRes(webContextRoot +"pages/areaEnergy/baseData/index.jsp?consId="
//						+ consId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
//			}else{
//				OpenWinUnRes(webContextRoot +"pages/areaEnergy/consDataCentre/getConsDetailTree.jsp?consId="
//				+ consId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
//			}
//			});
		$("#" + objId).bind("click",
				function() {
					switch (devType) {
					case "1":
						if(mpCode=="SSSL" || mpCode=="LJSL"){	
//							var width = document.documentElement.clientWidth - 200;
//						    var height = document.documentElement.clientHeight - 100;
//							$('#dialog2').dialog({
//						        title: '水管理',
//						        width: width,
//						        height: height,
//						        closed: true,
//						        modal: true,
//						        onOpen: function () {
//						            if (window.frames[0].location.href == 'about:blank'){
//						                window.frames[0].location.href = webContextRoot+"pages/despages/monitor/ssll.jsp?consName="+escape(consNamePage)+'&mpCode='+mpCode+'&sfMpId='+sfMpId;
//						            }else{
//						            	if (window.frames[0].location.href != 'about:blank' && window.frames[0].location.href != ""){
////							                window.frames[0].location.href = webContextRoot+"pages/despages/monitor/ssll.jsp?consName="+escape(consNamePage)+'&mpCode='+mpCode+'&sfMpId='+sfMpId;
//						            	}
//						                $('#dialog2').window('center').panel('open');
//						            }
//						        },
//						        onClose:function(){
//						        	
//						        },
//						    });
//							$('#dialog2').window('center').panel('open');
							OpenWinUnRes(webContextRoot+"pages/despages/monitor/ssll.jsp?consName="+escape(consNamePage)+'&mpCode='+mpCode+'&sfMpId='
									+sfMpId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
						}else{
//							if(userTranId == null || userTranId == ""){
//								$.ajax({
//									type : "post",
//									url : webContextRoot + 'energySvgMonitor/queryMpSubsId.action',
//									dataType : "json",
//									data : {
//										'lineId' : sfMpId
//									},
//									success:function(result){
//										if(result.length>0){
//											OpenWinUnRes(webContextRoot+"areaEnergy/queryLineAtion.action?queryPara.lineId="+ devId+ "&queryPara.type=LINESELF&queryPara.subId="
//													+ result[0].subsId+"&queryPara.sfMpId="+sfMpId,"明细页面",screen.availWidth - 300,screen.availHeight - 260);
//										}
//									}
//								});
//							}else{
//								OpenWinUnRes(webContextRoot+"areaEnergy/queryLineAtion.action?queryPara.lineId="+ devId+ "&queryPara.type=LINESELF&queryPara.subId="
//										+ userTranId+"&queryPara.sfMpId="+sfMpId,"明细页面",screen.availWidth - 300,screen.availHeight - 260);
//							}	
							if(userTranId != null || userTranId != ""){
								OpenWinUnRes(webContextRoot+"areaEnergy/queryLineAtion.action?queryPara.lineId="+ devId+ "&queryPara.type=LINESELF&queryPara.subId="
										+ userTranId+"&queryPara.sfMpId="+sfMpId,"明细页面",screen.availWidth - 300,screen.availHeight - 260);
							}
//							OpenWinUnRes(webContextRoot+"areaEnergy/queryLineAtion.action?queryPara.lineId="+ devId+ "&queryPara.type=LINESELF&queryPara.subId="
//									+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
						}						
						break;
					case "2":
						OpenWinUnRes(webContextRoot+"areaEnergy/queryBsLineAtion.action?queryPara.bsId="+ devId+ "&queryPara.type=BSSELF&queryPara.subId="
										+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
						break;
					case "3":
						OpenWinUnRes(webContextRoot+"areaEnergy/queryMasterSubstation.action?queryPara.tranId="+ devId+ "&queryPara.other=0&queryPara.subId="
										+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
						break;
					case "0":
						OpenWinUnRes(webContextRoot+"areaEnergy/queryOtherEquipment.action?queryPara.id="+ devId+ "&queryPara.other=0&queryPara.isdevice=1&queryPara.subId="
						+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);	
//						//其他设备节点  0
//						document.getElementById("rightFrame").src = webContextRoot+"areaEnergy/queryOtherEquipment.action?queryPara.subId="+pId+"&queryPara.id="+id
//						+"&queryPara.other=0&queryPara.isdevice=1";
						break;
					case "5":
						OpenWinUnRes(webContextRoot+"areaEnergy/queryEnviromentalnuit.action?queryPara.id="+ devId+ "&queryPara.other=0&queryPara.isdevice=0&queryPara.subId="
						+ userTranId + "&queryPara.deviceId=" + devId +"&queryPara.codeType=02", "明细页面",screen.availWidth - 300,screen.availHeight - 260);						
//						//环境监测设备节点  5
//						document.getElementById("rightFrame").src = webContextRoot+"areaEnergy/queryEnviromentalnuit.action?queryPara.subId="+pId+
//						"&queryPara.id="+id+"&queryPara.other=0&queryPara.isdevice=0";
						break;
					case "6":
						OpenWinUnRes(webContextRoot+"areaEnergy/queryEntranceGuard.action?queryPara.id="+ devId+ "&queryPara.other=0&queryPara.isdevice=0&queryPara.subId="
						+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);	
//						//门禁节点  6
//						document.getElementById("rightFrame").src = webContextRoot+"areaEnergy/queryEntranceGuard.action?queryPara.subId="+pId+"&queryPara.id="+id
//						+"&queryPara.other=0&queryPara.isdevice=0";
						break;
					case "7":
						OpenWinUnRes(webContextRoot+"areaEnergy/queryIllumNation.action?queryPara.id="+ devId+ "&queryPara.other=0&queryPara.isdevice=0&queryPara.subId="
						+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
//						//照明节点 7
//						document.getElementById("rightFrame").src = webContextRoot+"areaEnergy/queryIllumNation.action?queryPara.subId="+pId+"&queryPara.id="
//						+id+"&queryPara.other=0&queryPara.isdevice=0";
						break;
					case "8":
						OpenWinUnRes(webContextRoot+"areaEnergy/queryOtherEquipment.action?queryPara.id="+ devId+ "&queryPara.other=0&queryPara.isdevice=0&queryPara.subId="
						+ userTranId, "明细页面",screen.availWidth - 300,screen.availHeight - 260);
//						//非电器设备其他设备节点 8
//						document.getElementById("rightFrame").src = webContextRoot+"areaEnergy/queryOtherEquipment.action?queryPara.subId="+pId+"&queryPara.id="
//						+id+"&queryPara.other=0&queryPara.isdevice=0";
						break;
					case "9":
						$.ajax({
							type : "post",
							url : webContextRoot + 'energySvgMonitor/queryEnergySubsId.action',
							dataType : "json",
							data : {
								'lineId' : devId
							},
							success:function(result){
								if(result != null && result != ""){
									OpenWinUnRes(webContextRoot+"areaEnergy/queryLineAtion1.action?queryPara.lineId="+devId+"&queryPara.type=POWERDEVICESELF"+"&queryPara.subId="+result[0].subsId+"&queryPara.codeType=03", "明细页面",screen.availWidth - 300,screen.availHeight - 260);//能效设备
								}
							}
						});
					}
				});
	})();
}
/*******************************************************************************
 * 根据停运方式修改颜色
 * 
 * @param objId
 * @param stopType
 * @param devColor
 */
function setStrokeOrFillColor(objId, stopType, devColor) { 
	/**
	 * 获取该元素下所有的组
	 */
	var arr=$("#" + objId).find("g");
	for(var i=0,len=arr.length;i<len;i++){
		/***
		 * 获取每个组元素下子元素
		 */
		var arrObjs=arr.children();
		/**
		 * 遍历所有子元素，按停运方式更改颜色
		 */
		$.each(arrObjs, function(index, domEle) {
			switch (stopType) {
			case "2":
				$("#" + domEle.id).attr("stroke", "#FF6600");
				break;// 2、修改值为--
			case "3":
				$("#" + domEle.id).attr("fill", devColor);
				break;// 3、变更填充色fill
			case "4":
				$("#" + domEle.id).attr("stroke", devColor);
				break;// 4、变更边框色stroke
			}
		});
	}
	

	
	switch (stopType) {
	case "2":
		$("#" + objId).text("--");
		$("#" + objId).children().attr("stroke", "#FF6600");
		$("#" + objId).attr("stroke", "#FF6600");
		break;// 2、修改值为--
	case "3":
		$("#" + objId).children().attr("fill", devColor);
		$("#" + objId).attr("fill", devColor);
		break;// 3、变更填充色fill
	case "4":
		$("#" + objId).children().attr("stroke", devColor);
		$("#" + objId).attr("stroke", devColor);
		break;// 4、变更边框色stroke
	}
}
/*******************************************************************************
 * 判断是否有信息，当前时间与采集时间相差大于3分钟，为无信号
 * 
 * @param currentTime
 * @param collTime
 * @returns {Number}
 */
function MillDiff(currentTime, collTime) {
	var current = eval('new Date('
			+ currentTime.replace(/\d+(?=-[^-]+$)/, function(a) {
				return parseInt(a, 10) - 1;
			}).match(/\d+/g) + ')');
	var coll = eval('new Date('
			+ collTime.replace(/\d+(?=-[^-]+$)/, function(a) {
				return parseInt(a, 10) - 1;
			}).match(/\d+/g) + ')');
	var timeDiff = current.getTime() - coll.getTime();
	return timeDiff / 1000 / 60;
}


/*******************************************************************************
 * 企业编号
 */
var consName = "实时终端测试用户";

var userTranName = "";
/*******************************************************************************
 * 根据企业编号获取第一个用户变编号
 */
function getSfgSubs() {
	$.ajax({
				type : "post",
				url : webContextRoot + 'energySvgMonitor/querySfgEnergy.action',
				dataType : "json",
				data : {
					'consId' : consId
				},
				success : function(data) {				
					if (data.length > 0) {
//						userTranId = userTranId == 0 ? data[0].subsId: userTranId;
						document.getElementById('divNoEnergyMessage').innerHTML = "";
						// 获取一次接线图配置
						getSvg();

					} else {
						$('#divWaiting').window('close'); 
						document.getElementById('liSVG').innerHTML = "";
						document.getElementById('divNoEnergyMessage').innerHTML = "<font style='color:black;font-size:24px;'>尚未配置！</font>";
					}
					
				}
			});
}


/*******************************************************************************
 * 打开窗口，不可拖动窗体大小
 * 
 * @param url
 * @param winName
 * @param width
 * @param height
 * @param isClosed
 */
function OpenWinUnRes(url, winName, width, height, isClosed) {
	xposition = 0;
	yposition = 0;

	if ((parseInt(navigator.appVersion) >= 4)) {
		xposition = (screen.width - width) / 2;
		yposition = (screen.height - height) / 2;
	}
	theproperty = "width=" + width + "," + "height=" + height + ","
			+ "location=0," + "menubar=0," + "resizable=0," + "scrollbars=1,"
			+ "status=1," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
			+ "screenx=" + xposition + "," // 仅适用于Netscape
			+ "screeny=" + yposition + "," // 仅适用于Netscape
			+ "left=" + xposition + "," // IE
			+ "top=" + yposition; // IE
	monwin = window.open(url, winName, theproperty, false);
	if (isClosed) {
		monwin.close();
		monwin = window.open(url, winName, theproperty, false);
	}
	monwin.focus();
}

/*******************************************************************************
 * 切换SVG图
 * 
 * @param sid
 *            
 */
function selectSvg(sid) {
	$('#divWaiting').window('open'); 
	var arr=$("#divCircle").find("div");
	$.each(arr, function(index, domEle) {	
		$("#"+domEle.id).removeClass("circleSelect");
		$("#"+domEle.id).addClass("circleNormal");
	});
	
	$("#li"+sid).addClass("circleSelect");
	$("#li"+sid).removeClass("circleNormal");
	svgId = sid;
	selectSvgId=svgId;
	getSvg();
}

/***
 * @param objId 控件编号
 * @param type stroke或者fill
 * @param devColor 颜色
 */
function setControlColor(objId, type, devColor,stopType) { 
	$("#" + objId).children().attr(type, devColor);
	$("#" + objId).attr(type, devColor);
	if(stopType=="2"&&devColor=="#FF6600"&&type=="fill"){
		$("#" + objId).text("--");
	}
	/**
	 * 获取该元素下所有的组
	 */
	var arr=$("#" + objId).find("g");
	for(var i=0,len=arr.length;i<len;i++){
		/***
		 * 获取每个组元素下子元素
		 */
		var arrObjs=arr.children();
		/**
		 * 遍历所有子元素，按停运方式更改颜色
		 */
		$.each(arrObjs, function(index, domEle) {			
			$("#" + domEle.id).attr(type, devColor);
			if(stopType=="2"&&devColor=="#FF6600"&&type=="fill"){
				$("#" + domEle.id).text("--");
			}
		});
	}
}
/***
 * 没有SVG图
 */
function setNoSvg(){
	document.getElementById('liSVG').innerHTML = "";
	document.getElementById('divNoEnergyMessage').innerHTML = "<font style='color:black;font-size:24px;'>尚未配置！</font>";
}
/**
 * 等待遮罩层
 */
    $('#divWaiting').dialog({
    	title: '等待中',width: 250,height: 120,closed: true,cache: false,closable: false,modal: true   
    }); 
    
    /**
    * 窗口的取消事件
    */
    function cons_quickSearch_window1_cancel(){
    //搜索窗口隐藏
    $("#cons_quickSearch_window1").hide();
    //页面遮盖层隐藏
    $("#cons_quickSearch_cover").hide();
    }
    function cons_quickSearch_window2_cancel(){
    //搜索窗口隐藏
    $("#cons_quickSearch_window2").hide();
    //页面遮盖层隐藏
    $("#cons_quickSearch_cover").hide();
    }

    /**
    * 快搜窗口的查询事件
    */
    function cons_quickSearch_window_search(){
    var message = "";
    if(!$("#cons_quickSearch_window1").is(":hidden")){
    message = $("#cons_quickSearch_window1_input").val();
    }else{
    message = $("#cons_quickSearch_window2_input").val();
    }
    message = $.trim(message);
    consSelectSearch(message);

    $("#cons_quickSearch_window1").hide();
    $("#cons_quickSearch_window2").show();
    $("#cons_quickSearch_window2_history").hide();
    //快搜搜索框设置值
    $("#cons_quickSearch_window2_input").val(message);
    //快搜搜索框焦点事件  
    $("#cons_quickSearch_window2_input").focus(function(){
    $("#cons_quickSearch_window2_history").show();
    });

    //选中客户后确定事件
    $("#cons_quickSearch_window2_bottom img").click(function(){
    //consSelect();
    $("#cons_datagrid").datagrid("loadData",cons_datagrid_list);
    cons_quickSearch_window2_cancel();
    });
    }

    /**
    * 快搜窗口查询
    */
    function consSelectSearch(message,isFirst){
    consSelectKey = message;

    $("#cons_quickSearch_window2_key").text(consSelectKey);

    if(!isFirst){
    $("#cons_quickSearch_window_cover").show();
    }


    if(isFirst){
    //查询最近访问的客户
    $.ajax({	
    	url:webContextRoot + "destree/mergeHistoryCons.action",
    	dataType:'json',
    	type:'post',
    	data:{
    		'treeModel.userId' : top.userId,
    		'treeModel.funcId' : funcId,
    		'treeModel.hasRoot' : consSelectHasRoot == true ? '1' : '0',
    		'treeModel.type' : 'cons'
    	},
    	success:function(result){
//    		console.log(result);
//    		consSelectLoadLatelyMethod();
    		consSelectHistoryCons = result;
    		var historyHTML = '';
    		for(var i = 0; i < result.length; i++){
    			historyHTML += '<div id="cons_history_cons_'+i+'" class="con con_'+(i%2)+'"></div>';
    		}
    		$("#cons_history_cons").html(historyHTML);
    		for(var i = 0; i < result.length; i++){
    			$("#cons_history_cons_"+i).text(result[i].text);
    			$("#cons_history_cons_"+i).attr("title",result[i].text);
    		}
    		
    		//默认选中第一个
    		if(result.length > 0){
    			$("#cons_history_cons_0").addClass("active");
    			if(consSelectMultiselect) consSelectCons.push(consSelectHistoryCons[0]);
    			else consSelectCon = consSelectHistoryCons[0];
    			if(consSelectMethod!=null){
    				eval(consSelectMethod);
    			}
    		}
    		
    		//最近访问 点击事件
    		$("#cons_history_cons .con").click(function(){
    			if(consSelectMultiselect){
    				//选中的客户
    				var index = $(this).attr("id").substr(18);
    				consSelectCon = consSelectHistoryCons[index];
    				var className = $(this).attr("class");
    				if(className.indexOf("active")==-1){//当前状态 没有选中
    					if(consSelectMultiselectValidate(consSelectCon,"+"))
    						$(this).addClass("active");
    				}else{//当前状态 选中
    					if(consSelectMultiselectValidate(consSelectCon,"-"))
    						$(this).removeClass("active");
    				}
    				//选择客户后加载的方法
    				if(consSelectMethod!=null){
    					eval(consSelectMethod);
    					//更新最近访问
    					updateLatelyCons(consSelectCon.id);
    				}
    			}else{
    				//最近访问样式切换
    				$("#cons_history_cons .active").removeClass("active");
    				$(this).addClass("active");
    				//客户列表 取消 选中
    				$("#cons_datagrid").datagrid("unselectAll");
    				//选择客户后加载的方法
    				var index = $(this).attr("id").substr(18);
    				consSelectCon = consSelectHistoryCons[index];
    				if(consSelectMethod!=null){
    					eval(consSelectMethod);
    				}
    				//更新最近访问
    				if(consSelectHistoryCons[index].id.length > 3){
    					updateLatelyCons(consSelectHistoryCons[index].id);
    				}
    			}
    		});
    	}
    });
    }

    //先清空客户列表
    $("#consListShow").html("");
    if(!isFirst){
    	//加载客户
    	$.ajax({	
    		url:webContextRoot + "destree/consSelect.action",
    		dataType:'json',
    		type:'post',
    		data:{
    			'ziMu':message 
//    			'modeType':isFirst == true?"true":"false"
    		},
    		success:function(result){
//    			console.log("consSelect",result);
    			var array = new Array();
    			array.push({
    				'children':result
    			});
    			consSelectAllCons = array;
    			cons_datagrid_list = [];
    			//总数
    			$("#cons_quickSearch_window2_count").text(result.length);
    			//关键字
    			$("#cons_quickSearch_window2_search_result").attr("title",$("#cons_quickSearch_window2_search_result").text());
    			//排版
    			arrangeCons(array,1);
    			$("#cons_quickSearch_window_cover").hide();
    		}
    	});
    }

    mergeHistoryCons(message);
    }

    /**
    * 更新查询历史记录
    */
    function mergeHistoryCons(message){
    $.ajax({	
    url:webContextRoot + "destree/mergeHistoryCons.action",
    dataType:'json',
    type:'post',
    data:{
    	'treeModel.userId':top.userId,
    	'treeModel.funcId':funcId,
    	'treeModel.text':message
    },
    success:function(result){
//    	console.log("mergeHistoryCons",result);
    	var historyCons1 = $("#cons_quickSearch_window1_history table").find("td");
    	var historyCons2 = $("#cons_quickSearch_window2_history table").find("td");
    	for(var i = 0; i < result.length; i++){
    		$(historyCons1[i]).text(result[i].TEXT);
    		$(historyCons2[i]).text(result[i].TEXT);
    		$(historyCons1[i]).addClass("active");
    		$(historyCons2[i]).addClass("active");
    	}
    }
    });
    }

    /**
    * 更新最近访问
    * @param consId
    */
    function updateLatelyCons(consId){
    $.ajax({	
    url:webContextRoot + "destree/mergeHistoryCons.action",
    dataType:'json',
    type:'post',
    data:{
    	'treeModel.userId' : top.userId,
    	'treeModel.funcId' : funcId,
    	'treeModel.consId' : consId,
    	'treeModel.hasRoot' : '1',
    	'treeModel.type' : 'cons'
    },
    success:function(result){
//    	console.log(result);
    }
    });
    }

    /**
    * 对客户数组 布局 
    */
    function arrangeCons(data,index){

    var pagesSize = 20;//一页显示的个数
    var pagesTotal = Math.ceil(data[0].children.length/pagesSize);//总页数
    //先清空
    $("#consListShow").html("");
    var pagesLength = index==pagesTotal?data[0].children.length:index*pagesSize;
    for(var i = (index-1)*pagesSize ; i < pagesLength ; i++){
    var obj = data[0].children[i];
    if(obj != null){
    	var con_html = '<div class="consList consList'+(i%2)+'">'
    	+'<input id="consList_'+obj.id+'" value="'+obj.id+'" type="checkbox" style="position:relative;top:7px;left:10px;"/>'
    	+'<label title="'+obj.text+'" style="position:relative;top:7px;left:24px;display:inline-block;width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+obj.text+'</label>'
    	+'<div class="consListTable"><table>'
    	+'<tr><td title="客户编号：'+obj.consNo+'"><img src="'+webContextRoot+'pages/despages/common/images/tk-08.png"/><font>&nbsp;&nbsp;客户编号：</font><font>'+obj.consNo+'</font></td>'
    	+'<td title="联系人：'+obj.contactName+'"><img src="'+webContextRoot+'pages/despages/common/images/tk-09.png"/><font>&nbsp;&nbsp;联系人：</font><font>'+obj.contactName+'</font></td>'
    	+'<td title="地址：'+obj.elecAddr+'"><img src="'+webContextRoot+'pages/despages/common/images/tk-11.png"/><font>&nbsp;&nbsp;地址：</font><font>'+obj.elecAddr+'</font></td></tr>'
    	+'<tr><td title="电压等级/合同容量：'+obj.voltCode+'/'+obj.contractCap+'kVA"><img src="'+webContextRoot+'pages/despages/common/images/tk-07.png"/><font>&nbsp;&nbsp;电压等级/合同容量：</font><font>'+obj.voltCode+'/'+obj.contractCap+'kVA</font></td>'
    	+'<td title="联系电话：'+obj.telephone+'"><img src="'+webContextRoot+'pages/despages/common/images/tk-10.png"/><font>&nbsp;&nbsp;联系电话：</font><font>'+obj.telephone+'</font></td><td></td></tr>'
    	+'</table></div>'
    	+'</div>';
    	$("#consListShow").append(con_html);
    }
    }
    //关键字变颜色
    changeColor();
    //分页显示
    arrangePages(index,pagesTotal,pagesSize,data);

    //客户是否勾选状态
    consSelectConsFuzhi();

    //客户勾选事件
    $(".consList input").click(function(){
    //console.log($(this));
    if($(this)[0].checked){
    	//勾选 添加
    	for(var j = 0; j < consSelectAllCons[0].children.length;j++){
    		if($(this)[0].value == consSelectAllCons[0].children[j].id){
    			cons_datagrid_list.push({
    				'id':consSelectAllCons[0].children[j].id,
    				'consNo':consSelectAllCons[0].children[j].consNo,
    				'text':consSelectAllCons[0].children[j].text
    			});
    			break;
    		} 
    	}
    }else{
    	//取消勾选 移除
    	for(var i = 0; i < cons_datagrid_list.length; i++){
    		if(cons_datagrid_list[i].id == $(this)[0].value){
    			cons_datagrid_list.splice(i,1);
    			break;
    		}
    	}
    }
    consList_all_event();
    //console.log($(this).attr("id").substr(9));
    });

    //console.log($("#consList_all"));
    $("#consList_all")[0].checked = false;
    //全选事件
    if(consList_all){
    $("#consList_all").click(function(){
    	var consListShowChildren = $("#consListShow").find("input");
    	if(document.getElementById("consList_all").checked){
    		for(var i = 0; i < consListShowChildren.length; i++){
    			//未勾选的客户
    			if(!consListShowChildren[i].checked){
    				//复选框  勾选
    				consListShowChildren[i].checked = true;
    				var consSelectConsId = consListShowChildren[i].value;
    				//寻找客户信息
    				for(var j = 0; j < consSelectAllCons[0].children.length;j++){
    					if(consSelectConsId == consSelectAllCons[0].children[j].id){
    						var isNotFound = true;
    						for(var k = 0; k < cons_datagrid_list.length; k++ ){
    							if(cons_datagrid_list[k].id == consSelectConsId) {
    								isNotFound = false;
    								break;
    							}
    						}
    						if(isNotFound){
    							//找到客户并添加到队列里
    							cons_datagrid_list.push({
    								'id':consSelectAllCons[0].children[j].id,
    								'consNo':consSelectAllCons[0].children[j].consNo,
    								'text':consSelectAllCons[0].children[j].text
    							});
    							break;
    						}
    					} 
    				}
    			}
    		}
    	}else{
    		for(var i = 0; i < consListShowChildren.length; i++){
    			//勾选的客户
    			if(consListShowChildren[i].checked){
    				//复选框  取消勾选
    				consListShowChildren[i].checked = false;
    				var consSelectConsId = consListShowChildren[i].value;
    				//移除
    				for(var j = 0; j < cons_datagrid_list.length; j++){
    					if(cons_datagrid_list[j].id == consSelectConsId){
    						cons_datagrid_list.splice(j,1);
    						break;
    					}
    				}
    			}
    		}
    	}
    });
    consList_all = false;
    }

    consList_all_event();
    }

    /**
    * 全选事件
    */
    function consList_all_event(){
    var consListShowChildren = $("#consListShow").find("input");
    var isConsList_all_select = true;
    for(var i = 0; i < consListShowChildren.length; i++){
    if(!consListShowChildren[i].checked){
    	isConsList_all_select = false;
    	break;
    }
    //console.log(consListShowChildren)
    }
    $("#consList_all")[0].checked = isConsList_all_select;
    }

    /**
    * 记录选中客户的事件
    */
    //function consSelect(){
    ////选中客户后确定事件
    //var consListShowChildren = $("#consListShow").find("input");
    //for(var i = 0; i < consListShowChildren.length; i++){
    //if(consListShowChildren[i].checked){
//    	for(var j = 0; j < consSelectAllCons[0].children.length;j++){
//    		if(consListShowChildren[i].value == consSelectAllCons[0].children[j].id){
//    			cons_datagrid_list.push({
//    				'id':consSelectAllCons[0].children[j].id,
//    				'consNo':consSelectAllCons[0].children[j].consNo,
//    				'text':consSelectAllCons[0].children[j].text
//    			});
//    			break;
//    		} 
//    	}
    //}
    //}
    //}

    /**
    * 分页居中对齐
    */
    function consSelectPagesCenter(){
    var cons_quickSearch_window_bottom_pages =  $("#cons_quickSearch_window2_bottom_pages").children();
    var firstPageMarginLeft = (11-cons_quickSearch_window_bottom_pages.length)*15;
    $("#cons_quickSearch_window2_bottom_pages div:first-child").css("margin-left",firstPageMarginLeft);
    }

    /**
    * 布局分页
    * @param currentPage 当前页
    * @param consPages 总页数
    * @param consSize 客户数量
    * @param data 客户
    */
    function arrangePages(currentPage,consPages,consSize,data){
    $("#cons_quickSearch_window2_bottom_pages").html("");
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
    $("#cons_quickSearch_window2_bottom_pages").append(consPagesHtml);
    //设置分页样式
    var pages = $("#cons_quickSearch_window2_bottom_pages").children(".page");
    consSelectPagesCenter();
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
    $("#cons_quickSearch_window2_bottom_pages .page").click(function(){
    //判断是否有效的分页
    if($(this).attr("class").length<6){
    	//调整客户显示
    	var currentPage = $(this).text();
    	if(currentPage == '首页') currentPage = 1;
    	else if(currentPage == '尾页') currentPage = consPages;
    	//先清空
    	$("#cons_quickSearch_window2_bottom_pages").html("");
    	arrangeCons(data,currentPage);
    	//分页
//    	arrangePages(currentPage,consPages,consSize);
    }
    });
    }

    /**
    * 客户勾选过得  再有显示  直接在复选框内勾选  
    */
    function consSelectConsFuzhi(){
    //当前页所有的input
    var consListShowChildren = $("#consListShow").find("input");
    for(var i = 0; i < consListShowChildren.length; i++){
    for(var j = 0; j < cons_datagrid_list.length ; j++){
    	if(consListShowChildren[i].value == cons_datagrid_list[j].id){
    		consListShowChildren[i].checked = true;
    	}
    }
    }
    }

    /**
    * 关键字 变颜色
    */
    function changeColor(){

    //关键字数组
    var consSelectKeys = [];
    for(var i = 0; i < consSelectKey.length; i++){
    if(consSelectKey.substr(i,1) != ' '){
    	consSelectKeys.push(consSelectKey.substr(i,1));
    }
    }
    //含关键字的下标数组
    var consSelectKeyIndexs = [];

    var consSelectConsNameLabel = $("#consListShow").find("label");
    for(var i = 0; i < consSelectConsNameLabel.length; i++){
    consSelectKeyIndexs = [];
    //关键字所在下标取出
    for(var j = 0; j < consSelectKeys.length; j++){
    	//原数据
    	var str = consSelectConsNameLabel[i].innerHTML;
    	var pre = 0;
    	while(str.indexOf(consSelectKeys[j]) > -1){
    		pre += str.indexOf(consSelectKeys[j]);
    		consSelectKeyIndexs.push(pre);
    		str = str.substr(str.indexOf(consSelectKeys[j])+1);
    		pre += 1;
    	}
    }
    //关键字下标去重
    consSelectKeyIndexs = uniqueArray(consSelectKeyIndexs);
    //关键字下标排序
    consSelectKeyIndexs = consSelectKeyIndexs.sort(sortArray);
    consSelectConsNameLabel[i].innerHTML = replaceIndexs(consSelectConsNameLabel[i].innerHTML,consSelectKeyIndexs);
    }

    var td = $("#consListShow table").find("td");
    for(var i = 0; i < td.length; i++){
    if(td[i].lastChild == null) continue;

    consSelectKeyIndexs = [];
    //关键字所在下标取出
    for(var j = 0; j < consSelectKeys.length; j++){
    	//原数据
    	var str = td[i].lastChild.innerHTML;
    	var pre = 0;
    	while(str.indexOf(consSelectKeys[j]) > -1){
    		pre += str.indexOf(consSelectKeys[j]);
    		consSelectKeyIndexs.push(pre);
    		str = str.substr(str.indexOf(consSelectKeys[j])+1);
    		pre += 1;
    	}
    }
    //关键字下标去重
    consSelectKeyIndexs = uniqueArray(consSelectKeyIndexs);
    //关键字下标排序
    consSelectKeyIndexs = consSelectKeyIndexs.sort(sortArray);
    td[i].lastChild.innerHTML = replaceIndexs(td[i].lastChild.innerHTML,consSelectKeyIndexs);

    //var str = td[i].lastChild.innerHTML;
    //for(var j = 0; j < consSelectKeys.length; j++){
//    	str = str.replace(new RegExp(consSelectKeys[j],"gm"),'<font color="red" style="left:0px;">'+consSelectKeys[j]+"</font>");
    //}
    //td[i].lastChild.innerHTML = str;
    }

    //var consSelectConsNameLabel = $("#consListShow").find("label");
    //for(var i = 0; i < consSelectConsNameLabel.length; i++){
    //var str = consSelectConsNameLabel[i].innerHTML;
    //for(var j = 0; j < consSelectKeys.length; j++){
//    	str = str.replace(new RegExp(consSelectKeys[j],"gm"),'<font color="red" style="left:0px;">'+consSelectKeys[j]+"</font>");
    //}
    //consSelectConsNameLabel[i].innerHTML = str;
    //}
    //
    //var td = $("#consListShow table").find("td");
    //for(var i = 0; i < td.length; i++){
    //if(td[i].lastChild == null) continue;
    //
    //var str = td[i].lastChild.innerHTML;
    //for(var j = 0; j < consSelectKeys.length; j++){
//    	str = str.replace(new RegExp(consSelectKeys[j],"gm"),'<font color="red" style="left:0px;">'+consSelectKeys[j]+"</font>");
    //}
    //td[i].lastChild.innerHTML = str;
    //}
    }

    /**
    * 数组从小到大排序
    */
    function sortArray(a,b){
    return a-b;
    }

    /**
    * 字符串找到下标并替换
    */
    function replaceIndexs(str,indexs){
    if(indexs.length == 0) return str;
    var string = '';
    for(var i = 0; i < indexs.length; i++){
    //var pre = str.substring(0,indexs[i]);
    //var s = str.substr(indexs[i],1);
    //var next = str.substr(indexs[i]+1);
    //console.log("pre",pre,"s",s,"next",next);
    if(i == 0){
    	string += replaceIndex(str,indexs[i]).pre + replaceIndex(str,indexs[i]).s;
    	str = replaceIndex(str,indexs[i]).next;
    	if(i == indexs.length-1){
    		string += str;
    	}
    }else{
    	string += replaceIndex(str,indexs[i]-indexs[i-1]-1).pre + replaceIndex(str,indexs[i]-indexs[i-1]-1).s;
    	str = replaceIndex(str,indexs[i]-indexs[i-1]-1).next;
    	if(i == indexs.length-1){
    		string += str;
    	}
    }
    }
    return string;
    }

    function replaceIndex(str,index){
    var pre = str.substring(0,index);
    var s = str.substr(index,1);
    var next = str.substr(index+1);
    var strObj = {
    	'index':index,
    	'pre':pre,
    	's':'<font color="red" style="left:0px;">'+ s +"</font>",
    	'next':next
    };
    return strObj;
    }

    /**
    * 数组去重
    */
    function uniqueArray(array){
    var arr = new Array();
    for(var i in array){
    if(arr.indexOf(array[i]) == -1){
    	arr.push(array[i]);
    }
    }
    return arr;
    }
    /**
    * 客户去重
    */
    function uniqueArrayCons(array){
    var arr = new Array();
    var arrIds = new Array();
    var arrayIds = new Array();
    //var idsIndex = new Array();
    //原始的 所有ID
    for(var i = 0; i < array.length; i++){
    arrayIds.push(array[i].id);
    }
    //
    for(var i in arrayIds){
    if(arrIds.indexOf(arrayIds[i]) == -1){
//    	arr.push(arrIds[i]);
//    	idsIndex.push(i);
    	arrIds.push(arrayIds[i]);
    	arr.push(array[i]);
    }
    }
    return arr;
    }


    /**
    * 输入验证
    * @param textbox
    */
    function ValidateValue(textbox){
    var textboxvalue = textbox.value;
    var reg=/^([A-Za-z0-9]|[\u2E80-\u9FFF])*$/;
    if(reg.test(textboxvalue)){
    return;
    }
    textboxvalue = textboxvalue.replace(/[^\a-\z\A-\Z0-9\u2E80-\u9FFF]/g, '');
    //textboxvalue = textboxvalue.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '');
    textbox.value = textboxvalue;
    //this.value=this.value.replace(/[^u4e00-u9fa5w]/g,'');
    }

    /**
    * 多选 验证
    */
    function consSelectMultiselectValidate(conData,type){
    if(type == '+'){
    //队列
    if(consSelectCons.length > 5){
    	$.messager.alert('提示', "不能大于6个企业", 'warning');
    	return false;
    }
    consSelectCons.push(conData);
    //最近访问
    for(var i = 0; i < consSelectHistoryCons.length; i++){
    	if(consSelectHistoryCons[i].id == conData.id){
    		$($("#cons_history_cons .con")[i]).addClass("active");
    		break;
    	}
    }
    //快搜列表
    if(!datagridIsSelected(conData.id)){  //没选中的让他选中
    	var rowsData = $("#cons_datagrid").datagrid("getRows");
    	for(var i = 0; i < rowsData.length; i++){
    		if(rowsData[i].id == conData.id){
    			$("#cons_datagrid").datagrid("selectRow",i);
    			break;
    		}
    	}
    }
    consSelectCons = uniqueArrayCons(consSelectCons);
    return true;
    }else if(type == '-'){
    //队列
    if(consSelectCons.length == 1){
    	$.messager.alert('提示', "至少选择一个", 'warning');
    	return false;
    }
    for(var i = 0; i < consSelectCons.length; i++){
    	if(consSelectCons[i].id == conData.id){
    		consSelectCons.splice(i,1);
    		break;
    	} 
    }
    //最近访问
    for(var i = 0; i < consSelectHistoryCons.length; i++){
    	if(consSelectHistoryCons[i].id == conData.id){
    		$($("#cons_history_cons .con")[i]).removeClass("active");
    		break;
    	}
    }
    //快搜列表
    if(datagridIsSelected(conData.id)){  //选中的让他没选中
    	var rowsData = $("#cons_datagrid").datagrid("getRows");
    	for(var i = 0; i < rowsData.length; i++){
    		if(rowsData[i].id == conData.id){
    			$("#cons_datagrid").datagrid("unselectRow",i);
    			break;
    		}
    	}
    }
    consSelectCons = uniqueArrayCons(consSelectCons);
    return true;
    }
    }

    /**
    * 判断是否被选中
    * @param data
    * @returns {Boolean}
    */
    function datagridIsSelected(data){
    var Selections = $("#cons_datagrid").datagrid("getSelections");
    for(var i = 0; i < Selections.length; i++){
    if(data == Selections[i].id){
    	return true;
    }
    }
    return false;
    }
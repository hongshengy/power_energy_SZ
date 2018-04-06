/**
 * 用能分析报告
 * @author meng_zijie
 * @since 2017-06-13
 */
var dataDate = new Date();//当前时间
var isEdit = false;	//编辑状态
var ynbg_logo;	//logo对象

var fhqsChart;	//负荷趋势chart对象
var fhqsChart_show;	//负荷趋势chart对象
var dltjChart;	//电量统计chart对象
var dltjChart_show;	//电量统计chart对象
var glyszsChart;//功率因数走势chart对象
var glyszsChart_show;//功率因数走势chart对象
var dftjChart;//电费统计chart对象
var dftjChart_show;//电费统计chart对象

var ynbg_dyhglChart;//电压合格率chart对象
var ynbg_dyhglChart_show;//电压合格率chart对象
var ynbg_dyhglChartList;//电压合格率chart对象
var ynbg_dyhglChartList_show;//电压合格率chart对象
var ynbg_sxdlbphChart;//三相电流不平衡chart对象
var ynbg_sxdlbphChart_show;//三相电流不平衡chart对象
var ynbg_sxdlbphChartList;//三相电流不平衡chart对象
var ynbg_sxdlbphChartList_show;//三相电流不平衡chart对象
var ynbg_xbChart;//谐波chart对象
var ynbg_xbChart_show;//谐波chart对象
var ynbg_xbChartList;//谐波chart对象
var ynbg_xbChartList_show;//谐波chart对象

var ynbg_sbnhChart;//设备用电chart对象
var ynbg_sbnhChart_show;//设备用电chart对象
var ynbg_qynhChart;//区域用电chart对象
var ynbg_qynhChart_show;//区域用电chart对象
var ynbg_xlnhChart;//线路用电chart对象
var ynbg_xlnhChart_show;//线路用电chart对象


//三相电流  记录变压器
var tranId = new Array(); 
var tranName = new Array();
var subsName = new Array();
//谐波
var xbTranId = new Array(); 
//电压合格率
var dyhglTranId = new Array(); 
 
$(function(){
	
	/**
	 * 自定义验证规则
	 */
	$.extend($.fn.validatebox.defaults.rules, {    
	    maxLength: {    
	        validator: function(value, param){    
	            return value.length <= param[0];    
	        },    
	        message: '请输入小于或等于{0}个字'   
	    }    
	});  
	
	/**
	 * 自定义导出方法
	 */
	$.fn.datagrid.methods.exportExcel = function(target,param){
		return target.each(function() {
			var opts = $.data(this, "datagrid").options;
			var data = $.extend({}, opts.queryParams, param.data);
			if (opts.pagination) {
				$.extend(data, {
							page : opts.pageNumber,
							rows : opts.pageSize
						});
			}
			if (opts.sortName) {
				$.extend(data, {
							sort : opts.sortName,
							order : opts.sortOrder
						});
			}
			if (opts.onBeforeLoad.call(this, data) == false) {
				return;
			}
			var str = "";
			str = encodeURI(param.url + str);
			var exportObj = $("#rimp_export");
			if(exportObj && exportObj.length > 0){
				exportObj.attr("src", str);
			}else{
				$("<iframe id='rimp_export' style='display:none' />").appendTo($("body"));
				$("#rimp_export").attr("src", str);
			}
		});
	};
//	console.log(DateUtil.dateToStr('yyyy-MM-dd',dataDate),DateUtil.dateToStr('yyyy-MM',dataDate));
//	console.log(DateUtil.dateToStr('yyyy-MM',dataDate)+"-01");
//	console.log(DateUtil.maxDayOfDate(dataDate));
	
	//设置时间
	$("#dataDateMonth").val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dataDate)));
	$("#dataDate").val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dataDate))+"-01");
	$("#endDate").val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dataDate))+"-"+DateUtil.maxDayOfDate(DateUtil.dateAdd('m',-1,dataDate)));
	//自定义时间  事件
	$("#dataDateType").click(function(){
		if(document.getElementById("dataDateType").checked){
			//勾选  自定义
			//月报
			$($("#dataDateMonth").parents("li")).hide();
			$($("#dataDate").parents("li")).show();
		}else{
			//未勾选  自定义
			//月报
			$($("#dataDateMonth").parents("li")).show();
			$($("#dataDate").parents("li")).hide();
		}
	});
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
			url:webContextRoot +'destree/queryTree.action',
		    method:'get',
		    multiple:false,//是否支持多选
		    editable:'true' ,
		    onClick: function(node){
		    	// 获取根节点
		    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
		    	// 不是根节点时，刷新页面
		    	if(rootNode.id != node.id){
			    	if(isEdit){
	//		    		$.messager.alert('提示','请先保存！');    
			    		return false;
			    	}
					consId = node.id;
					consName = node.text;
					selectAreaIcon();
					loadData();
		    	}else{
		    		$.messager.alert('提示', '请选择客户', 'warning');
		    	}
			},
			onBeforeSelect : function(node){
				if(isEdit){
		    		$.messager.alert('提示','请先保存！');    
		    		return false;
		    	}
			},
			onLoadSuccess:function(node, data){//加载成功返回
				selectTree();//设置树默认选中节点
			}
		});
		//树模糊检索
		searchTreeNode();
	}else{
//		queryUserFiles(consId);
		selectAreaIcon();
		loadData();
	}
	
	//导出 
	$("#export").click(function(){
		if($("#edit").css("display")=="none"){
			$.messager.alert('提示','请先保存！');    
			return;
		}
		$.messager.progress({
			title : '提示',
			msg : '正在导出中，请稍候……'
		});     
		if(dltjChart!=''){
			//获取电量统计png源代码并转码
			dltjImage = encodeURIComponent(dltjChart.getDataURL({
		 		type :"png",
		 		pixelRatio:1,
		 		excludeComponents : ['toolbox']
			}));
		}else dltjImage = '';
		if(fhqsChart!=''){
			//获取负荷趋势png源代码并转码
			fhqsImage = encodeURIComponent(fhqsChart.getDataURL({
		 		type :"png",
		 		pixelRatio:1,
		 		excludeComponents : ['toolbox']
			}));
		}else fhqsImage = '';
		if(glyszsChart!=''){
			//获取功率因数走势png源代码并转码
			glyszsImage = encodeURIComponent(glyszsChart.getDataURL({
		 		type :"png",
		 		pixelRatio:1,
		 		excludeComponents : ['toolbox']
			}));
		}else glyszsImage = '';
		if(dftjChart!=''){
			//获取电费统计png源代码并转码
			dftjImage = encodeURIComponent(dftjChart.getDataURL({
		 		type :"png",
		 		pixelRatio:1,
		 		excludeComponents : ['toolbox']
			}));
		}else dftjImage = '';
		if(ynbg_sbnhChart!=''){
			//获取设备能耗png源代码并转码
			ynbg_sbnhImage = encodeURIComponent(ynbg_sbnhChart.getDataURL({
		 		type :"png",
		 		pixelRatio:1,
		 		excludeComponents : ['toolbox']
			}));
		}else ynbg_sbnhImage = '';
		if(ynbg_qynhChart!=''){
			//获取区域能耗png源代码并转码
			ynbg_qynhImage = encodeURIComponent(ynbg_qynhChart.getDataURL({
		 		type :"png",
		 		pixelRatio:1,
		 		excludeComponents : ['toolbox']
			}));
		}else ynbg_qynhImage = '';
		if(ynbg_xlnhChart!=''){
			//获取线路能耗png源代码并转码
			ynbg_xlnhImage = encodeURIComponent(ynbg_xlnhChart.getDataURL({
		 		type :"png",
		 		pixelRatio:1,
		 		excludeComponents : ['toolbox']
			}));
		}else ynbg_xlnhImage = '';
		if(ynbg_dyhglChartList.length>0){
			ynbg_dyhglImage = "";
			//获取电压合格率png源代码并转码
			for(var i in ynbg_dyhglChartList){
				ynbg_dyhglImage += encodeURIComponent(ynbg_dyhglChartList[i].getDataURL({
			 		type :"png",
			 		pixelRatio:1,
			 		excludeComponents : ['toolbox']
				})) + ",";
				ynbg_dyhglImage += dyhglTranId[i] + ",";
			}
			ynbg_dyhglImage = ynbg_dyhglImage.substr(0,ynbg_dyhglImage.length-1);
		}else ynbg_dyhglImage = '';
//		if(ynbg_dyhglChart!=''){
//			//获取电压合格率png源代码并转码
//			ynbg_dyhglImage = encodeURIComponent(ynbg_dyhglChart.getDataURL("png"));
//		}else ynbg_dyhglImage = '';
//		if(ynbg_sxdlbphChart!=''){
//			//获取三相电流不平衡png源代码并转码
//			ynbg_sxdlbphImage = encodeURIComponent(ynbg_sxdlbphChart.getDataURL("png"));
//		}else ynbg_sxdlbphImage = '';
		if(ynbg_sxdlbphChartList.length>0){
			//获取三相电流不平衡png源代码并转码
			ynbg_sxdlbphImage = "";
			for(var i in ynbg_sxdlbphChartList){
				ynbg_sxdlbphImage += encodeURIComponent(ynbg_sxdlbphChartList[i].getDataURL({
			 		type :"png",
			 		pixelRatio:1,
			 		excludeComponents : ['toolbox']
				})) + ",";
				ynbg_sxdlbphImage += tranId[i] + ",";
			}
			ynbg_sxdlbphImage = ynbg_sxdlbphImage.substr(0,ynbg_sxdlbphImage.length-1);
		}else ynbg_sxdlbphImage = '';
		if(ynbg_xbChartList!=null&&ynbg_xbChartList.length>0){
			//获取谐波png源代码并转码
			ynbg_xbImage = "";
			for(var i in ynbg_xbChartList){
				ynbg_xbImage += encodeURIComponent(ynbg_xbChartList[i].getDataURL({
			 		type :"png",
			 		pixelRatio:1,
			 		excludeComponents : ['toolbox']
				})) + ",";
				ynbg_xbImage += xbTranId[i] + ",";
			}
			ynbg_xbImage = ynbg_xbImage.substr(0,ynbg_xbImage.length-1);
		}else ynbg_xbImage = '';
		
		//发送数据url 
		$('#gridDiv').datagrid("exportExcel", {
			  url : webContextRoot+'export/exportynbg.action?dltjImage='+dltjImage+'&fhqsImage='+fhqsImage+
			  	'&glyszsImage='+glyszsImage+'&dftjImage='+dftjImage+'&consId='+consId+'&time='+$("#dataDate").val()+'&endTime='+$("#endDate").val()+
			  	'&sbnhImage='+ynbg_sbnhImage+'&qynhImage='+ynbg_qynhImage+'&xlnhImage='+ynbg_xlnhImage+'&dyhglImage='+ynbg_dyhglImage+
			  	'&sxdlbphImage='+ynbg_sxdlbphImage+'&xbImage='+ynbg_xbImage+'&ynbgLogo='+ynbg_logo
	   	});
		$.messager.progress('close');
	});
	
	//编辑
	$("#edit").click(function(){
		$("#edit").hide();
		$("#save").show();
		
		var content = "<div style='text-align:center'><a href='#fhText'>负荷</a></div>";
		content += "<div style='text-align:center'><a href='#dlText'>电量</a></div>";
		content += "<div style='text-align:center'><a href='#glysText'>功率因数</a></div>";
		content += "<div style='text-align:center'><a href='#dfText'>电费</a></div>";
		content += "<div style='text-align:center'><a href='#dyhglText'>电压合格率</a></div>";
		content += "<div style='text-align:center'><a href='#sxdlbphText'>三相电流不平衡</a></div>";
		content += "<div style='text-align:center'><a href='#xbText'>谐波</a></div>";
		content += "<div style='text-align:center'><a href='#dynhText'>单元能耗</a></div>";
		content += "<div style='text-align:center'><a href='#sbnhText'>设备能耗</a></div>";
		content += "<div style='text-align:center'><a href='#xlnhText'>线路能耗</a></div>";
		$("body").layout("add",{
			region: 'east',    
		    width: 100,    
		    title: '定位',    
		    split: true ,    
		    content : content
		});
		
		isEdit = true;
		//负荷建议语句
		var fhText = $("#fhText").text();
		$("#fhText").html("<input id='fhTextInput' />");
		$("#fhText").removeClass("p");
		$("#fhTextInput").textbox({
			width : '100%',
			height : 72,
			value : fhText,
			validType:'maxLength[200]',
			multiline : true
		});
		
		//功率因数建议语句
		var dlText = $("#dlText").text();
		$("#dlText").html("<input id='dlTextInput' />");
		$("#dlText").removeClass("p");
		$("#dlTextInput").textbox({
			width : '100%',
			height : 72,
			value : dlText,
			validType:'maxLength[200]',
			multiline : true
		});
		
		//功率因数建议语句
		var glysText = $("#glysText").text();
		$("#glysText").html("<input id='glysTextInput' />");
		$("#glysText").removeClass("p");
		$("#glysTextInput").textbox({
			width : '100%',
			height : 72,
			value : glysText,
			validType:'maxLength[200]',
			multiline : true
		});
		
		//电费建议语句
		var dfText = $("#dfText").text();
		$("#dfText").html("<input id='dfTextInput' />");
		$("#dfText").removeClass("p");
		$("#dfTextInput").textbox({
			width : '100%',
			height : 72,
			value : dfText,
			validType:'maxLength[200]',
			multiline : true
		});
		
		//电压合格率建议语句
		var dyhglText = $("#dyhglText").text();
		$("#dyhglText").html("<input id='dyhglTextInput' />");
		$("#dyhglText").removeClass("p");
		$("#dyhglTextInput").textbox({
			width : '100%',
			height : 72,
			value : dyhglText,
			validType:'maxLength[200]',
			multiline : true
		});
		
		//三相电流不平衡建议语句
		var sxdlbphText = $("#sxdlbphText").text();
		$("#sxdlbphText").html("<input id='sxdlbphTextInput' />");
		$("#sxdlbphText").removeClass("p");
		$("#sxdlbphTextInput").textbox({
			width : '100%',
			height : 72,
			value : sxdlbphText,
			validType:'maxLength[200]',
			multiline : true
		});
		
		//谐波建议语句
		var xbText = $("#xbText").text();
		$("#xbText").html("<input id='xbTextInput' />");
		$("#xbText").removeClass("p");
		$("#xbTextInput").textbox({
			width : '100%',
			height : 72,
			value : xbText,
			validType:'maxLength[200]',
			multiline : true
		});
		
		//单元能耗建议语句
		var dynhText = $("#dynhText").text();
		$("#dynhText").html("<input id='dynhTextInput' />");
		$("#dynhText").removeClass("p");
		$("#dynhTextInput").textbox({
			width : '100%',
			height : 72,
			value : dynhText,
			validType:'maxLength[200]',
			multiline : true
		});
		
		//设备能耗建议语句
		var sbnhText = $("#sbnhText").text();
		$("#sbnhText").html("<input id='sbnhTextInput' />");
		$("#sbnhText").removeClass("p");
		$("#sbnhTextInput").textbox({
			width : '100%',
			height : 72,
			value : sbnhText,
			validType:'maxLength[200]',
			multiline : true
		});
		
		//线路能耗建议语句
		var xlnhText = $("#xlnhText").text();
		$("#xlnhText").html("<input id='xlnhTextInput' />");
		$("#xlnhText").removeClass("p");
		$("#xlnhTextInput").textbox({
			width : '100%',
			height : 72,
			value : xlnhText,
			validType:'maxLength[200]',
			multiline : true
		});
		
	});
	
	//保存
	$("#save").click(function(){
		$.messager.progress({
			title : '提示',
			msg : '正在保存中，请稍候……'
		}); 
		
		var fhText = $("#fhTextInput").textbox('getValue');
		var dlText = $("#dlTextInput").textbox('getValue');
		var glysText = $("#glysTextInput").textbox('getValue');
		var dfText = $("#dfTextInput").textbox('getValue');
		var dyhglText = $("#dyhglTextInput").textbox('getValue');
		var sxdlbphText = $("#sxdlbphTextInput").textbox('getValue');
		var xbText = $("#xbTextInput").textbox('getValue');
		var dynhText = $("#dynhTextInput").textbox('getValue');
		var sbnhText = $("#sbnhTextInput").textbox('getValue');
		var xlnhText = $("#xlnhTextInput").textbox('getValue');
		//保存前验证
		if(fhText.length>200||dlText.length>200||glysText.length>200||dfText.length>200||dyhglText.length>200||
				sxdlbphText.length>200||xbText.length>200||dynhText.length>200||sbnhText.length>200||xlnhText.length>200){
			$.messager.alert('提示','请输入小于或等于200个字！');
			$.messager.progress('close');
			return;
		}
			
		//按键隐藏/显示
		$("#edit").show();
		$("#save").hide();
		$("body").layout("remove","east");
		isEdit = false;
		
		//负荷建议语句
		$("#fhText").addClass("p");
		$("#fhText").text(fhText);
		
		//电量建议语句
		$("#dlText").addClass("p");
		$("#dlText").text(dlText);
		
		//功率因数建议语句
		$("#glysText").addClass("p");
		$("#glysText").text(glysText);
		
		//电费建议语句
		$("#dfText").addClass("p");
		$("#dfText").text(dfText);
		
		//电压合格率建议语句
		$("#dyhglText").addClass("p");
		$("#dyhglText").text(dyhglText);
		
		//三相电流不平衡建议语句
		$("#sxdlbphText").addClass("p");
		$("#sxdlbphText").text(sxdlbphText);
		
		//谐波建议语句
		$("#xbText").addClass("p");
		$("#xbText").text(xbText);
		
		//单元能耗建议语句
		$("#dynhText").addClass("p");
		$("#dynhText").text(dynhText);
		
		//设备能耗建议语句
		$("#sbnhText").addClass("p");
		$("#sbnhText").text(sbnhText);
		
		//线路能耗建议语句
		$("#xlnhText").addClass("p");
		$("#xlnhText").text(xlnhText);
		
		$.ajax({	
			url:webContextRoot+'export/mergeAdviceText.action',
			data:{
				'yn.consId': consId,
				'yn.dataDate' : $("#dataDate").val(),
				'yn.endDate' : $("#endDate").val(),
				'yn.fh' : HTMLEncode(fhText),
				'yn.dl' : HTMLEncode(dlText),
				'yn.glys' : HTMLEncode(glysText),
				'yn.df' : HTMLEncode(dfText),
				'yn.dyhgl' : HTMLEncode(dyhglText),
				'yn.sxdlbph' : HTMLEncode(sxdlbphText),
				'yn.xb' : HTMLEncode(xbText),
				'yn.dynh' : HTMLEncode(dynhText),
				'yn.sbnh' : HTMLEncode(sbnhText),
				'yn.xlnh' : HTMLEncode(xlnhText)
			},
			dataType:'json',
			type:'post',
			success:function(result){
//				console.log(result);
				if(result.flag=='success'){
					$.messager.alert('提示','保存成功！');
				}else{
					$.messager.alert('提示','保存失败！');
				}
				$.messager.progress('close');
			}
		});
		
		//用能建议
		$("#ynjyText").html(ynjyHTML());
	});
	$("#save").hide();
	
	$(window).resizeEnd({delay:250},function(){
//		if(windowHeight!=$(window).height()||windowWidth != $(window).width()){
			echartResize();
//			windowHeight = $(window).height();
//			windowWidth = $(window).width();
//		}
	});
});

/**
 * chart对象 自适应
 */
function echartResize(){
	fhqsChart_show.resize();	//负荷趋势chart对象
	dltjChart_show.resize();	//电量统计chart对象
	glyszsChart_show.resize();//功率因数走势chart对象
	dftjChart_show.resize();//电费统计chart对象
//	ynbg_dyhglChart.resize();//电压合格率chart对象
	for(var i in ynbg_dyhglChartList_show){//电压合格率chart对象
		ynbg_dyhglChartList_show[i].resize();
	}
//	ynbg_sxdlbphChart.resize();//三相电流不平衡chart对象
	for(var i in ynbg_sxdlbphChartList_show){//三相电流不平衡chart对象
		ynbg_sxdlbphChartList_show[i].resize();
	}
	for(var i in ynbg_xbChartList_show){//谐波chart对象
		ynbg_xbChartList_show[i].resize();
	}
	ynbg_sbnhChart_show.resize();//设备用电chart对象
	ynbg_qynhChart_show.resize();//区域用电chart对象
	ynbg_xlnhChart_show.resize();//线路用电chart对象
}

/**
 * 加载文档
 */
function loadData(){
	//按键隐藏/显示
	$("#edit").show();
	$("#save").hide();
	$("body").layout("remove","east");
	isEdit = false;
	
	if(!document.getElementById("dataDateType").checked){
		var tempTime = $("#dataDateMonth").val()+"-01";
		$("#dataDate").val(tempTime);
		$("#endDate").val($("#dataDateMonth").val()+"-"+DateUtil.maxDayOfDate(DateUtil.strToDate(tempTime)));
	}
	
	var time = $("#dataDate").val();
	var endTime = $("#endDate").val();
	if(DateUtil.strToDate(time).getTime() > DateUtil.strToDate(endTime).getTime()){
		$.messager.alert('提示', '开始时间不能大于结束时间', 'warning');
		return;
	}
	
	$.messager.progress({
		title : '提示',
		msg : '正在加载中，请稍候……'
	}); 
	
	getChartFHQS(consId,time,endTime);
	getChartDLTJ(consId,time,endTime);
	getChartGLYSZS(consId,time,endTime);
	getChartDFTJ(consId,time,endTime);
	getChartDYHGL(consId,time,endTime);
	getChartSXDLBPH(consId,time,endTime);
	getChartYNPM(consId,time,endTime);
	getChartXLNH(consId,time,endTime);
	
	$.ajax({	
		url:webContextRoot+'export/exportynbg.action',
		data:{
			'consId': consId,
			'time' : time,
			'endTime' : endTime,
			'type' : 1 
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
//			console.log(result.xbList);
			//客户名称
			$("#baseInfo_consName").text(result.baseInfo.consName);
			//时间
			$("#sDate").text(result.sDate);
			//存在问题
			var existProblemList = "";
			for(var i in result.existProblemList){
				//{list.deviceName},${list.deviceAlarmName},${list.alarmDesc}${list.total}次
				var existProblem = result.existProblemList[i];
				existProblemList+="<li>"+existProblem.deviceName+","+existProblem.deviceAlarmName+","+
					existProblem.alarmDesc+","+existProblem.total+"次</li>";
			}
			$("#existProblemList").html(existProblemList);
			//服务内容   运维托管  业务申请  次数
			$("#businessListCount").text(result.businessListCount+"次");
			$("#operationsManageListCount").text(result.operationsManageListCount+"次");
			//服务内容
			var businessList = "";
			for(var i in result.businessList){
				//${list.dataDate}${list.type}${list.text}
				var business = result.businessList[i];
				businessList+="<li>"+business.dataDate+business.type+business.text+"</li>";
			}
			$("#businessList").html(businessList);
			//基本信息	
//			${baseInfo.consName}，户号：${baseInfo.consNo}，用电地址：${baseInfo.addr}，本期共${tranInfoList?size}
//			台变压器，总容量${totalPlateCap}kVA，电费执行：-，功率因数考核标准0.85。
			$("#baseInfo").html(result.baseInfo.consName+"，户号："+result.baseInfo.consNo+"，用电地址："+result.baseInfo.addr
					+"，本期共"+result.tranInfoList.length+"台变压器，总容量"+result.totalPlateCap+"kVA，电费执行：-，功率因数考核标准"+result.baseInfo.userCheckCos+"。"
			);
			$("#mpCount").html(result.mpCount);
			//用电概况  总体情况  企业总体用电情况
			$("#ydgk_maxValue").html(result.ydgk.maxValue);
			$("#ydgk_avgValue").html(result.ydgk.avgValue);
			$("#fhl").html(result.fhl);
			$("#glys").html(result.glys);
			//变压器用电情况
			var tranInfoList = "<colgroup><col width=\"16.66%\"/><col width=\"16.66%\"/><col width=\"16.66%\"/><col width=\"16.66%\"/><col width=\"16.66%\"/><col width=\"16.66%\"/></colgroup>"
						+"<tr><th>变压器</th><th>建筑</th><th>容量(kVA)</th><th>最大负载率(%)</th><th>平均负载率（%）</th><th>功率因数</th></tr>";
			//tranInfoList  ${list.tranName} ${list.plateCap} ${list.maxLoadrate} ${list.avgLoadrate} ${list.glysValue}
			for(var i in result.tranInfoList){
				var tranInfo = result.tranInfoList[i];
				tranInfoList += "<tr><td>"+tranInfo.tranName+"</td><td>"+tranInfo.subsName+"</td><td>"+tranInfo.plateCap+"</td><td>"+tranInfo.maxLoadrate+"</td><td>"+
							tranInfo.avgLoadrate+"</td><td>"+tranInfo.glysValue+"</td><tr>";
			}
			$("#tranInfoList").html(tranInfoList);
			
			//负荷 
			$("#fhgk_maxValue").html(result.fhgk.maxValue);
			$("#fhgk_maxDate").html(result.fhgk.maxDate);
			$("#fhgk_minValue").html(result.fhgk.minValue);
			$("#fhgk_minDate").html(result.fhgk.minDate);
			$("#fhgk_avgValue").html(result.fhgk.avgValue);
			$("#fhText").html(result.adviceText.fh);
			
			//电量
			$("#energyInfo_sumEnergyP").html(result.energyInfo.sumEnergyP);
			$("#energyInfo_hb").html(result.energyInfo.hb);
			$("#energyInfo_tb").html(result.energyInfo.tb);
			$("#energyInfo_sumPapR2").html(result.energyInfo.sumPapR2);
			$("#energyInfo_zbR2").html(result.energyInfo.zbR2);
			$("#energyInfo_sumPapR3").html(result.energyInfo.sumPapR3);
			$("#energyInfo_zbR3").html(result.energyInfo.zbR3);
			$("#energyInfo_sumPapR4").html(result.energyInfo.sumPapR4);
			$("#energyInfo_zbR4").html(result.energyInfo.zbR4);
			$("#dlText").html(result.adviceText.dl);
			
			//功率因数
			$("#glyskhbz").text(result.baseInfo.userCheckCos);
			$("#glysText").html(result.adviceText.glys);
			
			//电费
			$("#dfText").html(result.adviceText.df);
			
			//电压合格率
			$("#dyhglText").html(result.adviceText.dyhgl);
			
			//三相电流不平衡
			$("#sxdlbphText").html(result.adviceText.sxdlbph);
			
			//谐波
			var xb = '';
			if(result.baseInfo.areaNo == '101'){
				for(var i in result.xbList){
					xb += '<div id="ynbg_xb_show'+result.xbList[i].tranId+'" class="img1"></div>';
					xb += '<div style="display:none;"><div id="ynbg_xb'+result.xbList[i].tranId+'" class="img"></div></div>';
					xb += '<div class="content2" style="text-align:center">图：谐波('+result.xbList[i].subsName+'——'+result.xbList[i].tranName+')</div>';
				}
				$("#xb").html(xb);
				getChartXB(result.xbList);
			}else{
				for(var i = 0;i < result.ConsXBList.length; i++){
					var obj = result.ConsXBList[i];
					xb += '<div class="title2">3.'+(i+1)+')'+obj.tranName+'：</div>';
					xb += '<div class="content2"> <table class="table"> <colgroup> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/>'+
					'<col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> </colgroup>';
					xb += '<tr><td>内容</td><td>3次(%)</td><td>5次(%)</td><td>7次(%)</td><td>11次(%)</td><td>13次(%)</td><td>U畸变率</td><td>3次(A)</td><td>5次(A)</td><td>7次(A)</td><td>11次(A)</td><td>13次(A)</td></tr>';
					xb += '<tr><td>最大值</td><td>'+obj.maxU3+'</td><td>'+obj.maxU5+'</td><td>'+obj.maxU7+'</td><td>'+obj.maxU11+'</td><td>'+obj.maxU13+'</td><td>'+obj.maxUTHD+'</td><td>'+obj.maxI3+'</td><td>'+obj.maxI5+'</td><td>'+obj.maxI7+'</td><td>'+obj.maxI11+'</td><td>'+obj.maxI13+'</td></tr>';
					xb += '<tr><td>平均值</td><td>'+obj.avgU3+'</td><td>'+obj.avgU5+'</td><td>'+obj.avgU7+'</td><td>'+obj.avgU11+'</td><td>'+obj.avgU13+'</td><td>'+obj.avgUTHD+'</td><td>'+obj.avgI3+'</td><td>'+obj.avgI5+'</td><td>'+obj.avgI7+'</td><td>'+obj.avgI11+'</td><td>'+obj.avgI13+'</td></tr>';
					xb += '<tr><td>标准限值</td><td>4.0%</td><td>4.0%</td><td>4.0%</td><td>4.0%</td><td>4.0%</td><td>5.0%</td><td>62</td><td>62</td><td>44</td><td>28</td><td>24</td></tr>';
					xb += '</table></div>';
				}
				$("#xb").html(xb);
			}
			$("#xbText").html(result.adviceText.xb);
			
			//用能评估
			$("#subsEnergyValueTotal").html(result.subsEnergyValueTotal);
			$("#dynhText").html(result.adviceText.dynh);
			$("#subsBM").html(result.subsBM);
			$("#devEnergyValueTotal").html(result.devEnergyValueTotal);
			$("#sbnhText").html(result.adviceText.sbnh);
			$("#devBM").html(result.devBM);
			$("#lineEnergyValueTotal").html(result.lineEnergyValueTotal);
			$("#xlnhText").html(result.adviceText.xlnh);
			$("#lineBM").html(result.lineBM);
			
			//行业对标
			//行业用电
			$("#hyCons_hy").html("("+result.hyCons.codeName+")");
			$("#hyCons_tb").html(result.hyCons.tb);
			$("#hyCons_hb").html(result.hyCons.hb);
			$("#hyCons_hyAvgEnergy").html(result.hyCons.hyAvgEnergy);
			$("#hyCons_energyP").html(result.hyCons.energyP);
			//上下游行业趋势
			var hyTable = '<table class="table"><colgroup><col width="20%"/><col width="16%"/><col width="16%"/><col width="16%"/><col width="16%"/><col width="16%"/></colgroup>';
			hyTable += '<tr><th>行业名称</th><th>本期用电(kWh)</th><th>上期用电(kWh)</th><th>去年同期(kWh)</th><th>环比</th><th>同比</th></tr>';
			//上游行业
			if(result.hyUp.length>0){
				var hyUp = '表：上游行业'+hyTable;
				for(var i in result.hyUp){
					hyUp += '<tr><td>'+result.hyUp[i].codeName+'</td><td>'+result.hyUp[i].energyP+'</td><td>'+result.hyUp[i].lastMonthEnergyP+'</td><td>'+result.hyUp[i].lastYearEnergyP+'</td><td>'+result.hyUp[i].hb+'</td><td>'+result.hyUp[i].tb+'</td></tr>';
				}
				hyUp += '</table>';
				$("#hyUp").html(hyUp);
			}
			//下游行业
			if(result.hyDown.length>0){
				var hyDown = '表：下游行业'+hyTable;
				for(var i in result.hyDown){
					hyDown += '<tr><td>'+result.hyDown[i].codeName+'</td><td>'+result.hyDown[i].energyP+'</td><td>'+result.hyDown[i].lastMonthEnergyP+'</td><td>'+result.hyDown[i].lastYearEnergyP+'</td><td>'+result.hyDown[i].hb+'</td><td>'+result.hyDown[i].tb+'</td></tr>';
				}
				hyDown += '</table>';
				$("#hyDown").html(hyDown);
			}
			
			
			//用能建议
			$("#ynjyText").html(ynjyHTML());
			
			//附表
			$("#fb_consName").html(result.baseInfo.consName);
			$("#fb_lineCount").html(result.lineCount);
			$("#fb_sDate").html(result.sDate);
			var fb_table = '<table class="table">';
			for(var i in result.yddlbb){
				fb_table += '<tr>';
				for(var j in result.yddlbb[i]){
					fb_table += '<td>'+result.yddlbb[i][j]+'</td>';
				}
				fb_table += '</tr>';
			}
			fb_table += '</table>';
			$("#fb_sDate").html(fb_table);
			
			$.messager.progress('close');
		}
	});
}

/**
 * 用能建议  建议语句
 * @returns {String}
 */
function ynjyHTML(){
	var html = '<ol>';
	//负荷建议语句
	var fhText = $("#fhText").text();
	//电量建议语句
	var dlText = $("#dlText").text();
	//功率因数建议语句
	var glysText = $("#glysText").text();
	//电费建议语句
	var dfText = $("#dfText").text();
	//电压合格率建议语句
	var dyhglText = $("#dyhglText").text();
	//三相电流不平衡建议语句
	var sxdlbphText = $("#sxdlbphText").text();
	//谐波建议语句
	var xbText = $("#xbText").text();
	//单元能耗建议语句
	var dynhText = $("#dynhText").text();
	//设备能耗建议语句
	var sbnhText = $("#sbnhText").text();
	//线路能耗建议语句
	var xlnhText = $("#xlnhText").text();
	
	if(fhText.length>0){
		html += '<li>'+HTMLEncode(fhText)+'</li>';
	}
	if(dlText.length>0){
		html += '<li>'+HTMLEncode(dlText)+'</li>';
	}
	if(glysText.length>0){
		html += '<li>'+HTMLEncode(glysText)+'</li>';
	}
	if(dfText.length>0){
		html += '<li>'+HTMLEncode(dfText)+'</li>';
	}
	if(dyhglText.length>0){
		html += '<li>'+HTMLEncode(dyhglText)+'</li>';
	}
	if(sxdlbphText.length>0){
		html += '<li>'+HTMLEncode(sxdlbphText)+'</li>';
	}
	if(xbText.length>0){
		html += '<li>'+HTMLEncode(xbText)+'</li>';
	}
	if(dynhText.length>0){
		html += '<li>'+HTMLEncode(dynhText)+'</li>';
	}
	if(sbnhText.length>0){
		html += '<li>'+HTMLEncode(sbnhText)+'</li>';
	}
	if(xlnhText.length>0){
		html += '<li>'+HTMLEncode(xlnhText)+'</li>';
	}
	html += '</ol>';
	return html;	
}

/**
 * 负荷趋势
 */
function getChartFHQS(consId,ynbgTime,endTime){
	$.ajax({	
		url:webContextRoot+'export/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'fhqs',
			'time' : ynbgTime,
			'endTime' : endTime
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				var x = [];//时间
				var y1 = [];//平均负荷
				var y2 = [];//最大负荷
				var y3 = [];//最小负荷
				if(result.type=='1'){
					for(var i in result.data){
						x.push(result.data[i].dataDate);
						y1.push(result.data[i].avgValue);
					}
					var option = {
						    title: {
						        x:'center'
						    },
						    animation:false,
						    tooltip: {
						        trigger: 'axis',
						        formatter: function(params) {
						    		if(params!=null && params[0]!=null){
						    			var paramResult = "";
						    			paramResult += "时间：" + params[0].name + "<br/>";
						    			for(var i = 0; i < params.length; i++){
						    				paramResult += params[i].seriesName+"："+params[i].value + "kW<br/>";
						    			}
					    				return paramResult;
						    		}
						    	}
						    },
						    grid : {
//								left: '3%',
//						        right: '3%',
//								bottom : '3%',
//								containLabel : true
						    	x : 85, //左边距离
								y : 75,//上边距离
								x2 : 35,//右边距离
								y2 : 35//下边距离
							},
						    legend: {
						        data:['负荷'],
//						        textStyle:{fontSize:20},
						        y:28
						    },
						    xAxis:  {
						        type: 'category',
						        boundaryGap:false,
//						        nameTextStyle: {fontSize:20},
//						    	axisLabel:{
//						    		textStyle:{show:true,fontSize:20}
//						    	},
						        data: x
						    },
						    yAxis:[{
						            name: '单位(kW)',
						            type: 'value',
//						            nameTextStyle: {fontSize:20},
//						        	axisLabel:{
//						        		textStyle:{show:true,fontSize:20}
//						        	}
						        }],
						    series: [
						        {
						            name:'负荷',
						            type:'line',
						            data: y1
						        }
						    ]
						};
					//初始化echart
					fhqsChart_show = echarts.init(document.getElementById('fhqs_show'));
					fhqsChart = echarts.init(document.getElementById('fhqs'));
					//配置echart
					fhqsChart_show.setOption(option,true);
					fhqsChart.setOption(option,true);
					//重设echart大小
//					fhqsChart.resize(ops);
					//加载完成变量
//					fhqsBoolean = true;
				}else{
					for(var i in result.data){
						x.push(result.data[i].dataDate);
						y1.push(result.data[i].avgValue);
						y2.push(result.data[i].maxValue);
						y3.push(result.data[i].minValue);
					}
					var option = {
						    title: {
						        x:'center'
						    },
						    animation:false,
						    tooltip: {
						        trigger: 'axis',
						        formatter: function(params) {
						        	if(params!=null && params[0]!=null){
						    			var paramResult = "";
						    			paramResult += "时间：" + params[0].name + "<br/>";
						    			for(var i = 0; i < params.length; i++){
						    				paramResult += params[i].seriesName+"："+params[i].value + "kW<br/>";
						    			}
					    				return paramResult;
						    		}
						    	}
						    },
						    grid : {
//								left: '3%',
//						        right: '3%',
//								bottom : '3%',
//								containLabel : true
						    	x : 85, //左边距离
								y : 75,//上边距离
								x2 : 35,//右边距离
								y2 : 35//下边距离
							},
						    legend: {
						        data:['平均负荷','最大负荷','最小负荷'],
//						        textStyle:{fontSize:20},
						        y:28
						    },
						    xAxis:  {
						        type: 'category',
						        boundaryGap:false,
//						        nameTextStyle: {fontSize:20},
//						        axisLabel:{
//						        	textStyle:{show:true,fontSize:20}
//						        },
						        data: x
						    },
						    yAxis:[{
						            name: '单位(kW)',
						            type: 'value',
//						            nameTextStyle: {fontSize:20},
//						            axisLabel:{
//							        	textStyle:{show:true,fontSize:20}
//							        }
						        }],
						    series: [
						        {
						            name:'平均负荷',
						            type:'line',
						            data: y1
						        },
						        {
						            name:'最大负荷',
						            type:'line',
						            data: y2
						        },
						        {
						            name:'最小负荷',
						            type:'line',
						            data: y3
						        }
						    ]
						};
					//初始化echart
					fhqsChart_show = echarts.init(document.getElementById('fhqs_show'));
					fhqsChart = echarts.init(document.getElementById('fhqs'));
					//配置echart
					fhqsChart_show.setOption(option,true);
					fhqsChart.setOption(option,true);
					//重置echart大小
//					fhqsChart.resize(ops);
					//加载完成变量
//					fhqsBoolean = true;
				}
			}
		}
	});
}

/**
 * 电量统计报表
 */
function getChartDLTJ(consId,ynbgTime,endTime){
	$.ajax({	
		url:webContextRoot+'export/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'dltj',
			'time' : ynbgTime,
			'endTime' : endTime
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				var x = [];
				var y1 = [];
				var y2 = [];
				var y3 = [];
//				for(var i = result.data.length-1 ; i>=0 ;i--){
				for(var i in result.data){
					x.push(result.data[i].dataDate);//时间
					y1.push(result.data[i].papR2);//峰电量
					y2.push(result.data[i].papR3);//平电量
					y3.push(result.data[i].papR4);//谷电量
				}
				var option = {
					    title: {
					        x:'center'
					    },
					    tooltip: {
					        trigger: 'axis',
					        formatter: function(params) {
					        	if(params!=null && params[0]!=null){
					    			var paramResult = "";
					    			paramResult += "时间：" + params[0].name + "<br/>";
					    			for(var i = 0; i < params.length; i++){
					    				paramResult += params[i].seriesName+"："+params[i].value + "kWh<br/>";
					    			}
				    				return paramResult;
					    		}
					    	}
					    },
					    grid : {
//							left: '3%',
//					        right: '3%',
//							bottom : '3%',
//							containLabel : true
					    	x : 85, //左边距离
							y : 75,//上边距离
							x2 : 35,//右边距离
							y2 : 35//下边距离
						},
					    legend: {
					        data:['峰电量','平电量','谷电量'],
//					        textStyle:{fontSize:20},
					        y:28
					    },
					    xAxis:  {
					        type: 'category',
//					        nameTextStyle: {fontSize:20},
//					    	axisLabel:{
//					    		textStyle:{show:true,fontSize:20}
//					    	},
					        data: x
					    },
					    yAxis:[{
					            name: '单位(kWh)',
					            type: 'value',
//					            nameTextStyle: {fontSize:20},
//					        	axisLabel:{
//					        		textStyle:{show:true,fontSize:20}
//					        	}
					        }],
					    series: [
					        {
					            name:'峰电量',
					            type:'bar',
					            stack:'总量',
					            data:y1
					        },
					        {
					            name:'平电量',
					            type:'bar',
					            stack:'总量',
					            data:y2
					        },
					        {
					            name:'谷电量',
					            type:'bar',
					            stack:'总量',
					            data:y3
					        }
					    ]
					};
				//初始化echart
				dltjChart_show = echarts.init(document.getElementById('dltj_show'));
				dltjChart = echarts.init(document.getElementById('dltj'));
				//配置echart
				dltjChart_show.setOption(option,true);
				dltjChart.setOption(option,true);
				//重设echart大小
//				dltjChart.resize(ops);
				//加载完成变量
//				dltjBoolean = true;
			}
		}
	});
}
/**
 * 功率因数走势
 */
function getChartGLYSZS(consId,ynbgTime,endTime){
	$.ajax({	
		url:webContextRoot+'export/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'glyszs',
			'time' : ynbgTime,
			'endTime' : endTime
		},
		dataType:'json',
		type:'post',
		success:function(result){
			if(result.flag=='success'){
				var x = [];
				var y = [];
				for(var i = result.data.length-1 ; i>=0 ;i--){
					x.push(result.data[i].dataDate);//时间
					if(result.data[i].glysValue!=null&&result.data[i].glysValue!=''&&result.data[i].glysValue!='-'){
						y.push(parseFloat(result.data[i].glysValue));//功率因数
					}else{
						y.push(result.data[i].glysValue);//功率因数
					}
				}
				var option = {
					    title: {
					        x:'center'
					    },
					    tooltip: {
					        trigger: 'axis',
					        formatter: function(params) {
					        	if(params!=null && params[0]!=null){
					    			var paramResult = "";
					    			paramResult += "时间：" + params[0].name + "<br/>";
					    			for(var i = 0; i < params.length; i++){
					    				paramResult += params[i].seriesName+"："+params[i].value + "<br/>";
					    			}
				    				return paramResult;
					    		}
					    	}
					    },
					    grid : {
//							left: '3%',
//					        right: '3%',
//							bottom : '3%',
//							containLabel : true
					    	x : 85, //左边距离
							y : 75,//上边距离
							x2 : 35,//右边距离
							y2 : 35//下边距离
						},
					    legend: {
					        data:['功率因数'],
//					        textStyle:{fontSize:20},
					        y:28
					    },
					    xAxis:  {
					        type: 'category',
					        boundaryGap:false,
//					        nameTextStyle: {fontSize:20},
//					    	axisLabel:{
//					    		textStyle:{show:true,fontSize:20}
//					    	},
					        data: x
					    },
					    yAxis:[{
					            name: '单位(因数)',
					            type: 'value',
//					            nameTextStyle: {fontSize:20},
//					        	axisLabel:{
//					        		textStyle:{show:true,fontSize:20}
//					        	},
					            min: '0.6'
					        }],
					    series: [
					        {
					            name:'功率因数',
					            type:'line',
					            data:y
					        }
					    ]
					};
				//初始化echart
				glyszsChart_show = echarts.init(document.getElementById('glyszs_show'));
				glyszsChart = echarts.init(document.getElementById('glyszs'));
				//配置echart
				glyszsChart_show.setOption(option,true);
				glyszsChart.setOption(option,true);
				//重设echart大小
//				glyszsChart.resize(ops);
				//加载完成变量
//				glyszsBoolean = true;
			}
		}
	});
}
/**
 * 电费统计
 */
function getChartDFTJ(consId,time,endTime){
	$.ajax({	
		url:webContextRoot+'export/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'dftj',
			'time' : time,
			'endTime' : endTime
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			if(result.flag=='success'){
				var option = {
					    title: {
					        x:'center'
					    },
					    tooltip: {
					        trigger: 'axis',
					        formatter: function(params) {
					        	if(params!=null && params[0]!=null){
					    			var paramResult = "";
					    			paramResult += "时间：" + params[0].name + "<br/>";
					    			for(var i = 0; i < params.length; i++){
					    				paramResult += params[i].seriesName+"："+params[i].value + "万元<br/>";
					    			}
				    				return paramResult;
					    		}
					    	}
					    },
					    grid : {
//							left: '3%',
//					        right: '3%',
//							bottom : '3%',
//							containLabel : true
					    	x : 85, //左边距离
							y : 75,//上边距离
							x2 : 35,//右边距离
							y2 : 35//下边距离
						},
					    legend: {
					        data:['总电费','电度电费','基本电费','力调电费'],
//					        textStyle:{fontSize:20},
					        y:28
					    },
					    xAxis:  {
					        type: 'category',
//					        nameTextStyle: {fontSize:20},
//					    	axisLabel:{
//					    		textStyle:{show:true,fontSize:20}
//					    	},
					        data: result.data.dataDate
					    },
					    yAxis:[{
					            name: '单位(万元)',
					            type: 'value',
//					            nameTextStyle: {fontSize:20},
//					        	axisLabel:{
//					        		textStyle:{show:true,fontSize:20}
//					        	}
					        }],
					    series: [
					        {
					            name:'总电费',
					            type:'bar',
					            stack:'总量',
					            data:result.data.feeTotal
					        },
					        {
					            name:'电度电费',
					            type:'bar',
					            stack:'总量',
					            data:result.data.feeDd
					        },
					        {
					            name:'基本电费',
					            type:'bar',
					            stack:'总量',
					            data:result.data.feeJb
					        },
					        {
					            name:'力调电费',
					            type:'bar',
					            stack:'总量',
					            data:result.data.feeLt
					        }
					    ]
					};
				//初始化
				dftjChart_show = echarts.init(document.getElementById('dftj_show'));
				dftjChart = echarts.init(document.getElementById('dftj'));
				dftjChart_show.setOption(option,true);
				dftjChart.setOption(option,true);
//				dftjChart.resize(ops);
//				dftjBoolean = true;
			}
		}
	});
}

/**
 * 电压合格率
 */
function getChartDYHGL(consId,time,endTime){
	dyhglTranId = new Array();
	ynbg_dyhglChartList = new Array();
	ynbg_dyhglChartList_show = new Array();
	
	$.ajax({	
		url:webContextRoot+'export/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'dyhgl',
			'time' : time,
			'endTime' : endTime
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			var html = "";
			for(var i in result.data){
				html += '<div id="ynbg_dyhgl_show_'+result.data[i].tranId+'" class="img1"></div>';
				html += '<div style="display:none;"><div id="ynbg_dyhgl_'+result.data[i].tranId+'" class="img"></div></div>';
				html += '<div class="content2" style="text-align:center">图：电压合格率('+result.data[i].subsName+'——'+result.data[i].tranName+')</div>';
				html += '<div class="content1" style="position: relative;left:48px;">结论：<div id="dyhglText_'+result.data[i].tranId+'" style="position: relative;left:48px;"></div></div>';
				dyhglTranId.push(result.data[i].tranId);
			}
			$("#ynbg_dyhgl").html(html);		
			for(var i in result.data){
				var dataDate = result.data[i].dataDate;
				var series = new Array();
				var legendData = new Array();
				var text = "";
				for(var j in result.data[i].bs){
					legendData.push(result.data[i].bs[j].bsName);
					var obj = new Object();
					obj.name = result.data[i].bs[j].bsName;
					obj.type = 'line';
					obj.symbol = 'circle';
					obj.data = result.data[i].bs[j].qualifidRate;
					series.push(obj);
					text += result.data[i].bs[j].bsName+"当月电压平均合格率为"+result.data[i].bs[j].avgValue+"%;<br/>";
				}
				text = text.substr(0,text.length-6)+"。<br/>";
				$("#dyhglText_"+result.data[i].tranId).html(text);
				
				var option = {
						legend: {
							data: legendData,
//							textStyle:{fontSize:20},
							x:'center',
							y:'35'
						},
						tooltip: {
							trigger: 'axis',
					        formatter: function(params) {
					        	if(params!=null && params[0]!=null){
					    			var paramResult = "";
					    			paramResult += "时间：" + params[0].name + "<br/>";
					    			for(var i = 0; i < params.length; i++){
					    				paramResult += params[i].seriesName+"："+params[i].value + "%<br/>";
					    			}
				    				return paramResult;
					    		}
					    	}
						},
						//设置grid位置
						grid : {
							x : 55, //左边距离
							y : 75,//上边距离
							x2 : 35,//右边距离
							y2 : 35//下边距离
						},
						xAxis:  {
							type: 'category',
							boundaryGap:false,
//							nameTextStyle: {fontSize:20},
//							axisLabel:{
//								textStyle:{show:true,fontSize:20}
//							},
							data : dataDate
						},
						yAxis: [
						        {
						        	name: '合格率(%)',
						        	type: 'value',
//						        	nameTextStyle: {fontSize:20},
//						        	axisLabel:{
//						        		textStyle:{show:true,fontSize:20}
//						        	},
						        	min:'0',
						        	max:'auto'
						        }
						        ],
						        series: series
				};
				//初始化echart
				ynbg_dyhglChart_show = echarts.init(document.getElementById('ynbg_dyhgl_show_'+result.data[i].tranId));
				ynbg_dyhglChart = echarts.init(document.getElementById('ynbg_dyhgl_'+result.data[i].tranId));
				//配置echart
				ynbg_dyhglChart_show.setOption(option,true);
				ynbg_dyhglChart.setOption(option,true);
				
				ynbg_dyhglChartList_show.push(ynbg_dyhglChart_show);
				ynbg_dyhglChartList.push(ynbg_dyhglChart);
			}
		}
	});
}

/**
 * 三相电流不平衡
 */
function getChartSXDLBPH(consId,ynbgTime,endTime){
	tranId = new Array();
	tranName = new Array();
	subsName = new Array();
	ynbg_sxdlbphChartList = new Array();
	ynbg_sxdlbphChartList_show = new Array();
	$("#ynbg_sxdlbph").html("");
	
	$.ajax({	
		url:webContextRoot+'export/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'sxdlbph',
			'time' : ynbgTime,
			'endTime' : endTime
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			
			var x = [];//时间
			var yIa1 = [];//平均负荷
			var yIa2 = [];//最大负荷
			var yIa3 = [];//最小负荷
			
			var yIb1 = [];//平均负荷
			var yIb2 = [];//最大负荷
			var yIb3 = [];//最小负荷
			
			var yIc1 = [];//平均负荷
			var yIc2 = [];//最大负荷
			var yIc3 = [];//最小负荷
			var iDegreeBalance = [];//平衡度
			var flag = false; //判断是否有数据
			
			if(result.type=='1'){
				for(var i in result.data){
					flag = result.data[i].flag;
					x = result.data[i].x;
					yIa1 = result.data[i].yIa1;//平均负荷
					yIb1 = result.data[i].yIb1;//平均负荷
					yIc1 = result.data[i].yIc1;//平均负荷
					
					tranId.push(result.data[i].tranId);
					tranName.push(result.data[i].tranName);
					subsName.push(result.data[i].subsName);
				
					if(flag){
						html = '<div id="ynbg_sxdlbph_show_'+tranId[tranId.length-1]+'" class="img1"></div>';
						html += '<div style="display:none;"><div id="ynbg_sxdlbph_'+tranId[tranId.length-1]+'" class="img"></div></div>';
						html += '<div id="ynbg_sxdlbph_title_'+tranId[tranId.length-1]+'" class="content2" style="text-align:center">图：三相电流不平衡</div>';
						$("#ynbg_sxdlbph").append(html);
						$("#ynbg_sxdlbph_title_"+tranId[tranId.length-1]).text("图：三相电流不平衡("+subsName[subsName.length-1]+"——"+tranName[tranName.length-1]+")");
						
						var option = {
								legend: {
									data: ['A相电流','B相电流','C相电流'],
//									textStyle:{fontSize:20},
									x:'center',
									y:'35'
								},
								tooltip: {
							        trigger: 'axis',
							        formatter: function(params) {
							        	if(params!=null && params[0]!=null){
							    			var paramResult = "";
							    			paramResult += "时间：" + params[0].name + "<br/>";
							    			for(var i = 0; i < params.length; i++){
						    					paramResult += params[i].seriesName+"："+params[i].value + "A<br/>";
							    			}
						    				return paramResult;
							    		}
							    	}
							    },
								//设置grid位置
								grid : {
									x : 55, //左边距离
									y : 75,//上边距离
									x2 : 55,//右边距离
									y2 : 35//下边距离
								},
								xAxis:  {
									type: 'category',
									boundaryGap:false,
//									nameTextStyle: {fontSize:20},
//									axisLabel:{
//										textStyle:{show:true,fontSize:20}
//									},
									data : x
								},
								yAxis: [
								        {
								        	name: '电流(A)',
								        	type: 'value',
//								        	nameTextStyle: {fontSize:20},
//								        	axisLabel:{
//								        		textStyle:{show:true,fontSize:20}
//								        	},
								        	min:'0',
								        	max:'auto'
								        }
								        ],
								        series: [
								                 {
								                	 name: 'A相电流',
								                	 type: 'line',
								                	 symbol: 'circle',
								                	 data:yIa1,//数据,
								                	 itemStyle: {
//								                		 normal: {
//								                			 barBorderRadius: 0,
//								                			 color:'#FF6E63'
//								                		 }
								                	 }
								                 },
								                 {
								                	 name: 'B相电流',
								                	 type: 'line',
								                	 symbol: 'circle',
								                	 data:yIb1,//数据,
								                	 itemStyle: {
//								                		 normal: {
//								                			 barBorderRadius: 0,
//								                			 color:'#FF6E63'
//								                		 }
								                	 }
								                 },
								                 {
								                	 name: 'C相电流',
								                	 type: 'line',
								                	 symbol: 'circle',
								                	 data:yIc1,//数据,
								                	 itemStyle: {
//								                		 normal: {
//								                			 barBorderRadius: 0,
//								                			 color:'#FF6E63'
//								                		 }
								                	 }
								                 }
								                 
								                 ]
									};
									//初始化echart
									ynbg_sxdlbphChart_show = echarts.init(document.getElementById('ynbg_sxdlbph_show_'+tranId[tranId.length-1]));
									ynbg_sxdlbphChart = echarts.init(document.getElementById('ynbg_sxdlbph_'+tranId[tranId.length-1]));
									//配置echart
									ynbg_sxdlbphChart_show.setOption(option,true);
									ynbg_sxdlbphChart.setOption(option,true);
									
									ynbg_sxdlbphChartList_show.push(ynbg_sxdlbphChart_show);
									ynbg_sxdlbphChartList.push(ynbg_sxdlbphChart);
					}
					
					flag = false;
					x = [];
					yIa1 = [];//平均负荷
					yIb1 = [];//平均负荷
					yIc1 = [];//平均负荷
				}
				
			}else if(result.type=='2'){
				for(var i in result.data){
					flag = result.data[i].flag;
					x = result.data[i].x;
					yIa1 = result.data[i].yIa1;
					yIa2 = result.data[i].yIa2;
					yIa3 = result.data[i].yIa3;
					yIb1 = result.data[i].yIb1;
					yIb2 = result.data[i].yIb2;
					yIb3 = result.data[i].yIb3;
					yIc1 = result.data[i].yIc1;
					yIc2 = result.data[i].yIc2;
					yIc3 = result.data[i].yIc3;
					iDegreeBalance = result.data[i].iDegreeBalance;//平均负荷
					
					tranId.push(result.data[i].tranId);
					tranName.push(result.data[i].tranName);
					subsName.push(result.data[i].subsName);
					
					var col = '<colgroup><col width="25%"/><col width="25%"/><col width="25%"/><col width="25%"/></colgroup>';
					if(flag){
						html = '<div id="ynbg_sxdlbph_show_'+tranId[tranId.length-1]+'" class="img1"></div>';
						html += '<div style="display:none;"><div id="ynbg_sxdlbph_'+tranId[tranId.length-1]+'" class="img"></div></div>';
						html += '<div id="ynbg_sxdlbph_title_'+tranId[tranId.length-1]+'" class="content2" style="text-align:center">图：三相电流不平衡</div>';
						html += '<div class="content2">表：三相电流不平衡('+subsName[subsName.length-1]+'——'+tranName[tranName.length-1]+')'+
							'<table class="table">'+col+'<tr><th>内容</th><th>A相电流</th><th>B相电流</th><th>C相电流</th></tr>'+
							'<tr><td id="">最大值</td><td id="">'+result.data[i].maxIa+'</td><td id="">'+result.data[i].maxIb+'</td><td id="">'+result.data[i].maxIc+'</td></tr>'+
							'<tr><td id="">最小值</td><td id="">'+result.data[i].minIa+'</td><td id="">'+result.data[i].minIb+'</td><td id="">'+result.data[i].minIc+'</td></tr></table>'+
							'</div>';
						
						$("#ynbg_sxdlbph").append(html);
						$("#ynbg_sxdlbph_title_"+tranId[tranId.length-1]).text("图：三相电流不平衡("+subsName[subsName.length-1]+"——"+tranName[tranName.length-1]+")");
						
						var option = {
								legend: {
//									data: ['A相平均值','A相最大值','A相最小值',
//									       'B相平均值','B相最大值','B相最小值',
//									       'C相平均值','C相最大值','C相最小值','不平衡度'],
							       data: ['A相电流','B相电流','C相电流','不平衡度'],
//							       textStyle:{fontSize:20},
									x:'center',
									y:'25'
								},
								tooltip: {
							        trigger: 'axis',
							        formatter: function(params) {
							        	if(params!=null && params[0]!=null){
							    			var paramResult = "";
							    			paramResult += "时间：" + params[0].name + "<br/>";
							    			for(var i = 0; i < params.length; i++){
							    				if(i == params.length - 1){
							    					paramResult += params[i].seriesName+"："+params[i].value + "%<br/>";
							    				}else{
							    					paramResult += params[i].seriesName+"："+params[i].value + "A<br/>";
							    				}
							    			}
						    				return paramResult;
							    		}
							    	}
							    },
								//设置grid位置
								grid : {
									x : 55, //左边距离
									y : 75,//上边距离
									x2 : 55,//右边距离
									y2 : 35//下边距离
								},
								xAxis:  {
									type: 'category',
									boundaryGap:false,
//									nameTextStyle: {fontSize:20},
//									axisLabel:{
//										textStyle:{show:true,fontSize:20}
//									},
									data : x
								},
								yAxis: [
								        {
								        	name: '电流(A)',
								        	type: 'value',
//								        	nameTextStyle: {fontSize:20},
//								        	axisLabel:{
//								        		textStyle:{show:true,fontSize:20}
//								        	},
								        	min:'0',
								        	max:'auto'
								        },
								        {
								        	name: '不平衡度(%)',
								        	type: 'value',
//								        	nameTextStyle: {fontSize:20},
//								        	axisLabel:{
//								        		textStyle:{show:true,fontSize:20}
//								        	},
								        	min:'0',
								        	max:'auto',
								        	splitLine:{
								        		show:false
								        	}
								        }
								        ],
								        series: [
								                 {
								                	 name: 'A相电流',
								                	 type: 'line',
								                	 symbol: 'circle',
								                	 data:yIa1,//数据,
								                	 itemStyle: {
//								                		 normal: {
//								                			 barBorderRadius: 0,
//								                			 color:'#FF6E63'
//								                		 }
								                	 }
								                 },
//								                 {
//								                	 name: 'A相最大值',
//								                	 type: 'line',
//								                	 symbol: 'circle',
//								                	 data:yIa2,//数据,
//								                	 itemStyle: {
////								                		 normal: {
////								                			 barBorderRadius: 0,
////								                			 color:'#FF6E63'
////								                		 }
//								                	 }
//								                 },
//								                 {
//								                	 name: 'A相最小值',
//								                	 type: 'line',
//								                	 symbol: 'circle',
//								                	 data:yIa3,//数据,
//								                	 itemStyle: {
////								                		 normal: {
////								                			 barBorderRadius: 0,
////								                			 color:'#FF6E63'
////								                		 }
//								                	 }
//								                 },
								                 {
								                	 name: 'B相电流',
								                	 type: 'line',
								                	 symbol: 'circle',
								                	 data:yIb1,//数据,
								                	 itemStyle: {
//								                		 normal: {
//								                			 barBorderRadius: 0,
//								                			 color:'#FF6E63'
//								                		 }
								                	 }
								                 },
//								                 {
//								                	 name: 'B相最大值',
//								                	 type: 'line',
//								                	 symbol: 'circle',
//								                	 data:yIb2,//数据,
//								                	 itemStyle: {
////								                		 normal: {
////								                			 barBorderRadius: 0,
////								                			 color:'#FF6E63'
////								                		 }
//								                	 }
//								                 },
//								                 {
//								                	 name: 'B相最小值',
//								                	 type: 'line',
//								                	 symbol: 'circle',
//								                	 data:yIb3,//数据,
//								                	 itemStyle: {
////								                		 normal: {
////								                			 barBorderRadius: 0,
////								                			 color:'#FF6E63'
////								                		 }
//								                	 }
//								                 },
								                 {
								                	 name: 'C相电流',
								                	 type: 'line',
								                	 symbol: 'circle',
								                	 data:yIc1,//数据,
								                	 itemStyle: {
//								                		 normal: {
//								                			 barBorderRadius: 0,
//								                			 color:'#FF6E63'
//								                		 }
								                	 }
								                 },
//								                 {
//								                	 name: 'C相最大值',
//								                	 type: 'line',
//								                	 symbol: 'circle',
//								                	 data:yIc2,//数据,
//								                	 itemStyle: {
////								                		 normal: {
////								                			 barBorderRadius: 0,
////								                			 color:'#FF6E63'
////								                		 }
//								                	 }
//								                 },
//								                 {
//								                	 name: 'C相最小值',
//								                	 type: 'line',
//								                	 symbol: 'circle',
//								                	 data:yIc3,//数据,
//								                	 itemStyle: {
////								                		 normal: {
////								                			 barBorderRadius: 0,
////								                			 color:'#FF6E63'
////								                		 }
//								                	 }
//								                 },
								                 {
								                	 name: '不平衡度',
								                	 type: 'line',
								                	 symbol: 'circle',
								                	 yAxisIndex:1,
								                	 data:iDegreeBalance,//数据,
								                	 itemStyle: {
//								                		 normal: {
//								                			 barBorderRadius: 0,
//								                			 color:'#FF6E63'
//								                		 }
								                	 }
								                 }
								                 ]
									};
									//初始化echart
									ynbg_sxdlbphChart_show = echarts.init(document.getElementById('ynbg_sxdlbph_show_'+tranId[tranId.length-1]));
									ynbg_sxdlbphChart = echarts.init(document.getElementById('ynbg_sxdlbph_'+tranId[tranId.length-1]));
									//配置echart
									ynbg_sxdlbphChart_show.setOption(option,true);
									ynbg_sxdlbphChart.setOption(option,true);
									
									ynbg_sxdlbphChartList_show.push(ynbg_sxdlbphChart_show);
									ynbg_sxdlbphChartList.push(ynbg_sxdlbphChart);
					}
					
					flag = false;
					x = [];//时间
					yIa1 = [];//平均负荷
					yIa2 = [];//最大负荷
					yIa3 = [];//最小负荷
					
					yIb1 = [];//平均负荷
					yIb2 = [];//最大负荷
					yIb3 = [];//最小负荷
					
					yIc1 = [];//平均负荷
					yIc2 = [];//最大负荷
					yIc3 = [];//最小负荷
					iDegreeBalance = [];//平衡度
				}
			}
//			console.log(tranId);
//			console.log(ynbg_sxdlbphChartList);
//			$.messager.progress('close');
		}
	});
}

/**
 * 谐波
 */
function getChartXB(data){
	xbTranId = new Array();
	ynbg_xbChartList_show= new Array();
	ynbg_xbChartList = new Array();
	for(var i in data){
		var option = {
				legend: {
					data: ['A相电流总畸变率','B相电流总畸变率','C相电流总畸变率','A相电压总畸变率','B相电压总畸变率','C相电压总畸变率'],
//					textStyle:{fontSize:20},
					x:'center',
					y:'10'
				},
				tooltip: {
					trigger: 'axis',
			        formatter: function(params) {
			        	if(params!=null && params[0]!=null){
			    			var paramResult = "";
			    			paramResult += "时间：" + params[0].name + "<br/>";
			    			for(var i = 0; i < params.length; i++){
		    					paramResult += params[i].seriesName+"："+params[i].value + "%<br/>";
			    			}
		    				return paramResult;
			    		}
			    	}
				},
				//设置grid位置
				grid : {
					x : 55, //左边距离
					y : 75,//上边距离
					x2 : 55,//右边距离
					y2 : 35//下边距离
				},
				xAxis:  {
					type: 'category',
					boundaryGap:false,
//					nameTextStyle: {fontSize:20},
//					axisLabel:{
//						textStyle:{show:true,fontSize:20}
//					},
					data : data[i].dataDate
				},
				yAxis: [
				        {
				        	name: 'I(%)',
				        	type: 'value',
//				        	nameTextStyle: {fontSize:20},
//				        	axisLabel:{
//				        		textStyle:{show:true,fontSize:20}
//				        	},
				        	min:'0',
				        	max:'auto'
				        },
				        {
				        	name: 'U(%)',
				        	type: 'value',
//				        	nameTextStyle: {fontSize:20},
//				        	axisLabel:{
//				        		textStyle:{show:true,fontSize:20}
//				        	},
				        	min:'0',
				        	max:'auto',
				        	splitLine:{
				        		show:false
				        	}
				        }
				        ],
				        series: [
				                 {
				                	 name: 'A相电流总畸变率',
				                	 type: 'line',
				                	 symbol: 'circle',
				                	 data:data[i].Ia
				                 },
				                 {
				                	 name: 'B相电流总畸变率',
				                	 type: 'line',
				                	 symbol: 'circle',
				                	 data:data[i].Ib
				                 },
				                 {
				                	 name: 'C相电流总畸变率',
				                	 type: 'line',
				                	 symbol: 'circle',
				                	 data:data[i].Ic
				                 },
				                 {
				                	 name: 'A相电压总畸变率',
				                	 type: 'line',
				                	 symbol: 'circle',
				                	 yAxisIndex:1,
				                	 data:data[i].Ua
				                 },
				                 {
				                	 name: 'B相电压总畸变率',
				                	 type: 'line',
				                	 symbol: 'circle',
				                	 yAxisIndex:1,
				                	 data:data[i].Ub
				                 },
				                 {
				                	 name: 'C相电压总畸变率',
				                	 type: 'line',
				                	 symbol: 'circle',
				                	 yAxisIndex:1,
				                	 data:data[i].Uc
				                 }
				                 ]
		};
		//初始化echart
		ynbg_xbChart_show = echarts.init(document.getElementById('ynbg_xb_show'+data[i].tranId));
		ynbg_xbChart = echarts.init(document.getElementById('ynbg_xb'+data[i].tranId));
		//配置echart
		ynbg_xbChart_show.setOption(option,true);
		ynbg_xbChart.setOption(option,true);
		ynbg_xbChartList_show.push(ynbg_xbChart_show);
		ynbg_xbChartList.push(ynbg_xbChart);
		xbTranId.push(data[i].tranId);
	}
}
/**
 * 用能排名
 */
function getChartYNPM(consId,ynbgTime,endTime){
	$.ajax({	
		url:webContextRoot+'export/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'ynpg',
			'time' : ynbgTime,
			'endTime' : endTime
		},
		dataType:'json',
		type:'post',
		success:function(data){
			//设备能耗排名
			var option = {
					legend: {
						data: ['能耗'],
//						textStyle:{fontSize:20},
						x:'center',
						y:'35'
					},
					tooltip: {
				        trigger: 'axis',
				        formatter: function(params) {
				        	if(params!=null && params[0]!=null){
				    			var paramResult = "";
//				    			paramResult += "时间：" + params[0].name + "<br/>";
				    			for(var i = 0; i < params.length; i++){
			    					paramResult += params[i].name+ " " +params[i].seriesName+"："+(params[i].value==null?'':params[i].value) + "kWh<br/>";
				    			}
			    				return paramResult;
				    		}
				    	}
				    },
					//设置grid位置
					grid : {
						x : 85, //左边距离
						y : 75,//上边距离
						x2 : 35,//右边距离
						y2 : 35//下边距离
					},
					xAxis:  {
						type: 'category',
//						nameTextStyle: {fontSize:20},
//						axisLabel:{
//							textStyle:{show:true,fontSize:20}
//						},
						data : data.consMap.devName
					},
					yAxis: [
					        {
					        	name: '单位(kWh)',
					        	type: 'value',
//					        	nameTextStyle: {fontSize:20},
//					        	axisLabel:{
//					        		textStyle:{show:true,fontSize:20}
//					        	},
					        	min:'0',
					        	max:'auto'
					        }
					        ],
					        series: [
					                 {
					                	 name: '能耗',
					                	 type: 'bar',
					                	 symbol: 'circle',
					                	 data:data.consMap.devEnergyValue,//数据,
					                	 itemStyle: {
					                		 normal: {
					                			 barBorderRadius: 0,
					                			 color:'#FF6E63'
					                		 }
					                	 }
					                 }
					                 
					                 ]
			};
			//初始化echart
			ynbg_sbnhChart_show = echarts.init(document.getElementById('ynbg_sbnh_show'));
			ynbg_sbnhChart = echarts.init(document.getElementById('ynbg_sbnh'));
			//配置echart
			ynbg_sbnhChart_show.setOption(option,true);
			ynbg_sbnhChart.setOption(option,true);
			//重设echart大小
//			ynbg_sbnhChart.resize(ops);
			//加载完成变量
//			ynbg_sbnhBoolean = true; 
			
			option = {
					legend: {
						data: ['能耗'],
//						textStyle:{fontSize:20},
						x:'center',
						y:'35'
					},
					tooltip: {
				        trigger: 'axis',
				        formatter: function(params) {
				        	if(params!=null && params[0]!=null){
				    			var paramResult = "";
				    			for(var i = 0; i < params.length; i++){
			    					paramResult += params[i].name+ " " +params[i].seriesName+"："+(params[i].value==null?'':params[i].value) + "kWh<br/>";
				    			}
			    				return paramResult;
				    		}
				    	}
				    },
					//设置grid位置
					grid : {
						x : 85, //左边距离
						y : 75,//上边距离
						x2 : 35,//右边距离
						y2 : 35//下边距离
					},
					xAxis:  {
						type: 'category',
//						nameTextStyle: {fontSize:20},
//						axisLabel:{
//							textStyle:{show:true,fontSize:20}
//						},
						data : data.consMap.subsName
//				        data : ['单元A','单元B','单元C','单元D','单元E','单元F','单元G','单元H','单元I','单元J']
						
					},
					yAxis: [
					        {
					        	name: '单位(kWh)',
					        	type: 'value',
//					        	nameTextStyle: {fontSize:20},
//					        	axisLabel:{
//					        		textStyle:{show:true,fontSize:20}
//					        	},
					        	splitNumber: 5,
					        	min:'0',
					        	max:'auto'
					        }
					        ],
					        series: [
					                 {
					                	 name: '能耗',
					                	 type: 'bar',
					                	 symbol: 'circle',
					                	 data:data.consMap.subsEnergyValue,//数据,
					                	 itemStyle: {
					                		 normal: {
					                			 barBorderRadius: 0,
					                			 color:'#FED800'
					                		 }
					                	 }
					                 }
					                 
					                 ]
			};
			
			//初始化echart
			ynbg_qynhChart_show = echarts.init(document.getElementById('ynbg_qynh_show'));
			ynbg_qynhChart = echarts.init(document.getElementById('ynbg_qynh'));
			//配置echart
			ynbg_qynhChart_show.setOption(option,true);
			ynbg_qynhChart.setOption(option,true);
			//重设echart大小
//			ynbg_qynhChart.resize(ops);
			//加载完成变量
//			ynbg_qynhBoolean = true; 
		}
	});
}

/**
 * 线路能耗
 * @param consId
 * @param ynbgTime
 */
function getChartXLNH(consId,ynbgTime,endTime){
	
	$.ajax({	
		url:webContextRoot+'export/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'xlnh',
			'time' : ynbgTime,
			'endTime' : endTime
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			var xData = new Array();  
			var yData = new Array();  
			for(var i in result.data){
				xData.push(result.data[i].lineName);
				yData.push(result.data[i].sumEnergyP);
			}
			var option = {
					legend: {
						data: ['能耗'],
//						textStyle:{fontSize:20},
						x:'center',
						y:'35'
					},
					tooltip: {
				        trigger: 'axis',
				        formatter: function(params) {
				        	if(params!=null && params[0]!=null){
				    			var paramResult = "";
//				    			paramResult += "时间：" + params[0].name + "<br/>";
				    			for(var i = 0; i < params.length; i++){
			    					paramResult += params[i].name+ " " +params[i].seriesName+"："+(params[i].value==null?'':params[i].value) + "kWh<br/>";
				    			}
			    				return paramResult;
				    		}
				    	}
				    },
					//设置grid位置
					grid : {
						x : 85, //左边距离
						y : 75,//上边距离
						x2 : 35,//右边距离
						y2 : 35//下边距离
					},
					xAxis:  {
						type: 'category',
//						boundaryGap:false,
//						nameTextStyle: {fontSize:20},
//						axisLabel:{
//							textStyle:{show:true,fontSize:20}
//						},
						data : xData
					},
					yAxis: [
					        {
					        	name: '单位(kWh)',
					        	type: 'value',
//					        	nameTextStyle: {fontSize:20},
//					        	axisLabel:{
//					        		textStyle:{show:true,fontSize:20}
//					        	},
					        	min:'0',
					        	max:'auto'
					        }
					],
			        series: [
			                 {
			                	 name: '能耗',
			                	 type: 'bar',
			                	 symbol: 'circle',
			                	 data:yData
			                 }
			         ]
				};
				//初始化echart
			ynbg_xlnhChart_show = echarts.init(document.getElementById('ynbg_xlnh_show'));
			ynbg_xlnhChart = echarts.init(document.getElementById('ynbg_xlnh'));
				//配置echart
			ynbg_xlnhChart_show.setOption(option,true);
			ynbg_xlnhChart.setOption(option,true);
		}
	});
}

/**
 *  根据consId 查询区域能源服务中心的Icon路径
 */
function selectAreaIcon(){
	$.ajax({	
		url:webContextRoot+'export/selectAreaIcon.action', 
		data:{
			'consId': consId
		},
		dataType:'json',
		type:'post',
		success:function(result){
			//获取logo源代码并转码   通用ynbg_logo_general.png  金能电力ynbg_logo_jndl.jpg
			var url = webContextRoot+result.src;
			convertImgToBase64(url,function(base64Img){
//				console.log('image:',base64Img);
//				console.log('image-z:',encodeURIComponent(base64Img));
				ynbg_logo = encodeURIComponent(base64Img);
			});
		}
	});
}

/**
 * 查询树
 */
function selectTree(nodeId){
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);
	}
	
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
	for(var i=0 ; i < chiNode.length ; i++)//循环节点
    {
		 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
		  {
				var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
	       	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
	       	   	$('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
	       	    consId = chiNode[i].id;
	       	    consName = chiNode[i].text;
	       	    selectAreaIcon();
		       	loadData();
	       	   	break;//跳出循环
		 }
    }
}

/**
 * 设置时间的方法
 * @param dateTime
 */
function qytQueryOveride(dateTime){
	var date = $('#dataDateMonth').val();
	var resultDay = timeUtil(dateTime,date);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
	$('#dataDateMonth').val(resultDay.substr(0,7));
//	loadData();
}
/**
 * 时间处理的工具类
 * @param dateTime
 * @param startDay
 * @returns {String}
 */
function timeUtil(dateTime,startDay){
	var resultDay = DateUtil.dateAdd("m", parseInt(dateTime), DateUtil.strToDate(startDay));
	var resultStr = "";
	resultStr+=resultDay.getFullYear()+"-"+leftPad((resultDay.getMonth()+1))+"-"+leftPad(resultDay.getDate());
	function leftPad(str){
		if(str.toString().length==1){
			return '0'+str;
		}else{
			return str;
		}
	}
	return resultStr;
}

/**
 * 将图片转换为base64的格式
 * @param url
 * @param callback
 * @param outputFormat
 */
function convertImgToBase64(url,callback,outputFormat){
	var canvas = document.createElement('CANVAS');
	ctx = canvas.getContext('2d');
	img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img,0,0);
		var dataURL = canvas.toDataURL(outputFormat||'image/png');
		callback.call(this,dataURL);
		canvas = null;
	};
	img.src = url;
	//使用方法示例
	/*
	convertImgToBase64(webContextRoot+'pages/despages/common/images/ynbg_logo_jndl.jpg',function(base64Img){
		console.log('image:',base64Img);
		console.log('image-z:',encodeURIComponent(base64Img));
	});
	*/
}
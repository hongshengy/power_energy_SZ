/**
 * 用能分析报告
 * @author meng_zijie
 * @since 2017-06-13
 */
var dataDate = new Date();//当前时间
var isEdit = false;	//编辑状态
var fhqsChart = '';	//负荷趋势chart对象
var fhqsChart_show = '';	//负荷趋势chart对象
var dltjChart = '';	//电量统计chart对象
var dltjChart_show = '';	//电量统计chart对象
var glyszsChart = '';//功率因数走势chart对象
var glyszsChart_show = '';//功率因数走势chart对象
var dxrfhqxChartList = '';//典型日负荷曲线
var dxrfhqxChartList_show = '';//典型日负荷曲线
 
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
//					selectAreaIcon();
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
//		selectAreaIcon();
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
		 		pixelRatio:2,
		 		excludeComponents : ['toolbox']
			}));
		}else dltjImage = '';
		if(fhqsChart!=''){
			//获取负荷趋势png源代码并转码
			fhqsImage = encodeURIComponent(fhqsChart.getDataURL({
		 		type :"png",
		 		pixelRatio:2,
		 		excludeComponents : ['toolbox']
			}));
		}else fhqsImage = '';
		if(glyszsChart!=''){
			//获取功率因数走势png源代码并转码
			glyszsImage = encodeURIComponent(glyszsChart.getDataURL({
		 		type :"png",
		 		pixelRatio:2,
		 		excludeComponents : ['toolbox']
			}));
		}else glyszsImage = '';
		if(dxrfhqxChartList!=''){
			dxrfhqxImage = '';
			//获取典型日负荷曲线png源代码并转码
			for(var i = 0; i < dxrfhqxChartList.length; i++){
				dxrfhqxImage += encodeURIComponent(dxrfhqxChartList[i].getDataURL({
			 		type :"png",
			 		pixelRatio:2,
			 		excludeComponents : ['toolbox']
				})) + ",";
			}
			dxrfhqxImage = dxrfhqxImage.substr(0,dxrfhqxImage.length-1);
		}else dxrfhqxImage = '';
		
		//发送数据url 
		$('#gridDiv').datagrid("exportExcel", {
			  url : webContextRoot+'export/exportYXynbg.action?dltjImage='+dltjImage+'&fhqsImage='+fhqsImage+
			  	'&glyszsImage='+glyszsImage+'&dxrfhqxImage='+dxrfhqxImage+'&consId='+consId+
			  	'&time='+$("#dataDate").val()+'&endTime='+$("#endDate").val()
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
		content += "<div style='text-align:center'><a href='#dyhglText'>电压合格率</a></div>";
		content += "<div style='text-align:center'><a href='#xbText'>谐波</a></div>";
		content += "<div style='text-align:center'><a href='#sxdlbphText'>三相电流不平衡</a></div>";
		content += "<div style='text-align:center'><a href='#xcxjText'>现场巡检记录</a></div>";
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
		
		//电量建议语句
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
		
		//现场巡检建议语句
		var xcxjText = $("#xcxjText").text();
		$("#xcxjText").html("<input id='xcxjTextInput' />");
		$("#xcxjText").removeClass("p");
		$("#xcxjTextInput").textbox({
			width : '100%',
			height : '100%',
			value : xcxjText,
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
		var dyhglText = $("#dyhglTextInput").textbox('getValue');
		var xbText = $("#xbTextInput").textbox('getValue');
		var sxdlbphText = $("#sxdlbphTextInput").textbox('getValue');
		var xcxjText = $("#xcxjTextInput").textbox('getValue');
		//保存前验证
		if(fhText.length>200||dlText.length>200||glysText.length>200||dyhglText.length>200||xbText.length>200||sxdlbphText.length>200||xcxjText.length>200){
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
		
		//电压合格率建议语句
		$("#dyhglText").addClass("p");
		$("#dyhglText").text(dyhglText);
		
		//谐波建议语句
		$("#xbText").addClass("p");
		$("#xbText").text(xbText);
		
		//三相电流不平衡建议语句
		$("#sxdlbphText").addClass("p");
		$("#sxdlbphText").text(sxdlbphText);
		
		//现场巡检建议语句
		$("#xcxjText").addClass("p");
		$("#xcxjText").text(xcxjText);
		
		$.ajax({	
			url:webContextRoot+'export/mergeAdviceText.action',
			data:{
				'yn.consId': consId,
				'yn.dataDate' : $("#dataDate").val(),
				'yn.endDate' : $("#endDate").val(),
				'yn.fh' : HTMLEncode(fhText),
				'yn.dl' : HTMLEncode(dlText),
				'yn.glys' : HTMLEncode(glysText),
				'yn.dyhgl' : HTMLEncode(dyhglText),
				'yn.xb' : HTMLEncode(xbText),
				'yn.sxdlbph' : HTMLEncode(sxdlbphText),
				'yn.xlnh' : HTMLEncode(xcxjText)//现场巡检记录 建议
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
		echartResize();
	});
});

/**
 * chart对象 自适应
 */
function echartResize(){
	fhqsChart_show.resize();	//负荷趋势chart对象
	dltjChart_show.resize();	//电量统计chart对象
	for(var i = 0; i < dxrfhqxChartList_show.length; i++){
		dxrfhqxChartList_show[i].resize();
	}
	glyszsChart_show.resize();//功率因数走势chart对象
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
	getChartDXRFHQX(consId,time,endTime);
	getChartGLYSZS(consId,time,endTime);
	
	$.ajax({	
		url:webContextRoot+'export/exportYXynbg.action',
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
			//客户名称
			$("#baseInfo_consName").text(result.baseInfo.consName);
			//时间
			$("#sDate").text(result.sDate);
			//基本信息	
//			${baseInfo.consName}，户号：${baseInfo.consNo}，用电地址：${baseInfo.addr}，本期共${tranInfoList?size}
//			台变压器，总容量${totalPlateCap}kVA，电费执行：-，功率因数考核标准0.85。
			$("#baseInfo").html(result.baseInfo.consName+"，户号："+result.baseInfo.consNo+"，用电地址："+result.baseInfo.addr
					+"，本期共"+result.tranInfoList.length+"台变压器，总容量"+result.totalPlateCap+"kVA，功率因数考核标准"+result.baseInfo.userCheckCos+"。"
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
			$("#dftj_time").html(result.sDate);//时间
			$("#fee_total").html(result.yxdf.FEE_TOTAL);
			$("#pap_r").html(result.yxdf.PAP_R);
			$("#avg_price").html(result.yxdf.AVG_PRICE);
			$("#pap_r1").html(result.yxdf.PAP_R1);
			$("#pap_r2").html(result.yxdf.PAP_R2);
			$("#pap_r3").html(result.yxdf.PAP_R3);
			$("#pap_r4").html(result.yxdf.PAP_R4);
			$("#pap_db").html(result.yxdf.PAP_DB);
			
			//电压合格率
			var czhglTable = '<colgroup><col width="50%"/><col width="50%"/></colgroup>';
			czhglTable += '<tr><th>次总名称</th><th>电压合格率</th></tr>';
			for(var i = 0; i < result.czhglList.length; i++){
				czhglTable += '<tr><td>'+result.czhglList[i].LINE_NAME+"</td><td>"+result.czhglList[i].QUALIFID_RATE+"</td></tr>";
			}
			$("#czhglTable").html(czhglTable);
			$("#dyhglText").html(result.adviceText.dyhgl);
			
			//谐波
			var xb = '';
			for(var i = 0;i < result.ConsXBList.length; i++){
				var obj = result.ConsXBList[i];
//				xb += '<div class="title2">3.'+(i+1)+')'+obj.tranName+'：</div>';
				xb += '<div class="content2"> <table class="table"> <colgroup> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/>'+
				'<col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> <col width="8.33%"/> </colgroup>';
				xb += '<tr><td>内容</td><td>3次(%)</td><td>5次(%)</td><td>7次(%)</td><td>11次(%)</td><td>13次(%)</td><td>U畸变率</td><td>3次(A)</td><td>5次(A)</td><td>7次(A)</td><td>11次(A)</td><td>13次(A)</td></tr>';
//				xb += '<tr><td>最大值</td><td>'+obj.maxU3+'</td><td>'+obj.maxU5+'</td><td>'+obj.maxU7+'</td><td>'+obj.maxU11+'</td><td>'+obj.maxU13+'</td><td>'+obj.maxUTHD+'</td><td>'+obj.maxI3+'</td><td>'+obj.maxI5+'</td><td>'+obj.maxI7+'</td><td>'+obj.maxI11+'</td><td>'+obj.maxI13+'</td></tr>';
				xb += '<tr><td>最大值</td>';
				if(obj.maxU3Flag=='true') xb += '<td><div class="xbRed">'+obj.maxU3+'</div></td>';else xb += '<td>'+obj.maxU3+'</td>';
				if(obj.maxU5Flag=='true') xb += '<td><div class="xbRed">'+obj.maxU5+'</div></td>';else xb += '<td>'+obj.maxU5+'</td>';
				if(obj.maxU7Flag=='true') xb += '<td><div class="xbRed">'+obj.maxU7+'</div></td>';else xb += '<td>'+obj.maxU7+'</td>';
				if(obj.maxU11Flag=='true') xb += '<td><div class="xbRed">'+obj.maxU11+'</div></td>';else xb += '<td>'+obj.maxU11+'</td>';
				if(obj.maxU13Flag=='true') xb += '<td><div class="xbRed">'+obj.maxU13+'</div></td>';else xb += '<td>'+obj.maxU13+'</td>';
				if(obj.maxUTHDFlag=='true') xb += '<td><div class="xbRed">'+obj.maxUTHD+'</div></td>';else xb += '<td>'+obj.maxUTHD+'</td>';
				if(obj.maxI3Flag=='true') xb += '<td><div class="xbRed">'+obj.maxI3+'</div></td>';else xb += '<td>'+obj.maxI3+'</td>';
				if(obj.maxI5Flag=='true') xb += '<td><div class="xbRed">'+obj.maxI5+'</div></td>';else xb += '<td>'+obj.maxI5+'</td>';
				if(obj.maxI7Flag=='true') xb += '<td><div class="xbRed">'+obj.maxI7+'</div></td>';else xb += '<td>'+obj.maxI7+'</td>';
				if(obj.maxI11Flag=='true') xb += '<td><div class="xbRed">'+obj.maxI11+'</div></td>';else xb += '<td>'+obj.maxI11+'</td>';
				if(obj.maxI13Flag=='true') xb += '<td><div class="xbRed">'+obj.maxI13+'</div></td></tr>';else xb += '<td>'+obj.maxI13+'</td></tr>';
				xb += '<tr><td>平均值</td>';
				if(obj.avgU3Flag=='true') xb += '<td><div class="xbRed">'+obj.avgU3+'</div></td>';else xb += '<td>'+obj.avgU3+'</td>';
				if(obj.avgU5Flag=='true') xb += '<td><div class="xbRed">'+obj.avgU5+'</div></td>';else xb += '<td>'+obj.avgU5+'</td>';
				if(obj.avgU7Flag=='true') xb += '<td><div class="xbRed">'+obj.avgU7+'</div></td>';else xb += '<td>'+obj.avgU7+'</td>';
				if(obj.avgU11Flag=='true') xb += '<td><div class="xbRed">'+obj.avgU11+'</div></td>';else xb += '<td>'+obj.avgU11+'</td>';
				if(obj.avgU13Flag=='true') xb += '<td><div class="xbRed">'+obj.avgU13+'</div></td>';else xb += '<td>'+obj.avgU13+'</td>';
				if(obj.avgUTHDFlag=='true') xb += '<td><div class="xbRed">'+obj.avgUTHD+'</div></td>';else xb += '<td>'+obj.avgUTHD+'</td>';
				if(obj.avgI3Flag=='true') xb += '<td><div class="xbRed">'+obj.avgI3+'</div></td>';else xb += '<td>'+obj.avgI3+'</td>';
				if(obj.avgI5Flag=='true') xb += '<td><div class="xbRed">'+obj.avgI5+'</div></td>';else xb += '<td>'+obj.avgI5+'</td>';
				if(obj.avgI7Flag=='true') xb += '<td><div class="xbRed">'+obj.avgI7+'</div></td>';else xb += '<td>'+obj.avgI7+'</td>';
				if(obj.avgI11Flag=='true') xb += '<td><div class="xbRed">'+obj.avgI11+'</div></td>';else xb += '<td>'+obj.avgI11+'</td>';
				if(obj.avgI13Flag=='true') xb += '<td><div class="xbRed">'+obj.avgI13+'</div></td></tr>';else xb += '<td>'+obj.avgI13+'</td></tr>';
				xb += '<tr><td>标准限值</td><td>4.0%</td><td>4.0%</td><td>4.0%</td><td>4.0%</td><td>4.0%</td><td>5.0%</td><td>62</td><td>62</td><td>44</td><td>28</td><td>24</td></tr>';
				xb += '</table></div>';
				xb += '<div class="content2" style="text-align:center;">表 4-'+(i+1)+' '+obj.tranName+'谐波</div>';
			}
			$("#xb").html(xb);
			$("#xbText").html(result.adviceText.xb);
			
			//三相电流不平衡
			var sxdlbphTable = '<colgroup><col width="25%"/><col width="25%"/><col width="25%"/><col width="25%"/></colgroup>';
			sxdlbphTable += '<tr><th>变压器</th><th>最大值</th><th>最小值</th><th>平均值</th></tr>';
			for(var i = 0; i < result.sxdlbphList.length; i++){
				sxdlbphTable += '<tr><td>'+result.sxdlbphList[i].TRAN_NAME+"</td><td>"+(result.sxdlbphList[i].MAX_VALUE=='--'?result.sxdlbphList[i].MAX_VALUE:(result.sxdlbphList[i].MAX_VALUE+"%"))+"</td>";
				sxdlbphTable += '<td>'+(result.sxdlbphList[i].MIN_VALUE=='--'?result.sxdlbphList[i].MIN_VALUE:(result.sxdlbphList[i].MIN_VALUE+"%"))+"</td><td>"+(result.sxdlbphList[i].AVG_VALUE=='--'?result.sxdlbphList[i].AVG_VALUE:(result.sxdlbphList[i].AVG_VALUE+"%"))+"</td></tr>";
			}
			$("#sxdlbphTable").html(sxdlbphTable);
			$("#sxdlbphText").html(result.adviceText.sxdlbph);
			
			//运行托管服务
			//1 远程监控记录
			var ycjkHTML = '<colgroup><col width="25%"/><col width="25%"/><col width="25%"/><col width="25%"/></colgroup><tr><td>配电设备</td><td>告警时间</td><td>报警内容</td><td>处理结果</td></tr>';
			for(var i in result.ycjk){
				ycjkHTML +='<tr><td></td><td></td><td></td><td></td></tr>';
			}
			$("#ycjk").html(ycjkHTML);
			var ycjk_tr = $("#ycjk tr");
			for(var i = 0; i < result.ycjk.length; i++){
				var ycjk_tr_td = $(ycjk_tr[1+i]).find("td");
				$(ycjk_tr_td[0]).text(result.ycjk[i].DEV_NAME);
				$(ycjk_tr_td[1]).text(result.ycjk[i].ALARM_START_TIME);
				$(ycjk_tr_td[2]).text(result.ycjk[i].ALARM_DESC);
				$(ycjk_tr_td[3]).text(result.ycjk[i].CONFIRM);
			}
			//2 现场巡检记录
			var xcxjHTML = '<colgroup><col width="33.33%"/><col width="33.33%"/><col width="33.33%"/></colgroup><tr><td>巡检时间</td><td>缺陷记录</td><td>合理建议</td></tr>';
			for(var i = 0; i < result.xcxj.length; i++){
				if(i==0) xcxjHTML +='<tr><td></td><td></td><td id="xcxjText"></td></tr>';
				else xcxjHTML +='<tr><td></td><td></td></tr>';
			}
			$("#xcxj").html(xcxjHTML);
			var xcxj_tr = $("#xcxj tr");
			for(var i = 0; i < result.xcxj.length; i++){
				var xcxj_tr_td = $(xcxj_tr[1+i]).find("td");
				$(xcxj_tr_td[0]).text(result.xcxj[i].CREATE_DATE);
				$(xcxj_tr_td[1]).text(result.xcxj[i].EXCEPT);
				if(i==0) $(xcxj_tr_td[2]).attr("rowspan",result.xcxj.length);
			}
			$("#xcxjText").html(result.adviceText.xlnh);
			//3 设备预防性试验服务
//			var sbyfxsyHTML = '<colgroup><col width="33.33%"/><col width="33.33%"/><col width="33.33%"/></colgroup><tr><td>试验内容</td><td>试验结果</td><td>处理结果</td></tr>';
//			for(var i in result.sbyfxsy){
//				sbyfxsyHTML +='<tr><td></td><td></td><td></td></tr>';
//			}
//			$("#sbyfxsy").html(sbyfxsyHTML);
//			var sbyfxsy_tr = $("#sbyfxsy tr");
//			for(var i = 0; i < result.sbyfxsy.length; i++){
//				var sbyfxsy_tr_td = $(sbyfxsy_tr[1+i]).find("td");
//				$(sbyfxsy_tr_td[0]).text(result.sbyfxsy[i].DEVICE);
//				$(sbyfxsy_tr_td[1]).text(result.sbyfxsy[i].TEST_RESULT);
//				$(sbyfxsy_tr_td[2]).text(result.sbyfxsy[i].DISPOSE_RESULT);
//			}
			var sbyfxsyHTML = '';
			for(var i = 0; i < result.sbyfxsy.length; i++){
				sbyfxsyHTML += '<div id="sbyfxsy'+i+'_startDate" class="title2" style="float:left;">试验日期：'+result.sbyfxsy[i].START_DATE+'</div>';
				sbyfxsyHTML += '<div id="sbyfxsy'+i+'_endDate" class="title2" style="float:right;">到期试验日期：'+result.sbyfxsy[i].END_DATE+'</div>';
				sbyfxsyHTML += '<div class="content2"><table class="table">';
				sbyfxsyHTML += '<colgroup><col width="33.33%"/><col width="33.33%"/><col width="33.33%"/></colgroup><tr><td>试验内容</td><td>试验结果</td><td>处理结果</td></tr>';
				for(var j = 0; j < result.sbyfxsy[i].TEST.length; j++){
					sbyfxsyHTML += '<tr><td>'+result.sbyfxsy[i].TEST[j].DEVICE+'</td><td>'+result.sbyfxsy[i].TEST[j].TEST_RESULT+'</td><td>'+result.sbyfxsy[i].TEST[j].DISPOSE_RESULT+'</td></tr>';
				}
				sbyfxsyHTML += '</table></div>';
			}
			$("#sbyfxsy").html(sbyfxsyHTML);
			//4 电力设备抢修服务
			var dlsbqxHTML = '<colgroup><col width="33.33%"/><col width="33.33%"/><col width="33.33%"/></colgroup><tr><td>抢修时间</td><td>故障描述</td><td>处理结果</td></tr>';
			for(var i in result.dlsbqx){
				dlsbqxHTML +='<tr><td></td><td></td><td></td></tr>';
			}
			$("#dlsbqx").html(dlsbqxHTML);
			var dlsbqx_tr = $("#dlsbqx tr");
			for(var i = 0; i < result.dlsbqx.length; i++){
				var dlsbqx_tr_td = $(dlsbqx_tr[1+i]).find("td");
				$(dlsbqx_tr_td[0]).text(result.dlsbqx[i].PROG_TIME);
				$(dlsbqx_tr_td[1]).text(result.dlsbqx[i].CONTENT);
				$(dlsbqx_tr_td[2]).text(result.dlsbqx[i].PROCESS);
			}
			//5 用电业务委托服务
			var ydywwtHTML = '<colgroup><col width="33.33%"/><col width="33.33%"/><col width="33.33%"/></colgroup><tr><td>委托时间</td><td>委托内容</td><td>办理结果</td></tr>';
			for(var i in result.ydywwt){
				ydywwtHTML +='<tr><td></td><td></td><td></td></tr>';
			}
			$("#ydywwt").html(ydywwtHTML);
			var ydywwt_tr = $("#ydywwt tr");
			for(var i = 0; i < result.ydywwt.length; i++){
				var ydywwt_tr_td = $(ydywwt_tr[1+i]).find("td");
				$(ydywwt_tr_td[0]).text(result.ydywwt[i].CREATE_DATE);
				$(ydywwt_tr_td[1]).text(result.ydywwt[i].BUSINESS_TYPE);
				$(ydywwt_tr_td[2]).text(result.ydywwt[i].BUSINESS_STEP);
			}
			
			//用能建议
			$("#ynjyText").html(ynjyHTML());
			
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
	//电压合格率建议语句
	var dyhglText = $("#dyhglText").text();
	//谐波建议语句
	var xbText = $("#xbText").text();
	//三相电流不平衡建议语句
	var sxdlbphText = $("#sxdlbphText").text();
	//现场巡检建议语句
	var xcxjText = $("#xcxjText").text();
	
	if(fhText.length>0){
		html += '<li>'+HTMLEncode(fhText)+'</li>';
	}
	if(dlText.length>0){
		html += '<li>'+HTMLEncode(dlText)+'</li>';
	}
	if(glysText.length>0){
		html += '<li>'+HTMLEncode(glysText)+'</li>';
	}
	if(dyhglText.length>0){
		html += '<li>'+HTMLEncode(dyhglText)+'</li>';
	}
	if(xbText.length>0){
		html += '<li>'+HTMLEncode(xbText)+'</li>';
	}
	if(sxdlbphText.length>0){
		html += '<li>'+HTMLEncode(sxdlbphText)+'</li>';
	}
	if(xcxjText.length>0){
		html += '<li>'+HTMLEncode(xcxjText)+'</li>';
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
				var loadRate = [];//参考值
				if(result.type=='1'){
					for(var i in result.data){
						x.push(result.data[i].dataDate);
						y1.push(result.data[i].avgValue);
						loadRate.push(result.data[i].loadRate);
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
						    				paramResult += params[i].seriesName+"："+(params[i].value==null?'':params[i].value) + "kW<br/>";
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
						        data:['负荷','参考值'],
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
						        },
						        {
						        	name:'参考值',
						        	type:'line',
						        	data: loadRate
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
						loadRate.push(result.data[i].loadRate);
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
						    				paramResult += params[i].seriesName+"："+(params[i].value==null?'':params[i].value) + "kW<br/>";
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
						        data:['平均负荷','最大负荷','最小负荷','参考值'],
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
						        },
						        {
						        	name:'参考值',
						        	type:'line',
						        	data: loadRate
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
					    				paramResult += params[i].seriesName+"："+(params[i].value==null?'':params[i].value) + "kWh<br/>";
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
 * 典型日负荷曲线
 */
function getChartDXRFHQX(consId,ynbgTime,endTime){
	dxrfhqxChartList = [];
	dxrfhqxChartList_show = [];
	
	$.ajax({	
		url:webContextRoot+'export/getChart.action', 
		data:{
			'consId': consId,
			'chartName' : 'dxrfhqx',
			'time' : ynbgTime,
			'endTime' : endTime
		},
		dataType:'json',
		type:'post',
		success:function(result){
//			console.log(result);
			var html = '';
			for(var i in result.data){
				html += '<div id="dxrfhqx_show_'+result.data[i].tranId+'" class="img1"></div>';
				html += '<div style="display:none;"><div id="dxrfhqx_'+result.data[i].tranId+'" class="img"></div>'
				+'</div><div class="content2" style="text-align:center">图：'+result.data[i].dataDate+' '+result.data[i].tranName+'日负荷曲线</div>';
			}
			$("#dxrfhqx").html(html);
			
			for(var i in result.data){
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
										paramResult += params[i].seriesName+"："+(params[i].value==null?'':params[i].value) + "kW<br/>";
									}
									return paramResult;
								}
							}
						},
						grid : {
//							left: '3%',
//							right: '3%',
//							bottom : '3%',
//							containLabel : true
							x : 85, //左边距离
							y : 75,//上边距离
							x2 : 35,//右边距离
							y2 : 35//下边距离
						},
						legend: {
							data:['负荷'],
//							textStyle:{fontSize:20},
							y:28
						},
						xAxis:  {
							type: 'category',
							boundaryGap:false,
//							nameTextStyle: {fontSize:20},
//							axisLabel:{
//								textStyle:{show:true,fontSize:20}
//							},
							data: result.data[i].dataTime
						},
						yAxis:[{
							name: '单位(kW)',
							type: 'value',
//							nameTextStyle: {fontSize:20},
//							axisLabel:{
//								textStyle:{show:true,fontSize:20}
//							}
						}],
						series: [
						         {
						        	 name:'负荷',
						        	 type:'line',
						        	 data:result.data[i].dataData
						         }
						         ]
				};
				//初始化echart
				var dxrfhqxChart_show = echarts.init(document.getElementById('dxrfhqx_show_'+result.data[i].tranId));
				var dxrfhqxChart = echarts.init(document.getElementById('dxrfhqx_'+result.data[i].tranId));
				//配置echart
				dxrfhqxChart_show.setOption(option,true);
				dxrfhqxChart.setOption(option,true);
				dxrfhqxChartList_show.push(dxrfhqxChart_show);
				dxrfhqxChartList.push(dxrfhqxChart);
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
					    				paramResult += params[i].seriesName+"："+(params[i].value==null?'':params[i].value) + "<br/>";
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
//	       	    selectAreaIcon();
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
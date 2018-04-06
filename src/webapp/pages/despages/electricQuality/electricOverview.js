
/**
 * 区域电量电费概览
 * by meng_xianling
 */

var dlglChart = '';				// 电量chart
var dfglChart = '';				// 电费chart
var currentdate = new Date();	// 当前日期
var startDate = new Date(); 	// 当前开始时间 为当前时间往前推一年
var endDate = new Date();		// 当前结束时间  为当前时间
var thisLegendType = "";		// 本期名字
var upLegendType = "";			// 上期名字
var legend = [];				// 选择的车间名称
var queryChartDate = '';		// 点击柱状图得到查询时间
var tabIndex = 0;				// tab页变量
var dianfei = null;
var thisDianfei = "";			// 本期电费		
var upDianfei = "";				// 上一期电费
var isClick = "isOne";			// 点击的是第一时间

$(function(){
	
	initialize();				// 加載時間控件
	dlglChart = echarts.init(document.getElementById('dlglChart'));// 初始电量chart
	dfglChart = echarts.init(document.getElementById('dfglChart'));// 初始电费chart

	getData();					// 查询数据
	clickChart();				// 点击柱状图查询
	$("#tabId").tabs({			// 电量概览 电费概览选项卡
		onSelect:function(title,index){// title:标签名，index:下标
			if(index == 0){		// 电量概览
				$("#searchDiv2").hide();
				$("#searchDiv1").show();
				getData();
			}else if(index == 1){// 电费概览
				$("#searchDiv1").hide();
				$("#searchDiv2").show();
				getData();
			}
		}
	});
	
	$("#qydlMonthDialog").dialog({// 电量弹窗	
		onClose:function(){
			$("#jqcxMonth").textbox("setValue","");// 关闭弹窗 清空文本框
		}
	});
	
	$("#qydfMonthDialog").dialog({// 电费弹窗
		onClose:function(){
			$("#jqccMonth").textbox("setValue","");// 关闭弹窗 清空文本框
		}
	});
});

/**
 * 点击柱状图弹出数据 
 */
function clickChart(){
	/**
	 * 点击柱状图查询区域下的客户用电情况 
	 */
	var dataList = [];
	dlglChart.on("click",function(param){
		if(typeof param.seriesIndex == 'undefined'){
			return;
		}
		var oneDate = $('#dlzsEDateY').val(); // 第一时间
		var date = $('#dlzsEDateYUp').val();  // 第二时间
		var dateType = param.seriesName;
		if(dateType.length == 8){				// 选择年份
			dateType = dateType.substring(0,4);
			queryChartDate = dateType + "-"+param.name + "-01";
			// 点击的是第一时间柱状图
			if(dateType != date){
				if(isClick == "isOne"){
					date = date + "-" + param.name + "-01";
				}else{
					date = oneDate + "-" + param.name + "-01";
				}
			}else{
				isClick = "isTwo";	// 点击第二时间
				// 如果点击的是第二时间柱状图 查询条件应改为第一时间
				if(isClick == "isTwo"){
					date = oneDate + "-" + param.name + "-01";
				}else{
					date = date + "-" + param.name + "-01";
				}
			}
		}else if(dateType.length == 11){		// 选择月份
			dateType = dateType.substring(0,7);
			queryChartDate = dateType + "-" + param.name;
		}
		
		queryElectricByClickMonth(date);
	});
	
	/**
	 * 点击电费柱状图查询区域下的用户 
	 */
	var dataList = [];								
	dfglChart.on("click",function(param){
		if(typeof param.seriesIndex == 'undefined'){
			return;
		}
		var date = $('#dlzsEDateYDFUp').val();
		var oneDate = $('#dlzsEDateYDF').val();
		var dateType = param.seriesName;
		
		dianfei = param.name;
		if(dateType.length == 8){					// 选择年份
			dateType = dateType.substring(0,4);
			queryChartDate = dateType + "-" + param.name + "-01";
			// 点击的是第一时间柱状图
			if(dateType != date){
				if(isClick == "isOne"){
					date = date + "-" + param.name + "-01";
				}else{
					date = oneDate + "-" + param.name + "-01";
				}
			}else{
				isClick = "isTwo";	// 点击第二时间
				// 如果点击的是第二时间柱状图 查询条件应改为第一时间
				if(isClick == "isTwo"){
					date = oneDate + "-" + param.name + "-01";
				}else{
					date = date + "-" + param.name + "-01";
				}
			}
		}
		var dlzsQueryType = $('#dlzsQueryTypeDF').combobox('getValue');
		if(dlzsQueryType == "Y"){
			queryDfglChartByClick(date,param.seriesIndex);			// 点击月数查询柱状图
		}else{
			return;
		}
	});
	
}

/**
 * 初始化时间控件 
 */
function initialize(){
	$('#dlzsQueryType').combobox({					// 电量走势下拉框选择天、月、年
		onSelect: function(param){
			if(param.value == 'M'){					// 选择月数据
				$('#dlzsEDateM').val(DateUtil.dateToStr('yyyy-MM',endDate));
				$('#dlzsEDateM').show();			// 显示月时间插件
				$('#dlzsEDateY').hide();			// 隐藏年时间插件
				$('#dlzsEDateMUp').show();
				$('#dlzsEDateYUp').hide();
				date = $('#dlzsEDateM').val();		// 获取选中的时间
				dateLast = new Date(date);			
				dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
				
				// 设置第二时间月份
				$('#dlzsEDateMUp').val(dateLast);
			}else if(param.value == 'Y'){			// 选择年数据
				$('#dlzsEDateY').val(DateUtil.dateToStr('yyyy',endDate));
				$('#dlzsEDateM').hide();			// 隐藏月时间插件
				$('#dlzsEDateY').show();			// 显示年时间
				$('#dlzsEDateMUp').hide();
				$('#dlzsEDateYUp').show();
				date = $('#dlzsEDateY').val();		// 获取选中的时间
				dateLast = new Date(date);
				dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dateLast));
				
				// 设置第二时间年份
				$('#dlzsEDateYUp').val(dateLast);
			}
		}
	});
	
	
	$('#dlzsQueryTypeDF').combobox({					// 电量走势下拉框选择天、月、年
		onSelect: function(param){
			if(param.value == 'Y'){			// 选择年数据
				$('#dlzsEDateYDF').val(DateUtil.dateToStr('yyyy',endDate));
				$('#dlzsEDateYDF').show();			// 显示年时间
				$('#dlzsEDateYDFUp').show();
				date = $('#dlzsEDateYDF').val();		// 获取选中的时间
				dateLast = new Date(date);
				dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dateLast));
				
				// 设置第二时间年份
				$('#dlzsEDateYDFUp').val(dateLast);
			}
		}
	});
	 
	$('#leftdlzs').click(function(){				// 左减日期电量走势
		var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
		if(dlzsQueryType == 'M'){
			var startDate =  $('#dlzsEDateM').val();// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#dlzsEDateM').val(nowDate.substr(0,7));
		}else if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateY').val();// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
			$('#dlzsEDateY').val(nowDate.substr(0,4));
		}
		getData();
	});
	
	$('#rightdlzs').click(function(){				// 右加日期电量走势
		var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
		if(dlzsQueryType == 'M'){
			var startDate =  $('#dlzsEDateM').val();// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#dlzsEDateM').val(nowDate);
		}else if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateY').val();// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
			$('#dlzsEDateY').val(nowDate);
		}
		getData();
	});
	
	// 第二时间查询数据
	$('#leftdlzsUp').click(function(){				// 左减日期电量走势
		var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
		if(dlzsQueryType == 'M'){
			var startDate =  $('#dlzsEDateMUp').val();// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,DateUtil.strToDate(startDate)));
			$('#dlzsEDateMUp').val(nowDate.substr(0,7));
		}else if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateYUp').val();// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
			$('#dlzsEDateYUp').val(nowDate.substr(0,4));
		}
		getData();
	});
	
	$('#rightdlzsUp').click(function(){				// 右加日期电量走势
		var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
		if(dlzsQueryType == 'M'){
			var startDate =  $('#dlzsEDateMUp').val();// 开始日期
			var nowDate = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',1,DateUtil.strToDate(startDate)));
			$('#dlzsEDateMUp').val(nowDate);
		}else if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateYUp').val();// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
			$('#dlzsEDateYUp').val(nowDate);
		}
		getData();
	});
	
	// 电费时间
	$('#leftdlzsDF').click(function(){				// 左减日期电量走势
		var dlzsQueryType = $('#dlzsQueryTypeDF').combobox('getValue');
		if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateYDF').val();// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
			$('#dlzsEDateYDF').val(nowDate.substr(0,4));
		}
		getData();
	});
	
	$('#rightdlzsDF').click(function(){				// 右加日期电量走势
		var dlzsQueryType = $('#dlzsQueryTypeDF').combobox('getValue');
		if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateYDF').val();// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
			$('#dlzsEDateYDF').val(nowDate);
		}
		getData();
	});
	
	// 第二时间查询数据
	$('#leftdlzsDFUp').click(function(){				// 左减日期电量走势
		var dlzsQueryType = $('#dlzsQueryTypeDF').combobox('getValue');
		if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateYDFUp').val();// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,startDate1));
			$('#dlzsEDateYDFUp').val(nowDate.substr(0,4));
		}
		getData();
	});
	
	$('#rightdlzsDFUp').click(function(){				// 右加日期电量走势
		var dlzsQueryType = $('#dlzsQueryTypeDF').combobox('getValue');
		if(dlzsQueryType == 'Y'){
			var startDate =  $('#dlzsEDateYDFUp').val();// 开始日期
			startDate1 = new Date(startDate);
			var nowDate = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',1,startDate1));
			$('#dlzsEDateYDFUp').val(nowDate);
		}
		getData();
	});
}

/**
 * 查询数据的方法 
 */
function getData(){
	var tab = $("#tabId").tabs('getSelected');					// tab选项卡
	tabIndex = $("#tabId").tabs('getTabIndex',tab);				// 获取选中的tab页
	
	var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');// 获取日期插件的类型
	
	if(dlzsQueryType == 'M'){									// 选择月电量
		dlzsEDate = $('#dlzsEDateM').val() + '-01';				// 拼接数据
		dlzsEDateUp = $('#dlzsEDateMUp').val() + '-01';			// 拼接数据
		date = $('#dlzsEDateM').val();							// 第一时间
		upLegend = $('#dlzsEDateMUp').val();				// 第二时间
		dateLast = new Date(date);
		dateLast = DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,dateLast));
		if((date.substr(0,7)) == (DateUtil.dateToStr('yyyy-MM',endDate))){
			dldate = DateUtil.dateToStr('dd',DateUtil.dateAdd('d',-1,currentdate));
			dldate1 = DateUtil.dateToStr('dd',DateUtil.dateAdd('d',-1,currentdate));
		}else{
			dldate = '0';
		}
		thisLegendType = date + " 月电量";						// 拼接chart中legend属性
		upLegendType =  upLegend + " 月电量";
		thisDianfei = date + " 月电费";
		upDianfei = upLegend + " 月电费";
	}else if(dlzsQueryType == 'Y'){								// 选择年电量
		dlzsEDate = $('#dlzsEDateY').val() + '-01-01';			// 拼接数据
		dlzsEDateUp = $('#dlzsEDateYUp').val() + '-01-01';		// 拼接数据
		date = $('#dlzsEDateY').val();							// 第一时间
		upLegend = $('#dlzsEDateYUp').val();				// 第二时间
		dateLast = new Date(date);
		dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dateLast));
		
		if((date.substr(0,4)) == (DateUtil.dateToStr('yyyy',endDate))){
			dldate = DateUtil.dateToStr('MM',currentdate);
		}else{
			dldate = '0';
		}
		thisLegendType = date + " 年电量";						// 拼接chart中legend属性
		upLegendType =  upLegend + " 年电量";						
		thisDianfei = date + " 年电费";
		upDianfei = upLegend + " 年电费";
	}
	if(tabIndex == 0){											// 查询电量概览
		dlglChart.showLoading({									// 正在加载...
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
		
		// 第二时间查询数据
		$.ajax({
			type: "post",
			url:webContextRoot + 'powerChargeView/queryElectrilByArea.action',//请求地址
			data: "consPowerInfoModel.startDate=" + dlzsEDateUp + "&consPowerInfoModel.queryType=" + dlzsQueryType,//得到时间+用户ID
			dataType:"json",		// 返回类型
			cache : false,
			async : false,			// 同步异步请求
			success: function(result){
				queryMap = result;
			}
		});
	
	     $.post(webContextRoot +'powerChargeView/queryElectrilByArea.action',{// 链接地址
	        'consPowerInfoModel.startDate': dlzsEDate,			// 查询时间
	        'consPowerInfoModel.queryType': dlzsQueryType,		// 时间类型
	        'consPowerInfoModel.dataDate':dlzsEDateUp
	     },
	     function(data){
	         queryDlglChart(data.consMap,queryMap.consMap,thisLegendType,upLegendType);// 电量图表
	         queryDataGrid(data.consMap.dataList);				// 数据表格
			 dlglChart.hideLoading();							// 隐藏正在加载的...
			 
	     },'json');
	}else if(tabIndex == 1){									// 查询电费概览
		dfglChart.showLoading({									// 正在加载...
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
		
		
		
		var dlzsQueryType = $('#dlzsQueryTypeDF').combobox('getValue');// 获取日期插件的类型
		
		if(dlzsQueryType == 'Y'){								// 选择年电量
			dlzsEDateDF = $('#dlzsEDateYDF').val() + '-01-01';			// 拼接数据
			dlzsEDateDFUp = $('#dlzsEDateYDFUp').val() + '-01-01';		// 拼接数据
			date = $('#dlzsEDateYDF').val();							// 第一时间
			upLegend = $('#dlzsEDateYDFUp').val();				// 第二时间
			dateLast = new Date(date);
			dateLast = DateUtil.dateToStr('yyyy',DateUtil.dateAdd('y',-1,dateLast));
			
			if((date.substr(0,4)) == (DateUtil.dateToStr('yyyy',endDate))){
				dldate = DateUtil.dateToStr('MM',currentdate);
			}else{
				dldate = '0';
			}
			thisDianfei = date + " 年电费";
			upDianfei = upLegend + " 年电费";
		}
		
		// 第二时间查询数据
		$.ajax({
			type: "post",
			url:webContextRoot + 'powerChargeView/queryElectrilCharge.action',//请求地址
			data: "consPowerInfoModel.startDate=" + $('#dlzsEDateYDFUp').val() + "&consPowerInfoModel.queryType=" + dlzsQueryType + "&consPowerInfoModel.subType=one"+ "&consPowerInfoModel.dataDate=" + $('#dlzsEDateYDFUp').val(),//得到时间+用户ID
			dataType:"json",		// 返回类型
			cache : false,
			async : false,			// 同步异步请求
			success: function(result){
				queryMap = result;
			}
		});
		$.post(webContextRoot +'powerChargeView/queryElectrilCharge.action',{	// 链接地址
	        'consPowerInfoModel.startDate': $('#dlzsEDateYDF').val(),		// 第一时间查询
	        'consPowerInfoModel.queryType': dlzsQueryType,					// 时间类型
	        'consPowerInfoModel.dataDate': $('#dlzsEDateYDFUp').val()		// 第二时间查询
	     },
	     function(data){
	         queryDfglChart(data.consMap,queryMap.consMap,thisDianfei,upDianfei);// 电费图表
	         queryDfDataGrid(data.consMap.dataList);			// 数据表格
	         dfglChart.hideLoading();							// 隐藏正在加载的...
	     },'json');
	}
}

/**
 * 电量数据表格 
 */
function queryDataGrid(dataList){
	var	gridCommon = [];
	var date = $('#dlzsEDateYUp').val();
	var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
	if(dlzsQueryType == "M"){		// 选择月显示的数据表格
			gridCommon = [[
		        		{field:'dataDate',title:'日期',width: $(this).width()*0.1,rowspan:2,align:'center'},
		        		{field:'maxDate',title:'统计户数',width: $(this).width()*0.1,rowspan:2,align:'center'},
		        		{field:'powerValue',title:'总电量(kWh)',width: $(this).width()*0.1,rowspan:2,align:'center'},
//		        		{field:'tongbiValue',title:'上月同期(kWh)',width: $(this).width()*0.1,rowspan:2,align:'center'},
//		        		{field:'tongbi',title:'同比(%)',width: $(this).width()*0.1,rowspan:2,align:'center',
//		        			formatter:function(value,row,index){
//		        				return overwriteVal(value);
//							}
//		        		},
//		        		{field:'huanbi',title:'环比(%)',width: $(this).width()*0.1,rowspan:2,align:'center',
//		        			formatter:function(value,row,index){
//		        				return overwriteVal(value);
//							}
//		        		},
		        		{field:'f',title:'峰',width: $(this).width()*0.2,colspan:2,align:'center'},
		        		{field:'p',title:'平',width: $(this).width()*0.2,colspan:2,align:'center'},
		        		{field:'g',title:'谷',width: $(this).width()*0.2,colspan:2,align:'center'},
		        		{field:'j',title:'尖',width: $(this).width()*0.2,colspan:2,align:'center'},
		        		],
		        		[
		       			{field:'powerFValue',title:'峰电量(kWh)',width:$(this).width()*0.1,align:'center'},
		       			{field:'fdlb',title:'占总电量(%)',width:$(this).width()*0.1,align:'center'},
		       			
		       			{field:'powerPValue',title:'平电量(kWh)',width:$(this).width()*0.1,align:'center'},
		       			{field:'pdlb',title:'占总电量(%)',width:$(this).width()*0.1,align:'center'},
		       			
		       			{field:'powerGValue',title:'谷电量(kWh)',width:$(this).width()*0.1,align:'center'},
		       			{field:'gdlb',title:'占总电量(%)',width:$(this).width()*0.1,align:'center'},
		       			
		       			{field:'powerJValue',title:'尖电量(kWh)',width:$(this).width()*0.1,align:'center'},
		       			{field:'jdlb',title:'占总电量(%)',width:$(this).width()*0.1,align:'center'}
		       		]
		       	]; 
	}else{							// 选择年显示的数据表格
		gridCommon = [[
		        		{field:'dataDate',title:'月份',width: $(this).width()*0.1,rowspan:2,align:'center'},
		        		{field:'maxDate',title:'统计户数',width: $(this).width()*0.1,rowspan:2,align:'center'},
		        		{field:'powerValue',title:'总电量(kWh)',width: $(this).width()*0.1,rowspan:2,align:'center'},
		        		{field:'tongbiValue',title:date + '年同期(kWh)',width: $(this).width()*0.1,rowspan:2,align:'center'},
		        		{field:'tongbi',title:'增长率(%)',width: $(this).width()*0.1,rowspan:2,align:'center',
		        			formatter:function(value,row,index){
		        				return overwriteVal(value);
							}
		        		},
		        		{field:'huanbi',title:'环比(%)',width: $(this).width()*0.1,rowspan:2,align:'center',
		        			formatter:function(value,row,index){
		        				return overwriteVal(value);
							}
		        		},
		        		{field:'f',title:'峰',width: $(this).width()*0.2,colspan:2,align:'center'},
		        		{field:'p',title:'平',width: $(this).width()*0.2,colspan:2,align:'center'},
		        		{field:'g',title:'谷',width: $(this).width()*0.2,colspan:2,align:'center'},
		        		{field:'j',title:'尖',width: $(this).width()*0.2,colspan:2,align:'center'},
		        		],
		        		[
		       			{field:'powerFValue',title:'峰电量(kWh)',width:$(this).width()*0.1,align:'center'},
		       			{field:'fdlb',title:'占总电量(%)',width:$(this).width()*0.1,align:'center'},
		       			
		       			{field:'powerPValue',title:'平电量(kWh)',width:$(this).width()*0.1,align:'center'},
		       			{field:'pdlb',title:'占总电量(%)',width:$(this).width()*0.1,align:'center'},
		       			
		       			{field:'powerGValue',title:'谷电量(kWh)',width:$(this).width()*0.1,align:'center'},
		       			{field:'gdlb',title:'占总电量(%)',width:$(this).width()*0.1,align:'center'},
		       			
		       			{field:'powerJValue',title:'尖电量(kWh)',width:$(this).width()*0.1,align:'center'},
		       			{field:'jdlb',title:'占总电量(%)',width:$(this).width()*0.1,align:'center'}
		       		]
		       	]; 
	}
	
	$('#queryDataGrid').datagrid({ 		// 加载数据
		width : '100%',					// 宽度
		singleSelect : true,			// 设置为true将只允许选择一行。
		nowrap : false,					// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,					// 设置为true将交替显示行背景。
		border:false,					// 边框
		pagination : false,				// 设置true将在数据表格底部显示分页工具栏。
	  	fitColumns : true,				// 自动适应宽度
		rownumbers : true,				// 设置为true将显示行数。
		onLoadSuccess : function() {	// 加载数据之后
			$('#queryDataGrid').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : gridCommon,
		data : dataList
	}); 
}

/**
 * 重写表格 如果是-.xx 改写为-0.xx 
 */
function overwriteVal(val){
	// 负数
	if(val.substring(0,2) === "-."){
		return val.replace("-.","-0.");
	}
	// 正数
	if(val.substring(0,1) === "."){
		return val.replace(".","0.");
	}
	return val;
};


/**
 * 电量总览 
 */
function queryDlglChart(dataMap,queryMap,thisLegendType,upLegendType){
	legend = [];
	series = [];
	yAxis = [];
	var tongbi = "增长率";
	legend.push(thisLegendType);
	legend.push(upLegendType);
	// 选择月数据不显示同比
	var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
	if(dlzsQueryType == "M"){
		yAxis.push(
			{
			    name: '单位(kWh)',
			    type: 'value'
			}
		);
		series.push(
			{
				name:thisLegendType,	
				type:'bar',
				data:dataMap.currentPowerValue
			},
			{
				name:upLegendType,
				type:'bar',
				data:queryMap.currentPowerValue
			}
		);
	}else if(dlzsQueryType == "Y"){
		legend.push(tongbi);
		yAxis.push(
			{
			    name: '单位(kWh)',
			    type: 'value',
			},
			{
			    name: '增长率',
			    type: 'value',
			    splitNumber: 5,
			    splitLine: {
			        lineStyle: {
			            color: '#dfdfdf',
			            width: 0,
			            type: 'dashed'
			        }
			    },
			    axisLabel: {
			        formatter: '{value}'
			    }
			}
		);
		series.push(
			{
				name:thisLegendType,	
				type:'bar',
				data:dataMap.currentPowerValue
			},
			{
				name:upLegendType,
				type:'bar',
				data:queryMap.currentPowerValue
			},
			{
				name:tongbi,
				type:'line',
				yAxisIndex: 1,
				data:dataMap.tongbi
			}
		);
	}
	
	option = {
		title: {
			text: "电量概览", 
			x:'center'
		},
		tooltip: {
	        trigger: 'axis',
        	formatter : function(params, ticket, callback) {
        		var res = '';
        		if(params == null ||params[0] == null){
					return;
				}
				for(var i =0;i<params.length;i++){
					if(i==0){
						var data = null;
						if(typeof dataMap.currentPowerValue[params[i].dataIndex] == 'undefined'){
							data = "-";
						}else{
							data = dataMap.currentPowerValue[params[i].dataIndex];
						}
						var date = null;
						if(params[i].name == null || params[i].name == ''){
							date = "";
						}else{
							date = "-" + params[i].name;
						}
		            	res += params[i].seriesName.split(' ')[0]+ date + ' 电量：'+ data +'kWh' + '<br/>';
					}
					if(i==1){
						var data = null;
						if(typeof queryMap.currentPowerValue[params[i].dataIndex] == 'undefined'){
							data = "-";
						}else{
							data = queryMap.currentPowerValue[params[i].dataIndex];
						}
						var date = null;
						if(params[i].name == null || params[i].name == ''){
							date = "";
						}else{
							date = "-" + params[i].name;
						}
		            	res += params[i].seriesName.split(' ')[0]+ date + ' 电量：'+ data +'kWh' + '<br/>';
					}
					if(i==2){
						var data = null;
						if(typeof dataMap.tongbi[params[i].dataIndex] == 'undefined'){
							data = "-";
						}else{
							data = dataMap.tongbi[params[i].dataIndex];
						}
		            	res += params[i].seriesName.split(' ')[0]+ "：" + data +'%' + '<br/>';
					}
				}
				return res;
			}
	    },
	    
		legend: {
		    data:legend,
			x:'center',
			y:'35'
		},
		grid : {
			x : 85, 					// 左边距离
			y : 75,						// 上边距离
			x2 : 75,					// 右边距离
			y2 : 35						// 下边距离
		},
		xAxis: [
			{
				type: 'category',
				data: dataMap.categes
		    }
		],
		yAxis: yAxis,
		series: series
	};
	dlglChart.setOption(option,true);
	dlglChart.resize();
}

/**
 * 点击柱状图查询区域下的用户用电信息
 */
function queryElectricByClickMonth(dataDate){
	var consName = $("#jqcxMonth").val();		// 获取搜索框中的名字
	$("#qydlMonthDialog").dialog({				// 弹窗的宽高
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	});
	$('#qydlMonthDialog').dialog('open');		// 打开弹窗
	var dlzsQueryType = $('#dlzsQueryType').combobox('getValue');
	var	gridCommon = [];
	var clickDate = null;
	if(isClick == "isTwo"){
		clickDate = $('#dlzsEDateY').val();
	}else{
		clickDate = $('#dlzsEDateYUp').val();
	}
	if(dlzsQueryType == "M"){					// 选择月数据查询
		gridCommon = [[
		               	{field:'dataDate',title:'周期',width: '13%',align:'center',
		               		formatter:function(value,row,index){
		        				return value.substring(0,10);
							}
		        		},
		                {field:'consName',title:'客户名称',width: '14%',align:'center'},
		        		{field:'consNo',title:'客户编号',width: '12%',align:'center'},
		        		{field:'powerValue',title:'总电量(kWh)',width: '13%',align:'center'},
		        		{field:'powerFValue',title:'峰电量',width: '12%',align:'center'},
		        		{field:'powerPValue',title:'平电量',width: '12%',align:'center'},
		        		{field:'powerGValue',title:'谷电量',width: '12%',align:'center'},
		        		{field:'powerJValue',title:'尖电量',width: '12%',align:'center'}
		        		]
		       	];
	}else{										// 选择年数据查询
		gridCommon = [[
		               	{field:'dataDate',title:'周期',width: '9%',align:'center',
		               		formatter:function(value,row,index){
		        				return value.substring(0,10);
							}
		        		},
		        		{field:'consName',title:'客户名称',width: '11%',align:'center'},
		        		{field:'consNo',title:'客户编号',width: '9%',align:'center'},
		        		{field:'powerValue',title:'总电量(kWh)',width: '8%',align:'center'},
		        		{field:'huanbiValue',title:'上月用电(kWh)',width: '8%',align:'center'},
		        		{field:'tongbiValue',title:clickDate + '年同期(kWh)',width: '8%',align:'center'},
		        		{field:'tongbi',title:'增长率(%)',width: '8%',align:'center',
		        			formatter:function(value,row,index){
		        				return overwriteVal(value);
							}
		        		},
		        		{field:'huanbi',title:'环比(%)',width: '8%',align:'center',
		        			formatter:function(value,row,index){
		        				return overwriteVal(value);
							}
		        		},
		        		{field:'powerFValue',title:'峰电量',width: '8%',align:'center'},
		        		{field:'powerPValue',title:'平电量',width: '8%',align:'center'},
		        		{field:'powerGValue',title:'谷电量',width: '8%',align:'center'},
		        		{field:'powerJValue',title:'尖电量',width: '8%',align:'center'}
		        		]
		       	];
	}
	
	$('#qydlMonthData').datagrid({					// 表格
		nowrap : false,								// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,								// 设置为true将交替显示行背景。
		border:false,								// 边框
		width:'100%',								// 宽度
	    height:'100%',								// 高度
		pagination : true,							// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : false,							// 自动适应宽度
		singleSelect : true,						// 设置为true将只允许选择一行。
		rownumbers : true,							// 设置为true将显示行数。
		pageNumber:1,								// 在设置分页属性的时候初始化页码。
		pageSize:20,								// 在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'powerChargeView/queryElectrilByClickMonth.action',
		queryParams:{
			'consPowerInfoModel.startDate': queryChartDate, // 查询时间
	        'consPowerInfoModel.queryType': dlzsQueryType,	// 时间类型
	        'consPowerInfoModel.consName':consName,			// 客户名称
	        'consPowerInfoModel.dataDate':dataDate
		},
		onLoadSuccess : function() {				// 选择第一行
			$('#qydlMonthData').datagrid('selectRow', 0); 
		},
		loadMsg : "正在努力的读取数据中...",			// loading画面关闭
		columns : gridCommon,						// 字段
		loadFilter: function(data){					
			if (data.consMap){
				return data.consMap;
			} else {
				return data;
			}
		}
	});
	
}

/**
 * 区域电费概览表格 
 */
function queryDfDataGrid(dataList){
	var dlzsQueryType = $('#dlzsQueryTypeDF').combobox('getValue');	//获取日期插件的类型
	var	gridCommon = [];
	
	if(dlzsQueryType == "M"){					// 选择月数据时
		var date = $('#dlzsEDateMUp').val();
		gridCommon = [[
		   	     		{field:'dataDate',title:'月份',width: $(this).width()*0.11,align:'center'},
		   	     		{field:'maxDate',title:'统计户数',width: $(this).width()*0.11,align:'center'},
		   	     		{field:'jnTotalCost',title:'总电费',width: $(this).width()*0.11,align:'center'},
		   	     		{field:'tongbiValue',title:date + '月同期电费',width: $(this).width()*0.11,align:'center'},
		   	     		{field:'tongbi',title:'增长率(%)',width: $(this).width()*0.11,align:'center',
		        			formatter:function(value,row,index){
		        				return overwriteVal(value);
							}
		   	     		},
		   	     		{field:'huanbi',title:'环比(%)',width: $(this).width()*0.11,align:'center',
		        			formatter:function(value,row,index){
		        				return overwriteVal(value);
							}
		   	     		},
		   	     		{field:'baseAmt',title:'基本电费',width: $(this).width()*0.11,align:'center'},
		   	     		{field:'kwhAmt',title:'电度电费',width: $(this).width()*0.11,align:'center'},
			   	     	{field:'ltAmt',title:'力调电费',width: $(this).width()*0.11,align:'center'}
		   	     		]
		   	    	];
	}else{										// 选择年数据时
		var date = $('#dlzsEDateYDFUp').val();
		gridCommon = [[
		   	     		{field:'dataDate',title:'月份',width: $(this).width()*0.11,align:'center'},
		   	     		{field:'maxDate',title:'统计户数',width: $(this).width()*0.11,align:'center'},
		   	     		{field:'jnTotalCost',title:'总电费',width: $(this).width()*0.11,align:'center'},
		   	     		{field:'tongbiValue',title:date + '年同期电费',width: $(this).width()*0.11,align:'center'},
		   	     		{field:'tongbi',title:'增长率(%)',width: $(this).width()*0.11,align:'center',
		        			formatter:function(value,row,index){
		        				return overwriteVal(value);
							}
		   	     		},
		   	     		{field:'huanbi',title:'环比(%)',width: $(this).width()*0.11,align:'center',
		        			formatter:function(value,row,index){
		        				return overwriteVal(value);
							}
		   	     		},
		   	     		{field:'baseAmt',title:'基本电费',width: $(this).width()*0.11,align:'center'},
		   	     		{field:'kwhAmt',title:'电度电费',width: $(this).width()*0.11,align:'center'},
			   	     	{field:'ltAmt',title:'力调电费',width: $(this).width()*0.11,align:'center'}
		   	     		]
		   	    	];
	}
	$('#queryDataGrid').datagrid({ 			// 加载数据
		width : '100%',						// 宽度
		singleSelect : true,				// 设置为true将只允许选择一行。
		nowrap : false,						// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,						// 设置为true将交替显示行背景。
		border:false,						// 边框
		pagination : false,					// 设置true将在数据表格底部显示分页工具栏。
	  	fitColumns : true,					// 自动适应宽度
		rownumbers : true,					// 设置为true将显示行数。
		onLoadSuccess : function() {		// 加载数据之后
			$('#queryDataGrid').datagrid('selectRow', 0); // 选择第一行
		},
		loadMsg : "正在努力的读取数据中...",	// 提示信息
		columns : gridCommon,
		data : dataList						
	}); 
}

/**
 * 电费概览 
 */
function queryDfglChart(dataMap,queryMap,thisDianfei,upDianfei){
	legend = [];
	yAxis = [];
	series = [];
	var tongbi = "增长率";
	legend.push(thisDianfei);				
	legend.push(upDianfei);
	var dlzsQueryType = $('#dlzsQueryTypeDF').combobox('getValue');	//获取日期插件的类型
	if(dlzsQueryType == "M"){
		yAxis.push(
			{
			    name: '单位(元)',
			    type: 'value',
			}
		);
		series.push(
			{
				name:thisDianfei,
				type:'bar',
				data:dataMap.currentPowerValue
			},
			{
				name:upDianfei,
				type:'bar',
				data:queryMap.currentPowerValue
			}
		);
	}else{
		legend.push(tongbi);
		yAxis.push(
			{
			    name: '单位(元)',
			    type: 'value',
			},
			{
			    name: '增长率',
			    type: 'value',
			    splitNumber: 5,
			    splitLine: {
			        lineStyle: {
			            color: '#dfdfdf',
			            width: 0,
			            type: 'dashed'
			        }
			    },
			    axisLabel: {
			        formatter: '{value}'
			    }
			 }
		);
		series.push(
			{
				name:thisDianfei,
				type:'bar',
				data:dataMap.currentPowerValue
			},
			{
				name:upDianfei,
				type:'bar',
				data:queryMap.currentPowerValue
			},
			{
				name:tongbi,
				type:'line',
				yAxisIndex: 1,
				data:dataMap.tongbi
			}
		);
	}
	option = {
			title: {
				text: "电费概览", 
				x:'center'
			},
//			tooltip : {
//				trigger: 'axis',
//				axisPointer : {             // 坐标轴指示器，坐标轴触发有效
//				type : 'shadow'        		// 默认为直线，可选为：'line' | 'shadow'
//				}
//			},
			
			tooltip: {
		        trigger: 'axis',
	        	formatter : function(params, ticket, callback) {
	        		var res = '';
	        		if(params == null ||params[0] == null){
						return;
					}
					for(var i =0;i<params.length;i++){
						if(i==0){
							var data = null;
							if(typeof dataMap.currentPowerValue[params[i].dataIndex] == 'undefined'){
								data = "-";
							}else{
								data = dataMap.currentPowerValue[params[i].dataIndex];
							}
							var date = null;
							if(params[i].name == null || params[i].name == ''){
								date = "";
							}else{
								date = "-" + params[i].name;
							}
			            	res += params[i].seriesName.split(' ')[0]+ date + ' 电费：'+ data +'元' + '<br/>';
						}
						if(i==1){
							var data = null;
							if(typeof queryMap.currentPowerValue[params[i].dataIndex] == 'undefined'){
								data = "-";
							}else{
								data = queryMap.currentPowerValue[params[i].dataIndex];
							}
							var date = null;
							if(params[i].name == null || params[i].name == ''){
								date = "";
							}else{
								date = "-" + params[i].name;
							}
			            	res += params[i].seriesName.split(' ')[0]+ date + ' 电费：'+ data +'元' + '<br/>';
						}
					}
					return res;
				}
		    },
			toolbox: {
				feature: {
					dataView: {show: true, readOnly: false},
					magicType: {show: true, type: ['line', 'bar']},
					restore: {show: true},
					saveAsImage: {show: true}
				}
			},
			legend: {
			    data:legend,
				x:'center',
				y:'35'
			},
			grid : {
				x : 85, 					// 左边距离
				y : 75,						// 上边距离
				x2 : 85,					// 右边距离
				y2 : 35						// 下边距离
			},
			xAxis: [
				{
					type: 'category',
					data: dataMap.categes
			    }
			],
			yAxis: yAxis,
			series: series
		};

	dfglChart.setOption(option,true);
	dfglChart.resize();

}

/**
 * 电费概览 点击柱状图查询月数据 
 * seriesIndex echart lenged的下标 表示点击的是哪一个
 */
function queryDfglChartByClick(dataDate,seriesIndex){
	var consName = $("#jqccMonth").val();			// 获取搜索框名字
	var date = $('#dlzsEDateYDFUp').val();
	$("#qydfMonthDialog").dialog({					// 弹窗的宽高
		width : document.body.clientWidth-100,
		height : document.body.clientHeight-100,
		top:50,
		left:50
	});
	
	var clickDate = null;
	// 点击第二时间柱状图 弹出的同期应为第一时间
	if(seriesIndex == 1){
		clickDate = $('#dlzsEDateYDF').val();
	}else{
		clickDate = $('#dlzsEDateYDFUp').val();
	}
	
	$('#qydfMonthDialog').dialog('open');			// 打开弹窗
	var	gridCommon = [[
	   	{field:'dataDate',title:'周期',width: '11%',align:'center'},
 		{field:'consName',title:'客户名称',width: '11%',align:'center'},
 		{field:'consNo',title:'客户编号',width: '11%',align:'center'},
 		{field:'jnTotalCost',title:'总电费',width: '12%',align:'center'},
 		{field:'huanbiValue',title:'上月电费',width: '11%',align:'center'},
 		{field:'huanbi',title:'环比(%)',width: '11%',align:'center',
			formatter:function(value,row,index){
				return overwriteVal(value);
			}
 		},
 		{field:'baseAmt',title:'基本电费',width: '11%',align:'center'},
 		{field:'kwhAmt',title:'电度电费',width: '11%',align:'center'},
 		{field:'ltAmt',title:'力调电费',width: '11%',align:'center'}
 		]
	];
	
	var dlzsQueryType = $('#dlzsQueryTypeDF').combobox('getValue');	//获取日期插件的类型
	$('#qydfDayData').datagrid({					// 表格
		nowrap : false,								// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,								// 设置为true将交替显示行背景。
		border:false,								// 边框
		width:'100%',								// 宽
	    height:'100%',								// 高
		pagination : true,							// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : false,							// 自动适应宽度
		singleSelect : true,						// 设置为true将只允许选择一行。
		rownumbers : true,							// 设置为true将显示行数。
		pageNumber:1,								// 在设置分页属性的时候初始化页码。
		pageSize:20,								// 在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'powerChargeView/queryDfglChartByClick.action',
		queryParams:{
			 'consPowerInfoModel.startDate': queryChartDate, // 查询时间
		     'consPowerInfoModel.queryType': dlzsQueryType,	 // 时间类型
		     'consPowerInfoModel.consName':consName,		 // 客户名称
		     'consPowerInfoModel.dataDate':dataDate,
		     'consPowerInfoModel.shiduan':seriesIndex
		},
		onLoadSuccess : function() {
			$('#qydfDayData').datagrid('selectRow', 0); // 选中第一行
		},
		loadMsg : "正在努力的读取数据中...",			// loading画面关闭
		columns : gridCommon,						// 字段
		loadFilter: function(data){
			if (data.consMap){
				return data.consMap;
			} else {
				return data;
			}
		}
	});
	
}


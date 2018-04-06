/**
 * 电量电费分析
 */
var currentdate = new Date();//当前日期
var startDate = new Date(); // 当前开始时间 为当前时间往前推一年
var endDate = new Date();//当前结束时间  为当前时间
var hydlChart = '';//chart
var prePowerValue = new Array();	// 前一期数据
var tradeCode = '';				// 行业ID 默认选中一个

$(function(){

	// 日期初始化
	initialize();
	
	// 初始化echart
	hydlChart = echarts.init(document.getElementById('hydlChart'));
	
	// 加载下拉框
	queryHyByConsId();
	// 为下拉框赋值
	$('#queryHyByConsId').combobox('setValue','2770');
	// 查询数据
	getData();					
	
	// 行业树
//	$('#TRADE_CODE').combotree({
//		url :webContextRoot + 'areaEnergy/tradeCombox.action',
//		onLoadSuccess : function(node,data){
//		    $(this).tree('collapseAll');
//		},onClick : function(node,data){
//			tradeCode = $('#TRADE_CODE').combobox('getValue');
//			getData();					// 查询数据
//		}
//	});
	
	
});

/**
 * 2017-09-05修改
 * 根据用户ID关联行业查询 
 * @author meng_xianling
 */
function queryHyByConsId(){
	
	/**
	 * 下拉框 
	 */
	$('#queryHyByConsId').combobox({
		panelWidth:155,	
		panelHeight:300,// 设置下拉的宽度 和下拉框保持一致
		url:webContextRoot +'hydj/queryHyListByConsId.action',
		valueField:'CODE_VALUE',
		textField:'CODE_NAME',
		onLoadSuccess: function () {// 下拉框数据加载成功调用
        	var propOwnerData = $(this).combobox("getData");// 得到查询的list集合
        	if(propOwnerData.length>0){
        		$('#queryHyByConsId').combobox('select',propOwnerData[0].CODE_VALUE);// 默认加载第一个生产线
        	}else{
        		$('#queryHyByConsId').combobox('select','');// 没有生产线时
        	}
        },
        onChange: function(newValue, oldValue){
        	tradeCode = newValue;
        	getData();
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
				$('#dlzsEDateM').val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,endDate)));
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
}

/**
 * 查询行业用电电量
 */
function getData(){
	
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
	}
	
	hydlChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	// 第二时间查询数据
	$.ajax({
		type: "post",
		url:webContextRoot + 'hyyd/queryHyElectril.action',//请求地址
		data: "consPowerInfoModel.tradeCode=" + tradeCode + "&consPowerInfoModel.startDate=" + dlzsEDateUp + "&consPowerInfoModel.queryType=" + dlzsQueryType,//得到时间+用户ID
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(result){
			prePowerValue = result.consMap.currentPowerValue;
		}
	});
	
	$.post(webContextRoot +'hyyd/queryHyElectril.action',{
    	'consPowerInfoModel.tradeCode': tradeCode,
        'consPowerInfoModel.startDate': dlzsEDate,
        'consPowerInfoModel.queryType': dlzsQueryType
     },
     function(data){
    	//加载echart数据
    	 queryHyChart(data.consMap,prePowerValue,thisLegendType,upLegendType);
		 hydlChart.hideLoading();
		
     },'json');
}

/**
 * 行业用电 图表
 */
function queryHyChart(dataMap,prePowerValue,thisLegendType,upLegendType){
	var legend = [];
	legend.push(thisLegendType);
	legend.push(upLegendType);
	option = {
			 title: {
			        text: '行业用电', 
			        x:'center'
			},
			
//		    tooltip : {
//		        trigger: 'axis',
//		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//		        }
//		    },
		    
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
							if(typeof prePowerValue[params[i].dataIndex] == 'undefined'){
								data = "-";
							}else{
								data = prePowerValue[params[i].dataIndex];
							}
							var date = null;
							if(params[i].name == null || params[i].name == ''){
								date = "";
							}else{
								date = "-" + params[i].name;
							}
			            	res += params[i].seriesName.split(' ')[0]+ date + ' 电量：'+ data +'kWh' + '<br/>';
						}
					}
					return res;
				}
		    },
		    legend: {
//		        data: ['行业'],
		        data:legend,
		        x:'center',
		        y:'35'
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
		        data : dataMap.categes
		        
		    },
		    yAxis: [
		        {
		            name: '单位(kWh)',
		            type: 'value',
		        }
		    ],
		    series: [
		        {
		        	name : thisLegendType,
		        	type : 'bar',
		            data : dataMap.currentPowerValue
		        },
		        {
		        	name : upLegendType,
		        	type : 'bar',
		            data : prePowerValue
		        }
		        
		    ]
		};

		hydlChart.setOption(option,true);
		hydlChart.resize();

}

/**
 * 行业面板 
 * 
 * 循环遍历行业集合，分多个div写到页面(一个父类行业是一个div,包含他的子类行业)
 */
function openHy(){
	
	$('#openHy').dialog('open');		// 打开弹窗
	
	$.ajax({
		type: "post",
		url:webContextRoot + 'hyyd/queryTreeByHy.action',//请求地址
		data:"",
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(json){
			var list = json.consMap.list;
			var attr = '';
			var left = '';
			var array = [];
			
			for(var i = 0 ; i < 20;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr1 = '';
			var left1 = '';
			
			
			for(var i = 20 ; i < 41;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left1 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr1 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr2 = '';
			var left2 = '';
			for(var i = 41 ; i < 275;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left2 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr2 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr3 = '';
			var left3 = '';
			for(var i = 275 ; i < 286;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left3 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr3 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr4 = '';
			var left4 = '';
			for(var i = 286 ; i < 293;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left4 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr4 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr5 = '';
			var left5 = '';
			for(var i = 293 ; i < 308;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left5 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr5 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr6 = '';
			var left6 = '';
			for(var i = 308 ; i < 321;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left6 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr6 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr7 = '';
			var left7 = '';
			for(var i = 321 ; i < 342;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left7 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr7 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr8 = '';
			var left8 = '';
			for(var i = 342 ; i < 352;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left8 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr8 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr9 = '';
			var left9 = '';
			for(var i = 352 ; i < 364;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left9 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr9 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr10 = '';
			var left10 = '';
			for(var i = 364 ; i < 370;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left10 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr10 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr11 = '';
			var left11 = '';
			for(var i = 370 ; i < 384;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left11 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr11 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr12 = '';
			var left12 = '';
			for(var i = 384 ; i < 402;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left12 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr12 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr13 = '';
			var left13 = '';
			for(var i = 402 ; i < 415;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left13 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr13 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr14 = '';
			var left14 = '';
			for(var i = 415 ; i < 430;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left14 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr14 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr15 = '';
			var left15 = '';
			for(var i = 430 ; i < 448;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left15 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr15 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr16 = '';
			var left16 = '';
			for(var i = 448 ; i < 463;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left16 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr16 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr17 = '';
			var left17 = '';
			for(var i = 463 ; i < 496;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left17 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr17 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr18 = '';
			var left18 = '';
			for(var i = 496 ; i < 509;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left18 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr18 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			
			var attr19 = '';
			var left19 = '';
			for(var i = 509 ; i < 511;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left19 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr19 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			var attr20 = '';
			var left20 = '';
			for(var i = 511 ; i < 515;i++){

				var Sowntext = list[i].text.length>8?(list[i].text.substring(0,8)+'...'):list[i].text;
				
				// 子节点
				if(list[i].parentId == 0 && list[i].iconCls == 1){
					
					left20 += "<div class=\"row\" style=\"padding-left:20px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
					
				}else{
					attr20 += "<div class=\"row\" style=\"float:left;left:120px;\">" + 
								"<div class=\"col-md-2 org_col \" style=\"width:155px;\">" +
									"<div class=\"SlowFast \" style=\"width:155px;float:left;\"> " +
										"<label type=\"button\" onclick=\"queryChartByCode(\'"+list[i].id+"\',\'"+list[i].text+"\')\" class=\"btn row-regionbutton\" style=\"width:125px;text-align:left;\">" +
											""+Sowntext+"" +
										"</label>" + 
									"</div>	" + 
								"</div>	" + 
							"</div>";  
				}
				
			}
			
			
			
			$('#fatherHy').html(left);		
			$('#getHyList').html(attr);		
			
			$('#fatherHy1').html(left1);		
			$('#getHyList1').html(attr1);
			
			$('#fatherHy2').html(left2);		
			$('#getHyList2').html(attr2);
			
			$('#fatherHy3').html(left3);		
			$('#getHyList3').html(attr3);
			
			$('#fatherHy4').html(left4);		
			$('#getHyList4').html(attr4);
			
			$('#fatherHy5').html(left5);		
			$('#getHyList5').html(attr5);
			
			$('#fatherHy6').html(left6);		
			$('#getHyList6').html(attr6);
			
			$('#fatherHy7').html(left7);		
			$('#getHyList7').html(attr7);
			
			$('#fatherHy8').html(left8);		
			$('#getHyList8').html(attr8);
			
			$('#fatherHy9').html(left9);		
			$('#getHyList9').html(attr9);
			
			$('#fatherHy10').html(left10);		
			$('#getHyList10').html(attr10);
			
			$('#fatherHy11').html(left11);		
			$('#getHyList11').html(attr11);
			
			$('#fatherHy12').html(left12);		
			$('#getHyList12').html(attr12);
			
			$('#fatherHy13').html(left13);		
			$('#getHyList13').html(attr13);
			
			$('#fatherHy14').html(left14);		
			$('#getHyList14').html(attr14);
			
			$('#fatherHy15').html(left15);		
			$('#getHyList15').html(attr15);
			
			$('#fatherHy16').html(left16);		
			$('#getHyList16').html(attr16);
			
			$('#fatherHy17').html(left17);		
			$('#getHyList17').html(attr17);
			
			$('#fatherHy18').html(left18);		
			$('#getHyList18').html(attr18);
			
			$('#fatherHy19').html(left19);		
			$('#getHyList19').html(attr19);
			
			$('#fatherHy20').html(left20);		
			$('#getHyList20').html(attr20);
			
		}
	});
}

/**
 * 点击行业查询 
 */
function queryChartByCode(code,name){
	tradeCode = code;
	$("#findName").textbox("setValue",name);// 关闭弹窗 清空文本框
	$('#openHy').dialog('close');
	getData();
}


/**
 * 行业电价分析 
 */
var currentdate = new Date();//当前日期
var startDate = new Date(); // 当前开始时间 为当前时间往前推一年
var endDate = new Date();//当前结束时间  为当前时间
var hydjChart = '';//chart
var tradeCode = '';				// 行业ID 默认选中一个

$(function(){

	// 日期初始化
	initialize();
	
	// 初始化echart
	hydjChart = echarts.init(document.getElementById('hydjChart'));
	
	// 加载下拉框
	queryHyByConsId();
	// 查询数据
	setTimeout("getData();",100);				
	
});

/**
 * 数据 
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
		thisLegendType = date + " 年电价";						// 拼接chart中legend属性
		upLegendType =  upLegend + " 年电价";						
	}
	
	hydjChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	// 获取行业电价
	tradeCode = $('#queryHyByConsId').combobox('getValue');
	// 第二时间查询数据
	$.ajax({
		type: "post",
		url:webContextRoot + 'hydj/queryElecPriceByConsId.action',//请求地址
		data: "consPowerInfoModel.tradeCode=" + tradeCode + "&consPowerInfoModel.startDate=" + dlzsEDateUp + "&consPowerInfoModel.queryType=" + dlzsQueryType,//得到时间+用户ID
		dataType:"json",		// 返回类型
		cache : false,
		async : false,			// 同步异步请求
		success: function(result){
			prePowerValue = result.consMap.currentPowerValue;
		}
	});
	
	$.post(webContextRoot +'hydj/queryElecPriceByConsId.action',{
    	'consPowerInfoModel.tradeCode': tradeCode,
        'consPowerInfoModel.startDate': dlzsEDate,
        'consPowerInfoModel.queryType': dlzsQueryType
     },
     function(data){
    	//加载echart数据
    	 queryHyChart(data.consMap,prePowerValue,thisLegendType,upLegendType);
    	 hydjChart.hideLoading();
		
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
			        text: '行业电价', 
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
			            	res += params[i].seriesName.split(' ')[0]+ date + ' 电价：'+ data +'元' + '<br/>';
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
			            	res += params[i].seriesName.split(' ')[0]+ date + ' 电价：'+ data +'元' + '<br/>';
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
		            name: '单位(元)',
		            type: 'value',
		        }
		    ],
		    series: [
		        {
		        	name : thisLegendType,
		        	type : 'bar',
		        	barWidth : 25,
		            data : dataMap.currentPowerValue
		        },
		        {
		        	name : upLegendType,
		        	type : 'bar',
		        	barWidth : 25,
		            data : prePowerValue
		        }
		        
		    ]
		};

		hydjChart.setOption(option,true);
		hydjChart.resize();

}


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
				$('#dlzsEDateM').val(DateUtil.dateToStr('yyyy-MM',endDate));
//				$('#dlzsEDateM').val(DateUtil.dateToStr('yyyy-MM',DateUtil.dateAdd('m',-1,endDate)));
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
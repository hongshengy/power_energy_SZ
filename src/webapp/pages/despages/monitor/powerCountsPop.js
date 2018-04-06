/**
 * 功率因数分析弹出
 * @author 王梓璇
 * @since 2017-04-28
 */
myChart = '';

function userResize(widths,heights){
	$("#userChart").width($("#userChart").parent().width());
	$("#userChart").height($("#userChart").parent().height());
	
	if(!!myChart){
		myChart.resize({
		    width: $("#userChart").parent().width(),
		    height: $("#userChart").parent().height()
		});
	}
}
$(function(){
	myChart = echarts.init(document.getElementById('userChart'));
	 var consNoObj = document.getElementById('timeRq');
	 consNoObj.innerHTML = startDate;
	queryglysZxyw();
	queryglyszf();
});
//未选择大用户    根据日期查询所有
function queryglysZxyw(){
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.getJSON(webContextRoot + 'powerFactorAnalyze/queryglysZxyw.action', 
		{ 
		   //请求参数
			'classesEnergyModel.beginData': startDate,//当天时间  要查询的日期
			'classesEnergyModel.consId': consId,//当前选择的客户
			'classesEnergyModel.groupDateType': groupDateType//当前查询的日期类型
		},
		function(json){
		    getGdtjfxData(json);
		    myChart.hideLoading();
		}
	);
}

//未选择大用户    根据日期查询所有
function queryglyszf(){
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	$.getJSON(webContextRoot + 'powerFactorAnalyze/queryglyszxygfxyg.action', 
		{ 
		   //请求参数
			'classesEnergyModel.beginData': startDate,//当天时间  要查询的日期
			'classesEnergyModel.consId': consId,//当前选择的客户
			'classesEnergyModel.groupDateType': groupDateType//当前查询的日期类型
		},
		function(json){
			
			  var consNoObj1 = document.getElementById('maxFZL');//正向有功值
			  consNoObj1.innerHTML = (json.sMap.zxygD==null?"-":json.sMap.zxygD)+'kWh';
			  var contractCapObj = document.getElementById('minFZL');
			  contractCapObj.innerHTML = (json.sMap.fxygD==null?"-":json.sMap.fxygD)+'kWh';
			  var elecAddrObj = document.getElementById('avgFZL');//功率因数
			  elecAddrObj.innerHTML = (json.sMap.glys==null?"-":json.sMap.glys);
			  
		}
	);
}


//echarts柱状图
function getGdtjfxData(dataMap){
	 //初始化
	var title = '';
		title = consName+'功率因数分析';
	var option = {
		    title: {
		        text: title,
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'axis',
		        	formatter: function(params) {
		        		var res = "";
						for (var i = 0; i < params.length; i++) {
							if (i == 0) {
								res = '时间: '+ params[i].name + '<br/>';
							}
							res += params[i].seriesName + ' : ';
							if (params[i].seriesName.indexOf('正向有功') >= 0) {
								res += params[i].value + 'kWh<br/>'
							} else if (params[i].seriesName.indexOf('正向无功') >= 0) {
								res += params[i].value + 'kWh';
							}
						}
						return res;
			        }
		    },
		    legend: {// 
		    	data : ['正向有功','正向无功'],//数据
		    	x: 'center',
		        y: '30px'
		    },
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		    xAxis: {
		        type: 'category',
		        splitLine: {show: false},
		        data:dataMap.sMap.categes
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    yAxis:[{
	            name: '单位(kWh)',
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
	            },
	            min:'0' 
	        }], 
		    series: [  
		             {
		     	        name: '正向有功',
		     	        type: 'line',
		     	        data:dataMap.sMap.zxygData
		     	    }, {
		    	        name: '正向无功',
		    	        type: 'line',
		    	        data:dataMap.sMap.zxwgData
		    	    } 
		         ]
		};
	myChart.setOption(option,true);
}
/**
 * 电费超容负荷
 * @author 王梓璇
 * @since 2017-04-17
 */
//此界面为超容分析k线图点击进入的详情展示图，点击进入某一天的96点详情
myChart = '';//
//进行适配
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
	myChart = echarts.init(document.getElementById('userChart'));//echart图初始化
	getNineSixData();//查询96信息
});
//未选择大用户    根据日期查询所有
function getNineSixData(){
//	myChart = echarts.init(document.getElementById('userChart'));
//	var startDate = '2017-04-15';//开始日期
//	var endDate = '2017-04-15';
//	var consId = 101000004001;
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	myChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	$.getJSON(webContextRoot + 'powerLoadAnalyze/queryNineSix.action', 
		{ 
		   //请求参数
			'chargeAnlysisModel.beginData': startDate,//当天时间  要查询的日期96个点
			'chargeAnlysisModel.endData': endDate,//结束时间
			'chargeAnlysisModel.consId': consId//当前选择的客户
		},
		function(json){
			
			 var consNoObj = document.getElementById('maxFZL');
			  consNoObj.innerHTML = json.sMap.max+'kW';//最大值
			  
			  var consNoObj1 = document.getElementById('maxdate');
			  consNoObj1.innerHTML = json.sMap.maxTime;//最大发生时间
			  
			  var consNameObj = document.getElementById('minFZL');
			  consNameObj.innerHTML = json.sMap.min+'kW';//最小值
			  
			  var contractCapObj = document.getElementById('mindate');
			  contractCapObj.innerHTML = json.sMap.minTime;//最小发生时间
			  
			  var elecAddrObj = document.getElementById('avgFZL');//平均值
			  elecAddrObj.innerHTML = json.sMap.avg+'kW';
			  
		    getGdtjfxData(json);
		    myChart.hideLoading();
		}
	);
}

//echarts柱状图
function getGdtjfxData(dataMap){
	 //初始化
//	myChart = echarts.init(document.getElementById('userChart'));
//	myChart.showLoading({
//		text:'正在努力的读取数据中...',
//		effect:'spin'
//	});
	
	var series = [];//图标曲线集
	var legend = [];//坐标轴
	var title = '';
	if(dataMap.sMap.chargeData!=null){
		title = consName+'负荷走势(96点)';
	}
	//series数据
	if(dataMap.sMap.chargeData!=null){
		series.push( {
	        name: '实际负荷',
	        type: 'line',
	        data:dataMap.sMap.chargeData,
	        yAxisIndex: 0
	    } );
		series.push({
            name:'基准值',
            type:'line',
            data:[dataMap.sMap.plate],
            yAxisIndex: 0,
            itemStyle:{
                normal:{opacity:0,color:'red'}
            },
            markLine: {
                symbolSize:[0,0],
                lineStyle:{
                    normal:{type:'solid',opacity:0.4},
                    emphasis:{width:1}
                },
                data: [
                    {
				        // 支持 'average', 'min', 'max'
				        type: 'average'
//				        label:{normal:{formatter:'{c}kVA'},emphasis:{formatter:'{c}kVA'}}
				   }
                ]
            }
        });
		legend.push('实际负荷');
//		legend.push('基准值');
	}

	var option = {
		    title: {
		        text: title,
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'axis',
		        	formatter: function(params) {
		        		if(params!=null && params[0]!=null){
		        			if(params.length == 1){
		        				return;
		        			}else if (params.length == 2){
		        				var paramResult = '时间: '+ params[0].name + '<br/>';
		        				paramResult += params[0].seriesName + ' : ' + params[0].value + ' (kW)<br/>';
		        			}
			        	}
		        		return paramResult;
		        		
//		        		var res = "";
//						for (var i = 0; i < params.length; i++) {
//							if (i == 0) {
//								res = '时间: '+ params[i].name + '<br/>';
//							}
//							res += params[i].seriesName + ' : ';
//							if (params[i].seriesName.indexOf('实际负荷') >= 0) {
//								res += params[i].value + 'kW<br/>'
//							} 
//						}
//						return res;
		        		
			        }
		    },
		    legend: {// 
		    	data : legend,//数据
		    	x: 'center',
		        y: '30px'
		    },
		    toolbox:{
		    	show:true,
		    	feature:{
		    		dataZoom:{},
//		    		dataView:{readOnly:false},
		    		magicType:{type:['line','bar']},
		    		restore:{},
		    		saveAsImage:{}
		    	}
		    },
		    xAxis: {
		        type: 'category',
		        splitLine: {show: false},
		        data:dataMap.sMap.categes
//		        	['01:00:00', '01:00:00', '01:00:00', '01:00:00', '01:00:00', '01:00:00', '01:00:00', '01:00:00', '01:00:00']
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    yAxis:[{
	            name: '单位(kW)',
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
		    series: series
		};
	myChart.setOption(option,true);
	
}

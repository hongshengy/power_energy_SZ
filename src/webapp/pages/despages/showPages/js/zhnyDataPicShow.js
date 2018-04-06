var myChart1 = echarts.init(document.getElementById('div_body_info1'));
var myChart2 = echarts.init(document.getElementById('div_body_info2'));
var myChart3 = echarts.init(document.getElementById('div_body_info3'));
var myChart4 = echarts.init(document.getElementById('div_body_info4'));

var clickIndex = 0;
var bwClickIndex = 0;
var allBwClickCount = 0;
var gjClickIndex = 0;
var allGjClickCount = 0;

var parentFrame = this.parent;



$(document).ready(function(){
	loadyhfbPie();
	loadyhfbPie2();
	loadLineInfo();
	loadLineInfo2();
});

function query1(){
	loadyhfbPie();
}

function query2(){
	loadLineInfo();
}

function query3(){
	loadyhfbPie2();
}

function query4(){
	loadLineInfo2();
}

function myformatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	return y+'-'+(m<10?('0'+m):m);
}

function myparser(s){
	if(!s)return new Date();
	var ss = (s.split('-'));
	var y = parselnt(ss[0],10);
	var m = parselnt(ss[1],10);
	if(!isNan(y)&&!isNan(m)){
		return new Date(y,m-1);
	}else{
		return new Date();
	}
}
function loadyhfbPie(){
	var startDay3 = $('#startDay3').val();
	$.ajax({
		type: "post",
		url: basePath + "capacityData/showPieChart.action",
		data: "queryPara.date=" + startDay3 + "&queryPara.flag=0",
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			var X_DATA1 = result.name;
			var X_DATA2 = result.sdata;
			option = {
		    title : {
		    	text:'用电器日用电统计图',
		     	x:'center',
			    padding:45
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        x : 'center',
			    y : 'bottom',
				padding:5,
		        data:X_DATA1
		    },
		    calculable : true,
		    series : [
		        {
		            name:'用电占比',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '50%'],
		            itemStyle : 
						          	{ 
						              normal: {
						              	label : {
						              		textStyle:{
								            	fontSize: 18
								            	//,color: '#400080'
								            },
						                	show: true, position: 'outer',
						                  	formatter:function (params) {
							                    //var res = params.data.name+': ';
							                    //res+=''+params.data.value;
							                    //res+='     ('+params.percent+'%)';
							                     return params.data.name+': ' +(params.percent - 0).toFixed(0) + '%';
						                  	}
						              	},
						                labelLine:{show:true}
						              }
						            },
		            data: X_DATA2
		        }
		    ]
			};
			myChart1.setOption(option);
		},
		error:function(e)
		{
			
		}
	});
}

function loadyhfbPie2(){
	var startDay3 = $('#startDay5').val();
	$.ajax({
		type: "post",
		url: basePath + "capacityData/showPieChart.action",
		data: "queryPara.date=" + startDay3 + "&queryPara.flag=1",
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			var X_DATA1 = result.name;
			var X_DATA2 = result.sdata;
			option = {
		    title : {
		    	text:'用电器月用电统计图',
		     	x:'center',
			    padding:45
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        x : 'center',
			    y : 'bottom',
				padding:5,
		        data:X_DATA1
		    },
		    calculable : true,
		    series : [
		        {
		            name:'用电占比',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '50%'],
		            itemStyle : 
						          	{ 
						              normal: {
						              	label : {
						              		textStyle:{
								            	fontSize: 18
								            	//,color: '#400080'
								            },
						                	show: true, position: 'outer',
						                  	formatter:function (params) {
							                    //var res = params.data.name+': ';
							                    //res+=''+params.data.value;
							                    //res+='     ('+params.percent+'%)';
							                    return params.data.name+': ' +(params.percent - 0).toFixed(0) + '%';
						                  	}
						              	},
						                labelLine:{show:true}
						              }
						            },
		            data: X_DATA2
		        }
		    ]
			};
			myChart3.setOption(option);
		},
		error:function(e)
		{
			
		}
	});
}

function loadLineInfo(){
	var startDay3 = $('#startDay4').val();
	var elect = $('#electrical').val();
	$.ajax({
		type: "post",
		url: basePath + "capacityData/showLineChart.action",
		data: "queryPara.date=" + startDay3 + "&queryPara.elect=" + elect + "&queryPara.flag=2",
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			var X_DATA1 = result.name;
			var X_DATA2 = result.sdata;

			var option = {
			    title : {
			        text: '用电器月用电曲线 kW',
			      	x:'center'
			        //subtext: '纯属虚构'
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['日用电'],
			        selected : {'日用电':true},
			        			/**
			        			{'用电':true,
			        			'用电(前一天)':true,
			        			'出线':false,
			        			'出线(前一天)':false
			        			},**/
			      	y: 'bottom'
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : X_DATA1
			        }
			    ],
			    yAxis : [
			        {
			        	name : '单位(kw)',
			            type : 'value',
			            axisLabel : {
			                formatter: '{value}'//'{value} °C'
			            }
			        }
			    ],
			    series : [
			        {
			            name:'用电',
			            type:'line',
			            data: X_DATA2
			        }
			    ]
			};
			myChart2.setOption(option);
		},
		error:function(e)
		{
			
		}
	});
}
function loadLineInfo2(){
	var startDay3 = $('#startDay6').val();
	var elect = $('#electrical1').val();
	$.ajax({
		type: "post",
		url: basePath + "capacityData/showLineChart.action",
		data: "queryPara.date=" + startDay3 + "&queryPara.elect=" + elect + "&queryPara.flag=3",
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			var X_DATA1 = result.name;
			var X_DATA2 = result.sdata;

			var option = {
			    title : {
			        text: '用电器月用电曲线 kW',
			      	x:'center'
			        //subtext: '纯属虚构'
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['月用电'],
			        selected : {'月用电':true},
			        			/**
			        			{'用电':true,
			        			'用电(前一天)':true,
			        			'出线':false,
			        			'出线(前一天)':false
			        			},**/
			      	y: 'bottom'
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : X_DATA1
			        }
			    ],
			    yAxis : [
			        {
			        	name : '单位(kw)',
			            type : 'value',
			            axisLabel : {
			                formatter: '{value}'//'{value} °C'
			            }
			        }
			    ],
			    series : [
			        {
			            name:'用电',
			            type:'line',
			            data: X_DATA2
			        }
			    ]
			};
			myChart4.setOption(option);
		},
		error:function(e)
		{
			
		}
	});
}



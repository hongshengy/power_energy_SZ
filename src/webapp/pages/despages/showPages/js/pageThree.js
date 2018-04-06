/**
 * 
 */

setInterval(function(){
	loadReflushData();
}, 1000 * 60);

function loadReflushData(){
	$.ajax({
		type: "post",
		url: basePath + "/bigScreen/bigScreenRefresh.action",
		data: "",
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			$('#z_30').text((result.REALTIMELOAD == '' ? '--' : parseFloat(result.REALTIMELOAD).toFixed(2)));
			$('#z_32').text((result.REALTIMELOAD == '' ? '--' : parseFloat(result.REALTIMELOAD).toFixed(2)));
			$('#z_31').text((result.REALTIMEELECTRICITY == '' ? '--' : parseFloat(result.REALTIMEELECTRICITY).toFixed(2)));
			
			if (!isFinished){
				
				$('#mainDiv').css({
					'display' : ''
				});
				
				setTimeout(function(){
					
					$('#e_1').addClass('menuFirstOneIn');
					
					$('#o_1').css({
						'display' : 'block'
					});
					
					setTimeout(function(){
						isFinished = true;
						$('#e_1').css({
							'height' : '255px'
						});
						
						$('#e_1').removeClass('menuFirstOneIn');
					},1000);
					
				}, 800);
			}
		},
		error:function(e)
		{
			$.messager.alert('错误','bigScreenRefresh.action请求错误码：' + e.readyState);
		}
	});
}

function loadInitData(){
	$.ajax({
		type: "post",
		url: basePath + "/bigScreen/bigScreenInit.action",
		data: "",
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			$('#z_3').text((result.MAINTRANSFORMERCAP == '' ? '--' : parseFloat(result.MAINTRANSFORMERCAP).toFixed(2)));
			$('#z_14').text((result.TOTALELECTRICITY == '' ? '--' : parseFloat(result.TOTALELECTRICITY).toFixed(2)));
			$('#z_11').text((result.MAINTRANSFORMERNUM == '' ? '--' : result.MAINTRANSFORMERNUM));
			$('#z_4').text((result.MAINTRANSFORMERNUM == '' ? '--' : result.MAINTRANSFORMERNUM));
			$('#z_5').text((result.USERSNUM == '' ? '--' : result.USERSNUM));
			$('#z_12').text((result.USERSNUM == '' ? '--' : result.USERSNUM));
			$('#z_19').text((result.USERSNUM == '' ? '--' : result.USERSNUM));
			$('#z_6').text((result.SUBSTATIONNUM == '' ? '--' : result.SUBSTATIONNUM));
			$('#z_13').text((result.SUBSTATIONNUM == '' ? '--' : result.SUBSTATIONNUM));
			$('#z_7').text((result.WORKORDERNUM == '' ? '--' : result.WORKORDERNUM));
			$('#z_16').text((result.WORKORDERNUM == '' ? '--' : result.WORKORDERNUM));
			$('#z_8').text((result.POINTSNUM == '' ? '--' : result.POINTSNUM));
			$('#z_15').text((result.MAINTRANSFORMERCAP == '' ? '--' : parseFloat(result.MAINTRANSFORMERCAP).toFixed(2)));
			$('#z_17').text((result.WORKORDERNUM == '' ? '--' : result.WORKORDERNUM));
			$('#z_18').text((result.NOWYEAR == '' ? '--' : result.NOWYEAR));
			
			loadReflushData();
		},
		error:function(e)
		{
			$.messager.alert('错误','bigScreenInit.action请求错误码：' + e.readyState);
		}
	});
}

loadInitData();

var isFinished = false;

var myChart1 = echarts.init(document.getElementById('div_body_info2'));
var myChart2 = echarts.init(document.getElementById('div_body_info13'));
var myChart3 = echarts.init(document.getElementById('div_body_info'));
var myChart4 = echarts.init(document.getElementById('div_body_info14'));
var myChart5 = echarts.init(document.getElementById('div_body_info3'));

$('#wnGrade').combobox({
	onSelect: function(param){
		var startDay2 = $('#startDay3').val();
			loadLineInfo(startDay2,param.value);
		}
	}
);
  
$('#startDay3').datebox({
	onSelect: function(date){
		var dataValue = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			loadLineInfo(dataValue,$('#wnGrade').val());
		}
	}
);

function loadLineInfo(dateTime,selVal){
	var legendData = new Array();
	var X_DATA1 = new Array();
	var X_DATA2 = new Array();
	loadLineDataInfo(dateTime,selVal);
	function loadLineDataInfo(dateTime,selVal){
		var startDay3 = $('#startDay3').val();
		var selValData = 288;
		if(dateTime.length > 0){
			startDay3 = dateTime;
		}
		if(selVal.length > 0){
			selValData = selVal;
		}
		$.ajax({
			type: "post",
			url: basePath + "/homeFirstPageAction/loadLineInfo.action",
			data: "queryPara.START_DATE=" + startDay3 + "&queryPara.SEL_VAL=" + selValData,
			dataType:"json",
			cache : false,
			async : true,//同步异步请求
			success: function(result)
			{	
				
				legendData = result.X_NAME;
				X_DATA1 = result.X_DATA1;
				X_DATA2 = result.X_DATA2;
				X_DATA3 = result.X_DATA3;
				X_DATA4 = result.X_DATA4;
				
				var option = {
					    title : {
				        text: '区域负荷曲线 kW',
				      	x:'center',
				      	show:false
				        //subtext: '纯属虚构'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['用电','用电(前一天)'],//['用电','用电(前一天)','出线','出线(前一天)'],
				        selected : {'用电':true,
				        			'用电(前一天)':true
				        			},
				        			/**
				        			{'用电':true,
				        			'用电(前一天)':true,
				        			'出线':false,
				        			'出线(前一天)':false
				        			},**/
				      	padding:32
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
				            data : legendData//['周一','周二','周三','周四','周五','周六','周日']
				        }
				    ],
				    yAxis : [
				        {
				        	//name : '单位',
				            type : 'value',
				            axisLabel : {
				                formatter: '{value}'//'{value} °C'
				            }
				        }
				    ],
				  	grid: {y: 70, y2:30, x2:20},
				    series : [
				        {
				            name:'用电',
				            type:'line',
				            data: X_DATA1//[11, 11, 15, 13, 12, 13, 10]
				        },
				        {
				            name:'用电(前一天)',
				            type:'line',
				            data: X_DATA2//[1, -2, 2, 5, 3, 2, 0]
				        }/**,
				        {
				            name:'出线',
				            type:'line',
				            data: X_DATA3//[1, -20, 2, 50, 3, 20, 0]
				        },
				        {
				            name:'出线(前一天)',
				            type:'line',
				            data: X_DATA4//[10, -2, 20, 5, 30, 2, 10]
				        }**/
				    ]
				};
				myChart1.setOption(option);
			},
			error:function(e)
			{
				
			}
		});
	}
}

function loadQydlBar(){
	var X_NAME = new Array();
	var X_DATA = new Array();
	loadQydlBarByXZhou();
	
	function loadQydlBarByXZhou(){
		var startDay1 = $('#startDay1').val();
		var endDay1 = $('#endDay1').val();
		$.ajax({
			type: "post",
			url: basePath + "/homeFirstPageAction/loadQydlBar.action",
			data: "queryPara.startDay=" + startDay1 + "&queryPara.endDay=" + endDay1,
			dataType:"json",
			cache : false,
			async : true,//同步异步请求
			success: function(result)
			{	
				//
				X_NAME = result.X_NAME;
				X_NAME_DATA = result.X_NAME_DATA;
				X_DATA = result.X_DATA;
				
				var option = {
				  	title : {
				      text: '区域企业总用电量 kWh',
				      x:'center',
				      show:false
				    },
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				    	x:'center',
				    	padding:33,
				        data:['总用电量']
				    },
				    grid: {x2:20},
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            axisTick : true,
				            data : X_NAME//['周一','周二','周三','周四','周五','周六','周日']
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'总用电量',
				            type:'bar',
				            data:X_DATA//[320, 332, 301, 334, 390, 330, 320]
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
}

function cdfbtjt(){
	
	var legendData13 = new Array();
	var seriesData13 = new Array();
	var X_COUNT = 0;
	
	loadyhfbPieData();
	
	function loadyhfbPieData(){
		$.ajax({
			type: "post",
			url: basePath + "/homeFirstPageAction/cdfbtjbtQuery.action",
			data: "",
			dataType:"json",
			cache : false,
			async : true,//同步异步请求
			success: function(result)
			{	
				legendData = result.X_NAME;
				seriesData = result.X_DATA;
				X_COUNT = result.X_SUM;
				
				var allNum = -1;
				$.each(seriesData, function(i, n){
					
					allNum += parseInt(n.value);
					
					switch (n.name){
					case '遥脉':
						$('#z_22').text((n.value == '' ? '--' : n.value));
						break;
					case '遥信':
						$('#z_21').text((n.value == '' ? '--' : n.value));
						break;
					case '遥测':
						$('#z_20').text((n.value == '' ? '--' : n.value));
						break;
					}
				});
				
				if (allNum > 0){
					allNum  = allNum + 1;
				}
				
				$('#z_23').text((allNum == -1 ? '--' : allNum));
				
				if(X_COUNT == 0){
					option = {};
				}else{
					var option = {
					    title : {
					        text: '测点分布统计图\n\n测点总数: '+X_COUNT+'',
					        //subtext: '纯属虚构',
					        x:'center',
					        padding:45,
					        show:false
					    },
					    tooltip : {
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c}"
					    },
					    legend: {
					        //orient : 'vertical',
					        x : 'center',
					        y : 'bottom',
					        padding:5,
					        data : legendData//['220kV','110kV','35kV','20kV','10kV']
					    },
						grid: {},
					    calculable : true,
					    series : [
					        {
					            name:'测点分布',
					            type:'pie',
					            radius : '65%',
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
						                    var res = params.data.name+': ';
						                    res+=''+params.value;
						                    //res+='     ('+params.percent+'%)';
						                    return res;
					                  	}
					              	},
					                labelLine:{show:true}
					              }
					            },
					            data : seriesData
					            /**[
					                {value:335, name:'220kV'},
					                {value:310, name:'110kV'},
					                {value:234, name:'35kV'},
					                {value:135, name:'20kV'},
					                {value:1548, name:'10kV'}
					            ]**/
					        }
					    ]
					};
				}
				myChart2.setOption(option);
			},
			error:function(e)
			{
			}
		});
	}
}

function shebeigongkuangLoad(){
	var dataName = new Array();
	var dataNameResult1 = new Array();
	var dataNameResult2 = new Array();
	loadSBGKData();

	function loadSBGKData(){
		var queryparam = "";//"queryPara.LINE_ID="+lineId+"&queryPara.START_DAY="+dateTime+"&queryPara.QUERY_TYPE=02&queryPara.ORG_NO=01&queryPara.QUERYSIZE=24&queryPara.END_DAY="+dateTime1
		$.ajax({
			type: "post",
			url: basePath + "/homeFirstPageAction/loadyBarByFirst.action",
			data : queryparam,
			dataType : "json",
			cache : false,
			async : true,//同步异步请求
			success : function(result) {
				dataName = result.X_DATA_RESULT0;
				dataNameResult1 = result.X_DATA_RESULT1;
				dataNameResult2 = result.X_DATA_RESULT2;
				
				var option = {
				    title : {
				        text: '设备工况',
				        padding:15,
				        subtext: '',
				        x: 'center',
				        show:false
				    },
				    tooltip : {
				        trigger: 'axis',
				        formatter: function(params) {
				        	var paramResult = ' '+ params[0].name + '<br/>';
				        	for ( var i = 0; i < params.length; i++) {
								paramResult += params[i].seriesName + ' : ' 
											 + params[i].value + '<br/>';
							}
			               return paramResult;
				        }
				    },
				    legend: {
				    	padding:39,
				        data:['总数','停运'],
				        x: 'center'//,
				      	//y:'bottom'
				      	//selected : RESULTSELECTEDMAP,
				      	//padding:35
				    },
				    grid: {y: 70, y2:20,x:40,x2:20},
				    dataZoom : {
				        show : false,
				        realtime : true,
				        start : 0,
				        height : 30,
				        y2: 18,
				        end : 100
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : dataName//['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00', '01:05', '01:10', '01:15', '01:20', '01:25', '01:30', '01:35', '01:40', '01:45', '01:50', '01:55', '02:00', '02:05', '02:10', '02:15', '02:20', '02:25', '02:30', '02:35', '02:40', '02:45', '02:50', '02:55', '03:00', '03:05', '03:10', '03:15', '03:20', '03:25', '03:30', '03:35', '03:40', '03:45', '03:50', '03:55', '04:00', '04:05', '04:10', '04:15', '04:20', '04:25', '04:30', '04:35', '04:40', '04:45', '04:50', '04:55', '05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55', '06:00', '06:05', '06:10', '06:15', '06:20', '06:25', '06:30', '06:35', '06:40', '06:45', '06:50', '06:55', '07:00', '07:05', '07:10', '07:15', '07:20', '07:25', '07:30', '07:35', '07:40', '07:45', '07:50', '07:55', '08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55', '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55']
				        }
				    ],
				    yAxis : [
				        {
				            //name : '单位(kWh)',
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'总数',
				            type:'bar',
				            data:dataNameResult1
				            //['57','57','72','71','26','27','9','81','77','88','46','87','65','65','72','1','7','22','82','28','83','45','38','22','53','63','36','87','7','11','8','86','25','13','46','65','97','96','21','43','90','5','77','54','29','40','14','16','7','28','21','42','34','83','78','35','34','72','0','11','72','94','26','1','86','14','27','39','26','32','41','85','89','99','68','64','64','11','93','98','50','45','82','92','82','94','44','84','23','60','84','36','82','99','16','99','79','27','77','87','41','23','22','69','82','55','93','90','82','6','34','2','36','8','6','95','40','18','41','27','9','84','31','67','84','33','49','66','50','9','84','98','57','58','16','98','33','51','66','31','38','9','49','16','13','33','28','99','71','43','17','70','34','43','85','12','51','50','3','21','70','23','30','27','10','59','67','48','41','70','14','61','77','52','94','61','0','17','32','47','1','37','16','12','55','78','86','11','67','8','44','40','99','10','57','55','74','59','3','71','84','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-']
				        },
				        {
				            name:'停运',
				            type:'bar',
				            data:dataNameResult2
				            //['57','57','72','71','26','27','9','81','77','88','46','87','65','65','72','1','7','22','82','28','83','45','38','22','53','63','36','87','7','11','8','86','25','13','46','65','97','96','21','43','90','5','77','54','29','40','14','16','7','28','21','42','34','83','78','35','34','72','0','11','72','94','26','1','86','14','27','39','26','32','41','85','89','99','68','64','64','11','93','98','50','45','82','92','82','94','44','84','23','60','84','36','82','99','16','99','79','27','77','87','41','23','22','69','82','55','93','90','82','6','34','2','36','8','6','95','40','18','41','27','9','84','31','67','84','33','49','66','50','9','84','98','57','58','16','98','33','51','66','31','38','9','49','16','13','33','28','99','71','43','17','70','34','43','85','12','51','50','3','21','70','23','30','27','10','59','67','48','41','70','14','61','77','52','94','61','0','17','32','47','1','37','16','12','55','78','86','11','67','8','44','40','99','10','57','55','74','59','3','71','84','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-']
				        }
				    ]
				};
				myChart4.setOption(option);
			},
			error : function(e) {
			}
		});
	}
}

function loadyhfbPie(){
	var legendData = new Array();
	var seriesData = new Array();
	var X_COUNT = 0;
	
	loadyhfbPieData();

	function loadyhfbPieData(){
		$.ajax({
			type: "post",
			url: basePath + "/homeFirstPageAction/loadyhfbPieDataNew.action",
			data: "",
			dataType:"json",
			cache : false,
			async : true,//同步异步请求
			success: function(result)
			{	
				//
				legendData = result.X_NAME;
				seriesData = result.X_DATA;
				X_COUNT = result.X_SUM;
				
				if(X_COUNT == 0){
					option = {};
				}else{
					var option = {
					    title : {
					        text: '用户分布图\n\n用户总数: '+X_COUNT+'',
					        //subtext: '纯属虚构',
					        x:'center',
					        padding:45,
					        show:false
					    },
					    tooltip : {
					        trigger: 'item',
					        formatter: "{a} <br/>{b} : {c}"
					    },
					    legend: {
					        //orient : 'vertical',
					        x : 'center',
					        y : 'bottom',
					        padding:5,
					        data : legendData//['220kV','110kV','35kV','20kV','10kV']
					    },
							grid: {},
					    calculable : true,
					    series : [
					        {
					            name:'用户分布',
					            type:'pie',
					            radius : '65%',
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
						                    var res = params.data.name+': ';
						                    res+=''+params.value;
						                    //res+='     ('+params.percent+'%)';
						                    return res;
					                  	}
					              	},
					                labelLine:{show:true}
					              }
					            },
					            data : seriesData
					            /**[
					                {value:335, name:'220kV'},
					                {value:310, name:'110kV'},
					                {value:234, name:'35kV'},
					                {value:135, name:'20kV'},
					                {value:1548, name:'10kV'}
					            ]**/
					        }
					    ]
					};
				}
				myChart5.setOption(option);
				
			},
			error:function(e)
			{
			}
		});
	}
}

loadLineInfo("","");
cdfbtjt();
loadQydlBar();
shebeigongkuangLoad();
loadyhfbPie();

function btnClick(index){
	
	if (!isFinished){
		return;
	}
	
	isFinished = false;
	
	switch(index){
	case 0:
		
		$('#c_2').css({
			'color' : '#4e4e4e'
		});
		$('#c_3').css({
			'color' : '#4e4e4e'
		});
		$('#c_4').css({
			'color' : '#4e4e4e'
		});
		
		$('#c_1').css({
			'color' : '#00766b'
		});
		
		$('#o_1').css({
			'display' : 'block'
		});
		
		$('#e_2').addClass('menuOut');
		$('#e_3').addClass('menuOut');
		$('#e_4').addClass('menuOut');
		
		$('#b_2').addClass('out');
		$('#b_3').addClass('out');
		$('#b_4').addClass('out');
		setTimeout(function () {
			
			$('#o_2').css({
				'display' : 'none'
			});
			$('#o_3').css({
				'display' : 'none'
			});
			$('#o_4').css({
				'display' : 'none'
			});
			
			$('#e_2').css({
				'height' : '60px'
			});
			$('#e_2').removeClass('menuOut');
			$('#e_3').css({
				'height' : '60px'
			});
			$('#e_3').removeClass('menuOut');
			$('#e_4').css({
				'height' : '60px'
			});
			$('#e_4').removeClass('menuOut');
			
			$('#b_2').css({
				'display' : 'none'
			});
			$('#b_2').removeClass('out');
			$('#b_3').css({
				'display' : 'none'
			});
			$('#b_3').removeClass('out');
			$('#b_4').css({
				'display' : 'none'
			});
			$('#b_4').removeClass('out');
			
			$('#b_1').css({
 				'display' : 'block'
 			});
			
			$('#e_1').addClass('menuOneIn');
			
			setTimeout(function(){
				$('#e_1').css({
					'height' : '255px'
				});
				
				$('#e_1').removeClass('menuOneIn');
				isFinished = true;
			},1000);
			
        }, 800);
		break;
	case 1:
		
		$('#c_1').css({
			'color' : '#4e4e4e'
		});
		$('#c_3').css({
			'color' : '#4e4e4e'
		});
		$('#c_4').css({
			'color' : '#4e4e4e'
		});
		
		$('#c_2').css({
			'color' : '#FF912D'
		});
		
		$('#o_2').css({
			'display' : 'block'
		});
		
		$('#e_1').addClass('menuOut');
		$('#e_3').addClass('menuOut');
		$('#e_4').addClass('menuOut');
		
		$('#b_1').addClass('out');
		$('#b_3').addClass('out');
		$('#b_4').addClass('out');
		setTimeout(function () {
			
			initTabOneDelay();
			
			$('#o_1').css({
				'display' : 'none'
			});
			$('#o_3').css({
				'display' : 'none'
			});
			$('#o_4').css({
				'display' : 'none'
			});
			
			$('#e_1').css({
				'height' : '60px'
			});
			$('#e_1').removeClass('menuOut');
			$('#e_3').css({
				'height' : '60px'
			});
			$('#e_3').removeClass('menuOut');
			$('#e_4').css({
				'height' : '60px'
			});
			$('#e_4').removeClass('menuOut');
			
			$('#b_1').css({
				'display' : 'none'
			});
			$('#b_1').removeClass('out');
			$('#b_3').css({
				'display' : 'none'
			});
			$('#b_3').removeClass('out');
			$('#b_4').css({
				'display' : 'none'
			});
			$('#b_4').removeClass('out');
			
			$('#b_2').css({
 				'display' : 'block'
 			});
			
			$('#e_2').addClass('menuTwoIn');
			
			setTimeout(function(){
				$('#e_2').css({
					'height' : '220px'
				});
				
				$('#e_2').removeClass('menuTwoIn');
				isFinished = true;
			},1000);
			
        }, 800);
		break;
	case 2:
		
		$('#c_1').css({
			'color' : '#4e4e4e'
		});
		$('#c_2').css({
			'color' : '#4e4e4e'
		});
		$('#c_4').css({
			'color' : '#4e4e4e'
		});
		
		$('#c_3').css({
			'color' : '#1FA3E0'
		});
		
		$('#o_3').css({
			'display' : 'block'
		});
		
		$('#e_1').addClass('menuOut');
		$('#e_2').addClass('menuOut');
		$('#e_4').addClass('menuOut');
		
		$('#b_1').addClass('out');
		$('#b_2').addClass('out');
		$('#b_4').addClass('out');
		setTimeout(function () {
			
			initTabOneDelay();
			
			$('#o_1').css({
				'display' : 'none'
			});
			$('#o_2').css({
				'display' : 'none'
			});
			$('#o_4').css({
				'display' : 'none'
			});
			
			$('#e_1').css({
				'height' : '60px'
			});
			$('#e_1').removeClass('menuOut');
			$('#e_2').css({
				'height' : '60px'
			});
			$('#e_2').removeClass('menuOut');
			$('#e_4').css({
				'height' : '60px'
			});
			$('#e_4').removeClass('menuOut');
			
			$('#b_1').css({
				'display' : 'none'
			});
			$('#b_1').removeClass('out');
			$('#b_2').css({
				'display' : 'none'
			});
			$('#b_2').removeClass('out');
			$('#b_4').css({
				'display' : 'none'
			});
			$('#b_4').removeClass('out');
			
			$('#b_3').css({
 				'display' : 'block'
 			});
			
			$('#e_3').addClass('menuThreeIn');
			
			setTimeout(function(){
				$('#e_3').css({
					'height' : '300px'
				});
				
				$('#e_3').removeClass('menuThreeIn');
				isFinished = true;
			},1000);
			
        }, 800);
		break;
	case 3:

		$('#c_2').css({
			'color' : '#4e4e4e'
		});
		$('#c_3').css({
			'color' : '#4e4e4e'
		});
		$('#c_1').css({
			'color' : '#4e4e4e'
		});
		
		$('#c_4').css({
			'color' : '#8A53A1'
		});
		
		$('#o_4').css({
			'display' : 'block'
		});
		
		$('#e_1').addClass('menuOut');
		$('#e_2').addClass('menuOut');
		$('#e_3').addClass('menuOut');
		
		$('#b_1').addClass('out');
		$('#b_2').addClass('out');
		$('#b_3').addClass('out');
		setTimeout(function () {
			
			initTabOneDelay();
			
			$('#o_2').css({
				'display' : 'none'
			});
			$('#o_3').css({
				'display' : 'none'
			});
			$('#o_1').css({
				'display' : 'none'
			});
			
			$('#e_1').css({
				'height' : '60px'
			});
			$('#e_1').removeClass('menuOut');
			$('#e_2').css({
				'height' : '60px'
			});
			$('#e_2').removeClass('menuOut');
			$('#e_3').css({
				'height' : '60px'
			});
			$('#e_3').removeClass('menuOut');
			
			$('#b_1').css({
				'display' : 'none'
			});
			$('#b_1').removeClass('out');
			$('#b_2').css({
				'display' : 'none'
			});
			$('#b_2').removeClass('out');
			$('#b_3').css({
				'display' : 'none'
			});
			$('#b_3').removeClass('out');
			
			$('#b_4').css({
 				'display' : 'block'
 			});
			
			$('#e_4').addClass('menuFourIn');
			
			setTimeout(function(){
				$('#e_4').css({
					'height' : '250px'
				});
				
				$('#e_4').removeClass('menuFourIn');
				isFinished = true;
			},1000);
			
        }, 800);
		break;
	}
}

var currentIndex = 0;
var clickBtn = false;
var mainClick = false;

function childBtnMainClick(){
	if (clickBtn == true){
		clickBtn = false;
		return;
	}
	if (currentIndex === 0){
		index = 1;
	}else{
		index = 0;
	}
	mainClick = true;
	childBtnClick(index, 0);
	mainClick = false;
}

function childBtnClick(index, type){
	
	if (!mainClick){
		clickBtn = true;
	}
	
	$.each($('#s_1').children(), function(i, n){
		if (i === index){
			$(n).css({
 				'background':'#00BE28'
 			});
		}else{
			$(n).css({
 				'background':'#BFBFBF'
 			});
		}
	});
	
	currentIndex = index;
	
	switch(index){
	case 0:
		$('#child_tab_two').addClass('out');
		setTimeout(function () {
			
			initChildTabTwoDelay();
			
			$('#child_tab_two').css({
				'display' : 'none'
			});
			$('#child_tab_two').removeClass('out');
			
			$('#child_tab_one').css({
 				'display' : 'block'
 			});
			
        }, 800);
		break;
	case 1:
		$('#child_tab_one').addClass('out');
		setTimeout(function () {
			
			initChildTabOneDelay();
			
			$('#child_tab_one').css({
				'display' : 'none'
			});
			$('#child_tab_one').removeClass('out');
			
			$('#child_tab_two').css({
 				'display' : 'block'
 			});
			
        }, 800);
		break;
	}
}

function initChildTabOneDelay(){
	
}

function initChildTabTwoDelay(){
	
}

function initTabOneDelay(){
	
	$('#g_1').css({
		'animation-delay':'0s',
		'-webkit-animation-delay':'0s',
		'-moz-animation-delay':'0s'
	});
	$('#g_2').css({
		'animation-delay':'0.2s',
		'-webkit-animation-delay':'0.2s',
		'-moz-animation-delay':'0.2s'
	});
	$('#g_3').css({
		'animation-delay':'0.4s',
		'-webkit-animation-delay':'0.4s',
		'-moz-animation-delay':'0.4s'
	});
	$('#g_4').css({
		'animation-delay':'0.6s',
		'-webkit-animation-delay':'0.6s',
		'-moz-animation-delay':'0.6s'
	});
	$('#g_5').css({
		'animation-delay':'0.8s',
		'-webkit-animation-delay':'0.8s',
		'-moz-animation-delay':'0.8s'
	});
	$('#g_6').css({
		'animation-delay':'1s',
		'-webkit-animation-delay':'1s',
		'-moz-animation-delay':'1s'
	});
	$('#g_7').css({
		'animation-delay':'1.2s',
		'-webkit-animation-delay':'1.2s',
		'-moz-animation-delay':'1.2s'
	});
	$('#g_8').css({
		'animation-delay':'1.4s',
		'-webkit-animation-delay':'1.4s',
		'-moz-animation-delay':'1.4s'
	});
}
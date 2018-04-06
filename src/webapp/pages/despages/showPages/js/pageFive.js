var myChart1 = echarts.init(document.getElementById('div_body_info'));
//var myChart2 = echarts.init(document.getElementById('div_body_info1'));
var myChart3 = echarts.init(document.getElementById('div_body_info2'));
var myChart4 = echarts.init(document.getElementById('div_body_info3'));
//var myChart5 = echarts.init(document.getElementById('div_body_info13'));
var myChart6 = echarts.init(document.getElementById('div_body_info14'));

var clickIndex = 0;
var bwClickIndex = 0;
var allBwClickCount = 0;
var gjClickIndex = 0;
var allGjClickCount = 0;

var parentFrame = this.parent;

function toGjPage(){
	var options = {
        name: 'desgjcx',               //需要打开的菜单的关键字,必须保证正确
        text: '告警查询',           //打开菜单的标题,可修改
        path: basePath + 'pages/despages/warn/GaoJingChaXun.jsp?funcId=10099214139&roleId=10099211993'
    };
	this.parent.parent.reloadTabPage(options);
}

function toGdPage(){
	var options = {
        name: 'destjfx',               //需要打开的菜单的关键字,必须保证正确
        text: '工单统计',           //打开菜单的标题,可修改
        path: basePath + 'pages/despages/labour/gdtjfx.jsp?funcId=10099213800&roleId=10099211993'
    };
	this.parent.parent.reloadTabPage(options);
}

function toBwPage(){
	var options = {
        name: 'desqyjk',               //需要打开的菜单的关键字,必须保证正确
        text: '用户变监控',           //打开菜单的标题,可修改
        path: basePath + 'pages/despages/monitor/orgControl.jsp?funcId=10099213906&roleId=10099211993'
    };
	this.parent.parent.reloadTabPage(options);
}

function toHome(){
	this.parent.nextPage(61, 0);
}

$(document).ready(function(){
//	getNewsData();
	loadQydlBar();
	// 客户日电量top10
//	loadDlfbPie("");
	loadyhfbPie();
	loadLineInfo("","");
	// 测点饼图
//	cdfbtjt();
	shebeigongkuangLoad();
	
	getInfoData();
	
	loadInitData();
	
	setInterval("testTime2()",300000);
	
	setInterval(function(){
		loadReflushData();
	}, 1000 * 60);
	
	setInterval(function(){
		getInfoData();
	}, 1000 * 30);
	
	loadMethod();
	
//	$('#leftBtn').click(function(param){
//		if (clickIndex != 1){
//			$('#leftBtn').attr('src', imagePath + '/pageFive/img_6_1.png');
//			$('#rightBtn').attr('src', imagePath + '/pageFive/img_7_1.png');
//			
//			$('#chatList').addClass('chatLeftMove');
//			setTimeout(function(){
//				$('#chatList').css({
//					'transform' : 'translate(-685px,-70px)',
//					'-webkit-transform' : 'translate(-685px,-70px)',
//					'-moz-transform' : 'translate(-685px,-70px)'
//				});
//				$('#chatList').removeClass('chatLeftMove');
//				clickIndex = 1;
//			},1000);
//		}
//	});
//	
//	$('#rightBtn').click(function(param){
//		if (clickIndex != 0){
//			$('#leftBtn').attr('src', imagePath + '/pageFive/img_6.png');
//			$('#rightBtn').attr('src', imagePath + '/pageFive/img_7.png');
//			
//			$('#chatList').addClass('chatRightMove');
//			setTimeout(function(){
//				$('#chatList').css({
//					'transform' : 'translate(0px,-70px)',
//					'-webkit-transform' : 'translate(0px,-70px)',
//					'-moz-transform' : 'translate(0px,-70px)'
//				});
//				$('#chatList').removeClass('chatRightMove');
//				clickIndex = 0;
//			},1000);
//		}
//	});
	
	$('#bwUpDiv').click(function(param){
		if (bwClickIndex > 0){
			$('#shiftInfoList').animate({ 'margin-top': (-102 * (bwClickIndex -1)) + 'px' }, 500);
				bwClickIndex--;
		}
		initBwBtn();
	});
	
	$('#bwDownDiv').click(function(param){
		if (bwClickIndex <= (allBwClickCount - 1)){
			$('#shiftInfoList').animate({ 'margin-top': (-102 * (bwClickIndex + 1)) + 'px' }, 500);
			bwClickIndex++;
		}
		initBwBtn();
	});
	
	$('#gjUpDiv').click(function(param){
		if (gjClickIndex > 0){
			$('#alarmDetailList').animate({ 'margin-top': (-57 * (gjClickIndex -1)) + 'px' }, 500);
			gjClickIndex--;
		}
		initGjBtn();
	});
	
	$('#gjDownDiv').click(function(param){
		if (gjClickIndex <= (allGjClickCount - 1)){
			$('#alarmDetailList').animate({ 'margin-top': (-57 * (gjClickIndex + 1)) + 'px' }, 500);
			gjClickIndex++;
		}
		initGjBtn();
	});
	
	$('#gjTjTabBtn').click(function(param){
		$('#gjTjTabBtn').css({
			'color':'#323232'
		});
		$('#gjMxTabBtn').css({
			'color':'#A5A5A5'
		});
		$('#gj_2_div').animate({ 'opacity': 0 }, 500);
		setTimeout(function(){
			$('#gj_2_div').css({
				'display':'none'
			});
			$('#gj_1_div').css({
				'display':'block'
			});
			$('#gj_1_div').animate({ 'opacity': 1 }, 500);
		}, 500);		
	});
	
	$('#gjMxTabBtn').click(function(param){
		$('#gjMxTabBtn').css({
			'color':'#323232'
		});
		$('#gjTjTabBtn').css({
			'color':'#A5A5A5'
		});
		$('#gj_1_div').animate({ 'opacity': 0 }, 500);
		setTimeout(function(){
			$('#gj_1_div').css({
				'display':'none'
			});
			$('#gj_2_div').css({
				'display':'block'
			});
			$('#gj_2_div').animate({ 'opacity': 1 }, 500);
		}, 500);	
	});
	
	
});

var newsIndex = 1;
var newsAllCount = 0;
var newsAllResult;
function getNewsData(){
	$.ajax({
		type: "post",
		url: basePath + "/bigScreen/bigScreenQueryInfoNews.action",
		data: "",
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			newsAllCount = result.length;
			newsAllResult = result;
			var newsPdiv = $('<div></div>').appendTo($('#newsList'));
			$.each(result, function(i, n){
				
				var NEWSNAME = n.NEWSNAME;
				if (n.NEWSNAME.length > 30){
					NEWSNAME = n.NEWSNAME.substring(0, 28) + '...';
				}
				
				$('<div style=\'cursor:pointer;height:25px;\'>' +
						'<span>' + n.NEWSTYPE + '：</span>' +
						'<span title=\'' + n.NEWSNAME + '\'>' + NEWSNAME + '</span>' +
						+ '</div>').click(function(){
							parentFrame.openNewsWin(n.NEWSID);
						}).appendTo(newsPdiv);
			});
			
			setInterval(function(){
				if($('#newsList').children().length > 1){
//					$('#newsList').children().eq(1).animate({ 'margin-top': (-25 * newsIndex) + 'px' }, 500);
//					$('#newsList').children().eq(0).animate({ 'margin-top': (-25 * (newsAllCount + 1)) + 'px' }, 500);
//					setTimeout(function(){
//						$('#newsList').children().eq(0).remove();
//					},500);
					$('#newsList').children().eq(0).remove();
				}
				$('#newsList').children().eq(0).animate({ 'margin-top': (-25 * newsIndex) + 'px' }, 500);
				newsIndex++;
				if (newsIndex > newsAllCount){
					newsIndex = 1;
					var newsPdiv = $('<div style=\'margin-top:0px;\'></div>').appendTo($('#newsList'));
					$.each(result, function(i, n){
						
						var NEWSNAME = n.NEWSNAME;
						if (n.NEWSNAME.length > 30){
							NEWSNAME = n.NEWSNAME.substring(0, 28) + '...';
						}
						
						$('<div style=\'cursor:pointer;height:25px;\'>' +
								'<span>' + n.NEWSTYPE + '：</span>' +
								'<span title=\'' + n.NEWSNAME + '\'>' + NEWSNAME + '</span>' +
								+ '</div>').click(function(){
									parentFrame.openNewsWin(n.NEWSID);
								}).appendTo(newsPdiv);
					});
					/*$('#newsList').children().eq(0).css({
						'margin-top' :  (-25 * (newsAllCount - 1)) + 'px'
					});*/
				}
			}, 5000);
//			alert(1);
		},
		error:function(e)
		{
//			$.messager.alert('错误','bigScreenQueryInfoNews.action请求错误码：' + e.readyState);
		}
	});
}

function initBwBtn(){
	if (bwClickIndex > 0){
		$('#bwUpDiv').children().eq(0).attr('src', imagePath + '/pageFive/img_1_1.png');
	}
	else{
		$('#bwUpDiv').children().eq(0).attr('src', imagePath + '/pageFive/img_1.png');
	}
	
	if (bwClickIndex <= (allBwClickCount - 1)){
		$('#bwDownDiv').children().eq(0).attr('src', imagePath + '/pageFive/img_2.png');
	}else{
		$('#bwDownDiv').children().eq(0).attr('src', imagePath + '/pageFive/img_2_1.png');
	}
}

function initGjBtn(){
	if (gjClickIndex > 0){
		$('#gjUpDiv').children().eq(0).attr('src', imagePath + '/pageFive/img_1_1.png');
	}
	else{
		$('#gjUpDiv').children().eq(0).attr('src', imagePath + '/pageFive/img_1.png');
	}
	
	if (gjClickIndex <= (allGjClickCount - 1)){
		$('#gjDownDiv').children().eq(0).attr('src', imagePath + '/pageFive/img_2.png');
	}else{
		$('#gjDownDiv').children().eq(0).attr('src', imagePath + '/pageFive/img_2_1.png');
	}
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
//			$('#cdfbtjCount').text((result.POINTSNUM == '' ? '--' : result.POINTSNUM));
			$('#bdzCount').text((result.SUBSTATIONNUM == '' ? '--' : result.SUBSTATIONNUM));
			$('#zbCount').text((result.MAINTRANSFORMERNUM == '' ? '--' : result.MAINTRANSFORMERNUM));
			$('#zbSum').text((result.MAINTRANSFORMERCAP == '' ? '--' : parseFloat(result.MAINTRANSFORMERCAP).toFixed(2)));
			$('#yhCount').text((result.USERSNUM == '' ? '--' : result.USERSNUM));
			$('#zydSum').text((result.TOTALELECTRICITY == '' ? '--' : Math.round(result.TOTALELECTRICITY)));
			
			loadReflushData();
		},
		error:function(e)
		{
//			$.messager.alert('错误','bigScreenInit.action请求错误码：' + e.readyState);
		}
	});
}

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
			$('#ssfhSum').text((result.REALTIMELOAD == '' ? '--' : Math.round(result.REALTIMELOAD)));
//			$('#rydlSum').text((result.REALTIMEELECTRICITY == '' ? '--' : Math.round(result.REALTIMEELECTRICITY)));
		},
		error:function(e)
		{
//			$.messager.alert('错误','bigScreenRefresh.action请求错误码：' + e.readyState);
		}
	});
}

function getInfoData(){
	$.ajax({
		type: "post",
		url: basePath + "/bigScreen/bigScreenRealTimeData.action",
		data: "{}",
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			$('#onlineRate').text(result.onlineRate + '%');
			$('#successRate').text(result.successRate + '%');
			
//			$('#totalAlarm').text(result.totalAlarm);
//			$('#handledAlarm').text(result.handledAlarm);
			$('#gjValue').text(result.handledAlarm + ' / ' + result.totalAlarm);
			
			var gjWidth = parseFloat(result.handledAlarm / result.totalAlarm) * 200;
			$('#gjDoneWidth').css({
				'width' : gjWidth + 'px'
			});
			
//			$('#totalOrder').text(result.totalOrder);
//			$('#handledOrder').text(result.handledOrder);
			$('#gdValue').text(result.handledOrder + ' / ' + result.totalOrder);
			
//			var gdWidth = parseFloat(result.handledOrder / result.totalOrder) * 200;
//			$('#gdDoneWidth').css({
//				'width' : gdWidth + 'px'
//			});
			
			bwxxItem(result.shiftInfoList);
			initBwBtn();
			
			gjxxItem(result.alarmDetailList);
			initGjBtn();
		},
		error:function(e)
		{
			
		}
	});
}

function gjxxItem(data){
	
	allGjClickCount = data.length - 2;
	
	var pDiv = $('#alarmDetailList');
	pDiv.html('');
	
	$.each(data, function(i, n){
		
		var itemDiv = $('<div class=\'item_div\'></div>').click(function () {
			var options = {
					name : 'desyhbjk',
					text : '一次图',
		        path: basePath + 'pages/despages/monitor/userMonitor.jsp?consId=' + n.consId + '&userTranId=' + n.userTranId
		    };
//			alert(n.consId + ':' + n.userTranId);
			parentFrame.parent.reloadTabPage(options);
		}).appendTo(pDiv);
		
		var subsName = n.subsName;
		if (n.subsName.length > 9){
			subsName = n.subsName.substring(0, 7) + '...';
		}
		
		var deviceName = n.deviceName;
		if (n.deviceName.length > 9){
			deviceName = n.deviceName.substring(0, 7) + '...';
		}
		
		$('<div class=\'v_div\'>' +
				'<div class=\'name_div\' title="' + n.subsName + '"><span>' + subsName + '</span></div>' +
				'<div class=\'value_div\'><span>告警等级：' + n.alarmLevel + '</span></div>' +
		+ '</div>').appendTo(itemDiv);
		
		$('<div class=\'v_div\'>' +
				'<div class=\'name_div\' title="' + n.deviceName + '"><span>' + deviceName + '</span></div>' +
				'<div class=\'value_div\'><span>' + n.alarmStartTime + '</span></div>' +
		+ '</div>').appendTo(itemDiv);
	});
}

function bwxxItem(data){
	
	allBwClickCount = data.length - 2;
	
	var pDiv = $('#shiftInfoList');
	pDiv.html('');
	
	$.each(data, function(i, n){
		
		var CONSNAME = n.CONSNAME;
		if (n.CONSNAME.length > 25){
			CONSNAME = n.CONSNAME.substring(0, 25) + '...';
		}
		
		var ELECADDR = n.ELECADDR;
		if (n.ELECADDR.length > 25){
			ELECADDR = n.ELECADDR.substring(0, 25) + '...';
		}
		
		var itemDiv = $('<div class=\'item_div\'></div>').appendTo(pDiv);
		
		$('<div class=\'v_div\'>' +
				'<div class=\'name_div\' title="' + n.CONSNAME + '"><span>' + CONSNAME + '</span></div>' +
				'<div class=\'value_div\'><span>' + n.DEVICENAME + '   ' + n.SIGNALSTATUS + '</span></div>' +
		+ '</div>').appendTo(itemDiv);
		
		$('<div class=\'v_div\'>' +
				'<div class=\'name_div\' title="' + n.ELECADDR + '"><span>' + ELECADDR + '</span></div>' +
				'<div class=\'value_div\'><span>' + n.DATADATE + '</span></div>' +
		+ '</div>').appendTo(itemDiv);
	});
}

function testTime2(){
	//获得时间
	//获得选择项
	var dateTime = $('#startDay3').val();
	var selVal = $('#wnGrade').val();
	loadLineInfo(dateTime,selVal);
}

function loadQydlBar(){
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
			var X_NAME = result.X_NAME;
			var X_NAME_DATA = result.X_NAME_DATA;
			var X_DATA = result.X_DATA;
			
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
			    	y: 'bottom',
			        data:['总用电量']
			    },
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
			
			
			
			myChart1.setOption(option);
			
//			myChart1.on("click", function (param) {
//				//
//				//alert(X_NAME_DATA[param.dataIndex]);
//				//$('#startDay2').val(X_NAME_DATA[param.dataIndex]);
//				$('#startDay2').datebox('setValue',X_NAME_DATA[param.dataIndex]);
//				//document.getElementById("startDay2").value = ;
//				//alert($('#startDay2').val());
//				loadDlfbPie(X_NAME_DATA[param.dataIndex]);
//			});
		},
		error:function(e)
		{
			
		}
	});
}

function loadDlfbPie(X_NAME_DATA){
	var DATE_TIME = null;
	
	if(X_NAME_DATA.length <= 0){
		DATE_TIME = $('#startDay2').val();
	}else{
		DATE_TIME = X_NAME_DATA;
	}
	
	$.ajax({
		type: "post",
		url: basePath + "/homeFirstPageAction/loadDlfbPieOveride.action",
		data: "queryPara.DATE_TIME=" + DATE_TIME,
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			var legendData = result.X_NAME;
			var seriesData = result.X_DATA;
			var option;
			if(legendData == null || seriesData == null){
				option = {
				    title : {
				        text: '用户日用电 kWh TOP10',
				        x:'center',
				        show:false
				    },
				    tooltip : {
				        trigger: 'axis',
				      	formatter: function (params,ticket,callback) {
				            //console.log(params)
				            //var res = '总用电量 :';
				            //res+='<br/>'+params[0].value;
				          	//res+='<br/>'+params[0].data.name+':';
		      				//res+=''+params[0].value;
				          	
				          	
				            return null;
				        }
				    },
				    legend: {
				        data:[],
				        y: 'bottom'
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'value',
				            boundaryGap : [0, 0.01]
				        }
				    ],
				    yAxis : [
				        {
				            type : 'category',
				            data : []//legendData
				            //['10','9','8','7','6','5','4','3','2','1']
				        }
				    ],
				    series : [
				        {
				            //name:'2011年',
				            type:'bar',
				          	itemStyle : { normal: {label : {show: true, position: 'inside',formatter:function (params) {
		        //console.log(params)
		        var res = params.data.name+':';
		      	res+=''+params.value;
		        return res;
		    }}}},
				            data:[]//seriesData
				            //[118203,218203,318203,418203,518203,618203,718203,{name:'9158用户',value: '818203'},918203,1018203]
				        }
				    ]
				};
			}else{
				
				option = {
				    title : {
				        text: '用户日用电 kWh TOP10',
				      	x:'center',
				        show:false
				    },
				    tooltip : {
				        trigger: 'axis',
				      	formatter: function (params,ticket,callback) {
				            //console.log(params)
				            var res = '用户日用电 :';
				            //res+='<br/>'+params[0].value;
				          	res+='<br/>'+params[0].data.name+':';
				          	res+=''+params[0].value;
				            return res;
				        }
				    },
				    legend: {
				        data:[],
				        y: 'bottom'
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'value',
				            boundaryGap : [0, 0.01]
				        }
				    ],
				    yAxis : [
				        {
				            type : 'category',
				            data : legendData
				            //data : ['10','9','8','7','6','5','4','3','2','1']
				        }
				    ],
				    series : [
				        {
				            //name:'2011年',
				            type:'bar',
				            itemStyle : { normal: {label : {
				                show: true, textStyle:{
				                fontSize: 14
				              //,color: '#400080'
				            },
						    position: 'inside',
						    formatter:function (params) {
					            //console.log(params)
					            var res = params.data.name+': ';
					          	res+=''+params.value;
					            return res;
					        }}}},
					        data:seriesData
				            //data:[118203,218203,318203,418203,518203,618203,718203,{name:'9158用户',value: '818203'},918203,1018203]
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

function loadyhfbPie(){
	$.ajax({
		type: "post",
		url: basePath + "/bigScreen/bigScreenQueryKhTradePie.action",
		data: "",
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			var legendData = result.X_NAME;
			var seriesData = result.X_DATA;
			var X_COUNT = result.X_SUM;
			var option;
//			alert(X_COUNT);
			if(X_COUNT == 0){
				option = {};
			}else{
				option = {
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
			myChart4.setOption(option);
		},
		error:function(e)
		{
		}
	});	
}

function loadLineInfo(dateTime,selVal){
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
			
			var legendData = result.X_NAME;
			var X_DATA1 = result.X_DATA1;
			var X_DATA2 = result.X_DATA2;

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

function cdfbtjt(){
	$.ajax({
		type: "post",
		url: basePath + "/homeFirstPageAction/cdfbtjbtQuery.action",
		data: "",
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			var legendData = result.X_NAME;
			var seriesData = result.X_DATA;
			var X_COUNT = result.X_SUM;
//			$('#cdfbtjCount').text(X_COUNT);
			var option;
			if(X_COUNT == 0){
				option = {};
			}else{
				option = {
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

function shebeigongkuangLoad(){
	var queryparam = "";//"queryPara.LINE_ID="+lineId+"&queryPara.START_DAY="+dateTime+"&queryPara.QUERY_TYPE=02&queryPara.ORG_NO=01&queryPara.QUERYSIZE=24&queryPara.END_DAY="+dateTime1
	$.ajax({
		type: "post",
		url: basePath + "/homeFirstPageAction/loadyBarByFirst.action",
		data : queryparam,
		dataType : "json",
		cache : false,
		async : true,//同步异步请求
		success : function(result) {
			var dataName = result.X_DATA_RESULT0;
			var dataNameResult1 = result.X_DATA_RESULT1;
			var dataNameResult2 = result.X_DATA_RESULT2;
			
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
			        data:['总数','停运'],
			        x: 'center',
			        y: 'bottom'
			      	//y:'bottom'
			      	//selected : RESULTSELECTEDMAP,
			      	//padding:35
			    },
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
			myChart6.setOption(option);
		},
		error : function(e) {
		}
	});
}

function loadMethod(){
	$('#wnGrade').combobox({
		onSelect: function(param){
			var startDay2 = $('#startDay3').val();
			loadLineInfo(startDay2,param.value);
		}
	});
	
	$('#startDay3').datebox({
	    onSelect: function(date){
	        var dataValue = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	        loadLineInfo(dataValue,$('#wnGrade').val());
	    }
	});
	
//	$('#startDay2').datebox({
//	    onSelect: function(date){
//	        var dataValue = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
//	        loadDlfbPie(dataValue);
//	    }
//	});
}

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
	//loadQydlBar();
	loadLineInfo();
	loadyhfbPie();
	loadLineInfo2();
	cdfbtjt();
	//shebeigongkuangLoad();
	
//	getInfoData();
	
//	loadInitData();
	
	//setInterval("testTime2()",300000);
	
	//setInterval(function(){
	//	loadReflushData();
//	}, 1000 * 60);
	
//	setInterval(function(){
//		getInfoData();
//	}, 1000 * 30);
	
//	loadMethod();
	
	$('#leftBtn').click(function(param){
		if (clickIndex != 1){
			$('#leftBtn').attr('src', imagePath + '/pageFive/img_6_1.png');
			$('#rightBtn').attr('src', imagePath + '/pageFive/img_7_1.png');
			
			$('#chatList').addClass('chatLeftMove');
			setTimeout(function(){
				$('#chatList').css({
					'transform' : 'translate(-685px,-70px)',
					'-webkit-transform' : 'translate(-685px,-70px)',
					'-moz-transform' : 'translate(-685px,-70px)'
				});
				$('#chatList').removeClass('chatLeftMove');
				clickIndex = 1;
			},1000);
		}
	});
	
	$('#rightBtn').click(function(param){
		if (clickIndex != 0){
			$('#leftBtn').attr('src', imagePath + '/pageFive/img_6.png');
			$('#rightBtn').attr('src', imagePath + '/pageFive/img_7.png');
			
			$('#chatList').addClass('chatRightMove');
			setTimeout(function(){
				$('#chatList').css({
					'transform' : 'translate(0px,-70px)',
					'-webkit-transform' : 'translate(0px,-70px)',
					'-moz-transform' : 'translate(0px,-70px)'
				});
				$('#chatList').removeClass('chatRightMove');
				clickIndex = 0;
			},1000);
		}
	});
	
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
			$('#cdfbtjCount').text((result.POINTSNUM == '' ? '--' : result.POINTSNUM));
			$('#bdzCount').text((result.SUBSTATIONNUM == '' ? '--' : result.SUBSTATIONNUM));
			$('#zbCount').text((result.MAINTRANSFORMERNUM == '' ? '--' : result.MAINTRANSFORMERNUM));
			$('#zbSum').text((result.MAINTRANSFORMERCAP == '' ? '--' : parseFloat(result.MAINTRANSFORMERCAP).toFixed(2)));
			$('#yhCount').text((result.USERSNUM == '' ? '--' : result.USERSNUM));
			$('#zydSum').text((result.TOTALELECTRICITY == '' ? '--' : parseFloat(result.TOTALELECTRICITY).toFixed(2)));
			
			loadReflushData();
		},
		error:function(e)
		{
			$.messager.alert('错误','bigScreenInit.action请求错误码：' + e.readyState);
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
			$('#ssfhSum').text((result.REALTIMELOAD == '' ? '--' : parseFloat(result.REALTIMELOAD).toFixed(2)));
			$('#rydlSum').text((result.REALTIMEELECTRICITY == '' ? '--' : parseFloat(result.REALTIMEELECTRICITY).toFixed(2)));
		},
		error:function(e)
		{
			$.messager.alert('错误','bigScreenRefresh.action请求错误码：' + e.readyState);
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
			
			var gdWidth = parseFloat(result.handledOrder / result.totalOrder) * 200;
			$('#gdDoneWidth').css({
				'width' : gdWidth + 'px'
			});
			
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
	loadLineInfo();
}


function loadLineInfo(){
	var date = $('#dates1').val();	
	var orgNo = "3240402";
	var timeType = "d";
	$.ajax({
		type: "post",
		url: basePath + "capacityData/showPeakValleyChart.action",
		data: "queryPara.dates=" + date + "&queryPara.orgNo=" + orgNo + "&queryPara.timeType=" + timeType,
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			var X_DATA1 = result.name;
			var X_DATA2 = result.sdata;
			var maxValue = result.madata;
			var minValue = result.midata;
			var option = {
			    title : {
			        text: '负荷曲线 kW',
			      	x:'center',
			        show:false
			        //subtext: '纯属虚构'
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['最小负荷','最大负荷'],
			        selected : {'最大负荷':true},
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
			            name:'最小负荷',
			            type:'line',
			            radius : '65%',
			            		center: ['50%', '80%'],
			            data: minValue
			        },
			        {
			            name:'最大负荷',
			            type:'line',
			            radius : '65%',
			            		center: ['50%', '80%'],
			            data: maxValue
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
function cdfbtjt(){
	option = {
    title : {
     	x:'center',
	    padding:45,
	    show:false
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
	    y : 'bottom',
		padding:5,
        data:['大工业用户','一般商业用户','居民用户','互动家庭用户']
    },
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
            data:[
                {value:590, name:'大工业用户'},
                {value:21755, name:'一般商业用户'},
                {value:530000, name:'居民用户'},
                {value:39000, name:'互动家庭用户'}
            ]
        }
    ]
	};
	myChart1.setOption(option);
}

function loadyhfbPie(){
	option = {
    title : {
     	x:'center',
	    padding:45,
	    show:false
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
	    y : 'bottom',
		padding:5,
        data:['大工业用户','一般商业用户','居民用户','互动家庭用户']
    },
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
            data:[
                {value:1420, name:'大工业用户'},
                {value:32437, name:'一般商业用户'},
                {value:352600, name:'居民用户'},
                {value:71000, name:'互动家庭用户'}
            ]
        }
    ]
	};
	myChart3.setOption(option);
}


function loadLineInfo2(){
	var date = $('#dates2').val();	
	var orgNo = "3240502";
	var timeType = "d";
	$.ajax({
		type: "post",
		url: basePath + "capacityData/showPeakValleyChart.action",
		data: "queryPara.dates=" + date + "&queryPara.orgNo=" + orgNo + "&queryPara.timeType=" + timeType,
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			var X_DATA1 = result.name;
			var X_DATA2 = result.sdata;
			var maxValue = result.madata;
			var minValue = result.midata;
			var option = {
			    title : {
			        text: '负荷曲线 kW',
			      	x:'center',
			        show:false
			        //subtext: '纯属虚构'
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['最小负荷','最大负荷'],
			        selected : {'最小负荷':true},
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
			            name:'最小负荷',
			            type:'line',
			            radius : '65%',
         						center: ['50%', '80%'],
			            data: minValue
			        },
			        {
			            name:'最大负荷',
			            type:'line',
			            radius : '65%',
			            		center: ['50%', '80%'],
			            data: maxValue
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

function query1(){
	loadLineInfo();
}
function query2(){
	loadLineInfo2();
}
var currentIndex = 0;
var clickBtn = false;
var mainClick = false;
var m_roomMap = {};
function btnMainClick(){
	if (clickBtn == true){
		clickBtn = false;
		return;
	}
	currentIndex++;
	if (currentIndex > 2){
		currentIndex = 0;
	}
	
	mainClick = true;
	btnClick(currentIndex);
	mainClick = false;
}

function btnClick(index){
	
	if (!mainClick){
		clickBtn = true;
	}
	
	$.each($('#e_1').children(), function(i, n){
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
		$('#b_1').addClass('out');
		$('#b_3').addClass('out');
		setTimeout(function () {
			
			initTabTwoDelay();
			
			$('#b_1').css({
				'display' : 'none'
			});
			$('#b_1').removeClass('out');
			$('#b_3').css({
				'display' : 'none'
			});
			$('#b_3').removeClass('out');
			
			$('#b_2').css({
 				'display' : 'block'
 			});
			
        }, 800);
		break;
	case 1:
		$('#b_2').addClass('out');
		$('#b_3').addClass('out');
		setTimeout(function () {
			
			initTabOneDelay();
			
			$('#b_2').css({
				'display' : 'none'
			});
			$('#b_2').removeClass('out');
			$('#b_3').css({
				'display' : 'none'
			});
			$('#b_3').removeClass('out');
			
			$('#b_1').css({
 				'display' : 'block'
 			});
			
        }, 800);
		break;
		case 2:
			$('#b_1').addClass('out');
			$('#b_2').addClass('out');
			setTimeout(function () {
				
				initTabOneDelay();
				
				$('#b_1').css({
					'display' : 'none'
				});
				$('#b_1').removeClass('out');
				$('#b_2').css({
					'display' : 'none'
				});
				$('#b_2').removeClass('out');
				
				$('#b_3').css({
	 				'display' : 'block'
	 			});
				
	        }, 800);
		break;
	}
	
}

function initTabTwoDelay(){
	
}

function initTabOneDelay(){
	$('#c_1').css({
		'animation-delay':'0s',
		'-webkit-animation-delay':'0s',
		'-moz-animation-delay':'0s'
	});
	$('#d_1').css({
		'animation-delay':'0.2s',
		'-webkit-animation-delay':'0.2s',
		'-moz-animation-delay':'0.2s'
	});
	$('#c_2').css({
		'animation-delay':'0.6s',
		'-webkit-animation-delay':'0.6s',
		'-moz-animation-delay':'0.6s'
	});
	$('#c_3').css({
		'animation-delay':'0.6s',
		'-webkit-animation-delay':'0.6s',
		'-moz-animation-delay':'0.6s'
	});
	$('#d_2').css({
		'animation-delay':'1s',
		'-webkit-animation-delay':'1s',
		'-moz-animation-delay':'1s'
	});
}

var geoSysCoordMap = {};

var geoUserCoordMap = {};

var mapData = new Array();

var cameraList = {};

var tooltiplist = {};

var convertData = function (data, type) {
	var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = (type === 0 ? geoSysCoordMap[data[i].name] : geoUserCoordMap[data[i].name]);
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

// 初始化gis地图
initGisMap();

function initGisMap(){
	$.ajax({
		type : "POST",
		url : basePath + 'giszl/gisInit.action',
		dataType : "json",
		success : function(data) {
			// 初始化地图
			if(data.heartLongitude > 0 && data.heartLatitude > 0){
				// 地图对象与DIV绑定
				 var mp = new BMap.Map('gisMap', {
					 enableMapClick : false
				});
				// 初始化地图
				map.bigScreenGisInit(mp, data);
			}
		}
	});
}
//initMapChart();

//function initMapChart() {
//	
////	geoSysCoordMap["博源电力有限公司"] = [119.624066, 31.755797];
//	
//	var userData = new Array();
//	var sysData = new Array();
//	var mapName = "";
////	var sysData = [{ name: '博源电力有限公司', value: 10 }];
//	
//	loadMapData();
//	
//	var series = [{
//		name: '区域能源中心',
//	    type: 'scatter',
//	    coordinateSystem: 'geo',
//	    symbolSize: 25,
//	    symbol: 'image://' + imagePath + '/pageTwo/sys_icon.png',
//	    zlevel: 1,
//	    data: convertData(sysData, 0),
//	    tooltip:{
//	    	position:'top',
//	    	backgroundColor:'#FCFCFC',
//	    	borderColor:'#BFC3C6',
//	    	borderWidth:2,
//	    	textStyle:{
//	    		color :'#3B5562'
//	    	},
//	    	formatter:function(params){
//	    		var values = tooltiplist[params.name];
//	    		var res = "<div style='padding: 8px;color:#657F89;font-size:16px;'><span style='font-weight: bold;line-height: 2em;font-size:18px;'>" + values[0].USERNAME + "</span></div>";
//	    		return res;
//	    	}
//	    },
//	    label: {
//	        normal: {
//	            show: false,
//	            textStyle: {
//	                color: '#363636'
//	            },
//	            formatter: function (param) {
//	                return param.name;
//	            }
//	        },
//	        emphasis: {
//	            show: false
//	        }
//	    },
//	    itemStyle: {
//	    	normal: {
//				color : '#FB7432'
//	        },
//	        emphasis: {
//	        	color : '#FB7432'
//	        }
//	    }
//	},{
//		name: '用户',
//	    type: 'scatter',
//	    coordinateSystem: 'geo',
//	    symbolSize: 15,
//	    symbol: 'circle',
//	    zlevel: 1,
//	    data: convertData(userData, 1),
//	    tooltip:{
//	    	position:'top',
//	    	backgroundColor:'#FCFCFC',
//	    	borderColor:'#BFC3C6',
//	    	borderWidth:2,
//	    	textStyle:{
//	    		color :'#3B5562'
//	    	},
//	    	formatter:function(params){
//	    		var values = tooltiplist[params.name];
//	    		var res = "<div style='padding: 8px;color:#657F89;font-size:16px;'><span style='font-weight: bold;line-height: 2em;font-size:18px;'>" + values[0].USERNAME + "</span><br />" +
//	    					"<span>地址：" + values[0].ADDRESS + "</span><br />" +
//	    					"<span>合同容量：" + values[0].CONTRACTCAP + "</span><br />" +
//	    					"<span>电压等级：" + values[0].VOLTAGECLASS + "</span></div>";
//	    		return res;
//	    	}
//	    },
//	    label: {
//	        normal: {
//	            show: false,
//	            textStyle: {
//	                color: '#363636'
//	            },
//	            formatter: function (param) {
//	                return param.name;
//	            }
//	        },
//	        emphasis: {
//	            show: false
//	        }
//	    },
//	    itemStyle: {
//	        normal: {
//				color : function (val) {
//					var values = cameraList[val.name];
//					if (values[0].DVR_IP == ''){
//						return '#9FA0A2';
//					}else{
//						return '#2E9DA1';
//					}
//				},
//				borderColor: '#F6FCF8',
//                borderWidth: 3,
//	        },
//	        emphasis: {
//	        	color : '#F68E59'
//	        }
//	    }
//	}];
//	
//	var myChart = echarts.init(document.getElementById('mapChart'));
//
//    option = {
//        //backgroundColor: 'transparent',
//        //color: ['rgba(30,144,255,1)', 'lime'],
//        title: {
//            show: false,
//            text: '123',
//            subtext: '',
//            x: 'center',
//            textStyle: {
//                color: 'black',
//                fontSize: 60
//            }
//        },
//        legend: {
//            show: false,
//            orient: 'vertical',
//            x: 'left',
//            data: [],
//            textStyle: {
//                //color: '#fff',
//                fontSize: 30
//            },
//            top: 200,
//            right: 50,
//            itemGap: 20
//        },
//        toolbox: {
//            show: false,
//            orient: 'vertical',
//            x: 'right',
//            y: 'center',
//            feature: {
//                mark: { show: true },
//                dataView: { show: true, readOnly: false },
//                restore: { show: true },
//                saveAsImage: { show: true }
//            }
//        },
//        tooltip:{
//        	show : true
//        },
//        geo: {
//            map: mapName,
//            label: {
//                normal: {
//                    show: false
//                },
//                emphasis: {
//                    show: false
//                }
//            },
//            itemStyle: {
//                normal: {
//                    color: '#B1F1F3',
//                    borderColor: '#eff6fa',
//                    borderWidth: 5
//
//                },
//                emphasis: {
//                    color: '#B1F1F3',
//                    borderColor: '#eff6fa',
//                    borderWidth: 5
//                }
//            }
//            //#0358A9
//
//        },
//        series: series
//    };
//    
//    var mapJsName = "";
//    
//    switch (mapName){
//    case "常州市金坛区":
//    	mapJsName = "jintan.js";
//    	break;
//    case "无锡市江阴市":
//    	mapJsName = "jiangyin.js";
//    	break;
//    case "无锡市宜兴市":
//    	mapJsName = "yixing.js";
//    	break;
//    }
//    
//    $.ajax({
//    	url : basePath + '/pages/despages/showPages/js/mapJs/' + mapJsName,
//    	dataType : 'script',
//    	cache : true
//    }).done(function(){
//    	myChart.setOption(option);
//    });
//
//    myChart.on('click', function(params){
//    	if (params.seriesType != undefined && params.seriesName == '用户'){
//    		m_roomMap = cameraList[params.name][0];
//    		if (m_roomMap.DVR_IP != ''){
//    			is_login = null;
//    			openPopWindow(params.name);
//    		}
//    	}
//    });
//    
//    function loadMapData(){
//    	$.ajax({
//			type: "post",
//			url: basePath + "/bigScreen/bigScreenVideoData.action",
//			data: "",
//			dataType:"json",
//			cache : false,
//			async : false,//同步异步请求
//			success: function(result)
//			{	
//				mapData = result;
//				$.each(result, function(i, n){
//					
//					if (n.FLAG == '0'){
//						
//						mapName = n.ADDRESS;
//						
//						var testAdd = new Array();
//						testAdd.push(n.LONGITUDE);
//						testAdd.push(n.LATITUDE);
//						
//						geoSysCoordMap[n.USERNAME] = testAdd;
//						
//						sysData.push({
//							name : n.USERNAME,
//							value : 10
//						});
//					}else{
//						userData.push({
//							name : n.USERNAME,
//							value : 10
//						});
//						
//						var testAdd = new Array();
//						testAdd.push(n.LONGITUDE);
//						testAdd.push(n.LATITUDE);
//						
//						geoUserCoordMap[n.USERNAME] = testAdd;
//						
//						var testOneAdd = new Array();
//						testOneAdd.push({
//							DVR_IP : n.IP,
//							DVR_PORT : n.PORT,
//							DVR_USERNAME : n.LOGINNAME,
//							DVR_PASSWORD : n.LOGINPASS,
//							CHANNEL : n.CHANNEL
//						});
//						
//						cameraList[n.USERNAME] = testOneAdd;
//					}
//					
//					var testTwoAdd = new Array();
//					testTwoAdd.push({
//						USERNAME : n.USERNAME,
//						ADDRESS : n.ADDRESS,
//						CONTRACTCAP : n.CONTRACTCAP,
//						VOLTAGECLASS : n.VOLTAGECLASS
//					});
//					
//					tooltiplist[n.USERNAME] = testTwoAdd;
//					
//				});
//			},
//			error:function(e)
//			{
////				$.messager.alert('错误','bigScreenVideoData.action请求错误码：' + e.readyState);
//			}
//		});
//    }
//}

loadInitData();

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
			$('#z_3').text((result.MAINTRANSFORMERCAP == '' ? '--' : Math.round(result.MAINTRANSFORMERCAP)));
			$('#z_4').text((result.MAINTRANSFORMERNUM == '' ? '--' : result.MAINTRANSFORMERNUM));
			$('#z_5').text((result.USERSNUM == '' ? '--' : result.USERSNUM));
			$('#z_6').text((result.SUBSTATIONNUM == '' ? '--' : result.SUBSTATIONNUM));
//			$('#z_7').text((result.WORKORDERNUM == '' ? '--' : result.WORKORDERNUM));
			$('#z_8').text((result.POINTSNUM == '' ? '--' : result.POINTSNUM));
			
			loadReflushData();
		},
		error:function(e)
		{
//			$.messager.alert('错误','bigScreenInit.action请求错误码：' + e.readyState);
		}
	});
}

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
			$('#z_30').text((result.REALTIMELOAD == '' ? '--' : Math.round(result.REALTIMELOAD)));
			$('#z_31').text((result.REALTIMEELECTRICITY == '' ? '--' : Math.round(result.REALTIMEELECTRICITY)));
		},
		error:function(e)
		{
//			$.messager.alert('错误','bigScreenRefresh.action请求错误码：' + e.readyState);
		}
	});
}

function openPopWindow(name){
	
	this.parent.openPopWindow(m_roomMap, name);
	
//	$('#fill_div').css({
//		'display':'block'
//	});
//	$('#fill_div').animate({ opacity: '1' }, 600);
//	
//	$('#popWindow').css({
//		'display':'block'
//	});
	
//	var iHeight = (window.screen.width / 1920) * 500;
//	var iWidth = (window.screen.width / 1920) * 1000;
//	var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
//	var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
//	
//	window.open(basePath + "/pages/despages/showPages/childPages/videoPopWindow.jsp?DVR_IP="
//			+ m_roomMap.DVR_IP + "&DVR_PORT=" + m_roomMap.DVR_PORT + "&DVR_USERNAME=" + m_roomMap.DVR_USERNAME + "&DVR_PASSWORD=" + m_roomMap.DVR_PASSWORD + "&CHANNEL=" + + m_roomMap.CHANNEL, 
//			'XX',
//			'fullscreen=1');
//	'height=' + iHeight + ',width=' + iWidth + ',top=' + iTop + ',left=' + iLeft + 'toolbar=no,menuBar=no,resizable=yes,scrollbars=1,location=no,status=no');
//	height=' + iHeight + ',width=' + iWidth + ',top=' + iTop + ',left=' + iLeft + 'status=no,toolbar=no,scrollbars=no,resizable=no,menuBar=no,location=no,directories=no,titlebar=no
	
//	window.showModalDialog(basePath + "/pages/despages/showPages/childPages/videoPopWindow.jsp?DVR_IP="
//			+ m_roomMap.DVR_IP + "&DVR_PORT=" + m_roomMap.DVR_PORT + "&DVR_USERNAME=" + m_roomMap.DVR_USERNAME + "&DVR_PASSWORD=" + m_roomMap.DVR_PASSWORD + "&CHANNEL=" + + m_roomMap.CHANNEL, 
//			'dialogHeight=' + iHeight + ',dialogWidth=' + iWidth + ',status=0,scroll=0');
	
//	$('#popWindow').addClass('popWindow');
//	setTimeout(function(){
//		$('#popWindow').css({
//			'opacity' : 1,
//			'-webkit-transform' :  'scale(1)',
//			'-moz-transform' : 'scale(1)'
//		});
//		$('#popWindow').removeClass('popWindow');
//		
//		changeStyle(0);
//		
//		openVideo();
//		
//	},1000);
}

function changeStyle(index){
	switch(index){
	case 0:
		$('#popWindow').css({
			'-webkit-transform' :  '',
			'-moz-transform' : ''
		});
		
		var parent = this.parent;
		
		$(parent.document.body).css({
			'-webkit-transform' :  '',
			'-moz-transform' : ''
		});
		
		var ptMain = parent.document.getElementById('pt-main');
		
		$.each($(ptMain).children(), function(i, n){
			if (parent.currPageIndex == i){
				$(n).removeClass('pt-page');
			}
		});
		
		break;
	case 1:
		$('#popWindow').css({
			'-webkit-transform' :  'scale(1)',
			'-moz-transform' : 'scale(1)'
		});
		
		var parent = this.parent;
		
		$(parent.document.body).css({
			'-webkit-transform' :  'scale(1)',
			'-moz-transform' : 'scale(1)'
		});
		
		var ptMain = parent.document.getElementById('pt-main');
		
		$.each($(ptMain).children(), function(i, n){
			if (parent.currPageIndex == i){
				$(n).addClass('pt-page');
			}
		});
		
		break;
	}
}

function toGIS(){
	var options = {
        name: 'GISzl',               //需要打开的菜单的关键字,必须保证正确
        text: 'GIS监控',           //打开菜单的标题,可修改
        path: basePath + 'pages/despages/monitor/GISZongLan.jsp?funcId=10099214308&roleId=10099211993'
    };
	this.parent.parent.reloadTabPage(options);
}

$('#toGisBtn').hover(
	function(){
		$(this).children().eq(0).attr('src', imagePath + '/pageTwo/to_gis_hover.png');
	},
	function(){
		$(this).children().eq(0).attr('src', imagePath + '/pageTwo/to_gis.png');
	}
);

/**
 * 客户跳转客户监控
 * 
 */
function forJumpKhjk(consId, consName) {
	var item = {
		path : '/des/pages/despages/warn/khjk.jsp?consId=' + consId
				+ '&consName=' + consName,
		name : 'ssjkLeafKfjk',
		text : '客户视图'
	};
	this.parent.parent.reloadTabPage(item);
}
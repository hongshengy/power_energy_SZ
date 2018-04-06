<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>

<%
	String baseUrl = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages";

	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";

	SimpleDateFormat sdfFrom = new SimpleDateFormat("yyyy-MM-dd");
	// 默认上月
	Calendar calDay = Calendar.getInstance();
	calDay.add(Calendar.DAY_OF_MONTH, -29);
	String preDay = sdfFrom.format(calDay.getTime());
	// 当天
	Date newDate = DatabaseUtil.getSysDate();
	String today = sdfFrom.format(newDate);

	Calendar calDay1 = Calendar.getInstance();
	calDay1.add(Calendar.DAY_OF_MONTH, -1);
	String lastDay = sdfFrom.format(calDay1.getTime());
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>区域能源服务中心_首页_小区</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link rel="stylesheet"
	href="<%=pagePath%>/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/templet_common.css">
<link rel="stylesheet"
	href="<%=pagePath%>/common/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet"
	href="<%=pagePath%>/common/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" href="<%=pagePath%>/common/css/common.css">
<script src="<%=pagePath%>/common/js/maskJs.js"></script>
</head>
<body>
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
<style>

.block2 {
	text-align: center;
	border: 1px solid #d4d4ca;
}

.block2 .col {
	float: left;
	width: 10%;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	padding: 0 3px;
}

.block2 .col .innerBox {
	background-color: #f7f7f7;
	padding: 5px 10px;
	height: 60px;;
}

.block2 .col p {
	margin: 5px 0;
	font-family: "宋体", serif;
}

.block2 .col .value {
	color: #242424;
	font-size: 14px;
}

.block2 .col .label {
	color: #242424;
	/* padding: 5px; */
	font-size: 14px;
}

.block2 .col .label .num {
	font-family: "宋体", serif;
	font-size: 14px;
	font-weight: bold;
}

.block2 .col .value .num {
	font-family: "宋体", serif;
	font-size: 14px;
	font-weight: bold;
}

.block2 .col3 .innerBox p {
	margin-top: 10px;
}
</style>
	<div id="cc" class="easyui-layout" style="width:100%;height:100%;" data-options="minWidth:1200">
		<div data-options="region:'north',title:'',split:false,collapsible:false,border:false"
			style="width:100%;height:100%;overflow: hidden;">
			<div class="easyui-panel" style="height: 15%;width: 100%;" data-options="cls:'fangtian-panel-style'">
				<ul class="ulTable">
					<li style="padding-left: 10px;">
						<a id="easyui-linkbutton" href="javascript:qytQueryOveride('-1');">
							<img style="border-style:none;vertical-align: middle" alt="前一天" src="<%=request.getContextPath()%>/images/tools-moveleft.gif">
						</a>
						<input id="startDay3" type="text" class="c" data-options="width:155,height:24,editable:false" value="<%=today%>" /> 
						<a id="easyui-linkbutton" href="javascript:qytQueryOveride('1');">
							<img style="border-style:none;vertical-align: middle" alt="后一天" src="<%=request.getContextPath()%>/images/tools-moveright.gif">
						</a>
					</li>
					<li>
						<span>&nbsp;</span>
						<select class="easyui-combobox" id="wnGrade" data-options="prompt:'请选择',height:24,editable:false,width:155,panelWidth:155">
							<option value="1440">1440点</option>
							<option value="288" selected>288点</option>
							<option value="144">144点</option>
							<option value="96">96点</option>
							<option value="48">48点</option>
							<option value="24">24点</option>
						</select>
					</li>
				</ul>
			</div>
			<div class="easyui-panel" id="div_body_info2" style="height: 65%;width: 100%;overflow: hidden;"
				data-options="cls:'fangtian-panel-style'"></div>
			<div id="tab-fzl" class="easyui-panel block2" data-options="cls:'fangtian-panel-style bottom-padding'" style="height: 20%;width: 100%;">
				<div class="col col3" style="width:33%">
					<div class="innerBox">
						<p class="label" style="color: #37A09D">最大负荷：
							<span class="num" id="maxDtValue">-</span>
						</p>
						<p class="label" style="color: #37A09D">(前一天)最大负荷：
							<span class="num" id="maxZtValue">-</span>
						</p>
					</div>
				</div>
				<div class="col col3" style="width:33%">
					<div class="innerBox">
						<p class="label" style="color: orange">最小负荷：
							<span class="num" id="minDtValue">-</span>
						</p>
						<p class="label" style="color: orange">(前一天)最小负荷：
							<span class="num" id="minZtValue">-</span>
						</p>
					</div>
				</div>
				<div class="col col3" style="width:34%">
					<div class="innerBox">
						<p class="label" style="color: #B763D0;">平均负荷：
							<span class="num" id="avgDtValue">-</span>
						</p>
						<p class="label" style="color: #B763D0;">(前一天)平均负荷：
							<span class="num" id="avgZtValue">-</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="<%=pagePath%>/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script
	src="<%=pagePath%>/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script
	src="<%=pagePath%>/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath%>/common/js/common.js"></script>
<script src="<%=pagePath%>/common/js/maskJs.js"></script>
<script type="text/javascript"
	src="<%=pagePath%>/common/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/util/Util.js"></script>
<script type="text/javascript" src="<%=pagePath%>/common/js/dateUtil.js"></script>
<script type="text/javascript">
	webContextRoot="<%=basePath%>";
	var myChart3;

	$(document).ready(function() {
		myChart3 = echarts.init(document.getElementById('div_body_info2'));

// 		loadLineInfo('', '');

		$('#wnGrade').combobox({
			onSelect : function(param) {
				loadLineInfo('', param.value);
			}
		});

		$('#startDay3').datebox({
			onSelect : function(date) {
				loadLineInfo('', '');
			}
		});

	});

	function loadTimeDate() {
		var d = [];
		var len = 0;
		while (len++ < 288) {
			d.push([ new Date(2017, 9, 1, 0, len * 10000),
					(Math.random() * 30).toFixed(2) - 0,
					(Math.random() * 100).toFixed(2) - 0 ]);
		}
		return d;
	}

	function loadLineInfo(selectedDay, selectedData) {
		myChart3.showLoading({
			text : '正在努力的读取数据中...',
			effect : 'spin'
		});

		var startDay3;
		var selValData;
		if (selectedDay == null || selectedDay == '') {
			startDay3 = $('#startDay3').val();
		} else {
			startDay3 = selectedDay;
		}

		if (selectedData == null || selectedData == '') {
			selValData = $('#wnGrade').val();
		} else {
			selValData = selectedData;
		}

		$.post(webContextRoot + 'homeFirstPageAction/loadLineInfo.action', {
			'queryPara.START_DATE' : startDay3,
			'queryPara.SEL_VAL' : selValData
		}, function(data) {
			loadChart(data);
			myChart3.hideLoading();

			var dtArr = data.X_DATA1;
			var ztArr = data.X_DATA2;
			var maxDtValue = 0;
			var maxZtValue = 0;
			var minDtValue = 0;
			var minZtValue = 0;

			var dtCount = 0;
			var dtSum = 0;
			var dtFlag = false;
			//当天
			for (var i = 0; i < dtArr.length; i++) {
				if (dtArr[i] != '-' && dtFlag == false) {
					maxDtValue = parseFloat(dtArr[i]);
					minDtValue = parseFloat(dtArr[i]);
					dtFlag = true;
				}
				if (dtArr[i] != '-' && maxDtValue < parseFloat(dtArr[i])) {
					maxDtValue = parseFloat(dtArr[i]);
				}
				if (dtArr[i] != '-' && minDtValue > parseFloat(dtArr[i])) {
					minDtValue = parseFloat(dtArr[i]);
				}
				if (dtArr[i] != '-') {
					dtSum = parseFloat(dtSum) + parseFloat(dtArr[i]);
					dtCount++;
				}
			}

			var ztCount = 0;
			var ztSum = 0;
			var ztFlag = false;
			//昨天
			for (var i = 0; i < ztArr.length; i++) {
				if (ztArr[i] != '-' && ztFlag == false) {
					maxZtValue = parseFloat(ztArr[i]);
					minZtValue = parseFloat(ztArr[i]);
					ztFlag = true;
				}
				if (ztArr[i] != '-' && maxZtValue < parseFloat(ztArr[i])) {
					maxZtValue = parseFloat(ztArr[i]);
				}
				if (ztArr[i] != '-' && minZtValue > parseFloat(ztArr[i])) {
					minZtValue = parseFloat(ztArr[i]);
				}
				if (ztArr[i] != '-') {
					ztSum = parseFloat(ztSum) + parseFloat(ztArr[i]);
					ztCount++;
				}
			}

			var avgDtValue = (dtSum / dtCount).toFixed(2);
			var avgZtValue = (ztSum / ztCount).toFixed(2);
			$('#maxDtValue').text(maxDtValue == 0 ? '-' : maxDtValue);
			$('#minDtValue').text(minDtValue == 0 ? '-' : minDtValue);
			$('#maxZtValue').text(maxZtValue == 0 ? '-' : maxZtValue);
			$('#minZtValue').text(minZtValue == 0 ? '-' : minZtValue);
			$('#avgDtValue').text(avgDtValue == 'NaN' ? '-' : avgDtValue);
			$('#avgZtValue').text(avgZtValue == 'NaN' ? '-' : avgZtValue);
		}, 'json');

	}

	function loadChart(data) {
		option = {
			title : {
				text : '区域负荷曲线',
				x : 'center'
			//subtext: '纯属虚构'
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : [ '负荷', '负荷(前一天)' ],//['用电','用电(前一天)','出线','出线(前一天)'],
				selected : {
					'用电' : true,
					'用电(前一天)' : true
				},
				/**
				{'用电':true,
				'用电(前一天)':true,
				'出线':false,
				'出线(前一天)':false
				},**/
				padding : 32
			},
			toolbox : {
				show : false,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : true,
						type : [ 'line', 'bar' ]
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : data.X_NAME
			//['周一','周二','周三','周四','周五','周六','周日']
			} ],
			yAxis : [ {
				name : '单位(kW)',
				type : 'value',
				axisLabel : {
					formatter : '{value}'//'{value} °C'
				}
			} ],
			grid : {
				x : 70,
				y : 70,
				y2 : 30,
				x2 : 30
			},
			series : [ {
				name : '负荷',
				type : 'line',
				data : data.X_DATA1
			//[11, 11, 15, 13, 12, 13, 10]
			}, {
				name : '负荷(前一天)',
				type : 'line',
				data : data.X_DATA2
			//[1, -2, 2, 5, 3, 2, 0]
			}
			]
		}
		myChart3.setOption(option);
	}

	function qytQueryOveride(dateTime) {
		var startDay2 = $('#startDay3').val();
		var resultDay = timeUtil(dateTime, startDay2);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
		//alert(resultDay);
		$('#startDay3').datebox('setValue', resultDay);
		//loadDlfbPie(resultDay);
		loadLineInfo(resultDay, $('#wnGrade').val());
	}

	function timeUtil(dateTime, startDay) {
		var resultDay = DateUtil.dateAdd("d", parseInt(dateTime), DateUtil
				.strToDate(startDay));
		var resultStr = "";
		resultStr += resultDay.getFullYear() + "-"
				+ leftPad((resultDay.getMonth() + 1)) + "-"
				+ leftPad(resultDay.getDate());
		function leftPad(str) {
			if (str.toString().length == 1) {
				return '0' + str;
			} else {
				return str;
			}
		}
		return resultStr;
	}
	
	function echartResize(){
		setTimeout(
				"myChart3.resize();",
				500);
	}
	
</script>
</html>

<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

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

<title>GIS电量</title>

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
		<div data-options="region:'north',title:'',split:false,collapsible:false,border:false" style="width:100%;height:100%;overflow: hidden;">
			<div class="easyui-panel" style="height: 15%;width: 100%;" data-options="cls:'fangtian-panel-style'">
				<ul class="ulTable">
					<li style="padding-left: 10px;">
						<a onclick="qytQuery('-1');" id="button_query" href="javascript:void(0);" >
							<img style="border-style:none;vertical-align: middle" alt="前一天" src="<%=request.getContextPath()%>/images/tools-moveleft.gif">
						</a> 
						<input id="startDay2" type="text" class="easyui-datebox" class="dateTime_style" data-options="width:155,height:24,editable:false"
						value="<%=today%>" /> 
						<a onclick="qytQuery('1');" id="button_query" href="javascript:void(0);" > 
							<img style="border-style:none;vertical-align: middle" alt="后一天" src="<%=request.getContextPath()%>/images/tools-moveright.gif">
						</a>
					</li>
				</ul>
			</div>
			<div class="easyui-panel" id="div_body_info1" style="height: 85%;width: 100%;overflow: hidden;" data-options="cls:'fangtian-panel-style bottom-padding'"></div>
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
	var myChart2;
    
	$(document).ready(function() {
		myChart2 = echarts.init(document.getElementById('div_body_info1'));
		loadDlfbPie();

		$('#startDay2').datebox({
			onSelect : function() {
				loadDlfbPie();
			}
		});
	});

	function loadDlfbPie() {
		myChart2.showLoading({
			text : '正在努力的读取数据中...',
			effect : 'spin'
		});

		$.post(webContextRoot + 'giszl/gisDLInfo.action', {
			'dlModel.dataDate' : $('#startDay2').datebox('getValue')
		}, function(data) {
			loadChart(data);
			myChart2.hideLoading();

			//  		         var dtArr = data.dtPowerData;
			//  		         var ztArr = data.ztPowerData;
			//  		         var maxDtValue = 0;
			//  		         var maxZtValue = 0;
			//  		         var minDtValue = 0;
			//  		         var minZtValue = 0;

			//  		         var dtCount = 0;
			//  		         var dtSum = 0;
			//  		         var dtFlag = false;
			// 		         当天
			//  		         for(var i=0 ;i<dtArr.length;i++){
			//  		         	if(dtArr[i] != null && dtArr[i] != "" && dtFlag == false){
			//  		         		maxDtValue = parseFloat(dtArr[i]);
			//  		         		minDtValue = parseFloat(dtArr[i]);
			//  		         		dtFlag = true;
			//  		         	}
			//  		         	if(dtArr[i] != null && dtArr[i] != "" && maxDtValue < parseFloat(dtArr[i])){
			//  		         		maxDtValue = parseFloat(dtArr[i]);
			//  		         	}
			//  		         	if(dtArr[i] != null && dtArr[i] != "" && minDtValue > parseFloat(dtArr[i])){
			//  		         		minDtValue = parseFloat(dtArr[i]);
			//  		         	}
			//  		         	if(dtArr[i] != null && dtArr[i] != ""){
			//  		         		dtSum = parseFloat(dtSum) + parseFloat(dtArr[i]);
			//  		         		dtCount ++;
			//  		         	}

			//  		         }

			//  		         var ztCount = 0;
			//  		         var ztSum = 0;
			//  		          var ztFlag = false;
			// 		          昨天
			//  		         for(var i=0 ;i<ztArr.length;i++){
			//  		         	if(ztArr[i] != null && ztArr[i] != "" && dtFlag == false){
			//  		         		maxZtValue = parseFloat(ztArr[i]);
			//  		         		minZtValue = parseFloat(ztArr[i]);
			//  		         		dtFlag = true;
			//  		         	}
			//  		         	if(ztArr[i] != null && ztArr[i] != "" && maxZtValue < parseFloat(ztArr[i])){
			//  		         		maxZtValue = parseFloat(ztArr[i]);
			//  		         	}
			//  		         	if(ztArr[i] != null && ztArr[i] != "" && minZtValue > parseFloat(ztArr[i])){
			//  		         		minZtValue = parseFloat(ztArr[i]);
			//  		         	}
			//  		         	if(ztArr[i] != null && ztArr[i] != ""){
			//  		         		ztSum = parseFloat(ztSum) + parseFloat(ztArr[i]);
			//  		         		ztCount ++;
			//  		         	}
			//  		         }

			//  		         var avgDtValue = (dtSum/dtCount).toFixed(2);
			//  		         var avgZtValue = (ztSum/ztCount).toFixed(2);
			//  		         $('#maxDtValue').text(maxDtValue==0?'-':maxDtValue);
			//  		         $('#minDtValue').text(minDtValue==0?'-':minDtValue);
			//  		         $('#maxZtValue').text(maxZtValue==0?'-':maxZtValue);
			//  		         $('#minZtValue').text(minZtValue==0?'-':minZtValue);
			//  		         $('#avgDtValue').text(avgDtValue=='NaN'?'-':avgDtValue);
			//  		         $('#avgZtValue').text(avgZtValue=='NaN'?'-':avgZtValue);

		}, 'json');
	}

	function loadChart(data) {
		option = {
			title : {
				text : '区域用电',
				x : 'center'
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : [ '用电', '用电(前一天)' ],
				x : 'center',
				y : '35'
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				containLabel : true
			},
			xAxis : {
				type : 'category',
				data : data.dataDate
			},
			yAxis : {
				name : '单位(kWh)',
				type : 'value'
			},
			series : [ {
				name : '用电',
				type : 'bar',
				data : data.dtPowerData
			}, {
				name : '用电(前一天)',
				type : 'bar',
				data : data.ztPowerData
			} ]
		};

		myChart2.setOption(option);

	}
	
	function qytQuery(dateTime){
		var startDay2 = $('#startDay2').val();
		var resultDay = timeUtil(dateTime,startDay2);//Date.getDateByOffsetDays(startDay2,dateTime);
		$('#startDay2').datebox('setValue',resultDay);
		loadDlfbPie(resultDay);
	}
	function qytQueryOveride(dateTime){
		var startDay2 = $('#startDay3').val();
		var resultDay = timeUtil(dateTime,startDay2);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
		//alert(resultDay);
		$('#startDay3').datebox('setValue',resultDay);
		//loadDlfbPie(resultDay);
		loadLineInfo(resultDay,$('#wnGrade').val());
	}
	function changeWnGrade(){
		
	}
	function timeUtil(dateTime,startDay){
		var resultDay = DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay));
		var resultStr = "";
		resultStr+=resultDay.getFullYear()+"-"+leftPad((resultDay.getMonth()+1))+"-"+leftPad(resultDay.getDate());
		function leftPad(str){
			if(str.toString().length==1){
				return '0'+str;
			}else{
				return str;
			}
		}
		return resultStr;
	}
	function timeQueryLoad(){
		var startDay = $('#startDay1').val();
		var endDay = $('#endDay1').val();
		var timeOne = DateUtil.dateToLong(DateUtil.strToDate(startDay));
		var timeTwo = DateUtil.dateToLong(DateUtil.strToDate(endDay));
		if(timeOne >= timeTwo){
			$.messager.alert("系统提示", "开始时间不能大于等于结束时间！"); 
			return;
		}
		loadQydlBar();
	}
	
	function echartResize(){
		setTimeout(
				"myChart2.resize();",
				500);
	}
</script>
</html>

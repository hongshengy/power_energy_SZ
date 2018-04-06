<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.util.des.*"%>

<%
	String baseUrl = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages";
	String vtradeCode = request.getParameter("tradeCode");
	String vtradeName = request.getParameter("tradeName");

	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
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



<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
    <script type="text/javascript" src="<%=pagePath %>/common/echarts/echarts.min.js"></script>

<script type="text/javascript" src="<%=baseUrl%>/js/util/Util.js"></script>



<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
* {
	margin: 0px 0px;
	padding: 0px 0px;
	border: none;
}

.body_div_start_one {
	height: 100%;
	width: 100%;
}

.tuBiaoInfo {
	width: 100%;
	height: 100%;
	overflow: auto;
}
.echartsPageStyle {
	width: 100%;
	height: 100%;
}
</style>

</head>
<body style="overflow:hidden; ">
	<div id="EchartPageByLine" class="echartsPageStyle"></div>
	<input type="hidden" value="<%=request.getAttribute("DATE_TIME")%>" id="DATE_TIME"/>
	<input type="hidden" value="<%=request.getAttribute("TERMINAL_ID")%>" id="TERMINAL_ID" />
	<input type="hidden" value="<%=request.getAttribute("SUBS_ID")%>" id="SUBS_ID" />
</body>

<script type="text/javascript">
		var station = '${queryPara.station}';
		var resultData;
		var myChart1;
		
		var paramStartDay = $('#DATE_TIME').val();
		var SUBS_ID = $('#SUBS_ID').val();
		var TERMINAL_ID = $('#TERMINAL_ID').val();
		
		var RESULTSELECTEDMAP = new Array();
		var xNameLineName = new Array();
		var xNameLineTime = new Array();
		var xBossData = new Array();
		
		$(document).ready(function(){
			resultData = new Array();
			myChart1 = echarts.init(document.getElementById('EchartPageByLine'));
			loadEchartPageByLine();
			xNameLineName = new Array();
			xNameLineTime = new Array();
			xBossData = new Array();
			RESULTSELECTEDMAP = new Array();
			paramStartDay = $('#DATE_TIME').val();
			SUBS_ID = $('#SUBS_ID').val();
			TERMINAL_ID = $('#TERMINAL_ID').val();
		});
		function loadEchartPageByLine(){
			
			myChart1.showLoading({
			    text: '正在努力的读取数据中...'    //loading话术
			});
			
			loadData();
			myChart1.hideLoading();
			var option = {
			    title : {
			        text: '进出线功率曲线  数据日期('+paramStartDay+')',
			        subtext: '',
			        x: 'center'
			    },
			    tooltip : {
			        trigger: 'axis',
			        formatter: function(params) {
			        	var paramResult = paramStartDay +' '+ params[0].name + ':00<br/>';
			        	paramResult += params[0].seriesName + ' : ' 
										 + params[0].value + ' (kW)<br/>';
			        	/**for ( var i = 0; i < params.length; i++) {
							paramResult += params[i].seriesName + ' : ' 
										 + params[i].value + ' (kW)<br/>';
						}**/
			            /**return paramStartDay +' '+ params[0].name + ':00<br/>'
			                   + params[0].seriesName + ' : ' 
			                   + params[0].value + ' (kW)<br/>'
			                   + '123';**/
	                   return paramResult;
			        }
			    },
			    legend: {
			        data:xNameLineName,//['温度'],
			        x: 'center',
			      	y:'bottom',
			      	selected : RESULTSELECTEDMAP,
			      	padding:30
			    },
			    grid: {x:40,x2:20,y2:130},
			    dataZoom : {
			        show : true,
			        realtime : true,
			        start : 0,
			        height : 30,
			        y2: 18,
			        end : 100
			    },
			    xAxis : [
			        {
			            type : 'category',
			            //data : ['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00', '01:05', '01:10', '01:15', '01:20', '01:25', '01:30', '01:35', '01:40', '01:45', '01:50', '01:55', '02:00', '02:05', '02:10', '02:15', '02:20', '02:25', '02:30', '02:35', '02:40', '02:45', '02:50', '02:55', '03:00', '03:05', '03:10', '03:15', '03:20', '03:25', '03:30', '03:35', '03:40', '03:45', '03:50', '03:55', '04:00', '04:05', '04:10', '04:15', '04:20', '04:25', '04:30', '04:35', '04:40', '04:45', '04:50', '04:55', '05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55', '06:00', '06:05', '06:10', '06:15', '06:20', '06:25', '06:30', '06:35', '06:40', '06:45', '06:50', '06:55', '07:00', '07:05', '07:10', '07:15', '07:20', '07:25', '07:30', '07:35', '07:40', '07:45', '07:50', '07:55', '08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55', '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55']
			        	data:xNameLineTime
			        }
			    ],
			    yAxis : [
			        {
			            name : '单位(kW)',
			            type : 'value'
			        }
			    ],
			    series : xBossData/**[
			        {
			            name:'温度',
			            type:'line',
			            data:
			            //['57','57','72','71','26','27','9','81','77','88','46','87','65','65','72','1','7','22','82','28','83','45','38','22','53','63','36','87','7','11','8','86','25','13','46','65','97','96','21','43','90','5','77','54','29','40','14','16','7','28','21','42','34','83','78','35','34','72','0','11','72','94','26','1','86','14','27','39','26','32','41','85','89','99','68','64','64','11','93','98','50','45','82','92','82','94','44','84','23','60','84','36','82','99','16','99','79','27','77','87','41','23','22','69','82','55','93','90','82','6','34','2','36','8','6','95','40','18','41','27','9','84','31','67','84','33','49','66','50','9','84','98','57','58','16','98','33','51','66','31','38','9','49','16','13','33','28','99','71','43','17','70','34','43','85','12','51','50','3','21','70','23','30','27','10','59','67','48','41','70','14','61','77','52','94','61','0','17','32','47','1','37','16','12','55','78','86','11','67','8','44','40','99','10','57','55','74','59','3','71','84','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-']
			        }
			    ]**/
			};
			myChart1.setOption(option,true);
		}
		function loadData(){
			
			var queryparam = "queryPara.SUBS_ID="+SUBS_ID+"&queryPara.DATE_TIME="+paramStartDay+"&queryPara.ORG_NO=01&queryPara.TERMINAL_ID="+TERMINAL_ID+"&queryPara.startSize="+station
			$.ajax({
				type: "post",
				url: "<%=basePath%>/userDataCenterAction/loadLineInfo.action",
				data : queryparam,
				dataType : "json",
				cache : false,
				async : false,//同步异步请求
				success : function(result) {
					xNameLineName = result.X_NAME_LINE_NAME;
					xNameLineTime = result.X_NAME_LINE_TIME;
					xBossData = result.X_BOSS_DATA;
					RESULTSELECTEDMAP = result.RESULTSELECTEDMAP;
	
				},
				error : function(e) {
				}
			});
		}
		
		/**function loadTooltipName(){
			var paramResult = paramStartDay +' '+ params[0].name + ':00<br/>';
        	for ( var int = 0; int < xNameLineName.length; int++) {
				paramResult += params[i].seriesName + ' : ' 
							 + params[i].value + ' (kW)<br/>';
			}
			alert(paramResult);
		}**/

</script>
</html>

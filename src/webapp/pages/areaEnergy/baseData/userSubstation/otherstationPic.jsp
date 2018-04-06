<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String device = request.getParameter("device");
String data = request.getParameter("data");
String station = request.getParameter("station");
String mpId = request.getParameter("mpId");
String mpCode = request.getParameter("mpCode");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>图表</title>
		<jsp:include page="/ext.jsp" />
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
<script type="text/javascript" src="<%=request.getContextPath() %>/pages/despages/common/echarts/echarts.min.js"></script>
		<script type="text/javascript">
			 var device = '<%=device%>';
			 var data = '<%=data%>';
			 var station = '<%=station%>';
			 var mpId = '<%=mpId%>';
			 var mpCode = '<%=mpCode%>';
		</script>
		
<style type="text/css">
	.echartsPageStyle {
		width: 100%;
		height: 100%;
	}
</style>
	</head>

	<body>
		<div id="EchartPageByLine" class="echartsPageStyle"></div>
	</body>
	<script type="text/javascript">
	var myChart1;
	var paramStartDay = data;
	var resultData1;
	var resultX;
	 Ext.onReady(function(){
		myChart1 = echarts.init(document.getElementById('EchartPageByLine'));
		loadEchartPageByLine();
		resultData1 = new Array();
		resultX = new Array();
	 });
	 
	 function loadEchartPageByLine(){
			myChart1.showLoading({
			    text: '正在努力的读取数据中...'    //loading话术
			});
			loadData();
			myChart1.hideLoading();
			var option = {
			    title : {
			        text: '测点数据曲线  数据日期('+data+')',
			        subtext: '',
			        x: 'center'
			    },
			    tooltip : {
			        trigger: 'axis',
			        formatter: function(params) {
			        	var paramResult = paramStartDay +' '+ params[0].name + ':00<br/>';
			        	for ( var i = 0; i < params.length; i++) {
							paramResult += params[i].seriesName + ' : ' 
										 + params[i].value + '<br/>';
						}
	                   return paramResult;
			        }
			    },
			    legend: {
			        data:['测点值'],
			        x: 'right'
			    },
			    grid: {x:40,x2:20},
			    dataZoom : {
			        show : true,
			        realtime : true,
			        start : 0,
			        height : 30,
			        //y2: 18,
			        end : 100
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : resultX
			        }
			    ],
			    yAxis : [
			        {
			            name : '',
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'测点值',
			            type:'line',
			            data:resultData1
			        }
			    ]
			};
			myChart1.setOption(option,true);
		}
		function loadData(){
			var queryparam = "queryPara.DEVICE_ID="+device+"&queryPara.DATE_TIME="+data
			+"&queryPara.startSize="+station+"&queryPara.mpId="+mpId+"&queryPara.mpCode="+mpCode;
			$.ajax({
				type: "post",
				url: "<%=basePath%>/userDataCenterAction/otherStationPic.action",
				data : queryparam,
				dataType : "json",
				cache : false,
				async : false,//同步异步请求
				success : function(result) {
					resultData1 = result.X_DATA;
					resultX = result.X_DATA_NAME;
				}
			});
		}
	</script>
</html>

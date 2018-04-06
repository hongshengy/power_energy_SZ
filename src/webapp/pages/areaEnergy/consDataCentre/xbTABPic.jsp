<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String lineName = request.getParameter("lineName");
String lineNamec = request.getParameter("lineNamec");
String searchType = request.getParameter("searchType");
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
			var lineName = '<%=lineName%>';
			var lineNamec = '<%=lineNamec%>';
			var searchType = '<%=searchType%>';
		</script>
		
<style type="text/css">
	.echartsPageStyle {
		width: 100%;
		height: 100%;
	}
</style>
	</head>

	<body style="position: relative;">
		<div id="EchartPageByLine" class="echartsPageStyle" ></div>
		<div style="position: absolute;top: 30px;right: 60px;color: black;font-size: 14px;">谐波总畸变率<span id="thd">--</span></div>
	</body>
	<script type="text/javascript">
	var myChart1;
	var xNameLineNameX = new Array();
	var xNameLineNameY = new Array();
	var LINENAME = "";
	$(document).ready(function(){
		myChart1 = echarts.init(document.getElementById('EchartPageByLine'));
		loadEchartPageByLine();
		xNameLineNameX = new Array();
		xNameLineNameY = new Array();
	 });
	 
	 function loadEchartPageByLine(){
			myChart1.showLoading({
			    text: '正在努力的读取数据中...'    //loading话术
			});
			loadData();
			myChart1.hideLoading();
			option = {
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    title : {
			        text: LINENAME,
			        subtext: '',
			        x: 'center'
				},
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            //data : ['Ia1','Ia2','Ia3','Ia4','Ia5','Ia6','Ia7','Ia8','Ia9','Ia10','Ia11','Ia12','Ia13','Ia14','Ia15']
			            data:xNameLineNameX
			        }
			    ],
			    yAxis : [
			        {
			            name : '(%)',
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'谐波',
			            type:'bar',
			            stack: '谐波',
			            barWidth:30,
			            //data:[150, 0, 201, 154, 190, 330, 410,150, 232, 201, 154, 190, 330, 410,622]
			            data:xNameLineNameY
			        }
			    ]
			};
			myChart1.setOption(option,true);
		}
		
		function loadData(){
			var lasttime = $("#sjrq",window.parent.document).val();
			var queryparam = "queryPara.LINE_ID="+lineName+"&queryPara.TYPE="+lineNamec+"&queryPara.LASTTIME="+lasttime+"&queryPara.searchType="+searchType;
			$.ajax({
				type: "post",
				url: "<%=basePath%>/areaEnergy/queryXbPic.action",
				data : queryparam,
				dataType : "json",
				cache : false,
				async : false,//同步异步请求
				success : function(result) {
					xNameLineNameX = result.X_DATA_INFO;
					xNameLineNameY = result.Y_DATA_INFO;
					$("#thd").html(result.THD);
					LINENAME = result.LINENAME;
				},
				error : function(e) {
				}
			});
		}
	</script>
</html>

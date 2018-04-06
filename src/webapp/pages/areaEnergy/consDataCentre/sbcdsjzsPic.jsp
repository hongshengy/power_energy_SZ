<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String LINEID = request.getParameter("LINEID");
String mpId = request.getParameter("mpId");
String dateTime = request.getParameter("dateTime");
String station = request.getParameter("station");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>图表</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<script type="text/javascript" src="<%=request.getContextPath() %>/pages/despages/common/echarts/echarts.min.js"></script>
		<script type="text/javascript">
			 var mpId = '<%=mpId%>';
			 var lineId = '<%=LINEID%>';
			 var dateTime = '<%=dateTime%>';
			 var station = '<%=station%>';
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
		
		
		var array1 = new Array();
		var array2 = new Array();
		var mindata = 0;
		var dw = '';
		$(document).ready(function(){
			array1 = new Array();
			array2 = new Array();
			myChart1 = echarts.init(document.getElementById('EchartPageByLine'));
			loadEchartPageByLine();
		});
		
		function loadEchartPageByLine(){
			
			myChart1.showLoading({
			    text: '正在努力的读取数据中...'    //loading话术
			});
			loadData();
			myChart1.hideLoading();
			var option = {
			    title : {
			        text: '测点数据曲线  数据日期('+dateTime+')',
			        subtext: '',
			        x: 'center'
			    },
			    tooltip : {
			        trigger: 'axis'
 			        ,
 			        formatter: function(params) {
			        	var paramResult = dateTime +' '+ params[0].name + ':00<br/>';
 			        	for ( var i = 0; i < params.length; i++) {
 							paramResult += params[i].seriesName + ' : ' 
 										 + params[i].value +' '+dw+ '<br/>';
 						}
 	                   return paramResult;
 			        }
			    },
			    legend: {
			        data:['数据值'],
			        x: 'right'
			      	//y:'bottom',
			      	//selected : RESULTSELECTEDMAP,
			      	//padding:30
			    },
			    grid: {x:80,x2:20},
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
			            data : array1
			        }
			    ],
			    yAxis : [
			        {
			            name : '单位'+dw,
			            type : 'value',
			            min : parseInt(mindata)
			        }
			    ],
			    series : [
			        {
			            name:'数据值',
			            type:'line',
			            data:array2
			        }
			    ]
			};
			myChart1.setOption(option,true);
		}
		function loadData(){
			var queryparam = "queryPara.startSize="+station+"&queryPara.mpId="+mpId+"&queryPara.DATE_TIME="+dateTime;
			$.ajax({
				type: "post",
				url: "<%=basePath%>/areaEnergy/querySBCDSJPic.action",
				data : queryparam,
				dataType : "json",
				cache : false,
				async : false,//同步异步请求
				success : function(result) {
// 					debugger;
					array1 = result.dateVal;
					array2 = result.pVal;
					mindata = result.minData;
					dw = result.dw;
				},
				error : function(e) {
				}
			});
		}
		

</script>
</html>

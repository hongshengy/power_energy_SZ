<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
			String dataDate=request.getParameter("dataDate");
			String consId=request.getParameter("consId");
			String consNo=request.getParameter("consNo");
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>用户档案基本信息</title>
		<jsp:include page="/ext.jsp" />
        <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	    <script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
	    <script type="text/javascript" src="<%=basePath%>pages/storedEnergy/firstData/echarts/js/echarts.js"></script>
	    <script type="text/javascript" src="<%=basePath %>js/json2.js"></script>
	</head>
    <body srolling='no'>
    <input type = 'hidden' id="dataDate" value="<%=dataDate%>"/>
    <input type = 'hidden' id="consId" value="<%=consId%>"/>
    <input type = 'hidden' id="consNo" value="<%=consNo%>"/>
		<div id="pie" style="background-color: white; border: 0px solid #ccc; margin: 0px; width: 1000px;height:500px;">
				       </div>
	</body>
	<script type="text/javascript">
	$(function(){
		     query();
		     setDataGridHeight();
		});
//查询
function query(){
             var time = $("#dataDate").val();
		if(!time){
            MessageBox("请选择数据日期!");
            return;
        }
            //开始遮罩
			window.showWaitDisplayForQuery();
			$.ajax({
				type: "post",
				url: "<%=basePath%>/fqrsTmnl/generalElecUsedView.action?queryPara.flag=3&queryPara.date="+$('#dataDate').val()+"&queryPara.consId="+$('#consId').val(),
				dataType:"json",
				success: function(json){
				      echarts(json);
				      setDataGridHeight() ;
				      window.disWaitDisplayForQuery();
					},
				error : function(){
					MessageBox('系统异常！');
					//结束遮罩
				    disWaitDisplayForQuery();
				}
			});
}
//画图
function echarts(json){
			require.config({
				paths: {
			   	 	echarts: '<%=basePath%>pages/storedEnergy/firstData/echarts/js'
				}	
			});
			require(
				[
					'echarts',
					'echarts/chart/line', 
					'echarts/chart/pie'  
				],function(echart){
				  // myChart=drawLine(echart,json.totalQy,json.totalQx);
		          //drawTwoLine(echart,[json.totalQy,json.bianLine],json.totalQx);
		           drawPie(echart,json.dataPie);
				}
	);
}
//饼图
function drawPie(ec,data){
      			// 基于准备好的dom，初始化echarts图表
       			var myChart = ec.init(document.getElementById("pie")); 
        		var option = {
        		backgroundColor:'#fff',
					    title : {
					        text: '电量占比('+$('#consNo').val()+')',
					        textStyle : {fontSize: 20,fontWeight: 'bolder', color:'black',fontFamily:'NSimSun'},
					        x:'center'
					    },
					    tooltip : {
					        trigger: 'item',
					        formatter: "{b} : ({d}%)"
					    },
					    calculable : false,
					    series : [
					        {
					            name:'合计',
					            type:'pie',
					            radius : '65%',
					            center: ['50%', '64%'],
					            data:data
					        }
					    ]
					};
			// 为echarts对象加载数据
       	myChart.setOption(option); 
       	return myChart;
}

var LoadMask =  null;
function showWaitDisplayForQuery(){
	if (!LoadMask) {
		LoadMask = new Ext.LoadMask(Ext.getBody(),{
		 	msg:"正在加载..."
		});
	}
	LoadMask.show();
}
function disWaitDisplayForQuery(){
	LoadMask.hide();
}
//自适应高度调整 
 function setDataGridHeight() {
     var scrollHeight = this.parent.document.body.scrollHeight-$(".messageList:first").height();
     $(".charts").css("height",scrollHeight/2);
 }
	</script>
</html>


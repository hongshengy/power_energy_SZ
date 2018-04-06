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
    <body>
    <input type = 'hidden' id="dataDate" value="<%=dataDate%>"/>
    <input type = 'hidden' id="consId" value="<%=consId%>"/>
    <input type = 'hidden' id="consNo" value="<%=consNo%>"/>
		<table style="width: 100%; overflow: auto;" cellspacing="0" cellpadding="0" border="0" class="content">
					<tr>
						<td style="vertical-align: top" align="center" class="contentBox"> 
							<table style="width: 100%;" border='0' class="message">
								<tr>
									<td class="messageList">
										<table id="queryTbl" cellspacing="0" cellpadding="0" border="0" align="left" width="100%">
											<tr style="width: 100%;" id="typecode">
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
					    <td style="vertical-align: top" align="center" class="contentBox">
					       <!--
					    --></td>
					</tr>
				</table>
				<table id="charts" style="width: 100%; overflow: auto;" cellspacing="0" cellpadding="0" border="0" class="content">
				  <tr class="charts" style="width:100%">
				    <td style="width:50%">
				       <div id="line1" style="background-color: white; border: 0px solid #ccc; margin: 0px; width: 1000px;height:250px;">
				       </div>
				    </td>
				  </tr>
				  <tr class="charts" style="width:100%">
				    <td style="width:50%">
				       <div id="pie" style="background-color: white; border-top: 1px solid #ccc; margin: 0px; width: 1000px;height:250px;">
				       </div>
				    </td>
				  </tr>
				</table>
	</body>
	<script type="text/javascript">
	$(function(){
		    $.ajax({
				type: "post",
				url: "<%=basePath%>/fqrsTmnl/queryTypeCode.action",
				dataType:"json",
				success: function(json){
					var t = json.codeList;
					for(var i=0;i<t.length;i++){
					$("#typecode").append(
					"<td width='15px'><input type='radio' id='"+t[i].CODEVALUE+"' name='ids' value='"+t[i].CODEVALUE+"' onClick='query();'/>"+
					"<lable for='"+t[i].CODEVALUE+"'>"+t[i].CODENAME+"</lable></td>");
					}
					
				},
				error : function(){
					MessageBox('系统异常！');
				}
			});
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
			var equipFlag = $("input[name='ids']:checked").val();
			$.ajax({
				type: "post",
				url: "<%=basePath%>/fqrsTmnl/generalElecUsedView.action?queryPara.flag=5&queryPara.date="+$('#dataDate').val()+"&queryPara.consId="+$('#consId').val()+"&queryPara.equipFlag="+equipFlag,
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
				   drawLine(echart,json.totalQy,json.totalQx);
		          // drawTwoLine(echart,[json.dataLine1,json.dataLine2],json.dataTime);
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
//曲线图
function drawLine(ec,data,dataTime){
      			// 基于准备好的dom，初始化echarts图表
       			myChart = ec.init(document.getElementById("line1"));
        		var option = {
        		backgroundColor:'#fff',
        			grid : {
        				x:80,     // 【x】轴左侧的距离
        				x2:10,   // 【x】轴右侧的距离
        				y2:85     // 【y】轴下面的距离
        			},
	title : {
		textStyle : {fontSize: 20,fontWeight: 'bolder', color:'black',fontFamily:'NSimSun'},
		x : 'center',
    	text: '用户总能耗曲线('+$('#consNo').val()+')'
				},
    tooltip : {
    	showDelay:0,
    	hideDelay:0,
    	transitionDuration:0,
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'cross'        // 默认为直线，可选为：'line' | 'shadow'
        },
    	formatter: function (params){
            var par0 = params[0].value;
          		return params[0].name + '<br/>'
                  + params[0].seriesName + ' : ' + par0
        }
				},
	   legend: {                    // 图标提示，【x】显示的横向位置，【y】距离标题的纵向位置
    	x : 'center',
    	y : 'bottom',
        selectedMode:false,
        data:['总电量'],
        textStyle:{
		        color:'#3E3E3E'
		        }
    },
				calculable : false,
    xAxis : [
        {
            axisLabel:{
        		show:true,
	        	textStyle:{
	        		color:'#3E3E3E'
	        	},
	        	interval:'7'       // 间隔
        	},
        	axisLine:{
        		lineStyle:{
        			color:'#3E3E3E',
        			width:1
        		}
        	},
        	splitLine:{
        		show:false
        	},
            type : 'category',
            boundaryGap : false ,
            data:dataTime
        }
    ],
    yAxis : [
        {
        	splitLine:{
        		show:true
        	},
        	axisLine:{
        		lineStyle:{
        			color:'#3E3E3E',
        			width:1
        		}
        	},
        	splitLine:{
        		
	        	lineStyle:{
        			color:'#3E3E3E',
        			width:1
        		},
        		show:true
        	},
        	textStyle:{
        		color:'#3E3E3E'
        	},
        	nameTextStyle : {color: 'black'},
            type : 'value',
            name : '电量:度',
            min : 0,
            boundaryGap: [0, 0.1],
            axisLabel:{
            	textStyle:{
            		color:'#3E3E3E'
            	}
            }
        }
    ],
    hoverable:false,
				series : [
   					{
            name:'总电量',
            symbolSize:1.5,    
            type:'line',
            itemStyle:{
              normal:{
               color:'blue',
               lineStyle:{color:'blue'}
              }
            },
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
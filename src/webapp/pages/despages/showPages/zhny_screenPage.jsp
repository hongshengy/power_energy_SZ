<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>

<%
String baseUrl = request.getContextPath();
String pagePath = baseUrl + "/pages/despages";	
String mainCssPath = baseUrl + "/pages/despages/common";
String jsPath = baseUrl + "/pages/despages/showPages/js";
String cssPath = baseUrl + "/pages/despages/showPages/css";
String imagePath = baseUrl + "/pages/despages/showPages/images";
String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ baseUrl + "/";

SimpleDateFormat sdfFrom = new SimpleDateFormat("yyyy-MM-dd");
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
// 默认上月
Calendar calDay=Calendar.getInstance();
calDay.add(Calendar.DAY_OF_MONTH,-29);
String preDay=sdfFrom.format(calDay.getTime());
String preMon=sdf.format(calDay.getTime());
// 当天
Date newDate = DatabaseUtil.getSysDate();
String today = sdfFrom.format(newDate);

// 当月
String mon = sdf.format(newDate);

Calendar calDay1=Calendar.getInstance();
calDay1.add(Calendar.DAY_OF_MONTH,-1);
String lastDay=sdfFrom.format(calDay1.getTime());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'pageFive.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="<%=cssPath%>/homeMain.css" />
	<jsp:include page="/pages/common/componentBase.jsp" />
	<script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/color.css">
	
	<script type="text/javascript" src="<%=mainCssPath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=mainCssPath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=mainCssPath %>/echarts/echarts.min.js"></script>
	
	<script type="text/javascript" src="<%=pagePath %>/common/js/dateUtil.js"></script>
	<script language="javascript" type="text/javascript"
			src="<%=mainCssPath%>/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript">
		var basePath = "<%=basePath%>";
		var imagePath = "<%=imagePath%>";
	</script>
  </head>
  
  <body>
  	<div id="mainDiv" style=" overflow: auto;overflow-x:hidden; ">
     <table id="maintable" class="maintable">
      <tr >
      	<td width="50%" style="border-right:1px solid">
      		<span class="tools-labelgroup" style="float:right;margin-right:10px;"> 
		     		<input id="date1" class="Wdate" type="text" style="width: 100px; text-align: left;"
					 onFocus="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true,onpicked:queryZyhyydlList()});"
					 value="<%=preMon%>" />
		
			</span>
		</td> 
		<td width="50%">
			<span class="tools-labelgroup" style="float:right;margin-right:10px;"> 
				<select id="flag" onChange="queryGfsjlList();"><option value="380"> 380V</option><option value="10">10KV </option> </select>
		     		<input id="date2" class="Wdate" type="text" style="width: 100px; text-align: left;"
					 onFocus="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true,onpicked:queryGfsjlList()});"
					 value="<%=mon%>" />
			</span>
		 </td>
      </tr>
	     <tr>
		     <td style="border-bottom:1px solid ;border-right:1px solid">
		     	<div id="chat1" class="chat" style="height: 350px;"></div>
		     </td>
		     <td style="border-bottom:1px solid ;">
		     	<div id="chat2" class="chat" style="height: 350px;"></div>
		     </td>
	     </tr>
	      <tr>
	      	<td style="border-right:1px solid">
	      		<span class="tools-labelgroup" style="float:right;margin-right:10px;"> 
			     		<input id="date3" class="Wdate" type="text" style="width: 100px; text-align: left;"
						 onFocus="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true,onpicked:queryCnsjlList()});"
						 value="<%=preMon%>" />
			
				</span>
			</td> 
			<td>
				<span class="tools-labelgroup" style="float:right;margin-right:10px;"> 
			     		<input id="date4" class="Wdate" type="text" style="width: 100px; text-align: left;"
						 onFocus="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true,onpicked:queryYslAndYqlList()});"
						 value="<%=preMon%>" />
				</span>
			 </td>
	      </tr>
    	 <tr >
		     <td style="border-bottom:1px solid ;border-right:1px solid">
		     	<div id="chat3" class="chat" style="height: 350px;"></div>
		     </td>
		     <td style="border-bottom:1px solid ;">
				<div id="chat4" class="chat" style="height: 350px;"></div>
			 </td>
	     </tr>
	     <tr>
	      	<td style="border-right:1px solid">
	      		<span class="tools-labelgroup" style="float:right;margin-right:10px;"> 
			     		<input id="date5" class="Wdate" type="text" style="width: 100px; text-align: left;"
						 onFocus="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true,onpicked:queryJtznhlList()});"
						 value="<%=mon%>" />
			
				</span>
			</td> 
			<td>
			 </td>
	      </tr>
	     <tr >
		     <td style="border-right:1px solid">
		     	<div id="chat5" class="chat" style="height: 350px;"></div>
		     </td>
		     <td>
		     	<div style="width: 100%;height: 350px;position: relative;">
		     		<div id="view1" style="float: left;width: 250px;;height: 350px;position: absolute;">
		     		</div>
		     		<div style="float: left;height: 350px;position: absolute;left: 250px;right: 0px;">
		     			<div id="chat6" class="chat" style="height: 350px;">
				     	</div>
		     		</div>
		     	</div>
		     </td>
	     </tr>
     </table>
     </div>
	 
	 <script type="text/javascript">
		$("#maintable").width(window.screen.availWidth);
		$("#mainDiv").height(window.screen.availHeight-200);
		var myChart1 = echarts.init(document.getElementById('chat1'));
		var myChart2 = echarts.init(document.getElementById('chat2'));
		var myChart3 = echarts.init(document.getElementById('chat3'));
		var myChart4 = echarts.init(document.getElementById('chat4'));
		var myChart5 = echarts.init(document.getElementById('chat5'));
		var myChart6 = echarts.init(document.getElementById('chat6'));
		$(document).ready(function(){
		  queryZyhyydlList();
		  queryGfsjlList();
		  queryCnsjlList();
		  queryYslAndYqlList();
		  queryJtznhlList();
		  queryQynylList();
		 });
		 
function queryZyhyydlList(){
$.ajax({
		type: "post",
		url: basePath + "/zhnyMain/queryZyhyydlList.action",
		data: "queryPara.date="+$("#date1").val(),
		dataType:"json",
		success: function(result)
			{
			option1 = {
				title : {
					      text: '主要行业用电数据总览(kw/h)',
					      x:'center'
					    },
			    tooltip : {
			        show: true,
			        trigger: 'item'
			    },
			    
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            data : result.namelist
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel : {
			                formatter: '{value}万'
			            }
			        }
			    ],
			    series : [
			       
			        
			        {
			            type:'bar',
			            barWidth: 40,                   // 系列级个性化，柱形宽度
			            data:result.valuelist
			            
			        }
			    ]
			};
			myChart1.setOption(option1); 
		}
	});
	}
	function queryGfsjlList(){
	 $.ajax({
		type: "post",
		url: basePath + "/zhnyMain/queryGfsjlList.action",
		data: "queryPara.flag="+$("#flag").val()+"&queryPara.date="+$("#date2").val(),
		dataType:"json",
		success: function(result)
			{
			option2 = {
				title : {
					      text: '光伏数据总览(kw/h)',
					      link:basePath+'pages/basicApp/photovoltaic2/stationRunMonitor.jsp',
					      x:'center'
					    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['上网','并网'],
			        x:'left'
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            data : result.datelist
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			      
			        {
			            name:'上网',
			            type:'bar',
			            itemStyle: {                // 系列级个性化
			                normal: {
			                    barBorderWidth: 2
			                }
			            },
			            data:result.listSW
			        },
			        {
			            name:'并网',
			            type:'bar',
			            itemStyle: {                // 系列级个性化
			                normal: {
			                    barBorderWidth: 2
			                }
			            },
			            data:result.listBW
			        }
			    ]
			};
		     myChart2.setOption(option2); 					
		}
	});
	}
	function queryCnsjlList(){
	 $.ajax({
		type: "post",
		url: basePath + "/zhnyMain/queryCnsjlList.action",
		data: "queryPara.date="+$("#date3").val(),
		dataType:"json",
		success: function(result)
			{
			 option3 = {
			 	title : {
					      text: '储能数据总览(kw/h)',
					      link:'http://172.16.145.71:7001/des/unitedView/goCheckApprovePage.action',
					      x:'center'
					    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['日充电量','日放电量'],
			         x : 'left'
			    },
			   
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : result.datelist
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel : {
			                formatter: '{value}万'
			            }
			        }
			    ],
			    series : [
			        {
			            name:'日充电量',
			            type:'line',
			            data:result.inlist
			        },
			        {
			            name:'日放电量',
			            type:'line',
			            data:result.outlist
			        }
			    ]
			};
		      myChart3.setOption(option3); 
	      }
		});
      }
      function queryYslAndYqlList(){
      $.ajax({
		type: "post",
		url: basePath + "/zhnyMain/queryYslAndYqlList.action",
		data: "queryPara.date="+$("#date4").val(),
		dataType:"json",
		success: function(result)
			{	
			 option4 = {
			 	title : {
					      text: '水气数据总览',
					      link: basePath +'pages/basicApp/threeMeterRead/main/threeMeterHomePage.jsp',
					      x:'center'
					    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['用水量','用气量'],
			        x : 'left'
			    },
			   
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : result.dateList
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'用水量',
			            type:'line',
			            data:result.yslList
			        },
			        {
			            name:'用气量',
			            type:'line',
			            data:result.yqlList
			        }
			    ]
			};
		      myChart4.setOption(option4); 
			}
		});
    }
    function   queryJtznhlList(){
       $.ajax({
		type: "post",
		url: basePath + "/zhnyMain/queryJtznhlList.action",
		data: "queryPara.date="+$("#date5").val(),
		dataType:"json",
		success: function(result)
			{
		     option5 = {
				    title : {
				        text: '家庭能耗总览(kw/h)',
				        link: basePath +'/capacityData/queryFqusList.action',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    calculable : true,
				    series : [
				        {
				            name:'访问来源',
				            type:'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:result.valueList
				        }
				    ]
				};
				myChart5.setOption(option5);	
			}
		});
	}
	
		function queryQynylList(){	
			 $.ajax({
					type: "post",
					url: basePath + "/zhnyMain/queryQynylList.action",
					dataType:"json",
					success: function(result){
						var areaSource = result.areaSource;
						var str = '';
						$.each(result.areaList, function (n, value) {
							str += '<div style="height: 35px;line-height: 35px;"><span>'+value.AREA_NAME+' '+value.COUNTNUM+'户</span></div>';
						});
						$('#view1').append(str);
						option6 = {
						    title : {
						        text: '区域能源数据总览',
						        x:'center'
						    },
						    tooltip : {
						        trigger: 'item',
						        formatter: "{a} <br/>{b} : {c} ({d}%)"
						    },
						    calculable : true,
						    series : [
						        {
						            name:'用电量',
						            type:'pie',
						            radius : '55%',
				            center: ['50%', '60%'],
						            data:areaSource
						        }
						    ]
						};
						myChart6.setOption(option6);
					}
			 });	
		}
	</script>
	
  </body>
</html>

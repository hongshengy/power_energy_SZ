<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
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
	String tg = request.getParameter("tgNo");
	SimpleDateFormat sdfFrom = new SimpleDateFormat("yyyy-MM-dd");
	
	String newDate = request.getParameter("date");
	Date day = sdfFrom.parse(newDate);
	Calendar calDay=Calendar.getInstance();
	
	calDay.setTime(day);
	calDay.set(calDay.DATE, calDay.getActualMinimum(calDay.DATE));
	// 月初
	String startDate = sdfFrom.format(calDay.getTime());
	
	calDay.setTime(day);
	calDay.set(calDay.DATE, calDay.getActualMaximum(calDay.DATE));
	// 月末
	String endDate = sdfFrom.format(calDay.getTime());
	String tgName = request.getParameter("tgName");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <base href="<%=basePath%>">
		<title><%=tgName%>台区峰谷差比图</title>
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

  </head>
  
  <body>
  	<div id='queryDiv'>
			<div style="width:100%;height:100%;align:center;" >
	                <table style="width:100%;height:100%;align:center;">
	                    <tbody>
	                    <tr>
	                    	<td style="width:5%"></td>
	                        <td style="width:20%">
	                                                起始日期：<input id="sdate" type="text" class="easyui-datebox"
													class="dateTime_style" style="height: 20px; width: 105px;"
													value="<%=startDate%>" />
                            </td>
                            <td style="width:20%">
	                            结束日期：<input id="edate" type="text" class="easyui-datebox"
													class="dateTime_style" style="height: 20px; width: 105px;"
													value="<%=endDate%>" />
                            </td>
                            <td style="width:20%">
	                            <div style="padding: 0px; text-align: left;">
			                    	<button class="easyui-linkbutton c1" onclick="query1()" style="width:50px;height: 30px;">查询</button>
			               	   	</div>
		               	   	</td>
                        </tr>
                         <td style="width:5%"></td>  
	                  </tbody>
	               </table>
	              
	            </div>
        </div>
    <div id="chart">
	<div id="ydgl-chart" style="height:80%;width:100%;"></div>
	</div>
  </body>
  <script type="text/javascript">
  	var mychart = echarts.init(document.getElementById('ydgl-chart'));
  	$(document).ready(function(){
  		var high = window.innerHeight;
	     $("body").height(document.body.clientHeight);
		 $("body").width(document.body.clientWidth);
		 $("#queryDiv").width(document.body.clientWidth);
		 $("#queryDiv").height(high*0.15);
		 $("#chart").height(high*0.84);
		 $("#chart").width(document.body.clientWidth);
		 $('#sdate').datebox('calendar').calendar({// 控制2个日历所选时间差在60天
		 	validator:function(date){
		 		var edate = $('#edate').val();	
				var eday1 = new Date(Date.parse(edate));
				var flag1 = (eday1.getTime()-date.getTime())/(1000*60*60*24);
				var flag = true;
				if(flag1<0 || flag1>60){
					flag = false;
				}
				return flag;
		 	}
		 });
		 $('#edate').datebox('calendar').calendar({// 控制2个日历所选时间差在60天
		 	validator:function(date){
		 		var sdate = $('#sdate').val();	
				var sday1 = new Date(Date.parse(sdate));
				var flag1 = (date.getTime()-sday1.getTime())/(1000*60*60*24);
				var flag = true;
				if(flag1<0 || flag1>60){
					flag = false;
				}
				return flag;
		 	}
		 });
		 
  		 loadchart();
  		 
  	})
  	
  	function query1(){
  		loadchart();
  	}
  	
  	function loadchart(){
	var sdate = $('#sdate').val();	
	var edate = $('#edate').val();
	var tg = "<%=tg%>";
	$.ajax({
		type: "post",
		url: "<%=basePath%>" + "capacityData/tgPeakValleyChart.action",
		data: "queryPara.sdate=" + sdate + "&queryPara.edate=" + edate + "&queryPara.tgNo=" + tg,
		dataType:"json",
		cache : false,
		async : true,//同步异步请求
		success: function(result)
		{	
			var X_DATA1 = result.name;
			var X_DATA2 = result.sdata;
			var maxValue = result.madata;
			var minValue = result.midata;
			var option = {
			legend: {
			        data:["峰谷差比"]
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
			    	var data = params.data;
			        return '峰谷差比:' + data + '<br/>' + '(最大负荷：' + maxValue[params.dataIndex] + ', 最小负荷：' + minValue[params.dataIndex] + ')';
			        }
			    },
			    
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : X_DATA1
			        }
			    ],
			    yAxis : [
			        {
			        	name : '单位(%)',
			            type : 'value',
			            axisLabel : {
			                formatter: '{value}'//'{value} °C'
			            }
			        }
			    ],
			    series : [
			        {
			            name:'峰谷差比',
			            type:'line',
			            radius : '65%',
         						center: ['50%', '80%'],
			            data: X_DATA2
			        }
			    ]
			};
			mychart.setOption(option);
		},
		error:function(e)
		{
			
		}
	});
}
  </script>
</html>

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
			loadLineInfo2(resultDay,$('#wnGrade').val());
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
	</script>
	
  </head>
  
  <body>
     <div class="main_div">
     	<div class="left_div">
     		<div class="left_roll_div">
     			<img id="leftBtn" src="<%=imagePath%>/pageFive/img_6.png">
     		</div>
     		<div class="content_div" style="margin-bottom:25px;">
     			<div id="chatList" style="-webkit-transform:translate(0px, -70px);-moz-transform:translate(0px, -70px);">
     				<div class="item_div" style="top:70px;left:0px;">
	     				<div class="top_div">
	     					<div class="title_div">
	     						<span>武进示范区用户统计图</span>
	     					</div>
	     					<div class="value_div">
	     						<span>（常驻人口：160万）</span>
	     					</div>
	     					<div class="chat_div" id="div_body_info1"></div>
	     				</div>
	     				
	     				
	     				<div class="bottom_div">
	     					<div class="title_div">
	     						<span>武进示范区负荷曲线图</span>
	     					</div>
	     					<table width="99" height="30px" class="text_table_style" style="float: right;position: absolute;right: 60px;margin-top: 10px;z-index:100;">
		    	    			<tbody>
		    	    				<tr>
		    	    					<td width="20px" height="100%">&nbsp;&nbsp;&nbsp;</td>
		    	    					<!-- <td>
		    	    						<fpus:ComboboxTree id="orgNo" hiddenName="orgNo" width="123" treeType="USER_ORG_SUO"></fpus:ComboboxTree>
			    						</td> -->
		    	    					<td>
		    	    						<span class="tools-labelgroup"> <input id="dates1"
														class="Wdate" type="text"
														style="width: 100px; text-align: left;"
														onClick="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true})"
														value="<%=mon%>" /> </span>
		    	    					</td>
		    	    					<td>
											<button class="easyui-linkbutton c1" onclick="query1()"
												style="width: 50px; height: 30px" align="left">
												统计
											</button>
										</td>
		    	    				</tr>
		    	    			</tbody>
		    	    		</table>
	     					<div class="chat_div" id="div_body_info2"></div>
	     				</div>
	     				
	     				
	     			</div>
	     			<div class="item_div" style="top:70px;left:685px;">
	     				<div class="top_div">
	     				<div class="title_div">
	     						<span>金鸡湖示范区用户统计图</span>
	     					</div>
	     					<div class="value_div">
	     						<span>（常驻人口：78万）</span>
	     					</div>
	     					
	     					<div class="chat_div" id="div_body_info3"></div>	
	     				</div>
	     				<div class="bottom_div">
	     					<div class="title_div">
	     						<span>苏州园区负荷曲线图</span>
	     					</div>
	     					<table width="99" height="30px" class="text_table_style" style="float: right;position: absolute;right: 60px;margin-top: 10px;z-index:100;">
		    	    			<tbody>
		    	    				<tr>
		    	    					<td width="30px" height="100%">&nbsp;&nbsp;&nbsp;</td>
		    	    					<!-- <td>
		    	    						<fpus:ComboboxTree id="orgNo1" hiddenName="orgNo1" width="123" treeType="USER_ORG_SUO"></fpus:ComboboxTree>
			    						</td> -->
		    	    					<td>
		    	    						<span class="tools-labelgroup"> <input id="dates2"
														class="Wdate" type="text"
														style="width: 100px; text-align: left;"
														onClick="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true})"
														value="<%=mon%>" /> </span>
		    	    					</td>
		    	    					<td>
											<button class="easyui-linkbutton c1" onclick="query2()"
												style="width: 50px; height: 30px" align="left">
												统计
											</button>
										</td>
		    	    				</tr>
		    	    			</tbody>
		    	    		</table>
	     					<div class="chat_div" id="div_body_info4"></div>
	     				</div>
	     			</div>
     			</div>
     		</div>
     		<div class="right_roll_div">
     			<img id="rightBtn" src="<%=imagePath%>/pageFive/img_7.png">
     		</div>
     	</div>
     	<div class="right_div">
     		<div class="content_1">
     			江苏省苏州环金鸡湖地区和常州武进地区，两个示范区各有特色，分属国家发改委首批需求侧管理试点城市和江苏省智慧能源示范区，示范区累计常驻人口238万，互动家庭用户11万户
     		</div>
     		<div class="content_1">
     			常州武进示范区常驻人口160万，含大工业用户590户，一般商业用户21755户，居民用户53万户。目前区内电力宽带载波和“智能生活”APP正在全面推广，智能小区正在大规模建设。该示范区拟选取家庭用户3.9万户，发展负荷聚合商7家
     		</div>
     		<div class="content_1">
     		苏州环金鸡湖地区常驻人口78万，含大工业用户1420户，一般商业用户32437户，居民用户35.26万户，实现了光纤和4G专网等通信网全覆盖。该示范区拟选取家庭用户7.1万户，发展负荷聚合商15家
     		</div>
     	</div>
     </div>
	 <script src="<%=jsPath%>/zhny_pageFive.js"></script>
  </body>
</html>

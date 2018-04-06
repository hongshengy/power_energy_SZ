<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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
	Calendar calDay = Calendar.getInstance();
	calDay.add(Calendar.DAY_OF_MONTH, -29);
	String preDay = sdfFrom.format(calDay.getTime());
	// 当天
	Date newDate = DatabaseUtil.getSysDate();
	String today = sdfFrom.format(newDate);

	// 当月
	String mon = sdf.format(newDate);

	Calendar calDay1 = Calendar.getInstance();
	calDay1.add(Calendar.DAY_OF_MONTH, -1);
	String lastDay = sdfFrom.format(calDay1.getTime());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>非侵入式负荷终端数据概览</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
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
	<body style=" overflow: auto;overflow-x:hidden; overflow-y:hidden;">
	<div id="mainDiv" style=" overflow: auto;overflow-x:hidden; ">
     <table id="maintable" class="maintable">
      <tr >
      	<td width="50%" style="border-right:1px solid">
      		<span class="tools-labelgroup" style="float:right;margin-right:10px;"> 
		     		<input id="startDay3" type="text" class="easyui-datebox"
					class="dateTime_style" style="height: 25px; width: 105px;"
					value="<%=today%>" />
		<button class="easyui-linkbutton c1" onclick="query1()"
													style="width: 50px; height: 30px" align="left">
													统计
												</button>
			</span>
		</td> 
		
		<td width="50%">
			<span class="tools-labelgroup" style="float:right;margin-right:10px;"> 
					 <input id="startDay5"
					class="Wdate" type="text"
					style="height: 25px; width: 105px;text-align: left;"
					onFocus="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true})"
					value="<%=mon%>" /> 
					<button class="easyui-linkbutton c1" onclick="query3()"
													style="width: 50px; height: 30px" align="left">
													统计
												</button>
			</span>
		 </td>
      </tr>
	     <tr>
		     <td style="border-bottom:1px solid ;border-right:1px solid">
		     	<div id="div_body_info1" class="chat" style="height: 450px;width:670px;"></div>
		     </td>
		     <td style="border-bottom:1px solid ;">
		     	<div class="chat" id="div_body_info3" style="height: 450px;width:670px;"></div>
		     </td>
	     </tr>
	      <tr>
	      	<td style="border-right:1px solid">
	      	<select name="electrical" id="electrical" class="easyui-combobox">
													<option value="请选择" selected="selected">--请选择用电器--</option>
													<c:forEach items="${codeList}" var="elec">
														<option value="${elec.codeVal}">${elec.codeName}</option>
													</c:forEach>
												</select>
			     		<input id="startDay4" type="text" class="easyui-datebox"
													class="dateTime_style" style="height: 25px; width: 105px;"
													value="<%=today%>" />
													<button class="easyui-linkbutton c1" onclick="query2()"
													style="width: 50px; height: 30px" align="left">
													统计
												</button>
			
			</td> 
			<td>
				<select name="electrical1" id="electrical1" class="easyui-combobox">
													<option value="请选择" selected="selected">--请选择用电器--</option>
													<c:forEach items="${codeList}" var="elec">
														<option value="${elec.codeVal}">${elec.codeName}</option>
													</c:forEach>
												</select>
												 <input id="startDay6"
														class="Wdate" type="text"
														style="height: 25px; width: 105px;text-align: left;"
														onFocus="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true})"
														value="<%=mon%>" /> 
														<button class="easyui-linkbutton c1" onclick="query4()"
													style="width: 50px; height: 30px" align="left">
													统计
												</button>
														<td>
												
											</td>
			 </td>
	      </tr>
    	 <tr >
		     <td style="border-bottom:1px solid ;border-right:1px solid">
		     	
		     	<div class="chat" id="div_body_info2" style="height: 350px;width:670px;"></div>
		     </td>
		     <td style="border-bottom:1px solid ;">
				<div class="chat" id="div_body_info4" style="height: 350px;width:670px;"></div>
			 </td>
	     </tr>
     </table>
     </div>
		
		<script src="<%=jsPath%>/zhnyDataPicShow.js"></script>
		<script type="text/javascript">
		$("#maintable").width(window.screen.availWidth-20);
		$("#mainDiv").height(window.screen.availHeight-200);
	 </script>
	</body>
</html>

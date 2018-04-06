<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>

<%
	String baseUrl  = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages";	


	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ baseUrl + "/";
	
    SimpleDateFormat sdfFrom = new SimpleDateFormat("yyyy-MM-dd");
    // 默认上月
    Calendar calDay=Calendar.getInstance();
	calDay.add(Calendar.DAY_OF_MONTH,-29);
	String preDay=sdfFrom.format(calDay.getTime());
	// 当天
	Date newDate = DatabaseUtil.getSysDate();
	String today = sdfFrom.format(newDate);
	
    Calendar calDay1=Calendar.getInstance();
	calDay1.add(Calendar.DAY_OF_MONTH,-1);
	String lastDay=sdfFrom.format(calDay1.getTime());
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
	
	<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/color.css">
	<link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/css/common.css">
	<script type="text/javascript" src="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=baseUrl %>/pages/areaEnergy/common/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
	<script type="text/javascript" src="<%=baseUrl %>/js/json2.js"></script>
	
	<%--<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include> --%>
    <script type="text/javascript" src="<%=pagePath %>/common/echarts/echarts.min.js"></script>
    
    
    
    <script type="text/javascript" src="<%=baseUrl %>/js/util/Util.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/common/js/dateUtil.js"></script>
    
	<style type="text/css">
		
		*{
			margin: 0px 0px;
			padding: 0px 0px;
			border: none;
			
		}
		
		.title_div{
			width: 100%;
			height: 90px;
			/**border: solid 1px;**/
			text-align: center;
		}
		.left_div{
			text-align: center;
			float: left;
			width: 24%;
			height: 100%;
			border: solid 1px;
			background-color: #2EAD4B;
		}
		.center_div{
			text-align: center;
			float: left;
			width: 25%;
			height: 100%;
			border: solid 1px;
			background-color: #822793;
		}
		.center_div1{
			text-align: center;
			float: left;
			width: 24.7%;
			height: 100%;
			border: solid 1px;
			background-color: #E84B00;
		}
		.right_div{
			text-align: center;
			float: left;
			width: 25%;
			height: 100%;
			border: solid 1px;
			background-color: #258A8E;
		}
		.class_padding{
			margin-left: 2px;
		}
		.width_color{
			color: white;
		}
		.body_div_start_one{
			height: 450px;
			width: 100%;
			border: none;
		}
		.text_table_style{
			font-size: 14px;
			color: #777; 
			font-weight: bold;
		}
		.div_body_info{
			/**background-color: gray;**/
			overflow: hidden;
		}
		
		
		
		
		.left_div_1{
			background-color: #2EAD4B;
			color: white;
			font-size: 25px;
		}
		.left_div_2{
			background-color: #822793;
			color: white;
			font-size: 25px;
		}
		.left_div_3{
			background-color: #E84B00;
			color: white;
			font-size: 23px;
		}
		.left_div_4{
			background-color: #258A8E;
			color: white;
			font-size: 25px;
		}
	</style>
	
	<script type="text/javascript">
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
	<body style="overflow:hidden;" scroll="no">   
	    <div class="easyui-panel" style="width:100%;border: none;overflow-x: hidden;" id="bodyDivClass" scroll="no">
	    	<!-- <div class="easyui-panel title_div" id="body_father_div_tx" style="overflow: hidden;">
	    		<div class="left_div class_padding">
	    			<div class="height_div_empty"></div>
	    			<h2 id="title_ydfh" class="width_color">用电负荷：-- kW</h2>
	    		</div>
	    		<div class="center_div class_padding">
	    			<div class="height_div_empty"></div>
	    			<h2 id="title_cxfh" class="width_color">出线负荷：-- kW</h2>
	    		</div>
	    		<div class="center_div1 class_padding">
	    			<div class="height_div_empty"></div>
	    			<h2 id="title_cxfh1" class="width_color">终端在线率：-- %（--/--）</h2>
	    		</div>
	    		<div class="right_div class_padding">
	    			<div class="height_div_empty"></div>
	            	<h2 id="title_qw" class="width_color">气温：-- °C</h2>
	    		</div>
	    	</div> -->
	    	
	    	<table width="100%">
		    	<tr>
		    		<td height="95px" align="center" width="33.33%" class="left_div_1">
		    			<b id="title_ydfh">用电负荷：-- kW</b>
		    		</td>
		    		<!-- <td height="95px" align="center" width="33.33%" class="left_div_2">
		    			<b id="title_cxfh">出线负荷：-- kW</b>
		    		</td> -->
		    		<td height="95px" align="center" width="33.33%" class="left_div_3">
		    			<b id="title_cxfh1">终端在线率：-- %（--/--）</b>
		    		</td>
		    		<td height="95px" align="center" width="33.33%" class="left_div_4">
		    			<b id="title_qw">气温：-- °C</b>
		    		</td>
		    	</tr>
		    </table>
	    	<!-- 
	    	<div class="easyui-panel body_div_start_one" id="body_div_start_one1" style="overflow: hidden;">
	    	
	    		
    	    	<div style="height: 100%;width: 49.9%;float: left;">
    	    		<div style="height: 30px;width: 100%;padding-left: 10px;line-height: 30px;
    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
    	    		font-size: 12px;font-weight: bold;text-align: left;">
    	    			负荷曲线
    	    		</div>
    	    		<table width="99" height="30px" class="text_table_style" style="">
    	    			<tbody>
    	    				<tr>
    	    					<td width="20px" height="100%">&nbsp;&nbsp;&nbsp;</td>
    	    					<td>
    	    						<a onclick="" id="button_query" href="javascript:qytQueryOveride('-1');" class=""
				    				style="" 
				    				 plain>
				    				 <img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif">
				    				 </a>
	    						</td>
    	    					<td>
    	    						<input id="startDay3" type="text" class="easyui-datebox"
	    							class="dateTime_style" style="height: 25px;width: 105px;"
	    							value="<%=today %>" />
    	    					</td>
    	    					<td >
    	    						<a onclick="" id="button_query" href="javascript:qytQueryOveride('1');" class=""
				    				style="" 
				    				 >
				    				 <img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif">
				    				 </a>
    	    					</td>
    	    					<td>
    	    						<select class="easyui-combobox wnGrade" id="wnGrade" 
    	    						data-options="width:200,prompt:'请选择',panelHeight:'auto',editable:false"
    	    						style="width: 75px;height: 26px;">
    	    							<option value="0">请选择</option>
    	    							<option value="1440">1440点</option>
    	    							<option value="288" selected="selected">288点</option>
    	    							<option value="144">144点</option>
    	    							<option value="96">96点</option>
    	    							<option value="48">48点</option>
    	    							<option value="24">24点</option>
    	    						</select>
    	    					</td>
   	    						<td width="50%" >
    	    					</td>
    	    				</tr>
    	    			</tbody>
    	    		</table>
    	    		<div class="div_body_info" id="div_body_info2" style="width: 99%;height: 85%;">
	    			</div>
	    	    </div>
    	    	
    	    	<div style="height: 100%;width: 50%;float: right;">
	    	    	<div style="height: 30px;width: 100%;padding-left: 10px;line-height: 30px;
    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
    	    		font-size: 12px;font-weight: bold;text-align: left;">
    	    			用户分布
    	    		</div>
    	    		<div class="div_body_info" id="div_body_info3" style="width: 99%;height: 85%;">
	    			</div>
    	    	</div>
	    		
	    	</div> -->
	    	
	    	<table width="100%" height="100%" class="body_div_start_one">
	    		<tr>
	    			<td width="50%" height="100%" >
	    				<div style="height: 100%;width:100%;">
		    	    		<div style="height: 30px;line-height: 30px;
		    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
		    	    		font-size: 12px;font-weight: bold;">
		    	    			&nbsp;&nbsp;&nbsp;负荷曲线
		    	    		</div>
		    	    		<table width="99" height="30px" class="text_table_style" style="">
		    	    			<tbody>
		    	    				<tr>
		    	    					<td width="20px" height="100%">&nbsp;&nbsp;&nbsp;</td>
		    	    					<td>
		    	    						<a onclick="" id="button_query" href="javascript:qytQueryOveride('-1');" class=""
						    				style="" 
						    				 plain>
						    				 <img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif">
						    				 </a>
			    						</td>
		    	    					<td>
		    	    						<input id="startDay3" type="text" class="easyui-datebox"
			    							class="dateTime_style" style="height: 25px;width: 105px;"
			    							value="<%=today %>" />
		    	    					</td>
		    	    					<td >
		    	    						<a onclick="" id="button_query" href="javascript:qytQueryOveride('1');" class=""
						    				style="" 
						    				 >
						    				 <img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif">
						    				 </a>
		    	    					</td>
		    	    					<td>
		    	    						<select class="easyui-combobox wnGrade" id="wnGrade" 
		    	    						data-options="width:200,prompt:'请选择',panelHeight:'auto',editable:false"
		    	    						style="width: 75px;height: 26px;">
		    	    							<option value="0">请选择</option>
		    	    							<option value="1440">1440点</option>
		    	    							<option value="288" selected="selected">288点</option>
		    	    							<option value="144">144点</option>
		    	    							<option value="96">96点</option>
		    	    							<option value="48">48点</option>
		    	    							<option value="24">24点</option>
		    	    						</select>
		    	    					</td>
		    	    				</tr>
		    	    			</tbody>
		    	    		</table>
		    	    		<div class="div_body_info" id="div_body_info2" style="height: 86%;width: 100%;">
			    			</div>
	    				</div>
	    			</td>
	    			
	    			<td width="50%" height="100%" >
	    				<div style="height: 100%;width:100%;">
	    					<div style="height: 30px;line-height: 30px;
		    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
		    	    		font-size: 12px;font-weight: bold;">
		    	    			&nbsp;&nbsp;&nbsp;用户分布
		    	    		</div>
		    	    		<div class="div_body_info" id="div_body_info3" style="height: 93%;width: 100%;">
			    			</div>
	    				</div>
	    			</td>
	    		</tr>
	    	</table>
	    	
	    	<table width="100%" height="100%" class="body_div_start_one">
	    		<tr>
	    			<td width="50%" height="100%" >
	    				<div style="height: 100%;width:100%;">
		    	    		<div style="height: 30px;line-height: 30px;
		    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
		    	    		font-size: 12px;font-weight: bold;">
		    	    			&nbsp;&nbsp;&nbsp;区域电量
		    	    		</div>
		    	    		<table width="99" height="30px" class="text_table_style">
		    	    			<tbody>
		    	    				<tr>
		    	    					<td width="20px" height="100%">&nbsp;&nbsp;&nbsp;</td>
		    	    					<td>
		    	    						<input id="startDay1" type="text" class="easyui-datebox"
			    							class="dateTime_style" style="height: 25px;width: 105px;"
			    							value="<%=preDay %>" />
			    						</td>
		    	    					<td>
		    	    						至
		    	    					</td>
		    	    					<td >
		    	    						<input id="endDay1" type="text" class="easyui-datebox"
			    							class="dateTime_style" style="height: 25px;width: 105px;"
			    							value="<%=today %>" />
		    	    					</td>
		    	    					<td>
		    	    						<a onclick="" id="button_query" href="javascript:timeQueryLoad();" class="easyui-linkbutton"
						    				style="height: 25px;width: 40px;" 
						    				 plain>查询</a>
		    	    					</td>
		    	    					<td width="38%" >
		    	    					</td>
		    	    				</tr>
		    	    			</tbody>
		    	    		</table>
		    	    		<div class="div_body_info" id="div_body_info" style="width: 100%;height: 85%;">
			    			</div>
	    				</div>
	    			</td>
	    			
	    			<td width="50%" height="100%" >
	    				<div style="height: 100%;width:100%;">
	    					<div style="height: 30px;line-height: 30px;
		    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
		    	    		font-size: 12px;font-weight: bold;">
		    	    			&nbsp;&nbsp;&nbsp;电量分布
		    	    		</div>
		    	    		<table width="99" height="30px" class="text_table_style">
		    	    			<tbody>
		    	    				<tr>
		    	    					<td width="20px" height="100%">&nbsp;&nbsp;&nbsp;</td>
		    	    					<td>
		    	    						<a onclick="qytQuery('-1');" id="button_query" href="javascript:void(0);" class=""
						    				style="" 
						    				 plain>
						    				 <img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif">
						    				 </a>
			    						</td>
		    	    					<td>
		    	    						<input id="startDay2" type="text" class="easyui-datebox"
			    							class="dateTime_style" style="height: 25px;width: 105px;"
			    							value="<%=lastDay %>" />
		    	    					</td>
		    	    					<td >
		    	    						<a onclick="qytQuery('1');" id="button_query" href="javascript:void(0);" class=""
						    				style="" 
						    				 plain>
						    				 <img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif">
						    				 </a>
		    	    					</td>
		    	    					<td>
		    	    					</td>
		    	    					<td width="55%" >
		    	    					</td>
		    	    				</tr>
		    	    			</tbody>
		    	    		</table>
		    	    		<div class="div_body_info" id="div_body_info1" style="width: 100%;height: 85%;">
		    				</div>
	    				</div>
	    			</td>
	    		</tr>
	    	</table>
	    	
	    	<!-- 
	    	<div class="easyui-panel body_div_start_one" id="body_div_start_one" style="overflow: hidden;">
	    	
	    		
    	    	<div style="height: 100%;width: 49.9%;float: left;">
    	    		<div style="height: 30px;width: 100%;padding-left: 10px;line-height: 30px;
    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
    	    		font-size: 12px;font-weight: bold;text-align: left;">
    	    			区域电量
    	    		</div>
    	    		<table width="99" height="30px" class="text_table_style">
    	    			<tbody>
    	    				<tr>
    	    					<td width="20px" height="100%">&nbsp;&nbsp;&nbsp;</td>
    	    					<td>
    	    						<input id="startDay1" type="text" class="easyui-datebox"
	    							class="dateTime_style" style="height: 25px;width: 105px;"
	    							value="<%=preDay %>" />
	    						</td>
    	    					<td>
    	    						至
    	    					</td>
    	    					<td >
    	    						<input id="endDay1" type="text" class="easyui-datebox"
	    							class="dateTime_style" style="height: 25px;width: 105px;"
	    							value="<%=today %>" />
    	    					</td>
    	    					<td>
    	    						<a onclick="" id="button_query" href="javascript:timeQueryLoad();" class="easyui-linkbutton"
				    				style="height: 25px;width: 40px;" 
				    				 plain>查询</a>
    	    					</td>
    	    					<td width="38%" >
    	    					</td>
    	    				</tr>
    	    			</tbody>
    	    		</table>
    	    		<div class="div_body_info" id="div_body_info" style="width: 99%;height: 85%;">
	    			</div>
	    	    </div>
    	    	
    	    	<div style="height: 100%;width: 50%;float: right;">
	    	    	<div style="height: 30px;width: 100%;padding-left: 10px;line-height: 30px;
    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
    	    		font-size: 12px;font-weight: bold;text-align: left;">
    	    			电量分布
    	    		</div>
    	    		<table width="99" height="30px" class="text_table_style">
    	    			<tbody>
    	    				<tr>
    	    					<td width="20px" height="100%">&nbsp;&nbsp;&nbsp;</td>
    	    					<td>
    	    						<a onclick="qytQuery('-1');" id="button_query" href="javascript:void(0);" class=""
				    				style="" 
				    				 plain>
				    				 <img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif">
				    				 </a>
	    						</td>
    	    					<td>
    	    						<input id="startDay2" type="text" class="easyui-datebox"
	    							class="dateTime_style" style="height: 25px;width: 105px;"
	    							value="<%=lastDay %>" />
    	    					</td>
    	    					<td >
    	    						<a onclick="qytQuery('1');" id="button_query" href="javascript:void(0);" class=""
				    				style="" 
				    				 plain>
				    				 <img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif">
				    				 </a>
    	    					</td>
    	    					<td>
    	    					</td>
    	    					<td width="55%" >
    	    					</td>
    	    				</tr>
    	    			</tbody>
    	    		</table>
    	    		<div class="div_body_info" id="div_body_info1" style="width: 99%;height: 85%;">
	    			</div>
    	    	</div>
	    		
	    	</div>
	    	 -->
	    	 
	    	<table width="100%" height="100%" class="body_div_start_one">
	    		<tr>
	    			<td width="50%" height="100%" >
	    				<div style="height: 100%;width:100%;">
		    	    		<div style="height: 30px;line-height: 30px;
		    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
		    	    		font-size: 12px;font-weight: bold;">
		    	    			&nbsp;&nbsp;&nbsp;设备工况
		    	    		</div>
		    	    		<div class="div_body_info" id="div_body_info14" style="width: 100%;height: 85%;">
	    					</div>
	    				</div>
	    			</td>
	    			
	    			<td width="50%" height="100%" >
	    				<div style="height: 100%;width:100%;">
	    					<div style="height: 30px;line-height: 30px;
		    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
		    	    		font-size: 12px;font-weight: bold;">
		    	    			&nbsp;&nbsp;&nbsp;测点分布
		    	    		</div>
		    	    		<div class="div_body_info" id="div_body_info13" style="width: 100%;height: 85%;">
	    					</div>
	    				</div>
	    			</td>
	    		</tr>
	    	</table>
	    	 
	    	 
	    	<!-- 
	    	<div class="easyui-panel body_div_start_one" id="body_div_start_one" style="overflow: hidden;">
	    	
	    		<div style="height: 100%;width: 50%;float: left;">
	    	    	<div style="height: 30px;width: 100%;padding-left: 10px;line-height: 30px;
    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
    	    		font-size: 12px;font-weight: bold;text-align: left;">
    	    			设备工况
    	    		</div>
    	    		<div class="div_body_info" id="div_body_info14" style="width: 99%;height: 85%;">
	    			</div>
    	    	</div>
	    	
	    		<div style="height: 100%;width: 50%;float: right;">
	    	    	<div style="height: 30px;width: 100%;padding-left: 10px;line-height: 30px;
    	    		background-color: #f1f1f1;color: #777;font-family: 'Verdana', '宋体', Serif;
    	    		font-size: 12px;font-weight: bold;text-align: left;">
    	    			测点分布
    	    		</div>
    	    		<div class="div_body_info" id="div_body_info13" style="width: 99%;height: 85%;">
	    			</div>
    	    	</div>
	    	</div>
	    	 -->
	    	
	    </div>  
	</body> 
	
	<script type="text/javascript">
	
		var myChart1;
		var myChart2;
		var myChart3;
		var myChart4;
		var myChart5;
		var myChart6;
		var moren1Start = 60000;//10000=10秒 默认是1分钟的
		var moren2Start = 300000;//10000=10秒 默认是1分钟的 1分钟60秒就是6W
		var indexCount = 0;
		$(document).ready(function(){
			//设置顶部剧中
			var isIE = navigator.userAgent.toUpperCase().indexOf("MSIE");
       		if(isIE == '-1' ||isIE == -1){
       			//alert(122);
       		}
       		
       		$('#bodyDivClass').height(document.body.clientHeight);
			/**var titleLineHeight = $('#body_father_div_tx')[0].clientHeight;
			var titleStyleOne = $('#title_ydfh')[0].offsetHeight;
			titleLineHeight = (titleLineHeight-titleStyleOne)/2;
			$('.height_div_empty').height(titleLineHeight);**/
			//剧中结束
			/**
			var div_body_info_height = $('.div_body_info')[0].parentElement.clientHeight;
			$('.div_body_info').height(div_body_info_height-30);
			$('.div_body_info3').height(div_body_info_height);**/
			
			loadMyChartInfo();
			loadLIneBar();
			
			
			loadMethod();
			loadTimeDate();
			setInterval("testTime()",moren1Start);
			setInterval("testTime2()",moren2Start);
		});
		
		function testTime(){
			loadData();
		}
		function testTime2(){
			//获得时间
			//获得选择项
			var dateTime = $('#startDay3').val();
			var selVal = $('#wnGrade').val();
			loadLineInfo(dateTime,selVal)
		}
		
		function loadTimeDate() {
            
            var d = [];
            var len = 0;
            var now = new Date();
            var value;
            while (len++ < 288) {
                d.push([
                    new Date(2017, 9, 1, 0, len * 10000),
                    (Math.random()*30).toFixed(2) - 0,
                    (Math.random()*100).toFixed(2) - 0
                ]);
            }
            
            return d;
        }
		
		function loadMethod(){
			$('#wnGrade').combobox({
				onSelect: function(param){
					var startDay2 = $('#startDay3').val();
					loadLineInfo(startDay2,param.value);
				}
			});
			
			$('#startDay3').datebox({
			    onSelect: function(date){
			        var dataValue = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			        loadLineInfo(dataValue,$('#wnGrade').val());
			    }
			});
			
			$('#startDay2').datebox({
			    onSelect: function(date){
			        var dataValue = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			        loadDlfbPie(dataValue);
			    }
			});
			
			/**$('#startDay3').datebox({
				disabled: true
			});
			$('#startDay2').datebox({
				disabled: true
			});**/
			

			
		}
		
		function loadMyChartInfo(){
			myChart1 = echarts.init(document.getElementById('div_body_info'));
			myChart2 = echarts.init(document.getElementById('div_body_info1'));
			myChart3 = echarts.init(document.getElementById('div_body_info2'));
			myChart4 = echarts.init(document.getElementById('div_body_info3'));
			myChart5 = echarts.init(document.getElementById('div_body_info13'));
			myChart6 = echarts.init(document.getElementById('div_body_info14'));
			
		}
		function loadingDh(){
			
		}
		/**
		$(window).resize(function(){
		});**/
		function loadLIneBar(){
			loadQydlBar();
			loadDlfbPie("");
			loadyhfbPie();
			loadLineInfo("","");
			
			loadData();
			//测点分布统计图
			cdfbtjt();
			//设备工况
			shebeigongkuangLoad();
		}
		
		
		
		function cdfbtjt(){
			
			var legendData13 = new Array();
			var seriesData13 = new Array();
			var X_COUNT = 0;
			
			loadyhfbPieData();
			if(X_COUNT == 0){
				option = {};
			}else{
				var option = {
				    title : {
				        text: '测点分布统计图\n\n测点总数: '+X_COUNT+'',
				        //subtext: '纯属虚构',
				        x:'center',
				        padding:45
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c}"
				    },
				    legend: {
				        //orient : 'vertical',
				        x : 'center',
				        y : 'bottom',
				        padding:5,
				        data : legendData//['220kV','110kV','35kV','20kV','10kV']
				    },
	  				grid: {},
				    calculable : true,
				    series : [
				        {
				            name:'测点分布',
				            type:'pie',
				            radius : '50%',
				            center: ['50%', '60%'],
				            
				            itemStyle : 
				          	{ 
				              normal: {
				              	label : {
				              		textStyle:{
						            	fontSize: 18
						            	//,color: '#400080'
						            },
				                	show: true, position: 'outer',
				                  	formatter:function (params) {
					                    var res = params.data.name+': ';
					                    res+=''+params.value;
					                    //res+='     ('+params.percent+'%)';
					                    return res;
				                  	}
				              	},
				                labelLine:{show:true}
				              }
				            },
				            data : seriesData
				            /**[
				                {value:335, name:'220kV'},
				                {value:310, name:'110kV'},
				                {value:234, name:'35kV'},
				                {value:135, name:'20kV'},
				                {value:1548, name:'10kV'}
				            ]**/
				        }
				    ]
				};
			}
			myChart5.setOption(option);
			
			function loadyhfbPieData(){
				$.ajax({
					type: "post",
					url: "<%=basePath%>/homeFirstPageAction/cdfbtjbtQuery.action",
					data: "",
					dataType:"json",
					cache : false,
					async : false,//同步异步请求
					success: function(result)
					{	
						//
						legendData = result.X_NAME;
						seriesData = result.X_DATA;
						X_COUNT = result.X_SUM;
						
					},
					error:function(e)
					{
					}
				});
			}
		}
		
		function loadPageAllData(){
			startDay1
		}
		
		function loadQydlBar(){
			var X_NAME = new Array();
			var X_NAME_DATA = new Array();
			var X_DATA = new Array();
			loadQydlBarByXZhou();
			
			var option = {
			  	title : {
			      text: '区域企业总用电量 kWh',
			      x:'center'
			    },
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    legend: {
			    	x:'center',
			    	padding:33,
			        data:['总用电量']
			    },
			    grid: {x2:20},
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            axisTick : true,
			            data : X_NAME//['周一','周二','周三','周四','周五','周六','周日']
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'总用电量',
			            type:'bar',
			            data:X_DATA//[320, 332, 301, 334, 390, 330, 320]
			        }
			    ]
			};
			
			
			
			myChart1.setOption(option);
			
			myChart1.on("click", function (param) {
				//
				//alert(X_NAME_DATA[param.dataIndex]);
				//$('#startDay2').val(X_NAME_DATA[param.dataIndex]);
				$('#startDay2').datebox('setValue',X_NAME_DATA[param.dataIndex]);
				//document.getElementById("startDay2").value = ;
				//alert($('#startDay2').val());
				loadDlfbPie(X_NAME_DATA[param.dataIndex]);
			});
			
			function loadQydlBarByXZhou(){
				var startDay1 = $('#startDay1').val();
				var endDay1 = $('#endDay1').val();
				$.ajax({
					type: "post",
					url: "<%=basePath%>/homeFirstPageAction/loadQydlBar.action",
					data: "queryPara.startDay=" + startDay1 + "&queryPara.endDay=" + endDay1,
					dataType:"json",
					cache : false,
					async : false,//同步异步请求
					success: function(result)
					{	
						//
						X_NAME = result.X_NAME;
						X_NAME_DATA = result.X_NAME_DATA;
						X_DATA = result.X_DATA;
					},
					error:function(e)
					{
						
					}
				});
			}
		}
		
		function loadData(){
			$.ajax({
				type: "post",
				url: "<%=basePath%>/homeFirstPageAction/queryTitleHeatcur.action",
				data: "",
				dataType:"json",
				cache : false,
				async : false,//同步异步请求
				success: function(result)
				{	
					//
					$("#title_ydfh").html("用电负荷: " + result.USE_LOAD + " kW");
					//$("#title_cxfh").html("出线负荷: " + result.OUT_LOAD + " kW");
					$("#title_qw").html("气温: " + result.HEATCUR + " °C");
					$("#title_cxfh1").html("终端在线率： " + result.TEROL_ROD + " %(" 
					+ result.OL_COUNT +" / " + result.TER_COUNT + ")");
					
					
				},
				error:function(e)
				{
					
				}
			});
		}
		/**测试专用 随机数生成**/
		function getRandomNum(){
			var Range = 100-1;
			var Rand = Math.random();
			return (1+Math.round(Rand * Range));
		}
		
		function loadDlfbPie(X_NAME_DATA){
			//alert(X_NAME_DATA);
			var legendData = new Array();
			var seriesData = new Array();
			var option;
			//alert(X_NAME_DATA);
			
			if(X_NAME_DATA.length <= 0){
				loadDataNew();
			}else{
				loadDataOverideNew(X_NAME_DATA);
			}
			if(legendData == null || seriesData == null){
				option = {
				    title : {
				        text: '用户日用电 kWh TOP10',
				      x:'center'
				    },
				    tooltip : {
				        trigger: 'axis',
				      	formatter: function (params,ticket,callback) {
				            //console.log(params)
				            //var res = '总用电量 :';
				            //res+='<br/>'+params[0].value;
				          	//res+='<br/>'+params[0].data.name+':';
	          				//res+=''+params[0].value;
				          	
				          	
				            return null;
				        }
				    },
				    legend: {
				        data:[]
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'value',
				            boundaryGap : [0, 0.01]
				        }
				    ],
				    yAxis : [
				        {
				            type : 'category',
				            data : []//legendData
				            //['10','9','8','7','6','5','4','3','2','1']
				        }
				    ],
				    series : [
				        {
				            //name:'2011年',
				            type:'bar',
				          	itemStyle : { normal: {label : {show: true, position: 'inside',formatter:function (params) {
	            //console.log(params)
	            var res = params.data.name+':';
	          	res+=''+params.value;
	            return res;
	        }}}},
				            data:[]//seriesData
				            //[118203,218203,318203,418203,518203,618203,718203,{name:'9158用户',value: '818203'},918203,1018203]
				        }
				    ]
				};
			}else{
				
				option = {
				    title : {
				        text: '用户日用电 kWh TOP10',
				      	x:'center'
				    },
				    tooltip : {
				        trigger: 'axis',
				      	formatter: function (params,ticket,callback) {
				            //console.log(params)
				            var res = '用户日用电 :';
				            //res+='<br/>'+params[0].value;
				          	res+='<br/>'+params[0].data.name+':';
				          	res+=''+params[0].value;
				            return res;
				        }
				    },
				    legend: {
				        data:[]
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'value',
				            boundaryGap : [0, 0.01]
				        }
				    ],
				    yAxis : [
				        {
				            type : 'category',
				            data : legendData
				            //data : ['10','9','8','7','6','5','4','3','2','1']
				        }
				    ],
				    series : [
				        {
				            //name:'2011年',
				            type:'bar',
				            itemStyle : { normal: {label : {
				                show: true, textStyle:{
				                fontSize: 14
				              //,color: '#400080'
				            },
						    position: 'inside',
						    formatter:function (params) {
					            //console.log(params)
					            var res = params.data.name+': ';
					          	res+=''+params.value;
					            return res;
					        }}}},
					        data:seriesData
				            //data:[118203,218203,318203,418203,518203,618203,718203,{name:'9158用户',value: '818203'},918203,1018203]
				        }
				    ]
				};
			}
			
			
			
			
			myChart2.setOption(option);
			
			function loadDataNew(){
				var DATE_TIME = $('#startDay2').val();
				$.ajax({
					type: "post",
					url: "<%=basePath%>/homeFirstPageAction/loadDlfbPieOveride.action",
					data: "queryPara.DATE_TIME=" + DATE_TIME,
					dataType:"json",
					cache : false,
					async : false,//同步异步请求
					success: function(result)
					{	
						legendData = result.X_NAME;
						seriesData = result.X_DATA;
						
					},
					error:function(e)
					{
					}
				});
			}
			function loadDataOverideNew(X_NAME_DATA){
				var DATE_TIME = X_NAME_DATA;
				$.ajax({
					type: "post",
					url: "<%=basePath%>/homeFirstPageAction/loadDlfbPieOveride.action",
					data: "queryPara.DATE_TIME=" + DATE_TIME,
					dataType:"json",
					cache : false,
					async : false,//同步异步请求
					success: function(result)
					{	
						//
						legendData = result.X_NAME;
						seriesData = result.X_DATA;
						
					},
					error:function(e)
					{
						
					}
				});
			}
		}
		
		function loadDlfbPieOveride(X_NAME_DATA){
			var legendData = new Array();
			var seriesData = new Array();
			//myChart = echarts.init(document.getElementById('div_body_info1'));
			var option;
			
			if(X_NAME_DATA.length <= 0){
				loadData();
			}else{
				loadDataOveride(X_NAME_DATA);
			}
			
			
			option = {
			    title : {
			        text: '总用电量',
			        //subtext: '纯属虚构',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c}"
			        //formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        //orient : 'vertical',
			        x : 'center',
			        y : 'bottom',
			        padding:30,
			        data : legendData//['220kV','110kV','35kV','20kV','10kV']
			    },
  				grid: {},
			    calculable : true,
			    series : [
			        {
			            name:'总用电量',
			            type:'pie',
			            radius : '55%',
			            center: ['50%', '45%'],
			            data: seriesData
			            //[
			            //    {value:335, name:'220kV'},
			            //    {value:310, name:'110kV'},
			            //    {value:234, name:'35kV'},
			            //    {value:135, name:'20kV'},
			            //    {value:1548, name:'10kV'}
			            //]
			        }
			    ]
			};
			myChart2.setOption(option);
			
			//myChart.dispose();
			
			function loadData(){
				var DATE_TIME = $('#startDay2').val();
				$.ajax({
					type: "post",
					url: "<%=basePath%>/homeFirstPageAction/loadDlfbPie.action",
					data: "queryPara.DATE_TIME=" + DATE_TIME,
					dataType:"json",
					cache : false,
					async : false,//同步异步请求
					success: function(result)
					{	
						//
						legendData = result.X_NAME;
						seriesData = result.X_DATA;
						
					},
					error:function(e)
					{
						
					}
				});
			}
			function loadDataOveride(X_NAME_DATA){
				var DATE_TIME = X_NAME_DATA;
				$.ajax({
					type: "post",
					url: "<%=basePath%>/homeFirstPageAction/loadDlfbPie.action",
					data: "queryPara.DATE_TIME=" + DATE_TIME,
					dataType:"json",
					cache : false,
					async : false,//同步异步请求
					success: function(result)
					{	
						//
						legendData = result.X_NAME;
						seriesData = result.X_DATA;
						
					},
					error:function(e)
					{
						
					}
				});
			}
		}
		
		function loadyhfbPie(){
			var legendData = new Array();
			var seriesData = new Array();
			var X_COUNT = 0;
			
			loadyhfbPieData();
			if(X_COUNT == 0){
				option = {};
			}else{
				var option = {
				    title : {
				        text: '用户分布图\n\n用户总数: '+X_COUNT+'',
				        //subtext: '纯属虚构',
				        x:'center',
				        padding:45
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c}"
				    },
				    legend: {
				        //orient : 'vertical',
				        x : 'center',
				        y : 'bottom',
				        padding:5,
				        data : legendData//['220kV','110kV','35kV','20kV','10kV']
				    },
	  				grid: {},
				    calculable : true,
				    series : [
				        {
				            name:'用户分布',
				            type:'pie',
				            radius : '50%',
				            center: ['50%', '60%'],
				            
				            itemStyle : 
				          	{ 
				              normal: {
				              	label : {
				              		textStyle:{
						            	fontSize: 18
						            	//,color: '#400080'
						            },
				                	show: true, position: 'outer',
				                  	formatter:function (params) {
					                    var res = params.data.name+': ';
					                    res+=''+params.value;
					                    //res+='     ('+params.percent+'%)';
					                    return res;
				                  	}
				              	},
				                labelLine:{show:true}
				              }
				            },
				            data : seriesData
				            /**[
				                {value:335, name:'220kV'},
				                {value:310, name:'110kV'},
				                {value:234, name:'35kV'},
				                {value:135, name:'20kV'},
				                {value:1548, name:'10kV'}
				            ]**/
				        }
				    ]
				};
			}
			myChart4.setOption(option);
			
			function loadyhfbPieData(){
				$.ajax({
					type: "post",
					url: "<%=basePath%>/homeFirstPageAction/loadyhfbPieDataNew.action",
					data: "",
					dataType:"json",
					cache : false,
					async : false,//同步异步请求
					success: function(result)
					{	
						//
						legendData = result.X_NAME;
						seriesData = result.X_DATA;
						X_COUNT = result.X_SUM;
						
					},
					error:function(e)
					{
					}
				});
			}
		}
		
		function loadLineInfo(dateTime,selVal){
			var legendData = new Array();
			var X_DATA1 = new Array();
			var X_DATA2 = new Array();
			var X_DATA3 = new Array();
			var X_DATA4 = new Array();
			loadLineDataInfo(dateTime,selVal);
			var option = {
			    title : {
			        text: '区域负荷曲线 kW',
			      	x:'center'
			        //subtext: '纯属虚构'
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['用电','用电(前一天)'],//['用电','用电(前一天)','出线','出线(前一天)'],
			        selected : {'用电':true,
			        			'用电(前一天)':true
			        			},
			        			/**
			        			{'用电':true,
			        			'用电(前一天)':true,
			        			'出线':false,
			        			'出线(前一天)':false
			        			},**/
			      	padding:32
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
			            data : legendData//['周一','周二','周三','周四','周五','周六','周日']
			        }
			    ],
			    yAxis : [
			        {
			        	//name : '单位',
			            type : 'value',
			            axisLabel : {
			                formatter: '{value}'//'{value} °C'
			            }
			        }
			    ],
			  	grid: {y: 70, y2:30, x2:20},
			    series : [
			        {
			            name:'用电',
			            type:'line',
			            data: X_DATA1//[11, 11, 15, 13, 12, 13, 10]
			        },
			        {
			            name:'用电(前一天)',
			            type:'line',
			            data: X_DATA2//[1, -2, 2, 5, 3, 2, 0]
			        }/**,
			        {
			            name:'出线',
			            type:'line',
			            data: X_DATA3//[1, -20, 2, 50, 3, 20, 0]
			        },
			        {
			            name:'出线(前一天)',
			            type:'line',
			            data: X_DATA4//[10, -2, 20, 5, 30, 2, 10]
			        }**/
			    ]
			};
			myChart3.setOption(option);
			
			function loadLineDataInfo(dateTime,selVal){
				var startDay3 = $('#startDay3').val();
				var selValData = 288;
				if(dateTime.length > 0){
					startDay3 = dateTime;
				}
				if(selVal.length > 0){
					selValData = selVal;
				}
				$.ajax({
					type: "post",
					url: "<%=basePath%>/homeFirstPageAction/loadLineInfo.action",
					data: "queryPara.START_DATE=" + startDay3 + "&queryPara.SEL_VAL=" + selValData,
					dataType:"json",
					cache : false,
					async : false,//同步异步请求
					success: function(result)
					{	
						
						legendData = result.X_NAME;
						X_DATA1 = result.X_DATA1;
						X_DATA2 = result.X_DATA2;
						X_DATA3 = result.X_DATA3;
						X_DATA4 = result.X_DATA4;
						
					},
					error:function(e)
					{
						
					}
				});
			}
		}
		
		function shebeigongkuangLoad(){
			var dataName = new Array();
			var dataNameResult1 = new Array();
			var dataNameResult2 = new Array();
			loadSBGKData();
			var option = {
			    title : {
			        text: '设备工况',
			        padding:15,
			        subtext: '',
			        x: 'center'
			    },
			    tooltip : {
			        trigger: 'axis',
			        formatter: function(params) {
			        	var paramResult = ' '+ params[0].name + '<br/>';
			        	for ( var i = 0; i < params.length; i++) {
							paramResult += params[i].seriesName + ' : ' 
										 + params[i].value + '<br/>';
						}
	                   return paramResult;
			        }
			    },
			    legend: {
			    	padding:39,
			        data:['总数','停运'],
			        x: 'center'//,
			      	//y:'bottom'
			      	//selected : RESULTSELECTEDMAP,
			      	//padding:35
			    },
			    grid: {y: 70, y2:20,x:40,x2:20},
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
			            data : dataName//['00:00', '00:05', '00:10', '00:15', '00:20', '00:25', '00:30', '00:35', '00:40', '00:45', '00:50', '00:55', '01:00', '01:05', '01:10', '01:15', '01:20', '01:25', '01:30', '01:35', '01:40', '01:45', '01:50', '01:55', '02:00', '02:05', '02:10', '02:15', '02:20', '02:25', '02:30', '02:35', '02:40', '02:45', '02:50', '02:55', '03:00', '03:05', '03:10', '03:15', '03:20', '03:25', '03:30', '03:35', '03:40', '03:45', '03:50', '03:55', '04:00', '04:05', '04:10', '04:15', '04:20', '04:25', '04:30', '04:35', '04:40', '04:45', '04:50', '04:55', '05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55', '06:00', '06:05', '06:10', '06:15', '06:20', '06:25', '06:30', '06:35', '06:40', '06:45', '06:50', '06:55', '07:00', '07:05', '07:10', '07:15', '07:20', '07:25', '07:30', '07:35', '07:40', '07:45', '07:50', '07:55', '08:00', '08:05', '08:10', '08:15', '08:20', '08:25', '08:30', '08:35', '08:40', '08:45', '08:50', '08:55', '09:00', '09:05', '09:10', '09:15', '09:20', '09:25', '09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55', '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55', '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55', '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55', '20:00', '20:05', '20:10', '20:15', '20:20', '20:25', '20:30', '20:35', '20:40', '20:45', '20:50', '20:55', '21:00', '21:05', '21:10', '21:15', '21:20', '21:25', '21:30', '21:35', '21:40', '21:45', '21:50', '21:55', '22:00', '22:05', '22:10', '22:15', '22:20', '22:25', '22:30', '22:35', '22:40', '22:45', '22:50', '22:55', '23:00', '23:05', '23:10', '23:15', '23:20', '23:25', '23:30', '23:35', '23:40', '23:45', '23:50', '23:55']
			        }
			    ],
			    yAxis : [
			        {
			            //name : '单位(kWh)',
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'总数',
			            type:'bar',
			            data:dataNameResult1
			            //['57','57','72','71','26','27','9','81','77','88','46','87','65','65','72','1','7','22','82','28','83','45','38','22','53','63','36','87','7','11','8','86','25','13','46','65','97','96','21','43','90','5','77','54','29','40','14','16','7','28','21','42','34','83','78','35','34','72','0','11','72','94','26','1','86','14','27','39','26','32','41','85','89','99','68','64','64','11','93','98','50','45','82','92','82','94','44','84','23','60','84','36','82','99','16','99','79','27','77','87','41','23','22','69','82','55','93','90','82','6','34','2','36','8','6','95','40','18','41','27','9','84','31','67','84','33','49','66','50','9','84','98','57','58','16','98','33','51','66','31','38','9','49','16','13','33','28','99','71','43','17','70','34','43','85','12','51','50','3','21','70','23','30','27','10','59','67','48','41','70','14','61','77','52','94','61','0','17','32','47','1','37','16','12','55','78','86','11','67','8','44','40','99','10','57','55','74','59','3','71','84','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-']
			        },
			        {
			            name:'停运',
			            type:'bar',
			            data:dataNameResult2
			            //['57','57','72','71','26','27','9','81','77','88','46','87','65','65','72','1','7','22','82','28','83','45','38','22','53','63','36','87','7','11','8','86','25','13','46','65','97','96','21','43','90','5','77','54','29','40','14','16','7','28','21','42','34','83','78','35','34','72','0','11','72','94','26','1','86','14','27','39','26','32','41','85','89','99','68','64','64','11','93','98','50','45','82','92','82','94','44','84','23','60','84','36','82','99','16','99','79','27','77','87','41','23','22','69','82','55','93','90','82','6','34','2','36','8','6','95','40','18','41','27','9','84','31','67','84','33','49','66','50','9','84','98','57','58','16','98','33','51','66','31','38','9','49','16','13','33','28','99','71','43','17','70','34','43','85','12','51','50','3','21','70','23','30','27','10','59','67','48','41','70','14','61','77','52','94','61','0','17','32','47','1','37','16','12','55','78','86','11','67','8','44','40','99','10','57','55','74','59','3','71','84','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-']
			        }
			    ]
			};
			myChart6.setOption(option);
			
			function loadSBGKData(){
				var queryparam = "";//"queryPara.LINE_ID="+lineId+"&queryPara.START_DAY="+dateTime+"&queryPara.QUERY_TYPE=02&queryPara.ORG_NO=01&queryPara.QUERYSIZE=24&queryPara.END_DAY="+dateTime1
				$.ajax({
					type: "post",
					url: "<%=basePath%>/homeFirstPageAction/loadyBarByFirst.action",
					data : queryparam,
					dataType : "json",
					cache : false,
					async : false,//同步异步请求
					success : function(result) {
						dataName = result.X_DATA_RESULT0;
						dataNameResult1 = result.X_DATA_RESULT1;
						dataNameResult2 = result.X_DATA_RESULT2;
					},
					error : function(e) {
					}
				});
			}
		}
		
		
		var rsizeTimer = null;
		$(window).resize(function(){
			if(rsizeTimer){
				clearTimeout(rsizeTimer);
			}
			rsizeTimer = setTimeout(function(){
				//myChart1.resize();
				//myChart2.resize();
				//myChart3.resize();
				
				setWidth("div_body_info",myChart1);
				setWidth("div_body_info1",myChart2);
				setWidth("div_body_info2",myChart3);
				setWidth("div_body_info3",myChart4);
				setWidth("div_body_info13",myChart5);
				setWidth("div_body_info14",myChart6);
				$('#bodyDivClass').height(document.body.clientHeight);
				//myChart4.resize();
				//myChart6.resize();
				//myChart5.resize();
				//window.resizeTo(parseInt(parseInt(document.body.clientWidth)+1), parseInt(document.body.clientHeight));
			},200);
		});
		
		function setWidth(id,obj){
			
			var width = document.body.clientWidth/2 - 5;
			
			//alert(width)
			$("#"+id).width(width);
			$("#"+id).children("div:first").width(width);
			$("#"+id).contents().find("canvas").width(width);
			obj.resize();
		}
	</script>
</html>

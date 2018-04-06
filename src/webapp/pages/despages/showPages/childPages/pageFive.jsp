<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

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
    
    <title>My JSP 'pageFive.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="<%=cssPath%>/homeMain.css" />
	<script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/color.css">
	
	<script type="text/javascript" src="<%=mainCssPath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=mainCssPath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=mainCssPath %>/echarts/echarts.min.js"></script>
	
	<script type="text/javascript" src="<%=pagePath %>/common/js/dateUtil.js"></script>
	
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
<!--      <div class="head_div"> -->
<!--      	<div class="title_div"> -->
<!--      		<span>区域能源中心运行监控</span> -->
<!--      	</div> -->
<!--      	<div class="search_div"> -->
<!--      		<div class="txt_div"> -->
<!--      			<span>客户搜索</span> -->
<!--      		</div> -->
<!--      		<div class="btn_content_div"> -->
<!--      			<div class="txt_div"> -->
<!--      				<input id="searchInput" type="text" onkeydown="searchEvent(event)" placeholder="客户搜索"> -->
<!--      			</div> -->
<!--      			<div class="img_div" onclick="searchEvent('click')"> -->
<!--      				<img src="<%=imagePath%>/pageFive/img_8.png"> -->
<!--      			</div> -->
<!--      		</div> -->
<!--      	</div> -->
<!--      	<div style="float: right;position: absolute;right: 60px;top: 20px;cursor: pointer;" onclick="toHome()"> -->
<!--      		<img src="<%=imagePath%>/pageFive/img_9.png"> -->
<!--      	</div> -->
<!--      </div> -->
     <div class="main_div">
     	<div class="left_div">
     		<div class="left_roll_div">
<!--      			<img id="leftBtn" src="<%=imagePath%>/pageFive/img_6.png"> -->
     		</div>
     		<div class="content_div">
     			<div id="chatList" style="-webkit-transform:translate(0px, -70px);-moz-transform:translate(0px, -70px);transform:translate(0px, -70px);">
     				<div class="item_div" style="top:70px;left:0px;">
	     				<div class="top_div">
	     					<div class="title_div">
	     						<span>区域负荷曲线</span>
	     					</div>
	     					<div class="value_div">
	     						<span>（实时负荷：<span id="ssfhSum">--</span>千瓦）</span>
	     					</div>
	     					<div style="float: right;position: absolute;right: 60px;margin-top: 10px;z-index:100;">
	     						<table width="99" height="30px" class="text_table_style">
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
			    	    					<td style="display:none;">
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
	     					</div>
	     					<div class="chat_div" id="div_body_info2"></div>
	     				</div>
	     				<div class="bottom_div">
	     					<div class="title_div">
	     						<span>用户分布统计图</span>
	     					</div>
	     					<div class="value_div">
	     						<span>（用户总数：<span id="yhCount">--</span>户）</span>
	     					</div>
	     					<div class="chat_div" id="div_body_info3"></div>
	     				</div>
	     			</div>
	     			<div class="item_div" style="top:70px;left:685px;">
	     				<div class="top_div">
	     					<div class="title_div">
		   						<span>区域企业总用电量</span>
		   					</div>
		   					<div class="value_div">
		   						<span>（总用电量：<span id="zydSum">--</span>千瓦时）</span>
		   					</div>
		   					<div style="position: absolute;float: right;right: 70px;margin-top: 10px;z-index:100;">
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
			    	    						<a onclick="timeQueryLoad()" id="button_query" href="javascript:void(0);" class="easyui-linkbutton"
							    				style="height: 25px;width: 40px;" 
							    				 plain>查询</a>
			    	    					</td>
			    	    					<td width="38%" >
			    	    					</td>
			    	    				</tr>
			    	    			</tbody>
			    	    		</table>
		   					</div>
		   					<div class="chat_div" id="div_body_info"></div>		
	     				</div>
	     				<div class="bottom_div">
		   					<div class="title_div">
	     						<span>设备工况</span>
	     					</div>
	     					<div class="value_div">
	     						<span>（变电站数：<span id="bdzCount">--</span>座       主变台数：<span id="zbCount">--</span>台       主变总容量：<span id="zbSum">--</span>千伏安）</span>
	     					</div>
	     					<div class="chat_div" id="div_body_info14"></div>
	     				</div>
	     			</div>
<!-- 	     			<div class="item_div" style="top:70px;left:1370px;"> -->
<!-- 		   				<div class="top_div"> -->
<!-- 		   					<div class="title_div"> -->
<!-- 		   						<span>用户日用电量 TOP10</span> -->
<!-- 		   					</div> -->
<!-- 		   					<div class="value_div"> -->
<!-- 		   						<span>（日用电量：<span id="rydlSum">--</span>千瓦时）</span> -->
<!-- 		   					</div> -->
<!-- 		   					<div style="position: absolute;float: right;right: 60px;margin-top: 5px;z-index:100;"> -->
<!-- 		   						<table width="99" height="30px" class="text_table_style"> -->
<!-- 			    	    			<tbody> -->
<!-- 			    	    				<tr> -->
<!-- 			    	    					<td width="20px" height="100%">&nbsp;&nbsp;&nbsp;</td> -->
<!-- 			    	    					<td> -->
<!-- 			    	    						<a onclick="qytQuery('-1');" id="button_query" href="javascript:void(0);" class="" -->
<!-- 							    				style=""  -->
<!-- 							    				 plain> -->
<!-- 							    				 <img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"> -->
<!-- 							    				 </a> -->
<!-- 				    						</td> -->
<!-- 			    	    					<td> -->
<!-- 			    	    						<input id="startDay2" type="text" class="easyui-datebox" -->
<!-- 				    							class="dateTime_style" style="height: 25px;width: 105px;" -->
<!-- 				    							value="<%=lastDay %>" /> -->
<!-- 			    	    					</td> -->
<!-- 			    	    					<td > -->
<!-- 			    	    						<a onclick="qytQuery('1');" id="button_query" href="javascript:void(0);" class="" -->
<!-- 							    				style=""  -->
<!-- 							    				 plain> -->
<!-- 							    				 <img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"> -->
<!-- 							    				 </a> -->
<!-- 			    	    					</td> -->
<!-- 			    	    					<td> -->
<!-- 			    	    					</td> -->
<!-- 			    	    					<td width="55%" > -->
<!-- 			    	    					</td> -->
<!-- 			    	    				</tr> -->
<!-- 			    	    			</tbody> -->
<!-- 			    	    		</table> -->
<!-- 		   					</div> -->
<!-- 		   					<div class="chat_div" id="div_body_info1"></div> -->
<!-- 		   				</div> -->
<!-- 		   				<div class="bottom_div"> -->

		   					
<!-- 		   				</div> -->
<!-- 		   			</div> -->
     			</div>
     		</div>
     		<div class="right_roll_div">
<!--      			<img id="rightBtn" src="<%=imagePath%>/pageFive/img_7.png"> -->
     		</div>
     	</div>
     	<div class="right_div">
     		<div style="margin-left: 10px; margin-top: 25px;">
     			<%-- <div style="float: left; width: 16px; height: 16px; margin-top: 3px;">
     				<img style="width: 100%; height: 100%;" src="<%=imagePath%>/news.png">
     			</div> --%>
     			<div style="float: left; font-size: 16px; margin-left: 6px; color: rgb(2, 138, 143);">
     				<div id="newsList" style="overflow: hidden;height: 25px;">     					
<!--      					<div id="newsList"> -->
<!--      						<div style="cursor: pointer;"> -->
<!--      							<span>系统公告：</span> -->
<!--      							<span>12312312</span> -->
<!--      						</div> -->
<!--      						<div> -->
<!--      							<span>系统公告：</span> -->
<!--      							<span>12312312</span> -->
<!--      						</div> -->
<!--      						<div> -->
<!--      							<span>系统公告：</span> -->
<!--      							<span>12312312</span> -->
<!--      						</div> -->
<!--      						<div> -->
<!--      							<span>系统公告：</span> -->
<!--      							<span>12312312</span> -->
<!--      						</div> -->
<!--      						<div> -->
<!--      							<span>系统公告：</span> -->
<!--      							<span>12312312</span> -->
<!--      						</div> -->
<!--      						<div> -->
<!--      							<span>系统公告：</span> -->
<!--      							<span>12312312</span> -->
<!--      						</div> -->
<!--      					</div> -->
     				</div>
     			</div>
     		</div>
     		<div class="content_1">
     			<div class="item_div">
     				<div class="img_div">
     					<img src="<%=imagePath%>/pageFive/img_4.png">
     				</div>
     				<div class="content_div">
     					<div class="name_div">
     						<span>终端在线率：</span>
     					</div>
     					<div class="value_div">
     						<span id="onlineRate">--</span>
     					</div>
     				</div>
     			</div>
     			<div class="item_div">
     				<div class="img_div">
     					<img src="<%=imagePath%>/pageFive/img_5.png">
     				</div>
     				<div class="content_div">
     					<div class="name_div">
     						<span>采集成功率：</span>
     					</div>
     					<div class="value_div">
     						<span id="successRate">--</span>
     					</div>
     				</div>
     			</div>
     		</div>
     		<div class="content_2">
     			<div class="title_div">
     				<div id="gjTjTabBtn" class="item_div" style="cursor: pointer;">
	     				<span>告警统计</span>
	     			</div>
	     			<div id="gjMxTabBtn" class="item_div" style="margin-left: 30px;color: rgb(165, 165, 165);cursor: pointer;">
	     				<span>告警明细</span>
	     			</div>
	     			<div class="to_div" onclick="toGjPage()">
   						<img src="<%=imagePath%>/pageFive/img_3.png">
   					</div>
     			</div>
     			<div class="content_div" style="width: 370px;height: 110px;margin-top: 8px;overflow: hidden;">
     				<div id="gj_1_div" class="item_div">
     					<div class="done_div">
     						<span>已处理告警数</span>
     					</div>
     					<div class="c_div">
     						<div class="b_div">
     							<div id="gjDoneWidth" class="b_a_div">
<!--      								<div class="v_div"> -->
<!--      									<span id="handledAlarm">--</span> -->
<!--      								</div> -->
     							</div>
     							<div class="b_d_div">
<!--      								<div class="v_div"> -->
<!--      									<span id="totalAlarm">--</span> -->
<!--      								</div> -->
     							</div>
     							<div style="text-align: center;width: 200px;float: left;margin-top: -28px;">
     								<span id="gjValue">-- / --</span>
     							</div>
     						</div>
     						<div class="all_div">
     							<span>告警总数</span>
     						</div>
     					</div>
     				</div>
     				<div id="gj_2_div" style="overflow: hidden;height: 110px;display:none;">
     					<div id="gjUpDiv" class="up_div">
	     					<img src="<%=imagePath%>/pageFive/img_1.png">
	     				</div>
	     				<div class="item_div">     					
	     					<div id="alarmDetailList"></div>
	     				</div>
	     				<div id="gjDownDiv" class="down_div">
	     					<img src="<%=imagePath%>/pageFive/img_2_1.png">
	     				</div>
     				</div>
     			</div>
     		</div>
<!--      		<div class="content_3"> -->
<!--      			<div class="title_div"> -->
<!--      				<div class="item_div"> -->
<!-- 	     				<span>工单统计</span> -->
<!-- 	     			</div> -->
<!-- 	     			<div class="to_div" onclick="toGdPage()"> -->
<!--    						<img src="<%=imagePath%>/pageFive/img_3.png"> -->
<!--    					</div> -->
<!--      			</div> -->
<!--      			<div class="content_div" style="width: 370px;height: 110px;"> -->
<!--      				<div class="item_div"> -->
<!-- 	   					<div class="done_div"> -->
<!-- 	   						<span>已处理工单数</span> -->
<!-- 	   					</div> -->
<!-- 	   					<div class="c_div"> -->
<!-- 	   						<div class="b_div"> -->
<!-- 	   							<div id="gdDoneWidth" class="b_a_div" style="background-image: -moz-linear-gradient(270deg, #3cd6cd, #027972);background-image: -webkit-gradient(linear, 0 0%, 0% 100%, color-stop(0.0, #3cd6cd), color-stop(1, #027972));"> -->
<!-- 	   								<div class="v_div"> -->
<!-- 	   									<span id="handledOrder">--</span> -->
<!-- 	   								</div> -->
<!-- 	   							</div> -->
<!-- 	   							<div class="b_d_div"> -->
<!-- 	   								<div class="v_div"> -->
<!-- 	   									<span id="totalOrder">--</span> -->
<!-- 	   								</div> -->
<!-- 	   							</div> -->
<!-- 	   							<div style="text-align: center;width: 200px;float: left;margin-top: -28px;"> -->
<!-- 	   								<span id="gdValue">-- / --</span> -->
<!-- 	   							</div> -->
<!-- 	   						</div> -->
<!-- 	   						<div class="all_div"> -->
<!-- 	   							<span>工单总数</span> -->
<!-- 	   						</div> -->
<!-- 	   					</div> -->
<!-- 	   				</div> -->
<!--      			</div> -->
<!--      		</div> -->
     		<div class="content_4">
     			<div class="title_div">
     				<div class="item_div">
	     				<span>变位信息</span>
	     			</div>
	     			<div class="to_div" onclick="toBwPage()">
   						<img src="<%=imagePath%>/pageFive/img_3.png">
   					</div>
     			</div>
     			<div class="content_div">
     				<div id="bwUpDiv" class="up_div">
     					<img src="<%=imagePath%>/pageFive/img_1.png">
     				</div>
     				
     				<div class="content_div" style="border: none;background: none;height:200px;overflow: hidden;">
     					<div id="shiftInfoList">
     						
     					</div>
     					<!-- <div class="item_div">
     						<div class="v_div">
     							<div class="name_div">
	     							<span>江苏艾龙森汽车部件 有限公司</span>
	     						</div>
	     						<div class="value_div">
	     							<span>4091动补    分>合</span>
	     						</div>
     						</div>
     						<div class="v_div">
     							<div class="name_div">
	     							<span>江苏艾龙森汽车部件 有限公司</span>
	     						</div>
	     						<div class="value_div">
	     							<span>4091动补    分>合</span>
	     						</div>
     						</div>   					
     					</div>
     					<div class="item_div">
     						<div class="v_div">
     							<div class="name_div">
	     							<span>江苏艾龙森汽车部件 有限公司</span>
	     						</div>
	     						<div class="value_div">
	     							<span>4091动补    分>合</span>
	     						</div>
     						</div>
     						<div class="v_div">
     							<div class="name_div">
	     							<span>江苏艾龙森汽车部件 有限公司</span>
	     						</div>
	     						<div class="value_div">
	     							<span>4091动补    分>合</span>
	     						</div>
     						</div>
     					</div> -->
     				</div>
     				<div id="bwDownDiv" class="down_div">
     					<img src="<%=imagePath%>/pageFive/img_2_1.png">
     				</div>
     			</div>
     		</div>
     	</div>
     </div>
	 <script src="<%=jsPath%>/pageFive.js"></script>
  </body>
</html>

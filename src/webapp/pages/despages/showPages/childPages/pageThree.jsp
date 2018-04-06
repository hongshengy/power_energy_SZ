<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>
<%
	String baseUrl = request.getContextPath();
	String mainPath = baseUrl + "/pages/despages/common";
	String jsPath = baseUrl + "/pages/despages/showPages/js";
	String cssPath = baseUrl + "/pages/despages/showPages/css";
	String imagePath = baseUrl + "/pages/despages/showPages/images";
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
	 SimpleDateFormat sdfFrom = new SimpleDateFormat("yyyy-MM-dd");
	 Date newDate = DatabaseUtil.getSysDate();
	 String today = sdfFrom.format(newDate);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>现场运行</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="<%=mainPath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=mainPath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=mainPath %>/jquery-easyui-1.5.1/themes/color.css">
	
	<script type="text/javascript" src="<%=mainPath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=mainPath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=mainPath %>/echarts/echarts.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="<%=cssPath%>/main.css" />
	<link href="<%=cssPath%>/DefaultAnimation.css" type="text/css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css" href="<%=cssPath%>/pageThree.css" />
	
	<script type="text/javascript">
		var basePath = "<%=basePath%>";
		var imagePath = "<%=imagePath%>";
	</script>
  </head>
  
  <body>
<!--   		<div id="menuTop"></div> -->
  		<div id="mainDiv" style="display:none;">
  			<div class="left_div">
  				<div id="e_1" class="item_div" style="height:60px;">
  					<div class="title_div">
  						<div id="a_1" class="icon_div">
  							<img src="<%=imagePath%>/pageThree/left_1.png">
  						</div>
  						<div id="c_1" class="txt_div" onClick="btnClick(0)" style="color:#00766b;">
  							<span>承接情况</span>
  						</div>
  						<div id="d_1" class="line_div" >
  							<img src="<%=imagePath%>/pageThree/left_line.png">
  						</div>
  					</div>
  					<div id="o_1" class="content_div">
  						<div class="line_div" style="height: 270px;">
  							<div></div>
  						</div>
  						<div id="f_1" class="txt_div">
  							<span>本公司为客户提供专业、高效、稳定、安全值得放心托付的线上线下运维服务。“线上”已承接客户  <span id="z_12" style="font-weight: bold;font-size: 24px;">XX</span> 家，覆盖变电站 <span id="z_13" style="font-weight: bold;font-size: 24px;">XX</span> 座，实时监测主变 <span id="z_11" style="font-weight: bold;font-size: 24px;" >XX</span> 个，主变总容量达 <span id="z_15" style="font-weight: bold;font-size: 24px;">XX</span> kVA，<span id="z_18" style="font-weight: bold;font-size: 24px;">XX</span> 年总用电量达 <span id="z_14" style="font-weight: bold;font-size: 24px;">XX</span> kWh。“线下”承接变电站巡检、设备检修、设备抢修等服务 <span id="z_16" style="font-weight: bold;font-size: 24px;">XX</span> 次。</span>
  						</div>
  					</div>
  				</div>
  				<div id="e_2" class="item_div" style="height:60px;">
  					<div class="title_div">
  						<div id="a_2" class="icon_div">
  							<img src="<%=imagePath%>/pageThree/left_2.png">
  						</div>
  						<div id="c_2" class="txt_div" onClick="btnClick(1)">
  							<span>在线监测</span>
  						</div>
  						<div id="d_2" class="line_div">
  							<img src="<%=imagePath%>/pageThree/left_line.png">
  						</div>
  					</div>
  					<div id="o_2" class="content_div">
  						<div class="line_div" style="height: 160px;">
  							<div></div>
  						</div>
  						<div id="f_2" class="txt_div">
  							<span>本系统目前有建档用户  <span id="z_19" style="font-weight: bold;font-size: 24px;">XX</span> 户，用户用电实时负荷为 <span id="z_32" style="font-weight: bold;font-size: 24px;">XX</span> kW,终端在线率为 100%，采集频率为 1分钟/天（1440点）。采集总测点数为  <span id="z_23" style="font-weight: bold;font-size: 24px;">XX</span> 个，其中遥测测点数 <span id="z_20" style="font-weight: bold;font-size: 24px;">XX</span> 个、遥信测点数 <span id="z_21" style="font-weight: bold;font-size: 24px;">XX</span> 个、遥脉测点数 <span id="z_22" style="font-weight: bold;font-size: 24px;">XX</span> 个。</span>
  						</div>
  					</div>
  				</div>
  				<div id="e_3" class="item_div" style="height:60px;">
  					<div class="title_div">
  						<div id="a_3" class="icon_div">
  							<img src="<%=imagePath%>/pageThree/left_3.png">
  						</div>
  						<div id="c_3" class="txt_div" onClick="btnClick(2)">
  							<span>数据分析</span>
  						</div>
  						<div id="d_3" class="line_div">
  							<img src="<%=imagePath%>/pageThree/left_line.png">
  						</div>
  					</div>
  					<div id="o_3" class="content_div">
  						<div class="line_div" style="height: 260px;">
  							<div></div>
  						</div>
  						<div id="f_3" class="txt_div">
  					  		<span>为企业用户提供了电量分析、负荷分析、用电构成分析、分时电量分析、电费分析、安全用电分析和用电结构分析等丰富的分析功能，帮助企业经济用电，节省用电成本。同时为企业提供能效管理，统计单位产品的用能消耗，看清能耗趋势。支持能耗考核指标设定，重点用能分路的能耗超标时，可提醒管理人员及时采取管控措施，保证能效指标达成，提高能源利用效率。</span>
  						</div>
  					</div>
  				</div>
  				<div id="e_4" class="item_div" style="height:60px;">
  					<div class="title_div">
  						<div id="a_4" class="icon_div">
  							<img src="<%=imagePath%>/pageThree/left_4.png">
  						</div>
  						<div id="c_4" class="txt_div" onClick="btnClick(3)">
  							<span>服务目标</span>
  						</div>
  						<div id="d_4" class="line_div">
  							<img src="<%=imagePath%>/pageThree/left_line.png">
  						</div>
  					</div>
  					<div id="o_4" class="content_div">
  						<div class="line_div" style="height: 180px;">
  							<div></div>
  						</div>
  						<div id="f_4" class="txt_div">
  					  		<span>为用户提供了7*24小时不间断智能配电房监测服务，以及传统服务、信息化服务、新能源服务、能效提升服务、能源托管服务五大核心服务，实现企业配电房的自动化实时监测和无人值守。提高企业配用电经济性、安全性、可靠性。</span>
  						</div>
  					</div>
  				</div>
  			</div>
  			<div class="right_div">
  				<div id="b_1" class="tab_one" style="opacity:1;-webkit-transform:translate(0px, 0px);-moz-transform:translate(0px, 0px);">
  					<div id="g_1" class="item_div" style="opacity:0;-webkit-transform:translate(400px, 0px);-moz-transform:translate(400px, 0px);">
  						<div class="name_div">
  							<span>实时负荷：</span>
  						</div>
  						<div class="num_div" style="color:#FF7010">
  							<span id="z_30">2033.98</span>
  						</div>
  						<div class="icon_div">
  							<img src="<%=imagePath%>/pageThree/one/right_1.png">
  						</div>
  						<div class="unit_div">
  							<span>千瓦</span>
  						</div>
  					</div>
  					<div id="g_2" class="item_div" style="opacity:0;-webkit-transform:translate(-400px, 0px);-moz-transform:translate(-400px, 0px);">
  						<div class="name_div">
  							<span>实时用电量：</span>
  						</div>
  						<div class="num_div" style="color:#FF7010">
  							<span id="z_31">2033.98</span>
  						</div>
  						<div class="icon_div">
  							<img src="<%=imagePath%>/pageThree/one/right_2.png">
  						</div>
  						<div class="unit_div">
  							<span>千瓦时</span>
  						</div>
  					</div>
  					<div id="g_3" class="item_div" style="opacity:0;-webkit-transform:translate(400px, 0px);-moz-transform:translate(400px, 0px);">
  						<div class="name_div">
  							<span>主变总容量：</span>
  						</div>
  						<div class="num_div">
  							<span id="z_3">10.22</span>
  						</div>
  						<div class="icon_div">
  							<img src="<%=imagePath%>/pageThree/one/right_3.png">
  						</div>
  						<div class="unit_div">
  							<span>千伏安</span>
  						</div>
  					</div>
  					<div id="g_4" class="item_div" style="opacity:0;-webkit-transform:translate(-400px, 0px);-moz-transform:translate(-400px, 0px);">
  						<div class="name_div">
  							<span>主变台数：</span>
  						</div>
  						<div class="num_div">
  							<span id="z_4">23.01</span>
  						</div>
  						<div class="icon_div">
  							<img src="<%=imagePath%>/pageThree/one/right_4.png">
  						</div>
  						<div class="unit_div">
  							<span>台</span>
  						</div>
  					</div>
  					<div id="g_5" class="item_div" style="opacity:0;-webkit-transform:translate(400px, 0px);-moz-transform:translate(400px, 0px);">
  						<div class="name_div">
  							<span>客户数：</span>
  						</div>
  						<div class="num_div">
  							<span id="z_5">23</span>
  						</div>
  						<div class="icon_div">
  							<img src="<%=imagePath%>/pageThree/one/right_5.png">
  						</div>
  						<div class="unit_div">
  							<span>户</span>
  						</div>
  					</div>
  					<div id="g_6" class="item_div" style="opacity:0;-webkit-transform:translate(-400px, 0px);-moz-transform:translate(-400px, 0px);">
  						<div class="name_div">
  							<span>变电站数：</span>
  						</div>
  						<div class="num_div">
  							<span id="z_6">1536</span>
  						</div>
  						<div class="icon_div">
  							<img src="<%=imagePath%>/pageThree/one/right_6.png">
  						</div>
  						<div class="unit_div">
  							<span>座</span>
  						</div>
  					</div>
  					<div id="g_7" class="item_div" style="opacity:0;-webkit-transform:translate(400px, 0px);-moz-transform:translate(400px, 0px);">
  						<div class="name_div">
  							<span>工单服务数：</span>
  						</div>
  						<div class="num_div">
  							<span id="z_7">1</span>
  						</div>
  						<div class="icon_div">
  							<img src="<%=imagePath%>/pageThree/one/right_7.png">
  						</div>
  						<div class="unit_div">
  							<span>条</span>
  						</div>
  					</div>
  					<div id="g_8" class="item_div" style="opacity:0;-webkit-transform:translate(-400px, 0px);-moz-transform:translate(-400px, 0px);">
  						<div class="name_div">
  							<span>测点数：</span>
  						</div>
  						<div class="num_div">
  							<span id="z_8">205</span>
  						</div>
  						<div class="icon_div">
  							<img src="<%=imagePath%>/pageThree/one/right_8.png">
  						</div>
  						<div class="unit_div">
  							<span>个</span>
  						</div>
  					</div> 					
  				</div>
  				<div id="b_2" class="tab_two" style="opacity:1;-webkit-transform:translate(0px, 0px);-moz-transform:translate(0px, 0px);display:none;">
  					<div id="child_tab_one" style="opacity:1;-webkit-transform:translate(0px, 0px);-moz-transform:translate(0px, 0px);">
  						<div id="h_1" class="item_div" style="opacity:0;-webkit-transform:translate(0px, -400px);-moz-transform:translate(0px, -400px);">
	  						<div class="title_div">
	  							<span>区域负荷曲线</span>
	  						</div>
	  						<table width="99" height="30px" class="text_table_style" style="float: right;position: relative;z-index: 1000;">
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
			    	    					<td style="display: none;">
			    	    						<select class="easyui-combobox wnGrade" id="wnGrade" 
			    	    						data-options="width:200,prompt:'请选择',panelHeight:'auto',editable:false"
			    	    						style="width: 75px;height: 26px;display:none;">
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
	    	    			<div id="div_body_info2" style="width:990px;height:310px;margin-top: 40px;"></div>
	  					</div>
	  					<div id="h_2" class="item_div" style="opacity:0;-webkit-transform:translate(0px, 400px);-moz-transform:translate(0px, 400px);margin-top: 30px;">
	  						<div class="title_div">
	  							<span>区域用电</span>
	  						</div>
	  						<table width="99" height="30px" class="text_table_style" style="float: right;position: relative;z-index: 1000;">
		    	    			<tbody>
		    	    				<tr>
		    	    					<td width="20px" height="100%">&nbsp;&nbsp;&nbsp;</td>
		    	    					<td>
		    	    						<input id="startDay1" type="text" class="easyui-datebox"
			    							class="dateTime_style" style="height: 25px;width: 105px;"
			    							value="2017-03-19" />
			    						</td>
		    	    					<td>
		    	    						至
		    	    					</td>
		    	    					<td >
		    	    						<input id="endDay1" type="text" class="easyui-datebox"
			    							class="dateTime_style" style="height: 25px;width: 105px;"
			    							value="2017-04-17" />
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
		    	    		<div class="div_body_info" id="div_body_info" style="width:990px;height:310px;margin-top: 40px;">
	  					</div>
  					</div>
  					</div>
  					<div id="child_tab_two" style="opacity:1;-webkit-transform:translate(0px, 0px);-moz-transform:translate(0px, 0px);display:none;">
  						<div id="h_1" class="item_div" style="opacity:0;-webkit-transform:translate(400px, 0px);-moz-transform:translate(400px, 0px);">
  							<div class="title_div" style="margin-top: 0px;">
	  							<span>设备工况</span>
	  						</div>
  							<div class="div_body_info" id="div_body_info14" style="width: 990px;height: 310px;"></div>
  						</div>
  						<div id="h_2" class="item_div" style="opacity:0;-webkit-transform:translate(-400px, 0px);-moz-transform:translate(-400px, 0px);">
  							<div style="float: left;">
  								<div class="title_div" style="margin-top: 0px;">
		  							<span>测点分布统计图</span>
		  						</div>
		  						<div class="div_body_info" id="div_body_info13" style="width: 445px;height: 350px;">
		    					</div>
  							</div>
	  						<div style="float: left;">
  								<div class="title_div" style="margin-top: 0px;">
		  							<span>用户分布统计图</span>
		  						</div>
		  						<div class="div_body_info" id="div_body_info3" style="width: 445px;height: 350px;">
		    					</div>
  							</div>
	  					</div>
	  				</div>
	  				<div id="s_1" class="btn_p_div" style="position: absolute;top: 720px;height: 150px;width: 100%;cursor:pointer;" onClick="childBtnMainClick()">
  						<div class="btn_div" style="background:#00BE28;margin-left: 450px;" onclick="childBtnClick(0, -1)"></div>
	  					<div class="btn_div" style="margin-left:38px;" onclick="childBtnClick(1, -1)"></div>
	  				</div>
  				</div>
  				<div id="b_3" class="tab_three" style="opacity:1;-webkit-transform:translate(0px, 0px);-moz-transform:translate(0px, 0px);display:none;">
  					<div id="i_13" class="img_one_div" style="-webkit-transform: scale(0.2); -moz-transform: scale(0.2); opacity: 0;">
  						<img src="<%=imagePath%>/pageThree/three/right_4.png" style="width: 100%;height: 100%;">
  					</div>
  					<div id="i_12" class="img_two_div" style="opacity: 0;">
  						<img src="<%=imagePath%>/pageThree/three/right_line_2.png" style="width: 100%;height: 100%;">
  					</div>
  					<div class="content_div_1">
  						<div id="i_10" class="item_div" style="-webkit-transform: scale(0.2); -moz-transform: scale(0.2); opacity: 0;">
  							<img src="<%=imagePath%>/pageThree/three/right_2.png" style="float: left;">
  							<div class="txt_div">
  								<span>企业用电报表</span>
  							</div>
  						</div>
  						<div id="i_11" class="item_div" style="margin-left: 260px;-webkit-transform: scale(0.2); -moz-transform: scale(0.2); opacity: 0;">
  							<img src="<%=imagePath%>/pageThree/three/right_3.png" style="float: left;">
  							<div class="txt_div">
  								<span>企业节能建议</span>
  							</div>
  						</div>
  					</div>
  					<div id="i_9" class="img_three_div" style="opacity:0;">
  						<div class="item_div" style="float: left;margin-left: 230px;">
  							<img src="<%=imagePath%>/pageThree/three/right_line_1.png">
  						</div>
  						<div style="float: left;margin-left: 190px;">
  							<img src="<%=imagePath%>/pageThree/three/right_line_1.png">
  						</div>
  					</div>
  					<div class="content_div_2">
  						<div id="i_1" class="item_div" style="margin-left: 195px;opacity:0;-webkit-transform:translate(0px, 200px);-moz-transform:translate(0px, 200px);">
  							<img src="<%=imagePath%>/pageThree/three/right_1.png" style="float: left;width: 100%;height: 100%;">
  							<div class="txt_div" style="margin-top: 40px;">
  								<span>电量分析</span>
  							</div>
  						</div>
  						<div id="i_2" class="item_div" style="margin-left: 35px;opacity:0;-webkit-transform:translate(0px, 200px);-moz-transform:translate(0px, 200px);">
  							<img src="<%=imagePath%>/pageThree/three/right_1.png" style="float: left;width: 100%;height: 100%;">
  							<div class="txt_div" style="margin-top: 40px;">
  								<span>负荷分析</span>
  							</div>
  						</div>
  						<div id="i_3" class="item_div" style="margin-left: 35px;opacity:0;-webkit-transform:translate(0px, 200px);-moz-transform:translate(0px, 200px);">
  							<img src="<%=imagePath%>/pageThree/three/right_1.png" style="float: left;width: 100%;height: 100%;">
  							<div class="txt_div" style="margin-top: 40px;">
  								<span>电费分析</span>
  							</div>
  						</div>
  						<div id="i_4" class="item_div" style="margin-left: 35px;opacity:0;-webkit-transform:translate(0px, 200px);-moz-transform:translate(0px, 200px);">
  							<img src="<%=imagePath%>/pageThree/three/right_1.png" style="float: left;width: 100%;height: 100%;">
  							<div class="txt_div">
  								<span>用电安全分析</span>
  							</div>
  						</div>
  						<div id="i_5" class="item_div" style="margin-left: 120px;opacity:0;-webkit-transform:translate(0px, 200px);-moz-transform:translate(0px, 200px);">
  							<img src="<%=imagePath%>/pageThree/three/right_1.png" style="float: left;width: 100%;height: 100%;">
  							<div class="txt_div">
  								<span>能效诊断分析</span>
  							</div>
  						</div>
  						<div id="i_6" class="item_div" style="margin-left: 35px;opacity:0;-webkit-transform:translate(0px, 200px);-moz-transform:translate(0px, 200px);">
  							<img src="<%=imagePath%>/pageThree/three/right_1.png" style="float: left;width: 100%;height: 100%;">
  							<div class="txt_div">
  								<span>能效对比分析</span>
  							</div>
  						</div>
  						<div id="i_7" class="item_div" style="margin-left: 35px;opacity:0;-webkit-transform:translate(0px, 200px);-moz-transform:translate(0px, 200px);">
  							<img src="<%=imagePath%>/pageThree/three/right_1.png" style="float: left;width: 100%;height: 100%;">
  							<div class="txt_div">
  								<span>产品单耗分析</span>
  							</div>
  						</div>
  						<div id="i_8" class="item_div" style="margin-left: 35px;opacity:0;-webkit-transform:translate(0px, 200px);-moz-transform:translate(0px, 200px);">
  							<img src="<%=imagePath%>/pageThree/three/right_1.png" style="float: left;width: 100%;height: 100%;">
  							<div class="txt_div" style="margin-top: 40px;">
  								<span>能效考核</span>
  							</div>
  						</div>
  					</div>
  				</div>
  				<div id="b_4" class="tab_four" style="float: left;opacity:1;-webkit-transform:translate(0px, 0px);-moz-transform:translate(0px, 0px);display:none;">
  					<div>
  						<div class="bg_div" style="overflow: hidden;">
  							<div id="j_1" style="height:720px;opacity: 0;"></div>
  							<div style="background-image: url(<%=imagePath%>/pageThree/four/right_1.png);width: 500px;height: 720px;background-size: 500px 720px;background-repeat: no-repeat;"></div>
<!--   							<img src="<%=imagePath%>/pageThree/four/right_1.png" style="width: 100%;height: 100%;float: left;"> -->
  						</div>
  						<div class="content_div">
  							<div class="top_div">
  								<div id="j_2" class="item_div" style="-webkit-transform:translate(0px, -400px);-moz-transform:translate(0px, -400px); opacity: 0;">
  									<img src="<%=imagePath%>/pageThree/four/right_2.png" style="width: 100%;height: 100%;">
  									<div id="k_1" class="txt_div" style="">
  										<span>经济</span>
  									</div>
  								</div>
  								<div id="j_3" class="item_div" style="-webkit-transform:translate(0px, -400px);-moz-transform:translate(0px, -400px); opacity: 0;">
  									<img src="<%=imagePath%>/pageThree/four/right_3.png">
  									<div id="k_2" class="txt_div">
  										<span>安全</span>
  									</div>
  								</div>
  								<div id="j_4" class="item_div" style="-webkit-transform:translate(0px, -400px);-moz-transform:translate(0px, -400px); opacity: 0;">
  									<img src="<%=imagePath%>/pageThree/four/right_4.png">
  									<div id="k_3" class="txt_div">
  										<span>可靠</span>
  									</div>
  								</div>
  							</div>
  							<div class="bottom_div">
  								<div id="l_1" class="item_div" style="transform: scale(0.2); opacity: 0; margin-top: 20px; margin-left: 380px;">
  									<img src="<%=imagePath%>/pageThree/four/right_5.png" style="width: 100%;height: 100%;float: left;">
  									<div class="txt_div" style="left: 85px;">
  										<span>传统服务</span>
  									</div>
  								</div>
  								<div id="l_2" class="item_div" style="transform: scale(0.2); opacity: 0; margin-top: 10px; margin-left: 20px;">
  									<img src="<%=imagePath%>/pageThree/four/right_6.png">
  									<div class="txt_div">
  										<span>新能源服务</span>
  									</div>
  								</div>
  								<div id="l_3" class="item_div" style="transform: scale(0.2); opacity: 0; margin-top: 220px; margin-left: -580px;">
  									<img src="<%=imagePath%>/pageThree/four/right_7.png">
  									<div class="txt_div">
  										<span>信息化服务</span>
  									</div>
  								</div>
  								<div id="l_4" class="item_div" style="transform: scale(0.2); opacity: 0; margin-top: 220px; margin-left: -170px;">
  									<img src="<%=imagePath%>/pageThree/four/right_8.png">
  									<div class="txt_div" style="left: 65px;">
  										<span>能效提升服务</span>
  									</div>
  								</div>
  								<div id="l_5" class="item_div" style="transform: scale(0.2); opacity: 0; margin-top: 360px; margin-left: -445px;">
  									<img src="<%=imagePath%>/pageThree/four/right_9.png">
  									<div class="txt_div" style="left: 65px;">
  										<span>能源托管服务</span>
  									</div>
  								</div>
  							</div>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  		
<!--     	<script src="<%=jsPath%>/menu.js"></script> -->
    	<script src="<%=jsPath%>/pageThree.js"></script>
    	<script type="text/javascript" src="<%=mainPath %>/js/dateUtil.js"></script>
    	<script type="text/javascript">
    	
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
    	function qytQueryOveride(dateTime){
    		var startDay2 = $('#startDay3').val();
    		var resultDay = timeUtil(dateTime,startDay2);//DateUtil.dateAdd("d", parseInt(dateTime), DateUtil.strToDate(startDay2));//getDateByOffsetDays(startDay2,dateTime);
    		//alert(resultDay);
    		$('#startDay3').datebox('setValue',resultDay);
    		//loadDlfbPie(resultDay);
    		loadLineInfo(resultDay,$('#wnGrade').val());
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
  </body>
</html>

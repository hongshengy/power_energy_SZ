<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String mainPath = baseUrl + "/pages/despages/common";
	String mainTwoPath = baseUrl + "/pages/despages";
	String jsPath = baseUrl + "/pages/despages/showPages/js";
	String cssPath = baseUrl + "/pages/despages/showPages/css";
	String imagePath = baseUrl + "/pages/despages/showPages/images";
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>区域能源中心介绍</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
	<script src="<%=jsPath%>/echarts.min.js"></script>
<!-- 	<script src="<%=jsPath%>/mapJs/jiangyin.js"></script> -->
	
	<link rel="stylesheet" type="text/css" href="<%=mainPath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=mainPath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=mainPath %>/jquery-easyui-1.5.1/themes/color.css">
	
	<link rel="stylesheet" type="text/css" href="<%=cssPath%>/main.css" />
	<link href="<%=cssPath%>/DefaultAnimation.css" type="text/css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css" href="<%=cssPath%>/pageTwo.css" />
	
	<script type="text/javascript" src="<%=mainPath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=mainPath%>/css/jquery.range.css"/>
<!--     <script src="<%=mainPath%>/js/maskJs.js"></script> -->
	
	<script type="text/javascript">
		var basePath = "<%=basePath%>";
		var imagePath = "<%=imagePath%>";
	</script>
  </head>
  
  <body>
<!--   	<script type="text/javascript"> -->
<!--   		var maskobj = new maskPanelManager(); -->
<!-- 	    maskobj.register(); -->
<!--     </script> -->
<!-- 	<div id="menuTop"></div> -->
	<div id="mainDiv">
		<div class="left_div">
			<div id="a_1" class="txt_div">
				<span>
					本公司运营的综合能源服务中心，以云服务平台为支撑，立足于客户能源大数据的深度开发，以客户设备代维、用电智能化服务、能效提升服务、新能源服务为方向，为广大客户提供“最贴心的能源服务管家”、“4S店”式的综合能源服务，提高用户用能安全、提升效率，降低用能成本，提升用能服务的层次和品质。
				</span>
			</div>
			<div id="a_2" class="map_div" style="margin-left: 50px;">
				<div id="gisMap" style="width:700px;height:640px;"></div>
			</div>
		</div>
		<div id="toGisBtn" onclick="toGIS()" style="position: absolute;bottom: 50px;left: 50px;cursor:pointer;">
			<img src="<%=imagePath%>/pageTwo/to_gis.png">
		</div>
		<div class="right_div">
			<div>
				<div id="b_3" class="tab_one" style="opacity:1;-webkit-transform:translate(0px, 0px);-moz-transform:translate(0px, 0px);display:none;">
					<div id="c_1" class="item_div" style="background-image: url(<%=imagePath%>/pageTwo/right_one.png);margin-left: 240px;">
						<div class="title_div">
							<span>政府</span>
						</div>
						<div class="content_div">
							<span>安全用电、节约用电、环保用电 <br>绿色用电、智能用电、有序用电 </span>
						</div>
					</div>
					<div id="d_1" class="line_div" style="background-image: url(<%=imagePath%>/pageTwo/right_two.png);margin-left: 220px;">
						<div class="line_txt" style="transform: rotateZ(300deg);top: -60px;left: -80px;-wekit-transform:rotateZ(300deg);">
							<span>引导支持</span>
						</div>
						<div class="line_txt" style="transform: rotateZ(60deg);top: 140px;left: 215px;-wekit-transform:rotateZ(300deg);">
							<span>市场开放</span>
						</div>
					</div>
					<div>
						<div id="c_2" class="item_div" style="background-image: url(<%=imagePath%>/pageTwo/right_four.png);float: left;margin-left: 20px;">
							<div class="title_div" style="margin-left: 20px;margin-top: 150px;">
 							<span>综合能源服务中心</span>
 						</div>
 						<div class="content_div" style="margin-top: 22px;">
 							<span>拓展业务范围、提高企业效益 </span>
 						</div>
						</div>
						<div id="d_2" class="line_h_div" style="background-image: url(<%=imagePath%>/pageTwo/right_three.png);">
							<div class="line_txt">
 							<span>硬件改造</span>
 						</div>
 						<div class="line_txt">
 							<span>优质服务</span>
 						</div>
						</div>
						<div id="c_3" class="item_div" style="background-image: url(<%=imagePath%>/pageTwo/right_five.png);float: left;margin-left: 115px;">
							<div class="title_div" style="margin-top: 150px;">
 							<span>客户</span>
 						</div>
 						<div class="content_div" style="margin-top: 22px;">
 							<span>降低运维成本、提高用电质量 </span>
 						</div>
						</div>
					</div>
				</div>
				<div id="b_1" class="tab_two" style="opacity:1;-webkit-transform:translate(0px, 0px);-moz-transform:translate(0px, 0px);display:none;">
					<div class="m_div">
						<div class="item_div" style="top: 200px;">
							<div id="f_1" class="title_div" style="margin-top: 130px;background-image: url(<%=imagePath%>/pageTwo/right_1.png);-webkit-transform:scale(0.2);-moz-transform:scale(0.2);opacity:0;">
								<div style="margin-top: 135px;display: inline-block;">
									<span>传统服务</span>
								</div>
							</div>
							<div id="h_1" class="content_div" style="margin-top: -15px;background-image: url(<%=imagePath%>/pageTwo/right_6.png);opacity:0;">
								<div style="display: inline-block;margin-top: 80px;">
									<span>电气设备运行服务<br>设备电气试验服务<br>电力设备抢修服务<br>用电咨询服务</span>
								</div>
							</div>
						</div>
						<div class="item_div" style="left: 190px;">
							<div id="h_2" style="opacity:0;">
								<div></div>
								<div class="content_div" style="margin-top: 80px;background-image: url(<%=imagePath%>/pageTwo/right_7.png);">
									<div style="display: inline-block;margin-top: 120px;">
										<span>用电预警服务<br>用户电费管控服务<br>用电报表服务<br>用电谐波监测服务</span>
									</div>								
								</div>
							</div>
							<div id="f_2" class="title_div" style="margin-top: -15px;background-image: url(<%=imagePath%>/pageTwo/right_2.png);-webkit-transform:scale(0.2);-moz-transform:scale(0.2);opacity:0;">
								<div style="margin-top: 130px;display: inline-block;">
									<span>信息化服务</span>
								</div>
							</div>
						</div>
						<div class="item_div" style="top: 200px;left: 380px;">
							<div id="f_3"  class="title_div" style="margin-top: 130px;background-image: url(<%=imagePath%>/pageTwo/right_3.png);-webkit-transform:scale(0.2);-moz-transform:scale(0.2);opacity:0;">
								<div style="margin-top: 130px;display: inline-block;">
									<span>能效提升服务</span>
								</div>
							</div>
							<div id="h_3" class="content_div" style="margin-top: -15px;background-image: url(<%=imagePath%>/pageTwo/right_8.png);opacity:0;">
								<div style="display: inline-block;margin-top: 80px;">
									<span>企业能效在线评估<br>电力设备能效分析<br>能效诊断服务<br>节能与电能替代项目管理</span>
								</div>
							</div>
						</div>
						<div class="item_div" style="left: 570px;">
							<div id="h_4" style="opacity:0;">
								<div></div>
								<div class="content_div" style="margin-top: 80px;background-image: url(<%=imagePath%>/pageTwo/right_9.png);">
									<div style="display: inline-block;margin-top: 160px;">
										<span>光伏业务 <br>电动汽车充电设施建设 <br>储能业务  </span>
									</div>			
								</div>
							</div>
							<div id="f_4" class="title_div" style="margin-top: -15px;background-image: url(<%=imagePath%>/pageTwo/right_4.png);-webkit-transform:scale(0.2);-moz-transform:scale(0.2);opacity:0;">
								<div style="margin-top: 130px;display: inline-block;">
									<span>新能源服务</span>
								</div>
							</div>
						</div>
						<div class="item_div" style="left: 760px;top: 200px;">
							<div id="f_5" class="title_div" style="margin-top: 125px;background-image: url(<%=imagePath%>/pageTwo/right_5.png);-webkit-transform:scale(0.2);-moz-transform:scale(0.2);opacity:0;">
								<div style="margin-top: 130px;display: inline-block;">
									<span>能源托管服务</span>
								</div>
							</div>
							<div id="h_5" class="content_div" style="margin-top: -15px;background-image: url(<%=imagePath%>/pageTwo/right_10.png);opacity:0;">
								<div style="display: inline-block;margin-top: 80px;">
									<span>多能互补，冷、热、水、<br>电、气为一体的集<br>中式能源托管服务</span>
								</div>						
							</div>
						</div>
					</div>
				</div>
				<div id="b_2" class="tab_three" style="opacity:1;-webkit-transform:translate(0px, 0px);-moz-transform:translate(0px, 0px);">
					<div id="g_1" class="item_div" style="opacity:0;-webkit-transform:translate(400px, 0px);-moz-transform:translate(400px, 0px);">
  						<div class="name_div">
  							<span>实时负荷：</span>
  						</div>
  						<div class="num_div" style="color:#FF7010">
  							<span id="z_30"></span>
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
  							<span id="z_31"></span>
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
  							<span id="z_3"></span>
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
  							<span id="z_4"></span>
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
  							<span id="z_5"></span>
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
  							<span id="z_6"></span>
  						</div>
  						<div class="icon_div">
  							<img src="<%=imagePath%>/pageThree/one/right_6.png">
  						</div>
  						<div class="unit_div">
  							<span>座</span>
  						</div>
  					</div>
<!--   					<div id="g_7" class="item_div" style="opacity:0;-webkit-transform:translate(400px, 0px);-moz-transform:translate(400px, 0px);"> -->
<!--   						<div class="name_div"> -->
<!--   							<span>工单服务数：</span> -->
<!--   						</div> -->
<!--   						<div class="num_div"> -->
<!--   							<span id="z_7">1</span> -->
<!--   						</div> -->
<!--   						<div class="icon_div"> -->
<!--   							<img src="<%=imagePath%>/pageThree/one/right_7.png"> -->
<!--   						</div> -->
<!--   						<div class="unit_div"> -->
<!--   							<span>条</span> -->
<!--   						</div> -->
<!--   					</div> -->
  					<div id="g_8" class="item_div" style="opacity:0;-webkit-transform:translate(-400px, 0px);-moz-transform:translate(-400px, 0px);">
  						<div class="name_div">
  							<span>测点数：</span>
  						</div>
  						<div class="num_div">
  							<span id="z_8"></span>
  						</div>
  						<div class="icon_div">
  							<img src="<%=imagePath%>/pageThree/one/right_8.png">
  						</div>
  						<div class="unit_div">
  							<span>个</span>
  						</div>
  					</div>
				</div>
			</div>
			<div id="e_1" class="btn_p_div" style="width: 100%;height: 150px;cursor:pointer;" onClick="btnMainClick()">
				<div class="btn_div" style="background:#00BE28;margin-left: 450px;" onClick="btnClick(0)"></div>
				<div class="btn_div" style="margin-left:38px;" onClick="btnClick(1)"></div>
				<div class="btn_div" style="margin-left:38px;" onClick="btnClick(2)"></div>
			</div>
		</div>
	</div>
   	
<!--    	<script src="<%=jsPath%>/menu.js"></script> -->
	<script type="text/javascript"
		src="http://api.map.baidu.com/api?v=2.0&ak=CWy7fv2qnIgddvauxx3l2q8p1rSdWKFC"></script>
	<script type="text/javascript" 
		src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>
	<script type="text/javascript" 
		src="http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>
   	<script type="text/javascript" src="<%=jsPath%>/pageTwo.js"></script>
   	<script type="text/javascript" src="<%=mainPath%>/js/map.js"></script>
   	
  </body>
</html>

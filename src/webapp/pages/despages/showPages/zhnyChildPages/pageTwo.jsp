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
    
    <title>平台介绍</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
	<script src="<%=jsPath%>/echarts.min.js"></script>
<!-- 	<script src="<%=jsPath%>/mapJs/jiangyin.js"></script> -->
	
	<link rel="stylesheet" type="text/css" href="<%=cssPath%>/main.css" />
	<link href="<%=cssPath%>/DefaultAnimation.css" type="text/css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css" href="<%=cssPath%>/pageTwo.css" />
	
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
					建设“全省集中、标准统一、资源聚合、数据共享”的客户能源数据中心，实现对各类客户水气热以及用电数据的实时采集，实现对分布式电源、电动汽车、智能家居、储能等数据采集，聚合社会数据资源。为政府提供能源消费基础数据，预测社会经济发展趋势；为企业提供全面能效分析，助力节能降耗节约成本；为公司拓展能效服务领域，巩固电力市场。
				</span>
			</div>
			<div id="a_2" class="map_div">
				<div id="mapChart" style="width:690px;height:640px;"></div>
			</div>
		</div>
		<div id="toGisBtn" onclick="toGIS()" style="position: absolute;bottom: 120px;left: 100px;cursor:pointer;">
			<img src="<%=imagePath%>/pageTwo/to_gis.png">
		</div>
		<div class="right_div">
			<div>
				<div id="b_2" class="tab_two" style="opacity:1;-webkit-transform:translate(0px, 0px);-moz-transform:translate(0px, 0px);">
					<div class="m_div">
						<div class="item_div" style="top: 200px;">
							<div id="f_1" class="title_div" style="margin-top: 130px;background-image: url(<%=imagePath%>/pageTwo/right_1.png);-webkit-transform:scale(0.2);-moz-transform:scale(0.2);opacity:0;">
								<div style="margin-top: 125px;display: inline-block;">
									<span>数据采集云平台</span>
								</div>
							</div>
							<div id="h_1" class="content_div" style="margin-top: -15px;background-image: url(<%=imagePath%>/pageTwo/right_6.png);opacity:0;">
								<div style="display: inline-block;margin-top: 80px;">
									<span>对分布式电源、电<br>动汽车、智能家居、<br>储能等设备数据的<br>通信与采集</span>
								</div>
							</div>
						</div>
						<div class="item_div" style="left: 190px;">
							<div id="h_2" style="opacity:0;">
								<div></div>
								<div class="content_div" style="margin-top: 80px;background-image: url(<%=imagePath%>/pageTwo/right_7.png);">
									<div style="display: inline-block;margin-top: 120px;">
										<span>实现业务数据、基<br>础档案等各类数据<br>的抽取、清洗、整<br>合与存储</span>
									</div>								
								</div>
							</div>
							<div id="f_2" class="title_div" style="margin-top: -15px;background-image: url(<%=imagePath%>/pageTwo/right_2.png);-webkit-transform:scale(0.2);-moz-transform:scale(0.2);opacity:0;">
								<div style="margin-top: 125px;display: inline-block;">
									<span>数据云存储中心</span>
								</div>
							</div>
						</div>
						<div class="item_div" style="top: 200px;left: 380px;">
							<div id="f_3"  class="title_div" style="margin-top: 130px;background-image: url(<%=imagePath%>/pageTwo/right_3.png);-webkit-transform:scale(0.2);-moz-transform:scale(0.2);opacity:0;">
								<div style="margin-top: 125px;display: inline-block;">
									<span>大数据分析引擎</span>
								</div>
							</div>
							<div id="h_3" class="content_div" style="margin-top: -15px;background-image: url(<%=imagePath%>/pageTwo/right_8.png);opacity:0;">
								<div style="display: inline-block;margin-top: 80px;">
									<span>实现用户用能诊断<br>分析、企业能效评<br>估、用能预测、能<br>源交易仿真等计算<br>分析</span>
								</div>
							</div>
						</div>
						<div class="item_div" style="left: 570px;">
							<div id="h_4" style="opacity:0;">
								<div></div>
								<div class="content_div" style="margin-top: 80px;background-image: url(<%=imagePath%>/pageTwo/right_9.png);">
									<div style="display: inline-block;margin-top: 200px;">
										<span>实现能源大数据的<br>统一数据共享接口</span>
									</div>			
								</div>
							</div>
							<div id="f_4" class="title_div" style="margin-top: -15px;background-image: url(<%=imagePath%>/pageTwo/right_4.png);-webkit-transform:scale(0.2);-moz-transform:scale(0.2);opacity:0;">
								<div style="margin-top: 125px;display: inline-block;">
									<span>数据共享服务</span>
								</div>
							</div>
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
   	<script src="<%=jsPath%>/pageTwo.js"></script>
  </body>
</html>

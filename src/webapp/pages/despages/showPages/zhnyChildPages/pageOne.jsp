<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String mainCssPath = baseUrl + "/pages/despages/common";
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
    
    <title>系统架构</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="<%=cssPath%>/main.css" />
	<link href="<%=cssPath%>/DefaultAnimation.css" type="text/css" rel="stylesheet" />
	<link rel="stylesheet" type="text/css" href="<%=cssPath%>/pageOne.css" />
	<script type="text/javascript">
	var imagePath = "<%=imagePath%>";
	</script>
  </head>
  
  <body>
<!-- 	<div id="menuTop"></div> -->
   	<div id="mainDiv">
		<div class="left_div">
			<div class="item_div">
				<div id="a_1" class="icon_div">
					<img src="<%=imagePath%>/pageOne/left_one.png" />
				</div>
				<div id="b_1" class="txt_p_div">
					<div class="title_div">
						<span>云主站</span>
					</div>
					<div class="content_div">
						<span>实现能效、节电等分析，支持居民柔性负荷、分布式发电、储能装<br />
							  置等交互，支持电价和激励机制套餐；分析响应时间小于5s </span>
					</div>
				</div>
			</div>
			<div class="item_div">
				<div id="a_2" class="icon_div">
					<img src="<%=imagePath%>/pageOne/left_two.png" />
				</div>
				<div id="b_2" class="txt_p_div">
					<div class="title_div">
						<span>采集云平台 </span>
					</div>
					<div class="content_div">
						<span>提升用电信息采集能力，完善数据采集标准 </span>
					</div>
				</div>
			</div>
			<div class="item_div">
				<div id="a_3" class="icon_div">
					<img src="<%=imagePath%>/pageOne/left_three.png" />
				</div>
				<div id="b_3" class="txt_p_div">
					<div class="title_div">
						<span>采集终端 </span>
					</div>
					<div class="content_div">
						<span>含用电特性分析、可靠性分析、可调度潜力评估、资源优化分配、<br />
						       价格机制模块；实现百万规模用户供需互动仿真；离线计算时间
						<br />小于1min</span>
					</div>
				</div>
			</div>
			<div class="item_div">
				<div id="a_4" class="icon_div">
					<img src="<%=imagePath%>/pageOne/left_four.png" />
				</div>
				<div id="b_4" class="txt_p_div">
					<div class="title_div">
						<span>用能用户</span>
					</div>
					<div class="content_div">
						<span>江苏省苏州环金鸡湖地区和常州武进地区，两个示范区各有特色，<br />
							  分属国家发改委首批需求侧管理试点城市和江苏省智慧能源示范区<br />
							  ，示范区累计常驻人口238万，互动家庭用户11万户 </span>
					</div>
				</div>
			</div>
			
		</div>
		<div class="right_div" style="margin-bottom: 50px;">
			<div id="c_2" class="item_div" >
				<div class="txt_p_div">
					<div id="d_4" class="txt_item_div" style="margin-left: 280px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_4.png">
						</div>
						<div class="txt_div">
							<span>运营应用服务</span>
						</div>
					</div>
					<div id="d_5" class="txt_item_div" style="margin-left: 50px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_5.png">
						</div>
						<div class="txt_div">
							<span>数据存储</span>
						</div>
					</div>
					<div id="d_6" class="txt_item_div" style="margin-left: 50px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_6.png">
						</div>
						<div class="txt_div">
							<span>数据汇聚</span>
						</div>
					</div>
				</div>
			</div>
			
			
			<div id="c_3" class="item_div">
				<div class="txt_p_div">
					<div id="d_7" class="txt_item_div" style="margin-left: 210px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_7.png">
						</div>
						<div class="txt_div">
							<span>网荷互动采集</span>
						</div>
					</div>
					<div id="d_8" class="txt_item_div" style="margin-left: 30px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_8.png">
						</div>
						<div class="txt_div">
							<span>负荷控制管理</span>
						</div>
					</div>
					<div id="d_9" class="txt_item_div" style="margin-left: 30px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_9.png">
						</div>
						<div class="txt_div">
							<span>用电信息采集</span>
						</div>
					</div>
					<div id="d_10" class="txt_item_div" style="margin-left: 30px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_10.png">
						</div>
						<div class="txt_div">
							<span>其他数据采集</span>
						</div>
					</div>
				</div>
			</div>
			<div id="c_4" class="item_div">
				<div  class="txt_p_div">
					<div id="d_11" class="txt_item_div" style="margin-left: 210px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_11.png">
						</div>
						<div class="txt_div">
							<span>负控终端</span>
						</div>
					</div>
					<div id="d_12" class="txt_item_div" style="margin-left: 20px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_12.png">
						</div>
						<div class="txt_div">
							<span>集抄终端</span>
						</div>
					</div>
					<div id="d_13" class="txt_item_div" style="margin-left: 20px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_13.png">
						</div>
						<div class="txt_div">
							<span>源网荷互动终端</span>
						</div>	
					</div>
					<div id="d_14" class="txt_item_div" style="margin-left: 20px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_14.png">
						</div>
						<div class="txt_div">
							<span>智能家居</span>
						</div>
					</div>
					<div id="d_15" class="txt_item_div" style="margin-left: 20px;">
						<div  class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_15.png">
						</div>
						<div class="txt_div">
							<span>负荷辨识终端</span>
						</div>	
					</div>
				</div>
			</div>
			
			<div id="c_1" class="item_div" margin-top: 30px;">
				<div class="txt_p_div">
					<div id="d_1" class="txt_item_div" style="margin-left: 150px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_1.png">
						</div>
						<div class="txt_div">
							<span>居民用户</span>
						</div>
					</div>
					<div id="d_2" class="txt_item_div">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_2.png">
						</div>
						<div class="txt_div">
							<span>工商业用户</span>
						</div>
					</div>
					<div id="d_3" class="txt_item_div">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_3.png">
						</div>
						<div class="txt_div">
							<span>大用户</span>
						</div>
					</div>
					<div id="d_4" class="txt_item_div" >
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_3.png">
						</div>
						<div class="txt_div">
							<span>分布式能源</span>
						</div>
					</div>
					<div id="d_5" class="txt_item_div" >
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_3.png">
						</div>
						<div class="txt_div">
							<span>储能</span>
						</div>
					</div>
					<div id="d_6" class="txt_item_div" >
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_3.png">
						</div>
						<div class="txt_div">
							<span>充电桩</span>
						</div>
					</div>
				</div>
			</div>
		</div>
   	</div>
    	
<!--     	<script src="<%=jsPath%>/menu.js"></script> -->
  </body>
</html>

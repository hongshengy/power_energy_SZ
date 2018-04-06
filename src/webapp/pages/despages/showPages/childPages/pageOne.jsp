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
    
    <title>系统介绍</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/color.css">
	
	<script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="<%=mainCssPath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
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
						<span>专业的运维托管服务 </span>
					</div>
					<div class="content_div">
						<span>解决企业电工不足、用人成本高昂、运维管理水平差的痛点，实现规<br />范管理、实时预警、快速抢修，有效提升企业满意度 </span>
					</div>
				</div>
			</div>
			<div class="item_div">
				<div id="a_2" class="icon_div">
					<img src="<%=imagePath%>/pageOne/left_two.png" />
				</div>
				<div id="b_2" class="txt_p_div">
					<div class="title_div">
						<span>高效的用能管理服务 </span>
					</div>
					<div class="content_div">
						<span>实现企业用能数据采集、监测与分析，开展超容分析、功率因数越限<br />管理，帮助用户了解用能情况，降低用能成本 </span>
					</div>
				</div>
			</div>
			<div class="item_div">
				<div id="a_3" class="icon_div">
					<img src="<%=imagePath%>/pageOne/left_three.png" />
				</div>
				<div id="b_3" class="txt_p_div">
					<div class="title_div">
						<span>行业大数据分析服务 </span>
					</div>
					<div class="content_div">
						<span>海量用采数据的积累，我们可以提供全省同行业用能变化情况、上下<br />游产业链用能变化情况、同行业平均电价成本等大数据分析成果，为<br />用户决策提供有效依据</span>
					</div>
				</div>
			</div>
			<div class="item_div">
				<div id="a_4" class="icon_div">
					<img src="<%=imagePath%>/pageOne/left_four.png" />
				</div>
				<div id="b_4" class="txt_p_div">
					<div class="title_div">
						<span>全面的可选增值服务 </span>
					</div>
					<div class="content_div">
						<span>中心系统不仅为用户提供基础运维、用能监测服务，还提供用能分析、<br />用能评估等增值服务，开展用能设备诊断、企业用能分析报告，提高<br />用能效率，提升用户用能质量
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="right_div">
			<div id="c_1" class="item_div" style="background-image: url(<%=imagePath%>/pageOne/right_one.png);margin-top: 30px;">
				<div class="txt_p_div">
					<div id="d_1" class="txt_item_div" style="margin-left: 280px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_1.png">
						</div>
						<div class="txt_div">
							<span>多元化客户</span>
						</div>
					</div>
					<div id="d_2" class="txt_item_div" style="margin-left: 50px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_2.png">
						</div>
						<div class="txt_div">
							<span>多重化渠道</span>
						</div>
					</div>
					<div id="d_3" class="txt_item_div" style="margin-left: 50px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_3.png">
						</div>
						<div class="txt_div">
							<span>多样化服务</span>
						</div>
					</div>
				</div>
			</div>
			<div id="c_2" class="item_div" style="background-image: url(<%=imagePath%>/pageOne/right_two.png);">
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
			<div id="c_3" class="item_div" style="background-image: url(<%=imagePath%>/pageOne/right_three.png);">
				<div class="txt_p_div">
					<div id="d_7" class="txt_item_div" style="margin-left: 210px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_7.png">
						</div>
						<div class="txt_div">
							<span>能效提升</span>
						</div>
					</div>
					<div id="d_8" class="txt_item_div" style="margin-left: 30px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_8.png">
						</div>
						<div class="txt_div">
							<span>运维托管</span>
						</div>
					</div>
					<div id="d_9" class="txt_item_div" style="margin-left: 30px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_9.png">
						</div>
						<div class="txt_div">
							<span>用能诊断</span>
						</div>
					</div>
					<div id="d_10" class="txt_item_div" style="margin-left: 30px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_10.png">
						</div>
						<div class="txt_div">
							<span>考核对标</span>
						</div>
					</div>
				</div>
			</div>
			<div id="c_4" class="item_div" style="background-image: url(<%=imagePath%>/pageOne/right_four.png);">
				<div  class="txt_p_div">
					<div id="d_11" class="txt_item_div" style="margin-left: 210px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_11.png">
						</div>
						<div class="txt_div">
							<span>一次设备</span>
						</div>
					</div>
					<div id="d_12" class="txt_item_div" style="margin-left: 20px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_12.png">
						</div>
						<div class="txt_div">
							<span>二次设备</span>
						</div>
					</div>
					<div id="d_13" class="txt_item_div" style="margin-left: 20px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_13.png">
						</div>
						<div class="txt_div">
							<span>专项用能设备</span>
						</div>	
					</div>
					<div id="d_14" class="txt_item_div" style="margin-left: 20px;">
						<div class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_14.png">
						</div>
						<div class="txt_div">
							<span>视频设备</span>
						</div>
					</div>
					<div id="d_15" class="txt_item_div" style="margin-left: 20px;">
						<div  class="icon_div">
							<img src="<%=imagePath%>/pageOne/right_15.png">
						</div>
						<div class="txt_div">
							<span>安防设备</span>
						</div>	
					</div>
				</div>
			</div>
		</div>
   	</div>
    	
<!--     	<script src="<%=jsPath%>/menu.js"></script> -->
  </body>
</html>

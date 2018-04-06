<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
	String pagePath = baseUrl + "/pages/despages/common";
	String treePagePath = baseUrl + "/pages/areaEnergy/common";
	String imagePath = baseUrl + "/pages/despages/showPages/images";

	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<title>综合能源总览</title>
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/icon.css">
<link rel="stylesheet" href="<%=pagePath%>/jquery-easyui-1.5.1/themes/color.css">
<link rel="stylesheet" href="<%=pagePath%>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
<link rel="stylesheet" href="<%=treePagePath%>/css/tree.css">
<script src="<%=pagePath%>/js/maskJs.js"></script>
<style type="text/css">
.left_item{
font-size: 16px;
}
.left_item label{
font-size: 20px;
font-weight: bold;
color: #323232;
}
.left_item >div{
#border: #D0D0D0 solid 1px;
border-radius: 5px;
background: #F5F5F5;
line-height:20px;
font-size:18px;
#margin:5px;
padding:5px;
}
.btn_div {
    height: 16px;
    width: 16px;
    border-radius: 16px;
    background: #BFBFBF;
    float: left;
    cursor: pointer;
    margin-top: 30px;
}
</style>
</head>

<body class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>

	<div class="main-panel noOverflow"  data-options="region:'center',border:false">
		<div style="position:absolute;left:10px;right:10px;top:10px;bottom:10px;">
			<!-- 上侧数据 -->
			<div style="position:absolute;left:10px;right:10px;top:10px;bottom:90%;">
				<div class="left_item">
<!-- 					<label>接入状况</label> -->
					<div >
						<div id="areaNum" style="width: 24%;display: inline-block;">中心数:</div>
						<div id="consNum" style="width: 24%;display: inline-block;">建档客户数:</div>
						<div id="olConsNum" style="width: 24%;display: inline-block;">采集客户数:</div>
						<div id="subsNum" style="width: 24%;display: inline-block;">变电站数:</div>
					</div>
					<div >
						<div id="tranNum" style="width: 24%;display: inline-block;">主变台数:</div>
						<div id="tranSum" style="width: 24%;display: inline-block;">主变总容量:</div>
						<div id="mpNum" style="width: 24%;display: inline-block;">测点数:</div>
					</div>
				</div>
			</div>
			<!-- 第一页图表 -->
			<div id="middlePage1" style="position:absolute;left:10px;right:10px;top:10%;bottom:10%;background-color:#fff;margin-top:5px;">
				<!-- 图一 左上-->
				<div style="position:absolute;width:50%;height:50%;">
					<div style="line-height:20px;font-size:18px;color:rgb(255, 152, 56);font-weight: bold;text-align: center;">负荷曲线</div>
					<div style="margin-top: 5px;margin-left: 50px;">
						<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
              				<a onclick="" id="left" href="javascript:qytQueryOveride(1, '-1');" style="border-style:none;"> 
              				 	<img alt="前一天" src="<%=request.getContextPath()%>/images/tools-moveleft.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
						 	</a>
              			</span> 
                        <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;width:100px;" data-options="editable:false" id="echart1_dataDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:selectZHNYZLqyfhqx,isShowClear:false,readOnly:true})"/>
						</span>
						<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							<a onclick="" id="right" href="javascript:qytQueryOveride(1, '1');" style="border-style:none;"> 
								<img alt="后一天" src="<%=request.getContextPath()%>/images/tools-moveright.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
							</a>
						</span>
					</div>
					<div style="position:absolute;left:10px;right:10px;top:45px;bottom:0px;">
						<div id="echart1" style="width:100%;height:100%"></div>
					</div>
				</div>
				<!-- 图二 右上-->
				<div style="position:absolute;left:50%;width:50%;height:50%;">
					<div style="line-height:20px;font-size:18px;color:rgb(255, 152, 56);font-weight: bold;text-align: center;">总用电量</div>
					<div style="margin-top: 5px;margin-left: 50px;">
                        <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;width:100px;" data-options="editable:false" id="echart2_startDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
						</span>
						<span style="position:relative;top:2px;left:5px;">至</span>
                        <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;width:100px;" data-options="editable:false" id="echart2_endDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
						</span>
						<span style="position:relative;top:2px;">
							<a href="#" style="height:22px;" class="easyui-linkbutton c100 shadow" onclick="selectZHNYZLqyqyzydl();">查询</a>
						</span>
					</div>
					<div style="position:absolute;left:10px;right:10px;top:45px;bottom:0px;">
						<div id="echart2" style="width:100%;height:100%"></div>
					</div>
				</div>
				<!-- 图三 左下-->
				<div style="position:absolute;top:50%;width:50%;height:50%;">
					<div style="line-height:20px;font-size:18px;color:rgb(255, 152, 56);font-weight: bold;text-align: center;">客户分布统计图</div>
					<div style="position:absolute;left:10px;right:10px;top:20px;bottom:0px;">
						<div id="echart3" style="width:100%;height:100%"></div>
					</div>
				</div>
				<!-- 图四 右下 -->
				<div style="position:absolute;top:50%;left:50%;width:50%;height:50%;">
					<div style="line-height:20px;font-size:18px;color:rgb(255, 152, 56);font-weight: bold;text-align: center;">区域日用电排名</div>
					<div style="margin-top: 5px;margin-left: 50px;">
						<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
              				<a onclick="" id="left" href="javascript:qytQueryOveride(2, '-1');" style="border-style:none;"> 
              				 	<img alt="前一天" src="<%=request.getContextPath()%>/images/tools-moveleft.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
						 	</a>
              			</span> 
                        <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;width:100px;" data-options="editable:false" id="echart4_dataDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:selectZHNYZLkhydpm,isShowClear:false,readOnly:true})"/>
						</span>
						<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
							<a onclick="" id="right" href="javascript:qytQueryOveride(2, '1');" style="border-style:none;"> 
								<img alt="后一天" src="<%=request.getContextPath()%>/images/tools-moveright.gif" height="14px" width="14px" style="border-style:none;vertical-align: middle;">
							</a>
						</span>
					</div>
					<div style="position:absolute;left:10px;right:10px;top:45px;bottom:0px;">
						<div id="echart4" style="width:100%;height:100%"></div>
					</div>
				</div>
			</div>
			<!-- 第二页图表 -->
			<div id="middlePage2" style="position:absolute;left:10px;right:10px;top:10%;bottom:10%;background-color:#fff;margin-top:5px;display:none;">
				<!-- 图五 左上-->
				<div style="position:absolute;width:50%;height:50%;">
					<div style="line-height:20px;font-size:18px;color:rgb(255, 152, 56);font-weight: bold;text-align: center;">区域告警排名</div>
					<div style="margin-top: 5px;margin-left: 50px;">
                        <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;width:100px;" data-options="editable:false" id="echart5_startDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
						</span>
						<span style="position:relative;top:2px;left:5px;">至</span>
                        <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;width:100px;" data-options="editable:false" id="echart5_endDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
						</span>
						<span style="position:relative;top:2px;">
							<a href="#" style="height:22px;" class="easyui-linkbutton c100 shadow" onclick="selectZHNYZLqygjpm();">查询</a>
						</span>
					</div>
					<div style="position:absolute;left:10px;right:10px;top:45px;bottom:0px;">
						<div id="echart5" style="width:100%;height:100%"></div>
					</div>
				</div>
				<!-- 图八 右上-->
				<div style="position:absolute;left:50%;width:50%;height:50%;">
					<div style="line-height:20px;font-size:18px;color:rgb(255, 152, 56);font-weight: bold;text-align: center;">区域告警（终端）排名</div>
					<div style="margin-top: 5px;margin-left: 50px;">
                        <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;width:100px;" data-options="editable:false" id="echart8_startDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
						</span>
						<span style="position:relative;top:2px;left:5px;">至</span>
                        <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;width:100px;" data-options="editable:false" id="echart8_endDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
						</span>
						<span style="position:relative;top:2px;">
							<a href="#" style="height:22px;" class="easyui-linkbutton c100 shadow" onclick="selectZHNYZLqygjzdpm();">查询</a>
						</span>
					</div>
					<div style="position:absolute;left:10px;right:10px;top:45px;bottom:0px;">
						<div id="echart8" style="width:100%;height:100%"></div>
					</div>
				</div>
				<!-- 图七 左下-->
				<div style="position:absolute;top:50%;width:50%;height:50%;">
					<div style="line-height:20px;font-size:18px;color:rgb(255, 152, 56);font-weight: bold;text-align: center;">区域终端在线率排名</div>
					<div style="position:absolute;left:10px;right:10px;top:20px;bottom:0px;">
						<div id="echart7" style="width:100%;height:100%"></div>
					</div>
				</div>
				<!-- 图六 右下 -->
				<div style="position:absolute;top:50%;left:50%;width:50%;height:50%;">
					<div style="line-height:20px;font-size:18px;color:rgb(255, 152, 56);font-weight: bold;text-align: center;">区域工单排名</div>
					<div style="margin-top: 5px;margin-left: 50px;">
                        <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;width:100px;" data-options="editable:false" id="echart6_startDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
						</span>
						<span style="position:relative;top:2px;left:5px;">至</span>
                        <span class="tools-labelgroup" style="vertical-align:middle;">
                            <input type="text" class="Wdate" style="text-align: left;width:100px;" data-options="editable:false" id="echart6_endDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,readOnly:true})"/>
						</span>
						<span style="position:relative;top:2px;">
							<a href="#" style="height:22px;" class="easyui-linkbutton c100 shadow" onclick="selectZHNYZLqygdpm();">查询</a>
						</span>
					</div>
					<div style="position:absolute;left:10px;right:10px;top:45px;bottom:0px;">
						<div id="echart6" style="width:100%;height:100%"></div>
					</div>
				</div>
			</div>
			<div id="e_1" style="text-align: center;position:absolute;left:10px;right:10px;top:90%;bottom:10px;height: 50px;">
				<div style="position:absolute;left:50%;">
					<div id="img1" class="btn_div" style="position:relative;left:-16px; background:#00BE28;" onClick="btnClick(1)"></div>
					<div id="img2" class="btn_div" onClick="btnClick(2)"></div>
				</div>
<!-- 				<div class="btn_div" style="margin-left:38px;" onClick="btnClick(2)"></div> -->
			</div>
		</div>
		
	</div>

<script type="text/javascript">
	webContextRoot="<%=basePath%>";
	consId = "<%=consId%>";
	consName = "<%=consName%>";
</script>

<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath%>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script src="<%=pagePath%>/js/common.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/jQuery.resizeEnd.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echarts.min.js"></script>
<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
<script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
<script src="<%=pagePath%>/js/templet_common.js"></script>
<script type="text/javascript" src="zhnyzl.js"></script>
</body>
</html>

<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String itemCode = request.getParameter("itemCode");
String itemName = request.getParameter("itemName");
String areaNo = request.getParameter("areaNo");

UserInfo info = (UserInfo)session.getAttribute("userInfo");
Long loginUserId = info.getUserId();//登录人编码
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
	<head>
		<base href="<%=basePath%>">
		<title> </title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<jsp:include page="/ext.jsp"/>
		
	    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
	    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
	    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
	    <link rel="stylesheet" type="text/css" href="<%= basePath%>/js/FileField/file-upload.css"/>
	    
	    <script src="<%=pagePath %>/js/maskJs.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/FileField/FileUploadField.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/FileField/HtmlEditor.js"></script>
	</head>
	
	<body onload="loadContent()">
			<div style="padding: 15px;" >
				<div>
					<img style="height:100px;width:100px;vertical-align:bottom;" src="/des/images/logoHelp.png">
					<span style="font-size: 36px;font-family: '微软雅黑';color:#272727;vertical-align:bottom;margin-left:10px;">
						<span id="areaName"> </span><span 
							style="color:#537fe9"> - 在线帮助</span>
					</span>
				</div>
				<div style="margin-top: 20px; border-top:1px solid #ccc">
				</div>
			</div>
			<div>
				<table style="width: 100%">
					<tbody>
						<tr>
							<td style="width: 80%"><span>&nbsp;&nbsp;在线帮助</span><span> - </span><span style="color:#333;" id="tabName"></span></td>
							<td style="width: 20%;text-align:right;">
								<span id="btn_edit">
								    <a id="qyny" href="<%=basePath%>upLoads/qynyyhsc/区域能源服务中心运行管理系统_用户手册V1.0.pdf" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" download="区域能源用户手册" > </a>
									<img style="vertical-align:middle;" src="<%=basePath%>/images/edit.png"/>
									<a id="canOnlineHelp" style="vertical-align:middle; margin-left:10px" href="javascript:void(0)" onclick="javascript:gdgl_openDetailDialog()">编辑</a>
									<a style="vertical-align:middle;" >&nbsp;&nbsp;</a>
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style="padding: 15px;">
				<div id="contentArea" style="overflow-y:scroll;padding:10px;border: 1px solid #ccc;height: 400px;">
				</div>	
			</div>
   </body>
	
	<script type="text/javascript">
				webContextRoot="<%=basePath%>";
				itemCode="<%=itemCode%>";
				itemName="<%=itemName%>";
				loginUserId = "<%=loginUserId%>";
				areaNo="<%=areaNo%>";
				
	</script>
	 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
	 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	 <script src="<%=pagePath %>/js/common.js"></script>
	 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
	 
	 <script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
	 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
	 <script type="text/javascript" src="<%=baseUrl%>/pages/system/help.js"></script>
	 <script>
	 	$(window).resize(function(){
	 		console.log(document.documentElement.offsetHeight);
	 		$('#contentArea').height(document.documentElement.offsetHeight - 230);
		});
	 </script>
</html>

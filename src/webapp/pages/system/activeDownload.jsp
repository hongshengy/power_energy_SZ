<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<style>
.stit {
	FONT-WEIGHT: bold; FONT-SIZE: 12pt; FILTER: DropShadow(Color=#C3C3C3, OffX=1, OffY=1); COLOR: #12006b;
	  }
.td_fld_title {
	 BORDER-BOTTOM: #cccccc 1px solid;PADDING-RIGHT: 2px; PADDING-LEFT: 2px; PADDING-BOTTOM: 2px; PADDINBORDER-BOTTOM: #cccccc 1px solid;G-TOP: 2px;  BACKGROUND-COLOR: #c4dffc; TEXT-ALIGN: right;
	FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=1,startColorStr=#FFFFFF,endColorStr=#9CE0DF);text-align: center;
		      }
.td_fld {
	HEIGHT: 100%;
	BORDER-RIGHT: #cccccc 1px solid; PADDING-RIGHT: 2px; PADDING-LEFT: 2px; PADDING-BOTTOM: 2px; PADDING-TOP: 2px; BORDER-BOTTOM: #cccccc 1px solid;text-align: left;
		}  
</style>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>帮助页面</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link type="text/css" rel="stylesheet" href="<%=path%>/css/aueic.css" />
	<script type="text/javascript" src="<%=basePath%>js/common_client.js"></script>
  </head>
  <body style="background-color: #f8f8f8" scroll="no">
	<div style="overflow-y:no;height: 100%;width: 100%;">    
		<table class="listTbale" width="100%" border="0" cellspacing="0" cellpadding="0">
	       <tr><td>
	       <table>
	        <tr>
	          <table cellspacing="0" cellpadding="0" border="0" align="left">
		          <tbody>
		           <tr>
				    <td id="helpInfo" class="subMenu_hover" style="cursor: pointer"><a href="javascript:onClickTab('help');"><font color="black">使用手册</font> </a></td>
              		<td id="probInfo" class="subMenu_normal" style="cursor: pointer"><a href="javascript:onClickTab('prob');"><font color="black">常见问题</font> </a></td>
              		<td id="downInfo" class="subMenu_normal" style="cursor: pointer"><a href="javascript:onClickTab('down');"><font color="black">我的下载</font> </a></td>
              		<td id="downPXInfo" class="subMenu_normal" style="cursor: pointer"><a href="javascript:onClickTab('downPX');"><font color="black">培训资料下载</font> </a></td>
              		<td id="downCLInfo" class="subMenu_normal" style="cursor: pointer"><a href="javascript:onClickTab('downCL');"><font color="black">技术标准下载</font> </a></td>
		           </tr>
		          </tbody>
		        </table>
	        </tr>
	       </table>
	       </td></tr>
	   </table>
	   <br>
	    <div id="helpTBL">
 		<iframe name="jcData" id="jcData" style="VISIBILITY: inherit;width:100%;height:92%;" 
  				src="http://172.16.145.18:8080/aueic_client/help/index.html" scrolling="no" frameborder="0"></iframe>
		</div>
		<div id="probTBL" style="display: none;">
		 		<iframe name="jcData" id="jcData" style="VISIBILITY: inherit;width:100%;height:92%;" 
		  				src="http://172.16.145.18:8080/aueic_client/FAQ/index.html" scrolling="no" frameborder="0"></iframe>
		</div>
		<div id="downTBL" style="display: none;">
		 		<iframe name="jcData" id="jcData" style="VISIBILITY: inherit;width:100%;height:100%;" 
		  				src="<%=basePath%>/pages/system/activeDownInfo.jsp" scrolling="no" frameborder="0"></iframe>
		</div>
		<div id="downPXTBL" style="display: none;">
		 		<iframe name="jcData" id="jcData" style="VISIBILITY: inherit;width:100%;height:100%;" 
		  				src="<%=basePath%>/pages/system/activeDownPXInfo.jsp" scrolling="no" frameborder="0"></iframe>
		</div>
		<div id="downCLTBL" style="display: none;">
		 		<iframe name="jcData" id="jcData" style="VISIBILITY: inherit;width:100%;height:100%;" 
		  				src="<%=basePath%>/pages/system/activeDownCLInfo.jsp" scrolling="no" frameborder="0"></iframe>
		</div>
	</div> 
  </body>

<script type="text/javascript">
function onClickTab(value){
	if(value == 'help'){
	   setDisplay("helpTBL",true);
       setDisplay("probTBL",false);
       setDisplay("downTBL",false);
       setDisplay("downPXTBL",false);
       setDisplay("downCLTBL",false);
       document.getElementById("helpInfo").className  = "subMenu_hover";
       document.getElementById("probInfo").className  = "subMenu_normal";
       document.getElementById("downInfo").className  = "subMenu_normal";
       document.getElementById("downPXInfo").className  = "subMenu_normal";
       document.getElementById("downCLInfo").className  = "subMenu_normal";
	}else if(value == 'prob'){
	   setDisplay("helpTBL",false);
       setDisplay("probTBL",true);
       setDisplay("downTBL",false);
       setDisplay("downPXTBL",false);
       setDisplay("downCLTBL",false);
       document.getElementById("helpInfo").className  = "subMenu_normal";
       document.getElementById("probInfo").className  = "subMenu_hover";
       document.getElementById("downInfo").className  = "subMenu_normal";
       document.getElementById("downPXInfo").className  = "subMenu_normal";
       document.getElementById("downCLInfo").className  = "subMenu_normal";
	}else if(value == 'down'){
	  setDisplay("helpTBL",false);
       setDisplay("probTBL",false);
       setDisplay("downTBL",true);
       setDisplay("downPXTBL",false);
       setDisplay("downCLTBL",false);
       document.getElementById("helpInfo").className  = "subMenu_normal";
       document.getElementById("probInfo").className  = "subMenu_normal";
       document.getElementById("downInfo").className  = "subMenu_hover";
       document.getElementById("downPXInfo").className  = "subMenu_normal";
       document.getElementById("downCLInfo").className  = "subMenu_normal";
	}else if(value == 'downPX'){
	   setDisplay("helpTBL",false);
       setDisplay("probTBL",false);
       setDisplay("downTBL",false);
       setDisplay("downPXTBL",true);
       setDisplay("downCLTBL",false);
       document.getElementById("helpInfo").className  = "subMenu_normal";
       document.getElementById("probInfo").className  = "subMenu_normal";
       document.getElementById("downInfo").className  = "subMenu_normal";
       document.getElementById("downPXInfo").className  = "subMenu_hover";
       document.getElementById("downCLInfo").className  = "subMenu_normal";
	}else if(value == 'downCL'){
	   setDisplay("helpTBL",false);
       setDisplay("probTBL",false);
       setDisplay("downTBL",false);
       setDisplay("downPXTBL",false);
       setDisplay("downCLTBL",true);
       document.getElementById("helpInfo").className  = "subMenu_normal";
       document.getElementById("probInfo").className  = "subMenu_normal";
       document.getElementById("downInfo").className  = "subMenu_normal";
       document.getElementById("downPXInfo").className  = "subMenu_normal";
       document.getElementById("downCLInfo").className  = "subMenu_hover";
	}else{
		
	}
}
</script>
</html>

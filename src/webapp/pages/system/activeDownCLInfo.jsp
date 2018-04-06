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
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link type="text/css" rel="stylesheet" href="<%=path%>/css/aueic.css" />
  </head>
  <body style="margin:0; padding:0;">
  
  <table align="center" cellspacing="0" cellpadding="0" border="1" width="80%">
<%-- 	<tr>--%>
<%-- 		<td class="td_fld_title">2011年用电信息采集系统建设资料汇编下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>--%>
<%-- 		<td class="td_fld">--%>
<%-- 		<img src="<%=path%>/images/download.gif" border="0" />--%>
<%-- 		<a href="http://172.16.145.18:8080/aueic_client/update/2011年用电信息采集系统建设资料汇编.rar">请点击下载..</a>--%>
<%-- 		</td>--%>
<%-- 	</tr>--%>
 	
 	<tr>
 		<td class="td_fld_title">采集系统相关标准报批稿下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/采集系统相关标准报批稿.rar">请点击下载..</a>
 		</td>
 	</tr>
 	
 	<tr>
 		<td class="td_fld_title">2011年用电信息采集系统项目管理文件汇编下载</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/用电信息采集系统项目管理文件汇编2011.rar">请点击下载..</a>
 		</td>
 	</tr>
 	
 	<tr>
 		<td class="td_fld_title">2012年用电信息采集系统项目管理文件汇编下载</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/用电信息采集系统项目管理文件汇编2012.rar">请点击下载..</a>
 		</td>
 	</tr>
 	
 	<tr>
 		<td class="td_fld_title">电能表质量管控体系文件下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/电能表质量管控体系文件.rar">请点击下载..</a>
 		</td>
 	</tr>
 	
 </table>
 
</html>

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
 	<tr>
 		<td class="td_fld_title" width="70%">有序用电监测系统业务应用培训手册下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld" width="30%">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/有序用电监测系统业务应用培训手册.doc">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title" width="70%">用电信息采集系统（负荷管理）业务应用培训手册下载</td>
 		<td class="td_fld" width="30%">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/全省用电信息采集系统（负荷管理）业务应用培训手册.doc">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title" width="70%">用电信息采集系统（集抄管理）业务应用培训手册下载</td>
 		<td class="td_fld" width="30%">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/全省用电信息采集系统（集抄管理）业务应用培训手册.doc">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title" width="70%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用电信息采集系统（专业版客户端）抄表数据发布手册下载</td>
 		<td class="td_fld" width="30%">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/负控专业版客户端_抄表数据发布说明V1.0.doc">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title" width="70%">负荷管理业务培训PPT下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld" width="30%">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/负荷管理业务培训.ppt">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title" width="70%">有序用电操作视频下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld" width="30%">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/有序用电操作培训.rar">请点击下载..</a>
 		</td>
 	</tr>
<%-- 	<tr>--%>
<%-- 		<td class="td_fld_title">安装位置模板下载</td>--%>
<%-- 		<td class="td_fld">--%>
<%-- 		<img src="<%=path%>/images/download.gif" border="0" />--%>
<%-- 		<a href="http://172.16.145.18:8080/aueic_client/update/终端安装位置模板.xls">请点击下载..</a>--%>
<%-- 		</td>--%>
<%-- 	</tr>--%>
<%-- 	<tr>--%>
<%-- 		<td class="td_fld_title">拆换电表模板下载</td>--%>
<%-- 		<td class="td_fld">--%>
<%-- 		<img src="<%=path%>/images/download.gif" border="0" />--%>
<%-- 		<a href="http://172.16.145.18:8080/aueic_client/update/批量换、拆表模板.xls">请点击下载..</a>--%>
<%-- 		</td>--%>
<%-- 	</tr>--%>
<%-- 	<tr>--%>
<%-- 		<td class="td_fld_title">SIM卡导入模板下载</td>--%>
<%-- 		<td class="td_fld">--%>
<%-- 		<img src="<%=path%>/images/download.gif" border="0" />--%>
<%-- 		<a href="http://172.16.145.18:8080/aueic_client/update/SIM卡批量导入模板.xls">请点击下载..</a>--%>
<%-- 		</td>--%>
<%-- 	</tr>--%>
<%-- 	<tr>--%>
<%-- 		<td class="td_fld_title">错峰方案模板下载</td>--%>
<%-- 		<td class="td_fld">--%>
<%-- 		<img src="<%=path%>/images/download.gif" border="0" />--%>
<%-- 		<a href="http://172.16.145.18:8080/aueic_client/update/紧急与计划错峰方案-模板.xls">请点击下载..</a>--%>
<%-- 		</td>--%>
<%-- 	</tr>--%>
 	<tr>
 		<td class="td_fld_title">操作手册Word下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/用电信息系统操作手册_V3.2.doc">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">管控系统操作手册Word下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/管控系统操作说明书.doc">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">地市集中管理调整培训文档Word下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/地市集中管理调整培训文档-20120926.doc">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">有序用电操作手册下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/有序用电操作手册.doc">请点击下载..</a>
 		</td>
 	</tr>
<%-- 	<tr>--%>
<%-- 		<td class="td_fld_title">错峰联系人模板下载</td>--%>
<%-- 		<td class="td_fld">--%>
<%-- 		<img src="<%=path%>/images/download.gif" border="0" />--%>
<%-- 		<a href="http://172.16.145.18:8080/aueic_client/update/错峰联系人导入模板.xls">请点击下载..</a>--%>
<%-- 		</td>--%>
<%-- 	</tr>--%>
 </table>
 
</html>

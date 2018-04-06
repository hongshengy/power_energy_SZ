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
 		<td class="td_fld_title">专业版客户端下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/setup.exe">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">Flash Player下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="<%=path%>/pages/fusionChart/plugin/install_flash_player_ax.exe">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">超级报表控件下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="<%=path%>/pages/chinaExcel/chinaExcelCab/chinaexcelwebocx.exe">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">有序用电模板下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/有序用电方案导入模版.xls">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">终端档案模板下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/终端档案表导入模板.xls">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">安装位置模板下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/终端安装位置模板.xls">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">拆换电表模板下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/批量换、拆表模板.xls">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">SIM卡导入模板下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/SIM卡批量导入模板.xls">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">错峰方案模板下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/有序用电方案编制模板.rar">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">错峰方案模板下载(2012版)</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/错峰安排导入模板2012版.xls">请点击下载..</a>
 		</td>
 	</tr>
<%-- 	<tr>--%>
<%-- 		<td class="td_fld_title">操作手册Word下载</td>--%>
<%-- 		<td class="td_fld">--%>
<%-- 		<img src="<%=path%>/images/download.gif" border="0" />--%>
<%-- 		<a href="http://172.16.145.18:8080/aueic_client/update/用电信息系统操作手册_V3.2.doc">请点击下载..</a>--%>
<%-- 		</td>--%>
<%-- 	</tr>--%>
 	<tr>
 		<td class="td_fld_title">错峰联系人模板下载&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/错峰联系人导入模板.xls">请点击下载..</a>
 		</td>
 	</tr>
 	<tr>
 		<td class="td_fld_title">传票管理(集中)操作手册下载</td>
 		<td class="td_fld">
 		<img src="<%=path%>/images/download.gif" border="0" />
 		<a href="http://172.16.145.18:8080/aueic_client/update/传票管理(集中)操作手册.doc">请点击下载..</a>
 		</td>
 	</tr>
 </table>
 
</html>

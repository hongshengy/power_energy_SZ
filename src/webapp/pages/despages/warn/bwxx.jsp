<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
String path = request.getContextPath();
	String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";	
	String pagePath = baseUrl + "/pages/despages/common";	
	String subsId = request.getParameter("subsId");
	String bianwei= request.getParameter("bianwei");
	String gaojing = request.getParameter("gaojing");
	String eventId = request.getParameter("eventId");	
	String treePagePath = baseUrl + "/pages/areaEnergy/common";	
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>变位信息</title>
     <link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/common.css">
     <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
     <script src="<%=pagePath %>/js/maskJs.js"></script>
     
   </head>
  
  <body>
    <script>
    var maskobj = new maskPanelManager();
    maskobj.register();
	</script>
	<style>
	 .search-panel{
			background-color: #EFEFEF;
		}
	</style>
            <div class="easyui-panel" style="width: 100%;height: 100%; position: relative;padding: 10px;">
       
                    
                     <div class=" search-panel" style="padding-left: 10px;">
                        <table class="form-table">
                            <tbody>
                            <tr>
                            	 <td class="td-label">事件:</td>
                                <td>
                                    <select class="easyui-combobox" id="shijian" data-options="width:100,panelWidth:200," >
                        			</select>
                                </td>
                                
                                <td class="td-label">所属企业:</td>
                                <td>
                                    <select class="easyui-combobox" id="userTree" data-options="width:100,panelWidth:200," >
                        			</select>
                                </td>
                                <td class="td-label">所属用户变:</td>
                                <td>
                                   <select id="usershebeiTree" class="easyui-combotree" data-options="width:100,panelWidth:200,panelHeight:'auto'"></select>
                                </td>
                                 <td class="td-label">告警设备:</td>
                                <td >
                                    <select class="easyui-combobox" data-options="width:100,panelWidth:200,panelHeight:'auto'" id="shebei">
                                    </select>
                                </td>
       
                                  <td class="td-label">时间：</td>
                                <td colspan="8">
                                        
                                         <input type="text" class="easyui-datetimebox" data-options="width:120" id="startDate"/>
                                        <span>~</span>
                                        <input type="text" class="easyui-datetimebox" data-options="width:120" id="endDate"/>
                                </td>
                                 <td></td>
                                <td colspan="5">
                                	<a id="btn"  class="easyui-linkbutton c9 shadow" data-options="width:80" onclick="gaojingList()">查询</a>  
                                	
                                </td>
                              
                            </tr>
                           
                            </tbody>
                        </table>
                    </div>
                <div id="div1" class="container-marginTop grid-panel" style="position: absolute;top:60px;left: 10px;right: 10px;bottom: 10px;">
                
                    <table id="gjcx-datagrid"></table>
                </div>
            </div>
		
        <div id="dlg-qy" class="easyui-dialog easyui-dialog-white" title="企业信息" closed="true" style="padding:10px;">
        </div>
    
    <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
    
    <script type="text/javascript">
         webContextRoot="<%=basePath%>";
         subsId="<%=subsId%>";
         bianwei="<%=bianwei%>";
         gaojing="<%=gaojing%>";
         eventId ="<%=eventId%>";
         var userId = '<%=((UserInfo)session.getAttribute("userInfo")).getUserId()%>';
	</script>
    <script type="text/javascript" src="<%=path%>/pages/despages/warn/bwxx.js"></script>
  </body>
</html>

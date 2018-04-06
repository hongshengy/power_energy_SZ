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

String consId = request.getParameter("consId");//获取调用父页面传过来的参数
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
     <script src="<%=pagePath %>/js/maskJs.js"></script>
   </head>
  
  <body>
    <script>
    var maskobj = new maskPanelManager();
    maskobj.register();
	</script>
	<style>
	.search-panel{
			background-color: #F9F9F9;
		}
		
	a {
		cursor: pointer;
	}	
	</style>
	   
     
            <div class="easyui-panel" style="width: 100%;height: 100%; position: relative;padding: 10px;" >
              <div class=" search-panel" style="padding-left: 10px;border:1px #CCCCCC solid;">
                        <table class="form-table">
                            <tbody>
                            <tr>
                                <td class="td-label" style="width: 50px;">事件:</td>
                                <td>
                                    <select class="easyui-combobox" id="shijian" data-options="width:100,panelWidth:100,panelHeight:'auto',editable:false" >
                        			</select>
                                </td>
                                <td class="td-label">时间:</td>
                                <td colspan="8">
                                         <!-- <input type="text" class="easyui-datetimebox" data-options="width:120,editable:false" id="startDate" /> -->
                                         <input id="startDate" class="Wdate" type="text" style="width: 160px;height:22px; text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
                                        <span>~</span>
                                        <!-- <input type="text" class="easyui-datetimebox" data-options="width:120,editable:false" id="endDate"/> -->
                                        <input id="endDate" class="Wdate" type="text" style="width: 160px;height:22px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
                                </td>
                                <td>
                                	<a id="btn"  class="easyui-linkbutton c9 shadow" data-options="width:80" onclick="gaojingList()">查询</a>  
                                </td>
                                <td>
                                	<input type="checkbox" id="dssx" style="width: 15px;margin: 0px;vertical-align: middle;" checked="checked">
                                	<span style="font-size: 12px;margin-left: -5px;">定时刷新</span>
                                </td>
                                
                            </tbody>
                        </table>
                    </div>
                <div id="div1" class="container-marginTop grid-panel" style="position: absolute;top: 39px;left: 10px;right: 10px;bottom: 10px;border: 1px #CCCCCC solid;">
                
                    <table id="gjcx-datagrid"></table>
                </div>
            </div>
		
        <div id="dlg-qy" class="easyui-dialog easyui-dialog-white" title="客户信息" closed="true" style="padding:10px;">
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
          var consId = '<%=consId%>';
          var consName =window.parent.consName;
	</script>
	<script type="text/javascript" src="<%=path%>/pages/despages/warn/GaoJingXinXi.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/toolwinopen.js"></script>	
	<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
  </body>
</html>

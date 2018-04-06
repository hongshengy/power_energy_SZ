<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
	String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";	
	String vtradeCode = request.getParameter("tradeCode");
	String vtradeName = request.getParameter("tradeName");
	
	session.setAttribute("itemCode","desgjcx");
    session.setAttribute("itemName","告警查询");
	
	UserInfo info = (UserInfo)session.getAttribute("userInfo");
	String name = info.getLoginName();
	
	
	String orgName = null;
	String orgNo = null;
	String roleName = null;
	// 取得角色ID
	Long nowRoleId = new Long(0);
	
	String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	
	String queryType = request.getParameter("queryType");//告警时间类型（0-请选择、1-当天、2-两天内、3-三天内、4-最近一周、5-其他）
	String deviceType = request.getParameter("deviceType");//设备类型
	String alarmType = request.getParameter("alarmType");//告警类型（1-实时、2-历史）
	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String startTime =  request.getParameter("startTime");//开始时间
	String endTime = request.getParameter("endTime");//结束时间
	//"109900007431"; 
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>告警查询</title>
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/common.css">
     <script src="<%=pagePath %>/js/maskJs.js"></script>
     <link rel="stylesheet" href="<%=baseUrl%>/resources/jsepc/css/ext-all.css">
          <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
     
 </head>	
	  <body>
	  <script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
	  
	<style>
		#gjcx-panel *{
			box-sizing: content-box;
		}
		#gjcx-panel .search-panel{
			background-color: #F9F9F9;
		}
		#gjcx-panel .grid-panel{
			background-color: #F9F9F9;
		}
		
		#gjcx-panel .form-table {
	        font-size: 12px;
	    }
	    
	    #gjcx-panel .form-table table td{
        	padding: 5px;
        	text-align: center;
    	}
    
	    #gjcx-panel .form-table .td-label{
	        width: 60px;
	        text-align: right;
	    }
	
	    #gjcx-panel .form-table .td-value{
	        width: 120px;
	    }
	
	    #gjcx-panel .form-table .td-fillwidth{
	        width: 40px;
	    }
	    .hidden {
			display: none;
		}
	</style>
	
	
   <div id="gjcx-panel" style="width: 100%; height: 100%;">
		<div class="container-shadow " style="width: 100%;height: 100%;display: block;">
			<div class="easyui-panel" style="width: 100%;height: 100%; position: relative;padding: 10px;">
                <div data-options="region:'north',border:false" style="width:100%;height: 30px;overflow: hidden">
            		<div class="toggleLabel-panel">
		                <a href="#" id="ssBtn" class="easyui-linkbutton" style="margin-right: 12px;" data-options="width:100,toggle:true,group:'g2',plain:true,selected:true" onclick="checkValue(1);">实时告警</a>
		                <a href="#" id="lsBtn" class="easyui-linkbutton" data-options="width:100,toggle:true,group:'g2',plain:true" onclick="checkValue(2);">历史告警</a>
           			</div>
           			
        		</div>
                <div class=" search-panel" style="margin-top: 10px;padding-left: 10px;top:50px;border:1px #CCCCCC solid;">
	                <table class="form-table" style="margin-top: 10px;margin-bottom: 10px; ">
	                    <tbody>
                            <tr>
                                <td class="td-label">客户名称：</td>
                                <td>
                                    <select class="easyui-combobox" id="userTree" data-options="width:120,panelWidth:200" >
                        			</select>
                                </td>
                                <td class="td-label">建筑：</td>
                                <td>
                                   <select id="usershebeiTree" class="easyui-combotree" data-options="width:120,panelWidth:200,panelHeight:'auto',editable:false"></select>
                                </td>
                                 <td class="td-label">告警时间：</td>
                                <td>
                                    <select class="easyui-combobox" class="easyui-combobox" id="searchTime" data-options="width:120,prompt:'请选择',panelHeight:'auto',editable:false">
                                        <option value="0" >请选择</option>
                                        <option value="1" >当天</option>
                                        <option value="2">两天内</option>
                                        <option value="3">三天内</option>
                                        <option value="4">最近一周</option>
                                        <option value="5">其他</option>
                                    </select>
                                </td>
                                <td class="td-label"><span id="time_label" style="display: none;">选择时间：</span></td>
                              	<td >
                              		<span id="datePicker_panel" style="display: none;">
                                        <span>选择时间：</span>
                                        
                                    </span>
                                    <span id="time_value" style="display: none;">
	                                    <input type="text" class="easyui-datetimebox" data-options="width:150,panelHeight:'auto',editable:false" id="startDate"/>
	                                    ~
	                                    <input type="text" class="easyui-datetimebox" data-options="width:150,panelHeight:'auto',editable:false" id="endDate"/>
                                    </span>
                              	</td>
                            </tr>
                            <tr>
                                <td class="td-label">设备类型：</td>
                                <td >
                                   <select id="sheibeileixing" class="easyui-combobox" data-options="width:120,panelHeight:'auto',editable:false">
                            		</select>
                                </td>
                                <td class="td-label">告警设备：</td>
                                <td >
                                	<input id="shebei" class="easyui-textbox" data-options="width:120,validType:['length[0,32]']" >
                                    <!-- <select class="easyui-combobox" data-options="width:100,panelWidth:200,panelHeight:'auto'" id="shebei"> -->
                                    </select>
                                </td>
                                <td class="td-label">告警等级：</td>
                                <td >
                                     <select id="gaojingjibie" class="easyui-combobox" data-options="width:120,panelHeight:'auto',editable:false">
                                      
                                    </select>
                                </td>
                                  
                                 <td class="td-label">处理状态：</td>
                                <td>
                                   <select id="chulizhuangtai" class="easyui-combobox" data-options="width:120,panelHeight:'auto',editable:false" >
                            		</select>
                            		<a id="btn" href="#" style="margin-left:10px;" class="easyui-linkbutton c9 shadow" data-options="width:80" onclick="selectgj()">查询</a>  
                                	
                                	<a id="export" href="#" style="margin-left:10px;" class="easyui-linkbutton c9 shadow" data-options="width:80">导出</a>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
				</div>
				<div class="container-marginTop grid-panel" style="position: absolute;top: 136px;left: 10px;right: 10px;bottom: 7px;border: 1px #CCCCCC solid;">
                   	<div id="dg_one" style="height:100%">
                   		<table id="gjcx-datagrid" ></table>	
                   	</div>
                    <div id="dg_two" style="height:100%;" class="hidden">
                    	<table id="gjcx-datagridone" ></table>	
                    </div>
				</div>
                </div>
            </div>
		</div>
		
		 <div id="gjcx-cl-panel" class="easyui-dialog" style="width:400px;height:260px;padding: 0px 50px;"
				data-options="title:'告警处理',buttons:'#gjcx-cl-btn',modal:true,closed:true">
				<table cellpadding="5" style="font-size: 12px;">
					<tr>
						<td style="width:55px;">处理人员:</td>
						<td style="width:200px;">
							<span id="user"></span>
						</td>
					</tr>
					<tr>
						<td>处理状态:</td>
						<td>
                            <select id="clzt" class="easyui-combobox" data-options="width:200,panelHeight:'auto',editable:false"></select>
						</td>
					</tr>
					<tr>
						<td style="vertical-align: top;">处理说明:</td>
						<td><input class="easyui-textbox" id="clsm" data-options="multiline:true" style="width:100%;height:100px;"></input></td>
					</tr>
				</table>
			</div>
            <div id="gjcx-cl-btn" style="text-align: center; height: 35px;">
				<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxSave">保存</a>  
            	<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxClose">取消</a> 
			</div>
		
		<div id="topic-excel" class="x-hidden"/>
		<script type="text/javascript">
		  var basePath = '<%=basePath%>';
		 var nowRoleId = '<%=nowRoleId%>';
		 var roleName = '<%=roleName%>';
		 var loginName = '<%=((UserInfo)session.getAttribute("userInfo")).getLoginName()%>';
         var UserName = '<%=((UserInfo)session.getAttribute("userInfo")).getUserName()%>';
         var userId = '<%=((UserInfo)session.getAttribute("userInfo")).getUserId()%>';
         var queryType = '<%=queryType%>';
         var deviceType = '<%=deviceType%>';
         var alarmType = '<%=alarmType%>';
         var startTime = '<%=startTime%>';
         var endTime = '<%=endTime%>';
         var consId = '<%=consId%>';
         var consName =window.parent.consName;
         webContextRoot="<%=basePath%>";
	</script>
    <script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
 	<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/ext-all.js"></script>
    <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="GaoJingChaXun.js"></script>
  </body>
</html>

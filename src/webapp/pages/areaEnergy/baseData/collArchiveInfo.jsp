<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%@ page import="com.frontier.des.util.AueicUtil" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String roleCode = "";
	Long userOrgId;
	Long userId;
	String roleId = request.getSession().getAttribute("roleId")+"";
	UserInfo info = (UserInfo)session.getAttribute("userInfo");
	if(AueicUtil.isNullOrEmpty(info)){
		userOrgId = 32101l;
	}else{
		userOrgId = info.getUserWorkOrgId();
	}
	
	if(AueicUtil.isNullOrEmpty(roleId) || roleId.equals("null")){
		roleId = request.getParameter("roleId")+"";
	}
	
	roleCode = AueicUtil.getRoleCodeByRole(roleId);
	
	if(!AueicUtil.isNullOrEmpty(roleCode)) {
		roleCode = roleCode.substring(0, 4);
	}
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>采集档案主页查询</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<jsp:include page="/pages/common/componentBase.jsp" />
		<style type="text/css">
		   .datagrid-cell,.datagrid-cell-group,.datagrid-header-rownumber,.data-cell-rownumber{
		      text-overflow:ellipsis;
		   }
		</style>
		<script type="text/javascript">
			var userOrgId = '<%=userOrgId%>';
			var roleId = '<%=roleId%>';
			var roleCode = '<%=roleCode%>';
			
			$(function(){
				if (roleCode != 'qyny') {
					$("#pc_td_label").show();
					$("#pc_td_value").show();
					$("#sc_td_label").hide();
					$("#sc_td_value").hide();
					
					queryAllPowerCompany();
			    	if (userOrgId != null) {
			    		$('#orgNo').combotree('setValue', userOrgId);
			    	} else {
			    		$('#orgNo').combotree('setValue', {id:32101, text:'江苏省电力公司'});
			    	}
				} else if (roleCode == 'qyny') {
					$("#pc_td_label").hide();
					$("#pc_td_value").hide();
					$("#sc_td_label").show();
					$("#sc_td_value").show();
					
					var statusCode = $('#status_Code').val();
					var userType = $('#user_Type').val();
					if(statusCode != null || userType != null){
						$('#statusCode').combobox({
							value:statusCode
						});
						$('#userType').combobox({
							value:userType
						});
					}
					queryServiceCenter();
					
					$('#areaNo').combobox({
				    	onChange : function(){
				    		var areaNo = $("#areaNo").combobox("getValue");
							$("#areaNo_val").val(areaNo);
				    	}
			    	});	
				}
		    	
			});
			
			function queryAllPowerCompany() {
		    	$('#orgNo').combotree({
					url :'<%=basePath%>capacityData/queryPowerCompany.action?queryPara.orgId=32101&queryPara.parentId=0',
					onLoadSuccess : function(node, data){
					    $(this).tree('collapseAll');
					    com.frontier.areaEnergy.collArchiveInfo.initData();
					}
		   		});
		    }
		    
			function queryServiceCenter() {
		    	$('#areaNo').combobox({    
				    url:des.webContextRoot+'areaEnergy/loadAreaList.action', 
				    valueField:'ID',    
				    textField:'TEXT',
				    editable:false,
				    panelHeight:'auto',  
					onLoadSuccess:function(){
					    var data = $(this).combobox('getData');
					    if (data.length > 0) {
					       $(this).combobox('setValue',data[0].ID);
					       $("#areaNo_val").val(data[0].ID);
					       com.frontier.areaEnergy.collArchiveInfo.initData();
					    }
					}
				});
		    }
			
		</script>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
			<input type="hidden" id="role_Id" value="<%=roleId%>">
			<input type="hidden" id="role_Code" value="<%=roleCode%>">
			<input type="hidden" id="status_Code" value="${param.statusCode}">
			<input type="hidden" id="user_Type" value="${param.userType}">
		    <input type='hidden' id='queryFlag' name='queryFlag' value="0">
		    <input type='hidden' id='isEdit' value="${param.isEdit}">
		    <input type='hidden' id="areaNo_val" value=""> 
            <div class="easyui-panel" title="查询条件" style="width:100%;padding:5px;">
                <table style="width:100%;">
                    <tbody>
                    <tr>
                    	<td id="pc_td_label" class="td-label" align="right" style="display:none;">
                            <label>供电公司：</label>
                        </td>
                        <td id="pc_td_value" class="td-value" style="display:none;">
                           <select id="orgNo" class="easyui-combotree" style="width:200px;"></select>  
                        </td>
                        
                        <td id="sc_td_label" class="td-label" align="right" style="display:none;">
                            <label>服务中心：</label>
                        </td>
                        <td id="sc_td_value" class="td-value" style="display:none;">
                            <input type='text' id="areaNo" name="areaNo">
                        </td>
                        <td class="td-fillwidth"></td>
                        <td class="td-label" align="right">
                            <label>客户状态：</label>
                        </td>
                        <td>
                            <select id="statusCode" class="easyui-combobox" style="width:155px;" data-options="panelHeight:'auto',editable:false">
                              	<option value="" selected="selected">请选择</option>
                                <option value="1">正常客户</option>
                                <option value="2">已销户</option>
                            </select>
                        </td>
                        <td class="td-fillwidth"></td>
                        <td class="td-label" align="right">
                            <label>客户类型：</label>
                        </td>
                        <td>
                            <select id="userType" class="easyui-combobox" style="width:155px;" data-options="panelHeight:'auto',editable:false">
                              	<option value="">请选择</option>
                                <option value="1" selected="selected">电力客户</option>
                                <option value="2">子客户</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="td-label" align="right">
                            <label>精确查询：</label>
                        </td>
                        <td class="td-value">
                            <input type='text' id='exactSel' name='exactSel' onblur="com.frontier.areaEnergy.collArchiveInfo.showExact()" onfocus="com.frontier.areaEnergy.collArchiveInfo.focusEvent()" size="40">
                        </td>
                        <td class="td-fillwidth"></td>
                        <td class="td-label" align="right">
                            <label>客户名称：</label>
                        </td>
                        <td class="td-value" colspan="3">
                            <input type='text' id="consName" name="consName">
                        </td>
                    </tr>
                  </tbody>
               </table>
               <div style="padding: 0px; text-align: center">
                    <button class="easyui-linkbutton c1" onclick="com.frontier.areaEnergy.collArchiveInfo.query()" style="width:70px;">查询</button>
               </div>
            </div>
        </div>
	    <div style="padding:2" border="false"> 
	        <table id="collArchiveTable"></table>
	    </div>
	</body> 
	<script type="text/javascript" src="<%=basePath%>/pages/areaEnergy/baseData/collArchiveInfo.js?t=20171201"></script>
</html>
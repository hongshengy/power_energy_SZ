<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	
	String orgNo = session.getAttribute("userWorkOrgId") == null ? "" : session.getAttribute("userWorkOrgId").toString();
	String roleCode = request.getAttribute("ROLE_CODE").toString();
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>综合能源</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<jsp:include page="/pages/common/componentBase.jsp" />
		   
		<script type="text/javascript" src="<%=basePath%>/pages/areaEnergy/baseData/userSubstation/userSubstationZHNY.js"></script>
		
		<script type="text/javascript">
			var basePath = '<%=basePath%>';
			var codeId = '${queryPara.consId}';
// 			var roleCode = '${ROLE_CODE}';
			 <%-- var roleCode = 'zhny'; --%>
			 var roleCode = '<%=roleCode%>';
			/**
			角色：     1、用户侧储能    (角色统一前缀：yhcn_)
	       	     2、综合能源应用  (角色统一前缀：zhny_)
		         3、区域能源应用  (角色统一前缀：quny_)
		         4、非侵入式终端  (角色统一前缀：fqls_)
			*/

			
			
			var orgNo = '<%=orgNo%>';
		</script>
		
		<script type="text/javascript">
			
			
			$(function(){
				
				
				var setVal;
				var queryData;
				if(orgNo == null || orgNo == '32101'){
					queryData = "queryPara.orgNo=0&queryPara.orgId=32101";
				}else{
					queryData = "queryPara.orgId="+orgNo;
				}
				$("body").layout();
	        	$.ajax({
					type: "post",
					url: "<%=basePath%>" + 'capacityData/queryTreeOrgNo.action',
					data: queryData,//"queryPara.orgNo=0&queryPara.orgId=32101",
					dataType:"json",
					cache : false,
					async : false,//同步异步请求
					success: function(result)
					{
						if(orgNo == null || orgNo == '32101'){
							$('#orgNo').combotree('setValues',[ {id:32101,text: '江苏省电力公司'}]);
						}else{
							$('#orgNo').combotree('setValues',[ {id:result.data[0].id,text: result.data[0].text}]);
						}
					    var dataOrgNo = result.data;
						$('#orgNo').combotree('loadData', dataOrgNo);
					}
				});
	        	
	       		var tree = $('#orgNo').combotree('tree');
				tree.tree({
					onClick: function(node){
					var selected = tree.tree('getSelected');
					$('#orgNo').combotree('setValues',[ {id:node.id,text: node.text}]);
					var c = tree.tree('getChildren',selected.target);
					if(c.length>0){
						return;
					}
					$.ajax({
						type: "post",
						url: "<%=basePath%>" + 'capacityData/queryTreeOrgNo.action',
						data: "queryPara.orgNo=" + node.id ,
						dataType:"json",
						cache : false,
						async : false,//同步异步请求
						success: function(result)
						{
						    var dataOrgNo = result.data;
							tree.tree('append', {
								parent: selected.target,
								data: dataOrgNo
							});
						}
						});
					}
				});
				
			});
		</script>
		
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
            <div class="easyui-panel" title="查询条件" style="width:100%;padding-top:10px;">
                <table style="width:100%;">
                    <tbody>
                    
                    <tr id="fuwuzhongxin">
                    	
                    	<td class="td-label" align="right">
                           <label>服务中心：</label>
                        </td>
                        <td class="td-value">
                           <select id="fwzx" class="easyui-combobox" style="width: 155px;">
								<c:forEach var="data" items="${codemodel}" varStatus="sta" step="1">
									<option value="${data.codeVal}">${data.codeName}</option>
								</c:forEach>
                           	</select>
                        </td>
                        <td class="td-fillwidth"></td>

                        <td class="td-label" align="right">
                            <label>用户电压等级：</label>
                        </td>
                        <td>
                            <select id="dydj" class="easyui-combobox" style="width: 155px;">
                            	<option value="">请选择</option>
                                <c:forEach var="data" items="${volt}" varStatus="sta" step="1">
									<option value="${data.codeVal}">${data.codeName}</option>
								</c:forEach>
                            </select>
                        </td>
                        <td class="td-fillwidth"></td>
                        <td class="td-label" align="right">
                            <label>冻结时间：</label>
                        </td>
                        <td>
                            <input id="djsj" type="text" class="easyui-datetimebox" />
                        </td>
                    </tr>
                    
                    <tr id="gongdiangongsi">
                    	
                    	<td class="td-label" align="right">
                            <label>供电公司：</label>
                        </td>
                        <td class="td-value">
                            <select id="orgNo" class="easyui-combotree" style="width:155px;"></select>
                        </td>
                       	<td class="td-fillwidth"></td>

                        <td class="td-label" align="right">
                            <label>用户电压等级：</label>
                        </td>
                        <td>
                            <select id="dydj" class="easyui-combobox" style="width: 155px;">
                            	<option value="">请选择</option>
                                <c:forEach var="data" items="${volt}" varStatus="sta" step="1">
									<option value="${data.codeVal}">${data.codeName}</option>
								</c:forEach>
                            </select>
                        </td>
                        <td class="td-fillwidth"></td>
                        <td class="td-label" align="right">
                            <label>冻结时间：</label>
                        </td>
                        <td>
                            <input id="djsj" type="text" class="easyui-datetimebox" />
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="td-label" align="right">
                            <label>精确查询：</label>
                        </td>
                        <td class="td-value" style="position: relative;">
                           <input id="jqcx" type="text" value="户号/联系电话/终端IP" style="color:#BCBCBC;" onblur="inputb();" onfocus="inputf();">
                        </td>
                        <td class="td-fillwidth"></td>
                        <td class="td-label" align="right">
                            <label>用户名称：</label>
                        </td>
                        <td class="td-value">
                            <input type='text' id="yhmc" >
                        </td>
                        <td class="td-fillwidth"></td>
                        <td class="td-label" align="right">
                            	用户类型:
                        </td>
                        <td>
                        	<select class="easyui-combobox wnGrade" id="wnGrade" 
  	    						data-options="width:155,prompt:'请选择',panelHeight:'auto',editable:false"
  	    						style="width: 155px;height: 26px;">
  	    						<option value="0">请选择</option>
   	    						<option value="1">储能数据展示</option>
   	    						<option value="2">区域能源数据展示</option>
							    <option value="3">非侵入式数据展示</option>
    						</select>
                        </td>
                    </tr>
                  </tbody>
               </table>
               <div style="padding: 10px; text-align: center">
                    <button class="easyui-linkbutton c1" onclick="query()" style="width:70px;margin-right: 20px;">查询</button>
                    <button class="easyui-linkbutton c1" onclick="excel()" style="width:90px;">导出Excel</button>
                    <form id="thisform" name="thisform" method="post" action="">
                    	<input id="a" type="hidden" name="substation.fwzx">
                    	<input id="b" type="hidden" name="substation.dydj">
                    	<input id="c" type="hidden" name="substation.djsj">
                    	<input id="d" type="hidden" name="substation.jqcx">
                    	<input id="e" type="hidden" name="substation.yhmc">
                    	<input id="f" type="hidden" name="substation.yhbmc">
                    	<input id="g" type="hidden" name="substation.orgNo">
                    	<input id="h" type="hidden" name="substation.wnGrade">
                    </form>
               </div>
            </div>
        </div>
	    <div style="padding:10;width: 100%;" border="false">  
	        <table id="collArchiveTable"></table>
	    </div>
	</body>    
</html>
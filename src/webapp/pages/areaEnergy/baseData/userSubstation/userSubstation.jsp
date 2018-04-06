<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>建筑数据展示</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<jsp:include page="/pages/common/componentBase.jsp" />
		<c:choose>
		<c:when test="${zh eq '1'}">
		<script type="text/javascript" src="<%=basePath%>/pages/areaEnergy/baseData/userSubstation/userSubstation1.js"></script>
		</c:when>
		<c:otherwise>
		<script type="text/javascript" src="<%=basePath%>/pages/areaEnergy/baseData/userSubstation/userSubstation.js"></script>
		</c:otherwise>
		</c:choose>
		<script type="text/javascript">
			var basePath = '<%=basePath%>';
			var codeId = '${queryPara.consId}';
		</script>
		<c:if test="${zh eq '1'}">
			<script type="text/javascript">
			$(function(){
				$('#orgNo').combotree('setValues',[ {id:32101,text: '江苏省电力公司'}]);
				$("body").layout();
	        	$.ajax({
					type: "post",
					url: "<%=basePath%>" + 'capacityData/queryTreeOrgNo.action',
					data: "queryPara.orgNo=0&queryPara.orgId=32101",
					dataType:"json",
					cache : false,
					async : true,//同步异步请求
					success: function(result)
					{
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
						async : true,//同步异步请求
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
		</c:if>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
            <div class="easyui-panel" title="查询条件" style="width:100%;padding-top:10px;">
                <table style="width:100%;">
                    <tbody>
                    <tr>
                    	<c:choose>
                    	<c:when test="${zh eq '1'}">
                    	<td class="td-label" align="right">
                            <label>供电公司：</label>
                        </td>
                        <td class="td-value">
                            <select id="orgNo" class="easyui-combotree" style="width:200px;"></select>
                        </td>
                        <td class="td-fillwidth"></td>
                    	</c:when>
                    	<c:otherwise>
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
                        </c:otherwise>
                    	</c:choose>
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
                            <label>建筑名称：</label>
                        </td>
                        <td>
                            <input id="yhbmc"  type="text" >
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
                    </form>
               </div>
            </div>
        </div>
	    <div style="padding:10;width: 100%;" border="false">  
	        <table id="collArchiveTable"></table>
	    </div>
	</body>    
</html>
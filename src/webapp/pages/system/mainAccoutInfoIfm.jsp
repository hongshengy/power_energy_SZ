<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	List<Map<String, Object>> accountList = (List<Map<String, Object>>) request
			.getAttribute("accountList");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<jsp:include page="/pages/common/head.jsp" />
		<script type="text/javascript" for="window" event="onload">
            //去除遮罩
            parent.disWaitDisplayForQuery();
            setDataGridHeight();
        </script>
        <style>
			.fixtd {
				position: relative;
				top: expression(this.offsetParent.scrollTop);
				z-index: 999;
			}
		</style>
		<script type="text/javascript">
			window.onresize = setDataGridHeight;
			
			function getV(){
				var list = $("input[type='radio'][name='default']:checked");
				var defaultV = list.get(0).value;
				return defaultV;
			}
			
			// 自适应高度调整 
			function setDataGridHeight() {
		        $("#topDivId").css("height",130);
			}
		</script>
	</head>
	<base target="_self">
	<body style="background-color: #f8f8f8;" scroll=no>
		<form id="thisform" name="thisform" method="post" action="">
											<div id="topDivId"
												style="position:absolute;border: 0; width: 100%; overflow: auto;background-color:white">
							<table class="dataGrid" width="100%" border="0" cellspacing="0"
									cellpadding="0">
									<tr class="listHead" align="center">
										<td style="border-left: #ccc solid 1px;" nowrap="nowrap" class='fixtd' 
											align="center">
											序号
										</td>
										<td nowrap="nowrap" align="center" class='fixtd' >
											账户名称
										</td>
										<td nowrap="nowrap" align="center" class='fixtd' >
											账户登录名称
										</td>
										<td nowrap="nowrap" align="center" class='fixtd' >
											所属部门名称
										</td>
										<td nowrap="nowrap" align="center" class='fixtd' >
											所属单位名称
										</td>
										<td nowrap="nowrap" align="center" class='fixtd' >
											默认账号
										</td>
									</tr>
									<%
										if (null != accountList && accountList.size() > 0) {
											int listSize = accountList.size();
											for (int i = 0; i < listSize; i++) {
												Map<String, Object> accountInfo = accountList.get(i);
												if (i != (listSize - 1)) {
									%>
									<tr>
										<td style="border-left: #ccc solid 1px;">
											<%=i + 1%>
										</td>
										<td nowrap="nowrap">
											<%=accountInfo.get("EMPLOYEE_NAME")%>
										</td>
										<td nowrap="nowrap">
											<%=accountInfo.get("LOGIN_NAME")%>
										</td>
										<td nowrap="nowrap">
											<%=accountInfo.get("SPECIALORGNAME")%>
										</td>
										<td nowrap="nowrap">
											<%=accountInfo.get("ORGNAME")%>
										</td>
										<td style="border-right: #ccc solid 1px;" nowrap="nowrap">
											<input type="radio" name="default" <%=("1".equals(accountInfo.get("FLAG"))?"checked":"")%> value="<%=accountInfo.get("ID")%>"/>
										</td>
									</tr>
									<%
										} else {
									%>
									<tr>
										<td
											style="border-bottom: #ccc solid 1px; border-left: #ccc solid 1px;">
											<%=i + 1%>
										</td>
										<td style="border-bottom: #ccc solid 1px;" nowrap="nowrap">
											<%=accountInfo.get("EMPLOYEE_NAME")%>
										</td>
										<td style="border-bottom: #ccc solid 1px;" nowrap="nowrap">
											<%=accountInfo.get("LOGIN_NAME")%>
										</td>
										<td style="border-bottom: #ccc solid 1px;" nowrap="nowrap">
											<%=accountInfo.get("SPECIALORGNAME")%>
										</td>
										<td style="border-bottom: #ccc solid 1px;" nowrap="nowrap">
											<%=accountInfo.get("ORGNAME")%>
										</td>
										<td
											style="border-bottom: #ccc solid 1px; border-right: #ccc solid 1px;"
											nowrap="nowrap">
											<input type="radio" name="default" <%=("1".equals(accountInfo.get("FLAG"))?"checked":"")%> value="<%=accountInfo.get("ID")%>"/>
										</td>
									</tr>
									<%
										}
											}
										} else {
									%>
									<tr>
										<td
											style="border-left: #ccc solid 1px; border-bottom: #ccc solid 1px;"></td>
										<td style="border-bottom: #ccc solid 1px;"></td>
										<td style="border-bottom: #ccc solid 1px;"></td>
										<td style="border-bottom: #ccc solid 1px;"></td>
										<td style="border-bottom: #ccc solid 1px;"></td>
										<td
											style="border-right: #ccc solid 2px; border-bottom: #ccc solid 1px;"></td>
									</tr>
									<%
										}
									%>
							</table>
							</div>
		</form>
	</body>
	
</html>
<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	List<Map<String, Object>> roleList = (List<Map<String, Object>>) request
			.getAttribute("roleList");
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
        </script>
		<script type="text/javascript">
		</script>
	</head>
	<base target="_self">
	<body style="background-color: #f8f8f8;">
		<form id="thisform" name="thisform" method="post" action="">
			<table class="listTable" width="100%" border="0" cellspacing="0"
					cellpadding="0">
					<tr class="listHead">
						<td style="border-left: #ccc solid 1px;" nowrap="nowrap"
							align="center">
							序号
						</td>
						<td nowrap="nowrap" align="center">
							角色
						</td>
						<td nowrap="nowrap" align="center">
							描述
						</td>
					</tr>
					<%
						if (null != roleList && roleList.size() > 0) {
							int listSize = roleList.size();
							for (int i = 0; i < listSize; i++) {
								Map<String, Object> roleInfo = roleList.get(i);
								if (i != (listSize - 1)) {
					%>
					<tr>
						<td style="border-left: #ccc solid 1px;">
							<%=i + 1%>
						</td>
						<td nowrap="nowrap">
							<%=roleInfo.get("ROLE_NAME")%>
						</td>
						<td style="border-right: #ccc solid 1px;" nowrap="nowrap">
							<%=roleInfo.get("DESCRIPTION")%>
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
							<%=roleInfo.get("ROLE_NAME")%>
						</td>
						<td
							style="border-bottom: #ccc solid 1px; border-right: #ccc solid 1px;"
							nowrap="nowrap">
							<%=roleInfo.get("DESCRIPTION")%>
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
						<td
							style="border-right: #ccc solid 2px; border-bottom: #ccc solid 1px;"></td>
					</tr>
					<%
						}
					%>
			</table>
		</form>
	</body>
	
</html>
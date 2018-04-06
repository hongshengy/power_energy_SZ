<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>

<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	List<Map<String, Object>> accountList = (List<Map<String, Object>>)request.getAttribute("accountList");
	UserInfo info = (UserInfo)session.getAttribute("userInfo");
	String loginName = info.getLoginName();
	String mhName = "";
	if (request.getAttribute("mhName") != null) {
		mhName = (String)request.getAttribute("mhName");
	}
	String createDate = (String)request.getAttribute("createDate");
	
	String queryName = loginName;
	if (session.getAttribute("MH_EMP_NO") != null) {
		queryName = session.getAttribute("MH_EMP_NO").toString();
	}
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
            
            if ('<%=mhName%>' != '') {
            	parent.document.getElementById("mhName").innerHTML = '<%=mhName%>';
            }
            parent.document.getElementById("createDate").innerHTML = '<%=createDate%>';
            setDataGridHeight() ;
        </script>
		<script type="text/javascript">
			window.onresize = setDataGridHeight;
			
			// 刷新页面
			function refreshPage() {
				parent.init();
			}
			
			// 自适应高度调整 
			function setDataGridHeight() {
				// 内嵌页面
	       		var scrollHeight = this.document.body.scrollHeight;
	       		var allHeight = top.document.body.scrollHeight ;
	       		var headImgHeight = top.$('#headImg').height();
	       		var menuBgHeight = top.$('.menuBg').height();
	       		var gridHeight;
       			scrollHeight =  allHeight - headImgHeight - menuBgHeight - 100;
       			gridHeight = scrollHeight - 70;
		        $("#topDivId").css("height",gridHeight).parent().parent().parent().parent().height(gridHeight + 30);
                $(parent.document).find("#bodyFrame").css("height",scrollHeight-20);
			}
			
			function getV(){
				var list = $("input[type='checkbox'][name='ids']:checked");
				var defaultV = list.get(0).value;
				return defaultV;
			}
			
			function doSetDefault() {
				parent.showWaitDisplayForQuery('<%=basePath%>',"正在设置...");
				$.ajax({
					type: "post",
					url: "<%=basePath%>sysManageLogin/setDefaultFlagV2.action",
					data: {'id':getV()
						  ,'loginName':'<%=loginName%>'},
					dataType:"json",
					success: function(json){
						parent.disWaitDisplayForQuery();
				   		if (json.flag == "0"){
							MessageBox(json.msg);
				   		}
				   		if (json.flag == "1"){
				   			refreshPage();
				   		}
				   },
				   error:function(XMLHttpRequest, textStatus, errorThrown){
	               	  parent.disWaitDisplayForQuery();
				   	  MessageBox("网络异常！");
				   }
				});
			}
			
			function bind() {
				parent.showRelevanceBindAccount();
			}
			
			function setDefault(){
				var list = $("input[type='checkbox'][name='ids']:checked");
				if (list.length != 1) {
					MessageBox("请选择一条记录！");
					return false;
				}
				MessageBox("确定设置所选为默认账户吗？","系统提示", Q_ICON, MB_YESNO, doSetDefault);
			}
			
			function cancelBind(){
				var list = $("input[type='checkbox'][name='ids']:checked");
				if (list.length == 0) {
					MessageBox("请至少选择一条记录！");
					return false;
				}
				MessageBox("确定取消所选绑定吗？","系统提示", Q_ICON, MB_YESNO, doCncelBind);
			}
			
			function doCncelBind(result) {
				if(result == MB_YES) {
					var list = $("input[type='checkbox'][name='ids']:checked");
					var id = new Array();
					list.each(function(){
						id.push(this.value);
					});
					
					parent.showWaitDisplayForQuery('<%=basePath%>',"正在取消绑定...");
					$.ajax({
						type: "post",
						url: "<%=basePath%>sysManageLogin/deleteAccountV2.action",
						data: {'id':id.join(","),
								'queryName':'<%=queryName%>'},
						dataType:"json",
						success: function(json){
							parent.disWaitDisplayForQuery();
					   		if (json.flag != "1"){
								MessageBox(json.msg);
					   		}
					   		if (json.flag == "1"){
								parent.init();
					   		}
					   },
					   error:function(XMLHttpRequest, textStatus, errorThrown){
		               	  parent.disWaitDisplayForQuery();
					   	  MessageBox("网络异常！");
					   }
					});
				}
			
			}
			
			function show() {
				var list = $("input[type='checkbox'][name='ids']:checked");
				if (list.length != 1) {
					MessageBox("请选择一条记录！");
					return false;
				}
				var id = new Array();
				list.each(function(){
					id.push(this.value);
				});
				var url = "<%=basePath%>sysManageLogin/queryRoleV2.action?id="+id;
				OpenWin(url,"查看角色",800,620);
			}
		</script>
	</head>
	<base target="_self">
	<body style="background-color: #f8f8f8;">
		<form id="thisform" name="thisform" method="post" action="">
			<input type="hidden" id="type" value="">
			<table width="100%" cellspacing="0" cellpadding="0" border="0"
				class="messageList">
				<tbody valign="top">
					<tr>
						<td class="contentBoxBom">
							<div id="topDivId"
								style="position: relative; border: 0; width: 100%; overflow: auto">
								<table class="listTable" width="100%" border="0" cellspacing="0"
										cellpadding="0">
									<tr class="listHead" style="position:relative; top:expression(this.offsetParent.scrollTop);">
										<td style="border-left: #ccc solid 1px;" nowrap="nowrap"
											align="center">
										</td>
										<td nowrap="nowrap" align="center">
											序号
										</td>
										<td nowrap="nowrap" align="center">
											账号名称
										</td>
										<td nowrap="nowrap" align="center">
											账户登录名称
										</td>
										<td nowrap="nowrap" align="center">
											所属部门名称
										</td>
										<td nowrap="nowrap" align="center">
											所属单位名称
										</td>
										<td nowrap="nowrap" align="center">
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
									<tr class="<%=(i%2==0?"":"grayLine") %>">
										<td style="border-left: #ccc solid 1px;">
											<input type="checkbox" name="ids" value="<%=accountInfo.get("ID")%>"/>
										</td>
										<td nowrap="nowrap">
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
											<% if ("1".equals(accountInfo.get("FLAG"))) {%>
												<font color='green'>√</font>
											<%} %>
										</td>
									</tr>
									<%
										} else {
									%>
									<tr class="<%=(i%2==0?"":"grayLine") %>">
										<td
											style="border-bottom: #ccc solid 1px; border-left: #ccc solid 1px;">
											<input type="checkbox" name="ids" value="<%=accountInfo.get("ID")%>"/>
										</td>
										<td style="border-bottom: #ccc solid 1px;" nowrap="nowrap">
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
											<% if ("1".equals(accountInfo.get("FLAG"))) {%>
												<font color='green'>√</font>
											<%} %>
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
										<td style="border-bottom: #ccc solid 1px;"></td>
										<td
											style="border-right: #ccc solid 2px; border-bottom: #ccc solid 1px;"></td>
									</tr>
									<%
										}
									%>
								</table>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<!-- 底部按钮区开始  -->
							<div class="btnArea">
								<input type="button" name="btnDefault" class="btn1_mouseout"
									value="设置默认账号" onmouseover="this.className='btn1_mouseover'"
									onmouseout="this.className='btn1_mouseout'"
									onclick="setDefault();" />
								<input type="button" name="btnBind" class="btn1_mouseout"
									value="绑定其他采集账号" onmouseover="this.className='btn1_mouseover'"
									onmouseout="this.className='btn1_mouseout'"
									onclick="bind();" />
								<input type="button" name="btnCancel" class="btn1_mouseout"
									value="取消绑定" onmouseover="this.className='btn1_mouseover'"
									onmouseout="this.className='btn1_mouseout'"
									onclick="cancelBind();" />
								<input type="button" name="btnShow" class="btn1_mouseout"
									value="查看角色" onmouseover="this.className='btn1_mouseover'"
									onmouseout="this.className='btn1_mouseout'"
									onclick="show();" />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</body>
</html>
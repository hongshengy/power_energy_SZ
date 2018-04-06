<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
UserInfo info = (UserInfo)session.getAttribute("userInfo");
String loginName = info.getLoginName();
String queryName = loginName;
if (session.getAttribute("MH_EMP_NO") != null) {
	queryName = session.getAttribute("MH_EMP_NO").toString();
}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>个人设置</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<jsp:include page="/pages/common/head.jsp" />
		<jsp:include page="/pages/common/componentBaseTest.jsp" />
				<script type="text/javascript">
			function init() {
				window.onresize = reszieFun;
				//添加遮罩
				showWaitDisplayForQuery('<%=basePath%>','正在加载页面');
				document.thisform.action="<%=basePath%>sysManageLogin/findAccountInfoV2.action?flg=1&queryName=<%=queryName%>";
				document.thisform.submit();
			}
			
			//窗口自适应调整
			function reszieFun() {
				setTimeout('setDataGridHeight();',100);
			}
			function setDataGridHeight() {
				var ifmWin = window.frames["bodyFrame"];
				if (ifmWin != undefined && ifmWin.setDataGridHeight != undefined) {
					ifmWin.setDataGridHeight();
					return;
				} else {
					setTimeout('setDataGridHeight();',100);
				}
			}
			
			function modify(){
				showRelevanceModifyAccount();
			}
			
			function showWaitDisplay(path){
			  var objMask = document.all("_maskForDisplay");
			    if (!objMask){
			         objMask = document.body.appendChild(document.createElement("DIV"));
			          with(objMask){
			            id = "_maskForDisplay";
			            className = "msgbox_mask";
			            style.zIndex=99992;
			            style.dispaly="none";
			            style.filter="alpha(opacity=20)";
			        }
				}
					
			  document.getElementById("_maskForDisplay").style.display = "";
			  document.getElementById("_maskForDisplay").style.width = "100%";
			  document.getElementById("_maskForDisplay").style.height = GetBrowserDocument().scrollHeight + "px";
			 
			  //隐藏滚动条
			  document.body.style.overflow = "hidden";
		}
		
		function showRelevanceBindAccount(){
	 		showWaitDisplay('<%=basePath%>');
	 		$("#relevanceBindAccountDiv").css({"left":($(window).width()-$("#relevanceBindAccountDiv").width())/2,"top":($(window).height()-$("#relevanceBindAccountDiv").height())/2 + 50});
	 		$("#relevanceBindAccountDiv").fadeIn("slow");
	 	}
	 	
		function showRelevanceModifyAccount(){
	 		showWaitDisplay('<%=basePath%>');
	 		$("#relevanceModifyAccountDiv").css({"left":($(window).width()-$("#relevanceModifyAccountDiv").width())/2,"top":($(window).height()-$("#relevanceModifyAccountDiv").height())/2 + 50});
	 		$("#relevanceModifyAccountDiv").fadeIn("slow");
	 	}
	 	
	 	function doBind() {
			parent.showWaitDisplayForQuery('<%=basePath%>',"正在绑定...");
			$.ajax({
				type: "post",
				url: "<%=basePath%>sysManageLogin/bindAccountV2.action",
				data: {'loginName':$('#bindName').val()
					  ,'password':$('#bindPassword').val()
					  ,'queryName':'<%=queryName%>'},
				dataType:"json",
				success: function(json){
					parent.disWaitDisplayForQuery();
					if (json.flag == "2") {
						MessageBox(json.msg);
						document.getElementById('bindName').value='';
						document.getElementById('bindPassword').value='';
					}
			   		if (json.flag == "1") {
			   			hideBindAccountRelevance();
						//添加遮罩
						showWaitDisplayForQuery('<%=basePath%>','正在加载页面');
						document.thisform.action="<%=basePath%>sysManageLogin/findAccountInfoV2.action?flg=1&queryName=<%=queryName%>";
						document.thisform.submit();
						
			   		}
			   		if (json.flag == "0"){
						MessageBox(json.msg);
			   		}
			   },
			   error:function(XMLHttpRequest, textStatus, errorThrown){
               	  parent.disWaitDisplayForQuery();
			   	  MessageBox("网络异常！");
			   }
			});
		}
		
		function hideBindAccountRelevance(){
			document.body.removeChild(document.getElementById("_maskForDisplay")); 
	 		$("#relevanceBindAccountDiv").fadeOut("slow");
			document.getElementById('bindName').value='';
			document.getElementById('bindPassword').value='';
	 	}
	 	
		function hideModifyAccountRelevance(){
			document.body.removeChild(document.getElementById("_maskForDisplay")); 
	 		$("#relevanceModifyAccountDiv").fadeOut("slow");
			document.getElementById('modifyName').value='';
			document.getElementById('modifyPassword').value='';
	 	}
	 	
	 	function doModify() {
	 		parent.showWaitDisplayForQuery('<%=basePath%>',"正在修改...");
			$.ajax({
				type: "post",
				url: "<%=basePath%>sysManageLogin/modifyMHNameV2.action",
				data: {'modifyName':$('#modifyName').val()
					  ,'modifyPassword':$('#modifyPassword').val()
					  ,'queryName':'<%=queryName%>'},
				dataType:"json",
				success: function(json){
					parent.disWaitDisplayForQuery();
			   		if (json.flag == "1") {
			   			document.getElementById("mhName").innerHTML = $('#modifyName').val();
			   			hideModifyAccountRelevance();
			   		}
			   		if (json.flag == "0"){
						document.getElementById('modifyName').value='';
						document.getElementById('modifyPassword').value='';
						MessageBox(json.msg);
			   		}
			   		if (json.flag == "2"){
						MessageBox(json.msg);
			   		}
			   },
			   error:function(XMLHttpRequest, textStatus, errorThrown){
               	  parent.disWaitDisplayForQuery();
			   	  MessageBox("网络异常！");
			   }
			});
	 	}
	</script>
	<style>
		.relevance-bind-account-box{
			background-color:white;border: 2;border-style:solid;
			position:absolute;display:none; z-index:99997;width:460px; height:200px; 
		}
		.relevance-modify-account-box{
			background-color:white;border: 2;border-style:solid;
			position:absolute;display:none; z-index:99997;width:460px; height:200px; 
		}
	</style>
	</head>
	<body style="background-color: #f8f8f8;" scroll="no" onload="init()">
		<form id="thisform" name="thisform" method="post" target="bodyFrame">
			<div
				style="position: relative; border: 0; width: 100%; height: 100%; overflow: auto;">
				<table width="100%" cellspacing="0" cellpadding="0" border="0"
					class="content">
					<tbody>
						<tr>
							<td class="contentBoxUp" height="20%">
								<table width="100%" cellspacing="0" cellpadding="0" border="0"
									class="message">
									<tbody>
										<tr>
											<td class="messageHead">
												个人账号信息
											</td>
										</tr>
										<tr>
											<td class="messageList">
												<table cellspacing="0" cellpadding="0" border="0"
													align="left" style="width: 100%;">
													<tbody>
														<tr style="width: 100%;" align="left">
															<td width=25% class="messageList_text" nowrap>
																统一认证账户登录名:
															</td>
															<td width=25% >
																<span id="mhName"><%=loginName%></span>
															</td>
															<td  width=25% class="messageList_text" nowrap>
																关联日期:
															</td>
															<td width=25% >
																<span id='createDate'></span>
															</td>
															
											<td colspan="6" class="messageList" style="display:none">
												<input type="button" id="btnModify" class="btn1_mouseout"
													value="修改登录名"
													onmouseover="this.className='btn1_mouseover'"
													onmouseout="this.className='btn1_mouseout'"
													onClick="modify();" />
											</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td><iframe name="bodyFrame" width="100%" height="100%"
									scrolling="no" frameborder=0 id="bodyFrame" src=""></iframe>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</form>
		
		<div class="relevance-bind-account-box" id="relevanceBindAccountDiv">
			<span class="title" style="position:absolute;left:150px;top:52px;font-size: 12;font-weight:bold;">绑定用户用电信息采集系统账号</span>
			<form id="bindForm" name="bindForm" action="" method="post">
				<div class="login_box" style="position:absolute;left:100px;top:80px;font-size: 12;">
					<table class="login_table" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td width="60" height="30" align="left" class="messageList_text">
								用户名：
							</td>
							<td align="left" >
								<input style="width: 150px; height: 20px;" id="bindName"
									name="bindName" type="text" value="" class="input_text" />
							</td>
						</tr>
						<tr>
							<td height="30" align="left" class="messageList_text">
								密码：
							</td>
							<td>
								<input style="width: 150px; height: 20px;" id="bindPassword"
									name="bindPassword" type="password" value="" class="input_text"/>
							</td>
						</tr>
					</table>
				</div>
			</form>
			<input type="button" id="bind" 
				class="btn1_mouseout" value="  绑定  " 
				onmouseover="this.className='btn1_mouseover'"
				onmouseout="this.className='btn1_mouseout'" style="position:absolute;left:100px;top:150px;" onclick="doBind()"/>
			<input type="button" id="cancel" 
				class="btn1_mouseout" value="  取消  " 
				onmouseover="this.className='btn1_mouseover'"
				onmouseout="this.className='btn1_mouseout'" style="position:absolute;left:270px;top:150px;" onclick="hideBindAccountRelevance()"/>
		</div>
		
		<div class="relevance-modify-account-box" id="relevanceModifyAccountDiv">
			<span class="title" style="position:absolute;left:200px;top:52px;font-size: 12;font-weight:bold;">修改门户账号</span>
			<form id="bindForm" name="bindForm" action="" method="post">
				<div class="login_box" style="position:absolute;left:100px;top:80px;font-size: 12;">
					<table class="login_table" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td width="60" height="30" align="left" class="messageList_text">
								用户名：
							</td>
							<td align="left" >
								<input style="width: 150px; height: 20px;" id="modifyName"
									name="modifyName" type="text" value="" class="input_text" />
							</td>
						</tr>
						<tr>
							<td height="30" align="left" class="messageList_text">
								密码：
							</td>
							<td>
								<input style="width: 150px; height: 20px;" id="modifyPassword"
									name="modifyPassword" type="password" value="" class="input_text"/>
							</td>
						</tr>
					</table>
				</div>
			</form>
			<input type="button" id="bind" 
				class="btn1_mouseout" value="  修改  " 
				onmouseover="this.className='btn1_mouseover'"
				onmouseout="this.className='btn1_mouseout'" style="position:absolute;left:100px;top:150px;" onclick="doModify()"/>
			<input type="button" id="cancel" 
				class="btn1_mouseout" value="  取消  " 
				onmouseover="this.className='btn1_mouseover'"
				onmouseout="this.className='btn1_mouseout'" style="position:absolute;left:270px;top:150px;" onclick="hideModifyAccountRelevance()"/>
		</div>
	</body>


</html>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>系统登录</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
	</head>
	<script>
		var error = '<%=request.getAttribute("error")%>';
		if( error != 'null' && error.length > 0){
			alert(error);
			//alert(1111);
		}
	
	
	//是否为空校验
	function isEmpty(s) {
		var lll=trim(s);
		if( lll == null || lll.length == 0 )
			return true;
		else
			return false;
	}
	
	//删除字符串左边的空格
	function ltrim(str) { 
		if(str.length==0)
			return(str);
		else {
			var idx=0;
			while(str.charAt(idx).search(/\s/)==0)
				idx++;
			return(str.substr(idx));
		}
	}

	//删除字符串右边的空格
	function rtrim(str) { 
		if(str.length==0)
			return(str);
		else {
			var idx=str.length-1;
			while(str.charAt(idx).search(/\s/)==0)
				idx--;
			return(str.substring(0,idx+1));
		}
	}

	//删除字符串左右两边的空格
	function trim(str) { 
		return(rtrim(ltrim(str)));
	}

    function login(){
    	var name = document.getElementById("loginName").value;
    	var password = document.getElementById("password").value;
	    if( isEmpty(name) || trim(name)=="" || isEmpty(password) || trim(password)== ""){
	       
	      alert("用户名/密码为空,请重新输入!");
	      return false;  
	    }
	   	//alert("不应该出现");
    	document.LoginForm.action = "<%=basePath%>" +"systemLogin/login.action";
    	document.LoginForm.method = "post";
        document.LoginForm.submit();
        return false;
    }

	    function KeyDown(event,focusId){
			event = event ? event : (window.event ? window.event : null);
			if (event.keyCode == 13){
				if(focusId=='loginName'){
					document.getElementById("password").focus();
				}else{
					event.returnValue=false;
					event.cancel = true;
					window.document.forms[0].submit();			
				}
			}
		}
	</script>
	<style type="text/css">
<!--
body {
	background-color: #FFFFFF;
}

#apDiv1 {
	position: absolute;
	left: 512px;
	top: 501px;
	width: 285px;
	height: 146px;
	z-index: 1;
}

.input1 {
	height: 20px;
	width: 110px;
}

.STYLE1 {
	color: #9DD4D6
}

a:link {
	color: #9AD3D3;
	font-size: 9pt;
}

a:visited {
	color: #9AD3D3;
	font-size: 9pt;
}

a:hover {
	color: #9CD4D4;
	font-size: 9pt;
}

a:active {
	color: #99D3D3;
	font-size: 9pt;
}

#apDiv1 {
	font-size: 9pt;
	color: #9CD4D4;
}

.tab_position {
	position: absolute;
	width: 500px;
	height: 100px;
	left: 50%;
	margin-left: -250px;
	margin-top: 360px;
}
.button_Reset {
	BORDER-RIGHT: 0px none;
	border-left:0px none;
	border-top:0px none;
	border-bottom:0px none;
	font-size: 9pt;
	width: 58px;
	color: #356a63;
	font-family: "宋体";
	height: 21px;
	background: url(images/img/cancel_normal.gif)
}
.button_Reset_over {
	BORDER-RIGHT: 0px none;
	border-left:0px none;
	border-top:0px none;
	border-bottom:0px none;
	font-size: 9pt;
	width: 58px;
	color: #356a63;
	font-family: "宋体";
	height: 21px;
	background: url(images/img/cancel_hover.gif)
}
.button_Login {
	BORDER-RIGHT: 0px none;
	border-left:0px none;
	border-top:0px none;
	border-bottom:0px none;
	font-size: 9pt;
	width: 58px;
	color: #356a63;
	font-family: "宋体";
	height: 21px;
	background: url(images/img/login_normal.gif)
}
.button_Login_over {
	BORDER-RIGHT: 0px none;
	border-left:0px none;
	border-top:0px none;
	border-bottom:0px none;
	font-size: 9pt;
	width: 58px;
	color: #356a63;
	font-family: "宋体";
	height: 21px;
	background: url(images/img/login_hover.gif)
}
-->
</style>
	<body onload="document.forms[0].loginName.focus();" leftmargin="0"
		topmargin="0" marginheight="0" marginwidth="0"
		style="background: url('images/img/login8_bg.jpg') repeat-x center top;">


		<form name="LoginForm" action="<%=basePath%>systemLogin/login.action"
			method="post">
			<table border="0" cellpadding="0" cellspacing="0"
				class="tab_position">
				<tbody>
					<tr height="25">
						<td></td>
						<td></td>
						<td>
							<span id="spanMessage"></span>
						</td>
					</tr>
					<tr>
						<td width="200">
							<font size="2"><b>登录名称:</b>
							</font>
							<input name="loginName" tabindex="1" class="input1"
								id="loginName" value="" size="14" type="text"  onkeydown="KeyDown(event,'loginName');">
						</td>
						<td width="200">
							<font size="2"><b>您的密码:</b>
							</font>
							<input name="password" tabindex="2" class="input1" id="password"
								size="14" type="password"  onkeydown="KeyDown(event,'password');" >
						</td>
						<td width="100" height="19" align="center">
							<table width="120" border="0" cellpadding="0" cellspacing="0">
								<tbody>
									<tr>
										<td width="48%">
											<label>
												<input name="imageField" id="imageField"
													onMouseOut="document.all('imageField').className='button_Login'"
													onMouseOver="document.all('imageField').className='button_Login_over'"
													class="button_Login" onclick="login()"
													type="button">
											</label>
										</td>
										<td width="4%">
											&nbsp;
										</td>
										<td width="48%">
											<label>
												<input name="imageField2" id="imageField2"
													onMouseOut="document.all('imageField2').className='button_Reset'"
													onMouseOver="document.all('imageField2').className='button_Reset_over'"
													class="button_Reset" type="button"
													onclick="document.forms[0].reset()">
											</label>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td colspan="3" align="center" nowrap="nowrap">
							<font size="2" color="red"><span></span> </font>
							<input name="nextPath" value="<%=request.getParameter("goto")%>"
								type="hidden">
						</td>
					</tr>
				</tbody>
			</table>
		</form>

	</body>
	<div FirebugVersion="1.3.3" style="display: none;" id="_firebugConsole"></div>
</html>

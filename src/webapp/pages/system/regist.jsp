<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>:::注册页面:::</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script language="JavaScript">
		function uploadRegistFile(){
			if (document.thisform.regist.value==""){
				alert('请选择注册文件！');
				return false
			}
			document.thisform.action="<%=basePath%>/regist/uploadRegistFile.action";
			document.thisform.submit();
			return true;
		}
		function downloadRegistFile(){
			document.thisform.action="<%=basePath%>/regist/downloadRegistFile.action";
			document.thisform.submit();
		}		
	</script>	
  </head>
  
	<body topmargin="0" leftmargin="0">
		<form name=thisform method=post ENCTYPE="multipart/form-data">
		<p>
		    <table align="center">
		    <tr>
		    <td height="200"></td>
		    </tr>
		    <tr><td align=center><font color=red>您还未注册！</font></td></tr>
		    <tr><td align=center><font color=red>如果没有注册码，请和厂家联系！</font></td></tr>
		    <tr><td align=center><input type="button" value="提取信息" onclick="downloadRegistFile();">
		    </td></tr>
		    <tr><td align=center><font color=red>如果有注册码，请选择上传！</font></td></tr>
		    <tr><td align=center><input type="file"  name=regist maxlength=16  class=textfield ><input name=sub type=button class=button value="上 传" onclick="uploadRegistFile();">
		    </td>
		    </tr>
		    </table>
		</form>
	</body>
</html>

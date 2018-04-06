<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages";	

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
 <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 	<meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <title>手机接口测试</title>
    <link rel="stylesheet" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/common/css/common.css">

</head>

<body>

<!-- 手机端口测试 -->
<div> "USR": "des",
        "PWD": "0ecee728bf87a4c1a02883004044dcd5",
         "USER_ID" : "10099212090",
         "TID": "352621064948620",<br/>
         select to_char(login_time,'yyyy-MM-dd HH24:mi:ss') SUCCESS_FLAG,'1' MSG,t.ssn  ,t.tid 
from SF_WORKNOTE_MOBLE_SSN t 
order by SUCCESS_FLAG desc
</div>
<textarea id="test_request" rows="20" cols="80" title="请求域"></textarea>
<input id="test_button" name="test" type="button" value="测试按钮"/>
<div id="test_content"></div>
<script type="text/javascript">
		webContextRoot="<%=basePath%>";
</script>
<script src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=pagePath %>/common/jquery-easyui-1.5.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="<%=pagePath %>/interfaceForPhoneTest.js"></script>
<script src="<%=pagePath %>/common/js/common.js"></script>

</body>
</html>

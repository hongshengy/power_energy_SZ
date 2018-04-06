<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	
	String json = request.getAttribute("json")+"";
	if(json.contains("sysUser.validateUser")){
%>
		<script>
			alert('数据库连接异常！');
			document.location.href = '<%=basePath%>/pages/system/login.jsp';
		</script>
<%
	out.println("");
	}else{
	    out.println("{success:false,failure:true,errors:"+json+",list:[]}");
	}
%>
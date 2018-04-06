<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="com.frontier.framework.application.SystemConstants"%>
<script type="text/javascript">document.domain="<%=SystemConstants.getJsepcDomain()%>";</script>
<%
	String json = request.getAttribute("json")+"";
	//String test = "{inftype:2,showdetial:'',clientCode:'test',message:'操作失败!!!',detailmessage:'testdm',callback:''}";
	out.println("{success:false,failure:true,errors:"+json+"}");
%>


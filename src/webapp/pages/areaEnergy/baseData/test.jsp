<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String baseUrl = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  	<head>   
	    <title>测试</title>
	    <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
	<script type="text/javascript">
	   $(function(){
	        //alert('${param.id}');
	        //var node = parent.com.frontier.areaEnergy.baseData.reloadTree.getSelected();
	        //alert(node);
	        //parent.com.frontier.areaEnergy.baseData.test();
	        //parent.com.frontier.areaEnergy.baseData.reloadTree.getSelected();
	        //parent.com.frontier.areaEnergy.baseData.reloadTree.reAnchorAndClickCurrentNode();
	   });
	   
	   function addInfo(){
	      parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
	   }
	   
	   function updateInfo(){
	      
	   }
	</script>
	<body>
		<button class="easyui-linkbutton c1" onclick="addInfo()" style="width:70px;">增加</button>
		<button class="easyui-linkbutton c1" onclick="updateInfo()" style="width:70px;">修改</button>
	</body>
</html>

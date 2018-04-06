<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String device = request.getParameter("device");
	String data = request.getParameter("data");
	String station = request.getParameter("station");
%>
<html>
  <head>
  	<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	<base href="<%=basePath%>">
    <title>其他设备信息</title>
    <script type="text/javascript">
    	var basePath = '<%=basePath%>';
		var device = '<%=device%>';
		var data = '<%=data%>';
		var station = '<%=station%>';
	</script>
	<style type="text/css">
		html,body {
			height: 100%;
		}
	</style>
  </head>
  
  <body>
	<div class="easyui-panel" title="查询结果" style="width:100%;height:100%;">
		<div style="height: 100%;width: 100%;">
			<div id="jcxTab" class="easyui-tabs" style="width:100%;height:100%;">
				<div title="图表" id="jcxtp" style="display:none;">
					<iframe id="jcxtpFrame" selected="true" src="" width="100%"
						height="100%" frameborder="0" scrolling="no"></iframe>
				</div>
				<div title="数据" id="jcxsj" style="display:none;">
						<iframe id="jcxsjFrame" width="100%" height="100%" frameborder="0" style="height: 100%;width: 100%;"
						scrolling="no"></iframe>
				</div>
			</div>
		</div>
	</div>
</body>
   <script type="text/javascript">
   		var queryType = 0;
   		var queryparam;
        $(document).ready(function(){
         	 //现实日期控件和提交按钮
			 $('#jcxTab').tabs({    
			    border:false,    
			    onSelect:function(title){
			    	if(title == '数据'){
			    		queryType = 1;
			    	}else{
			    		queryType = 0;
			    	}
			    }    
			});
			loadQydlBar();
		 });
		 
		 function loadQydlBar(){
		 	var data = $("#sjrq",window.parent.document).val();
		 	queryparam = "queryPara.DEVICE_ID="+device+"&queryPara.DATE_TIME="+data
		    +"&queryPara.ORG_NO=02&queryPara.TYPE=&queryPara.startSize="+station;
			document.getElementById("jcxtpFrame").src = basePath+"pages/areaEnergy/baseData/otherequip/otherequipmentTabPic.jsp?device="+device+"&data="+data+"&station="+station;
	 	 	document.getElementById("jcxsjFrame").src = basePath+"/userDataCenterAction/otherequipmentTabSou.action?"+queryparam;
	 	 	
		 }
		 
		 //查询数据信息
		 function querySource(data){
		 	var station = $("#station",window.parent.document).val();
		 	queryparam = "queryPara.DEVICE_ID="+device+"&queryPara.DATE_TIME="+data
		    +"&queryPara.ORG_NO=02&queryPara.TYPE=&queryPara.startSize="+station;
	 	 	document.getElementById("jcxsjFrame").src = basePath+"/userDataCenterAction/otherequipmentTabSou.action?"+queryparam;
			document.getElementById("jcxtpFrame").src = basePath+"pages/areaEnergy/baseData/otherequip/otherequipmentTabPic.jsp?device="+device+"&data="+data+"&station="+station;
		 	$("#jcxTab").tabs("select",0);
		 }
	</script>
</html>

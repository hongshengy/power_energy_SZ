<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String station = request.getParameter("station");
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>水表气表蒸汽表数据曲线</title>
		<jsp:include page="/ext.jsp" />
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<script type="text/javascript"
			src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
		<script type="text/javascript">
			 var basePath = '<%=basePath%>';
			 var lineId = '${param.lineId}';
			 var mpId = '${param.mpId}';
			 var datadate = '${param.riqiIn}';
			 var hheight = '${param.hheight}';
			 var hei = parseInt(hheight);
		</script>
		<style type="text/css">
			html,body {
				height: 100%;
			}
		</style>
	</head>


	<body scroll="no" id="dataBody1">
	<div class="easyui-panel" title="查询结果" style="width:100%;height:100%;">
		<div style="height: 100%;width: 100%;">
			<div id="cxTab" class="easyui-tabs" style="width:100%;height:100%;">
			
				<div title="图表" id="jcxtp" style="display:none;">
					<iframe id="pictableFrame" selected="true" src="" width="100%"
						height="100%" frameborder="0" scrolling="no"></iframe>
				</div>
			
			
				<div title="数据" id="jcxsj" style="display:none;">
						<iframe id="sourceFrame" width="100%" height="100%" frameborder="0" style="height: 100%;width: 100%;"
						scrolling="no"></iframe>
				</div>
				
			</div>
		</div>
	</div>
</body>
	<script type="text/javascript">
	 //初始化方法
        Ext.onReady(function(){
        	var countNum = parent.$("#countNumText").val();
        	var station = $("#station",window.parent.document).val();    
        	if(countNum == 1){
        		 $('#cxTab').tabs({    
					    border:false,    
					    onSelect:function(title,index){ 
					    	var station = $("#station",window.parent.document).val();    
					        if(index == 0){
					        	var url = basePath+"/pages/areaEnergy/consDataCentre/sbcdsjzsPic.jsp?LINEID="+lineId+"&mpId="+mpId+"&dateTime="+datadate+"&station="+station;
					        	document.getElementById("pictableFrame").src = url;
					        }
					        if(index == 1){
					        	var queryUrl = basePath+"/areaEnergy/querySBCDSJPicData.action?"
					        	+"queryPara.mpId="+mpId+"&queryPara.DATE_TIME="+datadate
					        	+"&queryPara.startSize="+station;
					        	document.getElementById("sourceFrame").src = queryUrl;
					        }
					    }    
				  }); 
			  //默认显示 
	          	document.getElementById("pictableFrame").src =  basePath+"/pages/areaEnergy/consDataCentre/sbcdsjzsPic.jsp?LINEID="+lineId+"&mpId="+mpId+"&dateTime="+datadate+"&station="+station;
        	}else{
	             $('#cxTab').tabs({    
					    border:false,    
					    onSelect:function(title,index){ 
					    	var station = $("#station",window.parent.document).val();    
					        if(index == 0){
					        	var url = basePath+"/pages/areaEnergy/consDataCentre/sbcdsjzsPic.jsp?LINEID="+lineId+"&mpId="+mpId+"&dateTime="+datadate+"&station="+station;
					        	document.getElementById("pictableFrame").src = url;
					        }
					        if(index == 1){
					        	var queryUrl = basePath+"/areaEnergy/querySBCDSJPicData.action?"
					        	+"queryPara.mpId="+mpId+"&queryPara.DATE_TIME="+datadate
					        	+"&queryPara.startSize="+station;
					        	document.getElementById("sourceFrame").src = queryUrl;
					        }
					    }    
				  }); 
			     //默认显示 
	        	document.getElementById("pictableFrame").src =  basePath+"/pages/areaEnergy/consDataCentre/sbcdsjzsPic.jsp?LINEID="+lineId+"&mpId="+mpId+"&dateTime="+datadate+"&station="+station;
        	}
	 });
	</script>
</html>

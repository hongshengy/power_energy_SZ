<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>谐波tab页</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<script type="text/javascript"
			src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
		<script type="text/javascript"
			src="<%=basePath%>/pages/areaEnergy/baseData/userSubstation/DateSwitch.js"></script>
		<script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var codeId = '${queryPara.codeId}';
		 var subId = '${queryPara.subId}';
	</script>
		<style type="text/css">
	html,body {
		height: 100%;
		background-color: #F8F8F8;
	}
</style>
	</head>

	<body scroll="no" id="dataBody1" >
		<div style="height: 30px;">
			<div style="float: left;font-weight: bold;line-height: 30px;">查询结果</div>
			<div style="float: left;margin-left: 20px;font-weight: bold;line-height: 30px;">线路名称：</div>
			<div style="float: left;padding-top: 2px;">
				<select id="allLine" name="allLine"  class="easyui-combobox" style="width: 155px;height: 25px;">
					<c:forEach var="data" items="${resultMap.LINE}" varStatus="sta" step="1">
						<option value="${data.codeVal}">${data.codeName}</option>
					</c:forEach>
               	</select>
			</div>
			<div style="float: left;margin-left: 20px;font-weight: bold;line-height: 30px;">请选择：</div>
			<div style="float: left;padding-top: 2px;">
				<select id="xlline" name="xlline"  class="easyui-combobox" style="width: 155px;height: 25px;">
					<c:forEach var="data" items="${resultMap.LINEC}" varStatus="sta" step="1">
						<option value="${data.codeVal}">${data.codeName}</option>
					</c:forEach>
               	</select>
			</div>
			<div style="float: left;margin-left: 20px;font-weight: bold;line-height: 30px;">实时：</div>
			<div style="float: left;line-height: 30px;"><input name="searchType" type="radio" value="0" checked="checked" style="margin-top: 7px;height: 15px;width: 15px;" onclick="ssdj(0)"/></div>
			<div style="float: left;margin-left: 20px;font-weight: bold;line-height: 30px;">冻结：</div>
			<div style="float: left;line-height: 30px;margin-right: 20px;"><input name="searchType" type="radio" value="1" style="margin-top: 7px;height: 15px;width: 15px;" onclick="ssdj(1)"/></div>
			<div id="ida" style="float: left;font-weight: bold;line-height: 30px;display: none;">数据日期：</div>
			<div style="float: left;padding-top: 2px;">
				<div id="idb" style="float: left;display: none;width: 160px;">
					<input id="sjrq" type="text" class="easyui-datetimebox" value="${queryPara.lastTime}" style="height: 25px;width: 160px;"/>
				</div>
				<a onclick="query();" id="button_query" class="easyui-linkbutton c1" href="javascript:void(0);" style="width:40px;">查询</a>
			</div>
		</div>
		<div id="view1" >
			<div id="cxTab" class="easyui-tabs" style="width:100%;height:auto;" >
				<div title=" 图表">
					<div id="view2">
						<iframe id="view1Frame" selected="true" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
					</div>
				</div>
				<div title="数据" style="display:none;">  
			    	<div id="view3">   
			        	<iframe id="view2Frame"  width="100%" height="100%" frameborder="0" scrolling="no"></iframe> 
			        </div>
			    </div> 
			</div>
		</div>
	</body>
	<script type="text/javascript">
   		var queryType = 0;
         $(document).ready(function(){
         	screen();
         	loadTab();
         	
         	 $('#cxTab').tabs({    
			    border:false,    
			    onSelect:function(title){
			    	if(title == '数据'){
			    		queryType = 1;
			    	}else{
			    		queryType = 0;
			    	}
			       query();
			    }    
			});
			
			$("#allLine").combobox({
				onChange: function(record){
		            $('#xlline').combobox({
			            url :'<%=basePath%>areaEnergy/selectLineType.action?queryPara.lineId='+record,
			            valueField:'id',
			            textField:'text'
		       		}); 
				}
			});
		 });
		 
		 function loadTab(){
		 	var lineName = $("#allLine").combobox('getValue');
		 	var lineNamec = $("#xlline").combobox('getValue');
		 	var lasttime = $("#sjrq").val();
		 	var type = $("input[name='searchType']:checked").val();
		 	document.getElementById("view1Frame").src = basePath+"pages/areaEnergy/consDataCentre/xbTABPic.jsp?lineName="+lineName+"&lineNamec="+lineNamec+"&searchType="+type;
	 	 	//document.getElementById("view2Frame").src = basePath+"/areaEnergy/xbTABSou.action?queryPara.LINE_ID="+lineName+"&queryPara.TYPE="+lineNamec+"&queryPara.LASTTIME="+lasttime+"&queryPara.searchType="+type;
		 }
		 
		 $(window).resize(function () {
			screen();
		 });
		 
		 function screen(){
		 	dh = $("body").height();
		 	$("#view1").height(dh-30);
		 	$("#view2").height($("#view1").height()-30);
		 	$("#view3").height($("#view1").height()-30);
		 }
		 
		 function query(){
		 	var type = $("input[name='searchType']:checked").val();
		 	var lineName = $("#allLine").combobox('getValue');
		 	var lineNamec = $("#xlline").combobox('getValue');
		 	var lasttime = $("#sjrq").val();
		 	 if(queryType == 0){
				document.getElementById("view1Frame").src = basePath+"pages/areaEnergy/consDataCentre/xbTABPic.jsp?lineName="+lineName+"&lineNamec="+lineNamec+"&searchType="+type;
		 	 }else{
		 	 	document.getElementById("view2Frame").src = basePath+"/areaEnergy/xbTABSou.action?queryPara.LINE_ID="+lineName+"&queryPara.TYPE="+lineNamec+"&queryPara.LASTTIME="+lasttime+"&queryPara.searchType="+type;
		 	 }
		 }
		 
		 function ssdj(type){
		 	if(type==0){
		 		$("#ida").hide();
		 		$("#idb").hide();
		 	}else{
		 		$("#ida").show();
		 		$("#idb").show();
		 	}
		 }
		 
	</script>
</html>

<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
Calendar c = Calendar.getInstance();
String strCurrDate = f.format(c.getTime());
Calendar c1 = Calendar.getInstance();
c1.add(Calendar.DAY_OF_MONTH , -30);
String strCurrDate1 = f.format(c1.getTime());
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>日电量数据</title>
    <jsp:include page="/ext.jsp" />
    <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	<script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
	<script type="text/javascript" src="<%=basePath%>/pages/areaEnergy/baseData/userSubstation/DateSwitch.js"></script>
    <script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var strCurrDate = '<%=strCurrDate%>';
		 var strCurrDate1 = '<%=strCurrDate1%>';
		 var codeId = '${param.codeId}';
		 var subId = '${param.subId}';
		 var hheight = '${param.hheight}';
		 var hei = parseInt(hheight)*2;
	</script>
	<style type="text/css">
		html{
			background-color: #F8F8F8;
		}
		body{
			background-color: #F8F8F8;
		}
		*{
			margin: 0px 0px;
			padding: 0px 0px;
			border: none;
			overflow: hidden;
		}
	</style>
  </head>
  
  <body scroll="no" id="dataBody1">
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
				<form id="thisform" name="thisform" method="post" action="">
                    	<input id="startTime1" type="hidden" name="queryPara.START_DAY">
                    	<input id="endTime1" type="hidden" name="queryPara.END_DAY">
                    	<input id="lineId1" type="hidden" name="queryPara.LINE_ID">
                    	<input id="lineName1" type="hidden" name="queryPara.lineName1">
                    	<input id="DATA_TYPE1" type="hidden" name="queryPara.DATA_TYPE">
                    	<input id="QUERY_TYPE1" type="hidden" name="queryPara.QUERY_TYPE" value="02">
               </form>
			</div>
		</div>
	</div>
</body>
   <script type="text/javascript">
   		var queryType = 0;
         Ext.onReady(function(){
         	 //调整tab高度
         	 /**var mainHeight = hei - 43;
         	 $('#jcxTab').tabs({height:mainHeight}); **/	
         	 //现实日期控件和提交按钮
         	str1 = '查询结果'+
         	'&nbsp;&nbsp;&nbsp;&nbsp;线路名称：<input id="allLine" name="allLine" value="">&nbsp;&nbsp;&nbsp;&nbsp;电量计算方法：<input id="dljsff" name="dljsff" value="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数据日期：'+
         	'<input id="riqiIn" type="text" style="width:100px;height:25px;"/> &nbsp;至 <input id="riqiIn1" type="text" style="width:100px;height:25px;"/>'+
			'<button class="easyui-linkbutton c1" onclick="querys(0);" style="width:40px;height:25px;">查询</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class="easyui-linkbutton c1" onclick="excel1()" style="width:90px;height:25px;">导出Excel</button>'
			 $(".panel-title").css('height','30');
			 $(".panel-title").first().html(str1);
			 $(".panel-title").parent().attr('class','');
			 $('#riqiIn').datebox({    
			    required:false
			 });
			 $('#riqiIn1').datebox({    
			    required:false
			 });
			 $('#button_query').linkbutton({    
			 	text: '查询'   
			 });
			 $('#riqiIn').datebox('setValue',strCurrDate1); 
			 $('#riqiIn1').datebox('setValue',strCurrDate);
			 //下拉菜单
        	   $('#allLine').combobox({
		            url :'<%=basePath%>areaEnergy/selectAllLineBySUB.action?queryPara.subId='+subId,
		            valueField:'id',
		            textField:'text',
		            width:100,
		            onSelect: function(record){
		            	querys(0);
					}
		       }); 
		         //电量计算方法下拉
        	   $('#dljsff').combobox({
		            valueField:'id',
		            textField:'text',
		            width:100,
		            onSelect: function(record){
		            	querys(0);
					},
					data: [{
						id: '1',
						text: '负荷积分法',
						selected:true   
					},{
						id: '2',
						text: '遥脉相减法'
					}]
		       }); 
			 $('#jcxTab').tabs({    
			    border:false,    
			    onSelect:function(title){
			    	if(title == '数据'){
			    		queryType = 1;
			    	}else{
			    		queryType = 0;
			    	}
			       querys(0);
			    }    
			});
		 });
		 //点击查询按钮
		 function querys(tab){
			dataswitch("riqiIn",$("#riqiIn").val(),tab);
		 }
		 function query(){
		 	 var endTime = $('#riqiIn').val();
		 	 var startTime = $('#riqiIn1').val();
		 	 var lineId = $('#allLine').combobox("getValue");
		 	 var dljsff = $('#dljsff').combobox("getValue");
		 	 if(lineId){
		 	 	var DATA_TYPE = dljsff;
			 	 if(queryType == 0){
					var url = "<%=basePath%>/pages/areaEnergy/baseData/userDataCenter/loadyhfbLineDayPic.jsp?START_DAY="+endTime+"&LINE_ID="+lineId+"&END_DAY="+startTime+"&DATA_TYPE="+DATA_TYPE;
					$('#jcxtpFrame').attr('src',url);
			 	 }else{
			 	 	var url = "<%=basePath%>/userDataCenterAction/loadyhfbLineDay.action?queryPara.QUERY_TYPE=02&queryPara.START_DAY="+endTime+"&queryPara.LINE_ID="+lineId+"&queryPara.END_DAY="+startTime+"&queryPara.DATA_TYPE="+DATA_TYPE;
			 	 	$('#jcxsjFrame').attr('src',url);
			 	 }
		 	 }
		 }
		  function excel1(){
		 	 var startTime = $('#riqiIn').val();
		 	 var endTime = $('#riqiIn1').val();
		 	 var dljsff = $('#dljsff').combobox("getValue");
		 	 var lineId = $('#allLine').combobox("getValue");
		 	 var lineName = $('#allLine').combobox("getText");
		 	 if(lineId){
				  $('#DATA_TYPE1').val(dljsff);
				  $('#startTime1').val(startTime);
				  $('#endTime1').val(endTime);
				  $('#lineId1').val(lineId);
				  $('#lineName1').val(lineName);
			 	  document.thisform.action = basePath+"userDataCenterAction/xsdlExcel.action",
		 		  document.thisform.submit();
		 	 }
		 }
	</script>
</html>

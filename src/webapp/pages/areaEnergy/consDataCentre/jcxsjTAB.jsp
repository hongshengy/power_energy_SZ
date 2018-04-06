<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
Calendar c = Calendar.getInstance();
//c.add(Calendar.DAY_OF_MONTH , -1);
String strCurrDate = f.format(c.getTime());
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>进出线数据</title>
    <jsp:include page="/ext.jsp" />
    <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	<script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
    <script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var strCurrDate = '<%=strCurrDate%>';
		 var codeId = '${param.codeId}';
		 var terminalId = '${param.terminalId}';
		 var hheight = '${param.hheight}';
		 var hei = parseInt(hheight)*2;
	</script>
	<script type="text/javascript" src="<%=basePath%>pages/areaEnergy/consDataCentre/jcxsjTAB.js"></script>
	<script type="text/javascript" src="<%=basePath%>/pages/areaEnergy/baseData/userSubstation/DateSwitch.js"></script>
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
         	'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数据日期：'+
         	'<img  src="<%=basePath%>/images/tools-moveleft.gif" onclick="querys(1)" onmousemove="this.style.cursor=\'hand\'" onmouseout="this.style.cursor=\'default\'"/>'+
         	'<input id="riqiIn" type="text" style="width:155px;height:25px;"/>'+
				'<img  src="<%=basePath%>/images/tools-moveright.gif" onclick="querys(2)" onmousemove="this.style.cursor=\'hand\'" onmouseout="this.style.cursor=\'default\'"/>'+
				'<select id="station" class="easyui-combobox" style="width: 80px;" editable="false">'+
				'<option value="288" selected="selected">288点</option>'+
				'<option value="1440" >1440点</option></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
				'<a onclick="querys(0);" id="button_query" class="easyui-linkbutton c1" '+
				'href="javascript:void(0);" style="width:40px;height:25px;"'+
				'>查询</a>';
         	 /**str1 = '查询结果'+
         	 		'        <input id="riqiIn" type="text"/>'+
         	 		'        <button class="easyui-linkbutton c1" onclick="modifyMPInfo();" style="width:70px;"></button>';
     	 		**/
			 $(".panel-title").css('height','30');
			 $(".panel-title").first().html(str1);
			 $('#riqiIn').datebox({    
			    required:false
			 });
			 $('#station').combobox({    
			    required:false
			 });
			 $('#button_query').linkbutton({    
			 	text: '查询'   
			 });
			 $('#riqiIn').datebox('setValue',strCurrDate); 
			 /**$('#riqiIn').css("height","30"); 
			 $('#riqiIn').css("width","155"); 
			 $('#button_query').css("height","25"); 
			 $('#button_query').css("width","40"); 
			 xx;
			 
			 
			**/
			 $('#jcxTab').tabs({    
			    border:false,    
			    onSelect:function(title){
			    	if(title == '数据'){
			    		queryType = 1;
			    	}else{
			    		queryType = 0;
			    	}
			        //alert(title+' is selected');
			        querys(0);
			    }    
			});
			querys(0);
			
		 });
		 //点击查询按钮
		 function querys(tab){
			dataswitch("riqiIn",$("#riqiIn").val(),tab);
		 }
		 function query(){
		 	 var dateTime = $('#riqiIn').val();
		 	 var station = $("#station").val();
		 	 /**terminalId = "";
		 	 codeId = "101000000013";
		 	 dateTime = "2017-03-09";**/
		 	 //codeId = "";
		 	 //return;
		 	 if(queryType == 0){
		 	 	var url = "<%=basePath %>userDataCenterAction/jchLinePage.action?queryPara.DATE_TIME="+dateTime+"&queryPara.TERMINAL_ID="+terminalId+"&queryPara.SUBS_ID="+codeId+"&queryPara.station="+station;
				$('#jcxtpFrame').attr('src',url);
		 	 }else{
		 	 	var url = "<%=basePath %>userDataCenterAction/jcxDataInfo.action?queryPara.DATE_TIME="+dateTime+"&queryPara.TERMINAL_ID="+terminalId+"&queryPara.SUBS_ID="+codeId+"&queryPara.station="+station;
		 	 	$('#jcxsjFrame').attr('src',url);
		 	 }
		 }
	</script>
</html>

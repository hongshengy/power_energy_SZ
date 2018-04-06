<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Calendar c1 = Calendar.getInstance();
String strFromDate1 = new SimpleDateFormat("yyyy-MM-dd").format(c1
		.getTime());
String curDate = strFromDate1;
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>用户数据中心</title>
    <jsp:include page="/ext.jsp" />
    <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	<script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
    <script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var consId = '${param.consId}';
		 var countNum = 0;
		 /* 智能家居 非侵入式 iframe 用采数据使用 dingtengfei 2017-5-22 */
		 var consNo = '${param.consNo}';
	</script>
	<script type="text/javascript" src="<%=basePath%>pages/areaEnergy/consDataCentre/getConsDetailTree.js"></script>
	<style type="text/css">
		html{
			background-color: #F8F8F8;
		}
		body{
			background-color: #F8F8F8;
		}
	</style>
  </head>
  
  <body scroll="no" id="dataBody1">
	  	<div id="allDiv" class="easyui-layout" style="width:100%;height:100%;">
<!--	  		<input type="hidden" id="nodeId1" value=""/>-->
<!--			<div region="west" split="true" title="采集档案配置" style="width:200px;">-->
<!--				<div id="leftDiv"></div>-->
<!--			</div>-->
<!--			<div region="center">-->
<!--				<iframe width="100%" height="100%" frameborder="0" scrolling="auto" id="rightFrame"></iframe>-->
<!--			</div>-->
		<div style="background-color: #f8f8f8;height:12%;border: 1px solid #ccc; margin: 0px;">
			<table style="width: 100%; overflow: auto;" cellspacing="0" cellpadding="0" border="0" class="content">
					<tr>
						<td style="vertical-align: top" align="center" class="contentBox"> 
							<table style="width: 100%;" border='0' class="message">
								<tr>
									<td class="messageList">
										<table id="queryTbl" cellspacing="0" cellpadding="0" border="0" align="left" width="100%">
											<tr style="width: 100%;">
												<!--<td >
													 家庭总体耗能
												</td>
												<td width="15px">
													<input id="ids0"  type="radio" checked="true" name="ids" value="0"/>
												</td>
												--><td width="200px" id='dateTd'>
													<table>
	   													<tr>
   															<td>
								   								<a href="javascript:getChartByDate(-1);"><img alt="" src="<%=basePath%>images/ArrowFront02.gif"/></a>&nbsp;
								   							</td>
								   							<td>
								   								<fpus:Date width="100" id="dataDate" name="dataDate" readOnly="true" value="<%=curDate %>" />
								   							</td>
								   							<td>
								   								&nbsp;<a href="javascript:getChartByDate(1);"><img alt="" src="<%=basePath%>images/ArrowFront01.gif"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								   							</td>
								   						</tr>
								   					</table>
												</td>
												<td >
												       <input type="button" class="btn1_mouseout" onmouseover="this.className='btn1_mouseover'"
														  onmouseout="this.className='btn1_mouseout'" value="查询" onClick="init();" />
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				</div>
			<div id="cxTab" class="easyui-tabs" style="position: relative; border: 0; width: 100%; height: 100%; overflow: auto">   
		    <div title="用户总能耗曲线" id="xlsssj" style="display:none;">  
		    	<div id="view1">   
		    	<iframe width="100%" height="100%" frameborder="0" scrolling="auto" id="frame1"></iframe>
		        </div>
		    </div>
		    <div title="用户识别率曲线" id="xlsssj" style="display:none;">  
		    	<div id="view2">   
		    	<iframe width="100%" height="100%" frameborder="0" scrolling="auto" id="frame2"></iframe>
		        </div>
		    </div> 
		    <div title="电量占比" id="xlsssj" style="display:none;">  
		    	<div id="view3">   
		    	<iframe width="100%" height="100%" frameborder="0" scrolling="auto" id="frame3"></iframe>
		        </div>
		    </div> 
		    <div title="电器峰值" id="xlsssj" style="display:none;">  
		    	<div id="view4">   
		    	<iframe width="100%" height="100%" frameborder="0" scrolling="auto" id="frame4"></iframe>
		        </div>
		    </div>    
		    <div title="家庭用户总电量和辨识电量" id="cdsssj" style="display:none;">  
		    	<div id="view5">  
		    	<iframe width="100%" height="100%" frameborder="0" scrolling="auto" id="frame5"></iframe>
		        </div>
		    </div>   
		</div> 
		</div>
  </body>
   <script type="text/javascript">
         //Ext.onReady(function(){ 
             //刷新方法
             //var mytimer = "T";
             //$('#dataBody1').everyTime('60s',mytimer,function(){
               //  $('#leftDiv').tree('reload');
            // });
		 //});
		  $(document).ready(function(){
		  init();
		  $('#cxTab').tabs({
			  onSelect: function(title,index){
				if(index ==0){
					document.getElementById("frame1").src = basePath+"pages/areaEnergy/capacity/consData/view1.jsp?dataDate="+$('#dataDate').val()+"&consId="+consId+"&consNo="+consNo;
				}
				else if(index ==1){
					document.getElementById("frame2").src = basePath+"pages/areaEnergy/capacity/consData/view2.jsp?dataDate="+$('#dataDate').val()+"&consId="+consId+"&consNo="+consNo;
         	    }else if(index ==2){
         	   		document.getElementById("frame3").src = basePath+"pages/areaEnergy/capacity/consData/view3.jsp?dataDate="+$('#dataDate').val()+"&consId="+consId+"&consNo="+consNo;
         	    }else if(index ==3){
         	   		document.getElementById("frame4").src = basePath+"pages/areaEnergy/capacity/consData/view4.jsp?dataDate="+$('#dataDate').val()+"&consId="+consId+"&consNo="+consNo;
         	    }else if(index ==4){
         	   		document.getElementById("frame5").src = basePath+"pages/areaEnergy/capacity/consData/view5.jsp?dataDate="+$('#dataDate').val()+"&consId="+consId+"&consNo="+consNo;
			    }
			  }
			});
         	   });
		 function init(){
		 	document.getElementById("frame1").src = basePath+"pages/areaEnergy/capacity/consData/view1.jsp?dataDate="+$('#dataDate').val()+"&consId="+consId+"&consNo="+consNo;
		 }
		 function getChartByDate(flag){
		var time = $("#dataDate").val();
		if(!time){
            MessageBox("请选择数据日期!");
            return;
        }
		time = time.replace(/-/g,"/");
		var date = new Date(time);
		if(flag == -1)
		{
			date.setTime(date.getTime()-24*3600*1000);
		}
		else if(flag == 1)
		{
			date.setTime(date.getTime()+24*3600*1000);
		}
		var month = parseInt(date.getMonth()+1);
		if(month.toString().length == 1)
		{
			month = "0"+month;
		}
		var d = date.getDate();
		time = date.getFullYear()+"-"+month+"-"+(d<10 ? ("0"+d) : d);
		$("#dataDate").val(time);
		Ext.getCmp('dataDateext').setRawValue(time);
		init();
	}
	</script>
</html>

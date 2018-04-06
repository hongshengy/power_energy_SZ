<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	// 当天
	SimpleDateFormat sdfFrom = new SimpleDateFormat("yyyy-MM-dd");
	Date newDate = DatabaseUtil.getSysDate();
	String today = sdfFrom.format(newDate);
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>智能插座</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<script type="text/javascript">
			$(function() {
				var gridH = $(window).height()-$('#queryDiv').height()-15;
				if(gridH<200){
				   gridH = 200;
				}
				$('#surveyTable').datagrid({
					title:'查询结果',
					border : false,
					singleSelect : false,
					width : '100%',
		            height : gridH,
					lazyLoad : true,
					striped : true,
					//collapsible:true,  可折叠
					fitColumns: true, 
					url : '<%=basePath %>capacityData/querySocketsMp.action',
					queryParams : {"queryPara.consId" : '${param.consId}',"queryPara.dataDate" : $("#dataDate").val(), "queryPara.mpType":$("#mpType").val()},
					sortOrder : 'desc',
					remoteSort : false,
					showFooter : true,
					pageSize : 50,
					pageList : [50,100,200,500],
					columns : [[
					        {
								title : '设备',
								field : 'OBJ_NAME',
								width:120,
								formatter:function(value,row,index){
								     return row.OBJ_NAME;
								}
							}, {
								title : '测点名称',
								field : 'MP_NAME',
								width:120,
								formatter:function(value,row,index){
								     return row.MP_NAME;
								}
							}/* , {
								title : '测点地址',
								field : 'COLL_ADDR',
								width:150,
								formatter:function(value,row,index){
								     return row.COLL_ADDR;
								}
							} */,{
								title : '数据时间',
								field : 'COLL_TIME',
								width:150,
								formatter:function(value,row,index){
								     return row.COLL_TIME;
								}
							}, {
								title : '冻结时间',
								field : 'DATA_DATE',
								width:150,
								formatter:function(value,row,index){
								     return row.DATA_DATE;
								}
							}, {
								title : '当前数值',
								field : 'DATA_VALUE',
								width:100,
								formatter:function(value,row,index){
								     return row.DATA_VALUE;
								}
							},{
								title : '系数',
								field : 'RATIO',
								width:100,
								formatter:function(value,row,index){
								     return row.RATIO;
								}
							}, {
								title : '测点编码',
								field : 'MP_CODE',
								width:100,
								formatter:function(value,row,index){
								     return row.MP_CODE;
								}
							}, {
								title : '测点类型',
								field : 'MP_TYPE',
								width:80,
								formatter:function(value,row,index){
								     return row.MP_TYPE;
								}
							}, {
								title : '设备类型',
								field : 'DEVICE_TYPE',
								width:80,
								formatter:function(value,row,index){
								     return row.DEVICE_TYPE;
								}
							}
					]],
					pagination : true,
					rownumbers : true,
					onLoadSuccess:function(){
					}
				});
				
			});
			
			// 刷新，重新加载页面
			function refreshPage(){
				$('#capacitySocketTable').datagrid("load");
			}
			
			// 模式窗体
			function OpenWin(url, winName, width, height, properties){
				properties = properties || {};
				xposition=0; yposition=0;
			    
				if ((parseInt(navigator.appVersion) >= 4 ))
				{
					xposition = (screen.width - width) / 2;
					yposition = (screen.height - height) / 2;
				}
				if(typeof properties.resizable == 'undefined'){
					properties.resizable = 1;
				}
				if(typeof properties.scrollbars == 'undefined'){
					properties.scrollbars = 1;
				}
				theproperty = "width=" + width + "," 
					+ "height=" + height + "," 
					+ "location=0," 
					+ "menubar=0,"
					+ "resizable="+properties.resizable+","
					+ "scrollbars="+properties.scrollbars+","
					+ "status=1," 
					+ "titlebar=0,"
					+ "toolbar=0,"
					+ "hotkeys=0,"
					+ "screenx=" + xposition + "," //仅适用于Netscape
					+ "screeny=" + yposition + "," //仅适用于Netscape
					+ "left=" + xposition + "," //IE
					+ "top=" + yposition; //IE 
					try{
						monwin = window.open(url,winName,theproperty,false);
						monwin.focus();
					}catch(e){
					
					}
			}
			
			function query(){
				var dataDate = $("#dataDate").val();
				var mpType = $("#mpType").val();
				$('#surveyTable').datagrid("load",{
					  "queryPara.mpType" : mpType,
			          "queryPara.consId" :'${param.consId}',
			          'queryPara.dataDate' : dataDate
			    });
			}
			</script>     
	</head>
    <body srolling='no'>
    	<div id="queryDiv" class="container-shadow container-marginTop" style="width:100%;">
            <div class="easyui-panel" title="查询条件" style="width:100%;padding:5px;">
                <table style="width:100%;">
                    <tr>
                    	<td class="td-label" align="center" width="100px">
	                        <label>测点类型：</label>
	                    </td>
	                    <td class="td-value" width="200px">
	                    	<input id="mpType" name="mpType" value=""/>
	                    </td>
                        <td class="td-label" align="center" width="100px">
                            <label>冻结日期：</label>
                        </td>
                        <td class="td-value" width="200px">
                           <input id="dataDate" type="text" class="easyui-datebox" value="<%=today %>" />
                        </td>
                        <td class="td-label" align="left">
                            <button class="easyui-linkbutton c1" onclick="query()" style="width:70px;">查询</button>
                        </td>
                    </tr>
               </table>
            </div>
        </div>
		<div style="border: 0; overflow: auto; background: #fafafa;padding:0"> 
	         <table id="surveyTable"></table>
	     </div>
	</body> 
	<script type="text/javascript">
		$(document).ready(function(){
			//下拉菜单
	  	   $('#mpType').combobox({
	            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70026',
	            valueField:'id',
	            textField:'text'
	 		});
	  	});
	</script>
</html>
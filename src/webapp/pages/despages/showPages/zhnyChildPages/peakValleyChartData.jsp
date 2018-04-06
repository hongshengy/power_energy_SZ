<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String baseUrl = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages";	
	String mainCssPath = baseUrl + "/pages/despages/common";
	String jsPath = baseUrl + "/pages/despages/showPages/js";
	String cssPath = baseUrl + "/pages/despages/showPages/css";
	String imagePath = baseUrl + "/pages/despages/showPages/images";
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
	
	SimpleDateFormat sdfFrom = new SimpleDateFormat("yyyy-MM-dd");
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
	// 当月
	Date newDate = DatabaseUtil.getSysDate();
	String today = sdfFrom.format(newDate);
	String mon = sdf.format(newDate);
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>峰谷差比</title>
		<jsp:include page="/pages/common/componentBase.jsp" />
		<script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
		
		<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/icon.css">
		<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/color.css">
		
		<script type="text/javascript" src="<%=mainCssPath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=mainCssPath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=mainCssPath %>/echarts/echarts.min.js"></script>
		
		<script type="text/javascript" src="<%=pagePath %>/common/js/dateUtil.js"></script>
		<script language="javascript" type="text/javascript"
			src="<%=mainCssPath%>/My97DatePicker/WdatePicker.js"></script>
	</head>
    <body>
		<div id='queryDiv' class="container-shadow container-marginTop" >
			<div class="easyui-panel" title="查询条件" style="width:100%;height:100%;align:center;" >
	                <table style="width:100%;height:100%;align:center;">
	                    <tbody>
	                    <tr>
	                    	<td style="width:5%"></td>
	                       	<td style="text-align: right;width:15%;">
                            	供电公司：
	                        </td>
	                        <td>
	                        	<select id="orgNo" class="easyui-combotree" style="width:200px;"></select>
	                        </td>
	                        <td style="width:10%"></td>
	                        <td style="width:20%">
	                                                日期：<input id="dates" type="text" class="easyui-datebox"
													class="dateTime_style" style="height: 25px; width: 105px;"
													value="<%=today%>" />
                            <!-- 查询类型：
                            <input type='radio' id="timeType" name="timeType"  value="d" checked = "checked">日
	                            <input type='radio' id="timeType" name="timeType"  value="m">月份
	                            <input type='radio' id="timeType" name="timeType"  value="s">季度
	                        	<span class="tools-labelgroup"> <input id="dates"
														class="Wdate" type="text"
														style="width: 100px; text-align: left;"
														onClick="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true})"
														value="<%=mon%>" /> </span> -->
                            </td>
                            <td style="width:20%"></td>
                            <td style="width:20%">
	                            <div style="padding: 0px; text-align: left;">
			                    	<button class="easyui-linkbutton c1" onclick="query1()" style="width:70px;">查询</button>
			               	   	</div>
		               	   	</td>
                        </tr>
                         <td style="width:10%"></td>  
	                  </tbody>
	               </table>
	              
	            </div>
        </div>
		<div id="fgdlbg" class="easyui-panel" title="峰谷差比列表" style="padding:5px;overflow:scroll;">
			<div id="fgdlData" style="width:99%;" ></div>
		</div>
		<script type="text/javascript">
		 var high = window.innerHeight;
	     $("body").height(document.body.clientHeight);
		 $("body").width(document.body.clientWidth);
		 $("#queryDiv").width(document.body.clientWidth);
		 $("#queryDiv").height(high*0.15);
		 $("#fgdlbg").height(high*0.84);
		 $("#fgdlbg").width(document.body.clientWidth);
	    </script>
	</body> 
	<script type="text/javascript">
       	$(document).ready(function(){
        	$('#orgNo').combotree('setValues',[ {id:32101,text: '江苏省电力公司'}]);
        	// 给下拉框添加元素
        	$.ajax({
				type: "post",
				url: "<%=basePath%>" + 'capacityData/queryTreeOrgNo.action',
				data: "queryPara.orgNo=0&queryPara.orgId=32101",
				dataType:"json",
				cache : false,
				async : true,//同步异步请求
				success: function(result)
				{
				    var dataOrgNo = result.data;
					$('#orgNo').combotree('loadData', dataOrgNo);
				}
			});
			// 给父节点添加子节点
       		var tree = $('#orgNo').combotree('tree');
			tree.tree({
				onClick: function(node){
				var selected = tree.tree('getSelected');
				$('#orgNo').combotree('setValues',[ {id:node.id,text: node.text}]);
				var c = tree.tree('getChildren',selected.target);
				if(c.length>0){
					return;
				}
				$.ajax({
					type: "post",
					url: "<%=basePath%>" + 'capacityData/queryTreeOrgNo.action',
					data: "queryPara.orgNo=" + node.id ,
					dataType:"json",
					cache : false,
					async : true,//同步异步请求
					success: function(result)
					{
					    var dataOrgNo = result.data;
						tree.tree('append', {
							parent: selected.target,
							data: dataOrgNo
						});
					}
					});
				}
			});
			setTimeout("loaddata();",1000);
		});
			
			function query1(){
				loaddata();
			}	
			
			function loaddata(){
        		var date = $('#dates').val();
				var orgNo = $('#orgNo').combotree('tree').tree('getSelected').id;
				var timeType = $("input[name='timeType']:checked").val();
        		$('#fgdlData').datagrid({
					height : $(window).height()-$('#queryDiv').height()-5,
					border : false,
					singleSelect : true,
					lazyLoad : true,
					striped : true,
					//collapsible:true,  可折叠
					//fitColumns: true,
					url : "<%=basePath%>" + 'capacityData/findFGDataList.action',
					sortOrder : 'desc',
					remoteSort : false,
					showFooter : true,
					pageSize : 20,
					queryParams : {"queryPara.dates" : date,"queryPara.orgNo" : orgNo,"queryPara.timeType" : timeType},
					columns : [[
					        {   
					            field:'ID',
					            formatter:function(value,row,index){
								     return row.ID;
								}
					        }, {
								title : '台区编号',
								field : 'TG_NO',
								width : '12%',
								sortable : true,
								formatter:function(value,row,index){
									var pth = "<%=basePath%>";
									var tg = '<a style="text-decoration: none;" title='+row.TG_NO+' href="javascript:openClick(\''+pth+'\',\''+row.TG_NO+'\',\''+row.TG_NAME+'\',\''+row.DATA_DATE+'\')">'+row.TG_NO+'</a>';
								    return tg;
								}
							}, {
								title : '台区名称', 
								field : 'TG_NAME',
								width : '20%',
								sortable : true,
								formatter:function(value,row,index){
								     return row.TG_NAME;
								}
							}, {
								title : '日期',
								field : 'DATA_DATE',
								width : '11%',
								sortable : true,
								formatter:function(value,row,index){
								     return row.DATA_DATE;
								}
							}, {
								title : '最大负荷',
								field : 'MAX_VALUE',
								width : '11%',
								sortable : true,
								formatter:function(value,row,index){
								     return row.MAX_VALUE;
								}
							}, {
								title : '最小负荷',
								field : 'MIN_VALUE',
								width : '11%',
								sortable : true,
								formatter:function(value,row,index){
								     return row.MIN_VALUE;
								}
							}, {
								title : '最大负荷发生时间',
								field : 'MAX_DATE',
								width : '12%',
								sortable : true,
								formatter:function(value,row,index){
								     return row.MAX_DATE;
								}
							}, {
								title : '最小负荷发生时间',
								field : 'MIN_DATE',
								width : '12%',
								sortable : true,
								formatter:function(value,row,index){
								     return row.MIN_DATE;
								}
							}, {
								title : '峰谷差比(%)',
								field : 'P_VAL_RATE',
								width : '11%',
								sortable : true,
								formatter:function(value,row,index){
								     return row.P_VAL_RATE;
								}
							}
							]],
					pagination : true,
					rownumbers : true,
				});
        	}
        	
        	openClick = function (baseP, tgNo, tgName, date){
				 OpenWin(baseP+"pages/despages/showPages/zhnyChildPages/peakValleyChart.jsp?tgNo="+tgNo+"&date="+date+"&tgName="+tgName.replace(/\#/g,'%23'),tgName+"台区峰谷差比图",700,300);
			}
			
			function OpenWin(url, winName, width, height, properties) 
			{
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
        </script>   
</html>
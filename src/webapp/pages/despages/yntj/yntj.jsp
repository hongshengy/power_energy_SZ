<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%
String baseUrl = request.getContextPath();
String basePath = request.getScheme() + "://"
+ request.getServerName() + ":" + request.getServerPort()
+ baseUrl + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>用能统计</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<jsp:include page="/pages/common/componentBase.jsp" />
	</head>
    <body>
    <div id="mainDiv" style=" overflow: auto;overflow-x:hidden; ">
     <table style="width:100%;height:100%;align:center;">
	     <tr>
		     <td style="width:50%;">
		     <div class="xinxitongji-panel">
		     	 <table id="table1" >
	                <!--<thead>
	                	<tr>
	                    	<td >常州用能统计</td>
                        </tr>
	                	<tr>
	                    	<td >用能类型</td>
	                       	<td >用户数</td>
                        </tr>
	                </thead>
	                    <tbody id="list1">
	                    <tr>
	                    	<td >非侵入式终端</td>
	                       	<td id="count1"></td>
                        </tr>
	                  </tbody>
	               --></table>
	               </div>
		     </td>
		     <td style="width:50%;">
		     	<table id="table2"  >
	                <!--<thead>
	                	<tr>
	                    	<td >苏州用能统计</td>
                        </tr>
	                	<tr>
	                    	<td >用能类型</td>
	                       	<td >用户数</td>
                        </tr>
	                </thead>
	                    <tbody id="list2">
	                    <td >非侵入式终端</td>
	                       	<td id="count2"></td>
	                  </tbody>
	               --></table>
		     </td>
	     </tr>
     </table>
	</div>
		<script type="text/javascript">
		$('#table1').datagrid({
		title : '常州用能统计',
		url : '<%=basePath%>/capacity/countYntjUser.action',
		queryParams : {"queryPara.orgNo" : 32404},
		columns : [[
				{
					title : '用能类型',
					align:'center',
					field : 'CODE_NAME',
					width : '120',
					formatter:function(value,row,index){
					     return row.CODE_NAME;
					}
				},
				{
					title : '用户数',
					align:'center',
					field : 'COUNT',
					width : '120',
					formatter:function(value,row,index){
					     return row.COUNT;
					}
				}
		]]
		});
		
		
		$('#table2').datagrid({
		title : '苏州用能统计',
		url : '<%=basePath%>/capacity/countYntjUser.action',
		queryPara : {"orgNo" : 32405},
		columns : [[
				{
					title : '用能类型',
					align:'center',
					field : 'CODE_NAME',
					width : 120,
					formatter:function(value,row,index){
					     return row.CODE_NAME;
					}
				},
				{
					title : '用户数',
					align:'center',
					field : 'COUNT',
					width : 120,
					formatter:function(value,row,index){
					     return row.COUNT;
					}
				}
		]]
		});
		
		
		$.ajax({
					type: "post",
					url: '<%=basePath%>/capacity/countfqrsUserCount.action',
					data: "queryPara.orgNo=32404" ,
					dataType:"json",
					cache : false,
					async : true,//同步异步请求
					success: function(result)
					{
					$('#table1').datagrid('insertRow',{
						index: 3,	// 索引从0开始
						row: {
							CODE_NAME: '非侵入式终端',
							COUNT: result.COUNT
						}
					});
					
					}
		});
		$.ajax({
					type: "post",
					url: '<%=basePath%>/capacity/countfqrsUserCount.action',
					data: "queryPara.orgNo=32405" ,
					dataType:"json",
					cache : false,
					async : true,//同步异步请求
					success: function(result)
					{
					$('#table2').datagrid('insertRow',{
						index: 3,	// 索引从0开始
						row: {
							CODE_NAME: '非侵入式终端',
							COUNT: result.COUNT
						}
					});
					
					}
		});
	    </script>
	</body> 
	
</html>
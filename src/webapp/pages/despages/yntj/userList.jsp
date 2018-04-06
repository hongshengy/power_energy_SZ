<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String orgNo = request.getParameter("orgNo");
	String createDate = request.getParameter("createDate");
	String endDate = request.getParameter("endDate");
	String userCode = request.getParameter("userCode");
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>用户档案查询</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<jsp:include page="/pages/common/componentBase.jsp" />
		<style type="text/css">
		   .datagrid-cell,.datagrid-cell-group,.datagrid-header-rownumber,.data-cell-rownumber{
		      text-overflow:ellipsis;
		   }
		</style>
	</head>
    <body >
	<table id="collArchiveTable"></table>
    <script type="text/javascript">
    var queryurl ;
    if('<%=endDate%>'==''){
   	 	queryurl = des.webContextRoot+'/capacity/userList.action';
    }else{
    	queryurl = des.webContextRoot+'/capacity/userList2.action';
    }
        $('#collArchiveTable').datagrid({
		height : $(window).height()-$('#queryDiv').height()-5,
		border : false,
		title : '查询结果',
		singleSelect : false,
		lazyLoad : true,
		striped : true,
		//fitColumns: true, 
		url : queryurl,
		sortOrder : 'desc',
		remoteSort : false,
		showFooter : true,
		pageSize : 50,
		pageList : [50,100,200,500],
		queryParams : {"queryPara.orgNo" : '<%=orgNo%>', "queryPara.userCode" : '<%=userCode%>', "queryPara.createDate" : '<%=createDate%>', "queryPara.endDate" : '<%=endDate%>'},
		columns : [[
		       {
					title : '用户名称',
					align:'center',
					field : 'CONS_NAME',
					width : 160,
					sortable : true,
					formatter:function(value,row,index){
					var a =row.CONS_NAME;
					  var len = a.length;
						var b = "";
						if(len>0){
							b = a.substring(0,1);
						}
						for(var i=0;i<len-1;i++){
							b=b+"*";
						}
					     return '<span>'+b+'</span>';
					}
				}, {
					title : '合同容量',
					align:'center',
					field : 'CONTRACT_CAP',
					width : 80,
					sortable : true,
					formatter:function(value,row,index){
					     return row.CONTRACT_CAP+'KVA';
					}
				}, {
					title : '电压等级',
					align:'center',
					field : 'VOLT_CODE',
					width : 70,
					sortable : true,
					formatter:function(value,row,index){
					     return row.VOLT_CODE;
					}
				},{
					title : '用户编号',
					align:'center',
					field : 'CONS_NO',
					width : 130,
					sortable : true,
					formatter:function(value,row,index){
					var a =row.CONS_NO;
					  var len = a.length;
					  if(len>4){
						var b = "";
						
						for(var i=0;i<len-4;i++){
							b=b+"*";
						}
						if(len>0){
							b=b+ a.substring(len-4);
						}
						return b;
						}
					     return a;
					}
				}, {
					title : '能源类别',
					align:'center',
					field : 'USER_CODE',
					width : 100,
					sortable : true,
					formatter:function(value,row,index){
					     return row.USER_CODE;
					}
				}
		]],
		pagination : true,
		rownumbers : true
		
	});	
	        
	        
	        </script>
	</body> 
</html>
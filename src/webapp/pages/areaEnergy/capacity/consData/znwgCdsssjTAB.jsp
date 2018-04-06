<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="com.frontier.framework.util.DatabaseUtil"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

//当天
SimpleDateFormat sdfFrom = new SimpleDateFormat("yyyy-MM-dd");
Date newDate = DatabaseUtil.getSysDate();
String today = sdfFrom.format(newDate);
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>用户数据中心-测点实时数据</title>
	<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
    <script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var terminalId = '${param.terminalId}';
		 var hheight = '${param.hheight}';
		 var hei = parseInt(hheight)*2;
	</script>
	<script type="text/javascript" src="<%=basePath%>pages/areaEnergy/capacity/consData/znwgCdsssjTAB.js"></script>
	<style type="text/css">
		html{
			background-color: #F8F8F8;
		}
		body{
			background-color: #F8F8F8;
		}
	</style>
  </head>
  
  <body scroll="no">
	<div id="queryDiv" class="container-shadow container-marginTop" style="width:100%;">
        <div class="easyui-panel" title="查询条件" style="width:100%;padding:5px;">
            <table style="width:100%;font-size:12px;">
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
    <div id="cdsssjDiv" style="width:100%;height:100%;">
		<table id="cdsssjTable"></table>
    </div>
  </body>
   <script type="text/javascript">
         $(document).ready(function(){
        		//下拉菜单
	      	   $('#mpType').combobox({
		            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70026',
		            valueField:'id',
		            textField:'text'/* ,
		            onSelect: function(record){
		            	if(!record.id){
		            		$('#cdsssjTable').datagrid("load",{
						          "queryPara.mpType" : ""
						    });
		            	}else {
		            		$('#cdsssjTable').datagrid("load",{
						          "queryPara.mpType" : record.id
						    });
		            	}
					} */
		            
		       });
         	   //添加下拉菜单
         	   //str1 = '测点类型       <input id="mpType" name="mpType" value=""/>';
         	   //str1 += '&nbsp;&nbsp;冻结日期      <input id="dataDate" type="text" class="easyui-datebox" value="<%=today %>" />';
         	   //str1 += '&nbsp;&nbsp;<button class="easyui-linkbutton c1" onclick="query()" style="width:70px;">查询</button>'
			   //$(".panel-title").first().html(str1);
		 });
         
		 //变化
		  $(window).resize(function () {
		 	var bh = parent.parent.$("body").height()-parent.$("#view1").height()-30;
		 	var bw = parent.$("body").width();
		 	$('#cdsssjTable').datagrid('resize',{
				height: bh,
				width: bw
			});
		 });
	</script>
</html>

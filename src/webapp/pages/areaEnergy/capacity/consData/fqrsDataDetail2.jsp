<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
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
		 var tmnlAssetNo = '${param.tmnlAssetNo}';
		 var orgNo = '${param.orgNo}';
	</script>
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
			<div region="west" split="true" title="非侵入式终端用户数据总览" style="width:200px;">
				<div id="leftDiv"></div>
			</div>
			<div region="center">
				<iframe width="100%" height="25%" frameborder="0" scrolling="auto" id="rightFrame"></iframe>
				<iframe width="100%" height="75%" frameborder="0" scrolling="auto" id="viewFrame"></iframe>
			</div>
		</div>
  </body>
   <script type="text/javascript">
	  $(document).ready(function(){
	  	$("body").layout();
		//左侧树
		$.ajax({
				type: "post",
				url: des.webContextRoot+"fqrsTmnl/queryTmnlConsTree.action?queryPara.exactSel="+ tmnlAssetNo+"&queryPara.flag=2"+"&queryPara.orgNo="+orgNo,
				dataType:"json",
				cache : false,
				async : true,//同步异步请求
				success: function(result)
				{
				    var list = result.json;
				   // alert(JSON.stringify(list));
				    var dataStr='';
				    if(list.length>0){
					    var dataStr=  "[{"+    
					    "'id':'"+list[0].TMNL_ASSET_NO+"',"+    
					    "'text':'"+list[0].TMNL_ASSET_NO+"',"+   
					    "'iconCls':'icon-save',"+    
					    "'children':[";
					    var temp='';
					    for(var i=0;i<list.length;i++){
       						temp = temp+ "{'text':'"+list[i].CONS_NO+"','id':'"+list[i].CONS_ID+"'},"  
					    }  
					    temp =temp.substring(0,temp.length-1);
					    dataStr =dataStr+ temp+"]}]";
				    }
				    var dataObj = eval("("+dataStr+")");
					$('#leftDiv').tree({
						id:'consDataTree',
						text : '用户数据中心',
						data:dataObj,
						onClick: function(node){
						document.getElementById("rightFrame").src = basePath+"areaEnergy/treeOneLevelYH.action?queryPara.consId="+node.id;
						document.getElementById("viewFrame").src = basePath+'fqrsTmnl/fqrsDataDetail.action?consId='+node.id+"&consNo="+node.text;
						}
					});
				}
			});
		
		
    document.getElementById("rightFrame").src = basePath+"areaEnergy/treeOneLevelYH.action?queryPara.consId="+consId;
	document.getElementById("viewFrame").src = basePath+'fqrsTmnl/fqrsDataDetail.action?consId='+consId+"&consNo="+consNo;
 });
	</script>
</html>

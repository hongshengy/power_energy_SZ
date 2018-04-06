<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
			String consId=request.getParameter("consId");
			String dataDate=request.getParameter("dataDate");
			String consNo=request.getParameter("consNo");
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>用户档案基本信息</title>
		<jsp:include page="/ext.jsp" />
        <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	    <script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
	</head>
    <body srolling='no'>
    <input type = 'hidden' id="dataDate" value="<%=dataDate%>"/>
    <input type = 'hidden' id="consId" value="<%=consId%>"/>
    <input type = 'hidden' id="consNo" value="<%=consNo%>"/>
		<table id="tableData"  class="dataGrid" style="width:100%"  cellpadding=0 cellspacing=0>
						
					      </table>
	</body>
	<script type="text/javascript">
	
	$(function(){
		     query();
		     setDataGridHeight();
		});
//查询
function query(){
             var time = $("#dataDate").val();
		if(!time){
            MessageBox("请选择数据日期!");
            return;
        }
            //开始遮罩
			window.showWaitDisplayForQuery();
			$.ajax({
				type: "post",
				url: "<%=basePath%>/fqrsTmnl/generalElecUsedView.action?queryPara.flag=4&queryPara.date="+$('#dataDate').val()+"&queryPara.consId="+$('#consId').val(),
				dataType:"json",
				success: function(json){
				//alert(JSON.stringify(json));
				      var table="";
				      for(i=0;i<json.dataForm.length;i++){
				         table+="<tr><td style='height:50px;'>"+json.dataForm[i]+"</td></tr>";
				      }
				      $("#tableData").html(table);
				      setDataGridHeight() ;
				      window.disWaitDisplayForQuery();
					},
				error : function(){
					MessageBox('系统异常！');
					//结束遮罩
				    disWaitDisplayForQuery();
				}
			});
}
var LoadMask =  null;
function showWaitDisplayForQuery(){
	if (!LoadMask) {
		LoadMask = new Ext.LoadMask(Ext.getBody(),{
		 	msg:"正在加载..."
		});
	}
	LoadMask.show();
}
function disWaitDisplayForQuery(){
	LoadMask.hide();
}
//自适应高度调整 
 function setDataGridHeight() {
     var scrollHeight = this.parent.document.body.scrollHeight-$(".messageList:first").height();
     $(".charts").css("height",scrollHeight/2);
 }
	</script>
</html>


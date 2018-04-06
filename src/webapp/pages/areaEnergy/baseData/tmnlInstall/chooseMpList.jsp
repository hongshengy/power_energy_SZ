<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>测点信息列表</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body scroll='no'>
        <!--  
        <form>
        </form>
		<div region="center" border="false">
			<table id="collArchiveTable"></table>
		</div>
		-->
		
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
               <div class="easyui-panel" title="采集测点信息" style="width:100%;padding:5px 10px;">
               		<table width="100%" cellspacing="8px" cellpadding="0" border="0">
						<tr>
							<td class="td-label" align="right" nowrap="nowrap">
								测点名称
							</td>
							<td width="15%" align="left">
	                            <input type="text" size="18" id="mpName" name="queryPara.mpName" class="easyui-textbox">
							</td>
							<td class="td-label" align="right" nowrap="nowrap">
								测点类型
							</td>
							<td width="15%" align="left">
	                            <input size="18" id="mpType" name="queryPara.mpType">
							</td>
							<td width="10%" align="left">
	                            <button class="easyui-linkbutton c1" onclick="queryList1();" style="width:70px;margin-left: 8px;">查询</button>
							</td>
							<td width="10%" align="left">
	                            <button class="easyui-linkbutton c1" onclick="confirmMpInfo();" style="width:70px;">确认</button>
							</td>
						</tr>
					</table>
					<div class="easyui-panel" style="width:100%;">
						<table id="mpConfigTable"></table>
					</div>
               </div>
        </div>
	    
	     
	</body>
	<script type="text/javascript">
		$(function() { 
			//测点类型
			$('#mpType').combobox({
	            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70026',
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
			queryList();	
		});
		function queryList1(){
			var mpName = $("#mpName").textbox("getValue");
			var mpType = $("#mpType").combobox("getValue");
			var deviceRela = '${param.deviceRela}';
			$('#mpConfigTable').datagrid("load",{
	          "queryPara.mpType" : mpType,
	          "queryPara.deviceRela" : deviceRela,
	          "queryPara.mpName" : mpName
   			 });
		}
		function queryList(){
			var mpName = $("#mpName").textbox("getValue");
			var mpType = $("#mpType").combobox("getValue");
			var deviceRela = '${param.deviceRela}';
			$('#mpConfigTable').datagrid({
				height : $(window).height()-$('#queryDiv').height()-20,
				border : false,
				singleSelect : false,
				lazyLoad : true,
				striped : true,
				//collapsible:true,  可折叠
				fitColumns: true,
				url : des.webContextRoot+'areaEnergy/findMpConfig.action',
				sortOrder : 'desc',
				remoteSort : false,
				showFooter : true,
				pageSize : 10,
				queryParams : {"queryPara.mpName" : mpName,"queryPara.mpType" : mpType,"queryPara.deviceRela" : deviceRela},
				columns : [[
				        {   
				            field:'MP_ID',
				            checkbox:true,
				            align:'center',
				            width:5,
				            formatter:function(value,row,index){
							     return row.MP_ID;
							}
				        }, {
							title : '测点名称',
							field : 'MP_NAME',
							align:'center',
							width : 20,
							sortable : true,
							formatter:function(value,row,index){
							     return row.MP_NAME;
							}
						}, {
							title : '测点类型',
							field : 'MP_TYPE_NAME',
							align:'center',
							width : 20,
							sortable : true,
							formatter:function(value,row,index){
							     return row.MP_TYPE_NAME;
							}
						}, {
							title : '测点编码',
							field : 'MP_CODE',
							align:'center',
							width : 15,
							sortable : true,
							formatter:function(value,row,index){
							     return row.MP_CODE;
							}
						}, {
							title : '区域编码',
							field : 'AREA_NO',
							align:'center',
							width : 15,
							sortable : true,
							formatter:function(value,row,index){
							     return row.AREA_NO;
							}
						}, {
							title : '使用状态',
							field : 'USED_STAUS',
							align:'center',
							width : 20,
							sortable : true,
							formatter:function(value,row,index){
							     return row.USED_STAUS;
							}
						}
				]],
				pagination : true,
				rownumbers : true,
			});
		}
		function confirmMpInfo() {
			var rows = $('#mpConfigTable').datagrid('getSelections');  
			if(rows.length == 0){
				$.messager.confirm('确认','请选择至少选择一条记录！','info');
				return;
			}
            var mpIdStr = "";  
            var mpNameStr = "";  
            var mpTypeNameStr = "";  
            var mpCodeStr = "";  
            $.each(rows,function(i,n){
                mpIdStr = mpIdStr + "," + n.MP_ID;
                mpNameStr = mpNameStr + "," + n.MP_NAME;
                mpTypeNameStr = mpTypeNameStr + "," + n.MP_TYPE_NAME;
                mpCodeStr = mpCodeStr + "," + n.MP_CODE;
            });
            mpIdStr = mpIdStr.substring(1,mpIdStr.length).split(",");
            mpNameStr = mpNameStr.substring(1,mpNameStr.length).split(",");
            mpTypeNameStr = mpTypeNameStr.substring(1,mpTypeNameStr.length).split(",");
            mpCodeStr = mpCodeStr.substring(1,mpCodeStr.length).split(",");
            window.opener.getMpInfo(mpIdStr,mpNameStr,mpTypeNameStr,mpCodeStr);
            window.close();
	  }
	</script>    
</html>
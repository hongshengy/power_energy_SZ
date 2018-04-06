<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
	<head>
	    <base href="<%=basePath%>">
		<title>非侵入式负荷识别终端列表</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<jsp:include page="/pages/common/componentBase.jsp" />
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;">
			<div class="easyui-panel" title="查询条件" style="width:100%;padding:5px;">
	                <table style="width:100%;">
	                    <tbody>
	                    <tr>
	                    	<td class="td-label" align="right" nowrap>
                            <label>供电公司：</label>
	                        </td>
	                        <td width="15%" nowrap>
	                        	<select id="orgNo" class="easyui-combotree" style="width:200px;"></select>
	                        </td>
	                        <td class="td-label" align="right">
	                            <label>精确查询：</label>
	                        </td>
	                        <td class="td-value">
	                            <input type='text' id='exactSel' name='exactSel' onblur="showExact()" onfocus="focusEvent()" size="40"/>
	                        	<button class="easyui-linkbutton c1" onclick="query()" style="width:70px;" align="left">查询</button>
	                        </td>
	                    </tr>
	                  </tbody>
	               </table>
	            </div>
              <div class="easyui-panel" title="非侵入式负荷识别终端列表" style="width:100%;padding:5px 10px;">
				  <table id="fqusListTable" ></table>
              </div>
        </div>
	</body>
	<script type="text/javascript">
		$(function() {  
			$("body").layout();
			showExact();
			$('#exactSel').keyup(function(event){
			    enterFun(event);
			});
			$('#orgNo').combotree('setValues',[ {id:32101,text: '江苏省电力公司'}]);
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
					query();
				}
			});
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
			
		//	setTimeout("query();",1000);
		});
		
		function query(){
    		var exactSel = $('#exactSel').val();
    		var orgNo = $('#orgNo').combotree('tree').tree('getSelected').id;
			$('#fqusListTable').datagrid({
				height : $(window).height()-$('#queryDiv').height()-15,
				border : false,
				singleSelect : false,
				lazyLoad : true,
				striped : true,
				//collapsible:true,  可折叠
				//fitColumns: true,
				url : des.webContextRoot+'capacityData/findFqusList.action',
				sortOrder : 'desc',
				remoteSort : false,
				showFooter : true,
				pageSize : 50,
				queryParams : {"queryPara.orgNo" : orgNo,"queryPara.exactSel" : exactSel},
				columns : [[
				        {   
				            field:'ID',
				            checkbox:true,
				            formatter:function(value,row,index){
							     return row.ID;
							}
				        }, {
							title : '供电单位',
							field : 'ORG_NAME',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.ORG_NAME;
							}
						}, {
							title : '电表局编码',
							field : 'METER_ASSET_NO',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.METER_ASSET_NO;
							}
						}, {
							title : '电表类型',
							field : 'TYPE_CODE',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.TYPE_CODE;
							}
						}, {
							title : '电表型号',
							field : 'MODEL_CODE',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.MODEL_CODE;
							}
						}, {
							title : '用户编号',
							field : 'CONS_NO',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.CONS_NO;
							}
						}, {
							title : '用户名称',
							field : 'CONS_NAME',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.CONS_NAME;
							}
						}, {
							title : '用电地址',
							field : 'ELEC_ADDR',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.ELEC_ADDR;
							}
						}, {
							title : '用电类别',
							field : 'ELEC_TYPE_CODE',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.ELEC_TYPE_CODE;
							}
						}, {
							title : '终端资产号',
							field : 'ASSET_NO',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.ASSET_NO;
							}
						}, {
							title : '终端类型',
							field : 'TERMINAL_TYPE_CODE_NAME',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.TERMINAL_TYPE_CODE_NAME;
							}
						}, {
							title : '终端型号',
							field : 'ID_NAME',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.ID_NAME;
							}
						}
						]],
				pagination : true,
				rownumbers : true,
				toolbar : [
						{
							  text : '查看',
							  id:'cfgFlashServer',
							  iconCls:'icon-edit',
							  handler : function() {
							    var rows = $('#fqusListTable').datagrid('getSelections');
							    if(rows.length!=1){  
						            $.messager.alert('提示',"请选择一条记录",'info'); 
						            return; 
						        }
						        var cons_no = rows[0].CONS_NO;
						        var url="http://10.134.78.59:81/aueic/areaEnergy/queryNilmList.action?queryPara.consNo="+cons_no;
				    		    OpenWin(encodeURI(url),"非侵入式负荷识别终端明细",screen.availWidth,screen.availHeight);
							 }
						}
					]
			});
		}
		function showExact(){
			if($("input[name='exactSel']").val()==""){
	         $("input[name='exactSel']").val("用户编号/终端资产号");
	         $("input[name='exactSel']").css('color','#C0C0C0');
	    	}
		}
		function focusEvent(){
			if($("input[name='exactSel']").val()=="用户编号/终端资产号"){
	        $('#exactSel').val('');
	        $('#exactSel').css('color','black');
		    }else{
		         $('#exactSel').css('color','black');
		    }
		}
		function enterFun(event){
		     if (event.keyCode==13) {
		          if (!$('#exactSel').val()) {
		              $.messager.alert('系统提示','精确查询，请输入精确查询的内容！');
		              return;
		          }else{
		              $('#fqusListTable').datagrid("load",{
			              "queryPara.exactSel" : $('#exactSel').val()
			    	  });
		         }
		     }
		     return;
		}
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
	</script>    
</html>
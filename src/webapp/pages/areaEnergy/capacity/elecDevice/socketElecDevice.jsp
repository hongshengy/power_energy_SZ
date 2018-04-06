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
				$('#capacitySocketTable').datagrid({
					title:'电器列表',
					border : false,
					singleSelect : false,
					width:'100%',
		            height:'100%',
					lazyLoad : true,
					striped : true,
					//collapsible:true,  可折叠
					fitColumns: true, 
					url : des.webContextRoot+'capacity/queryCapacityDevice.action',
					queryParams : {"queryPara.parentId" :'${param.parentId}',"queryPara.consId":'${param.consId}'},
					sortOrder : 'desc',
					remoteSort : false,
					showFooter : true,
					pageSize : 50,
					pageList : [50,100,200,500],
					columns : [[
						        {   
						            field:'ID',
						            checkbox:true,
						            width:5,
						            formatter:function(value,row,index){
									     return row.ID;
									}
						        },{
									title : '电器名称',
									field : 'NAME',
									width : 8,
									sortable : true,
									formatter:function(value,row,index){
									     return row.NAME;
									}
								},{
									title : '厂家',
									field : 'FACTORY',
									width : 5,
									sortable : true,
									formatter:function(value,row,index){
									     return row.FACTORY;
									}
								},{
									title : '型号',
									field : 'MODEL',
									width : 5,
									sortable : true,
									formatter:function(value,row,index){
									     return row.MODEL;
									}
								},{
									title : '空调匹数',
									field : 'P_NO',
									width : 0,
									sortable : true,
									formatter:function(value,row,index){
									     return row.P_NO;
									}
								},{
									title : '额定功率',
									field : 'POWER',
									width : 0,
									sortable : true,
									formatter:function(value,row,index){
									     return row.POWER;
									}
								},{
									title : '电压等级',
									field : 'VOLT_CODE',
									width : 0,
									sortable : true,
									formatter:function(value,row,index){
									     return row.VOLT_CODE;
									}
								}, {
									title : '其他铬牌信息',
									field : 'OTHERS',
									width : 5,
									sortable : true,
									formatter:function(value,row,index){
									     return row.OTHERS;
									}
								}
						]],
						pagination : true,
						rownumbers : true,
						toolbar : [
						{
							text : '新增电器',
							id : 'addLine',
							iconCls : 'icon-add',
							handler : function() {
								var consId = '${param.consId}';
								var parentId = '${param.parentId}';
								var subsId = '${param.subsId}';
								var url="<%=basePath %>pages/areaEnergy/capacity/elecDevice/addElecDevice.jsp?consId="+consId+"&parentId="+parentId+"&subsId="+subsId;
					    		OpenWin(url,"新增电器",720,330);
							}
						},'-',{
								text:'编辑电器',
								id : 'editLine',
								iconCls:'icon-edit',
								handler:function(){
									var rows = $('#capacitySocketTable').datagrid('getSelections');
								    if(rows.length==0){  
							            $.messager.alert('提示',"请选择你要编辑电器",'info'); 
							            return; 
							        }
							        if(rows.length > 1){
							        	$.messager.alert('提示',"请选择一条电器进行编辑",'info'); 
							            return;
							        }
							        var id ;
							        var name;
							        var factory;
							        var model;
							        var pNo;
							        var power;
							        var voltCode;
							        var others;
							         $.each(rows,function(i,n){
							         	id = n.ID;
							         	name = n.NAME;
							         	factory = n.FACTORY;
							         	model = n.MODEL;
							         	pNo = n.P_NO;
							         	power = n.POWER;
							         	voltCode = n.VOLT_CODE;
							         	others = n.OTHERS;
								     });
							         var consId = '${param.consId}';
									 var parentId = '${param.parentId}';
									 var subsId = '${param.subsId}';
										
								     var params = "id="+id+"&name="+encodeURIComponent(name)+"&factory="+encodeURIComponent(factory)+"&model="+encodeURIComponent(model)+
								     "&pNo="+encodeURIComponent(pNo)+"&power="+encodeURIComponent(power)+"&voltCode="+encodeURIComponent(voltCode)+"&others="+encodeURIComponent(others)+
								     "&consId="+consId+"&parentId="+parentId+"&subsId="+subsId;
								     var url="<%=basePath %>pages/areaEnergy/capacity/elecDevice/editElecDevice.jsp?"+params;  
								     OpenWin(url,"编辑电器",720,330);
						    		 //parent.com.frontier.areaEnergy.baseData.reloadTree.clickTreeNode(parentId+',CAPACITYSOCKETSELF,'+subsId);
							    }
						},'-',{
								text:'删除电器',
								id : 'delLine',
								iconCls:'icon-remove',
								handler:function(){
								    var rows = $('#capacitySocketTable').datagrid('getSelections'); 
								    if(rows.length==0){  
							            $.messager.alert('提示',"请选择你要删除的电器",'info'); 
							            return; 
							        }
								    $.messager.confirm('提示','确定要删除吗?',function(result){  
								            if (result){  
								                var rows = $('#capacitySocketTable').datagrid('getSelections');  
								                var idArr = [];  
								                $.each(rows,function(i,n){
								                	idArr.push({'id' : n.ID});
								                });
								                //删除客户
								                var url = "<%=basePath %>capacity/deleteElecDevice.action";
								                var para = 'ids='+JSON.stringify(idArr);
								                $.ajax({
									                url : url,
									                type: "post",
									                data : para,
									                dataType:"json",
									                timeout:60000, 
									                error : function (XMLHttpRequest, textStatus, errorThrown) {
									                	$.messager.confirm("提示","删除失败");
									                },
									                success : function(result) {
									                     if(result.flag=='1'){
					                     					$.messager.alert('提示',result.msg,'info',function(){
					                         				 	parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
					                     					});
					                  					}
									                }
									            });
								            }  
								        });
							    }
						}
					],
						onLoadSuccess:function(){
							var isEdit = parent.$("#isEdit").val();
							if(isEdit == 'false'){
								$("#editLine").linkbutton("disable");
								$("#addLine").linkbutton("disable");
								$("#delLine").linkbutton("disable");
							}
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
				$('#surveyTable').datagrid("load",{
			          "queryPara.deviceId" :'${param.parentId}',
			          'queryPara.dataDate' : dataDate
			    });
			}
			
			function doEdit(){
				if(validateCheck()) {
					$.messager.confirm("提示","确定保存信息吗？",doSubmit);
					//MessageBox("确定保存信息吗？","系统提示", T_ICON, MB_YESNO, doSubmit);
				}
			}
			//回调函数
			function doSubmit(result){
				if(result) {
					//var para="id="+$("#id").val()+"&name="+$('#name').textbox('getValue')+"&factory=" + $('#factory').textbox('getValue')+
					//"&model="+$('#model').textbox('getValue')+"&pNo="+$('#pNo').textbox('getValue')+"&power="+$('#power').textbox('getValue')+
					//"&voltCode="+$('#voltCode').textbox('getValue')+"&others="+$('#others').textbox('getValue');
					var consId = '${param.consId}';
					var parentId = 0;
					var subsId = '${param.subsId}';
					
					var para="id="+$("#id").val()+"&name="+$('#name').textbox('getValue')+"&factory=" + $('#factory').textbox('getValue')+
					"&model="+$('#model').combobox('getValue')+"&power="+$('#power').textbox('getValue')+"&devAssetNo="+$('#devAssetNo').textbox('getValue')+"&port="+$('#port').textbox('getValue')+
					"&pConsId="+consId+"&parentId="+parentId+"&subsId="+subsId;
					$.ajax({
						url : des.webContextRoot +'capacity/updateSocket.action',
						type: "post",
						dataType:"text",
						data : para,
						timeout:60000, 
						error : function (XMLHttpRequest, textStatus, errorThrown) {
							//去除遮罩
							disWaitDisplayForQuery();
							$.messager.confirm("提示","保存失败");
						},
						success : function(res) {
								if (res != "" && res != null) {
									 if(res == "exist"){
									 	$.messager.confirm('确认','输入设备标识和端口已经被使用了，请重新输入','info');
									 }else if(res == 'error'){
									 	$.messager.confirm("提示","保存失败");
									 }else{
									 	$.messager.confirm("提示","保存成功",function(){
									 		//window.close();
											//window.opener.refreshPage();
											//opener.parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
									 	});
									}
								}
							}
						});
				}
			}
			
			// 画面合法性check
		  	function validateCheck() {
			     if($('#name').textbox('getValue') == "") {
			          $.messager.confirm("提示","电器名称不能为空，请输入");
			           return false;
			     }
			     
			     if($("#power").textbox('getValue') != "" && !onlyNumInput($('#power').textbox('getValue'))){
			          $.messager.confirm("提示","额定功率只能为数字，请重新输入");
			           return false;
			     }
			     if($('#model').combobox('getValue') == ""){
			    	 $.messager.confirm("提示","型号不能为空，请输入");
			           return false;
			     }
			     if($('#devAssetNo').textbox('getValue') == "") {
			          $.messager.confirm("提示","设备标识不能为空，请输入");
			           return false;
			     }
			     if($('#port').textbox('getValue') == "") {
			          $.messager.confirm("提示","端口号不能为空，请输入");
			           return false;
			     }else {
			    	 if(!onlyNumInput($('#port').textbox('getValue'))){
			    		 $.messager.confirm("提示","端口号只能为数字，请重新输入");
				         return false;
			    	 }
			     }
		    	return true;
			}
				
			function onlyNumInput(numObj){
				var reg = new RegExp("^[0-9]$");
				if(numObj != "" && numObj != null){
					for(var i=0;i<numObj.length;i++){
			            var aav = numObj.charAt(i);
			            if(!reg.test(aav)){
			                return false;
			            }
			        }
			        return true;
				}
			}
			
			function modifyTmnlInfo(saveFlag){
				   $("#name").textbox({disabled:saveFlag});
				   $("#factory").textbox({disabled:saveFlag});
				   $("#model").combobox({disabled:saveFlag});
				   $("#pNo").textbox({disabled:saveFlag});
				   $("#power").textbox({disabled:saveFlag});
				   $("#voltCode").textbox({disabled:saveFlag});
				   $("#others").textbox({disabled:saveFlag});
				   $("#devAssetNo").textbox({disabled:saveFlag});
				   $("#port").textbox({disabled:saveFlag});
				   
				   /* if(saveFlag){
					   $("#link").unbind('click',queryTmnlMessageList);
					   $("#link").bind('click');
				   }else{
					   $("#link").unbind('click');
					   $("#link").bind('click',queryTmnlMessageList);
				   } */
				   
				  // $("#includeFlag").attr("disabled",saveFlag);
					
				   if(saveFlag == false){
					   $("#saveBtn").css("display","block");
					   $("#modifyBtn").css("display","none");
				   }else{
				   	   $("#saveBtn").css("display","none");
					   $("#modifyBtn").css("display","block");
				   }
				}
		</script>     
	</head>
    <body srolling='no'>
    	<div id="queryDiv" class="container-shadow container-marginTop" style="width:100%;">
	            <div id="editDiv" class="easyui-panel" title="插座基本信息" style="width:100%;padding:30px 10px;">
		            <input type="hidden" id="id" value="${resultMap.ID}"/>
	                <table style="width:100%;" class="easyui-panel" cellspacing="8px" cellpadding="0" border="0">
	                    <tbody>
	                             <tr>
	                                <td class="td-label" align="right">插座名称：</td>
	                                <td >
	                                    <input class="easyui-textbox" size="30" id="name" disabled='disabled' data-options="required:true,missingMessage:'请输入电器名称'" value="${resultMap.NAME}">
			                            <font style="color: red;">*</font>
	                                </td>
	                                <td class="td-label" align="right">厂家：</td>
	                                <td>
	                                    <input class="easyui-textbox" id="factory" size="30" value="${resultMap.FACTORY }" disabled='disabled'/> 
	                                </td>
	                                <td class="td-fillwidth"></td>
	                                <td class="td-label" align="right">型号：</td>
	                                <td>
	                                    <%-- <input class="easyui-textbox" id="model" size="30" value="${resultMap.MODEL }" disabled='disabled'/>  --%>
	                                    <input id="model" name="model" size="30" class="easyui-validatebox" value="${resultMap.MODEL }"  validType="comboxValidate['model','请选择型号']" data-options="required:true" disabled='disabled'>
										<font style="color: red;">*</font>
	                                </td>
	                             </tr>
	                             <tr>
	                             	<td class="td-label"  align="right">额定功率：</td>
	                                <td>
	                                    <input class="easyui-textbox" size="30" id="power" value="${resultMap.POWER }" disabled='disabled'/>
	                                </td>
	                                <td class="td-label" align="right">设备标识：</td>
	                                <td>
	                                    <input class="easyui-textbox" id="devAssetNo" size="30" value="${resultMap.DEV_ASSET_NO }" data-options="required:true,missingMessage:'请输入设备标识'"  disabled='disabled'/> 
	                               		<font style="color: red;">*</font>
	                                </td>
	                                <td class="td-fillwidth"></td>
	                                <td class="td-label" align="right">端口号：</td>
	                                <td>
	                                    <input class="easyui-textbox" id="port" size="30" value="${resultMap.PORT }" data-options="required:true,missingMessage:'请输入端口号'" disabled='disabled'/> 
	                                	<font style="color: red;">*</font>
	                                </td>
	                             </tr>
	                     </tbody>
	               </table>
	               <div id="modifyBtn" style="padding: 5px; text-align: center;display: block;">
	               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
	               			<tr>
	               				<td align="center">
	                    			<button id="modifyRealBtn" class="easyui-linkbutton c1" onclick="modifyTmnlInfo(false);" style="width:70px;">修改</button>
	                    		</td>
	                    	</tr>
	                    </table>
	               </div>
	               <div id="saveBtn" style="padding: 5px; text-align: center;display: none;">
	               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
	               			<tr>
	               				<td align="right">
	                    			 <button class="easyui-linkbutton c1" onclick="doEdit();" style="width:70px;">保存</button>
	                    		</td>
	               				<td align="left">
	                    			 <button class="easyui-linkbutton c1" onclick="modifyTmnlInfo(true);" style="width:70px;">取消</button>
	                    		</td>
	                    	</tr>
	                    </table>
	               </div>
			</div>
		</div>
		<div style="border: 0; height:650px; overflow: auto; background: #fafafa;padding:0">
	         <table id="capacitySocketTable"></table>
	     </div>
	</body> 
	<script type="text/javascript">
		$(function(){
	        $('#model').combobox({
	            url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=80001',
	            editable:false,//不可编辑状态
	            valueField:'id',
	            textField:'text'
	        });
		});
	</script>
</html>
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
		<title>客户终端列表</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow" style="width:100%;">
              <div class="easyui-panel" title="客户终端列表" style="width:100%;">
              	<input type="hidden" id="consId" name="queryPara.consId" value="${param.consId}"/>
              	<input type="hidden" id="roleCode" name="queryPara.roleCode" value="${param.roleCode}"/>
              	<input type="hidden" id="areaNo" name="queryPara.areaNo" value="${param.areaNo}"/>
              	<input type="hidden" id="consIds" name="queryPara.consIds" value="${param.consIds}"/>
              	<table width="100%" cellspacing="8px" cellpadding="0" border="0">
					<tr>
	              		<td class="td-label" width="5%" align="right" nowrap="nowrap">
							终端资产号
						</td>
						<td width="5%" align="left">
							<input type="text" size="27" id="tmnlAssetNo" name="queryPara.tmnlAssetNo"  class="easyui-textbox"
								 data-options="validType:'numOnlyInput[12]'">
						</td>
						<td width="5%" class="td-label"  align="right" nowrap="nowrap">
							终端IP
						</td>
						<td  class="td-label"  width="5%" align="left">
							<input type="text" size="27" id="tmnlIp" name="queryPara.tmnlIp" class="easyui-textbox" 
								 data-options="validType:'inputIp'" >
						</td>
						<td id="tmType_td1" width="5%" class="td-label"  align="right" nowrap="nowrap" >
							终端类型
						</td>
						<td id="tmType_td2" class="td-label" width="5%" align="left" >
                            <input size="27" id="tmnlTypeCode" name="queryPara.tmnlTypeCode" class="easyui-combobox">
						</td>
						<td align="left">
                            <button class="easyui-linkbutton c1" onclick="queryList1();" style="width:70px;margin-left: 8px;">查询</button>
						</td>
					</tr>
					</table>
				  <table id="consTmnlTable" ></table>
              </div>
        </div>
	    
	     
	</body>
	<script type="text/javascript">
		$(function() { 
			var consId = '${param.consId}';
			var roleCode = '${param.roleCode}';
			
			//终端类型
			$('#tmnlTypeCode').combobox({
	             url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70067&roleCode='+roleCode,
	            editable:false,//不可编辑状态
		        valueField:'id',
		        textField:'text'
	        });
	        
			if (roleCode != "zhny") {
				$("#tmType_td1").hide();
				$("#tmType_td2").hide();
			}
			queryList();	
		});
		function queryList1(){
			var consId = '${param.consId}';
			var tmnlIp = $("#tmnlIp").val();
			var areaNo = $("#areaNo").val();
			var roleCode = $("#roleCode").val();
			var tmnlAssetNo = $("#tmnlAssetNo").val();
			var tmnlTypeCode = $("#tmnlTypeCode").combobox("getValue");
			$('#consTmnlTable').datagrid("load",{
	          	"queryPara.tmnlIp" : tmnlIp,
	          	"queryPara.consId" : consId,
	          	"queryPara.roleCode" : roleCode,
	          	"queryPara.tmnlAssetNo" : tmnlAssetNo,
	          	"queryPara.terminalType" : tmnlTypeCode
   			});
		}
		function queryList(){
			var consId = '${param.consId}';
			var tmnlIp = $("#tmnlIp").val();
			var areaNo = $("#areaNo").val();
			var roleCode = $("#roleCode").val();
			var tmnlAssetNo = $("#tmnlAssetNo").val();
			var tmnlTypeCode = $("#tmnlTypeCode").combobox("getValue");
			$('#consTmnlTable').datagrid({
				height : $(window).height()-$('#queryDiv').height()-3,
				border : false,
				singleSelect : false,
				lazyLoad : true,
				striped : true,
				//collapsible:true,  可折叠
				//fitColumns: true,
				url : des.webContextRoot+'areaEnergy/findConsTmnlListInfo.action',
				sortOrder : 'desc',
				remoteSort : false,
				showFooter : true,
				pageSize : 50,
				queryParams : {
	          		"queryPara.tmnlIp" : tmnlIp,
	          		"queryPara.consId" : consId,
	          		"queryPara.roleCode" : roleCode,
	          		"queryPara.tmnlAssetNo" : tmnlAssetNo,
	          		"queryPara.terminalType" : tmnlTypeCode
				},
				columns : [[
				        {   
				            field:'TERMINAL_ID',
				            checkbox:true,
				            width : 50,
				            formatter:function(value,row,index){
							     return row.TERMINAL_ID;
							}
				        }, {
							title : '终端资产号',
							field : 'TMNL_ASSET_NO',
							width : 200,
							sortable : true,
							formatter:function(value,row,index){
							     return row.TMNL_ASSET_NO;
							}
						}, {
							title : '通信规约',
							field : 'PROTOCOL_TYPE_NAME',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.PROTOCOL_TYPE_NAME;
							}
						}, {
							title : '终端IP',
							field : 'CTRL_IP',
							width : 100,
							sortable : true,
							formatter:function(value,row,index){
							     return row.CTRL_IP;
							}
						}, {
							title : '终端端口',
							field : 'CTRL_PORT',
							width : 100,
							sortable : true,
							formatter:function(value,row,index){
							     return row.CTRL_PORT;
							}
						}, {
							title : '通信信道',
							field : 'CHANNEL_NO_NAME',
							width : 100,
							sortable : true,
							formatter:function(value,row,index){
							     return row.CHANNEL_NO_NAME;
							}
						}, {
							title : '终端类型',
							field : 'TERMINAL_TYPE_CODE_NAME',
							width : 130,
							sortable : true,
							formatter:function(value,row,index){
							     return row.TERMINAL_TYPE_CODE_NAME;
							}
						}, {
							title : '终端型号',
							field : 'TERMINAL_KIND_NAME',
							width : 100,
							sortable : true,
							formatter:function(value,row,index){
							     return row.TERMINAL_KIND_NAME;
							}
						}, {
							title : '所属建筑',
							field : 'SUBS_NAME',
							width : 150,
							sortable : true,
							formatter:function(value,row,index){
							     return row.SUBS_NAME;
							}
						}, {
							title : '终端厂商',
							field : 'FACTORY_CODE_NAME',
							width : 100,
							sortable : true,
							formatter:function(value,row,index){
							     return row.FACTORY_CODE_NAME;
							}
						}, {
							title : '终端类型编号',
							field : 'TERMINAL_TYPE_CODE',
							width : 0,
							sortable : true,
							formatter:function(value,row,index){
							     return row.TERMINAL_TYPE_CODE;
							}
						}
						]],
				pagination : true,
				rownumbers : true,
				toolbar : [
					{
						text : '增加终端',
						id : 'addTmnl',
						iconCls : 'icon-add',
						handler : function() {
							var consId = '${param.consId}';
							var url=des.webContextRoot+"/pages/areaEnergy/baseData/tmnlInstall/createNewTmnl.jsp?consId="+consId+"&areaNo="+areaNo+"&roleCode="+roleCode;
		    				OpenWin(url,"新增终端",1100,425);
							//$('#collArchiveTable').datagrid("load",{
						         // "collArchiveInfo.orgNo" : orgNo
						   // });
						}
					},'-',{
							text:'删除终端',
							id : 'delTmnl',
							iconCls:'icon-remove',
							handler:function(){
							    var rows = $('#consTmnlTable').datagrid('getSelections'); 
							    if(rows.length==0){  
						            $.messager.alert('提示',"请选择你要删除的终端",'info'); 
						            return; 
						        }
							    $.messager.confirm('提示','确定要删除吗?',function(result){  
							            if (result){  
							                var rows = $('#consTmnlTable').datagrid('getSelections');  
							                var tmnlIdArr = [];  
							                var tmnlAssetNoArr = [];
							                $.each(rows,function(i,n){
							                    tmnlIdArr.push({'TERMINAL_ID' : n.TERMINAL_ID});
							                    tmnlAssetNoArr.push({'TMNL_ASSET_NO' : n.TMNL_ASSET_NO});
							                });
							                //删除客户
							                var url = des.webContextRoot+"areaEnergy/deleteTmnlOfCons.action";
							                var para = 'tmnlIds='+JSON.stringify(tmnlIdArr)+'&tmnlAssetNos='+JSON.stringify(tmnlAssetNoArr);
							                
							                $.ajax({
								                url : url,
								                type: "post",
								                data : para,
								                dataType:"json",
								                timeout:60000, 
								                error : function (XMLHttpRequest, textStatus, errorThrown) {
								           	 	     alert('程序异常');
								                },
								                success : function(result) {
								                     $.messager.alert('提示',result.msg,'info');
								                     if(result.flag=='1'){
								                        //$('#consTmnlTable').datagrid('reload');
								                        parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
								                     }
								                }
								            });
							            }  
							        });
						    }
					},'-',{
							text:'配置建筑关系',
							id : 'cfgConsSub',
							iconCls:'icon-edit',
							handler : function() {
								var rows = $('#consTmnlTable').datagrid('getSelections'); 
							    if(rows.length!=1){  
						            $.messager.alert('提示',"请选择一个终端进行配置",'info'); 
						            return; 
						        }
								var consId = '${param.consId}';
								var url=des.webContextRoot+"/pages/areaEnergy/baseData/tmnlInstall/consSubsList.jsp?tmnlTypeCode="+rows[0].TERMINAL_TYPE_CODE+"&consId="+consId+"&tmnlId="+rows[0].TERMINAL_ID;
			    				OpenWin(url,"配置建筑列表",650,380);
								//$('#collArchiveTable').datagrid("load",{
							         // "collArchiveInfo.orgNo" : orgNo
							   // });
							}
					},'-',{
							text:'解除建筑关系',
							id : 'removeConsSub',
							iconCls:'icon-remove',
							handler : function() {
								var rows = $('#consTmnlTable').datagrid('getSelections'); 
							    if(rows.length==0){  
						            $.messager.alert('提示',"请选择需要解除的终端",'info'); 
						            return; 
						        }
								$.messager.confirm('提示','确定要解除吗?',function(result){  
							            if (result){  
							                var rows = $('#consTmnlTable').datagrid('getSelections');  
							                var tmnlIdArr = [];  
							                $.each(rows,function(i,n){
							                    tmnlIdArr.push({'TERMINAL_ID' : n.TERMINAL_ID});
							                });
							                var consId = '${param.consId}';
							                var url = des.webContextRoot+"areaEnergy/removeConsSubsRela.action";
							                var para = 'tmnlIds='+JSON.stringify(tmnlIdArr)+'&consId='+consId;
							                $.ajax({
								                url : url,
								                type: "post",
								                data : para,
								                dataType:"json",
								                timeout:60000, 
								                error : function (XMLHttpRequest, textStatus, errorThrown) {
								           	 	     alert('程序异常');
								                },
								                success : function(result) {
								                     $.messager.alert('提示',result.msg,'info');
								                     if(result.flag=='1'){
								                        $('#consTmnlTable').datagrid('reload');
								                        parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
								                     }
								                }
								            });
							            }  
							        });
							}
					},'-',{
						text : '终端互换',
						id : 'changeTmnl',
						iconCls : 'icon-tip',
						handler : function() {
							var consId = $('#consIds').val();
							var url=des.webContextRoot+"/pages/areaEnergy/baseData/tmnlInstall/changeTmnl.jsp?consId="+consId;
		    				OpenWin(url,"终端互换",700,200);
						}
					},'-',{
						text : '数据补召',
						id : 'queryReCallTmnlInfo',
						iconCls : 'icon-more',
						handler : function() {
							var rows = $('#consTmnlTable').datagrid('getSelections'); 
						    if(rows.length!=1){  
					            $.messager.alert('提示',"请选择一个终端",'info'); 
					            return; 
					        }
						    var tmnlId;
						    $.each(rows,function(i,n){
			                    tmnlId = n.TERMINAL_ID;
			                });
							var url = des.webContextRoot+"areaEnergy/queryReCallTmnlInfo.action?tmnlId="+tmnlId;
							OpenMaxWin(url,"非侵入式终端应用");
						}
					}
				],
				onLoadSuccess:function(){
					var isEdit = parent.$("#isEdit").val();
					if(isEdit == 'false'){
						$("#removeConsSub").linkbutton("disable");
						$("#cfgConsSub").linkbutton("disable");
						$("#addTmnl").linkbutton("disable");
						$("#delTmnl").linkbutton("disable");
					}
					$(".datagrid").find("td").each(function() {
						if ($(this).attr("field") == "TERMINAL_TYPE_CODE") {
							$(this).hide();
						}
					});
					var roleCode = $('#roleCode').val();
					if(roleCode != 'fqls'){
						$("#queryReCallTmnlInfo").linkbutton("disable");
						$("#timeCheckCall").linkbutton("disable");
					}
				}
			});
		}
		$.extend($.fn.validatebox.defaults.rules, {    
		    numOnlyInput: {    
		        validator: function(value,param){ 
		            return /^[a-zA-Z0-9]*$/i.test(value)&&value.length<=param[0];    
		        },    
		        message: '请输入不超过{0}位的字母或数字'   
		    }    
		});
		$.extend($.fn.validatebox.defaults.rules, {    
		    inputIp: {    
		        validator: function(value){ 
		            return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/i.test(value);    
		            //return /^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.()$/i.test(value);    
		        },    
		        message: '请输入正确格式的IP'   
		    }    
		});
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
		
		function OpenMaxWin(url,title){
			var str = "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbar=no,copyhistory=no,left=0,screenX=0,top=0,screenY=0";
			if (window.screen) {
				var ah = screen.availHeight - 55;
				var aw = screen.availWidth - 10;
				str += ",height=" + ah;
				str += ",innerHeight=" + ah;
				str += ",width=" + aw;
				str += ",innerWidth=" + aw;
			} else { 
				str += ",resizable";
			}
			window.open(url,title, str);
		}
		
		function saveTmnlInfo() {
			if(isValid()){
				$.messager.confirm('确认','确认想要修改终端信息吗？',function(r) {
					if (r) {
						$.messager.progress();
						$('#thisform').form('submit',{
						url :'<%=basePath%>areaEnergy/saveConsTmnlInfo.action',    
					    success:function(res){    
					    	 $.messager.progress('close');
					        if (res != "" && res != null) {
			                	if(res == "tmnlAssetNoRepeat"){
			                		$.messager.confirm('确认','输入的终端资产号已经被使用了，请重新输入');
			                	}else if(res == "createTmnlError"){
			                		$.messager.confirm('确认','数据库异常，终端修改失败！');
			                	}else if(res == "ok"){
			                		$.messager.confirm('确认','终端修改成功!',function(){
			                			modifyTmnlInfo(true);
			                		});
			                	}else{
			                		$.messager.confirm('确认','系统异常!');
			                	}
			                }else{
			                    	$.messager.confirm('确认','系统异常!');
		                    }
		    
					    }    
					}); 
			    }    
			}); 
			}
		}
		function isValid(){
			var tmnlAssetNo = $("#tmnlAssetNo").val();
			if(!(tmnlAssetNo.length==10 && onlyNumInput(tmnlAssetNo))){
				$.messager.confirm('确认','终端资产号只能是10位数字!');
				return false;
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
		function modifyMPInfo(){
			var rows = $('#collArchiveTable').datagrid('getSelections'); 
		    if(rows.length!=1){  
	            $.messager.alert('提示',"请选择一条要修改的数据",'info'); 
	            return; 
	        }
	        //var row = $('#collArchiveTable').datagrid('getSelected'); 
	        //alert(rows[0].MP_ID);
	        var url=des.webContextRoot+"areaEnergy/modifyMpInfo.action?queryPara.mpId="+rows[0].MP_ID;
		    OpenWin(url,"修改测点",420,300);
		}
	</script>    
</html>
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
		<title>设备基本信息</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp">
   			<jsp:param name="flag" value="flag='13'" />
   		</jsp:include>
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
            <div class="easyui-panel" title="设备基本信息" style="width:100%;padding:5px 10px;">
            <form id="thisform" name="thisform" target="" method="post">
            	<input type="hidden" id="deviceId" name="queryPara.deviceId" value="${resultMap.DEVICE_ID}"/>
            	<input type="hidden" id="modifyFlag" name="queryPara.modifyFlag" value="1"/>
            	<input type="hidden" name="queryPara.deviceType" value="${resultMap.DEVICE_TYPE}"/>
            	<input type="hidden" name="queryPara.isDevice" value="${resultMap.IS_DECEVICE}"/>
            	<input type="hidden" id="terminalId" name="queryPara.terminalId" value="${resultMap.TERMINAL_ID}"/>
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												设备编号
											</td>
											<td width="25%">
												<input type="text" size="30" id="deviceNo" name="queryPara.deviceNo" disabled="disabled" 
												data-options="validType:'numOnlyInput[12]'"  class="easyui-textbox" value="${resultMap.DEVICE_NO}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	设备名称
                                            </td>
                                            <td width="25%">
												 <input type="text" size="30" id="deviceName" disabled="disabled"  name="queryPara.deviceName" class="easyui-textbox"
												 	data-options="required:true,missingMessage:'请选择设备名称'" value="${resultMap.DEVICE_NAME}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                              	 设备分类
                                            </td>
                                            <td width="25%">
					                            <input size="30" id="deviceType1" name="queryPara.deviceType1">
                                            </td>
										</tr>
										<tr>
                                            <td class="td-label" align="right" nowrap="nowrap">
												设备厂家
											</td>
											<td width="25%">
					                             <input id="factoryCode" name="queryPara.factoryCode" size="30">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                 	出厂日期
                                            </td>
                                            <td width="25%">
                                                  <input type="text" class="easyui-datebox" data-options="width:210" disabled="disabled" id="madeDate" name="queryPara.madeDate" value="${resultMap.MADE_DATE}"/>
                                            </td>
                                            <td class="td-label" align="right" nowrap="nowrap">
												运行状态
											</td>
											<td width="25%">
					                             <input id="runStatus" name="queryPara.runStatus" size="30">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												安装日期
											</td>
											<td width="25%">
					                            <input type="text" class="easyui-datebox" data-options="width:210" disabled="disabled" id="createDate" name="queryPara.createDate" value="${resultMap.CREATE_DATE}"/>
											</td>
											<td class="td-label" align="right" nowrap="nowrap">
												是否电气设备
											</td>
											<td>
												<select id="isDevice" class="easyui-combobox" style="width:210px;">
					                              	<option value="1">是</option>
					                                <option value="0">否</option>
					                            </select>
											</td>
											<td class="td-label" align="right" nowrap="nowrap">
												所属终端
											</td>
											<td>
												<input class="easyui-textbox" size="30" name="queryPara.tmnlAssetNo" id="tmnlAssetNo" disabled="disabled" readonly="readonly"
													data-options="required:true,missingMessage:'请选择所属终端'" value="${resultMap.TMNL_ASSET_NO}">
			                                    <a onclick="return false;" style="cursor:pointer" id='link'><img src="<%=basePath%>images/query.gif"></a>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												是否有效
											</td>
											<td>
												<select id="validFlag" name="queryPara.validFlag" class="easyui-combobox" style="width:210px;">
					                              	<option value="1">有效</option>
					                                <option value="0">无效</option>
					                            </select>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												备注
											</td>
											<td colspan="3">
												<textarea style="display:none" id='tx'>${resultMap.REMARK }</textarea>
												<input class="easyui-textbox" data-options = 'multiline:true' value="" name="queryPara.remark" disabled="disabled" id="remark" style= "width:470px;height:80px;">
											</td>
										</tr>
									</table>
							</td>
						</tr>
					</tbody>
				</table>
				</form>
               <div id="modifyBtn" style="padding: 5px; text-align: center;display: block;">
               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
               			<tr>
               				<td>
                    			<button id="modifyRealBtn" class="easyui-linkbutton c1" onclick="modifyTmnlInfo(false);" style="width:70px;">修改</button>
                    		</td>
                    	</tr>
                    </table>
               </div>
               <div id="saveBtn" style="padding: 5px; text-align: center;display: none;">
               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
               			<tr>
               				<td align="right">
                    			 <button class="easyui-linkbutton c1" onclick="saveTmnlInfo();" style="width:70px;">保存</button>
                    		</td>
               				<td align="left">
                    			 <button class="easyui-linkbutton c1" onclick="modifyTmnlInfo(true);" style="width:70px;">取消</button>
                    		</td>
                    	</tr>
                    </table>
               </div>
            </div>
				<div data-options="region:'north',collapsible:false"
					class="easyui-panel" title="采集点信息(注：当测点类型为遥信、告警策略为定制告警时，告警上限值只能输入1和0（开：0，合：1）)"
					style="border: 0; width: 100%; height: 100%; overflow: auto; background: #fafafa;">
					<table class="easyui-datagrid" id="dg"
					data-options="url:'<%=basePath%>areaEnergyTmnl/getMpInfo.action?tranId=${resultMap.DEVICE_ID}&areaNo=${resultMap.areaNo}&deviceRela=${resultMap.deviceRela}&deviceName='+encodeURIComponent($('#deviceName').val()),
									method:'get',
                                    toolbar: '#tb',
                                    iconCls: 'icon-edit',
									rownumbers:true,
									border:false,
									singleSelect:false,
									fit:true,
									fitColumns:true,
                                    onClickCell: onClickCell,
                                    onEndEdit: onEndEdit">
					<thead>
						<tr>
							<th data-options="field:'MP_ID',width:80,checkbox:true,
						formatter:function(value,row){
						return row.MP_ID;
						}"
											rowspan="2">
							</th>
							<th
								data-options="field:'VALID_FLAG',width:50,align:'center',editable:false,
                                formatter:function(value,row){
                                    return row.flagName;
                                },
                                editor:{
                                    type:'combobox',
                                    options:{
                                        valueField:'VALID_FLAG',
                                        textField:'flagName',
                                        method:'get',
                                    data: [{
                                                VALID_FLAG: '1',
                                                flagName: '是'
                                            },{
                                                VALID_FLAG: '0',
                                                flagName: '否'
                                            }]
                                    }
                                }"
								rowspan="2">
								是否
								<br>
								启用
							</th>
							<th data-options="field:'MP_NAME',width:200,align:'center',editor:'textbox',
						formatter: function(value,row,index){
						return row.MP_NAME;
						}" rowspan="2">
								测点名称
							</th>
							<th data-options="field:'MP_TYPE',align:'center',width:80,
						formatter: function(value,row,index){
						return row.MP_TYPE;
						}" rowspan="2">
								测点
								<br>
								类型
							</th>
							<th data-options="field:'MP_CODE',align:'center',width:100,
					formatter: function(value,row,index){
					return row.MP_CODE;
					}" rowspan="2">
								测点
								<br>
								编码
							</th>
							<th data-options="field:'COLL_ADDR',align:'center',width:100,editor:'numberbox',
					formatter: function(value,row,index){
					return row.COLL_ADDR;
					}" rowspan="2">
								采集
								<br>
								地址码<font style="color: red;">*</font>
							</th>
							<th data-options="field:'RATIONUM',align:'center',width:120,editor:{type:'numberbox',options:{precision:10}},
					                    formatter: function(value,row,index){
					                                return row.RATIONUM;
					                        }" rowspan="2">
								系数<font style="color: red;">*</font>
							<th data-options="field:'BASE_VALUE',align:'center',width:120,editor:{type:'numberbox',options:{min:0,precision:10}},
					                    formatter: function(value,row,index){
					                    			if (row.BASE_VALUE != null && row.BASE_VALUE != '') {
					                    				return row.BASE_VALUE;
					                    			} else {
					                    				return 0;
					                    			}
					                        }" rowspan="2">
								基数
							</th>
							</th>
							<th
								data-options="field:'warningWayId',width:100,align:'center',
                                formatter:function(value,row){
                                    return row.warningWayText;
                                },
                                editor:{
                                    type:'combobox',
                                    options:{
                                        valueField:'warningWayId',
                                        textField:'warningWayText',
                                        method:'get',
                                        editable:false,
                                        url:'<%=basePath%>areaEnergyTmnl/getCodeNameByWarningWay.action?codeValue=70040',
                                        required:false,
                                        align:'center',
                                        onChange:function(n,o){
											   change(n,o);
											}
                                    }
                                }"
								rowspan="2">
								告警
								<br>
								策略
							</th>
							<th colspan="2">
								正常范围值
							</th>
							<th colspan="3">
								告警策略值
							</th>
							<th data-options="field:'DEVICE_TYPE',align:'center',width:100,
					                    formatter: function(value,row,index){
					                                return row.DEVICE_TYPE;
					                        }" rowspan="2">
								设备
								<br>
								类型
							</th>
							
						</tr>
						<tr>
							<th data-options="field:'NORMAL_UP',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.NORMAL_UP;
							                        }">
								上限值
							</th>
							<th data-options="field:'NORMAL_DOWN',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.NORMAL_DOWN;
							                        }">
								下限值
							</th>
							<th data-options="field:'WARING_UP',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.WARING_UP;
							                        }">
								上限值
							</th>
							<th data-options="field:'WARING_DOWN',width:80,align:'center',editor:{type:'numberbox',options:{min:0,precision:4}},
							                    formatter: function(value,row,index){
							                                return row.WARING_DOWN;
							                        }">
								下限值
							</th>
							<th
								data-options="field:'id',width:100,align:'center',
                                formatter:function(value,row){
                                    return row.text;
                                },
                                editor:{
                                    type:'combobox',
                                    options:{
                                        valueField:'id',
                                        textField:'text',
                                        method:'get',
                                        editable:false,
                                        url:'<%=basePath%>areaEnergyTmnl/getWarningLevelInfo.action?areaNo=${resultMap.areaNo}',
                                        required:false,
                                        align:'center'

                                    }
                                }">
								告警
								<br>
								等级
							</th>
						</tr>
					</thead>
				</table>
				<div id="tb" style="height: auto; background-color: ">
					<a class="easyui-linkbutton" id = "saveMpBtn"
						data-options="iconCls:'icon-save',plain:true"
						onclick="javascript:producedMp()">保存测点</a>
					<a class="easyui-linkbutton" id = "newMpBtn"
						data-options="iconCls:'icon-add',plain:true"
						onclick="javascript:addInfo()">新增行记录</a>
					<a class="easyui-linkbutton" id = "delMpBtn"
						data-options="iconCls:'icon-remove',plain:true"
						onclick="javascript:removeit()">删除行记录</a>
					<a class="easyui-linkbutton" id="batchMpImportBtn"
						data-options="iconCls:'icon-reload',plain:true"
						onclick="javascript:batchImportMp()">测点批量导入</a>
				    <a class="easyui-linkbutton" id="exportMp"
						data-options="iconCls:'icon-reload',plain:true"
						onclick="javascript:exportMp('<%=basePath%>','${resultMap.DEVICE_ID}')">测点导出</a>
				</div>
				</div>
        </div>
	    
	    <%@include file="/pages/areaEnergy/baseData/tmnlInstall/mpExport.jsp"%>	 
	</body>
	<script type="text/javascript">
    var editIndex = undefined;
	var warningValue = "";
    var warningUpObj = "";
    var mpType = "";
        function batchImportMp(){
             var url = "<%=basePath%>"+'pages/areaEnergy/baseData/tmnlInstall/batchImportDeviceMp.jsp?deviceName='+encodeURIComponent($('#deviceName').val())+'&tmnlId='+$('#terminalId').val()+'&deviceType=4';
             OpenWin(url,'批量导入测点','800','600');
        }
        $(function() { 
            var isEdit = parent.$("#isEdit").val();
            if(isEdit == 'false'){
                $("#modifyRealBtn").linkbutton("disable");
                $("#saveMpBtn").linkbutton("disable");
                $("#newMpBtn").linkbutton("disable");
                $("#delMpBtn").linkbutton("disable");
                $("#batchMpImportBtn").linkbutton("disable");
            }
            var tx = $('#tx').val();
            $('#remark').textbox('setValue',tx);
            //getTmnl();
            //设备型号
            $('#deviceType1').combobox({
                 url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70025',
                editable:false,//不可编辑状态
                valueField:'id',
                textField:'text'
            });
            //设备厂家
            $('#factoryCode').combobox({
                 url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70018',
                editable:false,//不可编辑状态
                valueField:'id',
                textField:'text'
            });
            //运行状态
            $('#runStatus').combobox({
                 url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue=70033',
                editable:false,//不可编辑状态
                valueField:'id',
                textField:'text'
            });
            //下拉框赋值
            $("#factoryCode").combobox({value:'${resultMap.FACTORY_CODE}'});
            $("#runStatus").combobox({value:'${resultMap.RUN_STATUS}'});
            $("#isDevice").combobox({value:'${resultMap.IS_DECEVICE}'});
            $("#validFlag").combobox({value:'${resultMap.VALID_FLAG}'});
            $("#deviceType").combobox({disabled:true});
            $("#factoryCode").combobox({disabled:true});
            $("#runStatus").combobox({disabled:true});
            $("#isDevice").combobox({disabled:true});
            $("#validFlag").combobox({disabled:true});
            var deviceType = '${resultMap.DEVICE_TYPE}';
            $("#deviceType1").combobox({value:deviceType});
            $("#deviceType1").combobox({disabled:true});
            //queryList();  
        });
        //删除行记录
        function removeit(){
            var rows = $('#dg').datagrid('getSelections'); 
            if(rows.length==0){  
                $.messager.alert('提示',"请选择你要删除的已生成测点",'info'); 
                return; 
            }
            $.messager.confirm('提示','确定要删除吗?',function(result){  
                    if (result){  
                        var rows = $('#dg').datagrid('getSelections');  
                        var mpIdArr = [];  
                        $.each(rows,function(i,n){
                            mpIdArr.push({'MP_ID' : n.MP_ID});
                        });
                        //删除客户
                        var url = des.webContextRoot+"areaEnergy/deleteMpOfCons.action";
                        var para = 'mpIds='+JSON.stringify(mpIdArr);
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
                                    parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
                                 }
                            }
                        });
                    }  
                });
        }
        //生成测点
     function producedMp(){
        $('#dg').datagrid('acceptChanges');
        var rows = $('#dg').datagrid('getSelections'); 
            if(rows.length==0){  
                  $.messager.alert('提示',"请选择你要生成测点的采集点信息",'info'); 
                  return; 
            }
            
            $.messager.confirm('提示','确定要生成测点吗?',doSubmit);
    }
    function doSubmit(result){
          if (result){  
             var rows = $('#dg').datagrid('getSelections');  
             var mpArr = [];  
             var flag = 1;
             var warningLevel = '';
             var warningWayId = '';
             var eachFlag = true;
             $.each(rows,function(i,n){
                 if(n.flagName == '是'){
                     flag = 1;
                 }else if(n.flagName == '否'){
                     flag = 0; 
                 }else{
                     flag = n.flagName;
                 }
                 //校验
                 if(flag == 1){
                     if(n.COLL_ADDR ==""||n.COLL_ADDR == null){
                         $.messager.alert('提示',"采集点地址不能为空！",'info'); 
                         editIndex = undefined;
                         eachFlag = false;
                         return false;
                     }
                     if(n.RATIONUM ==""||n.RATIONUM == null){
                         $.messager.alert('提示',"系数不能为空！",'info');
                         editIndex = undefined;
                         eachFlag = false; 
                         return false; 
                     }
                 }
                 //告警值上限判断
                 if(n.MP_TYPE =='遥信'&& n.warningWayText =='定制告警'){
                     if(n.WARING_UP != 1.0000 && n.WARING_UP != 0.0000 && n.WARING_UP != null && n.WARING_UP != ''){
                        $.messager.alert('提示',"当测点类型和告警策略分别为遥信和定制告警时，告警策略值的上限值只能输入1或者0！",'info'); 
                        editIndex = undefined;
                         eachFlag = false;
                         return false;
                     }
                 }
                 
                 /*if(n.text == '请选择'){
                     warningLevel = '';
                 }else if(n.text == '紧急告警'){
                     warningLevel = 1; 
                 }else if(n.text == '事故告警'){
                     warningLevel = 2; 
                 }else if(n.text == '普通告警'){
                     warningLevel = 3; 
                 }else if(n.text == '一般记录'){
                     warningLevel = 4; 
                 }*/
                 //告警策略
                 if(n.warningWayText == '请选择'){
                     warningWayId = '';
                 }else if(n.warningWayText == '不告警'){
                     warningWayId = 1; 
                 }else if(n.warningWayText == '定制告警'){
                     warningWayId = 2; 
                 }else if(n.warningWayText == '告警模板1'){
                     warningWayId = 3; 
                 }
                 
                 /*if(n.NORMAL_UP ==""||n.NORMAL_UP == null){
                     $.messager.alert('提示',"正常范围值的上限值不能为空！",'info'); 
                     return; 
                 }
                 if(n.NORMAL_DOWN ==""||n.NORMAL_DOWN == null){
                     $.messager.alert('提示',"正常范围值的下限值不能为空！",'info'); 
                     return; 
                 }*/
                 if(n.NORMAL_UP == null){
                     n.NORMAL_UP = '';
                 }
                 if(n.NORMAL_DOWN == null){
                     n.NORMAL_DOWN = '';
                 }
                 if(n.WARING_UP == null){
                     n.WARING_UP = '';
                 }
                 if(n.WARING_DOWN == null){
                     n.WARING_DOWN = '';
                 }
                 if(n.text == null){
                     n.text = '';
                 }
                 mpArr.push({'mpId' : n.MP_ID
                             ,'mpCode' : n.MP_CODE
                             ,'mpName' : n.MP_NAME
                             ,'mpType' : n.MP_TYPE
                             ,'collAddr' : Number(n.COLL_ADDR)
                             ,'validFlag' : Number(flag)
                             ,'ratio' : Number(n.RATIONUM)
                             ,'baseValue' : Number(n.BASE_VALUE)
                             ,'normalUp' : n.NORMAL_UP
                             ,'normalDown' : n.NORMAL_DOWN
                             ,'waringLevel' : n.text
                             ,'waringUp' : n.WARING_UP
                             ,'waringDown' : n.WARING_DOWN
                             ,'terminalId' : '${resultMap.TERMINAL_ID}'
                             ,'deviceId' : '${resultMap.DEVICE_ID}'
                             ,'deviceType' : 4
                             ,'warningWay':warningWayId
                             ,'areaNo':'${resultMap.areaNo}'
                           });
             });
             if(!eachFlag){
                return;
             }else{
                 var para = 'mpList='+JSON.stringify(mpArr);
                 //alert(para);
                 //保存测点
                 var url = "<%=basePath%>areaEnergy/saveDeviceMpInfo.action";
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
                          if(result.flag=='1'){
                             $.messager.alert('提示',result.info,'info',function(){
                                  parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
                             });
                          }else{
                             $.messager.alert('提示',result.info,'info',function(){
                                  editIndex = undefined;
                             });
                          }
                     }
                 });
             }
         }else{
            editIndex = undefined;
         }  
    }
        //查询所属终端是否只有一个（默认显示）
        function getTmnl(){
            $.ajax({
                url : des.webContextRoot +'line/getTmnl.action',
                type: "post",
                dataType:"json",
                data : {"subsId":${resultMap.subsId}},
                timeout:60000, 
                error : function (XMLHttpRequest, textStatus, errorThrown) {
                    //去除遮罩
                    $.messager.confirm("提示","保存失败");
                },
                success : function(result) {
                        if(result.flag=='1'){
                            //$('#tmnlAssetNo').textbox('setValue',result.tmnlAssetNo) ;
                            $('#terminalId').attr('value',result.tmnlId) ;
                        }
                  }
            });
        }
    function addInfo(){
        var url = "<%=basePath%>/pages/areaEnergy/baseData/tmnlInstall/chooseMpList.jsp?deviceRela="+'${resultMap.deviceRela}';
        OpenWin(url,"修改测点",680,450);    
    }
    //查询所属终端
    function queryTmnlMessageList(){
        var url = "<%=basePath%>pages/areaEnergy/bs/tmnlMessageList.jsp?subId="+'${resultMap.subsId}'+'&deviceId='+${resultMap.DEVICE_ID}+"&tmnlId="+$('#terminalId').val()+'&opType=update';
        OpenWin(url,"终端配置列表",950,600);
    }
    function getMpInfo(mpIdStr,mpNameStr,mpTypeNameStr,mpCodeStr){
        for(var i=0;i<mpIdStr.length;i++){
            $('#dg').datagrid('appendRow',{
                //MP_ID: mpIdStr[i],
                MP_ID: '-1',
                VALID_FLAG : '1',
                flagName : '是' ,
                MP_NAME: '${resultMap.DEVICE_NAME}'+mpNameStr[i],
                MP_TYPE: mpTypeNameStr[i],
                MP_CODE: mpCodeStr[i],
                warningWayId: '',
                warningWayText:'请选择',
                id: '',
                text:'请选择',
                DEVICE_TYPE: '${resultMap.DEVICE_TYPE_NAME}',
            }); 
        }
    }
    
    function endEditing(){
        if (editIndex == undefined){return true}
        if ($('#dg').datagrid('validateRow', editIndex)){
            $('#dg').datagrid('endEdit', editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    }
    
    //var warningUpFlag = 0;
     var indexChange;
    function change(newVal,oldVal){
        var selectedRow = $('#dg').datagrid("getSelected");
        var index = indexChange;
        var rows = $('#dg').datagrid('getRows');
        var r = rows[index];
        mpType = r.MP_TYPE;
        //mpType = '遥信';
        
        //告警策略
        var row = $('#dg').datagrid('selectRow', index);
        if(mpType == '遥测' || mpType =='遥脉'){
            if(newVal == 1){
                var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningUp.target).numberbox('clear');
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                 var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('disable');
                $(waringLevel.target).combobox('setValue', '');
            }else if(newVal == 2){
                var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('enable');
            }else if(newVal == 3){
                  var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningUp.target).numberbox('clear');
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('disable');
                $(waringLevel.target).combobox('setValue', '');
            }else if(newVal == ''){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
        }else if(mpType == '遥信'){
            if(newVal == 1||newVal == 3){
                  var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningUp.target).numberbox('clear');
                
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('disable');
                $(waringLevel.target).combobox('setValue', '');
            }else if(newVal == 2){
                 warningUpFlag = 1;
                 var normalUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_UP'
                                });
                $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalUp.target).numberbox('clear');
                
                var normalDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'NORMAL_DOWN'
                                });
                $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(normalDown.target).numberbox('clear');
                
                 var warningUp = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_UP'
                                });
                $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                
                /*$(warningUp.target).combobox({
                                        valueField:'WARING_UP',    
                                        textField:'value',
                                        editable:false,
                                        required:false,
                                        align:'center',
                                         width:70,
                                        data: [{
                                            WARING_UP: '0',
                                            value: '开'
                                        },{
                                            WARING_UP: '1',
                                            value: '合'
                                        }]                                                      
                                    });*/
                                    
                var warningDown = $(row).datagrid('getEditor', {
                                    index: index,  
                                    field: 'WARING_DOWN'
                                });
                $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                $(warningDown.target).numberbox('clear');
                var waringLevel = $(row).datagrid('getEditor', {
                    index: index,
                    field: 'id'
                });
                $(waringLevel.target).combobox('enable');
            }else if(newVal == ''){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
        }
    }
    //点击单元格的时候开始编辑并生成编辑器，然后定位到编辑器的输入框上
    function onClickCell(index, field){
        
        if (editIndex != index){
            if (endEditing()){
            indexChange = index;
            
               //选中的这一行开始编辑
                $('#dg').datagrid('selectRow', index)
                        .datagrid('beginEdit', index);
                var ed = $('#dg').datagrid('getEditor', {index:index,field:field});
                //验证通过之后，判断上限下限值是否可以编辑
                //获取测点类型的值
                var row = $('#dg').datagrid('selectRow', index);
                //var checkedRow = $('#dg').datagrid("getSelected");
                var rows = $('#dg').datagrid('getRows');
                var checkedRow = rows[index];
                if(checkedRow.MP_TYPE == '遥测' || checkedRow.MP_TYPE =='遥脉'){
                    if(checkedRow.warningWayText == '不告警'){
                        var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                        var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                         var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).numberbox('clear');
                        
                    }else if(checkedRow.warningWayText == '定制告警'){
                        var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('enable');
                    }else if(checkedRow.warningWayText == '告警模板1'){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',false);//设置输入框为禁用
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }else if(checkedRow.warningWayText == '请选择'){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
                }else if(checkedRow.MP_TYPE == '遥信'){
                    if(checkedRow.warningWayText == '不告警'||checkedRow.warningWayText == '告警模板1'){
                           var normalUp = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'NORMAL_UP'
                                          });
                          $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(normalUp.target).numberbox('clear');
                          
                          var normalDown = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'NORMAL_DOWN'
                                          });
                          $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(normalDown.target).numberbox('clear');
                          
                           var warningUp = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'WARING_UP'
                                          });
                          $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(normalDown.target).numberbox('clear');
                          
                          var warningDown = $(row).datagrid('getEditor', {
                                              index: index,  
                                              field: 'WARING_DOWN'
                                          });
                          $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                          $(warningDown.target).numberbox('clear');
                          
                          
                          var waringLevel = $(row).datagrid('getEditor', {
                              index: index,
                              field: 'id'
                          });
                          $(waringLevel.target).combobox('disable');
                          $(waringLevel.target).combobox('setValue', '');
                          
                    }else if(checkedRow.warningWayText == '定制告警'){
                        warningUpFlag = 1;
                        var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',false);//设置输入框为可用
                        /*$(warningUp.target).combobox({
                                        valueField:'WARING_UP',    
                                        textField:'value',
                                        editable:false,
                                        required:false,
                                        align:'center',
                                         width:70,
                                        data: [{
                                            WARING_UP: '0',
                                            value: '开'
                                        },{
                                            WARING_UP: '1',
                                            value: '合'
                                        }]                                                      
                                    });*/
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('enable');
                    }else if(checkedRow.warningWayText == '请选择'){
                         var normalUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_UP'
                                        });
                        $(normalUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalUp.target).numberbox('clear');
                        
                        var normalDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'NORMAL_DOWN'
                                        });
                        $(normalDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(normalDown.target).numberbox('clear');
                        
                         var warningUp = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_UP'
                                        });
                        $(warningUp.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningUp.target).numberbox('clear');
                        
                        var warningDown = $(row).datagrid('getEditor', {
                                            index: index,  
                                            field: 'WARING_DOWN'
                                        });
                        $(warningDown.target).textbox('textbox').attr('readonly',true);//设置输入框为禁用
                        $(warningDown.target).numberbox('clear');
                        
                        var waringLevel = $(row).datagrid('getEditor', {
                            index: index,
                            field: 'id'
                        });
                        $(waringLevel.target).combobox('disable');
                        $(waringLevel.target).combobox('setValue', '');
                    }
                }
                    
               
                if (ed){
                    //($(ed.target).data('numberbox') ? $(ed.target).textbox('numberbox') : $(ed.target)).focus();
                    
                    ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
                }
                editIndex = index;
            } else {
                setTimeout(function(){
                    $('#dg').datagrid('selectRow', editIndex);
                },0);
            }
        }
    }
   function onEndEdit(index, row){
        //
        var mpName = $(this).datagrid('getEditor', {
            index: index,
            field: 'MP_NAME'
        });
        row.MP_NAME = $(mpName.target).textbox('getText');
        //
        var collAddr = $(this).datagrid('getEditor', {
            index: index,
            field: 'COLL_ADDR'
        });
        row.COLL_ADDR = $(collAddr.target).numberbox('getValue');
        //
        var rationum = $(this).datagrid('getEditor', {
            index: index,
            field: 'RATIONUM'
        });
        row.RATIONUM = $(rationum.target).numberbox('getValue');
        //基数	
        var baseValue = $(this).datagrid('getEditor', {
            index: index,
            field: 'BASE_VALUE'
        });
        row.BASE_VALUE = $(baseValue.target).numberbox('getValue');
        //告警等级
        var waringLevel = $(this).datagrid('getEditor', {
            index: index,
            field: 'id'
        });
        row.text = $(waringLevel.target).combobox('getText');
        //告警策略
        var warningWay = $(this).datagrid('getEditor', {
            index: index,
            field: 'warningWayId'
        });
        row.warningWayText = $(warningWay.target).combobox('getText');
        //
        var flagName = $(this).datagrid('getEditor', {
            index: index,
            field: 'VALID_FLAG'
        });
        row.flagName = $(flagName.target).combobox('getText');
        //
        var normalUp = $(this).datagrid('getEditor', {
            index: index,
            field: 'NORMAL_UP'
        });
        row.NORMAL_UP = $(normalUp.target).numberbox('getValue');
        //
        var normalDown = $(this).datagrid('getEditor', {
            index: index,
            field: 'NORMAL_DOWN'
        });
        row.NORMAL_DOWN = $(normalDown.target).numberbox('getValue');
        //
        var waringUp = $(this).datagrid('getEditor', {
            index: index,
            field: 'WARING_UP'
        });
        row.WARING_UP = $(waringUp.target).numberbox('getValue');
        //
        var waringDown = $(this).datagrid('getEditor', {
            index: index,
            field: 'WARING_DOWN'
        });
        row.WARING_DOWN = $(waringDown.target).numberbox('getValue');
        
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
        
        function queryList1(){
            var deviceType = $("#deviceType").combobox("getValue");
            var mpType = $("#mpType").combobox("getValue");
            var validFlag = $("#validFlag").combobox("getValue");
            $('#collArchiveTable').datagrid("load",{
              "queryPara.deviceType" : deviceType,
              "queryPara.mpType" : mpType,
              "queryPara.validFlag" : validFlag,
              "queryPara.tmnlId" : 101000000023
             });
        }
        function queryList(){
            var deviceType = $("#deviceType").combobox("getValue");
            var mpType = $("#mpType").combobox("getValue");
            var validFlag = $("#validFlag").combobox("getValue");
            $('#collArchiveTable').datagrid({
                height : $(window).height()-$('#queryDiv').height()-5,
                border : false,
                singleSelect : false,
                lazyLoad : true,
                striped : true,
                //collapsible:true,  可折叠
                //fitColumns: true,  自动调整各列,下面各列的宽度值就只是一个比例。
                url : des.webContextRoot+'areaEnergy/findTmnlMpInfo.action',
                sortOrder : 'desc',
                remoteSort : false,
                showFooter : true,
                pageSize : 50,
                queryParams : {"queryPara.deviceType" : deviceType,"queryPara.mpType" : mpType,"queryPara.validFlag" : validFlag,"queryPara.tmnlId" : 101000000023},
                columns : [[
                        {   
                            field:'MP_ID',
                            checkbox:true,
                            width:5,
                            rowspan:2,
                            formatter:function(value,row,index){
                                 return row.MP_ID;
                            }
                        }, {
                            title : '设备类型',
                            field : 'DEVICE_TYPE',
                            width : 150,
                            rowspan:2,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.DEVICE_TYPE;
                            }
                        }, {
                            title : '测点类型',
                            field : 'MP_TYPE',
                            width : 100,
                            rowspan:2,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.MP_TYPE;
                            }
                        }, {
                            title : '测点编码',
                            field : 'MP_CODE',
                            width : 100,
                            rowspan:2,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.MP_CODE;
                            }
                        }, {
                            title : '测点名称',
                            field : 'MP_NAME',
                            width : 150,
                            rowspan:2,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.MP_NAME;
                            }
                        }, {
                            title : '采集地址码',
                            field : 'COLL_ADDR',
                            width : 100,
                            rowspan:2,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.COLL_ADDR;
                            }
                        }, {
                            title : '系数',
                            field : 'RATIO',
                            width : 100,
                            rowspan:2,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.RATIO;
                            }
                        }, {
                            title : '是否启用',
                            field : 'VALID_FLAG',
                            width : 70,
                            rowspan:2,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.VALID_FLAG;
                            }
                        }, {
                            title : '所属对象',
                            field : 'BELONGOBJ',
                            width : 100,
                            rowspan:2,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.BELONGOBJ;
                            }
                        }, {
                            title : '正常范围',
                            colspan:2
                        }, {
                            title : '告警阀值',
                            colspan:2
                        }
                        ],
                        [{
                            title : '上限值',
                            field : 'NORMAL_UP',
                            width : 100,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.NORMAL_UP;
                            }
                        },  {
                            title : '下限值',
                            field : 'NORMAL_DOWN',
                            width : 100,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.NORMAL_DOWN;
                            }
                        },  {
                            title : '上限值',
                            field : 'WARING_UP',
                            width : 100,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.WARING_UP;
                            }
                        }, {
                            title : '下限值',
                            field : 'WARING_DOWN',
                            width : 100,
                            sortable : true,
                            formatter:function(value,row,index){
                                 return row.WARING_DOWN;
                            }
                        }
                ]],
                pagination : true,
                rownumbers : true,
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
        
        function modifyTmnlInfo(saveFlag){
           $("#deviceNo").textbox({disabled:saveFlag});
           $("#deviceName").textbox({disabled:saveFlag});
           $("#madeDate").textbox({disabled:saveFlag});
           $("#createDate").textbox({disabled:saveFlag});
           $("#remark").textbox({disabled:saveFlag});
           $("#tmnlAssetNo").textbox({disabled:saveFlag});
           $("#factoryCode").combobox({disabled:saveFlag});
           $("#runStatus").combobox({disabled:saveFlag});
           $("#validFlag").combobox({disabled:saveFlag});
           if(saveFlag){
               $("#link").unbind('click',queryTmnlMessageList);
               $("#link").bind('click');
           }else{
               $("#link").unbind('click');
               $("#link").bind('click',queryTmnlMessageList);
           }
           if(saveFlag == false){
               $("#saveBtn").css("display","block");
               $("#modifyBtn").css("display","none");
           }else{
               $("#saveBtn").css("display","none");
               $("#modifyBtn").css("display","block");
           }
        }
        function saveTmnlInfo() {
                $.messager.confirm('确认','确认想要保存设备信息吗？',function(r) {
                    if (r) {
                        $.messager.progress();
                        $('#thisform').form('submit',{
                        url :'<%=basePath%>areaEnergy/createNewOtherDevice.action',  
                        onSubmit: function(){
                            var isValid = $(this).form('validate');
                            if (!isValid){
                                $.messager.progress('close');
                            }
                            return isValid;
                        },    
                        success:function(res){    
                             $.messager.progress('close');
                            if (res != "" && res != null) {
                                if(res == "deviceNoRepeat"){
                                    $.messager.confirm('确认','输入的设备编号已经被使用了，请重新输入');
                                }else if(res == "createOtherDeviceError"){
                                    $.messager.confirm('确认','数据库异常，设备新增失败！');
                                }else if(res == "ok"){
                                    $.messager.confirm('确认','设备修改成功!',function(){
                                        //modifyTmnlInfo(true);
                                        parent.com.frontier.areaEnergy.baseData.reloadTree.flushAndClickCurrentNode();
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
        function isValid(){
            var deviceNo = $("#deviceNo").val();
            if(!(deviceNo.length<=16 && deviceNo.length>0 && onlyNumInput(deviceNo))){
                $.messager.confirm('确认','设备编号只能是不超过16位数字!');
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
	</script>    
</html>
<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=utf-8" />
		<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
		<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
		<META HTTP-EQUIV="Expires" CONTENT="0">
		<META HTTP-EQUIV="X-UA-Compatible" CONTENT="IE=EmulateIE7"/>
		<title>网荷互动用户终端查询结果</title>
		<jsp:include page="/pages/common/head.jsp" />
		<style>
			.clear{
				clear:both;
				height:0px;
				line-height:0px;
				padding:0px!important;
				margin:0px!important;
				border:0px!important;
			}
		</style>
  </head>
  
    <body>
        <form name="thisform" method="post" action="<%=basePath%>/grid/queryConsList.action" id="thisform">
            <input type=hidden id="queryFlag" name="queryFlag" value="${param.queryFlag}">
            <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <input type="hidden" id="hideOpBtns" value="0">
                <tbody>
                    <tr>
                        <td valign="top">
                            <div style="background-color: #f8f8f8">
								<fpus:DataGrid form="thisform" var="map" items="${resultList}" action="/grid/queryConsList.action" title="查询结果">
									<fpus:Col hidden="true" radio="true" value="${map.TERMINAL_ID},${map.STATUS_CODE},${map.CP_NO},${map.DEPT_NO},${map.CONS_ID},${map.ORGNAME}"/>
                                    <fpus:Col width="160" id="orgName" title="供电单位" subStr="10"
                                        orderBy="ORGNAME" value="${map.ORGNAME}" />
                                    <fpus:Col width="120" id="assetNo" title="终端资产号" 
                                    orderBy="ASSET_NO" value="${map.ASSET_NO}" />
                                    <fpus:Col width="80" id="statusName" title="运行状态" subStr="8"
                                        orderBy="STATUSNAME" value="${map.STATUSNAME}" />
                                    <fpus:Col width="100" id="ctrlIp" title="控制IP" subStr="8"
                                        orderBy="CTRL_IP" value="${map.CTRL_IP}" />
                                    <fpus:Col width="100" id="readMeterIp" title="抄表IP" subStr="8"
                                        orderBy="READ_METER_IP" value="${map.READ_METER_IP}" />
                                    <fpus:Col width="90" id="confStatus" title="参数状态" subStr="8"
                                        orderBy="CONF_STATUS" value="${map.CONF_STATUS}" />    
                                    <fpus:Col width="80" id="period" title="所属工期" subStr="8"
                                        orderBy="PERIOD" value="${map.PERIOD}" />
                                    <fpus:Col width="120" title="最后通讯时间" orderBy="LAST_COMM_TIME" value="${map.LAST_COMM_TIME}" />
                                    <fpus:Col width="90" title="在线状态" orderBy="ONLINE_STATUS" value="${map.ONLINE_STATUS}" />
                                    <fpus:Col width="100" id="calcFlag" title="是否参与计算" subStr="8"
                                        orderBy="CALC_FLAG" value="${map.CALC_FLAG}" />
                                    <fpus:Col width="120" id="factoryName" title="终端厂家" subStr="8"
                                        orderBy="FACTORY_NAME" value="${map.FACTORY_NAME}" />
                                    <fpus:Col width="100" id="consNo" title="用户编号" 
                                    orderBy="CONS_NO" value="${map.CONS_NO}" />
                                    <fpus:Col width="150" id="consName" title="用户名称" subStr="10"
                                        orderBy="CONS_NAME" value="${map.CONS_NAME}" />
									<fpus:Col width="150" id="userProperty" title="用户属性" subStr="10"
										orderBy="USERPROPERTY" value="${map.USERPROPERTY}" />
									<fpus:Col width="90" id="consVolt" title="电压等级"
                                        orderBy="CONS_VOLT" value="${map.CONS_VOLT}" />
                                    <fpus:Col width="90" id="contractCap" title="合同容量"
                                        orderBy="CONTRACT_CAP" value="${map.CONTRACT_CAP}" />
                                    <fpus:Col width="140" id="trade" title="行业分类" subStr="9"
                                        orderBy="TRADE" value="${map.TRADE}" />
                                    <fpus:Col width="90" id="psNum" title="电源数目"
                                        orderBy="PS_NUM" value="${map.PS_NUM}" />
                                    <fpus:Col width="120" id="elecAddr" title="用电地址" subStr="8"
                                        orderBy="ELEC_ADDR" value="${map.ELEC_ADDR}" />
								</fpus:DataGrid>
							</div>
						</td>
					</tr>
					<tr>
						<td valign="top">
							<div class="btnArea">
								<div style="float:left;padding-left:10px;border:0px;margin-bottom:-2px;">
									<input type="button" onclick="addInfo()" class="btn1_mouseout"
										value="新建终端" onmouseover="this.className='btn1_mouseover'"
										onmouseout="this.className='btn1_mouseout'" />
									<input type="button" onclick="updateInfo()"
										class="btn1_mouseout" value="查看"
										onmouseover="this.className='btn1_mouseover'"
										onmouseout="this.className='btn1_mouseout'" />
									<input type="button" onclick="chkOperateLog()"
										class="btn1_mouseout" value="操作日志"
										onmouseover="this.className='btn1_mouseover'"
										onmouseout="this.className='btn1_mouseout'" />
									<fpus:purviewButton name="btnDel" value="删除"
											onClick="deleteInfo()" />
									<input type="button" onclick="synCfg()" style="display:none;"
										class="btn1_mouseout" value="同步跳闸矩阵配置数据"
										onmouseover="this.className='btn1_mouseover'"
										onmouseout="this.className='btn1_mouseout'" />
								</div>
								<div style="float:right;border:0px;margin-bottom:-2px;">
									<input type="button" onclick="saveArchives()" class="btn1_mouseout" 
									    value="存档" onmouseover="this.className='btn1_mouseover'" 
									    onmouseout="this.className='btn1_mouseout'" />
									<input type="button" onclick="exportExcel()"
										class="btn1_mouseout" value="导出审核资料"
										onmouseover="this.className='btn1_mouseover'"
										onmouseout="this.className='btn1_mouseout'" />
									<input type="button" onclick="startRun()" class="btn1_mouseout"
										value="投运" onmouseover="this.className='btn1_mouseover'"
										onmouseout="this.className='btn1_mouseout'" />
								    <input type="button" id="btnSetDebug"
										class="btn1_mouseout"
										onmouseover="this.className='btn1_mouseover'"
										onmouseout="this.className='btn1_mouseout'"
										value="置为调试"  onClick="setDebug()" />
									<input type="button" class="btn1_mouseout" value="导入接线图进出线关系"
										onmouseover="this.className='btn1_mouseover'"
										onmouseout="this.className='btn1_mouseout'"
										onclick="lineInfoInput()" />
									<input type="button" id="btnSetCalcFlagY"
										class="btn1_mouseout"
										onmouseover="this.className='btn1_mouseover'"
										onmouseout="this.className='btn1_mouseout'"
										value="参与计算"  onClick="setCalcFlag(1)" /> 	
									<input type="button" id="btnSetCalcFlagN"
										class="btn1_mouseout"
										onmouseover="this.className='btn1_mouseover'"
										onmouseout="this.className='btn1_mouseout'"
										value="不参与计算"  onClick="setCalcFlag(0)" /> 	
								</div>
								<div class="clear">
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</body>
</html>
	<script type="text/javascript">
        $(function(){
            setDataGridHeight();
        });	
        
        
		//新建终端
		function addInfo(){
		   var url = '<%=basePath%>'+'/pages/basicApp/gliConsManage/gliCons/gliCreateMain.jsp';
		   //OpenWin(encodeURI(url),'新建',1200,700);
		   OpenWin(encodeURI(url),'新建',screen.availWidth-10,screen.availHeight-130);
		}
		
		//查看
		function updateInfo(){
		   var terminalId = "";
		   var value = $("input[name='ids']:checked").val();
		   if(!isNullOrEmpty(value)){
		      terminalId = value.split(',')[0];
		   }
		   
		   if(isNullOrEmpty(value)){
			  MessageBox("请选择一条记录！");
			  return;
		   }
		   //var url = '<%=basePath%>'+'grid/initTreeBaseInfo.action?queryPara.terminalId='+terminalId +"&queryPara.hideOpBtns=" + $("#hideOpBtns").val();
		   var url = '<%=basePath%>'+'grid/initTreeBaseInfo.action?terminalId='+terminalId +"&hideOpBtns=" + $("#hideOpBtns").val();
		   //OpenWin(encodeURI(url),'网荷互动终端档案查看',1200,700);
		   OpenWin(encodeURI(url),'网荷互动终端档案查看',screen.availWidth-10,screen.availHeight-130);
		}
		function deleteInfo(){
			  var rcds = $("input[name='ids']:checked");
			  if(rcds.size()!=1){
					MessageBox("请选择一条记录！");
					return;
			  }
			  var obj = OpenModalDialog("<%=basePath%>pages/basicApp/gliConsManage/gliCons/keyValid.jsp?fnType=1","密码验证",380,180);
			  if(typeof(obj)!='undefined' && obj.success=='1'){
				  MessageBox("密码验证通过！");
				  MessageBox("确定删除吗？","系统提示",Q_ICON,MB_YESNO,doDelete); 
			 }else{
			 }
		} 
		function doDelete(result){
			if(result==MB_YES){
				 var value = $("input[name='ids']:checked").val();
				 var cpNo = value.split(',')[2];
				 var deptNo = value.split(',')[3];
				 showWaitDisplayForQuery("<%=basePath%>","正在删除......");
		           $.ajax({
		                 type: "post",
		                 data: {
		                       'cpNo':cpNo,
		                       'deptNo':deptNo
		                 },
		                 url: '<%=basePath%>grid/deleteTmnl.action',
		                 timeout: 60000,
		                 dataType: "json",
		                 cache: false,
		                 error: function (XMLHttpRequest, textStatus, errorThrown) {
		                     MessageBoxForAjax("系统异常", XMLHttpRequest);
		                     disWaitDisplayForQuery();
		                 },
		                 success: function(json){
		                       disWaitDisplayForQuery();
		                       if(json.msg=='suc'){
		                           MessageBox("删除成功！", "系统提示", T_ICON, MB_OK,function(){
		                               var queryFlag= document.getElementById("queryFlag").value;
		                               window.parent.query(queryFlag);
		                               //window.close();
		                           });
		                       }else{
		                           MessageBox(json.msg);
		                       }
		                 }
		           });
		       }
		}
		//投运
		function startRun(){
		    var value = $("input[name='ids']:checked").val();
		    if(!isNullOrEmpty(value)){
		      var terminalId = value.split(',')[0];
              var statusCode = value.split(',')[1];
              var cpNo = value.split(',')[2];
              var orgNo = value.split(',')[3];
		    }
            
            if(isNullOrEmpty(value)){
               MessageBox("请选择一条记录！");
               return;
            }
            if(statusCode != "07"){
                MessageBox("终端必须为调试状态！");
                return;
            }
           MessageBox("确定投运吗？","系统提示",Q_ICON,MB_YESNO,doRun); 
           
		}
		//投运操作
		function doRun(result){
           if(result==MB_YES){
               var value = $("input[name='ids']:checked").val();
	            if(!isNullOrEmpty(value)){
	              var terminalId = value.split(',')[0];
	              var statusCode = value.split(',')[1];
	              var cpNo = value.split(',')[2];
	              var orgNo = value.split(',')[3];
	              var consNo = $($("input[name='ids']:checked")[0]).parent().parent().children("td:eq(13)").text().trim();
	            }
               showWaitDisplayForQuery("<%=basePath%>","正在投运......");
	           $.ajax({
	                 type: "post",
	                 data: {
	                       'terminalId':terminalId,
	                       'statusCode':statusCode,
	                       'cpNo':cpNo,
	                       'orgNo':orgNo,
	                       'consNo':consNo
	                 },
	                 url: '<%=basePath%>grid/setTmnlRun.action',
	                 timeout: 60000,
	                 dataType: "json",
	                 cache: false,
	                 error: function (XMLHttpRequest, textStatus, errorThrown) {
	                     MessageBoxForAjax("系统异常", XMLHttpRequest);
	                     disWaitDisplayForQuery();
	                 },
	                 success: function(json){
	                       disWaitDisplayForQuery();
	                       if(json.msg=='suc'){
	                           
	                           MessageBox("投运成功！", "系统提示", T_ICON, MB_OK,function(){
	                               var queryFlag= document.getElementById("queryFlag").value;
	                               window.parent.query(queryFlag);
	                               //window.close();
	                           });
	                       }else{
	                           MessageBox(json.msg);
	                       }
	                 }
	           });
            }
        }
        //导出审核资料
        function exportExcel(){
	        var value = $("input[name='ids']:checked").val();
	        if(isNullOrEmpty(value)){
	           MessageBox("请选择一条记录！");
	           return;
	        }
	        var terminalId = value.split(',')[0];
	        var cpNo = value.split(',')[2];
	        document.thisform.action = "<%=basePath%>grid/exportExcel.action?cpNo="+cpNo + "&terminalId=" + terminalId;
	        document.thisform.submit();
        }
        // 自适应高度调整 
        function setDataGridHeight() {
            var scrollHeight = this.document.body.scrollHeight;
            var gridHeight;
            if (scrollHeight != 0) {
                gridHeight = parent.document.body.offsetHeight - $(parent.document).find(".message:first").get(0).offsetHeight - 105;
                $(".dataGrid:first").parent().css("height",gridHeight).parent().parent().parent().parent().height(gridHeight + 30);
                parent.document.all("bodyFrame").height = this.document.body.scrollHeight;
                //该代码有些时候不给力啊
                //parent.document.all("bodyFrame").style.height = this.document.body.scrollHeight;
            } else {
                scrollHeight =  top.document.body.scrollHeight - 147 - 159 - 13 - 47;
                gridHeight = scrollHeight - 73 - 22;
                $(".dataGrid:first").parent().css("height",gridHeight).parent().parent().parent().parent().height(gridHeight + 30);
                parent.document.all("bodyFrame").height = scrollHeight;
            }
            parent.disWaitDisplayForQuery();
        }
        function clickEvent(){
            var url = '<%=basePath%>'+'grid/queryMeasureInfoPage.action?CP_NO=111';
            OpenWin(encodeURI(url),'测点',1050,500);
        }
	</script>
<script type="text/javascript">
//存档
function saveArchives(){
	var rcds = $("input[name='ids']:checked");
	if(rcds.size()!=1){
		MessageBox("请选择一条记录！");
		return;
	}
	var consNo = $(rcds[0]).parent().parent().children("td:eq(13)").text();
	var consName = $(rcds[0]).parent().parent().children("td:eq(14)").attr("title");
	if(isNullOrEmpty(consName)){
		consName = $(rcds[0]).parent().parent().children("td:eq(14)").text().trim();
	}
	var elecAddr = $(rcds[0]).parent().parent().children("td:eq(19)").attr("title");
	if(isNullOrEmpty(elecAddr)){
		elecAddr = $(rcds[0]).parent().parent().children("td:eq(19)").text().trim();
	}
	var url = "<%=basePath%>pages/basicApp/gliConsManage/gliCons/saveArchives.jsp";
	url += "?orgName="+encodeURIComponent(rcds.val().split(',')[5])+"&consNo="+consNo+"&consName="+encodeURIComponent(consName)+"&elecAddr="+encodeURIComponent(elecAddr)+"&cpNo="+rcds.val().split(',')[2]+"&consId="+rcds.val().split(',')[4];
	OpenWin(url,'网荷互动终端档案存档',1000,700);
}
//查看操作日志
function chkOperateLog(){
	var rcds = $("input[name='ids']:checked");
	if(rcds.size()!=1){
		MessageBox("请选择一条记录！");
		return;
	}
	var url = "<%=basePath%>grid/initChkOperateLog.action?cpNo="+rcds.val().split(',')[2];
	OpenWin(url,'网荷互动建档查看操作日志',1000,550);
}
//置为调试状态
function setDebug(){
	var rcds = $("input[name='ids']:checked");
	if(rcds.size()!=1){
		MessageBox("请选择一条记录！");
		return;
	}
	if(rcds.val().split(',')[1]!='01'){
		MessageBox("当终端状态是运行时，才可以置为调试！");
		return;
	}
	var params = "queryPara.cpNo="+rcds.val().split(',')[2]+"&queryPara.terminalId="+rcds.val().split(',')[0]
				+"&queryPara.beforeState=01&queryPara.deptNo="+rcds.val().split(',')[3]
				+"&queryPara.assetNo="+$(rcds[0]).parent().parent().children("td:eq(3)").text().trim();
	MessageBox("确定要置为调试状态吗？","系统提示",Q_ICON,MB_YESNO,function(rsl){
		if(rsl==MB_YES){
			parent.showWaitDisplayForQuery('<%=basePath%>', "正在设置..."); 
			var url="<%=basePath%>grid/gridConsNoAction!updateTmnlDebugStatus.action";
			$.ajax({
				 url : url,
		         type: "post",
		         data : params,
		         dataType:"json",
		         timeout:60000,
		         cache:false,
		         success:function(json){
					 parent.disWaitDisplayForQuery();
					 if(json.flag=='suc'){
						 MessageBox("终端置为调试状态成功！","系统提示","INFO",MB_OK,function(){
							 refreshPage();
						 });
					 }
				 },
				 error:function(){
					 parent.disWaitDisplayForQuery();
				 }
			});
		}
	}); 	
}
//重置计算状态
function setCalcFlag(calcFlag){
	var rcds = $("input[name='ids']:checked");
	if(rcds.size()!=1){
		MessageBox("请选择一条记录！");
		return;
	}
	var calcMessage;
	var calsSucMessage;
	if(calcFlag == 1){
		calcMessage = "确定要置为参与计算状态吗？";
		calsSucMessage = "终端置为参与计算状态成功！";
	} else{
		calcMessage = "确定要置为不参与计算状态吗？";
		calsSucMessage = "终端置为不参与计算状态成功！";
	}
	var params = "queryPara.cpNo="+rcds.val().split(',')[2]+"&queryPara.terminalId="+rcds.val().split(',')[0] + "&queryPara.calcFlag=" + calcFlag;
	MessageBox(calcMessage,"系统提示",Q_ICON,MB_YESNO,function(rsl){
		if(rsl==MB_YES){
			parent.showWaitDisplayForQuery('<%=basePath%>', "正在设置..."); 
			var url="<%=basePath%>grid/gridConsNoAction!updateSFTmnlCalcFlag.action";
			$.ajax({
				 url : url,
		         type: "post",
		         data : params,
		         dataType:"json",
		         timeout:60000,
		         cache:false,
		         success:function(json){
					 parent.disWaitDisplayForQuery();
					 if(json.flag=='suc'){
						 MessageBox(calsSucMessage,"系统提示","INFO",MB_OK,function(){
							 refreshPage();
						 });
					 }
				 },
				 error:function(){
					 parent.disWaitDisplayForQuery();
				 }
			});
		}
	}); 	
}

//刷新页面
function refreshPage() {
	parent.showWaitDisplayForQuery('<%=basePath%>'); 
	var condition='';
	if(document.thisform.condition.value!=''){
	   condition=encodeURIComponent(document.thisform.condition.value);
	   condition=condition.replaceAll('%3D','=');
	   condition=condition.replaceAll('%26','&');
	   condition=condition;
	}
	if(condition && condition.length>400){
		var fieldArray = condition.split('&');
		if(fieldArray && fieldArray.length>0){
			var addInnerHTML = '';
			for(var f=0;f<fieldArray.length;f++){
				var fieldValue = fieldArray[f].split('=')
				addInnerHTML+= "<input type=hidden name="+fieldValue[0]+" value="+decodeURIComponent(fieldValue[1])+">"
			}
			document.thisform.innerHTML+= addInnerHTML;
		}
		document.thisform.action="<%=basePath%>grid/queryConsList.action";
	}else{
		document.thisform.action="<%=basePath%>grid/queryConsList.action?"+condition;
	}
	document.thisform.submit();
}
//同步跳闸矩阵数据
function synCfg(){
	MessageBox("确认要同步跳闸矩阵配置数据？","系统提示",Q_ICON,MB_YESNO,function(rsl){
		if(rsl==MB_YES){
			$.ajax({
		        type: "post",
				url : "<%=basePath%>grid/gridConsAction!synCfg.action",
		        data : "",
		        dataType:'json',
		        cache:false,
		        success: function(json){
		        	if(json.flag==1){
		        		MessageBox("同步跳闸矩阵配置数据完成！");
		        	}else{
		        		MessageBox(json.msg);
		        	}
		        },
		        error: function(XMLHttpRequest, textStatus, errorThrown){
		        	MessageBox("系统发生未知错误！");
		        }
			});
		}
	});
}
</script>
<script type="text/javascript">
    function lineInfoInput(){
        var url = "<%=basePath%>pages/basicApp/gliConsManage/gliCons/importLineInfo.jsp" ;
        var result = OpenModalDialog(encodeURI(url),"",500,300); 
    }
</script>
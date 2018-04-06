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
        <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	    <script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
	    <base href="<%=basePath%>">
		<title>终端基本信息</title>
		<script type="text/javascript">
			 var basePath = '<%=basePath%>';
			 var terminalId = '${queryPara.terminalId}';
			 var consId = '${queryPara.consId}';
		</script>
	</head>
    <body srolling='no' style="padding-left: 2px;">
		   <div id='view1' style="width: 100%; height: 150px;">
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
								<fieldset
									style="padding: 5px 5px 5px 5px; background-color: #fff;">
									<legend>
										<font style="font-size: 12px; font-weight: bold;">终端档案</font>
									</legend>
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												终端资产号

											</td>
											<td width="25%">
												<input type="text" size="18" id="cons_no" readonly="readonly" class="easyui-textbox" value="${resultMap.TMNL_ASSET_NO}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       终端型号
                                            </td>
                                            <td width="25%">
												 <input type="text" size="18" id="cons_name" readonly="readonly" class="easyui-textbox" value="${resultMap.TERMINAL_KIND_NAME}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       所属单位
                                            </td>
                                            <td width="25%" id="tmnlId1">
                                                 <input type="text" size="18" id="org_name" readonly="readonly" class="easyui-textbox" value="${resultMap.ORG_NAME}">
                                            </td>
										</tr>
										<tr>
                                            <td class="td-label" align="right" nowrap="nowrap">
												运行状态
											</td>
											<td width="25%">
					                            <input type="text" size="18" id="contract_cap" readonly="readonly" class="easyui-textbox" value="${resultMap.RUN_STATUS}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       终端厂家
                                            </td>
                                            <td width="25%">
                                            	<input type="text" size="18" id="contact_name" readonly="readonly" class="easyui-textbox" value="${resultMap.FACTORY_CODE_NAME}">
                                            </td>
                                            <td class="td-label" align="right" nowrap="nowrap">
												施工单位
											</td>
											<td width="25%">
												<input type="text" size="18" id="telephone" readonly="readonly" class="easyui-textbox" value="${resultMap.CONSTRT_UNIT}">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												投运日期
											</td>
											<td>
												<input type="text" size="18" id="volt_code_name" readonly="readonly" class="easyui-textbox" value="${resultMap.RUN_DATE}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       终端 IP
                                            </td>
                                            <td width="25%">
                                            	<input type="text" size="18" id="contact_name" readonly="readonly" class="easyui-textbox" value="${resultMap.CTRL_IP}">
                                            </td>
                                            <td class="td-label" align="right" nowrap="nowrap">
												主程序版本号
											</td>
											<td width="25%">
												<input type="text" size="18" id="telephone" readonly="readonly" class="easyui-textbox" value="${resultMap.MAIN_VERSION}">
											</td>
										</tr>
									</table>
								</fieldset>
							</td>
						</tr>
					</tbody>
				</table>
             </div>
            <div id='view2' style="width: 100%;" >
	             <div id="cxTab" class="easyui-tabs" style="width:100%;">   
				    <!-- <div title="线路实时数据" id="xlsssj" style="display:none;">  
				    	<div id="view3">   
				        	<iframe id="xlsssjFrame" selected="true" width="100%" height="100%" frameborder="0" scrolling="no"></iframe> 
				        </div>
				    </div>   
				    <div title="测点实时数据" id="cdsssj" style="display:none;">  
				    	<div id="view4">  
				        	<iframe id="cdsssjFrame" width="100%" height="100%" frameborder="0" scrolling="no"></iframe> 
				        </div>
				    </div>   
				    <div title="进出线数据"  id="jcxsj" style="display:none;"> 
				    	<div id="view5">    
				        	<iframe id="jcxsjFrame" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
				        </div>
				    </div>   --> 
				     <div title="测点实时数据" id="cdsssj" style="display:none;">  
				    	<div id="view4">  
				        	<iframe id="cdsssjFrame" width="100%" height="100%" frameborder="0" scrolling="no"></iframe> 
				        </div>
				    </div>   
				</div> 
			</div>
	</body>
	<script type="text/javascript">
		 //初始化方法
           $(document).ready(function(){
         	  screen();
         	  var mainHeight = parseInt(parent.Ext.getBody().getHeight())-155;
         	  var hheight = mainHeight/2;
              //$('#cxTab').tabs({    
				   // border:false,    
				  //  onSelect:function(title,index){    
				  //      if(index == 0){
				    //    	document.getElementById("xlsssjFrame").src = basePath+"pages/areaEnergy/consDataCentre/xlsssjTAB.jsp?terminalId="+terminalId+"&hheight="+hheight;
				   //     }else if(index == 1){
				   //     	document.getElementById("cdsssjFrame").src = basePath+"pages/areaEnergy/consDataCentre/cdsssjTAB.jsp?terminalId="+terminalId+"&hheight="+hheight;
				   //     }else if(index == 2){
				   //     	document.getElementById("jcxsjFrame").src = basePath+"pages/areaEnergy/consDataCentre/jcxsjTAB.jsp?terminalId="+terminalId+"&hheight="+hheight;
				    //    }
				   // }    
			  //}); 
			  //默认显示 
              document.getElementById("cdsssjFrame").src = basePath+"pages/areaEnergy/consDataCentre/cdsssjTABForT.jsp?consId="+consId+"&terminalId="+terminalId+"&hheight="+hheight;
		 });
		  $(window).resize(function () {
			screen();
		 });
		 
		 function screen(){
		 	dh = parent.$("body").height();
			$("#view2").height(dh-$("#view1").height());
			//$("#view3").height($("#view2").height()-30);
			$("#view4").height($("#view2").height()-30);
			//$("#view5").height($("#view2").height()-30);
		 }
	</script>
</html>
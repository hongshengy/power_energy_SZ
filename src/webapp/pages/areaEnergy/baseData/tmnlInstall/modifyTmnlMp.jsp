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
		<title>测点信息修改</title>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;margin-top: 0;">
            <div class="easyui-panel" title="测点信息修改" style="width:100%;padding:5px 10px;">
            <form id="thisform" name="thisform" target="" method="post">
            	<input type="hidden" id="mpId" name="queryPara.mpId" value="${resultMap.MP_ID}"/>
                <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
									<table width="100%" cellspacing="8px" cellpadding="0" border="0">
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												测点名称
											</td>
											<td colspan="3">
												<input type="text" size="38" id="mpName" name="queryPara.mpName" 
													value="${resultMap.MP_NAME}"  class="easyui-textbox">
													<font color="red">&nbsp;&nbsp;*</font>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												采集地址码
											</td>
											<td colspan="3">
												<input type="text" size="38" id="collAddr" name="queryPara.collAddr" 
													value="${resultMap.COLL_ADDR}"  class="easyui-textbox">
													<font color="red">&nbsp;&nbsp;*</font>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												正常范围
											</td>
											<td>
												<input type="text" size="6" id="normalUp" name="queryPara.normalUp"  class="easyui-textbox" value="${resultMap.NORMAL_UP}">
												<font>（上限）</font>
											</td>
											<td class="td-label" align="left" nowrap="nowrap">
												<input type="text" size="6" id="normalDown" name="queryPara.normalDown"  class="easyui-textbox" value="${resultMap.NORMAL_DOWN}">
												<font>（下限）</font>
												<font color="red">&nbsp;&nbsp;&nbsp;*</font>
											</td>
											<td>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												告警阀值
											</td>
											<td>
												<input type="text" size="6" id="waringUp" name="queryPara.waringUp"  class="easyui-textbox" value="${resultMap.WARING_UP}">
												<font>（上限）</font>
											</td>
											<td class="td-label" align="left" nowrap="nowrap">
												<input type="text" size="6" id="waringDown" name="queryPara.waringDown"  class="easyui-textbox" value="${resultMap.WARING_DOWN}">
												<font>（下限）</font>
											</td>
											<td>
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												采集系数
											</td>
											<td>
												<input type="text" size="15" id="ratio" name="queryPara.ratio"  class="easyui-textbox" value="${resultMap.RATIO}">
											</td>
											<td align="left" nowrap="nowrap" class="td-label">
												是否有效
												<select id="validFlag" name="queryPara.validFlag" class="easyui-combobox">
					                              	<option value="">请选择</option>
					                                <option value="1">是</option>
					                                <option value="0">否</option>
					                            </select>
					                            <font color="red">&nbsp;&nbsp;*</font>
											</td>
											<td>
											</td>
										</tr>
									</table>
							</td>
						</tr>
					</tbody>
				</table>
				</form>
                <div id="saveBtn" style="padding: 5px; text-align: center;">
               		<table width="100%" cellspacing="2px" cellpadding="10px" border="0">
               			<tr>
               				<td align="right">
                    			 <button class="easyui-linkbutton c1" onclick="saveTmnlInfo();" style="width:70px;">保存</button>
                    		</td>
               				<td align="left">
                    			 <button class="easyui-linkbutton c1" onclick="javascript:window.close();" style="width:70px;">取消</button>
                    		</td>
                    	</tr>
                    </table>
               </div>
            </div>
        </div>
	    
	     
	</body>
	<script type="text/javascript">
		$(function() { 
			//下拉框赋值
			$("#validFlag").combobox("setValue",'${resultMap.VALID_FLAG}');
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
		
		function saveTmnlInfo() {
			if(1==1){
				$.messager.confirm('确认','确认想要修改测点信息吗？',function(r) {
					if (r) {
						$.messager.progress();
						$('#thisform').form('submit',{
						url :'<%=basePath%>areaEnergy/saveTmnlMpInfo.action',    
					    success:function(res){    
					    	 $.messager.progress('close');
					        if (res != "" && res != null) {
			                	if(res == "updateError"){
			                		$.messager.confirm('确认','数据库异常，终端修改失败！');
			                	}else if(res == "ok"){
			                		$.messager.confirm('确认','测点修改成功!',function(){
			                			window.close();
			                			opener.queryList1();
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
	</script>    
</html>
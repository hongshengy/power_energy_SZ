<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
	<head>
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<base href="<%=basePath%>">
		<title>其他设备信息</title>
		<script type="text/javascript" src="<%=basePath%>/pages/areaEnergy/baseData/userSubstation/DateSwitch.js"></script>
		<script type="text/javascript">
			 var basePath = '<%=basePath%>';
			 var subId = '${queryPara.subId}';
			 var Id = '${queryPara.id}';
			 var other = '${queryPara.other}';
			 var isdevice = '${queryPara.isdevice}'
		</script>
		<style type="text/css">
		html,body {
			height: 100%;
		}
		</style>
	</head>
	<body>
		<div id='view1' style="width: 100%;">
			<table style="width: 100%;">
				<tbody>
					<tr>
						<td style="padding: 5px;" width="100%">
							<fieldset
								style="padding: 5px 5px 5px 5px; background-color: #fff;">
								<legend>
									<font style="font-size: 12px; font-weight: bold;">照明设备</font>
								</legend>
								<table width="100%" cellspacing="8px" cellpadding="0" border="0">
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											设备编号 
										</td>
										<td width="25%">
											<input type="text" size="18" id="cons_no" readonly="readonly"
												class="easyui-textbox" value="${resultMap.DEVICE_NO}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											设备名称
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.DEVICE_NAME}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											设备分类
										</td>
										<td width="25%" id="tmnlId1">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.DEVICE_TYPE}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											设备厂家
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.FACTORY_CODE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											出厂日期
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.MADE_DATE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											运行状态
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.RUN_STATUS}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											安装日期
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.CREATE_DATE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											是否电气设备
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.IS_DEVICE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											所属终端
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.TMNL_ASSET_NO}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											是否有效
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.VALID_FLAG}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											设备种类
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.DEVICE_KIND}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											出厂序号
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.OUT_FACTORY_SEQ}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											制造年月
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.MANUFACT_DATE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											产品型号
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.PRODUCT_KIND}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											执行标准
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.EXCUTE_STANDARD}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											尺寸
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.S_SIZE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											额定电压
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.STANDARD_VOLT_H}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											额定电流
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.STANDARD_CURRENT_H}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											光通量
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.LIGHT_FLUX}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											数量
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.QUANTITY}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											使用光源
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.LIGHT_SOUECE}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											额定功率
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.STANDARD_POWER}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											功率因数
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.POWER_FACTORS}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											光效
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.SUNLIGHT}">
										</td>
									</tr>
									<tr>
										<td colspan="6" align="center" nowrap="nowrap">
											<a id="" group="" class="l-btn l-btn-small l-btn-plain" href="javascript:queryAll('A');"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon accordion-collapse">&nbsp;</span></span></a>
											
										</td>
									</tr>
								</table>
							</fieldset>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div id='view1a' style="width: 100%;">
			<table style="width: 100%;">
				<tbody>
					<tr>
						<td style="padding: 5px;" width="100%">
							<fieldset
								style="padding: 5px 5px 5px 5px; background-color: #fff;">
								<legend>
									<font style="font-size: 12px; font-weight: bold;">照明设备</font>
								</legend>
								<table width="100%" cellspacing="8px" cellpadding="0" border="0">
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											设备编号 
										</td>
										<td width="25%">
											<input type="text" size="18" id="cons_no" readonly="readonly"
												class="easyui-textbox" value="${resultMap.DEVICE_NO}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											设备名称
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.DEVICE_NAME}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											设备分类
										</td>
										<td width="25%" id="tmnlId1">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.DEVICE_TYPE}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											设备厂家
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.FACTORY_CODE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											出厂日期
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.MADE_DATE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											运行状态
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.RUN_STATUS}">
										</td>
									</tr>
									<tr>
										<td colspan="6" align="center" nowrap="nowrap">
											<a id="" group="" class="l-btn l-btn-small l-btn-plain" href="javascript:queryAll('B');"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text l-btn-empty">&nbsp;</span><span class="l-btn-icon accordion-expand">&nbsp;</span></span></a>
											
										</td>
									</tr>
								</table>
							</fieldset>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div id='view2' style="height: 50px;">
			<table>
				<tr>
					<td style="padding-left: 20px;">
						设备名称
					</td>
					<td width="200px;">
							<c:if test="${queryPara.other==1}">
								<select id="searchmc" class="easyui-combobox" style="width: 155px;" editable="false">
							</c:if>
							<c:if test="${queryPara.other==0}">
								<select id="searchmc" class="easyui-combobox" style="width: 155px;" readonly="readonly" editable="false">
							</c:if>
							<c:forEach var="data" items="${codemodel}" varStatus="sta"
								step="1">
								<c:choose>
									<c:when test="${data.codeVal==queryPara.id}">
										<option value="${data.codeVal}" selected="selected">${data.codeName}</option>
									</c:when>
									<c:otherwise>
										<option value="${data.codeVal}">${data.codeName}</option>
									</c:otherwise>
								</c:choose>
							</c:forEach>
						</select>
					</td>
					<td>
						<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="cursor: pointer;" onclick="querys(1)">
					</td>
					<td>
						<input id="sjrq" type="text" class="easyui-datebox"
							value="${resultMap.SYSDATE}" />
					</td>
					<td>
						 <img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="cursor: pointer;" onclick="querys(2)">
					</td>
					<td>
						 <select id="station" class="easyui-combobox" style="width: 80px;" editable="false">
						 	 <c:forEach var="data" items="${resultMap.STATION}" varStatus="sta" step="1">
							 	<c:if test="${data.codeVal==288}">
									<option value="${data.codeVal}" selected="selected">${data.codeName}</option>
								</c:if>
								<c:if test="${data.codeVal!=288}">
									<option value="${data.codeVal}" >${data.codeName}</option>
								</c:if>
							 </c:forEach>
						 </select>
					</td>
					<td style="width: 100px;" align="right">
						<button class="easyui-linkbutton c1" onclick="querys(0)"
							style="width: 70px; margin-right: 20px;">
							查询
						</button>
					</td>
				</tr>
			</table>
		</div>
		<div id='view3' style="width: 100%;" >
			<div id="cxTab" class="easyui-tabs" style="width:100%;">   
			    <c:forEach var="data" items="${tabList}" varStatus="sta" step="1">
				 	    <div id="${data.TAB_SIGN}" title="${data.TAB_NAME}" style="display:none;">
					    	<div id="view${sta.index+4}">   
					        	<iframe id="Frame${sta.index+4}" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>   
					        </div>
					    </div>   
				 </c:forEach>
			</div> 
		</div>
	</body>
	<script type="text/javascript">
		 //初始化方法
        $(document).ready(function(){
        	document.getElementById('view1a').style.display  = 'block';  
        	document.getElementById('view1').style.display  = 'none'; 
			var device = $("#searchmc").val();
         	var searchrq = $("#sjrq").val();
         	var station = $("#station").val();
         	var tabSign = $('#view4').parent().attr('id');
        	//默认显示 
            document.getElementById("Frame4").src = basePath+"pages/areaEnergy/baseData/illumination/illuminationTab.jsp?device="+device+"&data="+searchrq+"&station="+station+"&tabSign="+tabSign;
            //下拉框触发改变事件
			$("#searchmc").combobox({
				onChange:function(newValue,oldValue){
					parent.document.getElementById("rightFrame").src = basePath+"areaEnergy/queryIllumNation1.action?queryPara.subId="+subId+"&queryPara.id="+newValue+"&queryPara.other="+other+"&queryPara.isdevice="+isdevice;
				} 
			});
        	screen();
		 });
		 function queryAll(flag){
		 	if(flag == 'A'){
		 		document.getElementById('view1a').style.display  = 'block';  
	        	document.getElementById('view1').style.display  = 'none'; 
	        	screen();
		 	}else{
		 		document.getElementById('view1').style.display  = 'block';  
	        	document.getElementById('view1a').style.display  = 'none'; 
	        	screen();
		 	}
		 }
		 $(window).resize(function () {
			screen();
		 });
		 
		 function screen(){
		 	dh = $("body").height();
			$("#view3").height(dh-$("#view1a").height()-$("#view2").height());
			$("#view4").height($("#view3").height()-30);
		 }
		 
		  //点击查询按钮
		 function querys(tab){
			dataswitch("sjrq",$("#sjrq").val(),tab);
		 }
		 //查询回调
		 function query(data){
			document.getElementById("Frame4").contentWindow.querySource(data);
		 }
		 
	</script>
</html>
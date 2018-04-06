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
		<title>环境设备</title>
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
									<font style="font-size: 12px; font-weight: bold;">环境设备</font>
								</legend>
								<table width="100%" cellspacing="8px" cellpadding="0" border="0">
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											设备编号
										</td>
										<td width="25%">
											<input type="text" size="18" id="cons_no" readonly="readonly"
												class="easyui-textbox" value="${resultMap.BH}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											设备名称
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.MC}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											设备分类
										</td>
										<td width="25%" id="tmnlId1">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.FL}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											运行状态
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.ZT}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											生产厂家
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.CJ}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											出厂日期
										</td>
										<td width="25%">
											<input type="text" size="18" readonly="readonly"
												class="easyui-textbox" value="${resultMap.RQ}">
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
						<td id="cdTd1" style="padding-left: 20px;display: none;width:80px;" nowrap="nowrap">
							
						</td>
						<td id="cdTd2"  style="width:220px;display: none;" nowrap="nowrap">
							测点名称 	<select id="cdlx" class="easyui-combobox"
								style="width: 155px;">
								<c:forEach var="data" items="${codemodel1}" varStatus="sta" step="1">
									
										<c:if test="${not empty queryPara.sfMpId}">
											<c:choose>
											<c:when test="${data.codeVal==queryPara.sfMpId}">
												<option value="${data.codeVal}" selected="selected">${data.codeName}</option>
											</c:when>
											<c:otherwise>
												<option value="${data.codeVal}">${data.codeName}</option>
											</c:otherwise>
											</c:choose>
										</c:if>
										<c:if test="${empty queryPara.sfMpId}">
										    <c:choose>
											<c:when test="${sta.index==0}">
												<option value="${data.codeVal}" selected="selected">${data.codeName}</option>
											</c:when>
											<c:otherwise>
												<option value="${data.codeVal}">${data.codeName}</option>
											</c:otherwise>
											</c:choose>
										</c:if>
									
								</c:forEach>
							</select>
						</td>
					<td>
						<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="cursor: pointer;" onclick="querys(1)">
					</td>
					<td>
						<input id="searchrq" type="text" class="easyui-datebox"
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
					        	<iframe id="Frame${sta.index}" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>   
					        </div>
					    </div>   
				 </c:forEach>
			</div> 
		</div>
	</body>
	<script type="text/javascript">
		 //初始化方法
        $(document).ready(function(){
        	screen();
			var device = $("#searchmc").val();
         	var searchrq = $("#searchrq").val();
         	var station = $("#station").val();
         	var tabSign = $('#view4').parent().attr('id');
        	//默认显示 
            document.getElementById("Frame0").src = basePath+"pages/areaEnergy/baseData/enviro/tempers.jsp?device="+device+"&data="+searchrq+"&station="+station+"&tabSign="+tabSign;
            //下拉框触发改变事件
			$("#searchmc").combobox({
				onChange:function(newValue,oldValue){
					parent.document.getElementById("rightFrame").src = basePath+"areaEnergy/queryEnviromentalnuit.action?queryPara.subId="+subId+"&queryPara.id="+newValue+"&queryPara.other="+other+"&queryPara.isdevice="+isdevice;
				} 
			});
			
			//tab切换
            $('#cxTab').tabs({    
		    border:false,    
		    onSelect:function(title,index){ 
		    	var searchrq = $("#searchrq").val(); 
		    	var station = $("#station").val(); 
		    	var num= parseInt(index)+4
			    var tabSign = $('#view'+num).parent().attr('id'); 
		        if(index == 0){
		        	$('#cdTd1').attr('style','display: none;')
		        	$('#cdTd2').attr('style','display: none;')
		        	document.getElementById("Frame0").src = basePath+"pages/areaEnergy/baseData/enviro/tempers.jsp?device="+device+"&data="+searchrq+"&station="+station+"&tabSign="+tabSign;
		        }else if(index == 1){
		        	$('#cdTd1').attr('style','display: none;')
		        	$('#cdTd2').attr('style','display: none;')
		        	document.getElementById("Frame1").src = basePath+"pages/areaEnergy/baseData/enviro/humiditys.jsp?device="+device+"&data="+searchrq+"&station="+station+"&tabSign="+tabSign;
		        }else if(index == 2){
		        	$('#cdTd1').attr('style','display: none;')
		        	$('#cdTd2').attr('style','display: none;')
		        	document.getElementById("Frame2").src = basePath+"pages/areaEnergy/baseData/enviro/waterSensor.jsp?device="+device+"&data="+searchrq+"&station="+station+"&tabSign="+tabSign;
		        }else if(index == 3){
		        	$('#cdTd1').attr('style','display: none;')
		        	$('#cdTd2').attr('style','display: none;')
		        	document.getElementById("Frame3").src = basePath+"pages/areaEnergy/baseData/enviro/somkeDetector.jsp?device="+device+"&data="+searchrq+"&station="+station+"&tabSign="+tabSign;
		        }else if(index == 4){
		        	$('#cdTd1').attr('style','padding-left:20px;display:block;width:80px;');
		        	$('#cdTd2').attr('style','display:block;width:220px;');
		        	var mpId = $("#cdlx").val();
		        	document.getElementById("Frame4").src = basePath+"pages/areaEnergy/baseData/enviro/tempers.jsp?index="+index+"&mpId="+mpId+"&device="+device+"&data="+searchrq+"&station="+station+"&tabSign="+tabSign;
		        }
		    }    
	  		}); 
	  		
		 });
		 
		 $(window).resize(function () {
			screen();
		 });
		 
		 function screen(){
		 	dh = $("body").height();
			$("#view3").height(dh-$("#view1").height()-$("#view2").height());
			$("#view4").height($("#view3").height()-30);
			$("#view5").height($("#view3").height()-30);
			$("#view6").height($("#view3").height()-30);
			$("#view7").height($("#view3").height()-30);
			$("#view8").height($("#view3").height()-30);
			
		 }
		 
		  //点击查询按钮
		 function querys(tab){
			dataswitch("searchrq",$("#searchrq").val(),tab);
		 }
		 //查询回调
		 function query(data){
			var tab = $("#cxTab").tabs("getSelected");
			var index = $("#cxTab").tabs("getTabIndex",tab);
			var mpId = $("#cdlx").val();
			if(index==0){
				document.getElementById("Frame0").contentWindow.querySource(data);
			}else if(index==1){
				document.getElementById("Frame1").contentWindow.querySource(data);
			}else if(index==2){
				document.getElementById("Frame2").contentWindow.querySource(data);
			}else if(index==3){
				document.getElementById("Frame3").contentWindow.querySource(data);
			}else if(index==4){
				document.getElementById("Frame4").contentWindow.querySource1(data);
			}
		 }
		 
	</script>
</html>
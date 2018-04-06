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
		<script type="text/javascript" src="<%=basePath%>/pages/areaEnergy/baseData/userSubstation/DateSwitch.js"></script>
		<base href="<%=basePath%>">
		<title>线路信息</title>
		<script type="text/javascript">
			 var basePath = '<%=basePath%>';
			 
			 var countNum = <%=request.getAttribute("countNum")%>
			 var COUNTNUMNEW = <%=request.getAttribute("COUNTNUMNEW")%>
		</script>
		<style type="text/css">
		html,body {
			height: 100%;sss
		}
		</style>
	</head>
	<body>
	<input type="hidden" value="${COUNTNUMNEW }" id="COUNTNUMNEW" />
	<input type="hidden" value="${countNum }" id="countNumText" />
		<div id='view1' style="width: 100%;">
			<table style="width: 100%;">
				<tbody>
					<tr>
						<td style="padding: 5px;" width="100%">
							<fieldset
								style="padding: 5px 5px 5px 5px; background-color: #fff;">
								<legend>
									<font style="font-size: 12px; font-weight: bold;"><c:if test="${queryPara.type == 'POWERDEVICE' || queryPara.type == 'POWERDEVICESELF'}">用能设备档案</c:if>
											<c:if test="${queryPara.type == 'LINE' || queryPara.type == 'LINESELF'}">线路档案</c:if></font>
								</legend>
								<table width="100%" cellspacing="8px" cellpadding="0" border="0">
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											<c:if test="${queryPara.type == 'POWERDEVICE' || queryPara.type == 'POWERDEVICESELF'}">用能设备名称</c:if>
											<c:if test="${queryPara.type == 'LINE' || queryPara.type == 'LINESELF'}">线路名称</c:if>
										</td>
										<td width="25%">
											<input type="text" size="18" id="LINE_NAME" readonly="readonly"
												class="easyui-textbox" value="${resultMap.LINE_NAME}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											<c:if test="${queryPara.type == 'POWERDEVICE' || queryPara.type == 'POWERDEVICESELF'}">用能设备类型</c:if>
											<c:if test="${queryPara.type == 'LINE' || queryPara.type == 'LINESELF'}">线路类型</c:if>
										</td>
										<td width="25%">
											<input type="text" size="18" id="LINE_TYPE"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.LINE_TYPE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											CT
										</td>
										<td width="25%" id="tmnlId1">
											<input type="text" size="18" id="CT_RATIO"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.CT_RATIO}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											PT
										</td>
										<td width="25%">
											<input type="text" size="18" id="PT_RATIO"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.PT_RATIO}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											所属用户
										</td>
										<td width="25%">
											<input type="text" size="18" id="CONS_NAME"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.CONS_NAME}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											所属母线
										</td>
										<td width="25%">
											<input type="text" size="18" id="BS_NAME"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.BS_NAME}">
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
						<c:if test="${queryPara.type == 'POWERDEVICE' || queryPara.type == 'POWERDEVICESELF'}">用能设备名称</c:if>
						<c:if test="${queryPara.type == 'LINE' || queryPara.type == 'LINESELF'}">线路名称</c:if>
					</td>
					<td width="180px;">
						<select id="searchmc" class="easyui-combobox"
							style="width: 155px;">
							<c:forEach var="data" items="${codemodel}" varStatus="sta"
								step="1">
								<c:choose>
									<c:when test="${data.codeVal==queryPara.lineId1}">
										<option value="${data.codeVal}" selected="selected">${data.codeName}</option>
									</c:when>
									<c:otherwise>
										<option value="${data.codeVal}">${data.codeName}</option>
									</c:otherwise>
								</c:choose>
							</c:forEach>
						</select>
					</td>
					<c:if test="${(queryPara.type == 'LINE' || queryPara.type == 'LINESELF') && (resultMap.LINE_TYPE1 == '08' || resultMap.LINE_TYPE1 == '09'|| resultMap.LINE_TYPE1 == '10') }">
						<td style="padding-left: 20px;">
							测点名称
						</td>
						<td width="180px;">
							<select id="cdlx" class="easyui-combobox"
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
					</c:if>	
					<td>
						数据日期
					</td>
					<td>
						<img  src="<%=basePath%>/images/tools-moveleft.gif" onclick="querys(1)" onmousemove="this.style.cursor='hand'" onmouseout="this.style.cursor='default'"/>
					</td>
					<td width="170px;">
						<input id="sjrq" type="text" class="easyui-datebox"
							value="${resultMap.SYSDATE}" />
					</td>
					<td>
						<img  src="<%=basePath%>/images/tools-moveright.gif" onclick="querys(2)" onmousemove="this.style.cursor='hand'" onmouseout="this.style.cursor='default'"/>
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
					<td>
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
        	var lineType = "${resultMap.LINE_TYPE1}";
        	var mainHeight = parseInt($("#view4").height())+30;
			var lineId = $("#searchmc").val();
         	var searchrq = $("#sjrq").val();
         	var lineId1 = "${queryPara.lineId}";
         	var name = "${queryPara.name}";
         	var type = "${queryPara.type}";
         	var pId = "${queryPara.subId}";
         	var mpType= '1';
        	 $('#cxTab').tabs({    
			    border:false,    
			    onSelect:function(title,index){  
			    	if((type == 'LINE' || type == 'LINESELF')&& (lineType == '08' || lineType == '09'|| lineType == '10')){
			    		var mpId = $("#cdlx").val();
			    		document.getElementById("Frame0").src = basePath+"pages/areaEnergy/consDataCentre/sbcdsjzs.jsp?lineId="+lineId+"&mpId="+mpId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
			    	}else{
			    		var station = $("#station").val();
				    	var num= parseInt(index)+4
				    	var tabSign = $('#view'+num).parent().attr('id');
				        if(index == 0){
				          //方便测试 测试结束 还原  countNum == 1
				  		  if(countNum == 1){
				  			//当建筑ID为7的时候进入的界面 
							document.getElementById("Frame0").src = basePath+"pages/areaEnergy/consDataCentre/subType/xlsj.jsp?subId="+pId+"&lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign;
				  		  }else{
				        	document.getElementById("Frame0").src = basePath+"pages/areaEnergy/consDataCentre/xlsj.jsp?subId="+pId+"&lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign;
				  		  }
				        }else if(index == 1){
				        	document.getElementById("Frame1").src = basePath+"pages/areaEnergy/consDataCentre/ygglqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
				        }else if(index == 2){
				        	document.getElementById("Frame2").src = basePath+"pages/areaEnergy/consDataCentre/wgglqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
				        }else if(index == 3){
				        	document.getElementById("Frame3").src = basePath+"pages/areaEnergy/consDataCentre/glysqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
				        }else if(index == 4){
				        	document.getElementById("Frame4").src = basePath+"pages/areaEnergy/consDataCentre/dlqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
				        }else if(index == 5){
				        	document.getElementById("Frame5").src = basePath+"pages/areaEnergy/consDataCentre/ssqxTAB.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
				        }else if(index == 6){
				        	document.getElementById("Frame6").src =  basePath+"pages/areaEnergy/consDataCentre/xlcdsssjTAB.jsp?subId="+pId+"&lineId="+lineId+"&mpType="+mpType+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign;
				        }
			    	}
			    	
			    }    
		  }); 
		  	//默认显示 
		  	if((type == 'LINE' || type == 'LINESELF')&& (lineType == '08' || lineType == '09'|| lineType == '10')){
			  		var mpId = $("#cdlx").val();
			  		document.getElementById("Frame0").src = basePath+"pages/areaEnergy/consDataCentre/sbcdsjzs.jsp?lineId="+lineId+"&mpId="+mpId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
		  	}else{
		  		//方便测试 测试结束 还原  countNum == 1
			  	if(countNum == 1){
				  //当建筑ID为7的时候进入的界面
				  var tabSign = $('#view4').parent().attr('id');
				  document.getElementById("Frame0").src = basePath+"pages/areaEnergy/consDataCentre/subType/xlsj.jsp?subId="+pId+"&lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign;
			  	}else{
			  	  var tabSign = $('#view4').parent().attr('id');
		          document.getElementById("Frame0").src = basePath+"pages/areaEnergy/consDataCentre/xlsj.jsp?subId="+pId+"&lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign;
			  	}
		  	}
            //下拉框触发改变事件
			$("#searchmc").combobox({
				onChange:function(newValue,oldValue){
					//是建筑。设备。还是线路
				    var codeType = '03';
					parent.document.getElementById("rightFrame").src = basePath+"areaEnergy/queryLineAtion.action?queryPara.lineId="
															+newValue+"&queryPara.type="+type+"&queryPara.subId="+pId+"&queryPara.lineId1="+newValue+"&queryPara.codeType="+codeType+"&queryPara.lineFlag=XL";
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
			$("#view9").height($("#view3").height()-30);
			$("#view10").height($("#view3").height()-30);
		 }
		 
		  //点击查询按钮
		 function querys(tab){
			dataswitch("sjrq",$("#sjrq").val(),tab);
		 }
		 //查询回调
		 function query(data){
		 	var lineType = "${resultMap.LINE_TYPE1}";
		 	var type = "${queryPara.type}";
			var tab = $("#cxTab").tabs("getSelected");
			var index = $("#cxTab").tabs("getTabIndex",tab);
			var mainHeight = parseInt($("#view4").height())+30;
			var lineId = $("#searchmc").val();
         	var searchrq = $("#sjrq").val();
         	var pId = "${queryPara.subId}";
         	var mpType= '1';
         	var station = $("#station").val();
			var num= parseInt(index)+4
			var tabSign = $('#view'+num).parent().attr('id');
			if((type == 'LINE' || type == 'LINESELF')&& (lineType == '08' || lineType == '09'|| lineType == '10')){
				var mpId = $("#cdlx").val();
	    		document.getElementById("Frame0").src = basePath+"pages/areaEnergy/consDataCentre/sbcdsjzs.jsp?lineId="+lineId+"&mpId="+mpId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
	    	}else{
				if(index == 0){
					//方便测试 测试结束 还原  countNum == 1
		  		  	if(countNum == 1){
		  				//当建筑ID为7的时候进入的界面
		  		  		document.getElementById("Frame0").src = basePath+"pages/areaEnergy/consDataCentre/subType/xlsj.jsp?subId="+pId+"&lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign;
		  		  	}else{
			        	document.getElementById("Frame0").src = basePath+"pages/areaEnergy/consDataCentre/xlsj.jsp?subId="+pId+"&lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign;
		  		  	}
		        }else if(index == 1){
		        	document.getElementById("Frame1").src = basePath+"pages/areaEnergy/consDataCentre/ygglqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
		        }else if(index == 2){
		        	document.getElementById("Frame2").src = basePath+"pages/areaEnergy/consDataCentre/wgglqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
		        }else if(index == 3){
		        	document.getElementById("Frame3").src = basePath+"pages/areaEnergy/consDataCentre/glysqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
		        }else if(index == 4){
		        	document.getElementById("Frame4").src = basePath+"pages/areaEnergy/consDataCentre/dlqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
		        }else if(index == 5){
				    document.getElementById("Frame5").src = basePath+"pages/areaEnergy/consDataCentre/ssqxTAB.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
				}else if(index == 6){
					document.getElementById("Frame6").src =  basePath+"pages/areaEnergy/consDataCentre/xlcdsssjTAB.jsp?subId="+pId+"&lineId="+lineId+"&mpType="+mpType+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign;
				}
			}
		 }
		 
	</script>
</html>
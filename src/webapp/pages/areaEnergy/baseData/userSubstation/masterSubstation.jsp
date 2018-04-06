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
		<title>终端基本信息</title>
		<script type="text/javascript" src="<%=basePath%>/pages/areaEnergy/baseData/userSubstation/DateSwitch.js"></script>
		<script type="text/javascript">
			 var basePath = '<%=basePath%>';
			 var subId = '${queryPara.subId}';
			 var tranId = '${queryPara.tranId}';
			 var other = '${queryPara.other}';
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
									<font style="font-size: 12px; font-weight: bold;">变压器档案</font>
								</legend>
								<table width="100%" cellspacing="8px" cellpadding="0" border="0">
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											变压器编号
										</td>
										<td width="25%">
											<input type="text" size="18" id="cons_no" readonly="readonly"
												class="easyui-textbox" value="${resultMap.BH}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											变压器名称
										</td>
										<td width="25%">
											<input type="text" size="18" id="cons_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.MC}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											变压器型号
										</td>
										<td width="25%" id="tmnlId1">
											<input type="text" size="18" id="org_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.XH}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											铭牌容量
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.RL}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											电压等级
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.DJ}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											生产厂家
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.CJ}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											运行状态
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.ZT}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											安装日期
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.RQ}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											安装地址
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.DZ}">
										</td>
									</tr>
								</table>
							</fieldset>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div id='view2' style="height: 50px;width: 900px">
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
							<c:forEach var="data" items="${codemodel}" varStatus="sta" step="1">
								<c:choose>
									<c:when test="${data.codeVal==queryPara.tranId}">
										<option value="${data.codeVal}" selected="selected">${data.codeName}</option>
									</c:when>
									<c:otherwise>
										<option value="${data.codeVal}">${data.codeName}</option>
									</c:otherwise>
								</c:choose>
							</c:forEach>
						</select>
					</td>
					<td id="qtcdTD2">
						其他测点	<input id="qtcd" name="qtcd"  value="">
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
			<div id="cxTab" class="easyui-tabs" style="width:100%;height:auto;" >
				<div title=" 温度曲线">
					<div id="view4">
						<iframe id="jcxsjFrame" selected="true" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
					</div>
				</div>
				<div title="其他测点" id="xlsssj" style="display:none;">  
			    	<div id="view5">   
			        	<iframe id="qtcdFrame"  width="100%" height="100%" frameborder="0" scrolling="no"></iframe> 
			        </div>
			    </div> 
			</div>
		</div>
	</body>
	<script type="text/javascript">
		var queryType = 0;
		 //初始化方法
        $(document).ready(function(){
        	screen();
			var device = $("#searchmc").val();
         	var searchrq = $("#sjrq").val();
         	var station = $("#station").val();
         	$('#qtcdTD2').css('display','none');
         	$('#cxTab').tabs({    
				    border:false,    
				    onSelect:function(title,index){    
				        if(index == 0){
				        	queryType = 0;
         					$('#qtcdTD2').css('display','none');
				        	document.getElementById("jcxsjFrame").src = basePath+"pages/areaEnergy/baseData/userSubstation/oiltemperature.jsp?device="+device+"&data="+searchrq+"&station="+station;
				        }else if(index == 1){
				        	queryType = 1	;
         					$('#qtcdTD2').css('display','block');
         					var tranId = $('#searchmc').combobox("getValue");
				        	$('#qtcd').combobox({
					            url :'<%=basePath%>areaEnergy/selectQTCDbyTran.action?queryPara.tranId='+tranId,
					            valueField:'id',
					            textField:'text',
					            onSelect: function(record){
					            	querys(0);
								},
								onLoadSuccess:function(record){
				            		var qtId = $('#qtcd').combobox("getValue");
									var mpCode = qtId.split('@')[0];
									var mpId = qtId.split('@')[1];
									document.getElementById("qtcdFrame").src = basePath+"pages/areaEnergy/baseData/userSubstation/otherstation.jsp?mpCode="+mpCode+"&mpId="+mpId+"&device="+device+"&station="+station;
								}
					       });
				        }
				    }   
			  }); 
        	//默认显示 
            document.getElementById("jcxsjFrame").src = basePath+"pages/areaEnergy/baseData/userSubstation/oiltemperature.jsp?device="+device+"&data="+searchrq+"&station="+station;
            //下拉框触发改变事件
			$("#searchmc").combobox({
				onChange:function(newValue,oldValue){
					parent.document.getElementById("rightFrame").src = basePath+"areaEnergy/queryMasterSubstation.action?queryPara.subId="+subId+"&queryPara.tranId="+newValue+"&queryPara.other="+other;
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
		 }
		 
		  //点击查询按钮
		 function querys(tab){
			dataswitch("sjrq",$("#sjrq").val(),tab);
		 }
		 //查询回调
		 function query(data){
		 	if(queryType == 0){
				document.getElementById("jcxsjFrame").contentWindow.querySource(data);
			}else{
				var qtId = $('#qtcd').combobox("getValue");
				var mpCode = qtId.split('@')[0];
				var mpId = qtId.split('@')[1];
				document.getElementById("qtcdFrame").contentWindow.querySource(data,mpId,mpCode);
			}
		 }
		 
	</script>
</html>
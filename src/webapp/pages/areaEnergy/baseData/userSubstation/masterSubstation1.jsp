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
											铭牌容量
										</td>
										<td width="25%">
											<input type="text" size="18" id="cons_no" readonly="readonly"
												class="easyui-textbox" value="${resultMap.PLATE_CAP}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											电压等级
										</td>
										<td width="25%">
											<input type="text" size="18" id="cons_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.TRAN_VOLT}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											是否有效
										</td>
										<td width="25%" id="tmnlId1">
											<input type="text" size="18" id="org_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.VALID_FLAG}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											显示序号
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.SHOW_INDEX}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											变压器编号 
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.TRAN_NO}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											变压器型号
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.TRAN_KIND}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											投运日期 
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.CREATE_DATE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											出厂日期 
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.MADE_DATE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											变压器名称
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.TRAN_NAME}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											所属终端
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.TMNL_ASSET_NO}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											生产厂家名称
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.FACTORY_NAME}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											运行状态
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.RUN_STATUS}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											标准代号
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.STANDARD_CODE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											出厂序（编）号
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.OUT_FACTORY_SEQ}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											制造年月（生产日期）
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.MANUFACT_DATE}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											相数
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.EACH_NO}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											重量
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.WEIGHT}">kg
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											绝缘油重量
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.INSULATE_WEGHT}">kg
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											联结组标号
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.UNION_LABEL}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											冷却方式 
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.COOL_WAY}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											额定容量 
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.standard_cap}">kVA
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											短路阻抗实测值
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.IMPEDANCE_VALUE}">%
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											高压额定电压
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.STANDARD_VOLT_H}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											低压额定电压 
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.STANDARD_VOLT_L}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											高压额定电流 
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.STANDARD_CURRENT_H}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											低压额定电流
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.STANDARD_CURRENT_L}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											额定频率 
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.STANDARD_HZ}">Hz
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											短路阻抗
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.SHORT_IMPEDANCE}">%
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											空载损耗 
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.NO_LOAD_LOSS}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											负载损耗 
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.FULL_LOAD_LOSS}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											电压分接位置 
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.ECT_VOLT_LOCAL}">%
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											高压电压电压分接 
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.ECT_VOLT_HV}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											高压电压电流分接 
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.ECT_VOLT_HI}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											低压电压电压分接
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.ECT_VOLT_LV}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											 低压电压电流分接 
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.ECT_VOLT_LI}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											安装地址 
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.INST_ADDR}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											变压器类型
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.TRAN_TYPE}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											
										</td>
										<td width="25%">
											
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											
										</td>
										<td width="25%">
											
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
									<font style="font-size: 12px; font-weight: bold;">变压器档案</font>
								</legend>
								<table width="100%" cellspacing="8px" cellpadding="0" border="0">
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											铭牌容量
										</td>
										<td width="25%">
											<input type="text" size="18" id="cons_no" readonly="readonly"
												class="easyui-textbox" value="${resultMap.PLATE_CAP}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											电压等级
										</td>
										<td width="25%">
											<input type="text" size="18" id="cons_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.TRAN_VOLT}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											是否有效
										</td>
										<td width="25%" id="tmnlId1">
											<input type="text" size="18" id="org_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.VALID_FLAG}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											显示序号
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.SHOW_INDEX}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											变压器编号 
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.TRAN_NO}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											变压器型号
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.TRAN_KIND}">
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
		var queryType = 0;
		 //初始化方法
        $(document).ready(function(){
	        document.getElementById('view1a').style.display  = 'block';  
	        document.getElementById('view1').style.display  = 'none';
        	screen();
			var device = $("#searchmc").val();
         	var searchrq = $("#sjrq").val();
         	var station = $("#station").val();
         	$('#qtcdTD2').css('display','none');
         	$('#cxTab').tabs({    
				    border:false,    
				    onSelect:function(title,index){
				    	var num= parseInt(index)+4
			    	    var tabSign = $('#view'+num).parent().attr('id');    
				        if(index == 0){
				        	queryType = 0;
         					$('#qtcdTD2').css('display','none');
				        	document.getElementById("Frame4").src = basePath+"pages/areaEnergy/baseData/userSubstation/oiltemperature.jsp?device="+device+"&data="+searchrq+"&station="+station+"&tabSign="+tabSign;
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
									document.getElementById("Frame5").src = basePath+"pages/areaEnergy/baseData/userSubstation/otherstation.jsp?mpCode="+mpCode+"&mpId="+mpId+"&device="+device+"&station="+station+"&tabSign="+tabSign;
								}
					       });
				        }else if(index == 2){
				        	queryType = 2;
				        	$('#qtcdTD2').css('display','none');
				        	var mpType = '3';
				        	var mainHeight = parseInt($("#view4").height())+30;
				        	document.getElementById("Frame6").src =  basePath+"pages/areaEnergy/consDataCentre/xlcdsssjTAB.jsp?subId="+subId+"&lineId="+device+"&mpType="+mpType+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign+"&ddType=Q";
				        }
				    }   
			  }); 
        	//默认显示 
        	var tabSign = $('#view4').parent().attr('id');
            document.getElementById("Frame4").src = basePath+"pages/areaEnergy/baseData/userSubstation/oiltemperature.jsp?device="+device+"&data="+searchrq+"&station="+station;
            //下拉框触发改变事件
			$("#searchmc").combobox({
				onChange:function(newValue,oldValue){
					parent.document.getElementById("rightFrame").src = basePath+"areaEnergy/queryMasterSubstation1.action?queryPara.subId="+subId+"&queryPara.tranId="+newValue+"&queryPara.other="+other;
				} 
			});
			
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
			$("#view5").height($("#view3").height()-30);
			$("#view6").height($("#view3").height()-30);
		 }
		 
		  //点击查询按钮
		 function querys(tab){
			dataswitch("sjrq",$("#sjrq").val(),tab);
		 }
		 //查询回调
		 function query(data){
		 	if(queryType == 0){
				document.getElementById("Frame4").contentWindow.querySource(data);
			}else if(queryType == 1){
				var qtId = $('#qtcd').combobox("getValue");
				var mpCode = qtId.split('@')[0];
				var mpId = qtId.split('@')[1];
				document.getElementById("Frame5").contentWindow.querySource(data,mpId,mpCode);
			}else if(queryType == 2){
				var mpType = '3';
				var mainHeight = parseInt($("#view4").height())+30;
				var device = $("#searchmc").val();
	         	var searchrq = $("#sjrq").val();
	         	var station = $("#station").val();
			    var tabSign = $('#view6').parent().attr('id');
				document.getElementById("Frame6").src =  basePath+"pages/areaEnergy/consDataCentre/xlcdsssjTAB.jsp?subId="+subId+"&lineId="+device+"&mpType="+mpType+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign+"&ddType=Q";
			}
		 }
		 
	</script>
</html>
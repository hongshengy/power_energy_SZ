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
		<title>母线信息</title>
		<script type="text/javascript">
			 var basePath = '<%=basePath%>';
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
									<font style="font-size: 12px; font-weight: bold;">母线档案</font>
								</legend>
								<table width="100%" cellspacing="8px" cellpadding="0" border="0">
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											母线名称
										</td>
										<td width="25%">
											<input type="text" size="18" id="cons_no" readonly="readonly"
												class="easyui-textbox" value="${resultMap.BS_NAME}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											运行状态
										</td>
										<td width="25%">
											<input type="text" size="18" id="cons_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.RUN_STATUS}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											电压等级
										</td>
										<td width="25%" id="tmnlId1">
											<input type="text" size="18" id="org_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.VOLT_CODE}">
										</td>
									</tr>
									<tr>
										<td class="td-label" align="right" nowrap="nowrap">
											降压层级
										</td>
										<td width="25%">
											<input type="text" size="18" id="contract_cap"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.VOLT_LEVEL}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											PT
										</td>
										<td width="25%">
											<input type="text" size="18" id="contact_name"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.PT_RATIO}">
										</td>
										<td class="td-label" align="right" nowrap="nowrap">
											所属终端
										</td>
										<td width="25%">
											<input type="text" size="18" id="telephone"
												readonly="readonly" class="easyui-textbox"
												value="${resultMap.TMNL_ASSET_NO}">
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
						母线名称
					</td>
					<td width="200px;">
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
					        	<iframe id="Frame${sta.index+5}" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>   
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
        	var mainHeight = parseInt(parent.Ext.getBody().getHeight())-60;
			var lineId = $("#searchmc").val();
         	var searchrq = $("#sjrq").val();
         	var bsId = "${queryPara.bsId}";
         	var name = "${queryPara.name}";
         	var type = "${queryPara.type}";
         	var pId = "${queryPara.subId}";
         	var station = $("#station").val();
         	var mpType= '2';
        	 $('#cxTab').tabs({    
			    border:false,    
			    onSelect:function(title,index){  
			    	var station = $("#station").val();
			    	var num= parseInt(index)+4
			    	var tabSign = $('#view'+num).parent().attr('id');
			        if(index == 0){
			        	document.getElementById("Frame5").src = basePath+"pages/areaEnergy/consDataCentre/dyqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
			        }else if(index == 1){
			        	document.getElementById("Frame6").src = basePath+"pages/areaEnergy/consDataCentre/mpwdqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
			        }else if(index == 2){
			        	document.getElementById("Frame7").src = basePath+"pages/areaEnergy/consDataCentre/xlcdsssjTAB.jsp?subId="+pId+"&bsId="+bsId+"&lineId="+lineId+"&mpType="+mpType+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign;
			        }
			    }    
		  }); 
		  //默认显示 
		  var tabSign = $('#view4').parent().attr('id');
          document.getElementById("Frame5").src = basePath+"pages/areaEnergy/consDataCentre/dyqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
            //下拉框触发改变事件
			$("#searchmc").combobox({
				onChange:function(newValue,oldValue){
				    //是建筑。设备。还是线路
				    var codeType = '03';
					parent.document.getElementById("rightFrame").src = basePath+"areaEnergy/queryBsLineAtion.action?queryPara.bsId="
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
		 }
		 
		  //点击查询按钮
		 function querys(tab){
			dataswitch("sjrq",$("#sjrq").val(),tab);
		 }
		 //查询回调
		 function query(data){
			var tab = $("#cxTab").tabs("getSelected");
			var index = $("#cxTab").tabs("getTabIndex",tab);
			var mainHeight = parseInt(parent.Ext.getBody().getHeight())-60;
			var lineId = $("#searchmc").val();
			var bsId = "${queryPara.bsId}";
         	var searchrq = $("#sjrq").val();
         	var station = $("#station").val();
         	var pId = "${queryPara.subId}";
         	var num= parseInt(index)+4
			var tabSign = $('#view'+num).parent().attr('id');
         	var mpType= '2';
			if(index == 0){
	        	document.getElementById("Frame5").src = basePath+"pages/areaEnergy/consDataCentre/dyqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
	        }else if(index == 1){
	        	document.getElementById("Frame6").src = basePath+"pages/areaEnergy/consDataCentre/mpwdqx.jsp?lineId="+lineId+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&station="+station;
	        }else if(index == 2){
	        	document.getElementById("Frame7").src = basePath+"pages/areaEnergy/consDataCentre/xlcdsssjTAB.jsp?subId="+pId+"&bsId="+bsId+"&lineId="+lineId+"&mpType="+mpType+"&riqiIn="+searchrq+"&hheight="+mainHeight+"&tabSign="+tabSign;
	        }
		 }
		 
	</script>
</html>
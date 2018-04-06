<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
		<title>建筑档案基本信息</title>
		<script type="text/javascript">
			 var basePath = '<%=basePath%>';
			 var codeId = '${queryPara.consId}';
			 var countNum = <%=request.getAttribute("countNum")%>
			 var COUNTNUMNEW = <%=request.getAttribute("COUNTNUMNEW")%>
		</script>
		<style type="text/css">
		html,body {
			height: 100%;
		}
		</style>
	</head>
    <body>
    	<input type="hidden" id="COUNTNUMNEW" value="${COUNTNUMNEW }"/>
		   <div id='view1' style="width: 100%; height: 150px;">
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
								<fieldset
									style="padding: 5px 5px 5px 5px; background-color: #fff;">
									<legend>
										<font style="font-size: 12px; font-weight: bold;">建筑档案</font>
									</legend>
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												建筑名称
											</td>
											<td width="25%">
												<input type="text" size="18" id="cons_no" readonly="readonly" class="easyui-textbox" value="${resultMap.SUBS_NAME}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       降压层级
                                            </td>
                                            <td width="25%">
												 <input type="text" size="18" id="cons_name" readonly="readonly" class="easyui-textbox" value="${resultMap.SUBS_LEVEL}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       所属用户
                                            </td>
                                            <td width="25%" id="tmnlId1">
                                                 <input type="text" size="18" id="org_name" readonly="readonly" class="easyui-textbox" value="${resultMap.CONS_NAME}">
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
                                                       联系人
                                            </td>
                                            <td width="25%">
                                            	<input type="text" size="18" id="contact_name" readonly="readonly" class="easyui-textbox" value="${resultMap.CONTACT_NAME}">
                                            </td>
                                            <td class="td-label" align="right" nowrap="nowrap">
												联系电话
											</td>
											<td width="25%">
												<input type="text" size="18" id="telephone" readonly="readonly" class="easyui-textbox" value="${resultMap.TELEPHONE}">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												电压等级
											</td>
											<td>
												<input type="text" size="18" id="volt_code_name" readonly="readonly" class="easyui-textbox" value="${resultMap.VOLT_CODE_NAME}">
											</td>
											<td class="td-label" align="right" nowrap="nowrap">
												
											</td>
											<td colspan="4">
											</td>
										</tr>
									</table>
								</fieldset>
							</td>
						</tr>
					</tbody>
				</table>
				<!-- 方便测试 测试结束 还原  ${countNum != 0 }-->
				<div id='view2' style="width: 100%;" >
					<div id="cxTab" class="easyui-tabs" style="width:100%;">   
					    <c:forEach var="data" items="${tabList}" varStatus="sta" step="1">
						 	    <div id="${data.TAB_SIGN}" title="${data.TAB_NAME}" style="display:none;">
							    	<div id="view${sta.index+3}">   
							        	<iframe id="Frame${sta.index+3}" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>   
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
         	  var subId =  "${resultMap.SUBS_ID}";
         	  var mainHeight = parseInt(parent.$("body").height())-155;
         	  var hheight = mainHeight/2;
              $('#cxTab').tabs({    
				    border:false,    
				    onSelect:function(title,index){   
				        var num= parseInt(index)+3
			    	    var tabSign = $('#view'+num).parent().attr('id'); 
				        if(index == 0){
				        	//方便测试 测试结束 还原  countNum == 1
				        	if(countNum == 1){
							  //建筑类型为7的时候展示特定的界面
							  document.getElementById("Frame3").src = basePath+"pages/areaEnergy/consDataCentre/subType/xlsssjTAB.jsp?codeId="+codeId+"&hheight="+hheight+"&mainHeight="+mainHeight+"&tabSign="+tabSign;
							}else{
							  document.getElementById("Frame3").src = basePath+"pages/areaEnergy/consDataCentre/xlsssjTAB.jsp?codeId="+codeId+"&hheight="+hheight+"&mainHeight="+mainHeight+"&tabSign="+tabSign;
						    }
						}else if(index == 1){
				        	document.getElementById("Frame4").src = basePath+"pages/areaEnergy/consDataCentre/qtsssjTAB.jsp?codeId="+codeId+"&hheight="+hheight+"&mainHeight="+mainHeight+"&tabSign="+tabSign;
				        }else if(index == 2){
				        	document.getElementById("Frame5").src = basePath+"pages/areaEnergy/consDataCentre/cdsssjTAB.jsp?codeId="+codeId+"&hheight="+hheight+"&COUNTNUMNEW="+COUNTNUMNEW+"&tabSign="+tabSign;
				        }else if(index == 3){
				        	//方便测试 测试结束 还原  countNum == 1
				        	if(countNum == 1){
							  //建筑类型为7的时候展示特定的界面
							  document.getElementById("Frame6").src = basePath+"pages/areaEnergy/consDataCentre/xllssjTAB.jsp?codeId="+codeId+"&hheight="+hheight+"&mainHeight="+mainHeight+"&tabSign="+tabSign+"&COUNTNUMNEW="+COUNTNUMNEW;
							}else{
							  document.getElementById("Frame6").src = basePath+"pages/areaEnergy/consDataCentre/jcxsjTAB.jsp?codeId="+codeId+"&hheight="+hheight+"&tabSign="+tabSign;
						    }
				        	
				    	} else if(index == 4){
				        	document.getElementById("Frame7").src = basePath+"pages/areaEnergy/consDataCentre/xsdlTAB.jsp?codeId="+codeId+"&subId="+subId+"&hheight="+hheight+"&tabSign="+tabSign;
				    	} else if(index == 5){
				        	document.getElementById("Frame8").src = basePath+"pages/areaEnergy/consDataCentre/rdlTAB.jsp?codeId="+codeId+"&subId="+subId+"&hheight="+hheight+"&tabSign="+tabSign;
				    	} else if(index == 6){
				        	document.getElementById("Frame9").src = basePath+"/areaEnergy/queryLineXB.action?queryPara.codeId="+codeId+"&queryPara.subId="+subId+"&tabSign="+tabSign;
				    	}else if(index == 7){
				        	document.getElementById("Frame10").src = basePath+"pages/areaEnergy/consDataCentre/xllssjTAB.jsp?codeId="+codeId+"&hheight="+hheight+"&mainHeight="+mainHeight+"&tabSign="+tabSign+"&COUNTNUMNEW="+COUNTNUMNEW;
				    	} 
				    }   
			  }); 
			  //默认显示 
			  //方便测试 测试结束 还原  countNum == 1
			  if(countNum == 1){
				  //建筑类型为7的时候展示特定的界面
				  var tabSign = $('#view3').parent().attr('id');
				  document.getElementById("Frame3").src = basePath+"pages/areaEnergy/consDataCentre/subType/xlsssjTAB.jsp?codeId="+codeId+"&hheight="+hheight+"&tabSign="+tabSign;
			  }else{
			  	  var tabSign = $('#view3').parent().attr('id');
	              document.getElementById("Frame3").src = basePath+"pages/areaEnergy/consDataCentre/xlsssjTAB.jsp?codeId="+codeId+"&hheight="+hheight+"&tabSign="+tabSign;
			  }
		 });
		 
		 $(window).resize(function () {
			screen();
		 });
		 
		 function screen(){
		 	dh = parent.$("body").height();
			$("#view2").height(dh-$("#view1").height());
			$("#view3").height($("#view2").height()-30);
			$("#view4").height($("#view2").height()-30);
			$("#view5").height($("#view2").height()-30);
			$("#view6").height($("#view2").height()-30);
			$("#view7").height($("#view2").height()-30);
			$("#view8").height($("#view2").height()-30);
			$("#view9").height($("#view2").height()-30);
			$("#view10").height($("#view2").height()-30);
		 }
	</script>
</html>
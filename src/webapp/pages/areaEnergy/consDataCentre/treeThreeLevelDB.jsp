<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
	Calendar c = Calendar.getInstance();
	//c.add(Calendar.DAY_OF_MONTH , -1);
	String strCurrDate = f.format(c.getTime());
%>
<html>
	<head>
		<jsp:include page="/ext.jsp" />
        <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	    <script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
	    <base href="<%=basePath%>">
		<title>电表档案基本信息</title>
		<script type="text/javascript">
			 var basePath = '<%=basePath%>';
			 var strCurrDate = '<%=strCurrDate%>';
			 var meterId = '${queryPara.meterId}';
			 //点击查询方法
			 function queryA(){
			 		var riqiIn1 = $('#riqiIn1').val();
			 		var riqiIn2 = $('#riqiIn2').val();
			 	    $('#cbzdTable').datagrid("load",{
				          "queryPara.queryData" : riqiIn1,
				          "queryPara.queryStartData" : riqiIn1,
				          "queryPara.queryEndData" : riqiIn2
				    });
			 }
			  $(window).resize(function () {
			 	dh = $("body").height();
				$("#cbzdTable").datagrid({
					height : dh-180
				});
			 });
		</script>
		<script type="text/javascript" src="<%=basePath%>pages/areaEnergy/consDataCentre/treeThreeLevelDB.js"></script>
	</head>
    <body srolling='no' style="padding-left: 2px;">
		   <div id='showDiv' class="container-shadow container-marginTop" style="width:100%;margin-top:0px;height:150px;">
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
								<fieldset
									style="padding: 5px 5px 5px 5px; background-color: #fff;">
									<legend>
										<font style="font-size: 12px; font-weight: bold;">电表档案</font>
									</legend>
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												电表局编号
											</td>
											<td width="25%">
												<input type="text" size="18" id="cons_no" readonly="readonly" class="easyui-textbox" value="${resultMap.METER_ASSET_NO}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       电流变比
                                            </td>
                                            <td width="25%">
												 <input type="text" size="18" id="cons_name" readonly="readonly" class="easyui-textbox" value="${resultMap.CT}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       电压变比
                                            </td>
                                            <td width="25%" id="tmnlId1">
                                                 <input type="text" size="18" id="org_name" readonly="readonly" class="easyui-textbox" value="${resultMap.PT}">
                                            </td>
										</tr>
										<tr>
                                            <td class="td-label" align="right" nowrap="nowrap">
												电表型号
											</td>
											<td width="25%">
					                            <input type="text" size="18" id="contract_cap" readonly="readonly" class="easyui-textbox" value="${resultMap.MODEL_CODE_NAME}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       接线方式
                                            </td>
                                            <td width="25%">
                                            	<input type="text" size="18" id="contact_name" readonly="readonly" class="easyui-textbox" value="${resultMap.WIRING_MODE_NAME}">
                                            </td>
                                            <td class="td-label" align="right" nowrap="nowrap">
												生产厂家
											</td>
											<td width="25%">
												<input type="text" size="18" id="telephone" readonly="readonly" class="easyui-textbox" value="${resultMap.MANUFACTURER_NAME}">
											</td>
										</tr>
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												安装日期
											</td>
											<td>
												<input type="text" size="18" id="volt_code_name" readonly="readonly" class="easyui-textbox" value="${resultMap.CREATE_DATE}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                            </td>
                                            <td width="25%">
                                            </td>
                                            <td class="td-label" align="right" nowrap="nowrap">
											</td>
											<td width="25%">
											</td>
										</tr>
									</table>
								</fieldset>
							</td>
						</tr>
					</tbody>
				</table>
             </div>
               查询结果 数据日期 <input id="riqiIn1" type="text"class="easyui-datebox" value="<%=strCurrDate%>"/>至<input id="riqiIn2" type="text"class="easyui-datebox" value="<%=strCurrDate%>"/><button class="easyui-linkbutton c1" onclick="queryA();" style="width:70px;">查询</button>
             <table id="cbzdTable" style="width: 100%;"></table>
	</body>
</html>
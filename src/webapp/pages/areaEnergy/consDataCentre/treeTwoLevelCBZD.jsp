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
        <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	    <script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
	    <base href="<%=basePath%>">
		<title>抄表终端档案基本信息</title>
		<script type="text/javascript">
			 var basePath = '<%=basePath%>';
			 var strCurrDate = '<%=strCurrDate%>';
			 var terminalId = '${queryPara.terminalId}';
			 //点击查询方法
			 function queryA(){
			 		var riqiIn = $('#riqiIn').val();
			 	    $('#cbzdTable').datagrid("load",{
				          "queryPara.queryData" : riqiIn
				    });
			 }
			 
			 $(window).resize(function () {
			 	dh = $("body").height();
				$("#cbzdTable").datagrid({
					height : dh-180
				});
			 });
		</script>
		<script type="text/javascript" src="<%=basePath%>pages/areaEnergy/consDataCentre/treeTwoLevelCBZD.js"></script>
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
               查询结果 数据日期 <input id="riqiIn" type="text"class="easyui-datebox" value="<%=strCurrDate%>"/> <button class="easyui-linkbutton c1" onclick="queryA();" style="width:70px;">查询</button>
             <table id="cbzdTable" style="width: 100%;"></table>
	</body>
</html>
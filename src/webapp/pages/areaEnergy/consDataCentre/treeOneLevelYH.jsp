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
		<title>用户档案基本信息</title>
		<jsp:include page="/ext.jsp" />
        <jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
	    <script type="text/javascript" src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
	</head>
    <body srolling='no'>
		<div id='queryDiv' class="container-shadow container-marginTop" style="width:100%;margin-top: 0px;">
            <form id="thisform" name="thisform" target="" method="post">
               <table style="width:100%;">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
								<fieldset
									style="padding: 5px 5px 5px 5px; background-color: #fff;">
									<legend>
										<font style="font-size: 12px; font-weight: bold;">用户档案</font>
									</legend>
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												用户编号
											</td>
											<td width="25%">
												<input type="text" size="18" id="cons_no" readonly="readonly" class="easyui-textbox" value="${resultMap.CONS_NO}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       用户名称
                                            </td>
                                            <td width="25%">
												 <input type="text" size="18" id="cons_name" readonly="readonly" class="easyui-textbox" value="${resultMap.CONS_NAME}">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       服务中心
                                            </td>
                                            <td width="25%" id="tmnlId1">
                                                 <input type="text" size="18" id="org_name" readonly="readonly" class="easyui-textbox" value="${resultMap.ORG_NAME}">
                                            </td>
										</tr>
										<tr>
                                            <td class="td-label" align="right" nowrap="nowrap">
												合同容量
											</td>
											<td width="25%">
					                            <input type="text" size="18" id="contract_cap" readonly="readonly" class="easyui-textbox" value="${resultMap.CONTRACT_CAP}">
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
												用电地址
											</td>
											<td colspan="4">
												<input type="text" size="60" id="elec_addr" readonly="readonly" class="easyui-textbox" value="${resultMap.ELEC_ADDR}">
											</td>
										</tr>
									</table>
								</fieldset>
							</td>
						</tr>
					</tbody>
				</table>
				</form>
        </div>
	</body>
</html>
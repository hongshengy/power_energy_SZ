<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.HashMap"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
	
	HashMap<String, Object> retMap = (HashMap<String, Object>)request.getAttribute("retMap");
	String hideOpBtns = (String)request.getParameter("hideOpBtns");
	Calendar c1 = Calendar.getInstance();
	Calendar c2 = Calendar.getInstance();
	Calendar c3 = Calendar.getInstance();
	c1.add(Calendar.DATE, 0);
	c2.add(Calendar.DATE, -1);
	c3.add(Calendar.DATE, -2);
	String zcTime = new SimpleDateFormat("yyyy-MM-dd").format(c1
			.getTime());
	String preTime = new SimpleDateFormat("yyyy-MM-dd").format(c2
			.getTime());
	String preTime1 = new SimpleDateFormat("yyyy-MM-dd").format(c3
			.getTime());
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<jsp:include page="/pages/common/head.jsp" />
		<link rel="stylesheet" type="text/css" href="<%=path %>/pages/areaEnergy/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
		<script type="text/javascript" src="<%=path %>/pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="<%=path%>/pages/areaEnergy/common/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
		<jsp:include page="/pages/common/componentBase.jsp" />
		<script type="text/javascript"
			src="<%=basePath%>js/jquery.timers-1.1.2.js"></script>
		<title>数据补招</title>
		<style>
			.greenLine {	
				text-align: right;
				padding: 0 15px 0 5px;
				height: 30px;
			}
			
			.whiteLine {	
				text-align: left;
				padding: 0 15px 0 5px;
				height: 30px;
			}
		
			.tabContent {
				border-top: #A0A0A0 solid 1px;
				border-left: #A0A0A0 solid 1px;
				border-right: #A0A0A0 solid 1px;
				border-bottom: #A0A0A0 solid 1px;
			}
			
			.tabContent td {
				border: #ccc 1px solid;
			}
			.listHead td,.listHead th {
				height: 25px;
				font-weight: bold;
				background-color: #DEE8E9;
				border-bottom: #ccc solid 1px;
			}
			.easyui-linkbutton{
			    padding: 4px 8px;
			    font-size: 14px;
			    font-family: '微软雅黑 Regular', '微软雅黑';
		   }
		</style>
	</head>
	
	<body scroll="no">
		<form id="thisform" name="thisform" method="post" target="bodyFrame" action="" style="height: 100%;background-color: #f8f8f8">
			<div id="topPanelDiv"
				style="position: relative; border: 0; width: 100%; height:100%;" >
				<table id="table1" width="100%" cellspacing="0" height="10%" cellpadding="0" border="1" class="content">
					<tbody>
						<tr>
							<td class="messageHead" colspan="6" style="heigzcTime ht:25px;">
								<span style="font-size:12px;font-weight:bold;padding-left:5px;">终端信息</span>
							</td>
						</tr>
						<tr>
							<td valign="top" style="padding:0px;" class="contentBoxUp">
								<table width="100%" cellspacing="0" cellpadding="0" border="1px" style="border-top:0px;" class="tabContent">
									<tbody>
										<tr>
											<td width="10%"  class="greenLine" >终端资产号</td>
											<td  width="15%" class="whiteLine"><%=retMap.get("TMNLASSETNO")==null?"":retMap.get("TMNLASSETNO")%></td>
											<td  width="10%" class="greenLine">地址码</td>
											<td  width="15%" class="whiteLine"><%=retMap.get("AREACODE")==null?"":retMap.get("AREACODE")%></td>
											<td  width="10%" class="greenLine">地区码</td>
											<td  width="15%" class="whiteLine"><%=retMap.get("COMMADDRESS")==null?"":retMap.get("COMMADDRESS")%></td>
											<td  width="10%" class="greenLine">运行状态</td>
											<td  width="15%" class="whiteLine"><%=retMap.get("RUNSTATUS")==null?"":retMap.get("RUNSTATUS")%></td>
										</tr>
										<tr>
											<td width="10%" class="greenLine">终端类型</td>
											<td  width="15%" class="whiteLine"><%=retMap.get("TMNLTYPE")==null?"":retMap.get("TMNLTYPE")%></td>
											<td  width="10%" class="greenLine">终端型号</td>
											<td  width="15%" class="whiteLine"><%=retMap.get("TMNLKIND")==null?"":retMap.get("TMNLKIND")%></td>
											<td  width="10%" class="greenLine">所属部门</td>
											<td  width="15%" class="whiteLine"><%=retMap.get("ORGNAME")==null?"":retMap.get("ORGNAME")%></td>
											<td  width="10%" class="greenLine">安装位置</td>
											<td  width="15%" class="whiteLine"><%=retMap.get("ADDRESS")==null?"":retMap.get("ADDRESS")%></td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
				<table width="100%" height="38%" cellspacing="0" cellpadding="0" border="1" class="content" style="border-width:0px;">
					<tbody>
						<tr>
							<td valign="top" style="padding:0px;" class="contentBoxUp">
								<table width="100%" id="table2" cellspacing="0" cellpadding="0" border="1px" style="border-top:0px;" class="tabContent">
									<tbody>
										<tr>
											<td>
												<table id='stepTab' class="dataGrid" width="100%" border="1" cellSpacing="0" cellPadding="0">
											  <tr class="listHead">
											  	<td align="center"  ></td>
												<td align="center"  >通道号</td>
												<td align="center"  >终端资产号</td>
												<td align="center"  >用户编号</td>
												<td align="center"  >用户名称</td>
												<td align="center"  >用电地址</td>
											  </tr>
											  <c:forEach items="${resultList}" var="map" varStatus="sta" step="1">
												  <tr>
												  	<td><input type="radio" type="hidden" checked="checked" name='ids' value="${map.AISLE},${map.CONS_ID}"></td>
													<td align="center" >
														${map.AISLE}
													</td>
													<td align="center" >
														${map.TMNLASSETNO}
													</td>
													<td align="center">
														${map.COSNO}
													</td>
													<td align="center" >
														${map.CONSNAME}
													</td>
													<td align="center">
														${map.ELECADDR}
													</td>
												  </tr>
											</c:forEach>
											  <tr>
												<td align="center"></td>
												<td align="center"></td>
												<td align="center"></td>
												<td align="center"></td>
												<td align="center"></td>
												<td align="center"></td>
											  </tr>
											  <tr>
												<td align="center"></td>
												<td align="center"></td>
												<td align="center"></td>
												<td align="center"></td>
												<td align="center"></td>
												<td align="center"></td>
											  </tr>
											</table>
										</td>
									</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
				<table id="table3" width="100%" height="50%" cellspacing="0" cellpadding="0" border="1" class="content">
					<td>
						<div>
							<table width="100%">
								<tr>
									<td class="messageHead" style="height:25px;" width="20%">
										<span style="font-size:12px;font-weight:bold;padding-left:5px;">召测时间点选择</span>
									</td>
									<td class="messageHead" style="height:25px;" width="80%">
										<table>
											<tr>
												<td width="15%" style="text-align:left;"  class="messageList_text">
													召测结果列表（主数据）
												</td>
												<td width="5%" nowrap="true"  class="messageList_text">
												          日期
												</td>
							                    <td width="15%">
						                           <fpus:Date id="dataDate" name="dataDate"
					                                value="<%=zcTime %>" width="123"
					                                format="Y-m-d" readOnly="true"/>
							                    </td>
							                    <td width="5%" nowrap="true"  class="messageList_text">
													时间点
												</td>
												<td width="10%">
													<input id="timeType" type="text" name="timeType" size="14"  maxlength="16" value="" onchange="dataCheck(this);">
												</td>
												<td width="18%" align="center"><font color="red">（如09:15，12:15）</font></td>
												<td width="32%" align="left">
													<input type="button" value="数据召测" class="easyui-linkbutton"  onclick="callConsData();" />
													<input type="button" value="时钟校时" class="easyui-linkbutton"  onclick="timeCheckCall();" />
													<input type="button" value="保存" class="easyui-linkbutton" onclick="saveCallData();"/>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<table width="100%">
								<tr>
									<td width="20%" valign="top">
										<div style="position: relative; border: 0; width: 100%; height:100%; overflow:auto;">
											<table width="100%" id="conTb" class="content">
												<tr width="100%">
													<td width="7%"><input id="radio1" name="timeClick" type="radio" value="00:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">00:00</td>
													<td width="7%"><input id="radio2" name="timeClick" type="radio" value="00:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">00:15</td>
													<td width="7%"><input id="radio3" name="timeClick" type="radio" value="00:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">00:30</td>
													<td width="7%"><input id="radio4" name="timeClick" type="radio" value="00:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">00:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio5" name="timeClick" type="radio" value="01:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">01:00</td>
													<td width="7%"><input id="radio6" name="timeClick" type="radio" value="01:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">01:15</td>
													<td width="7%"><input id="radio7" name="timeClick" type="radio" value="01:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">01:30</td>
													<td width="7%"><input id="radio8" name="timeClick" type="radio" value="01:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">01:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio9" name="timeClick" type="radio" value="02:00" onClick="changeTime()" /></td>
													<td width="18%" align="left">02:00</td>
													<td width="7%"><input id="radio10" name="timeClick" type="radio" value="02:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">02:15</td>
													<td width="7%"><input id="radio11" name="timeClick" type="radio" value="02:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">02:30</td>
													<td width="7%"><input id="radio12" name="timeClick" type="radio" value="02:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">02:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio13" name="timeClick" type="radio" value="03:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">03:00</td>
													<td width="7%"><input id="radio14" name="timeClick" type="radio" value="03:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">03:15</td>
													<td width="7%"><input id="radio15" name="timeClick" type="radio" value="03:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">03:30</td>
													<td width="7%"><input id="radio16" name="timeClick" type="radio" value="03:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">03:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio17" name="timeClick" type="radio" value="04:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">04:00</td>
													<td width="7%"><input id="radio18" name="timeClick" type="radio" value="04:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">04:15</td>
													<td width="7%"><input id="radio19" name="timeClick" type="radio" value="04:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">04:30</td>
													<td width="7%"><input id="radio20" name="timeClick" type="radio" value="04:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">04:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio21" name="timeClick" type="radio" value="05:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">05:00</td>
													<td width="7%"><input id="radio22" name="timeClick" type="radio" value="05:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">05:15</td>
													<td width="7%"><input id="radio23" name="timeClick" type="radio" value="05:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">05:30</td>
													<td width="7%"><input id="radio24" name="timeClick" type="radio" value="05:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">05:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio25" name="timeClick" type="radio" value="06:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">06:00</td>
													<td width="7%"><input id="radio26" name="timeClick" type="radio" value="06:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">06:15</td>
													<td width="7%"><input id="radio27" name="timeClick" type="radio" value="06:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">06:30</td>
													<td width="7%"><input id="radio28" name="timeClick" type="radio" value="06:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">06:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio29" name="timeClick" type="radio" value="07:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">07:00</td>
													<td width="7%"><input id="radio30" name="timeClick" type="radio" value="07:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">07:15</td>
													<td width="7%"><input id="radio31" name="timeClick" type="radio" value="07:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">07:30</td>
													<td width="7%"><input id="radio32" name="timeClick" type="radio" value="07:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">07:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio33" name="timeClick" type="radio" value="08:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">08:00</td>
													<td width="7%"><input id="radio34" name="timeClick" type="radio" value="08:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">08:15</td>
													<td width="7%"><input id="radio35" name="timeClick" type="radio" value="08:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">08:30</td>
													<td width="7%"><input id="radio36" name="timeClick" type="radio" value="08:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">08:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio37" name="timeClick" type="radio" value="09:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">09:00</td>
													<td width="7%"><input id="radio38" name="timeClick" type="radio" value="09:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">09:15</td>
													<td width="7%"><input id="radio39" name="timeClick" type="radio" value="09:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">09:30</td>
													<td width="7%"><input id="radio40" name="timeClick" type="radio" value="09:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">09:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio41" name="timeClick" type="radio" value="10:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">10:00</td>
													<td width="7%"><input id="radio42" name="timeClick" type="radio" value="10:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">10:15</td>
													<td width="7%"><input id="radio43" name="timeClick" type="radio" value="10:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">10:30</td>
													<td width="7%"><input id="radio44" name="timeClick" type="radio" value="10:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">10:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio45" name="timeClick" type="radio" value="11:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">11:00</td>
													<td width="7%"><input id="radio46" name="timeClick" type="radio" value="11:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">11:15</td>
													<td width="7%"><input id="radio47" name="timeClick" type="radio" value="11:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">11:30</td>
													<td width="7%"><input id="radio48" name="timeClick" type="radio" value="11:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">11:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio49" name="timeClick" type="radio" value="12:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">12:00</td>
													<td width="7%"><input id="radio50" name="timeClick" type="radio" value="12:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">12:15</td>
													<td width="7%"><input id="radio51" name="timeClick" type="radio" value="12:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">12:30</td>
													<td width="7%"><input id="radio52" name="timeClick" type="radio" value="12:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">12:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio53" name="timeClick" type="radio" value="13:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">13:00</td>
													<td width="7%"><input id="radio54" name="timeClick" type="radio" value="13:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">13:15</td>
													<td width="7%"><input id="radio55" name="timeClick" type="radio" value="13:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">13:30</td>
													<td width="7%"><input id="radio56" name="timeClick" type="radio" value="13:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">13:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio57" name="timeClick" type="radio" value="14:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">14:00</td>
													<td width="7%"><input id="radio58" name="timeClick" type="radio" value="14:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">14:15</td>
													<td width="7%"><input id="radio59" name="timeClick" type="radio" value="14:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">14:30</td>
													<td width="7%"><input id="radio60" name="timeClick" type="radio" value="14:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">14:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio61" name="timeClick" type="radio" value="15:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">15:00</td>
													<td width="7%"><input id="radio62" name="timeClick" type="radio" value="15:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">15:15</td>
													<td width="7%"><input id="radio63" name="timeClick" type="radio" value="15:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">15:30</td>
													<td width="7%"><input id="radio64" name="timeClick" type="radio" value="15:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">15:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio65" name="timeClick" type="radio" value="16:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">16:00</td>
													<td width="7%"><input id="radio66" name="timeClick" type="radio" value="16:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">16:15</td>
													<td width="7%"><input id="radio67" name="timeClick" type="radio" value="16:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">16:30</td>
													<td width="7%"><input id="radio68" name="timeClick" type="radio" value="16:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">16:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio69" name="timeClick" type="radio" value="17:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">17:00</td>
													<td width="7%"><input id="radio70" name="timeClick" type="radio" value="17:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">17:15</td>
													<td width="7%"><input id="radio71" name="timeClick" type="radio" value="17:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">17:30</td>
													<td width="7%"><input id="radio72" name="timeClick" type="radio" value="17:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">17:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio73" name="timeClick" type="radio" value="18:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">18:00</td>
													<td width="7%"><input id="radio74" name="timeClick" type="radio" value="18:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">18:15</td>
													<td width="7%"><input id="radio75" name="timeClick" type="radio" value="18:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">18:30</td>
													<td width="7%"><input id="radio76" name="timeClick" type="radio" value="18:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">18:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio77" name="timeClick" type="radio" value="19:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">19:00</td>
													<td width="7%"><input id="radio78" name="timeClick" type="radio" value="19:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">19:15</td>
													<td width="7%"><input id="radio79" name="timeClick" type="radio" value="19:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">19:30</td>
													<td width="7%"><input id="radio80" name="timeClick" type="radio" value="19:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">19:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio81" name="timeClick" type="radio" value="20:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">20:00</td>
													<td width="7%"><input id="radio82" name="timeClick" type="radio" value="20:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">20:15</td>
													<td width="7%"><input id="radio83" name="timeClick" type="radio" value="20:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">20:30</td>
													<td width="7%"><input id="radio84" name="timeClick" type="radio" value="20:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">20:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio85" name="timeClick" type="radio" value="21:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">21:00</td>
													<td width="7%"><input id="radio86" name="timeClick" type="radio" value="21:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">21:15</td>
													<td width="7%"><input id="radio87" name="timeClick" type="radio" value="21:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">21:30</td>
													<td width="7%"><input id="radio88" name="timeClick" type="radio" value="21:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">21:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio89" name="timeClick" type="radio" value="22:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">22:00</td>
													<td width="7%"><input id="radio90" name="timeClick" type="radio" value="22:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">22:15</td>
													<td width="7%"><input id="radio91" name="timeClick" type="radio" value="22:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">22:30</td>
													<td width="7%"><input id="radio92" name="timeClick" type="radio" value="22:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">22:45</td>
												</tr>
												<tr width="100%">
													<td width="7%"><input id="radio93" name="timeClick" type="radio" value="23:00" onClick="changeTime()"/></td>
													<td width="18%" align="left">23:00</td>
													<td width="7%"><input id="radio94" name="timeClick" type="radio" value="23:15" onClick="changeTime()"/></td>
													<td width="18%" align="left">23:15</td>
													<td width="7%"><input id="radio95" name="timeClick" type="radio" value="23:30" onClick="changeTime()"/></td>
													<td width="18%" align="left">23:30</td>
													<td width="7%"><input id="radio96" name="timeClick" type="radio" value="23:45" onClick="changeTime()"/></td>
													<td width="18%" align="left">23:45</td>
												</tr>
											</table>
										</div>
									</td>
									<td width="80%">
										<div>
											<table width="100%" height="100%">
												<tr class="listHead" width="100%">
													<td align='center' width="5%"> <input type="checkbox" checked= "checked" name="total" onclick="clickCheckbox()"/></td>
													<td align="center" width="5%">序号</td>
													<td align="center" width="10%">设备名称</td>
													<td align="center" width="10%">设备编号</td>
													<td align="center" width="10%">设备内部编号</td>
													<td align="center" width="10%">时段总电量</td>
													<td align="center" width="10%">15分电量</td>
													<td align="center" width="10%">开始分钟数</td>
													<td align="center" width="10%">终止分钟数</td>
													<td align="center" width="10%">内部启停数</td>
													<td align="center" width="10%">峰值功率</td>
												</tr>
												<tr width="100%">
													 <td id="td1" colspan="11" width="100%">
														 <div  style="width: 100%; height: 100%; overflow: auto; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: none; border-right-style: none; border-bottom-style: none; border-left-style: none; position: relative;">
															<table id="formTable" width="100%"  height="100%">
																
													    	</table>
														</div>
														
													</td>
												</tr>
												<tr width="100%">
													<td style="text-align:left;" colspan="10" class="messageList_text">
														召测结果列表（辅助数据）
													</td>
												</tr>
												<tr class="listHead" width="100%">
													<td align='center' width="5%"> <input type="checkbox"/></td>
													<td align="center" width="5%">序号</td>
													<td align="center" width="10%">设备名称</td>
													<td align="center" width="10%">设备编号</td>
													<td align="center" colspan="2" width="20%">设备内部编号</td>
													<td align="center" width="10%">骤降数据开始</td>
													<td align="center" colspan="2" width="20%">骤降数据个数</td>
													<td align="center" width="10%">骤降时间</td>
													<td align="center" width="10%">骤降数据区</td>
												</tr>
												<tr width="100%">
													<td id="td2" colspan="11" width="100%">
														<div style="width: 100%; height: 100%; overflow: auto; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: none; border-right-style: none; border-bottom-style: none; border-left-style: none; position: relative;">
															<table id="tb3" width="100%" class="dataGrid" height="100%">
															</table>
														</div>
													</td>
												</tr>
											</table>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</table>
			</div>
		</form>
	</body>
	<script type="text/javascript">
		var timeArr = ["00:00","00:15","00:30","00:45","01:00","01:15","01:30","01:45","02:00","02:15","02:30","02:45","03:00","03:15","03:30","03:45",
						"04:00","04:15","04:30","04:45","05:00","05:15","05:30","05:45","06:00","06:15","06:30","06:45","07:00","07:15","07:30","07:45",
						"08:00","08:15","08:30","08:45","09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45",
						"12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45","14:00","14:15","14:30","14:45","15:00","15:15","15:30","15:45",
						"16:00","16:15","16:30","16:45","17:00","17:15","17:30","17:45","18:00","18:15","18:30","18:45","19:00","19:15","19:30","19:45",
						"20:00","20:15","20:30","20:45","21:00","21:15","21:30","21:45","22:00","22:15","22:30","22:45","23:00","23:15","23:30","23:45"];
		var timeArr1 = ["0:00","0:15","0:30","0:45","1:00","1:15","1:30","1:45","2:00","2:15","2:30","2:45","3:00","3:15","3:30","3:45","4:00","4:15",
						"4:30","4:45","5:00","5:15","5:30","5:45","6:00","6:15","6:30","6:45","7:00","7:15","7:30","7:45","8:00","8:15","8:30","8:45",
						"9:00","9:15","9:30","9:45","10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45","12:00","12:15","12:30","12:45",
						"13:00","13:15","13:30","13:45","14:00","14:15","14:30","14:45","15:00","15:15","15:30","15:45","16:00","16:15","16:30","16:45",
						"17:00","17:15","17:30","17:45","18:00","18:15","18:30","18:45","19:00","19:15","19:30","19:45","20:00","20:15","20:30","20:45",
						"21:00","21:15","21:30","21:45","22:00","22:15","22:30","22:45","23:00","23:15","23:30","23:45"];
		var timeStamp = ["<%=zcTime%>","<%=preTime%>","<%=preTime1%>"];
		var isCancel = false;
		var countFlag = 0;
					
		$(function(){
			//parent.disWaitDisplayForQuery();
			window.onresize = reszieFun;
			setDataGridHeight();
			//初始化传输日
			$(".dataGrid:eq(1)").hide();//隐藏分页显示栏
			radioClick();
			radioFirstCheck();
		})
		function radioFirstCheck(){
			var radioCheck=$("input[name='ids']");
			var radioLength=radioCheck.length;
			if(radioLength>0){
				$("input[name='ids']:first").click();
			}
		}
		function reszieFun() {
	        setTimeout('setDataGridHeight();',100);
	    }       
	    function radioClick(){
	    	document.getElementById("radio"+<%=retMap.get("TIME_POINT")==null?"":retMap.get("TIME_POINT")%>).click(); 
	    }
	    function changeTime(){
	    	var timeStamp = $("input[name='timeClick']:checked").val();
	    	$("#timeType").val(timeStamp);
	    }
	    function setDataGridHeight() {
	    	$(".listTable").css("margin-top",0);
	        //var ifmWin = window.frames["bodyFrame"];
	        //$(".dataGrid:first").parent().css("height",305).parent().css("height",335);
	        var h1=$("#table1").height();
	        var h2=this.document.getElementById("table2").scrollHeight;
	        var scrollHeight=this.document.body.clientHeight;
	        if(scrollHeight!=0){
	        	$("#table3").css("height",scrollHeight-h1-h2-150);
	        	$("#td1").css("height",(scrollHeight-h1-h2-30-85)/2);
	        	$("#td2").css("height",(scrollHeight-h1-h2-30-85)/2);
	        	$("#conTb").parent().css("height",scrollHeight-h1-h2-30);
	        }
	    }
		//检查输入的格式
		function dataCheck(obj){
			var time1;
			var time2=getNowTimePoint();
			var n=0;
			var n1=0;
			if(obj.value==''||obj.value==null){
				$.messager.confirm("提示","请填写或点击选择具体时间点!");
				radioClick();
				return;
			}
			for(var i=0;i<timeArr.length;i++){
				if(obj.value==timeArr[i]){
					document.getElementById("radio"+(i+1)).click();
					time1=i+1;
					n++;
				}
			}
			if(n==0){
				for(var i=0;i<timeArr1.length;i++){
					if(obj.value==timeArr1[i]){
						document.getElementById("radio"+(i+1)).click();
						time1=i+1;
						n1++;
					}
				}
			}
			if(n==0&&n1==0){
				$.messager.confirm("提示","时间点不符合规则，请重新填写或选择!");
				radioClick();
				return;
			}else if((time2<time1)&&($("#dataDate").val()=="<%=zcTime%>")){
				$.messager.confirm("提示","时间点不能超过当前的时间点，请重新填写或选择!");
				radioClick();
				return;
			}
			
		}
		
		function getNowTimePoint(){
			var timePoint;
			$.ajax({
       			url :"<%=basePath%>areaEnergy/queryReCallNowPoint.action",
       			type:"post",
       			cache : false,
       			dataType : "json",
       			timeout:60000,
       			success : function(rsl){
       				timePoint = rsl;
       			},
       			error : function(){
       			}
		    });
		    return timePoint;
		}
		function getIndex(){
			var dataTime=$("#timeType").val();
			var n=0;
			var n1=0;
			for(var i=0;i<timeArr.length;i++){
				if(dataTime==timeArr[i]){
					n++;
					return i+1;
				}
			}
			if(n==0){
				for(var i=0;i<timeArr1.length;i++){
					if(dataTime==timeArr1[i]){
						n1++;
						return i+1;
					}
				}
			}
		}
		
		function initCancel()
        {
    	   isCancel = false;
    	   countFlag = 0;
        }
        function cancelTask(){
        	$('body').stopTime('rslTimers');
            $.messager.progress('close');
		 	setCancelTrue();
		 	
        }
        function setCancelTrue(){
        	isCancel = true;
        }
        
        
		/* 创建任务*/
		function callConsData(){
			var n=0;
			var timePoint=getNowTimePoint();
			var sel = $("input[name='ids']:checked"); 
	    	if (sel.length == 0||sel.length > 1) {
		        $.messager.confirm("提示","请选择一条用户信息进行召测！");
		        return false;
		    }
		    if($("#dataDate").val()==null||$("#dataDate").val()==''){
		    	$.messager.confirm("提示","日期不能为空！");
		        return false;
		    }
		    for(var i=0;i<timeStamp.length;i++){
				if($("#dataDate").val()==timeStamp[i]){
					n++;
				}
			}
			if(n==0||n>1){
				$.messager.confirm("提示","只能选择前三天之内的日期！");
		        return false;
			}
			if((timePoint<getIndex())&&($("#dataDate").val()=="<%=zcTime%>")){
				$.messager.confirm("提示","时间点不能超过当前的时间点，请重新填写或选择！");
		        return false;
			}
		    //清空召测到的数据
		    $("#formTable").empty();
			//showWaitDisplay(null,null,true,"正在进行数据召测...");
			$.messager.progress({
				title:'提示',
				msg:'正在进行数据召测...<input type="button" value="停止召测" onclick="cancelTask()">',
				text:''
			});
			var params = getRecodeParams();
			initCancel();
			$.ajax({
				url : '<%=basePath%>areaEnergy/createNILMTaskForData.action',
				timeout :60000,
				type : 'post',
				dataType : 'json',
				cache : false,
				data : params.join('&'),
				success : function(json){
					if(isCancel == true) {
	                   return;
	                }
					startFetchEvent(json);
				},
				error : function(response){
					$.messager.confirm("提示",response.responseText);
				}
			});
		}
		
		//每隔5秒钟获取一次下发结果		
		function startFetchEvent(obj){
			$('body').everyTime('5s',"rslTimers",function(){
				countFlag++;
				if(obj.length==0){
					//停止循环查询结果
					$('body').stopTime('rslTimers');
				}else{
					getTaskResult(obj);
				}
			});
		}
				
		//获取下发的结果
		function getTaskResult(obj){
			var params = {
				taskId : obj
			};
			$.ajax({
				url : '<%=basePath%>areaEnergy/getNILMTaskResult.action',
				type : 'post',
				timeout : 60000,
				dataType : 'json',
				data : params,
				cache : false,
				success : function(data){
					if(countFlag ==25 & data.msg == 'wait' ){
						$.messager.confirm("提示","任务超时！");
						cancelTask();
						countFlag =0;
					}
					if(data.msg == 'wait'){
						
					}else{
						//disWaitDisplay();
						//停止取得结果方法调用
						$.messager.progress('close');
						$('body').stopTime('rslTimers');
						if(data.flag == 0){
							$.messager.confirm("提示",data.msg);
						}else{
							var sbResult = "";
							if(data.item != null ){
								if(data.item.deviceDataList.length !=0){
									for(var i=0;i<data.item.deviceDataList.length;i++){
										var totalelectric = data.item.totalelectric;
										var time15Period = data.item.deviceDataList[i].time15Period;
										var startmin = data.item.deviceDataList[i].startmin;
										var endmin = data.item.deviceDataList[i].endmin;
										var startEndCounts = data.item.deviceDataList[i].startEndCounts;
										var electCode = data.item.deviceDataList[i].deviceType;
										var elId = data.item.deviceDataList[i].deviceInsideNum;
										if((i+1)%2==1){
											sbResult += "<tr width='100%' height='20'><td align='center' width='5%'>"+
											"<input type='checkbox' name='disOver' checked='checked' value='"+totalelectric+","+time15Period+","+startmin+","+endmin+","+startEndCounts+","+electCode+","+elId+"'/></td>"+
											"<td width='5%' align='center'>";
										}else{
											sbResult += "<tr width='100%' class='grayLine' height='20'><td align='center' width='5%' >"+
												"<input type='checkbox' name='disOver' checked='checked'  value='"+totalelectric+","+time15Period+","+startmin+","+endmin+","+startEndCounts+","+electCode+","+elId+"'/></td>"+
												"<td width='5%' align='center'>";
										}
										sbResult += i+1;
										sbResult += "</td><td width='10%' align='center'>"+data.item.deviceDataList[i].deviceName;
										sbResult += "</td><td width='10%' align='center'>"+data.item.deviceDataList[i].deviceType;
										sbResult += "</td><td width='10%' align='center'>"+data.item.deviceDataList[i].deviceInsideNum;
										sbResult += "</td><td width='10%' align='center'>"+data.item.totalelectric;
										sbResult += "</td><td width='10%' align='center'>"+data.item.deviceDataList[i].time15Period;
										sbResult += "</td><td width='10%' align='center'>"+data.item.deviceDataList[i].startmin;
										sbResult += "</td><td width='10%' align='center'>"+data.item.deviceDataList[i].endmin;
										sbResult += "</td><td width='10%' align='center'>"+data.item.deviceDataList[i].startEndCounts;
										sbResult += "</td><td width='10%' align='center'>"+data.item.deviceDataList[i].peakpower+"</td></tr>";
									}
								}else{
									sbResult += "<tr width='100%' height='20'><td align='center'><input type='checkbox' name='disOver' checked='checked' value='"+data.item.totalelectric+","+""+","+""+","+""+","+""+","+240+","+255+"'/></td><td width='5%' align='center'>";
									sbResult += 1;
									sbResult += "</td><td width='10%' align='center'>"+"无电器";
									sbResult += "</td><td width='10%' align='center'>"+255;
									sbResult += "</td><td width='10%' align='center'>";
									sbResult += "</td><td width='10%' align='center'>"+data.item.totalelectric;
									sbResult += "</td><td width='10%' align='center'>";
									sbResult += "</td><td width='10%' align='center'>";
									sbResult += "</td><td width='10%' align='center'>";
									sbResult += "</td><td width='10%' align='center'>";
									sbResult += "</td><td width='10%' align='center'></td></tr>";
								}
							}
							sbResult += "<tr></tr>";
							$("#formTable").append(sbResult);
						}
					}
				},
				error : function(){
					obj.taskId = [];
					$('body').stopTime('rslTimers');
					$.messager.progress('close');
					$.messager.confirm("提示",'服务器内部错误！');
					obj.isSendFinish = true;
					if(typeof obj.errorFn=='function'){
						obj.errorFn.call();
					}
				}
			});
		}
		
		 //时钟校时	
	    function timeCheckCall(){
	    	var n=0;
			var timePoint=getNowTimePoint();
			var sel = $("input[name='ids']:checked"); 
	    	if (sel.length == 0||sel.length > 1) {
		        $.messager.confirm("提示","请选择一条用户信息进行时钟校时！");
		        return false;
		    }
		    if($("#dataDate").val()==null||$("#dataDate").val()==''){
		    	$.messager.confirm("提示","日期不能为空！");
		        return false;
		    }
		    for(var i=0;i<timeStamp.length;i++){
				if($("#dataDate").val()==timeStamp[i]){
					n++;
				}
			}
			if(n==0||n>1){
				$.messager.confirm("提示","只能选择前三天之内的日期！");
		        return false;
			}
			if((timePoint<getIndex())&&($("#dataDate").val()=="<%=zcTime%>")){
				$.messager.confirm("提示","时间点不能超过当前的时间点，请重新填写或选择！");
		        return false;
			}
		    //清空召测到的数据
		    //$("#formTable").empty();
		    $.messager.progress({
				title:'提示',
				msg:'正在进行时钟校时...<input type="button" value="停止校时" onclick="cancelTask()">',
				text:''
			});
			var params = getRecodeParams();
			initCancel();
			$.ajax({
				url : '<%=basePath%>areaEnergy/createTimeCheckTask.action',
				timeout :60000,
				type : 'post',
				dataType : 'json',
				cache : false,
				data : params.join('&'),
				success : function(json){
					if(isCancel == true) {
	                   return;
	                }
					startFetchEvent1(json);
				},
				error : function(response){
					$.messager.confirm("提示",response.responseText);
				}
			});
	    }
        
	  //每隔5秒钟获取一次下发结果		
		function startFetchEvent1(obj){
			$('body').everyTime('5s',"rslTimers",function(){
				countFlag++;
				if(obj.length==0){
					//停止循环查询结果
					$('body').stopTime('rslTimers');
				}else{
					getTimeCheckResult(obj);
				}
			});
		}
	    //取得校时结果
	    function getTimeCheckResult(taskId){
	    		var params = {
					taskId : taskId
				};
	            $.ajax({
				url : '<%=basePath%>areaEnergy/getNILMTaskResult.action?checkFlag=1',
				type : 'post',
				timeout : 60000,
				dataType : 'json',
				data : params,
				cache : false,
				success : function(data){
					if(countFlag ==25 & data.msg == 'wait' ){
						$.messager.confirm("提示","任务超时！");
						cancelTask();
						countFlag =0;
					}
					if(data.msg == 'wait'){
						
					}else{
						$.messager.progress('close');
						//停止取得结果方法调用
						$('body').stopTime('rslTimers');
						if(data.flag == 0){
							$.messager.confirm("提示",'终端校时失败!');
						}else{
          		  	        $.messager.confirm("提示",data.msg);
						}
					}
				},
				error : function(){
					obj.taskId = [];
					$.messager.confirm("提示",'服务器内部错误！');
					$('body').stopTime('rslTimers');
					$.messager.progress('close');
					obj.isSendFinish = true;
					if(typeof obj.errorFn=='function'){
						obj.errorFn.call();
					}
				}
			});
	    }
		
		
		
		
		function clickCheckbox(){
			var input = $("input[name=total]");
			if(input.attr("checked")){
				$("input[name=disOver]").attr("checked",true);
			}else{
				$("input[name=disOver]").attr("checked",false);
			}
		}
		//保存数据
		function saveCallData(){
			var sel = $("input[name='disOver']:checked");
			if(sel.length==0){  
	            $.messager.alert('提示',"请选择需要保存的数据",'info'); 
	            return; 
	        }
			var callDataArr = []; 
			for(var i=0;i<sel.length;i++){
                idsObjArray = sel[i].value.split(",");
                var totalelectric = idsObjArray[0].trim();
                var time15Period = idsObjArray[1].trim();
                var startmin = idsObjArray[2].trim();
                var endmin = idsObjArray[3].trim();
                var startEndCounts = idsObjArray[4].trim();
                var electCode  = idsObjArray[5].trim();
                var elId = idsObjArray[6].trim();
                callDataArr.push({'totalelectric' : totalelectric,'time15Period':time15Period,'startmin':startmin,'endmin':endmin,'startEndCounts':startEndCounts,'electCode':electCode,'elId':elId});
	        }
            var params = getRecodeParams();
            var para = 'callDatas='+JSON.stringify(callDataArr);
            var url = "<%=basePath%>areaEnergy/saveCallData.action?"+para;
            $.ajax({
                url : url,
                type: "post",
                data : params.join('&'),
                dataType:"json",
                timeout:60000, 
                error : function (XMLHttpRequest, textStatus, errorThrown) {
           	 	     alert('程序异常');
                },
                success : function(result) {
                     $.messager.alert('提示',result.msg,'info');
                }
            });
		}
		//获取选中记录的参数信息
		function getRecodeParams(){
			var params = [];
			var areaCode = "<%=retMap.get("AREACODE")==null?"":retMap.get("AREACODE")%>";
			var commAddress ="<%=retMap.get("COMMADDRESS")==null?"":retMap.get("COMMADDRESS")%>";
			//var code = '03';
			var mpIndex='';
			var consId = '';
			var sel =  $("input[name='ids']:checked");
			for(var i=0;i<sel.length;i++){
                idsObjArray = sel[i].value.split(",");
                mpIndex = idsObjArray[0].trim();
                consId = idsObjArray[1].trim();
	        }
			var sysData="<%=zcTime %>";
			var dataTime= sysData.substr(sysData.length-8).replace("-","").replace("-","");
			var timePeriod = getIndex();
			var tmnlId = <%=retMap.get("TERMINALID")==null?"":retMap.get("TERMINALID")%>;
			var orgNo = <%=retMap.get("ORG_NO")==""?"":retMap.get("ORG_NO")%>;
			var validTimeStart = sysData+" "+$("#radio"+(timePeriod-4)).val()+":00";
			var validTimeEnd = sysData+" "+$("#radio"+(timePeriod+4)).val()+":00";
			
			params.push(componsetKV('areaCode',areaCode));
			params.push(componsetKV('commAddress',commAddress));
			params.push(componsetKV('consId',consId));
			params.push(componsetKV('mpIndex',mpIndex));
			params.push(componsetKV('dataDate',sysData));
			params.push(componsetKV('dataTime',dataTime));
			params.push(componsetKV('timePeriod',timePeriod));
			params.push(componsetKV('tmnlId',tmnlId));
			params.push(componsetKV('orgNo',orgNo));
			params.push("validTimeStart="+validTimeStart);
			params.push("validTimeEnd="+validTimeEnd);
			return params;
		}
		
		function componsetKV(key,val){
			return encodeURI(key+'='+val);
		}
		
	</script>
</html>
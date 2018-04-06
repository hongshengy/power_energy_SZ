<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>角色消息订阅</title>
		<link rel="stylesheet" href="<%=basePath%>/pages/aueicBbs/css/bbs.css"
			type="text/css"></link>
		<jsp:include page="../ext.jsp" />
		<script type="text/javascript" src="<%=basePath%>/js/jquery.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/common_client.js"></script>
		<script type="text/javascript">
		function init()
		{
			setHeight();
			window.onresize=setHeight;
		}
		function setHeight()
		{
			$("#contentList").css({"height":$(window).height()-65});
		}
		function save()
		{
			var array = new Array();
			$(".vtr").each(function(){
				var obj = new Object();
				var tds = $(this).children("td");
				for(var i=0;i<tds.length;i++)
				{
					var childs = tds[i].childNodes;
					for(var j=0;j<childs.length;j++)
					{
						if(childs[j].nodeType == 1)
						{
							if(childs[j].nodeName.toLowerCase()=="input" && childs[j].checked ==true)
							{
								if(childs[j].id.indexOf("mail") != -1)
								{
									obj.byMail = "1";
									obj.messageType = childs[j].value;
								}
								else
								{
									obj.bySms = "1";
									obj.messageType = childs[j].value;
								}
							}
							else if(childs[j].nodeName.toLowerCase()=="select") 
							{
								if(childs[j].id.indexOf("start") != -1)
								{
									obj.startTime = childs[j].options[childs[j].selectedIndex].value;
								}
								else
								{
									obj.endTime = childs[j].options[childs[j].selectedIndex].value;
								}
							}
						}
					}
				}
				if(obj.messageType != undefined)
				{
					array.push(obj);
				}
			});
			$.ajax({
			                type:"post",
			                data:"roleId=126277&param="+Ext.encode(array),
			                url:"<%=basePath%>notice/saveRoleMessageConfig.action",
			                dataType:"html",
			                success:function(result) 
			                {
			                	var obj = eval('('+result+')');
			                	if(obj.result == true)
			                	{
			                	 	Appframe.viewinfdlg.right.show('保存成功!', true);
			                	}
			                	else
			                	{
			                		Appframe.viewinfdlg.error.show('保存失败,'+obj.msg, false);
			                	}
				            }
			});
		}
		function setBackgourd(obj)
		{	
			if(obj.checked == true)
			{
				obj.parentNode.parentNode.style.background="#E4FECD";
			}
			else
			{
				if(document.getElementById(obj.id.replace("mail","sms")).checked == false)
				{
					obj.parentNode.parentNode.style.background="";
				}
			}
		}
		function smsChecked(obj)
		{
			if(obj.checked == true)
			{
				document.getElementById(obj.id.replace("sms","start")).disabled = false;
				document.getElementById(obj.id.replace("sms","end")).disabled = false;
				obj.parentNode.parentNode.style.background="#E4FECD";
			}
			else
			{
				document.getElementById(obj.id.replace("sms","start")).disabled = true;
				document.getElementById(obj.id.replace("sms","end")).disabled = true;
				if(document.getElementById(obj.id.replace("sms","mail")).checked == false)
				{
					obj.parentNode.parentNode.style.background="";
				}
			}
		}
		function startChange(obj)
		{
			var startTime = $("#"+obj.id).val();
			var endId = obj.id.replace("start","end");
			var endTime = $("#"+endId).val();
			var s = startTime.replace(":00","");
			var e = endTime.replace(":00","");
			if(parseInt(s)>parseInt(e))
			{
				Appframe.viewinfdlg.error.show('起始时间不能大于截止时间');
				obj.selectedIndex=0;
				obj.focus();
				return;
			}
		}
		function endChange(obj)
		{
			var endTime = $("#"+obj.id).val();
			var startTime = $("#"+obj.id.replace("end","start")).val();
			var s = startTime.replace(":00","");
			var e = endTime.replace(":00","");
			if(parseInt(s)>parseInt(e))
			{
				Appframe.viewinfdlg.error.show('截止时间不能小于起始时间');
				document.getElementById(obj.id.replace("end","start")).selectedIndex=0;
				return;
			}
		}
		</script>
	</head>
	<body onload="init()">
		<form name="thisform" id="thisform" method="post">
			<table border="0" cellspacing="0" cellpadding="0" class="table-total"
				style="width: 100%;margin-top:2px">
				<tr class="trtitle">
					<th class="tc pl" width="100%">
					<font size="4">角色消息订阅</font>
					</th>
				</tr>
			</table>
			<div id="contentList"
				style="width: 100%; border: #a8ecf0 1px solid; border-top: none; overflow-y: auto; overflow-x: hidden;">
				<table border="0" cellspacing="0" cellpadding="0"
					class="table-total"
					style="width:100%;height:100%;margin-top: 0px; * margin-top: 0px; _margin-top: 0px; border-top: none;">
					<tbody id="docContent">
						<c:forEach var="result" items="${resultList}"
							varStatus="status">
							<tr>
								<td class="tc pl" width="100%" colspan="5">
									<font size="2">${result.parentName}</font>
								</td>
							</tr>
							<c:forEach var="item" items="${result.children}" varStatus="itemStatus">
								<tr class="vtr" <c:if test="${item.BY_MAIL=='1' || item.BY_SMS=='1'}">style='background:#E4FECD'</c:if>>
									<td class="tc pl" width="20%">${item.TEXT }</td>
									<td class="tc pl" width="20%">
										站内信:<input type="checkbox" value="${item.ID }" id="mail${status.index+1 }${itemStatus.index+1 }" onclick="setBackgourd(this);" <c:if test="${item.BY_MAIL == '1'}">checked=true</c:if>/>
									</td>
									<td class="tc pl" width="20%">
										短信:<input type="checkbox" value="${item.ID }" id="sms${status.index+1 }${itemStatus.index+1 }" onclick="smsChecked(this)" <c:if test="${item.BY_SMS == '1'}">checked=true</c:if>/>
									</td>
									<td class="tc pl" width="20%">
										短信起始时间:<select id="start${status.index+1 }${itemStatus.index+1 }" onchange="startChange(this)" <c:if test="${item.BY_SMS != '1'}">disabled=true</c:if>>
											<option value="1:00" <c:if test="${item.START_TIME == '1:00'}">selected='selected'</c:if>>1:00</option>
											<option value="2:00" <c:if test="${item.START_TIME == '2:00'}">selected='selected'</c:if>>2:00</option>
											<option value="3:00" <c:if test="${item.START_TIME == '3:00'}">selected='selected'</c:if>>3:00</option>
											<option value="4:00" <c:if test="${item.START_TIME == '4:00'}">selected='selected'</c:if>>4:00</option>
											<option value="5:00" <c:if test="${item.START_TIME == '5:00'}">selected='selected'</c:if>>5:00</option>
											<option value="6:00" <c:if test="${item.START_TIME == '6:00'}">selected='selected'</c:if>>6:00</option>
											<option value="7:00" <c:if test="${item.START_TIME == '7:00'}">selected='selected'</c:if>>7:00</option>
											<option value="8:00" <c:if test="${item.START_TIME == '8:00'}">selected='selected'</c:if>>8:00</option>
											<option value="9:00" <c:if test="${item.START_TIME == '9:00'}">selected='selected'</c:if>>9:00</option>
											<option value="10:00" <c:if test="${item.START_TIME == '10:00'}">selected='selected'</c:if>>10:00</option>
											<option value="11:00" <c:if test="${item.START_TIME == '11:00'}">selected='selected'</c:if>>11:00</option>
											<option value="12:00" <c:if test="${item.START_TIME == '12:00'}">selected='selected'</c:if>>12:00</option>
											<option value="13:00" <c:if test="${item.START_TIME == '13:00'}">selected='selected'</c:if>>13:00</option>
											<option value="14:00" <c:if test="${item.START_TIME == '14:00'}">selected='selected'</c:if>>14:00</option>
											<option value="15:00" <c:if test="${item.START_TIME == '15:00'}">selected='selected'</c:if>>15:00</option>
											<option value="16:00" <c:if test="${item.START_TIME == '16:00'}">selected='selected'</c:if>>16:00</option>
											<option value="17:00" <c:if test="${item.START_TIME == '17:00'}">selected='selected'</c:if>>17:00</option>
											<option value="18:00" <c:if test="${item.START_TIME == '18:00'}">selected='selected'</c:if>>18:00</option>
											<option value="19:00" <c:if test="${item.START_TIME == '19:00'}">selected='selected'</c:if>>19:00</option>
											<option value="20:00" <c:if test="${item.START_TIME == '20:00'}">selected='selected'</c:if>>20:00</option>
											<option value="21:00" <c:if test="${item.START_TIME == '21:00'}">selected='selected'</c:if>>21:00</option>
											<option value="22:00" <c:if test="${item.START_TIME == '22:00'}">selected='selected'</c:if>>22:00</option>
											<option value="23:00" <c:if test="${item.START_TIME == '23:00'}">selected='selected'</c:if>>23:00</option>
											<option value="24:00" <c:if test="${item.START_TIME == '24:00'}">selected='selected'</c:if>>24:00</option>
										</select>
									</td>
									<td class="tc pl" width="20%">
										短信截止时间:<select id="end${status.index+1 }${itemStatus.index+1 }" onchange="endChange(this)" <c:if test="${item.BY_SMS != '1'}">disabled=true</c:if>>
											<option value="24:00" <c:if test="${item.END_TIME == '24:00'}">selected='selected'</c:if>>24:00</option>
											<option value="23:00" <c:if test="${item.END_TIME == '23:00'}">selected='selected'</c:if>>23:00</option>
											<option value="22:00" <c:if test="${item.END_TIME == '22:00'}">selected='selected'</c:if>>22:00</option>
											<option value="21:00" <c:if test="${item.END_TIME == '21:00'}">selected='selected'</c:if>>21:00</option>
											<option value="20:00" <c:if test="${item.END_TIME == '20:00'}">selected='selected'</c:if>>20:00</option>
											<option value="19:00" <c:if test="${item.END_TIME == '19:00'}">selected='selected'</c:if>>19:00</option>
											<option value="18:00" <c:if test="${item.END_TIME == '18:00'}">selected='selected'</c:if>>18:00</option>
											<option value="17:00" <c:if test="${item.END_TIME == '17:00'}">selected='selected'</c:if>>17:00</option>
											<option value="16:00" <c:if test="${item.END_TIME == '16:00'}">selected='selected'</c:if>>16:00</option>
											<option value="15:00" <c:if test="${item.END_TIME == '15:00'}">selected='selected'</c:if>>15:00</option>
											<option value="14:00" <c:if test="${item.END_TIME == '14:00'}">selected='selected'</c:if>>14:00</option>
											<option value="13:00" <c:if test="${item.END_TIME == '13:00'}">selected='selected'</c:if>>13:00</option>
											<option value="12:00" <c:if test="${item.END_TIME == '12:00'}">selected='selected'</c:if>>12:00</option>
											<option value="11:00" <c:if test="${item.END_TIME == '11:00'}">selected='selected'</c:if>>11:00</option>
											<option value="10:00" <c:if test="${item.END_TIME == '10:00'}">selected='selected'</c:if>>10:00</option>
											<option value="9:00" <c:if test="${item.END_TIME == '9:00'}">selected='selected'</c:if>>9:00</option>
											<option value="8:00" <c:if test="${item.END_TIME == '8:00'}">selected='selected'</c:if>>8:00</option>
											<option value="7:00" <c:if test="${item.END_TIME == '7:00'}">selected='selected'</c:if>>7:00</option>
											<option value="6:00" <c:if test="${item.END_TIME == '6:00'}">selected='selected'</c:if>>6:00</option>
											<option value="5:00" <c:if test="${item.END_TIME == '5:00'}">selected='selected'</c:if>>5:00</option>
											<option value="4:00" <c:if test="${item.END_TIME == '4:00'}">selected='selected'</c:if>>4:00</option>
											<option value="3:00" <c:if test="${item.END_TIME == '3:00'}">selected='selected'</c:if>>3:00</option>
											<option value="2:00" <c:if test="${item.END_TIME == '2:00'}">selected='selected'</c:if>>2:00</option>
											<option value="1:00" <c:if test="${item.END_TIME == '1:00'}">selected='selected'</c:if>>1:00</option>
										</select>
									</td>
								</tr>
							</c:forEach>
						</c:forEach>
					</tbody>
				</table>
			</div>
			<div style="width: 100%; text-align:center; border: #a8ecf0 1px solid; border-top: none; overflow-y: auto; overflow-x: hidden;">
				<button type="button" class="bbsBtn23" id="saveBtn" onclick="save();" onfocus="this.blur();" tabindex="3" name="bottom">保存</button>
				&nbsp;
				<button type="button" class="bbsBtn23" id="cancelBtn" onclick="window.close()" onfocus="this.blur();" tabindex="4" name="bottom">取消</button>
			</div>
		</form>
	</body>
</html>

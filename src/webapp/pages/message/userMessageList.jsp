<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="com.frontier.framework.model.UserInfo"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
UserInfo info = (UserInfo)request.getSession().getAttribute("userInfo");
long orgNo = info.getUserWorkOrgId();
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <jsp:include page="/pages/common/head.jsp" />
    <jsp:include page="/ext.jsp" />
    <title>系统信息</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<style >
		.czhover{
			text-decoration: underline;
			color:blue;
			cursor:pointer;
		}
		.czout{
			text-decoration: none;
			color:blue;
			cursor:pointer;
		}
	</style>
	<script type="text/javascript">
		Ext.onReady(function(){
			new Ext.form.DateField({
				width:100,
				id:'startTime',
				format:'Y-m-d',
				invalidText:'请输入有效的日期',
				value:new Date(),
				renderTo:'start'
			});
			new Ext.form.DateField({
				width:100,
				id:'endTime',
				invalidText:'请输入有效的日期',
				format:'Y-m-d',
				value:new Date(),
				renderTo:'end'
			});
			var startDate = "${startTime}";
			var endDate = "${endTime}";
			if(endDate == "")
			{
				endDate = new Date(new Date().getTime());
			}
			Ext.getCmp("startTime").setValue(startDate);
			Ext.getCmp("endTime").setValue(endDate);
		});
	// 自适应高度调整 
		    function setDataGridHeight() 
		    {
		       		var scrollHeight = this.document.body.scrollHeight;
		       		var gridHeight;
		       		if (scrollHeight != 0) 
		       		{
		        		gridHeight = $(window).height() - 130;
				        $(".dataGrid:first").parent().css("height",gridHeight).parent().parent().parent().parent().height(gridHeight + 30);
		       		} 
		       		else 
		       		{
		       			scrollHeight =  top.document.body.scrollHeight - 147 - 159;
		       			
		       			gridHeight = scrollHeight -130 ;
				        $(".dataGrid:first").parent().css("height",gridHeight).parent().parent().parent().parent().height(gridHeight + 30);
		       		}
		    }	
		    
		    window.onload = window.onresize = function()
			{
				setTimeout('setDataGridHeight();',100);
				init();
			}
			function onClickTab(tabId)
			{
				var status = "";
				if(document.getElementById("status") != undefined)
			    {
			        status = document.getElementById("status")[document.getElementById("status").selectedIndex].value;
			    }
			    var startTime = "";
			    if(Ext.getCmp('startTime') != undefined && "${isSms}" != "true")
			    {
			    	startTime = Ext.getCmp('startTime').getRawValue();
			    }
			    var endTime = "";
			    if(Ext.getCmp('endTime') != undefined && "${isSms}" != "true")
			    {
			    	endTime = Ext.getCmp('endTime').getRawValue();
			    }
			    if(tabId == "tbl_1")
				{
				    document.getElementById("tb1").className  = "subMenu_hover";
				    document.getElementById("tb2").className  = "subMenu_normal";
				    document.getElementById("tb3").className  = "subMenu_normal";
					window.location.href="<%=basePath%>message/queryUserMailList.action?level=1&status="+status+"&startTime="+startTime+"&endTime="+endTime;
				}
				else if(tabId == "tbl_2")
				{
				    document.getElementById("tb1").className  = "subMenu_normal";
				    document.getElementById("tb2").className  = "subMenu_hover";
				    document.getElementById("tb3").className  = "subMenu_normal";
					window.location.href="<%=basePath%>message/queryUserMailList.action?level=2&status="+status+"&startTime="+startTime+"&endTime="+endTime;
				}
				else if(tabId == "tbl_3")
				{
				    document.getElementById("tb1").className  = "subMenu_normal";
				    document.getElementById("tb2").className  = "subMenu_normal";
				    document.getElementById("tb3").className  = "subMenu_hover";
					window.location.href="<%=basePath%>message/queryUserMailList.action?level=3&status="+status+"&startTime="+startTime+"&endTime="+endTime;	    
				}
				else if(tabId == "tbl_4")
				{
				    document.getElementById("tb1").className  = "subMenu_normal";
				    document.getElementById("tb2").className  = "subMenu_normal";
				    document.getElementById("tb3").className  = "subMenu_normal";
				    document.getElementById("tb4").className  = "subMenu_hover";
					window.location.href="<%=basePath%>message/querySendedSms.action";	    
				}
			}
			function search()
			{
				if(!Ext.getCmp('startTime').validate() || !Ext.getCmp('endTime').validate())
				{
					MessageBox('请输入有效的日期!');
					return;
				}
					var startTime = Ext.getCmp('startTime').getRawValue();
			        var endTime = Ext.getCmp('endTime').getRawValue();
			        if(startTime != "")
			        {
						if(new Date(startTime.split("-")[0],startTime.split("-")[1],startTime.split("-")[2])>new Date(endTime.split("-")[0],endTime.split("-")[1],endTime.split("-")[2]))
						{
							MessageBox('开始日期不能大于截止日期!');
							return;
						}			        	
			        }
					if("${isSms}" == "true")
					{
						window.location.href="<%=basePath%>message/querySendedSms.action?&startTime="+startTime+"&endTime="+endTime;	
					}
					else
					{
						var status = status = document.getElementById("status")[document.getElementById("status").selectedIndex].value;
						window.location.href="<%=basePath%>message/queryUserMailList.action?level=${level}&status="+status+"&startTime="+startTime+"&endTime="+endTime;						
					}
			}
			function overOrRepManage(startDate,endDate,subExcepTypeCode,orgNo) 
			{
				var str = "?queryPara.startDate="+startDate+"&queryPara.endDate="+endDate+"&queryPara.subExcepTypeCode="+subExcepTypeCode+"&queryPara.orgNo="+orgNo;
				var url = "<%=basePath%>chkunitManage/toInitOverOrRepManage.action"+str;
				OpenWin(encodeURI(url),"超载重载列表查询",800,532);
			}
			
			function setStatus(id,status,startDate,endDate,subExcepTypeCode,bigExcepTypeCode,orgNo,level)
			{
				//重载事件,超载事件
				var url = "";
				if(subExcepTypeCode == "314" || subExcepTypeCode == "312" || subExcepTypeCode == "313")
				{
					overOrRepManage(startDate,endDate,subExcepTypeCode,orgNo);
				}
				else if(subExcepTypeCode == "3140")
				{
					url = "<%=basePath%>pages/basicApp/collectDataManage/basicApp_release_count_main_area.jsp?cond_mrMode=307&orgNo="+orgNo+"&beginTime="+startDate+"&endTime="+endDate;
					OpenWin(encodeURI(url),"抄收质量管理",950,532);
				}
				else
				{
					 if(subExcepTypeCode.length == 3) 
					 {
					   	 url = "<%=basePath%>pages/runManage/eventMonitor/detail/excepDetail.jsp?startDate="+startDate+"&endDate="+endDate+"&subExcepTypeCode="+subExcepTypeCode+"&bigExcepTypeCode="+bigExcepTypeCode+"&orgNo="+orgNo;
					 } 
					 else if(subExcepTypeCode.length == 4)
					 {
					   	 url = "<%=basePath%>/pages/aueicMonitor/alarm/alarmManageMain.jsp?subExcepTypeCode="+subExcepTypeCode;
					 }
					 OpenWin(url,"处理消息",950,495);
				}
				var e = window.event;
				var parentTd;
				if(e != undefined)
				{
					parentTd = e.srcElement.parentNode;
				}
				if(status == "0")
				{
				   $.ajax({
			                type:"post",
			                data:"eventId="+id+"&level="+level,
			                url:"<%=basePath%>message/setStatus.action",
			                dataType:"html",
			                success:function(result) 
			                {
								if(parentTd.nodeName == "TD")
								{
									parentTd.previousSibling.innerHTML="已读";
								}
				            }
				   });
				}
			}
			function init()
			{
				//隐藏全表排序前面的checkbox
				$("input[name=allSort]").css("display","none");
				//隐藏全表排序
				$("input[name=allSort]").parent().next().css("display","none");
				var status = "${status}";
				if(document.getElementById("status") == undefined)
				{
					return;
				}
				var options = document.getElementById("status").options;
				if(status == "")
				{
					options[0].selected = true;
				}
				else if(status == "0")
				{
					options[1].selected = true;
				}
				else if(status == "1")
				{
					options[2].selected = true;
				}
			}
	</script>
  </head>
  <body scroll="no" style="background-color:white">
  	<form name="tabform" id="tabform" method="post" action="<%=basePath %>notice/getNoticeListByLevel.action" style="display:inline;">
		<!-- table标签开始  -->
        <table style="background-color: white;width:100%;">
	        <tr>
		        <td style="padding-top: 5px;">
		          <table cellspacing="0" cellpadding="0" border="0" align="left">
			          <tbody>
			           <tr>
					    <td id="tb1" <c:if test='${level == 1 }'>class="subMenu_hover"</c:if><c:if test='${level != 1 }'>class="subMenu_normal"</c:if> style="cursor:pointer"><a href="javascript:onClickTab('tbl_1');"><font color="black">严重信息</font></a></td>
					    <td id="tb2" <c:if test='${level == 2 }'>class="subMenu_hover"</c:if><c:if test='${level != 2 }'>class="subMenu_normal"</c:if> style="cursor:pointer"><a href="javascript:onClickTab('tbl_2');"><font color="black">一般信息</font></a></td>
					    <td id="tb3" <c:if test='${level == 3 }'>class="subMenu_hover"</c:if><c:if test='${level != 3 }'>class="subMenu_normal"</c:if> style="cursor:pointer"><a href="javascript:onClickTab('tbl_3');"><font color="black">提示信息</font></a></td>
					    <td id="tb4" <c:if test='${empty level}'>class="subMenu_hover"</c:if><c:if test='${!empty level}'>class="subMenu_normal"</c:if> style="cursor:pointer"><a href="javascript:onClickTab('tbl_4');"><font color="black">短信历史记录</font></a></td>
			           </tr>
			          </tbody>
			      </table>
			    </td>
	        </tr>
        </table>
	  	<!-- table标签结束  -->
	</form>
		<form id="thischildform" name="thischildform" method="post" style="display:inline;">
			<table width="100%" cellspacing="0" cellpadding="0" border="0" >
				<tbody>
						<tr>
							<td>
								<table id="tgInfoTbl" width="100%" cellspacing="0" cellpadding="0" border="0" class="message">
									<tr style="height:30px;">
										<td>
											<table width="100%" cellspacing="0" cellpadding="0" border="0">
												<tr>
														<c:if test="${isSms != true}">
															<td width="4%;">
																<span style="padding-left:10px;padding-right:5px;">状态:</span>
															</td>
															<td width="10%;">
																<select id="status">
																	<option value="">全部</option>
																	<option value="0">未读</option>
																	<option value="1">已读</option>
																</select>
															</td>
														</c:if>
														<td width="7%;">
															<span style="padding-left:10px;padding-right:5px;">开始日期:</span>
														</td>
														<td align="left" width="10%;">
															<div id="start"></div>
														</td>
														<td width="7%;">
															<span style="padding-left:10px;padding-right:5px;">截止日期:</span>
														</td>
														<td align="left" width="10%;">
															<div id="end"></div>
														</td>
														<td width="48%;">
															<input type="button" class="btn1_mouseout" onmouseover="this.className='btn1_mouseover'" onmouseout="this.className='btn1_mouseout'" value="查询" onclick="search();">
														</td>
												<tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					<tr>
						<td class="contentBoxUp" style="padding-top:0px;">
							<table width="100%" cellspacing="0" cellpadding="0" border="0">
								<tr>
									<td>
										<table width="100%" cellspacing="0" cellpadding="0" border="0">
											<tr valign="top">
												<div style="background-color: #f8f8f8">
													<c:if test="${isSms != true}">
														<fpus:DataGrid form="thischildform"
															action="/message/queryUserMailList.action" title="查询结果"
															var="dataShow" items="${messageList}">
															<fpus:Col title="信息内容" width="48%" subStr="35"
																value="${dataShow.MESSAGE_CONTENT}"/>
															<fpus:Col title="信息类型" width="28%"
																value="${dataShow.MESSAGE_NAME}" />
															<fpus:Col title="信息日期" width="10%"
																value="${fn:substring(dataShow.MESSAGE_TIME,0,10)}" />
															<fpus:Col title="状态" width="7%"
																value="${dataShow.STATUS_NAME}" />
															<fpus:Col title="操作" width="7%"
																html="true" value="<span onclick='setStatus(\"${dataShow.EVENT_ID }\",\"${dataShow.STATUS }\",\"${fn:substring(dataShow.MESSAGE_TIME,0,10)}\",\"${fn:substring(dataShow.MESSAGE_TIME,0,10)}\",\"${dataShow.MESSAGE_TYPE}\",\"${fn:substring(dataShow.MESSAGE_TYPE,0,1)}\",\"${dataShow.ORG_NO}\",\"${dataShow.MESSAGE_LEVEL}\")' class='czout' onmouseout='this.className=\"czout\"' onmouseover='this.className=\"czhover\"'>查看</span>" />
														</fpus:DataGrid>
													</c:if>
													<c:if test="${isSms == true}">
														<fpus:DataGrid form="thischildform"
															action="/message/querySendedSms.action" title="查询结果"
															var="dataShow" items="${smsList}">
															<fpus:Col title="短信内容" width="76%" subStr="57"
																value="${dataShow.MESSAGE_CONTENT}"/>
															<fpus:Col title="生成时间" width="12%"
																value="${fn:substring(dataShow.MESSAGE_TIME,0,10)}" />
															<fpus:Col title="手机号" width="12%"
																value="${dataShow.MOBILE_NUMBER}" />
														</fpus:DataGrid>
													</c:if>
												</div>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</body>
</html>
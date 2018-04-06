<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@page import="com.frontier.pubmodule.AueicUtil"%>
<%@ taglib uri="/fpus-tags" prefix="fpus"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    Long nowRoleId = Long.parseLong((String) session.getAttribute("roleId"));
    String orgNo = AueicUtil.getPorgNoByRole(nowRoleId).toString();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <base href="<%=basePath%>">
        <title>网荷互动终端用户档案管理</title>
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="expires" content="0">
        <jsp:include page="/pages/common/componentBase.jsp" />
        <jsp:include page="/pages/common/head.jsp" />
        <jsp:include page="/ext.jsp"/>
		<script type="text/javascript" src="<%= basePath%>/js/common/selectComponent_MultiSelect.js"></script>
        <script type="text/javascript">
            $(function(){
                window.onresize = function (){
                    setTimeout('setDataGridHeight();',100);
                };
                init();
                show();
            });
                        //页面初始化
            function init(){
                //window.onresize = reszieFun;
                document.getElementById("orgNo").value="<%=orgNo%>";
                showWaitDisplayForQuery('<%=basePath%>','正在加载页面...');
                //设置初始化查询标志
                document.getElementById("initFlag").value="true";
                document.thisform.action="<%=basePath%>grid/queryConsList.action?funcId="+'${param.funcId}'+'&roleId='+'${param.roleId}';
                document.thisform.target="bodyFrame";
                document.thisform.submit();
            }
            function reszieFun() {
                setTimeout('setDataGridHeight();',100);
            }
            function setDataGridHeight() {
                var ifmWin = window.frames["bodyFrame"];
                if (ifmWin != undefined && ifmWin.setDataGridHeight != undefined) {
                    ifmWin.setDataGridHeight();
                    return;
                } else {
                    setTimeout('setDataGridHeight();',100);
                }
            }
            
            function query(queryFlag){
                //设置初始化查询标志
                document.getElementById("initFlag").value="";
                
                //设置是条件查询还是精确查询-标识？
                document.getElementById("queryFlag").value = queryFlag;
                var orgNo = document.getElementById('orgNo').value;
                if(orgNo == ""){
                   MessageBox('请选择供电单位!');
                   return;
                }
                //普通查询时 供电单位要市级及以下
                if(queryFlag=='0'){
                    //if(document.getElementById("includeFlag").checked==true&&$("#orgNo").attr("value").length<7){
                    //    MessageBox("请选择市区/县供电单位！","系统提示", "images/img/icon_error.gif", MB_OK);
                    //   return;
                    //}
                    /*if($("#orgNo").attr("value") == '32101'){
                        MessageBox("请选择市级或以下供电单位！","系统提示", "images/img/icon_error.gif", MB_OK);
                       return;
                    }*/
                }
                showWaitDisplayForQuery('<%=basePath%>');
                document.thisform.action='<%=basePath%>grid/queryConsList.action?queryFlag='+queryFlag+'&funcId='+'${param.funcId}'+'&roleId='+'${param.roleId}';
                document.thisform.target="bodyFrame";
                document.thisform.submit();
            }
            
            //checkBox 选择
            function selectChk(obj) {
               if(obj.value == "0" || obj.value == "") {
                    obj.value = "1";
               } else {
                    obj.value = "";
               }
           }
           
           //精确查询提示 失去焦点
           function show(){
              //alert($("input[name='queryPara.consName']").val());
              if($("input[name='queryPara.exactSel']").val()==""){
                  //alert($("input").val());
                  $("input[name='queryPara.exactSel']").val("户号/表号/终端资产号/大客户经理号码/控制IP/抄表IP");
                  $("input[name='queryPara.exactSel']").css('color','#C0C0C0');
              }
           }
           
           //焦点聚焦
           function focusEvent(){
              //$("input[name='queryPara.consName']").val()="";
              if($("input[name='queryPara.exactSel']").val()=="户号/表号/终端资产号/大客户经理号码/控制IP/抄表IP"){
                   document.getElementById("exactSel").value="";
                   $("input[name='queryPara.exactSel']").css('color','black');
              }else{
                   $("input[name='queryPara.exactSel']").css('color','black');
              }
           }
           
            // exact 精确查询： terminal 终端资产号；assetNo 电表局编号； gprsCode SIM卡号
            function enterFun() {
                if (event.keyCode==13) {
                    if (isNullOrEmpty($('#exactSel').val())) {
                        MessageBox("精确查询，请输入精确查询的内容！","系统提示", E_ICON, MB_OK);  
                        return;
                    }
                    query(3);
                }
                return;
            }
            
            function selectOrgNO(){
                if($("#orgNo").attr("value").length==7){
                    document.getElementById("checkFlag").style.display = "none";
                    var value = document.getElementById("includeFlag").value;
                    if(value == "1"){
                        //selectChk(document.getElementById("includeFlag"));
                        document.getElementById('includeFlag').click(); 
                    }
                }else if($("#orgNo").attr("value").length<7){
                    var value = document.getElementById("includeFlag").value;
                    if(value == ""){
                        document.getElementById('includeFlag').click(); 
                    }
                    document.getElementById("checkFlag").style.display = "block";
                    
                }
            }
            
            //测点模板展示
           function shemaShow(){
               var url = '<%=basePath%>'+'grid/queryMpSchemaList.action';
               OpenWin(url,'测点',1050,600);
           }
        </script>
    </head>

    <body style="overflow: hidden;" scroll="no">
        <input type="hidden" id="pageSize">
        <form id="thisform" name="thisform" target="bodyFrame" method="post">
            <input type="hidden" id="initFlag" name="queryPara.initFlag" value=""/>
            <input type=hidden id="queryFlag" name="queryPara.queryFlag"
                value="">
            <input type="hidden" id="dataCollItem" name="queryPara.period" value="01"/>
            <div style="position: absolute; border: 0; width: 100%; height: 100%; overflow: hidden;">
                <table width="100%" height="100%" cellspacing="0" cellpadding="0"
                    border="0" class="content">
                    <tbody valign="top">
                        <tr>
                            <td class="contentBoxUp">
                                <table width="100%" cellspacing="0" cellpadding="0" border="0"
                                    class="message">
                                    <tbody>
                                        <tr>
                                            <td class="messageHead">
                                                查询条件
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="messageList" width="100%">
                                                <table width="100%" cellspacing="0" cellpadding="0"
                                                    border="0">
                                                    <tr>
                                                        <td class="messageList_text" align="right" nowrap="nowrap">
                                                            供电单位
                                                        </td>
                                                        <td width="15%">
                                                          <table>
                                                            <tr>
                                                                <td width="15%"><!--
                                                                    <fpus:ComboboxTree value="<%=orgNo%>" width="123" id="orgNo" hiddenName="queryPara.orgNo" treeType="USER_ORG_SUO" />
                                                                -->
                                                                    <fpus:ComboboxTree hiddenName="queryPara.orgNo"
			                                                                width="123" value="<%=orgNo%>"
			                                                                treeType="USER_ORG" id="orgNo" select="selectOrgNO"></fpus:ComboboxTree>
                                                                </td>
                                                                <td id="checkFlag" style="text-align:left" class="messageList_text" nowrap="nowrap">
                                                                    &nbsp;&nbsp;包含下级
                                                                    <input type="checkbox" id="includeFlag"
                                                                           onclick="selectChk(this);"
                                                                         name="queryPara.includeFlag" value="1" checked />
                                                                </td>
                                                            </tr>
                                                          </table>
                                                        
                                                        </td>
                                                        <td class="messageList_text" align="right"  nowrap="nowrap">
                                                            运行状态
                                                        </td>
                                                        <td width="25%">
                                                            <fpus:CodeCombobox id="runStatusCode" hiddenName="queryPara.runStatusCode"
                                                                    width="123" codeSortCode="21028"  value=""/>
                                                        </td>
                                                        <td class="messageList_text" align="right"  nowrap="nowrap">
                                                           终端类型
                                                        </td>
                                                        <td width="25%">
                                                           <fpus:Combobox id="id" hiddenName="queryPara.id" width="123" value="01" 
                                                                  data="[['网荷互动终端','01']]"  />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="messageList_text" align="right"  nowrap="nowrap">
                                                            参与计算
                                                        </td>
                                                        <td width="25%">
                                                            <fpus:Combobox hiddenName="queryPara.calcFlag" width="123"  
                                                                  data="[['请选择',''],['是','1'],['否','0']]"  />
                                                        </td>
                                                        <td class="messageList_text" align="right"  nowrap="nowrap">
															所属工期
														</td>
														<td width="25%">
															<table id="showCmbJCDB1Table" cellspacing="0" cellpadding="0" border="0" align="left" style="display:block">
																<tr>
																	<td>
																		<div id="showCmbJCDB1" style="display: block;"></div>
																	</td>
																</tr>
															</table>
														</td>
														<td class="messageList_text" align="right"  nowrap="nowrap">
                                                            参数状态
                                                        </td>
                                                        <td width="25%">
                                                            <fpus:Combobox hiddenName="queryPara.confStatus" width="123"  
                                                                  data="[['请选择',''],['未下发','0'],['已下发','1']]"  />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="messageList_text" align="right"  nowrap="nowrap">
                                                            精确查询
                                                        </td>
                                                        <td width="25%">
                                                            <input type="text" size="50" id="exactSel" name="queryPara.exactSel" value="" onblur="show()" onfocus="focusEvent()" 
                                                            onkeyup="shieldInput();enterFun()">
                                                        </td>
                                                        <td class="messageList_text" align="right"  nowrap="nowrap">
                                                            在线状态
                                                        </td>
                                                        <td width="25%">
                                                           <fpus:Combobox id="onlineStatus" hiddenName="queryPara.onlineStatus" width="123" value="" 
                                                                  data="[['请选择',''],['在线','1'],['不在线','0']]"  />
                                                        </td>
														<td class="messageList_text" align="right" nowrap="nowrap">
															用户属性
														</td>
														<td width="25%">
															<fpus:CodeCombobox width="123" id="userProperty"
																hiddenName="queryPara.userProperty" codeSortCode="83005" />
														</td>
													</tr>
                                                    <tr>
                                                        <td width="100%" colspan="6" align="center">
                                                            <input onClick="query('0');" type="button" class="btn1_mouseout" onmouseover="this.className='btn1_mouseover'" onmouseout="this.className='btn1_mouseout'" name="btnQuery" value="查询" />
                                                        	<input onClick="stat();" type="button" class="btn1_mouseout" onmouseover="this.className='btn1_mouseover'" onmouseout="this.className='btn1_mouseout'" name="btnStat" value="统计" />
                                                        	<input onClick="shemaShow();" type="button" class="btn1_mouseout" onmouseover="this.className='btn1_mouseover'" onmouseout="this.className='btn1_mouseout'" name="btnQuery" value="测点模板" />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td valign="top">
                                            <iframe name="bodyFrame" id="bodyFrame" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </body>
    <script type="text/javascript">
    	//统计
    	function stat(){
    		var url = "<%=basePath%>grid/initTmnlStat.action?orgNo="+$("#orgNo").val();
			OpenWin(url,'网荷互动建档统计',1000,550);
    	}
    	
    	//工期
 		new gdc.component.select.MultiSelect({
			triggerAction:'all',
			store:new Ext.data.SimpleStore({
				fields: ['name','value'],
				data:[['一期','01'],['二期','02'],['三期','03'],['四期','04'],['五期','05']]
			}),
			mode:'local',
			valueField:'value',
			displayField:'name',
			emptyText:'请选择',
			value:'01',
			loadingText:'正在加载',
			editable:false,
			resizable:true,
			id:"showCmbJCDB1ext",
			renderTo:'showCmbJCDB1', 
			width :140,
			listeners:{
				blur:function(){
					if(this.value) {
						document.getElementById('dataCollItem').value = this.value;
					}
				}
			}
		});
    </script>
</html>

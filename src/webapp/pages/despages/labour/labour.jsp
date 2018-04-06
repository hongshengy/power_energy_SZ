<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
	String baseUrl  = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages/common";
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	UserInfo info = (UserInfo)session.getAttribute("userInfo");	
	session.setAttribute("itemCode","des_gdgl");
    session.setAttribute("itemName","工单管理");
    
    String subsId = request.getParameter("subsId");
    String ywType = request.getParameter("ywType");
    
    String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
    
%> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
<head>
 	<meta charset="UTF-8"/>
    <title>工单管理</title>
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/lightbox/dist/css/lightbox.min.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=pagePath%>/webuploader-0.1.5/webuploader.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>	
<body style="height:100%;overflow: hidden">
<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>
<style>
   #gdgl-panel{
        width: 100%;
        height: 100%;
        background: #ffffff;
    }

    #gdgl-panel select{
        width: 120px;
    }

    #gdgl-panel input{
        width: 116px;
    }

    #gdgl-panel .gjxx_panel{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 30%;
    }
    
    #gdgl-panel .jxgd_panel{
        position: absolute;
        top: 30%;
        left: 0;
        right: 0;
        height: 30%;
    }

    #gdgl-panel .map_panel{
        position: absolute;
        top: 60%;
        left: 0;
        bottom: 0;
        right: 0;
        height: 40%;
    }

    #gdgl-panel .gjxx_panel table{
        width: 100%;
        border-collapse: collapse;
    }

    #gdgl-panel .gjxx_panel table th{
        padding: 8px 0;
        text-align: center;
        border-bottom: 1px solid #ebebeb;
    }

    #gdgl-panel .gjxx_panel table td{
        padding: 5px;
        text-align: center;
    }
    
    #gdgl-panel .jxgd_panel table{
        width: 100%;
        border-collapse: collapse;
    }

    #gdgl-panel .jxgd_panel table th{
        padding: 8px 0;
        text-align: center;
        border-bottom: 1px solid #ebebeb;
    }

    #gdgl-panel .jxgd_panel table td{
        padding: 5px;
        text-align: center;
    }

    #gdgl-panel .form-table .td-label{
        width: 60px;
    }

    #gdgl-panel .form-table .td-value{
        width: 140px;
    }

    #gdgl-panel .form-table .td-fillwidth{
        width: 20px;
    }

    #gdgl-panel .moreButton-style{
        padding: 5px 10px;
        border-radius: 5px;
    }

    #gdgl_gridviewDetailDialog .detailView-panel,
    #gdgl-panel .detailView-panel{
        padding: 8px 10px;
    }

    #gdgl-panel .detailView-panel {
        background-color: #f4f4f4;
    }

    #gdgl_gridviewDetailDialog .detailView-panel .td-value,
    #gdgl-panel .detailView-panel td{
        border: none;
    }

    #gdgl_gridviewDetailDialog .detailView-panel .td-label,
    #gdgl-panel .detailView-panel .td-label{
        /*width: 80px;*/
    }

    #gdgl_gridviewDetailDialog .detailView-panel .td-value,
    #gdgl-panel .detailView-panel .td-value{
        padding: 5px 0;
        /*width: 130px;*/
    }

    #gdgl_gridviewDetailDialog .lightImage{
        margin: 0 8px;
        position: relative;
        display: inline-block;
    }

    /* #gdgl_gridviewDetailDialog .deleteIcon{
        position: absolute;
        right: -8px;
        width: 20px;
        height: 20px;
        background-color: #fd513a;
        color: #fff;
        border-radius: 2px;
        display: inline-block;
        text-align: center;
        font-size: 14px;
    }

    #gdgl_gridviewDetailDialog .deleteIcon:hover{
        background-color: #ee160d;
    } */
    #tabb ul{
        padding-left:0px;
    }

    #confirmForm-table .td-label{
        width: 100px;
    }
    
    #gdgl-panel table{
        font-size:12px;
    }
    
    #gdgl_gridviewDetailDialog .detailView-panel table{
        font-size:12px;
    }
    /* #text{
    	white-space:nowrap;
    	overflow:hidden;
    	text-overflow: ellipsis;
    	
    } */
.deleteIcon{
    position: relative;
   /*  right: -8px; */
    top : -52px;
    left : -8px;
    width: 20px;
    height: 20px;
    background-color: #fd513a;
    color: #fff;
    border-radius: 2px;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
}
.deleteIcon:hover{
    background-color: #ee160d;
}
</style>
<div id="gdgl-panel" class="easyui-layout">
    <div id="west" data-options="region:'east',border:false" style="width:260px; position: relative;overflow: hidden;">
        <div class="gjxx_panel container-shadow">
            <div class="easyui-panel" title="告警信息" style="width: 100%;height: 100%;">
                <table>
                	<tbody>
                		<tr>
                			<th style="width:30px;">序号</th>
                			<th style="width: 50px;">工单号</th>
                			<th>告警详情</th>
                		</tr>
                	</tbody>
                </table>
                <div id="tabb"></div>
            </div>
        </div>
        <div class="jxgd_panel container-shadow">
        	<div class="easyui-panel" title="进行工单" style="width: 100%;height: 100%;">
        		<table>
        			<tbody>
        				<tr>
        					<th style="width:30px;">序号</th>
        					<th style="width: 50px;">工单号</th>
        					<th style="width: 60px;">紧急程度</th>
        					<th>当前状态</th>
        				</tr>
        			</tbody>
        		</table>
        		<div id="tabb1"></div>
        	</div>
        </div>
        <div class="map_panel container-shadow">
            <div id="gdMap" class="easyui-panel" title="地图" style="width: 100%;height: 100%">
            </div>
        </div>
    </div>
    <%-- <%=shownRightStyle%> --%>
    
    <div class="easyui-layout" data-options="region:'center',border:false">
        <div data-options="region:'north',border:false" style="width: 100%;height: 42px; overflow: hidden; margin: 10px 0 0 10px;">
            <div class="toggleLabel-panel">
                <a href="#" class="easyui-linkbutton" data-options="width:120,toggle:true,group:'g2',plain:true,selected:true" onclick="checkValue('');">待办工单</a>
                <a href="#" id="historyGd" class="easyui-linkbutton" data-options="width:120,toggle:true,group:'g2',plain:true" onclick="checkValue('7');">历史工单</a>
            </div>
        </div>
        
        <div data-options="region:'center',border:false" style="padding: 0px 10px 10px 10px;overflow: hidden;">
            <div class="container-shadow " style="width: 100%;height: 100%;display: block;">
                <div class="easyui-panel " style="width: 100%;height: 100%; position: relative;">
                    <div class="container-marginTop" style="padding-left: 10px;">
                        <table class="form-table">
                            <tbody>
                            <tr>
                                 <td class="td-label" style="width: 60px;">工单编号：</td>
                                <td >
                                    <input class="easyui-textbox" id="wnNo">
                                </td>
                                <!-- <td class="td-fillwidth"></td> -->
                                <td class="td-label" style="width: 60px;">派发时间：</td>
                                <td colspan="8">
                                    <select class="easyui-combobox" id="searchTime" data-options="prompt:'请选择',panelHeight:'auto',editable:false">
                                    	<option value="0" selected="selected">请选择</option>
                                        <option value="1">一天内</option>
                                        <option value="2">两天内</option>
                                        <option value="3">三天内</option>
                                        <option value="4">最近一周</option>
                                        <option value="5">其他</option>
                                    </select>
                                    <span id="datePicker_panel" style="display: none; margin-left: 8px;">
                                        <span style="margin-right: 8px">选择时间：</span>
                                        <input type="text" class="easyui-datebox" data-options="editable:false" id="startTime"/>
                                        <span style="margin-left: 15px;margin-right: 30px;">~</span>
                                        <input type="text" class="easyui-datebox" data-options="editable:false" id="endTime"/>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td class="td-label" style="width: 60px;">派发人：</td>
                                <td >
                                    <input class="easyui-textbox" id="sndPers" >
                                </td>
                                <!-- <td class="td-fillwidth"></td> -->
                                <td class="td-label" style="width: 60px;">工单类型：</td>
                                <td>
                                	<input id="labourType" class="easyui-combobox" data-options="panelHeight:'auto',editable:false">
                                	
                               	   <!-- <select class="easyui-combobox" id="labourType" data-options="panelHeight:'auto',editable:false">
                                        
                                   </select> -->
                                </td>
                                <!-- <td class="td-fillwidth"></td> -->
                                <td class="td-label" style="width: 60px;">紧急程度：</td>
                                <td >
                                    <select class="easyui-combobox" id="wnGrade" data-options="prompt:'请选择',panelHeight:'auto',editable:false">
                                    </select>
                                </td>
                                <!-- <td class="td-fillwidth"></td> -->
                                <td class="td-label" style="width: 60px;">客户名称：</td>
                                <td>
                                    <select class="easyui-combobox" id="consId" data-options="prompt:'请选择',panelHeight:'200px',editable:true">
                                    </select>
                                </td>
                                <!-- <td class="td-fillwidth"></td> -->
                                <td>
                                	<input type="checkbox" id="csgd" style="width: 15px;">
                                </td>
                                <td class="td-label" style="width: 60px;" id="csgdText">超时工单</td>
                                <td colspan="2" style="text-align: right;">
                                    <a href="#" class="easyui-linkbutton c100" data-options="width:80" onclick="labourList();">查询</a>
                                    <a href="#" id="doubleClick" class="easyui-linkbutton c100" data-options="width:80" onclick="doubleClick();">统计</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="container-marginTop" style="position: absolute; top:80px; left:0; bottom: 10px; right:0;">
                        <table id="gdgl-girdDetailView" style="width: 100%"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="gdgl_gridviewDetailDialog" class="easyui-dialog" title="工单详情"
         data-options="modal:true, closed: true,height: 450,maximizable:true" style="width: 950px;padding:0 10px;">
        <div class="detailView-panel">
            <table style="table-layout: fixed;width: 0;overflow: hidden;">
            <colgroup>
                <col style="width: 80px">
                <col style="width: 100px;">
                <col style="width: 80px">
                <col style="width: 150px;">
                <col style="width: 80px">
                <col style="width: 120px;">
                <col style="width: 80px">
                <col style="width: 100px;">
                </colgroup>
            <tbody>
            <tr>
                <td class="td-label">工单编号：</td>
                <td class="td-value"><label id="gdNo"></label></td>
                <td class="td-label" id="fxlyText">发现来源：</td>
                <td class="td-value"><label id="sourceName"></label></td>
                <td class="td-label" id="qxxzText">缺陷性质：</td>
                <td class="td-value"><label id="severityName"></label></td>
                <td class="td-label" id="fxrName">发现人：</td>
                <td class="td-value"><label id="founderName"></label></td>
             </tr>
            <tr>
                <td class="td-label">地区：</td>
                <td class="td-value"><label id="dqNo"></label></td>
                <td class="td-label">客户名称：</td>
                <td class="td-value" nowrap="nowrap">
                	<!-- <label id="qyNo"></label> -->
                	<div style="overflow: hidden; text-overflow: ellipsis;" id="qyNo"></div>
                </td>
                <td class="td-label">用户变：</td>
                <td class="td-value" nowrap="nowrap">
                	<!-- <label id="yhbNo"></label> -->
                	<div style="overflow: hidden; text-overflow: ellipsis;" id="yhbNo"></div>
                </td>
                <td class="td-label">故障设备：</td>
                <td class="td-value" nowrap="nowrap">
                	<!-- <p id="text"><label id="shebei"></label></p> -->
                	<div style="overflow: hidden; text-overflow: ellipsis;" id="shebei"></div>
                </td>
                </tr>
            <tr>
                <td class="td-label">派发人：</td>
                <td class="td-value"><label id="pfr"></label></td>
                <td class="td-label">派单时间：</td>
                <td class="td-value"><label id="pdsj"></label></td>
                <td class="td-label" id="qxfzrText">抢修负责人：</td>
                <td class="td-value"><label id="qxr"></label></td>
                </tr>
            <tr>
                <td class="td-label" style="vertical-align: top;padding-top: 5px;">详细内容：</td>
                <td class="td-value" colspan="7">
                    <div style="height: 90px;white-space: normal; word-wrap: break-word; vertical-align: top;"><label id="xxnr"></label></div>
                    </td>
                </tr>
            <tr>
                <td class="td-label" style="vertical-align: middle;">当前进度：</td>
                <td class="td-value" colspan="7">
                    <div class="prjectProgress-panel">
                        <div class="item-block">
                            <p><img id="xiafaimg"></p>
                            <p><span id="xiafa">下发</span></p>
                        </div>
                        <img id="jindua">
                        <div class="item-block">
                            <p><img id="jiedanimg"></p>
                            <p><span id="jiedan">已接单</span></p>
                        </div>
                        <img id="jindub">
                        <div class="item-block">
                            <p><img id="xcqrimg"></p>
                            <p><span id="xcqr">到达现场已确认</span></p>
                        </div>
                        <img id="jinduc">
                        <div class="item-block">
                            <p><img id="gzqrimg"></p>
                            <p><span id="gzqr">现场故障已确认</span></p>
                        </div>
                        <img id="jindud">
                        <div class="item-block">
                            <p><img id="jdqrimg"></p>
                            <p><span id="jdqr">抢修进度已确认</span></p>
                        </div>
                        <img id="jindue">
                        <div class="item-block">
                            <p><img id="yhdimg"></p>
                            <p><span id="yhd">已回单</span></p>
                        </div>
                        <img id="jinduf">
                        <div class="item-block">
                            <p><img id="ygdimg"></p>
                            <p><span id="ygd">已归档</span></p>
                        </div>
                    </div>
                 </td>
                </tr>
            </tbody>
            </table>
            <table class="common-table" style="margin-top: 10px;">
                <tbody id="ttr">
                    <tr>
						<th></th>
						<th style="width:60px;">进度</th>
						<th style="width:80px;">处理人</th>
						<th style="width:150px;">处理时间</th>
						<th>处理详情</th>
					</tr>
					<!-- 派发 -->
					<tr id="itr" style="display: none;">
						<td>1</td>
						<td>派发</td>
						<td id="gdpfr"></td>
						<td id="gdpfsj"></td>
						<td>
							<div style="width: 400px; overflow: hidden; text-overflow: ellipsis;" id="gdpfnr"></div>
						</td>
					</tr>
					<!-- 已接单 -->
					<tr id="iitr" style="display: none;">
						<td>2</td>
						<td>接单</td>
						<td id="gdjdr"></td>
						<td id="gdjdsj"></td>
						<td>
							<div style="width: 400px; overflow: hidden; text-overflow: ellipsis;" id="gdjdnr"></div>
						</td>
					</tr>
					<!-- 现场确认 -->
					<tr id="iiitr" style="display: none;">
						<td>2</td>
						<td>现场确认</td>
						<td id="gdxcqrr"></td>
						<td id="gdxcqrsj"></td>
						<td>
							<div style="width: 400px; overflow: hidden; text-overflow: ellipsis;" id="gdxcqrnr"></div>
						</td>
					</tr>
					<!-- 故障确认 -->
					<tr id="ivtr" style="display: none;">
						<td>3</td>
						<td id="gzqrText">故障确认</td>
						<td id="gdgzqrr"></td>
						<td id="gdgzqrsj"></td>
						<td>
							<div style="width: 400px; overflow: hidden; text-overflow: ellipsis;" id="gdgzqrnr"></div>
						</td>
					</tr>
					<!-- 缺陷确认 -->
					<!-- <tr id="trqxqr" style="display: none;">
						<td>3</td>
						<td>缺陷确认</td>
						<td id="qxqr"></td>
						<td id="qxqrsj"></td>
						<td>
							<div style="width: 400px; overflow: hidden; text-overflow: ellipsis;" id="gdgzqrnr"></div>
						</td>
					</tr> -->
					<!-- 抢修确认 -->
					<tr id="vtr" style="display: none;">
						<td>4</td>
						<td id="qxqrText">抢修确认</td>
						<td id="gdqxr"></td>
						<td id="gdqxsj"></td>
						<td>
							<div style="width: 400px; overflow: hidden; text-overflow: ellipsis;" id="gdqxnr"></div>
						</td>
					</tr>
					<!-- 消缺确认 -->
					<!-- <tr id="trxqqr" style="display: none;">
						<td>4</td>
						<td>消缺确认</td>
						<td id="xqqr"></td>
						<td id="xqqrsj"></td>
						<td>
							<div style="width: 400px; overflow: hidden; text-overflow: ellipsis;" id="gdqxnr"></div>
						</td>
					</tr> -->
					<!-- 已回单 -->
					<tr id="vitr" style="display: none;">
						<td>5</td>
						<td>回单</td>
						<td id="gdhdr"></td>
						<td id="gdhdsj"></td>
						<td>
							<div style="width: 400px; overflow: hidden; text-overflow: ellipsis;" id="gdhdnr"></div>
						</td>
					</tr>
					<!-- 已归档 -->
					<tr id="viitr" style="display: none;">
						<td>6</td>
						<td>归档</td>
						<td id="gdgdr"></td>
						<td id="gdgdsj"></td>
						<td>
							<div style="width: 400px; overflow: hidden; text-overflow: ellipsis;" id="gdgdnr"></div>
						</td>
					</tr>
                </tbody>
            </table>
            <input type="hidden" id="logoA">
            <input type="hidden" id="logoB">
            <input type="hidden" id="logoC">
            <input type="hidden" id="logoD">
            <input type="hidden" id="logoE">
            <input type="hidden" id="logoF">
            <table id="confirmForm-table" class="container-marginTop" style="padding: 0 10px;">
                <tbody>
                <tr id="fristTr">
                    <td id="gzzp" class="td-label" style="vertical-align: top;padding-top: 5px;">故障照片：</td>
                    <td class="td-value">
                        <div style="width: 700px; height: 60px; word-wrap: break-word; vertical-align: top; padding: 8px 0 5px 0;">
                        	<span id="gzzpShow"></span>
                            <a id="hrefA" class="lightImage" > <!-- data-lightbox="example-set" --><span id="logo_butA" class="deleteIcon" style="display:none;">▬</span><img id="imageA_logo" class="thumbnailImage" style="display:none;"></a>
                            <a id="hrefB" class="lightImage" ><!-- data-lightbox="example-set" --><span id="logo_butB" class="deleteIcon" style="display:none;">▬</span><img id="imageB_logo" class="thumbnailImage" style="display:none;"></a>
                            <a id="hrefC" class="lightImage" ><!-- data-lightbox="example-set" --><span id="logo_butC" class="deleteIcon" style="display:none;">▬</span><img id="imageC_logo" class="thumbnailImage" style="display:none;"></a>
                            <div id="butA"  style=" display: inline-block;margin-left: 10px;">
                        	    <!--  <a id="but" href="#" class="easyui-linkbutton c9 shadow" style="width: 80px; height: 32px; vertical-align: 0;">添加照片</a> -->
                        	     <a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:true"
                                    style="width: 60px; height: 60px; vertical-align: 0;">添加照片</a>
                            </div>
                        </div>    
                    </td>
                </tr>
                <tr id="secondTr">
                    <td id="gzsm" class="td-label" style="vertical-align: top;padding-top: 5px;">故障说明：</td>
                    <td colspan="7" class="td-value">
                        <div style="width: 700px; height: 100px; word-wrap: break-word; vertical-align: top;">
                            <input class="easyui-textbox" id="gztextVal"
                                   data-options="width:'100%',height:100,multiline:true,validType:'length[0,300]'" value="">
                        </div>
                    </td>
                </tr>
                <tr id="sanTr">
                    <td id="wxzp" class="td-label" style="vertical-align: top;padding-top: 5px;">维修照片：</td>
                    <td class="td-value">
                        <div style="width: 700px; height: 60px; word-wrap: break-word; vertical-align: top; padding: 8px 0 5px 0;">
                        	<span id="wxzpShow"></span>
                            <a id="hrefD" class="lightImage"> <!-- data-lightbox="example-set" --><span id="logo_butD" class="deleteIcon" style="display:none;">▬</span><img id="imageD_logo" class="thumbnailImage" style="display:none;"></a>
                            <a id="hrefE" class="lightImage" ><!-- data-lightbox="example-set" --><span id="logo_butE" class="deleteIcon" style="display:none;">▬</span><img id="imageE_logo" class="thumbnailImage" style="display:none;"></a>
                            <a id="hrefF" class="lightImage" ><!-- data-lightbox="example-set" --><span id="logo_butF" class="deleteIcon" style="display:none;">▬</span><img id="imageF_logo" class="thumbnailImage" style="display:none;"></a>
                            <div id="butB" style=" display: inline-block;margin-left: 10px;">
                        	    <!--  <a id="but" href="#" class="easyui-linkbutton c9 shadow" style="width: 80px; height: 32px; vertical-align: 0;">添加照片</a> -->
                        	     <a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:true"
                                     style="width: 60px; height: 60px; vertical-align: 0;">添加照片</a>
                            </div>
                         </div>   
                    </td>
                </tr>
                <tr  id="siTr">
                    <td id="wxsm" class="td-label" style="vertical-align: top;padding-top: 5px;">维修说明：</td>
                    <td colspan="7" class="td-value">
                        <div style="width: 700px; height: 100px; word-wrap: break-word; vertical-align: top;">
                            <input class="easyui-textbox" id="wxtextVal"
                                   data-options="width:'100%',height:100,multiline:true,validType:'length[0,300]'" value="">
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="buttons-panel" style="text-align: center;margin-top: 10px;">
                <a id="gdgl-btnConfirm" href="#" class="easyui-linkbutton c9 shadow">现场确认</a>
                <a id="gdgl-btnSubmit" href="#" class="easyui-linkbutton c9 shadow" >故障提交</a>
                <!-- <a id="gdgl-btnCancel" href="#" class="easyui-linkbutton c10 shadow" style="margin-left: 10px;" >故障取消</a> -->
                <a id="gdgl-wxbtnSubmit" href="#" class="easyui-linkbutton c9 shadow" >维修提交</a>
                <!-- <a id="gdgl-wxbtnCancel" href="#" class="easyui-linkbutton c10 shadow" style="margin-left: 10px;" >维修取消</a> -->
                <a id="gdgl-btnOk" href="#" class="easyui-linkbutton c9 shadow" >确认已完成</a>
                <a id="gdgl-btnGd" href="#" class="easyui-linkbutton c9 shadow" >归挡</a>
            </div>
        </div>
    </div>
</div>
    <script type="text/javascript">
		var webContextRoot="<%=basePath%>";
		var jsPath = "<%=pagePath%>";
        var userId = '<%=((UserInfo)session.getAttribute("userInfo")).getUserId()%>';
        
        subsId = "<%=subsId%>";
        ywType = "<%=ywType%>";
        if(subsId == "0"){
        	var west = document.getElementById("west");
        	//west.style.width = "0px";
        	//west.style.display = "none";
        }
        
        consId = "<%=consId%>";
		consName = "<%=consName%>";
        
    </script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/js/jquery.vticker-min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/js/dateUtil.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/ocupload/jquery.ocupload-1.1.2.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/lightbox/dist/js/lightbox.min.js"></script>
    <script src="<%=pagePath%>/webuploader-0.1.5/webuploader.min.js"></script>
    <script type="text/javascript" src="labour.js"></script>
    <!-- 百度api接口 测试环境注释，生产打开 -->
    <!-- <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=CWy7fv2qnIgddvauxx3l2q8p1rSdWKFC"></script> -->
	<script type="text/javascript" src="<%=pagePath %>/js/map.js"></script>
</body>
</html>

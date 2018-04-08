<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%
    String baseUrl = request.getContextPath();
    String pagePath = baseUrl + "/pages/despages/common";
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + baseUrl + "/";
    session.setAttribute("itemCode", "GISzl");
    session.setAttribute("itemName", "GIS监控");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
<head>
    <meta charset="UTF-8"/>
    <title>GIS监控</title>
    <link rel="stylesheet" type="text/css"
          href="${basePath}pages/areaEnergy/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" type="text/css"
          href="${basePath}pages/areaEnergy/common/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="${basePath}pages/areaEnergy/common/jquery-easyui-1.5.1/color.css">
    <link rel="stylesheet" type="text/css" href="${basePath}pages/areaEnergy/common/css/common.css">
    <link rel="stylesheet" type="text/css"
          href="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.css"/>

    <%--<link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap.css">--%>
    <%--<link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap-theme.css">--%>

    <%--<link rel="stylesheet" type="text/css" href="${basePath}/plugins/ztree/css/zTreeStyle/zTreeStyle.css">--%>

    <script src="${basePath}pages/despages/common/js/maskJs.js"></script>
</head>
<body>
<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>
<style>
    td {
        padding: 5px 0;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    #coordinate1 {
        position: absolute;
        top: 200px;
        left: 350px;
    }

    #coordinate2 {
        position: absolute;
        top: 250px;
        left: 450px;
    }

    .enterprise-panel {
        width: 100%;
        height: 100%;
        position: absolute;
        border: none;
        box-shadow: 3px 3px 10px #efefef;
    }

    .enterprise-panel {
        font-size: 12px;
        color: #2e2e29;
        font-family: "微软雅黑";
        border-bottom: 1px dashed #ddddc4;
        padding: 5px;
        text-shadow: 1px 1px 1px #cfcfcf;
    }

    .td-map-title {
        font-size: 13px;
        color: #2e2e29;
        font-family: "微软雅黑";
        padding: 5px;
        text-shadow: 1px 1px 1px #cfcfcf;
        text-align: center;
    }

    .table td {
        padding: 5px 0;
        border: none;
    }

    .td-map-label {
        color: #232323;
        font-size: 13px;
        text-align: left;
        width: 30%;
    }

    .td-map-value {
        color: #747474;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        text-align: left;
        width: 70%;
    }

    .td-map-value-button {
        color: #747474;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        text-align: right;
        width: 70%;
    }

    .td-value {
        text-align: right;
        font-size: 10px;
    }

    .td-label {
        font-size: 10px;
    }

    #gis_panel #left-bottom-panel {
        position: absolute;
        left: 0px;
        bottom: 0px;
    }

    #gis_panel #left-bottom-panel .img-panel {
        margin: 1px;
        float: left;
        position: relative;
        cursor: pointer;
        background-color: #2e4b77;
    }

    #gis_panel #left-bottom-panel .img-panel .labeltitle {
        position: absolute;
        text-align: center;
        top: 50%;
        left: 5px;
        right: 5px;
        font-size: 16px;
        color: #FFFFFF;
    }

    #gis_panel #left-bottom-panel .img-panel .label {
        position: absolute;
        text-align: center;
        bottom: 10px;
        left: 5px;
        right: 5px;
        font-size: 16px;
        color: #FFFFFF;
    }

    #gis_panel #left-bottom-panel .img-panel .labelnum {
        position: absolute;
        text-align: center;
        bottom: 10px;
        left: 5px;
        right: 5px;
        font-size: 14px;
        color: #FFFFFF;
    }

    #gis_panel #left-bottom-panel .img-panel img {
        position: absolute;
        left: 50%;
        margin-left: -20%;
        font-size: 16px;
        color: #FFFFFF;
    }

    #gis_panel #explain {
        position: absolute;
        right: 50px;
        top: 50px;
        font-size: 14px;
        background: rgba(0, 0, 0, 0.7);
    }

    .td-label-realtime {
        color: #232323;
        font-size: 12px;
        text-align: center;
        width: 30%;
    }

    .td-label-realtime-num {
        color: #232323;
        font-size: 12px;
        text-align: center;
        width: 30%;
    }

    .td-label-yct {
        color: #747474;
        font-size: 13px;
        width: 20%;
        text-align: right;
    }

    #gjxxpz-panel .search-panel {
        background-color: #EFEFEF;
    }

    #gjxxpz-panel .grid-panel {
        background-color: #EFEFEF;
    }

    #gjxxpz-panel .form-table {
        font-size: 12px;
        border-spacing: 0px;
    }

    #gjxxpz-panel .form-table .td-label {
        width: 80px;
        text-align: center;
    }

    #gjxxpz-panel .form-table .td-value {
        width: 160px;
    }

    #gjxxpz-panel .form-table .td-fillwidth {
        width: 40px;
    }

    .enterprise-footer-panel {
        font-size: 13px;
        text-align: right;
        padding: 10px;
        border-top: 1px dashed #ddddc4;
    }

    #center-enterprise-panel {
        background-color: #fff;
        width: 400px;
        height: 300px;
        border: none;
        color: #666;
        -webkit-box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
    }

    #center-enterprise-panel .td-title {
        margin-top: 10px;
        margin-left: -2px;
        margin-right: -2px;
        font-size: 22px;
        padding: 10px 20px;
        background-color: #4FC3F7;
        border-bottom: none;
        color: #fff;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    }

    #center-enterprise-panel .closed {
        top: 22px;
        right: 15px;
        font-size: 22px;
        color: #245971;
    }

    #center-enterprise-panel .closed:hover {
        color: #fff;
    }

    #center-enterprise-panel .content {
        margin: 15px;
    }

    #center-enterprise-panel .content .row2 {
        margin: 15px 0;
        padding-top: 10px;
        border-top: 1px solid #dfdfdf;
    }

    #center-enterprise-panel .row1 .col1 {
        width: 150px;
        height: 100px;
    }

    #center-enterprise-panel .row1 .col1 img {
        width: 100%;
        height: 100%;
    }

    #center-enterprise-panel .row1 .col2 {
        width: 220px;
        height: 100px;
        padding: 5px;
    }

    #center-enterprise-panel .row1 .col2 p {
        margin: 7px 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #center-enterprise-panel .row1 .col2 img, #center-enterprise-panel .row1 .col2 span {
        vertical-align: middle;
    }

    #center-enterprise-panel .row1 .col2 span {
        margin-left: 5px;
    }

    #center-enterprise-panel .row2 table {
        height: 80px;
        table-layout: fixed;
    }

    #center-enterprise-panel .row2 table td {
        padding: 0;
        vertical-align: top;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #center-enterprise-panel .row2 table td:first-child {
        width: 50px;
        color: #333;
    }

    #right_panel .panel-header {
        background-color: #1D9499;
    }

    #right_panel .panel-title {
        color: #fff;
        font-size: 14px;
    }

    #right_panel .panel-body {
        background-color: #f4f4f4;
    }

    #right_panel .panel-tool-collapse {
        background: url(${basePath}pages/despages/common/images/expand-left.png) no-repeat;
    }

    #right_panel .panel-tool-expand {
        background: url(${basePath}pages/despages/common/images/expand-down.png) no-repeat;
    }

    #right_panel td {
        text-align: left;
        vertical-align: middle;
        font-size: 15px;
    }

    #user-search {
        position: absolute;
        top: 25px;
        left: 75px;
        width: 300px;
    }

    #user-search .search-panel {
        border: 1px solid #A4A4A4;
        width: 100%;
        height: 30px;
        border-radius: 10px;
        background-color: white;
    }

    #user-search .search-panel .searchInput {
        outline: none;
        border: none;
        height: 28px;
        line-height: 28px;
        position: absolute;
        left: 10px;
        width: 235px;
        vertical-align: middle;
    }

    #user-search .search-panel .search-button {
        position: absolute;
        top: 5px;
        bottom: 5px;
        right: 0px;
        width: 40px;
        border-left: 1px solid #A4A4A4;
    }

    #user-search .search-panel .search-button > img {
        margin-left: 10px;
        cursor: pointer;
    }

    #searchResultUl li:hover {
        background-color: #EFEFEF;
        cursor: pointer;
    }
</style>
<%--<div class="col-xs-2">--%>
<%--<ul id="areatree" class="ztree" style="background-color: #fff"></ul>--%>
<%--</div>--%>

<%--<div class="col-xs-10">--%>
<div id="gis_panel" class="easyui-panel">
    <div id="gisMap" style="width: 100%; height:1000px;"></div>
    <div id="user-search">
        <div class="search-panel">
            <input id="searchInput" class="searchInput" type="text"
                   placeholder="客户搜索" onkeyup="getResult()"/>
            <div class="search-button" onclick="getResult()">
                <img src="${basePath}pages/despages/common/images/gis_search.png">
            </div>
        </div>
        <div id="searchResult" style="border: 1px solid #A4A4A4;position: absolute;left: 10px;right: 40px;">
            <ul id="searchResultUl"
                style="background-color: white;padding: 5px;margin: 0px;overflow: auto;height: 200px;">
                <!-- <li style="white-space: nowrap;height: 25px;line-height: 25px;cursor: pointer;">1111</li>
                <li style="white-space: nowrap;height: 25px;line-height: 25px;cursor: pointer;">1111</li>
                <li style="white-space: nowrap;height: 25px;line-height: 25px;cursor: pointer;">1111</li>
                <li style="white-space: nowrap;height: 25px;line-height: 25px;cursor: pointer;">1111</li>
                <li style="white-space: nowrap;height: 25px;line-height: 25px;cursor: pointer;">1111</li>
                <li style="white-space: nowrap;height: 25px;line-height: 25px;cursor: pointer;">1111</li>
                <li style="white-space: nowrap;height: 25px;line-height: 25px;cursor: pointer;">1111</li>
                <li style="white-space: nowrap;height: 25px;line-height: 25px;cursor: pointer;">1111</li>
                <li style="white-space: nowrap;height: 25px;line-height: 25px;cursor: pointer;">1111</li>
                <li style="white-space: nowrap;height: 25px;line-height: 25px;cursor: pointer;">1111</li> -->
            </ul>
        </div>
    </div>
    <div id="right_panel">
        <div id="ssxx_panel" class="easyui-panel">
            <div style="margin: 5px 10px;">
                <table>
                    <colgroup>
                        <col width="35px"/>
                        <col width="40px"/>
                        <col width="20px"/>
                        <col/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <td><img src="${basePath}pages/despages/common/images/gis-qy-normal.png" width="23px"
                                 height="28px"/></td>
                        <td style="text-align: center;">正常</td>
                        <td><input type="checkbox" checked onchange="map.khNormalChange(mp, $(this).is(':checked'));"/>
                        </td>
                        <td>
                            <div id="khExplainNormal" style="margin-left:40px;line-height:20px;background-color: #60BA61;border: 1px solid #F2F2F2;
                        				border-radius: 4px;text-align: center;color: #FFFFFF;width:60px;height:20px;">
                            </div>
                        </td>
                        <!-- 								<td style="text-align: center;"><input type="checkbox" -->
                        <!-- 									checked -->
                        <!-- 									onchange="map.khNormalChange(mp, $(this).is(':checked'));" /></td> -->
                        <!-- 								<td><img src="../common/images/gis-qy-normal.png" /></td> -->
                        <!-- 								<td id="khExplainNormal">正常（0）</td> -->
                    </tr>
                    <tr>
                        <td><img src="${basePath}pages/despages/common//images/gis-qy-warning.png" width="23px"
                                 height="28px"/></td>
                        <td style="text-align: center;">告警</td>
                        <td><input type="checkbox" checked onchange="map.khWarningChange(mp, $(this).is(':checked'));"/>
                        </td>
                        <td>
                            <div id="khExplainWarning" style="margin-left:40px;line-height:20px;background-color: #E76353;border: 1px solid #F2F2F2;
                        				border-radius: 4px;text-align: center;color: #FFFFFF;width:60px;height:20px;">
                            </div>
                        </td>
                        <!-- 								<td style="text-align: center;"><input type="checkbox" -->
                        <!-- 									checked -->
                        <!-- 									onchange="map.khWarningChange(mp, $(this).is(':checked'));" /></td> -->
                        <!-- 								<td><img src="../common/images/gis-qy-warning.png" /></td> -->
                        <!-- 								<td id="khExplainWarning">告警（0）</td> -->
                    </tr>
                    <tr>
                        <td><img src="${basePath}pages/despages/common/images/gis-qy-interrupt.png" width="23px"
                                 height="28px"/></td>
                        <td style="text-align: center;">中断</td>
                        <td><input type="checkbox" checked onchange=""/></td>
                        <td>
                            <div id="khExplainBreak" style="margin-left:40px;line-height:20px;background-color: #F7AC63;
                        				border: 1px solid #F2F2F2;border-radius: 4px;text-align: center;color: #FFFFFF;width:60px;height:20px;">
                                0
                            </div>
                        </td>
                        <!-- 								<td style="text-align: center;"><input type="checkbox" -->
                        <!-- 									checked onchange="" /></td> -->
                        <!-- 								<td><img src="../common/images/gis-qy-interrupt.png" /></td> -->
                        <!-- 								<td id="khExplainBreak">中断（0）</td> -->
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="xxhz_panel" class="easyui-panel">
            <div style="margin: 5px 10px;">
                <table>
                    <colgroup>
                        <col width="35px"/>
                        <col width="40px"/>
                        <col width="20px"/>
                        <col/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <td><img src="${basePath}pages/despages/common/images/gis-bdz-normal.png" width="28px"
                                 height="28px"/></td>
                        <td style="text-align: center;">正常</td>
                        <td><input type="checkbox" checked onchange="map.bdzNormalChange(mp, $(this).is(':checked'));"/>
                        </td>
                        <td>
                            <div id="bdzExplainNormal" style="margin-left:40px;line-height:20px;background-color: #60BA61;border: 1px solid #F2F2F2;
                        				border-radius: 4px;text-align: center;color: #FFFFFF;width:60px;height:20px;">
                            </div>
                        </td>
                        <!-- 								<td style="text-align: center;"><input type="checkbox" -->
                        <!-- 									checked -->
                        <!-- 									onchange="map.bdzNormalChange(mp, $(this).is(':checked'));" /></td> -->
                        <!-- 								<td><img src="../common/images/gis-bdz-normal.png" /></td> -->
                        <!-- 								<td id="bdzExplainNormal">正常（0）</td> -->
                    </tr>
                    <tr>
                        <td><img src="${basePath}pages/despages/common/images/gis-bdz-warning.png" width="28px"
                                 height="28px"/></td>
                        <td style="text-align: center;">告警</td>
                        <td><input type="checkbox" checked
                                   onchange="map.bdzWarningChange(mp, $(this).is(':checked'));"/></td>
                        <td>
                            <div id="bdzExplainWarning" style="margin-left:40px;line-height:20px;background-color: #E76353;border: 1px solid #F2F2F2;
                        				border-radius: 4px;text-align: center;color: #FFFFFF;width:60px;height:20px;">
                            </div>
                        </td>
                        <!-- 								<td style="text-align: center;"><input type="checkbox" -->
                        <!-- 									checked -->
                        <!-- 									onchange="map.bdzWarningChange(mp, $(this).is(':checked'));" /></td> -->
                        <!-- 								<td><img src="../common/images/gis-bdz-warning.png" /></td> -->
                        <!-- 								<td id="bdzExplainWarning">告警（0）</td> -->
                    </tr>
                    <tr>
                        <td><img src="${basePath}pages/despages/common/images/gis-bdz-interrupt.png" width="28px"
                                 height="28px"/></td>
                        <td style="text-align: center;">中断</td>
                        <td><input type="checkbox" checked onchange=""/></td>
                        <td>
                            <div id="bdzExplainBreak" style="margin-left:40px;line-height:20px;background-color: #F7AC63;
                        				border: 1px solid #F2F2F2;border-radius: 4px;text-align: center;color: #FFFFFF;width:60px;height:20px;">
                                0
                            </div>
                        </td>
                        <!-- 								<td style="text-align: center;"><input type="checkbox" -->
                        <!-- 									checked onchange="" /></td> -->
                        <!-- 								<td><img src="../common/images/gis-bdz-interrupt.png" /></td> -->
                        <!-- 								<td id="bdzExplainBreak">中断（0）</td> -->
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div id="left-bottom-panel" style="width: 100%;height: 27%;">
        <!-- <div class="img-panel" onClick="forJumpKhjk('102000003446', '无锡工艺职业技术学院(新校区)');"> -->
        <div class="img-panel" onClick="openfh();">
            <img src="${basePath}pages/despages/common/images/gis-fh.png" width="50%" height="50%" border="0"/>
            <div class="labeltitle">实时负荷</div>
            <div id="gisfh" class="labelnum"></div>
        </div>
        <div class="img-panel" onClick="opendl();">
            <img src="${basePath}pages/despages/common/images/gis-dl.png" width="50%" height="50%" border="0"/>
            <div class="labeltitle">昨日总电量</div>
            <div id="gisdl" class="labelnum"></div>
        </div>
        <%--<div style="clear: both;"></div>--%>

        <div class="img-panel" onClick="userTotal();">
            <img src="${basePath}pages/despages/common/images/gis-qy.png" width="50%" height="50%" border="0"/>
            <div class="labeltitle">客户总数</div>
            <div id="gisqy" class="label"></div>
        </div>
        <div class="img-panel" onClick="bdzTotal();">
            <!--  			<div class="img-panel" onClick="xsData(101000001078,2);"> -->
            <img src="${basePath}pages/despages/common/images/gis-bdz.png" width="50%" height="50%" border="0"/>
            <div class="labeltitle">变电站总数</div>
            <div id="gisbdz" class="label"></div>
        </div>
        <div class="img-panel" onClick="testOpen('',0,1,'','告警信息');">
            <!--   			<div class="img-panel" onClick="xsData(101000001077,1);"> -->
            <img src="${basePath}pages/despages/common/images/gis-gj.png" width="50%" height="50%" border="0"/>
            <div class="labeltitle">告警总数</div>
            <div id="gisgj" class="label"></div>
        </div>
        <%--<div style="clear: both;"></div>--%>

        <div class="img-panel" onClick="zbCount();">
            <img src="${basePath}pages/despages/common/images/gis-zb.png" width="50%" height="50%" border="0"/>
            <div class="labeltitle">主变总数</div>
            <div id="giszb" class="label"></div>
        </div>
        <div class="img-panel" onClick="zbTotal();">
            <!--  			<div class="img-panel" onClick="khRealTimeFh(109900007433,2);"> -->
            <img src="${basePath}pages/despages/common/images/gis-zbrl.png" width="50%" height="50%" border="0"/>
            <div class="labeltitle">主变总容量</div>
            <div id="giszbrl" class="labelnum"></div>
        </div>
        <div class="img-panel" onClick="openGd();">
            <!--   			<div class="img-panel" onClick="khRealTimeFh(109900007431,1);"> -->
            <img src="${basePath}pages/despages/common/images/gis-gd.png" width="50%" height="50%" border="0"/>
            <div class="labeltitle">待办工单总数</div>
            <div id="gisgd" class="label"></div>
        </div>
        <%--<div style="clear: both;"></div>--%>
    </div>
</div>


</body>
<script type="text/javascript">
    var webContextRoot = "<%=basePath%>";
    var webContextRoot2 = "${basePath}";
</script>
<script type="text/javascript" src="${basePath}pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript"
        src="${basePath}pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script type="text/javascript"
        src="${basePath}pages/areaEnergy/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
<script type="text/javascript"
        src="${basePath}pages/areaEnergy/common/jquery-easyui-1.5.1/datagrid-detailview.js"></script>
<script type="text/javascript" src="${basePath}pages/despages/common/js/dateUtil.js"></script>
<script type="text/javascript" src="${basePath}pages/despages/monitor/GISZongLan.js"></script>
<script type="text/javascript" src="${basePath}pages/despages/common/js/map.js"></script>
<script type="text/javascript" src="${basePath}pages/despages/common/js/toolwinopen.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=CWy7fv2qnIgddvauxx3l2q8p1rSdWKFC"></script>
<script type="text/javascript"
        src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>
<script type="text/javascript"
        src="http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>
<script type="text/javascript"
        src="http://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js"></script>

<%--bootstrap--%>
<%--<script type="text/javascript" src="${basePath}/plugins/bootstrap/js/bootstrap.js"></script>--%>
<%--<script type="text/javascript" src="${basePath}/plugins/ztree/js/jquery.ztree.core-3.5.min.js"></script>--%>

<script type="text/javascript">

    // var setting = {
    //     data: {
    //         simpleData: {
    //             enable: true
    //         }
    //     },callback: {
    //         onClick: onClick
    //     }
    // };
    //
    // var zNodes =[
    //     { id:1, pId:0, name:"深圳市", open:true, icon:"../../plugins/ztree/css/zTreeStyle/img/diy/1_close.png",lan:"22.539111",lon:"114.065414"},
    //     { id:2, pId:1, name:"龙岗区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.715349",lon:"114.260204"},
    //     { id:3, pId:1, name:"盐田区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.571982",lon:"114.238831"},
    //     { id:4, pId:1, name:"坪山区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.711166",lon:"114.35881"},
    //     { id:5, pId:1, name:"大鹏新区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.604019",lon:"114.477985"},
    //     { id:6, pId:1, name:"深汕特别合作区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.843068",lon:"115.001902"},
    //     { id:7, pId:1, name:"宝安区", open:true,icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.572048",lon:"113.886403"},
    //     { id:8, pId:1, name:"光明新区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.781745",lon:"113.926894"},
    //     { id:9, pId:1, name:"南山区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.542372",lon:"113.947606"},
    //     { id:10, pId:1, name:"前海特区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.518871",lon:"113.914261"},
    //     { id:11, pId:1, name:"龙华区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.76053",lon:"114.068076"},
    //     { id:12, pId:1, name:"福田区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.525261",lon:"114.069596"},
    //     { id:13, pId:1, name:"罗湖区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.555152",lon:"114.146199"},
    //     { id:6001, pId:7, name:"信濠精密", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.632297",lon:"113.844561"},
    //     { id:6002, pId:7, name:"信濠光电", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.697064",lon:"113.830011"},
    //     { id:6003, pId:7, name:"雅达电源制品", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.585335",lon:"113.930181"},
    //     { id:6004, pId:7, name:"艾美特电器", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.671267",lon:"113.940005"},
    //     { id:6005, pId:7, name:"宝安区安全生产监督管理", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.560987",lon:"113.917123"},
    //     { id:6007, pId:7, name:"宝安人民医院", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.568912",lon:"113.919861"},
    //     { id:6008, pId:7, name:"大浪社区工作站", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.705835",lon:"114.002741"},
    //     { id:6009, pId:7, name:"固戌污水厂", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.58826",lon:"113.853359"},
    //     { id:6010, pId:7, name:"海滨中学", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.563696",lon:"113.905391"},
    //     { id:6011, pId:7, name:"昊阳天宇", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.705392",lon:"113.935677"},
    //     { id:6012, pId:7, name:"深圳报业集团宝安印务有限公司", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.787434",lon:"113.902374"},
    //     { id:6013, pId:7, name:"深圳市七月文化传播有限公司", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.586783",lon:"113.897892"},
    //     { id:6014, pId:7, name:"新安街道安监", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.583063",lon:"113.921281"},
    //     { id:6015, pId:7, name:"新安中学(初中部)", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.569518",lon:"113.909106"},
    //     { id:6016, pId:7, name:"新安中学(高中部)", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.559152",lon:"113.881558"}
    // ];
    //
    // $(function(){
    //     $.fn.zTree.init($("#areatree"), setting, zNodes);
    // });
    //
    // function onClick(event, treeId, treeNode, clickFlag) {
    //     alert(treeNode.name);
    // }
</script>
</html>

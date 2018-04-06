<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
    String urlpath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();

	/* 登录信息 */
    String username = session.getAttribute("username").toString();
    String customsType = session.getAttribute("customsType").toString();
    String CustomsName = session.getAttribute("CustomsName").toString();
    String customsId = session.getAttribute("customsId").toString();
    String customsCode = session.getAttribute("customsCode").toString();

    String UserGuid = session.getAttribute("UserGuid").toString();
    String Roles = session.getAttribute("Roles").toString();
    String OrgGuid = session.getAttribute("OrgGuid").toString();
    String OrgName = session.getAttribute("OrgName").toString();

    String PersonId = session.getAttribute("PersonId").toString();
%>

<!DOCTYPE HTML>
<html>
<head>
    <base href="<%=basePath%>">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- layout -->
    <link rel="stylesheet" type="text/css" href="${basePath}/plug-in/jquery-layout/complex.css"/>

    <!-- bootstrap -->
    <link href="${basePath}/plug-in/inspinia/css/bootstrap.min.css" rel="stylesheet">
    <link href="${basePath}/plug-in/select2/select2-bootstrap.css" rel="stylesheet">

    <!-- select2 -->
    <link rel="stylesheet" type="text/css" href="${basePath}/plug-in/select2/select2.min.css"/>

    <!-- mmGrid -->
    <link rel="stylesheet" type="text/css" href="${basePath}/plug-in/mmGrid-master/css/mmGrid.css"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/plug-in/mmGrid-master/css/mmPaginator.css"/>

    <!-- datetimepicker -->
    <link href="${basePath}/plug-in/datepicker/jquery-ui.css" rel="stylesheet">
    <link href="${basePath}/plug-in/datepicker/jquery-ui-timepicker-addon.min.css" rel="stylesheet">

    <style>
        #queryForm label {
            margin-right: 2px;
        }

        .header {
            background: #EEEEEE;
        }

    </style>
</head>

<body>

<div class="container-fluid">
    <div class="form-inline" style="padding-top: 10px;padding-bottom: 10px;" id="queryForm">
        <div class="form-group"><label class="control-label">请输入</label><input type="text" id="alarm_object_input" class="form-control" placeholder="预警对象"/></div>
        <div class="form-group"><label class="control-label">关区</label>
            <div id="ALARM_CUSTOMS"></div>
        </div>
        <div class="form-group"><label class="control-label">风险类型</label>
            <div id="ALARM_TYPE"></div>
        </div>
        <div class="form-group"><label class="control-label">状态</label>
            <div id="ALARM_STATUS"></div>
        </div>
        <div class="form-group"><label class="control-label">预警时间 从</label><input type="text" id="stime" class="form-control" style="width:135px;"></div>
        <div class="form-group"><label class="control-label">到</label><input type="text" id="etime" class="form-control" style="width:135px;"></div>
        <div class="form-group">
            <div class="col-xs-1 text-right">
                <button type="button" class="btn btn-primary" onclick="query(1,10);">查询</button>
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-1 text-right">
                <button type="button" class="btn btn-primary" onclick="addAlarm();">新增预警</button>
            </div>
        </div>
    </div>
</div>

<div id="mainContent" style="padding-top: 0px;">
    <div style="padding-top: 10px;">
        <table id="dataTable"></table>
    </div>
    <div class="text-right">
        <ul id="pageLimit" style="margin-top: 10px;margin-bottom: 0px;"></ul>
    </div>
</div>

<div id="alarm_info">
    <div class="header">描述信息</div>
    <div class="content" id="alarm_info_area"></div>
</div>

</body>
<!-- jquery -->
<script type="text/javascript" src="${basePath}/plug-in/jquery/jquery-1.9.1.js?v=1.9.1"></script>

<!--[if lt IE 9]>
<script src="${basePath}/plug-in/ace/js/respond.js"></script>
<script src="${basePath}/plug-in/ace/js/html5.js"></script>
<script src="${basePath}/plug-in/ace/js/excanvas.min.js"></script>
<![endif]-->

<!-- bootstrap -->
<script type="text/javascript" src="${basePath}/plug-in/bootstrap/js/bootstrap.min.js"></script>

<!-- layout -->
<script type="text/javascript" src="${basePath}/plug-in/jquery-layout/jquery.layout-latest.min.js"></script>

<!-- layer -->
<script type="text/javascript" src="${basePath}/plug-in/layer-v2.4/layer/layer.js"></script>

<!-- select2 -->
<script type="text/javascript" src="${basePath}/plug-in/select2/select2.js"></script>

<!-- mmGrid -->
<script type="text/javascript" src="${basePath}plug-in/mmGrid-master/js/json2.js"></script>
<script type="text/javascript" src="${basePath}plug-in/mmGrid-master/js/mmGrid.js"></script>
<script type="text/javascript" src="${basePath}plug-in/mmGrid-master/js/mmPaginator.js"></script>
<script type="text/javascript" src="${basePath}plug-in/mmGrid-master/js/plugins.js"></script>

<!-- bootstrap分页 -->
<script type="text/javascript" src="${basePath}plug-in/bootstrap_paginator/bootstrap-paginator.js"></script>

<!-- datetimepicker -->
<script type="text/javascript" src="${pageContext.request.contextPath}/plug-in/jquery-ui/js/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/plug-in/jquery-ui-datepicker/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/plug-in/jquery-ui-datepicker/jquery-ui-timepicker-zh-CN.js"></script>

<script type="text/javascript">
    var basePathJD = '<%=basePath%>';
    var getDataUrl = "${basePath}/system/data";
    var outerLayout;
    var alarmStatusListData;
    var alarmTypeListData;
    var newPageOption;
    var customsListData;
    var ALARM_CUSTOMS;

    var pageHeight = document.documentElement.clientHeight;
    var pageWidth = document.documentElement.clientWidth;

    var ALARM_CUSTOMS_DOM;
    //alert(pageHeight+"_"+pageWidth);
    var time1;

    var selectPage = 1;

    /* 交互对象 */
    var parentOpenPageType = new Object();
    var openInfo = new Object();
    /* 交互对象 */

    var Jurisdiction = new Object();
    Jurisdiction.customsType = '<%=customsType%>';
    Jurisdiction.customsName = '<%=CustomsName%>';
    Jurisdiction.customsCode = '<%=customsId%>';
    Jurisdiction.customsCodeParams = '<%=customsCode%>';

    Jurisdiction.UserGuid = '<%=UserGuid%>';
    Jurisdiction.Roles = '<%=Roles%>';
    Jurisdiction.OrgGuid = '<%=OrgGuid%>';
    Jurisdiction.OrgName = '<%=OrgName%>';
    Jurisdiction.username = '<%=username%>';

    Jurisdiction.PersonId = '<%=PersonId%>';

    $.datepicker.regional['zh-CN'] = {
        changeMonth: true,
        changeYear: true,
        clearText: '清除',
        clearStatus: '清除已选日期',
        closeText: '关闭',
        closeStatus: '不改变当前选择',
        prevText: '<上月',
        prevStatus: '显示上月',
        prevBigText: '<<',
        prevBigStatus: '显示上一年',
        nextText: '下月>',
        nextStatus: '显示下月',
        nextBigText: '>>',
        nextBigStatus: '显示下一年',
        currentText: '今天',
        currentStatus: '显示本月',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthStatus: '选择月份',
        yearStatus: '选择年份',
        weekHeader: '周',
        weekStatus: '年内周次',
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dayStatus: '设置 DD 为一周起始',
        dateStatus: '选择 m月 d日, DD',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        initStatus: '请选择日期',
        isRTL: false
    };

    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);

    /* 业务 */
    var items;
    var cols = [
        {
            title: '预警时间', name: 'ALARM_DATE', align: 'center', renderer: function (val, item, rowIndex) {
            return getLocalTime(val);
        }
        },
        {title: '所属关区', name: 'CUSTOMS_NAME', align: 'center'},
        {title: '预警目标', name: 'ALARM_OBJECT', align: 'center'},
        {title: '风险类型', name: 'ALARM_NAME', align: 'center'},
        {title: '状态', name: 'DISPOSE_NAME', align: 'center'},
        {title: '预警信息', name: 'ALARM_CONTENT', align: 'center'}
    ];

    var layoutSettings_Outer = {
        name: "outerLayout"
        , defaults: {
            size: "auto"
            , minSize: 20
            , paneClass: "pane"
            , resizerClass: "resizer"
            , togglerClass: "toggler"
        }
        , north: {
            spacing_open: 5
            , togglerLength_open: 0
            , togglerLength_closed: -1
            , resizable: true
            , slidable: false
            , fxName: "none"
            , paneSelector: ".container-fluid"
        }
        , center: {
            paneSelector: "#mainContent"
            , minWidth: 200
            , minHeight: 200
        }
        , east: {
            minSize: 250
            , spacing_open: 5
            , togglerLength_open: 0
            , slidable: false
            , paneSelector: "#alarm_info"

        }
    };

    $(function () {
        window.parent.openLoading();

        outerLayout = $("body").layout(layoutSettings_Outer);

        $.ajax({
            url: getDataUrl,
            type: "POST",
            data: {cmd: "$sql/system/code/select_codeinfo_bycodesortcode", CODE_SORT_CODE: 'BJLCZT', dataSource: 'dataSource2'},
            dataType: "JSON",
            cache: false,
            async: false,
            success: function (data) {
                if (data.resultCode == "200") {
                    alarmStatusListData = data.resultMap["$sql/system/code/select_codeinfo_bycodesortcode"];
                    for (var modelType = 0; modelType < alarmStatusListData.length; modelType++) {
                        alarmStatusListData[modelType]["id"] = alarmStatusListData[modelType]["CODE_VALUE"];
                        alarmStatusListData[modelType]["text"] = alarmStatusListData[modelType]["CODE_NAME"];
                    }
                    var appendLastData = new Object();
                    appendLastData.id = "";
                    appendLastData.text = "全部";
                    alarmStatusListData.unshift(appendLastData);

                } else {
                    window.parent.successMsg("error", data.resultMessage, "错误信息");
                }
            },
            error: function () {
                window.parent.successMsg("error", "系统出错请联系管理员", "错误信息");
                window.parent.closeLoading();
            }
        });

        $.ajax({
            url: getDataUrl,
            type: "POST",
            data: {cmd: "$sql/system/code/select_codeinfo_bycodesortcode", CODE_SORT_CODE: 'ALARMTYPE', dataSource: 'dataSource2'},
            dataType: "JSON",
            cache: false,
            async: false,
            success: function (data) {
                if (data.resultCode == "200") {
                    alarmTypeListData = data.resultMap["$sql/system/code/select_codeinfo_bycodesortcode"];
                    for (var modelType = 0; modelType < alarmTypeListData.length; modelType++) {
                        alarmTypeListData[modelType]["id"] = alarmTypeListData[modelType]["CODE_VALUE"];
                        alarmTypeListData[modelType]["text"] = alarmTypeListData[modelType]["CODE_NAME"];
                    }
                    var appendLastData = new Object();
                    appendLastData.id = "";
                    appendLastData.text = "全部";
                    alarmTypeListData.unshift(appendLastData);
                } else {
                    window.parent.successMsg("error", data.resultMessage, "错误信息");
                }
            },
            error: function () {
                window.parent.successMsg("error", "系统出错请联系管理员", "错误信息");
                window.parent.closeLoading();
            }
        });

        $.ajax({
            url: getDataUrl,
            type: "POST",
            data: {cmd: "$sql/system/customs/select_customs_getall_bydis_220", DISTINCTION: '2', dataSource: 'dataSource2'},
            dataType: "JSON",
            cache: false,
            async: false,
            success: function (data) {
                if (data.resultCode == "200") {
                    customsListData = data.resultMap["$sql/system/customs/select_customs_getall_bydis_220"];

                    if (Jurisdiction.Roles.indexOf('ZHIHUIZHONGXIN2') > -1) {
                        for (var indexShipType = 0; indexShipType < customsListData.length; indexShipType++) {
                            customsListData[indexShipType]["id"] = customsListData[indexShipType]["CUSTOMS_CODE"];
                            customsListData[indexShipType]["text"] = customsListData[indexShipType]["CUSTOMS_NAME"];
                        }
                    } else {
                        for (var indexShipType = 0; indexShipType < customsListData.length; indexShipType++) {
                            if (Jurisdiction.customsCodeParams == customsListData[indexShipType]["CUSTOMS_CODE"]) {
                                customsListData[indexShipType]["id"] = customsListData[indexShipType]["CUSTOMS_CODE"];
                                customsListData[indexShipType]["text"] = customsListData[indexShipType]["CUSTOMS_NAME"];
                            }
                        }
                    }

                    /* for(var indexShipType=0;indexShipType<customsListData.length;indexShipType++){
                        customsListData[indexShipType]["id"]=customsListData[indexShipType]["CUSTOMS_CODE"];
                        customsListData[indexShipType]["text"]=customsListData[indexShipType]["CUSTOMS_NAME"];
                    } */

                    var appendLastData = new Object();
                    appendLastData.id = "";
                    appendLastData.text = "全部";
                    customsListData.unshift(appendLastData);
                } else {
                    window.parent.successMsg("error", data.resultMessage, "错误信息");
                }
            },
            error: function () {
                window.parent.successMsg("error", "系统出错请联系管理员", "错误信息");
                window.parent.closeLoading();
            }
        });

        $('#ALARM_STATUS').select2({
            placeholder: "请选择"
            , width: '150px'
            , data: alarmStatusListData
        });

        $('#ALARM_TYPE').select2({
            placeholder: "请选择"
            , width: '150px'
            , data: alarmTypeListData
        });

        ALARM_CUSTOMS_DOM = $('#ALARM_CUSTOMS').select2({
            placeholder: "请选择"
            , width: '200px'
            , data: customsListData
        });

        if (Jurisdiction.Roles.indexOf('ZHIHUIZHONGXIN2') > -1) {

        } else {
            //console.log(ALARM_CUSTOMS_DOM);
            $('#ALARM_CUSTOMS').select2('readonly', 'readonly');
            $('#ALARM_CUSTOMS').select2('val', Jurisdiction.customsCodeParams);
        }


        $("#stime").prop("readonly", true).datetimepicker({
            showSecond: false,
            timeFormat: 'HH:mm',
            dateFormat: 'yy-mm-dd'
        });

        $("#etime").prop("readonly", true).datetimepicker({
            showSecond: false,
            timeFormat: 'HH:mm',
            dateFormat: 'yy-mm-dd'
        });

        $('#dataTable').mmGrid({
            checkCol: false
            , indexCol: true
            , cols: cols
            , items: items
            , fullWidthRows: true
            , multiSelect: false
            , nowrap: true
            , height: 'auto'
        });

        $('#dataTable').on('cellSelected', function (e, item, rowIndex, colIndex) {
            openInfo = item;
            $('#alarm_info_area').html('');
            $('#alarm_info_area').next().html('');

            var tableDom = $('<table class="table table-bordered table-condensed table-hover">'
                + '<tbody>'
                + '<tr class="text-nowrap"><th id="ALARM_DATE">预警时间:</th></tr>'
                + '<tr class="text-nowrap"><th id="COMFIRTIME">验证时间:</th></tr>'
                + '<tr class="text-nowrap"><th id="REWRITETIME">处理时间:</th></tr>'
                + '<tr class="text"><th id="ALARM_NAME">预警类型:</th></tr>'
                + '<tr class="text"><th id="ALARM_OBJECT">预警对象:</th></tr>'
                + '<tr class="text"><th id="CUSTOMS_NAME">预警关区:</th></tr>'
                + '<tr class="text"><th id="DISPOSE_NAME">预警状态:</th></tr>'
                + '<tr><th id="ALARM_CONTENT">预警内容:</th></tr>'
                + '</table>');

            $('#alarm_info_area').append(tableDom);

            var tdDom = $('<td></td>');
            $('#alarm_info_area tbody tr th').each(function (i, c) {
                var newtdDom = tdDom.clone(true);
                if ($(this).attr('id') == 'ALARM_DATE' || $(this).attr('id') == 'COMFIRTIME' || $(this).attr('id') == 'REWRITETIME') {
                    newtdDom.append(getLocalTime(item[$(this).attr('id')]));
                } else {
                    newtdDom.append(item[$(this).attr('id')]);
                }
                $('#' + $(this).attr('id')).after(newtdDom);
            });

            $('#alarm_info_area').after('<div id="controlTable" class="list-inline text-center"></div>');

            if (Jurisdiction.Roles.indexOf('ZHIHUIZHONGXIN2') > -1) {
                $('#controlTable').append(
                    "<button type=\"button\" class=\"btn btn-info\" onclick=\"goCheck(0,$(this)," + item.ID + "," + item.CUSTOMS_ID + ",'" + item.ALARM_WAY + "'" + ");\">预警查看</button>&nbsp;&nbsp;&nbsp;"
                    + '<button type="button" class="btn btn-danger" onclick="goDelete(0,$(this),' + item.ID + ',' + item.CUSTOMS_ID + ');">撤销预警</button>'
                );
            } else {
                $('#controlTable').append(
                    "<button type=\"button\" class=\"btn btn-info\" onclick=\"goCheck(0,$(this)," + item.ID + "," + item.CUSTOMS_ID + ",'" + item.ALARM_WAY + "'" + ");\">预警查看</button>&nbsp;&nbsp;&nbsp;"
                );
            }

        });

        setTimeout('query(1,10)', 100);

        setTimeout('queryInt()', 500);

        window.parent.closeLoading();
    });

    function goDelete(pageType, dom, openId, CUSTOMS_ID) {
        //console.log(openId);
        layer.confirm(
            '确认删除?'
            , {
                btn: ['确认', '取消']
            }
            , function () {
                $.ajax({
                    url: getDataUrl,
                    type: 'POST',
                    data: {cmd: "$sql/system/alarm/delete_alarm_info_all_byparams,$sql/system/alarm/delete_alarm_dispose_byparams", ID: openId, ALARM_ID: openId, dataSource: 'dataSource2'},
                    dataType: 'json',
                    cache: false,
                    async: false,
                    success: function (data) {
                        query(selectPage, 10);
                        window.top.successMsg("info", "预警撤销完成", "信息");
                    },
                    error: function () {

                    }
                });

                layer.closeAll();
            }
            , function () {
                layer.closeAll();
            }
        );
    }

    function goCheck(pageType, dom, openId, CUSTOMS_ID, ALARM_WAY) {

        parentOpenPageType.pageType = pageType;
        parentOpenPageType.openAlarm = openId;
        parentOpenPageType.openAlarmCustomId = CUSTOMS_ID;
        parentOpenPageType.openInfo = openInfo;
        parentOpenPageType.ALARM_WAY = ALARM_WAY;

        layer.open({
            type: 2,
            area: [pageWidth - 800 + 'px', pageHeight - 100 + 'px'],
            fixed: false,
            maxmin: true,
            title: dom.html(),
            content: '${basePath}/system/view?system/alarm/AlarmInfoPage'
        });
    }

    function queryInt() {
        time1 = window.setInterval("query(" + selectPage + ",10)", 60000);
    }

    /* window.clearInterval(time1);
    time1 = window.setInterval("refreshPageData('" + sZtreeNote.CHANELNO + "','" + clickDomId + "')", 5000); */


    function query(page, pageCount) {
        window.parent.openLoading();

        $('#alarm_info_area').html('');
        $('#alarm_info_area').next().html('');
        var ALARM_TYPE = $('#ALARM_TYPE').select2("data");
        if (ALARM_TYPE != '' && ALARM_TYPE != null) {
            if (null != ALARM_TYPE.CODE_VALUE) {
                ALARM_TYPE = ALARM_TYPE.CODE_VALUE;
            } else {
                ALARM_TYPE = '';
            }
        }

        var ALARM_STATUS = $('#ALARM_STATUS').select2("data");
        if (ALARM_STATUS != '' && ALARM_STATUS != null) {
            if (null != ALARM_STATUS.CODE_VALUE) {
                ALARM_STATUS = ALARM_STATUS.CODE_VALUE;
            } else {
                ALARM_STATUS = '';
            }
        }

        if ($('#ALARM_CUSTOMS').length > 0) {
            ALARM_CUSTOMS = $('#ALARM_CUSTOMS').select2("data");
            if (ALARM_CUSTOMS != '' && ALARM_CUSTOMS != null) {
                ALARM_CUSTOMS = ALARM_CUSTOMS.id;
            }
        } else {
            ALARM_CUSTOMS = Jurisdiction.customsCode;
        }

        var st = $('#stime').val();
        var et = $('#etime').val();
        var timeType;
        if (st != '' && et != '') {
            timeType = 'SE';
        } else if (st != '' && et == '') {
            timeType = 'S';
        } else if (st == '' && et != '') {
            timeType = 'E';
        } else {
            timeType = '';
        }

        var ALARM_OBJECT = '';
        ALARM_OBJECT = $('#alarm_object_input').val();

        var ALARM_WAY = '';
        if (Jurisdiction.Roles.indexOf('ZHIHUIZHONGXIN2') > -1) {
            ALARM_WAY = '';
        } else if (Jurisdiction.Roles.indexOf('ZHIHUIZHONGXIN3') > -1) {
            ALARM_WAY = Jurisdiction.customsCodeParams;
        } else if (Jurisdiction.Roles.indexOf('YWDDY') > -1) {					//业务调度员
            ALARM_WAY = Jurisdiction.customsCodeParams + "_" + Jurisdiction.OrgGuid;
        } else if (Jurisdiction.Roles.indexOf('YWCZY') > -1) {					//业务操作员
            ALARM_WAY = Jurisdiction.customsCodeParams + "_" + Jurisdiction.OrgGuid + "_" + Jurisdiction.UserGuid;
        } else {
            ALARM_WAY = Jurisdiction.customsCodeParams + "_" + Jurisdiction.OrgGuid + "_" + Jurisdiction.UserGuid;
        }

        $.ajax({
            url: getDataUrl,
            type: "POST",
            data: {
                cmd: "$sql/system/alarm/select_alarm_page_byparameter,$sql/system/alarm/select_alarm_count_byparameter",
                STARTTIME: st,
                ENDTIME: et,
                TIMETYPE: timeType,
                ALARM_TYPE: ALARM_TYPE,
                ALARM_STATUS: ALARM_STATUS,
                CUSTOMS_ID: $('#ALARM_CUSTOMS').select2('val'),
                pageCount: pageCount,
                page: page,
                dataSource: 'dataSource2',
                ALARM_OBJECT: ALARM_OBJECT,
                ALARM_WAY: ALARM_WAY
            },
            dataType: "JSON",
            cache: false,
            async: false,
            success: function (data) {
                if (data.resultCode == "200") {

                    if (data.resultMap["$sql/system/alarm/select_alarm_count_byparameter"][0]["COUNTINDEX"] > 0) {

                        appendDataTable(data.resultMap["$sql/system/alarm/select_alarm_page_byparameter"]);
                        if (page < 2) {
                            setPage(page, Math.ceil(data.resultMap["$sql/system/alarm/select_alarm_count_byparameter"][0]["COUNTINDEX"] / 10));
                        }
                    } else {
                        appendDataTable('');
                    }


                } else {
                    window.parent.successMsg("error", data.resultMessage, "错误信息");
                }
            },
            error: function () {
                window.parent.successMsg("error", "系统出错请联系管理员", "错误信息");
            }
        });
        window.parent.closeLoading();
    }

    function appendDataTable(data) {
        $('#dataTable').mmGrid("load", data);
    }

    /* 分页 */
    function setPage(currentPage, totalPages) {
        /* if (currentPage <= totalPages) { */
        $('#pageLimit').bootstrapPaginator({
            currentPage: currentPage,
            totalPages: totalPages,
            size: "mini",
            bootstrapMajorVersion: 3,
            alignment: "andright",
            numberOfPages: 3,
            onPageClicked: function (event, originalEvent, type, page) {
                window.clearInterval(time1);
                selectPage = page;
                query(page, 10);
                time1 = window.setInterval("query(" + selectPage + ",10)", 60000);
            }
        });
        /* } else if (currentPage > totalPages && totalPages > 0) {
            $('#pageLimit').bootstrapPaginator({
                currentPage: totalPages,
                totalPages: totalPages,
                size: "mini",
                bootstrapMajorVersion: 3,
                alignment: "andright",
                numberOfPages: 3,
                onPageClicked: function (event, originalEvent, type, page) {
                    query(page, 10);
                }
            });
        } else if (currentPage > totalPages && totalPages == 0) {
            $('#pageLimit').bootstrapPaginator({
                currentPage: 1,
                totalPages: 1,
                size: "mini",
                bootstrapMajorVersion: 3,
                alignment: "andright",
                numberOfPages: 3,
                onPageClicked: function (event, originalEvent, type, page) {
                    query(page, 10);
                }
            });
        } */
    }

    function addAlarm() {
        layer.open({
            type: 2,
            area: ['400px', '400px'],
            fixed: false,
            maxmin: true,
            title: '新增预警',
            content: '${basePath}/system/view?system/alarm/AlarmAddPage'
        });
    }

    /* 时间戳转换 */
    function getLocalTime(ns) {
        var date = new Date(ns);//如果date为10位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    }
</script>
</html>

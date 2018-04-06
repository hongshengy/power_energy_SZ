<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9"/>

    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap-theme.css">

    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2-bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2.min.css">

    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/uploadify/css/uploadify.css">

    <!-- datetimepicker -->
    <link href="${basePath}/plugins/datepicker/jquery-ui.css" rel="stylesheet">
    <link href="${basePath}/plugins/datepicker/jquery-ui-timepicker-addon.min.css" rel="stylesheet">

    <style type="text/css">
        #rowData .row {
            padding-top: 15px;
        }
    </style>

</head>
<body style="background-color: #ffffff">

<div id="queryDiv" style="padding: 10px;">
    <div class="panel panel-default">
        <div class="panel-heading">查询条件</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1" for="qsupervisor_Name">训导员名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="qsupervisor_Name">
                    </div>
                    <div class="col-sm-2" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_query" class="btn btn-primary" onclick="query(1,true);">查询</button>
                    </div>
                    <div class="col-sm-2" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_export" class="btn btn-primary">导出数据</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="container" style="padding-top: 15px;">

    <div id="infoDiv">
        <%--<div class="panel panel-primary">
            <div class="panel-heading">训导员</div>
            <div id="rowData" class="panel-body" style="padding: 30px;">
                <div class="row">
                    <div class="col-sm-1">
                        <span>姓名</span>
                    </div>
                    <div class="col-sm-5">
                        <span id="supervisor_Name"></span>
                    </div>
                    <div class="col-sm-1">
                        <span>性别</span>
                    </div>
                    <div class="col-sm-5">
                        <span id="supervisor_Sex"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-1">
                        <span>出生日期</span>
                    </div>
                    <div class="col-sm-5">
                        <span id="supervisor_Birthday"></span>
                    </div>
                    <div class="col-sm-1">
                        <span>文化程度</span>
                    </div>
                    <div class="col-sm-5">
                        <span id="supervisor_Degree_Education"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-1">
                        <span>毕业院校</span>
                    </div>
                    <div class="col-sm-5">
                        <span id="supervisor_Graduate_Institutions"></span>
                    </div>
                    <div class="col-sm-1">
                        <span>专业</span>
                    </div>
                    <div class="col-sm-5">
                        <span id="supervisor_Specialty"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-1">
                        <span>职务</span>
                    </div>
                    <div class="col-sm-5">
                        <span id="supervisor_Job"></span>
                    </div>
                    <div class="col-sm-1">
                        <span>职称</span>
                    </div>
                    <div class="col-sm-5">
                        <span id="supervisor_Positional_Titles"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-1">
                        <span>入伍时间</span>
                    </div>
                    <div class="col-sm-5">
                        <span id="supervisor_Service_date"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-1">
                        <span>工作经历</span>
                    </div>
                    <div class="col-sm-5">
                        <span id="supervisor_Work_experience"></span>
                    </div>
                </div>
            </div>
            <div class="panel-footer" id="dog_Exploit_Type"></div>
        </div>--%>

    </div>

    <div id="appendBtnDiv" class="row" style="padding-bottom: 20px;">
        <div class="col-sm-10 text-center">
            <button class="btn btn-success btn-lg" onclick="queryMore();"><span>加载更多</span></button>
        </div>
    </div>

</div>
</body>

<%--jquery--%>
<script type="text/javascript" src="${basePath}/plugins/jquery/jquery-1.8.3.js"></script>

<%--tools--%>
<script type="text/javascript" src="${basePath}/plugins/tools/tools.js"></script>

<%--layer--%>
<script type="text/javascript" src="${basePath}/plugins/layer/layer.js"></script>

<%--select2--%>
<script type="text/javascript" src="${basePath}/plugins/select2/select2.js"></script>

<!-- datetimepicker -->
<script type="text/javascript" src="${basePath}/plugins/jquery-ui/js/jquery-ui.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery-ui-datepicker/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery-ui-datepicker/jquery-ui-timepicker-zh-CN.js"></script>

<script type="text/javascript">

    //    分页
    var offset = 1;
    var allTotalResult = '';
    //    分页


    var dataPath = '${dataPath}';
    var pageDataSql = 'SupervisorInfoMapper.selectInfoByPage';
    var resourcePath = '${resourcePath}';
    var insertDataPath = '${insertDataPath}';


    var mmm = $('input:text').first().outerWidth();

    //    数据表格对象

    var $row = $('<div class="panel panel-primary">\n' +
        '            <div class="panel-heading">训导员</div>\n' +
        '            <div id="rowData" class="panel-body" style="padding: 30px;">\n' +
        '                <div class="row">\n' +
        '                    <div class="col-sm-1">\n' +
        '                        <label>姓名</label>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-5">\n' +
        '                        <span id="supervisor_Name"></span>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-1">\n' +
        '                        <label>性别</label>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-5">\n' +
        '                        <span id="supervisor_Sex"></span>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="row">\n' +
        '                    <div class="col-sm-1">\n' +
        '                        <label>出生日期</label>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-5">\n' +
        '                        <span id="supervisor_Birthday"></span>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-1">\n' +
        '                        <label>文化程度</label>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-5">\n' +
        '                        <span id="supervisor_Degree_Education"></span>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="row">\n' +
        '                    <div class="col-sm-1">\n' +
        '                        <label>毕业院校</label>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-5">\n' +
        '                        <span id="supervisor_Graduate_Institutions"></span>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-1">\n' +
        '                        <label>专业</label>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-5">\n' +
        '                        <span id="supervisor_Specialty"></span>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="row">\n' +
        '                    <div class="col-sm-1">\n' +
        '                        <span>职务</span>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-5">\n' +
        '                        <span id="supervisor_Job"></span>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-1">\n' +
        '                        <span>职称</span>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-5">\n' +
        '                        <span id="supervisor_Positional_Titles"></span>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="row">\n' +
        '                    <div class="col-sm-1">\n' +
        '                        <span>入伍时间</span>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-5">\n' +
        '                        <span id="supervisor_Service_date"></span>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="row">\n' +
        '                    <div class="col-sm-1">\n' +
        '                        <span>工作经历</span>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-5">\n' +
        '                        <span id="supervisor_Work_experience"></span>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="panel-footer" id="dog_Exploit_Type"></div>\n' +
        '        </div>');

    $(function () {

        query(1,true);
    });

    function queryMore() {
        offset += 1;
        query(offset,false);
    }

    function query(offset,cf) {
        if(cf){
            $('#infoDiv').html('');
        }
        var queryObject = new Object();
        queryObject.sql = pageDataSql;
        queryObject.showCount = '10';
        queryObject.currentPage = offset;
        queryObject.supervisor_Name = $('#qsupervisor_Name').val();

        getDataFnNoErrorF(
            dataPath
            , queryObject
            , function (data) {
                var resultData = data[0][pageDataSql][0];
                allTotalResult = resultData[0]['totalResult'];   //总数
                for (var i = 0; i < resultData.length; i++) {
                    $rowNew = $row.clone(true);
                    var item = resultData[i];
                    $rowNew.find('span').each(function () {
                        var itemId = $(this).attr("id");
                        $.each(item, function (keyId, c) {
                            if (keyId == itemId) {
                                switch (keyId) {

                                    case 'supervisor_Sex':
                                        if (c == '1') {
                                            $rowNew.find('#' + itemId).append('男');
                                        } else {
                                            $rowNew.find('#' + itemId).append('女');
                                        }
                                        break;

                                    default:
                                        $rowNew.find('#' + itemId).append(c);
                                        break;
                                }
                            }
                        });
                    });
                    $('#infoDiv').append($rowNew);
                }

                if (offset * 10 >= allTotalResult) {
                    $('#appendBtnDiv').remove();
                }

            }
            , function (data) {
                alert(data);
            }
            , function () {
                alert('error');
            });
    }

    //    导出
    $('#btn_export').click(function () {
        var mmm = ['入伍时间','','专业','文化程度','毕业院校','职称','','职务','工作经历','出生日期','性别','姓名'];
        var titleParams = mmm.join(",");
        window.open('${exportPath}'+$('#formSearch').serialize()+'&sql=SupervisorInfoMapper.selectInfo&fileName=训导员信息管理&titleParams='+titleParams);
    });
</script>
<%--导航--%>
<%--<script type="text/javascript" src="${basePath}/plugins/mainMenu/js/nav.js"></script>--%>

</html>
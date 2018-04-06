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


    </style>

</head>
<body style="background-color: #ffffff">

<div id="queryDiv" style="padding: 10px;">
    <div class="panel panel-default">
        <div class="panel-heading">查询条件</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1 text-nowrap" for="dog_Id">犬名</label>
                    <div class="col-sm-3">
                        <div id="dog_Id"></div>
                    </div>
                    <div class="col-sm-1" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_query" class="btn btn-primary" onclick="query(1,true);">查询</button>
                    </div>
                    <div class="col-sm-1" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_add" class="btn btn-primary" onclick="add();">新增</button>
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
        <%--<div class="panel panel-primary">--%>
            <%--<div class="panel-heading">训练记录</div>--%>
            <%--<div class="panel-body" style="padding: 30px;">--%>
                <%--<div id="headDiv" class="row">--%>
                    <%--<div class="col-sm-3">--%>
                        <%--<div class="row">--%>
                            <%--<div id="dog_Image" style="width: 100%;" needAppend="true">--%>
                                <%--<img src="" width="100%" height="100%">--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                    <%--<div class="col-sm-7">--%>
                        <%--<div id="dog_Name" class="row" needAppend="true">--%>
                            <%--<div class="col-sm-2">--%>
                                <%--<label>犬名</label>--%>
                            <%--</div>--%>
                            <%--<div class="col-sm-1">:</div>--%>
                            <%--<div class="col-sm-7">--%>
                                <%--<span></span>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div id="train_Type" class="row" needAppend="true">--%>
                            <%--<div class="col-sm-2">--%>
                                <%--<label>训练类型</label>--%>
                            <%--</div>--%>
                            <%--<div class="col-sm-1">:</div>--%>
                            <%--<div class="col-sm-7">--%>
                                <%--<span></span>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div id="train_Subject" class="row" needAppend="true">--%>
                            <%--<div class="col-sm-2">--%>
                                <%--<label>训练科目</label>--%>
                            <%--</div>--%>
                            <%--<div class="col-sm-1">:</div>--%>
                            <%--<div class="col-sm-7">--%>
                                <%--<span></span>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div id="train_Date" class="row" needAppend="true">--%>
                            <%--<div class="col-sm-2">--%>
                                <%--<label>训练时间</label>--%>
                            <%--</div>--%>
                            <%--<div class="col-sm-1">:</div>--%>
                            <%--<div class="col-sm-7">--%>
                                <%--<span></span>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div id="train_Time" class="row" needAppend="true">--%>
                            <%--<div class="col-sm-2">--%>
                                <%--<label>训练时长</label>--%>
                            <%--</div>--%>
                            <%--<div class="col-sm-1">:</div>--%>
                            <%--<div class="col-sm-7">--%>
                                <%--<span></span>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div id="train_Location" class="row" needAppend="true">--%>
                            <%--<div class="col-sm-2">--%>
                                <%--<label>训练场地</label>--%>
                            <%--</div>--%>
                            <%--<div class="col-sm-1">:</div>--%>
                            <%--<div class="col-sm-7">--%>
                                <%--<span></span>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div id="supervisor" class="row" needAppend="true">--%>
                            <%--<div class="col-sm-2">--%>
                                <%--<label>训导员</label>--%>
                            <%--</div>--%>
                            <%--<div class="col-sm-1">:</div>--%>
                            <%--<div class="col-sm-7">--%>
                                <%--<span></span>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div id="supervisor_Teacher" class="row" needAppend="true">--%>
                            <%--<div class="col-sm-2">--%>
                                <%--<label>训导老师</label>--%>
                            <%--</div>--%>
                            <%--<div class="col-sm-1">:</div>--%>
                            <%--<div class="col-sm-7">--%>
                                <%--<span></span>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div id="footDiv" class="row" style="padding-top: 10px;">--%>
                    <%--<div class="col-sm-10">--%>
                        <%--<div class="row">--%>
                            <%--<div class="col-sm-2">--%>
                                <%--<label>训练总结:</label>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<div id="train_Content" class="row" needAppend="true">--%>
                            <%--<div class="col-sm-10 col-sm-offset-1">--%>
                                <%--<span></span>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
            <%--<div class="panel-footer" id="dog_Exploit_Type"></div>--%>
        <%--</div>--%>
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
    var bodyH;
    var bodyW;
    var parentParams;

    //    分页
    var offset = 1;
    var allTotalResult = '';
    //    分页

    var dataPath = '${dataPath}';
    var pageDataSql = 'TrainLogInfoMapper.getListByParamsByPage';
    var resourcePath = '${resourcePath}';
    var insertDataPath = '${insertDataPath}';
    var deleteDataPath = '${deleteDataPath}';

    appendSelect2('dog_Id', getDog(), '200');                   //加载下拉框数据                       //犬名*

    var mmm = $('input:text').first().outerWidth();

    //    数据表格对象
    var $row = $('<div class="panel panel-primary">\n' +
        '            <div class="panel-heading">训练记录</div>\n' +
        '            <div class="panel-body" style="padding: 30px;">\n' +
        '                <div id="headDiv" class="row">\n' +
        '                    <div class="col-sm-3">\n' +
        '                        <div class="row">\n' +
        '                            <div id="dog_Image" style="width: 100%;" needAppend="true">\n' +
        '                                <img src="" width="100%" height="100%">\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-7">\n' +
        '                        <div id="dog_Name" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>犬名</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="trainType" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>训练类型</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="train_subject_Name" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>训练科目</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="train_Date" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>训练时间</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="train_Time" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>训练时长</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="train_Location" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>训练场地</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="supervisor_Name" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>训导员</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="supervisor_Teacher" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>训导老师</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div id="footDiv" class="row" style="padding-top: 10px;">\n' +
        '                    <div class="col-sm-10">\n' +
        '                        <div class="row">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>训练总结:</label>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="train_Content" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-10 col-sm-offset-1">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div id="btnDiv" class="row" style="padding-top: 10px;">\n' +
        '                    <div class="col-sm-offset-10 col-sm-2">\n' +
        '                        <div class="row">\n' +
        '                            <div class="col-sm-6">\n' +
        '                                <button class="btn btn-info btn-sm" onclick="editFun();"><span>修改</span></button>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-6">\n' +
        '                                <button class="btn btn-danger btn-sm" onclick="delFun();"><span>删除</span></button>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="panel-footer" id="dog_Exploit_Type"></div>\n' +
        '        </div>');

    $(function () {
//        alert(window.screen.availHeight);
        bodyH = window.screen.availHeight - 300;
        bodyW = $('body').width();
        query(1,true);
    });

    function queryMore() {
        offset += 1;
        query(offset,false);
    }

    function query(offset,cf) {
        debugger;
        if(cf){
            $('#infoDiv').html('');
        }
        var queryObject = new Object();
        queryObject.sql = pageDataSql;
        queryObject.showCount = '10';
        queryObject.currentPage = offset;
        queryObject.dog_Id = $('#dog_Id').select2('val');

        getDataFnNoErrorF(
            dataPath
            , queryObject
            , function (data) {
                var resultData = data[0][pageDataSql][0];
                allTotalResult = resultData[0]['totalResult'];   //总数
                for (var i = 0; i < resultData.length; i++) {
                    $rowNew = $row.clone(true);
                    var item = resultData[i];
                    $rowNew.find('div[needAppend="true"]').each(function () {
                        var itemId = $(this).attr("id");
                        $.each(item, function (keyId, c) {
                            if (keyId == itemId) {
                                switch (keyId) {
                                    case 'dog_Image':
                                        if (null != c && 'null' != c && '' != c) {
                                            $rowNew.find('img').attr('src', resourcePath + c);
                                        } else {
                                            $rowNew.find('img').attr('src', '${basePath}plugins/img/timg.jpg');
                                        }
                                        break;

                                    case 'train_Date':
                                        $rowNew.find('#' + itemId).find('span').append(getLocalDate(c.time));
                                        break;

//                                    case 'supervisor':
//                                        $rowNew.find('#' + itemId).find('span').append(c);
//                                        break;
//
//                                    case 'train_Subject':
//                                        $rowNew.find('#' + itemId).find('span').append(c);
//                                        break;

                                    default:
                                        $rowNew.find('#' + itemId).find('span').append(c);
                                        break;
                                }
                            }else{
                                if(keyId == 'id'){
                                    var editDom = $rowNew.find('#btnDiv').find('button[onclick="editFun();"]');
                                    editDom.attr('onclick','editFun('+c+');');
                                    var delDom = $rowNew.find('#btnDiv').find('button[onclick="delFun();"]');
                                    delDom.attr('onclick','delFun('+c+');');
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

    //    添加
    function add() {
        layerOpenFn('${showPagePath}','添加训练记录','base/train/train_log_infoPage',bodyW-100, bodyH);
    }

//    编辑
    function editFun(id) {
        parentParams = id;
        layerOpenFn('${showPagePath}','编辑训练记录','base/train/train_log_infoEditPage',bodyW-100, bodyH);
    }

    function delFun(id) {
        parentParams = id;
        layerConfirm('确认删除？',['确认','取消'],[function () {
            getDataFnNoErrorF(
                deleteDataPath
                , {sql:'TrainLogInfoMapper.deleteInfo',id:id}
                , function (data) {
                    if (null != data && data[0] > 0) {
                        window.top.layerMsg2('删除成功');
                        query(1,10);
                    }
                }
                , function (data) {
                    window.top.layerMsg(data);
                }
                , function () {
                    sysErrorAlert;
                });
            layer.closeAll();
        },function () {

        }]);
    }

    //    导出
    $('#btn_export').click(function () {
//        var mmm = ['','','ID'];
        var mmm = ['检疫犬名','训练类型','','训练总结','检疫犬图片路径','','检疫犬ID','训导老师','训练科目','训练时间','','训练时长(分钟)','','训练场地','训导员'];
        var titleParams = mmm.join(",");
        window.open('${exportPath}'+$('#formSearch').serialize()+'&sql=TrainLogInfoMapper.selectInfo&fileName=训练记录管理&titleParams='+titleParams);
    });
</script>
<%--导航--%>
<%--<script type="text/javascript" src="${basePath}/plugins/mainMenu/js/nav.js"></script>--%>

</html>
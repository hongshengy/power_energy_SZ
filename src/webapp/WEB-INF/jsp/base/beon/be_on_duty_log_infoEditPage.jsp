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

    <%--select2--%>
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2-bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2.min.css">

    <!-- datetimepicker -->
    <link href="${basePath}/plugins/datepicker/jquery-ui.css" rel="stylesheet">
    <link href="${basePath}/plugins/datepicker/jquery-ui-timepicker-addon.min.css" rel="stylesheet">

    <style type="text/css">
        .error {
        / / float: left;
            color: red;
            white-space: nowrap;
        }
    </style>
</head>
<body style="background-color: #ffffff;">
<div class="container-fluid" id="divBodyDom" style="position:relative;">

    <div id="infoDiv" style="padding-top: 15px;"></div>

    <div class="row">
        <div class="panel-body" style="padding-bottom:5px;" id="showPanel">
            <div class="panel panel-default">
                <div class="panel-heading">编辑执勤记录</div>
                <div class="panel-body">
                    <form id="formSearch" class="form-horizontal">
                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="be_Date">执勤日期</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="be_Date" name="be_Date">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="dog_Id">犬名</label>
                            <div class="col-sm-3">
                                <div id="dog_Id"></div>
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="be_Time">执勤时长</label>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="number" class="form-control" id="be_Time" name="be_Time">
                                    <div class="input-group-addon">分钟</div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="be_Location">执勤地点</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="be_Location" name="be_Location">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="supervisor">训导员</label>
                            <div class="col-sm-3">
                                <div id="supervisor"></div>
                            </div>
                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="be_Content">执勤说明</label>
                            <div class="col-sm-7">
                                <textarea class="form-control" rows="9" id="be_Content" name="be_Content"></textarea>
                            </div>

                        </div>

                        <%--隐藏表单--%>
                        <input type="hidden" name="dog_Id">
                        <input type="hidden" name="supervisor">

                    </form>
                </div>
            </div>
        </div>
    </div>


    <div class="row" style="position:absolute; width: 100%;bottom: 20px;">
        <div class="col-sm-offset-10  col-sm-1 text-center" style="text-align:left;">
            <button type="button" id="btn_save" class="btn btn-primary">保存</button>
        </div>
        <div class="col-sm-1 text-center" style="text-align:left;">
            <button type="button" id="btn_cancel" class="btn btn-primary">取消</button>
        </div>
    </div>

</div>
</body>

<%--jquery--%>
<script type="text/javascript" src="${basePath}/plugins/jquery/jquery-1.8.3.js"></script>

<%--tools--%>
<script type="text/javascript" src="${basePath}/plugins/tools/tools.js"></script>

<%--select2--%>
<script type="text/javascript" src="${basePath}/plugins/select2/select2.js"></script>

<%--layer--%>
<script type="text/javascript" src="${basePath}/plugins/layer/layer.js"></script>

<!-- 表单验证 -->
<script type="text/javascript" src="${basePath}/plugins/jquery_validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery_validate/messages_zh.js"></script>

<!-- datetimepicker -->
<script type="text/javascript" src="${basePath}/plugins/jquery-ui/js/jquery-ui.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery-ui-datepicker/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery-ui-datepicker/jquery-ui-timepicker-zh-CN.js"></script>

<script type="text/javascript">
    //    调用后台sql接口
    var dataPath = '${dataPath}';
    var updateDataPath = '${updateDataPath}';
    var selectRowData = parent.parentParams;

    var pageDataSql = 'BeOnDutyLogInfoMapper.selectInfo';
    var resourcePath = '${resourcePath}';

    //    页面中心高度
    var winHeight = initBodyHeight().winHeightR;
    $('#divBodyDom').height(winHeight);

    //    下拉框菜单S
    appendSelect2('dog_Id', getDog(), $('input:text').eq(0).outerWidth());                   //加载下拉框数据                       //犬名*
    $('#dog_Id').on("change", function () {                                                  //下拉框改变触发方法                   //犬名*
        $('input[name="dog_Id"]').val($('#dog_Id').select2('val'));                         //设置下拉框相对应hidden项              //犬名*
        query();
        //    特殊处理
    });

    appendSelect2('supervisor', getSup(), $('input:text').eq(0).outerWidth());                   //加载下拉框数据                       //训导员*
    $('#supervisor').on("change", function () {                                                  //下拉框改变触发方法                   //训导员*
        $('input[name="supervisor"]').val($('#supervisor').select2('val'));                         //设置下拉框相对应hidden项              //训导员*
    });
    //    下拉框菜单E

    //    日期框S
    dateToolsInit();

    $("#be_Date").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    //    日期框E

    //    根据ID获取当前选择的最新数据
    var getSelectDataByIdObject = new Object();
    getSelectDataByIdObject.sql = 'BeOnDutyLogInfoMapper.selectInfo';
    getSelectDataByIdObject.id = selectRowData;

    getDataFnNoErrorF(
        dataPath
        , getSelectDataByIdObject
        , function (data) {
            if (null != data[0] && '' != data[0]) {
                appendData(data[0][getSelectDataByIdObject.sql][0]);
            }
        }
        , function (data) {
            window.top.layerMsg(data);
        }
        , function () {
            sysErrorAlert;
        });

    //    表单提交确认后
    $.validator.setDefaults({
        submitHandler: function () {
            subData();
        }
    });

    //    取消按钮
    $('#btn_cancel').click(function () {
        parent.layer.closeAll();
    });

    //    确定按钮
    $('#btn_save').click(function () {
        $('#formSearch').submit();
    });

    //    数据表格对象
    var $row = $('<div class="panel panel-primary">\n' +
        '            <div class="panel-heading">执勤记录</div>\n' +
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
        '                        <div id="be_Date" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>执勤日期</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="be_Time" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>执勤时长</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="be_Location" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>执勤地点</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="supervisor" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>训导员</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div id="footDiv" class="row" style="padding-top: 10px;">\n' +
        '                    <div class="col-sm-10">\n' +
        '                        <div class="row">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>执勤说明:</label>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="be_Content" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-10 col-sm-offset-1">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="panel-footer" id="dog_Exploit_Type"></div>\n' +
        '        </div>');

    //    启动完成方法
    $(function () {

        //        表单输入项验证规则
        $("#formSearch").validate({
            rules: {
                be_Date: {
                    required: true
                }
                ,be_Time: {
                    required: true
                    ,maxlength: 10
                    ,digits:true
                }
                , be_Content: {
                    maxlength: 500
                }
                , be_Location: {
                    required: true
                    ,maxlength: 100
                }
            }
            , messages: {
                be_Date: {
                    required: "执勤日期不能为空"
                }
                ,be_Time: {
                    required: "执勤时长不能为空"
                    ,maxlength: "超出最大长度限制10"
                    ,digits: "执勤时长必须为整数"
                }
                , be_Content: {
                    maxlength: "超出最大长度限制500"
                }
                , be_Location: {
                    required: "执勤地点不能为空"
                    ,maxlength: "超出最大长度限制100"
                }
            }
        });
    });

    //    数据更新
    function subData() {
        //        发起layer询问框
        layerConfirm('确认提交？', ['确认', '取消'], [function () {                                                //**************
            //正常提交数据
            //发起update请求
            getDataFnNoErrorF(                                                                                  //↓
                updateDataPath                                                                                  //↓
                , $('#formSearch').serialize() + '&sql=BeOnDutyLogInfoMapper.updateInfo&id=' + selectRowData    //↓
                , function (data) {                                                                             //↓
                    if (null != data) {                                                                         //↓
                        parent.query(1, true);                                                                    //↓
                        parent.layer.closeAll();                                                                //↓
                    }                                                                                           //↓
                }                                                                                               //↓
                , function (data) {                                                                             //↓
                    window.top.layerMsg(data);                                                                  //↓
                }                                                                                               //↓
                , function () {                                                                                 //↓
                    sysErrorAlert;                                                                              //↓
                });                                                                                             //↓

        }, function () {                                                                                        //↓
        }]);                                                                                                    //**************
    }

    //    数据装箱
    function appendData(resultData) {
        $.each($('#formSearch input:text,#formSearch textarea,#formSearch input[type="hidden"],#formSearch input[type="number"]'), function () {
            var domId = $(this).attr('id');
            if (null != domId && undefined != domId && '' != domId) {
                $.each(resultData, function (i, c) {
                    if (domId == i) {
                        switch (i) {
                            //                    特殊处理
                            case 'be_Date':
                                $('#' + i).val(getLocalDate(c.time));
                                break;

                            default:
                                $('#' + i).val(c);
                                break;
                        }
                    }
                });
            } else if ($(this).attr('type') == 'hidden') {
                var domId = $(this).attr('name');
                switch (domId) {
//                    特殊处理
//                    case '':
//                        $(this).attr('value', resultData[domId]);
//                        break;

//                    默认填充selec2控件
                    default:
                        $('#' + domId).select2('val', resultData[domId]);
                        $(this).attr('value', resultData[domId]);
                        break;
                }
            }
        });
    }

    function query() {
        $('#infoDiv').html('');

        var queryObject = new Object();
        queryObject.sql = pageDataSql;

        queryObject.dog_Id = $('#dog_Id').select2('val');

        getDataFnNoErrorF(
            dataPath
            , queryObject
            , function (data) {
                var resultData = data[0][pageDataSql];
//                allTotalResult = resultData[0]['totalResult'];   //总数
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

                                    case 'be_Date':
                                        $rowNew.find('#' + itemId).find('span').append(getLocalDate(c.time));
                                        break;

                                    default:
                                        $rowNew.find('#' + itemId).find('span').append(c);
                                        break;
                                }
                            }else{
//                                if(keyId == 'id'){
//                                    var editDom = $rowNew.find('#btnDiv').find('button[onclick="editFun();"]');
//                                    editDom.attr('onclick','editFun('+c+');');
//                                    var delDom = $rowNew.find('#btnDiv').find('button[onclick="delFun();"]');
//                                    delDom.attr('onclick','delFun('+c+');');
//                                }
                            }
                        });
                    });
                    $('#infoDiv').append($rowNew);
                    var topH = parseInt($('#infoDiv').height())+parseInt($('#axc').css('top'))-15;
                    $('#axc').hide();
                    $('#axc').attr('style','position:absolute; width: 100%;top:'+topH+'px; bottom: 20px;');
                    $('#axc').show();
                }

//                if (offset * 10 >= allTotalResult) {
//                    $('#appendBtnDiv').remove();
//                }

            }
            , function (data) {
                alert(data);
            }
            , function () {
                alert('error');
            });
    }
</script>

</html>
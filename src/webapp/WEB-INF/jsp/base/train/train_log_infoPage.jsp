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
                <div class="panel-heading">添加训练记录</div>
                <div class="panel-body">
                    <form id="formSearch" class="form-horizontal">
                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="train_Date">训练时间</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="train_Date" name="train_Date">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="dog_Id">犬名</label>
                            <div class="col-sm-3">
                                <div id="dog_Id"></div>
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="train_Time">训练时长</label>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="number" class="form-control" id="train_Time" name="train_Time">
                                    <div class="input-group-addon">分钟</div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="train_Subject">训练科目</label>
                            <div class="col-sm-3">
                                <div id="train_Subject"></div>
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="train_Type">训练类型</label>
                            <div class="col-sm-3">
                                <div id="train_Type"></div>
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="train_Location">训练场地</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="train_Location" name="train_Location">
                            </div>
                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="supervisor">训导员</label>
                            <div class="col-sm-3">
                                <div id="supervisor"></div>
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="supervisor_Teacher">训导老师</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="supervisor_Teacher" name="supervisor_Teacher">
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="train_Content">训练总结</label>
                            <div class="col-sm-7">
                                <textarea class="form-control" rows="9" id="train_Content" name="train_Content"></textarea>
                            </div>

                        </div>

                        <%--隐藏表单--%>
                        <input type="hidden" name="dog_Id">
                        <input type="hidden" name="train_Subject">
                        <input type="hidden" name="train_Type">
                        <input type="hidden" name="supervisor">

                    </form>
                </div>
            </div>
        </div>
    </div>

    <div id="axc" class="row" style="position:absolute; width: 100%;bottom: 20px;">
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
    var insertDataPath = '${insertDataPath}';
    var pageDataSql = 'TrainLogInfoMapper.selectInfo';
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

    appendSelect2('train_Type', getTtp(), $('input:text').eq(0).outerWidth());                   //加载下拉框数据                       //训练类型*
    $('#train_Type').on("change", function () {                                                  //下拉框改变触发方法                   //训练类型*
        $('input[name="train_Type"]').val($('#train_Type').select2('val'));                         //设置下拉框相对应hidden项              //训练类型*
    });

    appendSelect2('train_Subject', getTsu(), $('input:text').eq(0).outerWidth());                   //加载下拉框数据                       //训练科目*
    $('#train_Subject').on("change", function () {                                                  //下拉框改变触发方法                   //训练科目*
        $('input[name="train_Subject"]').val($('#train_Subject').select2('val'));                         //设置下拉框相对应hidden项              //训练科目*
    });

    appendSelect2('supervisor', getSup(), $('input:text').eq(0).outerWidth());                   //加载下拉框数据                       //训导员*
    $('#supervisor').on("change", function () {                                                  //下拉框改变触发方法                   //训导员*
        $('input[name="supervisor"]').val($('#supervisor').select2('val'));                         //设置下拉框相对应hidden项              //训导员*
    });
    //    下拉框菜单E

    //    日期框S
    dateToolsInit();

    $("#train_Date").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    //    日期框E

    //    表单提交确认后
    $.validator.setDefaults({
        submitHandler: function () {
            subData();  //没有重复数据处理插入操作
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
        '            </div>\n' +
        '            <div class="panel-footer" id="dog_Exploit_Type"></div>\n' +
        '        </div>');

    //    启动完成方法
    $(function () {

        //        表单输入项验证规则
        $("#formSearch").validate({
            rules: {
                train_Date: {
                    required: true
                }
                ,train_Time: {
                    required: true
                    ,maxlength: 10
                    ,digits:true
                }
                , train_Content: {
                    maxlength: 500
                }
                , train_Location: {
                    maxlength: 100
                }
                , supervisor_Teacher: {
                    required: true
                    ,maxlength: 100
                }
            }
            , messages: {
                train_Date: {
                    required: "训练时间不能为空"
                }
                ,train_Time: {
                    required: "训练时长不能为空"
                    ,maxlength: "超出最大长度限制10"
                    ,digits: "训练时长必须为整数"
                }
                , train_Content: {
                    maxlength: "超出最大长度限制500"
                }
                , train_Location: {
                    maxlength: "超出最大长度限制100"
                }
                , supervisor_Teacher: {
                    required: "训导老师不能为空"
                    ,maxlength: "超出最大长度限制100"
                }
            }
        });
    });

    //    数据插入
    function subData() {
        layerConfirm('确认提交？', ['确认', '取消'], [function () {              //        发起layer询问框            //**************
            getDataFnNoErrorF(                                          //正常提交数据                             //**************
                insertDataPath                                          //发起insert请求                           //**************
                , $('#formSearch').serialize() + '&sql=TrainLogInfoMapper.insertInfo'                  //**************
                , function (data) {                                                                             //**************
                    if (null != data) {                                                                         //**************
                        parent.query(1,true);                                                                    //**************
                        parent.layer.closeAll();                                                                //**************
                    }                                                                                           //**************
                }                                                                                                   //**************
                , function (data) {                                                                             //**************
                    window.top.layerMsg(data);                                                                  //**************
                }                                                                                               //**************
                , function () {                                                                                 //**************
                    sysErrorAlert;                                                                              //**************
                });                                                                                             //**************
        }, function () {
        }]);                                                                                        //**************
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

                                    case 'train_Date':
                                        $rowNew.find('#' + itemId).find('span').append(getLocalDate(c.time));
                                        break;

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
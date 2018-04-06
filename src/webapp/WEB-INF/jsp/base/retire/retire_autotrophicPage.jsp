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
    <div class="row">
        <div class="panel-body" style="padding-bottom:5px;" id="showPanel">
            <div class="panel panel-default">
                <div class="panel-heading">添加退役犬自养</div>
                <div class="panel-body">
                    <form id="formSearch" class="form-horizontal">
                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="autotrophic_admin">领养管理员</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="autotrophic_admin" name="autotrophic_admin">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="autotrophic_address">领养地址</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="autotrophic_address" name="autotrophic_address">
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="dog_Id">犬名</label>
                            <div class="col-sm-3">
                                <div id="dog_Id"></div>
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="retire_date">领养时间</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="retire_date" name="retire_date">
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="report">非正常情况报告</label>
                            <div class="col-sm-3">
                                <textarea class="form-control" rows="3" id="report" name="report"></textarea>
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="management">处置</label>
                            <div class="col-sm-3">
                                <textarea class="form-control" rows="3" id="management" name="management"></textarea>
                            </div>

                        </div>

                        <%--隐藏表单--%>
                        <input type="hidden" name="dog_Id">

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
    var insertDataPath = '${insertDataPath}';

    //    页面中心高度
    var winHeight = initBodyHeight().winHeightR;
    $('#divBodyDom').height(winHeight);

    //    下拉框菜单S
    appendSelect2('dog_Id', getDog(), $('input:text').eq(0).outerWidth());                   //加载下拉框数据                       //犬名*
    $('#dog_Id').on("change", function () {                                                  //下拉框改变触发方法                   //犬名*
        $('input[name="dog_Id"]').val($('#dog_Id').select2('val'));                         //设置下拉框相对应hidden项              //犬名*
    });
    //    下拉框菜单E

    //    日期框S
    dateToolsInit();

    $("#retire_date").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    //    日期框E

    //    表单提交确认后
    $.validator.setDefaults({
        submitHandler: function () {
            var queryCheckObject = new Object();
            queryCheckObject.sql = 'RetireAutotrophicMapper.selectCheck';
            queryCheckObject.dog_Id = $('#dog_Id').select2('val');

            getDataFnNoErrorF(
                dataPath
                , queryCheckObject
                , function (data) {
                    if (data[0][queryCheckObject.sql].length > 0) {
                        window.top.layerMsg('选择检疫犬是退役犬,请重新输入');
                    } else {
                        subData();  //没有重复数据处理插入操作
                    }
                }
                , function (data) {
                    window.top.layerMsg(data);
                }
                , function () {
                    sysErrorAlert;
                });
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

    //    启动完成方法
    $(function () {
        //        表单输入项验证规则
        $("#formSearch").validate({
            rules: {
                retire_date: {
                    required: true
                }
                , autotrophic_admin: {
                    required: true
                    ,maxlength: 10
                }
                , autotrophic_address: {
                    required: true
                    ,maxlength: 200
                }
                , report: {
                    maxlength: 500
                }
                , management: {
                    maxlength: 500
                }
            }
            , messages: {
                retire_date: {
                    required: "领养时间不能为空"
                }
                , autotrophic_admin: {
                    required: "领养管理员不能为空"
                    ,maxlength: "超出最大长度限制10"
                }
                , autotrophic_address: {
                    required: "领养人地址不能为空"
                    ,maxlength: "超出最大长度限制200"
                }
                , report: {
                    maxlength: "超出最大长度限制500"
                }
                , management: {
                    maxlength: "超出最大长度限制500"
                }
            }
        });
    });

    //    数据插入
    function subData() {
        layerConfirm('确认提交？', ['确认', '取消'], [function () {              //        发起layer询问框            //**************
            getDataFnNoErrorF(                                          //正常提交数据                             //**************
                insertDataPath                                          //发起insert请求                           //**************
                , $('#formSearch').serialize() + '&sql=RetireAutotrophicMapper.insertInfo'                  //**************
                , function (data) {                                                                             //**************
                    if (null != data) {                                                                         //**************
                        parent.query(1, 10);                                                                    //**************
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
</script>

</html>
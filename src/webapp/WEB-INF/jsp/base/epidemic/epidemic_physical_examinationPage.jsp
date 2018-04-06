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

    <!-- datetimepicker -->
    <link href="${basePath}/plugins/datepicker/jquery-ui.css" rel="stylesheet">
    <link href="${basePath}/plugins/datepicker/jquery-ui-timepicker-addon.min.css" rel="stylesheet">

    <style type="text/css">
        .error {
         /*float: left;*/
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
                <div class="panel-heading">添加检疫犬日常体检</div>
                <div class="panel-body">
                    <form id="formSearch" class="form-horizontal">
                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="dog_Name">犬名</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="dog_Name" name="dog_Name">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="examination_Date">体检日期</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="examination_Date" name="examination_Date">
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="mental_State">精神状态</label>
                            <div class="col-sm-7">
                                <textarea class="form-control" rows="3" id="mental_State" name="mental_State"></textarea>
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="status">状况</label>
                            <div class="col-sm-7">
                                <textarea class="form-control" rows="3" id="status" name="status"></textarea>
                            </div>

                        </div>

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

    //    日期框S
    dateToolsInit();

    $("#examination_Date").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
        , maxDate: new Date()
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

    //    启动完成方法
    $(function () {

        //        表单输入项验证规则
        $("#formSearch").validate({
            rules: {
                examination_Date: {
                    required: true
                }
                , status: {
                    maxlength: 100
                }
                , mental_State: {
                    maxlength: 100
                }
            }
            , messages: {
                examination_Date: {
                    required: "体检日期不能为空"
                }
                , status: {
                    maxlength: "超出最大长度限制100"
                }
                , mental_State: {
                    maxlength: "超出最大长度限制100"
                }
            }
        });
    });

    //    数据插入
    function subData() {
        layerConfirm('确认提交？', ['确认', '取消'], [function () {              //        发起layer询问框            //**************
            getDataFnNoErrorF(                                          //正常提交数据                             //**************
                insertDataPath                                          //发起insert请求                           //**************
                , $('#formSearch').serialize() + '&sql=PhysicalExaminationInfoMapper.insertInfo'                  //**************
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
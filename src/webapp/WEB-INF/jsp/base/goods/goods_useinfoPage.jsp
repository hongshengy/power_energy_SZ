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
<div class="panel-body" style="padding-bottom:5px;">
    <div class="panel panel-default" id="showPanel">
        <div class="panel-heading">添加物资领用</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1 text-nowrap" for="goods_use_User_Name">物资领用人员</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="goods_use_User_Name" name="goods_use_User_Name">
                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="goods_Type_Id">物资类型名</label>
                    <div class="col-sm-3">
                        <div id="goods_Type_Id"></div>
                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="storage_Room_Id">库房</label>
                    <div class="col-sm-3">
                        <div id="storage_Room_Id"></div>
                    </div>

                </div>

                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1 text-nowrap" for="goods_Id">物资名</label>
                    <div class="col-sm-3">
                        <div id="goods_Id"></div>
                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="use_Date">物资领用日期</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="use_Date" name="use_Date">
                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="goods_use_Count">物资领用数量</label>
                    <div class="col-sm-3">
                        <input type="number" class="form-control" id="goods_use_Count" name="goods_use_Count">
                    </div>

                </div>

                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1 text-nowrap" for="goods_use_Content">物资领用备注</label>
                    <div class="col-sm-8">
                        <textarea class="form-control" rows="4" id="goods_use_Content" name="goods_use_Content"></textarea>
                    </div>

                </div>
                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1 text-nowrap" for="goods_use_Remark">物资领用说明</label>
                    <div class="col-sm-8">
                        <textarea class="form-control" rows="4" id="goods_use_Remark" name="goods_use_Remark"></textarea>
                    </div>

                </div>

                <%--隐藏表单--%>
                <input type="hidden" name="goods_Type_Id">
                <input type="hidden" name="storage_Room_Id">
                <input type="hidden" name="goods_Id">
            </form>
        </div>
    </div>

    <div class="form-horizontal">
        <div class="form-group">
            <div class="col-sm-offset-10  col-sm-2 text-center" style="text-align:left;">
                <button type="button" id="btn_save" class="btn btn-primary">保存</button>
                <button type="button" id="btn_cancel" class="btn btn-primary">取消</button>
            </div>
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
    $('#showPanel').height(window.parent.$('body').height() - 200);

    //    下拉框菜单S
    appendSelect2('goods_Type_Id', getGti(), $('input:text').eq(0).outerWidth());               //加载下拉框数据                                    //.
    $('#goods_Type_Id').on("change", function () {                                              //下拉框改变触发方法                                 //物资类型*
        $('input[name="goods_Type_Id"]').val($('#goods_Type_Id').select2('val'));               //设置下拉框相对应hidden项                           //物资类型*
    });

    appendSelect2('storage_Room_Id', getSri(), $('input:text').eq(0).outerWidth());             //加载下拉框数据                                    //库房*
    $('#storage_Room_Id').on("change", function () {                                            //下拉框改变触发方法                                 //库房*
        $('input[name="storage_Room_Id"]').val($('#storage_Room_Id').select2('val'));           //设置下拉框相对应hidden项                           //库房*
    });

    appendSelect2('goods_Id', getGi(), $('input:text').eq(0).outerWidth());                     //加载下拉框数据                                    //物资*
    $('#goods_Id').on("change", function () {                                                   //下拉框改变触发方法                                 //物资*
        $('input[name="goods_Id"]').val($('#goods_Id').select2('val'));                         //设置下拉框相对应hidden项                           //物资*
    });
    //    下拉框菜单E

    //    日期框S
    dateToolsInit();

    $("#use_Date").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    //    日期框E

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

    //    启动完成方法
    $(function () {

        //        表单输入项验证规则
        $("#formSearch").validate({
            rules: {
                goods_use_Count: {
                    required: true
                    ,number: true
                    , maxlength: 10
                }
                , goods_use_User_Name: {
                    required: true
                    , maxlength: 10
                }
                , goods_use_Content: {
                    required: true
                    , maxlength: 500
                }
                , use_Date: {
                    required: true
                }
                , goods_use_Remark: {
                    maxlength: 500
                }
            }
            , messages: {
                goods_use_Count: {
                    required: '物资领用数量不能为空'
                    ,number: '必须是数字'
                    , maxlength: "超出最大长度限制10"
                }
                , goods_use_User_Name: {
                    required: '物资领用人不能为空'
                    , maxlength: "超出最大长度限制10"
                }
                , goods_use_Content: {
                    required: '物资领用备注不能为空'
                    , maxlength: "超出最大长度限制500"
                }
                , use_Date: {
                    required: '物资领用日期不能为空'
                }
                , goods_use_Remark: {
                    maxlength: "超出最大长度限制500"
                }

            }
        });
    });

    //    数据插入
    function subData() {
        //        发起layer询问框
        layerConfirm('确认提交？', ['确认', '取消'], [function () {                                                //**************
            //正常提交数据
            //发起insert请求
            getDataFnNoErrorF(                                                                                  //**************
                insertDataPath                                                                                  //**************
                , $('#formSearch').serialize() + '&sql=GoodsUseInfoMapper.insertInfo'                              //**************
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

        }, function () {                                                                                            //**************

        }]);                                                                                                    //**************
    }
</script>

</html>
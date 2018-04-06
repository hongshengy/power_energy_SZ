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
                <div class="panel-heading">编辑检疫犬退役</div>
                <div class="panel-body">
                    <form id="formSearch" class="form-horizontal">
                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="apply_organization">申请单位</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="apply_organization" name="apply_organization">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="retire_Date">退役时间</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="retire_Date" name="retire_Date">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="dog_Id">犬名</label>
                            <div class="col-sm-3">
                                <div id="dog_Id"></div>
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="approver_User_Name">批准人</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="approver_User_Name" name="approver_User_Name">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="approver_organization">批准部门</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="approver_organization" name="approver_organization">
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="retire_Reason">退役原因</label>
                            <div class="col-sm-7">
                                <textarea class="form-control" rows="3" id="retire_Reason" name="retire_Reason"></textarea>
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
    var updateDataPath = '${updateDataPath}';
    var selectRowData = parent.$('#tb_departments').bootstrapTable('getSelections')[0];

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

    $("#retire_Date").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    //    日期框E

    //    根据ID获取当前选择的最新数据
    var getSelectDataByIdObject = new Object();
    getSelectDataByIdObject.sql = 'RetireInfoMapper.selectInfo';
    getSelectDataByIdObject.id = selectRowData['id'];

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
            var queryCheckObject = new Object();
            queryCheckObject.sql = 'RetireInfoMapper.selectCheck';
            queryCheckObject.dog_Id = $('#dog_Id').select2('val');

            getDataFnNoErrorF(
                dataPath
                , queryCheckObject
                , function (data) {
                    if (data[0][queryCheckObject.sql].length > 1) {
                        window.top.layerMsg('选择检疫犬以是退役犬,请重新输入');
                    } else {
                        if(data[0][queryCheckObject.sql][0]['id'] != selectRowData['id']){
                            window.top.layerMsg('选择检疫犬是退役犬,请重新输入');
                        }else {
                            subData();
                        }
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
                retire_Date: {
                    required: true
                }
                , apply_organization: {
                    required: true
                    ,maxlength: 200
                }
                , approver_organization: {
                    required: true
                    ,maxlength: 200
                }
                , approver_User_Name: {
                    required: true
                    ,maxlength: 10
                }
                , retire_Reason: {
                    required: true
                    ,maxlength: 500
                }
            }
            , messages: {
                retire_Date: {
                    required: "退役时间不能为空"
                }
                , apply_organization: {
                    required: "申请单位不能为空"
                    ,maxlength: "超出最大长度限制200"
                }
                , approver_organization: {
                    required: "批准部门不能为空"
                    ,maxlength: "超出最大长度限制200"
                }
                , approver_User_Name: {
                    required: "批准人不能为空"
                    ,maxlength: "超出最大长度限制10"
                }
                , retire_Reason: {
                    required: "退役原因不能为空"
                    ,maxlength: "超出最大长度限制500"
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
                , $('#formSearch').serialize() + '&sql=RetireInfoMapper.updateInfo&id=' + selectRowData['id']    //↓
                , function (data) {                                                                             //↓
                    if (null != data) {                                                                         //↓
                        parent.query(1, 10);                                                                    //↓
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
                            case 'retire_Date':
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
</script>

</html>
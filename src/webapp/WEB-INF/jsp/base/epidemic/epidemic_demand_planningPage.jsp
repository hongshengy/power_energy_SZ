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
                <div class="panel-heading">添加需求计划</div>
                <div class="panel-body">
                    <form id="formSearch" class="form-horizontal">
                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="demand_Planning_Name">需求计划名称</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="demand_Planning_Name" name="demand_Planning_Name">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="auditing_Date">创建时间</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="auditing_Date" name="auditing_Date">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="demand_planning_Status">状态</label>
                            <div class="col-sm-3">
                                <div id="demand_planning_Status"></div>
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="demand_Planning_Content">需求计划说明</label>
                            <div class="col-sm-7">
                                <textarea class="form-control" rows="3" id="demand_Planning_Content" name="demand_Planning_Content"></textarea>
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="demand_planning_Remark">备注</label>
                            <div class="col-sm-7">
                                <textarea class="form-control" rows="3" id="demand_planning_Remark" name="demand_planning_Remark"></textarea>
                            </div>

                        </div>

                        <%--隐藏表单--%>
                        <input type="hidden" name="demand_planning_Status">
                        <input type="hidden" name="auditor">

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

    var userInfo = '${userInfo}';
    var userShowName = JSON.parse(userInfo).id;
    $('input[name="auditor"]').val(userShowName);

    //    页面中心高度
    var winHeight = initBodyHeight().winHeightR;
    $('#divBodyDom').height(winHeight);

    //    下拉框菜单S
    appendSelect2('demand_planning_Status', getStutif(), $('input:text').eq(0).outerWidth());            //加载下拉框数据                       //状态*
    $('#demand_planning_Status').select2('val', 'Y');                                                     //设置下拉框默认值                     //状态*
    $('input[name="demand_planning_Status"]').attr('value', 'Y');                                         //设置下拉框相对应hidden项              //状态*
    $('#demand_planning_Status').on("change", function () {                                              //下拉框改变触发方法                   //状态*
        $('input[name="demand_planning_Status"]').val($('#demand_planning_Status').select2('val'));               //设置下拉框相对应hidden项              //状态*
    });
    //    下拉框菜单E

    //    日期框S
    dateToolsInit();

    $("#auditing_Date").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
    });
    //    日期框E

    //    表单提交确认后
    $.validator.setDefaults({
        submitHandler: function () {
            var queryCheckObject = new Object();
            queryCheckObject.sql = 'DemandPlanningInfoMapper.selectCheck';
            queryCheckObject.demand_Planning_Name = $('#demand_Planning_Name').val();

            getDataFnNoErrorF(
                dataPath
                , queryCheckObject
                , function (data) {
                    if (data[0][queryCheckObject.sql].length > 0) {
                        window.top.layerMsg('需求计划已存在,请重新输入');
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
                demand_Planning_Name: {
                    required: true
                    , maxlength: 50
                }
                , demand_Planning_Content: {
                    maxlength: 500
                }
                , auditing_Date: {
                    required: true
                }
                , demand_planning_Remark: {
                    maxlength: 500
                }
            }
            , messages: {
                demand_Planning_Name: {
                    required: "需求计划名称不能为空"
                    , maxlength: "超出最大长度限制50"
                }
                , demand_Planning_Content: {
                    maxlength: "超出最大长度限制500"
                }
                , auditing_Date: {
                    required: "创建时间不能为空"
                }
                , demand_planning_Remark: {
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
                , $('#formSearch').serialize() + '&sql=DemandPlanningInfoMapper.insertInfo'                  //**************
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
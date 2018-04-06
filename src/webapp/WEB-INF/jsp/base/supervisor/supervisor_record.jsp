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

    <!--bootstrap-table-->
    <%--<link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap-table/bootstrap-table.min.css">--%>
    <%--select2--%>
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2-bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2.min.css">

    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/uploadify/css/uploadify.css">

    <!-- datetimepicker -->
    <link href="${basePath}/plugins/datepicker/jquery-ui.css" rel="stylesheet">
    <link href="${basePath}/plugins/datepicker/jquery-ui-timepicker-addon.min.css" rel="stylesheet">

    <style type="text/css">
        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
            border: 0px solid transparent !important;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            table-layout: fixed;
        }

        .error {
        / / float: left;
            color: red;
            white-space: nowrap;
        }
    </style>

</head>
<body style="background-color: #ffffff">

<div class="container" style="padding-top: 15px;">
    <form id="formSearch" method="get">
        <div class="row">
            <div class="col-sm-8 text-left">
                <table class="table" style="width: 100%;">
                    <thead style="border-bottom: 2px solid #ef3f52">
                    <tr>
                        <th colspan="4" style="font-size:20px;">训导员备案登记</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <td><span>姓名</span></td>
                        <td><input type="text" class="form-control" id="supervisor_Name" name="supervisor_Name"></td>

                        <td><span>性别</span></td>
                        <td>
                            <%--<input type="text" class="form-control">--%>
                            <div id="supervisor_Sex"></div>
                        </td>
                    </tr>

                    <tr>
                        <td><span>出生日期</span></td>
                        <td><input type="text" class="form-control" id="supervisor_Birthday" name="supervisor_Birthday"></td>

                        <td><span>文化程度</span></td>
                        <td><input type="text" class="form-control" id="supervisor_Degree_Education" name="supervisor_Degree_Education"></td>
                    </tr>

                    <tr>
                        <td><span>毕业院校</span></td>
                        <td><input type="text" class="form-control" id="supervisor_Graduate_Institutions" name="supervisor_Graduate_Institutions"></td>

                        <td><span>专业</span></td>
                        <td><input type="text" class="form-control" id="supervisor_Specialty" name="supervisor_Specialty"></td>
                    </tr>

                    <tr>
                        <td><span>职务</span></td>
                        <td><input type="text" class="form-control" id="supervisor_Job" name="supervisor_Job"></td>

                        <td><span>职称</span></td>
                        <td><input type="text" class="form-control" id="supervisor_Positional_Titles" name="supervisor_Positional_Titles"></td>
                    </tr>

                    <tr>
                        <td><span>入伍时间</span></td>
                        <td><input type="text" class="form-control" id="supervisor_Service_date" name="supervisor_Service_date"></td>
                        <td colspan="2"></td>

                    </tr>

                    <tr>
                        <td><span>工作经历</span></td>
                        <td colspan="3"><textarea rows="9" class="form-control" id="supervisor_Work_experience" name="supervisor_Work_experience"></textarea></td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>

        <input type="hidden" name="dog_Service_Type">
        <input type="hidden" name="dog_Exploit_Type">
        <input type="hidden" name="dog_Sex">
        <input type="hidden" name="dog_Image">

        <div class="row" style="padding-bottom: 10px;">
            <div class="col-sm-6 text-center">
                <button id="save_btn" type="submit" class="btn btn-info btn-lg" style="width: 150px;">保存</button>
            </div>

            <div class="col-sm-6 text-left">
                <button class="btn btn-default btn-lg" style="width: 150px;">取消</button>
            </div>
        </div>

        <input type="hidden" name="supervisor_Sex" value="1">
    </form>

</div>
</body>

<%--jquery--%>
<script type="text/javascript" src="${basePath}/plugins/jquery/jquery-1.8.3.js"></script>

<%--tools--%>
<script type="text/javascript" src="${basePath}/plugins/tools/tools.js"></script>

<!--bootstrap-table-->
<%--<script type="text/javascript" src="${basePath}/plugins/bootstrap-table/bootstrap-table.min.js"></script>--%>

<!--bootstrap-table-->
<%--<script type="text/javascript" src="${basePath}/plugins/bootstrap-table/bootstrap-table-zh-CN.min.js"></script>--%>

<%--layer--%>
<script type="text/javascript" src="${basePath}/plugins/layer/layer.js"></script>

<%--select2--%>
<script type="text/javascript" src="${basePath}/plugins/select2/select2.js"></script>

<!-- datetimepicker -->
<script type="text/javascript" src="${basePath}/plugins/jquery-ui/js/jquery-ui.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery-ui-datepicker/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery-ui-datepicker/jquery-ui-timepicker-zh-CN.js"></script>

<!-- 表单验证 -->
<script type="text/javascript" src="${basePath}/plugins/jquery_validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery_validate/messages_zh.js"></script>

<script type="text/javascript">

    var dataPath = '${dataPath}';
    var insertDataPath = '${insertDataPath}';

    var mmm = $('input:text').first().outerWidth();

    /* 表单验证 */
    $.validator.setDefaults({
        submitHandler: function () {
            getDataFnNoErrorF(
                dataPath
                , {'sql':'SupervisorInfoMapper.selectInfo','supervisor_Name':$('#supervisor_Name').val()}
                , function (data) {
                    var line = data[0]['SupervisorInfoMapper.selectInfo'].length;

                    if(line<1){

                        getDataFnNoErrorF(
                            insertDataPath
                            , $('#formSearch').serialize() + '&sql=SupervisorInfoMapper.insertInfo'
                            , function (data) {
                                if (null != data) {
                                    //debugger;
                                    console.log(data);
                                    $('input:text').val('');

                                    //$('input:hidden').attr('value',"");
                                    AFFIXFlg = false;
                                    AFFIXList = new Array();
                                    $('input[name="dog_Image"]').attr('value','');
                                    $('#imgSrcDiv').html('');
                                    $('textarea').val('');
                                }
                            }
                            , function (data) {
                                alert(data);
                            }
                            , function () {
                                alert('error');
                            });

                    }else {
                        window.top.layerMsg('训导员名已存在，不能重复录入');
                    }
                }
                , function (data) {
                    alert(data);
                }
                , function () {
                    alert('error');
                });
        }
    });

    $(function () {

        var supervisor_SexData = [{"id": "1", "text": "男"}, {"id": "0", "text": "女"}];
        $('#supervisor_Sex').select2({
            placeholder: "请选择"
            , width: mmm
            , data: supervisor_SexData
        });

        $('#supervisor_Sex').select2('val', 1);

        $('input[name="supervisor_Sex"]').attr('value', $('#supervisor_Sex').select2('val'));

        $('#supervisor_Sex').on("change", function () {
            $('input[name="supervisor_Sex"]').attr('value', $('#supervisor_Sex').select2('val'));
        });


        $("#formSearch").validate({
            rules: {
                supervisor_Name: {
                    required: true
                    , maxlength: 10
                }
                , supervisor_Birthday: {
                    required: true
                }
                , supervisor_Degree_Education: {
                    required: true
                    , maxlength: 50
                }
                , supervisor_Graduate_Institutions: {
                    required: true
                    , maxlength: 50
                }
                , supervisor_Specialty: {
                    required: true
                    , maxlength: 50
                }
                , supervisor_Job: {
                    required: true
                    , maxlength: 50
                }
                , supervisor_Positional_Titles: {
                    required: true
                    , maxlength: 50
                }
                , supervisor_Work_experience: {
                    required: true
                    , maxlength: 2000
                }
            }
            , messages: {
                supervisor_Name: {
                    required: "不能为空"
                    , maxlength: "长度超过限制10"
                }
                , supervisor_Birthday: {
                    required: "不能为空"
                }
                , supervisor_Degree_Education: {
                    required: "不能为空"
                    , maxlength: "长度超过限制50"
                }
                , supervisor_Graduate_Institutions: {
                    required: "不能为空"
                    , maxlength: "长度超过限制50"
                }
                , supervisor_Specialty: {
                    required: "不能为空"
                    , maxlength: "长度超过限制50"
                }
                , supervisor_Job: {
                    required: "不能为空"
                    , maxlength: "长度超过限制50"
                }
                , supervisor_Positional_Titles: {
                    required: "不能为空"
                    , maxlength: "长度超过限制50"
                }
                , supervisor_Work_experience: {
                    required: "不能为空"
                    , maxlength: "长度超过限制2000"
                }
            }
        });

    });

    dateToolsInit();

    $("#supervisor_Birthday").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
    });

    $("#supervisor_Service_date").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
    });

</script>

</html>
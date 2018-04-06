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
        <div class="panel-heading">添加角色</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1" for="role_Name">角色名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="role_Name" name="role_Name">
                    </div>

                    <label class="control-label col-sm-1" for="role_Status">状态</label>
                    <div class="col-sm-3">
                        <div id="role_Status"></div>
                    </div>

                </div>

                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1" for="role_Content">描述</label>
                    <div class="col-sm-3">
                        <textarea class="form-control" rows="3" id="role_Content" name="role_Content"></textarea>
                    </div>
                </div>

                <%--隐藏表单--%>
                <input type="hidden" name="role_Status">
                <input type="hidden" name="role_Creator" value="Y">
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

<!-- 表单验证 -->
<script type="text/javascript" src="${basePath}/plugins/jquery_validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery_validate/messages_zh.js"></script>

<script type="text/javascript">
    //    调用接口
    var dataPath = '${dataPath}';

    var insertDataPath = '${insertDataPath}';

    var userInfo = '${userInfo}';
    var userShowName = JSON.parse(userInfo).id;

    //    页面中心高度
    $('#showPanel').height(window.parent.$('body').height() - 200);

    //    下拉框菜单
    appendSelect2('role_Status', getStutif(), $('input:text').eq(0).outerWidth());

    $('#role_Status').select2('val', 'Y');

    $('#role_Status').on("change", function () {
        $('input[name="role_Status"]').val($('#role_Status').select2('val'));
    });
    //    下拉框菜单

    //    表单验证
    $.validator.setDefaults({
        submitHandler: function () {
            getDataFnNoErrorF(
                dataPath
                , {role_Name: $('#role_Name').val(), sql: 'RoleInfoMapper.getCountByParams'}
                , function (data) {
                    if (data[0]['RoleInfoMapper.getCountByParams'][0]['COUNT'] > 0) {
                        window.top.layerMsg('权限名已存在,请重新输入');
                    } else {
                        $('input[name="role_Creator"]').attr('value', userShowName);

                        if ($('#role_Status').select2('val') == 'Y') {
                            $('input[name="role_Status"]').attr('value', $('#role_Status').select2('val'));
                        } else {
                            $('input[name="role_Status"]').val('N');
                        }

                        getDataFnNoErrorF(
                            insertDataPath
                            , $('#formSearch').serialize() + '&sql=RoleInfoMapper.insertInfo'
                            , function (data) {
                                if (null != data) {
                                    parent.query();
                                    parent.layer.closeAll();
                                }
                            }
                            , function (data) {
                                window.top.layerMsg(data);
                            }
                            , function () {
                                sysErrorAlert;
                            });
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

    $(function () {
        $("#formSearch").validate({
            rules: {
                role_Name: {
                    required: true
                    , maxlength: 50
                }
                , role_Content: {
                    maxlength: 50
                }

            }
            , messages: {
                role_Name: {
                    required: "角色名不能为空"
                    , maxlength: "超出最大长度限制50"
                }
                , role_Content: {
                    maxlength: "超出最大长度限制50"
                }
            }
        });
    });

</script>

</html>
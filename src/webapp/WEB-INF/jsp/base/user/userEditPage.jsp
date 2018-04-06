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
    <%--<div class="panel-body" style="padding-top:5px;padding-right: 5px;padding-left: 5px;padding-bottom: 5px;">--%>
    <div class="panel panel-default" id="showPanel">
        <div class="panel-heading">添加用户</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1" for="user_Name">用户名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="user_Name" name="user_Name">
                    </div>

                    <label class="control-label col-sm-1" for="user_password">密码</label>
                    <div class="col-sm-3">
                        <input type="password" class="form-control" id="user_password" name="user_password">
                    </div>

                    <label class="control-label col-sm-1" for="user_Real_Name">真实姓名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="user_Real_Name" name="user_Real_Name">
                    </div>
                </div>

                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1" for="user_Age">年龄</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="user_Age" name="user_Age">
                    </div>

                    <label class="control-label col-sm-1" for="user_Sex">性别</label>
                    <div class="col-sm-3">
                        <%--<input type="text" class="form-control" id="user_Sex" name="user_Sex">--%>
                        <div id="user_Sex"></div>
                    </div>

                    <label class="control-label col-sm-1" for="user_Phone">手机</label>
                    <div class="col-sm-3">
                        <div class="input-group">
                            <div class="input-group-addon">+86</div>
                            <input type="number" class="form-control" id="user_Phone" name="user_Phone">
                            <%--<div class="input-group-addon">.00</div>--%>
                        </div>

                    </div>
                </div>

                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1" for="user_Organization_Id">组织机构</label>
                    <div class="col-sm-3">
                        <div id="user_Organization_Id"></div>
                    </div>

                    <label class="control-label col-sm-1" for="user_Type">类型</label>
                    <div class="col-sm-3">
                        <%--<input type="text" class="form-control" id="user_Type" name="user_Type">--%>
                        <div id="user_Type"></div>
                    </div>

                    <label class="control-label col-sm-1" for="user_Company">所属单位</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="user_Company" name="user_Company">
                    </div>
                </div>

                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1" for="user_Content">个人说明</label>
                    <div class="col-sm-3">
                        <textarea class="form-control" rows="3" id="user_Content" name="user_Content"></textarea>
                    </div>

                    <label class="control-label col-sm-1" for="user_Remark">备注</label>
                    <div class="col-sm-3">
                        <textarea class="form-control" rows="3" id="user_Remark" name="user_Remark"></textarea>
                    </div>
                </div>

                <%--隐藏表单--%>
                <input type="hidden" name="user_Sex">
                <input type="hidden" name="user_Organization_Id">
                <input type="hidden" name="user_Type">
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
    var dataPath = '${dataPath}';
    var getMd5Path = '${getMd5Path}';
    var updateDataPath = '${updateDataPath}';
    var md5Flg = false;

    //    调用后台sql接口
    var dataPath = '${dataPath}';

    //    页面中心高度
    $('#showPanel').height(window.parent.$('body').height() - 200);

    //    下拉框菜单S
    appendSelect2('user_Sex', getSex(), $('input:text').eq(0).outerWidth());

    $('#user_Sex').select2('val', '男');

    $('#user_Sex').on("change", function () {
        $('input[name="user_Sex"]').val($('#user_Sex').select2('val'));
    });

    appendSelect2('user_Organization_Id', getOrg(), $('input:text').eq(0).outerWidth());

    $('#user_Organization_Id').on("change", function () {
        $('input[name="user_Organization_Id"]').val($('#user_Organization_Id').select2('val'));
    });

    appendSelect2('user_Type', getUtp(), $('input:text').eq(0).outerWidth());

    $('#user_Type').on("change", function () {
        $('input[name="user_Type"]').val($('#user_Type').select2('val'));
    });
    //    下拉框菜单E

    var selectRowData = parent.$('#tb_departments').bootstrapTable('getSelections')[0];

    //    根据父页面选择的用户ID获取用户数据
    getDataFnNoErrorF(
        dataPath
        , {sql: 'UserInfoMapper.selectUserInfo', id: selectRowData['id']}
        , function (data) {
            appendData(data[0]['UserInfoMapper.selectUserInfo'][0]);
        }
        , function (data) {
            window.top.layerMsg(data);
        }
        , function () {
            sysErrorAlert;
        });

    $('#user_password').bind('change', function () {
        md5Flg = true;
    });


    //    表单提交确认后
    $.validator.setDefaults({
        submitHandler: function () {
            getDataFnNoErrorF(
                dataPath
                , {user_Name: $('#user_Name').val(), sql: 'UserInfoMapper.getCountByParams'}
                , function (data) {
                    if (data[0]['UserInfoMapper.getCountByParams'][0]['COUNT'] > 0 && $('#user_Name').val() != selectRowData['user_Name']) {
                        window.top.layerMsg('用户名已存在,请重新输入');
                    } else {
                        if (md5Flg) {
                    //          md5处理
                            getDataFnNoErrorF(
                                getMd5Path
                                , {password: $('#user_password').val()}
                                , function (data) {
                                    $('#user_password').attr('value', data[0]['md5Str']);
                                }
                                , function (data) {
                                    window.top.layerMsg(data);
                                }
                                , function () {
                                    sysErrorAlert;
                                });
                        }

                        getDataFnNoErrorF(
                            updateDataPath
                            , $('#formSearch').serialize() + '&sql=UserInfoMapper.updateInfoByid&id=' + selectRowData['id']
                            , function (data) {
                                if (null != data) {
                                    window.top.layerMsg('修改成功');
                                    parent.query(1, 10);
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

    //    保存按钮
    $('#btn_save').click(function () {
        $('#formSearch').submit();
    });

    //    取消按钮
    $('#btn_cancel').click(function () {
        parent.layer.closeAll();
    });

    $(function () {
//        表单验证
        $("#formSearch").validate({
            rules: {
                user_Name: {
                    required: true
                    , maxlength: 50
                }
                , user_password: {
                    maxlength: 11
                }
                , user_Real_Name: {
                    required: true
                    , maxlength: 50
                }
                , user_Id: {
                    required: true
                    , maxlength: 18
                }
                , user_Age: {
                    required: true
                    , maxlength: 3
                }
                , user_Phone: {
                    maxlength: 15
                }
                , user_Company: {
                    maxlength: 50
                }
                , user_Content: {
                    maxlength: 500
                }
                , user_Remark: {
                    maxlength: 500
                }

            }
            , messages: {
                user_Name: {
                    required: "用户名不能为空"
                    , maxlength: "超出最大长度限制50"
                }
                , user_password: {
                    maxlength: "超出最大长度限制11"
                }
                , user_Real_Name: {
                    required: "用户真实名不能为空"
                    , maxlength: "超出最大长度限制50"
                }
                , user_Id: {
                    required: "身份证不能为空"
                    , maxlength: "超出最大长度限制18"
                }
                , user_Age: {
                    required: "年龄不能为空"
                    , maxlength: "超出最大长度限制3"
                }
                , user_Phone: {
                    maxlength: "超出最大长度限制15"
                }
                , user_Company: {
                    maxlength: "超出最大长度限制50"
                }
                , user_Content: {
                    maxlength: "超出最大长度限制500"
                }
                , user_Remark: {
                    maxlength: "超出最大长度限制500"
                }
            }
        });
    });

    function appendData(resultData) {
        $.each($('#formSearch input:text,#formSearch textarea,#formSearch input[type="hidden"],#formSearch input[type="number"]'), function () {
            var domId = $(this).attr('id');
            if (null != domId && undefined != domId && '' != domId) {
                $.each(resultData, function (i, c) {
                    if (domId == i) {
                        switch (i) {

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
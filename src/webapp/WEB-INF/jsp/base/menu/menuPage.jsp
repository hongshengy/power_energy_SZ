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
        <div class="panel-heading">添加菜单</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1" for="meun_Name">菜单名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="meun_Name" name="meun_Name">
                    </div>

                    <label class="control-label col-sm-1" for="meun_Url">菜单url</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="meun_Url" name="meun_Url">
                    </div>

                    <label class="control-label col-sm-1" for="order_Id">排序</label>
                    <div class="col-sm-3">
                        <input type="number" class="form-control" id="order_Id" name="order_Id">
                    </div>
                </div>

                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1" for="show_If">是否显示</label>
                    <div class="col-sm-3">
                        <div id="show_If"></div>
                    </div>

                    <label class="control-label col-sm-1" for="node_If">是否节点</label>
                    <div class="col-sm-3">
                        <div id="node_If"></div>
                    </div>

                    <label class="control-label col-sm-1" for="menu_Status">状态</label>
                    <div class="col-sm-3">
                        <div id="menu_Status"></div>
                    </div>
                </div>

                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1" for="menu_Content">菜单图标</label>
                    <div class="col-sm-3">
                        <textarea class="form-control" rows="3" id="menu_Content" name="menu_Content"></textarea>
                    </div>

                    <label class="control-label col-sm-1" for="menu_Remark">备注</label>
                    <div class="col-sm-3">
                        <textarea class="form-control" rows="3" id="menu_Remark" name="menu_Remark"></textarea>
                    </div>

                    <label class="control-label col-sm-1 initHide text-nowrap" for="parent_Id">选择父节点</label>
                    <div class="col-sm-3 initHide">
                        <div id="parent_Id"></div>
                    </div>
                </div>

                <%--隐藏表单--%>
                <input type="hidden" name="show_If">
                <input type="hidden" name="node_If">
                <input type="hidden" name="menu_Status">
                <input type="hidden" name="parent_Id" value="0">
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
    //    调用后台sql接口
    var dataPath = '${dataPath}';
    var insertDataPath = '${insertDataPath}';

    //    页面中心高度
    $('#showPanel').height(window.parent.$('body').height() - 200);

    //    下拉框菜单
    appendSelect2('show_If', getShowif(), $('input:text').eq(0).outerWidth());
    $('#show_If').select2('val','xianshi');
    $('input[name="show_If"]').attr('value','xianshi');
    appendSelect2('node_If', getNoteif(), $('input:text').eq(0).outerWidth());
    $('#node_If').select2('val','feijiedian');
    $('input[name="node_If"]').attr('value','feijiedian');
    appendSelect2('menu_Status', getStutif(), $('input:text').eq(0).outerWidth());
    $('#menu_Status').select2('val','Y');
    $('input[name="menu_Status"]').attr('value','Y');

    getDataFnNoErrorF(
        dataPath
        , {sql: 'MenuInfoMapper.selectInfo'}
        , function (data) {
            var parentList = data[0]['MenuInfoMapper.selectInfo'];

            for (var i = 0; i < parentList.length; i++) {
                parentList[i]['text'] = parentList[i]['meun_Name'];
            }
            appendSelect2('parent_Id', parentList, $('input:text').eq(0).outerWidth());

            $('.initHide').hide();
        }
        , function (data) {
            window.top.layerMsg(data);
        }
        , function () {
            sysErrorAlert;
        });


    $('#show_If').on("change", function () {
        $('input[name="show_If"]').val($('#show_If').select2('val'));
    });

    $('#node_If').on("change", function () {
        $('input[name="node_If"]').val($('#node_If').select2('val'));
        if ($('#node_If').select2('val') == 'jiedian') {
            $('.initHide').show();
        } else {
            $('.initHide').hide();
            $('input[name="parent_Id"]').val('0');
        }
    });

    $('#menu_Status').on("change", function () {
        $('input[name="menu_Status"]').val($('#menu_Status').select2('val'));
    });
    //    下拉框菜单

    //    表单提交确认后
    $.validator.setDefaults({
        submitHandler: function () {

            getDataFnNoErrorF(
                dataPath
                , {meun_Name: $('#meun_Name').val(), meun_Url: $('#meun_Url').val(), sql: 'MenuInfoMapper.getCountByParams'}
                , function (data) {
                    if (data[0]['MenuInfoMapper.getCountByParams'].length > 0) {
                        window.top.layerMsg('菜单名或url已存在,请重新输入');
                    } else {
                        if ($('#node_If').select2('val') == 'jiedian') {
                            $('input[name="parent_Id"]').attr('value', $('#parent_Id').select2('val'));
                        } else {
                            $('input[name="parent_Id"]').val('0');
                        }
                        getDataFnNoErrorF(
                            insertDataPath
                            , $('#formSearch').serialize() + '&sql=MenuInfoMapper.insertInfo'
                            , function (data) {
                                if (null != data) {
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
        $("#formSearch").validate({
            rules: {
                meun_Name: {
                    required: true
                    , maxlength: 50
                }
                , meun_Url: {
                    required: true
                    , maxlength: 100
                }
                , order_Id: {
                    required: true
                    , maxlength: 3
                }
                , menu_Content: {
                    maxlength: 50
                }
                , menu_Remark: {
                    required: true
                    , maxlength: 500
                }
            }
            , messages: {
                user_Name: {
                    required: "菜单名不能为空"
                    , maxlength: "超出最大长度限制50"
                }
                , meun_Url: {
                    required: "url不能为空"
                    , maxlength: "超出最大长度限制100"
                }
                , order_Id: {
                    required: "排序不能为空"
                    , maxlength: "超出最大长度限制3"
                }
                , menu_Content: {
                    maxlength: "超出最大长度限制50"
                }
                , menu_Remark: {
                    required: "备注不能为空"
                    , maxlength: "超出最大长度限制500"
                }
            }
        });
    });

</script>

</html>
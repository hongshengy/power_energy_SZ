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
        <div class="panel-heading">添加数据字典</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1 text-nowrap" for="code_en">字典英文名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="code_en" name="code_en">
                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="code_cn">字典中文名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="code_cn" name="code_cn">
                    </div>


                    <label class="control-label col-sm-1" for="code_value">字典值</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="code_value" name="code_value">
                    </div>
                </div>

                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1 text-nowrap" for="code_status">字典状态</label>
                    <div class="col-sm-3">
                        <div class="input-group">
                            <div id="code_status"></div>
                        </div>
                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="parent_id">字典父级</label>
                    <div class="col-sm-3">
                        <div class="input-group">
                            <div id="parent_id"></div>
                        </div>
                    </div>
                </div>

                <%--隐藏表单--%>
                <%--<input type="hidden" name="user_Sex">--%>
                <input type="hidden" name="parent_id" value="0">
                <input type="hidden" name="code_status" value="Y">
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

<script type="text/javascript">
    //    调用后台sql接口
    var dataPath = '${dataPath}';
    var insertDataPath = '${insertDataPath}';

    //    页面中心高度
    $('#showPanel').height(window.parent.$('body').height() - 200);

    //    下拉框
    getDataFnNoErrorF(
        dataPath
        , {sql: 'DictionaryInfoMapper.selectInfo', parent_id: '0'}
        , function (data) {
            var parentList = data[0]['DictionaryInfoMapper.selectInfo'];

            for (var i = 0; i < parentList.length; i++) {
                parentList[i]['text'] = parentList[i]['code_cn'];
            }

            var appendRow = {'id': '0', 'text': '无'};
            parentList.unshift(appendRow);

            appendSelect2('parent_id', parentList, $('input:text').eq(0).outerWidth());
        }
        , function (data) {
            window.top.layerMsg(data);
        }
        , function () {
            sysErrorAlert;
        });

    appendSelect2('code_status', getStutif(), $('input:text').eq(0).outerWidth());
    $('#code_status').select2('val', 'Y');
    $('#code_status').on("change", function () {
        $('input[name="code_status"]').val($('#code_status').select2('val'));
    });

    $('#parent_id').on("change", function () {
        $('input[name="parent_id"]').val($('#parent_id').select2('val'));
    });

    //    表单验证
    $.validator.setDefaults({
        submitHandler: function () {


            var queryData = new Object();
            queryData.code_en = $('#code_en').val();
            queryData.code_value = $('#code_value').val();
            queryData.sql = 'DictionaryInfoMapper.selectCheck';

//            if ($('#parent_id').val() != '' && $('#parent_id').val() != '0') {
//                queryData.parent_id = $('#parent_id').val();
//                queryData.sql = 'DictionaryInfoMapper.selectCheck';
//                queryData.code_value = $('#code_value').val();
//            }

            getDataFnNoErrorF(
                dataPath
                , queryData
                , function (data) {
                    debugger;
                    if (data[0][queryData.sql].length > 0) {

                        window.top.layerMsg('已存在相同数据，字典英文名不可重复，字典值不可重复');
                    } else {
                        layerConfirm('确认提交？', ['确认', '取消'], [function () {
                            getDataFnNoErrorF(
                                insertDataPath
                                , $('#formSearch').serialize() + '&sql=DictionaryInfoMapper.insertInfo'
                                , function (data) {
                                    if (null != data && data[0] == '1') {
                                        parent.query(1, 10);
                                    }
                                }
                                , function (data) {
                                    window.top.layerMsg(data);
                                }
                                , function () {
                                    sysErrorAlert;
                                });
                            parent.layer.closeAll();
                        }, function () {

                        }]);
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
                code_en: {
                    required: true
                    , maxlength: 50
                }
                , code_cn: {
                    maxlength: 50
                }
                , code_value: {
                    required: true
                    , maxlength: 10
                }

            }
            , messages: {
                code_en: {
                    required: "字典英文名不能为空"
                    , maxlength: "超出最大长度限制50"
                }
                , code_cn: {
                    maxlength: "超出最大长度限制50"
                }
                , code_value: {
                    required: "字典值不能为空"
                    , maxlength: "超出最大长度限制10"
                }
            }
        });
    });

</script>

</html>
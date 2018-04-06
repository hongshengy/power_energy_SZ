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
        <div class="panel-heading">添加组织机构</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1 text-nowrap" for="organization_Name">组织机构名称</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="organization_Name" name="organization_Name">
                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="organization_Code">组织机构代码</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="organization_Code" name="organization_Code">
                    </div>


                    <label class="control-label col-sm-1" for="organization_Company_Type">单位类型</label>
                    <div class="col-sm-3">
                        <div id="organization_Company_Type"></div>
                    </div>
                </div>

                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1" for="organization_Administration_Zoning">行政区划</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="organization_Administration_Zoning" name="organization_Administration_Zoning">
                    </div>

                    <label class="control-label col-sm-1" for="organization_Phone">联系电话</label>
                    <div class="col-sm-3">
                        <div class="input-group">
                            <div class="input-group-addon">+86</div>
                            <input type="text" class="form-control" id="organization_Phone" name="organization_Phone">
                        </div>

                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="parent_id">父级组织机构</label>
                    <div class="col-sm-3">
                        <div class="input-group">
                            <div id="parent_id"></div>
                        </div>
                    </div>
                </div>

                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1" for="organization_Company_Content">单位说明</label>
                    <div class="col-sm-3">
                        <textarea class="form-control" rows="3" id="organization_Company_Content" name="organization_Company_Content"></textarea>
                    </div>

                    <label class="control-label col-sm-1" for="organization_Remark">备注</label>
                    <div class="col-sm-3">
                        <textarea class="form-control" rows="3" id="organization_Remark" name="organization_Remark"></textarea>
                    </div>
                </div>

                <%--隐藏表单--%>
                <%--<input type="hidden" name="user_Sex">--%>
                <input type="hidden" name="parent_id" value="0">
                <input type="hidden" name="organization_Company_Type">
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
        , {sql: 'OrganizationInfoMapper.getListByParams', parent_id: '0'}
        , function (data) {
            var parentList = data[0]['OrganizationInfoMapper.getListByParams'];

            for (var i = 0; i < parentList.length; i++) {
                parentList[i]['text'] = parentList[i]['organization_Name'];
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

    $('#parent_id').on("change", function () {
        $('input[name="parent_id"]').val($('#parent_id').select2('val'));
    });

    appendSelect2('organization_Company_Type', getDwlx(), $('input:text').eq(0).outerWidth());
    $('#organization_Company_Type').select2('val','QTDW');
    $('input[name="organization_Company_Type"]').attr('value','QTDW');
    $('#organization_Company_Type').on("change", function () {
        $('input[name="organization_Company_Type"]').val($('#organization_Company_Type').select2('val'));
    });

    //    表单提交确认后
    $.validator.setDefaults({
        submitHandler: function () {
            getDataFnNoErrorF(
                dataPath
                , {organization_Name:$('#organization_Name').val(), organization_Code:$('#organization_Code').val(), sql: 'OrganizationInfoMapper.getCountByParams'}
                , function (data) {
                    if (data[0]['OrganizationInfoMapper.getCountByParams'].length > 0) {
                        window.top.layerMsg('组织机构名或机构代码已存在,请重新输入');
                    } else {
                        layerConfirm('确认提交？', ['确认', '取消'], [function () {
                            getDataFnNoErrorF(
                                insertDataPath
                                , $('#formSearch').serialize() + '&sql=OrganizationInfoMapper.insertInfo'
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
        $("#formSearch").submit();
    });

    $(function () {
        $("#formSearch").validate({
            rules: {
                organization_Name: {
                    required: true
                    , maxlength: 255
                }
                , organization_Code: {
                    required: true
                    , maxlength: 20
                }
                , organization_Administration_Zoning: {
                    required: true
                    , maxlength: 100
                }
                , organization_Phone: {
                    maxlength: 15
                }
                , organization_Company_Content: {
                    maxlength: 500
                }
                , organization_Remark: {
                    maxlength: 500
                }
            }
            , messages: {
                organization_Name: {
                    required: "组织机构名不能为空"
                    , maxlength: "超出最大长度限制255"
                }
                , organization_Code: {
                    required: "组织机构代码不能为空"
                    , maxlength: "超出最大长度限制20"
                }
                , organization_Administration_Zoning: {
                    required: "行政区划不能为空"
                    , maxlength: "超出最大长度限制100"
                }
                , organization_Phone: {
                    maxlength: "超出最大长度限制15"
                }
                , organization_Company_Content: {
                    maxlength: "超出最大长度限制500"
                }
                , organization_Remark: {
                    maxlength: "超出最大长度限制500"
                }
            }
        });
    });

</script>

</html>
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
        <div class="panel-heading">添加物资</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1 text-nowrap" for="goods_Name">物资名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="goods_Name" name="goods_Name">
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

                    <label class="control-label col-sm-1 text-nowrap" for="place_Of_Origin">物资产地</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="place_Of_Origin" name="place_Of_Origin">
                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="goods_Status">物资状态</label>
                    <div class="col-sm-3">
                        <div id="goods_Status"></div>
                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="goods_Content">物资描述</label>
                    <div class="col-sm-3">
                        <textarea class="form-control" rows="3" id="goods_Content" name="goods_Content"></textarea>
                    </div>

                </div>

                <%--隐藏表单--%>
                <input type="hidden" name="goods_Type_Id">
                <input type="hidden" name="storage_Room_Id">
                <input type="hidden" name="goods_Status">
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
    var updateDataPath = '${updateDataPath}';
    var selectRowData = parent.$('#tb_departments').bootstrapTable('getSelections')[0];

    //    页面中心高度
    $('#showPanel').height(window.parent.$('body').height() - 200);

    //    下拉框菜单S
    appendSelect2('goods_Status', getStutif(), $('input:text').eq(0).outerWidth());             //加载下拉框数据                                     //状态*
    $('#goods_Status').select2('val', 'Y');                                                     //设置下拉框默认值                                   //状态*
    $('input[name="goods_Status"]').attr('value', 'Y');                                         //设置下拉框相对应hidden项                           //状态*
    $('#goods_Status').on("change", function () {                                               //下拉框改变触发方法                                 //状态*
        $('input[name="goods_Status"]').val($('#goods_Status').select2('val'));                 //设置下拉框相对应hidden项                           //状态*
    });                                                                                                                                           //状态*

    appendSelect2('goods_Type_Id', getGti(), $('input:text').eq(0).outerWidth());               //加载下拉框数据                                    //物资类型*
    $('#goods_Type_Id').on("change", function () {                                              //下拉框改变触发方法                                 //物资类型*
        $('input[name="goods_Type_Id"]').val($('#goods_Type_Id').select2('val'));               //设置下拉框相对应hidden项                           //物资类型*
    });                                                                                                                                           //物资类型*

    appendSelect2('storage_Room_Id', getSri(), $('input:text').eq(0).outerWidth());             //加载下拉框数据                                    //库房*
    $('#storage_Room_Id').on("change", function () {                                            //下拉框改变触发方法                                 //库房*
        $('input[name="storage_Room_Id"]').val($('#storage_Room_Id').select2('val'));           //设置下拉框相对应hidden项                           //库房*
    });                                                                                                                                           //库房*
    //    下拉框菜单E

//    根据ID获取当前选择的最新数据
    var getSelectDataByIdObject = new Object();
    getSelectDataByIdObject.sql = 'GoodsInfoMapper.selectInfo';
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
            queryCheckObject.sql = 'GoodsTypeMapper.selectCheck';
            queryCheckObject.goods_Type_Name = $('#goods_Type_Name').val();
            queryCheckObject.goods_Type_Code = $('#goods_Type_Code').val();

            getDataFnNoErrorF(
                dataPath
                , queryCheckObject
                , function (data) {
                    if (data[0][queryCheckObject.sql].length > 1) {
                        window.top.layerMsg('物资类型名或物资类型CODE已存在,请重新输入');
                    } else {
                        if(data[0][queryCheckObject.sql][0]['id'] != selectRowData['id']){
                            window.top.layerMsg('物资类型名或物资类型CODE已存在,请重新输入');
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
                goods_Name: {
                    required: true
                    , maxlength: 100
                }
                , place_Of_Origin: {
                    maxlength: 100
                }
                , goods_Content: {
                    maxlength: 500
                }
            }
            , messages: {
                goods_Name: {
                    required: "物资名不能为空"
                    , maxlength: "超出最大长度限制100"
                }
                , place_Of_Origin: {
                    maxlength: "超出最大长度限制100"
                }
                , goods_Content: {
                    maxlength: "超出最大长度限制500"
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
                , $('#formSearch').serialize() + '&sql=GoodsInfoMapper.updateInfo&id=' + selectRowData['id']    //↓
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
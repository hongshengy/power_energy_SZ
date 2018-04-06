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
        <div class="panel-heading">添加物资盘点</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1 text-nowrap" for="goods_All_Count">物资总数量</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="goods_All_Count" name="goods_All_Count">
                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="goods_Use_Count">物资领用数量</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="goods_Use_Count" name="goods_Use_Count">
                    </div>

                    <label class="control-label col-sm-1 text-nowrap" for="goods_Surplus_Count">物资剩余数量</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="goods_Surplus_Count" name="goods_Surplus_Count">
                    </div>

                </div>

                <div class="form-group" style="margin-top:15px">

                    <label class="control-label col-sm-1 text-nowrap" for="goods_Id">物资名</label>
                    <div class="col-sm-3">
                        <div id="goods_Id"></div>
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

                    <label class="control-label col-sm-1 text-nowrap" for="goods_inventory_Remark">物资盘点备注</label>
                    <div class="col-sm-8">
                        <textarea class="form-control" rows="4" id="goods_inventory_Remark" name="goods_inventory_Remark"></textarea>
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

<script type="text/javascript">
    //    调用后台sql接口
    var dataPath = '${dataPath}';
    var updateDataPath = '${updateDataPath}';
    var selectRowData = parent.$('#tb_departments').bootstrapTable('getSelections')[0];

    //    页面中心高度
    $('#showPanel').height(window.parent.$('body').height() - 200);

    //    下拉框菜单S
    appendSelect2('goods_Type_Id', getGti(), $('input:text').eq(0).outerWidth());               //加载下拉框数据                                    //物资类型*
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

//    根据ID获取当前选择的最新数据
    var getSelectDataByIdObject = new Object();
    getSelectDataByIdObject.sql = 'GoodsInventoryInfoMapper.selectInfo';
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
                goods_All_Count: {
                    required: true
                    ,digits: true
                    , maxlength: 10
                }
                ,goods_Use_Count: {
                    required: true
                    ,digits: true
                    , maxlength: 10
                }
                ,goods_Surplus_Count: {
                    required: true
                    ,digits: true
                    , maxlength: 10
                }
                , goods_use_Content: {
                    maxlength: 500
                }
            }
            , messages: {
                goods_All_Count: {
                    required: '物资总数量不能为空'
                    ,digits: '必须是整数'
                    , maxlength: "超出最大长度限制10"
                }
                ,goods_Use_Count: {
                    required: '物资领用数量不能为空'
                    ,digits: '必须是整数'
                    , maxlength: "超出最大长度限制10"
                }
                ,goods_Surplus_Count: {
                    required: '物资剩余数量不能为空'
                    ,digits: '必须是整数'
                    , maxlength: "超出最大长度限制10"
                }
                , goods_use_Content: {
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
                , $('#formSearch').serialize() + '&sql=GoodsInventoryInfoMapper.updateInfo&id=' + selectRowData['id']    //↓
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
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

    <div id="infoDiv" style="padding-top: 15px;"></div>

    <div class="row">
        <div class="panel-body" style="padding-bottom:5px;" id="showPanel">
            <div class="panel panel-default">
                <div class="panel-heading">添加回访记录</div>
                <div class="panel-body">
                    <form id="formSearch" class="form-horizontal">
                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="return_visit_Date">回访日期</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="return_visit_Date" name="return_visit_Date">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="return_visit_User_Name">回访人员</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="return_visit_User_Name" name="return_visit_User_Name">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="dog_Id">犬名</label>
                            <div class="col-sm-3">
                                <div id="dog_Id"></div>
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="other_reason">其他情况</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="other_reason" name="other_reason">
                            </div>

                        </div>
                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="return_visit_Reason">回访情况</label>
                            <div class="col-sm-7">
                                <textarea class="form-control" rows="6" id="return_visit_Reason" name="return_visit_Reason"></textarea>
                            </div>

                        </div>

                        <%--隐藏表单--%>
                        <input type="hidden" name="dog_Id">

                    </form>
                </div>
            </div>
        </div>
    </div>

    <div id="axc" class="row" style="position:absolute; width: 100%;bottom: 20px;">
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
    var pageDataSql = 'ReturnVisitInfoMapper.selectInfo';
    var resourcePath = '${resourcePath}';

    //    页面中心高度
    var winHeight = initBodyHeight().winHeightR;
    $('#divBodyDom').height(winHeight);

    //    下拉框菜单S
    appendSelect2('dog_Id', getDog(), $('input:text').eq(0).outerWidth());                   //加载下拉框数据                       //犬名*
    $('#dog_Id').on("change", function () {                                                  //下拉框改变触发方法                   //犬名*
        $('input[name="dog_Id"]').val($('#dog_Id').select2('val'));                         //设置下拉框相对应hidden项              //犬名*
        query();
        //    特殊处理
    });
    //    下拉框菜单E

    //    日期框S
    dateToolsInit();

    $("#return_visit_Date").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
        , maxDate: new Date()
    });
    //    日期框E

    //    表单提交确认后
    $.validator.setDefaults({
        submitHandler: function () {
            subData();  //没有重复数据处理插入操作
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

    //    数据表格对象
    var $row = $('<div class="panel panel-primary">\n' +
        '            <div class="panel-heading">检疫犬</div>\n' +
        '            <div class="panel-body" style="padding: 30px;">\n' +
        '                <div id="headDiv" class="row">\n' +
        '                    <div class="col-sm-3">\n' +
        '                        <div class="row">\n' +
        '                            <div id="dog_Image" style="width: 100%;" needAppend="true">\n' +
        '                                <img src="" width="100%" height="100%">\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="col-sm-7">\n' +
        '                        <div id="dog_Name" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>犬名</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div id="return_visit_Date" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>回访日期</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div id="return_visit_User_Name" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>回访人员</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div id="other_reason" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>其他情况</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <div id="record_date" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>记录日期</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '\n' +
        '                <div id="footDiv" class="row" style="padding-top: 10px;">\n' +
        '                    <div class="col-sm-10">\n' +
        '                        <div class="row">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>回访情况:</label>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="return_visit_Reason" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-10 col-sm-offset-1">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '\n' +
        '            </div>\n' +
        '            <div class="panel-footer" id="dog_Exploit_Type"></div>\n' +
        '        </div>');

    //    启动完成方法
    $(function () {

        //        表单输入项验证规则
        $("#formSearch").validate({
            rules: {
                return_visit_Date: {
                    required: true
                }
                , return_visit_User_Name: {
                    required: true
                    ,maxlength: 10
                }
                , return_visit_Reason: {
                    maxlength: 2000
                }
                , other_reason: {
                    maxlength: 50
                }
            }
            , messages: {
                return_visit_Date: {
                    required: "回访日期不能为空"
                }
                , return_visit_User_Name: {
                    required: "回访用户不能为空"
                    ,maxlength: "超出最大长度限制10"
                }
                , return_visit_Reason: {
                    maxlength: "超出最大长度限制2000"
                }
                , other_reason: {
                    maxlength: "超出最大长度限制50"
                }
            }
        });
    });

    //    数据插入
    function subData() {
        layerConfirm('确认提交？', ['确认', '取消'], [function () {              //        发起layer询问框            //**************
            getDataFnNoErrorF(                                          //正常提交数据                             //**************
                insertDataPath                                          //发起insert请求                           //**************
                , $('#formSearch').serialize() + '&sql=ReturnVisitInfoMapper.insertInfo'                  //**************
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

    function query() {
        $('#infoDiv').html('');

        var queryObject = new Object();
        queryObject.sql = pageDataSql;

        queryObject.dog_Id = $('#dog_Id').select2('val');

        getDataFnNoErrorF(
            dataPath
            , queryObject
            , function (data) {
                var resultData = data[0][pageDataSql];
//                allTotalResult = resultData[0]['totalResult'];   //总数
                for (var i = 0; i < resultData.length; i++) {
                    $rowNew = $row.clone(true);
                    var item = resultData[i];
                    $rowNew.find('div[needAppend="true"]').each(function () {
                        var itemId = $(this).attr("id");
                        $.each(item, function (keyId, c) {
                            if (keyId == itemId) {
                                switch (keyId) {
                                    case 'dog_Image':
                                        if (null != c && 'null' != c && '' != c) {
                                            $rowNew.find('img').attr('src', resourcePath + c);
                                        } else {
                                            $rowNew.find('img').attr('src', '${basePath}plugins/img/timg.jpg');
                                        }
                                        break;

                                    case 'return_visit_Date':
                                        $rowNew.find('#' + itemId).find('span').append(getLocalDate(c.time));
                                        break;

                                    case 'record_date':
                                        $rowNew.find('#' + itemId).find('span').append(getLocalDate(c.time));
                                        break;

                                    default:
                                        $rowNew.find('#' + itemId).find('span').append(c);
                                        break;
                                }
                            }else{
//                                if(keyId == 'id'){
//                                    var editDom = $rowNew.find('#btnDiv').find('button[onclick="editFun();"]');
//                                    editDom.attr('onclick','editFun('+c+');');
//                                    var delDom = $rowNew.find('#btnDiv').find('button[onclick="delFun();"]');
//                                    delDom.attr('onclick','delFun('+c+');');
//                                }
                            }
                        });
                    });
                    $('#infoDiv').append($rowNew);
                    var topH = parseInt($('#infoDiv').height())+parseInt($('#axc').css('top'))-15;
                    $('#axc').hide();
                    $('#axc').attr('style','position:absolute; width: 100%;top:'+topH+'px; bottom: 20px;');
                    $('#axc').show();
                }

//                if (offset * 10 >= allTotalResult) {
//                    $('#appendBtnDiv').remove();
//                }

            }
            , function (data) {
                alert(data);
            }
            , function () {
                alert('error');
            });
    }
</script>

</html>
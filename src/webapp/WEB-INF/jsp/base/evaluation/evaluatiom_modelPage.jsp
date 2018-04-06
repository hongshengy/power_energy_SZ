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

    <%--上传插件--%>
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/uploadify/css/uploadify.css">

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
                <div class="panel-heading">添加考评模板</div>
                <div class="panel-body">
                    <form id="formSearch" class="form-horizontal">
                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="model_Name">模板名称</label>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" id="model_Name" name="model_Name">
                            </div>

                            <label class="control-label col-sm-1 text-nowrap">上传模板附件</label>
                            <div class="col-sm-7">
                                <div class="form-inline" style="padding-left: 35px; padding-top: 6px;">
                                    <div class="form-group">
                                        <div class="form-group">
                                            <div id="fileQueue"></div>
                                            <div id="file_upload"></div>
                                            <button id="updBtn" type="button" class="btn btn-info" onclick="javascript:$('#file_upload').uploadify('upload','*')">上传</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="model_Content">模板说明</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" rows="3" id="model_Content" name="model_Content"></textarea>
                            </div>

                        </div>

                        <input type="hidden" name="model_Path" id="model_Path"/>
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

<%--layer--%>
<script type="text/javascript" src="${basePath}/plugins/layer/layer.js"></script>

<!-- 表单验证 -->
<script type="text/javascript" src="${basePath}/plugins/jquery_validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery_validate/messages_zh.js"></script>

<script type="text/javascript">
    $('#updBtn').hide();

    //    调用后台sql接口
    var dataPath = '${dataPath}';
    var insertDataPath = '${insertDataPath}';

    //    是否上传附件标识
    var AFFIXFlg = false;
    var AFFIXList = new Array();
    var fexSelectFlg = false;

    //    页面中心高度
    var winHeight = initBodyHeight().winHeightR;
    $('#divBodyDom').height(winHeight);

    //    表单提交确认后
    $.validator.setDefaults({
        submitHandler: function () {
            var queryCheckObject = new Object();
            queryCheckObject.sql = 'EvaluationModelInfoMapper.selectCheck';
            queryCheckObject.model_Name = $('#model_Name').val();

            getDataFnNoErrorF(
                dataPath
                , queryCheckObject
                , function (data) {
                    if (data[0][queryCheckObject.sql].length > 0) {
                        window.top.layerMsg('模板名称以存在,请重新输入');
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
                model_Name: {
                    required: true
                    ,maxlength: 50
                }
                , model_Content: {
                    maxlength: 500
                }

            }
            , messages: {
                model_Name: {
                    required: "模板名称不能为空"
                    ,maxlength: "超出最大长度限制50"
                }
                , model_Content: {
                     maxlength: "超出最大长度限制500"
                }

            }
        });
    });

    //    数据插入
    function subData() {

        if(fexSelectFlg){
            if(!AFFIXFlg){
                layerConfirm('未上传选择的附件确认提交？', ['确认', '取消'], [function () {              //        发起layer询问框            //**************
                    getDataFnNoErrorF(                                          //正常提交数据                             //**************
                        insertDataPath                                          //发起insert请求                           //**************
                        , $('#formSearch').serialize() + '&sql=EvaluationModelInfoMapper.insertInfo'                  //**************
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
                }]);
            }else{
                $('#model_Path').val(AFFIXList.join(','));

                layerConfirm('确认提交？', ['确认', '取消'], [function () {              //        发起layer询问框            //**************
                    getDataFnNoErrorF(                                          //正常提交数据                             //**************
                        insertDataPath                                          //发起insert请求                           //**************
                        , $('#formSearch').serialize() + '&sql=EvaluationModelInfoMapper.insertInfo'                  //**************
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
                }]);
            }
        }else {
            layerConfirm('未上传选择的附件确认提交？', ['确认', '取消'], [function () {              //        发起layer询问框            //**************
                getDataFnNoErrorF(                                          //正常提交数据                             //**************
                    insertDataPath                                          //发起insert请求                           //**************
                    , $('#formSearch').serialize() + '&sql=EvaluationModelInfoMapper.insertInfo'                  //**************
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
            }]);
        }

    }
</script>

<!-- uploadify -->
<script type="text/javascript" src="${basePath}/plugins/uploadify/jquery.uploadify-3.1.min.js"></script>

<script type="text/javascript">
    uploadInit('${basePath}plugins/uploadify/uploadify.swf','${uploadPath}?',function (file, data, response) {
        $('#updBtn').hide();
        var absPath = JSON.parse(data).resultMap[0]['absFilePath'];
        AFFIXList.push(absPath);
        //$('input[name="dog_Image"]').attr('value', absPath);
        //              表示上传了附件
        AFFIXFlg = true;
        //var $imgNew = $img.clone(true);
        //$imgNew.attr('src', resourcePath + '?' + absPath);
        //$('#imgSrcDiv').html('');
        //$('#imgSrcDiv').append($imgNew);
        //                absFilePath
    },'添加附件');
</script>
</html>
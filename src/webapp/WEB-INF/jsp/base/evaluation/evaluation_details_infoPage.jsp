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

<div class="container-fluid" id="divBodyDom" style="position:relative;">
    <div class="row">
        <div class="panel-body" style="padding-bottom:5px;" id="showPanel">
            <div class="panel panel-default">
                <div class="panel-heading">添加检疫犬考评</div>
                <div class="panel-body">
                    <form id="formSearch" class="form-horizontal">
                        <div class="form-group" style="margin-top:15px">

                            <label class="control-label col-sm-1 text-nowrap" for="year">考评年度</label>
                            <div class="col-sm-3">
                                <input id="year" type="text" name="year" class="form-control"/>
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="dog_Id">犬名</label>
                            <div class="col-sm-3">
                                <div id="dog_Id"></div>
                            </div>

                        </div>

                        <div class="form-group" style="margin-top:15px">
                            <label class="control-label col-sm-1 text-nowrap" for="model_Id">考评模板</label>
                            <div class="col-sm-3">
                                <div id="model_Id"></div>
                            </div>

                            <label class="control-label col-sm-1 text-nowrap" for="score">得分</label>
                            <div class="col-sm-3">
                                <input id="score" name="score" type="text" class="form-control"/>
                            </div>


                            <label class="control-label col-sm-1 text-nowrap">上传年度考评</label>
                            <div class="col-sm-3">
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

                            <label class="control-label col-sm-1 text-nowrap" for="evaluation_Content">考评说明</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" rows="3" id="evaluation_Content" name="evaluation_Content"></textarea>
                            </div>

                        </div>

                        <input type="hidden" name="evaluation_Path" id="evaluation_Path"/>
                        <input type="hidden" name="dog_Id"/>
                        <input type="hidden" name="model_Id"/>
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

<%--select2--%>
<script type="text/javascript" src="${basePath}/plugins/select2/select2.js"></script>

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

    //    下拉框菜单S
    appendSelect2('dog_Id', getDog(), $('input:text').eq(0).outerWidth());                   //加载下拉框数据                       //犬名*
    $('#dog_Id').on("change", function () {                                                  //下拉框改变触发方法                   //犬名*
        $('input[name="dog_Id"]').val($('#dog_Id').select2('val'));                         //设置下拉框相对应hidden项              //犬名*
    });

    appendSelect2('model_Id', getModel(), $('input:text').eq(0).outerWidth());                   //加载下拉框数据                       //考评模板*
    $('#model_Id').on("change", function () {                                                  //下拉框改变触发方法                   //考评模板*
        $('input[name="model_Id"]').val($('#model_Id').select2('val'));                         //设置下拉框相对应hidden项              //考评模板*
    });
    //    下拉框菜单E

    //    表单提交确认后
    $.validator.setDefaults({
        submitHandler: function () {
            var queryCheckObject = new Object();
            queryCheckObject.sql = 'EvaluationDetailsInfoMapper.selectCheck';
            queryCheckObject.model_Id = $('#model_Id').select2('val');
            queryCheckObject.dog_Id = $('#dog_Id').select2('val');
            queryCheckObject.year = $('#year').val();

            getDataFnNoErrorF(
                dataPath
                , queryCheckObject
                , function (data) {
                    if (data[0][queryCheckObject.sql].length > 0) {
                        window.top.layerMsg('考评附件已存在,请重新输入');
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
                score: {
                    maxlength: 5
                    ,number: true
                }
                , evaluation_Content: {
                    maxlength: 500
                }
                , year: {
                    maxlength: 4
                    ,digits: true
                }
            }
            , messages: {
                score: {
                    maxlength: "超出最大长度限制5"
                    ,number: "必须是数字"
                }
                , evaluation_Content: {
                     maxlength: "超出最大长度限制500"
                }
                , year: {
                    maxlength: "超出最大长度限制4"
                    ,digits: "必须是自然年"
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
                        , $('#formSearch').serialize() + '&sql=EvaluationDetailsInfoMapper.insertInfo'                  //**************
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
                $('#evaluation_Path').val(AFFIXList.join(','));

                layerConfirm('确认提交？', ['确认', '取消'], [function () {              //        发起layer询问框            //**************
                    getDataFnNoErrorF(                                          //正常提交数据                             //**************
                        insertDataPath                                          //发起insert请求                           //**************
                        , $('#formSearch').serialize() + '&sql=EvaluationDetailsInfoMapper.insertInfo'                  //**************
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
        }else{
            layerConfirm('未上传选择的附件确认提交？', ['确认', '取消'], [function () {              //        发起layer询问框            //**************
                getDataFnNoErrorF(                                          //正常提交数据                             //**************
                    insertDataPath                                          //发起insert请求                           //**************
                    , $('#formSearch').serialize() + '&sql=EvaluationDetailsInfoMapper.insertInfo'                  //**************
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
    },'添加年度考评');
</script>
</html>
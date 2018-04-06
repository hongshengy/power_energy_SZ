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

    <!--bootstrap-table-->
    <%--<link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap-table/bootstrap-table.min.css">--%>
    <%--select2--%>
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2-bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2.min.css">

    <%--上传插件--%>
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/uploadify/css/uploadify.css">

    <!-- datetimepicker -->
    <link href="${basePath}/plugins/datepicker/jquery-ui.css" rel="stylesheet">
    <link href="${basePath}/plugins/datepicker/jquery-ui-timepicker-addon.min.css" rel="stylesheet">

    <style type="text/css">
        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
            border: 0px solid transparent !important;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            table-layout: fixed;
        }

        .error {
        / / float: left;
            color: red;
            white-space: nowrap;
        }
    </style>

</head>
<body style="background-color: #ffffff">

<div class="container" style="padding-top: 15px;">
    <form id="formSearch" method="get">
        <div class="row">
            <div class="col-sm-8 text-left">
                <table class="table" style="width: 100%;">
                    <thead style="border-bottom: 2px solid #ef3f52">
                    <tr>
                        <th colspan="4" style="font-size:20px;">检疫犬备案登记</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><span>犬名</span></td>
                        <!--<td><label class="control-label">犬名</label></td>-->
                        <td><input type="text" class="form-control" name="dog_Name" id="dog_Name"></td>
                        <td rowspan="6" colspan="2">
                            <div class="text-center">

                                <div id="imgSrcDiv" style="width: 100%; padding-left: 170px;">
                                    <!--<div style="width: 300px;height: 200px;padding-left: 70px;">-->
                                    <%--<img src="../img/dog.jpg" width="100%" height="100%"></img>--%>
                                </div>
                                <div style="padding-top: 15px; padding-left: 170px;">
                                    <%--<input type="file">--%>
                                    <div class="form-inline" style="padding-top: 20px;">
                                        <div class="form-group">
                                            <%--<label class="control-label">添加附件</label>--%>
                                            <div class="form-group">
                                                <div id="fileQueue"></div>
                                                <div id="file_upload"></div>
                                                <%--<a href="javascript:$('#file_upload').uploadify('upload','*')">上传</a>--%>
                                                <button id="updBtn" type="button" class="btn btn-info" onclick="javascript:$('#file_upload').uploadify('upload','*')">上传</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </td>
                    </tr>
                    <tr style="margin-top: 10px;">
                        <td><span>芯片号</span></td>
                        <td><input type="text" class="form-control" id="dog_Chip_Number" name="dog_Chip_Number"></td>
                    </tr>
                    <tr>
                        <td><span>性别</span></td>
                        <td>
                            <div id="dog_Sex"></div>
                        </td>
                    </tr>
                    <tr>
                        <td><span>出生日期</span></td>
                        <td><input type="text" class="form-control" id="dog_Birthday" name="dog_Birthday"></td>
                    </tr>
                    <tr>
                        <td><span>品种</span></td>
                        <td>
                            <%--<div id="Varieties"></div>--%>
                            <input type="text" class="form-control" id="dog_Variety" name="dog_Variety">
                        </td>
                    </tr>
                    <tr>
                        <td><span>毛色</span></td>
                        <td>
                            <%--<div id="HairColor"></div>--%>
                            <input type="text" class="form-control" id="dog_Coat_Colour" name="dog_Coat_Colour">
                        </td>
                    </tr>
                    <tr>
                        <td><span>外貌特征</span></td>
                        <td colspan="3"><textarea rows="3" class="form-control" id="dog_Appearance_Features" name="dog_Appearance_Features"></textarea></td>
                    </tr>


                    <tr>
                        <td><span>服役单位</span></td>
                        <td>
                            <%--<div id="escuageCompany"></div>--%>
                            <input type="text" class="form-control" id="dog_Service_Unit" name="dog_Service_Unit">
                        </td>
                    </tr>

                    <tr>
                        <td><span>服役时间</span></td>
                        <td><input type="text" class="form-control" id="dog_Service_StartTime" name="dog_Service_StartTime"></td>

                        <td><span>至</span></td>
                        <td><input type="text" class="form-control" id="dog_Service_EndTime" name="dog_Service_EndTime"></td>
                    </tr>

                    <tr>
                        <td><span>入伍时间</span></td>
                        <td><input type="text" class="form-control" id="dog_Army_Date" name="dog_Army_Date"></td>
                    </tr>

                    <tr>
                        <td><span>服役状态</span></td>
                        <td>
                            <div id="dog_Service_Type"></div>
                        </td>

                        <td><span>是否功勋犬</span></td>
                        <td>
                            <div id="dog_Exploit_Type"></div>
                        </td>

                    </tr>

                    <tr>
                        <td><span>获奖情况</span></td>
                        <td colspan="3"><textarea rows="3" class="form-control" id="dog_Winning_Info" name="dog_Winning_Info"></textarea></td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>

        <input type="hidden" name="dog_Service_Type">
        <input type="hidden" name="dog_Exploit_Type">
        <input type="hidden" name="dog_Sex">
        <input type="hidden" name="dog_Image">

        <div class="row" style="padding-bottom: 10px;">
            <div class="col-sm-6 text-center">
                <button id="save_btn" type="submit" class="btn btn-info btn-lg" style="width: 150px;">保存</button>
            </div>

            <div class="col-sm-6 text-left">
                <button class="btn btn-default btn-lg" style="width: 150px;">取消</button>
            </div>
        </div>
    </form>

</div>
</body>

<%--jquery--%>
<script type="text/javascript" src="${basePath}/plugins/jquery/jquery-1.8.3.js"></script>

<%--tools--%>
<script type="text/javascript" src="${basePath}/plugins/tools/tools.js"></script>

<!--bootstrap-table-->
<%--<script type="text/javascript" src="${basePath}/plugins/bootstrap-table/bootstrap-table.min.js"></script>--%>

<!--bootstrap-table-->
<%--<script type="text/javascript" src="${basePath}/plugins/bootstrap-table/bootstrap-table-zh-CN.min.js"></script>--%>

<%--layer--%>
<script type="text/javascript" src="${basePath}/plugins/layer/layer.js"></script>

<%--select2--%>
<script type="text/javascript" src="${basePath}/plugins/select2/select2.js"></script>

<!-- uploadify -->
<script type="text/javascript" src="${basePath}/plugins/uploadify/jquery.uploadify-3.1.min.js"></script>

<!-- datetimepicker -->
<script type="text/javascript" src="${basePath}/plugins/jquery-ui/js/jquery-ui.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery-ui-datepicker/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery-ui-datepicker/jquery-ui-timepicker-zh-CN.js"></script>

<!-- 表单验证 -->
<script type="text/javascript" src="${basePath}/plugins/jquery_validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery_validate/messages_zh.js"></script>

<script type="text/javascript">
    $('#updBtn').hide();

    var fexSelectFlg = false;

    var $img = $('<img src="" width="100%" height="100%"></img>');

    var dataPath = '${dataPath}';
    var resourcePath = '${resourcePath}';
    var insertDataPath = '${insertDataPath}';

    //    是否上传附件标识
    var AFFIXFlg = false;
    var AFFIXList = new Array();

    var mmm = $('input:text').first().outerWidth();

    /* 表单验证 */
    $.validator.setDefaults({
        submitHandler: function () {
            getDataFnNoErrorF(
                dataPath
                , {'sql':'DogInfoMapper.selectInfo','dog_Name':$('#dog_Name').val()}
                , function (data) {
                    debugger;
                    var line = data[0]['DogInfoMapper.selectInfo'].length;

                    if(line<1){

                        getDataFnNoErrorF(
                            insertDataPath
                            , $('#formSearch').serialize() + '&sql=DogInfoMapper.insertInfo'
                            , function (data) {
                                if (null != data) {
                                    //debugger;
                                    console.log(data);
                                    $('input:text').val('');

                                    //$('input:hidden').attr('value',"");
                                    AFFIXFlg = false;
                                    AFFIXList = new Array();
                                    $('input[name="dog_Image"]').attr('value','');
                                    $('#imgSrcDiv').html('');
                                    $('textarea').val('');
                                }
                            }
                            , function (data) {
                                alert(data);
                            }
                            , function () {
                                alert('error');
                            });
                    }else {
                        window.top.layerMsg('犬名已存在，不能重复录入');
                    }
                }
                , function (data) {
                    alert(data);
                }
                , function () {
                    alert('error');
                });
        }
    });


    $(function () {

//        var HairColorData = [{"id": "0", "text": "白"}, {"id": "1", "text": "棕"}, {"id": "2", "text": "黄"}, {"id": "3", "text": "黑"}, {"id": "4", "text": "茶"}, {"id": "5", "text": "咖啡"}];
//        $('#HairColor').select2({
//            placeholder: "请选择"
//            , width: mmm
//            , data: HairColorData
//        });

        var dog_SexData = [{"id": "1", "text": "雄性"}, {"id": "0", "text": "雌性"}];
        $('#dog_Sex').select2({
            placeholder: "请选择"
            , width: mmm
            , data: dog_SexData
        });

        $('#dog_Sex').select2('val', 1);

        $('input[name="dog_Sex"]').attr('value', $('#dog_Sex').select2('val'));

        $('#dog_Sex').on("change", function () {
            $('input[name="dog_Sex"]').attr('value', $('#dog_Sex').select2('val'));
        });

//        var VarietiesData = [{"id": "0", "text": "哈士奇"}, {"id": "1", "text": "藏獒"}, {"id": "2", "text": "边境牧羊犬"}, {"id": "3", "text": "德国牧羊犬"}, {"id": "4", "text": "金毛寻回犬"}, {"id": "5", "text": "比利时牧羊犬"}];
//        $('#Varieties').select2({
//            placeholder: "请选择"
//            , width: mmm
//            , data: VarietiesData
//        });

//        var escuageCompanyData = [{"id": "0", "text": "消防"}, {"id": "1", "text": "关检"}, {"id": "2", "text": "地铁"}, {"id": "3", "text": "公安"}, {"id": "4", "text": "机场"}, {"id": "5", "text": "安保"}];
//        $('#escuageCompany').select2({
//            placeholder: "请选择"
//            , width: mmm
//            , data: escuageCompanyData
//        });

        var dog_Service_TypeData = [{"id": "Y", "text": "在役"}, {"id": "N", "text": "退役"}];
        $('#dog_Service_Type').select2({
            placeholder: "请选择"
            , width: mmm
            , data: dog_Service_TypeData
        });

        $('#dog_Service_Type').select2('val', 'Y');

        $('input[name="dog_Service_Type"]').attr('value', $('#dog_Service_Type').select2('val'));

        $('#dog_Service_Type').on("change", function () {
            $('input[name="dog_Service_Type"]').attr('value', $('#dog_Service_Type').select2('val'));
        });

        var dog_Exploit_TypeData = [{"id": "Y", "text": "是"}, {"id": "N", "text": "否"}];
        $('#dog_Exploit_Type').select2({
            placeholder: "请选择"
            , width: mmm
            , data: dog_Exploit_TypeData
        });

        $('#dog_Exploit_Type').select2('val', 'Y');

        $('input[name="dog_Exploit_Type"]').attr('value', $('#dog_Exploit_Type').select2('val'));

        $('#dog_Exploit_Type').on("change", function () {
            $('input[name="dog_Exploit_Type"]').attr('value', $('#dog_Exploit_Type').select2('val'));
        });

        $("#formSearch").validate({
            rules: {
                dog_Name: {
                    required: true
                    , maxlength: 50
                }
                , dog_Birthday: {
                    required: true
                }
                , dog_Variety: {
                    required: true
                    , maxlength: 50
                }
                , dog_Coat_Colour: {
                    required: true
                    , maxlength: 10
                }
                , dog_Appearance_Features: {
                    required: true
                    , maxlength: 500
                }
                , dog_Service_Unit: {
                    required: true
                    , maxlength: 50
                }
                , dog_Service_StartTime: {
                    required: true
                }
                , dog_Army_Date: {
                    required: true
                }
                , dog_Winning_Info: {
                    required: true
                    , maxlength: 500
                }
                , dog_Chip_Number: {
                    maxlength: 100
                }

            }
            , messages: {
                dog_Name: {
                    required: "犬名不能为空"
                    , maxlength: "超出最大长度限制50"
                }
                , dog_Birthday: {
                    required: "不能为空"
                }
                , dog_Variety: {
                    required: "不能为空"
                    , maxlength: "超出最大长度限制50"
                }
                , dog_Coat_Colour: {
                    required: "不能为空"
                    , maxlength: "超出最大长度限制10"
                }
                , dog_Appearance_Features: {
                    required: "不能为空"
                    , maxlength: "超出最大长度限制500"
                }
                , dog_Service_Unit: {
                    required: "不能为空"
                    , maxlength: "超出最大长度限制50"
                }
                , dog_Service_StartTime: {
                    required: "不能为空"
                }
                , dog_Army_Date: {
                    required: "不能为空"
                }
                , dog_Winning_Info: {
                    required: "不能为空"
                    , maxlength: "超出最大长度限制500"
                }
                , dog_Chip_Number: {
                    maxlength: "超出最大长度限制100"
                }
            }
        });

    });

    <%--$('#file_upload').uploadify(--%>
        <%--{--%>
            <%--'swf': '${basePath}/plugins/uploadify/uploadify.swf',--%>
            <%--'uploader': '${uploadPath}',--%>
            <%--'buttonCursor': 'hand',--%>
            <%--'buttonText': '添加图片',--%>
            <%--'buttonClass': '',--%>
            <%--'method': 'post',--%>
            <%--'queueID': 'fileQueue',--%>
            <%--'progressData': 'percentage',--%>
            <%--'auto': false,--%>
            <%--'multi': true,--%>
            <%--'fileTypeDesc': '',--%>
            <%--'fileTypeExts': '',--%>
            <%--'queueSizeLimit': 3,--%>
            <%--'fileSizeLimit': '100000KB',--%>
            <%--//'formData': {},--%>
            <%--//'formData': {},--%>
<%--//            'formData': {cmd: '$sql/system/logs/insert_logs', USER_NAME: "$principal", IP_ADDRESS: "$ip", OPTYPE: "JCGJLX", OPERATOR_TYPE: "SC", pathParam:'filepath', thumbPathParam:'thumbpath'},--%>
            <%--'removeCompleted': true,--%>
            <%--'removeTimeout': 3,--%>
            <%--'uploadLimit': 999,--%>
            <%--'width': 100,--%>
            <%--'height': 20,--%>
            <%--'fileObjName': 'file',--%>
            <%--'itemTemplate': '',--%>
            <%--'onCancel': function (file) {--%>
                <%--$('#updBtn').hide();--%>
<%--//                $('.btn-info').hide();--%>
            <%--},--%>
            <%--'onSelect': function (file) {--%>
                <%--$('#updBtn').show();--%>
<%--//                $('.btn-info').show();--%>
            <%--},--%>
            <%--'onSelectError': function (file, errorCode, errorMsg) {--%>
                <%--$('#updBtn').hide();--%>
                <%--switch (errorCode) {--%>
                    <%--//QUEUE_LIMIT_EXCEEDED--%>
                    <%--case -100:--%>
                        <%--break;--%>
                    <%--//FILE_EXCEEDS_SIZE_LIMIT--%>
                    <%--case -110:--%>
                        <%--break;--%>
                    <%--//ZERO_BYTE_FILE--%>
                    <%--case -120:--%>
                        <%--break;--%>
                    <%--//INVALID_FILETYPE--%>
                    <%--case -130:--%>
                        <%--break;--%>
                <%--}--%>
            <%--},--%>
            <%--'onUploadStart': function (file) {--%>
                <%--$('#updBtn').hide();--%>
                <%--/*file.name;file.size;file.type*/--%>
<%--//                    $('#file_upload').uploadify('settings', 'formData', {id: "$uuid", filename: file.name, filesize: file.size, filetype: file.type, time: "$date"})--%>
            <%--},--%>
            <%--'onUploadProgress': function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {--%>
            <%--},--%>
            <%--'onUploadSuccess': function (file, data, response) {--%>
                <%--$('#updBtn').hide();--%>
                <%--var absPath = JSON.parse(data).resultMap[0]['absFilePath'];--%>
                <%--AFFIXList.push(absPath);--%>
                <%--$('input[name="dog_Image"]').attr('value', absPath);--%>
<%--//              表示上传了附件--%>
                <%--AFFIXFlg = true;--%>
                <%--var $imgNew = $img.clone(true);--%>
                <%--$imgNew.attr('src', resourcePath + '?' + absPath);--%>
                <%--$('#imgSrcDiv').html('');--%>
                <%--$('#imgSrcDiv').append($imgNew);--%>
<%--//                absFilePath--%>
            <%--},--%>
            <%--'onUploadError': function (file, errorCode, errorMsg, errorString) {--%>
                <%--$('#updBtn').hide();--%>
                <%--alert("errorCode:" + errorCode + "," + "errorMsg:" + errorMsg + "," + "errorString:" + errorString);--%>
                <%--//$('.btn-info').hide();--%>
            <%--},--%>
            <%--'onUploadComplete': function (file) {--%>
            <%--},--%>
            <%--'onQueueComplete': function (queueData) {--%>
            <%--}--%>
        <%--});--%>


    uploadInit('${basePath}/plugins/uploadify/uploadify.swf','${uploadPath}',function (file, data, response) {
        $('#updBtn').hide();
        var absPath = JSON.parse(data).resultMap[0]['absFilePath'];
        AFFIXList.push(absPath);
        $('input[name="dog_Image"]').attr('value', absPath);
        //              表示上传了附件
        AFFIXFlg = true;
        var $imgNew = $img.clone(true);
        $imgNew.attr('src', resourcePath + '?' + absPath);
        $('#imgSrcDiv').html('');
        $('#imgSrcDiv').append($imgNew);
        //                absFilePath
    },'添加图片');

    dateToolsInit();

    $("#dog_Service_StartTime").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
        , onClose: function (selectedDate) {
            $("#dog_Service_EndTime").datepicker("option", "minDate", selectedDate);//限制日期范围
        }
    });

    $("#dog_Service_EndTime").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
        , onClose: function (selectedDate) {
            $("#dog_Service_StartTime").datepicker("option", "maxDate", selectedDate);//限制日期范围
        }
    });

    $("#dog_Army_Date").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
    });

    $("#dog_Birthday").prop("readonly", true).datepicker({
        dateFormat: 'yy-mm-dd'
    });


    //    $('#save_btn').click(function () {
    //        debugger;
    ////        getDataFnNoErrorF(
    ////            insertDataPath
    ////            , $('#formSearch').serialize() + '&sql=DogInfoMapper.insertInfo'
    ////            , function (data) {
    ////                if (null != data) {
    ////                    debugger;
    ////                    console.log(data);
    ////                }
    ////            }
    ////            , function (data) {
    ////                alert(data);
    ////            }
    ////            , function () {
    ////                alert('error');
    ////            });
    //    });

</script>
<%--导航--%>
<%--<script type="text/javascript" src="${basePath}/plugins/mainMenu/js/nav.js"></script>--%>

</html>
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

    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2-bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2.min.css">

    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/uploadify/css/uploadify.css">

    <!-- datetimepicker -->
    <link href="${basePath}/plugins/datepicker/jquery-ui.css" rel="stylesheet">
    <link href="${basePath}/plugins/datepicker/jquery-ui-timepicker-addon.min.css" rel="stylesheet">

    <style type="text/css">


    </style>

</head>
<body style="background-color: #ffffff">

<div id="queryDiv" style="padding: 10px;">
    <div class="panel panel-default">
        <div class="panel-heading">查询条件</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1" for="qdog_Name">犬名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="qdog_Name">
                    </div>
                    <div class="col-sm-2" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_query" class="btn btn-primary" onclick="query(1,true);">查询</button>
                    </div>
                    <div class="col-sm-2" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_export" class="btn btn-primary">导出数据</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="container" style="padding-top: 15px;">

    <div id="infoDiv">
        <%--<div class="panel panel-primary">--%>
        <%--<div class="panel-heading">检疫犬</div>--%>
        <%--<div class="panel-body" style="padding: 30px;">--%>
        <%--<div id="headDiv" class="row">--%>
        <%--<div class="col-sm-3">--%>
        <%--<div class="row">--%>
        <%--<div id="imgSrcDiv" style="width: 100%;" needAppend="true">--%>
        <%--<img src="/system/resource?" width="100%" height="100%">--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div class="col-sm-7">--%>
        <%--<div id="dog_Name" class="row" needAppend="true">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>犬名</label>--%>
        <%--</div>--%>
        <%--<div class="col-sm-1">:</div>--%>
        <%--<div class="col-sm-7">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div id="dog_Chip_Number" class="row" needAppend="true">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>芯片号</label>--%>
        <%--</div>--%>
        <%--<div class="col-sm-1">:</div>--%>
        <%--<div class="col-sm-7">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div id="dog_Sex" class="row" needAppend="true">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>性别</label>--%>
        <%--</div>--%>
        <%--<div class="col-sm-1">:</div>--%>
        <%--<div class="col-sm-7">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div id="dog_Birthday" class="row" needAppend="true">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>出生日期</label>--%>
        <%--</div>--%>
        <%--<div class="col-sm-1">:</div>--%>
        <%--<div class="col-sm-7">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div id="dog_Variety" class="row" needAppend="true">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>品种</label>--%>
        <%--</div>--%>
        <%--<div class="col-sm-1">:</div>--%>
        <%--<div class="col-sm-7">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div id="dog_Coat_Colour" class="row" needAppend="true">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>毛色</label>--%>
        <%--</div>--%>
        <%--<div class="col-sm-1">:</div>--%>
        <%--<div class="col-sm-7">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div id="dog_Service_Unit" class="row" needAppend="true">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>服役单位</label>--%>
        <%--</div>--%>
        <%--<div class="col-sm-1">:</div>--%>
        <%--<div class="col-sm-7">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div id="dog_Service_StartTime" class="row" needAppend="true">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>服役时间</label>--%>
        <%--</div>--%>
        <%--<div class="col-sm-1">:</div>--%>
        <%--<div class="col-sm-7">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div id="dog_Army_Date" class="row" needAppend="true">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>入伍时间</label>--%>
        <%--</div>--%>
        <%--<div class="col-sm-1">:</div>--%>
        <%--<div class="col-sm-7">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div id="dog_Service_Type" class="row" needAppend="true">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>服役状态</label>--%>
        <%--</div>--%>
        <%--<div class="col-sm-1">:</div>--%>
        <%--<div class="col-sm-7">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--</div>--%>

        <%--<div id="footDiv" class="row" style="padding-top: 10px;">--%>
        <%--<div class="col-sm-10">--%>
        <%--<div class="row">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>外貌特征:</label>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div id="dog_Appearance_Features" class="row" needAppend="true">--%>
        <%--<div class="col-sm-10 col-sm-offset-1">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div class="row">--%>
        <%--<div class="col-sm-2">--%>
        <%--<label>获奖情况:</label>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div id="dog_Winning_Info" class="row" needAppend="true">--%>
        <%--<div class="col-sm-10 col-sm-offset-1">--%>
        <%--<span></span>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--</div>--%>
        <%--<div class="panel-footer" id="dog_Exploit_Type"></div>--%>
        <%--</div>--%>

    </div>

    <div id="appendBtnDiv" class="row" style="padding-bottom: 20px;">
        <div class="col-sm-10 text-center">
            <button class="btn btn-success btn-lg" onclick="queryMore();"><span>加载更多</span></button>
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

<!-- datetimepicker -->
<script type="text/javascript" src="${basePath}/plugins/jquery-ui/js/jquery-ui.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery-ui-datepicker/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="${basePath}/plugins/jquery-ui-datepicker/jquery-ui-timepicker-zh-CN.js"></script>

<script type="text/javascript">

    //    分页
    var offset = 1;
    var allTotalResult = '';
    //    分页


    var dataPath = '${dataPath}';
    var pageDataSql = 'DogInfoMapper.selectInfoByPage';
    var resourcePath = '${resourcePath}';
    var insertDataPath = '${insertDataPath}';


    var mmm = $('input:text').first().outerWidth();

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
        '                        <div id="dog_Chip_Number" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>芯片号</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="dog_Sex" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>性别</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="dog_Birthday" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>出生日期</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="dog_Variety" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>品种</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="dog_Coat_Colour" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>毛色</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="dog_Service_Unit" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>服役单位</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="dog_Service_StartTime" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>服役时间</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="dog_Army_Date" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>入伍时间</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="dog_Service_Type" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>服役状态</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="dog_Exploit_Type" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>是否功勋犬</label>\n' +
        '                            </div>\n' +
        '                            <div class="col-sm-1">:</div>\n' +
        '                            <div class="col-sm-7">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '\n' +
        '                <div id="footDiv" class="row" style="padding-top: 10px;">\n' +
        '                    <div class="col-sm-10">\n' +
        '                        <div class="row">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>外貌特征:</label>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="dog_Appearance_Features" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-10 col-sm-offset-1">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="row">\n' +
        '                            <div class="col-sm-2">\n' +
        '                                <label>获奖情况:</label>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div id="dog_Winning_Info" class="row" needAppend="true">\n' +
        '                            <div class="col-sm-10 col-sm-offset-1">\n' +
        '                                <span></span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="panel-footer" id=""></div>\n' +
        '        </div>');

    $(function () {

        query(1,true);
    });

    function queryMore() {
        offset += 1;
        query(offset,false);
    }

    function query(offset,cf) {
        if(cf){
            $('#infoDiv').html('');
        }
        var queryObject = new Object();
        queryObject.sql = pageDataSql;
        queryObject.showCount = '10';
        queryObject.currentPage = offset;
        queryObject.dog_Name = $('#qdog_Name').val();

        getDataFnNoErrorF(
            dataPath
            , queryObject
            , function (data) {
                var resultData = data[0][pageDataSql][0];
                allTotalResult = resultData[0]['totalResult'];   //总数
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
                                            $rowNew.find('img').attr('src', resourcePath + $rowNew.find('img').attr('src') + c);
                                        } else {
                                            $rowNew.find('img').attr('src', '${basePath}plugins/img/timg.jpg');
                                        }
                                        break;

                                    case 'dog_Sex':
                                        if (c == '1') {
                                            $rowNew.find('#' + itemId).find('span').append('雄性');
                                        } else {
                                            $rowNew.find('#' + itemId).find('span').append('雌性');
                                        }
                                        break;

                                    case 'dog_Service_Type':
                                        if (c == 'Y') {
                                            $rowNew.find('#' + itemId).find('span').append('在役');
                                        } else {
                                            $rowNew.find('#' + itemId).find('span').append('退役');
                                        }
                                        break;

                                    case 'dog_Exploit_Type':
                                        if (c == 'Y') {
                                            $rowNew.find('#' + itemId).find('span').append('功勋犬');
                                        } else {
                                            $rowNew.find('#' + itemId).find('span').append('非功勋犬');
                                        }
                                        break;

                                    default:
                                        $rowNew.find('#' + itemId).find('span').append(c);
                                        break;
                                }
                            }
                        });
                    });
                    $('#infoDiv').append($rowNew);
                }

                if (offset * 10 >= allTotalResult) {
                    $('#appendBtnDiv').remove();
                }

            }
            , function (data) {
                alert(data);
            }
            , function () {
                alert('error');
            });
    }

    //    导出
    $('#btn_export').click(function () {
        var mmm = ['检疫犬名','','获奖情况','毛色','检疫犬图片路径','','服役时间止','是否功勋犬','性别','芯片号','入伍时间','','外貌特征','出生日期','','服役单位','服役时间起','品种','服役状态'];
        var titleParams = mmm.join(",");
        window.open('${exportPath}'+$('#formSearch').serialize()+'&sql=DogInfoMapper.selectInfo&fileName=检疫犬信息管理&titleParams='+titleParams);
    });
</script>
<%--导航--%>
<%--<script type="text/javascript" src="${basePath}/plugins/mainMenu/js/nav.js"></script>--%>

</html>
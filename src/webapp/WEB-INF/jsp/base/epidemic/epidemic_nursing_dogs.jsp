<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="zh">
<head>
    <title>护理管理</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9"/>

    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap-theme.css">

    <%--select2--%>
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2-bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2.min.css">

    <!--bootstrap-table-->
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap-table/bootstrap-table.min.css">

    <style type="text/css">

    </style>
</head>
<body style="background-color: #ffffff">
<div class="panel-body" style="padding:5px;">
    <div class="panel panel-default">
        <div class="panel-heading">护理管理</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1 text-nowrap" for="dog_Id">犬名</label>
                    <div class="col-sm-3">
                        <div id="dog_Id"></div>
                    </div>
                    <div class="col-sm-2" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_query" class="btn btn-primary" onclick="query();">查询</button>
                    </div>
                    <div class="col-sm-2" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_export" class="btn btn-primary">导出数据</button>
                    </div>
                </div>

            </form>
        </div>
    </div>

    <div id="toolbar" class="btn-group">
        <button id="btn_add" type="button" class="btn btn-default" onclick="add();">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
        </button>
        <button id="btn_edit" type="button" class="btn btn-default" onclick="edit();">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改
        </button>
        <button id="btn_delete" type="button" class="btn btn-default" onclick="deleteFun();">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
        </button>
    </div>

    <table id="tb_departments"></table>
</div>

</div>
</body>

<%--jquery--%>
<script type="text/javascript" src="${basePath}/plugins/jquery/jquery-1.9.1.js"></script>

<%--bootstrap--%>
<script type="text/javascript" src="${basePath}/plugins/bootstrap/js/bootstrap.js"></script>

<%--tools--%>
<script type="text/javascript" src="${basePath}/plugins/tools/tools.js"></script>

<!--bootstrap-table-->
<script type="text/javascript" src="${basePath}/plugins/bootstrap-table/bootstrap-table.min.js"></script>

<%--select2--%>
<script type="text/javascript" src="${basePath}/plugins/select2/select2.js"></script>

<!--bootstrap-table-->
<script type="text/javascript" src="${basePath}/plugins/bootstrap-table/bootstrap-table-zh-CN.min.js"></script>

<%--layer--%>
<script type="text/javascript" src="${basePath}/plugins/layer/layer.js"></script>

<script type="text/javascript">
    var bodyH;
    var bodyW;

    var dataPath = '${dataPath}';
    var pageDataSql = 'EpidemicNursingInfoMapper.getListByParamsByPage';
    var deleteDataPath = '${deleteDataPath}';

    //    下拉框菜单S
    appendSelect2('dog_Id', getDog(), '200');                   //加载下拉框数据                       //犬名*

//    gird********************************************************************************************************************************************
    var columns = [
        {
            checkbox: true
        }, {
            field: 'dog_Id',
            title: '犬名'
        }, {
            field: 'dogName',
            title: '犬名'
        }, {
            field: 'chip_No',
            title: '芯片号'
        }, {
            field: 'dog_Chip_Number',
            title: '芯片号'
        }, {
            field: 'coat_Nursing',
            title: '毛发护理情况'
        }, {
            field: 'body_Surface_Nursing',
            title: '体表驱虫情况'
        }, {
            field: 'ear_Nursing',
            title: '耳部清掏情况'
        }, {
            field: 'nail_Nursing',
            title: '指甲护理情况'
        }, {
            field: 'nursing_User_Name',
            title: '护理人'
        }, {
            field: 'nursing_Date',
            title: '护理时间',
            formatter: function (value, row, index) {
                var value2 = '';
                if(undefined != value && value != ''){
                    value2 = getLocalDate(value.time);
                }

                return value2;
            }
        }
    ];

    //    执行完成后的回调方法
    function responseHandler(data) {                //加载服务器数据之前的处理程序，可以用来格式化数据。参数：res为从服务器请求到的数据。
        var total;
        var rows;

        if (data['result']['resultMap'][0][pageDataSql][0].length > 0) {
            total = data['result']['resultMap'][0][pageDataSql][0][0]['totalResult'];
            rows = data['result']['resultMap'][0][pageDataSql][0];
        } else {
            total = 0;
            rows = '';
        }

        return {"total": total, "rows": rows};
    }

    //    请求参数设置
    function queryParams(params) {
        var temp = {                                //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
//            limit: params.limit,                    //页面大小
//            offset: params.offset,                  //页码
//            user_Name: $("#user_Name").val(),
            dog_Id: $('#dog_Id').select2('val'),
            showCount: params.limit,                //此框架分页必须带
            currentPage: (params.limit+params.offset)/params.limit,             //此框架分页必须带
            sql: pageDataSql

        };
        return temp;
    }

    var oTable = new TableInit('${dataPath}', 'toolbar', false, null,columns,true);

    oTable.Init();

    $('#tb_departments').bootstrapTable('hideColumn', 'chip_No');     //隐藏需替换的列
    $('#tb_departments').bootstrapTable('hideColumn', 'dog_Id');     //隐藏需替换的列

    //    查询
    function query() {
        $('#tb_departments').bootstrapTable('refresh');
    }
//    gird********************************************************************************************************************************************

    $(function () {
        bodyH = $('body').height();
        bodyW = $('body').width();
    });

//    父子表gird显示参照fatherAndSonGird.jsp

//    添加
    function add() {
        layerOpenFn('${showPagePath}','添加护理','base/epidemic/epidemic_nursing_dogsPage',bodyW-100, bodyH);
    }

    //    修改
    function edit() {
        if($('#tb_departments').bootstrapTable('getSelections').length == 1){
            layerOpenFn('${showPagePath}','编辑护理', 'base/epidemic/epidemic_nursing_dogsEditPage', bodyW-100, bodyH);
        }else {
            window.top.layerMsg('选择一个');
        }
    }

    //    删除
    function deleteFun() {
        sysDeleteFun('EpidemicNursingInfoMapper.deleteInfo');
    }

    //    导出
    $('#btn_export').click(function () {
        var mmm = ['毛发护理情况','耳部清掏情况','指甲护理情况','护理时间','芯片号','护理人','','检疫犬名','芯片号','','体表驱虫情况'];
        var titleParams = mmm.join(",");
        window.open('${exportPath}'+$('#formSearch').serialize()+'&sql=EpidemicNursingInfoMapper.selectInfo&fileName=护理管理&titleParams='+titleParams);
    });
</script>

</html>
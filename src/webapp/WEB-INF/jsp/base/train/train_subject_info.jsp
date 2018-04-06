<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="zh">
<head>
    <title>基础训练科目管理</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9"/>

    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap-theme.css">

    <!--bootstrap-table-->
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap-table/bootstrap-table.min.css">

    <style type="text/css">

    </style>
</head>
<body style="background-color: #ffffff">
<div class="panel-body" style="padding:5px;">
    <div class="panel panel-default">
        <div class="panel-heading">查询条件</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1" for="train_subject_Name">科目类型名称</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="train_subject_Name" name="train_subject_Name">
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

<!--bootstrap-table-->
<script type="text/javascript" src="${basePath}/plugins/bootstrap-table/bootstrap-table-zh-CN.min.js"></script>

<%--layer--%>
<script type="text/javascript" src="${basePath}/plugins/layer/layer.js"></script>

<script type="text/javascript">
    var bodyH;
    var bodyW;

    var dataPath = '${dataPath}';
    var pageDataSql = 'TrainSubjectInfoMapper.getListByParamsByPage';
    var deleteDataPath = '${deleteDataPath}';

//    gird********************************************************************************************************************************************
    var columns = [
        {
            checkbox: true
        }, {
            field: 'train_subject_Name',
            title: '科目类型名称'
        }, {
            field: 'train_subject_Type',
            title: '科目类型'
        }, {
            field: 'trainer',
            title: '训练人'
        }, {
            field: 'train_subject_local',
            title: '训练地点'
        }, {
            field: 'train_subject_Content',
            title: '备注'
        }, {
            field: 'ZHUANGTAI',
            title: '状态'
        }, {
            field: 'train_subject_status',
            title: '状态'
        }
    ];

    //    执行完成后的回调方法
    function responseHandler(data) {                //加载服务器数据之前的处理程序，可以用来格式化数据。参数：res为从服务器请求到的数据。
        var total;
        var rows;

        if(data['result']['resultMap'][0][pageDataSql][0].length > 0){
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
            kennel_Name: $("#kennel_Name").val(),
            showCount: params.limit,                //此框架分页必须带
            currentPage: (params.limit+params.offset)/params.limit,             //此框架分页必须带
            sql: pageDataSql

        };
        return temp;
    }

    var oTable = new TableInit('${dataPath}', 'toolbar', false, null,columns,true);

    oTable.Init();

    $('#tb_departments').bootstrapTable('hideColumn', 'train_subject_status');     //隐藏需替换的列

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
        layerOpenFn('${showPagePath}','添加基础训练科目','base/train/train_subject_InfoPage',bodyW-100, bodyH);
    }

    //    修改
    function edit() {
        if($('#tb_departments').bootstrapTable('getSelections').length == 1){
            layerOpenFn('${showPagePath}','编辑基础训练科目', 'base/train/train_subject_infoEditPage', bodyW-100, bodyH);
        }else {
            window.top.layerMsg('选择一个');
        }
    }

    //    删除
    function deleteFun() {
        if($('#tb_departments').bootstrapTable('getSelections').length == 1){
            layerConfirm('确认删除？',['确认','取消'],[function () {
                getDataFnNoErrorF(
                    deleteDataPath
                    , {sql:'TrainSubjectInfoMapper.deleteInfo',id:$('#tb_departments').bootstrapTable('getSelections')[0]['id']}
                    , function (data) {
                        if (null != data && data[0] > 0) {
                            window.top.layerMsg2('删除成功');
                            query();
                        }
                    }
                    , function (data) {
                        window.top.layerMsg(data);
                    }
                    , function () {
                        sysErrorAlert;
                    });
                layer.closeAll();
            },function () {

            }]);
        }else {
            window.top.layerMsg('选择一个');
        }
//        sysDeleteFun('TrainSubjectInfoMapper.deleteInfo');
    }

    //    导出
    $('#btn_export').click(function () {
        var mmm = ['状态','科目类型名称','备注','训练人','','科目类型','训练地点'];
        var titleParams = mmm.join(",");
        window.open('${exportPath}'+$('#formSearch').serialize()+'&sql=TrainSubjectInfoMapper.selectInfo&fileName=基础训练科目管理&titleParams='+titleParams);
    });
</script>

</html>
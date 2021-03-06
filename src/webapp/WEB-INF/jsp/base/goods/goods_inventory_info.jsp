<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="zh">
<head>
    <title>物资盘点管理</title>
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
                    <label class="control-label col-sm-1" for="goods_Name">物资名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="goods_Name" name="goods_Name">
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
    var pageDataSql = 'GoodsInventoryInfoMapper.getListByParamsByPage';
    var deleteDataPath = '${deleteDataPath}';

//    gird********************************************************************************************************************************************
    var columns = [
        {
            checkbox: true
        }, {
            field: 'goods_Type_Id',
            title: '物资类型名称'
        }, {
            field: 'goods_Type_Name',
            title: '物资类型名称'
        }, {
            field: 'storage_Room_Id',
            title: '库房名称'
        }, {
            field: 'storage_Room_Name',
            title: '库房名称'
        }, {
            field: 'goods_Id',
            title: '物资名称'
        }, {
            field: 'goods_Name_Show',
            title: '物资名称'
        }, {
            field: 'goods_All_Count',
            title: '物资总数量'
        }, {
            field: 'goods_Use_Count',
            title: '物资领用数量'
        }, {
            field: 'goods_Surplus_Count',
            title: '物资剩余数量'
        }, {
            field: 'goods_inventory_Remark',
            title: '物资盘点备注'
        }, {
            field: 'goods_invebtory_date',
            title: '物资盘点时间',
            formatter: function (value, row, index) {
                var value2 = getLocalTime(value.time);
                return value2;
            }
        }
    ];

    //    执行完成后的回调方法
    function responseHandler(data) {                //加载服务器数据之前的处理程序，可以用来格式化数据。参数：res为从服务器请求到的数据。
        var total;
        var rows;

        if(data['result']['resultMap'][0][pageDataSql][0].length > 0){
            total = data['result']['resultMap'][0][pageDataSql][0][0]['totalResult'];
            rows = data['result']['resultMap'][0][pageDataSql][0];
        }

        return {"total": total, "rows": rows};
    }

    //    请求参数设置
    function queryParams(params) {
        var temp = {                                //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
//            limit: params.limit,                    //页面大小
//            offset: params.offset,                  //页码
//            goods_Name: $("#goods_Name").val(),
            showCount: params.limit,                //此框架分页必须带
            currentPage: (params.limit+params.offset)/params.limit,             //此框架分页必须带
            sql: pageDataSql

        };
        return temp;
    }

    var oTable = new TableInit('${dataPath}', 'toolbar', false, null,columns,true);

    oTable.Init();

    $('#tb_departments').bootstrapTable('hideColumn', 'goods_Status');     //隐藏需替换的列
    $('#tb_departments').bootstrapTable('hideColumn', 'goods_Type_Id');     //隐藏需替换的列
    $('#tb_departments').bootstrapTable('hideColumn', 'goods_Id');          //隐藏需替换的列
    $('#tb_departments').bootstrapTable('hideColumn', 'storage_Room_Id');     //隐藏需替换的列

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
        layerOpenFn('${showPagePath}','添加菜单','base/goods/goods_inventoryinfoPage',bodyW-100, bodyH);
    }

    //    修改
    function edit() {
        if($('#tb_departments').bootstrapTable('getSelections').length == 1){
            layerOpenFn('${showPagePath}','编辑菜单', 'base/goods/goods_inventoryinfoEditPage', bodyW-100, bodyH);
        }else {
            window.top.layerMsg('选择一个');
        }
    }

    //    删除
    function deleteFun() {
        sysDeleteFun('GoodsInventoryInfoMapper.deleteInfo');
    }

    //    导出
    $('#btn_export').click(function () {
        var mmm = ['库房名称','','物资领用数量','物资盘点备注','物资剩余数量','','物资名称','','','物资总数量','物资盘点时间','物资类型名称'];
        var titleParams = mmm.join(",");
        window.open('${exportPath}'+$('#formSearch').serialize()+'&sql=GoodsInventoryInfoMapper.selectInfo&fileName=物资盘点管理&titleParams='+titleParams);
    });
</script>

</html>
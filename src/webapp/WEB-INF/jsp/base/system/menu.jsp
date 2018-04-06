<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9"/>

    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap.css">
    <%--<link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap.css">--%>
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap-theme.css">

    <!--bootstrap-table-->
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap-table/bootstrap-table.min.css">

    <style type="text/css">

    </style>
</head>
<body style="background-color: #ffffff">
<div class="panel-body" style="padding:5px;">
    <%--<div class="panel-body" style="padding-top:5px;padding-right: 5px;padding-left: 5px;padding-bottom: 5px;">--%>
    <div class="panel panel-default">
        <div class="panel-heading">查询条件</div>
        <div class="panel-body">
            <form id="formSearch" class="form-horizontal">
                <div class="form-group" style="margin-top:15px">
                    <label class="control-label col-sm-1" for="meun_Name">菜单名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="meun_Name" name="meun_Name">
                    </div>
                    <div class="col-sm-3" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_query" class="btn btn-primary" onclick="query();">查询</button>
                    </div>
                    <%--<div class="col-sm-3" style="text-align:left;">--%>
                        <%--<button type="button" style="margin-left:50px" id="btn_print" class="btn btn-primary" onclick="window.open('${printPage}');">打印</button>--%>
                    <%--</div>--%>
                    <div class="col-sm-3" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_print2" class="btn btn-primary">打印</button>
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
    var pageDataSql = 'MenuInfoMapper.getListByParamsByPage';
    var deleteDataPath = '${deleteDataPath}';


    <%--var printPage = '${printPage}';--%>

//    gird********************************************************************************************************************************************
    var columns = [
        {
            checkbox: true
        }, {
            field: 'meun_Name',
            title: '菜单名'
        }, {
            field: 'meun_Url',
            title: '菜单路径'
        }, {
            field: 'order_Id',
            title: '排序'
        }, {
            field: 'show_If',
            title: '是否显示'
        }, {
            field: 'XIANSHI',
            title: '是否显示'
        }, {
            field: 'node_If',
            title: '是否节点'
        }, {
            field: 'JIEDIAN',
            title: '是否节点'
        }, {
            field: 'menu_Content',
            title: '菜单图标'
        }, {
            field: 'menu_Remark',
            title: '备注'
        }, {
            field: 'menu_Status',
            title: '状态'
        }, {
            field: 'ZHUANGTAI',
            title: '状态'
        }
    ];

    //    执行完成后的回调方法
    function responseHandler(data) {                //加载服务器数据之前的处理程序，可以用来格式化数据。参数：res为从服务器请求到的数据。
        var total = data['result']['resultMap'][0][pageDataSql][0][0]['totalResult'];
        var rows = data['result']['resultMap'][0][pageDataSql][0];
        return {"total": total, "rows": rows};
    }

    //    请求参数设置
    function queryParams(params) {
        var temp = {                                //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
//            limit: params.limit,                    //页面大小
//            offset: params.offset,                  //页码
//            user_Name: $("#user_Name").val(),
//            user_Sex: $("#user_Sex").val(),
            showCount: params.limit,                //此框架分页必须带
            currentPage: (params.limit+params.offset)/params.limit,             //此框架分页必须带
            sql: pageDataSql,
            meun_Name:$('#meun_Name').val()

        };
        return temp;
    }

    var oTable = new TableInit('${dataPath}', 'toolbar', false, null,columns,true);

    oTable.Init();

    $('#tb_departments').bootstrapTable('hideColumn', 'show_If');
    $('#tb_departments').bootstrapTable('hideColumn', 'node_If');
    $('#tb_departments').bootstrapTable('hideColumn', 'menu_Status');

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

//    添加菜单
    function add() {
        layerOpenFn('${showPagePath}','添加菜单','base/menu/menuPage',bodyW-100, bodyH);
    }

//    修改菜单
    function edit() {
        if($('#tb_departments').bootstrapTable('getSelections').length == 1){
            layerOpenFn('${showPagePath}','编辑菜单', 'base/menu/menuEditPage', bodyW-100, bodyH);
        }else {
            window.top.layerMsg('选择一个');
        }
    }

//    删除菜单
    function deleteFun() {
        sysDeleteFun('MenuInfoMapper.deleteByid');
    }

//    打印
    var printDataParams = new Object();

    $('#btn_print2').click(function () {
        var allData = $('#tb_departments').bootstrapTable('getOptions');
        printDataParams.printData = allData.data;
        printDataParams.printColumns = allData.columns[0];
        window.open('${printPage}?'+'printPage='+'菜单管理');
    });

//    导出
    $('#btn_export').click(function () {
        var mmm = ['父级ID','菜单路径','是否显示','菜单中文名','序号','图标','显示排序','是否节点','菜单描述','是否有效'];
        var titleParams = mmm.join(",");
        window.open('${exportPath}'+$('#formSearch').serialize()+'&sql=MenuInfoMapper.selectInfo&fileName=菜单管理&titleParams='+titleParams);
    });
</script>

</html>
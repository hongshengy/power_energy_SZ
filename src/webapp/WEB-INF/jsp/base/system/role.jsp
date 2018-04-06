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
                    <label class="control-label col-sm-1" for="role_Name">角色名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="role_Name" name="role_Name">
                    </div>
                    <%--<label class="control-label col-sm-1" for="user_Sex">性别</label>--%>
                    <%--<div class="col-sm-3">--%>
                    <%--<input type="text" class="form-control" id="user_Sex" name="user_Sex">--%>
                    <%--</div>--%>
                    <div class="col-sm-2" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_query" class="btn btn-primary" onclick="query(1,10);">查询</button>
                    </div>

                    <div class="col-sm-2" style="text-align:left;">
                        <button type="button" style="margin-left:50px" id="btn_export" class="btn btn-primary">导出数据</button>
                    </div>

                </div>
            </form>
        </div>
    </div>

    <div id="toolbar" class="form-inline">
        <div class="btn-group">
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

        <div class="btn-group" style="padding-left: 30px;">
            <button id="btn_setRole" type="button" class="btn btn-default" onclick="setRole();">
                <span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>配置角色权限
            </button>
        </div>
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
    var getPageData = '${pageDataPath}';
    var deleteDataPath = '${deleteDataPath}';
    var pageDataSql = 'RoleInfoMapper.getListByParamsByPage';

    //    gird********************************************************************************************************************************************
    var columns = [
        {
            checkbox: true
        }, {
            field: 'role_Name',
            title: '角色名'
        }, {
            field: 'role_Content',
            title: '描述'
        }, {
            field: 'role_Creator',
            title: '创建人'
        }, {
            field: 'role_Date',
            title: '创建时间',
            formatter: function (value, row, index) {
                var value2 = getLocalTime(value.time);
                return value2;
            }
        }, {
            field: 'role_Status',
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
            limit: params.limit,                    //页面大小
            offset: params.offset,                  //页码
            role_Name: $("#role_Name").val(),
            showCount: params.limit,                //此框架分页必须带
            currentPage: (params.limit+params.offset)/params.limit,              //此框架分页必须带
            sql: pageDataSql

        };
        return temp;
    }

    var oTable = new TableInit(getPageData, 'toolbar', false, null, columns,true);

    oTable.Init();

    $('#tb_departments').bootstrapTable('hideColumn', 'role_Status');

    //    查询
    function query(page, pageCount) {
        $('#tb_departments').bootstrapTable('refresh');
    }

    //    gird********************************************************************************************************************************************

    $(function () {
        bodyH = $('body').height();
        bodyW = $('body').width();
    });

    //    父子表gird显示参照fatherAndSonGird.jsp

    //    添加用户
    function add() {
        layerOpenFn('${showPagePath}','添加角色', 'base/role/rolePage', bodyW-100, bodyH);
    }

    //    修改菜单
    function edit() {
        if($('#tb_departments').bootstrapTable('getSelections').length == 1){
            layerOpenFn('${showPagePath}','编辑角色', 'base/role/roleEditPage', bodyW-100, bodyH);
        }else {
            window.top.layerMsg('选择一个');
        }
    }

    //    删除菜单
    function deleteFun() {
        sysDeleteFun('RoleInfoMapper.deleteByid');
    }

    function setRole(){
        if($('#tb_departments').bootstrapTable('getSelections').length == 1){
            layerOpenFn('${showPagePath}','设置角色权限', 'base/role/setRolePage', bodyW-100, bodyH);
        }else {
            alert('选择一个');
        }
    }

    //    导出
    $('#btn_export').click(function () {
        var mmm = ['描述','角色名','创建人员','创建时间','id','是否有效'];
        var titleParams = mmm.join(",");
        window.open('${exportPath}'+$('#formSearch').serialize()+'&sql=RoleInfoMapper.selectInfo&fileName=角色管理&titleParams='+titleParams);
    });
</script>
<%--导航--%>
<%--<script type="text/javascript" src="${basePath}/plugins/mainMenu/js/nav.js"></script>--%>

</html>
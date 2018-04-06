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
                    <label class="control-label col-sm-1" for="code_cn">字典中文名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="code_cn" name="code_cn">
                    </div>

                    <label class="control-label col-sm-1" for="code_en">字典英文名</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="code_en" name="code_en">
                    </div>
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
    var deleteDataPath = '${deleteDataPath}';
    var layerO;

    var selectRowData = '';
    //    gird********************************************************************************************************************************************
    var pageDataSql = 'DictionaryInfoMapper.getListByParamsByPage';
    var columns = [
        {
            checkbox: true
        }, {
            field: 'code_en',
            title: '字典英文名'
        }, {
            field: 'code_cn',
            title: '字典中文名'
        }, {
            field: 'code_value',
            title: '字典值'
        }, {
            field: 'code_status',
            title: '字典状态'
        }, {
            field: 'ZHUANGTAI',
            title: '字典状态'
        }, {
            field: 'create_date',
            title: '创建时间',
            formatter: function (value, row, index) {
                var value2 = getLocalTime(value.time);
                return value2;
            }
        }
    ];

    var columnsSon = [
        {
            checkbox: true
        }, {
            field: 'code_en',
            title: '字典英文名'
        }, {
            field: 'code_cn',
            title: '字典中文名'
        }, {
            field: 'code_value',
            title: '字典值'
        }, {
            field: 'code_status',
            title: '字典状态'
        }, {
            field: 'ZHUANGTAI',
            title: '字典状态'
        }, {
            field: 'create_date',
            title: '创建时间',
            formatter: function (value, row, index) {
                var value2 = getLocalTime(value.time);
                return value2;
            }
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
//            organization_Name: $("#organization_Name").val(),
//            organization_Company_Type: $("#organization_Company_Type").val(),
            code_en:$('#code_en').val(),
            code_cn:$('#code_cn').val(),
            parent_id: '0',
            showCount: params.limit,                //此框架分页必须带
            currentPage: (params.limit + params.offset) / params.limit,              //此框架分页必须带
            sql: pageDataSql

        };
        return temp;
    }

    //    查询
    function query(page, pageCount) {
        $('#tb_departments').bootstrapTable('refresh');
    }

    var initSonGirdFun = function uuuu(index, row, $detail) {
        sunGirdInit(index, row, $detail);
    };

    var sunGirdInit = function (index, row, $detail) {
//         var jsonStr = '{\n' +
//             '    "sql": "RoleInfoMapper.selectInfo",\n' +
//             '    "user_Id": "$userId",\n' +
//             '    "children": {\n' +
//             '        "sql": "RoleJurisdictionInfoMapper.selectInfo",\n' +
//             '        "role_Id": "@sql->RoleInfoMapper.selectInfo.id",\n' +
//             '        "$MoreFlg":"one",\n' +
//             '        "children": {\n' +
//             '            "sql": "MenuInfoMapper.selectInfo",\n' +
//             '            "More": "Menu_ids",\n' +
//             '            "$MoreFlg": "more",\n' +
//             '            "Menu_ids": "@sql->RoleJurisdictionInfoMapper.selectInfo"\n' +
//             '        }\n' +
//             '    }\n' +
//             '}';
//         var jsonStr = {"sql":"OrganizationInfoMapper.getListByParams","parent_id":};

        //    父级gird内的选中行的row数据
        var parentid = row.id;
        //    插入行的对象
        var cur_table = $detail.html('<table class="sunTable"></table>').find('table');
        $(cur_table).bootstrapTable({
            url: '${dataPath}',
            method: 'get',
            queryParams: {
                sql: 'DictionaryInfoMapper.getListByParamsForSonTablePro',
                parent_id: parentid
//                 pageRecursionJsonStr: jsonStr
            },
            responseHandler: responseHandlerSon,
            clickToSelect: true,
            detailView: true,//父子表
            uniqueId: "id",
            pageSize: 10,
            pageList: [10, 25],
            columns: columnsSon
        });

        $('.sunTable').bootstrapTable('hideColumn', 'code_status');
    };

    // 子表返回结果集处理
    function responseHandlerSon(data) {
//         console.log(data);
        var rows = data['result']['resultMap'][0]['DictionaryInfoMapper.getListByParamsForSonTablePro'];
        return rows;
    }

    <%--var oTable = new TableInit('${pageDataPath}', 'toolbar', false, null,columns);--%>
    var oTable = new TableInit('${pageDataPath}', 'toolbar', true, initSonGirdFun, columns, true);

    oTable.Init();

    $('#tb_departments').bootstrapTable('hideColumn', 'code_status');

    //    gird********************************************************************************************************************************************

    $(function () {
        bodyH = $('body').height();
        bodyW = $('body').width();
    });

    //    父子表gird显示参照fatherAndSonGird.jsp

    //    添加组织机构
    function add() {
        layerO = layerOpenFn('${showPagePath}', '添加组织机构', 'base/dictionary/dictionaryPage', bodyW - 100, bodyH);
    }

    //    修改组织机构
    function edit() {
        selectRowData = '';

        var parentSelect = $('#tb_departments').bootstrapTable('getSelections');
        var sonSelect = $('.sunTable').bootstrapTable('getSelections');

        if(parentSelect.length == 1 && sonSelect.length == 0){
            selectRowData = parentSelect[0];
        }else if(parentSelect.length == 0 && sonSelect.length == 1){
            selectRowData = sonSelect[0];
        }

        if('' != selectRowData){
            layerOpenFn('${showPagePath}', '修改组织机构', 'base/dictionary/dictionaryEditPage', bodyW - 100, bodyH);
        }else {
            window.top.layerMsg('选择一个');
        }
    }

    //    删除菜单
    function deleteFun() {
        selectRowData = '';

        var parentSelect = $('#tb_departments').bootstrapTable('getSelections');
        var sonSelect = $('.sunTable').bootstrapTable('getSelections');

        if(parentSelect.length == 1 && sonSelect.length == 0){
            selectRowData = parentSelect[0];
        }else if(parentSelect.length == 0 && sonSelect.length == 1){
            selectRowData = sonSelect[0];
        }

        if('' != selectRowData){
            layerConfirm('确认删除？',['确认','取消'],[function () {
                getDataFnNoErrorF(
                    deleteDataPath
                    , {sql:'DictionaryInfoMapper.deleteByid',id:selectRowData['id']}
                    , function (data) {
                        if (null != data && data[0] > 0) {
                            window.top.layerMsg2('删除成功');
                            query(1,10);
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
    }

    //    导出
    $('#btn_export').click(function () {
        var mmm = ['父级ID','字典英文名','字典值','ID','创建时间','是否有效','字典中文名'];
        var titleParams = mmm.join(",");
        window.open('${exportPath}'+$('#formSearch').serialize()+'&sql=DictionaryInfoMapper.selectInfo&fileName=菜单管理&titleParams='+titleParams);
    });
</script>

</html>
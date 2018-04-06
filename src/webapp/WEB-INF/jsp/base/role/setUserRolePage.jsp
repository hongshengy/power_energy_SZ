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

    <%--select2--%>
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2-bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/select2/select2.min.css">

    <!--bootstrap-table-->
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap-table/bootstrap-table.min.css">

    <style type="text/css">

    </style>
</head>
<body style="background-color: #ffffff;">
<div class="panel-body" style="padding-bottom:5px;">

    <div class="row">
        <div class="col-xs-12">
            <table id="tb_departments"></table>
        </div>
    </div>

    <div class="form-horizontal" style="padding-top: 15px;">
        <div class="form-group">
            <div class="col-sm-offset-10  col-sm-2 text-center" style="text-align:left;">
                <button type="button" id="btn_save" class="btn btn-primary">保存</button>
                <button type="button" id="btn_cancel" class="btn btn-primary">取消</button>
            </div>
        </div>
    </div>

</div>

</body>

<%--jquery--%>
<script type="text/javascript" src="${basePath}/plugins/jquery/jquery-1.8.3.js"></script>

<%--tools--%>
<script type="text/javascript" src="${basePath}/plugins/tools/tools.js"></script>

<%--select2--%>
<script type="text/javascript" src="${basePath}/plugins/select2/select2.js"></script>

<!--bootstrap-table-->
<script type="text/javascript" src="${basePath}/plugins/bootstrap-table/bootstrap-table.min.js"></script>

<!--bootstrap-table-->
<script type="text/javascript" src="${basePath}/plugins/bootstrap-table/bootstrap-table-zh-CN.min.js"></script>

<script type="text/javascript">
    //    调用后台sql接口
    var dataPath = '${dataPath}';
    var getPageData = '${pageDataPath}';
    var deleteDataPath = '${deleteDataPath}';
    var insertDataPath = '${insertDataPath}';
    var pageDataSql = 'RoleInfoMapper.selectInfo';

    //    页面中心高度
    $('#showPanel').height(window.parent.$('body').height() - 200);

    //    gird********************************************************************************************************************************************
    var columns = [
        {
            radio: true
        }, {
            field: 'role_Name',
            title: '角色名'
        }, {
            field: 'role_Content',
            title: '角色说明'
        }, {
            field: 'role_Creator',
            title: '创建者'
        }, {
            field: 'role_Date',
            title: '创建时间',
            formatter:function(value, row, index){
                return getLocalTime(value.time);
            }
        }, {
            field: 'role_Status',
            title: '状态',
            formatter:function(value, row, index){
                var returnData;
                if(value == 'Y'){
                    returnData = '有效';
                }else{
                    returnData = '无效';
                }
                return returnData;
            }
        }
    ];

    //    执行完成后的回调方法
    function responseHandler(data) {                //加载服务器数据之前的处理程序，可以用来格式化数据。参数：res为从服务器请求到的数据。
        var rows = data['result']['resultMap'][0][pageDataSql];
        return rows;
    }

    //    请求参数设置
    function queryParams(params) {
        var temp = {                                //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
//            limit: params.limit,                    //页面大小
//            offset: params.offset,                  //页码
//            user_Name: $("#user_Name").val(),
//            user_Sex: $("#user_Sex").val(),
//            showCount: params.limit,                //此框架分页必须带
//            currentPage: params.offset,             //此框架分页必须带
            sql: pageDataSql

        };
        return temp;
    }

    //    加载完成后的调用方法
    function onLoadSuccess() {                  //加载完成后的调用方法(页面已经全部加载完成)
//        var tableDataList = $('#tb_departments').bootstrapTable('getData');
        getDataFnNoErrorF(
            dataPath,
            {sql: 'UserJurisdictionInfoMapper.selectInfo', user_Id: parent.$('#tb_departments').bootstrapTable('getSelections')[0]['id']},
            function (data) {
                debugger;
                var forData = data[0]['UserJurisdictionInfoMapper.selectInfo'];
                var roleMenuArray = new Array();

                for (dataIndex = 0; dataIndex < forData.length; dataIndex++) {
                    roleMenuArray.push(forData[dataIndex]['role_Id']);
                }

                $('#tb_departments').bootstrapTable('checkBy', {field: "id", values: roleMenuArray});   //设置默认选中

            },
            function (data) {
                console.log(data);
            },
            function () {
                console.log('error');
            }
        );

    }

    var oTable = new TableInitNoTotal(getPageData, null, false, null, columns);

    oTable.Init();

    //    gird********************************************************************************************************************************************

    //    取消按钮
    $('#btn_cancel').click(function () {
        parent.layer.closeAll();
    });
    //    取消按钮

    //    确定按钮
    $('#btn_save').click(function () {
        var role_Ids = '';

        var parentRoleId = parent.$('#tb_departments').bootstrapTable('getSelections')[0]['id'];
        var menuList = $('#tb_departments').bootstrapTable('getSelections');

        for(var i=0;i<menuList.length;i++){
            menuList[i]['user_Id'] = parentRoleId;
        }
debugger;
        getDataFnNoErrorF(

            deleteDataPath
            , {sql:'UserJurisdictionInfoMapper.deleteForeach',$MoreFlg:'more',More:'user_Ids',user_Ids:'JSONStr',JSONStr:'[{"id":"'+parentRoleId+'"}]'}   //是否是foreach,多个需要使用foreach的参数,参数值
//            , {sql:'RoleJurisdictionInfoMapper.deleteForeach',$MoreFlg:'more',More:'role_Ids',role_Ids:'1,2'}   //是否是foreach,多个需要使用foreach的参数,参数值
            , function (data) {
                debugger;
//                if (data != 0) {
//                    parent.query();
//                    parent.layer.closeAll();
                    debugger;
                    getDataFnNoErrorF(
                        insertDataPath
                        ,{sql:'UserJurisdictionInfoMapper.insertInfoForForeache',$MoreFlg:'more',More:'role_Info',role_Info:'JSONStr',JSONStr:JSON.stringify(menuList)}
                        ,function (data) {
                            parent.layer.closeAll();
                        }
                        ,function (data) {
                            alert('error');

                        }
                        ,function () {
                            alert('error');
                        }
                    );
//                }
            }
            , function (data) {
                alert(data);
            }
            , function () {
                alert('error');
            });

    });
    //    确定按钮


    $(function () {

    });


</script>

<script type="text/javascript">

</script>

</html>
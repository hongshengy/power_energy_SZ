$(function(){
    //$('#formSearch').find('.form-group').append('<div class="col-sm-1" style="text-align:left;"><button type="button" style="margin-left:50px" id="btn_export" class="btn btn-primary">导出数据</button></div>');
})

// —————————————————————————————————————————————————————————————————————————————————————getDataFnNoErrorF————————————————————————————————————————————————————————————————————————————————————————
// {sql:'RoleJurisdictionInfoMapper.deleteForeach2222',$MoreFlg:'more',More:'role_Ids',role_Ids:'1,2'}   //是否是foreach,多个需要使用foreach的参数,参数值
//
// <if test="$MoreFlg == 'more">
//     <foreach collection="role_Ids" item="item" open="role_Id in(" close=")" separator=",">
//         #{item}
//     </foreach>
// </if>
//
// {sql:'RoleJurisdictionInfoMapper.deleteForeach2222',$MoreFlg:'more',More:'role_Ids',role_Ids:'JSONStr',JSONStr:'[{"id":"1","bbb":"333"},{"id":"2","bbb":"444"}]'}   //是否是foreach,多个需要使用foreach的参数,参数值为json
//
// <if test='$MoreFlg == "more"'>
//     <foreach collection="role_Ids" item="item" open="role_Id in(" close=")" separator=",">
//         #{item.id}
//     </foreach>
// </if>
//

//ajax请求封装(无错误处理)
function getDataFnNoErrorF(dataUrl, dataparams, successfun, sysErrorFun, aErrorFun) {
    $.ajax({
        url: dataUrl,
        type: "POST",
        data: dataparams,
        dataType: "JSON",
        cache: false,
        async: false,
        success: function (data) {
            // console.log(data);
            // debugger;
            if (data.result.code) {
                successfun(data.result.resultMap);
            } else {
                sysErrorFun(data.result);
            }
        },
        error: function () {
            aErrorFun();
        }

    });
}

// getDataFnNoErrorF(
//     dataPath
//     , {}
//     , function(data){
//
//     }
//     , function(data){
//
//     }
//     , function(){
//
//     });

// 调用参考,要做支持JSON,完成后能封装成List<Map>
// let pp99898 = [1,2,3];
//                            测试
// let mmmmmm = '[\n' +
//     '{ "name":"菜鸟教程" , "url":"www.runoob.com" }, \n' +
//     '{ "name":"google" , "url":"www.google.com" }, \n' +
//     '{ "name":"微博" , "url":"www.weibo.com" }\n' +
//     ']';
//                            测试
// 传递一维array{More:'Menu_ids,oioio',jsonArrayStr:'mmmmmm',mmmmmm:mmmmmm,sql: 'MenuInfoMapper.selectInfo', MenuInfo_id: 'more',Menu_ids:pppp,oioio:pp99898}
// Mapper文件#{item.meun_Id}为解析JSON对象用,普通array直接用#{item}获取

// 多sql嵌套查询
// //        测试
// var jsonStr = '{\n' +
//     '    "sql": "RoleInfoMapper.selectInfo",\n' +
//     '    "user_Id": "$userId",\n' +
//     '    "children": {\n' +
//     '        "sql": "RoleJurisdictionInfoMapper.selectInfo",\n' +
//     '        "role_Id": "@sql->RoleInfoMapper.selectInfo.id",\n' +
//     '        "$MoreFlg":"one",\n' +
//     '        "children": {\n' +
//     '            "sql": "MenuInfoMapper.selectInfo",\n' +
//     '            "More": "Menu_ids",\n' +
//     '            "$MoreFlg": "more",\n' +
//     '            "Menu_ids": "@sql->RoleJurisdictionInfoMapper.selectInfo"\n' +
//     '        }\n' +
//     '    }\n' +
//     '}';
//
// debugger;
// getDataFnNoErrorF(
//     dataPath
//     ,{sql:'$recursion',pageRecursionJsonStr:jsonStr}
//     ,function (data) {
//         console.log('************************************');
//         console.log(data);
//     }
//     ,function (data) {
//         console.log('服务器错误');
//         console.log(data);
//     },function () {
//         console.log('error');
//     }
// );
// //        测试

// getDataFnNoErrorF(
//     dataPath
//     ,{sql: '**Mapper.**', user_Id: '$userId'}
//     ,function (data) {
//         //单条返回值
//         var roleInfo = data[0]['**Mapper.**'][0];
//         if(mylove_IsEmpty(roleInfo.id)){
//              dosomeThing();
//         }
//     }
//     ,function (data) {
//         console.log(data);
//     }
//     ,function () {
//         console.log('error');
//     }
// );

// —————————————————————————————————————————————————————————————————————————————————————getDataFnNoErrorF————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————mylove_IsEmpty———————————————————————————————————————————————————————————————————————————————————————————

function mylove_IsEmpty(varStr) {
    return null != varStr && '' != varStr && undefined != varStr && 'null' != varStr && 'undefined' != varStr;
}

// 调用参考
//mylove_IsEmpty('yeezy350V2');

// —————————————————————————————————————————————————————————————————————————————————————mylove_IsEmpty———————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————TableInit————————————————————————————————————————————————————————————————————————————————————————————————

// gird封装方法
// 参数(请求后台url,gird的ID,是否显示父子表!boolean,子表gird的注册方法,不显示就传入null,gird的映射数组)
var TableInit = function (url,domId,detailView,onExpandRow,columns,pageFlg) {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: url,                //请求后台的URL（*）
            method: 'get',                     //请求方式（*）
            toolbar: '#'+domId,                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: pageFlg,                   //是否显示分页（*）
            sortable: false,                    //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                      //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList:[10, 25],             //可供选择的每页的行数（*）
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,                 //设置为 true启用 全匹配搜索，否则为模糊搜索(仅当前gird内检索)
            // smartDisplay: false,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 10,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: detailView,                  //是否显示父子表
            responseHandler:responseHandler,//加载服务器数据之前的处理程序，可以用来格式化数据。参数：res为从服务器请求到的数据。
            columns: columns,
            undefinedText:'-'
            ,//注册加载子表的事件。注意下这里的三个参数！
            onExpandRow:onExpandRow
            // onExpandRow: function (index, row, $detail) {
            //     xxxx(index, row, $detail);
            // }
        });
    };
    return oTableInit;
};

// 前端封装分页的数据格式为{total:'',rows:'[{}]'}
//*************************************纯父表*************************************

// 调用参考
// var columns = [
//     {
//         checkbox: true
//     }, {
//         field: 'user_Name',
//         title: '用户名'
//     }, {
//         field: 'user_Real_Name',
//         title: '真是姓名'
//     }, {
//         field: 'user_Sex',
//         title: '性别'
//     }, {
//         field: 'user_Age',
//         title: '年龄'
//     }, {
//         field: 'user_Phone',
//         title: '联系方式'
//     }, {
//         field: 'user_Organization_Id',
//         title: '组织机构'
//     }, {
//         field: 'user_Type',
//         title: '类型'
//     }, {
//         field: 'user_Company',
//         title: '所属单位'
//     }, {
//         field: 'user_Content',
//         title: '个人说明'
//     }, {
//         field: 'user_Remark',
//         title: '备注'
//     }
// ];
//
// //    执行完成后的回调方法
// function responseHandler(data) {                //加载服务器数据之前的处理程序，可以用来格式化数据。参数：res为从服务器请求到的数据。
//     let total = data['result']['resultMap'][0]['UserInfoMapper.getListByParamsByPage'][0][0]['totalResult'];
//     let rows = data['result']['resultMap'][0]['UserInfoMapper.getListByParamsByPage'][0];
//     return {"total": total, "rows": rows};
// }
//
// //    请求参数设置
// function queryParams(params) {
//     var temp = {                                //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
//         limit: params.limit,                    //页面大小
//         offset: params.offset,                  //页码
//         user_Name: $("#user_Name").val(),
//         user_Sex: $("#user_Sex").val(),
//         showCount: params.limit,                //此框架分页必须带
//         currentPage: params.offset,             //此框架分页必须带
//         sql: 'UserInfoMapper.getListByParamsByPage'
//
//     };
//     return temp;
// }
//
// var oTable = new TableInit('/system/getPageData', 'toolbar', false, null,columns);
//
// oTable.Init();
//
// //    查询
// function query(page, pageCount) {
//     $('#tb_departments').bootstrapTable('refresh');
// }
//*************************************纯父表*************************************


//*************************************父子表*************************************
// var columns = [
//     {
//         checkbox: true
//     }, {
//         field: 'user_Name',
//         title: '用户名'
//     }, {
//         field: 'user_Real_Name',
//         title: '真是姓名'
//     }, {
//         field: 'user_Sex',
//         title: '性别'
//     }, {
//         field: 'user_Age',
//         title: '年龄'
//     }, {
//         field: 'user_Phone',
//         title: '联系方式'
//     }, {
//         field: 'user_Organization_Id',
//         title: '组织机构'
//     }, {
//         field: 'user_Type',
//         title: '类型'
//     }, {
//         field: 'user_Company',
//         title: '所属单位'
//     }, {
//         field: 'user_Content',
//         title: '个人说明'
//     }, {
//         field: 'user_Remark',
//         title: '备注'
//     }
// ];
//
// var columnsSon = [
//     {
//         checkbox: true
//     }, {
//         field: 'meun_Name',
//         title: '菜单名'
//     }, {
//         field: 'meun_Url',
//         title: '菜单url'
//     }, {
//         field: 'order_Id',
//         title: '排序'
//     }, {
//         field: 'show_If',
//         title: '是否显示'
//     }, {
//         field: 'node_If',
//         title: '是否菜单'
//     }, {
//         field: 'menu_Content',
//         title: '菜单描述'
//     }, {
//         field: 'menu_Remark',
//         title: '备注'
//     }, {
//         field: 'menu_Status',
//         title: '状态1:有效 2:无效'
//     }
// ];
//
// //    执行完成后的回调方法
// function responseHandler(data) {                //加载服务器数据之前的处理程序，可以用来格式化数据。参数：res为从服务器请求到的数据。
//     let total = data['result']['resultMap'][0]['UserInfoMapper.getListByParamsByPage'][0][0]['totalResult'];
//     let rows = data['result']['resultMap'][0]['UserInfoMapper.getListByParamsByPage'][0];
//     return {"total": total, "rows": rows};
// }
//
// //    请求参数设置
// function queryParams(params) {
//     var temp = {                                //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
//         limit: params.limit,                    //页面大小
//         offset: params.offset,                  //页码
//         user_Name: $("#user_Name").val(),
//         user_Sex: $("#user_Sex").val(),
//         showCount: params.limit,                //此框架分页必须带
//         currentPage: params.offset,             //此框架分页必须带
//         sql: 'UserInfoMapper.getListByParamsByPage'
//
//     };
//     return temp;
// }
//
// var oTable = new TableInit('/system/getPageData', 'toolbar', true, initSonGirdFun);
//
// oTable.Init();
// //    父gird************************************************************
//
// //    查询
// function query(page, pageCount) {
//     $('#tb_departments').bootstrapTable('refresh');
// }
//
// //    子gird************************************************************
// //初始化子表格(可以无线循环)
// var initSonGirdFun = function uuuu(index, row, $detail) {
//     sunGirdInit(index, row, $detail);
// };
//
// var sunGirdInit = function (index, row, $detail) {
//     var jsonStr = '{\n' +
//         '    "sql": "RoleInfoMapper.selectInfo",\n' +
//         '    "user_Id": "$userId",\n' +
//         '    "children": {\n' +
//         '        "sql": "RoleJurisdictionInfoMapper.selectInfo",\n' +
//         '        "role_Id": "@sql->RoleInfoMapper.selectInfo.id",\n' +
//         '        "$MoreFlg":"one",\n' +
//         '        "children": {\n' +
//         '            "sql": "MenuInfoMapper.selectInfo",\n' +
//         '            "More": "Menu_ids",\n' +
//         '            "$MoreFlg": "more",\n' +
//         '            "Menu_ids": "@sql->RoleJurisdictionInfoMapper.selectInfo"\n' +
//         '        }\n' +
//         '    }\n' +
//         '}';
//
// //    父级gird内的选中行的row数据
//     var parentid = row.MENU_ID;
// //    插入行的对象
//     var cur_table = $detail.html('<table></table>').find('table');
//     $(cur_table).bootstrapTable({
//         url: '/system/getPageData',
//         method: 'get',
//         queryParams: {
//             sql: '$recursion',
//             pageRecursionJsonStr: jsonStr
//         },
//         responseHandler: responseHandlerSon,
//         clickToSelect: true,
//         detailView: true,//父子表
//         uniqueId: "id",
//         pageSize: 10,
//         pageList: [10, 25],
//         columns: columnsSon
//     });
// };
//
// // 子表返回结果集处理
// function responseHandlerSon(data) {
//     let rows = data['result']['resultMap'][0]['RoleJurisdictionInfoMapper.selectInfo']['result']['resultMap'][0]['RoleJurisdictionInfoMapper.selectInfo'];
//     return rows;
// }
//*************************************父子表*************************************

// —————————————————————————————————————————————————————————————————————————————————————TableInit————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————TableInitNoTotal—————————————————————————————————————————————————————————————————————————————————————————

// 不分页的表格封装方法
var TableInitNoTotal = function (url,domId,detailView,onExpandRow,columns) {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: url,                //请求后台的URL（*）
            method: 'get',                     //请求方式（*）
            toolbar: '#'+domId,                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            sortable: false,                    //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: queryParams,//传递参数（*）
            pageNumber: 1,                      //初始化加载第一页，默认第一页
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,                 //设置为 true启用 全匹配搜索，否则为模糊搜索(仅当前gird内检索)
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: detailView,                  //是否显示父子表
            responseHandler:responseHandler,//加载服务器数据之前的处理程序，可以用来格式化数据。参数：res为从服务器请求到的数据。
            columns: columns,
            onLoadSuccess:onLoadSuccess,
            undefinedText:'-'
            ,//注册加载子表的事件。注意下这里的三个参数！
            onExpandRow:onExpandRow
            // onExpandRow: function (index, row, $detail) {
            //     xxxx(index, row, $detail);
            // }
        });
    };
    return oTableInit;
};



// —————————————————————————————————————————————————————————————————————————————————————TableInitNoTotal—————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————layerOpenFn————————————————————————————————————————————————————————————————————————————————————————————————

// 封装layer
function layerOpenFn(basePath,title, path, width, height) {
    layer.open({
        type: 2,
        area: [width + 'px', height + 'px'],
        fixed: false,
        maxmin: true,
        title: title,
        content: basePath + path
    });
}

// 调用参考
// 打开弹出层(面板名称,页面资源地址,面板宽度,面板高度);
//     layerOpenFn('添加用户','base/user/userPage',1200,600);

// —————————————————————————————————————————————————————————————————————————————————————layerOpenFn————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————appendSelect2————————————————————————————————————————————————————————————————————————————————————————————————

// 封装select2下拉框
function appendSelect2(id,data,width) {
    $('#' + id).select2({
        placeholder: "请选择"
        , width: width + 'px'
        , data: data
    });
}

// 调用参考
// 加载下拉框(控件ID,数据,控件宽带)

// var data = [{ id: '男', text: '男' }, { id: '女', text: '女' }];
//     appendSelect2('user_Sex',data,200);

// 获取数据
// $('#user_Sex').on("change", function (){
//     console.log($('#user_Sex').select2('data'));
//     console.log($('#user_Sex').select2('val'));
// });
// —————————————————————————————————————————————————————————————————————————————————————appendSelect2————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————时间戳转换————————————————————————————————————————————————————————————————————————————————————————————————

//时间戳转换
function getLocalTime(ns) {
    var date = new Date(ns);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}

//时间戳转换
function getLocalTimeOutS(ns) {
    var date = new Date(ns);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + '';
    return Y+M+D+h+m;
}

//时间转换YYYY-MM-DD
function getLocalDate(ns) {
    var date = new Date(ns);//如果date为10位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    return Y+M+D;
}

//时间计算
//params1:unix毫秒时间戳
//params2:add=>增加	sub=>减少
//params3:待处理天数
//return:YYYY-MM-DD格式的日期
function dateCalculation(inputUnix,CalType,CalNumDay){
    var returnData;
    if(CalType == 'add'){
        returnData = inputUnix+(CalNumDay*24*60*60*1000);
    }else if(CalType == 'sub'){
        returnData = inputUnix-(CalNumDay*24*60*60*1000);
    }

    return getLocalDate(returnData);
}

// —————————————————————————————————————————————————————————————————————————————————————时间戳转换————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————dateToolsInit————————————————————————————————————————————————————————————————————————————————————————————————

// 时间控件初始化
function dateToolsInit() {
    $.datepicker.regional['zh-CN'] = {
        changeMonth: true,
        changeYear: true,
        clearText: '清除',
        clearStatus: '清除已选日期',
        closeText: '关闭',
        closeStatus: '不改变当前选择',
        prevText: '<上月',
        prevStatus: '显示上月',
        prevBigText: '<<',
        prevBigStatus: '显示上一年',
        nextText: '下月>',
        nextStatus: '显示下月',
        nextBigText: '>>',
        nextBigStatus: '显示下一年',
        currentText: '今天',
        currentStatus: '显示本月',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthStatus: '选择月份',
        yearStatus: '选择年份',
        weekHeader: '周',
        weekStatus: '年内周次',
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dayStatus: '设置 DD 为一周起始',
        dateStatus: '选择 m月 d日, DD',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        initStatus: '请选择日期',
        isRTL: false
    };

    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
}

// $("#dog_Service_StartTime").prop("readonly", true).datepicker({
//     //showSecond: false,
//     //timeFormat: 'HH:mm',
//
//     dateFormat: 'yyyy-mm-dd'
// });

// —————————————————————————————————————————————————————————————————————————————————————dateToolsInit————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————uploadInit———————————————————————————————————————————————————————————————————————————————————————————————————
// 上传附件
function uploadInit(swfpath,uploader,onUploadSuccess,btncontext) {
    $('#file_upload').uploadify(
        {
            'swf': swfpath,
            // 'swf': '${basePath}/plugins/uploadify/uploadify.swf',
            'uploader': uploader,
            // 'uploader': '${uploadPath}',
            'buttonCursor': 'hand',
            'buttonText': btncontext,
            'buttonClass': '',
            'method': 'post',
            'queueID': 'fileQueue',
            'progressData': 'percentage',
            'auto': false,
            'multi': true,
            'fileTypeDesc': '',
            'fileTypeExts': '',
            'queueSizeLimit': 3,
            'fileSizeLimit': '100000KB',
            //'formData': {},
            //'formData': {},
//            'formData': {cmd: '$sql/system/logs/insert_logs', USER_NAME: "$principal", IP_ADDRESS: "$ip", OPTYPE: "JCGJLX", OPERATOR_TYPE: "SC", pathParam:'filepath', thumbPathParam:'thumbpath'},
            'removeCompleted': true,
            'removeTimeout': 3,
            'uploadLimit': 999,
            'width': 100,
            'height': 20,
            'fileObjName': 'file',
            'itemTemplate': '',
            'onCancel': function (file) {
                $('#updBtn').hide();
//                $('.btn-info').hide();
            },
            'onSelect': function (file) {
                $('#updBtn').show();
                fexSelectFlg = true;
//                $('.btn-info').show();
            },
            'onSelectError': function (file, errorCode, errorMsg) {
                $('#updBtn').hide();
                switch (errorCode) {
                    //QUEUE_LIMIT_EXCEEDED
                    case -100:
                        break;
                    //FILE_EXCEEDS_SIZE_LIMIT
                    case -110:
                        break;
                    //ZERO_BYTE_FILE
                    case -120:
                        break;
                    //INVALID_FILETYPE
                    case -130:
                        break;
                }
            },
            'onUploadStart': function (file) {
                $('#updBtn').hide();
                /*file.name;file.size;file.type*/
//                    $('#file_upload').uploadify('settings', 'formData', {id: "$uuid", filename: file.name, filesize: file.size, filetype: file.type, time: "$date"})
            },
            'onUploadProgress': function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
            },
            'onUploadSuccess': function (file, data, response) {
                onUploadSuccess(file,data,response);

            },
            'onUploadError': function (file, errorCode, errorMsg, errorString) {
                $('#updBtn').hide();
                alert("errorCode:" + errorCode + "," + "errorMsg:" + errorMsg + "," + "errorString:" + errorString);
                //$('.btn-info').hide();
            },
            'onUploadComplete': function (file) {
            },
            'onQueueComplete': function (queueData) {
            }
        });
}
// —————————————————————————————————————————————————————————————————————————————————————uploadInit———————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————sysErrorAlert————————————————————————————————————————————————————————————————————————————————————————————————
// 通用错误处理函数
var sysErrorAlert = function () {
    window.top.layerMsg('系统错误，请联系管理员');
}
// —————————————————————————————————————————————————————————————————————————————————————sysErrorAlert————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————layerConfirm—————————————————————————————————————————————————————————————————————————————————————————————————
//询问框
var layerConfirm = function (content,btnGroupList,funList) {

    layer.confirm(content, {
        btn: btnGroupList //按钮
    }
    ,funList[0]
    ,funList[1]
    );
}
// —————————————————————————————————————————————————————————————————————————————————————layerConfirm—————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————submitHandlerFn——————————————————————————————————————————————————————————————————————————————————————————————
// 封装表单验证通过的方法(参数为回掉function)
var submitHandlerFn = function (submitHandler) {
    $.validator.setDefaults({
        submitHandler: submitHandler()
    });
}
// —————————————————————————————————————————————————————————————————————————————————————submitHandlerFn——————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————initWinHeight————————————————————————————————————————————————————————————————————————————————————————————————
// 获取窗体的高度
var initWinHeight = function () {
    var returnDataObj = new Object();

    if (window.innerWidth)
        returnDataObj.winWidthR = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        returnDataObj.winWidthR = document.body.clientWidth;

    if (window.innerHeight)
        returnDataObj.winHeightR = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        returnDataObj.winHeightR = document.body.clientHeight;
    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        returnDataObj.winHeightR = document.documentElement.clientHeight;
        returnDataObj.winWidthR = document.documentElement.clientWidth;
    }
    return returnDataObj;
};
// —————————————————————————————————————————————————————————————————————————————————————initWinHeight————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————initBodyHeight———————————————————————————————————————————————————————————————————————————————————————————————
// 获取窗体的高度
var initBodyHeight = function () {
    var returnDataObj = new Object();

    var jjH;
    var jjW;

    if (window.innerWidth)
        jjW = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        jjW = document.body.clientWidth;

    if (window.innerHeight)
        jjH = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        jjH = document.body.clientHeight;
    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        jjH = document.documentElement.clientHeight;
        jjW = document.documentElement.clientWidth;
    }

    var bbH;
    var bbW;

    bbH = document.body.scrollHeight;
    bbW = document.body.scrollWidth;

    if(bbH < jjH){
        returnDataObj.winHeightR = jjH;
    }else {
        returnDataObj.winHeightR = bbH + 50;
    }
    // returnDataObj.winHeightR = document.body.scrollHeight;
    // returnDataObj.winWidthR = document.body.scrollWidth;

    return returnDataObj;
};
// —————————————————————————————————————————————————————————————————————————————————————initBodyHeight———————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————sysDeleteFun—————————————————————————————————————————————————————————————————————————————————————————————————
// 系统通用删除方法(限单条)
function sysDeleteFun(mapper) {
    if($('#tb_departments').bootstrapTable('getSelections').length == 1){
        layerConfirm('确认删除？',['确认','取消'],[function () {
            getDataFnNoErrorF(
                deleteDataPath
                , {sql:mapper,id:$('#tb_departments').bootstrapTable('getSelections')[0]['id']}
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
// —————————————————————————————————————————————————————————————————————————————————————sysDeleteFun—————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————queryDictionaryByParentCodeEn————————————————————————————————————————————————————————————————————————————————
// 按照父级英文标识查找所有子数据字典的内容
var queryDictionaryByParentCodeEn = function (url,code_en) {

    var returnData = '';

    getDataFnNoErrorF(
        url
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:code_en}
        , function (data) {
            if (null != data) {
                returnData = data[0]['DictionaryInfoMapper.getChildInfo'];
            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————queryDictionaryByParentCodeEn————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————getSex———————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取性别字典下拉框
var getSex = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:'INPUT_SEX'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DictionaryInfoMapper.getChildInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['code_value'];
                    appendRow.text = resultData[i]['code_cn'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getSex———————————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————getOrg———————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取组织机构下拉框
var getOrg = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'OrganizationInfoMapper.getListByParams'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['OrganizationInfoMapper.getListByParams'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['id'];
                    appendRow.text = resultData[i]['organization_Name'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getOrg———————————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————getUtp———————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取用户类型下拉框
var getUtp = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'RoleInfoMapper.selectInfo'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['RoleInfoMapper.selectInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['id'];
                    appendRow.text = resultData[i]['role_Name'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getUtp———————————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————getShowif————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取是否显示字典下拉框
var getShowif = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:'SHIFOUXIANSHI'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DictionaryInfoMapper.getChildInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['code_value'];
                    appendRow.text = resultData[i]['code_cn'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getShowif————————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————getNoteif————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取是否节点字典下拉框
var getNoteif = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:'SHIFOUJIEDIAN'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DictionaryInfoMapper.getChildInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['code_value'];
                    appendRow.text = resultData[i]['code_cn'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getNoteif————————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————getStutif————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取是否有效字典下拉框
var getStutif = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:'ZHUANGTAI'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DictionaryInfoMapper.getChildInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['code_value'];
                    appendRow.text = resultData[i]['code_cn'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getStutif————————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————getDwlx——————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取是否单位类型字典下拉框
var getDwlx = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:'DWLX'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DictionaryInfoMapper.getChildInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['code_value'];
                    appendRow.text = resultData[i]['code_cn'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getDwlx——————————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————getGti———————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取物资类型下拉框
var getGti = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'GoodsTypeMapper.selectInfo',goods_Type_Status:'Y'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                if(data[0]['GoodsTypeMapper.selectInfo'].length > 0){
                    var resultData = data[0]['GoodsTypeMapper.selectInfo'];
                    for(var i = 0; i < resultData.length; i++){
                        var appendRow = new Object();
                        appendRow.id = resultData[i]['id'];
                        appendRow.text = resultData[i]['goods_Type_Name'];
                        returnData.push(appendRow);
                    }
                }
            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getGti———————————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————getSri———————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取库房类型下拉框
var getSri = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'GoodsStorageroomInfoMapper.selectInfo',storage_Room_Type_Status:'Y'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                if(data[0]['GoodsStorageroomInfoMapper.selectInfo'].length > 0){
                    var resultData = data[0]['GoodsStorageroomInfoMapper.selectInfo'];
                    for(var i = 0; i < resultData.length; i++){
                        var appendRow = new Object();
                        appendRow.id = resultData[i]['id'];
                        appendRow.text = resultData[i]['storage_Room_Name'];
                        returnData.push(appendRow);
                    }
                }
            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getGti———————————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————getGi————————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取物资下拉框
var getGi = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'GoodsInfoMapper.selectInfo',goods_Status:'Y'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                if(data[0]['GoodsInfoMapper.selectInfo'].length > 0){
                    var resultData = data[0]['GoodsInfoMapper.selectInfo'];
                    for(var i = 0; i < resultData.length; i++){
                        var appendRow = new Object();
                        appendRow.id = resultData[i]['id'];
                        appendRow.text = resultData[i]['goods_Name'];
                        returnData.push(appendRow);
                    }
                }
            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getGi————————————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————getFyl———————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取防疫类型字典下拉框
var getFyl = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:'FANGYILEIXING'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DictionaryInfoMapper.getChildInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['code_value'];
                    appendRow.text = resultData[i]['code_cn'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getFyl———————————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————getHil———————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取有无病历字典下拉框
var getHil = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:'ILL'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DictionaryInfoMapper.getChildInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['code_value'];
                    appendRow.text = resultData[i]['code_cn'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getHil———————————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————getEpi———————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取疫病种类字典下拉框
var getEpi = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:'EPIDEMIC_TP'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DictionaryInfoMapper.getChildInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['code_value'];
                    appendRow.text = resultData[i]['code_cn'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getEpi———————————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————getEpa———————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取疫病名称字典下拉框
var getEpa = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:'EPIDEMIC_NA'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DictionaryInfoMapper.getChildInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['code_value'];
                    appendRow.text = resultData[i]['code_cn'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getEpa———————————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————getEpaD——————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取疫病名称字典下拉框(来自疫病防治库)
var getEpaD = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'EpidemicPreventionInfoMapper.selectInfo'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['EpidemicPreventionInfoMapper.selectInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['id'];
                    appendRow.text = resultData[i]['epidemic_Name'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getEpaD——————————————————————————————————————————————————————————————————————————————————————————————————————




// —————————————————————————————————————————————————————————————————————————————————————getDog———————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取狗下拉框
var getDog = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DogInfoMapper.selectInfo'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DogInfoMapper.selectInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['id'];
                    appendRow.text = resultData[i]['dog_Name'];
                    appendRow.resultData = resultData[i];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getDog———————————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————getModel———————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取狗下拉框
var getModel = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'EvaluationModelInfoMapper.selectInfo'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['EvaluationModelInfoMapper.selectInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['id'];
                    appendRow.text = resultData[i]['model_Name'];
                    appendRow.resultData = resultData[i];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getModel———————————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————getHosp——————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取医院下拉框
var getHosp = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'EpidemicZooHospitalMapper.selectInfo'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['EpidemicZooHospitalMapper.selectInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['id'];
                    appendRow.text = resultData[i]['hospital_Name'];
                    appendRow.resultData = resultData[i];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getHosp——————————————————————————————————————————————————————————————————————————————————————————————————————

// —————————————————————————————————————————————————————————————————————————————————————getTtp—————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取训练类型下拉框
var getTtp = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:'TRAINTP'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DictionaryInfoMapper.getChildInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['code_value'];
                    appendRow.text = resultData[i]['code_cn'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getTtp—————————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————getTsu—————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取训练类型下拉框
var getTsu = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'TrainSubjectInfoMapper.selectInfo',train_subject_status:'Y'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['TrainSubjectInfoMapper.selectInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['id'];
                    appendRow.text = resultData[i]['train_subject_Name'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getTsu—————————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————getSup—————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取训导员下拉框
var getSup = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'SupervisorInfoMapper.selectInfo',train_subject_status:'Y'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['SupervisorInfoMapper.selectInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['id'];
                    appendRow.text = resultData[i]['supervisor_Name'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getSup—————————————————————————————————————————————————————————————————————————————————————————————————————


// —————————————————————————————————————————————————————————————————————————————————————getUNtp—————————————————————————————————————————————————————————————————————————————————————————————————————
// 获取训导员下拉框
var getUNtp = function () {

    var returnData = '';

    getDataFnNoErrorF(
        dataPath
        , {sql:'DictionaryInfoMapper.getChildInfo',code_en:'UNIT_TP'}
        , function (data) {
            if (null != data) {
                returnData = new Array();
                var resultData = data[0]['DictionaryInfoMapper.getChildInfo'];
                for(var i = 0; i < resultData.length; i++){
                    var appendRow = new Object();
                    appendRow.id = resultData[i]['code_value'];
                    appendRow.text = resultData[i]['code_cn'];
                    returnData.push(appendRow);
                }

            }else{
                return '';
            }
        }
        , function (data) {
            return '';
        }
        , function () {
            return '';
        });

    return returnData;
}
// —————————————————————————————————————————————————————————————————————————————————————getUNtp—————————————————————————————————————————————————————————————————————————————————————————————————————

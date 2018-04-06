<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9"/>

    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap.css">
    <%--<link rel="stylesheet" type="text/css" href="${basePath}/plugins/tab/css/bootstrap.min.css">--%>
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/tab/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/tab/css/jquery.scrollbar.min.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/tab/css/nth.tabs.min.css">

    <style type="text/css">
        /*.tab-content {*/
        /*padding: 0px;*/
        /*!important;*/
        /*}*/
        #title {
            background: url("${basePath}/plugins/img/mainBg.jpg");
            background-size: cover;
        }

        #logout {
            cursor: pointer;
        }
    </style>
</head>
<body>

<div class="container-fluid" style="margin-top: 0px; overflow: hidden">
    <div class="row" id="title">
        <div class="col-sm-6" style="position: relative;top: 50%;transform: translateY(-10%);color:#ff8327;"><h2>检疫犬管理系统</h2></div>
        <div class="col-sm-6">
            <div class="row">
                <div id="userShowName" class="col-sm-10 text-right" style="position: relative;top: 50%;transform: translateY(100%);font-size:12pt;color:#ff8327;"><span class="glyphicon glyphicon-user"
                                                                                                                                                                        aria-hidden="true"></span></div>
                <div id="logout" class="col-sm-2 text-right" style="position: relative;top: 50%;transform: translateY(100%);font-size:12pt;color:#ff8327;"><span class="glyphicon glyphicon-circle-arrow-right"
                                                                                                                                                                 aria-hidden="true"></span>退出
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12" style="padding-left: 1px;padding-right: 1px;">
            <div class="nth-tabs" id="editor-tabs" style="padding: 0px;"></div><!--使用时只需此标签，class固定,id自定义-->
        </div>
    </div>
    <%--<div class="row" style="margin-top:10px;">--%>
    <%--&lt;%&ndash;<div class="col-md-12" style="line-height:50px;">&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="nthTabs.delTab('f')">关闭潘金莲</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="nthTabs.addTab({id:'bgj',title:'白骨精',content:'老白'})">添加白骨精</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="nthTabs.setActTab('e')">切换到武松</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="nthTabs.locationTab()">定位到当前选项卡</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="nthTabs.delOtherTab()">关闭其他</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="nthTabs.delAllTab()">关闭所有</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="$('.roll-nav-left').click()">左滑动</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="$('.roll-nav-right').click()">右滑动</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="alert(nthTabs.getMarginStep())">获取左右滑动步值</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="alert(nthTabs.getActiveId())">获取当前选项卡ID</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="alert(nthTabs.getAllTabWidth())">获取所有选项卡宽度</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;<button type="button" class="btn btn-primary" onClick="console.log(nthTabs.getTabList());alert(nthTabs.getTabList())">获取所有选项卡</button>&ndash;%&gt;--%>
    <%--&lt;%&ndash;</div>&ndash;%&gt;--%>


    <%--</div>--%>
</div>


</body>

<%--jquery--%>
<script type="text/javascript" src="${basePath}/plugins/tab/js/jquery.min.js"></script>
<script type="text/javascript" src="${basePath}/plugins/tab/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${basePath}/plugins/tab/js/jquery.scrollbar.min.js"></script>
<script type="text/javascript" src="${basePath}/plugins/tab/js/nth.tabs.min.js"></script>

<%--tools--%>
<script type="text/javascript" src="${basePath}/plugins/tools/tools.js"></script>

<script type="text/javascript">

    var userInfo = '${userInfo}';
    var userShowName = JSON.parse(userInfo).user_Real_Name;
    $('#userShowName').append(userShowName);

    var tableHeight = window.parent.$('body').height() - (35 + $('#title').height());
    var iframeHeight = tableHeight - $('.page-tabs').height() - 25;
    //    alert(window.parent.$('body').height());
    $('#editor-tabs').height(window.parent.$('body').height() - $('#title').height() - $('.page-tabs').height() - 10);
    var nthTabs = $("#editor-tabs").nthTabs();
    $(function () {
        nthTabs.addTab({
            id: 999,
            title: '首页',
            content: '<iframe src="' + '${basePath}/plugins/echarts/main_default.html" width="100%" height="' + iframeHeight + '" ></iframe>',
        }).setActTab('#' + 999);
        //一个低门槛的演示,更多需求看源码
        //基于bootstrap tab的自定义多标签的jquery实用插件，滚动条依赖jquery.scrollbar，图标依赖font-awesome
//        nthTabs = $("#editor-tabs").nthTabs();
        <%--nthTabs.addTab({--%>
        <%--id: 'a',--%>
        <%--title: '用户登陆',--%>
        <%--content: '<iframe src="' + '${basePath}/system/show?page=/login/login" width="100%" height="' + iframeHeight + '" ></iframe>',--%>
        <%--}).addTab({--%>
        <%--/*换个姿势*/--%>
        <%--id: 'b',--%>
        <%--title: '检疫管理',--%>
        <%--content: '高老庄娶媳妇',--%>
        <%--active: true,--%>
        <%--allowClose: false,--%>
        <%--}).addTab({--%>
        <%--id: 'h',--%>
        <%--title: '人员管理',--%>
        <%--content: '没错就是这么爽',--%>
        <%--}).addTab({--%>
        <%--id: 'i',--%>
        <%--title: '组织机构管理',--%>
        <%--content: '一定一定',--%>
        <%--}).addTab({--%>
        <%--id: 'j',--%>
        <%--title: '熬夜写的啊',--%>
        <%--content: '码农苦逼~',--%>
        <%--}).setActTab("#c");--%>

//        nthTabs = $("#editor-tabs").nthTabs();
//        nthTabs.addTab({
//            id:'a',
//            title:'孙悟空',
//            content:'<iframe src="www.baidu.com" width="100%" height="100%" ></iframe>',
//        }).addTab({
//            /*换个姿势*/
//            id:'b',
//            title:'猪八戒-关不掉',
//            content:'高老庄娶媳妇',
//            active:true,
//            allowClose:false,
//        }).addTab({
//            id:'c',
//            title:'沙和尚',
//            content:'请叫我大叔',
//        }).addTab({
//            id:'d',
//            title:'唐僧',
//            content:'光头一个',
//        }).addTab({
//            id:'e',
//            title:'武松',
//            content:'打虎猛汉',
//        }).addTab({
//            id:'f',
//            title:'潘金莲',
//            content:'大美女',
//        }).addTab({
//            id:'g',
//            title:'来个标题长一点的的的来个标题长一点的的的',
//            content:'你赢了',
//        }).addTab({
//            id:'h',
//            title:'支持连贯操作',
//            content:'没错就是这么爽',
//        }).addTab({
//            id:'i',
//            title:'欢迎提意见',
//            content:'一定一定',
//        }).addTab({
//            id:'j',
//            title:'熬夜写的啊',
//            content:'码农苦逼~',
//        }).setActTab("#c");
    });

    //    打开工作面板
    function openMenu(url, name, id) {
//        console.log('打开:' + url);
//        console.log(nthTabs.getTabList());
        var tabList = nthTabs.getTabList();
//        console.log(id);

        for (var menuIndex = 0; menuIndex < tabList.length; menuIndex++) {
            console.log(tabList[menuIndex]["id"]);
            if (id == tabList[menuIndex]["id"].substring(1, tabList[menuIndex]["id"].length)) {
//                console.log(1111111);
                nthTabs.setActTab(tabList[menuIndex]["id"]);
                return null;
            }
        }

        nthTabs.addTab({
            id: id,
            title: name,
            content: '<iframe src="' + '${basePath}/system/show?page=' + url + '" width="100%" height="' + iframeHeight + '" ></iframe>',
        }).setActTab('#' + id);

        <%--nthTabs.addTab({--%>
        <%--id: id,--%>
        <%--title: name,--%>
        <%--content: '<iframe src="' + '${basePath}/system/show?page=' + url + '" width="100%" onload="setIframeHeight(this)" ></iframe>',--%>
        <%--}).setActTab('#' + id);--%>
    }

    function setIframeHeight(iframe) {
        if (iframe) {
            var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
//            测试环境
//            iframe.height = 850;
            if (iframeWin.document.body) {
                iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
                $('.iframeDiv').height(iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight);
            }
        }
    };

    $('#logout').click(function () {
        $.ajax({
            url:'${logoutPath}',
            type:'post',
            cache:false,
            sync:false,
            success:function (data) {
                window.top.location.href='${loginPath}';
            },
            error:function () {

            }
        });
    });
</script>
</html>
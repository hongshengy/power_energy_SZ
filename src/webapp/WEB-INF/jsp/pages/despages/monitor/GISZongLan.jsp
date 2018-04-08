<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%
    String baseUrl = request.getContextPath();
    String pagePath = baseUrl + "/pages/despages/common";
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + baseUrl + "/";
    session.setAttribute("itemCode", "GISzl");
    session.setAttribute("itemName", "GIS监控");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
<head>
    <meta charset="UTF-8"/>
    <title>GIS监控</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap-theme.css">

    <link rel="stylesheet" type="text/css" href="${basePath}/plugins/ztree/css/zTreeStyle/zTreeStyle.css">

    <script src="${basePath}pages/despages/common/js/maskJs.js"></script>
</head>
<body>
<script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>
<style>
</style>
<div class="container-fluid">
    <div class="row">
        <div class="col-xs-2">
            <ul id="areatree" class="ztree" style="background-color: #fff"></ul>
        </div>

        <div class="col-xs-10">
            <iframe src="${basePath}/system/show?page=pages/despages/monitor/GISZongLan_left_bottom" scrolling="no" frameborder="0" width="100%" height="1000px" ></iframe>
        </div>
    </div>

</div>



</body>
<script type="text/javascript">
    var webContextRoot = "<%=basePath%>";
    var webContextRoot2 = "${basePath}";
</script>
<script type="text/javascript" src="${basePath}pages/areaEnergy/common/jquery-easyui-1.5.1/jquery.min.js"></script>

<%--bootstrap--%>
<script type="text/javascript" src="${basePath}/plugins/bootstrap/js/bootstrap.js"></script>


<script type="text/javascript" src="${basePath}/plugins/ztree/js/jquery.ztree.core-3.5.min.js"></script>

<script type="text/javascript">

    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        },callback: {
            onClick: onClick
        }
    };

    var zNodes =[
        { id:1, pId:0, name:"深圳市", open:true, icon:"../../plugins/ztree/css/zTreeStyle/img/diy/1_close.png",lan:"22.539111",lon:"114.065414"},
        { id:2, pId:1, name:"龙岗区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.715349",lon:"114.260204"},
        { id:3, pId:1, name:"盐田区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.571982",lon:"114.238831"},
        { id:4, pId:1, name:"坪山区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.711166",lon:"114.35881"},
        { id:5, pId:1, name:"大鹏新区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.604019",lon:"114.477985"},
        { id:6, pId:1, name:"深汕特别合作区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.843068",lon:"115.001902"},
        { id:7, pId:1, name:"宝安区", open:true,icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.572048",lon:"113.886403"},
        { id:8, pId:1, name:"光明新区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.781745",lon:"113.926894"},
        { id:9, pId:1, name:"南山区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.542372",lon:"113.947606"},
        { id:10, pId:1, name:"前海特区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.518871",lon:"113.914261"},
        { id:11, pId:1, name:"龙华区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.76053",lon:"114.068076"},
        { id:12, pId:1, name:"福田区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.525261",lon:"114.069596"},
        { id:13, pId:1, name:"罗湖区", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/3.png" ,lan:"22.555152",lon:"114.146199"},
        { id:6001, pId:7, name:"信濠精密", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.632297",lon:"113.844561"},
        { id:6002, pId:7, name:"信濠光电", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.697064",lon:"113.830011"},
        { id:6003, pId:7, name:"雅达电源制品", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.585335",lon:"113.930181"},
        { id:6004, pId:7, name:"艾美特电器", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.671267",lon:"113.940005"},
        { id:6005, pId:7, name:"宝安区安全生产监督管理", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.560987",lon:"113.917123"},
        { id:6007, pId:7, name:"宝安人民医院", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.568912",lon:"113.919861"},
        { id:6008, pId:7, name:"大浪社区工作站", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png" ,lan:"22.705835",lon:"114.002741"},
        { id:6009, pId:7, name:"固戌污水厂", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.58826",lon:"113.853359"},
        { id:6010, pId:7, name:"海滨中学", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.563696",lon:"113.905391"},
        { id:6011, pId:7, name:"昊阳天宇", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.705392",lon:"113.935677"},
        { id:6012, pId:7, name:"深圳报业集团宝安印务有限公司", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.787434",lon:"113.902374"},
        { id:6013, pId:7, name:"深圳市七月文化传播有限公司", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.586783",lon:"113.897892"},
        { id:6014, pId:7, name:"新安街道安监", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.583063",lon:"113.921281"},
        { id:6015, pId:7, name:"新安中学(初中部)", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.569518",lon:"113.909106"},
        { id:6016, pId:7, name:"新安中学(高中部)", icon:"../../plugins/ztree/css/zTreeStyle/img/diy/9.png",lan:"22.559152",lon:"113.881558"}
    ];

    $(function(){
        $.fn.zTree.init($("#areatree"), setting, zNodes);
    });

    function onClick(event, treeId, treeNode, clickFlag) {
        alert(treeNode.name);
    }
</script>
</html>

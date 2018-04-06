<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- saved from url=(0069)http://61.177.76.218:7801${basePath}pages/despages/showPages/screenPage.jsp -->
<html class=" js no-touch cssanimations csstransitions" style="">
<head>
    <base href="${basePath}">

    <title>mainPage</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <link rel="stylesheet" type="text/css" href="${basePath}pages/despages/common/css/common.css">

    <script src="${basePath}pages/despages/showPages/js/modernizr.custom.js"></script>

    <link rel="stylesheet" type="text/css" href="${basePath}pages/despages/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" type="text/css" href="${basePath}pages/despages/common/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="${basePath}pages/despages/common/jquery-easyui-1.5.1/themes/color.css">

    <link rel="stylesheet" type="text/css" href="${basePath}pages/despages/showPages/css/default.css">
    <link rel="stylesheet" type="text/css" href="${basePath}pages/despages/showPages/css/multilevelmenu.css">
    <link rel="stylesheet" type="text/css" href="${basePath}pages/despages/showPages/css/component.css">
    <link rel="stylesheet" type="text/css" href="${basePath}pages/despages/showPages/css/animations.css">

    <link href="${basePath}pages/despages/showPages/css/DefaultAnimation.css" type="text/css" rel="stylesheet">
    <link href="${basePath}pages/despages/showPages/css/main.css" type="text/css" rel="stylesheet">

    <script src="${basePath}pages/despages/showPages/js/jquery-1.8.3.min.js"></script>
    <style type="text/css">

        html{
            /* 		background: #eff6fa; */
            background: white;
        }

        body{
            margin:0 auto;
            /* width:1920px;
            height:960px; */
            background: white;
            /* 		background-image: -moz-linear-gradient(270deg, #f6fcfc, #e7f1fa); */
            /*     	background-image:-webkit-gradient(linear, 0 0%, 0% 100%, color-stop(0.0, #f6fcfc), color-stop(1, #e7f1fa)); */
        }

        .popWindow {
            -moz-animation: opacityOutAnimation 0.8s ease;
            -moz-animation-delay: 0.2s;
            -moz-animation-fill-mode: forwards;
            -webkit-animation: opacityOutAnimation 0.8s ease;
            -webkit-animation-delay: 0.2s;
            -webkit-animation-fill-mode: forwards;
            animation: opacityOutAnimation 0.8s ease;
            animation-delay: 0.2s;
            animation-fill-mode: forwards;
        }

        @keyframes pOutAnimation {
            /*from {
                filter:alpha(opacity=0);
            }*/
            to {
                opacity: 0;
                transform: translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.2);
                background-position: 0px 0px;
            }
        }

        @-moz-keyframes pOutAnimation /* Firefox */
        {
            /*from {
                -moz-opacity : 0;
            }*/
            to {
                opacity: 1;
                -moz-transform: translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.2);
                background-position: 0px 0px;
            }
        }

        @-webkit-keyframes pOutAnimation /* Safari and Chrome */
        {
            /*from {
                opacity : 0;
            }*/
            to {
                opacity: 1;
                -webkit-transform: translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.2);
                background-position: 0px 0px;
            }
        }

        @-o-keyframes pOutAnimation /* Opera */
        {
            /*from {
                opacity : 0;
            }*/
            to {
                opacity: 1;
                -o-transform: translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.2);
                background-position: 0px 0px;
            }
        }

        .popWindowOut {
            -moz-animation: pOutAnimation 0.8s ease;
            -moz-animation-delay: 0s;
            -moz-animation-fill-mode: forwards;
            -webkit-animation: pOutAnimation 0.8s ease;
            -webkit-animation-delay: 0s;
            -webkit-animation-fill-mode: forwards;
            animation: pOutAnimation 0.8s ease;
            animation-delay: 0s;
            animation-fill-mode: forwards;
        }

    </style>
    <script type="text/javascript">
        var imagePath = "${basePath}pages/despages/showPages/images";
        var basePath = "${basePath}";
    </script>
</head>

<body>
<div id="main_div" style="width: 1920px; height: 960px; transform: scale(0.852083); transform-origin: left top 0px; margin-left: 115.5px;">
    <div id="menuTop" style="opacity: 1;"><div class="menuTop_menuItem" style="color: rgb(0, 125, 130);"><div style="width: 40px; height: 40px; margin: 0px auto;"><img style="width: 40px; height: 40px;" src="${basePath}pages/despages/showPages/images/01_hover.png"></div><div class="txt_div"><span>中心介绍</span></div></div><div class="menuTop_menuItem" style="color: rgb(153, 153, 153);"><div style="width: 40px; height: 40px; margin: 0px auto;"><img style="width: 40px; height: 40px;" src="${basePath}pages/despages/showPages/images/02_normal.png"></div><div class="txt_div"><span>中心特色</span></div></div><div class="menuTop_menuItem" style="color: rgb(153, 153, 153);"><div style="width: 40px; height: 40px; margin: 0px auto;"><img style="width: 40px; height: 40px;" src="${basePath}pages/despages/showPages/images/03_normal.png"></div><div class="txt_div"><span>运行监控</span></div></div></div>

    <div id="searchBtn" class="search_div" style="opacity:0;">
        <!--      		<div class="txt_div">  -->
        <!--      			<span>客户搜索</span>  -->
        <!--     		</div> -->
        <div class="btn_content_div">
            <div style="position: relative;z-index: 1002;width: 350px;">
                <div class="txt_div">
                    <input id="searchInput" onkeydown="searchEvent(event)" placeholder="客户搜索" onkeyup="getResult()" type="text">
                </div>
                <div class="img_div" onclick="searchEvent('click')">
                    <img src="${basePath}pages/despages/showPages/images/pageFive/img_8.png">
                </div>
            </div>
            <div id="searchResult" style="display:none;width: 344px;margin-top: 25px;position: relative;z-index: 1001;display: block;opacity: 0;box-shadow: 0px 0px 6px 0px black;background: white none repeat scroll 0% 0%;margin-left: 3px;">
                <ul id="searchResultUl" style="background: white none repeat scroll 0% 0%;color: red;list-style-type: none;padding-top: 30px;padding-bottom: 10px;padding-left: 0px;">
                    <!--      					<li style="margin-top: 2px;"><span style="cursor: pointer;">123</span></li> -->
                    <!--      					<li style="margin-top: 2px;"><span style="cursor: pointer;">123</span></li> -->
                    <!--      					<li style="margin-top: 2px;"><span style="cursor: pointer;">123</span></li> -->
                    <!--      					<li style="margin-top: 2px;"><span style="cursor: pointer;">123</span></li> -->
                </ul>
            </div>
        </div>
    </div>

    <div id="pt-main" class="pt-perspective">
        <div class="pt-page pt-page-1 pt-page-current" style="background: transparent; width: 1920px; height: 840px;">
            <iframe id="iframe0" name="iframe0" scrolling="no" marginheight="0" marginwidth="0" src="pages/despages/showPages/childPages/pageTwo.jsp" width="1920" height="840" frameborder="0"></iframe>
        </div>
        <div class="pt-page pt-page-2" style="background: transparent; width: 1920px; height: 840px;">
            <iframe id="iframe1" name="iframe1" scrolling="no" marginheight="0" marginwidth="0" width="1920" height="840" frameborder="0"></iframe>
        </div>
    </div>
</div>

<div id="fill_div" style="position: absolute;background: rgba(0, 0, 0, 0.2) none repeat scroll 0% 0%;width: 100%;height: 100%;top: 0px;opacity: 0;display: none;" onclick="closePopWindow()"></div>
<div class="" style="font-size: 20.45px; opacity: 0; display: none; position: absolute; width: 852.083px; height: 553.854px; border: 2px solid rgb(183, 188, 191); border-radius: 17.0417px; margin-left: 498.938px; top: 136.333px; background: rgba(255, 255, 255, 0.9) none repeat scroll 0% 0%; transform: scale(0.2);" id="popWindow">
    <div style="height: 12%;">
        <div style="float: left; color: rgb(78, 78, 78); margin-top: 3%; margin-left: 5%;">
            <span id="popTxtSpan">--</span>
        </div>
        <div style="float: right; cursor: pointer; margin-right: 2%; margin-top: 2%; width: 41.7521px; height: 41.7521px;" onclick="closePopWindow()">
            <img style="width: 100%; height: 100%;" src="${basePath}pages/despages/showPages/images/pageTwo/popClose.png">
        </div>
    </div>
    <div style="width: 766.875px; height: 468.646px; border: 2px solid rgb(185, 187, 187); margin-left: 5%;">
        <div id="divPlugin" class="plugin"></div>
    </div>
</div>

<script src="${basePath}pages/despages/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="${basePath}pages/despages/showPages/js/jquery.dlmenu.js"></script>
<script src="${basePath}pages/despages/showPages/js/pagetransitions.js"></script>
<script src="${basePath}pages/despages/showPages/js/menu.js"></script>

<script type="text/javascript" src="${basePath}pages/despages/common/video/jquery.range.js"></script>
<script type="text/javascript" src="${basePath}pages/despages/common/video/webVideoCtrl.js"></script>
<script src="${basePath}pages/despages/showPages/js/videoPopWindow.js"></script>


</body>
</html>
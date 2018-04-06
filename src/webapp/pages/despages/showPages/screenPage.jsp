<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String baseUrl = request.getContextPath();
	String mainCssPath = baseUrl + "/pages/despages/common";
	String jsPath = baseUrl + "/pages/despages/showPages/js";
	String cssPath = baseUrl + "/pages/despages/showPages/css";
	String pagesPath = baseUrl + "/pages/despages/showPages/childPages";
	String imagePath = baseUrl + "/pages/despages/showPages/images";
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ baseUrl + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>mainPage</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css"
		href="<%=mainCssPath%>/css/common.css">
		
	<script src="<%=jsPath%>/modernizr.custom.js"></script>
	
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=mainCssPath %>/jquery-easyui-1.5.1/themes/color.css">

    <link rel="stylesheet" type="text/css" href="<%=cssPath%>/default.css" />
    <link rel="stylesheet" type="text/css" href="<%=cssPath%>/multilevelmenu.css" />
    <link rel="stylesheet" type="text/css" href="<%=cssPath%>/component.css" />
    <link rel="stylesheet" type="text/css" href="<%=cssPath%>/animations.css" />
    
    <link href="<%=cssPath%>/DefaultAnimation.css" type="text/css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="<%=cssPath%>/main.css" />

    <script src="<%=jsPath%>/jquery-1.8.3.min.js"></script>
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
		var imagePath = "<%=imagePath%>";
		var basePath = "<%=basePath%>";
	</script>
  </head>
  
  <body>
  	<div id="main_div" style="width:1920px;height:960px;">
  		<div id="menuTop" style="opacity: 0;">
	     	
  		</div>
  		
  		<div id="searchBtn" class="search_div" style="opacity:0;"> 
<!--      		<div class="txt_div">  -->
<!--      			<span>客户搜索</span>  -->
<!--     		</div> -->
    		<div class="btn_content_div">
    			<div style="position: relative;z-index: 1002;width: 350px;">
    				<div class="txt_div"> 
	     				<input id="searchInput" type="text" onkeydown="searchEvent(event)" placeholder="客户搜索" onkeyup="getResult()"> 
	    			</div>
	    			<div class="img_div" onclick="searchEvent('click')"> 
	     				<img src="<%=imagePath%>/pageFive/img_8.png"> 
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
	        <div class="pt-page pt-page-1" style="background: transparent; width: 1920px; height: 840px;">
	            <iframe id="iframe0" name="iframe0" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="1920" height="840"></iframe>
	        </div>
	        <div class="pt-page pt-page-2" style="background: transparent; width: 1920px; height: 840px;">
	            <iframe id="iframe1" name="iframe1" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="1920" height="840"></iframe>
	        </div>
	    </div>
  	</div>
  
  	<div id="fill_div" style="position: absolute;background: rgba(0, 0, 0, 0.2) none repeat scroll 0% 0%;width: 100%;height: 100%;top: 0px;opacity: 0;display: none;" onClick="closePopWindow()"></div>
	<div class="" style="font-size: 24px; opacity: 0; display: none; position: absolute; width: 1000px; height: 650px; border: 2px solid rgb(183, 188, 191); border-radius: 20px; margin-left: 450px; top: 150px; background: rgba(255, 255, 255, 0.9) none repeat scroll 0% 0%; transform: scale(0.2);" id="popWindow">
		<div style="height: 12%;">
			<div style="float: left; color: rgb(78, 78, 78); margin-top: 3%; margin-left: 5%;">
				<span id="popTxtSpan">--</span>
			</div>
			<div style="float: right; cursor: pointer; margin-right: 2%; margin-top: 2%; width: 49px; height: 49px;" onclick="closePopWindow()">
				<img style="width: 100%; height: 100%;" src="<%=imagePath%>/pageTwo/popClose.png">
			</div>
		</div>
		<div style="width: 900px; height: 550px; border: 2px solid rgb(185, 187, 187); margin-left: 5%;">
			<div id="divPlugin" class="plugin"></div>
		</div>
	</div>
  	
  	<script src="<%=mainCssPath%>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
    <script src="<%=jsPath%>/jquery.dlmenu.js"></script>
    <script src="<%=jsPath%>/pagetransitions.js"></script>
    <script src="<%=jsPath%>/menu.js"></script>
    
    <script type="text/javascript" src="<%=mainCssPath%>/video/jquery.range.js"></script>
	<script type="text/javascript" src="<%=mainCssPath%>/video/webVideoCtrl.js"></script>
	 <script src="<%=jsPath%>/videoPopWindow.js"></script>
  </body>
</html>

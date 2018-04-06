<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数
String subsId = request.getParameter("subsId");//获取调用父页面传过来的参数
String isMainInto = request.getParameter("isMainInto");//是否从主页面进入
String selectedMenu = request.getParameter("selectedMenu");//获取调用父页面传过来的参数,指定选中的菜单
session.setAttribute("itemCode","ssjkLeafKfjk");
session.setAttribute("itemName","客户监控");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
 <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 	<meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <title>客户监控</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
	<link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
<style>
		#khjk .left-info-panel{
			width: 100%;
			height: 100%;
			padding: 10px 0px 10px 10px;
			box-sizing: border-box;
		}
		#khjk .left-info-panel .title-panel{
			width: 100%;
			height: 50px;
			background: #028A8F;
			line-height: 40px;
			padding: 5px 0px 0px 10px;
			position: relative;
			box-sizing: border-box;
			
			
		}
		
		#khjk .left-info-panel .title-panel .title{
			font-weight: bold; 
			width: 170px;
			font-size: 14px;
			color: #FFFFFF;
			height: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			cursor: pointer;
		}
		
		#khjk .left-info-panel .title-panel .cutover{
			position: absolute;
			top: 20px;
			right: 10px;
		}
		#khjk .left-info-panel .title-panel .cutover img{
			cursor: pointer;
		}
		#khjk .left-info-panel .title-panel .search-button{
            display: inline-block;
            color: #444;
            outline: 1px dashed #7f7f7f;
            outline-offset: -8px;
            border-radius: 0.33em;
            width: 100px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            font-family: "微软雅黑";
            text-shadow: 1px 1px 0 rgba(255,255,255, .8);
        }

        #khjk .left-info-panel .title-panel .search-button:hover{
            box-shadow: 0 3px 5px -3px rgba(0,0,0, .4);
            background: #1dce87;
            color: #fff;
            outline-color: #fff;
            text-shadow: -1px -1px 0 rgba(0,0,0, .2);
        }
        
        #khjk .left-info-panel .info-panel{
        	position: absolute;
        	top: 60px;
        	bottom: 10px;
			left: 10px;
			right: 0px;
			background: #F2F2F2;
			/*border: 1px solid #EFEFEF;*/
			box-sizing: border-box;
		}
		
		#khjk .left-info-panel .info-panel .content{
			width: 100%;
			height: 100%;
			overflow-y: auto;
		}
		#khjk .left-info-panel .info-panel .panel{
			margin-top: 1px;
		}
		#khjk .accordion .panel-header{
			padding-left: 21px;
		}
		#khjk .accordion .panel-icon{
			left: 15px
		}
		#khjk .accordion .accordion-header {
		    background: #DCDCDC;
		}
		#khjk .accordion .accordion-header-selected{
			background: #91E7EC;
		}
		
		#khjk .accordion .accordion-header .panel-title{
			color: #4D4D4D;
		}
		
		#khjk .accordion .accordion-body{
			border: none;
		}
		
		#khjk .left-info-panel .info-panel .content ul{
			padding: 0px;
			margin: 0px;
			
		}
		#khjk .left-info-panel .info-panel .content ul li{
			padding-left: 50px;
			padding-right: 10px;
			height: 30px;line-height: 30px;
			position: relative;
		}
		#khjk .left-info-panel .info-panel .content ul li:hover{
			background-color: #f2f2f2;
			cursor: pointer;
		}
		
		#khjk .left-info-panel .info-panel .content ul .selected{
			color: #028C8C;
			background: #F2F2F2;
		}
		#khjk .left-info-panel .info-panel .content ul .selected:before{
			content: "";
			position: absolute;
			top: 9px;
			left: 40px;
			width: 0;
    		height: 0;
			border-top: 6px solid transparent;
		    border-left: 6px solid #028C8C;
		    border-bottom: 6px solid transparent;
		}
		
		
		#khjk .content-panel{
			width: 100%;
			height: 100%;
			/* padding: 10px 10px 10px 5px; */
			box-sizing: border-box;
		}
        
        #khjk .content-panel .content{
        	width: 100%;
        	height: 100%;
        	background-color: #EFEFEF;
        }
        
        /* 对应iconCls:'icon-save',根据需求自己定义图标并设置,大小16*16*/
         .icon-completed {
		    background: url(<%=pagePath %>/images/completed.png) no-repeat center center;
		} 
	</style>
</style> 
  
<body id="khjk" class="easyui-layout">
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	<div data-options="region:'west', border:false,width:220">
			<div class="left-info-panel">
				<div class="title-panel">
					<div id="consNameId" class="title" onclick="kehushouye()">
					    <a id="consNameId" style="color: #FFFFFF"  href="#"></a>
					    <!-- <a id="consNameCopy" style="color: #FFFFFF"  href="#">无锡工艺职业技术学院(新校区)</a> -->
					</div>
					
					<div id="Customer" class="cutover" >
						<div>
							<img src="<%=pagePath %>/images/qiehuan.png" onclick="kehuPop()"/>
						</div>
						<!--<a class="search-button" href="#">切换客户</a>-->
					</div>
				</div>			
				
			 
				<div class="info-panel">
					<div class="content">
					 
	                    <div  id="menu" class="accordion-panel">
	                        <!-- <div title="总览" data-options="iconCls:'icon-completed'"> -->
	                    </div>
	                </div>
				</div>
			</div>
		</div>
		<div data-options="region:'center', border:false">
			<div class="content-panel">
				<div id ="contentId" class="content">
					
				</div>
			</div>
		</div>
		
		 
	 <script type="text/javascript">
			webContextRoot="<%=basePath%>";
			consId = "<%=consId%>";
		    consName = "<%=consName%>";
		    isMainInto = "<%=isMainInto%>";
		    selectedMenu = "<%=selectedMenu%>";
		    subsId = "<%=subsId%>";
	 </script>

	 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
	 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	 <script src="<%=pagePath %>/js/common.js"></script>
	 <script type="text/javascript" src="khjk.js"></script>
		
	</body>
 
</html>

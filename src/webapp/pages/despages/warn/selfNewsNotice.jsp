 <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%

String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";
	session.setAttribute("itemCode","desnewsNotice");
    session.setAttribute("itemName","新闻公告");
    
    UserInfo info = (UserInfo)session.getAttribute("userInfo");
	Long loginUserId = info.getUserId();//登录人编码
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
    <title>新闻公告</title>
     <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <link rel="stylesheet" href="<%=pagePath%>/webuploader-0.1.5/webuploader.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body  class="easyui-layout" >
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
		<style>
		#gjxxpz-panel .search-panel{
			background-color: #EFEFEF;
		}
		#gjxxpz-panel .grid-panel{
			background-color: #EFEFEF;
		}
		
		#gjxxpz-panel .form-table {
	        font-size: 12px;
	        border-spacing:0px;
	    }
	    
	    #gjxxpz-panel .form-table .td-label{
	        width: 80px;
	        text-align: center;
	    }
	
	    #gjxxpz-panel .form-table .td-value{
	        width: 160px;
	    }
	
	    #gjxxpz-panel .form-table .td-fillwidth{
	        width: 40px;
	    }
	    .hidden{
	    	display:none;
	    }
	    .noUpload{
		cursor: pointer;
		width:10px;
		height:10px;
		}
		.noUp{
		cursor: pointer;
		width:10px;
		height:10px;
		}
	</style>
	
	 <div class="main-panel noOverflow" data-options="region:'center',border:false" >
         
                <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	
                	<ul class="s-ul-one" >
						<li>
						    <span>新闻标题:</span>
								<input class="easyui-textbox" style="width:100px" id="newTitle" > 
						</li>
						<li>
                			<span>新闻类型:</span>
                			<input class="easyui-combobox" style="width:120px" id="newType" data-options="width:120,panelHeight:'auto',panelWidth:120"> 
                		</li>
                		<li class="s-right-one">
                		<span style="vertical-align: bottom;">
                		<a id="btn" href="#" class="easyui-linkbutton c100" data-options="onClick:updateTime">查询</a>
                		</span>
                		</li>
					</ul> 
           </div> 
           
		    <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
		       <div id="gjxxpz-datagrid" title="公告管理"></div>
			</div>   
    </div> 

		

		<script type="text/javascript">
				webContextRoot="<%=basePath%>";
				loginUserId = "<%=loginUserId%>";
		</script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		 <script src="<%=pagePath %>/js/common.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		 <script type="text/javascript" src="<%=pagePath %>/ocupload/jquery.ocupload-1.1.2.js"></script>
		 <script src="<%=pagePath%>/js/templet_common.js"></script>
		 <script src="<%=pagePath%>/webuploader-0.1.5/webuploader.min.js"></script>
		 <script type="text/javascript" src="selfNewsNotice.js"></script>
		 
	</body>
</html>

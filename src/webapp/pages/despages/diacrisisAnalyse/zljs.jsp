<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo"%>
<%
String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	
/* session.setAttribute("itemCode","despower");
session.setAttribute("itemName","响应指标"); */
UserInfo info = (UserInfo) session.getAttribute("userInfo");

Date d = new Date();
SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
String day = fmt.format(d);
String consId = request.getParameter("consId");//获取调用父页面传过来的参数
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
    <title>响应指标</title>
     <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body  class="easyui-layout" >
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	 
	   <div class="main-panel noOverflow" data-options="region:'center',border:false" >
                <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	<ul class="s-ul-one" >
						<li>
						    <span>响应年份:</span>
							<span class="tools-labelgroup" >
                  				 <a id="top_query" href="javascript:qytQueryOveride('-1');" style="border-style:none;">
	                       		  <img style="border-style:none;vertical-align: middle" height="14px" width="14px"  alt="前一年" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
                 			</span> 
	                        <span class="tools-labelgroup" >
	                             <!-- <input id="dataDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy',onpicked:changeDate,isShowClear:false,readOnly:true})"/> -->
	                             <input id="dataDate" class="Wdate" type="text" style="width: 100px;text-align: left;" readonly="readonly"  onClick="WdatePicker({dateFmt:'yyyy'})"/>
							</span>
							<span class="tools-labelgroup">
								<a id="bottom_query" href="javascript:qytQueryOveride('1');" style="border-style:none;">
								<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="后一年" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
							</span>
						</li>
						<li>
                			<span>接收状态:</span>
                			<select id="timeAccpValue" class="easyui-combobox" data-options="prompt:'请选择',panelHeight:'auto',editable:false,width:80"></select> 
                		</li>
                		<li class="s-right-one">
                			<span style="vertical-align: bottom;"><a id="search" href="#" class="easyui-linkbutton c100" data-options="width:80">查询</a></span>
                			<span style="vertical-align: bottom;"><a id="e" href="#" class="easyui-linkbutton c100" data-options="onClick:jsyq">接收邀请</a></span>
                		</li>
					</ul> 
           </div> 
           
		    <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
		       <div id="dataGrid" title="指令管理"></div>
			</div>   
    </div> 
            
		 
		<script type="text/javascript">
				webContextRoot="<%=basePath%>";
				var userId = '<%=((UserInfo)session.getAttribute("userInfo")).getUserId()%>';
				var d = '<%=day%>';
				var consId = '<%=consId%>';
		</script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		 <script src="<%=pagePath %>/js/common.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		 <script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
		  <script type="text/javascript" src="<%=pagePath %>/ocupload/jquery.ocupload-1.1.2.js"></script>
		  <script src="<%=pagePath%>/js/templet_common.js"></script>
		 <script type="text/javascript" src="zljs.js"></script>
		 
	</body>
</html>

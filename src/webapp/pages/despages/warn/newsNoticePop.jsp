<%@page import="cn.com.jsepc.appframe.system.domain.SysObject"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";
	session.setAttribute("itemCode","desnewsNoticePop");
    session.setAttribute("itemName","新闻公告具体信息");
    String newsId = request.getParameter("newsId");
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
    <title>新闻公告具体信息</title>
     <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body>
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
		<style>
		#gjxxpz-panel .search-panel{
			background-color: #EFEFEF;
			 text-align: center;
		}
		#gjxxpz-panel .grid-panel{
			background-color: #EFEFEF;
			 text-align: center;
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
	    .toolsbar-panel .tbRow *{
		    letter-spacing: 0;
		    display: inline-block;
		}
				.tools-labelgroup{
		    margin-left:10px;
		}
		
		.tools-labelgroup input{
		    vertical-align: middle;
		}
		
		.toolsbar-panel .tbRow{
		    margin: 0.9em 0;
		}
	</style>
		<div id="gjxxpz-panel" style="width: 100%; height: 100%;">
			<table style="width: 100%; height: 100%;">
				<tr>
					<td style="text-align:center;width: 100%;height:40px">
						<span>
						<label id="newsTitle" class="tb-group-label" style="width:100%;text-align:center;font-size:30px;color:#37A09D;">新闻标题</label>	
						</span>	
					</td>
				</tr>
				<tr>
					<td style="text-align:center;width: 100%;height:30px">
						<span>
						<label id="combitTime" class="tb-group-label" style="width:100%;text-align:center;font-size:16px;">发布时间:2017-02-05</label>
						</span>
					</td>
				</tr>
				<tr>
					<td style="text-align:center;height:300px;width: 100%">
						<div id="contentArea">		            
					  </div>
					</td>
				</tr>
				<tr>
					<td style="right:10px; left:10px; bottom: 10px;height:40px;text-align:center;width: 100%">
						<label id="xgfj">相关附件</label>
                        <div id="fjmca"></div>
					</td>
				</tr>
			</table>
<!--                 <div class="easyui-panel" style="position: relative; text-align: center;padding: 10px;" data-options="fit: true,border: false,,onResize:autoResize">
	                  <div class="toolsbar-panel" >
			                <div class="tbRow">
			                        <span class="tools-labelgroup">
			                            <label id="newsTitle" class="tb-group-label" style="width:100%;text-align:center;font-size:30px;color:#37A09D;">新闻标题</label>
			                        </span>
			                 </div>
	                  </div>
        		      <div class="toolsbar-panel" >
	                  		<div class="tbRow">
		                        <span class="tools-labelgroup">
			                            <label id="combitTime" class="tb-group-label" style="width:100%;text-align:center;font-size:16px;">发布时间:2017-02-05</label>
			                        </span>
							</div>
		              </div>
		              <div id="contentArea" style="position: absolute;top: 130px; right:10px; left:10px; bottom: 50px;">		            
					  </div>
					  <div style="position: absolute; right:10px; left:10px; bottom: 10px;height:40px;">
                           <label id="xgfj" class="tb-group-label" style="width:100%;text-align:center;font-size:14px;">相关附件</label>
                           <div id="fjmca"></div>
					  </div>	                       
                </div> -->
		</div>
		
		<div id="topic-excel" class="x-hidden"></div>
		<script type="text/javascript">
				webContextRoot="<%=basePath%>";
				servletContext = webContextRoot+'upLoads';
			    newsId="<%=newsId%>";
		</script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		 <script src="<%=pagePath %>/js/common.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		 <script src="<%=pagePath%>/js/templet_common.js"></script>
		 <script type="text/javascript" src="newsNoticePop.js"></script>
		 
	</body>
</html>

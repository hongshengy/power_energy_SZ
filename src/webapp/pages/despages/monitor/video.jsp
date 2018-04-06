<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
	String baseUrl  = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages";
	String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	UserInfo info = (UserInfo)session.getAttribute("userInfo");
	session.setAttribute("itemCode","des_video");
    session.setAttribute("itemName","视频监控");
    
    String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	String shownTree = "";//左侧树布局
	String shownRightStyle = "";//左侧树布局
	//未获取到企业编码，证明不是客户监控页面调用的，需要加载左侧树进行查询
	/* if(consId==null || consId.equals("")){//左侧树布局
			shownTree = "<div id=\"westTree\" data-options=\"region:'west',disabled:true,split:true,title:'导航',border:false\" style=\"width:220px;\">"
			+"  <div style=\"padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2\">"
			+"    <input id=\"CobConsSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search'\">"
			+"    <div style=\"position: absolute;top:30px;width:190px;\"><input id=\"consSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search',prompt:'请输入客户名称'\"></div>"
			+"     </div>"
			+"     <ul  id=\"shipingshu\" class=\"easyui-tree\" style=\"width:100%;\"  >"
			+"     </ul>"
			+"      </div> ";
			shownRightStyle="<div class=\"easyui-layout\" data-options=\"region:'center',border:false\" style=\" margin: 10px 0px 0px 10px;overflow: hidden;\">";
			
		}else{
			
		    shownRightStyle="<div class=\"easyui-layout\" data-options=\"region:'center',border:false\" style=\" margin: 10px 0px 0px 0px;overflow: hidden;\">";
		} */
    	shownTree = "<div id=\"westTree\" data-options=\"region:'west',disabled:true,split:true,title:'导航',border:false\" style=\"width:220px;\">"
			+"  <div style=\"padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2\">"
			+"    <input id=\"CobConsSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search'\">"
			+"    <div style=\"position: absolute;top:30px;width:190px;\"><input id=\"consSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search',prompt:'请输入客户名称'\"></div>"
			+"     </div>"
			+"     <ul  id=\"shipingshu\" class=\"easyui-tree\" style=\"width:100%;\"  >"
			+"     </ul>"
			+"      </div> ";
			shownRightStyle="<div class=\"easyui-layout\" data-options=\"region:'center',border:false\" style=\" margin: 10px 0px 0px 10px;overflow: hidden;\">";
    
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<meta charset="UTF-8"/>
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=treePagePath %>/css/tree.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/common/css/jquery.range.css"/>
    <script src="<%=pagePath %>/common/js/maskJs.js"></script>
	    
</head>
  
  <body>
  	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
	<style type="text/css">
		/*回放*/
		.playback
		{
			/* width:95%;
			height:90%; */
			padding:10px;
			margin-left:10px;
			border:1px solid #7F9DB9;
		}
		.playback .tt
		{
			width:60px;
			font-size: 15px;
		}
		.playback .txt
		{
			width:150px;
		}
		.playback .btn
		{
			width:50px;
			height:22px;
			line-height:18px;
		}
		.playback .btn2
		{
			width:70px;
			height:25px;
			line-height:18px;
			margin-right: 10px;
			margin-bottom: 10px;
		}
		.playback .sel
		{
			width:65px;
		}
		.playback .searchdiv
		{
			height:100px;
			overflow:hidden;
			overflow-y:auto;
			border:1px solid #7F9DB9;
			font-size:11px;
		}
		.playback .searchlist th, .playback .searchlist td
		{
			padding:2px;
			border:1px solid #7F9DB9;
			border-collapse:collapse;
			white-space:nowrap;
		}
		.range-demo {
            width: 720px;
            margin: 0 auto;
            margin-top:0px;
        }

        #g1, #g2 {
            margin-top: 0px
        }
	</style>
	
    <div id="spjk-panel" class="easyui-layout" style="width: 100%;height: 100%;">
    	<div data-options="region:'west',border:false" style="width:300px; position: relative;">
        	<div class="spsh_panel container-shadow" style="width: 100%;height: 100%;">
        		<div class="easyui-panel" title="视频树" style="width: 100%;height: 100%;">
	            	 <ul id ="shipingshu" class="easyui-tree" style="width:100%;">
                     </ul>
	            </div>
        	</div>
        	<!-- <div class="baoliu_panel container-shadow" style="width: 95%;height: 25%;">
	            <div class="easyui-panel" title="保留" style="width: 100%;height: 100%;display: none;">
	            	
	            </div>
	        </div> -->
    	</div>
    	<div data-options="region:'center',border:false" style="width:100%; position: relative;">
    		<div style="width: 100%;height: 75%;  background-color: black; margin-right: 10px;">
    			<div id="login_install_dialog"  style="display:none; height:30px; width:60px;padding-top:30px; margin:auto;">
			        <div style="clear: both;zoom:1; border: 2px solid #373737;">
					    <a id="login_btn_install_hk" href="<%=basePath %>pages/despages/common/video/WebComponentsKit.rar" target="_download" style ="">海康下载</a>
					    <a id="login_btn_install_dh" href="<%=basePath %>pages/despages/common/video/webplugin.rar" target="_download" style ="">大华下载</a>
					    <!--<a id="login_btn_cancel" href="javascript:window.opener=null; window.open('','_self'); window.close();">退出</a>-->
					</div>
		        </div>
    			<!-- 海康视频 -->
	            <DIV id="divPlugin" class="plugin" style="display: none;"></DIV>
	            <!--大华视频-->
	            <div id="f_ocx" style="width: 100%;height: 100%;display: none;"></div>
        	</div>
        	<div style="width: 100%;height: 70%;display: none;">
				<!-- <div>
					<button id="Login" href="javascript:;"Onclick = "LoginDevice" style = "display:block;">登录</button>
					<button id="Play" href="javascript:;"Onclick = "RealPlay()" style = "display:block;">预览</button>
					<button id="Ptzctrl" href="javascript:;"Onclick = "ControlPtz()" style = "display:none;">云台</button>
					<button id="Stop" href="javascript:;"Onclick = "StopPlay()" style = "display:block;">停止</button>	
					<button id="LocalPlay" href="javascr;"Onclick = "LocalPlay()" style = "display:none;">打开本地录像</button>		
					<button id="FullScreen" href="javascriptipt:;"Onclick = "FullScreen()" style = "display:block;">全屏</button>		
					<button id="Logout" href="javascript::;"Onclick = "LogoutDevice()" style = "display:block;">退出</button>	
				</div> -->
				
				<!--<div>
					<button id="idQuery" href="javascript:;"Onclick = "QueryRecord()" style = "display:block;">回放</button>
					<button id="PlayBack" href="javascript:;"Onclick = "PlayBack()" style = "display:block;">Playback</button>
					<button id="download" href="javascript:;"Onclick = "Download()" style = "display:block;">下载</button>
					<button id="PlayRec" href="javascript:;"Onclick = "PlayRec()" style = "display:none;">PlayRec</button>
					<button id="PauseRec" href="javascript:;"Onclick = "PauseRec()" style = "display:block;">暂停</button>
					<button id="FastPlay" href="javascript:;"Onclick = "FastPlay()" style = "display:none;">快放</button>
					<button id="SlowPlay" href="javascript:;"Onclick = "SlowPlay()" style = "display:none;">慢放</button>
				</div>-->
				<!-- <div id="ShowPlayTime" style = "display:none;">
					<label >now time</label><input type="text" id="playtime">
				</div>
				<div id="DwonLoadPos" style = "display:none;">
					<label >pos</label><input type="text" style="width:900px" id="downPos">
				</div>
				<div style="display:none;" id="RecInfo">
					<div id="RecInfoList" style = "overflow:auto;width:600px;height:200px;">
					</div>
				/div> -->
        	</div>
        	
	        
        	<div class="hmpz_panel container-shadow" style="width: 100%;height: 25%">
        		<div class="easyui-panel" title="画面配置" style="width: 100%;height: 100%;">
        			<!-- <div class="easyui-layout" style="width: 90%;height: 100%">
        				<div data-options="region:'west',border:false" style="width: 100%;"> -->
	        				<fieldset class="playback">
								<!-- <legend>画面</legend> -->
								<table>
									<tr>
										<td>
											抓图路径:&nbsp;&nbsp;
											<input id="previewPicPath" type="text" class="txt"/>&nbsp;&nbsp;&nbsp;&nbsp;
											<input type="button" class="btn2" value="浏览" onclick="clickOpenFileDlg('previewPicPath', 0);" />
										</td>
										<td>
											回放时间:&nbsp;&nbsp;
											<input id="starttime" class="easyui-datebox" value=""/>
											<input type="button" class="btn2" value="开始回放" onclick="clickStartPlayback();" />
											<input type="button" class="btn2" value="停止回放" onclick="clickStopPlayback();" />
											<input type="button" class="btn2" value="暂停" onclick="clickPause();" />
											<input type="button" class="btn2" value="恢复" onclick="clickResume();" />
										</td>
									</tr>
									<tr>
										<td>
											<input id="danhm" type="button" value="单画面" class="btn2" onclick="changeWndNum(1)">
			            					<input id="sihm" type="button" value="四画面" class="btn2" onclick="changeWndNum(2)">
			            					<input type="button" value="抓图" class="btn2" onclick="clickCapturePic();" />
										</td>
										<td>
											<input class="range-slider" type="hidden" value="0,24"/>
										</td>
									</tr>
									<tr>
										<td>
											<input id="jiuhm" type="button" value="九画面" class="btn2" onclick="changeWndNum(3)">
			            					<input id="shilhm" type="button" value="十六画面" class="btn2" onclick="changeWndNum(4)">
			            					<input id="quanping" type="button" value="全屏" class="btn2" onclick="clickFullScreen()">
										</td>
									</tr>
									<tr>
										<td>
											<input id="lxOpenbtn" type="button" value="轮循开" class="btn2" onclick="lxLoadVideo()">
											<input id="lxColsebtn" type="button" value="轮循关" class="btn2" onclick="lxColseVideo()">
										</td>
									</tr>
								</table>
						   </fieldset>
        				<!-- </div> -->
        				
        				<!-- <div data-options="region:'center',border:false" style="width:35%; position: relative;overflow: hidden;">
						   <fieldset class="playback">
						   		<legend>回放</legend>
						   		<table>
						   			<tr style="margin-bottom: 10px;">
										<td>回放时间:&nbsp;&nbsp;
											<input id="starttime" class="easyui-datebox" value=""/>
										</td>
									</tr>
									<tr style="height: 50px;" >
										<td>
											<input class="range-slider" type="hidden" value="0,24"/>
										</td>
									</tr>
									<tr style="margin-top: 10px;">
										<td>
											<input type="button" class="btn2" value="开始回放" onclick="clickStartPlayback();" />
											<input type="button" class="btn2" value="停止回放" onclick="clickStopPlayback();" />
											<input type="button" class="btn2" value="暂停" onclick="clickPause();" />
											<input type="button" class="btn2" value="恢复" onclick="clickResume();" />
										</td>
									</tr>
									<tr>
										<td>
											<input type="button" class="btn2" value="登录" onclick="LoginDevice();" />
											<input type="button" class="btn2" value="预览" onclick="RealPlay();" />
											<input type="button" class="btn2" value="回放" onclick="PlayBack();" />
											<input type="button" class="btn2" value="停止" onclick="StopPlay();" />
										</td>
									</tr>
						   		</table>
						   </fieldset>
					    </div> -->
        				
        			<!-- </div> -->
		           
	            </div>
        	</div>
    	</div>
    	<!-- <div data-options="region:'east',border:false" style="width:350px; position: relative;padding-right: 10px;">
    		<div class="hmpz_panel container-shadow" style="width: 100%;height: 100%;">
	            
        	</div>
    	</div> -->
    </div>
  <script>
  		var webContextRoot="<%=basePath%>";
  		consId = "<%=consId%>";
		consName = "<%=consName%>";
  		//大华视频
  		var agent = navigator.userAgent.toLowerCase();
  		//检验是什么浏览器
		var s;
		var ua = navigator.userAgent.toLowerCase();
		var Sys = {};
			(s = ua.match(/(msie\s|trident.*rv:)([\d.]+)/)) ? Sys.ie = s[2] :
			(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
			(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
			(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
			(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
  		//插件ID
		var PLUGINS_CLASSID = '7F9063B6-E081-49DB-9FEC-D72422F2727F';
		//版本号
		var VERSION_GUI = 'version=3,1,0,4'; //注意：本地GUI上版本信息显示需要的字符串，修改版本的时候这个字符串也要修改
		var isMac = navigator.userAgent.toLowerCase().indexOf("mac") != -1;
		//视频插件html
		var mainOcxHtml = '';
		if (Sys.ie)
		{		
			mainOcxHtml = '<object id="ocx" width="100%" height="100%" classid="CLSID:{'+PLUGINS_CLASSID+'}"codebase="/webrec.cab"></object>';
		}
		else
		{
			mainOcxHtml = '<object id="ocx" width="100%" height="100%" type="application/media-plugin-version-3.1.0.2" VideoWindTextColor="9c9c9c" VideoWindBarColor="414141"></object>';
		}
  		//下载？
		/*var handlerOcxEvents = {
				fireOcxEvent: function(jsonStr) {
					document.getElementById('downPos').value = jsonStr;
				}
			}*/
  		
  </script>
  <script type="text/javascript" src="<%=pagePath %>/common/video/jquery-1.7.2.min.js"></script>
  <%-- <script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.min.js"></script> --%>
  <script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
  <script type="text/javascript" src="<%=pagePath %>/common/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
  <script type="text/javascript" src="<%=pagePath %>/common/js/dateUtil.js"></script>
  <script type="text/javascript" src="<%=pagePath %>/common/video/jquery.range.js"></script>
  
  <script type="text/javascript" src="<%=pagePath %>/common/video/webVideoCtrl.js"></script>
  <script type="text/javascript" src="<%=pagePath %>/monitor/video.js"></script>
  </body>
</html>
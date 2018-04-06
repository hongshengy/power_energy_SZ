<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.frontier.framework.application.SystemConstants"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
	String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";	
	String pagePath = baseUrl + "/pages/despages/common";	
String flag = request.getParameter("flag");
String roleId = request.getParameter("roleId")+"";
String orgNo = "";
if(roleId != null && !roleId.equals("null") && roleId.length() > 0){
 	 orgNo = String.valueOf(
 			 com.frontier.pubmodule.AueicUtil.getPorgNoByRole(Long.parseLong(roleId)));
}
UserInfo info = (UserInfo)session.getAttribute("userInfo");
String name = info.getLoginName();
Long loginUserId = info.getUserId();//登录人编码

//取登陆页面
String loginPage = request.getParameter("loginPage");
if(loginPage == null){
	loginPage = "loginjsp";
}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 	<meta charset="UTF-8"/>
 	<title> </title>
    <link rel="stylesheet" type="text/css" href="<%=basePath %>/pages/despages/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=basePath %>/pages/despages/common/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=basePath %>/pages/despages/common/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" type="text/css" href="<%=basePath %>/pages/despages/common/css/common.css">
</head>							
															
 <style type="text/css">
   .head-panel{
        height: 80px;
        background-color: #028C8C;
        overflow: hidden;
    }

    .head-panel .title{
        float: left;
        font-family: "微软雅黑";
        font-size: 22px;
        color: #fff;
        margin-top: 13px;
        margin-left: 20px;
        width:250px;
        height:50px;
    }

    .menu-panel{
        float: left;
        margin-left: 40px;
        margin-top: 4px;
       	position: relative;
    }

    .menu-panel > div{
        float: left;
    }

    .menu-panel .arrow-left,
    .menu-panel .arrow-right{
        font-size: 18px;
        color: #fff;
        margin-top: 25px;
    }

    .menu-panel .menu-core-panel{
        margin: 0;
        overflow: hidden;
    }

    .footer-panel{
        padding: 5px;
        background-color: #E8E8E8;
        text-algin:right;
        float:right;
    }

    .iframe-panel{
        overflow: hidden;
        width: 100%;
        height: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .iframe-panel iframe{
        width: 100%;
        height: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    /*修改tabs的css样式*/
    #tab-main ul.tabs {
        height: 36px !important;
    }

    #tab-main ul.tabs li {
        margin-top: 6px;
    }

    #tab-main ul.tabs a.tabs-inner{
        height: 29px !important;
        padding: 0px 20px 0 15px;
    }

    #tab-main ul.tabs li a.tabs-close{
        right: 10px;
    }


    .menu-userinfo-panel{
        display: inline-block;
        float: right;
        margin-top: 20px;
		margin-right: 15px;
    }

    .warining-block{
        display: inline-block;
        margin-right: 15px;
        padding: 3px;
        position: relative;
        cursor: pointer;
    }

    .warining-block:hover {
        background-color: #00a19e;
    }

    .warining-block,
    .warining-block img{
        width: 32px;
        height: 32px;
    }

    .user-menu-block{
        vertical-align: 12px;
    }

    .user-menu-block .l-btn-text{
        color: #fff;
    }

    .user-menu-block .m-btn-plain-active,
    .user-menu-block .l-btn-plain:hover{
        background-color: #00a19e;
        border-color: #00a19e;
    }

    .warining-num{
        position: absolute;
        display: inline-block;
        top: -2px;
        right: -4px;
        width: 18px;
        height: 18px;
        font-family: 'Arial Negreta', 'Arial';
        color: #fff;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align:center;
        padding: 2px;
        
    }
    .warining-num2{
        position: absolute;
        display: inline-block;
        top: -2px;
        right: -10px;
        width: 28px;
        height: 18px;
        font-family: 'Arial Negreta', 'Arial';
        color: #fff;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align:center;
        padding: 2px;
        
    }

    #userinfo-menu{
        width: 200px;
        border-color: #fff;
    }

    #userinfo-menu p{
        margin: 10px;
    }
    

    #btn-toggleRole{
        color: #00bbee;
        float: right;
    }

    #btn-toggleRole:hover{
        cursor: pointer;
    }

    .toggleRole-panel{
        position: absolute;
        display: none;
        top: 20px;
        right: 10px;
        background-color: #fff;
        border: 1px solid #999988;
    }

    #userinfo-menu .separate-line{
        border-top: 1px dashed #999988;
    }

    #userinfo-menu p.role-item{
        margin: 0;
        padding: 10px 20px;
    }

    .role-item:hover{
        cursor: pointer;
        background-color: #e7e7e7;
    }

    .user-menu-block .l-btn-plain{
        border-radius: 3px 3px 0 0;
    }

    .user-menu-block .l-btn-plain:hover,
    .user-menu-block .m-btn-plain-active{
        background: #fff;
        border-color: #fff;
    }

    .user-menu-block .l-btn-plain:hover .l-btn-text,
    .user-menu-block .m-btn-plain-active .l-btn-text{
        color: #000;
    }
    .updatepwd{
			width: 100px;
			float: left;
			font-size: 16px;
			height: 20px;
			margin-top: 5px;
		}
		
		.updatepwdimg{
			width: 15px;
			float: left;
			margin-left: 15px;
			margin-top: 5px;
		
		}
		.main-title-panel a.leftArrow,
		.main-title-panel a.rightArrow{
			position: absolute;
			font-size: 20px;
			z-index: 1;
			cursor: pointer;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;

		}

		.main-title-panel a.leftArrow{
			left: -12px;
			top: 35px;
		}

		.main-title-panel a.rightArrow{
			right: -12px;
			top: 35px;
		}
		
		  .body-panel{
        position: relative;
    }

    .jinyuan-label{
        display: inline-block;
        position: absolute;
        z-index: 9;
        right: 20px;
        top: 8px;
    }
 .line-text{
        margin:0 10px;
        vertical-align:middle;
        width:2px;
        height:16px;
        background-color:#ccc;
        display:inline-block;
    }
  .time-text{
        color: #666;
        font-size: 14px;
        font-family: "微软雅黑 ";
        text-shadow: 1px 1px 2px #d1d1d1;
        margin:0 10px;
        vertical-align:middle;
    }
    .jinyuan-text{
        color: #028c8c;
        font-size: 18px;
        font-family: "微软雅黑 ";
        text-shadow: 1px 1px 2px #d1d1d1;
        margin:0 10px;
        vertical-align:middle;
    }
    .fangtian-text{
        color: #028c8c;
        font-size: 18px;
        font-family: "微软雅黑 ";
        text-shadow: 1px 1px 2px #d1d1d1;
        text-align:right;
        float:right;
        margin:0 30px;
    }
    
    .head-panel a.leftArrow,
	.head-panel a.rightArrow{
			position: absolute;
			font-size: 20px;
			z-index: 1;
			cursor: pointer;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;

		}

		.head-panel a.leftArrow{
			left: -22px;
			top: 20px;
			color: #f7f7f7;
			font-size: 20px;
		}

		.head-panel a.rightArrow{
			right: -22px;
			top: 20px;
			color: #f7f7f7;
			font-size: 20px;
		}
		 #main-warning-tip-panel{
        display: none;
        position: absolute;
        z-index: 9;
        right: 20px;
        bottom: 20px;
        font-family: "微软雅黑";
        width: 300px;
        background-color: #fff;
        -webkit-box-shadow: 2px 2px 10px #bcbcbc;
        -moz-box-shadow: 2px 2px 10px #bcbcbc;
        box-shadow: 2px 2px 10px #bcbcbc;
        border-radius: 10px 10px 0 0;
        border: 1px solid #ff4f00 \9;
    }

    #main-warning-tip-panel p{
        margin: 10px 0;
    }

    #main-warning-tip-panel > .title{
        text-align: center;
        background-color: #ff4f00;
        color: #fff;
        padding: 10px;
        font-size: 18px;
        border-radius: 10px 10px 0 0;
    }

    #main-warning-tip-panel > .content{
        padding: 10px 20px;
    }

    #main-warning-tip-panel > .title > .close{
        float: right;
        color: #d64200;
        font-weight: bold;
    }
    
	#tip-panel-container{
	    width:400px;
        z-index: 9;
        position: absolute;
        right: 10px;
        bottom: 10px;
        border: 1px solid transparent;
    }
    #main-warning-tip-panel > .title > .close:hover{
        color: #fff;
        cursor: pointer;
	}
	.tip-panel{
        position: relative;
        margin: 10px 0;
        z-index: 9;
        font-family: "微软雅黑";
        background-color: #fff;
        -webkit-box-shadow: 2px 2px 10px #bcbcbc;
        -moz-box-shadow: 2px 2px 10px #bcbcbc;
        box-shadow: 2px 2px 10px #bcbcbc;
        border-radius: 10px 10px 0 0;
        border: 1px solid #00ccc8 \9;
    }

    .tip-panel.warning{
        border: 1px solid #ff4f00 \9;
    }

    .tip-panel > .title{
        text-align: center;
        background-color: #00ccc8;
        color: #fff;
        padding: 10px;
        font-size: 18px;
        border-radius: 10px 10px 0 0;
    }

    .tip-panel.warning > .title{
        background-color: #ff4f00;
    }

    .tip-panel > .content{
        padding: 10px 20px;
    }

    .tip-panel > .title > .close{
        float: right;
        color: #00827f;
        font-weight: bold;
    }

    .tip-panel.warning > .title > .close{
        color: #d64200;
    }

    .tip-panel > .title > .close:hover{
        color: #fff;
        cursor: pointer;
    }
	</style>
  	
   	<body  class="easyui-layout">
   		<input type="hidden" id="roleId" value=""/>
   		<input type="hidden" id="roleCode" value=""/>
		<div class="head-panel" data-options="region:'north',border:false" >
			<div class="easyui-layout" data-options="fit:true,border:false">
				<div data-options="region:'west',border:false"  style="width:300px;">
					<%-- <div class="title"><img style="width:100%;height:100%;" src="<%=pagePath%>/images/main-title1_2.png"></div> --%>
					<div class="title"><img id="areaPhoto" style="width:100%;height:100%;"></div>
				</div>
				<div data-options="region:'center',border:false,id:'menuPanel',onResize:menuResize" style="overflow: hidden;">
					<div class="menu-panel clearfix">
						<div id="leftButton" style="display:none;">
							<a class="leftArrow"  onclick="menumove(1)">◀</a>
						</div>
				        <!--<div class="arrow-left">◀</div>-->
				        <div id="menuParent" class="menu-core-panel fangtian-mainMenu">
				          	<div id="menu" class="main-menu-panel" style="display: inline-block;overflow: hidden;white-space: nowrap;"></div>
				           <div id="Trendsmenudiv"></div>
				        </div>
				        <div id="rightButton" style="display:none;">
				        	<a class="rightArrow"   onclick="menumove(2)">▶</a>
				        </div>
				        <!--<div class="arrow-right">▶</div>-->
				    </div>
				</div>
				<div data-options="region:'east',border:false" style="width:230px;">
					<div class="menu-userinfo-panel">
				        <span class="warining-block" style="">
				        	<img id="gaojingld" style ="display: block;" src="<%=basePath%>/images/warning-gray.png" onclick="testOpen('',0,1,'','告警详情')">
				        	<img id="gaojingld_yj" style="display:none; " src="<%=basePath%>/images/warning.png" onclick="testOpen('',0,1,'','告警详情')">
<!-- 				        	<img id="gaojingld" src="<%=basePath%>/images/warning-gray.png" onclick="testOpen('',0,1,'','告警详情')"> -->
				        	<iframe id="newMessageDIV" style="display:none"></iframe>
				        	<a class="warining-num" id ="gaojingsl" style="background-image: url('../images/warningNum-bg.png');" onclick="testOpen('',0,1,'','告警详情')"></a>
				        </span>
				
				        <span class="user-menu-block">
				        	<a href="#" class="easyui-menubutton" data-options="menu:'#userinfo-menu'">用户：
				        	<span id ="loginName"></span>
				        		<!-- <a id="loginName"  class="logname" href="#" style="color:#fff;" onclick="updatemmgl()">Admin</a>
								<abbr id="loginName1" title=""></abbr> -->
							</a>	
								<!-- <select id="roleid"  class="easyui-combobox" type="text" data-options="required:true,editable:false,prompt:'请选择',border:false,panelHeight:'auto',"  style="width:110px;"></select> -->
				        </span>
				        <!-- <div id="mm1" class="menu-content" style="background:#f0f0f0;padding:10px;text-align:left">
				            <p style="font-size:14px;color:#444;">Try jQuery EasyUI to build your modern, interactive, javascript applications.</p>
				        </div> -->
				      <div id="userinfo-menu" class="menu-content">
				           <div style="text-align: center">
				               <div class="select-role-panel">
				                   <label >当前角色：</label>
				                   <div id="combo-role" class="combobox-container">
				                       <div class="combo-textbox" style="top:7px;">
				                           <span class="combo-text" id="xialajs"></span><span class="dragdown-sign">▼</span>
				                       </div>
				                       <div class="combo-list" id="roleid">
				                          
				                       </div>
				                    </div>
				               </div>
				               <p class="separate-line"></p>
				               <p>
				                   <a id="btnHelp" class="easyui-linkbutton c9 shadow" href="#" onclick="helpWindows()">button</a>
				               </p>
				               <p>
				                   <a id="btnPassword" class="easyui-linkbutton c9 shadow" href="#" onclick="updatemmgl()">button</a>
				               </p>
				               <p>
				                     <a id="cnbwhdpt" class="easyui-linkbutton c9 shadow" href="login.jsp" >button</a>
				               </p>
				           </div>
				        </div>
				    </div>
				</div>
			</div>
	</div>
<div class="body-panel"  id="new-tab-main" data-options="region:'center',border:false" >
   <div></div>
   <div class="jinyuan-label"> 
    <span id="systemTime" class="jinyuan-text"></span>  
   <span id="dqName" class="jinyuan-text"></span>  
   </div>
    <div  id="tab-main" class="easyui-tabs" data-options="fit:true,border:true">
   		 <div class="iframe-panel" title="首页" >
        </div>
    </div>
</div>
<div class="footer-panel" data-options="region:'south',border:false" >
    <span class="fangtian-text" >技术支持：江苏方天电力技术有限公司</span>
</div>
<div id="main-warning-tip-panel">
    <div class="title"><span>告警信息</span><span class="close" onclick="closegg()">×</span></div>
    <div class="content" id="gaojing">
    </div>
</div>
<div id="tip-panel-container"></div>
<div id="dialog1"></div>
        
      
        
         <div id="mmxg" class="easyui-dialog easyui-dialog-white" title="密码修改" closed="true" style="padding:10px;top:150px;width: 350px"
				data-options="
					iconCls: 'icon-save',
					buttons: [{
						text:'确定',
						width:60,
						iconCls:'icon-ok',
						handler:function(){
						      if($('#mmxgForm').form('validate')){
							  updatePassword();			                
			                }								 
						}
					},{
						text:'取消  ',
						width:60,
						handler:function(){
							$('#mmxg').dialog('close')
						}
					}],
					modal:true
				">
				<form id="mmxgForm" method="post" autocomplete="off">
					<div id="xiugaimima" style="margin-top: 10px;display:none">
							<div style="height: 35px">
								<div class="updatepwd" >
									<label >旧密码:</label>
								</div>
								<div style="width:160px;float: left">
								  <input id="oldpwd" class="easyui-textbox" type="password" data-options="border:false,validType:['isBlank','length[0,16]']" style="width:100%" ></input>
								</div>
								<div class="updatepwdimg">
									<img id="oldpwdimg1" alt="" src="<%=basePath%>/images/error.png" style="display: none;">
									<img id="oldpwdimg2" alt="" src="<%=basePath%>/images/ok.png" style="display: none;">
								</div>
							</div>
							<div style="height: 35px">
								<div class="updatepwd" >
									<label >新密码:</label>
								</div>
								<div style="width:160px;float: left">
								  <input id="newpwd" class="easyui-textbox" type="password" data-options="border:false,validType:['isBlank','length[0,16]']" style="width:100%" ></input>
								</div>
								<div class="updatepwdimg">
									<img id="newpwdimg1" alt="" src="<%=basePath%>/images/error.png" style="display: none;">
									<img id="newpwdimg2" alt="" src="<%=basePath%>/images/ok.png" style="display: none;">
								</div>
						</div>
								<div style="height: 35px">
									<div class="updatepwd" >
										<label >确认新密码:</label>
									</div>
									<div style="width:160px;float: left">
									  <input id="affnewpwd" class="easyui-textbox" type="password" data-options="border:false,validType:['isBlank','length[0,16]']" style="width:100%"></input>
									</div>
									<div class="updatepwdimg">
										<img id="affnewpwdimg1" alt="" src="<%=basePath%>/images/error.png" style="display: none;">
										<img id="affnewpwdimg2" alt="" src="<%=basePath%>/images/ok.png" style="display: none;">
									</div>
								</div>
								<div style="height: 35px">
										<div class="updatepwd" >
											<label >密码有效期:</label>
										</div>
										<div style="width:160px;float: left">
										  <input id="pwdendtime"  class="easyui-datebox start-datebox"  data-options="required:true,border:false,editable:false" style="width:100%" />
										</div>
										<div class="updatepwdimg">
										</div>
									</div>
			</div>				
			</form>
		</div>
	<script type="text/javascript">
			webContextRoot="<%=basePath%>";
			loginUserId = "<%=loginUserId%>";
	</script>
	<script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/js/common.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/js/dateUtil.js"></script>
    <script type="text/javascript" src="<%=basePath%>/pages/system/main_des.js"></script>
    <script type="text/javascript" src="<%=pagePath%>/js/toolwinopen.js"></script>
    <script>
 	     var loginName = '<%=((UserInfo)session.getAttribute("userInfo")).getLoginName()%>';
         var UserName = '<%=((UserInfo)session.getAttribute("userInfo")).getUserName()%>';
         var userId = '<%=((UserInfo)session.getAttribute("userInfo")).getUserId()%>';
         var roleId = '<%=roleId%>';
         var baseUrl='<%=baseUrl%>';
         var array = new Array();
         var itemCode='desSy';
         var itemName='首页';
         
		function firstpage(){
			var mainPage={nowTab:null, oldTab:null};
			          
			$('#tab-main').tabs({
				onSelect:function(title,index){    
				    var ishav =false;
			        for(var i=0 ;i<array.length;i++){
			            if(title == array[i].text){
			            ishav=true;
			            itemCode = array[i].name;
			            itemName = array[i].text;
			            }
			        }
			        if(ishav==false){
			          itemCode='desSy';
                      itemName='首页';
			        }   
			    } 
		    }); 
			$('#menu-m1').bind('click', function(){}); 
			setTimeout(function(){
							var  onepege='<iframe id="funcId" src="<%=basePath%>'+pagefirst +'"scrolling="no" frameborder="0" width="100%" height="99%"></iframe>';
						    $('#tab-main').tabs('add',{    
								title:'首页',   
								cls:'tabpage tabpage-panel',
								content:onepege,
								closable:false
							});},200); //延迟0.2秒执行
			}
						
			function menuHandler(item){
			
				 //console.log(item.name);
				 var url=item.id;
				 var name = item.name;
				 var dakai=$(item.target).attr("data");//打开方式 niframe y浏览器打开 o页面打开小窗口
				 var title=item.text;
				 var page='';
				 
				 array.push(item);
				 if(dakai == 'N'){
					 if(url.toLowerCase().indexOf("http://")==0){
						 page='<iframe id="funcId" name="'+name+'" src="'+url +'"scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
					 }else{
					 	page='<iframe id="funcId" name="'+name+'" src="<%=basePath%>'+url +'&consId='+consId+'&consName='+consName+'&isMainInto=true'+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>';
					 }
					 
					var tab = $('#tab-main').tabs('getTabIndex',"#"+item.name);
					/*如果已经打开某个模块，则跳转至该模块*/
					if (tab > 0){
						$('#tab-main').tabs('select',tab);
						return;
					}
					$('#tab-main').tabs('add',{ 
						id:item.name,
						title:title,  
						cls:'tabpage tabpage-panel',
						content:page, 
						closable:true
				   	});  
				}else if(dakai == 'O'){
					var content ='';
					if(url.toLowerCase().indexOf("http://") != 0){
						url = '<%=basePath%>'+url;
					}
				// content='<iframe id="funcId" name="'+name+'" src="'+url +'"scrolling="auto" frameborder="0" width="100%" height="100%"></iframe>';
			   		var str = "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbar=no,copyhistory=no,left=0,screenX=0,top=0,screenY=0";
			   	 	var ah = 500;
				 	var aw = 800;
				     if (window.screen) {
						ah = screen.availHeight - 55;
						aw = screen.availWidth - 10;
						str += ",height=" + ah;
						str += ",innerHeight=" + ah;
						str += ",width=" + aw;
						str += ",innerWidth=" + aw;
					} else { 
						str += ",resizable";
					}
					//window.open(url,title, str);
					OpenWinUnRes(url, title,aw,ah);			
				}else if(dakai == 'Y'){
					var content ='';
					if(url.toLowerCase().indexOf("http://")==0){
						content='<iframe id="funcId" name="'+name+'" src="'+url +'"scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
					}else{
						content='<iframe id="funcId" name="'+name+'" src="<%=basePath%>'+url +'"scrolling="no" frameborder="0" width="100%" height="100%"></iframe>';
					}
					
					var boarddiv = "<div id='msgwindow' title="+title+"/>";
					$(document.body).append(boarddiv);
					var win = $("#msgwindow").dialog({
						content : content,
						width : document.body.clientWidth-160,
						height : document.body.clientHeight-160,
						maximizable:true,
						closable:true,
						modal : 'shadow'});
					win.dialog('open');
				}	
			};
			
			//点击事件  传固定参数跳指定tab页 调用方式top.reloadTabPage(options);
			function reloadTabPage(options){
			    var tab = $('#tab-main').tabs('getTabIndex',"#"+options.name);
			    if (tab == null||tab == -1){
			        $('#tab-main').tabs('add',{
			            id:options.name,
					    cls:'tabpage tabpage-panel',
			            title: options.text,
			            content: '<div class="iframe-panel"><iframe name=' + options.name + ' src=' + options.path + ' frameborder="0"></iframe></div>',
			            closable: true
			        });
			    }else{
			        $.when($('#tab-main').tabs('select',options.text)).then(function () {
			            window.frames[options.name].location.href = options.path;
			        });
			    }
			}
			/*******************************************************************************
			 * 打开窗口，不可拖动窗体大小
			 * 
			 * @param url
			 * @param winName
			 * @param width
			 * @param height
			 * @param isClosed
			 */
			function OpenWinUnRes(url, winName, width, height, isClosed) {
				xposition = 0;
				yposition = 0;
			
				if ((parseInt(navigator.appVersion) >= 4)) {
					xposition = (screen.width - width) / 2;
					yposition = (screen.height - height) / 2;
				}
				theproperty = "width=" + width + "," + "height=" + height + ","
						+ "location=0," + "menubar=0," + "resizable=0," + "scrollbars=1,"
						+ "status=1," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
						+ "screenx=" + xposition + "," // 仅适用于Netscape
						+ "screeny=" + yposition + "," // 仅适用于Netscape
						+ "left=" + xposition + "," // IE
						+ "top=" + yposition; // IE
				monwin = window.open(url, winName, theproperty, false);
				if (isClosed) {
					monwin.close();
					monwin = window.open(url, winName, theproperty, false);
				}
				monwin.focus();
			}
			
			</script>
		</body>
	</html>			
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="com.frontier.framework.application.SystemConstants"%>
<%@page import="com.frontier.framework.util.WebUtils"%>
<%@page import="com.frontier.system.model.SysUserConfig"%>

<%
    String baseUrl=request.getContextPath();
    String absolutePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
%>
<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/resources/jsepc/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/css/mysys.css" />
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
<%if (SystemConstants.isProdMode()){%>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/build/locale/ext-lang-zh_CN-min.js"></script>
<%}else{%>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/ext-all-debug.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/build/locale/ext-lang-zh_CN.js"></script>
<%}%>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/ext-extend.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/common/viewinfdlg.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/common/comdlg.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/common/constant.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/common/common.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/common/openModule.js"></script>
<script type="text/javascript" src="<%= baseUrl%>/js/common/errordlg.js"></script>
<script type="text/javascript" src="<%= baseUrl%>/js/common/component.js"></script>
<% 
	SysUserConfig suc = (SysUserConfig)session.getAttribute("sysUserConfig");
%>
<script type="text/javascript">
	Ext.namespace("gdc");
	gdc.absolutePath="<%=absolutePath%>";
	//gdc.webContextRoot="<%=baseUrl%>";
	gdc.webContextRoot="<%=absolutePath%>";
	gdc.loginState='<%=session.getAttribute("frameMark")%>';  
	<% if(suc==null){%>
		//界面风格
		gdc.interfaceStyle='T';
		//是否隐藏浏览器菜单
		gdc.hideBrowserMenu = 'N';
		//是否弹出window
		gdc.popWin='N';
		//是否自动收缩菜单
		gdc.shrinkMenu='N';
		//打开新功能，是否自动关闭旧功能
		gdc.autoCloseOldFunc='N';
		gdc.funcId = '';
		gdc.funcName = '';
		gdc.funcUrl = '';
	<%}else{%>
		//界面风格
		gdc.interfaceStyle="<%=suc.getInterfaceStyle()%>";
		//是否隐藏浏览器菜单
		gdc.hideBrowserMenu = "<%=suc.getHideMenu()%>";
		//是否弹出window
		gdc.popWin="<%=suc.getPopWin()%>";
		//是否自动收缩菜单
		gdc.shrinkMenu="<%=suc.getShrinkMenu()%>";
		//打开新功能，是否自动关闭旧功能
		gdc.autoCloseOldFunc="<%=suc.getCloseOld()%>";
		gdc.funcId = "<%=suc.getFuncId()%>";
		gdc.funcName= "<%=suc.getFuncName()%>";
		gdc.funcUrl = "<%=suc.getFuncUrl()%>";
	<%}%>
	
	Ext.BLANK_IMAGE_URL = gdc.webContextRoot+"/resources/ext-2.2.1/resources/images/default/s.gif";
	gdc.isProdMode=<%=SystemConstants.isProdMode()%>;
	//gdc.isPagePurview=<%=SystemConstants.isPagePurview()%>;
	gdc.isPagePurview=true;
	gdc.mdlCfg={
			mustRole:false,
			funcBtnControl:true,
			isUnite:'select'   // 值有两种 1、'select' 2、'merger'  select表示有多个角色时进行选择，merger表示合并
	};	
</script>
<script type="text/javascript">
	var request={};<%--存放相关请求的参数,如果是从待办事宜进入（批处理没有）有属性：workItemId，wfInstId--%>
	<%--存放当前用户信息，其中有：spRoleId(专项角色ID)，spOrgId(专项组织ID)，spOrgName(专项组织名称)，roleId(角色ID),roleCode(角色Code)
		userId,userName（工作流进入，没有roleId，roleCode；工作流批处理时只有userId和userName,自己初始化相关数据）
		如果请求了是否加载资源过滤标识，多一个属性orgResSign（1资源过滤，0资源不过滤）
		如果请求了组织附加信息，多一个属性spOrgObj{id,name,attrCode,corpId,corpName,corpAttrCode}
	--%>
	var currUser={spRoleId:0,spOrgId:0,roleId:0,roleCode:''};
	var wfData={};<%--存放相关请求载入的工作流全局数据的变量--%>
	<%--是通过frame打开的jsp，它的parent是通过菜单打开的,又请求了从父页面获取信息，则不提取request的信息放在js中--%>
	<%if (!"1".equals(request.getParameter("loadInfByParent"))){
		//从菜单进或从工作流的待办事宜进，取request的信息放在js中
		if (request.getParameter("funcId")!=null || request.getParameter("workItemId")!=null){
	%>
		function analyseRequest(){<%=WebUtils.analyseRequest(request,false)%>};
		analyseRequest();
	<%}}%>
	function analyseCurrUser(){<%=WebUtils.analyseCurrUser(request)%>};
	analyseCurrUser();
</script>
<script type="text/javascript">
	<%--是通过frame打开的jsp，它的parent是通过菜单打开的，获取parent页面中的信息--%>
	<%if ("1".equals(request.getParameter("loadInfByParent"))){%>
		if (parent && parent!=window && parent.request){
			Ext.apply(request,parent.request);
			Ext.apply(currUser,parent.currUser);
			Ext.apply(wfData,parent.wfData);
		}
	<%}%>
</script>
<noscript>你的浏览器不支持脚本运行，请检查浏览器版本或安全设置！</noscript>
<%
    String baseUrl=request.getContextPath();
    String absolutePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	//String roleId = request.getSession().getAttribute("roleId")+"";  
%>

<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/resources/jsepc/css/ext-all.css" />
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/build/locale/ext-lang-zh_CN.js"></script>
<%@page import="com.frontier.framework.application.SystemConstants"%>

<script type="text/javascript">
	Ext.namespace("gdc");
	gdc.webContextRoot="<%=absolutePath%>";
	//gdc.currentRoleId = %=roleId%;
	gdc.isPagePurview=<%=SystemConstants.isPagePurview()%>;
	Ext.BLANK_IMAGE_URL = gdc.webContextRoot+"/resources/ext-2.2.1/resources/images/default/s.gif";
	try
	{
		if(top.Ext.menu != null && top.Ext.menu != undefined)
		{
			if(!window.dialogArguments && !window.opener){
				document.onmouseup = function(){top.Ext.menu.MenuMgr.hideAll()};
			}
		}
	}
	catch(e)
	{
		
	}
	
</script>
<script type="text/javascript" src="<%=baseUrl%>/js/common/viewinfdlg.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/common/comdlg.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/common/common.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/common/errordlg.js"></script>

<script type="text/javascript" src="<%=baseUrl%>/js/common/component.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/common/comboboxComponent.js"></script>
<script type="text/javascript" src="<%=baseUrl%>/js/common/comboboxTree.js"></script>

<link rel="stylesheet" type="text/css" href="<%= baseUrl%>/js/common/Datetime/Spinner.css" />
<script type="text/javascript" src="<%= baseUrl%>/js/common/Datetime/Spinner.js"></script>
<script type="text/javascript" src="<%= baseUrl%>/js/common/Datetime/SpinnerField.js"></script>
<script type="text/javascript" src="<%= baseUrl%>/js/common/Datetime/Datetime.js"></script>

<link rel="stylesheet" type="text/css" href="<%= baseUrl%>/js/common/MultiSelectCombobox.css" />

<script type="text/javascript">

function  setExtCombobxValueByHidden(id){
	var value = document.getElementById(id).value;
	var store=Ext.getCmp(id+'ext').getStore();
	store.on('load',function(s,r,o){if(!s.baseParams.query){Ext.getCmp(id+'ext').setValue(value);}})
	if(!store.baseParams.query){
		Ext.getCmp(id+'ext').setValue(value);
	}
};


function setExtDateTimeFieldValue(id){
	Ext.getCmp(id+'ext').setRawValue(document.getElementById(id).value)
}


function setExtDateFieldValue(id){
	Ext.getCmp(id+'ext').setRawValue(document.getElementById(id).value)
}


function  setExtComboboxTreeValue(id,treeType){
	Ext.getCmp(id+'extHidden').setValue(document.getElementById(id).value);
	setComboxTreeValue(id+'extHidden',id+'extComboboxTree',treeType,null);
}

</script>
			

<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Long roleId = Long.parseLong((String) request.getSession().getAttribute("roleId"));
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <jsp:include page="/pages/common/componentBase.jsp" />
    <title>导航菜单配置</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript">
		var url = "";
		Ext.onReady(function(){
			var pbWin = gdc.component.ProgressBar;
			var sysTree = new Ext.tree.TreePanel({
				layout:'fit',
				rootVisible : false,
				autoScroll : true,
				width:400,
				height:500,
				enableDD : true,
				listeners:{
					'click':function(node){
						if(node.leaf == true)
						{
							var funcId = node.attributes.id;
							document.getElementById("funcId").value = funcId;
							var menuName = node.attributes.text;
							document.getElementById("selMenuName").value = menuName;
						}
						else
						{
							alert("请选择叶子节点");
							document.getElementById("funcId").value = "";
							document.getElementById("selMenuName").value = "";
						}
					},
					'beforeappend':function(tree,p,n)
					{	
						if(pbWin.isVisible() == true)
						{
							pbWin.hide();
							Ext.getCmp("selButton").setDisabled(false);
						}
					}
				},
				loader : new Ext.tree.TreeLoader({
					dataUrl : 'navigator/querySysMenuList.action'
				})
			});
			var sysRoot = new Ext.tree.AsyncTreeNode({
				id : '-100',
				text : '电厂树'
			});
			sysTree.setRootNode(sysRoot);
			
			var root = new Ext.tree.AsyncTreeNode({
				text:'导航菜单',
				loader:new Ext.tree.TreeLoader({
					url:'navigator/queryMenuList.action'
				})
		    });
			var viewport = new Ext.Viewport({
					layout:'border',
		            items:[
		            	new Ext.tree.TreePanel({
			               	title:'导航菜单配置',
			               	tbar:[{
									icon:'images/t_add.gif',
									text:'新增子菜单',
									iconCls:'queryfilehis-button',
									id:'addChild',
									handler:function(){
										if(document.getElementById("id").value == "")
										{
											Appframe.viewinfdlg.error.show('请选择要操作的导航菜单！', false);
											return;
										}
										url = gdc.webContextRoot + "navigator/addNavMenu.action";
										Ext.getCmp("navName").setValue("");
										Ext.getCmp("navName").setDisabled(false);
										Ext.getCmp("funcName").setValue("");
										Ext.getCmp("funcName").setDisabled(false);
										Ext.getCmp("reset").setDisabled(false);
										Ext.getCmp("saveBtn").setDisabled(false);
										document.getElementById("parentId").value = document.getElementById("id").value;
										document.getElementById("funcId").value = "";
									}
								},
								{
									icon:'images/del.png',
									text:'删除',
									iconCls:'queryfilehis-button',
									id:'del',
									handler:function(){
										var id = document.getElementById("id").value;
										if(id == "")
										{
											Appframe.viewinfdlg.error.show('请选择要操作的导航菜单！', false);
											return;
										}
										Ext.MessageBox.confirm('确认操作', '您确定要删除所选菜单？',
											function(btn){
												if(btn=='yes'){
													pbWin.show();
													Ext.Ajax.request({
														url: gdc.webContextRoot + "navigator/deleteNavMenu.action",
														params: {
															'id':id
														},
														success: function(result, request) 
														{
															//var obj = eval('('+result.responseText+')');
															var obj=jsonDecode(result.responseText);
															if(obj.success == true)
															{
																Appframe.viewinfdlg.right.show("操作成功",true);
																Ext.getCmp("navName").setValue("");
																Ext.getCmp("funcName").setValue("");
																Ext.getCmp("navName").setValue("");
																Ext.getCmp("navName").setDisabled(false);
																Ext.getCmp("funcName").setDisabled(false);
																Ext.getCmp("reset").setDisabled(false);
																Ext.getCmp("saveBtn").setDisabled(false);
																root.reload();
															}
															else
															{
																Appframe.viewinfdlg.error.show(obj.msg,false);
															}
															pbWin.hide();
														},
														faliure:function(){
															pbWin.hide();
															alert(obj.msg);
															return ;
														}
													});
												}
										});
									}
								}
		                    ],
			               	collapsible: true,
			               	width: 225,
			                minSize: 175,
			                maxSize: 400,
			                autoScroll:true,
			                id:'navTree',
			                margins:'0 0 0 0',
			               	root:root,
			               	region:'west',
			               	listeners:{
			               		'click':function(node){
			               			//获取点击节点的父id
			               			var id = node.attributes.id;
			               			var parentId = node.attributes.parent_id;
			               			var funcId = node.attributes.func_id;
			               			document.getElementById("funcId").value = funcId;
			               			document.getElementById("id").value = id;
			               			document.getElementById("parentId").value = parentId;
				               		Ext.getCmp("navName").setValue(node.text);
				               		Ext.getCmp("funcName").setValue(node.attributes.func_name);
				               		url = gdc.webContextRoot + "navigator/updateNavMenu.action";
			               			if(node.attributes.leaf != true)
			               			{
			               				Ext.getCmp("funcName").setDisabled(true);
			               				Ext.getCmp("reset").setDisabled(true);
			               			}
			               			else
			               			{
			               				Ext.getCmp("funcName").setDisabled(false);
			               				Ext.getCmp("reset").setDisabled(false);
			               			}
			               			if(node.getDepth()==1 || node.getDepth() == 2)
			               			{
			               				Ext.getCmp("addChild").setDisabled(false);
			               			}
			               			else
			               			{
			               				Ext.getCmp("addChild").setDisabled(true);
			               			}
			               			if(node.getDepth()==2 || node.getDepth() == 3)
			               			{
			               				Ext.getCmp("del").setDisabled(false);
			               			}
			               			else
			               			{
			               				Ext.getCmp("del").setDisabled(true);
			               			}
			               			if(node.getDepth()==1 || node.getDepth()==0)
			               			{
			               				Ext.getCmp("navName").setDisabled(true);
			               			}
			               			else
			               			{
			               				Ext.getCmp("navName").setDisabled(false);
			               			}
			               			//如果导航菜单和关联菜单都被禁用，保存按钮也要禁用
			               			if(Ext.getCmp("navName").disabled == true && Ext.getCmp("funcName").disabled == true)
			               			{
			               				Ext.getCmp("saveBtn").setDisabled(true);
			               			}
			               			else
			               			{
			               				Ext.getCmp("saveBtn").setDisabled(false);
			               			}
			               		}
			               	}
			            }),
			            new Ext.Panel({
		                    region:'center',
		                    title:'菜单定义',
		                    id:'centerPanel',
		                    bodyBorder:false,
		                    labelAlign:'right',
		                    layout:'form',
		                    height:500,
		                    tbar:[{
									text:'保存',
									id:'saveBtn',
									icon: 'images/img/save.gif',
									iconCls:'queryfilehis-button',
									handler:function(){
										if(document.getElementById("id").value == "")
										{
											Appframe.viewinfdlg.error.show('请选择要操作的导航菜单', false);
											return;
										}
										var id = document.getElementById("id").value
										var funcId = document.getElementById("funcId").value;
										var navName = document.getElementById("navName").value;
										if(navName.trim() == "")
										{
											Appframe.viewinfdlg.error.show('请输入导航菜单名称', false);
											return;
										}
										else if(navName.trim().length >16)
										{
											Appframe.viewinfdlg.error.show('导航菜单名称不能超过16个字符', false);
											return;
										}
										var sel = Ext.getCmp("navTree").getSelectionModel();
										//三级菜单必须关联系统菜单
										if(sel.selNode.getDepth() == 3)
										{
											if(funcId == "null" || funcId == "")
											{
												Appframe.viewinfdlg.error.show('请选择要关联的系统菜单', false);
												return;
											}
										}
										//给二级菜单添加三级菜单时，三级菜单必须关联系统菜单
										else if(sel.selNode.getDepth() == 2 && url.indexOf("addNavMenu.action") != -1)
										{
											if(funcId == "null" || funcId == "")
											{
												Appframe.viewinfdlg.error.show('请选择要关联的系统菜单', false);
												return;
											}
										}
										var parentId = document.getElementById("parentId").value;
										if(funcId == "null")
										{
											funcId = "";
										}
										pbWin.show();
										Ext.Ajax.request({
											url: url,
											params: {
												'id':id,
												'funcId': funcId,
												'funcName': navName,
												'isLeaf':1,
												'parentId': parentId
											},
											success: function(result, request) 
											{
												//var obj = eval('('+result.responseText+')');
												var obj=jsonDecode(result.responseText);
												if(obj.success == true)
												{
													Ext.getCmp("navName").setValue("");
													Ext.getCmp("navName").setDisabled(false);
													Ext.getCmp("funcName").setValue("");
													Ext.getCmp("funcName").setDisabled(false);
													Ext.getCmp("reset").setDisabled(false);
													Appframe.viewinfdlg.right.show("操作成功",true);
													root.reload();
													Ext.getCmp("navTree").expandAll();
												}
												else
												{
													Appframe.viewinfdlg.error.show(obj.msg,false);
												}
												pbWin.hide();
											},
											faliure:function(){
												pbWin.hide();
												alert(obj.msg);
												return ;
											}
										});
									}
								}
		                    ],
		                    items: [
								new Ext.form.TextField({
									id: 'navName',
									fieldLabel:'导航菜单名称',
									width: 200,
									emptyText:'请输入导航菜单名称，最多16个字符'
								}),
								{
									layout:'table',
									bodyStyle:'padding-top:1px;',
									border:false,
									items:[
										new Ext.form.Label({
											id : 'titleLabel',
											text: '关联系统菜单:',
											style : 'font-size:12px;padding-left:19px;padding-right:12px;'
										}),
										new Ext.form.TextField({
											id: 'funcName',
											fieldLabel:'关联系统菜单',
											emptyText:'请选择要关联的系统菜单',
											width: 200,
											listeners:{
												'focus':function(){
													win.show();
												}
											}
										}),new Ext.Button({
											id:'reset',
											text:'重置',
											listeners:{
												'click':function(){
													Ext.getCmp("funcName").setValue("");
													document.getElementById("funcId").value="";
												}
											}
										})
									]
								}
						    ]
				        })
				    ]
			});
			Ext.getCmp("navTree").expandAll();
			
			var win = new Ext.Window( {
				title : '选择要关联的系统菜单',
				width : 500,
				height : 500,
				closeAction : 'hide',
				plain : true,
				modal:false,
				layout : 'fit',
				tbar: [{
					text : '选择',
					icon: 'images/tools-callBack.gif',
					iconCls:'queryfilehis-button',
					id:'selButton',
					handler : function() {
						var selMenuName = document.getElementById("selMenuName").value;
						if(selMenuName == "")
						{
							Appframe.viewinfdlg.error.show("请选择要关联的系统菜单",false);
							return;
						}
						else
						{
							Ext.getCmp("funcName").setValue(selMenuName);
							win.hide();
						}
					}
				}],
				items :sysTree,
				listeners:{
					'show':function(){
						if(sysRoot.childNodes.length == 0)
						{
							pbWin.show();
							Ext.getCmp("selButton").setDisabled(true);
						}
					}
				}
			});
		});
		function jsonDecode(data){
	    	return new Function("return " + data + ";")();
	    }
	</script>
  </head>
  <body>
  	<input type="hidden" id="id"/>
  	<input type="hidden" id="funcId"/>
  	<input type="hidden" id="parentId"/>
  	<input type="hidden" id="selMenuName"/>
  </body>
</html>

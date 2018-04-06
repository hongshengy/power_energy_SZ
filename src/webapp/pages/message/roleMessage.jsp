<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'roleMessage.jsp' starting page</title>
    <jsp:include page="../ext.jsp" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript">
	var roleId = 99627;
	Ext.onReady(function(){
		var root = new Ext.tree.AsyncTreeNode({
			text:'系统消息',
			loader:new Ext.tree.TreeLoader({
				url:'notice/querySysMessageForRole.action?roleId='+roleId
			})
	    });
		var tree = new Ext.tree.TreePanel({
               	collapsible: true,
               	width: 505,
               	lines:true,
               	height:400,
                minSize: 175,
                maxSize: 400,
                autoScroll:true,
                id:'roleTree',
                margins:'0 0 5 2',
               	root:root,
               	listeners:{
               		"checkchange": function(node, checked) {
               			if(node.getDepth() != 2)
               			{
               				var childs = node.childNodes;
							if(childs)
							{
								setNodeCheckStatus(node,childs);
							}
               			}
               			else
               			{
               				if(node.attributes.checked == false)
               				{
               					node.parentNode.ui.checkbox.checked = false;
               				}
               				else
               				{
               					var checked = true;
               					var childNodes = node.parentNode.childNodes;
               					for(var i=0;i<childNodes.length;i++)
               					{
               						if(childNodes[i].attributes.checked == false)
               						{
               							checked = false;
               							break;
               						}
               					}
               					node.parentNode.ui.checkbox.checked = checked;
               				}
               			}
					}
               }
		});
		tree.expandAll();
		var panel = new Ext.Panel({
				layout:'form',
				tbar: [
					new Ext.Button({
						text: '保存',
						icon:'images/saveIco.png',
						iconCls:'queryfilehis-button',
						id:'saveBtn',
						handler:function(){
							var checkedNodes = tree.getChecked();
							var a = new Array();
							for(var i=0;i<checkedNodes.length;i++)
							{	
								if(checkedNodes[i].getDepth() != 2)
								{
									continue;
								}
								var obj = new Object();
								obj.messageType=checkedNodes[i].attributes.id;
								a.push(obj);
							}
							Ext.Ajax.request({
										url: gdc.webContextRoot + 'notice/saveRoleMessageConfig.action',
										params: {
											'param': Ext.encode(a),
											'roleId':roleId
										},
										success: function(result, request) 
										{
											//var obj = eval('('+result.responseText+')');
											var obj=jsonDecode(result.responseText);
											if(obj.result == true)
											{
												Appframe.viewinfdlg.right.show('保存成功！', true);
											}
											else
											{
												Appframe.viewinfdlg.error.show(obj.msg, false);
											}
										},
										faliure:function(){
											parent.Ext.MessageBox.alert('提示', '发表失败');
											return ;
										}
							});
						}
					})
				],
				layout: 'fit',
				width: 550,
				height: 500,
				items: [
					tree
				]
			});
			// 发表新帖窗口
			var topicWindow = new Ext.Window({
				title: '角色消息订阅',
				layout: 'fit',
				modal: true,
				resizable: false,
				draggable:true,
				width: 550,
				height: 500,
				closeAction: 'hide',
				listeners: {
					'hide':function(){
					},
					'show':function(){
					}
				},
				items: panel
			});
			topicWindow.show();
	});
	function setNodeCheckStatus(node,childs)
	{
		for(var n=0;n<childs.length;n++)
		{
			childs[n].ui.toggleCheck(node.attributes.checked);
			var cchilds = childs[n].childNodes;
			if(cchilds)
			{
				setNodeCheckStatus(childs[n],cchilds);
			}
		}
	}
	function jsonDecode(data){
    	return new Function("return " + data + ";")();
    }
	</script>
  </head>
  
  <body>
  </body>
</html>

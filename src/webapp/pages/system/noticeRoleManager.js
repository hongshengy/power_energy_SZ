/**
 * <p>Title: 购电侧系统</p>
 * <p>Description:用户消息配置</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
/**用户消息配置*/
Ext.namespace("com.frontier.gdc.system.noticeRoleManager");

//******************************************************数据集合树*******************************************
//弹出数据集合树window
com.frontier.gdc.system.noticeRoleManager.showNoticeTreeWindow = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationRoleManager.grid.getSelectionModel().getSelected();
	if (record) {
		var rows = com.frontier.gdc.system.oprationRoleManager.grid.getSelections();
		if (rows.length > 1) {
			Appframe.viewinfdlg.warning.show('只能选择一个角色进行授权！');
			return false;
		} 
		var roleId = rows[0].get("id");
		com.frontier.gdc.system.noticeRoleManager.roleUserRoleId = roleId;
		
	} else {
		Appframe.viewinfdlg.warning.show('请选择要授权的业务角色！');
		return false;
	}
	
	if(com.frontier.gdc.system.noticeRoleManager.dataTreeWindow){
	    com.frontier.gdc.system.noticeRoleManager.dataTreeWindow.close();
	}
	
	var root = new Ext.tree.AsyncTreeNode({
			text:'系统消息',
			loader:new Ext.tree.TreeLoader({
				url:'message/querySysMessageForRole.action?roleId='+roleId
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
								com.frontier.gdc.system.noticeRoleManager.setNodeCheckStatus(node,childs);
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
							var pbWin = gdc.component.ProgressBar;
							pbWin.show();
							Ext.Ajax.request({
										url: gdc.webContextRoot + 'message/saveRoleMessageConfig.action',
										params: {
											'param': Ext.encode(a),
											'roleId':roleId
										},
										success: function(result, request) 
										{
											pbWin.hide();
											var obj = eval('('+result.responseText+')');
											if(obj.result == true)
											{
												Appframe.viewinfdlg.right.show('保存成功！', true);
											}
											else
											{
												Appframe.viewinfdlg.error.show(obj.msg, false);
											}
											com.frontier.gdc.system.noticeRoleManager.dataTreeWindow.close();
										},
										faliure:function(){
											pbWin.hide();
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
	
	com.frontier.gdc.system.noticeRoleManager.dataTreeWindow = new Ext.Window({
				title: '角色消息授权',
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
	com.frontier.gdc.system.noticeRoleManager.dataTreeWindow.show();
	
}
//设置tree的checkbox的选中状态
com.frontier.gdc.system.noticeRoleManager.setNodeCheckStatus=function(node,childs)
{
		for(var n=0;n<childs.length;n++)
		{
			childs[n].ui.toggleCheck(node.attributes.checked);
			var cchilds = childs[n].childNodes;
			if(cchilds)
			{
				com.frontier.gdc.system.noticeRoleManager.setNodeCheckStatus(childs[n],cchilds);
			}
		}
}
//用户消息配置保存
com.frontier.gdc.system.noticeRoleManager.noticeRoleSubmit = function(){
    var checkedNodes = com.frontier.gdc.system.noticeRoleManager.tree.getChecked();
    var startTime = "";
    var endTime = "";
    if(com.frontier.gdc.system.noticeRoleManager.isMessage == 1){
         startTime = Ext.getCmp('beginTime').getRawValue();
         endTime = Ext.getCmp('endTime').getRawValue();
         if(startTime>endTime){
            Ext.MessageBox.alert("提示信息","开始时间大于结束时间");
            return;
         }
    }
	var json = "[";
	if(checkedNodes){
		for(var i=0;i<checkedNodes.length;i++){
			var id = checkedNodes[i].id;
			if(id=='0'){
				continue;
			}
			if(!checkedNodes[i].attributes.leaf){
				continue;
			}
			if(i!=checkedNodes.length-1){
				json += "{id:" + id + ','
				    +"type:'"+checkedNodes[i].attributes.messageVal + '\','
				    +"sendWebValue:'"+checkedNodes[i].attributes.sendWebValue + '\','
				    +"sendMessageValue:'"+checkedNodes[i].attributes.sendMessageValue + '\','
				    +"showTypeValue:'"+checkedNodes[i].attributes.showTypeValue+ '\','
				    +"startTime:'"+ startTime+ '\','
				    +"endTime:'"+ endTime
				    +"'},";
			}else{
				json += "{id:" + id + ','
				    +"type:'"+checkedNodes[i].attributes.messageVal + '\','
				    +"sendWebValue:'"+checkedNodes[i].attributes.sendWebValue + '\','
				    +"sendMessageValue:'"+checkedNodes[i].attributes.sendMessageValue + '\','
				    +"showTypeValue:'"+checkedNodes[i].attributes.showTypeValue+ '\','
				    +"startTime:'"+ startTime+ '\','
				    +"endTime:'"+ endTime
				    +"'}";
			}
		}
		json += "]";
	}
	Ext.Ajax.request({
		url : gdc.webContextRoot + 'noticeRoleTree/authorizeNoticeToRole.action',
		params : {"roleId" : com.frontier.gdc.system.noticeRoleManager.roleUserRoleId,"noticeRoleJson" : json},
		success : function(result,request) {
			var res = result.responseText;
			var tem = eval('('+res+')');
			if(tem.success==true){
				com.frontier.gdc.system.noticeRoleManager.dataTreeWindow.hide();
				Appframe.viewinfdlg.parent.right.show("操作成功！",true);
			}
		}
	});
    
}


//********************************************树loader设置*****************************************************
//加载loader
com.frontier.gdc.system.noticeRoleManager.loader = new Ext.tree.TreeLoader({
	url : gdc.webContextRoot+"noticeRoleTree/findNoticeTree.action",
	listeners:{
	    'beforeload':function(loader,node) {
	    	this.baseParams.roleId = com.frontier.gdc.system.noticeRoleManager.roleUserRoleId;
	    }
	},
	//uiProvider 属性
	baseAttrs : {uiProvider : Ext.ux.TreeCheckNodeUI}
})



//********************************************创建树*******************************************************
/**
 * 创建消息配置树
 */
com.frontier.gdc.system.noticeRoleManager.tree = null;
com.frontier.gdc.system.noticeRoleManager.expandNodeArray = [];
com.frontier.gdc.system.noticeRoleManager.createNoticeRoleTree = function(){
	var tree = new Ext.tree.TreePanel({
		layout:'fit',
		onlyLeafCheckable : false,
		//checkModel : 'cascade', 对树的级联多选
		//title:'数据集合树',
		root:new Ext.tree.AsyncTreeNode({id :'0',text:'用户消息树'}),
		loader : com.frontier.gdc.system.noticeRoleManager.loader,
		rootVisible : true,
		autoScroll : true,
		listeners:{
			"checkchange": function(node,checked) {
				var childs = node.childNodes;
				if(childs){
					com.frontier.gdc.system.noticeRoleManager.relatingCheck(node,childs);
				}
			},
			"expandnode": function(node) {
				com.frontier.gdc.system.noticeRoleManager.expandnodeFunc(node);
			},
			"check": function(node, checked) {
				com.frontier.gdc.system.noticeRoleManager.checkFunc(node,checked);
			}
		}
	});
	com.frontier.gdc.system.noticeRoleManager.tree = tree;
	tree.expandAll();
	Ext.Ajax.request({
		url : gdc.webContextRoot + 'noticeRoleTree/queryRoleMessageTime.action',
		params : {"roleId" : com.frontier.gdc.system.noticeRoleManager.roleUserRoleId},
		success : function(result,request) {
			var res = result.responseText;
			var tem = eval('('+res+')');
			if(tem.success==true){
				if(!tem.noticeRoleTree){
				    Ext.getCmp("beginTime").setRawValue("08:30");
				}else{
				    Ext.getCmp("beginTime").setRawValue(tem.noticeRoleTree.startTime);
				}
				if(!tem.noticeRoleTree){
				    Ext.getCmp("endTime").setRawValue("17:00");
				}else{
				    Ext.getCmp("endTime").setRawValue(tem.noticeRoleTree.endTime);
				}
			}
		}
	});
	return tree;
}


//********************************************树事件调用方法***************************************************
//节点关联选择方法
com.frontier.gdc.system.noticeRoleManager.relatingCheck = function(node,childs){
	for(var n=0;n<childs.length;n++){
		childs[n].ui.toggleCheck(node.attributes.checked);
		if(childs[n].expanded){
			var cchilds = childs[n].childNodes;
			if(cchilds){
				com.frontier.gdc.system.noticeRoleManager.relatingCheck(childs[n],cchilds);
			}
		}
	}
}

//展开节点调用方法
com.frontier.gdc.system.noticeRoleManager.expandnodeFunc = function(node){
	if(com.frontier.gdc.system.noticeRoleManager.expandNodeArray.indexOf(node)>-1){
		com.frontier.gdc.system.noticeRoleManager.leverChildCheck(node)
		return false;
	}else{
		com.frontier.gdc.system.noticeRoleManager.expandNodeArray.push(node);
		var childs = node.childNodes;
		if(childs){
			if(node.attributes.checked==true){
				for(var n=0;n<childs.length;n++){
					childs[n].ui.toggleCheck(true);
				}
			}
		}
	}
}

//子节点级联选择调用方法
com.frontier.gdc.system.noticeRoleManager.leverChildCheck = function(node){
	var childs = node.childNodes;
	if(childs){
		for(var n=0;n<childs.length;n++){
			if(childs[n].attributes.checked==true){
				childs[n].ui.toggleCheck(true);
				if(childs[n].isExpanded()){
					com.frontier.gdc.system.noticeRoleManager.leverChildCheck(childs[n]);
				}
			}
		}
	}
}

//节点选择调用方法
com.frontier.gdc.system.noticeRoleManager.checkFunc = function(node,checked){
    //获取发送方式
    var sendType = Ext.getCmp('sendType').items;
    var strSendType = "";
    var sendWebValue = 0;
    var sendMessageValue = 0;
    for(var i=0;i<sendType.length;i++){
        if(sendType.itemAt(i).checked){
            if(strSendType == ""){
               strSendType+=sendType.itemAt(i).boxLabel;
            }else{
               strSendType = strSendType + "," + sendType.itemAt(i).boxLabel;
            }
        }
        if(i==0){
           if(sendType.itemAt(0).checked){
              sendWebValue = 1;
           }else{
              sendWebValue = 0;
           }
        }
        if(i==1){
           if(sendType.itemAt(1).checked){
              sendMessageValue = 1;
              com.frontier.gdc.system.noticeRoleManager.isMessage = 1;
           }else{
              sendMessageValue = 0;
              com.frontier.gdc.system.noticeRoleManager.isMessage = 0;
           }
        }
    }
    
    //获取展现方式
	/*var showItems = Ext.getCmp('showType').items;
	var showType = "";
	var showTypeValue = "";
	if(showItems){
		for(var i=0;i<showItems.length;i++){
			if(showItems.get(i).checked){
				showType = '('+showItems.get(i).boxLabel+')';
				showTypeValue = showItems.get(i).inputValue;
			}
		}
	}*/
    
	//获取radio值
	var items = Ext.getCmp('noticeTypeLevel').items;
	var messageLevel="";
	var messageVal="";
	if(items){
		for(var i=0;i<items.length;i++){
			if(items.get(i).checked){
				messageLevel = '('+items.get(i).boxLabel+')';
				messageVal = items.get(i).inputValue;
			}
		}
	}
	
	var text = node.text;
	if(node.text.indexOf('信息)')>=0){
		text = node.text.substring(0,node.text.indexOf('信息)')-3);
	}
	
	//设置node text
	if(checked==true){
		if(node.attributes.leaf){
		   if(!strSendType){
		      node.setText(text+'<font color="blue">'+messageLevel+'</font>');
		   }else{
		      node.setText(text+'<font color="blue">'+messageLevel+'('+strSendType+')'+'</font>');
		   }
		   node.attributes.messageVal = messageVal;
		   node.attributes.sendWebValue = sendWebValue;
		   node.attributes.sendMessageValue = sendMessageValue;
		   node.attributes.showTypeValue = 1;
		   /*if(sendMessageValue==1){
		       node.attributes.startTime = Ext.getCmp('beginTime').getRawValue();
		       node.attributes.endTime = Ext.getCmp('endTime').getRawValue();
		   }else{
		       node.attributes.startTime = null;
		       node.attributes.endTime = null;
		   }*/
		}
	}else{
		  node.setText(text);
		  delete node.attributes.messageVal;
		  delete node.attributes.sendWebValue;
		  delete node.attributes.sendMessageValue;
		  delete node.attributes.showTypeValue;
		  //delete node.attributes.startTime;
		  //delete node.attributes.endTime;
	}
	
}



//********************************************数据结合树 配合panel**********************************************
//数据结合树 配合panel
com.frontier.gdc.system.noticeRoleManager.leverChildCheck.noticeTypeLevel = new Ext.form.FormPanel({
	height: 90,
	width : 500,
	labelWidth :60,
	items:[
		{
            xtype: 'radiogroup',
            fieldLabel: '消息等级',
            id:'noticeTypeLevel',
            items: [
                {boxLabel: '严重信息', name: 'purview', inputValue: 1,checked:true},
                {boxLabel: '一般信息', name: 'purview', inputValue: 2},
                {boxLabel: '提示信息', name: 'purview', inputValue: 3}
            ]
         },
         {
                xtype: 'checkboxgroup',
                fieldLabel: '发送方式',
                id:'sendType',
                items: [
                    {boxLabel: 'WEB推送',name:'1',checked: true},
                    {boxLabel: '手机短信',
                      name:'2',
                      listeners : {
                        	'check' : function(obj,checked){
                        		if(checked){
                        		    Ext.getCmp('sendTime').show();
                        		}else{
                        		    Ext.getCmp('sendTime').hide();
                        		}
                        	}
                        } 
                    }
                ]
          },
          /*{
                xtype: 'radiogroup',
                fieldLabel: '展现方式',
                id:'showType',
                items: [
                    {boxLabel:'弹窗',name: 'showTypeValue',inputValue:1,checked:true},
                    {boxLabel:'闪烁',name: 'showTypeValue',inputValue:2}
                ]
          },*/
          {
			    layout:'column',
			    border:false,
			    baseCls: 'x-plain',
			    id:'sendTime',
			    hidden:true,
			    anchor:'100%',
			    items:[
	   	                      { 
	   	                        columnWidth:.5,
	   	                        layout: 'form',
	   	                        baseCls: 'x-plain',
	   	                        border:false,
	   	                        items:[{id : 'beginTime',
										xtype : 'dateTime',
							            format:"H:i",
										fieldLabel : '发送时段',
										readOnly : true
									  }]
	   	                      },{
	   	                        columnWidth:.5,
	   	                        layout: 'form',
	   	                        border:false,
	   	                        baseCls: 'x-plain',
	   	                        items:[{id : 'endTime',
										xtype : 'dateTime',
							            format:"H:i",
										fieldLabel : '至',
										readOnly : true 
									   }]
	   	                      }
	                     ]
			}
         
	]
});


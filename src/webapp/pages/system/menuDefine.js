/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 菜单功能定义</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("com.frontier.gdc.system.menuDefine");

//提交类型
com.frontier.gdc.system.menuDefine.submitType = '';
//提交的form  funcForm、objFrom
com.frontier.gdc.system.menuDefine.formType = 'form';
//系统id
com.frontier.gdc.system.menuDefine.systemId = '';
//上级节点id
com.frontier.gdc.system.menuDefine.funcParentId = '';
//节点id
com.frontier.gdc.system.menuDefine.funcSelfId = ''
//节点id
com.frontier.gdc.system.menuDefine.funcIsInit = ''

//添加radiogroup 、checkboxgroup回写功能
Ext.override(Ext.form.BasicForm,{
    findField : function(id){        
        var field = this.items.get(id);        
        if(!field){
            this.items.each(function(f){
                if(f.isXType('radiogroup')||f.isXType('checkboxgroup')){
                    f.items.each(function(c){
                        if(c.isFormField && (c.dataIndex == id || c.id == id || c.getName() == id)){
                            field = c;
                            return false;
                        }
                    });
                }
                                
                if(f.isFormField && (f.dataIndex == id || f.id == id || f.getName() == id)){
                    field = f;
                    return false;
                }
            });
        }
        return field || null;
    } 
});

//菜单树(权限功能node的id为 （系统id，权限对象id）；权限对象node的id为（权限对象id）)
com.frontier.gdc.system.menuDefine.tree = null;
com.frontier.gdc.system.menuDefine.createTree = function(){
	var tree = new Ext.tree.TreePanel({
		region : 'west',
		layout:'fit',
		rootVisible : false,
		autoScroll : true,
		enableDD : true,
		loader : new Ext.tree.TreeLoader({
			dataUrl : gdc.webContextRoot+'sysFunc/findSysFuncOrObjectTree.action'
		})
	});
	var root = new Ext.tree.AsyncTreeNode({
		id : '-100',
		text : '电厂树'
	});
	tree.setRootNode(root);
	tree.on('click',function(node){
		if(!node.isLeaf()){
			node.expand();
		}
		var samFunc = Ext.getCmp('samFunc');
		var lowerFunc = Ext.getCmp('lowerFunc');
		var obj = Ext.getCmp('obj');
		var newButton = Ext.getCmp('New');
		var updateButton = Ext.getCmp('Update');
		var deleteButton = Ext.getCmp('Delete');
		//系统节点
		var ids = node.id.split(',');
		var pid = node.parentNode.id;
		if(pid==-100){
			//newButton.setDisabled(false);
			//updateButton.setDisabled(true);
			//deleteButton.setDisabled(true);
			lowerFunc.setDisabled(false);
			obj.setDisabled(true);
			samFunc.setDisabled(true);
			
			//systemId、功能父节点 赋值
			com.frontier.gdc.system.menuDefine.funcParentId = 0;
			com.frontier.gdc.system.menuDefine.funcSelfId = 0;
			com.frontier.gdc.system.menuDefine.systemId = ids[0];
			
			com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.form);
			com.frontier.gdc.system.menuDefine.tabs.unhideTabStripItem(com.frontier.gdc.system.menuDefine.systemForm);
			com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.objForm);
			com.frontier.gdc.system.menuDefine.systemForm.show();
			Ext.getCmp('systemCode').setValue(node.attributes.busiCode);
			Ext.getCmp('systemName').setValue(node.text);
			Ext.getCmp('systemId').setValue(node.id);
			return;
		}
		//功能或对象节点
		com.frontier.gdc.system.menuDefine.submitType = 'update';
		
		if(node.attributes.type=='SysObject'){
			//updateButton.setDisabled(false);
			//deleteButton.setDisabled(false);
			samFunc.setDisabled(true);
			lowerFunc.setDisabled(true);
			obj.setDisabled(true);
			
			com.frontier.gdc.system.menuDefine.formType = 'objForm';
			com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.form);
			com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.systemForm);
			com.frontier.gdc.system.menuDefine.tabs.unhideTabStripItem(com.frontier.gdc.system.menuDefine.objForm);
			com.frontier.gdc.system.menuDefine.objForm.show();
			com.frontier.gdc.system.menuDefine.loadObjFormData(node.id)
		}else if(node.attributes.type=='SysFunc'){
			//newButton.setDisabled(false);
			//updateButton.setDisabled(false);
			//deleteButton.setDisabled(false);
			samFunc.setDisabled(false);
			lowerFunc.setDisabled(false);
			obj.setDisabled(false);
			
			//systemId、功能父节点 赋值
			var pids = node.parentNode.id.split(',');
			com.frontier.gdc.system.menuDefine.funcParentId = pids[1];
			com.frontier.gdc.system.menuDefine.systemId = ids[0];
			com.frontier.gdc.system.menuDefine.funcSelfId = ids[1]
			//记录是否为系统初始化功能
			com.frontier.gdc.system.menuDefine.funcIsInit = node.attributes.isInit;
			
			com.frontier.gdc.system.menuDefine.formType = 'form';
			com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.objForm);
			com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.systemForm);
			com.frontier.gdc.system.menuDefine.tabs.unhideTabStripItem(com.frontier.gdc.system.menuDefine.form);
			com.frontier.gdc.system.menuDefine.form.show();
			com.frontier.gdc.system.menuDefine.loadFormData(ids[1]);
			
		}
		
	});
	tree.on('beforeload',function(node,deep,anim){
		var pNode = node.parentNode;
		if(pNode){
			if(pNode.id==-100){
				var nodeIds = node.id.split(',');
				com.frontier.gdc.system.menuDefine.systemId = nodeIds[0];
			}
		}
	});
//	tree.on('dragdrop', function(t,node,dd,e){
//		 alert(node.text); //源节点id 
//		 alert('父节点：'+node.parentNode.text); //目标父节点id
//		 alert('后一个节点：'+node.nextSibling ? node.nextSibling.text : ""); //下一个节点id，用于拖动插入某节点到另一节点之前/后 7: 
//		 alert('前一个节点：'+node.previousSibling ? node.previousSibling.text : ""); //前一个节点id
//	},this);
	tree.on('beforemovenode', function(tree,node,oldParent,newParent,index){
		//拖动检查
		var flag = com.frontier.gdc.system.menuDefine.moveFuncCheck(node,oldParent,newParent);
		if(flag==false){
			return false;
		}
		
		var npid = '';
		var id = '';
		var opid = '';
		//获取新父节点id
		var npids = newParent.id.split(',');
		if(npids.length>1){
			npid = npids[1];
		}else{
			npid = newParent.id;
		}
		//获取旧父节点id
		var opids = oldParent.id.split(',');
		if(opids.length>1){
			opid = opids[1];
		}else{
			opid = oldParent.id;
		}
		//获取拖动节点id
		var ids = node.id.split(',');
		if(ids.length>1){
			id = ids[1];
		}else{
			id = node.id;
		}
		//发送请求
		var moveResult = npid+','+id+','+index;
		Ext.Ajax.request({
			url : gdc.webContextRoot + '/sysFunc/moveFunc.action',
			params : {"moveResult":moveResult},
			success : function(result,request) {
				var resl = result.responseText;
				var tem = eval('('+resl+')');
				if(tem.success==true){
					Appframe.viewinfdlg.right.show("拖动成功！", true);
				}
			}
		});
	});

	//com.frontier.gdc.system.menuDefine.root.expand();
	com.frontier.gdc.system.menuDefine.tree = tree;
	return com.frontier.gdc.system.menuDefine.tree;
}

/**
 * 检查节点是否能拖动
 * @param {} node   拖动节点
 * @param {} oldParent  旧父节点
 * @param {} newParent  新父节点
 */
com.frontier.gdc.system.menuDefine.moveFuncCheck = function(node,oldParent,newParent){
	var flag = true;
	var oids = oldParent.id.split(',');
	var nids = newParent.id.split(',');
	if(node.attributes.type=='SysObject' || node.parentNode.id==-100){
		Ext.MessageBox.alert('提示', '非功能节点不能拖动！');
		flag = false;
	}else if(oids[0]!=nids[0]){
		Ext.MessageBox.alert('提示', '系统之间不能互相拖动功能节点！');
		flag = false;
	}else if(com.frontier.gdc.system.menuDefine.isCreateFunc(newParent.id)==false){
		Ext.MessageBox.alert('提示', '功能节点不能拖动到已经有权限对象的功能节点下！');
		flag = false;
	}
	return flag;
}

//菜单form加载方法
com.frontier.gdc.system.menuDefine.loadFormData = function(id) {
	  com.frontier.gdc.system.menuDefine.form.form.load( {
        url : gdc.webContextRoot+'sysFunc/querySysFunc.action?node='+id,
        waitMsg : '正在载入数据...',
        failure : function() {
            //Ext.MessageBox.alert('编辑', '载入失败');
        },
        success : function(form,action) {
//        	var text = action.response.responseText;
//        	text = text.substring(text.indexOf('[')+1,text.indexOf(']'));
//        	var obj = eval('('+text+')');
//        	if(obj.isPop && obj.isPop=='Y'){
//        		Ext.getCmp('isp').setValue(true);
//        	}
           //Ext.MessageBox.alert('编辑', '载入成功！');
        }
    });
}

//菜单form 提交
com.frontier.gdc.system.menuDefine.formSubmit = function(){
	var url = '';
	var loadId = '';	
	var sid = Ext.getCmp('sid').value;;
	if(com.frontier.gdc.system.menuDefine.formType=='form'){
		if('insert'==com.frontier.gdc.system.menuDefine.submitType){
			url = 'sysFunc/insertSysFunc.action';
		}else if('update'==com.frontier.gdc.system.menuDefine.submitType){
			url = 'sysFunc/updateSysFunc.action';
		}else if('delete'==com.frontier.gdc.system.menuDefine.submitType){
			url = 'sysFunc/deleteSysFunc.action';
		}
		loadId = Ext.getCmp('pid').value;
		
		if (com.frontier.gdc.system.menuDefine.form.form.isValid(com.frontier.gdc.system.menuDefine.form)) {
			//Ext.Msg.confirm('确认删除', '你确认要删除吗？', function(btn) {})
			if('delete'==com.frontier.gdc.system.menuDefine.submitType){
				if(com.frontier.gdc.system.menuDefine.funcIsInit=='Y'){
					Appframe.viewinfdlg.warning.show('此节点是系统初始化节点不能删除！');
					return;
				}
				Ext.Msg.confirm('确认删除', '你确认要删除吗？', function(btn) {
					if (btn == 'yes') {
						com.frontier.gdc.system.menuDefine.form.form.submit( {
				            url : gdc.webContextRoot+url,
				            success : function(from, action) {
				            	Appframe.viewinfdlg.parent.right.show("操作成功！",true);
				            	if(com.frontier.gdc.system.menuDefine.tree.getNodeById(sid+','+loadId)){
				            		
					            	//执行删除操作时,重新初始化form内容
				            		var parNode = com.frontier.gdc.system.menuDefine.tree.getNodeById(sid+','+loadId);
				            		if(parNode){
				            			parNode.fireEvent('click',parNode);
				            		}
					            	
					            	//刷新树
				            		com.frontier.gdc.system.menuDefine.treeRefresh(sid+','+loadId)
				            		
				            	}
				            	
				            },failure : function(form, action) {
				               //Appframe.viewinfdlg.error.show("操作失败！");
				            },
				            waitMsg : '正在保存数据，稍后...'
				        })
					}
		        })
			}else{
		        com.frontier.gdc.system.menuDefine.form.form.submit( {
		            url : gdc.webContextRoot+url,
		            success : function(from, action) {
		            	Appframe.viewinfdlg.parent.right.show("操作成功！",true);
		            	if(com.frontier.gdc.system.menuDefine.tree.getNodeById(sid+','+loadId)){
		            		
			            	//刷新树
		            		com.frontier.gdc.system.menuDefine.treeRefresh(sid+','+loadId)
		            		
		            	}
		            	
		            },failure : function(form, action) {
		               //Appframe.viewinfdlg.error.show("操作失败！");
		            },
		            waitMsg : '正在保存数据，稍后...'
		        });
			}
	    }
	}else if(com.frontier.gdc.system.menuDefine.formType=='objForm'){
		if('insert'==com.frontier.gdc.system.menuDefine.submitType){
			url = 'sysObject/insertSysObject.action';
		}else if('update'==com.frontier.gdc.system.menuDefine.submitType){
			url = 'sysObject/updateSysObject.action';
		}else if('delete'==com.frontier.gdc.system.menuDefine.submitType){
			url = 'sysObject/deleteSysObject.action';
		}
		loadId = Ext.getCmp('funcId').value;
		if (com.frontier.gdc.system.menuDefine.objForm.form.isValid(com.frontier.gdc.system.menuDefine.objForm)) {
			if('delete'==com.frontier.gdc.system.menuDefine.submitType){
				Ext.Msg.confirm('确认删除', '你确认要删除吗？', function(btn) {
					if (btn == 'yes') {
						com.frontier.gdc.system.menuDefine.objForm.form.submit( {
				            url : gdc.webContextRoot+url,
				            success : function(from, action) {
				            	Appframe.viewinfdlg.parent.right.show("操作成功！",true);
				            	
				            	//执行删除操作时,重新初始化form内容
			            		var parNode = com.frontier.gdc.system.menuDefine.tree.getNodeById(sid+','+loadId);
			            		if(parNode){
			            			parNode.fireEvent('click',parNode);
			            		}
					            		
					            	
				            	if(com.frontier.gdc.system.menuDefine.tree.getNodeById(com.frontier.gdc.system.menuDefine.systemId+','+loadId)){
				            		com.frontier.gdc.system.menuDefine.treeRefresh(com.frontier.gdc.system.menuDefine.systemId+','+loadId)
				            	}
				            },failure : function(form, action) {
				                //Appframe.viewinfdlg.error.show("操作失败！");
				            },
				            waitMsg : '正在保存数据，稍后...'
				        });
					}
				})
			}
			else{
		        com.frontier.gdc.system.menuDefine.objForm.form.submit( {
		            url : gdc.webContextRoot+url,
		            success : function(from, action) {
		            	Appframe.viewinfdlg.parent.right.show("操作成功！",true);
		            	
		            	if(com.frontier.gdc.system.menuDefine.tree.getNodeById(com.frontier.gdc.system.menuDefine.systemId+','+loadId)){
		            		com.frontier.gdc.system.menuDefine.treeRefresh(com.frontier.gdc.system.menuDefine.systemId+','+loadId)
		            	}
		            },failure : function(form, action) {
		               // Appframe.viewinfdlg.error.show("操作失败！");
		            },
		            waitMsg : '正在保存数据，稍后...'
		        });
			}
		}
	}
}

//树刷新
com.frontier.gdc.system.menuDefine.treeRefresh = function(nodeId){
	var node = com.frontier.gdc.system.menuDefine.tree.getNodeById(nodeId)
	if(node.isLeaf()){
		node.parentNode.reload();
	}else{
		node.reload();
	}
}

//菜单form reader
com.frontier.gdc.system.menuDefine.jsonFormReader = new Ext.data.JsonReader({
		root : 'list',
		id : 'id',
		successProperty : '@success'
	},
	[ {
		name : 'sysFunc.id',
        mapping : 'id',
        type : 'float'
    },{
    	name : 'sysFunc.systemId',
        mapping : 'systemId',
        
        type : 'float'
    },{
    	name : 'sysFunc.parentId',
        mapping : 'parentId',
        
        type : 'float'
    }, {
    	name : 'sysFunc.funcCode',
        mapping : 'funcCode',
        
        type : 'string'
    }, {
    	name : 'sysFunc.funcName',
        mapping : 'funcName',
        
        type : 'string'
    }, {
    	name : 'sysFunc.busiCode',
        mapping : 'busiCode',
        
        type : 'string'
    }, {
    	name : 'sysFunc.funcType',
        mapping : 'funcType',
        
        type : 'string'
    }, {
    	name : 'sysFunc.isAvaliable',
        mapping : 'isAvaliable',
        
        type : 'string'
    }, {
        name : 'sysFunc.funcUrl',
        mapping : 'funcUrl',
        type : 'string'
    }, {
    	name : 'sysFunc.helpUrl',
        mapping : 'helpUrl',
        
        type : 'string'
    }, {
    	name : 'sysFunc.isPop',
        mapping : 'isPop',
        type : 'string'
    }
    , {
    	name : 'sysFunc.funcIco',
        mapping : 'funcIco',
        type : 'string'
    }

]);

//菜单form
com.frontier.gdc.system.menuDefine.form = new gdc.FormPanel({
	//region : 'center',
	//layout:'fit',
	title: '功能',
	labelWidth : 95,
	labelAlign : 'right',
	frame : true,
	bodyStyle : 'padding:5px 5px 0',
	defaults : {
		width : 400
	},
	reader:com.frontier.gdc.system.menuDefine.jsonFormReader,
	items:[
		new Ext.form.Hidden({
              fieldLabel: '功能编号',
              name: 'sysFunc.funcCode',
              //allowBlank:false,
              maxLength : 30,
			  maxLengthText : "输入的字符不能超过30位"
    	}),new Ext.form.TextField({
              fieldLabel: '功能名称',
              name: 'sysFunc.funcName',
              allowBlank:false,
              maxLength : 30,
			  maxLengthText : "输入的字符不能超过30位"
    	}),new Ext.form.TextField({
              fieldLabel: '业务编码',
              name: 'sysFunc.busiCode',
              allowBlank:false,
              maxLength : 30,
			  maxLengthText : "输入的字符不能超过30位"
    	}), 
    	new Ext.form.Hidden({
              fieldLabel: '授权类型',
              name: 'sysFunc.funcType',
              value:'A'
    	}),
//    	new Ext.form.ComboBox({
//				fieldLabel : '授权类型',
//				hiddenName : 'sysFunc.funcType',
//				triggerAction:'all',
//				store:new Ext.data.SimpleStore({
//					fields: ['val','tex'],
//					data: [
//						['F','自由使用'],
//						['A','授权使用']
//					]
//				}),
//				valueField:'val',
//				displayField:'tex',
//				mode:'local',
//				forceSelection:true,
//				allowBlank:false,
//				resizable:true,
//				editable:false
//		}),
		new Ext.form.ComboBox({
				fieldLabel : '状态',
				hiddenName : 'sysFunc.isAvaliable',
				triggerAction:'all',
				store:new Ext.data.SimpleStore({
					fields: ['val','tex'],
					data: [
						['Y','启用'],
						['N','停用']
					]
				}),
				valueField:'val',
				displayField:'tex',
				mode:'local',
				forceSelection:true,
				resizable:true,
				allowBlank:false,
				editable:false
		})
//		,new Ext.form.Checkbox({
//			//hideLabel:true,
//			id:'isp',
//    		name:'sysFunc.isPop',
//			inputValue :'Y',
//	    	fieldLabel : '弹出形式打开',
//            boxLabel: ''
//		})
		,{
	        xtype: 'radiogroup',
	        fieldLabel: '打开形式',
	        id:'rg',
	        items: [
	            {boxLabel: '跟框架一致', name: 'sysFunc.isPop', inputValue: 'N',checked:true},
	             {boxLabel: 'window形式弹出', name: 'sysFunc.isPop', inputValue: 'Y'},
	            {boxLabel: '浏览器形式弹出', name: 'sysFunc.isPop', inputValue: 'O'}
	        ]
	    },
	    new Ext.form.TextField({
	    	 id:'icon',
	    	 fieldLabel : '功能图标',
			 name : 'sysFunc.funcIco',
			 listeners:{
			 	focus:function(){
			 		com.frontier.gdc.system.menuDefine.funcIcon();
			 	}
			 }
		}),new Ext.form.TextArea({
	    	 fieldLabel : '功能连接',
			 name : 'sysFunc.funcUrl',
			 maxLength : 1000,
			 maxLengthText : "输入的字符不能超过1000位"
			 //allowBlank:false,
			 //anchor:'40%'
	    }),new Ext.form.TextArea({
	    	 fieldLabel : '帮助连接',
			 name : 'sysFunc.helpUrl',
			 maxLength : 1000,
			 maxLengthText : "输入的字符不能超过1000位"
			 //anchor:'40%'
	    }),new Ext.form.Hidden({
	    	 id:'id',
	    	 fieldLabel : 'ID',
			 name : 'sysFunc.id',
			 
			 anchor:'40%'
	    })
	    ,new Ext.form.Hidden({
	    	 id:'sid',
	    	 fieldLabel : 'systemId',
			 name : 'sysFunc.systemId',
			 anchor:'40%',
			 value:0
		})
	    ,new Ext.form.Hidden({
	    	 id:'pid',
	    	 fieldLabel : 'PID',
			 name : 'sysFunc.parentId',
			 anchor:'40%',
			 value:0
		})
	]
});
//功能图标window
com.frontier.gdc.system.menuDefine.funcIcon = function(){
	var win = Ext.getCmp('funcIconWin');
	if(!win){
		win = new Ext.Window( {
			id:'funcIconWin',
			title : '功能图标',
			width : 555,
			height : 350,
			closeAction : 'hide',
			//layout:'fit',
			plain : true,
			modal:true,
			autoScroll :true,
			buttonAlign :'center'
			
		});
		var panel = new Ext.Panel({
			layout:'table',
        	layoutConfig: {columns:7},
			border:false
		});
		Ext.Ajax.request({
			url : gdc.webContextRoot + '/sysFunc/getFuncIconNames.action',
			//params : {"moveResult":moveResult},
			success : function(result,request) {
				var res = result.responseText;
				var fileNames = res.split(',');
				if(fileNames){
					for(var i=0;i<fileNames.length;i++){
						var name = fileNames[i].replace("'","");
						var index = name.lastIndexOf('_');
						var fname = name.substring(0,index);
						if(name.indexOf('s.gif')>-1 || name.indexOf('active')==-1){
							continue;
						}
						var p = new Ext.Panel({
							layout:'fit',
							border:false,
							html:'<center><img src=././images/desktopIco/'+name+' width="77" height="77" onClick=com.frontier.gdc.system.menuDefine.funcIconClick("'+name+'")></center>'
						});
						panel.add(p);
					}
					win.add(panel);
					win.doLayout();
				}
			}
		});
	}
	win.show();
}

com.frontier.gdc.system.menuDefine.funcIconClick = function(name){
	Ext.getCmp("icon").setValue(name);
	var win = Ext.getCmp("funcIconWin");
	win.hide();
}

//对象form加载方法
com.frontier.gdc.system.menuDefine.loadObjFormData = function(id) {
	  com.frontier.gdc.system.menuDefine.objForm.form.load( {
        url : gdc.webContextRoot+'sysObject/querySysObject.action?id='+id,
        waitMsg : '正在载入数据...',
        failure : function() {
            //Ext.MessageBox.alert('编辑', '载入失败');
        },
        success : function(form,action) {
        	//Ext.MessageBox.alert('编辑', '载入成功！');
        }
    });
}
//对象form reader
com.frontier.gdc.system.menuDefine.jsonObjFormReader = new Ext.data.JsonReader({
		root : 'sysObjectList',
		id : 'id',
		successProperty : '@success'
	},
	[ {
		name : 'sysObject.id',
        mapping : 'id',
        type : 'float'
    },{
    	name : 'sysObject.funcId',
        mapping : 'funcId',
        
        type : 'float'
    }, {
    	name : 'sysObject.objectCode',
        mapping : 'objectCode',
        
        type : 'string'
    }, {
    	name : 'sysObject.objectName',
        mapping : 'objectName',
        
        type : 'string'
    }, {
    	name : 'sysObject.busiCode',
        mapping : 'busiCode',
        
        type : 'string'
    }
]);

//对象form
com.frontier.gdc.system.menuDefine.objForm = new gdc.FormPanel({
	//region : 'center',
	//layout:'fit',
	title: '对象',
	labelWidth : 75,
	labelAlign : 'right',
	frame : true,
	bodyStyle : 'padding:5px 5px 0',
	reader:com.frontier.gdc.system.menuDefine.jsonObjFormReader,
	items:[
		new Ext.form.TextField({
              fieldLabel: '对象编号',
              name: 'sysObject.objectCode',
              allowBlank:false,
              maxLength : 30,
			  maxLengthText : "输入的字符不能超过30位"
    	}),new Ext.form.TextField({
              fieldLabel: '对象名称',
              name: 'sysObject.objectName',
              allowBlank:false,
              maxLength : 30,
			  maxLengthText : "输入的字符不能超过30位"
    	}),new Ext.form.TextField({
              fieldLabel: '业务编码',
              name: 'sysObject.busiCode',
              allowBlank:false,
              maxLength : 30,
			  maxLengthText : "输入的字符不能超过30位"
    	})
    	,new Ext.form.Hidden({
	    	 id:'objId',
	    	 fieldLabel : 'ID',
			 name : 'sysObject.id',
			 anchor:'40%'
	    })
	    ,new Ext.form.Hidden({
	    	 id:'funcId',
	    	 fieldLabel : 'PID',
			 name : 'sysObject.funcId',
			 anchor:'40%',
			 value:0
		})
	]
});

//系统form
com.frontier.gdc.system.menuDefine.systemForm = new gdc.FormPanel({
	//region : 'center',
	//layout:'fit',
	title: '系统',
	labelWidth : 75,
	labelAlign : 'right',
	frame : true,
	bodyStyle : 'padding:5px 5px 0',
	reader:com.frontier.gdc.system.menuDefine.jsonObjFormReader,
	items:[
		new Ext.form.TextField({
			  id:'systemCode',
              fieldLabel: '系统编码',
              name: 'systemCode',
              allowBlank:false,
              readOnly:true,
              value:'系统编码'
              //blankText:''
    	}),new Ext.form.TextField({
    		  id:'systemName',
              fieldLabel: '系统名称',
              name: 'systemName',
              allowBlank:false,
              readOnly:true,
              value:'系统名称'
              //blankText:''
    	}),new Ext.form.Hidden({
    		  id:'systemId',
              fieldLabel: '系统名称',
              name: 'systemName',
              allowBlank:false,
              readOnly:true,
              value:'系统名称'
              //blankText:''
    	})
	]
});

//检查节点下是否能创建权限对象
com.frontier.gdc.system.menuDefine.isCreateObj = function(nodeId){
	var node = com.frontier.gdc.system.menuDefine.tree.getNodeById(nodeId);
	if(node){
		var nodeChildArray = node.childNodes;
		if(nodeChildArray){
			for(var c=0;c<nodeChildArray.length;c++){
				if(nodeChildArray[c].attributes.type=='SysFunc'){
					return false;
				}
			}
		}else{
			return true;
		}
	}
}

//检查节点下是否能创建功能
com.frontier.gdc.system.menuDefine.isCreateFunc = function(nodeId){
	var node = com.frontier.gdc.system.menuDefine.tree.getNodeById(nodeId);
	if(node){
		var nodeChildArray = node.childNodes;
		if(nodeChildArray.length>0){
			for(var c=0;c<nodeChildArray.length;c++){
				if(nodeChildArray[c].attributes.type=='SysObject'){
					return false;
				}
			}
		}else{
			return true;
		}
	}
}

//检查节点是否能创建同级功能
com.frontier.gdc.system.menuDefine.isCreateSamFunc = function(nodeId){
	var node = com.frontier.gdc.system.menuDefine.tree.getNodeById(nodeId);
	if(node){
		if(node.attributes.type=='SysObject'){
			return false;
		}else{
			return true;
		}
	}
}

//新增按钮的下拉项定义
com.frontier.gdc.system.menuDefine.addmenu = new Ext.menu.Menu({
	items:[new Ext.menu.Item({
			id:'samFunc',
			text: '同级功能',
			disabled : true,
			handler:function() {
//				var pid = Ext.getCmp('pid').value;
//				var sid = Ext.getCmp('sid').value;
//				if(Ext.getCmp('Update').disabled==true ){
//					pid = 0;
//				}
				Ext.getCmp('Update').setDisabled(false);
				Ext.getCmp('Delete').setDisabled(false);
				
				com.frontier.gdc.system.menuDefine.formType = 'form';
				com.frontier.gdc.system.menuDefine.submitType = 'insert';
				
				com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.objForm);
				com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.systemForm);
				com.frontier.gdc.system.menuDefine.tabs.unhideTabStripItem(com.frontier.gdc.system.menuDefine.form);
				com.frontier.gdc.system.menuDefine.form.show();
				com.frontier.gdc.system.menuDefine.form.form.reset();
				Ext.getCmp('pid').setValue(com.frontier.gdc.system.menuDefine.funcParentId);
				Ext.getCmp('sid').setValue(com.frontier.gdc.system.menuDefine.systemId);
			}
		}),
		new Ext.menu.Item({
			id:'lowerFunc',
			text: '下级功能',
			disabled : true,
			handler:function(){
				var flag = '';
//				var pid = Ext.getCmp('id').value;
//				var sid = Ext.getCmp('sid').value;   //功能form中的系统id字段
//				//如果此节点为系统节点
//				if(Ext.getCmp('Update').disabled==true){
//					pid = 0;
//					sid = Ext.getCmp('systemId').value;  //系统form中的系统id
//					flag = com.frontier.gdc.system.menuDefine.isCreateFunc(sid);
//				}else{
//					flag = com.frontier.gdc.system.menuDefine.isCreateFunc(sid+','+pid);
//				}
				
				flag = com.frontier.gdc.system.menuDefine.isCreateFunc(com.frontier.gdc.system.menuDefine.systemId+','+com.frontier.gdc.system.menuDefine.funcSelfId);
				
				Ext.getCmp('Update').setDisabled(false);
				Ext.getCmp('Delete').setDisabled(false);
				
				if(flag==false){
					Ext.MessageBox.alert('提示', '此节点下不能创建功能！');
					return false;
				}
				com.frontier.gdc.system.menuDefine.formType = 'form';
				com.frontier.gdc.system.menuDefine.submitType = 'insert';
				com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.objForm);
				com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.systemForm);
				com.frontier.gdc.system.menuDefine.tabs.unhideTabStripItem(com.frontier.gdc.system.menuDefine.form);
				com.frontier.gdc.system.menuDefine.form.show();
				com.frontier.gdc.system.menuDefine.form.form.reset();
				Ext.getCmp('pid').setValue(com.frontier.gdc.system.menuDefine.funcSelfId);
				Ext.getCmp('sid').setValue(com.frontier.gdc.system.menuDefine.systemId);
			}
		}),
		new Ext.menu.Item({
			id:'obj',
			text: '对象',
			disabled : true,
			handler:function(){
//				var fid = Ext.getCmp('id').value;
//				var sid = Ext.getCmp('sid').value;
//				var flag = com.frontier.gdc.system.menuDefine.isCreateObj(sid+','+fid);
				var flag = com.frontier.gdc.system.menuDefine.isCreateObj(com.frontier.gdc.system.menuDefine.systemId+','+com.frontier.gdc.system.menuDefine.funcSelfId);
				if(flag==false){
					Ext.MessageBox.alert('提示', '此节点下不能创建权限对象！');
					return false;
				}
				com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.form);
				com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.systemForm);
				com.frontier.gdc.system.menuDefine.tabs.unhideTabStripItem(com.frontier.gdc.system.menuDefine.objForm);
				com.frontier.gdc.system.menuDefine.objForm.show();
				com.frontier.gdc.system.menuDefine.formType = 'objForm';
				com.frontier.gdc.system.menuDefine.submitType = 'insert';
				com.frontier.gdc.system.menuDefine.objForm.form.reset();
				Ext.getCmp('funcId').setValue(com.frontier.gdc.system.menuDefine.funcSelfId);
				
			}
		})]
});

//form panel
com.frontier.gdc.system.menuDefine.tabs = new Ext.TabPanel({
		region : 'center',
		activeTab: 2,
        frame:true,
        //defaults:{autoHeight: true},
        items:[
        	com.frontier.gdc.system.menuDefine.form,
        	com.frontier.gdc.system.menuDefine.objForm,
        	com.frontier.gdc.system.menuDefine.systemForm
        ]
    });

//导入自定义菜单
com.frontier.gdc.system.menuDefine.importXml = function(){
	var systemNode = com.frontier.gdc.system.menuDefine.tree.getNodeById(com.frontier.gdc.system.menuDefine.systemId+',0');
	if(com.frontier.gdc.system.menuDefine.systemId=='' || !systemNode){
		Ext.MessageBox.alert('提示', '请选择系统节点！');
		return false;
	}
	var systemName = systemNode.text;
	
	var importForm = new gdc.FormPanel({
	labelWidth : 100,
	frame : true,
	//labelAlign : 'right',
	bodyStyle : 'padding:5px 5px 0',
	items:[
			new Ext.form.Hidden({
				fieldLabel: '系统id',
				name: 'systemId',
				anchor:'95%',
				value:com.frontier.gdc.system.menuDefine.systemId,
				allowBlank:false
			}),new Ext.form.TextField({
				fieldLabel: '系统名称',
				//name: 'funcXml',
				anchor:'95%',
				readOnly:true,
				value:systemName,
				allowBlank:false
			}),new Ext.form.TextArea({
				fieldLabel: '功能菜单XML',
				name: 'funcXml',
				anchor:'95%',
				allowBlank:false,
				height:350,
				validator:function(){return true;}
			})
		]
	})
	
	var win = new Ext.Window({
			layout:'fit',
			title:'自定义菜单导入',
			width:640,
			height:460,
			closable:true,
			closeAction:'hide',
			maximizable:true,
			plain: true,
			modal:true,
			tbar:[{
				text: '提交',
				iconCls:'save',
				handler:function(){
					if (importForm.form.isValid(importForm)) {
						importForm.form.submit( {
				            url : gdc.webContextRoot+'sysFunc/importFuncByXML.action',
				            success : function(from, action) {
				            	win.hide();
				            	Appframe.viewinfdlg.parent.right.show("操作成功！",true);
				            },failure : function(form, action) {
				               //Appframe.viewinfdlg.error.show("操作失败！");
				            },
				            waitMsg : '正在导入，稍后...'
				        })
				    }
				}
			},{
				text: '关闭',
				iconCls:'close',
				handler:function(){
					win.hide();				
				}
			}],
			items:[importForm]
		});
		win.show();
}

    
//Ext.onReady(function(){
////com.frontier.gdc.system.menuDefine.newMainPanel = function(){
//	Ext.QuickTips.init();
//	var viewport = new Ext.Viewport({
//	//var panel = new Ext.Panel({
//		layout : 'border',
//		items : [{
//			region : 'center',
//			layout : 'border',
//			border : false,
//			tbar:[
//				{
//					id : 'New',
//					text : '新增',
//					iconCls: 'add', 
//					disabled : true,
//					menu: com.frontier.gdc.system.menuDefine.addmenu,
//					handler:function(){
//						//formSubmit('insert');
//					}
//				},{
//					id : 'Update',
//					text : '保存',
//					iconCls: 'Save', 
//					disabled : true,
//					handler : function() {
//						com.frontier.gdc.system.menuDefine.formSubmit();
//					}
//				},{
//					id : 'Delete',
//					text : '删除',
//					iconCls: 'remove', 
//					disabled : true,
//					handler : function() {
//						com.frontier.gdc.system.menuDefine.submitType = 'delete';
//						com.frontier.gdc.system.menuDefine.formSubmit();
//					}
//				}
//			],
//			items : [{
//				region : 'west',
//				title : '',
//				split : true,
//				title: '功能菜单',
//				autoScroll : true,
//				width : 200,
//				collapsible : true,
//				layout : 'accordion',
//				layoutConfig : {
//					animate : true
//				},
//				layout : 'fit',
//				items : [com.frontier.gdc.system.menuDefine.createTree()]
//			},com.frontier.gdc.system.menuDefine.tabs]
//		}]
//	});
//	com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.form);
//	com.frontier.gdc.system.menuDefine.tabs.unhideTabStripItem(com.frontier.gdc.system.menuDefine.systemForm);
//	com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.objForm);
//	com.frontier.gdc.system.menuDefine.systemForm.show();
//	//return panel;
////}
//})

com.frontier.gdc.system.menuDefine.newMainPanel = function(){
	var panel = new Ext.Panel({
		layout : 'border',
		items : [{
			region : 'center',
			layout : 'border',
			border : false,
			tbar:[
				{
					id : 'New',
					text : '新增',
					iconCls: 'add', 
					bizCode:'new',
					//disabled : true,
					menu: com.frontier.gdc.system.menuDefine.addmenu,
					handler:function(){
						//formSubmit('insert');
					}
				},{
					id : 'Update',
					text : '保存',
					iconCls: 'Save', 
					bizCode:'update',
					//disabled : true,
					handler : function() {
						if(com.frontier.gdc.system.menuDefine.submitType==''){
							Ext.MessageBox.alert('提示', '请选择功能或对象节点！');
							return;
						}else{
							com.frontier.gdc.system.menuDefine.formSubmit();
						}
						
					}
				},{
					id : 'Delete',
					text : '删除',
					bizCode:'delete',
					iconCls: 'remove', 
					//disabled : true,
					handler : function() {
						//if(com.frontier.gdc.system.menuDefine.funcSelfId=='' && com.frontier.gdc.system.menuDefine.funcSelfId==0){
						if(com.frontier.gdc.system.menuDefine.submitType==''){
							Ext.MessageBox.alert('提示', '请选择功能功能或对象节点！');
							return;
						}
						com.frontier.gdc.system.menuDefine.submitType = 'delete';
						com.frontier.gdc.system.menuDefine.formSubmit();
					}
				},{
					id : 'export',
					text : '导出',
					//bizCode:'export',
					iconCls: 'export_excel', 
					handler : function() {
						var node = com.frontier.gdc.system.menuDefine.tree.getSelectionModel().getSelectedNode();
						if(node==null || (node.parentNode && node.parentNode.id!=-100)){
							Ext.MessageBox.alert('提示', '请选择系统节点！');
							return;
						}
						window.location.href=gdc.webContextRoot+'/sysFunc/sysFuncToXML.action?systemId='+com.frontier.gdc.system.menuDefine.systemId;
					}
				},{
					id : 'import',
					text : '导入',
					//bizCode:'import',
					iconCls: 'import', 
					handler : function() {
						com.frontier.gdc.system.menuDefine.importXml();
					}
				}
			],
			items : [{
				region : 'west',
				title : '',
				split : true,
				title: '功能菜单',
				autoScroll : true,
				width : 200,
				collapsible : true,
				layout : 'accordion',
				layoutConfig : {
					animate : true
				},
				layout : 'fit',
				items : [com.frontier.gdc.system.menuDefine.createTree()]
			},com.frontier.gdc.system.menuDefine.tabs]
		}]
	});
	com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.form);
	com.frontier.gdc.system.menuDefine.tabs.unhideTabStripItem(com.frontier.gdc.system.menuDefine.systemForm);
	com.frontier.gdc.system.menuDefine.tabs.hideTabStripItem(com.frontier.gdc.system.menuDefine.objForm);
	com.frontier.gdc.system.menuDefine.systemForm.show();
	
	return panel;
}

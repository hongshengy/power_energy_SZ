/**
 * <p>Title: 购电侧系统</p>
 * <p>Description:业务组织角色管理</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("com.frontier.gdc.system.oprationRoleManager");

//提交类型  insert update  delete
com.frontier.gdc.system.oprationRoleManager.submitType = '';
//机构id
com.frontier.gdc.system.oprationRoleManager.specialOrgId = '';
//系统节点id
com.frontier.gdc.system.oprationRoleManager.systemNodeId = '';
//每页记录数
var pageSize = gdc.constant.pageSize;

//业务组织树定义
com.frontier.gdc.system.oprationRoleManager.tree = null;
com.frontier.gdc.system.oprationRoleManager.createTree = function(){
	var tree = new Ext.tree.TreePanel({
		region : 'west',
		layout:'fit',
		rootVisible : false,
		autoScroll : true,
		loader : new Ext.tree.TreeLoader({
			dataUrl : gdc.webContextRoot+'/sysSystem/findSystemSpecialOrgTree.action'
		})
	});
	var root = new Ext.tree.AsyncTreeNode({
		id : '-100',
		text : '业务组织'
	});
	tree.setRootNode(root);
	tree.on('click',function(node){
		if(node.parentNode.id=='-100'){
			com.frontier.gdc.system.oprationRoleManager.systemNodeId = '';
			com.frontier.gdc.system.oprationRoleManager.specialOrgId = '';
			node.expand();
			return ;
		}else{
			var id = node.id.split(',');
			com.frontier.gdc.system.oprationRoleManager.systemNodeId = id[0];
			com.frontier.gdc.system.oprationRoleManager.specialOrgId = id[1];
		}
		com.frontier.gdc.system.oprationRoleManager.ds.load({
	        params : {
	            start : 0,
	            limit : pageSize,
	            specialOrgId : com.frontier.gdc.system.oprationRoleManager.specialOrgId
	        }
	    });
	    
	});
	tree.on('beforeload',function(node,deep,anim){
		// 获取自定义框架角色ID
		var curRoleIDFromSelf = '';
		if (gdc.isPagePurview) {
			curRoleIDFromSelf = gdc.currentRoleId;
		}
		// 初始化系统组织树或者点击系统节点后传递本级ID和自定义框架角色ID
		if(node.id == '-100' || node.attributes.type == 'sysSystem'){
			node.id = node.id + ',' + 0 + ',' + curRoleIDFromSelf;
		}
	});
	com.frontier.gdc.system.oprationRoleManager.tree = tree;
	return com.frontier.gdc.system.oprationRoleManager.tree;
}

//业务组织角色列表 grid reader
com.frontier.gdc.system.oprationRoleManager.jsonReader = new Ext.data.JsonReader({
        root : 'list',
        totalProperty : 'totalCount',
        id : 'id',
        successProperty : '@success'
    }, [ {
        name : 'id',
        mapping : 'id',
        type : 'float'
    }, {
        name : 'roleName',
        mapping : 'roleName'
    }, {
        name : 'roleCode',
        mapping : 'roleCode'
	}, {
        name : 'description',
        mapping : 'description'
	}]
);
	
//业务组织角色列表 grid store
com.frontier.gdc.system.oprationRoleManager.ds = new Ext.data.Store({
    proxy : new Ext.data.HttpProxy( {
        url : 'sysRole/findSysRoleBySystemId.action'
    }),
    listeners : {
		"beforeload" : function(store) {
			store.removeAll();
			store.baseParams = {
				specialOrgId : com.frontier.gdc.system.oprationRoleManager.specialOrgId,
				systemId : com.frontier.gdc.system.oprationRoleManager.systemNodeId
			};
		}
	},
    reader : com.frontier.gdc.system.oprationRoleManager.jsonReader
});

//业务组织角色列表 grid
com.frontier.gdc.system.oprationRoleManager.grid = null;
com.frontier.gdc.system.oprationRoleManager.createGrid = function(){
	
	//grid 列定义
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel([
		sm,
		new Ext.grid.RowNumberer(), 
		{
	        id : 'id',
	        header : '序号',
	        dataIndex : 'id',
	        align : 'center',
	        hidden:true,
	        width: 50
	    }, {
	        header : "业务角色名称",
	        dataIndex : 'roleName',
	        sortable : true,
	        align : 'center',
	        width: 50,
			renderer:Ext.util.Format.htmlEncode
	    }, {
	        header : "业务角色编码",
	        dataIndex : 'roleCode',
	        align : 'center',
	        width: 50,
			renderer:Ext.util.Format.htmlEncode
	    }, {
	        header : "角色描述",
	        dataIndex : 'description',
	        align : 'center',
	        width: 50,
			renderer:Ext.util.Format.htmlEncode
	    }
    ]);
    
    //分页工具栏
    var bbar =   new gdc.grid.PagingToolbar( {
        pageSize : pageSize,
        store : com.frontier.gdc.system.oprationRoleManager.ds
        //displayInfo : true,
        //displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
        // : '无数据'
    });
    
    //grid 
    var grid = new Ext.grid.GridPanel({
    	title : '',
        collapsible : true,// 是否可以展开
        animCollapse : false,// 展开时是否有动画效果
        loadMask : true,// 载入遮罩动画
        autoShow : true,
        cm : cm,
        sm : sm,
        store : com.frontier.gdc.system.oprationRoleManager.ds,
        viewConfig : {
           forceFit : true
        },
        tbar : [ 
	        {
	            id : 'New',
	            text : ' 新增 ',
	            iconCls : 'add',
	            bizCode:'new',
	            handler : function() {
	            	if(!com.frontier.gdc.system.oprationRoleManager.systemNodeId || !com.frontier.gdc.system.oprationRoleManager.specialOrgId){
	            		Appframe.viewinfdlg.warning.show('请选择角色分组节点!');
	            		return false;
	            	}
	            	var node = com.frontier.gdc.system.oprationRoleManager.tree.getNodeById(com.frontier.gdc.system.oprationRoleManager.systemNodeId+','+com.frontier.gdc.system.oprationRoleManager.specialOrgId);
	            	if(!node){
	            		Appframe.viewinfdlg.warning.show('请选择角色分组节点!');
	            		return false;
	            	}
                    var pids = node.parentNode.id.split(',');
                    if(pids[1]<0){
                        Appframe.viewinfdlg.warning.show('请选择角色分组节点!');
                        return false;
                    }
	            	com.frontier.gdc.system.oprationRoleManager.addForm.form.reset();
	            	Ext.getCmp('roleSystemId').setValue(com.frontier.gdc.system.oprationRoleManager.systemNodeId);
	            	Ext.getCmp('soId').setValue(com.frontier.gdc.system.oprationRoleManager.specialOrgId);
	                com.frontier.gdc.system.oprationRoleManager.addWindow.show();
	            }
	        },{
	            text : '修改',
	            tooltip : '修改',
	            iconCls : 'edit',
	            bizCode:'update',
	            handler : function() {
	                com.frontier.gdc.system.oprationRoleManager.update();
	            }
	        }, {
	            text : '删除',
	            tooltip : '删除被选择的内容',
	            iconCls : 'remove',
	            bizCode:'delete',
	            handler : function() {
	                com.frontier.gdc.system.oprationRoleManager.deleteRole();
	            }
	        }, {
	            text : '角色用户管理',
	            tooltip : '角色用户管理',
	            iconCls : 'user',
	            bizCode:'roleUser',
	            handler : function() {
	                com.frontier.gdc.system.oprationRoleManager.roleManager();
	            }
	        }, {
	            text : '角色授权',
	            tooltip : '角色授权',
	            iconCls : 'user',
	            bizCode:'roleAccredit',
	            handler : function() {
	                com.frontier.gdc.system.oprationRoleManager.roleAccredit();
	            }
	        }, {
	            text : '用户导出',
	            tooltip : '用户导出',
	            iconCls : 'export_excel',
	            bizCode:'exportExc',
	            handler : function() {
	                com.frontier.gdc.system.oprationRoleManager.roleUserToExcel();
	            }
	        }, {
	            text : '角色复制',
	            tooltip : '角色复制',
	            iconCls : 'checkIn',
	            bizCode:'roleCopy',
	            handler : function() {
	                com.frontier.gdc.system.oprationRoleManager.roleCopy();
	            }
	        }, {
	            text : '通知消息授权',
	            tooltip : '通知消息授权',
	            iconCls : 'user',
	            bizCode:'roleNotice',
	            handler : function() {
	                com.frontier.gdc.system.noticeRoleManager.showNoticeTreeWindow();
	            }
	        }
//            , {
//                text : '角色Portal',
//                tooltip : '增加角色Portal关系操作',
//                iconCls : 'edit',
//                bizCode:'rolePortal',
//                handler : function() {
//                    com.frontier.gdc.system.oprationRoleManager.rolePortalMgr();
//                }
//            }, {
//                text : '角色默认布局',
//                tooltip : '设置默认布局',
//                iconCls : 'edit',
//                bizCode:'roleDefaultLayout',
//                handler : function() {
//                    com.frontier.gdc.system.oprationRoleManager.showRoleLayoutWin();
//                }
//            }
        ],
		bbar :bbar
	});
	com.frontier.gdc.system.oprationRoleManager.grid = grid;
	//com.frontier.gdc.system.oprationRoleManager.ds.load();
	
	return com.frontier.gdc.system.oprationRoleManager.grid;
}


//业务组织角色form加载方法
com.frontier.gdc.system.oprationRoleManager.loadFormData = function(id) {
	com.frontier.gdc.system.oprationRoleManager.updateForm.load( {
        url : gdc.webContextRoot+'sysRole/findSysRole.action?roleId='+id,
        waitMsg : '正在载入数据...',
        failure : function(form,action) {
        },
        success : function() {
           
        }
    });
}

//业务组织角色form 提交
com.frontier.gdc.system.oprationRoleManager.formSubmit = function(form,window){
	var url = '';
	if('insert'==com.frontier.gdc.system.oprationRoleManager.submitType){
		url = 'sysRole/insertSysRole.action';
	}else if('update'==com.frontier.gdc.system.oprationRoleManager.submitType){
		url = 'sysRole/modifySysRole.action';
	}
	if (form.form.isValid(form)) {
		form.form.submit({
            url : gdc.webContextRoot+url,
            success : function(from, action) {
            	window.hide();
            	Appframe.viewinfdlg.parent.right.show("操作成功！",true);
            	com.frontier.gdc.system.oprationRoleManager.ds.reload();
            	
            },failure : function(form, action) {
               //Appframe.viewinfdlg.error.show("操作失败！ ");
            },
            waitMsg : '正在保存数据，稍后...'
        });
    }
}

//业务组织角色form reader
com.frontier.gdc.system.oprationRoleManager.jsonFormReader = new Ext.data.JsonReader({
		root : 'list',
		id : 'id',
		successProperty : '@success'
	},
	[ {
		name : 'sysRole.id',
        mapping : 'id',
        type : 'float'
    },{
		name : 'sysRole.specialOrgId',
        mapping : 'specialOrgId',
        type : 'float'
    },{
		name : 'sysRole.systemId',
        mapping : 'systemId',
        type : 'float'
    },{
    	name : 'sysRole.roleName',
        mapping : 'roleName',
        type : 'string'
    }, {
    	name : 'sysRole.roleCode',
        mapping : 'roleCode',
        type : 'string'
    }, {
    	name : 'sysRole.description',
        mapping : 'description',
        type : 'string'
    }
]);

//业务组织添加角色form
com.frontier.gdc.system.oprationRoleManager.addForm = new gdc.FormPanel({
	labelWidth : 100,
	labelAlign : 'right',
	frame : true,
	bodyStyle : 'padding:5px 5px 0',
	//reader:com.frontier.gdc.system.oprationRoleManager.jsonFormReader,
	items:[
		new Ext.form.Hidden({
              fieldLabel: '',
              name: 'sysRole.id'
             
        }),new Ext.form.Hidden({
        	  id:'soId',
              fieldLabel: '',
              name: 'sysRole.specialOrgId'
             
        }),new Ext.form.Hidden({
        	  id:'roleSystemId',
              fieldLabel: '',
              name: 'sysRole.systemId'
             
        }),new Ext.form.TextField({
	    	 fieldLabel : '业务角色名称',
			 name : 'sysRole.roleName',
			 allowBlank:false,
			 maxLength : 30,
			 maxLengthText : "输入的字符不能超过30位",
			 width:200
	    }),new Ext.form.TextField({
	    	 fieldLabel : '业务角色编码',
			 name : 'sysRole.roleCode',
			  allowBlank:false,
			 maxLength : 15,
			 maxLengthText : "输入的字符不能超过15位",
			 width:200
	    }),new Ext.form.TextArea({
	    	 fieldLabel : '描述',
			 name : 'sysRole.description',
			 maxLength : 200,
			 maxLengthText : "输入的字符不能超过200位",
			 width:200
	    })
	]
});

//业务组织修改角色form
com.frontier.gdc.system.oprationRoleManager.updateForm = new gdc.FormPanel({
	labelWidth : 100,
	labelAlign : 'right',
	frame : true,
	bodyStyle : 'padding:5px 5px 0',
	reader:com.frontier.gdc.system.oprationRoleManager.jsonFormReader,
	items:[
		new Ext.form.Hidden({
              fieldLabel: '',
              name: 'sysRole.id'
             
        }),new Ext.form.Hidden({
        	  fieldLabel: '',
              name: 'sysRole.specialOrgId'
             
        }),new Ext.form.Hidden({
        	  fieldLabel: '',
              name: 'sysRole.systemId'
             
        }),new Ext.form.TextField({
	    	 fieldLabel : '业务角色名称',
			 name : 'sysRole.roleName',
			 allowBlank:false,
			 maxLength : 30,
			 maxLengthText : "输入的字符不能超过30位",
			 width:200
	    }),new Ext.form.TextField({
	    	 fieldLabel : '业务角色编码',
			 name : 'sysRole.roleCode',
			  allowBlank:false,
			 maxLength : 15,
			 maxLengthText : "输入的字符不能超过15位",
			 width:200
	    }),new Ext.form.TextArea({
	    	 fieldLabel : '描述',
			 name : 'sysRole.description',
			 maxLength : 500,
			 maxLengthText : "输入的字符不能超过500位",
			 width:200
	    })
	]
});

//新增窗口
com.frontier.gdc.system.oprationRoleManager.addWindow = new Ext.Window( {
	title : '新增业务组织角色',
	width : 350,
	height : 220,
	closeAction : 'hide',
	plain : true,
	modal:true,
	layout : 'fit',
	tbar: [{
		text : '保存',
		iconCls: 'save',
		handler : function() {
			com.frontier.gdc.system.oprationRoleManager.submitType = 'insert';
			com.frontier.gdc.system.oprationRoleManager.formSubmit(com.frontier.gdc.system.oprationRoleManager.addForm,com.frontier.gdc.system.oprationRoleManager.addWindow);
		}
	}],
	items :com.frontier.gdc.system.oprationRoleManager.addForm
	
});

//修改窗口
com.frontier.gdc.system.oprationRoleManager.updateWindow = null;

//修改窗口
com.frontier.gdc.system.oprationRoleManager.update = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationRoleManager.grid.getSelectionModel().getSelected();
	if (record) {
		var rows = com.frontier.gdc.system.oprationRoleManager.grid.getSelections();
		if (rows.length > 1) {
			Appframe.viewinfdlg.warning.show('只能选择一条记录进行修改！');
			return false;
		} 
		var roleId = rows[0].get("id");
		if(roleId){
			com.frontier.gdc.system.oprationRoleManager.loadFormData(roleId);
		}
	} else {
		Appframe.viewinfdlg.warning.show('请选择要修改的业务角色！');
		return false;
	}
	
	//创建并显示修改窗口
	if(!com.frontier.gdc.system.oprationRoleManager.updateWindow){
		com.frontier.gdc.system.oprationRoleManager.updateWindow = new Ext.Window({
			title : '修改业务组织角色',
			width : 350,
			height : 220,
			closeAction : 'hide',
			plain : true,
			modal:true,
			layout : 'fit',
			tbar: [
				{
					text : '保存',
					iconCls: 'save',
					handler : function() {
						com.frontier.gdc.system.oprationRoleManager.submitType = 'update';
						com.frontier.gdc.system.oprationRoleManager.formSubmit(com.frontier.gdc.system.oprationRoleManager.updateForm,com.frontier.gdc.system.oprationRoleManager.updateWindow);
						
					}
				}
			],
			items :com.frontier.gdc.system.oprationRoleManager.updateForm
		});
	}
	com.frontier.gdc.system.oprationRoleManager.updateWindow.show();
}

//删除业务角色方法
com.frontier.gdc.system.oprationRoleManager.deleteRole = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationRoleManager.grid.getSelectionModel().getSelected();
	if (record) {
		Ext.Msg.confirm('确认删除', '你确认要删除吗？', function(btn) {
			var rows = com.frontier.gdc.system.oprationRoleManager.grid.getSelections();
			var jsonData = "";
			for (var i = 0, len = rows.length; i < len; i++) {
				var id = rows[i].get("id");
				if (i == 0) {
					jsonData = jsonData + id;
				} else {
					jsonData = jsonData + "," + id;
				}
			}
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : gdc.webContextRoot + 'sysRole/deleteSysRole.action',
					params : {"roleIds" : jsonData},
					success : function(result,request) {
						var res = result.responseText;
						var tem = eval('('+res+')');
						if(tem.success==true){
							com.frontier.gdc.system.oprationRoleManager.ds.reload();
							Appframe.viewinfdlg.parent.right.show("操作成功！",true);
						}
					}
				});
			}
		});
	} else {
		Appframe.viewinfdlg.warning.show('请选择要删除的业务角色！');
	}
}


//**********************************************************角色用户管理*********************************************************************
com.frontier.gdc.system.oprationRoleManager.roleUserRoleId = '';
//角色用户管理方法
com.frontier.gdc.system.oprationRoleManager.roleManager = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationRoleManager.grid.getSelectionModel().getSelected();
	if (record) {
		var rows = com.frontier.gdc.system.oprationRoleManager.grid.getSelections();
		if (rows.length > 1) {
			Appframe.viewinfdlg.warning.show('只能选择一个业务角色！');
			return false;
		} 
		var roleId = rows[0].get("id");
		if(roleId){
			com.frontier.gdc.system.oprationRoleManager.roleUserRoleId = roleId;
			com.frontier.gdc.system.oprationRoleManager.roleUserManager();
		}
	} else {
		Appframe.viewinfdlg.warning.show('请选择业务角色！');
	}
}


//角色用户管理window
com.frontier.gdc.system.oprationRoleManager.roleUserManagerWindow = null;
com.frontier.gdc.system.oprationRoleManager.roleUserManager = function(){
	if(!com.frontier.gdc.system.oprationRoleManager.roleUserManagerWindow){
		com.frontier.gdc.system.oprationRoleManager.roleUserManagerWindow = new Ext.Window( {
			title : '业务组织角色用户',
			width : 700,
			height : 450,
			closeAction : 'hide',
			plain : true,
			modal:true,
			layout : 'fit',
			tbar: [{
				text : '新增用户',
				iconCls: 'add',
				handler : function() {
					com.frontier.gdc.system.oprationRoleManager.roleAddUserManager();
				}
			}, {
				text : '删除',
				iconCls: 'remove',
				handler : function() {
					com.frontier.gdc.system.oprationRoleManager.roleUserDelete();
				}
			}],
			items :com.frontier.gdc.system.oprationRoleManager.createRoleUserGrid()
			
		});
	}
	com.frontier.gdc.system.oprationRoleManager.roleUserDs.load({
        params : {
            start : 0,
            limit : pageSize,
            roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId
        }
    });
    com.frontier.gdc.system.oprationRoleManager.roleUserManagerWindow.show();
}
//角色添加用户window
com.frontier.gdc.system.oprationRoleManager.roleAddUserManagerWindow = null;
com.frontier.gdc.system.oprationRoleManager.roleAddUserManager = function(){
	if(!com.frontier.gdc.system.oprationRoleManager.roleAddUserManagerWindow){
		com.frontier.gdc.system.oprationRoleManager.roleAddUserManagerWindow = new Ext.Window( {
			title : '新增用户',
			width : 700,
			height : 400,
			closeAction : 'hide',
			plain : true,
			modal:true,
			layout : 'border',
			tbar: [
				{
					text : '保存',
					iconCls: 'save',
					handler : function() {
						com.frontier.gdc.system.oprationRoleManager.roleUserSubmit();
					}
				},
				new Ext.form.TextField({
					 id:'serchName',
					 name : 'name',
					 allowBlank:false,
					 maxLength : 30,
					 maxLengthText : "输入的字符不能超过30位",
					 emptyText :'请输入姓名或用户名',
					 width:120
			    })
				, {
					text : '查询',
					iconCls: 'search',
					handler : function() {
						com.frontier.gdc.system.oprationRoleManager.name = Ext.getCmp('serchName').getValue();
						if(!com.frontier.gdc.system.oprationRoleManager.name || com.frontier.gdc.system.oprationRoleManager.name.length==0){
							Appframe.viewinfdlg.warning.show('请输入查询的姓名或用户名！');
							return false;
						}
						com.frontier.gdc.system.oprationRoleManager.userDs.load({
					        params : {
					            start : 0,
					            limit : pageSize,
					            searchName:com.frontier.gdc.system.oprationRoleManager.name,
                                roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId,
					            specialId : com.frontier.gdc.system.oprationRoleManager.specialId
					        }
					    });
					}
				}
			],
			items :[
				{
					region : 'west',
					title : '',
					split : true,
					title: '业务组织',
					autoScroll : true,
					width : 200,
					collapsible : true,
					layout : 'accordion',
					layoutConfig : {
						animate : true
					},
					layout : 'fit',
					items : [com.frontier.gdc.system.oprationRoleManager.createUserOfOrgTree()]
				},{
					region : 'center',
					title : '',
					split : true,
					title: '',
					autoScroll : true,
					width : 200,
					collapsible : true,
					layout : 'accordion',
					layoutConfig : {
						animate : true
					},
					layout : 'fit',
					items : [com.frontier.gdc.system.oprationRoleManager.createUserGrid()]
				}
			]
		});
	}
	com.frontier.gdc.system.oprationRoleManager.userDs.reload();
	com.frontier.gdc.system.oprationRoleManager.roleAddUserManagerWindow.show();
}

//业务组织角色用户列表 grid reader
com.frontier.gdc.system.oprationRoleManager.roleUserJsonReader = new Ext.data.JsonReader({
        root : 'list',
        totalProperty : 'totalCount',
        id : 'userId',
        successProperty : '@success'
    }, [ {
        name : 'userId',
        mapping : 'userId',
        type : 'float'
    }, {
        name : 'userName',
        mapping : 'userName'
    }, {
        name : 'loginName',
        mapping : 'loginName'
    },{
        name : 'specialOrgName',
        mapping : 'specialOrgName'
	},{
        name : 'isAvaliable',
        mapping : 'isAvaliable'
	}]
);
	
//业务组织角色用户列表 grid store
com.frontier.gdc.system.oprationRoleManager.roleUserDs = new Ext.data.Store({
    proxy : new Ext.data.HttpProxy( {
        url : 'sysRole/findSysUserByRoleId.action'
    }),
    listeners : {
		"beforeload" : function(store) {
			store.removeAll();
			store.baseParams = {
				roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId
			};
		}
	},
    reader : com.frontier.gdc.system.oprationRoleManager.roleUserJsonReader
});

function pctChange(val){
    if(val == 'Y'){
        return '正常用户';
    }else if(val == 'N'){
        return '禁用用户';
    }
    return val;
}
//业务组织角色用户列表 grid
com.frontier.gdc.system.oprationRoleManager.roleUserGrid = null;
com.frontier.gdc.system.oprationRoleManager.createRoleUserGrid = function(){
	if(!com.frontier.gdc.system.oprationRoleManager.roleUserGrid){
		//grid 列定义
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel([
			sm,
			//new Ext.grid.RowNumberer(), 
			{
		        id : 'userId',
		        header : '用户Id',
		        dataIndex : 'userId',
		        align : 'center',
		        hidden:true,
		        width: 50
		    }, {
		        header : "姓名",
		        dataIndex : 'userName',
		        sortable : true,
		        align : 'center',
		        width: 50
		        ,renderer:Ext.util.Format.htmlEncode
		    }, {
		        header : "用户名",
		        dataIndex : 'loginName',
		        sortable : true,
		        align : 'center',
		        width: 50
		        ,renderer:Ext.util.Format.htmlEncode
		    }, {
		        header : "组织机构",
		        dataIndex : 'specialOrgName',
		        align : 'center',
		        width: 50
		        ,renderer:Ext.util.Format.htmlEncode
		    }, {
		        header : "用户状态",
		        dataIndex : 'isAvaliable',
		        renderer: pctChange,
		        align : 'center',
		        width: 50
		    }
	    ]);
	    
	    //分页工具栏
	    var bbar =  new Ext.PagingToolbar( {
	        pageSize : pageSize,
	        store : com.frontier.gdc.system.oprationRoleManager.roleUserDs,
	        displayInfo : true,
	        displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
	        emptyMsg : '无数据'
	    });
	    
	    //grid 
	    var grid = new Ext.grid.GridPanel({
	    	title : '',
	        collapsible : true,// 是否可以展开
	        animCollapse : false,// 展开时是否有动画效果
	        loadMask : true,// 载入遮罩动画
	        autoShow : true,
	        cm : cm,
	        sm : sm,
	        store :com.frontier.gdc.system.oprationRoleManager.roleUserDs,
	        viewConfig : {
	           forceFit : true
	        },
	        bbar :bbar
		});
		com.frontier.gdc.system.oprationRoleManager.roleUserGrid = grid;
	//com.frontier.gdc.system.oprationRoleManager.ds.load();
	}
	return com.frontier.gdc.system.oprationRoleManager.roleUserGrid;
}

//业务组织角色用户列表 grid reader
com.frontier.gdc.system.oprationRoleManager.userJsonReader = new Ext.data.JsonReader({
        root : 'list',
        totalProperty : 'totalCount',
        id : 'userId',
        successProperty : '@success'
    }, [ {
        name : 'userId',
        mapping : 'userId',
        type : 'float'
    }, {
        name : 'userName',
        mapping : 'userName'
    }, {
        name : 'loginName',
        mapping : 'loginName'
    },{
        name : 'specialOrgName',
        mapping : 'specialOrgName'
	},{
        name : 'isAvaliable',
        mapping : 'isAvaliable'
	}]
);
//业务组织用户列表 grid store
com.frontier.gdc.system.oprationRoleManager.name = null;
com.frontier.gdc.system.oprationRoleManager.userDs = new Ext.data.Store({
    proxy : new Ext.data.HttpProxy( {
        url : 'user/findUserBySpIdExistRoleId.action'
    }),
    listeners : {
		"beforeload" : function(store) {
			store.removeAll();
			store.baseParams = {
                roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId,
				specialId : com.frontier.gdc.system.oprationRoleManager.specialId,
				searchName:com.frontier.gdc.system.oprationRoleManager.name
			};
		}
	},
	reader : com.frontier.gdc.system.oprationRoleManager.userJsonReader
});

//业务组织用户列表 grid
com.frontier.gdc.system.oprationRoleManager.userGrid = null;
com.frontier.gdc.system.oprationRoleManager.createUserGrid = function(){
	if(!com.frontier.gdc.system.oprationRoleManager.userGrid){
		//grid 列定义
		var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel([
			sm,
			new Ext.grid.RowNumberer(), 
			{
		        id : 'userId',
		        header : '用户Id',
		        dataIndex : 'userId',
		        align : 'center',
		        hidden:true,
		        width: 50
		    }, {
		        header : "姓名",
		        dataIndex : 'userName',
		        sortable : true,
		        align : 'center',
		        width: 50,
            	renderer:Ext.util.Format.htmlEncode
		    }, {
		        header : "用户名",
		        dataIndex : 'loginName',
		        sortable : true,
		        align : 'center',
		        width: 50,
            	renderer:Ext.util.Format.htmlEncode
		    }, {
		        header : "组织机构",
		        dataIndex : 'specialOrgName',
		        align : 'center',
		        width: 50
		    }, {
		        header : "用户状态",
		        dataIndex : 'isAvaliable',
		        renderer: pctChange,
		        align : 'center',
		        width: 50
		    }
	    ]);
	    
	    //分页工具栏
	    var bbar =  new Ext.PagingToolbar( {
	        pageSize : pageSize,
	        store : com.frontier.gdc.system.oprationRoleManager.userDs,
	        displayInfo : true,
	        displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
	        emptyMsg : '无数据'
	    });
	    
	    //grid 
	    var grid = new Ext.grid.GridPanel({
	    	title : '',
	        collapsible : true,// 是否可以展开
	        animCollapse : false,// 展开时是否有动画效果
	        loadMask : true,// 载入遮罩动画
	        autoShow : true,
	        cm : cm,
	        sm : sm,
	        store :com.frontier.gdc.system.oprationRoleManager.userDs,
	        viewConfig : {
	           forceFit : true
	        },
	        bbar :bbar
		});
		com.frontier.gdc.system.oprationRoleManager.userGrid = grid;
	//com.frontier.gdc.system.oprationRoleManager.ds.load();
	}
	return com.frontier.gdc.system.oprationRoleManager.userGrid;
}

//y业务组织树定义
com.frontier.gdc.system.oprationRoleManager.userOfOrgTree = null;
com.frontier.gdc.system.oprationRoleManager.specialId = '';
com.frontier.gdc.system.oprationRoleManager.createUserOfOrgTree = function(){
	if(!com.frontier.gdc.system.oprationRoleManager.userOfOrgTree){
		var tree = new Ext.tree.TreePanel({
			region : 'west',
			layout:'fit',
			rootVisible : false,
			autoScroll : true,
			loader : new Ext.tree.TreeLoader({
				dataUrl : gdc.webContextRoot+'/specialOrg/searchSpecialOrgTree.action',
				listeners : {
							'beforeload' : function(loader, node) {
								this.baseParams.spOrgId = currUser['spOrgId'];// 统一框架角色组织ID,by:guojinhui2009/10/19
								if (!gdc.isPagePurview) {
									this.baseParams.curRoleID = '';
								} else {
									this.baseParams.curRoleID = gdc.currentRoleId;// 增加传递当前用户所选的角色ID，by：guojinhui//
								}
							}
						}
			})
		});
		var root = new Ext.tree.AsyncTreeNode({
			id : '0',
			text : '业务组织',
			listeners:{
				'expand':function(node){
					if(com.frontier.gdc.system.oprationRoleManager.specialId==''){
						com.frontier.gdc.system.oprationRoleManager.specialId = node.firstChild.id;
					}
				}
			}
		});
		tree.setRootNode(root);
		tree.on('click',function(node){
			com.frontier.gdc.system.oprationRoleManager.specialId = node.id;
			Ext.getCmp('serchName').setValue(null);
			com.frontier.gdc.system.oprationRoleManager.name=null;
			com.frontier.gdc.system.oprationRoleManager.userDs.load({
		        params : {
		            start : 0,
		            limit : pageSize,
                    roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId,
		            specialId : node.id  
		        }
		    });
		});
		com.frontier.gdc.system.oprationRoleManager.userOfOrgTree = tree;
	}
	return com.frontier.gdc.system.oprationRoleManager.userOfOrgTree;
}


//角色用户添加
com.frontier.gdc.system.oprationRoleManager.roleUserSubmit = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationRoleManager.userGrid.getSelectionModel().getSelected();
	if (record) {
		var rows = com.frontier.gdc.system.oprationRoleManager.userGrid.getSelections();
		var userIds = "";
		for (var i = 0, len = rows.length; i < len; i++) {
			var id = rows[i].get("userId");
			if (i == 0) {
				userIds = userIds + id;
			} else {
				userIds = userIds + "," + id;
			}
		}
		
		Ext.Ajax.request({
			url : gdc.webContextRoot + 'sysRole/authorizeRoleToUser.action',
			params : {"roleId" : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId,"userIds" : userIds},
			success : function(result,request) {
				var res = result.responseText;
				var tem = eval('('+res+')');
				if(tem.success==true){
					com.frontier.gdc.system.oprationRoleManager.roleAddUserManagerWindow.hide();
					//刷新
					com.frontier.gdc.system.oprationRoleManager.roleUserDs.load({
				        params : {
				            start : 0,
				            limit : pageSize,
				            roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId
				        }
				    });
					Appframe.viewinfdlg.parent.right.show("操作成功！",true);
				}
			}
		});
		
	} else {
		Appframe.viewinfdlg.warning.show('请选择要添加的用户！');
		//Ext.MessageBox.alert('添加角色用户', '请选择要添加的用户！');
	}
}

//角色用户删除
com.frontier.gdc.system.oprationRoleManager.roleUserDelete = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationRoleManager.roleUserGrid.getSelectionModel().getSelected();
	if (record) {
		Ext.Msg.confirm('确认删除', '你确认要删除吗？', function(btn) {
			var rows = com.frontier.gdc.system.oprationRoleManager.roleUserGrid.getSelections();
			var userIds = "";
			for (var i = 0, len = rows.length; i < len; i++) {
				var id = rows[i].get("userId");
				if (i == 0) {
					userIds = userIds + id;
				} else {
					userIds = userIds + "," + id;
				}
			}
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : gdc.webContextRoot + 'sysRole/removeUserForRole.action',
					params : {"roleId" : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId,"userIds" : userIds},
					success : function(result,request) {
						var res = result.responseText;
						var tem = eval('('+res+')');
						if(tem.success==true){
							//刷新
							com.frontier.gdc.system.oprationRoleManager.roleUserDs.load({
						        params : {
						            start : 0,
						            limit : pageSize,
						            roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId
						        }
						    });
							Appframe.viewinfdlg.parent.right.show("操作成功！",true);
						}
					}
				});
			}
		})
	} else {
		Appframe.viewinfdlg.warning.show('请选择要删除的用户！');
	}
}
/**
 * 角色对应用户导出excel
 * @return {Boolean}
 */
com.frontier.gdc.system.oprationRoleManager.roleUserToExcel = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationRoleManager.grid.getSelectionModel().getSelected();
	if (record) {
		var rows = com.frontier.gdc.system.oprationRoleManager.grid.getSelections();
		
		if (rows.length > 1) {
			Appframe.viewinfdlg.warning.show("请选择要导出的一条记录！");
			return false;
		}
		var roleId = rows[0].get("id");
		
		window.location.href=gdc.webContextRoot+'/sysRole/exportExlToUser.action?roleId='+roleId;
	} else {
		Appframe.viewinfdlg.warning.show("请选择要导出的角色！");
		return false;
	}
}

//**************************************************************角色授权*****************************************************************
com.frontier.gdc.system.oprationRoleManager.roleAccreditWindow = null;
com.frontier.gdc.system.oprationRoleManager.roleAccredit = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationRoleManager.grid.getSelectionModel().getSelected();
	if (record) {
		var rows = com.frontier.gdc.system.oprationRoleManager.grid.getSelections();
		if (rows.length > 1) {
			Appframe.viewinfdlg.warning.show('只能选择一个角色进行授权！');
			return false;
		} 
		var roleId = rows[0].get("id");
		com.frontier.gdc.system.oprationRoleManager.roleUserRoleId = roleId;
		
	} else {
		Appframe.viewinfdlg.warning.show('请选择要授权的业务角色！');
		return false;
	}
	
	if(com.frontier.gdc.system.oprationRoleManager.roleAccreditWindow){
		com.frontier.gdc.system.oprationRoleManager.roleAccreditWindow.close();
	}
	com.frontier.gdc.system.oprationRoleManager.roleAccreditWindow = new Ext.Window( {
		title : '角色授权',
		width : 200,
		height : 400,
		closeAction : 'hide',
		plain : true,
		modal:true,
		layout : 'fit',
		tbar: [{
			text : '保存',
			iconCls: 'save',
			handler : function() {
				//com.frontier.gdc.system.oprationRoleManager.purviewTree.expandAll();
				com.frontier.gdc.system.oprationRoleManager.rolePurviewSubmit();
			}
		}],
		items :com.frontier.gdc.system.oprationRoleManager.createPurviewTree()
		
	});

	com.frontier.gdc.system.oprationRoleManager.roleAccreditWindow.show();
}
//创建权限树
com.frontier.gdc.system.oprationRoleManager.purviewTree = null;
com.frontier.gdc.system.oprationRoleManager.createPurviewTree = function(){
	var tree = new Ext.tree.TreePanel({
		region : 'west',
		layout:'fit',
		checkModel : 'cascade', // 对树的级联多选
		onlyLeafCheckable : false,// 对树所有结点都可选
		rootVisible : true,
		autoScroll : true,
		loader : new Ext.tree.TreeLoader({
			dataUrl : gdc.webContextRoot+'sysRole/findSyncRoleFuncTree.action',
			listeners:{
			    'beforeload':function(loader,node) {
			    	this.baseParams.systemId = com.frontier.gdc.system.oprationRoleManager.systemNodeId;
			    	//this.baseParams.systemIds = node.id;
			    	this.baseParams.roleId = com.frontier.gdc.system.oprationRoleManager.roleUserRoleId;
			    }
			},
			baseAttrs : {uiProvider : Ext.ux.TreeCheckNodeUI} // 添加 uiProvider 属性
		}),
		listeners:{
			beforecollapsenode :function(node){
				return false;
			}
//			collapsenode :function(node){
////				node.eachChild(function(cn){
////					alert(cn.getUI().checkbox.checked+'  '+cn.attributes.checked);
////				})
//			}
		}
	});
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '功能菜单树',
		uiProvider : Ext.ux.TreeCheckNodeUI
	});
	tree.setRootNode(root);
	com.frontier.gdc.system.oprationRoleManager.purviewTree = tree;
	tree.expandAll();
	return com.frontier.gdc.system.oprationRoleManager.purviewTree;
}

//获取权限树选中节点id
com.frontier.gdc.system.oprationRoleManager.rolePurviewSubmit = function(){
	var checkedNodes = com.frontier.gdc.system.oprationRoleManager.purviewTree.getChecked();
	var json = "[";
	if(checkedNodes){
		for(var i=0;i<checkedNodes.length;i++){
			var id = checkedNodes[i].id;
			if(id=='0'){
				continue;
			}
			if(i!=checkedNodes.length-1){
				json += "{id:"+id+','+"type:'"+checkedNodes[i].attributes.type+"',funcId:"+checkedNodes[i].attributes.parent+"},";
			}else{
				json += "{id:"+id+','+"type:'"+checkedNodes[i].attributes.type+"',funcId:"+checkedNodes[i].attributes.parent+"}";
			}
		}
		json += "]";
	}
	Ext.Ajax.request({
		url : gdc.webContextRoot + 'sysRole/authorizePueviewToRole.action',
		params : {"roleId" : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId,"purviewResult" : json},
		success : function(result,request) {
			var res = result.responseText;
			var tem = eval('('+res+')');
			if(tem.success==true){
				com.frontier.gdc.system.oprationRoleManager.roleAccreditWindow.hide();
				Appframe.viewinfdlg.parent.right.show("操作成功！",true);
			}
		}
	});
}

//检查功能节点下是否有选中的权限对象节点
com.frontier.gdc.system.oprationRoleManager.SysObject = function(node){
	
}


/**
 * 角色默认布局定制
 */
com.frontier.gdc.system.oprationRoleManager.showRoleLayoutWin = function(){
 	//获取grid选中项
 	var roleId = 0;
    var record = com.frontier.gdc.system.oprationRoleManager.grid.getSelectionModel().getSelected();
    if (record) {
        var rows = com.frontier.gdc.system.oprationRoleManager.grid.getSelections();
        if (rows.length > 1) {
            Appframe.viewinfdlg.parent.warning.show("只能选择一个业务角色！",false);
            return false;
        } 
        roleId = rows[0].get("id");
    } else {
        Appframe.viewinfdlg.parent.warning.show("请选择业务角色！",false);
        return false;
    }
 	if(com.frontier.gdc.system.oprationRoleManager.roleLayoutWin){
 		com.frontier.gdc.system.oprationRoleManager.roleLayoutWin.close();
 	}
    com.frontier.gdc.system.oprationRoleManager.roleLayoutWin = new Ext.Window({
        layout : 'fit',
        width : 1000,
        height : 420,
        //closeAction : 'hide',
        plain : true,
        title : '角色布局',
        html : '<iframe src="'+gdc.webContextRoot+'pages/portal/rolePortal.jsp?roleId='+roleId+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>'
    });
    com.frontier.gdc.system.oprationRoleManager.roleLayoutWin.show();
 }

/**
 * ***********************************************************************角色Portal管理******************************
 * 给各角色增加可选Portal版面
 * guojinhui 2009-11-25
 */
com.frontier.gdc.system.oprationRoleManager.rolePortalMgr = function(){
    //获取grid选中项
    var record = com.frontier.gdc.system.oprationRoleManager.grid.getSelectionModel().getSelected();
    if (record) {
        var rows = com.frontier.gdc.system.oprationRoleManager.grid.getSelections();
        if (rows.length > 1) {
            Appframe.viewinfdlg.parent.warning.show("只能选择一个业务角色！",false);
            return false;
        } 
        var roleId = rows[0].get("id");
        if(roleId){
            com.frontier.gdc.system.oprationRoleManager.roleUserRoleId = roleId;
            com.frontier.gdc.system.oprationRoleManager.rolePortalManager();
        }
    } else {
        Appframe.viewinfdlg.parent.warning.show("请选择业务角色！",false);
    }

}

//角色Portal管理window
com.frontier.gdc.system.oprationRoleManager.rolePortalMagrWindow = null;
com.frontier.gdc.system.oprationRoleManager.rolePortalManager = function(){
    if(!com.frontier.gdc.system.oprationRoleManager.rolePortalMagrWindow){
        com.frontier.gdc.system.oprationRoleManager.rolePortalMagrWindow = new Ext.Window( {
            title : '业务组织角色Portal管理',
            width : 700,
            height : 450,
            closeAction : 'hide',
            plain : true,
            modal:true,
            layout : 'fit',
            tbar: [{
                text : '新增Portal',
                iconCls: 'add',
                handler : function() {
                    com.frontier.gdc.system.oprationRoleManager.roleAddPortalManager();
                }
            }, {
                text : '删除Portal',
                iconCls: 'remove',
                handler : function() {
                    com.frontier.gdc.system.oprationRoleManager.rolePortalDelete();
                }
            }],
            items :com.frontier.gdc.system.oprationRoleManager.createRolePortalGrid()
            
        });
    }
    com.frontier.gdc.system.oprationRoleManager.portalStore.load({
        params : {
            start : 0,
            limit : pageSize,
            roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId
        }
    });
    com.frontier.gdc.system.oprationRoleManager.rolePortalMagrWindow.show();
}

 // 角色下的Portal列表
 com.frontier.gdc.system.oprationRoleManager.defineGrid = null;
  /**
  * 是否默认方法
  */
 function changeIdToName(value){
    if (value == 'Y') {
        return "是";
    } else {
        return "否";
    }    
  }
 
 /**
  * portal列表reader
  */
 com.frontier.gdc.system.oprationRoleManager.jsonReaderRP = new Ext.data.JsonReader({
        root : 'list',
        totalProperty : 'totalCount',
        id : 'id',
        successProperty : '@success'    
     }, [ {
            name : 'id',
            mapping : 'id',
            type : 'float'
        }, {
            name : 'title',
            mapping : 'title'
        }, {
            name : 'url',
            mapping : 'url'
        }, {
            name : 'height',
            mapping : 'height'
        }, {
            name : 'isDefault',
            mapping : 'isDefault'
        }, {
            name : 'description',
            mapping : 'description'
        }]
 );
 
 /**
  * 列表Store
  */
 com.frontier.gdc.system.oprationRoleManager.portalStore = new Ext.data.Store({
    proxy : new Ext.data.HttpProxy( {
        // 根据RoleID查询出Portal列表=========================================================================================
        url : gdc.webContextRoot+'/sysPortal/findPortalsByRoleId.action'
    }),
    listeners : {
        "beforeload" : function(store) {
            store.removeAll();
            store.baseParams = {
                roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId
            };
        }
    },
    reader : com.frontier.gdc.system.oprationRoleManager.jsonReaderRP
});
 
 /**
  * 主Grid
  */
 com.frontier.gdc.system.oprationRoleManager.createRolePortalGrid = function(){
    //grid为可选模式
    var sm = new Ext.grid.CheckboxSelectionModel();
    //grid列定义
    var cm = new Ext.grid.ColumnModel([
        sm,
        new Ext.grid.RowNumberer(),
        {
            id : 'id',
            header : '序号',
            dataIndex : 'id',
            align : 'center',
            hidden:true
        }, {
            header : "标题",
            dataIndex : 'title',
            sortable : true,
            renderer:Ext.util.Format.htmlEncode,
            align : 'center'
        }, {
            header : "URL",
            dataIndex : 'url',
            renderer:Ext.util.Format.htmlEncode,
            align : 'center'
        }, {
            header : "高度",
            dataIndex : 'height',
            renderer:Ext.util.Format.htmlEncode,
            align : 'center'
        }, {
            header : "是否默认",
            dataIndex : 'isDefault',
            renderer : changeIdToName,
            align : 'center'
        }, {
            header : "描述",
            dataIndex : 'description',
            renderer:Ext.util.Format.htmlEncode,
            align : 'center'
        }
    ]);
    
    //分页工具栏
    var bbar =  new gdc.grid.PagingToolbar({
        pageSize : pageSize,
        store : com.frontier.gdc.system.oprationRoleManager.portalStore
    });  
    
    // Grid
    var grid = new Ext.grid.GridPanel({
        title : '',
        collapsible : true,
        animCollapse : false,
        loadMask : true,
        autoShow : true,
        cm : cm,
        sm : sm,
        store : com.frontier.gdc.system.oprationRoleManager.portalStore,
        viewConfig : {
           forceFit : true
        },
        bbar :bbar
    });
    com.frontier.gdc.system.oprationRoleManager.defineGrid = grid;
//    com.frontier.gdc.system.oprationRoleManager.portalStore.load({
//        params : {
//            start : 0,
//            limit : pageSize
//        }
//    });
    
    return com.frontier.gdc.system.oprationRoleManager.defineGrid;
 }
 
 
//角色Portal添加
com.frontier.gdc.system.oprationRoleManager.rolePortalSubmit = function(){
    //获取grid选中项
    var record = com.frontier.gdc.system.oprationRoleManager.definePortalGrid.getSelectionModel().getSelected();
    if (record) {
        var rows = com.frontier.gdc.system.oprationRoleManager.definePortalGrid.getSelections();
        var portalIds = "";
        for (var i = 0, len = rows.length; i < len; i++) {
            var id = rows[i].get("id");
            if (i == 0) {
                portalIds = portalIds + id;
            } else {
                portalIds = portalIds + "," + id;
            }
        }
        
        Ext.Ajax.request({
            // 保存角色Portal关系===========================================================================================
            url : gdc.webContextRoot + '/sysPortal/saveRolePortalRalition.action',
            params : {"roleId" : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId,"portalIds" : portalIds},
            success : function(result,request) {
                var res = result.responseText;
                var tem = eval('('+res+')');
                if(tem.success==true){
                    com.frontier.gdc.system.oprationRoleManager.roleAddPortalManagerWindow.hide();
                    //刷新
                    com.frontier.gdc.system.oprationRoleManager.portalStore.load({
                        params : {
                            start : 0,
                            limit : pageSize,
                            roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId
                        }
                    });
                    Appframe.viewinfdlg.right.show("操作成功！",true);
                }
            }
        });
        
    } else {
        Appframe.viewinfdlg.parent.warning.show("请选择要添加的Portal！",false);
    }
}
 //角色添加Portalwindow
com.frontier.gdc.system.oprationRoleManager.roleAddPortalManagerWindow = null;
com.frontier.gdc.system.oprationRoleManager.roleAddPortalManager = function(){
    if(!com.frontier.gdc.system.oprationRoleManager.roleAddPortalManagerWindow){
        com.frontier.gdc.system.oprationRoleManager.roleAddPortalManagerWindow = new Ext.Window( {
            title : '添加PORTAL',
            width : 700,
            height : 400,
            closeAction : 'hide',
            plain : true,
            modal:true,
            layout : 'border',
            tbar: [
                {
                    text : '保存',
                    iconCls: 'save',
                    handler : function() {
                        com.frontier.gdc.system.oprationRoleManager.rolePortalSubmit();
                    }
                },
                new Ext.form.TextField({
                     id:'serchPortalName',
                     name : 'name',
                     maxLength : 30,
                     maxLengthText : "输入的字符不能超过30位",
                     emptyText :'请输入Portal标题',
                     width:120
                })
                , {
                    text : '查询',
                    iconCls: 'search',
                    handler : function() {
                        var name = Ext.getCmp('serchPortalName').getValue();
                        com.frontier.gdc.system.oprationRoleManager.portalListStore.load({
                            params : {
                                start : 0,
                                limit : pageSize,
                                serchPortalTitle:name,
                                roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId
                            }
                        });
                    }
                }
            ],
            items :[
                 {
                    region : 'center',
                    title : '',
                    split : true,
                    title: '',
                    autoScroll : true,
                    width : 200,
                    collapsible : true,
                    layout : 'accordion',
                    layoutConfig : {
                        animate : true
                    },
                    layout : 'fit',
                    items : [com.frontier.gdc.system.oprationRoleManager.createPortalGrid()]
                }
            ]
        });
    }
    com.frontier.gdc.system.oprationRoleManager.portalListStore.reload();
    com.frontier.gdc.system.oprationRoleManager.roleAddPortalManagerWindow.show();
}

// 被选Portal 列表
com.frontier.gdc.system.oprationRoleManager.definePortalGrid = null;
 /**
  * 列表Store
  */
 com.frontier.gdc.system.oprationRoleManager.portalListStore = new Ext.data.Store({
    proxy : new Ext.data.HttpProxy( {
        // 排除RoleID所关联的所有Portal以外的Portal信息列表=========================================================================================
        url : gdc.webContextRoot+'/sysPortal/findPortalsByRoleIdExt.action'
    }),
    listeners : {
        "beforeload" : function(store) {
            store.removeAll();
            store.baseParams = {
                roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId
            };
        }
    },
    reader : com.frontier.gdc.system.oprationRoleManager.jsonReaderRP
});
 
 /**
  * 主Grid
  */
 com.frontier.gdc.system.oprationRoleManager.createPortalGrid = function(){
    //grid为可选模式
    var sm = new Ext.grid.CheckboxSelectionModel();
    //grid列定义
    var cm = new Ext.grid.ColumnModel([
        sm,
        new Ext.grid.RowNumberer(),
        {
            id : 'id',
            header : '序号',
            dataIndex : 'id',
            align : 'center',
            hidden:true
        }, {
            header : "标题",
            dataIndex : 'title',
            sortable : true,
            renderer:Ext.util.Format.htmlEncode,
            align : 'center'
        }, {
            header : "URL",
            dataIndex : 'url',
            renderer:Ext.util.Format.htmlEncode,
            align : 'center'
        }, {
            header : "高度",
            dataIndex : 'height',
            renderer:Ext.util.Format.htmlEncode,
            align : 'center'
        }, {
            header : "是否默认",
            dataIndex : 'isDefault',
            renderer : changeIdToName,
            align : 'center'
        }, {
            header : "描述",
            dataIndex : 'description',
            renderer:Ext.util.Format.htmlEncode,
            align : 'center'
        }
    ]);
    
    //分页工具栏
    var bbar =  new gdc.grid.PagingToolbar({
        pageSize : pageSize,
        store : com.frontier.gdc.system.oprationRoleManager.portalListStore
    });  
    
    // Grid
    var grid = new Ext.grid.GridPanel({
        title : '',
        collapsible : true,
        animCollapse : false,
        loadMask : true,
        autoShow : true,
        cm : cm,
        sm : sm,
        store : com.frontier.gdc.system.oprationRoleManager.portalListStore,
        viewConfig : {
           forceFit : true
        },
        bbar :bbar
    });
    com.frontier.gdc.system.oprationRoleManager.definePortalGrid = grid;
    com.frontier.gdc.system.oprationRoleManager.portalListStore.load({
        params : {
            start : 0,
            limit : pageSize
        }
    });
    
    return com.frontier.gdc.system.oprationRoleManager.definePortalGrid;
 }
 
//角色Portal关系删除
com.frontier.gdc.system.oprationRoleManager.rolePortalDelete = function(){
    //获取grid选中项
    var record = com.frontier.gdc.system.oprationRoleManager.defineGrid.getSelectionModel().getSelected();
    if (record) {
        Ext.Msg.confirm('确认删除', '你确认要删除吗？', function(btn) {
            var rows = com.frontier.gdc.system.oprationRoleManager.defineGrid.getSelections();
            var portalIds = "";
            for (var i = 0, len = rows.length; i < len; i++) {
                var id = rows[i].get("id");
                if (i == 0) {
                    portalIds = portalIds + id;
                } else {
                    portalIds = portalIds + "," + id;
                }
            }
            if (btn == 'yes') {
                Ext.Ajax.request({
                    // 删除portal role 关系=====================================================================================================
                    url : gdc.webContextRoot + '/sysPortal/deleteRolePortalRalition.action',
                    params : {"roleId" : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId,"portalIds" : portalIds},
                    success : function(result,request) {
                        var res = result.responseText;
                        var tem = eval('('+res+')');
                        if(tem.success==true){
                            //刷新
                            com.frontier.gdc.system.oprationRoleManager.portalStore.load({
                                params : {
                                    start : 0,
                                    limit : pageSize,
                                    roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId
                                }
                            });
                            Appframe.viewinfdlg.right.show("操作成功！",true);
                        }
                    }
                });
            }
        })
    } else {
        Appframe.viewinfdlg.parent.warning.show("请选择要删除的用户！",false);
    }
} 





//**************************************************************角色复制*****************************************************************
com.frontier.gdc.system.oprationRoleManager.roleCopy = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationRoleManager.grid.getSelectionModel().getSelected();
	if (record) {
		var rows = com.frontier.gdc.system.oprationRoleManager.grid.getSelections();
		if (rows.length > 1) {
			Appframe.viewinfdlg.warning.show('只能选择一个角色进行复制！');
			return false;
		} 
		com.frontier.gdc.system.oprationRoleManager.roleId = rows[0].get("id");
	} else {
		Appframe.viewinfdlg.warning.show('请选择要复制的角色！');
		return false;
	}
	
	if(!com.frontier.gdc.system.oprationRoleManager.roleCopyWindow){
		//组织树
		com.frontier.gdc.system.oprationRoleManager.roleCopyOrgTree = new Ext.tree.TreePanel({
			region : 'west',
			layout:'fit',
			rootVisible : false,
			checkModel : 'multiple', // 对树的级联多选
			onlyLeafCheckable : false,
			autoScroll : true,
			loader : new Ext.tree.TreeLoader({
				dataUrl : gdc.webContextRoot+'/specialOrg/searchSpecialOrgTree.action',
				listeners : {
					'beforeload' : function(loader, node) {
						this.baseParams.spOrgId = currUser['spOrgId'];// 统一框架角色组织ID,by:guojinhui2009/10/19
						if (!gdc.isPagePurview) {
							this.baseParams.curRoleID = '';
						} else {
							this.baseParams.curRoleID = gdc.currentRoleId;// 增加传递当前用户所选的角色ID，by：guojinhui//
						}
					}
				},
				baseAttrs : {uiProvider : Ext.ux.TreeCheckNodeUI}
			}),
			root:new Ext.tree.AsyncTreeNode({
				id : '0',
				text : '业务组织'
			}),
			listeners:{
				"checkchange": function(node,checked) {
					if(node.isExpanded()){
						var childs = node.childNodes;
						if(childs){
							com.frontier.gdc.system.oprationRoleManager.relatingCheck(node,childs);
						}
					}
				}
			}
		});
		
		//节点关联选择方法(如果节点选中的时候是展开的，选中其子节点)
		com.frontier.gdc.system.oprationRoleManager.relatingCheck = function(node,childs){
			for(var n=0;n<childs.length;n++){
				childs[n].ui.toggleCheck(node.attributes.checked);
				if(childs[n].expanded){
					var cchilds = childs[n].childNodes;
					if(cchilds){
						com.frontier.gdc.system.oprationRoleManager.relatingCheck(childs[n],cchilds);
					}
				}
			}
		}
		
		//角色复制window
		com.frontier.gdc.system.oprationRoleManager.roleCopyWindow = new Ext.Window({
			title:'角色复制',
			layout:'fit',
			width:300,
			height : 400,
			closeAction : 'hide',
			plain : true,
			modal:true,
			tbar: [{
				text : '提交',
				iconCls: 'submit',
				handler : function() {
					com.frontier.gdc.system.oprationRoleManager.roleCopySubmit();
				}
			}],
			items:com.frontier.gdc.system.oprationRoleManager.roleCopyOrgTree,
			listeners:{
				hide:function(){
					com.frontier.gdc.system.oprationRoleManager.roleCopyOrgTree.getRootNode().reload();
				}
			}
		});
	}
	com.frontier.gdc.system.oprationRoleManager.roleCopyWindow.show();
}

//角色复制提交
com.frontier.gdc.system.oprationRoleManager.roleCopySubmit = function(){
	var checkedNodes = com.frontier.gdc.system.oprationRoleManager.roleCopyOrgTree.getChecked();
	var json = "";
	if(checkedNodes && checkedNodes.length>0){
		for(var i=0;i<checkedNodes.length;i++){
			var id = checkedNodes[i].id;
			if(i!=checkedNodes.length-1){
				json += id+",";
			}else{
				json += id;
			}
		}
	}else{
		Appframe.viewinfdlg.warning.show('请选择要复制角色的单位！');
		return false;
	}
	Ext.Ajax.request({
		url : gdc.webContextRoot + 'sysRole/copyRole.action',
		params : {"orgIds" : json,"roleId":com.frontier.gdc.system.oprationRoleManager.roleId},
		success : function(result,request) {
			var res = result.responseText;
			var tem = eval('('+res+')');
			if(tem.success==true){
				com.frontier.gdc.system.oprationRoleManager.roleCopyWindow.hide();
				Appframe.viewinfdlg.parent.right.show("复制成功！",true);
			}
		}
	});
}

/**
 * *****************************************角色消息通知授权*****************************
 */
com.frontier.gdc.system.oprationRoleManager.roleNoticeManage = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationRoleManager.grid.getSelectionModel().getSelected();
	if (record) {
		var rows = com.frontier.gdc.system.oprationRoleManager.grid.getSelections();
		if (rows.length > 1) {
			Appframe.viewinfdlg.warning.show('只能选择一个业务角色！');
			return false;
		} 
		var roleId = rows[0].get("id");
		if(roleId){
			com.frontier.gdc.system.oprationRoleManager.roleUserRoleId = roleId;
			com.frontier.gdc.system.oprationRoleManager.roleUserManager();
		}
	} else {
		Appframe.viewinfdlg.warning.show('请选择业务角色！');
	}
}

//角色消息通知授权window
com.frontier.gdc.system.oprationRoleManager.roleNoticeManagerWindow = null;
com.frontier.gdc.system.oprationRoleManager.roleNoticeManager = function(){
	if(!com.frontier.gdc.system.oprationRoleManager.roleNoticeManagerWindow){
		com.frontier.gdc.system.oprationRoleManager.roleNoticeManagerWindow = new Ext.Window( {
			title : '角色消息通知授权',
			width : 700,
			height : 450,
			closeAction : 'hide',
			plain : true,
			modal:true,
			layout : 'fit',
			tbar: [{
				text : '保存',
				iconCls: 'save',
				handler : function() {
					alert('保存');
					//com.frontier.gdc.system.oprationRoleManager.roleAddUserManager();
				}
			}],
			items :com.frontier.gdc.system.oprationRoleManager.createRoleUserGrid()
			
		});
	}
	
	com.frontier.gdc.system.oprationRoleManager.roleUserDs.load({
        params : {
            start : 0,
            limit : pageSize,
            roleId : com.frontier.gdc.system.oprationRoleManager.roleUserRoleId
        }
    });
    
    com.frontier.gdc.system.oprationRoleManager.roleNoticeManagerWindow.show();
}

//角色消息通知授权grid
com.frontier.gdc.system.oprationRoleManager.roleUserGrid = null;
com.frontier.gdc.system.oprationRoleManager.createRoleUserGrid = function(){
	if(!com.frontier.gdc.system.oprationRoleManager.roleUserGrid){
		//grid 列定义
		//var sm = new Ext.grid.CheckboxSelectionModel();
		var cm = new Ext.grid.ColumnModel([
			//sm,
			//new Ext.grid.RowNumberer(), 
			{
		        id : 'userId',
		        header : '用户Id',
		        dataIndex : 'userId',
		        align : 'center',
		        hidden:true,
		        width: 50
		    }, {
		        header : "姓名",
		        dataIndex : 'userName',
		        sortable : true,
		        align : 'center',
		        width: 50
		        ,renderer:Ext.util.Format.htmlEncode
		    }, {
		        header : "用户名",
		        dataIndex : 'loginName',
		        sortable : true,
		        align : 'center',
		        width: 50
		        ,renderer:Ext.util.Format.htmlEncode
		    }, {
		        header : "组织机构",
		        dataIndex : 'specialOrgName',
		        align : 'center',
		        width: 50
		        ,renderer:Ext.util.Format.htmlEncode
		    }, {
		        header : "用户状态",
		        dataIndex : 'isAvaliable',
		        renderer: pctChange,
		        align : 'center',
		        width: 50
		    }
	    ]);
	    
	    //分页工具栏
	    /*var bbar =  new Ext.PagingToolbar( {
	        pageSize : pageSize,
	        store : com.frontier.gdc.system.oprationRoleManager.roleUserDs,
	        displayInfo : true,
	        displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
	        emptyMsg : '无数据'
	    });*/
	    
	    //grid 
	    var grid = new Ext.grid.GridPanel({
	    	title : '',
	        collapsible : true,// 是否可以展开
	        animCollapse : false,// 展开时是否有动画效果
	        loadMask : true,// 载入遮罩动画
	        autoShow : true,
	        cm : cm,
	        //sm : sm,
	        store :com.frontier.gdc.system.oprationRoleManager.roleUserDs,
	        viewConfig : {
	           forceFit : true
	        }
	        //bbar :bbar
		});
		com.frontier.gdc.system.oprationRoleManager.roleUserGrid = grid;
	}
	return com.frontier.gdc.system.oprationRoleManager.roleUserGrid;
}


/**
 * ********************************************************************************角色管理主界面*****************************
 */
com.frontier.gdc.system.oprationRoleManager.newMainPanel = function(){
	var panel = new Ext.Panel({
		layout : 'border',
		items : [{
				region : 'west',
				title : '',
				split : true,
				title: '业务组织',
				autoScroll : true,
				width : 300,
				collapsible : true,
				layout : 'accordion',
				layoutConfig : {
					animate : true
				},
				layout : 'fit',
				items : [com.frontier.gdc.system.oprationRoleManager.createTree()]
			},{
				region : 'center',
				title : '',
				split : true,
				title: '',
				autoScroll : true,
				width : 200,
				collapsible : true,
				layout : 'accordion',
				layoutConfig : {
					animate : true
				},
				layout : 'fit',
				items : [com.frontier.gdc.system.oprationRoleManager.createGrid()]
			}
			
		]
		
	});
	return panel;
}



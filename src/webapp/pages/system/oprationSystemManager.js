/**
 * <p>Title: 购电侧系统</p>
 * <p>Description:业务系统管理</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("com.frontier.gdc.system.oprationSystemManager");

//提交类型 insert update delete
com.frontier.gdc.system.oprationSystemManager.submitType = '';
//机构id
com.frontier.gdc.system.oprationSystemManager.specialOrgId = '';
//删除记录的id
com.frontier.gdc.system.oprationSystemManager.deleteIds = '';
//页记录数
var pageSize = gdc.constant.pageSize;


//系统列表 grid reader
com.frontier.gdc.system.oprationSystemManager.jsonReader = new Ext.data.JsonReader({
        root : 'list',
        totalProperty : 'totalCount',
        id : 'id',
        successProperty : '@success'
    }, [ {
        name : 'id',
        mapping : 'id',
        type : 'float'
    }, {
        name : 'systemName',
        mapping : 'systemName'
    }, {
        name : 'systemCode',
        mapping : 'systemCode'
	}, {
        name : 'deployUrl',
        mapping : 'deployUrl'
	}, {
        name : 'deployUrl',
        mapping : 'deployUrl'
	}, {
        name : 'isInit',
        mapping : 'isInit'
	}]
);
	
//系统列表 grid store
com.frontier.gdc.system.oprationSystemManager.ds = new Ext.data.Store({
    proxy : new Ext.data.HttpProxy( {
        url : gdc.webContextRoot+'sysSystem/findAllSystem.action'
    }),
    reader : com.frontier.gdc.system.oprationSystemManager.jsonReader
});

//系统列表 grid
com.frontier.gdc.system.oprationSystemManager.grid = null;
com.frontier.gdc.system.oprationSystemManager.createGrid = function(){
	
	//grid 列定义
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel([
		
		sm,
		new Ext.grid.RowNumberer(),
		//new Ext.grid.RowNumberer(), 
		{
	        id : 'id',
	        header : '序号',
	        dataIndex : 'id',
	        align : 'center',
	        width: 50
	    }, {
	        header : "系統名称",
	        dataIndex : 'systemName',
	        sortable : true,
	        align : 'center',
	        width: 50,
			renderer:Ext.util.Format.htmlEncode
	    }, {
	        header : "系統编码",
	        dataIndex : 'systemCode',
	        align : 'center',
	        width: 50,
			renderer:Ext.util.Format.htmlEncode
	    }, {
	        header : "系统地址",
	        dataIndex : 'deployUrl',
	        align : 'center',
	        width : 100,
			renderer:Ext.util.Format.htmlEncode
	    }, {
	        header : "init",
	        dataIndex : 'isInit',
	        hidden:true,
	        align : 'center',
	        width : 100,
			renderer:Ext.util.Format.htmlEncode
	    }
	    
    ]);
    
    //分页工具栏 new Ext.PagingToolbar
    var bbar =  new gdc.grid.PagingToolbar( {
        pageSize : pageSize,
        store : com.frontier.gdc.system.oprationSystemManager.ds
        //displayInfo : true,
        //displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
        //emptyMsg : '无数据'
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
        store : com.frontier.gdc.system.oprationSystemManager.ds,
        viewConfig : {
           forceFit : true
        },
        tbar : [{
	            id : 'New',
	            text : ' 新增 ',
	            iconCls : 'add',
	            bizCode:'systemNew',
	            handler : function() {
	            	//Ext.getCmp('soId').setValue(com.frontier.gdc.system.oprationSystemManager.specialOrgId);
	            	com.frontier.gdc.system.oprationSystemManager.addForm.form.reset();
	            	com.frontier.gdc.system.oprationSystemManager.addWindow.show();
	            }
	        },{
	            id:'update',
	            text : '修改',
	            tooltip : '修改',
	            iconCls : 'edit',
	            bizCode:'systemUpdate',
	            handler : function() {
	                com.frontier.gdc.system.oprationSystemManager.update();
	            }
	        }, {
	        	id:'delete',
	            text : '删除',
	            tooltip : '删除被选择的内容',
	            bizCode:'systemDelete',
	            iconCls : 'remove',
	            handler : function() {
	                com.frontier.gdc.system.oprationSystemManager.deleteSystem();
	            }
	        }
        ],
		bbar :bbar
	});
	com.frontier.gdc.system.oprationSystemManager.grid = grid;
	com.frontier.gdc.system.oprationSystemManager.ds.load({
		params : {
            start : 0,
            limit : pageSize
		}
    });
	
	return com.frontier.gdc.system.oprationSystemManager.grid;
}


//系统form加载方法
com.frontier.gdc.system.oprationSystemManager.loadFormData = function(id) {
	 com.frontier.gdc.system.oprationSystemManager.updateForm.form.load( {
        url : gdc.webContextRoot+'sysSystem/findSystemById.action?systemId='+id,
        waitMsg : '正在载入数据...',
        failure : function() {
            
        },
        success : function() {
           
        }
    });
}

//系统form 提交
com.frontier.gdc.system.oprationSystemManager.formSubmit = function(form,window){
	var url = '';
	if('insert'==com.frontier.gdc.system.oprationSystemManager.submitType){
		url = 'sysSystem/insertSystem.action';
	}else if('update'==com.frontier.gdc.system.oprationSystemManager.submitType){
		url = 'sysSystem/modifySystem.action';
	}
	if (form.form.isValid(form)) {
		form.form.submit( {
            url : gdc.webContextRoot+url,
            success : function(from, action) {
            	window.hide();
            	Appframe.viewinfdlg.parent.right.show("操作成功！",true);
            	com.frontier.gdc.system.oprationSystemManager.ds.reload();
            	
            },
            waitMsg : '正在保存数据，稍后...'
        });
    }
}

//删除业务系统
com.frontier.gdc.system.oprationSystemManager.deleteSystem = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationSystemManager.grid.getSelectionModel().getSelected();
	if (record) {
		Ext.Msg.confirm('确认删除', '你确认要删除吗？', function(btn) {
			var rows = com.frontier.gdc.system.oprationSystemManager.grid.getSelections();
			var jsonData = "";
			var initSystem = "";
			for (var i = 0, len = rows.length; i < len; i++) {
				var id = rows[i].get("id");
				if (i == 0) {
					jsonData = jsonData + id;
				} else {
					jsonData = jsonData + "," + id;
				}
				if(rows[i].get("isInit")=='Y'){
					initSystem += rows[i].get("systemName")+'|';
				}
			}
			if(initSystem.length>0){
				initSystem = initSystem.substring(0,initSystem.length-1);
				Appframe.viewinfdlg.warning.show(initSystem+' 不能删除！');
				return;
			}
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : gdc.webContextRoot + 'sysSystem/deleteSystem.action',
					params : {"systemIds" : jsonData},
					success : function(result,request) {
						var res = result.responseText;
						var tem = eval('('+res+')');
						if(tem.success==true){
							com.frontier.gdc.system.oprationSystemManager.ds.reload();
							Appframe.viewinfdlg.parent.right.show("操作成功！",true);
						}
					}
				});
			}
		});
	} else {
		Appframe.viewinfdlg.warning.show('请选择要删除的系统！');
		//Ext.MessageBox.alert('删除业务角色', '请选择要删除的业务角色！');
	}
}

//系统form reader
com.frontier.gdc.system.oprationSystemManager.jsonFormReader = new Ext.data.JsonReader({
		root : 'list',
		id : 'id',
		successProperty : '@success'
	},
	[ {
		name : 'sysSystem.id',
        mapping : 'id',
        type : 'float'
    },{
		name : 'sysSystem.systemName',
        mapping : 'systemName'
    },{
    	name : 'sysSystem.systemCode',
        mapping : 'systemCode',
        type : 'string'
    }, {
    	name : 'sysSystem.deployUrl',
        mapping : 'deployUrl',
        type : 'string'
    }
]);

//系统添加form
com.frontier.gdc.system.oprationSystemManager.addForm = new gdc.FormPanel({
	labelWidth : 100,
	frame : true,
	labelAlign : 'right',
	//style : 'padding:1 1 1 1',
	bodyStyle : 'padding:5px 5px 0',
	//reader:com.frontier.gdc.system.oprationSystemManager.jsonFormReader,
	items:[
		new Ext.form.Hidden({
              fieldLabel: '',
              name: 'sysSystem.id'
             
        }),new Ext.form.TextField({
	    	 fieldLabel : '系统名称',
			 name : 'sysSystem.systemName',
			 allowBlank:false,
			 maxLength : 30,
			 maxLengthText : "输入的字符不能超过30位",
			 width:200
	    }),new Ext.form.TextField({
	    	 fieldLabel : '系统编码',
			 name : 'sysSystem.systemCode',
			  allowBlank:false,
			 maxLength : 15,
			 maxLengthText : "输入的字符不能超过15位",
			 width:200
	    }),new Ext.form.TextArea({
	    	 fieldLabel : '系统地址',
			 name : 'sysSystem.deployUrl',
			 maxLength : 200,
			 maxLengthText : "输入的字符不能超过200位",
			 width:200
	    })
	]
});

//系统修改form
com.frontier.gdc.system.oprationSystemManager.updateForm = new gdc.FormPanel({
	labelWidth : 100,
	frame : true,
	labelAlign : 'right',
	//style : 'padding:1 1 1 1',
	bodyStyle : 'padding:5px 5px 0',
	reader:com.frontier.gdc.system.oprationSystemManager.jsonFormReader,
	items:[
		new Ext.form.Hidden({
              fieldLabel: '',
              name: 'sysSystem.id'
             
        }),new Ext.form.TextField({
	    	 fieldLabel : '系统名称',
			 name : 'sysSystem.systemName',
			 allowBlank:false,
			 maxLength : 30,
			 maxLengthText : "输入的字符不能超过30位",
			 width:200
	    }),new Ext.form.TextField({
	    	 fieldLabel : '系统编码',
			 name : 'sysSystem.systemCode',
			  allowBlank:false,
			 maxLength : 15,
			 maxLengthText : "输入的字符不能超过13位",
			 width:200
	    }),new Ext.form.TextArea({
	    	 fieldLabel : '系统地址',
			 name : 'sysSystem.deployUrl',
			 maxLength : 500,
			 maxLengthText : "输入的字符不能超过500位",
			 width:200
	    })
	]
});

//新增窗口
com.frontier.gdc.system.oprationSystemManager.addWindow = new Ext.Window( {
	title : '新增系统',
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
			com.frontier.gdc.system.oprationSystemManager.submitType = 'insert';
			com.frontier.gdc.system.oprationSystemManager.formSubmit(com.frontier.gdc.system.oprationSystemManager.addForm,com.frontier.gdc.system.oprationSystemManager.addWindow);
		}
	}],
	items :com.frontier.gdc.system.oprationSystemManager.addForm
	
});

//修改窗口
com.frontier.gdc.system.oprationSystemManager.updateWindow = null;

//修改窗口
com.frontier.gdc.system.oprationSystemManager.update = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.oprationSystemManager.grid.getSelectionModel().getSelected();
	if (record) {
		var rows = com.frontier.gdc.system.oprationSystemManager.grid.getSelections();
		if (rows.length > 1) {
			Appframe.viewinfdlg.warning.show('只能选择一条进行修改！');
			return false;
		} 
		var roleId = rows[0].get("id");
		if(roleId){
			com.frontier.gdc.system.oprationSystemManager.loadFormData(roleId);
		}
	} else {
		Appframe.viewinfdlg.warning.show('请选择要修改的系统！');
		return false;
	}
	
	//创建并显示修改窗口
	if(!com.frontier.gdc.system.oprationSystemManager.updateWindow){
		com.frontier.gdc.system.oprationSystemManager.updateWindow = new Ext.Window({
			title : '修改系统',
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
						com.frontier.gdc.system.oprationSystemManager.submitType = 'update';
						com.frontier.gdc.system.oprationSystemManager.formSubmit(com.frontier.gdc.system.oprationSystemManager.updateForm,com.frontier.gdc.system.oprationSystemManager.updateWindow);
					}
				}
			],
			items :com.frontier.gdc.system.oprationSystemManager.updateForm
		});
	}
	com.frontier.gdc.system.oprationSystemManager.updateWindow.show();
}

com.frontier.gdc.system.oprationSystemManager.newMainPanel = function(){
	var panel = new Ext.Panel({
		layout : 'fit',
		border : false,
		items:[com.frontier.gdc.system.oprationSystemManager.createGrid ()]
	})
	return panel;
}

////显示
//Ext.onReady(function(){
//	Ext.QuickTips.init();
////	var viewport = new Ext.Viewport({
////		layout : 'fit',
////		items : [com.frontier.gdc.system.oprationSystemManager.createGrid ()]
////		
////	});
//	gdc.openModule.openModule(com.frontier.gdc.system.oprationSystemManager.createGrid (),'select');
//	
//});
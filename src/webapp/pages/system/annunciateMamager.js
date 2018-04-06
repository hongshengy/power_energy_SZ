/**
 * <p>Title: 购电侧公告</p>
 * <p>Description:业务公告管理</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("com.frontier.gdc.system.annunciateManager");

//提交类型 insert update delete
com.frontier.gdc.system.annunciateManager.submitType = '';
//机构id
com.frontier.gdc.system.annunciateManager.specialOrgId = '';
//删除记录的id
com.frontier.gdc.system.annunciateManager.deleteIds = '';
//页记录数
var pageSize = gdc.constant.pageSize;


//公告列表 grid reader
com.frontier.gdc.system.annunciateManager.jsonReader = new Ext.data.JsonReader({
        root : 'list',
        totalProperty : 'totalCount',
        id : 'id',
        successProperty : '@success'
    }, [ {
        name : 'id',
        mapping : 'id',
        type : 'float'
    }, {
        name : 'content1',
        mapping : 'content1'
	}, {
        name : 'content',
        mapping : 'content'
    }, {
        name : 'releaseTime',
        mapping : 'releaseTime'
	}, {
        name : 'userName',
        mapping : 'userName'
	}, {
        name : 'content2',
        mapping : 'content2'
	}, {
        name : 'content3',
        mapping : 'content3'
	}]
);
	
//公告列表 grid store
com.frontier.gdc.system.annunciateManager.ds = new Ext.data.Store({
    proxy : new Ext.data.HttpProxy( {
        url : gdc.webContextRoot+'annunciate/findAllAnnunciate.action'
    }),
    reader : com.frontier.gdc.system.annunciateManager.jsonReader
});

function getStateName(value){
    if (value == 'Y') {
        return "是";
    }else {
    	return "否";
    }  
}

//公告列表 grid
com.frontier.gdc.system.annunciateManager.grid = null;
com.frontier.gdc.system.annunciateManager.createGrid = function(){
	
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
	        hidden:true,
	        width: 50
	    }, {
	        header : "标题",
	        dataIndex : 'content1',
	        align : 'center',
	        //hidden:true,
	        width : 100,
			renderer:Ext.util.Format.htmlEncode
	    }, {
	        header : "公告",
	        dataIndex : 'content',
	        sortable : true,
	        align : 'center',
	        width: 200,
			renderer:Ext.util.Format.htmlEncode
	    }, {
	        header : "发布时间",
	        dataIndex : 'releaseTime',
	        align : 'center',
	        width: 100,
			renderer:Ext.util.Format.htmlEncode
	    }, {
	        header : "发布人",
	        dataIndex : 'userName',
	        align : 'center',
	        width: 100,
			renderer:Ext.util.Format.htmlEncode
	    }, {
	        header : "是否发布",
	        dataIndex : 'content2',
	        align : 'center',
	        //hidden:true,
	        renderer:getStateName,
	        width : 50
			//renderer:Ext.util.Format.htmlEncode
	    }, {
	        header : "备用3",
	        dataIndex : 'content3',
	        align : 'center',
	        hidden:true,
	        width : 50,
			renderer:Ext.util.Format.htmlEncode
	    }
	    
    ]);
    
    //分页工具栏 new Ext.PagingToolbar
    var bbar =  new gdc.grid.PagingToolbar( {
        pageSize : pageSize,
        store : com.frontier.gdc.system.annunciateManager.ds
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
        store : com.frontier.gdc.system.annunciateManager.ds,
        viewConfig : {
           forceFit : true
        },
        tbar : [{
	            id : 'New',
	            text : ' 新增 ',
	            iconCls : 'add',
	            bizCode:'new',
	            handler : function() {
	            	//Ext.getCmp('soId').setValue(com.frontier.gdc.system.annunciateManager.specialOrgId);
	            	com.frontier.gdc.system.annunciateManager.addForm.form.reset();
	            	com.frontier.gdc.system.annunciateManager.addWindow.show();
	            }
	        },{
	            id:'update',
	            text : '修改',
	            tooltip : '修改',
	            iconCls : 'edit',
	            bizCode:'update',
	            handler : function() {
	                com.frontier.gdc.system.annunciateManager.update();
	            }
	        }, {
	        	id:'delete',
	            text : '删除',
	            tooltip : '删除被选择的内容',
	            bizCode:'delete',
	            iconCls : 'remove',
	            handler : function() {
	                com.frontier.gdc.system.annunciateManager.deleteSystem();
	            }
	        }
        ],
		bbar :bbar
	});
	com.frontier.gdc.system.annunciateManager.grid = grid;
	com.frontier.gdc.system.annunciateManager.ds.load({
		params : {
            start : 0,
            limit : pageSize
		}
    });
	
	return com.frontier.gdc.system.annunciateManager.grid;
}


//公告form加载方法
com.frontier.gdc.system.annunciateManager.loadFormData = function(id) {
	 com.frontier.gdc.system.annunciateManager.updateForm.form.load( {
        url : gdc.webContextRoot+'annunciate/findAnnunciateById.action?id='+id,
        waitMsg : '正在载入数据...',
        failure : function() {
            
        },
        success : function() {
           
        }
    });
}

//公告form 提交
com.frontier.gdc.system.annunciateManager.formSubmit = function(form,window){
	var url = '';
	if('insert'==com.frontier.gdc.system.annunciateManager.submitType){
		url = 'annunciate/insertAnnunciate.action';
	}else if('update'==com.frontier.gdc.system.annunciateManager.submitType){
		url = 'annunciate/modifyAnnunciate.action';
	}
	if (form.form.isValid(form)) {
		form.form.submit( {
            url : gdc.webContextRoot+url,
            success : function(from, action) {
            	window.hide();
            	Appframe.viewinfdlg.parent.right.show("操作成功！",true);
            	com.frontier.gdc.system.annunciateManager.ds.reload();
            	
            },failure : function(form, action) {
               //Appframe.viewinfdlg.error.show("操作失败！");
            },
            waitMsg : '正在保存数据，稍后...'
        });
    }
}

//删除业务公告
com.frontier.gdc.system.annunciateManager.deleteSystem = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.annunciateManager.grid.getSelectionModel().getSelected();
	if (record) {
		Ext.Msg.confirm('确认删除', '你确认要删除吗？', function(btn) {
			var rows = com.frontier.gdc.system.annunciateManager.grid.getSelections();
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
					url : gdc.webContextRoot + 'annunciate/deleteAnnunciate.action',
					params : {"id" : jsonData},
					success : function(result,request) {
						var res = result.responseText;
						var tem = eval('('+res+')');
						if(tem.success==true){
							com.frontier.gdc.system.annunciateManager.ds.reload();
							Appframe.viewinfdlg.parent.right.show("操作成功！",true);
						}
					}
				});
			}
		});
	} else {
		Appframe.viewinfdlg.warning.show('请选择要删除的公告！');
		//Ext.MessageBox.alert('删除业务角色', '请选择要删除的业务角色！');
	}
}

//公告form reader
com.frontier.gdc.system.annunciateManager.jsonFormReader = new Ext.data.JsonReader({
		root : 'list',
		id : 'id',
		successProperty : '@success'
	},
	[ {
		name : 'annunciate.id',
        mapping : 'id',
        type : 'float'
    },{
		name : 'annunciate.content',
        mapping : 'content'
    },{
    	name : 'annunciate.releaseTime',
        mapping : 'releaseTime',
        type : 'string'
    },{
    	name : 'annunciate.content1',
        mapping : 'content1',
        type : 'string'
    },{
    	name : 'annunciate.content2',
        mapping : 'content2',
        type : 'string'
    },{
    	name : 'annunciate.content3',
        mapping : 'content3',
        type : 'string'
    }
]);

//公告添加form
com.frontier.gdc.system.annunciateManager.addForm = new gdc.FormPanel({
	labelWidth : 70,
	frame : true,
	labelAlign : 'right',
	//style : 'padding:1 1 1 1',
	bodyStyle : 'padding:5px 5px 0',
	//reader:com.frontier.gdc.system.annunciateManager.jsonFormReader,
	items:[
		new Ext.form.Hidden({
              fieldLabel: '',
              name: 'annunciate.id'
             
        }),new Ext.form.TextField({
	    	 fieldLabel : '标题',
			 name : 'annunciate.content1',
			 allowBlank:false,
			 maxLength : 32,
			 maxLengthText : "输入的字符不能超过32位",
			 width:350
	    }),new Ext.form.ComboBox({
				fieldLabel : '是否发布',
				hiddenName : 'annunciate.content2',
				triggerAction:'all',
				store:new Ext.data.SimpleStore({
					fields: ['val','tex'],
					data: [
						['Y','是'],
						['N','否']
					]
				}),
				valueField:'val',
				displayField:'tex',
				mode:'local',
				width:350,
				forceSelection:true,
				resizable:true,
				allowBlank:false,
				editable:false
		}),new Ext.form.TextArea({
	    	 fieldLabel : '公告',
			 name : 'annunciate.content',
			 allowBlank:false,
			 maxLength : 1024,
			 maxLengthText : "输入的字符不能超过1024位",
			 width:350,
			 height:200
	    })
	]
});

//公告修改form
com.frontier.gdc.system.annunciateManager.updateForm = new gdc.FormPanel({
	labelWidth : 70,
	frame : true,
	labelAlign : 'right',
	//style : 'padding:1 1 1 1',
	bodyStyle : 'padding:5px 5px 0',
	reader:com.frontier.gdc.system.annunciateManager.jsonFormReader,
	items:[
		new Ext.form.Hidden({
              fieldLabel: '',
              name: 'annunciate.id'
             
        }),new Ext.form.TextField({
	    	 fieldLabel : '标题',
			 name : 'annunciate.content1',
			 allowBlank:false,
			 maxLength : 32,
			 maxLengthText : "输入的字符不能超过32位",
			 width:350
	    }),new Ext.form.ComboBox({
				fieldLabel : '是否发布',
				hiddenName : 'annunciate.content2',
				triggerAction:'all',
				store:new Ext.data.SimpleStore({
					fields: ['val','tex'],
					data: [
						['Y','是'],
						['N','否']
					]
				}),
				valueField:'val',
				displayField:'tex',
				mode:'local',
				width:350,
				forceSelection:true,
				resizable:true,
				allowBlank:false,
				editable:false
		}),new Ext.form.TextArea({
	    	 fieldLabel : '公告',
			 name : 'annunciate.content',
			 allowBlank:false,
			 maxLength : 1024,
			 maxLengthText : "输入的字符不能超过1024位",
			 width:350,
			 height:200
	    })
	]
});

//新增窗口
com.frontier.gdc.system.annunciateManager.addWindow = new Ext.Window( {
	title : '新增公告',
	width : 500,
	height : 340,
	closeAction : 'hide',
	plain : true,
	modal:true,
	layout : 'fit',
	tbar: [{
		text : '保存',
		iconCls: 'save',
		handler : function() {
			com.frontier.gdc.system.annunciateManager.submitType = 'insert';
			com.frontier.gdc.system.annunciateManager.formSubmit(com.frontier.gdc.system.annunciateManager.addForm,com.frontier.gdc.system.annunciateManager.addWindow);
		}
	}],
	items :com.frontier.gdc.system.annunciateManager.addForm
	
});

//修改窗口
com.frontier.gdc.system.annunciateManager.updateWindow = null;

//修改窗口
com.frontier.gdc.system.annunciateManager.update = function(){
	//获取grid选中项
	var record = com.frontier.gdc.system.annunciateManager.grid.getSelectionModel().getSelected();
	if (record) {
		var rows = com.frontier.gdc.system.annunciateManager.grid.getSelections();
		if (rows.length > 1) {
			Appframe.viewinfdlg.warning.show('只能选择一条进行修改！');
			return false;
		} 
		var roleId = rows[0].get("id");
		if(roleId){
			com.frontier.gdc.system.annunciateManager.loadFormData(roleId);
		}
	} else {
		Appframe.viewinfdlg.warning.show('请选择要修改的公告！');
		return false;
	}
	
	//创建并显示修改窗口
	if(!com.frontier.gdc.system.annunciateManager.updateWindow){
		com.frontier.gdc.system.annunciateManager.updateWindow = new Ext.Window({
			title : '修改公告',
			width : 500,
			height : 340,
			closeAction : 'hide',
			plain : true,
			modal:true,
			layout : 'fit',
			tbar: [
				{
					text : '保存',
					iconCls: 'save',
					handler : function() {
						com.frontier.gdc.system.annunciateManager.submitType = 'update';
						com.frontier.gdc.system.annunciateManager.formSubmit(com.frontier.gdc.system.annunciateManager.updateForm,com.frontier.gdc.system.annunciateManager.updateWindow);
					}
				}
			],
			items :com.frontier.gdc.system.annunciateManager.updateForm
		});
	}
	com.frontier.gdc.system.annunciateManager.updateWindow.show();
}

com.frontier.gdc.system.annunciateManager.newMainPanel = function(){
	var panel = new Ext.Panel({
		layout : 'fit',
		border : false,
		items:[com.frontier.gdc.system.annunciateManager.createGrid ()]
	})
	return panel;
}

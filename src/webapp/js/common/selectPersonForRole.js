/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统 根据角色选择人员封装</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.common.selectPersonForRole");
  
gdc.common.selectPersonForRole.SearchField = Ext.extend(Ext.form.TwinTriggerField, { 
//	constructor : function(config) {
//	var defConfig = {};
//	Ext.applyIf(config, defConfig);	
//	gdc.common.selectPersonForRole.SearchField.superclass.constructor.call(this, config);		
//	},
    initComponent : function(){   
        gdc.common.selectPersonForRole.SearchField.superclass.initComponent.call(this);   
        this.on('specialkey', function(f, e){   
            if(e.getKey() == e.ENTER){   
                this.onTrigger2Click();   
            }   
        }, this);   
		var hiddencomp = new Ext.form.Hidden({
			id:this.id+'hidden',
			name:this.name
		});	        
    },   
  
    validationEvent:false,   
    validateOnBlur:false,   
    trigger1Class:'x-form-clear-trigger',   
    trigger2Class:'x-form-search-trigger',   
    hideTrigger1:true,   
    width:180,   
    hasSearch : false, 
    readOnly :true,
  
    onTrigger1Click : function(){   
    	alert(1);
//        if(this.hasSearch){   
//            this.el.dom.value = '';   
//            var o = {start: 0};   
//            this.store.baseParams = this.store.baseParams || {};   
//            this.store.baseParams[this.paramName] = '';   
//            this.store.reload({params:o});   
//            this.triggers[0].hide();   
//            this.hasSearch = false;   
//        }   
    },   

    onTrigger2Click : function(){   
//        var v = this.getRawValue(); 
//        alert(this.paramName);
//        if(v.length < 1){   
//            this.onTrigger1Click();   
//            return;   
//        }   
//        var o = {start: 0};   
//        this.store.baseParams = this.store.baseParams || {};   
//        this.store.baseParams[this.paramName] = v;   
//        this.store.reload({params:o});   
//        this.hasSearch = true;   
//        this.triggers[0].show(); 
    	//alert(this.roleId);
    	this.setValue("姓名");
    	Ext.getCmp(this.id+'hidden').setValue(this.roleId);
    	
		jsonReader = new Ext.data.JsonReader({
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
			}]
		);    	
    	
		roleStore = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy( {
		        url : gdc.webContextRoot+'/sysRole/findSysRoleBySystemIdExcludeur.action'
		    }),
		    listeners : {
				"beforeload" : function(store) {
					store.removeAll();
					store.baseParams = {
						'roleId' : roleId
					};
				}
			},
		    reader : jsonReader
		});    	
    	
	// ColumnModels
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer(),  {
				header : '姓名',
				dataIndex : 'roleName'
			}
	]);

	cm.defaultSortable = true;
	
	var ptb = new Ext.PagingToolbar({
				displayInfo : true,
				lastText : "尾页",
				nextText : "下一页",
				beforePageText : "当前",
				refreshText : "刷新",
				afterPageText : "页，共{0}页",
				displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
				emptyMsg : "无数据",
				pageSize : 30,
				store : roleStore
			});
		
	var roleGrid = new Ext.grid.GridPanel({
				region : 'center',
				store : roleStore,
				cm : cm,
				sm : sm,
				stripeRows : true,//条纹?			
				border : false,

				// 添加分页工具栏
				bbar : ptb,
				// 添加内陷的工具条
				tbar : [{
							id : 'ok',
							text : '提交',
							tooltip : '提交',
							iconCls : 'ok',
							handler : function() {
								roleWin.close();
							}
						}]

			});
	var roleWin=new Ext.Window({
				layout : 'fit',
				width : 400,
				height : 300,
				closeAction : 'hide',
				plain : true,
				title : '请选择人员',
				items : roleGrid
		    }); 				
	var personGrid = new Ext.grid.GridPanel({
				region : 'center',
				store : roleStore,
				cm : cm,
				sm : sm,
				stripeRows : true,//条纹?			
				border : false,

				// 添加分页工具栏
				bbar : ptb,
				// 添加内陷的工具条
				tbar : [{
							id : 'add',
							text : '新增',
							tooltip : '新增',
							iconCls : 'add',
							handler : function() {
								roleWin.show();										    
							}
						},'-',{
							id : 'remove',
							text : '删除',
							tooltip : '删除',
							iconCls : 'remove',
							handler : function() {
								alert('删除');
							}
						}]

			});  
    	var win=new Ext.Window({
						layout : 'fit',
						width : 500,
						height : 350,
						closeAction : 'hide',
						plain : true,
						title : '请选择人员',
						items:personGrid
				    }); 
		win.show();	
    }
});  
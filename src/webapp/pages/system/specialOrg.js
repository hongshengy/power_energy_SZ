Ext.namespace("com.frontier.gdc.system.specialOrg");
	/**
	* 新建窗口
	* @type {Ext.Window}
	*/
	com.frontier.gdc.system.specialOrg.newFormWin = null;
	/**
	* 编辑窗口
	* @type {Ext.Window}
	*/
	com.frontier.gdc.system.specialOrg.editFormWin = null;
	
	com.frontier.gdc.system.specialOrg.newFormSubWin = null;
	
	/**
	 * 业务组织对应的数据集合
	 * @type 
	 */
	var grid;
	
	/**
	 * 业务组织id,用于获取业务组织列表。
	 * @type 
	 */
	var specialOrgId =null;
	
	//var newSpecialOrgDataSet = null;
	//var newParSpecialOrgDataSet = null;
	/**
	* 树节点id
	* @type {Number}
	*/
	//var nodeId=10000000001375;
	var nodeId;
	
	var nodeText='江苏';
	
	/**
	* grid数据源
	* @type {Ext.data.Store}
	*/
	var ds;	

	/**
	* 分页的每页数据量
	* @type {Number}
	*/
	var pageSize = gdc.constant.pageSize;
	
	/**
	* grid数据映射reader
	* @type {Ext.data.JsonReader}
	*/	
	var _jsonReader = new Ext.data.JsonReader( {
		root : 'list',
		totalProperty : 'totalCount',
		id : 'id',
		successProperty : '@success'
	}, [ {
		name : 'specialOrgId'
	}, {
		name : 'specialOrgName'
	},{
		name : 'parentSpecialOrgId'
	},{
		name : 'synchronizeFlag'
	},{
		name : 'code'
	},{
		name : 'orgType'
	},{
		name : 'orgTypeName'
	},{
		name : 'sortNo'
	},{
		name : 'shortName'
	},{
		name : 'memo'
	},{
		name : 'porgNo'
	},{
		name : 'porgName'
	}]);
	/**
	* 表单reader的字段名字映射
	* @type {Array}
	*/
	var formReaderMapping = [ {
			name : 'specialOrgLocal.specialOrgName',
			mapping : 'specialOrgName'
		}, {
			name : 'specialOrgLocal.synchronizeFlag',
			mapping : 'synchronizeFlag'
		}, {
			name : 'specialOrgLocal.code',
			mapping : 'code'
		}, {
			name : 'specialOrgLocal.shortName',
			mapping : 'shortName'
		}, {
			name : 'specialOrgLocal.memo',
			mapping : 'memo'
		}];
	
	/**
	* 表单reader
	* @type {Ext.data.JsonReader}
	*/
	var _jsonFormReader = new Ext.data.JsonReader( {
		root : 'list',
		totalProperty : 'totalCount',                                             
		id : 'id',
		successProperty : '@success'
	},formReaderMapping );

/**
*初始化业务组织树
*
*/
com.frontier.gdc.system.specialOrg.initTree = function(){
	  var rootVisible = false;
	  if(gdc.currentRoleId==0){
	  		com.frontier.gdc.system.specialOrg.rootVisible = true;	
	  }
	  var Tree = Ext.tree;
      tree = new Tree.TreePanel( {
      		id : 'menu-tree',
			autoScroll : true,
			animate : true,
			border : false,
			rootVisible : com.frontier.gdc.system.specialOrg.rootVisible,	
	        listeners:{
				"click": function(node,e) {
							com.frontier.gdc.system.specialOrg.node = node;
							if(!node.parentNode){
								Ext.getCmp('menuItem').hide();
							}
					    	
							nodeId = node.id;
							ds.reload({
								   params : {
						           start : 0,
						           limit : pageSize,
						           'specialOrgId' : nodeId
									}
							});    	
					    	
						}
			}	
           
      });
      var root = new Tree.AsyncTreeNode( {
            text : '业务组织树',
            expanded : true,
            draggable : false,
            id : '0',//默认的node值：?node=0
            loader : new Tree.TreeLoader( {
                  dataUrl : gdc.webContextRoot+'/specialOrg/searchSpecialOrgTreeForAueic.action' // 这就是要动态载入数据的请求地址，这里请求时会提交一个参数为node的值，值为root即new Tree.AsyncTreeNode()对象的id值
            	  ,listeners:{
            	  	'beforeload' : function(loader, node) {
									this.baseParams.spOrgId = currUser['spOrgId'];// 统一框架角色组织ID,by:guojinhui2009/10/19
									if (!gdc.isPagePurview) {
										this.baseParams.curRoleID = '';
									} else {
										this.baseParams.curRoleID = gdc.currentRoleId;// 增加传递当前用户所选的角色ID，by：guojinhui//
									}
								},
					load : function(loader,node,response) {
						if(nodeId){
							return;
						};
						var fc = node.firstChild;
						//fc.fireEvent('click',fc);
						/*if(node.item(0)) {
							node.item(0).select();
							nodeOnClick(node.item(0));
						}*/
					}
				}
            })
      });
      tree.setRootNode(root);
      //tree.render();
      //root.expand();
     // return tree;
};
var nodeOnClick = function(node){
	if (node!=null){
		nodeId = node.id;
	}
}
function loadCallBack(store,options){
	store.baseParams = { 'specialOrgId' : nodeId};
}	

function changeIdToName(value){
    if (value == 'Y') {
        return "是";
    } else {
        return "否";
    }    
}
var newForm = new Ext.form.FormPanel( {
	id : "specialOrgDataSetForm",
	labelWidth : 95, // label settings here cascade unless overridden
	labelAlign : 'right',
	frame : true,
	//bodyStyle : 'padding:5px 5px 0',
	width : 350,
	waitMsgTarget : true,
	defaults : {
		width : 260
	},
	defaultType : 'textfield',
	items : [ {
			fieldLabel : '上级业务组织ID',
			id : 'specialOrgLocal.parentSpecialOrgId',				
			hideLabel : true,
			hidden : true
		},{
			fieldLabel : '删除标志',
			id : 'specialOrgLocal.deleteFlag',				
			hideLabel : true,
			hidden : true,
			value:'N'
		},{
			fieldLabel : '业务组织名称',
			id : 'specialOrgLocal.specialOrgName',
			//value : '',
			allowBlank : false
			,maxLength : 32, 
	 		maxLengthText:'输入的字符长度不能超过32个'
			
		},{
			fieldLabel : '编码',
			id : 'specialOrgLocal.code',
			//value : '',
			allowBlank : false
			,maxLength : 32, 
		 	maxLengthText:'输入的字符长度不能超过32个'
		}, new gdc.code.ComboBox({
			    id:'addOrgType',
		 		hiddenName : 'specialOrgLocal.orgType',
				fieldLabel : '组织类型',
				codeSortCode : 'ORG_TYPE',
				allowBlank:false,
				blankText : '请输入',
				emptyText : '请选择',
				width:260,
				listeners:{
					select:function(combo,record,index){
						if(combo.getValue()==7){
							Ext.getCmp('deptPanel').show();
							Ext.getCmp('addPorgNoName').setDisabled(false);
							Ext.getCmp('addPorgNo').setDisabled(false);
						}else{
							Ext.getCmp('deptPanel').hide();
							Ext.getCmp('addPorgNoName').setDisabled(true);
							Ext.getCmp('addPorgNo').setDisabled(true);
						}
					},
					beforequery:function(){
						Ext.getCmp('addOrgType').setValue('');
					}
				}
		}),{
				xtype:'panel',
				id:'deptPanel',
	            autoHeight: true,
	            layout: 'form',
	            labelAlign : 'right',
	            border:false,
	            hidden:true,
	            width:360,
				items: [
				 	new Ext.form.Hidden({
						id : 'addPorgNo',
						name : 'specialOrgLocal.porgNo'
					}),new gdc.common.comboboxTree.comboxWithTree({
						fieldLabel : '所属单位名称',
						treeType : 'USER_ORG_SUO',
						hiddenName : 'addPorgNo',
						treeId : 'orgIdAdd',
						id : 'addPorgNoName',
						allowBlank : false,
						width:243
					})
				 ]
		}				
		,{
			fieldLabel : '简称',
			id : 'specialOrgLocal.shortName',
			//value : '',
			allowBlank : false
			,maxLength : 32, 
	 		maxLengthText:'输入的字符长度不能超过32个'
		},{
			xtype:'numberfield',
			fieldLabel : '显示序号',
			id : 'specialOrgLocal.sortNo',
			//value : '',
			maxLength : 2, 
	 		maxLengthText:'输入的字符长度不能超过2个',
	 		minText:0
		},new Ext.form.TextArea({
					fieldLabel: '备注',
					id : 'specialOrgLocal.memo',
					name: 'specialOrgLocal.memo',
					//allowBlank:false,
					height:100
					//,value : ''
					,maxLength : 256, 
	 				maxLengthText:'输入的字符长度不能超过256个',
					listeners:{
						//blur:Appframe.trimField
					}
				})
	],
	tbar:[
			{id : 'New',
			 text : '保存',
			 tooltip : '新增业务组织',
			 iconCls: 'save', 
			 handler : function() {
				if (newForm.form.isValid(newForm)) {
					if(com.frontier.gdc.system.specialOrg.node.attributes.iconCls){
						if(com.frontier.gdc.system.specialOrg.node.attributes.iconCls.indexOf('area')>-1){
							if(Ext.getCmp('addOrgType').getValue()==7){
								Appframe.viewinfdlg.warning.show("【"+com.frontier.gdc.system.specialOrg.node.text+"】下不能添加组织类型为部门的组织");
								return;
							}
						}else{
							if(Ext.getCmp('addOrgType').getValue()!=7){
								Appframe.viewinfdlg.warning.show("【"+com.frontier.gdc.system.specialOrg.node.text+"】下只能添加组织类型为部门的组织");
								return;
							}
						}
					}
					newForm.form.submit( {
						url : gdc.webContextRoot+'/specialOrg/addSpecialOrg.action',
						params:{"specialOrgLocal.porgName":Ext.getCmp('addPorgNoName').getRawValue()},
						success : function(form, action) {
							newForm.form.reset();
							if(com.frontier.gdc.system.specialOrg.newFormWin)
							com.frontier.gdc.system.specialOrg.newFormWin.hide();
							if(com.frontier.gdc.system.specialOrg.newFormSubWin)
							com.frontier.gdc.system.specialOrg.newFormSubWin.hide();
							
							Appframe.viewinfdlg.right.show("添加业务组织成功！",true);
							ds.load( {
								params : {
									start : 0,
									limit : pageSize
								}
							});
							tree.getRootNode().reload();
						},
						failure : function(form, action) {
							//Appframe.viewinfdlg.warning.show("添加业务组织失败！");
						},
						waitMsg : '正在保存数据，稍后...'
					});
					
				}
			 }
			}/*, {
			text : '取消',
			handler : function() {
				newForm.form.reset();
				com.frontier.gdc.system.specialOrg.newFormWin.hide();				
			}}*/
		]
});	

/**
* 初始化数据集合信息grid布局
*/
com.frontier.gdc.system.specialOrg.initGrid = function(){
		/**
		 *新增Menu
		 * @type {Ext.menu.Menu}
		 */
		com.frontier.gdc.system.specialOrg.addmenu = new Ext.menu.Menu({
			items:[new Ext.menu.Item({
						id : 'menuItem',
						text: '同级业务组织',
						handler:function() {
							var sm = Ext.getCmp('menu-tree').getSelectionModel();
							var node = sm.getSelectedNode();
							//alert(node.parentNode.id);
							var id = 0;
							if(node != null){
								//nodeId = node.id;
								nodeId = node.parentNode.id;
								//alert(nodeId);
								nodeText = node.parentNode.text;
							}
							if(node && node.parentNode){
								if(node.parentNode == tree.getRootNode()){
									nodeId = 0;
									if(!com.frontier.gdc.system.specialOrg.rootVisible){
										Appframe.viewinfdlg.warning.show("您没有权限新增"+node.text+"的同级业务组织!");
										return;
									}
								}
							}else{
								nodeId = 0;
								Appframe.viewinfdlg.warning.show("请在树上选择要新增同级业务组织的组织!");
								return;
								
							}
							//alert(newForm);
							newForm.form.reset();
							newParSpecialOrgDataSet();
						}
					}),
					new Ext.menu.Item({
						text: '下级业务组织',
						handler:function(){
							var sm = Ext.getCmp('menu-tree').getSelectionModel();
							var node = sm.getSelectedNode();
							var id = 0;
							//alert(node);
							if(node != null){
								nodeId = node.id;
								//alert(nodeId);
								nodeText = node.text;
								//alert(nodeText);
							}else{
								nodeId = 0;
								nodeText = '业务组织';
								Appframe.viewinfdlg.warning.show("请在树上选择要新增下级业务组织的组织!");
								return;
							}
							/*if(node.parentNode == tree.getRootNode()){
								nodeId = 0;
							}*/
							newForm.form.reset();
							newSpecialOrgDataSet();
						
						}
					})]
		});
		
	
		ds = new Ext.data.Store( {
			//baseParams:{ 'specialOrgDataSet.specialOrgId' : nodeId},
//			proxy : new Ext.data.HttpProxy( {
//				url : gdc.webContextRoot+'/specialOrg/searchSpecialOrgDataSetList.action'
//			}),
			url : gdc.webContextRoot+'/specialOrg/searchSpecialOrgList.action',
			reader : _jsonReader,
			listeners:{
				"beforeload": loadCallBack
			}			
		});
		
		// ColumnModels
		var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
		var cm = new Ext.grid.ColumnModel([sm,new Ext.grid.RowNumberer(),  {
			header : '业务组织名称',
			dataIndex : 'specialOrgName',
			align : 'center',
			width : 208,
			renderer:Ext.util.Format.htmlEncode
		}
		, {
			header : '所属单位名称',
			dataIndex : 'porgName',
			align : 'center',
			width : 208,
			renderer:Ext.util.Format.htmlEncode
		}
		,{
			header : '编码',
			dataIndex : 'code',
			align : 'center',
			width : 120,
			renderer:Ext.util.Format.htmlEncode
		}, {
			header : '简称',
			dataIndex : 'shortName',
			align : 'center',
			width : 120,
			renderer:Ext.util.Format.htmlEncode
		}, {
			header : '类型',
			dataIndex : 'orgTypeName',
			align : 'center',
			width : 120,
			renderer:Ext.util.Format.htmlEncode
		}, {
			header : '显示序号',
			dataIndex : 'sortNo',
			align : 'center',
			width : 80,
			renderer:Ext.util.Format.htmlEncode
		}, {
			header : '同步数据',
			dataIndex : 'synchronizeFlag',
			align : 'center',
			renderer : changeIdToName,
			width : 80
		}]);
		
		// by default columns are sortable
		cm.defaultSortable = true;
		var ptb = new gdc.grid.PagingToolbar(
		          {pageSize : pageSize,
		           store: ds});

		grid = new Ext.grid.GridPanel( {
			title : '业务组织管理',
			region: 'center',
			store : ds,
			cm : cm,
			sm : sm,
			stripeRows: true,//条纹?
			border:false,
			layout : 'fit',
			width : 1000,
			height : 610,
			frame : true,
			autoShow : true,            

			viewConfig : {
				forceFit : false
			},

			// 添加分页工具栏
			bbar :ptb,
			// 添加内陷的工具条
			tbar : [ {
				id : 'New',
				text : ' 新增 ',
				tooltip : '新增业务组织',
				iconCls : 'add',
				bizCode:'add',
				menu: com.frontier.gdc.system.specialOrg.addmenu,
				handler : function() {
					
				}
			}, '-', {
				id : 'Edit',
				text : '修改',
				tooltip : '修改业务组织',
				iconCls : 'edit',
				bizCode:'edit',
				handler : function() {
					editSpecialOrg();
				}
			}, '-', {
				text : '删除',
				tooltip : '删除业务组织',
				iconCls : 'remove',
				bizCode:'remove',
				handler : function() {
					deleteSpecialOrg();
				}
			}, 
//			'-', {
//				text : '同步',
//				tooltip : '同步',
//				iconCls : 'edit',
//				bizCode:'syn',
//				handler : function() {
//					synchronizedSpecialOrg();
//				}
//			}, 
			'-', {
				text : '导出',
				tooltip : '导出',
				iconCls : 'export_excel',
				bizCode:'exportExc',
				handler : function() {
					exportExl();
				}
			}]

		});
		
/*		ds.load( {
			params : {
				start : 0,
				limit : pageSize
			}
		});		*/
		
		/*grid.on("rowdblclick", function(grid) {
			editSpecialOrgDataSet();
		});*/
			
		return grid;
}

var exportExl = function(){
	//alert('exportExl');
	/*Ext.Ajax.request({
		url:gdc.webContextRoot+'/specialOrg/exportExl.action',
		params : {"specialOrgId" : nodeId},
		success : function(result,request) {
			var result = result.responseText;
			var resObj = eval('('+result+')');
			if(resObj.success==true){
				//ds.reload();
				//tree.getRootNode().reload();
				Appframe.viewinfdlg.parent.right.show("业务组织导出成功！",true);			
			}else{
				Appframe.viewinfdlg.parent.right.show("业务组织导出失败！");
			}
		},
		failure : function(form, action) {
			Appframe.viewinfdlg.parent.right.show("业务导出失败！");
		},
		waitMsg : '正在删除，稍后...'	
	});
	
	var url = gdc.webContextRoot+'/specialOrg/exportExl.action?specialOrgId='+nodeId;
	var excelFormCodeSort = new Ext.form.FormPanel({ 
  		html:'<iframe src="'+url+'" width="100%" height="400" frameborder="0" scrolling="auto"></iframe>',
  		labelAlign: 'right', 
  		renderTo:'topic-excel',
  		labelWidth: 100,
  		frame:true
	});*/
	if(nodeId){
		window.location.href=gdc.webContextRoot+'/specialOrg/exportExl.action?specialOrgId='+nodeId;
	}else{
		Appframe.viewinfdlg.warning.show("请选择要导出的组织!");
		return;
	}
}

/**
* 厂站管理页面初始化
*/
com.frontier.gdc.system.specialOrg.newMainPanel = function(){

	Ext.QuickTips.init();
	com.frontier.gdc.system.specialOrg.initTree();
	com.frontier.gdc.system.specialOrg.initGrid();

	/**
	* 业务组织管理页面布局
	*/
	/*var viewport=new Ext.Viewport({
    layout: 'border',
    items: [ {
                    region:'west',
                    id:'west-panel',
                    title:'业务组织导航树菜单',
                    split:true,
                    width: 200,
                    
                    maxSize: 400,
                    collapsible: true,
                    items:tree
                }, {
        region: 'center',
        layout: 'fit',
        items:grid
        
        }]
    });	
    
    var panel = new Ext.Panel({  
         frame:true,  
         //title: '业务组织管理',  
         bodyStyle:'padding:5px 5px 0',
		 width:Ext.lib.Dom.getViewWidth(),
		 height:Ext.lib.Dom.getViewHeight(),
         items: viewport  
     });    
     return panel;    */
	var mainPanelInit = new Ext.Panel({
		//frame:true,
     	bodyStyle:'padding:0px 0px 0',
		//width:Ext.lib.Dom.getViewWidth(),
		//height:Ext.lib.Dom.getViewHeight(),
		layout : 'fit',
		items:[{
			border : false,
		    layout : 'border',
			items : [{
                    region:'west',
                    id:'west-panel',
                    title:'业务组织导航树菜单',
                    split:true,
                    width: 300,
                    layout: 'fit',
                    maxSize: 400,
                    collapsible: true,
                    items:tree
                }, {
		        region: 'center',
		        layout: 'fit',
		        items:grid
		        
		        }]
			}]
		
    });
    return mainPanelInit;
} 
var	dtfieldarr=[new window.parent.Ext.form.TextArea({
						fieldLabel: '数据集合权限XML',
						name: 'xmlField',
						anchor:'95%',
						allowBlank:true,
						height:350,
						listeners:{
							//blur:Appframe.trimField
						}
					})
			];
var newForm = new Ext.form.FormPanel( {
		id : "specialOrgDataSetForm",
		labelWidth : 95, // label settings here cascade unless overridden
		labelAlign : 'right',
		frame : true,
		//bodyStyle : 'padding:5px 5px 0',
		width : 350,
		waitMsgTarget : true,
		defaults : {
			width : 260
		},
		defaultType : 'textfield',
		items : [ {
				fieldLabel : '上级业务组织ID',
				id : 'specialOrgLocal.parentSpecialOrgId',				
				hideLabel : true,
				hidden : true
			},{
				fieldLabel : '删除标志',
				id : 'specialOrgLocal.deleteFlag',				
				hideLabel : true,
				hidden : true,
				value:'N'
			},{
				fieldLabel : '业务组织名称',
				id : 'specialOrgLocal.specialOrgName',
				//value : '',
				allowBlank : false
				,maxLength : 32, 
		 		maxLengthText:'输入的字符长度不能超过32个'
				
			},{
				fieldLabel : '编码',
				id : 'specialOrgLocal.code',
				//value : '',
				allowBlank : false
				,maxLength : 32, 
			 	maxLengthText:'输入的字符长度不能超过32个'
			}, new gdc.code.ComboBox({
				    id:'addOrgType',
			 		hiddenName : 'specialOrgLocal.orgType',
					fieldLabel : '组织类型',
					codeSortCode : 'ORG_TYPE',
					allowBlank:false,
					blankText : '请输入',
					emptyText : '请选择',
					width:260,
					listeners:{
						select:function(combo,record,index){
							if(combo.getValue()==7){
								Ext.getCmp('deptPanel').show();
								Ext.getCmp('addPorgNoName').setDisabled(false);
								Ext.getCmp('addPorgNo').setDisabled(false);
							}else{
								Ext.getCmp('deptPanel').hide();
								Ext.getCmp('addPorgNoName').setDisabled(true);
								Ext.getCmp('addPorgNo').setDisabled(true);
							}
						},
						beforequery:function(){
							Ext.getCmp('addOrgType').setValue('');
						}
					}
			}),{
					xtype:'panel',
					id:'deptPanel',
		            autoHeight: true,
		            layout: 'form',
		            labelAlign : 'right',
		            border:false,
		            hidden:true,
		            width:360,
					items: [
					 	new Ext.form.Hidden({
							id : 'addPorgNo',
							name : 'specialOrgLocal.porgNo'
						}),new gdc.common.comboboxTree.comboxWithTree({
							fieldLabel : '所属单位名称',
							treeType : 'USER_ORG_SUO',
							hiddenName : 'addPorgNo',
							treeId : 'orgIdAdd',
							id : 'addPorgNoName',
							allowBlank : false,
							width:243
						})
					 ]
			}				
			,{
				fieldLabel : '简称',
				id : 'specialOrgLocal.shortName',
				//value : '',
				allowBlank : false
				,maxLength : 32, 
		 		maxLengthText:'输入的字符长度不能超过32个'
			},{
				xtype:'numberfield',
				fieldLabel : '显示序号',
				id : 'specialOrgLocal.sortNo',
				//value : '',
				maxLength : 2, 
		 		maxLengthText:'输入的字符长度不能超过2个',
		 		minText:0
			},new Ext.form.TextArea({
						fieldLabel: '备注',
						id : 'specialOrgLocal.memo',
						name: 'specialOrgLocal.memo',
						//allowBlank:false,
						height:100
						//,value : ''
						,maxLength : 256, 
		 				maxLengthText:'输入的字符长度不能超过256个',
						listeners:{
							//blur:Appframe.trimField
						}
					})
		],
		tbar:[
				{id : 'New',
				 text : '保存',
				 tooltip : '新增业务组织',
				 iconCls: 'save', 
				 handler : function() {
					if (newForm.form.isValid(newForm)) {
						if(com.frontier.gdc.system.specialOrg.node.attributes.iconCls){
							if(com.frontier.gdc.system.specialOrg.node.attributes.iconCls.indexOf('area')>-1){
								if(Ext.getCmp('addOrgType').getValue()==7){
									Appframe.viewinfdlg.warning.show("【"+com.frontier.gdc.system.specialOrg.node.text+"】下不能添加组织类型为部门的组织");
									return;
								}
							}else{
								if(Ext.getCmp('addOrgType').getValue()!=7){
									Appframe.viewinfdlg.warning.show("【"+com.frontier.gdc.system.specialOrg.node.text+"】下只能添加组织类型为部门的组织");
									return;
								}
							}
						}
						newForm.form.submit( {
							url : gdc.webContextRoot+'/specialOrg/addSpecialOrg.action',
							params:{"specialOrgLocal.porgName":Ext.getCmp('addPorgNoName').getRawValue()},
							success : function(form, action) {
								newForm.form.reset();
								if(com.frontier.gdc.system.specialOrg.newFormWin)
								com.frontier.gdc.system.specialOrg.newFormWin.hide();
								if(com.frontier.gdc.system.specialOrg.newFormSubWin)
								com.frontier.gdc.system.specialOrg.newFormSubWin.hide();
								
								Appframe.viewinfdlg.right.show("添加业务组织成功！",true);
								ds.load( {
									params : {
										start : 0,
										limit : pageSize
									}
								});
								tree.getRootNode().reload();
							},
							failure : function(form, action) {
								//Appframe.viewinfdlg.warning.show("添加业务组织失败！");
							},
							waitMsg : '正在保存数据，稍后...'
						});
						
					}
				 }
				}/*, {
				text : '取消',
				handler : function() {
					newForm.form.reset();
					com.frontier.gdc.system.specialOrg.newFormWin.hide();				
				}}*/
			]
	});	
	 /**
	  * 新增下级业务组织
	  */
	 function newSpecialOrgDataSet() {
		 //alert("新增下级业务组织");
		//if (!com.frontier.gdc.system.specialOrg.newFormSubWin) {
			com.frontier.gdc.system.specialOrg.newFormSubWin = new Ext.Window( {
				layout : 'fit',
				width : 400,
				height : 350,
				closeAction : 'hide',
				plain : true,
				modal:true,
				title : '新增下级业务组织',
				items : newForm,
				listeners:{
					hide:function(twin){
						if(Ext.getCmp('orgIdAdd') && gdc.currentRoleId!=0){
							var rootNode = Ext.getCmp('orgIdAdd').getRootNode();
							if(rootNode && rootNode.isExpanded()){
								rootNode.reload();
							}
						}
					}
				}
			});
		//}
		//var s=newForm.findById("specialOrgLocal.specialOrgName");
		//s.setValue(nodeText);/
		var v=newForm.findById("specialOrgLocal.parentSpecialOrgId");
		//alert('nodeId '  + nodeId);
		v.setValue(nodeId);
		com.frontier.gdc.system.specialOrg.newFormSubWin.show('New');
	};
	/**
	 * 新增同级业务组织
	 */
	  function newParSpecialOrgDataSet() {
		//if (!com.frontier.gdc.system.specialOrg.newFormWin) {
		// alert("新增同级业务组织");
			com.frontier.gdc.system.specialOrg.newFormWin = new Ext.Window( {
				layout : 'fit',
				width : 400,
				height : 350,
				closeAction : 'hide',
				plain : true,
				modal:true,
				title : '新增同级业务组织',
				items : newForm,
				listeners:{
					hide:function(twin){
						if(Ext.getCmp('orgIdAdd') && gdc.currentRoleId!=0){
							var rootNode = Ext.getCmp('orgIdAdd').getRootNode();
							if(rootNode && rootNode.isExpanded()){
								rootNode.reload();
							}
						}
					}
				}
			});
		//}
		//var s=newForm.findById("specialOrgLocal.specialOrgName");
		//s.setValue(nodeText);/
		var v=newForm.findById("specialOrgLocal.parentSpecialOrgId");
		
		//alert(nodeId);
		v.setValue(nodeId);
		com.frontier.gdc.system.specialOrg.newFormWin.show('New');
	};
	
	var editForm = new Ext.form.FormPanel( {
				id : "specialOrgEditForm",
				labelWidth : 95, // label settings here cascade unless overridden
				labelAlign : 'right',
				frame : true,
				bodyStyle : 'padding:5px 5px 0',
				width : 350,
				waitMsgTarget : true,
				defaults : {
					width : 260
				},
				defaultType : 'textfield',
				reader : _jsonFormReader,
				items : [ new Ext.form.Hidden({id:'specialOrgId',name:'specialOrgLocal.specialOrgId'}),
						  new Ext.form.Hidden({id:'synchronizeFlag',name:'specialOrgLocal.synchronizeFlag'}),
						  new Ext.form.Hidden({name:'specialOrgLocal.deleteFlag',value:'N'}),
						  new Ext.form.Hidden({id:'parentSpecialOrgId',name:'specialOrgLocal.parentSpecialOrgId'}),{
					fieldLabel : '业务组织名称',
					id:'specialOrgName',
					name : "specialOrgLocal.specialOrgName",
					//value : specialOrgName,
					clearCls:'stop-float',
					allowBlank : false,
					maxLength : 32, 
			 		maxLengthText:'输入的字符长度不能超过32个'
				},{
					fieldLabel : '编码',
					id:'code',
					name : "specialOrgLocal.code",
					clearCls:'stop-float',
					allowBlank : false,
					maxLength : 32, 
			 		maxLengthText:'输入的字符长度不能超过32个'
				},new gdc.code.ComboBox({
			 		id:'orgType',
					hiddenName : 'specialOrgLocal.orgType',
					fieldLabel : '组织类型',
					codeSortCode : 'ORG_TYPE',
					allowBlank:false,
					blankText : '请输入',
					emptyText : '请选择',
					width:200,
					listeners:{
						select:function(combo,record,index){
							if(combo.getValue()==7){
								Ext.getCmp('deptPanelEdit').show();
								Ext.getCmp('editPorgNoName').setDisabled(false);
								Ext.getCmp('editPorgNo').setDisabled(false);
							}else{
								Ext.getCmp('deptPanelEdit').hide();
								Ext.getCmp('editPorgNoName').setDisabled(true);
								Ext.getCmp('editPorgNo').setDisabled(true);
							}
						},
						beforequery:function(){
							Ext.getCmp('orgType').setValue('');
						}
					}
				}),{
					xtype:'panel',
					id:'deptPanelEdit',
		            autoHeight: true,
		            layout: 'form',
		            labelAlign : 'right',
		            border:false,
		            hidden:true,
		            width:360,
					items: [
					 	new Ext.form.Hidden({
							id : 'editPorgNo',
							name : 'specialOrgLocal.porgNo'
						}),new gdc.common.comboboxTree.comboxWithTree({
							fieldLabel : '所属单位名称',
							treeType : 'USER_ORG_SUO',
							hiddenName : 'editPorgNo',
							treeId : 'orgIdedit',
							id : 'editPorgNoName',
							allowBlank : false,
							width:243
						})
					 ]
				},					
				{
					fieldLabel : '简称',
					id:'shortName',
					name : "specialOrgLocal.shortName",
					clearCls:'stop-float',
					allowBlank : false,
					maxLength : 32, 
			 		maxLengthText:'输入的字符长度不能超过32个'
				},{
					xtype:'numberfield',
					fieldLabel : '显示序号',
					id : 'sortNo',
					name :'specialOrgLocal.sortNo',
					//value : '',
					maxLength : 2, 
			 		maxLengthText:'输入的字符长度不能超过2个',
			 		minText:0
				},new Ext.form.TextArea({
						fieldLabel: '备注',
						id:'umemo',
						name: 'specialOrgLocal.memo',
						height:100,
						//,value : ''
						maxLength : 256, 
		 				maxLengthText:'输入的字符长度不能超过256个',
						listeners:{
							//blur:Appframe.trimField
						}
					})
				],
				tbar:[
						{id : 'Edit',
						 text : '保存',
						 tooltip : '修改业务组织',
						 iconCls: 'save', 
						 handler : function() {
							if (editForm.form.isValid(editForm)) {
								if(com.frontier.gdc.system.specialOrg.node.attributes.iconCls){
									if(com.frontier.gdc.system.specialOrg.node.attributes.iconCls.indexOf('area')>-1){
										if(Ext.getCmp('orgType').getValue()==7){
											Appframe.viewinfdlg.warning.show("【"+com.frontier.gdc.system.specialOrg.node.text+"】下组织的组织类型不能修改为部门");
											return;
										}
									}else{
										if(Ext.getCmp('orgType').getValue()!=7){
											Appframe.viewinfdlg.warning.show("【"+com.frontier.gdc.system.specialOrg.node.text+"】下组织的组织类型只能部门");
											return;
										}
									}
								}
								editForm.form.submit( {
									url : gdc.webContextRoot+'/specialOrg/updateSpecialOrg.action',
									params:{"specialOrgLocal.porgName":Ext.getCmp('editPorgNoName').getRawValue()},
									success : function(form, action) {
										com.frontier.gdc.system.specialOrg.editFormWin.hide();
										Appframe.viewinfdlg.right.show("修改业务组织数据集合成功！",true);
										ds.load( {
											params : {
												start : 0,
												limit : pageSize
											}
										});
										tree.getRootNode().reload();
									},
									failure : function(form, action) {
										//Appframe.viewinfdlg.warning.show("修改业务组织数据集合失败！");
									},
									waitMsg : '正在保存数据，稍后...'
								});
								
							} 
						 }}/*,{
							text : '取消',
							handler : function() {
								com.frontier.gdc.system.specialOrg.editFormWin.hide();				
							}
						}*/
					]
			 });		
 /**
  * 编辑业务组织数据集合关系
  */
	var editSpecialOrg = function() {	
		var _record = grid.getSelectionModel().getSelected();
		if (!_record) {
			//Ext.MessageBox.alert("提示","请选择要修改的一项！");
			Appframe.viewinfdlg.warning.show('请选择要修改的一项！');
		} else {
			var rows = grid.getSelections();
			if(rows.length>1){
				//Ext.MessageBox.alert("提示","只能选择一条记录修改！");
				Appframe.viewinfdlg.warning.show('只能选择一条记录修改！');
				return;
			}
			
			editForm.form.reset();
			
			var specialOrgId = rows[0].get("specialOrgId");
			//alert(specialOrgId);
			var specialOrgName = rows[0].get("specialOrgName");
			//alert(specialOrgName);
			var synchronizeFlag = rows[0].get("synchronizeFlag");
			var parentSpecialOrgId = rows[0].get("parentSpecialOrgId");
			
			var code = rows[0].get("code");
			var shortName = rows[0].get("shortName");
			var memo = rows[0].get("memo");
			var sortNo = rows[0].get("sortNo");
			var orgType = rows[0].get("orgType");
			
			if (!com.frontier.gdc.system.specialOrg.editFormWin) {
				com.frontier.gdc.system.specialOrg.editFormWin = new Ext.Window( {
					layout : 'fit',
					width : 450,
					height : 350,
					closeAction : 'hide',
					plain : true,
					maximizable:true,
					modal:true,
					title : '修改业务组织',
					items : editForm,
					listeners:{
						hide:function(twin){
							if(Ext.getCmp('orgIdedit') && gdc.currentRoleId!=0){
								var rootNode = Ext.getCmp('orgIdedit').getRootNode();
								if(rootNode && rootNode.isExpanded()){
									rootNode.reload();
								}
							}
						}
					}
				});
			}
			
			editForm.form.reset();
			
			editForm.findById("specialOrgId").setValue(specialOrgId);
			editForm.findById("specialOrgName").setValue(specialOrgName);
			editForm.findById("synchronizeFlag").setValue(synchronizeFlag);
			editForm.findById("parentSpecialOrgId").setValue(parentSpecialOrgId);
			
			editForm.findById("code").setValue(code);
			editForm.findById("shortName").setValue(shortName);
			editForm.findById("umemo").setValue(memo);
			
			editForm.findById("sortNo").setValue(sortNo);
			editForm.findById("orgType").setValue(orgType);
		
		    
			if(synchronizeFlag=='Y'){
		    	//editForm.findById("specialOrgName").readOnly = true;
		    	//Ext.getCmp('specialOrgName').readOnly = true;
				//Ext.MessageBox.alert('提示','同步过来的业务组织不能修改！');
				Appframe.viewinfdlg.warning.show('同步过来的业务组织不能修改！');
				return false;
		    }
			com.frontier.gdc.system.specialOrg.editFormWin.show('Edit');
			//部门
			if(rows[0].get("porgNo") && rows[0].get("porgNo")!='null' && rows[0].get("porgNo")!=''){
				Ext.getCmp('deptPanelEdit').show();
				Ext.getCmp('editPorgNoName').setDisabled(false);
				Ext.getCmp('editPorgNo').setDisabled(false);
				Ext.getCmp('editPorgNo').setValue(rows[0].get("porgNo"));
				Ext.getCmp('editPorgNoName').setRawValue(rows[0].get("porgName"));
				
			}else{
				Ext.getCmp('deptPanelEdit').hide();
				Ext.getCmp('editPorgNoName').setDisabled(true);
				Ext.getCmp('editPorgNo').setDisabled(true);
			}
			/*editForm.form.load( {
				url : gdc.webContextRoot+'/specialOrg/findSpecialOrgDataSet.action',
				params :{"specialOrgDataSet.dataSetId" : dataSetId,
						 "specialOrgDataSet.specialOrgId" : nodeId
						},					
				waitMsg : '正在载入数据...'
			});			*/
			
			
		}		
	};	
	function isTrueFalse(){
	    var flag = editForm.findById("synchronizeFlag").getValue();
	    if(flag=='是'){
	    	return true;
	    }else{
	    	return false;
	    }
	}
	/*
	 * 删除业务组织数据集合关系
	 */
	var deleteSpecialOrg = function() {
			var _record = grid.getSelectionModel().getSelected();
			if (_record) {
				Ext.MessageBox.confirm('提示', '你确认要删除这条数据吗？', function(btn) {
					if (btn == "yes") {
						try{
							var synchronizeFlag;
							
							var rows = grid.getSelections();
							for (var i = 0, len = rows.length;i < len; i++) {
								synchronizeFlag = rows[i].get("synchronizeFlag");
								if(synchronizeFlag=='Y'){
									//Ext.MessageBox.alert('提示','同步过来的业务组织不能删除！');
									Appframe.viewinfdlg.warning.show('同步过来的业务组织不能删除！');
									return false;
							    }
							}
							//var synchronizeFlag = rows[0].get("synchronizeFlag");
							var parentSpecialOrgId = rows[0].get("parentSpecialOrgId");
							var specialOrgId = rows[0].get("specialOrgId");
							
							var jsonData = "";
							for (var i = 0, len = rows.length;i < len; i++) {
								var id = rows[i].get("specialOrgId");
								if (i == 0) {
									jsonData = jsonData + id;
								} else {
									jsonData = jsonData + "," + id;
								}
								//ds.remove(rows[i]);
							}		
							var jsonDataParent = "";
							for (var i = 0, len = rows.length;i < len; i++) {
								var id = rows[i].get("parentSpecialOrgId");
								if (i == 0) {
									jsonDataParent = jsonDataParent + id;
								} else {
									jsonDataParent = jsonDataParent + "," + id;
								}
								//ds.remove(rows[i]);
							}
							/*var httpProxy = new Ext.data.HttpProxy({
								url:gdc.webContextRoot+'/specialOrg/deleteSpecialOrg.action'
							});
							httpProxy.load({
								"dataSetIds": jsonData,
								"parentSpecialOrgIds": jsonDataParent,
								"specialOrgId" : nodeId								
							});*/
							Ext.Ajax.request({
								url:gdc.webContextRoot+'/specialOrg/deleteSpecialOrg.action',
								params : {"dataSetIds" : jsonData, "parentSpecialOrgIds":jsonDataParent,"specialOrgId" : nodeId},
								success : function(result,request) {
									var result = result.responseText;
									var resObj = eval('('+result+')');
									if(resObj.success==true){
										ds.reload();
										tree.getRootNode().reload();
										Appframe.viewinfdlg.parent.right.show("业务组织删除成功！",true);			
									}else{
										//Appframe.viewinfdlg.parent.warning.show("业务组织删除失败！");
									}
								},
								failure : function(form, action) {
									//Appframe.viewinfdlg.parent.warning.show("业务删除失败！");
								},
								waitMsg : '正在删除，稍后...'	
							});
						}catch(e){
							Appframe.viewinfdlg.warning.show("数据集合删除失败！");
						}

					}
				});
			} else {
				//Ext.MessageBox.alert('提示', '请选择要删除的数据项！');
				Appframe.viewinfdlg.warning.show('请选择要删除的数据项！');
			}
		};
	/**
	 * 同步业务组织
	 */
		var synchronizedSpecialOrg = function() {
				Ext.MessageBox.confirm('提示', '你确认要同步业务组织数据吗？', function(btn) {
					if (btn == "yes") {
						Ext.MessageBox.show({
				           title:'提示', 
				           msg: '正在与服务器同步数据...',
				           width:220,
				           wait:true,
				           waitConfig: {interval:400}
				        });
						Ext.Ajax.request({
							url:gdc.webContextRoot+'/specialOrg/synchronizedSpecialOrg.action',
							timeout : 300000,
							success : function(result,request) {
										var resl = result.responseText;
										var resObj = eval('('+resl+')');
										if(resObj.success==true){
											Ext.MessageBox.hide();
											Appframe.viewinfdlg.right.show("业务组织同步成功！",true);
											ds.reload();
											tree.getRootNode().reload();
										}
											
							         }
						});

					}
				});
			
		};	


/**
 * 本功能的功能参数，用于打开本功能框架使用
 * @type 
 */
com.frontier.gdc.system.specialOrg.mdlCfg={
		mustRole:false,
		funcBtnControl:true
};	

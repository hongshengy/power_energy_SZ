Ext.namespace("com.frontier.gdc.system.specialOrgDataset");

	/**
	* 新建窗口
	* @type {Ext.Window}
	*/
	com.frontier.gdc.system.specialOrgDataset.newFormWin = null;
	/**
	 * 新建窗口2
	 * @type 
	 */
	com.frontier.gdc.system.specialOrgDataset.newFormWinT = null;
	/**
	* 编辑窗口
	* @type {Ext.Window}
	*/
	com.frontier.gdc.system.specialOrgDataset.editFormWin = null;
	/**
	* 编辑窗口2
	* @type {Ext.Window}
	*/
	com.frontier.gdc.system.specialOrgDataset.editFormWinT = null;
	
	/**
	 * 业务组织对应的数据集合
	 * @type 
	 */
	var grid;
	/**
	 * 业务组织id,用于获取业务对应的数据集合。
	 * @type 
	 */
	var specialOrgId =null;
	
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
	
	//var pageSizeWin = 10;
	var shortPageSize = gdc.constant.shortPageSize;
	
	/**
	* grid数据映射reader
	* @type {Ext.data.JsonReader}
	*/	
	var _jsonReader = new Ext.data.JsonReader( {
		root : 'list',
		totalProperty : 'totalCount',
		id : 'id',
		successProperty : '@success'
	}, [  {
		name : 'specialOrgId'
	},{
		name : 'specialOrgName'
	},{
		name : 'dataSetId'
	},{
		name : 'dataSetName'
	},{
		name : 'isDefault'
	}]);
	/**
	* 表单reader的字段名字映射
	* @type {Array}
	*/
	var formReaderMapping = [{
			name : 'specialOrgDataSet.specialOrgId',
			mapping : 'specialOrgId'
		}, {
			name : 'specialOrgDataSet.specialOrgName',
			mapping : 'specialOrgName'
		}, {
			name : 'specialOrgDataSet.dataSetId',
			mapping : 'dataSetId'
		}, {
			name : 'specialOrgDataSet.dataSetName',
			mapping : 'dataSetName'
		}, {
			name : 'specialOrgDataSet.isDefault',
			mapping : 'isDefault'
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
	 * 为grid增加CheckColumn
	 * */
	Ext.grid.CheckColumn = function(config){
	    Ext.apply(this, config);
	    if(!this.id){
	        this.id = Ext.id();
	    }
	    this.renderer = this.renderer.createDelegate(this);
	};
	Ext.grid.CheckColumn.prototype ={
	    init : function(grid){
	    	//alert('prototype');
	        this.grid = grid;
	        this.grid.on('render', function(){
	            var view = this.grid.getView();
	            /**
	             * editgridpanel  checkbox编辑预留
	             */
	            view.mainBody.on('mousedown', this.onMouseDown, this); 
	        }, this);
	    },
	
	    /*onMouseDown : function(e, t){
	    	//alert('onMouseDown');
	    	var mr=cAreaDs.getModifiedRecords();//获取所有更新过的记录
			alert(mr.length);
     		var recordCount=cAreaDs.getCount();//获取数据集中记录的数量
     		alert(recordCount);
	        if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
	            e.stopEvent();
	            var index = this.grid.getView().findRowIndex(t);
	            var record = this.grid.store.getAt(index);
	            record.set(this.dataIndex, !record.data[this.dataIndex]);
	        }
	    }*/
		onMouseDown : function(e, t) {  
			//alert('onMouseDown');
	        if (t.className && t.className.indexOf('x-grid3-cc-' + this.id) != -1) {   
	            e.stopEvent();   
	            var index = this.grid.getView().findRowIndex(t);   
	            var cindex = this.grid.getView().findCellIndex(t);   
	            var record = this.grid.store.getAt(index);   
	            var field = this.grid.colModel.getDataIndex(cindex); 
	            var e = {   
	                grid : this.grid,   
	                record : record,   
	                field : field,   
	                originalValue : record.data[this.dataIndex],   
	                value : !record.data[this.dataIndex],   
	                row : index,   
	                column : cindex,   
	                cancel : false  
	            };
	            if (this.grid.fireEvent("validateedit", e) !== false && !e.cancel) {   
	                delete e.cancel;   
	                record.set(this.dataIndex, !record.data[this.dataIndex]);   
	                this.grid.fireEvent("afteredit", e);   
	            }   
	        }   
	    },
	    renderer : function(v, p, record){
	    	//alert('renderer');
	        p.css += ' x-grid3-check-col-td'; 
	        return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
	    }
	  };
	  
	  var isCheck = new Ext.grid.CheckColumn({
		   header: "是否默认权限",
		   dataIndex: 'isDefault',
		   width: 140,
		   align : 'center'
	  })
	  
	  var isDefaultCheck = new Ext.grid.CheckColumn({
		   header: "是否默认权限",
		   dataIndex: 'isDefault',
		   width: 180,
		   align : 'center'
	  })
	  
	  var isDefaultCheckEdit = new Ext.grid.CheckColumn({
		   header: "是否默认权限",
		   dataIndex: 'isDefault',
		   width: 180,
		   align : 'center'
	  })

/**
*初始化业务组织树
*
*/
com.frontier.gdc.system.specialOrgDataset.initTree = function(){
	
	  var Tree = Ext.tree;
      tree = new Tree.TreePanel( {
      		id : 'menu-tree',
			autoScroll : true,
			animate : true,
			border : false,
			rootVisible : false,		        
	        listeners:{
				"click": function(node,e) {
					    	if(node.id>0){
								nodeId = node.id;
								//alert(nodeId);
								ds.reload({
									   params : {
							           start : 0,
							           limit : pageSize,
							           'specialOrgId' : nodeId
										}
								});    	
					    	}
						}
			}	
           
      });
      var root = new Tree.AsyncTreeNode( {
            text : '业务组织树',
            expanded : true,
            draggable : false,
            id : '0',//默认的node值：?node=0
            loader : new Tree.TreeLoader( {
                  dataUrl : gdc.webContextRoot+'/specialOrg/searchSpecialOrgTree.action' // 这就是要动态载入数据的请求地址，这里请求时会提交一个参数为node的值，值为root即new Tree.AsyncTreeNode()对象的id值
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
						fc.fireEvent('click',fc);
						/*
						if(node.item(0)) {
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
    if (value == '1') {
        return "是";
    } else {
        return "否";
    }    
}
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
	/**
	 * 新增使用
	 */
	var smTem=new Ext.grid.CheckboxSelectionModel({
		singleSelect:false,
		listeners:{
			"beforerowselect ": function(){
				//alert('beforerowselect');
				//alert(singleSelect);
				//this.singleSelect = false;
			}
		}		
	});
	/**
	 * 修改使用
	 */
	var smTemEdit=new Ext.grid.CheckboxSelectionModel({
		singleSelect:false,
		listeners:{
			"beforerowselect ": function(){
				//alert('beforerowselect');
				//alert(singleSelect);
				//this.singleSelect = false;
			}
		}		
	});
	/**
	 * 新增使用
	 * @type 
	 */
	var dataSetGrid;
	var dataSetDs;
	
	/**
	 * 修改使用
	 */
	var dataSetEditGrid;
	var dataSetEditDs;
	
	var dataSetData;
	
	var dataSetMapping = Ext.data.Record.create([
		{name:'dataSetId',mapping:'dataSetId'},
		{name:'dataSetName',mapping:'dataSetName'},
		{name:'specialOrgId',mapping:'specialOrgId'},
		{name:'isDefault',mapping:'isDefault'}
	]);
	
	
/**
* 初始化数据集合信息grid布局
*/
com.frontier.gdc.system.specialOrgDataset.initGrid = function(){
		ds = new Ext.data.Store( {
			//baseParams:{ 'specialOrgDataSet.specialOrgId' : nodeId},
//			proxy : new Ext.data.HttpProxy( {
//				url : gdc.webContextRoot+'/specialOrg/searchSpecialOrgDataSetList.action'
//			}),
			url : gdc.webContextRoot+'/specialOrg/searchSpecialOrgDataSetList.action',
			reader : _jsonReader
			,listeners:{
				"beforeload": loadCallBack
			}			
		});
		
		// ColumnModels
		
		var cm = new Ext.grid.ColumnModel([sm,new Ext.grid.RowNumberer(), {
			id : 'dataSetId',
			header : '数据集合ID',
			dataIndex : 'dataSetId',
			hidden : true
		}, {
			header : '业务组织名称',
			dataIndex : 'specialOrgName',
			align : 'center',
			width : 200
			,renderer:Ext.util.Format.htmlEncode
		}, {
			header : '数据集合名称',
			dataIndex : 'dataSetName',
			align : 'center',
			width : 200,
			renderer:Ext.util.Format.htmlEncode
		}
		, isCheck/*{
			header : '默认数据权限',
			dataIndex : 'isDefault',
			renderer : changeIdToName,
			width : 120
		}*/]);
		
		// by default columns are sortable
		cm.defaultSortable = true;
		var ptb = new gdc.grid.PagingToolbar(
		          {pageSize : pageSize,
		           store: ds});

		grid = new Ext.grid.GridPanel( {
			title : '业务组织授权管理',
			region: 'center',
			store : ds,
			plugins:[isCheck],
			cm : cm,
			sm : sm,
			stripeRows: true,//条纹?
			border:false,
			layout : 'fit',
			width : 900,
			height : 610,
			frame : true,
			autoShow : true,            

			viewConfig : {
				forceFit : false
			},

			// 添加分页工具栏
			bbar :ptb,
			// 添加内陷的工具条
			tbar : [ /*{
				id : 'New',
				text : ' 新增 ',
				tooltip : '新增数据集合',
				iconCls : 'add',
				handler : function() {
							var sm = Ext.getCmp('menu-tree').getSelectionModel();
							var node = sm.getSelectedNode();
							var id = 0;
							if(node != null){
								nodeId = node.id;
								//alert('nodeId ' + nodeId);
								nodeText = node.text;
								//alert('nodeText ' + nodeText);
							}
							newSpecialOrgDataSet();
				}
			}, '-', {
				id : 'Edit',
				text : '修改',
				tooltip : '修改数据集合',
				iconCls : 'edit',
				handler : function() {
					editSpecialOrgDataSet();
				}
			},*/ {
				text : '新增',
				tooltip : '新增',
				iconCls : 'add',
				bizCode:'add',
				handler : function() {
					var sm = Ext.getCmp('menu-tree').getSelectionModel();
					var node = sm.getSelectedNode();
					var id = 0;
					if(node != null){
						nodeId = node.id;
						//alert('nodeId ' + nodeId);
						nodeText = node.text;
						//alert('nodeText ' + nodeText);
					}
					specialOrgDataSetAdd();
				}
			}, '-', {
				text : '保存',
				tooltip : '保存',
				iconCls : 'save',
				bizCode:'edit',
				handler : function() {
					var sm = Ext.getCmp('menu-tree').getSelectionModel();
					var node = sm.getSelectedNode();
					var id = 0;
					if(node != null){
						nodeId = node.id;
						//alert('nodeId ' + nodeId);
						nodeText = node.text;
						//alert('nodeText ' + nodeText);
					}
					
					specialOrgDataSetEdit();
					
					
				}
			}, '-', {
				text : '删除',
				tooltip : '删除数据集合',
				iconCls : 'remove',
				bizCode:'remove',
				handler : function() {
					deleteSpecialOrgDataSet();
				}
			}/*, '-', {
				text : '同步业务组织',
				tooltip : '同步业务组织',
				iconCls : 'edit',
				handler : function() {
					synchronizedSpecialOrg();
				}
			}*/]

		});
		
		ds.load( {
			params : {
				start : 0,
				limit : pageSize
			}
		});		
		
		/*grid.on("rowdblclick", function(grid) {
			editSpecialOrgDataSet();
		});*/


		
		
		var editForm = new gdc.FormPanel( {
			id : "specialOrgDataSetEditForm",
			labelWidth : 95, // label settings here cascade unless overridden
			frame : true,
			labelAlign : 'right',
			bodyStyle : 'padding:5px 5px 0',
			width : 350,
			waitMsgTarget : true,
			defaults : {
				width : 230
			},
			//defaultType : 'textfield',
			reader : _jsonFormReader,
			items : [ {
				fieldLabel : '业务组织ID',
				xtype:"textfield",
				name : 'specialOrgDataSet.specialOrgId',
				hideLabel : true,
				hidden : true
			},{
				fieldLabel : '数据集合ID',
				xtype:"textfield",
				name : 'specialOrgDataSet.dataSetId',
				hideLabel : true,
				hidden : true
			},{
				fieldLabel : '业务组织名称',
				xtype:"textfield",
				name : 'specialOrgDataSet.specialOrgName',
				readOnly : true
			}, new Ext.form.ComboBox({
				fieldLabel : '数据集合名称',
				name : 'specialOrgDataSet.dataSetName',
				loadingText : '正在加载数据集合信息',
				triggerAction:'all',
				store:new Ext.data.SimpleStore({
					proxy:new Ext.data.HttpProxy({
						//url:gdc.webContextRoot+'/dataSet/searchDataSetForCombo.action'
						url:gdc.webContextRoot+'/purviewTree/findDataSetForCombo.action'
					}),	baseParams:{'specialOrgId':nodeId},
					fields : ['dataSetId','dataSetName'],
					listeners:{
					    'beforeload':function() {
							this.baseParams.specialOrgId = nodeId;
					    }
					}
				}),
				valueField:'dataSetId',
				displayField:'dataSetName',
				mode:'local',
				forceSelection:true,
				resizable:true,
				typeAhead:true,
				autoCreate:true,
				editable:false,
				allowBlank:false,
				emptyText : '请选择'
			}),{
			columnWidth : 1,
			layout : 'column',
			border : false,
			items : [{
					labelWidth : 100,
					labelAlign : 'right',
					columnWidth : .45,
					layout : 'form',
					border : false,
					items : [
						new Ext.form.Label({
						html: '&nbsp;&nbsp;&nbsp;默认数据权限:',
		                text: '',
		                style:{padding:'0 3 0 3'}
		             })
				    ]
			      },{
					labelWidth : 100,
					labelAlign : 'right',
					columnWidth : .55,
					layout : 'form',
					border : false,
					items : [
						new Ext.form.Checkbox({
						//align : 'center',
						//cls : "x-form-item-label",
						name : 'specialOrgDataSet.isDefault',
						//boxLabel:'是否默认',
						fieldLabel : '是否默认',
						hideLabel:true,
						inputValue:'1'
					 })
				    ]
			      }]
			}
			],
			tbar:[{
				 id : 'Edit',
				 text : '保存',
				 iconCls: 'save',
				 handler : function() {
					if (editForm.form.isValid(editForm)) {
						com.frontier.gdc.system.specialOrgDataset.editFormWin.hide();
						editForm.form.submit( {
							url : gdc.webContextRoot+'/specialOrg/updateSpecialOrgDataSet.action',
							success : function(form, action) {
								Appframe.viewinfdlg.right.show("修改业务组织数据集合成功！",true);
								ds.load( {
									params : {
										start : ptb.cursor,
										limit : pageSize,
										"specialOrgDataSet.specialOrgId" : nodeId
									}
								});
							},
							failure : function(form, action) {
								Appframe.viewinfdlg.error.show("修改业务组织数据集合失败！");
							},
							waitMsg : '正在保存数据，稍后...'
						});
						
					}
				
				 }}, {
					text : '取消',
					handler : function() {
						com.frontier.gdc.system.specialOrgDataset.editFormWin.hide();				
					}
			}]
	    });		
		
	    
	
	
		var newForm = new gdc.FormPanel( {
		id : "specialOrgDataSetForm",
		labelWidth : 95, // label settings here cascade unless overridden
		frame : true,
		labelAlign : 'right',
		bodyStyle : 'padding:5px 5px 0',
		width : 350,
		waitMsgTarget : true,
		defaults : {
			width : 230
		},
		//defaultType : 'textfield',
		items : [ {
				fieldLabel : '业务组织ID',
				xtype:"textfield",
				id : 'specialOrgDataSet.specialOrgId',				
				hideLabel : true,
				hidden : true
			},{
				fieldLabel : '业务组织名称',
				xtype:"textfield",
				id : 'specialOrgDataSet.specialOrgName',
				value : '',
				readOnly : true
			}, new Ext.form.ComboBox({
				fieldLabel : '数据集合名称',
				hiddenName : 'specialOrgDataSet.dataSetId',
				loadingText : '正在加载数据集合信息',
				triggerAction:'all',
				store:new Ext.data.SimpleStore({
					proxy:new Ext.data.HttpProxy({
						//url:gdc.webContextRoot+'/dataSet/searchDataSetForCombo.action'
						url:gdc.webContextRoot+'/purviewTree/findDataSetForCombo.action'
					}),	baseParams:{'specialOrgId':nodeId},
					fields : ['dataSetId','dataSetName'],
					listeners:{
					    'beforeload':function() {
							this.baseParams.specialOrgId = nodeId;
					    }
					}
				}),
				valueField:'dataSetId',
				displayField:'dataSetName',
				mode:'remote',
				forceSelection:true,
				resizable:true,
				editable:false,
				allowBlank:false,
				emptyText :'请选择'
			}),{
				xtype: 'checkboxgroup',
               			id:'cg',
		                fieldLabel: '默认数据权限',
		                items: [
				           new Ext.form.Checkbox({
							//align : 'center',
							//cls : "x-form-item-label",
							name : 'specialOrgDataSet.isDefault',
							//boxLabel:'是否默认',
							fieldLabel : '是否默认',
							hideLabel:true,
							inputValue:'1'
					 		})
		               ]
			}/*,{
				columnWidth : 1,
		layout : 'column',
		labelAlign : 'right',
		border : false,
		items : [{
				labelWidth : 100,
				
				columnWidth : .45,
				layout : 'form',
				border : false,
				items : [
					new Ext.form.Label({
	                text: '<p>&nbsp;&nbsp;&nbsp;是否默认:</p>'
	                //style:{padding:'0 2 0 2'}
	             })
			    ]
		      },{
				labelWidth : 100,
				columnWidth : .45,
				layout : 'form',
				border : false,
				items : [
					new Ext.form.Checkbox({
					//align : 'center',
					//cls : "x-form-item-label",
					name : 'specialOrgDataSet.isDefault',
					//boxLabel:'是否默认',
					fieldLabel : '是否默认',
					hideLabel:true,
					inputValue:'1'
				 })
			    ]
		      }]
			}*/
			
		],
		tbar:[{
			 id : 'New',
			 text : '保存',
			 iconCls: 'save',
			 handler : function() {
				if (newForm.form.isValid(newForm)) {
					com.frontier.gdc.system.specialOrgDataset.newFormWin.hide();
					newForm.form.submit( {
						url : gdc.webContextRoot+'/specialOrg/addSpecialOrgDataSet.action',
						success : function(form, action) {
							newForm.form.reset();
							Appframe.viewinfdlg.right.show("添加业务组织数据集合成功！",true);
							ds.load( {
								params : {
									start : ptb.cursor,
									limit : pageSize,
									"specialOrgDataSet.specialOrgId" : nodeId
								}
							});
							
						},
						failure : function(form, action) {
							Appframe.viewinfdlg.error.show("添加业务组织数据集合失败！");
						},
						waitMsg : '正在保存数据，稍后...'
					});
					
				}
			}
		}, {
			text : '取消',
			handler : function() {
				newForm.form.reset();
				com.frontier.gdc.system.specialOrgDataset.newFormWin.hide();				
			}
		  }
		]/*,
		buttons : [ {
			text : '提交',
			disabled : false,
			handler : function() {
				if (newForm.form.isValid()) {
					com.frontier.gdc.system.specialOrgDataset.newFormWin.hide();
					newForm.form.submit( {
						url : gdc.webContextRoot+'/specialOrg/addSpecialOrgDataSet.action',
						success : function(form, action) {
							newForm.form.reset();
							Appframe.viewinfdlg.right.show("添加业务组织数据集合成功！");
							ds.load( {
								params : {
									start : ptb.cursor,
									limit : pageSize,
									"specialOrgDataSet.specialOrgId" : nodeId
								}
							});
						},
						failure : function(form, action) {
							Appframe.viewinfdlg.error.show("添加业务组织数据集合失败！");
						},
						waitMsg : '正在保存数据，稍后...'
					});
					
				} else {
						Appframe.viewinfdlg.warning.show("请填写完成再提交!");
				}
			}
		}, {
			text : '取消',
			handler : function() {
				newForm.form.reset();
				com.frontier.gdc.system.specialOrgDataset.newFormWin.hide();				
			}
		}]*/
	});	
	
	dataSetDs = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			//url:gdc.webContextRoot+'/dataSet/searchDataSetForComboT.action'
			url:gdc.webContextRoot+'/purviewTree/findSpecialOrgDataSets.action'
		}),	baseParams:{'specialOrgId':nodeId},
		listeners:{
		    'beforeload':function() {
		    	//alert(nodeId);
				this.baseParams.specialOrgId = nodeId;
		    }
		},
		reader: new Ext.data.JsonReader({
			root : 'list',
			totalProperty : 'totalCount',
			successProperty : '@success'
		}
			,dataSetMapping
		)
	});
	
	var dscm = new Ext.grid.ColumnModel([smTem,new Ext.grid.RowNumberer(), {
			header:"数据集合id",
			dataIndex:"dataSetId",
			hidden : true
		},{
			header:"业务组织id",
			dataIndex:"specialOrgId",
			hidden : true
		},{
			header:"数据集合名称",
			width:245,
			dataIndex:"dataSetName",
			sortable:true,
			align : 'center'
			,renderer:Ext.util.Format.htmlEncode
		}, isDefaultCheck
	]);
		
	// by default columns are sortable
	dscm.defaultSortable = true;
	var ptbTem = new gdc.grid.PagingToolbar(
		          {pageSize : shortPageSize,
		           store: dataSetDs});
	dataSetGrid = new Ext.grid.GridPanel({
		//autoWidth : true,
		width:550,
		height:390,
		frame:true,
		//disabled : true,
		store:dataSetDs,
		stripeRows: true,//条纹?
		border:false,
		layout : 'fit',
		autoShow : true,            

		viewConfig : {
			forceFit : false
		},
		bbar :ptbTem,
		plugins:[isDefaultCheck],
		cm:dscm,
		sm:smTem,
		/*columns:[sm,new Ext.grid.RowNumberer(),
			{header:"数据集合名称",width:245,dataIndex:"dataSetName",sortable:true,align : 'center'}
			//,{header:"是否默认权限",width:180,dataIndex:"isDefault",sortable:true,align : 'center'}
			,isDefaultCheck
			
		],*/
		listeners : {   
	        'afteredit' : function(e) {
	        	//alert(afteredit);
	        	//this.singleSelect = false;
	        }   
	    }
	})
//	dataSetDs.load( {
//		params : {
//			start : 0,
//			limit : shortPageSize
//		}
//	});	
	var newFormT = new gdc.FormPanel( {
		id : "specialOrgDataSetFormT",
		labelWidth : 95, // label settings here cascade unless overridden
		frame : true,
		labelAlign : 'right',
		bodyStyle : 'padding:5px 5px 0',
		width : 650,
		waitMsgTarget : true,
		
		//defaultType : 'textfield',
		items : [ /*{
				fieldLabel : '业务组织ID',
				xtype:"textfield",
				id : 'specialOrgDataSet.specialOrgId',				
				hideLabel : true,
				hidden : true
			},{
				fieldLabel : '业务组织名称',
				xtype:"textfield",
				id : 'specialOrgDataSet.specialOrgName',
				value : '',
				readOnly : true
			},*/dataSetGrid
			
		],
		tbar:[{
			 id : 'New',
			 text : '保存',
			 iconCls: 'save',
			 handler : function() {
			 	var _record = dataSetGrid.getSelectionModel().getSelected();
			 	var rows = dataSetGrid.getSelections();
			 	if(rows.length<1){
					//Ext.MessageBox.alert("提示","请选择新增的记录！");
					Appframe.viewinfdlg.warning.show('请选择新增的记录！');
					return;
				}
			 	var dataSetJson = '[';
			 	//var json = new Array();
			 	for(var i=0;i<rows.length;i++){
				 	var dataSetId = rows[i].get("dataSetId");	
				 	var specialOrgId = nodeId;//rows[i].get("specialOrgId");
				 	//var dataSetName = rows[i].get("dataSetName");
				 	var isDefault = rows[i].get("isDefault");
				 	if(i==(rows.length-1)){
				 		dataSetJson+="{dataSetId :'"+dataSetId+"', specialOrgId :'"+specialOrgId+"', isDefault :'"+isDefault+"'}";
				 	}else{
				 		dataSetJson+="{dataSetId :'"+dataSetId+"', specialOrgId :'"+specialOrgId+"', isDefault :'"+isDefault+"'},";
				 	}
				 	
			 	}
			 	dataSetJson+=']';
			 	//alert(dataSetJson);
				if (newFormT.form.isValid(newFormT)) {
					com.frontier.gdc.system.specialOrgDataset.newFormWinT.hide();
					newFormT.form.submit( {
						url : gdc.webContextRoot+'/specialOrg/addSpecialOrgDataSet.action?checkedNodes='+dataSetJson,
						success : function(form, action) {
							newFormT.form.reset();
							Appframe.viewinfdlg.right.show("添加业务组织数据集合成功！",true);
							/*ds.load( {
								params : {
									start : ptb.cursor,
									limit : pageSize,
									"specialOrgDataSet.specialOrgId" : nodeId
								}
							});*/
							
							ds.reload();
							dataSetDs.reload();
							dataSetEditDs.reload();
						},
						failure : function(form, action) {
							Appframe.viewinfdlg.error.show("添加业务组织数据集合失败！");
						},
						waitMsg : '正在保存数据，稍后...'
					});
					
				}
			}
		}
		]
	});	
		var dscmEdit = new Ext.grid.ColumnModel([smTemEdit,new Ext.grid.RowNumberer(), {
				header:"数据集合id",
				dataIndex:"dataSetId",
				hidden : true
			},{
				header:"业务组织id",
				dataIndex:"specialOrgId",
				hidden : true
			},{
				header:"数据集合名称",
				width:245,
				dataIndex:"dataSetName",
				sortable:true,
				align : 'center'
				,renderer:Ext.util.Format.htmlEncode
			}, isDefaultCheckEdit
		]);
		dataSetEditDs = new Ext.data.Store({
			proxy: new Ext.data.MemoryProxy(dataSetData),
			listeners:{
			    'beforeload':function() {
			    }
			},
			reader: new Ext.data.JsonReader({
					//root : 'root'
				}
				,dataSetMapping
			)
		});				 
		dataSetEditDs.load();;
	
		dataSetEditGrid = new Ext.grid.GridPanel({
			//autoWidth : true,
			width:550,
			height:390,
			frame:true,
			//disabled : true,
			store:dataSetEditDs,
			stripeRows: true,//条纹?
			border:false,
			layout : 'fit',
			autoShow : true,            

			viewConfig : {
				forceFit : false
			},
			//bbar :ptbTem,
			plugins:[isDefaultCheckEdit],
			cm:dscmEdit,
			sm:smTemEdit,
			/*columns:[sm,new Ext.grid.RowNumberer(),
				{header:"数据集合名称",width:245,dataIndex:"dataSetName",sortable:true,align : 'center'}
				//,{header:"是否默认权限",width:180,dataIndex:"isDefault",sortable:true,align : 'center'}
				,isDefaultCheck
				
			],*/
			listeners : {   
		        'afteredit' : function(e) {
		        	//alert(afteredit);
		        	//this.singleSelect = false;
		        }   
		    }
		});
	

	var editFormT = new gdc.FormPanel( {
			id : "specialOrgDataSetEditFormT",
			labelWidth : 95, // label settings here cascade unless overridden
			frame : true,
			labelAlign : 'right',
			bodyStyle : 'padding:5px 5px 0',
			width : 650,
			waitMsgTarget : true,
			
			//defaultType : 'textfield',
			//reader : _jsonFormReader,
			items : [/* {
					fieldLabel : '业务组织ID',
					xtype:"textfield",
					id : 'specialOrgDataSet.specialOrgId',				
					hideLabel : true,
					hidden : true
				},{
					fieldLabel : '业务组织名称',
					xtype:"textfield",
					id : 'specialOrgDataSet.specialOrgName',
					value : '',
					readOnly : true
				},*/dataSetEditGrid
				
			],
			tbar:[{
				 id : 'Edit',
				 text : '保存',
				 iconCls: 'save',
				 handler : function() {
					if (editFormT.form.isValid(editFormT)) {
						var _record = dataSetEditGrid.getSelectionModel().getSelected();
					 	var rows = dataSetEditGrid.getSelections();
					 	if(rows.length<1){
							//Ext.MessageBox.alert("提示","请选择修改的记录！");
							Appframe.viewinfdlg.warning.show('请选择修改的记录！');
							return;
						}
					 	var dataSetJson = '[';
					 	//var json = new Array();
					 	for(var i=0;i<rows.length;i++){
						 	var dataSetId = rows[i].get("dataSetId");	
						 	var specialOrgId = rows[i].get("specialOrgId");
						 	//var dataSetName = rows[i].get("dataSetName");
						 	var isDefault = rows[i].get("isDefault");
						 	if(i==(rows.length-1)){
						 		dataSetJson+="{dataSetId :'"+dataSetId+"', specialOrgId :'"+specialOrgId+"', isDefault :'"+isDefault+"'}";
						 	}else{
						 		dataSetJson+="{dataSetId :'"+dataSetId+"', specialOrgId :'"+specialOrgId+"', isDefault :'"+isDefault+"'},";
						 	}
						 	
					 	}
					 	dataSetJson+=']';
						//alert(dataSetJson);
						com.frontier.gdc.system.specialOrgDataset.editFormWinT.hide();
						editFormT.form.submit( {
							url : gdc.webContextRoot+'/specialOrg/updateSpecialOrgDataSet.action?checkedNodes='+dataSetJson,
							success : function(form, action) {
								Appframe.viewinfdlg.right.show("修改业务组织数据集合成功！",true);
								ds.reload();
								dataSetDs.reload();
								dataSetEditDs.reload();
							},
							failure : function(form, action) {
								Appframe.viewinfdlg.error.show("修改业务组织数据集合失败！");
							},
							waitMsg : '正在保存数据，稍后...'
						});
						
					}
				
				 }}
			]
	    });		
	
		
  /**
  * 新建业务组织数据集合关系
  */
	
	var newSpecialOrgDataSet = function() {
		if (!com.frontier.gdc.system.specialOrgDataset.newFormWin) {
			com.frontier.gdc.system.specialOrgDataset.newFormWin = new Ext.Window( {
				layout : 'fit',
				width : 400,
				height : 300,
				closeAction : 'hide',
				plain : true,
				title : '新增业务数据集合关系',
				items : newForm
			});
		}
		var s=newForm.findById("specialOrgDataSet.specialOrgName");
		s.setValue(nodeText);
		var v=newForm.findById("specialOrgDataSet.specialOrgId");
		v.setValue(nodeId);
		com.frontier.gdc.system.specialOrgDataset.newFormWin.show('New');
	};
	/**
	 * 新增业务组织数据集合方式2
	 */
	var specialOrgDataSetAdd = function() {
		if (!com.frontier.gdc.system.specialOrgDataset.newFormWinT) {
			com.frontier.gdc.system.specialOrgDataset.newFormWinT = new Ext.Window( {
				layout : 'fit',
				width : 600,
				height : 500,
				closeAction : 'hide',
				plain : true,
				title : '新增业务数据集合关系',
				items : newFormT
			});
		}
		var s=newFormT.findById("specialOrgDataSet.specialOrgName");
		if(s){
			s.setValue(nodeText);
		}
		var v=newFormT.findById("specialOrgDataSet.specialOrgId");
		if(v){
			v.setValue(nodeId);
		}
		com.frontier.gdc.system.specialOrgDataset.newFormWinT.show('New');
//		dataSetDs.load( {
//			params : {
//				start : 0,
//				limit : shortPageSize
//			}
//		});
		dataSetDs.reload();
	};
	
  /**
  * 编辑业务组织数据集合关系
  */
	var editSpecialOrgDataSet = function() {			
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
			var dataSetId = rows[0].get("dataSetId");			
			if (!com.frontier.gdc.system.specialOrgDataset.editFormWin) {
				com.frontier.gdc.system.specialOrgDataset.editFormWin = new Ext.Window( {
					layout : 'fit',
					width : 400,
					height : 300,
					closeAction : 'hide',
					plain : true,
					title : '修改业务数据集合关系',
					items : editForm
				});
			}
			
			com.frontier.gdc.system.specialOrgDataset.editFormWin.show('Edit');
			editForm.form.load( {
				url : gdc.webContextRoot+'/specialOrg/findSpecialOrgDataSet.action',
				params :{"specialOrgDataSet.dataSetId" : dataSetId,
						 "specialOrgDataSet.specialOrgId" : nodeId
						},					
				waitMsg : '正在载入数据...'
			});			
		}		
	};	
	
 /**
  * 编辑业务组织数据集合关系2
  */
	var specialOrgDataSetEdit = function() {			
		var _record = grid.getSelectionModel().getSelected();
		if (!_record) {
			//Ext.MessageBox.alert("提示","请选择要修改的一项！");
			Appframe.viewinfdlg.warning.show('请选择要修改的一项！');
		} else {
			var rows = grid.getSelections();
			/*if(rows.length>1){
				Ext.MessageBox.alert("提示","只能选择一条记录修改！");
				return;
			}
			
			dataSetData = '[';
		 	for(var i=0;i<rows.length;i++){
			 	var dataSetId = rows[i].get("dataSetId");	
			 	//alert(dataSetId);
			 	var specialOrgId = rows[i].get("specialOrgId");
			 	//alert(specialOrgId);
			 	var dataSetName = rows[i].get("dataSetName");
			 	//alert(dataSetName);
			 	var isDefault = rows[i].get("isDefault");
			 	if(isDefault==1){
			 		isDefault = true;
			 	}else{
			 		isDefault = false;
			 	}
			 	if(i==(rows.length-1)){
			 		dataSetData+="{dataSetId :'"+dataSetId+"', specialOrgId :'"+specialOrgId+"', dataSetName :'"+dataSetName+"', isDefault :"+isDefault+"}";
			 	}else{
			 		dataSetData+="{dataSetId :'"+dataSetId+"', specialOrgId :'"+specialOrgId+"', dataSetName :'"+dataSetName+"', isDefault :"+isDefault+"},";
			 	}
			 	
		 	}
		 	dataSetData+=']';
		 	dataSetData = eval(dataSetData); 
		 	dataSetEditDs.loadData(dataSetData);
		 	*/
		 	/*var _record = dataSetEditGrid.getSelectionModel().getSelected();
		 	var rows = dataSetEditGrid.getSelections();
		 	if(rows.length<1){
				Ext.MessageBox.alert("提示","请选择修改的记录！");
				return;
			}*/
		 	var dataSetJson = '[';
		 	//var json = new Array();
		 	for(var i=0;i<rows.length;i++){
			 	var dataSetId = rows[i].get("dataSetId");	
			 	var specialOrgId = rows[i].get("specialOrgId");
			 	//var dataSetName = rows[i].get("dataSetName");
			 	var isDefault = rows[i].get("isDefault");
			 	if(i==(rows.length-1)){
			 		dataSetJson+="{dataSetId :'"+dataSetId+"', specialOrgId :'"+specialOrgId+"', isDefault :'"+isDefault+"'}";
			 	}else{
			 		dataSetJson+="{dataSetId :'"+dataSetId+"', specialOrgId :'"+specialOrgId+"', isDefault :'"+isDefault+"'},";
			 	}
			 	
		 	}
		 	dataSetJson+=']';
			//alert(dataSetJson);
			Ext.Ajax.request({
				url : gdc.webContextRoot+'/specialOrg/updateSpecialOrgDataSet.action?checkedNodes='+dataSetJson,
				success : function(form, action) {
					Appframe.viewinfdlg.right.show("修改业务组织数据集合成功！",true);
					ds.reload();
					dataSetDs.reload();
					dataSetEditDs.reload();
				},
				failure : function(form, action) {
					Appframe.viewinfdlg.error.show("修改业务组织数据集合失败！");
				},
				waitMsg : '正在保存数据，稍后...'
			});
		 	
		 	
			/*if (!com.frontier.gdc.system.specialOrgDataset.editFormWinT) {
				com.frontier.gdc.system.specialOrgDataset.editFormWinT = new Ext.Window( {
					layout : 'fit',
					width : 600,
					height : 500,
					closeAction : 'hide',
					plain : true,
					title : '修改业务数据集合关系',
					items : editFormT
				});
			}
			
			com.frontier.gdc.system.specialOrgDataset.editFormWinT.show('Edit');*/
			/*editFormT.form.load( {
				url : gdc.webContextRoot+'/specialOrg/findSpecialOrgDataSet.action',
				params :{"specialOrgDataSet.dataSetId" : dataSetId,
						 "specialOrgDataSet.specialOrgId" : nodeId
						},					
				waitMsg : '正在载入数据...'
			});	*/		
		}		
	};	
	
	/*
	 * 删除业务组织数据集合关系
	 */
		var deleteSpecialOrgDataSet = function() {
			var _record = grid.getSelectionModel().getSelected();
			if (_record) {
				Ext.MessageBox.confirm('提示', '你确认要删除数据吗？', function(btn) {
					if (btn == "yes") {
						try{
							var rows = grid.getSelections();
							var jsonData = "";
							for (var i = 0, len = rows.length;i < len; i++) {
								var id = rows[i].get("dataSetId");
								if (i == 0) {
									jsonData = jsonData + id;
								} else {
									jsonData = jsonData + "," + id;
								}
								//ds.remove(rows[i]);
							}		
							/*var httpProxy = new Ext.data.HttpProxy({
								url:gdc.webContextRoot+'/specialOrg/deleteSpecialOrgDataSet.action'
							});
							httpProxy.load({
								"dataSetIds": jsonData,
								"specialOrgId" : nodeId								
							});
							Appframe.viewinfdlg.right.show("业务组织关联的数据集合删除成功！",true);		
							ds.reload();*/
							
							Ext.Ajax.request({
								url : gdc.webContextRoot + '/specialOrg/deleteSpecialOrgDataSet.action',
								params : {"dataSetIds" : jsonData, "specialOrgId":nodeId},
								success : function(result,request) {
									var result = result.responseText;
									var resObj = eval('('+result+')');
									if(resObj.success==true){
										ds.reload();
										dataSetDs.reload();
										dataSetEditDs.reload();
										Appframe.viewinfdlg.parent.right.show("业务组织关联的数据集合删除成功！",true);			
									}else{
										Appframe.viewinfdlg.parent.warning.show("业务组织关联的数据集合删除失败！");
									}
								},
								failure : function(form, action) {
									Appframe.viewinfdlg.parent.warning.show("业务组织关联的数据集合删除失败！");
								},
								waitMsg : '正在删除，稍后...'	
							});
							
							
						}catch(e){
							Appframe.viewinfdlg.warning.show("业务组织关联的数据集合删除失败！");
						}

					}
				});
			} else {
				//Ext.MessageBox.alert('提示', '请选择要删除的数据项！');
				Appframe.viewinfdlg.warning.show('请选择要删除的数据项！');
			}
		};
		
	/*
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
							success : function(result,request) {
								var result = result.responseText;
								var resObj = eval('('+result+')');
								//alert(resObj.success);
								if(resObj.success==true){
									Ext.MessageBox.hide();
									Appframe.viewinfdlg.right.show("业务组织同步成功！",true);			
								}
									
					         }
						});
					}
				});
			
		};		
		return grid;
}

/**
* 厂站管理页面初始化
*/
com.frontier.gdc.system.specialOrgDataset.newMainPanel = function(){

	Ext.QuickTips.init();
	
	com.frontier.gdc.system.specialOrgDataset.initTree();
	com.frontier.gdc.system.specialOrgDataset.initGrid();

	/**
	* 业务组织管理页面布局
	*/
	/*var viewport=new Ext.Viewport({
    layout: 'border',
    items: [ {
                    region:'west',
                    id:'west-panel',
                    title:'业务组织授权导航树菜单',
                    split:true,
                    width: 200,
                    
                    maxSize: 400,
                    collapsible: true,
                   // margins:'0 0 0 5',
                    //layout:'accordion',
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
     return panel;*/    
     
     var mainPanelInit = new Ext.Panel({
		//frame:true,
     	bodyStyle:'padding:0px 0px 0',
	    width:Ext.lib.Dom.getViewWidth(),
	    height:Ext.lib.Dom.getViewHeight(),
		layout : 'fit',
		items:[{
			border : false,
		    layout : 'border',
			items : [ {
                    region:'west',
                    id:'west-panel',
                    title:'业务组织授权导航树菜单',
                    split:true,
                    width: 200,
                    
                    maxSize: 400,
                    collapsible: true,
                   // margins:'0 0 0 5',
                    layout:'fit',
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

/**
 * 本功能的功能参数，用于打开本功能框架使用
 * @type 
 */
com.frontier.gdc.system.specialOrgDataset.mdlCfg={
		mustRole:false,
		funcBtnControl:true
};	

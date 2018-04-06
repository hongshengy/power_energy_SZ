Ext.namespace("com.frontier.gdc.shishishuju.datatype");
	/**
	* 新建窗口
	* @type {Ext.Window}
	*/
	com.frontier.gdc.shishishuju.datatype.newFormWin = null;
	/**
	* 新建表单
	* @type { Ext.FormPanel}
	*/
	var newForm;
	/**
	* 编辑窗口
	* @type {Ext.Window}
	*/
	var editFormWin;
	/**
	* 编辑表单
	* @type {Ext.FormPanel}
	*/
	var editForm;
	
	/**
	* 树节点id
	* @type {Number}
	*/
	var nodeId;
	/**
	* grid数据源
	* @type {Ext.data.Store}
	*/
	var ds;
	/**
	* 数据类型树
	* @type {Ext.tree.TreePanel}
	*/
	var tree;
	
	

	/**
	* 表单reader
	* @type {Ext.data.JsonReader}
	*/
	var _jsonFormReader = new Ext.data.JsonReader( {
		root : 'list',
		totalProperty : 'totalCount',
		id : 'id',
		successProperty : '@success'
	}, [  {
			name : 'datatype.datatypeName',
			mapping : 'datatypeName'
		}, {
			name : 'datatype.tableName',
			mapping : 'tableName'
		}, {
			name : 'datatype.primaryKey',
			mapping : 'primaryKey'
		}, {
			name : 'datatype.nameField',
			mapping : 'nameField'
		},{
			name : 'datatype.parentFieldKey',
			mapping : 'parentFieldKey'
		}, {
			name : 'datatype.parentDatatypeId',
			mapping : 'parentDatatypeId'
		}, {
			name : 'datatype.datatypeId',
			mapping : 'datatypeId'
		}]);
	    

/**
*初始化数据类型树
*
*/
com.frontier.gdc.shishishuju.datatype.initTree = function(){
	
	  var Tree = Ext.tree;
      tree = new Tree.TreePanel( {
      		id : 'menu-tree',
            el : 'tree-div',
            autoScroll : true,
            animate : true,
            enableDD : true,
            containerScroll : true,
            border:false,
	        height:530,
	        rootVisible:false
           
      });
      var root = new Tree.AsyncTreeNode( {
            text : '数据类型结构树',
            draggable : false,
            id : '0',//默认的node值：?node=0
            loader : new Tree.TreeLoader( {
                  dataUrl : '../datatype/findDatatypes.action?datatype.datatypeId = 0' // 这就是要动态载入数据的请求地址，这里请求时会提交一个参数为node的值，值为root即new Tree.AsyncTreeNode()对象的id值
            })
      });
      tree.setRootNode(root);
      tree.render();
      root.expand();
};


	/**
	* 新建表单
	* @type {Ext.FormPanel}
	*/
var createForm = function(){
	newForm = new Ext.FormPanel( {
		// collapsible : true,// 是否可以展开
		id : "addPlantForm",
		labelWidth : 105, // label settings here cascade unless overridden
		frame : true,
		title : '新增数据类型',
		bodyStyle : 'padding:5px 5px 0',
		width : 400,
		height:200,
		waitMsgTarget : true,
		applyTo:'panel-div',
		defaults : {
			width : 230
		},
		defaultType : 'textfield',
		items : [{
			id:'datatypeId',
			fieldLabel : '数据类型标识',
			name : 'datatype.datatypeId',
			allowBlank : false
		}, {
			fieldLabel : '数据类型名称',
			name : 'datatype.datatypeName',
			allowBlank : false
		}, {
			fieldLabel : '数据表名称',
			name : 'datatype.tableName',
			allowBlank : false
		},{
			fieldLabel : '主键字段',
			name : 'datatype.primaryKey',
			allowBlank : false
		} ,{
			fieldLabel : '名称字段',
			name : 'datatype.nameField',
			allowBlank : false
		} ,{
			fieldLabel : '上级字段',
			name : 'datatype.parentFieldKey',
			allowBlank : false
		} 
		],

		buttons : [ {
			text : '保存',
			disabled : false,
			handler : function() { 
				var n = tree.getNodeById(Ext.getDom("datatypeId").value);
				if(n !=null){
					Appframe.viewinfdlg.warning.show("数据类型与现有的重复！！");
					return;
				}
				if (newForm.form.isValid()) {
					newForm.form.submit( {
						url : '../datatype/addDatatype.action?datatype.parentDatatypeId='+nodeId,
						success : function(form, action) {
							Appframe.viewinfdlg.right.show("添加数据类型成功！");
							location.href="./datatype.action";
						},
						failure : function(form, action) {
							Appframe.viewinfdlg.error.show("添加数据类型失败！");
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
				gdc.elementHandle.display.slideUp("panel-div","slow");
			}
		}]
	});
	
	
	};
	/**
	* 编辑表单
	* @type {Ext.FormPanel}
	*/
    editForm = new Ext.FormPanel( {
		// collapsible : true,// 是否可以展开
		labelWidth : 105, // label settings here cascade unless overridden
		url : '../datatype/modifyDatatype.action',
		frame : true,
		title : '编辑数据类型',
		bodyStyle : 'padding:5px 5px 0',
		width : 450,
		waitMsgTarget : true,
		reader : _jsonFormReader,
		defaults : {
			width : 230
		},
		defaultType : 'textfield',
		items : [ {
			fieldLabel : '数据类型标识',
			name : 'datatype.datatypeId',
			allowBlank : false,
			readOnly : true
		},{
			fieldLabel : '数据类型名称',
			name : 'datatype.datatypeName',
			allowBlank : false
		}, {
			fieldLabel : '数据表名称',
			name : 'datatype.tableName',
			allowBlank : false
		},{
			fieldLabel : '主键字段',
			name : 'datatype.primaryKey',
			allowBlank : false
		},{
			fieldLabel : '名称字段',
			name : 'datatype.nameField',
			allowBlank : false
		},{
			fieldLabel : '上级字段',
			name : 'datatype.parentFieldKey',
			allowBlank : false
		},{
			inputType : 'hidden',
			fieldLabel : '上级数据类型ID',
			name : 'datatype.parentDatatypeId'
		}],

		buttons : [ {
			text : '保存',
			disabled : false,
			handler : function() {
				if (editForm.form.isValid()) {
					editForm.form.submit( {
						url : '../datatype/modifyDatatype.action',
						success : function(form, action) {
							Appframe.viewinfdlg.right.show("保存修改成功！");
							location.href="./datatype.action";
						},
						failure : function(form, action) {
							Appframe.viewinfdlg.error.show("保存修改失败！");
						},
						waitMsg : '正在保存数据，稍后...'
					});
					editFormWin.hide();
				} else {
					Appframe.viewinfdlg.warning.show("请填写完成再提交!");
				}
			}
		}, {
			text : '取消',
			handler : function() {
				editFormWin.hide();
			}
		}]
	});		
function abc(btn){
			
			return;
}
  /**
  * 新建数据类型
  */
var newPlant = function() {
	var node = tree.getSelectionModel().getSelectedNode();
	if ( node === null ){
		Ext.MessageBox.confirm('确认', '您确定添加的是顶级数据类型吗？', function(btn){
			if(btn=="yes"){
				nodeId = 0;
				if (!newForm) {
					createForm();
				}
				gdc.elementHandle.display.slideDown("panel-div","slow");
			}
		});
	}else{
		nodeId = node.id;
		if (!newForm) {
				createForm();
		}
		gdc.elementHandle.display.slideDown("panel-div","slow");
	}

	
};
	/**
	* 准备修改数据类型
	*/
	var updatePlant = function() {
		loadFormData();
	};
	/**
	* 载入被选择的数据行的表单数据
	* @param {Ext.grid.GridPanel} grid 厂站信息集
	*/
var loadFormData = function() {
	var node = tree.getSelectionModel().getSelectedNode();
	if ( node!=null ){
			nodeId = node.id;
			editPlant();
			editForm.form.load( {
			url : '../datatype/findDtattypeById.action?datatype.datatypeId='+ nodeId,
			waitMsg : '正在载入数据...',
			failure : function() {
			//Ext.MessageBox.alert('编辑', '载入失败');
			},
			success : function() {
			//Ext.MessageBox.alert('编辑', '载入成功！');
			}
		});
	}else{
		Ext.MessageBox.alert("修改操作","请正确选择要修改的一项！");
	}
	
		
}	
		
var editPlant = function() {

	if (!editFormWin) {
		editFormWin = new Ext.Window( {
			el : 'topic-edit',
			layout : 'fit',
			width : 400,
			height : 300,
			closeAction : 'hide',
			plain : true,
			title : '窗口',
			items : editForm

		});
	}
	editFormWin.show('Edit');
};		
	/**
	* 删除数据类型
	*/
	var deletePlant = function() {
		var node = tree.getSelectionModel().getSelectedNode();
		if ( node!=null ){
			if(!node.leaf){
			Ext.MessageBox.alert('提示','您不能删除有子类的节点！');
			return;
			}
			Ext.MessageBox.confirm('确认删除', '你确认要删除这条数据吗？', function(btn) {
				if (btn == "yes") {
						var httpProxy = new Ext.data.HttpProxy({
							url:'../datatype/removeDatatype.action?datatype.datatypeId='+ node.id,
						});
						httpProxy.load();
						location.href="./datatype.action";
				}
			});
		} else {
			Ext.MessageBox.alert('删除操作', '请选择要删除的数据项！');
		}
	};
	

	
/**
* 数据类型管理页面初始化
*/
com.frontier.gdc.shishishuju.datatype.init = function(){

	Ext.QuickTips.init();
	
	com.frontier.gdc.shishishuju.datatype.initTree();
	  var itemPanel = new Ext.Panel({region:'center',title:'工作区',autoScroll:true,html:'<div id="panel-div" style="position: absolute;left: 200px;top: 160px; display: none;"></div>'});
	  itemPanel.addButton("新增",newPlant);
	  itemPanel.addButton("修改",updatePlant);
	  itemPanel.addButton("删除",deletePlant);
	/**
	* 数据类型管理页面布局
	*/
	new Ext.Viewport({
    layout: 'border',
    items: [ {
                    region:'west',
                    id:'west-panel',
                    title:'导航树菜单',
                    split:true,
                    width: 200,
                    
                    maxSize: 400,
                    collapsible: true,
                    margins:'0 0 0 5',
                    layout:'accordion',
                    layoutConfig:{
                        animate:true
                    },
                    items: [{
                        title:'数据类型管理',                        
                        border:false,
                        iconCls: 'tabs_sysinfor',
                        items:tree
                    }]
                },itemPanel ]
    });	
			
		
      
}



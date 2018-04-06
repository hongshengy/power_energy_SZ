/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 * ============================================================ 
 * 功能描述：代码分类管理
 * ============================================================ 
 * 更新时间：2009.08.11
 * 更新人：jiangxinying 
 * 更新内容：新建
 */
Ext.namespace("com.frontier.gdc.system.codeSort");
/**
* 新建窗口
* @type {Ext.Window}
*/
com.frontier.gdc.system.codeSort.newCodeSortWin = null;
/**
* 新建表单
* @type { Ext.FormPanel}
*/
com.frontier.gdc.system.codeSort.newCodeSortForm = null;
/**
* 编辑窗口
* @type {Ext.Window}
*/
com.frontier.gdc.system.codeSort.editCodeSortFormWin = null;
/**
* 编辑表单
* @type {Ext.FormPanel}
*/
com.frontier.gdc.system.codeSort.editCodeSortForm = null;
/**
* 树节点id
* @type {Number}
*/
var nodeId;
/**
* 树节点文本
* @type {Number}
*/
var nodeText;
/**
* 代码分类grid数据源
* @type {Ext.data.Store}
*/
com.frontier.gdc.system.codeSort.codeSortDs = null;
/**
* 代码分类管理树
* @type {Ext.tree.TreePanel}
*/
var tree;
/**
* 异步节点
* @type {Ext.tree.AsyncTreeNode}
*/
var root;
/**
* 节点
* @type 
*/
com.frontier.gdc.system.codeSort.node = null;
/**
* 类别信息集
* @type {Ext.grid.GridPanel}
*/
com.frontier.gdc.system.codeSort.codeSortGrid = null;

/**
* 下级类型
* @type {Number}
*/
var subtype = "codeSort";
/**
* 分页的每页数据量
* @type {Number}
*/
var pageSize = gdc.constant.pageSize;

/**
* 调度权属
* @type {Ext.data.SimpleStore}
*/
var validFlagStore = new Ext.data.SimpleStore({
	fields: ['val','tex'],
	data: [
		['','请选择'],
		['1','有效'],
		['0','无效']
	]
});
/**
* 供电区域维护类型
* @type {Ext.data.SimpleStore}
*/
var maintTypeStore = new Ext.data.SimpleStore({
	fields: ['val','tex'],
	data: [
		['','请选择'],
		['1','不可维护'],
		['2','可增加'],
		['3','可增删改']
	]
});
	
		
/**
* grid代码分类数据映射reader
* @type {Ext.data.JsonReader}
*/
var _jsonReader = new Ext.data.JsonReader( {
	root : 'list',
	totalProperty : 'totalCount',
	id : 'id',
	successProperty : '@success'
	}, [ {
		name : 'codeSortId'
	}, {
		name : 'codeSortName'
	}, {
		name : 'maintTypeCode'
	},{
		name : 'codeType'
	}, {
		name : 'validFlag'
	}, {
		name : 'effectDate'
	},{
		name : 'codeSortCode'
	},{
		name : 'vn'
	},{
		name : 'codeSortName2'
	},{
		name : 'maintTypeName'
	},{
		name : 'validFlagName'
	},{
		name : 'synchronizeFlag'
	}
]);
	
/**
* 代码分类表单reader
* @type {Ext.data.JsonReader}
*/
var jsonCodeSortFormReader = new Ext.data.JsonReader( {
	root : 'list',
	totalProperty : 'totalCount',
	id : 'id',
	successProperty : '@success'
	}, [  {
		name : 'codeSort.codeSortId',
		mapping : 'codeSortId'
	}, {
		name : 'codeSort.codeSortName',
		mapping : 'codeSortName'
	}, {
		name : 'codeSort.maintTypeCode',
		mapping : 'maintTypeCode'
	},{
		name : 'codeSort.vn',
		mapping : 'vn'
	}, {
		name : 'codeSort.codeType',
		mapping : 'codeType'
	}, {
		name : 'codeSort.validFlag',
		mapping : 'validFlag'
	},{
		name : 'codeSort.effectDate',
		mapping : 'effectDate'
	},{
		name : 'codeSort.codeSortCode',
		mapping : 'codeSortCode'
	},{
		name : 'codeSort.maintOrgNo',
		mapping : 'maintOrgNo'
	}
]);
	    
/**
*初始化代码分类树
*/
com.frontier.gdc.system.codeSort.initTree = function(){
	  var Tree = Ext.tree;
      tree = new Tree.TreePanel( {
      		id : 'menu-tree',
            //el : 'tree-div',
            autoScroll : true,
            animate : true,
            //enableDD : true,
            containerScroll : true,
            border:false,
            //height:Ext.lib.Dom.getViewHeight()-58,
	        rootVisible:false
           
      });
      
      var loader = new Tree.TreeLoader( {
      	// 这就是要动态载入数据的请求地址，这里请求时会提交一个参数为node的值，值为root即new Tree.AsyncTreeNode()对象的id值
          dataUrl : gdc.webContextRoot+'/codeSort/findCodeSortList.action' 
      });
      root = new Tree.AsyncTreeNode( {
            text : '代码类别树',
            expanded : true,
            draggable : false,
            id : '0',//默认的node值：?node=0
            loader : loader
      });
      
      loader.on("beforeload",function(th,node){
      	subtype = node.attributes.type;
       	if(subtype===undefined){
			subtype="codeSort";
		}
        loader.baseParams = {'type' : subtype};
      });
      
      tree.setRootNode(root);
//      tree.render();
//      root.expand();
      
	Ext.getCmp("menu-tree").on('click', function(node) {
    	subtype = node.attributes.type;	
    		com.frontier.gdc.system.codeSort.node = node;
			nodeId = node.id;
			nodeText=node.text;
			if("codeSort"==subtype){
				com.frontier.gdc.system.codeSort.codeSortDs.load({
					params : {
			           start : 0,
			           limit : pageSize,
			           'codeSort.codeType' : nodeId
   				   }
			});
			}
	});
};

/**
 * 初始化代码分类表
 */   
com.frontier.gdc.system.codeSort.initCodeSortGrid = function(){
	var httpPoxy = new Ext.data.HttpProxy({
		url:gdc.webContextRoot+'/codeSort/findCodeSortListForGrid.action'
	});
	
	com.frontier.gdc.system.codeSort.codeSortDs = new Ext.data.Store( {
		proxy : httpPoxy,
		reader : _jsonReader,
		"beforeload" : function(store) {
				store.removeAll();
				store.baseParams = {
					start : 0,
					limit : pageSize,
					'codeSort.codeType' : nodeId
				};
		}
	});
	
	function changeIdToName(value){
	    if (value == 'Y') {
	        return "是";
	    } else {
	        return "否";
	    }    
	}
		// ColumnModels
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel([sm,new Ext.grid.RowNumberer(), {
		id : 'id',
		header : '分类标识',
		dataIndex : 'codeSortId',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "分类名称",
		dataIndex : 'codeSortName',
		align : 'center',
		width:200,
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "维护类型",
		dataIndex : 'maintTypeName',
		renderer:changeMaintType,
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "分类编码",
		dataIndex : 'codeSortCode',
		align : 'center',
		width:150,
		renderer:Ext.util.Format.htmlEncode

	}, {
		hidden :true,
		header : "版本号",
		dataIndex : 'vn',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "上级类别",
		dataIndex : 'codeType',
		align : 'center',
		width:200,
		renderer:function(v,m,r){
			Ext.util.Format.htmlEncode
			return "["+r.data.codeType+"]"+r.data.codeSortName2
		}

	}, {
		header : "是否有效",
		dataIndex : 'validFlagName',
		renderer:changeValidFlag,
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

		
	}, {
		header : "生效日期",
		dataIndex : 'effectDate',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

		
	}, {
		header : "同步",
		dataIndex : 'synchronizeFlag',
		align : 'center',
		renderer:changeIdToName
	}]);
		
	// by default columns are sortable
	cm.defaultSortable = true;
	var ptb = new gdc.grid.PagingToolbar( {
		pageSize : pageSize,
		store : com.frontier.gdc.system.codeSort.codeSortDs
	});
	//创建代码分类grid
	com.frontier.gdc.system.codeSort.codeSortGrid = new Ext.grid.GridPanel( {
		//collapsible : true,// 是否可以展开
		animCollapse : false,// 展开时是否有动画效果
		//clicksToEdit : 4,
		title : '分类列表',
		//iconCls : 'icon-grid',
		store : com.frontier.gdc.system.codeSort.codeSortDs,
		sm : sm,
		cm : cm,
		layout : 'fit',
		autoShow : true,
		stripeRows: true,
		frame : true,
		loadMask : true,// 载入遮罩动画
		viewConfig : {
			forceFit : false
		},
		// 添加分页工具栏
		bbar :ptb

	});
//	com.frontier.gdc.system.codeSort.codeSortGrid.render();
//	com.frontier.gdc.system.codeSort.codeSortGrid.syncSize();
	//return com.frontier.gdc.system.codeSort.codeSortGrid;
}
     /**
	* 新建代码分类表单
	* @type {Ext.FormPanel}
	*/
	com.frontier.gdc.system.codeSort.newCodeSortForm = new gdc.FormPanel( {
		// collapsible : true,// 是否可以展开
		id : "addCodeSortForm",
		labelWidth : 100, // label settings here cascade unless overridden
		labelAlign : 'right',
		frame : true,
		bodyStyle : 'padding:5px 5px 0',
		width : 350,
		waitMsgTarget : true,
		defaults : {
			width : 230
		},
		defaultType : 'textfield',
		items : [ {
			fieldLabel : '上级分类',
			id : 'codeType',
			xtype : 'textfield',
			readOnly : true,
			name : 'codeSort.codeType',
			allowBlank : false,
			disabled:true
		}, new Ext.form.NumberField({
           fieldLabel: '分类标识',
           name: 'codeSort.codeSortId',//元素名称
           maxLength : 32,
		   maxLengthText : "输入的字符不能超过32位",
           allowBlank:false//不允许为空
          //blankText:'分类标识不能为空'//错误提示内容
        }),{
			id:'sortId',
			fieldLabel : '分类名称',
			name : 'codeSort.codeSortName',
			maxLength : 256,
			maxLengthText : "输入的字符不能超过256位",
			allowBlank : false
		},new gdc.code.ComboBox({
			emptyText : '请选择',
			allowBlank:false,
			fieldLabel : '维护类型',
			hiddenName : 'codeSort.maintTypeCode',
			triggerAction:'all',
			store:maintTypeStore,
			valueField:'val',
			displayField:'tex',
			mode:'local',
			forceSelection:true,
			resizable:true,
			editable:true
			//value:'1'
		}),{
			fieldLabel : '分类编码',
			name : 'codeSort.codeSortCode',
			maxLength : 32,
			maxLengthText : "输入的字符不能超过32位",
			allowBlank : false
		}/*,{
			hidden:true,
			fieldLabel : '代码版本',
			name : 'codeSort.vn',
			maxLength : 16,
			maxLengthText : "输入的字符不能超过16位",
			allowBlank : false
			
		}*/
		, new gdc.code.ComboBox({
			emptyText : '请选择',
			allowBlank:false,
			fieldLabel : '有效标识',
			hiddenName : 'codeSort.validFlag',
			triggerAction:'all',
			store:validFlagStore,
			displayField:'tex',
			valueField:'val',
			mode:'local',
			forceSelection:true,
			resizable:true,
			editable:true
			//value:'1'
		}),new gdc.component.DateField({
	          fieldLabel: '生效时间',
	          name: 'codeSort.effectDate',//元素名称
	          allowBlank:false,//不允许为空
	          format:'Y-m-d'
	          //blankText:'生效时间不能为空'//错误提示内容
         }),new Ext.form.Hidden({
			id : 'orgId',
			name : 'codeSort.maintOrgNo'
		}), new gdc.common.comboboxTree.comboxWithTree({
			fieldLabel : '所属单位名称',
			treeType : 'ORG',
			hiddenName : 'orgId',
			treeId : 'org2Id',
			id : 'orgName',
			allowBlank : false
		})
		]
	});
	
	
	
       
	/**
	* 编辑类别
	* @type {Ext.FormPanel}
	*/
    com.frontier.gdc.system.codeSort.editCodeSortForm = new gdc.FormPanel( {
		// collapsible : true,// 是否可以展开
    	id : "editCodeSortForm",
		labelWidth : 100, // label settings here cascade unless overridden
		labelAlign : 'right',
		frame : true,
		bodyStyle : 'padding:5px 5px 0',
		width : 350,
		waitMsgTarget : true,
		reader : jsonCodeSortFormReader,
		defaults : {
			width : 230
		},
		defaultType : 'textfield',
		items : [ {
			id:'codeSortName2',
			fieldLabel : '上级分类',
			readOnly : true,
			disabled:true,
			//name : 'codeSort.codeType',
			allowBlank : false
	},new Ext.form.Hidden({
			name:'codeSort.codeType'
	}),{
			fieldLabel : '分类名称',
			name : 'codeSort.codeSortName',
			maxLength : 256,
			maxLengthText : "输入的字符不能超过256位",
			allowBlank : false
		},new gdc.code.ComboBox({
			emptyText : '请选择',
			allowBlank:false,
			fieldLabel : '维护类型',
			hiddenName : 'codeSort.maintTypeCode',
			triggerAction:'all',
			store:maintTypeStore,
			valueField:'val',
			displayField:'tex',
			mode:'local',
			forceSelection:true,
			resizable:true,
			editable:true
			//value:'1'
		}),{
			fieldLabel : '分类编码',
			name : 'codeSort.codeSortCode',
			maxLength : 32,
			maxLengthText : "输入的字符不能超过32位",
			allowBlank : false
		},new Ext.form.Hidden({
			fieldLabel : '代码版本',
			name : 'codeSort.vn',
			maxLength : 32,
			maxLengthText : "输入的字符不能超过32位",
			allowBlank : false
		}), new gdc.code.ComboBox({
			emptyText : '请选择',
			allowBlank:false,
			fieldLabel : '有效标识',
			hiddenName : 'codeSort.validFlag',
			triggerAction:'all',
			store:validFlagStore,
			displayField:'tex',
			valueField:'val',
			mode:'local',
			forceSelection:true,
			resizable:true,
			editable:true
			//value:'1'
		}),new gdc.component.DateField({
                  fieldLabel: '生效时间',
                  name: 'codeSort.effectDate',//元素名称
                  allowBlank:false,//不允许为空
                  format:'Y-m-d'
                  //blankText:'生效时间不能为空'//错误提示内容
         }),{
			inputType : 'hidden',
			fieldLabel : '类别标识',
			name : 'codeSort.codeSortId'
		},{
			inputType : 'hidden',
			fieldLabel : '上级类别标识',
			name : 'codeSort.codeType'
		},new Ext.form.Hidden({
			id : 'orgIdOfEdit',
			name : 'codeSort.maintOrgNo'
		}), new gdc.common.comboboxTree.comboxWithTree({
			fieldLabel : '所属单位名称',
			treeType : 'ORG',
			hiddenName : 'orgIdOfEdit',
			treeId : 'org2IdOfEdit',
			id : 'orgNameOfEdit',
			allowBlank : false
		})],
		tbar: [{
				text : '保存',
				iconCls: 'save',
				//bizCode:'save',
				handler : function() {
				if (com.frontier.gdc.system.codeSort.editCodeSortForm.form.isValid(com.frontier.gdc.system.codeSort.editCodeSortForm)) {
					com.frontier.gdc.system.codeSort.editCodeSortForm.form.submit( {
						url : gdc.webContextRoot+'/codeSort/updateCodeSort.action',
						success : function(form, action) {
							Appframe.viewinfdlg.right.show("保存修改成功！",true);
							root.reload();
							com.frontier.gdc.system.codeSort.codeSortDs.reload();
							com.frontier.gdc.system.codeSort.editCodeSortFormWin.hide();
						},
						
						waitMsg : '正在保存数据，稍后...'
					});
					
				}
//				} else {
//					Appframe.viewinfdlg.warning.show("请填写完成再提交!",true);
//				}
			}
				}/*, {
				text : '重置',
				iconCls: 'reset',
				handler : function() {
				com.frontier.gdc.system.codeSort.editCodeSortForm.form.load( {
					url : gdc.webContextRoot+'/codeSort/findCodeSortById.action?codeSort.codeSortId='+nodeId
				});
			}
			}*/]
		});
	
  /**
  * 新建代码类别函数
  */
	var newCodeSort = function() {
		if (!com.frontier.gdc.system.codeSort.newCodeSortWin) {
			com.frontier.gdc.system.codeSort.newCodeSortWin = new Ext.Window( {
				layout : 'fit',
				width : 400,
				height : 300,
				closeAction : 'hide',
				plain : true,
				modal:true,
				title : '新建代码分类',
				items : com.frontier.gdc.system.codeSort.newCodeSortForm,
				tbar: [{
				text : '保存',
				iconCls: 'save',
				//bizCode:'save',
				handler : function() {
//				var fatherType2= com.frontier.gdc.system.codeSort.newCodeSortForm.findById("codeType");
//				fatherType2.setValue(nodeId);
//				var name = Ext.get("sortId").getValue();
//				var sm = Ext.getCmp('menu-tree').getSelectionModel();
//				var node = sm.getSelectedNode();
//				var nodeId = node.id;
//				var childNodes = node.childNodes;
//				var flag = true;			
//				for(var i=0;i<childNodes.length;i++){
//					if(name==childNodes[i].text){
//						flag = false;
//					}
//				}
//				if(!flag){
//					Ext.Msg.alert("提示","同一类别下节点的名字不能相同！！！");
//					return ;
//				}
				var vn = 0;
				if (com.frontier.gdc.system.codeSort.newCodeSortForm.form.isValid(com.frontier.gdc.system.codeSort.newCodeSortForm)) {
					
					com.frontier.gdc.system.codeSort.newCodeSortForm.form.submit( {
						url : gdc.webContextRoot+'/codeSort/createCodeSort.action?codeSort.codeType='+nodeId+'&codeSort.vn='+vn,
						success : function(form, action) {
							Appframe.viewinfdlg.right.show("添加分类成功！",true);
							root.reload();
							com.frontier.gdc.system.codeSort.codeSortDs.reload();
							com.frontier.gdc.system.codeSort.newCodeSortWin.hide();
							$("#addCodeSortForm input").val("");
							
						},
						waitMsg : '正在保存数据，稍后...'
					});
					
				}
//				else {
//						Appframe.viewinfdlg.warning.show("请填写完成再提交!",true);
//				}
			}
				}/*, {
				text : '重置',
				iconCls: 'reset',
				handler : function() {
					com.frontier.gdc.system.codeSort.newCodeSortForm.form.reset();
				}
			}*/]
	
		});
	}
		com.frontier.gdc.system.codeSort.newCodeSortWin.show('New');
	}
 
	/**
	* 准备修改代码分类
	*/
	var updateCodeSort = function() {
		loadCodeSortFormData(com.frontier.gdc.system.codeSort.codeSortGrid);
	};
	/**
	* 载入被选择的代码分类数据行的表单数据
	* @param {Ext.grid.GridPanel} grid 厂站信息集
	*/
	var loadCodeSortFormData = function() {
				editCodeSort();
				com.frontier.gdc.system.codeSort.editCodeSortForm.form.load( {
					url : gdc.webContextRoot+'/codeSort/findCodeSortById.action?codeSort.codeSortId='+nodeId,
					waitMsg : '正在载入数据...',
//					failure : function() {
//						Ext.MessageBox.alert('编辑', '载入失败');
//					},
					success : function(options, success, response) {
						setComboxTreeValue('orgIdOfEdit','orgNameOfEdit', 'ORG', response);
						//Ext.MessageBox.alert('编辑', '载入成功！');
					}

				});
	}	

	/**
	 * 编辑代码类别窗口
	 */		
	var editCodeSort = function() {
	
		if (!com.frontier.gdc.system.codeSort.editCodeSortFormWin) {
			com.frontier.gdc.system.codeSort.editCodeSortFormWin = new Ext.Window( {
				layout : 'fit',
				width : 400,
				height : 300,
				closeAction : 'hide',
				plain : true,
				modal:true,
				title : '编辑类别',
				items : com.frontier.gdc.system.codeSort.editCodeSortForm
	
			});
		}
		com.frontier.gdc.system.codeSort.editCodeSortFormWin.show('Edit');
	};
	
	/**
	 * 导出Excel(CodeSort)
	 */
	
	var createExcelFormCodeSort = function(){
		var sm = Ext.getCmp('menu-tree').getSelectionModel();
		var node = sm.getSelectedNode();
		if(node != null){
			var url = gdc.webContextRoot+'/codeSort/exportExcelCodeSortList.action?codeSort.codeSortId='+nodeId;
			var excelFormCodeSort = new Ext.form.FormPanel({ 
		  		html:'<iframe src="'+url+'" width="100%" height="400" frameborder="0" scrolling="auto"></iframe>',
		  		labelAlign: 'right', 
		  		labelWidth: 100,
		  		renderTo:Ext.getBody(),
		  		frame:true
				});
		}else {
		
		Appframe.viewinfdlg.warning.show("您还没有选择！",false);
		return;
		
		}
	}
	/**
	 * 根据厂站状态编号显示状态描述
	 * @param {Ext.String} value  状态编号
	 */		
	var changeValidFlag = function (value){
	    if (value == '1') {
	        return "有效";
	    }else {
	    	return "无效";
	    }  
	}
	
	
	/**
	 * 代码分类维护状态
	 * @param {Ext.String} value  状态编号
	 */		
	var changeMaintType = function (value){
	    if (value == '1') {
	        return "不可维护";
	    } else if(value == '2') {
	        return "可增加";
	    }  else {
	    	return "可增删改";
	    }  
	}	
	/**
	* 检查维护权限
	*/	
	var checkPurview = function(node,opt){
		var getCodeTypex = function(node){
		 	 if("subcode"==node.attributes.type){
		 	 	return getCodeTypex(node.parentNode);
		 	 }else{
		 	 	return node.attributes.typex;
		 	 }
		};
		var typex = "";
		var subtype = node.attributes.type;
		
		if("codeSort"==subtype||"code"==subtype){
			typex = node.attributes.typex;
	
		}else if("subcode"==subtype){
			typex = getCodeTypex(node);
		}
		if(typex==1){
		 	return false;
		}else if(typex==2){
			if("create"==opt){
				return true;
			}else{
				return false;
			}
		}else if(typex==3){
			return true;
		}
		
	}
/**
* 代码管理页面初始化
*/
com.frontier.gdc.system.codeSort.init = function(){

	Ext.QuickTips.init();
	
	com.frontier.gdc.system.codeSort.initTree();
	com.frontier.gdc.system.codeSort.initCodeSortGrid();
	//itemPanel.add(grid);  
	//itemPanel.doLayout();        
	/**
	* 厂站管理页面布局
	*/
	var codeSortPanel = new Ext.Panel({
    layout: 'border',
    items: [{
		tbar : [ {
			id : 'New',
			text : ' 新增  ',
			tooltip : '新增',
			iconCls : 'add',
			bizCode:'add',
			handler:function() {
					Ext.getCmp('addCodeSortForm').form.reset();
					 //var sm = Ext.getCmp('menu-tree').getSelectionModel();
					 //var node = sm.getSelectedNode();
					 var id = 0;
					if(com.frontier.gdc.system.codeSort.node==null|| !com.frontier.gdc.system.codeSort.node.id > 0){
						Appframe.viewinfdlg.warning.show("您还没有选择！",false);
						return;
					}
					//node = node.parentNode;
//					if(!checkPurview(node,'create')){
//						Ext.Msg.alert('提示','该对象不可新增！！！');
//						return;
//					}
		
					subtype = com.frontier.gdc.system.codeSort.node.attributes.type;
					
					if("codeSort"==subtype){
						nodeId = com.frontier.gdc.system.codeSort.node.id;
						nodeText = com.frontier.gdc.system.codeSort.node.text;
						var fatherType=com.frontier.gdc.system.codeSort.newCodeSortForm.findById("codeType");
						fatherType.setValue(nodeText);
						newCodeSort();
					}			
				}
			}, '-', {
			id : 'Edit',
			text : '修改',
			tooltip : '修改',
			iconCls : 'edit',
			bizCode:'edit',
			handler : function() {
					//Ext.getCmp('editCodeSortForm').form.reset();
					//var sm = Ext.getCmp('menu-tree').getSelectionModel();
					//node = sm.getSelectedNode();
					var id = 0;
//					if(node == null || !node.id > 0){
//						Ext.MessageBox.alert('提示','您还没有选择！');
//						return;
//					}
//					subtype = node.attributes.type;
//						if(!checkPurview(node,'edit')){
//							Ext.Msg.alert('提示','该对象不可修改！！！');
//							return;
//						}else{
				var _record = com.frontier.gdc.system.codeSort.codeSortGrid.getSelectionModel().getSelected();
				if(! _record){
					Appframe.viewinfdlg.warning.show("您还没有选择！",false);
					return;
				}
				//subtype = node.attributes.type;
				if (_record) {
					var rows = com.frontier.gdc.system.codeSort.codeSortGrid.getSelections();
					var codeSortId = rows[0].get("codeSortId");
					if (rows.length > 1) {
						Appframe.viewinfdlg.warning.show("只能选择一条进行修改！",false);
						return false;
					}
					var synchronizeFlag = rows[0].get("synchronizeFlag");
					if(synchronizeFlag=='Y'){
						Appframe.viewinfdlg.warning.show("同步数据不能修改！",false);
						return false;
					}
					
					nodeId = codeSortId;
					nodeText = nodeText;
					var fatherType3=com.frontier.gdc.system.codeSort.editCodeSortForm.findById("codeSortName2");
					if(com.frontier.gdc.system.codeSort.node.parentNode.id=='0'){
						fatherType3.setValue(nodeText);
					}else{
						fatherType3.setValue(com.frontier.gdc.system.codeSort.node.parentNode.text);
					}
					
					updateCodeSort();
				}
				}
			}, '-', {
				text : '删除',
				tooltip : '删除',
				iconCls : 'remove',
				bizCode:'remove',
				handler : function() {
					//var sm = Ext.getCmp('menu-tree').getSelectionModel();
					//var node = sm.getSelectedNode();
					var _record = com.frontier.gdc.system.codeSort.codeSortGrid.getSelectionModel().getSelected();
					var id = 0;
					if(! _record){
						Appframe.viewinfdlg.warning.show("您还没有选择！",false);
						return;
					}
					//subtype = node.attributes.type;
					if (_record) {
						var rows = com.frontier.gdc.system.codeSort.codeSortGrid.getSelections();
						var codeSortId = rows[0].get("codeSortId");
						if (rows.length > 1) {
							Appframe.viewinfdlg.warning.show("只能选择一条进行删除！",false);
							return false;
						}
						var synchronizeFlag = rows[0].get("synchronizeFlag");
						if(synchronizeFlag=='Y'){
							Appframe.viewinfdlg.warning.show("同步数据不能删除！",false);
							return false;
						}
					nodeId = codeSortId;
					Ext.Msg.confirm('确认删除', '您确认要删除该代码分类吗？', function(btn) {
						if (btn == 'yes') {
								Ext.Ajax.request({
								url:gdc.webContextRoot+'/codeSort/deleteCodeSort.action',
								params : {"codeSort.codeSortId" : nodeId},
								success : function(result,request) {
									var resl = result.responseText;
									var tem = eval('('+resl+')');
									if(tem.success==true){
										Appframe.viewinfdlg.right.show("删除成功！",true);
										root.reload();
										com.frontier.gdc.system.codeSort.codeSortDs.reload();
									}
								},
								failure : function(form, action) {
									Appframe.viewinfdlg.error.show("删除失败！",false);
								},
								waitMsg : '正在删除数据，稍后...'
							})
						}
					});
					}
				}		
					
			}, 
			 '-', {
			id : 'Export',
			text : ' 导出Excel  ',
			tooltip : '导出Excel',
			iconCls : 'export_excel',
			bizCode:'export_excel',
			handler:function() {
					 createExcelFormCodeSort();
			}
			}
			],
    			    region:"north",			 
    			    height:25			  
    		},{
                    region:'west',
                    id:'west-panel',
                    title:'代码分类导航',
                    split:true,
                    width: 200,
                    autoScroll : true,
                    tools : [{
						id : 'refresh',
						on : {
							click : function() {
								
								root.reload();
							}
						}
					}],
                    maxSize: 400,
                    collapsible: true,
                    margins:'0 0 0 5',
                    layout : 'accordion',
                    layoutConfig:{
                        animate:true
                    },
                    layout:'fit',
                    items:tree
                }, {
			        region: 'center',
			        layout: 'fit',
			        autoScroll:true,
			        items:com.frontier.gdc.system.codeSort.codeSortGrid
			        	
        }]
    });	
     return codeSortPanel;
    
    
}



Ext.namespace("com.frontier.gdc.system.marketToCollRela");
	
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
	
	/**
	* 树节点id
	* @type {Number}
	*/
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
	var _jsonReader = new Ext.data.JsonReader({
		root : 'list',
		totalProperty : 'totalCount',
		id : 'id',
		successProperty : '@success'
	}, [{ 
		name : 'relaId' 
	}, {
		name : 'marketOrgNo'
	}, {
		name : 'marketOrgName'
	},{
		name : 'collOrgName'
	}]);
	

/**
*初始化业务组织树
*
*/
com.frontier.gdc.system.marketToCollRela.initTree = function(){
	  var rootVisible = false;
	  if(gdc.currentRoleId==0){
	  		com.frontier.gdc.system.marketToCollRela.rootVisible = true;	
	  }
	  var Tree = Ext.tree;
      tree = new Tree.TreePanel({
      		id : 'menu-tree',
			autoScroll : true,
			animate : true,
			border : false,
			rootVisible : com.frontier.gdc.system.marketToCollRela.rootVisible,	
	        listeners:{
				"click": function(node,e) {
							com.frontier.gdc.system.marketToCollRela.node = node;
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
      var root = new Tree.AsyncTreeNode({
            text : '业务组织树',
            expanded : true,
            draggable : false,
            id : '0',//默认的node值：?node=0 
            loader : new Tree.TreeLoader( {
                  dataUrl : gdc.webContextRoot+'/specialOrgRela/searchSpecialOrgTreeForAueic.action' //这就是要动态载入数据的请求地址，这里请求时会提交一个参数为node的值，值为root即new Tree.AsyncTreeNode()对象的id值
            	  ,listeners:{
            	  	'beforeload' : function(loader, node) {
									 this.baseParams.spOrgId = currUser['spOrgId'];//统一框架角色组织ID,by:guojinhui2009/10/19
									 if (!gdc.isPagePurview) {
										 this.baseParams.curRoleID = '';
									 } else {
										 this.baseParams.curRoleID = gdc.currentRoleId;//增加传递当前用户所选的角色ID，by：guojinhui//
									 }
								 }
				}
            })
      });
      tree.setRootNode(root);
};

function loadCallBack(store,options){
	store.baseParams = { 'specialOrgId' : nodeId};
}

/**
* 初始化数据集合信息grid布局
*/
com.frontier.gdc.system.marketToCollRela.initGrid = function(){
		ds = new Ext.data.Store({
			url : gdc.webContextRoot+'/specialOrgRela/querySpecialOrgList.action',
			reader : _jsonReader,
			listeners:{
				"beforeload": loadCallBack 
			}			
		});
		//ColumnModels
		var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
		var cm = new Ext.grid.ColumnModel([sm,new Ext.grid.RowNumberer(),{
			 header : '关联id',
			 dataIndex : 'relaId',
			 hidden : true
		  }
		, {
			header : '营销系统供电单位',
			dataIndex : 'marketOrgName',
			align : 'center',
			width : 208,
			renderer:Ext.util.Format.htmlEncode
		}
		, {
			header : '关联的采集系统供电单位',
			dataIndex : 'collOrgName',
			align : 'center',
			width : 208,
			renderer:Ext.util.Format.htmlEncode
		}
	    ]);
		// by default columns are sortable
		cm.defaultSortable = true;
		var ptb = new gdc.grid.PagingToolbar({pageSize : pageSize,store: ds});

		grid = new Ext.grid.GridPanel({
			title : '业务组织列表',
			region: 'center',
			store : ds,
			cm : cm,
			sm : sm,
			stripeRows: true,
			border:false,
			layout : 'fit',
			width : 1000,
			height : 610,
			frame : true,
			autoShow : true,
			loadMask : true,//载入遮罩动画
			viewConfig : {
				forceFit : false
			},
			bbar :ptb,
			tbar : [{
				id : 'New',
				text : '关联',
				tooltip : '关联',
				iconCls : 'edit',
				bizCode:'edit',
				handler : function() {
				    com.frontier.gdc.system.marketToCollRela.relateOrg();
				}
			}, '-', {
				id : 'Edit',
				text : '取消关联',
				tooltip : '取消关联',
				iconCls : 'remove',
				bizCode:'remove',
				handler : function() {
					com.frontier.gdc.system.marketToCollRela.DelRelateOrg();
				}
			}]

		});
		return grid;
}

com.frontier.gdc.system	.marketToCollRela.relateOrg = function(){
       var _record = grid.getSelectionModel().getSelected();
	   if (!_record) {
			Appframe.viewinfdlg.warning.show('请选择要关联的营销系统供电单位！');
	   } else {
			var i = 0;
			var selOrg = "";
			var selArr = [];
			var rows = grid.getSelections();
			for(i=0;i<rows.length;i++){
			   selArr.push(rows[i].get("marketOrgNo"));
			   if(rows[i].get("relaId")){
			       Appframe.viewinfdlg.warning.show('请选择未关联的营销系统供电单位！');
			       return;
			   }
			}
			var selOrg = selArr.join(",");
			if(com.frontier.gdc.system.marketToCollRela.popTreeWindow){
				com.frontier.gdc.system.marketToCollRela.popTreeWindow.close();
			}
			com.frontier.gdc.system.marketToCollRela.popTreeWindow = new Ext.Window({
				title : '采集系统业务组织机构树',
				width : 300,
				height : 500,
				closeAction : 'hide',
				plain : false,
				modal:true,
				layout : 'fit',
				bbar: [{
					text : '确定',
					iconCls: 'save',
					handler : function() {
						com.frontier.gdc.system.marketToCollRela.saveOrgRela(selOrg,com.frontier.gdc.system.marketToCollRela.selCollOrgNo);
					}
				},'-',{
					text : '取消',
					iconCls: 'remove',
					handler : function() {
						com.frontier.gdc.system.marketToCollRela.popTreeWindow.close();
					}
				}],
				items:com.frontier.gdc.system.marketToCollRela.createPopTree()
			});
			com.frontier.gdc.system.marketToCollRela.popTreeWindow.show();
	   }
}

/**
 * 取消关联
 */
com.frontier.gdc.system.marketToCollRela.DelRelateOrg= function(){
       var _record = grid.getSelectionModel().getSelected();
	   if (!_record) {
			Appframe.viewinfdlg.warning.show('请选择要取消关联的营销系统供电单位！');
	   } else {
			var i = 0;
			var selOrg = "";
			var selArr = [];
			var rows = grid.getSelections();
			for(i=0;i<rows.length;i++){
				var t = rows[i].get("relaId");
				if(t){
				   selArr.push(t);
				}
			}
			selOrg = selArr.join(",");
			if(!selOrg){
			    Appframe.viewinfdlg.warning.show('请选择已经关联的营销系统供电单位！');
			    return;
			}
			Ext.MessageBox.confirm('提示', '你确认要取消关联吗？', function(btn) {
				 if (btn == "yes") {
					 Ext.Ajax.request({
						url: gdc.webContextRoot + 'specialOrgRela/delOrgRela.action',
						waitMsg : '正在取消关联，稍后...',
						params: {
							'strRelaId' : selOrg 
						},
						success: function(response, config) 
						{
							var info = jsonDecode(response.responseText);
							Ext.MessageBox.alert('提示',info.msg);
							ds.reload();
						},
						faliure:function(){
							Ext.MessageBox.alert('提示','取消关联单位失败');
							return;
						}
				    });
				 }
			});		    
	  }
}

/**
* 创建采集系统弹出树
*/
com.frontier.gdc.system.marketToCollRela.createPopTree = function(){
	  var Tree = Ext.tree;
      var collTree = new Tree.TreePanel({
      		id : 'pop-tree',
			autoScroll : true,
			animate : true,
			border : false,
			rootVisible : false,
	        listeners:{
				"click": function(node,e) {
						 com.frontier.gdc.system.marketToCollRela.selCollOrgNo = node.id;
				}
			}
           
      });
      var root = new Tree.AsyncTreeNode({
            text : '采集系统组织树',
            expanded : true,
            draggable : false,
            id : '0',
            loader : new Tree.TreeLoader({
                 dataUrl : gdc.webContextRoot+'/specialOrgRela/queryCollOrgList.action' 
            })
      });
      collTree.setRootNode(root);
      return collTree;
}

/**
* 营销系统和采集系统单位关系保存
*/
com.frontier.gdc.system.marketToCollRela.saveOrgRela = function(yxOrgNos,cjOrgNo){
    if(!cjOrgNo){
        Appframe.viewinfdlg.warning.show('请选择采集系统单位！');
        return;
    }
    Ext.Ajax.request({
		url: gdc.webContextRoot + 'specialOrgRela/saveOrgRela.action',
		params: {
			'yxOrgNos': yxOrgNos,
			'cjOrgNo': cjOrgNo
		},
		success: function(response, config) 
		{
			var info = jsonDecode(response.responseText);
			com.frontier.gdc.system.marketToCollRela.popTreeWindow.close();
			ds.reload();
			//Ext.MessageBox.alert('提示',info.msg);
		},
		faliure:function(){
			Ext.MessageBox.alert('提示','关联单位失败');
			return;
		},
		waitMsg : '正在关联，稍后...' 
    });
}

function jsonDecode(data){
    return new Function("return " + data + ";")();
}

/**
* 主页面初始化
*/
com.frontier.gdc.system.marketToCollRela.newMainPanel = function(){
	Ext.QuickTips.init();
	com.frontier.gdc.system.marketToCollRela.initTree();
	com.frontier.gdc.system.marketToCollRela.initGrid();
	/**
	* 业务组织管理页面布局
	*/
	var mainPanelInit = new Ext.Panel({
     	bodyStyle:'padding:0px 0px 0',
		layout : 'fit',
		items:[{
			border : false,
		    layout : 'border',
			items : [{
                    region:'west',
                    id:'west-panel',
                    title:'营销系统业务组织机构树',
                    split:true,
                    width: 300,
                    layout: 'fit',
                    maxSize: 400,
                    collapsible: true,
                    items:tree
                }, {
		            region : 'center',
		            layout : 'fit',
		            items : grid 
		        }]
			}]
		
    });
    return mainPanelInit;
}
	

/**
 * 本功能的功能参数，用于打开本功能框架使用
 * @type 
 */
com.frontier.gdc.system.marketToCollRela.mdlCfg={
		mustRole:false,
		funcBtnControl:true
};



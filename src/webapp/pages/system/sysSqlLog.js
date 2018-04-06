/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 * ============================================================ 
 * 功能描述：系统sql日志管理
 * ============================================================ 
 */
Ext.namespace("com.frontier.gdc.system.sysSqlLog");
/**
 * 日志id
 * @type 
 */
com.frontier.gdc.system.sysSqlLog.logId = null;

/**
 * 分页的每页数据量
 * @type {Number}
 */
com.frontier.gdc.system.sysSqlLog.pageSize = 30;

/**
 * 系统sql日志
 * @return {Ext.data.JsonReader}
 */
com.frontier.gdc.system.sysSqlLog.sslReader = new Ext.data.JsonReader(
			{
				root : 'list',
				id : 'id',
				totalProperty : 'totalCount',
				successProperty : '@success'
			}, [{
				name : 'id',
				mapping : 'id'
			},{
				name : 'compName',
				mapping : 'compName'
			},{
				name : 'methodName',
				mapping : 'methodName'
			},{
				name : 'logTime',
				mapping : 'logTime'
			},{
				name : 'content',
				mapping : 'content'
			},{
				name : 'sqlContent',
				mapping : 'sqlContent'
			},{
				name : 'sqlPara',
				mapping : 'sqlPara'
			},{
				name : 'specialorgName',
				mapping : 'specialorgName'
			},{
				name : 'userName',
				mapping : 'userName'
			},{
				name : 'loginIp',
				mapping : 'loginIp'
			}]
);


/**
 * 系统sql日志明细
 * @return {Ext.data.JsonReader}
 */
com.frontier.gdc.system.sysSqlLog.ssdReader = new Ext.data.JsonReader(
			{
				root : 'list',
				id : 'id',
				totalProperty : 'totalCount',
				successProperty : '@success'
			}, [
			{
				name : 'logId',
				mapping : 'logId'
			},{
				name : 'tableName',
				mapping : 'tableName'
			},{
				name : 'colName',
				mapping : 'colName'
			},{
				name : 'orgValue',
				mapping : 'orgValue'
			},{
				name : 'curValue',
				mapping : 'curValue'
			}]
);


/**
 * 系统sql日志DataStore
 * @type {Ext.data.Store}
 */
com.frontier.gdc.system.sysSqlLog.sslStore = new Ext.data.Store({
	url : gdc.webContextRoot+ '/systemLog/findSysSqlLogList.action',
	reader : com.frontier.gdc.system.sysSqlLog.sslReader,
	listeners : {
		"beforeload" : function(store) {
			if(store!=null){
				store.removeAll();			
			}
		}
	}
}); 
/**
 * 系统sql日志明细数据源
 */
com.frontier.gdc.system.sysSqlLog.ssdStore = new Ext.data.Store({
	url : gdc.webContextRoot+ '/systemLog/findSysSqlDetailList.action',
	reader : com.frontier.gdc.system.sysSqlLog.ssdReader,
	listeners : {
		"beforeload" : function(store) {
			if(store!=null){
				store.removeAll();
				store.baseParams = {
					'logId' : com.frontier.gdc.system.sysSqlLog.logId
				};				
			}
		}
	}
}); 

//单击listGrid中一行触发执行
		function rowclick(grid, rowIndex) {
			var _record = com.frontier.gdc.system.sysSqlLog.listGrid.getSelectionModel().getSelected();
			if (_record){
				var rows = com.frontier.gdc.system.sysSqlLog.listGrid.getSelections();
				var logId = rows[0].get("id");
				com.frontier.gdc.system.sysSqlLog.logId = logId;
				com.frontier.gdc.system.sysSqlLog.ssdStore.load();
			}
		}		
/**
 * 基本信息grid布局
 */
com.frontier.gdc.system.sysSqlLog.listGridInit = function(){
	var sm_l = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm_l = new Ext.grid.ColumnModel([
	            sm_l,
	            //new Ext.grid.RowNumberer(),
		        {
					id : 'id',
					header: "id",
					sortable: false,
					dataIndex: 'id',
					hidden : true
				}, {
					header: "组件名称",
					sortable: false,
					dataIndex: 'compName',
					width:285,
					align : 'center',
					hidden : true
					//renderer:Ext.util.Format.htmlEncode,
				}, {
					header: "方法名称",
					width: 120,
					sortable: false,
					dataIndex: 'methodName',
					//renderer:Ext.util.Format.htmlEncode,
					hidden : true,
					align : 'center'
				}, {
					header: "日志信息",
					width: 90,
					sortable: false,
					dataIndex: 'content',
					//renderer:Ext.util.Format.htmlEncode,
					align : 'center'
				}, {
					header: "日志时间",
					sortable: false,
					dataIndex: 'logTime',
					align : 'center'
					//renderer:Ext.util.Format.htmlEncode,
					//hidden : true
				}, {
					header: "SQL",
					sortable: false,
					dataIndex: 'sqlContent',
					align : 'center',
					renderer:function(value){
						return '<div title=\''+value+'\'>'+value+'</div>';
					}
				}, {
					header: "SQL参数",
					sortable: false,
					dataIndex: 'sqlPara',
					align : 'center',
					renderer:function(value){
						return '<div title=\''+value+'\'>'+value+'</div>';
					}
				},{
					header : '单位名称',
					dataIndex : 'specialorgName',
					width: 120,
					sortable: true,
					//renderer:Ext.util.Format.htmlEncode,
					align : 'center'
				},{
					header : '用户名',
					dataIndex : 'userName',
					width: 120,
					sortable: false,
					//renderer:Ext.util.Format.htmlEncode,
					align : 'center'
				},{
					header : '登录IP',
					dataIndex : 'loginIp',
					width: 150,
					sortable: false,
					//renderer:Ext.util.Format.htmlEncode,
					align : 'center'
				}]);
		
		var ptb_l = new gdc.grid.PagingToolbar({
			pageSize : com.frontier.gdc.system.sysSqlLog.pageSize,
	   		store : com.frontier.gdc.system.sysSqlLog.sslStore
   		});
	   
		com.frontier.gdc.system.sysSqlLog.listGrid = new Ext.grid.GridPanel({
			//layout : 'fit',
			region : 'center',
			store : com.frontier.gdc.system.sysSqlLog.sslStore,
			title : '系统sql日志列表',
			cm : cm_l,
			sm : sm_l,	       
			//stripeRows: true,
			//border:false,
			//autoScroll : true, 
		 	//layout : 'fit',
			autoShow : true,
			viewConfig : {
				forceFit : true
			},
			height : 30,
			collapsible:false,
			//autowidth : true,
			//width : 1200,
			bbar : ptb_l
		});
			
		
		com.frontier.gdc.system.sysSqlLog.listGrid.addListener('rowclick',rowclick);
		
		return com.frontier.gdc.system.sysSqlLog.listGrid;
}


/**
 * 系统sql日志明细，数据grid布局
 */
com.frontier.gdc.system.sysSqlLog.detailsGridInit = function(){
	var ptb_2 = new gdc.grid.PagingToolbar({
			pageSize : com.frontier.gdc.system.sysSqlLog.pageSize,
	   		store : com.frontier.gdc.system.sysSqlLog.sslStore
   	});
	var sm_d = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm_d = new Ext.grid.ColumnModel([
	            sm_d,
	            //new Ext.grid.RowNumberer(),
		     	{
					id : 'id',
					header: "id",
					sortable: false,
					dataIndex: 'id',
					//renderer:Ext.util.Format.htmlEncode,
					hidden : true
				},{
					id : 'logId',
					header: "日志id",
					sortable: false,
					dataIndex: 'logId',
					align : 'center'
					//renderer:Ext.util.Format.htmlEncode
					//hidden : true
				},{
					header: "表名",
					width: 120,
					sortable: false,
					dataIndex: 'tableName',
					//renderer:Ext.util.Format.htmlEncode,
					align : 'center'
				}, {
					header: "列名",
					sortable: false,
					dataIndex: 'colName',
					align : 'center'
					//renderer:Ext.util.Format.htmlEncode
					//hidden : true
				},{
					header: "原始值",
					width: 90,
					sortable: false,
					dataIndex: 'orgValue',
					//renderer:Ext.util.Format.htmlEncode,
					align : 'center',
					renderer:function(value){
						return '<div title=\''+value+'\'>'+value+'</div>';
					}
				},{
					header : '当前值',
					dataIndex : 'curValue',
					width: 90,
					sortable: false,
					//renderer:Ext.util.Format.htmlEncode,
					align : 'center',
					renderer:function(value){
						return '<div title=\''+value+'\'>'+value+'</div>';
					}
				}
		]);
       
        com.frontier.gdc.system.sysSqlLog.detailsGrid = new Ext.grid.GridPanel({
			region : 'south',
			store : com.frontier.gdc.system.sysSqlLog.ssdStore,
			title : '系统sql日志明细',
			cm : cm_d,
			sm : sm_d,	       
			//stripeRows: true,
			border:false,
			//autoScroll : true, 
			//autoShow : true,
			viewConfig : {
				forceFit : true
			},
			height : 200
			//width : 1200,
			,bbar : ptb_2
		});
	return com.frontier.gdc.system.sysSqlLog.detailsGrid;

}

/**
 * DetailsGrid的Panel的布局
 */
com.frontier.gdc.system.sysSqlLog.detailsGridInitView = function(){
	var itemPanelVar = {
		region : 'south',
		layout : 'fit',
		border : false,
		collapsible  :true,
		split : true,
		height: 250
	};
	
	itemPanelVar['items']=[com.frontier.gdc.system.sysSqlLog.detailsGridInit()];
	
	var itemPanel = new Ext.Panel(itemPanelVar);
	return itemPanel;
}

/**
 * 主Panel布局
 */
com.frontier.gdc.system.sysSqlLog.mainPanel = function(){
	var itemPanelVar = {
		layout: 'border',
		region: 'center',
		border: true
	};
	
	itemPanelVar['items'] = [
								com.frontier.gdc.system.sysSqlLog.listGridInit(),
								com.frontier.gdc.system.sysSqlLog.detailsGridInitView()
							];
	
	var itemPanel = new Ext.Panel(itemPanelVar);

	return itemPanel;
}

com.frontier.gdc.system.sysSqlLog.initView = function() {
	//主窗口的布局
	var mainPnlCfg = {
		layout: 'border',
		border: true
	};
	//主窗口的主体部分
	mainPnlCfg['items'] = [com.frontier.gdc.system.sysSqlLog.mainPanel()];
	//建立主窗口对象
	var pnl = new Ext.Panel(mainPnlCfg);
	
	return pnl;
}

/**
 * 系统sql日志管理页面初始化
 */
com.frontier.gdc.system.sysSqlLog.newMainPanel = function() {
	
	Ext.QuickTips.init();
	var itemPanelVar = {
     	layout:'fit',
		border:false,
		listeners: {
		     'render':function(){
				com.frontier.gdc.system.sysSqlLog.sslStore.load({
					params : {
								start : 0,
								limit : com.frontier.gdc.system.sysSqlLog.pageSize
							},
					callback : function(record, options, success) {
							if(success) {
								// 默认选中第一行
								com.frontier.gdc.system.sysSqlLog.listGrid.getSelectionModel().selectFirstRow();
								com.frontier.gdc.system.sysSqlLog.listGrid.fireEvent(
									'rowclick',
									com.frontier.gdc.system.sysSqlLog.listGrid,0
								);
							}
						}
				});	
		     }  
		}
     };
     
	itemPanelVar['items']=[com.frontier.gdc.system.sysSqlLog.initView()];
	
	var itemPanel = new Ext.Panel(itemPanelVar);
	
	itemPanel.doLayout();
	itemPanel.show();
	return itemPanel;
}
/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统 统一代码下拉框封装 s</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.common");
 /**
  * 下拉多选树封装
  * @class gdc.common.ComboBoxCheckTree
  * @extends Ext.ux.ComboBoxCheckTree
  */
gdc.common.ComboBoxCheckTree = Ext.extend(Ext.ux.ComboBoxCheckTree, {
	constructor : function(config) {
		var config = config || {};
		//var dataUrl = config['dataUrl'];
		// 默认配置以清空对象
		var defConfig = {
				//width : 300,
				//height : 150,
				emptyText:'请选择',
				tree : {
					xtype:'treepanel',
					height:100,
					checkModel: 'cascade',   //cascade selection
					onlyLeafCheckable: false,//all nodes with checkboxes
					rootVisible : false,        
					border:false,
					autoScroll:true,
					loader: new Ext.tree.TreeLoader({dataUrl:gdc.webContextRoot+'/stationManage/findComboboxStationPurviewTree.action',   
                    baseAttrs: { uiProvider: Ext.ux.TreeCheckNodeUI } }),
					root:new Ext.tree.AsyncTreeNode({
						text : '组织机构树',
						draggable : false,
						id : '0'//默认的node值：?node=-100
					})		       	 	
		    	},
				selectValueModel:'leaf'
		};
		
		Ext.applyIf(config, defConfig);					
		gdc.common.ComboBoxCheckTree.superclass.constructor.call(this, config);
		Ext.reg('gdcComboBoxCheckTree',gdc.common.ComboBoxCheckTree);
	}
});		
		
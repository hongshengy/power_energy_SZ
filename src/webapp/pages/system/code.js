/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 * ============================================================ 
 * 功能描述：代码管理
 * ============================================================ 
 * 更新时间：2009.08.11
 * 更新人：jiangxinying 
 * 更新内容：新建
 */
Ext.namespace("com.frontier.gdc.system.code");
/**
* 新建代码窗口
* @type {Ext.Window}
*/
com.frontier.gdc.system.code.newCodeFormWin = null;
/**
* 编辑代码窗口
* @type {Ext.Window}
*/
com.frontier.gdc.system.code.editCodeFormWin = null;
/**
* 代码排序窗口
* @type {Ext.Window}
*/
com.frontier.gdc.system.code.rankCodeFormWin = null;
/**
* 新建代码表单
* @type { Ext.FormPanel}
*/
com.frontier.gdc.system.code.newCodeForm = null;
/**
* 编辑代码表单
* @type {Ext.FormPanel}
*/
com.frontier.gdc.system.code.editCodeForm = null;
/**
* 代码信息集
* @type {Ext.grid.GridPanel}
*/
com.frontier.gdc.system.code.codeGrid = null;
/**
* 代码排序信息集
* @type {Ext.grid.GridPanel}
*/
com.frontier.gdc.system.code.rankCodeGrid = null;
/**
* 代码grid数据源
* @type {Ext.data.Store}
*/
com.frontier.gdc.system.code.codeDs = null;
/**
* grid代码排序数据源
* @type {Ext.data.Store}
*/
com.frontier.gdc.system.code.rankCodeDs = null;
/**
* 树节点id
* @type {Number}
*/
var nodeId;
/**
* 树节点文本
* @type {String}
*/
var nodeText;
/**
 * 添加树节点
 * @type 
 */
var addNode;
/**
* 树节点
* @type 
*/
com.frontier.gdc.system.code.codeNode = null;
/**
* 供电公司树
* @type {Ext.tree.TreePanel}
*/
var tree;
/**
* 异步节点
* @type {Ext.tree.AsyncTreeNode}
*/
var root;
/**
* 下级类型
* @type {Number}
*/
var subtype = "codeSort";
/**
* 代码标识
* @type {Number}
*/
var codeId;
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
	}]);
	
	
/**
* grid代码数据映射reader
* @type {Ext.data.JsonReader}
*/
var _jsonCodeReader = new Ext.data.JsonReader( {
	root : 'list',
	totalProperty : 'totalCount',
	id : 'id',
	successProperty : '@success'
	}, [ {
		name : 'codeId'
	},{
		name : 'codeName'
	}, {
		name : 'codeValue'
	}, {
		name : 'codeSortId'
	}, {
		name : 'codeType'
	}, {
		name : 'fatherCode'
	}, {
		name : 'dispSn'
	},{
		name : 'content1'
	}, {
		name : 'content2'
	}, {
		name : 'content3'
	},{
		name : 'content4'
	},{
		name : 'content5'
	},{
		name: 'fatherCodeName'
	},{
		name: 'codeSortName'
	},{
		name: 'codeTypeName'
	}
]);

/**
* grid代码排序数据映射reader
* @type {Ext.data.JsonReader}
*/
var _jsonRankCodeReader = new Ext.data.JsonReader( {
	root : 'list',
	totalProperty : 'totalCount',
	id : 'id',
	successProperty : '@success'
	}, [ {
		name : 'codeId'
	},{
		name : 'codeName'
	}, {
		name : 'codeValue'
	}, {
		name : 'codeSortId'
	}, {
		name : 'codeType'
	}, {
		name : 'fatherCode'
	}, {
		name : 'dispSn'
	},{
		name : 'content1'
	}, {
		name : 'content2'
	}
]);
	    
/**
* 代码表单reader
* @type {Ext.data.JsonReader}
*/
var jsonCodeFormReader = new Ext.data.JsonReader( {
	root : 'list',
	totalProperty : 'totalCount',
	id : 'id',
	successProperty : '@success'
	}, [  {
		name : 'code.codeName',
		mapping : 'codeName'
	}, {
		name : 'code.codeId',
		mapping : 'codeId'
	}, {
		name : 'code.codeValue',
		mapping : 'codeValue'
	}, {
		name : 'code.codeSortId',
		mapping : 'codeSortId'
	}, {
		name : 'code.fatherCode',
		mapping : 'fatherCode'
	},{
		name : 'code.codeType',
		mapping : 'codeType'
	},{
		name : 'code.dispSn',
		mapping : 'dispSn'
	},{
		name : 'code.fatherCodeName',
		mapping : 'fatherCodeName'
	},{
		name : 'code.codeSortName',
		mapping : 'codeSortName'
	} ,{
		name : 'code.codeTypeName',
		mapping : 'codeTypeName'
	} ,{
		name : 'code.content1',
		mapping : 'content1'
	}, {
		name : 'code.content2',
		mapping : 'content2'
	}, {
		name : 'code.content4',
		mapping : 'content4'
	}, {
		name : 'code.orgNo',
		mapping : 'orgNo'
	}/*,{
		name : 'code.content3',
		mapping : 'content3'
	}, {
		name : 'code.content4',
		mapping : 'content4'
	},{
		name : 'code.content5',
		mapping : 'content5'
	}*/
]);
	    
/**
*初始化代码分类树
*/
com.frontier.gdc.system.code.initTree = function(){
	var Tree = Ext.tree;
	tree = new Tree.TreePanel( {
		id : 'menu-tree',
	    autoScroll : true,
	    animate : true,
	    //树不能拖动 enableDD : true,
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
	    expand : true,
	    draggable : false,
	    //默认的node值：?node=0
	    id : '0',
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
//	tree.render();
//	root.expand();
	      
	Ext.getCmp("menu-tree").on('click', function(node) {
		com.frontier.gdc.system.code.codeNode = node;
    	subtype = node.attributes.type;	
		nodeId = node.id;
		nodeText = node.text;
		com.frontier.gdc.system.code.codeDs.load({
			params : {
			           start : 0,
			           limit : pageSize,
			           'code.codeSortId' : nodeId
		   }
		});
			
	});
};

/**
 * 初始化代码排序表
 */
com.frontier.gdc.system.code.initRankCodeGrid = function(){
	var httpPoxy = new Ext.data.HttpProxy({
		url:gdc.webContextRoot+'/codeSort/findCodeListBySortForGrid.action'
	});

	com.frontier.gdc.system.code.rankCodeDs = new Ext.data.Store( {
		proxy : httpPoxy,
		reader : _jsonCodeReader,
		listeners : {
			"beforeload" : function(store) {
				store.removeAll();
				store.baseParams = {
					//start : 0,
					limit : pageSize,
					'codeSortId' : nodeId
				};
			}
		}
	});
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel([sm,{
		id : 'id',
		header : '代码标识',
		dataIndex : 'codeId',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	},{
		header : '代码名称',
		dataIndex : 'codeName',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "代码值",
		dataIndex : 'codeValue',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "代码类别",
		dataIndex : 'codeSortName',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "上级代码类别",
		dataIndex : 'codeTypeName',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "上级代码",
		dataIndex : 'fatherCodeName',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "显示序号",
		dataIndex : 'dispSn',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "代码内容1",
		dataIndex : 'content1',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "代码内容2",
		dataIndex : 'content2',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}
]);
	//cm.defaultSortable = true;
	var ptb = new gdc.grid.PagingToolbar( {
		pageSize : pageSize,
		store : com.frontier.gdc.system.code.rankCodeDs
	});
	
/**
 * 创建代码排序grid
 * @type {Ext.grid.GridPanel}
 */
com.frontier.gdc.system.code.rankCodeGrid = new Ext.grid.GridPanel( {
	store : com.frontier.gdc.system.code.rankCodeDs,
	sm : sm,
	cm : cm,
	layout : 'fit',
	height : 300,
	autoShow : true,
	stripeRows: true,
	// 添加分页工具栏
		bbar :ptb,
	viewConfig : {
		forceFit : false
	},
	tbar : [ {
		text : '提交',
		iconCls : 'ok',
		//bizCode:'ok',
		handler : function() {
			dosubmit();
		}
	}, '-', {
		text : '上移',
		iconCls : 'moveup',
		//bizCode:'moveup',
		handler : function() {
			doup();
		}
	}, '-', {
		text : '下移',
		iconCls : 'movedown',
		//bizCode:'movedown',
		handler : function() {
			dodown();
		}
	}]
});
//com.frontier.gdc.system.code.rankCodeGrid.render();
//com.frontier.gdc.system.code.rankCodeGrid.syncSize();
	
//提交事件的方法
var dosubmit=function(){
	var codeArray = new Array();
	// 重组到后台的Array
	var index=0;
	for(var i = 0; i < com.frontier.gdc.system.code.rankCodeDs.getCount(); i++){
	   codeArray[i] = com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("codeId");
	}
	Ext.Ajax.request({
		url : gdc.webContextRoot+'/codeSort/updateCodeDisp.action',
		params : {
			"codeArray" : codeArray
		},
		waitTitle:'提示',
		waitMsg : '正在向服务器提交数据...',
		success : function(result,request) {
			var resl = result.responseText;
			var tem = eval('('+resl+')');
			if(tem.success==true){
				Appframe.viewinfdlg.right.show("代码排序成功！！",true);
				com.frontier.gdc.system.code.rankCodeFormWin.hide("sort");
				com.frontier.gdc.system.code.codeDs.reload();
				var sm = Ext.getCmp('menu-tree').getSelectionModel();
	 			var node = sm.getSelectedNode();
				node.reload();
			}
		},
		failure : function(form,action) {
			com.frontier.gdc.system.code.rankCodeFormWin.hide("sort");
			Appframe.viewinfdlg.warning.show("代码排序失败！",false);
		}
	});	    	
}	
	
		
// 上移
var doup=function(){
	if (com.frontier.gdc.system.code.rankCodeDs.getCount() > 0)
	   if (sm.isSelected(0)) { 
	  	   Appframe.viewinfdlg.warning.show("已经选中第一行，不能上移!");
	      return null;
	   } 
	//循环整个列表   
	for(var i = 1; i < com.frontier.gdc.system.code.rankCodeDs.getCount(); i++){  
	   if (sm.isSelected(i)){   
			//如果选中了	id : 'id',
	   	   var codeId = com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).get("codeId");
	   	   var codeName = com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).get("codeName");
	   	   var codeValue = com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).get("codeValue");
	   	   var dispSn = com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).get("dispSn");
	   	   var content1 = com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).get("content1");
		   var content2 = com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).get("content2");
		   
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).set("codeId",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("codeId"));
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).set("codeName",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("codeName"));
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).set("codeValue",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("codeValue"));
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).set("dispSn",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("dispSn"));
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).set("content1",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("content1"));
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i-1).set("content2",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("content2"));
	   	   
	   	   sm.selectRow(i-1,true);
	   	   sm.deselectRow(i);
	   	   
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("codeId",codeId);
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("codeName",codeName);
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("codeValue",codeValue);
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("dispSn",dispSn);
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("content1",content1);
	   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("content2",content2);
	   }
	}
}

// 下移
var dodown=function(){
    	
	if (com.frontier.gdc.system.code.rankCodeDs.getCount()>0 )
	   if (sm.isSelected(com.frontier.gdc.system.code.rankCodeDs.getCount()-1)){
	      Appframe.viewinfdlg.warning.show("已经选中最后一行，不能下移!");
	      return null;
	   } 
		//循环整个列表   
		for(var i = com.frontier.gdc.system.code.rankCodeDs.getCount()-2; i >= 0; i--){  
		   if (sm.isSelected(i)){
		   	   //如果选中了
		   	   var codeId = com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).get("codeId");
		   	   var codeName = com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).get("codeName");
		   	   var codeValue = com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).get("codeValue");
		   	   var dispSn = com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).get("dispSn");
		   	   var content1 = com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).get("content1");
		   	   var content2 = com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).get("content2");
		   	   
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).set("codeId",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("codeId"));
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).set("codeName",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("codeName"));
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).set("codeValue",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("codeValue"));
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).set("dispSn",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("dispSn"));
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).set("content1",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("content1"));
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i+1).set("content2",com.frontier.gdc.system.code.rankCodeDs.getAt(i).get("content2"));
		   	   
		   	   sm.selectRow(i+1,true);
		   	   sm.deselectRow(i);
		   	   
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("codeId",codeId);
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("codeName",codeName);
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("codeValue",codeValue);
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("dispSn",dispSn);
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("content1",content1);
		   	   com.frontier.gdc.system.code.rankCodeDs.getAt(i).set("content2",content2);
		   }
		}
    }
};	
/**
 * 初始化代码表
 * @return {}
 */
com.frontier.gdc.system.code.initCodeGrid = function(){
	var httpPoxy = new Ext.data.HttpProxy({
		url:gdc.webContextRoot+'/codeSort/findCodeListBySortForGrid.action'
	});
	com.frontier.gdc.system.code.codeDs = new Ext.data.Store( {
		proxy : httpPoxy,
		reader : _jsonCodeReader,
		listeners : {
			"beforeload" : function(store) {
				store.removeAll();
				store.baseParams = {
					//start : 0,
					limit : pageSize,
					'codeSortId' : nodeId
				};
			}
		}
		
	});
	// ColumnModels
	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel([sm,new Ext.grid.RowNumberer(),{
		
		id : 'id',
		header : '代码标识',
		dataIndex : 'codeId',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	},{
		header : '代码名称',
		dataIndex : 'codeName',
		align : 'center',
		width:170,
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "代码值",
		dataIndex : 'codeValue',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	},{
		header : "代码类别",
		dataIndex : 'codeSortName',
		align : 'center',
		width:170,
		renderer:Ext.util.Format.htmlEncode

	},{
		header : "上级代码类别",
		dataIndex : 'codeTypeName',
		align : 'center',
		width:170,
		renderer:Ext.util.Format.htmlEncode

	},{
		header : "上级代码",
		dataIndex : 'fatherCodeName',
		align : 'center',
		width:150,
		renderer:Ext.util.Format.htmlEncode
		
	},{
		header : "显示序号",
		dataIndex : 'dispSn',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "代码内容1",
		dataIndex : 'content1',
		align : 'center',
		width:170,
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "代码内容2",
		dataIndex : 'content2',
		align : 'center',
		width:170,
		renderer:Ext.util.Format.htmlEncode

	}, {
		hidden:true,
		header : "代码内容3",
		dataIndex : 'content3',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}, {
		header : "标识",
		dataIndex : 'content4',
		align : 'center',
		renderer:function getFlagName(v){
			if(v=='Y'){
				return '有效';
			}else{
				return '无效';
			}
		}
	}, {
		hidden:true,
		header : "代码内容5",
		dataIndex : 'content5',
		align : 'center',
		renderer:Ext.util.Format.htmlEncode

	}]);
	
	// by default columns are sortable
	cm.defaultSortable = true;
	var ptb = new gdc.grid.PagingToolbar( {
		pageSize : pageSize,
		store : com.frontier.gdc.system.code.codeDs
	});
	
	/**
	 * 创建代码grid
	 * @type{Ext.grid.GridPanel}
	 */
	com.frontier.gdc.system.code.codeGrid = new Ext.grid.GridPanel( {
		//collapsible : true,// 是否可以展开
		animCollapse : false,// 展开时是否有动画效果
		//clicksToEdit : 4,
		title : '代码列表',
		//iconCls : 'icon-grid',
		store : com.frontier.gdc.system.code.codeDs,
		sm : sm,
		cm : cm,
		//多选
		stripeRows: true,
		layout : 'fit',
		frame : true,
		loadMask : true,// 载入遮罩动画
		autoShow : true,
		viewConfig : {
			forceFit : false
		},
		
		// 添加分页工具栏
		bbar :ptb
	});
//	com.frontier.gdc.system.code.codeGrid.render();
//	com.frontier.gdc.system.code.codeGrid.syncSize();
	//return com.frontier.gdc.system.code.codeGrid;
};
    
	/**
	 * 级联代码
	 * @type{Ext.data.SimpleStore}
	 */
	 var fatherCodeDs = new Ext.data.SimpleStore({    
	     proxy: new Ext.data.HttpProxy({      
	         url:gdc.webContextRoot+'/codeSort/findCodeListBySortCombox.action' 
 
		     }),      
	    	 //baseParams:{ 'codeSortId' : '21'},
	     fields: ['codeId','codeName']
     });  
  
/**
* 新建代码表单
* @type {Ext.FormPanel}
*/
com.frontier.gdc.system.code.newCodeForm = new gdc.FormPanel( {
	id : "addCodeForm",
	labelWidth : 100, // label settings here cascade unless overridden
	labelAlign : 'right',
	frame : true,
	bodyStyle : 'padding:5px 5px 0',
	width : 350,
	reader :jsonCodeFormReader,
	waitMsgTarget : true,
	defaults : {
		width : 230
	},
	defaultType : 'textfield',
	items : [
		{
		fieldLabel : '上级代码类别',
		id : 'codeTypeName',
		xtype : 'textfield',
		readOnly : true,
		disabled:true,
		name : 'code.codeTypeName',
		//disabled:true,
		allowBlank : false
	},{
		fieldLabel : '代码类别',
		id : 'codeSortName',
		readOnly : true,
		name : 'code.codeSortName',
		disabled:true,
		allowBlank : false
	},new Ext.form.Hidden({
			id:'codeSortId',
			name:'code.codeSortId'
        
	  }),new Ext.form.NumberField({
              fieldLabel: '代码标识',
              name: 'code.codeId',//元素名称
              maxLength : 32,
			  maxLengthText : "输入的字符不能超过32位",
              allowBlank:false//不允许为空
              //blankText:'代码标识不能为空'//错误提示内容
    }),{
		fieldLabel : '代码名称',
		name : 'code.codeName',
		maxLength : 256,
		maxLengthText : "输入的字符不能超过256位",
		allowBlank : false
	} ,{
		fieldLabel : '代码值',
		name : 'code.codeValue',
		maxLength : 256,
		maxLengthText : "输入的字符不能超过256位",
		allowBlank : false
	},new Ext.form.Hidden({
			id:'codeType',
			name:'code.codeType'
        
	  }),
	new gdc.code.ComboBox({
		fieldLabel:'上级代码',
		emptyText:'请选择',
		id :'fatherCodeId',
        hiddenName:'code.fatherCode',
        store:fatherCodeDs,
        valueField :"codeId",
        displayField: "codeName",
        mode: 'local',
        triggerAction: 'all',
        allowBlank:true,
        //editable:false,
        //disabled:true,
        width: 275,
        listeners:{
		   'focus':function(){
			  	fatherCodeDs.proxy= new Ext.data.HttpProxy({url: gdc.webContextRoot+'/codeSort/findCodeListBySortCombox.action'});
				fatherCodeDs.baseParams={ 'code.codeType' : Ext.getCmp('codeType').getValue()};
	        	fatherCodeDs.load(); 
		}}
    }), new Ext.form.NumberField({
              fieldLabel: '显示序号',
              name: 'code.dispSn',//元素名称
              maxLength : 10,
			  maxLengthText : "输入的字符不能超过10位",
              allowBlank:false//不允许为空
              //blankText:'显示序号不能为空'//错误提示内容
    }),{
		fieldLabel : '代码内容1',
		name : 'code.content1',
		maxLength : 256,
		maxLengthText : "输入的字符不能超过256位"
		//allowBlank : false
	},{
		fieldLabel : '代码内容2',
		name : 'code.content2',
		maxLength : 256,
		maxLengthText : "输入的字符不能超过256位"
		//allowBlank : false
	},new Ext.form.Hidden({
		id : 'orgId',
		name : 'code.orgNo'
	}),new Ext.form.ComboBox({
			fieldLabel : '标识',
			hiddenName : 'code.content4',
			triggerAction:'all',
			store:new Ext.data.SimpleStore({
				fields: ['val','tex'],
				data: [
					['Y','有效'],
					['N','无效']
				]
			}),
			valueField:'val',
			displayField:'tex',
			mode:'local',
			forceSelection:true,
			allowBlank:false,
			resizable:true,
			editable:false
		}),new gdc.common.comboboxTree.comboxWithTree({
			fieldLabel : '所属单位名称',
			treeType : 'ORG',
			hiddenName : 'orgId',
			treeId : 'org2Id',
			id : 'orgName',
			allowBlank : false
		})/*
	,{
		fieldLabel : '代码内容3',
		name : 'code.content3',
		maxLength : 128,
		maxLengthText : "输入的字符不能超过128位",
		allowBlank : false
	},{
		fieldLabel : '代码内容4',
		name : 'code.content4',
		maxLength : 128,
		maxLengthText : "输入的字符不能超过128位",
		allowBlank : false
	}
	,{
		fieldLabel : '代码内容5',
		name : 'code.content5',
		maxLength : 128,
		maxLengthText : "输入的字符不能超过128位",
		allowBlank : false
	}*/
	],
	tbar: [{
			text : '保存',
			iconCls: 'save',
			//bizCode:'save',
			handler : function() {
				
			if(Ext.getCmp('fatherCodeId').getValue()==""||Ext.getCmp('fatherCodeId').getValue()=="请选择"){
			  		Ext.getCmp('fatherCodeId').setValue("");
			 
		  	}
		  	
			if (com.frontier.gdc.system.code.newCodeForm.form.isValid(com.frontier.gdc.system.code.newCodeForm)) {
				
				com.frontier.gdc.system.code.newCodeForm.form.submit( {
					url : gdc.webContextRoot+'/codeSort/createCode.action',
					success : function(form, action) {
						Appframe.viewinfdlg.right.show("添加代码成功！",true);
						//root.reload();
						com.frontier.gdc.system.code.codeDs.reload();
						com.frontier.gdc.system.code.newCodeFormWin.hide();
						$("#addCodeForm input").val("");
						
					},
					
					waitMsg : '正在保存数据，稍后...'
				});
			}
//			else {
//				Appframe.viewinfdlg.warning.show("请填写完成再提交!",true);
//			}
		}
		}/*, {
		text : '重置',
		iconCls: 'reset',
		handler : function() {
			com.frontier.gdc.system.code.newCodeForm.form.reset();
		}
	}*/]
});
	
	
/**
* 编辑代码
* @type {Ext.FormPanel}
*/
com.frontier.gdc.system.code.editCodeForm = new gdc.FormPanel( {
	// collapsible : true,// 是否可以展开
	id : "editCodeForm",
	labelWidth : 100, // label settings here cascade unless overridden
	labelAlign : 'right',
	frame : true,
	bodyStyle : 'padding:5px 5px 0',
	width : 350,
	waitMsgTarget : true,
	reader : jsonCodeFormReader,
	defaults : {
		width : 230
	},
	defaultType : 'textfield',
	items : [ {
		fieldLabel : '上级代码类别',
		id : 'codeTypeName2',
		xtype : 'textfield',
		readOnly : true,
		disabled:true
	},{
		id:'codeSortName2',
		fieldLabel : '代码类别',
		readOnly : true,
		disabled:true,
		//name : 'code.codeSortName',
		allowBlank : false
	},new Ext.form.Hidden({
			name:'code.codeSortId'
	}),{
		fieldLabel : '代码名称',
		name : 'code.codeName',
		maxLength : 256,
		maxLengthText : "输入的字符不能超过256位",
		allowBlank : false
	} ,{
		fieldLabel : '代码值',
		name : 'code.codeValue',
		maxLength : 256,
		maxLengthText : "输入的字符不能超过256位",
		allowBlank : false
	} ,new Ext.form.Hidden({
			id:'codeType2',
			name:'code.codeType'
        
	  }),new gdc.code.ComboBox({
		fieldLabel:'上级代码',
		emptyText:'请选择',
		id :'fatherCodeId2',
        hiddenName:'code.fatherCodeName',
        store:fatherCodeDs,
        valueField :"codeId",
        displayField: "codeName",
        mode: 'local',
        triggerAction: 'all',
        allowBlank:true,
        //editable:false,
        //disabled:true,
        width: 275,
        listeners:{
		   'focus':function(){
			  	fatherCodeDs.proxy= new Ext.data.HttpProxy({url: gdc.webContextRoot+'/codeSort/findCodeListBySortCombox.action'});
				fatherCodeDs.baseParams={ 'code.codeType' : Ext.getCmp('codeType2').getValue()};
	        	fatherCodeDs.load(); 
			},
			'change':function(){
				if(Ext.getCmp('fatherCodeId2').getValue()==""||Ext.getCmp('fatherCodeId2').getValue()=="请选择"){
		  			Ext.getCmp('fatherCodeId2').setValue("");
		  		}
				Ext.getCmp('fatherCode2').setValue(Ext.getCmp('fatherCodeId2').getValue());

			}
		}
    }),new Ext.form.Hidden({
			id:'fatherCode2',
			name:'code.fatherCode'
        
	  })
	,new Ext.form.NumberField({
              fieldLabel: '显示序号',
              name: 'code.dispSn',//元素名称
              maxLength : 10,
			  maxLengthText : "输入的字符不能超过10位",
              allowBlank:false,//不允许为空
              blankText:'显示序号不能为空'//错误提示内容
    }),{
		fieldLabel : '代码内容1',
		name : 'code.content1',
		maxLength : 256,
		maxLengthText : "输入的字符不能超过256位"
		//allowBlank : false
	}
	,{
		fieldLabel : '代码内容2',
		name : 'code.content2',
		maxLength : 256,
		maxLengthText : "输入的字符不能超过256位"
		//allowBlank : false
	},new Ext.form.ComboBox({
		fieldLabel : '标识',
		hiddenName : 'code.content4',
		triggerAction:'all',
		store:new Ext.data.SimpleStore({
			fields: ['val','tex'],
			data: [
				['Y','有效'],
				['N','无效']
			]
		}),
		valueField:'val',
		displayField:'tex',
		mode:'local',
		forceSelection:true,
		allowBlank:false,
		resizable:true,
		editable:false
	}),
	/*,{
		fieldLabel : '代码内容3',
		name : 'code.content3',
		maxLength : 128,
		maxLengthText : "输入的字符不能超过128位",
		allowBlank : false
	},{
		fieldLabel : '代码内容4',
		name : 'code.content4',
		maxLength : 128,
		maxLengthText : "输入的字符不能超过128位",
		allowBlank : false
	}
	,{
		fieldLabel : '代码内容5',
		name : 'code.content5',
		maxLength : 128,
		maxLengthText : "输入的字符不能超过128位",
		allowBlank : false
	},*/
	{
		inputType : 'hidden',
		fieldLabel : '代码标识',
		name : 'code.codeId',
		id:'codeId2'
	},new Ext.form.Hidden({
		id : 'orgIdOfEdit',
		name : 'code.orgNo'
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
			handler: function() {
			if(Ext.getCmp('fatherCodeId2').getValue()==Ext.getCmp('codeId2').getValue()){
		  			Appframe.viewinfdlg.warning.show("上级代码不能选择自身!",false);
		  			return;
		  		}
			if (com.frontier.gdc.system.code.editCodeForm.form.isValid(com.frontier.gdc.system.code.editCodeForm)) {
				com.frontier.gdc.system.code.editCodeForm.form.submit( {
					url :gdc.webContextRoot+'/codeSort/updateCode.action',
					success : function(form, action) {
						Appframe.viewinfdlg.right.show("保存修改成功！",true);
						//root.reload();
						com.frontier.gdc.system.code.codeDs.reload();
						com.frontier.gdc.system.code.editCodeFormWin.hide();
					},
					
					waitMsg : '正在保存数据，稍后...'
				});
			
			} 
//			else {
//				Appframe.viewinfdlg.warning.show("请填写完成再提交!",true);
//			}
	
		}	
		}/*, {
		text : '重置',
		iconCls: 'reset',
		handler : function() {
			com.frontier.gdc.system.code.editCodeForm.form.load( {
				url :gdc.webContextRoot+'/codeSort/findCodeById.action',
				params:{"codeId":codeId}
	//			success:function(options,success,response){  
	//				setComboxTreeValue('editAddFormCodeSortId','editAddFormCodeSort_Id','CODESORT',response);
	//			}
			});
		}
	}*/]
});
	
/**
 * 新建代码函数
 */
var newCode = function() {
	if (!com.frontier.gdc.system.code.newCodeFormWin) {
		com.frontier.gdc.system.code.newCodeFormWin = new Ext.Window( {
			layout : 'fit',
			width : 400,
			height : 390,
			closeAction : 'hide',
			plain : true,
			//模态窗口属性
			modal:true,
			title : '新建代码',
			items : com.frontier.gdc.system.code.newCodeForm

		});
	}
	com.frontier.gdc.system.code.newCodeFormWin.show('New');
}

/**
* 准备修改代码
*/
var updateCode = function(codeId) {
	loadCodeFormData(codeId);
};

/**
* 载入被选择的代码数据行的表单数据
* @param {Ext.grid.GridPanel} 
*/
var loadCodeFormData = function(codeId) {
	
		editCode();
		com.frontier.gdc.system.code.editCodeForm.form.load( {
			url :gdc.webContextRoot+'/codeSort/findCodeById.action?codeId='+codeId,
//				waitMsg : '正在载入数据...'
//				failure : function() {
//					Ext.MessageBox.alert('编辑', '载入失败');
//				},
			success:function(options,success,response){  
				setComboxTreeValue('orgIdOfEdit','orgNameOfEdit', 'ORG', response);
				//setComboxTreeValue('editAddFormCodeSortId','editAddFormCodeSort_Id','CODESORT',response);
			}
		});
}	

/**
 * 编辑代码窗口
 */			
var editCode = function() {

	if (!com.frontier.gdc.system.code.editCodeFormWin) {
		com.frontier.gdc.system.code.editCodeFormWin = new Ext.Window( {
			layout : 'fit',
			width : 400,
			height : 370,
			closeAction : 'hide',
			plain : true,
			modal:true,
			title : '编辑代码',
			items : com.frontier.gdc.system.code.editCodeForm

		});
	}
	com.frontier.gdc.system.code.editCodeFormWin.show('Edit');
};	

/**
 * 代码排序窗口
 */
var rankCode = function() {
	if (!com.frontier.gdc.system.code.rankCodeFormWin) {
		com.frontier.gdc.system.code.initRankCodeGrid();
		com.frontier.gdc.system.code.rankCodeFormWin = new Ext.Window( {
			layout : 'fit',
			width : 750,
			height : 400,
			closeAction : 'hide',
			plain : true,
			modal:true,
			title : '代码排序',
			items : com.frontier.gdc.system.code.rankCodeGrid

		});
	}
	com.frontier.gdc.system.code.rankCodeFormWin.show('sort');
	
};

/**
 * 导出Excel(Code)
 */
var createExcelFormCode = function(){
	var sm = Ext.getCmp('menu-tree').getSelectionModel();
	var node = sm.getSelectedNode();
	if(node != null){
		nodeId = node.id;
		var url = gdc.webContextRoot+'/codeSort/exportExcelCodeList.action?codeSortId='+nodeId;
		var excelFormCode = new Ext.form.FormPanel({ 
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
 * 根据代码状态编号显示状态描述
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
 * 根据代码状态编号显示状态描述
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
com.frontier.gdc.system.code.init = function(){
	Ext.QuickTips.init();
	com.frontier.gdc.system.code.initTree();
	com.frontier.gdc.system.code.initCodeGrid();
	//com.frontier.gdc.system.code.initRankCodeGrid();     
	
	/**
	* 代码管理页面布局
	*/
	var codePanel = new Ext.Panel({
    layout: 'border',
    items: [{
		tbar : [ {
			id : 'New',
			text : ' 新增  ',
			tooltip : '新增',
			iconCls : 'add',
			bizCode:'add',
			handler:function(){
					if(com.frontier.gdc.system.code.codeNode && com.frontier.gdc.system.code.codeNode.attributes.isInit=='Y'){
						Appframe.viewinfdlg.warning.show("【"+com.frontier.gdc.system.code.codeNode.text+"】是同步数据，不能新增代码！",false);
						return false;
					}
				
					Ext.getCmp('addCodeForm').form.reset();
					 var sm = Ext.getCmp('menu-tree').getSelectionModel();
					 var node = sm.getSelectedNode();
					 var id = 0;
					if(node == null || !node.id > 0){
						Appframe.viewinfdlg.warning.show("您还没有选择！",false);
						return;
					}else{
						nodeId = node.id;
						nodeText = node.text;
					}
					addNode = node;
					var addCodeSortName=com.frontier.gdc.system.code.newCodeForm.findById("codeSortName");
					var addCodeTypeName=com.frontier.gdc.system.code.newCodeForm.findById("codeTypeName");
					var addCodeSortId=com.frontier.gdc.system.code.newCodeForm.findById("codeSortId");
					var addCodeType=com.frontier.gdc.system.code.newCodeForm.findById("codeType");
					
					addCodeSortName.setValue(nodeText);
					addCodeSortId.setValue(nodeId);
					if(com.frontier.gdc.system.code.codeNode.parentNode.id=='1'){
						addCodeTypeName.setValue(nodeText);
						addCodeType.setValue(nodeId);
					}else{
						addCodeTypeName.setValue(com.frontier.gdc.system.code.codeNode.parentNode.text);
						addCodeType.setValue(com.frontier.gdc.system.code.codeNode.parentNode.id);
					}
					
					//node = node.parentNode;
					if(!checkPurview(node,'create')||node.parentNode == root){
						Appframe.viewinfdlg.warning.show("该对象不可新增！",false);
						return;
					}
					newCode();
				}
			}, '-', {
			id : 'Edit',
			text : '修改',
			tooltip : '修改',
			iconCls : 'edit',
			bizCode:'edit',
			handler : function() {
				if(com.frontier.gdc.system.code.codeNode && com.frontier.gdc.system.code.codeNode.attributes.isInit=='Y'){
					Appframe.viewinfdlg.warning.show("【"+com.frontier.gdc.system.code.codeNode.text+"】下的代码是同步数据不能修改！",false);
					return false;
				}
								
				Ext.getCmp('editCodeForm').form.reset();
				//var sm = Ext.getCmp('menu-tree').getSelectionModel();
				//var node = sm.getSelectedNode();
				var _record = com.frontier.gdc.system.code.codeGrid.getSelectionModel().getSelected();
				var id = 0;
				if(! _record){
					Appframe.viewinfdlg.warning.show("您还没有选择！",false);
					return;
				}
				subtype = com.frontier.gdc.system.code.codeNode.attributes.type;
				if (_record) {
					if(!checkPurview(com.frontier.gdc.system.code.codeNode,'edit')){
						
						Appframe.viewinfdlg.warning.show("该对象不可修改！",false);
						return;
					}
					var rows = com.frontier.gdc.system.code.codeGrid.getSelections();
					codeId = rows[0].get("codeId");
					if (rows.length > 1) {
						
						Appframe.viewinfdlg.warning.show("只能选择一条进行修改！",false);
						return false;
					}
					nodeText=nodeText;
					var editCodeSortName=com.frontier.gdc.system.code.editCodeForm.findById("codeSortName2");
					editCodeSortName.setValue(nodeText);
					var editCodeTypeName=com.frontier.gdc.system.code.editCodeForm.findById("codeTypeName2");
					
					if(com.frontier.gdc.system.code.codeNode.parentNode.id=='1'){
						editCodeTypeName.setValue(nodeText);
					}else{
						editCodeTypeName.setValue(com.frontier.gdc.system.code.codeNode.parentNode.text);
					}
					updateCode(codeId);
				}
			}	
			}, '-', {
				text : '删除',
				tooltip : '删除',
				iconCls : 'remove',
				bizCode:'remove',
				handler : function() {
					if(com.frontier.gdc.system.code.codeNode && com.frontier.gdc.system.code.codeNode.attributes.isInit=='Y'){
						Appframe.viewinfdlg.warning.show("【"+com.frontier.gdc.system.code.codeNode.text+"】下的代码是同步数据不能删除！",false);
						return false;
					}
					
					//var sm = Ext.getCmp('menu-tree').getSelectionModel();
					//var node = sm.getSelectedNode();
					var _record = com.frontier.gdc.system.code.codeGrid.getSelectionModel().getSelected();
					var id = 0;
					if(! _record){
						
						Appframe.viewinfdlg.warning.show("您还没有选择！",false);
						return;
					}
					subtype = com.frontier.gdc.system.code.codeNode.attributes.type;
					if (_record) {
						if(!checkPurview(com.frontier.gdc.system.code.codeNode,'delete')){
							Appframe.viewinfdlg.warning.show("该对象不可删除！",false);
							return;
						}
						var rows = com.frontier.gdc.system.code.codeGrid.getSelections();
						var codeId = rows[0].get("codeId");
						if (rows.length > 1) {
					
							Appframe.viewinfdlg.warning.show("只能选择一条进行删除！",false);
							return false;
						}
						Ext.Msg.confirm('确认删除', '您确认要删除该代码吗？', function(btn) {
							if (btn == 'yes') {
								
								Ext.Ajax.request({
									url:gdc.webContextRoot+'/codeSort/deleteCode.action',
									params : {"codeId" : codeId},
									success : function(result,request) {
										var resl = result.responseText;
										var tem = eval('('+resl+')');
										if(tem.success==true){
											Appframe.viewinfdlg.right.show("删除成功！",true);
											//root.reload();
											com.frontier.gdc.system.code.codeDs.reload();
										}
									},
									failure : function(form, action) {
										Appframe.viewinfdlg.error.show("删除失败！",false);
									},
									waitMsg : '正在删除数据，稍后...'
								});
						
						   }
						});	
					} 
				}		
					
			}, '-', {
				id:'sort',
				text : '排序',
				tooltip : '排序',
				iconCls : 'sort',
				bizCode:'sort',
				handler : function() {
					 var sm = Ext.getCmp('menu-tree').getSelectionModel();
					 var node = sm.getSelectedNode();
					 var id = 0;
					if(node == null || !node.id > 0){
						
						Appframe.viewinfdlg.warning.show("您还没有选择！",false);
						return;
					}
					nodeId = node.id;
					subtype = node.attributes.type;
					if (com.frontier.gdc.system.code.codeDs.getCount() > 0){
						rankCode();
						com.frontier.gdc.system.code.rankCodeDs.proxy = new Ext.data.HttpProxy({
							url:gdc.webContextRoot+'/codeSort/findCodeListBySortForGrid.action'
						});
						com.frontier.gdc.system.code.rankCodeDs.reload();
						
					}else{
					
						Appframe.viewinfdlg.warning.show("只能对下级含有代码的进行排序！",false);
					}
				}
			}, 
			 '-', {
			id : 'Export',
			text : ' 导出Excel  ',
			tooltip : '导出Excel',
			iconCls : 'export_excel',
			bizCode:'export_excel',
			handler:function(){
					createExcelFormCode(); 
			}
			}
			],
    			    region:"north",			 
    			    height:25			  
    		},{
                    region:'west',
                    id:'west-panel',
                    title:'代码导航',
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
			        items:com.frontier.gdc.system.code.codeGrid
        }]
    });	
     return codePanel;
}



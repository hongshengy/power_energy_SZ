/**
 * 数据集合管理
 * @author yaoyoutian liuzhijie 
 */


Ext.namespace("com.frontier.gdc.system.dataSetList");

	var dataSetId ;
	var dsName ;
	var specialOrgId ;

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
	            //view.mainBody.on('mousedown', this.onMouseDown, this); 
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
	        p.css += ' x-grid3-check-col-td'; 
	        return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
	    }
	};
	var checkAccess = new Ext.grid.CheckColumn({
       header: "允许访问",
       dataIndex: 'access',
       width: 150,
       align : 'center'
    });
    var checkNotAccess = new Ext.grid.CheckColumn({
       header: "禁止访问",
       dataIndex: 'notAccess',
       width: 150,
       align : 'center'
    });
    var checkEdit = new Ext.grid.CheckColumn({
       header: "允许编辑",
       dataIndex: 'edit',
       width: 150,
       align : 'center'
    });
    
    
    
    function relatingRemove(node,childs){
		for(var n=0;n<childs.length;n++){
			childs[n].ui.toggleCheck(node.attributes.checked);
			if(childs[n].expanded){
				var cchilds = childs[n].childNodes;
				if(cchilds){
					relatingRemove(childs[n],cchilds);
				}
			}
		}
	}
	var tree ;
	var expandNodeArray = [];
    //树定义
	function getTree(){
		if(!tree){
			tree = new Ext.tree.TreePanel({
				layout:'fit',
				//checkModel : 'childCascade', // 对树的级联多选
				onlyLeafCheckable : false,// 对树所有结点都可选
				//animate : false,
				containerScroll : true,
				rootVisible : false,
				border:false,
				autoScroll : true,
				loader : new Ext.tree.TreeLoader({
					//url : gdc.webContextRoot+ 'purviewTree/findMeasurePointTreeJson.action',
					url : gdc.webContextRoot+ asyncTreeActionUrl,
					listeners:{
					    'beforeload':function(loader,node) {
					    	this.baseParams.nodeType = node.attributes.type;
					    }
					},
					baseAttrs : {uiProvider : Ext.ux.TreeCheckNodeUI} // 添加 uiProvider 属性
				}),
				root : new Ext.tree.AsyncTreeNode({
					id : '0'
				})
			}); 
			tree.on("expandnode", function(node) {
				if(expandNodeArray.indexOf(node)>-1){
					return false;
				}else{
					expandNodeArray.push(node);
					var childs = node.childNodes;
					if(childs){
						if(node.attributes.checked==true){
							for(var n=0;n<childs.length;n++){
								childs[n].ui.toggleCheck(true);
							}
						}
					}
				}
			}); 
			tree.on("checkchange", function(node,checked) {
				var childs = node.childNodes;
				if(childs){
					relatingRemove(node,childs);
				}
				
			}); 
			tree.on("check", function(node, checked) {
				//获取radio值
				var items = Ext.getCmp('rg').items;
				if(items){
					for(var i=0;i<items.length;i++){
						if(items.get(i).checked){
							ptcgText = '('+items.get(i).boxLabel+')';
						}
					}
				}
				
				//设置node Text
				var text = node.text;
				if(node.text.indexOf('(允许')>=0){
					text = node.text.substring(0,node.text.indexOf('(允许'));
				}
				
				//权限检查k
				if(checked==true && node.attributes.purview && node.attributes.purview==2 && ptcgText.indexOf('访问')==-1){
					if(!com.frontier.gdc.system.dataSetList.msg){
						com.frontier.gdc.system.dataSetList.msg = text;
					}else{
						if(com.frontier.gdc.system.dataSetList.msg.indexOf(','+text+',')<0 &&　com.frontier.gdc.system.dataSetList.msg.indexOf(','+text)<0){
							com.frontier.gdc.system.dataSetList.msg = com.frontier.gdc.system.dataSetList.msg +','+text;
						}
					}
					ptcgText='(允许访问)';
				}
				
				//设置node text
				if(checked==true){
					node.setText(text+ptcgText);
				}else{
					node.setText(text);
				}
				
			});
		}
		return tree;
	}
	
    var ptcgText = '(允许访问)';
	var gridJson = '';
	var ptWin = '';
	/**
	 * 新增data
	 * @type 
	 */
	var cAreaData = null;
	var cStationData = null;
	var cMpData = null;
	/**
	 * 修改data
	 * @type 
	 */
	var cAreaDataEdit = null;
	var cStationDataEdit = null;
	var cMpDataEdit = null;
	/**
	 * 新增ds
	 * @type 
	 */
	var cAreaDs = null;
	var cStationDs = null;
	var cMpDs = null;
	
	/**
	 * 修改ds
	 * @type 
	 */
	var cAreaDsEdit = null;
	var cStationDsEdit = null;
	var cMpDsEdit = null;
	
	/**
	 * 将3个json合并成一个json,用于修改树的回显。
	 */
	var jsonAdd = function(jsonOne, jsonTwo, jsonThree){
		var jsonNew = [];
		var areaJson = eval(jsonOne);
		areaJson.sort(function(a,b){return a["areaId"]>b["areaId"]?1:-1});
		var stationJson = eval(jsonTwo);
		var mpJson = eval(jsonThree);
		for(var s=0;s<stationJson.length;s++){
			stationJson[s].areaId = stationJson[s].stationId;
			areaJson.push(stationJson[s]);
		}
		for(var s=0;s<mpJson.length;s++){
			mpJson[s].areaId = mpJson[s].measurePointId;
			areaJson.push(mpJson[s]);
		}
		return areaJson;
	};
	
	/**
	 * 根据json回写树
	 */
	function setTreeNodeByJson(tree,json){
		//alert(json);
		if(json){
			var temNode = null;
			var ename = '';
			for(var j=0;j<json.length;j++){
				//alert(json[j].areaId);
				temNode = tree.getNodeById(json[j].areaId);
				//alert(temNode);
				if(json[j].notAccess==true){
					temNode.ui.toggleCheck(false);
				}else{
					var items = Ext.getCmp('rg').items;
					if(json[j].access==true){
						ename = '(允许访问)';
						items.get(0).setValue(true);
						items.get(1).setValue(false);
					}else if(json[j].edit==true){
						ename = '(允许编辑)';
						items.get(0).setValue(false);
						items.get(1).setValue(true);
					}
					temNode.attributes.checked = 'checked';
					temNode.ui.toggleCheck(true);
					if(temNode.text.indexOf('(允许')>=0){
						var name = temNode.text.substring(0,temNode.text.indexOf('(允许'));
						temNode.setText(name+ename);
					}else{
						temNode.setText(temNode.text+ename);
					}
				}
			}
		}
	}
	
	/**
	 * 组装权限树json
	 */
	function getPurviewNodeJson(tree){
		//获取所有选择的node
		var checkedNodes = tree.getChecked();
		//添加list
		var addList = new Array();
		//排除list
		var deleteList = new Array();
		if(checkedNodes){
			for(var i=0;i<checkedNodes.length;i++){
				var cnode = checkedNodes[i];
				var parentNode = cnode.parentNode;
				//填存添加list
				
				var addFlag = true;
				//检查添加list中是否有此节点的父节点
				for(var a=0;a<addList.length;a++){
					if(addList[a].id==parentNode.id){
						addFlag=false;					
					}
				}
				//如果添加list中有此节点父节点 判断一下权限类型是否相同
				var cnodePurview = cnode.text.substring(cnode.text.length-3,cnode.text.length-1);
				var parentNodePurview = '';
				try{
					parentNodePurview = parentNode.text.substring(parentNode.text.length-3,parentNode.text.length-1);
				}catch(e){
					parentNodePurview = '';
				}
				if(addFlag==false){
					if(cnodePurview!=parentNodePurview){
						addFlag=true;
					}
				}
				//如果父节点不在添加list中或者权限权限不相同，添加到添加list中
				if(addFlag==true){
					if(cnode.attributes.checked!=cnode.parentNode.attributes.checked || cnodePurview!=parentNodePurview)
					addList.push(cnode);
				}
			
				//获取此节点的所有选中的上级节点（包括此节点）
				var topCheckedNodeList = new Array();
				var tem = cnode;
				while(tem.id!=0){
					if(tem.attributes.checked==true){
						topCheckedNodeList.push(tem);
					}
					tem = tem.parentNode;
				}
				
				if(topCheckedNodeList.length>=2){
					//获取所有选中节点中相邻的两个节点之间需要排除的节点
					for(var d=topCheckedNodeList.length-1;d>=1;d--){
						var tNode = topCheckedNodeList[d];
						var bNode = topCheckedNodeList[d-1];
						//获取相邻两节点需要排除的子节点
						var cnodes = tNode.childNodes;
						for(var c=0;c<cnodes.length;c++){
							if(cnodes[c].attributes.checked!=true){
								var deleteFlag = true;
								for(var a=0;a<deleteList.length;a++){
									if(deleteList[a].id==cnodes[c].id){
										deleteFlag=false;					
									}
								}
								if(deleteFlag==true){
									deleteList.push(cnodes[c]);
								}
							}
						}
						
						cnodes = bNode.childNodes;
						for(var c=0;c<cnodes.length;c++){
							if(cnodes[c].attributes.checked!=true){
								var deleteFlag = true;
								for(var a=0;a<deleteList.length;a++){
									if(deleteList[a].id==cnodes[c].id){
										deleteFlag=false;					
									}
								}
								if(deleteFlag==true){
									deleteList.push(cnodes[c]);
								}
							}
						}
						//获取相邻两节点之间需要排出的节点(排除最大的)
						var temNode = bNode;
						var topNoCheckedNode = null;
						while(temNode.id!=tNode.id){
							if(temNode.attributes.checked!=true){
								topNoCheckedNode = temNode;
							};
							temNode = temNode.parentNode;
						}
						if(topNoCheckedNode!=null){
							var deleteFlag = true;
							for(var a=0;a<deleteList.length;a++){
								if(deleteList[a].id==topNoCheckedNode.id){
									deleteFlag=false;					
								}
							}
							if(deleteFlag==true){
								deleteList.push(topNoCheckedNode);
							}
						}
					}
				}else{
					//如果只有一个选中节点  排除它没有选中子节点
					var cnodes = cnode.childNodes;
					if(cnodes){
						for(var c=0;c<cnodes.length;c++){
							if(cnodes[c].attributes.checked!=true){
								var deleteFlag = true;
								for(var a=0;a<deleteList.length;a++){
									if(deleteList[a].id==cnodes[c].id){
										deleteFlag=false;					
									}
								}
								if(deleteFlag==true){
									deleteList.push(cnodes[c]);
								}
							}
						}
					}
				}
			}
			//结果
			var json = new Array();
			var areaJson = '[';
			var stationJson = '[';
			var measurePointJson = '['
			for(var q=0;q<addList.length;q++){
				//addIds += addList[q].text+','
				var atext =  addList[q].text;
				var extIndex = atext.indexOf('(允许')
				var areaName = atext.substring(0,extIndex);
				var access = false;
				var edit = false;
				if(atext.indexOf('访问')>0){
					access = true;
				}else{
					edit = true;
				}
				if(addList[q].attributes.iconCls=='station_icon_area'){
					areaJson += "{dataTypeId :'"+addList[q].attributes.type+"', id :'"+addList[q].id+"', name:'"+areaName+"',access:"+access+",notAccess:false,edit:"+edit+"},";
				}else if(addList[q].attributes.iconCls.indexOf('mp_icon')>-1){
					measurePointJson += "{dataTypeId :'"+addList[q].attributes.type+"', id :'"+addList[q].id+"', name:'"+areaName+"',access:"+access+",notAccess:false,edit:"+edit+"},";
				}else if((addList[q].attributes.iconCls.indexOf('station_icon_')>-1 && addList[q].attributes.iconCls!='station_icon_area') || !addList[q].attributes.iconCls ){
					stationJson += "{dataTypeId :'"+addList[q].attributes.type+"', id :'"+addList[q].id+"', name:'"+areaName+"',access:"+access+",notAccess:false,edit:"+edit+"},";
				}
			}
			for(var q=0;q<deleteList.length;q++){
				var dtext =  deleteList[q].text;
				if(deleteList[q].attributes.iconCls=='station_icon_area'){ 
					areaJson += "{dataTypeId :'"+deleteList[q].attributes.type+"', id :'"+deleteList[q].id+"', name:'"+deleteList[q].text+"',access:false,notAccess:true,edit:false},";
				}else if(deleteList[q].attributes.iconCls.indexOf('mp_icon')>-1){
					measurePointJson += "{dataTypeId :'"+deleteList[q].attributes.type+"', id :'"+deleteList[q].id+"', name:'"+deleteList[q].text+"',access:false,notAccess:true,edit:false},";
				}else if((deleteList[q].attributes.iconCls.indexOf('station_icon_')>-1 && deleteList[q].attributes.iconCls!='station_icon_area') || !deleteList[q].attributes.iconCls ){
					stationJson += "{dataTypeId :'"+deleteList[q].attributes.type+"', id :'"+deleteList[q].id+"', name:'"+deleteList[q].text+"',access:false,notAccess:true,edit:false},";
				}
			}
			if(areaJson.length==1){
				areaJson += ']';
			}else{
				areaJson = areaJson.substring(0,areaJson.length-1)+']';
			}
			if(stationJson.length==1){
				stationJson += ']';
			}else{
				stationJson = stationJson.substring(0,stationJson.length-1)+']';
			}
			
			if(measurePointJson.length==1){
				measurePointJson += ']'
			}else{
				measurePointJson = measurePointJson.substring(0,measurePointJson.length-1)+']';
			}
			json.push(areaJson);
			json.push(stationJson);
			json.push(measurePointJson);
		}
		//alert(json);
		return json;
	}
	
	var fp = new Ext.form.FormPanel({
		height: 50,
		width : 300,
		labelWidth :50,
		items:[
			{
	            xtype: 'radiogroup',
	            fieldLabel: '&nbsp;权限',
	            id:'rg',
	            items: [
	                {boxLabel: '允许访问', name: 'purview', inputValue: 1,checked:true},
	                {boxLabel: '允许编辑', name: 'purview', inputValue: 2}
	            ]
	         }
		]
	});
	function changeIdToName(value){
	    if (value == true) {
	        return "是";
	    } else {
	        return "否";
	    }    
	}
	
    /**
	  * 地区记录关系映射
	  */
	var cArea = Ext.data.Record.create([
		{name:'name',mapping:'name'},
		{name:'access',mapping:'access'},
		{name:'notAccess',mapping:'notAccess'},
		{name:'edit',mapping:'edit'}
	]);
	/**
	  * 厂站记录关系映射
	  */
	var cStation = Ext.data.Record.create([
		{name:'name',mapping:'name'},
		{name:'access',mapping:'access'},
		{name:'notAccess',mapping:'notAccess'},
		{name:'edit',mapping:'edit'}
	]);
	/**
	  * 计量点记录关系映射
	  */
	var cMp = Ext.data.Record.create([
		{name:'name',mapping:'name'},
		{name:'access',mapping:'access'},
		{name:'notAccess',mapping:'notAccess'},
		{name:'edit',mapping:'edit'}
	]);

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
		id : 'dataSetId',
		successProperty : '@success'
	}, [ {
		name : 'dataSetId'
	},{
		name : 'dataSetName'
	},{
		name : 'specialOrgName'
	},{
		name : 'specialOrgId'
	}]);
	/**
	* 表单reader的字段名字映射
	* @type {Array}
	*/
	var formReaderMapping = [  {
			name : 'dataSet.dataSetId',
			mapping : 'dataSetId'
		}, {
			name : 'dataSet.dataSetName',
			mapping : 'dataSetName'
		}, {
			name : 'dataSet.specialOrgName',
			mapping : 'specialOrgName'
		}, {
			name : 'dataSet.specialOrgId',
			mapping : 'specialOrgId'
		}];
	
	/**
	* 表单reader
	* @type {Ext.data.JsonReader}
	*/
	var _jsonFormReader = new Ext.data.JsonReader( {
		root : 'list',
		totalProperty : 'totalCount',                                             
		id : 'dataSetId',
		successProperty : '@success'
	},formReaderMapping );
	
	var grid;
	var ds;
	
	var mainPanelInit;
	
	com.frontier.gdc.system.dataSetList.dataSetGridInit = function(){
		ds = new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : gdc.webContextRoot+'/purviewTree/findDataSets.action'
			}),
			reader : _jsonReader	
		});
		// ColumnModels
		var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:false});
		var cm = new Ext.grid.ColumnModel([sm,new Ext.grid.RowNumberer(), {
			header : '数据集合名称',
			dataIndex : 'dataSetName'
			,align : 'center',
			renderer:Ext.util.Format.htmlEncode
		}, {
			header : '业务组织名称',
			dataIndex : 'specialOrgName'
			,align : 'center',
			renderer:Ext.util.Format.htmlEncode
		}]);
		
		// by default columns are sortable
		cm.defaultSortable = true;
		var ptb =  new Ext.PagingToolbar( {
				pageSize : pageSize,
				store : ds,
				displayInfo : true,
				lastText:"尾页", 
           		nextText:"下一页", 
                beforePageText:"当前", 
                refreshText:"刷新", 
                afterPageText:"页，共{0}页", 				
				displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
				emptyMsg : "无数据。",
				items : ['-']
			});
		grid = new Ext.grid.GridPanel( {
			id:'gid',
			//autoWidth : true,
			//renderTo : 'grid-div',
			title : '数据集合管理',
			region: 'center',
			store : ds,
			cm : cm,
			sm : sm,
			stripeRows: true,//条纹?
			border:false,
			viewConfig : {
				forceFit : true
			},
			// 添加分页工具栏
			bbar :ptb,
			// 添加内陷的工具条
			tbar : [ {
				id : 'New',
				text : ' 新增 ',
				tooltip : '新增数据集合',
				iconCls : 'add',
				bizCode:'add',
				handler : function() {
					if(mainPanelInit){
						
						Ext.getCmp('gid').hide();
						Ext.getCmp('temPanel').show();
						Ext.getCmp('itemPanel').doLayout();
						//Ext.getCmp('itemPanel').remove(Ext.getCmp('gid'));
//						var p = new Ext.Panel({
//							items:[
//								new Ext.Button({
//									text:'sdfsdfs'
//								})
//							]
//						})
						//Ext.getCmp('itemPanel').add(com.frontier.gdc.system.dataSetList.addDataSet());
						//Ext.getCmp('itemPanel').doLayout();
					}
					//com.frontier.gdc.system.dataSetList.addDataSet();
				}
			}, '-', {
				id : 'Edit',
				text : '修改',
				tooltip : '修改数据集合',
				iconCls : 'edit',
				bizCode:'edit',
				handler : function() {
						var _record = grid.getSelectionModel().getSelected();
						if (_record) {
							var rows = grid.getSelections();
							if(rows.length>1){
								//Ext.MessageBox.alert("提示","只能选择一条记录修改！");
								Appframe.viewinfdlg.warning.show('只能选择一条记录修改！');
								return false;
							}
							dataSetId = rows[0].get("dataSetId");
							dsName = rows[0].get("dataSetName");
							specialOrgId = rows[0].get("specialOrgId");
						}else{
							//Ext.MessageBox.alert('提示', '请在列表中选择要修改的数据集合！');
							Appframe.viewinfdlg.warning.show('请在列表中选择要修改的数据集合！');
							return false;
						}
						cAreaDsEdit.baseParams.dataSetId=dataSetId;
						cAreaDsEdit.load();
						if(cStationDsEdit.baseParams.dataType){
							cStationDsEdit.baseParams.dataSetId=dataSetId;
							cStationDsEdit.load();
						}
						if(cMpDsEdit.baseParams.dataType){
							cMpDsEdit.baseParams.dataSetId=dataSetId;
							cMpDsEdit.load();
						}
						
						
				//grid.hide();
						//Ext.getCmp('dsId').setValue(dataSetId);
						Ext.getCmp('editDataSetName').setValue(dsName);
						Ext.getCmp('editDataSetId').setValue(dataSetId);
						Ext.getCmp('editSpecialOrgId').setValue(specialOrgId);
						
						Ext.getCmp('gid').hide();
						Ext.getCmp('editPanel').show();
						Ext.getCmp('itemPanel').doLayout();
					//com.frontier.gdc.system.dataSetList.editDataSet();
				}
			}, '-', {
				text : '删除',
				tooltip : '删除数据集合',
				iconCls : 'remove',
				bizCode:'remove',
				handler : function() {
					com.frontier.gdc.system.dataSetList.deleteDataSet();
				}
			}, '-', {
				text : '导出XML',
				tooltip : '导出XML',
				iconCls : 'export_excel',
				bizCode:'exportXml',
				handler : function() {
					com.frontier.gdc.system.dataSetList.exportXml();
				}
			}, '-', {
				text : '导入XML',
				tooltip : '导入XML',
				iconCls : 'import',
				bizCode:'importXml',
				handler : function() {
					com.frontier.gdc.system.dataSetList.importXml();
				}
			}]
		});
		//ds.reload();
		ds.load( {
			params : {
				start : 0,
				limit : pageSize
			}
		});
		return grid;
	}
	
	/**
	 * 主Panel布局
	 */
	com.frontier.gdc.system.dataSetList.mainPanel = function(){
		var itemPanel = Ext.getCmp('itemPanel');
		if(!itemPanel){
			itemPanel = new Ext.Panel({
			id:'itemPanel',
			region: 'center',
			//layout: 'fit',
			//autoScroll:true,
			border: true,
			items:[ com.frontier.gdc.system.dataSetList.dataSetGridInit(),
					com.frontier.gdc.system.dataSetList.addDataSet()
				    ,com.frontier.gdc.system.dataSetList.editDataSet()
				  ]
			});
	
		}
		
		return itemPanel;
	}
	
/**
* 初始化数据集合信息grid布局，功能总入口。
*/
com.frontier.gdc.system.dataSetList.newMainPanel = function(){
		tree = getTree();	
//		grid.render(); 
//		grid.syncSize();
//		grid.on("rowdblclick", function(grid) {
//			//alert('双击');
//		});
		
		 mainPanelInit = new Ext.Panel({
			//frame:true,
			id:'itemPanel',
			layout : 'fit',
		 		bodyStyle:'padding:0px 0px 0',
				layout : 'border',
				items : [com.frontier.gdc.system.dataSetList.dataSetGridInit(),
					com.frontier.gdc.system.dataSetList.addDataSet()
				    ,com.frontier.gdc.system.dataSetList.editDataSet()
						        
						   ]
					
			
	    });
    	return mainPanelInit;
		
    //    		
}
		/**
		 * 增加数据权限功能入口
		 */
com.frontier.gdc.system.dataSetList.addDataSet=function(){
			cAreaDs = new Ext.data.Store({
				proxy: new Ext.data.MemoryProxy(cAreaData),
				reader: new Ext.data.JsonReader({
					//root : 'root'
				}
					,cArea
				)
			});
			cAreaDs.load();
			
			cStationDs = new Ext.data.Store({
				proxy: new Ext.data.MemoryProxy(cStationData),
				reader: new Ext.data.JsonReader({
						//root : 'root'
					}
					,cStation
				)
			});				 
			cStationDs.load();
			
			cMpDs = new Ext.data.Store({
				proxy: new Ext.data.MemoryProxy(cMpData),
				reader: new Ext.data.JsonReader({
					//root : 'root'
				}
					,cMp
				)
			});				 
			cMpDs.load();
			
			//根据数据类型显示相应的grid
			var storeArray = [cAreaDs,cStationDs,cMpDs];
			var items = [];
			Ext.Ajax.request({
				url : gdc.webContextRoot + 'purviewTree/findDataType.action',
				success : function(result,request) {
					var res = result.responseText;
					var tem = eval(res);
					if(tem){
						for(var i=0;i<tem.length;i++){
							var temGrid = new Ext.grid.GridPanel({
								height:100,
								border:false,
								frame:true,
								store:storeArray[i],
								layout:'fit',
								viewConfig : {
						           forceFit : true
						        },
								columns:[
									{header:tem[i].datatypeName,dataIndex:"name",sortable:true,align : 'center'},
									{header:"允许访问",dataIndex:"access",sortable:true,align : 'center',renderer : changeIdToName},
									{header:"禁止访问",dataIndex:"notAccess",sortable:true,align : 'center',renderer : changeIdToName},
									{header:"允许编辑",dataIndex:"edit",sortable:true,align : 'center',renderer : changeIdToName}
								]
							});
							var temPanel = new Ext.Panel({	
								height:100,
								layout:'fit',
								items: [
									temGrid
				         		]
							});
							centerPanel.add(temPanel);
						}
						centerPanel.doLayout();
					}
				}
			});
//			/**
//			 * 地区grid
//			 */
//			var cAreaGp = new Ext.grid.GridPanel({
//				autoWidth : true,
//				//width:800,
//				width:780,
//				height:120,
//				frame:true,
//				//disabled : true,
//				store:cAreaDs,
//				//plugins:[checkAccess, checkNotAccess,checkEdit],
//				columns:[
//					{header:"地区名称",dataIndex:"areaName",sortable:true,align : 'center'},
//					{header:"允许访问",dataIndex:"access",sortable:true,align : 'center',renderer : changeIdToName},
//					//checkAccess,
//					{header:"禁止访问",dataIndex:"notAccess",sortable:true,align : 'center',renderer : changeIdToName},
//					//checkNotAccess,
//					{header:"允许编辑",dataIndex:"edit",sortable:true,align : 'center',renderer : changeIdToName}
//					//checkEdit
//				],
//				listeners : {   
//			        'afteredit' : function(e) {
//			        	
//			        }   
//			    }
//			});
			
//			/**
//			 * 厂站grid
//			 */
//			var cStationGp = new Ext.grid.GridPanel({
//				autoWidth : true,
//				//width:800,
//				width:820,
//				height:120,
//				frame:true,
//				store:cStationDs,
//				//plugins:[checkAccess, checkNotAccess,checkEdit],
//				columns:[
//					{header:"厂站名称",width:285,dataIndex:"stationName",sortable:true,align : 'center'},
//					{header:"允许访问",width:150,dataIndex:"access",sortable:true,align : 'center',renderer : changeIdToName},
//					//checkAccess,
//					{header:"禁止访问",width:150,dataIndex:"notAccess",sortable:true,align : 'center',renderer : changeIdToName},
//					//checkNotAccess,
//					{header:"允许编辑",width:150,dataIndex:"edit",sortable:true,align : 'center',renderer : changeIdToName}
//					//checkEdit
//				]
//			});
			/**
			 * 计量点ds
			 */
			
//			/**
//			 * 厂站grid
//			 */
//			var cMpGp = new Ext.grid.GridPanel({
//				autoWidth : true,
//				//width:800,
//				width:820,
//				height:120,
//				frame:true,
//				store:cMpDs,
//				//plugins:[checkAccess, checkNotAccess,checkEdit],
//				columns:[
//					{header:"计量点名称",width:285,dataIndex:"measurePointName",sortable:true,align : 'center'},
//					{header:"允许访问",width:150,dataIndex:"access",sortable:true,align : 'center',renderer : changeIdToName},
//					//checkAccess,
//					{header:"禁止访问",width:150,dataIndex:"notAccess",sortable:true,align : 'center',renderer : changeIdToName},
//					//checkNotAccess,
//					{header:"允许编辑",width:150,dataIndex:"edit",sortable:true,align : 'center',renderer : changeIdToName}
//					//checkEdit
//				]
//			});
			/**
			 * 新增表单
			 */
			var northPanel = new gdc.FormPanel({
				//collapsible: true,
				width:500,
				//labelWidth : 90,
				frame : true,
				labelAlign : 'right',
				title:"新增数据集合",		
				region:"north",		
				bodyStyle : 'padding:1px 5px 0',
				//autoWidth : true,
				//width : 580,
				//height: 90,
				waitMsgTarget : true,
				defaults : {
					//width : 230
				},
				defaultType : 'textfield',
				items : [{
					fieldLabel : '数据集合名称',
					id:'dataSetName',
					name : 'dataSet.dataSetName',
					clearCls:'stop-float',
					allowBlank : false,
					maxLength :32,
					maxLengthText: '数据集合名称不能超过32位'
				}],
				tbar:[
					{id : 'New',
					 text : '保存',
					 tooltip : '新增数据集合',
					 iconCls: 'save', 
					 handler : function() {
					 	if (northPanel.form.isValid(northPanel)) {
							if(cAreaData){
								cAreaData = Ext.util.JSON.encode(cAreaData); 
							}
							if(cStationData){
								cStationData = Ext.util.JSON.encode(cStationData); 
							}
							if(cMpData){
								cMpData = Ext.util.JSON.encode(cMpData); 
							}
							
							var title = Ext.getDom("dataSetName").value;
							Ext.Msg.confirm("确认","<br/>保存数据集合<b> "+title+"</b> ？<br/>",function(id){
								if(id==="yes"){
									northPanel.form.submit( {
										url : gdc.webContextRoot+'/purviewTree/insertDataSetPurview.action',
										params:{checkedNodes:cAreaData,excludeNodes:cStationData,measurePointJsonString:cMpData},						
										success : function(form, action) {
											Appframe.viewinfdlg.right.show("保存数据集合成功！",true);
											ds.reload();
											/**
											 * 用于隐藏表单，grid等，显示列表页面。
											 */
											//northPanel.hide();
											northPanel.form.reset();
											cAreaData = [];
											cStationData =[];
											cMpData =[];
											//cAreaGp.hide();
											//cStationGp.hide();
											//cMpGp.hide();
											if(cAreaDs)
											cAreaDs.removeAll();
											if(cStationDs)
											cStationDs.removeAll();
											if(cMpDs)
											cMpDs.removeAll();
											
											//centerPanel.hide();
											//com.frontier.gdc.system.dataSetList.newMainPanel();
											//return grid;
											//gdc.openModule(com.frontier.gdc.system.dataSetList.newMainPanel,null,gdc.mdlCfg);
											Ext.getCmp('temPanel').hide();
											Ext.getCmp('gid').show();
											Ext.getCmp('itemPanel').doLayout();
										},
										failure : function(form, action) {
											//Appframe.viewinfdlg.error.show("保存数据集合失败！");
										},
										waitMsg : '正在保存数据，稍后...'
									});
								}
						});
					
					 }
					}
					}/*,{
					text : '重置',
					iconCls: 'reset',
					handler : function() {
						northPanel.form.reset();
						cAreaDs.removeAll();
						cStationDs.removeAll();
						cMpDs.removeAll();
					}
				  }*/,{
					text : '返回',
					iconCls: 'close',
					handler : function() {
						if(cAreaDs)
						cAreaDs.removeAll();
						if(cStationDs)
						cStationDs.removeAll();
						if(cMpDs)
						cMpDs.removeAll();
						Ext.getCmp('temPanel').hide();
						Ext.getCmp('gid').show();
						Ext.getCmp('itemPanel').doLayout();
					}
				  }
				]  
			});
			var centerPanel = new Ext.Panel( {
		  		//title:"数据集合信息",		
				region:"center",
				//headerAsText : false,
				//header:true,
				//collapsible: true,
				//layout:'fit',
				autoScroll:true,
				//autoWidth : true,
				//width : 580,
				//disabledClass:'x-item-disabled',
				layoutConfig:{
					columns:1
				},
				tbar:[{
					align : 'center',
					text: '新增数据权限',
					iconCls: 'add', 
					handler: function(){
						tree.getRootNode().reload();
						ptWin = new Ext.Window({
							title:'新增数据权限',
							width : 300,
							height : 450,
							closable:true,
							closeAction:'hide',
							maximizable:true,
							plain: true,
							modal:true,
							layout:'border',
							tbar:[
								{
									id : 'Update',
									text : '确定',
									iconCls: 'save',
									handler : function() {
										if(com.frontier.gdc.system.dataSetList.msg &&　com.frontier.gdc.system.dataSetList.msg.length>0){
											Ext.MessageBox.alert("提示","管理员只有以下地区、厂站、计量点的允许访问权限,权限将变为允许访问! \t("+com.frontier.gdc.system.dataSetList.msg+")");
										}
										//alert(sysTree);
										gridJson = getPurviewNodeJson(tree);
										
										cAreaData = eval(gridJson[0]);
										cStationData = eval(gridJson[1]);
										cMpData = eval(gridJson[2]);
										cAreaDs.loadData(cAreaData);
										cStationDs.loadData(cStationData);
										cMpDs.loadData(cMpData);
										ptWin.hide();
									}
								}
							],
							items:[
								{
									region : 'north',
									title : '',
									split : true,
									//autoScroll : true,
									height : 45,
									collapsible : true,
									layoutConfig : {
										animate : true
									},
									items : [
										fp
								    ]
								},{
									region : 'center',
									title : '',
									split : true,
									autoScroll : true,
									width : 200,
									//collapsible : true,
									layoutConfig : {
										animate : true
									},
									border : false,
									items : [tree]
							}
							]
						});
						/*ptWin.on('beforehide',function (){
							gridJson = getPurviewNodeJson(tree);
							cAreaData = eval(gridJson[0]);
							cStationData = eval(gridJson[1]);
							cMpData = eval(gridJson[2]);
							cAreaDs.loadData(cAreaData);
							cStationDs.loadData(cStationData);
							cMpDs.loadData(cMpData);
							tree.getRootNode().reload();
						})*/
						//tree.expandAll();
						ptWin.show('pt');
						
	                 	//setTreeNodeByJson(json);
	                 }
				}]
//				items:[
//					{	
//						height:120,
//						items: [{
//				             border:false,
//				             items:cAreaGp
//		         		}]
//					},
//					{
//						height:120,
//						autoWidth : true,
//						items: [{
//				             border:false,
//				             items:cStationGp
//		         		}]
//					},
//					{
//						height:120,
//						autoWidth : true,
//						items: [{
//				             border:false,
//				             items:cMpGp
//		         		}]
//					}
//				]
				//items:items
			});
			
//			var viewport = new Ext.Viewport({
//				layout:"border",	
//		        frame:true,
//				border : false,
//				items : [northPanel,centerPanel]
//			});
//			
			var tempPanel = new Ext.Panel({
				id:'temPanel',
				autoScroll:true,
				//layout: 'fit',
				//region: 'center',
				stripeRows: true,//条纹?
			border:false,
			//layout : 'fit',
			bodyStyle:'padding:0px 0px 0',
				hidden:true,
				//frame : true,
			autoShow : true,
				items:[new Ext.Panel({
					layout:'fit',
					items:[northPanel]
				}),centerPanel]
			});
			return tempPanel;
		};
		
		/**
		 * 修改数据权限功能入口
		 */
com.frontier.gdc.system.dataSetList.editDataSet=function(){	
			/**
			 * 临时变量用于修改时，表单中重置功能。
			 */
			var cAreaDataEditTemp ;
			var cStationDataEditTemp ;
			var cMpDataEditTemp;
			
			//var _record = grid.getSelectionModel().getSelected();
			//if (_record) {
				//var rows = grid.getSelections();
				//if(rows.length>1){
					//Ext.MessageBox.alert("提示","只能选择一条记录修改！");
				//	Appframe.viewinfdlg.warning.show('只能选择一条记录修改！');
				//	return grid;
				//}
				//if(mainPanelInit){
				//		mainPanelInit.hide();
				//}

				
				//grid.hide();
				
				//var dataSetId = rows[0].get("dataSetId");
				//var dataSetName = rows[0].get("dataSetName");
				//var specialOrgId = rows[0].get("specialOrgId");
				/**
				 * 获取地区数据，用于ds重新加载。
				 *//*
				Ext.Ajax.request({
					url: gdc.webContextRoot+ '/purviewTree/findDataSetPurview.action?dataSetId='+dataSetId + '&dataType=area',
					success: function(result,request ){
						cAreaDataEdit =result.responseText;
						cAreaDataEditTemp = cAreaDataEdit;
					}
				});
				*//**
				 * 获取厂站数据，用于ds重新加载。
				 *//*
				Ext.Ajax.request({
					url: gdc.webContextRoot+ '/purviewTree/findDataSetPurview.action?dataSetId='+dataSetId + '&dataType=station',
					success: function(result,request){
						cStationDataEdit =result.responseText;
						cStationDataEditTemp = cStationDataEdit;
					}
				});
				*//**
				 * 获取计量点数据，用于ds重新加载。
				 *//*
				Ext.Ajax.request({
					url: gdc.webContextRoot+ '/purviewTree/findDataSetPurview.action?dataSetId='+dataSetId + '&dataType=measurePoint',
					success: function(result,request){
						cMpDataEdit =result.responseText;
						cMpDataEditTemp = cMpDataEdit;
					}
				});*/
				/**
				 * 修改数据权限表单
				 */
				var editPanel = new gdc.FormPanel({
					//collapsible: true,
					labelWidth : 90,
					frame : true,
					title:"修改数据集合",		
					region:"north",		
					bodyStyle : 'padding:1px 5px 0',
					//autoWidth : true,
					width : 500,
					//height: 90,
					waitMsgTarget : true,
					defaults : {
						width : 230
					},
					defaultType : 'textfield',
					items : [new Ext.form.Hidden({id:'editDataSetId',name:'dataSet.dataSetId'}),new Ext.form.Hidden({id:'editSpecialOrgId',name:'dataSet.specialOrgId'}),{
						fieldLabel : '数据集合名称',
						id:'editDataSetName',
						name : 'dataSet.dataSetName',
						//value : dsName,
						clearCls:'stop-float',
						allowBlank : false
					}],
					tbar:[
						{id : 'Edit',
						 text : '保存',
						 tooltip : '修改数据集合',
						 iconCls: 'save', 
						 handler : function() {
						 	if (editPanel.form.isValid(editPanel)) {
						 		//alert('cAreaDataEdit ' + cAreaDataEdit);
								if(typeof(cAreaDataEdit) =='object' ){
									//alert('if   ');
									cAreaDataEdit = Ext.util.JSON.encode(cAreaDataEdit); 
									cStationDataEdit = Ext.util.JSON.encode(cStationDataEdit); 
									cMpDataEdit = Ext.util.JSON.encode(cMpDataEdit);
								}
								var title = Ext.getDom("editDataSetName").value;
								Ext.Msg.confirm("确认","<br/>保存数据集合<b> "+title+"</b> ？<br/>",function(id){
									if(id==="yes"){
										editPanel.form.submit( {
											url : gdc.webContextRoot+'/purviewTree/modifyDataSetPurview.action?dataSetId='+dataSetId,
											params:{checkedNodes:cAreaDataEdit,excludeNodes:cStationDataEdit,measurePointJsonString:cMpDataEdit},
											success : function(form, action) {
												Appframe.viewinfdlg.right.show("保存数据集合成功！",true);
												ds.reload();
												
												//editPanel.hide();
												cAreaDataEdit = [];
												cStationDataEdit =[];
												cMpDataEdit =[];
												//cAreaGpEdit.hide();
												//cStationGpEdit.hide();
												//cMpGpEdit.hide();
												//cAreaDsEdit.removeAll();
												//cStationDsEdit.removeAll();
												//cMpDsEdit.removeAll();
												
												//centerPanel.hide();
												//com.frontier.gdc.system.dataSetList.newMainPanel();
												//return grid;
												//gdc.openModule(com.frontier.gdc.system.dataSetList.newMainPanel,null,gdc.mdlCfg);
												Ext.getCmp('editPanel').hide();
												Ext.getCmp('gid').show();
												Ext.getCmp('itemPanel').doLayout();
											},
											failure : function(form, action) {
												//Appframe.viewinfdlg.error.show("保存数据集合失败！");
											},
											waitMsg : '正在保存数据，稍后...'
										});
								}
							});
						
						 }
						}
						 
						}/*,{
						text : '重置',
						iconCls: 'reset',
						handler : function() {
							editPanel.form.reset();
							//cAreaDsEdit.loadData(eval(cAreaDataEditTemp));
							//cStationDsEdit.loadData(eval(cStationDataEditTemp));
							//cMpDsEdit.loadData(eval(cMpDataEditTemp));
							cAreaDsEdit.load();
							cStationDsEdit.load();
							cMpDsEdit.load();
						}
					  }*/,{
						text : '返回',
						iconCls: 'close',
						handler : function() {
							//editPanel.hide();
							cAreaDataEdit = [];
							cStationDataEdit =[];
							cMpDataEdit =[];
							//cAreaGpEdit.hide();
							//cStationGpEdit.hide();
							//cMpGpEdit.hide();
							if(cAreaDsEdit){
								cAreaDsEdit.removeAll();
							}
							if(cStationDsEdit){
								cStationDsEdit.removeAll();
							}
							if(cMpDsEdit){
								cMpDsEdit.removeAll();
							}
							
							//centerPanel.hide();
							//tempEditPanel.hide();
							
							//com.frontier.gdc.system.dataSetList.newMainPanel();
							//return grid;
							//gdc.openModule(com.frontier.gdc.system.dataSetList.newMainPanel,null,gdc.mdlCfg);
							Ext.getCmp('editPanel').hide();
							Ext.getCmp('gid').show();
							Ext.getCmp('itemPanel').doLayout();
						}
					  }
					]  
				});
				//dataSetId = Ext.getCmp('dsId').getValue();
				//alert(dataSetId);
				
				cAreaDsEdit = new Ext.data.Store({
					proxy: new Ext.data.HttpProxy({
						url: gdc.webContextRoot+ '/purviewTree/findDataSetPurview.action'
					}),
					reader: new Ext.data.JsonReader({
						//root : 'root'
					}
						,cArea
					)
				});
				//cAreaDsEdit.load();
				cAreaDsEdit.on('load', function(){
					cAreaDataEdit = cAreaDsEdit.reader.jsonData;
					cAreaDataEditTemp = cAreaDataEdit
				});
				/**
				 * 修改时，地区grid
				 */
//				var cAreaGpEdit = new Ext.grid.GridPanel({
//					autoWidth : true,
//					width:820,
//					height:120,
//					frame:true,
//					//autoScroll:true,
//					//disabled : true,
//					store:cAreaDsEdit,
//					//plugins:[checkAccess, checkNotAccess,checkEdit],
//					columns:[
//						{header:"地区名称",width:285,dataIndex:"areaName",sortable:true,align : 'center'},
//						{header:"允许访问",width:150,dataIndex:"access",sortable:true,align : 'center',renderer : changeIdToName},
//						//checkAccess,
//						{header:"禁止访问",width:150,dataIndex:"notAccess",sortable:true,align : 'center',renderer : changeIdToName},
//						//checkNotAccess,
//						{header:"允许编辑",width:150,dataIndex:"edit",sortable:true,align : 'center',renderer : changeIdToName}
//						//checkEdit
//					],
//					listeners : {   
//				        'afteredit' : function(e) {
//				        	
//				        }   
//				    }
//				});
				
				cStationDsEdit = new Ext.data.Store({
					proxy: new Ext.data.HttpProxy({
						url: gdc.webContextRoot+ '/purviewTree/findDataSetPurview.action'
					}),
					reader: new Ext.data.JsonReader({
							//root : 'root'
						}
						,cStation
					)
				});		
				
				//cStationDsEdit.load();
				cStationDsEdit.on('load', function(){
					cStationDataEdit = cStationDsEdit.reader.jsonData;
					cStationDataEditTemp = cStationDataEdit;
				});  
				/**
				 * 修改时，厂站grid
				 */
//				var cStationGpEdit = new Ext.grid.GridPanel({
//					autoWidth : true,
//					//width:800,
//					width:820,
//					height:120,
//					frame:true,
//					store:cStationDsEdit,
//					//plugins:[checkAccess, checkNotAccess,checkEdit],
//					columns:[
//						{header:"厂站名称",width:285,dataIndex:"stationName",sortable:true,align : 'center'},
//						{header:"允许访问",width:150,dataIndex:"access",sortable:true,align : 'center',renderer : changeIdToName},
//						//checkAccess,
//						{header:"禁止访问",width:150,dataIndex:"notAccess",sortable:true,align : 'center',renderer : changeIdToName},
//						//checkNotAccess,
//						{header:"允许编辑",width:150,dataIndex:"edit",sortable:true,align : 'center',renderer : changeIdToName}
//						//checkEdit
//					]
//				});
				
				cMpDsEdit = new Ext.data.Store({
					proxy: new Ext.data.HttpProxy({
						url: gdc.webContextRoot+ 'purviewTree/findDataSetPurview.action'
					}),
					reader: new Ext.data.JsonReader({
						//root : 'root'
					}
						,cMp
					)
				});				 
				//cMpDsEdit.load();
				cMpDsEdit.on('load', function(){
					cMpDataEdit = cMpDsEdit.reader.jsonData;
					cMpDataEditTemp = cMpDataEdit;
				});
				/**
				 * 修改时，计量点grid
				 */
//				var cMpGpEdit = new Ext.grid.GridPanel({
//					autoWidth : true,
//					//width:800,
//					width:820,
//					height:120,
//					frame:true,
//					store:cMpDsEdit,
//					//plugins:[checkAccess, checkNotAccess,checkEdit],
//					columns:[
//						{header:"计量点名称",width:285,dataIndex:"measurePointName",sortable:true,align : 'center'},
//						{header:"允许访问",width:150,dataIndex:"access",sortable:true,align : 'center',renderer : changeIdToName},
//						//checkAccess,
//						{header:"禁止访问",width:150,dataIndex:"notAccess",sortable:true,align : 'center',renderer : changeIdToName},
//						//checkNotAccess,
//						{header:"允许编辑",width:150,dataIndex:"edit",sortable:true,align : 'center',renderer : changeIdToName}
//						//checkEdit
//					]
//				});
				//根据数据类型显示相应的grid
			var storeArray = [cAreaDsEdit,cStationDsEdit,cMpDsEdit];
			var nameArray = ['areaName','stationName','measurePointName'];
			var items = [];
			Ext.Ajax.request({
				url : gdc.webContextRoot + 'purviewTree/findDataType.action',
				success : function(result,request) {
					var res = result.responseText;
					var tem = eval(res);
					if(tem){
						for(var i=0;i<tem.length;i++){
							storeArray[i].baseParams.dataType=tem[i].datatypeId;
							var temGrid = new Ext.grid.GridPanel({
								height:100,
								border:false,
								frame:true,
								store:storeArray[i],
								viewConfig : {
						           forceFit : true
						        },
								columns:[
									{width:210,header:tem[i].datatypeName,dataIndex:"name",sortable:true,align : 'center'},
									{width:190,header:"允许访问",dataIndex:"access",sortable:true,align : 'center',renderer : changeIdToName},
									{width:190,header:"禁止访问",dataIndex:"notAccess",sortable:true,align : 'center',renderer : changeIdToName},
									{width:190,header:"允许编辑",dataIndex:"edit",sortable:true,align : 'center',renderer : changeIdToName}
								]
							});
							var temPanel = new Ext.Panel({	
								height:100,
								layout:'fit',
								items: [
									temGrid
				         		]
							});
							centerPanel.add(temPanel);
						}
						centerPanel.doLayout();
					}
				}
			});
				var editCount =0;
				var centerPanel = new Ext.Panel( {
			  		//title:"数据集合信息",		
					region:"center",
					//autoScroll:true,
					//autoWidth : true,
					//width : 580,
					disabledClass:'x-item-disabled',
					layoutConfig:{
						columns:1
					},
					tbar:[{
						align : 'center',
						text: '修改数据权限',
						iconCls: 'edit', 
							handler: function(){
								editCount++;
								tree.getRootNode().reload();
								ptWin = new Ext.Window({
									title:'修改数据权限',
									width : 300,
									height : 450,
									closable:true,
									closeAction:'hide',
									maximizable:true,
									plain: true,
									modal:true,
									layout:'border',
									tbar:[
										{
											id : 'Update',
											text : '确定',
											iconCls: 'save',
											handler : function() {
												if(com.frontier.gdc.system.dataSetList.msg &&　com.frontier.gdc.system.dataSetList.msg.length>0){
													Ext.MessageBox.alert("提示",com.frontier.gdc.system.dataSetList.msg+"  不能选择允许编辑权限,权限将变为允许访问！");
												}
												gridJson = getPurviewNodeJson(tree);
												
												cAreaDataEdit = eval(gridJson[0]);
												cStationDataEdit = eval(gridJson[1]);
												cMpDataEdit = eval(gridJson[2]);
												
												cAreaDsEdit.loadData(cAreaDataEdit);
												cStationDsEdit.loadData(cStationDataEdit);
												cMpDsEdit.loadData(cMpDataEdit);
												ptWin.hide();
											}
										}
									],
									items:[
										{
											region : 'north',
											title : '',
											split : true,
											//autoScroll : true,
											height : 45,
											collapsible : true,
											layoutConfig : {
												animate : true
											},
											items : [
												fp
										    ]
										},{
											region : 'center',
											title : '',
											split : true,
											autoScroll : true,
											width : 200,
											//collapsible : true,
											layoutConfig : {
												animate : true
											},
											border : false,
											items : [tree]
									}
									]
								});
								
								ptWin.show('pt');
								
								if(editCount==1){
									//setTimeout("setTreeNodeByJson(sysTree, jsonAdd(cAreaDataEdit,cStationDataEdit,cMpDataEdit))",3500);
								}else{
									//alert('--------');
									//getTree().getRootNode().ui.toggleCheck(false);
									
									//setTimeout("setTreeNodeByJson(sysTree, jsonAdd(cAreaDataEdit,cStationDataEdit,cMpDataEdit))",500);
									//setTreeNodeByJson(sysTree, jsonAdd(cAreaDataEdit,cStationDataEdit,cMpDataEdit));
								}
								
								
			                 	
			                }
					}]
//					items:[
//						{	
//							//title:'地区',
//							height:120,
//							//autoWidth : true,
//							//autoScroll:true,
//							//width:1200,
//							//html:"<div id='checkedAreas'></div>"
//							items: [{
//					             border:false,
//					             //iconCls: 'icon-grid',
//					             items:cAreaGpEdit
//			         		}]
//						},
//						{
//							//title:'厂站',
//							height:120,
//							//autoWidth : true,
//							//autoScroll:true,
//							//width:1200,
//							//html:"<div id='checkedPlants'></div>"
//							items: [{
//					             border:false,
//					             //iconCls: 'tabs_sysinfor',
//					             items:cStationGpEdit
//			         		}]
//						},
//						{
//							//title:'计量点',
//							height:120,
//							//autoWidth : true,
//							//autoScroll:true,
//							//width:1200,
//							//html:"<div id='checkedMps'></div>"
//							items: [{
//					             border:false,
//					             //iconCls: 'tabs_sysinfor',
//					             items:cMpGpEdit
//			         		}]
//						}/*,
//						{
//							//title:'计量点',
//							height:2,
//							//autoWidth : true,
//							width:1200,
//							//html:"<div id='checkedMps'></div>"
//							items: [{
//					             border:false,
//					             //iconCls: 'tabs_sysinfor',
//					             items:tree
//			         		}]
//						}*/
//					]
				});
				
				/*var viewport = new Ext.Viewport({
					layout:"border",	
			        frame:true,
					border : false,
					items : [editPanel,centerPanel]
				});
				//sysTree.expandAll();
				var tempEditPanel = new Ext.Panel({
					//layout: 'border',
					//region: 'center',
					border: true,
					items:[viewport]
				});
				return tempEditPanel;*/
				
				var tempPanel = new Ext.Panel({
					id:'editPanel',
					autoScroll:true,
				//layout: 'fit',
				//region: 'center',
				stripeRows: true,//条纹?
			border:false,
			//layout : 'fit',
				hidden:true,
				bodyStyle:'padding:0px 0px 0',
				//frame : true,
			autoShow : true,
					items:[new Ext.Panel({
						layout:'fit',
						//autoScroll:true,
						items:[editPanel]
					}),centerPanel]
				});
				return tempPanel;
				
			//}else{
				//Ext.MessageBox.alert('提示', '请在列表中选择要修改的数据集合！');
			//	Appframe.viewinfdlg.warning.show('请在列表中选择要修改的数据集合！');
			//}
		};
		
		/**
		 * 删除数据权限功能入口
		 */
com.frontier.gdc.system.dataSetList.deleteDataSet = function() {
			var _record = grid.getSelectionModel().getSelected();
			if (_record) {
				Ext.MessageBox.confirm('提示', '您确定要删除选中的数据集合吗？', function(btn) {
					if (btn == "yes") {
						var rows = grid.getSelections();
						var jsonData = "";
						for (var i = 0, len = rows.length;i < len; i++) {
							var id = rows[i].get("dataSetId");
							if (i == 0) {
								jsonData = jsonData + id;
							} else {
								jsonData = jsonData + "," + id;
							}
							
							Ext.Ajax.request({
								url : gdc.webContextRoot + '/purviewTree/deleteDataSet.action',
								params : {"dataSetId" : id},
								success : function(result,request) {
									var result = result.responseText;
									var resObj = eval('('+result+')');
									if(resObj.success==true){
										ds.reload();
										Appframe.viewinfdlg.parent.right.show("数据集合删除成功！",true);			
									}else{
										Appframe.viewinfdlg.parent.warning.show("数据集合删除失败！");
									}
								},
								failure : function(form, action) {
									//Appframe.viewinfdlg.parent.warning.show("数据集合删除失败！");
								},
								waitMsg : '正在删除，稍后...'	
							});
						}
					}
				});
			} else {
				//Ext.MessageBox.alert('提示', '请在列表中选择要删除的数据集合！',true);
				Appframe.viewinfdlg.warning.show('请在列表中选择要删除的数据集合！');
			}
		};
/**
 * 数据集合导出xml
 */
com.frontier.gdc.system.dataSetList.exportXml = function(){

	window.location.href=gdc.webContextRoot+'/purviewTree/exportXml.action';
}
/**
 * 导入数据集合xml形式
 * @type 
 */
com.frontier.gdc.system.dataSetList.importXml = function(){
		
	var	dtfieldarr=[new Ext.form.TextArea({
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
		//校验所有要提交的数据的函数
		var validdata=function(){
			var s="";
			if(dtfieldarr[0].getValue()=="")
				s+="请输入需要导入的xml文本!";
			if(s!=""){
				return s;
			}else
				return 0;
		}
		var dosubmit=function(){
				var s = validdata();
				if (s==0){
					Ext.Ajax.request({
						//通过Action提交请求
						url: gdc.webContextRoot+'/purviewTree/importXml.action',
						params : {
							xmlData:dtfieldarr[0].getValue()
						},
						waitTitle:'提示',
						waitMsg : '正在向服务器提交数据...',
						reset : false,
						success : function(result,request) {
							
							var result = result.responseText;
							var resObj = eval('('+result+')');
							if(resObj.success==true){
								ds.reload();
								Appframe.viewinfdlg.parent.warning.show("数据集合导入成功！",true);	
								com.frontier.gdc.system.dataSetList.win.hide();
							}else{
								Appframe.viewinfdlg.parent.warning.show("数据集合导入失败！");
							}
						},
						failure:function(){
							//Appframe.viewinfdlg.parent.warning.show("数据集合导入失败！");
						}
					});
				} else {
					//window.parent.Ext.MessageBox.alert('提示', s);
					Appframe.viewinfdlg.parent.warning.show(s);
				}
			}
		var doclose=function(){
				com.frontier.gdc.system.dataSetList.win.hide();
			}
		com.frontier.gdc.system.dataSetList.win = new Ext.Window({
				layout:'fit',
				title:'数据集合权限导入',
				width:640,
				height:460,
				closable:true,
				closeAction:'hide',
				maximizable:true,
				plain: true,
				modal:true,
				tbar:[{
					text: '提交',
					handler:dosubmit,
					iconCls:'save'
				}/*,{
					text: '关闭',
					handler:doclose,
					iconCls:'close'
				}*/],
				items:[{
							layout:'form',
							region:'center',
							bodyStyle:'padding:5px',
							height:240,
							title:" ",
							border:false,
							items:[dtfieldarr[0]]
						}]
			});
			
			com.frontier.gdc.system.dataSetList.win.show(this);
}

/**
 * 本功能的功能参数，用于打开本功能框架使用
 * @type 
 */
com.frontier.gdc.system.dataSetList.mdlCfg={
		mustRole:false,
		funcBtnControl:true
};	

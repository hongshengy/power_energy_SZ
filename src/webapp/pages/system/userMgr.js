Ext.namespace("com.frontier.gdc.system.userMgr");

com.frontier.gdc.system.userMgr.specialOrgId = '';
com.frontier.gdc.system.userMgr.systemNodeId = '';

com.frontier.gdc.system.userMgr.curRoleID = '';
com.frontier.gdc.system.userMgr.spOrgId = '';

com.frontier.gdc.system.userMgr.name = '';
var editUserDataSetMgr = '';
var addUserDataSetMgr = '';
var delUserDataSetMgr = '';
var synchronizedUser = '';
var userRole = '';
Ext.form.Myimg = Ext.extend(Ext.BoxComponent, {
	onRender : function(ct, position) {
		if (!this.el) {
			this.el = document.createElement('img');
			this.el.src = this.src;
			if (this.forId) {
				this.el.setAttribute('htmlFor', this.forId);
			}
		}
		Ext.form.Label.superclass.onRender.call(this, ct, position);
	}
});

// 业务组织树定义
com.frontier.gdc.system.userMgr.tree = null;
com.frontier.gdc.system.userMgr.createTree = function() {
	var tree = new Ext.tree.TreePanel({
				region : 'west',
				layout : 'fit',
				rootVisible : false,
				autoScroll : true,
				loader : new Ext.tree.TreeLoader({
							dataUrl : gdc.webContextRoot
									+ '/sysSystem/findSystemSpecialOrgTree.action'
						})
			});
	var root = new Ext.tree.AsyncTreeNode({
				id : '-100',
				text : '业务组织'
			});
	tree.setRootNode(root);
	tree.on('click', function(node) {
		if (node.parentNode.id == '-100') {
			com.frontier.gdc.system.userMgr.systemNodeId = '';
			com.frontier.gdc.system.userMgr.specialOrgId = '';
			node.expand();
			return;
		} else {
			var id = node.id.split(',');
			com.frontier.gdc.system.userMgr.systemNodeId = id[0];
			com.frontier.gdc.system.userMgr.specialOrgId = id[1];
		}
		com.frontier.gdc.system.userMgr.roleStore.load({
					params : {
						start : 0,
						limit : shortPageSize,
						specialOrgId : com.frontier.gdc.system.userMgr.specialOrgId
					}
				});

	});
	tree.on('beforeload', function(node, deep, anim) {
				// 获取自定义框架角色ID
				var curRoleIDFromSelf = '';
				if (gdc.isPagePurview) {
					curRoleIDFromSelf = gdc.currentRoleId;
				}
				// 初始化系统组织树或者点击系统节点后传递本级ID和自定义框架角色ID
				if (node.id == '-100' || node.attributes.type == 'sysSystem') {
					node.id = node.id + ',' + 0 + ',' + curRoleIDFromSelf;
				}
			});
	com.frontier.gdc.system.userMgr.tree = tree;
	return com.frontier.gdc.system.userMgr.tree;
}
// 业务组织角色列表 grid reader
com.frontier.gdc.system.userMgr.jsonReader = new Ext.data.JsonReader({
			root : 'list',
			totalProperty : 'totalCount',
			id : 'id',
			successProperty : '@success'
		}, [{
					name : 'id',
					mapping : 'id',
					type : 'float'
				}, {
					name : 'roleName',
					mapping : 'roleName'
				}, {
					name : 'roleCode',
					mapping : 'roleCode'
				}]);

var userId;
/**
 * 树节点id
 * 
 * @type {Number}
 */
var nodeId;

/**
 * 分页的每页数据量
 * 
 * @type {Number}
 */
var pageSize = gdc.constant.shortPageSize;
var shortPageSize = gdc.constant.shortPageSize;
/**
 * 编辑窗口
 * 
 * @type {Ext.Window}
 */
com.frontier.gdc.system.userMgr.editFormWin = null;

/**
 * 新增窗口
 * 
 * @type {Ext.Window}
 */
com.frontier.gdc.system.userMgr.addFormWin = null;

/**
 * grid数据映射reader
 * 
 * @type {Ext.data.JsonReader}
 */
com.frontier.gdc.system.userMgr.sysUserJsonReader = new Ext.data.JsonReader({
			root : 'list',
			totalProperty : 'totalCount',
			id : 'userId',
			successProperty : '@success'
		}, [{
					name : 'userId'
				}, {
					name : 'userName'
				}, {
					name : 'loginName'
				}, {
					name : 'specialOrgName'
				}, {
					name : 'workSpecialOrgName'
				}, {
					name : 'synchronizeFlag'
				}]);

/**
 * 表单reader的字段名字映射
 * 
 * @type {Array}
 */
com.frontier.gdc.system.userMgr.sysUserFormReaderMapping = [{
			name : 'sysUser.userId',
			mapping : 'userId'
		}, {
			name : 'sysUser.userName',
			mapping : 'userName'
		}, {
			name : 'sysUser.synchronizeFlag',
			mapping : 'synchronizeFlag'
		}, {
			name : 'sysUser.isAvaliable',
			mapping : 'isAvaliable'
		}, {
			name : 'sysUser.loginName',
			mapping : 'loginName'
		}, {
			name : 'sysUser.workSpecialOrgId',
			mapping : 'workSpecialOrgId'
		}, {
			name : 'sysUser.password',
			mapping : 'password'
		}, {
			name : 'sysUser.deleteFlag',
			mapping : 'deleteFlag'
		}, {
			name : 'sysUser.workSpecialOrgName',
			mapping : 'workSpecialOrgName'
		}];

/**
 * 表单reader
 * 
 * @type {Ext.data.JsonReader}
 */
com.frontier.gdc.system.userMgr.sysUserJsonFormReader = new Ext.data.JsonReader(
		{
			root : 'list',
			totalProperty : 'totalCount',
			id : 'userId',
			successProperty : '@success'
		}, com.frontier.gdc.system.userMgr.sysUserFormReaderMapping);

/**
 * 业务组织树AsyncTreeNode
 * 
 * @type {Ext.tree.AsyncTreeNode}
 */
com.frontier.gdc.system.userMgr.userMgRoot = new Ext.tree.AsyncTreeNode({
			text : '业务组织树',
			expanded : true,
			draggable : false,
			id : '0',// 默认的node值：?node=0
			loader : new Ext.tree.TreeLoader({
						dataUrl : gdc.webContextRoot
								+ '/specialOrg/searchSpecialOrgTree.action' // 这就是要动态载入数据的请求地址，这里请求时会提交一个参数为node的值，值为root即new
																			// Tree.AsyncTreeNode()对象的id值
						,
						listeners : {
							'beforeload' : function(loader, node) {
								this.baseParams.spOrgId = currUser['spOrgId'];// 统一框架角色组织ID,by:guojinhui2009/10/19
								// alert("beforeload "+currUser['spOrgId']);
								if (!gdc.isPagePurview) {
									this.baseParams.curRoleID = '';
								} else {
									this.baseParams.curRoleID = gdc.currentRoleId;// 增加传递当前用户所选的角色ID，by：guojinhui//
																					// 2009/10/16
								}
							},
							load : function(loader, node, response) {
								if (nodeId) {
									return;
								};
								/*
								 * if(node.item(0)) { node.item(0).select();
								 * nodeOnClick(node.item(0)); }
								 */
								var fc = node.firstChild;
								fc.fireEvent('click', fc);
								// com.frontier.gdc.system.userMgr.userStore.baseParams.spOrgId
								// = currUser['spOrgId'];//
								// 统一框架角色组织ID,by:guojinhui2009/10/19
								// com.frontier.gdc.system.userMgr.specialOrgId
								// = currUser['spOrgId'];
								// alert("load " + currUser['spOrgId']);

								/*
								 * com.frontier.gdc.system.userMgr.userStore.load({
								 * params : { start : 0, limit : pageSize } });
								 */
							}
						}
					})
		});

var nodeOnClick = function(node) {
	if (node != null) {
		nodeId = node.id;
	}
}

/**
 * 业务组织树TreePanel
 * 
 * @type {Ext.tree.TreePanel}
 */
com.frontier.gdc.system.userMgr.specialOrgTree = function() {
	var tree = new Ext.tree.TreePanel({
		containerScroll : true,
		autoScroll : true,
		// animate : true,
		border : false,
		rootVisible : false,
		listeners : {
			"click" : function(node) {
				com.frontier.gdc.system.userMgr.ausoi = node.id;
				com.frontier.gdc.system.userMgr.auson = node.text
				//Ext.getCmp('addsysUserSpecialOrgId').setValue(node.id);
				//Ext.getCmp('addsysUserSpecialOrgName').setValue(node.text);
				if (node.id > 0) {
					nodeId = node.id;
					// alert("click "+nodeId);
					if (!gdc.isPagePurview) {
						com.frontier.gdc.system.userMgr.userStore.baseParams.curRoleID = '';
					} else {
						// alert(gdc.currentRoleId);
						com.frontier.gdc.system.userMgr.curRoleID = gdc.currentRoleId;
						com.frontier.gdc.system.userMgr.userStore.baseParams.curRoleID = com.frontier.gdc.system.userMgr.curRoleID;// 增加传递当前用户所选的角色ID，by：guojinhui//
																																	// 2009/10/16
					}
					Ext.getCmp('serchName').setValue('');
					com.frontier.gdc.system.userMgr.name = '';
					com.frontier.gdc.system.userMgr.userStore.reload({
								params : {
									start : 0,
									limit : pageSize,
									spOrgId : nodeId
								}
							});
				}
			}
		}

	});

	tree.setRootNode(com.frontier.gdc.system.userMgr.userMgRoot);

	// 树自动展开一级
	// root.expand(true,false,function(node){if(node.id > 0) { return
	// false;};});
	// alert(tree.getXType());
	// root.expand();
	return tree;
};

function loadCallBack(store, options) {
	store.baseParams = {
		'searchName' : com.frontier.gdc.system.userMgr.name
	};
}

/**
 * 表单reader的字段名字映射
 * 
 * @type {Array}
 */
var sysUserFormReaderMapping = [{
			name : 'sysUser.userId',
			mapping : 'userId'
		}, {
			name : 'sysUser.userName',
			mapping : 'userName'
		}, {
			name : 'sysUser.specialOrgId',
			mapping : 'specialOrgId'
		}, {
			name : 'sysUser.specialOrgName',
			mapping : 'specialOrgName'
		}, {
			name : 'sysUser.workSpecialOrgId',
			mapping : 'workSpecialOrgId'
		}, {
			name : 'sysUser.synchronizeFlag',
			mapping : 'synchronizeFlag'
		}, {
			name : 'sysUser.loginName',
			mapping : 'loginName'
		}, {
			name : 'sysUser.password',
			mapping : 'password'
		}, {
			name : 'sysUser.deleteFlag',
			mapping : 'deleteFlag'
		}, {
			name : 'sysUser.isAvaliable',
			mapping : 'isAvaliable'
		}, {
			name : 'sysUser.workSpecialOrgName',
			mapping : 'workSpecialOrgName'
		}, {
			name : 'sysUser.empId',
			mapping : 'empId'
		}, {
			name : 'sysUser.staffId',
			mapping : 'staffId'
		}, {
			name : 'sysUser.sex',
			mapping : 'sex'
		}, {
			name : 'sysUser.photo',
			mapping : 'photo'
		}, {
			name : 'sysUser.posName',
			mapping : 'posName'
		}, {
			name : 'sysUser.poisition',
			mapping : 'poisition'
		}, {
			name : 'sysUser.workTypeCode',
			mapping : 'workTypeCode'
		}, {
			name : 'sysUser.techLevelCode',
			mapping : 'techLevelCode'
		}, {
			name : 'sysUser.ymd',
			mapping : 'ymd'
		}, {
			name : 'sysUser.degreeCode',
			mapping : 'degreeCode'
		}, {
			name : 'sysUser.mobile',
			mapping : 'mobile'
		}, {
			name : 'sysUser.officeTel',
			mapping : 'officeTel'
		}, {
			name : 'sysUser.srvLevelCode',
			mapping : 'srvLevelCode'
		}, {
			name : 'sysUser.certFlag',
			mapping : 'certFlag'
		}, {
			name : 'sysUser.fixedFlag',
			mapping : 'fixedFlag'
		}, {
			name : 'sysUser.onPosFlag',
			mapping : 'onPosFlag'
		}, {
			name : 'sysUser.professionCode',
			mapping : 'professionCode'
		}, {
			name : 'sysUser.professionBgnDate',
			mapping : 'professionBgnDate'
		}, {
			name : 'sysUser.joinDate',
			mapping : 'joinDate'
		}, {
			name : 'sysUser.title',
			mapping : 'title'
		}, {
			name : 'sysUser.politicalStatusCode',
			mapping : 'politicalStatusCode'
		}, {
			name : 'sysUser.titleLevelCode',
			mapping : 'titleLevelCode'
		}, {
			name : 'sysUser.statusCode',
			mapping : 'statusCode'
		}, {
			name : 'sysUser.remark',
			mapping : 'remark'
		}, {
			name : 'sysUser.passwordDate',
			mapping : 'passwordDate'
		}];

/**
 * 表单reader
 * 
 * @type {Ext.data.JsonReader}
 */
var _sysUserJsonFormReader = new Ext.data.JsonReader({
			root : 'list',
			totalProperty : 'totalCount',
			id : 'id',
			successProperty : '@success'
		}, sysUserFormReaderMapping);

var sysUserAddForm = null;


/**
 * 表单FormPanel
 * 
 * @type {Ext.FormPanel}
 */
var sysUserEditForm = null;
/**
 * 业务组织树AsyncTreeNode
 * 
 * @type {Ext.tree.AsyncTreeNode}
 */
com.frontier.gdc.system.userMgr.specialOrgRoot = new Ext.tree.AsyncTreeNode({
			text : '业务组织树',
			expanded : true,
			draggable : false,
			id : '0',// 默认的node值：?node=0
			loader : new Ext.tree.TreeLoader({
						dataUrl : gdc.webContextRoot
								+ '/specialOrg/searchSpecialOrgTree.action' // 这就是要动态载入数据的请求地址，这里请求时会提交一个参数为node的值，值为root即new
																			// Tree.AsyncTreeNode()对象的id值
					})
		});

/**
 * Window选择单位win
 * 
 * @type {Ext.Window}
 */
com.frontier.gdc.system.userMgr.specialOrgTreeWin = new Ext.Window({
	layout : 'fit',
	width : 400,
	height : 300,
	closeAction : 'hide',
	plain : true,
	title : '请选择单位',
	items : new Ext.tree.TreePanel({
				autoScroll : true,
				animate : true,
				enableDD : true,
				containerScroll : true,
				border : false,
				height : 530,
				rootVisible : false,
				root : com.frontier.gdc.system.userMgr.specialOrgRoot,
				listeners : {
					"click" : function(node) {
						Ext.getCmp('sysUserWorkSpecialOrgId').setValue(node.id);
						Ext.getCmp('sysUserWorkSpecialOrgName')
								.setValue(node.text);

						Ext.getCmp('sysUserSpecialOrgId').setValue(node.id);
						Ext.getCmp('sysUserSpecialOrgName').setValue(node.text);

						Ext.getCmp('addsysUserSpecialOrgId').setValue(node.id);
						Ext.getCmp('addsysUserSpecialOrgName')
								.setValue(node.text);

						Ext.getCmp('addsysUserWorkSpecialOrgId')
								.setValue(node.id);
						Ext.getCmp('addsysUserWorkSpecialOrgName')
								.setValue(node.text);
						com.frontier.gdc.system.userMgr.specialOrgTreeWin
								.hide();
					}
				}
			})
});

/**
 * grid数据映射reader
 * 
 * @type {Ext.data.JsonReader}
 */
com.frontier.gdc.system.userMgr.dataSetJsonReader = new Ext.data.JsonReader({
			root : 'list',
			totalProperty : 'totalCount',
			id : 'dataSetId',
			successProperty : '@success'
		}, [{
					name : 'dataSetId'
				}, {
					name : 'dataSetName'
				}]);
com.frontier.gdc.system.userMgr.roleJsonReader = new Ext.data.JsonReader({
			root : 'list',
			totalProperty : 'totalCount',
			id : 'id',
			successProperty : '@success'
		}, [{
					name : 'id'
				}, {
					name : 'roleName'
				}]);
com.frontier.gdc.system.userMgr.dataSetStore = new Ext.data.Store({
			// url : gdc.webContextRoot + '/dataSet/findDataSets.action',
			url : gdc.webContextRoot + '/purviewTree/findUserDataSets.action',
			reader : com.frontier.gdc.system.userMgr.dataSetJsonReader,
			listeners : {
				"beforeload" : function(store) {
					store.removeAll();
					store.baseParams = {
						'userId' : userId
					};
				}
			}
		});

com.frontier.gdc.system.userMgr.roleStore = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : gdc.webContextRoot
								+ '/sysRole/findSysRoleBySystemIdExcludeur.action'
					}),
			listeners : {
				"beforeload" : function(store) {
					store.removeAll();
					store.baseParams = {
						'userId' : userId,
						specialOrgId : com.frontier.gdc.system.userMgr.specialOrgId,
						systemId : com.frontier.gdc.system.userMgr.systemNodeId
					};
				}
			},
			reader : com.frontier.gdc.system.userMgr.jsonReader
		});
/**
 * 初始化数据集合信息grid布局
 */
com.frontier.gdc.system.userMgr.initDataSetGrid = function() {
	// ColumnModels
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});
	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer(), {
				id : 'dataSetId',
				header : '数据集合ID',
				dataIndex : 'dataSetId'
			}, {
				header : '数据集合名称',
				dataIndex : 'dataSetName'
				,renderer:Ext.util.Format.htmlEncode
			}]);

	cm.defaultSortable = true;

	var ptb = new gdc.grid.PagingToolbar({
				displayInfo : true,
				lastText : "尾页",
				nextText : "下一页",
				beforePageText : "当前",
				refreshText : "刷新",
				afterPageText : "页，共{0}页",
				displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
				emptyMsg : "无数据",
				pageSize : pageSize,
				store : com.frontier.gdc.system.userMgr.dataSetStore
			});

	var dataSetGrid = new Ext.grid.GridPanel({
				region : 'center',
				store : com.frontier.gdc.system.userMgr.dataSetStore,
				cm : cm,
				sm : sm,
				stripeRows : true,// 条纹?
				border : false,

				// 添加分页工具栏
				bbar : ptb,
				// 添加内陷的工具条
				tbar : [{
							id : 'save',
							text : '保存',
							tooltip : '保存',
							iconCls : 'save',
							handler : function() {
								submitUserDataSet();
							}
						}]

			});

	com.frontier.gdc.system.userMgr.dataSetStore.load({
				params : {
					start : 0,
					limit : pageSize
				}
			});

	// 提交
	var submitUserDataSet = function() {
		var _record = dataSetGrid.getSelectionModel().getSelected();
		if (_record) {
			var rows = dataSetGrid.getSelections();
			var jsonData = "";
			for (var i = 0, len = rows.length; i < len; i++) {
				var id = rows[i].get("dataSetId");
				if (i == 0) {
					jsonData = jsonData + id;
				} else {
					jsonData = jsonData + "," + id;
				}
			}

			/*
			 * var httpProxy = new Ext.data.HttpProxy({ url : gdc.webContextRoot +
			 * '/user/addUserDataSet.action' }); httpProxy.load({ "dataSetIds" :
			 * jsonData, "userId" : userId });
			 */
			Ext.Ajax.request({
						url : gdc.webContextRoot
								+ '/user/addUserDataSet.action',
						params : {
							"dataSetIds" : jsonData,
							"userId" : userId
						},
						success : function(result, request) {
							var result = result.responseText;
							var resObj = eval('(' + result + ')');
							if (resObj.success == true) {
								com.frontier.gdc.system.userMgr.userDatasetStore
										.reload();
								Appframe.viewinfdlg.parent.right.show(
										"用户数据集合增加成功！", true);
							} else {
								Appframe.viewinfdlg.parent.right
										.show("用户数据集合删除失败！");
							}
						},
						failure : function(form, action) {
							// Appframe.viewinfdlg.parent.right.show("用户数据集合删除失败！");
						},
						waitMsg : '正在删除，稍后...'
					});
			com.frontier.gdc.system.userMgr.userDatasetStore.load({
						params : {
							start : ptb.cursor,
							limit : pageSize
						}
					});
			com.frontier.gdc.system.userMgr.dataSetWin.hide();
		} else {
			// Ext.MessageBox.alert('提示', '请选择要增加的数据项！');
			Appframe.viewinfdlg.warning.show('请选择要增加的数据项！');
		}
	};

	com.frontier.gdc.system.userMgr.dataSetWin = new Ext.Window({
				layout : 'fit',
				width : 400,
				height : 300,
				closeAction : 'hide',
				plain : true,
				title : '新增用户数据集合',
				items : dataSetGrid
			});

	com.frontier.gdc.system.userMgr.dataSetWin.show();
}

com.frontier.gdc.system.userMgr.initRoleGrid = function() {
	// ColumnModels
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});
	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer(), {
				header : '角色名称',
				dataIndex : 'roleName',
            	renderer:Ext.util.Format.htmlEncode
			}, {
				header : '角色编码',
				dataIndex : 'roleCode',
            	renderer:Ext.util.Format.htmlEncode
			}]);

	cm.defaultSortable = true;

	var ptb = new gdc.grid.PagingToolbar({
				displayInfo : true,
				lastText : "尾页",
				nextText : "下一页",
				beforePageText : "当前",
				refreshText : "刷新",
				afterPageText : "页，共{0}页",
				displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
				emptyMsg : "无数据",
				pageSize : shortPageSize,
				store : com.frontier.gdc.system.userMgr.roleStore
			});

	var roleGrid = new Ext.grid.GridPanel({
				region : 'center',
				store : com.frontier.gdc.system.userMgr.roleStore,
				cm : cm,
				sm : sm,
				stripeRows : true,// 条纹?
				border : false,

				// 添加分页工具栏
				bbar : ptb,
				// 添加内陷的工具条
				tbar : [{
							id : 'save',
							text : '保存',
							tooltip : '保存',
							iconCls : 'save',
							handler : function() {
								submitUserRole();
							}
						}, '-', new Ext.form.TextField({
									id : 'serchRoleName',
									name : 'name',
									// allowBlank:false,
									maxLength : 30,
									maxLengthText : "输入的字符不能超过30位",
									emptyText : '请输入角色名称',
									width : 100
								}), '-', {
							text : '查询',
							iconCls : 'search',
							handler : function() {
								var name = Ext.getCmp('serchRoleName')
										.getValue();
								/*
								 * if(name.trim().length<1 ||
								 * name.trim()=="请输入角色名称"){
								 * Ext.MessageBox.alert('提示', "请输入查询内容！");
								 * return; }
								 */
								com.frontier.gdc.system.userMgr.roleStore.load(
										{
											params : {
												start : 0,
												limit : shortPageSize,
												serchRoleName : name
											}
										});
							}
						}]

			});

	/*
	 * com.frontier.gdc.system.userMgr.roleStore.load({ params : { start : 0,
	 * limit : pageSize } });
	 */

	// 提交
	var submitUserRole = function() {
		var _record = roleGrid.getSelectionModel().getSelected();
		if (_record) {
			var rows = roleGrid.getSelections();
			var jsonData = "";
			for (var i = 0, len = rows.length; i < len; i++) {
				var id = rows[i].get("id");
				if (i == 0) {
					jsonData = jsonData + id;
				} else {
					jsonData = jsonData + "," + id;
				}
			}

			Ext.Ajax.request({
						url : gdc.webContextRoot + '/user/addUserRole.action',
						params : {
							"roleIds" : jsonData,
							"userId" : userId
						},
						success : function(result, request) {
							var result = result.responseText;
							var resObj = eval('(' + result + ')');
							if (resObj.success == true) {
								com.frontier.gdc.system.userMgr.roleStore
										.reload();
								com.frontier.gdc.system.userMgr.userRoleStore
										.reload();
								Appframe.viewinfdlg.parent.right.show(
										"用户角色新增成功！", true);
							} else {
								Appframe.viewinfdlg.parent.right
										.show("用户角色新增失败！");
							}
						},
						failure : function(form, action) {
							// Appframe.viewinfdlg.parent.right.show("用户角色新增失败！");
						},
						waitMsg : '正在新增，稍后...'
					});
			com.frontier.gdc.system.userMgr.userRoleStore.load({
						params : {
							start : ptb.cursor,
							limit : shortPageSize
						}
					});
			com.frontier.gdc.system.userMgr.roleWin.hide();
		} else {
			// Ext.MessageBox.alert('提示', '请选择要增加的数据项！');
			Appframe.viewinfdlg.warning.show('请选择要增加的角色！');
		}
	};

	com.frontier.gdc.system.userMgr.roleWin = new Ext.Window({
				layout : 'border',
				width : 650,
				height : 480,
				closeAction : 'hide',
				maximizable : true,
				plain : true,
				modal : true,
				labelAlign : 'right',
				title : '新增用户角色',
				items : [{
							region : 'west',
							title : '',
							split : true,
							title : '业务组织',
							autoScroll : true,
							width : 200,
							collapsible : true,
							layout : 'accordion',
							layoutConfig : {
								animate : true
							},
							layout : 'fit',
							items : [com.frontier.gdc.system.userMgr
									.createTree()]
						}, {
							region : 'center',
							title : '',
							split : true,
							title : '',
							autoScroll : true,
							width : 200,
							collapsible : true,
							layout : 'accordion',
							layoutConfig : {
								animate : true
							},
							layout : 'fit',
							items : [roleGrid]
						}]
			});

	com.frontier.gdc.system.userMgr.roleWin.show();
}

/**
 * 用户数据集合grid数据映射reader
 * 
 * @type {Ext.data.JsonReader}
 */
com.frontier.gdc.system.userMgr.userDatasetJsonReader = new Ext.data.JsonReader(
		{
			root : 'list',
			totalProperty : 'totalCount',
			id : 'dataSetId',
			successProperty : '@success'
		}, [{
					name : 'userId'
				}, {
					name : 'userName'
				}, {
					name : 'dataSetId'
				}, {
					name : 'dataSetName'
				}, {
					name : 'isDefault'
				}]);
com.frontier.gdc.system.userMgr.userRoleJsonReader = new Ext.data.JsonReader({
			root : 'list',
			totalProperty : 'totalCount',
			id : 'id',
			successProperty : '@success'
		}, [{
					name : 'id'
				}, {
					name : 'roleName'
				}, {
					name : 'roleCode'
				}, {
					name : 'systemName'
				}]);

com.frontier.gdc.system.userMgr.userDatasetStore = new Ext.data.Store({
			url : gdc.webContextRoot + '/user/searchUserDataSetList.action',
			reader : com.frontier.gdc.system.userMgr.userDatasetJsonReader,
			listeners : {
				"beforeload" : function(store) {
					store.removeAll();
					store.baseParams = {
						'userId' : userId
					};
				}
			}
		});
com.frontier.gdc.system.userMgr.userRoleStore = new Ext.data.Store({
			url : gdc.webContextRoot + '/user/searchUserRoleList.action',
			reader : com.frontier.gdc.system.userMgr.userRoleJsonReader,
			listeners : {
				"beforeload" : function(store) {
					store.removeAll();
					store.baseParams = {
						'userId' : userId
					};
				}
			}
		});

/**
 * 初始化用户数据集合信息grid布局
 */
com.frontier.gdc.system.userMgr.initUserDataSetGrid = function() {
	// ColumnModels
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});
	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer(), {
				id : 'userId',
				header : '用户ID',
				dataIndex : 'userId',
				hidden : true
			}, {
				id : 'dataSetId',
				header : '数据集合ID',
				dataIndex : 'dataSetId',
				hidden : true
			}, {
				header : '用户名称',
				dataIndex : 'userName',
				align : 'center'
				,renderer:Ext.util.Format.htmlEncode
			}, {
				header : '数据集合名称',
				dataIndex : 'dataSetName',
				width : 120,
				align : 'center'
				,renderer:Ext.util.Format.htmlEncode
			}]);

	// by default columns are sortable
	cm.defaultSortable = true;
	var ptb = new gdc.grid.PagingToolbar({
				displayInfo : true,
				lastText : "尾页",
				nextText : "下一页",
				beforePageText : "当前",
				refreshText : "刷新",
				afterPageText : "页，共{0}页",
				displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
				emptyMsg : "无数据",
				pageSize : pageSize,
				store : com.frontier.gdc.system.userMgr.userDatasetStore
			});
	var deleteBtn = new Ext.Toolbar.Button({
				id : 'remove',
				text : '删除',
				tooltip : '删除用户数据集合信息',
				iconCls : 'remove',
				handler : function() {
					deleteUserDataSet();
				}
			});
	var userDataSetGrid = new Ext.grid.GridPanel({
				region : 'center',
				store : com.frontier.gdc.system.userMgr.userDatasetStore,
				cm : cm,
				sm : sm,
				border : false,
				layout : 'fit',
				width : 1000,
				height : 610,
				autoShow : true,

				viewConfig : {
					forceFit : false
				},

				// 添加分页工具栏
				bbar : ptb,
				// 添加内陷的工具条
				listeners : {
					'click' : function() {
						var rows = userDataSetGrid.getSelections();
						var isDefault = '';
						for (var i = 0, len = rows.length; i < len; i++) {
							isDefault = rows[i].get("isDefault");
							if ('1' == isDefault) {
								isDefault = '是';
								break;
							} else if ('0' == isDefault) {
								isDefault = '否';
							}
						}
						if ('是' == isDefault) {
							deleteBtn.disable();
						} else if ('否' == isDefault) {
							deleteBtn.enable();
						}
					}
				},
				tbar : [{
							id : 'New',
							text : '新增',
							tooltip : '新增用户数据集合信息',
							iconCls : 'add',
							handler : function() {
								if (!com.frontier.gdc.system.userMgr.dataSetWin) {
									com.frontier.gdc.system.userMgr
											.initDataSetGrid();
								}
								com.frontier.gdc.system.userMgr.dataSetWin
										.show();
								com.frontier.gdc.system.userMgr.dataSetStore
										.load();
							}
						}/*
							 * , '-', { id : 'remove', text : '删除', tooltip :
							 * '删除用户数据集合信息', iconCls : 'remove', handler :
							 * function() { deleteUserDataSet(); } }
							 */, deleteBtn]

			});
	//
	// com.frontier.gdc.system.userMgr.userDatasetStore.load({
	// params : {
	// start : 0,
	// limit : pageSize
	// }
	// });

	// userDataSetGrid.on("rowdblclick", function(grid) {
	// alert('双击');
	// });

	// 用户数据集合删除
	var deleteUserDataSet = function() {
		var _record = userDataSetGrid.getSelectionModel().getSelected();
		if (_record) {
			Ext.MessageBox.confirm('提示', '你确认要删除这条数据吗？', function(btn) {
				if (btn == "yes") {
					try {
						var rows = userDataSetGrid.getSelections();
						var jsonData = "";
						for (var i = 0, len = rows.length; i < len; i++) {
							var id = rows[i].get("dataSetId");
							if (i == 0) {
								jsonData = jsonData + id;
							} else {
								jsonData = jsonData + "," + id;
							}
							// com.frontier.gdc.system.userMgr.userDatasetStore.remove(rows[i]);
						}
						Ext.Ajax.request({
							url : gdc.webContextRoot
									+ '/user/deleteUserDataSet.action',
							params : {
								"dataSetIds" : jsonData,
								"userId" : userId
							},
							success : function(result, request) {
								var result = result.responseText;
								var resObj = eval('(' + result + ')');
								if (resObj.success == true) {
									com.frontier.gdc.system.userMgr.userDatasetStore
											.reload();
									Appframe.viewinfdlg.parent.right.show(
											"用户数据集合删除成功！", true);
								} else {
									Appframe.viewinfdlg.parent.right
											.show("用户数据集合删除失败！");
								}
							},
							failure : function(form, action) {
								// Appframe.viewinfdlg.parent.right.show("用户数据集合删除失败！");
							},
							waitMsg : '正在删除，稍后...'
						});
						/*
						 * var httpProxy1 = new Ext.data.HttpProxy({ url :
						 * gdc.webContextRoot + '/user/deleteUserDataSet.action'
						 * }); httpProxy1.load({ "dataSetIds" : jsonData,
						 * 'userId' : userId });
						 * 
						 * Appframe.viewinfdlg.parent.right.show("用户数据集合删除成功！",true);
						 */
					} catch (e) {
						Appframe.viewinfdlg.parent.right.show("用户数据集合删除失败！");
					}

				}
			});
		} else {
			// Ext.MessageBox.alert('提示', '请选择要删除的数据项！');
			Appframe.viewinfdlg.warning.show('请选择要删除的数据项！');
		}
	};
	com.frontier.gdc.system.userMgr.userDataSetWin = new Ext.Window({
				layout : 'fit',
				width : 500,
				height : 400,
				closeAction : 'hide',
				plain : true,
				title : '用户数据集合管理',
				items : userDataSetGrid
			});
}

com.frontier.gdc.system.userMgr.initUserRoleGrid = function() {
	// ColumnModels
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});
	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer(), {
				id : 'id',
				header : '角色ID',
				dataIndex : 'id',
				hidden : true
			}, {
				header : '角色名称',
				dataIndex : 'roleName',
				align : 'center'
				,renderer:Ext.util.Format.htmlEncode
			}, {
				header : '角色编码',
				dataIndex : 'roleCode',
				// width : 120,
				align : 'center'
				,renderer:Ext.util.Format.htmlEncode
			}, {
				header : '系统名称',
				dataIndex : 'systemName',
				width : 150,
				align : 'center'
				,renderer:Ext.util.Format.htmlEncode
			}]);

	// by default columns are sortable
	cm.defaultSortable = true;
	var ptb = new gdc.grid.PagingToolbar({
				displayInfo : true,
				lastText : "尾页",
				nextText : "下一页",
				beforePageText : "当前",
				refreshText : "刷新",
				afterPageText : "页，共{0}页",
				displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
				emptyMsg : "无数据",
				pageSize : shortPageSize,
				store : com.frontier.gdc.system.userMgr.userRoleStore
			});

	var userRoleGrid = new Ext.grid.GridPanel({
				region : 'center',
				store : com.frontier.gdc.system.userMgr.userRoleStore,
				cm : cm,
				sm : sm,
				border : false,
				layout : 'fit',
				width : 1000,
				height : 610,
				autoShow : true,

				viewConfig : {
					forceFit : false
				},

				// 添加分页工具栏
				bbar : ptb,
				// 添加内陷的工具条
				listeners : {
					'click' : function() {

					}
				},
				tbar : [{
							id : 'New',
							text : '新增',
							tooltip : '新增用户角色',
							iconCls : 'add',
							handler : function() {
								if (!com.frontier.gdc.system.userMgr.roleWin) {
									com.frontier.gdc.system.userMgr
											.initRoleGrid();
								}
								com.frontier.gdc.system.userMgr.roleWin.show();
								// com.frontier.gdc.system.userMgr.roleStore.load();
							}
						}, '-', {
							id : 'remove',
							text : '删除',
							tooltip : '删除用户角色',
							iconCls : 'remove',
							handler : function() {
								deleteUserRole();
							}
						}]

			});

	// com.frontier.gdc.system.userMgr.userRoleStore.load({
	// params : {
	// start : 0,
	// limit : shortPageSize
	// }
	// });

	// 用户角色删除
	var deleteUserRole = function() {
		var _record = userRoleGrid.getSelectionModel().getSelected();
		if (_record) {
			Ext.MessageBox.confirm('提示', '你确认要删除这条数据吗？', function(btn) {
				if (btn == "yes") {
					try {
						var rows = userRoleGrid.getSelections();
						var jsonData = "";
						for (var i = 0, len = rows.length; i < len; i++) {
							var id = rows[i].get("id");
							if (i == 0) {
								jsonData = jsonData + id;
							} else {
								jsonData = jsonData + "," + id;
							}
							// com.frontier.gdc.system.userMgr.userDatasetStore.remove(rows[i]);
						}
						Ext.Ajax.request({
							url : gdc.webContextRoot
									+ '/user/deleteUserRole.action',
							params : {
								"roleIds" : jsonData,
								"userId" : userId
							},
							success : function(result, request) {
								var result = result.responseText;
								var resObj = eval('(' + result + ')');
								if (resObj.success == true) {
									com.frontier.gdc.system.userMgr.userRoleStore
											.reload();
									com.frontier.gdc.system.userMgr.roleStore
											.reload();
									Appframe.viewinfdlg.parent.right.show(
											"用户角色删除成功！", true);
								} else {
									Appframe.viewinfdlg.parent.right
											.show("用户角色删除失败！");
								}
							},
							failure : function(form, action) {
								// Appframe.viewinfdlg.parent.right.show("用户角色删除失败！");
							},
							waitMsg : '正在删除，稍后...'
						});
						/*
						 * var httpProxy1 = new Ext.data.HttpProxy({ url :
						 * gdc.webContextRoot + '/user/deleteUserDataSet.action'
						 * }); httpProxy1.load({ "dataSetIds" : jsonData,
						 * 'userId' : userId });
						 * 
						 * Appframe.viewinfdlg.parent.right.show("用户数据集合删除成功！",true);
						 */
					} catch (e) {
						Appframe.viewinfdlg.parent.right.show("用户角色删除失败！");
					}

				}
			});
		} else {
			// Ext.MessageBox.alert('提示', '请选择要删除的数据项！');
			Appframe.viewinfdlg.warning.show('请选择要删除的角色！');
		}
	};
	com.frontier.gdc.system.userMgr.userRoleWin = new Ext.Window({
				layout : 'fit',
				width : 500,
				height : 400,
				closeAction : 'hide',
				plain : true,
				title : '用户角色管理',
				items : userRoleGrid
			});
}

com.frontier.gdc.system.userMgr.userStore = new Ext.data.Store({
	// proxy : new Ext.data.HttpProxy({
	// url : gdc.webContextRoot
	// + '/user/searchUserList.action'
	// }),
	url : gdc.webContextRoot + '/user/searchUserList.action',
	reader : com.frontier.gdc.system.userMgr.sysUserJsonReader
	/*
	 * ,listeners : { "beforeload" : loadCallBack }
	 */
	,
	listeners : {
		"beforeload" : function(store) {
			// store.removeAll();
			store.baseParams = {
				spOrgId : nodeId,
				searchName : com.frontier.gdc.system.userMgr.name
			};
		}
	}
		/*
		 * ,listeners:{ 'beforeload':function(loader,node) { this.baseParams = {
		 * searchName : com.frontier.gdc.system.userMgr.name, spOrgId :
		 * com.frontier.gdc.system.userMgr.specialOrgId };
		 * //this.baseParams.searchName = com.frontier.gdc.system.userMgr.name;
		 * //this.baseParams.spOrgId =
		 * com.frontier.gdc.system.userMgr.specialOrgId;
		 * //com.frontier.gdc.system.userMgr.spOrgId = currUser['spOrgId'];
		 * //com.frontier.gdc.system.userMgr.curRoleID = gdc.currentRoleId;
		 * this.baseParams.spOrgId = com.frontier.gdc.system.userMgr.spOrgId//
		 * 统一框架角色组织ID,by:guojinhui2009/10/19 if (!gdc.isPagePurview) {
		 * this.baseParams.curRoleID = ''; } else {
		 * 
		 * this.baseParams.curRoleID =
		 * com.frontier.gdc.system.userMgr.curRoleID;//
		 * 增加传递当前用户所选的角色ID，by：guojinhui// 2009/10/16 } }}
		 */
	});

function changeIdToName(value) {
	if (value == 'Y') {
		return "是";
	} else {
		return "否";
	}
}
/**
 * 初始化用户信息grid布局
 */
com.frontier.gdc.system.userMgr.userGrid = function() {
	// ColumnModels
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : false
			});
	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer(), {
				id : 'userId',
				header : '用户ID',
				dataIndex : 'userId',
				hidden : true
			}, {
				header : '用户名称',
				dataIndex : 'userName',
				align : 'center',
            	renderer:Ext.util.Format.htmlEncode
			}, {
				header : '登录名称',
				dataIndex : 'loginName',
				align : 'center',
            	renderer:Ext.util.Format.htmlEncode
			}, {
				header : '所属部门名称',
				dataIndex : 'specialOrgName',
				width : 120,
				align : 'center'
				,renderer:Ext.util.Format.htmlEncode
			}, {
				header : '所属单位名称',
				dataIndex : 'workSpecialOrgName',
				width : 120,
				align : 'center'
				,renderer:Ext.util.Format.htmlEncode
			}, {
				header : '是否同步数据',
				dataIndex : 'synchronizeFlag',
				renderer : changeIdToName,
				width : 120,
				align : 'center'
			}]);

	cm.defaultSortable = true;

	var ptb = new gdc.grid.PagingToolbar({
				pageSize : pageSize,
				store : com.frontier.gdc.system.userMgr.userStore
			});
	
	var grid = new Ext.grid.GridPanel({
				//title : '用户管理',
				region : 'center',
				store : com.frontier.gdc.system.userMgr.userStore,
				cm : cm,
				sm : sm,
				stripeRows : true,// 条纹?
				border : false,
				layout : 'fit',
				frame : true,

				// 添加分页工具栏
				bbar : ptb,
				// 添加内陷的工具条
				tbar:[
					new Ext.form.TextField({
						id : 'serchName',
						name : 'name',
						// allowBlank:false,
						maxLength : 30,
						maxLengthText : "输入的字符不能超过30位",
						emptyText : '用户名或登录名',
						width : 116
					}), '-', {
						text : '查询',
						iconCls : 'search',
						tooltip : '用户名或登录名',
						bizCode : 'search',
						handler : function() {
							com.frontier.gdc.system.userMgr.name = Ext
									.getCmp('serchName').getValue();
							com.frontier.gdc.system.userMgr.userStore.load({
								params : {
									start : 0,
									limit : pageSize,
									searchName : com.frontier.gdc.system.userMgr.name,
									spOrgId : nodeId
								}
							});
						}
					}, '-', {
						text : '导出',
						tooltip : '导出',
						iconCls : 'export_excel',
						bizCode : 'exportExc',
						handler : function() {
							exportExl();
						}
					}, '-', {
						text : '密码重置',
						tooltip : '密码重置',
						iconCls : 'reset',
						bizCode : 'pwReset',
						handler : function() {
							pwReset();
						}
					}
				]
				,
				listeners : {
					'render' : function() {
						//oneTbar.render(this.tbar); // add one tbar
						// twoTbar.render(this.tbar); //add two tbar
						// threeTbar.render(this.tbar); //add three tbar
					}
				}

			});

	/**
	 * 导出excel
	 */
	var exportExl = function() {
		window.location.href = gdc.webContextRoot
				+ '/user/exportExlToUser.action?specialId=' + nodeId;
	}
	/**
	 * 用户密码重置
	 */
	var pwReset = function() {
		var _record = grid.getSelectionModel().getSelected();
		if (_record) {
			var rows = grid.getSelections();
			if (rows.length > 1) {
				// Ext.MessageBox.alert("提示","只能选择一条记录！");
				Appframe.viewinfdlg.warning.show('只能选择一条记录！');
				return;
			}
			userId = rows[0].get("userId");
			Ext.MessageBox.confirm('提示', '你确认要重置密码？', function(btn) {
				if (btn == "yes") {
					Ext.MessageBox.show({
								title : '提示',
								msg : '正在与服务器同步数据...',
								width : 220,
								wait : true,
								waitConfig : {
									interval : 400
								}
							});
					Ext.Ajax.request({
						url : gdc.webContextRoot
								+ '/user/passWordReset.action?userId=' + userId,
						timeout : 300000,
						success : function(result, request) {
							var resl = result.responseText;
							var resObj = eval('(' + resl + ')');
							if (resObj.success == true) {
								Ext.MessageBox.hide();
								Appframe.viewinfdlg.right.show("用户密码重置成功！",
										true);
							}
						}
					});
				}
			});
		} else {
			Appframe.viewinfdlg.warning.show('请选择要密码重置的用户！');
		}

	}
	/**
	 * 用户角色管理
	 */
	userRole = function() {
		var _record = grid.getSelectionModel().getSelected();
		if (_record) {
			var rows = grid.getSelections();
			if (rows.length > 1) {
				// Ext.MessageBox.alert("提示","只能选择一条记录！");
				Appframe.viewinfdlg.warning.show('只能选择一条记录！');
				return;
			}
			userId = rows[0].get("userId");

			if (!com.frontier.gdc.system.userMgr.userRoleWin) {
				com.frontier.gdc.system.userMgr.initUserRoleGrid();
			}
			com.frontier.gdc.system.userMgr.userRoleStore.load();
			com.frontier.gdc.system.userMgr.userRoleWin.show();

		} else {
			// Ext.MessageBox.alert('提示', '请选择要管理的用户！');
			Appframe.viewinfdlg.warning.show('请选择要管理的用户！');
		}

	}
	
	// 用户管理-新增
	addUserDataSetMgr = function() {
		if (!com.frontier.gdc.system.userMgr.addFormWin) {
			sysUserAddForm = new Ext.form.FormPanel({
				labelWidth : 100,
				labelAlign : 'right',
				frame : true,
				bodyStyle : 'padding:5px 5px 0',
				width : 530,
				autoScroll : true,
				fileUpload : true,
				waitMsgTarget : true,
				reader : _sysUserJsonFormReader,
				items : [
					{
					layout : 'table',
					width : 525,
					layoutConfig : {columns : 2},
					defaults : {frame : true,width : 160},
					border : false,
					items : [{
						layout : 'form',
						width : 350,
						height:200,
						border : true,
						bodyStyle : 'padding:5 5 5 5',
						defaults : {frame : true,width : 200},
						items : [ {
									id : 'addloginName',
									xtype : 'textfield',
									fieldLabel : '登录名',
									name : 'sysUser.loginName',
									regex : /^\w+$/,
									regexText : "登录名只能是英文字母数字",
									allowBlank : false,
									maxLength : 32,
									maxLengthText : '输入的字符长度不能超过32个'
								}, {
									id : 'addpassword',
									xtype : 'textfield',
									fieldLabel : '密码',
									inputType : 'password',
									name : 'sysUser.password',
									//regex : /(?=^.{8,31}$)(?=(.*\d){1,})(?=(.*\W){1,})(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,}).*/,
						 			//regexText : "密码必须含有数字+符号(!@#$%^&*)+小写字母+大写字母组合方式并且大于8位小于32位",	 		 
									allowBlank : false,
									maxLength : 32,
									maxLengthText : '输入的字符长度不能超过32个'
								},new gdc.component.DateField({
											fieldLabel : '密码有效期',
											name : 'sysUser.passwordDate',
											maxLength : 19,
											allowBlank : false,
											maxLengthText : "输入的字符不能超过19位"
								}),{
									xtype : 'textfield',
									fieldLabel : '用户名称',
									name : 'sysUser.userName',
									regex : /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
									regexText : "不允许输入非法值",
									allowBlank : false,
									maxLength : 32,
									maxLengthText : '输入的字符长度不能超过32个'
								}, new gdc.code.ComboBox({
											hiddenName : 'sysUser.sex',
											fieldLabel : '性别',
											codeSortCode : '30009',
											allowBlank : false,
											blankText : '请输入',
											emptyText : '请选择'
										}),new Ext.form.Hidden({
											id : 'addsysUserWorkSpecialOrgId',
											name : 'sysUser.workSpecialOrgId'
										}), new gdc.common.comboboxTree.comboxWithTree({
											fieldLabel : '所属单位名称',
											treeType : 'USER_ORG_SUO',
											hiddenName : 'addsysUserWorkSpecialOrgId',
											treeId : 'orgIdAdd',
											id : 'addsysUserWorkSpecialOrgName',
											allowBlank : false,
											select:function(node){
												if(node){
													Ext.getCmp('dept').setDisabled(false);
													Ext.getCmp('dept').setValue('');
													var deptStore = Ext.getCmp('dept').getStore();
													deptStore.baseParams.specialOrgId = node.id;
													deptStore.reload();
												}
											}
										}),new Ext.form.ComboBox({
											id:'dept',
											fieldLabel : '所属部门名称',
											triggerAction:'all',
											allowBlank : false,
											disabled:true,
											store:new Ext.data.Store({
									 			proxy:new Ext.data.HttpProxy({
													timeout : 300000,
													url:gdc.webContextRoot+'/specialOrg/findDeptByOrgId.action'
												}),
												reader: new Ext.data.JsonReader({
													totalProperty:"totalPorperty",
													root:"",
													fields:[{name: 'specialOrgName'},{name: 'specialOrgId'}]
												})
											}),
											valueField:'specialOrgId',
											displayField:'specialOrgName',
											mode:'local',
											hiddenName:'sysUser.specialOrgId',
											emptyText:'请选择',
											blankText : '请输入',
											forceSelection:true,
											resizable:true
										})
			
						]
					}, {
						id:'photoImg',
						width : 172,
						height : 200,
						defaults : {frame : true},
						labelWidth : 0,
						border : false,
						autoScroll : true,
						html:'<img id="photoId" src="'+ gdc.webContextRoot+ 'images/img/34_active.gif">'
					}, {
						colspan : 2,
						width : 522,
						layout : 'form',
						defaults : {frame : true,width : 400},
						border : true,
						items : [ 	new Ext.form.FileUploadField({
										id : 'photo',
										fieldLabel : '相片',
										name : 'photo',
										fileType:'jpg,bmp,gif,png',
										listeners : {
											fileselected : function() {
												//alert(this.fileInput.dom.files.item(0).getAsDataURL());
												if (window.navigator.userAgent.indexOf("MSIE")>=1) { 
								                   document.getElementById('photoId').src = this.value;
								                } 
								                //firefox 
								                else if(window.navigator.userAgent.indexOf("Firefox")>=1) { 
								                     document.getElementById('photoId').src = this.fileInput.dom.files.item(0).getAsDataURL();
								                } 
											}
										}
									}), new Ext.form.TextField({
											fieldLabel : '人员编号',
											name : 'sysUser.empId',
											// allowBlank:false,
											maxLength : 32,
											maxLengthText : "输入的字符不能超过32位"
										}), new Ext.form.TextField({
											fieldLabel : '工号',
											name : 'sysUser.staffId',
											maxLength : 32,
											maxLengthText : "输入的字符不能超过32位"
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.poisition',
											fieldLabel : '岗位',
											codeSortCode : '20021',
											blankText : '请输入',
											emptyText : '请选择'
										}), new Ext.form.TextArea({
											fieldLabel : '职位',
											name : 'sysUser.posName',
											maxLength : 256,
											maxLengthText : "输入的字符不能超过256位"
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.workTypeCode',
											fieldLabel : '工种',
											codeSortCode : '20023',
											blankText : '请输入',
											emptyText : '请选择'
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.techLevelCode',
											fieldLabel : '技术级别',
											codeSortCode : '30019',
											// allowBlank:false,
											blankText : '请输入',
											emptyText : '请选择'
										}), new gdc.component.DateField({
											fieldLabel : '出生年月',
											name : 'sysUser.ymd',
											maxLength : 19,
											maxLengthText : "输入的字符不能超过19位"
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.degreeCode',
											fieldLabel : '文化程度',
											codeSortCode : '30006',
											blankText : '请输入',
											emptyText : '请选择'
										}), new Ext.form.TextField({
											fieldLabel : '手机号码',
											name : 'sysUser.mobile',
											maxLength : 32,
											maxLengthText : "输入的字符不能超过32位"
										}), new Ext.form.TextField({
											fieldLabel : '办公电话',
											name : 'sysUser.officeTel',
											maxLength : 32,
											maxLengthText : "输入的字符不能超过32位"
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.srvLevelCode',
											fieldLabel : '服务等级',
											codeSortCode : '17041',
											blankText : '请输入',
											emptyText : '请选择'
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.certFlag',
											fieldLabel : '持证标志',
											codeSortCode : '30022',
											blankText : '请输入',
											emptyText : '请选择'
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.fixedFlag',
											fieldLabel : '定编标志',
											codeSortCode : '30022',
											blankText : '请输入',
											emptyText : '请选择'
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.onPosFlag',
											fieldLabel : '在岗标志',
											codeSortCode : '30022',
											blankText : '请输入',
											emptyText : '请选择'
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.professionCode',
											fieldLabel : '专业',
											codeSortCode : '30036',
											blankText : '请输入',
											emptyText : '请选择'
										}), new gdc.component.DateField({
											fieldLabel : '本专业工作日期',
											name : 'sysUser.professionBgnDate',
											maxLength : 19,
											maxLengthText : "输入的字符不能超过19位"
										}), new gdc.component.DateField({
											fieldLabel : '工作日期',
											name : 'sysUser.joinDate',
											maxLength : 19,
											maxLengthText : "输入的字符不能超过19位"
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.politicalStatusCode',
											fieldLabel : '政治面貌',
											codeSortCode : '30007',
											blankText : '请输入',
											emptyText : '请选择'
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.titleLevelCode',
											fieldLabel : '职称级别',
											codeSortCode : '30008',
											blankText : '请输入',
											emptyText : '请选择'
										}), new Ext.form.TextArea({
											name : 'sysUser.title',
											fieldLabel : '职称',
											maxLength : 256,
											maxLengthText : "输入的字符不能超过256位"
										}), new gdc.code.ComboBox({
											hiddenName : 'sysUser.statusCode',
											fieldLabel : '调退亡',
											codeSortCode : '30021',
											blankText : '请输入',
											emptyText : '请选择'
										}), new Ext.form.TextArea({
											fieldLabel : '备注',
											name : 'sysUser.remark',
											maxLength : 256,
											maxLengthText : "输入的字符不能超过256位"
										})]
					}]
				}]
			
			});
			//Ext.getCmp('addsysUserSpecialOrgId').setValue(com.frontier.gdc.system.userMgr.ausoi);
			//Ext.getCmp('addsysUserSpecialOrgName').setValue(com.frontier.gdc.system.userMgr.auson);
			com.frontier.gdc.system.userMgr.addFormWin = new Ext.Window({
				layout : 'fit',
				width : 580,
				height : 380,
				closeAction : 'hide',
				plain : true,
				autoScroll : true,
				modal : true,
				title : '新增用户信息',
				items : sysUserAddForm,
				// 添加内陷的工具条
				tbar : [{
					text : '保存',
					tooltip : '保存',
					iconCls : 'save',
					handler : function() {
						if (sysUserAddForm.form.isValid(sysUserAddForm)) {
							sysUserAddForm.form.submit({
										url : gdc.webContextRoot+ '/user/addUser.action',
										success : function(form, action) {
											sysUserAddForm.form.reset();
											Ext.getCmp('dept').setDisabled(true);
											com.frontier.gdc.system.userMgr.addFormWin.hide();
											Appframe.viewinfdlg.parent.right.show("用户信息新增成功！", true);
											com.frontier.gdc.system.userMgr.userStore.reload();
										},
										failure : function(form, action) {
											// Appframe.viewinfdlg.error.show("用户信息新增失败！");
										},
										waitMsg : '正在保存数据，稍后...'
									});

						}
					}
				}]
			});
		}
		
		sysUserAddForm.form.reset();
		if (document.getElementById('photoId')) {
			Ext.getCmp('photo').setValue(null);
			//document.getElementById('photoId').src = gdc.webContextRoot+"images/desktopIco/34_active.png";
			Ext.getCmp('photoImg').body.update('<img id="photoId" src="'+ gdc.webContextRoot+ 'images/img/34_active.gif">');
		}
		com.frontier.gdc.system.userMgr.addFormWin.show('add');

	}

	// 用户管理-修改
	var synchronizeFlag = null;
	editUserDataSetMgr = function() {
		var _record = grid.getSelectionModel().getSelected();
		if (_record) {
			var rows = grid.getSelections();
			if (rows.length > 1) {
				// Ext.MessageBox.alert("提示","只能选择一条记录修改！");
				Appframe.viewinfdlg.warning.show('只能选择一条记录修改！');
				return;
			}
			userId = rows[0].get("userId");
			synchronizeFlag = rows[0].get("synchronizeFlag");
			if (!com.frontier.gdc.system.userMgr.editFormWin) {
				sysUserEditForm = new gdc.FormPanel({
					labelWidth : 100,
					labelAlign : 'right',
					frame : true,
					bodyStyle : 'padding:5px 5px 0',
					width : 530,
					autoScroll : true,
					fileUpload : true,
					waitMsgTarget : true,
					reader : _sysUserJsonFormReader,
					items : [
				
					{
						layout : 'table',
						width : 525,
						layoutConfig : {
							columns : 2
						},
						defaults : {
							frame : true,
							width : 200
						},
						border : false,
						items : [{
							layout : 'form',
							width : 350,
							height : 200,
							border : false,
							defaults : {frame : true,width : 200},
							items : [
									{
										xtype : 'textfield',
										fieldLabel : '用户ID',
										name : 'sysUser.userId',
										hideLabel : true,
										hidden : true
									},
									new Ext.form.Hidden({
												id : 'synchronizeFlag',
												fieldLabel : '同步标示',
												name : 'sysUser.synchronizeFlag'
											}),
									new Ext.form.Hidden({
												id : 'isAvaliable',
												fieldLabel : '启用标示',
												name : 'sysUser.isAvaliable'
											}),
									new Ext.form.Hidden({
												id : 'loginName',
												fieldLabel : '登录名',
												name : 'sysUser.loginName'
											}),
									new Ext.form.Hidden({
												id : 'password',
												fieldLabel : '密码',
												name : 'sysUser.password'
											}),
									new Ext.form.Hidden({
												id : 'deleteFlag',
												fieldLabel : '删除标记',
												name : 'sysUser.deleteFlag'
											}),
									new Ext.form.Hidden({
												id : 'workSpecialOrgName',
												fieldLabel : '工作业务组织名称',
												name : 'sysUser.workSpecialOrgName'
											}),
									{
										id : 'editUserName',
										xtype : 'textfield',
										fieldLabel : '用户名称',
										name : 'sysUser.userName',
										regex : /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
										regexText : "不允许输入非法值",
										allowBlank : false,
										maxLength : 32,
										maxLengthText : '输入的字符长度不能超过32个'
									},
									
									new Ext.form.Hidden({
												id : 'sysUserWorkSpecialOrgId',
												name : 'sysUser.workSpecialOrgId'
											}),
									new gdc.common.comboboxTree.comboxWithTree(
											{
												fieldLabel : '所属单位名称',
												treeType : 'USER_ORG_SUO',
												hiddenName : 'sysUserWorkSpecialOrgId',
												treeId : 'orgId',
												id : 'sysUserWorkSpecialOrgName',
												allowBlank : false,
												select:function(node){
													if(node){
														Ext.getCmp('deptOfEdit').setDisabled(false);
														com.frontier.gdc.system.userMgr.soi = '';
														Ext.getCmp('deptOfEdit').setValue('');
														var deptStore = Ext.getCmp('deptOfEdit').getStore();
														deptStore.baseParams.specialOrgId = node.id;
														deptStore.reload();
													}
												}
											}),		
									new Ext.form.ComboBox({
											id:'deptOfEdit',
											fieldLabel : '所属部门名称',
											triggerAction:'all',
											allowBlank : false,
											disabled:true,
											store:new Ext.data.Store({
									 			proxy:new Ext.data.HttpProxy({
													timeout : 300000,
													url:gdc.webContextRoot+'/specialOrg/findDeptByOrgId.action'
												}),
												reader: new Ext.data.JsonReader({
													totalProperty:"totalPorperty",
													root:"",
													fields:[{name: 'specialOrgName'},{name: 'specialOrgId'}]
												}),listeners:{
													load:function(){
														Ext.getCmp('deptOfEdit').setValue(com.frontier.gdc.system.userMgr.soi);
													}
												}
											}),
											valueField:'specialOrgId',
											displayField:'specialOrgName',
											mode:'local',
											hiddenName:'sysUser.specialOrgId',
											emptyText:'请选择',
											forceSelection:true,
											resizable:true
										}),
									 new gdc.code.ComboBox({
												hiddenName : 'sysUser.sex',
												fieldLabel : '性别',
												codeSortCode : '30009',
												allowBlank : false,
												blankText : '请输入',
												emptyText : '请选择'
											}), 
										new gdc.component.DateField({
												fieldLabel : '密码有效期',
												name : 'sysUser.passwordDate',
												maxLength : 19,
												allowBlank : false,
												maxLengthText : "输入的字符不能超过19位"
										}),
										new Ext.form.FileUploadField({
											id : 'photoEdit',
											fieldLabel : '相片',
											name : 'photo',
											fileType:'jpg,bmp,gif,png',
											listeners : {
												fileselected : function() {
													if (window.navigator.userAgent.indexOf("MSIE")>=1) { 
									                   document.getElementById('photoImgEdit').src = this.value;
									                } 
									                //firefox 
									                else if(window.navigator.userAgent.indexOf("Firefox")>=1) { 
									                     document.getElementById('photoImgEdit').src = this.fileInput.dom.files.item(0).getAsDataURL();
									                } 
												}
											}
										})
				
							]
						}, {
							id:'photoPanel',
							width : 176,
							height : 200,
							defaults : {frame : true},
							border : false,
							layout:'fit',
							autoScroll : true,
				//			tbar:[
				//				{
				//					text:'显示照片',
				//					handler:function(){
				//						Ext.getCmp('photoPanel').body.update('<img id="photoIdOfEdit" src="'+ gdc.webContextRoot+'showUserPhoto?userId='+userId+'">');
				//					}
				//				}
				//			],
							html:'<img id="photoImgEdit">'
						}, {
							colspan : 2,
							width : 522,
							layout : 'form',
							defaults : {
								frame : true,
								width : 400
							},
							border : false,
							items : [	new Ext.form.TextField({
												fieldLabel : '人员编号',
												name : 'sysUser.empId',
												// allowBlank:false,
												maxLength : 32,
												maxLengthText : "输入的字符不能超过32位"
											}),new Ext.form.TextField({
												fieldLabel : '工号',
												name : 'sysUser.staffId',
												// allowBlank:false,
												maxLength : 32,
												maxLengthText : "输入的字符不能超过32位"
											}), new gdc.code.ComboBox({
												id:'poisition',
												hiddenName : 'sysUser.poisition',
												fieldLabel : '岗位',
												codeSortCode : '20021',
												// allowBlank:false,
												blankText : '请输入',
												emptyText : '请选择'
											}), new Ext.form.TextArea({
												fieldLabel : '职位',
												name : 'sysUser.posName',
												// allowBlank:false,
												maxLength : 256,
												maxLengthText : "输入的字符不能超过256位"
											}), new gdc.code.ComboBox({
												id:'workTypeCode',
												hiddenName : 'sysUser.workTypeCode',
												fieldLabel : '工种',
												codeSortCode : '20023',
												// allowBlank:false,
												blankText : '请输入',
												emptyText : '请选择'
											}), new gdc.code.ComboBox({
												id:'techLevelCode',
												hiddenName : 'sysUser.techLevelCode',
												fieldLabel : '技术级别',
												codeSortCode : '30019',
												// allowBlank:false,
												blankText : '请输入',
												emptyText : '请选择'
											}), new gdc.component.DateField({
												fieldLabel : '出生年月',
												name : 'sysUser.ymd',
												// allowBlank:false,
												// readOnly:true,
												maxLength : 19,
												maxLengthText : "输入的字符不能超过19位"
											}), new gdc.code.ComboBox({
												id:'degreeCode',
												hiddenName : 'sysUser.degreeCode',
												fieldLabel : '文化程度',
												codeSortCode : '30006',
												// allowBlank:false,
												blankText : '请输入',
												emptyText : '请选择'
											}), new Ext.form.TextField({
												fieldLabel : '手机号码',
												name : 'sysUser.mobile',
												// allowBlank:false,
												maxLength : 32,
												maxLengthText : "输入的字符不能超过32位"
											}), new Ext.form.TextField({
												fieldLabel : '办公电话',
												name : 'sysUser.officeTel',
												// allowBlank:false,
												maxLength : 32,
												maxLengthText : "输入的字符不能超过32位"
											}), new gdc.code.ComboBox({
												id:'srvLevelCode',
												hiddenName : 'sysUser.srvLevelCode',
												fieldLabel : '服务等级',
												codeSortCode : '17041',
												// allowBlank:false,
												blankText : '请输入',
												emptyText : '请选择'
											}), new gdc.code.ComboBox({
												id:'certFlag',
												hiddenName : 'sysUser.certFlag',
												fieldLabel : '持证标志',
												codeSortCode : '30022',
												// allowBlank:false,
												blankText : '请输入',
												emptyText : '请选择'
											}), new gdc.code.ComboBox({
												id:'fixedFlag',
												hiddenName : 'sysUser.fixedFlag',
												fieldLabel : '定编标志',
												codeSortCode : '30022',
												// allowBlank:false,
												blankText : '请输入',
												emptyText : '请选择'
											}), new gdc.code.ComboBox({
												id:'onPosFlag',
												hiddenName : 'sysUser.onPosFlag',
												fieldLabel : '在岗标志',
												codeSortCode : '30022',
												// allowBlank:false,
												blankText : '请输入',
												emptyText : '请选择'
											}), new gdc.code.ComboBox({
												id:'professionCode',
												hiddenName : 'sysUser.professionCode',
												fieldLabel : '专业',
												codeSortCode : '30036',
												// allowBlank:false,
												blankText : '请输入',
												emptyText : '请选择'
											}), new gdc.component.DateField({
												fieldLabel : '本专业工作日期',
												name : 'sysUser.professionBgnDate',
												// allowBlank:false,
												// readOnly:true,
												maxLength : 19,
												maxLengthText : "输入的字符不能超过19位"
											}), new gdc.component.DateField({
												fieldLabel : '工作日期',
												name : 'sysUser.joinDate',
												// allowBlank:false,
												// readOnly:true,
												maxLength : 19,
												maxLengthText : "输入的字符不能超过19位"
											}), new gdc.code.ComboBox({
										id:'politicalStatusCode',
										hiddenName : 'sysUser.politicalStatusCode',
										fieldLabel : '政治面貌',
										codeSortCode : '30007',
										// allowBlank:false,
										blankText : '请输入',
										emptyText : '请选择'
									}), new gdc.code.ComboBox({
												id:'titleLevelCode',
												hiddenName : 'sysUser.titleLevelCode',
												fieldLabel : '职称级别',
												codeSortCode : '30008',
												// allowBlank:false,
												blankText : '请输入',
												emptyText : '请选择'
											}), new Ext.form.TextArea({
												name : 'sysUser.title',
												fieldLabel : '职称',
												// allowBlank:false,
												maxLength : 256,
												maxLengthText : "输入的字符不能超过256位"
											}), new gdc.code.ComboBox({
												id:'statusCode',
												hiddenName : 'sysUser.statusCode',
												fieldLabel : '调退亡',
												codeSortCode : '30021',
												// allowBlank:false,
												blankText : '请输入',
												emptyText : '请选择'
											}), new Ext.form.TextArea({
												fieldLabel : '备注',
												name : 'sysUser.remark',
												// allowBlank:false,
												maxLength : 256,
												maxLengthText : "输入的字符不能超过256位"
											})]
						}]
					}]
				});

				com.frontier.gdc.system.userMgr.editFormWin = new Ext.Window({
					layout : 'fit',
					width : 580,
					height : 380,
					closeAction : 'hide',
					plain : true,
					modal : true,
					title : '修改用户信息',
					items : sysUserEditForm,
					// 添加内陷的工具条
					tbar : [{
						text : '保存',
						tooltip : '保存',
						iconCls : 'save',
						handler : function() {
							if (sysUserEditForm.form.isValid(sysUserEditForm)) {
								var editUserName = sysUserEditForm.findById("editUserName").getValue();
								// alert(editUserName);
								//var sysUserSpecialOrgName = sysUserEditForm.findById("deptOfEdit").getValue();
								// alert(sysUserSpecialOrgName);
								nodeId = Ext.getCmp("deptOfEdit").getValue();
								com.frontier.gdc.system.userMgr.editFormWin.hide();
								sysUserEditForm.form.submit({
									url : gdc.webContextRoot+ '/user/updateSysUser.action',
									success : function(form, action) {
										sysUserEditForm.form.reset();
										Appframe.viewinfdlg.parent.right.show("用户信息修改成功！", true);
										com.frontier.gdc.system.userMgr.userStore.reload();
									},
									failure : function(form, action) {},
									waitMsg : '正在保存数据，稍后...',
									params : {
										//'sysUser.specialOrgName' : sysUserSpecialOrgName
									}
								});

							}
						}
					}]
				});
			}
			com.frontier.gdc.system.userMgr.editFormWin.show('Edit');
			
			if(synchronizeFlag=='Y'){
				 Ext.getCmp("editUserName").disable();
				 Ext.getCmp("deptOfEdit").disable();
			 }else{
				 Ext.getCmp("editUserName").setDisabled(false);
				 Ext.getCmp("deptOfEdit").setDisabled(false);
			 }
			 
			Ext.getCmp('photoEdit').setValue(null);
			Ext.getCmp('photoPanel').body.update('<img id="photoImgEdit" src="'+ gdc.webContextRoot+'showUserPhoto?userId='+userId+'&random='+Math.random()+'" onerror="javascript:document.getElementById(\'photoImgEdit\').src =\'' + gdc.webContextRoot+ 'images/img/34_active.gif\'">');
			//'document.getElementById('photoImgEdit').src = gdc.webContextRoot+'showUserPhoto?userId='+userId+'&random='+Math.random();
			sysUserEditForm.form.load({
						url : gdc.webContextRoot + '/user/editUserQuery.action',
						params : {
							"userId" : userId
						},
						success : function(form,action) {
							setComboxTreeValue('sysUserWorkSpecialOrgId','sysUserWorkSpecialOrgName', 'ORG',null);
							//setComboxTreeValue('sysUserSpecialOrgId','sysUserSpecialOrgName', 'ORG', response);
							var resl = action.response.responseText;
							var resObj = eval('(' + resl + ')'); 
							var list = resObj.list;
							var wsoi = list[0].workSpecialOrgId;
							com.frontier.gdc.system.userMgr.soi = list[0].specialOrgId;
							var deptStore = Ext.getCmp('deptOfEdit').getStore();
							deptStore.baseParams.specialOrgId = wsoi;
							deptStore.reload();
							
							if( list[0].poisition==null){
								sysUserEditForm.findById('poisition').setValue('');
							}
							if( list[0].workTypeCode==null){
								sysUserEditForm.findById('workTypeCode').setValue('');
							}
							if( list[0].techLevelCode==null){
								sysUserEditForm.findById('techLevelCode').setValue('');
							}
							if( list[0].degreeCode==null){
								sysUserEditForm.findById('degreeCode').setValue('');
							}
							if( list[0].srvLevelCode==null){
								sysUserEditForm.findById('srvLevelCode').setValue('');
							}
							if( list[0].certFlag==null){
								sysUserEditForm.findById('certFlag').setValue('');
							}
							if( list[0].fixedFlag==null){
								sysUserEditForm.findById('fixedFlag').setValue('');
							}
							if( list[0].onPosFlag==null){
								sysUserEditForm.findById('onPosFlag').setValue('');
							}
							if( list[0].professionCode==null){
								sysUserEditForm.findById('professionCode').setValue('');
							}
							if( list[0].politicalStatusCode==null){
								sysUserEditForm.findById('politicalStatusCode').setValue('');
							}
							if( list[0].titleLevelCode==null){
								sysUserEditForm.findById('titleLevelCode').setValue('');
							}
							if( list[0].statusCode==null){
								sysUserEditForm.findById('statusCode').setValue('');
							}
							
						},
						waitMsg : '正在载入数据...'
					});
		} else {
			Appframe.viewinfdlg.warning.show('请选择要修改的一项！');
		}
	}

	// 用户管理-删除
	delUserDataSetMgr = function(quiteDelete) {
		var _record = grid.getSelectionModel().getSelected();
		if (_record) {
			Ext.MessageBox.confirm('提示', '你确认要删除这条数据吗？', function(btn) {
				if (btn == "yes") {
					try {
						var rows = grid.getSelections();
						var synchronizeFlag;
						for (var k = 0; k < rows.length; k++) {
							synchronizeFlag = rows[k].get("synchronizeFlag");
							if (synchronizeFlag == 'Y') {
								Appframe.viewinfdlg.warning
										.show('同步过来的用户不能删除！');
								return false;
							}
						}
						var jsonData = "";
						for (var i = 0, len = rows.length; i < len; i++) {
							var id = rows[i].get("userId");
							if (i == 0) {
								jsonData = jsonData + id;
							} else {
								jsonData = jsonData + "," + id;
							}
							// ds.remove(rows[i]);
						}
						/*
						 * var httpProxy = new Ext.data.HttpProxy({
						 * url:gdc.webContextRoot+'/user/deleteUser.action' });
						 * httpProxy.load({ "userIds": jsonData });
						 */

						Ext.Ajax.request({
									url : gdc.webContextRoot
											+ '/user/deleteUser.action',
									params : {
										"userIds" : jsonData,
										"quiteDelete":quiteDelete
									},
									// timeout : 300000,
									success : function(result, request) {
										var resl = result.responseText;
										var resObj = eval('(' + resl + ')');
										if (resObj.success == true) {
											Appframe.viewinfdlg.right.show(
													"用户删除成功！", true);
											com.frontier.gdc.system.userMgr.userStore
													.reload();
										}
									},
									failure : function(form, action) {
										// Appframe.viewinfdlg.right.show("用户删除失败！");
									},
									waitMsg : '正在删除，稍后...'
								});
					} catch (e) {
						Appframe.viewinfdlg.right.show("用户删除失败！");
					}

				}
			});
		} else {
			// Ext.MessageBox.alert('提示', '请选择要删除的数据项！');
			Appframe.viewinfdlg.warning.show('请选择要删除的用户！');
		}

	}

	// 用户数据集合管理
	var userDataSetMgr = function() {
		var _record = grid.getSelectionModel().getSelected();
		if (_record) {
			var rows = grid.getSelections();
			if (rows.length > 1) {
				// Ext.MessageBox.alert("提示","只能选择一条记录做用户数据集合管理！");
				Appframe.viewinfdlg.warning.show('只能选择一条记录做用户数据集合管理！');
				return;
			}
			userId = rows[0].get("userId");
			if (!com.frontier.gdc.system.userMgr.userDataSetWin) {
				com.frontier.gdc.system.userMgr.initUserDataSetGrid();
			}
			com.frontier.gdc.system.userMgr.userDataSetWin.show();
			com.frontier.gdc.system.userMgr.userDatasetStore.load();
		} else {
			// Ext.MessageBox.alert('提示', '请选择要管理的用户！');
			Appframe.viewinfdlg.warning.show('请选择要管理的用户！');
		}
	};

	/*
	 * 同步用户
	 */
	synchronizedUser = function() {
		if(!com.frontier.gdc.system.userMgr.userSynWindow){
			com.frontier.gdc.system.userMgr.userSynWindow = new Ext.Window({
				title:'人员同步',
				layout:'fit',
				closeAction:'hide',
				width:300,
				height:100,
				tbar:[
					{
						text:'同步',
						iconCls:'add',
						handler:function(){
							Ext.MessageBox.show({
								title : '提示',
								msg : '正在与服务器同步数据...',
								width : 220,
								wait : true,
								waitConfig : {
									interval : 400
								}
							});
							var userCode = Ext.getCmp('userCode').getValue();
							Ext.Ajax.request({
								url : gdc.webContextRoot+ '/user/synchronizedUser.action?uid='+userCode,
								timeout : 300000,
								success : function(result, request) {
									var resl = result.responseText;
									var resObj = eval('(' + resl + ')');
									if (resObj.success == true) {
										Ext.MessageBox.hide();
										com.frontier.gdc.system.userMgr.userSynWindow.hide();
										Appframe.viewinfdlg.right.show("用户同步成功！", true);
										com.frontier.gdc.system.userMgr.userStore.reload();
									}
								}
							});
						}
					}
				],
				items:[
					new Ext.form.FormPanel({
						labelWidth : 95, // label settings here cascade unless overridden
						frame : true,
						labelAlign : 'right',
						bodyStyle : 'padding:2px 2px 0',
						items:[
							new Ext.form.TextField({
								id:'userCode',
								fieldLabel:'员工号'
							})
						]
					})
				]
			});
		}
		com.frontier.gdc.system.userMgr.userSynWindow.show();
	};

	// com.frontier.gdc.system.userMgr.userStore.reload({
	// params : {
	// start : 0,
	// limit : pageSize,
	// searchName : com.frontier.gdc.system.userMgr.name,
	// spOrgId : com.frontier.gdc.system.userMgr.specialOrgId
	// }
	// });
	return grid;
}

/**
 * 用户管理页面初始化
 */
com.frontier.gdc.system.userMgr.newMainPanel = function() {

	Ext.QuickTips.init();

	/**
	 * 业务组织管理页面布局
	 */
	var mainPanelInit = new Ext.Panel({
				// frame:true,
				bodyStyle : 'padding:0px 0px 0',
				width : Ext.lib.Dom.getViewWidth(),
				height : Ext.lib.Dom.getViewHeight(),
				layout : 'fit',
				items : [{
					// border : false,
					layout : 'border',
					items : [{
						region : 'west',
						title : '用户管理导航树菜单',
						split : true,
						width : 300,

						maxSize : 400,
						collapsible : true,
						// margins : '0 0 0 5',
						layout : 'fit',
						items : com.frontier.gdc.system.userMgr
								.specialOrgTree()
					}, {
						region : 'center',
						layout : 'fit',
						items : [com.frontier.gdc.system.userMgr.userGrid()],
						tbar : [{
								id : 'add',
								text : '新增',
								tooltip : '新增用户信息',
								iconCls : 'add',
								bizCode : 'add',
								handler : function() {
									addUserDataSetMgr();
								}
							}, '-', {
								id : 'Edit',
								text : '修改',
								tooltip : '修改用户信息',
								iconCls : 'edit',
								bizCode : 'edit',
								handler : function() {
									editUserDataSetMgr();
								}
							}, '-', {
								id : 'delfalg',
								text : '标记删除',
								tooltip : '删除用户信息',
								iconCls : 'remove',
								bizCode : 'flagRemove',
								handler : function() {
									delUserDataSetMgr('false');
								}
							}, '-', {
								id : 'del',
								text : '完全删除',
								tooltip : '删除用户信息',
								iconCls : 'remove',
								bizCode : 'remove',
								handler : function() {
									delUserDataSetMgr('true');
								}
							}, '-', {
								id : 'synchronizer',
								text : '同步',
								tooltip : '同步',
								iconCls : 'add',
								bizCode : 'syn',
								handler : function() {
									synchronizedUser();
								}
							}, 
 
							'-', {
								text : '角色管理',
								tooltip : '角色管理',
								iconCls : 'edit',
								bizCode : 'roManager',
								handler : function() {
									userRole();
								}
							}
					]
					}]
				}]

			});
	return mainPanelInit;
}

/**
 * 本功能的功能参数，用于打开本功能框架使用
 * 
 * @type
 */
com.frontier.gdc.system.userMgr.mdlCfg = {
	mustRole : false,
	funcBtnControl : true
};

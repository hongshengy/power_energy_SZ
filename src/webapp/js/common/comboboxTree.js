/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统 下拉树封装</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.common.comboboxTree");

/**
 * 重写combobox 事件
 */
//Ext.override(Ext.form.ComboBox, {
//	initEvents : function(){
//		Ext.form.ComboBox.superclass.initEvents.call(this);
//		this.keyNav = new Ext.KeyNav(this.el, {
//			"up" : function(e){
//				this.inKeyMode = true;
//				this.selectPrev();
//			},
//			"down" : function(e){
//				if(!this.isExpanded()){
//					this.onTriggerClick();
//				}else{
//					this.inKeyMode = true;
//					this.selectNext();
//				}
//			},
//			"enter" : function(e){
//				this.onViewClick();
//				this.delayedCheck = true;
//				this.unsetDelayCheck.defer(10, this);
//			},
//			"esc" : function(e){
//				this.collapse();
//			},
//			"tab" : function(e){
//				this.onViewClick(false);
//				return true;
//			},
//			scope : this,
//			doRelay : function(foo, bar, hname){
//				if(hname == 'down' || this.scope.isExpanded()){
//				   return Ext.KeyNav.prototype.doRelay.apply(this, arguments);
//				}
//				return true;
//			},
//			forceKeyDown : true
//		});
//		this.queryDelay = Math.max(this.queryDelay || 10,
//				this.mode == 'local' ? 10 : 250);
//		this.dqTask = new Ext.util.DelayedTask(this.initQuery, this);
//		if(this.typeAhead){
//			this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this);
//		}
//		if((this.editable !== false) && !this.enableKeyEvents) {
//			this.el.on("keyup", this.onKeyUp, this);
//		}
//		if(this.forceSelection){
//			this.on('blur', this.doForce, this);
//		}
//	},
//	onKeyUp : function(e){
//		if(this.editable !== false && !e.isSpecialKey()){
//			this.lastKey = e.getKey();
//			this.dqTask.delay(this.queryDelay);
//		}
//		Ext.form.ComboBox.superclass.onKeyUp.call(this, e);
//	}
//});

var hiddencomp = new Ext.form.Hidden({
	id:'hidden1',
	name:'hiddencomp'
});
/**
 * 下拉树封装
 * @class gdc.common.comboboxTree.comboxWithTree
 * @extends Ext.form.ComboBox
 */
gdc.common.comboboxTree.comboxWithTree = Ext.extend(Ext.form.ComboBox,{
	constructor : function(config) {
		var tree;
		var config = config || {};
		var orgNoGw = config['orgNo'];
		if(orgNoGw!=null&&typeof(orgNoGw)!="undefined"&&orgNoGw!=''){
		    orgNoGw = orgNoGw;
		}else{
		    orgNoGw = "";
		}
		var url = "";
		if(config['treeType']=='ORG'){
			url = '/specialOrg/searchSpecialOrgTree.action' 
		}else if(config['treeType']=='ORGALL'){
			//功能：所有单位的下拉框树, gaoLi 2009-11-30
			url = '/specialOrg/findSpecialOrgTree.action' 
		}else if(config['treeType']=='SYS_FUNC'){
			//  系统功能树 liuzhijie 2009-12-10
			url = '/sysFunc/findSysFuncOrObjectTreeOnFunc.action';
		}else if(config['treeType']=='USER_ORG'){
			//  用户所在单位树，ORG树可用于部门树,最下级单位为区县,该类型为用电采集专设 GuoJinHui 2010-09-01
			url = '/specialOrg/searchSpecialOrgForUserTree.action';
		}else if(config['treeType']=='USER_ORG_SUO'){
			//  用户所在单位树，ORG树可用于部门树,最下级单位为供电所，该类型为用电采集专设 gaoLi 2010-12-20
			url = '/specialOrg/searchSpecialOrgForUserTree.action?codeTypes=06';			
		}else if(config['treeType']=='JcCp_USER_ORG'){
            // GengPeng 2013-01-05
            // 用户所在单位树，ORG树可用于部门树,最下级单位为供电所,该类型为【传票管理】，【集抄传票管理】专用。
            url = '/jcvoucherManage/searchSpecialOrgForUserTreeCp.action?codeTypes=06'+"&orgNo="+orgNoGw;
        }else if(config['treeType']=='JC_TMNL_USER_ORG'){
            // GengPeng 2014-07-28
            // 用户所在单位树，ORG树可用于部门树,最下级单位为供电所，为集抄终端调试中更换终端使用。
            url = '/cpDesignCheck/searchSpecialOrgForUserTreeForJcTmnlDebug.action?codeTypes=06'+"&orgNo="+orgNoGw;
        }else if(config['treeType']=='SUBS'){
			//  台区信息下拉树 liuzhijie 2010-12-14
			url = '/objectArea/subsCombox.action';
		}else if(config['treeType']=='TRADE'){
			//  行业数据下拉树 liuzhijie 2010-12-14
			url = '/objectArea/tradeCombox.action';
		}else if(config['treeType']=='QSHTRADE'){
			//  主要行业数据下拉树 qiaoqiming 2012-04-05
			url = '/tradeSort/qshtradeCombox.action?codeTypes=1';
		}else if(config['treeType']=='QSHTRADEDX'){
			//  典型行业数据下拉树 qiaoqiming 2012-04-17
			url = '/tradeSort/qshtradeCombox.action?codeTypes=2';
		}else if(config['treeType']=='USER_ORG_CP'){
			//传票（集中）用户所在树，ORG树可用于部门树,最下级单位为区县，市区用户中有特殊的市区可以有市的权限 Liuxk 2012-10-26
			url = '/voucherManage/searchSpecialOrgForCp.action';
		}else if(config['treeType']=='QUERY_WORK_COMPANY'){
			//用户查询条件下拉框使用 hyh 2011-12-12
			url = '/workCompany/workCompanyCombox.action?isValid=1&isWorking=1';
		}else if(config['treeType']=='NEW_WORK_COMPANY'){
			//在新建页面下拉框中使用 hyh 2011-12-12
			url = '/workCompany/workCompanyCombox.action?isValid=1&isWorking=1';
		}else if(config['treeType']=='QUERY_DATA_TYPE'){
			//用户查询条件下拉框使用 hyh 2012-2-7
			url = '/tmnlParamZD/dataTypeComboxTree.action';
		}else if(config['treeType']=='NEW_DATA_TYPE'){
			//在新建页面下拉框中使用 hyh 2012-2-7
			url = '/tmnlParamZD/dataTypeComboxTree.action';
		}else if(config['treeType']=='USER_ORG_CITY'){
			//供电单位，只到地市 cjh 2014-4-1
            url = '/measureVisual/orgTreeFreeLogin.action';
        }else if(config['treeType']=='QSH_WEB_HY'){
			//全社会web六大行业 zjt 2014-7-15
            url = '/qshSysTree/qshSysHyTree.action?hyFlag='+config['hyFlag'];
            if(config['chkFlag'] && config['chkFlag'] == "true"){
            	url = url + "&chkFlag=true";
            }
        }
		config['readOnly'] = true;    
		var defConfig = {
			store:new Ext.data.SimpleStore({fields:[],data:[[]]}),
	        editable:true,
	        mode: 'local',
	        triggerAction:'all',
	        maxHeight: 200,
	        resizable:true,
	        emptyText:'请选择',
	        minChars : 101, 
	        maxLength :100,
	        maxLengthText :'不能超过100位',
	        tpl: "<div id='"+config['treeId']+",query' style='display:none;position:absolute;width:100%;background-color:#ddeeff;z-index:1;'></div><div style='height:200px'> <div id='"+config['treeId']+"Empty'></div><div id='"+config['treeId']+"'></div></div>",
	        selectedClass:'',
	        onSelect:Ext.emptyFn,
	        initComponent:function(){
				var cbt = this;
				var rootId = '0';
				if(config['treeType']=='SYS_FUNC'){
					rootId = '-100';
				}
				
				//默认root节点
				var rootNode = new Ext.tree.AsyncTreeNode({
					text : '组织机构树',
					draggable : false,
					id : rootId//默认的node值：?node=-100
				});
				var rootVisible = false;
				
				//传入root节点
				if(config['rootId']){
					var rootName = '';
					if(config['rootName']){
						rootName = config['rootName'];
					}
					rootNode = new Ext.tree.AsyncTreeNode({
						text : rootName,
						draggable : false,
						id : config['rootId']
					});
					rootVisible = true;
				}
				
				tree = new Ext.tree.TreePanel({
					//width:300,
					id:config['treeId'],
					loader : new Ext.tree.TreeLoader( {
					 	dataUrl : gdc.webContextRoot+url,
					 	listeners:{
						    'beforeload':function(loader,node) {
						    	this.baseParams.nodeType = node.attributes.type;
						    	if(config['treeType']=='QUERY_WORK_COMPANY' || 'NEW_WORK_COMPANY'==config['treeType']){
						    		this.baseParams.orgNo = node.id;
						    	}
						    	if(config['treeType']=='QUERY_DATA_TYPE' || config['treeType']=='NEW_DATA_TYPE'){
						    		this.baseParams.nodeId = node.id;
						    	}
						    	if(config['treeType']=='ORG' || config['treeType']=='USER_ORG'|| config['treeType']=='USER_ORG_SUO'|| config['treeType']=='USER_ORG_CP'|| config['treeType']=='JcCp_USER_ORG'|| config['treeType']=='USER_ORG_CITY'|| config['treeType']=='JC_TMNL_USER_ORG'){
						    		if (!gdc.isPagePurview) {
										this.baseParams.curRoleID = '';
									} else {
										this.baseParams.curRoleID = gdc.currentRoleId;
									}
						    	}	
						    	if(config['treeType']=='QSH_WEB_HY'){
						    		this.baseParams.hyType = node.attributes.hyType;
						    		this.baseParams.levelNum = node.attributes.levelNum;
						    	}
						    }
						}
					}),
					rootVisible : rootVisible,        
					border:false,
					root:rootNode,
					listeners:{
						load:function(node){
							if(config['treeType']!='QSH_WEB_HY'){
								//自动展开根节点的下级节点
								if(node.id=='0' || node.id=='-100'){
									var childArray = node.childNodes;
									if(childArray){
										for(var c=0;c<childArray.length;c++){
											childArray[c].expand();									
										}
									}
								}
							}
						}
					}
				});
				tree.on('click',function(node){
					if(node.disabled == true){
						Ext.MessageBox.alert('提示','该节点未被授权,请重新授权或选择其它节点!','');
						return false;
					}
					if(config['nodeUnSelect'] && config['nodeUnSelect']=='true'){//全社会web
						return false;
					}
				    if(config['treeType']=='SYS_FUNC'){
						if(node.attributes.type=='SysFunc' && node.leaf==true){
							Ext.getCmp(config['id']).setValue(node.text);
							//取功能id
							var ids =  node.id.split(',');
							var funcId = '';
							if(ids.length>1){
								funcId = ids[1];
							}else{
								funcId = node.id
							}
							Ext.getCmp(config['hiddenName']).setValue(node.attributes.funcUrl+'?funcId='+funcId);
						}else{
							Ext.MessageBox.alert('提示','请选择末级功能节点!','');
						}
					}else{
					/*************qiaoqiming add start*********/
						if(config['treeType']=='TRADE'){
							if(Ext.getCmp("codeSortIdSub") != null 
								&& Ext.getCmp("codeSortIdSub")!=undefined){
								Ext.getCmp("codeSortIdSub").setValue(node.id);
							}
						}
					/*************qiaoqiming add end*********/
						Ext.getCmp(config['id']).setValue(node.text);
						Ext.getCmp(config['hiddenName']).setValue(node.id);
					}
					//施工单位树形结构，只能选择施工单位，下拉框才收缩， 
					if((config['treeType']=='QUERY_WORK_COMPANY' || config['treeType']=='NEW_WORK_COMPANY') && (node.id.substring(0,3)=='ORG')){
						Ext.getCmp(config['id']).setValue("");
						Ext.getCmp(config['hiddenName']).setValue("");
					}else if (config['treeType']=='NEW_DATA_TYPE' && node.attributes.type=='ROOT'){ // 新建的时候，只能选择到数据项
						Ext.getCmp(config['id']).setValue("");
						Ext.getCmp(config['hiddenName']).setValue("");
					}else{
						cbt.collapse();
					}
					  
					// 树的click反控制
					if(config['select']) {
						cbt.fireEvent('blur',cbt);
						config['select'](node);
						
						//传入的根节点自动展开
						if(config['rootId']){
							rootNode.expand();
						}
					}
					
				});
				
				//全社会web处理树的勾选
				if(config['chkFlag'] && config['chkFlag'] == "true"){
					tree.on('checkchange', function(node, checked) {
						Ext.getCmp(config['id']).setValue("");
						Ext.getCmp(config['hiddenName']).setValue("");
						
				        var allChkIds = tree.getChecked();
				        if(allChkIds && allChkIds.length > 0){
				        	var qtcids = "";
				        	var qtcnms = "";
				        	for(var a=0;a<allChkIds.length;a++){
								var il = allChkIds[a].id.split("-");
								var nl = allChkIds[a].text;
								qtcids = qtcids + ";" + il[il.length - 1];
								qtcnms = qtcnms + ";" + nl;
							}
							Ext.getCmp(config['id']).setValue(qtcnms.substr(1));
							Ext.getCmp(config['hiddenName']).setValue(qtcids.substr(1));
				        }
					}, tree);
				}
				
				var empty = new Ext.form.TextField({value:'请选择',width:120,readOnly:true});
				empty.on('focus',function(){
					Ext.getCmp(config['hiddenName']).setValue('');
					Ext.getCmp(config['id']).setValue('');
					Ext.getCmp(config['id']).setRawValue('请选择');
					cbt.collapse();
					if(config['select']) {
						cbt.fireEvent('blur',cbt)
						config['select'](null);
					}
				})
				this.on('expand',function(){
					//该属性用于判断是否显示请选择框，默认显示
					if(!config['nshowEmpty']){
						
						empty.render(config['treeId']+'Empty');
					}
					tree.render(config['treeId']);
				});
				this.on('focus',function(){ 
					gdc.common.comboboxTree.rawValue = this.getRawValue();
				})
//				this.on('blur',function(){
//					if(!Ext.getCmp(config['hiddenName']).getValue() || Ext.getCmp(config['hiddenName']).getValue()==''){
//						this.setRawValue('');
//					}else{
//						var valueNode = tree.getNodeById(Ext.getCmp(config['hiddenName']).getValue());
//						if(valueNode){
//							this.setRawValue(valueNode.text);
//						}else{
//							this.setRawValue(gdc.common.comboboxTree.rawValue);
//						}
//					}
//				});
				gdc.common.comboboxTree.select = config['select'];
				this.on('keyup',function(c,e){
					//如果是地区树或者是地区厂站树 执行事件
					if( config['treeType']=='ORG' ||config['treeType']=='ORGALL'||config['treeType']=='USER_ORG'|| config['treeType']=='USER_ORG_SUO'|| config['treeType']=='USER_ORG_CP'|| config['treeType']=='JcCp_USER_ORG'|| config['treeType']=='USER_ORG_CITY'|| config['treeType']=='JC_TMNL_USER_ORG'){
						//展开下拉框
						this.expand();
						//获取显示div
						var box = document.getElementById(config['treeId']+',query');
						gdc.common.comboboxTree.box = box;
						var rawValue = this.getRawValue();
						// 获取角色信息，视是否OpenModel而定
						var selectedRoleId = '';
						if (gdc.isPagePurview){
							selectedRoleId = gdc.currentRoleId;
						}
						// 树类型
						var treeTypeVar = config['treeType'];
						var param={queryName:rawValue,curRoleID:selectedRoleId,treeTypeName:treeTypeVar};
						//url赋值
						var queryUrl = '';
						if(config['treeType']=='ORG' || config['treeType']=='USER_ORG'|| config['treeType']=='USER_ORG_SUO'|| config['treeType']=='USER_ORG_CP'|| config['treeType']=='JcCp_USER_ORG'|| config['treeType']=='USER_ORG_CITY'||config['treeType']=='JC_TMNL_USER_ORG'){
						    queryUrl = 'specialOrg/searchSpecialOrgByName.action';
						}else if(config['treeType']=='ORGALL'){
						    queryUrl = 'specialOrg/findSpecialOrgByName.action';						    
						}
						//box.innerHTML = '<a id="v" onclick="alert(this.id)">aaaaaaaaa</a><br/><a id="v" onclick="alert(this.id)">bbbbb</a>';
						
						//发送请求  获取查询结果
						if(box){
							box.innerHTML = '正在加载...';
						}
						var queryResult = '';
						//queryResult = '<img src="'+gdc.webContextRoot+'/images/tab-close-on.gif" width="15" align="right" onclick=javascript:'+box+'.style.display="none"><br/>';
						var requestConfig = {
					  	   url: gdc.webContextRoot+queryUrl,
						   params: param,
						   callback:function(options,success,response){
						   		var rt = response.responseText;
						   		//var result = eval(rt);
						   		var result = jsonDecode(rt);
						   		for(var i=0;i<result.length;i++){
						   			if(config['treeType']=='ORG' || config['treeType']=='USER_ORG'|| config['treeType']=='USER_ORG_SUO'|| config['treeType']=='USER_ORG_CP'|| config['treeType']=='JcCp_USER_ORG'|| config['treeType']=='USER_ORG_CITY'||config['treeType']=='JC_TMNL_USER_ORG'){
										queryResult += '<img src="'+gdc.webContextRoot+'/images/station_icon_area.gif"><span  style="cursor:pointer;" id="'+result[i].specialOrgId+'" onclick=javascript:gdc.common.comboboxTree.setValueByQuery("'+result[i].specialOrgName.trim()+'",'+result[i].specialOrgId+',"'+config["id"]+'","'+config["hiddenName"]+'")><font size="2">'+result[i].specialOrgName.trim()+'</font></span><br/>';
									}else if(config['treeType']=='ORGALL'){
										queryResult += '<img src="'+gdc.webContextRoot+'/images/station_icon_area.gif"><span  style="cursor:pointer;" id="'+result[i].specialOrgId+'" onclick=javascript:gdc.common.comboboxTree.setValueByQuery("'+result[i].specialOrgName.trim()+'",'+result[i].specialOrgId+',"'+config["id"]+'","'+config["hiddenName"]+'")><font size="2">'+result[i].specialOrgName.trim()+'</font></span><br/>';									
									}
						   		}
						   		if(box){
						   			box.innerHTML = queryResult;
						   		}
						   }
						}
						Ext.Ajax.request(requestConfig);
						
						//如果有输入字母显示div，否则隐藏
						if(rawValue && rawValue.length>0){
							if(box){
								box.style.display="inline";
							}
						}else{
							if(box){
								box.style.display="none";
							}
						}
					}
				});
				
//			},
//			restrictHeight : function(){
//		        this.innerList.dom.style.height = '';
//		        var inner = this.innerList.dom;
//		        var pad = this.list.getFrameWidth('tb')+(this.resizable?this.handleHeight:0)+this.assetHeight;
//		        var h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight);
//		        var ha = this.getPosition()[1]-Ext.getBody().getScroll().top;
//		        var hb = Ext.lib.Dom.getViewHeight()-ha-this.getSize().height;
//		        var space = Math.max(ha, hb, this.minHeight || 0)-this.list.shadowOffset-pad-5;
//		        h = Math.min(h, space, this.maxHeight);
//		
//		        var innerWidth = this.width;
//		        this.innerList.setHeight(h+100);
//		        this.innerList.setWidth(this.width+50);
//		        this.list.beginUpdate();
//		        this.list.setHeight(h+pad+100);
//		        this.list.setWidth(this.width+50);
//		        this.list.alignTo(this.wrap, this.listAlign);
//		        this.list.endUpdate();
			}
		};
		Ext.applyIf(config, defConfig);	
		gdc.common.comboboxTree.comboxWithTree.superclass.constructor.call(this, config);	
    }
});

/**
 * 赋值
 * @param {} name   值name
 * @param {} id     值id
 * @param {} comboxWithTreeId comboxwithtree  id
 * @param {} hiddenName   隐藏域id
 */
gdc.common.comboboxTree.setValueByQuery = function(name,id,comboxWithTreeId,hiddenName){
	gdc.common.comboboxTree.rawValue = name;
	Ext.getCmp(comboxWithTreeId).setValue(name);
	Ext.getCmp(hiddenName).setValue(id);
	Ext.getCmp(comboxWithTreeId).collapse();
	gdc.common.comboboxTree.box.style.display="none";
	
	var tnode = new Ext.tree.TreeNode({id:id,text:name});
	if(gdc.common.comboboxTree.select){
		gdc.common.comboboxTree.select(tnode);
	}
}

/**
 * 下拉树填充方法
 * @param {} hiddenId     保存值得隐藏field id
 * @param {} comboxTreeId 下拉树id
 * @param {} codeType     树类型
 * @param {} response     请求回复对象
 */
function setComboxTreeValue(hiddenId,comboxTreeId,codeType,response){
	if(codeType=='SUBS' || codeType=='TRADE'|| codeType=='QSHTRADE' || codeType=='QUERY_WORK_COMPANY' || codeType=='QUERY_DATA_TYPE'){
		return;
	}
	if(codeType=='USER_ORG_CP'||codeType=='JcCp_USER_ORG'||codeType=='USER_ORG_CITY'||codeType=='JC_TMNL_USER_ORG'){
		//传票（集中） 特殊的供电单位 树结构，特定的区级岗位 可以有市级岗位的查询权限.
		codeType = 'USER_ORG'
	}
	var hiddenValue = Ext.getCmp(hiddenId).getValue();
	var name = '';

	var url = '/common/searchNameByCode.action';
	if(codeType=='NEW_WORK_COMPANY'){
		if(!hiddenValue){
			return;
		}
		url = '/workCompany/searchNameByCode.action';
	}else if(codeType=='NEW_DATA_TYPE'){ //参数整定数据项
		if(!hiddenValue){
			return;
		}
		url = '/tmnlParamZD/searchNameByCode.action';
	}
	var requestConfig = {
  	   url: gdc.webContextRoot+url,
	   params: {codeId:hiddenValue,codeType:codeType},
	   callback:function(options,success,response){
	   		name = response.responseText;
	   		name = name.replace("'","");
	   		name = name.replace("'","");
	   		Ext.getCmp(comboxTreeId).setValue(name);
	   }
	}
	Ext.Ajax.request(requestConfig);
}
function jsonDecode(data){
    return new Function("return " + data + ";")();
}
/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统 条件级联下拉树封装</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.common.comboboxComboboxTree");
var hiddencomp = new Ext.form.Hidden({
					id:'hidden1',
					name:'hiddencomp'
				});
/**
 * 下拉树封装
 * @class gdc.common.comboboxTree.comboxWithTree
 * @extends Ext.form.ComboBox
 */
gdc.common.comboboxComboboxTree.comboboxWithComboboxTree = Ext.extend(Ext.form.ComboBox,{
	constructor : function(config) {
		var tree;
		var config = config || {};
		var url = "stationManage/findTreeByTypeAttr.action";
		
		var defConfig = {
			store:new Ext.data.SimpleStore({fields:[],data:[[]]}),
	        editable:false,
	        mode: 'local',
	        triggerAction:'all',
	        maxHeight: 200,
	        tpl: "<div style='height:200px'><div id='"+config['treeId']+"Empty'></div><div id='"+config['treeId']+"'></div></div>",
	        selectedClass:'',
	        onSelect:Ext.emptyFn,
			initComponent:function(){
				var cbt = this;
				tree = new Ext.tree.TreePanel({
					id:config['treeId'],
					loader : new Ext.tree.TreeLoader( {
					 	dataUrl : gdc.webContextRoot+url,
					 	listeners:{'beforeload':function(loader,node) {
					 			if(config['station_Type']){
						    		this.baseParams.station_Type = config['station_Type'];
					 			}
						    	if(config['station_Attr']){
						    		this.baseParams.station_Attr = config['station_Attr'];
						    	}
						    	if(config['showFlag']){
						    		this.baseParams.showFlag = config['showFlag'];
						    	}						    	
						    }
						}
					}),
					rootVisible : false,        
					border:false,
					root:new Ext.tree.AsyncTreeNode({
						text : '组织机构树',
						draggable : false,
						id : '0'//默认的node值：?node=-100
					})
				});
				tree.on('click',function(node){
					if(config['treeType']=='AREASTATION'){
						if((node.attributes.iconCls.indexOf('station_icon_')>-1 && node.attributes.iconCls!='station_icon_area') || !node.attributes.iconCls){
							Ext.getCmp(config['id']).setValue(node.text);
							Ext.getCmp(config['hiddenName']).setValue(node.id);
						}else{
							Ext.MessageBox.alert('提示','请选择地区下的厂站!','');
						}
					}else if(config['treeType']=='AREA_ONLY_UNIT'){
						if((node.attributes.iconCls.indexOf('station_icon_')>-1 && node.attributes.iconCls!='station_icon_area') || !node.attributes.iconCls){
							Ext.getCmp(config['id']).setValue(node.text);
							Ext.getCmp(config['hiddenName']).setValue(node.id);
						}else{
							Ext.MessageBox.alert('提示','请选择地区下的电厂!','');
						}
					}else{
						Ext.getCmp(config['id']).setValue(node.text);
						Ext.getCmp(config['hiddenName']).setValue(node.id);
					}
					cbt.collapse();
					  
					// 树的click反控制
					if(config['select']) {
					config['select'](node);
					}
				});
				var empty = new Ext.form.TextField({value:'请选择',width:225});
				empty.on('focus',function(){
					Ext.getCmp(config['id']).setValue('');
					Ext.getCmp(config['hiddenName']).setValue('');
					cbt.collapse();
				})
				this.on('expand',function(){
					empty.render(config['treeId']+'Empty');
					tree.render(config['treeId']);
				});
				
			}
		};
		Ext.applyIf(config, defConfig);	
		gdc.common.comboboxComboboxTree.comboboxWithComboboxTree.superclass.constructor.call(this, config);	
    }
});
/**
 * 下拉树填充方法
 * @param {} hiddenId     保存值得隐藏field id
 * @param {} comboxTreeId 下拉树id
 * @param {} codeType     树类型
 * @param {} response     请求回复对象
 */
function setComboxTreeValue(hiddenId,comboxTreeId,codeType,response){
	var hiddenValue = Ext.getCmp(hiddenId).getValue();
	var name = '';
	var url = '/common/searchNameByCode.action';
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
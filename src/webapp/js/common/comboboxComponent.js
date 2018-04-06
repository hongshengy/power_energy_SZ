/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统 统一代码下拉框封装 s</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.code");
 /**
  * 统一代码下拉框封装
  * config['store'] 如果有值不再进行删除，否则根据codeSortCode进行查询
  * @class gdc.code.ComboBox
  * @extends Ext.form.ComboBox
  */
gdc.code.ComboBox = Ext.extend(Ext.form.ComboBox, {
	constructor : function(config) {
		var config = config || {};
		var store = config['store'];
		if(store==null){
			store = new Ext.data.Store({
	 			baseParams:{ 'codeSortCode' : config['codeSortCode']},
				proxy:new Ext.data.HttpProxy({
					timeout : 300000,
					url:gdc.webContextRoot+'/common/loadCodeComboBox.action'
				}),
				//fields: ['name','code']
				reader: new Ext.data.JsonReader({
					totalProperty:"totalPorperty",
					root:"result",
					fields:[{name: 'name'},{name: 'code'}]
				}) 
			});	
			//store.load({params:{start:0,limit:30,query:''}});	
			store.load();
		}	
		// 默认配置以清空对象
		var defConfig = {
			triggerAction:'all',
			store:store,
			valueField:'code',
			displayField:'name',
			mode:'remote',
			emptyText:'请选择',
			loadingText:'正在加载',
			editable:true,
			forceSelection:true,
			frame:true,
			resizable:true,
			typeAhead:true,
			autoCreate:true,
			minChars : 1 
			
		};
		
		Ext.applyIf(config, defConfig);					
		gdc.code.ComboBox.superclass.constructor.call(this, config);
		Ext.reg('codeComboBox',gdc.code.ComboBox);
	}
});		
		
/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统 统一代码下拉框封装 s</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.common");
 /**
  * 人员选择下拉框封装，可多选
  * config['ids'] 可以是单位Id或角色Id，多个用','隔开
  * config['flag'] role，org
  * @class gdc.common.PersonComboBox
  * @extends gdc.component.select.MultiSelect
  */
gdc.common.PersonComboBox = Ext.extend(gdc.component.select.MultiSelect, {
	constructor : function(config) {
		var config = config || {};
		var personStore = new Ext.data.Store({
			baseParams:{ 'ids' : config['ids'],
						 'flag' : config['flag']},
			proxy:new Ext.data.HttpProxy({
				timeout : 300000,
				url:gdc.webContextRoot+'/common/loadPersonCombobox.action'
			}),
			reader: new Ext.data.JsonReader({
				totalProperty:"totalPorperty",
				root:"result",
				fields:[{name: 'name'},{name: 'code'}]
			}) 
		});		
		personStore.load();
		// 默认配置以清空对象
		var defConfig = {
			valueField :"code",
        	displayField: "name",
			mode: 'local',
			triggerAction: 'all',
			store: personStore, 
			emptyText:'请选择'	
			,xtype : 'PersonComboBox'
		};
		
		Ext.applyIf(config, defConfig);					
		gdc.common.PersonComboBox.superclass.constructor.call(this, config);
		Ext.reg('PersonComboBox',gdc.common.PersonComboBox);
	}
});		
		
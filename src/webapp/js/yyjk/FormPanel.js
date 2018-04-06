/**
 * 拓展Ext.FormPanel，目的是获取当前的FormPanel，体现在this.form = this.createForm(); 
 * 												 new YYJK.BasicForm(null, this.initialConfig)；
 * 自定义通用的FormPanel，可以为其他的表单提供基本表单项。配合YYJK.BasicForm实现重载Ext.BasicForm的isValid事件。
 * 调用形式例如：
 * 			  1: newLineModelForm = new YYJK.FormPanel( {
 * 			  2：if (newLineModelForm.form.isValid(newLineModelForm))； 
 * 			     isValid(newLineModelForm)中的newLineModelForm为当前表单的form.
 * 			  3：如果验证有else处理；将其去掉。。
 * @class YYJK.FormPanel
 * @extends Ext.FormPanel
 */
YYJK.FormPanel = Ext.extend(Ext.FormPanel ,{
	 	constructor: function(config) {
	 		YYJK.FormPanel.superclass.constructor.call(this, config);
	 	},
	    initComponent: function(){
	    	this.form = this.createForm();
	    	YYJK.FormPanel.superclass.initComponent.call(this);
	    },
		createForm: function(){
	        delete this.initialConfig.listeners;
	        return new YYJK.BasicForm(null, this.initialConfig);
	    }
	    
});
Ext.reg('yyjk.FormPanel', YYJK.FormPanel);
/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统   </p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace('gdc.component');
/**
 * 年下拉框封装
 * @class gdc.component.YearComboBox
 * @extends Ext.form.ComboBox
 */
gdc.component.YearComboBox = Ext.extend(Ext.form.ComboBox, {
			editable : false,
			displayField : 'year',
			valueField : 'value',
			typeAhead : true,
			mode : 'local',
			triggerAction : 'all',
			selectOnFocus : true,
			initComponent : function() {
				var years = [];
				for (var i = 2000; i < 2020; i++) {
					years.push([+i + "年", i]);
				}
				this.store = new Ext.data.SimpleStore({
							fields : ['year', 'value'],
							data : years
						});
			}

		});
Ext.reg('xyearcombobox', gdc.component.YearComboBox);

/**
 * 开始日期，结束日期的验证 
 */
Ext.apply(Ext.form.VTypes, {
			dateRange : function(val, field) {
				if (field.dateRange) {
					var state=field.dateRange.status;
					var beginId = field.dateRange.begin;
					this.beginField = Ext.getCmp(beginId);
					var endId = field.dateRange.end;
					this.endField = Ext.getCmp(endId);
					var beginDate = this.beginField.getValue();
					var endDate = this.endField.getValue();
                   //日期时间控件获得config的fieldLbale的属性，并截取样式
					var beginDateName = this.beginField.fieldLabel;
					if(beginDateName.indexOf('>')>-1&&beginDateName.indexOf('</')>-1){
	                    var beginName1 = beginDateName.indexOf('>');
	                    var beginName2 = beginDateName.indexOf('</');
	                    var resultStr1 = beginDateName.substring(beginName1 + 1,
								beginName2);					
					}else{
						var resultStr1 = beginDateName;
					}

                  //日期时间控件获得config的fieldLbale的属性，并截取样式
					var endDateName = this.endField.fieldLabel;
					if(endDateName.indexOf('>')>-1&&endDateName.indexOf('</')>-1){
					    var endName1 = endDateName.indexOf('>');
						var endName2 = endDateName.indexOf('</');
	
						var resultStr2 = endDateName.substring(endName1 + 1,
								endName2);					
					}else{
						var resultStr2 = endDateName;
					}

				}
				if(beginDate!=null&&endDate!=null){
					if (beginDate <= endDate) {
						return true;
					} else {
						Appframe.viewinfdlg.error.show(resultStr1 + "不能大于"
								+ resultStr2);
						return false;
					}					
				}

			}

			//dateRangeText : '开始日期不能大于结束日期'

		});


/**
 * 日历选择控件封装
 * @class gdc.component.DateField
 * @extends Ext.form.DateField
 */
gdc.component.DateField = Ext.extend(Ext.form.DateField, {
			constructor : function(config) {
				var config = config || {};
				// 默认配置以清空对象
				var defConfig = {
					format : 'Y-m-d'
					,xtype : 'datefield'
				};
				Ext.applyIf(config, defConfig);
				gdc.component.DateField.superclass.constructor.call(this,
						config);
			}
		});
gdc.component.ProgressBar = new Ext.Window({
		title: '请稍后',
		layout: 'fit',
		closable:false,
		modal: false,
		id:'pbWin',
		resizable: false,
		draggable:false,
		width: 300,
		listeners:{
			show:function(){ 
				Ext.getCmp("pbar").wait({
					interval:100,
				    increment:15
				});
			},
			hide:function(){
				Ext.getCmp("pbar").reset();
			}
		},
		items:[
			new Ext.ProgressBar({
		        id:'pbar',
		        width:300
		    })
		]
});


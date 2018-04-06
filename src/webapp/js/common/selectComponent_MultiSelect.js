/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统 多选、单选下拉框封装</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace('gdc.component.select');

//单选下拉框
gdc.component.select.SingleSelect = Ext.extend(Ext.form.ComboBox, {
    triggerAction: 'all',
    mode: 'local',
    editable: false,
    emptyText: '请选择...',
    readOnly: true,
    displayField: 'text',
    xtype: 'select',
    valueField: 'value',
    /*
    @store 数组数据源 例如:[[1,'a'],[2,'b'],[3,'c']]或['a','b','c']
    */
    initComponent: function() {
        this.hiddenName = this.name;
        gdc.component.select.SingleSelect.superclass.initComponent.call(this);
    },

    setValue: function(v) {
        if (Ext.type(v) == 'object') {
            v = v[this.valueField];
        }
        gdc.component.select.SingleSelect.superclass.setValue.call(this, v);
    }
});
Ext.reg('select', gdc.component.select.SingleSelect);

//gdc.component.select.clickOk=function(){
//	alert(Ext.getCmp("personselect"));
//}
//多选下拉框
gdc.component.select.MultiSelect = Ext.extend(gdc.component.select.SingleSelect, {
    //id: this.name+'select',
    tpl: '<div class="multiselect"></div>',
	
    // private
    initList: function() {
    	gdc.component.select.obj=this;
        gdc.component.select.MultiSelect.superclass.initList.call(this);
        this.initCheckBox();
    },
	//全选
    selectAll:function(){
    	var it=this.items;
		if(it){
			for(var i=0;i<this.items.length;i++){
				it.get(i).setValue(true);
			}
		}
	},
	//清空
    clearAll:function(){
    	var it=this.items;
		if(it){
			for(var i=0;i<this.items.length;i++){
				it.get(i).setValue(false);
			}
		}
	},	
    // private
    initCheckBox: function() {
        var ct = this.innerList.first('.multiselect');
        this.items = new Ext.util.MixedCollection();
        var fn = function(r) {
            var c = new Ext.form.Checkbox({
                boxLabel: r.data[this.displayField],
                inputValue: r.data[this.valueField],
                renderTo: ct
            });
            this.items.add(c);
        };
        this.store.each(fn, this);

        this.on('collapse', this.onCollapse, this);
        this.on('expand', this.onExpand, this);
    },

    onCollapse: function() {
        var value = [];
        var fn = function(c) {
            if (c.getValue()) {
                value.push(c.el.dom.value);
            }
        };
        this.items.each(fn);

        this.setValue(value);
    },

    setValue: function(v) {
        if (!Ext.isArray(v)) { v = [v]; }
        if(this.hiddenField) {
			this.hiddenField.value = v;
		}
        //this.hiddenField.value = v;
        Ext.form.ComboBox.superclass.setValue.call(this, this.getTexts(v));
        this.value = v;
    },

    getTexts: function(v) {
        var texts = [];
        var fn = function(r) {
            var rv = r.data[this.valueField];

            for (var i = 0; i < v.length; i++) {
                if (rv == v[i]) {
                    texts.push(r.data[this.displayField]);
                    break;
                }
            }
        };
        this.store.each(fn, this);
        return texts.join();
    },

    onExpand: function() {
        if (!Ext.isArray(this.value) || this.value.length == 0) { return; }

        var v = this.value;

        var fn = function(item) {
            var rv = item.el.dom.value;
            item.setValue(false);
            
            for (var i = 0; i < v.length; i++) {
                if (rv == v[i]) {
                    item.setValue(true);
                    break;
                }
            }
        };

        this.items.each(fn);
    }
});
Ext.reg('multiselect', gdc.component.select.MultiSelect);



//动态多选下拉框
if('function' !== typeof RegExp.escape) {
	RegExp.escape = function(s) {
		if('string' !== typeof s) {
			return s;
		}
// Note: if pasting from forum, precede ]/\ with backslash manually
		return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}; // eo function escape
}
gdc.component.select.MultiSelectCombobox = Ext.extend(Ext.form.ComboBox, {
	
	// {{{
	// configuration options
	
	checkField:'checked'
	
	
	,separator:','
	
	
	// }}}
	// {{{
	,initComponent:function() {
	
	// template with checkbox
	if(!this.tpl) {
		this.tpl =
		'<tpl for=".">'
		+'<div class="x-combo-list-item" >'
		+'<img align="left" src="' + Ext.BLANK_IMAGE_URL + '" '
		+'class="ux-MultiSelect-icon ux-MultiSelect-icon-'
		+'{[values.' + this.checkField + '?"checked":"unchecked"' + ']}">'
		+'<span>{[values.'+this.displayField+']}</span>'
		+'</div>'
		+'</tpl>'
		;
	}
	
	// call parent
	gdc.component.select.MultiSelectCombobox.superclass.initComponent.apply(this, arguments);
	
	// install internal event handlers
	this.on({
		scope:this
		,beforequery:this.onBeforeQuery
		,blur:this.onRealBlur
	});
	
	// remove selection from input field
	this.onLoad = this.onLoad.createSequence(function() {
		if(this.el) {
			var v = this.el.dom.value;
			this.el.dom.value = '';
			this.el.dom.value = v;
		}
	});
	
	} // e/o function initComponent
	// }}}
	// {{{
	
	,initEvents:function() {
	gdc.component.select.MultiSelectCombobox.superclass.initEvents.apply(this, arguments);
	
	// disable default tab handling - does no good
	this.keyNav.tab = false;
	
	} // eo function initEvents
	// }}}
	// {{{
	
	,clearValue:function() {
		this.value = '';
		this.setRawValue(this.value);
		this.store.clearFilter();
		this.store.each(function(r) {
			r.set(this.checkField, false);
		}, this);
		if(this.hiddenField) {
			this.hiddenField.value = '';
		}
		this.applyEmptyText();
	} // eo function clearValue
	// }}}
	// {{{
	
	,getCheckedDisplay:function() {
		var re = new RegExp(this.separator, "g");
		return this.getCheckedValue(this.displayField).replace(re, this.separator + ' ');
	} // eo function getCheckedDisplay
	// }}}
	// {{{
	
	,getCheckedValue:function(field) {
		field = field || this.valueField;
		var c = [];
		
		// store may be filtered so get all records
		var snapshot = this.store.snapshot || this.store.data;
		
		snapshot.each(function(r) {
		if(r.get(this.checkField)) {
			c.push(r.get(field));
		}
		}, this);
		return c.join(this.separator);
	} // eo function getCheckedValue
	// }}}
	// {{{
	
	,onBeforeQuery:function(qe) {
		qe.query = qe.query.replace(new RegExp(RegExp.escape(this.getCheckedDisplay()) + '[ ' + this.separator + ']*'), '');
	} // eo function onBeforeQuery
	// }}}
	// {{{
	
	,onRealBlur:function() {
		this.list.hide();
		
		var rv = this.getRawValue();
		var rva = rv.split(new RegExp(RegExp.escape(this.separator) + ' *'));
		var va = [];
		var snapshot = this.store.snapshot || this.store.data;
		
		// iterate through raw values and records and check/uncheck items
		Ext.each(rva, function(v) {
			snapshot.each(function(r) {
				if(v === r.get(this.displayField)) {
					va.push(r.get(this.valueField));
				}
			}, this);
		}, this);
		this.setValue(va.join(this.separator));
		this.store.clearFilter();
	} // eo function onRealBlur
	// }}}
	// {{{
	
	,onSelect:function(record, index) {
	if(record.get(this.displayField).indexOf('请选择')>-1){
		this.clearValue();
		return;
	}
	if(record.get(this.checkField)==true && this.getCheckedValue() && this.getCheckedValue().indexOf(',')<=-1){
		this.clearValue();
		return;
	}
	if(this.fireEvent('beforeselect', this, record, index) !== false){
	
	// toggle checked field
	record.set(this.checkField, !record.get(this.checkField));
	
	// display full list
	if(this.store.isFiltered()) {
	this.doQuery(this.allQuery);
	}
	
	// set (update) value and fire event
	this.setValue(this.getCheckedValue());
	this.fireEvent('select', this, record, index);
	}
	} // eo function onSelect
	// }}}
	// {{{
	
	,setValue:function(v) {
		if(v) {
		v = '' + v;
		if(this.valueField) {
		this.store.clearFilter();
		this.store.each(function(r) {
		var checked = !(!v.match(
		'(^|' + this.separator + ')' + RegExp.escape(r.get(this.valueField))
		+'(' + this.separator + '|$)'))
		;
		
		r.set(this.checkField, checked);
		}, this);
		this.value = this.getCheckedValue();
		this.setRawValue(this.getCheckedDisplay());
		if(this.hiddenField) {
		this.hiddenField.value = this.value;
		}
		}
		else {
		this.value = v;
		this.setRawValue(v);
		if(this.hiddenField) {
		this.hiddenField.value = v;
		}
		}
		if(this.el) {
		this.el.removeClass(this.emptyClass);
		}
		}
		else {
		//this.clearValue();
		}
	} // eo function setValue
	// }}}
	// {{{
	
	,selectAll:function() {
		this.store.each(function(record){
	// toggle checked field
		record.set(this.checkField, true);
	}, this);
	
	//display full list
	this.doQuery(this.allQuery);
	this.setValue(this.getCheckedValue());
	} // eo full selectAll
	// }}}
	// {{{
	
	,deselectAll:function() {
	this.clearValue();
	} // eo full deselectAll
	// }}}
	
}); // eo extend

// register xtype
Ext.reg('MultiSelectCombobox',gdc.component.select.MultiSelectCombobox);


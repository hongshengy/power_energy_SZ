Ext.namespace("gdc");


//***********************************************gdc form 定义**************************************************
//gdc.basicform 定义
gdc.BasicForm = function(el, config){
	Ext.apply(this, config);
	if(el){this.initEl(el);}
    gdc.BasicForm.superclass.constructor.call(this);
}
Ext.extend(gdc.BasicForm, Ext.form.BasicForm,{
 	initEl : function(el){
        this.el = Ext.get(el);
        this.id = this.el.id || Ext.id();
        if(!this.standardSubmit){
            this.el.on('submit', this.onSubmit, this);
        }
        this.el.addClass('x-form');
    },
    getEl: function(){
        return this.el;
    },
    initComponent: function(){
    	gdc.BasicForm.superclass.initComponent.call(this);
    	gdc.BasicForm.isValid();
    },
    isValid : function(form){
    	var message = '';
    	var flag = true;
    	if(form!=null){
			var fItems = getItems(form);
			for(var j=0; j<fItems.length; j++){
				if(!fItems[j].validate()){
					flag=false;
					if(fItems[j].getXType()=='datefield'){
						message += gdc.dateFieldValidate(fItems[j])+'<br/>';						
					}else if(fItems[j].getXType()=='timefield'){
						message += gdc.timeFieldValidate(fItems[j])+'<br/>';						
					}else if(fItems[j].getXType()=='numberfield'){
						message += gdc.numberFieldValidate(fItems[j])+'<br/>';						
					}else if(fItems[j].getXType()=='textfield'){
						message += gdc.textFieldValidate(fItems[j])+'<br/>';
					}else if(fItems[j].getXType()=='textarea'){
						message += gdc.textAreaValidate(fItems[j])+'<br/>';						
					}else if(fItems[j].getXType()=='checkboxgroup'){
						message += gdc.checkboxGroupValidate(fItems[j])+'<br/>';						
					}else if(fItems[j].getXType()=='radiogroup'){
						message += gdc.radioGroupGroupValidate(fItems[j])+'<br/>';						
					}else if(fItems[j].getXType()=='combo'){
						message += gdc.comboboxValidate(fItems[j])+'<br/>';						
					}else{
						if(fItems[j].validateMsg){
							message += fItems[j].validateMsg(fItems[j])+'<br/>';							
						}else{
							var xtypes = fItems[j].getXTypes();
							if(xtypes.indexOf('datefield')>-1){
								message += gdc.dateFieldValidate(fItems[j])+'<br/>';								
							}else if(xtypes.indexOf('timefield')>-1){
								message += gdc.timeFieldValidate(fItems[j])+'<br/>';								
							}else if(xtypes.indexOf('numberfield')>-1){
								message += gdc.numberFieldValidate(fItems[j])+'<br/>';								
							}else if(xtypes.indexOf('checkboxgroup')>-1){
								message += gdc.checkboxGroupValidate(fItems[j])+'<br/>';								
							}else if(xtypes.indexOf('radiogroup')>-1){
								message += gdc.radioGroupGroupValidate(fItems[j])+'<br/>';								
							}else if(xtypes.indexOf('combo')>-1){
								message += gdc.comboboxValidate(fItems[j])+'<br/>';								
							}else if(xtypes.indexOf('textarea')>-1){
								message += gdc.textAreaValidate(fItems[j])+'<br/>';								
							}else if(xtypes.indexOf('textfield')>-1){
								message += gdc.textFieldValidate(fItems[j])+'<br/>';								
							}
						}
					}
					
				}
			}
    	}
		if(message.length>0){
			Ext.MessageBox.alert('提示', message);
		}
		return flag;
    }
});
Ext.reg('gdc.BasicForm', gdc.BasicForm);




//gdc.formpanel 定义
gdc.FormPanel = Ext.extend(Ext.FormPanel ,{
 	constructor: function(config) {
 		gdc.FormPanel.superclass.constructor.call(this, config);
 	},
    initComponent: function(){
    	this.form = this.createForm();
    	gdc.FormPanel.superclass.initComponent.call(this);
    },
	createForm: function(){
		delete this.initialConfig.listeners;
        return new gdc.BasicForm(null, this.initialConfig);
    }
});
Ext.reg('gdc.FormPanel', gdc.FormPanel);


//获取form元素
function getItems(form) {
	var _items = new Array();
	var tempitems = form.items.items;
	for (var i = 0; i < tempitems.length; i ++) {
		if (tempitems[i].items == null || tempitems[i].xtype =='PersonComboBox' || tempitems[i].xtype=='select') {
			if (tempitems[i].fieldLabel != null){
				_items.push(tempitems[i]);
			}
		} else {
			var tempitem = getItems(tempitems[i]);
			for (var j = 0; j < tempitem.length; j ++){
				_items.push(tempitem[j]);
			}
		}
	}
	return _items;
}



//***********************************************gdc form 验证函数**********************************************
//文本框验证
gdc.textFieldValidate = function(textField){
	var message = textField.fieldLabel+':';
	var value = textField.getValue();
	if(value.length < 1 || value === textField.emptyText){              
    	if(!textField.allowBlank){
             message += textField.blankText;
             return message;
         }
    }
    if(getLen(value)< textField.minLength){
        message += String.format(textField.minLengthText, textField.minLength);
        return message;
    }
    if(getLen(value) > textField.maxLength){
        message += String.format(textField.maxLengthText, textField.maxLength);
        return message;
    }
    if(textField.vtype){
        var vt = Ext.form.VTypes;
        if(!vt[textField.vtype](value, textField)){
            message += (textField.vtypeText || vt[textField.vtype +'Text']);
            return message;
        }
    }
    if(typeof textField.validator == "function"){
        var msg = textField.validator(value);
        if(msg !== true){
           message += msg;
           return message;
        }
    }
    if(textField.regex && !textField.regex.test(value)){
        message +=textField.regexText;
        return message;
    }
}

//文本域验证
gdc.textAreaValidate = function(textArea){
	var message = gdc.textFieldValidate(textArea);
	return message;
}

//checkbox group验证
gdc.checkboxGroupValidate = function(checkboxGroup){
	 var message = checkboxGroup.fieldLabel+':';
	 if(!checkboxGroup.allowBlank){
        var blank = true;
        checkboxGroup.items.each(function(f){
            if(f.checked){
                return blank = false;
            }
        }, checkboxGroup);
        if(blank){
            message += checkboxGroup.blankText;
            return message;
        }
    }
}

//radio group验证
gdc.radioGroupGroupValidate = function(radioGroup){
	 var message = gdc.checkboxGroupValidate;
	 return message;
}

//combobox验证
gdc.comboboxValidate = function(combobox){
	 var message = combobox.fieldLabel+':';
	 if(!combobox.allowBlank){
        var blank = true;
        if(combobox.items){
	        combobox.items.each(function(f){
	            if(f.checked){
	                return blank = false;
	            }
	        }, combobox);
        }
        if(blank){
            message += combobox.blankText;
            return message;
        }
    }
}

//dateField验证
gdc.dateFieldValidate = function(dateFieldValidate){
	var value = dateFieldValidate.getValue();
	value = dateFieldValidate.formatDate(value);
	
    var message = gdc.textFieldValidate(dateFieldValidate);
	if(messag && message.length>0){
		return message;
	}
	
	message = dateFieldValidate.fieldLabel+':';
	var svalue = value;
    value = dateFieldValidate.parseDate(value);
    if(!value){
         message += String.format(dateFieldValidate.invalidText, svalue, dateFieldValidate.format);
        return message;
    }
    var time = value.getTime();
    if(dateFieldValidate.minValue && time < dateFieldValidate.minValue.getTime()){
        message += String.format(dateFieldValidate.minText, dateFieldValidate.formatDate(dateFieldValidate.minValue));
        return message;
    }
    if(dateFieldValidate.maxValue && time > dateFieldValidate.maxValue.getTime()){
        message += String.format(dateFieldValidate.maxText, dateFieldValidate.formatDate(dateFieldValidate.maxValue));
        return message;
    }
    if(dateFieldValidate.disabledDays){
        var day = value.getDay();
        for(var i = 0; i < dateFieldValidate.disabledDays.length; i++) {
        	if(day === dateFieldValidate.disabledDays[i]){
        	    message += dateFieldValidate.disabledDaysText;
                return message;
        	}
        }
    }
    var fvalue = dateFieldValidate.formatDate(value);
    if(dateFieldValidate.ddMatch && dateFieldValidate.ddMatch.test(fvalue)){
        message += String.format(dateFieldValidate.disabledDatesText, fvalue);
        return message;
    }
}

//timeField验证
gdc.timeFieldValidate = function(tiemFieldValidate){
	var message = gdc.dateFieldValidate(tiemFieldValidate);
	return message;
}

//numberField验证
gdc.numberFieldValidate = function(numberField){
	var message = gdc.textFieldValidate(numberField);
	if(message & message.length>0){
		return message;
	}
	message = numberField.fieldLabel+':';
	var value = numberField.getValue();
    value = String(value).replace(numberField.decimalSeparator, ".");
    if(isNaN(value)){
        message += String.format(numberField.nanText, value);
        return message;
    }
    var num = numberField.parseValue(value);
    if(num < numberField.minValue){
        message += String.format(numberField.minText, numberField.minValue);
        return message;
    }
    if(num > numberField.maxValue){
        message += String.format(numberField.maxText, numberField.maxValue);
        return message;
    }
}


//取出含有中文的表单项的长度
function getLen(str) {  
	var len=0;  
	for(var i=0;i<str.length;i++) {   
		char = str.charCodeAt(i);    
		if(!(char>255)) {      
     		len = len + 1;   
		} else {      
     		len = len + 2;  
		}  
	 }  
     return len; 
}

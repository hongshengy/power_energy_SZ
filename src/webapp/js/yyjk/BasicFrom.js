/**
 * 拓展Ext.BasicForm；目的是在该类调用isValid之后，调用我们追加的isValid实现，必添项提示弹出框。
 * @class YYJK.BasicForm
 * @extends Ext.BasicForm
 */
YYJK.BasicForm = function(el, config){
	Ext.apply(this, config);
	if(el){
        this.initEl(el);
    }
    YYJK.BasicForm.superclass.constructor.call(this);
}

Ext.extend(YYJK.BasicForm, Ext.form.BasicForm, {
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
    	YYJK.BasicForm.superclass.initComponent.call(this);
    	YYJK.BasicForm.isValid();
    },
    isValid : function(cForm){
    	var tmpResultMsg='';
    	var tmpFieldLabel;
    	var tmpFieldLabelText;
    	var flag = true;
		if(cForm != null){
			//1.获取所有form的items
			var fItems = getItems4YYJKForm(cForm);
			
			//2.遍历所有items
			for(var j=0; j<fItems.length; j++){
				//3.如果items[j]是radiogroup或multiselect则跳过
				if(fItems[j].xtype == 'radiogroup' || fItems[j].xtype == 'multiselect')
					continue;
				
				//4.获取item[j]的Label存入tmpFieldLabel中
				tmpFieldLabel = fItems[j].fieldLabel;
				
				//5.获取item[j]的Label的文本存入tmpFieldLabelText中
				tmpFieldLabelText = tmpFieldLabel.substring(tmpFieldLabel.indexOf(">")+1,tmpFieldLabel.indexOf("</"));
				
				//6.如果resultStrTemp包含'ext:qtip'字符串则表示其属于必输项,需进行必输项校验
				if(tmpFieldLabel.length >0 && tmpFieldLabel.indexOf("ext:qtip") != -1 && getLen4YYJK(fItems[j].getValue()+'')==0){
					if(tmpResultMsg.length ==0)
						tmpResultMsg += tmpFieldLabelText + ": 该必输项不能为空!";
					else
						tmpResultMsg += "<br>" + tmpFieldLabelText + ": 该必输项不能为空!";
					flag=false;
					continue;
				}
				
				//7.minLength校验
				if(fItems[j].minLength > getLen4YYJK(fItems[j].getValue())){
					if(tmpResultMsg.length ==0)
						tmpResultMsg += tmpFieldLabelText + ": " + fItems[j].minLengthText + "!";
					else
						tmpResultMsg += "<br>" + tmpFieldLabelText + ": " + fItems[j].minLengthText + "!";
					flag=false;
					continue;
				}
				
				//8.maxLength校验
				if(fItems[j].maxLength < getLen4YYJK(fItems[j].getValue())){
					if(tmpResultMsg.length ==0)
						tmpResultMsg += tmpFieldLabelText + ": " + fItems[j].maxLengthText + "!";
					else
						tmpResultMsg += "<br>" + tmpFieldLabelText + ": " + fItems[j].maxLengthText + "!";
					flag=false;
					continue;
				}
				
				//9.minValue校验
				if(fItems[j].minValue && fItems[j].minValue > Number(fItems[j].getValue()+'',10)){
					if(tmpResultMsg.length ==0)
						tmpResultMsg += tmpFieldLabelText + ": " + fItems[j].minText + "!";
					else
						tmpResultMsg += "<br>" + tmpFieldLabelText + ": " + fItems[j].minText + "!";
					flag=false;
					continue;
				}
				
				//10.maxValue校验
				if(fItems[j].maxValue && fItems[j].maxValue < Number(fItems[j].getValue()+'',10)){
					if(tmpResultMsg.length ==0)
						tmpResultMsg += tmpFieldLabelText + ": " + fItems[j].maxText + "!";
					else
						tmpResultMsg += "<br>" + tmpFieldLabelText + ": " + fItems[j].maxText + "!";
					flag=false;
					continue;
				}
				
				//11.自定义规则校验
				if(fItems[j].validator && fItems[j].validator(fItems[j].getValue()) != true){
					if(tmpResultMsg.length ==0)
						tmpResultMsg += tmpFieldLabelText + ": " + fItems[j].validator(fItems[j].getValue())+"!";
					else
						tmpResultMsg += "<br>" + tmpFieldLabelText + ": " + fItems[j].validator(fItems[j].getValue())+"!";
					flag=false;
					continue;
				}
			}
    	}
    	if(flag==false){
			Ext.Msg.show({
  					title:'提示',
  					msg: tmpResultMsg,
  					buttons: Ext.Msg.OK
			});
			return;
		}else{
			return true;
		}
    }
});
Ext.reg('yyjk.BasicForm', YYJK.BasicForm);

/**
 * 获取form中的所有对象
 * @param item   form对象
 * @return form中的对象
 */
function getItems4YYJKForm(item) {
	var _items = new Array();
	
	var tempitems = item.items.items;

	for (var i = 0; i < tempitems.length; i ++) {
		if (tempitems[i].items == null || tempitems[i].xtype =='PersonComboBox' || tempitems[i].xtype=='select') {
			if (tempitems[i].fieldLabel != null)
				_items.push(tempitems[i]);
		} else {
			var tempitem = getItems(tempitems[i]);
			
			for (var j = 0; j < tempitem.length; j ++)
				_items.push(tempitem[j]);
		}
	}
	
	return _items;
}

/**
 * 取出含有中文的表单项的长度
 * @param {} str
 * @return {}
 */
function getLen4YYJK(str) {  
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
/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统 定义上传文件组件</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace('Ext.ux.form');
Ext.ux.form.FileField = Ext.extend(Ext.form.TwinTriggerField, {
	//组件内部使用的隐藏id
    hiddenId : Ext.id(),
    //设置文本框只读
    readOnly : true,
    //未选择文件时的提示信息
    noFileText : '当前没有选择任何文件。',
    //文件不允许为空时的提示信息
    blankText : '请选择要上传的文件',
    //初始化组件
    initComponent : function(){
        Ext.ux.form.FileField.superclass.initComponent.call(this);
        //定义组件生成模板
        this.triggerConfig = {
            tag:'span', cls:'x-form-twin-triggers', cn:[
            {tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger1Class},
            {tag:'span', cls:'ux-cabinet', cn:[
            	{tag: "div", id:'wrap'+this.hiddenId,cls:"ux-input-file-wrapper",cn: [
                    {tag: "input", name: "file"+this.hiddenId, cls : 'ux-file',hidefocus:"true",type: "file", id: this.hiddenId}
                ]},
                {tag: "img", id:"triger"+this.hiddenId,src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger2Class}
       		]}
        ]};
        //初始化文件提示
		this.tip = new Ext.QuickTip({
			target : this.el,
			html : this.noFileText,
			trackMouse : true
		});

    },
    //初始化事件
	initEvents : function(){
		Ext.ux.form.FileField.superclass.initEvents.call(this);
		this.fileInput = Ext.get(this.hiddenId);
		this.fileWrap = Ext.get('wrap' + this.hiddenId);
		this.fileInput.on('change',this.selectFile,this);
		this.fileInput.on('mouseover',function(){
			Ext.get("triger" + this.hiddenId).dom.fireEvent('onmouseover');
		},this);
		this.fileInput.on('mouseout',function(){
			Ext.get("triger" + this.hiddenId).dom.fireEvent('onmouseout');
		},this);
		this.el.on("mouseover",function(){
				this.tip.show();
		},this);
		this.el.on("mouseout",function(){
				this.tip.hide();
		},this);
	},
	//设置触发按钮样式
	trigger1Class:'x-form-clear-trigger',
    trigger2Class:'x-form-search-trigger',
	//定义清空文件函数
	onTrigger1Click : function(){
		this.fileInput.remove();
		this.fileInput = Ext.DomHelper.append(this.fileWrap, {
			tag: "input",
			name: "file"+this.hiddenId,
			hidefocus:"true",
			type: "file",
			cls: "ux-file",
			id: this.hiddenId
		},true);
		this.fileInput.on('change',this.selectFile,this);
		this.setValue('');
		this.tip.getUpdater().getEl().dom.innerHTML = this.noFileText;
	},
	//同步所选文件显示
	selectFile : function(){
		var filePath = this.fileInput.dom.value;
		if(filePath.trim().length > 0){
			this.setValue(filePath);
			this.tip.showBy(this.el);
			this.tip.getUpdater().getEl().dom.innerHTML = filePath;
		}
	}
});
Ext.reg('xfilefield',Ext.ux.form.FileField);
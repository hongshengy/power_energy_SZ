/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.grid");
/**
 * grid 分页工具栏
 * @class gdc.grid.PagingToolbar
 * @extends Ext.PagingToolbar
 */
 gdc.grid.PagingToolbar = Ext.extend(Ext.PagingToolbar, {
				constructor : function(config) {
				var config = config || {};
				
				// 默认配置以清空对象
				var defConfig = {
							displayInfo : true,
							lastText : "尾页",
							nextText : "下一页",
							beforePageText : "当前",
							refreshText : "刷新",
							afterPageText : "页，共{0}页",
							displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
							emptyMsg : "无数据",
							onLoad : function(store, r, o){
						        if(!this.rendered){
						            this.dsLoaded = [store, r, o];
									return;
						        }
						
						      this.cursor = o.params ? o.params[this.paramNames.start] : 0;
						      var d = this.getPageData(), ap = d.activePage, ps = d.pages;
						
						      /*解决当删除最后一页所有记录时的翻页问题*/
							  if(this.store.getCount()==0 && ap>1)
							  {
						        this.onClick('prev');
						        d = this.getPageData(), ap = d.activePage, ps = d.pages;
						      }
						
						      /*End*/
						        this.afterTextEl.el.innerHTML = String.format(this.afterPageText, d.pages);
								this.field.dom.value = ap;
								this.first.setDisabled(ap == 1);
								this.prev.setDisabled(ap == 1);
								this.next.setDisabled(ap == ps);
								this.last.setDisabled(ap == ps);
								this.loading.enable();
								this.updateInfo();
								this.fireEvent('change', this, d);
							}
				};
				Ext.applyIf(config, defConfig);					
				gdc.grid.PagingToolbar.superclass.constructor.call(this, config);
				}
			});	

/**
 * ext grid封装
 * @class gdc.grid.gridPanel
 * @extends Ext.grid.GridPanel
 */			
gdc.grid.gridPanel = Ext.extend(Ext.grid.GridPanel, {
	constructor : function(config) {
		var config = config || {};
		var ds = config['ds'];
		var cm = config['cm'];
		var ptb = new gdc.grid.PagingToolbar( {
			pageSize : config['pageSize'],
			store : ds
		});
				
		var defConfig = {
			collapsible : true,
			animCollapse : false,
			clicksToEdit : 4,
			store : ds,
			cm : cm,
			renderTo : Ext.getBody(),
			viewConfig : {
				forceFit : true
			},
			bbar :ptb,
			layout : 'fit',
			height : 600,
			frame : true,
			loadMask : true,
			autoShow : true
		};
		ds.reload();
		Ext.applyIf(config, defConfig);					
		gdc.grid.gridPanel.superclass.constructor.call(this, config);
	}
});	

Ext.namespace('Ext.ux.grid');   
Ext.ux.grid.PageSizePlugin = function() {   
    Ext.ux.grid.PageSizePlugin.superclass.constructor.call(this, {   
        store: new Ext.data.SimpleStore({   
            fields: ['text', 'value'],   
            data: [['10', 10], ['20', 20], ['50', 50], ['100', 100]]   
        }),   
        mode: 'local',   
        displayField: 'text',   
        valueField: 'value',   
        editable: false,   
        allowBlank: false,   
        triggerAction: 'all',   
        width: 60  
    });   
};   
  
Ext.extend(Ext.ux.grid.PageSizePlugin, Ext.form.ComboBox, {   
    init: function(paging) {   
        paging.on('render', this.onInitView, this);   
    },   
  
    onInitView: function(paging) {   
        paging.add('-','每页',this,'条');   
        var pageSize = function getCookie(c_name)   
        {      
            c_name = 'pageSize';   
             if (document.cookie.length>0)   
              {   
              c_start=document.cookie.indexOf(c_name + "=")   
              if (c_start!=-1)   
                {    
                c_start=c_start + c_name.length+1    
                c_end=document.cookie.indexOf(";",c_start)   
                if (c_end==-1) c_end=document.cookie.length   
                return unescape(document.cookie.substring(c_start,c_end))   
                }    
              }   
            return ""  
        }();   
        if (pageSize!=null && pageSize!="")   
        {   
            this.setValue(pageSize);   
        }   
        else  
        {   
            this.setValue(paging.pageSize);   
        }   
  
        this.on('select', this.onPageSizeChanged, paging);   
    },   
    onPageSizeChanged: function(combo) {   
        this.pageSize = parseInt(combo.getValue());   
        function setCookie(c_name,value,expiredays)   
        {      
            var exdate=new Date()   
            exdate.setDate(exdate.getDate()+expiredays)   
            document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());   
        };   
        setCookie('pageSize',this.pageSize,14);   
        this.doLoad(0);   
    }   
});  
			
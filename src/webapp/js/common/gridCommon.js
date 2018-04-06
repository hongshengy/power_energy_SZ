
/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: grid公用方法、组件</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.gridCommon");



//*******************************************grid公用方法*************************************************
//获取grid选中行中的字段
/**
 * 获取grid选中行中的字段
 * @param {} grid    grid
 * @param {} field   要获取的字段名
 * @return {}        选中行字段
 */
gdc.gridCommon.getSelections = function(grid,field){
 	var fieldValues = '';
 	var record = grid.getSelectionModel().getSelected();
	if (record) {
		var rows = grid.getSelections();
		for (var i = 0, len = rows.length; i < len; i++) {
			var fieldValue = rows[i].get(field);
			if (i == 0) {
				fieldValues = fieldValues + fieldValue;
			} else {
				fieldValues = fieldValues + "," + fieldValue;
			}
		}
		
	}
	return fieldValues+'';
}

// 自定义grid config设置方法
/**
 * 自定义grid config设置方法
 * @param {} config   开发时传入的config
 * @param {} defaultConfig 自动grid默认config
 */
gdc.gridCommon.editConfigOfCustomGrid = function(config,defaultConfig){
	//grid store
	var store = new Ext.data.Store({
	    proxy : new Ext.data.HttpProxy( {
	        url : config['storeUrl']
	    }),
	    listeners : {
			"beforeload" : function(store,obj) {
				if(config['storeBeforeload']){
					config['storeBeforeload'](store,obj);
				}
			}
		},
	    reader : defaultConfig['jsonReader']
	});
	config.store = store;
	
	
	//分页工具栏
	var bbar =  new Ext.PagingToolbar({
        pageSize : pageSize,
        store : config['store'],
        displayInfo : true,
        displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
        emptyMsg : '无数据'
    });
    config.bbar = bbar;
    
    //选择模式
    if(!config['sm']){
    	config.sm = defaultConfig['sm'];
    }
    //列
    config.cm = defaultConfig['cm'];
    
    //自适应
    config.viewConfig = {forceFit : true};
    
    //自动滚动条
	config.autoScroll = true;
	
	return config;
}





//*******************************************定义grid组件*************************************************
//定义grid选择列
/**
 * grid选择列
 * @param {} config 配置对象
 */
Ext.grid.CheckColumn = function(config){
    Ext.apply(this, config);
    if(!this.id){
        this.id = Ext.id();
    }
    this.renderer = this.renderer.createDelegate(this);
};
Ext.grid.CheckColumn.prototype ={
    init : function(grid){
    	//alert('prototype');
        this.grid = grid;
        this.grid.on('render', function(){
            var view = this.grid.getView();
            /**
             * editgridpanel  checkbox编辑预留
             */
            view.mainBody.on('mousedown', this.onMouseDown, this); 
        }, this);
    },onMouseDown : function(e, t) {  
		if (t.className && t.className.indexOf('x-grid3-cc-' + this.id) != -1) {   
            e.stopEvent();   
            var index = this.grid.getView().findRowIndex(t);   
            var cindex = this.grid.getView().findCellIndex(t);   
            var record = this.grid.store.getAt(index);   
            var field = this.grid.colModel.getDataIndex(cindex); 
            var e = {   
                grid : this.grid,   
                record : record,   
                field : field,   
                originalValue : record.data[this.dataIndex],   
                value : !record.data[this.dataIndex],   
                row : index,   
                column : cindex,   
                cancel : false  
            };
            if (this.grid.fireEvent("validateedit", e) !== false && !e.cancel) {   
                delete e.cancel;   
                record.set(this.dataIndex, !record.data[this.dataIndex]);   
                this.grid.fireEvent("afteredit", e);   
            }   
        }   
    },
    renderer : function(v, p, record){
    	p.css += ' x-grid3-check-col-td'; 
        return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
    }
};
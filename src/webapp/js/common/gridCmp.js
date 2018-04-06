Ext.namespace("gdc.gridCmp");

gdc.gridCmp.createGrid = function(columnArray,storeUrl,storeParams,meta,recordType,tbarArray,pageSize){
	//grid列
	var carray = new Array();
	var csm = new Ext.grid.CheckboxSelectionModel();
	var rn = new Ext.grid.RowNumberer()
	carray.push(csm);
	carray.push(rn);
	if(columnArray){
		for(var i=0;i<columnArray.length;i++){
			carray.push(columnArray[i])
		}
	}
	//carray.
	//carray.join(columnArray);
	var cm = new Ext.grid.ColumnModel(carray);
	
	//reader
	var jsonReader = new Ext.data.JsonReader(meta,recordType)
	
	//grid 数据
	var store = new Ext.data.Store({
	    proxy : new Ext.data.HttpProxy( {
	        url : storeUrl,
	        params:storeParams
	    }),
	    reader : jsonReader
	})
	store.load({
		params : {
            start : 0,
            limit : pageSize
		}
    });
	//分页工具栏
	var bbar =  new Ext.PagingToolbar( {
        pageSize : pageSize,
        store : store,
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
    })
    
    //组合gird
    var grid = new Ext.grid.GridPanel({
    	title : '',
        collapsible : true,// 是否可以展开
        animCollapse : false,// 展开时是否有动画效果
        loadMask : true,// 载入遮罩动画
        autoShow : true,
        cm : cm,
        sm : csm,
        store : store,
        viewConfig : {
           forceFit : true
        },
        bbar :bbar,
        tbar :tbarArray
	})
	return grid;
}
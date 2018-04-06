/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 购电侧系统</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("gdc.common.dowloadButton");
/**
 * 下载按钮封装
 * @class gdc.common.dowloadButton.downloadBtn
 * @extends Ext.Button
 */ 
gdc.common.dowloadButton.downloadBtn = Ext.extend(Ext.Button, {
    constructor: function(config) {
    	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
		
	    var store = new Ext.data.SimpleStore({
	        fields: [
	           {name: 'fileName'},
	           {name: 'filePath'}
	           
	        ]
	    });
	    store.loadData(config.store);
		var grid = new Ext.grid.GridPanel({
	        store: store,
	        columns: [
	            {id:'fileName',header: "文件名",width: 150,sortable: true, dataIndex: 'fileName'},
	            {header: "文件路径",width: 250, sortable: true, dataIndex: 'filePath'}
	        ],
	        stripeRows: true,
	        height:200,
	        width:700,
	        title:'Array Grid'
	    });
	    var win = null;
        config.handler = function(){
        	if(!win){
    		win = new Ext.Window({
	                layout      : 'fit',
	                width       : 420,
	                height      : 200,
	                closeAction :'hide',
	                plain       : true,
	                items       : new Ext.grid.GridPanel({
							        store: store,
							        columns: [
							            {id:'fileName',header: "文件名",width: 150,sortable: true, dataIndex: 'fileName'},
							            {header: "文件路径",width: 250, sortable: true, dataIndex: 'filePath'}
							        ],
							        stripeRows: true,
							        height:200,
							        width:420,
							        title:'Array Grid'
							        
							    })
								});
					    	}
					win.show(gdc.common.dowloadButton.downloadBtn); 
    	};

        gdc.common.dowloadButton.downloadBtn.superclass.constructor.apply(this, arguments);

    }
});
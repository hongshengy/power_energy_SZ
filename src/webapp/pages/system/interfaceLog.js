/**
 * <p>Title: 购电侧接口调用日志</p>
 * <p>Description:业务接口调用日志管理</p>
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */
Ext.namespace("com.frontier.gdc.system.interfaceLog");
//页记录数
var pageSize = gdc.constant.pageSize;


//接口调用日志列表 grid reader
com.frontier.gdc.system.interfaceLog.jsonReader = new Ext.data.JsonReader({
        root : 'list',
        totalProperty : 'totalCount',
        id : 'id',
        successProperty : '@success'
    }, [ {
        name : 'id',
        mapping : 'id',
        type : 'float'
    }, {
        name : 'callType',
        mapping : 'callType'
    }, {
        name : 'visitor',
        mapping : 'visitor'
	}, {
        name : 'sysName',
        mapping : 'sysName'
	}, {
        name : 'interfaceName',
        mapping : 'interfaceName'
	}, {
        name : 'address',
        mapping : 'address'
	}, {
        name : 'callTime',
        mapping : 'callTime'
	}, {
        name : 'flag',
        mapping : 'flag'
	}]
);
	
//接口调用日志列表 grid store
com.frontier.gdc.system.interfaceLog.ds = new Ext.data.Store({
    proxy : new Ext.data.HttpProxy( {
        url : gdc.webContextRoot+'interfaceLog/findInterfaceLogByCondition.action'
    }),
    listeners:{
    	beforeload:function(){
    		var startTime = null;
    		var endTime = null;
    		var visitor = null;
    		var sysName = null;
    		var interfaceName = null;
    		var flag = null;
    		var callType = null;
    		var orderByColumnSql = null;
    		
    		if(Ext.getCmp('startTime')){
    			startTime = Ext.getCmp('startTime').getRawValue();
    		}
    		if(Ext.getCmp('endTime')){
    			endTime = Ext.getCmp('endTime').getRawValue();
    		}
    		if(Ext.getCmp('visitor')){
    			visitor = Ext.getCmp('visitor').getValue();
    		}
    		if(Ext.getCmp('sysName')){
    			sysName = Ext.getCmp('sysName').getValue();
    		}
    		if(Ext.getCmp('interfaceName')){
    			interfaceName = Ext.getCmp('interfaceName').getValue();
    		}
    		if(Ext.getCmp('flag')){
    			flag = Ext.getCmp('flag').getValue();
    		}
    		if(Ext.getCmp('callType')){
    			callType = Ext.getCmp('callType').getValue();
    		}
    		if(com.frontier.gdc.system.interfaceLog.sortInfo){
    			alert(encode(com.frontier.gdc.system.interfaceLog.sortInfo));
    		}
    		this.baseParams = {
				startTime:startTime,
				endTime:endTime,
				'interfaceLog.visitor':visitor,
				'interfaceLog.sysName':sysName,
				'interfaceLog.interfaceName':interfaceName,
				'interfaceLog.flag':flag,
				'interfaceLog.callType':callType,
				'interfaceLog.orderByColumnSql':orderByColumnSql
			}
    	}
    },
    reader : com.frontier.gdc.system.interfaceLog.jsonReader
});

//接口调用日志列表 grid
com.frontier.gdc.system.interfaceLog.createGrid = function(){
	function getInnterOutSystemName(v){
		if(v=='I'){
			return '内部系统';
		}else{
			return '外部系统';
		}
	}
	
	function getFlagName(v){
		if(v=='Y'){
			return '成功';
		}else{
			return '失败';
		}
	}
	
	//grid 列定义
	var cm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
		{
	        id : 'id',
	        header : '序号',
	        dataIndex : 'id',
	        align : 'center',
	        hidden:true
	    }, {
	        header : "调用用户",
	        dataIndex : 'visitor',
	        sortable : true,
	        align : 'center'
	    }, {
	        header : "系統名称",
	        dataIndex : 'sysName',
	        sortable : true,
	        align : 'center'
	    }, {
	        header : "接口名称",
	        dataIndex : 'interfaceName',
	        sortable : true,
	        align : 'center'
	    }, {
	        header : "接口调用日志地址",
	        dataIndex : 'address',
	        sortable : true,
	        align : 'center'
	    }, {
	        header : "调用时间",
	        dataIndex : 'callTime',
	        sortable : true,
	        align : 'center'
	    }, {
	        header : "内外系统",
	        dataIndex : 'callType',
	        sortable : true,
	        align : 'center',
	        renderer:getInnterOutSystemName
	    }, {
	        header : "是否成功",
	        dataIndex : 'flag',
	        sortable : true,
	        align : 'center',
	        renderer:getFlagName
	    }
	    
    ]);
    
    //分页工具栏 new Ext.PagingToolbar
    var bbar =  new gdc.grid.PagingToolbar( {
        pageSize : pageSize,
        store : com.frontier.gdc.system.interfaceLog.ds
    });
    
    //grid 
    var grid = new Ext.grid.GridPanel({
    	title : '',
    	cm : cm,
        collapsible : true,
        animCollapse : false,
        loadMask : true,
        autoShow : true,
        store : com.frontier.gdc.system.interfaceLog.ds,
        layout:'fit',
        viewConfig : {
           forceFit : true
        },
        bbar :bbar,
        tbar : [
        	'用户名称:',
        	new Ext.form.TextField({
        		id:'visitor',
				name:'interfaceLog.visitor',
				width:115
			}),
			'系统名称:',
        	new Ext.form.TextField({
        		id:'sysName',
				name:'interfaceLog.sysName'	,
				width:115		
			}),
			'接口名称:',
        	new Ext.form.TextField({
        		id:'interfaceName',
				name:'interfaceLog.interfaceName',
				width:115			
			}),
			'调用是否成功:',
			new Ext.form.ComboBox({
				id:'flag',
				hiddenName:'interfaceLog.flag',
				triggerAction:'all',
				store:new Ext.data.SimpleStore({
					fields: ['val','tex'],
					data: [
						['','请选择'],
						['Y','成功'],
						['N','失败']
					]
				}),
				valueField:'val',
				displayField:'tex',
				mode:'local',
				width:125
			})
		]
	});
	grid.on('sortchange',function(grid,sortInfo){
		//com.frontier.gdc.system.interfaceLog.sortInfo = sortInfo;
		//com.frontier.gdc.system.interfaceLog.ds.reload();
	});
	grid.on('render',function(){
		var nowDate = new Date();
		var addBar = new Ext.Toolbar({
			items:[
				'内外系统:',
				new Ext.form.ComboBox({
					id:'callType',
					hiddenName:'interfaceLog.callType',
					triggerAction:'all',
					store:new Ext.data.SimpleStore({
						fields: ['val','tex'],
						data: [
							['','请选择'],
							['I','内部系统'],
							['O','外部系统']
						]
					}),
					valueField:'val',
					displayField:'tex',
					mode:'local',
					width:185
				}),
				'调用时间:',
				new gdc.component.DateField({
					id:'startTime',
					width:182,
					value:nowDate
				}),
				{xtype: 'tbtext', text: '-'}, 
				new gdc.component.DateField({
					id:'endTime',
					width:182,
					value:nowDate
				}),
	        	{
		        	text : '查询',
		            iconCls : 'search',
		            handler : function() {
		            	if(Ext.getCmp('startTime').getValue()=='' || Ext.getCmp('endTime').getValue()==''){
		            		Appframe.viewinfdlg.warning.show("请填写调用时间！",false);
		            		return;
		            	}
		            	if(Ext.getCmp('startTime').getValue() > Ext.getCmp('endTime').getValue()){
		            		Appframe.viewinfdlg.warning.show("开始调用时间应小于结束调用时间！",false);
		            		return;
		            	}
		                com.frontier.gdc.system.interfaceLog.ds.reload({params:{start:0}});
		            }
		        }
			]
		})
		addBar.render(this.tbar);
		com.frontier.gdc.system.interfaceLog.ds.load();
	});
	com.frontier.gdc.system.interfaceLog.grid = grid;
	
	return com.frontier.gdc.system.interfaceLog.grid;
}



//新增
com.frontier.gdc.system.interfaceLog.add = function(){
	Ext.Ajax.request({
		url : gdc.webContextRoot + 'interfaceLog/addInterfaceLog.action',
		success : function(result,request) {
			var res = result.responseText;
			var tem = eval('('+res+')');
			if(tem.success==true){
				com.frontier.gdc.system.interfaceLog.ds.reload();
				Appframe.viewinfdlg.parent.right.show("操作成功！",true);
			}
		}
	});
}


/**
 * 主方法
 * @return {}
 */
com.frontier.gdc.system.interfaceLog.newMainPanel = function(){
	var panel = new Ext.Panel({
		layout : 'fit',
		border : false,
		items:[com.frontier.gdc.system.interfaceLog.createGrid ()]
	})
	return panel;
}

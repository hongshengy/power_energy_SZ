<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <jsp:include page="/ext.jsp" />
    <jsp:include page="/pages/common/head.jsp"></jsp:include>
    <title>My JSP 'MyJsp1.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript">
    Ext.onReady(function(){
 		var width = Ext.lib.Dom.getViewWidth();
 		var w1 = width*0.45;
 		var w2 = width*0.1;
 		var w3 = width*0.45;
      
    
    var coverRecord = new Ext.data.Record.create([
			{name:'MESSAGENAME',type:'string'},
			{name:'PARENTNAME',type:'string'},
			{name:'PARENTID',type:'string'},
			{name:'CODEID',type:'string'},
			{name:'MESSAGETYPE',type:'string'}
		]);
    var store = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'message/querySysNotice.action?param=0'}),
		reader:new Ext.data.JsonReader({
			root:'notNoticeList'
		},coverRecord)
	});
   
    var store1 = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'message/querySysNotice.action?param=1'}),
		reader:new Ext.data.JsonReader({
			root:'noticeList'
		},coverRecord)
	});
   
    var store2 = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'message/querySysNotice.action?param=2'}),
		reader:new Ext.data.JsonReader({
			root:'noticeList'
		},coverRecord)
	});
   
   var store3 = new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({url:'message/querySysNotice.action?param=3'}),
		reader:new Ext.data.JsonReader({
			root:'noticeList'
		},coverRecord)
	});
	
    var sm = new Ext.grid.CheckboxSelectionModel();
    var sm1 = new Ext.grid.CheckboxSelectionModel();
    var sm2 = new Ext.grid.CheckboxSelectionModel();
    var sm3 = new Ext.grid.CheckboxSelectionModel();
  
	var grid = new Ext.grid.GridPanel({
			width:w3,
			store: store,
	        columns: [sm,
	             {header: '父级名称', width: w3/2-40, sortable: true, dataIndex: 'PARENTNAME'},
	            {header: '异常名称', width: w3/2, sortable: true, dataIndex: 'MESSAGENAME'}
	        ],
			loadMask:{msg:'正在加载'},
			sm: sm,
			id:'gridUnlevel',
			height:Ext.lib.Dom.getViewHeight()-30
		});
	var grid1 = new Ext.grid.GridPanel({
			store: store1,
	        columns: [sm1,
	            {header: '父级名称', width: w3/2-40, sortable: true, dataIndex: 'PARENTNAME'},
	            {header: '异常名称', width: w3/2, sortable: true, dataIndex: 'MESSAGENAME'}
	        ],
			loadMask:{msg:'正在加载'},
			stripeRows: true,
			title:'严重信息',
			sm:sm1,
			id:"grid1",
			width : w3,
			height:(Ext.lib.Dom.getViewHeight()-30)/3
		});
	var grid2 = new Ext.grid.GridPanel({
			 store: store2,
	        columns: [sm2,
	             {header: '父级名称', width: w3/2-40, sortable: true, dataIndex: 'PARENTNAME'},
	            {header: '异常名称', width: w3/2, sortable: true, dataIndex: 'MESSAGENAME'}
	        ],
	        id:"grid2",
	        title:'一般信息',
			loadMask:{msg:'正在加载'},
			sm:sm2,
			stripeRows: true,
			width : w3,
			height:(Ext.lib.Dom.getViewHeight()-30)/3
		});
	var grid3 = new Ext.grid.GridPanel({
			store: store3,
	        columns: [sm3,
	             {header: '父级名称', width: w3/2-40, sortable: true, dataIndex: 'PARENTNAME'},
	            {header: '异常名称', width: w3/2, sortable: true, dataIndex: 'MESSAGENAME'}
	        ],
			loadMask:{msg:'正在加载'},
			id:"grid3",
			sm:sm3,
			stripeRows: true,
			title:'提示信息',
			width : w3,
			height:(Ext.lib.Dom.getViewHeight()-30)/3
		});
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
        
       var viewport = new Ext.Viewport({
            layout:'border',
            items:[
                {
                    region:'east',
                    width: w1,
                    layout:'form',
                    bodyStyle: 'border:0px;',
                    items:[
                    	grid1,
                    	grid2,
                    	grid3
                    ]
                 },{
                    region:'west',
                    title:'未分级消息',
                    bodyStyle: 'border:0px;',
                    width: w3,
                    layout:'fit',
                    items:[
                    	grid
                    ]
                }
                ,{
                    region:'south',
                    bodyStyle: 'border:0px;',
                    layout:'fit',
                    height:30,
                    items:[
                    	new Ext.Panel({
                    		contentEl:'bottom'
                    	})
                    ]
                },
                {
                    region:'center',
                    title:'操作',
                    bodyStyle: 'border:0px;',
                    width: w2,
                    layout:'fit',
                    height:111,
                    items:[
                    	new Ext.Panel({
                    		contentEl:'btnDiv'
                    	})
                    ]
                }
             ]
        });
        store.load();
        store1.load();
        store2.load();
        store3.load();
    });
    
    function add(id)
	{
		var selectedRecord = Ext.getCmp("gridUnlevel").getSelectionModel().getSelections();
		for(var i=0;i<selectedRecord.length;i++)
		{
			Ext.getCmp("gridUnlevel").getStore().remove(selectedRecord[i]);
		}
		Ext.getCmp(id).getStore().add(selectedRecord);
	}
	function remove(id)
	{
		var selectedRecord = Ext.getCmp(id).getSelectionModel().getSelections();
		for(var i=0;i<selectedRecord.length;i++)
		{
			Ext.getCmp(id).getStore().remove(selectedRecord[i]);
		}
		Ext.getCmp("gridUnlevel").getStore().add(selectedRecord);
	}
	
    
    function save()
	{
		disWaitDisplayForQuery();
		var param = "";
		var store1 = Ext.getCmp("grid1").getStore();
		for(var i=0;i<store1.getCount();i++)
		{
			param = param + "1`"
				+ store1.getAt(i).get("MESSAGETYPE") + "`"
				+ store1.getAt(i).get("MESSAGENAME") + "`"
				+ store1.getAt(i).get("PARENTID") + "`"
				+ store1.getAt(i).get("PARENTNAME") + "`"
				+ ","
				;
		}
		
		var store2 = Ext.getCmp("grid2").getStore();
		for(var j=0;j<store2.getCount();j++)
		{
			param = param + "2`"
				+ store2.getAt(j).get("MESSAGETYPE") + "`"
				+ store2.getAt(j).get("MESSAGENAME") + "`"
				+ store2.getAt(j).get("PARENTID") + "`"
				+ store2.getAt(j).get("PARENTNAME") + "`"
				+ ","
				;
		}
		
		var store3 = Ext.getCmp("grid3").getStore();
		for(var k=0;k<store3.getCount();k++)
		{
			param = param + "3`"
				+ store3.getAt(k).get("MESSAGETYPE") + "`"
				+ store3.getAt(k).get("MESSAGENAME") + "`"
				+ store3.getAt(k).get("PARENTID") + "`"
				+ store3.getAt(k).get("PARENTNAME") + "`"
				+ ","
				;
		}
		
		param = encodeURIComponent(encodeURIComponent(param));
			$.ajax({
                type:"post",
                data:"&param="+param,
                url:"<%=basePath%>message/saveMessageConfig.action",
                dataType:"html",
                success:function(result) 
                {
                	var obj = eval('('+result+')');
                	if(obj.result == true)
                	{
                	 	Appframe.viewinfdlg.right.show('保存成功!', true);
                	}
                	else
                	{
                		Appframe.viewinfdlg.error.show('保存失败,'+obj.msg, false);
                	}
	            }
			});
	}
	</script>

  </head>
  
  <body>
  	<div id="btnDiv">
  		<table style="height:100%;width:100%;">
  			<tr>
  				<td style="text-align:center;">
  					<div style="width:100%;margin:3px;">
  						<input type="button" value="---->>" onclick="add('grid1');"/>
  					</div>
  					<div style="width:100%;margin:3px;">
  						<input type="button" value="<<----" onclick="remove('grid1');"/>
  					</div>
  				</td>
  			</tr>
  			<tr>
  				<td style="text-align:center;">
  					<div style="width:100%;margin:3px;">
  						<input type="button" value="---->>" onclick="add('grid2');"/>
  					</div>
  					<div style="width:100%;margin:3px;">
  						<input type="button" value="<<----" onclick="remove('grid2');"/>
  					</div>
  				</td>
  			</tr>
  			<tr>
  				<td style="text-align:center;">
  					<div style="width:100%;margin:3px;">
  						<input type="button" value="---->>" onclick="add('grid3');"/>
  					</div>
  					<div style="width:100%;margin:3px;">
  						<input type="button" value="<<----" onclick="remove('grid3');"/>
  					</div>
  				</td>
  			</tr>
  		</table>
  	</div>
  	<div id="bottom" style="text-align:center;vertical-align:middile;height:25px">
  		<button type="button" class=btn1_mouseout onmouseover="this.className='btn1_mouseover'" onmouseout="this.className='btn1_mouseout'" id="saveBtn" onclick="save();" onfocus="this.blur();" tabindex="3" name="bottom">保存</button>
  	</div>
  </body>
</html>

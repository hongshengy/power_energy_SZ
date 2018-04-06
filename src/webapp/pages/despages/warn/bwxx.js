/**wz
 */
var alarmColor = null;//告警级别颜色
//7007 颜色的集合
var colorList='';

$(function(){
	$('#shijian').combobox({//加载下拉框
		valueField:'id',
		textField:'text',
		data:[{    
		    "id":'',    
		    "text":"请选择"   
		},{    
		    "id":'1',    
		    "text":"合->分"   
		},{    
		    "id":'0',    
		    "text":"分->合"   
		}]  
	});//加
	  //选择大用户树
	$('#userTree').combobox({    
		url:webContextRoot +'destree/queryTree.action?isQyCode=false&ziMu=',
		valueField: 'id',
		textField: 'text' ,
	    onChange: function(newValue, oldValue){
	    	if(isNaN(newValue)){
//				 newValue = $('#userTree').combobox('getText');
//					$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu='+newValue,{ 
//							},
//							function(json){
//								$('#userTree').combobox('loadData',json);	
//							}
//									);
   	}else{
//   		 newValue = $('#userTree').combobox('getText');
//				$.getJSON(webContextRoot + 'destree/queryTree.action?isQyCode=false&ziMu=',{ 
//						},
//						function(json){
//							$('#userTree').combobox('loadData',json);	
//						}
//				);
				var qiteid = $('#userTree').combobox('getValue');
	    	if(!isNaN(qiteid)){
	    	$('#usershebeiTree').combotree({
	    	url:webContextRoot +'destree/queryYhbTree.action?treeState=closed&treeNodeType=1&treeState=open&id='+qiteid,//带参数地址
		    method:'get',
		    multiple:false,//是否支持多选
		    onChange: function(newValue, oldValue){//请求之前
		    	var	yhb = $('#usershebeiTree').combobox('getValue');

				    	$('#shebei').combotree({
						    method:'get',
						    multiple:false,
						    onBeforeLoad:function(node){//请求之前
						    	var treeNodeType;
								if(node){//点击节点
									treeNodeType = node.type;//获取节点类型
									$('#shebei').combotree('tree').tree('options').url=webContextRoot 
									+'destree/queryYhbTree.action?treeState=closed&treeNodeType='+treeNodeType;//带参数地址
								}else{
									$('#shebei').combotree('tree').tree('options').url=webContextRoot +'destree/queryYhbTree.action?treeState=closed&treeNodeType=2&id='+yhb;//带参数地址
									
								}
							}//是否支持多选
				    		
				    	})
				}
	    	});
	    }
		}
	    }
	});
	
	gaojingList();
})
 
//告警列表
function gaojingList(){
	var startDate =  $('#startDate').val();//开始日期
	var endDate =  $('#endDate').val();//结束日期
	if(startDate> endDate){
		$.messager.alert('提示', "开始日期不能大于结束日期！", 'warning');
		return;
	}
	
	var columns = [[
	        {field:'consName',title:'企业名称',width:'15%',align:'center'},
	        {field:'subsName',title:'用户变名称',width:'15%',align:'center'},
		    {field:'deviceName',title:'设备名称',width:'15%',align:'center'},
		    {field:'deviceTypeName',title:'设备类型',width:'15%',align:'center'},
		    {field:'alarmStartTime',title:'发生时间',width:'15%',align:'center'},
		    {field:'preValue',title:'变位事件',width:'15%',align:'center',formatter: function(v,row,index){ //超链接
		    	return  row.preValue+'->'+row.curValue;
		    }}
	  ]];
	
	$('#gjcx-datagrid').datagrid({// 表格
		nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		striped : true,// 设置为true将交替显示行背景。
		border:false,
		 width:'100%',
	      height:'100%',
		pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		fitColumns : false,// 自动适应宽度
		singleSelect : true,// 设置为true将只允许选择一行。
		rownumbers : true,// 设置为true将显示行数。
		pageNumber:1,//在设置分页属性的时候初始化页码。
		pageSize:20,//在设置分页属性的时候初始化页面大小。
		url:webContextRoot +'pfgd/querygaojingchaxunshouye.action',
		queryParams:{
			'gaoJIngChaXunSYModel.subsId' :$('#usershebeiTree').combotree('getValue'),
			'gaoJIngChaXunSYModel.bianwei' :1,
			'gaoJIngChaXunSYModel.gaojing' :0,
			
			'gaoJIngChaXunSYModel.orgNo' :$('#shijian').combobox('getValue'),
			'gaoJIngChaXunSYModel.consId': $('#userTree').combobox('getValue'),
			
 			'gaoJIngChaXunSYModel.deviceId': $('#shebei').combobox('getValue'),
			'gaoJIngChaXunSYModel.alarmStartTime' :startDate,
			'gaoJIngChaXunSYModel.alarmEndTime' :endDate
		},
		loadMsg : "正在努力的读取数据中...",// 提示信息
		columns : columns,//字段
		loadFilter: function(data){
			if (data.sMap){
				return data.sMap;
			} else {
				return data;
			}
		}
	});
}

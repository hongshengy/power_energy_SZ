/**
 * 谐波分析 电能质量检测
 * @author 王国际
 * @since 2017-04-25
 */
var isSpecial = false;
mydyChart = '';//电压chart
mydlChart = '';//电量 chart
mysxdlChart = '';//三相电流 chart
var startDate = new Date();//当前结束时间  为当前时间
var dataType = 'U';//U 电压  I 电流   默认电压
var tranId ='';//变压器编码
var IsFitsI=true;//是否第一次进入电流页面

var dylegend = [];//电压的legend 
var dllegend = [];//电量的legend 
var dyseries = [];//电压的series 
var dlseries = [];//电量的series 
var selectdyRow = [];//  默认选中  第7和第8行
var selectdlRow = [];//  默认选中  第7和第8行

var fistdySelect=true;//首次选中一行电压
var fistdlSelect=true;//首次选中一行电流
 
//js入口
$(function(){
	
	 $('#tabs').tabs({
       fit: true,//填充大小
       plain: true,
       onSelect: function(title,index){
    	   if(title=="谐波"){
    		   dataType = "U";//选择tabs的时候触发
    		   //按键样式
    		   $("#mytab-xb li").removeClass("active");
    		   $("#mytab-xb #xb_dy_bt").addClass("active");
    		   //内容隐藏/显示
    		   $("#xb_dy_div").show();
    		   $("#xb_dl_div").hide();
    		   
    		   kbfxdyGrid();//谐波分析，电压 表格
    		   if(isSpecial){
    			   getjtxbfxData();
				}else{
					getkbfxData();//查询谐波分析数据
				}
    	   }else{
    		   getSXDL();//三相电流
    	   }
	    	   
//	    	   if(dataType=="I"&& IsFitsI==true){
//	    		   kbfxdlGrid();//谐波分析，电流 表格
//	    		   mydlChart = echarts.init(document.getElementById('dlChart'));//初始化电量chart
//	    		   getkbfxData();//查询谐波分析
//	    		   IsFitsI=false;//是否第一次进入电流页面
//	    	   }
    	  }
     }); 
	 
	 /**
	  * 谐波 二级菜单点击事件
	  */
	 $("#mytab-xb li").click(function(){
		 if($(this).attr("id") == 'xb_dy_bt'){
			 dataType="U";
		 }else if($(this).attr("id") == 'xb_dl_bt'){
			 dataType="I";
		 }
		 //设置二级菜单样式
		 $("#mytab-xb li").removeClass("active");
		 $(this).addClass("active");
		 //设置 电流/电压 显示/隐藏
		 var xb_content = $("#xb_content").children();
//		 console.log(xb_content);
		 for(var i in xb_content){
			 $("#"+xb_content[i].id).hide();
//			 console.log(xb_content[i]);
		 }
		 var tabName = $(this).attr("id");
		 $("#"+tabName.substr(0,tabName.length-2)+"div").show();
		 //加载数据
		 if(dataType=="I"&& IsFitsI==true){
  		    kbfxdlGrid();//谐波分析，电流 表格
  		    if(isSpecial){
  		    	getjtxbfxData();
			}else{
				if(mydlChart == '')
					mydlChart = echarts.init(document.getElementById('dlChart'));//初始化电量chart
				getkbfxData();//查询谐波分析数据
			}
//  		    getkbfxData();//查询谐波分析
  		    IsFitsI=false;//是否第一次进入电流页面
  	     }else if(dataType=="I"){
  	    	kbfxdlGrid();//谐波分析，电流 表格
  	    	if(isSpecial){
  	    		getjtxbfxData();
			}else{
				getkbfxData();//查询谐波分析数据
			}
//   		    getkbfxData();//查询谐波分析
  	     }else if(dataType=="U"){
   	    	kbfxdyGrid();//谐波分析，电压 表格
   	    	if(isSpecial){
   	    		getjtxbfxData();
			}else{
				getkbfxData();//查询谐波分析数据
			}
//   		    getkbfxData();//查询谐波分析
  	     }
	 });
	
	$('#startDate').val(DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,startDate)));//初始化时间选择
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
//		$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//			// modeType=1，过滤含有变压器的客户
//			url:webContextRoot +'destree/queryTree.action?modeType=1',//查询树及诶单
//		    method:'get',
//		    multiple:false,//是否支持多选
//		    editable:'true',
//		    onClick: function(node){
//		    	// 获取根节点
//		    	var rootNode = $('#tree-leftQyTree').tree('getRoot',node.target);
//		    	// 不是根节点时，刷新页面
//		    	if(rootNode.id != node.id){
//					consId = node.id;//把树节点id赋给企业id
//					consName = node.text;//把树节点的值赋给企业名称
//					getbyqData();//获取变压器
//					queryUserFiles();//查询档案内容
//		    	}else{
//		    		$.messager.alert('提示', '请选择客户', 'warning');
//		    	}
//				
//			},
//			onLoadSuccess:function(node, data){//加载成功返回
////				console.log(data);
//				if(data!=null&&data.length>0){
//					if(data[0].subsName=='101'){
//						isSpecial = true;
//					}
//					selectTree();//树节点选中，默认选中第一个客户
//				}
//			}
//		});
//		
//		searchTreeNode();//树模糊查询
		
		//设置选择客户后执行的方法
//		consSelectMethod = "consSelectMethodLoad()";
		//加载客户(url,是否需要区域能源根节点,没有客户时给出的提示)
//		consSelect(webContextRoot + "destree/queryTree.action?modeType=1",false,'请先给客户添加变压器');
		
		//设置选择客户后执行的方法
		 consSelectMethod = "consSelectMethodLoad()";
		 consSelectHasRoot = false;
		 consSelectSearch("",true);
	}else{
		if(consId.substr(0,3)=='101'){
			isSpecial = true;
		}
		getbyqData();//获取变压器下拉
   	    queryUserFiles();//查询档案内容
	}
	
	 //查询事件
	$('#search').click(function(){
		if(isSpecial){
			getjtxbfxData();
		}else{
			getkbfxData();//查询谐波分析数据
		}
//		getkbfxData();//查询谐波分析数据
		getSXDL();//查询三相电流
	});
	
	 //左减日期
	$('#left').click(function(){
		var startDate =  $('#startDate').val();//获取当前开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',-1,DateUtil.strToDate(startDate)));//月份减1
		$('#startDate').val(nowDate);//重新赋值
		if(isSpecial){
			getjtxbfxData();
		}else{
			getkbfxData();//查询谐波分析数据
		}
//		getkbfxData();
		getSXDL();//查询三相电流
	});
	
	 //右加日期
	$('#right').click(function(){
		var startDate =  $('#startDate').val();//开始日期
		var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('d',1,DateUtil.strToDate(startDate)));//月份加1
		$('#startDate').val(nowDate);//重新赋值
		if(isSpecial){
			getjtxbfxData();
		}else{
			getkbfxData();//查询谐波分析数据
		}
//		getkbfxData();//获取电能质量检测
		getSXDL();//查询三相电流
	});
	
	kbfxdyGrid();//加载电压的表格
}); 

//查询事件
function changeDate(){
	if(isSpecial){
		getjtxbfxData();
	}else{
		getkbfxData();//查询谐波分析数据
	}
//	getkbfxData();//查询谐波分析数据
	getSXDL();//查询三相电流
}
/**
 * 设置选择客户后执行的方法
 */
function consSelectMethodLoad(){
	//判断是否是  金坛  特制页面
	if(top.areaNo=='101'){
		isSpecial = true;
	}
//	console.log(top.areaNo);
		
	consId = consSelectCon.id;//把树节点id赋给企业id
	consName = consSelectCon.text;//把树节点的值赋给企业名称
	getbyqData();//获取变压器
	queryUserFiles();//查询档案内容
}

//选中节点
function selectTree(nodeId){
	$('#tree-leftQyTree li:eq(0)').find('div').addClass("tree-node-selected");//添加选中样式
	var n = $('#tree-leftQyTree').tree('getSelected');//获取被选中的节点
	if(n!=null)//判断节点是否存在
	{
		$('#tree-leftQyTree').tree('select',n.target);
	}
	
	var chiNode = $('#tree-leftQyTree').tree('getChildren',n.target);//子节点
	if(chiNode.length == 0){
		$.messager.alert('提示', '请先给客户添加变压器', 'warning');
	} else {
		for(var i=0 ; i < chiNode.length ; i++)//循环节点
	    {
			 if(nodeId!=null?chiNode[i].id==nodeId:chiNode[i].type==1)//查找定位
			  {
				 	var n = $('#tree-leftQyTree').tree("find",chiNode[i].id);//根据id获取节点
	          	   	$('#tree-leftQyTree').tree('select',n.target);//选中节点
	          	   	$('#tree-leftQyTree').tree('scrollTo',n.target);//滚动到节点
	          	    consId = chiNode[i].id;//把树节点id赋给企业id
	          	    consName = chiNode[i].text;//把树节点的值赋给企业名称
	          	    getbyqData();
	          	    queryUserFiles();//查询档案内容
	          	   	break;//跳出循环
			 }
	    }
	}
}

//查询谐波分析
function getkbfxData(){
	if(mydyChart == '')
		mydyChart = echarts.init(document.getElementById('dyChart'));//初始化电压chart
	dylegend = [];//电压的legend 
    dllegend = [];//电量的legend 
	dyseries = [];//电压的series 
	dlseries = [];//电量的series 
	var dataDate =  $('#startDate').val();//查询时间
	if(dataType=="U"){//电压
		$('#kbfxdy-datagrid').datagrid("loading");//loading画面
		mydyChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}else{
		$('#kbfxdl-datagrid').datagrid("loading");//loading画面
		mydlChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}
	$.getJSON(webContextRoot +'energyPowerQualityMonitor/querykbfxValue.action', //查询用户变下面的负载率和变损率
		{ 
	      'bandAnalyseModel.tranId':tranId,//变压器id
	      'bandAnalyseModel.dataType':dataType,//查询数据类型  U 电压  I 电流
	      'bandAnalyseModel.dataDate':dataDate//变压器id
		},
		function(json){//返回值
			
				if(dataType=="U"){//电压
					$('#kbfxdy-datagrid').datagrid("loaded");//loading画面关闭
					mydyChart.hideLoading();
					if(json.length>0){//如果返回的有值
						$('#kbfxdy-datagrid').datagrid('loadData', json);//加载数据
						
						$('#kbfxdy-datagrid').datagrid('mergeCells',{//合并单元格
							index: 0,
							field: 'shownLine',
							rowspan: 2
						});
						$('#kbfxdy-datagrid').datagrid('mergeCells',{//合并单元格
							index: 2,
							field: 'shownLine',
							rowspan: 2
						});
						$('#kbfxdy-datagrid').datagrid('mergeCells',{//合并单元格
							index: 4,
							field: 'shownLine',
							rowspan: 2
						});
						$('#kbfxdy-datagrid').datagrid('mergeCells',{//合并单元格
							index: 6,
							field: 'shownLine',
							rowspan: 2
						});
						
						$('#kbfxdy-datagrid').datagrid('mergeCells',{//合并单元格
							index: 0,
							field: 'abX',
							rowspan: 2
						});
						$('#kbfxdy-datagrid').datagrid('mergeCells',{//合并单元格
							index: 2,
							field: 'abX',
							rowspan: 2
						});
						$('#kbfxdy-datagrid').datagrid('mergeCells',{//合并单元格
							index: 4,
							field: 'abX',
							rowspan: 2
						});
						$('#kbfxdy-datagrid').datagrid('mergeCells',{//合并单元格
							index: 6,
							field: 'abX',
							rowspan: 2
						});
						
						if(fistdySelect==true){
							$('#kbfxdy-datagrid').datagrid('selectRow', 6); // 选择第N行
							fistdySelect=false;//首次选中一行电压
						}else{
							//选择出发 onCheck事件，加载下方图
							for(var i=0 ; i < selectdyRow.length ; i++){//循环节点 
								$('#kbfxdy-datagrid').datagrid('selectRow', selectdyRow[i]); // 选择第N行
							} 
						}
					}
				}else{
					$('#kbfxdl-datagrid').datagrid("loaded");//loading画面关闭
					mydlChart.hideLoading();
					if(json.length>0){//如果返回的有值
						$('#kbfxdl-datagrid').datagrid('loadData', json);//加载数据
						
						$('#kbfxdl-datagrid').datagrid('mergeCells',{
							index: 0,
							field: 'shownLine',
							rowspan: 2
						});
						$('#kbfxdl-datagrid').datagrid('mergeCells',{
							index: 2,
							field: 'shownLine',
							rowspan: 2
						});
						$('#kbfxdl-datagrid').datagrid('mergeCells',{
							index: 4,
							field: 'shownLine',
							rowspan: 2
						});
						$('#kbfxdl-datagrid').datagrid('mergeCells',{
							index: 6,
							field: 'shownLine',
							rowspan: 2
						});
						
						$('#kbfxdl-datagrid').datagrid('mergeCells',{
							index: 0,
							field: 'abX',
							rowspan: 2
						});
						$('#kbfxdl-datagrid').datagrid('mergeCells',{
							index: 2,
							field: 'abX',
							rowspan: 2
						});
						$('#kbfxdl-datagrid').datagrid('mergeCells',{
							index: 4,
							field: 'abX',
							rowspan: 2
						});
						$('#kbfxdl-datagrid').datagrid('mergeCells',{
							index: 6,
							field: 'abX',
							rowspan: 2
						});
						if(fistdlSelect==true){
							$('#kbfxdl-datagrid').datagrid('selectRow', 6); // 选择第N行
							fistdlSelect=false;
						}else{
							//选择出发 onCheck事件，加载下方图
							for(var i=0 ; i < selectdlRow.length ; i++){//循环节点 
								$('#kbfxdl-datagrid').datagrid('selectRow', selectdlRow[i]); // 选择第N行
							}
						}
					}
				}
			}
        );
}


//查询下拉框 的 变压器
function getbyqData(){
	
	$.getJSON(webContextRoot +'byqjc/queryPowerList.action', //查询用户变下面的负载率和变损率
		{ 
	      'sfGTranModel.consId':consId//用户变id
		},
		function(json){//返回值
				$('#byq').combobox({
					data:json,
					valueField: 'tranId',
					textField: 'tranName',
					onLoadSuccess:function(){
						var byqData = $(this).combobox("getData");
						if(byqData.length>0){
							$('#byq').combobox('select',byqData[0].tranId);
						}else{
							$('#byq').combobox('select','');
							tranId = '';
							if(isSpecial){
								getjtxbfxData();
							}else{
								getkbfxData();//查询谐波分析数据
							}
							getSXDL();//查询三相电流
						}
					},
					onSelect:function(data){
						tranId = data.tranId;
						if(isSpecial){
							getjtxbfxData();
						}else{
							getkbfxData();//查询谐波分析数据
						}
						getSXDL();//查询三相电流
					}
				});
		}
   );
	 
}

//查询档案内容
function queryUserFiles(){
	//查询设置时间
	  $.getJSON(webContextRoot + 'pCode/queryuserFiles.action', {
		  'sfdConsModel.consId':consId//企业id
	  },
	  function(json){
		  var consNoObj = document.getElementById('consNo');
		  var consNOName = "客户编号: "
		  consNoObj.innerHTML = consNOName+json[0].consNo;
		  $('#consNo').attr("title",json[0].consNo);
		  
		  var consNameObj = document.getElementById('consName');
		  var consNameName = "客户名称: "
		  var consNameStr = json[0].consName;
		  consNameObj.innerHTML = consNameName+consNameStr;
		  if(consNameStr.length>10){
			  consNameObj.innerHTML = consNameName+consNameStr.substring(0,10)+'...';
		  }else{
			  consNameObj.innerHTML = consNameName+consNameStr;
		  }
		  $('#consName').attr("title",consNameStr);
		  
		  var contractCapObj = document.getElementById('htrl');
		  var contractCapName = "合同容量(kVA): "
		  contractCapObj.innerHTML = contractCapName+json[0].contractCap;
		  $('#htrl').attr("title",json[0].contractCap);
		  
		  var elecAddrObj = document.getElementById('address');
		  var elecAddrName = "用电地址: "
		  var elecAddrNameStr = json[0].elecAddr;
		  if(elecAddrNameStr.length>10){
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr.substring(0,10)+'...';
		  }else{
			  elecAddrObj.innerHTML = elecAddrName+elecAddrNameStr;
		  }
		  $('#address').attr("title",elecAddrNameStr);
		  
		  var checkFlagObj = document.getElementById('khzt');
		  var checkFlagName = "客户状态: "
		  if(json[0].statusCode=="1"){
			  checkFlagObj.innerHTML = checkFlagName+'正常用户';
			  $('#khzt').attr("title",'正常用户');
		  }else if(json[0].statusCode=="2"){
			  checkFlagObj.innerHTML = checkFlagName+'已注销';
			  $('#khzt').attr("title",'已注销');
		  }
	  });
}

//谐波分析，电流 表格
function kbfxdlGrid(){
 
	$('#kbfxdl-datagrid').datagrid({
	   width:'100%',
	   height:'100%',
	   border:false,
	   singleSelect:false,
	   rownumbers:true,
	   fitColumns:true,
	   pagination : false,// 设置true将在数据表格底部显示分页工具栏。
	   loadMsg : "正在努力的读取数据中...",// 提示信息
	   columns:[[  
					{title:'谐波次数',colspan:3},    
					{title:'3次(A)',colspan:1},   
					{title:'5次(A)',colspan:1}, 
					{title:'7次(A)',colspan:1},
					{title:'11次(A)',colspan:1},
					{title:'13次(A)',colspan:1}, 
					{title:'THD-I(%)',colspan:1}, 
				],[    
					{title:'国家标准',colspan:3},
					{title:'62',colspan:1},   
					{title:'62',colspan:1}, 
					{title:'44',colspan:1}, 
					{title:'28',colspan:1}, 
					{title:'24',colspan:1}, 
					{title:'',colspan:1} 
			],[ 
				{field:'shownLine',align:'center',checkbox:true,width:10},
				{field:'abX',title:'',width:130,align:'center',sortable:false}, 
				{field:'dataMaxOrAvg',title:'',width:130,align:'center',sortable:false}, 
				{field:'maxData3',title:'',width:130,align:'center',sortable:false},   
				{field:'maxData5',title:'',width:130,align:'center',sortable:false}, 
				{field:'maxData7',title:'',width:130,align:'center',sortable:false}, 
				{field:'maxData11',title:'',width:130,align:'center',sortable:false}, 
				{field:'maxData13',title:'',width:130,align:'center',sortable:false}, 
				{field:'maxDataTHD',title:'',width:130,align:'center',sortable:false} 
		 ]]
	
	});
	
	$('#kbfxdl-datagrid').datagrid({
		onUnselectAll: function(rowIndex,rowData){
			selectdlRow=[];
			dllegend=[];
			dlseries=[];
			getUcharData();//加载图表
		},
		onSelectAll: function(rowIndex,rowData){
			selectdlRow=[0,1,2,3,4,5,6,7];
			dllegend=[];
			dlseries=[];
			getLegendAndSeries(0,'#kbfxdl-datagrid');
			getLegendAndSeries(2,'#kbfxdl-datagrid');
			getLegendAndSeries(4,'#kbfxdl-datagrid');
			getLegendAndSeries(6,'#kbfxdl-datagrid');
		},
		onUncheck: function(rowIndex,rowData){
			if(rowIndex==1||rowIndex==3||rowIndex==5||rowIndex==7){
				return;
			}
			if(rowIndex==0){
				selectdlRow.splice(selectdlRow.indexOf(0),2);
				dlseries.splice(dllegend.indexOf("A相最高"),2);
				dllegend.splice(dllegend.indexOf("A相最高"),2);
				$('#kbfxdl-datagrid').datagrid('unselectRow', 1); // 取消选择第1行
			}else if(rowIndex==2){
				selectdlRow.splice(selectdlRow.indexOf(2),2);
				dlseries.splice(dllegend.indexOf("B相最高"),2);
				dllegend.splice(dllegend.indexOf("B相最高"),2);
				$('#kbfxdl-datagrid').datagrid('unselectRow', 3); // 取消选择
			}else if(rowIndex==4){
				selectdlRow.splice(selectdlRow.indexOf(4),2);
				dlseries.splice(dllegend.indexOf("C相最高"),2);
				dllegend.splice(dllegend.indexOf("C相最高"),2);
				$('#kbfxdl-datagrid').datagrid('unselectRow', 5); // 取消选择
			}else{
				selectdlRow.splice(selectdlRow.indexOf(6),2);
				dlseries.splice(dllegend.indexOf("总计最高"),2);
				dllegend.splice(dllegend.indexOf("总计最高"),2);
				$('#kbfxdl-datagrid').datagrid('unselectRow', 7); // 取消选择
			}
			getUcharData();//加载图表
		},
		onCheck: function(rowIndex,rowData){
			getLegendAndSeries(rowIndex,'#kbfxdl-datagrid');
		}
	});

 }

//谐波分析，电压 表格
function kbfxdyGrid(){
 
	$('#kbfxdy-datagrid').datagrid({
		fit:true,
	   border:false,
	   singleSelect:false,
	   rownumbers:true,
	   fitColumns:true,
	   pagination : false,// 设置true将在数据表格底部显示分页工具栏。
	   loadMsg : "正在努力的读取数据中...",// 提示信息
	   columns:[[  
					{title:'谐波次数',colspan:3},    
					{title:'3次(%)',colspan:1},   
					{title:'5次(%)',colspan:1}, 
					{title:'7次(%)',colspan:1},
					{title:'11次(%)',colspan:1},
					{title:'13次(%)',colspan:1}, 
					{title:'THD-U(%)',colspan:1} 
				],[    
					{title:'国家标准',colspan:3},
					{title:'4%',colspan:1},   
					{title:'4%',colspan:1}, 
					{title:'4%',colspan:1}, 
					{title:'4%',colspan:1}, 
					{title:'4%',colspan:1}, 
					{title:'5%',colspan:1} 
			],[ 
				{field:'shownLine',align:'center',checkbox:true,width:10},
				{field:'abX',title:'',width:130,align:'center',sortable:false}, 
				{field:'dataMaxOrAvg',title:'',width:130,align:'center',sortable:false}, 
				{field:'maxData3',title:'',width:130,align:'center',sortable:false},   
				{field:'maxData5',title:'',width:130,align:'center',sortable:false}, 
				{field:'maxData7',title:'',width:130,align:'center',sortable:false}, 
				{field:'maxData11',title:'',width:130,align:'center',sortable:false}, 
				{field:'maxData13',title:'',width:130,align:'center',sortable:false}, 
				{field:'maxDataTHD',title:'',width:130,align:'center',sortable:false} 
		 ]]
	
	});
	
	$('#kbfxdy-datagrid').datagrid({
		
		onUnselectAll: function(rowIndex,rowData){
			selectdyRow=[];
			dylegend=[];
			dyseries=[];
			 getUcharData();//加载图表
		},
		onSelectAll: function(rowIndex,rowData){
			selectdyRow=[0,1,2,3,4,5,6,7];
			dylegend=[];
			dyseries=[];
			getLegendAndSeries(0,'#kbfxdy-datagrid');
			getLegendAndSeries(2,'#kbfxdy-datagrid');
			getLegendAndSeries(4,'#kbfxdy-datagrid');
			getLegendAndSeries(6,'#kbfxdy-datagrid');
		},
		onUncheck: function(rowIndex,rowData){
			if(rowIndex==1||rowIndex==3||rowIndex==5||rowIndex==7){
				return;
			}
			if(rowIndex==0){
				selectdyRow.splice(selectdyRow.indexOf(0),2);
				dyseries.splice(dylegend.indexOf("AB相最高"),2);
				dylegend.splice(dylegend.indexOf("AB相最高"),2);
				$('#kbfxdy-datagrid').datagrid('unselectRow', 1); // 取消选择第1行
			}else if(rowIndex==2){
				selectdyRow.splice(selectdyRow.indexOf(2),2);
				dyseries.splice(dylegend.indexOf("BC相最高"),2);
				dylegend.splice(dylegend.indexOf("BC相最高"),2);
				$('#kbfxdy-datagrid').datagrid('unselectRow', 3); // 取消选择
			}else if(rowIndex==4){
				selectdyRow.splice(selectdyRow.indexOf(4),2);
				dyseries.splice(dylegend.indexOf("CA相最高"),2);
				dylegend.splice(dylegend.indexOf("CA相最高"),2);
				$('#kbfxdy-datagrid').datagrid('unselectRow', 5); // 取消选择
			}else{
				selectdyRow.splice(selectdyRow.indexOf(6),2);
				dyseries.splice(dylegend.indexOf("总计最高"),2);
				dylegend.splice(dylegend.indexOf("总计最高"),2);
				$('#kbfxdy-datagrid').datagrid('unselectRow', 7); // 取消选择
			}
			getUcharData();//加载图表
		},
		onCheck: function(rowIndex,rowData){
			getLegendAndSeries(rowIndex,'#kbfxdy-datagrid');
		}
	});
 }

//获取图表的legend和Series
function getLegendAndSeries(rowIndex,gridDiv){

	if(rowIndex%2==1){
		return;
	}
	$(gridDiv).datagrid('selectRow', rowIndex+1);//选择偶数行
	var abMaxAvg="";
	if(rowIndex==0){ 
		if(dataType == 'U'){
			if(selectdyRow.indexOf(0)<0){
				selectdyRow.push(0);
			}
		}else{
			if(selectdlRow.indexOf(0)<0){
			   selectdlRow.push(0);
			}
		}
		abMaxAvg=dataType == 'U'?"AB相":"A相";
	}else if(rowIndex==2){
		if(dataType == 'U'){
			if(selectdyRow.indexOf(2)<0){
				selectdyRow.push(2);
			}
		}else{
			if(selectdlRow.indexOf(2)<0){
			   selectdlRow.push(2);
			}
		}
		abMaxAvg=dataType == 'U'?"BC相":"B相";
	}else if(rowIndex==4){
		if(dataType == 'U'){
			if(selectdyRow.indexOf(4)<0){
				selectdyRow.push(4);
			}
		}else{
			if(selectdlRow.indexOf(4)<0){
			   selectdlRow.push(4);
			}
		}
		abMaxAvg=dataType == 'U'?"CA相":"C相";
	}else if(rowIndex==6){
		if(dataType == 'U'){
			if(selectdyRow.indexOf(6)<0){
				selectdyRow.push(6);
			}
		}else{
			if(selectdlRow.indexOf(6)<0){
			   selectdlRow.push(6);
			}
		}
		abMaxAvg="总计";
	}
	
	var rows = $(gridDiv).datagrid("getData");
	var  fistRow = rows.rows[rowIndex];//当前选中的第一行
	var  secandRow = rows.rows[rowIndex+1];//当前选中的第二行
	var fistRowLine = [//最大
	        fistRow.maxData1==""?"-":fistRow.maxData1,
			fistRow.maxData2==""?"-":fistRow.maxData2,
			fistRow.maxData3==""?"-":fistRow.maxData3,					
			fistRow.maxData4==""?"-":fistRow.maxData4,
			fistRow.maxData5==""?"-":fistRow.maxData5,
		    fistRow.maxData6==""?"-":fistRow.maxData6,
		    fistRow.maxData7==""?"-":fistRow.maxData7,
    		fistRow.maxData8==""?"-":fistRow.maxData8,
			fistRow.maxData9==""?"-":fistRow.maxData9,
			fistRow.maxData10==""?"-":fistRow.maxData10,
			fistRow.maxData11==""?"-":fistRow.maxData11,	
			fistRow.maxData12==""?"-":fistRow.maxData12,
			fistRow.maxData13==""?"-":fistRow.maxData13,
			fistRow.maxData14==""?"-":fistRow.maxData14,
			fistRow.maxData15==""?"-":fistRow.maxData15
	];//曲线
	var secandRowLine = [//平均
            secandRow.maxData1==""?"-":secandRow.maxData1,
	        secandRow.maxData2==""?"-":secandRow.maxData2,
			secandRow.maxData3==""?"-":secandRow.maxData3,					
			secandRow.maxData4==""?"-":secandRow.maxData4,
			secandRow.maxData5==""?"-":secandRow.maxData5,
		    secandRow.maxData6==""?"-":secandRow.maxData6,
		    secandRow.maxData7==""?"-":secandRow.maxData7,
    		secandRow.maxData8==""?"-":secandRow.maxData8,
			secandRow.maxData9==""?"-":secandRow.maxData9,
			secandRow.maxData10==""?"-":secandRow.maxData10,
			secandRow.maxData11==""?"-":secandRow.maxData11,	
			secandRow.maxData12==""?"-":secandRow.maxData12,
			secandRow.maxData13==""?"-":secandRow.maxData13,
			secandRow.maxData14==""?"-":secandRow.maxData14,
			secandRow.maxData15==""?"-":secandRow.maxData15
	];//曲线
	
	if(dataType == 'U'){
		dylegend.push(abMaxAvg+"最高");
		dylegend.push(abMaxAvg+"平均");
		dyseries.push({
	        name:abMaxAvg+'最高',
	        type:'line',
	        data:fistRowLine
	   })
	   dyseries.push({
	        name: abMaxAvg+'平均',
	        type: 'bar',
//	        barWidth:40,
	        symbolSize: 2,
	        showAllSymbol: true,
	        smooth: false,
	        yAxisIndex: 0,
	        symbol: 'circle',
	        data:secandRowLine//数据,
	   })
	}else{
		dllegend.push(abMaxAvg+"最高");
		dllegend.push(abMaxAvg+"平均");
		dlseries.push({
	        name:abMaxAvg+'最高',
	        type:'line',
	        data:fistRowLine
	   })
	   dlseries.push({
	        name: abMaxAvg+'平均',
	        type: 'bar',
//	        barWidth:40,
	        symbolSize: 2,
	        showAllSymbol: true,
	        smooth: false,
	        yAxisIndex: 0,
	        symbol: 'circle',
	        data:secandRowLine//数据,
	   })
	}
	
  getUcharData();//加载图表
}


//echarts图
function getUcharData(){
	var option = {
		    legend: {
		        x: 'center',
		        y: '0px',
		        data: dataType == 'U'?dylegend:dllegend//电压或者电量的legend
		    }, 
		  //设置grid位置
			   grid : {
					 x : 45, //左边距离
					 y : 35,//上边距离
					 x2 : 20,//右边距离
					 y2 : 35//下边距离
				},
		    xAxis: [
		        {
		        	
		            type: 'category',
		            boundaryGap : [0, 0.01],
		            symbolSize : 1,//点直径
		            splitLine: {
		                show: false,
		                lineStyle: {
		                    color: '#dfdfdf',
		                    width: 1,
		                    type: 'dashed'
		                }
		            },
		            data:['1次','2次','3次','4次','5次','6次','7次','8次','9次','10次','11次','12次','13次','14次','15次']
		        }
		    ],
		    yAxis: [{
		        name: '单位('+(dataType == 'U'?'%':'A')+')',
		        type: 'value',
		        splitNumber: 5,
		        splitLine: {
		            lineStyle: {
		                color: '#dfdfdf',
		                width: 1,
		                type: 'dashed'
		            }
		        },
		        axisLabel: {
		            formatter: '{value}'
		        },
		        min:'0',
		        max:'auto'
		    }],
		    tooltip : {
		        trigger: 'axis',
		        formatter: function(params) {
		        	if(params!=null && params[0]!=null){
		        	var paramResult = '谐波次数: '+ params[0].name + '<br/>';
		        	for ( var i = 0; i < params.length; i++) {
						paramResult += params[i].seriesName + ' : ' 
									 + params[i].value + ' (%)<br/>';
					}
	               return paramResult;
		        	}
		        }
		    },
		    series:dataType == 'U'?dyseries:dlseries
		};
	
	if(dataType == 'U'){
		mydyChart.setOption(option,true);
		mydyChart.resize();
	}else{
		mydlChart.setOption(option,true);
		mydlChart.resize();
	}
}

/**
 * 三相电流不平衡
 */
function getSXDL(){
	//金坛针对客户
//	if(tranId=='101000001894'){
//		tranId = '101000004451';
//	}else if(tranId=='101000001895'){
//		tranId = '101000004452';
//	}else if(tranId=='101000001896'){
//		tranId = '101000004451';
//	}else if(tranId=='101000001897'){
//		tranId = '101000004452';
//	}else if(tranId=='101000026539'){
//		tranId = '101000004452';
//	}
	
	if(mysxdlChart == ''){
		mysxdlChart = echarts.init(document.getElementById('sxdlbphChart'));//初始化电压chart
	}
	mysxdlChart.showLoading({
		text:'正在努力的读取数据中...',
		effect:'spin'
	});
	
	var dataDate =  $('#startDate').val();//查询时间
	
	$.ajax({	
		url:webContextRoot+'energyPowerQualityMonitor/selectSXDL.action', 
		data:{
			'powerQualityModel.tranId': tranId,
			'powerQualityModel.dataDate': dataDate
		},
		dataType:'json',
		type:'post',
		success:function(data){
//			console.log(data);
			//不平衡值
			$("#bph").html(parseFloat(data.bph));
			option = {
					legend: {
						data: ['A相电流','B相电流','C相电流'],
						x:'center',
						y:'35'
					},
				    tooltip : {
				        trigger: 'axis',
				        formatter: function(params) {
//				        	console.log(params);
				        	if(params!=null && params.length > 0){
				        		var paramResult = '时间: '+ params[0].name + '<br/>';
				        		for(var i in params){
				        			paramResult += params[i].seriesName + ' : ' + params[i].value + "(A)"  + '<br/>';
				        		}
				        		return paramResult;
				        	}
				        }
				    },
					//设置grid位置
					grid : {
						x : 55, //左边距离
						y : 75,//上边距离
						x2 : 35,//右边距离
						y2 : 35//下边距离
					},
					xAxis:  {
						type: 'category',
						boundaryGap:false,
						data : data.dataDate
					},
					yAxis: [
					        {
					        	name: '单位(A)',
					        	type: 'value',
					        	splitNumber: 5,
					        	min:'0',
					        	max:'auto'
					        }
			        ],
			        series: [
			                 {
			                	 name: 'A相电流',
			                	 type: 'line',
			                	 symbol: 'circle',
			                	 data:data.IA,//数据,
			                 },
			                 {
			                	 name: 'B相电流',
			                	 type: 'line',
			                	 symbol: 'circle',
			                	 data:data.IB,//数据,
			                 },
			                 {
			                	 name: 'C相电流',
			                	 type: 'line',
			                	 symbol: 'circle',
			                	 data:data.IC,//数据,
			                 }
			        ]
			};
			//配置echart
			mysxdlChart.setOption(option,true);
			mysxdlChart.resize();
			mysxdlChart.hideLoading();
		}
	});
}

/**
 * 金坛谐波分析
 */
function getjtxbfxData(){
	//金坛针对客户
	var tranId2 = tranId;
	if(tranId=='101000001894'){
		tranId2 = '101000004451';
	}else if(tranId=='101000001895'){
		tranId2 = '101000004452';
	}else if(tranId=='101000001896'){
		tranId2 = '101000004451';
	}else if(tranId=='101000001897'){
		tranId2 = '101000004452';
	}else if(tranId=='101000026539'){
		tranId2 = '101000004452';
	}
	
	$("#xb_content").hide();
	$("#jt_xb_content").show();
	
	var dataDate =  $('#startDate').val();//查询时间
	
	if(dataType=="U"){//电压
		$("#jt_xb_dy_div").show();
		$("#jt_xb_dl_div").hide();
		if(mydyChart == ''){
			mydyChart = echarts.init(document.getElementById('jtdyChart'));//初始化电压chart
			$("#jt_xbfxdy_datagrid").datagrid({    
				loadMsg:'正在加载，请稍等……',//加载时显示提示
				rownumbers:true,
				fit:true,
				fitColumns:true,
				striped: true,
				border : false,
				singleSelect: true,
				columns:[[
				    {field:'type',title:'内容',width:50,align:'center'},
				    {field:'maxValue',title:'最大值',width:50,align:'center'},
				    {field:'avgValue',title:'平均值',width:50,align:'center'},
				    {field:'minValue',title:'最小值',width:50,align:'center'},
				    {field:'moreHeight',title:'越线次数',width:50,align:'center'}
				]]
			});
		}
		mydyChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}else{
		$("#jt_xb_dy_div").hide();
		$("#jt_xb_dl_div").show();
		if(mydlChart == ''){
			mydlChart = echarts.init(document.getElementById('jtdlChart'));//初始化电流chart
			$("#jt_xbfxdl_datagrid").datagrid({    
				loadMsg:'正在加载，请稍等……',//加载时显示提示
				rownumbers:true,
				fit:true,
				fitColumns:true,
				striped: true,
				border : false,
				singleSelect: true,
				columns:[[
				    {field:'type',title:'内容',width:50,align:'center'},
				    {field:'maxValue',title:'最大值',width:50,align:'center'},
				    {field:'avgValue',title:'平均值',width:50,align:'center'},
				    {field:'minValue',title:'最小值',width:50,align:'center'},
				]]
			});
		}
		mydlChart.showLoading({
			text:'正在努力的读取数据中...',
			effect:'spin'
		});
	}
	var yuexian = []; 
	for(var i = 0; i < 96; i++ ){
		yuexian.push(4);
	}
	$.getJSON(webContextRoot +'energyPowerQualityMonitor/queryJTxbfxValue.action', //查询用户变下面的负载率和变损率
			{ 
		      'bandAnalyseModel.tranId':tranId2,//变压器id
		      'bandAnalyseModel.dataType':dataType,//查询数据类型  U 电压  I 电流
		      'bandAnalyseModel.dataDate':dataDate//变压器id
			},
			function(json){//返回值
//				console.log(json);
				
				if(dataType == 'U'){
					$("#jt_xbfxdy_datagrid").datagrid({
						data:json.table
					});
					var option = {
						    legend: {
						        x: 'center',
						        y: '0px',
						        data: ['A相电压总畸变率','B相电压总畸变率','C相电压总畸变率']//电压或者电量的legend
						    }, 
						  //设置grid位置
							   grid : {
									 x : 45, //左边距离
									 y : 35,//上边距离
									 x2 : 20,//右边距离
									 y2 : 35//下边距离
								},
						    xAxis: [
						        {
						            type: 'category',
						            boundaryGap : [0, 0.01],
						            symbolSize : 1,//点直径
						            boundaryGap:false,
						            splitLine: {
						                show: false,
						                lineStyle: {
						                    color: '#dfdfdf',
						                    width: 1,
						                    type: 'dashed'
						                }
						            },
						            data:json.dataDate
						        }
						    ],
						    yAxis: [{
						        name: '单位(%)',
						        type: 'value',
						        splitNumber: 5,
						        splitLine: {
						            lineStyle: {
						                color: '#dfdfdf',
						                width: 1,
						                type: 'dashed'
						            }
						        },
						        axisLabel: {
						            formatter: '{value}'
						        },
						        min:'0',
						        max:'auto'
						    }],
						    tooltip : {
						        trigger: 'axis',
						        formatter: function(params) {
						        	if(params!=null && params[0]!=null){
						        	var paramResult = '时间: '+ params[0].name + '<br/>';
						        	for ( var i = 0; i < params.length; i++) {
										paramResult += params[i].seriesName + ' : ' 
													 + params[i].value + ' (%)<br/>';
									}
					               return paramResult;
						        	}
						        }
						    },
						    series:[
						            {
					                	 name: 'A相电压总畸变率',
					                	 type: 'line',
					                	 symbol: 'circle',
					                	 data:json.a
					                 },
					                 {
					                	 name: 'B相电压总畸变率',
					                	 type: 'line',
					                	 symbol: 'circle',
					                	 data:json.b
					                 },
					                 {
					                	 name: 'C相电压总畸变率',
					                	 type: 'line',
					                	 symbol: 'circle',
					                	 data:json.c
					                 },
					                 {
					                	 name: '越线标准',
					                	 type: 'line',
					                	 symbol: 'circle',
					                	 data:yuexian
					                 }
						            ]
						    	
						};
						mydyChart.setOption(option,true);
						mydyChart.resize();
						mydyChart.hideLoading();
				}else{
					$("#jt_xbfxdl_datagrid").datagrid({
						data:json.table
					});
					var option = {
						    legend: {
						        x: 'center',
						        y: '0px',
						        data: ['A相电流总畸变率','B相电流总畸变率','C相电流总畸变率']//电压或者电量的legend
						    }, 
						  //设置grid位置
							   grid : {
									 x : 45, //左边距离
									 y : 35,//上边距离
									 x2 : 20,//右边距离
									 y2 : 35//下边距离
								},
						    xAxis: [
						        {
						            type: 'category',
						            boundaryGap : [0, 0.01],
						            symbolSize : 1,//点直径
						            boundaryGap:false,
						            splitLine: {
						                show: false,
						                lineStyle: {
						                    color: '#dfdfdf',
						                    width: 1,
						                    type: 'dashed'
						                }
						            },
						            data:json.dataDate
						        }
						    ],
						    yAxis: [{
						        name: '单位(%)',
						        type: 'value',
						        splitNumber: 5,
						        splitLine: {
						            lineStyle: {
						                color: '#dfdfdf',
						                width: 1,
						                type: 'dashed'
						            }
						        },
						        axisLabel: {
						            formatter: '{value}'
						        },
						        min:'0',
						        max:'auto'
						    }],
						    tooltip : {
						        trigger: 'axis',
						        formatter: function(params) {
						        	if(params!=null && params[0]!=null){
						        	var paramResult = '时间: '+ params[0].name + '<br/>';
						        	for ( var i = 0; i < params.length; i++) {
										paramResult += params[i].seriesName + ' : ' 
													 + params[i].value + ' (%)<br/>';
									}
					               return paramResult;
						        	}
						        }
						    },
						    series:[
						            {
					                	 name: 'A相电流总畸变率',
					                	 type: 'line',
					                	 symbol: 'circle',
					                	 data:json.a
					                 },
					                 {
					                	 name: 'B相电流总畸变率',
					                	 type: 'line',
					                	 symbol: 'circle',
					                	 data:json.b
					                 },
					                 {
					                	 name: 'C相电流总畸变率',
					                	 type: 'line',
					                	 symbol: 'circle',
					                	 data:json.c
					                 }
						            ]
						    	
						};
					mydlChart.setOption(option,true);
					mydlChart.resize();
					mydlChart.hideLoading();
				}
			});
			
}
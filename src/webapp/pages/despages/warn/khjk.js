
/**
 * 客户监控
 * @author 王国际
 * @since 2017-05-10
 */
var isFistCd=true;//是否第一个菜单
var FistCdUrl='';//第一个菜单的URL
var preCdId='';//上一个菜单的ID
//var consId='102000003446';
//var consName='无锡工艺职业技术学院(新校区)';
var currentSr = "";//当前链接

$(function(){
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码，加载左侧树
		$.ajax({
			type : "POST",
			url : webContextRoot + 'rendsMenu/getDeafultKh.action',
			dataType : "json",
			async : false,
			success : function(data) {
				if (data != null && data.length > 0) {
					consId = data[0].CONSID;
					consName = data[0].CONSNAME;
				} else {
					kehuPop();// 弹出选择客户
				}
			}
		});
	}else{
		$('#consNameId').text(consName);
		if(isMainInto=="true"){//主页面进入客户试图，存在客户编码，证明是企业用户登录进来的
			$('#Customer').hide();//隐藏客户选择按钮
		}
	}
	
	//查询客户监控下的用户菜单信息
	$.get(webContextRoot+ '/rendsMenu/selectkhjkMenu.action', 
	{ },
	function(data){
		var data = eval("("+data+")");
		var allTopNode = [];//顶层的节点
		var allcdNode = [];//菜单的节点
		
		for(var i=0;i<data.length;i++){
			if(data[i].isLeaf=="N"){//顶层的节点
				allTopNode.push(data[i]);
			}else{
				allcdNode.push(data[i]);//菜单节点
			}
		}
		
		var menulist = '';
		for(var i=0;i<allTopNode.length;i++){//循环顶层
			menulist += '<div title="'+allTopNode[i].menuName+'"> <ul>'
			+getcurentCdNode(allTopNode[i].menuId,allcdNode)+'</ul> </div>';
		}
		
//			var menulist = '<div title="总览"> <ul>  <li id="fdsafads" class="selected">测试数据 </li>'+
//			             '<li>测试数据 </li> <li>测试数据 </li> </ul> </div>';
		$("#menu").append(menulist);
		
		$('.accordion-panel').accordion({//自适应
	        multiple:false,
	        border:false,
	        onSelect:function(title,index){
//		            var panels = $('.accordion-panel').accordion("panels");//获取所有的panel 
//		        	for(var i=0;i<panels.length;i++){//循环，不是当前的都关闭掉
//		        		if(panels[i].panel("options").title!=title){
//		        			panels[i].panel('collapse');
//		        		} 
//		        	}
//		        	$('.accordion-panel').accordion("getPanel"); 
	        	$('.accordion-panel').accordion("resize");//处理滚动条出现的时候遮盖
	        },
	        onUnselect:function(title,index){
	        	$('.accordion-panel').accordion("resize");//处理滚动条出现的时候遮盖
	        },
//		        fit:true
		 });
		
		$('ul li').click(function(){
			$('#'+preCdId).removeClass('selected');
			$(this).addClass('selected');
			 content='<iframe id="funcId" src="'+webContextRoot+ $(this).attr('src') +'?consId='+consId+'&consName='+consName+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
			 currentSr = $(this).attr('src');//当前URL
			 $("#contentId").empty();
			 $('#contentId').append(content);
			 preCdId = $(this).attr('id');
		});
			
		if(!(consId==null || consId==''|| consId=="null")){
			$('#consNameId').text(consName);
			// 指定选中菜单
			if(selectedMenu != null && selectedMenu != '' && selectedMenu != 'null'){
				 $('#'+selectedMenu).addClass('selected');
				 if(subsId != null && subsId != '' && subsId != 'null'){
					 content='<iframe id="funcId" src="'+webContextRoot+ $('#'+selectedMenu).attr('src') +'?consId='+consId+'&consName='+consName+'&userTranId='
					 			+subsId+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>';
				 }else{
					 content='<iframe id="funcId" src="'+webContextRoot+ $('#'+selectedMenu).attr('src') +'?consId='+consId+'&consName='+consName+'&userTranId='
			 			+subsId+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>';  
				 }
				 currentSr = $(this).attr('src');//当前URL
				 $("#contentId").empty();
				 $('#contentId').append(content);
				 preCdId = $('#'+selectedMenu).attr('id');
			}else{
				currentSr = 'pages/despages/monitor/comMonitor.jsp';//当前URL
				 var content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/monitor/comMonitor.jsp?consId='+consId+'&consName='+consName+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
				 $("#contentId").empty();
				 $('#contentId').append(content);
			}
		}
	});
	
});

//客户总览，点击一次图
function clikyct(jumpFlag,subsIdComMonitor){
	var content = '';
	// 0=视频   1=一次图
	if(jumpFlag == 0){
		$('.accordion-panel').accordion('select','实时监控');
		$('#'+preCdId).removeClass('selected');//移除上一个选中样式
		$('#ssjkKLeafSpjk').addClass('selected');//添加当前选中样式
		preCdId = 'ssjkKLeafSpjk';
		content='<iframe id="funcId" src="'+webContextRoot+'/pages/despages/monitor/video.jsp?consId='
		   +consId+'&userTranId='+subsIdComMonitor+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
	} else if(jumpFlag == 1){
		$('.accordion-panel').accordion('select','实时监控');
		$('#'+preCdId).removeClass('selected');//移除上一个选中样式
		$('#ssjkKLeafYctjk').addClass('selected');//添加当前选中样式
		preCdId = 'ssjkKLeafYctjk';
		content='<iframe id="funcId" src="'+webContextRoot+'/pages/despages/monitor/userMonitor.jsp?consId='
		   +consId+'&consName='+consName+'&userTranId='+subsIdComMonitor+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
	}
	 currentSr = 'pages/despages/monitor/userMonitor.jsp';//当前URL
	 $("#contentId").empty();
	 $('#contentId').append(content);
}

//首次进入的总览
function kehushouye(){
	 $('#'+preCdId).removeClass('selected');//移除上一个选中样式
	 preCdId = '';
	 currentSr = 'pages/despages/monitor/comMonitor.jsp';//当前URL
	 var content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/monitor/comMonitor.jsp?consId='+consId+'&consName='+consName+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
	 $("#contentId").empty();
	 $('#contentId').append(content);
}

//客户选择页面弹出
function kehuPop(){
	var content = "<iframe src='"+webContextRoot+"pages/despages/warn/khjkPop.jsp' width='100%' height='99%' frameborder='0' scrolling='no'/>";
	var boarddiv = "<div id='msgwindow' title='客户列表'/>";
	$(document.body).append(boarddiv);
	var win = $("#msgwindow").dialog({
		content : content,
		width : document.body.clientWidth-260,
		height : document.body.clientHeight-160,
		maximizable:false,
		closable:true,
		modal : 'shadow',
		title : '客户列表',
		onBeforeClose:function(title,index){
			if(consId==null || consId==''|| consId=="null"){
				 $.messager.alert('提示', "请选择一个客户！", 'warning');
				 return false;
            }
              
        }
	});
	win.dialog('open');
}

//寻找当前节点下的子节点 菜单节点
function getcurentCdNode(menuId,allcdNode) {
	var allChildNode='';
	for(var i=0;i<allcdNode.length;i++){//循环顶层
		if(allcdNode[i].parentId == menuId){
//			if(isFistCd==true){//首个菜单
//				allChildNode= ' <li id = "cd'+allcdNode[i].menuId+'" src="'+allcdNode[i].funcUrl+'" class="selected">'+allcdNode[i].menuName+' </li>';
//				isFistCd=false;//第一个菜单添加完成修改变量值
//				FistCdUrl = allcdNode[i].funcUrl;//首个菜单的URL
//				preCdId = 'cd'+allcdNode[i].menuId;
//			}else{
				allChildNode+= ' <li id = "'+allcdNode[i].busiCode+'" src="'+allcdNode[i].funcUrl+'">'+allcdNode[i].menuName+' </li>';
//			}
			
		}
	}
	return allChildNode;
}

/**
 * 客户列表数据
 * @param {} corporationId
 */
  function refkhData(rowIndex, rowData){
	  consId = rowData.consId;
	  consName = rowData.consName;
	  $('#consNameId').text(consName);
	  
//	  if(isFistCd==true){
//		 currentSr = 'pages/despages/monitor/comMonitor.jsp';//当前URL
//		 var content='<iframe id="funcId" src="'+webContextRoot+'pages/despages/monitor/comMonitor.jsp?consId='+consId+'&consName='+consName+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
//		 $("#contentId").empty();
//		 $('#contentId').append(content);
//		 isFistCd=false;
//		 $("#msgwindow").dialog('close');
//		 return;
//	  }
	  
	  content='<iframe id="funcId" src="'+webContextRoot+ currentSr +'?consId='+consId+'&consName='+consName+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe>'; 
	  $("#contentId").empty();
	  $('#contentId').append(content);
	  $("#msgwindow").dialog('close');
  }
 

//var consSelectURL = null;//链接URL
var consSelectHasRoot = false;//是否有区域能源根节点
var consSelectAllCons = null;//所有的客户
//var consSelecResultCons = null;//查询出的客户
//var consSelectAllOrg = null;//所有的区域中心
var consSelectHistoryCons = null;//历史记录里的客户
var consSelectCon = null;//选中的客户
var consSelectCons = [];
var cons_datagrid_list = [];//easyui-datagrid 显示的列表
var consSelectMethod = null;//选中客户后调用的方法
var consSelectKey = '';//搜索关键字
var consSelectMultiselect = false;//定义是否多选

var consList_all_flag = true;//第一次

//js入口
$(function(){
	
	if(consId==null || consId==''|| consId=="null"){//未获取到企业编码
		
		//easyui-layout里内容
		$('#westTree').html('<div id="cons_history" style="width:100%;height:180px;"><div style="width:100%;height:25px;background-color:rgb(17,164,161);color:#fff;line-height:24px;">'
				 +'<div style="width:207px;height:25px;margin:0 10px;"><img style="position:relative;top:4px;" src="'+webContextRoot+'pages/despages/common/images/quickSearch_file.png"/>&nbsp;最近访问</div></div><div id="cons_history_cons" style="width:100%;height:155px;background-color:rgb(242,242,242);"></div></div>'
				 +'<div id="cons_quickSearch" style="position: absolute;top:215px;width:100%;height:60px;cursor:pointer;"><img src="'+webContextRoot+'pages/despages/common/images/quickSearch_large.png"/></div>'
				 +'<div id="cons_datagrid_div" style="position: absolute;top:270px;bottom:32px;width:100%;"><div id="cons_datagrid"></div></div>');
		$("#westTree").panel({
			title:'导航'
		 });
		 //选中的客户列表显示
		 $("#cons_datagrid").datagrid({
//			 nowrap:true,
			 fit:true,
			 fitColumns:true,
			 striped: true,
			 singleSelect: !consSelectMultiselect,
			 onSelect:function(rowIndex, rowData){
				 if(!consSelectMultiselect){//单选
					 //取消最近访问的样式
					 $("#cons_history_cons .active").removeClass("active");
					 consSelectCon = rowData;
				 }else{//多选
//					 consSelectCons.push(rowData);
					 if(!consSelectMultiselectValidate(rowData,"+")){
						 $("#cons_datagrid").datagrid("unselectRow",rowIndex);
					 }
//					 var Selections = $("#cons_datagrid").datagrid("getSelections");
//					 console.log(Selections);
				 }
				 //选择客户后加载的方法
				 if(consSelectMethod!=null){
					 eval(consSelectMethod);
					 //更新最近访问
					 updateLatelyCons(rowData.id);
				 }
			 },
			 onUnselect:function(rowIndex, rowData){
				 if(consSelectMultiselect){
//					 for(var i = 0; i < consSelectCons.length; i++){
//						 if(consSelectCons[i].id == rowData.id){
//							 consSelectCons.splice(i,1);
//							 break;
//						 } 
//					 }
					 //选择客户后加载的方法
					 if(consSelectMethod!=null){
						 if(!consSelectMultiselectValidate(rowData,"-")){
							 $("#cons_datagrid").datagrid("selectRow",rowIndex);
						 }
						 eval(consSelectMethod);
					 }
				 }
			 },
			 onLoadSuccess:function(data){
				 if(data.total > 0){
					 if(consSelectMultiselect){
						//取消最近访问的样式
						$("#cons_history_cons .active").removeClass("active");
						consSelectCons = [];
					 }
					 $("#cons_datagrid").datagrid("selectRow",0);
				 }
			 },
			 columns:[[
					    {field:'id',title:'id',hidden:true,width:50,align:'center'},
					    {field:'consNo',title:'户号',hidden:true,width:200,align:'center',
					    	formatter: function(value,row,index){
								return '<div title="'+value+'">'+value+'</div>';
							}
					    },
					    {field:'text',title:'客户',width:200,align:'center',
					    	formatter: function(value,row,index){
					    		return '<div class="cons_datagrid_cons" title="'+value+'">'+value+'</div>';
							}
					    },
					]]
		 });
		 
		 //快搜窗口
		 var cons_html = '<div id="cons_quickSearch_window1" style="z-index:100;position:absolute;top:60px;bottom:60px;left:240px;right:240px;display:none;background-color:rgb(240,243,248)">'
			 //窗口取消按钮
			 +'<div style="position:absolute;top:16px;right:16px;cursor: pointer;" onclick="cons_quickSearch_window1_cancel();"><img style="width:24px;height:24px;" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/clear.png"/></div>'
			 //快搜Logo
			 +'<div id="cons_quickSearch_window1_logo" style="position:absolute;top:60px;width:100%;height:60px;align:center;"><div style="width:220px;height:60px;margin:0 auto;"><img src="'+webContextRoot+'pages/despages/common/images/quickSearch_large.png"/></div></div>'
			 //快搜搜索文本框
			 +'<div style="position:absolute;top:140px;left:100px;right:160px;height:30px;"><input id="cons_quickSearch_window1_input" maxlength="32" type="text" style="width:100%;height:100%" onkeyup="ValidateValue(this)"></div>'
			 //快搜历史记录
			 +'<div id="cons_quickSearch_window1_history" style="position:absolute;top:176px;left:100px;right:156px;height:100px;display:none;background-color:#fff;box-shadow:3px 3px 3px rgba(34,25,25,0.5);border-style:solid;border-width:1px;border-color:#000;">'
			 //快搜历史记录 取消按钮
			 +'<div class="history_cancel"  style="position:absolute;top:10px;right:10px;cursor: pointer;"><img style="width:16px;height:16px;" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/clear.png"/></div>'
			 +'<label style="position:absolute;top:10px;left:22px;font-weight: bold">最近搜索内容</label>'
			 +'<div style="position:absolute;top:30px;left:20px;right:20px;"><table>'
			 +'<tr><td></td><td></td><td></td><td></td></tr>'
			 +'<tr><td></td><td></td><td></td><td></td></tr>'
			 +'</table></div>'
			 +'</div>'
			 //快搜搜索按键
			 +'<div style="position:absolute;top:139px;right:96px;height:30px;width:60px;"><img src="'+webContextRoot+'pages/despages/common/images/tk-12.png" onclick="cons_quickSearch_window_search();" style="cursor: pointer;"/></div>'
			 //信息
			 +'<div style="position:absolute;bottom:30px;width:100%;text-align:center;color:rgb(165,165,165);line-height:24px;">客户信息搜索引擎<br/>江苏方天电力技术有限公司技术支持</div>'
			 +'</div>';
		 
		 //快搜窗口1
		 $("body").append(cons_html);
		 
		 cons_html ='<div id="cons_quickSearch_window2" style="z-index:100;position:absolute;top:60px;bottom:60px;left:240px;right:240px;display:none;background-color:rgb(240,243,248)">'
				//窗口取消按钮
				 +'<div style="position:absolute;top:16px;right:16px;cursor: pointer;" onclick="cons_quickSearch_window2_cancel();"><img style="width:24px;height:24px;" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/clear.png"/></div>'
				 //快搜Logo
				 +'<div style="position:absolute;top:40px;left:10px;"><img src="'+webContextRoot+'pages/despages/common/images/quickSearch_little.png"/></div>'
				 //快搜搜索文本框
				 +'<div style="position:absolute;top:40px;left:110px;right:160px;height:30px;"><input id="cons_quickSearch_window2_input" maxlength="32" type="text" style="width:100%;height:100%" onkeyup="ValidateValue(this)"></div>'
				 //快搜历史记录
				 +'<div id="cons_quickSearch_window2_history" style="position:absolute;top:76px;left:110px;right:156px;height:100px;display:none;background-color:#fff;box-shadow:3px 3px 3px rgba(34,25,25,0.5);border-style:solid;border-width:1px;border-color:#000;z-index:101;">'
				 //快搜历史记录 取消按钮
				 +'<div class="history_cancel"  style="position:absolute;top:10px;right:10px;cursor: pointer;"><img style="width:16px;height:16px;" src="'+webContextRoot+'pages/despages/common/jquery-easyui-1.5.1/themes/icons/clear.png"/></div>'
				 +'<label style="position:absolute;top:10px;left:22px;font-weight: bold">最近搜索内容</label>'
				 +'<div style="position:absolute;top:30px;left:20px;right:20px;"><table>'
				 +'<tr><td></td><td></td><td></td><td></td></tr>'
				 +'<tr><td></td><td></td><td></td><td></td></tr>'
				 +'</table></div>'
				 +'</div>'
				 //快搜搜索按键
				 +'<div style="position:absolute;top:39px;right:96px;height:30px;width:60px;"><img src="'+webContextRoot+'pages/despages/common/images/tk-12.png" onclick="cons_quickSearch_window_search();" style="cursor: pointer;"/></div>';
				
				//全选 分页 确定
				cons_html += '<div id="cons_quickSearch_window2_bottom" style="position:absolute;bottom:10px;height:20px;width:100%;">'
					+'<input id="consList_all" type="checkbox"/>'
					+'<label>全选</label>'
					+'<div id="cons_quickSearch_window2_bottom_pages" style="align:center;margin:0 auto;height:100%;width:330px;"></div>'
					+'<div style="position:absolute;bottom:-1px;right:20px;"><img src="'+webContextRoot+'pages/despages/common/images/tk-13.png"/></div>'
					+'</div>';
				
				//搜索结果
				cons_html +='<div id="cons_quickSearch_window2_search_result" style="position:absolute;top:82px;height:30px;left:10px;right:10px;line-height:30px;font-size:18px;border-color:rgb(153,153,153);white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">'
					+'您搜索的关键字为“<font id="cons_quickSearch_window2_key" color="red"></font>”,共为您搜索到<font id="cons_quickSearch_window2_count"></font>个结果</div>';
				//客户列表
				cons_html +='<div id="consListShow" style="position:absolute;top:120px;bottom:40px;left:10px;right:10px;border-style:solid;border-width:1px;border-color:rgb(153,153,153);overflow-y:scroll;overflow-x:hidden;">'
					+'</div>';
				
		 //快搜窗口2
		 $("body").append(cons_html);		
		 //页面遮盖层
		 $("body").append('<div id="cons_quickSearch_cover" style="z-index:99;position:absolute;top:0px;bottom:0px;left:0px;right:0px;display:none;background-color:#000;opacity:0.5;"></div>');
		 //窗口遮盖层
		 var window_cover_html = '<div id="cons_quickSearch_window_cover" style="display:none;z-index:101;position:absolute;top:60px;bottom:60px;left:240px;right:240px;opacity:0.5;background: #e6e6e6;border: 1px solid #ddd;-moz-border-radius:5px 5px 5px 5px;-webkit-border-radius: 5px 5px 5px 5px;border-radius: 5px 5px 5px 5px;">'
			 +'<div style="position:absolute;top:50%;left:50%;width:310px;height:32px;">'
			 +'<div style="position:relative;top:-16px;left:-155px;width:310px;height:32px;font-size:28px;line-height:32px;vertical-align:middle;"><img src="'+webContextRoot+'pages/despages/common/lightbox/dist/images/loading.gif"/>'
			 +'<label style="position:relative;top:-4px;">正在加载，请稍候……</label></div></div>'
			 +'</div>';
		 $("body").append(window_cover_html);
		 
		 //快搜搜索框焦点事件
		 $("#cons_quickSearch_window1_input").focus(function(){
			 $("#cons_quickSearch_window1_history").show();
		 });
		 $("#cons_quickSearch_window2_input").focus(function(){
			 $("#cons_quickSearch_window2_history").show();
		 });
		 //快搜搜索框  回车事件
		 $("#cons_quickSearch_window1_input").keydown(function(e){
			 if(e.keyCode == 13){
				 cons_quickSearch_window_search();
			 }
		 });
		 $("#cons_quickSearch_window2_input").keydown(function(e){
			 if(e.keyCode == 13){
				 cons_quickSearch_window_search();
			 }
		 });
		 //历史记录取消事件
		 $(".history_cancel").click(function(){
			 $(this).parent().hide();
		 });
		 
		 //页面的搜索事件
		 $("#cons_quickSearch").click(function(){
			 $("#cons_quickSearch_window1_input").val("");
			 $("#cons_quickSearch_window1_history").hide();
			 //搜索窗口显示
			 $("#cons_quickSearch_window1").show();
			 //页面遮盖层显示
			 $("#cons_quickSearch_cover").show();
			 
			 cons_datagrid_list = [];
//			 for(var i = 0; i < consSelectAllOrg.length; i++){
//				cons_datagrid_list.push({
//					'id':consSelectAllOrg[i].id,
//					'consNo':consSelectAllOrg[i].id,
//					'text':consSelectAllOrg[i].text
//				});
//			}
		 });
		 
		//历史记录 点击事件
		$("#cons_quickSearch_window1_history table td").click(function(){
			if($(this).attr("class").indexOf("active") != -1){
				$("#cons_quickSearch_window1_input").val($(this).text());
			}
		});
		$("#cons_quickSearch_window2_history table td").click(function(){
			if($(this).attr("class").indexOf("active") != -1){
				$("#cons_quickSearch_window2_input").val($(this).text());
			}
		});
		//历史记录 双击事件
		$("#cons_quickSearch_window1_history table td").dblclick(function(){
			if($(this).attr("class").indexOf("active") != -1){
				cons_quickSearch_window_search();
			}
		});
		$("#cons_quickSearch_window2_history table td").dblclick(function(){
			if($(this).attr("class").indexOf("active") != -1){
				cons_quickSearch_window_search();
			}
		});
		//选中客户后确定事件
		$("#cons_quickSearch_window2_bottom img").click(function(){
//			consSelect();
			$("#cons_datagrid").datagrid("loadData",cons_datagrid_list);
			cons_quickSearch_window2_cancel();
		});
	}
	
});

/**
 * 窗口的取消事件
 */
function cons_quickSearch_window1_cancel(){
	//搜索窗口隐藏
	$("#cons_quickSearch_window1").hide();
	//页面遮盖层隐藏
	$("#cons_quickSearch_cover").hide();
}
function cons_quickSearch_window2_cancel(){
	//搜索窗口隐藏
	$("#cons_quickSearch_window2").hide();
	//页面遮盖层隐藏
	$("#cons_quickSearch_cover").hide();
}

/**
 * 快搜窗口的查询事件
 */
function cons_quickSearch_window_search(){
	var message = "";
	if(!$("#cons_quickSearch_window1").is(":hidden")){
		message = $("#cons_quickSearch_window1_input").val();
	}else{
		message = $("#cons_quickSearch_window2_input").val();
	}
	message = $.trim(message);
	consSelectSearch(message);
	
	$("#cons_quickSearch_window1").hide();
	$("#cons_quickSearch_window2").show();
	$("#cons_quickSearch_window2_history").hide();
	//快搜搜索框设置值
	$("#cons_quickSearch_window2_input").val(message);
	
	
}

/**
 * 快搜窗口查询
 */
function consSelectSearch(message,isFirst){
	
	consSelectKey = message;
	
	$("#cons_quickSearch_window2_key").text(consSelectKey);
	
	if(!isFirst){
		$("#cons_quickSearch_window_cover").show();
	}else{
		var fileName = location.href;
//		fileName.substr(0,fileName.lastIndexOf("/")).lastIndexOf("/");
		funcId = fileName.substr(fileName.substr(0,fileName.lastIndexOf("/")).lastIndexOf("/")+1);
		if(funcId.indexOf("?") > -1){
			funcId = funcId.substr(0,funcId.indexOf("?")).replace("/","_");
		}else{
			funcId = funcId.replace("/","_");
		}
	}
	
	if(isFirst){
		if(top.isCustomer) consSelectHasRoot = false;//客户角色 没有根节点
		//查询最近访问的客户
		$.ajax({	
			url:webContextRoot + "destree/mergeHistoryCons.action",
			dataType:'json',
			type:'post',
			data:{
				'treeModel.userId' : top.userId,
				'treeModel.funcId' : funcId,
				'treeModel.hasRoot' : consSelectHasRoot == true ? '1' : '0',
				'treeModel.type' : 'cons'
			},
			success:function(result){
//				console.log(result);
//				consSelectLoadLatelyMethod();
				consSelectHistoryCons = result;
				var historyHTML = '';
				for(var i = 0; i < result.length; i++){
					historyHTML += '<div id="cons_history_cons_'+i+'" class="con con_'+(i%2)+'"></div>';
				}
				$("#cons_history_cons").html(historyHTML);
				for(var i = 0; i < result.length; i++){
					$("#cons_history_cons_"+i).text(result[i].text);
					$("#cons_history_cons_"+i).attr("title",result[i].text);
				}
				
				//默认选中第一个
				if(result.length > 0){
					$("#cons_history_cons_0").addClass("active");
					if(consSelectMultiselect) consSelectCons.push(consSelectHistoryCons[0]);
					else consSelectCon = consSelectHistoryCons[0];
					if(consSelectMethod!=null){
						eval(consSelectMethod);
					}
				}
				
				//最近访问 点击事件
				$("#cons_history_cons .con").click(function(){
					if(consSelectMultiselect){
						//选中的客户
						var index = $(this).attr("id").substr(18);
						consSelectCon = consSelectHistoryCons[index];
						var className = $(this).attr("class");
						if(className.indexOf("active")==-1){//当前状态 没有选中
							if(consSelectMultiselectValidate(consSelectCon,"+"))
								$(this).addClass("active");
						}else{//当前状态 选中
							if(consSelectMultiselectValidate(consSelectCon,"-"))
								$(this).removeClass("active");
						}
						//选择客户后加载的方法
						if(consSelectMethod!=null){
							eval(consSelectMethod);
							//更新最近访问
							updateLatelyCons(consSelectCon.id);
						}
					}else{
						//最近访问样式切换
						$("#cons_history_cons .active").removeClass("active");
						$(this).addClass("active");
						//客户列表 取消 选中
						$("#cons_datagrid").datagrid("unselectAll");
						//选择客户后加载的方法
						var index = $(this).attr("id").substr(18);
						consSelectCon = consSelectHistoryCons[index];
						if(consSelectMethod!=null){
							eval(consSelectMethod);
						}
						//更新最近访问
						if(consSelectHistoryCons[index].id.length > 3){
							updateLatelyCons(consSelectHistoryCons[index].id);
						}
					}
				});
			}
		});
	}
	
	//先清空客户列表
	$("#consListShow").html("");
	if(!isFirst){
		//加载客户
		$.ajax({	
			url:webContextRoot + "destree/consSelect.action",
			dataType:'json',
			type:'post',
			data:{
				'ziMu':message 
//				'modeType':isFirst == true?"true":"false"
			},
			success:function(result){
	//			console.log("consSelect",result);
				var array = new Array();
				array.push({
					'children':result
				});
				consSelectAllCons = array;
				cons_datagrid_list = [];
				//总数
				$("#cons_quickSearch_window2_count").text(result.length);
				//关键字
				$("#cons_quickSearch_window2_search_result").attr("title",$("#cons_quickSearch_window2_search_result").text());
				//排版
				arrangeCons(array,1);
				$("#cons_quickSearch_window_cover").hide();
			}
		});
	}
	
	mergeHistoryCons(message);
}

/**
 * 更新查询历史记录
 */
function mergeHistoryCons(message){
	$.ajax({	
		url:webContextRoot + "destree/mergeHistoryCons.action",
		dataType:'json',
		type:'post',
		data:{
			'treeModel.userId':top.userId,
			'treeModel.funcId':funcId,
			'treeModel.text':message
		},
		success:function(result){
//			console.log("mergeHistoryCons",result);
			var historyCons1 = $("#cons_quickSearch_window1_history table").find("td");
			var historyCons2 = $("#cons_quickSearch_window2_history table").find("td");
			for(var i = 0; i < result.length; i++){
				$(historyCons1[i]).text(result[i].TEXT);
				$(historyCons2[i]).text(result[i].TEXT);
				$(historyCons1[i]).addClass("active");
				$(historyCons2[i]).addClass("active");
			}
		}
	});
}

/**
 * 更新最近访问
 * @param consId
 */
function updateLatelyCons(consId){
	$.ajax({	
		url:webContextRoot + "destree/mergeHistoryCons.action",
		dataType:'json',
		type:'post',
		data:{
			'treeModel.userId' : top.userId,
			'treeModel.funcId' : funcId,
			'treeModel.consId' : consId,
			'treeModel.hasRoot' : '1',
			'treeModel.type' : 'cons'
		},
		success:function(result){
//			console.log(result);
		}
	});
}

/**
 * 对客户数组 布局 
 */
function arrangeCons(data,index){
	
	var pagesSize = 20;//一页显示的个数
	var pagesTotal = Math.ceil(data[0].children.length/pagesSize);//总页数
	//先清空
	$("#consListShow").html("");
	var pagesLength = index==pagesTotal?data[0].children.length:index*pagesSize;
	for(var i = (index-1)*pagesSize ; i < pagesLength ; i++){
		var obj = data[0].children[i];
		if(obj != null){
			var con_html = '<div class="consList consList'+(i%2)+'">'
			+'<input id="consList_'+obj.id+'" value="'+obj.id+'" type="checkbox" style="position:relative;top:7px;left:10px;"/>'
			+'<label title="'+obj.text+'" style="position:relative;top:7px;left:24px;display:inline-block;width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+obj.text+'</label>'
			+'<div class="consListTable"><table>'
			+'<tr><td title="客户编号：'+obj.consNo+'"><img src="'+webContextRoot+'pages/despages/common/images/tk-08.png"/><font>&nbsp;&nbsp;客户编号：</font><font>'+obj.consNo+'</font></td>'
			+'<td title="联系人：'+obj.contactName+'"><img src="'+webContextRoot+'pages/despages/common/images/tk-09.png"/><font>&nbsp;&nbsp;联系人：</font><font>'+obj.contactName+'</font></td>'
			+'<td title="地址：'+obj.elecAddr+'"><img src="'+webContextRoot+'pages/despages/common/images/tk-11.png"/><font>&nbsp;&nbsp;地址：</font><font>'+obj.elecAddr+'</font></td></tr>'
			+'<tr><td title="电压等级/合同容量：'+obj.voltCode+'/'+obj.contractCap+'kVA"><img src="'+webContextRoot+'pages/despages/common/images/tk-07.png"/><font>&nbsp;&nbsp;电压等级/合同容量：</font><font>'+obj.voltCode+'/'+obj.contractCap+'kVA</font></td>'
			+'<td title="联系电话：'+obj.telephone+'"><img src="'+webContextRoot+'pages/despages/common/images/tk-10.png"/><font>&nbsp;&nbsp;联系电话：</font><font>'+obj.telephone+'</font></td><td></td></tr>'
			+'</table></div>'
			+'</div>';
			$("#consListShow").append(con_html);
		}
	}
	//关键字变颜色
	changeColor();
	//分页显示
	arrangePages(index,pagesTotal,pagesSize,data);
	
	//客户是否勾选状态
	consSelectConsFuzhi();
	
	//客户勾选事件
	$(".consList input").click(function(){
//		console.log($(this));
		if($(this)[0].checked){
			//勾选 添加
			for(var j = 0; j < consSelectAllCons[0].children.length;j++){
				if($(this)[0].value == consSelectAllCons[0].children[j].id){
					cons_datagrid_list.push({
						'id':consSelectAllCons[0].children[j].id,
						'consNo':consSelectAllCons[0].children[j].consNo,
						'text':consSelectAllCons[0].children[j].text
					});
					break;
				} 
			}
		}else{
			//取消勾选 移除
			for(var i = 0; i < cons_datagrid_list.length; i++){
				if(cons_datagrid_list[i].id == $(this)[0].value){
					cons_datagrid_list.splice(i,1);
					break;
				}
			}
		}
		consList_all_event();
//		console.log($(this).attr("id").substr(9));
	});
	
//	console.log($("#consList_all"));
	$("#consList_all")[0].checked = false;
	//全选事件
	if(consList_all){
		$("#consList_all").click(function(){
			var consListShowChildren = $("#consListShow").find("input");
			if(document.getElementById("consList_all").checked){
				for(var i = 0; i < consListShowChildren.length; i++){
					//未勾选的客户
					if(!consListShowChildren[i].checked){
						//复选框  勾选
						consListShowChildren[i].checked = true;
						var consSelectConsId = consListShowChildren[i].value;
						//寻找客户信息
						for(var j = 0; j < consSelectAllCons[0].children.length;j++){
							if(consSelectConsId == consSelectAllCons[0].children[j].id){
								var isNotFound = true;
								for(var k = 0; k < cons_datagrid_list.length; k++ ){
									if(cons_datagrid_list[k].id == consSelectConsId) {
										isNotFound = false;
										break;
									}
								}
								if(isNotFound){
									//找到客户并添加到队列里
									cons_datagrid_list.push({
										'id':consSelectAllCons[0].children[j].id,
										'consNo':consSelectAllCons[0].children[j].consNo,
										'text':consSelectAllCons[0].children[j].text
									});
									break;
								}
							} 
						}
					}
				}
			}else{
				for(var i = 0; i < consListShowChildren.length; i++){
					//勾选的客户
					if(consListShowChildren[i].checked){
						//复选框  取消勾选
						consListShowChildren[i].checked = false;
						var consSelectConsId = consListShowChildren[i].value;
						//移除
						for(var j = 0; j < cons_datagrid_list.length; j++){
							if(cons_datagrid_list[j].id == consSelectConsId){
								cons_datagrid_list.splice(j,1);
								break;
							}
						}
					}
				}
			}
		});
		consList_all = false;
	}
	
	consList_all_event();
}

/**
 * 全选事件
 */
function consList_all_event(){
	var consListShowChildren = $("#consListShow").find("input");
	var isConsList_all_select = true;
	for(var i = 0; i < consListShowChildren.length; i++){
		if(!consListShowChildren[i].checked){
			isConsList_all_select = false;
			break;
		}
//		console.log(consListShowChildren)
	}
	$("#consList_all")[0].checked = isConsList_all_select;
}


/**
 * 分页居中对齐
 */
function consSelectPagesCenter(){
	var cons_quickSearch_window_bottom_pages =  $("#cons_quickSearch_window2_bottom_pages").children();
	var firstPageMarginLeft = (11-cons_quickSearch_window_bottom_pages.length)*15;
	$("#cons_quickSearch_window2_bottom_pages div:first-child").css("margin-left",firstPageMarginLeft);
}

/**
 * 布局分页
 * @param currentPage 当前页
 * @param consPages 总页数
 * @param consSize 客户数量
 * @param data 客户
 */
function arrangePages(currentPage,consPages,consSize,data){
	$("#cons_quickSearch_window2_bottom_pages").html("");
	//分页
	var consPagesHtml = '<div class="page disabled">首页</div>';
	consPagesHtml += '<div class="page">1</div>';
	if(consPages > 7){//分页大于7个  省略号
		if(currentPage < 5){
			consPagesHtml += '<div class="page">2</div>';
			consPagesHtml += '<div class="page">3</div>';
			consPagesHtml += '<div class="page">4</div>';
			consPagesHtml += '<div class="page">5</div>';
			consPagesHtml += '<div class="page disabled">...</div>';
			consPagesHtml += '<div class="page">'+consPages+'</div>';
		}else if(consPages-currentPage<4){
			consPagesHtml += '<div class="page disabled">...</div>';
			consPagesHtml += '<div class="page">'+(consPages-4)+'</div>';
			consPagesHtml += '<div class="page">'+(consPages-3)+'</div>';
			consPagesHtml += '<div class="page">'+(consPages-2)+'</div>';
			consPagesHtml += '<div class="page">'+(consPages-1)+'</div>';
			consPagesHtml += '<div class="page">'+consPages+'</div>';
		}else{
			consPagesHtml += '<div class="page disabled">...</div>';
			consPagesHtml += '<div class="page">'+(currentPage-2)+'</div>';
			consPagesHtml += '<div class="page">'+(currentPage-1)+'</div>';
			consPagesHtml += '<div class="page">'+currentPage+'</div>';
			consPagesHtml += '<div class="page">'+(parseInt(currentPage)+1)+'</div>';
			consPagesHtml += '<div class="page">'+(parseInt(currentPage)+2)+'</div>';
			consPagesHtml += '<div class="page disabled">...</div>';
			consPagesHtml += '<div class="page">'+consPages+'</div>';
		}
	}else{//分页不大于7个  原样显示
		for(var i = 2;i <= consPages; i++){
			consPagesHtml += '<div class="page">'+i+'</div>';
		}
	}
	consPagesHtml += '<div class="page disabled">尾页</div>';
	$("#cons_quickSearch_window2_bottom_pages").append(consPagesHtml);
	//设置分页样式
	var pages = $("#cons_quickSearch_window2_bottom_pages").children(".page");
	consSelectPagesCenter();
	//当前页添加样式
	for(var i = 0; i < pages.length; i++){
		if(parseInt($(pages[i]).text())==currentPage){
			$(pages[i]).addClass("active");
		}
	}
	//首页、尾页添加样式
	if(currentPage == 1 && consPages > 1){
		for(var i = 0; i < pages.length; i++){
			if($(pages[i]).text()=='首页'){
				$(pages[i]).addClass("disabled");
			}
			if($(pages[i]).text()=='尾页'){
				$(pages[i]).removeClass("disabled");
			}
		}
	}else if(currentPage == consPages && currentPage > 1){
		for(var i = 0; i < pages.length; i++){
			if($(pages[i]).text()=='首页'){
				$(pages[i]).removeClass("disabled");
			}
			if($(pages[i]).text()=='尾页'){
				$(pages[i]).addClass("disabled");
			}
		}
	}else if(currentPage > 1 && currentPage < consPages){
		for(var i = 0; i < pages.length; i++){
			if($(pages[i]).text()=='首页'){
				$(pages[i]).removeClass("disabled");
			}
			if($(pages[i]).text()=='尾页'){
				$(pages[i]).removeClass("disabled");
			}
		}
	}
	//分页事件
	$("#cons_quickSearch_window2_bottom_pages .page").click(function(){
		//判断是否有效的分页
		if($(this).attr("class").length<6){
			//调整客户显示
			var currentPage = $(this).text();
			if(currentPage == '首页') currentPage = 1;
			else if(currentPage == '尾页') currentPage = consPages;
			//先清空
			$("#cons_quickSearch_window2_bottom_pages").html("");
			arrangeCons(data,currentPage);
			//分页
//			arrangePages(currentPage,consPages,consSize);
		}
	});
}

/**
 * 客户勾选过得  再有显示  直接在复选框内勾选  
 */
function consSelectConsFuzhi(){
	//当前页所有的input
	var consListShowChildren = $("#consListShow").find("input");
	for(var i = 0; i < consListShowChildren.length; i++){
		for(var j = 0; j < cons_datagrid_list.length ; j++){
			if(consListShowChildren[i].value == cons_datagrid_list[j].id){
				consListShowChildren[i].checked = true;
			}
		}
	}
}

/**
 * 关键字 变颜色
 */
function changeColor(){
	
	//关键字数组
	var consSelectKeys = [];
	for(var i = 0; i < consSelectKey.length; i++){
		if(consSelectKey.substr(i,1) != ' '){
			consSelectKeys.push(consSelectKey.substr(i,1));
		}
	}
	//含关键字的下标数组
	var consSelectKeyIndexs = [];
	
	var consSelectConsNameLabel = $("#consListShow").find("label");
	for(var i = 0; i < consSelectConsNameLabel.length; i++){
		consSelectKeyIndexs = [];
		//关键字所在下标取出
		for(var j = 0; j < consSelectKeys.length; j++){
			//原数据
			var str = consSelectConsNameLabel[i].innerHTML;
			var pre = 0;
			while(str.indexOf(consSelectKeys[j]) > -1){
				pre += str.indexOf(consSelectKeys[j]);
				consSelectKeyIndexs.push(pre);
				str = str.substr(str.indexOf(consSelectKeys[j])+1);
				pre += 1;
			}
		}
		//关键字下标去重
		consSelectKeyIndexs = uniqueArray(consSelectKeyIndexs);
		//关键字下标排序
		consSelectKeyIndexs = consSelectKeyIndexs.sort(sortArray);
		consSelectConsNameLabel[i].innerHTML = replaceIndexs(consSelectConsNameLabel[i].innerHTML,consSelectKeyIndexs);
	}
	
	var td = $("#consListShow table").find("td");
	for(var i = 0; i < td.length; i++){
		if(td[i].lastChild == null) continue;
		
		consSelectKeyIndexs = [];
		//关键字所在下标取出
		for(var j = 0; j < consSelectKeys.length; j++){
			//原数据
			var str = td[i].lastChild.innerHTML;
			var pre = 0;
			while(str.indexOf(consSelectKeys[j]) > -1){
				pre += str.indexOf(consSelectKeys[j]);
				consSelectKeyIndexs.push(pre);
				str = str.substr(str.indexOf(consSelectKeys[j])+1);
				pre += 1;
			}
		}
		//关键字下标去重
		consSelectKeyIndexs = uniqueArray(consSelectKeyIndexs);
		//关键字下标排序
		consSelectKeyIndexs = consSelectKeyIndexs.sort(sortArray);
		td[i].lastChild.innerHTML = replaceIndexs(td[i].lastChild.innerHTML,consSelectKeyIndexs);
		
	}
	
}

/**
 * 数组从小到大排序
 */
function sortArray(a,b){
	return a-b;
}

/**
 * 字符串找到下标并替换
 */
function replaceIndexs(str,indexs){
	if(indexs.length == 0) return str;
	var string = '';
	for(var i = 0; i < indexs.length; i++){
//		var pre = str.substring(0,indexs[i]);
//		var s = str.substr(indexs[i],1);
//		var next = str.substr(indexs[i]+1);
//		console.log("pre",pre,"s",s,"next",next);
		if(i == 0){
			string += replaceIndex(str,indexs[i]).pre + replaceIndex(str,indexs[i]).s;
			str = replaceIndex(str,indexs[i]).next;
			if(i == indexs.length-1){
				string += str;
			}
		}else{
			string += replaceIndex(str,indexs[i]-indexs[i-1]-1).pre + replaceIndex(str,indexs[i]-indexs[i-1]-1).s;
			str = replaceIndex(str,indexs[i]-indexs[i-1]-1).next;
			if(i == indexs.length-1){
				string += str;
			}
		}
	}
	return string;
}

function replaceIndex(str,index){
	var pre = str.substring(0,index);
	var s = str.substr(index,1);
	var next = str.substr(index+1);
	var strObj = {
			'index':index,
			'pre':pre,
			's':'<font color="red" style="left:0px;">'+ s +"</font>",
			'next':next
	};
	return strObj;
}

/**
 * 数组去重
 */
function uniqueArray(array){
	var arr = new Array();
	for(var i = 0; i < array.length; i++){
		if(arr.indexOf(array[i]) == -1){
			arr.push(array[i]);
		}
	}
	return arr;
}
/**
 * 客户去重
 */
function uniqueArrayCons(array){
	var arr = new Array();
	var arrIds = new Array();
	var arrayIds = new Array();
//	var idsIndex = new Array();
	//原始的 所有ID
	for(var i = 0; i < array.length; i++){
		arrayIds.push(array[i].id);
	}
	//
	for(var i in arrayIds){
		if(arrIds.indexOf(arrayIds[i]) == -1){
//			arr.push(arrIds[i]);
//			idsIndex.push(i);
			arrIds.push(arrayIds[i]);
			arr.push(array[i]);
		}
	}
	return arr;
}


/**
 * 输入验证
 * @param textbox
 */
function ValidateValue(textbox){
	var textboxvalue = textbox.value;
	var reg=/^([A-Za-z0-9]|[\u2E80-\u9FFF])*$/;
	if(reg.test(textboxvalue)){
		return;
	}
	textboxvalue = textboxvalue.replace(/[^\a-\z\A-\Z0-9\u2E80-\u9FFF]/g, '');
//	textboxvalue = textboxvalue.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '');
	textbox.value = textboxvalue;
//	this.value=this.value.replace(/[^u4e00-u9fa5w]/g,'');
}

/**
 * 多选 验证
 */
function consSelectMultiselectValidate(conData,type){
	if(type == '+'){
		//队列
		if(consSelectCons.length > 5){
			$.messager.alert('提示', "不能大于6个企业", 'warning');
			return false;
		}
		consSelectCons.push(conData);
		//最近访问
		for(var i = 0; i < consSelectHistoryCons.length; i++){
			if(consSelectHistoryCons[i].id == conData.id){
				$($("#cons_history_cons .con")[i]).addClass("active");
				break;
			}
		}
		//快搜列表
		if(!datagridIsSelected(conData.id)){  //没选中的让他选中
			var rowsData = $("#cons_datagrid").datagrid("getRows");
			for(var i = 0; i < rowsData.length; i++){
				if(rowsData[i].id == conData.id){
					$("#cons_datagrid").datagrid("selectRow",i);
					break;
				}
			}
		}
		consSelectCons = uniqueArrayCons(consSelectCons);
		return true;
	}else if(type == '-'){
		//队列
		if(consSelectCons.length == 1){
			$.messager.alert('提示', "至少选择一个", 'warning');
			return false;
		}
		for(var i = 0; i < consSelectCons.length; i++){
			if(consSelectCons[i].id == conData.id){
				consSelectCons.splice(i,1);
				break;
			} 
		}
		//最近访问
		for(var i = 0; i < consSelectHistoryCons.length; i++){
			if(consSelectHistoryCons[i].id == conData.id){
				$($("#cons_history_cons .con")[i]).removeClass("active");
				break;
			}
		}
		//快搜列表
		if(datagridIsSelected(conData.id)){  //选中的让他没选中
			var rowsData = $("#cons_datagrid").datagrid("getRows");
			for(var i = 0; i < rowsData.length; i++){
				if(rowsData[i].id == conData.id){
					$("#cons_datagrid").datagrid("unselectRow",i);
					break;
				}
			}
		}
		consSelectCons = uniqueArrayCons(consSelectCons);
		return true;
	}
}

/**
 * 判断是否被选中
 * @param data
 * @returns {Boolean}
 */
function datagridIsSelected(data){
	var Selections = $("#cons_datagrid").datagrid("getSelections");
	for(var i = 0; i < Selections.length; i++){
		if(data == Selections[i].id){
			return true;
		}
	}
	return false;
}
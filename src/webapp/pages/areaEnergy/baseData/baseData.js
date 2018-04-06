/**
 * <p>
 * Title: 江苏能源综合服务平台
 * </p>
 * <p>
 * Description:采集档案配置
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009
 * </p>
 * <p>
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
 
 des.namespace("com.frontier.areaEnergy.baseData");
 
 /**
 * 设备树面板
 */
(function($){

	/**
	 * 通用树
	 * 
	 * 
	 */
	function tree(options,treePanel){
		var treeDom = $('<ul id="' + options.treeId + '"></ul>');
		$(treePanel).append(treeDom);
		options = options || {};
		var defaultSetting = {
			animate : true,
			url : des.webContextRoot + "areaEnergy/createTree.action",
			onBeforeLoad:function(node){
				var type = node ? node.attributes.type ? node.attributes.type : 'CONS' : 'CONS';
				var options = $(this).tree("options");
				var index = options.url.indexOf("?");
				if(index > 0)
					options.url = options.url.substring(0,index);
				options.url = options.url + "?type=" + type;
				if(!node){
				    options.url = options.url+'&id='+$('#consId').val();
				}
			},
			onLoadSuccess : function(node,data){
				if(node == null){
					var tree =  $(this);
					var options = tree.tree("options");
					var root = $('#des_tree_tree').tree('getRoot');
					if(options.autoSelect){
						$(root.target).trigger('click',root.target);
					}
					if(data){
					    $(data).each(function(){
					       if(this.state == 'closed'){
					          tree.tree('expandAll');
					       }
					    });
					}
				}else{
		            if(node.attributes.selChildNode){
		                var selNode = $("#des_tree_tree").tree('find',node.attributes.selChildNode); 
		                $(selNode.target).trigger('click',selNode.target);
		                node.attributes.selChildNode='';
		            }else{
		                var id = $("#contextFrame").attr("nodeId");
				        var currNode = $("#des_tree_tree").tree('find',id);
		                $(currNode.target).trigger('click',currNode.target);
		            }
		            
				}
				
			}
		}	
		options = $.extend(defaultSetting,options);
		treeDom.tree(options);
	}
	
	/**
	 * 通用树面板
	 * 
	 * 
	 */
	$.fn.treePanel = function(options,param){
		var id = this.attr("id");
		options.treeId = "des_tree_" + id;
		tree(options,this);
	}
		
})(jQuery);
 
 


/**
 * 初始化方法（树加载）
 */
com.frontier.areaEnergy.baseData.init = function(){
	$("#tree").treePanel({
		autoSelect : true,
		onClick : function(node){
			var id = node.id;
			var areaNo = "";
			var subsId = "";
			$("#contextFrame").attr("nodeId",id);
			switch(node.attributes.type){
			    //用户节点
				case "DEVICE" : 
				  var lineConsId = $('#lineConsId').val();
				  $("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/queryConsInfo.action?consId="+id+'&lineConsId='+lineConsId);break;
				//用户变节点
				case "CONSSUB" : $("#contextFrame").attr("src",des.webContextRoot + "areaEnergyTmnl/getSubsInfo.action?subsID="+id);break;
				//采集终端节点
				case "COLLTMNL" : 
				  id = id.replace(node.attributes.type,"");
				  $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/consTmnlList.jsp?consId="+id);break;
				//电器设备节点
				/*case "ELEC" : 
				   id = id.replace(node.attributes.type,"");
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/test.jsp?subsId="+id);break;*/
				//非电器设备节点
				/*case "NONELEC" : 
				   id = id.replace(node.attributes.type,"");
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/test.jsp?subsId="+id);break;*/
				//变压器节点
				case "TRAN" : 
				   id = id.replace(node.attributes.type,"");
				   //服务中心编码
				   areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/tranListInfo.jsp?subsId="+id+"&areaNo="+areaNo);break;
				//母线节点
				case "BS" : 
				   id = id.replace(node.attributes.type,"");
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/bs/tmnlBS.jsp?subsId="+id);break;
				//线路节点
				case "LINE" : 
				   id = id.replace(node.attributes.type,"");
				   areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/line/line.jsp?subsId="+id+"&areaNo="+areaNo);break;
				//电气设备其它设备节点
				case "ELECOTHER" : 
				   id = id.replace(node.attributes.type,"");
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/otherDeviceList.jsp?subsId="+id+"&deviceType=4"+"&isDevice=1");break;
				//环境监测设备节点
				case "EM" : 
				   id = id.replace(node.attributes.type,"");
				   areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/otherDeviceList.jsp?subsId="+id+"&deviceType=1"+"&isDevice=0");break;
				//门禁节点
				case "AC" : 
				   areaNo = $('#areaNo').val();
				   id = id.replace(node.attributes.type,"");
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/otherDeviceList.jsp?subsId="+id+"&deviceType=2"+"&isDevice=0");break;
				//照明节点
				case "LIGHT" : 
				   id = id.replace(node.attributes.type,"");
				   areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/otherDeviceList.jsp?subsId="+id+"&deviceType=3"+"&isDevice=0");break;
				//非电气设备其它设备节点
				case "NONELECOTHER" : 
				   id = id.replace(node.attributes.type,"");
				   areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/otherDeviceList.jsp?subsId="+id+"&deviceType=4"+"&isDevice=0");break;
				//单个变压器节点
				case "TRANSELF" : 
					//用户变ID
					var subsId = node.attributes.xtype;
				   //服务中心编码
				   areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/areaEnergyTmnl/getTranAndMpInfo.action?tranId="+id+"&subsId="+subsId+"&areaNo="+areaNo+"&deviceRela=TRANSELF");break;
				//单个母线节点
				case "BSSELF" : 
				   //用户变ID
				   var subsId = node.attributes.xtype;
				   //服务中心编码
				   areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot+"bs/bsMesgDetail.action?bsId="+id+"&subsId="+subsId+"&deviceRela=BSSELF"+"&areaNo="+areaNo);break;
				//单个线路节点
				case "LINESELF" : 
				   //用户变ID
				   var subsId = node.attributes.xtype;
				   //服务中心编码
				   areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot+"line/lineMesgDetail.action?lineId="+id+"&subsId="+subsId+"&deviceRela=LINESELF"+"&areaNo="+areaNo);break;
				//单个电气其它设备节点
				case "ELECOTHERSELF" : 
				areaNo = $('#areaNo').val();
				var subsId = node.attributes.xtype;
				$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findSingleDeviceInfo.action?queryPara.deviceId="+id+"&queryPara.deviceType=4"+"&queryPara.areaNo="+areaNo+"&queryPara.deviceRela=ELECOTHERSELF"+"&queryPara.subsId="+subsId);break;
				//单个环境监测节点
				case "EMSELF" : 
					var subsId = node.attributes.xtype;
					areaNo = $('#areaNo').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findSingleDeviceInfo.action?queryPara.deviceId="+id+"&queryPara.deviceType=1"+"&queryPara.areaNo="+areaNo+"&queryPara.deviceRela=EMSELF"+"&queryPara.subsId="+subsId);break;
				//单个门禁节点
				case "ACSELF" : 
					var subsId = node.attributes.xtype;
					areaNo = $('#areaNo').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findSingleDeviceInfo.action?queryPara.deviceId="+id+"&queryPara.deviceType=2"+"&queryPara.areaNo="+areaNo+"&queryPara.deviceRela=ACSELF"+"&queryPara.subsId="+subsId);break;
				//单个照明节点
				case "LIGHTSELF" : 
					var subsId = node.attributes.xtype;
					areaNo = $('#areaNo').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findSingleDeviceInfo.action?queryPara.deviceId="+id+"&queryPara.deviceType=3"+"&queryPara.areaNo="+areaNo+"&queryPara.deviceRela=LIGHTSELF"+"&queryPara.subsId="+subsId);break;
				//单个非电气其它设备节点
				case "NONELECOTHERSELF" : 
				 	var subsId = node.attributes.xtype;
					areaNo = $('#areaNo').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findSingleDeviceInfo.action?queryPara.deviceId="+id+"&queryPara.deviceType=4"+"&queryPara.areaNo="+areaNo+"&queryPara.deviceRela=NONELECOTHERSELF"+"&queryPara.subsId="+subsId);break;
				//实时终端节点
				case "REALTMNL" : $("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findConsTmnlInfo.action?queryPara.tmnlId="+id);break;
				//抄表终端节点
				case "CBTMNL" : $("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findConsTmnlInfo.action?queryPara.tmnlId="+id);break;
				//采集电表节点
				case "METER" : 
				   id = id.replace(node.attributes.type,"");
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/test.jsp?tmnlId="+id);break;
				//视频服务器
				case "RVU" : 
				   id = id.replace(node.attributes.type,"");
				   areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/rvuInfo/rvuList.jsp?consId="+id+'&areaNo='+areaNo);break;
				//视频服务器单个
				case "RVUSELF" : 
				id = id.replace(node.attributes.type,"");
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/cameraMpList.jsp?RVU_ID="+id);break;
				   break;
				//摄像机
				case "VIDEO" : 
				   id = id.replace(node.attributes.type,"");
				   $("#contextFrame").attr("src",des.webContextRoot+"areaEnergy/videoDetailInfo.action?queryPara.videoId="+id);break;
				default : break;
			}
		},
		
	});
}

com.frontier.areaEnergy.baseData.reloadTree = {
	/**
	 * 刷新并点击当前节点
	 */
	flushAndClickCurrentNode : function() {
		var node = $("#des_tree_tree").tree('find',$("#contextFrame").attr("nodeId"));
		var id = node.id;
		var parentNode = $("#des_tree_tree").tree('getParent',node.target);
		if(parentNode==null){
		   parentNode = node;
		}
		$("#des_tree_tree").tree('reload',parentNode.target);
	},
	
	/**
	 * 刷新并点击指定节点
	 * param nodeId
	 */
	clickTreeNode : function(nodeId) {
	    var node = $("#des_tree_tree").tree('find',nodeId);
	    if(!node){
	       var currNode = $("#des_tree_tree").tree('find',$("#contextFrame").attr("nodeId"));
	       currNode.attributes.selChildNode = nodeId;
	       $("#des_tree_tree").tree('expand',currNode.target);
	    }else{
	       $(node.target).trigger('click',node.target);
	    }
	}
	
}




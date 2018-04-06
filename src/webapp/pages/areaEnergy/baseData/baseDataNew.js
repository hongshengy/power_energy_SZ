/**
 * <p>
 * Title: 江苏能源综合服务平台
 * </p>
 * <p>
 * Description:用户数据中心页面左侧树
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009
 * </p>
 * <p>
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
des.namespace("com.frontier.areaEnergy.baseData.reloadTree");
var roleCode = $("#roleCode").val();
var roleId = $("#roleId").val();

$(function() { 
	$("body").layout();
	//左侧树
	$('#tree').tree({
		id:'consDataTree',
		text : '采集档案配置',
		url:des.webContextRoot+'areaEnergy/handleAllTreeNode.action?queryPara.consId='+$('#consId').val(),
		onClick: function(node){
			var name = node.text;
			var id = node.id.split(',')[0];
			var type = node.id.split(',')[1];
			var pId = node.id.split(',')[2];
			$("#contextFrame").attr("nodeId",node.id);
			switch(type){
			    //用户节点
				case "DEVICE" : 
				  var lineConsId = $('#lineConsId').val();
				  $("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/queryConsInfo.action?roleId="+roleId+"&roleCode="+roleCode+"&consId="+id+'&lineConsId='+lineConsId);
				  break;
				//用户变节点
				case "CONSSUB" : 
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergyTmnl/getSubsInfo.action?subsID="+id);
				break;
				//办公楼节点
				case "CONSBUILD" : 
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergyTmnl/getSubsInfo.action?subsID="+id);
				break;
				//办公楼节点
				case "SMALLCN" : 
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergyTmnl/getSubsInfo.action?subsID="+id);
				break;
				//车间节点
				case "CONSDEPART" : 
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergyTmnl/getSubsInfo.action?subsID="+id);
				break;
				//非侵入式终端建筑节点
				case "FQRSSUB" : 
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergyTmnl/getSubsInfo.action?subsID="+id);
				break;
				//智能家居节点
				case "CAPACITY" : 
					var consId = $('#consId').val();
					$("#contextFrame").attr("src",des.webContextRoot + "capacity/getSubsInfo.action?subsID="+id+"&consId="+consId);
				break;
				//储能变电站
				case "ELECSUB" : 
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergyTmnl/getSubsInfo.action?subsID="+id);
				break;
				//采集终端节点
				case "COLLTMNL" : 
					var areaNo = $('#areaNo').val();
					$("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/consTmnlList.jsp?consId="+pId+"&roleCode="+roleCode+"&areaNo="+areaNo+"&consIds="+$('#consId').val());
				break;
				//变压器节点
				case "TRAN" : 
				   //服务中心编码
					var areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/tranListInfo.jsp?subsId="+pId+"&areaNo="+areaNo);
				   break;
				//母线节点
				case "BS" : 
					var consId = $('#consId').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/bs/tmnlBS.jsp?subsId="+pId+"&consId="+consId);
				   break;
				//线路节点
				case "LINE" : 
					var areaNo = $('#areaNo').val();
					var consId = $('#consId').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/line/line.jsp?subsId="+pId+"&areaNo="+areaNo+"&consId="+consId+"&roleCode="+roleCode);
				   break;
				//电气设备其它设备节点
				case "ELECOTHER" : 
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/otherDeviceList.jsp?subsId="+pId+"&deviceType=4"+"&isDevice=1");
				   break;
				//环境监测设备节点
				case "EM" : 
					var areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/otherDeviceList.jsp?subsId="+pId+"&deviceType=1"+"&isDevice=0");
				   break;
				//门禁节点
				case "AC" : 
					var areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/otherDeviceList.jsp?subsId="+pId+"&deviceType=2"+"&isDevice=0");
				   break;
				//照明节点
				case "LIGHT" : 
					var areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/otherDeviceList.jsp?subsId="+pId+"&deviceType=3"+"&isDevice=0");
				   break;
				//非电气设备其它设备节点
				case "NONELECOTHER" : 
					var areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/otherDeviceList.jsp?subsId="+pId+"&deviceType=4"+"&isDevice=0");
				   break;
				//单个变压器节点
				case "TRANSELF" : 
				   //服务中心编码
					var areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/areaEnergyTmnl/getTranAndMpInfo.action?tranId="+id+"&subsId="+pId+"&areaNo="+areaNo+"&deviceRela=TRANSELF");
				   break;
				//单个母线节点
				case "BSSELF" : 
				   //服务中心编码
					var areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot+"bs/bsMesgDetail.action?bsId="+id+"&subsId="+pId+"&deviceRela=BSSELF"+"&areaNo="+areaNo);
				   break;
				//单个线路节点
				case "LINESELF" : 
				   //服务中心编码
					var areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot+"line/lineMesgDetail.action?roleCode="+roleCode+"&lineId="+id+"&subsId="+pId+"&deviceRela=LINESELF"+"&areaNo="+areaNo);
				   break;
				//单个电气其它设备节点
				case "ELECOTHERSELF" : 
					var areaNo = $('#areaNo').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findSingleDeviceInfo.action?queryPara.deviceId="+id+"&queryPara.deviceType=4"+"&queryPara.areaNo="+areaNo+"&queryPara.deviceRela=ELECOTHERSELF"+"&queryPara.subsId="+pId);
					break;
				//单个环境监测节点
				case "EMSELF" : 
					var areaNo = $('#areaNo').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findSingleDeviceInfo.action?queryPara.deviceId="+id+"&queryPara.deviceType=1"+"&queryPara.areaNo="+areaNo+"&queryPara.deviceRela=EMSELF"+"&queryPara.subsId="+pId);
					break;
				//单个门禁节点
				case "ACSELF" : 
					var areaNo = $('#areaNo').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findSingleDeviceInfo.action?queryPara.deviceId="+id+"&queryPara.deviceType=2"+"&queryPara.areaNo="+areaNo+"&queryPara.deviceRela=ACSELF"+"&queryPara.subsId="+pId);
					break;
				//单个照明节点
				case "LIGHTSELF" : 
					var areaNo = $('#areaNo').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findSingleDeviceInfo.action?queryPara.deviceId="+id+"&queryPara.deviceType=3"+"&queryPara.areaNo="+areaNo+"&queryPara.deviceRela=LIGHTSELF"+"&queryPara.subsId="+pId);
					break;
				//单个非电气其它设备节点
				case "NONELECOTHERSELF" : 
					var areaNo = $('#areaNo').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findSingleDeviceInfo.action?queryPara.deviceId="+id+"&queryPara.deviceType=4"+"&queryPara.areaNo="+areaNo+"&queryPara.deviceRela=NONELECOTHERSELF"+"&queryPara.subsId="+pId);
					break;
				//实时终端节点
				case "REALTMNL" : 
					var consId = $('#consId').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findConsTmnlInfo.action?queryPara.roleCode="+roleCode+"&queryPara.tmnlId="+id+"&queryPara.consId="+consId+"&t="+new Date());
					break;
				//智能网关终端节点
				case "CAPACITYGATEWAY" : 
					$("#contextFrame").attr("src",des.webContextRoot + "capacity/findConsTmnlInfo.action?queryPara.tmnlId="+id);
					break;
				//能效终端节点
				case "CBTMNL" : 
					var consId = $('#consId').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findConsTmnlInfo.action?queryPara.roleCode="+roleCode+"&queryPara.tmnlId="+id+"&queryPara.consId="+consId+"&t="+new Date());
					break;
				//小区能源通讯机节点
				case "COMMENERGY" : 
					var consId = $('#consId').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findConsTmnlInfo.action?queryPara.roleCode="+roleCode+"&queryPara.tmnlId="+id+"&queryPara.consId="+consId+"&t="+new Date());
					break;
				//非侵入式终端节点
				case "FQRSTMNL" : 
					var consId = $('#consId').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findConsTmnlInfo.action?queryPara.roleCode="+roleCode+"&queryPara.tmnlId="+id+"&queryPara.consId="+consId+"&t="+new Date());
					break;
					//用户侧储能终端节点
				case "ENERGYSTORAGE" : 
					var consId = $('#consId').val();
					$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/findConsTmnlInfo.action?queryPara.roleCode="+roleCode+"&queryPara.tmnlId="+id+"&queryPara.consId="+consId+"&t="+new Date());
					break;
				//采集电表节点
				case "METER" : 
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/test.jsp?tmnlId="+id);
				   break;
				//视频服务器
				case "RVU" : 
				   areaNo = $('#areaNo').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/rvuInfo/rvuList.jsp?consId="+pId+'&areaNo='+areaNo);
				   break;
				//视频服务器单个
				case "RVUSELF" : 
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/baseData/tmnlInstall/cameraMpList.jsp?RVU_ID="+id);
				   break;
				//摄像机
				case "VIDEO" : 
				   $("#contextFrame").attr("src",des.webContextRoot+"areaEnergy/videoDetailInfo.action?queryPara.videoId="+id);
				   break;
				//用能设备
				case "POWERDEVICE" : 
					var consId = $('#consId').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/line/powerDevice.jsp?subsId="+pId+"&consId="+consId);
				   break;
				//用能设备单个
				case "POWERDEVICESELF" : 
					//服务中心编码
					var areaNo = $('#areaNo').val();
					var consId = $('#consId').val();
					var xType = node.xtype;
					//$("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/line/otherDeviceDetail.jsp?lineId="+id+"&subsId="+pId+"&deviceRela=LINESELF"+"&areaNo="+areaNo+"&consId="+consId+"&DEVICE_TYPE="+xType);
					if('4' == xType || '5' == xType || '6' == xType || '7' == xType || '8' == xType || '9' == xType || '10' == xType){
						$("#contextFrame").attr("src",des.webContextRoot + "/pages/areaEnergy/line/otherDeviceDetail.jsp?lineId="+id+"&subsId="+pId+"&deviceRela=LINESELF"+"&areaNo="+areaNo+"&consId="+consId+"&DEVICE_TYPE="+xType);
					}else{
						$("#contextFrame").attr("src",des.webContextRoot+"line/powerDeviceDetail.action?lineId="+id+"&subsId="+pId+"&deviceRela=LINESELF"+"&areaNo="+areaNo+"&consId="+consId+"&xType="+xType);
					}
				   break;
				 //智能插座
				case "CAPACITYSOCKET" : 
					var consId = $('#consId').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "pages/areaEnergy/capacity/socket/capacitySocket.jsp?parentId="+id+"&consId="+consId+"&subsId="+pId);
				   break;
				//智能插座电器
				case "CAPACITYSOCKETSUB" : 
					var consId = $('#consId').val();
				   $("#contextFrame").attr("src",des.webContextRoot + "capacity/socketElecDevice.action?parentId="+id+"&consId="+consId+"&subsId="+pId);
				   break;
				//储能设备节点变流器和EMS列表
				case "SED" : 
				   $("#contextFrame").attr("src",des.webContextRoot + "pages/storedEnergy/emsInfo/emsListInfo.jsp?subsId="+pId);
				   break;
				//单个ems
				case "EMSSELF":
					$("#contextFrame").attr("src",des.webContextRoot + "pages/storedEnergy/storedEnergyDevice/emsDeviceDetail.jsp?SUBS_ID="+pId+"&lineId="+id);
					   break;
				//单个变流器
				case "PCSSELF" : 
					$("#contextFrame").attr("src",des.webContextRoot + "pages/storedEnergy/storedEnergyDevice/pcsDeviceDetail.jsp?SUBS_ID="+pId+"&lineId="+id);
				   break;
				//电池组
				case "BMSSELF" : 
					$("#contextFrame").attr("src",des.webContextRoot + "pages/storedEnergy/storedEnergyDevice/bmsDeviceDetail.jsp?SUBS_ID="+pId+"&SE_BMS_ID="+id);
				   break;
				default : break;
			}
		},
		onLoadSuccess: function(node, data){
		    var consId = $('#consId').val();
		    var nodeId = $("#contextFrame").attr("nodeId");
			if(!nodeId){
				var node1 = $('#tree').tree('find',consId+',DEVICE,'+consId);
				var name = node1.text;
				var id = node1.id.split(',')[0];
				var type = node1.id.split(',')[1];
				var lineConsId = $('#lineConsId').val();
				$("#contextFrame").attr("src",des.webContextRoot + "areaEnergy/queryConsInfo.action?roleId="+roleId+"&roleCode="+roleCode+"&consId="+id+'&lineConsId='+lineConsId);
				$('#nodeId1').val(node1.id);
				$('#tree').tree('select', node1.target);
			}else{
				var nodeId2 = $('#nodeId1').val();
				var nodeA = $('#tree').tree('find', nodeId);
				if(nodeA == null || nodeA == 'null'){
					var rootNode = $('#tree').tree('find',consId+',yh,null');
					$('#tree').tree('click', rootNode.target);
				}else{
					//$('#tree').tree('click', nodeA.target);
					$(nodeA.target).trigger('click',nodeA.target);
				}
			}												
		}
	});
});

com.frontier.areaEnergy.baseData.reloadTree = {
	/**
	 * 刷新并点击当前节点
	 */
	flushAndClickCurrentNode : function() {
	    $('#tree').tree('reload');
		/*var node = $("#des_tree_tree").tree('find',$("#contextFrame").attr("nodeId"));
		var id = node.id;
		var parentNode = $("#des_tree_tree").tree('getParent',node.target);
		if(parentNode==null){
		   parentNode = node;
		}
		$("#des_tree_tree").tree('reload',parentNode.target);*/
	},
	
	/**
	 * 刷新并点击指定节点
	 * param nodeId
	 */
	clickTreeNode : function(nodeId) {
	    var node = $("#tree").tree('find',nodeId);
	    $(node.target).trigger('click',node.target);
	}
	
}



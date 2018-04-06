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
des.namespace("com.frontier.areaEnergy.getConsDetailTree");

 
$(function() { 
	$("body").layout();
	//左侧树
	$('#leftDiv').tree({
		id:'consDataTree',
		text : '用户数据中心',
		url:basePath+'areaEnergy/getConsDetailTreeNew.action?queryPara.consId='+consId,
		onClick: function(node){
			var name = node.text;
			var id = node.id.split(',')[0];
			var type = node.id.split(',')[1];	
			var pId = node.id.split(',')[2];
			$('#nodeId1').val(node.id);
			//alert("id="+id+"      subid="+pId+"       type="+type);
			if(type == 'DEVICE'){
				//用户
				document.getElementById("rightFrame").src = basePath+"areaEnergy/treeOneLevelYH.action?queryPara.consId="
															+consId+"&queryPara.type="+type+"&queryPara.id="+id;
			}else if(type == 'CONSSUB'){
				//用户变
				document.getElementById("rightFrame").src = basePath+"areaEnergy/treeTwoLevelYHB.action?queryPara.consId="
															+id+"&queryPara.type="+type+"&queryPara.id="+id;
			}else if(type == 'CONSBUILD'){
				//用户变
				document.getElementById("rightFrame").src = basePath+"areaEnergy/treeTwoLevelYHB.action?queryPara.consId="
															+id+"&queryPara.type="+type+"&queryPara.id="+id;
			}else if(type == 'CONSDEPART'){
				//用户变
				document.getElementById("rightFrame").src = basePath+"areaEnergy/treeTwoLevelYHB.action?queryPara.consId="
															+id+"&queryPara.type="+type+"&queryPara.id="+id;
			}else if(type == 'TRAN'){
				//变压器
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryMasterSubstation1.action?queryPara.subId="+pId+"&queryPara.tranId="+id+"&queryPara.other=1";
			}else if(type == 'TRANSELF'){
				//变压器节点
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryMasterSubstation1.action?queryPara.subId="+pId+"&queryPara.tranId="+id+"&queryPara.other=0";
			}else if(type == 'BS'){
				//母线
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryBsLineAtion.action?queryPara.bsId="
															+id+"&queryPara.type="+type+"&queryPara.subId="+pId;
			}else if(type == 'BSSELF'){
				//母线节点
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryBsLineAtion.action?queryPara.bsId="
															+id+"&queryPara.type="+type+"&queryPara.subId="+pId;
			}else if(type == 'LINE'){
				//线路
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryLineAtion.action?queryPara.lineId="
															+id+"&queryPara.type="+type+"&queryPara.subId="+pId;
			}else if(type == 'POWERDEVICE'){
				//线路
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryLineAtion1.action?queryPara.lineId="
															+id+"&queryPara.type="+type+"&queryPara.subId="+pId;
			}else if(type == 'LINESELF'){
				//线路节点
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryLineAtion.action?queryPara.lineId="
															+id+"&queryPara.type="+type+"&queryPara.subId="+pId;
			}else if(type == 'POWERDEVICESELF'){
				//线路节点
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryLineAtion1.action?queryPara.lineId="
															+id+"&queryPara.type="+type+"&queryPara.subId="+pId;
			}else if(type == 'ELECOTHER'){
				//其他设备
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryOtherEquipment.action?queryPara.subId="+pId+"&queryPara.id="+id+"&queryPara.other=1&queryPara.isdevice=1";
			}else if(type == 'ELECOTHERSELF'){
				//其他设备节点
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryOtherEquipment.action?queryPara.subId="+pId+"&queryPara.id="+id+"&queryPara.other=0&queryPara.isdevice=1";
			}else if(type == 'EM'){
				//环境监测设备
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryEnviromentalnuit.action?queryPara.subId="+pId+"&queryPara.id="+id+"&queryPara.other=1&queryPara.isdevice=0";
			}else if(type == 'EMSELF'){
				//环境监测设备节点
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryEnviromentalnuit.action?queryPara.subId="+pId+"&queryPara.id="+id+"&queryPara.other=0&queryPara.isdevice=0";
			}else if(type == 'AC'){
				//门禁
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryEntranceGuard.action?queryPara.subId="+pId+"&queryPara.id="+id+"&queryPara.other=1&queryPara.isdevice=0";
			}else if(type == 'ACSELF'){
				//门禁节点
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryEntranceGuard.action?queryPara.subId="+pId+"&queryPara.id="+id+"&queryPara.other=0&queryPara.isdevice=0";
			}else if(type == 'LIGHT'){
				//照明
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryIllumNation1.action?queryPara.subId="+pId+"&queryPara.id="+id+"&queryPara.other=1&queryPara.isdevice=0";
			}else if(type == 'LIGHTSELF'){
				//照明节点
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryIllumNation1.action?queryPara.subId="+pId+"&queryPara.id="+id+"&queryPara.other=0&queryPara.isdevice=0";
			}else if(type == 'NONELECOTHER'){
				//非电器设备其他设备
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryOtherEquipment.action?queryPara.subId="+pId+"&queryPara.id="+id+"&queryPara.other=1&queryPara.isdevice=0";
			}else if(type == 'NONELECOTHERSELF'){
				//非电器设备其他设备节点
				document.getElementById("rightFrame").src = basePath+"areaEnergy/queryOtherEquipment.action?queryPara.subId="+pId+"&queryPara.id="+id+"&queryPara.other=0&queryPara.isdevice=0";
			}
			else if(type == 'REALTMNL'){
				//实时终端
				document.getElementById("rightFrame").src = basePath+"areaEnergy/treeThreeLevelZD.action?queryPara.consId="+consId+"&queryPara.terminalId="+id+"&queryPara.type="+type+"&queryPara.id="+pId;
			}else if(type == 'CAPACITYGATEWAY'){
				//智能网关终端
				document.getElementById("rightFrame").src = basePath+"capacityData/treeThreeLevelZNWG.action?queryPara.terminalId="
															+id+"&queryPara.type="+type+"&queryPara.id="+pId;
			}else if(type == 'NOINVADE'){
				//非侵入式负荷终端
				document.getElementById("rightFrame").src = basePath+"capacityData/treeThreeLevelFQRS.action?queryPara.terminalId="
															+id+"&queryPara.type="+type+"&queryPara.id="+pId+"&queryPara.consNo="+consNo;
			}else if(type == 'CBTMNL'){
				//抄表终端
				document.getElementById("rightFrame").src = basePath+"areaEnergy/treeTwoLevelCBZD.action?queryPara.terminalId="
															+id+"&queryPara.type="+type+"&queryPara.id="+pId;
			}else if(type == 'METER'){
				//电表
				document.getElementById("rightFrame").src = basePath+"areaEnergy/treeThreeLevelDB.action?queryPara.meterId="
															+id+"&queryPara.type="+type+"&queryPara.id="+pId;
			}else if(type == "CAPACITYSOCKET"){
				// 智能插座
				document.getElementById("rightFrame").src = basePath+"pages/areaEnergy/capacity/consData/capacitySocketsMp.jsp?consId="+consId;
			}else if(type == "CAPACITYSOCKETSUB"){
				// 电器
				document.getElementById("rightFrame").src = basePath+"capacityData/capacitySocketMp.action?id="+id;
			}
		},
		onLoadSuccess: function(node, data){
			if(countNum == 0){
				var node1 = $('#leftDiv').tree('getChildren')[1];
				var name = node1.text;
				var id = node1.id.split(',')[0];
				var type = node1.id.split(',')[1];
				//默认用户变
				if(type =='CONSSUB'||type =='CONSBUILD'||type =='CONSDEPART'){
					document.getElementById("rightFrame").src = basePath+"areaEnergy/treeTwoLevelYHB.action?queryPara.consId="
													+id+"&queryPara.type="+type+"&queryPara.id="+id;
				}else{
					node1 = $('#leftDiv').tree('getChildren')[0];
					var name1 = node1.text;
					var id1 = node1.id.split(',')[0];
					var type1 = node1.id.split(',')[1];
					document.getElementById("rightFrame").src = basePath+"areaEnergy/treeOneLevelYH.action?queryPara.consId="
															+consId+"&queryPara.type="+type1+"&queryPara.id="+id1;
				}	
				countNum = countNum+1;
				$('#nodeId1').val(node1.id);
				$('#leftDiv').tree('select', node1.target);
			}else{
				var nodeId2 = $('#nodeId1').val();
				var nodeA = $('#leftDiv').tree('find', nodeId2);
				if(nodeA == null || nodeA == 'null'){
					var rootNode = $('#leftDiv').tree('find',consId+',yh,null');
					$('#leftDiv').tree('select', rootNode.target);
				}else{
					$('#leftDiv').tree('select', nodeA.target);
				}
			}												
		}
	});
});



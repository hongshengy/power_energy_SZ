/**
 * 树展示例子
 * @author 王国际
 * @since 2017-02-26
 */
Ext.namespace('com.frontier.des.despages.treeDemo');
Ext.Ajax.timeout = 200000;
 
$(function(){
 
//	$('#shuru').combobox({
//		 onChange: function(newValue, oldValue){
//			 if(isNaN(newValue)){
//				// newValue = $('#shuru').combobox('getText');
//					$.getJSON(gdc.webContextRoot + 'destree/querySpTree.action?ziMu='+newValue,{ 
//							},
//							function(json){
//								$('#shuru').combobox('loadData',json);	
//							});
//    	}
//		}
//	});
	

//	
	
//	
//	$('#tree-singleTree').combotree({    
//		url:gdc.webContextRoot +'destree/queryTree.action',
//	    method:'get',
//	    multiple:false//是否支持多选
//	});
//	
//	
//	$('#pCode').combobox({    
//		url:gdc.webContextRoot +'pCode/queryCode.action?codeSortId=70002',
//	    method:'get',
//	    multiple:false//是否支持多选
//	}); 
//	
//	
//	$('#tree-leftQyTree').tree({    
//		url:gdc.webContextRoot +'destree/querySpTree.action',
//	    method:'get',
//	    multiple:false,//是否支持多选
//	    editable:'true' ,
//	    onBeforeLoad:function(node){//请求之前
//	    	var treeNodeType = null;
//			if(node){//点击节点
//				treeNodeType = node.type;//获取节点类型
//				$('#tree-leftQyTree').tree('options').url=gdc.webContextRoot +'destree/querySpTree.action?treeNodeType='+treeNodeType;//带参数地址
//			}
//		}
//	});
	
	$('#tree-leftQyTree').tree({ //默认没参数，获取区域  企业  都是打开状态
//		url:gdc.webContextRoot +'destree/queryTree.action?isQyCode=false&isAllTreeNode=true&ziMu=',
		url:gdc.webContextRoot +'destree/queryTree.action',
	    method:'get',
	    multiple:false,//是否支持多选
	    editable:'true' 
	});
	$('#tree-multipleTree').combotree({   //只有企业 ，打开状态 
		url:gdc.webContextRoot +'destree/queryTree.action?isQyCode=false&ziMu=',
	    method:'get',
	    multiple:true//是否支持多选
	}); 
	$('#tree-DetailTree').combotree({  //全部展开 区域  企业  用户变  。。。。。。  
		url:gdc.webContextRoot +'destree/queryTree.action?isAllTreeNode=true',
	    method:'get',
	    multiple:false//是否支持多选
	}); 
	
	$('#tree-singleTree').combotree({    //某个中间节点  ，到最底层的节点 
		url:gdc.webContextRoot +'destree/queryYhbTree.action?isAllTreeNode=true&treeNodeType=1&id=102000003446',
	    method:'get',
	    multiple:false//是否支持多选
	}); 
	
	
////	
//	$('#tree-DetailTree').combotree({
//		url:gdc.webContextRoot +'destree/queryTree.action',
//	    method:'get',
//	    multiple:false,//是否支持多选
//	    editable:'true' ,
//	    onBeforeLoad:function(node){//请求之前
//	    	var treeNodeType;
//			if(node){//点击节点
//				treeNodeType = node.type;//获取节点类型
//				$('#tree-DetailTree').combotree('tree').tree('options').url=gdc.webContextRoot 
//				+'destree/queryYhbTree.action?treeState=closed&treeNodeType='+treeNodeType;//带参数地址
//			}else{
//				$('#tree-DetailTree').combotree('tree').tree('options').url=gdc.webContextRoot 
//				+'destree/queryTree.action?treeState=closed';//带参数地址
//				
//			}
//		}
//	});
	
});
 

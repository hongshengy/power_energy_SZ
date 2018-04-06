<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
		
String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数
String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
//consId="101000004001";
//consName="立霸实业有限公司";
String shownTree = "";//左侧树布局
String shownRightStyle = "";//左侧树布局
//未获取到企业编码，证明不是客户监控页面调用的，需要加载左侧树进行查询
	if(consId==null || consId.equals("")){//左侧树布局
		shownTree =  "<div id=\"westTree\" data-options=\"region:'west',disabled:true,split:true,border:false\" style=\"width:220px;\">"
				+"  <div style=\"padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2\">"
				+"    <input id=\"CobConsSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search'\">"
				+"    <div style=\"position: absolute;top:38px;width:218px;\">"
				+"      <input id=\"consSelect\" class=\"easyui-textbox\" style=\"width: 98%;\" data-options=\"iconCls:'icon-search',prompt:'请输入客户名称'\">"
				+"    </div>"
				+"  </div>"
		 		+"  <div style=\"overflow: auto;top:70px;width:218px;bottom:0px;position: absolute;\">"
				+"    <ul  id=\"tree-leftQyTree\" class=\"easyui-tree\" style=\"width:100%;\"  >"
				+"    </ul>"
				+"  </div> "
				+"</div> ";
	}
 
session.setAttribute("itemCode","fgktxt");
session.setAttribute("itemName","空调系统");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">

<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 	<meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <title>空调系统</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
     <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>

  <body class="easyui-layout">
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
<style>
	.local-panel{
		/* border: 1px solid #D4D4CA; */
		background-color: #fff;
	}
	.local-panel-shadow{
	-webkit-box-shadow: 0 2px 10px #D4D4CA;
	-moz-box-shadow: 0 2px 10px #D4D4CA;
	box-shadow: 0 2px 10px #D4D4CA;
	}
	.local-panel .header-block{
	background-color: #F5F5F5;
	padding: 5px 8px;
	font-size: 14px;
	font-family: "微软雅黑";
	color: #464646;
	}
	#tjfx-panel{
		width: 100%;
		height: 100%;
	}
	
	#tjfx-panel .search-panel{
		width: 100%;
		height: 90px;
	}
	
	body{
		font-size: 12px ;
	}
	
	 #dialog1, #dialog2{
        padding: 10px 30px 10px 10px;
    }
	#dialog1 .col{
        float: left;
    }

    #dialog1 p,
    #dialog2 p{
        margin: 0;
    }

    #dialog1 .block{
    }

    #dialog1 .title,
    #dialog2 .title{
        padding: 10px 0;
        font-size: 14px;
        color: #14c079;
    }

    #dialog1 .td-label{
        padding: 5px;
        font-size: 12px;
        color: #39393a;
    }

    #dialog1 .td-value{
        padding: 5px;
        font-size: 12px;
        color: #717173;
    }

    #dialog1 table.grid td{
        border: 1px solid #b5b5b5;
    }

    #dialog1 table.grid{
        border-collapse: collapse;
        width: 100%;
        text-align: center;
    }

    #dialog1 .jielun-block{
        padding: 10px 0 10px 3px;
    }

    #dialog1 .b1 .title{
        padding-top: 0;
    }

    #dialog1 .block.b1 .col1{
        width: 50%;
    }

    #dialog1 .block.b1 .col2{
        width: 50%;
    }

    #dialog1 .block.b2 .col1{
        width: 50%;
    }

    #dialog1 .block.b2 .col2{
        width: 50%;
    }

    #dialog1 .block.b3 .col1{
        width: 50%;
    }

    #dialog1 .block.b3 .col2{
        width: 50%;
    }

    #dialog1 .dialog-bodyBlock,
    #dialog2 .dialog-bodyBlock{
/*        width: 800px;
        height: 400px;*/
    }

    #dialog1 .top-border,
    #dialog2 .top-border{
        border-top: 1px solid #e4e4e4;
    }

    #dialog2 .block{
        margin: 10px;
    }

    #dialog2 .block.b1{
        margin-top: 0;
    }
	
	#tjfx-panel .search-panel div{
		padding: 5px 0px 5px 10px;
		float: left;
	}
	  #tjfx-panel .form-table {
	        font-size: 12px;
	    }
	    
	    #tjfx-panel .form-table .td-label{
	        width: 300px;
	        text-align: left;
	    }
	
	    #tjfx-panel .form-table .td-value{
	        width: 300px;
	    }
	
	    #tjfx-panel .form-table .td-fillwidth{
	        width: 40px;
	    }
	    .block2{
        text-align: center;
        border-top: 1px solid #d4d4ca;
        padding: 6px 3px;
    }

    .block2 .col{
        float: left;
        width: 20%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        padding: 0 3px;
    }

    .block2 .col .innerBox{
        background-color: #f7f7f7;
        padding: 10px 20px;
        height: 75px;;
    }

    .block2 .col p{
        margin: 5px 0;
        font-family: "宋体",serif;
    }

    .block2 .col .value{
        color: #242424;
        font-size: 14px;

    }

    .block2 .col .label{
        color: #242424;
        padding: 5px;
        font-size: 14px;
    }

    .block2 .col .label .num{
          font-family: "宋体",serif;
    	  font-size: 14px;
    	  font-weight: bold;
    }
    
    .block2 .col .value .num{
         font-family: "宋体",serif;
    	  font-size: 14px;
    	  font-weight: bold;
    }

    .block2 .col3 .innerBox p{
        margin-top: 20px;
    }
     .block2 .col4 .innerBox p{
        margin-top: 20px;
    }
     .block2 .col5 .innerBox p{
        margin-top: 20px;
    }
     .block2 .col6 .innerBox p{
        margin-top: 20px;
    }
	.tools-labelgroup{
    margin-left:5px;
}
	.toolsbar-panel .right-float {
		float: right;
	}
.hidden{
display:none;
}			
</style> 
	<%=shownTree%>
    <div class="main-panel noOverflow" data-options="region:'center',border:false" >
<!--     		 <div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
				<ul class="s-ul-one">
					<li style="padding-left: 10px;">
					  <span id="consNo"  class="tb-group-label">客户编号:</span>
					</li>
					<li>
					  <span id="consName"  class="tb-group-label">客户名称:</span>
					</li>
					<li>
					  <span id="htrl"  class="tb-group-label">合同容量:</span>
					</li>
					<li>
					  <span id="address"  class="tb-group-label">用电地址:</span>
					</li>
					<li>
					  <span id="khzt"  class="tb-group-label">客户状态:</span>
					</li>
					<li class="s-right-one">
					    <a id="bt_exportynbg" href="#" class="easyui-linkbutton c100" >用能分析报告</a>
                        <div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div>
						<div id="dltj" style="height:500px;display:none;"></div>
						<div id="fhqs" style="height:500px;display:none;"></div>
						<div id="glyszs" style="height:500px;display:none;"></div>
						<div id="dftj" style="height:500px;display:none"></div>
					</li>
				</ul> 
			</div> -->			
    	<div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
			<ul class="ulTable">
				<li style="padding-left: 10px;">
					<span id="consNo"  class="tb-group-label">客户编号</span>
				</li>
				<li>
					<span id="consName"  class="tb-group-label">客户名称:</span>
				</li>
				<li>
					<span id="htrl"  class="tb-group-label">合同容量:</span>
				</li>
				<li>
					<span id="address"  class="tb-group-label">用电地址:</span>
				</li>
				<li>
					<span id="khzt"  class="tb-group-label">客户状态:</span>
				</li>
					<li style="float:right;padding-right: 10px;">
				 	<a id="bt_exportynbg" href="#" class="easyui-linkbutton c100">用能分析报告</a>
				</li>
			</ul>
		</div>
			
		<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
	    	<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
	    		<ul class="s-ul-one" >
					<li>
					   <!-- <span id="firstbyq" class="tools-labelgroup">
							<select class="easyui-combobox hidden" id="yndyName"  data-options="width:120,panelHeight:'auto',panelWidth:120" ></select>
						</span> -->
					 	<span id="secondbyq" class="tools-labelgroup">
		               	   <select class="easyui-combobox hidden" id="byqsb"  data-options="width:120,panelHeight:'auto',panelWidth:120" ></select>
					 	</span> 
					   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
				       		<a id="ydzsleft" href="#" style="border-style:none;">
				       		<img style="border-style:none;vertical-align: middle" alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
			           </span> 
					   <span class="tools-labelgroup" style="vertical-align:middle;">
					   		<input id="startydzsDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
					   		<input id="startMonthDate" class="Wdate" type="text" style="width: 100px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM'})"/>
					   </span>
					    <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
								<a id="ydzsright" href="#" style="border-style:none;">
								<img style="border-style:none;vertical-align: middle"  alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
						</span>			
<!-- 						<span class="tools-labelgroup" style="text-algin:center;float:right;">
                                   <a id="searchydzs" href="#" class="easyui-linkbutton c100 shadow" >查询</a>
						</span> -->
						<span id="sel_type" class="tools-labelgroup">
							<select id="byqQueryType" class="easyui-combobox" name="dept" data-options="prompt:'请选择',height:24,editable:false,width:100,panelWidth:100">   
								<option value="M" >月曲线</option>
								<option value="D" selected>日曲线</option>											
							</select>
						</span>	
						<li class="s-right-one">
			                    <a id="searchydzs" href="#" class="easyui-linkbutton c100 shadow" >查询</a>
			                    <a id="searchfhe" href="#" class="easyui-linkbutton c100 shadow" >查询</a>
						</li>
<!-- 						<span class="tools-labelgroup" style="vertical-align:middle;text-algin:center;float:right;">
                                  <a id="zbcsnxxs" href="#" class="easyui-linkbutton c100 shadow" onclick="$('#dialog1').dialog('open')">指标参考</a>
					    </span> -->
	                </li>
				</ul>
			</div>
			
		<div class="easyui-panel noOverflow" style="width: 100%;height:100%;position: relative;" data-options="onResize:autoResize,border:false,fit:true">
			<!-- <div id="tabskt" class="easyui-tabs" style="width:100%;height:100%;" data-options="border:false,onSelect:userTabsSelect"> -->	
			<div id="tabskt" class="easyui-tabs" style="width:100%;height:100%;" data-options="border:false,onSelect:userTabsSelect">							      
				<div title="负荷走势" class="main-panel">  
					<div class="easyui-panel noOverflow auto-resize" style="width: 100%;" data-options="border:false,onResize:userResize">
					   <div id="fheChart" class="chart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;border-bottom:solid 1px #CCCCCC;"></div>
					</div>	
					<div class="easyui-panel local-panel panel-margin-top" style="width: 100%;height: 150px;" data-options="border:false,onResize:autoResize">
						<div class="header-block">
							<span>节能建议</span>
						</div>
						<div class="jienengjianyi1" style="padding: 15px 10px;font-size: 14px" data-options="border:false,onResize:autoResize">
							<div class="col col1" >
								<p class="value-color" id="jnjyABS1" style="width: 100%;">&nbsp;</p>
								<p class="value-color" id="jnjyBBS1" style="width: 100%;">&nbsp;</p>
								<p class="value-color" id="jnjyCBS1" style="width: 100%;">&nbsp;</p>
							</div>
						</div>
					</div>			
				</div>
				
				<div title="用电量走势"  class="main-panel" style="overflow-x:hidden">  
					<div class="easyui-panel noOverflow auto-resize" style="width: 100%;min-height:300px" data-options="border:false,onResize:userResize">
					   <div id="ydzsChart" class="chart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;border-bottom:solid 1px #CCCCCC;"></div>
					</div>	
					<div class="easyui-panel local-panel panel-margin-top" style="width: 100%;height: 150px;" data-options="border:false,onResize:autoResize">
						<div class="header-block">
							<span>节能建议</span>
						</div>
						<div class="jienengjianyi" style="padding: 15px 10px;font-size: 14px" data-options="border:false,onResize:autoResize">
							<div class="col col1" >
								<p class="value-color" id="jnjyABS" style="width: 100%;">&nbsp;</p>
								<p class="value-color" id="jnjyBBS" style="width: 100%;">&nbsp;</p>
								<p class="value-color" id="jnjyCBS" style="width: 100%;">&nbsp;</p>
							</div>
						</div>
					</div>			
				</div>
				
			</div>
		</div>
			
		</div>
	</div>	
	          
<%-- 	        <div style="position: absolute;top: 70px;left:10px;right:10px;bottom: 10px;">
	        	<div class="container-shadow " style="display: block; position: absolute;top: 0px;left:0px;right:0px;bottom: 0px;">
		    		<div class="easyui-panel" style="width: 100%;height: 100%; position: relative;" data-options="onResize:userResize">
			     
						<div style="position: absolute;left: 0px;right: 0px;top: 0px;overflow: auto;">								        									        									        
									        <div id="ydzsDate" class="toolsbar-panel">
			                       				<div class="tbRow">
			                       				   <span class="tools-labelgroup" style="vertical-align:middle;text-algin:center;">
						                               <input id="yndyName" class="easyui-combobox" style="height:24px;width:155px" data-options="editable:false,panelWidth:155"/>
												   </span>
			                       				
			                       				   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
				                       				   <a id="ydzsleft" href="#" style="border-style:none;">
				                       				   <img style="border-style:none;" alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
			                       				   </span> 
			                       				   
						                           <span class="tools-labelgroup" style="vertical-align:middle;">
						                             	<input id="startydzsDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
													</span>
												    <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
															<a id="ydzsright" href="#" style="border-style:none;">
															<img style="border-style:none;" alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
													</span>
			
													<span class="tools-labelgroup" style="vertical-align:middle;text-algin:center;float:right;">
						                                    <a id="searchydzs" href="#" class="easyui-linkbutton c100 shadow" >查询</a>
													</span>
													<span class="tools-labelgroup" style="vertical-align:middle;text-algin:center;float:right;">
					                                    <a id="zbcsnxxs" href="#" class="easyui-linkbutton c100 shadow" onclick="$('#dialog1').dialog('open')">指标参考</a>
												    </span>
			                                   </div>
									        </div>
									        
						   <div style="height:557px;">
						     <div id="tabskt" class="easyui-tabs" style="height:100%;">
							      
							      <div title="空调用电走势" data-options="selected:true">   
							            <div class="container-marginTop grid-panel" style="height: 300px;margin-top: 6px;"> 
						                    <div id="ydzsChart" style="height:100%;width: 100%;"></div>
						                </div>
					                  
					                     <div class="container-marginTop grid-panel" style="height:170px;margin-top: 6px;border-top: 1px solid #d4d4ca;"> 
						                          <div class="body-block ktynjy-block clearfix">
						       						<div class="col col1" style="padding: 15px 10px;font-size: 14px;background-color: #FFFFFF">
						                				<p id="ktynjy41" class="value-color" >&nbsp
						               					</p>
						               					<p id="ktynjy42"  class="value-color">&nbsp
						               					</p>
						                				<p id="ktynjy43" class="value-color">&nbsp
						                				</p>
						            				</div>
						           				 	<div class="col col2" style="padding: 15px 10px;font-size: 14px;background-color: #FFFFFF">
						               					 <p id="ktzb41">&nbsp</p>
						               					 <p id="ktzb42">&nbsp</p>
										                <p id="ktzb43">&nbsp</p>
										            </div>
							        			</div>
 											</div>
								    </div>  									    								    
						     </div>
						   </div>						                           
                         </div>
					    </div>
			       </div>
	        	</div> --%>
	    	</div>
    	</div>
    </div>
</div> 



    <div id="dialog1" class="easyui-dialog easyui-dialog-white" title="指标参考" closed="true"
         data-options="
         width: 720,
         height: 540,
        buttons: [{
            text:'  确认  ',
            width:60,
            handler:function(){
                $('#dialog1').dialog('close')
            }
        }]
    ">
        <div class="dialog-bodyBlock">
            <div class="block b1">
                <div class="title">单位空调面积耗冷量</div>
                <div class="body-block">
                    <div class="row clearfix">
                        <div class="col col1">
                            <table>
                                <tbody>
                                <tr>
                                    <td class="td-label">指标名称:</td>
                                    <td class="td-value">单位空调面积耗冷量 CCA</td>
                                </tr>
                                <tr>
                                    <td class="td-label">公式:</td>
                                    <td class="td-value">CCA=Q/A</td>
                                </tr>
                                <tr>
                                    <td class="td-label">原始数据:</td>
                                    <td class="td-value">
                                        <p>空调使用面积A</p>
                                        <p>空调系统总制冷量Q</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col col2">
                            <table class="grid">
                                <tbody>
                                <tr>
                                    <td>建筑物类型</td>
                                    <td>参考值（kW·h/㎡）</td>
                                </tr>
                                <tr>
                                    <td>办公</td>
                                    <td>90~120</td>
                                </tr>
                                <tr>
                                    <td>宾馆</td>
                                    <td>80~110</td>
                                </tr>
                                <tr>
                                    <td>住宅</td>
                                    <td>80~90</td>
                                </tr>
                                <tr>
                                    <td>其他</td>
                                    <td>80~120</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="jielun-block">
                            <span class="td-label">结论分析:</span><span class="td-value">若单位空调面积耗冷量CCA高于指标值， 则说明存在节能空间</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block b2 top-border">
                <div class="title">空调系统能效比</div>
                <div class="body-block">
                    <div class="row clearfix">
                        <div class="col col1">
                            <table >
                                <tbody>
                                <tr>
                                    <td class="td-label">指标名称:</td>
                                    <td class="td-value">空调系统能效比 EERs</td>
                                </tr>
                                <tr>
                                    <td class="td-label">公式:</td>
                                    <td class="td-value">EERs=Q/ΣNi</td>
                                </tr>
                                <tr>
                                    <td class="td-label">原始数据:</td>
                                    <td class="td-value">
                                        <p>空调系统总制冷量Q</p>
                                        <p>空调系统设备的总耗电ΣNi</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col col2">
                            <table class="grid">
                                <tbody>
                                <tr>
                                    <td>冷水机组类型</td>
                                    <td>制冷系统总制冷量（kW）</td>
                                    <td>能效比</td>
                                </tr>
                                <tr>
                                    <td rowspan="2">风冷式或蒸发式冷却</td>
                                    <td>≤100</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>＞100</td>
                                    <td>2.1</td>
                                </tr>
                                <tr>
                                    <td rowspan="3">水冷式</td>
                                    <td><1163</td>
                                    <td>2.7</td>
                                </tr>
                                <tr>
                                    <td>1163~3516</td>
                                    <td>2.8</td>
                                </tr>
                                <tr>
                                    <td>＞3516</td>
                                    <td>2.9</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="jielun-block">
                            <span class="td-label">结论分析:</span><span class="td-value">若空调系统能效比EERs低于计算后的指标值， 则说明存在节能空间，或者部分设备效率低</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block b3 top-border">
                <div class="title">冷源系统能效系数</div>
                <div class="body-block">
                    <div class="row clearfix">
                        <div class="col col1">
                            <table >
                                <tbody>
                                <tr>
                                    <td class="td-label">指标名称:</td>
                                    <td class="td-value">冷源系统能效系数 EER_sys</td>
                                </tr>
                                <tr>
                                    <td class="td-label">公式:</td>
                                    <td class="td-value">EER_sys=Q0/Σni</td>
                                </tr>
                                <tr>
                                    <td class="td-label">原始数据:</td>
                                    <td class="td-value">
                                        <p>Q0--冷源系统测定工况下的平均制冷量（kW）</p>
                                        <p>ΣNi--冷源系统各设备的平均输入功率之和（kW）</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col col2">
                            <table class="grid">
                                <tbody>
                                <tr>
                                    <td>类型</td>
                                    <td>单台额定制冷量kw</td>
                                    <td>能效系数</td>
                                </tr>
                                <tr>
                                    <td rowspan="3">水冷冷水机组</td>
                                    <td>＜528</td>
                                    <td>2.3</td>
                                </tr>
                                <tr>
                                    <td>528-1163</td>
                                    <td>2.6</td>
                                </tr>
                                <tr>
                                    <td>＞1163</td>
                                    <td>3.1</td>
                                </tr>
                                <tr>
                                    <td>风冷或蒸发冷却</td>
                                    <td>≤50</td>
                                    <td>1.8</td>
                                </tr>
                                <tr>
                                    <td>风冷或蒸发冷却</td>
                                    <td>＞50</td>
                                    <td>2</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="jielun-block">
                            <span class="td-label">结论分析:</span><span class="td-value">若空调系统能效比EERs低于计算后的指标值， 则说明存在节能空间，或者部分设备效率低</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="dialog2" class="easyui-dialog easyui-dialog-white" title="指标参考" closed="true"
         data-options="
         width: 720,
         height: 540,
        buttons: [{
            text:'  确认  ',
            width:60,
            handler:function(){
                $('#dialog2').dialog('close')
            }
        }]
    ">
        <div class="dialog-bodyBlock">
            <div class="block b1">
                <div class="title">冷冻水分析</div>
                <div class="body-block">
                    <p>1.若回水温度大于12℃，且供回水温差大于5+1℃，室内平均温度不高于26+1℃，则说明该冷量输出能满足冷负荷需求，可降低冷冻水泵流量；</p>
                    <p>2.若回水温度大于12℃，且供回水温差大于5+1℃，室内平均温度高于26+1℃，则说明该冷量输出未能满足冷负荷需求，需降低出水温度或加开主机；</p>
                    <p>3.若回水温度大于12℃，且供回水温差约为5±1℃，室内平均温度不高于26+1℃，则说明该冷量输出较为合理；</p>
                    <p>4.若回水温度大于12℃，且供回水温差约为5±1℃，室内平均温度高于26+1℃，则说明该冷量输出未能满足冷负荷需求，需降低出水温度或加开主机；</p>
                    <p>5.若回水温度大于12℃，且供回水温差小于5-1℃，室内平均温度高于26+1℃，同时最不利末端室内温度过高，则说明该冷量输出不合理，需加开水泵或者检查支路回水情况，若还不能解决则加开主机；</p>
                    <p>6.若回水温度大于12℃，且供回水温差小于5-1℃，室内平均温度不高于26+1℃，则说明该冷量输出满足要求，可降低冷冻水泵流量；</p>
                    <p>7.若回水温度小于12℃，且供回水温差等于于5±1℃，室内平均温度不高于26+1℃，则说明该冷量输出满足要求，可适当提高主机出水温度，提高主机效率；</p>
                    <p>8.若回水温度小于12℃，且供回水温差等于于5±1℃，室内平均温度高于26+1℃，则说明该冷量输出未满足要求，可加开主机；</p>
                    <p>9.若回水温度小于12℃，且供回水温差大于5+1℃，室内平均温度高于26+1℃，则说明该冷量输出未能满足冷负荷需求，需加开主机同时提高出水温度；或者增加水泵流量；</p>
                    <p>10.若回水温度小于12℃，且供回水温差大于5+1℃，室内平均温度不高于26+1℃，则说明该冷量输出能满足冷负荷需求，可增加水泵流量，并适当提高出水温度；</p>
                    <p>11.若回水温度小于12℃，且供回水温差小于5-1℃，室内平均温度不高于26+1℃，则说明该冷量输出能够满足要求，可降低水泵流量；</p>
                    <p>12.若回水温度小于12℃，且供回水温差小于5-1℃，室内平均温度高于26+1℃，则说明该冷量输出未能满足要求，可能存在水力不平衡，者检查支路回水情况或需加开水泵；</p>
                </div>
            </div>
            <div class="block b2 top-border">
                <div class="title">冷却水分析</div>
                <div class="body-block">
                    <p>适用前提：室外湿球温度低于27℃（冷却水冷却下线值为室外湿球温度）</p>
                    <p>1.若回水温度大于27℃，且供回水温差大于5+1℃，则说明该冷却量不足，需加开冷却塔，提高加大冷却水流量（冷却水泵频率或增开水泵）；</p>
                    <p>2.若回水温度大于27℃，且供回水温差约为5±1℃，则说明该冷却量能够满足要求。但冷却温度较高，降低主机性能系数，在室外湿球温度不高于27℃时，可增开冷却塔，以降低冷凝温度，提高制冷效率；</p>
                    <p>3.若回水温度大于27℃，且供回水温差小于5-1℃，则说明该流量偏大，可降低水泵流量（降低冷却水泵频率或关闭部分水泵），在室外湿球温度不高于27℃时，可增开冷却塔，以降低冷凝温度，提高制冷效率；</p>
                    <p>4.若回水温度小于27℃，且供回水温差等于5±1℃，则说明该冷却量较为合理；在室外湿球温度不高于27℃时，可增开冷却塔，以降低冷凝温度，提高制冷效率；</p>
                    <p>5.若回水温度小于27℃，且供回水温差大于5+1℃，则说明该冷却流量不足，提高加大冷却水流量（冷却水泵频率或增开水泵）；</p>
                    <p>6.若回水温度小于27℃，且供回水温差小于5-1℃，则说明该流量偏大，可降低水泵流量（降低冷却水泵频率或关闭部分水泵）；</p>
                    <p>适用前提：室外湿球温度高于27℃（冷却水冷却下线值为室外湿球温度）</p>
                    <p>7.若回水温度大于实际湿球温度，且供回水温差大于5+1℃，则说明该冷却量不足，需加开冷却塔，提高加大冷却水流量（冷却水泵频率或增开水泵）；</p>
                    <p>8.若回水温度大于实际湿球温度℃，且供回水温差约为5±1℃，则说明该冷却量能够满足要求。</p>
                    <p>9.若回水温度大于实际湿球温度，且供回水温差小于5-1℃，则说明该流量偏大，可降低水泵流量（降低冷却水泵频率或关闭部分水泵）；</p>
                </div>
            </div>
            <div class="block b3 top-border">
                <div class="title">旁通分析</div>
                <div class="body-block">
                    <p>未运行的主机供回水温度系统回水温度基本一致，则说明该主机存在旁通现象，可以节能</p>
                    <p>判定条件：</p>
                    <p>1.主机A未运行；</p>
                    <p>2.主机A回水温度约等于出水温度，且与系统回水温度基本相同</p>
                    <p>3.主机B运行；</p>
                    <p>4.主机B冷出水温度低于回水温度，且低于出水干管温度</p>
                    <p>满足上述条件，则说明存在旁通现象，冷却水系统，冷冻水系统均有可能发生。可通过自动控制或人工手动方式关闭相关阀门（未运行主机侧），解决旁通问题。</p>
                </div>
            </div>
        </div>
    </div>

<script type="text/javascript">
		webContextRoot="<%=basePath%>";
		consId = "<%=consId%>";
		consName = "<%=consName%>";
		var funcId = "<%=funcId%>";
</script>

 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
 <script src="<%=pagePath %>/js/common.js"></script>
 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
 <script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
 <script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
 <script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
 <script src="<%=pagePath%>/js/templet_common.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/exportynbg.js"></script>
   <script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
   <script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
 <script type="text/javascript" src="fgktxt.js"></script> 
 
</body>
  
</html>
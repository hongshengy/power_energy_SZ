<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	
session.setAttribute("itemCode","despower");
session.setAttribute("itemName","功率因数");
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
    <title>用电监控母线</title>
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=baseUrl%>/resources/jsepc/css/ext-all.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body>
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
<style>
	#tjfx-panel{
		width: 100%;
		height: 100%;
	}
	
	#tjfx-panel .search-panel{
		width: 100%;
		height: 90px;
	}
	
	#tjfx-panel .search-panel div{
		padding: 5px 0px 5px 10px;
		float: left;
	}
	  #tjfx-panel .form-table {
	        font-size: 12px;
	    }
	    
	    #tjfx-panel .form-table .td-label{
	        width: 150px;
	        text-align: left;
	    }
	
	    #tjfx-panel .form-table .td-value{
	        width: 350px;
	    }
	
	    #tjfx-panel .form-table .td-fillwidth{
	        width: 40px;
	    }
		#tjfx-panel #cjzddjpz-panel{
			width: 100%;
			height: 100%;
			background-color: #f1f1f1;
			padding: 10px;
			box-sizing: border-box;
		}
		#tjfx-panel #ycsj-panel{
			width: 100%;
			height: 100%;
			background-color: #f1f1f1;
			padding: 10px;
			box-sizing: border-box;
		}
		#tjfx-panel #cjzddjpz-panel .content{
			width: 450px;
			height: 100%;
			margin: 0 auto;
			overflow: auto;
			position: relative;
		}
		#tjfx-panel #ycsj-panel.content{
			width: 450px;
			height: 100%;
			margin: 0 auto;
			overflow: auto;
			position: relative;
		}
</style> 
<div id="tjfx-panel" class="easyui-layout" style="width: 100%;height: 100%;">
	< <div data-options="region:'west',split:true,title:'导航',border:false" style="width:200px;">
        <div style="padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2">
            <input class="easyui-textbox" style="width: 100%;" data-options="iconCls:'icon-search'">
        </div>
        <ul  id="tree-leftQyTree" class="easyui-tree" style="width:100%;"  >
        </ul>
    </div> 
    <div data-options="region:'center',border:false" style="position: relative;width: 100%;">
    	<div style="position: relative;width: 100%;height: 100%;">
    		<div style="height: 120px; padding: 10px 10px 0px 10px;">
	    		
			      <table class="form-table">
					<tbody>
						<tr>
							<td style="padding:5px;" width="100%">
								<fieldset
									style="padding: 5px 5px 5px 5px; background-color: #fff;">
									<legend>
										<font style="font-size: 12px; font-weight: bold;">母线档案</font>
									</legend>
									<table width="100%" cellspacing="8px" cellpadding="0"
										border="0">
										<tr>
											<td class="td-label" align="right" nowrap="nowrap">
												<font style="font-size: 12px; font-weight: bold;">母线名称</font>
											</td>
											<td width="25%">
												<input type="text" size="18" id="cons_no" readonly="readonly" class="easyui-textbox" value="xxxx母线">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       <font style="font-size: 12px; font-weight: bold;">运行状态</font>
                                            </td>
                                            <td width="25%">
												 <input type="text" size="18" id="cons_name" readonly="readonly" class="easyui-textbox" value="投运">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       <font style="font-size: 12px; font-weight: bold;">电压等级</font>
                                            </td>
                                            <td width="25%" id="tmnlId1">
                                                 <input type="text" size="18" id="org_name" readonly="readonly" class="easyui-textbox" value="10KV">
                                            </td>
										</tr>
										<tr>
                                            <td class="td-label" align="right" nowrap="nowrap">
												<font style="font-size: 12px; font-weight: bold;">降压层级</font>
											</td>
											<td width="25%">
					                            <input type="text" size="18" id="contract_cap" readonly="readonly" class="easyui-textbox" value="一级">
											</td>
											<td class="td-label" align="right"  nowrap="nowrap">
                                                       <font style="font-size: 12px; font-weight: bold;">PT</font>
                                            </td>
                                            <td width="25%">
                                            	<input type="text" size="18" id="contact_name" readonly="readonly" class="easyui-textbox" value="10">
                                            </td>
                                            <td class="td-label" align="right" nowrap="nowrap">
												<font style="font-size: 12px; font-weight: bold;">所属终端</font>
											</td>
											<td width="25%">
												<input type="text" size="18" id="telephone" readonly="readonly" class="easyui-textbox" value="lb00002">
											</td>
										</tr>
										
									</table>
								</fieldset>
							</td>
						</tr>
					</tbody>
				</table>         
			      
	        </div>
	        
	         <div style="position: absolute;top: 120px;left:10px;right:10px;bottom: 10px;">
	        	<div class="container-shadow " style="display: block; position: absolute;top: 0px;left:0px;right:0px;bottom: 0px;">
		    		<div class="easyui-panel" style="width: 100%;height: 100%; position: relative;" data-options="onResize:userResize" >
			        	  	<div class="toolsbar-panel">
                       				<div class="tbRow" style="padding: 0px 10px 0px 500px;">
			                             <span class="tools-labelgroup">
										  	数据日期:
										  	<input id="startDate" type="text" class="easyui-datebox" style="width: 100px;text-align: left;"></input>  
										 </span>

										  <span class="tools-labelgroup">
							                <select class="easyui-combobox" id="jinjicd"  data-options="width:120,panelHeight:'auto'" ></select>
										  </span>

										   <span class="tools-labelgroup">
			                                    <a id="search" href="#" class="easyui-linkbutton c9 shadow" style="width: 80px;height: 24px;">查询</a>
										  </span>
                              </div>
                              <div class="toolsbar-panel">
                       				<div class="tbRow" style="padding: 0px 10px 0px 500px;">
			                             <span class="tools-labelgroup">
										  	电压曲线
										 </span>
                              </div>
                              <div class="tbRow" style="padding: 0px 10px 0px 500px;">
			                             <span class="tools-labelgroup">
										  	查询结果
										 </span>
                              </div>
						</div>
						
						<div style="position: absolute;left: 0px;right: 0px;top: 100px;bottom: 0px;">
						    <div id="cxTab1" class="easyui-tabs" style="width:100%;">   
							     <div title="图表" id="xlsssj1"> 
							    	<div style="position: absolute;left: 0px;right: 0px;top:150px;bottom: 0px;">
							    		<div id="userChart" ></div>
							    	</div>
							    </div>
							    <div title="数据" id="xlsssj2"  >  
							    	<table id="bdzCount-datagrid"></table>
							    </div>
				           </div> 
						</div>
						
			        </div>
	    	
	        	</div>
	    	</div>
    	</div>
    </div>
</div>
<div id="topic-excel" class="x-hidden"/>

<script type="text/javascript">
		webContextRoot="<%=basePath%>";
</script>

 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
 <script src="<%=pagePath %>/js/common.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
 <script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
 <script type="text/javascript" src="<%=baseUrl%>/resources/ext-2.2.1/adapter/ext/ext-base.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
  <script type="text/javascript" src="powerCounts.js"></script>
 
</body>
</html>

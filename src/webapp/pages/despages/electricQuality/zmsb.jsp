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
    <title>变压器分析</title>
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
         font-size: 14px;
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
.local-panel .header-block{
	background-color: #F5F5F5;
	padding: 5px 8px;
	font-size: 14px;
	font-family: "微软雅黑";
	color: #464646;
}
/*由于easyui的panel会出现一些样式上的bug，这里重新手写一组panel样式*/
.local-panel{
	border: 1px solid #D4D4CA;
	background-color: #fff;
}
.local-panel-shadow{
	-webkit-box-shadow: 0 2px 10px #D4D4CA;
	-moz-box-shadow: 0 2px 10px #D4D4CA;
	box-shadow: 0 2px 10px #D4D4CA;
}
.value-color{
  color: #606060;
  margin-top:15px;
  font-size: 14px;
  font-family: "微软雅黑";
}
</style> 

	
    <%=shownTree%>
    <div class="main-panel noOverflow" data-options="region:'center'" >
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
			
       	  <div id="content-panel" class="auto-resize easyui-panel main-panel " style="width: 100%;overflow-x:hidden" data-options="cls:'fangtian-panel-style bottom-padding',onResize:autoResize">
       	  <div class="easyui-panel auto-resize noOverflow show-bottom-border" style="width: 100%;position: relative;min-height:300px;overflow-x:hidden;" data-options="border:false">
		    <table style="width: 100%;height: 100%;">
		    <colgroup>
							<col width="40%" />
							<col width="60%" />
			</colgroup>
		      <tbody>
				 <tr>
				   <td style="border:1px solid #cccccc">
				   		<div class="auto-resize easyui-panel noOverflow" style="width: 94%;min-height:240px;" data-options="border:false,onResize:userResize">
		    		        <div id="zmynfx-pie" style="width: 100%; height: 260px;"></div>
		    		    </div>
		    	   </td>
		    	   <td style="border:1px solid #cccccc">
                     		<div class="tbRow">
               				   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
                				   <a id="left" href="#" style="border-style:none;">
                				   <img style="border-style:none;vertical-align: middle" alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
               				   </span>
	                           <span class="tools-labelgroup" style="vertical-align:middle;">
	                               <input id="startDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
							   </span>
							   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
								   <a id="right" href="#" style="border-style:none;">
								   <img style="border-style:none;vertical-align: middle" alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
							   </span>
							   <span class="tools-labelgroup" style="vertical-align:middle;text-algin:center;float:right;margin-right:20px">
	                               <a id="search" href="#" class="easyui-linkbutton c100">查询</a>
							   </span>
                          </div>
                          <div class="auto-resize easyui-panel noOverflow" style="width: 98%;min-height:240px;" data-options="border:false,onResize:userResize">
                          	<div id="zmynfx-chart1"  class="chart" style="width: 100%; height: 260px;"></div>
                          </div>
                  </td>
	           </tr>     
	          </tbody>       
	        </table>
		  </div>
		    
<%-- 		    <div style="overflow-x:hidden;height:500px;border:1px solid #cccccc;margin:2px" >
		    	<div class="header-block">
					<span>照明负荷</span>
				</div>
		    	<div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
		    		<ul class="ulTable" >
						<li>
							<select class="easyui-combobox" id="zmName"  data-options="width:120,panelHeight:'auto',panelWidth:120" ></select>
						   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
					       		<a id="fhleft" href="#" style="border-style:none;">
					       		<img style="border-style:none;vertical-align: middle" alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
				           </span> 
						   <span class="tools-labelgroup" style="vertical-align:middle;">
						   		<input id="startdayDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
						   		<input id="startMonthDate" class="Wdate" type="text" style="width: 100px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM'})"/>
						   </span>
						    <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
									<a id="fhright" href="#" style="border-style:none;">
									<img style="border-style:none;vertical-align: middle"  alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
							</span>			
							<span id="sel_type" class="tools-labelgroup">
								<select id="byqQueryType" class="easyui-combobox" name="dept" data-options="prompt:'请选择',height:24,editable:false,width:100,panelWidth:100">   
									<option value="M" >月曲线</option>
									<option value="D" selected>日曲线</option>											
								</select>
							</span>	
							<li class="s-right-one">
				                    <a id="searchfhe" href="#" class="easyui-linkbutton c100 shadow" >查询</a>
							</li>
		                </li>
					</ul>
				</div>  
				<div class="easyui-panel noOverflow auto-resize" style="width: 100%;min-height:200px" data-options="border:false,onResize:userResize">
				   <div id="fheChart" class="chart" style="width: 100%;height:280px;padding: 10px;box-sizing: border-box;"></div>
				</div>	
				<div id="tab-fzl" class="local-panel block2 panel-margin-top clearfix">
					<div class="col col1" style="width:33%">
						<div class="innerBox">
							<p class="label" style="color: #37A09D">
								最大负载率：<span class="num" id="maxFZL">-</span>
							</p>
							<p class="value" style="color: #37A09D">
								发生时间：<span class="num" id="maxdate">-</span>
							</p>
						</div>
					 </div>
					 <div class="col col2" style="width:33%">
						 <div class="innerBox">
							<p class="label" style="color: orange">
								最小负载率：<span class="num" id="minFZL">-</span>
							</p>
							<p class="value" style="color: orange">
								发生时间：<span class="num" id="mindate">-</span>
							</p>
						</div>
					 </div>
					 <div class="col col3" style="width:34%">
						 <div class="innerBox">
							<p class="lab" style="color: #B763D0;">
								平均负载率：<span class="num" id="avgFZL">-</span>
							</p>
						 </div>
					 </div>
				</div>		
			</div> --%>
			
		<div style="width: 100%;height:500px;position: relative;" data-options="onResize:autoResize,border:false">
			<div id="tabskt" class="easyui-tabs" style="width:100%;height:100%;" data-options="border:false">							      
				<div title="照明负荷"  class="main-panel" style="overflow-x:hidden">  
					<div class="easyui-panel" style="width: 100%;height:60px;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize"> 
			    		<ul class="ulTable">
							<li>
								<select class="easyui-combobox" id="zmName"  data-options="width:120,panelHeight:'auto',panelWidth:120" ></select>
							   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
						       		<a id="fhleft" href="#" style="border-style:none;">
						       		<img style="border-style:none;vertical-align: middle" alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
					           </span> 
							   <span class="tools-labelgroup" style="vertical-align:middle;">
							   		<input id="startdayDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
							   		<input id="startMonthDate" class="Wdate" type="text" style="width: 100px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM'})"/>
							   </span>
							    <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
										<a id="fhright" href="#" style="border-style:none;">
										<img style="border-style:none;vertical-align: middle"  alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
								</span>			
								<span id="sel_type" class="tools-labelgroup" style="display:none">
									<select id="byqQueryType" class="easyui-combobox" name="dept" data-options="prompt:'请选择',height:24,editable:false,width:100,panelWidth:100">   
										<option value="M" >月曲线</option>
										<option value="D" selected>日曲线</option>											
									</select>
								</span>	
								<li class="s-right-one" style="float:right;margin-right:20px">
					                    <a id="searchfhe" href="#" class="easyui-linkbutton c100 shadow" >查询</a>
								</li>
			                </li>
						</ul>
					</div> 
					<div class="easyui-panel noOverflow auto-resize" style="width:100%;" data-options="onResize:userResize,border:false">
					   <div id="fheChart" class="chart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;"></div>
					</div>	
					<div id="tab-fzl" class="local-panel block2 panel-margin-top clearfix" style="height:100px">
						<div class="col col1" style="width:33%">
							<div class="innerBox">
								<p class="label" style="color: #37A09D">
									最大负荷：<span class="num" id="maxFZL">-</span>
								</p>
								<p class="value" style="color: #37A09D">
									发生时间：<span class="num" id="maxdate">-</span>
								</p>
							</div>
						 </div>
						 <div class="col col2" style="width:33%">
							 <div class="innerBox">
								<p class="label" style="color: orange">
									最小负荷：<span class="num" id="minFZL">-</span>
								</p>
								<p class="value" style="color: orange">
									发生时间：<span class="num" id="mindate">-</span>
								</p>
							</div>
						 </div>
						 <div class="col col3" style="width:34%">
							 <div class="innerBox">
								<p class="lab" style="color: #B763D0;">
									平均负荷：<span class="num" id="avgFZL">-</span>
								</p>
							 </div>
						 </div>
					</div>		
				</div>
			</div>
		</div>
		<div style="width: 100%;height:500px;position: relative;" data-options="onResize:autoResize,border:false,fit:true">
			<div id="tab" class="easyui-tabs" style="width:100%;height:100%;" data-options="border:false">							      
				<div title="功率因数"  class="main-panel" style="overflow-x:hidden">  
					<div class="easyui-panel" style="width: 100%;height:60px;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
			    	<ul class="ulTable" >
						<li>
							<select class="easyui-combobox" id="glysName"  data-options="width:120,panelHeight:'auto',panelWidth:120" ></select>
						   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
					       		<a id="glysleft" href="#" style="border-style:none;">
					       		<img style="border-style:none;vertical-align: middle" alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
				           </span> 
						   <span class="tools-labelgroup" style="vertical-align:middle;">
						   		<input id="startglMonthDate" class="Wdate" type="text" style="width: 100px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM'})"/>
						   </span>
						    <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
									<a id="glysright" href="#" style="border-style:none;">
									<img style="border-style:none;vertical-align: middle"  alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
							</span>			
							<li class="s-right-one" style="float:right;margin-right:20px">
				                    <a id="searchglys" href="#" class="easyui-linkbutton c100 shadow" >查询</a>
							</li>
		                </li>
					</ul>
					</div> 
					<div class="easyui-panel noOverflow auto-resize" style="width: 100%;" data-options="border:false,onResize:userResize">
					   <div id="glysChart" class="chart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;"></div>
					</div>	
					<div class="easyui-panel local-panel panel-margin-top" style="width: 100%;height: 100px;">
						<div class="header-block" >
							<span>功率因数分析</span>
						</div>
						<div class="jienengjianyi" style="font-size: 14px" data-options="border:false,onResize:autoResize">
							<div class="col col1" style="margin-left:5px">
								<p class="value-color" id="jnjyABS" style="width: 100%;">&nbsp;</p>
								<!-- <p class="value-color" id="jnjyBBS" style="width: 100%;">&nbsp;</p> -->
							</div>
						</div>
					</div>	
				</div>
			</div>
		</div>
			
<%-- 			<div style="overflow-x:hidden;height:450px">
		    	<div class="header-block">
					<span>功率因数</span>
				</div>
		    	<div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
		    		<ul class="ulTable" >
						<li>
							<select class="easyui-combobox" id="glysName"  data-options="width:120,panelHeight:'auto',panelWidth:120" ></select>
						   <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
					       		<a id="glysleft" href="#" style="border-style:none;">
					       		<img style="border-style:none;vertical-align: middle" alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
				           </span> 
						   <span class="tools-labelgroup" style="vertical-align:middle;">
						   		<input id="startglMonthDate" class="Wdate" type="text" style="width: 100px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM'})"/>
						   </span>
						    <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
									<a id="glysright" href="#" style="border-style:none;">
									<img style="border-style:none;vertical-align: middle"  alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
							</span>			
							<li class="s-right-one">
				                    <a id="searchglys" href="#" class="easyui-linkbutton c100 shadow" >查询</a>
							</li>
		                </li>
					</ul>
				</div>  
				<div class="easyui-panel noOverflow auto-resize" style="width: 100%;min-height:200px" data-options="border:false,onResize:userResize">
				   <div id="glysChart" class="chart" style="width: 100%;height:200px;padding: 10px;box-sizing: border-box;border-bottom:solid 1px #CCCCCC;"></div>
				</div>	
				<div class="easyui-panel local-panel panel-margin-top" style="width: 100%;height: 140px;" data-options="border:false,onResize:autoResize">
					<div class="header-block">
						<span>节能建议</span>
					</div>
					<div class="jienengjianyi" style="font-size: 14px" data-options="border:false,onResize:autoResize">
						<div class="col col1" >
							<p class="value-color" id="jnjyABS" style="width: 100%;">&nbsp;</p>
							<p class="value-color" id="jnjyBBS" style="width: 100%;">&nbsp;</p>
						</div>
					</div>
				</div>			
			</div> --%>
			<div style="width: 100%;height:300px;position: relative;" data-options="onResize:autoResize,border:false,fit:true">
				<div id="tab" class="easyui-tabs" style="width:100%;height:100%;" data-options="border:false">							      
					<div title="照明档案"  class="main-panel" style="overflow-x:hidden">  
						<div class="easyui-panel auto-resize noOverflow"  style="width: 100%;height: 100%;position: relative;border-bottom:none;overflow-x:hidden;" data-options="border:false">
					           <table id="gjxxpz-datagrid" style="height:300px;width:100%;"></table>
					    </div>
					</div>
				</div>
		    </div>
		    <div class="local-panel" style="height:150px;border-bottom:0;border-right:0;border-left:0;" >
		        <div class="header-block"><span>节能建议</span></div>
		        <div class="body-block fenxi-block clearfix">
		                <p id="pId1" style="margin-left:5px;font-size:15px" >
		                </p>
		                 <p id="pId2" style="margin-left:5px;font-size:15px" >
		                </p>
		                 <p id="pId3" style="margin-left:5px;font-size:15px" >
		                </p>
		        </div>
		    </div>
		   </div>
</div>

<div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div>
								<div id="dltj" style="height:500px;display:none;"></div>
								<div id="fhqs" style="height:500px;display:none;"></div>
								<div id="glyszs" style="height:500px;display:none;"></div>
								<div id="dftj" style="height:500px;display:none"></div>

<script type="text/javascript">
		var webContextRoot="<%=basePath%>";
		var consId = "<%=consId%>";
		var consName = "<%=consName%>";
		var funcId = "<%=funcId%>";
</script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
 <script src="<%=pagePath %>/js/common.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
  <script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/exportynbg.js"></script>
  <script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
  <script src="<%=pagePath%>/js/templet_common.js"></script>
  <script type="text/javascript" src="zmsb.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
</body>
</html>

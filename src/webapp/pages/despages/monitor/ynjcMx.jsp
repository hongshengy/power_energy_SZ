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

session.setAttribute("itemCode","ynjcMx");
session.setAttribute("itemName","母线");
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
    <title>母线</title>
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
	.inlineElementBox {
		vertical-align:middle;
	}
	.inlineElementBox span.label {
		margin-left:5px;
		font-size:12px;
	}
	.tools-labelgroup{
    margin-left:5px;
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
						<!-- <li style="float:right;padding-right: 10px;">
					 <a id="bt_exportynbg" href="#" class="easyui-linkbutton c100">用能分析报告</a>
					</li> -->
				</ul>
			</div>
			
       	  <div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
		      
        	 <div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
						<ul class="s-ul-one">
							<li>
								<span class="tools-labelgroup">
									<select id="searchmc" class="easyui-combobox"  data-options="width:130,panelHeight:'auto',panelWidth:130" >	 
									</select>
								</span>
								
							    <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
		                       		<a id="left" href="#" style="border-style:none;">
		                       		<img style="border-style:none;vertical-align: middle" alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
		                       	</span>
		                       	 
		                       	<span class="tools-labelgroup" style="vertical-align:middle;">
								    <input id="startDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:changedate,isShowClear:false,readOnly:true})"/>
								</span>
								 
								<span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
									<a id="right" href="#" style="border-style:none;">
									<img style="border-style:none;vertical-align: middle" alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
								</span>
								 
							     <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
								 <select id="station" class="easyui-combobox" style="width: 80px;" editable="false" data-options="panelHeight:'auto',panelWidth:80" >
									<option value="288" selected="selected">288点</option>
									<option value="1440" >1440点</option>
								 </select>
							     </span> 
							</li>        
							     <li class="s-right-one">
								    <a id="search" href="#" class="easyui-linkbutton c100">查询</a>
							     </li>     
						</ul>
					 </div>
			
			<div class="easyui-panel auto-resize " style="width: 100%;position: relative;overflow-x:hidden;" data-options="border:false">
										
						<div class="auto-resize easyui-panel noOverflow" style="width: 100%;min-height:280px;" data-options="border:false,onResize:userResize">
							<div id="userChart" class="chart" style="width: 100%;height:100%;min-height: 280px;padding: 10px;box-sizing: border-box;"></div> 
						   <!-- <div id="sxdlbphChart" class="chart" style="width: 100%;height:100%;min-height: 280px;padding: 10px;box-sizing: border-box;border-bottom:solid 1px #CCCCCC;"></div> -->
						</div>
							<div id="tab-fzl" class="local-panel block2 panel-margin-top clearfix" style="margin-bottom:1px;border-bottom:solid 1px #CCCCCC;">
							    <div class="col col5" style="width:33%">
									<div class="innerBox">
									<p class="label" style="color: #37A09D;">
									  AB线越限：上限<span class="num" id="avgCrABsx">0</span>次/下限<span class="num" id="avgCrABxx">0</span>次
									</p>
									</div>
								</div>
							    <div class="col col5" style="width:34%">
									<div class="innerBox">
									<p class="label" style="color: #B763D8;">
									  BC线越限：上限<span class="num" id="avgCrBCsx">0</span>次/下限<span class="num" id="avgCrBCxx">0</span>次
									</p>
									</div>
								</div>
							    <div class="col col5" style="width:33%">
									<div class="innerBox">
									<p class="label" style="color: orange;">
									  CA线越限：上限<span class="num" id="avgCrCAsx">0</span>次/下限<span class="num" id="avgCrCAxx">0</span>次
									</p>
									</div>
								</div>
							</div>
						 <!-- <div id="userChart1" style="height:340px;"></div>  -->
						 <div class="auto-resize easyui-panel noOverflow" style="width: 100%;min-height:280px;" data-options="border:false,onResize:userResize">
							<div id="userChart1" class="chart" style="width: 100%;height:100%;min-height: 280px;padding: 10px;box-sizing: border-box;"></div> 
						   <!-- <div id="sxdlbphChart" class="chart" style="width: 100%;height:100%;min-height: 280px;padding: 10px;box-sizing: border-box;border-bottom:solid 1px #CCCCCC;"></div> -->
						</div>
							<div id="tab-fzl" class="local-panel block2 panel-margin-top clearfix" style="margin-bottom:1px;">
								
							<div class="col col5" style="width:33%">
									<div class="innerBox">
									<p class="label" style="color: #37A09D;">
									  A相越限：上限<span class="num" id="avgCrAsx">0</span>次/下限<span class="num" id="avgCrAxx">0</span>次
									</p>
									</div>
							</div>
							<div class="col col5" style="width:34%">
									<div class="innerBox">
									<p class="label" style="color: #B763D8;">
									  B相越限：上限<span class="num" id="avgCrBsx">0</span>次/下限<span class="num" id="avgCrBxx">0</span>次
									</p>
									</div>
							</div>
							<div class="col col5" style="width:33%">
									<div class="innerBox">
									<p class="label" style="color: orange;">
									  C相越限：上限<span class="num" id="avgCrCsx">0</span>次/下限<span class="num" id="avgCrCxx">0</span>次
									</p>
									</div>
							</div>
							<span class="num" id="sxstr"><p class="labelsxjg" style="color: red;">● 实际电压偏高将造成设备过电压，威胁绝缘和降低使用寿命。</p></span>
							<span class="num" id="xxstr"><p class="labelxxjg" style="color: red;">● 实际电压偏低，可能会使用户设备和电器不能正常运行或停止运行。</p></span>
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
  <script type="text/javascript" src="ynjcMx.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>  
  <script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
  <script src="<%=pagePath%>/js/templet_common.js"></script>
 
</body>
</html>

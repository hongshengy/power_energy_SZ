<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
session.setAttribute("itemCode","despower");
session.setAttribute("itemName","功率因数");
String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数
//consId="101000004001";
//consName="立霸实业有限公司";
String shownTree = "";//左侧树布局
String shownRightStyle = "";//左侧树布局
//未获取到企业编码，证明不是客户监控页面调用的，需要加载左侧树进行查询
if(consId==null || consId.equals("")){//左侧树布局
	shownTree =  "<div id=\"westTree\" data-options=\"region:'west',disabled:true,split:true,title:'导航',border:false\" style=\"width:220px;\">"
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
    <title>电费超容分析</title>
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
        color: #232323;
        font-size: 12px;

    }

    .block2 .col .label{
        color: #242424;
        padding: 5px;
        font-size: 14px;
    }

    .block2 .col .label .num{
          font-family: "宋体",serif;
    	  font-size: 28px;
    	  font-weight: bold;
    }
    .block2 .colNew .label .num{
          font-family: "宋体",serif;
    	  font-size: 28px;
    	  font-weight: bold;
    }
    .block2 .colNew .value{
        color: #242424;
        font-size: 12px;

    }
    
    .block2 .col .value .num{
         font-family: "宋体",serif;
    	  font-size: 12px;
    	  font-weight: bold;
    }
    .block2 .colNew .value .num{
         font-family: "宋体",serif;
    	  font-size: 12px;
    	  font-weight: bold;
    }
    .block2 .colNew .innerBox p{
        text-align:center ;
    }
    
    .block2 .col1 .innerBox p{
        text-align:center ;
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
</style> 
    <%=shownTree%>
       <div class="main-panel noOverflow" data-options="region:'center',border:false" >
    	 <div class="easyui-panel" style="width: 100%;position: relative;" data-options="cls:'fangtian-panel-style',onResize:autoResize">
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
					<li style="float:right;padding-right: 10px;">
				    <a id="bt_exportynbg" href="#" class="easyui-linkbutton c100">用能分析报告</a>
				     <div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div>
								<div id="dltj" style="height:500px;display:none;"></div>
								<div id="fhqs" style="height:500px;display:none;"></div>
								<div id="glyszs" style="height:500px;display:none;"></div>
								<div id="dftj" style="height:500px;display:none"></div>
				    </li>
				</ul> 
			</div>
			<div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
			 	<div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
						<ul class="s-ul-one" >
						<li>
			                <span class="tools-labelgroup" >
                  				 <a id="left" href="#" style="border-style:none;">
	                       		  <img style="border-style:none;vertical-align: middle" height="14px" width="14px"  alt="前一年" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
                 			</span> 
	                        <span class="tools-labelgroup" >
	                             <input id="startDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy',onpicked:changeDate,isShowClear:false,readOnly:true})"/>
							</span>
							<span class="tools-labelgroup">
								<a id="right" href="#" style="border-style:none;">
								<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="后一年" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
							</span>
						</li>
                		<li class="s-right-one">
                		<span style="vertical-align: bottom;"><a id="search" href="#" class="easyui-linkbutton c100">查询</a></span>
                		</li>
					</ul> 
				</div>
				 
				<div id="c-panel" class="main-panel auto-resize easyui-panel noOverflow" style="width: 100%;" data-options="border:false,onResize:autoResize">
					<div class="auto-resize easyui-panel" style="width: 100%;" data-options="border:false,onResize:userResize">
						<div class="chart" id="userChart" style="width: 100%;height:100%;padding: 10px;box-sizing: border-box;"></div>
					</div>
					<div id="tab-fzl" class="local-panel block2 panel-margin-top clearfix" style="margin-bottom:1px;border: 1px solid #D4D4CA;border-bottom-color:white;">
								<div class="col col1" style="width:25%">
									<div class="innerBox">
									    <p class="label" style="color: #B763D8;">
											<span class="num" id="avgCr">-</span>
											<span class="num" style="font-size:16px">次</span>
										</p>
										<p class="value" style="color: #232323;">
											超容次数<span class="num" ></span>
										</p>
									</div>
								</div>
							<div class="col col1" style="width:25%">
								<div class="innerBox">
								<p class="label" style="color: #37A09D">
										<span class="num" id="maxFZL">-</span>
										<span class="num" style="font-size:16px">min</span>
									</p>
									<p class="value" style="color: #232323;">
										超容总时长<span class="num" ></span>
									</p>
									<!-- <p class="value" style="color: #37A09D">
										发生时间：<span class="num" id="maxdate">2017-04-17</span>
									</p> -->
								</div>
							</div>
							<div class="col col1" style="width:25%">
								<div class="innerBox">
								<p class="label" style="color: orange">
										<span class="num" id="minFZL">-</span>
										<span class="num" style="font-size:16px">min</span>
									</p>
									<p class="value" style="color: #232323;">
										平均超容总时长<span class="num" >-</span>
									</p>
								<!-- 	<p class="value" style="color: orange">
										发生时间：<span class="num" id="mindate">2017-04-17</span>
									</p> -->
								</div>
							</div>
							<div class="col colNew" style="width:25%">
								<div class="innerBox">
								   <p class="label" style="color: #B763D0;">
										<span class="num" id="avgFZL">-</span>
										<span class="num" style="font-size:16px">min</span>
									</p>
									<p class="value" style="color: #232323;">
										超容最大时长：<span class="num" >-</span>
									</p>
									<p class="value" style="color: #232323;">
										发生时间：<span class="num" id="mindate">2017-04-17</span>
									</p> 
								</div>
							</div>
						</div>
				</div>
			</div>
    	 </div>
    		
<!-- <div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div>
<div id="dltj" style="height:500px;display:none;"></div>
<div id="fhqs" style="height:500px;display:none;"></div>
<div id="glyszs" style="height:500px;display:none;"></div>
<div id="dftj" style="height:500px;display:none"></div>
 -->

<script type="text/javascript">
		webContextRoot="<%=basePath%>";
		consId = "<%=consId%>";
		consName = "<%=consName%>";
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
  <script type="text/javascript" src="chargeCurve.js"></script>
   <script src="<%=pagePath%>/js/templet_common.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
</body>
</html>

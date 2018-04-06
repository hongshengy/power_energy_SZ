<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	

String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数
//consId="101000004001";
//consName="立霸实业有限公司";
String shownTree = "";//左侧树布局
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
    <title>水循环系统</title>
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
	        
       	  <div id="content-panel" class="auto-resize easyui-panel main-panel noOverflow" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
        	 <div class="easyui-panel show-bottom-border" style="width: 100%;position: relative;" data-options="onResize:autoResize,border:false">
               					<ul class="s-ul-one">
               					  <li>
               					     <span class="tools-labelgroup">
						               	 <select class="easyui-combobox" id="by"  data-options="width:120,panelWidth:120" >
						               	 <option value="ddadad">主机</option>
						               	 <option value="ddada">冷却塔</option>
						               	 <option value="ddaad">热交换器</option>
						               	 <option value="dadad">抽水泵</option>
						               	 <option value="adad">控制装置</option>
						               	 </select>
									  </span>
                       				  <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
	                       				  <a id="left" href="#" style="border-style:none;">
	                       				  <img style="border-style:none;vertical-align: middle""  alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
                       				  </span>
			                          <span class="tools-labelgroup" style="vertical-align:middle;">
			                              <input id="startDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd',onpicked:changedate})"/>
									  </span>
									  <span class="tools-labelgroup" style="vertical-align:middle;border-style:none;">
										  <a id="right" href="#" style="border-style:none;">
										  <img style="border-style:none;vertical-align: middle"" alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
									  </span>
 								 </li>
									  <li class="s-right-one">
			                              <a id="search" href="#" class="easyui-linkbutton c100" >查询</a>
									  </li>
                              </ul>
					    </div>
					   
			<div class="easyui-panel auto-resize noOverflow" style="width: 100%;position: relative;" data-options="border:false">
				<div id="tabs" class="easyui-tabs" style="width: 100%;height: 100%;" data-options="border:false">
			
					<div id="mdyl-panel" title="流量" style="width:100%;height:100%" data-options="closable:false,onResize:userResize"> 
							<!--图表-->
							<div id="llChart" style="height:360px;"></div>
							  <div id="tab-fzl" class="local-panel block2 panel-margin-top clearfix" style="border-bottom:0;border-left:0">
								  <div class="col col1" style="width:33%">
										<div class="innerBox">
											<p class="label" style="color: #37A09D">
												最大流量：<span class="num" id="maxFZL">-</span>
											</p>
											<p class="value" style="color: #37A09D">
												发生时间：<span class="num" id="maxFZLdate">-</span>
											</p>
										</div>
								 </div>
								<div class="col col2" style="width:33%">
									<div class="innerBox">
										<p class="label" style="color: orange">
											最小流量：<span class="num" id="minFZL">-</span>
										</p>
										<p class="value" style="color: orange">
											发生时间：<span class="num" id="minFZLdate">-</span>
										</p>
									</div>
								</div>
								<div class="col col3" style="width:34%">
									<div class="innerBox">
										<p class="lab" style="color: #B763D0;">
											平均流量：<span class="num" id="avgFZL">-</span>
										</p>
									</div>
								</div>							
		              	</div>
						<div class="local-panel block2 panel-margin-top clearfix" title="设备基本信息"
							 data-options="iconCls:'icon-grid',onResize:userResize" style="border-bottom:0;border-left:0">
							<table style="width:100%;bordre-collapse:separate;">
								<tr>
									<td style="width:11%" align="center"><img
										src="../common/eems/images/sbxh.png" /></td><!-- 设备型号 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/sccj.png" /></td><!-- 生产厂家 -->
								
									<td style="width:11%" align="center"><img
										src="../common/eems/images/edgl.png" /></td><!-- 额定功率 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/eddl.png" /></td><!-- 额定电流 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/eddy.png" /></td><!-- 额定电压 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/tyrq.png" /></td><!-- 投运日期 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/yxzt.png" /></td><!-- 运行状态 -->
								</tr>
								<tr>
									<td id="eddyBS" align="center">-</td><!-- 设备型号 -->
									<td id="eddlBS" align="center">-</td><!-- 生产厂家 -->
								
									<td id="ggxhBS" align="center">-</td><!-- 额定功率 -->
									<td id="sbmcBS" align="center">-</td><!-- 额定电流 -->
									<td id="sbbhBS" align="center">-</td><!-- 额定电压 -->
									<td id="ztrqBS" align="center">-</td><!-- 投运日期 -->
									<td id="yxztBS" align="center">-</td><!-- 运行状态 -->
								</tr>
							</table>
						</div>
						<div class="local-panel panel-margin-top" style="border-bottom:0;border-left:0">
							<div class="header-block">
								<span>节能建议</span>
							</div>
							<div class="jienengjianyi" style="padding: 15px 10px;font-size: 14px;" >
								<div class="col col1" >
									<p class="value-color" id="jnjyABS" style="width: 100%;">&nbsp;</p>
									<p class="value-color" id="jnjyBBS" style="width: 100%;">&nbsp;</p>
									<p class="value-color" id="jnjyCBS" style="width: 100%;">&nbsp;</p>
								</div>
							</div>
						</div>
					</div>
					
					<div id="scql-panel" title="流速" style="width:100%;height:100%" data-options="closable:false,onResize:userResize"> 
							<!--图表-->
							<div id="lsChart" style="height:360px;"></div>
							  <div id="tab-fzl" class="local-panel block2 panel-margin-top clearfix" style="border-bottom:0;border-left:0">
								  <div class="col col1" style="width:33%">
										<div class="innerBox">
											<p class="label" style="color: #37A09D">
												最大流速：<span class="num" id="maxFZL">-</span>
											</p>
											<p class="value" style="color: #37A09D">
												发生时间：<span class="num" id="maxFZLdate">-</span>
											</p>
										</div>
								 </div>
								<div class="col col2" style="width:33%">
									<div class="innerBox">
										<p class="label" style="color: orange">
											最小流速：<span class="num" id="minFZL">-</span>
										</p>
										<p class="value" style="color: orange">
											发生时间：<span class="num" id="minFZLdate">-</span>
										</p>
									</div>
								</div>
								<div class="col col3" style="width:34%">
									<div class="innerBox">
										<p class="lab" style="color: #B763D0;">
											平均流速：<span class="num" id="avgFZL">-</span>
										</p>
									</div>
								</div>							
		              	</div>
						<div class="local-panel block2 panel-margin-top clearfix" title="设备基本信息"
							 data-options="iconCls:'icon-grid',onResize:userResize" style="border-bottom:0;border-left:0">
							<table style="width:100%;bordre-collapse:separate;">
								<tr>
									<td style="width:11%" align="center"><img
										src="../common/eems/images/sbxh.png" /></td><!-- 设备型号 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/sccj.png" /></td><!-- 生产厂家 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/edrl.png" /></td><!-- 额定容量 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/edgl.png" /></td><!-- 额定功率 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/eddl.png" /></td><!-- 额定电流 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/eddy.png" /></td><!-- 额定电压 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/tyrq.png" /></td><!-- 投运日期 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/yxzt.png" /></td><!-- 运行状态 -->
								</tr>
								<tr>
									<td id="eddyBS" align="center">-</td><!-- 设备型号 -->
									<td id="eddlBS" align="center">-</td><!-- 生产厂家 -->
									<td id="edrlBS" align="center">-</td><!-- 额定容量 -->
									<td id="ggxhBS" align="center">-</td><!-- 额定功率 -->
									<td id="sbmcBS" align="center">-</td><!-- 额定电流 -->
									<td id="sbbhBS" align="center">-</td><!-- 额定电压 -->
									<td id="ztrqBS" align="center">-</td><!-- 投运日期 -->
									<td id="yxztBS" align="center">-</td><!-- 运行状态 -->
								</tr>
							</table>
						</div>
						<div class="local-panel panel-margin-top" style="border-bottom:0;border-left:0">
							<div class="header-block">
								<span>节能建议</span>
							</div>
							<div class="jienengjianyi" style="padding: 15px 10px;font-size: 14px;" >
								<div class="col col1" >
									<p class="value-color" id="jnjyABS" style="width: 100%;">&nbsp;</p>
									<p class="value-color" id="jnjyBBS" style="width: 100%;">&nbsp;</p>
									<p class="value-color" id="jnjyCBS" style="width: 100%;">&nbsp;</p>
								</div>
							</div>
						</div>
					</div>
					
					<div id="scqy-panel" title="扬程" style="width:100%;height:100%" data-options="closable:false,onResize:userResize"> 
							<!--图表-->
							<div id="ycChart" style="height:360px;"></div>
							  <div id="tab-fzl" class="local-panel block2 panel-margin-top clearfix" style="border-bottom:0;border-left:0">
								  <div class="col col1" style="width:33%">
										<div class="innerBox">
											<p class="label" style="color: #37A09D">
												最大扬程：<span class="num" id="maxFZL">-</span>
											</p>
											<p class="value" style="color: #37A09D">
												发生时间：<span class="num" id="maxFZLdate">-</span>
											</p>
										</div>
								 </div>
								<div class="col col2" style="width:33%">
									<div class="innerBox">
										<p class="label" style="color: orange">
											最小扬程：<span class="num" id="minFZL">-</span>
										</p>
										<p class="value" style="color: orange">
											发生时间：<span class="num" id="minFZLdate">-</span>
										</p>
									</div>
								</div>
								<div class="col col3" style="width:34%">
									<div class="innerBox">
										<p class="lab" style="color: #B763D0;">
											平均扬程：<span class="num" id="avgFZL">-</span>
										</p>
									</div>
								</div>							
		              	</div>
						<div class="local-panel block2 panel-margin-top clearfix" title="设备基本信息"
							 data-options="iconCls:'icon-grid',onResize:userResize" style="border-bottom:0;border-left:0">
							<table style="width:100%;bordre-collapse:separate;">
								<tr>
									<td style="width:11%" align="center"><img
										src="../common/eems/images/sbxh.png" /></td><!-- 设备型号 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/sccj.png" /></td><!-- 生产厂家 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/edrl.png" /></td><!-- 额定容量 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/edgl.png" /></td><!-- 额定功率 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/eddl.png" /></td><!-- 额定电流 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/eddy.png" /></td><!-- 额定电压 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/tyrq.png" /></td><!-- 投运日期 -->
									<td style="width:11%" align="center"><img
										src="../common/eems/images/yxzt.png" /></td><!-- 运行状态 -->
								</tr>
								<tr>
									<td id="eddyBS" align="center">-</td><!-- 设备型号 -->
									<td id="eddlBS" align="center">-</td><!-- 生产厂家 -->
									<td id="edrlBS" align="center">-</td><!-- 额定容量 -->
									<td id="ggxhBS" align="center">-</td><!-- 额定功率 -->
									<td id="sbmcBS" align="center">-</td><!-- 额定电流 -->
									<td id="sbbhBS" align="center">-</td><!-- 额定电压 -->
									<td id="ztrqBS" align="center">-</td><!-- 投运日期 -->
									<td id="yxztBS" align="center">-</td><!-- 运行状态 -->
								</tr>
							</table>
						</div>
						<div class="local-panel panel-margin-top" style="border-bottom:0;border-left:0">
							<div class="header-block">
								<span>节能建议</span>
							</div>
							<div class="jienengjianyi" style="padding: 15px 10px;font-size: 14px;" >
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

<div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div>
								<div id="dltj" style="height:500px;display:none;"></div>
								<div id="fhqs" style="height:500px;display:none;"></div>
								<div id="glyszs" style="height:500px;display:none;"></div>
								<div id="dftj" style="height:500px;display:none"></div>

<script type="text/javascript">
		var webContextRoot="<%=basePath%>";
		var consId = "<%=consId%>";
		var consName = "<%=consName%>";
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
  <script type="text/javascript" src="sxhxt.js"></script>
  <script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script>
  <script src="<%=pagePath%>/js/templet_common.js"></script>
  
</body>
</html>

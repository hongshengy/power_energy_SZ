<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%
	String baseUrl  = request.getContextPath();
	String pagePath = baseUrl + "/pages/despages/common";
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	UserInfo info = (UserInfo)session.getAttribute("userInfo");	
	String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数
	String shownTree = "";//左侧树布局
	String shownTree1 = "";
	String shownTree2 = "";
	String shownRightStyle = "";//左侧树布局
	String shownOne = "";
	String shownTwo = "";
	String shownThree = "";
	String shownFour = "";
	String qyyhjkPanel = "";
	String contentPanel = "";
	//未获取到企业编码，证明不是客户监控页面调用的，需要加载左侧树进行查询
	if(consId==null || consId.equals("")){//左侧树布局
		
		/* if(top.consId == "" || top.consId == null){
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
		}else{
			shownTree = "";
		} */
		
		//shownTree1 =  "<div id=\"westTree\" data-options=\"region:'west',disabled:true,split:true,border:false\" style=\"width:220px\"></div>";	
		
		
		shownTree1 =  "<div id=\"westTree\" data-options=\"region:'west',disabled:true,split:true,border:false\" style=\"width:220px;\">"
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
				
		shownTree2 = "";		
		
		shownRightStyle=" <div style=\"position: absolute;top: 90px;left:100px;right:10px;bottom: 10px;\">";
		qyyhjkPanel="<div id=\"qyyhjk-panel\" style=\"width: 100%;height: 100%;overflow: auto;\">";
	    contentPanel="<div class=\"content-panel\" style=\"margin-left: 30px;\">";
	    shownOne="<div class=\"col col1\" style=\"width:25%;min-width:172px;position:relative;text-align:center;\">";
		shownTwo="<div class=\"col col2\" style=\"width:25%;min-width:172px;position:relative;text-align:center;\">";
		shownThree="<div class=\"col col3\" style=\"width:25%;min-width:172px;position:relative;text-align:center;\">";
		shownFour="<div class=\"col col4\" style=\"width:25%;min-width:172px;position:relative;text-align:center;\">";
	}else{
	    shownRightStyle=" <div style=\"position: absolute;top: 90px;left:10px;right:10px;bottom: 0px;\">";
	    qyyhjkPanel="<div id=\"qyyhjk-panel\" style=\"width: 100%;height: 100%;overflow: auto;margin-left:-0px;\">";
		contentPanel="<div class=\"content-panel\" style=\"margin-top:0px;margin-left: 0px;\">";
		shownOne="<div class=\"col col1\" style=\"width:25%;min-width:172px;position:relative;text-align:center;\">";
		shownTwo="<div class=\"col col2\" style=\"width:25%;min-width:172px;position:relative;text-align:center;\">";
		shownThree="<div class=\"col col3\" style=\"width:25%;min-width:172px;position:relative;text-align:center;\">";
		shownFour="<div class=\"col col4\" style=\"width:25%;min-width:172px;position:relative;text-align:center;\">";
	}
	
	session.setAttribute("itemCode","comMonitor");
	session.setAttribute("itemName","客户监控");
%> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
<head>
 	<meta charset="UTF-8"/>
    <title>客户监控</title>
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=baseUrl %>/pages/areaEnergy/common/css/tree.css">
    <script src="<%=pagePath%>/js/maskJs.js"></script>
</head>	
<body id="khjk" class="easyui-layout">
	<script>
	    var maskobj = new maskPanelManager();
	    maskobj.register();
	</script>
	<style type="text/css">
	
		.left-tree-panel {
			left: -170px;
			width: 200px;
			height: 100%;
			position: absolute;
			z-index: 99;
			background-color: #FFFFFF;
			border-right: 1px solid #EFEFEF;
		}
		
		.left-tree-panel .title-panel {
			position: absolute;
			width: 186px;
			height: 16px;
			background-color: #EFEFEF;
			padding: 7px;
		}
		
		.left-tree-panel .title-panel .title {
			height: 16px;
			width: 170px;
		}
		
		.left-tree-panel .title-panel .tool {
			position: absolute;
			top: 50%;
			margin-top: -8px;
			right: 6px;
			height: 16px;
			width: 16px;
			cursor: pointer;
		}
		
		.left-tree-panel .tree-panel {
			position: absolute;
			overflow: auto;
			top: 30px;
			bottom: 0px;
			width: 100%;
		}
		
		.left-tree-panel .left-mask {
			width: 30px;
			position: absolute;
			top: 30px;
			bottom: 0px;
			right: 0px;
			background-color: #EFEFEF;
		}
		
		.content-panel {
			margin-left: 30px;
		}
		
		.row1>.col1 {
			width: 33%;
			padding: 10px 10px 0 10px;
		}
		
		.row1>.col2 {
			width: 67%;
			padding-top: 10px;
			padding-right: 10px;
		}
		
		#qiye-table-panel .common-table {
			width: 100%;
			height: 350px;
			min-width: 200px;
			border: 1px solid #EFEFEF;
		}
		
		#qiye-table-panel .common-table th,
		#qiye-table-panel .common-table td {
			border: none;
			padding: 10px;
		}
		
		#qiye-table-panel .common-table tr:first-child th {
			text-align: left;
			background-color: #EFEFEF;
		}
		
		#qiye-table-panel .common-table tr:nth-child(2) th {
			font: 22px "微软雅黑";
			text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.20);
			border-bottom: 1px solid #f0f0f0;
		}
		
		#qiye-table-panel .common-table thead {}
		
		#qiye-table-panel .common-table tbody {}
		
		#qiye-table-panel .common-table tbody td {
			text-align: left;
		}
		
		#qiye-table-panel .common-table tfoot {}
		
		#qiye-table-panel .common-table tfoot td {
			text-align: right;
			padding: 6px;
			border-top: 1px solid #f0f0f0;
		}
		
		.info-block-panel {
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			border: 1px solid transparent;
			height: 100px;
		}
		
		.info-block-panel p {
			margin: 3px 0;
			text-align: left;
		}
		
		.info-block-panel p label {
			color: #fff;
			font-size: 12px;
		}
		
		.info-block-panel p label .value {
			color: #fff;
			font-size: 20px;
		}
		
		#info-panel {}
		
		#info-panel .col>.info-bg {
			position: absolute;
			left: 0px;
			right: 5px;
			top: 0px;
			bottom: 0px;
			z-index: -1;
		}
		
		#info-panel .col .icon-panel {
			display: inline-block;
			vertical-align: middle;
			padding-right: 5px;
		}
		
		#info-panel .col .icon-panel p {
			color: #FFFFFF;
			text-align: center;
			font-size: 12px;
			margin-top: 0px;
		}
		
		#info-panel .col .info-panel {
			display: inline-block;
			vertical-align: middle;
			padding-left: 5px;
		}
		
		#info-panel>.col1 {
			width: 25%;
			min-width: 200px;
			position: relative;
			text-align: center;
		}
		 
		#info-panel>.col2 {
			width: 25%;
			min-width: 200px;
			position: relative;
			text-align: center;
		}
		
		#info-panel>.col3 {
			width: 25%;
			min-width: 200px;
			position: relative;
			text-align: center;
		}
		
		#info-panel>.col4 {
			width: 25%;
			min-width: 193px;
			position: relative;
			text-align: center;
		}
		
		.chart-panel {
			margin-top: 5px;
			box-sizing: border-box;
			border: 1px solid #EFEFEF;
		}
		
		.chart-panel .title {
			height: 16px;
			background-color: #EFEFEF;
			padding: 0px;
			color: #212121;
			font-weight: bold;
		}
		
		.chart-panel #chart1 {
			height: 201px;
		}
		
		.chart-panel #chart11 {
			height: 201px;
		}
		
		.chart-panel #chart12 {
			height: 201px;
		}
		
		.row2>.col1 {
			width: 33%;
			padding: 10px 10px 0 10px;
		}
		
		.row2>.col1 .device-monitor-panel {
			box-sizing: border-box;
			border: 1px solid #EFEFEF;
		}
		
		.row2>.col1 .count-panel {
			margin-top: 10px;
			box-sizing: border-box;
			border: 1px solid #EFEFEF;
			position: relative;
		}
		
		.row2>.col2 {
			width: 67%;
			padding-right: 10px;
			padding-top: 10px;
		}
		
		.row2>.col2 #chart21{
			padding: 10px;
		}
		
		.ydgl-grid-panel{
			padding: 10px;
		}
		.ydgl-grid-panel table {
			width: 100%;
			border-left: 1px solid #efefef;
			border-right: 1px solid #efefef;
		}
		
		.ydgl-grid-panel table th,
		.ydgl-grid-panel table td {
			border: none;
			border-bottom: 1px solid #efefef;
			border-right: 1px solid #efefef;
		}
		
		.ydgl-grid-panel table th {
			padding: 10px 0;
			background-color: #f1f1f1;
		}
		
		.ydgl-grid-panel table th:last-of-type,
		.grid-panel table td:last-of-type {
			border-right: none;
		}
		
		.title {
			height: 16px;
			background-color: #EFEFEF;
			padding: 10px;
			color: #212121;
			font-weight: bold;
		}
		
		.border-bottom{
			border-bottom: 1px solid #EFEFEF;
		}
		.border-right{
			border-right: 1px solid #EFEFEF;
		}
		
		.row3>.col1 {
			width: 100%;
			padding: 10px;
		}
		
		.row3>.col1 .sbjk-panel{
			box-sizing: border-box;
			border: 1px solid #EFEFEF;
		}
		
		#chart6,
		#chart7 {
			height: 250px;
		}
		
		.col3_1,
		.col3_2 {
			width: 50%;
		}
		
		.col3_1 {
			position: relative;
			border-right: 1px dotted #e4e4e4;
		}

		.col3_1 .toolsbar-panel {
			position: absolute;
			top: 10px;
			right: 20px;
			border-bottom: none;
			letter-spacing: 2px;
		}

		.col3_1 .toolsbar-panel .left{
			float: left
		}

		.col3_1 .toolsbar-panel .right{
			float: left;
			margin-left: 10px;
		}

		.col3_1 .toolsbar-panel .right p.num{
			font-size: 16px;
			color: #333;
		}

		.col3_2 {
			position: relative;
		}
		
		.col3_2 .toolsbar-panel {
			position: absolute;
			top: 0;
			right: 0;
			border-bottom: none;
		}
		#qyyhjk-panel .search-panel{
			width: 100%;
			height: 90px;
		}
		
		#qyyhjk-panel .search-panel div{
			padding: 5px 0px 5px 10px;
			float: left;
		}
	   #qyyhjk-panel .form-table {
	        font-size: 12px;
	    }
	    
	    #qyyhjk-panel .form-table .td-label{
	        width: 300px;
	        text-align: left;
	    }
	
	    #qyyhjk-panel .form-table .td-value{
	        width: 300px;
	    }
	
	    #qyyhjk-panel .form-table .td-fillwidth{
	        width: 40px;
	    }
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    #khjk .left-info-panel{
			width: 100%;
			height: 100%;
			padding: 10px 0px 10px 10px;
			box-sizing: border-box;
		}
		#khjk .left-info-panel .title-panel{
			width: 100%;
			height: 50px;
			background: #028A8F;
			line-height: 40px;
			padding: 5px 0px 0px 10px;
			position: relative;
			box-sizing: border-box;
			
			
		}
		
		#khjk .left-info-panel .title-panel .title{
			font-weight: bold; 
			width: 170px;
			font-size: 14px;
			color: #FFFFFF;
			height: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			cursor: pointer;
		}
		
		#khjk .left-info-panel .title-panel .cutover{
			position: absolute;
			top: 20px;
			right: 10px;
		}
		#khjk .left-info-panel .title-panel .cutover img{
			cursor: pointer;
		}
		#khjk .left-info-panel .title-panel .search-button{
            display: inline-block;
            color: #444;
            outline: 1px dashed #7f7f7f;
            outline-offset: -8px;
            border-radius: 0.33em;
            width: 100px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            font-family: "微软雅黑";
            text-shadow: 1px 1px 0 rgba(255,255,255, .8);
        }

        #khjk .left-info-panel .title-panel .search-button:hover{
            box-shadow: 0 3px 5px -3px rgba(0,0,0, .4);
            background: #1dce87;
            color: #fff;
            outline-color: #fff;
            text-shadow: -1px -1px 0 rgba(0,0,0, .2);
        }
        
        #khjk .left-info-panel .info-panel{
        	position: absolute;
        	top: 60px;
        	bottom: 10px;
			left: 10px;
			right: 0px;
			background: #F2F2F2;
			/*border: 1px solid #EFEFEF;*/
			box-sizing: border-box;
		}
		
		#khjk .left-info-panel .info-panel .content{
			width: 100%;
			height: 100%;
			overflow-y: auto;
		}
		#khjk .left-info-panel .info-panel .panel{
			margin-top: 1px;
		}
		#khjk .accordion .panel-header{
			padding-left: 21px;
		}
		#khjk .accordion .panel-icon{
			left: 15px
		}
		#khjk .accordion .accordion-header {
		    background: #DCDCDC;
		}
		#khjk .accordion .accordion-header-selected{
			background: #91E7EC;
		}
		
		#khjk .accordion .accordion-header .panel-title{
			color: #4D4D4D;
		}
		
		#khjk .accordion .accordion-body{
			border: none;
		}
		
		#khjk .left-info-panel .info-panel .content ul{
			padding: 0px;
			margin: 0px;
			
		}
		#khjk .left-info-panel .info-panel .content ul li{
			padding-left: 50px;
			padding-right: 10px;
			height: 30px;line-height: 30px;
			position: relative;
		}
		#khjk .left-info-panel .info-panel .content ul li:hover{
			background-color: #f2f2f2;
			cursor: pointer;
		}
		
		#khjk .left-info-panel .info-panel .content ul .selected{
			color: #028C8C;
			background: #F2F2F2;
		}
		#khjk .left-info-panel .info-panel .content ul .selected:before{
			content: "";
			position: absolute;
			top: 9px;
			left: 40px;
			width: 0;
    		height: 0;
			border-top: 6px solid transparent;
		    border-left: 6px solid #028C8C;
		    border-bottom: 6px solid transparent;
		}
		
		
		#khjk .content-panel{
			width: 100%;
			height: 100%;
			/* padding: 10px 10px 10px 5px; */
			box-sizing: border-box;
		}
        
        #khjk .content-panel .content{
        	width: 100%;
        	height: 100%;
        	background-color: #EFEFEF;
        }
        
        /* 对应iconCls:'icon-save',根据需求自己定义图标并设置,大小16*16*/
         .icon-completed {
		    background: url(<%=pagePath %>/images/completed.png) no-repeat center center;
		} 
	</style>
			
		<%=shownTree1%>
	
		<div class="main-panel noOverflow" data-options="region:'center'"  border="false">
			<%-- <%=contentPanel %> --%>
			
				<div class="row clearfix row1">
					<div id="qiye-table-panel" class="col col1">
						<table class="common-table">
							<colgroup>
								<col>
								<col style="width: 80px">
								<col>
							</colgroup>
							<thead>
								<tr>
									<th colspan="3">
										基本信息
									</th>
								</tr>
								<tr>
									<th colspan="3" id="company">&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td rowspan="7">
										<img src="<%=pagePath%>/images/cons_monitor.jpg" width="100%" height="230" />
									</td>
									<td>客户编号：</td>
									<td id="consNo">&nbsp;</td>
								</tr>
								<tr>
									<td>客户地址：</td>
									<td id="elecAddr">&nbsp;</td>
								</tr>
								<tr>
									<td>电压等级：</td>
									<td id="dydj">&nbsp;</td>
								</tr>
								<tr>
									<td>合同容量：</td>
									<td id="htrl">&nbsp;</td>
								</tr>
								<tr>
									<td>联系人：</td>
									<td id="lxr">&nbsp;</td>
								</tr>
								<tr>
									<td>联系电话：</td>
									<td id="lxdh">&nbsp;</td>
								</tr>
								<tr>
									<td>客户状态：</td>
									<td id="yhzt">&nbsp;</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td colspan="3">
										<a id="bt_exportxlnh" class="easyui-linkbutton c100" style="margin-right: 4px;"><span id="is101Change">用能日报</span></a>
										<a id="bt_exportynbg" class="easyui-linkbutton c100" style="margin-right: 4px;">用能报告</a>
										<div style="display:none">
											<div id="gridDiv" style="display:none" class="easyui-datagrid" data-options="striped:true,border:false,singleSelect:true,url:'',method:'get'"></div>
											<div id="dltj" style="height:500px;display:none;"></div>
											<div id="fhqs" style="height:500px;display:none;"></div>
											<div id="glyszs" style="height:500px;display:none;"></div>
											<div id="dftj" style="height:500px;display:none"></div>
										</div>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
					
					<div class="col col2">
						<div id="info-panel" class="row clearfix">
		
							<%=shownOne %>
								<div class="info-bg">
									<img src="<%=pagePath%>/images/0413-13.png" width="100%" height="100%" border="0" />
								</div>
								<div style="display: inline-block;">
									<div class="info-block-panel icon-panel">
										<div style="margin-top: 15px;">
											<img src="<%=pagePath%>/images/ydfh.png" border="0" style="margin: 0px 0px;" />
											<p>用电负荷</p>
											<p>kW</p>
										</div>
									</div>
									<div class="info-block-panel info-panel" style="padding-top: 15px;">
										<p><label><span class="value" id="realTimeFhCons"></span><span class="value"></span></label></p>
										<p><label>最大负荷:&nbsp;<span id="maxFh"></span></label></p>
										<p><label>发生时间:&nbsp;<span id="maxFhTime"></span></label></p>
									</div>
								</div>
							</div>
							
							<%=shownTwo %>
								<div class="info-bg">
									<img src="<%=pagePath%>/images/0413-14.png" width="100%" height="100%" border="0" />
								</div>
								<div style="display: inline-block;">
									<div class="info-block-panel icon-panel">
										<div style="margin-top: 10px;">
											<img src="<%=pagePath%>/images/ydl.png" border="0" style="margin: 0px 0px;" />
											<p>用电量</p>
											<p>kWh</p>
										</div>
									</div>
									<div class="info-block-panel info-panel" style="padding-top: 15px;">
										<p><label>当日:<span class="value" id="toDay"></span></label></p>
										<p><label>昨日:<span class="value" id="yesterDay"></span></label></p>
									</div>
								</div>
							</div>

							<%=shownThree %>
								<div class="info-bg">
									<img src="<%=pagePath%>/images/0413-14.png" width="100%" height="100%" border="0" />
								</div>
								<div style="display: inline-block;">
									<div class="info-block-panel icon-panel">
										<div style="margin-top: 10px;">
											<img src="<%=pagePath%>/images/yxcs.png" border="0" style="margin: 0px 0px;" />
											<p>越限次数</p>
										</div>
									</div>
									<div class="info-block-panel info-panel" style="padding-top: 15px;">
										<p><label>本月：<span class="value" id="thisMonths"></span></label></p>
										<p><label>上月：<span class="value" id="upMonths"></span></label></p>
									</div>
								</div>
							</div>

							<%=shownFour %>
								<div class="info-bg" style="right: 0px;">
									<img src="<%=pagePath%>/images/0413-15.png" width="100%" height="100%" border="0" />
								</div>
								<div style="display: inline-block;">
									<div class="info-block-panel icon-panel">
										<div style="margin-top: 15px;">
											<img src="<%=pagePath%>/images/ywjk.png" border="0" style="margin: 0px 0px;" />
											<p>运维监控</p>
											<p>(天)</p>
										</div>
									</div>
									<div class="info-block-panel info-panel" style="padding-top: 15px;">
										<p><label>安全用电：<span class="value" id="safety"></span></label></p>
										<p><label>用电异常：<span class="value" id="elecException">0起</span></label></p>
									</div>
								</div>
							</div>
						</div>
						
						<div class="chart-panel">
							<div class="easyui-tabs" data-options="border:false,onResize:autoResize" style="width:100%;overflow-x:hidden;" id="upTabs">
								<div title="实时负荷" style="width:100%;overflow-x:hidden;"  >
									<div class="toolsbar-panel" style="width:100%;" >
										<div class="tbRow">
						    				<a onclick="realTimeLoad('-1')" href="javascript:void(0);" class=""
						    				style="vertical-align: middle; margin-right:-10px;" 
						    				 plain>
						    				 <img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;cursor: auto;">
						    				 </a>
											<span class="tools-labelgroup">
						                        <input class="date-input" id="dateFhqx" style="width: 100px;">
						                    </span>
						                   <a onclick="realTimeLoad('1')" href="javascript:void(0);" class=""
						    				style="vertical-align: middle; " 
						    				 plain>
						    				 <img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;cursor: auto;">
						    				 </a>
										   <span class="tools-labelgroup">
						                       <input id="selectFhqx">
						                   </span>
										   <span class="tools-labelgroup">
						                       <a id="0" class="easyui-linkbutton c100" onclick="getUpButton(this)">查询</a>
						                   </span>
										</div>
									</div>
									<div class="chart" id="chart1"></div>
								</div>
								<div title="实时电量" style="width:100%;overflow-x:hidden;" >
									<div class="toolsbar-panel" style="width:100%;" >
										<div class="tbRow">
											<a onclick="realTimeElec('-1')" href="javascript:void(0);" class=""
						    				style="vertical-align: middle; margin-right:-10px;"
						    				 plain>
						    				 <img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;cursor: auto;">
						    				 </a>
											<span class="tools-labelgroup">
						                        <input class="date-input" id="findRealTime" style="width: 120px;">
						                    </span>
						                   <a onclick="realTimeElec('1')" href="javascript:void(0);" class=""
						    				style="vertical-align: middle;" 
						    				 plain>
						    				 <img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;cursor: auto;">
						    				 </a>
											<span class="tools-labelgroup">
						                        <a id="1" class="easyui-linkbutton c100" onclick="getUpButton(this)">查询</a>
						                    </span>
										</div>
									</div>
									<div class="chart" id="chart11"></div>
								</div>
								<%-- <div title="用电排名TOP10" style="display:none;">
									<div class="toolsbar-panel">
										<div class="tbRow">
											<a onclick="top10Date('-1')" id="button_query" href="javascript:void(0);" class=""
						    				style="vertical-align: middle; margin-right:-10px;"
						    				 plain>
						    				 <img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;cursor: auto;">
						    				</a>
											<span class="tools-labelgroup">
						                        <input class="date-input" id="top10Date" style="width: 120px;">
						                    </span>
						                    <a onclick="top10Date('1')" id="button_query" href="javascript:void(0);" class=""
						    				style="vertical-align: middle;"  
						    				 >
						    				 <img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;cursor: auto;">
						    				 </a>
											<span class="tools-labelgroup">
						                        <a id="2" class="easyui-linkbutton c100" onclick="getUpButton(this)">查询</a>
						                    </span>
										</div>
									</div>
									<div id="chart12"></div>
								</div> --%>
							</div>
						</div>
					</div>
				</div>
						
				<div class="row clearfix row2">
					<div class="col col1">
						<div class="device-monitor-panel" style="height:270px">
							<div class="title">设备监控</div>
							<div id="sbjk_subs">
								<table style="width: 100%;padding: 10px;">
									<colgroup>
										<col style="width: 80px;">
										<col >
										<col style="width: 120px">
									</colgroup>
									<tbody>
										<tr id="sbjk_subs1_tr1">
											<td style="line-height:20px">用户变名称:</td>
											<td style="line-height:20px;">
											<span id="subs_name1" style="vertical-align: middle;"></span>&nbsp;
												<img src="<%=pagePath%>/images/video.png" border="0" style="cursor: pointer;vertical-align: middle;" class="jumpVideo" onClick="jumpToVideo(1);" />
												&nbsp;
												<a  href="javascript:void(0);" class="easyui-linkbutton c100" onclick="jumpToYct(1);">一次图</a></td>
											<td rowspan="3" class="border-bottom">
												<div id="jk_chart1" style="width: 100px;height: 100px;margin: 0 auto;"></div>
											</td>
										</tr>
										<tr id="sbjk_subs1_tr2">
											<td>实时负荷:</td>
											<td id="subs_real_time_fh1"></td>
										</tr>
										<tr id="sbjk_subs1_tr3">
											<td class="border-bottom">实时告警:</td>
											<td class="border-bottom" id="subs_warning1"></td>
										</tr>
										<tr id="sbjk_subs2_tr1">
											<td  style="line-height:20px">用户变名称:</td>
											<td style="line-height:20px">
												<span id="subs_name2" style="vertical-align: middle;"></span>&nbsp;
												<img src="<%=pagePath%>/images/video.png" border="0" style="cursor: pointer;vertical-align: middle;" class="jumpVideo" onClick="jumpToVideo(2);" />
												&nbsp;
												<a  href="javascript:void(0);" class="easyui-linkbutton c100"  onclick="jumpToYct(2);">一次图</a>
											</td>
											<td rowspan="3">
												<div id="jk_chart2" style="width: 100px;height: 100px;margin: 0 auto;"></div>
											</td>
										</tr>
										<tr id="sbjk_subs2_tr2">
											<td>实时负荷:</td>
											<td id="subs_real_time_fh2"></td>
										</tr>
										<tr id="sbjk_subs2_tr3">
											<td>实时告警:</td>
											<td id="subs_warning2"></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="count-panel">
							<div class="title">
								用能统计
							</div>
							
							<!-- <div style="position: absolute;right: 5px;top: 7px;">
									<input id="useEnergyDate">
								</div> -->
							
							<div style="position: absolute;right: 5px;top: 7px;">
		    					<table>
								  	<tr>
								  		<td>
								  			<a onclick="queryDateTime('-1')" id="button_query" href="javascript:void(0);" >
												<img alt="前一天" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" 
												style="border-style:none;cursor: auto;margin-right: -3px;">
										    </a>
								  		</td>
								  		<td>
								  			<input id="useEnergyDate" class="Wdate" type="text" style="width: 100px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM'})"/>		
								  		</td>
								  		<td>
								  			<a onclick="queryDateTime('1')" id="button_query" href="javascript:void(0);" >
						    				 	<img alt="后一天" src="<%=request.getContextPath() %>/images/tools-moveright.gif" 
						    				 	style="border-style:none;cursor: auto;margin-left: -3px;">
						    				 </a>
								  		</td>
								  	</tr> 
								</table>
							</div>
						<div>
								<table style="width: 100%; height:254px;border-collapse: collapse;text-align: center;table-layout: fixed;" border="0">
									<colgroup>
										<col style="width: 70px;" />
										<col style="width: 60px;" />
										<col />
										<col style="width: 70px;" />
										<col style="width: 60px;" />
										<col />
									</colgroup>
									<tbody>
										<tr>
											<td rowspan="3" class="border-bottom">
												<img src="<%=pagePath%>/images/dn_icon.png" border="0" />
												<p>电</p>
												<p>(kWh)</p>
											</td>
											<td>同比:</td>
											<td class="border-right" id="elecTb">-</td>
											<td rowspan="3" class="border-bottom">
												<img src="<%=pagePath%>/images/sn_icon.png" border="0" />
												<p>水</p>
												<p>(t)</p>
											</td>
											<td>同比:</td>
											<td class="border-right" id="waterTb">-</td>
										</tr>
										<tr>
											<td>环比:</td>
											<td class="border-right" id="elecHb">-</td>
											<td>环比:</td>
											<td class="border-right" id="waterHb">-</td>
										</tr>
										<tr>
											<td class="border-bottom">总量:</td>
											<td class="border-bottom border-right" id="elecEnergy">-</td>
											<td class="border-bottom">总量:</td>
											<td class="border-bottom border-right" id="water">-</td>
										</tr>
										<tr>
											<td rowspan="3">
												<img src="<%=pagePath%>/images/qn_icon.png" border="0" />
												<p>气</p>
												<p>(m³)</p>
											</td>
											<td>同比:</td>
											<td class="border-right">-</td>
											<td rowspan="3">
												<img src="<%=pagePath%>/images/rn_icon.png" border="0" />
												<p>热</p>
												<p>(kJ)</p>
											</td>
											<td>同比:</td>
											<td>-</td>
										</tr>
										<tr>
											<td>环比:</td>
											<td class="border-right">-</td>
											<td>环比:</td>
											<td>-</td>
										</tr>
										<tr>
											<td>总量:</td>
											<td class="border-right">-</td>
											<td>总量:</td>
											<td>-</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>		
					<div class="col col2">
						<div style="box-sizing: border-box;border: 1px solid #EFEFEF;">
							<div class="easyui-tabs" data-options="border:false,onResize:autoResize" style="width:100%;overflow-x:hidden;" id="downTabs">
								<div title="用电概览" style="display:none;width:100%;overflow-x:hidden;">
									<div class="toolsbar-panel float-panel" style="width:100%;" >
									<div class="tbRow">
						                 <a onclick="gaiLanRightDate()" href="javascript:void(0);" style="vertical-align: middle;margin-right:-10px;">
					    				 <img alt="前一月" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;cursor: auto;">
					    				 </a>
						                <span class="tools-labelgroup">
										  	 <input id="startMonthDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy-MM',isShowClear:false,readOnly:true})"/>
										  	 <input id="startYearDate" class="Wdate" type="text" style="width: 100px;text-align: left;" onClick="WdatePicker({dateFmt:'yyyy',isShowClear:false,readOnly:true})"/>
										 </span>
						                <a onclick="gaiLanLeftDate()" href="javascript:void(0);" style="vertical-align: middle;"> 
					    				 <img alt="后一月" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;cursor: auto;">
					    				 </a>
										<span class="tools-labelgroup">
						                    <select class="easyui-combobox" id="selectType"  data-options="prompt:'请选择',panelHeight:'auto',panelWidth:155,editable:false,width:155"></select>
						                </span>
										<span class="tools-labelgroup">
						                    <a id="3" class="easyui-linkbutton c100" onclick="getUpButton(this)">查询</a>
						                </span>
									</div>
									</div>
									<div id="chart21">
										<div class="tbRow" style="text-align: right;">
											<span class="tools-labelgroup">
												<a onclick="checkRadio(1)" href="javascript:void(0);" style="vertical-align: middle;"> 
						                        	<img class="tb-group-label" src="<%=pagePath%>/images/yhjk-04242.png" border="0" style="margin: 0px 4px;" />
						                    	</a>
						                    </span>
											<span class="tools-labelgroup">
												<a onclick="checkRadio(2)" href="javascript:void(0);" style="vertical-align: middle;"> 
						                        	<img class="tb-group-label" src="<%=pagePath%>/images/yhjk-04241.png" border="0" style="margin: 0px 4px;" />
						                    	</a>
						                    </span>
										</div>
										<div id="ydgl-chart" style="height: 290px;"></div>
									</div>
									<div id="fgdlbg" style="width: 100%;height: 161px;margin-top: 0px;">
										<div id="fgdlData" style="height:100%;"></div>
									</div>
								</div>
								<div title="功率因数" style="width:100%;overflow-x:hidden;">
									<div class="toolsbar-panel" style="width:100%;">
										<div class="tbRow">
											<a onclick="updateMonth('-1');" id="button_query" href="javascript:void(0);" class="" 
											style="vertical-align: middle;margin-right:-10px; "   plain>
						    					<img alt="前一月" src="<%=request.getContextPath() %>/images/tools-moveleft.gif" style="border-style:none;cursor: auto;">
						    				</a>
											<span class="tools-labelgroup">
						                        <input class="date-input" id="findMonth" style="width: 100px;">
						                    </span>
						                    <a onclick="updateMonth('1');" id="button_query" href="javascript:void(0);" class="" 
											style="vertical-align: middle;"   plain>
						    					<img alt="后一月" src="<%=request.getContextPath() %>/images/tools-moveright.gif" style="border-style:none;cursor: auto;">
						    				</a>
											<span class="tools-labelgroup">
						                        <a id="4" class="easyui-linkbutton c100" onclick="getUpButton(this)">查询</a>
						                    </span>
										</div>
									</div>
									<div id="ssdl-chart" style="height: 400px;">
									</div>
									<div class="ssdl-info-panel">
										<div class="title">功率因数分析</div>
										<div style="height: 80px;" id="glysValue">
										
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix row3">
					<div class="col col1">
						<div class="sbjk-panel">
							<div class="title">接入工况</div>
								<div class="col col3_1">
									<div id="chart6"></div>
								</div>
								<div class="col col3_2">
									<div id="chart7"></div>
								</div>
						 </div>
					</div>
				</div>
			</div>
		</div>
	
	<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
	<script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
	<script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>

	<script type="text/javascript">
		/**
		 * 客户角色登录显示树 显示kongvba
		 */
		if(top.isCustomer){
			// 显示树 页面空白
			if(top.consId == "" || top.consId == null){
				
			}else{
				// 客户角色登录 只有一个客户
				isCustomer = true;
				$("#westTree").remove();
			}
				
		}
		
		var webContextRoot="<%=basePath%>";
		var jsPath = "<%=pagePath%>"; 
	    var userId = '<%=((UserInfo)session.getAttribute("userInfo")).getUserId()%>';
	    consId = "<%=consId%>";
		consName = "<%=consName%>";
		var funcId = "<%=funcId%>";
		
	</script>
	<script type="text/javascript" src="<%=pagePath %>/js/jdialog.min.js"></script>
	<script src="<%=pagePath %>/js/common.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
	<script type="text/javascript" src="<%=pagePath %>/echarts/echarts.min.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/echarts/echartsGlobal.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/exportynbg.js"></script>
	<script src="<%=pagePath%>/js/templet_common.js"></script>
	<script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
	<script type="text/javascript" src="<%=baseUrl%>/pages/despages/monitor/comMonitor.js"></script>
</body>
</html>

<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%

String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";
	session.setAttribute("itemCode","desproductLine");
    session.setAttribute("itemName","用能单元管理");
    
	String devId = request.getParameter("devId");
	String userTranId= request.getParameter("userTranId");
	String deviceType = request.getParameter("deviceType");
	
	String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
String consName = request.getParameter("consName");//获取调用父页面传过来的参数
String funcId = request.getParameter("funcId");//获取调用父页面传过来的参数

//consId="101000004001";
//consName="立霸实业有限公司";
String shownTree = "";//左侧树布局
String shownRightStyle = "";//左侧树布局
//未获取到企业编码，证明不是客户监控页面调用的，需要加载左侧树进行查询
/* 	if(consId==null || consId.equals("")){//左侧树布局
		shownTree = "<div id=\"westTree\" data-options=\"region:'west',split:true,title:'导航',border:false\" style=\"width:200px;\">"
		+"  <div style=\"padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2\">"
		+"     <input class=\"easyui-textbox\" style=\"width: 100%;\" data-options=\"iconCls:'icon-search'\">"
		+"     </div>"
		+"     <ul  id=\"tree-leftQyTree\" class=\"easyui-tree\" style=\"width:100%;\"  >"
		+"     </ul>"
		+"      </div> ";  
		shownRightStyle=" <div style=\"width:100%;height:85%;\">";
	}else{
	    shownRightStyle=" <div style=\"width:100%;height:85%;\">";
	} */
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
		shownRightStyle=" <div style=\"position: absolute;top: 60px;left:10px;right:10px;bottom: 10px;\">";
	}else{
	    shownRightStyle=" <div style=\"position: absolute;top: 60px;left:0px;right:0px;bottom: 0px;\">";	    
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
    <title>用能单元管理</title>
     <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body class="easyui-layout" >
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
		<style>
		#gjxxpz-panel .search-panel{
			background-color: #EFEFEF;
		}
		#gjxxpz-panel .grid-panel{
			background-color: #EFEFEF;
		}
		
		#gjxxpz-panel .form-table {
	        font-size: 12px;
	        border-spacing:0px;
	    }
	    
	    #gjxxpz-panel .form-table .td-label{
	        width: 80px;
	        text-align: center;
	    }
	
	    #gjxxpz-panel .form-table .td-value{
	        width: 160px;
	    }
	
	    #gjxxpz-panel .form-table .td-fillwidth{
	        width: 40px;
	    }
	</style>
	
	
	<%=shownTree%>
       <div class="main-panel noOverflow" data-options="region:'center',border:false" >
       	<div id ="contentId" class="content" style="width: 100%;height: 100%;position:absolute;"></div>
       	<div id="clickTree" class="easyui-panel main-panel noOverflow" style="position: relative;width: 100%;height: 100%;" data-options="border:false">
       
			<div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;height:100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
				 <div id="btThrees">
					<a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-add',width:80,onClick:add">新增</a>                        
				   <a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-edit',width:80,onClick:updateGjpz">修改</a>
					<a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove',width:80,onClick:deleteGjpz">删除</a>
		         </div> 
		       <div id="gjxxpz-datagrid" title="用能单元管理"></div>
			</div>
    	 </div>
    	 </div>
	
	
	
	
		<%-- <div id="gjxxpz-panel" class="easyui-layout" style="width: 100%;height: 100%;margin-top: 1px;">
			<!-- <div data-options="region:'west',split:true,title:'导航',border:false" style="width:200px;">
		        <div style="padding: 3px; border-bottom: 1px solid #e7e7e7; background-color: #f2f2f2">
		            <input class="easyui-textbox" style="width: 100%;" data-options="iconCls:'icon-search'">
		        </div>
		        <ul  id="tree-leftQyTree" class="easyui-tree" style="width:100%;"  >
		        </ul>
		    </div>  -->
		    <%=shownTree%>
		     <div data-options="region:'center',border:false" style="position: relative;width: 100%;">
                <div class="easyui-panel" style="width:100%;height:98%;" data-options="cls:'fangtian-panel-style'">
	                  <!-- <div class="toolsbar-panel" >
			                <div class="tbRow">
			                        <span class="tools-labelgroup">
			                            <label class="tb-group-label">客户名称:</label>
			                            <input class="easyui-textbox" style="width:150px" id="consName" > 
			                        </span>
			                        <span class="tools-labelgroup">
			                            <a id="btn" href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:selectConsName">查询</a>
			                        </span>
			                  </div>
	                  </div> -->
        		
	                  	
		             
		              <%=shownRightStyle%>
		              <div style="width:100%;height:98%;">
		            		<div id="btThrees" align="right" style="margin-right:20px">
									<a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-add',width:80,onClick:add">添加</a>                        
								   <a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-edit',width:80,onClick:updateGjpz">修改</a>
									<a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove',width:80,onClick:deleteGjpz">删除</a>
							</div>
							<table id="gjxxpz-datagrid" title="用能单元管理"></table>
					  </div>
                </div>
                </div> --%>
 
            <div id="gjxxpz-cl-panel" class="easyui-dialog" style="width:620px;height:300px;"
				data-options="title:'用能单元',buttons:'#gjxxpz-cl-btn',modal:true,closed:true">
				<table class="form-table" style="box-sizing: border-box;width: 100%">
					<colgroup>
						<col style="width: 100px;">
						<col style="width: 50%">
						<col style="width: 80px;">
						<col style="width: 50%;">
					</colgroup>
					<tr>
						<td class="td-label">用能单元名称:</td>
						<td>
							<input id="scxName"  data-options="required:true,validType:'length[0,16]'" class="easyui-textbox" style="width:90%" >
						</td>
						<!-- <td class="td-label">客户名称:</td>
						<td>
							<select class="easyui-combobox" id="userTree" data-options="width:'100%',panelHeight:'auto',editable:false"></select>
						</td> -->
						<td class="td-label">设备名称:</td>
						<td>
						<select id="usershebeiTree" class="easyui-combotree" data-options="required:true,width:'90%'"></select>
						</td>
					</tr>
					 <tr>
						<td class="td-label">用能单元类型:</td>
						<td>
						<select class="easyui-combobox" id="typeyndy" style="width:90%" data-options="required:true,panelHeight:'auto'"> </select>
						</td>
						<td class="td-label">运行状态:</td>
						<td>
						<select class="easyui-combobox" id="statusyndy" style="width:90%" data-options="required:true,panelHeight:'auto'"> </select>
						</td>
					</tr> 
					<tr>
						<td class="td-label" style="vertical-align: top;">备注:</td> 
						<td colspan="3"><input id="bzName" class="easyui-textbox" name="message"  data-options="multiline:true,validType:'length[0,60]'" style="width:96%;height:130px;"></input></td>
					</tr>
				</table>
			</div>
            <div id="gjxxpz-cl-btn" style="text-align: center;height:32px;margin-bottom:10px">
				<a href="#" class="easyui-linkbutton c100" data-options="onClick:cxSave">保存</a>  
            	<a href="#" class="easyui-linkbutton c100" data-options="onClick:cxClose">取消</a> 
			</div>
		<!-- </div> -->
		
		<script type="text/javascript">
				webContextRoot="<%=basePath%>";
		         var devId = '<%=devId%>';
		         var userTranId ='<%=userTranId%>';
		         var deviceType = '<%=deviceType%>';
		         consId = "<%=consId%>";
		       consName = "<%=consName%>";
		       funcId = "<%=funcId%>";
		</script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		 <script src="<%=pagePath %>/js/common.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/treeSelect.js"></script> 
		 <script type="text/javascript" src="<%=pagePath%>/pinyinjs-master/pinyin_dict_firstletter.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/pinyinjs-master/pinyinUtil.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/consSelect2.js"></script>
		 <%-- <script type="text/javascript" src="<%=pagePath%>/js/consSelect.js"></script> --%>
		 <script type="text/javascript" src="productLine.js"></script>
		 
	</body>
</html>

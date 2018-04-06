<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="com.frontier.framework.model.UserInfo"%>
<%
String baseUrl  = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
String pagePath = baseUrl + "/pages/despages/common";	
String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	/**
session.setAttribute("itemCode","despower");
session.setAttribute("itemName","响应指标");
UserInfo info = (UserInfo) session.getAttribute("userInfo");**/

Date d = new Date();
SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
String day = fmt.format(d);
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
    <title>响应指标</title>
     <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
    <link rel="stylesheet" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/templet_common.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
</head>
  
<body  class="easyui-layout" >
		<script>
		    var maskobj = new maskPanelManager();
		    maskobj.register();
		</script>
	 
	   <div class="main-panel noOverflow" data-options="region:'center',border:false" >
                <div id="divSearch" class="easyui-panel" style="width: 100%;position: relative;" title="查询条件" data-options="cls:'fangtian-panel-style',onResize:autoResize">
                	<ul class="s-ul-one" >
						<li>
						    <span>响应年份:</span>
			                <span class="tools-labelgroup" >
                  				 <a id="top_query" href="javascript:qytQueryOveride('-1');" style="border-style:none;">
	                       		  <img style="border-style:none;vertical-align: middle" height="14px" width="14px"  alt="前一年" src="<%=request.getContextPath() %>/images/tools-moveleft.gif"></a>
                 			</span> 
	                        <span class="tools-labelgroup" >
	                             <!-- <input id="dataDate" class="Wdate" type="text" style="width: 100px;text-align: left;"  onClick="WdatePicker({dateFmt:'yyyy',onpicked:changeDate,isShowClear:false,readOnly:true})"/> -->
	                             <input id="dataDate" class="Wdate" type="text" style="width: 100px;text-align: left;" readonly="readonly"  onClick="WdatePicker({dateFmt:'yyyy'})"/>
							</span>
							<span class="tools-labelgroup">
								<a id="bottom_query" href="javascript:qytQueryOveride('1');" style="border-style:none;">
								<img style="border-style:none;vertical-align: middle" height="14px" width="14px" alt="后一年" src="<%=request.getContextPath() %>/images/tools-moveright.gif"></a>
							</span>
						</li>
                		<li class="s-right-one">
                			<span style="vertical-align: bottom;"><a id="search" href="#" class="easyui-linkbutton c100" data-options="width:80">查询</a></span>
<!--                 			<span style="vertical-align: bottom;"><a id="d" href="#" class="easyui-linkbutton c100" data-options="onClick:zbfjPanel" >指标分解</a></span> -->
<!--                 			<span style="vertical-align: bottom;"><a id="e" href="#" class="easyui-linkbutton c100" data-options="onClick:zbxd" >指标下发</a></span> -->
                		</li>
					</ul> 
           </div> 
           
		    <div id="c-panel" class="auto-resize easyui-panel" style="width: 100%;" data-options="cls:'fangtian-panel-style bottom-padding'">
				 <div id="btThrees">
<!-- 					<a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-add',width:80,onClick:addData">添加</a>                         -->
<!-- 				   <a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-edit',width:80,onClick:updData">修改</a> -->
<!-- 					<a href="#" class="easyui-linkbutton" plain="true" data-options="iconCls:'icon-remove',width:80,onClick:delData">删除</a> -->
		         </div> 
		       <div id="dataGrid" title="指标管理"></div>
			</div>   
    	</div> 
	 
        <div id="gjxxpz-cl-panel" class="easyui-dialog" style="width:700px;height:430px;" data-options="title:'指标管理',buttons:'#gjxxpz-cl-btn',modal:true,closed:true,onClose:qingkong">
				<table class="form-table" style="box-sizing: border-box;width: 100%">
					<colgroup>
						<col style="width: 120px;">
						<col style="width: 50%">
						<col style="width: 120px;">
						<col style="width: 50%;">
					</colgroup>
					<tr>
						<td class="td-label" style="padding-left: 10px;">响应来源:</td>
						<td>
							<input id="respSource" class="easyui-textbox" style="width:100%" data-options="validType:['length[0,32]','isBlank']" required="required">
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">响应日期:</td>
						<td>
							<input id="resDate"  class="easyui-datebox" style="width:100%" data-options="editable:false" required="required"/>
							<!-- <input id="resDate" class="Wdate" type="text" style="width: 100px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /> -->
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段1:</td>
						<td>
							<input id="startOne" class="Wdate"  style="width:41%;text-align: left; float: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'HH:mm'})"/>
							<span style="float: left;">&nbsp;~&nbsp;</span>
							<input id="endOne" class="Wdate"  style="width:40%;text-align: left; float: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'HH:mm'})"/>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<input id="respOneNum" class="easyui-numberbox" style="width:100%" data-options="min:0,max:99999999.99,precision:2">
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段2:</td>
						<td>
							<input id="startTwo" class="Wdate"  style="width:41%;text-align: left;float: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'HH:mm'})"/>
							<span style="float: left;">&nbsp;~&nbsp;</span>
							<input id="endTwo" class="Wdate"  style="width:40%;text-align: left;float: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'HH:mm'})"/>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<input id="respTwoNum" class="easyui-numberbox" style="width:100%" data-options="min:0,max:99999999.99,precision:2">
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段3:</td>
						<td>
							<input id="startThree" class="Wdate"  style="width:41%;text-align: left;float: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'HH:mm'})"/>
							<span style="float: left;">&nbsp;~&nbsp;</span>
							<input id="endThree" class="Wdate"  style="width:40%;text-align: left;float: left;" readonly="readonly" onClick="WdatePicker({dateFmt:'HH:mm'})"/>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<input id="respThreeNum" class="easyui-numberbox" style="width:100%" data-options="min:0,max:99999999.99,precision:2">
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">响应类型:</td>
						<td>
							<input type="radio" value="0" name="respType" checked="checked" >约定响应
							<input type="radio" value="1" name="respType" >实时响应 
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">响应策略:</td>
						<td>
							<input type="radio" value="0" name="respTactic" checked="checked" >调峰策略
							<input type="radio" value="1" name="respTactic" >降负荷策略
						</td>
					</tr>
					
					<tr>
						<td class="td-label" style="vertical-align: top;padding-left: 10px;">备注:</td> 
						<td colspan="3"><input id="memo" class="easyui-textbox" name="message" data-options="multiline:true,validType:'length[0,64]'" style="width:100%;height:100px;"></input></td>
					</tr>
				</table>
			</div>
            <div id="gjxxpz-cl-btn" style="text-align: center;height:32px;">
            	<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxSave">保存</a>  
            	<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxClose">取消</a> 
			</div>
		 
		 	<div id="zbfj-panel" class="easyui-dialog" style="width:850px;height:500px;" data-options="title:'指标分解',buttons:'#zbfj-cl-btn',modal:true,closed:true" >
				<table class="form-table" style="box-sizing: border-box;width: 100%;height: 25%;">
					<tr>
						<td class="td-label" style="padding-left: 10px;">响应来源:</td>
						<td colspan="7">
							<label id="lab_xyly" class="tb-group-label"></label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">响应日期:</td>
						<td colspan="7">
							<label id="lab_xyrq"  class="tb-group-label"></label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段1:</td>
						<td>
							<label id="lab_yysd_one"  class="tb-group-label"></label>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<label id="lab_xyl_one"  class="tb-group-label"></label>
						</td>
						<td class="td-label">待分配量:</td>
						<td>
							<label id="lab_dbfpl_one"  class="tb-group-label">0.0</label>
						</td>
						<td class="td-label">邀约户数:</td>
						<td>
							<label id="lab_yyhs_one"  class="tb-group-label">0.0</label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段2:</td>
						<td>
							<label id="lab_yysd_two"  class="tb-group-label"></label>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<label id="lab_xyl_two"  class="tb-group-label"></label>
						</td>
						<td class="td-label">待分配量:</td>
						<td>
							<label id="lab_dbfpl_two"  class="tb-group-label">0.0</label>
						</td>
						<td class="td-label">邀约户数:</td>
						<td>
							<label id="lab_yyhs_two"  class="tb-group-label">0.0</label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段3:</td>
						<td>
							<label id="lab_yysd_three"  class="tb-group-label"></label>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<label id="lab_xyl_three"  class="tb-group-label"></label>
						</td>
						<td class="td-label">待分配量:</td>
						<td>
							<label id="lab_dbfpl_three"  class="tb-group-label">0.0</label>
						</td>
						<td class="td-label">邀约户数:</td>
						<td>
							<label id="lab_yyhs_three"  class="tb-group-label">0.0</label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">备注:</td>
						<td colspan="7">
							<label id="lab_bz" class="tb-group-label"></label>
						</td>
					</tr>
				</table>
				<div class="easyui-panel" style="width: 100%;height: 60%; overflow: hidden;min-height: 260px;">
						<div class="toolsbar-panel">
	           				<div class="tbRow">
								<span class="tools-labelgroup">
									<input id="consName" class="easyui-textbox" data-options="prompt:'客户名称模糊'">
								 	<a id="queryDetail" href="#" class="easyui-linkbutton c9 shadow" style="width: 80px;height: 24px;">查询</a>
								</span>
	                  		</div>
						</div>
						<div style="width:100%;height:85%;">
							<div id="dataGridDetail" style="height:100%;width:100%;border: 1px;"></div>
	        		</div>
	    		</div>
			</div>
			<div id="zbfj-cl-btn" style="text-align: center; display: block;height: 30px;">
				<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxDetailSave">保存</a>  
            	<a href="#" class="easyui-linkbutton c9 shadow" data-options="width:80,onClick:cxDetailClose">取消</a> 
			</div>
			
			<div id="show-panel" class="easyui-dialog" style="width:850px;height:500px;" data-options="title:'指标详情',modal:true,closed:true">
				<table class="form-table" style="box-sizing: border-box;width: 100%;height: 25%;">
					<tr>
						<td class="td-label" style="padding-left: 10px;">响应来源:</td>
						<td colspan="7">
							<label id="lab_s_xyly" class="tb-group-label"></label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">响应日期:</td>
						<td colspan="7">
							<label id="lab_s_xyrq"  class="tb-group-label"></label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段1:</td>
						<td>
							<label id="lab_s_yysd_one"  class="tb-group-label"></label>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<label id="lab_s_xyl_one"  class="tb-group-label"></label>
						</td>
						<td class="td-label">待分配量:</td>
						<td>
							<label id="lab_s_dbfpl_one"  class="tb-group-label">0.0</label>
						</td>
						<td class="td-label">邀约户数:</td>
						<td>
							<label id="lab_s_yyhs_one"  class="tb-group-label">0.0</label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段2:</td>
						<td>
							<label id="lab_s_yysd_two"  class="tb-group-label"></label>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<label id="lab_s_xyl_two"  class="tb-group-label"></label>
						</td>
						<td class="td-label">待分配量:</td>
						<td>
							<label id="lab_s_dbfpl_two"  class="tb-group-label">0.0</label>
						</td>
						<td class="td-label">邀约户数:</td>
						<td>
							<label id="lab_s_yyhs_two"  class="tb-group-label">0.0</label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段3:</td>
						<td>
							<label id="lab_s_yysd_three"  class="tb-group-label"></label>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<label id="lab_s_xyl_three"  class="tb-group-label"></label>
						</td>
						<td class="td-label">待分配量:</td>
						<td>
							<label id="lab_s_dbfpl_three"  class="tb-group-label">0.0</label>
						</td>
						<td class="td-label">邀约户数:</td>
						<td>
							<label id="lab_s_yyhs_three"  class="tb-group-label">0.0</label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">备注:</td>
						<td>
							<label id="lab_s_bz"  class="tb-group-label"></label>
						</td>
					</tr>
				</table>
				<div id="show_dg_panel" class="easyui-panel" style="width: 100%;height: 60%; overflow: hidden;min-height: 260px;">
						<div class="toolsbar-panel">
	           				<div class="tbRow">
								<span class="tools-labelgroup">
									<input id="consNameShow" class="easyui-textbox" data-options="prompt:'客户名称/户号模糊'">
								 	<a id="queryDetailShow" href="#" class="easyui-linkbutton c9 shadow" style="width: 80px;height: 24px;">查询</a>
								</span>
	                  		</div>
						</div>
						<div style="width:100%;height:87%;">
							<div id="dataGridDetailShow" style="height:100%;width:100%;border: 1px;"></div>
	        		</div>
	    		</div>
			</div>
			
			<div id="show-o-panel" class="easyui-dialog" style="width:850px;height:250px;" data-options="title:'指标详情',modal:true,closed:true">
				<table class="form-table" style="box-sizing: border-box;width: 100%;height: 25%;">
					<tr>
						<td class="td-label" style="padding-left: 10px;">响应来源:</td>
						<td colspan="7">
							<label id="lab_o_xyly" class="tb-group-label"></label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">响应日期:</td>
						<td colspan="7">
							<label id="lab_o_xyrq"  class="tb-group-label"></label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段1:</td>
						<td>
							<label id="lab_o_yysd_one"  class="tb-group-label"></label>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<label id="lab_o_xyl_one"  class="tb-group-label"></label>
						</td>
						<td class="td-label">待分配量:</td>
						<td>
							<label id="lab_o_dbfpl_one"  class="tb-group-label">0</label>
						</td>
						<td class="td-label">邀约户数:</td>
						<td>
							<label id="lab_o_yyhs_one"  class="tb-group-label">0</label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段2:</td>
						<td>
							<label id="lab_o_yysd_two"  class="tb-group-label"></label>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<label id="lab_o_xyl_two"  class="tb-group-label"></label>
						</td>
						<td class="td-label">待分配量:</td>
						<td>
							<label id="lab_o_dbfpl_two"  class="tb-group-label">0</label>
						</td>
						<td class="td-label">邀约户数:</td>
						<td>
							<label id="lab_o_yyhs_two"  class="tb-group-label">0</label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">应邀时段3:</td>
						<td>
							<label id="lab_o_yysd_three"  class="tb-group-label"></label>
						</td>
						<td class="td-label">需求响应量:</td>
						<td>
							<label id="lab_o_xyl_three"  class="tb-group-label"></label>
						</td>
						<td class="td-label">待分配量:</td>
						<td>
							<label id="lab_o_dbfpl_three"  class="tb-group-label">0</label>
						</td>
						<td class="td-label">邀约户数:</td>
						<td>
							<label id="lab_o_yyhs_three"  class="tb-group-label">0</label>
						</td>
					</tr>
					<tr>
						<td class="td-label" style="padding-left: 10px;">备注:</td>
						<td colspan="7">
							<label id="lab_o_bz"  class="tb-group-label"></label>
						</td>
					</tr>
				</table>
				
			</div>
		<script type="text/javascript">
				webContextRoot="<%=basePath%>";
				<%--
				var userId = '<%=((UserInfo)session.getAttribute("userInfo")).getUserId()%>';
				--%>
				var d = '<%=day%>'
		</script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
		 <script src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
		 <script src="<%=pagePath %>/js/common.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
		 <script type="text/javascript" src="<%=pagePath%>/js/validator.js"></script>
		 <script language="javascript" type="text/javascript" src="<%=pagePath%>/My97DatePicker/WdatePicker.js"></script>
		  <script type="text/javascript" src="<%=pagePath %>/ocupload/jquery.ocupload-1.1.2.js"></script>
		  <script src="<%=pagePath%>/js/templet_common.js"></script>
		 <script type="text/javascript" src="xyzbNew.js"></script>
		 <script type="text/javascript" src="<%=pagePath %>/js/validator.js"></script>
	</body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="com.frontier.pubmodule.AueicUtil"%>
<%@ page import="com.frontier.framework.model.UserInfo" %>
<%	
	String baseUrl  = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+baseUrl+"/";
	String pagePath = baseUrl + "/pages/despages/common";	
	String vtradeCode = request.getParameter("tradeCode");
	String vtradeName = request.getParameter("tradeName");
	
	session.setAttribute("itemCode","des_pfgd");
    session.setAttribute("itemName","派发工单");
    
	UserInfo info = (UserInfo)session.getAttribute("userInfo");
	String name = info.getLoginName();
	
	
	String orgName = null;
	String orgNo = null;
	String roleName = null;
	// 取得角色ID
	Long nowRoleId = new Long(0);
	
	String taitou = request.getParameter("taitou");
	//String consId = request.getParameter("consId");
	String devId = request.getParameter("devId");
	String userTranId= request.getParameter("userTranId");
	String deviceType = request.getParameter("deviceType");
	String mpId = request.getParameter("mpId");
	String isFlag = request.getParameter("isFlag");//是否是弹出框展示数据（0：否，1：是）
	
	String treePagePath = baseUrl + "/pages/areaEnergy/common";	
	
	String consId = request.getParameter("consId");//获取调用父页面传过来的参数
	String consName = request.getParameter("consName");//获取调用父页面传过来的参数
	String widthFlag = request.getParameter("widthFlag");//null-原页面，1-弹出此页面
	
		
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3c.org/TR/HTML4/loose.dtd">
<html>
    <head>
    <title>派发工单</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/lightbox/dist/css/lightbox.min.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/fangtian/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=pagePath %>/jquery-easyui-1.5.1/themes/color.css">
    <link rel="stylesheet" type="text/css" href="<%=pagePath %>/css/common.css">
    <link rel="stylesheet" href="<%=treePagePath %>/css/tree.css">
    <link rel="stylesheet" href="<%=pagePath%>/webuploader-0.1.5/webuploader.css">
    <script src="<%=pagePath %>/js/maskJs.js"></script>
	</head>
	<style>
     #pfgd-panel{
        width: 100%;
        height: 100%;
    }

    /* #pfgd-panel input,
    #pfgd-panel select{
        width: 160px;
    } */

    #pfgd-panel .rightAlign{
        text-align: right;
    }

    #pfgd-panel table{
        margin: 0 auto;
    }

    #pfgd-panel table td{
        height: 30px;
    }

    #pfgd-panel .td-label{
        width: 80px;
    }

    #pfgd-panel .td-value{
        width: 160px;
    }

    #pfgd-panel .td-fillwidth{
        width: 60px;
    }
    #pfgd-panel table{
    	font-size:12px;
    	color: #232323;
    }
    #pfgd-panel .toggleLabel-panel{
    	font-size:12px;
    	color: #232323;
    }
    
    .lightImage{
        margin: 0 8px;
        position: relative;
        display: inline-block;
    }
    /* .deleteIcon{
        position: absolute;
        right: -8px;
        width: 20px;
        height: 20px;
        background-color: #fd513a;
        color: #fff;
        border-radius: 2px;
        display: inline-block;
        text-align: center;
        font-size: 14px;
    }

    .deleteIcon:hover{
        background-color: #ee160d;
    } */
.deleteIcon{
    position: relative;
   /*  right: -8px; */
    top : -52px;
    left : -8px;
    width: 20px;
    height: 20px;
    background-color: #fd513a;
    color: #fff;
    border-radius: 2px;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
}
.deleteIcon:hover{
    background-color: #ee160d;
}

.width_one {
	width:60%; 
	height:auto;
	padding:30px 30px;
}

.width_two {
	width:100%;
	height:auto ;
	padding:30px 30px;
}
</style>
  
  <body >
  <script>
    var maskobj = new maskPanelManager();
    maskobj.register();
</script>

<div id="pfgd-panel" class="easyui-layout" >
	<%-- <%=shownRightStyle %> --%>
    <div data-options="region:'center',border:false" class="page-panel">
        <div class="toggleLabel-panel" >
            <!-- <a href="#" class="easyui-linkbutton" id="gzp" data-options="toggle:true,group:'g2',plain:true" style="font-size: 12px;margin: 0 8px;padding-left:15px;padding-right: 15px;" onclick="checkValue('');">工作票</a>
            <a href="#" class="easyui-linkbutton" id="xunjiangd" data-options="toggle:true,group:'g2',plain:true" style="font-size: 12px;margin: 0 8px;padding-left:15px;padding-right: 15px;" onclick="checkValue('');">巡检工单</a> -->
            <a href="#" class="easyui-linkbutton" id="quexianxgd" data-options="toggle:true,group:'g2',plain:true" style="font-size: 12px;margin: 0 8px;padding-left:15px;padding-right: 15px;" onclick="checkValue('2');">缺陷工单</a>
            <!-- <a href="#" class="easyui-linkbutton" id="tingdiangd" data-options="toggle:true,group:'g2',plain:true" style="font-size: 12px;margin: 0 4px;">停电工单</a> -->
            <a href="#" class="easyui-linkbutton" id="qiangxiugd" data-options="toggle:true,group:'g2',plain:true,selected:true" style="font-size: 12px;margin: 0 8px;padding-left:15px;padding-right: 15px;" onclick="checkValue('1');">抢修工单</a>
        </div>
        <div class="container-shadow container-marginTop">
        <% if(widthFlag!=null&&widthFlag.equals("1")){%>
           <div id="qxDiv" class="easyui-panel" style="width:100%; height:auto ;padding:30px 30px;">
	           <table class="form-table" style="width: 100%">
	                  <colgroup>
	                        <col style="width: 100px;">
	                        <col style="width: 50%;">
	                        <col style="width: 50px;">
	                        <col style="width: 100px;">
	                        <col style="width: 50%;">
	                   </colgroup>
	                    <tbody>
	                    <tr>
	                        <td class="td-label">
	                            <label >客户名称：</label>
	                        </td>
	                        <td class="td-value">
	                        	<select class="easyui-combobox" id="userTree" data-options="prompt:'请选择',width:'99%', panelHeight:'200px',required:true">
	                        	</select>
	                        </td>
	                        <td ></td>
	                        <td id="gzsbText" class="td-label">
	                            <label >故障设备：</label>
	                        </td>
	                        <td class="td-value">
	                            <select id="usershebeiTree" class="easyui-combotree" data-options="prompt:'请选择',width:'99%', panelHeight:'200px',required:true,editable:true"">
	                            </select>

	                        </td>
	                    </tr>
	                    <tr>
	                        <td id="fssjText">发生时间：</td>
	                        <td><input id="date" type="text" class="easyui-datetimebox" data-options="prompt:'请选择',width:'99%',editable:false,required:true""/></td>
	                        <td class="td-fillwidth"></td>
	                        <td>紧急程度：</td>
	                        <td>
	                            <select id="jinjichengdu" class="easyui-combobox" data-options="prompt:'请选择',width:'99%',panelHeight:'auto',editable:false,required:true""></select>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td style="vertical-align: top; padding-top: 5px;" id="gzmsText">故障描述：</td>
	                        <td colspan="4" style="padding-top: 5px;">
	                            <input class="easyui-textbox" id="gzms" data-options="width:'100%',height:150,multiline:true,validType:['isBlank','length[0,400]']" >
	                        </td>
	                    </tr>
	                    <tr>
	                    </tr>
	                    <tr>
	                        <td>派发人：</td>
	                        <td><span id="qxyhuser">区域能源</span></td>
	                        <td class="td-fillwidth"></td>
	                        <td id="qxfzrText">抢修负责人：</td>
	                        <td>
	                            <select class="easyui-combobox" id="qiangxiufzr" data-options="prompt:'请选择',width:'99%',panelHeight:'auto',editable:false,required:true"">    
	                            </select>
	                        </td>
	                    </tr>
	                    </tbody>
	                </table>
	                 <div class="buttons-panel" style="padding: 10px; text-align: center">
	                    <a href="#" class="easyui-linkbutton c9 shadow" onclick="paifa()">派发</a>
	                    <a style="margin-left: 10px;" href="#" class="easyui-linkbutton c10 shadow" onclick="qingkong()">清空</a>
	                </div>
	            </div>
       	<% }else{ %> 
       		<div id="qxDiv" class="easyui-panel" style="width:60%; height:auto ;padding:30px 30px;">
	       		<table class="form-table" style="width: 100%">
	                  <colgroup>
	                        <col style="width: 100px;">
	                        <col style="width: 50%;">
	                        <col style="width: 50px;">
	                        <col style="width: 100px;">
	                        <col style="width: 50%;">
	                   </colgroup>
	                    <tbody>
	                    <tr>
	                        <td class="td-label">
	                            <label >客户名称：</label>
	                        </td>
	                        <td class="td-value">
	                        	<select class="easyui-combobox" id="userTree" data-options="prompt:'请选择',width:'100%',panelHeight:'200px',required:true">
	                        	</select>
	                        </td>
	                        <td ></td>
	                        <td id="gzsbText" class="td-label">
	                            <label >故障设备：</label>
	                        </td>
	                        <td class="td-value">
	                            <select id="usershebeiTree" class="easyui-combotree" data-options="prompt:'请选择',width:'100%',required:true"">
	                            </select>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td id="fssjText">发生时间：</td>
	                        <td><input id="date" type="text" class="easyui-datetimebox" data-options="prompt:'请选择',width:'100%',editable:false,required:true""/></td>
	                        <td class="td-fillwidth"></td>
	                        <td>紧急程度：</td>
	                        <td>
	                            <select id="jinjichengdu" class="easyui-combobox" data-options="prompt:'请选择',width:'100%',panelHeight:'auto',editable:false,required:true""></select>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td style="vertical-align: top; padding-top: 5px;" id="gzmsText">故障描述：</td>
	                        <td colspan="4" style="padding-top: 5px;">
	                            <input class="easyui-textbox" id="gzms" data-options="width:'100%',height:150,multiline:true,validType:['isBlank','length[0,400]']" >
	                        </td>
	                    </tr>
	                    <tr>
	                    </tr>
	                    <tr>
	                        <td>派发人：</td>
	                        <td><span id="qxyhuser">区域能源</span></td>
	                        <td class="td-fillwidth"></td>
	                        <td id="qxfzrText">抢修负责人：</td>
	                        <td>
	                            <select class="easyui-combobox" id="qiangxiufzr" data-options="prompt:'请选择',width:'100%',panelHeight:'auto',editable:false,required:true"">    
	                            </select>
	                        </td>
	                    </tr>
	                    </tbody>
	                </table>
	                 <div class="buttons-panel" style="padding: 10px; text-align: center">
	                    <a href="#" class="easyui-linkbutton c9 shadow" onclick="paifa()">派发</a>
	                    <a style="margin-left: 10px;" href="#" class="easyui-linkbutton c10 shadow" onclick="qingkong()">清空</a>
	                </div>
	            </div> 
       	<% } %>
            
                
            
            <!-- 缺陷工单 -->
            <% if(widthFlag!=null&&widthFlag.equals("1")){%>
	           <div id="defectDiv" class="easyui-panel" title="" style="width:100%; height:auto ;padding:30px 30px;" >
	           <table class="form-table" style="width: 100%">
                  <colgroup>
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                        <col style="width: 50px;">
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                   </colgroup>
                    <tbody>
                     <tr>
                    	<td class="td-label">
                            <label >缺陷来源：</label>
                        </td>
                        <td class="td-value">
                        	<select class="easyui-combobox" id="defectSource" data-options="width:'99%',editable:false,panelHeight:'auto'">
			            		<!-- <option value="1">手机上报</option>   
			    				<option value="2">主站填报</option>    -->
			                </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                     </tr>
                	</tbody>
                </table>
                <!-- 手机上报 -->
                <div id="sjsb_defectDiv">
                <table class="form-table" style="width: 100%;">
                  <colgroup>
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                        <col style="width: 50px;">
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                   </colgroup>
                    <tbody>
                    <tr>
                    	<td class="td-label">
                            <label >缺陷信息：</label>
                        </td>
                        <td class="td-value" colspan="4">
                        	<select class="easyui-combobox" id="defect" data-options="prompt:'请选择',width:'99%',panelHeight:'200px',required:true,editable:true">
                        	</select>
                        </td>
                    </tr>
                    <tr>
                        <td class="td-label">
                            <label >客户名称：</label>
                        </td>
                        <td class="td-value">
                        	<!-- <select class="easyui-combobox" id="consId" data-options="prompt:'请选择',width:'99%',panelHeight:'200px',required:true">
                        	</select> -->
                        	<label id="consId"></label>
                        </td>
                        <td ></td>
                        <td id="gzsbText" class="td-label">
                            <label >缺陷设备：</label>
                        </td>
                        <td class="td-value">
                            <!-- <select id="defectSb" class="easyui-combotree" data-options="prompt:'请选择',width:'99%',required:true">
                            </select> -->
                            <label id="defectSb"></label>
                        </td>
                    </tr>
                    <tr>
                        <td id="fssjText">发现时间：</td>
                        <td><!-- <input id="foundTime" type="text" class="easyui-datetimebox" data-options="prompt:'请选择',width:'99%',editable:false,required:true,disabled:true"/> -->
                        	<label id="foundTime"></label>
                        </td>
                        <td class="td-fillwidth"></td>
                        <td>发现来源：</td>
                    	<td>
                    		<!-- <select class="easyui-combobox" id="source" data-options="width:'99%',prompt:'请选择',panelHeight:'auto',editable:false,required:true,disabled:true">
                            </select> -->
                            <label id="source"></label>
                    	</td>
                    </tr>
                    <tr>
                    	<td>发现人：</td>
                    	<td>
                    		<!-- <select class="easyui-combobox" id="founder" data-options="prompt:'请选择',width:'99%',panelHeight:'auto',editable:false,required:true,disabled:true">
                            </select> -->
                            <label id="founder"></label>
                    	</td>
                    	<td class="td-fillwidth"></td>
                    	<td>缺陷性质：</td>
                    	<td>
                    		<!-- <select class="easyui-combobox" id="severity" data-options="width:'99%',prompt:'请选择',panelHeight:'auto',editable:false,required:true,disabled:true">
                            </select> -->
                            <label id="severity"></label>
                    	</td>
                    </tr>
                    <tr>
                        <td style="vertical-align: top; padding-top: 5px;">缺陷描述：</td>
                        <td colspan="4" style="padding-top: 5px;height:150px;">
                            <!-- <input class="easyui-textbox" id="defectContent" data-options="width:'100%',height:150,multiline:true,validType:['isBlank','length[0,400]'],disabled:true" > -->
                            <label id="defectContent"></label>
                        </td>
                    </tr>
                    <tr>
                    	<td class="td-label">
							<label >紧急程度：</label>
						</td>
                        <td class="td-value">
                            <select id="defectJj" class="easyui-combobox" data-options="prompt:'请选择',width:'99%',panelHeight:'auto',editable:false,required:true"></select>
                        </td>
                    </tr>
                    <tr>
                    	<td class="td-label">
							<label >缺陷照片：</label>
						</td>
                        <td class="td-value" colspan="4">
                            <a id="hrefA" class="lightImage" >
                            	<span id="logo_butA" class="deleteIcon" style="display:none;">▬</span>
                            	<img id="imageA_logo" class="thumbnailImage" style="display:none;">
                            </a>
                            <a id="hrefB" class="lightImage" >
                            	<span id="logo_butB" class="deleteIcon" style="display:none;">▬</span>
                            	<img id="imageB_logo" class="thumbnailImage" style="display:none;">
                            </a>
                            <a id="hrefC" class="lightImage" >
                            	<span id="logo_butC" class="deleteIcon" style="display:none;">▬</span>
                            	<img id="imageC_logo" class="thumbnailImage" style="display:none;">
                            </a>
                            <!-- <div style=" display: inline-block;margin-left: 10px;">
                        	     <a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:true"
                                    id="butA" style="width: 100px; height: 60px; vertical-align: 0;">添加照片</a>
                            </div> -->
                            <input type="hidden" id="logoA">
				            <input type="hidden" id="logoB">
				            <input type="hidden" id="logoC">
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td>派发人：</td>
                        <td><span id="yhuser">区域能源</span></td>
                        <td class="td-fillwidth"></td>
                        <td>缺陷负责人：</td>
                        <td>
                            <select class="easyui-combobox" id="defectMan" data-options="prompt:'请选择',width:'99%',panelHeight:'auto',editable:false,required:true">    
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="buttons-panel" style="padding: 10px; text-align: center">
                    <a href="#" class="easyui-linkbutton c9 shadow" onclick="paifa()">派发</a>
                    <a style="margin-left: 10px;" href="#" class="easyui-linkbutton c10 shadow" onclick="qingkong()">清空</a>
                </div>
                </div>
                <!-- 主站填报 -->
                <div id="zztb_defectDiv">
                <table class="form-table" style="width: 100%;">
                  <colgroup>
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                        <col style="width: 50px;">
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                   </colgroup>
                    <tbody>
                    <tr>
                        <td class="td-label">
                            <label >客户名称：</label>
                        </td>
                        <td class="td-value">
                        	<select class="easyui-combobox" id="zztb_consId" data-options="prompt:'请选择',width:'99%',panelHeight:'200px',required:true">
                        	</select>
                        </td>
                        <td ></td>
                        <td id="gzsbText" class="td-label">
                            <label >缺陷设备：</label>
                        </td>
                        <td class="td-value">
                            <select id="zztb_defectSb" class="easyui-combotree" data-options="prompt:'请选择',width:'99%',required:true">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td id="fssjText">发现时间：</td>
                        <td><input id="zztb_foundTime" type="text" class="easyui-datetimebox" data-options="prompt:'请选择',width:'99%',editable:false,required:true"/></td>
                        <td class="td-fillwidth"></td>
                        <td>发现来源：</td>
                    	<td>
                    		<select class="easyui-combobox" id="zztb_source" data-options="width:'99%',prompt:'请选择',panelHeight:'auto',editable:false,required:true">
                            </select>
                    	</td>
                    </tr>
                    <tr>
                    	<td>发现人：</td>
                    	<td>
                    		<select class="easyui-combobox" id="zztb_founder" data-options="prompt:'请选择',width:'99%',panelHeight:'auto',editable:false,required:true">
                            </select>
                    	</td>
                    	<td class="td-fillwidth"></td>
                    	<td>缺陷性质：</td>
                    	<td>
                    		<select class="easyui-combobox" id="zztb_severity" data-options="width:'99%',prompt:'请选择',panelHeight:'auto',editable:false,required:true">
                            </select>
                    	</td>
                    </tr>
                    <tr>
                        <td style="vertical-align: top; padding-top: 5px;">缺陷描述：</td>
                        <td colspan="4" style="padding-top: 5px;">
                            <input class="easyui-textbox" id="zztb_defectContent" data-options="width:'100%',height:150,multiline:true,validType:['isBlank','length[0,400]']" >
                        </td>
                    </tr>
                    <tr>
                    	<td class="td-label">
							<label >紧急程度：</label>
						</td>
                        <td class="td-value">
                            <select id="zztb_defectJj" class="easyui-combobox" data-options="prompt:'请选择',width:'99%',panelHeight:'auto',editable:false,required:true"></select>
                        </td>
                    </tr>
                    <tr>
                    	<td class="td-label">
							<label >缺陷照片：</label>
						</td>
                        <td class="td-value" colspan="4">
                        	<span id="zztb_img"></span>
				            <a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:true"
                                    id="butA" style="width: 60px; height: 60px; vertical-align: 0;">添加照片</a>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td>派发人：</td>
                        <td><span id="zztb_yhuser">区域能源</span></td>
                        <td class="td-fillwidth"></td>
                        <td>缺陷负责人：</td>
                        <td>
                            <select class="easyui-combobox" id="zztb_defectMan" data-options="prompt:'请选择',width:'99%',panelHeight:'auto',editable:false,required:true">    
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="buttons-panel" style="padding: 10px; text-align: center">
                    <a id="sendWorknote" href="#" class="easyui-linkbutton c9 shadow">派发</a>
                    <a style="margin-left: 10px;" href="#" class="easyui-linkbutton c10 shadow" onclick="qingkong()">清空</a>
                </div>
                </div>
            </div>
	       	<% }else{ %> 
	       		<div id="defectDiv" class="easyui-panel" title="" style="width:60%; height:auto ;padding:30px 30px;" >
	       		<table class="form-table" style="width: 100%">
                  <colgroup>
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                        <col style="width: 50px;">
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                   </colgroup>
                    <tbody>
                     <tr>
                    	<td class="td-label">
                            <label >缺陷来源：</label>
                        </td>
                        <td class="td-value">
                        	<select class="easyui-combobox" id="defectSource" data-options="width:'100%',editable:false,panelHeight:'auto'">
			            		<!-- <option value="1">手机上报</option>   
			    				<option value="2">主站填报</option>    -->
			                </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                     </tr>
                	</tbody>
                </table>
                <!-- 手机上报 -->
                <div id="sjsb_defectDiv">
                <table class="form-table" style="width: 100%;">
                  <colgroup>
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                        <col style="width: 50px;">
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                   </colgroup>
                    <tbody>
                    <tr>
                    	<td class="td-label">
                            <label >缺陷信息：</label>
                        </td>
                        <td class="td-value" colspan="4">
                        	<select class="easyui-combobox" id="defect" data-options="prompt:'请选择',width:'100%',panelHeight:'200px',required:true,editable:true">
                        	</select>
                        </td>
                    </tr>
                    <tr>
                        <td class="td-label">
                            <label >客户名称：</label>
                        </td>
                        <td class="td-value">
                        	<!-- <select class="easyui-combobox" id="consId" data-options="prompt:'请选择',width:'100%',panelHeight:'200px',required:true,disabled:true">
                        	</select> -->
                        	<label id="consId"></label>
                        </td>
                        <td ></td>
                        <td id="gzsbText" class="td-label">
                            <label >缺陷设备：</label>
                        </td>
                        <td class="td-value">
                            <!-- <select id="defectSb" class="easyui-combotree" data-options="prompt:'请选择',width:'100%',required:true,disabled:true">
                            </select> -->
                            <label id="defectSb"></label>
                        </td>
                    </tr>
                    <tr>
                        <td id="fssjText">发现时间：</td>
                        <td><!-- <input id="foundTime" type="text" class="easyui-datetimebox" data-options="prompt:'请选择',width:'100%',editable:false,required:true,disabled:true"/> -->
                        	<label id="foundTime"></label>
                        </td>
                        <td class="td-fillwidth"></td>
                        <td>发现来源：</td>
                    	<td>
                    		<!-- <select class="easyui-combobox" id="source" data-options="width:'100%',prompt:'请选择',panelHeight:'auto',editable:false,required:true,disabled:true">
                            </select> -->
                            <label id="source"></label>
                    	</td>
                    </tr>
                    <tr>
                    	<td>发现人：</td>
                    	<td>
                    		<!-- <select class="easyui-combobox" id="founder" data-options="prompt:'请选择',width:'100%',panelHeight:'auto',editable:false,required:true,disabled:true">
                            </select> -->
                            <label id="founder"></label>
                    	</td>
                    	<td class="td-fillwidth"></td>
                    	<td>缺陷性质：</td>
                    	<td>
                    		<!-- <select class="easyui-combobox" id="severity" data-options="width:'100%',prompt:'请选择',panelHeight:'auto',editable:false,required:true,disabled:true">
                            </select> -->
                            <label id="severity"></label>
                    	</td>
                    </tr>
                    <tr>
                        <td style="vertical-align: top; padding-top: 5px;">缺陷描述：</td>
                        <td colspan="4" style="padding-top: 5px;height:150px;">
                        	<!--
                            <input class="easyui-textbox" id="defectContent" data-options="width:'100%',height:150,multiline:true,validType:['isBlank','length[0,400]'],disabled:true" >
                            -->
                            <label id="defectContent"></label>
                        </td> 
                        
                    </tr>
                    <tr>
                    	<td class="td-label">
							<label >紧急程度：</label>
						</td>
                        <td class="td-value">
                            <select id="defectJj" class="easyui-combobox" data-options="prompt:'请选择',width:'100%',panelHeight:'auto',editable:false,required:true"></select>
                        </td>
                    </tr>
                    <tr>
                    	<td class="td-label">
							<label >缺陷照片：</label>
						</td>
                        <td class="td-value" colspan="4">
                            <a id="hrefA" class="lightImage" >
                            	<span id="logo_butA" class="deleteIcon" style="display:none;">▬</span>
                            	<img id="imageA_logo" class="thumbnailImage" style="display:none;">
                            </a>
                            <a id="hrefB" class="lightImage" >
                            	<span id="logo_butB" class="deleteIcon" style="display:none;">▬</span>
                            	<img id="imageB_logo" class="thumbnailImage" style="display:none;">
                            </a>
                            <a id="hrefC" class="lightImage" >
                            	<span id="logo_butC" class="deleteIcon" style="display:none;">▬</span>
                            	<img id="imageC_logo" class="thumbnailImage" style="display:none;">
                            </a>
                            <!-- <div style=" display: inline-block;margin-left: 10px;">
                        	     <a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:true"
                                    id="butA" style="width: 100px; height: 60px; vertical-align: 0;">添加照片</a>
                            </div> -->
                            <input type="hidden" id="logoA">
				            <input type="hidden" id="logoB">
				            <input type="hidden" id="logoC">
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td>派发人：</td>
                        <td><span id="yhuser">区域能源</span></td>
                        <td class="td-fillwidth"></td>
                        <td>缺陷负责人：</td>
                        <td>
                            <select class="easyui-combobox" id="defectMan" data-options="prompt:'请选择',width:'100%',panelHeight:'auto',editable:false,required:true">    
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="buttons-panel" style="padding: 10px; text-align: center">
                    <a href="#" class="easyui-linkbutton c9 shadow" onclick="paifa()">派发</a>
                    <a style="margin-left: 10px;" href="#" class="easyui-linkbutton c10 shadow" onclick="qingkong()">清空</a>
                </div>
                </div>
                <!-- 主站填报 -->
                <div id="zztb_defectDiv">
                <table class="form-table" style="width: 100%;">
                  <colgroup>
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                        <col style="width: 50px;">
                        <col style="width: 100px;">
                        <col style="width: 50%;">
                   </colgroup>
                    <tbody>
                    <tr>
                        <td class="td-label">
                            <label >客户名称：</label>
                        </td>
                        <td class="td-value">
                        	<select class="easyui-combobox" id="zztb_consId" data-options="prompt:'请选择',width:'100%',panelHeight:'200px',required:true">
                        	</select>
                        </td>
                        <td ></td>
                        <td id="gzsbText" class="td-label">
                            <label >缺陷设备：</label>
                        </td>
                        <td class="td-value">
                            <select id="zztb_defectSb" class="easyui-combotree" data-options="prompt:'请选择',width:'100%',required:true">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td id="fssjText">发现时间：</td>
                        <td><input id="zztb_foundTime" type="text" class="easyui-datetimebox" data-options="prompt:'请选择',width:'100%',editable:false,required:true"/></td>
                        <td class="td-fillwidth"></td>
                        <td>发现来源：</td>
                    	<td>
                    		<select class="easyui-combobox" id="zztb_source" data-options="width:'100%',prompt:'请选择',panelHeight:'auto',editable:false,required:true">
                            </select>
                    	</td>
                    </tr>
                    <tr>
                    	<td>发现人：</td>
                    	<td>
                    		<select class="easyui-combobox" id="zztb_founder" data-options="prompt:'请选择',width:'100%',panelHeight:'auto',editable:false,required:true">
                            </select>
                    	</td>
                    	<td class="td-fillwidth"></td>
                    	<td>缺陷性质：</td>
                    	<td>
                    		<select class="easyui-combobox" id="zztb_severity" data-options="width:'100%',prompt:'请选择',panelHeight:'auto',editable:false,required:true">
                            </select>
                    	</td>
                    </tr>
                    <tr>
                        <td style="vertical-align: top; padding-top: 5px;">缺陷描述：</td>
                        <td colspan="4" style="padding-top: 5px;">
                            <input class="easyui-textbox" id="zztb_defectContent" data-options="width:'100%',height:150,multiline:true,validType:['isBlank','length[0,400]']" >
                        </td>
                    </tr>
                    <tr>
                    	<td class="td-label">
							<label >紧急程度：</label>
						</td>
                        <td class="td-value">
                            <select id="zztb_defectJj" class="easyui-combobox" data-options="prompt:'请选择',width:'100%',panelHeight:'auto',editable:false,required:true"></select>
                        </td>
                    </tr>
                    <tr>
                    	<td class="td-label">
							<label >缺陷照片：</label>
						</td>
                        <td class="td-value" colspan="4">
                        	<span id="zztb_img"></span>
				            <a href="#" class="easyui-linkbutton shadow" data-options="iconCls:'icon-large-picture',size:'large',iconAlign:'top',plain:true"
                                    id="butA" style="width: 60px; height: 60px; vertical-align: 0;">添加照片</a>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td>派发人：</td>
                        <td><span id="zztb_yhuser">区域能源</span></td>
                        <td class="td-fillwidth"></td>
                        <td>缺陷负责人：</td>
                        <td>
                            <select class="easyui-combobox" id="zztb_defectMan" data-options="prompt:'请选择',width:'100%',panelHeight:'auto',editable:false,required:true">    
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="buttons-panel" style="padding: 10px; text-align: center">
                    <a id="sendWorknote" href="#" class="easyui-linkbutton c9 shadow">派发</a>
                    <a style="margin-left: 10px;" href="#" class="easyui-linkbutton c10 shadow" onclick="qingkong()">清空</a>
                </div>
                </div>
            </div>
	       	<% } %>
            	
            
            
        </div>
    </div>
</div>
  <script type="text/javascript">
		 var basePath = '<%=basePath%>';
		 var nowRoleId = '<%=nowRoleId%>';
		 var roleName = '<%=roleName%>';
		 var loginName = '<%=((UserInfo)session.getAttribute("userInfo")).getLoginName()%>';
         var UserName = '<%=((UserInfo)session.getAttribute("userInfo")).getUserName()%>';
         var userId = '<%=((UserInfo)session.getAttribute("userInfo")).getUserId()%>';
         webContextRoot="<%=basePath%>";
         var taitou ='<%=taitou%>';
         var consId ='<%=consId%>';
         var devId = '<%=devId%>';
         var userTranId ='<%=userTranId%>';
         var deviceType = '<%=deviceType%>';
         var mpId='<%=mpId%>';
         var isFlag = '<%=isFlag%>';
         var baseUrl='<%=baseUrl%>';
         var jsPath = "<%=pagePath%>";
         var widthFlag = '<%=widthFlag%>';
	</script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="<%=pagePath %>/ocupload/jquery.ocupload-1.1.2.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/js/dateUtil.js"></script>
	<script type="text/javascript" src="<%=pagePath%>/lightbox/dist/js/lightbox.min.js"></script>
	<script src="<%=pagePath%>/webuploader-0.1.5/webuploader.min.js"></script>
	<script type="text/javascript" src="PaiFaGongDan.js"></script>
</body>
</html>

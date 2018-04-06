<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css"href="<%=basePath%>pages/despages/common/css/style.css">
	<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="chrome=1"/>
	<meta name="apple-mobile-web-app-capable" content="yes"/>	
	<jsp:include page="<%=basePath%>ext.jsp"/>
	<link rel="stylesheet" href="svgEdit/jgraduate/css/jPicker.css" type="text/css"/>
	<link rel="stylesheet" href="svgEdit/jgraduate/css/jgraduate.css" type="text/css"/>
	<link rel="stylesheet" href="svgEdit/svg-editor.css" type="text/css"/>
	<link rel="stylesheet" href="svgEdit/spinbtn/JQuerySpinBtn.css" type="text/css"/>
	<link rel="stylesheet" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/default/easyui.css" type="text/css"/>
	<link rel="stylesheet" href="<%=basePath%>pages/areaEnergy/common/css/lightbox.min.css" type="text/css"/>
	<link rel="stylesheet" href="<%=basePath%>pages/areaEnergy/common/css/tree.css" type="text/css"/>
	

<!--{if jquery_release}>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
<!{else}-->
  <script type="text/javascript" src="svgEdit/jquery.js"></script>
<!--{endif}-->

	<script type="text/javascript" src="svgEdit/js-hotkeys/jquery.hotkeys.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>pages/despages/common/js/JSONUtil.js"></script>	
	<script type="text/javascript" src="svgEdit/jquerybbq/jquery.bbq.min.js"></script>
	<script type="text/javascript" src="svgEdit/svgicons/jquery.svgicons.js"></script>
	<script type="text/javascript" src="svgEdit/jgraduate/jquery.jgraduate.min.js"></script>
	<script type="text/javascript" src="svgEdit/spinbtn/JQuerySpinBtn.min.js"></script>
	<script type="text/javascript" src="svgEdit/touch.js"></script>
	<script type="text/javascript" src="<%=basePath%>pages/despages/common/js/jquery.easyui.min.js"></script>
<!--{if svg_edit_release}-->
  	<script type="text/javascript" src="svgEdit/svgedit.compiled.js"></script>
<!--{else}>
  <script type="text/javascript" src="contextmenu/jquery.contextMenu.js"></script>
  <script type="text/javascript" src="browser.js"></script>
  <script type="text/javascript" src="svgtransformlist.js"></script>
  <script type="text/javascript" src="math.js"></script>
  <script type="text/javascript" src="units.js"></script>
  <script type="text/javascript" src="svgutils.js"></script>
  <script type="text/javascript" src="sanitize.js"></script>
  <script type="text/javascript" src="history.js"></script>
  <script type="text/javascript" src="select.js"></script>
  <script type="text/javascript" src="draw.js"></script>
  <script type="text/javascript" src="path.js"></script>
  <script type="text/javascript" src="svgcanvas.js"></script>
  <script type="text/javascript" src="svg-editor.js"></script>
  <script type="text/javascript" src="locale/locale.js"></script>
  <script type="text/javascript" src="contextmenu.js"></script>
<!{endif}-->

<!-- you can load extensions here -->
<!-- <script type="text/javascript" src="extensions/ext-helloworld.js"></script> -->

<!-- always minified scripts -->
	<script type="text/javascript" src="svgEdit/jquery-ui/jquery-ui-1.8.17.custom.min.js"></script>
	<script type="text/javascript" src="svgEdit/jgraduate/jpicker.js"></script>
<style>
 td {
  border:1px solid #C7C2C2;
  height:26px;
 }
 tr{
 	margin:0 10px;
 }
 input{
 	height:24px;
 }
 select{
 	height:24px;
 	margin-top:0px;
 	width:152px
 }
 .textcolor{
  color:#16496B;
 }
 .tabs-header
 {
 background-color:#D0D0D0;
 
 }
 .my_tool_button{
	height: 24px;
	width: 24px;
	margin: 2px 2px 4px 2px;
	padding: 3px;
	-webkit-box-shadow: inset 1px 1px 2px white, 1px 1px 1px rgba(0,0,0,0.3);
	moz-box-shadow: inset 1px 1px 2px white, 1px 1px 1px rgba(0,0,0,0.3);
	box-shadow: inset 1px 1px 2px white, 1px 1px 1px rgba(0,0,0,0.3);
	background-color: #E8E8E8;
	cursor: pointer;
	border-radius: 3px;
	-moz-border-radius: 3px;
	-webkit-border-radius: 3px;
	float: left;
}
#tools_tubiao_detail{
	z-index:2;
}
</style>
<script type="text/javascript">
	$(function(){
		//获取id="tools_tubiao"的坐标，并将其坐标处理后，设置id="tools_tubiao_detail"的坐标
		var tubiao = document.getElementById("tools_tubiao");
		var left = tubiao.getBoundingClientRect().left+30;
		var top = tubiao.getBoundingClientRect().top;
		var tubiao_detail = document.getElementById("tools_tubiao_detail");
		tubiao_detail.style.position = "absolute";
		tubiao_detail.style.left = left+"px";
		tubiao_detail.style.top = top+"px";
		
		//设置自定义详细图标弹出框
		$("#tools_tubiao").click(function(){
			var state = $("#tools_tubiao_detail").css("display");
			if(state=="none"){
				$("#tools_tubiao_detail").css("display","block");
			}else{
				$("#tools_tubiao_detail").css("display","none");
			}
		});
	});
</script>
<!-- feeds -->
<!-- Add script with custom handlers here -->
<title>SVG-edit</title>
</head>
<body>
<div style="font-size:20px;height:40px;line-height:40px;vertical-align: middle;">一次接线图绘制</div>
<!-- <div id="tt" class="easyui-tabs" style="width:100%;height:100%;">  -->  
    <!-- <div title="一次图绘制" data-options="closable:true" style="overflow:auto;padding:20px;">   --> 
       

<div id="svg_editor" class="clear">

<div id="rulers">
	<div id="ruler_corner"></div>
	<div id="ruler_x">
		<div>
			<canvas height="15"></canvas>
		</div>
	</div>
	<div id="ruler_y">
		<div>
			<canvas width="15"></canvas>
		</div>
	</div>
</div>

<div id="workarea">
<style id="styleoverrides" type="text/css" media="screen" scoped="scoped"></style>
<div id="svgcanvas" style="position:relative">

</div>
</div>

<div id="sidepanels">
	<div id="layerpanel">
		<h3 id="layersLabel">图层</h3>
		<fieldset id="layerbuttons">
			<div id="layer_new" class="layer_button"  title="新建图层"></div>
			<div id="layer_delete" class="layer_button"  title="删除图层"></div>
			<div id="layer_rename" class="layer_button"  title="重命名图层"></div>
			<div id="layer_up" class="layer_button"  title="上移"></div>
			<div id="layer_down" class="layer_button"  title="下移"></div>
			<div id="layer_moreopts" class="layer_button"  title="更多选项"></div>
		</fieldset>
		
		<table id="layerlist">
			<tr class="layer">
				<td class="layervis"></td>
				<td class="layername">Layer 1</td>
			</tr>
		</table>
		<span id="selLayerLabel">移动元素到:</span>
		<select id="selLayerNames" title="移动选中的元素到不同的图层" disabled="disabled">
			<option selected="selected" value="layer1">Layer 1</option>
		</select>
	</div>
	<div id="sidepanel_handle" title="左右拖拽调整侧面板大小 [X]">图层</div>
</div>

<div id="main_button">
	<div id="main_icon" class="tool_button" title="主菜单">
		<span>SVG-编辑</span>
		<div id="logo"></div>
		<div class="dropdown"></div>
	</div>
		
	<div id="main_menu"> 
	
		<!-- File-like buttons: New, Save, Source -->
		<ul>
			<li id="tool_clear">
				<div></div>
				新建图像 (N)
			</li>
			
			<li id="tool_open" style="display:none;">
				<div id="fileinputs">
					<div></div>
				</div>
				打开图像
			</li>
			
			<li id="tool_import" style="display:none;">
				<div id="fileinputs_import">
					<div></div>
				</div>
				导入图像
			</li>
			
			<li id="tool_save">
				<div></div>
				保存图像 (S)
			</li>
			
			<li id="tool_export">
				<div></div>
				导出 PNG
			</li>
			
			<li id="tool_docprops">
				<div></div>
				文档属性 (D)
			</li>
		</ul>

		<p>
			<a href="http://svg-edit.googlecode.com/" target="_blank">
				SVG-edit 首页
			</a>
		</p>

		<button id="tool_prefs_option">
			编辑选项
		</button>


	</div>
</div>



<div id="tools_top" class="tools_panel">

	<div id="editor_panel">
		<div class="tool_sep"></div>
		<div class="push_button" id="tool_source" title="编辑源文件 [U]"></div>
		<div class="tool_button" id="tool_wireframe" title="线框模式 [F]"></div>
	</div>

    <!-- History buttons -->
	<div id="history_panel">
		<div class="tool_sep"></div>
		<div class="push_button tool_button_disabled" id="tool_undo" title="撤销 [Z]"></div>
		<div class="push_button tool_button_disabled" id="tool_redo" title="恢复 [Y]"></div>
	</div>
	
	<!-- Buttons when a single element is selected -->
	<div id="selected_panel">
		<div class="toolset">
			<div class="tool_sep"></div>
			<div class="push_button" id="tool_clone" title="复制 [D]"></div>
			<div class="push_button" id="tool_delete" title="删除 [Delete/Backspace]"></div>
			<div class="tool_sep"></div>
			<div class="push_button" id="tool_move_top" title="置前 [ Ctrl+Shift+] ]"></div>
			<div class="push_button" id="tool_move_bottom" title="置后 [ Ctrl+Shift+[ ]"></div>
			<div class="push_button" id="tool_topath" title="转换路径"></div>
			<div class="push_button" id="tool_reorient" title="调整路径"></div>
			<div class="push_button" id="tool_make_link" title="建立(超)链接"></div>
			<div class="tool_sep"></div>
			<label id="idLabel" title="元素的身份">
				<span>id:</span>
				<input id="elem_id" class="attr_changer" data-attr="id" size="10" type="text"/>
			</label>
		</div>

		<label id="tool_angle" title="改变旋转角度" class="toolset">
			<span id="angleLabel" class="icon_label"></span>
			<input id="angle" size="2" value="0" type="text"/>
		</label>
		
		<div class="toolset" id="tool_blur" title="改变高斯模糊值">
			<label>
				<span id="blurLabel" class="icon_label"></span>
				<input id="blur" size="2" value="0" type="text"/>
			</label>
			<div id="blur_dropdown" class="dropdown">
				<button></button>
				<ul>
					<li class="special"><div id="blur_slider"></div></li>
				</ul>
			</div>
		</div>
		
		<div class="dropdown toolset" id="tool_position" title="对齐页面元素">
				<div id="cur_position" class="icon_label"></div>
				<button></button>
		</div>		

		<div id="xy_panel" class="toolset">
			<label>
				x: <input id="selected_x" class="attr_changer" title="改变 X 坐标" size="3" data-attr="x"/>
			</label>
			<label>
				y: <input id="selected_y" class="attr_changer" title="改变 Y 坐标" size="3" data-attr="y"/>
			</label>
		</div>
	</div>
	
	<!-- Buttons when multiple elements are selected -->
	<div id="multiselected_panel">
		<div class="tool_sep"></div>
		<div class="push_button" id="tool_clone_multi" title="复制 [C]"></div>
		<div class="push_button" id="tool_delete_multi" title="删除 [Delete/Backspace]"></div>
		<div class="tool_sep"></div>
		<div class="push_button" id="tool_group" title="分组 [G]"></div>
		<div class="push_button" id="tool_make_link_multi" title="建立(超)链接"></div>
		<div class="push_button" id="tool_alignleft" title="左对齐"></div>
		<div class="push_button" id="tool_aligncenter" title="水平居中"></div>
		<div class="push_button" id="tool_alignright" title="右对齐"></div>
		<div class="push_button" id="tool_aligntop" title="上对齐"></div>
		<div class="push_button" id="tool_alignmiddle" title="垂直居中"></div>
		<div class="push_button" id="tool_alignbottom" title="下对齐"></div>
		<label id="tool_align_relative"> 
			<span id="relativeToLabel">相对于:</span>
			<select id="align_relative_to" title="相对于...对齐">
			<option id="selected_objects" value="selected">选中的对象</option>
			<option id="largest_object" value="largest">最大对象</option>
			<option id="smallest_object" value="smallest">最小对象</option>
			<option id="page" value="page">页面</option>
			</select>
		</label>
		<div class="tool_sep"></div>

	</div>

	<div id="rect_panel">
		<div class="toolset">
			<label id="rect_width_tool" title="改变矩形宽度">
				<span id="rwidthLabel" class="icon_label"></span>
				<input id="rect_width" class="attr_changer" size="3" data-attr="width"/>
			</label>
			<label id="rect_height_tool" title="改变矩形高度">
				<span id="rheightLabel" class="icon_label"></span>
				<input id="rect_height" class="attr_changer" size="3" data-attr="height"/>
			</label>
		</div>
		<label id="cornerRadiusLabel" title="改变矩形角的圆弧" class="toolset">
			<span class="icon_label"></span>
			<input id="rect_rx" size="3" value="0" type="text" data-attr="Corner Radius"/>
		</label>
	</div>

	<div id="image_panel">
	<div class="toolset">
		<label><span id="iwidthLabel" class="icon_label"></span>
		<input id="image_width" class="attr_changer" title="改变图像宽度" size="3" data-attr="width"/>
		</label>
		<label><span id="iheightLabel" class="icon_label"></span>
		<input id="image_height" class="attr_changer" title="改变图像高度" size="3" data-attr="height"/>
		</label>
	</div>
	<div class="toolset">
		<label id="tool_image_url">url:
			<input id="image_url" type="text" title="改变URL" size="35"/>
		</label>
		<label id="tool_change_image">
			<button id="change_image_url" style="display:none;">改变图像</button>
			<span id="url_notice" title="提示: 这个图形不能被嵌入. 它的显示依赖于这个路径"></span>
		</label>
	</div>
  </div>

	<div id="circle_panel">
		<div class="toolset">
			<label id="tool_circle_cx">cx:
			<input id="circle_cx" class="attr_changer" title="改变圆的 cx 坐标" size="3" data-attr="cx"/>
			</label>
			<label id="tool_circle_cy">cy:
			<input id="circle_cy" class="attr_changer" title="改变圆的 cy 坐标" size="3" data-attr="cy"/>
			</label>
		</div>
		<div class="toolset">
			<label id="tool_circle_r">r:
			<input id="circle_r" class="attr_changer" title="改变圆的半径" size="3" data-attr="r"/>
			</label>
		</div>
	</div>

	<div id="ellipse_panel">
		<div class="toolset">
			<label id="tool_ellipse_cx">cx:
			<input id="ellipse_cx" class="attr_changer" title="改变椭圆的 cx 坐标" size="3" data-attr="cx"/>
			</label>
			<label id="tool_ellipse_cy">cy:
			<input id="ellipse_cy" class="attr_changer" title="改变椭圆的 cy 坐标" size="3" data-attr="cy"/>
			</label>
		</div>
		<div class="toolset">
			<label id="tool_ellipse_rx">rx:
			<input id="ellipse_rx" class="attr_changer" title="改变椭圆的 x 半径" size="3" data-attr="rx"/>
			</label>
			<label id="tool_ellipse_ry">ry:
			<input id="ellipse_ry" class="attr_changer" title="改变椭圆的 y 半径" size="3" data-attr="ry"/>
			</label>
		</div>
	</div>

	<div id="line_panel">
		<div class="toolset">
			<label id="tool_line_x1">x1:
			<input id="line_x1" class="attr_changer" title="改变线段开始 x 坐标" size="3" data-attr="x1"/>
			</label>
			<label id="tool_line_y1">y1:
			<input id="line_y1" class="attr_changer" title="改变线段开始 y 坐标" size="3" data-attr="y1"/>
			</label>
		</div>
		<div class="toolset">
			<label id="tool_line_x2">x2:
			<input id="line_x2" class="attr_changer" title="改变线段结束 x 坐标" size="3" data-attr="x2"/>
			</label>
			<label id="tool_line_y2">y2:
			<input id="line_y2" class="attr_changer" title="改变线段结束 y 坐标" size="3" data-attr="y2"/>
			</label>
		</div>
	</div>

	<div id="text_panel">
		<div class="toolset">
			<div class="tool_button" id="tool_bold" title="粗体 [B]"><span></span>B</div>
			<div class="tool_button" id="tool_italic" title="斜体 [I]"><span></span>i</div>
		</div>
		
		<div class="toolset" id="tool_font_family">
			<label>
				<!-- Font family -->
				<input id="font_family" type="text" title="改变字体类型" size="12"/>
			</label>
			<div id="font_family_dropdown" class="dropdown">
				<button></button>
				<ul>
					<li style="font-family:serif">Serif</li>
					<li style="font-family:sans-serif">Sans-serif</li>
					<li style="font-family:cursive">Cursive</li>
					<li style="font-family:fantasy">Fantasy</li>
					<li style="font-family:monospace">Monospace</li>
				</ul>
			</div>
		</div>

		<label id="tool_font_size" title="改变字体大小">
			<span id="font_sizeLabel" class="icon_label"></span>
			<input id="font_size" size="3" value="0" type="text"/>
		</label>
		
		<!-- Not visible, but still used -->
		<input id="text" type="text" size="35"/>
	</div>

	<!-- formerly gsvg_panel -->
	<div id="container_panel">
		<div class="tool_sep"></div>

		<!-- Add viewBox field here? -->

		<label id="group_title" title="分组识别标签">
			<span>label:</span>
			<input id="g_title" data-attr="title" size="10" type="text"/>
		</label>
	</div>
	
	<div id="use_panel">
		<div class="push_button" id="tool_unlink_use" title="Break link to reference element (make unique)"></div>
	</div>
	
	<div id="g_panel">
		<div class="push_button" id="tool_ungroup" title="取消分组元素 [G]"></div>
	</div>

	<!-- For anchor elements -->
	<div id="a_panel">
		<label id="tool_link_url" title="Set link URL (leave empty to remove)">
			<span id="linkLabel" class="icon_label"></span>
			<input id="link_url" type="text" size="35"/>
		</label>	
	</div>
	
	<div id="path_node_panel">
		<div class="tool_sep"></div>
		<div class="tool_button push_button_pressed" id="tool_node_link" title="链路控制点"></div>
		<div class="tool_sep"></div>
		<label id="tool_node_x">x:
			<input id="path_node_x" class="attr_changer" title="改变节点 x 坐标" size="3" data-attr="x"/>
		</label>
		<label id="tool_node_y">y:
			<input id="path_node_y" class="attr_changer" title="改变节点 y 坐标" size="3" data-attr="y"/>
		</label>
		
		<select id="seg_type" title="改变段类型">
			<option id="straight_segments" selected="selected" value="4">直线</option>
			<option id="curve_segments" value="6">曲线</option>
		</select>
		<div class="tool_button" id="tool_node_clone" title="克隆节点"></div>
		<div class="tool_button" id="tool_node_delete" title="删除节点"></div>
		<div class="tool_button" id="tool_openclose_path" title="开/关 子路径"></div>
		<div class="tool_button" id="tool_add_subpath" title="添加子路径"></div>
	</div>
</div> <!-- tools_top -->
	<div id="cur_context_panel">
		
	</div>


<div id="tools_left" class="tools_panel">
	<div class="tool_button" id="tool_select" title="选中工具"></div>
	<div class="tool_button" id="tool_fhpath" title="画笔工具"></div>
	<div class="tool_button" id="tool_line" title="线段工具"></div>
	<div class="tool_button flyout_current" id="tools_rect_show" title="矩形工具">
		<div class="flyout_arrow_horiz"></div>
	</div>
	<div class="tool_button flyout_current" id="tools_ellipse_show" title="圆形工具">
		<div class="flyout_arrow_horiz"></div>
	</div>
	<div class="tool_button" id="tool_path" title="路径工具"></div>
	<div class="tool_button" id="tool_text" title="文本工具"></div>
	<div class="tool_button" id="tool_image" title="图像工具"></div>
	<div class="tool_button" id="tool_zoom" title="缩放工具 [Ctrl+Up/Down]"></div>
	<div class="tool_button" id="tools_tubiao" title="图标">图标
		<div class="flyout_arrow_horiz"></div>
	</div>
	
	<div style="display: none">
		<div id="tool_rect" title="矩形"></div>
		<div id="tool_square" title="正方形"></div>
		<div id="tool_fhrect" title="自由矩形"></div>
		<div id="tool_ellipse" title="椭圆形"></div>
		<div id="tool_circle" title="圆形"></div>
		<div id="tool_fhellipse" title="自由椭圆形"></div>
	</div>
</div> <!-- tools_left -->

<!-- 自定义图标 —— 详细图标 -->
<div id="tools_tubiao_detail" style="display: none">
	<div class="my_tool_button" id="tool_dianzu" title="电阻">电阻</div>
	<div class="my_tool_button" id="tool_onoff" title="开关">开关</div>
	<div class="my_tool_button" id="tool_bianyaqi" title="变压器">变压器</div><br>
	<div class="my_tool_button" id="tool_dianzu2" title="电阻">电阻</div>
	<div class="my_tool_button" id="tool_onoff2" title="开关">开关</div>
	<div class="my_tool_button" id="tool_bianyaqi2" title="变压器">变压器</div><br>
	<div class="my_tool_button" id="tool_dianzu3" title="电阻">电阻</div>
	<div class="my_tool_button" id="tool_onoff3" title="开关">开关</div>
	<div class="my_tool_button" id="tool_bianyaqi3" title="变压器">变压器</div><br>
</div>

<div id="tools_bottom" class="tools_panel">

    <!-- Zoom buttons -->
	<div id="zoom_panel" class="toolset" title="改变缩放等级">
		<label>
		<span id="zoomLabel" class="zoom_tool icon_label"></span>
		<input id="zoom" size="3" value="100" type="text" />
		</label>
		<div id="zoom_dropdown" class="dropdown">
			<button></button>
			<ul>
				<li>1000%</li>
				<li>400%</li>
				<li>200%</li>
				<li>100%</li>
				<li>50%</li>
				<li>25%</li>
				<li id="fit_to_canvas" data-val="canvas">自适应画布</li>
				<li id="fit_to_sel" data-val="selection">自适应选中区域</li>
				<li id="fit_to_layer_content" data-val="layer">自适应图层内容</li>
				<li id="fit_to_all" data-val="content">自适应所有内容</li>
				<li>100%</li>
			</ul>
		</div>
		<div class="tool_sep"></div>
<div style="height:40px;" class="clear">
	<div class="td-value" style="float:left;margin-right:20px;padding-left:20px;">
		企业：<select id="treeqiyeTree" class="easyui-combotree" style="width:200px"></select>
	</div> 
	<!-- <div id="tt" class="easyui-tabs" style="width:500px;height:250px;">   
	    <div title="企业" style="padding:20px;display:none;">   
	      	  <select id="treeqiyeTree" class="easyui-combotree" style="width:200px"></select>   
	    </div>   
	    <div title="电压等级" data-options="closable:true" style="overflow:auto;padding:20px;display:none;">   
	        <select id="table1" class="easyui-combotree" style="width:200px"></select>     
	    </div>   
	</div>  --> 	
	<div style="float:left;margin-right:20px">
		用户变：<select id="treeyonghubianTree" class="easyui-combotree" style="width:200px"></select>
	</div> 
	<div style="float:left;margin-right:20px">
		一次接线图：<select id="treeycjxtTree" class="easyui-combotree" style="width:200px"></select>
	</div> 
	<!-- <div style="float:left;margin-right:20px" class="hidden" id="addnewName">
		新增一次接线图名称：<input type="text" id="newName" />
	</div>  -->
	<div style="float:left;margin-right:20px">
		<input type="button" id="upload" value="上传svg文件"/>
	</div> 	
	<div style="float:left;margin-right:20px">
		<input type="button" id="voltButton" value="电压等级配置"/>
	</div> 
</div>
	</div>

	<div id="tools_bottom_2">
		<div id="color_tools">
			
			<div class="color_tool" id="tool_fill">
				<label class="icon_label" for="fill_color" title="改变填充颜色"></label>
				<div class="color_block">
					<div id="fill_bg"></div>
					<div id="fill_color" class="color_block" title="改变填充颜色"></div>
				</div>
			</div>
		
			<div class="color_tool" id="tool_stroke">
				<label class="icon_label" title="改变画笔颜色"></label>
				<div class="color_block">
					<div id="stroke_bg"></div>
					<div id="stroke_color" class="color_block" title="改变画笔颜色"></div>
				</div>
				
				<label class="stroke_label">
				&nbsp;&nbsp;&nbsp;&nbsp;
					<input id="stroke_width" title="改变画笔宽度步长 1, shift点击步长 0.1" size="2" value="5" type="text" data-attr="Stroke Width"/>
				</label>

				<div id="toggle_stroke_tools" title="隐藏/显示 更多画笔工具"></div>
				
				<label class="stroke_tool">
					<select id="stroke_style" title="改变画笔虚线类型">
						<option selected="selected" value="none">&mdash;</option>
						<option value="2,2">...</option>
						<option value="5,5">- -</option>
						<option value="5,2,2,2">- .</option>
						<option value="5,2,2,2,2,2">- ..</option>
					</select>
				</label>	

 				<div class="stroke_tool dropdown" id="stroke_linejoin">
					<div id="cur_linejoin" title="Linejoin: Miter"></div>
					<button></button>
 				</div>
 				
 				<div class="stroke_tool dropdown" id="stroke_linecap">
					<div id="cur_linecap" title="Linecap: Butt"></div>
					<button></button>
 				</div>

			</div>

			<div class="color_tool" id="tool_opacity" title="改变选中项不透明度">
				<label>
					<span id="group_opacityLabel" class="icon_label"></span>
					<input id="group_opacity" size="3" value="100" type="text"/>
				</label>
				<div id="opacity_dropdown" class="dropdown">
					<button></button>
					<ul>
						<li>0%</li>
						<li>25%</li>
						<li>50%</li>
						<li>75%</li>
						<li>100%</li>
						<li class="special"><div id="opac_slider"></div></li>
					</ul>
				</div>
			</div>
		</div>

	</div>

	<div id="tools_bottom_3">
		<div id="palette_holder"><div id="palette" title="点击改变填充颜色, shift点击改变画笔颜色"></div></div>
	</div>
	<!-- <div id="copyright"><span id="copyrightLabel">Powered by</span> <a href="http://svg-edit.googlecode.com/" target="_blank">SVG-edit v2.6-beta</a></div> -->
</div>

<div id="option_lists" class="dropdown">
	<ul id="linejoin_opts">
		<li class="tool_button current" id="linejoin_miter" title="Linejoin: Miter"></li>
		<li class="tool_button" id="linejoin_round" title="Linejoin: Round"></li>
		<li class="tool_button" id="linejoin_bevel" title="Linejoin: Bevel"></li>
	</ul>
	
	<ul id="linecap_opts">
		<li class="tool_button current" id="linecap_butt" title="Linecap: Butt"></li>
		<li class="tool_button" id="linecap_square" title="Linecap: Square"></li>
		<li class="tool_button" id="linecap_round" title="Linecap: Round"></li>
	</ul>
	
	<ul id="position_opts" class="optcols3">
		<li class="push_button" id="tool_posleft" title="左对齐"></li>
		<li class="push_button" id="tool_poscenter" title="水平居中"></li>
		<li class="push_button" id="tool_posright" title="右对齐"></li>
		<li class="push_button" id="tool_postop" title="上对齐"></li>
		<li class="push_button" id="tool_posmiddle" title="垂直居中"></li>
		<li class="push_button" id="tool_posbottom" title="下对齐"></li>
	</ul>
</div>


<!-- hidden divs -->
<div id="color_picker"></div>

</div> <!-- svg_editor -->

<div id="svg_source_editor">
	<div id="svg_source_overlay"></div>
	<div id="svg_source_container">
		<div id="tool_source_back" class="toolbar_button">
			<button id="tool_source_save">保存</button>
			<button id="tool_source_cancel">取消</button>
		</div>
		<div id="save_output_btns">
			<p id="copy_save_note">复制这里面的内容到一个文本编辑器里,然后保存该文件为一个.svg的扩展名.</p>
			<button id="copy_save_done">完成</button>
		</div>
		<form>
			<textarea id="svg_source_textarea" spellcheck="false"></textarea>
		</form>
	</div>
</div>


<div id="svg_docprops">
	<div id="svg_docprops_overlay"></div>
	<div id="svg_docprops_container">
		<div id="tool_docprops_back" class="toolbar_button">
			<button id="tool_docprops_save">保存</button>
			<button id="tool_docprops_cancel">取消</button>
		</div>


		<fieldset id="svg_docprops_docprops">
			<legend id="svginfo_image_props">图像属性</legend>
			<label>
				<span id="svginfo_title">标题:</span>
				<input type="text" id="canvas_title"/>
			</label>			
	
			<fieldset id="change_resolution">
				<legend id="svginfo_dim">画布大小</legend>

				<label><span id="svginfo_width">宽:</span> <input type="text" id="canvas_width" size="6"/></label>
					
				<label><span id="svginfo_height">高:</span> <input type="text" id="canvas_height" size="6"/></label>
				
				<label>
					<select id="resolution">
						<option id="selectedPredefined" selected="selected">选择预定义:</option>
						<option>640x480</option>
						<option>800x600</option>
						<option>1024x768</option>
						<option>1280x960</option>
						<option>1600x1200</option>
						<option id="fitToContent" value="content">自适应内容</option>
					</select>
				</label>
			</fieldset>

			<fieldset id="image_save_opts">
				<legend id="includedImages">包含图像</legend>
				<label><input type="radio" name="image_opt" value="embed" checked="checked"/> <span id="image_opt_embed">嵌入数据(本地文件)</span> </label>
				<label><input type="radio" name="image_opt" value="ref"/> <span id="image_opt_ref">使用文件参考</span> </label>
			</fieldset>			
		</fieldset>

	</div>
</div>

<div id="svg_prefs">
	<div id="svg_prefs_overlay"></div>
	<div id="svg_prefs_container">
		<div id="tool_prefs_back" class="toolbar_button">
			<button id="tool_prefs_save">保存</button>
			<button id="tool_prefs_cancel">取消</button>
		</div>

		<fieldset>
			<legend id="svginfo_editor_prefs">编辑参数</legend>

			<label><span id="svginfo_lang">语言:</span>
				<!-- Source: http://en.wikipedia.org/wiki/Language_names -->
				<select id="lang_select">
				  <option id="lang_ar" value="ar">العربية</option>
					<option id="lang_cs" value="cs">Čeština</option>
					<option id="lang_de" value="de">Deutsch</option>
					<option id="lang_en" value="en" selected="selected">English</option>
					<option id="lang_es" value="es">Español</option>
					<option id="lang_fa" value="fa">فارسی</option>
					<option id="lang_fr" value="fr">Français</option>
					<option id="lang_fy" value="fy">Frysk</option>
					<option id="lang_hi" value="hi">&#2361;&#2367;&#2344;&#2381;&#2342;&#2368;, &#2361;&#2367;&#2306;&#2342;&#2368;</option>
					<option id="lang_it" value="it">Italiano</option>
					<option id="lang_ja" value="ja">日本語</option>
					<option id="lang_nl" value="nl">Nederlands</option>
					<option id="lang_pt-BR" value="pt-BR">Português (BR)</option>
					<option id="lang_ro" value="ro">Română</option>
					<option id="lang_ru" value="ru">Русский</option>
					<option id="lang_sk" value="sk">Slovenčina</option>
					<option id="lang_zh-TW" value="zh-TW">繁體中文</option>
				</select>
			</label>

			<label><span id="svginfo_icons">图标大小:</span>
				<select id="iconsize">
					<option id="icon_small" value="s">较小</option>
					<option id="icon_medium" value="m" selected="selected">中等</option>
					<option id="icon_large" value="l">较大</option>
					<option id="icon_xlarge" value="xl">特别大</option>
				</select>
			</label>

			<fieldset id="change_background">
				<legend id="svginfo_change_background">编辑背景</legend>
				<div id="bg_blocks"></div>
				<label><span id="svginfo_bg_url">URL:</span> <input type="text" id="canvas_bg_url"/></label>
				<p id="svginfo_bg_note">提示: 背景不会被保存到图像里。</p>
			</fieldset>
			
			<fieldset id="change_grid">
				<legend id="svginfo_grid_settings">网格</legend>
				<label><span id="svginfo_snap_onoff">Snapping 开关</span><input type="checkbox" value="snapping_on" id="grid_snapping_on"></label>
				<label><span id="svginfo_snap_step">Snapping 步长:</span> <input type="text" id="grid_snapping_step" size="3" value="10"/></label>
			</fieldset>

			<fieldset id="units_rulers">
				<legend id="svginfo_units_rulers">单位 & 标尺</legend>
				<label><span id="svginfo_rulers_onoff">显示标尺</span><input type="checkbox" value="show_rulers" id="show_rulers" checked></label>
				<label>
					<span id="svginfo_unit">基本单位:</span>
					<select id="base_unit">
						<option value="px">像素Pixels</option>
						<option value="cm">厘米Centimeters</option>
						<option value="mm">毫米Millimeters</option>
						<option value="in">英寸Inches</option>
						<option value="pt">点Points</option>
						<option value="pc">派卡Picas</option>
						<option value="em">Ems</option>
						<option value="ex">Exs</option>
					</select>
				</label>
				<!-- Should this be an export option instead? -->
<!-- 
				<span id="svginfo_unit_system">Unit System:</span>
				<label>
					<input type="radio" name="unit_system" value="single" checked="checked"/>
					<span id="svginfo_single_type_unit">Single type unit</span>
					<small id="svginfo_single_type_unit_sub">CSS unit type is set on root element. If a different unit type is entered in a text field, it is converted back to user units on export.</small>
				</label>
				<label>
					<input type="radio" name="unit_system" value="multi"/>
					<span id="svginfo_multi_units">Multiple CSS units</span> 
					<small id="svginfo_single_type_unit_sub">Attributes can be given different CSS units, which may lead to inconsistant results among viewers.</small>
				</label>
 -->
			</fieldset>
	
		</fieldset>

	</div>
</div>

<div id="dialog_box">
	<div id="dialog_box_overlay"></div>
	<div id="dialog_container">
		<div id="dialog_content"></div>
		<div id="dialog_buttons"></div>
	</div>
</div>

<ul id="cmenu_canvas" class="contextMenu">
	<li><a href="#cut">剪切</a></li>
	<li><a href="#copy">复制</a></li>
	<li><a href="#paste">粘贴</a></li>
	<li><a href="#paste_in_place">粘贴在这里</a></li>
	<li class="separator"><a href="#delete">删除</a></li>
	<li class="separator"><a href="#group">分组<span class="shortcut">G</span></a></li>
	<li><a href="#ungroup">取消分组<span class="shortcut">G</span></a></li>
        <li class="separator"><a href="#move_front">置前<span class="shortcut">SHFT+CTRL+]</span></a></li>
	<li><a href="#move_up">置前一层<span class="shortcut">CTRL+]</span></a></li>
	<li><a href="#move_down">置后一层<span class="shortcut">CTRL+[</span></a></li>
        <li><a href="#move_back">置后<span class="shortcut">SHFT+CTRL+[</span></a></li>
</ul>


<ul id="cmenu_layers" class="contextMenu">
	<li><a href="#dupe">复制图层...</a></li>
	<li><a href="#delete">删除图层</a></li>
	<li><a href="#merge_down">向下合并</a></li>
	<li><a href="#merge_all">合并所有</a></li>
</ul>
<!-- 弹出层      -->
<div id="peizhi" class="easyui-window" title="svg测点配置"  shadow="false" style="width: 530px; height: 400px;">
	<table style="border:1px solid #C7C2C2">
		<tr >
			<td style="width:100px;" class="textcolor"><label for="svg_id">id:</label></td> 
			<td style="width:160px"><span id="svg_id"></span></td>
			<td style="width:100px;" class="textcolor"><label for="svg_id">对应设备:</label></td>
			<td style="width:160px"><select id="shebei" class="easyui-combotree" style="width:152px"></select></td>
		</tr>
		<tr>
			<td style="text-align: center;vertical-align: middle;" ><input type="checkbox" id="byvolt"/></td>
			<td>运行状态是否关联电压等级</td>
			<td style="text-align: center;vertical-align: middle;"><input type="checkbox" id="guanlian" name="guanlian"/></td>
			<td>是否关联测点</td>
		</tr>
		<tr id="allcedian" class="hidden">
			<td class="textcolor"><label>测点:</label></td>
			<td ><select class="easyui-combotree" style="width:152px;" id="cedian"></select></td>
		</tr>
		<tr>
			<td>停运方式：</td>
			<td>
				<select id="stoptype">
					<option value="1">更换对象模式</option>
					<option value="2">修改值为--</option>
					<option value="3">变更填充色为fill</option>
					<option value="4">变更边框色Stroke</option>
				</select>
			</td>
			<td class="hidden" id="stopobjid" >停运对象ID：</td>
			<td class="hidden" id="stopobjtypeid"><input type="text" id="stoptypeId"/></td>
		</tr>
		<tr>
			<td class="hidden" id="nosingleType"><label>无信号ID方式：</label></td>
			<td class="hidden" id="nosingle"><select id="nosingleId"><option value="0">文本</option><option value="1">显示控件</option></select></td>
			<td id="kongjian" class="hidden"><label>显示控件：</label></td>
			<td id="viewId" class="hidden"><input type="text" id="viewid" /></td>
		</tr>
		<tr>
			<td class="textcolor"><label>告警方式：</label></td>
			<td><select id="alarmmode"><option value="0">边框变色</option><option value="1">填充变色</option><option value="2">文字颜色</option><option value="3">替换对象</option></select></td>
		</tr>
		<tr>
			<td class="textcolor"><label>点击事件：</label></td>
			<td><select id="clickevent"><option value="YX_Click">遥信</option><option value="YC_Click">遥测</option><option value="DEV_Click">设备事件</option></select></td>
		</tr>
		<tr>
			<td style="text-align: center;vertical-align: middle;"><input type="checkbox" name="switchId" id="switchId"/></td>
			<td class="textcolor">是否开关</td>		
		</tr>		
		<tr id="Switchopen" class="hidden">
			<td class="textcolor">开关方式：</td>
			<td ><select id="switchtype" ><option value="1">替换对象</option><option value="2">动态方式</option><option value="3">方框开关</option><option value="4">变更填充色</option><option value="5">更改边框</option></select></td>
		</tr>
		<tr id="newSwitchId"  class="hidden">
			<td class="textcolor">开关ID：</td>
			<td ><input type="text" id="idswitch"/></td>
		</tr>
		<tr>
			<td id="switchTypeId" class="hidden">开关方向：</td>
			<td class="hidden" id="switchradio"><label><input type="radio" id="xtype1" name="xtype" value="x_1"/>x1</label><label><input type="radio" id="xtype2" name="xtype" value="x_2"/>x2</label><label><input type="radio" id="ytype1" name="xtype" value="y_1"/>y1</label><label><input type="radio" id="ytype2" name="xtype" value="y_2"/>y2</label></td>
			<!-- <td class="hidden" id="oneId">左右上下</td> -->
			<!-- <td class="hidden" id="twoId"><select id="oneortwo"><option value="1">1</option><option value="2">2</option></select></td> -->
		</tr>
		<tr id="positionId" class="hidden">
			<td class="textcolor">原位置：</td>
			<td ><input type="text" id="position"/></td>
		</tr>
		<tr>
			<td><input type="button"  value="保存" id="insert"/></td>
			<td><input type="button"  value="开关按钮" id="openclose"/></td>
		</tr>
	</table>		
</div>
<!-- 新增 一次接线图-->
<div id="newAddSvg" class="easyui-window" title="新增一次接线图"  shadow="false" style="width: 530px; height: 200px;">
	<div style="padding-left:50px;margin-top:20px;font-size:20px;vertical-align:middle" >
		新增一次接线图名称：<input type="text" id="newName" style="height:30px"/>
	</div> 
	<div style="padding-left:50px;margin-top:20px;font-size:20px;vertical-align:middle" >
		排序：<input type="text" id="order" style="height:30px"/>
	</div> 
	<div style="padding-left:50px;margin-top:20px;font-size:26px" >
		<input type="button" id="insertVolt" value="提      交" style="font-size:20px"/>
	</div> 
</div>
<div id="newTable" class="easyui-window" title="电压等级配置"  shadow="false" style="width:400px; height: 300px;">
	 <table id="table1"></table>
	 <input type="button" value="提     交" id="insertVoltColor" />
</div>
<script type="text/javascript">var basePath = '<%=basePath%>';</script>
<script src="<%=basePath%>/pages/despages/svgEdit/svgEditold.js" type="text/javascript"></script> 
</body>
</html>

<%-- <script type="text/javascript" src="<%=basePath %>/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath %>/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=basePath %>/jquery-easyui-1.5.1/easyui-lang-zh_CN.js"></script> --%>

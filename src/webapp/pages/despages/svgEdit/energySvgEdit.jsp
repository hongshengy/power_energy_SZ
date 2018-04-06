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
	<title>能效总览图配置管理</title>
	<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="chrome=1"/>
	<meta name="apple-mobile-web-app-capable" content="yes"/>
	<link rel="stylesheet" href="jgraduate/css/jPicker.css" type="text/css"/>
	<link rel="stylesheet" href="jgraduate/css/jgraduate.css" type="text/css"/>
	<link rel="stylesheet" href="svg-editor.css" type="text/css"/>
	<link rel="stylesheet" href="spinbtn/JQuerySpinBtn.css" type="text/css"/>	
	<link rel="stylesheet" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/fangtian/easyui.css" type="text/css"/>
	<link rel="stylesheet" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/icon.css" type="text/css"/>
	<link rel="stylesheet" href="<%=basePath%>pages/despages/common/jquery-easyui-1.5.1/themes/color.css" type="text/css"/>
	<%-- <link rel="stylesheet" href="<%=basePath%>pages/areaEnergy/common/css/lightbox.min.css" type="text/css"/> --%>
	<link rel="stylesheet" href="<%=basePath%>pages/areaEnergy/common/css/tree.css" type="text/css"/>
	<link rel="stylesheet" href="<%=basePath%>pages/despages/common/css/common.css" type="text/css"/>	 
	<link rel="stylesheet" type="text/css"href="<%=basePath%>pages/despages/common/css/style.css">
	<script type="text/javascript" src="<%=basePath%>/pages/despages/common/js/maskJs.js"></script>
    <style>
		 
		#tools_tubiao_detail{
			z-index:3;
		}
        .right-panel{
            float: right;
            height: 100%;
            width: 100%;
            background-color: #f4f4f4;
            border-left: 1px solid #e8e8e8;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 0 10px;
            overflow: auto;
        }

        .top-panel{
            height: 41px;
            background-color: #f4f4f4;
        }

        .jxt-panel{
            height: 100%;
        }

        .item-row{
            margin: 10px;
        }

        .item-row.row2{
            margin-left: 7px;
        }

        .item-row.row2 *{
            vertical-align: middle;
        }

        .item-row.row4 {
            background-color: #fff;
        }

        .item-row.row5 span{
            font-weight: bold;
            color: #696969;
        }

        .item-row.row6 table{
            width: 100%;
        }

        .item-row.row6 table td{
            padding: 1px 0;
        }

        .item-row.row6 .fill-gap{
            width: 10px;
        }
		#dialog1 .content table{
            margin: 30px 60px;
        }

        #dialog2{
            overflow: hidden;
        }

        #dialog2 iframe{
            height: 100%;
            width: 100%;
        }
/*         .query-panel table .td-value{
            cursor: pointer;
        } */
        #newSvgDialog .content table{
            margin: 30px 60px;
        }

		#EditSvgDialog .content table{
            margin: 30px 60px;
        }      
        #divDelete .content table{
            margin: 30px 60px;
        }        
        #divUpload .content table{
            margin: 30px 60px;
        }
        .query-panel{
            padding-bottom: 5px;
            border-bottom: 4px double #dfdfdf;
        }

        .query-panel table td{
            padding: 1px 0;
        }
/*         .query-panel table tr:last-of-type{
            text-align: center;
        } */
        #divRight *
        {
        font-size:12px;
        }
        /* 元件 */
        .resizable-panel{
            width: 230px;
            height: 400px;
            overflow-y: scroll;
            background-color: #fff;
        }

        .element-buttons-panel{
            z-index: 999;
            position: absolute;
            top: 50px !important;
            left: 60px;
            border: 5px solid #cdcdcd;
            -webkit-box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
            -moz-box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
            box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
        }

        .element-buttons-panel .title{
            padding: 10px;
            font-size: 14px;
            font-family: "微软雅黑";
            background-color: #F3F3F3;
            text-align: center;
            color: #999999;
        }
		.element-buttons-panel .title .closed{
            position: absolute;
            font-size: 16px;
            top: 8px;
            right: 10px;
            color: #999999;
            padding-left: 4px;
            padding-right: 4px;
        }

        .element-buttons-panel .title .closed:hover{
            color: #EEEEEE;
            cursor: pointer;
            background-color: #FF0000;
        }
        .element-buttons-panel .content {
            background-color: #fff;
        }

        .buttons-row{
            margin: 5px 0;
            padding: 0 5px;
        }

        .buttons-row .my_tool_button{
            display: inline-block;
            width: 42px;
            height: 42px;
            margin: 0 10px;
        }

        .buttons-row .my_tool_button:hover{
            background-color: #fbedbd !important;
        }

        #tool_lineI{
            background: url('images/tubiao/tool_lineI.png');
        }

        #selftool_rect{
            background: url('images/tubiao/tool_rect.png');
        }

        #tool_yuanfangjiedi{
            background: url('images/tubiao/tool_yuanfangjiedi.png');
        }

        #tool_door{
            background: url('images/tubiao/tool_door.png');
        }

        #tool_yangan{
            background: url('images/tubiao/tool_yangan.png');
        }

        #tool_dengkong{
            background: url('images/tubiao/tool_dengkong.png');
        }

        #tool_lineOO{
            background: url('images/tubiao/tool_lineOO.png');
        }

        #tool_lineX{
            background: url('images/tubiao/tool_lineX.png');
        }

        #tool_dianzu{
            background: url('images/tubiao/tool_dianzu.png');
        }

        #tool_xinhaodeng{
            background: url('images/tubiao/tool_xinhaodeng.png');
        }

        #tool_bianyaqi{
            background: url('images/tubiao/tool_bianyaqi.png');
        }

        #tool_dianrong{
            background: url('images/tubiao/tool_dianrong.png');
        }

        #tool_dianrongzu{
            background: url('images/tubiao/tool_dianrongzu.png');
        }

        #tool_jiedi{
            background: url('images/tubiao/tool_jiedi.png');
        }

        #tool_up2JT{
            background: url('images/tubiao/tool_up2JT.png');
        }
		#tool_upJT{
			background: url('images/tubiao/tool_upJT.png');
		}
        #tool_downJT{
            background: url('images/tubiao/tool_downJT.png');
        }

        #tool_down2JT{
            background: url('images/tubiao/tool_down2JT.png');
        }

        #tool_JTinRect{
            background: url('images/tubiao/tool_JTinRect.png');
        }

        #tool_rightJT{
            background: url('images/tubiao/tool_rightJT.png');
        }

        #tool_VInCircle{
            background: url('images/tubiao/tool_VInCircle.png');
        }

        #tool_3VInCircle{
            background: url('images/tubiao/tool_3VInCircle.png');
        }

        #tool_wifi{
            background: url('images/tubiao/tool_wifi.png');
        }
        
        #tool_ee_bianyaqi{
        	background: url('images/tubiao/tool_ee_bianyaqi.png');
        }
        
        #tool_ee_dianji{
        	background: url('images/tubiao/tool_ee_dianji.png');
        }
        
        #tool_ee_hongganji{
        	background: url('images/tubiao/tool_ee_hongganji.png');
        }
        
        #tool_ee_jichuang{
        	background: url('images/tubiao/tool_ee_jichuang.png');
        }
        
/*         #tool_ee_kongtiao{
       	 	background: url('images/tubiao/tool_ee_kongtiao.png');
        } */
        
        #tool_ee_shuibeng{
        	background: url('images/tubiao/tool_ee_shuibeng.png');
        }
        
        #tool_ee_zhaoming{
        	background: url('images/tubiao/tool_ee_zhaoming.png');
        }
                                                 
        #tool_ee_guolu{
        	background: url('images/tubiao/tool_ee_guolu.png');
        }
        
        #tool_ee_fengji{
        	background: url('images/tubiao/tool_ee_fengji.png');
        }
        
        #tool_ee_dongligui{
        	background: url('images/tubiao/tool_ee_dongligui.png');
        }
        
        #tool_ee_bangonglou{
        	background: url('images/tubiao/tool_ee_bangonglou.png');
        }
        
        #tool_ee_xiaofangsheshi{
        	background: url('images/tubiao/tool_ee_xiaofangsheshi.png');
        }
        
        #tool_ee_lenqueta{
        	background: url('images/tubiao/tool_ee_lenqueta.png');
        }
        
        #tool_ee_zhongyangkongtiao{
        	background: url('images/tubiao/tool_ee_zhongyangkongtiao.png');
        }
        
        #tool_ee_fenshuiqi{
        	background: url('images/tubiao/tool_ee_fenshuiqi.png');
        }
        
        #tool_ee_kongqichuliji{
        	background: url('images/tubiao/tool_ee_kongqichuliji.png');
        }
        
        #tool_ee_fengjipanguan{
        	background: url('images/tubiao/tool_ee_fengjipanguan.png');
        }
        
        #tool_ee_biguashi{
        	background: url('images/tubiao/tool_ee_biguashi.png');
        }
        
        #tool_ee_ligui{
        	background: url('images/tubiao/tool_ee_ligui.png');
        }
        
        #tool_ee_zhongyangmoduanshebei{
        	background: url('images/tubiao/tool_ee_zhongyangmoduanshebei.png');
        }
        
        #tool_ee_taiyangnengdianchiban{
        	background: url('images/tubiao/tool_ee_taiyangnengdianchiban.png');
        }
        
        #tool_ee_kongzhiqi{
        	background: url('images/tubiao/tool_ee_kongzhiqi.png');
        }
        
        #tool_ee_nibianqi{
        	background: url('images/tubiao/tool_ee_nibianqi.png');
        }
        
        #tool_ee_xudianchi{
        	background: url('images/tubiao/tool_ee_xudianchi.png');
        }
        
        #tool_ee_louyu{
        	background: url('images/tubiao/tool_ee_louyu.png');
        }
        
        #tool_ee_shuibiao{
        	background: url('images/tubiao/tool_ee_shuibiao.png');
        }
        
        #tool_ee_libianqi{
        	background: url('images/tubiao/tool_ee_libianqi.png');
        }
        
        #tool_ee_huiliuxiang{
        	background: url('images/tubiao/tool_ee_huiliuxiang.png');
        }
        /* 2017-11-9新加的元件 */
       #tool_ee_dianciGuolu{
       		background: url('images/tubiao/tool_ee_dianciGuolu.png');
       }
       
       #tool_ee_zhengqiGuolu{
       		background: url('images/tubiao/tool_ee_zhengqiGuolu.png');
       }
       
       #tool_ee_gezhongShuiben{
       		background: url('images/tubiao/tool_ee_gezhongShuiben.png');
       }
       
      #tool_ee_xure{
      		background: url('images/tubiao/tool_ee_xure.png');
      }
      
      #tool_ee_ruanshui{
      		background: url('images/tubiao/tool_ee_ruanshui.png');
      }
      
     #tool_ee_shuichuli{
     		background: url('images/tubiao/tool_ee_shuichuli.png');
     }
     
     #tool_ee_qiShuibiao{
     		background: url('images/tubiao/tool_ee_qiShuibiao.png');
     }
     
     #tool_ee_duiLiuFa{
     		background: url('images/tubiao/tool_ee_duiLiuFa.png');
     }
     
     #tool_ee_duiLiuFaMen{
     		background: url('images/tubiao/tool_ee_duiLiuFaMen.png');
     }
     
     #tool_ee_zhengQi{
     		background: url('images/tubiao/tool_ee_zhengQi.png');
     }
     
     #tool_ee_ranQi{
     		background: url('images/tubiao/tool_ee_ranQi.png');
     }
     
     #tool_ee_changFang{
     		background: url('images/tubiao/tool_ee_changFang.png');
     }
     #tool_shuijin{
     	background: url('images/tubiao/tool_shuijin.png');
     }
        #search-button{
            display: inline-block;
            color: #444;
            outline: 1px dashed #7f7f7f;
            outline-offset: -8px;
            border-radius: 0.33em;
            width: 140px;
            max-width: 140px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 13px;
            font-family: "微软雅黑";
            text-shadow: 1px 1px 0 rgba(255,255,255, .8);
        }

        #search-button:hover{
            box-shadow: 0 3px 5px -3px rgba(0,0,0, .4);
            background: #1dce87;
            color: #fff;
            outline-color: #fff;
            text-shadow: -1px -1px 0 rgba(0,0,0, .2);
        }
        .wordDir
		{
			width:18px;
			height:18px;
			cursor:pointer;
			top:4px;
			position:relative;
			left:4px;
		}
		.pictureVertical {
     		background: url(images/wordDir.png) 0px 0px no-repeat;
		 }
		.pictureHorizontal {
     		background: url(images/wordDir.png) 0px -18px no-repeat;
		 }
		.pictureHorizontal:hover {
     		background: url(images/wordDir.png) 0px -36px no-repeat;
		 }
		.pictureVertical:hover {
     		background: url(images/wordDir.png) 0px -54px no-repeat;
		}
		.wordLeft {
			width:18px;
			height:18px;
			cursor:pointer;
			top:4px;
			position:relative;
			left:4px;
     		background: url(images/flushLeft.png) 0px 0px no-repeat;
		 }
		.wordRight {
			width:18px;
			height:18px;
			cursor:pointer;
			top:4px;
			position:relative;
			left:4px;
     		background: url(images/flushRight.png) 0px 0px no-repeat;
		 }
		.wordMiddle {
			width:18px;
			height:18px;
			cursor:pointer;
			top:4px;
			position:relative;
			left:4px;
     		background: url(images/flushMiddle.png) 0px 0px no-repeat;
		 }
        
/*         table.form-table,
table.form-table-hidden{
    table-layout: fixed;
}

table.form-table-hidden td{
    height: 30px;
    border: 1px solid #d8d8d8;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

table.form-table-hidden td{
    padding: 0;
}

table.form-table-hidden td *{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
} 

table.form-table-hidden .textbox{
    border: none;
    border-radius: 0;
} 

table.form-table-hidden .textbox-focused{
    -webkit-box-shadow: 0;;
    -moz-box-shadow: 0;
    box-shadow: 0;
} */
    </style>
</head>
<body class="easyui-layout">
<script>
	var maskobj = new maskPanelManager();
	maskobj.register();
</script>
<div data-options="region:'center', border:false">
    <div class="jxt-panel">
		<div id="svg_editor">

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

		<!-- <p>
			<a href="http://svg-edit.googlecode.com/" target="_blank">
				SVG-edit 首页
			</a>
		</p> -->

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
		<div class="push_button" id="tool_group_elements" title="分组 [G]"></div>
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
		<div id="tool_vertical" title="改变文字方向"  class="wordDir pictureVertical">
		</div>
		<div id="tool_flushLeft" title="左对齐"  class="wordLeft">
		</div>
		<div id="tool_flushRight" title="右对齐"  class="wordRight">
		</div>
		<div id="tool_flushMiddle" title="居中"  class="wordMiddle">
		</div>
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
	<div class="tool_button" id="tools_tubiao" title="元件">元件
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

        <div class="element-buttons-panel"  id="tools_tubiao_detail">
            <div class="title">
                <span>元件库</span>
                <span class="closed" id="closePanel" title="关闭">×</span>
            </div>
            <div class="resizable-panel">
                <div class="content">
                    <div class="accordion-panel" data-options="multiple:true,border:false">
                        <div title="开关设备">
                            <div class="buttons-row">
                                <span id="tool_lineI" class="my_tool_button" title="斜线"></span>
                                <span id="selftool_rect" class="my_tool_button" title="矩形"></span>
                                <span id="tool_yuanfangjiedi" class="my_tool_button" title="远方就地"></span>
                            </div>
                        </div>
                        <div title="环境设备">
                            <div class="buttons-row">
                                <span id="tool_door" class="my_tool_button" title="门禁"></span>
                                <span id="tool_yangan" class="my_tool_button" title="烟感"></span>
                                <span id="tool_dengkong" class="my_tool_button" title="灯控"></span>
                            </div>
                            <div class="buttons-row">
                                <span id="tool_shuijin" class="my_tool_button" title="水浸"></span>
                            </div>  
                        </div>
                        <div title="电器设备">
                            <div class="buttons-row">
                                <span id="tool_lineOO" class="my_tool_button" title="开关A"></span>
                                <span id="tool_lineX" class="my_tool_button" title="开关B"></span>
                                <span id="tool_dianzu" class="my_tool_button" title="电阻"></span>
                            </div>
                            <div class="buttons-row">
                                <span id="tool_xinhaodeng" class="my_tool_button" title="信号灯"></span>
                                <span id="tool_bianyaqi" class="my_tool_button" title="变压器"></span>
                                <span id="tool_dianrong" class="my_tool_button" title="电容"></span>
                            </div>
                            <div class="buttons-row">
                                <span id="tool_dianrongzu" class="my_tool_button" title="电容组"></span>
                                <span id="tool_jiedi" class="my_tool_button" title="接地"></span>
                                <span id="tool_up2JT" class="my_tool_button" title="上双箭头"></span>
                            </div>
                            <div class="buttons-row">
                                <span id="tool_upJT" class="my_tool_button" title="上单箭头"></span>
                                <span id="tool_downJT" class="my_tool_button" title="下单箭头"></span>
                                <span id="tool_down2JT" class="my_tool_button" title="下双箭头"></span>

                            </div>
                            <div class="buttons-row">
                                <span id="tool_JTinRect" class="my_tool_button" title="矩形里箭头"></span>
                                <span id="tool_rightJT" class="my_tool_button" title="向右箭头"></span>
                                <span id="tool_VInCircle" class="my_tool_button" title="圆里V"></span>
                            </div>
                            <div class="buttons-row">
                                <span id="tool_3VInCircle" class="my_tool_button" title="3个圆里V"></span>
                            </div>
                        </div>
                        <div title="能效设备">
                        	<div class="buttons-row">
                                <span id="tool_ee_bianyaqi" class="my_tool_button" title="变压器"></span>
                                <span id="tool_ee_dianji" class="my_tool_button" title="电机"></span>
                                <span id="tool_ee_hongganji" class="my_tool_button" title="烘干机"></span>
                            </div>
                            <div class="buttons-row">
                                <span id="tool_ee_jichuang" class="my_tool_button" title="机床"></span>
                                <!-- <span id="tool_ee_kongtiao" class="my_tool_button" title="空调"></span> -->
                                <span id="tool_ee_shuibeng" class="my_tool_button" title="水泵"></span>
                                <span id="tool_ee_zhaoming" class="my_tool_button" title="照明"></span>
                            </div>
                            <div class="buttons-row">
                                <span id="tool_ee_guolu" class="my_tool_button" title="锅炉"></span>
                                <span id="tool_ee_fengji" class="my_tool_button" title="风机"></span>
                                <span id="tool_ee_dongligui" class="my_tool_button" title="动力柜"></span>
                            </div> 
                            <div class="buttons-row">                                
                                <span id="tool_ee_bangonglou" class="my_tool_button" title="办公楼"></span>
                                <span id="tool_ee_xiaofangsheshi" class="my_tool_button" title="消防设施"></span>
                            </div>                           
                        </div>
                        <div title="空调系统">
                        	<div class="buttons-row">
                                <span id="tool_ee_lenqueta" class="my_tool_button" title="冷却塔"></span>
                                <span id="tool_ee_zhongyangkongtiao" class="my_tool_button" title="中央空调主机"></span>
                                <span id="tool_ee_fenshuiqi" class="my_tool_button" title="分水器"></span>
                            </div>
                            <div class="buttons-row">
                                <span id="tool_ee_kongqichuliji" class="my_tool_button" title="空气处理机"></span>
                                <span id="tool_ee_fengjipanguan" class="my_tool_button" title="风机盘管"></span>
                                <span id="tool_ee_biguashi" class="my_tool_button" title="壁挂式空调"></span>
                            </div>
                            <div class="buttons-row">
                                <span id="tool_ee_ligui" class="my_tool_button" title="立柜"></span>
                                <span id="tool_ee_zhongyangmoduanshebei" class="my_tool_button" title="中央末端设备"></span>
                            </div>
                        </div>
                        <div title="新能源">
                        	<div class="buttons-row">
                                <span id="tool_ee_taiyangnengdianchiban" class="my_tool_button" title="太阳能电池板"></span>
                                <span id="tool_ee_kongzhiqi" class="my_tool_button" title="控制器"></span>
                                <span id="tool_ee_nibianqi" class="my_tool_button" title="逆变器"></span>
                            </div>
                            <div class="buttons-row">
                                <span id="tool_ee_xudianchi" class="my_tool_button" title="蓄电池"></span>
                                <span id="tool_ee_libianqi" class="my_tool_button" title="逆变器"></span>
                                <span id="tool_ee_huiliuxiang" class="my_tool_button" title="汇流箱"></span>
                            </div>
                        </div>
                        <div title="其他">
                            <div class="buttons-row">
                                <span id="tool_wifi" class="my_tool_button" title="无信号"></span>
                                <span id="tool_ee_louyu" class="my_tool_button" title="楼宇"></span> 
                                <span id="tool_ee_shuibiao" class="my_tool_button" title="水表"></span>
                            </div>
                            <div class="buttons-row">
                            	<span id="tool_ee_dianciGuolu" class="my_tool_button" title="电磁锅炉"></span>
                                <span id="tool_ee_zhengqiGuolu" class="my_tool_button" title="蒸汽锅炉"></span> 
                                <span id="tool_ee_gezhongShuiben" class="my_tool_button" title="水泵"></span>
                            </div>
                            <div class="buttons-row">
                            	<span id="tool_ee_xure" class="my_tool_button" title="蓄热水箱"></span>
                                <span id="tool_ee_ruanshui" class="my_tool_button" title="软水水箱"></span> 
                                <span id="tool_ee_shuichuli" class="my_tool_button" title="水处理装置"></span>
                            </div>
                            <div class="buttons-row">
                            	<span id="tool_ee_qiShuibiao" class="my_tool_button" title="水表"></span>
                                <span id="tool_ee_duiLiuFa" class="my_tool_button" title="对流阀"></span> 
                                <span id="tool_ee_duiLiuFaMen" class="my_tool_button" title="阀门"></span>
                            </div>
                            <div class="buttons-row">
                            	<span id="tool_ee_zhengQi" class="my_tool_button" title="蒸汽表"></span>
                                <span id="tool_ee_ranQi" class="my_tool_button" title="燃气表"></span> 
                                <span id="tool_ee_changFang" class="my_tool_button" title="厂房"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
				&nbsp;&nbsp;
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
	</div>
</div>


<div id="divRight" data-options="region:'east', width:400, border:false">
    <div class="right-panel">
        <div class="query-panel item-row">
            <table class="form-table">
                <colgroup>
                    <col style="min-width: 85px;width: 85px;">
                    <col>
                </colgroup>
                <tbody>
                <tr>
                    <td>客户：</td>
                    <!-- <td><select id="consSelect" class="easyui-combotree" style="width:150px"></td> -->
                    <td class="td-value"><span class="toggleUser-link" id="consSelect" ></span><input type="text" id="consIdSelect" class="hidden"></td>
                    <td rowspan="2">
                        <a id="search-button" href="#">切换客户/用户变</a>
                    </td>
                </tr>
                <tr>
                    <td>能效总览图：</td>
                    <!-- <td><input id="yicitu-combobox"></td> -->
                    <td><select id="svgSelectCtl" class="easyui-combotree" style="width:130px"></select>
                    <a id="addSvgBtn" href="#" class="easyui-linkbutton c9 shadow hidden">新增</a>
                    <!-- <a id="deleteSvgBtn" href="#" class="easyui-linkbutton c9 shadow hidden">删除</a>
                    <a id="updateSvgBtn" href="#" class="easyui-linkbutton c9 shadow hidden">修改</a> -->
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <a id="uploadSvgBtn" href="#" class="easyui-linkbutton c9 shadow" style="width:120px">上传能效总览图</a>
                       <!--  <a id="voltSettingBtn" href="#" class="easyui-linkbutton c9 shadow" style="width:120px">电压等级颜色配置</a>  -->
                        
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="item-row">
            <label>设备：<select id="devSelectCtl"  class="easyui-combotree"  style="width:150px"></select></label>
        </div>
        <div class="item-row row2">
            <label><input type="checkbox" id="mpChkBox">绑定测点</label>
            <label style="margin-left: 30px;"><input type="checkbox" id="byvoltChkBox">颜色根据电压等级</label>
        </div>
        <div class="item-row">
            <label>测点：<span id="selectMpName"></span><input type="hidden" id="selectMpId"></label>
        </div>
        <div class="item-row row4">
            <table id="mpGrid"></table>
        </div>
        <div class="item-row row5">
            <span>其他配置</span>
        </div>
        <div class="item-row row6">
            <table class="form-table">
                <colgroup>
                    <col style="min-width: 75px;width: 75px;">
                    <col>
                    <col style="width: 10px;">
                    <col style="min-width: 65px;width: 65px;">
                    <col>
                </colgroup>
                <tbody>
                <tr>
                    <td>停运方式：</td>
                    <td><input class="easyui-combobox-lazyLoad" id="stopType-combobox"></td>
                    <td class="fill-gap"></td>
                    <td>停运ID：</td>
                    <td><input id="stopType-textbox" class="easyui-textbox-lazyLoad"></td>
                </tr>
                <tr>
                    <td>无信号方式：</td>
                    <td><input class="easyui-combobox-lazyLoad" id="noSingle-combobox"></td>
                    <td class="fill-gap"></td>
                    <td>无信号ID：</td>
                    <td><input class="easyui-textbox-lazyLoad" id="noSingleId"></td>
                </tr>
                <tr>
                    <td>告警方式：</td>
                    <td><input class="easyui-combobox-lazyLoad" id="alarm-combobox"></td>
                    <td class="fill-gap"></td>
                    <td>告警ID：</td>
                    <td><input class="easyui-textbox-lazyLoad" id="alarmId"></td>
                </tr>
                <tr>
                    <td>点击事件：</td>
                    <td colspan="4"><input class="easyui-combobox-lazyLoad" id="btnClick-combobox"></td>
                </tr>
                <tr>
                    <td>是否开关：</td>
                    <td colspan="4"><input id="isSwitch-button" type="checkbox"></td>
                </tr>
                <tr id="switchType-row">
                    <td>开关方式：</td>
                    <td><input class="easyui-combobox-lazyLoad" id="switchType-combobox" ></td>
                    <td class="fill-gap"></td>
                    <td>开关ID：</td>
                    <td><input class="easyui-textbox-lazyLoad" id="switchId"></td>
                </tr>               
                 <tr  id="switchDirct-row">
                    <td>开关方向：</td>
                    <td><input class="easyui-combobox-lazyLoad" id="switchDirct-combobox"></td>
                    <td class="fill-gap"></td>                    
                     <td colspan="2"><a href="#" class="easyui-linkbutton c9 shadow" id="SwitchAnimation">执行开关动画</a></td>
                </tr>
                <tr class="hidden">
                    <td><input id="position"></td>
                </tr>
                <tr>
                    <td colspan="4">
                    <a href="#" class="easyui-linkbutton c9 shadow" id="InsertMpAll">保存测点配置</a>
                    <a href="#" class="easyui-linkbutton c9 shadow" id="DeleteEnergyMpAll" style="width:100px">删除测点配置</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<!-- 新增界面 -->
<!-- <div id="newSvgDialog">
    <div class="content">
        <table>
            <tr>
                <td>一次图名称：</td>
                <td><input id="newSvgName" class="easyui-textbox-lazyLoad"></td>
            </tr>
            <tr>
                <td>排序：</td>
                <td><input id="newSvgOrder" class="easyui-textbox-lazyLoad"></td>
            </tr>
        </table>
    </div>
    <div id="buttons" style="text-align: center;">
        <a href="#"  id="newSvgBtn" class="easyui-linkbutton c9 shadow" style="width: 80px">保存</a>
        <a href="#"  id="quitSvgBtn" class="easyui-linkbutton c9 shadow" style="width: 80px">取消</a>
    </div>
</div> -->

<!-- 修改界面 -->
<!-- <div id="EditSvgDialog">
    <div class="content">
        <table>
            <tr>
                <td>一次图名称：</td>
                <td><input id="editSvgName" class="easyui-textbox-lazyLoad" style="width:150px"/><input type="hidden" id="editSvgId" /></td>
            </tr>
            <tr>
                <td>排序：</td>
                <td><input id="editSvgOrder" class="easyui-textbox-lazyLoad" style="width:150px"/></td>
            </tr>
        </table>
    </div>
    <div id="buttons2" style="text-align: center;">
        <a href="#"  id="addEditSvg" class="easyui-linkbutton c9 shadow" style="width: 80px">保存</a>
        <a href="#"  id="quitEditSvg" class="easyui-linkbutton c9 shadow" style="width: 80px">取消</a>
    </div>
     <div id="buttons">
        <a href="#"  id="quitEditSvg" class="easyui-linkbutton c9 shadow" style="width: 80px">取消</a>
    </div>
</div> -->

<!-- 电压等级弹出层 -->
<!-- <div id="volSettingDialog" >
	<div class="content">
		<table id="volGrid"></table>
	</div>
	<div id="buttons4" style="text-align: center;">
        <a href="#"  id="voltSettingColorBtn" class="easyui-linkbutton c9 shadow" style="width: 80px">保存</a>
    </div>
</div> -->

<!-- 等待弹出遮罩层 -->
<div id="divWaiting">
正在加载数据中，请等待……
</div> 
<div id="dialog2" style="display: none">
    <iframe frameborder="0"></iframe>
</div>
<script type="text/javascript">var basePath = '<%=basePath%>';</script>
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="energySvgEdit/draw_tubiao.js"></script>
<script src="js-hotkeys/jquery.hotkeys.min.js"></script>
<script src="jquerybbq/jquery.bbq.min.js"></script>
<script src="svgicons/jquery.svgicons.js"></script>
<script src="jgraduate/jquery.jgraduate.min.js"></script>
<script src="spinbtn/JQuerySpinBtn.min.js"></script>
<script src="touch.js"></script>
<script type="text/javascript" src="<%=basePath%>pages/despages/common/js/JSONUtil.js"></script>

  <script src="svgedit.js"></script>
  <script src="jquery-svg.js"></script>
  <script src="contextmenu/jquery.contextMenu.js"></script>
  <script src="pathseg.js"></script>
  <script src="browser.js"></script>
  <script src="svgtransformlist.js"></script>
  <script src="math.js"></script>
  <script src="units.js"></script>
  <script src="svgutils.js"></script>
  <script src="sanitize.js"></script>
  <script src="history.js"></script>
  <script src="historyrecording.js"></script>
  <script src="coords.js"></script>
  <script src="recalculate.js"></script>
  <script src="select.js"></script>
  <script src="draw.js"></script>
  <script src="layer.js"></script>
  <script src="path.js"></script>
  <script src="svgcanvas.js"></script>
 <!--  <script src="svg-editor.js"></script> -->
  <script src="svg-editor_E.js"></script>
  <script src="locale/locale.js"></script>
  <script src="contextmenu.js"></script>
<script src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/jquery.easyui.min.js"></script>
<script src="<%=basePath%>/pages/despages/common/jquery-easyui-1.5.1/locale/easyui-lang-zh_CN.js"></script>
<!-- always minified scripts -->
<script src="jquery-ui/jquery-ui-1.8.17.custom.min.js"></script>
<script src="jgraduate/jpicker.js"></script>
<script type="text/javascript" src="<%=basePath%>pages/despages/svgEdit/energySvgEdit.js" type="text/javascript"></script> 
</body>
</html>
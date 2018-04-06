/**
 * jQuery插件：颜色拾取器
 * 
 * @author  Karson
 * @url     http://blog.iplaybus.com
 * @name    jquery.colorpicker.js
 * @since   2012-6-4 15:58:41
 */
(function($) {
    var ColorHex=new Array('00','33','66','99','CC','FF');
    var SpColorHex=new Array('FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF');
    $.fn.colorpicker = function(options) {
        var opts = jQuery.extend({}, jQuery.fn.colorpicker.defaults, options);
        initColor();
        return this.each(function(){
            var obj = $(this);
            obj.bind(opts.event,function(){
                //定位
                var ttop  = $(this).offset().top;     //控件的定位点高
                var thei  = $(this).height();  //控件本身的高
                var twid  = $(this).width();  //控件本身的宽
                var tleft = $(this).offset().left;    //控件的定位点宽
                //当右侧区域显示不下控件，放在左侧显示
                if (window.document.body.clientWidth-tleft<$("#colorpanel").width()){
                	tleft = tleft-$("#colorpanel").width()+twid;
                }
                //当下方显示不下控件，就显示在上方
                if(window.document.body.clientHeight-ttop<$("#colorpanel").height()){
                	ttop = ttop-$("#colorpanel").height()-1.5*thei;
                }
                $("#colorpanel").css({
                    top:ttop+thei+5,
                    left:tleft
                }).show().focus();
                var target = opts.target ? $(opts.target) : obj;
                if(target.data("color") == null){
                    target.data("color",target.css("color"));
                }
                if(target.data("value") == null){
                    target.data("value",target.val());
                }
          
                $("#_creset").bind("click",function(){
                    target.css("color", target.data("color")).val(target.data("value"));
                    $("#colorpanel").hide();
                    opts.reset(obj);
                });
          
                $("#CT tr td").unbind("click").mouseover(function(){
                    var color=$(this).css("background-color");
                    $("#DisColor").css("background",color);
                    $("#HexColor").val($(this).attr("rel"));
                }).click(function(){
                    var color=$(this).attr("rel");
                    color = opts.ishex ? color : getRGBColor(color);
                    if(opts.fillcolor) target.val(color);
                    target.css("color",color);
                    $("#colorpanel").hide();
                    $("#_creset").unbind("click");
                    opts.success(obj,color);
                });
          
            });
        });
    
        function initColor(){
            $("body").append('<div id="colorpanel" style="position: absolute; display: none;"></div>');
            var colorTable = '';
            var colorValue = '';
            if($.browser.msie && ($.browser.version==6.0||$.browser.version==7.0)){
            	colorTable = 
            		'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#003300" style="background-color:#003300">'+
					'<td width=11 rel="#006600" style="background-color:#006600">'+
					'<td width=11 rel="#009900" style="background-color:#009900">'+
					'<td width=11 rel="#00CC00" style="background-color:#00CC00">'+
					'<td width=11 rel="#00FF00" style="background-color:#00FF00">'+
					'<td width=11 rel="#330000" style="background-color:#330000">'+
					'<td width=11 rel="#333300" style="background-color:#333300">'+
					'<td width=11 rel="#336600" style="background-color:#336600">'+
					'<td width=11 rel="#339900" style="background-color:#339900">'+
					'<td width=11 rel="#33CC00" style="background-color:#33CC00">'+
					'<td width=11 rel="#33FF00" style="background-color:#33FF00">'+
					'<td width=11 rel="#660000" style="background-color:#660000">'+
					'<td width=11 rel="#663300" style="background-color:#663300">'+
					'<td width=11 rel="#666600" style="background-color:#666600">'+
					'<td width=11 rel="#669900" style="background-color:#669900">'+
					'<td width=11 rel="#66CC00" style="background-color:#66CC00">'+
					'<td width=11 rel="#66FF00" style="background-color:#66FF00">'+
					'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#333333" style="background-color:#333333">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#000033" style="background-color:#000033">'+
					'<td width=11 rel="#003333" style="background-color:#003333">'+
					'<td width=11 rel="#006633" style="background-color:#006633">'+
					'<td width=11 rel="#009933" style="background-color:#009933">'+
					'<td width=11 rel="#00CC33" style="background-color:#00CC33">'+
					'<td width=11 rel="#00FF33" style="background-color:#00FF33">'+
					'<td width=11 rel="#330033" style="background-color:#330033">'+
					'<td width=11 rel="#333333" style="background-color:#333333">'+
					'<td width=11 rel="#336633" style="background-color:#336633">'+
					'<td width=11 rel="#339933" style="background-color:#339933">'+
					'<td width=11 rel="#33CC33" style="background-color:#33CC33">'+
					'<td width=11 rel="#33FF33" style="background-color:#33FF33">'+
					'<td width=11 rel="#660033" style="background-color:#660033">'+
					'<td width=11 rel="#663333" style="background-color:#663333">'+
					'<td width=11 rel="#666633" style="background-color:#666633">'+
					'<td width=11 rel="#669933" style="background-color:#669933">'+
					'<td width=11 rel="#66CC33" style="background-color:#66CC33">'+
					'<td width=11 rel="#66FF33" style="background-color:#66FF33">'+
					'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#666666" style="background-color:#666666">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#000066" style="background-color:#000066">'+
					'<td width=11 rel="#003366" style="background-color:#003366">'+
					'<td width=11 rel="#006666" style="background-color:#006666">'+
					'<td width=11 rel="#009966" style="background-color:#009966">'+
					'<td width=11 rel="#00CC66" style="background-color:#00CC66">'+
					'<td width=11 rel="#00FF66" style="background-color:#00FF66">'+
					'<td width=11 rel="#330066" style="background-color:#330066">'+
					'<td width=11 rel="#333366" style="background-color:#333366">'+
					'<td width=11 rel="#336666" style="background-color:#336666">'+
					'<td width=11 rel="#339966" style="background-color:#339966">'+
					'<td width=11 rel="#33CC66" style="background-color:#33CC66">'+
					'<td width=11 rel="#33FF66" style="background-color:#33FF66">'+
					'<td width=11 rel="#660066" style="background-color:#660066">'+
					'<td width=11 rel="#663366" style="background-color:#663366">'+
					'<td width=11 rel="#666666" style="background-color:#666666">'+
					'<td width=11 rel="#669966" style="background-color:#669966">'+
					'<td width=11 rel="#66CC66" style="background-color:#66CC66">'+
					'<td width=11 rel="#66FF66" style="background-color:#66FF66">'+
					'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#999999" style="background-color:#999999">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#000099" style="background-color:#000099">'+
					'<td width=11 rel="#003399" style="background-color:#003399">'+
					'<td width=11 rel="#006699" style="background-color:#006699">'+
					'<td width=11 rel="#009999" style="background-color:#009999">'+
					'<td width=11 rel="#00CC99" style="background-color:#00CC99">'+
					'<td width=11 rel="#00FF99" style="background-color:#00FF99">'+
					'<td width=11 rel="#330099" style="background-color:#330099">'+
					'<td width=11 rel="#333399" style="background-color:#333399">'+
					'<td width=11 rel="#336699" style="background-color:#336699">'+
					'<td width=11 rel="#339999" style="background-color:#339999">'+
					'<td width=11 rel="#33CC99" style="background-color:#33CC99">'+
					'<td width=11 rel="#33FF99" style="background-color:#33FF99">'+
					'<td width=11 rel="#660099" style="background-color:#660099">'+
					'<td width=11 rel="#663399" style="background-color:#663399">'+
					'<td width=11 rel="#666699" style="background-color:#666699">'+
					'<td width=11 rel="#669999" style="background-color:#669999">'+
					'<td width=11 rel="#66CC99" style="background-color:#66CC99">'+
					'<td width=11 rel="#66FF99" style="background-color:#66FF99">'+
					'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#CCCCCC" style="background-color:#CCCCCC">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#0000CC" style="background-color:#0000CC">'+
					'<td width=11 rel="#0033CC" style="background-color:#0033CC">'+
					'<td width=11 rel="#0066CC" style="background-color:#0066CC">'+
					'<td width=11 rel="#0099CC" style="background-color:#0099CC">'+
					'<td width=11 rel="#00CCCC" style="background-color:#00CCCC">'+
					'<td width=11 rel="#00FFCC" style="background-color:#00FFCC">'+
					'<td width=11 rel="#3300CC" style="background-color:#3300CC">'+
					'<td width=11 rel="#3333CC" style="background-color:#3333CC">'+
					'<td width=11 rel="#3366CC" style="background-color:#3366CC">'+
					'<td width=11 rel="#3399CC" style="background-color:#3399CC">'+
					'<td width=11 rel="#33CCCC" style="background-color:#33CCCC">'+
					'<td width=11 rel="#33FFCC" style="background-color:#33FFCC">'+
					'<td width=11 rel="#6600CC" style="background-color:#6600CC">'+
					'<td width=11 rel="#6633CC" style="background-color:#6633CC">'+
					'<td width=11 rel="#6666CC" style="background-color:#6666CC">'+
					'<td width=11 rel="#6699CC" style="background-color:#6699CC">'+
					'<td width=11 rel="#66CCCC" style="background-color:#66CCCC">'+
					'<td width=11 rel="#66FFCC" style="background-color:#66FFCC">'+
					'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#FFFFFF" style="background-color:#FFFFFF">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#0000FF" style="background-color:#0000FF">'+
					'<td width=11 rel="#0033FF" style="background-color:#0033FF">'+
					'<td width=11 rel="#0066FF" style="background-color:#0066FF">'+
					'<td width=11 rel="#0099FF" style="background-color:#0099FF">'+
					'<td width=11 rel="#00CCFF" style="background-color:#00CCFF">'+
					'<td width=11 rel="#00FFFF" style="background-color:#00FFFF">'+
					'<td width=11 rel="#3300FF" style="background-color:#3300FF">'+
					'<td width=11 rel="#3333FF" style="background-color:#3333FF">'+
					'<td width=11 rel="#3366FF" style="background-color:#3366FF">'+
					'<td width=11 rel="#3399FF" style="background-color:#3399FF">'+
					'<td width=11 rel="#33CCFF" style="background-color:#33CCFF">'+
					'<td width=11 rel="#33FFFF" style="background-color:#33FFFF">'+
					'<td width=11 rel="#6600FF" style="background-color:#6600FF">'+
					'<td width=11 rel="#6633FF" style="background-color:#6633FF">'+
					'<td width=11 rel="#6666FF" style="background-color:#6666FF">'+
					'<td width=11 rel="#6699FF" style="background-color:#6699FF">'+
					'<td width=11 rel="#66CCFF" style="background-color:#66CCFF">'+
					'<td width=11 rel="#66FFFF" style="background-color:#66FFFF">'+
					'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#FF0000" style="background-color:#FF0000">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#990000" style="background-color:#990000">'+
					'<td width=11 rel="#993300" style="background-color:#993300">'+
					'<td width=11 rel="#996600" style="background-color:#996600">'+
					'<td width=11 rel="#999900" style="background-color:#999900">'+
					'<td width=11 rel="#99CC00" style="background-color:#99CC00">'+
					'<td width=11 rel="#99FF00" style="background-color:#99FF00">'+
					'<td width=11 rel="#CC0000" style="background-color:#CC0000">'+
					'<td width=11 rel="#CC3300" style="background-color:#CC3300">'+
					'<td width=11 rel="#CC6600" style="background-color:#CC6600">'+
					'<td width=11 rel="#CC9900" style="background-color:#CC9900">'+
					'<td width=11 rel="#CCCC00" style="background-color:#CCCC00">'+
					'<td width=11 rel="#CCFF00" style="background-color:#CCFF00">'+
					'<td width=11 rel="#FF0000" style="background-color:#FF0000">'+
					'<td width=11 rel="#FF3300" style="background-color:#FF3300">'+
					'<td width=11 rel="#FF6600" style="background-color:#FF6600">'+
					'<td width=11 rel="#FF9900" style="background-color:#FF9900">'+
					'<td width=11 rel="#FFCC00" style="background-color:#FFCC00">'+
					'<td width=11 rel="#FFFF00" style="background-color:#FFFF00">'+
					'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#00FF00" style="background-color:#00FF00">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#990033" style="background-color:#990033">'+
					'<td width=11 rel="#993333" style="background-color:#993333">'+
					'<td width=11 rel="#996633" style="background-color:#996633">'+
					'<td width=11 rel="#999933" style="background-color:#999933">'+
					'<td width=11 rel="#99CC33" style="background-color:#99CC33">'+
					'<td width=11 rel="#99FF33" style="background-color:#99FF33">'+
					'<td width=11 rel="#CC0033" style="background-color:#CC0033">'+
					'<td width=11 rel="#CC3333" style="background-color:#CC3333">'+
					'<td width=11 rel="#CC6633" style="background-color:#CC6633">'+
					'<td width=11 rel="#CC9933" style="background-color:#CC9933">'+
					'<td width=11 rel="#CCCC33" style="background-color:#CCCC33">'+
					'<td width=11 rel="#CCFF33" style="background-color:#CCFF33">'+
					'<td width=11 rel="#FF0033" style="background-color:#FF0033">'+
					'<td width=11 rel="#FF3333" style="background-color:#FF3333">'+
					'<td width=11 rel="#FF6633" style="background-color:#FF6633">'+
					'<td width=11 rel="#FF9933" style="background-color:#FF9933">'+
					'<td width=11 rel="#FFCC33" style="background-color:#FFCC33">'+
					'<td width=11 rel="#FFFF33" style="background-color:#FFFF33">'+
					'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#0000FF" style="background-color:#0000FF">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#990066" style="background-color:#990066">'+
					'<td width=11 rel="#993366" style="background-color:#993366">'+
					'<td width=11 rel="#996666" style="background-color:#996666">'+
					'<td width=11 rel="#999966" style="background-color:#999966">'+
					'<td width=11 rel="#99CC66" style="background-color:#99CC66">'+
					'<td width=11 rel="#99FF66" style="background-color:#99FF66">'+
					'<td width=11 rel="#CC0066" style="background-color:#CC0066">'+
					'<td width=11 rel="#CC3366" style="background-color:#CC3366">'+
					'<td width=11 rel="#CC6666" style="background-color:#CC6666">'+
					'<td width=11 rel="#CC9966" style="background-color:#CC9966">'+
					'<td width=11 rel="#CCCC66" style="background-color:#CCCC66">'+
					'<td width=11 rel="#CCFF66" style="background-color:#CCFF66">'+
					'<td width=11 rel="#FF0066" style="background-color:#FF0066">'+
					'<td width=11 rel="#FF3366" style="background-color:#FF3366">'+
					'<td width=11 rel="#FF6666" style="background-color:#FF6666">'+
					'<td width=11 rel="#FF9966" style="background-color:#FF9966">'+
					'<td width=11 rel="#FFCC66" style="background-color:#FFCC66">'+
					'<td width=11 rel="#FFFF66" style="background-color:#FFFF66">'+
					'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#FFFF00" style="background-color:#FFFF00">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#990099" style="background-color:#990099">'+
					'<td width=11 rel="#993399" style="background-color:#993399">'+
					'<td width=11 rel="#996699" style="background-color:#996699">'+
					'<td width=11 rel="#999999" style="background-color:#999999">'+
					'<td width=11 rel="#99CC99" style="background-color:#99CC99">'+
					'<td width=11 rel="#99FF99" style="background-color:#99FF99">'+
					'<td width=11 rel="#CC0099" style="background-color:#CC0099">'+
					'<td width=11 rel="#CC3399" style="background-color:#CC3399">'+
					'<td width=11 rel="#CC6699" style="background-color:#CC6699">'+
					'<td width=11 rel="#CC9999" style="background-color:#CC9999">'+
					'<td width=11 rel="#CCCC99" style="background-color:#CCCC99">'+
					'<td width=11 rel="#CCFF99" style="background-color:#CCFF99">'+
					'<td width=11 rel="#FF0099" style="background-color:#FF0099">'+
					'<td width=11 rel="#FF3399" style="background-color:#FF3399">'+
					'<td width=11 rel="#FF6699" style="background-color:#FF6699">'+
					'<td width=11 rel="#FF9999" style="background-color:#FF9999">'+
					'<td width=11 rel="#FFCC99" style="background-color:#FFCC99">'+
					'<td width=11 rel="#FFFF99" style="background-color:#FFFF99">'+
					'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#00FFFF" style="background-color:#00FFFF">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#9900CC" style="background-color:#9900CC">'+
					'<td width=11 rel="#9933CC" style="background-color:#9933CC">'+
					'<td width=11 rel="#9966CC" style="background-color:#9966CC">'+
					'<td width=11 rel="#9999CC" style="background-color:#9999CC">'+
					'<td width=11 rel="#99CCCC" style="background-color:#99CCCC">'+
					'<td width=11 rel="#99FFCC" style="background-color:#99FFCC">'+
					'<td width=11 rel="#CC00CC" style="background-color:#CC00CC">'+
					'<td width=11 rel="#CC33CC" style="background-color:#CC33CC">'+
					'<td width=11 rel="#CC66CC" style="background-color:#CC66CC">'+
					'<td width=11 rel="#CC99CC" style="background-color:#CC99CC">'+
					'<td width=11 rel="#CCCCCC" style="background-color:#CCCCCC">'+
					'<td width=11 rel="#CCFFCC" style="background-color:#CCFFCC">'+
					'<td width=11 rel="#FF00CC" style="background-color:#FF00CC">'+
					'<td width=11 rel="#FF33CC" style="background-color:#FF33CC">'+
					'<td width=11 rel="#FF66CC" style="background-color:#FF66CC">'+
					'<td width=11 rel="#FF99CC" style="background-color:#FF99CC">'+
					'<td width=11 rel="#FFCCCC" style="background-color:#FFCCCC">'+
					'<td width=11 rel="#FFFFCC" style="background-color:#FFFFCC">'+
					'<tr height=12>'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#FF00FF" style="background-color:#FF00FF">'+
					'<td width=11 rel="#000000" style="background-color:#000000">'+
					'<td width=11 rel="#9900FF" style="background-color:#9900FF">'+
					'<td width=11 rel="#9933FF" style="background-color:#9933FF">'+
					'<td width=11 rel="#9966FF" style="background-color:#9966FF">'+
					'<td width=11 rel="#9999FF" style="background-color:#9999FF">'+
					'<td width=11 rel="#99CCFF" style="background-color:#99CCFF">'+
					'<td width=11 rel="#99FFFF" style="background-color:#99FFFF">'+
					'<td width=11 rel="#CC00FF" style="background-color:#CC00FF">'+
					'<td width=11 rel="#CC33FF" style="background-color:#CC33FF">'+
					'<td width=11 rel="#CC66FF" style="background-color:#CC66FF">'+
					'<td width=11 rel="#CC99FF" style="background-color:#CC99FF">'+
					'<td width=11 rel="#CCCCFF" style="background-color:#CCCCFF">'+
					'<td width=11 rel="#CCFFFF" style="background-color:#CCFFFF">'+
					'<td width=11 rel="#FF00FF" style="background-color:#FF00FF">'+
					'<td width=11 rel="#FF33FF" style="background-color:#FF33FF">'+
					'<td width=11 rel="#FF66FF" style="background-color:#FF66FF">'+
					'<td width=11 rel="#FF99FF" style="background-color:#FF99FF">'+
					'<td width=11 rel="#FFCCFF" style="background-color:#FFCCFF">'+
					'<td width=11 rel="#FFFFFF" style="background-color:#FFFFFF">';
            }else{
	            for(i=0;i<2;i++){
	                for(j=0;j<6;j++){
	                    colorTable=colorTable+'<tr height=12>'
	                    colorTable=colorTable+'<td width=11 rel="#000000" style="background-color:#000000">'
	                    colorValue = i==0 ? ColorHex[j]+ColorHex[j]+ColorHex[j] : SpColorHex[j];
	                    colorTable=colorTable+'<td width=11 rel="#'+colorValue+'" style="background-color:#'+colorValue+'">'
	                    colorTable=colorTable+'<td width=11 rel="#000000" style="background-color:#000000">'
	                    for (k=0;k<3;k++){
	                        for (l=0;l<6;l++){
	                            colorValue = ColorHex[k+i*3]+ColorHex[l]+ColorHex[j];
	                            colorTable=colorTable+'<td width=11 rel="#'+colorValue+'" style="background-color:#'+colorValue+'">'
	                        }
	                    }
	                }
	            }
            }
            colorTable='<table width=253 border="0" cellspacing="0" cellpadding="0" style="border:1px solid #000;">'
            +'<tr height=30><td colspan=21 bgcolor=#cccccc>'
            +'<table cellpadding="0" cellspacing="1" border="0" style="border-collapse: collapse">'
            +'<tr><td width="3"><td><input type="text" id="DisColor" size="6" disabled style="border:solid 1px #000000;background-color:#ffff00"></td>'
            +'<td width="3"><td><input type="text" id="HexColor" size="7" style="border:inset 1px;font-family:Arial;" value="#000000"><a href="javascript:void(0);" id="_cclose">关闭</a> | <a href="javascript:void(0);" id="_creset">清除</a></td></tr></table></td></table>'
            +'<table id="CT" border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse" bordercolor="000000"  style="cursor:pointer;">'
            +colorTable+'</table>';
            $("#colorpanel").html(colorTable);
            //绑定失去焦点事件
            $("#colorpanel").live('blur',function(){
            	setTimeout("$(\"#colorpanel\").hide();",250);
            	//$("#colorpanel").hide();
            	return false;
            });
            
            $("#_cclose").live('click',function(){
                $("#colorpanel").hide();
                return false;
            }).css({
                "font-size":"12px",
                "padding-left":"20px"
            });
        }
        
        function getRGBColor(color) {
            var result;
            if ( color && color.constructor == Array && color.length == 3 )
                color = color;
            if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
                color = [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];
            if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
                color =[parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];
            if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
                color =[parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];
            if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
                color =[parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];
            return "rgb("+color[0]+","+color[1]+","+color[2]+")";
        }
    };
    jQuery.fn.colorpicker.defaults = {
        ishex : true, //是否使用16进制颜色值
        fillcolor:false,  //是否将颜色值填充至对象的val中
        target: null, //目标对象
        event: 'click', //颜色框显示的事件
        success:function(){}, //回调函数
        reset:function(){}
    };
})(jQuery);
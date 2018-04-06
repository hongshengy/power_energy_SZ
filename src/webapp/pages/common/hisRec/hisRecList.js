/**
 * 需要head.jsp支持，支持一个页面设置多个历史记录下拉框，使用参考页面tgUnityViewMain.jsp【台区统一视图新】
 * config = {
 *  appendId:作用的对象,
 *  key:字段存储的key值
 * }
 */
function LocalHisRec(config){
	config = config || {};
	this.appendId = config.appendId||'';
	this.key = config.key||'';
	this.index = LocalHisRec.index++;
	if(isNullOrEmpty(config.id)){
		alert("id必须配置！");
		return;
	}
	if(isNullOrEmpty(this.appendId)){
		alert("appendId不能为空！");
		return;
	}
	var me = this;
    //作用对象增加事件
    $("#"+this.appendId).focus(function(){
    	me.showHisList(this);
    })/*.blur(function(){
    	me.hideHisList();
    })*/;
    LocalHisRec.holdObjs[config.id] = this;
}

//初始化配置
/**
 *  fileName:存储的文件名【存储区】，一个页面一个，可以设置过期时间，默认30天,
 *  expires:文件过期时间，默认为30天,
 */
LocalHisRec.holdObjs = {};
LocalHisRec.index = 0;
LocalHisRec.config = function(fileName,expires){
	if(isDefined(fileName)){
    	LocalHisRec.fileName = fileName;
    }else{
    	LocalHisRec.fileName = window.location.href;
    }
    if(isDefined(expires)){
    	LocalHisRec.expires = expires;
    }else{
    	LocalHisRec.expires = 2592000;//默认30天有效
    }
    //创建userdata div
    LocalHisRec.createMemory();
}
LocalHisRec.createMemory = function(){
	LocalHisRec.memory = document.createElement("div");
    LocalHisRec.memory.addBehavior ("#default#userData");
    LocalHisRec.memory.style.display = "none";
    document.body.appendChild(LocalHisRec.memory);
    if(isDefined(LocalHisRec.expires) && !isNaN(LocalHisRec.expires)){
        var times = (new Date()).getTime()+parseInt(LocalHisRec.expires)*1000;
     	LocalHisRec.memory.expires =  (new Date(times)).toUTCString(); 
    }
}

LocalHisRec.prototype = {
	//设置或增加缓存
    set: function(value) {
        LocalHisRec.memory.setAttribute(this.key, value);
        LocalHisRec.memory.save(LocalHisRec.fileName);
        return value;
    },
    //通过key值得到缓存
    get: function(){
        LocalHisRec.memory.load(LocalHisRec.fileName);
        return LocalHisRec.memory.getAttribute(this.key);
    },
    //通过key值删除缓存
    del: function() {
        LocalHisRec.memory.removeAttribute(this.key);
        LocalHisRec.memory.save(LocalHisRec.fileName);
    },
    //创建历史记录下拉框div
    createHisDiv: function(obj){
    	var hisDiv = document.createElement("div");
		hisDiv.id="query_hisDiv"+this.index;
		hisDiv.style.height=132;
		hisDiv.style.width=obj.offsetWidth+2;
		hisDiv.style.zIndex=99990;
		hisDiv.style.position = "absolute";
		hisDiv.style.top = getY(obj)+obj.offsetHeight;
		hisDiv.style.left = getX(obj);
		hisDiv.style.display='';
		hisDiv.style.backgroundColor = "#fff";
		hisDiv.style.border="1px solid gray";
		//hisDiv.style.overflowY = "auto";
		document.body.appendChild(hisDiv);
		return hisDiv;
    },
    //显示历史记录下拉框
    showHisList: function(obj){
   		var arrStr = this.get(this.key);
   		if(isNullOrEmpty(arrStr)){
   			return;
   		}
    	if(!$("#query_hisDiv"+this.index).is("div")){
			this.refreshHisList(obj,this.createHisDiv(obj));
		}else{
			this.refreshHisList(obj,document.getElementById("query_hisDiv"+this.index));
			//$("#query_hisDiv"+this.index).slideDown("normal");
			$("#query_hisDiv"+this.index).show();
		}
    },
    //隐藏历史下拉框
    hideHisList: function(){
    	//$("#query_hisDiv"+this.index).slideUp("normal");
    	$("#query_hisDiv"+this.index).hide();
    },
    //刷新历史列表
    refreshHisList: function(obj,hisDiv){
    	var arrStr = this.get(this.key);
    	//取得历史记录，构造列表
		var html = "<div style='position:absolute;top:0px;left:0px;background-color:#fff;overflow-y:auto;width:"+(hisDiv.clientWidth)+";height:110px;'><table style='width:100%;' cellSpacing='0' cellPadding='0'>";
		if(!isNullOrEmpty(arrStr)){
			var arr = arrStr.split(",");
			$.each(arr,function(i,val){
				html += "<tr style='cursor:hand;'><td style='padding:2px;border-bottom:1px solid #ccc;word-break:break-all;'>"+val+"</td><td style='width:18px;height:22px;border-bottom:1px solid #ccc;'><img title='删除' style='cursor:hand;' src='\\aueic\\images\\img\\delete.gif'/></td></tr>";
			});
			html += "</table></div>";
		}
		html += "<div style='position:absolute;color:#ccc;cursor:hand;border:1px solid #ccc;width:85px;bottom:0px;left:0px;padding-top:2px;padding-right:5px;padding-left:5px;'>清除历史记录</div>";
		html += "<div style='position:absolute;color:#ccc;cursor:hand;border:1px solid #ccc;width:36px;padding-top:2px;padding-right:5px;padding-left:5px;bottom:0px;right:0px;'>关闭</div>";
		
		hisDiv.innerHTML = html;
		var me = this;
		$(hisDiv).children("div:first").find("TR").each(function(){
			$(this).children("td:first").click(function(){
				obj.value = $(this).text();
				me.hideHisList();
			});
			$(this).contents().find("img").click(function(){
				var outtext = $(this).parent().parent().children("td:first").text();
				$(this).parent().parent().remove();
				me.delHisRec(outtext);
			});
			$(this).mouseover(function(){
				this.style.backgroundColor="#66C6C3";
			});
			$(this).mouseout(function(){
				this.style.backgroundColor="#fff";
			});
		});
		//清除历史记录
		$(hisDiv).children("div:eq(1)").mouseover(function(){
			$(this).css({"color":"#FF8C00","border-color":"#FF8C00"});
		}).mouseout(function(){
			$(this).css({"color":"#CCC","border-color":"#CCC"});
		}).click(function(){
			MessageBox('确定清除历史记录吗？','系统提示',Q_ICON,MB_YESNO,function(result){
				if(result==MB_YES){
					me.hideHisList();
					me.del();
				}
			});
		});
		//关闭历史记录框
		$(hisDiv).children("div:last").mouseover(function(){
			$(this).css({"color":"#FF8C00","border-color":"#FF8C00"});
		}).mouseout(function(){
			$(this).css({"color":"#CCC","border-color":"#CCC"});
		}).click(function(){
			me.hideHisList();
		});
    },
    //增加记录
    addHisRec: function(addVal,maxRecs/*最大记录数，默认为5个*/,flag/*查询后，是否隐藏下拉框*/){
    	if(isNullOrEmpty(addVal.trim())){
    		return;
    	}
    	var maxRecs = maxRecs || 5;
    	var arrStr = this.get(this.key);
		var arr = [];
		if(!isNullOrEmpty(arrStr)){
			arr = arrStr.split(",");
			//去掉重复的历史记录
			var index = $.inArray(addVal, arr);
			if(index>=0){
				arr.splice(index,1);
			}
			//超过最大记录数，去掉最后一个
			if(arr.length>=maxRecs){
				arr.pop();
			}
		}
		arr.unshift(addVal);
		if(flag){
			this.hideHisList();
		}
		this.set(arr);
    },
    //删除指定值的记录
    delHisRec: function(delVal){
    	var arr = this.get(this.key).split(",");
		var index = $.inArray(delVal, arr);
		arr.splice(index,1);
		//删除的是最后一个记录，自动隐藏下拉框
		if(arr.length==0){
			this.hideHisList();
		}
		this.set(arr);
    }
};
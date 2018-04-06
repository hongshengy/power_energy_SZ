/**
 * tab切换类，用于页面的中两个tab的查询条件不一致的情况，使用例子参见deviceModelManageMain.jsp（设备型号管理）
 * 需要/aueic/WebRoot/js/util/Util.js的支持
 * @param {} config
 * config参数示例：
 * {
 *  tabCId:tab容器ID,
 *  frameCId:frame容器ID,
 *  basePath:路径,
 *  formName:'thisform',
 *  baseParam:'',作为每个tabs元素url的参数
 * 	tabs: [{
 * 		tabId:
 * 		tabName:
 * 		frameId:
 * 		url:
 * 	 },...],
 *  tabIndex:0,
 * }
 */
function UpTabManage(config){
	config = config ||{};
	this.tabCId = config.tabCId || '';
	this.frameCId = config.frameCId || '';
	this.basePath = config.basePath || '';
	this.formName = config.formName || 'thisform';
	this.tabs = config.tabs || [];
	this.tabIndex = config.tabIndex || 0;//默认是0，表示显示第一个tab
	this.curIndex = this.tabIndex;//当前的tabIndex
	this.tabFrameMap = {};
	this.baseParam = config.baseParam || '';
	this.tabActiveClass = "x-tab-strip-active";
}
UpTabManage.prototype = {
	/**
	 * 初始化方法
	 */
	init:function(){
		//生成tab
		this.genTabHtml();
		//生成frame
		this.genFrameHtml();
		//构造tabFrameMap
		this.setTabFrameMap();
		//给tabs增加click属性，默认为0
		for(var i=0;i<this.tabs.length;i++){
			if(this.tabIndex == i){
				this.tabs[i].click = 1;
			}else{
				this.tabs[i].click = 0;
			}
		}
		//初始化加载
		this.initFrame(this.tabFrameMap[this.tabIndex]);
	},
	/**
	 * 生成tabHtml代码
	 */
	genTabHtml:function(){
		var htmlArr = [];
		htmlArr.push('<div style="border: #ffffff 0px solid;">');
		htmlArr.push('<div class="x-tab-strip-wrap" style="border: #ffffff 0px solid;padding-left:5px;">');
		htmlArr.push('<table class="x-tab-strip x-tab-strip-top" style="border: #ffffff 0px solid;"><tr>');
		for(var i=0;i<this.tabs.length;i++){
			if(i == this.tabIndex){
				htmlArr.push('<td style="padding-right:5px;" id="'+this.tabs[i].tabId+'" class="'+this.tabActiveClass+'">');
			}else{
				htmlArr.push('<td style="padding-right:5px;" id="'+this.tabs[i].tabId+'">');
			}
			htmlArr.push('<a class="x-tab-right"><em class="x-tab-left"><span class="x-tab-strip-inner"><span class="x-tab-strip-text">');
			htmlArr.push(this.tabs[i].tabName);
			htmlArr.push('</span></span></em></a></td>');
		}
		htmlArr.push('</tr></table></table></div></div>');
		jQuery("#"+this.tabCId).html(htmlArr.join(''));
		
		var me = this;
		//注册click事件
		jQuery('#'+this.tabCId).contents().find("td").click(function(){
			var tabId = $(this).attr("id");
			me.onClickTab(tabId);
		});
	},
	/**
	 * 生成iframe Html代码
	 */
	genFrameHtml:function(){
		var htmlArr = [];
		htmlArr.push('<table style="height:100%;width:100%;" cellspacing="0" cellpadding="0" border="0"><tr><td valign="top">');
		for(var i=0;i<this.tabs.length;i++){
			//显示该tab
			if(i == this.tabIndex ){
				htmlArr.push('<iframe name="'+this.tabs[i].frameId+'" scrolling="no" style="margin-bottom: 5px;width:100%;height:100%;" frameborder=0 id="'+this.tabs[i].frameId+'" src=""></iframe>');
			}else{
				//隐藏tab
				htmlArr.push('<iframe name="'+this.tabs[i].frameId+'" scrolling="no" style="margin-bottom: 5px;width:100%;height:100%;display:none;" frameborder=0 id="'+this.tabs[i].frameId+'" src=""></iframe>');
			}
		}
		htmlArr.push('</td></tr></table>');
		jQuery('#'+this.frameCId).html(htmlArr.join(''));
	},
	/**
	 * 给tabFrameMap赋值，构造tabId和frameId的对应关系Map
	 */
	setTabFrameMap:function(){
		for(var i=0;i<this.tabs.length;i++){
			this.tabFrameMap[this.tabs[i].tabId] = this.tabs[i].frameId;
			this.tabFrameMap[this.tabs[i].frameId] = this.tabs[i].tabId;
			this.tabFrameMap[this.tabs[i].tabId+"_index"] = i;
			this.tabFrameMap[i] = this.tabs[i].tabId;
		}
	},
	/**
	 * tab切换
	 */
	onClickTab:function(tabId){
		//点击当前tab，不执行切换代码
		if(this.tabFrameMap[tabId+"_index"] == this.curIndex){
			return;
		}
		this.displayTab(tabId);
		if(this.tabs[this.curIndex].clickCallBackFn){
			this.tabs[this.curIndex].clickCallBackFn();
		}
	},
	/**
	 * 显示指定的tab
	 */
	displayTab:function(tabId){
		jQuery("#"+tabId).addClass(this.tabActiveClass);
		var other = this.getOtherDomIdArr(tabId,1);
		for(var i=0;i<other.length;i++){
			jQuery('#'+other[i]).removeClass(this.tabActiveClass);
		}
		this.displayFrame(this.tabFrameMap[tabId]);
		var index = this.tabFrameMap[tabId+'_index'];
		var click = this.tabs[index].click;
		//表示初次加载，需要初始化frame页面
		if(click==0){
			this.initFrame(tabId);
		}
		this.tabs[index].click++;
		this.curIndex = index;
	},
	/**
	 * 显示指定的frame
	 */
	displayFrame:function(frameId){
		jQuery('#'+frameId).css("display","");
		var other = this.getOtherDomIdArr(frameId,2);
		for(var i=0;i<other.length;i++){
			jQuery('#'+other[i]).css("display","none");
		}
	},
	/**
	 * 初始化Frame
	 */
	initFrame:function(tabId){
		if(typeof tabId=='undefined'){
			tabId = this.tabs[this.curIndex].tabId;
		}
		var tab = this.tabs[this.tabFrameMap[tabId+"_index"]];
        //设置初始化查询标志
 		var url = this.basePath + tab.url;
 		var baseParam = this.baseParam;
 		if(!url.endsWith("?")&&!url.endsWith("&")){
 			baseParam = "&" + baseParam;
 		}
        document[this.formName].action=url+baseParam;
        document[this.formName].target=tab.frameId;
        document[this.formName].submit();
	},
	/**
	 * domId：tabId或者frameId
	 * flag:1-表示tabId，2-表示frameId
	 */
	getOtherDomIdArr:function(domId,flag){
		flag = flag || 1;
		var other = [];
		var param = 'tabId';
		if(flag == 2){
			param = 'frameId';
		}
		for(var i=0;i<this.tabs.length;i++){
			if(domId != this.tabs[i][param]){
				other.push(this.tabs[i][param]);
			}
		}
		return other;
	},
	/***
	 * 获取当前显示的tab对应的window对象
	 */
	getCurTabWindow:function(){
		return window.frames[this.tabFrameMap[this.tabFrameMap[this.curIndex]]]||{};
	}
}
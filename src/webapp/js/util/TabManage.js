/**
 * tab切换类，使用例子参见powerCutQueryMain.jsp（停电查询）
 * @param {} config
 * config参数示例：
 * {
 *  tabCId:tab容器ID,
 *  frameCId:frame容器ID,
 *  basePath:路径,
 *  formName:'thisform',
 * 	tabs: [{
 * 		tabId:
 * 		tabName:
 * 		frameId:
 * 		url:
 * 		callback:
 * 	 },...],
 *  tabIndex:0,
 *  tabMinWidth:配置tab的最小宽度
 * }
 */
function TabManage(config){
	config = config ||{};
	this.tabCId = config.tabCId || '';
	this.frameCId = config.frameCId || '';
	this.basePath = config.basePath || '';
	this.formName = config.formName || 'thisform';
	this.tabs = config.tabs || [];
	this.tabIndex = config.tabIndex || 0;//默认是0，表示显示第一个tab
	this.curIndex = this.tabIndex;//当前的tabIndex
	this.tabMinWidth = config.tabMinWidth || 77; //tab最小宽度最小为77
	this.tabFrameMap = {};
	
	this.hoverLeftClass = "subMenu_hover_left";
	this.hoverMiddleClass = "subMenu_hover_middle";
	this.hoverRightClass = "subMenu_hover_right";
	
	this.normalLeftClass = "subMenu_normal_left";
	this.normalMiddleClass = "subMenu_normal_middle";
	this.normalRightClass = "subMenu_normal_right";
}
TabManage.prototype = {
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
	},
	/**
	 * 生成tabHtml代码
	 */
	genTabHtml:function(){
		var htmlArr = [];
		htmlArr.push('<table style="margin: 5px 0px 0px 5px;"><tr>');
		for(var i=0;i<this.tabs.length;i++){
			htmlArr.push('<td style="padding-right:5px;" id="'+this.tabs[i].tabId+'">');
			if(i == this.tabIndex ) {
				htmlArr.push('<span class="subMenu_hover_left" style="cursor: pointer;">');
				htmlArr.push('<span class="subMenu_hover_right">');
				htmlArr.push('<span class="subMenu_hover_middle">');
			}else{
				htmlArr.push('<span class="subMenu_normal_left" style="cursor: pointer;">');
				htmlArr.push('<span class="subMenu_normal_right">');
				htmlArr.push('<span class="subMenu_normal_middle">');
			}
			htmlArr.push('<font color="black">'+this.tabs[i].tabName+'</font>');
			htmlArr.push('</span></span></span></td>');
		}
		htmlArr.push('</tr></table>');
		jQuery("#"+this.tabCId).html(htmlArr.join(''));
		var me = this;
		//注册click事件
		jQuery('#'+this.tabCId).contents().find("td").click(function(){
			var tabId = $(this).attr("id");
			me.onClickTab(tabId);
		}).each(function(){//配置最小宽度tabMinWidth
			var span = $(this).children("span").children("span").children("span");
			
			//alert(span.get(0).scrollWidth);
			if(span.get(0).scrollWidth < me.tabMinWidth+15){
				//alert(me.tabMinWidth);
				span.get(0).style.width = me.tabMinWidth+15;
			}
		});
	},
	/**
	 * 生成iframe Html代码
	 */
	genFrameHtml:function(){
		var htmlArr = [];
		htmlArr.push('<table width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td valign="top">');
		for(var i=0;i<this.tabs.length;i++){
			//显示该tab
			if(i == this.tabIndex ){
				htmlArr.push('<iframe name="'+this.tabs[i].frameId+'" width="100%" scrolling="no" style="margin-bottom: 5px;" frameborder=0 id="'+this.tabs[i].frameId+'" src=""></iframe>');
			}else{
				//隐藏tab
				htmlArr.push('<iframe name="'+this.tabs[i].frameId+'" width="100%" scrolling="no" style="margin-bottom: 5px;display:none;" frameborder=0 id="'+this.tabs[i].frameId+'" src=""></iframe>');
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
	},
	/**
	 * 显示指定的tab
	 */
	displayTab:function(tabId){
		jQuery("#"+tabId).children("span").removeClass(this.normalLeftClass).addClass(this.hoverLeftClass)
						 .children("span").removeClass(this.normalRightClass).addClass(this.hoverRightClass)
						 .children("span").removeClass(this.normalMiddleClass).addClass(this.hoverMiddleClass);
		var other = this.getOtherDomIdArr(tabId,1);
		for(var i=0;i<other.length;i++){
			jQuery('#'+other[i]).children("span").removeClass(this.hoverLeftClass).addClass(this.normalLeftClass)
								.children("span").removeClass(this.hoverRightClass).addClass(this.normalRightClass)
								.children("span").removeClass(this.hoverMiddleClass).addClass(this.normalMiddleClass);
		}
		this.displayFrame(this.tabFrameMap[tabId]);
		var index = this.tabFrameMap[tabId+'_index'];
		var click = this.tabs[index].click;
		//表示初次加载，需要初始化frame页面
		if(click==0){
			this.initFrame(tabId);
		} else {
			//重新调整页面
			window.resizeFun();
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
	 * 初始化Frame，初始化不查询
	 */
	initFrame:function(tabId){
		if(typeof tabId=='undefined'){
			tabId = this.tabs[this.curIndex].tabId;
		}
		showWaitDisplayForQuery(this.basePath,'正在加载页面...');
		var tab = this.tabs[this.tabFrameMap[tabId+"_index"]];
        //设置初始化查询标志
 		var url = tab.url;
 		if(url.indexOf('?')>=0){
 			url += '&initFlag=1';
 		}else{
 			url += '?initFlag=1';
 		}
        document[this.formName].action=this.basePath+url;
        document[this.formName].target=tab.frameId;
        document[this.formName].submit();
	},
	/**
	 * 根据查询条件查询数据
	 */
	queryFrame:function(tabId){
		if(typeof tabId == 'undefined'){
			tabId = this.tabs[this.curIndex].tabId;		
		}
		var tab = this.tabs[this.tabFrameMap[tabId+"_index"]];
		//添加遮罩
        showWaitDisplayForQuery(this.basePath,'正在加载数据...');
        var pageSize = getPageSize(tab.frameId, '?');
        document[this.formName].action=this.basePath + tab.url + pageSize;
        document[this.formName].target = tab.frameId;
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
	}
}
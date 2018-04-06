/**
 * <p>Title: 购电侧系统</p>
 * <p>Description: 存放每个模块必须引入的函数,和常用的函数</p>
 * @include "constant.js"
 * @include "constant.js"
 * <p>Copyright: Copyright (c) 2009</p>
 * <p>Company: 江苏方天电力技术有限公司</p>
 */

Ext.namespace("gdc");
/**
 *列表无数据显示 没有查询到相应记录

Ext.override(Ext.grid.GridView,{
	emptyText:'没有查询到相应记录!'
}
);
 */ 
/**
 * 调用错误提示框
 * @param _ 错误信息
 */
gdc.showErrorDlg = function (_) {
	if (typeof _ == "string") {
		var $ = {message:_};
		gdc.dlg.showDlg($);
	} else {
		gdc.dlg.showDlg(_);
	}
};
/**
 * 调用错误提示框
 * @param {} B  错误信息
 * @param {} $  错误详细信息
 * @param {} A  回调函数
 */
gdc.showWarnDlg = function (B, $, A) {
	var _ = {infType:1, message:B, detailMessage:$, callback:A};
	gdc.dlg.showDlg(_);
};
/**
 * 自动关闭提示框 
 * @param {} _  错误信息
 * @param {} $  回调函数
 */
gdc.showMomentInforDlg = function (_, $) {
	gdc.dlg.showMomentDlg(_, $);
};

/**
 * 全局ajax请求处理，如果没有登录或者session超时转到登陆页面
 * @param {} response  请求恢复对象
 * @param {} options     
 * @return {Boolean}   是否需要登录
 */
gdc.checkResponseAndSession = function(response, options) {
	var str = response.responseText;
	if (str && str.indexOf("{success:false,data:\"NEED_LOGIN\"}")==0) {
		//Session超时处理
		window.top.Ext.MessageBox.alert('提示', '页面超时，请重新登录!',function(){
			if(window.dialogArguments){
				var windowArray = window.dialogArguments;
				window.close();
				for(var i=windowArray.length-1;i>0;i--){
					windowArray[i].close();
				}
				windowArray[0].top.location=gdc.webContextRoot +"pages/system/login.jsp";
			}else{
				window.top.location=gdc.webContextRoot +"pages/system/login.jsp";
			}
			return false;
		})
	} else {
		return gdc.checkResponse(str,options);
	}
}
/**
 * 检查response是否是有效的json数据格式。
 * @param {} response  请求回复对象
 * @param {} options
 */
gdc.checkResponse = function(response,options) {
	var msg;
	if (response){
		if (typeof(response) == "string") {
			try{
				msg = Ext.util.JSON.decode(response);
			} catch (e) {
				if (options.headers && options.headers.requestHtml=="1"){ 
					return;
				}else{
					//json格式有误
					var tmp={message:'不是有效的JSON数据格式',detailMessage:'返回数据为：\n'+response};
					gdc.showErrorDlg(tmp);
					return;
				}
			}
		}
		else if (typeof(response) == "object") msg = response;
		else return true;
		if (msg.success == false) {
			gdc.errordlg.show(msg.errors);
			return false;
		}
	}
	return true;
}
/**
 * 在页面请求结束后，执行全局检查
 */
Ext.Ajax.on("requestcomplete", function(conn, response, option) {
	gdc.checkResponseAndSession(response, option);
});
Ext.Ajax.on("beforerequest",function(conn,option){
	var ajaxHeadSign={ExtAjaxSign:"1"};
	if (option.headers){
		Ext.apply(option.headers,ajaxHeadSign)
	}else{
		option.headers=ajaxHeadSign;
	}
});
/**
 * 后台出现异常时执行
 */
Ext.Ajax.on("requestexception", function(conn, response, option) {
	var errDlgData={
		inftype:2,
		clientCode:response.status,
		message:"网络连接出错或该链接不存在,请确认本机网络是否正常或联系管理员！",
		detailMessage:"相关访问链结为:"+option.url+"\n"+response.responseText
	};
	gdc.showErrorDlg(errDlgData);
});

/**
 * 从一个url地址获取服务器返回的HTML字符串,内部使用，外部不要使用
 * @private
 * @param {String} url url地址
 * @param {Function} backFn 数据读取成功后的回调函数,其中一个参数为htmlStr(String)
 */
gdc.getHTMLStrFromUrl=function(url,backFn){
	if (typeof backFn == "function"){
		var successFn=function(response,options){
			backFn(response.responseText);
		}
		Ext.Ajax.request({
			url:url,
			method:'post',
			success:successFn
		});
	}
}
/**
 * 根据Code返回对应的Name
 * @param {String} code
 * @param {Array} codeNameArray 二维数组其中，一个数组中分别为：code和name
 * @return {String}
 */
gdc.getNameByCode=function(code,codeNameArray){
	if (!codeNameArray) return "";
	for (var i=0;i<codeNameArray.length;i++){
		var objTmp=codeNameArray[i];
		if (objTmp[0]==code) return objTmp[1];
	}
	return "";
}
/**
 * 根据Name返回对应的Code
 * @param {String} name 指定的Name
 * @param {Array} codeNameArray 二维数组其中，一个数组中分别为：code和name
 * @return {String} 对应的Code
 */
gdc.getCodeByName=function(name,codeNameArray){
	if (!codeNameArray) return "";
	for (var i=0;i<codeNameArray.length;i++){
		var objTmp=codeNameArray[i];
		if (objTmp[1]==name) return objTmp[0];
	}
	return "";
}
/**
 * 通过隐藏字段给Combo赋值
 * @param {} formPnl 表单域
 * @param {} codeNameArray 二维数组，一个数组中分别为：code对应的隐藏域名，combo对应的名称
 */
gdc.setComboValue=function(formPnl,codeNameArray){
	if (!codeNameArray) return ;
	for (var i=0;i<codeNameArray.length;i++){
		var srcObj=formPnl.find("name",codeNameArray[i][0]);
		var tgtObj=formPnl.find("name",codeNameArray[i][1]);
		if (srcObj.length!=1){
			alert("没有发现或发现多个表单域："+codeNameArray[i][0]);return;
		}if (tgtObj.length!=1){
			alert("没有发现或发现多个表单域："+codeNameArray[i][1]);return;
		}
		tgtObj[0].setValue(srcObj[0].getValue());
	}
}
/**
 * 把公用代码数组中不在用的代码去掉，若没有不在用，返回本身，若有不在用的，返回新数组,一般用与记录维护时
 * 公用代码数组格式为：[[代码，名称，是否在用(布尔值)],...]
 * @param {Array} comCodeArr 代码数组
 * @return {Array} 公用代码数组其中只有在用的代码
 */
gdc.getAvailComCodeArr=function(comCodeArr){
	var b=false;
	for (var i=0;i<comCodeArr.length;i++){
		if (comCodeArr[i][2]===false) {
			b=true;break;
		}
	}
	if (b) {
		var newArr=[];
		for (var i=0;i<comCodeArr.length;i++){
			if (comCodeArr[i][2]===true) {
				newArr.push(comCodeArr[i]);
			}
		}
		return newArr;
	}else return comCodeArr;
}
/**
 * 在公用代码数组中插入一个空格，返回新数组，一般用于列表查询时
 * 公用代码数组格式为：[[代码，名称，是否在用(布尔值)],...]
 * @param {Array} comCodeArr 代码数组
 * @return {Array} 新的公用代码数组
 */
gdc.getAddBlankValue=function(comCodeArr){
	var newArr=[['','　',true]];//空格用中文全角空格
	for(var i=0;i<comCodeArr.length;i++){
		newArr.push(comCodeArr[i]);
	}
	return newArr;	
}
/**
 * 把Combo的值放入隐藏域
 * @param {} formPnl 表单域
 * @param {} codeNameArray 二维数组，一个数组中分别为：code对应的隐藏域名，combo对应的名称
 */
gdc.putComboValueToHidden=function(formPnl,codeNameArray){
	if (!codeNameArray) return ;
	for (var i=0;i<codeNameArray.length;i++){
		var srcObj=formPnl.find("name",codeNameArray[i][1]);
		var tgtObj=formPnl.find("name",codeNameArray[i][0]);
		if (srcObj.length!=1){
			alert("没有发现或发现多个表单域："+codeNameArray[i][1]);return;
		}if (tgtObj.length!=1){
			alert("没有发现或发现多个表单域："+codeNameArray[i][0]);return;
		}
		tgtObj[0].setValue(srcObj[0].getValue());
	}	
}
/**
 * 把Combo的值放入隐藏域，根据下拉框的文本来判断，适用于下拉框为可编辑类型的
 * @param {} formPnl 表单域
 * @param {} codeNameArray 二维数组，一个数组中分别为：code对应的隐藏域名，combo对应的名称
 */
gdc.putComboValueToHiddenByText=function(formPnl,codeNameArray){
	if (!codeNameArray) return ;
	for (var i=0;i<codeNameArray.length;i++){
		var srcObj=formPnl.find("name",codeNameArray[i][1]);
		var tgtObj=formPnl.find("name",codeNameArray[i][0]);
		if (srcObj.length!=1){
			alert("没有发现或发现多个表单域："+codeNameArray[i][1]);return;
		}if (tgtObj.length!=1){
			alert("没有发现或发现多个表单域："+codeNameArray[i][0]);return;
		}
		var store = srcObj[0]['store'];
		if (store){
			var f = false;
			var rawValue = srcObj[0].getRawValue();
			for (var j=0;j<store.getCount();j++){
				var record = store.getAt(j);
				if (record.get("text")==rawValue){
					tgtObj[0].setValue(record.get("value"));
					f = true;
					break;
				}
			}
			if (!f&&rawValue!=''){
				alert("提示:您输入的内容与下拉列表中的所有均不相符，请重新输入或选择！");
				return;
			}
		}else{
			alert("提示:没有发现Combo的store："+codeNameArray[i][1]);
			return;			
		}
	}	
}
/**
 * 根据属性查找指定节点的父节点
 * @param {TreeNode} node			当前节点
 * @param {String} attribute		节点属性，示例：objType
 * @param {Array} values			节点属性值，示例：['COUNTY','BB']
 * @return {TreeNode} 如果找不到符合的节点，则返回null
 */
gdc.getParentTreeNode = function(node,attribute,values){
	if (values&&values.length>0){
		var pNode = node.parentNode;
		if (pNode){
			if (pNode.attributes[attribute]){
				var flag = false;
				for (var i=0;i<values.length;i++){					
					if(pNode.attributes[attribute]==values[i]){
						flag = true;
						break;
					}
				}
				if (flag){
					return pNode;	
				}else{
					return gdc.getParentTreeNode(pNode,attribute,values);
				}
			}else{
				return gdc.getParentTreeNode(pNode,attribute,values);
			}
		}else{
			return null;
		}
	}else{
		return null;
	}
}
/**
 * @private
 */
gdc.getNewTreeCombo=function(comboCfg,fieldLabel,treeName){
	var listHeight=200;
	if (comboCfg && comboCfg.listHeight && comboCfg.listHeight>listHeight) listHeight=comboCfg.listHeight;
	var newCbCfg={
		store : [[]],
		mode : 'local',
		triggerAction : 'all',
		editable : false,
		tpl : "<tpl for='.'><div style='height:"+listHeight+"px' class='"+treeName+"'></div></tpl>",
		allowBlank : true,
		fieldLabel : fieldLabel,
		minListWidth:150,
		anchor : '100%'
	}
	Ext.apply(newCbCfg,comboCfg);
	return new Ext.form.ComboBox(newCbCfg);
}
/**
 * 用传入的Tree，构造一个Combo，Combo下拉时，出树图选。
 * 树图的高度必须等于listHeight，如果不等，强制修改树图的高度。
 * 树图的autoWidth必须为True;
 * @param {Object} comboCfg Combo配置参数minListWidth，可以设置列表最小宽度(增加一个参数listHeight（默认200）,可以设置列表的高度)
 * @param {Ext.tree.TreePanel} treeObj,树图的事件必须自己编写代码实现
 */
gdc.getComboDropTree=function(comboCfg,treeObj){
	var combo = gdc.getNewTreeCombo(comboCfg,"***","tree");
	if (combo.listHeight!=treeObj.height){
		treeObj.setHeight(combo.listHeight);
	}
	combo.on("expand", function() {
		treeObj.render(combo.list.child("div.tree"));
	});
	return combo;	
}
/**
 * 初始化下拉框选择公用代码复选树图，响应check方法得到树图节点
 * @param {String}		下拉框的Label
 * @param {String}		下拉框对应隐藏域的Name,必须与Combo在同一容器中
 * @return {Ext.form.ComboBox}
 */
gdc.getCheckTypeAssetCombo = function(fieldLabel, hiddenCompName,comboCfg) {
	var treeName = 'typeAssetTree';
	var combo = gdc.getNewTreeCombo(comboCfg,fieldLabel,treeName);
	
	var tree = gdc.tree.assetTypeTree.getTreePanel({checkModel:'childcas',height:200,autoWidth:true},{
	});
	tree.on("check", function(node) {
		var chs=tree.getChecked();
		var ids="",names="";
		var f = false;
		for (var i=0;i<chs.length;i++){
			var chNode=chs[i];
			if (f) {ids+=",";names+=","}
			else {f = true};
			ids+=chNode.attributes["objId"];
			names+=chNode.text;
		}
		var cmpArr = combo.ownerCt.find("name",hiddenCompName);
		if (cmpArr.length==1){
			var hiddenComp = cmpArr[0];
			hiddenComp.setValue(names);
			combo.setValue(ids);
		}else {
			alert("发现指定Name："+hiddenCompName+"的组件有"+cmpArr.length+"个");return;
		}
	});
	combo.on("expand", function() {
		tree.render(combo.list.child("div."+treeName));
	});
	return combo;
}
/**
 * 初始化下拉框选择设备类型树图，响应click方法得到树图节点
 * @param {String}		公用代码ID，一般定义在gdc.constant中
 * @param {String}		下拉框的Label
 * @param {String}		下拉框对应隐藏域的Name，必须与Combo在同一容器中
 * @return {Ext.form.ComboBox}
 */
gdc.getTypeAssetCombo = function(fieldLabel, hiddenCompName,comboCfg) {
	var treeName = 'typeAssetTree';
	var combo = gdc.getNewTreeCombo(comboCfg,fieldLabel,treeName);
	var tree = gdc.tree.assetTypeTree.getTreePanel({height:200,autoWidth:true},{});
	
	tree.on("click", function(node) {
		var cmpArr = combo.ownerCt.find("name",hiddenCompName);
		if (cmpArr.length==1){
			var hiddenComp = cmpArr[0];
			hiddenComp.setValue(node.attributes["objId"]);
			combo.setValue(node.text);
			combo.collapse();
		}else {
			alert("发现指定Name："+hiddenCompName+"的组件有"+cmpArr.length+"个");return;
		}
	});
	combo.on("expand", function() {
		tree.render(combo.list.child("div."+treeName));
	});
	return combo;
}

/**
 * 得到设备类型的某种类型（逻辑、基本、物理、逻辑）参数的FieldSet的Items，以两列的形式展示
 * 如果某类型的参数为1或0个，则以hidden域--iamalittlemouse补齐
 * @param {Array} items_fixed		存在主表的字段名
 * @param {Array} params			存在附表的字段名
 * @param {Array} comCodeJsonArray	涉及公用代码的CodeArray，用以得到combo的store
 */
gdc.getFieldSetItems = function(items_fixed,params,comCodeJsonArray){
	
	var items = [];
	if (params!=null){
		for (var i=0;i<params.length;i++){
			if (params[i]['store']&&(typeof(params[i]['store'])=="string"||typeof(params[i]['store'])=="number")){
				params[i]['store'] = comCodeJsonArray['comCode_'+params[i]['store']];
			}
			items_fixed.push(params[i]);
		}
	}
	var items1 = [];
	var items2 = [];
	var cnt = 0;
	for (var i=0;i<items_fixed.length;i++){
		if (items_fixed[i]['xtype']=='hidden'){
			items1.push(items_fixed[i]);
		}else{
			if (cnt%2==0){
				items1.push(items_fixed[i]);
			}else{
				items2.push(items_fixed[i]);			
			}
			cnt ++;
		}
	}
	if (items1.length==0){
		items1.push({xtype:'hidden',name:'iamalittlemouse'});
	}
	if (items2.length==0){
		items2.push({xtype:'hidden',name:'iamalittlemouse'});
	}
	items.push({
            	layout : 'form',
            	defaultType: 'textfield',
            	columnWidth : .49,
            	defaults: {anchor: '98%'},
            	items:items1});
	items.push({
            	layout : 'form',
            	defaultType: 'textfield',
            	columnWidth : .49,
            	defaults: {anchor: '98%'},
            	items:items2});
            	
	return items;
}

/**
 * 初始化下拉框选择公用代码复选树图，响应check方法得到树图节点
 * @param {String}		公用代码ID，一般定义在gdc.constant中
 * @param {String}		下拉框的Label
 * @param {String}		下拉框对应隐藏域的Name，必须与Combo在同一容器中
 * @return {Ext.form.ComboBox}
 */
gdc.getCheckComCodeCombo = function(comCodeId, fieldLabel, hiddenCompName,comboCfg) {
	var treeName = 'comCodeChkTree'+comCodeId;
	var combo = gdc.getNewTreeCombo(comboCfg,fieldLabel,treeName);
	var tree = gdc.tree.comCodeTree.getTreePanel({checkModel:'cascade',height:200,autoWidth:true},{
		rootId:comCodeId
	});
	tree.on("check", function(node) {
		var chs=tree.getChecked();
		var ids="",names="";
		var f = false;
		for (var i=0;i<chs.length;i++){
			var chNode=chs[i];
			if (chNode.attributes["objType"]=='DATA'){
				if (f) {ids+=",";names+=","}
				else {f = true};
				ids+=chNode.attributes["objCode"];
				names+=chNode.text;
			}
		}
		var cmpArr = combo.ownerCt.find("name",hiddenCompName);
		if (cmpArr.length==1){
			var hiddenComp = cmpArr[0];
			hiddenComp.setValue(ids);
			combo.setValue(names);
		}else {
			alert("发现指定Name："+hiddenCompName+"的组件有"+cmpArr.length+"个");return;
		}
	});
	combo.on("expand", function() {
		tree.render(combo.list.child("div."+treeName));
	});
	return combo;
}

/**
 * 初始化下拉框选择公用代码树图，响应click方法得到树图节点
 * @param {String}		公用代码ID，一般定义在gdc.constant中
 * @param {String}		下拉框的Label
 * @param {String}		下拉框对应隐藏域的Name，必须与Combo在同一容器中
 * @return {Ext.form.ComboBox}
 */
gdc.getComCodeCombo = function(comCodeId, fieldLabel, hiddenCompName,comboCfg) {
	var treeName = 'comCodeTree'+comCodeId;
	var combo = gdc.getNewTreeCombo(comboCfg,fieldLabel,treeName);
	
	var tree = gdc.tree.comCodeTree.getTreePanel({height:200,autoWidth:true},{
		rootId:comCodeId
	});
	tree.on("click", function(node) {
		if (node.attributes["objType"]=='DATA'){
			var cmpArr = combo.ownerCt.find("name",hiddenCompName);
			if (cmpArr.length==1){
				var hiddenComp = cmpArr[0];
				hiddenComp.setValue(node.attributes["objCode"]);
				combo.setValue(node.text);
			}else {
				alert("发现指定Name："+hiddenCompName+"的组件有"+cmpArr.length+"个");return;
			}
		}
	});
	combo.on("expand", function() {
		tree.render(combo.list.child("div."+treeName));
	});
	
	return combo;
}
/**
 * 返回一个字符的长度，中文字符算两位
 * @param {String} str
 */
gdc.getZhStrLength=function(str){
	if (!str) return 0;
	var str1,str2,str3,nLen;
	str1 = str;
	nLen = 0;
	for(var i=1;i<=str1.length;i++){
		str2=str1.substring(i-1,i)
		str3=escape(str2);
		if(str3.length>3){
			nLen = nLen + 2;
		}
		else{
			nLen = nLen + 1;
		}
	}
	return nLen;	
}

/**
 * 验证Panel中的表单域中的输入是否有效，被disabled和不可见的不验证。
 * @param {Ext.Panel} formPanel
 */
gdc.validateForm=function(formPanel){
	var formFlds=[];
	var fn = function(c){
        if(c.doLayout && c != formPanel){
            if(c.items){
                c.items.each(fn);
            }
        }else if(c.isFormField){
            formFlds.push(c);
        }
    }
    formPanel.items.each(fn);
    if (formFlds.length==0) return "";
	var str=[];
	for (var i=0;i<formFlds.length;i++){
		var childTmp=formFlds[i];
		if (!childTmp.disabled && childTmp.isVisible() && !childTmp.validate()){
			var fieldLabel=childTmp.initialConfig["fieldLabel"];
			var b=true;
			for (var j=0;j<str.length;j++){
				if (str[j]==fieldLabel) {
					b=false;
					break;
				}
			}
			if (b) str.push(fieldLabel);
		}
	}
	if (str.length>0) return "有如下字段:"+str.toString()+";\n数据不合法,请查看提示，重新填写！";
	return "";        
}
/***
 * 验证Panel中的表单域中，必添项是否填写。allowBlank:false
 * @param {} formPanel
 * @return {String}
 */
gdc.validateFormIsRequired=function(formPanel){
	var resultStr = '请输入： \n';
	var arrays = formPanel.find('allowBlank', false);
	for(var i=0;i<arrays.length;i++){
		//var id = arrays[i].id;
		if( "" == Ext.getCmp(arrays[i].id).getValue()){
			var resultStrTemp = arrays[i].fieldLabel;
			//var a = resultStr2.indexOf('<');
			var startNum = resultStrTemp.indexOf('>');
			var endNum = resultStrTemp.indexOf('</');
			//var d = resultStr2.indexOf('>');	
			resultStrTemp = resultStrTemp.substring(startNum+1, endNum);
			resultStr +="	"+resultStrTemp+"\n";
		}
	}
	alert(resultStr);
	Ext.MessageBox.alert(resultStr);
	//Appframe.viewinfdlg.warning.show(resultStr);
}

/**
 * set FormPanel's fields readOnly,一般用于查看时，设置所有字段只读
 * @param {Ext.form.FormPanel} formPanel
 */
gdc.setFormReadOnly=function(formPanel,readOnly){
	var children=formPanel.items;
	if (!children) return;
	if (readOnly===true) readOnly=true;else readOnly=false;
	for (var i=0;i<children.getCount();i++){
		var childTmp=children.get(i);
		if (childTmp.items){
			gdc.setFormReadOnly(childTmp,readOnly);
		}
		var xtype=childTmp.getXType();
		if (childTmp.isFormField) {
			if (xtype=="hidden") continue;
			if (xtype=="textfield" || xtype=="textarea" || xtype=="numberfield"){
				if (childTmp.rendered){
					childTmp.getEl().dom.readOnly=readOnly;
				}else{
					childTmp.readOnly=readOnly;
				}
			}else if (childTmp.isXType("trigger")){
				childTmp.setDisabled(readOnly);
			}else {
				childTmp.setDisabled(readOnly);
			} 
		}else{
			if (xtype=="button") childTmp.setDisabled(readOnly);
		}
	}	
}

/**
 * 设置一个Panel中元素的是否只读
 * @param {Ext.Panel} parentPnl
 * @param {Array} fldCfgArr 其中是一个Object，有属性：fldName字段名，readOnly是否只读
 */
gdc.setPnlFieldReadOnly=function(parentPnl,fldCfgArr){
	for (var i=0;i<fldCfgArr.length;i++){
		var fldObj=parentPnl.find("name",fldCfgArr[i].name);
		if (fldCfgArr[i].readOnly===true) fldCfgArr[i].readOnly=true;else fldCfgArr[i].readOnly=false;
		if (fldObj.length>0) {
			fldObj=fldObj[0];
			var xtype=fldObj.getXType();
			if (xtype=="textfield" || xtype=="textarea"){
				fldObj.getEl().dom.readOnly=fldCfgArr[i].readOnly;
			}else {
				fldObj.setDisabled(fldCfgArr[i].readOnly);
			}			
		}
	}
}
//打开模块相关
/**
 * @private
 */
gdc.openModule_GetPnl=function(newMainPanelFn,mdlCfg,returnPanel){
	if (typeof newMainPanelFn=="function"){
		var pnl;
		if (mdlCfg && mdlCfg.newPnlParam){
			if (Ext.isArray(mdlCfg.newPnlParam)){
				pnl=newMainPanelFn.apply(null,mdlCfg.newPnlParam);
			}else pnl=newMainPanelFn(mdlCfg.newPnlParam);
		}else{
			pnl=newMainPanelFn(null);
		}
		if (returnPanel!==false){
			if (!pnl){
				gdc.showErrorDlg('传入的入口函数，没有返回Panel');
			}else{
				return pnl;
			}				
		}
	}else{
		alert('必须传入入口函数,当前是'+(typeof newMainPanelFn));
	}
	return null;
}
/**
 * @private
 */
gdc.alertErrorInfo=function(e,strMsg){
	var descTmp=e.description;
	if (!descTmp) descTmp=e.toString();
	if (strMsg) strMsg+=";"+descTmp;
	else strMsg=descTmp;
	alert(strMsg);
}
/**
 * @private
 */
gdc.openModule_initData=function(initModuleDataFn,successFn){
	if (typeof initModuleDataFn=="function"){
		var formCfg=null;
		try{
			formCfg=initModuleDataFn();
		}catch(e){
			gdc.alertErrorInfo(e,"初始化数据的函数调用出错");
		}
		if (formCfg!=null){
			if (typeof formCfg=="object"){
				var fnTmp=formCfg["success"];
				formCfg["success"]=function(form, action){
					try{
						if (fnTmp) fnTmp(form, action);
						successFn();
					}catch(e){
						gdc.alertErrorInfo(e,"初始化数据的成功回调出错");
					}
				}
				if (formCfg["goOnWhenFailed"]===true){
					var failFnTmp=formCfg["failure"];
					formCfg["failure"]=function(form, action){
						try{
							if (failFnTmp) failFnTmp(form, action);
							successFn();
						}catch(e){
							gdc.alertErrorInfo(e,"初始化数据的失败回调出错");
						}
					}
				}
				var hiddenForm=gdc.getHiddenMainForm();
				try{
					hiddenForm.submit(formCfg);
				}catch(e){
					gdc.alertErrorInfo(e,"初始化数据发起请求出错");
				}
			}else{
				alert('初始化参数的函数必须返回JSON对象');
			}
		}else{
			alert('初始化参数的函数不能返回空值(Null)');
		}
	}else{
		alert('初始化参数必须是函数');
	}	
}
/**
 * @private
 * 当前用户是一个角色时，执行
 */
gdc.openModule_Impl=function(newMainPanelFn,initModuleDataFn,mdlCfg){	
	var paintFnTmp=function(){
		var pnl=null;
		var returnPnl=!(mdlCfg && mdlCfg['needNewView']===false);
		try{
			pnl=gdc.openModule_GetPnl(newMainPanelFn,mdlCfg,returnPnl);
		}catch(e){
			gdc.alertErrorInfo(e,"初始化当前功能的页面出错");
		}
		if (!returnPnl){
			return;
		} 
		if (pnl){
			var viewport=new Ext.Viewport({
	           layout:'fit',
	           items:[pnl]
			});	
			if (mdlCfg.funcBtnControl!==false){
				gdc.hideFuncBtn(pnl);
				if (pnl.getTopToolbar()) gdc.enableFuncBtn(pnl.getTopToolbar(),null,null,mdlCfg.btnCtrlMode);
				var panelArray=pnl.findByType('panel');
				if(panelArray){
					for(var pnlcount=0;pnlcount<panelArray.length;pnlcount++){
						var tem = panelArray[pnlcount];
						var temTbar = tem.getTopToolbar();
						if (temTbar) gdc.enableFuncBtn(temTbar,null,null,mdlCfg.btnCtrlMode);
					}
				}				
			}
		}
	}
	if (initModuleDataFn){
		gdc.openModule_initData(initModuleDataFn,paintFnTmp);
	}else{
		paintFnTmp();
	}	
}
/**
 * 获取viewport 所有按钮
 * @param {} viewport viewport
 * @return {}         viewport所有按钮
 * @gaoLi
 */
gdc.getAllBtns=function getAllBtns(viewport){
	var btnIds = '';
	if(viewport){
//		//获取panel tbar的按钮
//		var panelArray = viewport.findByType('panel');
//		var formArray = viewport.findByType('form');
//		var gridArray = viewport.findByType('grid');
//		var treeArray = viewport.findByType('tree');
//		var tabArray = viewport.findByType('tab');
//		//var toolbarArray = viewport.findByType('');
//		
//		var tem = panelArray[s];
//		var temTbar = viewport.getTopToolbar();
//		btnIds += gdc.getTbarBtn(temTbar);
//				
//		if(panelArray){
//			for(var s=0;s<panelArray.length;s++){
//				var tem = panelArray[s];
//				var temTbar = tem.getTopToolbar();
//				//alert('到--931');
//				//alert(temTbar);
//				btnIds += gdc.getTbarBtn(temTbar);
//				//alert('到--932');
//			}
//		}
//		//alert('到--932:'+btnIds);
//		if(formArray){
//			for(var s=0;s<formArray.length;s++){
//				var tem = formArray[s];
//				var temTbar = tem.getTopToolbar();
//				btnIds += gdc.getTbarBtn(temTbar);
//			}
//		}
//		if(gridArray){
//			for(var s=0;s<gridArray.length;s++){
//				var tem = gridArray[s];
//				var temTbar = tem.getTopToolbar();
//				btnIds += gdc.getTbarBtn(temTbar);
//			}
//		}
//		if(treeArray){
//			for(var s=0;s<treeArray.length;s++){
//				var tem = treeArray[s];
//				var temTbar = tem.getTopToolbar();
//				btnIds += gdc.getTbarBtn(temTbar);
//			}
//		}
//		if(tabArray){
//			for(var ss=0;ss<tabArray.length;ss++){
//				var tem = tabArray[s];
//				var temTbar = tem.getTopToolbar();
//				btnIds += gdc.getTbarBtn(temTbar);
//			}
//		}
		var xTypes = viewport.getXTypes();
		if(xTypes.indexOf('panel')>-1){
			btnIds += gdc.getTbarBtn(viewport.getTopToolbar());
		}
		var items = viewport.items;
		if(items){
			for(var i=0;i<items.length;i++){
				var obj = items.get(i);
				try{
					xTypes = obj.getXTypes();
					if(xTypes.indexOf('panel')>-1){
						var temTbar = obj.getTopToolbar();
						btnIds += gdc.getTbarBtn(temTbar);
						if(obj.items){
							btnIds +=gdc.getAllBtns(obj);				
						}
					}
				}catch(e){
					continue;
				}
				
			}
		}

	}	

	return btnIds;
}
/**
 * 获取tbar中的按钮
 * @param {} tbar 工具栏
 * @return {}     工具栏按钮
 * @gaoLi
 */
gdc.getTbarBtn=function getTbarBtn(tbar){
	var bids = '';
	if(tbar){
		var tbarItems = tbar.items;
		if(!tbarItems){
			return ;
		}
//		if(!tbarItems){
//			tbarItems = tbar;
//		}
 		for(var t=0;t<tbarItems.length;t++){
 			var btn = btn=tbarItems.get(t);;
// 			if(tbar.items){
// 				btn=tbarItems.get(t);
// 			}else{
// 				btn = tbarItems[t];
// 			}
 			try{
 				//if(tbar.items){
		 			if(btn.getXType()=='button' || btn.getXType()=='tbbutton'||btn.getXType()=='menu'){
						bids += btn.id + ',';
		 			}
	 			//}else{
	 			//	bids += btn.id + ',';
	 			//}
 			}catch(e){
 				continue;
 			}
		}
 	}
 	return bids;
}
/**
 * @private
 */
gdc.chooseASpRole=function(spRoleList,newMainPanelFn,initModuleDataFn,mdlCfg){
	var getBoxCmps=function(){
		var cmpArr=[];
		for (var i=0;i<spRoleList.length;i++){
			var objTmp={hideLabel:true,name:'spRole',anchor:'100%'};
			objTmp.inputValue=i;
			if (spRoleList[i].spRoleId){
				objTmp.boxLabel=spRoleList[i].spOrgName+"/"+spRoleList[i].spRoleName;
			}else{
				objTmp.boxLabel=spRoleList[i].spOrgName+"/(用户直接授权)";
			}
			cmpArr.push(objTmp);
		}
		return cmpArr;
	}
	var win=null;
	var chooseOkFun=function(){
		var formPnl=win.items.get(0);
		var roleCmps=formPnl.find("name","spRole");
		var spRoleIndex=roleCmps[0].getGroupValue();
		if (spRoleIndex!=null){
			Ext.apply(currUser,spRoleList[parseInt(spRoleIndex)]);
			win.close();
			//选择角色后，是否有需要根据角色载入的数据
			var needLoadByRole=mdlCfg['funcBtnControl']!==false || mdlCfg['getOrgResSign'];
			if (needLoadByRole){
				var hiddenForm=gdc.getHiddenMainForm();
				var paramTmp={spOrgId:currUser["spOrgId"]};
				Ext.apply(paramTmp,request);Ext.apply(paramTmp,mdlCfg);
				hiddenForm.submit({
					url: gdc.webContextRoot+'/common/loadDataAfterRole.action',
					method:"post",
					params:paramTmp,
					waitTitle:'提示',
					waitMsg : '正在从服务器提取数据...',
					success : function(form, action) {
						var data=action.result.data;	
						if (mdlCfg.funcBtnControl!==false) currUser['funcObjCodes']=data.funcObjCodes;
						if (mdlCfg.getOrgResSign) currUser['orgResSign']=data.orgResSign;	
						if (mdlCfg.getSpOrgObj) currUser['spOrgObj']=data.spOrgObj;
						gdc.openModule_Impl(newMainPanelFn,initModuleDataFn,mdlCfg);
					}
				});
			}else{
				gdc.openModule_Impl(newMainPanelFn,initModuleDataFn,mdlCfg);
			}
		}else{
			Ext.Msg.alert('提示',"请选择一个角色进入当前功能");
		}
	}
	win=new Ext.Window({
		title:'发现有多个角色，请选择一个进入',
		width:300,
		height:80+25*spRoleList.length,
		layout:'fit',
		closable:false,
		buttonAlign :'center',
		buttons:[{text:'确定',handler:chooseOkFun}],
		items:[{
			xtype:'form',
			bodyStyle:'padding:5px 5px 0',
			defaultType: 'radio',
			items:getBoxCmps()
		}]
	});
	win.show();
}
/**
 * 关闭弹出窗，兼容通过购电侧和统一框架打开两种方式
 * @param {} win HTML的Window，不是Ext.Window请特别注意
 * @param {Function} gdcCloseFn
 */
gdc.closePopWin=function(win,gdcCloseFn){
	if (!gdcCloseFn || typeof gdcCloseFn!="function"){
		alert("必须传入正常的关闭函数");return;
	}
	if (!win) win=window;
	//先尝试用统一框架关闭
	try{
		win.parent.Appframe.closePopWindow(window);
	}catch(e){
		if (typeof gdcCloseFn=="function"){
			gdcCloseFn();
		}
	}
}
/**
 * @private
 */
gdc.closeAppframeFuncIFrame=function(){
	var pWin=window.parent;
	if (pWin && pWin.Appframe){
		if (pWin.Appframe_desktop || pWin.Appframe_openMenuWindow){
			var funcWin=null;
			var winMgr=null;
			if (pWin.Appframe_desktop){
				winMgr=pWin.AppframeDesktop.desktop.getManager();
			}else{
				winMgr=pWin.Ext.WindowMgr;
			}
			var fnTmp=function(winTmp){
				if (winTmp.id){
					var len=winTmp.id.length;
					var i=winTmp.id.indexOf(request['funcId']);
					if (i!=-1 && len-(request['funcId'].length)==i) return true;
					else return false;
				}
			}
			var tmpArr=winMgr.getBy(fnTmp);
			if (tmpArr.length>0) funcWin=tmpArr[0];
			if (funcWin){
				funcWin.close();
			}
		}else{
			var tabPnl=pWin.Appframe.mainPanel;
			var activeItem=tabPnl.getActiveTab();
			pWin.Appframe.mainPanel.remove(activeItem);
		}
	}
}
/**
 * @private
 * @param {} mdlCfg
 * @return {Boolean}
 */
gdc.openModule_WinOpen=function(mdlCfg){
	//开发调式用或明确用window.open方式打开
	if ((gdc.constant.winOpenMode==1 || (mdlCfg && mdlCfg['winOpenMode'])) && !request['winOpenMode'] && request['funcId']){
		var surl=window.location.href;
		if (surl.indexOf("?")==-1) surl+="?winOpenMode=1";
		else surl+="&winOpenMode=1";
		var winNameTmp="gdc_winOpenMode_"+request['funcId'];
		var newWinTmp=window.top.open(surl,mdlCfg?mdlCfg['winOpenFeatures']:null);
		try{
			newWinTmp.focus();
			gdc.closeAppframeFuncIFrame();
		}catch(e){
		}
		return true;
	}else {
		return false;
	}
}
/**
 * @private
 */
gdc.getAppframeLoginName=function(){
	var loginName="";
	var pWin=window.parent;
	try{
		if (pWin && pWin.Appframe){
			loginName=pWin.Appframe_currentUserLoginName;
		}
	}
	catch(e){
		if (!gdc.isProdMode){
			var msgTxt="开发提示，检测到代码问题，必须设置域名，请设置（一般引入ext.jsp即可）"
				+"\n不设置，统一框架的前台接口不能调用，并且可能存在其他隐患！";
			gdc.alertErrorInfo(e,msgTxt);
		}
	};
	return loginName;	
}
/**
 * 检查用户是否一致，不一致提示重登录
 * @private
 * @return {Boolean}
 */
gdc.checkAppframeSameUser=function(){
	var appframeLoginName=gdc.getAppframeLoginName();
	if (appframeLoginName){
		if (appframeLoginName==currUser['loginName']) return true;
		else {
			if (window.confirm("开发提示，发现购电侧登录用户与统一框架不一致，重登录吗？（按取消继续使用当前功能）")){
				//重登录
				var surl=window.location.href;
				surl=gdc.webContextRoot+"/login_dev.jsp?TRAGEURL="+encodeURIComponent(surl);
				window.location.href=surl;
				return false;
			}else return true;
		}
	}else return true;
}
/**
 * @private 
 * @param {} mdlCfg
 * @return {Boolean}
 */
gdc.openModule_chkCfg=function(mdlCfg){
	if (mdlCfg){
		if (mdlCfg.getCodeCfg){
			var codeSign=mdlCfg.getCodeCfg.groupId || mdlCfg.getCodeCfg.groupCode;
			if (Ext.isArray(codeSign) && codeSign.length>0 && Ext.isArray(mdlCfg.getCodeCfg.codeVar) 
				&& codeSign.length==mdlCfg.getCodeCfg.codeVar.length){
			}else{
				gdc.showErrorDlg("取公用代码配置参数传递错误，请修正！");
				return false;
			}
		}
		if (mdlCfg.getMsgCfg){
			var msgKey=mdlCfg.getMsgCfg.msgKey;
			var msgVar=mdlCfg.getMsgCfg.msgVar;
			var msgParam=mdlCfg.getMsgCfg.msgParam;
			if (Ext.isArray(msgKey) && Ext.isArray(msgVar) && Ext.isArray(msgParam)
				&& msgKey.length==msgVar.length && msgVar.length==msgParam.length){}
			else {
				gdc.showErrorDlg("取消息常量配置参数传递错误，请修正！");
				return false;
			}
		}
	}
	return true;
}
/**
 * 打开一个模块的页面，必须在<body></body>之后调用，
 * 必须传入一个函数，函数参数列表空，返回Ext.Panel或子类
 * 把这个Panel画在当前页面中
 * @param {Function} newMainPanelFn 一个函数，函数参数列表是Object或空，返回Ext.Panel或子类，必须传入
 * @param {Function} initModuleDataFn 一个函数，函数参数列表空，返回JSON对象，具体数据格式参照BasicForm的submit方法的参数
 * @param {Object} mdlCfg 当前模块的控制参数，大部分菜单功能都默认即可，其中参数有：
 * 		winOpenMode (boolean)是否用window.open方式打开，默认不用，强烈不建议使用，与统一框架方式不一致。只有页面元素太多时使用。
 * 		winOpenFeatures (String)当winOpenMode为True时，带开对话框的样式，
 * 		mustRole(boolean)是否必须通过角色授权，默认是，设成true用户授权无用，若要用户授权，必须手工设成false。
 * 		needNewView (Boolean)默认需要创建Viewport，表示newMainPanelFn，值返回Panel；false时，入口函数已经创建好所有对象
 * 		needLoadUserInfo (boolean)是否需要根据角色权限或流程载入用户信息，默认载入，大部分菜单功能都需要
 * 		funcBtnControl (boolean)是否需要控制按钮权限，默认菜单进入控制，工作流进入不控制，大部分菜单功能都需要，（具体使用参见gdc.enableFuncBtn）
 * 		btnCtrlMode{String}  按钮控制模式（hide或disable）默认disable
 * 		getWfDataCfg (Array)当是单个工作流的事项时，指定要获取的流程全局数据,其中是字符数组，具体流程全局数据的Code，取回数据存在wfData中
 * 		getCodeCfg (Object)默认获取公用代码参数，其中可能的参数：groupId或groupCode（Array）；codeVar（Array）存放取回的代码的变量名
 * 		getMsgCfg (Object)取消息的配置参数，有3个属性：msgKey（消息键值），msgVar（对应js变量），msgParam（没有参数null，一个参数string，多个参数string数组；string数组兼容所有）;必须有值且一一对应
 * 		getOrgResSign(boolean)是否得到用户当前组织是否过滤资源的值，默认不获取。(可以通过url参数传递，此时值必须为1)
 * 		getSpOrgObj(boolean)是否得到用户当前组织的扩展属性，当前组织和所在单位的id，name，attrCode，对象格式：{id,name,attrCode,corpId,corpName,corpAttrCode}
 * 		newPnlParam (Object||Array)创建主界面的入口函数的参数，有传入给函数newMainPanelFn，没有忽略
 * 		isUnite (String) 值有两种 1、'select' 2、'merger'  select表示有多个角色时进行选择，merger表示合并
 */
gdc.openModule=function(newMainPanelFn,initModuleDataFn,mdlCfg){
		
	document.onmouseup = function(){parent.Ext.menu.MenuMgr.hideAll()};
	gdc.currentRoleId = gdc.request('roleId');
	//判断是否采用页面权限
	if (!gdc.isPagePurview){//如果不采用页面权限
		var pnl=newMainPanelFn();
		var viewport=new Ext.Viewport({
           layout:'fit',
           items:[pnl]
		});			
		return;
	}
	
	//自定义框架
	//alert(mdlCfg.isUnite);
	if(mdlCfg!=null){
		if('customLogin'==gdc.loginState){
			Ext.QuickTips.init();
			gdc.openModule.openModule(newMainPanelFn,mdlCfg.isUnite);
			return;
		}		
	}
	
	
	//判断是否为产品模式
	if (!gdc.isProdMode){//如果不是产品模式
		if (!gdc.checkAppframeSameUser()) return;
	}
	if (gdc.openModule_WinOpen(mdlCfg)) return;
	if (!mdlCfg){
		mdlCfg={needLoadUserInfo:true,funcBtnControl:true};
		if (request["workItemId"]) mdlCfg.funcBtnControl=false;
	}else {
		if (mdlCfg.funcBtnControl==undefined && request["workItemId"]){
			if (request["workItemId"]) mdlCfg.funcBtnControl=false;
		}
	}
	if (!gdc.openModule_chkCfg(mdlCfg)) return;
	if (request['getOrgResSign']==1) mdlCfg['getOrgResSign']=true;
	var entryFnTmp=function(){
		var hiddenForm=gdc.getHiddenMainForm();
		var paramTmp={reqData:Ext.util.JSON.encode(mdlCfg)};
		Ext.apply(paramTmp,request);
		hiddenForm.submit({
			url: gdc.webContextRoot+'/common/openModuleEntry.action',
			method:"post",
			params:paramTmp,
			waitTitle:'提示',
			waitMsg : '正在从服务器提取数据...',
			success : function(form, action) {
				var data=action.result.data;
				if (mdlCfg.getCodeCfg){//公用代码初始化
					var codeVar=mdlCfg.getCodeCfg.codeVar;
					var codeSign=mdlCfg.getCodeCfg.groupId || mdlCfg.getCodeCfg.groupCode;
					var script="";
					for (var i=0;i<codeVar.length;i++){
						script+=codeVar[i]+'='+Ext.util.JSON.encode(data.codeData["comCode_"+codeSign[i]])+";";
					}
					eval(script);
				}
				if (mdlCfg.getMsgCfg){//常量消息初始化
					var msgVar=mdlCfg.getMsgCfg.msgVar;
					var script="";
					for (var i=0;i<msgVar.length;i++){
						script+=msgVar[i]+'='+Ext.util.JSON.encode(data.msgData[i])+";";
					}
					eval(script);
				}
				if (mdlCfg.needLoadUserInfo!==false){//载入用户角色权限信息
					if (request["funcId"]){//点菜单进入
						var roleList=data.roleData;
						if (roleList.length==0){
							gdc.showErrorDlg('没有发现相关角色，请联系管理员配置权限');
						}else if (roleList.length==1){
							Ext.apply(currUser,roleList[0]);
							if (mdlCfg.funcBtnControl!==false) currUser['funcObjCodes']=data.funcObjCodes;
							if (mdlCfg.getOrgResSign) currUser['orgResSign']=data.orgResSign;
							if (mdlCfg.getSpOrgObj) currUser['spOrgObj']=data.spOrgObj;
							gdc.openModule_Impl(newMainPanelFn,initModuleDataFn,mdlCfg);
						}else{//发现多个角色选择。
							gdc.chooseASpRole(roleList,newMainPanelFn,initModuleDataFn,mdlCfg);
						}
					}else if (request["workItemId"]) {//工作流进入
						var wId=request["workItemId"];
						if (wId.indexOf(",")==-1){
							Ext.apply(currUser,data.wfData.user);
							request['wfInstId']=data.wfData.wfInstId;
							if (mdlCfg.getOrgResSign) currUser['orgResSign']=data.wfData.orgResSign;
							if (mdlCfg.getSpOrgObj) currUser['spOrgObj']=data.wfData.spOrgObj;							
							if (mdlCfg.getWfDataCfg){
								Ext.apply(wfData,data.wfData.wfData);
							}
							gdc.openModule_Impl(newMainPanelFn,initModuleDataFn,mdlCfg);
						}else{//批处理工作流的待办事宜
							//批处理工作流的待办事宜，功能自己控制，后期发现有共性的需求再添加
							gdc.openModule_Impl(newMainPanelFn,initModuleDataFn,mdlCfg);
						}
					}else {
						alert('没有通过统一框架进入，组织用户权限工作流信息不能获取，很多功能不能使用\n'
							+'只能用于开发调试，如是正式环境，请退出，从统一框架进入');
						gdc.openModule_Impl(newMainPanelFn,initModuleDataFn,mdlCfg);
					}				
				}else{
					gdc.openModule_Impl(newMainPanelFn,initModuleDataFn,mdlCfg);
				}
			}
		});
	}
	Ext.onReady(function(){
		if (document.body==null){
			alert("当前函数必须在页面载入后调用");
			return;
		}
		Ext.QuickTips.init();
		entryFnTmp();
	});
}
/**
 * 构造出指定GridPanel的可视字段的字符串,如果字段是以_DISP结尾，那么认为本字段是有编辑风格的
 * @param {Ext.grid.GridPanel} gridCmp
 * @return {Array} 其中第一个元素是逗号分隔的字段字符串，第二个元素是逗号分隔的字段名字符串
 */
gdc.getGridVisibleCols=function(gridCmp){
	var cmTmp=gridCmp.getColumnModel();
	var cols="",colNames="";
	for (var i=0;i<cmTmp.getColumnCount();i++){
		if (!cmTmp.isHidden(i)){
			var strTmp=cmTmp.getDataIndex(i);
			if (!strTmp) continue;
			var j=strTmp.lastIndexOf("_DISP");
			if (j!=-1 && (strTmp.length-5)==j) strTmp=strTmp.substring(0,strTmp.length-5);
			if (cols==""){
				cols=strTmp;colNames=cmTmp.getColumnHeader(i);
			}else {
				cols+=","+strTmp;colNames+=","+cmTmp.getColumnHeader(i);
			}
			
		}
	}
	return [cols,colNames];
}
/**
 * 从指定的容器中和指定属性等于指定值查找子组件
 * @param {Ext.Container} parentCmp 容器
 * @param {String} propName 属性
 * @param {String} propValue 值
 * @param {boolean} recursion 是否递归搜索子组件，直到找到为止
 * @return {Ext.Component}
 */
gdc.findChildCmp=function(parentCmp,propName,propValue,recursion){
	var items=parentCmp.items;
	for (var i=0;i<items.getCount();i++){
		var itemTmp=items.get(i);
		if (itemTmp.initialConfig){
			if (itemTmp.initialConfig[propName]==propValue) return itemTmp;
		}
	}
	if (recursion){
		for (var i=0;i<items.getCount();i++){
			var itemTmp=items.get(i);
			if (itemTmp.items){
				return gdc.findItem(itemTmp,propName,propValue,recursion);
			}
		}
	}
	return null;
}
/**
 * 通过bizCode设置工具栏中功能(包括菜单)的按钮状态
 * 有bizCode的按钮或菜单是需要判断权限的，没有权限设成灰色
 * @param {Ext.Toolbar} toolbar 要设置按钮所在的toolbar
 * @param {Number} spOrgId 专项组织Id，可不传，默认currUser["spOrgId"]
 * @param {Number} funcId 当前功能Id，可不传，默认request["funcId"]
 * @param {String} btnCtrlMode 按钮控制模式（hide或disable）默认disable
 * @param {Boolean} hasObjNoOp 如果按钮对象有权限是否不操作，true不操作，false操作（显示并置能），默认false
 */
gdc.enableFuncBtn=function(toolbar,spOrgId,funcId,btnCtrlMode,hasObjNoOp){
	if (!toolbar){
		alert("工具栏不存在");
	}
	var fnTmp=function(cntrObj,objCodeArr){
		var btns=cntrObj.items;
		if(btns) {
			for (var i=0;i<btns.getCount();i++){
				var btnTmp=btns.get(i);
				var bizCode=null;
				if (btnTmp.initialConfig) bizCode=btnTmp.initialConfig["bizCode"];
				if (bizCode){
					if (btnCtrlMode=="hide"){
						if (objCodeArr.indexOf(bizCode)!=-1) {
							if (!hasObjNoOp){
								if (btnTmp.disabled) btnTmp.enable();
								if (!btnTmp.isVisible()) btnTmp.show();
							}
						}
						else btnTmp.hide();
					}else{
						if (objCodeArr.indexOf(bizCode)!=-1) {
							if (!hasObjNoOp){
								if (btnTmp.disabled) btnTmp.enable();
								if (!btnTmp.isVisible()) btnTmp.show();
							}
						}
						else btnTmp.disable();
					}
				}
				if (btnTmp.menu){
					fnTmp(btnTmp.menu,objCodeArr);
				}
			}
		}
	}
	if (currUser['funcObjCodes']){
		fnTmp(toolbar,currUser['funcObjCodes']);
		return;
	}
	var hiddenForm=gdc.getHiddenMainForm();
	if (!spOrgId) spOrgId=currUser["spOrgId"];
	if (!funcId) funcId=request["funcId"];
	if (!spOrgId || !funcId){
		//没有用户权限信息，设置按钮全灰
		fnTmp(toolbar,[]);
		alert("用户的专项组织Id和功能Id必须有，才能设置按钮权限");return;
	}
	hiddenForm.submit({
		url: gdc.webContextRoot+'/common/searchFunObjects.action?spOrgId='+spOrgId+'&funcId='+funcId,
		method:"post",
		waitTitle:'提示',
		waitMsg : '正在从服务器提取数据...',
		success : function(form, action) {	
			currUser['funcObjCodes']=action.result.data;
			fnTmp(toolbar,action.result.data);
		}
	});
}
/**
 * 根据用户权限，隐藏没有权限的按钮
 */
gdc.hideFuncBtn=function(panel){
	var fnTmp=function(cntrObj,objCodeArr){
		var btns=cntrObj.buttons;
		if(btns!=null){
	        for(j=0;j<btns.length;j++){
		       	btns[j].hide();
	        }
		    for(i=0;i<objCodeArr.length;i++){
		       for(j=0;j<btns.length;j++){
		       	if(objCodeArr[i]==btns[j].id){
		       		btns[j].show();
		       	}
		       }
		    }			
		}
	}
	if (currUser['funcObjCodes']){
		fnTmp(panel,currUser['funcObjCodes']);
		return;
	}
}

/**
 * @private
 */
gdc.openModule_LoadInitData=function(newMainPanelFn,initModuleDataFn,mdlCfg,cb){
	//检查是否需要数据初始化，避免空请求
	if (mdlCfg && (mdlCfg["getCodeCfg"] || mdlCfg["getMsgCfg"])){
		var paramTmp={reqData:Ext.util.JSON.encode(mdlCfg)};
		var hiddenForm=gdc.getHiddenMainForm();
		hiddenForm.submit({
			url: gdc.webContextRoot+'/common/getInitData.action',
			method:"post",
			params:paramTmp,
			waitTitle:'提示',
			waitMsg : '正在从服务器提取数据...',
			success : function(form, action) {	
				var data=action.result.data;
				if (mdlCfg.getCodeCfg){//公用代码初始化
					var codeVar=mdlCfg.getCodeCfg.codeVar;
					var codeSign=mdlCfg.getCodeCfg.groupId || mdlCfg.getCodeCfg.groupCode;
					var script="";
					for (var i=0;i<codeVar.length;i++){
						script+=codeVar[i]+'='+Ext.util.JSON.encode(data.codeData["comCode_"+codeSign[i]])+";";
					}
					eval(script);
				}
				if (mdlCfg.getMsgCfg){//常量消息初始化
					var msgVar=mdlCfg.getMsgCfg.msgVar;
					var script="";
					for (var i=0;i<msgVar.length;i++){
						script+=msgVar[i]+'='+Ext.util.JSON.encode(data.msgData[i])+";";
					}
					eval(script);
				}
			}
		});
	}else {
		cb();
	}
}
/**
 * 在Ext.Window中打开一个指定功能的主Panel(不能在同一功能中调同一功能的入口函数)
 * @param {Function} newMainPanelFn 一个函数，函数参数列表是Object或空，返回Ext.Panel或子类或其他（根据mdlCfg来判断），必须传入
 * @param {Object} winCfg Ext.Window的初始化参数
 * @param {Function} initModuleDataFn 一个函数，函数参数列表空，返回JSON对象，具体数据格式参照BasicForm的submit方法的参数
 * @param {Object} mdlCfg 当前模块的控制参数，大部分菜单功能都默认即可，其中参数有：
 * 		needNewWin (Boolean)默认需要创建Window，表示newMainPanelFn，值返回Panel；false时，入口函数已经创建好所有对象
 * 		getCodeCfg (Object)默认获取公用代码参数，其中可能的参数：groupId或groupCode（Array）；codeVar（Array）存放取回的代码的变量名
 *		getMsgCfg (Object)取消息的配置参数，有3个属性：msgKey（消息键值），msgVar（对应js变量），msgParam（（没有参数null，一个参数string，多个参数string数组；string数组兼容所有））;必须有值且一一对应
 * 		newPnlParam (Object||Array)创建主界面的入口函数的参数，有传入给函数newMainPanelFn，没有忽略 
 */
gdc.openModuleInWindow=function(newMainPanelFn,winCfg,initModuleDataFn,mdlCfg){
	if (!gdc.openModule_chkCfg(mdlCfg)) return;
	var paintFnTmp=function(){
		var returnPnl=true;
		if (mdlCfg && mdlCfg['needNewWin']===false) returnPnl=false;
		var pnl=gdc.openModule_GetPnl(newMainPanelFn,mdlCfg,returnPnl);
		if (returnPnl===false) return;
		if (pnl){
			var winCfgTmp={
				layout:'fit',
				title:'信息维护',
				width:350,
				height:250,
				closable:true,
				modal:true,
				items:[pnl]
			};
			if (winCfg){for (var p in winCfg){
				winCfgTmp[p]=winCfg[p];
			}}
			var win=new Ext.Window(winCfgTmp);
			win.show();
		}		
	}
	
	var fnTmp=function(){
		if (initModuleDataFn){
			gdc.openModule_initData(initModuleDataFn,paintFnTmp);
		}else{
			paintFnTmp();
		}
	}
	//载入通用的初始化数据
	gdc.openModule_LoadInitData(newMainPanelFn,initModuleDataFn,mdlCfg,fnTmp);
}
/**
 * 把参数名称和值的信息填充到Form表单域中
 * @param {HTMLElement} formEle Form表单域
 * @param {Object} paramObj 参数名称和值的对象
 * @param {Boolean} firstClear 是否需要先清空，默认清空
 */
gdc.setFormInputValue=function(formEle,paramObj,firstClear){
	if (firstClear!==false) gdc.clearFormInputValue(formEle);
    for (var k in paramObj){
        var hd = document.createElement('input');
        hd.type = 'hidden';
        hd.name = k;
        hd.value = paramObj[k];
        formEle.appendChild(hd);
    }	
}
/**
 * 清空指定的Form表单域中数据
 * @param {HTMLElement} formEle
 */
gdc.clearFormInputValue=function(formEle){
	var cs=formEle.childNodes;
	for (var i=cs.length-1;i>=0;i--){
		Ext.removeNode(cs[i]);
	}
}
/**
 * 清空指定id的容器域中数据
 * @param {HTMLElement} id
 */
gdc.clearInputValue = function(id){
	$("#"+id+" input").val("") ;
};
/**
 * 得到一个隐藏的MainForm，用于发起请求
 * @return {Ext.form.BasicForm}
 */
gdc.getHiddenMainForm=function(){
	if (gdc.hiddenMainForm) {
		var form=gdc.hiddenMainForm.getEl().dom;
		if (form.enctype!="application/x-www-form-urlencoded")
			form.enctype="application/x-www-form-urlencoded";
		if (form.method!="post") form.method="post";
		gdc.clearFormInputValue(form);
		return gdc.hiddenMainForm;
	}
	else{
        var id = Ext.id();
        var form = document.createElement('form');
        form.id = id;
        form.name = id;
        form.className = 'x-hidden';
        form.method="post";
        document.body.appendChild(form);
        
		var f=new Ext.form.BasicForm(form,{});
		gdc.hiddenMainForm=f;
		return gdc.hiddenMainForm;
	}
}
/**
 * 得到一个隐藏的Frame，用于发起请求,一般用于附件下载
 * @return {Iframe的对象引用}
 */
gdc.getHiddenFrame=function(){
	if (gdc.hiddenFrame) return gdc.hiddenFrame;
	else{
        var id = Ext.id();
        var frame = document.createElement('iframe');
        frame.id = id;
        frame.name = id;
        frame.className = 'x-hidden';
        if(Ext.isIE){
            frame.src = Ext.SSL_SECURE_URL;
        }
        document.body.appendChild(frame);
        if(Ext.isIE){
           document.frames[id].name = id;
        }
        gdc.hiddenFrame=frame;
		return gdc.hiddenFrame;
	}
}
/**
 * 附件下载，数据库结构必须符合项目约定
 * @param {String} tabName 附件表名
 * @param {Number} accId 附件ID
 * @param {String} fileName 附件名(可以不传，对于1：1必传，1：n取数据库中的信息)
 * @return {Boolean}
 */
gdc.downAccData=function(tabName,accId,fileName){
	var surl=gdc.webContextRoot+'/common.do?method=getAccData&tabName='
		+tabName+'&accId='+accId;
	if (fileName) surl+="&fileName="+encodeURIComponent(fileName);
	var frameTmp=gdc.getHiddenFrame();
	frameTmp.contentWindow.location.href=surl;
	return false;
}
/**
 * 附件下载，数据库结构必须符合项目约定,可以指定Blob列，参数必须都传
 * @param {String} tabName 附件表名
 * @param {String} accFld Blob列名
 * @param {Number} accId 附件ID
 * @param {String} fileName 附件名
 * @return {Boolean}
 */
gdc.downAccExData=function(tabName,accFld,accId,fileName){
	var surl=gdc.webContextRoot+'/common.do?method=getAccData&tabName='
		+tabName+'&accFld='+accFld+'&accId='+accId;
	surl+="&fileName="+encodeURIComponent(fileName);
	var frameTmp=gdc.getHiddenFrame();
	frameTmp.contentWindow.location.href=surl;
	return false;
}
/**
 * 动态载入一个JavaScript文件
 * @param {String} strSrc JavaScript文件路径
 * @param {Function} succFun 载入之后执行的回调函数
 */
gdc.loadScript = function(strSrc, succFun) {
	var headObj=document.getElementsByTagName("head")[0];
	var scriptObjs=document.getElementsByTagName("script");
	//是否存在
	for (var i=scriptObjs.length-1;i>=0;i--){
		var tmp=scriptObjs[i].src;
		var index=(tmp)?tmp.lastIndexOf(strSrc):-1;
		if (tmp && index!=-1 && index==tmp.length-strSrc.length){
			headObj.removeChild(scriptObjs[i]);
		}
	}
	var element = document.createElement("script");
	element.src = strSrc;
	element.type = 'text/javascript';
	element.language = 'javascript';
	if (Ext.isIE) {
		element.onreadystatechange = function() {
			var state = this.readyState;
			if (state == "loaded" || state == "interactive" || state == "complete") {
				this.onreadystatechange = null;
				if (typeof succFun == "function") succFun();
			}
		};
	} else {
		element.onload = function() {
			element.onload = null;
			if (typeof succFun == "function") succFun();
		};
	}
	headObj.appendChild(element);
}
/**
 * 动态载入一组JavaScript
 * @param {Array} arrayJS JavaScript文件路径的数组
 * @param {Function} succFun 载入之后执行的回调函数
 */
gdc.loadScriptArray = function(arrayJS,succFun){
	var index=0;
	var fnTmp=function(){
		if (index<arrayJS.length){
			gdc.loadScript(arrayJS[index++],fnTmp);
		}else{
			if (typeof succFun == "function") succFun();
		}
	}
	fnTmp();
}
/**
 * 验证用户密码
 * @param {Number} userId
 * @param {String} pwd
 * @param {Function} backFn 成功后回调函数
 */
gdc.validateUser = function(userId,pwd,backFn){
	var mainForm=gdc.getHiddenMainForm();
	var validateOnAD=false;
	if (validateOnAD){
		//暂时不做，等AD域可用后回复，不影响各模块功能，各模块应该设密码验证的仍然设。
		mainForm.submit({
			url: gdc.webContextRoot+'/common.do?method=checkPwd',
			method:"post",
			params:{userId:userId,pwd:pwd},
			waitTitle:'提示',
			waitMsg : '正在向服务器提交数据...',
			success : function(form, action) {
				if (typeof backFn=="function") backFn();
			}			
		});
	}else{
		alert("没有AD环境开发暂用，直接返回");
		if (typeof backFn=="function") backFn();
	}	
}
/**
 * 把所有页面上HTML的Combo隐藏起来
 */
gdc.hideHtmlCombo = function(doc){
	if (!Ext.isIE6) return;
	if (!doc) doc=document;
	var combos=doc.getElementsByTagName("select");
	for (var i=0;i<combos.length;i++){
		if (combos[i].style.visibility!="hidden"){
			combos[i].oldVisibility=combos[i].style.visibility;
			if (combos[i].innerCnt===undefined) combos[i].innerCnt=1;
			else combos[i].innerCnt=combos[i].innerCnt+1;
			combos[i].style.visibility="hidden";
		}else{
			if (combos[i].innerCnt!==undefined) combos[i].innerCnt=combos[i].innerCnt+1;
		}
	}
	//递归iframe
	var iframes=doc.getElementsByTagName("iframe");
	for (var i=0;i<iframes.length;i++){
		try{
			iframes[i].contentWindow.document;
		}
		catch(e){ 
			continue;
		}
		gdc.hideHtmlCombo(iframes[i].contentWindow.document);
	}
}
/**
 * 把所有页面上HTML的Combo显示出来,必须先调gdc.hideHtmlCombo
 */
gdc.showHtmlCombo = function(doc){
	if (!Ext.isIE6) return;
	if (!doc) doc=document;
	var combos=doc.getElementsByTagName("select");
	for (var i=0;i<combos.length;i++){
		if (combos[i].oldVisibility!==undefined){
			combos[i].innerCnt=combos[i].innerCnt-1;
			if (combos[i].innerCnt==0){
				combos[i].style.visibility=combos[i].oldVisibility;
				combos[i].oldVisibility=undefined;
				combos[i].innerCnt=undefined;
			}
		}
	}
	//递归iframe
	var iframes=doc.getElementsByTagName("iframe");
	for (var i=0;i<iframes.length;i++){
		try{
			iframes[i].contentWindow.document;
		}
		catch(e){
			continue;
		}		
		gdc.showHtmlCombo(iframes[i].contentWindow.document);
	}	
}
/**
 * 得到选择的第一条记录，通过记录中的某个唯一字段比较
 * @param {Ext.grid.GridPanel}
 * @param {String} 进行比较
 * @return {Ext.data.Record}
 */
gdc.get1stSelectedRecord = function(grid, fieldName) {
	var selMdl = grid.getSelectionModel();
	if (selMdl.getCount() > 0) {
		if ((fieldName==undefined)||(fieldName==null)){
			fieldName = "ID";
		}
		var store = grid.getStore();
		var cnt = store.getCount();
		var j = 0;
		var arr = selMdl.getSelections();
		var l = arr.length;
		for (var i = 0; i < cnt; i++) {
			var record = store.getAt(i);
			var recordId = record.get(fieldName);
			var b = false;
			for (j = 0; j < l; j++) {
				if (arr[j].get(fieldName) == recordId) {
					b = true;
					break;
				}
			}
			if (b) {
				break;
			}
		}
		var rec = arr[j];
		return rec;
	} else {
		return null;
	}
}
/**
 * 得到选择的当前记录，如果是多选，则是最后选择的那条
 * @param {Ext.grid.GridPanel}
 * @return {Ext.data.Record}
 */
gdc.getCurrSelectedRecord = function(grid) {
	var selMdl = grid.getSelectionModel();
	if (selMdl.getCount() > 0) {
		var arr = selMdl.getSelections();
		var rec = arr[0];
		return rec;
	} else {
		return null;
	}
}
/**
 * 刷新树图中选中的节点，必须是异步载入的节点才有用。用于treePanel的tools中refresh按钮的事件
 * @param {Ext.EventObject} event
 * @param {Ext.Element} toolEl
 * @param {Ext.Panel} panel
 */
gdc.refreshTreeNode=function(event ,toolEl,panel){
	if (panel && panel.getXType()=='treepanel'){
		var selMdl=panel.getSelectionModel();
		var selNode=null;
		if (selMdl.getSelectedNode) selNode=selMdl.getSelectedNode();
		if (!selNode){
			if (selMdl.getSelectedNodes) {
				selNode=selMdl.getSelectedNodes();
				if (selNode && selNode.length>0) selNode=selNode[0];
				else selNode=null;
			}
		}
		if (selNode==null) selNode=panel.root;
		while (selNode){
			if (selNode.reload){
				if (!selNode.attributes.children){
					selNode.reload();
					break;
				}
			}
			selNode=selNode.parentNode;
		}
	}
};
/**
 * 得到传入树图选中的节点数
 * @param {Ext.tree.TreePanel} treePnl
 * @return {Number}
 */
gdc.getTreeSelectedCnt=function(treePnl){
	//下面是获取选中节点的代码
	if (treePnl.checkModel){//有checkbox的选择
		var checks=treePnl.getChecked();
		if (checks && checks.length>0){
			return checks.length;
		}
	}else{
		var selMdl=treePnl.getSelectionModel();
		if (selMdl){
			//没有checkbox的单选
			if (selMdl.getSelectedNode && selMdl.getSelectedNode()) return 1;
			//没有checkbox的多选
			if (selMdl.getSelectedNodes) return selMdl.getSelectedNodes().length;
		}
	}
	return 0;
};
//UpdateManager,一般适用于请求Html
(function(){
	if (Ext.UpdateManager){
		Ext.apply(Ext.UpdateManager.prototype, {
			update : function(url, params, callback, discardUrl){
		        if(this.fireEvent("beforeupdate", this.el, url, params) !== false){
		            var cfg, callerScope;
		            if(typeof url == "object"){ // must be config object
		                cfg = url;
		                url = cfg.url;
		                params = params || cfg.params;
		                callback = callback || cfg.callback;
		                discardUrl = discardUrl || cfg.discardUrl;
		                callerScope = cfg.scope;
		                if(typeof cfg.nocache != "undefined"){this.disableCaching = cfg.nocache;};
		                if(typeof cfg.text != "undefined"){this.indicatorText = '<div class="loading-indicator">'+cfg.text+"</div>";};
		                if(typeof cfg.scripts != "undefined"){this.loadScripts = cfg.scripts;};
		                if(typeof cfg.timeout != "undefined"){this.timeout = cfg.timeout;};
		            }
		            this.showLoading();
		
		            if(!discardUrl){
		                this.defaultUrl = url;
		            }
		            if(typeof url == "function"){
		                url = url.call(this);
		            }
		
		            var o = Ext.apply(cfg ||{}, {
		                url : url,
		                params: (typeof params == "function" && callerScope) ? params.createDelegate(callerScope) : params,
		                success: this.processSuccess,
		                failure: this.processFailure,
		                scope: this,
		                callback: undefined,
		                timeout: (this.timeout*1000),
		                disableCaching: this.disableCaching,
		                argument: {
		                    "options": cfg,
		                    "url": url,
		                    "form": null,
		                    "callback": callback,
		                    "scope": callerScope || window,
		                    "params": params
		                }
		            });
					o.headers={requestHtml:"1"};
		            this.transaction = Ext.Ajax.request(o);
		        }
		    },
		    
		    formUpdate : function(form, url, reset, callback){
		        if(this.fireEvent("beforeupdate", this.el, form, url) !== false){
		            if(typeof url == "function"){
		                url = url.call(this);
		            }
		            form = Ext.getDom(form)
		            this.transaction = Ext.Ajax.request({
		                form: form,
		                url:url,
		                success: this.processSuccess,
		                failure: this.processFailure,
		                scope: this,
		                timeout: (this.timeout*1000),
		                headers: {requestHtml:"1"},
		                argument: {
		                    "url": url,
		                    "form": form,
		                    "callback": callback,
		                    "reset": reset
		                }
		            });
		            this.showLoading.defer(1, this);
		        }
		    }
		});		
	}
})();
//自定义的表单验证
(function(){
	Ext.apply(Ext.form.VTypes, {
	    daterange : function(val, field) {
	    	if (field.otherTrigger){//有另一个时间域设置后触发的验证，回置标识位，立即返回true
	    		field.otherTrigger=false;
	    		return true;
	    	}
			//失去焦点时，如果值为空，更新日期选择最大或最小限制
			var blurFnTmp=function(cmp){
				if (cmp.getValue()==""){
					if (cmp.startDateField) {
						var sd = Ext.getCmp(cmp.startDateField);
						if (sd){
							sd.maxValue = null;
							sd.otherTrigger = true;
							if (sd.menu && sd.menu.picker) {
								sd.menu.picker.maxDate = null;
								dispUpd(sd.menu.picker);
							}	
							sd.validate();
						}
					} else if (cmp.endDateField) {
						var ed = Ext.getCmp(cmp.endDateField);
						if (ed){
							ed.minValue = null;
							ed.otherTrigger = true;
							if (ed.menu && ed.menu.picker) {
								ed.menu.picker.minDate = null;
								dispUpd(ed.menu.picker);
							}
							ed.validate();
						}
					}				
				}
			}
			if (!field.resetMaxMinDomainFn){
				field.resetMaxMinDomainFn=blurFnTmp;
				field.on("blur",field.resetMaxMinDomainFn);
			}
			// We need to force the picker to update values to recaluate the
			// disabled dates display
			var dispUpd = function(picker) {
				var ad = picker.activeDate;
				picker.activeDate = null;
				picker.update(ad);
			};
			
			var date = field.parseDate(val);
			if (!date) return true;
			if (field.startDateField) {
				var sd = Ext.getCmp(field.startDateField);
				if (sd){
					sd.maxValue = date.clone();//避免被改变
					sd.otherTrigger = true;
					if (sd.menu && sd.menu.picker) {
						sd.menu.picker.maxDate = date;
						dispUpd(sd.menu.picker);
					}
					sd.validate();
				}
			} else if (field.endDateField) {
				var ed = Ext.getCmp(field.endDateField);
				if (ed){
					ed.minValue = date.clone();//避免被改变
					ed.otherTrigger = true;
					if (ed.menu && ed.menu.picker) {
						ed.menu.picker.minDate = date;
						dispUpd(ed.menu.picker);
					}
					ed.validate();
				}
			}
			/*
			 * Always return true since we're only using this vtype to set the
			 * min/max allowed values (these are tested for after the vtype test)
			 */
			return true;
		},
	
	    password : function(val, field) {
	        if (field.initialPassField) {
	            var pwd = Ext.getCmp(field.initialPassField);
	            return (val == pwd.getValue());
	        }
	        return true;
	    },
	
	    passwordText : 'Passwords do not match'
	});
})();
//覆盖Date的ParseDate行为，增加时间域的范围验证。
(function(){
	if(Date.createParser){
		Date.parseDate = function(input, format, needOverflowHint) {
		    if (Date.parseFunctions[format] == null) {
		        Date.createParser(format);
		    }
		    var func = Date.parseFunctions[format];
		    return Date[func](input,needOverflowHint);
		}; 
		
		Date.createParser = function(format) {
		    var funcName = "parse" + Date.parseFunctions.count++;
		    var regexNum = Date.parseRegexes.length;
		    var currentGroup = 1;
		    Date.parseFunctions[format] = funcName;
		
		    var code = "Date." + funcName + " = function(input,needOverflowHint){\n"
		        + "var y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, ms = -1, o, z, u, v;\n"
		        + "input = String(input);var d = new Date();\n"
		        + "y = d.getFullYear();\n"
		        + "m = d.getMonth();\n"
		        + "d = d.getDate();\n"
		        + "var results = input.match(Date.parseRegexes[" + regexNum + "]);\n"
		        + "if (results && results.length > 0) {";
		    var regex = "";
		
		    var special = false;
		    var ch = '';
		    for (var i = 0; i < format.length; ++i) {
		        ch = format.charAt(i);
		        if (!special && ch == "\\") {
		            special = true;
		        }
		        else if (special) {
		            special = false;
		            regex += String.escape(ch);
		        }
		        else {
		            var obj = Date.formatCodeToRegex(ch, currentGroup);
		            currentGroup += obj.g;
		            regex += obj.s;
		            if (obj.g && obj.c) {
		                code += obj.c;
		            }
		        }
		    }
		    //增加时间域的范围验证
		    code+="if (!u) { var str='';"
		    	+"if (y<1800 || y>3000) {str=y+'年份不对(1800-3000)';}else if (m!=-1 && m>11) {str=(m+1)+'月份不对(1-12)';} else \n"
		    	+"{"//判断日期
		    	+"var maxDay=Date.daysInMonth[m];"
		    	+"if (m==1){ if(y % 4==0 && (y % 100!=0 || y % 400==0)){maxDay=29;}\n"
		    	+"else {maxDay=28;}}\n"
		    	+"d = d>maxDay ? maxDay : d;\n"
		    	+"if (d!=-1 && d>maxDay) {str=y+'-'+(m+1)+'-'+d+'日期不对,日期不能超过'+maxDay;}"
		    	+"}\n"
		    	+"if (h!=-1 && h>23) {str=h+'小时不对(0-23)';}\n"
		    	+"if (i!=-1 && i>59) {str=i+'分不对(0-59)';}\n"
		    	+"if (s!=-1 && s>59) {str=s+'秒不对(0-59)';}\n"
		    	+"if (str){if (needOverflowHint===1) return str; else return;}"
		    	+"}";
		
		    code += "if (u){\n"
		        + "v = new Date(u * 1000);\n" // give top priority to UNIX time
		        + "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0 && ms >= 0){\n"
		        + "v = new Date(y, m, d, h, i, s, ms);\n"
		        + "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0){\n"
		        + "v = new Date(y, m, d, h, i, s);\n"
		        + "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0 && i >= 0){\n"
		        + "v = new Date(y, m, d, h, i);\n"
		        + "}else if (y >= 0 && m >= 0 && d > 0 && h >= 0){\n"
		        + "v = new Date(y, m, d, h);\n"
		        + "}else if (y >= 0 && m >= 0 && d > 0){\n"
		        + "v = new Date(y, m, d);\n"
		        + "}else if (y >= 0 && m >= 0){\n"
		        + "v = new Date(y, m);\n"
		        + "}else if (y >= 0){\n"
		        + "v = new Date(y);\n"
		        + "}\n}\nreturn (v && Ext.type(z || o) == 'number')?" // favour UTC offset over GMT offset
		        +     " (Ext.type(z) == 'number' ? v.add(Date.SECOND, (v.getTimezoneOffset() * 60) + z) :" // reset to UTC, then add offset
		        +         " v.add(Date.HOUR, (v.getGMTOffset() / 100) + (o / -100))) : v;\n" // reset to GMT, then add offset
		        + "}";
		    Date.parseRegexes[regexNum] = new RegExp("^" + regex + "$", "i");
		    eval(code);
		}
	}
})();
//NumberField只允许输入20位，只能执行一次。
(function(){
	if (Ext.form.NumberField){
		Ext.apply(Ext.form.NumberField.prototype,{
			initComponent:function(){
				Ext.form.NumberField.superclass.initComponent.call(this);
				
				if (this.maxLength>20) this.maxLength=20;
				this.defaultAutoCreate=Ext.apply({},this.defaultAutoCreate);
				this.defaultAutoCreate.maxLength=this.maxLength;
			}
		});
	}
})();
//Field域如果，必输修改它的样式;如果隐藏label，则转移fieldLabel属性
(function(){
	if (Ext.form.Field){
		var fnTmp=Ext.form.Field.prototype.initComponent;
		Ext.apply(Ext.form.Field.prototype, {
			initComponent : function(){
				var args = arguments;
				fnTmp.apply(this,args);
				if (this.allowBlank===false) {
					this.itemCls='required';
				}
				if (this.hideLabel){
					this.origFieldLabel=this.fieldLabel;
					this.fieldLabel="";
				}
			}
		});
	}
})();
//DateField验证提示修改，增加域超出判断提示。
(function(){
	if (Ext.form.DateField){
		Ext.apply(Ext.form.DateField.prototype,{
		    setValue : function(date){
		        Ext.form.DateField.superclass.setValue.call(this, this.formatDate(this.parseDate(date)));
		        //同时触发验证
		        this.validate();
		        if (this.resetMaxMinDomainFn) this.resetMaxMinDomainFn(this);
		    },			
			
		    parseDateAndOverflowHint : function(value){
		        if(!value || Ext.isDate(value)){
		            return value;
		        }
		        var v = Date.parseDate(value, this.format, 1);
		        if(!v && this.altFormats){
		            if(!this.altFormatsArray){
		                this.altFormatsArray = this.altFormats.split("|");
		            }
		            for(var i = 0, len = this.altFormatsArray.length; i < len && !v; i++){
		                v = Date.parseDate(value, this.altFormatsArray[i], 1);
		            }
		        }
		        return v;
		    },	
		    
		    validateValue : function(value){
		        value = this.formatDate(value);
		        if(!Ext.form.DateField.superclass.validateValue.call(this, value)){
		            return false;
		        }
		        if(value.length < 1){ // if it's blank and textfield didn't flag it then it's valid
		             return true;
		        }
		        var svalue = value;
		        //增加域超出判断提示
		        value = this.parseDateAndOverflowHint(value);
		        if (value && typeof value=="string"){
		        	this.markInvalid(value);
		        	return false;
		        }
		        value = this.parseDate(value);
		        if(!value){
		            this.markInvalid(String.format(this.invalidText, svalue, this.format));
		            return false;
		        }
		        var time = value.getTime();
		        if(this.minValue && time < this.minValue.getTime()){
		            this.markInvalid(String.format(this.minText, this.formatDate(this.minValue)));
		            return false;
		        }
		        if(this.maxValue && time > this.maxValue.getTime()){
		            this.markInvalid(String.format(this.maxText, this.formatDate(this.maxValue)));
		            return false;
		        }
		        if(this.disabledDays){
		            var day = value.getDay();
		            for(var i = 0; i < this.disabledDays.length; i++) {
		            	if(day === this.disabledDays[i]){
		            	    this.markInvalid(this.disabledDaysText);
		                    return false;
		            	}
		            }
		        }
		        var fvalue = this.formatDate(value);
		        if(this.ddMatch && this.ddMatch.test(fvalue)){
		            this.markInvalid(String.format(this.disabledDatesText, fvalue));
		            return false;
		        }
		        return true;
		    }			
		})
	}
})();
//验证字符长度，改成中文的方式
(function(){
	if (Ext.form.TextField) {
		Ext.apply(Ext.form.TextField.prototype, {
			validateValue : function(value) {
				if (value.length < 1 || value === this.emptyText) { // if it's blank
					if (this.allowBlank) {
						if (typeof this.validator == "function") {
							var msg = this.validator(value);
							if (msg !== true) {
								this.markInvalid(msg);
								return false;
							}
						}
						this.clearInvalid();
						return true;
					} else {
						this.markInvalid(this.blankText);
						return false;
					}
				}
				var zhStrLen = gdc.getZhStrLength(value);
				if (zhStrLen < this.minLength) {
					this.markInvalid(String.format(this.minLengthText,
							this.minLength));
					return false;
				}
				if (zhStrLen > this.maxLength) {
					this.markInvalid(String.format(this.maxLengthText,
							this.maxLength));
					return false;
				}
				if (this.vtype) {
					var vt = Ext.form.VTypes;
					if (!vt[this.vtype](value, this)) {
						this.markInvalid(this.vtypeText || vt[this.vtype + 'Text']);
						return false;
					}
				}
				if (typeof this.validator == "function") {
					var msg = this.validator(value);
					if (msg !== true) {
						this.markInvalid(msg);
						return false;
					}
				}
				if (this.regex && !this.regex.test(value)) {
					this.markInvalid(this.regexText);
					return false;
				}
				return true;
			}
		});
	};
})();
//复选树图的dblclick方法，改成disabled的节点不再响应check事件。
(function(){
	if (Ext.tree.TreeNodeUI) {
		Ext.apply(Ext.tree.TreeNodeUI.prototype, {
			onDblClick : function(e){
		        e.preventDefault();
		        if(this.disabled){
		            return;
		        }
		        if(this.node.disabled) {
		        	return;
		        }
		        if(this.checkbox){
		            this.toggleCheck();
		        }
		        if(!this.animating && this.node.hasChildNodes()){
		            this.node.toggle();
		        }
		        this.fireEvent("dblclick", this.node, e);
		    }
		});
	};
})();
//原来的树图不支持数组参数的传递
(function(){
	if (Ext.tree.TreeLoader){
	    Ext.apply(Ext.tree.TreeLoader.prototype, {
		    getParams: function(node){
		        var buf = [], bp = this.baseParams;
		        for(var key in bp){
	                var ov = bp[key], k = encodeURIComponent(key);
		            if(typeof bp[key] != "function"){
		            	if(!Ext.isArray(ov)){
		                	buf.push(encodeURIComponent(key), "=", encodeURIComponent(ov), "&");
			            }else{
			                if (ov.length) {
			                    for(var i = 0, len = ov.length; i < len; i++) {
			                        buf.push(k, "=", encodeURIComponent(ov[i] === undefined ? '' : ov[i]), "&");
			                    }
			                } else {
			                    buf.push(k, "=&");
			                }		            	
			            }
		            }
		        }
		        buf.push("node=", encodeURIComponent(node.id));
		        return buf.join("");
		    }
	    });
	}
})();
//对于公用代码的下拉框，过滤不在用的,只应该做一次。
(function(){
	if (Ext.form.ComboBox) {
		var fnTmp=Ext.form.ComboBox.prototype.initComponent;
		Ext.apply(Ext.form.ComboBox.prototype, {
			initComponent : function(){
				var noRemove=(this.needRemoveInvalid===false);
				if (!noRemove && Ext.isArray(this.store) && Ext.isArray(this.store[0])){
					var elTmp=this.store[0];
					if (elTmp.length==3 && typeof elTmp[2]=="boolean"){
						this.store=gdc.getAvailComCodeArr(this.store);
					}
				}
				var args = arguments;
				fnTmp.apply(this,args);
			}
		});
	};
})();
//修改Window的默认top,left为center of container，如果小于零则改为0；
(function(){
	if (Ext.Window){
		Ext.apply(Ext.Window.prototype,{
			beforeShow : function(){
		        delete this.el.lastXY;
		        delete this.el.lastLT;
		        if(this.x === undefined || this.y === undefined){
		            var xy = this.el.getAlignToXY(this.container, 'c-c');
		            var pos = this.el.translatePoints(xy[0], xy[1]);
		            this.x = this.x === undefined? (pos.left>=0?pos.left:0) : this.x;
		            this.y = this.y === undefined? (pos.top>=0?pos.top:0) : this.y;
		        }
		        this.el.setLeftTop(this.x, this.y);
		
		        if(this.expandOnShow){
		            this.expand(false);
		        }
		
		        if(this.modal){
		            Ext.getBody().addClass("x-body-masked");
		            this.mask.setSize(Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom.getViewHeight(true));
		            this.mask.show();
		        }
		    }
		});
	}
})();
//设置Container的 bufferResize，提高性能
(function(){
	if (Ext.Container){
		var fnTmp=Ext.Container.prototype.initComponent;
		Ext.apply(Ext.Container.prototype,{
			initComponent : function(){
				var args = arguments;
				fnTmp.apply(this,args);
				if (this.bufferResize===undefined) this.bufferResize=true;
			}
		})
	}
});
//设置GridPanel的条纹行
(function(){
	if (Ext.grid.GridPanel){
		var fnTmp=Ext.grid.GridPanel.prototype.initComponent;
		Ext.apply(Ext.grid.GridPanel.prototype,{
			initComponent : function(){
				var args = arguments;
				fnTmp.apply(this,args);
				if (this.notInGlobalCtrl!==true){
					this.stripeRows=gdc.constant.gridNeedStripe;
				}
			}
		})		
	}
})();
//增加formlayout的Label显示在右边的功能，初步完成。
Ext.namespace("Ext.ux.layout");
Ext.ux.layout.LabelRightFormLayout = Ext.extend(Ext.layout.FormLayout, {
	setContainer : function(ct){
        Ext.layout.FormLayout.superclass.setContainer.call(this, ct);

        if(ct.labelAlign){
            ct.addClass('x-form-label-'+ct.labelAlign);
        }

        if(ct.hideLabels){
            this.labelStyle = "display:none";
            this.elementStyle = "padding-left:0;";
            this.labelAdjust = 0;
        }else{
            this.labelSeparator = ct.labelSeparator || this.labelSeparator;
            this.labelSeparator = '';
            ct.labelWidth = ct.labelWidth || 100;
            if(typeof ct.labelWidth == 'number'){
                var pad = (typeof ct.labelPad == 'number' ? ct.labelPad : 5);
                this.labelAdjust = ct.labelWidth+pad;
                this.labelStyle = "width:"+ct.labelWidth+"px;";
                //this.elementStyle = "padding-right:"+(ct.labelWidth+pad)+'px';
                this.elementStyle = "padding-left:0;";
            }
            /*
            if(ct.labelAlign == 'top'){
                this.labelStyle = "width:auto;";
                this.labelAdjust = 0;
                this.elementStyle = "padding-left:0;";
            }
            */
        }

        if(!this.fieldTpl){
            // the default field template used by all form layouts
        	var t = new Ext.Template(
                '<div style="position:relative" class="x-form-item {5}" tabIndex="-1">',
                    '<div class="x-form-element" id="x-form-el-{0}" style="{3}"></div>',
                    '<label for="{0}" style="position:absolute;top:0;right:0;{2}" class="x-form-item-label">{1}{4}</label>',
                    '<div class="{6}"></div>',
                '</div>'
            );
            t.disableFormats = true;
            t.compile();
            Ext.layout.FormLayout.prototype.fieldTpl = t;
        }
    }
});
Ext.Container.LAYOUTS['label_right_form'] = Ext.ux.layout.LabelRightFormLayout;
//自定义IFrame组件
Ext.ux.IFrameComponent = Ext.extend(Ext.BoxComponent, {
	onRender : function(ct, position){
		if (!this.id) this.id=Ext.id();
		this.el = ct.createChild({tag: 'iframe', id: 'iframe-'+ this.id, frameBorder: 0, src: this.url});
	},
	
	getContentWindow : function(){
		var idStr='iframe-'+ this.id;
		var iframeEl=document.getElementById(idStr);
		return iframeEl.contentWindow
	}
});


var createXMLHttpRequest = function(){
	var XHR;
	if(window.XMLHttpRequest){ 	//Mozilla 浏览器、IE 7
		XHR = new XMLHttpRequest();
	}
	else if(window.ActiveXObject){ 	// IE 5、IE 6支持 ActiveX 对象
		try{
			XHR = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				XHR = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
			}
		}
	}
	return XHR;
}
var useHasOwn = {}.hasOwnProperty ? true : false;

// crashes Safari in some instances
//var validRE = /^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;

var pad = function(n) {
    return n < 10 ? "0" + n : n;
};

var m = {
    "\b": '\\b',
    "\t": '\\t',
    "\n": '\\n',
    "\f": '\\f',
    "\r": '\\r',
    '"' : '\\"',
    "\\": '\\\\'
};

var encodeString = function(s){
    if (/["\\\x00-\x1f]/.test(s)) {
        return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
            var c = m[b];
            if(c){
                return c;
            }
            c = b.charCodeAt();
            return "\\u00" +
                Math.floor(c / 16).toString(16) +
                (c % 16).toString(16);
        }) + '"';
    }
    return '"' + s + '"';
};

var encodeArray = function(o){
    var a = ["["], b, i, l = o.length, v;
        for (i = 0; i < l; i += 1) {
            v = o[i];
            switch (typeof v) {
                case "undefined":
                case "function":
                case "unknown":
                    break;
                default:
                    if (b) {
                        a.push(',');
                    }
                    a.push(v === null ? "null" : encode(v));
                    b = true;
            }
        }
        a.push("]");
        return a.join("");
};

var encodeDate = function(o){
    return '"' + o.getFullYear() + "-" +
            pad(o.getMonth() + 1) + "-" +
            pad(o.getDate()) + "T" +
            pad(o.getHours()) + ":" +
            pad(o.getMinutes()) + ":" +
            pad(o.getSeconds()) + '"';
};

var isArray = function(v){
	return v && typeof v.pop == 'function';
};

var isDate = function(v){
	return v && typeof v.getFullYear == 'function';
};

/**
 * Encodes an Object, Array or other value
 * @param {Mixed} o The variable to encode
 * @return {String} The JSON string
 */
this.encode = function(o){
    if(typeof o == "undefined" || o === null){
        return "null";
    }else if(isArray(o)){
        return encodeArray(o);
    }else if(isDate(o)){
        return encodeDate(o);
    }else if(typeof o == "string"){
        return encodeString(o);
    }else if(typeof o == "number"){
        return isFinite(o) ? String(o) : "null";
    }else if(typeof o == "boolean"){
        return String(o);
    }else {
        var a = ["{"], b, i, v;
        for (i in o) {
            if(!useHasOwn || o.hasOwnProperty(i)) {
                v = o[i];
                switch (typeof v) {
                case "undefined":
                case "function":
                case "unknown":
                    break;
                default:
                    if(b){
                        a.push(',');
                    }
                    a.push(this.encode(i), ":",
                            v === null ? "null" : this.encode(v));
                    b = true;
                }
            }
        }
        a.push("}");
        return a.join("");
    }
};

/**
 * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws a SyntaxError.
 * @param {String} json The JSON string
 * @return {Object} The resulting object
 */
this.decode = function(json){
    return eval("(" + json + ')');
};

var urlEncode = function(o){
    if(!o){
        return "";
    }
    var buf = [];
    for(var key in o){
        var ov = o[key], k = encodeURIComponent(key);
        var type = typeof ov;
        if(type == 'undefined'){
            buf.push(k, "=&");
        }else if(type != "function" && type != "object"){
            buf.push(k, "=", encodeURIComponent(ov), "&");
        }else if(isArray(ov)){
            if (ov.length) {
             for(var i = 0, len = ov.length; i < len; i++) {
                 buf.push(k, "=", encodeURIComponent(ov[i] === undefined ? '' : ov[i]), "&");
             }
         } else {
             buf.push(k, "=&");
         }
        }
    }
    buf.pop();
    return buf.join("");
};
/*
*判断一输入框是否非负整数
*/
gdc.isPlus = function(obj){
	var value=obj.value;
	if(value=='') return false;
	var regExp = "^[0-9]+$";
	var matchValue = value.match(regExp);
	if(matchValue!=null) return true;
	else {
		alert('请输入非负整数!');
		obj.value = '';
		obj.focus();
		return false;
	}
}
/*
*判断一个输入框是否正整数
*allowNull,是否允许为空
*/
gdc.isPositiveInt = function(obj,allowNull){
	if (allowNull) {
		if (obj.value=="") return true;
	}
	
	if (obj.type=="text"){
		if (obj.readOnly) return true;
	}
	var value=obj.value;

	if (isNaN(value) || (value=="")){
		alert("请输入一正整数");
		obj.value="";
		obj.focus();
		return false;
	}
	var i=parseInt(value);
	if (isNaN(i)){
		alert("请输入一正整数");
		obj.value="";
		obj.focus();
		return false;
	}else {
		if (i<=0){
			alert("请输入一正整数");
			obj.value="";
			obj.focus();
			return false;		
		}else {
			obj.value=i;
			return true;
		}
	}
}
/**
 * 删除字符串前后的空格
 */
String.prototype.trim = function(){
    // 用正则表达式将前后空格
    // 用空字符串替代。
    //var result = this.replace(/(^\s*)|(\s*$)/g, "");
    return this.replace(/(^(\s|\u3000)*)|((\s|\u3000)*$)/g, "");
}
/**
 * 判断是否是日期时间格式,形如形如 (2008-07-22 13:04:06)
 * 崔辉 添加 
 */
gdc.strDateTime = function (obj,str)
{
var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
var r = str.match(reg); 
if(r==null)
{
	alert("请输入一个形如 (2008-07-22 13:04:06)的内容");
	obj.focus();
	return false; 
}

var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
if((d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7])){
	return true;
}else{
	alert("请输入一个形如 (2008-07-22 13:04:06)的内容");
	obj.focus();
	return false;
}

//return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
} 
/**
 * 判断是否是日期格式,形如 (2008-07-22) 
 * 崔辉 添加
 */
gdc.isDate = function (str)
{
var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
if(r==null)
{
	alert("请输入一个形如 (2008-07-22)的内容");
	return false;
}
 
var d= new Date(r[1], r[3]-1, r[4]); 
if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){
	return true;
}else{
	alert("请输入一个形如 (2008-07-22)的内容");
	return false;
}
//return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}
/**
 * 判断是否是日期格式,形如 (13:04:06)
 * 崔辉 添加 
 */
gdc.isTime = function (str)
{
var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
if (a == null) {alert('输入的参数不是时间格式,形如(13:04:06)'); return false;}
if (a[1]>24 || a[3]>60 || a[4]>60)
{
alert("时间格式不对,形如(13:04:06)");
return false
}
return true;
}


//将不允许为空的字段标签变为绿色
Ext.override(Ext.layout.FormLayout, {
    renderItem: Ext.layout.FormLayout.prototype.renderItem.createInterceptor(function(c, position, target) {
        if (c.allowBlank != null && !c.allowBlank) {
            c.fieldLabel =  "<span style=\"font-weight:bold;color:#008080;\" ext:qtitle=\"提示\" ext:qtip=\"" + c.blankText + "\">"+c.fieldLabel+"</span>";
        }
    })
});


//防止menu被activex遮挡
Ext.override(Ext.menu.Menu, {
	render : function(){
        if(this.el){
            return;
        }
        var el = this.el = this.createEl();
        var d = this.el.dom;
		var iframeid=this.id+"_iframe"
		d.innerHTML+='<iframe style="position:absolute;top:0px; left:0px;z-index:-1;width:500px;height:1000px;border:0;" frameborder=0 scrolling=no></iframe>';
        
        if(!this.keyNav){
            this.keyNav = new Ext.menu.MenuNav(this);
        }
        if(this.plain){
            el.addClass("x-menu-plain");
        }
        if(this.cls){
            el.addClass(this.cls);
        }
                this.focusEl = el.createChild({
            tag: "a", cls: "x-menu-focus", href: "#", onclick: "return false;", tabIndex:"-1"
        });
        var ul = el.createChild({tag: "ul", cls: "x-menu-list"});
        ul.on("click", this.onClick, this);
        ul.on("mouseover", this.onMouseOver, this);
        ul.on("mouseout", this.onMouseOut, this);
        this.items.each(function(item){
            var li = document.createElement("li");
            li.className = "x-menu-list-item";
            ul.dom.appendChild(li);
            item.render(li, this);
        }, this);
        this.ul = ul;
        
        this.autoWidth();
    }
});

//防止下拉列表被activex遮挡
Ext.override(Ext.form.ComboBox, {
    initList : function(){
        if(!this.list){
            var cls = 'x-combo-list';

            this.list = new Ext.Layer({
                shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false
            });
            
            this.list.dom.innerHTML+='<iframe style="position:absolute;top:0px; left:0px;z-index:-1;width:500px;height:1000px;border:0;" frameborder=0 scrolling=no></iframe>';
  
            var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
            this.list.setWidth(lw);
            this.list.swallowEvent('mousewheel');
            this.assetHeight = 0;

            if(this.title){
                this.header = this.list.createChild({cls:cls+'-hd', html: this.title});
                this.assetHeight += this.header.getHeight();
            }

            this.innerList = this.list.createChild({cls:cls+'-inner'});
            this.innerList.on('mouseover', this.onViewOver, this);
            this.innerList.on('mousemove', this.onViewMove, this);
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));

            if(this.pageSize){
                this.footer = this.list.createChild({cls:cls+'-ft'});
                this.pageTb = new Ext.PagingToolbar({
                    store:this.store,
                    pageSize: this.pageSize,
                    renderTo:this.footer
                });
                this.assetHeight += this.footer.getHeight();
            }

            if(!this.tpl){
                
                this.tpl = '<tpl for="."><div class="'+cls+'-item">{' + this.displayField + '}</div></tpl>';
                
            }

            
            this.view = new Ext.DataView({
                applyTo: this.innerList,
                tpl: this.tpl,
                singleSelect: true,
                selectedClass: this.selectedClass,
                itemSelector: this.itemSelector || '.' + cls + '-item'
            });

            this.view.on('click', this.onViewClick, this);

            this.bindStore(this.store, true);

            if(this.resizable){
                this.resizer = new Ext.Resizable(this.list,  {
                   pinned:true, handles:'se'
                });
                this.resizer.on('resize', function(r, w, h){
                    this.maxHeight = h-this.handleHeight-this.list.getFrameWidth('tb')-this.assetHeight;
                    this.listWidth = w;
                    this.innerList.setWidth(w - this.list.getFrameWidth('lr'));
                    this.restrictHeight();
                }, this);
                this[this.pageSize?'footer':'innerList'].setStyle('margin-bottom', this.handleHeight+'px');
            }
        }
    }
});



/**
 * grid 刷新列表后  全选框 清空
 */
Ext.override(Ext.grid.GridView, {
     doRender : function(cs, rs, ds, startRow, colCount, stripe){
        var ts = this.templates, ct = ts.cell, rt = ts.row, last = colCount-1;
        var tstyle = 'width:'+this.getTotalWidth()+';';
                var buf = [], cb, c, p = {}, rp = {tstyle: tstyle}, r;
        for(var j = 0, len = rs.length; j < len; j++){
            r = rs[j]; cb = [];
            var rowIndex = (j+startRow);
            for(var i = 0; i < colCount; i++){
                c = cs[i];
                p.id = c.id;
                p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
                p.attr = p.cellAttr = "";
                p.value = c.renderer(r.data[c.name], p, r, rowIndex, i, ds);
                p.style = c.style;
                if(p.value == undefined || p.value === "") p.value = "&#160;";
                if(r.dirty && typeof r.modified[c.name] !== 'undefined'){
                    p.css += ' x-grid3-dirty-cell';
                }
                cb[cb.length] = ct.apply(p);
            }
            var alt = [];
            if(stripe && ((rowIndex+1) % 2 == 0)){
                alt[0] = "x-grid3-row-alt";
            }
            if(r.dirty){
                alt[1] = " x-grid3-dirty-row";
            }
            rp.cols = colCount;
            if(this.getRowClass){
                alt[2] = this.getRowClass(r, rowIndex, rp, ds);
            }
            rp.alt = alt.join(" ");
            rp.cells = cb.join("");
            buf[buf.length] =  rt.apply(rp);
        }
        if(this.innerHd){
	 	    var dom=Ext.fly(this.innerHd).query("div.x-grid3-hd-checker-on");
			if(dom){
			    Ext.get(dom).removeClass("x-grid3-hd-checker-on")
			}
	 	}
        return buf.join("");
    }
});

/**
 * grid 刷新列表后 grid中没有数据  全选框 清空
 */
Ext.override(Ext.grid.GridPanel, {
	onRender : function(ct, position){

        Ext.grid.GridPanel.superclass.onRender.apply(this, arguments);
        var c = this.body;
        this.el.addClass('x-grid-panel');
        var view = this.getView();
        view.init(this);
        c.on("mousedown", this.onMouseDown, this);
        c.on("click", this.onClick, this);
        c.on("dblclick", this.onDblClick, this);
        c.on("contextmenu", this.onContextMenu, this);
        c.on("keydown", this.onKeyDown, this);
        this.relayEvents(c, ["mousedown","mouseup","mouseover","mouseout","keypress"]);
        this.getSelectionModel().init(this);
        this.view.render();
        var grid = this;
		this.store.on('datachanged', function(){
			grid.getEl().select('div.x-grid3-hd-checker').removeClass('x-grid3-hd-checker-on');     //x-grid3-hd-checker-on
        });
    }
});

/**
 * 文本框 文本域禁止输入 script、html标签验证
 */
Ext.override(Ext.form.TextField, {
    initComponent : function(){
    	if(!this.validator){
    		this.validator = function(){
    			if(gdc.isHasHtml(this.getValue())){
    				return '文本框中不允许输入script、html标签'
    			}else{
    				return true;
    			}
    		}
    	}
        Ext.form.TextField.superclass.initComponent.call(this);
        this.addEvents(
            
            'autosize',

            
            'keydown',
            
            'keyup',
            
            'keypress'
        );
    }
});

//覆盖form超时时间
Ext.override(Ext.form.BasicForm,{
    doAction : function(action, options){
        if(typeof action == 'string'){
        	options.timeout=60;
            action = new Ext.form.Action.ACTION_TYPES[action](this, options);
        }
        if(this.fireEvent('beforeaction', this, action) !== false){
            this.beforeAction(action);
            action.run.defer(100, action);
        }
        return this;
    } 
});

//覆盖ajax超时时间
Ext.override(Ext.data.Connection,{
	timeout:60000
});

/**
 * set FormPanel's fields disable,一般用于查看时，设置所有字段只读置灰
 * @param {Ext.form.FormPanel} formPanel
 * 王刚 添加
 */
gdc.setFormDisable=function(formPanel,disable){
	var children=formPanel.items;
	if (!children) return;
	if (disable===true) disable=true;else disable=false;
	for (var i=0;i<children.length;i++){
		try{
			var childTmp=children.get(i);
			if (childTmp.getXType()=="radiogroup"){
				childTmp.setDisabled(disable);
				continue;
			}
			if (childTmp.items){
				gdc.setFormDisable(childTmp,disable);
			}
			var xtype=childTmp.getXType();
			if (childTmp.isFormField) {
				if (xtype=="hidden") continue;
				if (xtype=="textfield" || xtype=="textarea" || xtype=="numberfield"){
					if (childTmp.rendered){
						childTmp.getEl().dom.disable=disable;
					}else{
						childTmp.setDisabled(disable);
					}
				}else if (childTmp.isXType("trigger")){
					childTmp.setDisabled(disable);
				}else {
					childTmp.setDisabled(disable);
				} 
			}
		}catch(e){
			continue;
		}
	}	
}

/**
 * 是否存在script、或者html标签
 * @param {} str
 */
gdc.isHasHtml = function(str) {
	if(new RegExp("<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>")
		.test(str)) {
		return true;	
	}
	
	if(new RegExp("<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>")
		.test(str)) {
		return true;	
	}
	
	if(new RegExp("<[^>]+>")
		.test(str)) {
		return true;	
	}
	
	return false;
}



gdc.request = function(paras){ 
	var url = location.href;   
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");   
	var paraObj = {}   
	for (i=0; j=paraString[i]; i++){   
	paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);   
	}   
	var returnValue = paraObj[paras.toLowerCase()];   
	if(typeof(returnValue)=="undefined"){   
		return "";   
	}else{   
		return returnValue;   
	}   
} 


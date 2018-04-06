Ext.namespace('com.frontier.aueic.qshSys.aueicOrgTree');
var tradeInfo = [];
/*
* 创建地区选择页面
* orgTree 地区信息
* btype 选择类型
* checkid 默认选择id
* rootid：权限控制 32401
* isShowCounty:丁节点为全省32101 是否创建头部
*/
function createOrgSelect(orgTree,btype,checkid,rootid,isShowCounty)
{
	var content = " ";	
	if( orgTree == null || orgTree.length <= 0 ) return content;
	/*找到根节点*/
	var root = findOrgInfo(orgTree,rootid);
	//设置默认值
	if(checkid == null ||checkid =='') checkid = root.id;
	var needHeader = true ;
	needHeader = isShowCounty==false ? false : true;
 
	if(root.id != '32101')
	{
		needHeader = false;
	}
	var header = '';
	/*是不是需要创建头部*/
	if(needHeader){
			header =	"<div class=\"row_regiontitle\" >" + 
									"<div class=\"row\">" + 
										 createComLi(root,checkid,'row-regionbutton',btype) +
										 createSepLi(false,'row-regionbutton',btype,'101','苏南') +
										 createSepLi(false,'row-regionbutton',btype,'102','苏中') +
										 createSepLi(false,'row-regionbutton',btype,'103','苏北') +
										 createSepLi(false,'row-regionbutton',btype,'104','沿海') +
									"</div>	" + 
							"</div>" ;	
	}
	else{
		header = 	"<div class=\"row_regiontitle\" >" + 
								"<div class=\"row\">" + 
										 createComLi(root,checkid,'row-regionbutton',btype) +
								"</div>	" + 
					"</div>" ; 
	
	}
				
				
	/*找到第二级子节点*/
	var secondleaf = findLeaf(orgTree,root.id);	
	var ullist = '';
	if(needHeader)
	{
		var ListType=1;
		for(var i= 0; i<secondleaf.length;i++)
		{
		    if(ListType==1)
		    {
				/*第三级*/	
				ullist +=  "<div class=\"row_region\" style=\"background-color:#f4f4f4;\" >" ;
		    }
		    else
		    {
		    	/*第三级*/	
				ullist +=  "<div class=\"row_region\" >" ;
		    }
			var  thirdleaf = findLeaf(orgTree,secondleaf[i].id);
			ullist += createUl(thirdleaf,btype,checkid,secondleaf[i],needHeader,6);	
			ullist += "</div>";
			ListType=-ListType;
		}
	}else
	{
			ullist +=  "<div class=\"row_region\" >" ;
			ullist += createUl(secondleaf,btype,checkid,null,needHeader,6);
			ullist += "</div>";
	}
	content = header + ullist;				
	return content;
}

/*
* 创建ul
* orgList：地区信息
* btype：按钮类型
*/
function createUl(orgList,btype,checkid,parent,needHeader,LineCount)
{
	var i = 0;
//	if(orgList.length <=0 || orgList == null)
//	{
//		return '';
//	}
	var ul = "<div class=\"row\">";
	if( parent != null)
	{		
		ul += createComLi(parent,checkid,'row-regionbutton',btype)
		
	}
	$.each(orgList,function(n,org)
	{
		 ul += createComLi(org,checkid,'row-regionbutton',btype,LineCount)
		 i++;
		 if( i % (LineCount-1) ==0&&needHeader)  //完整的省内省市县，县级5个显示不开，换行
		 {
		     ul += "</div><div class=\"row\"><div class=\"col-md-2 org_col\"></div>";
		 }
	});
	ul+="</div>";
	return ul;
}


/*
* 创建ul
* tradeList：地区信息
*/
function createTradeUl(tradeList,btype,checkid,parent)
{
	var i = 0;
//	if(orgList.length <=0 || orgList == null)
//	{
//		return '';
//	}
	var ul = "<div class=\"row\">";
	if( parent != null)
	{		
		ul += createTradeComLi(parent,checkid,'row-regionbutton',btype)
		
	}
	$.each(tradeList,function(n,org)
	{
		 ul += createTradeComLi(org,checkid,'row-regionbutton',btype)
		 i++;
		 if( i % 5 ==0)  //5个显示不开，换行
		 {
		     ul += "</div><div class=\"row\"><div class=\"col-md-2 org_col\"></div>";
		 }
	});
	ul+="</div>";
	return ul;
}

/*
*org : 单个地区, 
*check 是不是选择, 默认false
*bsize：按钮大小 btn-sm,btn-xs 默认 btm-xs
*btype：按钮类型 默认单选radio  多选为checkbox
*typeFlag:用以区分是地区还是行业
*/
function createComLi(org,checkid,bsize,btype,LineCount,typeFlag)
{
	var active = '';
	var checked ='';
	if(checkid == org.id)
	{ 
	   active  = 'active';
	   checked = 'checked';
	}
	if( btype != 'radio' && btype != 'checkbox')
	{
		btype = 'radio';
	}
	
	if( bsize == null || bsize=='')
	{
		bsize = 'row-regionbutton';
	}
	var inputName = "orgNo";
	if(typeFlag == "trade"){
		inputName = "tradeNo";
	}
	
	return "<div ondblclick=\"afasdf()\" class=\"col-md-2 org_col \"><label type=\"button\" class=\"btn "+ bsize +" " + active +"\" style=\"width:110px;text-align:left;\"><input class=\"orgNo_btn\" type=\""+ btype +"\" name=\""+inputName+"\" id=\""+org.id+"\" value=\""+replaceName(org.name)+"\" "+ checked + ">"+replaceName(org.name)+"</label></div>"
}


function afasdf()
{
	 
}

/*
*trade : 单个行业, 
*check 是不是选择, 默认false
*bsize：按钮大小 btn-sm,btn-xs 默认 btm-xs
*btype：按钮类型 默认单选
*/
function createTradeComLi(org,checkid,bsize,btype,LineCount)
{
	var active = '';
	var checked ='';
	if(checkid == org.id)
	{ 
	   active  = 'active';
	   checked = 'checked';
	}
	if( btype != 'radio' && btype != 'checkbox')
	{
		btype = 'radio';
	}
	
	if( bsize == null || bsize=='')
	{
		bsize = 'row-regionbutton';
	}
	var Sowntext = org.name.length>8?(org.name.substring(0,8)+'...'):org.name;
	var EmText= org.name.length>8?" <em>"+org.name+"</em>":"";
    return "<div class=\"col-md-2 org_col \" style=\"width:155px;\"><div class=\"SlowFast \" style=\"width:155px;\"><label type=\"button\" class=\"btn "+ bsize +" " + active +"\" style=\"width:125px;text-align:left;\"><input class=\"orgNo_btn\"  type=\""+ btype +"\" name=\"tradeCode\" id=\""+org.id+"\" value=\""+org.name+"\" "+ checked + ">"+Sowntext+"</label>" +
    		   EmText+" </div></div>"
}


/*
*check 是不是选择, 默认false
*bsize：按钮大小 btn-sm,btn-xs 默认 btm-xs
*btype：按钮类型 默认单选
*oid：optionid,value
*oname: 标签
*/
function createSepLi(check, bsize, btype, oid,oname)
{
	var active = '';
	var checked ='';
	if(check)
	{ 
	   active  = 'active';
	   checked = 'checked';
	}
	if( btype != 'radio' && btype != 'checkbox')
	{
		btype = 'radio';
	}
	
	if( bsize == null || bsize=='')
	{
		bsize = 'row-regionbutton';
	}
 return "<div class=\"col-md-2 org_col\"><label class=\"btn "+ bsize +" " + active +"\" style=\"width:110px;text-align:left;\"><input class=\"orgNo_btn\" type=\""+ btype +"\" name=\"orgNo\" id=\""+oid+"\" value=\""+replaceName(oname)+"\" "+ checked + ">"+				replaceName(oname)+"</label></div>"
}

/*
* tree: 树
* id
*/
function findLeaf(tree, id)
{
	var list = $.map(tree,function(v)
	{
		if(v.pid == id)
			return v;
	});
	return list;
}

/*
* 找父节点
* tree： 树
* org： 子节点
*/
function findParent(tree,org)
{
	var parent = null;
	for(var i=0 ;i< tree.length; i++)
	{
		if(org.pid == tree[i].id)
		{
			parent = tree[i];
			break;
		}
	}
	return parent;
}

/*
* 查找根节点
*/
function findRoot(tree)
{
	if(tree.length == 1 ) return tree[0];
	var first = tree[0];
	var root = first;
	while(true)
	{
		root = first;
		first = findParent(tree,first);
		if(null == first) break;
	}
	return root;
}


/*
* 找父节点
* tree： 树
* org： 子节点
*/
function findOrgInfo(tree,id)
{
	var org = null;
	id = id == null ? 32101: id;
	for(var i=0 ;i< tree.length; i++)
	{
		if(id == tree[i].id)
		{
			org = tree[i];
			break;
		}
	}
	return org;
}

/*
* 查找根节点
*/
function replaceName(orgName)
{
	if(orgName == null) return null;
	orgName = orgName.replace('供电公司','').replace('营业部','').replace('供电','').replace('电力公司','');
	return orgName;
}
 
function getOrgList()
{
	var orglist =  '[{"id":"32101"  , "pid":"0"        ,"name":"江苏省电力公司"   },         '+ 
	'{"id":"32401"   , "pid":"32101"    ,"name":"南京供电公司"    },          '+
	'{"id":"3240101" , "pid":"32401"    ,"name":"南京供电公司市区"   },       '+
	'{"id":"3240106" , "pid":"32401"    ,"name":"南京市溧水区供电公司" },     '+
	'{"id":"3240107" , "pid":"32401"    ,"name":"南京市高淳区供电公司" },     '+
	'{"id":"3240108" , "pid":"32401"    ,"name":"六合营业部" },               '+
	'{"id":"3240109" , "pid":"32401"    ,"name":"浦口营业部" },               '+
	'{"id":"3240110" , "pid":"32401"    ,"name":"江宁营业部" },               '+
	'{"id":"32402"   , "pid":"32101"    ,"name":"无锡供电公司" },             '+
	'{"id":"201"     , "pid":"32402"    ,"name":"无锡供电公司市区" },         '+
	'{"id":"3240206" , "pid":"32402"    ,"name":"江阴市供电公司" },           '+
	'{"id":"3240207" , "pid":"32402"    ,"name":"宜兴市供电公司" },           '+
	'{"id":"3240208" , "pid":"32402"    ,"name":"农电"  },                    '+
		'{"id":"32404"   , "pid":"32101"    ,"name":"常州供电公司 " },            '+
	'{"id":"3240401" , "pid":"32404"    ,"name":"常州供电公司市区" },         '+
	'{"id":"3240402" , "pid":"32404"    ,"name":"武进供电公司" },             '+
	'{"id":"3240403" , "pid":"32404"    ,"name":"金坛市供电公司"  },          '+
	'{"id":"3240405" , "pid":"32404"    ,"name":"溧阳市供电公司" },           '+
	
	
	'{"id":"32405"   , "pid":"32101"    ,"name":"苏州供电公司"  },            '+
	'{"id":"202"     , "pid":"32405"    ,"name":"苏州供电公司市区" },         '+
	'{"id":"3240505" , "pid":"32405"    ,"name":"苏州市吴江区供电公司" },     '+
	'{"id":"3240506" , "pid":"32405"    ,"name":"常熟市供电公司" },           '+
	'{"id":"3240507" , "pid":"32405"    ,"name":"张家港市供电公司" },         '+
	'{"id":"3240508" , "pid":"32405"    ,"name":"昆山市供电公司" },           '+
	'{"id":"3240509" , "pid":"32405"    ,"name":"太仓市供电公司"},            '+
	
		'{"id":"32411"   , "pid":"32101"    ,"name":"镇江供电公司"},              '+
	'{"id":"3241101" , "pid":"32411"    ,"name":"镇江供电公司市区"},          '+
	'{"id":"3241106" , "pid":"32411"    ,"name":"扬中供电公司"},              '+
	'{"id":"3241108" , "pid":"32411"    ,"name":"句容供电公司"},              '+
	'{"id":"3241109" , "pid":"32411"    ,"name":"丹阳市供电公司"},            '+
	
	
	'{"id":"32406"   , "pid":"32101"    ,"name":"南通供电公司" },             '+
	'{"id":"3240601" , "pid":"32406"    ,"name":"南通供电公司市区" },         '+
	'{"id":"3240602" , "pid":"32406"    ,"name":"启东市供电公司"},            '+
	'{"id":"3240603" , "pid":"32406"    ,"name":"海门市供电公司"},            '+
	'{"id":"3240604" , "pid":"32406"    ,"name":"如东县供电公司" },           '+
	'{"id":"3240605" , "pid":"32406"    ,"name":"通州营业部" },               '+
	'{"id":"3240606" , "pid":"32406"    ,"name":"如皋市供电公司" },           '+
	'{"id":"3240607" , "pid":"32406"    ,"name":"海安县供电公司" },           '+
	
	'{"id":"32409"   , "pid":"32101"    ,"name":"盐城供电公司"  },            '+
	'{"id":"3240901" , "pid":"32409"    ,"name":"响水县供电公司"},            '+
	'{"id":"3240902" , "pid":"32409"    ,"name":"滨海县供电公司"},            '+
	'{"id":"3240903" , "pid":"32409"    ,"name":"阜宁县供电公司"},            '+
	'{"id":"3240904" , "pid":"32409"    ,"name":"射阳县供电公司"},            '+
	'{"id":"3240905" , "pid":"32409"    ,"name":"建湖县供电公司"},            '+
	'{"id":"3240907" , "pid":"32409"    ,"name":"大丰市供电公司"},            '+
	'{"id":"3240908" , "pid":"32409"    ,"name":"东台市供电公司"},            '+
	'{"id":"3240909" , "pid":"32409"    ,"name":"盐城供电公司市区"},          '+
	'{"id":"3240913" , "pid":"32409"    ,"name":"盐都营业部" },               '+
	'{"id":"32410"   , "pid":"32101"    ,"name":"扬州供电公司"},              '+
	'{"id":"203"     , "pid":"32410"    ,"name":"高邮供电公司"},              '+
	'{"id":"3241001" , "pid":"32410"    ,"name":"扬州供电公司市区"},          '+
	'{"id":"3241006" , "pid":"32410"    ,"name":"仪征市供电公司"  },          '+
	'{"id":"3241007" , "pid":"32410"    ,"name":"扬州市江都区供电公司"},      '+
	'{"id":"3241009" , "pid":"32410"    ,"name":"宝应县供电公司"},            '+

	'{"id":"32412"   , "pid":"32101"    ,"name":"泰州供电公司"},              '+
	'{"id":"3241201" , "pid":"32412"    ,"name":"泰州供电公司市区"},          '+
	'{"id":"3241203" , "pid":"32412"    ,"name":"姜堰市供电公司"},            '+
	'{"id":"3241204" , "pid":"32412"    ,"name":"泰兴市供电公司"},            '+
	'{"id":"3241206" , "pid":"32412"    ,"name":"兴化市供电公司"},            '+
	'{"id":"3241208" , "pid":"32412"    ,"name":"靖江市供电公司"},            '+
	
	'{"id":"32403"   , "pid":"32101"    ,"name":"徐州供电公司" },             '+
	'{"id":"3240301" , "pid":"32403"    ,"name":"徐州供电公司市区"},          '+
	'{"id":"3240303" , "pid":"32403"    ,"name":"徐州市贾汪供电公司" },       '+
	'{"id":"3240304" , "pid":"32403"    ,"name":"邳州市供电公司" },           '+
	'{"id":"3240305" , "pid":"32403"    ,"name":"新沂市供电公司" },           '+
	'{"id":"3240306" , "pid":"32403"    ,"name":"沛县供电公司" },             '+
	'{"id":"3240307" , "pid":"32403"    ,"name":"睢宁县供电公司" },           '+
	'{"id":"3240308" , "pid":"32403"    ,"name":"丰县供电公司" },             '+
	'{"id":"3240309" , "pid":"32403"    ,"name":"铜山县供电公司" },           '+
	'{"id":"3240316" , "pid":"32403"    ,"name":"经济开发区供电营业部(作废)"},'+
	'{"id":"32407"   , "pid":"32101"    ,"name":"连云港供电公司" },           '+
	'{"id":"3240701" , "pid":"32407"    ,"name":"连云港供电公司市区"},        '+
	'{"id":"3240703" , "pid":"32407"    ,"name":"灌南县供电公司"},            '+
	'{"id":"3240706" , "pid":"32407"    ,"name":"赣榆县供电公司"},            '+
	'{"id":"3240707" , "pid":"32407"    ,"name":"东海县供电公司"},            '+
	'{"id":"3240708" , "pid":"32407"    ,"name":"灌云县供电公司"},            '+
	'{"id":"32408"   , "pid":"32101"    ,"name":"淮安供电公司"},              '+
	'{"id":"3240801" , "pid":"32408"    ,"name":"淮安营业部" },               '+
	'{"id":"3240802" , "pid":"32408"    ,"name":"淮阴营业部"  },              '+
	'{"id":"3240803" , "pid":"32408"    ,"name":"涟水县供电公司"},            '+
	'{"id":"3240804" , "pid":"32408"    ,"name":"洪泽县供电公司"},            '+
	'{"id":"3240805" , "pid":"32408"    ,"name":"金湖县供电公司"},            '+
	'{"id":"3240806" , "pid":"32408"    ,"name":"盱眙县供电公司"},            '+
	'{"id":"3240808" , "pid":"32408"    ,"name":"淮安供电公司市区"},          '+
	
	'{"id":"32413"   , "pid":"32101"    ,"name":"宿迁供电公司" },             '+
	'{"id":"3241301" , "pid":"32413"    ,"name":"宿迁供电公司市区"},          '+
	'{"id":"3241303" , "pid":"32413"    ,"name":"泗洪县供电公司"},            '+
	'{"id":"3241304" , "pid":"32413"    ,"name":"泗阳县供电公司"},            '+
	'{"id":"3241305" , "pid":"32413"    ,"name":"沭阳县供电公司"},            '+
	'{"id":"3240201" , "pid":"0"        ,"name":"无锡供电公司市区"},          '+
	'{"id":"3240202" , "pid":"0"        ,"name":"无锡供电公司市区"},          '+
	'{"id":"3240203" , "pid":"0"        ,"name":"无锡供电公司市区"},          '+
	'{"id":"3240205" , "pid":"0"        ,"name":"无锡供电公司市区"},          '+
	'{"id":"3240501" , "pid":"0"        ,"name":"苏州供电公司市区"},          '+
	'{"id":"3240502" , "pid":"0"        ,"name":"苏州供电公司市区"},          '+
	'{"id":"3240503" , "pid":"0"        ,"name":"苏州供电公司市区"},          '+
	'{"id":"3240504" , "pid":"0"        ,"name":"苏州供电公司市区"},          '+
	'{"id":"3241004" , "pid":"0"        ,"name":"高邮供电公司"},              '+
	'{"id":"3241008" , "pid":"0"        ,"name":"高邮供电公司"}]              ';
	return JSON.parse(orglist);
}


function getLittleOrgList()
{
	var orglist =  '[{"id":"32101"  , "pid":"0"        ,"name":"江苏省电力公司"   },         '+ 
	'{"id":"32401"   , "pid":"32101"    ,"name":"南京供电公司"    },          '+
 
	'{"id":"32402"   , "pid":"32101"    ,"name":"无锡供电公司" },             '+
 
   '{"id":"32404"   , "pid":"32101"    ,"name":"常州供电公司 " },            '+
	 
	 '{"id":"32405"   , "pid":"32101"    ,"name":"苏州供电公司"  },            '+
	
	'{"id":"32411"   , "pid":"32101"    ,"name":"镇江供电公司"},              '+
	 
	'{"id":"32406"   , "pid":"32101"    ,"name":"南通供电公司" },             '+
	
	'{"id":"32409"   , "pid":"32101"    ,"name":"盐城供电公司"  },            '+
		
	'{"id":"32410"   , "pid":"32101"    ,"name":"扬州供电公司"},              '+
	
	'{"id":"32412"   , "pid":"32101"    ,"name":"泰州供电公司"},              '+
	
	'{"id":"32403"   , "pid":"32101"    ,"name":"徐州供电公司" },             '+
	 
	'{"id":"32407"   , "pid":"32101"    ,"name":"连云港供电公司" },           '+
	 
	'{"id":"32408"   , "pid":"32101"    ,"name":"淮安供电公司"},              '+
	
    '{"id":"32413"   , "pid":"32101"    ,"name":"宿迁供电公司" }]              ';
	return JSON.parse(orglist);
}
 
/*
* 行业信息 infos
* 行业类型 tradeType
* 返回 行业结果集
*/
function getTradelistbyType(infos,tradeType)
{
	var list = $.map(infos,function(v)
	{
		if(v.tradeType == tradeType)
			return v;
	});
	return list;
}


/*
* 行业信息 infos
* 行业ID tradeValue
* 返回 行业信息
*/
function findTradeInfo(infos,tradeValue)
{
	var list = '';
	for(var i=0 ;i< infos.length; i++)
	{
		if(tradeValue == infos[i].tradeValue)
		{
			list = infos[i];
			break;
		}
	}
	return list;
}


/*
* 行业信息 infos
* 行业ID tradeValue
* 返回 子行业信息集
*/
function findChilidInfos(infos,tradeValue)
{
	var list = $.map(infos,function(v)
	{
		if(v.tradePCode == tradeValue)
			return v;
	});
	return list;
}

/*
* 行业信息 infos
* 行业ID tradeValue
* 返回 子行业信息集
*/
function findRootInfos(infos)
{
	var list = $.map(infos,function(v)
	{
		if( v.tradePCode == null || v.tradePCode == '0')
			return v;
	});
	return list;
}


/*
* 行业信息 infos
* 根行业代码 rootCode
* 默认选中代码 checkCode
* 是否展开 showAll
* 返回 行业结果集
*/
function createTradeNode(infos,rootCode,checkCode,showAll)
{
	var root = findTradeInfo(infos,rootCode);
	var node = {};
	var childlist = findChilidInfos(infos,root.tradeValue);
	//叶子节点
	if(childlist.length <= 0)
	{
		node = createNode(root,checkCode,true,showAll);
	}
	//非叶子节点
	else 
	{
		node = createNode(root,checkCode,false,showAll);
		var i = 0;
		node.children = [];
		while(i < childlist.length)
		{
			var child = createTradeNode(infos,childlist[i].tradeValue,checkCode)
			node.children[i] = child;
			i++;
		}
	}
	return node;
}

/*
* 生成trade的json对象
* 是不是叶子节点 isleaf
* 是否展开 showAll
* 默认选中代码 checkCode
*/
function createNode(info,checkCode,isleaf,showAll)
{
	var node = {
		id:info.tradeValue,
		text:info.tradeName,
		attributes:{
			tradeCode:info.tradeCode,
			tradeType:info.tradeType
			}
	};
	if(checkCode == info.tradeValue)
	{
		node.checked = true  ;
	}
	if(!showAll)
	{
		if(!isleaf) node.state ='closed';
	}
	return node;
}

/*
* 构建国民经济行业代码
* 根行业代码 rootCode
* 默认选中代码 checkCode
* 是否展开 showAll
* 返回 行业结果集
*/
function bulidGMTrade(tradeInfos,checkCode,showAll)
{
	var infos = getTradelistbyType(tradeInfos,'C');
	if(checkCode == null) checkCode = 'C302';
	var _root= {
		id:'0-C',
		text:'国民经济',
		attributes:{tradeCode:'',tradeType:'C'}
	};
	if(!showAll)
	{
		_root.state ='closed';
	}
	_root.children = [];
	var rootlist = findChilidInfos(infos,'301');
	for(var i = 0 ;i< rootlist.length; i++)
	{
		var _ctree = createTradeNode(infos,rootlist[i].tradeValue,null,showAll);
		_root.children[i] = _ctree;
	}
	return _root;
}


/*
* 构建产业行业代码 C3000 下面的3个产业 + 居民电量
* 根行业代码 rootCode
* 默认选中代码 checkCode
* 是否展开 showAll
* 返回 行业结果集
*/
function bulidDomainTrade(tradeInfos,checkCode,showAll)
{
	var infos = getTradelistbyType(tradeInfos,'C');
	var _root= {
		id:'0-C3',
		text:'产业',
		attributes:{tradeCode:'',tradeType:'C'}
	};
	if(!showAll)
	{
		_root.state ='closed';
	}
	//C3000的子行业
	var _c3000list =  findChilidInfos(infos,'C3000');
	_root.children = [];
	for(var i=0;i<_c3000list.length;i++)
	{
		var child =  createNode(_c3000list[i],checkCode,true,showAll);
		_root.children[i] = child;
	}
	//C3004以及下面的行业
	var tree = createTradeNode(infos,'C3004',checkCode,showAll);
	_root.children[_c3000list.length] = tree;
	return _root;
}


/*
* 构建营销行业代码
* 根行业代码 rootCode
* 默认选中代码 checkCode
* 是否展开 showAll
* 返回 行业结果集
*/
function bulidBTrade(tradeInfos,checkCode,showAll)
{
	var _root= {
		id:'0-S',
		text:'营销行业',
		attributes:{tradeCode:'',tradeType:'S'}
	};
	if(!showAll)
	{
		_root.state ='closed';
	}
	_root.children = [];
	var _binfos = getTradelistbyType(tradeInfos,'S');
	var rootlist = findRootInfos(_binfos);
	for(var i = 0 ;i< rootlist.length; i++)
	{
		var _btree = createTradeNode(_binfos,rootlist[i].tradeValue,null,showAll);
		_root.children[i] = _btree;
	}
	return _root;
}

/*
* 构建十大行业代码
* 根行业代码 rootCode
* 默认选中代码 checkCode
* 是否展开 showAll
* 返回 行业结果集
*/
function bulidGTrade(tradeInfos,checkCode,showAll)
{
	var _root= {
		id:'0-G',
		text:'十大行业',
		attributes:{tradeCode:'',tradeType:'G'}
	};
	if(!showAll)
	{
		_root.state ='closed';
	}
	_root.children = [];
	var _binfos = getTradelistbyType(tradeInfos,'G');
	var rootlist = findRootInfos(_binfos);
	for(var i = 0 ;i< rootlist.length; i++)
	{
		var _btree = createTradeNode(_binfos,rootlist[i].tradeValue,null,showAll);
		_root.children[i] = _btree;
	}
	return _root;
}

/*
* 构建典型行业代码
* 根行业代码 rootCode
* 默认选中代码 checkCode
* 是否展开 showAll
* 返回 行业结果集
*/
function bulidDTrade(tradeInfos,checkCode,showAll)
{
	var _root= {
		id:'0-D',
		text:'典型行业',
		attributes:{tradeCode:'',tradeType:'D'}
	};
	if(!showAll)
	{
		_root.state ='closed';
	}
	_root.children = [];
	var _binfos = getTradelistbyType(tradeInfos,'D');
	var rootlist = findRootInfos(_binfos);
	for(var i = 0 ;i< rootlist.length; i++)
	{
		var _btree = createTradeNode(_binfos,rootlist[i].tradeValue,null,showAll);
		_root.children[i] = _btree;
	}
	return _root;
}


/*
* 根行业代码 rootCode
* 默认选中代码 checkCode
* 是否展开 showAll
* 返回 行业结果集
*/
function createQshTree(checkCode,showAll)
{
	var _root= {
		id:'0-Q',
		text:'全社会',checked:false,
		attributes:{tradeCode:'',tradeType:''}
	};
	if(!showAll)
	{
		_root.state ='closed';
	}
	//"QSH""300""301""NET""GK""GY""QSHC""QSHG""QSHGM"
	_root.children = [];
	var qshNode = { id:'QSH', text:'全社会用电',attributes:{tradeCode:'QSH',tradeType:'E'}};
	_root.children[0] = qshNode;
	var totalNode = { id:'300', text:'全社会用电总计',attributes:{tradeCode:'300',tradeType:'C'}};
	_root.children[1] = totalNode;
	var tradeNode = { id:'301', text:'全行业用电',attributes:{tradeCode:'301',tradeType:'C'}};
	_root.children[2] = tradeNode;
	var netNode = { id:'NET', text:'网供',attributes:{tradeCode:'NET',tradeType:''}};
	_root.children[3] = netNode;
	var gyNode = { id:'GY', text:'工业用电',attributes:{tradeCode:'GY',tradeType:''}};
	_root.children[4] = gyNode;
	var gkNode = { id:'GK', text:'省际关口',attributes:{tradeCode:'GK',tradeType:''}};
	_root.children[5] = gkNode;
	var sdNode = { id:'QSHC', text:'售电',attributes:{tradeCode:'QSHC',tradeType:''}};
	_root.children[6] = sdNode;
	var gdNode = { id:'QSHG', text:'供电',attributes:{tradeCode:'QSHG',tradeType:''}};
	_root.children[7] = gdNode;
	var gdnhNode = { id:'QSHGM', text:'供电(拟合)',attributes:{tradeCode:'QSHGM',tradeType:''}};
	_root.children[8] = gdnhNode;
	return _root;
}


/*
* 根行业代码 rootCode
* 默认选中代码 checkCode
* 是否展开 showAll
* 返回 行业结果集
*/
function create99TradeTree(checkCode,showAll)
{	var tradeInfos = queryTrade();
	var treeList =[];
	var _99root = bulidGMTrade(tradeInfos,checkCode,showAll);
	var _domainroot = bulidDomainTrade(tradeInfos,checkCode,showAll);
	treeList.push(_99root);
	treeList.push(_domainroot);
	return treeList;
}



/*
* 根行业代码 rootCode
* 默认选中代码 checkCode
* 是否展开 showAll
* 返回 行业结果集
* 大行业根节点采用0-前缀，用以和子行业区分
* 国民经济 C;八大行业 G;营销行业 S;典型行业 D;产业 C3;全社会 Q
* tradeCodess :只查询某几种的行业的Code 形如 ;C;D;G;S;C3;Q;
*/
function createALLTradeTree(checkCode,showAll,tradeCodess)
{
	var tradeInfos = queryTrade();

	var treeList =[];
	//99-C
	if(!tradeCodess || tradeCodess.indexOf(";C;") >= 0){
		var _99root = bulidGMTrade(tradeInfos,checkCode,showAll);
		treeList.push(_99root);
	}
	
	//G
	if(!tradeCodess || tradeCodess.indexOf(";G;") >= 0){
		var _groot = bulidGTrade(tradeInfos,checkCode,showAll);
		treeList.push(_groot);
	}
	
	//B-S
	if(!tradeCodess || tradeCodess.indexOf(";S;") >= 0){
		var _broot = bulidBTrade(tradeInfos,checkCode,showAll);
		treeList.push(_broot);
	}
	
	//D
	if(!tradeCodess || tradeCodess.indexOf(";D;") >= 0){
		var _droot = bulidDTrade(tradeInfos,checkCode,showAll);
		treeList.push(_droot);
	}
	
	//domain-C3
	if(!tradeCodess || tradeCodess.indexOf(";C3;") >= 0){
		var _domainroot = bulidDomainTrade(tradeInfos,checkCode,showAll);
		treeList.push(_domainroot);
	}
	
	//QSH-Q
	if(!tradeCodess || tradeCodess.indexOf(";Q;") >= 0){
		var _qshroot = createQshTree(checkCode,showAll);
		treeList.push(_qshroot);
	}
	
	return treeList;
}

/*
* id 目标
* checkCode 默认值
* multiple 是否复选
*/	
function initTrade(id,checkCode,multiple)
{
	if(multiple != true) { multiple = false; }
	var treeData = createALLTradeTree(checkCode,false);	
	var target = $('#'+id);
		target.combotree({
			data:treeData,//树
			multiple:multiple,
			method:'get',
			cascadeCheck:false,//层叠
			animate:true,//动态
			value:checkCode//默认值
		});   
	//单击事件
	var selectValue = checkCode;
	target.combotree({
		onClick: function(node){	
			var tree = target.combotree('tree');
			
			if(multiple)
			{
				if(node.id == '' || node.id == null)
				{
					target.combotree('clear');
					target.combotree('setValues',selectValue);
				}
				selectValue = target.combotree('getValues');
				var codelist = $.map(selectValue,function(v)
				{
					var r = tree.tree('find',v);
					return r.attributes.tradeCode
				});
				target.val(codelist);
			}
			else
			{
				if(node.id == '' || node.id == null)
				{
					target.combotree('clear');
					target.combotree('setValue',selectValue);
				}
				selectValue = target.combotree('getValue');
				target.val(tree.tree('find',target.combotree('getValue')).attributes.tradeCode);
			}
		}
	});	
}



function queryTrade()
{
	if(tradeInfo== null || tradeInfo.length <=0)
	{
		$.ajax({
			   type:"GET", //固定格式
			   dataType:"json",  //固定格式
			   async:false,  
			   url:"/eems/ykqszs/qshSysHyAll.action",
			   data:"", //固定格式
			   success: function(msg){
			  	 tradeInfo = msg;
		  	 },
				error: function(msg){
				tradeInfo = ''; 
			}
			});
	}
	return tradeInfo;
}

/**
 * 定位tree上的指定的node并选择
 * 
 * treeid tree id
 * nodeid 要定位的node id
 * 
 */
com.frontier.aueic.qshSys.aueicOrgTree.treeNodeAutoSelected = function(treeid,nodeid){
	var tree = $("#"+treeid);
	var nodeTarget = tree.tree("find",nodeid);
	tree.tree("expandTo",nodeTarget.target);
	tree.tree("select",nodeTarget.target);
}


/*
* 根行业代码 rootCode
* 默认选中代码 checkCode
* 是否展开 showAll
* 返回 行业结果集
*/
function createTrade(dateType)
{
	var tradeInfos = queryTrade();

	var treeList =[];
	 if(dateType=='G')//十大行业
	 {
		//G
		var _groot = createGTrade(tradeInfos);
		treeList.push(_groot);
	 }
	 else  if(dateType=='C')//国民经济
	 {
		//C
		var _groot = createCTrade(tradeInfos);
		treeList.push(_groot);
	 } 
	 else  if(dateType=='S')//营销行业
	 {
		//S
		var _groot = createSTrade(tradeInfos);
		treeList.push(_groot);
	 }
	 else  if(dateType=='Cy')//产业
	 {
		//Cy
		var _groot = bulidCyTrade(tradeInfos);
		treeList.push(_groot);
	 }
	 else  if(dateType=='QSH')//全社会
	 {
		//QSH
		var _groot = createQshTrade();
		treeList.push(_groot);
	 }
 
	return treeList;
}

/*
* 构建十大行业代码
* 行业数据 tradeInfoss
* 返回 行业结果集
*/
function createGTrade(tradeInfos)
{
	var _root= [];
	 _root[0]= {
		id:'sdhy',
		pid:'0',
		name:'十大行业'
	};
 
	var _binfos = getTradelistbyType(tradeInfos,'G');
	
    for(var i= 0; i<_binfos.length;i++)
	{
			_root[i+1]= {
				id:_binfos[i].tradeCode,
				pid:_binfos[i].tradePCode=='0'?'sdhy':_binfos[i].tradePCode,
				name:_binfos[i].tradeName
		   };
	}
 

	return _root;
}

/*
*  构建国民经济行业代码
* 行业数据 tradeInfoss
* 返回 行业结果集
*/
function createCTrade(tradeInfos)
{
	var _root= [];
	 _root[0]= {
		id:'gmjj',
		pid:'0',
		name:'国民经济'
	};
 
	var _binfos = getTradelistbyType(tradeInfos,'C');// tradePCode == 301
	var _binfosTop = findChilidInfos(_binfos,'301');
	
	 for(var i= 0; i<_binfosTop.length;i++)
	 {
			 createTradechild(_binfos,_binfosTop[i].tradeCode,_binfosTop[i].tradeCode)
	 }
	
	for(var i= 0; i<_binfos.length;i++)
	{
				_root[i+1]= {
					id:_binfos[i].tradeCode,
					pid:_binfos[i].tradePCode=='301'?'gmjj':_binfos[i].tradePCode,
					name:_binfos[i].tradeName
			   };
	}
	
	return _root;
}


/*
* 构建营销行业代码
* 根行业代码 rootCode
* 默认选中代码 checkCode
* 是否展开 showAll
* 返回 行业结果集
*/
function createSTrade(tradeInfos)
{
	var _root= [];
	 _root[0]= {
		id:'yxhy',
		pid:'0',
		name:'营销行业'
	};
 
	var _binfos = getTradelistbyType(tradeInfos,'S'); 
	
	var _binfosTop = findChilidInfos(_binfos,null);
	
	 for(var i= 0; i<_binfosTop.length;i++)
	 {
			 createTradechild(_binfos,_binfosTop[i].tradeCode,_binfosTop[i].tradeCode)
	 }
	
    for(var i= 0; i<_binfos.length;i++)
	{
			_root[i+1]= {
				id:_binfos[i].tradeCode,
				pid:(_binfos[i].tradePCode=='0'||_binfos[i].tradePCode==null)?'yxhy':_binfos[i].tradePCode,
				name:_binfos[i].tradeName
		   };
	}
	return _root;
}



/*
* 构建产业行业代码 C3000 下面的3个产业 + 居民电量
* 根行业代码 rootCode
* 返回 行业结果集
*/
function bulidCyTrade(tradeInfos)
{
	var _root= [];
	 _root[0]= {
		id:'cy',
		pid:'0',
		name:'产业'
	};
 
	var _binfos = getTradelistbyType(tradeInfos,'C');// tradePCode == C3000
	var _binfosTop1 = findChilidInfos(_binfos,'C3000');
	var _binfosTop2 = findChilidInfos(_binfos,'C3004');
	
	 for(var i= 0; i<_binfosTop1.length;i++)
	 {
			 createTradechild(_binfos,_binfosTop1[i].tradeCode,_binfosTop1[i].tradeCode)
	 }
	 for(var i= 0; i<_binfosTop2.length;i++)
	 {
			 createTradechild(_binfos,_binfosTop2[i].tradeCode,_binfosTop2[i].tradeCode)
	 }
	
	for(var i= 0; i<_binfos.length;i++)
	{
			if(_binfos[i].tradeCode=='C3004')
			{
				_root[i+1]= {
					id:_binfos[i].tradeCode,
					pid:'cy',
					name:_binfos[i].tradeName
			   };
			}
			else
			{
				_root[i+1]= {
					id:_binfos[i].tradeCode,
					pid:(_binfos[i].tradePCode=='C3000'||_binfos[i].tradePCode=='C3004')?'cy':_binfos[i].tradePCode,
					name:_binfos[i].tradeName
			   };
			}
	}
 
	
	return _root;
}



/*
* 全社会  行业
* 返回 行业结果集
*/
function createQshTrade()
{
			var _root= [];
			 _root[0]= {
				id:'qshyd',
				pid:'0',
				name:'全社会'
			};
			
		  //"QSH""300""301""NET""GK""GY""QSHC""QSHG""QSHGM"
	      _root[1]= {
				id:'QSH',
				pid:'qshyd',
				name:'全社会用电'
		   };
		   _root[2]= {
				id:'300',
				pid:'QSH',
				name:'全社会用电总计'
		   };
		   _root[3]= {
				id:'301',
				pid:'QSH',
				name:'全行业用电'
		   };
		   _root[4]= {
				id:'NET',
				pid:'QSH',
				name:'网供'
		   };
		   _root[5]= {
				id:'GY',
				pid:'QSH',
				name:'工业用电'
		   };
		    _root[6]= {
				id:'GK',
				pid:'QSH',
				name:'省际关口'
		   };
		    _root[7]= {
				id:'QSHC',
				pid:'QSH',
				name:'售电'
		   };
		   _root[8]= {
				id:'QSHG',
				pid:'QSH',
				name:'供电'
		   };
		   _root[9]= {
				id:'QSHGM',
				pid:'QSH',
				name:'供电(拟合)'
		   };
  
	return _root;
}



/*
* 行业信息 infos
* 根行业代码 rootCode
* 返回 行业结果集
*/
function createTradechild(infos,rootCode,preCode)
{
	var returnChildList= new Array();
	var root = findTradeInfo(infos,rootCode);
	var childlist = findChilidInfos(infos,rootCode);
	//叶子节点
	if(childlist.length <= 0)
	{
		if(root.tradeCode!=preCode)
		{
		     root.tradePCode = preCode;
		}
		returnChildList[returnChildList.length] = root;
	}
	//非叶子节点
	else 
	{
		var j = 0;
		while(j < childlist.length)
		{
			childlist[j].tradePCode = preCode;
			returnChildList[returnChildList.length] = childlist[j];
			j++;
		}
		
		var i = 0;
		while(i < childlist.length)
		{
			var child = createTradechild(infos,childlist[i].tradeValue,preCode)
			i++;
		}
	}
	return returnChildList;
}


/*
* 创建行业选择页面
* tradeTree 行业信息
* btype 选择类型
* checkid 默认选择id
* rootid：权限控制 
* multiple 是否复选
*/
function createTradeSelect(tradeType,btype,checkid,rootid,multiple)
{
	var tradeTree = createTrade(tradeType);
	var content = " ";	
	if( tradeTree[0] == null || tradeTree[0].length <= 0 ) return content;
	/*找到根节点*/
	var root = findTradePrent(tradeTree[0],rootid);
	//设置默认值
	if(checkid == null ||checkid =='') checkid = root.id;
 
	var header = '';
	 
		header = 	"<div class=\"row_regiontitle\" style=\" display:none; \"> " + 
								"<div class=\"row\">" + 
										 createComLi(root,checkid,'row-regionbutton',btype,5,"trade") +
								"</div>	" + 
					"</div>" ; 
				
	/*找到第二级子节点*/
	var secondleaf = findLeaf(tradeTree[0],root.id);	
	var ullist = '';
	 
    for(var i= 0; i<secondleaf.length;i++)
	{
			/*第三级*/	
			ullist +=  "<div class=\"row_region\" >" ;
			var  thirdleaf = findLeaf(tradeTree[0],secondleaf[i].id);
			ullist += createTradeUl(thirdleaf,btype,checkid,secondleaf[i]);	
			ullist += "</div>";
	}
	 
	content = header + ullist;				
	return content;
}

/*
* 找父节点
* tree： 树
* org： 子节点
*/
function findTradePrent(tree,id)
{
	var org = null;
	id = id == null ? G1: id;
	for(var i=0 ;i< tree.length; i++)
	{
		if(id == tree[i].id)
		{
			org = tree[i];
			break;
		}
	}
	return org;
}

 /*
* 设置悬浮方法
*/
function setSlowFast()
{
	  $(document).ready(function(){
	 
	    $(".SlowFast").hover(function() {
	 
	    $(this).find("em").animate({opacity: "show", top: "20", left: "15", width:"125px"}, "slow");
	 
	   }, function() {
	 
	    $(this).find("em").animate({opacity: "hide", top: "20", left: "15", width:"125px"}, "fast");
	 
	  });
	 
	 });
}


/**
 * 
 * @param {} Tname
 * @param {} asynLoad 是否异步加载
 * @param {} 是否显示没有子结点的数据分类;默认为空,不显示
 */
function ItemTree(Tname, asynLoad, emptyShow) {
    this.asynLoad = asynLoad;
    this.emptyShow = emptyShow;
    MzTreeView.call(this,Tname);
    
}
ItemTree.prototype = new MzTreeView("itemTree"); 

//叶结点的标志
ItemTree.prototype.leafFlag = "leaf";

/**
 * 在调用getItemTree前调用,调用该方法.
 * 加入一些特殊的Items.默认为0为根结点
 * 
 * @param {} params 同getItemTree的params
 * @param appendToSortId 需要挂靠的父结点的ITEM_SORT_ID
 */
ItemTree.prototype.preItems = function(params, appendToSortId) {
    var basePath = getRequestUrl();
    var url = basePath + "itemManage/findItem.action";
    
    //STATUS_CODE默认为1,rootSortCode默认值为99999
    var tmp = {statusCode:1,rootSortCode:99999};
    if (params) {
        $.extend(tmp, params); 
    }
    
     //为了给后台赋值,改变tmp中的名字
    var data = {};
    for (var e in tmp) {
        data['itemModel.' + e] = tmp[e];
    }
    
    //为了给后台赋值,改变tmp中的名字
    var data = {};
    for (var e in tmp) {
        data['itemModel.' + e] = tmp[e];
    }
    
    //得到tree
    var itemTree = this;
    $.getJSON(url,
        data,
        
        function showItem(json){
            preTreeData(json, itemTree, appendToSortId);
        }
    ); 
}

/**
 * 可以覆盖此方法,组织树格式
 * @param {} json
 * @param {} itemTree
 * @param {} appendToSortId是给特殊的数据项,preItems使用的
 */
function preTreeData(json, itemTree, appendToSortId) {
    _makeTreeData_(json, itemTree, appendToSortId);
}

/**
 * 私有方法,组织生成树的格式
 * 
 * @param {} equipment
 * @param {} itemTree
 * @param {} appendToSortId是给特殊的数据项,preItems使用的
 */
function _makeTreeData_(equipment, itemTree, appendToSortId) {
           
     for(var i =0;i<equipment.length;i++) {
        
        //生成目录:数据项分类
        var item_sort_code = equipment[i].ITEM_SORT_CODE;
        var mess = "ctrl:sel_" + itemTree.name +";T:"+equipment[i].ITEM_SORT_NAME+";data:" + item_sort_code+";onSel:selectItemChkCommon(this)";
        var node = equipment[i].P_ITEM_SORT_ID+"_"+equipment[i].ITEM_SORT_ID;
        
        //设置根结点
        if (i==0) {
            //preItems调用,并传入appendToSortId的情况
            if (appendToSortId) {
                itemTree.N[appendToSortId + "_" + equipment[0].ITEM_SORT_ID] = mess;
            } else {
                itemTree.N["0_" + equipment[0].ITEM_SORT_ID] = "T:"+equipment[0].ITEM_SORT_NAME;
            }
        }

        itemTree.N[node] = mess;
        
        //生成数据项
        //没有数据项,没有数据分类的.去除数据项的生成
        if (equipment[i].ITEM_CODE_P_SORT_ID && equipment[i].ITEM_CODE) {
            
            //20101012生成树时主键的修改
            var item_code = equipment[i].ITEM_CODE;
            var item_id = equipment[i].ITEM_ID;
            
            var mess;
            /*
            //item_code,在传入的selItemCodes中,则选中 
            if(selItemCodes && inArray(item_code,selItemCodes) != -1) {
                mess = "ctrl:sel_"+ treeName +";checked:1;T:"+equipment[i].ITEM_NAME +";data:"+equipment[i].ITEM_ID;
            } else {
                mess = "ctrl:sel_"+ treeName +";T:"+equipment[i].ITEM_NAME+";data:"+equipment[i].ITEM_ID;
            }
            
            //加入叶结点的标志,保证不会被当成parent
            var node = equipment[i].ITEM_CODE_P_SORT_ID+"_"+itemTree.leafFlag+equipment[i].ITEM_CODE;*/
            
            mess = "ctrl:sel_"+ itemTree.name +";T:"+equipment[i].ITEM_NAME+";data:" + item_code+";C:selectItemNodeCommon(this);onSel:selectItemChkCommon(this)";
            var node = equipment[i].ITEM_CODE_P_SORT_ID+"_"+itemTree.leafFlag+item_id;
            itemTree.N[node] = mess;
        } 
        
    }
}


/**
 * 
 * @param basePath 
 * @param divId 所属div的id
 * @param params 格式{operationType:1,businessType:1,cpNo:32401***,statusCode:1,rootSortCode:**}
 *         都可以为空
 *         定义见"系统规约数据项分类"表.
 *         CP_NO:备用.
 *         STATUS_CODE:默认值为1
 *         rootSortCode:根结点的ITEM_SORT_CODE,多个以逗号(,)分割;默认值为99999
 * @deprecated selItemCodes 需要选中的ItemCode...准备删除,这样无法展开结点.调用setSelVal方法
 *        
 */
ItemTree.prototype.getItemTree = function(basePath,divId, params/*, selItemCodes*/){

    var itemTree = this;
    //调用第二次getItemTree方法时,清空原来的数据
    MzTreeView.call(this,this.name);
    
    itemTree.icons["property"] = "property.gif";
    itemTree.icons["css"] = "collection.gif";
    itemTree.icons["book"]  = "book.gif";
    itemTree.iconsExpand["book"] = "bookopen.gif"; //展开时对应的图片
    
    //根结点的图片
    itemTree.icons["root"] = "item_TerminalDevice.gif";
    //文件夹的图片
    itemTree.icons["folder"] = "item_Params.gif";
    //叶结点的图片
    itemTree.icons["file"] = "item_ParamItem.gif";
    //文件夹展开的图片
    itemTree.iconsExpand["folder"] = "item_Params.gif";
    
    itemTree.setIconPath(basePath + "/images/aueic/"); //可用相对路径
    
    var url = basePath + "itemManage/findItem.action";

    //STATUS_CODE默认为1,rootSortCode默认值为99999
    var tmp = {statusCode:1,rootSortCode:99999};
    if (params) {
        $.extend(tmp, params); 
    }
    
    //为了给后台赋值,改变tmp中的名字
    var data = {};
    for (var e in tmp) {
        data['itemModel.' + e] = tmp[e];
    }
    
    $.getJSON(url,
        data,
        
        function showItem(json){
            
            //根结点的单独设置
            if (json.length == 0) {
               itemTree.N["0_T" ] = "T:根";
               $('#'+divId).html(itemTree.toString());
               return;
            }

           _makeTreeData_(json, itemTree)
            
           itemTree.buildDiv(divId);
        }
    ); 
    
 
}


//选中checkbox的回调函数
//如果页面上有selectItemChk方法,则触发该方法
//需要提供返回值
//传入参数{itemCode:**, itemId:**, itemName:**}
function selectItemChkCommon(tree) {
    
    var chk = window.event.srcElement;
    var node = tree.getNodeByChkBox(chk);
    
   if (window.selectItemChk) {
        var item = {};
        //取得item_code
        var itemCode = node.data;
        item['itemCode'] =  itemCode;
        
        //取得item_id
        var v = ''+chk.value;
        var itemId;
        if (v.indexOf(tree.leafFlag) == -1) {
            itemId = v;
        } else {
            itemId = v.substr(tree.leafFlag.length)
        }
        item['itemId'] =  itemId;
        
        //取得itemName
        var itemName = node.T;
        item['itemName'] =  itemName;  

        var rsl = selectItemChk(item);
        
        //如果返回的是false,则点击一下chk,相当于取消
        if (!rsl) {
            chk.checked = false;
            window.event.cancelBubble=true;
        } 
   }
}

//选中树结点的回调函数
//如果页面上有selectItemNode方法,则触发该方法
//传入参数{itemCode:**, itemId:**, itemName:**}
function selectItemNodeCommon(tree) {
    var node = tree.currentNode;
   if (window.selectItemNode) {
        var item = {};
        
        //取得item_code
        var itemCode = node.data;
        item['itemCode'] =  itemCode;
        
        //取得item_id
        var chk = tree.getChkBoxByNode(node.id);
        var v = ''+chk.value;
        var itemId = v.substr(tree.leafFlag.length)
        item['itemId'] =  itemId;
        
        //取得itemName
        var itemName = node.T;
        item['itemName'] =  itemName;  
        selectItemNode(item);
   }
}

/**
 * 填充传入的div
 * 
 * @param {} divId 
 */
ItemTree.prototype.buildDiv = function(divId) {
    $('#'+divId).html(this.toString());
    //根据生成树时的asynLoad
    if (!this.asynLoad) {
        //一次性加载
        this.loadAll();
    }
}


//覆盖buildNode,空的数据项分类的处理
//将某个节点下的所有子节点转化成详细的<HTML>元素表达
//id 树的客户端节点 id
ItemTree.prototype.buildNode = function(id)
{
    
  if(this.node[id].hasChild)
  {
    var tcn = this.node[id].childNodes, str = "";
    for (var i=0; i<tcn.length; i++) {
        var n = tcn[i];
    
        //判断没有子结点的数据项分类是否显示 sww
        
        if (n.sid.indexOf(this.leafFlag) != -1 || this.emptyShow || n.hasChild) {
          str += this.nodeToHTML(tcn[i], i==tcn.length-1);
        }
      
    }
    var temp = this.getElementById(this.name +"_tree_"+ id).childNodes;
    temp[temp.length-1].innerHTML = str;
  }
};


//加入一次性加载的方法
ItemTree.prototype.loadAll = function()
{
  
  if(this.node["0"].childNodes.length==0) return;
  var e = this.node["0"].childNodes[0];
  var isdo = t = false;
  while(e.id != "0")
  {
    var p = this.node[e.parentId].childNodes, pn = p.length;
    if(p[pn-1].id==e.id && (isdo || !e.hasChild)){
    
        e=this.node[e.parentId]; isdo = true;
        
    }
    else
    {
      if(e.hasChild && !isdo)
      {
        //和expandAll不同的地方
        if (!e.isLoad) {
            this.load(e.id);
            this.buildNode(e.id);
            
        }    
        //end
        
        t = false;
        for(var i=0; i<e.childNodes.length; i++)
        {
          if(e.childNodes[i].hasChild){e = e.childNodes[i]; t = true; break;}
        }
        if(!t) isdo = true;
      }
      else
      {
        isdo = false;
        for(var i=0; i<pn; i++)
        {
          if(p[i].id==e.id) {e = p[i+1]; break;}
        }
      }
    }
  }
};

$.ajaxSetup({
    cache : false,
    error : function (XMLHttpRequest, textStatus, errorThrown) {
                MessageBoxForAjax(errorThrown, XMLHttpRequest);
            } 
});

//覆盖selChild,如果子节点没有load,就load子节点
ItemTree.prototype.selChild = function(id)
{
    var tcn = this.node[id];
    
    //处理子节点
    if(tcn.hasChild)
    {
        
      //sww
      if (!tcn.isLoad) {
        this.load(id);
        this.buildNode(id);
      }
      
        
      for(var i=0; i<tcn.childNodes.length; i++)
      {
        //取父CHECKBOX
        var pckboxID = this.name +"_checbox_"+ id;
        var pckbox  = this.getElementById(pckboxID);
       
        
        //取子CHECKBOX
        var ckboxID = this.name +"_checbox_"+ this.node[id].childNodes[i].id;
        var ckbox = this.getElementById(ckboxID);
        //emptyShow的处理,没有生成html,没有checkbox
         if (!ckbox) {
            continue;
            
        }
        
        ckbox.checked = pckbox.checked;
        this.selChild(this.node[id].childNodes[i].id);
      }
    }
    
};

/**
 * 根据cb得到node
 */
ItemTree.prototype.getNodeByChkBox = function(cb) {
    var chkid = '' + cb.id;
    //由于checkbox的id是this.name +"_checbox_"+ id
    //根据_checbox_取得id
    var nodeId = chkid.replace(/^.*_checbox_/g,"");
    return this.node[nodeId];
       
}

/**
 * 根据nodeId得到checkbox
 */
ItemTree.prototype.getChkBoxByNode = function(nodeId) {
    var chkid = '' + nodeId;
    var chkBox = document.getElementById(this.name+"_checbox_"+ nodeId);

    return chkBox;
       
}

/**
 * 取得选中的checkbox的值,只传叶节点中的值
 * 格式为'sel_itemTreeName=1&sel_itemTreeName=2'
 * itemTreeName是,生成ItemTree时的名字
 * 
 */
ItemTree.prototype.getSelItemCode = function() {
     
    var items = this.getSelItem();
    
    var url = '';
    var itemTree = this;
    jQuery.each(items,function(i,item) {
        url = url + '&sel_' + itemTree.name + '=' + item.itemCode;
        
    }
    )
    
    //去除第一个&
    if (url) {
        url = url.substring(1);
    }
    return url;
}


/**
 * 取消所有checkbox的选中
 * 
 */
ItemTree.prototype.clearSel = function() {
    var a =  $('input[name=sel_'+this.name + ']');
    if (a.length==0) {
        return '';
    }
    
    jQuery.each(a,function(i,cb) {
        cb.checked = false;
    }
    )
    
}

/**
 * 根据itemCode, 设置checkbox的选中
 * 
 */
ItemTree.prototype.setSelItemCode = function(codeArr) {
     
    var itemTree=this;
    var a =  $('input[name=sel_'+this.name + ']');
    if (a.length==0) {
        //延迟加载
        if (codeArr && codeArr.length !=0 ) {
            setTimeout(function(){itemTree.setSelItemCode(codeArr)}, 500);
        }
        return;
    }
    
    this.clearSel();
    
    jQuery.each(a,function(i,cb) {
        
        var node = itemTree.getNodeByChkBox(cb);
        var item_code = node.data;
        
        //itemIDArr,在传入的itemIDArr中则选中checkbox
        if(inArray(item_code,codeArr) != -1) {
            cb.click();
            //展开父结点
            itemTree.expandParent(node.id);
        }
        
        
    }
    )
}

/**
 * 取得选中的checkbox对应的item_id
 * 格式为'sel_itemTreeName_id=1&sel_itemTreeName_id=2'
 * itemTreeName是,生成ItemTree时的名字
 * 
 */
ItemTree.prototype.getSelItemId = function() {
        
    var items = this.getSelItem();
    
    var url = '';   
    var itemTree = this;
    jQuery.each(items,function(i,item) {
        
            url = url + '&sel_' + itemTree.name + '_id=' + item.itemId;

    }
    )
    
    //去除第一个&
    if (url) {
        url = url.substring(1);
    }
    return url;
}

/**
 * 根据itemID, 设置checkbox的选中
 * 刷新树时,不要调用该方法赋值
 * 
 */
ItemTree.prototype.setSelItemId = function(itemIDArr) {
    
    var itemTree = this;
    var a =  $('input[name=sel_'+this.name + ']');
    if (a.length==0) {
        //延迟加载
        if (itemIDArr && itemIDArr.length !=0 ) {
            setTimeout(function(){itemTree.setSelItemId(itemIDArr)}, 500);
        }
        
        return '';
    }
    
    this.clearSel();
    var leafFlag = this.leafFlag;
    jQuery.each(a,function(i,cb) {
       
        //判断是不是叶结点,不是叶结点不需要下面的处理
        if (cb.value.indexOf(leafFlag) == -1) {
            return true;//continue
            
        }
        
        //去除叶结点的标志
        var v = cb.value.substr(leafFlag.length);
        
        //不转换为int,jQuery.inArray方法无法判断
        //inArray替代
        if (v) {
           //v = parseInt(v);
        } else {
            return true;//continue的意思
        }
        
        //checkbox的值,在传入的codeArr中则选中
        if(inArray(v,itemIDArr) != -1) {
            cb.click();
            //展开父结点
            var node = itemTree.getNodeByChkBox(cb);
            itemTree.expandParent(node.id);
        }
        
    }
    )
}

//由于jQuery.inArray方法,类型不一致返回-1
//替代jQuery的inArray方法
function inArray(v, arr) {
    for (var i=0;i<arr.length;i++) {
        if (v == arr[i]) {
            return i;
        }
    }
    
    return -1;
}


/**
 * 
 * 取得选中的itemCode
 * 格式[{itemId:**,itemCode:**,itemName:**}]
 * 
 * @return 数组
 */
ItemTree.prototype.getSelItem = function() {
     
    var a =  $('input[name=sel_'+this.name + ']:checked');
    if (a.length==0) {
        return '';
    }    
    var itemArray=[];
    
    
    var leafFlag = this.leafFlag;
    var itemTree = this;
    jQuery.each(a,function(i,cb) {
        
        var v = '' + cb.value;
        //如果不是叶结点,不取值
        if (v.indexOf(leafFlag) == -1) {
            return true;
        }
        
        var item = {};
        var node = itemTree.getNodeByChkBox(cb);
        //取得item_code
        var itemCode = node.data;
        item['itemCode'] =  itemCode;
        
        //取得item_id
        var itemId = v.substr(leafFlag.length);
        item['itemId'] =  itemId;
        
        //取得itemName
        var itemName = node.T;
        item['itemName'] =  itemName;
        
        itemArray.push(item);
    }
    )
    
    return itemArray;
}

//选中了叶节点后,调用此方法.展开所有的父结点
ItemTree.prototype.expandParent = function(id) {
    var tcn = this.node[id];
    if(tcn.parentNode && tcn.parentNode.parentId != "0")
    {

        var pnode = tcn.parentNode;
        //如果父结点已经展开,则不需要处理
        //if(pnode.isExpand) {
        //   return;
        //} 直接收缩上级结点时,会有问题..
        //展开父结点
        this.expand(pnode.id, true);
        //处理父父结点
        this.expandParent(pnode.id);
    }
    
}

//兼容以前的写法
ItemTree.prototype.setSelVal = ItemTree.prototype.setSelItemCode;
ItemTree.prototype.getSelVal = ItemTree.prototype.getSelItemCode;

/**************  弹出的数据项树  **************/
/**
 * 
 * @param {} Tname
 * @deprecated 不用了,准备删除
 */
function BoxItemTree(Tname) {

    ItemTree.call(this,Tname, true, false);
    
}
BoxItemTree.prototype = new ItemTree("itemTree"); 

/**
 * 填充传入的div
 * 
 * @param {} divId 
 */
BoxItemTree.prototype.buildDiv = function(divId) {
    
    //在这里加入divId,给BoxItemTree.prototype.setSelItemCode使用
    this.divId = divId;
    
    var btCss=' class="btn1_mouseout" onmouseover="this.className=\'btn1_mouseover\'" onmouseout="this.className=\'btn1_mouseout\'" ';
   
    //生成button
    var divHTML = '';
    divHTML += '<button id="yesBt" '+btCss+' > 确定</button> ';
    divHTML += '<button id="noBt" onclick="tb_remove()"'+btCss+' > 取消</button>';
    //生成树
    divHTML += '<div id="boxItemTree" style="height:380px;width:260px;background:#e6e6e6;overflow:auto">';
    divHTML += this.toString() ;
    divHTML += '</div>'
    
    $('#'+divId).html(divHTML);

    //拼在divHTML里面,不好传参数
    var tree = this;
    $("#yesBt").live("click", function(){
       itemConfirm(tree);
    });

     
    //根据生成树时的asynLoad
    if (!this.asynLoad) {
        //一次性加载
        this.loadAll();
    }
}
//确定按钮的调用函数
function itemConfirm(tree) {

    var items = tree.getSelItem();
    if (items.length==0) {
        MessageBox("请选择数据项！");
        return;
    }
    
    if (window.itemTreeCallBack) {
        tb_remove();
        itemTreeCallBack(items);
    } else {
        MessageBox("请定义itemTreeCallBack方法！");
    }
}

/**
 * 覆盖ItemTree的setSelVal方法,延迟加载
 * 处理thickbox的appendChild
 * 在弹出时,调用
 * 
 * @param {} codeArr 数组
 */
BoxItemTree.prototype.setSelVal = function(codeArr) {
    
   //!codeArr[0]是为了处理传入的codeArr,是以"".split(",")生成的情况
    //过滤为[""]的数组
    if (!codeArr || codeArr.length==0 || !codeArr[0]) {
        return;
    }
    
    var divId = this.divId
    
    var a =  $('input[name=sel_'+this.name + ']', $('#'+divId));
    
    var boxTree = this;
    //如果div中还有checkbox,则延迟选中
    if (a.length != 0) {
        setTimeout(function(){boxTree.setSelVal(codeArr)}, 200);
        return;
    }
    
    ItemTree.prototype.setSelVal.call(this, codeArr);
    
}
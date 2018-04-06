Ext.namespace('Ext.ux.grid');
Ext.ux.grid.ProgressColumn = function(config) {
  Ext.apply(this, config);
  this.renderer = this.renderer.createDelegate(this);
  this.addEvents('action');
  Ext.ux.grid.ProgressColumn.superclass.constructor.call(this);
};

Ext.extend(Ext.ux.grid.ProgressColumn, Ext.util.Observable, {
  textPst : '%',
  colored : false,

  actionEvent : 'dblclick',

  init : function(grid) {
    this.grid = grid;
    this.view = grid.getView();

    if (this.editor && grid.isEditor) {
      var cfg = {
        scope : this
      };
      cfg[this.actionEvent] = this.onClick;
      grid.afterRender = grid.afterRender.createSequence(function() {
        this.view.mainBody.on(cfg);
      }, this);
    }
  },

  onClick : function(e, target) {
    var rowIndex = e.getTarget('.x-grid3-row').rowIndex;
    var colIndex = this.view.findCellIndex(target.parentNode.parentNode);

    var t = e.getTarget('.x-progress-text');
    if (t) {
      this.grid.startEditing(rowIndex, colIndex);
    }
  },

  renderer : function(v, p, record) {
    var style = '';
    var textClass = (v < 55) ? 'x-progress-text-back' : 'x-progress-text-front' + (Ext.isIE6 ? '-ie6' : '');

    var text = String.format('</div><div class="x-progress-text {0}" style="width:100%;" id="{1}">{2}</div></div>',
      textClass, Ext.id(), v + this.textPst
    );
    text = (v<96) ? text.substring(0, text.length - 6) : text.substr(6);

    if (this.colored == true) {
      if (v <= 100 && v > 66)
        style = '-green';
      if (v < 67 && v > 33)
        style = '-orange';
      if (v < 34)
        style = '-red';
    }

    p.css += ' x-grid3-progresscol';
    return String.format(
      '<div class="x-progress-wrap"><div class="x-progress-inner"><div class="x-progress-bar{0}" style="width:{1}%;">{2}</div>' +
      '</div>', style, v, text
    );
  }
});
Ext.tree.TreeCheckNodeUI = function() {   
    this.checkModel = 'multiple';   
       
    this.onlyLeafCheckable = false;   
       
     Ext.tree.TreeCheckNodeUI.superclass.constructor.apply(this, arguments);   
};   
   
Ext.extend(Ext.tree.TreeCheckNodeUI, Ext.tree.TreeNodeUI, {   
   
     renderElements : function(n, a, targetNode, bulkRender){   
        var tree = n.getOwnerTree();   
        this.checkModel = tree.checkModel || this.checkModel;   
        this.onlyLeafCheckable = tree.onlyLeafCheckable || false;   
           
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';   
   
    var cb = (!this.onlyLeafCheckable || a.leaf);   
        var href = a.href ? a.href : Ext.isGecko ? "" : "#";   
        var buf = ['<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf x-unselectable ', a.cls,'" unselectable="on">',   
            '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",   
            '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow" />',   
            '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on" />',   
             cb ? ('<input class="x-tree-node-cb" type="checkbox" ' + (a.checked ? 'checked="checked" />' : '/>')) : '',   
            '<a hidefocus="on" class="x-tree-node-anchor" href="',href,'" tabIndex="1" ',   
              a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '><span unselectable="on">',n.text,"</span></a></div>",   
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',   
            "</li>"].join('');   
   
        var nel;   
        if(bulkRender !== true && n.nextSibling && (nel = n.nextSibling.ui.getEl())){   
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin", nel, buf);   
         }else{   
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf);   
         }   
           
        this.elNode = this.wrap.childNodes[0];   
        this.ctNode = this.wrap.childNodes[1];   
        var cs = this.elNode.childNodes;   
        this.indentNode = cs[0];   
        this.ecNode = cs[1];   
        this.iconNode = cs[2];   
        var index = 3;   
        if(cb){   
            this.checkbox = cs[3];   
             Ext.fly(this.checkbox).on('click', this.check.createDelegate(this,[null]));   
             index++;   
         }   
        this.anchor = cs[index];   
        this.textNode = cs[index].firstChild;   
     },   
     check : function(checked){   
        var n = this.node;   
        var tree = n.getOwnerTree();   
        this.checkModel = tree.checkModel || this.checkModel;   
           
        if( checked === null ) {   
             checked = this.checkbox.checked;   
         } else {   
            this.checkbox.checked = checked;   
         }   
           
         n.attributes.checked = checked;   
         tree.fireEvent('check', n, checked);   
           
        if(!this.onlyLeafCheckable && this.checkModel == 'cascade'){   
            var parentNode = n.parentNode;   
            if(parentNode !== null) {   
                this.parentCheck(parentNode,checked);   
             }   
            if( !n.expanded && !n.childrenRendered ) {   
                 n.expand(false,false,this.childCheck);   
             }   
            else {   
                this.childCheck(n);   
             }   
         }else if(this.checkModel == 'single'){   
            var checkedNodes = tree.getChecked();   
            for(var i=0;i<checkedNodes.length;i++){   
                var node = checkedNodes[i];   
                if(node.id != n.id){   
                     node.getUI().checkbox.checked = false;   
                     node.attributes.checked = false;   
                     tree.fireEvent('check', node, false);   
                 }   
             }   
         }   
           
     },   
       
     childCheck : function(node){   
        var a = node.attributes;   
        if(!a.leaf) {   
            var cs = node.childNodes;   
            var csui;   
            for(var i = 0; i < cs.length; i++) {   
                 csui = cs[i].getUI();   
                if(csui.checkbox.checked ^ a.checked)   
                     csui.check(a.checked);   
             }   
         }   
     },   
       
     parentCheck : function(node ,checked){   
        var checkbox = node.getUI().checkbox;   
        if(typeof checkbox == 'undefined')return ;   
        if(!(checked ^ checkbox.checked))return;   
        if(!checked && this.childHasChecked(node))return;   
         checkbox.checked = checked;   
         node.attributes.checked = checked;   
         node.getOwnerTree().fireEvent('check', node, checked);   
           
        var parentNode = node.parentNode;   
        if( parentNode !== null){   
            this.parentCheck(parentNode,checked);   
         }   
     },   
       
     childHasChecked : function(node){   
        var childNodes = node.childNodes;   
        if(childNodes || childNodes.length>0){   
            for(var i=0;i<childNodes.length;i++){   
                if(childNodes[i].getUI().checkbox.checked)   
                    return true;   
             }   
         }   
        return false;   
     },   
       
     toggleCheck : function(value){   
        var cb = this.checkbox;   
        if(cb){   
            var checked = (value === undefined ? !cb.checked : value);   
            this.check(checked);   
         }   
     }   
});   

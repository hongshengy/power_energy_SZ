/**
 * Created by qian_kai on 2017/2/25.
 */

$.fn.textbox.defaults.height = 24;
$.fn.textbox.defaults.width = 120;
$.fn.combobox.defaults.height = 24;
$.fn.combobox.defaults.width = 120;
$.fn.combobox.defaults.panelWidth = 'auto';
$.fn.combobox.defaults.panelHeight = 'auto';

var datagridColumns_common = [[
    {field:'col_text1',title:'文本列（可排序）',width:'30%',align:'left',sortable:true},
    {field:'col_text2',title:'文本列',width:'20%',align:'left'},
    {field:'col_num1',title:'数字列',width:'10%',align:'center'},
    {field:'col_date1',title:'日期列',width:'20%',align:'center'},
    {field:'col_state1',title:'状态列',width:'10%', align:'center'}
]];

var scriptManager = {
    isLoadlightBoxScript: false,
    /*
     * 动态加载脚本，需要依赖jquery
     *Width
     * */
    loadScirpt: function (scriptName, path, loadOnlyOne) {
        switch (scriptName){
            case 'lightBox':
                if (this.isLoadlightBoxScript == false && loadOnlyOne){
                    $.getScript(path);
                    this.isLoadlightBoxScript = true;
                }
                break;
            default:
                console.log("该脚本名称不能被识别！");
                break;
        }
    }
};

function stopEventPropagation() {
    if (event.stopPropagation){
        event.stopPropagation();
    }else if (window.event){
        window.event.cancelBubble = true;
    }
}

/*
* 弹出窗体对话框 构造函数
* */
function popPanel(options) {
    this.containerDom = options.containerDom;
    this.waitTime = options.waitTime;
    this.runTime = 0;
    this.isEnterPanel = false;
    this.state = "close";
    this.width = options.width ? options.width : 300;
    this.height = options.height ? options.height : 'auto';
    this.panelType = options.panelType ? options.panelType : "normal";
    this.panelTitle = options.panelTitle ? options.panelTitle : "提示";
    this.panelContent = options.panelContent ? options.panelContent : "";
    this.panelDom = document.createElement("div");
    this.panelDom.setAttribute('class', getPanelTypeClass(this.panelType));
    this.panelDom.style.display = 'none';
    this.panelDom.style.width = this.width + "px";
    if (this.height != 'auto'){
        this.panelDom.style.height = this.height + "px";
    }
    var self = this;


    function getPanelTypeClass(type){
        var rValue;
        switch (type){
            case 'normal':
                rValue = 'tip-panel';
                break;
            case 'warning':
                rValue = 'tip-panel warning';
                break;
        }

        return rValue;
    }
}

popPanel.prototype.open = function () {
    if (this.state != "close") return;
    var self = this;

    self.state = "open";
    if (self.panelDom.parentNode == null){
        var innerStr = '';
        innerStr += "<div class=\"title\"><span>" + self.panelTitle + "</span><span class=\"close\">×</span></div>";
        innerStr += "<div class=\"content\">";
        innerStr += self.panelContent;
        innerStr += "</div>";
        this.panelDom.innerHTML = innerStr;
        var close_element = self.panelDom.querySelector(".close");
        close_element.onclick = function () {
            self.close();
        };
        $(self.panelDom).mouseenter(function(){
            self.isEnterPanel = true;
            self.runTime = 0;
        });
        $(self.panelDom).mouseleave(function(){
            self.isEnterPanel = false;
        });
        self.containerDom.appendChild(self.panelDom);
    }
    $(self.panelDom).fadeIn('slow');
    var si = setInterval(function () {
        if (!self.isEnterPanel){
            self.runTime += 1000;
            if (self.runTime >= self.waitTime){
                clearInterval(si);
                self.close();
            }
        }
    }, 1000);
};

popPanel.prototype.close = function () {
    this.state = "close";
    $(this.panelDom).fadeOut('slow');
};
/*end*/






/**
 * Created by qian_kai on 2017/3/13.
 */

function maskPanelManager() {
    var maskNode = document.createElement("div");
    maskNode.id = "mask-panel";
    maskNode.style.cssText = "position: absolute;width:100%;height:100%;background-color:#fff;z-index:999;";
    this.mask = maskNode;
}

maskPanelManager.prototype.register = function (doc) {
    if (doc == null){
        doc = document;
    }
    doc.body.appendChild(this.mask);
    doc.onreadystatechange = function () {
        if (document.readyState == "complete"){
            var maskPanel = document.getElementById("mask-panel");
            maskPanel.parentNode.removeChild(maskPanel);
        }
    };
};


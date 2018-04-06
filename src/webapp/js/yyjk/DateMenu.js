YYJK.menu.DateMenu = function(config){
    YYJK.menu.DateMenu.superclass.constructor.call(this, config);
    this.plain = true;
    var di = new YYJK.menu.DateItem(config);
    this.add(di);
    this.picker = di.picker;
    this.relayEvents(di, ["select"]);
    this.on('beforeshow', function(){
        if(this.picker){
            this.picker.hideMonthPicker(true);
        }
    }, this);
};

Ext.extend(YYJK.menu.DateMenu, Ext.menu.Menu, {
    cls:'x-date-menu',
    // private
    beforeDestroy : function() {
        this.picker.destroy();
    }
});
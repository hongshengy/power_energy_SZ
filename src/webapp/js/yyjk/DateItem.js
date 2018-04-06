YYJK.menu.DateItem = function(config){
    YYJK.menu.DateItem.superclass.constructor.call(this, new YYJK.DatePicker(config), config);
    this.picker = this.component;
    this.addEvents('select');
    this.picker.on("render", function(picker){
        picker.getEl().swallowEvent("click");
        picker.container.addClass("x-menu-date-item");
    });
    this.picker.on("select", this.onSelect, this);
};

Ext.extend(YYJK.menu.DateItem, Ext.menu.Adapter, {
    // private
    onSelect : function(picker, date){
        this.fireEvent("select", this, date, picker);
        YYJK.menu.DateItem.superclass.handleClick.call(this);
    }
});
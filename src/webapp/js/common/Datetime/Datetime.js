Ext.ns("gdc.component.dateTime");  

/********** CONSTRUCTOR ******
 * Parameters: as per Ext.DatePicker
 ****/
gdc.component.dateTime.DatetimePicker = function(config){
	/** Call superclass constructor **/
	gdc.component.dateTime.DatetimePicker.superclass.constructor.call(this, config);
};
 
Ext.extend(gdc.component.dateTime.DatetimePicker, Ext.DatePicker, {

	hourText:'', //'时',  
	miniteText:'', //'分',  
	secondText: '', //'秒',  

	/**
	* Method Name: onRender
	* Description: as per Ext.DatePicker's onRender, except renders year in its own cell with arrow-changers in additional columns
	* Parameters: as per Ext.DatePicker's onRender
	* Returns: n/a
	* Throws: n/a
	*/
    selectToday : function(){
    	this.setValue(new Date().clearTime());
		this.theHours = this.hourLabel.getValue();
    	this.theMinutes = this.minuteLabel.getValue();
    	if(this.initialConfig.secondDisable){
    		this.theSeconds = 0;
    	}else{
    		this.theSeconds = this.secondLabel.getValue();
    	}
    	
    	var val1 = this.value;
		val1.setHours(this.theHours);
		val1.setMinutes(this.theMinutes);
		val1.setSeconds(this.theSeconds);
        this.fireEvent("select", this, val1);
    },
    
    //确定所选;
    selectOK: function(){
    	this.setValue(this.activeDate);
		    	
       	this.theHours = this.hourLabel.getValue();
    	this.theMinutes = this.minuteLabel.getValue();
    	if(this.initialConfig.secondDisable){
    		this.theSeconds = 0;
    	}else{
    		this.theSeconds = this.secondLabel.getValue();
    	}
    	
    	var val1 = this.value;
		val1.setHours(this.theHours);
		val1.setMinutes(this.theMinutes);
		val1.setSeconds(this.theSeconds);
		this.fireEvent("select", this, this.activeDate);
    },
    
    //取消所选;
	selectCancel : function(){
		this.clearFlag = true;
		this.fireEvent("clear", this, ""); 
	},
	
	handleDateClick : function(e, t){
        e.stopEvent();
        if(t.dateValue && !Ext.fly(t.parentNode).hasClass("x-date-disabled")){
        	this.setValue(new Date(t.dateValue));
			
	    	this.theHours = this.hourLabel.getValue();
	    	this.theMinutes = this.minuteLabel.getValue();
	    	this.theSeconds = this.secondLabel.getValue();
        	
            var val1 = this.value;
			val1.setHours(this.theHours);
			val1.setMinutes(this.theMinutes);
			val1.setSeconds(this.theSeconds); 
            this.fireEvent("select", this, val1);
        }
    },
    
    // 及时刷新
    changeSeconds:function(){
        this.hour = String.leftPad((new Date()).getHours(), 2, '0');
        this.minute = String.leftPad((new Date()).getMinutes(), 2, '0');
        this.second=String.leftPad((new Date()).getSeconds(), 2, '0');
        this.hourLabel.setValue(this.hour);
        this.minuteLabel.setValue(this.minute);
        this.secondLabel.setValue(this.second);
    },
    
    //渲染方法
 	onRender : function(container, position){
        var m = [
             '<table cellspacing="0" width="160px">',
                '<tr><td colspan="3"><table cellspacing="0" width="100%"><tr><td class="x-date-left"><b></b></td><td class="x-date-left"><a href="#" title="', this.prevText ,'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="', this.nextText ,'">&#160;</a></td><td class="x-date-right"><b></b></td></tr></table></td></tr>',
                '<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'];
        var dn = this.dayNames;
        for(var i = 0; i < 7; i++){
            var d = this.startDay+i;
            if(d > 6){
                d = d-7;
            }
            m.push("<th><span>", dn[d].substr(0,1), "</span></th>");
        }
        m[m.length] = "</tr></thead><tbody><tr>";
        for(i = 0; i < 42; i++) {
            if(i % 7 === 0 && i !== 0){
                m[m.length] = "</tr><tr>";
            }
            m[m.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>';
        }

		 //代码很有意思，相当push(obj)了;  
         m[m.length] = '</tr></tbody></table></td></tr><tr><td class="minutecss"><table cellspacing="0" ><tr>' 
         m[m.length] = '<td class="y-hour-middle"></td>'
         	           +'<td class="hour-minute">:</td>';           //添加:分隔;  
         m[m.length] = '<td class="y-minute-middle"></td>'
         	           + '<td class="hour-minute">:</td>';           //添加:分隔;           	           
         m[m.length] = '<td class="y-second-middle"></td>' 
         			   + '<td class="x-date-change" style="padding-top:2px">&nbsp;<img src="'+ gdc.webContextRoot +'/resources/ext-2.2.1/resources/images/default/grid/refresh.gif" /></td>'   
         			   + '<td class="x-date-speed" style="padding-top:2px">&nbsp;<img src="'+ gdc.webContextRoot +'/js/common/Datetime/images/xclock.png"/></td>';   
         m[m.length] = '</tr></table></td></tr><tr><td><table class="minutecss" width="100%"><tr>' +  
                 '<td class="x-date-today" align="center"></td>' +  
                 '<td class="x-date-btn-ok" align="center"></td>' +  
                 '<td class="x-date-btn-cancle" align="center"></td>' +  
                 '</tr></table></td></tr></table><div class="x-date-mp"></div>' +
                 '<div class="x-date-mp-h" style="position:absolute;left:0;top:75;display:none;background:white;"></div>' +
                 '<div class="x-date-mp-m" style="position:absolute;left:0;top:0;display:none;background:white;"></div>' +
                 '<div class="x-date-mp-s" style="position:absolute;left:0;top:0;display:none;background:white;"></div>'+
                 '<div class="x-date-mp-p" style="position:absolute;left:0;top:0;display:none;background:white;"></div>';

        var el = document.createElement("div");
        el.className = "x-date-picker";
        el.innerHTML = m.join("");

        container.dom.insertBefore(el, position);

        this.el = Ext.get(el);
        this.eventEl = Ext.get(el.firstChild);
        
        this.el.child("td.x-date-change").on('click', this.changeSeconds,this);  
        this.el.child("td.x-date-speed").on('click', this.showSpeedPicker,this);  
        
        new Ext.util.ClickRepeater(this.el.child("td.x-date-left b"), {
            handler: this.showPrevYear,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        new Ext.util.ClickRepeater(this.el.child("td.x-date-left a"), {
            handler: this.showPrevMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        new Ext.util.ClickRepeater(this.el.child("td.x-date-right a"), {
            handler: this.showNextMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });
        
        new Ext.util.ClickRepeater(this.el.child("td.x-date-right b"), {
            handler: this.showNextYear,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });
        
        this.eventEl.on("mousewheel", this.handleMouseWheel,  this);

        this.monthPicker = this.el.down('div.x-date-mp');
        this.monthPicker.enableDisplayMode('block');
        
        this.hourPicker = this.el.down('div.x-date-mp-h');
		this.hourPicker.enableDisplayMode('block');
		this.minutePicker = this.el.down('div.x-date-mp-m');
		this.minutePicker.enableDisplayMode('block');
		this.secondPicker = this.el.down('div.x-date-mp-s');
		this.secondPicker.enableDisplayMode('block');
		this.speedPicker = this.el.down('div.x-date-mp-p');
		this.speedPicker.enableDisplayMode('block');
        
        var kn = new Ext.KeyNav(this.eventEl, {
            "left" : function(e){
                e.ctrlKey ?
                    this.showPrevMonth() :
                    this.update(this.activeDate.add("d", -1));
            },

            "right" : function(e){
                e.ctrlKey ?
                    this.showNextMonth() :
                    this.update(this.activeDate.add("d", 1));
            },

            "up" : function(e){
                e.ctrlKey ?
                    this.showNextYear() :
                    this.update(this.activeDate.add("d", -7));
            },

            "down" : function(e){
                e.ctrlKey ?
                    this.showPrevYear() :
                    this.update(this.activeDate.add("d", 7));
            },

            "pageUp" : function(e){
                this.showNextMonth();
            },

            "pageDown" : function(e){
                this.showPrevMonth();
            },

            "enter" : function(e){
                e.stopPropagation();
                return true;
            },

            scope : this
        });

        this.eventEl.on("click", this.handleDateClick,  this, {delegate: "a.x-date-date"});

        this.eventEl.addKeyListener(Ext.EventObject.SPACE, this.selectToday,  this);

        this.el.unselectable();
        
        this.cells = this.el.select("table.x-date-inner tbody td");
        this.textNodes = this.el.query("table.x-date-inner tbody span");

        this.mbtn = new Ext.Button({
            text: "&#160;",
            tooltip: this.monthYearText,
            renderTo: this.el.child("td.x-date-middle", true)
        });

        this.mbtn.on('click', this.showMonthPicker, this);
        this.mbtn.el.child(this.mbtn.menuClassTarget).addClass("x-btn-with-menu");

		var dt1 = new Date();
		var txt = '';
		
		//时;
		var par = this;
		this.hourLabel = new Ext.ux.form.SpinnerField({
            renderTo:this.el.child("td.y-hour-middle"),
            minValue: 0,
	    	maxValue: 23,
            width:40,
            disabled:this.initialConfig.hourDisable,
            listeners:{
            	render:function(){
            		this.el.on('dblclick',function(){
            			//par.showHourPicker();
            		}),this.el.on('click',function(){
            			par.showHourPicker();
            		}),this.el.on('blur',function(){
            			if(par.hourLabel.getValue()>23){
            				par.hourLabel.setValue(23);
            			}else if(par.hourLabel.getValue()<0){
            				par.hourLabel.setValue(0);
            			}
            		})
            	}
            }
        });
		this.theHours = dt1.getHours();
		if(this.theHours<10){
			txt='0'+this.theHours;
		}
		else{
			txt= this.theHours;
		}	
		this.hourLabel.setValue(txt+this.hourText);

		//分;
		this.minuteLabel = new Ext.ux.form.SpinnerField({
            renderTo:this.el.child("td.y-minute-middle"),
            minValue: 0,
	    	maxValue: 59,
	    	width:40,
	    	disabled:this.initialConfig.minuteDisable,
            listeners:{
            	render:function(){
            		this.el.on('dblclick',function(){
            			//par.showMinutePicker();
            		}),this.el.on('click',function(){
            			par.showMinutePicker();
            		}),this.el.on('blur',function(){
            			if(par.minuteLabel.getValue()>59){
            				par.minuteLabel.setValue(59);
            			}else if(par.minuteLabel.getValue()<0){
            				par.minuteLabel.setValue(0);
            			}
            		})
            	}
            }
        });
		this.theMinutes = dt1.getMinutes();
		if(this.theMinutes<10){
			txt='0'+this.theMinutes;
		}
		else{
			txt= this.theMinutes;
		}	
		this.minuteLabel.setValue(txt+this.miniteText);
		
		//秒;
		this.secondLabel = new Ext.ux.form.SpinnerField({
            renderTo:this.el.child("td.y-second-middle"),
            minValue: 0,
	    	maxValue: 59,
            width:40,
            disabled:this.initialConfig.secondDisable,
            listeners:{
            	render:function(){
            		this.el.on('dblclick',function(){
            			//par.showSecondPicker();
            		}),this.el.on('click',function(){
            			par.showSecondPicker();
            		}),this.el.on('blur',function(){
            			if(par.secondLabel.getValue()>59){
            				par.secondLabel.setValue(59);
            			}else if(par.secondLabel.getValue()<0){
            				par.secondLabel.setValue(0);
            			}
            		})
            	}
            }
        });
		this.theSeconds = dt1.getSeconds();
		if(this.secondLabel<10){
			txt='0'+this.secondLabel;
		}
		else{
			txt= this.secondLabel;
		}	
		this.secondLabel.setValue(txt+this.secondText);
		
		var today = (new Date()).dateFormat(this.format);
        var todayBtn = new Ext.Button({ //今天;
            renderTo: this.el.child("td.x-date-today", true),
            text: String.format(this.todayText, today),
            tooltip: String.format(this.todayTip, today),
            handler: this.selectToday,
            scope: this
        });
        
        var okBtn = new Ext.Button({ //确定;  
            renderTo: this.el.child("td.x-date-btn-ok", true),  
            text: String.format(this.okText, today),  
            tooltip: String.format(this.okText, today),  
            handler: this.selectOK,  
            scope: this  
        });  
          
        var cancelBtn = new Ext.Button({ //取消;  
            renderTo: this.el.child("td.x-date-btn-cancle", true),  
            text: String.format(this.cancelText, today),  
            tooltip: String.format(this.cancelText, today),  
            handler: this.selectCancel,  
            scope: this  
        });
        
        
        if(Ext.isIE){
            this.el.repaint();
        }
        this.update(this.value);
	},
	
	showHourPicker : function(event, target) {
		//隐藏其它div
		this.minutePicker.hide();
		this.secondPicker.hide();
		if (!this.hourPicker.dom.firstChild) {
			var buf = ['<table border="0" style="border:1px #ccc solid" cellspacing="0">'];
			for (var i = 0; i < 28; i++) {
				if (i % 7 == 0)
					buf.push('<tr>');
				if (i < 24)
					buf.push('<td class="x-date-mp-month" style="font-size:12px" value="'+ i + '"><a href="#">', String.leftPad(i,2, '0'), '</a></td>');
				else
					buf.push('<td class="x-date-mp-cancel"><a href="#"></a></td>');
				if (i % 7 == 6)
					buf.push('</tr>');
			}
			//buf.push('<tr class="x-date-mp-btns"><td colspan="7"><button type="button" class="x-date-mp-cancel">',this.cancelText,'</button></td></tr></table>');
			buf.push('</table>');
			this.hourPicker.update(buf.join(''));
			this.hourPicker.on('click', this.onHourClick, this);
			this.updateHMS(this.hour, this.hourPicker);
		}
		var size = this.el.getSize();
		var sizeWidth = size.width;
		this.hourPicker.setSize(size.width, 100);
		this.hourPicker.child('table').setSize(size.width, 100);
		this.mpHours = this.hourPicker.select('td.x-date-mp-month');
		this.mpHours.each(function(m, a, i) {m.dom.xhour = i;});
		this.hourPicker.slideIn('b', {duration : .2});
	},
	
	onHourClick : function(e, t) {
		e.stopEvent();
		var el = new Ext.Element(t), pn;
		if (pn = el.up('td.x-date-mp-month', 2)) {
			this.hour = parseInt(t.innerHTML, 10);
			//this.el.child("td.x-date-hour").dom.innerHTML = t.innerHTML;
			this.hourLabel.setValue(t.innerHTML);
			this.updateHMS(this.hour, this.hourPicker);
			this.hourPicker.slideOut('b', {duration : .2});
		} 
//		else if (pn = el.is('button.x-date-mp-cancel')) {
//			this.hourPicker.slideOut('b', {duration : .2});
//		}
		else if (pn = el.is('td.x-date-mp-cancel')) {
			this.hourPicker.slideOut('b', {duration : .2});
		}
	},
	
	showMinutePicker : function(event, target) {
		//隐藏其它div
		this.hourPicker.hide();
		this.secondPicker.hide();
		if (!this.minutePicker.dom.firstChild) {
			var buf = ['<table border="0" style="border:1px #ccc solid" cellspacing="0">'];
			var minuteArray = this.initialConfig.minuteArray;
			if(!minuteArray){
				for (var i = 0; i < 64; i++) {
					if (i % 8 == 0)
						buf.push('<tr>');
					if (i < 60)
						buf.push('<td class="x-date-mp-month" style="font-size:12px" value="'+ i + '"><a href="#">', String.leftPad(i,2, '0'), '</a></td>');
					else
						buf.push('<td  class="x-date-mp-cancel"><a href="#"></a></td>');
					if (i % 8 == 7)
						buf.push('</tr>');
				}
			}else{
				for (var i = 0; i < 64; i++) {
					if (i % 8 == 0)
						buf.push('<tr>');
					if (i < 60){
						if(i>(minuteArray.length-1)){
							buf.push('<td class="x-date-mp-cancel"><a href="#">&nbsp;</a></td>');
						}else{
							buf.push('<td class="x-date-mp-month" style="font-size:12px" value="'+ i + '"><a href="#">', minuteArray[i], '</a></td>');
						}
					}else
						buf.push('<td class="x-date-mp-cancel"><a href="#"></a></td>');
					if (i % 8 == 7)
						buf.push('</tr>');
				}
			}
			//buf.push('<tr class="x-date-mp-btns"><td colspan="8"><button type="button" class="x-date-mp-cancel">',
			//				this.cancelText, '</button></td></tr></table>');
			buf.push('</table>');
			this.minutePicker.update(buf.join(''));
			this.minutePicker.on('click', this.onMinuteClick, this);
			this.updateHMS(this.minute, this.minutePicker);
		}
		var size = this.el.getSize();
		var sizeWidth = size.width;
		this.minutePicker.setSize(size.width, 175);
		this.minutePicker.child('table').setSize(size.width, 175);
		this.minutePicker.slideIn('b', {duration : .2});
	},
	onMinuteClick : function(e, t) {
		e.stopEvent();
		var el = new Ext.Element(t), pn;
		if (pn = el.up('td.x-date-mp-month', 2)) {
			this.minute = parseInt(t.innerHTML, 10);
			//this.el.child("td.x-date-minute").dom.innerHTML = t.innerHTML;
			this.minuteLabel.setValue(t.innerHTML);
			this.updateHMS(this.minute, this.minutePicker);
			this.minutePicker.slideOut('b', {duration : .2});
		}
//		else if (pn = el.is('button.x-date-mp-cancel')) {
//			this.minutePicker.slideOut('b', {duration : .2});
//		}
		else if (pn = el.is('td.x-date-mp-cancel')) {
			this.minutePicker.slideOut('b', {duration : .2});
		}
	},
	
	showSecondPicker : function(event, target) {
		//隐藏其它div
		this.hourPicker.hide();
		this.minutePicker.hide();
		if (!this.secondPicker.dom.firstChild) {
			var buf = ['<table border="0" style="border:1px #ccc solid" cellspacing="0">'];
			var secondArray = this.initialConfig.secondArray;
			if(!secondArray){
				for (var i = 0; i < 64; i++) {
					if (i % 8 == 0)
						buf.push('<tr>');
					if (i < 60)
						buf.push('<td class="x-date-mp-month" style="font-size:12px" value="'+ i + '"><a href="#">', String.leftPad(i,2, '0'), '</a></td>');
					else
						buf.push('<td  class="x-date-mp-cancel"><a href="#"></a></td>');
					if (i % 8 == 7)
						buf.push('</tr>');
				}
			}else{
				for (var i = 0; i < 64; i++) {
					if (i % 8 == 0)
						buf.push('<tr>');
					if (i < 60){
						if(i>(secondArray.length-1)){
							buf.push('<td class="x-date-mp-cancel"><a href="#">&nbsp;</a></td>');
						}else{
							buf.push('<td class="x-date-mp-month" style="font-size:12px" value="'+ i + '"><a href="#">', secondArray[i], '</a></td>');
						}
					}
					else
						buf.push('<td class="x-date-mp-cancel"><a href="#"></a></td>');
					if (i % 8 == 7)
						buf.push('</tr>');
				}
			}
			
			//buf.push('<tr class="x-date-mp-btns"><td colspan="8"><button type="button" class="x-date-mp-cancel">',
			//				this.cancelText, '</button></td></tr></table>');
			buf.push('</table>');
			this.secondPicker.update(buf.join(''));
			this.secondPicker.on('click', this.onSecondClick, this);
			this.updateHMS(this.second, this.secondPicker);
		}
		var size = this.el.getSize();
		var sizeWidth = size.width;
		this.secondPicker.setSize(size.width, 175);
		this.secondPicker.child('table').setSize(size.width, 175);
		this.secondPicker.slideIn('b', {duration : .2});
	},
	onSecondClick : function(e, t) {
		e.stopEvent();
		var el = new Ext.Element(t), pn;
		if (pn = el.up('td.x-date-mp-month', 2)) {
			this.second = parseInt(t.innerHTML, 10);
			//this.el.child("td.x-date-second").dom.innerHTML = t.innerHTML;
			this.secondLabel.setValue(t.innerHTML);
			this.updateHMS(this.second, this.secondPicker);
			this.secondPicker.slideOut('b', {duration : .2});
		} 
//		else if (pn = el.is('button.x-date-mp-cancel')) {
//			this.secondPicker.slideOut('b', {duration : .2});
//		}
		else if (pn = el.is('td.x-date-mp-cancel')) {
			this.secondPicker.slideOut('b', {duration : .2});
		}
	},	
	
	showSpeedPicker : function(event, target) {
		//隐藏其它div
		this.hourPicker.hide();
		this.minutePicker.hide();
		this.secondPicker.hide();
		var speedArray = this.initialConfig.speedArray;
		if(speedArray){
			if (!this.speedPicker.dom.firstChild) {
				var buf = ['<table border="0" style="border:1px #ccc solid" cellspacing="0">'];
				for (var i = 0; i < 10; i++) {
					if(i>(speedArray.length-1)){
						buf.push('<tr>');
						buf.push('<td><a href="#">&nbsp;</a></td>');
						buf.push('</tr>');
					}else{
						buf.push('<tr>');
						buf.push('<td class="x-date-mp-month" style="font-size:12px" value="'+ i + '"><a href="#">', speedArray[i], '</a></td>');
						buf.push('</tr>');
					}
				}
				buf.push('<tr class="x-date-mp-btns"><td colspan="7"><button type="button" class="x-date-mp-cancel">',this.cancelText,'</button></td></tr></table>');
				this.speedPicker.update(buf.join(''));
				this.speedPicker.on('click', this.onSpeedClick, this);
				this.updateHMS(this.hour, this.hourPicker);
			}
			var size = this.el.getSize();
			var sizeWidth = size.width;
			this.speedPicker.setSize(size.width, 230);
			this.speedPicker.child('table').setSize(size.width, 230);
			this.mpHours = this.speedPicker.select('td.x-date-mp-month');
			this.mpHours.each(function(m, a, i) {m.dom.xhour = i;});
			this.speedPicker.slideIn('b', {duration : .2});
		}
	},
	
	onSpeedClick : function(e, t) {
		e.stopEvent();
		var el = new Ext.Element(t), pn;
		if (pn = el.up('td.x-date-mp-month', 2)) {
			//赋值
			var date = t.innerHTML;
			val1 = Date.parseDate(date,'Y-m-d H:i:s');
			this.setValue(val1);
			this.hourLabel.setValue(val1.getHours());
			this.minuteLabel.setValue(val1.getMinutes());
			this.secondLabel.setValue(val1.getSeconds());
			
            this.fireEvent("select", this, val1);
            this.updateHMS(this.second, this.secondPicker);
			this.speedPicker.slideOut('b', {duration : .2});
		} else if (pn = el.is('button.x-date-mp-cancel')) {
			this.speedPicker.slideOut('b', {duration : .2});
		}
	},	
	
	updateHMS : function(v, p) {
		var mps = p.select('td.x-date-mp-month').removeClass('x-date-mp-sel');
		mps.each(function(m, a, i) {
			m[parseInt(m.dom.value, 10) == v ? 'addClass' : 'removeClass']('x-date-mp-sel');
		});
	},

	/**
	* Method Name: update
	* Description: as per Ext.DatePicker's update, except updates year label in its own cell
	* Parameters: as per Ext.DatePicker's update
	* Returns: n/a
	* Throws: n/a
	*/
	update : function(date){
        var vd = this.activeDate;
        this.activeDate = date;
        if(vd && this.el){
            var t = date.getTime();
            if(vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear()){
                this.cells.removeClass("x-date-selected");
                this.cells.each(function(c){
                   if(c.dom.firstChild.dateValue == t){
                       c.addClass("x-date-selected");
                       setTimeout(function(){
                            try{c.dom.firstChild.focus();}catch(e){}
                       }, 50);
                       return false;
                   }
                });
                return;
            }
        }
        var days = date.getDaysInMonth();
        var firstOfMonth = date.getFirstDateOfMonth();
        var startingPos = firstOfMonth.getDay()-this.startDay;

        if(startingPos <= this.startDay){
            startingPos += 7;
        }

        var pm = date.add("mo", -1);
        var prevStart = pm.getDaysInMonth()-startingPos;

        var cells = this.cells.elements;
        var textEls = this.textNodes;
        days += startingPos;

        // convert everything to numbers so it's fast
        var day = 86400000;
        var d = (new Date(pm.getFullYear(), pm.getMonth(), prevStart)).clearTime();
        var today = new Date().clearTime().getTime();
        var sel = date.clearTime().getTime();
        var min = this.minDate ? this.minDate.clearTime() : Number.NEGATIVE_INFINITY;
        var max = this.maxDate ? this.maxDate.clearTime() : Number.POSITIVE_INFINITY;
        var ddMatch = this.disabledDatesRE;
        var ddText = this.disabledDatesText;
        var ddays = this.disabledDays ? this.disabledDays.join("") : false;
        var ddaysText = this.disabledDaysText;
        var format = this.format;

        var setCellClass = function(cal, cell){
            cell.title = "";
            var t = d.getTime();
            cell.firstChild.dateValue = t;
            if(t == today){
                cell.className += " x-date-today";
                cell.title = cal.todayText;
            }
            if(t == sel){
                cell.className += " x-date-selected";
                setTimeout(function(){
                    try{cell.firstChild.focus();}catch(e){}
                }, 50);
            }
            // disabling
            if(t < min) {
                cell.className = " x-date-disabled";
                cell.title = cal.minText;
                return;
            }
            if(t > max) {
                cell.className = " x-date-disabled";
                cell.title = cal.maxText;
                return;
            }
            if(ddays){
                if(ddays.indexOf(d.getDay()) != -1){
                    cell.title = ddaysText;
                    cell.className = " x-date-disabled";
                }
            }
            if(ddMatch && format){
                var fvalue = d.dateFormat(format);
                if(ddMatch.test(fvalue)){
                    cell.title = ddText.replace("%0", fvalue);
                    cell.className = " x-date-disabled";
                }
            }
        };

        var i = 0;
        for(; i < startingPos; i++) {
            textEls[i].innerHTML = (++prevStart);
            d.setDate(d.getDate()+1);
            cells[i].className = "x-date-prevday";
            setCellClass(this, cells[i]);
        }
        for(; i < days; i++){
            intDay = i - startingPos + 1;
            textEls[i].innerHTML = (intDay);
            d.setDate(d.getDate()+1);
            cells[i].className = "x-date-active";
            setCellClass(this, cells[i]);
        }
        var extraDays = 0;
        for(; i < 42; i++) {
             textEls[i].innerHTML = (++extraDays);
             d.setDate(d.getDate()+1);
             cells[i].className = "x-date-nextday";
             setCellClass(this, cells[i]);
        }

        this.mbtn.setText(this.monthNames[date.getMonth()] + " " + date.getFullYear());

        //时;
		if(this.theHours<10){
			txt='0'+this.theHours;
		}
		else{
			txt= this.theHours;
		}
		this.hourLabel.setValue(txt+this.hourText);

		//分;
		if(this.theMinutes<10){
			txt='0'+this.theMinutes;
		}
		else{
			txt= this.theMinutes;
		}	
		this.minuteLabel.setValue(txt+this.miniteText);
           
        //秒;  
        if(this.theSeconds<10){  
            txt='0'+this.theSeconds;  
        }  
        else{  
            txt= this.theSeconds;  
        }     
        this.secondLabel.setValue(txt+this.secondText);    

        if(!this.internalRender){
            var main = this.el.dom.firstChild;
            var w = main.offsetWidth;
            this.el.setWidth(w + this.el.getBorderWidth("lr"));
            Ext.fly(main).setWidth(w);
            this.internalRender = true;
            // opera does not respect the auto grow header center column
            // then, after it gets a width opera refuses to recalculate
            // without a second pass
            if(Ext.isOpera && !this.secondPass){
                main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth+main.rows[0].cells[2].offsetWidth)) + "px";
                this.secondPass = true;
                this.update.defer(10, this, [date]);
            }
        }
	},
	
	/***** Public Instance Variables *****/
	
	/**
	* Variable Name: nextYearText, prevYearText
	* Description: Hover text for the previous year and next year arrow changers
	* Default: as shown
	* Type: string
	*/
	nextYearText: 'Next Year (Control+Up)',
	prevYearText: 'Previous Year (Control+Down)'
});


/** Class Name: gdc.component.dateTime.DatetimeItem
 * Inherits From: Ext.menu.Adapter
 * Contains: gdc.component.dateTime.DatetimePicker
 * Purpose: Effectively overrides Ext.menu.DateItem so that it contains gdc.component.dateTime.DatetimePicker instead of Ext.DatePicker
 * Note: ORIGINAL and NEW comments are used to denote what differs from Ext.menu.DateItem
 */
gdc.component.dateTime.DatetimeItem = function(config){
	// ORIGINAL:
	//Ext.menu.DateItem.superclass.constructor.call(this, new Ext.DatePicker(config), config);
	// NEW:
	gdc.component.dateTime.DatetimeItem.superclass.constructor.call(this, new gdc.component.dateTime.DatetimePicker(config), config);
	// END NEW
	this.picker = this.component;
	this.addEvents({select: true});

	this.picker.on("render", function(picker){
		picker.getEl().swallowEvent("click");
		picker.container.addClass("x-menu-date-item");
	});

	this.picker.on("clear", this.onSelect, this);   //监听清除事件;  
	this.picker.on("select", this.onSelect, this);
};

Ext.extend(gdc.component.dateTime.DatetimeItem, Ext.menu.Adapter, {
	onSelect : function(picker, date){
		this.fireEvent("select", this, date, picker);
		// ORIGINAL:
		//Ext.menu.DateItem.superclass.handleClick.call(this);
		// NEW:
		gdc.component.dateTime.DatetimeItem.superclass.handleClick.call(this);
		// END NEW
	}
});


/** Class Name: gdc.component.dateTime.DatetimeMenu
 * Inherits From: Ext.menu.Menu
 * Contains: gdc.component.dateTime.DatetimeItem
 * Purpose: Effectively overrides Ext.menu.DateMenu so that it contains gdc.component.dateTime.DatetimeItem instead of Ext.menu.DateItem
 * Note: ORIGINAL and NEW comments are used to denote what differs from Ext.menu.DateMenu
 */
gdc.component.dateTime.DatetimeMenu = function(config){
	// ORIGINAL:
	//Ext.menu.DateMenu.superclass.constructor.call(this, config);
	//this.plain = true;
	//var di = new Ext.menu.DateItem(config);
	// NEW:
	if(!config){
		config = {};
	}
	config.listeners = {
		hide:function(){
			if(!this.picker.clearFlag){
				this.picker.selectOK();
			}else{
				this.picker.clearFlag = false;
			}
		},
		beforeshow:function(){
			if (this.picker) {
				if (this.picker.hourPicker) {
					this.picker.hourPicker.hide();
				}
				if (this.picker.minutePicker) {
					this.picker.minutePicker.hide();
				}
				if (this.picker.secondPicker) {
					this.picker.secondPicker.hide();
				}
				if (this.picker.speedPicker) {
					this.picker.speedPicker.hide();
				}
				this.picker.hideMonthPicker(true);
			}
		}
	};
		
	gdc.component.dateTime.DatetimeMenu.superclass.constructor.call(this, config);
	this.plain = true;
	var di = new gdc.component.dateTime.DatetimeItem(config);
	// END NEW
	this.add(di);
	this.picker = di.picker;
	this.relayEvents(di, ["select"]);
};
Ext.extend(gdc.component.dateTime.DatetimeMenu, Ext.menu.Menu,{
	onMouseOver : function(e){
		if(!e.target._nodup){
        	return;
        }
        
        var t;
		if(t = this.findTargetItem(e)){
            if(t.canActivate && !t.disabled){
                this.setActiveItem(t, true);
            }
        }
        this.over = true;
        this.fireEvent("mouseover", this, e, t);
    },

    onMouseOut : function(e){
    	if(!e.target._nodup){
        	return;
        }
        
        var t;
        if(t = this.findTargetItem(e)){
            if(t == this.activeItem && t.shouldDeactivate(e)){
                this.activeItem.deactivate();
                delete this.activeItem;
            }
        }
        this.over = false;
        this.fireEvent("mouseout", this, e, t);
    }
});

/** 
 * 扩展Ext.form.DateField,增加,时,分,秒; 
 */  
//gdc.component.dateTime.DatetimeField = Ext.extend(Ext.form.DateField, {  
gdc.component.dateTime.DateTimeField = Ext.extend(Ext.form.DateField, {  
    initComponent: function (){  
        gdc.component.dateTime.DateTimeField.superclass.initComponent.apply(this , arguments);  
        var config = {};
        config.minuteArray = this.initialConfig.minuteArray;
        config.secondArray = this.initialConfig.secondArray;
        config.speedArray = this.initialConfig.speedArray;
        config.secondDisable = this.initialConfig.secondDisable;
        config.minuteDisable = this.initialConfig.secondDisable;
        config.hourDisable = this.initialConfig.secondDisable;
        this.menu = new gdc.component.dateTime.DatetimeMenu(config);  
    },  
      
    //覆盖其他父类方法     
    onRender: function (){    
        gdc.component.dateTime.DateTimeField.superclass.onRender.apply(this , arguments);    
    },
    
    menuListeners : {
        select: function(m, d){
        	this.setValue(d);
        	this.fireEvent('select', this, d);
            this.fireEvent('blur', this);
        },
        show : function(){ 
            this.onFocus();
        },
        hide : function(){
            this.focus.defer(10, this);
            var ml = this.menuListeners;
            this.menu.un("select", ml.select,  this);
            this.menu.un("show", ml.show,  this);
            this.menu.un("hide", ml.hide,  this);
        }
    }
}) 
Ext.reg('dateTime', gdc.component.dateTime.DateTimeField);
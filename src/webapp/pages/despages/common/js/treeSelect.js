
var oldSelect="";
var isSelectTree=false;

function searchTreeNode(){

    /*
   	 * 导航查询
   	 */
   	$('#CobConsSelect').combobox({
   		valueField : 'id',
   		textField : 'text',
   		panelWidth:213,
   		panelMaxHeight:213,
   		onSelect:function(rec){
   			if(rec.id!=''&& rec.id != oldSelect){
   				$('#consSelect').textbox('setText',rec.rootName);
   	   		    oldSelect = rec.id;
   	   			$('#CobConsSelect').combobox('setValue','');
   			}
   		},
   		onLoadSuccess : function(node) {
//   			$("a").removeClass("combo-arrow");
   		}
   	});
    	
//	$("a").removeClass("combo-arrow");
	$('#CobConsSelect').textbox('textbox').keydown(function (e) {
		if(e.keyCode==13)
		{
			isSelectTree=true;
			selectTree($('#CobConsSelect').combobox("getValue"));
		}
	});
	 
	 //下拉点击
	$('#CobConsSelect').combobox("panel").click(function(){
		isSelectTree=true;
		selectTree($('#CobConsSelect').combobox("getValue"));
	});
	
	$('#consSelect').textbox('textbox').keyup(function (e) {
       if (e.keyCode == 38||e.keyCode == 40){//上下选择键
    	   $('#CobConsSelect').combobox('textbox').focus();
    	   isSelectTree=false;
    	   if($('#CobConsSelect').combobox("getValue").length<=0){
    		    var byqData = $('#CobConsSelect').combobox("getData");
	   			if(byqData.length>0){
	   				$('#CobConsSelect').combobox('select',byqData[0].id);
	   			}else{
	   				$('#CobConsSelect').combobox('select','');
	   			}
    	   }
    	  
		} else {
			var newValue = $('#consSelect').textbox('getText');
			$.getJSON(webContextRoot+ 'destree/queryTree.action?isQyCode=false&ziMu='+ newValue, {},
			function(json) 
			{
		       $('#CobConsSelect').combobox('loadData',json);
		       $('#CobConsSelect').combobox('showPanel');
		       $('#CobConsSelect').combobox('setValue','');
		       
		    });
		}
	});
}
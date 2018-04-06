//var consId = 101000004001;
var dnzlCurrentTime = new Date();//当前时间
var dnzlTime;//选择导出的时间
var dnzl_dialog_content = null;
var dnzlFlag=0;
$(function(){
	$("#bt_exportdnzl").click(function(){
		if(dnzl_dialog_content ==null){
			dnzl_dialog_content = '<div id="dnzl-dialog" class="easyui-dialog"  title="谐波监测报告" style="padding:20px;align:center;overflow:hidden"'+
		       ' data-options="minimizable:false,maximizable:false,collapsible:false,resizable:true,modal:true,closed:true"> '+
		       '<table><tr><td width="150px;">谐波监测报告年月：</td>'+
		       '<td><a id="dnzl_left" href="#" style="border-style:none;"><img style="border-style:none;" alt="前一天" src="'+webContextRoot+'/images/tools-moveleft.gif"></a></td>'+
			   '<td><input id="dnzlrq" class="Wdate" type="text" style="width: 110px;text-align: left;" readonly="readonly" onClick="WdatePicker({dateFmt:\'yyyy-MM\',onpicked:changeDNZLDate,isShowClear:false,readOnly:true})"/></td>'+
			   '<td><a id="dnzl_right" href="#" style="border-style:none;"><img style="border-style:none;" alt="后一天" src="'+webContextRoot+'/images/tools-moveright.gif"></a></td>'+
		       '<td width="80px;"><a href="#" class="easyui-linkbutton c100" onClick="dnzl_search()" >确定</a></td>'+
		       '</tr></table>'+
			' </div>';  
			$(document.body).append(dnzl_dialog_content);
		}
		$("#dnzl-dialog").dialog({}); 
		$("#dnzlrq").val(DateUtil.dateToStr('yyyy-MM',dnzlCurrentTime)); 
		$('#dnzl-dialog').dialog("open");  
		
		if(dnzlFlag==0){
			dnzlFlag = 1;
			$('#dnzl_left').click(function(){
				dnzlTime =  $('#dnzlrq').val();//获取当前开始日期
				var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',-1,DateUtil.strToDate(dnzlTime+"-01")));//月份减1
				$('#dnzlrq').val(nowDate.substr(0,7));//重新赋值
			});
			
			 //右加日期
			$('#dnzl_right').click(function(){
				dnzlTime =  $('#dnzlrq').val();//开始日期
				var nowDate = DateUtil.dateToStr('yyyy-MM-dd',DateUtil.dateAdd('m',1,DateUtil.strToDate(dnzlTime+"-01")));//月份加1
				$('#dnzlrq').val(nowDate.substr(0,7));//重新赋值
			});
		}
	});
	
	$.fn.datagrid.methods.exportExcel = function(target,param){
		return target.each(function() {
			var opts = $.data(this, "datagrid").options;
			var data = $.extend({}, opts.queryParams, param.data);
			if (opts.pagination) {
				$.extend(data, {
							page : opts.pageNumber,
							rows : opts.pageSize
						});
			}
			if (opts.sortName) {
				$.extend(data, {
							sort : opts.sortName,
							order : opts.sortOrder
						});
			}
			if (opts.onBeforeLoad.call(this, data) == false) {
				return;
			}
			var str = "";
			str = encodeURI(param.url + str);
			var exportObj = $("#rimp_export");
			if(exportObj && exportObj.length > 0){
				exportObj.attr("src", str);
			}else{
				$("<iframe id='rimp_export' style='display:none' />").appendTo($("body"));
				$("#rimp_export").attr("src", str);
			}
		});
	};
	
});

/**
 * 点击确定后 导出
 */
function dnzl_search(){
	dnzlTime = $("#dnzlrq").val();
	$('#dnzl-dialog').dialog("close");  
	$('#gridDiv').datagrid("exportExcel", {
	  url : webContextRoot+'export/exportdnzl.action?consId='+consId+'&time='+dnzlTime //101000001077 101000004001
	});
}


function changeDNZLDate(){
	
}
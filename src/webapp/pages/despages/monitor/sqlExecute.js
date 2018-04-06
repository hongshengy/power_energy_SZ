/**
 * sql查询 by 张凡
 * 
 */

var executeColumns = [[{field:'result',title:'执行结果',align:'center'},
                       {field:'resultData',title:'返回信息',align:'center'}]];
var pageSize = 10;
$(function() {
	
	// 初始化sql编辑area
	window.editor = CodeMirror.fromTextArea(document.getElementById('sqlText'),
			{
				mode : "text/x-sql",
				indentWithTabs : true,
				smartIndent : true,
				lineNumbers : true,
				matchBrackets : true,
				autofocus : true,
				extraKeys : {
					"Ctrl-Space" : "autocomplete"
				},
				hintOptions : {
					tables : {
						users : {
							name : null,
							score : null,
							birthDate : null
						},
						countries : {
							name : null,
							population : null,
							size : null
						}
					}
				}
			});
	
	// 当前区域名称
	$('#nowArea').textbox('setValue', top.areaName);
//	$('#oraclePassword').textbox('textbox').bind('click',function(){
//		alert(1);
//		$('#oraclePassword').textbox({
//			type : 'password'
//		});
//	});
	
});

function clearSql(){
    editor.setValue("");
    $('#executeTime').textbox('setValue', '');
//    $('#executeType').textbox('setValue', '');
    
//    $("#runMessage").text("");
//    $("#resultDiv").empty();
}

function commandExecute(){
	var sqlText = $.trim(editor.getValue());
	var len = 0;
	// 判断是否输入用户名
	if($('#oracleName').textbox('getValue') == null || $.trim($('#oracleName').textbox('getValue')) == ''){
		$.messager.alert('警告','请输入用户名！');  
		return;
	}
	// 判断是否输入用户名
	if($('#oraclePassword').textbox('getValue') == null || $('#oraclePassword').textbox('getValue') == ''){
		$.messager.alert('警告','请输入密码！');  
		return;
	}
	// 判断是否输入sqlText
	if(sqlText == null || sqlText == ''){
		$.messager.alert('警告','请输入sql！'); 
		return;
	}
	
	// sqlText是否超长
	var sqlTexts = sqlText.split(";");
	for(var j=0; j<sqlTexts.length;j++){
		sqlTexts[j] = $.trim(sqlTexts[j]);
		len = 0;
		for(var i=0;i<sqlTexts[j].length;i++){
			if(sqlTexts[j].charCodeAt(i) > 255){
				len += 2;
			}else{
				len++;
			}
		}
		if(len > 1024){
			$.messager.alert('警告','第'+j+'段输入的sql长度超过1024字节'); 
			return;
		}
	}
	

	$.messager.confirm('确认','确认想要执行命令吗？',function(r){    
	    if (r){    
	    	$('#executeTime').textbox('setValue', '');
	    	$("#executeLoading").show();
	    	$('#clearSqlButton').linkbutton('disable');
	    	$('#commandExecuteButton').linkbutton('disable');
	    	$('#sqlQueryButton').linkbutton('disable');
//	    	$('#executeType').textbox('setValue', '执行中');
	    	$.ajax({
	    		type : "POST",
	    		url : webContextRoot + 'sqlExecute/commandExecute.action',
	    		data : 'sqlText='+encodeURI(encodeURI(editor.getValue()).replace(/\+/g,'%2B'))
								+'&oracleName='+Base64.encode($('#oracleName').textbox('getValue'))
								+'&oraclePassword='+Base64.encode($('#oraclePassword').textbox('getValue')),
	    		dataType : "json",
	    		success : function(data) {
	    			if(data.resultList != null){
	    				var datas = new Array();
	    				var resultTime = 0;
	    				for(var i=0; i<data.resultList.length; i++){
	    					resultTime += data.resultList[i].resultTime;
	    					datas.push({result : data.resultList[i].result,resultData : data.resultList[i].resultData})
	    				}
	    				$('#executeTime').textbox('setValue', resultTime/1000);
	    				$('#resultTable').datagrid({// 表格
	    					width:'100%',
	    				    height:'100%',
	    					nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
	    					striped : true,// 设置为true将交替显示行背景。
	    					border : false,
	    					fit : true,
	    					pagination : true,// 设置true将在数据表格底部显示分页工具栏。
	    					fitColumns : true,// 自动适应宽度
	    					singleSelect : true,// 设置为true将只允许选择一行。
	    					rownumbers : true,// 设置为true将显示行数。
	    					pageNumber : 1,//在设置分页属性的时候初始化页码。
	    					pageSize : 10,
	    					loadMsg : "正在努力的读取数据中...",// 提示信息
	    					columns : executeColumns,
	    					data : datas
	    				});
	    			}
	    			$("#executeLoading").hide();
	    	    	$('#clearSqlButton').linkbutton('enable');
	    	    	$('#commandExecuteButton').linkbutton('enable');
	    	    	$('#sqlQueryButton').linkbutton('enable');
//	    			$('#executeType').textbox('setValue', '执行完成');
	    		}
	    	});   
	    }    
	});  
}

function sqlQuery(){
	var sqlText = $.trim(editor.getValue());
	var len = 0;
	// 判断是否输入用户名
	if($('#oracleName').textbox('getValue') == null || $.trim($('#oracleName').textbox('getValue')) == ''){
		$.messager.alert('警告','请输入用户名！');  
		return;
	}
	// 判断是否输入用户名
	if($('#oraclePassword').textbox('getValue') == null || $('#oraclePassword').textbox('getValue') == ''){
		$.messager.alert('警告','请输入密码！');  
		return;
	}
	// 判断是否输入sqlText
	if(sqlText == null || sqlText == ''){
		$.messager.alert('警告','请输入sql！'); 
		return;
	}
	// sqlText是否超长
	for(var i=0;i<sqlText.length;i++){
		if(sqlText.charCodeAt(i) > 255){
			len += 2;
		}else{
			len++;
		}
	}
	if(len > 1024){
		$.messager.alert('警告','输入的sql长度超过1024字节'); 
		return;
	}
	
	$.messager.confirm('确认','确认想要执行查询吗？',function(r){    
	    if (r){    
	    	$('#executeTime').textbox('setValue', '');
	    	$("#executeLoading").show();
	    	$('#clearSqlButton').linkbutton('disable');
	    	$('#commandExecuteButton').linkbutton('disable');
	    	$('#sqlQueryButton').linkbutton('disable');
//	    	$('#executeType').textbox('setValue', '执行中');
	    	$.ajax({
	    		type : "POST",
	    		url : webContextRoot + 'sqlExecute/sqlQuery.action',
	    		data : 'sqlText='+encodeURI(encodeURI(editor.getValue()).replace(/\+/g,'%2B'))
	    						+'&oracleName='+Base64.encode($('#oracleName').textbox('getValue'))
	    						+'&oraclePassword='+Base64.encode($('#oraclePassword').textbox('getValue')),
	    		dataType : "json",
	    		success : function(data) {
	    			if(data.resultList != null){
	    				$('#executeTime').textbox('setValue', data.resultList[0].resultTime/1000);
	    				if(data.resultList[0].result == 'success'){
	    					var sqlColumns = [[]];
	    					if(data.resultList[0].resultData.length > 0){
	    						for(var key in data.resultList[0].resultData[0]){
	    							sqlColumns[0].push({field:key,title:key,align:'center'});
		    					}
	    						$('#resultTable').datagrid({// 表格
	    							width:'100%',
	    						    height:'100%',
			    					nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
			    					striped : true,// 设置为true将交替显示行背景。
			    					border : false,
			    					fit : true,
			    					pagination : true,// 设置true将在数据表格底部显示分页工具栏。
			    					fitColumns : true,// 自动适应宽度
			    					singleSelect : true,// 设置为true将只允许选择一行。
			    					rownumbers : true,// 设置为true将显示行数。
			    					loadMsg : "正在努力的读取数据中...",// 提示信息
			    					columns : sqlColumns,
			    					data : data.resultList[0].resultData.slice(0,10)
			    				});
	    						var pager = $('#resultTable').datagrid("getPager");
	    						pager.pagination({
	    							total:data.resultList[0].resultData.length,
	    							pageSize:pageSize,
	    							pageList: [10,20,50],//可以设置每页记录条数的列表  
	    							beforePageText:'第',
	    							afterPageText:'页 共 {pages} 页',
	    							displayMsg:'当前显示 {from} - {to} 条记录,共 {total} 条记录',
	    							onSelectPage:function(pageNo,pageSize){
	    								var start = (pageNo-1)*pageSize;
	    								var end = start+ pageSize;
	    								$('#resultTable').datagrid('loadData',data.resultList[0].resultData.slice(start,end));
	    								pager.pagination('refresh',{
	    									total:data.resultList[0].resultData.length,
	    									pageNumber:pageNo
	    								});
	    							},
	    							onChangePageSize:function(size){
	    								pageSize = size;
	    							}
	    						});
	    					}else{
	    						$('#resultTable').datagrid({// 表格
	    							width:'100%',
	    						    height:'100%',
			    					nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
			    					striped : true,// 设置为true将交替显示行背景。
			    					border : false,
			    					fit : true,
			    					pagination : true,// 设置true将在数据表格底部显示分页工具栏。
			    					fitColumns : true,// 自动适应宽度
			    					singleSelect : true,// 设置为true将只允许选择一行。
			    					rownumbers : true,// 设置为true将显示行数。
			    					pageNumber : 1,//在设置分页属性的时候初始化页码。
			    					pageSize : 10,
			    					loadMsg : "正在努力的读取数据中...",// 提示信息
			    					columns : [],
			    					data : []
			    				});
	    					}
	    					
	    				}else{
	    					$('#resultTable').datagrid({// 表格
	    						width:'100%',
	    					    height:'100%',
		    					nowrap : false,// 设置为true，当数据长度超出列宽时将会自动截取。
		    					striped : true,// 设置为true将交替显示行背景。
		    					border : false,
		    					fit : true,
		    					pagination : true,// 设置true将在数据表格底部显示分页工具栏。
		    					fitColumns : true,// 自动适应宽度
		    					singleSelect : true,// 设置为true将只允许选择一行。
		    					rownumbers : true,// 设置为true将显示行数。
		    					pageNumber : 1,//在设置分页属性的时候初始化页码。
		    					pageSize : 10,
		    					loadMsg : "正在努力的读取数据中...",// 提示信息
		    					columns : executeColumns,
		    					data : [{result : data.resultList[0].result,resultData : data.resultList[0].resultData}]
		    				});
	    				}
	    				
	    			}
//	    			$('#executeType').textbox('setValue', '执行完成');
	    			$("#executeLoading").hide();
	    			$('#clearSqlButton').linkbutton('enable');
	    	    	$('#commandExecuteButton').linkbutton('enable');
	    	    	$('#sqlQueryButton').linkbutton('enable');
	    		}
	    	});  
	    }    
	}); 

}
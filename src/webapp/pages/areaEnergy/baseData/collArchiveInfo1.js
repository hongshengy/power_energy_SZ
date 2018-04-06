/**
 * <p>
 * Title: 江苏能源综合服务平台
 * </p>
 * <p>
 * Description:采集档案主页查询
 * </p>
 * <p>
 * Copyright: Copyright (c) 2009
 * </p>
 * <p>
 * Company: 江苏方天电力技术有限公司
 * </p>
 */
des.namespace("com.frontier.areaEnergy.collArchiveInfo");


$(function() { 
	var isEdit = $("#isEdit").val();
	$("body").layout();
	com.frontier.areaEnergy.collArchiveInfo.showExact();
	setTimeout("com.frontier.areaEnergy.collArchiveInfo.query1();",1000);
});
com.frontier.areaEnergy.collArchiveInfo.query1 = function(){
	$('#exactSel').keyup(function(event){
	    com.frontier.areaEnergy.collArchiveInfo.enterFun(event);
	});
	
	$('#areaNo').combobox({    
	    url:des.webContextRoot+'areaEnergy/loadAreaList.action', 
	    valueField:'ID',    
	    textField:'TEXT',
	    editable:false,
	    panelHeight:'auto',  
		onLoadSuccess:function(){
		    var data = $(this).combobox('getData');
		    if(data.length>0){
		       $(this).combobox('select',data[0].ID);
		       var opts = $('#collArchiveTable').datagrid('options');
		       opts.url = des.webContextRoot+'areaEnergy/findCollArchiveList.action';
		       com.frontier.areaEnergy.collArchiveInfo.query();
		    }
		}
	 });
	
	$('#collArchiveTable').datagrid({
		height : $(window).height()-$('#queryDiv').height()-5,
		border : false,
		title : '查询结果',
		singleSelect : false,
		lazyLoad : true,
		striped : true,
		//fitColumns: true, 
		//url : des.webContextRoot+'areaEnergy/findCollArchiveList.action',
		sortOrder : 'desc',
		remoteSort : false,
		showFooter : true,
		pageSize : 50,
		pageList : [50,100,200,500],
		queryParams : {"collArchiveInfo.queryFlag" : 0},
		columns : [[
		        {   
		            field:'orgNo',
		            align:'center',
		            checkbox:true,
		            width:10,
		            formatter:function(value,row,index){
					     return row.orgNo;
					}
		        },{
					title : '能源类别',
					align:'center',
					field : 'userCode',
					width : 100,
					sortable : true,
					formatter:function(value,row,index){
					     return row.userCode;
					}
				},
		        {
					title : '用户名称',
					align:'center',
					field : 'consName',
					width : 160,
					sortable : true,
					formatter:function(value,row,index){
					     return '<span title='+row.consName+'>'+row.consName+'</span>';
					}
				}, {
					title : '用户类型',
					align:'center',
					field : 'consSortCode',
					width : 120,
					sortable : true,
					formatter:function(value,row,index){
					     return row.consSortCode;
					}
				}, {
					title : '用户状态',
					align:'center',
					field : 'consStatus',
					width : 100,
					sortable : true,
					formatter:function(value,row,index){
					     return row.consStatus;
					}
				}, {
					title : '合同容量',
					align:'center',
					field : 'contractCap',
					width : 80,
					sortable : true,
					formatter:function(value,row,index){
					     return row.contractCap+'KVA';
					}
				}, {
					title : '电压等级',
					align:'center',
					field : 'voltCode',
					width : 70,
					sortable : true,
					formatter:function(value,row,index){
					     return row.voltCode;
					}
				}, {
					title : '联系人',
					align:'center',
					field : 'contactName',
					width : 120,
					sortable : true,
					formatter:function(value,row,index){
					     return row.contactName;
					}
				}, {
					title : '联系电话',
					align:'center',
					field : 'officeTel',
					width : 120,
					sortable : true,
					formatter:function(value,row,index){
					     return row.officeTel;
					}
				}, {
					title : '用户地址',
					align:'center',
					field : 'addr',
					width : 200,
					sortable : true,
					formatter:function(value,row,index){
					     return '<span title='+row.addr+'>'+row.addr+'</span>';
					}
				}, {
					title : '建档日期',
					align:'center',
					field : 'createDate',
					width : 150,
					sortable : true,
					formatter:function(value,row,index){
					     return row.createDate;
					}
				}, {
					title : '经度',
					align:'center',
					field : 'gpsLongitude',
					width : 100,
					sortable : true,
					formatter:function(value,row,index){
					     return row.gpsLongitude;
					}
				}, {
					title : '纬度',
					align:'center',
					field : 'gpsLatitude',
					width : 100,
					sortable : true,
					formatter:function(value,row,index){
					     return row.gpsLatitude;
					}
				}, {
					title : '用户编号',
					align:'center',
					field : 'consNo',
					width : 130,
					sortable : true,
					formatter:function(value,row,index){
					     return row.consNo;
					}
				}, {
					title : '用户ID号',
					align:'center',
					field : 'consId',
					width : 130,
					sortable : true,
					formatter:function(value,row,index){
					     return row.consId;
					}
				},{
					title : '服务中心编码',
					hidden : 'true',
					align:'center',
					field : 'areaNo',
					width : 0,
					sortable : true,
					formatter:function(value,row,index){
					     return row.areaNo;
					}
				}, {
					title : '子用户ID',
					hidden : 'true',
					align:'center',
					field : 'lineConsId',
					width : 0,
					sortable : true,
					formatter:function(value,row,index){
					     return row.lineConsId;
					}
				}, {
					title : '用户类型码值',
					hidden : 'true',
					align:'center',
					field : 'userType',
					width : 0,
					sortable : true,
					formatter:function(value,row,index){
					     return row.userType;
					}
				}
		]],
		pagination : true,
		rownumbers : true,
		toolbar : [
			{
				text : '新建采集档案',
				id : 'newCollArchive',
				iconCls : 'icon-add',
				handler : function() {
					var url = des.webContextRoot+'pages/areaEnergy/baseData/tmnlInstall/creatConsSubRecord.jsp';
	                com.frontier.areaEnergy.collArchiveInfo.openMaxWin(url,'新建用户档案');
				}
			},'-',{
					text:'客户监控',
					iconCls:'icon-edit',
					handler:function(){
					    var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length!=1){  
				            $.messager.alert('提示',"请选择一条记录",'info'); 
				            return; 
				        }
				        var consId = rows[0].consId;
					    com.frontier.areaEnergy.collArchiveInfo.openMaxWin(des.webContextRoot+'pages/despages/monitor/comMonitor.jsp?consId='+consId,"采集档案配置");
				    }
			},'-',{
					text:'查看',
					iconCls:'icon-edit',
					handler:function(){
					    var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length!=1){  
				            $.messager.alert('提示',"请选择一条记录",'info'); 
				            return; 
				        }
				        var consId = rows[0].consId;
				        var areaNo = rows[0].areaNo;
				        var lineConsId = rows[0].lineConsId;
					    com.frontier.areaEnergy.collArchiveInfo.openMaxWin(des.webContextRoot+'pages/areaEnergy/baseData/index.jsp?consId='+consId+'&areaNo='+areaNo+'&lineConsId='+lineConsId+'&isEdit='+isEdit,"采集档案配置");
				    }
			},'-',{
					text:'删除',
					id : 'delCollArchive',
					iconCls:'icon-remove',
					handler:function(){
					    var rows = $('#collArchiveTable').datagrid('getSelections'); 
					    if(rows.length==0){  
				            $.messager.alert('提示',"请选择你要删除的用户",'info'); 
				            return; 
				        }
					    $.messager.confirm('提示','确定要删除吗?',function(result){  
					            if (result){  
					                var rows = $('#collArchiveTable').datagrid('getSelections');  
					                var consIdArr = [];  
					                $.each(rows,function(i,n){
					                    consIdArr.push({'consId' : n.consId});
					                });
					                //删除用户
					                var url = des.webContextRoot+"areaEnergy/deleteCollCons.action";
					                var para = 'cons='+JSON.stringify(consIdArr);
					                $.ajax({
						                url : url,
						                type: "post",
						                data : para,
						                dataType:"json",
						                timeout:60000, 
						                error : function (XMLHttpRequest, textStatus, errorThrown) {
						           	 	     alert('程序异常');
						                },
						                success : function(result) {
						                     $.messager.alert('提示',result.msg,'info');
						                     if(result.flag=='1'){
						                        $('#collArchiveTable').datagrid('reload');
						                     }
						                }
						            });
					            }  
					        });
				    }
			}
		],
		onLoadSuccess:function(){
			if(isEdit == 'false'){
				$("#newCollArchive").linkbutton("disable");
				$("#delCollArchive").linkbutton("disable");
			}
		}
	});	
}
//查询
com.frontier.areaEnergy.collArchiveInfo.query = function(){
    $('#queryFlag').val('0');
    var areaNo = $('#areaNo').val();
    var statusCode = $('#statusCode').val();
    var userType = $('#userType').val();
	var consName = $('#consName').val();
	var orgNo = $('#orgNo').combotree('tree').tree('getSelected').id;
	$('#collArchiveTable').datagrid("load",{
          "collArchiveInfo.areaNo" : areaNo,
          "collArchiveInfo.statusCode" : statusCode,
          "collArchiveInfo.userType" : userType,
          "collArchiveInfo.consName" : consName,
          "collArchiveInfo.queryFlag" : $('#queryFlag').val(),
          "collArchiveInfo.exactSel" : $('#exactSel').val(),
          "collArchiveInfo.orgNo" : orgNo
          
    });
}

//精确查询提示信息显示,失去焦点
com.frontier.areaEnergy.collArchiveInfo.showExact = function(){
    if($("input[name='exactSel']").val()==""){
         $("input[name='exactSel']").val("户号/表号/终端资产号/IP/电话号");
         $("input[name='exactSel']").css('color','#C0C0C0');
    }
}

//焦点聚焦
com.frontier.areaEnergy.collArchiveInfo.focusEvent = function(){
    if($("input[name='exactSel']").val()=="户号/表号/终端资产号/IP/电话号"){
         $('#exactSel').val('');
         $('#exactSel').css('color','black');
    }else{
         $('#exactSel').css('color','black');
    }
}

//exact精确查询:户号/表号/终端资产号/IP/电话号
com.frontier.areaEnergy.collArchiveInfo.enterFun = function(event){
     $('#queryFlag').val('1');
     if (event.keyCode==13) {
          if (!$('#exactSel').val()) {
              $.messager.alert('系统提示','精确查询，请输入精确查询的内容！');
              return;
          }else{
              $('#collArchiveTable').datagrid("load",{
		          "collArchiveInfo.exactSel" : $('#exactSel').val(),
		          "collArchiveInfo.queryFlag" : $('#queryFlag').val(),
		          "collArchiveInfo.orgNo" : $('#orgNo').val()
		          
		    });
         }
     }
     return;
}


//打开窗口
com.frontier.areaEnergy.collArchiveInfo.openMaxWin = function(url,title){
     var str = "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbar=no,copyhistory=no,left=0,screenX=0,top=0,screenY=0";
     if (window.screen) {
		var ah = screen.availHeight - 55;
		var aw = screen.availWidth - 10;
		str += ",height=" + ah;
		str += ",innerHeight=" + ah;
		str += ",width=" + aw;
		str += ",innerWidth=" + aw;
	} else { 
		str += ",resizable";
	}
	window.open(url,title, str);
}


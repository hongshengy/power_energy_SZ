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
des.namespace("com.frontier.areaEnergy.ems");

com.frontier.areaEnergy.ems.initGrid = function(subsType,deviceType,tblId,title){
   $.ajax({
              url : des.webContextRoot+"storedEneArchive/queryGridCol.action?subsType="+subsType+'&deviceType='+deviceType,
              type: "post",
              dataType:"json",
              timeout:60000,
              error : function (XMLHttpRequest, textStatus, errorThrown) {
         	 	     alert('程序异常');
              },
              success : function(result) {
                  var colArr=[];
                  for(var i=0;i<result.list.length-1;i++){
                     colArr.push({
                         field:result.list[i].WORD_NAME_EN,
                         title:result.list[i].WORD_NAME_CH,
                         width:100,
			       sortable:true,
			       formatter:(function(j){
			            return function(value,row,index){
					        return row[result.list[j].WORD_NAME_EN];
				        }
			       })(i)
                     });
                  }
           $('#'+tblId).datagrid({
                height : 400,
				border : false,
				title : title,
				singleSelect : true,
				lazyLoad : true,
				striped : true,
				url : des.webContextRoot+'storedEneArchive/queryGridData.action?subsType='+subsType+'&deviceType='+deviceType,
				sortOrder : 'desc',
				remoteSort : false,
				showFooter : true,
				pageSize : 50,
				pageList : [50,100,200,500],
                pagination : true,
                rownumbers : true,
			    columns:[colArr],
			    toolbar : [
					{
						text : '新增',
						iconCls : 'icon-add',
						handler : function() {
							var url = '';
							
							if(deviceType == 2){
								 url = des.webContextRoot+'pages/storedEnergy/storedEnergyDevice/addNewEMSDevice.jsp?SUBS_ID='+'-101000003875';
							}else if(deviceType == 3){
								url = des.webContextRoot+'pages/storedEnergy/storedEnergyDevice/addNewPCSDevice.jsp?SUBS_ID='+'-101000003875';
							}else{
								url = des.webContextRoot+'pages/storedEnergy/storedEnergyDevice/addNewBMSDevice.jsp?SUBS_ID='+'-101000003875';
							}
                            OpenWin(encodeURI(url),'新增EMS信息',screen.availWidth-400,screen.availHeight-450);
						}
					},'-',{
							text:'修改',
							iconCls:'icon-edit',
							handler:function(){
								var rows = $('#dg').datagrid('getSelections');
								alert(rows.length);
							    if(rows.length==0){  
						            return;
						        }
						    }
					},'-',{
							text:'删除',
							iconCls:'icon-remove',
							handler:function(){
							    
						    }
					}
				]
			});
                  
              }
          });
}





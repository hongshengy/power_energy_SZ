<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<html>
  <head>
		<title>新增EMS信息</title>
		<base href="<%=basePath%>">
		<jsp:include page="/pages/areaEnergy/common/head.jsp"></jsp:include>
		<script type="text/javascript">
		  $(function(){
		      queryFormCtrl();
		      changeTypeBind();
		      //loadFormData();
		  });
		  
		  function queryFormCtrl(){
		     var subsType = $('#subsType').val();
		     var deviceType = $('#deviceType').val();
	         $.ajax({
	              url : des.webContextRoot+"areaEnergy/queryFormCtrl.action?subsType="+subsType+'&deviceType='+deviceType,
	              type: "post",
	              dataType:"json",
	              timeout:60000,
	              async:false,
	              error:function (XMLHttpRequest, textStatus, errorThrown) {
	         	       alert('程序异常');
	              },
	              success:function(result) {
	                  var str='';
	                  var ctrlStr='';
	                  var obj;
	                  var comArr=[];
	                  for(var i=0;i<result.list.length-1;i++){
	                     obj = result.list[i];
	                     if(obj.WORD_CTRL=='input'){
	                          ctrlStr='<input id="'+obj.WORD_NAME_EN+'" name="'+obj.WORD_NAME_EN+'"  class="easyui-textbox">';
	                     }else if(obj.WORD_CTRL=='select'){
	                          ctrlStr='<input id="'+obj.WORD_NAME_EN+'" name="'+obj.WORD_NAME_EN+'" size="27">';
	                          comArr.push(obj);
	                     }else if(obj.WORD_CTRL=='textarea'){
	                          ctrlStr='<input id="'+obj.WORD_NAME_EN+'" name="'+obj.WORD_NAME_EN+'" size="27" class="easyui-textbox" multiline="true">';
	                     }
	                     if((i+1)%3==1){
	                           str=str+'<tr><td class="td-label" align="center" nowrap="nowrap">'+obj.WORD_NAME_CH+'</td>'
	                                +'<td width="25%">'+ctrlStr+'</td>';
	                        
	                     }else if((i+1)%3==0){
	                           str=str+'<td class="td-label" align="center" nowrap="nowrap">'+obj.WORD_NAME_CH+'</td>'
	                                +'<td width="25%">'+ctrlStr+'</td></tr>';
	                     }else{
	                           str=str+'<td class="td-label" align="center" nowrap="nowrap">'+obj.WORD_NAME_CH+'</td>'
	                                +'<td width="25%">'+ctrlStr+'</td>';
	                     } 
	                  }
	                  $('#formTable').append(str);
	                  //combobox码值加载
	                  for(var i=0;i<comArr.length-1;i++){
	                      $('#'+comArr[i].WORD_NAME_EN).combobox({
					          url :'<%=basePath%>areaEnergyTmnl/getCodeNameByCode.action?codeValue='+comArr[i].CODE_VALUE,
					          editable:false,
					          valueField:'id',
					          textField:'text'
					      });
	                  }
	              }
	          });
	       }
	       
	      function changeTypeBind(){
	          $('#SE_SUB_TYPE').combobox({
				onChange : function(){
					$('#deviceType').val('3');
					$('#formTable').children().detach();
					queryFormCtrl();
				}
			  });
	      }
	      
	      function loadFormData(){
	          $('#thisform').form('load','<%=basePath%>areaEnergy/queryFormData.action');
	      }
        </script>
	</head>

	<body>
		<form id="thisform" method="post" style="border: 0; width: 100%; height: 100%;">
		    <input type="hidden" id='subsType' name='subsType' value='6'>
		    <input type="hidden" id='deviceType' name='deviceType' value='2'>
			<div class="easyui-panel" title="新增EMS信息" id="pfgd-panel"
				style="border: 0; width: 100%; height: 100%; overflow: auto; background: #fafafa;">
				<table class="form-table" style="width: 100%; height: 100%;">
					<tbody valign="center">
						<tr>
							<td>
								<table id="formTable" width="100%" height='400' cellspacing="8px" cellpadding="0" border="0">
									<tbody>
										
									</tbody>
								</table>
								<!-- 底部按钮区开始  -->
								<div align="center">
									<a id="btn" class="easyui-linkbutton c1"
										style="width: 80px; height: 24px;" onclick="javascript:saveData()">保存</a>
									<a id="btn" class="easyui-linkbutton c1"
										style="width: 80px; height: 24px;" onclick="javascript:removeit()">取消</a>
								</div>
								<!-- 底部按钮区结束  -->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</form>
	</body>
</html>


/**
 * 告警信息配置
 * @author 王梓璇
 * @since 2017-03-04
 */



var  newTitle = '';//新闻标题
var newType = '';//新闻类型
var	aiUrl = '';
var realAiFileName = '';
var aiFileName = '';
function userResize(widths,heights){
	$("#userChart").width($("#userChart").parent().width());
	$("#userChart").height($("#userChart").parent().height());
	if(!!myChart){
		myChart.resize({
		    width: $("#userChart").parent().width(),
		    height: $("#userChart").parent().height()
		});
	}
}

$(function(){
  	queryNews();
});
//查询新闻信息
function queryNews(){
	//新增操作
	$.getJSON(webContextRoot + 'notice/queryCeInfoNews.action',
			{ 
				'ceInfoNews.newsId' : newsId,//新闻id
				'ceInfoNews.newsName' : newTitle,//新闻标题
				'ceInfoNews.newsType' : newType//新闻类型
			},
			function(json){
				
				var listCeInfo = json[0].listCeInfoAttach;//附件list
				if(listCeInfo!=null&&listCeInfo.length>0){
					aiUrl =  webContextRoot + listCeInfo[0].aiUrl;//附件url
					realAiFileName  =  listCeInfo[0].aiFileName;//附件名称
					aiFileName = realAiFileName.length > 16 ? realAiFileName.substr(0,14)+"...":realAiFileName;
					var file = "";
					$.ajax({
						async : false,
						url : webContextRoot + 'notice/judgeFileExist.action',
						data : {downloadFilePath : listCeInfo[0].aiUrl},
						dataType : "json",
						success : function(data) {
							if(data.FLAG == "1"){
								file = '<a id="'+aiUrl+'" href="'+aiUrl+'" target="_blank" class="zdbgFile"  style="width: 120px; height: 30px;" download="'+realAiFileName+'" >'+aiFileName+'</a>';
							}else if(data.FLAG == "2"){
								file = "<a id=\""+aiUrl+"\" href=\"#\" onclick=\"$.messager.alert('提示', '下载的文件不存在！', 'warning');\" class=\"zdbgFile\"  style=\"width: 120px; height: 30px;\">"+aiFileName+"</a>";
							}
						}
					});
				}else{
					aiUrl =  '';
					aiFileName =  '';
				}
				
//				var listCeInfo =json[0].listCeInfoAttach;
//				var aifileName =  listCeInfo[0].aiUrl;
//				aiUrl =  webContextRoot + listCeInfo[0].aiUrl;
//				aiFileName =  listCeInfo[0].aiFileName;

//				file = file.length > 16 ? file.substr(0,14)+"...":file;
				$("#fjmca").html(file);
				
//				var fjmcaUrl = document.getElementById('fjmca');
//				fjmcaUrl.href = aiUrl;//新闻内容赋值
//				fjmcaUrl.innerHTML = '"'+aiUrl+'"';//新闻内容赋值
				
				  var contentArea = document.getElementById('contentArea');
				  contentArea.innerHTML = json[0].content;//新闻内容赋值
				  var newsTitle = document.getElementById('newsTitle');
				  newsTitle.innerHTML = json[0].newsName;//新闻内容赋值
				  var combitTime = document.getElementById('combitTime');
				  combitTime.innerHTML = "发布时间"+json[0].inputTime;//新闻内容赋值
				  
			}
		);
}
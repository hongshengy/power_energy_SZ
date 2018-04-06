//手机端口测试
$(function(){
	var data={
		    "LEN": "96",
		    "USR": "013755",
		    "TID": "352621065248939",
		    "SSN": "3527856",
		    "FUN": "03",
		    "MOD": "02",
		    "PKG": {
				" ORDER_ID ":"1"
		    }
		};

	function showjson(res,level){
		var str='';
		str = beforestr(level);
		var html='';
		html+='{<br/>';
		for(var i in res){
			html+=str + i + " : ";
			if(typeof(res[i])!="object"){
				html +=res[i]+"<br/>";
			}else{
				html += showjson(res[i],level+1)+"<br/>";
			}
		}
		html+= beforestr(level-1) + "}";
		return html;
	}
	function beforestr(level){
		var str='';
		for(var i=0;i<level;i++){
			str +='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		}
		return str;
	}
//JSON.stringify(data)
	$("#test_button").click(function(){
		var data2 = $("#test_request").val();
		$.ajax({	
			url:webContextRoot+'ydjk/responseLogin.action', 
			data:{
//				'data':JSON.stringify(data)
				'data':data2
			},
			dataType:'json',
			type:'post',
			success:function(result){
				var res = '';
				res = result;
				var html=showjson(res,1);
				$("#test_content").html(html);
			},
			error:function(result){
				alert('ajax error');
			}
		});
	});
	
});

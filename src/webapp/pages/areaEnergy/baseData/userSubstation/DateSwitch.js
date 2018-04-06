function dataswitch(a,b,c){
			$.ajax({type:"post", 
			url:basePath+"areaEnergy/dataNowSwitch.action",
			data:{"dataNow":b+c}, 
			dataType:"text", 
			success:function (data) {
				$("#"+a).datebox('setValue',data);
				query(data);
			}
		});
};

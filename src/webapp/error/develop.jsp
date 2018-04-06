<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>�ޱ����ĵ�</title>
<style>
html {overflow:hidden;}
body{ width:100%; height:100%;  overflow:hidden; background-color:#f3f3f3;}
.bg1{background:url(../images/develop.jpg) no-repeat center -60px;}
.bg2{background:url(../images/develop.jpg) no-repeat center 0px;}
</style>
<script>
	function init(){
		var h = window.screen.height;
		if(h > 800){
			document.getElementById('b').className = "bg2";
		}else{
			document.getElementById('b').className = "bg1";
		}
	}
</script>
</head>
<body id="b" onload=init();>

</body>
</html>

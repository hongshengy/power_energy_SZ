<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true" %>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>提示</title>
		<jsp:include page="/pages/common/componentBase.jsp" />
		<jsp:include page="/pages/common/head.jsp" />
		<script type="text/javascript" for="window" event="onload">
		if (parent) {
	        parent.disWaitDisplayForQuery();
		}
        //setDataGridHeight();
        </script>
		<script type="text/javascript">
		MessageBox('<table width="400" height="75" margin-top="-40px"><tr><td><center><img src="/aueic/images/errorSql.png"></center></td></tr>','123',NULL_ICON,'',function(){
			window.history.back();
		});
		</script>
	</head>
	<body>
		
	</body>
</html>
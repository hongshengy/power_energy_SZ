<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript">
	/**测点导出*/
	function exportMp(path,deviceId) {
		document.exportform.target = "dataFrame";
		document.exportform.action = path+"areaEnergy/mpInfoExportExcel.action?deviceId="+deviceId;
		document.exportform.submit();
	}
</script>
<form id='exportform' name='exportform' method="post" style="display:none;">
   <iframe name="dataFrame" id="dataFrame" style="display:none;" frameborder="0" scrolling="no"></iframe>
</form>


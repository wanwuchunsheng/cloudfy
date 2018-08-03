jQuery(document).ready(function() {
   
	$('#impoartSumbit').click(function() {
		var filename = $("#file").val();
		var isvalidate = vlidateExcel(filename);
		var options = {
	               url:contextPath + "/schedule/mgr/import.json",
	               type:"post",
	               dataType:"json",
	               contentType:'application/json;charset=UTF-8',
	               success:function(msg){
	            	   $.Alert(msg);
	            	   $("#myModalImport").modal("hide");
	            	   initDataTable(1);
	               },
				   error:function(msg){
					   $.Alert("导入文件失败");
				   }
	            };
		if(isvalidate){
			$("#typesetting_fileImport").ajaxSubmit(options);
		}else{
			$.Alert('Excel 格式不正确');
		}
		return false;
	});
});

function vlidateExcel(filename){
	if (filename) {
		var reg_xlsx = /[^\.](\.xlsx)$/i;
		if (reg_xlsx.test(filename)) {
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
};
jQuery(document).ready(function() {
	App.init();
	$("select").select2();
});
$.ajaxSetup({
	cache : false
});

//import
$("#btn-upload-excel-file").click(function() {
	var filename = $("#importFile").val();
	//var importType = $("#importType").val();
		$("#importPathName").val(filename);
		if (filename) {
			var reg_xlsx = /[^\.](\.xlsx)$/i;
			if (reg_xlsx.test(filename)) {
				$("#btn-upload-excel-file").attr('disabled', true);
				$("#btn-upload-close").attr('disabled', true);
				$("#btn_download_file").attr('disabled', true);
				var obj = document.getElementById('importFile');
				obj.readOnly = true;
				$("#fileForm").submit();
			} else {
				$.Alert('Excel 格式不正确');
			}
		} else {
			$.Alert("请选择导入文件");
		}
});

//ajax
$("#fileForm").ajaxForm({
	type : "post",
	timeout : 180000,
	dataType : "json",
	success : function(msg) {
		enableBtn();
		if (msg && msg[1]) {
			$.Alert(msg[1]);
		}
	},
	error : function(msg) {
		if (msg && msg[1]) {
			$.Alert(msg[1]);
		}
	}
});

// 启用按钮
function enableBtn() {
	$("#btn-upload-close").attr('disabled', false); 
	$("#btn-upload-excel-file").attr('disabled', false);
	$("#btn_download_file").attr('disabled', false);
	$("#importPathName").val("");
	var obj = document.getElementById('importFile');
	obj.readOnly = false;
	obj.outerHTML = obj.outerHTML;
}

// 清空
$("#btn-upload-close").click(function() {
	$("#importPathName").val("");
	var obj = document.getElementById('importFile');
	obj.readOnly = false;
	obj.outerHTML = obj.outerHTML;
});

// 路径
function onchangeFile(obj) {
	$("#importPathName").val(obj.value);
}
// 下载
$("#btn_download_file").click(function() {
	var importType = $("#importType").val();
	//if (importType != '4') {
		var url = 'download.json?importType=' + importType;
		window.location.href = url;
	//} else {
	//	$.Alert("导入模板需求正在确认......");
	//}
});

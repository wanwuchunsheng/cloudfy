/*
	$.Alert('xxxxxx');
	$.Confirm('xxxx','',function(){
		console.info(2222);
	});
*/
// alert编写
jQuery.Alert = function(message, imageUrl, fn) {
	var page_content = $(document.body);// $("div[class = 'page-content']");
	var alertMessage = '确定要关闭吗？ ';
	var imageTag = '';
	var fn = ($.isFunction(fn)&&fn)?fn:$.noop;//add by lwf  是否传入回调函数 并且是否为函数形式
	if (message) {
		alertMessage = message;
	}
	if (imageUrl) {
		imageTag = "<img src='" + imageUrl + "' />";
	}
	var content = '<div id="alert_Modal" class="modal fade" aria-hidden="true" role="basic" tabindex="-1" style="display: none;z-index:100001!important;"><div class="modal-dialog modal-dialog-marTop" style="width: 300px;margin-top:180px;"><div class="modal-content"><div class="modal-header">	<button class="close" aria-hidden="true" onclick="$.Alert.destoryAlert()" type="button"></button><h4 class="modal-title" style="text-align:left;">提示</h4></div><div class="modal-body"> '
			+ imageTag
			+ alertMessage
			+ '</div><div class="modal-footer"><button class="btn blue" type="button" onclick="$.Alert.destoryAlert()">确定</button></div></div></div></div>';
	// 添加alert弹出框
	var alert_Modal = [];
	function addAlert() {
		page_content.append(content);
		var alert_Modal_Interval = window.setInterval(function() {
			alert_Modal = $('#alert_Modal');
			if (alert_Modal.length > 0) {
				alert_Modal.modal({
					backdrop : 'static',
					keyboard : false
				});
				alert_Modal.on('hidden.bs.modal', function(e) {
					alert_Modal.remove();
					fn.call(this);
				});
				alert_Modal.modal("show");
				clearInterval(alert_Modal_Interval);
			}
		}, 50);
	}

	addAlert();
};
// 销毁alert弹出框
jQuery.Alert.destoryAlert = function() {
	$('#alert_Modal').modal('hide');
};

// confirm编写
jQuery.Confirm = function(message, imageUrl, fn) {
	var page_content = $(document.body);// $("div[class = 'page-content']");
	var alertMessage = '确定要操作吗？ ';
	var r;
	var imageTag = '';	
	var fn = ($.isFunction(fn)&&fn)?fn:$.noop;//add by wjl  是否传入回调函数 并且是否为函数形式
	if (message) {
		alertMessage = message;
	}
	if (imageUrl) {
		imageTag = "<img src='" + imageUrl + "' />";
	}
	var content = '<div id="confirm_Modal" class="modal fade" aria-hidden="true" role="basic" tabindex="-1" style="display: none;z-index:100001!important;"><div class="modal-dialog" style="width: 300px;margin-top:140px;"><div class="modal-content"><div class="modal-header">	<h4 class="modal-title" style="text-align:left;">提示</h4></div><div class="modal-body"> '
			+ imageTag
			+ alertMessage
			+ '</div><div class="modal-footer"><button class="btn blue" data-dismiss="modal" id="okDopConfirmButton" type="button">确定</button><button class="btn default" type="button" id="destoryDopConfirmButton">取消</button></div></div></div></div>';
	// 添加confirm弹出框
	var Confirm_Modal = [];
	function addConfirm() {
		page_content.append(content);
		var confirm_Modal_Interval = window.setInterval(function() {
			Confirm_Modal = $('#confirm_Modal');
			if (Confirm_Modal.length > 0) {
				Confirm_Modal.modal({
					backdrop : 'static',
					keyboard : false
				});
				Confirm_Modal.on('hidden.bs.modal', function(e) {
					Confirm_Modal.remove();
				});
				Confirm_Modal.modal("show");

				$("#destoryDopConfirmButton").bind("click", function() {
					$.Confirm.destoryConfirm();   //取消的时候不需要回调
					//fn.call(this);                                 
				});
				$("#okDopConfirmButton").bind("click", function() {
					fn.call(this);									
				});
				clearInterval(confirm_Modal_Interval);
			}
		}, 50);

	}

	addConfirm();
};
// 销毁confirm弹出框
jQuery.Confirm.destoryConfirm = function() {
	$('#confirm_Modal').modal('hide');
};

// errAlert编写
jQuery.Err = function(message, imageUrl) {
	var page_content = $(document.body);// $("div[class = 'page-content']");
	var alertMessage = '关闭 ';
	var imageTag = '';
	if (message) {
		alertMessage = message;
	}
	if (imageUrl) {
		imageTag = "<img src='" + imageUrl + "' />";
	}
	var content = '<div id="err_Modal" class="modal fade" aria-hidden="true" role="basic" tabindex="-1" style="display: none;"><div class="modal-dialog" style="width: 400px;margin-top:180px;"><div class="modal-content"><div class="modal-header">	<button class="close" aria-hidden="true" onclick="jQuery.Err.destoryAlert()" type="button"></button><h4 class="modal-title" style="text-align:left;">异常信息</h4></div><div class="modal-body"> '
			+ imageTag
			+ '<div  style="resize:none; border:1px solid #CCC;width:338px;margin-bottom:-20px; height:180px; overflow:auto">'
			+ alertMessage
			+ '</div>'
			+ '</div><div class="modal-footer"><button class="btn blue" type="button" onclick="jQuery.Err.destoryAlert()">确定</button></div></div></div></div>';
	// 添加alert弹出框
	var err_Modal = [];
	function addAlert() {
		page_content.append(content);
		var alert_Modal_Interval = window.setInterval(function() {
			err_Modal = $('#err_Modal');
			if (err_Modal.length > 0) {
				err_Modal.modal({
					backdrop : 'static',
					keyboard : false
				});
				err_Modal.on('hidden.bs.modal', function(e) {
					err_Modal.remove();
				});
				err_Modal.modal("show");
				clearInterval(alert_Modal_Interval);
			}
		}, 50);
	}

	addAlert();
};
// 销毁ErrAlert弹出框
jQuery.Err.destoryAlert = function() {
	 $('#err_Modal').modal("hide");
};

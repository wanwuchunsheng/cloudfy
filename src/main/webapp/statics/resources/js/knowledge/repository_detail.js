jQuery(document).ready(function() {
	App.init();
	if (relationId == '') {
		$.Err("数据已经过期,请稍候重试!");
	}
	
	if (isExist == '1') {
		$("#submit_btn").html('取消收藏');
	} else {
		$("#submit_btn").html('收藏');
	}
	$("#submit_btn").click(function() {
		$.ajax({
			url : contextPath + '/knowledge/collections/' + (isExist == '1' ? "cancelFavorite.json" : "favorite.json"),
			data : {
				"relationId" : relationId
			},
			dataType : 'json',
			type : 'post',
			success : function(data) {
				if (data) {
					if (data.code) {
						if (isExist == '1') {
							$("#submit_btn").html('收藏');
							isExist = '0';
							window.location.reload();
						} else {
							$("#submit_btn").html('取消收藏');
							isExist = '1';
							window.location.reload();
						}
					} else {
						$.Alert(data.message);
					}
				} else {
					$.Alert('网络异常，请稍候再试');
				}
			}
		});
		return false;
	});
	
	
	$('#backHistory').click(function() {
		var back_page = $('#back_page').val();
		location.href = contextPath + "/knowledge/back.htm?backNodeId=" + (typeId == ''?1:typeId)+"&back="+back_page;
		return false;
	});
});




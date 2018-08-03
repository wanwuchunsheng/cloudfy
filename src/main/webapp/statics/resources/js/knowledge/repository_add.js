admin = {};
jQuery(document).ready(function() {
	App.init();
	$('#saveButton').click(function(){
		var kbFileDesc = CKEDITOR.instances.kbFileDesc.getData();
		if ( $.trim($('#kbFileStrname').val()) == '' ) {
			$.Err('请输入知识库文章标题');
			return false;
		} else if ( $.trim($('#typeList').val()) == '' ) {
			$.Err('请输入知识库类型');
			return false;
		} else if ( $.trim($('#kbFileEndTime').val()) == '' ) {
			$.Err('请输入知识库文章有效时间');
			return false;
		} else if ( $.trim(kbFileDesc) == '' ) {
			$.Err('请输入知识库文章内容');
			return false;
		} else {
			$.ajax({
		       url: contextPath + "/knowledge/create.json",
		       type: "post",
		       dataType: "json",
		       data: {
		    	  "kbFileTypeId": $("#typeList option:selected").val(),
		    	  "kbFileStrname":$("#kbFileStrname").val(),
		    	  "kbFileDesc":kbFileDesc,
		    	  "kbFileEndTime":$("#kbFileEndTime").val()
		       },
		       success: function(data) {
					if (data) {
					 	if (data.code) {
					 		location.href = contextPath + "/knowledge/mgr/list.htm";
					 	} else {
					 		$.Err(data.message);
					 	}
					}
		       }
			});
		};
		
	});
});
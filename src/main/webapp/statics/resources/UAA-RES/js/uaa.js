function refreshCacheFunc(redirctUrl) {
	var result;
	$.ajax({
		url : 'refreshUaaCache.json',
		type : 'post',
		async : false,
		dataType : 'json',
		success : function(data) {
			result = data.status;
			if (result == 'success') {
				alert("缓存已经刷新！");
				location.replace(redirctUrl);
			}
		}
	});
}
function DelFunc(delUrl) {
	var ret;
	ret = confirm("确实要删除该条记录吗? ");
	if (ret == true) {
		location.replace(delUrl);
	} else {
		return;
	}
}
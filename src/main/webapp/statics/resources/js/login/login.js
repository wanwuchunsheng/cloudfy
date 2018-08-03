jQuery(document).ready(function() {
	App.init(); // initlayout and core plugins
    Login.init();
    
    //用户名输入框失去焦点时的提示
	$('#login_btn').click(function() {
		$('#userNameGroup').removeClass('has-error');
		$('#passwordGroup').removeClass('has-error');
		$('#allErr').hide();
		$('#usernameErr').hide();
		$('#passwordErr').hide();
		
		if ($.trim($('#username').val()) === '') {
			$('#allErr span').html('用户名密码错误');
			$('#allErr').show();
			$('#usernameErr').html('用户名为空').show();
			$('#userNameGroup').addClass('has-error');
		} else if ($.trim($('#password').val()) === '') {
			$('#passwordGroup').addClass('has-error');
			$('#allErr span').html('用户名密码错误');
			$('#allErr').show();
			$('#passwordErr').html('密码为空').show();
		}  else {
			$('#loginForm')[0].submit();
		}
		return false;
	});
});
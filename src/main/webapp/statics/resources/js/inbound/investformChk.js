/*表单验证*/
function validationChk() {
	   // 手机号码验证       
	   jQuery.validator.addMethod("isMobile", function(value, element) {       
	     var length = value.length;   
	     var mobile = /^(((13[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(15[0-9]{1}))+\d{8})$/;   
	     return this.optional(element) || (length == 11 && mobile.test(value));       
	   }, "请正确填写手机号码");   
	   jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {       
	     var length = value.length;       
	     for(var i = 0; i < value.length; i++){       
	         if(value.charCodeAt(i) > 127){       
	         length++;       
	         }       
	     }       
	     return this.optional(element) || ( length >= param[0] && length <= param[1] );       
	   }, "客户姓名必须在3-15个字符之间(一个中文字算2个字符)");
	   
	   jQuery.validator.addMethod("stringCheck", function(value, element) {       
		   return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
		 }, "客户姓名只能包括中文字、英文字母、数字和下划线");  
	   
	var form1 = $('#custInvestSaveForm');
	form1.validate({
		errorElement : 'span', 
		errorClass : 'help-block',
		focusInvalid : false,
		ignore : "",
		rules : {
			"invest.custName" : {
				required : true,
				byteRangeLength:[3,15],
				stringCheck:true
			},
			"invest.sexMf" : {
				required : true
			},
			"invest.age" : {
				required : true
			},
			"invest.intentcarseries" : {
				required : true
			},
			"invest.intentcarcolor" : {
				required : true
			},
			"invest.intentcarmodels" : {
				required : true
			}
		},
		highlight : function(element) { 
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight : function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorPlacement:function(error,element){
			$(element).parent().append(error);
		},
		submitHandler : function(form) {
			saveInvest();
		}
	});
}



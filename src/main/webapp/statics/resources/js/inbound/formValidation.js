   //TableManaged({"id" : "sample_1"}).init();
   // 手机号码验证       
   jQuery.validator.addMethod("isMobile", function(value, element) {       
     var length = value.length;   
     var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(15[0-9]{1}))+\d{8})$/;   
     return this.optional(element) || (length == 11 && mobile.test(value));       
   }, "请正确填写手机号码");  
/*IB表单验证*/
function validationForm() {
	   //TableManaged({"id" : "sample_1"}).init(); 
	//用户投诉form表单验证
	var form1 = $('#complain_form');
	form1.validate({
		errorElement : 'span', //default input error message container
		errorClass : 'help-block', // default input error message class
		focusInvalid : false, // do not focus the last invalid input
		ignore : "",
		rules : {
			"complain.sponsorName" : {
				minlength : 2,
				required : true
			},
			"complain.sponsorPhone" : {
				required : true,
				number:true
			},
			"complain.complainContent" : {
				required : true
			},
			"complain.complainType":{
				required:true
			}
		},
		highlight : function(element) { // hightlight error inputs
			$(element).closest('.form-group').addClass('has-error'); // set error class to the control group
		},
		unhighlight : function(element) { //revert the change done by hightlight
			$(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
		},
		submitHandler : function(form) {
			doComplain();
		}
	});

	//会员信息修改保存
	var modifyClubForm = $('#modifyClubForm');
	modifyClubForm.validate({
		errorElement : 'span',
		errorClass : 'help-block',
		focusInvalid : false,
		ignore : "",
		rules : {
			"customer.cellPhNum" : {
				minlength : 11,
				maxlength : 11,
				required : true
			},
			"customer.pinyin" : {
				minlength : 2,
				maxlength : 20,
				required : true
			},
			"customer.zipCd" : {
				minlength : 5,
				maxlength : 10,
				required : true
			},
			"customer.addr" : {
				minlength : 2,
				maxlength : 120,
				required : true
			},
		},
		highlight : function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},

		unhighlight : function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		submitHandler : function(form) {
			club_infoModify_save();
		}
	});
	
	//试乘试驾
	var driveForm = $('#form_drivetest');
	driveForm.validate({
		errorElement : 'span', //default input error message container
		errorClass : 'help-block', // default input error message class
		focusInvalid : false, // do not focus the last invalid input
		ignore : "",
		rules : {
			"experience.custName" : {
				required : true
			},
			"experience.custGender" : {
				required : true
			},
			"experience.custPhone" : {
				required : true,
				isMobile:true
			},
			"experience.intendPurchaseTime" : {
				required : true
			},
			"experience.intentcarseries" : {
				required : true
			},
			"experience.intentcarmodels" : {
				required : true
			},
			"experience.state" : {
				required : true
			},
			"txt_driveDealer" : {
				required : true
			},
			"experience.customerRequirement":{
				required:true
			}
		},
		highlight : function(element) { // hightlight error inputs
			$(element).closest('.form-group').addClass('has-error'); // set error class to the control group
		},

		unhighlight : function(element) { //revert the change done by hightlight
			$(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
		},
		errorPlacement:function(error,element){
			$(element).parent().append(error);
		},
		submitHandler : function(form) {
			saveDriveTest();
		}
	});

	//新车主推荐
	var recommendForm = $('#form_recommend');
	recommendForm.validate({
		errorElement : 'span', //default input error message container
		errorClass : 'help-block', // default input error message class
		focusInvalid : false, // do not focus the last invalid input
		ignore : "",
		rules : {
			"recommend.recName" : {
				required : true
			},
			"recommend.recGender" : {
				required : true
			},
			"recommend.recPhone" : {
				required : true,
				isMobile:true
			},
			"recommend.intendPurchaseTime" : {
				required : true
			},
			"recommend.intentcarseries" : {
				required : true
			},
			"recommend.intentcarmodels" : {
				required : true
			},
			"recommend.state" : {
				required : true
			},
			"txt_recommendDealer" : {
				required : true
			}
		},
		highlight : function(element) { // hightlight error inputs
			$(element).closest('.form-group').addClass('has-error'); // set error class to the control group
		},

		unhighlight : function(element) { //revert the change done by hightlight
			$(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
		},
		errorPlacement:function(error,element){
			$(element).parent().append(error);
		},
		submitHandler : function(form) {
			saveRecommend();
		}
	});
	//用户建议
	var suggestionForm = $('#form_suggestion');
	suggestionForm.validate({
		errorElement : 'span', //default input error message container
		errorClass : 'help-block', // default input error message class
		focusInvalid : false, // do not focus the last invalid input
		ignore : "",
		rules : {
			"suggestion.remark" : {
				required : true
			}
		},
		highlight : function(element) { // hightlight error inputs
			$(element).closest('.form-group').addClass('has-error'); // set error class to the control group
		},

		unhighlight : function(element) { //revert the change done by hightlight
			$(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
		},
		submitHandler : function(form) {
			saveSuggestion();
		}
	});
	//会员咨询/客户咨询
	var custConsultingForm = $('#custConsultingForm');
	custConsultingForm.validate({
		errorElement : 'span', //default input error message container
		errorClass : 'help-block', // default input error message class
		focusInvalid : false, // do not focus the last invalid input
		ignore : "",
		rules : {
			"consulting.sponsorName" : {
				required : true
			},
			"consulting.sponsorPhone" : {
				required : true,
				number: true
			},
			"consulting.consultingTypeCode" : {
				required : true
			}
		},
		highlight : function(element) { // hightlight error inputs
			$(element).closest('.form-group').addClass('has-error'); // set error class to the control group
		},

		unhighlight : function(element) { //revert the change done by hightlight
			$(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
		},
		errorPlacement:function(error,element){
			$(element).parent().append(error);
		},
		submitHandler : function(form) {
			if($("#workSheetNo").attr("checked")){
				if($("#problemDesc").val()==null || $("#problemDesc").val()==''){
					$.Alert('新问题的问题描述必填');
					return;
				}
			}
			
			saveConsulting();
		}
	});
}



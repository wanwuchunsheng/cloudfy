
/*表单验证*/
function validationForm() {
	var form1 = $('#saveSaleLeadsForm');
	form1.validate({
		errorElement : 'span', 
		errorClass : 'help-block',
		focusInvalid : false,
		ignore : "",
		rules : {
			"name" : {
				required : true,
				byteRangeLength:[3,15],
				stringCheck:true
			},
			"mobilephone" : {
				required : true,
				isMobile:true
			},
			"brand":{
				required:true
			},
			"customerrequirement":{
				required:true
			},
			"obtainchannel":{
				required:true
			},
			"channelCode":{
				required:true
			},
			"cccleadvalidation":{
				required:true
			},
			"cccleadfstfollowup":{
				required:true
			},
			"campaigncode":{
				required:true
			}
		},
		highlight : function(element) { 
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight : function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		submitHandler : function(form) {
			saveSaleLeads();
		}
	});
}
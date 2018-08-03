
var ebusiness = {
    
    init:function(formId){
    	ebusiness.submitForm(formId);
    	ebusiness.submitAndNewForm(formId);
    },
    
    submitForm : function(formId){
    	$("#btnSubmit").click(function(){
            var flag = ebusiness.vlidateForm();
            if(flag){
            	var form = $("#"+formId);
            	if(form){
            		form.submit();
            	}
            }
         });
    },
    
    submitAndNewForm:function(formId){
		$("#btnSubmit2").on("click",function(){
			var flag = ebusiness.vlidateForm();
			if(flag){
				$("#forWardUrl").val(4);
				ebusiness.doforinbound();
				var form = $("#"+formId);
            	if(form){
            		form.submit();
            	}
			}});
    },
    
	vlidateForm : function() {
		if ($("#reMark").val() != "" && $("#reMark").val().length > 200) {
			$.Alert("备注长度不能大于200个汉字");
			return false;
		}

		if ($("#callResult").val() == 3) {
			if ($("#reservationTime").val() == "") {
				$.Alert("预约下次时间必选。");
				return false;
			}
			showQue();
		}

		if ($("#callResult").val() == 1) {
			showQue();
			var key_yes = $("#key_yes");
			var key_no = $("#key_no");
			var keyflag = 0;
			if (key_yes.length > 0 && key_yes.is(":checked")) {
				$("#questionnaireValue").val("1");
				keyflag = 1;
			}

			if (key_no.length > 0 && key_no.is(":checked")) {
				$("#questionnaireValue").val("2");
				keyflag = 1;
			}
			
			if (keyflag == 0) {
				if(getResultAnswer()){
					return true;
				}
				$.Alert("通话结果选项错误");
				return false;
			}
		}
		return true;
	},
	
	doforinbound:function(){
    	var brands = $("#brand").val();
    	if (1==brands){
    	brands="别克";
    	}
    	if (2==brands){
    	brands="雪佛兰";
    	}
    	if (3==brands){
    	brands="凯迪拉克";
    	}
      gl.setCurCust($.extend(gl.getCurCust(),{brand:brands,subInstId:$("#subinstId").val(),memberId:$("#memId").val(),custId: $("#custId").val()}));
  }
}


//v
function getResultAnswer(){
	var rel = $(".questionnaire-radio-listhre>a[name='2.2']").attr("id");
	var rid=$("#name"+rel+" input[type='radio']");
	for (var v = 0; v < rid.length; v++) {
		if (rid[v].checked == true) { 
			//获得选中的答案   A，B
			var val=$(rid[v]).val();
			var check1=val.indexOf("不");
			var check2=val.indexOf("否");
			if(check1!=-1 || check2!=-1){ //选中了B，否
				$("#questionnaireValue").val("1");
				return true;
			}
		}
	}
	return false;
}


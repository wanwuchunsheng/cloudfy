var ebusiness = {

	init : function(formId) {
		ebusiness.submitForm(formId);
		ebusiness.submitAndNewForm(formId);
	},

	submitForm : function(formId) {
		$("#btnSubmit").click(function() {
			var flag = ebusiness.vlidateForm();
			if (flag) {
				var form = $("#" + formId);
				if (form) {

					form.submit();
				}
			}
		});
	},

	submitAndNewForm : function(formId) {
		$("#btnSubmit2").on("click", function() {
			var flag = ebusiness.vlidateForm();
			if (flag) {
				$("#forWardUrl").val(4);
				ebusiness.doforinbound();
				var form = $("#" + formId);
				if (form) {
					form.submit();
				}
			}
		});
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

		if ($("#callResult").val() == 1) {//验证成功
			showQue();

			var keyflag = $("#questionnaireValue").val();
			if (keyflag == 0) {
				$.Alert("通话结果选项错误");
				return false;
			}
			if (keyflag == 1) {
				var code = $("#leadsCode").val();
				// 车展和调研,车主，CPL和线下
				if (code != '400250030' && code != '400250017' && code != '400250027' && code !='400250032' && code !='400250033' && code !='400250022')
					{
					// 手机号码
					var queMobilePhone = $(
							".questionnaire-radio-listhre input[name='queMobilePhone']")
							.val();
					
					// 客户名称
					var queCustName = $(
							".questionnaire-radio-listhre input[name='queCustName']")
							.val();
					
					// 经销商
					var queDealername = $(
							".questionnaire-radio-listhre input[name='queDealername']")
							.val();
					// 车系
					var queIntentCarSeries = $(
							".questionnaire-radio-listhre select[name='queIntentCarSeries']")
							.text();
					
					// 购车时间
					var len = $(".questionnaire-radio-listhre input[name='quePurchasingwindow']");

					var quePurchasingwindow = "";
					for ( var i = 0; i < len.length; i++) {
						if (len.eq(i).is(":checked")){
							quePurchasingwindow = len.eq(i).val();
						}
					}
					if(quePurchasingwindow!=""){
				    var queflag = quePurchasingwindow.indexOf(".");
						if(queflag>=0){
							var array = quePurchasingwindow.split(".");
							quePurchasingwindow=array[1];
				         }
					}
					if (quePurchasingwindow == null
							|| quePurchasingwindow == "undefined"
							|| quePurchasingwindow == "") {
						$.Alert("购车时间不能为空！");
						return false;
					}
					if ( queIntentCarSeries == "") {
						$.Alert("车系不能为空！");
						return false;
					}
					
					if (queDealername == null
							|| queDealername == "undefined"
							|| queDealername == "") {
						$.Alert("经销商不能为空！");
						return false;
					}
					if (queCustName == null
							|| queCustName == "undefined"
							|| queCustName == "") {
						$.Alert("客户名不能为空！");
						return false;
					}
					if (queMobilePhone == null
							|| queMobilePhone == "undefined"
							|| queMobilePhone == "") {
						$.Alert("手机号不能为空！");
						return false;
					}
				}
				return true;
			}
			
		}
		return true;
	},

	doforinbound : function() {
		var brands = $("#brand").val();
		if (1 == brands) {
			brands = "别克";
		}
		if (2 == brands) {
			brands = "雪佛兰";
		}
		if (3 == brands) {
			brands = "凯迪拉克";
		}
		gl.setCurCust($.extend(gl.getCurCust(), {
			brand : brands,
			subInstId : $("#subinstId").val(),
			memberId : $("#memId").val(),
			custId : $("#custId").val()
		}));
	}

};


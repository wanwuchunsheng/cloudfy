$(document).ready(function(){
	//联动日历
	   $('.date-picker').datepicker({
	        language:"zh-CN",
	        rtl: App.isRTL(),
	        autoclose: true,
	        format:"yyyy-mm-dd"
	   });
	   if(gl.getCurCust().userId!=null && gl.getCurCust().userId!="null"){
			$("#cust_custid").val(gl.getCurCust().userId);			
	   } 
	   if(gl.getCurCust().callNo!=null && gl.getCurCust().callNo!="null"){
		   $("#cust_fixedphone").val(gl.getCurCust().callNo);	
       }
	   if(gl.getCurCust().name!=null && gl.getCurCust().name!="null"){
			$("#cust_name").val(gl.getCurCust().name);
	   } 
	   if(gl.getCurCust().custMobileNum!=null && gl.getCurCust().custMobileNum!="null"){ 
			$("#cust_callNo").val(gl.getCurCust().custMobileNum);
	   }
	   if(gl.getCurCust().zipCode!=null && gl.getCurCust().zipCode!="null"){
			$("#cust_postalcode").val(gl.getCurCust().zipCode);
	   }
	   if(gl.getCurCust().sexualty!=null && gl.getCurCust().sexualty!="null"){
		    if(gl.getCurCust().sexualty=="男"){
		    	$("#gender").val(1);
		    }else if(gl.getCurCust().sexualty=="女"){
               $("#gender").val(2);
            }else if(gl.getCurCust().sexualty=="未知"){
               $("#gender").val(3);
            }else{
		    	$("#gender").val(3);
            }
	   } 
	initCarBrandsType("selSaleLeadsBrand");
	initServiceRequestType("sel_SalesRequestType",'201');
	 //品牌,车系,车型
    changeBrandCheck("");
    $("select").select2();
    //省
    initProvince('driver_state',true);
    $("#driver_state").select2();
    $("#driver_state").on("change",function(){
    	//市
    	initCity('driver_city',$("#driver_state").val(),true);
    	$("#driver_city").select2();
    });
    validationForm();
});
//品牌
function changeBrandCheck(obj){
	//车系
	inbound_carmodel.getCarSeries("intent_intentcarseries",obj.value); 
	$("#txt_driveDealer").val('');
	inbound_carmodel.getCarModels("intent_intentcarmodels",$("#intent_intentcarseries").val());
}
//选择经销商
$("#btn_drive_dealer_select").on("click",function(){
	selectDealer();
});
/*打开经销商选择*/
function selectDealer(){
    var brand=$("#selSaleLeadsBrand").val();
    if(brand==""||brand==null){
    	 $.Alert('请选择意向品牌');
         return;
    }
     var state;
     var city;
         if($("#driver_state").val()!=null &&  $("#driver_state").val()!=''){
             state=$("#driver_state option:selected").val();
             city=$("#driver_city option:selected").val();
         }
    var _url=contextPath+"/inbound/queryDealer.json?r="+Math.random();
    var paraJson={"brand":brand,"state":state,"city":city};
     var createAjax = $("#myModalrw");
     createAjax.empty();
     //createAjax.('<img src="${resRoot}assets/img/ajax-modal-loading.gif" alt="" class="loading">');
      createAjax.modal({
             backdrop:'static',
             keyboard:false
         });
      createAjax.modal("show");
      createAjax.load(_url,paraJson, function(data) {
             
      });
}
/*经销商选择页面回调函数*/
function dealerCallback(val,text){
     $("#txt_driveDealer").val(text);
     $("#driveDealerCode").val(val);
}
function validationForm() {
	   //TableManaged({"id" : "sample_1"}).init(); 
	//用户投诉form表单验证
	var form1 = $('#saveSaleLeadsForm');
	form1.validate({
		errorElement : 'span', //default input error message container
		errorClass : 'help-block', // default input error message class
		focusInvalid : false, // do not focus the last invalid input
		ignore : "",
		rules : {
			"gender" : {
				required : true
			},
			"name" : {
				required : true
			},
			"type" : {
				required : true
			},
			"brand":{
				required:true
			},
			"intentcarseries":{
				required:true
			},
			"txt_driveDealer":{
				required:true
			},
			"mobilephone":{
				required:true,
				digits:true
			}
		},
		highlight : function(element) { // hightlight error inputs
			$(element).closest('.form-group').addClass('has-error'); // set error class to the control group
		},
		unhighlight : function(element) { //revert the change done by hightlight
			$(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
		},
		submitHandler : function(form) {
			saveSaleLeads();
		}
	});
}
	
function saveSaleLeads(){
    $("#intent_intentcarseriesname").val($("#intent_intentcarseries option:selected").text());
    $("#save_sale_leads").attr("disabled",true);
    $.ajax({
        url:contextPath + "/workbench/saleleads/saveSaleLeads.json",
        dataType:"json",
        data:$("#saveSaleLeadsForm").serialize(),
        type:"post",
        success:function(data){
            $.Alert(data.MESSAGE);
            //$("#save_sale_leads").removeAttr("disabled");
        },
        error:function(data){
            $("#save_sale_leads").removeAttr("disabled");
            $.Alert(data.MESSAGE);
        }
    });

}
//保存
$("#save_sale_leads").click(function(){
	$('#saveSaleLeadsForm').submit();
});
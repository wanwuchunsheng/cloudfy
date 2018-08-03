//CCC客户咨询
$(function(){
		//客户咨询
        $("#cust_Consulting").on("click",function(){
        	//(客户咨询)初始化咨询类别
			initConsultingType();
	       	 $("#consultingName").val(customerInfo.ownerName);
	       	 $("#consultingPhone").val(customerInfo.cellPhNum);
	       	 //客户调研-仅限别克
	         if(1==$("#brand").val()){
	        	 $(".custInvestDivtxt").show(); 
	         }else{
	        	 $(".custInvestDivtxt").hide(); 
	         } 
        });
		//咨询类别邦定change事件
		$("#consultingType1").change(function() {
			initSubConsultingType($(this));
		});
		//保存客户咨询信息
        $("#saveConsulting").on("click",function(){
        	//(客户咨询)初始化咨询类别
        	saveConsulting();
        });	
        //客户调研
        $("#addInvest").on("click",function(){
        	toCustInvest();
        });	
});



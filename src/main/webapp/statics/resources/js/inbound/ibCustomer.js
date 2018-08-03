$(document).ready(function(){
	$(".client-add").show();
	$(".client-name").show();
	$(".client-sexMf").show();
	$(".reg-phone").show();
	$(".member-cardid").hide();
	$(".card-type").hide();
	$(".card-num").hide();
	if(gl.getCurCust().callNo!=null && gl.getCurCust().callNo!="null"){
		$("#cellPhNum").val(gl.getCurCust().callNo);
	}
	if($('#cardNum').val()!="" || $('#cellPhNum').val()!="" || $('#idNum').val()!=""){
		showCustomer();
	}	
});

$("#btnSubmit").click(function(){
	if($('#sexMf1').val()==""){
    	$.Alert('客户性别不能为空!');
        return false;
	}else{
		var addData=$("#saveCustomerForm").serialize();
	 	$.ajax({ 
	        url : 'customerEdit.json', 
	        type : 'POST',
	        dataType:'json', 
	        async:true,
	        data : addData, 
	        success : function(data){ 
	        	$.Alert(data.MESSAGE);
	        	admin.dataTable.fnDraw();
	        }
	     });
	}	
});

function changeCustomerCheck(a){
   	var val = a.value;
    $('#name').val("");
	$('#sexMf').val("");
	$('#cardNum').val("");
	$('#idType').val("");
	$('#idNum').val("");
   	if(val == "400290002"){
   		$(".show-user-info").hide();
   		$(".client-add").hide();
   		$(".reg-phone").show();
   		$(".client-name").hide();
   		$(".client-sexMf").hide();   		
   		$(".member-cardid").hide();
   		$(".card-type").hide();
   		$(".card-num").hide();
   	} else if(val == "400290003"){
   		$(".show-user-info").hide();
   		$(".client-add").hide();
   		$(".reg-phone").show();
   		$(".client-name").hide();
   		$(".client-sexMf").hide();
   		$(".member-cardid").hide();
   		$(".card-type").show();
   		$(".card-num").show();
   	} else if(val == "" || val == "400290001"){
   		$(".show-user-info").hide();
   		$(".client-add").show();
   		$(".client-name").show();
   		$(".client-sexMf").show();
   		$(".reg-phone").show();
   		$(".member-cardid").hide();
   		$(".card-type").hide();
   		$(".card-num").hide();
   	} else {
   		$(".show-user-info").hide();
   		$(".client-add").hide();
   		$(".client-name").hide();
   		$(".client-sexMf").hide();
   		$(".reg-phone").show();
   		$(".member-cardid").show();
   		$(".card-type").show();
   		$(".card-num").show();
   	}
   };
   
   $("#customer_submit_add").click(function(){
	    var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(15[0-9]{1}))+\d{8})$/;   
	    if($('#cellPhNum').val()=="")
		{
	    	$.Alert('注册手机有误,请重新输入!');
			return false;
		}else if($('#cellPhNum').val()!=""){
			if((isNaN($('#cellPhNum').val()))||(!mobile.test($('#cellPhNum').val()))){
				$.Alert('注册手机有误,请重新输入!');
				return false;
			}else{
				var addData="cellPhNum="+$('#cellPhNum').val();
			 	$.ajax({ 
			        url : 'showCustomerCount.json', 
			        type : 'POST',
			        dataType:'json', 
			        async:true,
			        data : addData, 
			        success : function(data){		        	
			        	if(data.CUSTOMERCOUNT>0){
			        		$.Alert('注册手机已经存在!');
			    	        return false;
			        	}else{
			        		if($('#name').val()==""){
			        			$.Alert('客户姓名不能为空!');
			        	        return false;
			        		}else if($('#sexMf').val()==""){
			        	    	$.Alert('客户性别不能为空!');
			        	        return false;
			        		}else{
			        			var re = /^[\u0391-\uFFE5A-Za-z]+$/;
			        			if(($('#name').val()).match( /^[\u4E00-\u9FA5a-zA-Z0-9_]{3,20}$/) || re.test($('#name').val())){
			        				var brand=0;
			        				if(gl.getCurOp().brand!=null && gl.getCurOp().brand!="null"){
			        					brand=gl.getCurOp().brand;
			        				}
			        				var addData=$("#customerForm").serialize()+"&"+"brand="+brand;
				        		 	$.ajax({ 
				        		        url : 'customerAdd.json', 
				        		        type : 'POST',
				        		        dataType:'json', 
				        		        async:true,
				        		        data : addData, 
				        		        success : function(data){ 
				        		        	$.Alert(data.MESSAGE);
				        		     } 
				        		     });
			        			}else{
			        				$.Alert('客户姓名有误,请重新输入!');
				        	        return false;
			        			}
			        			
			        		}
			        	}
			        }
			     });	
			}		
		}    		
	});

   admin={};
   $("#customer_submit_button").click(function(){
   	if($('#cardNum').val()!="" || $('#cellPhNum').val()!="" || $('#idNum').val()!=""){
   		showCustomer();		
   	}else{
   		var val = $('#custType').val();
   	   	if(val == "400290002"){   
   	   		$(".show-user-info").hide();
   	   		$.Alert('注册手机不能为空!');
   	   	} else if(val == "400290003"){
   	   		$(".show-user-info").hide();
   	   		$.Alert('注册手机、证件号码不能同时为空!');
   	   	} else if(val == "" || val == "400290001"){
   	   		$(".show-user-info").hide();
   	   		$.Alert('注册手机不能为空!');
   	   	} else {
   	   		$(".show-user-info").hide();
   	   		$.Alert('注册手机、会员卡号、证件号码不能同时为空!');
   	   	}
   	}
   	});
   function showCustomer(){
		$(".show-user-info").show();
		$('#customerDataTable').dataTable().fnDestroy();
		   admin.dataTable=$('#customerDataTable').dataTable({
								"bFilter" : false,
								"bSort" : false, 
								"bProcessing" : true,
								"sAjaxSource" : 'queryCustomerByPage.json',
								"fnServerParams" : function(aoData) {
									aoData.push({
										"name" : "custType",
								        "value" : $('#custType').val()
									}
									);
									aoData.push({
										"name" : "cellPhNum",
								        "value" : $('#cellPhNum').val()
									}
									);
									aoData.push({
										"name" : "cardNum",
								        "value" : $('#cardNum').val()
									}
									);
									aoData.push({
										"name" : "idType",
								        "value" : $('#idType').val()
									}
									);
									aoData.push({
										"name" : "idNum",
								        "value" : $('#idNum').val()
									}
									);								
									aoData.push({
										"name" : "name",
								        "value" : $('#name').val()
									}
									);
									aoData.push({
										"name" : "sexMf",
								        "value" : $('#sexMf').val()
									}
									);
								},
								"sServerMethod" : "post",
								"bServerSide" : true,
								"aoColumns" :[
										{
											"mData" : "name","sWidth": "200px",'sClass':'text-center',
											"mRender" : function(data, type, row) {
												if(data){
													return data;
												}
											}
										},{
											"mData" : "sex_mf","sWidth": "80px",
											"mRender" : function(data, type, row) {
												if(data){
													return getDictName("1006",data);
												}
											}
										},{
											"mData" : "cust_type","sWidth": "250px",
											"mRender" : function(data, type, row) {
												if(data){
													return getDictName("40029",data);
												}
											}
										},
										//{"mData" : "card_num","sWidth":"150px",'sClass':'text-center'},
										{"mData" : "cell_ph_num","sWidth":"150px",'sClass':'text-center'},
										{
											"mData" : "brand","sWidth":"150px",'sClass':'text-center',
											"mRender" : function(data, type, row) {
												if(data==3){
													data="凯迪拉克";
												} 
												if(data==1){
													data="别克";
											    }
											    if(data==2){
											    	data="雪佛兰";
												}
												return data;
											}
											
										},
										{
											"mData" : "brand","sWidth":"250px",'sClass':'text-center',
											"mRender" : function(data, type, row) {
												if(row.cust_type=="粉丝"){
													return "<input class='btn btn-primary col-md-offset-1 search-user-info' type=button onclick=customerInfo('"+row.cust_id+"','"+escape(row.name)+"','"+row.subinst_id+"','"+row.member_id+"','"+row.brand+"','"+row.cust_class+"','"+row.cust_type+"','"+row.cell_ph_num+"') value=选择>&nbsp;&nbsp;<input class='btn btn-primary col-md-offset-1 search-user-info' type=button onclick=customerEdit('"+row.cust_id+"','"+escape(row.name)+"','"+row.sex_mf+"','"+row.cell_ph_num+"') value=编辑>";
												}else{
													return "<input class='btn btn-primary col-md-offset-1 search-user-info' type=button onclick=customerInfo('"+row.cust_id+"','"+escape(row.name)+"','"+row.subinst_id+"','"+row.member_id+"','"+row.brand+"','"+row.cust_class+"','"+row.cust_type+"','"+row.cell_ph_num+"') value=选择>";
												}
																							
											}
										}
								],
								"aLengthMenu" : [ [ 5, 10, 20 ], [ 5, 10, 20 ] ],
								"iDisplayLength" : 5,
								"sPaginationType" : "bootstrap",
								"aaSorting" : [ [ 9, "asc" ] ],
								"aoColumnDefs" : [ {
									"sDefaultContent" : '',
									"aTargets" : [ "_all" ]
								} ],
								"fnServerData" : function(sSource, aoData, fnCallback) {
									$.ajax({
										"dataType" : 'json',
										"type" : "POST",
										"url" : sSource,
										"data" : aoData,
										"success" : fnCallback,
										"timeout" : 3000000,
										"error" : function handleAjaxError(xhr,
												textStatus, error) {
											if (textStatus == "timeout") {
												$.Alert("连接超时!请稍后再试!!!");
											} else if (textStatus == "error") {
												$.Alert("系统繁忙!!!,请稍后再试!!!");
											}
											admin.dataTable.fnProcessingIndicator(false);
										}
									});
								},
								"oLanguage" : {
									"sLengthMenu" : "每页显示 _MENU_ 条记录",
									"sZeroRecords" : "抱歉， 没有找到",
									"sInfo" : "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
									"sInfoEmpty" : " ",
									"sProcessing" : "正在查询....",
									"sInfoFiltered" : "",
									"oPaginate" : {
										"sFirst" : "首页",
										"sPrevious" : "前一页",
										"sNext" : "后一页",
										"sLast" : "尾页"
									}
								},"sDom": 'l<"table-toolbar margin-top-10">frtip',	
								"fnDrawCallback": function( oSettings ) {
		                   	 	$('input.checkboxes').uniform(); 
		                		},"fnInitComplete": function(oSettings, json) {
				                    $('.dataTables_length select').addClass("form-control input-sm");
				                    $('.dataTables_filter input').addClass("form-control input-medium");
				                } 
				});
	}



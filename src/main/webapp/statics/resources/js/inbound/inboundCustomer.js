$(document).ready(function(){
	if(gl.getCurCust()!=null && gl.getCurCust()!="null"){
		if(gl.getCurCust().custMobileNum!=null && gl.getCurCust().custMobileNum!="null"){
			$("#cellPhNum").val(gl.getCurCust().custMobileNum);
		}
	}		
	if($('#cellPhNum').val()!=""){
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
   
   $("#customer_submit_add").click(function(){
	   var customerData="customerAdd.json";
	   var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(15[0-9]{1}))+\d{8})$/;   
	    if($('#cellPhNum').val()=="")
		{
	    	$.Alert('注册手机有误,请重新输入!');
			return false;
		}else if($('#cellPhNum').val()!=""){
			if((isNaN($('#cellPhNum').val()))){
				$.Alert('注册手机有误,请重新输入!');
				return false;
			}else{
        		var re = /^[\u0391-\uFFE5A-Za-z]+$/;
        		if($('#name').val()==""){
        			$.Alert('客户姓名不能为空!');
        	        return false;
        		}else if($('#sexMf').val()==""){
        	    	$.Alert('客户性别不能为空!');
        	        return false;
        		}else{
        			if(($('#name').val()).match( /^[\u4E00-\u9FA5a-zA-Z0-9_]{3,20}$/) || re.test($('#name').val())){
        				var userId=0;
        				if(gl.getCurCust().userId!=null && gl.getCurCust().userId!="null"){
        					userId=gl.getCurCust().userId;
        				}
    					var addData=$("#customerForm").serialize()+"&"+"userId="+userId;
    					$.ajax({ 
	        		        url : customerData, 
	        		        type : 'POST',
	        		        dataType:'json', 
	        		        async:true,
	        		        data : addData, 
	        		        success : function(data){
	        		        	if(data.CUSTOMERID!=-1){
	        		        		var curCust=gl.getCurCust();
	        		        		if(curCust!=null && curCust!="null"){
	        		        			if(data.CUSTOMERID!=-2){
	        		        				curCust.userId=data.CUSTOMERID;
	        		        			}	        		        			
		        		        		curCust.name=$('#name').val();
		        		        		curCust.custMobileNum=$('#cellPhNum').val();     		        		
		        		        	    gl.setCurCust(curCust);
	        		        		}	        		        		
	        		        	}
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

admin={};
$("#customer_submit_button").click(function(){
	if($('#cellPhNum').val()!="" && $('#cellPhNum').val()!=null){
		showCustomer();		
	}else{
		$(".show-user-info").hide();
   		$.Alert('注册手机不能为空!');
	}
	});
//设置手机归属地信息
function setPhoneLocation(){
    var cellNo=$("#cellPhNum").val();
    if(cellNo&&cellNo.length>7){
        $.ajax({
            async: false,
            url: window.contextPath + "/mobilephone/phoneLocation.json",
            type: "post",
            dataType: "json",
            data: {
                "phoneNo" :cellNo
            },
            success: function(data){
                if (data) {
                    $("#labelPhoneLocation").text(data.message);
                }
            }
        });
    }

}
function showCustomer(){
    //设置归属地信息
    setPhoneLocation();
	$(".show-user-info").show();
	$('#customerDataTable').dataTable().fnDestroy();
	   admin.dataTable=$('#customerDataTable').dataTable({
							"bFilter" : false,
							"bSort" : false, 
							"bProcessing" : true,
							"sAjaxSource" : 'queryCustomerByPage.json',
							"fnServerParams" : function(aoData) {					
								aoData.push({
									"name" : "number",
							        "value" : $('#cellPhNum').val()
								}
								);													
								aoData.push({
									"name" : "name",
							        "value" : $('#name').val()
								}
								);
								aoData.push({
									"name" : "sexualty",
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
										"mData" : "sexualty","sWidth": "80px",
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},{
										"mData" : "type","sWidth": "250px",
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},
									{"mData" : "phone","sWidth":"150px",'sClass':'text-center'},
									{"mData" : "age","sWidth":"150px",'sClass':'text-center'},
									{
										"mData" : "userId","sWidth":"250px",'sClass':'text-center',
										"mRender" : function(data, type, row) {
											return "<input class='btn btn-primary col-md-offset-1 search-user-info' type=button onclick=customerInfo('"+row.userId+"','"+escape(row.name)+"','"+row.phone+"','"+escape(new Date(row.birthday).format('yyyy-MM-dd'))+"','"+row.email+"','"+escape(row.nickName)+"','"+escape(row.address)+"','"+escape(row.zipCode)+"','"+row.sexualty+"') value=选择>";											
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



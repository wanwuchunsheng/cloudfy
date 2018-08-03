var busiLable="";
var userId=-1;
var name="";
var custMobileNum="";
var birthday="";
var email="";
var custId=-1;
var custName="";
var callNo="";
var CurCallId=-1;
var serviceTypeId=-1;
var workSheetNo=0;
$(function(){
     
    });

   $(document).ready(function(){
	   if(gl.getCurCallId!=null && gl.getCurCallId!="null"){
		   CurCallId=gl.getCurCallId;
	   }
	   if(gl.getCurOp()!=null && gl.getCurOp()!="null"){
		   if(gl.getCurOp().loginId!=null && gl.getCurOp().loginId!="null"){
			   custId=gl.getCurOp().loginId;
		   } 
	   }
	   if(gl.getCurCust()!=null && gl.getCurCust()!="null"){
		   if(gl.getCurCust().custName!=null && gl.getCurCust().custName!="null"){
	    	   custName=gl.getCurCust().custName; 
		   }
	       if(gl.getCurCust().callNo!=null && gl.getCurCust().callNo!="null"){
	    	   callNo=gl.getCurCust().callNo;
	       }
		   if(gl.getCurCust().userId!=null && gl.getCurCust().userId!="null"){
			    userId=gl.getCurCust().userId;
				$("#cust_userId").html(gl.getCurCust().userId);				
		   } 
		   if(gl.getCurCust().name!=null && gl.getCurCust().name!="null"){
			    name=gl.getCurCust().name;
				$("#cust_name").html(gl.getCurCust().name);
		   } 
		   if(gl.getCurCust().custMobileNum!=null && gl.getCurCust().custMobileNum!="null"){
			    custMobileNum=gl.getCurCust().custMobileNum;
				$("#cust_callNo").html(gl.getCurCust().custMobileNum);
				$("#customer_callNo").html(gl.getCurCust().custMobileNum);
		   } 
		   if(gl.getCurCust().birthday!=null && gl.getCurCust().birthday!="null"){
			    birthday=gl.getCurCust().birthday;
				$("#cust_birthday").html(gl.getCurCust().birthday);
				$("#cust1_birthday").html(gl.getCurCust().birthday);
		   } 
		   if(gl.getCurCust().email!=null && gl.getCurCust().email!="null"){ 
			    email=gl.getCurCust().email;
				$("#cust_email").html(gl.getCurCust().email);
				$("#cust1_email").html(gl.getCurCust().email);
		   } 
		   if(gl.getCurCust().name!=null && gl.getCurCust().name!="null"){
				$("#customer_name").html(gl.getCurCust().name);
		   } 
		   if(gl.getCurCust().type!=null && gl.getCurCust().type!="null"){
				$("#customer_type").html(gl.getCurCust().type);
				$("#cust1_type").html(gl.getCurCust().type);
		   } 
		   if(gl.getCurCust().number!=null && gl.getCurCust().number!="null"){
				$("#customer_number").html(gl.getCurCust().number);
				$("#cust1_number").html(gl.getCurCust().number);
		   }  
		   if(gl.getCurCust().nickName!=null && gl.getCurCust().nickName!="null"){
				$("#cust1_nickName").html(gl.getCurCust().nickName);
		   }   
		   if(gl.getCurCust().address!=null && gl.getCurCust().address!="null"){
				$("#cust1_address").html(gl.getCurCust().address);
		   }
		   if(gl.getCurCust().zipCode!=null && gl.getCurCust().zipCode!="null"){
				$("#cust1_zipcode").html(gl.getCurCust().zipCode);
		   }		   
	   }

   });
   
   $("#tab_5_2_1").click(function(){
	   if(gl.getCurCust().userId!=null && gl.getCurCust().userId!="null"){
		   showCallCenterService(gl.getCurCust().userId); 
	   }
	});
   
   $("#tab_5_2_2").click(function(){
	   if(gl.getCurCust().userId!=null && gl.getCurCust().userId!="null"){
		   showAccountTradeService(gl.getCurCust().userId);
	   }
	});
   
   $("#tab_5_2_3").click(function(){
	   if(gl.getCurCust().userId!=null && gl.getCurCust().userId!="null"){
		   showTsrworksheet(gl.getCurCust().userId);
	   }
	});
   
   $("#tab_5_2_4").click(function(){
	   if(gl.getCurCust().userId!=null && gl.getCurCust().userId!="null"){
		   showServiceRecord(gl.getCurCust().userId);
	   }
	});
   
   function serviceRecordDetailAdd(){
	   workSheetNo=$("#workSheetNo").attr('checked')?12781001:12781002;
	   if($("#sel_ServiceRequestType").val()!=undefined){
			serviceTypeId=$("#sel_ServiceRequestType").val();
		}
	   busiLable=busiLable.substring(0, busiLable.length-1);
 	$.ajax({ 
        url : 'serviceRecordDetailAdd.json', 
        type : 'POST',
        dataType:'json', 
        async:true,
        data: {
	    	  "serviceRecordDetail.busiLable": busiLable,
	    	  "serviceRecordDetail.content": $("#content").val(),
	    	  "serviceRecordDetail.serviceType": serviceTypeId,
	    	  "serviceRecordDetail.accountid": userId,
	    	  "serviceRecordDetail.custname": name,
	    	  "serviceRecordDetail.custphone": custMobileNum,
	    	  "serviceRecordDetail.custbirth": birthday,
	    	  "serviceRecordDetail.custemail": email,
	    	  "serviceRecordDetail.createUserName": custName,
	    	  "serviceRecordDetail.createUserId": custId,
	    	  "serviceRecord.userId": custId,
	    	  "serviceRecord.callNo": callNo,
	    	  "serviceRecord.accountid": userId,
	    	  "serviceRecord.createUserName": custName,
	    	  "serviceRecord.createUserId": custId,
	    	  "serviceRecord.workSheetStuts": workSheetNo,
	    	  "serviceRecord.callRecordId": CurCallId
	       },
        success : function(data){
        	$.Alert(data.MESSAGE);
        }
     });	
};
admin={};
function showCallCenterService(userId){
	   $('#CCS_DataTable').dataTable().fnDestroy();
	   admin.dataTable=$('#CCS_DataTable').dataTable({
							"bFilter" : false,
							"bSort" : false, 
							"bProcessing" : true,
							"sAjaxSource" : 'queryCallCenterService.json',
							"fnServerParams" : function(aoData) {
								aoData.push({
									"name" : "userId",
							        "value" : userId
								}
								);				
							},
							"sServerMethod" : "post",
							"bServerSide" : true,
							"aoColumns" :[
									{
										"mData" : "preOrderId","sWidth": "100px",'sClass':'text-center',
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},{
										"mData" : "statusName","sWidth": "100px",
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},{
										"mData" : "createTime","sWidth": "100px",
										"mRender" : function(data, type, row) {
											if(data){
												return new Date(data).format('yyyy-MM-dd hh:mm:ss');
											}
										}
									},{
										"mData" : "userName","sWidth": "100px",
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},{
										"mData" : "mobileNo","sWidth": "100px",
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},{
										"mData" : "dealerName","sWidth": "100px",
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},{
										"mData" : "modelsCnName","sWidth": "100px",
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},{
										"mData" : "prmtActName","sWidth": "100px",
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},{
										"mData" : "prmtDesc","sWidth": "120px",
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},{
										"mData" : "expressNo","sWidth": "120px",
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},{
										"mData" : "address","sWidth": "100px",
										"mRender" : function(data, type, row) {
											if(data){
												return data;
											}
										}
									},{
										"mData" : "remarkDesc","sWidth": "100px",
										"mRender" : function(data, type, row) {
											if(data){
												data=data.length>10 ? '<label title="'+data+'">'+data.substring(0,10)+'...</label>': data;
						                        return data;
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
											alert("连接超时!请稍后再试!!!");
										} else if (textStatus == "error") {
											alert("系统繁忙!!!,请稍后再试!!!");
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
	};
	
	function showAccountTradeService(userId){
		   $('#ATS_DataTable').dataTable().fnDestroy();
		   admin.dataTable=$('#ATS_DataTable').dataTable({
								"bFilter" : false,
								"bSort" : false, 
								"bProcessing" : true,
								"sAjaxSource" : 'queryAccountTradeService.json',
								"fnServerParams" : function(aoData) {
									aoData.push({
										"name" : "userId",
								        "value" : userId
									}
									);				
								},
								"sServerMethod" : "post",
								"bServerSide" : true,
								"aoColumns" :[
										{
											"mData" : "refId","sWidth": "100px",'sClass':'text-center',
											"mRender" : function(data, type, row) {
												if(data){
													return data;
												}
											}
										},{
											"mData" : "beforeBalance","sWidth": "100px",
											"mRender" : function(data, type, row) {
												if(data){
													return data;
												}
											}
										},{
											"mData" : "afterBalance","sWidth": "100px",
											"mRender" : function(data, type, row) {
												if(data){
													return data;
												}
											}
										},{
											"mData" : "tradeType","sWidth": "100px",
											"mRender" : function(data, type, row) {
												if(data){
													return data;
												}
											}
										},{
											"mData" : "tradeDate","sWidth": "100px",
											"mRender" : function(data, type, row) {
												if(data){
													return data;
												}
											}
										},{
											"mData" : "tradeChannel","sWidth": "100px",
											"mRender" : function(data, type, row) {
												if(data){
													return data;
												}
											}
										},{
											"mData" : "tradeContent","sWidth": "100px",
											"mRender" : function(data, type, row) {
												if(data){
													data=data.length>10 ? '<label title="'+data+'">'+data.substring(0,10)+'...</label>': data;
							                        return data;													
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
												alert("连接超时!请稍后再试!!!");
											} else if (textStatus == "error") {
												alert("系统繁忙!!!,请稍后再试!!!");
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
		};
		
		function showServiceRecord(userId){
			   $('#TSR_DataTable').dataTable().fnDestroy();
			   //表格有数据时才destroy
			   if( $('#TSR_DataTable').find("tbody>tr.even").size() > 0 ){
			   		$('#TSR_DataTable').dataTable().fnDestroy();
			   }
			   $('#TSR_DataTable').siblings("div").remove().unwrap();
			   admin.dataTable=$('#TSR_DataTable').dataTable({
									"bFilter" : false,
									"bSort" : false, 
									"bProcessing" : true,
									"sAjaxSource" : 'queryServiceRecordByPage.json',
									"fnServerParams" : function(aoData) {
										aoData.push({
											"name" : "userId",
									        "value" : userId
										}
										);				
									},
									"sServerMethod" : "post",
									"bServerSide" : true,
									"aoColumns" :[
											{
												"mData" : "name","sWidth": "100px",'sClass':'text-center',
												"mRender" : function(data, type, row) {
													if(data){
														return data;
													}
												}
											},{
												"mData" : "worksheet_no","sWidth": "100px",
												"mRender" : function(data, type, row) {
													if(data){
														return data;
													}
												}
											},{
												"mData" : "call_no","sWidth": "100px",
												"mRender" : function(data, type, row) {
													if(data){
														return data;
													}
												}
											},{
												"mData" : "create_time","sWidth": "100px",
												"mRender" : function(data, type, row) {
													if(data){
														return new Date(data).format('yyyy-MM-dd hh:mm:ss');
													}
												}
											},{
												"mData" : "user_id","sWidth": "100px",
												"mRender" : function(data, type, row) {
													if(data){
														return data;
													}
												}
											},{
												"mData" : "content","sWidth": "100px",
												"mRender" : function(data, type, row) {
													if(data){
														data=data.length>10 ? '<label title="'+data+'">'+data.substring(0,10)+'...</label>': data;
								                        return data;														
													}
												}
											},{
												"mData" : "type","sWidth": "100px",
												"mRender" : function(data, type, row) {
													if(data){
														return data;
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
													alert("连接超时!请稍后再试!!!");
												} else if (textStatus == "error") {
													alert("系统繁忙!!!,请稍后再试!!!");
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
									"fnPreDrawCallback": function(){
										App.blockUI( $("#customDetails") );
									},
									"fnDrawCallback": function( oSettings ) {
				                   	 	$('input.checkboxes').uniform();
				                   	 	App.unblockUI( $("#customDetails") );
			                		},"fnInitComplete": function(oSettings, json) {
					                    $('.dataTables_length select').addClass("form-control input-sm");
					                    $('.dataTables_filter input').addClass("form-control input-medium");
					                } 
					});
			};
			//工单
			function showTsrworksheet(userId){
				//表格有数据时才destroy
			   if( $('#tsrworksheet_table').find("tbody>tr.even").size() > 0 ){
			   		$('#tsrworksheet_table').dataTable().fnDestroy();
			   }
			   $('#tsrworksheet_table').siblings("div").remove().unwrap();
			   admin.dataTable=$('#tsrworksheet_table').dataTable({
					"bFilter" : false,
					"bSort" : false, 
					"bDestroy": true,
					"sAjaxSource" : '/workSheet/queryWorkSheetByAccountId.json',
					"fnServerParams" : function(aoData) {
						aoData.push({
							"name" : "accountId",
					        "value" : userId
						}
						);				
					},
					"sServerMethod" : "post",
					"bServerSide" : true,
					"aoColumns" :[
							{
								"mData" : "sheetTypeName","sWidth": "100px",'sClass':'text-center',
								"mRender" : function(data, type, row) {
									if(data){
										return data;
									}
								}
							},{
								"mData" : "content","sWidth": "100px",
								"mRender" : function(data, type, row) {
									if(data){
										data=data.length>10 ? '<label title="'+data+'">'+data.substring(0,10)+'...</label>': data;
				                        return data;															
									}
								}
							},{
								"mData" : "createTime","sWidth": "100px",
								"mRender" : function(data, type, row) {
									if(data){
										return new Date(data).format('yyyy-MM-dd hh:mm:ss');
									}
								}
							},{
								"mData" : "statusName","sWidth": "100px",
								"mRender" : function(data, type, row) {
									if(data){
										return data;
									}
								}
							},{
								"mData" : "createUser","sWidth": "100px",
								"mRender" : function(data, type, row) {
									if(data){
										return data;
									}
								}
							},{
								"mData" : "sourceName","sWidth": "100px",
								"mRender" : function(data, type, row) {
									if(data){
										return data;
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
									alert("连接超时!请稍后再试!!!");
								} else if (textStatus == "error") {
									alert("系统繁忙!!!,请稍后再试!!!");
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
					"fnPreDrawCallback": function(){
						App.blockUI( $("#customDetails") );
					},
					"fnDrawCallback": function( oSettings ) {
		       	 		$('input.checkboxes').uniform(); 
		       	 		App.unblockUI( $("#customDetails") );
		    		},"fnInitComplete": function(oSettings, json) {
		                $('.dataTables_length select').addClass("form-control input-sm");
		                $('.dataTables_filter input').addClass("form-control input-medium");
		            } 
				});
			};

	//调用售后经销商的回调
	function setAscEai(code,name){
	    dealerCallback(code,name);
	}
   /*经销商选择回调函数*/
   function dealerCallback(code,name){
	   $("#txt_complainDealer").val(name);
	   $("#complainDealerCode").val(code);
   }

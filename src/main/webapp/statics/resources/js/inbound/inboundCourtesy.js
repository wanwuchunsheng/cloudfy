//开始转接
function startTransfer(){
	club_transfer($("#consultingTypeCode").val());
}
//完成转接
function endTransfer(){
	club_completeTransfer($("#consultingTypeCode").val());
}
//恢复通话
function recoveryTransfer(){
	club_retrieveCall($("#consultingTypeCode").val());
}

admin={};
function courtesyDataTable(){
	   if(admin.dataTable){
	   	    $('#courtesyDataTable').dataTable().fnDestroy();
	   }
	   admin.dataTable=$('#courtesyDataTable').dataTable({
							"bFilter" : false,
							"bSort" : false, 
							"bProcessing" : true,
							"sAjaxSource" : contextPath+'/inbound/queryCourtesyByPage.json',
							"fnServerParams" : function(aoData) {
								aoData.push({
									"name" : "memberId",
							        "value" : $('#memberId').val()
								}
								);
								aoData.push({
									"name" : "brand",
							        "value" : $('#brand').val()
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
									},
									{"mData" : "year_use_num","sWidth":"150px",'sClass':'text-center'},
									{"mData" : "used_num","sWidth":"150px",'sClass':'text-center'},
									{"mData" : "level","sWidth":"150px",'sClass':'text-center'},
									{
										"mData" : "last_service_time",
										"sWidth" : "150px",
										'sClass' : 'text-center',
										"mRender" : function(data, type, row) {
											if (data) {
												return new Date(data).format('yyyy-MM-dd hh:mm:ss');												
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
										if (textStatus === "timeout") {
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
	};



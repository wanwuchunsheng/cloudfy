/*生成客户姓名上的链接,git管理*/
function createHrefByCustName(custName,row){
	if(null==custName || ''==custName){
		return '';
	}
	return "<a onclick='openResultButton(\""+row.id+"\",\""+row.name+"\",\""+row.type+"\")' href='javascript:'>"+custName+"</a>";
}

/**
 *id,话务记录表ID
 * name,用户表的用户姓名name
 * 
 *  */
function  openResultButton(id,name,type){
	var url=contextPath+"/record/callRecordDetail.htm?callRecordId="+id;
	var title="接触记录明细";
	/*parent.mainTab.showTab( href, tit, reload );
	href: 当前url, 必须
	tit: tab标题，必须
	reload:true/false;显示现有tab时是否刷新；默认不刷新*/
	parent.mainTab.showTab( url, title, true );
}

/*查看任务明细*/
function  viewTaskDetails(taskId){
	var url=contextPath+"/record/taskDetails.htm?taskId="+taskId;
	var title="任务明细";
	parent.mainTab.showTab( url, title, true );
}
/*查看工单明细*/
function  viewWorksheet(sheetno){
	var url=contextPath+"/workSheet/show.htm?sheetNo="+sheetno;
	var title="工单明细";
	parent.mainTab.showTab( url, title, true );
}

var admin={};
/*查询服务记录*/
function querySr(){
	if(admin.serviceTable){
		$('#t_service').dataTable().fnDestroy();
	}
   //显示查询条件
	admin.serviceTable=$('#t_service').dataTable({
						"bFilter" : false,
						"bSort" : false, // 排序功能
						"bPaginate": false,
		                 "bInfo": false,
						"bProcessing" : true,// 设置异步请求时，是否有等待框。
						"sAjaxSource" : contextPath+'/record/querySrByCallId.json',
                        "fnServerParams" : function(aoData) {
							aoData.push({
								"name" : "callId", 
								"value" : $('#callId').val()
							});
						},
						"sServerMethod" : "post",
						"bServerSide" : true, // 异步请求
						"aoColumns" :[
						        /*
								{
									"mData" : "serviceType", "sWidth": "240px",
									"mRender" : function(data, type, row) {
											return '';
									}
								},*/{
									"mData" : "serviceType","sWidth": "240px",
									"mRender" : function(data, type, row) {
										if(data){
											return getServiceTypeName(data);
										}
									}
								},{
									"mData" : "workSheetNo","sWidth": "240px",
									"mRender" : function(data, type, row) {
										if(data){
											return  "<a href=\"#\" onclick=\"viewWorksheet('"+data+"')\">"+data+"</a>";
										}
									}
								},{
									"mData" : "agentId","sWidth": "240px",
									"mRender" : function(data, type, row) {
										return data;
									}
								},{
									"mData" : "createTime","sWidth": "240px",
									"mRender" : function(data, type, row) {
										return new Date(data).format('yyyy-MM-dd hh:mm:ss');
									}
								},{
									"mData" : "content","sWidth": "240px",
									"mRender" : function(data, type, row) {
										if(data&& data.length>20){
											var res="<label>"+data.substring(0,20)+"</label>"
											res += "<a href='#' onclick='showMsg(\""+data+"\");'>...</a>";
											data=res;
										}
										return data;
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
								"timeout" : 3000000, // 连接超时时间
								"error" : function handleAjaxError(xhr,
										textStatus, error) {
									if (textStatus === "timeout") {
										//$.dopErr("连接超时!请稍后再试!!!");
										$.Alert("连接超时!请稍后再试!!!");
									} else if (textStatus == "error") {
										//$.dopErr("系统繁忙!!!,请稍后再试!!!", null);
										$.Alert("系统繁忙!!!,请稍后再试!!!");
									}
									admin.dataTable.fnProcessingIndicator(false);// 这里是把"正在查询几个子去掉，(换成自己的id)
								}
							});
						},   //设置异常处理
						"fnDrawCallback": function( oSettings ) {
					    $(".subSpan").mouseover(function(){
					        $(this).next().css("display","block");
					    });
					      $(".subSpan").mouseout(function(){
                            $(this).next().css("display","none");
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
						}
		});
}


/*查询任务记录*/
function queryTr(){
	if(admin.taskTable){
		$('#t_task').dataTable().fnDestroy();
	}
   //显示查询条件
	admin.taskTable=$('#t_task').dataTable({
						"bFilter" : false,
						"bSort" : false, // 排序功能
						"bProcessing" : true,// 设置异步请求时，是否有等待框。
						"sAjaxSource" : contextPath+'/record/queryTrByCallId.json',
                        "fnServerParams" : function(aoData) {
							aoData.push({
								"name" : "callId", 
								"value" : $('#callId').val()
							});
						},
						"sServerMethod" : "post",
						"bServerSide" : true, // 异步请求
						"aoColumns" :[
								{
									"mData" : "taskName","sWidth": "240px",
									"mRender" : function(data, type, row) {
										if(data){
											return data;
										}
									}
								},{
									"mData" : "taskStatus","sWidth": "240px",
									"mRender" : function(data, type, row) {
										if(data){
											return  getTaskStatusName(data);
										}
									}
								},{
									"mData" : "agentId","sWidth": "240px",
									"mRender" : function(data, type, row) {
										return data;
									}
								},{
									"mData" : "createTime","sWidth": "240px",
									"mRender" : function(data, type, row) {
										return new Date(data).format('yyyy-MM-dd hh:mm:ss');
									}
								},{
									"mData" : "remark","sWidth": "240px",
									"mRender" : function(data, type, row) {
										if(data&& data.length>20){
											var res="<label>"+data.substring(0,20)+"</label>"
											res += "<a href='#' onclick='showMsg(\""+data+"\");'>...</a>";
											data=res;
										}
											return data;
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
								"timeout" : 3000000, // 连接超时时间
								"error" : function handleAjaxError(xhr,
										textStatus, error) {
									if (textStatus === "timeout") {
										//$.dopErr("连接超时!请稍后再试!!!");
										$.Alert("连接超时!请稍后再试!!!");
									} else if (textStatus == "error") {
										//$.dopErr("系统繁忙!!!,请稍后再试!!!", null);
										$.Alert("系统繁忙!!!,请稍后再试!!!");
									}
									admin.dataTable.fnProcessingIndicator(false);// 这里是把"正在查询几个子去掉，(换成自己的id)
								}
							});
						},   //设置异常处理
						"fnDrawCallback": function( oSettings ) {
					    $(".subSpan").mouseover(function(){
					        $(this).next().css("display","block");
					    });
					      $(".subSpan").mouseout(function(){
                            $(this).next().css("display","none");
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
						}
		});
}

function showMsg(msg){
	 bootbox.alert(msg);    
}

function getTaskStatusName(statusId){
	var sn="待处理";
	switch(statusId){
		case 65535:
			sn="已处理";
			break;
		case 65282:
			sn="处理中";
			break;
		default:
			sn="待处理";
	}
	return sn;
}
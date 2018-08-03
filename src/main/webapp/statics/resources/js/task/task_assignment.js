function queryAssignableTasks() {
	$('#assignable_task_dataTable').dataTable().fnDestroy();
	$('#assignable_task_dataTable')
			.dataTable(
					{
						"bFilter" : false,
						"bSort" : false,
						"bProcessing" : true,
						"sAjaxSource" : contextPath + '/task/assignable/query.json',
						"fnServerParams" : function(aoData) {

						},
						"sServerMethod" : "post",
						"bServerSide" : true,
						"bLengthChange" : false,
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
										"error" : function handleAjaxError(xhr,textStatus, error) {
											$.Alert(error);
											if (textStatus === "timeout") {
												$.Alert("连接超时!请稍后再试!!!");
											} else if (textStatus == "error") {
												$.Alert("系统繁忙!!!,请稍后再试!!!");
											}
											prmt.dataTable.fnProcessingIndicator(false);
										}
									});
						},
						"aoColumns" : [
								{
									"mData" : "taskName",
									"sWidth" : "250px",
									'sClass' : 'text-center'
								}, {
									"mData" : "taskNum",
									"sWidth" : "100px",
									'sClass' : 'text-center'
								}, {
									"mData" : "taskNum",
									"sWidth" : "100px",
									'sClass' : 'text-center',
									"mRender" : function(data, type, row) {
										/*
										var json=row.processName;
										data="<input type=\"button\" class=\"btn blue\" value=\"签收\" onclick=\"claimTask('"+json+"');\">";
										*/
										var taskCode=row.codeId;
										var taskNum=row.taskNum;
										data = "<input type=\"button\" class=\"btn blue\" value=\"分配\" onclick=\"assignment('"+taskCode+"',"+taskNum+");\">";
										return data;
									}
								}],

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

function queryAssignedTasks() {
	$('#assigned_task_dataTable').dataTable().fnDestroy();

	admin.dataTable = $('#assigned_task_dataTable')
			.dataTable(
					{
						"bFilter" : false,
						"bSort" : false,
						"bProcessing" : true,
						"sAjaxSource" : contextPath + '/task/assigned/query.json',
						"fnServerParams" : function(aoData) {

						},

						"sServerMethod" : "post",
						"bServerSide" : true,
						"bLengthChange" : false,
						"aLengthMenu" : [ [ 5, 10, 20 ], [ 5, 10, 20 ] ],
						"iDisplayLength" : 5,
						"sPaginationType" : "bootstrap",
						"aaSorting" : [ [ 9, "asc" ] ],
						"aoColumnDefs" : [ {
							"sDefaultContent" : '',
							"aTargets" : [ "_all" ]
						} ],
						"fnServerData" : function(sSource, aoData, fnCallback) {
							$
									.ajax({
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
											prmt.dataTable
													.fnProcessingIndicator(false);
										}
									});
						},
						"aoColumns" : [
								{
									"mData" : "taskName",
									"sWidth" : "150px",
									'sClass' : 'text-center'
								}, {
									"mData" : "taskNum",
									"sWidth" : "150px",
									'sClass' : 'text-center'
								}/*, {
									"mData" : "taskNum",
									"sWidth" : "150px",
									"mRender" : function(data, type, row) {
										var taskCode=row.codeId;
										var taskNum=row.taskNum;
										data = "<input type=\"button\" class=\"btn blue\" value=\"分配\" onclick=\"assignment('"+taskCode+"',"+taskNum+");\">";
										return data;
									}
								}*/],

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
/*待分配任务页面*/
function forwardAssignablePage() {
	location.href = contextPath + '/task/assignable/list.htm';
}

/*已分配任务页面*/
function forwardAssignedTaskPage() {
	location.href = contextPath + '/task/assigned/list.htm';
}

/*分配详情*/
function assignment(taskCode,taskNum){
	location.href = contextPath + '/task/assignment.htm?taskCode='+taskCode+"&taskNum="+taskNum;
}





/**
 * 任务分配
 */
function saveAssignment() {
	/*分配方式：1，平均；2，差异*/
	var selected = $('#assign_mode').val();
	if (selected == 1) {
		saveAssignmentAve();
	} else {
		saveAssignmentSep();
	}
}
/*平均分配*/
function saveAssignmentAve() {
	var taskCode = $('#taskCode').val();
	var processName = $('#processName').val();
	/*可分配量*/
	var assignTaskCount = parseInt($("#assignableCount").val());

	var ids = [];
	$("#frm_average input.checkboxes:checked").each(function(index, data) {
		ids.push($(data).val());
	});
	if (ids.length == 0) {
		$.Alert('请选择任务接收人.');
		return false;
	}
	if (ids.length > assignTaskCount) {
		$.Alert('任务接受人多于任务数，无法平均分配.');
		return false;
	}
	ids = ids + '';

	$.ajax({
		url : contextPath + '/task/assignment/average/save.json',
		type : "post",
		dataType : "json",
		data : {
			taskCode : taskCode,
			processName:processName,
			userIds : ids,
			taskNum : assignTaskCount
		},
		success : function(data) {
			if (data == '0') {
				$.Alert('分配成功','',forwardAssignablePage);
			} else if (data == '-1') {
				$.Alert('无法平均分配，请选择差异分配');
			} else {
				var avaNum = parseInt(assignTaskCount) - parseInt(data);
				$.Alert("已成功平均分配" + avaNum + "个任务，还剩余" + data + "个任务","",forwardAssignablePage);
			}
		},
		error: function(data){
			$.Alert("分配任务发生错误，请重新分配","",forwardAssignablePage);
		}
	});
}
/*差异分配*/
function saveAssignmentSep() {
	var taskCode = $('#taskCode').val();
	var processName = $('#processName').val();
	/*可分配量*/
	var assignTaskCount = parseInt($("#assignableCount").val());
	var ids = [];
	var nums = [];
	var waitassignNum=0;
	$("#frm_diversity input[name='count']").each(function(index, data) {
		if ($(data).val() != '') {
			nums.push($(data).val());
			ids.push($(data).attr('id').split('_')[1]);
			waitassignNum = waitassignNum + parseInt($(data).val());
		}
	});
	if (ids.length == 0) {
		$.Alert('请输入分配数量.');
		return false;
	}

	if (waitassignNum > assignTaskCount) {
		$.Alert('输入的分配数量大于待分配数量');
		return false;
	}
	ids = ids + '';
	nums = nums + '';

	$.ajax({
		url : contextPath + '/task/assignment/diversity/save.json',
		type : "post",
		dataType : "json",
		data : {
			taskCode : taskCode,
			processName:processName,
			userIds : ids,
			nums : nums,
			taskNum : assignTaskCount
		},
		success : function(data) {
			if (data) {
				if (data.done) {
					$("#waitAssignedId").html(assignTaskCount - waitassignNum);
					$.Alert('分配成功.','',forwardAssignablePage);
				} else {
					$.Err(data.msg);
				}
			}
		},
		error: function(data){
			$.Alert("分配任务发生错误，请重新分配",'',forwardAssignablePage);
		}
	});
}















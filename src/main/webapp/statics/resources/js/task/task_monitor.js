/*部门分组监控查询*/
function queryByDirector() {
	$('#dataTable_director').dataTable().fnDestroy();
	
	director_admin.dataTable=$('#dataTable_director').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/task/monitor/director/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
			    "name" : "positionId",
			    "value" : $("#positionId").val()
			});
		},
		"bServerSide": false,
		'bPaginate': true,  
		"sServerMethod" : "post",
		"bLengthChange":false,
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
					prmt.dataTable.fnProcessingIndicator(false);
				}
			});
		}, 
		"aoColumns": [
					{
						"mData" : "positionName","sWidth": "200px",
						"fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
							if(iRow == 0){
								 $(nTd).parent().removeClass('odd');
								 $(nTd).parent().addClass('success');
							 }
						 },
						"mRender" : function(data, type, row) {
							return data;
						}
					},{
						"mData" : "undoneTaskNum","sWidth": "200px",
						"mRender" : function(data, type, row) {
							return data;
						}
					},{
						"mData" : "doingTaskNum","sWidth": "200px",
						"mRender" : function(data, type, row) {
							return data;
						}
					},{
						"mData" : "doneTaskNum","sWidth": "200px",
						"mRender" : function(data, type, row) {
							return data;
						}
					},{ "mData": "positionName","sWidth": "100px",
			               "mRender" : function(data, type, row) {
			            	   if(data == '本部门'){
			            		   return  "<button class='btn blue' onclick='forwardMonitorLocalDepartMent("+row.positionId + ")'>详细</button>";
			            	   } else{
			            		   return "<button class='btn blue' onclick='forwardByPosition(" +row.positionId + ")'>详细</button>";
			            	   }
							}
			        }
	
           ],  
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

/*根据坐席分组查询*/
function queryByAgent() {
	$('#dataTable_agent').dataTable().fnDestroy();
	
	agent_admin.dataTable=$('#dataTable_agent').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/task/monitor/agent/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
			    "name" : "agentId",
			    "value" : $('#userId').val()
			},{
			    "name" : "userId",
			    "value" : $('#userId').val()
			},{
			    "name" : "positionId",
			    "value" : $('#positionId').val()
			});
		},
		
		"sServerMethod" : "post",
		"bServerSide" : false,
		"bLengthChange":false,
		"aLengthMenu" : [ [ 5, 10, 20 ], [ 5, 10, 20 ] ],
		"iDisplayLength" : 20,
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
//					prmt.dataTable.fnProcessingIndicator(false);
				}
			});
		}, 
		"aoColumns": [
					{
						"mData" : "userName","sWidth": "100px",
						"fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
							if(iRow == 0){
								 $(nTd).parent().removeClass('odd');
								 $(nTd).parent().addClass('success');
							 }
						 },
						"mRender" : function(data, type, row) {
								return data;
						}
					},{
						"mData" : "undoneTaskNum","sWidth": "100px",
						"fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
							if(iRow == 0){
								 $(nTd).parent().removeClass('odd');
								 $(nTd).parent().addClass('success');
							 }
						 },
						"mRender" : function(data, type, row) {
							return data;
						}
					},{
						"mData" : "doingTaskNum","sWidth": "100px",
						"fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
							if(iRow == 0){
								 $(nTd).parent().removeClass('odd');
								 $(nTd).parent().addClass('success');
							 }
						 },
						"mRender" : function(data, type, row) {
							return data ;
						}
					},{
						"mData" : "doneTaskNum","sWidth": "100px",
						"fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
							if(iRow == 0){
								 $(nTd).parent().removeClass('odd');
								 $(nTd).parent().addClass('success');
							 }
						 },
						"mRender" : function(data, type, row) {
							return data;
						}
					},{ "mData": "userName","sWidth": "100px",
						"fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
							if(iRow == 0){
								 $(nTd).parent().removeClass('odd');
								 $(nTd).parent().addClass('success');
							 }
						 },
			               "mRender" : function(data, type, row) {
			            	   if(data == '合计') return '';
						            	   
						       return "<button class='btn blue' onclick='showAgentDetail(" + row.userId + ")'>详细</button>&nbsp;";
						    }
			           }
           ],  
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
		"fnInitComplete": function(oSettings, json) {
                $('.dataTables_length select').addClass("form-control input-sm");
                $('.dataTables_filter input').addClass("form-control input-medium");
            }
	});
}

/*岗位下任务分组查询*/
function queryByTask() {
	$('#dataTable_task').dataTable().fnDestroy();
	task_admin.dataTable=$('#dataTable_task').on( 'processing.dt', function (e, settings, processing) {
		
    }).dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/task/monitor/task/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
			    "name" : "taskCode",
			    "value" : $('#task_taskCode').val()
			},
			{
			    "name" : "positionId",
			    "value" : $('#positionId').val()
			});
		},
		"bServerSide": true,
		'bPaginate': true,  
		"sServerMethod" : "post",
		"bLengthChange":false,
		"aLengthMenu" : [ [ 5, 10, 20 ], [ 5, 10, 20 ] ],
		"iDisplayLength" : 20,
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
					prmt.dataTable.fnProcessingIndicator(false);
				}
			});
		}, 
		"aoColumns": [
					{
						"mData" : "name","sWidth": "200px",
						"fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
							if(iRow == 0){
								 $(nTd).parent().removeClass('odd');
								 $(nTd).parent().addClass('success');
							 }
						 },
						"mRender" : function(data, type, row) {
							if(row.taskTypeValue == '合计') 
								return data;
							return data+ "<input type='hidden' class='firstRemind' value='" + row.taskCode + "'taskType='"+ row.taskType  + "'serviceType='"+ row.serviceType +"'/>";
						}
					},{
						"mData" : "undoneTaskNum","sWidth": "100px",
						"mRender" : function(data, type, row) {
							return data;
						}
					},{
						"mData" : "doingTaskNum","sWidth": "100px",
						"mRender" : function(data, type, row) {
							return data;
						}
					},{
						"mData" : "doneTaskNum","sWidth": "100px",
						"mRender" : function(data, type, row) {
							return data;
						}
					},
					{ "mData": "name","sWidth": "100px",
			               "mRender" : function(data, type, row) {
			            	   if(data == '合计'){
			            		   return "";
			            	   } 
			            	   return "<button class='btn blue' onclick='showTaskDetail(" +row.taskCode + ")'>查看</button>&nbsp;";
							}
			           }
           ],  
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
/*转向根据岗位查询页面*/
function forwardByPosition(positionId){
	 location.href = contextPath + "/task/monitor_director/list.htm"+"?positionId="+positionId;
}
/*转向业务明细页面*/
function forwardMonitorLocalDepartMent(positionId){
	 location.href = contextPath + "/task/monitor/list.htm"+"?positionId="+positionId;
}
/*显示业务员任务明细*/
function showAgentDetail(userId){
	var positionId = $('#positionId').val();
	location.href=contextPath+'/task/monitor/agent/list.htm?userId=' + userId + "&positionId=" + positionId;
}
/*显示任务类别的任务明细信息*/
function showTaskDetail(taskCode){
	$('#taskCode').val(taskCode);
	var positionId = $('#positionId').val();
	$('#task_positionId').val(positionId);
	$('#frm_task_detail').submit();
}

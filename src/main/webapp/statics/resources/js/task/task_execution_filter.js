/**
 * 获取任务执行(单任务包)待处理任务列表
 */
function init_single_undoneTask(){
	$('#single_undone_dataTable').dataTable().fnDestroy();
	
	admin_single_undone.dataTable=$('#single_undone_dataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/task/exec/single/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "status",
				"value" : 1
			},aoData.push({
				"name" : 'userId',
				"value" : $.trim($('#undone_userId').val())
			}),aoData.push({
				"name" : 'positionId',
				"value" : $.trim($('#positionId').val())
			}),aoData.push({
				"name" : 'beginTime',
				"value" : $.trim($('#beginTime').val())
			}),aoData.push({
				"name" : 'endTime',
				"value" : $.trim($('#endTime').val())
			}),aoData.push({
                "name" : 'beginCreateTime',
                "value" : $('#beginCreateTime').val()
            }),aoData.push({
                "name" : 'endCreateTime',
                "value" : $('#endCreateTime').val()
            }), aoData.push({
				"name" : 'taskCode',
				"value" : $.trim($('#undone_taskCode').val())
			}),aoData.push({
				"name" : 'custName',
				"value" : $.trim($('#undone_custName').val())
			}));
		},
		
		"sServerMethod" : "post",
		"bServerSide" : true,
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
              { "mData": "","sWidth": "100px",'sClass':'text-center',
		    	  "mRender" : function(data, type, row) {
						return "<input type='checkbox' name='undoTaskId' class='group-checkable' value='"+row.worksheetId+"'>";
					} 
		      },
		      { "mData": "custName","sWidth": "100px"},
              { "mData": "taskName","sWidth": "250px",'sClass':'text-center'},
              { "mData": "userName","sWidth": "100px",'sClass':'text-center'},
              { "mData": "dispatchTime","sWidth": "150px",
            	  "mRender" : function(data, type, row) {
						return new Date(data).format('yyyy-MM-dd hh:mm:ss');
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
            },
        "fnDrawCallback":function(){
        	//console.debug("Page11:");
            $('.undone_firstRemindFlag').each(function(){
            	//console.debug("Current task code:"+$(this).val());
            	var status =$(this).val();
            	//console.debug("Current task code:"+taskCode);
            	if(status == 1)
            		$(this).parent().append('<i class="fa fa-exclamation red"></i>');
            });
        },
 		"fnDrawCallback" : function() {
			//console.debug(this);
			//console.debug(oSettings.fnRecordsTotal());
			var oSettings = this.fnSettings();
			var iTotalRecords = oSettings.fnRecordsTotal();
			$("#undone_taskno").html(iTotalRecords);

		}
	});
}

/**
 * 获取任务执行(单任务包)处理中任务列表
 */
function init_single_undergoingTask(){
	$('#single_undergoing_dataTable').dataTable().fnDestroy();
		
	admin_single_undergoing.dataTable=$('#single_undergoing_dataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/task/exec/single/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "status",
				"value" : 2
			},aoData.push({
				"name" : 'userId',
				"value" : $.trim($('#undone_userId').val())
			}), aoData.push({
				"name" : 'taskCode',
				"value" : $.trim($('#undone_taskCode').val())
			}),
			aoData.push({
				"name" : 'positionId',
				"value" : $.trim($('#positionId').val())
			}),aoData.push({
				"name" : 'beginTime',
				"value" : $.trim($('#beginTime').val())
			}),aoData.push({
				"name" : 'endTime',
				"value" : $.trim($('#endTime').val())
			}),aoData.push({
                "name" : 'beginCreateTime',
                "value" : $('#beginCreateTime').val()
            }),aoData.push({
                "name" : 'endCreateTime',
                "value" : $('#endCreateTime').val()
            }),aoData.push({
				"name" : 'custName',
				"value" : $.trim($('#undone_custName').val())
			}));
		},
		
		"sServerMethod" : "post",
		"bServerSide" : true,
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
          { "mData": "","sWidth": "100px",'sClass':'text-center',
	    	  "mRender" : function(data, type, row) {
					return "<input type='checkbox' name='doingTaskId' class='group-checkable' value='"+row.worksheetId+"'>";
				} 
	      },
           { "mData": "custName","sWidth": "150px",'sClass':'text-center'},
           { "mData": "taskName","sWidth": "250px",'sClass':'text-center'},
           { "mData": "callNum","sWidth": "100px",'sClass':'text-center'},
           { "mData": "userName","sWidth": "100px"},
           { "mData": "dispatchTime","sWidth": "150px",
         	  "mRender" : function(data, type, row) {
						return new Date(data).format('yyyy-MM-dd hh:mm:ss');
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
            },
          "fnDrawCallback":function(){
              $('.undergoing_firstRemindFlag').each(function(){
              	//console.debug("Current first remind flag code:"+$(this).val());
              	var status =$(this).val();
              	//console.debug("Current task code:"+taskCode);
              	if(status == 1)
              		$(this).parent().append('<i class="fa fa-exclamation red"></i>');
              });
          },
   		"fnDrawCallback" : function() {
			//console.debug(this);
			//console.debug(oSettings.fnRecordsTotal());
			var oSettings = this.fnSettings();
			var iTotalRecords = oSettings.fnRecordsTotal();
			$("#undergoing_taskno").html(iTotalRecords);

		}
	});
}

/**
 * 获取任务执行(单任务包)处理完成任务列表
 */
function init_single_doneTask(){
	if(admin_single_done.dataTable){
		admin_single_done.dataTable.fnDestroy();
	}
	
	admin_single_done.dataTable=$('#singledone_dataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/task/exec/single/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "status",
				"value" : 3
			},aoData.push({
				"name" : 'userId',
				"value" : $.trim($('#done_userId').val())
			}), aoData.push({
				"name" : 'taskCode',
				"value" : $.trim($('#undone_taskCode').val())
			}), aoData.push({
				"name" : 'positionId',
				"value" : $.trim($('#positionId').val())
			}),aoData.push({
				"name" : 'beginTime',
				"value" : $.trim($('#done_beginTime').val())
			}),aoData.push({
				"name" : 'endTime',
				"value" : $.trim($('#done_endTime').val())
			}),aoData.push({
                "name" : 'beginCreateTime',
                "value" : $('#done_beginCreateTime').val()
            }),aoData.push({
                "name" : 'endCreateTime',
                "value" : $('#done_endCreateTime').val()
            }),aoData.push({
				"name" : 'custName',
				"value" : $.trim($('#done_custName').val())
			}));
		},
		"sServerMethod" : "post",
		"bServerSide" : true,
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
           { "mData": "custName","sWidth": "250px",'sClass':'text-center'},
           { "mData": "taskName","sWidth": "250px",'sClass':'text-center'},
           { "mData": "userName","sWidth": "100px",'sClass':'text-center'},
           { "mData": "dispatchTime","sWidth": "150px",
          	  "mRender" : function(data, type, row) {
 						return new Date(data).format('yyyy-MM-dd hh:mm:ss');
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
        },
 		"fnDrawCallback" : function() {
			//console.debug(this);
			//console.debug(oSettings.fnRecordsTotal());
			var oSettings = this.fnSettings();
			var iTotalRecords = oSettings.fnRecordsTotal();
			$("#done_taskno").html(iTotalRecords);

		}
	});
}


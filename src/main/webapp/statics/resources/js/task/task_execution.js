function init_all_undoneTask(){
	if(admin_all_undone.dataTable){
		admin_all_undone.dataTable.fnDestroy();
	}
	
	admin_all_undone.dataTable=$('#all_undone_dataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/task/exec/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "status",
				"value" : 1
			},aoData.push({
				"name" : 'taskCode',
				"value" : $.trim($('#undone_taskName').val())
			}),aoData.push({
				"name" : 'userId',
				"value" : $.trim($('#userId').val())
			}),aoData.push({
				"name" : 'positionId',
				"value" : $.trim($('#positionId').val())
			}),aoData.push({
				"name" : 'beginTime',
				"value" : $('#beginTime').val()
			}),aoData.push({
				"name" : 'endTime',
				"value" : $('#endTime').val()
			}),aoData.push({
				"name" : 'custName',
				"value" : $.trim($('#undone_custName').val())
			}),aoData.push({
                "name" : 'beginCreateTime',
                "value" : $('#beginCreateTime').val()
            }),aoData.push({
                "name" : 'endCreateTime',
                "value" : $('#endCreateTime').val()
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
					//prmt.dataTable.fnProcessingIndicator(false);
				}
			});
		}, 
		"aoColumns": [
		      { "mData": "","sWidth": "100px",'sClass':'text-center',
		    	  "mRender" : function(data, type, row) {
						return "<input type='checkbox' name='undoTaskId' class='group-checkable' value='"+row.worksheetId+"'>";
					} 
		      },
              { "mData": "custName","sWidth": "150px",'sClass':'text-center'},
              { "mData": "taskName","sWidth": "250px",'sClass':'text-center'},
              { "mData": "userName","sWidth": "150px"},
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
    			$("#undone_taskno").html(iTotalRecords);

    		}
	});
}

function init_all_undergoingTask(){
	if(admin_all_undergoing.dataTable){
		admin_all_undergoing.dataTable.fnDestroy();
	}
		
	admin_all_undergoing.dataTable=$('#all_undergoing_dataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/task/exec/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "status",
				"value" : 2
			}, aoData.push({
				"name" : 'taskCode',
				"value" : $.trim($('#undone_taskName').val())
			}),aoData.push({
				"name" : 'userId',
				"value" : $.trim($('#userId').val())
			}),aoData.push({
				"name" : 'userName',
				"value" : $.trim($('#undone_userName').val())
			}),aoData.push({
				"name" : 'beginTime',
				"value" : $('#beginTime').val()
			}),aoData.push({
				"name" : 'endTime',
				"value" : $('#endTime').val()
			}),aoData.push({
				"name" : 'positionId',
				"value" : $.trim($('#positionId').val())
			}),aoData.push({
				"name" : 'custName',
				"value" : $.trim($('#undone_custName').val())
			}),aoData.push({
                "name" : 'beginCreateTime',
                "value" : $('#beginCreateTime').val()
            }),aoData.push({
                "name" : 'endCreateTime',
                "value" : $('#endCreateTime').val()
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
					//prmt.dataTable.fnProcessingIndicator(false);
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
     		"fnDrawCallback" : function() {
    			var oSettings = this.fnSettings();
    			var iTotalRecords = oSettings.fnRecordsTotal();
    			$("#undergoing_taskno").html(iTotalRecords);
    		}
	});
}

/*全选*/
$('#selectAllUndoChk').click(function(){
    //$('#selectAllUndoChk').attr('checked', $('#selectAllUndoChk').attr('checked') ? true : false );  
	var checked=$('#selectAllUndoChk').attr('checked') ? true : false ;
    $.each($("input:checkbox[name='undoTaskId']"),function(i,item){
    	$(this).attr("checked",checked);
    });
   jQuery.uniform.update();
}); 
/*全选*/
$('#selectAllDoingChk').click(function(){
    //$('#selectAllUndoChk').attr('checked', $('#selectAllUndoChk').attr('checked') ? true : false );  
	var checked=$('#selectAllDoingChk').attr('checked') ? true : false ;
    $.each($("input:checkbox[name='doingTaskId']"),function(i,item){
    	$(this).attr("checked",checked);
    });
   jQuery.uniform.update();
}); 


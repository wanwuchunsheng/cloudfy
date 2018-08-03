admin = {};
jQuery(document).ready(function() {
	App.init();
	kinitDataTable();
	allUndoneDataTable();
    $("#dis_button").click(function() {
        kinitDataTable();
        allUndoneDataTable();
    });
	function _getIds() {
		var ids = [];
		$("input.checkboxes:checked").each(function() {
			ids.push($(this).val());
		});
		return ids;
	}
	//全选
	$('#selectAllChenkbox').click(function() {
		$("input.checkboxes").each(function(){
			if ($('#selectAllChenkbox').attr('checked')) {
				$(this).attr("checked", true);
			} else {
				$(this).attr("checked", false);
			}
		});
	});
	
});

function kinitDataTable() {
	$('#dataTable').dataTable().fnDestroy();
	admin.dataTable=$('#dataTable').on( 'processing.dt', function (e, settings, processing) {
		if ($('#selectAllChenkbox').attr('checked')) {
			$('#selectAllChenkbox').removeAttr('checked');
			$('#selectAllChenkbox').parent().removeClass('checked');
		}
    }).dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/workSheetFlow/getCandidateTaskList.json',
		"fnServerParams" : function(aoData) {
			 aoData.push({
	                "name" : "priority",
	                "value" : $('#priority').val()
	            },{
	                "name" : "createTime",
	                "value" : $('#createTime').val()
	            },{
	                "name" : "updateTime",
	                "value" : $('#updateTime').val()
	            }
	            );
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
		}],
		"fnServerData" : function(sSource, aoData, fnCallback) {
			$.ajax({
				"dataType" : 'json',
				"type" : "POST",
				"url" : sSource,
				"data" : aoData,
				"success" : fnCallback,
				"timeout" : 3000000,
				"error" : function handleAjaxError(xhr, textStatus, error) {
					if (textStatus === "timeout") {
						$.Alert("连接超时!请稍后再试!!!");
					} else if (textStatus == "error") {
						$.Alert("系统繁忙!!!,请稍后再试!!!");
					}
					prmt.dataTable.fnProcessingIndicator(false);
				}
			});
		}, 
		"aoColumns": [{
			"mData" : "id",
			"mRender" : function(data, type, row) {
				if (data) {
					return "<input  type='checkbox' sheetId='"+row.workSheetId+"' wsStatus ='"+ row.status +"' value='"+data+"' class='checkboxes' />";
				}
			}
		},
		{
			"mData" : "pid",
			"sWidth" : "100px",
			'sClass' : 'text-center'
		},
		{
			"mData" : "name",
			"sWidth" : "100px",
			'sClass' : 'text-center'
		}, 
		{
			"mData" : "createTime",
			"sWidth" : "150px",
			'sClass' : 'text-center'
		}, 
        {
            "mData" : "status",
            "sWidth" : "100px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "sheetTypeName",
            "sWidth" : "150px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "sheetNo",
            "sWidth" : "150px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "priority",
            "sWidth" : "150px",
            'sClass' : 'text-center',
            "mRender" : function(data, type, row) {
              if (data) {
            	  var htmRowVar;
            	  if(row.priority == "高"){
            		  htmRowVar = "<span class='red'>高</span>"
                  }else if(row.priority == "中"){
                	  htmRowVar = "<span>中</span>"
                  }else if(row.priority == "低"){
                	  htmRowVar = "<span>低</span>"
                  }else {
                	  htmRowVar = "<span></span>"
                  }
            	  return htmRowVar;
              }
            }
        },
        {
            "mData" : "pid",
            "sWidth" : "250px",
            "mRender" : function(data, type, row) {
//                var labelName = row.status =="待处理"? "签收":"分配";
//                "<a href='javascript:void(0);' class='btn blue'  wsStatus='"+ row.status+"' flTaskId='"+row.id+"' " 
//                +   "  onclick='taskClaimOrDistribution(" + this + ");'>"+labelName+"</a>"
                if (data) {
                    var htmVar = "<a href='javascript:void(0);' class='btn blue'  onclick='showInstanceProcessImg(" + row.pid + ");'>流程查看</a>"
                    + "<a href='javascript:void(0);' class='btn red' onclick='showProcessIntanceHistoryImg(" + row.pid + ");'>流程历史查看</a>";
                    if (row.status =="处理中") {
                        var handleBtn = "<a href='javascript:void(0);' class='btn blue'  wsStatus='"+ row.status+"' flTaskId='"+row.id+"' " 
                            +   "  onclick='taskAssignee(" + row.sheetTypeId + "," + row.id + ","+row.pid+");'>处理</a>";
                        return handleBtn + htmVar;
                    }
                    
                    return htmVar;
                }
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
		},"sDom": 'l<"table-toolbar margin-top-10">frtip',
		"fnRowCallback": function ( nTr, asData, iDrawIndex, iDataIndex ) {
            if(asData.priority == "高"){
                $(nTr).removeClass().addClass('warning');
            }
            var oSettings = this.fnSettings();
            var iTotalRecords = oSettings.fnRecordsTotal();
            $("#undone_taskno1").html(iTotalRecords);
            return nTr;
        },
         
		"fnInitComplete": function(oSettings, json) {
                $('.dataTables_length select').addClass("form-control input-sm");
                $('.dataTables_filter input').addClass("form-control input-medium");
            }
	});
}

function allUndoneDataTable() {
    $('#all_undone_dataTable').dataTable().fnDestroy();
    admin.dataTable=$('#all_undone_dataTable').on( 'processing.dt', function (e, settings, processing) {
        
    }).dataTable({
        "bFilter" : false,
        "bSort" : false, 
        "bProcessing" : true,
        "sAjaxSource" : contextPath + '/workSheetFlow/getAssigneeTaskList.json',
        "fnServerParams" : function(aoData) {
             aoData.push({
                    "name" : "priority",
                    "value" : $('#priority').val()
                },{
                    "name" : "createTime",
                    "value" : $('#createTime').val()
                },{
                    "name" : "updateTime",
                    "value" : $('#updateTime').val()
                }
                );
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
        }],
        "fnServerData" : function(sSource, aoData, fnCallback) {
            $.ajax({
                "dataType" : 'json',
                "type" : "POST",
                "url" : sSource,
                "data" : aoData,
                "success" : fnCallback,
                "timeout" : 3000000,
                "error" : function handleAjaxError(xhr, textStatus, error) {
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
            "mData" : "pid",
            "sWidth" : "100px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "name",
            "sWidth" : "100px",
            'sClass' : 'text-center'
        }, 
        {
            "mData" : "createTime",
            "sWidth" : "150px",
            'sClass' : 'text-center'
        }, 
        {
            "mData" : "status",
            "sWidth" : "100px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "sheetTypeName",
            "sWidth" : "150px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "sheetNo",
            "sWidth" : "150px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "priority",
            "sWidth" : "150px",
            'sClass' : 'text-center',
            "mRender" : function(data, type, row) {
              if (data) {
                  var htmRowVar;
                  if(row.priority == "高"){
                      htmRowVar = "<span class='red'>高</span>"
                  }else if(row.priority == "中"){
                      htmRowVar = "<span>中</span>"
                  }else if(row.priority == "低"){
                      htmRowVar = "<span>低</span>"
                  }else {
                      htmRowVar = "<span></span>"
                  }
                  return htmRowVar;
              }
            }
        },
        {
            "mData" : "pid",
            "sWidth" : "250px",
            "mRender" : function(data, type, row) {
//                var labelName = row.status =="待处理"? "签收":"分配";
//                "<a href='javascript:void(0);' class='btn blue'  wsStatus='"+ row.status+"' flTaskId='"+row.id+"' " 
//                +   "  onclick='taskClaimOrDistribution(" + this + ");'>"+labelName+"</a>"
                if (data) {
                    var htmVar = "<a href='javascript:void(0);' class='btn blue'  onclick='showInstanceProcessImg(" + row.pid + ");'>流程查看</a>"
                    + "<a href='javascript:void(0);' class='btn red' onclick='showProcessIntanceHistoryImg(" + row.pid + ");'>流程历史查看</a>";
                    if (row.status =="处理中") {
                        var handleBtn = "<a href='javascript:void(0);' class='btn blue'  wsStatus='"+ row.status+"' flTaskId='"+row.id+"' " 
                            +   "  onclick='taskAssignee(" + row.sheetTypeId + "," + row.id + ","+row.pid+");'>处理</a>";
                        return handleBtn + htmVar;
                    }
                    
                    return htmVar;
                }
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
        },"sDom": 'l<"table-toolbar margin-top-10">frtip',
        "fnRowCallback": function ( nTr, asData, iDrawIndex, iDataIndex ) {
            if(asData.priority == "高"){
                $(nTr).removeClass().addClass('warning');
            }
            var oSettings = this.fnSettings();
            var iTotalRecords = oSettings.fnRecordsTotal();
            $("#undone_taskno2").html(iTotalRecords);
            return nTr;
        },
        "fnInitComplete": function(oSettings, json) {
                $('.dataTables_length select').addClass("form-control input-sm");
                $('.dataTables_filter input').addClass("form-control input-medium");
            }
    });
}



function taskClaim() {
    var cbx = $("#dataTable>tbody :checked"),taskIds= "";sheetIds = "";
   
    if (cbx.length < 1){
        $.Alert("请选择要处理的任务!");
        return ;
    }
    var bool = false ;
    cbx.each(function(i,o){ 
        taskIds += $(o).val() + ',';
        sheetIds += $(o).attr("sheetId")+ ','
        if ($(o).attr("wsStatus") != "待处理"){
            bool = true;
            return;
        }
    });
    if(bool) {
        $.Alert("请选择任务状态为待处理的任务!");
        return ;
    }
     
    taskIds = taskIds.substring(0 , taskIds.length -1); 
    sheetIds = sheetIds.substring(0 , sheetIds.length -1); 
    
    $.ajax({ 
        type : "POST",
        url : "/workSheetFlow/taskClaim.json",
        data : {
            taskIds :taskIds,
            sheetIds:sheetIds 
        },
        success : function(json) {
            if ( json === "undefind" || json == null) {
                $.Alert("签收操作错误!");
                return;
            }
            if (json.code == 2) {
                $.Alert("签收操作错误!");
                return;
            }
            $.Alert("签收操作成功!");
            $('#dataTable').dataTable().fnDraw();
            $('#all_undone_dataTable').dataTable().fnDraw();
        }
    }, "json");
    
} 

function taskDistribution() {
    var cbx = $("#dataTable>tbody :checked"),taskIds= "";
    var userId =  $("#flowUserId").val();
    if (userId == "") {
        $.Alert("请选择分配人员!");
        return ;
    }
    if (cbx.length < 1){
        $.Alert("请选择要处理的任务!");
        return ;
    }
    var bool = false ;
    cbx.each(function(i,o){ 
        taskIds += $(o).val() + ',';
        if ($(o).attr("wsStatus") != "处理中"){
            bool = true;
            return;
        }
    });
    if (bool) {
        $.Alert("请选择任务状态为处理中的任务!");
        return;
    }
    
    taskIds = taskIds.substring(0 , taskIds.length -1); 
    
    
    $.ajax({ 
        type : "POST",
        url : "/workSheetFlow/taskComplete.json",
        data : {
            taskIds :taskIds,
            userId : userId
        },
        success : function(json) {
            if ( json === "undefind" || json == null) {
                $.Alert("分配操作错误!");
                return;
            }
            if (json.code == 2) {
                $.Alert("分配操作错误!");
                return;
            }
            $.Alert("分配操作成功!");
            $('#dataTable').dataTable().fnDraw();
            $('#all_undone_dataTable').dataTable().fnDraw();
        }
    }, "json");
}

function taskAssignee(typeId,id,pid) {
    //location.href = "/workSheet/toShowByProcInst.htm?workSheetType=1&taskId="+id+"&pid="+pid;
    parent.mainTab.showTab( "/workSheet/toShowByProcInst.htm?workSheetType="+typeId+"&taskId="+id+"&pid="+pid, '流程处理' );
} 



function showInstanceProcessImg(id) {
	//location.href = contextPath + "/flow/showInstanceProcessImg.htm?processInstanceId=" + id;
    parent.mainTab.showTab( contextPath + "/flow/showInstanceProcessImg.htm?processInstanceId=" + id, '流程查看' );

}

function showProcessIntanceHistoryImg(id) {
	//location.href = contextPath + "/flow/showProcessIntanceHistoryImg.htm?processInstanceId=" + id;
    parent.mainTab.showTab( contextPath + "/flow/showProcessIntanceHistoryImg.htm?processInstanceId=" + id, '流程历史查看' );
}


//选择人员窗口 ==================================================================
$(function(){
    $("#goChoiceModal").bind("click",function() {
        var choiceModal = $("#choiceModal"); 
        choiceModal.load("/workSheetFlow/goChoiceAccount.htm", function(){
            choiceModal.modal();
        });
    });
})
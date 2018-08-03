function queryPersonalSchedule() {
	$('#personal_dataTable').dataTable().fnDestroy();
	personal_admin.dataTable=$('#personal_dataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/schedule/personal/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "year",
				"value" :$('#year').val()
			});
			aoData.push({
				"name" : "month",
				"value" :$('#month').val()
			});
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
           { "mData": "formattedScheduleDay","sWidth": "150px",'sClass':'text-center'},
           { "mData": "description","sWidth": "100px",'sClass':'text-center'},
           { "mData": "formattedFromTime","sWidth": "100px",'sClass':'text-center',
        	   "mRender" : function(data, type, row) {
					if (data) {
						return (data == '00:00') ? "" : data;
					}
				}},
           { "mData": "formattedEndTime","sWidth": "250px",'sClass':'text-center',
        	   "mRender" : function(data, type, row) {
					if (data) {
						return (data == '00:00') ? "" : data;
					}
				}}
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

function queryManagerSchedule() {
	var agentId = $('#agentId').val();
	$('#manager_dataTable').dataTable().fnDestroy();
	manager_admin.dataTable=$('#manager_dataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/schedule/manager/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "beginTime",
				"value" :$('#beginTime').val()
			});
			aoData.push({
				"name" : "endTime",
				"value" :$('#endTime').val()
			});
			aoData.push({
				"name" : "agentId",
				"value" : agentId
			});
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
           { "mData": "userName","sWidth": "200px",'sClass':'text-center',
        	 "mRender" : function(data, type, row) {
					return row.agentId + '【' + data + '】';
		   }},
           { "mData": "mon","sWidth": "100px",'sClass':'text-center',
			 "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
				 $(nTd).css('background-color', oData.mon.color);
			 },
			 "mRender" : function(data, type, row) {
					return data.desc;
		   }},
           { "mData": "tue","sWidth": "100px",'sClass':'text-center',
			 "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
				 $(nTd).css('background-color', oData.tue.color);
		     },  
  			 "mRender" : function(data, type, row) {
				 return data.desc;
		   }},
           { "mData": "wed","sWidth": "100px",'sClass':'text-center',
			 "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
				 $(nTd).css('background-color', oData.wed.color);
			 },
  			 "mRender" : function(data, type, row) {
					return data.desc;
		   }},
           { "mData": "thurs","sWidth": "100px",'sClass':'text-center',
			 "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
			     $(nTd).css('background-color', oData.thurs.color);
			 },
  			 "mRender" : function(data, type, row) {
					return data.desc;
		   }},
           { "mData": "fri","sWidth": "100px",'sClass':'text-center',
			 "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
				 $(nTd).css('background-color', oData.fri.color);
			 },
  			 "mRender" : function(data, type, row) {
					return data.desc;
		   }},
           { "mData": "sat","sWidth": "100px",'sClass':'text-center',
			 "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
				 $(nTd).css('background-color', oData.sat.color);
			 },
  			 "mRender" : function(data, type, row) {
					return data.desc;
		   }},
           { "mData": "sun","sWidth": "100px",'sClass':'text-center',
			 "fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
				 $(nTd).css('background-color', oData.sun.color);
			 },
  			 "mRender" : function(data, type, row) {
					return data.desc;
		   }}
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
/******************列表结束*******************/
admin = {};
jQuery(document).ready(function() {
	App.init();
	kinitDataTable();
	
	$("#submit_button").click(function() {
		kinitDataTable();
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
		"sAjaxSource" : contextPath + '/flow/queryProcessInstanceTypePage.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "name",
				"value" : $('#name').val()
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
			"mData" : "procInstId",
			"mRender" : function(data, type, row) {
				if (data) {
					return "<input  type='checkbox' value='"+data+"' class='checkboxes' />";
				}
			}
		},
		{
			"mData" : "procInstId",
			"sWidth" : "100px",
			'sClass' : 'text-center'
		},
		{
			"mData" : "",
			"sWidth" : "100px",
			'sClass' : 'text-center'
		},
		{
			"mData" : "startTime",
			"sWidth" : "150px",
			'sClass' : 'text-center',
			"mRender" : function(data, type, row) {
				if (data) {
					return new Date(data).format('yyyy-MM-dd');
				}
			}
		},
		{
			"mData" : "createName",
			"sWidth" : "100px",
			'sClass' : 'text-center'
		},
		{
			"mData" : "assignee",
			"sWidth" : "100px",
			'sClass' : 'text-center'
		},
		{
			"mData" : "name",
			"sWidth" : "100px",
			'sClass' : 'text-center'
		},
		{
			"mData" : "priority",
			"sWidth" : "100px",
			'sClass' : 'text-center'
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
		"fnInitComplete": function(oSettings, json) {
                $('.dataTables_length select').addClass("form-control input-sm");
                $('.dataTables_filter input').addClass("form-control input-medium");
            }
	});
}

function flowDetail(id) {
	location.href = contextPath + "/flow/check/list.htm?id=" + id;
}

function showInstanceProcessImg(id) {
	location.href = contextPath + "/flow/showInstanceProcessImg.htm?processInstanceId=" + id;
}

function showProcessIntanceHistoryImg(id) {
	location.href = contextPath + "/flow/showProcessIntanceHistoryImg.htm?processInstanceId=" + id;
}


admin = {};
jQuery(document).ready(function() {
	App.init();
	$("select").select2();
	$('#datatable').dataTable().fnDestroy();
	admin.dataTable = $('#datatable').dataTable({
		"bFilter" : false,
		"bSort" : false,
		"bProcessing" : true,
		"sAjaxSource" : 'queryAuditNotPassByPage.json',
		"fnServerParams" : "",
		"sServerMethod" : "post",
		"bServerSide" : true,
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
				"error" : function handleAjaxError(xhr, textStatus, error) {
					if (textStatus === "timeout") {
						$.Alert("连接超时!请稍后再试!!!");
					} else if (textStatus == "error") {
						$.Alert("系统繁忙!!!,请稍后再试!!!");
					}
				}
			});
		},
		"aoColumns" : [ {
			"mData" : "reason_group_name"
		},{
            "mData" : "reason",
            "mRender":function(data,type,row){
                data=data.length>20 ? '<label title="'+data+'">'+data.substring(0,20)+'......</label>': data;
                return data;
            }
        }, {
			"mData" : "task_name"
		}, {
			"mData" : "service_type",
			"mRender" : function(data, type, row) {
				if (admin_.serviceType["" + data]) {
					return admin_.serviceType["" + data];
				} else {
					return data;
				}
			}
		} ],
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
});
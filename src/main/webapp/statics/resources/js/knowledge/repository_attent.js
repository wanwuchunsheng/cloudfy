admin = {};
jQuery(document).ready(function() {
	App.init();
	$("#submit_btn").click(function() {
		initDataTable();
	});
	initDataTable();
});
function initDataTable() {
	$('#table_s1').dataTable().fnDestroy();
	admin.dataTable = $('#table_s1').dataTable({
		"bFilter" : false,
		"bSort" : false,
		"bProcessing" : true,
		"sAjaxSource" : contextPath	+ '/knowledge/collections/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "title",
				"value" : $.trim($('#favoriteTitle').val())
			});
		},
		"sServerMethod" : "post",
		"bServerSide" : true,
		"bLengthChange" : false,
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
		"aoColumns" : [
				{
					"mData" : "kbFileStrname",
					"sWidth" : "150px",
					'sClass' : 'text-center',
					"mRender" : function(data, type, row) {
						if (data) {
							return "<a href='javascript:void(0)' onclick='attentEdit("+ row.relationId+ ")'>"+ data + "</a>";
						}
					}
				},
				{
					"mData" : "kbFileTypeName",
					"sWidth" : "150px",
					'sClass' : 'text-center'
				},
				{
					"mData" : "kbFileEndTime",
					"sWidth" : "150px",
					'sClass' : 'text-center',
					"mRender" : function(data, type, row) {
						if (data) {
							return new Date(data).format('yyyy-MM-dd');
						}
					}
				},
				{
					"mData" : "createTime",
					"sWidth" : "150px",
					'sClass' : 'text-center',
					"mRender" : function(data, type, row) {
						if (data) {
							return new Date(data).format('yyyy-MM-dd');
						}
					}
				},
				{
					"mData" : "id",
					"sWidth" : "100px",
					"mRender" : function(data, type, row) {
						if (data) {
							return "<a href='javascript:void(0);' class='btn blue' onclick='javascript:cancelFavorite("+row.relationId+")'>取消收藏</a>";
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
		},
		"sDom" : 'l<"table-toolbar margin-top-10">frtip',
		"fnInitComplete" : function(oSettings, json) {
			$('.dataTables_length select').addClass("form-control input-sm");
			$('.dataTables_filter input').addClass("form-control input-medium");
		}
	});

}
function attentEdit(relationId) {
	location.href = contextPath + "/knowledge/detail.htm?id=" + relationId;
}
// 删除
function cancelFavorite(relationId) {
	$.ajax({
		url : contextPath + '/knowledge/collections/cancelFavorite.json',
		data : {
			"relationId" : relationId
		},
		dataType : 'json',
		type : 'post',
		success : function(data) {
			if (data) {
				$.Alert("取消收藏成功");
				initDataTable();
			} else {
				$.Alert("网络异常，请稍候再试");
			}
		}
	});
}
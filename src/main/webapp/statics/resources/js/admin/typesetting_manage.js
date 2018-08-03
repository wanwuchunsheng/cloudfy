admin={};
jQuery(document).ready(function() {
	App.init();
	$("select.form-control").select2();
	//联动日历
	$('.date-picker').datepicker({
		language : "zh-CN",
		rtl : App.isRTL(),
		autoclose : true,
		format : "yyyy-mm-dd"
	});
	$("#submit_button").click(function() {
	   initDataTable();
	});
	initDataTable();
   
	$('#importSchedule').click(function() {
		var createAjax = $("#myModalImport");
	    createAjax.empty();
		createAjax.modal({
			backdrop:'static',
	        keyboard: false
		});
		createAjax.modal("show");
		createAjax.load(contextPath + "/schedule/mgr/viewImport.json", function() {

		});
	});
});

/******************列表开始*******************/
//删除
function deleteId(id){
	$.ajax({
		url: '../admin/person/delete.json',
		data:{
			"id":id
		},
		dataType:json,
		type:'post'
	});
	initDataTable();
}

function initDataTable() {
	$('#dataTable').dataTable().fnDestroy();
	admin.dataTable=$('#dataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/schedule/mgr/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "agentId",
				"value" : $('#agentId').val()
			});
			aoData.push({
				"name" : "beginTime",
				"value" :$('#startTime').val()
			});
			aoData.push({
				"name" : "endTime",
				"value" :$('#endTime').val()
			});
		},
		"sServerMethod" : "post",
		"bServerSide" : true,
		"bLengthChange": false,
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
           { "mData": "agentId","sWidth": "150px",'sClass':'text-center'},
           { "mData": "fromTime","sWidth": "100px",'sClass':'text-center',
        	   "mRender" : function(data, type, row) {
					if (data) {
						if (new Date(data).format('hh:mm') == '00:00') {
							return "";
						} else {
							return new Date(data).format('yyyy-MM-dd hh:mm:ss');
						}
					}
				}
           },
           { "mData": "toTime","sWidth": "100px",'sClass':'text-center',
        	   "mRender" : function(data, type, row) {
					if (data) {
						if (new Date(data).format('hh:mm') == '00:00') {
							return "";
						} else {
							return new Date(data).format('yyyy-MM-dd hh:mm:ss');
						}
					}
				}
           },
           { "mData": "description","sWidth": "250px",'sClass':'text-center'}
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
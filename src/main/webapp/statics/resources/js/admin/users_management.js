admin1 = {};
jQuery(document).ready(function(){
	App.init();	
	initDataTable();
	
	$('#addUserBtn').click(function(){
		var id = 1; //checkbox value
		addUsers(id);
		return false;
	});
	
	initPosition();
	
	
	function _getIds() {
		var ids = [];
		$("input.checkboxes:checked").each(function() {
			ids.push($(this).val());
		});
		return ids;
	}
	
	$('#deleteUserBtn').click(function() {		
		var ids = _getIds() + '';
		if(ids.length > 0){
		}else{
			$.Alert("请选择数据!");
			return false;
		}
		$.Confirm("确认删除?","",function(){
			$.ajax({
				url: contextPath + "/admin/user/delete.json",
				type: "post",
				dataType: "json",
				data: {
					ids : ids
				},
				success: function(data){
					if (data) {
						if (data.done) {
							$.Alert('删除成功');
							initDataTable();
							initPosition();
							window.location.reload();
						} else {
							$.Err(data.msg);
						}
					}
				}
			});
		});
		return false;
	});
	
	$('#updateUserBtn').click(function() {		
		var ids = _getIds();
		if(ids.length >1){
			$.Alert("请选择一条数据数据!");
			return false;
		}else if(ids.length ==0){
			$.Alert("请选择数据!");
			return false;
		}
		
		var createAjax = $("#updateUsersById");
	    createAjax.empty();
		createAjax.modal({
			backdrop:'static',
	        keyboard:false
		});
		createAjax.modal("show");
		createAjax.load(contextPath + "/admin/user/viewUpdate.json?id=" + ids[0], function() {
		});
	});
	
	
	$('#backHistory').click(function() {
		location.href = contextPath + "/admin/department/back.htm?backDeptId="+ deptId;
	});
	
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

function initPosition() {
	$.ajax({
		url: contextPath + "/admin/user/queryPosition.json",
		type: "post",
		dataType: "json",
		data: {
			id : positionId
		},
		success: function(data){
			if (data) {
				if (data.done) {
					$('#positionInfo').find('tbody').html("\
							<tr>\
							<td>" +data.data.deptName+ "</td>\
							<td>" +data.data.id+ "</td>\
							<td>" +data.data.name+ "</td>\
							<td>" +data.data.parentName+ "</td>\
							<td>" +data.data.planNumber+ "</td>\
							<td>" +data.data.personNumber+ "</td>\
							</tr>\
					");
				} else {
					$.Err(data.msg);
				}
			}
		}
	});
}
/******************列表开始*******************/
function updateUsers(id,departmentId,positionId){
	//alert(id);
	var createAjax = $("#updateUsersById");
    createAjax.empty();
	createAjax.modal({
		backdrop:'static',
        keyboard:false
	});
	createAjax.modal("show");
	createAjax.load(contextPath + "/admin/user/viewUpdate.json?id=" + id, function() {
	});
}
function addUsers(id){	
	var createAjax = $("#addUsers");
    createAjax.empty();
	createAjax.modal({
		backdrop:'static',
        keyboard:false
	});
	createAjax.modal("show");
	createAjax.load(contextPath + "/admin/user/viewAdd.json?id=" + id, function() {

	});
}

function initDataTable() {	
	$('#dataTable2').dataTable().fnDestroy();
	admin1.dataTable = $('#dataTable2').on( 'processing.dt', function (e, settings, processing) {
		if ($('#selectAllChenkbox').attr('checked')) {
			$('#selectAllChenkbox').removeAttr('checked');
			$('#selectAllChenkbox').parent().removeClass('checked');
		}
    }).dataTable({
		"bFilter" : false,
		"bSort" : false,
		"bProcessing" : true,
		"sAjaxSource" : contextPath	+ '/admin/user/queryPersonVo.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "departmentId",
				"value" : deptId
			}, aoData.push({
				"name" : 'positionId',
				"value" : positionId
			}));
		},
		"sServerMethod" : "post",
		"bServerSide" : true,
		"aLengthMenu" : [ [ 5, 10, 20 ],
				[ 5, 10, 20 ] ],
		"iDisplayLength" : 20,
		"sPaginationType" : "bootstrap",
		"aaSorting" : [ [ 9, "asc" ] ],
		"aoColumnDefs" : [ {
			"sDefaultContent" : '',
			"aTargets" : [ "_all" ]
		} ],
		"fnServerData" : function(sSource,
				aoData, fnCallback) {
					$.ajax({
						"dataType" : 'json',
						"type" : "POST",
						"url" : sSource,
						"data" : aoData,
						"success" : fnCallback,
						"timeout" : 3000000,
						"error" : function handleAjaxError(
								xhr,
								textStatus,
								error) {
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
					"mData" : "id",
					"sWidth" : "60px",
					"mRender" : function(
							data, type, row) {
						if (data) {
							return "<input type='checkbox' value='"+data+"'  class='checkboxes' />";
						}
					}
				},
				{
					"mData" : "agentId",
					"sWidth" : "80px"
					
				},
				{
					"mData" : "name",
					"sWidth" : "100px"
					
				},
//				{
//					"mData" : "deptId",
//					"sWidth" : "120px"
//				},
				{
					"mData" : "deptName",
					"sWidth" : "120px"
				},
				{
					"mData" : "positionName",
					"sWidth" : "120px",
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
		},
		"sDom" : 'l<"table-toolbar margin-top-10">frtip',
		"fnInitComplete" : function(oSettings, json) {
			$('.dataTables_length select').addClass("form-control input-sm");
			$('.dataTables_filter input').addClass("form-control input-medium");
			$('#selectAllChenkbox').attr("checked", false);
		}
	});	
}


/*****************列表结束*******************/
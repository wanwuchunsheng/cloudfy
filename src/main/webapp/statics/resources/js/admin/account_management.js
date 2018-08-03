admin={};
jQuery(document).ready(function() {
	App.init();
	$("select.form-control").select2();
	$("#submit_button").click(function() {
		var treeObj = $.fn.zTree.getZTreeObj("departmentTree");
		var deptId = treeObj.getSelectedNodes()[0].id;
		initDataTable(deptId);
	});
   initDataTable(1);
   loadTree();
   
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
   
	$('#resetBtn').click(function() {
		reset();
	});
});

/********************树形结构开始********************/
var zNodes = [];

//树参数
var setting = {
	data : {
		key : {
			// title : "t"
			name : "deptName"
		},
		simpleData : {
			enable : true,
			idKey : "id",
			pIdKey : "deptNo",

		},
		veiw:{
			expandSpeed: ""
		}
	},
	callback : {
		onClick : treeNodeOnClick
	}
};

//加载树的内容
function loadTree() {
	$.ajax({
		dataType : "json",
		type : "POST",
		url : contextPath + "/admin/department/query.json",
		data : {},
		timeout : 5000,
		error : function handleAjaxError(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.Alert("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.Alert("系统繁忙,请稍后再试", null);
			}
		},
		success : function(data) {
			if (data) {
				zNodes = data;
				$.fn.zTree.init($("#departmentTree"), setting, zNodes);
				var treeObj = $.fn.zTree.getZTreeObj("departmentTree");
				treeObj.expandAll(true);
				var node = treeObj.getNodeByParam('id', 1, null);
				treeObj.selectNode(node);
				//$('#'+node.id+'_span').click();

				initPosition('cBrand', node.id, true, '请选择');
			} else {
				$.Alert("结构载入出错", null);
			}
		}
	});
}

//树的onClick事件
function treeNodeOnClick(event, treeId, node, clickFlag) {
	var deptId = node.id;
	initPosition('cBrand', node.id, true, '');
	initDataTable(deptId);
}

/********************树形结构结束********************/

/******************列表开始*******************/
function updateUsers(id){
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


//删除 
function removeUser(id){
	$.Confirm("确认删除此数据?","",function() {
	$.ajax({
       url: contextPath+'/admin/user/delete.json',
       type: "post",
       dataType: "json",
       data: {
    	   ids : id
       },
       success: function(data){	
         if (data) {
         	if (data.done) {         		
         		$.Alert("删除成功!");
         		var treeObj = $.fn.zTree.getZTreeObj("departmentTree");
        		var deptId = treeObj.getSelectedNodes()[0].id;
        		initDataTable(deptId);
         	} else {
         		$.Err(data.msg);
         	}
         }
       }
	});
	});
}


//重置密码
function reset() {
	var ids = [];
	$("input.checkboxes:checked").each(function(index,data) {
		ids.push($(data).val());
	});
	
	if(ids.length == 0){
		$.Alert("请选择用户!");
		return false;
	}
	ids = ids + '';
	$.ajax({
       url: contextPath+'/admin/user/reset.json',
       type: "post",
       dataType: "json",
       data: {
    	   ids:ids
       },
       success: function(data){
         if (data) {
         	if (data.done) {
         		$.Alert("重置成功!");
         	} else {
         		$.Err(data.msg);
         	}
         }
       }
	});
}
//锁定	
function disableUser(id){
	$.ajax({
       url: contextPath+'/admin/user/lock.json',
       type: "post",
       dataType: "json",
       data: {
    	   ids : id
       },
       success: function(data){
         if (data) {
         	if (data.done) {
         		var treeObj = $.fn.zTree.getZTreeObj("departmentTree");
        		var deptId = treeObj.getSelectedNodes()[0].id;
        		initDataTable(deptId);
         	} else {
         		$.Err(data.msg);
         	}
         }
       }
	});
}
//解锁
function enableUser(id){
	$.ajax({
       url: contextPath+'/admin/user/unlock.json',
       type: "post",
       dataType: "json",
       data: {
    	   ids : id
       },
       success: function(data){
         if (data) {
         	if (data.done) {
         		var treeObj = $.fn.zTree.getZTreeObj("departmentTree");
        		var deptId = treeObj.getSelectedNodes()[0].id;
        		initDataTable(deptId);
         	} else {
         		$.Err(data.msg);
         	}
         }
       }
	});
}

function initDataTable(deptId) {
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
		"sAjaxSource" : contextPath + '/admin/user/queryPersonVo.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "agentId",
				"value" : $.trim($('#agentId').val())
			},
			aoData.push({
				"name" : "departmentId",
				"value" : deptId
			}),
			aoData.push({
				"name" : "positionId",
				"value" : $('#cBrand option:selected').val()
			}),
			aoData.push({
				"name" : "name",
				"value" : $.trim($('#name').val())
			})	
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
           { "mData": "id","sWidth": "40px",
                   "mRender" : function(data, type, row) {
						if(data){
							return "<input type='checkbox' class='checkboxes' value='" + data + "'/>";
						}
					}
           },
           { "mData": "agentId","sWidth": "150px",'sClass':'text-center'},
           { "mData": "agentId","sWidth": "150px",'sClass':'text-center'},
           { "mData": "name","sWidth": "150px",'sClass':'text-center'},
           { "mData": "deptName","sWidth": "100px",'sClass':'text-center'},
           { "mData": "positionName","sWidth": "100px",'sClass':'text-center'},
           { "mData": "id","sWidth": "300px",
        	   "mRender" : function(data, type, row) {
					if(data){
						var link = "<a href='javascript:void(0);' class='btn blue' onclick='updateUsers("+row.id+");'>修改</a> ";
						if (row.status == 0) {
							link += "<a href='javascript:void(0);' class='btn blue' onclick='javascript:disableUser("+row.id+")'>禁用</a> ";
						} else if (row.status == 1) {
							link += "<a href='javascript:void(0);' class='btn blue' onclick='javascript:enableUser("+row.id+")'>启用</a> ";
						}
						return link + "<a href='javascript:void(0);' class='btn red' onclick='javascript:removeUser("+row.id+")'>删除</a>";
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
		"fnInitComplete": function(oSettings, json) {
                $('.dataTables_length select').addClass("form-control input-sm");
                $('.dataTables_filter input').addClass("form-control input-medium");
            }
	});
 }
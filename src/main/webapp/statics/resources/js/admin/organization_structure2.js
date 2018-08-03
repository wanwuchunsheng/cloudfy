admin = {};
jQuery(document).ready(function() {
	App.init(); // initlayout and core plugins
	// TableManaged.init();
	// $("select.form-control").select2();

	// 联动日历
	// $('.date-picker').datepicker({
	// language:"zh-CN",
	// rtl: App.isRTL(),
	// autoclose: true,
	// format:"yyyy-mm-dd"
	// });
	$("#submit_button").click(function() {
		var treeObj = $.fn.zTree.getZTreeObj("departmentTree");		
		var deptId = treeObj.getSelectedNodes()[0].id;
		var name = $.trim($('#orgName').val());
		initDataTable(deptId, name);
	});
	if (backDeptId != '') {
		loadTree(backDeptId);
	} else {
		loadTree();
	}
	
	$('#positionAdd').click(function() {
		var createAjax = $("#myModalAdd");
	    createAjax.empty();
		createAjax.modal({
			backdrop:'static',
	        keyboard: false
		});
		createAjax.modal("show");
		createAjax.load(contextPath + "/admin/department/position/viewAdd.json", function() {

		});
	});
	
	function _getIds() {
		var ids = [];
		$("input.checkboxes:checked").each(function() {
			ids.push($(this).val());
		});
		return ids;
	}
	
	$('#deletePositions').click(function(){
		var ids = _getIds() + '';
		if(ids.length > 0){
		}else{
			$.Alert("请选择数据!");
			return false;
		}
		$.Confirm("确认删除此数据?","",function() {
			$.ajax({
		       url: contextPath + "/admin/department/position/delete.json",
		       type: "post",
		       dataType: "json",
		       data: {
				 ids : ids
		       },
		       success: function(data){
		         if (data) {
		         	if (data.done) {
		         		var treeObj = $.fn.zTree.getZTreeObj("departmentTree");		
						var deptId = treeObj.getSelectedNodes()[0].id;
						var name = $.trim($('orgName').val());
						initDataTable(deptId, name);	         		
		         	} else {
		         		$.Err(data.msg);
		         	}
		         }
		       }
			});
		});
		return false;
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

/********************树形结构开始********************/
var zNodes = [];

//树参数
var setting = {
	view: {
		removeHoverDom: removeHoverDom,
		selectedMulti: false
	},
	edit: {
		enable: false,
		editNameSelectAll: true,
		removeTitle: "删除",
		renameTitle: "编辑"
	},
	data : {
		key : {
			name : "deptName"
		},
		simpleData : {
			enable : true,
			idKey : "id",
			pIdKey : "deptNo",
		}
	},
	callback: {
		beforeRemove: beforeRemove,
		beforeRename: beforeRename,
		onRename: onRename,
		onClick : treeNodeOnClick,
		onDrop : treeNodeOnDrop
	}
};

function beforeRename(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("departmentTree");
	zTree.selectNode(treeNode);
	return true;
}
function beforeRemove(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("departmentTree");
	zTree.selectNode(treeNode);
	if(treeNode.deptNo == 0 || treeNode.deptNo == null || treeNode.deptNo == "") {//初始化时要注意
		$.Alert(treeNode.deptName +" 为根节点无法删除!");
		return false;
	}
	$.Confirm("确认删除 " + treeNode.deptName + " 节点吗？","",function() {
		$.ajax({
			dataType : "json",
			type : "POST",
			url : contextPath + "/admin/department/delete.json",
			data : {
				id : treeNode.id
			},
			error : function handleAjaxError(xhr, textStatus, error) {
				if (textStatus === "timeout") {
					$.Alert("连接超时!请稍后再试");
				} else if (textStatus == "error") {
					$.Alert("系统繁忙,请稍后再试", null);
				}
			},
			success : function(data) {
				if (data || data.code) {
					loadTree();
					return true;
				} else {
					$.Err(data.message);
				}
			}
		});
	});
	return false;
}

function onRename(e, treeId, treeNode, isCancel) {
	$.ajax({
		dataType : "json",
		type : "POST",
		url : contextPath + "/admin/department/" + (treeNode.id == 'new' ? 'create.json':'update.json'),
		data : {
			id : treeNode.id,
			deptName : treeNode.deptName,
			deptNo : treeNode.deptNo,
		},
		error : function (xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.Alert("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.Alert("系统繁忙,请稍后再试", null);
			}
		},
		success : function(data) {
			if (data || data.code) {
				loadTree(getSelectNodeId());
			} else {
				$.Err(data.message);
			} 
		}
	});
}
var newCount = 1;
function addHoverDom(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span");
	if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
	var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
		+ "' title='新增' onfocus='this.blur();'></span>";
	sObj.after(addStr);
	var btn = $("#addBtn_"+treeNode.tId);
	if (btn) btn.bind("click", function(){
		var zTree = $.fn.zTree.getZTreeObj("departmentTree");
		zTree.addNodes(treeNode, {id:'new', deptNo:treeNode.id, deptName:"新节点" + (newCount++)});
		var node = zTree.getNodeByParam("id", "new", null);
		onRename(null, treeId, node, null);
		return false;
	});
};

function removeHoverDom(treeId, treeNode) {
	$("#addBtn_"+treeNode.tId).unbind().remove();
};

//树的onClick事件
function treeNodeOnClick(event, treeId, node, clickFlag) {
//	var treeObj = $.fn.zTree.getZTreeObj("departmentTree");
	var deptId = node.id;
	var name = $.trim($('#orgName').val());	
	initDataTable(deptId, name);
}

function treeNodeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
	$.ajax({
		dataType : "json",
		type : "POST",
		url : contextPath + "/admin/department/update.json",
		data : {
			id : treeNodes[0].id,
			deptName : treeNodes[0].deptName,
			deptNo : targetNode.id,
		},
		error : function (xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.Alert("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.Alert("系统繁忙,请稍后再试", null);
			}
		},
		success : function(data) {
			if (data || data.code) {
				loadTree(getSelectNodeId());
			} else {
				$.Err(data.message);
			} 
		}
	});
}

function getRootNode() {
	var treeObj = $.fn.zTree.getZTreeObj("departmentTree");
	var node = treeObj.getNodeByParam('deptNo', "0", null);
	if (!node) {
		node = treeObj.getNodeByParam('deptNo', "", null);
	}
	if (!node) {
		node = treeObj.getNodeByParam('deptNo', null, null);
	}
	if (!node) {
		node = treeObj.getNodeByParam('id', 1, null);
	}
	return node;
}

function getSelectNode() {
	var treeObj = $.fn.zTree.getZTreeObj("departmentTree");		
	var node = treeObj.getSelectedNodes()[0];
	return node;
}

function getSelectNodeId() {
	var treeObj = $.fn.zTree.getZTreeObj("departmentTree");		
	var node = treeObj.getSelectedNodes()[0];
	return node.id;
}

//加载树的内容
function loadTree(beforeSelectNodeId) {
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
				if (beforeSelectNodeId) {
					var beforeSelectNode = treeObj.getNodeByParam('id', beforeSelectNodeId, null);
					treeObj.selectNode(beforeSelectNode);
					var tId='#'+beforeSelectNode.tId+'_span';
					$(tId).click();
				} else {
					var rootNode = getRootNode();
					treeObj.selectNode(rootNode);
					var tId='#'+rootNode.tId+'_span';
					$(tId).click();
				}
			} else {
				$.Alert("结构载入出错", null);
			}
		}
	});
}

/********************树形结构结束********************/
     
/******************列表开始*******************/
function updateOrgById(id) {	
	var createAjax = $("#myModalUpdate");
    createAjax.empty();
    //createAjax.append('<img src="${resRoot}assets/img/ajax-modal-loading.gif" alt="" class="loading">');
	createAjax.modal({
		backdrop:'static',
        keyboard:false
	});
	createAjax.modal("show");
	createAjax.load(contextPath + "/admin/department/position/viewUpdate.json?id=" + id, function() {

	});
}

/**
 * 
 * @param deptId 部门id
 * @param id 岗位id
 */
function addOrDeletePerson(deptId, id) {
	location.href = contextPath + "/admin/user/users/list2.htm?deptId="+ deptId+"&id="+id;
}

function deleteOrgById(id) {
	$.Confirm("确认删除此数据吗?","",function() {
		$.ajax({
	       url: contextPath + "/admin/department/position/delete.json",
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
					var name = $.trim($('orgName').val());
					initDataTable(deptId, name);
	         	} else {
	         		$.Err(data.msg);
	         	}
	         }
	       }
		});
	});
}

function initDataTable(deptId, name) {
	$('#dataTable').dataTable().fnDestroy();
	admin.dataTable = $('#dataTable').on( 'processing.dt', function (e, settings, processing) {
		if ($('#selectAllChenkbox').attr('checked')) {
			$('#selectAllChenkbox').removeAttr('checked');
			$('#selectAllChenkbox').parent().removeClass('checked');
		}
    }).dataTable({
		"bFilter" : false,
		"bSort" : false,		
		"bProcessing" : true,
		"sAjaxSource" : contextPath	+ '/admin/department/position/queryList.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "deptId",
				"value" : deptId
			}, aoData.push({
				"name" : 'name',
				"value" : name
			}));
		},
		"sServerMethod" : "post",
		"bServerSide" : true,
		"bLengthChange":false,
		"iDisplayLength" : 5,
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
								$.Err("连接超时!请稍后再试!!!");
							} else if (textStatus == "error") {
								$.Err("系统繁忙!!!,请稍后再试!!!");
							}
							prmt.dataTable
									.fnProcessingIndicator(false);
						}
					});
		},
		"aoColumns" : [
				{
					"mData" : "id",
					"sWidth" : "80px",
					"mRender" : function(
							data, type, row) {
						if (data) {
							return "<input type='checkbox' value='"+data+"'  class='checkboxes' />";
						}
					}
				},
				{
					"mData" : "id",
					"sWidth" : "80px"
				},
				{
					"mData" : "name",
					"sWidth" : "150px",					
					"mRender" : function(data, type, row) {						
						if (data) {
							return "<a href='javascript:void(0);' onclick='addOrDeletePerson("+row.deptId+","+row.id+");'>"+data+"</a> ";
									
						}
					}
				},
				{
					"mData" : "deptName",
					"sWidth" : "100px"
				},
				{
					"mData" : "planNumber",
					"sWidth" : "100px"
				},
				{
					"mData" : "personNumber",
					"sWidth" : "150px",
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
/******************列表结束*******************/

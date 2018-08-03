admin = {};
jQuery(document).ready(function() {
	App.init();
	$("#submit_button").click(function() {
		var treeObj = $.fn.zTree.getZTreeObj("konwledgeTypeTree");		
		var typeId = treeObj.getSelectedNodes()[0].id;
		kinitDataTable(typeId);
	});
	
	if (backNodeId != '') {
		kLoadTree(backNodeId);
	} else {
		kLoadTree();
	}
	
	function _getIds() {
		var ids = [];
		$("input.checkboxes:checked").each(function() {
			ids.push($(this).val());
		});
		return ids;
	}
	//新增
	$('#addknowledge').click(function(){
		var treeObj = $.fn.zTree.getZTreeObj("konwledgeTypeTree");
		var typeId = treeObj.getSelectedNodes()[0].id;
		location.href = contextPath + "/knowledge/add.htm?typeId=" + typeId;
		
	});
	//删除 
	$('#deleteknowledge').click(function() {
		var ids = _getIds() + '';
		if(ids.length > 0){
		}else{
			$.Alert("请选择数据!");
			return false;
		}
		$.Confirm("确认批量删除?","",function() {
		$.ajax({
	       url: contextPath + "/knowledge/delete.json",
	       type: "post",
	       dataType: "json",
	       data: {
			 "ids" : ids
	       },
	       success: function(data){
	         if (data) {
	         	if (data.done) {
	         		$.Alert("删除成功!");	
	         		var treeObj = $.fn.zTree.getZTreeObj("konwledgeTypeTree");		
	        		var typeId = treeObj.getSelectedNodes()[0].id;
	        		kinitDataTable(typeId);
	         	} else {
	         		$.Err(data.msg);
	         	}
	         }
	       }
		});
		});
		return false;
	});
	
	//删除 
	$('#changeknowledge').click(function() {
		var ids = _getIds();
		//alert(ids.length)
		if(ids.length == 1){
		}
		else if(ids.length > 1){
			$.Alert("请选择单条数据修改!");
			return false;
		}
		else{
			$.Alert("请选择一条数据修改!");
			return false;
		}
		location.href = contextPath + "/knowledge/updateEdit.htm?id=" + ids[0];
	});
	
	//全选
	/*$('#selectAllChenkbox').click(function() {
		$("input.checkboxes").each(function(){
			if ($('#selectAllChenkbox').attr('checked')) {
				$(this).attr("checked", true);
			} else {
				$(this).attr("checked", false);
			}
		});
	});*/
	
});


/** ******************树形结构开始******************* */
var kzNodes = [];

// 树参数
var ksetting = {
	view : {
		addHoverDom : kaddHoverDom,
		removeHoverDom : kremoveHoverDom,
		selectedMulti : false
	},
	edit : {
		enable : true,
		editNameSelectAll : true,
		removeTitle : "删除",
		renameTitle : "编辑"
	},
	data : {
		key : {
			name : "kbFileTypeName"
		},
		simpleData : {
			enable : true,
			idKey : "id",
			pIdKey : "kbFileTypeParentid"
		}
	},
	callback : {
		beforeRemove : kbeforeRemove,
		beforeRename : kbeforeRename,
		onRemove : konRemove,
		onRename : konRename,
		onClick : ktreeNodeOnClick,
		onDrop : ktreeNodeOnDrop
	}
};
function getSelectNode() {
	var treeObj = $.fn.zTree.getZTreeObj("konwledgeTypeTree");		
	var node = treeObj.getSelectedNodes()[0];
	return node;
}

function getSelectNodeId() {
	var treeObj = $.fn.zTree.getZTreeObj("konwledgeTypeTree");		
	var node = treeObj.getSelectedNodes()[0];
	return node.id;
}

function kbeforeRename(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("konwledgeTypeTree");
	zTree.selectNode(treeNode);
	return true;
}
function kbeforeRemove(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("konwledgeTypeTree");
	zTree.selectNode(treeNode);	
	if(treeNode.kbFileTypeParentid == 0 || treeNode.kbFileTypeParentid == null || treeNode.kbFileTypeParentid == "") {//初始化时要注意
		$.Alert(treeNode.kbFileTypeName +" 为根节点无法删除!");
		return false;
	}
	
	$.Confirm("确认删除 " + treeNode.kbFileTypeName + " 节点 吗？","",function(){
		$.ajax({
			dataType : "json",
			type : "POST",
			url : contextPath + "/knowledge/catalog/delete.json",
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
					kLoadTree();
					return true;
				} else {
					$.Err(data.message);
				}
			}
		});		
	});
	return false;
}

function konRemove(e, treeId, treeNode) {	
	
}

function konRename(e, treeId, treeNode, isCancel) {
	$.ajax({
		dataType : "json",
		type : "POST",
		url : contextPath + "/knowledge/catalog/"
				+ (treeNode.id == 'new' ? 'create.json' : 'update.json'),
		data : {
			id : treeNode.id,
			name : treeNode.kbFileTypeName,
			parentId : treeNode.kbFileTypeParentid
		},
		error : function(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.Alert("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.Alert("系统繁忙,请稍后再试", null);
			}
		},
		success : function(data) {
			if (data || data.code) {
				kLoadTree(getSelectNodeId());
			} else {
				alert(data.message);
			}
		}
	});
}
var newCount = 1;
function kaddHoverDom(treeId, treeNode) {
	var sObj = $("#" + treeNode.tId + "_span");
	if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0)
		return;
	var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
			+ "' title='新增' onfocus='this.blur();'></span>";
	sObj.after(addStr);
	var btn = $("#addBtn_" + treeNode.tId);
	if (btn)
		btn.bind("click", function() {
			var zTree = $.fn.zTree.getZTreeObj("konwledgeTypeTree");
			zTree.addNodes(treeNode, {id : 'new',kbFileTypeParentid : treeNode.id,kbFileTypeName : "新节点" + (newCount++)});
			var node = zTree.getNodeByParam("id", "new", null);
			konRename(null, treeId, node, null);
			return false;
		});
};

function kremoveHoverDom(treeId, treeNode) {
	$("#addBtn_" + treeNode.tId).unbind().remove();
};

// 树的onClick事件
function ktreeNodeOnClick(event, treeId, node, clickFlag) {
	// var treeObj = $.fn.zTree.getZTreeObj("konwledgeTypeTree");
	var id = node.id;
	var name = $.trim($('orgName').val());
	kinitDataTable(id);
}

function ktreeNodeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
	$.ajax({
		dataType : "json",
		type : "POST",
		url : contextPath + "/admin/department/update.json",
		data : {
			id : treeNodes[0].id,
			name : treeNodes[0].kbFileTypeName,
			parentId : targetNode.id
		},
		error : function(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.Alert("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.Alert("系统繁忙,请稍后再试", null);
			}
		},
		success : function(data) {
			if (data || data.code) {
				kLoadTree();
			} else {
				alert(data.message);
			}
		}
	});
}
function getRootNode() {
	var treeObj = $.fn.zTree.getZTreeObj("konwledgeTypeTree");
	var node = treeObj.getNodeByParam('kbFileTypeParentid', "0", null);
	if (!node) {
		node = treeObj.getNodeByParam('kbFileTypeParentid', "", null);
	}
	if (!node) {
		node = treeObj.getNodeByParam('kbFileTypeParentid', null, null);
	}
	if (!node) {
		node = treeObj.getNodeByParam('id', 1, null);
	}
	return node;
}
// 加载树的内容
function kLoadTree(beforeSelectNodeId) {
	$.ajax({
		dataType : "json",
		type : "POST",
		url : contextPath + "/knowledge/catalog/query.json",
		data : {},
		timeout : 5000,
		error : function handleAjaxError(xhr, textStatus, error) {
			if (textStatus === "timeout") {
				$.Err("连接超时!请稍后再试");
			} else if (textStatus == "error") {
				$.Err("系统繁忙,请稍后再试", null);
			}
		},
		success : function(data) {
			if (data) {
				kzNodes = data;
				$.fn.zTree.init($("#konwledgeTypeTree"), ksetting, kzNodes);
				var treeObj = $.fn.zTree.getZTreeObj("konwledgeTypeTree");
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

/** ******************树形结构结束******************* */


function knowDetail(id) {
	location.href = contextPath + "/knowledge/detail.htm?id=" + id+"&back=manager";	;	
}

//知识库点击
function knowPlus(id,kbFileClickCount){
	$.ajax({
		dataType : "json",
		type : "post",
		url : contextPath + "/knowledge/knowPlus.json",
		data : {
			id : id,
			kbFileClickCount :kbFileClickCount
		},
		success : function(data) {
			return data;
		}
	});
}

//知识库新增
function jumpPage(){
	location.href = contextPath + "/knowledge/add.json";
}

//知识库修改
function updateknowledge(id){
	location.href = contextPath + "/knowledge/updateEdit.htm?id=" + id;
}
function deleteknowledge2(id){
	var ids = [];
	ids.push(id);
	$.Confirm("确认删除此数据?","",function() {
	$.ajax({
       url: contextPath + "/knowledge/delete.json",
       type: "post",
       dataType: "json",
       data: {
		 "ids" : ids[0]
       },
       success: function(data){
         if (data) {
         	if (data.done) {
         		$.Alert("删除成功!");	
         		var treeObj = $.fn.zTree.getZTreeObj("konwledgeTypeTree");		
        		var typeId = treeObj.getSelectedNodes()[0].id;
        		kinitDataTable(typeId);
         	} else {
         		$.Err(data.msg);
         	}
         }
       }
	});
	});
}

function kinitDataTable(typeId) {
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
		"sAjaxSource" : contextPath + '/knowledge/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "typeId",
				"value" : typeId
			});
			aoData.push({
				"name" : "name",
				"value" : $('#name').val()
			});
			aoData.push({
				"name" : "startTime",
				"value" : $('#startTime').val()
			});
			aoData.push({
				"name" : "endTime",
				"value" : $('#endTime').val()
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
		"fnDrawCallback":function( oSettings ) {
			$('#selectAllChenkbox').click(function() {
				if ($('#selectAllChenkbox').attr('checked')) {
					$("input.checkboxes").attr("checked", true);
				} else {
					$("input.checkboxes").attr("checked", false);
				}
			});
			
			var arrCbox = $("input.checkboxes");
			arrCbox.on('click', function() {
  				var arrCheckbox = [];
  				for(var i=0; i<arrCbox.length; i++) {
  					if($(arrCbox[i]).attr('checked')) {
  						arrCheckbox.push(arrCbox[i]);
  					}
  				}
  				
  				if(arrCheckbox.length<arrCbox.length) {
  					$('#selectAllChenkbox').attr("checked", false);
  					$('#selectAllChenkbox').parent().removeClass("checked");
  				} else {
  					$('#selectAllChenkbox').attr("checked", true);
  					$('#selectAllChenkbox').parent().addClass("checked");
  				}
  			});
  			
  		},
		"aoColumns": [{
				"mData" : "id",
				"mRender" : function(data, type, row) {
					if (data) {
						return "<input  type='checkbox' value='"+data+"' class='checkboxes' />";
					}
				}
			},
			{
				"mData" : "kbFileStrname",
				"sWidth" : "100px",
				'sClass' : 'text-left',
				"mRender" : function(data, type, row) {
					if (data) {
						return "<a href='javascript:void(0)' onclick='knowDetail("+ row.id + ")'>"+ data+ "</a>";
					}
				}
			},
			{
				"mData" : "kbFileTypeName",
				"sWidth" : "100px",
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
				"mData" : "createName",
				"sWidth" : "100px",
				'sClass' : 'text-center'
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
			}, {
				"mData" : "kbFavoritesCount",
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

function kinitDataTableTemp(typeId) {
	$('#dataTable').dataTable().fnDestroy();
	$('#dataTable').dataTable({
		"bFilter" : false,
		"bSort" : false,
    	"sAjaxSource" : contextPath + "/knowledge/querySolr.json",
    	"sAjaxDataProp": "data",
    	"bLengthChange": false,
		"iDisplayLength" : 5,
    	"aoColumns": [{
			"mData" : "id",
			"mRender" : function(data, type, row) {
				if (data) {
					return "<input  type='checkbox' value='"+data+"' class='checkboxes' />";
				}
			}
		},
		{
			"mData" : "kbFileStrname",
			"sWidth" : "100px",
			'sClass' : 'text-center',
			"mRender" : function(data, type, row) {
				if (data) {
					return "<a href='javascript:void(0)' onclick='knowDetail("+ row.id + ")'>"+ data+ "</a>";
				}
			}
		},
		{
			"mData" : "kbFileTypeName",
			"sWidth" : "100px",
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
			"mData" : "createName",
			"sWidth" : "100px",
			'sClass' : 'text-center'
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
		}, {
			"mData" : "kbFavoritesCount",
			"sWidth" : "100px",
			'sClass' : 'text-center'
		},
		{
			"mData" : "id",
			"sWidth" : "250px",
			"mRender" : function(data, type, row) {
				if (data) {
					return "<a href='javascript:void(0);' class='btn blue' onclick='updateknowledge(" + row.id + ");'>修改</a> "
							+ "<a href='javascript:void(0);' class='btn red' onclick='deleteknowledge2(" + row.id + ");'>删除</a>";
					
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
  		}
		
	});
}

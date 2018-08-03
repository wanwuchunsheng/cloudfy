admin = {};
jQuery(document).ready(function() {
	App.init();
	$("#submit_button").click(function() {
		var treeObj = $.fn.zTree.getZTreeObj("konwledgeTypeTree");		
		var typeId = -1;
		kinitDataTable(typeId);
	});
	kLoadTree();
	
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
	
	//修改
	/*$('#updateknowledge').click(function(){
		var ids = _getIds();
		if (ids.length == 0) {
			$.Alert('请选择一行');
			return false;
		} else if (ids.length > 1) {
			$.Alert('请选择一行');
			return false;
		}
		
		location.href = contextPath + "/knowledge/updateEdit.htm?id=" + ids[0];
		
	});*/


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


/** ******************树形结构开始******************* */
var kzNodes = [];

// 树参数
var ksetting = {
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
		onClick : ktreeNodeOnClick
	}
};

// 树的onClick事件
function ktreeNodeOnClick(event, treeId, node, clickFlag) {
	// var treeObj = $.fn.zTree.getZTreeObj("konwledgeTypeTree");
	var id = node.id;
	var name = $.trim($('orgName').val());
	kinitDataTable(id);
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
function kLoadTree(beforeSelectNode) {
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
				if (beforeSelectNode) {
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
	location.href = contextPath + "/knowledge/detail.htm?id=" + id+"&back=query";	
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
		"sAjaxSource" : contextPath + '/knowledge/querySolr.json',
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
		"aoColumns": [
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

function kinitDataTable1(typeId) {
	$('#dataTable').dataTable().fnDestroy();
	$('#dataTable').dataTable({
		"bFilter" : false,
		"bSort" : false,
    	"sAjaxSource" : contextPath + "/knowledge/querySolr.json",
//    	"fnServerParams" : function(aoData) {
//			aoData.push({
//				"name" : "typeId",
//				"value" : typeId
//			},{
//				"name" : "name",
//				"value" : $('#name').val()
//			},{
//				"name" : "startTime",
//				"value" : $('#startTime').val()
//			},{
//				"name" : "endTime",
//				"value" : $('#endTime').val()
//			});
//		},
    	"sAjaxDataProp": "data",
    	"bLengthChange": false,
		"iDisplayLength" : 5,
    	"aoColumns": [{
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
		
	});
}

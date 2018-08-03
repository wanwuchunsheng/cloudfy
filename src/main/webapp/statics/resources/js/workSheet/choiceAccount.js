admin={};
jQuery(document).ready(function() {
	App.init();
	//$("select.form-control").select2();
	$("#submit_button").click(function() {
		var treeObj = $.fn.zTree.getZTreeObj("departmentTree");
		var deptId = treeObj.getSelectedNodes()[0].id;
		initDataTable(deptId);
	});
   initDataTable(1);
   loadTree();
   
   
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

    
function initDataTable(deptId) {
	$('#dataTable2').dataTable().fnDestroy();
	//解决分页重复生成的bug
	$('#dataTable2').siblings("div").remove().unwrap();
	admin.dataTable=$('#dataTable2').on( 'processing.dt', function (e, settings, processing) {
		 
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
							return "<input type='radio' name='radios' data-name='"+row.name +"' class='radios' value='" + data + "'/>";
						}
					}
           },
           { "mData": "agentId","sWidth": "150px",'sClass':'text-center'},
           { "mData": "agentId","sWidth": "150px",'sClass':'text-center'},
           { "mData": "name","sWidth": "150px",'sClass':'text-center'},
           { "mData": "deptName","sWidth": "100px",'sClass':'text-center'},
           { "mData": "positionName","sWidth": "100px",'sClass':'text-center'}],
           
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

jQuery(document).ready(function() {
    $("#choice_save").bind("click",function() {
        var radiov = $("#dataTable2 :radio:checked")
        if (radiov.length < 1) {
            $.Alert("请选择指派人员!");
        }
        
        $("#flowUserNname").val(radiov.attr("data-name"))
        $("#flowUserId").val(radiov.val())
        $('#choiceModal').modal('hide')
    });
});




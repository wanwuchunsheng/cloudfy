admin={};

 
function initDataTable() {
	if(admin.dataTable){
		$('#dataTable').dataTable().fnDestroy();
	}
	
	admin.dataTable=$('#dataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/task/library/query.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "taskCode",
				"value" : $("#taskCode").val()
			});
		},
		"sServerMethod" : "post",
		"bServerSide" : true,
		"bLengthChange":false,
		"aLengthMenu" : [ [ 5, 10, 20 ], [ 5, 10, 20 ] ],
		"iDisplayLength" : 20,
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
					{"mData" : "taskName","sWidth": "200px",
					 "mRender" : function(data, type, row) {
							return (null==data || ''==data)?'总计':data;
						},
					"fnCreatedCell": function(nTd, sData, oData, iRow, iCol) {
						if(iRow == 0){
							 $(nTd).parent().removeClass('odd');
							 $(nTd).parent().addClass('success');
						 }
					 }
					},
					{"mData" : "taskNum","sWidth": "150px",
					 "mRender" : function(data, type, row) {
							return (null==data || ''==data)?1:data;
						}
					},
					{"mData" : "userName","sWidth": "150px",
					"mRender" : function(data, type, row) {
						return data;
					}}
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
		}
	});
 }
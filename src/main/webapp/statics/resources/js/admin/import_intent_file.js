admin = {};
admin_ = {};
admin__ = {};
jQuery(document).ready(function() {
	App.init();
	
	$("select").select2();
	
	$('.start-import').click(function() {
	$('.import-result').show();
	});

	// 联动日历
	$('.date-picker').datepicker({
	language : "zh-CN",
	rtl : App.isRTL(),
	autoclose : true,
	format : "yyyy-mm-dd"
	});

	//TableManaged({"id" : "sample_1"}).init();

		
});




$.ajaxSetup({
	cache : false
});

// import
$("#btn-upload-excel-file").click(function() {
	var filename = $("#importFile").val();
	// var importType = $("#importType").val();
	$("#importPathName").val(filename);
	if (filename) {
		var reg_xlsx = /[^\.](\.xlsx)$/i;
		if (reg_xlsx.test(filename)) {
			$("#btn-upload-excel-file").attr('disabled', true);
			$("#btn-upload-close").attr('disabled', true);
			$("#btn_download_file").attr('disabled', true);
			var obj = document.getElementById('importFile');
			obj.readOnly = true;
			$("#fileForm").submit();
		} else {
			$.Alert('Excel 格式不正确');
		}
	} else {
		$.Alert("请选择导入文件");
	}
});

//ajax
$("#fileForm").ajaxForm({
	type : "post",
	timeout : 180000,
	dataType : "json",
	success : function(msg) {
		enableBtn();
		if (msg && msg[1]) {
			if (msg[0] == '0') {
				$('.import-result').hide();
				$.Alert(msg[1]);
			} else if (msg[0] == '1') {
				//$.Alert("成功"+msg[1]);
				showData(msg[1]);
			}
		}
	},
	error : function(msg) {
		if (msg && msg[1]) {
			$.Alert(msg[1]);
		}
	}
});

// 启用按钮
function enableBtn() {
	$("#btn-upload-close").attr('disabled', false);
	$("#btn-upload-excel-file").attr('disabled', false);
	$("#btn_download_file").attr('disabled', false);
	$("#importPathName").val("");
	var obj = document.getElementById('importFile');
	obj.readOnly = false;
	obj.outerHTML = obj.outerHTML;
}

// 清空
$("#btn-upload-close").click(function() {
	$("#importPathName").val("");
	var obj = document.getElementById('importFile');
	obj.readOnly = false;
	obj.outerHTML = obj.outerHTML;
});

// 路径
function onchangeFile(obj) {
	$("#importPathName").val(obj.value);
}
// 下载
$("#btn_download_file").click(function() {
	var importType = $("#importType").val();
	//if (importType != '4') {
	var url = 'download.json?importType=' + importType;
	window.location.href = url;
	//} else {
	//	$.Alert("导入模板需求正在确认......");
	//}
});

//显示导入失败的数据信息分布查询
function showData(msg) {
	var rtnMsg = msg.split(":");
	$("#succ_count").html(rtnMsg[0]);
	$("#fail_count").html(rtnMsg[1]);
	$("#errorSerialnoId").val(rtnMsg[2]);
	$('.import-result').show();
	errorPage(rtnMsg[2]);
	//iframe 高度重置
	setCwinHeight();
}
//iframe 高度重置
function setCwinHeight(){ 
	window.parent.document.getElementById("iframepage").style.height=document.body.offsetHeight<560?560:document.body.offsetHeight +  42 + "px";
} 
//显示导入失败的意向
function  errorPage(val){
	$('#errorDataTable').dataTable().fnDestroy();
	admin_.dataTable=$('#errorDataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/admin/intent/queryImportFileDetailListByPage.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "serialno",
				"value" :val
			},
			aoData.push({
				"name" : "orgLeadId",
				"value" :'0'
			}));
		},
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
	           { "mData": "failreason","sWidth":"450px",'sClass':'text-center'},
	           { "mData": "name"},
	           {
	        	   "mData": "gender",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("1006",data);
						}
					}
	           },
	           { "mData": "mobilephone"},
	           { 
	        	   "mData": "state",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getRegionByProvinceName(data);
						}
					}
	           },
	           { 
	        	   "mData": "city",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getRegionByCityName(data);
						}
					}
	           },
	           { "mData": "streetaddress"},
	           { "mData": "postalcode"},
	           { "mData": "email"},
	           { 
	        	   "mData": "brand",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("40024",data);
						}
					}
	           },
	           { "mData": "dealer"},
	           { 
	        	   "mData": "intentcarseries",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getSeriesCnName(data);
						}
					}	        		   
	           },
	           { "mData": "campaigncode"},
	           { "mData": "campaignname"},
	           { 
	        	   "mData": "obtainchannel",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("40032",data);
						}
					}   
	           },
	           { 
	        	   "mData": "mediachannel",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("40033",data);
						}
					}   
	           },
	           { 
	        	   "mData": "registertime",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return new Date(data).format('yyyy-MM-dd hh:mm:ss');
						}
					}   
	           },
	           { 
	        	   "mData": "purchasingwindow",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("40035",data);
						}
					}
	           },
	           {
	        	   "mData": "firsttimepurchasing",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("1278",data);
						}
					}	        		  
	           },
	           { "mData": "puchasingbudget"},
	           { "mData": "fixedphone"},
	           {
	        	   "mData": "driverlicenseflag",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("1278",data);
						}
					}	        		   
	           },
	           { "mData": "age"},
	           { 
	        	   "mData": "appointtime",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return new Date(data).format('yyyy-MM-dd hh:mm:ss');
						}
					} 	        		   
	           },
	           { "mData": "currentmodelname"}
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

$("#searchImportLogs").click(function() {
	$('#sampleDataTable').dataTable().fnDestroy();
	admin_.dataTable=$('#sampleDataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/admin/intent/queryImportFileListByPage.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "busitype",
				"value" : $('#busitype').val()
			});
			aoData.push({
				"name" : "operatorname",
				"value" : $('#operatorname').val()
			});
			aoData.push({
				"name" : "brand",
				"value" : $('#brand').val()
			});
			aoData.push({
				"name" : "startTime",
				"value" : $('#startTime').val()
			});
			aoData.push({
				"name" : "endTime",
				"value" : $('#endTime').val()
			});
			aoData.push({
				"name" : "serialno",
				"value" : $('#serialno').val()
			});
		},
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
               { "mData": "serialno"},
	           { "mData": "operatorname"},
	           { "mData": "filename"},
	           { 
	        	   "mData": "busitype",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("40031",data);
						}
					}
	        		   
	           },       
	           { 
	        	   "mData": "brand",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("40024",data);
						}
					}
	           },
	           { 
	        	   "mData": "createtime",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return new Date(data).format('yyyy-MM-dd hh:mm:ss');
						}
					}   
	           },
	           { "mData": "successcount"},
	           { "mData": "downloadcount"},
	           { 
	        	   "mData": "id","sWidth":"150px",'sClass':'text-center',
	        	   "mRender" : function(data, type, row) {
					if(data){
						return "<a href='javascript:void(0)' onclick=downSaleLeads('"+row.serialno+"','"+row.id+"','"+row.busitype+"')>下载</a>&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' onclick=showSaleLeads('"+row.serialno+"')>查看</a>"					
					}
					}	        		   
	           }
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
});




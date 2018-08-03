admin = {};
admin_ = {};
admin__ = {};
$(function(){
	    initProvince('driver_state',true);
	    $("#driver_state").select2();
        $("#driver_state").on("change",function(){
        	initCity('driver_city',$("#driver_state").val(),true);
        	$("#driver_city").select2();
        });
        saleLeadslistShow();
});

$("#saleLeadsSearch").click(function(){
	saleLeadslistShow();
});

function saleLeadslistShow(){
	$('#saleLeadsDataTable').dataTable().fnDestroy();
	admin_.dataTable=$('#saleLeadsDataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/admin/intent/querySaleLeadsListByPage.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "serialno",
				"value" : $("#serialno").val()
			});
			aoData.push({
				"name" : "name",
				"value" : $("#name1").val()
			});			
			aoData.push({
				"name" : "state",
				"value" : $("#driver_state").val()
			});
			aoData.push({
				"name" : "city",
				"value" : $("#driver_city").val()
			});
			aoData.push({
				"name" : "intentcarseries",
				"value" : $("#carSeriesId").val()
			});
			aoData.push({
				"name" : "brand",
				"value" : $("#brandId").val()
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
	           { "mData": "serialno","sWidth":"150px",'sClass':'text-center'},
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
						}else{
							return row.intentcarseriesname;
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
	           { "mData": "currentmodelname"},
	           { "mData": "driverlicensenum"}
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
   
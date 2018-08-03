(function($){
	$.fn.rdTab = function(tablist){
	    dataTable = TableManaged.init();
		var than = this;
		than.on("click", function () {
			var index = than.index($(this));
			tablist.hide().eq(index).show();
		});
		
	};
	
$("#addressListFirst").change(function(){
	initCity('addressListSecond',$("#addressListFirst").val(),true);
	$("#addressListThird option").remove();
	$("#addressListThird").append("<option value=''>请选择</option>");
	$("#addressListThird").select2();
});

$("#addressListSecond").change(function(){
	initCourty('addressListThird',$("#addressListSecond").val(),true);
}); 
})(jQuery);

admin_={};
admin={};
jQuery(document).ready(function() {    
   App.init(); 
   $("select").select2();
   $("#submit_button").click(function(){
//		var provinceId=$("#addressListFirst").val()==''?null:$("#addressListFirst").find("option:selected").text();
//		var cityId=$("#addressListSecond").val()==''?null:$("#addressListSecond").find("option:selected").text();
//		var districtId=$("#addressListThird").val()==''?null:$("#addressListThird").find("option:selected").text();
//		if(provinceId!=null){
//	        if(provinceId.lastIndexOf('省')!=-1){
//	        	provinceId=provinceId.substring(0,provinceId.length-1);
//	        }
//	        if(provinceId.lastIndexOf('市')!=-1){
//	        	provinceId=provinceId.substring(0,provinceId.length-1);
//	        }
//	        if(provinceId.lastIndexOf('区')!=-1){
//	        	provinceId=provinceId.substring(0,provinceId.length-1);
//	        }
//		}
//		if(cityId!=null)
//        if(cityId.lastIndexOf('市')!=-1){
//        	cityId=cityId.substring(0,cityId.length-1);
//        }
//		if(districtId!=null){
//	        if(districtId.lastIndexOf('区')!=-1){
//	        	districtId=districtId.substring(0,districtId.length-1);
//	        }
//	        if(districtId.lastIndexOf('县')!=-1){
//	        	districtId=districtId.substring(0,districtId.length-1);
//	        }
//		}
		var provinceId=$("#addressListFirst").val();
		var cityId=$("#addressListSecond").val();
		var districtId=$("#addressListThird").val();
		//dealer list
		$('#dealerDataTable').dataTable().fnDestroy();
 		admin_.dataTable=$('#dealerDataTable').dataTable({
				"bFilter" : false,
				"bSort" : false, 
				"bProcessing" : true,
				"sAjaxSource" : 'queryDealerListByPage.json',
				"fnServerParams" : function(aoData) {
					aoData.push({
						"name" : "brand",
						"value" : $('input[name="brand_"]:checked').val()
					},
					aoData.push({
						"name" : "businessStatus",
						"value" : $('input[name="businessStatus"]:checked').val()
					}),
					aoData.push({
						"name" : "ascStName",
						"value" : $('#ascStName').val()
					}),
					aoData.push({
						"name" : "ascCode",
						"value" : $('#ascCode').val()
					}),
					aoData.push({
						"name" : "state",
						"value" : provinceId
					}),
					aoData.push({
						"name" : "city",
						"value" : cityId
					}),
					aoData.push({
						"name" : "cityRegion",
						"value" : districtId
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
                       {"mData": "brand", "sWidth": "130px",
                           "mRender" : function(data, type, row) {
                        	   if(data){
									return getDictName("40024",data);
								}
    							}
                       },
                       {"mData": "ascStName", "sWidth": "240px",
                       "mRender" : function(data, type, row) {
								if(data){
									return "<a href='javascript:void(0)' onclick='dealerDetail("+row.id+")'  data-toggle='modal' data-target='#myModalxjgg'>"+data+"</a>"
								}
							}
                       },
        	           {"mData": "state", "sWidth": "140px",
        	        	   "mRender" : function(data, type, row) {
        						if(data){
        							return getRegionByProvinceName(data);
        						}
        					}
        	           },
                       {"mData": "city", "sWidth": "140px",
        	        	   "mRender" : function(data, type, row) {
        						if(data){
        							return getRegionByCityName(data);
        						}
        					}
        	           },
                       { "mData": "address", "sWidth": "400px"},
                       { "mData": "hotLine", "sWidth": "150px"},
                       { "mData": "businessStatus", "sWidth": "120px"}
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
   
    //supplier list    
    $('#supplierDataTable').dataTable().fnDestroy();
	admin.dataTable=$('#supplierDataTable').dataTable({
				"bFilter" : false,
				"bSort" : false, 
				"bProcessing" : true,
				"sAjaxSource" : 'querySupplierListByPage.json',
				"fnServerParams" : function(aoData) {
					aoData.push({
						"name" : "brand",
						"value" : $('input[name="brand"]:checked').val()
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
                       { 
                       	"mData" : "brand","sWidth": "130px",
							"mRender" : function(data, type, row) {
								if(data){
									return getDictName("40024",data);
								}
							}},
                       { "mData": "ascStName","sWidth": "240px",
                         "mRender" : function(data, type, row) {
								if(data){
									return "<a href='javascript:void(0)' onclick='supplierDetial("+row.id+")'  data-toggle='modal' data-target='#myModalxjgg2'>"+data+"</a>"
								}
							}
                       },
        	           {"mData": "state", "sWidth": "140px",
        	        	   "mRender" : function(data, type, row) {
        						if(data){
        							return getRegionByProvinceName(data);
        						}
        					}
        	           },
                       {"mData": "city", "sWidth": "140px",
        	        	   "mRender" : function(data, type, row) {
        						if(data){
        							return getRegionByCityName(data);
        						}
        					}
        	           },
                       { "mData": "address","sWidth": "400px"},
                       { "mData": "businessPhone1","sWidth": "140px"}
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

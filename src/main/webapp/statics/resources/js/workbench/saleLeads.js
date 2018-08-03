
admin_ = {};
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, 
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(), 
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};            	

jQuery(document).ready(function () {
    App.init(); // initlayout and core plugins
    $("select").select2();
  
    //品牌,车系,车型
    changeBrandCheck("");
    $("select").select2();
    //省
    initProvince('driver_state',true);
    $("#driver_state").select2();
    $("#driver_state").on("change",function(){
    	//市
    	initCity('driver_city',$("#driver_state").val(),true);
    	$("#driver_city").select2();
    });
    
    $('.start-import').click(function() {
        $('.import-result').show();
    });

    //联动日历
   $('.date-picker').datepicker({
        language:"zh-CN",
        rtl: App.isRTL(),
        autoclose: true,
        format:"yyyy-mm-dd"
   });
});
//品牌
function changeBrandCheck(obj){
	//车系
	inbound_carmodel.getCarSeries("intent_intentcarseries",obj.value); 
	inbound_carmodel.getCarModels("intent_intentcarmodels",$("#intent_intentcarseries").val());
	//活动代码
	getCampaignCode();
	$("select").select2(); //刷新下拉菜单
}
//根据车系查询车型
$("#intent_intentcarseries").change(function(){
	inbound_carmodel.getCarModels("intent_intentcarmodels",$("#intent_intentcarseries").val()); 
	  $("select").select2(); //刷新下拉菜单
});
//选择经销商
$("#btn_drive_dealer_select").on("click",function(){
	selectDealer();
});

/*打开经销商选择*/
function selectDealer(){
    var brand=$("#selSaleLeadsBrand").val();
    if(brand==""||brand==null){
    	 $.Alert('请选择意向品牌');
         return;
    }
     var state;
     var city;
         if($("#driver_state").val()!=null &&  $("#driver_state").val()!=''){
             state=$("#driver_state option:selected").val();
             city=$("#driver_city option:selected").val();
         }
    var _url=contextPath+"/inbound/queryDealer.json?r="+Math.random();
    var paraJson={"brand":brand,"state":state,"city":city};
     var createAjax = $("#myModalrw");
     createAjax.empty();
     //createAjax.('<img src="${resRoot}assets/img/ajax-modal-loading.gif" alt="" class="loading">');
      createAjax.modal({
             backdrop:'static',
             keyboard:false
         });
      createAjax.modal("show");
      createAjax.load(_url,paraJson, function(data) {
             
      });
}
/*经销商选择页面回调函数*/
function dealerCallback(val,text){
     $("#txt_driveDealer").val(text);
     $("#driveDealerCode").val(val);
}
$("#searchSaleLeas").click(function() {
	$('#sampleDataTable').dataTable().fnDestroy();
	admin_.dataTable=$('#sampleDataTable').dataTable({
		"bFilter" : false,
		"bSort" : false, 
		"bProcessing" : true,
		"sAjaxSource" : contextPath + '/workbench/saleleads/querySaleLeadsByPage.json',
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "name",
				"value" : $('#nameId_').val()
			});
			aoData.push({
				"name" : "channelCode",
				"value" : $('#channelCodeId_').val()
			});
			aoData.push({
				"name" : "createUserName",
				"value" : $('#createUserNameId_').val()
			});
			aoData.push({
				"name" : "cccleadvalidation",
				"value" : $('#cccleadvalidationId_').val()
			});
			aoData.push({
				"name" : "startTime",
				"value" : $('#startTime_').val()
			});
			aoData.push({
				"name" : "endTime",
				"value" : $('#endTime_').val()
			});
			aoData.push({
				"name" : "campaigncode",
				"value" : $('#campaigncode_').val()
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
	           { "mData": "name"},
	           { "mData": "mobilephone"},
	           { 
	        	   "mData": "channelCode",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("40031",data);
						}
					}
	        		   
	           },
	           { "mData": "campaigncode"},
	           { 
	        	   "mData": "customerrequirement",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("40034",data);
						}
					}
	        		   
	           }, 
	           { 
	        	   "mData": "obtainchannel",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("40032",data);
						}
					}
	        		   
	           }, 
	           { 
	        	   "mData": "cccleadvalidation",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return getDictName("1278",data);
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
	           { "mData": "createUserName"},
	           { 
	        	   "mData": "createTime",
	        	   "mRender" : function(data, type, row) {
						if(data){
							return new Date(data).format('yyyy-MM-dd hh:mm:ss');
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
    
$.ajaxSetup ({
cache: false 
});

admin={};
$(document).ready(function(){
	//联动日历
	   $('.date-picker').datepicker({
	        language:"zh-CN",
	        rtl: App.isRTL(),
	        autoclose: true,
	        format:"yyyy-mm-dd"
	   });
	$("select").select2();
	initServiceRequestType("sel_SalesRequestType",'1');
	$("#sel_SalesRequestType").select2();   
});
$("#sel_SalesRequestType").change(function(){
	initServiceRequestType("sel_RecordRequestType",$("#sel_SalesRequestType").val());
	$("#sel_RecordRequestType").select2();
});
//删除
$('#delete').click(function() {
   	if($("input[name='checkSendSmsId']:checked"))
  	{
  		var idStrs="";
  		var arr = new Array();
  		$("input[name='checkSendSmsId']:checked").each(function(i,id)
  		{  			
  			var str = id.value;
  			arr = str.split(":");
  			if(arr.length > 1){
  				idStrs=idStrs+arr[0]+",";
  			}
  		});
  		if(idStrs==""){
  		 	$.Alert("请选择删除的信息");
  		 	return false;
  		}else{
  			if (confirm("确认要删除？")) {
			      	$.get('ServiceRtypeDelete.json?delIds='+idStrs,function(data)
			             {			      		
			               var del=eval('('+data+')'); 
			               $.Alert(del.message);
			               if($("#sel_RecordRequestType").val()=="" || $("#sel_RecordRequestType").val()==null){
			            	   initServiceRequestType("sel_RecordRequestType",$("#sel_SalesRequestType").val());
			            	}			               
			               admin.dataTable.fnDraw();				    
			        });
	      		}else{
	      		 return false;
	      		}	      		
  		}
  	}
});
//修改
$("#editButton").click(function(){
    if($("input[name='checkSendSmsId']:checked").size()!=1){
    	$.Alert("请选择修改信息,只能选择一条修改记录");
    	return;
    }
    var id=$("input[name='checkSendSmsId']:checked").val();
    var arr = new Array();
	arr = id.split(":");
	if(arr.length > 1){
		$("#SaveSendSmsForm").find("#id").val(arr[0]);
		$("#SaveSendSmsForm").find("#sel_name").val(arr[1]);
	}	
    $("#sendSmsModal").modal({
		show : true
    });
 });
//新增
$("#addButton").click(function(){
	$("#SaveSendSmsForm").find("#id").val("");
	$("#SaveSendSmsForm").find("#sel_name").val("");
	$("#sendSmsModal").modal({
		show : true
    });
});
//保存
$("#save_sale_leads").click(function(){
	var selName=$("#sel_name").val();
	var code=$("#sel_SalesRequestType").val();
    var code3=$("#sel_RecordRequestType").val();
    if(selName=="" || selName==null){
    	$.Alert('咨询名称不能为空!');
		return false;
    }
    if(code=="" || code==null){
    	$.Alert('请选择服务类型!');
		return false;
    }else{
    	if(code3!="" && code3!=null){
    		code=code3;
    	}
    	$.ajax({
            url:contextPath + "/inbound/serviceRequestTypeAdd.json",
            dataType:"json",
            data: {
		    	  "pid": code,
		    	  "id": $("#id").val(),
		    	  "name":$("#sel_name").val()
		       },
            type:"post",
            success:function(data){
                $.Alert(data.MESSAGE);
                $('#sendSmsModal').modal('hide');
                if(code3=="" || code3==null){
                	initServiceRequestType("sel_RecordRequestType",$("#sel_SalesRequestType").val());
            	}                
                admin.dataTable.fnDraw();
            },
            error:function(data){
                $.Alert(data.MESSAGE);
            }
        });
    }    
});
$("#sendsms_submit_button").click(function(){
	var code=$("#sel_SalesRequestType").val();
    var code3=$("#sel_RecordRequestType").val();
    if(code=="" || code==null){
    	$.Alert('请选择服务类型!');
		return false;
    }else{
    	if(code3!="" && code3!=null){
    		code=code3;
    	}
    	showSaveRecord(code);
    }	
});
function showSaveRecord(code){
	 $('#SaveRecordDataTable').dataTable().fnDestroy();
	admin.dataTable = $('#SaveRecordDataTable').on( 'processing.dt', function (e, settings, processing) {
		if ($('#chkbox-all-image').attr('checked')) {
			$('#chkbox-all-image').removeAttr('checked');
			$('#chkbox-all-image').parent().removeClass('checked');
		}
   }).dataTable({
							"bFilter" : false,
							"bSort" : false, 
							"bProcessing" : true,
							"sAjaxSource" : 'querySaveRecordByPage.json',
							"fnServerParams" : function(aoData) {
								aoData.push({
									"name" : "serviceRequestType.pid",
							        "value" : code
								}
								);
							},
							"sServerMethod" : "post",
							"bServerSide" : true,
							"aoColumns" :[
									{
										"mData" : "id","sWidth": "30px",'sClass':'text-center',
										"mRender" : function(data, type, row) {
											if(data){
												return "<input type='checkbox' class='checkboxes' id='checkSendSmsId' name='checkSendSmsId' value='"+row.id+":"+row.name+"' />";
											}
										}
									},{
										"mData" : "updateTime","sWidth": "120px",'sClass':'text-center',
										"mRender" : function(data, type, row) {
											if(data){
												return (new Date(data).format('yyyy-MM-dd hh:mm:ss')); 												
											}
										}
									},{
										"mData" : "pid","sWidth": "70px",'sClass':'text-center',
										"mRender" : function(data, type, row) {
											if(data){
												if(data.toString().length>2 && data.toString().length<5)
												return "二级";												
											}
											if(data){
												if(data.toString().length>4 && data.toString().length<7)
												return "三级";												
											}
										}
									},{
										"mData" : "name","sWidth": "70px",'sClass':'text-center',
										"mRender" : function(data, type, row) {
											if(data){
												return data;												
											}
										}
									}
						    ],
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
										if (textStatus == "timeout") {
											$.Alert("连接超时!请稍后再试!!!");
										} else if (textStatus == "error") {
											$.Alert("系统繁忙!!!,请稍后再试!!!");
										}
										admin.dataTable.fnProcessingIndicator(false);
									}
								});
							},
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
							"fnDrawCallback": function( oSettings ) {
	                   	 	$('input.checkboxes').uniform(); 
	                		},"fnInitComplete": function(oSettings, json) {
			                    $('.dataTables_length select').addClass("form-control input-sm");
			                    $('.dataTables_filter input').addClass("form-control input-medium");
			                } 
			});
}
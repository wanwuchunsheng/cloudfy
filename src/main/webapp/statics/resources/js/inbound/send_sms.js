$.ajaxSetup ({
cache: false 
});

admin={};

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

jQuery(document).ready(function() {
	initSendSmsType("sendtype");
	showSendSms();
   App.init(); 
    $("select.form-control").select2();
	   
   //联动日历
   $('.date-picker').datepicker({
        language:"zh-CN",
        rtl: App.isRTL(),
        autoclose: true,
        format:"yyyy-mm-dd"
   });
});

$("#sendtype").change(function(){
	$("#sendsmstype").val($("#sendtype").val());
});
   $("#btnSubmit").click(function(){
	    var sendsmstype=$("#sendsmstype").val();
		if(sendsmstype=="" || sendsmstype==null){
			$.Alert('请选择短信模板!');
			return false;
		}else{
			   var filename = $("#importFile").val();
			   if (filename) {
				    var reg_xlsx = /[^\.](\.xlsx)$/i;
					if (reg_xlsx.test(filename)) {
					$("#SaveSendSmsForm").submit();
					} else {
						$.Alert('Excel 格式不正确');
					}
				} else {
					$.Alert("请选择导入文件");
				}
		}	  
});
   
	$("#SaveSendSmsForm").ajaxForm({
		type : "post",
		dataType : "json",
		success : function(msg) {
			if (msg && msg[1]) {
				$.Alert(msg[1]);
				$('#sendSmsModal').modal('hide');		
	         	admin.dataTable.fnDraw();
			}
		},
		error : function(msg) {
			if (msg && msg[1]) {
				$.Alert(msg[1]);
			}
		}
	});

 $("#editButton").click(function(){
	 showEditSendSms("10031002");
 });
 
 $("#editnotButton").click(function(){
	 showEditSendSms("10031003");
 });
 
function sendSmsInfo(sendSmsId){	    
	    var _url=contextPath+"/inbound/querySendSmsInfo.json?r="+Math.random();
	    var paraJson={"sendSmsId":sendSmsId};
	    var createAjax = $("#sendSmsmyModalrw");
	    createAjax.empty();
	    createAjax.modal({
	    	backdrop:'static',
	        keyboard:false
	    });
	    createAjax.modal("show");
	    createAjax.load(_url,paraJson, function(data) {
	             
	    });
}
 
 function showEditSendSms(status){
	 if($("input[name='checkSendSmsId']:checked").size()!=1){
	    	$.Alert("请选择修改信息,只能选择一条修改记录");
	    	return;
	 }
	 var id=$("input[name='checkSendSmsId']:checked").val();
	 $.ajax({ 
	        url : 'sendSmsedit.json', 
	        type : 'POST',
	        dataType:'json', 
	        async:true,
	        data: {
		    	  "sendSmsId": id,
		    	  "status": status
		       }, 
	        success : function(data){
				$.Alert(data.MESSAGE);	     		
	         	admin.dataTable.fnDraw();	         	
	        }
	     });
 }

 $('#chkbox-all-image').click(function(){
	   $('.checkboxes').attr('checked', $('#chkbox-all-image').attr('checked') ? true : false ) ;  
		var $tr = $(this).parents("table").find("tbody tr");
		var $span = $(this).parents("table").find("tr .checker span");
		if( $(this).prop("checked") ){
			$tr.addClass("active");
			$span.addClass("checked");
		}else{
			$tr.removeClass("active");
			$span.removeClass("checked");
		}
	   jQuery.uniform.update();
	});          
	

	$('#delete').click(function() {
	   	if($("input[name='checkSendSmsId']:checked"))
	  	{
	  		var idStrs="";
	  		$("input[name='checkSendSmsId']:checked").each(function(i,id)
	  		{
	  			var str = id.value;
	  			idStrs=idStrs+str+",";	  			
	  		});
	  		if(idStrs==""){
	  		 	$.Alert("请选择删除的信息");
	  		 	return false;
	  		}else{
	  			if (confirm("确认要删除？")) {
				      	$.get('sendSmsDelete.json?delIds='+idStrs,function(data)
				             {			      		
				               var del=eval('('+data+')'); 
				               $.Alert(del.message);
				               admin.dataTable.fnDraw();				    
				        });
		      		}else{
		      		 return false;
		      		}	      		
	  		}
	  	}
	});
			
   $("#sendsms_submit_button").click(function(){
	   showSendSms();
});
   
   function perFormSendSms(id){
	   var sendsmstype=$("#sendsmstype").val();
		if(sendsmstype=="" || sendsmstype==null){
			$.Alert('请选择短信模板!');
			return false;
		}else{
			$.ajax({ 
		        url : 'perFormSendSms.json', 
		        type : 'POST',
		        dataType:'json', 
		        async:true,
		        data: {
			    	  "sendSmsId": id,
			    	  "status": '10031004',
			    	  "sendtype": sendsmstype
			       },  
		        success : function(data){
		        	$.Alert(data.MESSAGE);	     		
		         	admin.dataTable.fnDraw();
		        }
		     });
		}
   }
   
   function reFreshSendSms(id){
	 	$.ajax({ 
	        url : 'reFreshSendSms.json', 
	        type : 'POST',
	        dataType:'json', 
	        async:true,
	        data: {
		    	  "sendSmsId": id,
		    	  "status": '10031005'
		       },  
	        success : function(data){
	        	$.Alert(data.MESSAGE);	     		
	         	admin.dataTable.fnDraw();
	        }
	     });
  }
   
function showSendSms(){
	 $('#SendSmsdataTable').dataTable().fnDestroy();
	admin.dataTable = $('#SendSmsdataTable').on( 'processing.dt', function (e, settings, processing) {
		if ($('#chkbox-all-image').attr('checked')) {
			$('#chkbox-all-image').removeAttr('checked');
			$('#chkbox-all-image').parent().removeClass('checked');
		}
    }).dataTable({
							"bFilter" : false,
							"bSort" : false, 
							"bProcessing" : true,
							"sAjaxSource" : 'querySendSmsByPage.json',
							"fnServerParams" : function(aoData) {
								aoData.push({
									"name" : "status",
							        "value" : $('#status').val()
								}
								);
								aoData.push({
									"name" : "channelName",
							        "value" : $('#sendSmschannelName').val()
								}
								);
								aoData.push({
									"name" : "name",
							        "value" : $('#sendSmsName').val()
								}
								);
								aoData.push({
									"name" : "sendType",
							        "value" : $('#sendtype').val()
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
												return "<input type='checkbox' class='checkboxes' id='checkSendSmsId' name='checkSendSmsId' value='"+row.sendSmsId+"' />";
											}
										}
									},{
										"mData" : "creatTime","sWidth": "120px",'sClass':'text-center',
										"mRender" : function(data, type, row) {
											if(data){
												return (new Date(data).format('yyyy-MM-dd hh:mm:ss')); 												
											}
										}
									},{
										"mData" : "sumCount","sWidth": "70px",'sClass':'text-center',
										"mRender" : function(data, type, row) {
											if(data){
												return data;												
											}
										}
									},
									{
										"mData" : "userName",
										"sWidth" : "100px",
										'sClass' : 'text-center',
										"mRender" : function(data, type, row) {
											if (data) {											
												return data; 
											}
										}
									},
									{
										"mData" : "channelName",
										"sWidth" : "100px",
										'sClass' : 'text-center',
										"mRender" : function(data, type, row) {
											if (data) {											
												return getDictName("1007",data);
											}
										}
									},
									{
										"mData" : "name",
										"sWidth" : "100px",
										'sClass' : 'text-center',
										"mRender" : function(data, type, row) {
											if (data) {											
												return getDictName("1005",data);
											}
										}
									},
									{
										"mData" : "status",
										"sWidth" : "100px",
										'sClass' : 'text-center',
										"mRender" : function(data, type, row) {
											if (data) {
												return getDictName("1003",data);											
											}
									    }
									},
									{
										"mData" : "sendSmsId",
										"sWidth" : "100px",
										'sClass' : 'text-center',
										"mRender" : function(data, type, row) {
											if (row.status=="10031002") {
												return "<input class='btn btn-primary col-md-offset-1 search-user-info' type=button onclick=perFormSendSms('"+data+"') value=执行发送>";											
											}
											if (row.status=="10031004") {
												return "<input class='btn btn-primary col-md-offset-1 search-user-info' type=button onclick=reFreshSendSms('"+data+"') value=刷新>";											
											}
									    }
									},
									{
										"mData" : "sendSmsId","sWidth": "70px",'sClass':'text-center',
										"mRender" : function(data, type, row) {
											if(data){
												return "<input class='btn btn-primary col-md-offset-1 search-user-info' type=button onclick=sendSmsInfo('"+data+"') value=查看>";
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
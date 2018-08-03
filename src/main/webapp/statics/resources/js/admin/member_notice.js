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
	showNotice();
	showNoticeCount();
   App.init(); 
    $("select.form-control").select2();
	   
   //联动日历
   $('.date-picker').datepicker({
        language:"zh-CN",
        rtl: App.isRTL(),
        autoclose: true,
        format:"yyyy-mm-dd",
        startDate: new Date()
   });
});
   $("#btnSubmit").click(function(){
	    var title=$("#title1").val();
	    var content = CKEDITOR.instances.content1.getData();
		if(title=="" || title==null){
			$.Alert('公告标题不能为空!');
			return false;
		}
		if(content=="" || content==null){
			$.Alert('公告内容不能为空!');
			return false;
		}

		if(content.length>4000){
			$.Alert('公告内容最长为4000个字符!');
			return false;
		}
	   var saveAction="";
	   if($("#id").val()=="" || $("#id").val()==null){
		   saveAction="add.json"; 
	   }else{
		   saveAction="edit.json"; 
	   }	   
	   $.ajax({ 
	        url : saveAction, 
	        type : 'POST',
	        dataType:'json', 
	        async:true,
	        data: {
		    	  "id": $("#id").val(),
		    	  "title":$("#title1").val(),
		    	  "validateTime":$("#validateTime").val(),
		    	  "content":content
		       }, 
	        success : function(data){
				$.Alert(data.MESSAGE);
	         	$('#noticeModal').modal('hide');		
	         	admin.dataTable.fnDraw();
	         	showNoticeCount();
	        }
	     });
});
   
   $("#audSubmit").click(function(){
	   var title=$("#title1").val();
		var content = CKEDITOR.instances.content1.getData();
		var validateTime=$("#validateTime").val();
		if(title=="" || title==null){
			$.Alert('公告标题不能为空!');
			return false;
		}
		if(content=="" || content==null){
			$.Alert('公告内容不能为空!');
			return false;
		}
		if(content.length>4000){
			$.Alert('公告内容最长为4000个字符!');
			return false;
		}
		if(validateTime=="" || validateTime==null){
			$.Alert('有效时间不能为空!');
			return false;
		}
	 	$.ajax({ 
	        url : 'audit.json', 
	        type : 'POST',
	        dataType:'json', 
	        async:true,
	        data: {
		    	  "id": $("#id").val(),
		    	  "title":$("#title1").val(),
		    	  "validateTime":$("#validateTime").val(),
		    	  "content":content
		       }, 
	        success : function(data){ 
	        	$.Alert(data.MESSAGE);
	        	$('#noticeModal').modal('hide');
	        	admin.dataTable.fnDraw();
	        	showNoticeCount();
	        }
	     });
	});

 $("#addButton").click(function(){
    	$("#saveNoticeForm").attr("action","add.json");
    	$("#saveNoticeForm").attr('method','post'); 
     	$("#saveNoticeForm").find("#title1").val("");
     	CKEDITOR.instances.content1.setData("");
     	$("#saveNoticeForm").find("#validateTime").val("");
     	$("#saveNoticeForm").find("#validateEndTime").val("");
     	$("#saveNoticeForm").find("#pubTime").val("");
     	$("#saveNoticeForm").find("#id").val("");
        $("#noticeModal").modal({
			show : true
		});
 });

 $("#editButton").click(function(){
    if($("input[name='checkNoticeId']:checked").size()!=1){
    	$.Alert("请选择修改信息,只能选择一条修改记录");
    	return;
    }
    var id=$("input[name='checkNoticeId']:checked").val();
    var arr = new Array();
	arr = id.split(":");
	if(arr.length > 1){
		id=arr[0];
	}
	if(arr[1]!=$('#pubUsernames').val()){
		$.Alert("发布人非本人,不可修改!");
		return false;
	}else{
		$.get('showEdit.json?id='+id,function(data)
			     {
			     	    $("#updateAjax").html(data);
			     	 	var noticeData=eval('('+data+')'); 
			     	 	$("#saveNoticeForm").find("#id").val(noticeData.id);
			     	    $("#saveNoticeForm").find("#title1").val(noticeData.title);
			     	 	CKEDITOR.instances.content1.setData(noticeData.content);
			     	 	if(noticeData.validateTime!=null){
			     	 		$("#saveNoticeForm").find("#validateTime").val(new Date(noticeData.validateTime).format('yyyy-MM-dd'));
			     	 	}else{
			     	 		$("#saveNoticeForm").find("#validateTime").val("");
			     	 	}
			     	 	if(noticeData.validateEndTime!=null){
			     	 		$("#saveNoticeForm").find("#validateEndTime").val(new Date(noticeData.validateEndTime).format('yyyy-MM-dd'));
			     	 	}else{
			     	 		$("#saveNoticeForm").find("#validateEndTime").val("");
			     	 	}
			     	 	
			     	 	if(noticeData.pubTime!=null){
			     	 		$("#saveNoticeForm").find("#pubTime").val(new Date(noticeData.pubTime).format('yyyy-MM-dd'));
			     	 	}else{
			     	 		$("#saveNoticeForm").find("#pubTime").val("");
			     	 	}
			     	 	$("#saveNoticeForm").attr("action", "edit.json?id="+noticeData.id);
			     });
			     $("#noticeModal").modal({
						show : true
				 });
	}
 });

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
	   	if($("input[name='checkNoticeId']:checked"))
	  	{
	  		var idStrs="";
	  		var arr = new Array();
	  		$("input[name='checkNoticeId']:checked").each(function(i,id)
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
	  			if(arr[1]!=$('#pubUsernames').val()){
  					$.Alert("发布人非本人,不可删除!");
  					return false;
  				}else{
  					if (confirm("确认要删除？")) {
  				      	$.get('delete.json?delIds='+idStrs,function(data)
  				             {			      		
  				               var del=eval('('+data+')'); 
  				               $.Alert(del.message);
  				               admin.dataTable.fnDraw();
  				               showNoticeCount();
  				        });
  		      		}else{
  		      		 return false;
  		      		}
  				}	      		
	  		}
	  	}
	});
			
   $("#member_submit_button").click(function(){
	   showNotice();
	   showNoticeCount();
});
   
   function showNoticeCount(){
	   var addData="title="+$('#title').val()+"&"+"pubUser="+$('#pubUsername').val()+"&"+"startTime="+$('#startTime').val()+"&"+"endTime="+$('#endTime').val();
	 	$.ajax({ 
	        url : 'showNoticeCount.json', 
	        type : 'POST',
	        dataType:'json', 
	        async:true,
	        data : addData, 
	        success : function(data){
	        	$('#noticeCount').html(data.NOTICECOUNT);
	        }
	     });
   }
   
function showNotice(){
	 $('#dataTable').dataTable().fnDestroy();
	admin.dataTable = $('#dataTable').on( 'processing.dt', function (e, settings, processing) {
		if ($('#chkbox-all-image').attr('checked')) {
			$('#chkbox-all-image').removeAttr('checked');
			$('#chkbox-all-image').parent().removeClass('checked');
		}
    }).dataTable({
							"bFilter" : false,
							"bSort" : false, 
							"bProcessing" : true,
							"sAjaxSource" : 'queryMemberNoticeByPage.json',
							"fnServerParams" : function(aoData) {
								aoData.push({
									"name" : "title",
							        "value" : $('#title').val()
								}
								);
								aoData.push({
									"name" : "pubUser",
							        "value" : $('#pubUsername').val()
								}
								);
								aoData.push({
									"name" : "startTime",
							        "value" : $('#startTime').val()
								}
								);
								aoData.push({
									"name" : "endTime",
							        "value" : $('#endTime').val()
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
												return "<input type='checkbox' class='checkboxes' id='checkNoticeId' name='checkNoticeId' value='"+row.id+":"+row.pub_user_loginid+"' />";
											}
										}
									},{
										"mData" : "title","sWidth": "200px",'sClass':'text-left',
										"mRender" : function(data, type, row) {
											if(data){
												if(row.notice_id!=null){
													return "<a href='javascript:void(0)' onclick='noticeDetail("+row.id+","+row.notice_id+")'  data-toggle='modal' data-target='#myModalxjgg2'>"+data+"</a>"
												}else{
													if(row.status=="2"){
														return "<a href='javascript:void(0)' onclick='noticeDetail("+row.id+",1)'  data-toggle='modal' data-target='#myModalxjgg2'>"+data+"</a>"
													}else{
														return "<a href='javascript:void(0)' onclick='noticeDetail("+row.id+",0)'  data-toggle='modal' data-target='#myModalxjgg2'>"+data+"</a>&nbsp;&nbsp;<i class='red'>new</i>"
													}
													
												}
												
											}
										}
									},
									{
										"mData" : "validate_time",
										"sWidth" : "100px",
										'sClass' : 'text-center',
										"mRender" : function(data, type, row) {
											if (data) {											
												return (new Date(data).format('yyyy-MM-dd')); 
											}
										}
									},
									{"mData" : "pub_user","sWidth":"50px"},
									{
										"mData" : "pub_time",
										"sWidth" : "100px",
										'sClass' : 'text-center',
										"mRender" : function(data, type, row) {
											if (data) {
												if(row.status==2){
													return "待发布";
												}else{
													return new Date(data).format('yyyy-MM-dd hh:mm:ss');
												}												
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
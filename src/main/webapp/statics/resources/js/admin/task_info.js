jQuery(document).ready(function() {    
   App.init(); // initlayout and core plugins
   $("select").select2();
   admin.dataTable=$('#dataTable').on( 'processing.dt', function (e, settings, processing) {
		if ($('#chkbox-all-image').attr('checked')) {
			$('#chkbox-all-image').removeAttr('checked');
			$('#chkbox-all-image').parent().removeClass('checked');
		}
    }).dataTable({
						"bFilter" : false,
						"bSort" : false, // 排序功能
						"bProcessing" : true,// 设置异步请求时，是否有等待框。
						"sAjaxSource" : 'queryByPage.json',
						"fnServerParams" : function(aoData) {
							
						},
						"sServerMethod" : "post",
						"bServerSide" : true, // 异步请求
						"aoColumns" :[
							{
								"mData" : "id","sWidth": "30px",'sClass':'text-center',
								"mRender" : function(data, type, row) {
									if(data){
										return "<input type='checkbox' class='checkboxes' id='checkNoticeId' name='checkNoticeId' value="+row.id+" />";
									}
								}
								},
						
								{
									"mData" : "taskName"
								},{
									"mData" : "taskTypeValue",
									"mRender" : function(data, type, row) {
										if(admin.taskType[""+data]){
											return admin.taskType[""+data];
										}else {
											return data;
										}
									}
								},{
									"mData" : "taskPropertyValue",
									"mRender" : function(data, type, row) {
										if(admin.property[""+data]){
											return admin.property[""+data];
										}else {
											return data;
										}
									}
								},{
									"mData" : "serviceTypeValue",
									"mRender" : function(data, type, row) {
										if(admin.serviceType[""+data]){
											return admin.serviceType[""+data];
										}else {
											return data;
										}
									}
								},{
									"mData" : "brand",
									"mRender" : function(data, type, row) {
										if(data==1){
											return "别克";
										}else if(data==2){
											return "雪佛兰";
										}else if(data==3){
											return "凯迪拉克";
										}
									}
								},{
									"mData" : "priorityValue"
								},{
									"mData" : "assignType",
									"mRender" : function(data, type, row) {
										if(data==1){
											return "自动";
										}else if(data==2){
											return "手动";
										}
									}
								},{
									"mData" : "responsiblePerson",
									"mRender" : function(data, type, row) {
										if(data==1){
											return "呼叫中心";
										}else if(data==2){
											return "其他部门";
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
								"timeout" : 3000000, // 连接超时时间
								"error" : function handleAjaxError(xhr,
										textStatus, error) {
									if (textStatus === "timeout") {
										//$.dopErr("连接超时!请稍后再试!!!");
										$.Alert("连接超时!请稍后再试!!!");
									} else if (textStatus == "error") {
										//$.dopErr("系统繁忙!!!,请稍后再试!!!", null);
										$.Alert("系统繁忙!!!,请稍后再试!!!");
									}
									admin.dataTable.fnProcessingIndicator(false);// 这里是把"正在查询几个子去掉，(换成自己的id)
								}
							});
						},   //设置异常处理
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
						,"sDom": 'l<"table-toolbar margin-top-10">frtip',	
							"fnDrawCallback": function( oSettings ) {
	                   	 	$('input.checkboxes').uniform(); 
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


		 $("#addTaskInfo").click(function(){
		    	$("#saveTaskInfoForm").attr("action","add.json");
		    	$("#saveTaskInfoForm").attr('method','post'); 
	     	 	$("#saveTaskInfoForm").find("#id").val('');
	     	    $("#saveTaskInfoForm").find("#code").val('');
	     	 	$("#saveTaskInfoForm").find("#brand_f").val('');
	     	 	$("#saveTaskInfoForm").find("#serviceType_f").val('');
	     	 	$("#saveTaskInfoForm").find("#taskType_f").val('');
	     	 	$("#saveTaskInfoForm").find("#property_f").val('');
	     	 	$("#saveTaskInfoForm").find("#taskName").val('');
	     	 	$("#saveTaskInfoForm").find("#priority_f").val('');
	     	 	$("#saveTaskInfoForm").find("#questionnaireCode").val('');
	     	 	$("#saveTaskInfoForm").find("#assignType_f").val('');
	     	 	$("#saveTaskInfoForm").find("#responsiblePerson_f").val('');
	     	 	$("#saveTaskInfoForm").find("#assigneeOption").val('');
	     	 	$("#saveTaskInfoForm").find("#assignTime").val('');
	     	 	$("#saveTaskInfoForm").find("#processTime").val('');
	     	 	$("#saveTaskInfoForm").find("#assignRate").val('');
		        $("#TaskInfoModal").modal({
					show : true
				});
	     	 	$("#s2id_serviceType_f .select2-chosen").html("请选择");
	     	 	$("#s2id_taskType_f .select2-chosen").html("请选择");
	     	 	$("#s2id_priority_f .select2-chosen").html("请选择");
	     	 	$("#s2id_assignType_f .select2-chosen").html("请选择");
	     	 	$("#s2id_property_f .select2-chosen").html("请选择");
	     	 	$("#s2id_responsiblePerson_f .select2-chosen").html("请选择");
	     	 	$("#s2id_brand_f .select2-chosen").html("请选择");
		 });
    	 $("#editTaskInfo").click(function(){
    		 $("#saveTaskInfoForm").find("#serviceType").val(3);
    		    if($("input[name='checkNoticeId']:checked").size()!=1){
    		    	$.Alert("请选择修改信息,只能选择一条修改记录");
    		    	return;
    		    }
    		    var id=$("input[name='checkNoticeId']:checked").val();
    			 $.get('showEdit.json?id='+id,function(data)
    			     {
    			     	    $("#updateAjax").html(data);
    			     	    //console.debug(data);
    			     	 	$("#saveTaskInfoForm").find("#id").val(data.id);
    			     	    $("#saveTaskInfoForm").find("#code").val(data.code);
    			     	 	$("#saveTaskInfoForm").find("#brand_f").val(data.brand);
    			     	 	$("#saveTaskInfoForm").find("#serviceType_f").val(data.serviceType);
    			     	 	$("#saveTaskInfoForm").find("#taskType_f").val(data.taskType);
    			     	 	$("#saveTaskInfoForm").find("#property_f").val(data.property);
    			     	 	$("#saveTaskInfoForm").find("#taskName").val(data.taskName);
    			     	 	$("#saveTaskInfoForm").find("#priority_f").val(data.priority);
    			     	 	$("#saveTaskInfoForm").find("#questionnaireCode").val(data.questionnaireCode);
    			     	 	$("#saveTaskInfoForm").find("#assignType_f").val(data.assignType);
    			     	 	$("#saveTaskInfoForm").find("#responsiblePerson_f").val(data.responsiblePerson);
    			     	 	$("#saveTaskInfoForm").find("#assigneeOption").val(data.assigneeOption);
    			     	 	$("#saveTaskInfoForm").find("#assignTime").val(data.assignTime);
    			     	 	$("#saveTaskInfoForm").find("#processTime").val(data.processTime);
    			     	 	$("#saveTaskInfoForm").find("#assignRate").val(data.assignRate);
    			     	 	$("#saveTaskInfoForm").attr("action", "edit.json?id="+data.id);
    			     	 	$("#s2id_serviceType_f .select2-chosen").html($("#serviceType_f option:selected").text());
    			     	 	$("#s2id_taskType_f .select2-chosen").html($("#taskType_f option:selected").text());
    			     	 	$("#s2id_priority_f .select2-chosen").html($("#priority_f option:selected").text());
    			     	 	$("#s2id_assignType_f .select2-chosen").html($("#assignType_f option:selected").text());
    			     	 	$("#s2id_property_f .select2-chosen").html($("#property_f option:selected").text());
    			     	 	$("#s2id_responsiblePerson_f .select2-chosen").html($("#responsiblePerson_f option:selected").text());
    			     	 	$("#s2id_brand_f .select2-chosen").html($("#brand_f option:selected").text());
    			     });
    			     $("#TaskInfoModal").modal({
    						show : true
    				 });
    	 });
    	$('#deleteTaskInfo').click(function() {
    		   	if($("input[name='checkNoticeId']:checked"))
    		  	{
    		  		var idStrs="";
    		  		$("input[name='checkNoticeId']:checked").each(function(i,id)
    		  		{
    		  			idStrs=idStrs+id.value+",";
    		  		});
    		  		if(idStrs==""){
    		  		 	$.Alert("请选择删除的信息");
    		  		}else{
    		      		if (confirm("确认要删除？")) {
    				      	$.get('delete.json?delIds='+idStrs,function(data)
    				             {			      		
    				               $.Alert(data.message);
    				               admin.dataTable.fnDraw();
    				        });
    		      		}else{
    		      		 return false;
    		      		}
    		  		}
    		  	}
    		});
    	 
    	 
    	 
    	 $("#btnTaskInfoSubmit").click(function(){
  		   //alert('click btnTaskInfoSubmit')
    		 var brand = $("#saveTaskInfoForm").find("#brand_f").val();
    		 var taskName = $("#saveTaskInfoForm").find("#taskName").val();
    		 var code = $("#saveTaskInfoForm").find("#code").val();
    		 var questionnaireCode = $("#saveTaskInfoForm").find("#questionnaireCode").val();
	     	 var assigneeOption = $("#saveTaskInfoForm").find("#assigneeOption").val();
	     	 var assignTime = $("#saveTaskInfoForm").find("#assignTime").val();
	     	 var processTime = $("#saveTaskInfoForm").find("#processTime").val();
	     	 var assignRate = $("#saveTaskInfoForm").find("#assignRate").val();    		 
    		 
    		 
    		 if($.trim(taskName)!=false && taskName.length>100){
    			 $.Alert('任务名称的长度不能超过100个字符!');
    			 return false;
    		 }
    		 if($.trim(taskName)==false){
    			 $.Alert('任务名称不能为空!');
    			 return false;
    		 }
    		 if($.trim(code)!=false && code.length>50){
    			 $.Alert('编码的长度不能超过50个字符!');
    			 return false;
    		 }   		 
    		 if($.trim(brand)==false){
    			 $.Alert('品牌不能为空!');
    			 return false;
    		 }
    		 if($.trim(questionnaireCode)!=false && questionnaireCode.length>50){
    			 $.Alert('问卷编号的长度不能超过50个字符!');
    			 return false;
    		 } 
    		 
    		 if($.trim(assigneeOption)!=false && assigneeOption.length>11){
    			 $.Alert('指派范围的长度不能超过11位整数!');
    			 return false;
    		 } 
    		 if($.trim(assigneeOption)!=false && isNumeric(assigneeOption)!=true){
    			 $.Alert('指派范围是整数, 请输入整数!');
    			 return false;
    		 } 
 
    		 if($.trim(assignTime)!=false && assignTime.length>11){
    			 $.Alert('分配时间的长度不能超过11位整数!');
    			 return false;
    		 } 
    		 if($.trim(assignTime)!=false && isNumeric(assignTime)!=true){
    			 $.Alert('分配时间是整数, 请输入整数!');
    			 return false;
    		 } 
    		 
    		 if($.trim(processTime)!=false && processTime.length>10){
    			 $.Alert('处理时间的长度不能超过11位整数!');
    			 return false;
    		 } 
    		 if($.trim(processTime)!=false && isNumeric(processTime)!=true){
    			 $.Alert('处理是整数, 请输入整数!');
    			 return false;
    		 } 
    		 
    		 if($.trim(assignRate)!=false && assignRate.length>10){
    			 $.Alert('分配频率的长度不能超过11位整数!');
    			 return false;
    		 } 
    		 if($.trim(assignRate)!=false && isNumeric(assignRate)!=true){
    			 $.Alert('分配频率是整数, 请输入整数!');
    			 return false;
    		 } 
    		 
    		 //var addData=$("#saveTaskInfoForm").serialize();
			 //console.debug(addData);
			 var options = {
				        target: '#saveTaskInfoForm',
				        type:"post",
				        dataType: 'json',
				         success:function(data){
							$.Alert(data.message);
				         	$('#TaskInfoModal').modal('hide');		
				         	 admin.dataTable.fnDraw();
				         	 //showNoticeCount();
				         }
				    };
				$("#saveTaskInfoForm").ajaxSubmit(options);
				return false;
			}); 
    	 
    	 function isNumeric(a)
    	 {
    	    var reg=/(^\d+$)/;
    	    return(reg.test(a));
    	 }
    	 
});
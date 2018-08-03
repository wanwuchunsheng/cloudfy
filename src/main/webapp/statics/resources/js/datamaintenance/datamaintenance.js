admin={};
jQuery(document).ready(function() {    
	   App.init(); // initlayout and core plugins
	   //TableManaged.init();
	   $("select.form-control").select2();
	   
	   $('#deleteDataButton').click(function() {
		   	if($("input[name='code']:checked"))
		  	{
		  		var idStrs="";
		  		$("input[name='code']:checked").each(function(i,id)
		  		{
		  			idStrs=idStrs+id.value+",";
		  		});
		  		if(idStrs==""){
		  		 	alert("请选择删除的信息");
		  		}else{
		      		if (confirm("确认要删除？")) {
				      	$.get('deleteData.json?codeIds='+idStrs,function(data)
				             {
				               var del=eval('('+data+')'); 
				               alert(del);
				               admin.dataTable.fnDraw();
				        });
		      		}else{
		      		 return false;
		      		}
		  		}
		  	}
		});
	   
	   $("#addDataButton").click(function(){
	    	$("#saveCodeForm").attr("action","saveData.json");
	    	$("#saveCodeForm").attr('method','post'); 
	     	$("#saveCodeForm").find("#codeType_add").val("");
	     	$("#saveCodeForm").find("#code_add").val("");
	     	$("#saveCodeForm").find("#code_add").removeAttr("readonly");
	     	$("#saveCodeForm").find("#codeName_add").val("");
	     	$("#saveCodeForm").find("#remark_add").val("");
	     	$("#saveCodeForm").find("#id").val("");
	     	$("#btnSubmit").html("新增");
	        $("#dataModal").modal({
				show : true
			});
	 });
	   
	   $("#btnSubmit").click(function(){
		   var codetype = $('#codeType_add').val();
		   var reg = /^\d*/i;
		   
		   if(codetype==null || codetype==''){
			   $.Alert("代码类型不能为空!");
			   return;
		   }
		   
		   if(codetype.match(reg)==false){
			   $.Alert("代码类型必须为数字!");
			   return;
		   }
		   
		   var code = $('#code_add').val();
		   if(code==null || code==''){
			   $.Alert("代码不能为空!");
			   return;
		   }
		   
		   if(code.match(reg) == false){
			   $.Alert("代码必须为数字!");
			   return;
		   }
		   
		   var codename = $('#codeName_add').val();
		   if(codename==null || codename==''){
			   $.Alert("代码名称不能为空");
			   return;
		   }
		   
		   var remark = $('#remark_add').val();
		   if(remark==null || remark==''){
			   $.Alert("标记不能为空");
			   return;
		   }
		   
		   var options = {
			        target: '#saveCodeForm',
			        type:"post",
			        dataType: 'html',
			        success:function(data){
			        	if(data==1){
			        		$.Alert("代码保存成功!");
			        		$('#dataModal').modal('hide');		
				         	admin.dataTable.fnDraw();
			        	}else{
			        		$.Alert("该代码已经存在!");
			        	}
			         },
			         error:function(e){
			        	 $.Alert("信息保存失败");
			         }
			    };
			$("#saveCodeForm").ajaxSubmit(options);
			return false;
		});
	   
	   $("#editDataButton").click(function(){
		    if($("input[name='code']:checked").size()!=1){
		    	alert("请选择修改信息,只能选择一条修改记录");
		    	return;
		    }
		    var id=$("input[name='code']:checked").val();
			 $.get('showEdit.json?codeId='+id,function(data)
			     {
			     	    $("#updateAjax").html(data);
			     	 	var codeData=eval('('+data+')'); 
			     	 	$("#saveCodeForm").find("#id").val(codeData.code);
			     	    $("#saveCodeForm").find("#codeType_add").val(codeData.codeType);
			     	 	$("#saveCodeForm").find("#code_add").val(codeData.code);
			     	 	$("#saveCodeForm").find("#code_add").attr("readonly","readonly");
			     	 	$("#saveCodeForm").find("#codeName_add").val(codeData.codeName);
			     	 	$("#saveCodeForm").find("#remark_add").val(codeData.remark);
			     	 	$("#btnSubmit").html("修改");
			     	 	$("#saveCodeForm").attr("action", "edit.json");
			     });
			     $("#dataModal").modal({
						show : true
				 });
		 });
	   
   $("#data_submit_button").click(function(){
		$('#dataTable').dataTable().fnDestroy();
 		admin.dataTable=$('#dataTable').dataTable({
				"bFilter" : false,
				"bSort" : false, 
				"bProcessing" : true,
				"sAjaxSource" : 'queryCodeListByPage.json',
				"fnServerParams" : function(aoData) {
					aoData.push({
						"name" : "codeType",
						"value" : $('#codeType').val()
					}
					);
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
								alert("连接超时!请稍后再试!!!");
							} else if (textStatus == "error") {
								alert("系统繁忙!!!,请稍后再试!!!");
							}
							prmt.dataTable.fnProcessingIndicator(false);
						}
					});
				}, 
				"aoColumns": [
				       {"mData":"code","sWidth":"80px","sClass":"text-center",
				    	 "mRender":function(data,type,row){
				    		 if(data){
				    			 return "<input type='checkbox' class='checkboxes' id='codeId' name='code' value="+row.code+" />";
				    		 }
				    	 }},
                       { "mData": "codeType","sWidth": "250px"},
                       { "mData": "code","sWidth": "150px",'sClass':'text-center'},
                       { "mData": "codeName","sWidth": "100px"},
                       { "mData": "remark","sWidth": "150px",'sClass':'text-center'}
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
   
	});

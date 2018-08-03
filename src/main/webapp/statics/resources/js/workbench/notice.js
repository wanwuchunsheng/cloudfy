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
        format:"yyyy-mm-dd"
   });
});        
		
   //查询
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
	admin.dataTable = $('#dataTable').dataTable({
							"bFilter" : false,
							"bSort" : false, 
							"bProcessing" : true,
							"sAjaxSource" : 'queryNoticeListByPage.json',
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
								aoData.push({
									"name" : "status",
							        "value" : 1
								}
								);
							},
							"sServerMethod" : "post",
							"bServerSide" : true,
							"aoColumns" :[
									{
										"mData" : "title","sWidth": "200px",'sClass':'text-left',
										"mRender" : function(data, type, row) {
											if(data){
												if(row.notice_id!=null){
													return "<a href='javascript:void(0)' onclick='noticeDetail("+row.id+","+row.notice_id+")'  data-toggle='modal' data-target='#myModalxjgg2'>"+data+"</a>"
												}else{
													return "<a href='javascript:void(0)' onclick='noticeDetail("+row.id+",0)'  data-toggle='modal' data-target='#myModalxjgg2'>"+data+"</a>&nbsp;&nbsp;<i class='red'>new</i>"
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
													return "<span class='label label-sm label-warning'>待发布</span>";
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
										if (textStatus === "timeout") {
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
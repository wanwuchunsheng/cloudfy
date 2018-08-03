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
	   App.init(); // initlayout and core plugins
	   //TableManaged.init();
	   $("select.form-control").select2();
	    //联动日历
	   $('.date-picker').datepicker({
	        language:"zh-CN",
	        rtl: App.isRTL(),
	        autoclose: true,
	        format:"yyyy-mm-dd"
	   });
	   $("#data_submit_button").click(function(){
		   search();
	   });
	});

//听录音
function saveIvrRecord(id,handleFlag){
	//1：开始听取录音 
	
	//不重复更新已得过的录音ivr信息
	if(handleFlag==12781001){
		 $.Alert("留言不能重复处理");
		return;
	}
    //2：更新处理状态
    $.ajax({
        url:contextPath + '/record/ivr/saveIvrRecord.json',
        dataType:"json",
        data:"id="+id,
        type:"post",
        success:function(data){
        	search();
            //$.Alert(data.MESSAGE);
        },
        error:function(data){
            $.Alert(data.MESSAGE);
        }
    });
}
//弹出窗
function windOpen(connid,extension){
	var ip=$("#CallRecordIp").val();
	var url="http://"+ip+"/PlayRecord.aspx?ConnectionID="+connid+"&Extension="+extension;	
	window.open(url);
}
//查询
function search(){
	$('#sampleDataTable').dataTable().fnDestroy();
		admin.dataTable=$('#sampleDataTable').dataTable({
			"bFilter" : false,
			"bSort" : false, 
			"bProcessing" : true,
			"sAjaxSource" : contextPath + '/record/ivr/queryIvrRecordByPage.json',
			"fnServerParams" : function(aoData) {
				aoData.push({
					"name" : "startTime",
					"value" : $('#startTime').val()
				});
				aoData.push({
					"name" : "endTime",
					"value" : $('#endTime').val()
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
							alert("连接超时!请稍后再试!!!");
						} else if (textStatus == "error") {
							alert("系统繁忙!!!,请稍后再试!!!");
						}
						prmt.dataTable.fnProcessingIndicator(false);
					}
				});
			}, 
			"aoColumns": [
                   { "mData": "telephone","sWidth": "150px"},
                   { "mData": "connid","sWidth": "150px",'sClass':'text-left'},
                   { 
    	        	   "mData": "recordTime",
    	        	   "mRender" : function(data, type, row) {
    						if(data){
    							return new Date(data).format('yyyy-MM-dd hh:mm:ss');
    						}
    					}   
    	           },
                   { 
    	        	   "mData": "handleFlag",
    	        	   "mRender" : function(data, type, row) {
    						if(data){
    							return getDictName("1278",data);
    						}
    					}
    	        		   
    	           },
                   { "mData": "handlePerson","sWidth": "150px",'sClass':'text-center'},
                   { 
    	        	   "mData": "handleTime",
    	        	   "mRender" : function(data, type, row) {
    						if(data){
    							return new Date(data).format('yyyy-MM-dd hh:mm:ss');
    						}
    					}   
    	           },
    	           {
						"mData" : "id","sWidth": "150px",'sClass':'text-center',
						"mRender" : function(data, type, row) {
							if(data){
							return "<input class='btn btn-primary col-md-offset-1 search-user-info' type=button onclick='saveIvrRecord("+data+","+row.handleFlag+")' value=处理>";
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

   
}
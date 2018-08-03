// JavaScript Document
//任务类型
var taskType = $("#taskType").valueOf();
//任务名称
var taskName = $("#taskName").valueOf();
//服务类型
var serviceType = $("#serviceType").valueOf();
$(document).ready(function(e) {
    $("#query").click(function(e){
		$.ajax({
			type:POST,
			url:"../admin/taskmanagement/query.json",
			data:"taskType=taskType & taskName=taskName &serviceType = serviceType",
			datatype:json,
			success: function(message){
				var jsondata = $.parseJSON(msg);
                //解析json数据
                $.each(jsondata,function(i,item)
                {
                     //jsondata[i].sno		//访问的格式
                	$.Alert("获得任务库json数据");
                });

		    }
	   });
    });
});
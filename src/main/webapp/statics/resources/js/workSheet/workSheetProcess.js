
$(function(){
    if ($("#taskName").val() =="CSRCLOSE") {
        $("#flowUserNnameDiv").remove();
        $("#isAcceptDiv").remove();
    }
    if ($("#taskName").val() =="SV") {
        $("#flowUserNnameDiv").remove();
        $("#isAcceptDiv").remove();
    }
    if ($("#pdName").val() =="work_sheet_consultation") {
        $("#flowUserNnameDiv").remove();
        $("#isAcceptDiv").remove();
    }
     
    /** 动态加载表单 */
    var workSheetType = $("#sheetType").val();
    $.ajax({
        type : "POST",
        url : "/workSheet/queryWorkSheetCfg.json",
        data : {
            workSheetType:workSheetType
        },
        success : function(data) {
            if( data === "undefind" || data == null) return;
            $("#formWrap").renderForm({ 
                data: data 
            });
            
            queryWorkSheet();
            $("#show_work_sheet :input").attr("readonly", true);
            $("#show_work_sheet select").attr("readonly", true);
            $("#show_work_sheet textarea").attr("readonly", true);
        }
    }, "json"); 

    //save_btn
    var $saveBtn = $("#save_btn"), $flowHistory = $("#flowHistory");
    $saveBtn.on("click", function(){
        if( $flowHistory.is(":empty")){
            $flowHistory.show().load("/workSheetFlow/getProHistory.htm?sheetNo="+$("#sheetNo").val(), function(){
                $saveBtn.children("i").removeClass("fa-angle-down").addClass("fa-angle-up");
            });
        }else{
            if( $flowHistory.is(":hidden") ){
                $flowHistory.show();
                $(this).children("i").removeClass("fa-angle-down").addClass("fa-angle-up");
            }else{
                $flowHistory.hide();
                $(this).children("i").removeClass("fa-angle-up").addClass("fa-angle-down");
            }
        }
    });
     
});

 

/**  查询工单 给表单设置默认值 */
function queryWorkSheet(){
    $.ajax({
        type : "POST",
        data : {pid:$("#pid").val()},
        url : "/workSheet/showByProcInst.json",
        success : function(json) {
            $("#sheetNoLabel").text( json.sheetNo);
            $("input[name='sheetNo']").val(json.sheetNo);
            $("input[name='serviceRecordType']").val(json.serviceRecordType);
            $("input[name='accountName']").val(json.accountName);
            $("input[name='accountId']").val(json.accountId);
            $("input[name='accountPhone']").val(json.accountPhone);
            $("#accountPhoneBtn").attr("href","javascript:isp.makeCall('"+json.accountPhone+"')");
            $("input[name='contactName']").val(json.contactName);
            $("input[name='contactPhone']").val(json.contactPhone);
            $("#downdtFileDiv").html('<a  href="javascript:void(0)" onclick=downdtFile("'+json.attachmentId+'","'+json.attachmentName+'")>'+json.attachmentName+'</a>');
            $("#content").val(json.content);
            $("#content").attr("title",json.content);
            $("#remark").attr("title",json.remark);
            $("#remark").val(json.remark);
            $("select[name='priority']").find("option").each(function(i,obj){
                if($(obj).val() == json.priority) {
                    $(obj).attr("selected",true);
                }
            });
            $("select[name='source']").find("option").each(function(i,obj){
                if($(obj).val() == json.source) {
                    $(obj).attr("selected",true);
                }
            });
            $("select.form-control").select2();
            $("#sheetType").val(json.sheetType);
            $(json.sheetExt).each(function(i,d){ 
                  if (d.filedType =="input" || d.filedType=="datetime" ) {
                      $("input[name='"+d.filedCode+"']").val(d.filedValue);
                  }
                  if(d.filedType=="select"){
                      $("select[name='"+d.filedCode+"']").val(d.filedValue);
                  }
                  if(d.filedType=="checkbok"){ 
                      $("#formWrap :checkbox[name='"+d.filedCode+"']").each(function(i,ckb){
                         var vals   = d.filedValue.split(",");
                         var i = vals.length; 
                         while (i--) {
                             if (vals[i] == $(ckb).val()) {
                                 $(ckb).parent().addClass("checked");
                                 $(ckb).attr("checked","checked"); 
                             }
                         } 
                      });
                      
                  }
            });
        }
     }, "json"); 
};

/** 提交工单处理意见 */
function saveHandleRecord() {
     
    if($("#flowUserId").val() != undefined){
        if ($("#flowUserId").val() == "" || $("#flowUserId").val() == null ) {
            $.Alert("请选择指派人员!");
            return ;
        }
    }
    if ($("#disposeRemark").val() == "" || $("#disposeRemark").val() == null) {
        $.Alert("请填写处理意见!");
        return ;
    }
    if($("#isAccept").val() != undefined){
        if ($("#isAccept").val() == "" || $("#isAccept").val() == null) {
            $.Alert("请选择客户是否接受!");
            return ;
        }
    }
    $("#save_btn2").attr("disabled", true);
    $("#save_btn2").removeClass("blue");
    var recordVO ={disposeRemark:$("#disposeRemark").val(),
               sheetNo:$("#sheetNo").val(),
               pid:$("#pid").val(),
               taskId:$("#taskId").val(),
               isAccept:$("#isAccept").val(),
               attacheId:$("#attachmentId").val(),
               attacheName:$("#attachmentName").val(),
               assigneeUserId:$("#flowUserId").val()};
    $.ajax({
        type : "POST",
        url : "/workSheetFlow/handleProcess.json",
        dataType : 'json',
        contentType : "application/json",
        /** 序列化表格 **/
        data : JSON.stringify(recordVO),
        success : function(json) {
            if ( json === "undefind" || json == null) {
                $.Alert("保存错误!");
                return;
            }
            if (json.code == 2) {
                $.Alert("保存错误!");
                return;
            }
            $.Alert("保存成功!",null,function(){
                parent.mainTab.refresh( "/workSheetFlow/goCandidateTaskList.htm");
                parent.mainTab.destroy();
            });
            
        },
        error : function handleAjaxError(xhr, textStatus, error) {
            if (textStatus == "parsererror") {
                window.location.replace(xhr.getResponseHeader("redirectUrl"));
                return;
            }
            $("#save_btn2").removeAttr("disabled");
            $("#save_btn2").addClass("blue");
        }
    });
    return;
}

function btnBack(){
    window.location.href = "/workSheetFlow/goCandidateTaskList.htm";
}

function downdtFile(id,name) {
    var dynamicForm =   $("<form>");
    dynamicForm.attr("method","post").attr("action","/workSheet/downdtFile.json");
    dynamicForm.append($("<input>").attr("name","attachmentId").attr("value",id));
    dynamicForm.append($("<input>").attr("name","fileName").attr("value",name));
    $(document.body).append(dynamicForm);
    dynamicForm.submit();  
}

$(function(){
    /** 动态加载表单 */
    var workSheetType = $("#sheetType").val(),
        $wrap = $("#recordHistory");
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
            $("#workSheetForm :input").attr("readonly", true);
            $("#workSheetForm select").attr("readonly", true);
            $("#workSheetForm textarea").attr("readonly", true);
            
        }
    }, "json");
//    App.blockUI( $wrap );
//    $.ajax({
//        url: "/workSheetFlow/getProHistory.htm?sheetNo="+$("#sheetNo").val(),
//        cache: false,
//        dataType: "html",
//        success: function( html ){
//            alert(html);
//            $wrap.append( $(html).find("#tbContent").html());
//            App.unblockUI( $wrap );
//        }
//    })
    $("#recordHistory").load("/workSheetFlow/getProHistory.htm?sheetNo="+$("#sheetNo").val()+" .form-group");
});

 

/**  查询工单 给表单设置默认值 */
function queryWorkSheet(){
    $.ajax({
        type : "POST",
        data : {sheetNo:$("#sheetNo").val()},
        url : "/workSheet/getWorkSheetExt.json",
        success : function(json) { 
            $(json).each(function(i,d){ 
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
    
    $("#choice_save").attr("disabled", true).addClass("disabled");
    var recordVO ={disposeRemark:$("#disposeRemark").val(),
               sheetNo:$("#sheetNo").val(),
               attacheId:$("#attachmentId").val(),
               attacheName:$("#attachmentName").val() };
    $.ajax({
        type : "POST",
        url : "/workSheetFlow/additionalRecord.json",
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
            $.Alert("保存成功!","", function(){
                $('#choiceModal').modal("hide");
                window.location.href = "/workSheet/show.htm?sheetNo=" + $("#sheetNo").val();
            });
        },
        error : function handleAjaxError(xhr, textStatus, error) {
            if (textStatus == "parsererror") {
                window.location.replace(xhr.getResponseHeader("redirectUrl"));
                return;
            }
            $("#choice_save").removeAttr("disabled");
            $("#choice_save").addClass("blue");
        }
    });
    return;
}


$(function(){
    getSheetNo();
    if(gl.getCurCust()!=null && gl.getCurCust()!="null"){
        $("input[name='accountName']").val(gl.getCurCust().name);
        $("input[name='accountId']").val(gl.getCurCust().userId);
        $("input[name='accountPhone']").val(gl.getCurCust().custMobileNum);  
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
        }
    }, "json");
    
    /* 表单校验 */
    (function () {

      var form = $('#workSheetForm');
      var error = $('.alert-danger', form);
      var success = $('.alert-success', form);
      
      form.validate({
          errorElement: 'span',
          errorClass: 'help-block',
          focusInvalid: false, 
          ignore: "",
          errorPlacement:function(error,element) { 
        	  error.appendTo(element.next(".help-block") );
          },
          rules: {
              //服务类型
              serviceRecordType: {
                  number: true,
                  maxlength: 11
              },
              //会员名称
              accountName: {
                  maxlength: 50
              },
              //会员号码
              accountId: {
                  number: true,
                  maxlength: 11
              },
              //会员手机号码
              accountPhone:{
                  number : true,
                  maxlength:50
              },
              //联系人姓名
              contactName:{
                  maxlength:50
              },
              //联系人手机
              contactPhone:{
                  number : true,
                  maxlength:50
              },
              //工单内容
              content: {
                  maxlength: 2000
              },
              //备注信息
              remark: {
                  maxlength: 2000
              }
          },

          messages: {
              //服务类型
              serviceRecordType: {
                  number: "只能输入数字",
                  maxlength: "不能超过11位数字"
              },
              //会员名称
              accountName: {
                  maxlength: "不能超过50个字符"
              },
              //会员号码
              accountId: {
                  number: "只能输入数字",
                  maxlength: "不能超过11位数字"
              },
              //会员手机
              accountPhone: {
                  number: "只能输入数字",
                  maxlength: "不能超过50位数字"
              },
              //联系人姓名
              contactName: {
                  maxlength: "不能超过50个字符"
              },
              //联系人姓名
              contactPhone: {
                  number: "只能输入数字",
                  maxlength: "不能超过50位数字"
              },
              //工单内容
              content: {
                  maxlength: "不能超过2000个字符"
              },
              //工单内容
              remark: {
                  maxlength: "不能超过2000个字符"
              }
          },

          invalidHandler: function (event, validator) {         
              success.hide();
              error.show();
              App.scrollTo(error, -200);
          },

          highlight: function (element) {
              $(element).closest('.form-group').addClass('has-error');
          },

          unhighlight: function (element) {
              $(element).closest('.form-group').removeClass('has-error');
          },

          success: function (label) {
              label.closest('.form-group').removeClass('has-error');
          },

          submitHandler: function (form) {
                saveWorkSheet();
//              success.show();
              error.hide();
          }
      });
    })();
    
    /** 获取工单编号 */  
});

//遍历获取指定区域表单的name和value
function getNameVal( $obj ){
   var sheetNo = $("input[name='sheetNo']").val();
   var arr = [], cheNameArr = [];
   $obj.find(":text, :file, :password, :radio:checked, select").each(function( index, item ){
     var obj = {
         sheetNo:sheetNo,
         filedCode: $( item ).attr("name"),
         filedValue: $( item ).val()
     };
     arr.push(obj);
   })
   //checkbox
   $obj.find(":checkbox:checked").each(function( index, item ){
       var name = $(item).attr("name")
       if( $.inArray( name, cheNameArr ) === -1 ){
           cheNameArr.push( name );
       }
   })
   var len = cheNameArr.length; 
   for( i = 0; i < len; i++ ){
     var objName = cheNameArr[i], objVal = "";
     $obj.find(":checkbox:checked[name='" + cheNameArr[i] + "']").each(function( index, item ){
        objVal += $(item).val() + ",";
     });
     objVal = objVal.substring(0, objVal.length -1);
     var obj = {
         sheetNo:sheetNo,
         filedCode: objName,
         filedValue: objVal
     };
     arr.push(obj);
   }
   return arr;
}

/** 保存工单 */
function saveWorkSheet(){
    $("#savebtn").attr("disabled", true);
    $("#savebtn").removeClass("blue");
     var sheetNo = $("input[name='sheetNo']").val();
     var serviceRecordType = $("input[name='serviceRecordType']").val();
     var accountName = $("input[name='accountName']").val();
     var accountId = $("input[name='accountId']").val();
     var accountPhone = $("input[name='accountPhone']").val();
     var contactName = $("input[name='contactName']").val();
     var serviceId = $("input[name='serviceId']").val();
     var contactPhone = $("input[name='contactPhone']").val();
     var content = $("#content").val();
     var remark = $("#remark").val();
     var attachmentName = $("#attachmentName").val();
     var attachmentId = $("#attachmentId").val();
     var priority = $("select[name='priority']").val(); 
     var source = $("select[name='source']").val();
     var sheetType = $("#sheetType").val();
     var workSheetVO = {
        sheetNo:sheetNo,
        serviceRecordType: serviceRecordType,
        accountName:accountName,
        accountId:accountId,
        accountPhone:accountPhone,
        contactName:contactName,
        contactPhone:contactPhone,
        serviceRecordId:serviceId,
        attachmentName:attachmentName,
        attachmentId:attachmentId,
        remark:remark, 
        sheetType:sheetType, 
        content:content,
        priority:priority,
        source:source, 
        sheetExt: getNameVal( $("#formWrap"))
     };
     $.ajax({
         type : "POST",
         data : JSON.stringify(workSheetVO),
         contentType : "application/json",
         url : "/workSheet/save.json",
         success : function(json) {
             if ( json === "undefind" || json == null) {
                 $.Alert("保存工单错误!");
                 return;
             }
             if (json.code == 2) {
                 $.Alert("保存工单错误!");
                 return;
             }
             $.Alert("保存成功!",null,function(){
                 $("#savebtn").removeAttr("disabled");
                 $("#savebtn").addClass("blue");
                 window.location.href = "/workSheet/goQueryWorkSheetList.htm";
             });
             
             
         }
         
     }, "json"); 
     $("#savebtn").removeAttr("disabled");
     $("#savebtn").addClass("blue");
}; 

//计算工单编号
function getSheetNo(){
    var dateVar = new Date();
    dateVar  =  "SR" + dateVar.format("yyyyMMddhhmmssS") +parseInt(Math.random() * 9);
    $("#sheetNoLabel").text( dateVar);
    $("#sheetNo").val(dateVar);
}

// form对象 json 
function formToObject(obj) {
    var object = {};
    $.each(obj, function(index) {
        if (object[this["name"]]) {
            object[this["name"]] = object[this["name"]] + "," + this["value"];
        } else {
            object[this["name"]] = this["value"];
        }

    });
    return object;
}



function goBackButton(){
    document.location.href = document.referrer?document.referrer:"";
}


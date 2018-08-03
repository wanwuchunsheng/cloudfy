// 上传插件初始化
$(function() {
    var uploadFileNameForDraft = $('#uploadFileNameForDraft');
    $('#uploadifyForDraft').fileupload({
        //iframe: true,
        url : '/workSheet/uploadTestFile.json',
        autoUpload : true, // 是否自动上传
        dataType : 'json',
        maxNumberOfFiles : 1, // 一次最大上传数,
        change : function(e, data) {
            $('#uploadifyForDraft').attr('disabled', 'disabled');
        },
        done : function(e, data) {// 上传成功后触发
            if (data.result.code == 1) {
                $.Alert('上传成功');
                uploadFileNameForDraft.val(data.result.message);
                $("#attachmentId").val(data.result.data.attachmentId);
                $("#attachmentName").val(data.result.data.attachmentName);
                $('#uploadifyForDraft').siblings('span').text("重传文件");
            } else {
                $.Alert(data.result.message);
            }
            $('#uploadifyForDraft').removeAttr('disabled');
            // 过多少秒后归位进度条
            window.setTimeout(function() {
                $('#progress .bar').css('width', 0 + '%');
            }, 2000);
        },
        fail : function(e, data) {// 失败时触发
            $('#progress .bar').css('width', 0 + '%');
            $('#uploadifyForDraft').removeAttr('disabled');
            $.Alert('上传失败稍后再试');
        },
        progressall : function(e, data) {// 上传时进度条管理
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css('width', progress + '%');
        },
    });

});
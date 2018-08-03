/**
 * 此类是组织结构数据公共使用类
 * v_tianlijun
 * 
 * contextPath 项目路径 再引用此js前必须定义
 */
//查询所有知识库分类信息 compnentName:组件的id bSelect:是否出现“请选择” currentId: 当前选中值得id
function initKnowFileType(compnentName, bSelect, currentId){
	$.ajax({
        url : contextPath + "/knowledge/option.json",
        type : "post",
        dataType:"json",
        success:function(data){
            $("#" + compnentName + " option").remove();
            if(bSelect){
            	if (currentId == '请选择') {
            		$("#" + compnentName).append("<option option:selected value=''>请选择</option>");
            	} else {
            		$("#" + compnentName).append("<option value=''>请选择</option>");
            	}
            }
            for ( var i = 0; i < data.length; i ++ ) {
            	if (data[i].id == currentId) {
            		$("#" + compnentName).append("<option selected='selected' value='" + data[i].id + "'>" + data[i].kbFileTypeName + "</option>");
            	} else {
            		$("#" + compnentName).append("<option value='" + data[i].id + "'>" + data[i].kbFileTypeName + "</option>");
            	}
            }
            if (currentId) {
            	$("#s2id_" + compnentName + " .select2-chosen").html($("#" + compnentName + " option:selected").text());
            }
        }
    });
};
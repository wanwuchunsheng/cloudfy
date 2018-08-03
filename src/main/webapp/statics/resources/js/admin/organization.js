/**
 * 此类是组织结构数据公共使用类
 * v_douzaixing
 * 
 * contextPath 项目路径 再引用此js前必须定义
 */
//查询所有部门信息 compnentName:组件的id bSelect:是否出现“请选择” currentId: 当前选中部门id isSelectPosition: 是否级联查询岗位
//positionCompnentName : 岗位下拉框组件id positionCurrentId:当前选中岗位IdpositionCompnentName, positionCurrentId
function initDepartment(compnentName, bSelect, currentId, isSelectPosition, callBack){
    $.ajax({
        url : contextPath + "/admin/department/query.json",
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
            		$("#" + compnentName).append("<option selected='selected' value='" + data[i].id + "'>" + data[i].deptName + "</option>");
            	} else {
            		$("#" + compnentName).append("<option value='" + data[i].id + "'>" + data[i].deptName + "</option>");
            	}
            }
            if (currentId) {
            	$("#s2id_" + compnentName + " .select2-chosen").html($("#" + compnentName + " option:selected").text());
            }
            
            if (isSelectPosition) {
            	//initPosition(positionCompnentName, currentId, true, positionCurrentId);
            	callBack();
            }
        }
    });
}

function initPosition(compnentName, deptId, bSelect, currentId) {
	$.ajax({
        url : contextPath + "/admin/department/position/queryAll.json",
        type : "post",
        dataType:"json",
        data : {
        	deptId : deptId
        },
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
            		$("#" + compnentName).append("<option selected='selected' value='" + data[i].id + "'>" + data[i].name + "</option>");
            	} else {
            		$("#" + compnentName).append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
            	}
            }
            if (currentId) {
            	$("#s2id_" + compnentName + " .select2-chosen").html($("#" + compnentName + " option:selected").text());
            }
        }
    });
}

function initUser(compnentName, deptId, positionId, bSelect, currentId) {
	$.ajax({
        url : contextPath + "/admin/user/queryAll.json",
        type : "post",
        dataType:"json",
        data : {
        	deptId : deptId,
        	positionId : positionId
        },
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
            		$("#" + compnentName).append("<option selected='selected' value='" + data[i].id + "'>" + data[i].name + "</option>");
            	} else {
            		$("#" + compnentName).append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
            	}
            }
            if (currentId) {
            	$("#s2id_" + compnentName + " .select2-chosen").html($("#" + compnentName + " option:selected").text());
            }
        }
    });
}
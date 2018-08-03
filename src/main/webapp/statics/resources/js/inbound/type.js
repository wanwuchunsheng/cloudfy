/*服务类型*/
function getServiceTypeByCode(code){
	var name='';
	name=getDictName('40025',code);
	return name;
}
/*呼入呼出*/
function getCallTypeByCode(code){
	var name='';
	switch(code){
		case 1:
			name='呼入';
			break;
		case 2:
			name='呼出';
			break;
		default:
			;
	}
	return name;
}

/*品牌*/
function getBrandNameByCode(code){
	var name='';
	if(!code){
		return name;
	}
	switch(parseInt(code)){
		case 1:
			name='别克';
			break;
		case 2:
			name='雪佛兰';
			break;
		case 3:
			name='凯迪拉克';
			break;
		default:
			;
	}
	return name;
}

/*邮件接收方*/
function transferReceiveSys(data){
    if(data=='1'){
        return '品牌';
    }else if(data=='2'){
        return "HelpDesk";
    }else if(data =='3'){
        return "积分商城";
    }else if(data=='4'){
        return "CAC";
    }
}
$.ajaxSetup({ 
  async: false 
 }); 
function getDictName(dictType,dictValue){
	var type = dictType;
	var detailName=dictValue;
	var _url = contextPath + '/admin/admin_data/datamaintenance/codeType.json';
	$.ajax({
		url:_url,
		data:"codeType="+type,
		dataType:"json",
		success:function(data){
			$(data).each(function(i,item){
				if(dictValue==item.code){
					detailName = item.codeName;
					return;
				}
			});
		},
		error:function(data){
			$.ALERT(JSON.stringify(data));
		}
	});
	return detailName;
}
function getTelephone(telCode){
	var type = "40044";
	var tel='';
	var _url = contextPath + '/admin/admin_data/datamaintenance/codeType.json';
	$.ajax({
		url:_url,
		data:"codeType="+type,
		dataType:"json",
		success:function(data){
			$(data).each(function(i,item){
				if(telCode==item.code){
					tel = item.codeName;
					return;
				}
			});
		},
		error:function(data){
			$.ALERT(JSON.stringify(data));
		}
	});
	return tel;
}
function taskStatus(code){
    var statusName="";
    if("65280"==code){
    	statusName="待分配";
    }else if("65281"==code){
    	statusName="已分配待处理";
    }else if("65282"==code){
    	statusName="处理中";
    }else if("65283"==code){
    	statusName="被回收";
    }else if("65535"==code){
    	statusName="已经处理";
    }
    return statusName;
}
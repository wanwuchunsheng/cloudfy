var serviceTypeArr=[];
/*根据code得到名称，匹配不上，返回空*/
function getServiceTypeName(serviceTypeCode){
	var serviceTypeName='';
	if(serviceTypeArr.length==0){
		//init serviceTypeArr
		$.ajax({
			url:contextPath+'/record/queryServiceType.json',
			dataType:'json',
			type:'post',
			async:false,
			success:function(data){
				serviceTypeArr=data;
				serviceTypeName=switchCodeName(serviceTypeCode);
			}
		});
		return serviceTypeName;
	} else{
		return switchCodeName(serviceTypeCode);
	}
	
}
/*将code转换为name*/
function switchCodeName(serviceTypeCode){
	var serviceTypeName='';
	$.each(serviceTypeArr,function(i,item){
		if(serviceTypeCode==item.code){
			serviceTypeName=item.name;
			return;
		}
	});
	return serviceTypeName;
}
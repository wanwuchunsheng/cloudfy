function getRegionByProvinceName(regionId){
	var detailName;
	var _url = contextPath + '/admin/intent/getRegionByProvinceName.json';
	$.ajax({
		url:_url,
		data:"regionId="+regionId,
		dataType:"json",
		success:function(data){
			detailName=data.PROVINCENAME;
		},
		error:function(data){
			$.ALERT(JSON.stringify(data));
		}
	});
	if((detailName==null)||(detailName=='null')){
		detailName="";
	}
	return detailName;
}

function getRegionByCityName(regionId){
	var detailName;
	var _url = contextPath + '/admin/intent/getRegionByCityName.json';
	$.ajax({
		url:_url,
		data:"regionId="+regionId,
		dataType:"json",
		success:function(data){
			detailName=data.CITYNAME;
		},
		error:function(data){
			$.ALERT(JSON.stringify(data));
		}
	});
	if((detailName==null)||(detailName=='null')){
		detailName="";
	}
	return detailName;
}

function getModelsCd(id){
	var detailName;
	var _url = contextPath + '/admin/intent/getCarModelsByModelsCd.json';
	$.ajax({
		url:_url,
		data:"id="+id,
		dataType:"json",
		success:function(data){
			detailName=data.MODELSCD;
		},
		error:function(data){
			$.ALERT(JSON.stringify(data));
		}
	});
	return detailName;
}

function getSeriesCnName(id){
	var detailName;
	var _url = contextPath + '/admin/intent/getCarSeriesBySeriesCnName.json';
	$.ajax({
		url:_url,
		data:"id="+id,
		dataType:"json",
		success:function(data){
			detailName=data.SERIESCNNAME;
		},
		error:function(data){
			$.ALERT(JSON.stringify(data));
		}
	});
	return detailName;
}
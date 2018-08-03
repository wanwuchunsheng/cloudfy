
function getCodeByCodeType(codeType,callback){
    var type = codeType;
	var url = contextPath + '/datamaintenance/codeType.json';
	$.post(url,{codeType:type},callback);	
}

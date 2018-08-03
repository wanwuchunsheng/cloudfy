/*得到项目根路径*/
function getBasePath(){
	/*var location = (window.location+'').split('/'); 
	var basePath = '/'+location[3]; 
	return basePath;*/
	return contextPath;
}
/*显示省列表：compnentId，省下拉select的id；bSelect，是否需要显示“请选择”选项（true or flase）*/ 
function initProvince(compnentId,bSelect){
        $.ajax({
            url:getBasePath()+"/common/area/province.json",
            type:"post",
            dataType:"json",
            success:function(data){
                $("#"+compnentId+" option").remove();
                if(bSelect){
                    $("#"+compnentId).append("<option value=''>--请选择--</option>");
                }
                $.each(data,function(key,value){
                    $("#"+compnentId).append("<option value='" + value + "'>"+key+"</option>");
                });
            }
        });
    }

	/*根据省显示市列表：compnentId，市下拉select的id；provinceCode，选择的省级代码；bSelect，是否需要显示“请选择”选项（true or flase）*/
   function initCity(compnentId,provinceCode,bSelect,cityCode){
       $.ajax({
          url:getBasePath()+"/common/area/city.json",
          type:"post",
          dataType:"json",
          data:"areaCode="+provinceCode,
          success:function(data){
              $("#"+compnentId+" option").remove();
              if(bSelect){
                  $("#"+compnentId).append("<option value='' >--请选择--</option>");
              }
              $.each(data,function(key,value){
          		 if(cityCode==value){
          			 $("#"+compnentId).append("<option selected='selected'  value='" + value + "'>"+key+"</option>");
          		 }else{
          			 $("#"+compnentId).append("<option   value='" + value + "'>"+key+"</option>");
          		 }
              });
            //  $("#"+compnentId).select2();
          }
      });
  }

	/*根据市级代码显示区县列表：compnentId，区县下拉select的id；cityCode，选择的市级代码；bSelect，是否需要显示“请选择”选项（true or flase）*/
  function initCourty(compnentId,cityCode,bSelect){
        $.ajax({
           url:getBasePath()+"/common/area/courty.json",
           type:"post",
           dataType:"json",
           data:"areaCode="+ cityCode,
           success:function(data){
               $("#"+compnentId+" option").remove();
               if(bSelect){
                   $("#"+compnentId).append("<option value='' selected>--请选择--</option>");
               }
               $.each(data,function(key,value){
                   $("#"+compnentId).append("<option value='" + value + "'>"+key+"</option>");
               });
           }
       });
   }
	
  /*查询code得到省市区的名称*/
  function getProvinceName(areaCode){
	  var areaName=areaCode;
        $.ajax({
           url:getBasePath()+"/common/area/findAreaName.json",
           type:"post",
           dataType:"json",
           data:"areaCode="+ areaCode,
           success:function(data){
        	   if(data && data.areaName){
        		   areaName=data.areaName;
        	   }
           },
           error:function(data){
        	   alert(JSON.stringify(data));
           }
       });
      return areaName;
   }
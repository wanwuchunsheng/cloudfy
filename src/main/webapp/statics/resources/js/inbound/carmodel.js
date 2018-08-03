var inbound_carmodel = {
   
   getCarSeries : function(conId,brandParam){
	   $("#"+conId).empty();
	   $("#"+conId).append("<option value='' selected>--请选择--</option>");
       $("select").select2(); //刷新下拉菜单
	   if(brandParam==''){
		   return;
	   }
	   var url = contextPath + "/carModel/getSeries.json";
	   
	   var data = {brand:brandParam};
	   
	   $.post(url,data,function(json){
		   var series = $.parseJSON(json);
	       for(var i=0;i<series.length;i++){
	    	 var optionstr = "<option value='" + series[i].carSeriesId + "'>" + series[i].seriesCnName + "</option>";
	    	 $("#"+conId).append(optionstr);
	       }
	   });
   },

   getCarModels : function(conId,seriesParam){
	   $("#"+conId).empty();
	   $("#"+conId).append("<option value='' selected>--请选择--</option>");
	   $("select").select2(); //刷新下拉菜单
	   if(seriesParam==''){
		   return;
	   }
       var url = contextPath + "/carModel/getModels.json";
	   
	   var data = {seriesId:seriesParam};
	   
	   $.post(url,data,function(json){
		   var models = $.parseJSON(json);
	       for(var i=0;i<models.length;i++){
	    	 var optionstr = "<option value='" + models[i].id + "'>" + models[i].modelsCnName + "</option>";
	    	 $("#"+conId).append(optionstr);
	       }
	   });
	   
   }
}
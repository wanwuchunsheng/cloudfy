var carmodel = {
   
   getCarSeries : function(brandParam,carSeriesId,carModelId){
	   $(carSeriesId).find("option").remove();
	   $(carModelId).find("option").remove();
	   $(carSeriesId).append("<option value=''>-车系-</option>");
	   $(carModelId).append("<option value=''>-车型-</option>");
	   //由于弹窗打开重复引入select2资源，只能手动重置select2，恶心！
	   $(carSeriesId).find("option:eq(0)").attr("selected",true);
	   $(carModelId).find("option:eq(0)").attr("selected",true);
	   $("#s2id_"+carSeriesId.replace("#","")).find(".select2-chosen").text("-车系-");
	   $("#s2id_"+carModelId.replace("#","")).find(".select2-chosen").text("-车型-");
       //$("select").select2(); //刷新下拉菜单
	   if(brandParam==''){
		   return;
	   }
	   var url = contextPath + "/carModel/getSeries.json";
	   
	   var data = {brand:brandParam};
	   
	   $.post(url,data,function(json){
		   var series = $.parseJSON(json);
	       for(var i=0;i<series.length;i++){
	    	 var optionstr = "<option value='" + series[i].carSeriesId + "'>" + series[i].seriesCnName + "</option>";
	    	 $(carSeriesId).append(optionstr);
	       }
	   });
   },

   getCarModels : function(seriesParam,carModelId){
	   $(carModelId).find("option").remove()
	   $(carModelId).append("<option value=''>-车型-</option>");
	   //由于弹窗打开重复引入select2资源，只能手动重置select2，恶心！
	   $(carModelId).find("option:eq(0)").attr("selected",true);
	   $("#s2id_"+carModelId.replace("#","")).find(".select2-chosen").text("-车型-");
	   //$("select").select2();
	   if(seriesParam==''){
		   return;
	   }
       var url = contextPath + "/carModel/getModels.json";
	   
	   var data = {seriesId:seriesParam};
	   $.post(url,data,function(json){
		   var models = $.parseJSON(json);
	       for(var i=0;i<models.length;i++){
	    	 var optionstr = "<option value='" + models[i].carModelsId + "'>" + models[i].modelsCnName + "</option>";
	    	 $(carModelId).append(optionstr);
	       }
	   });
	   
   }
}
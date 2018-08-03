/**
 * use for all
 */

/* render form item */
;(function( $ ) { 
	$.fn.extend({
		"renderForm": function( options ){
			options = $.extend({
				data: "", //表单数据，必须
				col: 2    //一行的表单项数量，默认2个，可选
			},options);
			return this.each(function(){
				var data = options.data,
					len = data.length,
					html = "<div class='col-md-12'>";
				if( data === "undefind" ) return;
				$.each( data, function( index, item ){
					html += "<div class='col-md-6'>";
					html += "<div class='form-group'>";
					html += "<label class='control-label col-md-3'>" + item.filedName + "：</label>";
            		html += "<div class='col-md-9'>";
            		//checkbox
                	if( item.filedType == "checkbox" ){
                		html += "<div class='checkbox-list'>";
                		if( item.item !== null ){	//如果为null，则不渲染
	                		$.each( item.item, function( index, data ){
	                    		html += "<label class='checkbox-inline'><input type='checkbox' name='" + item.filedCode + "' class='form-control' value='" + data.value + "'>" + data.name + "</label>";
	                    	});
                		};
                    	html += "</div>";
					}
            		//input
            		if( item.filedType == "input" ){
                		html += "<input type='text' class='form-control' name='" + item.filedCode + "' length='" + item.filedLength + "' >";
                	};
                	//select
                	if( item.filedType == "select" ){
                    	html += "<select class='form-control' name='" + item.filedCode + "'>";
                    	if( item.item !== null ){ //如果为null，则不渲染
	                    	$.each( item.item, function( index, data ){
	                    		html += "<option value='" + data.value + "'>" + data.name + "</option>";
	                    	});
	                    };
                    	html += "</select>";
					};
					//date
					if( item.filedType == "datetime" ){
                		html += "<input type='text' class='form-control date-picker' name='" + item.filedCode + "' length='" + item.filedLength + "' >";
                	};
					//index是否整除col参数为判断是滞换行分列
					/*if(!((index+1)%options.col)){
						console.log( item.filedName )
						html += "</div></div>";
					}else{
						html
					}*/
					html += "</div><div class='clearfix'></div></div></div>";
				});
				html += "</div>";
				$(this).prepend( html );
				//app.init
				App.init();
		        //datapicker
		        $('.date-picker').datepicker({
		            language: 'zh-CN',
		            rtl: App.isRTL(),
		            autoclose: true,
		            format: "yyyy-mm-dd"
		        });
			});
		}
	});
})( jQuery );

//app.init
App.init();
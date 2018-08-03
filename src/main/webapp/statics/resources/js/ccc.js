$(function(){
	// ccc.js Edit By Edward 20140521 

	// check radio init
	App.init();
	
	// begin with the select change event 
	(function(selObj1,selObj2){
		selObj1.on("change",function(){
			if( /稍后联系/.test($(this).val()) ){
				selObj2.removeClass("hidden");
			}else{
				selObj2.addClass("hidden");
			}
		}); 
	})($("#s1"),$("#s2Div"));
	// end the select change event
	
	// begin with ib select change event
	(function(obj1,obj2){
		obj1.change(function(){
			if( $(this).val() == "0"){
				obj2.html("<option>value==0</option>");
			}else if( $(this).val() == "1"){
				obj2.html("<option>value==1</option>");
			}
			obj2.select2();
		})
	})($("#ibSel1"),$("#ibSel2"));
	// end the ib select change event
	var dtTableInit = null;
	// begin with click the btn named button
	(function(){
		$("#iframeDom").load(function(){
			if(top.window != window){	// if this is iframe
				return false;
			}
			var iframeDocument = $("#iframeDom")[0].contentWindow.document;
			var obj = $(iframeDocument).find(".input-group-btn a"),
				href = obj.attr("href"),
				id = obj.attr("data-target").substr(1);
			if( $("#"+id).length==0 ){
				$("body").append('<div id="'+id+'" class="modal fade in"></div>');
				$("#ajax button.close").click(function(){
					$("#"+id).modal("hide");
				})
			}else{
				$("#"+id+" .modal-body").empty();
			}
			obj.on("click",function(oEvent){
				$("#"+id).load(href,function(data){
					$(this).find("select").select2({
						"minimumResultsForSearch":-1
					});
					$("#"+id).modal("show");	
					TableManaged()
				});
				var oEvent = oEvent || window.event;
				oEvent.returnValue = false;
				return false;
			});
		})
	})();
	// end click the btn named button 
	
	// begin with auto get car number 
	(function(obj1,obj2,obj3){
		var objSpan = obj1.find(".caption span:first"),
			objTr = obj1.find(".portlet-body tbody tr");
	    objSpan.html(" "+objTr.length);
		obj3.html(obj2.html()*1+1);
	})($("#autoGetNum"),$("#contactNum"),$("#addContactNum"));
	// end car number

	// begin with btn toggle
	(function(obj){
		obj.eq(0).click(function(){
			obj.slice(1).removeClass("hidden");
			$(this).addClass("hidden");
		});
		obj.eq(1).add(obj.eq(2)).click(function(){
			obj.slice(1).addClass("hidden");
			obj.eq(0).removeClass("hidden");
		})
	})($("#toggleBtn a"));
	// end btn toggle
	
	// begin with btn toggle
	(function(obj){
		obj.each(function(){
			$(this).children("a").first().click(function(){
				$(this).siblings("a").removeClass("hidden")
				$(this).addClass("hidden");
			});
			$(this).children("a").slice(1).click(function(){
				$(this).siblings("a").add($(this)).addClass("hidden");
				$(this).siblings("a").first().removeClass("hidden");
			})
		});
		
	})($(".toggleBtn"));
	// end btn toggle
	
	// begin with input Init
	(function(obj1,obj2){
		var txt1 = $(obj1).find("span").text(),
			txt2 = $(obj2).find("span").text();
		$(obj1+"Input").val(txt1);
		$(obj2+"Input").val(txt2);
	})("#textPara","#textParaTel");
	// end input Init
	
	// begin with select init;
	$("select").select2();
	// end select init;
});
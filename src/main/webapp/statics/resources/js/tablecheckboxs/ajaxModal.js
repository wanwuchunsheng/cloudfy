/*
$("[data-toggle='modal']").on('click',function(){
	$(this).ajaxModal({
		widthe:'modal-wide',
		callback:function(){					
			$('select').select2();
			$('.kk').on('click',function(){						
				$.ajaxModal.close('myModalxjgg');
			});
		}
	});
});

<a href="javascript:;" src="modalload.html" data-toggle="modal" data-target="#myModalxjgg">xxx</a>

注：data-target 不能重复
*/
;(function($){
	$.ajaxModal=$.fn.ajaxModal=function(param){
		var $this=$(this);
		var def = {
			id:$this.attr('data-target').split('#')[1],
			widthe:'',
			callback:$.noop,
			url:$this.attr('src')
		}

		var def=$.extend(true, def,param);
		var _id=def.id;
		var _class=def.widthe;
		var _url=def.url;
		var _callback=($.isFunction(def.callback)&&def.callback)?def.callback:$.noop;

		_showModal=function(){
			createModal(_id,_class);
		}

		_showModal();

		function createModal(id,type){
			var html='<div class="modal fade" id="'+id+'"  tabindex="-1" role="dialog">'
	          		+'<div class="modal-dialog '+(_class?_class:'')+'">'
	          			+'<div class="modal-content"></div>'
	          		+'</div>'
	       		 +'</div>';
	       
	       	if(modalsize($('#'+_id))){
	       		$('body').append(html);
	       	}
	       	var object=$('#'+_id);	      
	       	loadDlogHtml(object.find('.modal-content'),_url,_callback);
		}

		function modalsize(obj){
			return obj.length>0?false:true;
		}

		function loadDlogHtml(obj,url,callback){			
			obj.load(url,function(){
				callback.call(this);

			});
		}
	
		$.ajaxModal.close=$.fn.ajaxModal.close=function(_id){
			$('#'+_id).modal("hide");		
		}
	}
})(jQuery)
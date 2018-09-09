
var TableManaged = function(param) {
				return {
					//main function to initiate the module
					init : function() {
						
						
						if (!jQuery().dataTable) {
							return;
						}

						// begin first table
						$('#'+param.id).dataTable({					
							"bFilter" : param.bFilter?param.bFilter:false,
							"bSort" : param.bFilter?param.bFilter:false, // 排序功能							
							/* "fnServerParams" : function (aoData,fnCallback) {
								 ($.isFunction(fnCallback)&&fnCallback)?fnCallback(aoData):$.noop;
							 }*/
						    "bProcessing" : true, // 设置异步请求时，是否有等待框。ram.url,
						    //"sServerMethod" : "post",
						    //"bServerSide" : true, // 异步请求
						    "aoColumns":param.columns?param.columns:null,//sTitle 定义列的标题, sClass 定义列的样式, fnRender 函数用来渲染列
							
						    "bLengthChange":param.bLengthChange?param.bLengthChange:false, //true为显示  false为隐藏
							//"sAjaxSource":param.url,
							"aLengthMenu" : [[5, 10, 20], [5, 10, 20]],
							"iDisplayLength" : param.length?param.length:5,
							"sPaginationType" : "bootstrap",
							"aaSorting" : [[2, "asc"]],
							"aoColumnDefs" : [{
								"sDefaultContent" : '',
								"aTargets" : ["_all"]
							}],
							"fnServerData" : function(sSource, aoData, fnCallback) {
								var timeout_message = "连接超时!请稍后再试!!!";
								var error_message = "系统繁忙!请稍后再试!!!";
								$.ajax({
									"dataType" : 'json',
									"type" : "POST",
									"url" : sSource,
									"data" : aoData,
									"success" :  ($.isFunction(fnCallback)&&fnCallback)?fnCallback():$.noop,
									"timeout" : 3000000, // 连接超时时间
									"error" : function handleAjaxError(xhr, textStatus, error) {
										if (textStatus === "timeout") {											
											$.Alert_message(timeout_message);
										} else if (textStatus == "error") {					
											$.Alert_message(error_message);
										}

										$('#'+param.id).dataTable().fnProcessingIndicator(false);
									}
								});
							}, //设置异常处理
							"oLanguage" : {
								"sLengthMenu" : "每页显示 _MENU_ 条记录",
								"sZeroRecords" : "抱歉， 没有找到",
								"sInfo" : "从 _START_ 到 _END_  共 _TOTAL_ 条数据",
								"sInfoEmpty" : " ",
								"sProcessing" : "正在查询....",
								"sInfoFiltered" : "",
								"oPaginate" : {
								"sFirst" : "首页",
								"sPrevious" : "前一页",
								"sNext" : "后一页",
								"sLast" : "尾页"
								}
							},
							"fnDrawCallback" : function(setting){
								App.init();
							}
							
						});
			
						

						jQuery('#'+param.id+' .group-checkable').change(function() {
							var set = jQuery(this).attr("data-set");
							var checked = jQuery(this).is(":checked");
							jQuery(set).each(function() {
								if (checked) {
									$(this).attr("checked", true);
									
								} else {
									$(this).attr("checked", false);
									
								}
							});
							jQuery.uniform.update(set);
						});
						
			            jQuery('#'+param.id+' tbody tr .checkboxes').change(function(){
			                 $(this).parents('tr').toggleClass("active");
			            });
						
						jQuery('#'+param.id+'_wrapper .dataTables_filter input').addClass("form-control input-small");
						// modify table search input
						jQuery('#'+param.id+'_wrapper .dataTables_length select').addClass("form-control input-xsmall");
						// modify table per page dropdown
						

					}
				};

			};
	jQuery(document).ready(function () {
    // initiate layout and plugins
  
    TableManaged({id:"sample_show"}).init();
    $('select').select2();
    $('.date-picker').datepicker({
        language:'zh-CN',
        rtl: App.isRTL(),
        autoclose: true,
        format: "yyyy-mm-dd"
    });
});

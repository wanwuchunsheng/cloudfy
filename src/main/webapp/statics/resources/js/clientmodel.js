var TableManaged = function () {

    return {
        //main function to initiate the module
        init: function () {
            
            if (!jQuery().dataTable) {
                return;
            }

            $('#sample_1').dataTable({
                "bFilter": false,//搜索框是否显示
                "bSort": false,
               // "bLengthChange":false,
                "aLengthMenu": [      //
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sInfo": "显示 _START_ 至 _END_ 共 _TOTAL_ 条"
                },
                "sDom": 'l<"table-toolbar margin-top-10">frtip',

                "fnDrawCallback": function( oSettings ) {
                  $('#sample_1_length').addClass('clearfix clear');
                  $('.table-toolbar').html('<a href="javascript:;" data-toggle="modal" data-target="#modifyCont" class="btn default green" >新增</a> <button data-toggle="modal" type="button" class="btn default red" >删除</button> <button type="button" data-toggle="modal" data-target="#modifyCont" class="btn default blue">修改</button>');
				  $("table th input[type='checkbox']").click(function(){
						var $tr = $(this).parents("table").find("tbody tr");
						var $span = $(this).parents("table").find("tr .checker span");
						if( $(this).prop("checked") ){
							$tr.addClass("active");
							$span.addClass("checked");
						}else{
							$tr.removeClass("active");
							$span.removeClass("checked");
						}
				});
                }
                // ,
                // "aoColumnDefs": [{
                //         'bVisible': false,
                //         'aTargets': [0]

                //     }
                // ]
            });
            
            $('#sample_2, #sample_3').dataTable({
                "bFilter": false,//搜索框是否显示
                "bSort": false,
                "aLengthMenu": [      //
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 5,
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sInfo": "显示 _START_ 至 _END_ 共 _TOTAL_ 条"
                },
                "sDom": 'l<"table-toolbar margin-top-10">frtip',
				"fnDrawCallback": function( oSettings ) {
                  $('#sample_2_length, #sample_3_length').addClass('clearfix clear');
				}
            });








            jQuery('#sample_1 .group-checkable').change(function () {
                var set = jQuery(this).attr("data-set");
                var checked = jQuery(this).is(":checked");
                jQuery(set).each(function () {
                    if (checked) {
                        $(this).attr("checked", true);
                    } else {
                        $(this).attr("checked", false);
                    }
                    $(this).parents('tr').toggleClass("active");
                });
                jQuery.uniform.update(set);

            });

            jQuery('#sample_1 tbody tr .checkboxes').change(function(){
                 $(this).parents('tr').toggleClass("active");
            });

            jQuery('#sample_1_wrapper .dataTables_filter input').addClass("form-control input-medium"); // modify table search input
            jQuery('#sample_1_wrapper .dataTables_length select').addClass("form-control input-xsmall"); // modify table per page dropdown
            jQuery('#sample_2_wrapper .dataTables_filter input').addClass("form-control input-medium");
            jQuery('#sample_2_wrapper .dataTables_length select').addClass("form-control input-xsmall");
			jQuery('#sample_3_wrapper .dataTables_filter input').addClass("form-control input-medium");
            jQuery('#sample_3_wrapper .dataTables_length select').addClass("form-control input-xsmall");







        }

    };

}();
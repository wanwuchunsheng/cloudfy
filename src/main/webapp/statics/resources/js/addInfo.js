/**
 ** 服务商车辆信息
**/
	function show1(id){
		var s1=document.getElementById('show1');
		
		s1.style.display='block';
		$('#sample_1').dataTable().fnDestroy();
		var caseInfoDT = $("#sample_1").dataTable({
        "bFilter" : false,
        "bSort" : false,
        "scrollX" : true,
        "scrollCollapse" : true,
        "bProcessing" : true, // 设置异步请求时，是否有等待框。
        "sAjaxSource" : '/eadccc/mockdata/table_caseinfo.data', // 请求url
        "sServerMethod" : "post",
        "bServerSide" : true, // 异步请求
        "aoColumns" : [{
            "mData" : "id",
        }, {
            "mData" : "smallRegion"
        }, {
            "mData" : "dealerCode"
        }, {
            "mData" : "dealerName"
        }, {
            "mData" : "flowType"
        },{
            "mData" : "firstCount"
        }, {
            "mData" : "secondCount"
        }, {
            "mData" : "thirdCount"
        },{
            "mData" : "fourthCount"
        }, {
            "mData" : "fifthCount"
        }, {
            "mData" : "sixthCount"
        }, {
            "mData" : "seventhCount"
		},{
            "mData" : "eighthCount"
		},{
            "mData" : "ninthCount"
		},{
            "mData" : "twelv",
            "sWidth" : "150px",
            "mRender" : function(data, type, row) {
                if (data) {
                    return '<div class="group-btn"><button class="btn green btn-sm" type="button">选择</button></div>';
                }
            }
            
        }],
        "aoColumnDefs" : [ {
            sDefaultContent : '',
            aTargets : [ '_all' ]

        } ],
        "aLengthMenu" : [ [ 5, 10, 20 ], [ 5, 10, 20 ] ],
        "iDisplayLength" : 5,
        "sPaginationType" : "bootstrap",
        "aaSorting" : [ [ 5, "asc" ] ],
        "oLanguage" : {
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "抱歉， 没有找到",
            "sInfo" : "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty" : "",
            "sProcessing" : "正在查询....",
            "sInfoFiltered" : "",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "前一页",
                "sNext" : "后一页",
                "sLast" : "尾页"

            }
        },
    });

    new $.fn.dataTable.FixedColumns( caseInfoDT, {
        leftColumns: 0,
        rightColumns: 1,
    });
		
	}
$(function() {
    // initlayout and core plugins
    App.init();

    
});

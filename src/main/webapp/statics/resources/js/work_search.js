/**
 ** 服务商车辆信息
**/
//通用表格多选效果
function tabelCheckbox(){
    // 表格内checkbox
    $(".DTFC_LeftBodyWrapper").find(":checkbox").click(function(){
        var $span = $(this).parent(),
            $tr = $(this).closest("tr");
        if( $(this).prop("checked")){
            $tr.addClass("active");
            $span.addClass("checked");
        }else{
            $tr.removeClass("active");
            $span.removeClass("checked");
        }
    });
    // 表格头全选checkbox
    $(".DTFC_LeftHeadWrapper").find(":checkbox").click(function(){
        var $tr = $(this).closest(".DTFC_LeftHeadWrapper").siblings(".DTFC_LeftBodyWrapper").find("tbody tr"),
            $span = $(this).closest(".DTFC_ScrollWrapper").find("tr .checker span"),
            $allChk = $(this).closest(".DTFC_LeftHeadWrapper").siblings(".DTFC_LeftBodyWrapper").find(":checkbox");
        if( $(this).prop("checked") ){
            $tr.addClass("active");
            $span.addClass("checked");
            $allChk.prop("checked", true);
        }else{
            $tr.removeClass("active");
            $span.removeClass("checked");
            $allChk.prop("checked", false);
        }
    });
};
$(function() {
    // initlayout and core plugins
    App.init();
    // init datepicker
    if ($().datepicker) {
        $('.date-picker').datepicker({
            language:"zh-CN",
            rtl: App.isRTL(),
            autoclose: true
        });
    };
    var caseInfoDT = $("#sample_show").dataTable({
        "bFilter" : false,
        "bSort" : false,
        "scrollX" : true,
        "scrollCollapse" : true,
        "bProcessing" : true, // 设置异步请求时，是否有等待框。
        "sAjaxSource" : '/roadsos/mockdata/table_caseinfo.data', // 请求url
        "sServerMethod" : "post",
        "bServerSide" : true, // 异步请求
        "aoColumns" : [ {
            "mData" : "id",
            "sWidth" : "25px",
            "mRender" : function(data, type, row) {
                if (data) {
                    return "<input type='checkbox' name='checkboxes' class='checkboxes' value='" + data + "'></input>";
                }
            }
        },  {
            "mData" : "smallRegion"
        }, {
            "mData" : "dealerCode"
        }, {
            "mData" : "dealerName"
        }, {
            "mData" : "firstCount"
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
            "mData" : "dealerCode"
        }, {
            "mData" : "dealerCode"
		},{
            "mData" : "eighthCount"
		},{
            "mData" : "fourteen",
        }],
        "aoColumnDefs" : [ {
            sDefaultContent : '',
            aTargets : [ '_all' ]

        } ],
        "aLengthMenu" : [ [ 5, 10, 20 ], [ 5, 10, 20 ] ],
        "iDisplayLength" : 5,
        "sPaginationType" : "bootstrap",
        "aaSorting" : [ [ 9, "asc" ] ],
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
        "fnDrawCallback" : function( settings ) {
            App.initUniform( $(this).find('tbody :checkbox') );
        }
    });

    new $.fn.dataTable.FixedColumns( caseInfoDT, {
        leftColumns: 1,
        rightColumns: 0,
        drawCallback: function(){
            //通用表格多选效果
            tabelCheckbox();
        }
    });
});
admin = {};
jQuery(document).ready(function() {
    App.init();
    kinitDataTable();
    
    $("#submit_button").click(function() {
        kinitDataTable();
    });
     
    
});

function kinitDataTable() {
    $('#dataTable').dataTable().fnDestroy();
    admin.dataTable=$('#dataTable').on( 'processing.dt', function (e, settings, processing) {
         
    }).dataTable({
        "bFilter" : false,
        "bSort" : false, 
        "bProcessing" : true,
        "sAjaxSource" : contextPath + '/workSheet/queryWorkSheetList.json',
        "fnServerParams" : function(aoData) {
            aoData.push({
                "name" : "sheetNo",
                "value" : $('#sheetNo').val()
            },{
                "name" : "priority",
                "value" : $('#priority').val()
            },{
                "name" : "source",
                "value" : $('#source').val()
            },{
                "name" : "accountId",
                "value" : $('#accountId').val()
            },{
                "name" : "accountName",
                "value" : $('#accountName').val()
            },{
                "name" : "accountPhone",
                "value" : $('#accountPhone').val()
            },{
                "name" : "startCreateTime",
                "value" : $('#startCreateTime').val()
            },{
                "name" : "endCreateTime",
                "value" : $('#endCreateTime').val()
            }
            );
        }, 
        "sServerMethod" : "post",
        "bServerSide" : true,
        "bLengthChange":false,
        "aLengthMenu" : [ [ 5, 10, 20 ], [ 5, 10, 20 ] ],
        "iDisplayLength" : 5,
        "sPaginationType" : "bootstrap",
        "aaSorting" : [ [ 9, "asc" ] ],
        "aoColumnDefs" : [ {
            "sDefaultContent" : '',
            "aTargets" : [ "_all" ]
        }],
        "fnServerData" : function(sSource, aoData, fnCallback) {
            $.ajax({
                "dataType" : 'json',
                "type" : "POST",
                "url" : sSource,
                "data" : aoData,
                "success" : fnCallback,
                "timeout" : 3000000,
                "error" : function handleAjaxError(xhr, textStatus, error) {
                    if (textStatus === "timeout") {
                        $.Alert("连接超时!请稍后再试!!!");
                    } else if (textStatus == "error") {
                        $.Alert("系统繁忙!!!,请稍后再试!!!");
                    }
                    prmt.dataTable.fnProcessingIndicator(false);
                }
            });
        }, 
        "aoColumns": [ 
        {
            "mData" : "sheetNo",
            "sWidth" : "100px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "sheetTypeName",
            "sWidth" : "200px",
            'sClass' : 'text-center'
        }, 
        {
            "mData" : "statusName",
            "sWidth" : "110px",
            'sClass' : 'text-center'
        }, 
        {
            "mData" : "accountName",
            "sWidth" : "150px",
            'sClass' : 'text-center'
        },{
            "mData" : "accountPhone",
            "sWidth" : "170px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "priorityName",
            "sWidth" : "110px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "sourceName",
            "sWidth" : "110px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "createUserId",
            "sWidth" : "100px",
            'sClass' : 'text-center'
        },
        {
            "mData" : "createTime",
            "sWidth" : "160px",
            "mRender" : function(data, type, full) {
                if(data){
                    return new Date(data).format('yyyy-MM-dd hh:mm');
                }
            }
        },{
            "mData" : "sheetNo",
            "sWidth" : "40px",
            "mRender" : function(data, type, full) {
                return "<a href=\"javascript:void(0);\" class=\"btn blue\" onclick=\"showWorkSheet('" +data+ "');\" >查看</a>";
            }
        }],
        "oLanguage" : {
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "抱歉， 没有找到",
            "sInfo" : "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty" : " ",
            "sProcessing" : "正在查询....",
            "sInfoFiltered" : "",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "前一页",
                "sNext" : "后一页",
                "sLast" : "尾页"
            }
        },"sDom": 'l<"table-toolbar margin-top-10">frtip',
        "fnInitComplete": function(oSettings, json) {
                $('.dataTables_length select').addClass("form-control input-sm");
                $('.dataTables_filter input').addClass("form-control input-medium");
            }
    });

} 


function showWorkSheet(sheetNo){
    parent.mainTab.showTab( "/workSheet/show.htm?sheetNo=" + sheetNo, '工单查看' );
}
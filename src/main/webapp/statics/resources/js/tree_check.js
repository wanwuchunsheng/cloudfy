/* 服务类型选择相关js */
$(function(){
    var $dealer = $('#popDealerModal'),
        $dealerPop = $('#dealerModal'),
        $area = $('#popAreaModal'),
        $areaPop = $('#areaModal'),
        $areaIput = $('#areaIput'),
        $dealerIput = $('#dealerIput'),
        $areaClear = $('#areaClear'),
        $dealerClear = $('#dealerClear');

    //是否有值
    if( $.trim( $areaIput.val() ) != '' ) $areaClear.removeClass( 'disabled' );


    //选择弹窗
    $area.on("click", function(){
            $areaPop.modal('show');

    });
    //清空
    $areaClear.on('click', function(){
        $(this).addClass('disabled');
        $areaIput.val('');
    });

    //选中赋值
    $('#dealerSubmit').on('click', function(){
        var $dealerChecked = $dealerPop.find('table tbody :checkbox:checked'), 
            allVal = '';
        $dealerChecked.each(function( index, item ){
            allVal += ( $dealerChecked.size() == index+1 ) ?  $(item).closest('tr').find('td').eq(1).text() : $(item).closest('tr').find('td').eq(1).text() + ',';
        });
        $dealerIput.val( allVal );
        $dealerPop.modal('hide');
        if( $.trim( $dealerIput.val() ) != '' ) $dealerClear.removeClass( 'disabled' );

    });
    //选择服务类型弹窗树节点事件
  function getParents( node ){
        var obj = node, parents = [];
        while( obj !== null ){
            parents.push( obj );
            obj = obj.getParentNode();
        };
        return parents.reverse();
    };
    function zTreeOnClick2(event, treeId, treeNode) {
        var parentNames = [];
        $.each( getParents( treeNode ), function( i, n ){
            if(i !== 0){
            parentNames.push( n.name );
            }
        });
        $areaIput.val( parentNames.join( '-' ) );
        $areaPop.modal('hide');
        $areaClear.removeClass( 'disabled' );
    };

    var setting2 = {
        edit: {
            enable: true
        },
        data: {
            simpleData: {
            enable: true
            }
        },
        callback: {
            onClick: zTreeOnClick2
        }
    };
    var zNodes =[
        { id:1, pId:0, name:"服务类型", open:true},
        { id:11, pId:1, name:"咨询",open:true},
        { id:111, pId:11, name:"雪佛兰",open:true},
        { id:1111, pId:111, name:"经销商礼遇"},
        { id:1112, pId:111, name:"经销商礼遇1"},
        { id:11111, pId:1111, name:"经销商礼遇1"},
        { id:11111, pId:11111, name:"经销商礼遇1"},
        { id:112, pId:11, name:"凯迪拉克",open:true,isParent:true},
        { id:12, pId:1, name:"投诉",open:true},
        { id:121, pId:12, name:"制度类"},
        { id:122, pId:12, name:"流程类"},
        { id:123, pId:12, name:"话术类"},
        { id:13, pId:1, name:"邮寄",open:true},
        { id:131, pId:13, name:"制度类"},
        { id:132, pId:13, name:"流程类"},
        { id:133, pId:13, name:"话术类"}
    ];
    $.fn.zTree.init($("#companyTree2"), setting2, zNodes);

    jQuery(document).ready(function () {
    App.init();
    //TableAdvanced.init();
    $('select').select2();

});
})
/**
 * use for index
 */

//菜单与tab联动效果，使用前提是各个菜单a链接的href保持一致
;(function( $, Eadccc ){

    Eadccc.mainTab = function(){
        me = this;
        me.menuItem = $( "#sidebarMenu li a[target='iframepage']" );
        me.tab = $( "#topTabUL" );
        me.frameWrap = $( "#iframeWrap" );
        var href, index, tit;
        //点击左侧菜单事件绑定
        this.menuItem.on( "click", function(){
            //如果不是最后一级子菜单，返回
            if( $(this).next().is("ul.sub-menu") ) return;
            me.showTab( $(this).attr("href"), $(this).text(), false );
            return false;
        })
        //点击tab事件绑定
        this.tab.on( "click", "a.text", function(){
            if( $(this).hasClass("currentClass") ) return;
            me.showTab( $(this).attr("href"), $(this).text(), false );
            return false;
        });
        //关闭tab事件绑定
        this.tab.on( "click", ".close", function(){
            var index = $(this).parent().index();
            $(this).parent().remove();
            me.frameWrap.find("iframe").eq( index ).remove();
            var $lastTab = me.tab.find( "li:last" ).children( "a.text" );
            me.showTab( $lastTab.attr("href"), $lastTab.text(), false );
            return false;
        });
    }

    //添加新的tab
    Eadccc.mainTab.prototype.addTab = function( href, tit ){
        if( me.tab.find("li").size() == 10 ){
            $.Alert("最多只能显示10个选项卡"); 
            return;
        };
        me.tab.find("li").removeClass( "currentClass" ).end().append("<li title='" + tit + "' class='currentClass'><a class='text' href='" + href + "'>" + tit + "</a><span class='close'>close</span></li>");
        me.frameWrap.find("iframe").hide().end().append("<iframe class='iframe-page' src='" + href + "' frameborder='0' width='100%'></iframe>");
    };
    //判断tab是否已经存在
    Eadccc.mainTab.prototype.isTabExit = function( href ){
        var i = false;
        me.tab.find("li").each( function( index, item ){
            var nHref = $(item).find("a").attr( "href" );
            if( nHref === href ){
               i = index;
            }
        });
        return i;
    };
    //判断相似URL(包含关系)的tab是否存在
    Eadccc.mainTab.prototype.isAlikeTabExit = function( href ){
        var i = false;
        me.tab.find("li").each( function( index, item ){
            var nHref = $(item).find("a").attr( "href" );
            if( nHref.indexOf( href ) >= 0 ){
                i = index;
            }
        });
        return i;
    };
    //如果tab已经存在，则显示；否则新增一个tab;
    Eadccc.mainTab.prototype.showTab = function( href, tit, reload ){
        if( href == undefined || tit == undefined ) return;
        var index = me.isTabExit( href );
        if( index !== false ){ //show tab
            var curFrame = me.frameWrap.find("iframe").eq( index );
            me.tab.find("li").eq( index ).addClass("currentClass").siblings().removeClass( "currentClass" );
            curFrame.show().siblings().hide();
            if( reload === true ) curFrame.attr( "src", curFrame.attr( 'src' ) );
        }else{  //add tab & show tab
            if( me.tab.find("li").size() == 10 ){ 
                $.Alert("最多只能显示10个选项卡"); 
                return;
            }
            me.tab.find("li").removeClass( "currentClass" ).end().append("<li title='" + tit + "' class='currentClass'><a class='text' href='" + href + "'>" + tit + "</a><span class='close'>close</span></li>");
            me.frameWrap.find("iframe").hide().end().append("<iframe class='iframe-page' src='" + href + "' frameborder='0' width='100%'></iframe>");
        }
        return false;
    };
    //在相似的url选项卡中打开新tab，tobo(相似标题)
    Eadccc.mainTab.prototype.showOnAlikeTab = function( str, href, tit ){
        var index = me.isAlikeTabExit( str );
        if( index !== false && index != 0 ){
            var curFrame = me.frameWrap.find("iframe").eq( index );
            me.tab.find("li").eq( index ).addClass("currentClass").siblings().removeClass( "currentClass" );
            me.tab.find("li").eq( index ).find("a").text( tit ).attr({ "href":href, "title":tit });
            curFrame.attr( "src", href ).show().siblings().hide();
        }else{
            me.addTab( href, tit );
        }
    };
    //销毁当前tab
    Eadccc.mainTab.prototype.destroy = function(){
        me.tab.find("li.currentClass>.close").trigger("click");
    };
    //刷新tab,url未传入或者不存在指定url的tab，则刷新当前tab
    Eadccc.mainTab.prototype.refresh = function( url ){
        var href = ( url == undefined ) ? window.location.href : url,
            index = me.isTabExit( href ),
            curFrame = ( index == false ) ?  me.frameWrap.find("iframe:visible") : me.frameWrap.find("iframe").eq( index );
        curFrame.attr( "src", curFrame.attr( 'src' ) );
    };

})(jQuery,window.Eadccc||(window.Eadccc={}));

mainTab = new Eadccc.mainTab();

App.init();
/*显示签入弹屏*/
var $modal = $("#modifyCall");
function showModal( title, url ){
    $modal.modal('show').find( '.modal-title' ).text( title );
    $modal.find( 'iframe' ).prop( 'src', url );
};
/*关闭签入弹屏*/
function closeModal(){
    $("#modifyCall").modal('hide');
}

//刷新或关闭浏览器时提示信息
$(function(){
    /*window.onbeforeunload = function(){
     　event.returnValue="确定要退出系统么?";
    }
*/
    $('#showOntab').on('click',function(){
        mainTab.showTab ( $(this).attr('href'), 'TAC工单创建' );
        $('#modifyContTAC').modal('hide');
        return false;
    });
     $('#showCAC').on('click',function(){
        mainTab.showTab ( $(this).attr('href'), 'CAC工单创建' );
        $('#modifyContCAC').modal('hide');
        return false;
    });
});
 /*消息提示弹框*/
$(function(){
    $("#testDemo").on('click',function(){
        $(".t_alert").show();
    });
    $(".close").on('click',function(){
        $(".t_alert").hide();
    });
});
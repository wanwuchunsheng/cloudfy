/**
 * use for inbound
 */

(function( $ ){
	
    //拼凑三级联动的数据
    function fixTree( data ){
        var seriesData = [], arr1 = [], arr2 = [];
        //取出各级别对应数据
        $.each( data, function( index, item ){
            item.children = [];
            if( item.pid >= 1 && item.pid < 100 ){
                seriesData.push( item );
            }
            if( item.pid >=101 && item.pid < 10000 ){
                arr1.push( item );
            };
            if( item.pid >= 10101 && item.pid < 1010100 ){
                arr2.push( item );
            };
        });
        //组装二级数据
        $.each( seriesData, function( index1, item1 ){
            $.each( arr1, function( index2, item2 ){
                if( item2.pid.toString() === item1.code ){
                    item1.children.push( item2 );
                }
            });
        });
        //组装第三级数据
        $.each( seriesData, function( index1, item1 ){
            $.each( item1.children, function( index2, item2 ){
                $.each( arr2, function( index3, item3 ){
                    if( item3.pid.toString() === item2.code ){
                        item2.children.push( item3 );
                    }
                });
            })
        })
        return seriesData;
    }

    jQuery(document).ready(function () {
        // initiate layout and plugins
		
        App.init();
         //TableAdvanced.init();
         //$('select').select2();
		 $('.date-picker').datepicker({
                language:'zh-CN',
                rtl: App.isRTL(),
                autoclose: true,
                format: "yyyy-mm-dd"
            });

        //渲染三级联动
        var treeData = [],
            $s1 = $("#nav-tabs"),
            $s2 = $("#tab_s1"),
            $s3 = $("#tab_s2"),
            $extend = $("#typeExtendForm"),
            $extendTab = $("#topTabUL"),
            $extendCon = $extend.find("textarea"),
            $extendTit = $extend.find("legend");


        $.getJSON( "mockdata/serviceRequestType.data", function( data ){
            treeData = fixTree( data );
            //初始化，默认显示第一个
            $.each( treeData, function( index, item ){
                $s1.append('<li><a href="#">' + item.name + '</a></li>');
            });
            $.each( treeData[0].children, function( index, item ){
                $s2.append('<option value="' + item.code + '">' + item.name + '</option>');
            });
            /*$.each( treeData[0].children[0].children, function( index, item ){
                $s3.append('<option value="' + item.code + '">' + item.name + '</option>');
            });*/
            $s1.find("li:eq(0)").addClass("active").siblings().removeClass("active");
            //点击tab联动
            $s1.on("click", "li>a", function(){
                var n = $(this).parent("li").index();
                $(this).parent("li").addClass("active").siblings().removeClass("active");
                $s2.show().find("option").slice(1).remove();
                $s3.show().find("option").slice(1).remove();
                if( treeData[n].children.length != 0 ){
                    $.each( treeData[n].children, function( index, item){
                        $s2.append("<option value='" + item.code + "'>" + item.name + "</option>");
                    })
                    if( treeData[n].children[0].children.length != 0 ){
                        $.each( treeData[n].children[0].children, function( index, item){
                            $s3.append("<option value='" + item.code + "'>" + item.name + "</option>");
                        })
                    }
					$( '#typeExtendForm' ).show().find( '.tab-con' ).eq( n ).hide().siblings('.tab-con').hide();
					$extend.hide();

                }else{
					$s2.hide();
					$s3.hide();
					$( '#typeExtendForm' ).show().find( '.tab-con' ).eq( n ).show().siblings('.tab-con').hide();
					$extendTit.text( $s1.find("li").eq(n).text() );
				}
				//$( '#typeExtendForm' ).show().find( '.tab-con' ).eq( n ).show().siblings('.tab-con').hide();
                return false;
            });
            //点击二级select联动
            $s2.on("change", function(){
                var n = $s1.find("li.active").index(),
                    m = $(this).find("option:selected").index();
                $s3.find("option").slice(1).remove();
                if( treeData[n].children[m-1].children.length != 0 ){
                    $.each( treeData[n].children[m-1].children, function( index, item){
                        $s3.append("<option value='" + item.code + "'>" + item.name + "</option>");
                    })
                }
				$( '.tab-con' ).eq( n ).show().siblings('.tab-con').hide().find( '#typeExtendForm' ).show();
                return false;
            });
            //显示问题分类及问题描述
            $s3.on( "change", function(){
                $extend.show();
                $extendTit.text( $(this).find("option:selected").text() );
                $extendTab.find("li").slice(1).remove();
                $.ajax({
                     url:"mockdata/serviceRequestType.data",
                     type:"post",
                     dataType:"json",
                     success: function( data ){
                        $.each( data, function( index, item ){
                            if( item.pid == 1 )
                            $extendTab.append('<li title="' + item.code + '">' + item.name + '</li>');
                        })
                        $extendTab.find("li").on("click", function(){
                            $(this).addClass("selected").siblings().removeClass("selected");
                        })
                     }
                })
            });
            //提交
            $("#saveForm").on( "click", function(){
            var data = $extendTab.find("li.selected").attr("title") + "," + $extendCon.val();
            });
        });
    });

})( jQuery );

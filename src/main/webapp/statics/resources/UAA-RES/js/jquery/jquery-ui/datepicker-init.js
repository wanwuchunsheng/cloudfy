jQuery(function($) {
	// 用来存放当前正在操作的日期文本框的引用。
	var datepicker_CurrentInput;
	$.datepicker.regional['zh-CN'] = {
		closeText : '关闭',
		prevText : '<上月',
		prevStatus : '显示上月',
		prevBigText : '<<',
		prevBigStatus : '显示上一年',
		nextText : '下月>',
		nextStatus : '显示下月',
		nextBigText : '>>',
		nextBigStatus : '显示下一年',
		currentText : '今天',
		currentStatus : '显示本月',
		monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
				'十月', '十一月', '十二月' ],
		monthNamesShort : [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12' ],
		monthStatus : '选择月份',
		yearStatus : '选择年份',
		weekHeader : '周',
		weekStatus : '年内周次',
		dayNames : [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
		dayNamesShort : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
		dayNamesMin : [ '日', '一', '二', '三', '四', '五', '六' ],
		dayStatus : '设置 DD 为一周起始',
		dateStatus : '选择 m月 d日, DD',
		dateFormat : 'yy-mm-dd',
		firstDay : 1,
		gotoCurrent : true,
		initStatus : '请选择日期',
		isRTL : false,
		showMonthAfterYear : true, // 月在年之后显示
		changeMonth : true, // 允许选择月份
		changeYear : true, // 允许选择年份
		showOn : 'button', // 在输入框旁边显示按钮触发，默认为：focus。还可以设置为both
		showOtherMonths : true,
		showButtonPanel : true,
		beforeShow : function(input, inst) {
			datepicker_CurrentInput = input;
		}
	};
	// 绑定“Done”按钮的click事件，触发的时候，清空文本框的值
	$(".ui-datepicker-close").live("click", function() {
		datepicker_CurrentInput.value = "";
	});
	$('.ui-datepicker-current').live('click', function() {
	    // extract the unique ID assigned to the text input the datepicker is for
	    // from the onclick attribute of the button
	    var associatedInputSelector = $(this).attr('onclick').replace(/^.*'(#[^']+)'.*/gi, '$1');
	    // set the date for that input to today's date
	    var $associatedInput = $(associatedInputSelector).datepicker("setDate", new Date());
	    // (optional) close the datepicker once done
	    $associatedInput.datepicker("hide");
	});

	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});

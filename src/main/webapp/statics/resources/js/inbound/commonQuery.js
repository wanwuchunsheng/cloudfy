admin={};  
/*格式化数字为千分位一组*/
	String.prototype.asCurrency = function() {   
		var f1 = this;   
		if(null==this || ''==this){
			return '';
		}
		var f2 = (Math.round((f1-0)));
		f2 = String(f2);   
		r = /(\d+)(\d{3})/;   
		fs = String(f2);   
		while (r.test(f2)) {   
			  f2 = f2.replace(r, '$1' + ',' + '$2');   
		}   
		return f2; // TODO 没考虑金额为负的情况   
	} 
	
   function jifenMallConsfer(){
	   if(null == $("#brand").val() || ''==$("#brand").val()){
		   $.Alert('请选择品牌');
		   return ;
	   }
	   var telCode;
	   if($("#brand").val()==1){
		   //tel="400440001";
		   telCode="400440001";
	   }
		if($("#brand").val()==2){
			//tel="4009208005";	
			telCode="400440002";
		}
		if($("#brand").val()==3){
			//tel="02159161735"; 
			telCode="400440003";
		}
		var tel=getTelephone(telCode);
		club_transfer(tel);
   }
   /*客户的基本信息,页面上所有用户的信息都可以从此得到*/
   var customerInfo={"ownerName":"","cellPhNum":"","custClass":"","custType":"","idType":"","idNum":"","gender":"","pinYin":"","cardNum":"","cardStatus":""
	   ,"cardType":"","keyContractName":"","keyContractCellPhNum":"","urgentName":""
	,"urgentCellPhNum":"","memberOperator":"","memberJtTime":"","memberStatus":""};
  
   /*设置页面的初始值*/
   function setQueryForm(){
	  if(gl.getCurOp().userId!=null && gl.getCurOp().userId!="null"){
		  $("#userId").val(gl.getCurOp().userId); 
	  }
	  if(gl.getCurOp().callNo!=null && gl.getCurOp().callNo!="null"){
		  $("#callNo").val(gl.getCurOp().callNo);
	  }
	  if(gl.getCurCallId()!=null && gl.getCurCallId()!="null"){
		  $("#callRecordId").val(gl.getCurCallId());
	  }
	  if(gl.getCurOp().id!=null && gl.getCurOp().id!="null"){
		  $("#createUserId").val(gl.getCurOp().id);
	  }
	  if(gl.getCurOp().name!=null && gl.getCurOp().name!="null"){
		  $("#createUserName").val(gl.getCurOp().name);
	  }
	  if(gl.getCurOp().userId!=null && gl.getCurOp().userId!="null"){
		  $("#userId").val(gl.getCurOp().userId);	
	  }
	  if(gl.getCurOp().agentId!=null && gl.getCurOp().agentId!="null"){
		  $("#agentId").val(gl.getCurOp().agentId);
	  }
	  if(gl.getCurCust().custName!=null && gl.getCurCust().custName!="null"){
		  $("#custName").val(gl.getCurCust().custName);
	  }
	  if(gl.getCurCust().custId!=null && gl.getCurCust().custId!="null"){
		  $("#custId").val(gl.getCurCust().custId);
	  }	  
	  if(gl.getCurCust().subInstId!=null && gl.getCurCust().subInstId!="null"){
		  $("#subinstId").val(gl.getCurCust().subInstId);
	  }else{
		  $("#subinstId").val(-1);
	  }
	  if(gl.getCurCust().memberId!=null && gl.getCurCust().memberId!="null"){
		  $("#memberId").val(gl.getCurCust().memberId);
	  }else{
		  $("#memberId").val(-1);
	  }	  
	  if(gl.getCurCust().brand==getBrandNameByCode(3)){
		   $("#brand").val(3);
	   }else if(gl.getCurCust().brand==getBrandNameByCode(1)){
		   $("#brand").val(1);
	   }else if(gl.getCurCust().brand==getBrandNameByCode(2)){
		   $("#brand").val(2);
	   }else{
		   $("#brand").val(null);
	   }
	
	  $("input[name='checkResult'][value='"+$("#brand").val()+"']").attr('checked','true');
	  if(gl.getCurCust().custClass!=null && gl.getCurCust().custClass!="null"){
		  $("#custClass").val(gl.getCurCust().custClass);
	  }
	  if(gl.getCurCust().custType!=null && gl.getCurCust().custType!="null"){
		  $("#custType").val(gl.getCurCust().custType);
	  }	  
	  if(window.console){
		  console.log($("#requestInfoForm").serialize());
	  }
   }

   /*查询车辆信息*/
   function queryAuto(){
       $.ajax({
           url:contextPath+"/inbound/queryAutoInfo.json",
           type:"post",
           dataType:"json",
           data:$("#requestInfoForm").serialize(),
           success:function(data){
               redrawAuto(data);
           }
       });
   } 
   /*查询联系人信息*/
   function queryContact(){
       $.ajax({
           url:contextPath+"/inbound/queryContact.json",
           type:"post",
           dataType:"json",
           data:$("#requestInfoForm").serialize(),
           success:function(data){
               redrawContact(data);
           }
       });
   }
	/*会员积分消费明细*/
	function queryPoint(){
	    $.ajax({
           url:contextPath+"/inbound/queryPoint.json",
           type:"post",
           dataType:"json",
           data:$("#requestInfoForm").serialize(),
           success:function(data){
              redrawPointInfo(data);
           }
       });
	}
	   /*查询入会经销商信息*/
    function queryDealerInfo(){
         if($("#memberId").val()==-1){
             return;
         }
         $.ajax({
            url:contextPath+"/inbound/queryDealerInfo.json",
            type:"post",
            dataType:"json",
            data:$("#requestInfoForm").serialize(),
            success:function(data){
                redrawDealer(data);
            }
        });
    }
/*查询车辆信息显示*/
function redrawAuto(data){
	 //console.log('redrawAuto:'+JSON.stringify(data));
		emptyTable2('auto_table');
        $.each(data,function(i,item){
        	var tr=$("#autoTr").clone(true).show();
        	$("#auto_table tbody").find("tr").last().after(tr);
        	tr.attr('flg','active');
            var cell=0;
            tr.find("td").eq(cell).html(item.brandName);
            cell=cell+1;
            tr.find("td").eq(cell).html(item.seriesName);
            cell=cell+1;
            tr.find("td").eq(cell).html(item.modelName);
            cell=cell+1;
            tr.find("td").eq(cell).html(item.color);
            cell=cell+1;
            tr.find("td").eq(cell).html(item.carLinsence);
            cell=cell+1;
            tr.find("td").eq(cell).html(item.vin);
            cell=cell+1;
            tr.find("td").eq(cell).html(item.autoNum);
            cell=cell+1;
            tr.find("td").eq(cell).html(new Date(item.saleDt).format('yyyy-MM-dd'));
            //如果是凯迪拉克，多显示车辆联系人、车辆联系人手机、车辆联系人备用电话
            if($("#requestInfoForm #brand").val()==3){
            	cell=cell+1;
                tr.find("td").eq(cell).html(item.contactName);
                cell=cell+1;
                tr.find("td").eq(cell).html(item.contactPhone);
                cell=cell+1;
                tr.find("td").eq(cell).html(item.contactBkPhone);
            }
        });
    }


/*查询联系人信息显示*/
function redrawContact(data){
	//console.log('redrawContact:'+JSON.stringify(data));
    $.each(data,function(i,item){
        if(item.type=='400191002'){
            $("#urgentContact").html(item.name+getGenderLabel(item.sexMf));
            $("#urgentContact_tel").html(item.cellPhNum);
            $("#urgentContact_rel").html(getDictName('40008',item.accountRelType));
            $("#urgentContact_addr").html(item.addr);
            customerInfo.urgentName=item.name;
            customerInfo.urgentCellPhNum=item.cellPhNum;
        }
        if(item.type=='400191001'){
            $("#keyContact").html(item.name+getGenderLabel(item.sexMf));
            $("#keyContact_tel").html(item.cellPhNum);
            $("#keyContact_rel").html(getDictName('40008',item.accountRelType));
            $("#keyContact_weixin").html(item.weixinNum);
            $("#keyContact_addr").html(item.addr);
            $("#keyContact_mail").html(item.emailAddr);
            $("#keyContact_issms").html(item.smsFlg=='Y'?'是':'否');
            $("#keyContact_ismail").html(item.emailFlg=='Y'?'是':'否');
            $("#keyContact_isweixin").html(item.weixinFlg=='Y'?'是':'否');
            
            customerInfo.keyContractName=item.name;
            customerInfo.keyContractCellPhNum=item.cellPhNum;
        }
    });
    
}

function setSearchBox(){
	  // $("#search_cust_name").html(customerInfo.ownerName + getGenderLabel());
	  // $("#search_cust_type").html(customerInfo.custType);
	  // $("#search_brand").html(gl.getCurCust().brand);
}

/*显示积分明细*/
function redrawPointInfo(data){
    emptyTable2('point_table');
    if(data.listOfCem3LoyMember[0] && data.listOfCem3LoyMember[0].cem3LoyTransactionAccrualList){
	    $.each(data.listOfCem3LoyMember[0].cem3LoyTransactionAccrualList,function(i,item){
	    	var tr=$("#eg_point").clone(true).show();
	    	tr.attr('flg','active');
	    	//$("#eg_point").before(tr);
	    	$("#point_table tbody").find("tr").last().after(tr);
	        var cell=0;
	        tr.find("td").eq(cell).html(item.cem3ActiveName);
	        cell=cell+1;
	        tr.find("td").eq(cell).html(item.transactionDate);
	        cell=cell+1;
	        tr.find("td").eq(cell).html(item.accrualedValue);
	        cell=cell+1;
	        tr.find("td").eq(cell).html('');
	        cell=cell+1;
	        tr.find("td").eq(cell).html(item.productName);
	        cell=cell+1;
	        tr.find("td").eq(cell).html(item.cem3DealerName);
	        cell=cell+1;
	        tr.find("td").eq(cell).html(item.comments);
	    });
    }
    if(data.listOfCem3LoyMember[0] && data.listOfCem3LoyMember[0].cem3LoyTransactionRedemptionList){
	    $.each(data.listOfCem3LoyMember[0].cem3LoyTransactionRedemptionList,function(i,item){
	    	var tr=$("#eg_point").clone(true).show();
	    	//$("#eg_point").before(tr);
	    	$("#point_table tbody").find("tr").last().after(tr);
	        var cell=0;
	        tr.find("td").eq(cell).html(item.cem3ActiveName);
	        cell=cell+1;
	        tr.find("td").eq(cell).html(item.transactionDate);
	        cell=cell+1;
	        tr.find("td").eq(cell).html('');
	        cell=cell+1;
	        tr.find("td").eq(cell).html(item.value);
	        cell=cell+1;
	        tr.find("td").eq(cell).html(item.cem3TypeCalc);
	        cell=cell+1;
	        tr.find("td").eq(cell).html(item.cem3DealerName);
	        cell=cell+1;
	        tr.find("td").eq(cell).html(item.comments);
	    });
    }
}
function redrawDealer(data){
	if(!data){
		return;
	}
    $("#info_dealer_name").html(data.dealerAbbr);
    $("#info_dealer_operator").html(customerInfo.memberOperator);
//    $("#info_dealer_mobile").html(data.businessPhone);
    $("#info_dealer_memberdate").html(customerInfo.memberJtTime);
//    $("#info_dealer_addr").html(data.address);
    $("#info_dealer_status").html(data.dealerStatus);
//    $("#info_dealer_hottel").html(data.hotLine);
}
/*服务记录信息*/
function queryServiceInfo(){
     if(admin.service_table){
         admin.service_table.fnDestroy();
     }
     if(!$("#requestInfoForm #brand").val()){
         $.Alert('请选择品牌');
         $(".modal-dialog-marTop").css("margin-top","450px");
         return;
     }
     admin.service_table=$('#service_table').dataTable({
             "bFilter" : false,
             "bSort" : false, // 排序功能
             "bProcessing" : true, // 设置异步请求时，是否有等待框。
             "sAjaxSource" : contextPath+'/inbound/queryServiceInfo.json',
             "fnServerParams" : function(aoData) {
                     aoData.push({
                         "name" : "memberId",
                         "value" : $("#requestInfoForm #memberId").val()
                     }),
                     aoData.push({
                         "name" : "custId",
                         "value" : $("#requestInfoForm #custId").val()
                     }),
                     aoData.push({
                         "name" : "subinstId",
                         "value" : $("#requestInfoForm #subinstId").val()
                     }),
                     aoData.push({
                         "name" : "brand",
                         "value" : $("#requestInfoForm #brand").val()
                     });
             },
             "sServerMethod" : "post",
             "bServerSide" : true, // 异步请求
              "bPaginate": true,
              "bInfo": true,
             "aLengthMenu" : [[5, 10, 20], [5, 10, 20]],
             "iDisplayLength" : 5,
             "sPaginationType" : "bootstrap",
             "aaSorting" : [[9, "asc"]],
             "aoColumnDefs" : [{
                 "sDefaultContent" : '',
                 "aTargets" : ["_all"]
             }],
             "fnServerData" : function(sSource, aoData, fnCallback) {
                 $.ajax({
                     "dataType" : 'json',
                     "type" : "POST",
                     "url" : sSource,
                     "data" : aoData,
                     "success" : fnCallback,
                     "timeout" : 3000000, // 连接超时时间
                     "error" : function handleAjaxError(xhr, textStatus, error) {
                         $.Alert(error);
                         if (textStatus == "timeout") {
                             //$.dopErr("连接超时!请稍后再试!!!");
                             $.Alert("连接超时!请稍后再试!!!");
                         } else if (textStatus == "error") {
                             //$.dopErr("系统繁忙!!!,请稍后再试!!!", null);
                             $.Alert("系统繁忙!!!,请稍后再试!!!");
                         }
                         prmt.dataTable.fnProcessingIndicator(false);
                         // 这里是把"正在查询几个子去掉，(换成自己的id)
                     }
                 });
             }, //设置异常处理
             "aoColumns" : [{
                 "mData" : "serviceType",
                 "mRender" : function(data, type, row) {
                 	return "<a href='javascript:void(0)' onclick=callRecordDetail('"+row.agentId+"','"+row.extension+"','"+row.content+"')  data-toggle='modal' data-target='#memberCallDetail'>"+getServiceTypeByCode(data)+"</a>"
                 },
                 "sWidth" : "5px"
             }, {
                 "mData" : "callNo",
                 "sWidth" : "50px"
             }, {
                 "mData" : "beginTime",
                  "mRender" : function(data, type, row) {
                    return new Date(data).format('yyyy-MM-dd hh:mm:ss'); 
                  },
                 "sWidth" : "100px"
             }, {
                 "mData" : "operatorNo",
                 "mRender" : function(data, type, row) {
                     return row.operatorNo +' 【' + row.operatorName + '】';
                 },
                 "sWidth" : "130px"
             }, {
                 "mData" : "type",
                 "mRender" : function(data, type, row) {
                     return getCallTypeByCode(data);
                 },
                 "sWidth" : "130px"
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
             }
         });
}
/*查询任务的数量*/
function initTaskAmount(){
	$.ajax({
        "dataType" : 'json',
        "type" : "POST",
        "url" : contextPath+'/inbound/queryTaskInfo.json',
        "data" : $("#requestInfoForm").serialize(),
        "success" : function(data){
        	$("#label_cnt_task").html(data.iTotalRecords);
        },
        "timeout" : 3000000 // 连接超时时间
    });
}

function forward2Outbound(data,row){
	var json={};
	json.priority=2;
	json.custClass=getDictName('40012',customerInfo.custClass);
	json.serviceType=row.serviceType;
	json.taskType=row.taskType;
	json.taskInfoId=row.taskInfoId;
	json.memId=($("#memberId").val()==-1)?null:$("#memberId").val();
	json.taskId=row.id;
	json.detailId=row.detailId;
	json.subinstId=($("#subinstId").val()==-1)?null:$("#subinstId").val();
	json.custId=$("#custId").val();
	return outboundworkbatch.init(data,'',json);
}
/*查询会员的任务信息*/
function queryTaskInfo(){
    if(admin.table_task){
        admin.table_task.fnDestroy();
    }
    if(!$("#requestInfoForm #brand").val()){
        $.Alert('请选择用户品牌');
        $(".modal-dialog-marTop").css("margin-top","450px");
        return;
    }
    
    admin.table_task=$('#table_task').dataTable({
            "bFilter" : false,
            "bSort" : false, // 排序功能
            "bProcessing" : true, // 设置异步请求时，是否有等待框。
            "bRetrieve": false,
            "sAjaxSource" : contextPath+'/inbound/queryTaskInfo.json',
            "fnServerParams" : function(aoData) {
                    aoData.push({
                        "name" : "memberId",
                        "value" : $("#requestInfoForm #memberId").val()
                    }),
                    aoData.push({
                        "name" : "custId",
                        "value" : $("#requestInfoForm #custId").val()
                    }),
                    aoData.push({
                        "name" : "subinstId",
                        "value" : $("#requestInfoForm #subinstId").val()
                    }),
                    aoData.push({
                        "name" : "brand",
                        "value" : $("#requestInfoForm #brand").val()
                    });
            },
            "sServerMethod" : "post",
            "bServerSide" : true, // 异步请求
             "bPaginate": true,
             "bInfo": true,
            "aLengthMenu" : [[5, 10, 20], [5, 10, 20]],
            "iDisplayLength" : 5,
            "sPaginationType" : "bootstrap",
            "aaSorting" : [[9, "asc"]],
            "aoColumnDefs" : [{
                "sDefaultContent" : '',
                "aTargets" : ["_all"]
            }],
            "fnServerData" : function(sSource, aoData, fnCallback) {
                $.ajax({
                    "dataType" : 'json',
                    "type" : "POST",
                    "url" : sSource,
                    "data" : aoData,
                    "success" : function(data){
                    	$("#label_cnt_task").html(data.iTotalRecords);
                    	fnCallback(data);
                    },
                    "timeout" : 3000000, // 连接超时时间
                    "error" : function handleAjaxError(xhr, textStatus, error) {
                        $.Alert(error);
                        if (textStatus == "timeout") {
                            //$.dopErr("连接超时!请稍后再试!!!");
                            $.Alert("连接超时!请稍后再试!!!");
                        } else if (textStatus == "error") {
                            //$.dopErr("系统繁忙!!!,请稍后再试!!!", null);
                            $.Alert("系统繁忙!!!,请稍后再试!!!");
                        }
                        prmt.dataTable.fnProcessingIndicator(false);
                        // 这里是把"正在查询几个子去掉，(换成自己的id)
                    }
                });
            }, //设置异常处理
            "aoColumns" : [{
                "mData" : "serviceType",
                "mRender" : function(data, type, row) {
                    return getServiceTypeByCode(data);
                },
                "sWidth" : "5px"
            }, {
                "mData" : "surveyId",
                "sWidth" : "50px",
                 "mRender" : function(data, type, row) {
                   return customerInfo.ownerName; 
                 }
            }, {
                "mData" : "name",
                "sWidth" : "100px",
                "mRender" : function(data, type, row) {
                	return forward2Outbound(data,row);
                  }
            }, {
                "mData" : "beginTime",
                "mRender" : function(data, type, row) {
                    return (!data)?'':new Date(data).format("yyyy-MM-dd hh:mm:ss");
                },
                "sWidth" : "130px"
            }, {
                "mData" : "userName",
                "mRender" : function(data, type, row) {
                	var uc= row.userAgentId ?row.userAgentId:'';
                	var un= data?"【"+ data+"】":'';
                    return uc+un;
                },
                "sWidth" : "130px"
            }, {
                "mData" : "officePhoneExt",
                 "mRender" : function(data, type, row) {
                    return (!data)?'':data;
                },
                "sWidth" : "130px"
            }, {
                "mData" : "status",
                "mRender" : function(data, type, row) {
                    return taskStatus(data);
                },
                "sWidth" : "130px"
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
            }
        });
}
/*设置投诉时切换投诉对象时下拉选择品牌和经销商*/
function procBrandShow(){
	   var val=$("#complainTarget").val();
	   //品牌
	   if("400111002"==val){
		   $("#complianBrand").show();
		   $("#selComplainBrand").val($("#requestInfoForm #brand").val());
		   $("#selComplainBrand").select2();
		   $("#complainDealer").hide();
	   }else if("400111003"==val){   //经销商
		   $("#complianBrand").show();
		   $("#selComplainBrand").val($("#requestInfoForm #brand").val());
		   $("#selComplainBrand").select2();
		   $("#complainDealer").show();
	   }else if("400111004"==val){   //积分商城
		   $("#complianBrand").show();
		   $("#selComplainBrand").val($("#requestInfoForm #brand").val());
		   $("#selComplainBrand").select2();
		
	   }else if("400111005"==val){   //cac
		   $("#complianBrand").show();
		   $("#selComplainBrand").val($("#requestInfoForm #brand").val());
		   $("#selComplainBrand").select2();
	   }else{
		   $("#complianBrand").hide();
		   $("#complainDealer").hide();
	   }
}
/*初始化短信模板的页面数据*/
function initSendSmsType(conId){
    $.ajax({
         url:contextPath+"/inbound/initSendSmsType.json",
         type:"post",
         dataType:"json",
         success:function(data){
        	 initSendSmsTypeData(conId,data);
         }
     });
}
/*初始化经销商品牌数据*/
function initSendSmsTypeData(conId,data){
	   $("#"+conId).empty();
	   $("#"+conId).append("<option value=''>--请选择--</option>");
	   $(data).each(function(i,data){
		   $("#"+conId).append("<option value='" + data.sendtype + "'>"+data.sendtypename+"</option>");
	   });
	   $("#"+conId).select2();
}
/*初始化投诉的页面数据*/
function initServiceRequestType(conId,parentCode){
	if(null==parentCode || ''==parentCode){
		$("#"+conId).empty();
		$("#"+conId).append("<option value=''>--请选择--</option>");
		return;
	}
    $.ajax({
         url:contextPath+"/inbound/serviceRequestType.json",
         type:"post",
         dataType:"json",
         data:"pid="+parentCode,
         success:function(data){
            initServiceRequestTypeData(conId,data);
         }
     });
}
/*初始化经销商品牌数据*/
function initCarBrandsType(conId){
    $.ajax({
         url:contextPath+"/inbound/carBrandsType.json",
         type:"post",
         dataType:"json",
         success:function(data){
            initinitCarBrandsTypeData(conId,data);
         }
     });
}
/*初始化经销商品牌数据*/
function initinitCarBrandsTypeData(conId,data){
	   $("#"+conId).empty();
	   $("#"+conId).append("<option value=''>--请选择--</option>");
	   $(data).each(function(i,data){
		   $("#"+conId).append("<option value='" + data.brandId + "'>"+data.chineseName+"</option>");
	   });
	   $("#"+conId).select2();
}
/*初始化数据*/
function initServiceRequestTypeData(conId,data){
	   $("#"+conId).empty();
	   $("#"+conId).append("<option value=''>--请选择--</option>");
	   $(data).each(function(i,data){
		   $("#"+conId).append("<option value='" + data.code + "'>"+data.name+"</option>");
	   });
	   $("#"+conId).select2();
}
/*投诉信息保存*/
function doComplain(){
	/*
    var sid=$("#requestInfoForm #subinstId").val();
    if(sid==null || sid=='' || sid=='-1'){
        $.Alert('非车主无法进行投诉操作');
        return;
    }
    */
	var brand=$("#requestInfoForm #brand").val();
	if(brand==null || brand==''){
        $.Alert('请选择品牌');
        return;
    }
	var complainTargetBrand;
	/*投诉对象为 从complainTarget取值，否则#requestInfoForm #brand 取值*/
	if("400111002"==$("#complainTarget").val() 
			|| "400111003"==$("#complainTarget").val()
			|| "400111004"==$("#complainTarget").val()
			|| "400111005"==$("#complainTarget").val()){
		complainTargetBrand = $("#selComplainBrand").val();
		if(brand==null || brand==''){
	        $.Alert('请选择投诉的品牌');
	        return;
	    }
	}else{
		$("#selComplainBrand").val(brand);
	} 
   
    $("#btn_complain").attr("disabled","true");
      $.ajax({
        url:contextPath+"/inbound/complain.json",
        type:"post",
        dataType:"json",
        data:$("#complain_form").serialize()+"&"+$("#requestInfoForm").serialize(),
        success:function(data){
            if(data.success==1){
                $.Alert('投诉成功');
                reEnableButton();
                //document.getElementById("complain_form").reset();
            }else{
                $.Alert('保存数据失败');
                $("#btn_complain").removeAttr("disabled");
            }
        },
        error:function(data){
            $("#btn_complain").removeAttr("disabled");
        }
    });
}
function emptyTable(tableId){
     $("#"+tableId+" tbody").find("tr:visible").each(function(i,row){
        $(this).remove();
    });
}
function emptyTable2(tableId){
    $("#"+tableId+" tbody").find("tr[flg='active']").each(function(i,row){
       $(this).remove();
   });
}

function getGenderLabel(gender){
	/*
	if(!gender){
		gender=customerInfo.gender;
	}
	*/
	if('10061001'==gender){
		return '&nbsp;<i class="fa fa-male colorblue"></i>';
	}else if('10061002'==gender){
		return '&nbsp; <i class="fa fa-female colorred"></i>';
	}else {
		return "";
	}
}
function reEnableButton(){
	setTimeout(enableButton,10000);
}
/*咨询，投诉，修改客户信息 按钮重新enable*/
function enableButton(){
	$("#btn_complain").removeAttr("disabled");
	$("#consultAddButton").removeAttr("disabled");
	$("#btn_modify_vip").removeAttr("disabled");
	$("#btn_recommend_save").removeAttr("disabled");
	$("#btn_drivetest_save").removeAttr("disabled");
	$("#btn_suggestion_save").removeAttr("disabled");
}
/*显示话务记录的明细信息*/
function callRecordDetail(agentId,extension,content){
   $("#recordAgentId").html(agentId);
   $("#recordExtension").html(extension);
   $("#recordContent").html(content);
}

/*(客户咨询)初始化咨询类别*/
function initConsultingType() {
	var sel = $("#consultingType1");
	var pcode;
	$.ajax({
		url : contextPath+"/inbound/consultingTypeInit.json",
		type : "post",
		dataType : "json",
		data : "code=200000",
		success : function(data) {
			if(data && data[0]){
				pcode = data[0].parentCode;
			}
		}
	});
	$.ajax({
		url : contextPath+"/inbound/consultingTypeInit.json",
		type : "post",
		dataType : "json",
		data : "parentCode=100000",
		success : function(data) {
			initConsultingTypeData(sel, data, pcode);
			initSubConsultingType(sel);
		}
	});
}

/*(客户咨询)初始化咨询类别子级*/
function initSubConsultingType(obj) {
	var val = $(obj).val();
	if(val==''||val==null){
	  val='-1';
	}
	var sel = $("#consultingType2");
	$.ajax({
		url : contextPath+"/inbound/consultingTypeInit.json",
		type : "post",
		dataType : "json",
		data : "parentCode=" + val,
		success : function(data) {
			var code = '0';
			initConsultingTypeData(sel, data, code);
		}
	});
}

/*(客户咨询)初始化数据*/
function initConsultingTypeData(obj, data, comType) {
	$(obj).empty();
	$(obj).append("<option value=''>--请选择--</option>");
	$(data).each(function(i, data) {
		if (comType == data.code) {
			$(obj).append("<option value='" + data.code + "'selected>" + data.name + "</option>");
		} else {
			$(obj).append("<option value='" + data.code + "'>" + data.name + "</option>");
		}
	});
	$(obj).select2();
}

/*保存客户咨询信息*/
function saveConsulting(){	
	if($('#brand').val()==""){
		$.Alert('品牌不能为空!');
        return false;
	}else{
		$("#consultAddButton").attr("disabled","true");
		var addData=$("#requestInfoForm").serialize()+"&"+$("#custConsultingForm").serialize();
	 	$.ajax({ 
	        url : contextPath+'/inbound/saveCustConsulting.json', 
	        type : 'POST',
	        dataType:'json', 
	        async:true,
	        data : addData, 
	        success : function(data){ 
	        	$.Alert(data.MESSAGE);
	        	reEnableButton();
	        } ,
	        error:function(data){
	           $.Alert(JSON.stringify(data));
	        	$("#consultAddButton").removeAttr("disabled");
	        }
	     });
	}
}



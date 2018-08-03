
$(function(){
		//冻结申请
        $("#btn_freezeApply").on("click",function(){
        club_freezeApply(400250003,"Inactive");
        });
        //解冻申请
        $("#btn_thawApply").on("click",function(){
        club_thawApply(400250004,"Active");
        });
        //换卡
        $("#btn_changeCardApply").on("click",function(){
         club_changeCardApply();
        });
        //补卡
        $("#btn_repairCardApply").on("click",function(){
        	club_freezeCardApply(1);
        });
        //冻结并补卡
        $("#btn_freezeCardApply").on("click",function(){
        	club_freezeCardApply(2);
        }); 
        //会员信息修改
        $("#tab_clubInfoModify").on("click",function(){
        	club_infoModify();
        }); 
        //会员礼遇预约
        $("#tab_clubCourtesy").on("click",function(){
        	club_courtesy();
        }); 
        //会员礼遇预约保存预约信息
        $("#clubCourtesySave").on("click",function(){
        	club_courtesy_save();
        }); 
        //省/市
        $("#addressListFirst").change(function(){
        	initCity('addressListSecond',$("#addressListFirst").val(),true);
        	$("#addressListThird option").remove();
        	$("#addressListThird").append("<option value=''>--请选择--</option>");
        	$("#addressListThird").select2();
        });
        //区
        $("#addressListSecond").change(function(){
        	initCourty('addressListThird',$("#addressListSecond").val(),true);
        }); 
        //礼遇预约 经销商:开始转接 专员
        $("#director_transfer").on("click",function(){
        	club_transfer($("#courtesyDirectorPhone").html());
        });
        //礼遇预约 经销商:完成转接 专员
        $("#director_completeTransfer").on("click",function(){
        	club_completeTransfer($("#courtesyDirectorPhone").html());
        });
        //礼遇预约 经销商:恢复通话 专员
        $("#director_retrieveCall").on("click",function(){
        	club_retrieveCall($("#courtesyDirectorPhone").html());
        }); 
        //礼遇预约 经销商:开始转接 站长
        $("#stationMaster_transfer").on("click",function(){
        	club_transfer($("#courtesyStationMasterPhone").html());
        });
        //礼遇预约 经销商:完成转接 站长
        $("#stationMaster_completeTransfer").on("click",function(){
        	club_completeTransfer($("#courtesyStationMasterPhone").html());
        });
        //经销商:恢复通话 站长
        $("#stationMaster_retrieveCall").on("click",function(){
        	club_retrieveCall($("#courtesyStationMasterPhone").html());
        }); 
        //礼遇预约 第三方:开始转接
        $("#supplier_transfer").on("click",function(){
        	club_transfer($("#courtesySupplierBusinessPhone1").html());
        });
        //礼遇预约 第三方:完成转接
        $("#supplier_completeTransfer").on("click",function(){
        	club_completeTransfer($("#courtesySupplierBusinessPhone1").html());
        });
        //礼遇预约 第三方:恢复通话
        $("#supplier_retrieveCall").on("click",function(){
        	club_retrieveCall($("#courtesySupplierBusinessPhone1").html());
        }); 
});

//补换卡保存按扭
function changeCardApplyCheck(obj){
		if(obj.value=='0'){
			 $('.saveCardApplyBtn').hide();
		}else if(obj.value=='1'){
			 $('.saveCardApplyBtn').show();
		}else{
			 $('.saveCardApplyBtn').hide();
		}
}
//礼遇预约 开始转接
function  club_transfer(tel){
	//isp.makeCall(tel);
	if(!tel){
		return;
	}
	tel=tel.replace(/-/g, '');
	isp.transfer(tel);
}
//礼遇预约 完成转接
function  club_completeTransfer(tel){
	isp.completeTransfer(tel);
}
//礼遇预约 恢复通话
function  club_retrieveCall(tel){
	//isp.makeCall(tel);
}
//话务小结
function  trafficSummary(){
	 $.Alert("话务小结");
}
//补卡/换卡
function  changeCardApplyCheck(obj){
	if(obj.value=="0"){
		 $('.reasontxt_1').show();
		 $('.reasontxt_2').hide();
	}else if(obj.value=="1"){
		 $('.reasontxt_1').hide();
		 $('.reasontxt_2').show();
	}else{}
}

var original_cell_ph;
//会员信息修改 加载车主信息
function clubCustomer(data){
	  original_cell_ph=data.cellPhNum;
	  $("#modify_cell_ph_num").val(data.cellPhNum);
	  $("#modify_pinyin").val(data.pinyin);
	  $("#modify_zipCd").val(data.zipCd);
	  $("#modify_addr").val(data.addr);
	  $("#modify_memberId").val(data.memberId);
	  $("#modify_custId").val(data.custId);
	  if(data.sexMf=='10061001'){ 
		$("input[name='customer.sexMf'][value='10061001']").attr('checked','true');
		jQuery.uniform.update($("input:radio"));
	  }else if(data.sexMf=='10061002'){
		$("input[name='customer.sexMf'][value='10061002']").attr('checked','true');
		jQuery.uniform.update($("input:radio"));
	  }
	  //不发短信
	  if(data.smsFlg=='Y'){
	    $("#modify_smsFlg").attr("checked",true);
	  }else{
		$("#modify_smsFlg").removeAttr("checked");
	  }
	  jQuery.uniform.update($("#modify_smsFlg"));
	  //不发邮件
	  if(data.emailFlg=='Y'){
	     $("#modify_emailFlg").attr("checked",true);
	  }else{
		  $("#modify_emailFlg").removeAttr("checked");
	  }
	  jQuery.uniform.update($("#modify_emailFlg"));
	  
}
//会员信息修改 加载关键联系人信息
function clubKeyContact(data){
	if(!data){
		return;
	}
	$("#modify_keyContactId").val(data.contact_id);
	 $("#modify_keyName").val(data.name);
	 $("#modify_keyCell_ph_num").val(data.cell_ph_num);
	//关键联系人与车主关系 下拉列表
	 $("#keyContact_accountRelType").val(data.account_rel_type);
	
	 $("#modify_keyAddr").val(data.addr);
	 $("#modify_keyWeixin_num").val(data.weixin_num);
	  //不发短信
	  if(data.sms_flg=='Y'){
		  $("#modify_keySmsflg").attr("checked",true);
		  jQuery.uniform.update($("#modify_keySmsflg"));
	  }
	  //不发邮件
	  if(data.email_flg=='Y'){
		  $("#modify_keyEmailflg").attr("checked",true);
		  jQuery.uniform.update($("#modify_keyEmailflg"));
	  } 
	  //不发微信
	  if(data.weixin_flg=='Y'){
		  $("#modify_keyWeixinNumflg").attr("checked",true);
		  jQuery.uniform.update($("#modify_keyWeixinNumflg"));
	  }
	  $("select").select2();
}
//会员信息修改 加载紧急联系人信息 
function clubUrgentContact(data){
	if(!data){
		return;
	}
	$("#modify_UrgentContactId").val(data.contact_id);
	 $("#modify_UrgentName").val(data.name);
	 $("#modify_UrgentCell_ph_num").val(data.cell_ph_num);
	//关键联系人与车主关系 下拉列表
	 $("#urgentContact_accountRelType").val(data.account_rel_type);
	 $("#modify_UrgentAddr").val(data.addr);
	 $("select").select2();
}
//会员信息修改查询车辆信息显示
function clubAuto(data){
		emptyTable2('modify_club_auto_table');
        $.each(data,function(i,item){
        	var tr=$("#modify_club_autoTr").clone(true).show();
        	$("#modify_club_auto_table tbody").find("tr").last().after(tr);
        	tr.attr("flg","active");
            var cell=0;
            tr.find("td").eq(cell).html(getBrandNameByCode(item.brand));
            cell=cell+1;
            tr.find("td").eq(cell).html(item.vin);
            cell=cell+1;
            tr.find("td").eq(cell).html(item.seriesName);
            cell=cell+1;
            tr.find("td").eq(cell).html(item.modelName);
            cell=cell+1;
            var contactName=(null==item.contactName)?'':item.contactName;
            var contactCode=(null==item.contactCode || ''==item.contactCode)?'0':item.contactCode;
            tr.find("td").eq(cell).html("<input type='hidden' name='autoIdArray' value='"+item.id+"'></input><input type='hidden' name='contactCodeArray' value='"+contactCode+"'></input><input class='form-control' type='text' name='contactNameArray' value='"+contactName+"'></input>");
            cell=cell+1;
            tr.find("td").eq(cell).html("<input class='form-control' type='text' name='contactPhoneArray' value='"+item.contactPhone+"'></input>");
            cell=cell+1;
            tr.find("td").eq(cell).html("<input class='form-control' type='text' name='contactBkPhoneArray' value='"+item.contactBkPhone+"'></input>");
        });
    }

//礼遇预约动态加载提供商:courtesyTypeName数组属性：supplierType:code:name
function loadSupplier(){
	//默认选中否
	$('#reservationFlag option:eq(0)').attr('selected','selected'); 
	 $('select').select2();
	var courtesyTypeName=$("#courtesyTypeName").val()==""?-1:$("#courtesyTypeName").find("option:selected").val();
	var reservationFlag=$("#reservationFlag").val()==""?-1:$("#reservationFlag").find("option:selected").val();
	//设置页面上需要隐藏的元素
	if(courtesyTypeName==-1){
		 $('.suppliertxt').hide();
		 $('.dealertxt').hide();
		 $('.courtesyDatatxt').hide();
		 $('select').select2();
		 $('#reservationFlag option:eq(0)').attr('selected','selected'); 
		 $('select').select2();
		 return;
	} 
	//礼遇类型数组：supplierType:code:name
	courtesyTypeName=courtesyTypeName.split(":");
	//优先级：事故协助处理，租车服务默认能否预约为”是“默认是可以预约的
	if((courtesyTypeName[2].trim()=='事故协助处理')
			||(courtesyTypeName[2].trim()=='租车服务')){
		//显示不同的验证信息
		if(courtesyTypeName[2].trim()=='事故协助处理'){
			courtesyValidateInfoShow(3);
		}
		if(courtesyTypeName[2].trim()=='租车服务'){
			courtesyValidateInfoShow(2);
		}
		if(reservationFlag==0){
			  //默认选择是eq(1)
			  $('#reservationFlag option:eq(1)').attr('selected','selected'); 
			  $("#reservationFlag").attr("readonly","true");
			  $('select').select2();
			  reservationFlag="1";
		}
		//已享受次数等显示
		$('.courtesyDatatxt').hide();
		//经销商选择是否显示
		isSupplierShow(courtesyTypeName);
	}else if((courtesyTypeName[2].trim()=='维修保养预约上门接送车')||(courtesyTypeName[2].trim()=='机场接送车')){
		$("#reservationFlag").attr("readonly","true");
		$('.courtesyDatatxt').show();
		//显示不同的验证信息
		 courtesyValidateInfoShow(1);
		//根据会员等级、礼遇使用次数、礼遇使用间隔时间、自动判断出是否可以预约(机场接送车,维修保养预约上门接送车)
		checkCourtesyRule(courtesyTypeName);
	}
	
}
/*礼遇的供应商等信息是否显示*/
function isSupplierShow(courtesyTypeName){
	//经销商
	reservationFlag=$("#reservationFlag").find("option:selected").val();
	if(courtesyTypeName[0]==1&&reservationFlag==1){
		 //经销商
		 $('.suppliertxt').hide();
		 $('.dealertxt').show();
		 club_courtesyInitSupplier(courtesyTypeName[0],courtesyTypeName[1]);
	}else if(courtesyTypeName[0]==2&&reservationFlag==1){ //供应商
		 $('.suppliertxt').show();
		 $('.dealertxt').hide();
		 $('.courtesyDatatxt').hide();
		 club_supplier(courtesyTypeName[0],courtesyTypeName[1]);
	}else if(courtesyTypeName[0]==3&&reservationFlag==1){ //CAC
		//CAC
		 $('.suppliertxt').hide();
		 $('.de$.Alertxt').hide();
		 $('.courtesyDatatxt').hide();
	}
}
//检查礼遇规则
function checkCourtesyRule(courtesyTypeNameArray){
	//check
	checkClubCourtesy(courtesyTypeNameArray);
}

//验证礼遇(参数：礼遇类别,能否预约)
function checkClubCourtesy(courtesyTypeArray){
	var courtesyData=$("#requestInfoForm").serialize()+"&"+"courtesyTypeArray="+courtesyTypeArray;
		$.ajax({
        url:contextPath+"/inbound/checkClubCourtesy.json",
        type:"post",
        dataType:"json",
        data:courtesyData,
        success:function(data){
           setCourtesyData(data);
        }
    });
}


//礼遇预约次数设置
function setCourtesyData(item){
	 //验证不通过
	 if(item.remark!='-1'){
		 $('.courtesyDatatxt').hide();
		 $('.dealertxt').hide();
		 $('.suppliertxt').hide();
		 $.Alert(item.remark);
		 return;
	 }
	 //能否预约(数量/时间)
	 if((item.usedSurplusNum<=0)||(item.surplusTime!='null'&&item.surplusTime=='N')){
		 $('#reservationFlag option:eq(0)').attr('selected','selected'); 
		 $('select').select2();
	 }else{
		 $('#reservationFlag option:eq(1)').attr('selected','selected'); 
		 $('select').select2();   
	 }
	 if(reservationFlag=$("#reservationFlag").find("option:selected").val()==1){
		 $('.dealertxt').show();
	 }else{
		 $('.dealertxt').hide();
	 }
	 initProvince("addressListFirst",true);
	 $("#addressListSecond option").remove();
 	 $("#addressListThird option").remove();
	 $('select').select2();

	 $("#yearUseNum").html(item.yearUseNum);
	 $("#usedNum").html(item.usedNum);
	 $("#usedSurplusNum").html(item.usedSurplusNum);
	 $("#reservationTime").html(item.reservationTime);
	 $("#nextReservationTime").html(item.nextReservationTime);
	 
	 
	 var courtesyTypeName=$("#courtesyTypeName").val()==""?-1:$("#courtesyTypeName").find("option:selected").val();
	//礼遇类型数组：supplierType:code:name
	courtesyTypeName=courtesyTypeName.split(":");
	//经销商选择是否显示
	isSupplierShow(courtesyTypeName);
}

//动态加载提供商
function club_courtesyInitSupplier(supplier_type,courtesyTypeCode){
	var courtesyData=$("#requestInfoForm").serialize()+"&"+"supplierType="+supplier_type+"&courtesyTypeCode="+courtesyTypeCode;
		$.ajax({
        url:contextPath+"/inbound/courtesyInitSupplier.json",
        type:"post",
        dataType:"json",
        data:courtesyData,
        success:function(data){
        	initProvince("addressListFirst",true);
        	$("#addressListSecond option").remove();
        	$("#addressListThird option").remove();
        	$("#courtesyDealer option").remove();
        	 $("#addressListSecond").append("<option value=''>--请选择--</option>");
        	 $("#addressListThird").append("<option value=''>--请选择--</option>");
            $("#courtesyDealer").append("<option value=''>--请选择--</option>");
            //专员和站长电话清空
            $("#courtesyDirectorPhone").html('');
        	$("#courtesyStationMasterPhone").html('');
            $('select').select2();
            $.each(data,function(key,val){
            	var dealer=JSON.stringify(val);
                $("#courtesyDealer").append("<option data='"+dealer+"' value='"+val.ascCode+":"+val.directorPhone+":"+val.stationMasterPhone+"'>"+val.ascStName+"</option>");
            });
        }
    });
}
//省/市/区  加载
function club_selectAreaInit(province,city,cityRegion,supplierType){
	if($("#courtesyTypeName").val()==""){
		$.Alert('请选择礼遇');
		return;
	}
	var courtesyTypeName=$("#courtesyTypeName").val();
	courtesyTypeArray=courtesyTypeName.split(":");
	var courtesyData=$("#requestInfoForm").serialize()+"&"+"province="+province+"&city="+city+"&cityRegion="+cityRegion+"&supplierType="+supplierType+"&courtesyTypeCode="+courtesyTypeArray[1];
		$.ajax({
        url:contextPath+"/inbound/courtesyInitSupplier.json",
        type:"post",
        dataType:"json",
        data:courtesyData,
        success:function(data){
        	$("#courtesyDealer option").remove();
            $("#courtesyDealer").append("<option value=''>--请选择--</option>");
          //专员和站长电话清空
            $("#courtesyDirectorPhone").html('');
        	$("#courtesyStationMasterPhone").html('');
            $('select').select2();
            $.each(data,function(key,val){
            	var dealer=JSON.stringify(val);
                $("#courtesyDealer").append("<option data='"+dealer+"' value='"+val.ascCode+":"+val.directorPhone+":"+val.stationMasterPhone+"'>"+val.ascStName+"</option>");
            });
        }
    });
}
//租车服务第三方
function club_supplier(supplier_type,courtesyTypeCode){
	var courtesyData=$("#requestInfoForm").serialize()+"&"+"supplierType="+supplier_type+"&courtesyTypeCode="+courtesyTypeCode;
		$.ajax({
        url:contextPath+"/inbound/courtesyInitSupplier.json",
        type:"post",
        dataType:"json",
        data:courtesyData,
        success:function(data){
            $.each(data,function(index,item){
            	$("#courtesySupplierAscName").html(item.ascName);
            	document.getElementById("courtesySupplierCode").value=item.code;
            	$("#courtesySupplierBusinessPhone1").html(item.businessPhone1);
            });
        }
    });
}

//选择经销商
function selectCourtesyDealer(){
	var courtesyDealer=$("#courtesyDealer").val()==""?-1:$("#courtesyDealer").find("option:selected").val();
	if(courtesyDealer==-1){
		 return;
	}
	//专员 /站长
	var dealer=$("#courtesyDealer").find("option:selected").attr("data");
	var json=jQuery.parseJSON(dealer);
	var zuanyuan=getZuanyuanTel(json);
	var zhanzhang=json.stationMasterPhone;
	$("#courtesyDirectorPhone").html(zuanyuan);
	$("#courtesyStationMasterPhone").html(zhanzhang);
}
/*根据礼遇类型得到不同专员的电话*/
function getZuanyuanTel(json){
	var courtesyTypeName=$("#courtesyTypeName").val();
	courtesyTypeArray=courtesyTypeName.split(":");
	if(courtesyTypeArray[2].indexOf('机场')!=-1){
		return json.shuttlePersonPhone;
	}
	if(courtesyTypeArray[2].indexOf('维修')!=-1){
		return json.repairPersonPhone;	
	}
	if(courtesyTypeArray[2].indexOf('事故')!=-1){
		return json.accidentPersonPhone;
	}
	return '';
}

//省/市/区  加载
function selectArea(){
	var province=$("#addressListFirst").val();
	var city=$("#addressListSecond").val();
	var cityRegion=$("#addressListThird").val();
	var courtesyTypeName=$("#courtesyTypeName").val()==""?-1:$("#courtesyTypeName").find("option:selected").val();
	
	club_selectAreaInit(province,city,cityRegion,courtesyTypeName[0]);
}
 function courtesyValidateInfoShow(type){
	 if(1==type){
		 $("#tr_1").show();
		 $("#tr_2").hide();
		 $("#tr_3").hide();
	 }else if(2==type){
		 $("#tr_1").hide();
		 $("#tr_2").show();
		 $("#tr_3").hide();
	 }else if(3==type){
		 $("#tr_1").hide();
		 $("#tr_2").hide();
		 $("#tr_3").show();
	 }
 }
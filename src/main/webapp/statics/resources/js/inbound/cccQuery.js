$(function(){
	
	$("#a_expand").on('click',function(e){
        var el = $("#i_portlet");
        if (jQuery(this).hasClass("collapse")) {
            jQuery(this).removeClass("collapse").addClass("expand");
            //el.slideUp(100);
        } else {
            jQuery(this).removeClass("expand").addClass("collapse");
            //el.slideDown(100);
        }
	});
        $("#li_tab_member_contact").on("click",queryContact);
        $("#li_tab_member_car").on("click",queryAuto);
        $("#li_tab_member_jifen").on("click",function(){
        	setTimeout(queryPoint,100);
        }
        );
        $("#li_tab_subinst_contact").on("click",querySubinstContact);
        $("#li_tab_subinst_car").on("click",querySubinstAuto);
        $("#li_tab_service").on("click",queryServiceInfo);
        $("#li_tab_member_dealer").on("click",queryDealerInfo);
        $("#li_tab_task").on("click",queryTaskInfo);
        //$("#li_tab_member_courtesy").on("click",queryTaskInfo);
        $("#li_tab_member_courtesy").on("click",function(){
	       	 if($('#memberId').val()!=-1){
	       		 courtesyDataTable();
	       	 }        	 
        });
        $("#li_tab_drive_test").on("click",function(){
        	initProvince('driver_state',true);
        	inbound_carmodel.getCarSeries("intent_intentcarseries",$("#brand").val()); 
        	$("#driver_state").select2();
        });
        $("#intent_intentcarseries").change(function(){
        	inbound_carmodel.getCarModels("intent_intentcarmodels",$("#intent_intentcarseries").val()); 
        });
        $("#driver_state").on("change",function(){
        	initCity('driver_city',$("#driver_state").val(),true);
        	$("#driver_city").select2();
        });
        
        $("#li_tab_new_owner_rep").on("click",function(){
        	initProvince('recommend_state',true);
        	inbound_carmodel.getCarSeries("recommend_intentcarseries",$("#brand").val()); 
        	$("#recommend_state").select2();
        });
        $("#recommend_intentcarseries").change(function(){
        	inbound_carmodel.getCarModels("recommend_intentcarmodels",$("#recommend_intentcarseries").val()); 
        });
        $("#recommend_state").on("change",function(){
        	initCity('recommend_city',$("#recommend_state").val(),true);
        	$("#recommend_city").select2();
        });
        
        $("#btn_suggestion_save").on("click",function(){
        	$('#form_suggestion').submit();
		});
        $("#btn_drivetest_save").on("click",function(){
        	$('#form_drivetest').submit();
		});
		 $("#btn_recommend_save").on("click",function(){
	        	$('#form_recommend').submit();
		});  
        $("#btn_drive_dealer_select").on("click",function(){
        	selectDealer(1);
        });
        $("#btn_recommend_dealer_select").on("click",function(){
        	selectDealer(2);
        });
        $("#complainTarget").on("change",function(){
	 		procBrandShow();
	 	});
        $("#btn_complain_dealerSelect").on("click",function(){
       	 	selectDealer(3);
        });
        $("#li_tab_complain").on("click",function(){
        	 initComplianType("first_complainType",'0');
	       	 $("#complainSponsorName").val(customerInfo.ownerName);
	       	 $("#complainSponsorPhone").val(customerInfo.cellPhNum);
        });
        $("#first_complainType").on("change",function(){
       	 initComplianType('sel_complainType',$("#first_complainType").val());
        });
        $("#li_tab_cust_leads").on("click",function(){
        	getCustLeads();
        });
        $('#workSheetNo').on('click',function(){
            var num=$(this).attr('checked')?0:1;
            $('.newquestiontxt').hide().eq(num).show();
    
       });
    });
    $(document).ready(function(){
    	setQueryForm();
    	App.init(); // initlayout and core plugins
    	validationForm();
    	if($("#custId").val()==null || $("#custId").val()==''){
    		return;
    	}
      	 //客户调研-仅限别克
        if(1==$("#brand").val()){
       	 $(".custInvestDivtxt").show(); 
        }else{
       	 $(".custInvestDivtxt").hide(); 
        }
        if(3==$("#requestInfoForm #brand").val()){
            $(".cadiOnly").show();
        }
        
        destCustLevel();
        getCustomerAllInfo();
        initTaskAmount();
        //(客户咨询)初始化咨询类别
		initConsultingType();
		 //(客户咨询)客户信息
      	 $("#consultingName").val(customerInfo.ownerName);
       	 $("#consultingPhone").val(customerInfo.cellPhNum);
    });
    /*根据是否有会员id，用户id，客户id，来判断客户的基别，并控制响应信息的显示*/
    function destCustLevel(){
        var cl="3";
        if("400290004"==$("#custType").val()){
            cl="1";
            $("#title_page").html('会员信息');
            $("#summary_member").show();
            $("#li_tab_member_info").show();
            $("#li_tab_member_car").show();
            $("#li_tab_member_contact").show();
            $("#li_tab_member_card").show();
            $("#li_tab_member_jifen").show();
            $("#li_tab_member_courtesy").show();
            $("#li_tab_member_dealer").show();
            
            $("#tab_member_info").addClass("active");
            //会员，只有凯迪有新车主推荐
            if(3==$("#brand").val()){
                $("#li_tab_new_owner_rep").show();
            }
        }else if("400290003"==$("#custType").val()){
            cl="2";
            $("#title_page").html('车主信息');
            $("#summary_subinst").show();
            $("#li_tab_subinst_info").show();
            $("#li_tab_subinst_car").show();
            $("#li_tab_subinst_contact").show();
            
            $("#tab_subinst_info").addClass("active");
            //车主，只有凯迪有新车主推荐
            if(3==$("#brand").val()){
                $("#li_tab_new_owner_rep").show();
            }
        }else {
            cl="3";
            $("#title_page").html('潜客信息');
            $("#summary_cust").show();
            $("#li_tab_cust_info").show();
            $("#li_tab_cust_leads").show();
            
            $("#tab_cust_info").addClass("active");
        }
        $("#custLevel").val(cl);
    }
    /*查询客户详细信息*/
    function getCustomerAllInfo(){
        $.ajax({
            url:contextPath+'/inbound/getCustomerAllInfo.json',
            type:'post',
            data:$("#requestInfoForm").serialize(),
            dataType:"json",
            success:function(data){
                defaultCustomerInfo(data);
                setPageJson(data);
            },
            error:function(data){
                $.Alert(JSON.stringify(data));
            }
        });
    }
    /*设置页面上部客户信息的值显示*/
    function defaultCustomerInfo(data){
    	if(window.console){
    		console.log(JSON.stringify(data));
    	}
        $("#member_ownername").html(data.custName+getGenderLabel(data.sexMf));
        $("#member_custType").html(getDictName('40029',data.subType));
        $("input[name='member_brand'][value='"+$("#brand").val()+"']").attr("checked","true");
        $("input[name='subinst_brand'][value='"+$("#brand").val()+"']").attr("checked","true");
        $("input[name='cust_brand'][value='"+$("#brand").val()+"']").attr("checked","true");
        $("#subinst_ownername").html(data.custName+getGenderLabel(data.sexMf));
        $("#subinst_mobile").html(data.cellPhNum);
        $("#cust_ownername").html(data.custName+getGenderLabel(data.sexMf));
        $("#cust_mobile").html(data.cellPhNum);
        
        /*设置一些默认显示的值*/
        $("#driver_name").val(data.custName);
        $("#driver_mobile").val(data.cellPhNum);
        $("#recommend_custName").val(data.custName);
        $("#recommend_custPhone").val(data.cellPhNum);
        
        /*根据来电客户的类型来显示相应的信息*/
        if($("#custLevel").val()==1){
            setMemberPersonalInfo(data);
        }
        if($("#custLevel").val()==2){
            setSubinstPersonalInfo(data);
        }
        if($("#custLevel").val()==3){
            setCustPersonalInfo(data);
        }
        jQuery.uniform.update($("input:radio"));
    }
    /*设置页面上json对象customerInfo的各种属性值*/
    function setPageJson(data){
        customerInfo.cardNum =data.cardNum;
        customerInfo.cardStatus =data.cardStatus;
        customerInfo.memberOperator=data.operator;
        customerInfo.memberJtTime=new Date(data.joinDt).format('yyyy-MM-dd');
        customerInfo.cardType =data.memberLevel;
        customerInfo.memberStatus=data.statusCd;
        customerInfo.custType=data.custType;
        customerInfo.custClass=data.custClass;
        customerInfo.ownerName=(null == data.name || ''==data.name)?data.custName:data.name;
        customerInfo.idType = data.idType;
        customerInfo.idNum=data.idNum;
        customerInfo.gender=data.sexMf;
        customerInfo.pinYin=data.pinyin;
        customerInfo.cellPhNum = data.cellPhNum;
    }
    /*来电客户为会员时显示会员相应信息*/
    function setMemberPersonalInfo(data){
         $("#member_owner_pinyin").html(data.pinyin);
         $("#member_birthday").html(new Date(data.birthDate).format("yyyy-MM-dd"));
         $("#member_mail").html(data.emailAddr);
         $("#member_idType").html(getDictName('6011',data.idType));
         $("#member_idNum").html(data.idNum);
         $("#member_address").html(data.addr);
         $("#member_zipcode").html(data.zipCd);
         $("#member_smsFlg").html(data.smsFlg=='Y'?'是':'否');
         $("#member_mailFlg").html(data.emailFlg=='Y'?'是':'否');
         //会员卡
        var levelCode=40014;
     	if(1==$("#brand").val()){
     		levelCode=40028;
     	}
     	if(2==$("#brand").val()){
     		levelCode=40014;
     	}
     	if(3==$("#brand").val()){
     		levelCode=40015;
     	}
         $("#member_cardno").html(data.cardNum);
         $("#member_cardstatus").html(getDictName('40020',data.cardStatus));
         $("#member_cardlevel").html(getDictName(levelCode,data.memberLevel));
         $("#member_leveldate").html(new Date(data.tierStartDate).format("yyyy-MM-dd"));
         //积分
        $("#member_cishu").html(data.point4);
        $("#member_amount").html((data.point3==null ? '' :(data.point3+'').asCurrency())+"元");
        $("#member_jifen").html(data.point2==null ? '' :(data.point2+'').asCurrency());
        $("#member_avaliable").html(data.point1==null ? '' :(data.point1+'').asCurrency());
    }
    /*来电客户为车主时显示车主相应信息*/
    function setSubinstPersonalInfo(data){
        $("#label_subinst_name").html(data.custName+getGenderLabel(data.sexMf));
        $("#label_subinst_mobile").html(data.cellPhNum);
        $("#label_subinst_idNum").html(data.idNum);
        //$("#label_subinst_edu").html(data.);
        $("#label_subinst_weixin").html(data.webChatAcct);
        //$("#label_subinst_tel").html(data.);
        $("#label_subinst_birthday").html(new Date(data.birthDate).format('yyyy-MM-dd'));
        $("#label_subinst_mail").html(data.emailAddr);
        $("#label_subinst_weibo").html(data.microBlogAcct);
        //$("#label_subinst_vocation").html(data.);
        //$("#label_subinst_province").html(data.);
        //$("#label_subinst_city").html(data.);
        //$("#label_subinst_cust_level").html(data.);
        //$("#label_subinst_married").html(data.);
        $("#label_subinst_addr").html(data.addr);
        $("#label_subinst_zipcode").html(data.zipCd);
        //$("#label_subinst_salary").html(data.);
        //$("#label_subinst_fav").html(data.);
        //$("#label_subinst_interesting").html(data.);
    }
    /*来电客户为潜客时显示潜客相应信息*/
    function setCustPersonalInfo(data){
        $("#label_cust_name").html(data.custName+getGenderLabel(data.sexMf));
        $("#label_cust_mobile").html(data.cellPhNum);
        //$("#label_cust_tel").html(data.);
        $("#label_cust_weixin").html(data.webChatAcct);
        $("#label_cust_weibo").html(data.microBlogAcct);
        $("#label_cust_mail").html(data.emailAddr);
    }
       /*查询车辆信息*/
   function querySubinstAuto(){
       $.ajax({
           url:contextPath+"/inbound/queryAutoInfo.json",
           type:"post",
           dataType:"json",
           data:$("#requestInfoForm").serialize(),
           success:function(data){
               redrawSubinstAuto(data);
           }
       });
   } 
   /*查询车辆信息*/
   function querySubinstContact(){
       $.ajax({
           url:contextPath+"/inbound/queryAutoInfo.json",
           type:"post",
           dataType:"json",
           data:$("#requestInfoForm").serialize(),
           success:function(data){
               redrawSubinstContact(data);
           }
       });
   } 
   /*查询车辆信息显示*/
    function redrawSubinstAuto(data){
        emptyTable2('subinst_auto_table');
        $.each(data,function(i,item){
            var tr=$("#subinst_autoTr").clone(true).show();
            $("#subinst_auto_table tbody").find("tr").last().after(tr);
            tr.attr('flg','active');
            var cell=0;
            tr.find("td").eq(cell).html(item.brandName);
            cell=cell+1;
            tr.find("td").eq(cell).html(item.dealer);
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
            tr.find("td").eq(cell).html(item.packages);
            cell=cell+1;
            tr.find("td").eq(cell).html(new Date(item.saleDt).format('yyyy-MM-dd'));
        });
    }
    /*显示车主联系人*/
    function redrawSubinstContact(data){
        $.each(data,function(i,item){
            $("#subinst_contact_name").html(item.contactName);
            $("#subinst_contact_mobile").html(item.contactPhone);
            return;
        });
    }
    
    /*客户建议*/
    function saveSuggestion(){
    	var brand = $("#brand").val();
    	if(brand==null || brand==''){
            $.Alert('请选择品牌');
            return;
        }
        $("#btn_suggestion_save").attr("disabled",true);
        $.ajax({
            url:contextPath + "/inbound/saveSuggestion.json",
            dataType:"json",
            data:$("#requestInfoForm").serialize()+"&"+$("#form_suggestion").serialize(),
            type:"post",
            success:function(data){
                $.Alert('保存客户建议成功');
                reEnableButton();
            },
            error:function(data){
                $("#btn_suggestion_save").removeAttr("disabled");
                $.Alert(JSON.stringify(data));
            }
        });
    }
    /*试乘试驾*/
    function saveDriveTest(){
    	var brand = $("#brand").val();
    	if(brand==null || brand==''){
            $.Alert('请选择品牌');
            return;
        }
        $("#btn_drivetest_save").attr("disabled",true);
        $("#intent_intentcarseriesname").val($("#intent_intentcarseries option:selected").text());
        $("#intent_intentcarmodelsname").val($("#intent_intentcarmodels option:selected").text());
        $.ajax({
            url:contextPath + "/inbound/saveDriveTest.json",
            dataType:"json",
            data:$("#requestInfoForm").serialize()+"&"+$("#form_drivetest").serialize(),
            type:"post",
            success:function(data){
                $.Alert('保存试乘试驾成功');
                reEnableButton();
            },
            error:function(data){
                $("#btn_drivetest_save").removeAttr("disabled");
                $.Alert(JSON.stringify(data));
            }
        });
    }
    
     /*车主推荐保存*/
    function saveRecommend(){
    	var brand = $("#brand").val();
    	if(brand==null || brand==''){
            $.Alert('请选择品牌');
            return;
        }
        $("#btn_recommend_save").attr("disabled",true);
        $("#recommend_intentcarseriesname").val($("#recommend_intentcarseries option:selected").text());
        $("#recommend_intentcarmodelsname").val($("#recommend_intentcarmodels option:selected").text());
        $.ajax({
            url:contextPath + "/inbound/saveRecommend.json",
            dataType:"json",
            data:$("#requestInfoForm").serialize()+"&"+$("#form_recommend").serialize(),
            type:"post",
            success:function(data){
                $.Alert('新车主推荐成功');
                reEnableButton();
            },
            error:function(data){
                $("#btn_recommend_save").removeAttr("disabled");
                $.Alert(JSON.stringify(data));
            }
        });
    }
    
   var idx=1;  //经销商选择弹出位置：1，试乘试驾；2，新车主推荐；3，客户投诉
   /*打开经销商选择*/
   function selectDealer(curIdx){
        idx=curIdx;
        var state;
        var city;
        if(1==idx){
            if($("#driver_state").val()!=null &&  $("#driver_state").val()!=''){
                //state=$("#driver_state option:selected").text();
                state=$("#driver_state").val();
                //city=$("#driver_city").val();
            }
        }
       if(2==idx){
            if($("#recommend_state").val()!=null &&  $("#recommend_state").val()!=''){
                //state=$("#recommend_state option:selected").text();
                state=$("#recommend_state").val();
                //city=$("#recommend_city").val();
            }
        }
       var brand=$("#brand").val();
       var _url=contextPath+"/inbound/queryDealer.json?r="+Math.random();
       var paraJson={"brand":brand,"state":state,"city":city};
       if(3==idx){
            brand=$("#selComplainBrand").val();
            _url=contextPath+"/outbound/cccComplain/dateTable.json?r="+Math.random();
            paraJson={"brand":brand};
        }
        var createAjax = $("#myModalrw");
        createAjax.empty();
        //createAjax.('<img src="${resRoot}assets/img/ajax-modal-loading.gif" alt="" class="loading">');
         createAjax.modal({
                backdrop:'static',
                keyboard:false
            });
         createAjax.modal("show");
         createAjax.load(_url,paraJson, function(data) {
                
         });
   }
   function setAscEai(code,name){
        dealerCallback(code,name);
   }
   /*经销商选择页面回调函数*/
   function dealerCallback(val,text){
       if(1==idx){
            $("#txt_driveDealer").val(text);
            $("#driveDealerCode").val(val);
       }
       if(2==idx){
           $("#txt_recommendDealer").val(text);
           $("#recommendDealerCode").val(val);
       }
       if(3==idx){
            $("#txt_complainDealer").val(text);
            $("#complainDealerCode").val(val);
       }
   }
   
   function getCustLeads(){
        $.ajax({
            url:contextPath + "/inbound/getCustLeads.json",
            dataType:"json",
            data:"brand="+$("#brand").val()+"&mobilephone="+customerInfo.cellPhNum,
            type:"post",
            success:function(data){
                if(data){
                    redrawCustLeads(data);
                }
            },
            error:function(data){
                $.Alert(JSON.stringify(data));
            }
        });
   }
   function redrawCustLeads(data){
        $("#label_cust_leads_rang").html(getDictName('40035',data.purchasingwindow));
        $("#label_cust_leads_series").html(data.intentcarseriesname);
        $("#label_cust_leads_model").html(data.intentcarmodelsname);
        $("#label_cust_leads_regdate").html(new Date(data.registertime).format('yyyy-MM-dd'));
        $("#label_cust_leads_province").html(getProvinceName(data.state));
        $("#label_cust_leads_city").html(getProvinceName(data.city));
        $("#label_cust_leads_dealer").html(data.dealerName);
        $("#label_cust_leads_resource").html(getDictName('40031',data.channelCode));
   }
   /*品牌切后后先更新requestInfoForm中memberId等信息，再初始化页面数据*/
   function changeBrand(brand){
       //如果选中的品牌与当前品牌相同，不执行操作
       if(brand== $("#requestInfoForm").find("input[name='brand']").first().val()){
           return;
       }
       $("#requestInfoForm").find("input[name='brand']").first().val(brand);
    
       $.ajax({
            url:contextPath+"/inbound/getOtherBrandMemeber.json",
            type:"post",
            dataType:"json",
            data:"brand="+brand+"&custId="+$("#custId").val(),
            success:function(data){
                var curCust=gl.getCurCust();
                gl.removeCurCust();
                curCust.brand=getBrandNameByCode(brand);
                var mid;
                var sid;
                var custType;
                if(!data){
                    mid=-1;
                    sid="-1";
                }else{
                    if(!data.memberId){
                        mid="-1";
                        sid=data.subInstId;
                        custType=data.subType;
                    }else{
                        mid=data.memberId;
                        sid=data.subInstId;
                        custType=data.subType;
                    }
                }
                curCust.custType=custType;
                curCust.memberId=mid;
                curCust.subInstId=sid;
                gl.setCurCust(curCust);
                $("#requestInfoForm").submit();
            },
            error:function(){
                $.Alert('获取会员信息错误');
            }
       });
       
   }
   
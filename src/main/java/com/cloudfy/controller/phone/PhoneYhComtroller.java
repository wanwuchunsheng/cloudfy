package com.cloudfy.controller.phone;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cloudfy.controller.common.BaseParams;
import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.phone.CommodityNav;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.phone.IPhoneService;

/**
 * 说明：PC服务端
 *     主要服务JH APP商城
 * @author wanwuchunsheng 
 * */
@RestController
@RequestMapping("p")
public class PhoneYhComtroller {
	
    Logger log=Logger.getLogger(this.getClass());
	
	@Autowired
	IPhoneService phoneService;
	
	
	
	/**
	 * 说明：JH APP 分类详细
	 * @author Administrator
	 * */
	@RequestMapping(value = "/commodityNavInfoFLAll", method = RequestMethod.POST)
	public List<CommodityNav> CommodityNavInfoAll(@RequestBody CommodityNav navInfo){
		try {
			System.out.println("开始："+new Date());
			List<CommodityNav> list=BaseParams.getNavInfoFLMap().get(navInfo.getDpnum());
			System.out.println(list.size());
			System.out.println("结束："+new Date());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：HOME首页查询查询所有商品异常！！！");
		}
		return null;
	}
	/**
	 * 说明：JH APP 推荐详细
	 * @author Administrator
	 * */
	@RequestMapping(value = "/commodityNavInfoTJAll", method = RequestMethod.POST)
	public List<CommodityNav> commodityNavInfoTJAll(@RequestBody CommodityNav navInfo){
		try {
			System.out.println("开始："+new Date());
			List<CommodityNav> list=BaseParams.getNavInfoTJMap().get(navInfo.getDpnum());
			System.out.println(list.size());
			System.out.println("结束："+new Date());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：HOME首页查询查询所有商品异常！！！");
		}
		return null;
	}
	
	/**
	 * 说明：JH APP-幻灯片数据
	 * @author Administrator
	 * */
	@RequestMapping(value = "/changePicAll", method = RequestMethod.POST)
	public List<CommodityNav> changePicAll(@RequestBody CommodityNav navInfo){
		try {
			System.out.println("幻灯片开始："+new Date());
			List<CommodityNav> list=BaseParams.getChangePicMap().get(navInfo.getDpnum());
			System.out.println(list.size());
			System.out.println("幻灯片结束："+new Date());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：HOME首页查询幻灯片异常！！！");
		}
		return null;
	}
	
	
	/**
	 * 功能说明：模糊查询
	 * @author wanchanghuang
	 * @createTime 2018年8月3日19:32:13
	 * 
	 * */
	@RequestMapping(value = "/querySearchAll", method = RequestMethod.POST)
	public List<CommondityInfo> querySearchAll(@RequestBody CommondityInfo info){
		try {
			System.out.println("模糊开始："+new Date());
			List<CommondityInfo> list=phoneService.querySearchAll(info);
			System.out.println("模糊结束："+new Date());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：HOME首页查询幻灯片异常！！！");
		}
		return null;
	}
	

	/**
	 * 说明：刷新系统缓存
	 * 
	 * */
	@RequestMapping(value = "/resSysData", method = RequestMethod.POST)
	@ResponseBody
	public String resSysData(){
		try {
			phoneService.initCommodityNavInfo();
			phoneService.initcnavAll();
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Constants.RESULT_ERROR;
	}
}

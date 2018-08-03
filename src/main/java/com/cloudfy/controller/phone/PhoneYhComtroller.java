package com.cloudfy.controller.phone;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cloudfy.controller.common.BaseParams;
import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.CommondityNav;
import com.cloudfy.model.phone.CommodityNav;
import com.cloudfy.service.phone.IPhoneService;

/**
 * 说明：小程序优化服务端
 * 
 * */
@RestController
@RequestMapping("p")
public class PhoneYhComtroller {
	
    Logger log=Logger.getLogger(this.getClass());
	
	@Autowired
	IPhoneService phoneService;
	
	/** home 首页查询   */
	
	/**
	 * 说明：查询所有首页数据
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
	 * 说明：查询首页推荐
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
	 * 说明：查询所有首页数据-获取幻灯片数据
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
	 * 说明：查询所有首页数据
	 * @author Administrator
	 * */
	@RequestMapping(value = "/queryNav", method = RequestMethod.POST)
	public List<CommondityNav> queryNav(@RequestBody CommondityNav nav){
		try {
			System.out.println("开始："+new Date());
			List<CommondityNav> list=BaseParams.getNavMap().get(nav.getDpnum());
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
	 * 说明：查询所有首页数据
	 * @author Administrator
	 * */
	@RequestMapping(value = "/queryCommodityInfo", method = RequestMethod.POST)
	public List<CommondityInfo> queryCommodityInfo(@RequestBody CommondityInfo info){
		try {
			System.out.println("开始："+new Date());
			List<CommondityInfo> list=BaseParams.getInfoMap().get(info.getDpnum());
			System.out.println(list.size());
			System.out.println("结束："+new Date());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：HOME首页查询查询所有商品异常！！！");
		}
		return null;
	}
	
	

}

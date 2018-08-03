package com.cloudfy.controller.phone;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.CommondityNav;
import com.cloudfy.service.phone.IPhoneService;
/**
 * 说明：phone服务
 * @author Administrator
 * */
@RestController
@RequestMapping("ph")
public class PhoneController {
	
	Logger log=Logger.getLogger(this.getClass());
	
	@Autowired
	IPhoneService phoneService;
	
/*********************HOME START***************************************************/	
	
	/**
	 * 说明：home-幻灯片
	 * @author Administrator
	 * */
	@RequestMapping(value = "/changePic", method = RequestMethod.POST)
	public List<CommondityNav> changePic(@RequestBody CommondityNav navInfo){
		try {
			return phoneService.changePic(navInfo);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：首页查询幻灯片数据异常！！！");
		}
		return null;
	}
	
	/**
	 * 说明：home-导航
	 * @author Administrator
	 * */
	@RequestMapping(value = "/commondifyNavAll", method = RequestMethod.POST)
	public List<CommondityNav> commondifyNavAll(@RequestBody CommondityNav navInfo){
		try {
			System.out.println(new Date());
			List<CommondityNav> list=phoneService.commondifyNavAll(navInfo);
			System.out.println(list.size());
			System.out.println(new Date());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：首页查询CommondityNav异常！！！");
		}
		return null;
	}
	
	/**
	 * 说明：home-明细
	 * @author Administrator
	 * */
	@RequestMapping(value = "/commondifyInfoAll", method = RequestMethod.POST)
	public List<CommondityInfo> commondifyInfoAll(@RequestBody CommondityInfo navInfo){
		try {
			return phoneService.commondifyInfoAll(navInfo);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：首页查询CommondityInfo异常！！！");
		}
		return null;
	}
/*********************HOME END ***************************************************/
	
/*********************CATEGROY START***************************************************/
	
	/**
	 * 说明：分类-查询导航
	 * @author Administrator
	 * */
	@RequestMapping(value = "/categroyNavAll", method = RequestMethod.POST)
	public List<CommondityNav> categroyNavAll(@RequestBody CommondityNav bean){
		try {
			return phoneService.queryCommondityNav(bean);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：分类查询商品详细异常！！！");
		}
		return null;
	}
	
	/**
	 * 说明：分类-查询详细
	 * @author Administrator
	 * */
	@RequestMapping(value = "/categroyInfoAll", method = RequestMethod.POST)
	public List<CommondityInfo> categroyInfoAll(@RequestBody CommondityInfo bean){
		try {
			return phoneService.queryCommondityInfo(bean);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：分类查询商品详细异常！！！");
		}
		return null;
	}
	
	/**
	 * 说明：分类-查询详细
	 * @author Administrator
	 * */
	@RequestMapping(value = "/categroyInfoByCode", method = RequestMethod.POST)
	public List<CommondityInfo> categroyInfoByCode(@RequestBody CommondityInfo bean){
		try {
			return phoneService.categroyInfoByCode(bean);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：单击分类查询商品详细异常！！！");
		}
		return null;
	}
/*********************CATEGROY  END***************************************************/
	
/*********************ShoppingCart Start*************************************************/
	
	
	/**
	 * 说明：分类-购物车查询详细
	 * @author Administrator
	 * */
	@RequestMapping(value = "/shoppingCartAll", method = RequestMethod.POST)
	public List<CommondityInfo> shoppingCartAll(@RequestBody CommondityInfo acInfo){
		try {
			System.out.println(acInfo.getAcInfoIds());
			List<CommondityInfo> list=phoneService.shoppingCartAll(acInfo);
			System.out.println(list.size());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR：单击分类查询商品详细异常！！！");
		}
		return null;
	}
	
/*********************ShoppingCart End***************************************************/
	
}

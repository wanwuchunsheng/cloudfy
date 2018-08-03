package com.cloudfy.service.phone.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.framework.dal.client.IPaginationDalClient;
import com.cloudfy.controller.common.BaseParams;
import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.CommondityNav;
import com.cloudfy.model.phone.CommodityInfo;
import com.cloudfy.model.phone.CommodityNav;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.phone.IPhoneService;
/**
 * 说明：PC服务端
 * @author Administrator
 * */
@Service("phoneService")
public class PhoneServiceImpl implements IPhoneService{

	@Autowired
    IPaginationDalClient dalClient;
	
	/**
	 * 说明：首页-查询INFO数据
	 * @author Administrator
	 * @param ac_code 类别
	 * */
	@Override
	public List<CommondityInfo> commondifyInfoAll(CommondityInfo navInfo) {
		return dalClient.queryForList("ph.commondifyInfoAll", navInfo, CommondityInfo.class);
	}

	/**
	 * 说明：首页-查询NAV数据
	 * @author Administrator
	 * @param ac_code 类别
	 * */
	@Override
	public List<CommondityNav> commondifyNavAll(CommondityNav navInfo) {
		return dalClient.queryForList("ph.commondifyNavAll", navInfo, CommondityNav.class);
	}


	/**
	 * 说明：首页-ph首页查询幻灯片
	 * @author Administrator
	 * */
	@Override
	public List<CommondityNav> changePic(CommondityNav navInfo) {
		return dalClient.queryForList("ph.changePic", navInfo, CommondityNav.class);
	}

	/**
	 * 说明：分类-查询导航
	 * */
	@Override
	public List<CommondityNav> queryCommondityNav(CommondityNav bean) {
		return dalClient.queryForList("ph.categroyNavAll", bean, CommondityNav.class);
	}

	/**
	 * 说明：分类-查询明细
	 * */
	@Override
	public List<CommondityInfo> queryCommondityInfo(CommondityInfo bean) {
		return dalClient.queryForList("ph.categroyInfoAll", bean, CommondityInfo.class);
	}

	/**
	 * 说明：分类-单击查询明细
	 * */
	@Override
	public List<CommondityInfo> categroyInfoByCode(CommondityInfo bean) {
		return dalClient.queryForList("ph.categroyInfoByCode", bean, CommondityInfo.class);
	}

	/**
	 * 说明：购物车-查询购物车详细
	 * @author Administrator
	 * */
	@Override
	public List<CommondityInfo> shoppingCartAll(CommondityInfo bean) {
		return dalClient.queryForList("ph.shoppingCartAll", bean, CommondityInfo.class);
	}

	
	
	
	
	/**查询所有分类*/
	@Override
	public List<CommodityNav> commodifyNavAll(CommondityNav navInfo) {
		// TODO Auto-generated method stub
		return dalClient.queryForList("ph.comdityNav", navInfo, CommodityNav.class);
	}

	/**查询所有分类详细*/
	@Override
	public List<CommodityInfo> commodifyInfoAll(CommondityNav navInfo) {
		// TODO Auto-generated method stub
		return dalClient.queryForList("ph.comdityInfo", navInfo, CommodityInfo.class);
	}
	
	
    /**
     * 说明：初始化数据
     * @author Administrator
     * */
	@Override
	public void initCommodityNavInfo() {
		String[] str=Constants.dpnums;//1获得店铺
		List<CommodityNav> allList=null;
		Map<String,List<CommodityNav>> map=null;
		CommodityNav cdn=null;
		for(String s:str){//2循环查询店铺
			/**
			 *普通类型数据
			 * 
			 * */
			map=new HashMap<String,List<CommodityNav>>();
			allList=new ArrayList<CommodityNav>();//3全局商品类型，及详细
			//封装普通类型查询条件
			cdn=new CommodityNav();
			cdn.setDpnum(s); 
			cdn.setType(0);//0-普通类型数据  1-幻灯片数据 2-首页类型
			//6查询不同店铺的分类，及类型
			List<CommodityNav> navlist=dalClient.queryForList("ph.comdityNav",cdn, CommodityNav.class);
			for(CommodityNav cn:navlist){
				 cn.setCommodityInfo(dalClient.queryForList("ph.comdityInfo", cn, CommodityInfo.class));
			     allList.add(cn);
			}
			map.put(s, allList);
			BaseParams.setNavInfoFLMap(map);
			/**
			 * 幻灯片数据
			 * 
			 * */
			map=new HashMap<String,List<CommodityNav>>();
			allList=new ArrayList<CommodityNav>();//3全局商品类型，及详细
			cdn.setType(1);//0-普通类型数据  1-幻灯片数据
			//6查询不同店铺的分类，及类型
			List<CommodityNav> changePic1=dalClient.queryForList("ph.comdityNav",cdn, CommodityNav.class);
			for(CommodityNav cn1:changePic1){
				 cn1.setCommodityInfo(dalClient.queryForList("ph.comdityInfo", cn1, CommodityInfo.class));
				 allList.add(cn1);
			}
			map.put(s, allList);
			BaseParams.setChangePicMap(map);
			
			/**
			 * 首页推荐 
			 * 
			 * */
			map=new HashMap<String,List<CommodityNav>>();
			allList=new ArrayList<CommodityNav>();//3全局商品类型，及详细
			cdn.setType(2);//0-普通类型数据  1-幻灯片数据  2-首页类型
			//6查询不同店铺的分类，及类型
			List<CommodityNav> changePic2=dalClient.queryForList("ph.comdityNav",cdn, CommodityNav.class);
			for(CommodityNav cn2:changePic2){
				 cn2.setCommodityInfo(dalClient.queryForList("ph.comdityInfo", cn2, CommodityInfo.class));
				 allList.add(cn2);
			}
			map.put(s, allList);
			BaseParams.setNavInfoTJMap(map);
		}
		
	}

	@Override
	public void queryCommodityNav() {
		String[] str=Constants.dpnums;//1获得店铺
		CommondityNav nav=null;
		Map<String,List<CommondityNav>> navMap=new HashMap<String, List<CommondityNav>>();
		for(String s:str){
			nav=new CommondityNav();
			nav.setDpnum(s);
			nav.setType(0);
			navMap.put(s, dalClient.queryForList("ph.comdityNav", nav, CommondityNav.class));
		}
		BaseParams.setNavMap(navMap);
	}

	@Override
	public void queryCommodityInfo() {
		String[] str=Constants.dpnums;//1获得店铺
		CommondityInfo nav=null;
		Map<String,List<CommondityInfo>> infoMap=new HashMap<String, List<CommondityInfo>>();
		for(String s:str){
			nav=new CommondityInfo();
			nav.setDpnum(s);
			nav.setType(0);
			infoMap.put(s, dalClient.queryForList("ph.queryInfo", nav, CommondityInfo.class));
		}
		BaseParams.setInfoMap(infoMap);
	}

	/**
	 * 说明：查询幻灯片
	 * @author Administrator
	 * */
	@Override
	public void queryChangePic() {
		String[] str=Constants.dpnums;//1获得店铺
		Map<String,List<CommodityNav>> map=new HashMap<String,List<CommodityNav>>();
		List<CommodityNav> allList=null;
		CommodityNav cdn=null;
		for(String s:str){//2循环查询店铺
			allList=new ArrayList<CommodityNav>();//3全局商品类型，及详细
			cdn=new CommodityNav();
			cdn.setType(1);//0-普通类型数据  1-幻灯片数据
			cdn.setDpnum(s);//店铺
			//6查询不同店铺的分类，及类型
			List<CommodityNav> changePic=dalClient.queryForList("ph.comdityNav",cdn, CommodityNav.class);
			for(CommodityNav cn:changePic){
				 cn.setCommodityInfo(dalClient.queryForList("ph.comdityInfo", cn, CommodityInfo.class));
				 allList.add(cn);
			}
			map.put(s, allList);
		}
		BaseParams.setChangePicMap(map);
	}

	

}

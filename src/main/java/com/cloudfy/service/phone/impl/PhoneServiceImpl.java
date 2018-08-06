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
			 * 类型-分类
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
			 * 幻灯片
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
			 * 推荐 
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



    /**
     * 功能说明： 模糊查询
     * @author Administrator
     * @createTime 2018年8月3日19:35:48
     * */
	@Override
	public List<CommondityInfo> querySearchAll(CommondityInfo info) {
		
		return dalClient.queryForList("ph.querySearchAll", info, CommondityInfo.class);
	}

	

}

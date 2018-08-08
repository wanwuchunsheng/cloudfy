package com.cloudfy.controller.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cloudfy.model.nav.CommondityNav;
import com.cloudfy.model.phone.CommodityNav;

public class BaseParams {
	
	/**
	 * 移动端
	 * 
	 * */
	//分类
	private static Map<String,List<CommodityNav>> navInfoFLMap=new HashMap<String, List<CommodityNav>>();//商品类型及详细
    //首页推荐
	private static Map<String,List<CommodityNav>> navInfoTJMap=new HashMap<String, List<CommodityNav>>();//商品类型及详细
	//幻灯片
	private static Map<String,List<CommodityNav>> changePicMap=new HashMap<String, List<CommodityNav>>();//幻灯片数据
	
	/**
	 * PC服务端基础数据
	 * 
	 * */
	private static Map<String,List<CommondityNav>> cnavAll=new HashMap<String, List<CommondityNav>>();//商品类型
	
	
	public static Map<String, List<CommondityNav>> getCnavAll() {
		return cnavAll;
	}

	public static void setCnavAll(Map<String, List<CommondityNav>> cnavAll) {
		BaseParams.cnavAll = cnavAll;
	}

	public static Map<String, List<CommodityNav>> getNavInfoFLMap() {
		return navInfoFLMap;
	}

	public static void setNavInfoFLMap(Map<String, List<CommodityNav>> navInfoFLMap) {
		BaseParams.navInfoFLMap = navInfoFLMap;
	}

	public static Map<String, List<CommodityNav>> getChangePicMap() {
		return changePicMap;
	}

	public static void setChangePicMap(Map<String, List<CommodityNav>> changePicMap) {
		BaseParams.changePicMap = changePicMap;
	}

	public static Map<String, List<CommodityNav>> getNavInfoTJMap() {
		return navInfoTJMap;
	}

	public static void setNavInfoTJMap(Map<String, List<CommodityNav>> navInfoTJMap) {
		BaseParams.navInfoTJMap = navInfoTJMap;
	}

	

	
	
	
	
	
	
	
	
	
}

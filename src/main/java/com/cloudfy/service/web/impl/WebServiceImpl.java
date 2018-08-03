package com.cloudfy.service.web.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.framework.dal.client.IPaginationDalClient;
import com.cloudfy.model.web.CpDescription;
import com.cloudfy.model.web.NewsInfo;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.WebBottomType;
import com.cloudfy.model.web.WebCategory;
import com.cloudfy.model.web.WebMenu;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.web.IWebService;

@Service("webService")
public class WebServiceImpl implements IWebService{
	
	@Autowired
    IPaginationDalClient dalClient;

	/**
	 * 【功能说明】：查询web 菜单栏
	 * 
	 * @author v_wanchanghuang
	 * @time 2015年5月16日 08:57:54
	 * 
	 * */
	@Override
	public List<WebMenu> queryWebMenuByAll() {
		List<WebMenu> result= dalClient.queryForList("web.queryWebMenuByAll", null,WebMenu.class);
		return result;
	}

	/**
	 * 【功能说明】：查询web 底部列表分类
	 * 
	 * @author v_wanchanghuang
	 * @time 2015年5月16日 08:57:48
	 * 
	 * */
	@Override
	public List<WebBottomType> queryWebBottomTypeListByAll() {
		List<WebBottomType> result= dalClient.queryForList("web.queryWebBottomTypeListByAll", null,WebBottomType.class);
		return result;
	}

	/**
	 * 【功能说明】：查询web 中间大分类
	 * 
	 * @author v_wanchanghuang
	 * @time 2015年5月16日 08:57:43
	 * 
	 * */
	@Override
	public List<WebCategory> queryWebcategoryByAll() {
		List<WebCategory> result= dalClient.queryForList("web.queryWebcategoryByAll", null,WebCategory.class);
		return result;
	}

	/**
	 * 【功能说明】：查询web 产品
	 * 
	 * @author v_wanchanghuang
	 * @time 2015年5月16日 08:57:43
	 * 
	 * cpTag  1-沙发 
	 * 
	 * */
	@Override
	public List<CpDescription> queryCpDescriptionByAll(Integer cpTag) {
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("cpTag", cpTag);
		map.put("cpStatus",Constants.RESULT_STATUS_Y);
		List<CpDescription> result= dalClient.queryForList("web.queryCpDescriptionByAll", map,CpDescription.class);
		return result;
	}
	
	
	
	
	/**
	 * 【功能说明】：查询web 新闻
	 * 
	 * @author v_wanchanghuang
	 * @time 2015-4-8 10:48:06
	 * 
	 * */
	@Override
	public List<NewsInfo> queryWebNewsInfoByAll(Map<String,Integer> map) {
		List<NewsInfo> result= dalClient.queryForList("web.queryWebNewsInfoListByAll", map,NewsInfo.class);
		return result;
	}

	/**
	 * 【功能说明】：查询web 简介
	 * 
	 * @author v_wanchanghuang
	 * @time 2015-4-8 10:48:06
	 * 
	 * */
	@Override
	public NewsInfo queryWebNewsInfoByType(Integer isPass) {
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("isPass", isPass); // 4-简介
		return dalClient.queryForObject("web.queryWebNewsInfoListByType", map,NewsInfo.class);
	}
	
	
	/**
	 * 【功能说明】：查询web 真皮沙发/十字绣
	 * 
	 * @author v_wanchanghuang
	 * @time 2015-4-8 09:45:35
	 * 
	 * */
	@Override
	public List<CpDescription> queryWebDescribeByTypeToFrist(Map<String,Integer> map) {
		List<CpDescription> result= dalClient.queryForList("web.queryWebDescribeByTypeToFrist", map,CpDescription.class);
		return result;
	}
	
	
	/**
	 * 【功能说明】：查询web 新闻的总个数
	 * 
	 * @author v_wanchanghuang
	 * @time 2015-4-8 09:45:35
	 * 
	 * */
	@Override
	public Integer queryWebNewsInfoByCount(Map<String,Integer> map) {
		return dalClient.queryForObject("web.queryWebNewsInfoByCount", map,Integer.class);
	}
	
	
	/**
	 * 【功能说明】：查询web 商城   商品总个数
	 * 
	 * @author v_wanchanghuang
	 * @time 2015-4-8 09:45:35
	 * 
	 * */
	@Override
	public Integer queryWebDescriptionByCount(Map<String, Integer> map) {
		return dalClient.queryForObject("web.queryWebDescriptionByCount", map,Integer.class);
	}
	
	
	

	
	
	
	

}

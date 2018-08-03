package com.cloudfy.service.web;

import java.util.List;
import java.util.Map;

import com.cloudfy.model.web.CpDescription;
import com.cloudfy.model.web.NewsInfo;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.WebBottomType;
import com.cloudfy.model.web.WebCategory;
import com.cloudfy.model.web.WebMenu;

public interface IWebService {

	List<WebMenu> queryWebMenuByAll();

	List<WebBottomType> queryWebBottomTypeListByAll();

	List<WebCategory> queryWebcategoryByAll();

	List<CpDescription> queryCpDescriptionByAll(Integer cpTag);

	List<NewsInfo> queryWebNewsInfoByAll(Map<String, Integer> map);

	NewsInfo queryWebNewsInfoByType(Integer isPass);

	List<CpDescription> queryWebDescribeByTypeToFrist(Map<String, Integer> map);

	Integer queryWebNewsInfoByCount(Map<String, Integer> map);

	Integer queryWebDescriptionByCount(Map<String, Integer> map);
	

}

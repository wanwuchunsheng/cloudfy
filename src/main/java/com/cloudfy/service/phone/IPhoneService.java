package com.cloudfy.service.phone;

import java.util.List;

import com.cloudfy.model.nav.CommondityInfo;


public interface IPhoneService {

	
	/** 系统启动初始化数据 */
	void initCommodityNavInfo();

	/**模糊查询*/
	List<CommondityInfo> querySearchAll(CommondityInfo info);

	

}

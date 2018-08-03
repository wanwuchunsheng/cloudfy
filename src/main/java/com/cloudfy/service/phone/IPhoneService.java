package com.cloudfy.service.phone;

import java.util.List;

import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.CommondityNav;
import com.cloudfy.model.phone.CommodityInfo;
import com.cloudfy.model.phone.CommodityNav;

public interface IPhoneService {

	List<CommondityInfo> commondifyInfoAll(CommondityInfo navInfo);

	List<CommondityNav> commondifyNavAll(CommondityNav navInfo);

	List<CommondityNav> changePic(CommondityNav navInfo);

	List<CommondityNav> queryCommondityNav(CommondityNav bean);

	List<CommondityInfo> queryCommondityInfo(CommondityInfo bean);

	List<CommondityInfo> categroyInfoByCode(CommondityInfo bean);

	List<CommondityInfo> shoppingCartAll(CommondityInfo acInfoIds);
	
	/**查询导航所有数据*/
	List<CommodityNav> commodifyNavAll(CommondityNav navInfo);
	/**查询 所有详细数据*/
	List<CommodityInfo> commodifyInfoAll(CommondityNav navInfo);

	/** 初始化数据 */
	void initCommodityNavInfo();

	void queryCommodityNav();

	void queryCommodityInfo();

	void queryChangePic();

}

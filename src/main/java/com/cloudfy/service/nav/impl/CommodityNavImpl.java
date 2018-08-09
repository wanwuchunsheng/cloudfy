package com.cloudfy.service.nav.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.CommondityNav;
import com.cloudfy.service.nav.ICommodityNavSerivce;
import com.ibm.framework.dal.client.IPaginationDalClient;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
/**
 * 说明：商品类型
 * 
 * */
@Service("commodityNavService")
public class CommodityNavImpl implements ICommodityNavSerivce{

	
	@Autowired
    IPaginationDalClient dalClient;

	@Override
	public PaginationResult<List<CommondityNav>> queryNavPage(
			CommondityInfo bean, Pagination pagination) {
		PaginationResult<List<CommondityNav>> result = dalClient.queryForList("typ.queryCommondityNavAll", bean,CommondityNav.class, pagination);
        return result;
	}

}

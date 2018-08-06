package com.cloudfy.service.nav.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.framework.dal.client.IPaginationDalClient;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.CommondityNav;
import com.cloudfy.model.nav.PictureAddressInfo;
import com.cloudfy.model.sys.SysUserInfo;
import com.cloudfy.service.nav.ICommondityNavService;

/**
 *  说明：  商品导航
 *  @author Administrator
 * 
 * */
@Service("commondityNavService")
public class CommondityNavImpl implements ICommondityNavService{
	
	@Autowired
    IPaginationDalClient dalClient;

	/**
	 * 说明：商品导航查询
	 * @author Administrator
	 * 
	 * */
	@Override
	public List<CommondityNav> queryCommondityNav(SysUserInfo userInfo) {
		return dalClient.queryForList("nav.queryCommondityNav", userInfo, CommondityNav.class);
	}


    /**
     * 说明：商品明细
     * 
     * */
	@Override
	public PaginationResult<List<CommondityInfo>> queryCommondityInfo(
			CommondityInfo bean, Pagination pagination) {
		PaginationResult<List<CommondityInfo>> result = dalClient.queryForList("nav.queryCommondityInfo", bean,CommondityInfo.class, pagination);
        return result;
	}


	/**
	 * 说明：商品明细，添加-图片地址
	 * @author Administrator
	 * */
	@Override
	public void savePriceAddress(PictureAddressInfo vo) {
		dalClient.persist(vo);
	}

	/**
	 * 说明：保存商品明细
	 * @author Administrator
	 * */
	@Override
	public Integer saveCommondityInfo(CommondityInfo bean) {
		try {
			return dalClient.persist(bean).intValue();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	
	
}

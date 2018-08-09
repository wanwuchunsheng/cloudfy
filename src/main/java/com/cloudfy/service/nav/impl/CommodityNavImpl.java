package com.cloudfy.service.nav.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloudfy.model.nav.CommondityIcon;
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
			CommondityNav bean, Pagination pagination) {
		PaginationResult<List<CommondityNav>> result = dalClient.queryForList("typ.queryCommondityNavAll", bean,CommondityNav.class, pagination);
        return result;
	}

	@Override
	public CommondityNav queryCommondityNavById(CommondityNav bean) {
		
		return dalClient.queryForObject("typ.queryCommondityNavById", bean, CommondityNav.class);
	}

	/**
	 * 说明：商品类型-保存
	 * 
	 * */
	@Override
	public void addCommondityNav(CommondityNav bean) {
		dalClient.persist(bean);
	}

	/**
	 * 说明：商品类型-查询图标
	 * 
	 * */
	@Override
	public List<CommondityIcon> queryCommondityIconAll() {
		
		return dalClient.queryForList("typ.queryCommondityIconAll", null,CommondityIcon.class);
	}

	/**
	 * 说明：商品类型 - 修改保存
	 * 
	 * */
	@Override
	public void updateCommondityNav(CommondityNav bean) {
		dalClient.dynamicMerge(bean);
	}

	/**
	 * 说明：商品类型-删除
	 * 
	 * */
	@Override
	public void deleteCommondityNav(String[] str) {
		CommondityIcon icon=null;
		for(String s:str){
			if(!"".equals(s.trim())){
				icon=new CommondityIcon();
				icon.setId(Integer.parseInt(s));
				dalClient.execute("typ.deleteCommondityIconByid",icon);
			}
		}
	}

}

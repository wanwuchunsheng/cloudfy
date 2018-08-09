package com.cloudfy.service.nav;

import java.util.List;

import com.cloudfy.model.nav.CommondityIcon;
import com.cloudfy.model.nav.CommondityNav;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;

public interface ICommodityNavSerivce {

	//查询结合
	PaginationResult<List<CommondityNav>> queryNavPage(CommondityNav bean,
			Pagination pagination);

	//修改跳转-查询对象
	CommondityNav queryCommondityNavById(CommondityNav bean);

	//添加
	void addCommondityNav(CommondityNav bean);

	//查询图标表
	List<CommondityIcon> queryCommondityIconAll();

	//修改保存
	void updateCommondityNav(CommondityNav bean);

	//删除
	void deleteCommondityNav(String[] str);

}

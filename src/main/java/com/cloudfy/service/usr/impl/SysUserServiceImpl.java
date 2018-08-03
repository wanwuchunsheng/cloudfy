package com.cloudfy.service.usr.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.framework.dal.client.IPaginationDalClient;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.cloudfy.model.common.SysFixCode;
import com.cloudfy.model.usr.SysResourceInfo;
import com.cloudfy.model.usr.SysUserInfo;
import com.cloudfy.service.usr.ISysUserService;
/**
 * 说明：登录验证
 * 
 * */
@Service("sysUserService")
public class SysUserServiceImpl implements ISysUserService{
   
	@Autowired
    IPaginationDalClient dalClient;

	@Override
	public SysUserInfo verifyUser(SysUserInfo bean) {
		
		return dalClient.queryForObject("user.verifyUser", bean, SysUserInfo.class);
	}

	@Override
	public List<SysResourceInfo> querySysResource(SysUserInfo bean) {
		return dalClient.queryForList("user.querySysResource", bean, SysResourceInfo.class);
	}

	/**
	 * 说明：用户管理-用户查询
	 * 
	 * */
	@Override
	public PaginationResult<List<SysUserInfo>> querySysUserAll(
			SysUserInfo userInfo, Pagination pagination) {
		PaginationResult<List<SysUserInfo>> result = dalClient.queryForList("user.querySysResourceAll", userInfo,SysUserInfo.class, pagination);
        return result;
	}

	@Override
	public List<SysFixCode> querySysFixCode() {
		return dalClient.queryForList("common.querySysFixCode", null,SysFixCode.class);
	}
}

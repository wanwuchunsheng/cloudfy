package com.cloudfy.service.sys.impl;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.sys.SysResourceInfo;
import com.cloudfy.model.sys.SysUserInfo;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.sys.ISysUserService;
import com.ibm.framework.dal.client.IPaginationDalClient;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
/**
 * 说明：用户管理
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

	/**
	 * 功能说明：查询左菜单
	 * @createTime 2018年8月6日19:57:54
	 * */
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

	

	/**
	 * 说明：用户管理- 用户修改/查询用户
	 * @createTime 2018年8月6日19:22:19
	 * */
	@Override
	public SysUserInfo querySysUserById(SysUserInfo vo) {
		return dalClient.queryForObject("user.querySysUserById", vo,SysUserInfo.class);
	}

	/**
	 * 功能说明：添加
	 * @createTime 2018年8月6日20:13:49
	 * */
	@Override
	public void addUserById(SysUserInfo vo) {
		dalClient.persist(vo);
	}
	/**
	 * 功能说明：修改
	 * @createTime 2018年8月6日20:13:49
	 * */
	@Override
	public void updateUserById(SysUserInfo vo) {
		dalClient.dynamicMerge(vo);
	}

	/**
	 * 功能说明：删除用户
	 * 
	 * */
	@Override
	public void deleteUSerById(String[] str) {
		SysUserInfo bean=null;
		
		for(String s:str){
			if(!"".equals(s.trim())){
				bean=new SysUserInfo();
				bean.setId(Integer.parseInt(s));
				dalClient.execute("user.deleteUSerById", bean);
			}
		}
		
	}
}

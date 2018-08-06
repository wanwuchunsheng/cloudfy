package com.cloudfy.service.sys;

import java.util.List;

import com.cloudfy.model.sys.SysResourceInfo;
import com.cloudfy.model.sys.SysUserInfo;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;

public interface ISysUserService {

	//验证用户
	SysUserInfo verifyUser(SysUserInfo bean);
    //查询资源
	List<SysResourceInfo> querySysResource(SysUserInfo bean);
    //查询用户
	PaginationResult<List<SysUserInfo>> querySysUserAll(SysUserInfo userInfo,
			Pagination pagination);
    //查询用户
	SysUserInfo querySysUserById(SysUserInfo vo);
    //添加
	void addUserById(SysUserInfo vo);
	//修改
	void updateUserById(SysUserInfo vo);

}

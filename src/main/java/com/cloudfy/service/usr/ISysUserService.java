package com.cloudfy.service.usr;

import java.util.List;

import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.cloudfy.model.common.SysFixCode;
import com.cloudfy.model.usr.SysResourceInfo;
import com.cloudfy.model.usr.SysUserInfo;

public interface ISysUserService {

	SysUserInfo verifyUser(SysUserInfo bean);

	List<SysResourceInfo> querySysResource(SysUserInfo bean);


	PaginationResult<List<SysUserInfo>> querySysUserAll(SysUserInfo userInfo,
			Pagination pagination);

	

	List<SysFixCode> querySysFixCode();

}

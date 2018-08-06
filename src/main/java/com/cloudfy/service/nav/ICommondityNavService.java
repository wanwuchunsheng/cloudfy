package com.cloudfy.service.nav;

import java.util.List;

import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.CommondityNav;
import com.cloudfy.model.nav.PictureAddressInfo;
import com.cloudfy.model.sys.SysUserInfo;

public interface ICommondityNavService {

	List<CommondityNav> queryCommondityNav(SysUserInfo userInfo);

	PaginationResult<List<CommondityInfo>> queryCommondityInfo(
			CommondityInfo bean, Pagination pagination);

	void savePriceAddress(PictureAddressInfo vo);

	Integer saveCommondityInfo(CommondityInfo bean);

}

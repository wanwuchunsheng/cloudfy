package com.cloudfy.service.nav;

import java.util.List;

import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.CommondityNav;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;

public interface ICommodityNavSerivce {

	//查询结合
	PaginationResult<List<CommondityNav>> queryNavPage(CommondityInfo bean,
			Pagination pagination);

}

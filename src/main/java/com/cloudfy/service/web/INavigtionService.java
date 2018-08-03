package com.cloudfy.service.web;

import java.util.List;

import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.WebMenu;

public interface INavigtionService {

	SuperUserVo queryUserByObj(SuperUserVo sUser);

	PaginationResult<List<WebMenu>> queryNavitionListPage(WebMenu vo,
			Pagination pagination);

	WebMenu queryNavigationById(WebMenu vo);

	String deleteNavigationById(String ids);

	void addNavigationFzObjct(WebMenu vo);

	void updateNavigationById(WebMenu vo);

	String updorAddNavigation(WebMenu vo);

}

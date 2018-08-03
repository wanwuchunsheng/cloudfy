package com.cloudfy.service.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.cloudfy.model.web.CpDescription;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.WebMenu;

public interface IDescriptionService {



	PaginationResult<List<CpDescription>> queryDescriptionListPage(
			CpDescription vo, Pagination pagination);

	CpDescription queryDescriptionById(CpDescription vo);

	void updateDescriptionById(CpDescription vo);

	String deleteDescriptionById(String ids);

	void saveImgNews(CpDescription vo);

}

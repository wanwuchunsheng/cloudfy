/**
 * 
 */
package com.cloudfy.service.web;

import java.util.List;

import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.cloudfy.model.web.NewsInfo;


/**
 * @author v_wanchanghuang
 *
 * @version 2015年1月23日  下午9:56:51
 */
public interface INewsInfoService {

	PaginationResult<List<NewsInfo>> queryNewsInfoListPage(NewsInfo vo,
			Pagination pagination);

	String deleteNewsInfoById(String ids);

	void updateNewsInfoById(NewsInfo vo);
	
	void updateNewsInfoByNumber(NewsInfo vo);
	

	NewsInfo queryNewsInfoById(NewsInfo vo);

	void saveNewsInfoObj(NewsInfo vo);

	//void updateNewsInfoColumnById(NewsInfo vo);
	
	
	
	
}

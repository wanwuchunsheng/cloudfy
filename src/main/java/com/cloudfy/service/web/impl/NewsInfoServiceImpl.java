/**
 * 
 */
package com.cloudfy.service.web.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.framework.dal.client.IPaginationDalClient;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.ibm.framework.dal.transaction.template.CallBackTemplate;
import com.cloudfy.model.web.CpDescription;
import com.cloudfy.model.web.NewsInfo;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.User;
import com.cloudfy.service.web.INewsInfoService;
import com.cloudfy.service.web.IUserService;

/**
 * @author v_wanchanghuang
 *
 * @version 2015年1月23日  下午9:57:06
 */
@Service("newsInfoService")
public class NewsInfoServiceImpl  implements INewsInfoService{
	
	
	@Autowired
    IPaginationDalClient dalClient;


	/**
	 * 【功能说明】：新闻管理
	 * 
	 * @author v_wanchanghuang
	 * @time 2015年5月19日 17:51:38
	 * @param 
	 * 
	 * */
	@Override
	public PaginationResult<List<NewsInfo>> queryNewsInfoListPage(NewsInfo vo,
			Pagination pagination) {
		PaginationResult<List<NewsInfo>> result = dalClient.queryForList("newsInfo.queryNewsInfoListPage", vo,NewsInfo.class, pagination);
        return result;
	}

	/**
	 * 【功能说明】：新闻管理  - 删除
	 * 	  
	 * @author v_wanchanghuang
	 * @time 2015-4-7 15:42:42
	 * 
	 * */

	public String deleteNewsInfoById(final String ids) {
		dalClient.getTransactionTemplate().execute(new CallBackTemplate<Integer>() {
            @Override
            public Integer invoke() {
              String strs =ids.substring(0, ids.length()-1);
              String str[]=strs.split(",");
              NewsInfo us=new NewsInfo();
              for(int i=0;i<str.length;i++){
            	  String idt=str[i];
            	  us.setId(Integer.parseInt(idt));
            	  //删除
            	  dalClient.execute("newsInfo.deleteNewsInfoById", us);
              }
               return null;
           }
        });
        return null;
	}

	
	/**
	 * 【功能说明】：新闻管理  - 修改保存
	 * 	  
	 * @author v_wanchanghuang
	 * @time 2015-4-7 15:42:42
	 * 
	 * */
	@Override
	public void updateNewsInfoById(NewsInfo vo) {
		dalClient.execute("newsInfo.updateNewsInfoById", vo);
		
	}
	
	/**
	 * 【功能说明】：新闻管理  - 更新阅读量，收藏量
	 * 	  
	 * @author v_wanchanghuang
	 * @time 2015-4-7 15:42:42
	 * 
	 * */
	@Override
	public void updateNewsInfoByNumber(NewsInfo vo) {
		dalClient.execute("newsInfo.updateNewsInfoByNumber", vo);
		
	}

	
	/**
	 * 【功能说明】：新闻管理  - 修改查询
	 * 	  
	 * @author v_wanchanghuang
	 * @time 2015-4-7 15:42:42
	 * 
	 * */
	@Override
	public NewsInfo queryNewsInfoById(NewsInfo vo) {
		return dalClient.queryForObject("newsInfo.queryNewsInfoById", vo, NewsInfo.class);
	}

	
	/**
	 * 【功能说明】：新闻管理  - 添加保存
	 * 	  
	 * @author v_wanchanghuang
	 * @time 2015-4-7 15:42:42
	 * 
	 * */
	@Override
	public void saveNewsInfoObj(NewsInfo vo) {
		dalClient.persist(vo);
		
	}

	
	
	
	

}

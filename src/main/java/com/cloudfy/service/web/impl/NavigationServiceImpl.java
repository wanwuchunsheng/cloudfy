package com.cloudfy.service.web.impl;


import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.framework.dal.client.IPaginationDalClient;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.ibm.framework.dal.transaction.template.CallBackTemplate;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.WebMenu;
import com.cloudfy.service.web.INavigtionService;

@Service("navigtionService")
public class NavigationServiceImpl implements INavigtionService{
	
	@Autowired
    IPaginationDalClient dalClient;

	/**
	 * 【功能说明】：登录验证
	 * 
	 * @author v_wanchanghuang
	 * @time 2015年1月24日 23:38:45
	 * @param sUser
	 * 
	 * */
	@Override
	public SuperUserVo queryUserByObj(SuperUserVo sUser){
		SuperUserVo user= dalClient.queryForObject("user.queryUserByObj",sUser,SuperUserVo.class);
		return user;
	}
	
	

	/********** web菜单start  **********************************************************************************************/
	
	/**
	 * [功能说明]: 查询导航菜单-列表
	 * 
	 * @time 2015年4月17日 11:25:52
	 * @author v_wanchanghuang
	 *  
	 * */
	@Override
	public PaginationResult<List<WebMenu>> queryNavitionListPage(WebMenu vo,
			Pagination pagination) {
		PaginationResult<List<WebMenu>> result = dalClient.queryForList("navigation.queryNavitionListPage", vo,WebMenu.class, pagination);
        return result;
	}


	/**
	 * [功能说明]:【功能说明】：查询导航菜单-修改查询
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public WebMenu queryNavigationById(WebMenu vo) {
		// TODO Auto-generated method stub
		return dalClient.queryForObject("navigation.queryNavigationById", vo, WebMenu.class);
	}


	/**
	 * [功能说明]:【功能说明】：用户管理 - 保存 修改
	 * 
	 * @time 2015年4月17日 15:46:49
	 * @param  1-成功   2-失败
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public void updateNavigationById(WebMenu vo) {
		dalClient.execute("navigation.updateNavigationById", vo);
		
	}


	/**
	 * [功能说明]:【功能说明】：用户管理 - 删除
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-成功   2-失败
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public String deleteNavigationById(final String ids) {
		dalClient.getTransactionTemplate().execute(new CallBackTemplate<Integer>() {
            @Override
            public Integer invoke() {
              String strs =ids.substring(0, ids.length()-1);
              String str[]=strs.split(",");
              WebMenu us=new WebMenu();
              for(int i=0;i<str.length;i++){
            	  String idt=str[i];
            	  us.setId(Integer.parseInt(idt));
            	  //删除
            	  dalClient.execute("navigation.deleteNavigationById", us);
              }
              return null;
           }
        });
        return null;
	}


	/**
	 * [功能说明]:【功能说明】：用户管理 - 保存  添加-父节点
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public void addNavigationFzObjct(WebMenu vo) {
		 dalClient.persist(vo);
		
	}


	/**
	 * [功能说明]:【功能说明】：用户管理 - 保存  添加-子节点
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public String updorAddNavigation(final WebMenu vo) {
		dalClient.getTransactionTemplate().execute(new CallBackTemplate<Integer>() {
            @Override
            public Integer invoke() {
                //修改根节点 is_fzs状态
                dalClient.execute("navigation.updateWebMenuById", vo);
            	// 添加新节点
                vo.setCode(vo.getId());
                vo.setId(null);//清空ID
                vo.setIsFaz(2);
                vo.setIsDelete(0);
                vo.setCreateTime(new Date());
                vo.setUpdateTime(new Date());
                //添加
                dalClient.persist(vo);
                
               return null;
           }
        });
        return null;
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}

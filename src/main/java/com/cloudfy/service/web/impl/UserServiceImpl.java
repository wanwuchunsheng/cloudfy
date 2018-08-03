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
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.User;
import com.cloudfy.service.web.IUserService;

/**
 * @author v_wanchanghuang
 *
 * @version 2015年1月23日  下午9:57:06
 */
@Service("userService")
public class UserServiceImpl  implements IUserService{
	
	
	@Autowired
    IPaginationDalClient dalClient;
	
	
	/**
	 * 【功能说明】：得到商家联系
	 * 
	 * @author v_wanchanghuang
	 * @time 2015年1月24日 23:38:45
	 * @param sUser
	 * 
	 * */
	@Override
	public SuperUserVo queryUserByUIsmember(SuperUserVo webUser){
		webUser= dalClient.queryForObject("user.queryUserByUIsmember",webUser,SuperUserVo.class);
		return webUser;
	}
	
	
	
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

	/**
	 * [功能说明]:查询所有用户
	 * 
	 * @time 2015年3月27日 23:20:29
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public PaginationResult<List<SuperUserVo>> queryQuestionnairesPage(
			SuperUserVo vo, Pagination pagination) {
		
		PaginationResult<List<SuperUserVo>> result = dalClient.queryForList("user.queryUserByAll", vo,SuperUserVo.class, pagination);
        return result;
	}

	/**
	 * [功能说明]:【功能说明】：用户管理 - 修改跳转
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public SuperUserVo queryUserByid(SuperUserVo sUser) {
		return dalClient.queryForObject("user.queryUserById", sUser,SuperUserVo.class);
	}


	/**
	 * [功能说明]:【功能说明】：用户管理 - 修改
	 * 
	 * @time 2015年4月16日 15:39:46
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public void updateUserById(User vo) {
		dalClient.execute("user.updateUserById", vo);
		
	}

	

	/**
	 * [功能说明]:【功能说明】：用户管理 - 删除
	 * 
	 * @time 2015年4月16日 15:39:46
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public String deleteUserById(final String ids) {
		dalClient.getTransactionTemplate().execute(new CallBackTemplate<Integer>() {
            @Override
            public Integer invoke() {
              String strs =ids.substring(0, ids.length()-1);
              String str[]=strs.split(",");
              User us=new User();
              for(int i=0;i<str.length;i++){
            	  String idt=str[i];
            	  us.setId(Integer.parseInt(idt));
            	  //删除
            	  dalClient.execute("user.deleteUserById", us);
              }
               return null;
           }
        });
        return null;
	}


	/**
	 * [功能说明]:【功能说明】：用户管理 - 添加
	 * 
	 * @time 2015年4月16日 15:39:46
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public void addUserById(User vo) {
		dalClient.persist(vo);
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}

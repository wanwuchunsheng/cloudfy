/**
 * 
 */
package com.cloudfy.service.web;

import java.util.List;

import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.User;

/**
 * @author v_wanchanghuang
 *
 * @version 2015年1月23日  下午9:56:51
 */
public interface IUserService {
	
	//登录验证
	SuperUserVo queryUserByObj(SuperUserVo sUser);
	
	//商家联系信息
	com.cloudfy.model.web.SuperUserVo queryUserByUIsmember(SuperUserVo webUser);
	
	//查询所有用户
	PaginationResult<List<SuperUserVo>> queryQuestionnairesPage(SuperUserVo vo,Pagination pagination);
	
	//查询所有用户
	SuperUserVo queryUserByid(SuperUserVo sUser);
	
	//修改 -查询
	void updateUserById(User vo);
	
	//删除
    String deleteUserById(String ids);
    
    //修改
  	void addUserById(User vo);
	
	
}

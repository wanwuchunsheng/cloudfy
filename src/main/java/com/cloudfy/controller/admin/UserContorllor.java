/**
 * 用户管理
 * 2015年5月16日 23:03:404
 * 
 */
package com.cloudfy.controller.admin;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.cloudfy.model.page.DataTableRequest;
import com.cloudfy.model.page.DataTableResponse;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.User;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.web.IUserService;



/**
 * @author v_wanchanghuang
 *
 * @version 2015年1月23日  下午9:53:27
 */
@Controller
@RequestMapping("/userContorllor")
public class UserContorllor{
	
	/**
	 * 后端调用
	 * 
	 * */
	@Autowired
	private IUserService userService;
	


	/**
	 * [功能说明]：后端 登录页面
	 * 
	 * @time 2015年4月13日 15:05:53
	 * @param page -返回的静态页面路径
	 * 
	 * */
	@RequestMapping("/getLoginHdPagePath")
	public String getLoginHdPagePath(){
		
		return "/web_data/main/login";
	}
	
	/**
     * 功能说明：后端 - 用户名密码登录验证
     * @author v_wanchanghuang
     * @param  1-成功   2-失败
     * @time  2015年3月27日 17:52:02
     *  
     * */
	@RequestMapping("/userLogin")
	@ResponseBody
	public String userLogin(HttpSession session, SuperUserVo sUser){
		//清除左右空格
		String uname=sUser.getuName().trim();
		String upassword=sUser.getuPassword().trim();
		sUser.setuName(uname);
		sUser.setuPassword(upassword);
		//查询
		SuperUserVo user=userService.queryUserByObj(sUser);
		//判断返回 1-存在   2-不存在
		if(user!=null){
			//存储 用户登录信息
			session.setAttribute("user", user);
			return Constants.RESULT_SUCESS;
		}else{
			return Constants.RESULT_ERROR;
		}
	}

	
	/**
	 * [功能说明]：公用静态页面跳转
	 * 
	 * @time 2015年3月27日 23:11:24
	 * @param page -返回的静态页面路径
	 * 
	 * */
	@RequestMapping("/getResultPagePath")
	public String getResultPagePath(String page){
		
		return page;
	}
	
	
	/**
	 * [功能说明]：用户管理  -查询列表 
	 * 
	 * @time 2015年3月27日 23:11:24
	 * @param page -返回的静态页面路径
	 * 
	 * */
	@RequestMapping("/queryUserListPage")
    @ResponseBody
    public DataTableResponse<SuperUserVo> queryQuestionnairePage(SuperUserVo vo, DataTableRequest dataTable) {
        // 设置分业参数
        Pagination pagination = new Pagination(dataTable.getiDisplayLength(), dataTable.getCurrentPage());
        PaginationResult<List<SuperUserVo>> paginationResult = userService.queryQuestionnairesPage(vo,pagination);
        return new DataTableResponse<SuperUserVo>(dataTable.getsEcho(), paginationResult);
    }
	
	
	/**
	 * [功能说明]:【功能说明】：用户管理 - 跳转 修改界面
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/updateQueryUserById")
    public String updateQueryUserById(Model model,SuperUserVo vo) {
        SuperUserVo upUser = userService.queryUserByid(vo);
        model.addAttribute("upUser", upUser);
        return "web_data/user/user_query_update";
    }
	
	
	/**
	 * [功能说明]:【功能说明】：用户管理 - 保存 修改
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-成功   2-失败
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/updateUserById")
	@ResponseBody
    public String updateUserById(User vo,HttpServletRequest request) {
		try {
			userService.updateUserById(vo);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			return Constants.RESULT_ERROR;
		}
       
    }
	
	/**
	 * [功能说明]:【功能说明】：用户管理 - 删除
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-成功   2-失败
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/deleteUserById")
	@ResponseBody
    public String deleteUserById(Model model,String ids) {
		try {
			userService.deleteUserById(ids);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			return Constants.RESULT_ERROR;
		}
       
    }
	
	
	/**
	 * [功能说明]:【功能说明】：用户管理 - 跳转 添加
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/addUserByObj")
    public String addUserByObj(Model model) {

       return "web_data/user/user_query_add";
    }
	
	/**
	 * [功能说明]:【功能说明】：用户管理 - 保存 添加
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/addUserById")
	@ResponseBody
    public String addUserById(HttpSession session,Model model,User vo) {
		try {
			//创建时间，修改时间，创建人，创建人ID
			//User t=(User) session.getAttribute("user");
			vo.setuUpdateTime(new Date());
			vo.setuCreateTime(new Date());
			userService.addUserById(vo);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			return Constants.RESULT_ERROR;
		}
    }
	
	
	
	

}

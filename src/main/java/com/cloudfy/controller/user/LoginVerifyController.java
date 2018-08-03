package com.cloudfy.controller.user;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.cloudfy.model.page.DataTableRequest;
import com.cloudfy.model.page.DataTableResponse;
import com.cloudfy.model.usr.SysUserInfo;
import com.cloudfy.service.usr.ISysUserService;
/**
 * 功能说明：页面登录
 *    用户相关信息
 * @author wch
 * */
@Controller
@RequestMapping("/web")
public class LoginVerifyController {
	
	Logger log=Logger.getLogger(this.getClass());
	
	@Autowired
	ISysUserService sysUserService;

	/**
	 * 说明：进入登录页面
	 * @author Administrator
	 * */
	@RequestMapping("index")
	public String gotoLoginPage(String url){
		
		return "/web_data/main/"+url;
	}
	
	/**
	 * 说明：登录验证
	 * 
	 * */
	@RequestMapping("verifyUser")
	@ResponseBody
	public boolean verifyUser(HttpSession session,HttpServletRequest request, SysUserInfo bean){
		try {
			//登录验证
			SysUserInfo userInfo= sysUserService.verifyUser(bean);
			//查询fix_code
			session.setAttribute("fixCode", sysUserService.querySysFixCode());
			//存储登录信息
			session.setAttribute("userInfo", userInfo);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR:登录验证失败！！！");
		}
		return false;
	}
	
	/**
	 * 说明：跳转主界面
	 * @author Administrator
	 * 
	 * */
	@RequestMapping("main")
	public String gotoIndex(HttpSession session,HttpServletRequest request, SysUserInfo bean){
		try {
			//查询左边菜单
			request.setAttribute("sysResourceList", sysUserService.querySysResource(bean));
			return "/web_data/main/index";
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR:登录验证失败！！！");
		}
		return "/web_data/main/login";
	}
	
	
	
	/**
	 * 说明：跳转到用户页面
	 * @author Administrator
	 * 
	 * */
	@RequestMapping("gotoQueryUserPage")
	public String gotoQueryUserPage(HttpSession session,HttpServletRequest request, SysUserInfo bean){
		try {
			//验证是否已登录
			SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
			if(userInfo!=null){
				return "/web_data/user/user_query_list"; //跳转用户页面
			}else{
				return "/web_data/main/login"; //跳转登录页面
			}
		} catch (Exception e) {
			log.error("ERROR:登录页面跳转失败！！！");
		}
		return "/web_data/error/405"; //跳转错误页面
	}
	/**
	 * 说明：用户管理
	 * @author Administrator
	 * 
	 * */
	@RequestMapping("querySysUserAll")
	@ResponseBody
	public DataTableResponse<SysUserInfo> querySysUserAll( HttpSession session,SysUserInfo bean,DataTableRequest dataTable) {
		try {
			//登录验证
			SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
			if(userInfo!=null){
				bean.setDpnum(userInfo.getDpnum());
				// 设置分业参数
		        Pagination pagination = new Pagination(dataTable.getiDisplayLength(), dataTable.getCurrentPage());
		        PaginationResult<List<SysUserInfo>> paginationResult = sysUserService.querySysUserAll(bean,pagination);
		        return new DataTableResponse<SysUserInfo>(dataTable.getsEcho(), paginationResult);
			}
		} catch (Exception e) {
			log.error("ERROR:查询用户失败！！！");
		}
		return null;
		
		
    }
	
	
	
	
	
}

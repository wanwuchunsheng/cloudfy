package com.cloudfy.controller.sys;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloudfy.model.page.DataTableRequest;
import com.cloudfy.model.page.DataTableResponse;
import com.cloudfy.model.sys.SysUserInfo;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.sys.ISysUserService;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
/**
 * 用户管理
 * 
 * */
@Controller
@RequestMapping("/web/user")
public class SysUserController {
	
    Logger log=Logger.getLogger(this.getClass());
	
	@Autowired
	ISysUserService sysUserService;


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
	 * 说明：用户管理 - 查询所有
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
	


	/**
	 * [功能说明]:【功能说明】：用户管理 - 跳转 添加
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/gotoAddUserPage")
    public String addUserByObj(Model model) {
       return "web_data/user/user_query_add";
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
    public String updateQueryUserById(HttpServletRequest request, SysUserInfo vo) {
		SysUserInfo sysUser=sysUserService.querySysUserById(vo);
        //通过ID查询用户 
		request.setAttribute("sysUser",sysUser ); 
        return "web_data/user/user_query_update";
    }
	
	/**
	 * [功能说明]:【功能说明】：用户管理 - 添加/修改
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/addUserById")
	@ResponseBody
    public String addUserById(HttpSession session,Model model,SysUserInfo vo) {
		try {
			//获得登录信息
			SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
			vo.setCreateTime(new Date());
			vo.setUpdateTime(new Date());
			vo.setCreateUserId(userInfo.getId());
			vo.setUpdateUserId(userInfo.getId());
			vo.setDpnum(userInfo.getDpnum());
			sysUserService.addUserById(vo);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			return Constants.RESULT_ERROR;
		}
    }
	
	/**
	 * [功能说明]:【功能说明】：用户管理 - 添加/修改
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/updateUserById")
	@ResponseBody
    public String updateUserById(HttpSession session,Model model,SysUserInfo vo) {
		try {
			//获得登录信息
			SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
			vo.setCreateTime(new Date());
			vo.setUpdateTime(new Date());
			vo.setCreateUserId(userInfo.getId());
			vo.setUpdateUserId(userInfo.getId());
			vo.setDpnum(userInfo.getDpnum());
			sysUserService.updateUserById(vo);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			return Constants.RESULT_ERROR;
		}
    }
	
	
	
	
}

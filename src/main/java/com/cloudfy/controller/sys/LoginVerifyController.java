package com.cloudfy.controller.sys;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloudfy.model.sys.SysUserInfo;
import com.cloudfy.service.sys.ISysUserService;
/**
 * 功能说明：页面登录
 *    用户相关信息
 * @author wch
 * */
@Controller
@RequestMapping("/login")
public class LoginVerifyController {
	
	Logger log=Logger.getLogger(this.getClass());
	
	@Autowired
	ISysUserService sysUserService;

	/**
	 * 说明：进入登录页面
	 * @author Administrator
	 * */
	@RequestMapping("main")
	public String gotoLoginPage(String url){
		
		return "/web_data/main/"+url;
	}
	
	/**
	 * 说明：进入登录页面
	 * @author Administrator
	 * */
	@RequestMapping("index")
	public String gotoLoginPage(){
		
		return "/web_data/main/login";
	}
	
	/**
	 * 说明：错误页面跳转
	 * @author Administrator
	 * */
	@RequestMapping("error")
	public String gotoErrorPage(String url){
		return url;
	}
	
	/**
	 * 说明：登录验证
	 * 
	 * */
	@RequestMapping("verifyUser")
	@ResponseBody
	public String verifyUser(HttpSession session,HttpServletRequest request, SysUserInfo bean){
		try {
			//登录验证
			SysUserInfo userInfo= sysUserService.verifyUser(bean);
			//查询fix_code
			//session.setAttribute("fixCode", sysUserService.querySysFixCode());
			//存储登录信息
			session.setAttribute("userInfo", userInfo);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR:登录验证失败！！！");
		}
		return "false";
	}
	
}

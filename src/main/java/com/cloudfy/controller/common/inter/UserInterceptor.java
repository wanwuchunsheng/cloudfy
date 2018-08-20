package com.cloudfy.controller.common.inter;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.cloudfy.model.sys.SysUserInfo;
import com.sun.corba.se.impl.orbutil.closure.Constant;
/**
 * 拦截器
 * 
 * */
public class UserInterceptor implements HandlerInterceptor{

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		HttpSession session=request.getSession();
		SysUserInfo userInfo= (SysUserInfo) session.getAttribute("userInfo");
		//System.out.println("进入拦截器:"+userInfo);
		if(userInfo!=null){
			return true;
		}
		//失败重定向
	    PrintWriter out = response.getWriter();
	    out.println("<html>");    
	    out.println("<script>");    
	    out.println("window.open ('"+request.getContextPath()+"/login/index','_top')");    
	    out.println("</script>");    
	    out.println("</html>");  
		return false;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

}

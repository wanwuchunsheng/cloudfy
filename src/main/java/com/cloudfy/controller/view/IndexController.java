package com.cloudfy.controller.view;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 前端Index页面
 * 
 * */
@Controller
@RequestMapping("/view")
public class IndexController {
	
	/**
	 * 说明：index页面
	 * @author Administrator
	 * @createTime 2018年6月11日22:48:33
	 * */
	@RequestMapping("index")
	public String gotoQueryNavPage(HttpSession session, HttpServletRequest request){
		
		return "/web_view/index";
	}

}

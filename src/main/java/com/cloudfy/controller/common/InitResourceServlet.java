package com.cloudfy.controller.common;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import org.apache.log4j.Logger;

import com.cloudfy.service.common.Constants;
import com.cloudfy.service.phone.IPhoneService;

/**
 * 服务器启动时，访问数据库，加载所有实例化信息到静态类中
 * <li>@author Leejean
 * <li>@create 2014-7-5下午09:18:48
 */
@WebServlet("/InitResourceServlet")
public class InitResourceServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private Logger log = Logger.getLogger(this.getClass());
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InitResourceServlet() {
        super();
    }

	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		IPhoneService comboboxs=ApplicationContextUtil.getBean(IPhoneService.class);
		comboboxs.initCommodityNavInfo();
		log.info("初始化数据成功！！");
//		//查询分类
//		comboboxs.queryCommodityNav();
//		//查询明细
//		comboboxs.queryCommodityInfo();
//		//查询幻灯片
//		comboboxs.queryChangePic();
	}

}

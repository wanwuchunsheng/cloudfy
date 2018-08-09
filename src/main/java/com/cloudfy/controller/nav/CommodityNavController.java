package com.cloudfy.controller.nav;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.CommondityNav;
import com.cloudfy.model.page.DataTableRequest;
import com.cloudfy.model.page.DataTableResponse;
import com.cloudfy.model.sys.SysUserInfo;
import com.cloudfy.service.nav.ICommodityNavSerivce;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.ibm.framework.web.controller.BaseController;

/**
 * 说明：商品类型 
 * @author Administrator
 * */
@Controller
@RequestMapping("/web/typ")
public class CommodityNavController extends BaseController{
	
	Logger log=Logger.getLogger(this.getClass());
	
	@Autowired
	ICommodityNavSerivce commodityNavService;

	
	/**
	 * 说明：商品类型-左导航跳转 
	 * @author Administrator
	 * @createTime 2018年6月11日22:48:33
	 * */
	@RequestMapping("gotoQueryNavPage")
	public String gotoQueryNavPage(HttpSession session, HttpServletRequest request){
		
		return "/web_data/typ/typ_query_list";
	}
	
	/**
	 * 说明：商品类型-集合查询
	 * @author Administrator
	 * @createTime 2018年6月11日22:48:33
	 * */
	@RequestMapping("queryNavPage")
	@ResponseBody
	public DataTableResponse<CommondityNav> queryNavPage(HttpSession session, DataTableRequest dataTable,CommondityInfo bean){
		try {
			SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
			bean.setDpnum(userInfo.getDpnum());
			Pagination pagination = new Pagination(dataTable.getiDisplayLength(), dataTable.getCurrentPage());
	        PaginationResult<List<CommondityNav>> paginationResult = commodityNavService.queryNavPage(bean,pagination);
	        return new DataTableResponse<CommondityNav>(dataTable.getsEcho(), paginationResult);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR:查询商品详细异常!!!");
		}
		return null;
	}
	
	


}

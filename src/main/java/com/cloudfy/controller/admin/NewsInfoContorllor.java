/**
 * 说明：新闻信息管理
 * 时间：2015年5月19日 17:51:00
 * 
 */
package com.cloudfy.controller.admin;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.cloudfy.model.common.SysFixCode;
import com.cloudfy.model.page.DataTableRequest;
import com.cloudfy.model.page.DataTableResponse;
import com.cloudfy.model.web.NewsInfo;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.common.ICommonService;
import com.cloudfy.service.web.INewsInfoService;


/**
 * @author v_wanchanghuang
 *
 * @time 2015年5月16日 08:31:13
 */
@Controller
@RequestMapping("/newsInfo")
public class NewsInfoContorllor{
	
	/**
	 * web dal
	 * 
	 * */
	@Autowired
	private INewsInfoService newsInfoService;
	
	@Autowired
	private ICommonService commonService;
	
	
	
	
	/**
	 * 【功能说明】：新闻管理  - 信息列表
	 * 
	 * @author v_wanchanghuang
	 * @time 2015-4-7 15:42:42
	 * 
	 * */
	@RequestMapping("/queryNewsInfoListPage")
    @ResponseBody
    public DataTableResponse<NewsInfo> queryNewsInfoListPage(NewsInfo vo, DataTableRequest dataTable) {
        // 设置分业参数
        Pagination pagination = new Pagination(dataTable.getiDisplayLength(), dataTable.getCurrentPage());
        PaginationResult<List<NewsInfo>> paginationResult = newsInfoService.queryNewsInfoListPage(vo,pagination);
        return new DataTableResponse<NewsInfo>(dataTable.getsEcho(), paginationResult);
    }
	
	
	/**
	 * 【功能说明】：新闻管理  - 删除
	 * 	  
	 * @author v_wanchanghuang
	 * @time 2015-4-7 15:42:42
	 * 
	 * */
	@RequestMapping("/deleteNewsInfoById")
	@ResponseBody
    public String deleteNewsInfoById(Model model,String ids) {
		try {
			newsInfoService.deleteNewsInfoById(ids);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			return Constants.RESULT_ERROR;
		}
       
    }
	
	
	
	
	/**
	 * [功能说明]: 新闻管理 - 跳转 修改界面
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/queryNewsInfoById")
    public String queryNewsInfoById(Model model,NewsInfo vo) {
		NewsInfo newsInfo = newsInfoService.queryNewsInfoById(vo);
        model.addAttribute("newsInfo", newsInfo);
        List<SysFixCode> fixdCode1002= commonService.queryFixCodeByCodeList(Constants.FIXCODE_1002);
        model.addAttribute("fixdCode1002",fixdCode1002);
        return "web_data/news/news_query_update";
    }
	
	
	/**
	 * [功能说明]:新闻管理- 保存 修改
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-成功   2-失败
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/updateNewsInfoById")
	@ResponseBody
    public String updateNewsInfoById(NewsInfo vo,HttpServletRequest request) {
		try {
			 //获得当前用户信息
			SuperUserVo user=  (SuperUserVo) request.getSession().getAttribute("user"); 
			vo.setUpdateUser(user.getuNickname());
            vo.setUpdateUserId(user.getId());
            vo.setUpdateTime(new Date());
			newsInfoService.updateNewsInfoById(vo);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			return Constants.RESULT_ERROR;
		}
       
    }
	
	
	/**
	 * [功能说明]: 新闻管理 - 增加 跳转
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/addNewsInfoFjdByObj")
    public String addNewsInfoFjdByObj(Model model,NewsInfo vo) {
		List<SysFixCode> fixdCode1002= commonService.queryFixCodeByCodeList(Constants.FIXCODE_1002);
        model.addAttribute("fixdCode1002",fixdCode1002);
        return "web_data/news/news_query_add";
    }
	
	
	/**
	 * [功能说明]: 新闻管理 - 增加 保存
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/saveNewsInfoFjdByObj")
	@ResponseBody
    public String saveNewsInfoFjdByObj(Model model,NewsInfo vo,HttpServletRequest request) {
		try {
			//获得时间
            Date time= new Date();
            vo.setCreateTime(time);
            vo.setUpdateTime(time);
            //获得当前用户信息
            SuperUserVo user=  (SuperUserVo) request.getSession().getAttribute("user"); 
            vo.setCreateUser(user.getuName());
            vo.setCreateUserId(user.getId());
            vo.setUpdateUser(user.getuNickname());
            vo.setUpdateUserId(user.getId());
            //初始默认购买数，收藏数为0；
            //vo.setIsPass(Constants.ISPASS_DSH); //2-待审核
            vo.setScNumber(0); 
            vo.setFxNumber(0);
            vo.setReadNumber(0);
			newsInfoService.saveNewsInfoObj(vo);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			return Constants.RESULT_ERROR;
		}
    }
	

}

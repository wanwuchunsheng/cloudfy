/**
 * 说明：web导航菜单
 * 时间：2015年5月16日 08:32:55
 * 
 */
package com.cloudfy.controller.admin;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.WebMenu;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.common.ICommonService;
import com.cloudfy.service.web.INavigtionService;


/**
 * @author v_wanchanghuang
 *
 * @time 2015年5月16日 08:31:13
 */
@Controller
@RequestMapping("/data")
public class NavigationContorllor{
	
	/**
	 * web dal
	 * 
	 * */
	@Autowired
	private INavigtionService navigtionService;
	
	
	@Autowired
	private ICommonService commonService;
	
	
	
	/**
	 * 商品管理  -  首页跳转
	 * 
	 * 
	 * */
	@RequestMapping("/description")
    public String loadDescription(Model model) {
		Integer codeType= Constants.FIXCODE_1001;
		List<SysFixCode> listFixCodeList= commonService.queryFixCodeByCodeList(codeType);
		model.addAttribute("listFixCodeList", listFixCodeList);
        return "web_data/description/description_query_list";
    }
	
	/**
	 * 【功能说明】：后端 - 登陆
	 * 
	 * @author v_wanchanghuang
	 * @time 2015-4-7 15:42:42
	 * 
	 * */
	@RequestMapping("/login")
	public String loadLogin( Model model){
		return "web_data/main/login";
	}
	
	/**
	 * 【功能说明】：后端 - 首页
	 * 
	 * @author v_wanchanghuang
	 * @time 2015-4-7 15:42:42
	 * 
	 * */
	@RequestMapping("/index")
	public String loadIndex( Model model,HttpServletRequest request){
		//获得当前用户信息
        SuperUserVo user=  (SuperUserVo) request.getSession().getAttribute("user"); 
		if(user==null){
			return "web_data/main/login";
		}
		return "web_data/main/index";
	}
	
	
	
	
	/**
	 * [功能说明]：通用页面跳转
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
     * 功能说明：后端 - 登录验证
     * @author v_wanchanghuang
     * @param  1-成功   2-失败
     * @time  2015年3月27日 17:52:02
     *  
     * */
	@RequestMapping("/queryUserByObj")
	@ResponseBody
	public String queryUserByObj(HttpSession session, SuperUserVo sUser){
		//清除左右空格
		String uname=sUser.getuName().trim();
		String upassword=sUser.getuPassword().trim();
		sUser.setuName(uname);
		sUser.setuPassword(upassword);
		//查询
		SuperUserVo user=navigtionService.queryUserByObj(sUser);
		//判断返回 1-存在   2-不存在
		if(user!=null){
			//存储 用户登录信息
			session.setAttribute("user", user);
			return Constants.RESULT_SUCESS;
		}else{
			return Constants.RESULT_ERROR;
		}
	}
	
	

/********** web菜单start  **********************************************************************************************/
	
	/**
	 * [功能说明]: 菜单-列表
	 * 
	 * @time 2015年4月17日 11:25:52
	 * @author v_wanchanghuang
	 *  
	 * */
	@RequestMapping("/queryNavitionListPage")
    @ResponseBody
    public DataTableResponse<WebMenu> queryQuestionnairePage(WebMenu vo, DataTableRequest dataTable) {
        // 设置分业参数
        Pagination pagination = new Pagination(dataTable.getiDisplayLength(), dataTable.getCurrentPage());
        PaginationResult<List<WebMenu>> paginationResult = navigtionService.queryNavitionListPage(vo,pagination);
        return new DataTableResponse<WebMenu>(dataTable.getsEcho(), paginationResult);
    }
	
	
	/**
	 * [功能说明]:【功能说明】：查询导航菜单-修改查询
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/queryNavigationById")
    public String queryNavigationById(Model model,WebMenu vo) {
		WebMenu upNavition = navigtionService.queryNavigationById(vo);
        model.addAttribute("upNavition", upNavition);
        return "web_data/navigation/navigation_query_update";
    }
	
	
	/**
	 * [功能说明]:【功能说明】：导航菜单 - 保存 修改
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-成功   2-失败
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/updateNavigationById")
	@ResponseBody
    public String updateNavigationById(HttpServletRequest request,  WebMenu vo) {
		try {
			//获得当前用户信息
	        SuperUserVo user=  (SuperUserVo) request.getSession().getAttribute("user"); 
	        vo.setUpdateUser(user.getuNickname());
			navigtionService.updateNavigationById(vo);
			 return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			// TODO: handle exception
			return Constants.RESULT_ERROR;
		}
       
    }
	
	/**
	 * [功能说明]:【功能说明】：导航菜单- 删除
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-成功   2-失败
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/deleteNavigationById")
	@ResponseBody
    public String deleteNavigationById(Model model,String ids) {
		try {
			navigtionService.deleteNavigationById(ids);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			// TODO: handle exception
			return Constants.RESULT_ERROR;
		}
       
    }
	
	
	/**
	 * [功能说明]:【功能说明】：导航菜单 - 跳转 添加--父节点
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-父节点    2-子节点
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/addNavigationFjdByObj")
    public String addNavigationFjdByObj(Model model,WebMenu webm) {
		model.addAttribute("webm",webm);
       return "web_data/navigation/navigation_query_add";
    }
	
	/**
	 * [功能说明]:【功能说明】：导航菜单 - 跳转 添加--子节点
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-父节点    2-子节点
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/addNavigationZjdByObj")
    public String addNavigationZjdByObj(Model model,WebMenu webm) {
		model.addAttribute("webm",webm);
       return "web_data/navigation/navigation_query_add";
    }
	
	
	
	
	
	/**
	 * [功能说明]:【功能说明】：导航菜单 - 保存  添加-父节点
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/addNavigationFzObjct")
	@ResponseBody
    public String addNavigationFzObjct(HttpServletRequest request,Model model,WebMenu vo) {
		try {
			vo.setUpdateTime(new Date());
			vo.setCreateTime(new Date());
			//获得当前用户信息
	        SuperUserVo user=  (SuperUserVo) request.getSession().getAttribute("user"); 
	        vo.setUpdateUser(user.getuNickname());
	        vo.setCreateUser(user.getuNickname());
			vo.setIsFaz(0);
			vo.setCode(0); 
			vo.setIsDelete(0);
			navigtionService.addNavigationFzObjct(vo);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			e.printStackTrace();
			return Constants.RESULT_ERROR;
		}
    }
	
	
	/**
	 * [功能说明]:【功能说明】：导航菜单 - 保存  添加-子节点
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/addNavigationZjObjct")
	@ResponseBody
    public String addNavigationZjObjct(HttpServletRequest request,Model model,WebMenu vo) {
		try {
			//获得当前用户信息
	        SuperUserVo user=  (SuperUserVo) request.getSession().getAttribute("user"); 
	        vo.setUpdateUser(user.getuNickname());
	        vo.setCreateUser(user.getuNickname());
			// 1)修改根节点状态，2）添加子节点
			navigtionService.updorAddNavigation(vo);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			e.printStackTrace();
			return Constants.RESULT_ERROR;
		}
    }
	
	
	/**
	 * [功能说明]:页面新闻编辑器上传图片
	 * 
	 * @author Administrator
	 * @time 2015年5月24日 15:51:50
	 * 
	 * */
	@RequestMapping("/editor")
    public void saveEditorImg(HttpServletRequest request,HttpServletResponse response,Model model) {
		try {

		

			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
    }
	

}

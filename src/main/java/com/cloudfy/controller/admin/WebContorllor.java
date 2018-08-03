/**
 * 说明：控制查询 web页的所有数据
 * 时间：2015年5月16日 08:32:55
 * 
 */
package com.cloudfy.controller.admin;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cloudfy.model.common.SysFixCode;
import com.cloudfy.model.page.WebPage;
import com.cloudfy.model.web.CpDescription;
import com.cloudfy.model.web.NewsInfo;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.WebBottomType;
import com.cloudfy.model.web.WebCategory;
import com.cloudfy.model.web.WebMenu;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.common.ICommonService;
import com.cloudfy.service.web.IDescriptionService;
import com.cloudfy.service.web.INewsInfoService;
import com.cloudfy.service.web.IWebService;


/**
 * @author v_wanchanghuang
 *
 * @time 2015年5月16日 08:31:13
 */
@Controller
@RequestMapping("/web2")
public class WebContorllor{
	
	/**
	 * web dal
	 * 
	 * */
	@Autowired
	private IWebService webService;
	
	@Autowired
	private ICommonService commonService;
	
	//商品
	@Autowired
	private IDescriptionService descriptionSercvice;
	
	//新闻
	@Autowired
	private INewsInfoService newsInfoService;
	
	
	/**
	 * 功能说明]：产品详细
	 * 
	 * @time 2015年5月20日 21:26:43
	 * @author v_wanchanghuang
	 *  
	 * */
	@RequestMapping("/des_detail")
	public String loadDesDetail( Model model,CpDescription vo){
		//导航菜单，底部数据
		getMenuAndBottomResult(model);
		//主键查询信息
		CpDescription description=descriptionSercvice.queryDescriptionById(vo);
		model.addAttribute("description", description);
		return "web_views/menu_detail_info";
	}
	
	/**
	 * 功能说明]：新闻明细
	 * 
	 * @time 2015年5月20日 21:26:43
	 * @author v_wanchanghuang
	 *  
	 * */
	@RequestMapping("/news_detail")
	public String loadNewsDetail( Model model,NewsInfo vo){
		//导航菜单，底部数据
		getMenuAndBottomResult(model);
		//修改新闻的阅读量，收藏量，分享量
		vo.setReadNumber(1);
		newsInfoService.updateNewsInfoByNumber(vo);
		NewsInfo newsInfo=newsInfoService.queryNewsInfoById(vo);
		model.addAttribute("newsInfo", newsInfo);
		return "web_views/menu_news_info";
	}
	
	
	/**
	 * [功能说明]：web - 导航菜单，底部列表 
	 * 
	 * @author v_wanchanghuang
	 * @time 2015年5月16日 19:38:16
	 * 
	 * */
	public void getMenuAndBottomResult(Model model){
		//查询web菜单
		List<WebMenu> webMenuList= webService.queryWebMenuByAll();
		model.addAttribute("webMenuList", webMenuList);
		//查询底部里列表
		List<WebBottomType> bottomTypeList=webService.queryWebBottomTypeListByAll();
		model.addAttribute("bottomTypeList", bottomTypeList);
	}
	
	/**
	 * 【功能说明】：web - 首页
	 * 
	 * @author v_wanchanghuang
	 * @time 2015-4-7 15:42:42
	 * 
	 * */
	@RequestMapping("/index")
	public String loadIndex( Model model){
		//菜单，底部公用方法
		getMenuAndBottomResult(model);
		
		//中间大分类
		List<WebCategory> categoryList=webService.queryWebcategoryByAll();
		model.addAttribute("categoryList", categoryList);
		
		//产品信息 3幻灯片
		List<CpDescription> cpDescriptionHdList=webService.queryCpDescriptionByAll(Constants.RESULT_HDP);
		model.addAttribute("cpDescriptionHdList", cpDescriptionHdList);
		//产品信息 4热卖产品
		List<CpDescription> cpDescriptionRemList=webService.queryCpDescriptionByAll(Constants.RESULT_RMSP);
		model.addAttribute("cpDescriptionRemList", cpDescriptionRemList);
		//产品信息 5站内推荐
		List<CpDescription> cpDescriptionZneiList=webService.queryCpDescriptionByAll(Constants.RESULT_DNTJ);
		model.addAttribute("cpDescriptionZneiList", cpDescriptionZneiList);
		
		//返回主页面
		return "web_views/main_web";
	}
	
	
	/**
	 * [功能说明]：web - 简介
	 * 
	 * @time 2015年3月27日 23:11:24
	 * @param page -返回的静态页面路径
	 * 
	 * */
	@RequestMapping("/about")
	public String loadAbout(Model model,WebPage wp,Map<String,Integer> map){
		map.put("index",Constants.ABOUT_INDEX); //起始页0
		map.put("size",Constants.ABOUT_SIZE); //每页7条
		map.put("isPass", Constants.ISPASS_YFB); // 1-已发布
		
		//查询右边新闻列表
		List<NewsInfo> newsInfoList=webService.queryWebNewsInfoByAll(map);
		model.addAttribute("newsInfoList", newsInfoList);
		//简介
		NewsInfo webNewsInfo=webService.queryWebNewsInfoByType(Constants.ISPASS_ABOUT); // isPass 4 简介
		model.addAttribute("webNewsInfo", webNewsInfo);
		
		//菜单，底部公用方法
		getMenuAndBottomResult(model);

		return "web_views/menu_about_web";
	}
	
	
	/**
	 * [功能说明]：web 在线商城 - 商品
	 * 
	 * @time 2015年3月27日 23:11:24
	 * @param  1-沙发   2-十字绣    3-幻灯片   4-热卖产品  5-店内推荐
	 * 
	 * */
	@RequestMapping("/sc")
	public String loadZpsf(Model model,WebPage wp,Map<String,Integer> map,Integer cpTag){
		map.put("cpTag", cpTag);
		//商品可用状态 1-可用  2-不可用
		map.put("cpStatus", Constants.RESULT_STATUS_Y);
		Integer index=wp.getIndex();
		Integer size=wp.getSize();
		//分页参数设置
		map.put("index",index*size);
		map.put("size",size);
		//得到商品总数
		Integer count=webService.queryWebDescriptionByCount(map);
		wp.setMaxCount(count);
		
		List<CpDescription> describeTypeList=webService.queryWebDescribeByTypeToFrist(map);
		model.addAttribute("describeTypeList", describeTypeList);
		model.addAttribute("wp", wp); //保存分页对象
		model.addAttribute("cpTag", cpTag); //存储品牌标识
		
		//得到产品标题
		List<SysFixCode> fixCode1001=commonService.queryFixCodeByCodeList(Constants.FIXCODE_1001);
		for(SysFixCode fc:fixCode1001){
			if(cpTag.equals(fc.getCode())){ //code匹配，获取name
				model.addAttribute("codeName", fc.getCodeName());
				break ;
			}
		}
		
		//菜单，底部公用方法
		getMenuAndBottomResult(model);
		
		return "web_views/menu_sc_web";
	}
	
	
	/**
	 * [功能说明]：web 首页 -新闻
	 * 
	 * @time 2015年3月27日 23:11:24
	 * @param page -返回的静态页面路径  
	 * 1-已发布   3-带审核  3-审核不通过  4-简介
	 * 
	 * */
	@RequestMapping("/news")
	public String loadNews(Model model,WebPage wp,Map<String,Integer> map){
		//固定新闻10条显示
		wp.setSize(10);
		//查询已发布的新闻
		map.put("isPass", Constants.ISPASS_YFB);
		Integer index=wp.getIndex();
		Integer size=wp.getSize();
		//分页参数设置
		map.put("index",index*size);
		map.put("size",size);
		//得到商品总数
		Integer count=webService.queryWebNewsInfoByCount(map);
		wp.setMaxCount(count);
		//wp.getMaxPage();
		//查询新闻列表
		List<NewsInfo> newsInfoList=webService.queryWebNewsInfoByAll(map);
		model.addAttribute("newsInfoList", newsInfoList);
		model.addAttribute("wp", wp); //保存分页对象
		
		//菜单，底部公用方法
		getMenuAndBottomResult(model);
		
		return "web_views/menu_news_web";
	}
	
	
	/**
	 * [功能说明]：web 首页 -服务咨询
	 * 
	 * @time 2015年3月27日 23:11:24
	 * @param page -返回的静态页面路径
	 * 
	 * */
	@RequestMapping("/service")
	public String loadServicePage(Model model,SuperUserVo webUser){
		NewsInfo cjInfo=webService.queryWebNewsInfoByType(Constants.ISPASS_CALLSV); // isPass 5-咨询服务
		model.addAttribute("cjInfo", cjInfo);
		//菜单，底部公用方法
		getMenuAndBottomResult(model);
		
		return "web_views/menu_service_web";
	}
	
	
	
	

}

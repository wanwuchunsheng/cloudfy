/*
 * Copyright (C), 2018-2019, 云朵家
 * FileName: QuestionnaireController.java
 * Author: v_wanchanghuang
 * Date:    2018年9月12日10:36:33
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 * 
 */
package com.cloudfy.controller.survey;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cloudfy.controller.common.tools.StringUtil;
import com.cloudfy.model.page.DataTableRequest;
import com.cloudfy.model.page.DataTableResponse;
import com.cloudfy.model.survey.Questionnaire;
import com.cloudfy.model.survey.QuestionnaireAnswer;
import com.cloudfy.model.survey.QuestionnaireProblem;
import com.cloudfy.model.survey.QuestionnaireProblemItem;
import com.cloudfy.model.sys.SysUserInfo;
import com.cloudfy.service.survey.IQuestionnaireService;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.ibm.framework.web.controller.BaseController;

/**
 * 问卷管理<br>
 * 〈功能详细描述〉 管理:1) 问卷问题管理(增删改查), 2)问卷问题答案管理(增删改查) 3)问题与答案的关系映射
 *
 * @author v_wanchanghuang
 */
@Controller
@RequestMapping("/survey/que")
public class QuestionnaireController extends BaseController {

    @Autowired
    private IQuestionnaireService questionnaireSerivce;
    
   

    /**
     * 问卷主题-跳转列表
     *@author wanchanghuang
     * @param model
     * @createTime 2018年9月12日10:30:13
     * @return
     */
    @RequestMapping("/gotoQueManage")
    public String recordList(Model model) {
        return "/web_data/survey/questionnaire";
    }

    /**
    * 问卷管理 -问卷列表查询
    *@date 2018年9月12日11:31:49
    * @author v_wanchanghuang
    * @see [相关类/方法]（可选）
    * @since [产品/模块版本] （可选）
    */
   @RequestMapping("/queryQueManagePage")
   @ResponseBody
   public DataTableResponse<Questionnaire> queryQueManagePage(HttpSession session, Questionnaire vo, DataTableRequest dataTable) {
	   SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
	   vo.setDpnum(userInfo.getDpnum());//店铺
       // 设置分业参数
       Pagination pagination = new Pagination(dataTable.getiDisplayLength(), dataTable.getCurrentPage());
       PaginationResult<List<Questionnaire>> paginationResult = questionnaireSerivce.queryQueManagePage(vo, pagination);
       return new DataTableResponse<Questionnaire>(dataTable.getsEcho(), paginationResult);
   }
    
   /**
    * 问卷管理 （问卷列表 ）问题录入预览  
    *
    * @author v_wanchanghuang
    * @see [相关类/方法]（可选）
    * @since [产品/模块版本] （可选）
    */
   @RequestMapping("/queManageViewPage")
   public String queManageViewPage(Model model,HttpServletRequest request,Questionnaire bean) {
       //查询问卷类型
       Questionnaire que = questionnaireSerivce.queryQuestionnaireById(bean);
       model.addAttribute("que", que);
       //查询问卷问题
       List<QuestionnaireProblem> listQuePro = questionnaireSerivce.queryQuestionnaireProblem(que);
       model.addAttribute("listQuePro", listQuePro);
       //查询问卷问题选项
       List<QuestionnaireProblemItem> listQueProItem = questionnaireSerivce.queQuestionnaireItem(que);
       model.addAttribute("listQueProItem", listQueProItem);
       //查询问卷答案
       List<QuestionnaireAnswer> listAs = questionnaireSerivce.queryQuestionnaireAnswer(que);
       model.addAttribute("listAs", listAs);
       return "/web_data/survey/questionnaire_view";
   }
   
   /************************************************
    *      问卷类型
   ************************************************/
   /**
    * 功能说明：问卷类型-添加跳转
    * 
    * */
   @RequestMapping("/queManageAddPage")
   public String queManageAddPage(Model model) {
      
       return "/web_data/survey/questionnaire_add";
   }
   
   /**
    * 功能说明：问卷类型-添加保存
    * @date 2018年9月20日14:50:18
    * */
   @RequestMapping("/addQueManage")
   @ResponseBody
   public boolean addQueManage(HttpSession session, Model model,Questionnaire bean) {
	    try {
		   SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
		   bean.setBrand(1);//品牌
		   bean.setTaskCode( StringUtil.buildRandom(8));//任务编号
		   bean.setCreateUserId(userInfo.getId());
		   bean.setUpdateUserId(userInfo.getId());
		   bean.setCreateTime(new Date());
		   bean.setUpdateTime(new Date());
		   bean.setCreateUserName(userInfo.getUname());
		   bean.setUpdateUserName(userInfo.getUname());
		   bean.setDpnum(userInfo.getDpnum());
		   questionnaireSerivce.addQueManage(bean);
		   return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
	    return false;
   }
   
   /**
    * 功能说明：问卷类型-修改跳转
    * 
    * */
   @RequestMapping("/queManageUpdatePage")
   public String queManageUpdatePage(Model model,Questionnaire bean) {
       //通过ID查询
	   model.addAttribute("que",questionnaireSerivce.queryQueManageById(bean) );
       return "/web_data/survey/questionnaire_update";
   }
   
   /**
    * 功能说明：问卷类型-修改保存
    * @date 2018年9月20日14:50:18
    * */
   @RequestMapping("/updateQueManage")
   @ResponseBody
   public boolean updateQueManage(HttpSession session, Model model,Questionnaire bean) {
	    try {
		   SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
		   bean.setUpdateUserId(userInfo.getId());
		   bean.setUpdateTime(new Date());
		   bean.setUpdateUserName(userInfo.getUname());
		   questionnaireSerivce.updateQueManage(bean);
		   return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
	    return false;
   }
   
   /**
    * 功能说明：问卷类型-删除
    * @date 2018年9月20日14:50:18
    * */
   @RequestMapping("/deleteQueManage")
   @ResponseBody
   public boolean deleteQueManage(HttpSession session, Model model,Questionnaire bean) {
	    try {
		   questionnaireSerivce.deleteQueManage(bean);
		   return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
	    return false;
   }

   /************************************************
    *      问卷问题
   ************************************************/
   
   /**
    * 功能说明：问卷问题-跳转列表
    * 
    * */
   @RequestMapping("/gotoQueManageProblem")
   public String gotoQueManageProblem(Model model,Questionnaire bean) {
	   //查询设备类型
	   model.addAttribute("que", questionnaireSerivce.queryQueManageById(bean));
       return "/web_data/survey/questionnaire_problem";
   }
   
   /**
    * 问卷管理 -问卷问题-查询列表
    *@date 2018年9月12日11:31:49
    * @author v_wanchanghuang
    * @see [相关类/方法]（可选）
    * @since [产品/模块版本] （可选）
    */
   @RequestMapping("/queryQueManageProblem")
   @ResponseBody
   public DataTableResponse<QuestionnaireProblem> queryQueManageProblem(HttpSession session, QuestionnaireProblem vo, DataTableRequest dataTable) {
       // 设置分业参数
       Pagination pagination = new Pagination(dataTable.getiDisplayLength(), dataTable.getCurrentPage());
       PaginationResult<List<QuestionnaireProblem>> paginationResult = questionnaireSerivce.queryQueManageProblem(vo, pagination);
       return new DataTableResponse<QuestionnaireProblem>(dataTable.getsEcho(), paginationResult);
   }
   
   
   /**
    * 功能说明：问卷问题-添加验证
    * 
    *    （验证问题编号是否重复）
    * @author wanchanghuang
    * @date 2018年9月21日10:05:47
    * 
    * */
   @RequestMapping("/queryQuestionnaireProblemOrCode")
   @ResponseBody
   public boolean queryQuestionnaireProblemOrCode(HttpSession session,Model model,QuestionnaireProblem bean) {
	    try {
	 	   QuestionnaireProblem que=questionnaireSerivce.queryQuestionnaireProblemOrCode(bean);
	 	   if(que==null){//验证是否有查询结果，如果没有查询结果，返回true
	 		  return true;
	 	   }
		} catch (Exception e) {
			 e.printStackTrace();
		}
        return false;
   }
   
   /**
    * 功能说明：问卷问题-添加
    * @author wanchanghuang
    * @date 2018年9月21日10:05:47
    * */
   @RequestMapping("/addQuestionnaireProblem")
   @ResponseBody
   public boolean addQuestionnaireProblem(HttpSession session,Model model,QuestionnaireProblem bean) {
	    try {
	       SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
		   bean.setCreateUserId(userInfo.getId());
		   bean.setUpdateUserId(userInfo.getId());
		   bean.setCreateTime(new Date());
		   bean.setUpdateTime(new Date());
		   bean.setCreateUserName(userInfo.getUname());
		   bean.setUpdateUserName(userInfo.getUname());
		   bean.setOrderNo(1);
		   bean.setIsDict(1);
		   bean.setProblemDictCode(0);
	 	   questionnaireSerivce.addQuestionnaireProblem(bean);
	 	   return true;
		} catch (Exception e) {
			 e.printStackTrace();
		}
        return false;
   }
   
   
   /**
    * 功能说明：问卷问题-删除
    * @author wanchanghuang
    * @date 2018年9月21日10:05:47
    * */
   @RequestMapping("/deleteQueManageProblem")
   @ResponseBody
   public boolean deleteQueManageProblem(Model model,QuestionnaireProblem bean) {
	    try {
	 	   questionnaireSerivce.deleteQueManageProblem(bean);
	 	   return true;
		} catch (Exception e) {
			 e.printStackTrace();
		}
        return false;
   }
   
   /**
    * 功能说明：问卷问题-修改跳转
    * @author wanchanghuang
    * @date 2018年9月21日11:30:17
    * */
   @RequestMapping("/questionnaireProblemUpdate")
   public String questionnaireProblemUpdate(Model model,QuestionnaireProblem bean) {
	   //查询设备类型
	   model.addAttribute("quePro", questionnaireSerivce.queryQueManageProblemById(bean));
       return "/web_data/survey/questionnaire_problem_update";
   }
   
   
   /**
    * 功能说明：问卷问题-修改保存
    * @author wanchanghuang
    * @date 2018年9月21日10:05:47
    * */
   @RequestMapping("/mergeQuestionnaireProblem")
   @ResponseBody
   public boolean mergeQuestionnaireProblem( HttpSession session,Model model,QuestionnaireProblem bean) {
	    try {
	       SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
		   bean.setUpdateUserId(userInfo.getId());
		   bean.setUpdateTime(new Date());
		   bean.setUpdateUserName(userInfo.getUname());
	 	   questionnaireSerivce.mergeQuestionnaireProblem(bean);
	 	   return true;
		} catch (Exception e) {
			 e.printStackTrace();
		}
        return false;
   }
   
   /************************************************
    *      问卷答案选项
   ************************************************/
   
   /**
    * 功能说明：问卷答案-列表
    * @author wanchanghuang
    * @date 2018年9月21日11:30:17
    * */
   @RequestMapping("/questionnaireProblemItem")
   public String questionnaireProblemItem(Model model,QuestionnaireProblem bean) {
	   //查询设备类型
	   model.addAttribute("quePro", questionnaireSerivce.queryQueManageProblemById(bean));
	   //查询集合
	   model.addAttribute("listQa",questionnaireSerivce.queryQuestionnaireProblemItem(bean) );
	   //查询
       return "/web_data/survey/questionnaire_problem_item";
   }
   
   /**
    * 功能说明：问卷答案-添加
    * @author wanchanghuang
    * @date 2018年9月21日11:30:17
    * */
   @RequestMapping("/addQuestionnaireProblemItem")
   @ResponseBody
   public boolean addQuestionnaireProblemItem(HttpSession session,Model model,QuestionnaireProblemItem bean) {
	   try {
		   SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
		   bean.setCreateUserId(userInfo.getId());
		   bean.setUpdateUserId(userInfo.getId());
		   bean.setCreateTime(new Date());
		   bean.setUpdateTime(new Date());
		   bean.setCreateUserName(userInfo.getUname());
		   bean.setUpdateUserName(userInfo.getUname());
		   questionnaireSerivce.addQuestionnaireProblemItem(bean);
		   return true;
	   } catch (Exception e) {
			e.printStackTrace();
	   }
	   return false;
   }
   
   
   /**
    * 功能说明：问卷答案选项-删除
    * @author wanchanghuang
    * @date 2018年9月21日11:30:17
    * */
   @RequestMapping("/deleteQueManageProblemItem")
   @ResponseBody
   public boolean deleteQueManageProblemItem(HttpSession session,Model model,QuestionnaireProblemItem bean) {
	   try {
		   questionnaireSerivce.deleteQueManageProblemItem(bean);
		   return true;
	   } catch (Exception e) {
			e.printStackTrace();
	   }
	   return false;
   }
   
   /**
    * 功能说明：问卷答案选项-修改
    * @author wanchanghuang
    * @date 2018年9月21日11:30:17
    * */
   @RequestMapping("/updateQueManageProblemItemById")
   @ResponseBody
   public boolean updateQueManageProblemItemById(HttpSession session,Model model,QuestionnaireProblemItem bean) {
	   try {
		   questionnaireSerivce.updateQueManageProblemItemById(bean);
		   return true;
	   } catch (Exception e) {
			e.printStackTrace();
	   }
	   return false;
   }
   
   
   /**
    * 功能说明：问卷答案-列表
    * @author wanchanghuang
    * @date 2018年9月21日11:30:17
    * */
   @RequestMapping("/gotoQueManageProblemNext")
   public String gotoQueManageProblemNext(Model model,QuestionnaireProblemItem bean) {
	   //查询设备类型
	   model.addAttribute("queProItem", questionnaireSerivce.queryQueManageProblemItemById(bean));
	   //查询
       return "/web_data/survey/questionnaire_problem_item_next";
   }
   
   
   /**
    * 功能说明：问卷答案选项-映射 
    * @author wanchanghuang
    * @date 2018年9月21日11:30:17
    * */
   @RequestMapping("/questionnaireProblemItemUpdate")
   @ResponseBody
   public boolean questionnaireProblemItemUpdate(HttpSession session,Model model,QuestionnaireProblemItem bean) {
	   try {
		   questionnaireSerivce.questionnaireProblemItemUpdate(bean);
		   return true;
	   } catch (Exception e) {
			e.printStackTrace();
	   }
	   return false;
   }
}

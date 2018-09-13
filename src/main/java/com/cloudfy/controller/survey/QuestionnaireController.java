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

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
        return "/web_data/survey/questionnaire_manage";
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
       return "/web_data/survey/questionnaire_manage_view";
   }
   
   
  
   
   
   
   
   

}

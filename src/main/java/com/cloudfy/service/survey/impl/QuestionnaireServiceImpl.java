/*
 * Copyright (C), 2013-2014, 上海汽车集团股份有限公司
 * FileName: QuestionnaireService.java
 * Author:   v_wanchanghuang    
 * Date:     2014年4月16日 下午15:00:00
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package com.cloudfy.service.survey.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloudfy.model.survey.Questionnaire;
import com.cloudfy.model.survey.QuestionnaireAnswer;
import com.cloudfy.model.survey.QuestionnaireProblem;
import com.cloudfy.model.survey.QuestionnaireProblemItem;
import com.cloudfy.service.survey.IQuestionnaireService;
import com.ibm.framework.dal.client.IPaginationDalClient;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;

/**
 * 问卷管理<br>
 * 〈功能详细描述〉
 * 管理:1) 问卷问题管理(增改),问卷问题答案管理(增改)及显示
 *
 * @author v_wanchanghuang
 */
@Service("questionnaireSerivce")
public class QuestionnaireServiceImpl implements IQuestionnaireService {

    /**
     * 注入dal
     */
    @Autowired
    IPaginationDalClient dalClient;

	@Override
	public Questionnaire updateQuestionnaire(Questionnaire que) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * 功能说明： 问卷类型-查询集合
	 * @date 2018年9月12日18:01:28
	 * @author wanchanghuang
	 * */
	@Override
	public PaginationResult<List<Questionnaire>> queryQueManagePage(
			Questionnaire vo, Pagination pagination) {
		 PaginationResult<List<Questionnaire>> list = dalClient.queryForList("survey.queryQuestionnaire", vo,
	                Questionnaire.class, pagination);
		return list;
	}

	/**
	 * 功能说明：问卷类型（通过ID查询对象）
	 * @author wanchanghuang
	 * @date 2018年9月12日18:02:25
	 * */
	@Override
	public Questionnaire queryQuestionnaireById(Questionnaire bean) {
		 return dalClient.queryForObject("survey.queryQuestionnaireById", bean, Questionnaire.class);
	}

	/**
	 * 功能说明：问卷类型-查询问卷选项
	 * @author wanchanghuang
	 * @date 2018年9月12日18:02:25
	 * */
	@Override
	public List<QuestionnaireProblemItem> queQuestionnaireItem(Questionnaire bean) {
		return dalClient.queryForList("survey.queQuestionnaireItem", bean, QuestionnaireProblemItem.class);
	}

	/**
	 * 功能说明：问卷类型-查询问题列表
	 * @author wanchanghuang
	 * @date 2018年9月12日18:02:25
	 * */
	@Override
	public List<QuestionnaireProblem> queryQuestionnaireProblem(
			Questionnaire que) {
		 return dalClient.queryForList("survey.questionnaireProblem", que, QuestionnaireProblem.class);
	}

	/**
	 * 功能说明：问卷类型-查询问题选项
	 * @author wanchanghuang
	 * @date 2018年9月12日18:02:25
	 * */
	@Override
	public List<QuestionnaireAnswer> queryQuestionnaireAnswer(Questionnaire que) {
		List<QuestionnaireAnswer> result = dalClient.queryForList("survey.queryQuestionnaireAnswer", que, QuestionnaireAnswer.class);
		return result;
	}


   



}

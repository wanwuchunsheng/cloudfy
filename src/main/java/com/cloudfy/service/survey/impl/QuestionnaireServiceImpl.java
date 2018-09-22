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
import com.ibm.framework.dal.transaction.template.CallBackTemplate;

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

	/**
	 * 功能说明：问卷类型-添加
	 * 
	 * */
	@Override
	public void addQueManage(Questionnaire bean) {
		dalClient.persist(bean);
	}

	/**
	 * 功能说明：问卷类型-修改跳转
	 *  通过ID查询，对象
	 * */
	@Override
	public Questionnaire queryQueManageById(Questionnaire bean) {
		return dalClient.find(Questionnaire.class, bean);
	}

	/**
	 * 功能说明：问卷-修改
	 * @date 2018年9月20日15:02:55
	 * */
	@Override
	public String updateQueManage(final Questionnaire bean) {
		dalClient.getTransactionTemplate().execute(new CallBackTemplate<Integer>() {
        	@Override
            public Integer invoke() {
        		dalClient.dynamicMerge(bean);
        		//修改问题表，问卷名称
        		dalClient.execute("survey.updateQuestionnaireByShortName", bean);
               return null;
           }
		});
        return null;
		
	}

	/**
	 * 功能说明：问卷类型-删除 //事物
	 * @date 2018年9月20日15:02:55
	 *    
	 * */
	@Override
	public String deleteQueManage(final Questionnaire bean) {
        dalClient.getTransactionTemplate().execute(new CallBackTemplate<Integer>() {
        	@Override
            public Integer invoke() {
        		Questionnaire que=null;
        		String[] ids=bean.getIds().split(",");
        		for(int i=0;i<ids.length;i++){
        			que=new Questionnaire();
        			que.setId(Integer.parseInt(ids[i]));
        			dalClient.execute("survey.delQuestionnaire", que);
            		dalClient.execute("survey.delQuestionnaireProblem", que);
            		dalClient.execute("survey.delQuestionnaireProblemItem", que);
            		dalClient.execute("survey.delQuestionnaireAnswer", que);
        		}
               return null;
           }
		});
        return null;
	}

	/**
	 * 功能说明：问卷管理-问卷问题列表
	 * @author wanchanghuang
	 * @date 2018年9月20日20:53:59
	 * */
	@Override
	public PaginationResult<List<QuestionnaireProblem>> queryQueManageProblem(
			QuestionnaireProblem vo, Pagination pagination) {
		PaginationResult<List<QuestionnaireProblem>> list = dalClient.queryForList("survey.queryQuestionnaireProblem", vo,QuestionnaireProblem.class, pagination);
	return list;
	}

	/**
	 * 功能说明：问卷管理-问卷问题添加
	 * @author wanchanghuang
	 * @date 2018年9月20日20:53:59
	 * */
	@Override
	public void addQuestionnaireProblem(QuestionnaireProblem bean) {
	    dalClient.persist(bean);
	}

	/**
    * 功能说明：问卷问题-添加
    * 
    *    （验证问题编号是否重复）
    * @author wanchanghuang
    * @date 2018年9月21日10:05:47
    * 
    * */
	@Override
	public QuestionnaireProblem queryQuestionnaireProblemOrCode(
			QuestionnaireProblem bean) {
		return dalClient.queryForObject("survey.queryQuestionnaireProblemOrCode", bean, QuestionnaireProblem.class);
	}

	@Override
	public String deleteQueManageProblem(final QuestionnaireProblem bean) {
		 dalClient.getTransactionTemplate().execute(new CallBackTemplate<Integer>() {
        	@Override
            public Integer invoke() {
        		QuestionnaireProblem que=null;
        		String[] ids=bean.getIds().split(",");
        		for(int i=0;i<ids.length;i++){
        			que=new QuestionnaireProblem();
        			que.setId(Integer.parseInt(ids[i]));
            		dalClient.execute("survey.delQuestionnaireProblem2", que);
            		dalClient.execute("survey.delQuestionnaireProblemItem2", que);
            		dalClient.execute("survey.delQuestionnaireAnswer2", que);
        		}
               return null;
           }
		});
        return null;
	}

	/**
    * 功能说明：问卷问题-修改跳转
    * @author wanchanghuang
    * @date 2018年9月21日11:30:17
    * */
	@Override
	public QuestionnaireProblem queryQueManageProblemById(
			QuestionnaireProblem bean) {
		return dalClient.find(QuestionnaireProblem.class, bean);
	}

	/**
    * 功能说明：问卷问题-修改保存
    * @author wanchanghuang
    * @date 2018年9月21日10:05:47
    * */
	@Override
	public void mergeQuestionnaireProblem(QuestionnaireProblem bean) {
		dalClient.dynamicMerge(bean);
	}

	/**
    * 功能说明：问卷问题-答案选项
    * @author wanchanghuang
    * @date 2018年9月21日10:05:47
    * */
	@Override
	public List<QuestionnaireProblemItem> queryQuestionnaireProblemItem(
			QuestionnaireProblem bean) {
		return dalClient.queryForList("survey.queryQuestionnaireProblemItme", bean, QuestionnaireProblemItem.class);
	}

	/**
    * 功能说明：问卷问题-答案选项添加
    * @author wanchanghuang
    * @date 2018年9月21日10:05:47
    * */
	@Override
	public void addQuestionnaireProblemItem(QuestionnaireProblemItem bean) {
		dalClient.persist(bean);
	}

	@Override
	public String deleteQueManageProblemItem(final QuestionnaireProblemItem bean) {
		 dalClient.getTransactionTemplate().execute(new CallBackTemplate<Integer>() {
	        	@Override
	            public Integer invoke() {
	        		QuestionnaireProblemItem que=null;
	        		String[] ids=bean.getIds().split(",");
	        		for(int i=0;i<ids.length;i++){
	        			que=new QuestionnaireProblemItem();
	        			que.setId(Integer.parseInt(ids[i]));
	            		dalClient.execute("survey.delQuestionnaireProblemItem3", que);
	        		}
	               return null;
	           }
			});
	        return null;
		
	}

	/**
	 * 功能说明：问卷问题选项-修改
	 * 
	 * */
	@Override
	public void updateQueManageProblemItemById(QuestionnaireProblemItem bean) {
		dalClient.dynamicMerge(bean);
	}

	
	
	@Override
	public QuestionnaireProblemItem queryQueManageProblemItemById(
			QuestionnaireProblemItem bean) {
		return dalClient.find(QuestionnaireProblemItem.class, bean);
	}

	@Override
	public void questionnaireProblemItemUpdate(QuestionnaireProblemItem bean) {
		dalClient.dynamicMerge(bean);
	}

	

   



}

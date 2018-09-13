package com.cloudfy.service.survey;

import java.util.List;

import com.cloudfy.model.survey.Questionnaire;
import com.cloudfy.model.survey.QuestionnaireAnswer;
import com.cloudfy.model.survey.QuestionnaireProblem;
import com.cloudfy.model.survey.QuestionnaireProblemItem;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;


/**
 * 字典接口实现
 *
 * @author v_wanchanghuang
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public interface IQuestionnaireService {

	Questionnaire updateQuestionnaire(Questionnaire que);

	PaginationResult<List<Questionnaire>> queryQueManagePage(
			Questionnaire vo, Pagination pagination);

	Questionnaire queryQuestionnaireById(Questionnaire bean);

	List<QuestionnaireProblemItem> queQuestionnaireItem(Questionnaire bean);

	List<QuestionnaireProblem> queryQuestionnaireProblem(Questionnaire que);

	List<QuestionnaireAnswer> queryQuestionnaireAnswer(Questionnaire que);

   


}

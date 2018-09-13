package com.cloudfy.model.survey;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 实体类TQuestionnaireProblemItem
 *
 * @author saic-tools-generator
 */
@Entity(name = "t_questionnaire_problem_item")
public class QuestionnaireProblemItem implements Serializable {
    /**
     * Serial UID
     */
    private static final long serialVersionUID = 1L;

    /**
     * id ID(自增长主键)
     */
    private Long id;

    /**
     * questionnaireId 问卷ID
     */
    private Long questionnaireId;

    /**
     * questionnaireProblemId 问题ID
     */
    private Long questionnaireProblemId;

    /**
     * value 选择值
     */
    private String value;

    /**
     * name 选项名称
     */
    private String name;

    /**
     * orderNo 序号
     */
    private String orderNo;

    /**
     * nextProblem 下个问题id
     */
    private String nextProblem;
    /**
     * 是否显示文本框
     */
    private Integer showTextField;
    /**
     * 显示验证结果
     */
    private String validateResult;

    
    /**
     * createTime 创建时间
     */
    private Date createTime;

    /**
     * createUserName 创建人
     */
    private String createUserName;

    /**
     * createUserId 创建人ID
     */
    private Long createUserId;

    /**
     * updateTime 最后修改时间
     */
    private Date updateTime;

    /**
     * updateUserName 最后修改人
     */
    private String updateUserName;

    /**
     * updateUserId 最后修改人ID
     */
    private Long updateUserId;
    
    
    @Column(name = "show_textfield")
    public Integer getShowTextField() {
        return showTextField;
    }

    public void setShowTextField(Integer showTextField) {
        this.showTextField = showTextField;
    }

    @Column(name = "validate_result")
    public String getValidateResult() {
        return validateResult;
    }

    public void setValidateResult(String validateResult) {
        this.validateResult = validateResult;
    }

    /**
     * @return the createTime
     */
    @Column(name = "create_time")
    public Date getCreateTime() {
        return this.createTime;
    }

    /**
     * @param createTime the createTime to set
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * @return the createUserName
     */
    @Column(name = "create_user_name")
    public String getCreateUserName() {
        return this.createUserName;
    }

    /**
     * @param createUserName the createUserName to set
     */
    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }

    /**
     * @return the createUserId
     */
    @Column(name = "create_user_id")
    public Long getCreateUserId() {
        return this.createUserId;
    }

    /**
     * @param createUserId the createUserId to set
     */
    public void setCreateUserId(Long createUserId) {
        this.createUserId = createUserId;
    }

    /**
     * @return the updateTime
     */
    @Column(name = "update_time")
    public Date getUpdateTime() {
        return this.updateTime;
    }

    /**
     * @param updateTime the updateTime to set
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * @return the updateUserName
     */
    @Column(name = "update_user_name")
    public String getUpdateUserName() {
        return this.updateUserName;
    }

    /**
     * @param updateUserName the updateUserName to set
     */
    public void setUpdateUserName(String updateUserName) {
        this.updateUserName = updateUserName;
    }

    /**
     * @return the updateUserId
     */
    @Column(name = "update_user_id")
    public Long getUpdateUserId() {
        return this.updateUserId;
    }

    /**
     * @param updateUserId the updateUserId to set
     */
    public void setUpdateUserId(Long updateUserId) {
        this.updateUserId = updateUserId;
    }


    /**
     * @return the id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    public Long getId() {
        return this.id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return the questionnaireId
     */
    @Column(name = "questionnaire_id")
    public Long getQuestionnaireId() {
        return this.questionnaireId;
    }

    /**
     * @param questionnaireId the questionnaireId to set
     */
    public void setQuestionnaireId(Long questionnaireId) {
        this.questionnaireId = questionnaireId;
    }

    /**
     * @return the questionnaireProblemId
     */
    @Column(name = "questionnaire_problem_id")
    public Long getQuestionnaireProblemId() {
        return this.questionnaireProblemId;
    }

    /**
     * @param questionnaireProblemId the questionnaireProblemId to set
     */
    public void setQuestionnaireProblemId(Long questionnaireProblemId) {
        this.questionnaireProblemId = questionnaireProblemId;
    }

    /**
     * @return the value
     */
    @Column(name = "value")
    public String getValue() {
        return this.value;
    }

    /**
     * @param value the value to set
     */
    public void setValue(String value) {
        this.value = value;
    }

    /**
     * @return the name
     */
    @Column(name = "name")
    public String getName() {
        return this.name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the orderNo
     */
    @Column(name = "order_no")
    public String getOrderNo() {
        return this.orderNo;
    }

    /**
     * @param orderNo the orderNo to set
     */
    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    /**
     * @return the nextProblem
     */
    @Column(name = "next_problem")
    public String getNextProblem() {
        return this.nextProblem;
    }

    /**
     * @param nextProblem the nextProblem to set
     */
    public void setNextProblem(String nextProblem) {
        this.nextProblem = nextProblem;
    }

    /**
     * 覆盖父类hashCode方法
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    /**
     * 覆盖父类equals方法
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        QuestionnaireProblemItem other = (QuestionnaireProblemItem) obj;
        if (id == null) {
            if (other.id != null) {
                return false;
            }
        } else if (!id.equals(other.id)) {
            return false;
        }
        return true;
    }

    /**
     * 覆盖父类toString方法
     */
    @Override
    public String toString() {
        return super.toString();
    }
}
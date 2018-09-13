/*
 * Copyright (C), 2013-2014, 上海汽车集团股份有限公司
 * FileName: TQuestionnaireAnswer.java
 * Author:   saic-generator
 * Date:     2014-4-19 14:05:27
 * Description: TQuestionnaireAnswer实体类   
 */

package com.cloudfy.model.survey;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 实体类TQuestionnaireAnswer
 *
 * @author saic-tools-generator
 */
@Entity(name = "t_questionnaire_answer")
public class QuestionnaireAnswer implements Serializable {
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
     * value 回答值
     */
    private String value;

    /**
     * type 问题类型
     */
    private Integer itemType;

    /**
     * custId
     */
    private Long custId;

    /**
     * subinstId
     */
    private Long subinstId;

    /**
     * memberId 会员ID
     */
    private Long memberId;

    /**
     * anwserTime 回答时间
     */
    private Date anwserTime;

    /**
     * taskId 任务id
     */
    private Long taskId;

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
     * @return the custId
     */
    @Column(name = "cust_id")
    public Long getCustId() {
        return this.custId;
    }

    /**
     * @param custId the custId to set
     */
    public void setCustId(Long custId) {
        this.custId = custId;
    }

    /**
     * @return the subinstId
     */
    @Column(name = "subinst_id")
    public Long getSubinstId() {
        return this.subinstId;
    }

    /**
     * @param subinstId the subinstId to set
     */
    public void setSubinstId(Long subinstId) {
        this.subinstId = subinstId;
    }

    /**
     * @return the memberId
     */
    @Column(name = "member_id")
    public Long getMemberId() {
        return this.memberId;
    }

    /**
     * @param memberId the memberId to set
     */
    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    /**
     * @return the anwserTime
     */
    @Column(name = "anwser_time")
    public Date getAnwserTime() {
        return this.anwserTime;
    }

    /**
     * @param anwserTime the anwserTime to set
     */
    public void setAnwserTime(Date anwserTime) {
        this.anwserTime = anwserTime;
    }

    /**
     * @return the taskId
     */
    @Column(name = "task_id")
    public Long getTaskId() {
        return this.taskId;
    }

    /**
     * @param taskId the taskId to set
     */
    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    @Column(name = "item_type")
    public Integer getItemType() {
        return itemType;
    }

    public void setItemType(Integer itemType) {
        this.itemType = itemType;
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
        QuestionnaireAnswer other = (QuestionnaireAnswer) obj;
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
/*
 * Copyright (C), 2013-2014, 上海汽车集团股份有限公司
 * FileName: TQuestionnaireProblem.java
 * Author:   saic-generator
 * Date:     2014-4-19 14:05:27
 * Description: TQuestionnaireProblem实体类   
 */

package com.cloudfy.model.survey;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

/**
 * 实体类TQuestionnaireProblem
 *
 * @author saic-tools-generator
 */
@Entity(name = "t_questionnaire_problem")
public class QuestionnaireProblem implements Serializable {
    /**
     * Serial UID
     */
    private static final long serialVersionUID = 1L;

    /**
     * id ID(自增长主键)
     */
    private Long id;

    /**
     * 内容映射值
     */
    private String qAttr;


    /**
     * code 编号
     */
    private String code;

    /**
     * questionnaireId 问卷ID
     */
    private Long questionnaireId;

    /**
     * shortName 问题简称
     */
    private String shortName;

    /**
     * fullName 问题全称
     */
    private String fullName;

    /**
     * 问题类型,1:单选；2：多选；3：日期选择；4：下拉选择；5：文本输入;6:文本类型
     */
    private Integer type;

    /**
     * isRequired 是否必填，1：是；2：否
     */
    private Integer isRequired;

    /**
     * isDict 是否基础数据
     */
    private Integer isDict;

    /**
     * problemDictCode 基础数据编码
     */
    private Integer problemDictCode;

    /**
     * orderNo 问题序号
     */
    private Integer orderNo;
    /**
     * 问题提示
     */
    private String tip;

    @Column(name = "tip")
    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

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
     * is_not_validation
     */
    private String isNotValidation;

    /**
     * @return the createTime
     */
    @Column(name = "create_time")
    public Date getCreateTime() {
        return this.createTime;
    }


    @Column(name = "is_not_validation")
    public String getIsNotValidation() {
        return isNotValidation;
    }

    public void setIsNotValidation(String isNotValidation) {
        this.isNotValidation = isNotValidation;
    }

    /**
     * @param createTime the createTime to set
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Column(name = "q_attr")
    public String getqAttr() {
        return qAttr;
    }

    public void setqAttr(String qAttr) {
        this.qAttr = qAttr;
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
     * @return the code
     */
    @Column(name = "code")
    public String getCode() {
        return this.code;
    }

    /**
     * @param code the code to set
     */
    public void setCode(String code) {
        this.code = code;
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
     * @return the shortName
     */
    @Column(name = "short_name")
    public String getShortName() {
        return this.shortName;
    }

    /**
     * @param shortName the shortName to set
     */
    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    /**
     * @return the fullName
     */
    @Column(name = "full_name")
    public String getFullName() {
        return this.fullName;
    }

    /**
     * @param fullName the fullName to set
     */
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    /**
     * @return the type
     */
    @Column(name = "type")
    public Integer getType() {
        return this.type;
    }

    /**
     * @param type the type to set
     */
    public void setType(Integer type) {
        this.type = type;
    }

    /**
     * @return the isRequired
     */
    @Column(name = "is_required")
    public Integer getIsRequired() {
        return this.isRequired;
    }

    /**
     * @param isRequired the isRequired to set
     */
    public void setIsRequired(Integer isRequired) {
        this.isRequired = isRequired;
    }

    /**
     * @return the isDict
     */
    @Column(name = "is_dict")
    public Integer getIsDict() {
        return this.isDict;
    }

    /**
     * @param isDict the isDict to set
     */
    public void setIsDict(Integer isDict) {
        this.isDict = isDict;
    }

    /**
     * @return the problemDictCode
     */
    @Column(name = "problem_dict_code")
    public Integer getProblemDictCode() {
        return this.problemDictCode;
    }

    /**
     * @param problemDictCode the problemDictCode to set
     */
    public void setProblemDictCode(Integer problemDictCode) {
        this.problemDictCode = problemDictCode;
    }

    /**
     * @return the orderNo
     */
    @Column(name = "order_no")
    public Integer getOrderNo() {
        return this.orderNo;
    }

    /**
     * @param orderNo the orderNo to set
     */
    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
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
        QuestionnaireProblem other = (QuestionnaireProblem) obj;
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
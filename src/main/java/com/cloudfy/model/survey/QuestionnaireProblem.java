/*
 * Copyright (C), 2013-2014, 云朵家
 * FileName: TQuestionnaireProblem.java
 * Author:   saic-generator
 * Date:     2014-4-19 14:05:27
 * Description: TQuestionnaireProblem实体类   
 *  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID(自增长主键)',
  `q_attr` varchar(200) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL COMMENT '编号',
  `questionnaire_id` int(11) DEFAULT NULL COMMENT '问卷ID',
  `short_name` varchar(200) DEFAULT NULL COMMENT '问题简称',
  `full_name` varchar(2000) DEFAULT NULL COMMENT '问题全称',
  `type` int(11) DEFAULT NULL COMMENT '问题类型,1:单选；2：多选；3：日期选择；4：下拉选择；5：文本输入;6:文本类型',
  `is_required` int(11) DEFAULT NULL COMMENT '是否必填，1：是；2：否',
  `is_dict` int(10) DEFAULT NULL,
  `problem_dict_code` int(10) DEFAULT NULL,
  `order_no` int(11) DEFAULT NULL COMMENT '问题序号',
  `tip` varchar(255) DEFAULT NULL COMMENT '显示问题提示',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user_name` varchar(10) DEFAULT NULL COMMENT '创建人',
  `create_user_id` int(11) DEFAULT NULL COMMENT '创建人ID',
  `update_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '最后修改时间',
  `update_user_name` varchar(10) DEFAULT NULL COMMENT '最后修改人',
  `update_user_id` int(11) DEFAULT NULL COMMENT '最后修改人ID',
  `is_not_validation` varchar(1) DEFAULT NULL COMMENT '是否验证（1.是 2.否）',
 */

package com.cloudfy.model.survey;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Date;


/**
 * 实体类TQuestionnaireProblem
 *
 * @author saic-tools-generator
 */
@Entity(name = "t_questionnaire_problem")
public class QuestionnaireProblem implements Serializable {


    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
     * id ID(自增长主键)
     * 
     */
    private Integer id;

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
    private Integer questionnaireId;

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
    private Integer createUserId;

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
    private Integer updateUserId;
    /**
     * is_not_validation
     */
    private String isNotValidation;
    private String ids;

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
    public Integer getCreateUserId() {
        return this.createUserId;
    }

    /**
     * @param createUserId the createUserId to set
     */
    public void setCreateUserId(Integer createUserId) {
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
    public Integer getUpdateUserId() {
        return this.updateUserId;
    }

    /**
     * @param updateUserId the updateUserId to set
     */
    public void setUpdateUserId(Integer updateUserId) {
        this.updateUserId = updateUserId;
    }

    /**
     * @return the id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    public Integer getId() {
        return this.id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Integer id) {
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
    public Integer getQuestionnaireId() {
        return this.questionnaireId;
    }

    /**
     * @param questionnaireId the questionnaireId to set
     */
    public void setQuestionnaireId(Integer questionnaireId) {
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

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}
    
}
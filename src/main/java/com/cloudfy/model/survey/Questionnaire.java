/*
 * Copyright (C), 2013-2014, 上海汽车集团股份有限公司
 * FileName: TQuestionnaire.java
 * Author:   saic-generator
 * Date:     2014-4-19 14:05:27
 * Description: TQuestionnaire实体类   
 */

package com.cloudfy.model.survey;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 实体类TQuestionnaire
 *
 * @author saic-tools-generator
 */
@Entity(name = "t_questionnaire")
public class Questionnaire implements Serializable {
    /**
     * Serial UID
     */
    private static final long serialVersionUID = 1L;

    /**
     * id ID(自增长主键)
     */
    private Long id;
    /**
     * type_id 任务类型
     */
    private Long taskCode;

    /**
     * code 编号
     */
    private String code;

    /**
     * brand 品牌
     */
    private Integer brand;

    /**
     * title 公告标题
     */
    private String title;

    /**
     * status 状态
     */
    private Integer status;

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
     * 租户ID *
     */
    private String dpnum;//

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

    @Column(name = "task_code")
    public Long getTaskCode() {
        return taskCode;
    }

    public void setTaskCode(Long taskCode) {
        this.taskCode = taskCode;
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
     * @return the brand
     */
    @Column(name = "brand")
    public Integer getBrand() {
        return this.brand;
    }

    /**
     * @param brand the brand to set
     */
    public void setBrand(Integer brand) {
        this.brand = brand;
    }

    /**
     * @return the title
     */
    @Column(name = "title")
    public String getTitle() {
        return this.title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the status
     */
    @Column(name = "status")
    public Integer getStatus() {
        return this.status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(Integer status) {
        this.status = status;
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

    @Column(name = "dpnum")
    public String getDpnum() {
        return dpnum;
    }

    public void setDpnum(String dpnum) {
        this.dpnum = dpnum;
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
        Questionnaire other = (Questionnaire) obj;
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
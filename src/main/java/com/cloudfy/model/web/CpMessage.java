package com.cloudfy.model.web;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "t_cp_message")
public class CpMessage implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	private Integer id;
	private Integer cpId;  //产品Id  
	private Integer cpTag; //产品标识 1-沙发  2-十字绣  3-新闻
	private String content; //留言内容
	private Integer isFather;  //是否父节点
	private Integer isPass; //审核结果   1-通过  2-不通过  3-待审核
	private Integer isHp; //好评等级  1-好  2-一般   3-差
	private Integer isCpXwType; //留言表示    1-沙发  2-十字绣  3-新闻
	private Integer createUserId;
	private String createUser;
	private Date createTime;
	private Integer updateUserId;
	private String updateUser;
	private Date updateTime;
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name = "cp_id")
	public Integer getCpId() {
		return cpId;
	}
	public void setCpId(Integer cpId) {
		this.cpId = cpId;
	}
	
	@Column(name = "cp_tag")
	public Integer getCpTag() {
		return cpTag;
	}
	public void setCpTag(Integer cpTag) {
		this.cpTag = cpTag;
	}
	
	@Column(name = "content")
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	@Column(name = "is_father")
	public Integer getIsFather() {
		return isFather;
	}
	public void setIsFather(Integer isFather) {
		this.isFather = isFather;
	}
	
	@Column(name = "is_pass")
	public Integer getIsPass() {
		return isPass;
	}
	public void setIsPass(Integer isPass) {
		this.isPass = isPass;
	}
	
	@Column(name = "is_hp")
	public Integer getIsHp() {
		return isHp;
	}
	public void setIsHp(Integer isHp) {
		this.isHp = isHp;
	}
	
	@Column(name = "is_cp_xw_type")
	public Integer getIsCpXwType() {
		return isCpXwType;
	}
	public void setIsCpXwType(Integer isCpXwType) {
		this.isCpXwType = isCpXwType;
	}
	
	@Column(name = "create_user_id")
	public Integer getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(Integer createUserId) {
		this.createUserId = createUserId;
	}
	
	@Column(name = "create_user")
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	
	@Column(name = "create_time")
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@Column(name = "update_user_id")
	public Integer getUpdateUserId() {
		return updateUserId;
	}
	public void setUpdateUserId(Integer updateUserId) {
		this.updateUserId = updateUserId;
	}
	
	@Column(name = "update_user")
	public String getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}
	
	@Column(name = "update_time")
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
	

}

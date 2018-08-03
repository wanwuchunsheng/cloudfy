package com.cloudfy.model.web;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "t_news_info")
public class NewsInfo implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String typeName;  //类别名称
	private String title; //新闻标题
	private String content; //新闻内容
	private Integer readNumber;  //阅读量
	private Integer scNumber; //收藏量
	private Integer fxNumber; //分享量
	private Integer isPass; //是否发布   1-已发布  2-带审核  3-审核不通过  4-简介
	private Integer createUserId;
	private String createUser;
	private Date createTime;
	private Integer updateUserId;
	private String updateUser;
	private Date updateTime;
	private String titleUrl;
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name = "type_name")
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	
	@Column(name = "title")
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	@Column(name = "content")
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	@Column(name = "read_number")
	public Integer getReadNumber() {
		return readNumber;
	}
	public void setReadNumber(Integer readNumber) {
		this.readNumber = readNumber;
	}
	
	@Column(name = "sc_number")
	public Integer getScNumber() {
		return scNumber;
	}
	public void setScNumber(Integer scNumber) {
		this.scNumber = scNumber;
	}
	
	@Column(name = "fx_number")
	public Integer getFxNumber() {
		return fxNumber;
	}
	public void setFxNumber(Integer fxNumber) {
		this.fxNumber = fxNumber;
	}
	
	@Column(name = "is_pass")
	public Integer getIsPass() {
		return isPass;
	}
	public void setIsPass(Integer isPass) {
		this.isPass = isPass;
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
	
	@Column(name = "title_url")
	public String getTitleUrl() {
		return titleUrl;
	}
	public void setTitleUrl(String titleUrl) {
		this.titleUrl = titleUrl;
	}

}

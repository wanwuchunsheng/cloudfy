package com.cloudfy.model.web;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

@Entity(name = "t_buy_collect_record")
public class BuyCollectRecord implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private Integer cpId;  //产品Id  
	private Integer cpTag; //产品标识 1-沙发  2-十字绣  3-新闻
	private Integer buyCollectTag; //购买收藏标识  1-已购买  2-已收藏  
	private Integer createUserId; 
	private String createUser;
	private Date createTime;
	
	
	
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
	
	@Column(name = "buy_collect_tag")
	public Integer getBuyCollectTag() {
		return buyCollectTag;
	}
	public void setBuyCollectTag(Integer buyCollectTag) {
		this.buyCollectTag = buyCollectTag;
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
	
	
	

}

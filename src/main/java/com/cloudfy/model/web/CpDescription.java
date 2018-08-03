package com.cloudfy.model.web;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "t_cp_description")
public class CpDescription implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String typeName; //产品标识名称     1-沙发  2-十字绣   3-幻灯片   4-热门产品   5-店内推存
	private String title;  //标题  
	private String imgSaillPath; //小图地址
	private String imgBigPath; //大图地址
	private String imgBigPath2; //大长图片
	private String imgDescription;  //图片描述
	private String buttonSm; //按钮说明
	private String buttonUrl; //按钮链接
	private Integer cpPrice; //产品价格
	private Integer cpTag; //产品标识  1-沙发  2-十字绣   3-幻灯片   4-热卖产品   5-店内推存
	private Integer scNumber; // 收藏数量
	private Integer gmNumber;  //购买数量
	private Integer cpStatus;  // 产品状态  1-可用  2-不可用 
	
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
	
	@Column(name = "img_saill_path")
	public String getImgSaillPath() {
		return imgSaillPath;
	}
	public void setImgSaillPath(String imgSaillPath) {
		this.imgSaillPath = imgSaillPath;
	}
	
	@Column(name = "img_big_path")
	public String getImgBigPath() {
		return imgBigPath;
	}
	public void setImgBigPath(String imgBigPath) {
		this.imgBigPath = imgBigPath;
	}
	
	@Column(name = "img_big_path2")
	public String getImgBigPath2() {
		return imgBigPath2;
	}
	public void setImgBigPath2(String imgBigPath2) {
		this.imgBigPath2 = imgBigPath2;
	}
	
	@Column(name = "img_description")
	public String getImgDescription() {
		return imgDescription;
	}
	public void setImgDescription(String imgDescription) {
		this.imgDescription = imgDescription;
	}
	
	@Column(name = "button_sm")
	public String getButtonSm() {
		return buttonSm;
	}
	public void setButtonSm(String buttonSm) {
		this.buttonSm = buttonSm;
	}
	
	@Column(name = "button_url")
	public String getButtonUrl() {
		return buttonUrl;
	}
	public void setButtonUrl(String buttonUrl) {
		this.buttonUrl = buttonUrl;
	}
	
	@Column(name = "cp_price")
	public Integer getCpPrice() {
		return cpPrice;
	}
	public void setCpPrice(Integer cpPrice) {
		this.cpPrice = cpPrice;
	}
	
	@Column(name = "cp_tag")
	public Integer getCpTag() {
		return cpTag;
	}
	public void setCpTag(Integer cpTag) {
		this.cpTag = cpTag;
	}
	
	@Column(name = "sc_number")
	public Integer getScNumber() {
		return scNumber;
	}
	public void setScNumber(Integer scNumber) {
		this.scNumber = scNumber;
	}
	
	@Column(name = "gm_number")
	public Integer getGmNumber() {
		return gmNumber;
	}
	public void setGmNumber(Integer gmNumber) {
		this.gmNumber = gmNumber;
	}
	
	@Column(name = "cp_status")
	public Integer getCpStatus() {
		return cpStatus;
	}
	public void setCpStatus(Integer cpStatus) {
		this.cpStatus = cpStatus;
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

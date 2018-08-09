package com.cloudfy.model.nav;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * 说明：商品导航
 * @author Administrator
 * */
@Entity(name = "a_commodity_nav")
public class CommondityNav implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private Date createTime;
	private int createUserId;
	private Date updateTime;
	private int updateUserId;
	private String navTitle; //标题
	private String navShort; //简称
	private String iconUrl; //图片地址
	private int num; //序号
	private String type; //类型 是否特殊处理 0-默认  1-幻灯片
	private String code; //编码
	private int del; //是否删除  0-默认  1:-删除
	private String dpnum; //店铺
	private String remark; //备注
	
	private String createUserName;
	private String updateUsername;
	
	//图片实体
	private String acInfoId;
	private String maxUrl;
	private String miniUrl;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Column(name = "create_time")
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	@Column(name = "create_user_id")
	public int getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(int createUserId) {
		this.createUserId = createUserId;
	}
	
	@Column(name = "update_time")
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
	@Column(name = "update_user_id")
	public int getUpdateUserId() {
		return updateUserId;
	}
	public void setUpdateUserId(int updateUserId) {
		this.updateUserId = updateUserId;
	}
	
	@Column(name = "nav_title")
	public String getNavTitle() {
		return navTitle;
	}
	public void setNavTitle(String navTitle) {
		this.navTitle = navTitle;
	}
	
	@Column(name = "nav_short")
	public String getNavShort() {
		return navShort;
	}
	public void setNavShort(String navShort) {
		this.navShort = navShort;
	}
	
	@Column(name = "icon_url")
	public String getIconUrl() {
		return iconUrl;
	}
	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}
	
	@Column(name = "num")
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	
	@Column(name = "type")
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	@Column(name = "code")
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	@Column(name = "del")
	public int getDel() {
		return del;
	}
	public void setDel(int del) {
		this.del = del;
	}
	
	@Column(name = "dpnum")
	public String getDpnum() {
		return dpnum;
	}
	public void setDpnum(String dpnum) {
		this.dpnum = dpnum;
	}
	
	@Column(name = "remark")
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public String getAcInfoId() {
		return acInfoId;
	}
	public void setAcInfoId(String acInfoId) {
		this.acInfoId = acInfoId;
	}
	
	public String getMaxUrl() {
		return maxUrl;
	}
	public void setMaxUrl(String maxUrl) {
		this.maxUrl = maxUrl;
	}
	
	public String getMiniUrl() {
		return miniUrl;
	}
	public void setMiniUrl(String miniUrl) {
		this.miniUrl = miniUrl;
	}
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	public String getUpdateUsername() {
		return updateUsername;
	}
	public void setUpdateUsername(String updateUsername) {
		this.updateUsername = updateUsername;
	}

	
}

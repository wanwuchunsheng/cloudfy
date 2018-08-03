package com.cloudfy.model.usr;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 * 用户表
 * 
 * */
public class SysUserInfo implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private Date createTime;
	private int createUserId; //穿件人ID
	private Date updateTime; //修改时间
	private int updateUserId; //修改人ID
	private String uname; //姓名
	private String upwd; //密码
	private String eno; //卡号
	private String loginName; //登录名
	private int gender; //性别 0-女  1-男
	private String tel; //电话
	private String phone; //手机
	private String email; //邮箱
	private int del; //0-默认  1：删除
	private int securityLevel; //安全级别 0-普通 1-vip
	private String webchat; //微信
	private String qq; //QQ
	private int usrStatus; //状态
	private String smsNotitfy; //短信通知
	private String photoPath; //图片地址
	private String qrcodePath;//二维码
	private String address; //地址
	private String dpnum;//商品类别
	
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
	
	@Column(name = "uname")
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	
	@Column(name = "upwd")
	public String getUpwd() {
		return upwd;
	}
	public void setUpwd(String upwd) {
		this.upwd = upwd;
	}
	
	@Column(name = "eno")
	public String getEno() {
		return eno;
	}
	public void setEno(String eno) {
		this.eno = eno;
	}
	
	@Column(name = "login_name")
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	
	@Column(name = "gender")
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	
	@Column(name = "tel")
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	
	@Column(name = "phone")
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	@Column(name = "email")
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	@Column(name = "del")
	public int getDel() {
		return del;
	}
	public void setDel(int del) {
		this.del = del;
	}
	
	@Column(name = "security_level")
	public int getSecurityLevel() {
		return securityLevel;
	}
	public void setSecurityLevel(int securityLevel) {
		this.securityLevel = securityLevel;
	}
	
	@Column(name = "webchat")
	public String getWebchat() {
		return webchat;
	}
	public void setWebchat(String webchat) {
		this.webchat = webchat;
	}
	
	@Column(name = "qq")
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	
	@Column(name = "usr_status")
	public int getUsrStatus() {
		return usrStatus;
	}
	public void setUsrStatus(int usrStatus) {
		this.usrStatus = usrStatus;
	}
	
	@Column(name = "sms_notitfy")
	public String getSmsNotitfy() {
		return smsNotitfy;
	}
	public void setSmsNotitfy(String smsNotitfy) {
		this.smsNotitfy = smsNotitfy;
	}
	
	@Column(name = "photo_path")
	public String getPhotoPath() {
		return photoPath;
	}
	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}
	
	@Column(name = "qrcode_path")
	public String getQrcodePath() {
		return qrcodePath;
	}
	public void setQrcodePath(String qrcodePath) {
		this.qrcodePath = qrcodePath;
	}
	
	@Column(name = "address")
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	@Column(name = "dpnum")
	public String getDpnum() {
		return dpnum;
	}
	public void setDpnum(String dpnum) {
		this.dpnum = dpnum;
	}
}

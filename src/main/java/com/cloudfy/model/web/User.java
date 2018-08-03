package com.cloudfy.model.web;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

@Entity(name = "t_users")
public class User implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String uName;
	private String uPassword;
	private String uNickname;
	private String uSex;
	private Integer uAge;
	private Date uBirthday;
	private String uCarid;
	private String uQq;
	private String uEmail;
	private String uLikes;
	private String uOldAddress;
	private String uNowAddress;
	private String uIsmarry;
	private String uVocation;
	private String uTelephone;
	private String uHomeTel;
	private Integer uTotalMoney;
	private String uIocUrl;
	private String uStatement;
	private String uPoint;
	private String uStatus;
	private String uIsmember;
	
	private Date uCreateTime;
	private Date uUpdateTime;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name = "u_name")
	public String getuName() {
		return uName;
	}
	
	public void setuName(String uName) {
		this.uName = uName;
	}
	
	@Column(name = "u_nickname")
	public String getuNickname() {
		return uNickname;
	}
	public void setuNickname(String uNickname) {
		this.uNickname = uNickname;
	}
	
	@Column(name = "u_password")
	public String getuPassword() {
		return uPassword;
	}
	public void setuPassword(String uPassword) {
		this.uPassword = uPassword;
	}
	
	@Column(name = "u_sex")
	public String getuSex() {
		return uSex;
	}
	public void setuSex(String uSex) {
		this.uSex = uSex;
	}
	
	@Column(name = "u_age")
	public Integer getuAge() {
		return uAge;
	}
	public void setuAge(Integer uAge) {
		this.uAge = uAge;
	}
	
	@Column(name = "u_birthday")
	public Date getuBirthday() {
		return uBirthday;
	}
	public void setuBirthday(Date uBirthday) {
		this.uBirthday = uBirthday;
	}
	
	@Column(name = "u_carid")
	public String getuCarid() {
		return uCarid;
	}
	public void setuCarid(String uCarid) {
		this.uCarid = uCarid;
	}
	
	@Column(name = "u_qq")
	public String getuQq() {
		return uQq;
	}
	public void setuQq(String uQq) {
		this.uQq = uQq;
	}
	
	@Column(name = "u_email")
	public String getuEmail() {
		return uEmail;
	}
	public void setuEmail(String uEmail) {
		this.uEmail = uEmail;
	}
	
	@Column(name = "u_likes")
	public String getuLikes() {
		return uLikes;
	}
	public void setuLikes(String uLikes) {
		this.uLikes = uLikes;
	}
	
	@Column(name = "u_old_address")
	public String getuOldAddress() {
		return uOldAddress;
	}
	public void setuOldAddress(String uOldAddress) {
		this.uOldAddress = uOldAddress;
	}
	
	@Column(name = "u_now_address")
	public String getuNowAddress() {
		return uNowAddress;
	}
	public void setuNowAddress(String uNowAddress) {
		this.uNowAddress = uNowAddress;
	}
	
	@Column(name = "u_ismarry")
	public String getuIsmarry() {
		return uIsmarry;
	}
	public void setuIsmarry(String uIsmarry) {
		this.uIsmarry = uIsmarry;
	}
	
	@Column(name = "u_vocation")
	public String getuVocation() {
		return uVocation;
	}
	public void setuVocation(String uVocation) {
		this.uVocation = uVocation;
	}
	
	@Column(name = "u_telephone")
	public String getuTelephone() {
		return uTelephone;
	}
	public void setuTelephone(String uTelephone) {
		this.uTelephone = uTelephone;
	}
	
	@Column(name = "u_home_tel")
	public String getuHomeTel() {
		return uHomeTel;
	}
	public void setuHomeTel(String uHomeTel) {
		this.uHomeTel = uHomeTel;
	}
	
	@Column(name = "u_total_money")
	public Integer getuTotalMoney() {
		return uTotalMoney;
	}
	public void setuTotalMoney(Integer uTotalMoney) {
		this.uTotalMoney = uTotalMoney;
	}
	
	@Column(name = "u_ioc_url")
	public String getuIocUrl() {
		return uIocUrl;
	}
	public void setuIocUrl(String uIocUrl) {
		this.uIocUrl = uIocUrl;
	}
	
	@Column(name = "u_statement")
	public String getuStatement() {
		return uStatement;
	}
	public void setuStatement(String uStatement) {
		this.uStatement = uStatement;
	}
	
	@Column(name = "u_point")
	public String getuPoint() {
		return uPoint;
	}
	public void setuPoint(String uPoint) {
		this.uPoint = uPoint;
	}
	
	@Column(name = "u_status")
	public String getuStatus() {
		return uStatus;
	}
	public void setuStatus(String uStatus) {
		this.uStatus = uStatus;
	}
	
	@Column(name = "u_ismember")
	public String getuIsmember() {
		return uIsmember;
	}
	public void setuIsmember(String uIsmember) {
		this.uIsmember = uIsmember;
	}
	
	@Column(name = "u_create_time")
	public Date getuCreateTime() {
		return uCreateTime;
	}
	public void setuCreateTime(Date uCreateTime) {
		this.uCreateTime = uCreateTime;
	}
	
	@Column(name = "u_update_time")
	public Date getuUpdateTime() {
		return uUpdateTime;
	}
	public void setuUpdateTime(Date uUpdateTime) {
		this.uUpdateTime = uUpdateTime;
	}
	

}

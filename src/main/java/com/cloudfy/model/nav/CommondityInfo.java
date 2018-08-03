package com.cloudfy.model.nav;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 * 说明：商品明细
 * @author Administrator
 * 
 * */
@Entity(name = "a_commodity_info")
public class CommondityInfo implements Serializable{


	private static final long serialVersionUID = 1L;
	
	
	private int id;
	private Date createTime;
	private int createUserId;
	private Date updateTime;
	private int updateUserId;
	private String acCode; //商品导航表code
	private String title;
	private String antistop; //关键词
	private String content; //内容
	private String hot; //热度
	private Float price;//价格
	private Float vipPrice; //vip价格
	private int scNum; //收藏
	private int dzNum; //点赞
	private int ylNum; //预览
	private int writeBackNum; //回复
	private String remark; //备注
	private int del; //删除  0-默认 1-删除
	private int num; //排序
	private String dpnum; //店铺
	
	private String createUserName;//创建人
	private String navName;//导航名称
	private String maxUrl; //大图路径
	private String miniUrl; //小图路径
	private int yCount;//销量 
	private int orderBy;//排序  0-不排序   1-最新出品    2-销售最高    3-价格实惠
	private int type;//0-普通类型   1-幻灯片  
	private String acInfoIds;//查询条件
	private int gwcNum;//购物车重复商品数量   默认1
	
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
	@Column(name = "title")
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
	@Column(name = "ac_code")
	public String getAcCode() {
		return acCode;
	}
	public void setAcCode(String acCode) {
		this.acCode = acCode;
	}
	@Column(name = "antistop")
	public String getAntistop() {
		return antistop;
	}
	public void setAntistop(String antistop) {
		this.antistop = antistop;
	}
	@Column(name = "content")
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	@Column(name = "hot")
	public String getHot() {
		return hot;
	}
	public void setHot(String hot) {
		this.hot = hot;
	}
	@Column(name = "price")
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	@Column(name = "vip_price")
	public Float getVipPrice() {
		return vipPrice;
	}
	public void setVipPrice(Float vipPrice) {
		this.vipPrice = vipPrice;
	}
	@Column(name = "sc_num")
	public int getScNum() {
		return scNum;
	}
	public void setScNum(int scNum) {
		this.scNum = scNum;
	}
	@Column(name = "dz_num")
	public int getDzNum() {
		return dzNum;
	}
	public void setDzNum(int dzNum) {
		this.dzNum = dzNum;
	}
	@Column(name = "yl_num")
	public int getYlNum() {
		return ylNum;
	}
	public void setYlNum(int ylNum) {
		this.ylNum = ylNum;
	}
	@Column(name = "write_back_num")
	public int getWriteBackNum() {
		return writeBackNum;
	}
	public void setWriteBackNum(int writeBackNum) {
		this.writeBackNum = writeBackNum;
	}
	@Column(name = "remark")
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@Column(name = "del")
	public int getDel() {
		return del;
	}
	public void setDel(int del) {
		this.del = del;
	}
	@Column(name = "num")
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	@Column(name = "dpnum")
	public String getDpnum() {
		return dpnum;
	}
	public void setDpnum(String dpnum) {
		this.dpnum = dpnum;
	}
	
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	public String getNavName() {
		return navName;
	}
	public void setNavName(String navName) {
		this.navName = navName;
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
	public int getyCount() {
		return yCount;
	}
	public void setyCount(int yCount) {
		this.yCount = yCount;
	}
	public int getOrderBy() {
		return orderBy;
	}
	public void setOrderBy(int orderBy) {
		this.orderBy = orderBy;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getAcInfoIds() {
		return acInfoIds;
	}
	public void setAcInfoIds(String acInfoIds) {
		this.acInfoIds = acInfoIds;
	}
	public int getGwcNum() {
		return gwcNum;
	}
	public void setGwcNum(int gwcNum) {
		this.gwcNum = gwcNum;
	}
	
	
	
}

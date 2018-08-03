package com.cloudfy.model.phone;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 * 说明：商品明细类
 * @author Administrator
 * @createTime 2018年6月17日16:04:29
 * */
public class CommodityInfo implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private Date updateTime;
	private String acCode; //商品导航表code
	private String title;
	private String antistop; //关键词
	private String content; //内容
	private String hot; //热度
	private Float price;//价格
	private Float vipPrice; //vip价格
	private int num; //排序
	private String maxUrl; //大图路径
	private String miniUrl; //小图路径
	private int yCount;//销量 
	private int orderBy;//排序  0-不排序   1-最新出品    2-销售最高    3-价格实惠
	private int gwcNum;//购物车重复商品数量   默认1
	private String dpnum;
	
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	@Column(name = "update_time")
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
	@Column(name = "ac_code")
	public String getAcCode() {
		return acCode;
	}
	public void setAcCode(String acCode) {
		this.acCode = acCode;
	}
	
	@Column(name = "title")
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
	
	@Column(name = "num")
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	
	@Column(name = "max_url")
	public String getMaxUrl() {
		return maxUrl;
	}
	public void setMaxUrl(String maxUrl) {
		this.maxUrl = maxUrl;
	}
	
	@Column(name = "mini_url")
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
	
	@Column(name = "gwc_num")
	public int getGwcNum() {
		return gwcNum;
	}
	public void setGwcNum(int gwcNum) {
		this.gwcNum = gwcNum;
	}
	
	@Column(name = "dpnum")
	public String getDpnum() {
		return dpnum;
	}
	public void setDpnum(String dpnum) {
		this.dpnum = dpnum;
	}
   
	
	
	
}

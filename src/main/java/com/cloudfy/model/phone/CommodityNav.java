package com.cloudfy.model.phone;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
 * 说明：手机移动-商品类 
 * @author Administrator
 * @createTime 2018年6月17日16:04:29
 * */
public class CommodityNav implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private Date updateTime;
	private String navTitle; //标题
	private String navShort; //简称
	private String iconUrl; //图片地址
	private int num; //序号
	private int type; //类型 是否特殊处理 0-默认  1-幻灯片
	private String code; //编码
	private String dpnum; //店铺

	private List<CommodityInfo> commodityInfo;

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
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	@Column(name = "code")
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(name = "dpnum")
	public String getDpnum() {
		return dpnum;
	}

	public void setDpnum(String dpnum) {
		this.dpnum = dpnum;
	}

	public List<CommodityInfo> getCommodityInfo() {
		return commodityInfo;
	}

	public void setCommodityInfo(List<CommodityInfo> commodityInfo) {
		this.commodityInfo = commodityInfo;
	}

//	public List<CommodityInfo> getChangePic() {
//		return changePic;
//	}
//
//	public void setChangePic(List<CommodityInfo> changePic) {
//		this.changePic = changePic;
//	}
	
}

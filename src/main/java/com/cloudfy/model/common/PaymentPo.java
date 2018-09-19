package com.cloudfy.model.common;

import com.cloudfy.model.phone.CommodityInfo;

/**
 * 【功能说明】：微信支付，发起请求后端带参
 * 
 * */
public class PaymentPo {
	
	private String title;//支付主题
    private String code; //小程序登录CODE 
    private Integer allPrice; //结算总价
    private String goodSid;//商品编号
    private CommodityInfo[] cartMap;//商品集合
    
    
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public Integer getAllPrice() {
		return allPrice;
	}
	public void setAllPrice(Integer allPrice) {
		this.allPrice = allPrice;
	}
	public CommodityInfo[] getCartMap() {
		return cartMap;
	}
	public void setCartMap(CommodityInfo[] cartMap) {
		this.cartMap = cartMap;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getGoodSid() {
		return goodSid;
	}
	public void setGoodSid(String goodSid) {
		this.goodSid = goodSid;
	}
    
    
}

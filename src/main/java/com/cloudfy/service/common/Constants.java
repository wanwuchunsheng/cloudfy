package com.cloudfy.service.common;

/*
 * Copyright (C), 2014-2015, 以利真皮沙发厂
 * FileName: CccSgmConstants.java
 * Author:  万昌煌
 * Date:     2014年4月3日 下午13:00:00
 * Description: //模块目的、功能描述      
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
public interface Constants {

	/**
     *  提交返回提示：
     *  
     *   1-成功 
     *   2-失败 
     */
    public static final String RESULT_SUCESS = "1";
    public static final String RESULT_ERROR = "2";
    
    public static final String[] dpnums={"JH"};
    
    /**
     * 图片保存地址
     * 
     * RESULT_REALPATH 默认连接路径 -默认连接地址
     * RESULT_SAVE_IMG 图片保存、删除地址
     * 
     * 商品上传，保存压缩后图片的：
     * RESULT_SAVE_IMG_WIDTH-宽，
     * RESULT_SAVE_IMG_HEIGHT-高
     * 
     * */
    public static final String RESULT_REALPATH = "javascript:;";
    public static final String RESULT_SAVE_IMG = "E:/www2/zhangt-0b44449e649aee1e0164b519f6cd054b/webapp/images/";
    public static final String RESULT_REQ_IMG="https://www.cloudfy.cn/images/"; 
    public static final Integer RESULT_SAVE_IMG_WIDTH =500;
    public static final Integer RESULT_SAVE_IMG_HEIGHT =360;
    
    /**
     * 微信小程序支付参数
     * 
     * */
    public static final String APP_ID = "wxfe8ffc02189d8abd"; //微信注册ID
    public static final String APP_SECRET = "3504697a0f82636287c9d2ea196e6516";
    public static final String APP_KEY = "WanChangHuang1989n7y4r2222222222";
    public static final String MCH_ID = "1513651271";  //商户号
    public static final String URL_UNIFIED_ORDER = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    public static final String URL_NOTIFY = "http://192.168.43.209:8080/cloudfy/pay/buyOrder";
    
    
    /**
     * 分页
     * 
     * */
    public static final Integer ABOUT_INDEX = 0;
    
    
    
}

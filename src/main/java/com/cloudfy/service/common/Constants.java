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
     * 产品
     * 
     *  //1	店长推荐
		2	10元3本特惠区
		3	幻灯片
		4	店长推荐
		5	热卖商品
		15	时政新闻
		16	商业财经
		17	旅游
		6	美食
		7	时尚
		8	明星片
		9	明星写真
		10	文学文摘
		11	推理
		12	军事
		13	科技
		14	汽车
		
     * 
     */
    public static final Integer RESULT_SF = 111;
    public static final Integer RESULT_SZX = 1112;
    
    //public static final Integer RESULT_DZTJ = 1;
    public static final Integer RESULT_THQ = 2;
    public static final Integer RESULT_HDP = 3;
    public static final Integer RESULT_DNTJ = 4;
    public static final Integer RESULT_RMSP = 5;
    public static final Integer RESULT_SZXW = 15;
    public static final Integer RESULT_SYCJ = 16;
    public static final Integer RESULT_LY = 17;
    public static final Integer RESULT_MS = 6;
    public static final Integer RESULT_SJ = 7;
    public static final Integer RESULT_MXP = 8;
    public static final Integer RESULT_MXXZ = 9;
    public static final Integer RESULT_WXWZ = 10;
    public static final Integer RESULT_TL = 11;
    public static final Integer RESULT_JS = 12;
    public static final Integer RESULT_KJ = 13;
    public static final Integer RESULT_QC = 14;
    
    
    
    
    /**
     * 用户
     * 
     * 0-联系信息   1-管理员  2-普通会员   3-vip会员 
     * 
     */
    public static final String RESULT_LX = "0";
    public static final String RESULT_GL = "1";
    public static final String RESULT_PT = "2";
    public static final String RESULT_VIP = "3";
    
    
    /**
     * 新闻审核
     * 
     * 1-已发布   3-待审核  3-审核不通过  4-简介 5-咨询服务
     * 
     */
    public static final Integer ISPASS_YFB = 1;
    public static final Integer ISPASS_DSH = 2;
    public static final Integer ISPASS_SHBTG = 3;
    public static final Integer ISPASS_ABOUT = 4; // 4-简介
    public static final Integer ISPASS_CALLSV=5;
    
    /**
     * 简介 -右边新闻列表
     * 
     * 0-起始页
     * 7-每页7条 
     * 16-每页显示
     * 
     * */
    public static final Integer ABOUT_INDEX = 0;
    public static final Integer ABOUT_SIZE = 7;
    public static final Integer PAGE_SIZE = 16;
    
    
    /**
     * fix_code
     * 
     * 1001 商品分类
     * 1002 新闻分类
     * 
     * **/
    public static final Integer FIXCODE_1001 = 1001;
    public static final Integer FIXCODE_1002 = 1002;
    
    /**
     * cpStatus
     * 1-可用 
     * 2-不可用
     * 
     * **/
    public static final Integer RESULT_STATUS_Y = 1;
    public static final Integer RESULT_STATUS_N = 2;
    
}

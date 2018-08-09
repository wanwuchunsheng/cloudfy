package com.cloudfy.service.nav.impl;

import java.io.File;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloudfy.controller.common.tools.StringUtil;
import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.PictureAddressInfo;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.nav.ICommodityInfoService;
import com.ibm.framework.dal.client.IPaginationDalClient;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;

/**
 *  说明： 商品明细
 *  @author Administrator
 * 
 * */
@Service("cmInfoService")
public class CommodityInfoImpl implements ICommodityInfoService{
	
	Logger log=Logger.getLogger(this.getClass());
	
	@Autowired
    IPaginationDalClient dalClient;

	

    /**
     * 说明：商品明细
     * 
     * */
	@Override
	public PaginationResult<List<CommondityInfo>> queryCommondityInfo(
			CommondityInfo bean, Pagination pagination) {
		PaginationResult<List<CommondityInfo>> result = dalClient.queryForList("nav.queryCommondityInfo", bean,CommondityInfo.class, pagination);
        return result;
	}


	/**
	 * 说明：商品明细，添加-图片地址
	 * @author Administrator
	 * */
	@Override
	public void savePriceAddress(PictureAddressInfo vo) {
		dalClient.persist(vo);
	}

	/**
	 * 说明：保存商品明细
	 * @author Administrator
	 * */
	@Override
	public Integer saveCommondityInfo(CommondityInfo bean) {
		try {
			return dalClient.persist(bean).intValue();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}


	/**
	 * 说明：商品明细-跳转到修改页面
	 * 
	 * */
	@Override
	public CommondityInfo queryCommondityInfoByObj(CommondityInfo info) {
		return dalClient.queryForObject("nav.queryCommondityInfoByObj", info, CommondityInfo.class);
	}


	/**
	 * 说明：商品明细 －保存修改
	 * 
	 * */
	@Override
	public void updateCommondityInfo(CommondityInfo bean) {
		dalClient.dynamicMerge(bean);
	}


	/**
	 * 说明：商品明细 - 删除
	 * 
	 * */
	@Override
	public void deleteCommondityInfo(String[] str) {
		CommondityInfo bean=null;
		String url=Constants.RESULT_SAVE_IMG;
		File file=null;
		for(String s:str){
			if(!"".equals(s.trim())){
				bean=new CommondityInfo();
				bean.setId(Integer.parseInt(s));
			    CommondityInfo info=dalClient.queryForObject("nav.queryCommondityInfoByObj", bean, CommondityInfo.class);
			    //删除大图，小图
			    if(info!=null){
			    	//删除旧图片
			    	file = new File(url+info.getMaxUrl());//大图
					System.out.println("删除大图:"+url+info.getMaxUrl());
					if (file.exists()) {
						file.delete();
					}else{
						log.error("ERROR：商品明细-删除大图 ："+url+info.getMaxUrl());
					}
					file = new File(url+info.getMiniUrl());//小图
					System.out.println("删除小图:"+url+info.getMiniUrl());
					if (file.exists()) {
						file.delete();
					}else{
						log.error("ERROR：商品明细-删除小图 "+url+info.getMiniUrl());
					}
			    }
			    //删除富文本图片
			    Set<String> cont=StringUtil.getImgStr(info.getContent());
			    if(cont.size()>0){
			    	for(String st:cont){
			    		String nurl=url+"editor/"+st;
			    		System.out.println("删除富文本："+nurl);
			    		String nf=nurl.replace(Constants.RESULT_REQ_IMG3+"editor/", "");
			    		System.out.println("处理后："+nf);
			    		//删除富文本：E:/www2/zhangt-0b44449e649aee1e0164b519f6cd054b/webapp/images/editor/http://zhangt.java.cdnjsp.org/images/editor/a7248cd8-c8ff-466b-838a-00d5ff31c28f.jpeg
			    		file=new File(nf);
			    		if (file.exists()) {
							file.delete();
						}else{
							log.error("ERROR：商品明细-删除富文本  "+nf);
						}
			    	}
			    }
			    //删除图片对象
			    dalClient.execute("nav.deletePictureAddressById", info);
			    //删除明细对象
			    dalClient.execute("nav.deleteCommondityInfoById", info);
			}
		}
	}

	/**
	 * 说明：删除图片
	 * */
	@Override
	public void deletePricDddressById(CommondityInfo bean) {
		 //删除图片对象
	    dalClient.execute("nav.deletePictureAddressById", bean);
	}
	
	
}

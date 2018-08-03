package com.cloudfy.service.web.impl;


import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ibm.framework.dal.client.IPaginationDalClient;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.ibm.framework.dal.transaction.template.CallBackTemplate;
import com.cloudfy.model.web.CpDescription;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.model.web.WebMenu;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.web.IDescriptionService;
import com.cloudfy.service.web.INavigtionService;

@Service("descriptionSercvice")
public class DescriptionServiceImpl implements IDescriptionService{
	
	@Autowired
    IPaginationDalClient dalClient;

	
	/**
	 * [功能说明]:【功能说明】：商品管理 - 查询列表
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-父节点    2-子节点
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public PaginationResult<List<CpDescription>> queryDescriptionListPage(
			CpDescription vo, Pagination pagination) {
		PaginationResult<List<CpDescription>> result = dalClient.queryForList("description.queryDescriptionListPage", vo,CpDescription.class, pagination);
        return result;
	}

	/**
	 * [功能说明]:【功能说明】：查询商品管理-修改查询
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public CpDescription queryDescriptionById(CpDescription vo) {
		return dalClient.queryForObject("description.queryDescriptionById", vo, CpDescription.class);
	}

	@Override
	public void updateDescriptionById(CpDescription vo) {
		dalClient.execute("description.updateDescriptionById", vo);
		
	}

	
	/**
	 * [功能说明]:【功能说明】：商品管理 - 删除
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param ids - id
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public String deleteDescriptionById(final String ids) {
		dalClient.getTransactionTemplate().execute(new CallBackTemplate<Integer>() {
            @Override
            public Integer invoke() {
              String strs =ids.substring(0, ids.length()-1);
              String str[]=strs.split(",");
              for(int i=0;i<str.length;i++){
            	  CpDescription us= new CpDescription();
            	  String idt=str[i];
            	  us.setId(Integer.parseInt(idt));
            	  
            	  //查询
            	  us= dalClient.queryForObject("description.queryDescriptionById", us,CpDescription.class);
            	  String realPath=Constants.RESULT_SAVE_IMG; //获得服务器路径
            	  
            	  //删除图片
            	  File fileSaill = new File(realPath+us.getImgSaillPath()) ;
            	  if(fileSaill.exists() && fileSaill.isFile()){
            		  fileSaill.delete();
            	  }
            	  
            	  //删除大图片
            	  File fileBig = new File(realPath+us.getImgBigPath()) ;
            	  if(fileBig.exists() && fileBig.isFile()){
            		  fileBig.delete();
            	  }
            	  
            	  //删除大长图片
            	  File fileBig2 = new File(realPath+us.getImgBigPath2()) ;
            	  if(fileBig2.exists() && fileBig2.isFile()){
            		  fileBig2.delete();
            	  }
            	  
            	  //删除对象
            	  dalClient.execute("description.deleteDescriptionById", us);
              }
              return null;
           }
        });
        return null;
	}

	@Override
	public void saveImgNews(CpDescription vo) {
		//保存信息
	    dalClient.persist(vo);
	}

	
	
	
	
	
	
	
	
	
	
	

}

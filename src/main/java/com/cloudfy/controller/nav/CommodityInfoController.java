package com.cloudfy.controller.nav;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cloudfy.controller.common.BaseParams;
import com.cloudfy.controller.common.ImageUtil;
import com.cloudfy.controller.common.tools.DateUtil;
import com.cloudfy.controller.common.tools.StringUtil;
import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.CommondityNav;
import com.cloudfy.model.nav.PictureAddressInfo;
import com.cloudfy.model.page.DataTableRequest;
import com.cloudfy.model.page.DataTableResponse;
import com.cloudfy.model.sys.SysUserInfo;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.nav.ICommodityInfoService;
import com.google.gson.Gson;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.ibm.framework.web.controller.BaseController;

/**
 * 说明：商品明细
 * @author Administrator
 * */
@Controller
@RequestMapping("/web/nav")
public class CommodityInfoController extends BaseController{
	
	Logger log=Logger.getLogger(this.getClass());
	
	@Autowired
	ICommodityInfoService cmInfoService;

	
	/**
	 * 说明：商品明细-左导航跳转 
	 * @author Administrator
	 * @createTime 2018年6月11日22:48:33
	 * */
	@RequestMapping("gotoQueryInfoPage")
	public String gotoQueryInfoPage(HttpSession session, HttpServletRequest request){
		SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
		List<CommondityNav> list=BaseParams.getCnavAll().get(userInfo.getDpnum());
		//查询商品导航数据
		request.setAttribute("commondityNav",list);
		return "/web_data/nav/nav_query_list";
	}
	
	/**
	 * 说明：商品明细-集合查询
	 * @author Administrator
	 * @createTime 2018年6月11日22:48:33
	 * */
	@RequestMapping("queryNavInfoPage")
	@ResponseBody
	public DataTableResponse<CommondityInfo> queryNavPage(HttpSession session, DataTableRequest dataTable,CommondityInfo bean){
		try {
			SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
			bean.setDpnum(userInfo.getDpnum());
			Pagination pagination = new Pagination(dataTable.getiDisplayLength(), dataTable.getCurrentPage());
	        PaginationResult<List<CommondityInfo>> paginationResult = cmInfoService.queryCommondityInfo(bean,pagination);
	        return new DataTableResponse<CommondityInfo>(dataTable.getsEcho(), paginationResult);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR:查询商品详细异常!!!");
		}
		return null;
	}
	
	
	/**
	 * 说明：跳转商品明细
	 * @author Administrator
	 * @createTime 2018年6月11日22:48:33
	 * */
	@RequestMapping("gotoAddNavInfo")
	public String gotoAddNavInfo(HttpSession session, HttpServletRequest request){
		SysUserInfo userInfo= (SysUserInfo) session.getAttribute("userInfo");
		//查询商品导航数据
		List<CommondityNav> list=BaseParams.getCnavAll().get(userInfo.getDpnum());
		//查询商品导航数据
		request.setAttribute("commondityNav",list);
		return "/web_data/nav/nav_query_add";
		
	}
	
	/**
	 * 商品明细-修改跳转
	 * 
	 * */
	@RequestMapping("gotoNavUpdatePage")
	public String queryNavigationById(HttpSession session, HttpServletRequest request,CommondityInfo info){
		SysUserInfo userInfo= (SysUserInfo) session.getAttribute("userInfo");
		List<CommondityNav> list=BaseParams.getCnavAll().get(userInfo.getDpnum());
		request.setAttribute("commondityNav",list);
		CommondityInfo cnav=cmInfoService.queryCommondityInfoByObj(info);
		//查询详细
		request.setAttribute("cnav", cnav );
		return "/web_data/nav/nav_query_update";
	}
	
	
	/**
	 * 说明：商品明细－修改保存
	 * 
	 * */
	@RequestMapping("updateCommondityInfo")
	@ResponseBody
	public String updateCommondityInfo(HttpSession session,HttpServletRequest request, CommondityInfo bean,@RequestParam("files") MultipartFile[] files){
		try {
			//判断是否修改图片
			String url=Constants.RESULT_SAVE_IMG;
			if(files.length>0){
				//删除旧图片
				File maxfile = new File(url+bean.getMaxUrl2());//大图
				File minifile = new File(url+bean.getMiniUrl2());//小图
				if (maxfile.exists()) {
					maxfile.delete();
				}
				if (minifile.exists()) {
					minifile.delete();
				}
				// 删除图片表
				cmInfoService.deletePricDddressById(bean);
			}
			/**
			 * 验证新文本，旧文本 
			 *   对比图片是否有新增或者删除操作
			 *   新增图片，添加
			 *   删除图片，将服务器本地图片删除
			 * */
			//旧文本
			Set<String> cont2=StringUtil.getImgStr(bean.getContent2());
			System.out.println("旧富文本"+cont2.size());
			if(cont2.size()>0){
				Set<String> cont=StringUtil.getImgStr(bean.getContent());
				for(String s2:cont2){
					boolean flag=true;//默认是要删除旧图片结合
					System.out.println("第一个集合地址："+s2);
					if(cont.contains(s2)){
						flag=false;//循环遍历第一个集合，发现新集合有匹配，跳过删除；
					}
					if(flag){
						//进入删除
						String nurl=url+"editor/"+s2;
						System.out.println("修改删除富文本："+nurl);
						//删除富文本：E:/www2/zhangt-0b44449e649aee1e0164b519f6cd054b/webapp/images/editor/http://zhangt.java.cdnjsp.org/images/editor/a7248cd8-c8ff-466b-838a-00d5ff31c28f.jpeg
						String nf=nurl.replace(Constants.RESULT_REQ_IMG3+"editor/", "");
						System.out.println("处理后："+nf);
						File nfile = new File(nf);//删除富文本图片
						if (nfile.exists()) {
							nfile.delete();
						}else{
							log.error("ERROR：商品明细-修改，删除富文本  "+nf);
						}
					}
				}
			}
			/**
			 * 处理好冗余数据后，
			 *   1：新增上传图片
			 *   2：修改数据库记录
			 * */
			
			SysUserInfo userInfo= (SysUserInfo) session.getAttribute("userInfo"); 
        	bean.setUpdateTime(new Date());
        	bean.setUpdateUserId(userInfo.getId());
        	cmInfoService.updateCommondityInfo(bean);//保存详细
        	if(files.length>0){ 
	        	Integer infoId=bean.getId();
	        	PictureAddressInfo vo=null;
	        	//循环获取file数组中得文件  
			    for(int i = 0;i<files.length;i++){  
			    	vo=new PictureAddressInfo();
			        MultipartFile filedata = files[i];
			        if(!filedata.isEmpty()){
			            // 获取图片的文件名
			            String fileName = filedata.getOriginalFilename();
			            // 获取图片的扩展名
			            String extensionName = fileName.substring(fileName.lastIndexOf(".") + 1);
			            // 新的图片文件名 = 获取时间戳+"."图片扩展名
			            String newFileName =DateUtil.getNowDateTime("yyyyMMddHHmmssSSS")+ "." + extensionName;
			            //小图名称
			            String miniName=i+"_mini_"+newFileName;
			            String maxName=i+"_max_"+newFileName;
			            //大图名称
		            	vo.setMiniUrl(miniName);//小图名
		            	vo.setMaxUrl(maxName);//大图名
		            	//保存压缩大图/小图
		            	joinFiles(request, filedata, miniName,maxName);
			            
			            //保存图片表
			            vo.setNum(i);
			            vo.setMiniUrl(miniName);
			            vo.setMaxUrl(maxName);
			            vo.setCreateTime(new Date());
			            vo.setCreateUserId(userInfo.getId());
			            vo.setAcInfoId(infoId);
			            cmInfoService.savePriceAddress(vo);
			        }
			    }
	        }
		    return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Constants.RESULT_ERROR;
	}
	
	/**
	 * 说明：商品明细 - 删除
	 * deleteNavigationById
	 * @param ids:多个id
	 * 批量删除
	 * */
	@RequestMapping("deleteCommondityInfo")
	@ResponseBody
	public String deleteCommondityInfo(String ids){
	    try {
		   String[] str=ids.split(",");
		   cmInfoService.deleteCommondityInfo(str);
	       return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			e.printStackTrace();
		}
	    return Constants.RESULT_ERROR;
	}
	
	/**
	 * 说明：添加商品明细
	 * @author Administrator
	 * 1：保存商品明细
	 * 2：保存图片
	 */
	@RequestMapping("addNavInfo")
	@ResponseBody
	public void addNavInfo(HttpSession session, HttpServletRequest request,HttpServletResponse response,
			CommondityInfo bean,@RequestParam("files") MultipartFile[] files){
		Gson josn = new Gson();
		PictureAddressInfo vo=null;
		String bdPath="";
		SysUserInfo userInfo= (SysUserInfo) session.getAttribute("userInfo");
		try {
			//判断file数组不能为空并且长度大于0  
	        if(files!=null && files.length>0){ 
	        	//保存商品明细
	        	bean.setCreateTime(new Date());
	        	bean.setCreateUserId(userInfo.getId());
	        	bean.setUpdateTime(bean.getCreateTime());
	        	bean.setUpdateUserId(bean.getCreateUserId());
	        	bean.setDpnum(userInfo.getDpnum());
	        	//保存详细
	        	Integer infoId=cmInfoService.saveCommondityInfo(bean);
	        	//循环获取file数组中得文件  
			    for(int i = 0;i<files.length;i++){  
			    	vo=new PictureAddressInfo();
			        MultipartFile filedata = files[i];
			        if(!filedata.isEmpty()){
			            // 获取图片的文件名
			            String fileName = filedata.getOriginalFilename();
			            // 获取图片的扩展名
			            String extensionName = fileName.substring(fileName.lastIndexOf(".") + 1);
			            // 新的图片文件名 = 获取时间戳+"."图片扩展名
			            String newFileName =DateUtil.getNowDateTime("yyyyMMddHHmmssSSS")+ "." + extensionName;
			            //小图名称
			            String miniName=i+"_mini_"+newFileName;
			            String maxName=i+"_max_"+newFileName;
			            //大图名称
		            	vo.setMiniUrl(miniName);//小图名
		            	vo.setMaxUrl(maxName);//大图名
		            	//保存压缩小图
		            	bdPath=joinFiles(request, filedata, miniName,maxName);
			            //保存无压缩图片
			            //saveFile(maxName, filedata); 
			            
			            //保存图片表
			            vo.setNum(i);
			            vo.setMiniUrl(miniName);
			            vo.setMaxUrl(maxName);
			            vo.setCreateTime(new Date());
			            vo.setCreateUserId(userInfo.getId());
			            vo.setAcInfoId(infoId);
			            cmInfoService.savePriceAddress(vo);
			        }
			    }
	        }else{
	        	this.ajaxJson(response, josn.toJsonTree(Constants.RESULT_ERROR).toString());
	        }
		} catch (Exception e) {
			 e.printStackTrace();
		}
	    this.ajaxJson(response, josn.toJsonTree(Constants.RESULT_SUCESS).toString());
	}
	
	
	/**
	 * 获得上传，保存在本地工程文件
	 * @1/保存原图片
	 * @2/根据原图地址，保存固定宽高文件
	 * */
	public String joinFiles(HttpServletRequest request,MultipartFile filedata,String fileName,String maxName){
		//获得工程路径 
    	//String path = request.getSession().getServletContext().getRealPath("upload");
    	//获得存储图片路径
    	String path = Constants.RESULT_SAVE_IMG;
        File targetFile = new File(path, maxName);  //创建文件夹
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        //保存文件至工程
        try {
        	filedata.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
       String newPath=path+maxName;
        String outFilePath=Constants.RESULT_SAVE_IMG+fileName;
        Integer width=Constants.RESULT_SAVE_IMG_WIDTH;
        Integer height=Constants.RESULT_SAVE_IMG_HEIGHT;
        //压缩后保存
        ImageUtil.Tosmallerpic(newPath, outFilePath, width,height);
        
        return newPath;
	}
	
	
	/**
     * 功能说明：图片保存
     * 
     * @time 2015-2-20 21:38:11
     * @author v_wanchanghuang
     * 
     * */
    private void saveFile(String newFileName, MultipartFile filedata) {
    	FileOutputStream out=null;
        try {
        	//获得存储图片路径
        	String path = Constants.RESULT_SAVE_IMG;
            /* 构建文件目录 */
            File fileDir = new File(path);
            if (!fileDir.exists() && !fileDir.isDirectory()) {
                fileDir.mkdirs();
            }
            out = new FileOutputStream(path + "\\"+ newFileName);
            // 写入文件
            out.write(filedata.getBytes());
           
        } catch (Exception e) {
            e.printStackTrace();
        }finally{
        	 //关闭流
            try {
				out.flush();
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
        }
     }

}

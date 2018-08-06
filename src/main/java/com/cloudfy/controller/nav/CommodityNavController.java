package com.cloudfy.controller.nav;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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

import com.google.gson.Gson;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.ibm.framework.web.controller.BaseController;
import com.cloudfy.controller.common.ImageUtil;
import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.PictureAddressInfo;
import com.cloudfy.model.page.DataTableRequest;
import com.cloudfy.model.page.DataTableResponse;
import com.cloudfy.model.sys.SysUserInfo;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.nav.ICommondityNavService;

/**
 * 说明：商品导航
 * @author Administrator
 * */
@Controller
@RequestMapping("/web/nav")
public class CommodityNavController extends BaseController{
	
	Logger log=Logger.getLogger(this.getClass());
	
	@Autowired
	ICommondityNavService commondityNavService;
	
	/**
	 * 说明：跳转页-跳转到商品导航页
	 * @author Administrator
	 * @createTime 2018年6月11日22:48:33
	 * */
	@RequestMapping("gotoQueryNavPage")
	public String gotoQueryNavPage(HttpSession session, HttpServletRequest request){
		try {
			SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
			if(userInfo!=null){
				//查询商品导航数据
				request.setAttribute("commondityNav",commondityNavService.queryCommondityNav(userInfo)) ;
				return "/web_data/nav/nav_query_list";
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("ERROR:跳转商品导航页面异常!!!");
		}
		return "/web_data/error/405"; //跳转错误页面
	}
	
	/**
	 * 说明：跳转页-跳转到商品导航页
	 * @author Administrator
	 * @createTime 2018年6月11日22:48:33
	 * */
	@RequestMapping("queryNavInfoPage")
	@ResponseBody
	public DataTableResponse<CommondityInfo> queryNavPage(HttpSession session, DataTableRequest dataTable,CommondityInfo bean){
		try {
			SysUserInfo userInfo=(SysUserInfo) session.getAttribute("userInfo");
			if(userInfo!=null){
				bean.setDpnum(userInfo.getDpnum());
				Pagination pagination = new Pagination(dataTable.getiDisplayLength(), dataTable.getCurrentPage());
		        PaginationResult<List<CommondityInfo>> paginationResult = commondityNavService.queryCommondityInfo(bean,pagination);
		        return new DataTableResponse<CommondityInfo>(dataTable.getsEcho(), paginationResult);
			}
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
		if(userInfo!=null){
			//查询商品导航数据
			request.setAttribute("commondityNav",commondityNavService.queryCommondityNav(userInfo)) ;
			return "/web_data/nav/nav_query_add";
		}
		return "/web_data/error/405"; //跳转错误页面
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
	        if(files!=null && files.length>0 && userInfo!=null){ 
	        	//保存商品明细
	        	bean.setCreateTime(new Date());
	        	bean.setCreateUserId(userInfo.getId());
	        	bean.setUpdateTime(bean.getCreateTime());
	        	bean.setUpdateUserId(bean.getCreateUserId());
	        	bean.setDpnum(userInfo.getDpnum());
	        	//保存详细
	        	Integer infoId=commondityNavService.saveCommondityInfo(bean);
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
			            String newFileName = resultNowTime()+ "." + extensionName;
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
			            commondityNavService.savePriceAddress(vo);
			        }
			    }
			    try {
			    	//删除备份图片
				    System.out.println("删除图片:"+bdPath);
				    /*File file2=new File(bdPath);
				    file2.delete();*/
				    System.out.println("删除成功!!!");
				} catch (Exception e) {
					System.out.println("删除图片异常!!!!!");
					e.printStackTrace();
					
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
	 * 功能说明：获得当前时间  20150520211600
	 * 
	 * 
	 * 
	 * */
	public String resultNowTime(){
		Date currentTime = new Date();
	   SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	   String dateString = formatter.format(currentTime);
	   return dateString;
	}
	
	
	/**
	 * 获得上传，保存在本地工程文件
	 * 
	 * 
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
            System.out.println(newFileName+"     242");
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

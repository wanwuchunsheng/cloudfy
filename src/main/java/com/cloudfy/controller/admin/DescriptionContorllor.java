/**
 * 说明：商品管理 
 * 时间：2015年5月16日 08:32:55
 * 
 */
package com.cloudfy.controller.admin;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;
import com.ibm.framework.web.controller.BaseController;
import com.cloudfy.controller.common.ImageUtil;
import com.cloudfy.model.common.SysFixCode;
import com.cloudfy.model.page.DataTableRequest;
import com.cloudfy.model.page.DataTableResponse;
import com.cloudfy.model.web.CpDescription;
import com.cloudfy.model.web.SuperUserVo;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.common.ICommonService;
import com.cloudfy.service.web.IDescriptionService;


/**
 * @author v_wanchanghuang
 *
 * @time 2015年5月16日 08:31:13
 */
@Controller
@RequestMapping("/decription")
public class DescriptionContorllor extends BaseController{
	
	/**
	 * web dal
	 * 
	 * */
	@Autowired
	private IDescriptionService descriptionSercvice;
	
	@Autowired
	private ICommonService commonService;
	
	

	/**
	 * [功能说明]: 产品、商品管理
	 * 
	 * @time 2015年4月17日 11:25:52
	 * @author v_wanchanghuang
	 *  
	 * */
	@RequestMapping("/queryDescriptionListPage")
    @ResponseBody
    public DataTableResponse<CpDescription> queryDescriptionListPage(CpDescription vo, DataTableRequest dataTable) {
        // 设置分业参数
        Pagination pagination = new Pagination(dataTable.getiDisplayLength(), dataTable.getCurrentPage());
        PaginationResult<List<CpDescription>> paginationResult = descriptionSercvice.queryDescriptionListPage(vo,pagination);
        return new DataTableResponse<CpDescription>(dataTable.getsEcho(), paginationResult);
    }
	
	
	/**
	 * [功能说明]:【功能说明】：查询商品管理-修改查询
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param 
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/queryDescriptionById")
    public String queryDescriptionById(Model model,CpDescription vo) {
		CpDescription upDescription = descriptionSercvice.queryDescriptionById(vo);
        model.addAttribute("upDescription", upDescription);
        List<SysFixCode> fixdCode1001=commonService.queryFixCodeByCodeList(Constants.FIXCODE_1001);
		model.addAttribute("fixdCode1001",fixdCode1001);
        return "web_data/description/description_query_update";
    }
	
	
	/**
	 * [功能说明]:【功能说明】：商品管理 - 保存 修改
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-成功   2-失败
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/updateDescriptionById")
	@ResponseBody
    public String updateDescriptionById(CpDescription vo,HttpServletRequest request) {
		try {
            //获得当前用户信息
            SuperUserVo user=  (SuperUserVo) request.getSession().getAttribute("user"); 
            vo.setUpdateUser(user.getuNickname());
            vo.setUpdateUserId(user.getId());
            vo.setUpdateTime(new Date());
			descriptionSercvice.updateDescriptionById(vo);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			return Constants.RESULT_ERROR;
		}
       
    }
	
	/**
	 * [功能说明]:【功能说明】：商品管理- 删除
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-成功   2-失败
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/deleteDescriptionById")
	@ResponseBody
    public String deleteDescriptionById(Model model,String ids) {
		try {
			descriptionSercvice.deleteDescriptionById(ids);
			return Constants.RESULT_SUCESS;
		} catch (Exception e) {
			// TODO: handle exception
			return Constants.RESULT_ERROR;
		}
       
    }
	
	
	/**
	 * [功能说明]:【功能说明】：商品管理 - 跳转 添加
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  1-父节点    2-子节点
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/addDescriptionByObj")
    public String addDescriptionByObj(Model model,CpDescription webm) {
		List<SysFixCode> fixdCode1001=commonService.queryFixCodeByCodeList(Constants.FIXCODE_1001);
		model.addAttribute("fixdCode1001",fixdCode1001);
       return "web_data/description/description_query_add";
    }
	
	
	
	
	
	/**
	 * [功能说明]:【功能说明】：商品管理 - 保存  添加
	 * 
	 * @time 2015-4-14 13:22:07
	 * @param  
	 * @author  v_wanchanghuang
	 * 
	 * */
	@RequestMapping("/addDescriptionInputFileByObj")
    public void addDescriptionInputFileByObj(@RequestParam("files") MultipartFile[] files,HttpServletRequest request,
    		HttpServletResponse response,CpDescription vo ){
		Gson josn = new Gson();
		String bdPath="";
		try {
			//判断file数组不能为空并且长度大于0  
	        if(files!=null && files.length>0){  
	        	//循环获取file数组中得文件  
			    for(int i = 0;i<files.length;i++){  
			        MultipartFile filedata = files[i];
			        if(!filedata.isEmpty()){
			            // 获取图片的文件名
			            String fileName = filedata.getOriginalFilename();
			            // 获取图片的扩展名
			            String extensionName = fileName.substring(fileName.lastIndexOf(".") + 1);
			            // 新的图片文件名 = 获取时间戳+"."图片扩展名
			            String newFileName = resultNowTime()+ "." + extensionName;
			            if(i==0){
			            	vo.setImgSaillPath(newFileName);//小图名
			            	vo.setImgBigPath(i+"_"+newFileName);//大图名
			            	//保存压缩小图
			            	bdPath=joinFiles(request, filedata, newFileName);
			            }else{
			            	vo.setImgBigPath2(i+"_"+newFileName);
			            }
			            //保存无压缩图片
			            saveFile(i+"_"+newFileName, filedata); 
			        }
			    }
			    //获得时间
			    Date time= new Date();
			    vo.setCreateTime(time);
			    vo.setUpdateTime(time);
			    //获得当前用户信息
			    SuperUserVo user=  (SuperUserVo) request.getSession().getAttribute("user"); 
			    vo.setCreateUser(user.getuName());
			    vo.setCreateUserId(user.getId());
			    vo.setUpdateUser(user.getuNickname());
			    vo.setUpdateUserId(user.getId());
			    //初始默认购买数，收藏数为0；
			    vo.setScNumber(0); 
			    vo.setGmNumber(0);
			    //保存基本信息
			    descriptionSercvice.saveImgNews(vo);
			    //删除本地图片
			    File file=new File(bdPath);
			    file.delete();
	        }else{
	        	this.ajaxJson(response, josn.toJsonTree(Constants.RESULT_ERROR).toString());
	        }
	       
		} catch (Exception e) {
			 e.printStackTrace();
			 //报异常，删除图片
			 deleteImgs(Constants.RESULT_SAVE_IMG, vo);
			 this.ajaxJson(response, josn.toJsonTree(Constants.RESULT_ERROR).toString());
			 
		}
	    this.ajaxJson(response, josn.toJsonTree(Constants.RESULT_SUCESS).toString());
     }
	
	
	
	public void deleteImgs(String realPath,CpDescription us){
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
	}
	
	
	/**
	 * 功能说明：获得当前时间  20150520211600
	 * 
	 * 
	 * 
	 * */
	public String resultNowTime(){
		Date currentTime = new Date();
	   SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
	   String dateString = formatter.format(currentTime);
	   return dateString;
	}
	
	
	/**
	 * 获得上传，保存在本地工程文件
	 * 
	 * 
	 * */
	public String joinFiles(HttpServletRequest request,MultipartFile filedata,String fileName){
		//获得工程路径 
    	String path = request.getSession().getServletContext().getRealPath("upload");
        File targetFile = new File(path, fileName);  //创建文件夹
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        //保存文件至工程
        try {
        	filedata.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        String newPath=path+"\\"+fileName;
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
        try {
        	//获得存储图片路径
        	String path = Constants.RESULT_SAVE_IMG;
            /* 构建文件目录 */
            File fileDir = new File(path);
            if (!fileDir.exists() && !fileDir.isDirectory()) {
                fileDir.mkdirs();
            }
            FileOutputStream out = new FileOutputStream(path + "\\"+ newFileName);
            // 写入文件
            out.write(filedata.getBytes());
            //关闭流
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
     }
	
	
}

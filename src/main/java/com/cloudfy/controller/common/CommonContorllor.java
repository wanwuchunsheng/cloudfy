package com.cloudfy.controller.common;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.cloudfy.model.common.SysFixCode;
import com.cloudfy.service.common.Constants;
import com.cloudfy.service.common.ICommonService;

@Controller
@RequestMapping("/common")
public class CommonContorllor {
	
	@Autowired
	private ICommonService commonService;
	
	/**
	 * 【功能说明】：查询商品         -类别   
	 * 
	 * @time 2015年5月17日 13:54:45
	 * @author Administrator
	 * 
	 * */
	@RequestMapping("/queryFixCodeList")
	@ResponseBody
	public String getMenuAndBottomResult(Model model,HttpServletResponse response){
		Integer codeType = Constants.FIXCODE_1001;
		List<SysFixCode> fixCodeList= commonService.queryFixCodeByCodeList(codeType);
		Gson gson = new Gson(); 
        String json = gson.toJson(fixCodeList);
        return json;
	}

}

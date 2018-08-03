package com.cloudfy.service.common.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.framework.dal.client.IPaginationDalClient;
import com.cloudfy.model.common.SysFixCode;
import com.cloudfy.service.common.ICommonService;

@Service("commonService")
public class CommonServiceImpl implements ICommonService{
	
	@Autowired
    IPaginationDalClient dalClient;

	/**
	 * [功能说明]:【功能说明】：fixcode  查询
	 * 
	 * @time 2015年5月17日 13:32:57
	 * @param  codeType  - 类别
	 * @author  v_wanchanghuang
	 * 
	 * */
	@Override
	public List<SysFixCode> queryFixCodeByCodeList(Integer codeType) {
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("codeType", codeType);
		return dalClient.queryForList("common.queryFixCodeByCodeType", map,SysFixCode.class);
	}
	
	


}

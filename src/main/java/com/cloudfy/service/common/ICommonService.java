package com.cloudfy.service.common;

import java.util.List;

import com.cloudfy.model.common.SysFixCode;

public interface ICommonService {
	
	//产品类别
	List<SysFixCode> queryFixCodeByCodeList(Integer codeType);

}

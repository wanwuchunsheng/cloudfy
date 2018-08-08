package com.cloudfy.service.nav;

import java.util.List;

import com.cloudfy.model.nav.CommondityInfo;
import com.cloudfy.model.nav.PictureAddressInfo;
import com.ibm.framework.dal.pagination.Pagination;
import com.ibm.framework.dal.pagination.PaginationResult;

public interface ICommondityNavService {

	PaginationResult<List<CommondityInfo>> queryCommondityInfo(
			CommondityInfo bean, Pagination pagination);

	void savePriceAddress(PictureAddressInfo vo);

	Integer saveCommondityInfo(CommondityInfo bean);

	//商品明细-修改跳转
	CommondityInfo queryCommondityInfoByObj(CommondityInfo info);

	void updateCommondityInfo(CommondityInfo bean);

	//商品明细-删除
	void deleteCommondityInfo(String[] str);

	//删除图片表
	void deletePricDddressById(CommondityInfo bean);

}

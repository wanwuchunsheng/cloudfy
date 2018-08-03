package com.cloudfy.model.page;

import java.io.Serializable;

import javax.persistence.Column;

import com.cloudfy.service.common.Constants;

public class WebPage implements Serializable{
	
	
	private Integer index = Constants.ABOUT_INDEX;// 当前页，默认第0页
	private Integer size = 16; //Constants.PAGE_SIZE;// 每页几条，默认20条
	private Integer maxCount;// 数据表中的记录总数--20
	private Integer maxPage; //总页数


	

	public Integer getMaxPage() {
		return maxCount % size == 0 ? maxCount / size : maxCount / size + 1;
	}

	public void setMaxPage(Integer maxPage) {
		this.maxPage = maxPage;
	}

	public Integer getIndex() {
		return index;
	}

	public void setIndex(Integer index) {
		this.index = index;
	}

	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	public Integer getMaxCount() {
		return maxCount;
	}

	public void setMaxCount(Integer maxCount) {
		this.maxCount = maxCount;
	}
}

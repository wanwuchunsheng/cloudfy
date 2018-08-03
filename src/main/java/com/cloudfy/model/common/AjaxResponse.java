/*
 * Copyright (C), 2013-2014, 上汽集团
 * FileName: CommonParameter.java
 * Author:   zhangerwei
 * Date:     2014年1月21日 上午9:05:11
 * Description: datatable查询公共体参数实体类
 * History: //修改记录
 * <author>      <time>      <version>    <desc>
 * 修改人姓名             修改时间            版本号                  描述
 */
package com.cloudfy.model.common;

import java.util.HashMap;
import java.util.Map;

/**
 * Ajax返回公共类 <br>
 * 〈功能详细描述〉
 *
 * @author 万昌煌
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class AjaxResponse {
    public static int SUCCESS = 1;
    public static int ERROR = 2;
    private int code;
    private String message;

    private Map<String, Object> data = new HashMap<String, Object>();

    public AjaxResponse() {
        this.code = AjaxResponse.SUCCESS;
    }

    public AjaxResponse(int code) {
        this.code = code;
    }

    public AjaxResponse(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

}

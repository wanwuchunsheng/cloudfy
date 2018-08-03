/**
 * 
 */
package com.cloudfy.model.web;


/**
 * @author v_wanchanghuang
 *
 * @version 2015年1月23日  下午9:58:27
 */
public class SuperUserVo extends User{
	
	private String deptarea;
	private String deptname;
	private String rolename;
	private String levels;
	public String getDeptarea() {
		return deptarea;
	}
	public void setDeptarea(String deptarea) {
		this.deptarea = deptarea;
	}
	public String getDeptname() {
		return deptname;
	}
	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	public String getLevels() {
		return levels;
	}
	public void setLevels(String levels) {
		this.levels = levels;
	}
	
	
	
	
}

package com.chen.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Contact implements Serializable {
	private Long id;
	private String name;
	private String nameSpell;
	private String phone;
	private String address;
	private Date birthday;
	private String weixin;
	private Long QQ;
	private String mark1;
	private Long mark2;
	private Date mark3;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getNameSpell() {
		return nameSpell;
	}
	public void setNameSpell(String nameSpell) {
		this.nameSpell = nameSpell;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public String getWeixin() {
		return weixin;
	}
	public void setWeixin(String weixin) {
		this.weixin = weixin;
	}

	public String getMark1() {
		return mark1;
	}
	public void setMark1(String mark1) {
		this.mark1 = mark1;
	}
	public Long getMark2() {
		return mark2;
	}
	public void setMark2(Long mark2) {
		this.mark2 = mark2;
	}
	public Date getMark3() {
		return mark3;
	}
	public void setMark3(Date mark3) {
		this.mark3 = mark3;
	}
	public long getQQ() {
		return QQ;
	}
	public void setQQ(long qQ) {
		QQ = qQ;
	}
}

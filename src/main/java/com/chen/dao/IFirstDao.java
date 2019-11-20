package com.chen.dao;

import org.springframework.stereotype.Repository;

import com.chen.model.Contact;

@Repository("firstDao")
public interface IFirstDao {
	public Contact FindById(long id);
}
package com.chen.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chen.dao.IFirstDao;
import com.chen.model.Contact;
import com.chen.service.IFirstService;

@Service("firstService")
public class FirstServiceImpl implements IFirstService {
	@Autowired
	private IFirstDao firstDao;
	
	public Contact FindById(long id) {
		
		return firstDao.FindById(id);
	}

}

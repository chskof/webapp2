package com.chen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.chen.model.Contact;
import com.chen.service.IFirstService;

@RequestMapping("/contact/")
@Controller
public class ContactController {
	@Autowired
	private IFirstService firstService;
	
	//页面跳转
	@RequestMapping("/queryList.do")
	public ModelAndView queryList(String test) {
		System.out.println(test);
		ModelAndView mav = new ModelAndView("success");
		return mav;
	}
	
	//Ajax数据交互
	@RequestMapping("/find.do")
	@ResponseBody
	public Contact findById() {
        Contact person = firstService.FindById(1);
        return person;
	}
	

}

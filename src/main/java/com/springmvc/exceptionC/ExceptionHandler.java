/**
 * @author wzyn
 * 2017年8月25日
 * ExceptionHandler.java
 */
package com.springmvc.exceptionC;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author 王正毅男
 * @date 2017年8月25日
 * @file com.springmvc.exceptionC.ExceptionHandler.java
 * @content 
 */
public class ExceptionHandler implements HandlerExceptionResolver {

	/* (non-Javadoc)
	 * @see org.springframework.web.servlet.HandlerExceptionResolver#resolveException(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, java.lang.Exception)
	 */
	@Override
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
		// TODO Auto-generated method stub
		System.out.println("***********************系统拦截下异常SSS");
		System.out.println(ex);
		System.out.println("***********************系统拦截下异常EEE");
		return null;
	}

}

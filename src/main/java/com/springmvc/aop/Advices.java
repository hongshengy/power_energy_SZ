/**
 * @author wzyn
 * 2017年8月25日
 * Advices.java
 */
package com.springmvc.aop;

import org.aspectj.lang.JoinPoint;

/**
 * @author 王正毅男
 * @date 2017年8月25日
 * @file com.springmvc.aop.Advices.java
 * @content 
 */
public class Advices {

	public void before(JoinPoint jp){
        //System.out.println(jp.getSignature().getName()+"----------调用前----------");
		System.out.println(jp.getSignature().getName().toString()+"调用前执行");
		if(jp.getSignature().getName().toString().equals("insertInfo")){
			System.out.println("开始插入");
		}
    }
    
    public void after(JoinPoint jp){
    	/*if(jp.getSignature().getName().toString().equals("insertM") || jp.getSignature().getName().toString().equals("updateM")){
    		System.out.println("执行预警数据库操作");
    	}*/
        //System.out.println(jp.getSignature().getName()+"----------调用后----------");
    }
}

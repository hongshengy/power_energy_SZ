package com.springmvc.tools;

public class Tools {
    public static boolean isEmpty(String str){
        return null == str || "".equals(str) || "null".equals(str);
    }

    public static boolean isEmpty(Object obj){
        return null == obj;
    }

    public static boolean useListIndex(String[] arr,String targetValue){
        for(int ai = 0; ai< arr.length;ai++){
            if(arr[ai].indexOf(targetValue)>-1)
                return true;
        }
        return false;
    }
}

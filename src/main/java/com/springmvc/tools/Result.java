package com.springmvc.tools;

import java.util.List;
import java.util.Map;

public class Result {
    public String code;

    public String msg;

    public List<Map> resultMap;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public List<Map> getResultMap() {
        return resultMap;
    }

    public void setResultMap(List<Map> resultMap) {
        this.resultMap = resultMap;
    }
}

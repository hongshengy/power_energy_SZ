package com.springmvc.controller;

import com.springmvc.dataSource1service.DataSource1SystemService;
import com.springmvc.dataSource2service.DataSource2SystemService;
import com.springmvc.tools.MD5;
import com.springmvc.tools.Result;
import com.springmvc.tools.Tools;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.ArrayUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

@Controller
@RequestMapping("/system")
public class SystemContorller {

    private static final ResourceBundle bundle = ResourceBundle.getBundle("conf.system");

    //    默认从第一个数据源中取用户信息
    @Autowired
    private DataSource1SystemService dataSourcedao1;

    //    第二个数据源
    @Autowired
    private DataSource2SystemService dataSourcedao2;

    /**
     * 统一的数据请求controller
     * 将逻辑全部放到service层，事物回滚和阅读方便点
     *
     * @param sql
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/data")
    @ResponseBody
    public String getRequestData(@RequestParam("sql") String sql, HttpServletRequest request, HttpServletResponse response) {
//        返回对象封装
        Map resutMapDom = new HashMap();
        Result rs = new Result();

//        封装requestParameter对象
        Map requestMap = new HashMap();

//        用户基本信息
        Map userInfo = (Map) request.getSession().getAttribute("userInfo");

//        存储已执行的sql的结果集
        Map ResultSqlDataSet = new HashMap();

//        已执行的sql结果
        List<Map> resultMap = new ArrayList<>();

//        预处理sql流程
        String[] sqlArray = null;

        if (sql.contains("$recursion")) {
            String resultAnalysisStr = request.getParameter("pageRecursionJsonStr");

            if (!Tools.isEmpty(resultAnalysisStr)) {
                JSONObject analysisJson = JSONObject.fromObject(resultAnalysisStr);

                List<Map> toDoSqlList = this.recursion(new ArrayList<Map>(), analysisJson);
//                按照jsonArray格式进行倒序处理
                Collections.reverse(toDoSqlList);

//        递归后得出所有的待执行sql
//        sql__RoleInfoMapper.selectInfo
//        user_Id__$userId                                                  //作为参数
//
//        sql__RoleJurisdictionInfoMapper.selectInfo
//        role_Id__@sql->RoleInfoMapper.selectInfo.id                       //作为参数
//
//        sql__MenuInfoMapper.selectInfo
//        More__Menu_ids                                                    //作为参数
//        MenuInfo_id__more                                                 //作为参数
//        Menu_ids__@sql->RoleJurisdictionInfoMapper.selectInfo.meun_Id     //作为参数

                for (Map row : toDoSqlList) {
                    Map recRequetsMap = new HashMap();

                    String recSql = "";
                    Iterator entries = row.entrySet().iterator();
                    while (entries.hasNext()) {
                        Map.Entry entry = (Map.Entry) entries.next();

                        String paramsName = (String) entry.getKey();
                        String paramsValue = (String) entry.getValue();

                        if (!Tools.isEmpty(paramsValue)) {

                            if (paramsValue.contains("@sql->")) {
//                          按sql查找之前检索出的数据
                                String sqlContentStr = paramsValue.replace("@sql->", "");
                                String[] sqlContent = sqlContentStr.split("\\.");
                                Map sqlDataContent = (Map) ResultSqlDataSet.get(sqlContent[0] + "." + sqlContent[1]);
                                //System.out.println();
                                Result sqlDataResultObject = (Result) sqlDataContent.get("result");
                                List<Map> sqlDataResultRow = (List<Map>) sqlDataResultObject.getResultMap().get(0).get(sqlContent[0] + "." + sqlContent[1]);
                                //System.out.println();
//                                参数有"."即为具体到某个值作为参数,否则是全部作为参数

                                recRequetsMap = appendQueryMap(paramsName, paramsValue, sqlContent, recRequetsMap, sqlDataResultRow, row);
                                //System.out.println();

                            } else {
                                if (paramsName.equals("sql")) {
                                    recSql = paramsValue;
                                }
                                recRequetsMap.put(paramsName, paramsValue);
                            }
                        } else {
                            rs.setCode("false");
                            rs.setMsg("参数错误---数据为空");

                            resutMapDom.put("result", rs);
                            return JSONObject.fromObject(resutMapDom).toString();
                        }
                    }

                    Map rowResultDataList = this.analysisSql(recSql, recRequetsMap, userInfo);
                    //System.out.println();
                    ResultSqlDataSet.put(recSql, rowResultDataList);
                    //System.out.println();
                }

            } else {
                rs.setCode("false");
                rs.setMsg("参数错误---多sql迭代查询参数不能为空");

                resutMapDom.put("result", rs);
                return JSONObject.fromObject(resutMapDom).toString();
            }

            rs.setCode("true");
            rs.setMsg("success");
            resultMap.add(ResultSqlDataSet);
            rs.setResultMap(resultMap);
            resutMapDom.put("result", rs);

            return JSONObject.fromObject(resutMapDom).toString();
        }

//        封装request请求对象数据
        String[] moreArray = null;

        Enumeration enu = request.getParameterNames();
        while (enu.hasMoreElements()) {
            String paraName = (String) enu.nextElement();

            switch (paraName) {
                case "More":
                    if (request.getParameter(paraName).contains(",")) {
                        moreArray = request.getParameter(paraName).split(",");
                        for (int moreIndex = 0; moreIndex < moreArray.length; moreIndex++) {
                            requestMap.put(moreArray[moreIndex] + "[]", request.getParameterValues(moreArray[moreIndex] + "[]"));
                        }
                    } else {
                        requestMap.put(paraName + "[]", request.getParameterValues(paraName + "[]"));
                    }

                    break;
                default:
                    requestMap.put(paraName, request.getParameter(paraName));
                    break;
            }
        }

//        requestMap = parsentRequest(request,response);

        Map reMap = new HashMap();
        String reMapStr = "";
        try {
            reMap = this.analysisSql(sql, requestMap, userInfo);
            reMapStr = JSONObject.fromObject(reMap).toString();
        } catch (Exception ex){
            ex.printStackTrace();
        }

        return reMapStr;
    }

    /**
     * 返回封装完成的sql请求Map
     *
     * @param paramsName
     * @param paramsValue
     * @param querySqlArray
     * @param recRequetsMap
     * @param paramsMap
     * @param allRequestParams
     * @return
     */
    public Map appendQueryMap(String paramsName, String paramsValue, String[] querySqlArray, Map recRequetsMap, List<Map> paramsMap, Map allRequestParams) {
//        单条参数为false,多条用forEach为true
        boolean moreOrOne = false;
        if (!Tools.isEmpty(allRequestParams.get("$MoreFlg"))) {
            if (allRequestParams.get("$MoreFlg").toString().equals("one")) {
                moreOrOne = false;
            } else if (allRequestParams.get("$MoreFlg").toString().equals("more")) {
                moreOrOne = true;
            }
        }


        if (querySqlArray.length == 2) {
//                                    全部
            if (moreOrOne) {
                recRequetsMap.put("More", allRequestParams.get("More").toString());
                recRequetsMap.put(paramsName, paramsMap);
            } else {
                recRequetsMap.put(paramsName, paramsMap.get(0));
            }
        } else if (querySqlArray.length > 2) {
//                                    单个
            List<String> sqlDataItemList = new ArrayList<String>();
            for (Map sqlDataResultRowOnject : paramsMap) {
                sqlDataItemList.add(sqlDataResultRowOnject.get(querySqlArray[2]).toString());
            }

            if (moreOrOne) {
                recRequetsMap.put("More", allRequestParams.get("More").toString());
                recRequetsMap.put(paramsName, sqlDataItemList);
            } else {
                recRequetsMap.put(paramsName, sqlDataItemList.get(0).toString());
            }
        } else {
//            rs.setCode("false");
//            rs.setMsg("参数错误---调用Mapper文件格式错误");
//
//            resutMapDom.put("result", rs);
//            return JSONObject.fromObject(resutMapDom).toString();
        }

        recRequetsMap.put("$NoGet", paramsName);
        return recRequetsMap;
    }

    /**
     * 解析所有请求信息并调用数据源返回指定数据
     *
     * @param sql
     * @param newRequestMap
     * @param userInfo
     * @return
     */
    public Map analysisSql(String sql, Map newRequestMap, Map userInfo) {
        Map requestMap = new HashMap();
        Result rs = new Result();
        Map resutMapDom = new HashMap();

        String[] interceptArray = null;

        String[] moreArray = null;

        String[] jsonArray = null;
//        array对象封装成Map

        String interceptStr = null;
        try {
            List<Map> resultMapList = new ArrayList<>();

//            特殊参数处理
            String moreStr = null;
            String jsonArrayStr = null;

            if (!Tools.isEmpty(newRequestMap.get("More"))) {
                moreStr = newRequestMap.get("More").toString();
            }

            if (!Tools.isEmpty(newRequestMap.get("jsonArrayStr"))) {
                jsonArrayStr = newRequestMap.get("jsonArrayStr").toString();
            }

            if (!Tools.isEmpty(moreStr)) {
                if (moreStr.contains(",")) {
                    moreArray = moreStr.split(",");
                } else {
                    moreArray = new String[1];
                    moreArray[0] = moreStr;
                }
            }

            if (!Tools.isEmpty(jsonArrayStr)) {
                if (jsonArrayStr.contains(",")) {
                    jsonArray = jsonArrayStr.split(",");
                } else {
                    jsonArray = new String[1];
                    jsonArray[0] = jsonArrayStr;
                }
            }

            interceptArray = (String[]) ArrayUtils.addAll(moreArray, jsonArray);

            Iterator entries = newRequestMap.entrySet().iterator();

            while (entries.hasNext()) {
                Map.Entry entry = (Map.Entry) entries.next();

                String paraName = (String) entry.getKey();

                switch (paraName) {
                    case "sql":
                        break;

                    case "pageRecursionJsonStr":
                        break;

                    case "More":
                        break;

                    case "jsonArrayStr":
                        break;

                    default:
                        if (newRequestMap.get(paraName).toString().indexOf("$") == 0) {
                            //System.out.println("请求出现带获取的参数");

                            String requestParams = newRequestMap.get(paraName).toString().substring(1, newRequestMap.get(paraName).toString().length());

                            switch (requestParams) {
                                case "user":
                                    requestMap.put(paraName, userInfo.get("user_Name").toString());
                                    break;

                                case "userId":
                                    requestMap.put(paraName, userInfo.get("id").toString());
                                    break;

                                default:
                                    requestMap.put(paraName, newRequestMap.get(paraName).toString());
                                    break;
                            }
                            break;
                        } else {

                            if (!Tools.isEmpty(interceptArray)) {
                                if (Tools.useListIndex(interceptArray, paraName.replace("[]", ""))) {
                                    break;
                                } else {
                                    requestMap.put(paraName, newRequestMap.get(paraName).toString());
                                }
                            } else {
                                requestMap.put(paraName, newRequestMap.get(paraName).toString());
                            }
                        }
                }
            }

            if (!Tools.isEmpty(moreArray)) {
                for (int moreStrIndex = 0; moreStrIndex < moreArray.length; moreStrIndex++) {
                    Object dsds = null;
                    if (!Tools.isEmpty(newRequestMap.get("$NoGet"))) {
                        dsds = (List<Map>) newRequestMap.get(moreArray[moreStrIndex]);
                    } else {
                        dsds = (String[]) newRequestMap.get(moreArray[moreStrIndex] + "[]");
                    }

                    requestMap.put(moreArray[moreStrIndex].replace("[]", ""), dsds);
                }
            }

            if (!Tools.isEmpty(jsonArray)) {
                for (int jsonArrayIndex = 0; jsonArrayIndex < jsonArray.length; jsonArrayIndex++) {
                    String jsonParams = newRequestMap.get(jsonArray[jsonArrayIndex]).toString();
                    JSONArray jsonBean = JSONArray.fromObject(jsonParams);
                    requestMap.put(jsonArray[jsonArrayIndex], JSONArray.toArray(jsonBean, Map.class));
                }
            }

            Map queryMap = new HashMap();
            queryMap.put("sql", sql);
            queryMap.put("paramsMap", requestMap);

//        动态判断是调用哪个数据源
            if (!Tools.isEmpty(newRequestMap.get("dataSource"))) {
//            调其他数据源
//            按正常的方法去自己去写
            } else {
//            调用默认数据源
                resultMapList = dataSourcedao1.getList(queryMap);
            }

            rs.setResultMap(resultMapList);
            rs.setCode("true");
            rs.setMsg("succrss");

            resutMapDom.put("result", rs);
        } catch (Exception e) {
            e.printStackTrace();
            rs.setMsg(e.toString());
        }
        return resutMapDom;
    }

    /**
     * 递归获得所有待处理的sql，必须保证第一个请求sql是不需要调用其他sql的
     *
     * @param container
     * @param analysisJson
     * @return
     */
    public List<Map> recursion(List<Map> container, JSONObject analysisJson) {

        Map sqlMap = new HashMap();
        Iterator iterator = analysisJson.keys();
        while (iterator.hasNext()) {
            String key = (String) iterator.next();
            String value = analysisJson.getString(key);
            if (key.equals("children")) {
                this.recursion(container, JSONObject.fromObject(analysisJson.getString(key)));
            } else {
                if (key.equals("sql")) {
                    sqlMap.put("sql", analysisJson.getString(key));
                } else {
                    sqlMap.put(key, value);
                }
            }
        }

        container.add(sqlMap);

        return container;

//    前端请求
//        需结合Mapper文件
//        var jsonStr = '{\n' +
//            '    "sql": "RoleInfoMapper.selectInfo",\n' +
//            '    "user_Id": "$userId",\n' +
//            '    "children": {\n' +
//            '        "sql": "RoleJurisdictionInfoMapper.selectInfo",\n' +
//            '        "role_Id": "@sql->RoleInfoMapper.selectInfo.id",\n' +
//            '        "$MoreFlg":"one",\n' +
//            '        "children": {\n' +
//            '            "sql": "MenuInfoMapper.selectInfo",\n' +
//            '            "More": "Menu_ids",\n' +
//            '            "$MoreFlg": "more",\n' +
//            '            "Menu_ids": "@sql->RoleJurisdictionInfoMapper.selectInfo"\n' +
//            '        }\n' +
//            '    }\n' +
//            '}';
//
//        debugger;
//        getDataFnNoErrorF(
//            dataPath
//            , {sql: '$recursion', pageRecursionJsonStr: jsonStr}
//            , function (data) {
//                console.log('************************************');
//                console.log(data);
//            }
//            , function (data) {
//                console.log('服务器错误');
//                console.log(data);
//            }, function () {
//                console.log('error');
//            }
//        );


//    递归后得出所有的待执行sql
//        sql__RoleInfoMapper.selectInfo
//        user_Id__$userId                                                  //作为参数
//
//        sql__RoleJurisdictionInfoMapper.selectInfo
//        role_Id__@sql->RoleInfoMapper.selectInfo.id                       //作为参数
//
//        sql__MenuInfoMapper.selectInfo
//        $MoreFlg__more                                                    //作为参数
//        More__Menu_ids                                                    //作为参数
//        Menu_ids__@sql->RoleJurisdictionInfoMapper.selectInfo.meun_Id     //作为参数
    }


    /**
     * 统一的模型和视图返回器
     *
     * @param page
     * @param request
     * @param response
     * @return
     */
    public ModelAndView view(String page, HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();

        String path = request.getContextPath();
        String dataPath = path+"/system/data";
        String loginPath = path+"/system/login";
        String pageDataPath = path+"/system/getPageData";
        String insertDataPath = path+"/system/insertData";
        String deleteDataPath = path+"/system/deleteData";
        String updateDataPath = path+"/system/updateData";
        String logoutPath = path+"/system/syslogout";
        String getMd5Path = path+"/system/getMd5";
        String uploadPath = path+"/system/upload";
        String resourcePath = path+"/system/resource?";
        String downloadPath = path+"/system/download?file=";
        String showPagePath = path+"/system/show?page=";
        String printPage = path+"/system/printPage";
        String exportPath = path+"/system/export?";

        Map userInfo = (Map)session.getAttribute("userInfo");

        Map model = new HashMap();
        model.put("basePath", request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/");
        model.put("dataPath", dataPath);
        model.put("pageDataPath", pageDataPath);
        model.put("insertDataPath", insertDataPath);
        model.put("updateDataPath", updateDataPath);
        model.put("deleteDataPath", deleteDataPath);
        model.put("logoutPath", logoutPath);
        model.put("getMd5Path", getMd5Path);
        model.put("loginPath", loginPath);
        model.put("uploadPath", uploadPath);
        model.put("resourcePath", resourcePath);
        model.put("downloadPath", downloadPath);
        model.put("showPagePath", showPagePath);
        model.put("userInfo",JSONObject.fromObject(userInfo).toString());
        model.put("printPage", printPage);
        model.put("exportPath", exportPath);

        ModelAndView mav = new ModelAndView(page, model);
        return mav;
    }

    /**
     * 统一的模型和视图返回器
     *
     * @param page
     * @param request
     * @param response
     * @return
     */
    public ModelAndView view(String page, Map paramaterMap, HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();

        String path = request.getContextPath();
        String dataPath = path+"/system/data";
        String loginPath = path+"/system/login";
        String pageDataPath = path+"/system/getPageData";
        String insertDataPath = path+"/system/insertData";
        String deleteDataPath = path+"/system/deleteData";
        String updateDataPath = path+"/system/updateData";
        String logoutPath = path+"/system/syslogout";
        String getMd5Path = path+"/system/getMd5";
        String uploadPath = path+"/system/upload";
        String resourcePath = path+"/system/resource?";
        String downloadPath = path+"/system/download?file=";
        String showPagePath = path+"/system/show?page=";
        String printPage = path+"/system/printPage";
        String exportPath = path+"/system/export?";

        Map userInfo = (Map)session.getAttribute("userInfo");

        Map model = new HashMap();
        model.put("basePath", request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/");
        model.put("dataPath", dataPath);
        model.put("pageDataPath", pageDataPath);
        model.put("insertDataPath", insertDataPath);
        model.put("updateDataPath", updateDataPath);
        model.put("deleteDataPath", deleteDataPath);
        model.put("logoutPath", logoutPath);
        model.put("getMd5Path", getMd5Path);
        model.put("loginPath", loginPath);
        model.put("uploadPath", uploadPath);
        model.put("resourcePath", resourcePath);
        model.put("downloadPath", downloadPath);
        model.put("showPagePath", showPagePath);
        model.put("userInfo",JSONObject.fromObject(userInfo).toString());
        model.put("printPage", printPage);
        model.put("paramaterMap", paramaterMap);
        model.put("exportPath", exportPath);

        ModelAndView mav = new ModelAndView(page, model);
        return mav;
    }

    public ModelAndView view(String page, HttpServletRequest request) {
        ModelAndView mav = new ModelAndView(page);
        return mav;
    }

    @RequestMapping("/printPage")
    public ModelAndView printPage(HttpServletRequest request, HttpServletResponse response){
        Map model = new HashMap();
//        System.out.println(request.getParameter("urlaa"));
        model = parsentRequest(request,response);
        return this.view("system/testPrint", model,request, response);
    }

    //    返回请求页面总接口
    @RequestMapping("/show")
    public ModelAndView show(@RequestParam(required = false) String page, HttpServletRequest request, HttpServletResponse response) {
        return this.view(page, request, response);
    }

    @RequestMapping("/login")
    public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {

        return this.view("login/login", request, response);
    }

    @RequestMapping("/index")
    public ModelAndView getIndex(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return this.view("index", request, response);
    }

    //跳转到登录成功页面
//    @RequestMapping("/loginsuccess")
//    public ModelAndView loginsuccess(HttpServletRequest request,HttpServletResponse response) throws Exception {
//        return this.view("system/loginsuccess",request,response);
//    }

    /**
     * 验证用户名和密码
     *
     * @param username, password
     * @return
     */
    @RequestMapping("/checkLogin")
    @ResponseBody
    public String checkLogin(String username, String password, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            UsernamePasswordToken token = new UsernamePasswordToken(username, MD5.EncoderByMd5(password));
            Subject subject = SecurityUtils.getSubject();
            if (!subject.isAuthenticated()) {
                //使用shiro来验证

                //记住
                token.setRememberMe(true);
                subject.login(token);//验证角色和权限

            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        Map userInfoMap = new HashMap();
        Map paramsMap = new HashMap();
        paramsMap.put("user_Name", username);
        try {
            paramsMap.put("user_password", MD5.EncoderByMd5(password));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        userInfoMap.put("sql", "UserInfoMapper.selectUserInfo");
        userInfoMap.put("paramsMap", paramsMap);
        List<Map> userInfoDataMMap = (List<Map>) dataSourcedao1.getMap(userInfoMap).get("UserInfoMapper.selectUserInfo");

        request.getSession().setAttribute("userInfo", userInfoDataMMap.get(0));

        result.put("success", true);
        System.out.println("用户登录成功");
        return JSONObject.fromObject(result).toString();
    }

    /**
     * 退出登录
     */
    @RequestMapping(value = "/syslogout", method = RequestMethod.POST)
    @ResponseBody
    public String syslogout() {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        Subject currentUser = SecurityUtils.getSubject();
        currentUser.logout();
        return JSONObject.fromObject(result).toString();
    }


    //    分页数据类
    @RequestMapping("/getPageData")
    @ResponseBody
    public String getPageData(String sql, HttpServletRequest request, HttpServletResponse response) {

        String returnDataStr = this.getRequestData(sql, request, response);

        return returnDataStr;

//        //分页信息反射回请求对象内
//		Page page = new Page();
//		String limit = request.getParameter("limit");
//		String offset = request.getParameter("offset");
//		page.setShowCount(Integer.parseInt(request.getParameter("limit").toString()));
//		page.setCurrentPage(Integer.parseInt(request.getParameter("offset").toString()));
//		//参数在PD内
//
//		//分页信息反射回请求对象内
//		List<Map> rrr = (List<Map>)dataSourcedao1.getPageData("TestMapper.getListByParamsByPage",page);
//        Map testMap = new HashMap();
//
//        testMap.put("total",page.getTotalResult());
//        testMap.put("rows",rrr);
//
//        return JSONObject.fromObject(testMap).toString();
    }

    @RequestMapping("/getMd5")
    @ResponseBody
    public String getMd5(@RequestParam("password") String password, HttpServletRequest request,HttpServletResponse response){
        Map resutMapDom = new HashMap();
        Result rs = new Result();
        String md5Str = null;
        try {
            md5Str = MD5.EncoderByMd5(password);
            List<Map> returnDataList = new ArrayList<>();
            Map returnData = new HashMap();
            returnData.put("md5Str",md5Str);
            returnDataList.add(returnData);
            rs.setResultMap(returnDataList);
            rs.setMsg("success");
            rs.setCode("true");
            resutMapDom.put("result",rs);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return JSONObject.fromObject(resutMapDom).toString();
    }

    /**
     * insert控制器
     * @param sql
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/insertData")
    @ResponseBody
    public String insertData(@RequestParam("sql") String sql, HttpServletRequest request, HttpServletResponse response) {
        Map resutMapDom = new HashMap();
        Result rs = new Result();
        List<Map> insertRetrun = new ArrayList<>();
        Map insertMap = new HashMap();
        try {

            insertMap.put("sql", sql);
            Map requestMap = parsentRequest(request, response);

            insertMap.put("paramsMap", requestMap);


            if (!Tools.isEmpty(request.getParameter("dataSource"))) {
//            掉其他数据源
//            按正常的方法去自己去写
            } else {
//            调用默认数据源
                insertRetrun = (List<Map>)dataSourcedao1.insert(insertMap);
            }

            rs.setMsg("success");
            rs.setCode("true");
            rs.setResultMap(insertRetrun);
            resutMapDom.put("result",rs);
        } catch (Exception e) {
            rs.setMsg("插入失败");
            rs.setCode("false");
            rs.setResultMap(null);
            resutMapDom.put("result",rs);
        }
        return JSONObject.fromObject(resutMapDom).toString();
    }


    /**
     * delete控制器
     * @param sql
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/deleteData")
    @ResponseBody
    public String deleteData(@RequestParam("sql") String sql, HttpServletRequest request, HttpServletResponse response) {
        Map resutMapDom = new HashMap();
        Result rs = new Result();
        List<Map> deleteRetrun = new ArrayList<>();
        Map requestMap = new HashMap();
        Map deleteMap = new HashMap();
        try {

            deleteMap.put("sql", sql);
//            if(!sql.equals("$recursion")){
            requestMap = parsentRequest(request, response);
//            }else {

//            }


            deleteMap.put("paramsMap", requestMap);


            if (!Tools.isEmpty(request.getParameter("dataSource"))) {
//            掉其他数据源
//            按正常的方法去自己去写
            } else {
//            调用默认数据源
                deleteRetrun = (List<Map>)dataSourcedao1.delete(deleteMap);
            }

            rs.setMsg("success");
            rs.setCode("true");
            rs.setResultMap(deleteRetrun);
            resutMapDom.put("result",rs);
        } catch (Exception e) {
            e.printStackTrace();
            rs.setMsg("删除失败");
            rs.setCode("false");
            rs.setResultMap(null);
            resutMapDom.put("result",rs);
        }
        return JSONObject.fromObject(resutMapDom).toString();
    }

    /**
     * delete控制器
     * @param sql
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/updateData")
    @ResponseBody
    public String updateData(@RequestParam("sql") String sql, HttpServletRequest request, HttpServletResponse response) {
        Map resutMapDom = new HashMap();
        Result rs = new Result();
        List<Map> updateRetrun = new ArrayList<>();
        Map requestMap = new HashMap();
        Map updateMap = new HashMap();
        try {

            updateMap.put("sql", sql);
//            if(!sql.equals("$recursion")){
            requestMap = parsentRequest(request, response);
//            }else {

//            }


            updateMap.put("paramsMap", requestMap);


            if (!Tools.isEmpty(request.getParameter("dataSource"))) {
//            掉其他数据源
//            按正常的方法去自己去写
            } else {
//            调用默认数据源
                updateRetrun = (List<Map>)dataSourcedao1.update(updateMap);
            }

            rs.setMsg("success");
            rs.setCode("true");
            rs.setResultMap(updateRetrun);
            resutMapDom.put("result",rs);
        } catch (Exception e) {
            e.printStackTrace();
            rs.setMsg("更新失败");
            rs.setCode("false");
            rs.setResultMap(null);
            resutMapDom.put("result",rs);
        }
        return JSONObject.fromObject(resutMapDom).toString();
    }

    /**
     * 解析request请求的通用方法,将所有的request请求转换成map
     * @param request
     * @param response
     * @return
     */
    public Map parsentRequest(HttpServletRequest request, HttpServletResponse response) {
        //        封装requestParameter对象
        Map requestMap = new HashMap();

        //        封装request请求对象数据
        String[] moreArray = null;

        Enumeration enumeration = request.getParameterNames();
        while (enumeration.hasMoreElements()) {
            String paraName = (String) enumeration.nextElement();

            switch (paraName) {
                case "sql":
                    break;

                case "More":

                    String moreStr = request.getParameter("More");

                    String moreStrParams = request.getParameter(moreStr);

                    if(moreStrParams.equals("JSONStr")){        //json数据,必须是jsonArray

                        String JSONStr = request.getParameter("JSONStr");
                        JSONArray sss = JSONArray.fromObject(JSONStr);
                        Map[] jsonStrArray = (Map[])JSONArray.toArray(sss,Map.class);

                        List<Map> paramsArray = Arrays.asList(jsonStrArray);
                        requestMap.put(moreStr,paramsArray);
//                        System.out.println();
                    }else{      //非json数据

                        if(moreStrParams.contains(",")){
                            String[] splitArray = moreStrParams.split(",");
                            List<String> paramsArray = Arrays.asList(splitArray);

                            requestMap.put(moreStr,paramsArray);
                        }
                    }

                    break;

                case "$MoreFlg":
                    System.out.println(request.getParameter("$MoreFlg"));
                    if(request.getParameter("$MoreFlg").equals("more")){
                        requestMap.put(paraName, request.getParameter("$MoreFlg"));
                    }
                    break;
                default:
                    if(Tools.isEmpty(requestMap.get(paraName))){
                        requestMap.put(paraName, request.getParameter(paraName));
                    }

                    break;
            }
        }

        return requestMap;
    }


    @ResponseBody
    @RequestMapping("/upload")
    public Result upload(@RequestParam(required = true) MultipartFile file, HttpServletRequest request) throws Exception {

//        public Result upload(@RequestParam(required = false) String dataSource, @RequestParam(required = true) String[] cmd, @RequestParam(required = true) String pathParam,
//                @RequestParam(required = true) String thumbPathParam, @RequestParam(required = true) MultipartFile file, HttpServletRequest request) throws Exception {
        Result result = new Result();
        if (!file.getOriginalFilename().contains(".")) {
            result.setCode("false");
            return result;
        }

        if (file.getSize() == 0) {
            result.setCode("false");
            return result;
        }

//        Map<String, Object> params = new
//        Map<String, Object> params = this.getParameterMap(request, "dataSource", "cmd", "pathParam", "thumbPathParam");
        String path = bundle.getString("system.upload");
        Date date = new Date();

        String originalName = file.getOriginalFilename().substring(0, file.getOriginalFilename().lastIndexOf("."));
        String fileType = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        String fileName = originalName + "_" + date.getTime() + "." + fileType;
        String fileFolder = new SimpleDateFormat("yyyy-MM-dd").format(date);
        File targetFile = new File(path + "/" + fileFolder, fileName);
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        file.transferTo(targetFile);
//		System.out.println(targetFile);
        String filePath = fileFolder + "/" + fileName;
        String absFilePath = filePath;
//        params.put(pathParam, new String[]{filePath});

        String thumbPath;
        //支持的图片类型：[BMP, bmp, jpg, JPG, wbmp, jpeg, png, PNG, JPEG, WBMP, GIF, gif]
        String[] imageTypes = ImageIO.getReaderFormatNames();
        if (ArrayUtils.indexOf(imageTypes, fileType) != -1) {
            final int toHeight = 96;
            Image image = ImageIO.read(targetFile);
            int width = image.getWidth(null);
            int height = image.getHeight(null);
            int toWidth = (int) (width * toHeight / (height * 1.0));
            BufferedImage bi = new BufferedImage(toWidth, toHeight, BufferedImage.TYPE_INT_RGB);
            Graphics g = bi.getGraphics();
            g.drawImage(image, 0, 0, toWidth, toHeight, Color.WHITE, null);
            g.dispose();
            String imageFileName = originalName + "_" + date.getTime() + "_thumb." + fileType;
            File imageFile = new File(path + "/" + fileFolder, imageFileName);
            ImageIO.write(bi, fileType, imageFile);
            thumbPath = fileFolder + "/" + imageFileName;
        } else if (fileType.equalsIgnoreCase("doc") || fileType.equalsIgnoreCase("docx")) {
            thumbPath = bundle.getString("system.filethumb.word");
        } else if (fileType.equalsIgnoreCase("xls") || fileType.equalsIgnoreCase("xlsx")) {
            thumbPath = bundle.getString("system.filethumb.excel");
        } else if (fileType.equalsIgnoreCase("pdf")) {
            thumbPath = bundle.getString("system.filethumb.pdf");
        } else if (fileType.equalsIgnoreCase("txt")) {
            thumbPath = bundle.getString("system.filethumb.text");
        } else if (fileType.equalsIgnoreCase("wmv") || fileType.equalsIgnoreCase("rm") || fileType.equalsIgnoreCase("rmvb") ||
                fileType.equalsIgnoreCase("mpg") || fileType.equalsIgnoreCase("mpeg") || fileType.equalsIgnoreCase("3gp") ||
                fileType.equalsIgnoreCase("mov") || fileType.equalsIgnoreCase("mp4") || fileType.equalsIgnoreCase("avi") ||
                fileType.equalsIgnoreCase("mkv") || fileType.equalsIgnoreCase("flv") || fileType.equalsIgnoreCase("vob")) {
            thumbPath = bundle.getString("system.filethumb.video");
        } else if (fileType.equalsIgnoreCase("mp3") || fileType.equalsIgnoreCase("wav") || fileType.equalsIgnoreCase("wma") ||
                fileType.equalsIgnoreCase("ogg")) {
            thumbPath = bundle.getString("system.filethumb.audio");
        } else if (fileType.equalsIgnoreCase("zip") || fileType.equalsIgnoreCase("rar")) {
            thumbPath = bundle.getString("system.filethumb.zip");
        } else {
            thumbPath = bundle.getString("system.filethumb.unknow");
        }
//        params.put(thumbPathParam, new String[]{thumbPath});

        List<Map> returnDataList = new ArrayList<>();
        Map returnData = new HashMap();
        returnData.put("filePath",targetFile);
        returnData.put("absFilePath", absFilePath);
        returnDataList.add(returnData);
        result.setResultMap(returnDataList);
//        Map<String, Object> resultMap = systemService.crud(dataSource, cmd, params);
//        resultMap.put("filePath", targetFile);
//        resultMap.put("absFilePath", absFilePath);
//        result.setResultMap(resultMap);
        return result;
    }

    protected Map<String, Object> getParameterMap(HttpServletRequest request, String... excludes){
        Map<String, Object> paramMap = new HashMap<String, Object>();
        Map<String, String[]> map = request.getParameterMap();
        Iterator<Map.Entry<String, String[]>> entries = map.entrySet().iterator();
        while (entries.hasNext()) {
            Map.Entry<String, String[]> entry = (Map.Entry<String, String[]>) entries.next();
            String key = entry.getKey();
            String[] values = entry.getValue();
            Object value;
            if(key.endsWith("[]")){
                while(key.endsWith("[]")){
                    key = key.substring(0, key.lastIndexOf("[]"));
                }
                value = values;
            }else{
                if(values == null || values.length == 0){
                    value = null;
                }else{
                    value = values[values.length -1];
                }
            }
            int index = ArrayUtils.indexOf(excludes, key);
            if(index == -1){
                paramMap.put(key, value);
            }
        }
        return paramMap;
    }

    @RequestMapping(value = "/download")
    public ResponseEntity<byte[]> download(HttpServletRequest request) throws Exception {
//        System.out.println(request.getCharacterEncoding());
        request.setCharacterEncoding("UTF-8");


        String path = bundle.getString("system.upload");
        String filePath = new String(request.getParameter("file").getBytes("iso-8859-1"),"utf-8");
        //System.out.println(java.net.URLDecoder.decode(filePath,"UTF-8"));
        //System.out.println(filePath);
//        Enumeration<String> paramNames = request.getParameterNames();
//        if (paramNames.hasMoreElements()) {
//            filePath = paramNames.nextElement();
//        }
//        if (filePath == null || filePath.equals("")) {
//            throw new Exception("文件路径为空！");
//        }

//        filePath = new String(filePath.getBytes("utf-8"), "utf-8");
//        File file = new File(path + "/" + filePath);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//        String fileType = filePath.substring(filePath.lastIndexOf(".") + 1);
//        String fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
//        fileName = fileName.substring(0, fileName.lastIndexOf("_"));
//        fileName = fileName + "." + fileType;
//        fileName = new String(fileName.getBytes("GBK"), "utf-8");
//        headers.setContentDispositionFormData("attachment", fileName);
        //filePath = new String(filePath.getBytes("iso8859-1"), "utf-8");
        //System.out.println("__"+filePath);
        File file = new File(path + "/" + filePath);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        String fileType = filePath.substring(filePath.lastIndexOf(".") + 1);
        String fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
        fileName = fileName.substring(0, fileName.lastIndexOf("_"));
        fileName = fileName + "." + fileType;
        fileName = fileName.substring(fileName.lastIndexOf("\\")+1,fileName.length());
        //System.out.println(fileName);
        fileName = new String(fileName.getBytes("gbk"), "iso8859-1");
        headers.setContentDispositionFormData("attachment", fileName);
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file), headers, HttpStatus.OK);
    }

    @RequestMapping("/resource")
    public ResponseEntity<byte[]> resource(HttpServletRequest request) throws Exception {
        String path = bundle.getString("system.upload");
        String filePath = null;
        Enumeration<String> paramNames = request.getParameterNames();
        if (paramNames.hasMoreElements()) {
            filePath = paramNames.nextElement();
        }
        if (filePath == null || filePath.equals("")) {
            throw new Exception("文件路径为空！");
        }
//        filePath = new String(filePath.getBytes("iso8859-1"), "utf-8");
        File file = new File(path + "/" + filePath);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file), headers, HttpStatus.OK);
    }

    /**
     * 导出
     * @param sql
     * @param fileName
     * @param titleParams
     * @param request
     * @param response
     */
    @RequestMapping("/export")
    public void export(@RequestParam(required = true) String sql,@RequestParam(required = false) String fileName, @RequestParam(required = false) String titleParams,HttpServletRequest request, HttpServletResponse response) {

        OutputStream os = null;
//        获取参数
//        try {
//            request.setCharacterEncoding("UTF-8");
//            String name = java.net.URLDecoder.decode(request.getParameter("fileName"),"UTF-8");
//            System.out.println(name);
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }
        Map paramsMap = new HashMap();
        paramsMap = parsentRequest(request,response);

//        if (sql == "0") {
//            throw new Exception("导出命令为空！");
//        }

        String[] titles = titleParams.split(",");

        Map resutDataMap = analysisSql(sql,paramsMap,new HashMap());

        //System.out.println(resutDataMap);

        Result result1 = (Result)resutDataMap.get("result");

        List<Map<String, Object>> resultList = (List<Map<String, Object>>)result1.getResultMap().get(0).get(sql);

//        Map<String, Object> params = this.getParameterMap(request, "dataSource", "cmd", "fileName", "titles");

//        sql读取数据源
//        Map<String, Object> resultMap = systemService.crud(dataSource, cmd, params);


//        Map<String, Object> resultMap = new HashMap();
//        List<Map<String, Object>> resultList = (List<Map<String, Object>>) resultMap.get(sql);


//        sql读取数据源

//        try {
//            fileName = new String(fileName.getBytes("iso8859-1"), "utf-8");
//        } catch (UnsupportedEncodingException e) {
//
//            e.printStackTrace();
//        }

//        HSSFWorkbook wb2 = new HSSFWorkbook();
//        // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
//        HSSFSheet sheet2 = wb2.createSheet("table");
//        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
//        HSSFRow row2 = sheet2.createRow((int) 0);
//        // 第四步，创建单元格，并设置值表头 设置表头居中
//        HSSFCellStyle style2 = wb2.createCellStyle();
//        style2.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
//
//        HSSFCell cell2 = row2.createCell((short) 0);
//        cell2.setCellValue("UserId");
//        cell2.setCellStyle(style2);
//        cell2 = row2.createCell((short) 1);
//        cell2.setCellValue("time");
//        cell2.setCellStyle(style2);
//        cell2 = row2.createCell((short) 2);
//        cell2.setCellValue("state");
//        cell2.setCellStyle(style2);



        //HSSFWorkbook ss = new HSSFWorkbook();
        //XSSFWorkbook ss2 = new XSSFWorkbook();

        HSSFWorkbook wb = new HSSFWorkbook();

        HSSFSheet sheet = wb.createSheet(fileName);

        Row titleRow = sheet.createRow(0);
        for (int i = 0; i < titles.length; i++) {
            Cell cell = titleRow.createCell(i);
            String title = titles[i];
//            try {
//                title = new String(title.getBytes("iso8859-1"), "utf-8");
//            } catch (UnsupportedEncodingException e) {
//                e.printStackTrace();
//            }
            cell.setCellValue(title);
        }
        int listLen = resultList.size();
        for (int i = 0; i < listLen; i++) {
            Row row = sheet.createRow(i + 1);
            Map<String, Object> resultItem = resultList.get(i);
            Iterator<Map.Entry<String, Object>> entries = resultItem.entrySet().iterator();
            int j = 0;
            while (entries.hasNext()) {
                Cell cell = row.createCell(j);
                Map.Entry<String, Object> entry = entries.next();
                String value = String.valueOf(entry.getValue());
                cell.setCellValue(value);
                j++;
            }
        }
        fileName = fileName + "_" + (new Date().getTime()) + ".xls";
        try {
            fileName = new String(fileName.getBytes("gbk"), "iso8859-1");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);


        try {
            os = response.getOutputStream();
            wb.write(os);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try{
                wb.close();
                os.close();
            }catch (Exception ex){
                ex.printStackTrace();
            }
        }
    }
}

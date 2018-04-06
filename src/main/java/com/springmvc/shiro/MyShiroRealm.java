package com.springmvc.shiro;

import com.springmvc.dataSource1service.DataSource1SystemService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import javax.annotation.Resource;
import java.util.*;

public class MyShiroRealm extends AuthorizingRealm {

    //这里因为没有调用后台，直接默认只有一个用户("luoguohui"，"123456")
//    private String USER_NAME = "luoguohui";
//    private String PASSWORD = "123456";

    @Resource(name = "dataSource1SystemServiceS")
    private DataSource1SystemService systemDao;

    /*
     * 授权
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        Set<String> roleNames = new HashSet<String>();
        Set<String> permissions = new HashSet<String>();
        roleNames.add("administrator");//添加角色
        permissions.add("newPage.jhtml");  //添加权限
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roleNames);
        info.setStringPermissions(permissions);
        return info;
    }

    /*
     * 登录验证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;

        String PASSWORD = "";
//        获取用户名
        String name = token.getUsername();

//        拼装数据请求参数
        Map query = new HashMap();
        query.put("sql", "UserInfoMapper.getUser");
        Map paramsMap = new HashMap();
        paramsMap.put("user_Name", name);
        query.put("paramsMap", paramsMap);

        List<Map> hasUserList = (List<Map>)systemDao.getList(query).get(0).get("UserInfoMapper.getUser");

        if (Integer.parseInt(hasUserList.get(0).get("USERCOUNT").toString())==1) {
            query = new HashMap();
            query.put("sql", "UserInfoMapper.selectUserInfo");

            query.put("paramsMap", paramsMap);
            List<Map> UserInfo = (List<Map>)systemDao.getList(query).get(0).get("UserInfoMapper.selectUserInfo");
            PASSWORD = UserInfo.get(0).get("user_password").toString();
        } else {
            return null;
        }

        AuthenticationInfo authcInfo = null;

        authcInfo = new SimpleAuthenticationInfo(name, PASSWORD, this.getName());

        return authcInfo;
    }
}

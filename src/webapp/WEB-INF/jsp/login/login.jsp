<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>综合能源服务系统</title>
    <link rel="stylesheet" type="text/css"
          href="${basePath}pages/despages/common/jquery-easyui-1.5.1/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="${basePath}pages/despages/common/jquery-easyui-1.5.1/themes/icon.css">
    <style type="text/css">

        #login {
            position: absolute;
            left: 0px;
            right: 0px;
            top: 0px;
            bottom: 0px;
            margin: 0px;
            padding: 0px;
        }

        #login .icon-title-panel {
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            height: 120px;
        }

        #login .icon-title-panel .icon {
            position: absolute;
            bottom: 0px;
            left: 25px;
            width: 354px;
            height: 96px;
            background-image: url(${basePath}pages/despages/common/images/loginbig.jpg);
            background-origin: content-box;
            background-position: center;
            background-repeat: no-repeat;
        }

        #login .icon-title-panel .title {
            position: absolute;
            bottom: 0px;
            left: 45px;
            right: 50px;
            height: 96px;
        }

        #login .icon-title-panel .sub-title {
            position: absolute;
            top: 44px;
            left: 340px;
            font-size: 20px;
            color: #E96D17;
        }

        #login .background-panel {
            position: absolute;
            top: 140px;
            width: 100%;
            height: 450px;
            overflow: hidden;
        }

        #login .content {
            position: absolute;
            top: 400px;
            left: 70%;
            width: 293px;
            height: 282px;
            margin-top: -180px;
            background-image: url(${basePath}pages/despages/common/images/loginPanel_1.png);
            background-origin: content-box;
            background-position: center;
            background-repeat: no-repeat;
        }

        #login .content .name-panel {
            position: absolute;
            left: 60px;
            top: 70px;
        }

        #login .content .name-panel .nameIpt {
            border: 0;
            width: 210px;
            background-color: transparent;
            font-size: 16px;
            /*color: #ffffff;*/
            outline: none;
            height: 20px;
            line-height: 20px;
        }

        #login .content .password-panel {
            position: absolute;
            left: 60px;
            top: 115px;
        }

        #login .content .password-panel .passwordIpt {
            border: 0;
            width: 210px;
            background-color: transparent;
            font-size: 16px;
            /*color: #ffffff;*/
            outline: none;
            height: 20px;
            line-height: 20px;
        }

        #login .content .code-panel {
            position: absolute;
            left: 40px;
            top: 160px;
        }

        #login .content .code-panel .codeIpt {
            border: 0;
            width: 110px;
            background-color: transparent;
            font-size: 16px;
            /*color: #ffffff;*/
            outline: none;
            height: 20px;
            line-height: 20px;
        }

        #login .content .code-img-panel {
            position: absolute;
            left: 185px;
            top: 160px;
        }

        #login .content .login-btn {
            position: absolute;
            width: 249px;
            height: 35px;
            bottom: 30px;
            left: 50%;
            margin-left: -125px;
            cursor: pointer;
            background-image: url(${basePath}pages/despages/common/images/loginButton_1.png);
            background-origin: content-box;
            background-position: center;
            background-repeat: no-repeat;
        }

        #login .icon-panel {
            position: absolute;
            top: 620px;
            width: 100%;
            height: 70px;
            text-align: center;
            overflow: hidden;
        }

        #login .icon-panel > img {
            margin: 0px 40px;
        }

        #login .bottom-info-panel {
            color: #028c8c;
            position: absolute;
            top: 720px;
            width: 100%;
            height: 50px;
            overflow: hidden;
            font-size: 12px;
            font-family: "微软雅黑 ";
            text-align: right;
            padding-right: 30px;
            box-sizing: border-box;
        }

    </style>


</head>
<body style="width: 100%;height: 100%;margin:0;overflow: hidden">
<form method="post" action="${basePath}system/show?page=system/loginsuccess">
    <%--<form name="LoginForm" method="post">--%>
    <div id="login">
        <div class="icon-title-panel">
            <div id="loginImage" class="icon"
                 style="background-image: url('${basePath}pages/despages/common/images/loginbig.jpg');"></div>
            <div class="title">
                <div class="sub-title" id="areaName">--智慧能源云平台</div>
            </div>
        </div>

        <div class="background-panel">
            <img src="${basePath}pages/despages/common/images/background_3.png" width="100%" height="100%" border="0">
        </div>

        <div class="content">
            <div class="name-panel">
                <input id="username" name="username" class="nameIpt" type="text" onkeydown="loginNameKeyDown(event)" placeholder="请输入您的用户名">
            </div>
            <div class="password-panel">
                <input id="password" name="password" class="passwordIpt" type="password" placeholder="请输入您的密码">
                <%--<input id="password" name="password" class="passwordIpt" type="password" onkeydown="loginpasswordKeyDown(event)" placeholder="请输入您的密码">--%>
            </div>
            <div class="code-panel">
                <input id="validateCode" name="validateCode" class="codeIpt" type="text" onkeydown="keydownLogin(event)" placeholder="请输入验证码">
            </div>

            <div class="code-img-panel">
                <span class="spn1">
                    <img src="${basePath}authCodeImg/getAuthCodeImg"
                    <%--<img src="http://61.177.76.218:7801/des//rendsMenu/makeValidateImage.action"--%>
                         onclick="return; this.src='${basePath}authCodeImg/getAuthCodeImg'; + Math.random();"
                         style="width: 50px; height: 20px;vertical-align:middle">
                </span>
            </div>
            <div class="login-btn" onclick="login()"></div>
        </div>

        <div class="icon-panel">
            <img src="${basePath}pages/despages/common/images/ywtg_1.png" border="0">
            <img src="${basePath}pages/despages/common/images/dfgl_1.png" border="0">
            <img src="${basePath}pages/despages/common/images/dsjfx_1.png" border="0">
            <img src="${basePath}pages/despages/common/images/aqgl_1.png" border="0">
        </div>

        <div class="bottom-info-panel">
            技术支持 ：深圳华睿丰盛
        </div>
    </div>
</form>

<script src="${basePath}pages/despages/common/eems/jquery-easyui/jquery.min.js"></script>
<script src="${basePath}pages/despages/common/eems/jquery-easyui/jquery.easyui.min.js"></script>
<script type="text/javascript">

    var error = 'null';
    // if (error != 'null' && error.length > 0) {
    //     alert(error);
    // }
    var loginName = 'null';
    var password = 'null';
    //如果用户名和密码输入错误，得到传过来的值
    var errorIndex = 'null';
    //如果用户不存在，清空用户名和密码
    // if (errorIndex == 'false') {
    //     loginName = "";
    //     password = "";
    //     $("#loginName").val(loginName);
    //     $("#password").val(password);
    // }
    // //如果用户名存在 则验证码错误，拿到正确的用户名和密码赋值给用户名和密码输入框
    // else {
    //     if (loginName != 'null' && loginName.length > 0) {
    //         $("#loginName").val(loginName);
    //     }
    //     if (password != 'null' && password.length > 0) {
    //         $("#password").val(password);
    //     }
    // }

    //是否为空校验
    // function isEmpty(s) {
    //     var lll = trim(s);
    //     if (lll == null || lll.length == 0)
    //         return true;
    //     else
    //         return false;
    // }

    //删除字符串左边的空格
    // function ltrim(str) {
    //     if (str.length == 0)
    //         return (str);
    //     else {
    //         var idx = 0;
    //         while (str.charAt(idx).search(/\s/) == 0)
    //             idx++;
    //         return (str.substr(idx));
    //     }
    // }

    //删除字符串右边的空格
    // function rtrim(str) {
    //     if (str.length == 0)
    //         return (str);
    //     else {
    //         var idx = str.length - 1;
    //         while (str.charAt(idx).search(/\s/) == 0)
    //             idx--;
    //         return (str.substring(0, idx + 1));
    //     }
    // }

    //删除字符串左右两边的空格
    // function trim(str) {
    //     return (rtrim(ltrim(str)));
    // }
    //
    //
    function loginNameKeyDown(e) {
        if (e.keyCode == 13) {
            //$('#password').textbox('textbox').focus();
            document.getElementById('password').focus();
        }
    }

    // 输入框回车事件 wgj 2017-03-16
    function keydownLogin(e) {
        // var name = document.getElementById("loginName");
        // var pwd = document.getElementById("password");
        // e = e || event;
        // if (e.keyCode == 13) {
        //     if (isEmpty(name.value) || trim(name.value) == "") {
        //         name.focus();
        //         return;
        //     }
        //     if (isEmpty(pwd.value) || trim(pwd.value) == "") {
        //         pwd.focus();
        //         return;
        //     }
        //     login();
        // }
    }

    // function loginpasswordKeyDown(e) {
    //     if (e.keyCode == 13) {
    //         e.returnValue = false;
    //         e.cancel = true;
    //         var name = document.getElementById("loginName").value;
    //         var pw = document.getElementById("password").value;
    //         savePssword(pw);
    //         window.document.forms[0].submit();
    //     }
    // }

    function login() {
        // var url = "";
        // url = "http://61.177.76.218:7801/des/systemNewLogin/login.action";
        // var name = document.getElementById("loginName").value;
        // var pw = document.getElementById("password").value;
        // var code = document.getElementById('validateCode').value;
        // if (isEmpty(name) || trim(name) == "" || isEmpty(pw) || trim(pw) == "") {
        //     alert("用户名/密码为空,请重新输入!");
        //     return false;
        // }
        //
        // if (isEmpty(code) || trim(code) == "") {
        //     alert("验证码为空,请重新输入!");
        //     return false;
        // }
        //
        // // savePssword(pw);
        // document.LoginForm.action = url;
        // document.LoginForm.method = "post";
        // document.LoginForm.submit();
        // return false;

        var param = {
            username: $("#username").val(),
            password: $("#password").val()
        };

        <%--$.ajax({--%>
        <%--type: "post",--%>
        <%--url: "<%=request.getContextPath()%>" + "/system/checkLogin",--%>
        <%--data: param,--%>
        <%--dataType: "json",--%>
        <%--success: function (data) {--%>
        <%--if (data.success == false) {--%>
        <%--alert(data.errorMsg);--%>
        <%--} else {--%>
        <%--//登录成功--%>
        <%--window.location.href = "<%=request.getContextPath()%>" + "/system/show?page=system/loginsuccess";--%>
        <%--}--%>
        <%--},--%>
        <%--error: function (data) {--%>
        <%--alert("调用失败....");--%>
        <%--}--%>
        <%--});--%>

        $.ajax({
            type: "post",
            url: "${basePath}/system/checkLogin",
            data: param,
            dataType: "json",
            async:false,
            cache:false,
            success: function (data) {
                if (data.success == false) {
                    alert(data.errorMsg);
                } else {
                    $('form').submit();
                }
            },
            error: function (data) {
                alert("认证失败!!!!");
            }
        });

    }

    // function savePssword(psw) {
    //     $.ajax({
    //         type: "POST",
    //         data: "password=" + psw,
    //         url: "http://61.177.76.218:7801/des/pages/system/savePassword.jsp",
    //         dataType: "html",
    //         success: function (result) {
    //         }
    //     });
    //     return false;
    // }

    $(function () {
        //区域名称
        <%--$.getJSON("http://61.177.76.218:7801/des/pCode/selectAreaName.action", {},--%>
        <%--function (json) {--%>
        <%--$("#areaName").text("--" + json[0].areaName);--%>
        <%--//areaName = json[0].areaName;--%>
        <%--// 				    if(json[0].areaNo == '101'){--%>
        <%--document.title = "综合能源服务系统";--%>
        <%--$('#loginImage').css("background-image", "url(${basePath}pages/despages/common/images/loginbig.jpg)");--%>
        <%--// 				    }else {--%>
        <%--// 				    	document.title="区域能源服务系统";--%>
        <%--// 				    	$('#loginImage').css("background-image", "url(/des/pages/despages/common/images/loginLogo_1.png)");--%>
        <%--// 				    }--%>
        <%--}--%>
        <%--);--%>
        //光标放在用户名输入框
        $("#loginName").focus();
    });

</script>


</body>
</html>
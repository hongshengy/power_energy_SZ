<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="zh">
<head>
    <title>检疫犬管理系统</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9"/>

    <%--<link rel="stylesheet" type="text/css" href="${basePath}/plugins/bootstrap/css/bootstrap.min.css">--%>
    <%--<link rel="stylesheet" type="text/css" href="${basePath}/plugins/font-awesome-4.7.0/css/font-awesome.min.css">--%>
    <%--<link rel="stylesheet" type="text/css" href="${basePath}/plugins/login/htmleaf-demo.css">--%>
    <style type="text/css">
        <!--
        body,td,th {
            font-family: 微软雅黑;
            font-size: 12px;
            color: #333333;
        }
        body {
            margin:0 auto;
            background-image: url(${basePath}/plugins/login/images/loginbg.jpg);
            background-repeat: no-repeat;
            background-position: center top;
            background-color:#F2F2F2;
            width:1000px;
        }
        a:link {
            color: #333333;
            text-decoration: none;
        }
        a:visited {
            text-decoration: none;
            color: #333333;
        }
        a:hover {
            text-decoration: none;
            color: #01A2AA;
        }
        a:active {
            text-decoration: none;
            color: #01A2AA;
        }
        .login2016{ width:auto; height:455px; padding-top:305px; padding-left:678px; padding-right:48px;}
        #logtab{}
        #logtab td{height:35px;}
        .reglink{ color:#FFFFFF; font-weight:bold; font-size:14px;}
        .reglink a{ color:#FFFFFF!important;}

        #logtab input{
            width:224px;
            height:38px;
            line-height:38px;
            background-color:#FFFFFF;
            padding-left:50px;
            border:0px #fff solid;
            color:#000;
            font-size:14px;
            border-radius:3px;
        }
        #logtab .input1{
            background-image: url(${basePath}/plugins/login/images/login_3.jpg);
            background-repeat: no-repeat;
            background-position: left center;
        }

        #logtab .input2{
            background-image: url(${basePath}/plugins/login/images/login_6.jpg);
            background-repeat: no-repeat;
            background-position: left center;
        }

        #logtab .input3{
            width:100px!important;
            background-image: url(${basePath}/plugins/login/images/login_11.jpg);
            background-repeat: no-repeat;
            background-position: left center;
        }

        -->
    </style>
</head>
<body>
<div class="login2016" style="margin-top:25px;">
    <form method="post" action="${basePath}system/show?page=system/loginsuccess">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" id="logtab">
        <tr>
            <td><input type="text" id="username"  class="input1" maxlength=16/></td>
        </tr>
        <tr>
            <td></td>
        </tr>
        <tr>
            <td><input type="password" id="password"  class="input2" maxlength=16 /></td>
        </tr>

        <tr >
            <td valign="middle"><a href="#" ><img id="loginbtn" src="${basePath}/plugins/login/images/login_14.jpg" width="274" height="40" border="0" style="padding-top:35px" onmouseover="changeimg(this,true);" onmouseout="changeimg(this,false);"/></a></td>
        </tr>

    </table>
        <%--<input type="hidden" name="page" value="system/loginsuccess">--%>
    </form>
</div>
</body>
<script type="text/javascript" src="${basePath}/plugins/jquery/jquery-1.8.3.js"></script>
<script type="text/javascript">

    if(window !=top){
        top.location.href=location.href;
    }

//    var innerHeight = window.innerHeight/2;
//    var divHeight = $('.htmleaf-container').height()/2;
//    $('.htmleaf-container').css('padding-top',innerHeight-divHeight);

    $(function () {
        $('#loginbtn').click(function () {
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

        });
    });

    function changeimg(o,flag){
        if(flag)
            o.src = '${basePath}/plugins/login/images/login_12.jpg'
        else
            o.src = '${basePath}/plugins/login/images/login_14.jpg'
    }

</script>
</html>
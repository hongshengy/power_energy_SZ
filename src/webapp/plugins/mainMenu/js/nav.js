$(function(){
    // nav收缩展开
    $('.nav-item>a').on('click',function(){
        if (!$('.nav').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');

                if($("#menuList").height()+$(".nav-top").height() < $(".nav").height()){

                }else{
                    setTimeout('$(".nav").height($("#menuList").height()+$(".nav-top").height());$("body").height($("#menuList").height()+$(".nav-top").height());$(".iframeDiv").height($("#menuList").height()+$(".nav-top").height());',300);
                }
                // setTimeout('alert($(".nav").height());alert($("#menuList").height());',1000);

                // setTimeout('$(".nav").height($("#menuList").height()+$(".nav-top").height());$("body").height($("#menuList").height()+$(".nav-top").height());$(".iframeDiv").height($("#menuList").height()+$(".nav-top").height());$("#iframeMain").height($("#menuList").height()+$(".nav-top").height())',300);
                // $('body').height($('.nav').height());
            }else{
                //收缩已展开

                $(this).next('ul').slideUp(300);
                $('.nav-item.nav-show').removeClass('nav-show');
            }
        }
    });
    //nav-mini切换
    $('#mini').on('click',function(){
        if (!$('.nav').hasClass('nav-mini')) {
            $('.nav-item.nav-show').removeClass('nav-show');
            $('.nav-item').children('ul').removeAttr('style');
            $('.nav').addClass('nav-mini');
            $('.iframeDiv').animate({paddingLeft:"60px"},200);
            //$('.iframeDiv').css('padding-left', 60);
            // setTimeout("$('.iframeDiv').css('padding-left', $('#navDiv').width());",300);
        }else{
            $('.nav').removeClass('nav-mini');
            $('.iframeDiv').animate({paddingLeft:"220px"},200);
            //$('.iframeDiv').css('padding-left', 220);
            // setTimeout("$('.iframeDiv').css('padding-left', $('#navDiv').width());",300);
        }
    });
});
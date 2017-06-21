/**
 * Created by Administrator on 2017/6/7.
 */
$(function(){
    $("#inner").width(($(".inner_l ").width()) + ($(".main_tab ").width())+30);
    $('.list_l').on('mouseover' , function(){
        $(this).addClass('checked').siblings().removeClass('checked');
        $('.tab_imgL').eq($(this).index()).addClass('active').siblings().removeClass('active');
        var $index = $(this).index();
        $("#outer").stop().animate({'left':-395*$index + 'px'},'normal');
    });
})
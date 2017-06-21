$(function(){

    $('.list_even').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.boxCont').eq($(this).index()).addClass('block').siblings().removeClass('block');
        $(this).on('mouseout' , function(){
            $(this).removeClass('active');
        });
        $('.boxCont').eq($(this).index()).on('mouseover' , function(){
            $('.list_even').eq($(this).index()).addClass('active');
            $(this).addClass('block');
            $('.even_li p a').eq($(this).index()).css('color' , '#fff');
        })
        $('.boxCont').eq($(this).index()).on('mouseout' , function(){
            $('.boxCont').removeClass('block');
        })
        $('.list_even').eq($(this).index()).on('mouseout' , function(){
            $('.boxCont').removeClass('block');
        })
    });

})
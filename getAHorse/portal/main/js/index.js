/**
 * Created by Administrator on 2017/6/5.
 */

$(function(){
    // 清除页面定时器
    if(pulse_timer != undefined){
        clearInterval(pulse_timer);
    }

    // 瀑布流
    /*$('.grid').masonry({
        itemSelector: '.grid-item'
    });*/

    // 呼吸效果
    var pulse_item = clear_pulse_item();
    var len = pulse_item.length;
    var i = 0;
    var j = 0;
    var pulse_timer = setInterval(function(){
        if( i > len-1){
            i = 0;
        }
        $(pulse_item[i]).toggleClass('pulse');
        setTimeout((function(){
            if(j > 0 && i == 0){
                i = len;
                $(pulse_item[i-1]).toggleClass('pulse');
                i = 0;
            }
            $(pulse_item[i-1]).toggleClass('pulse');
            j++;
        }()),2000);
        i++;
    },2000);

    // 滑入滑出动画添加移除
    $('.pulse-item').mouseover(function(){
        $(this).addClass('pulse__');
    }).mouseout(function(){
        $(this).removeClass('pulse__');
    });

    // 加载gif图
    document.getElementById("img_load").onload=function(){
        $('.st_gif').attr('src','./main/img/st.gif');
    };

    var inWindth = Number( $('.img_show').css('width').split('px')[0]) + Number( $('.txt_show').css('width').split('px')[0]) ;
    $('#inner').css('width', inWindth);
});

/**
 * 整理呼吸效果的图片
 * @returns {Array}
 */
function clear_pulse_item(){
    var _pulse_item = [];
    var _pulse_item_arr = [];
    var pulse_item = $('.pulse-item');
    var len = pulse_item.length;
    $.each(pulse_item, function(index, item){
        if(index <= len - 3 ){// 0-5
            _pulse_item.push(item);
        }else{
            _pulse_item.unshift(item);
        }
    });
    $.each(_pulse_item, function(index, item){
        var data_id = $(_pulse_item[index]).attr('data-id');
        _pulse_item_arr[data_id] = item;
    });
    return _pulse_item_arr;
}




























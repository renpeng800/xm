/**
 * Created by Administrator on 2017/6/8.
 */
$(function(){
    var loop_item_len = $('.loop_item').length;
    jQuery(".slideTxtBox").slide({
        mainCell:".bd ul",
        effect:"leftLoop",
        vis:4,
        scroll:1
    });
    if( loop_item_len > 4 ){
        $('.next_s, .prev_s').hide();
    }
});
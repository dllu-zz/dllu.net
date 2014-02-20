// dllu.js by dllu
// You are free to copy this code without attribution, but this is very bad code. Use at your own risk.
// I am not responsible for any grievous injury or disease sustained by viewing this code.

$(document).ready( function() {
    recolorblog();
    window.setInterval(recolorblog,4000);
    if(window.location.hash.length > 2) {
        var path = window.location.hash.split('#')[1];
        window.location = window.location.origin + '/' + path;
    }
});

recolorblog = function() {
    // console.log('coloring...');
    $('.portfoliotile.text').each(function(){
        $(this).css({'background-color':'rgb('+~~(Math.random()*25+200)+','+~~(Math.random()*25+200)+','+~~(Math.random()*50+200)+')'});
    });
}

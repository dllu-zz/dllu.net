// dllu.js by dllu
// You are free to copy this code without attribution, but this is very bad code. Use at your own risk.
// I am not responsible for any grievous injury or disease sustained by viewing this code.

$(document).ready( function() {
    window.setInterval(recolorblog,5000);
});

recolorblog = function() {
    console.log('coloring...');
    $('.portfoliotile.text').each(function(){
        $(this).css({'background-color':'rgb('+~~(Math.random()*30+200)+','+~~(Math.random()*30+200)+','+~~(Math.random()*30+200)+')'});
    });
}

$(document).ready( function() {
    $('#javascript-alert').remove();

    var evaluatePath = function() {
        var working_directory = '/' + window.location.hash.split('#')[1];
        console.log(working_directory);
    }

    $('.nav a, .portfolio a').click(function(e) {
        e.preventDefault;
        var old_working_directory = '/' + window.location.hash.split('#')[1];
        window.location.hash = $(this).attr('href');
        evaluatePath();
    });
    var loadContent = function(e) {
        e.preventDefault();
        $(this).css({'background-color':'#dde'})
        var newContent = $('<div>').addClass('content-inside');
        newContent.click(addContent);
        $(this).parent().append(newContent);
    };
    //$('.content-inside').click(addContent);
});
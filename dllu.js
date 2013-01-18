
$(document).ready( function() {
    $('#javascript-alert').remove();
    window.onhashchange = evaluatePath;
    $('#dllu').children('a').click(bindNavigationLinks);
    evaluatePath();
});


renderContent = function(data, contentInside) {
    contentInside.html(data);
    contentInside.find('.nav a, .portfolio a').click(bindNavigationLinks);
    contentInside.find('a').each(function() {
        if(window.location.hash.indexOf($(this).attr('href')) !== -1) $(this).addClass('selected');
    });
};
loadContent = function(path, contentInside) {
    var is_undefined = contentInside === undefined;
    if(is_undefined) {
        contentInside = $('<div>').addClass('content-inside');
        $('#content').append(contentInside);
    }
    $.get(path, function(data) {
        renderContent(data, contentInside);
    }, 'html').error(function(data, textStatus, jqXHR) {
        renderContent('<section><h1>Error: ' + jqXHR + '</h1><p>' + textStatus + '</p></section>', contentInside);
    });
};

bindNavigationLinks = function(e) {
    //e.preventDefault;
    //console.log($(this).attr('href'));
    //window.location.hash = $(this).attr('href');
    //evaluatePath();
};

evaluatePath = function() {
    var working_directory = '';
    if(window.location.hash.indexOf('#') !== -1) {
        working_directory = window.location.hash.split('#')[1];
    }
    var working_directory_split = working_directory.split('/');

    var i = working_directory_split.length;
    console.log(working_directory_split, i);
    if(working_directory_split[i-1] === '' || working_directory_split[i-1] === undefined) i--; //remove effect of trailing slash
    if(working_directory === '') i = 0;

    var firstContentInside = $('#content').children('.content-inside')[0];
    if(firstContentInside !== undefined) {
        firstContentInside = $(firstContentInside);
    }
    if(i === 0) {
        loadContent('main.html', firstContentInside);
    } else {
        loadContent('nav.html', firstContentInside);
    }

    var path = '';
    var contentChildren = $('#content').children('.content-inside');
    var iterationLength = contentChildren.length;
    $('#breadcrumbs').html('');
    for(var j=1; j<=i; j++) {
        path += working_directory_split[j-1] + '/';
        $('#breadcrumbs').append($('<a>').text(working_directory_split[j-1]).attr('href', '#' + path)).append(' / ');
        var contentInside = contentChildren[j] === undefined? undefined : $(contentChildren[j])
        if(j<i) {
            console.log('/branch', path);
            loadContent(path + 'nav.html', contentInside);
        } else {
            console.log('/node', path);
            loadContent(path + 'main.html', contentInside);
        }
    }
    console.log(i, iterationLength);
    for(var j=i+1; j<iterationLength; j++){
        $(contentChildren[j]).remove();
    }
    $('#breadcrumbs a').click(bindNavigationLinks);
    $('title').text('dllu/'+path);
};

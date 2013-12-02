// dllu.js by dllu
// You are free to copy this code without attribution, but this is very bad code. Use at your own risk.
// I am not responsible for any grievous injury or disease sustained by viewing this code.

var lolcache = {};
var imgcache = {};
var loading = 0;
var working_directory;
var bad = false;

$(document).ready( function() {
    if(false) {
        console = {log: function() {}};
    }
    working_directory = '';
    $('#javascript-alert').remove();
    window.onhashchange = evaluatePath;
    evaluatePath();
    window.onresize = arrangeTiles;
});


renderContent = function(data, contentInside, p) {
    if(data.length>0) {
        contentInside.html(data);
        // contentInside.find('a').each(function() {
        //     if(!p) {
        //         if(window.location.hash.indexOf($(this).attr('href')) !== -1) $(this).addClass('selected');
        //     } else {
        //         if(('#' + p).indexOf($(this).attr('href')) !== -1) $(this).addClass('selected');
        //     }
        // });
        contentInside.find('img').one('load', function() {
            $(this).addClass('loaded');
        }).each(function() {
            if(this.complete) $(this).addClass('loaded');
        });
    } else {
        contentInside.remove();
    }
    loading--;
    if(loading === 0) {
        $('#content').removeClass('loading');
        if(p===undefined) {
            lolcache[working_directory] = $('#content').html();
            scout();
            arrangeTiles();
        } else {
            lolcache[p] = $('#invisible').html();
            $('#invisible').html('');
        }
    }
};
loadContent = function(path, contentInside, p) {
    var is_undefined = contentInside === undefined;
    if(is_undefined) {
        contentInside = $('<div>').addClass('content-inside');
        if(p===undefined) {
            $('#content').append(contentInside);
        } else {
            $('#invisible').append(contentInside);
        }
    }
    loading++;
    $.ajax({
        url:path, 
        success:function(data) {
            renderContent(data, contentInside, p);
        },
        error:function(data, textStatus, jqXHR) {
            renderContent('<section><h1>Error: ' + jqXHR + '</h1><p>' + textStatus + '</p></section>', contentInside, p);
        },
        dataType:'html',
        cache:false
    });
};

evaluatePath = function() {
    bad = false;
    working_directory = '';
    if(window.location.hash.indexOf('#') !== -1) {
        working_directory = window.location.hash.split('#')[1];
    }
    working_directory = working_directory.replace(/\/+$/, "");
    var working_directory_split = working_directory.split('/');

    var i = working_directory_split.length;

    console.log(working_directory_split, i);
    if(working_directory_split[i-1] === '' || working_directory_split[i-1] === undefined) i--; //remove effect of trailing slash
    if(working_directory === '') i = 0;
    if(working_directory_split[0] === 'DEBUG') {
        debug();
        return;
    }

    if(lolcache[working_directory] !== undefined) {
        var path = '';
        $('#content').html(lolcache[working_directory]);
        $('#breadcrumbs').html('');
        for(var j=1; j<=i; j++) {
            path += working_directory_split[j-1] + '/';
            $('#breadcrumbs').append($('<a>').text(working_directory_split[j-1]).attr('href', '#' + path));
        }
        $('title').text('dllu/'+working_directory);
        scout();
        arrangeTiles();

        $('#content').find('img').one('load', function() {
            $(this).addClass('loaded');
        }).each(function() {
            if(this.complete) $(this).addClass('loaded');
        });
        return;
    }
    $('#content').addClass('loading');

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
        $('#breadcrumbs').append($('<a>').text(working_directory_split[j-1]).attr('href', '#' + path));
        var contentInside = contentChildren[j] === undefined? undefined : $(contentChildren[j]);
        if(j<i) {
            console.log('/branch', path);
            loadContent(path + 'nav.html', contentInside);
        } else {
            console.log('/node', path);
            loadContent(path + 'main.html', contentInside);
        }
    }
    // if(working_directory.length <=1) {
    //     var extraContent = ['design', 'engineering', 'programming'];
    //     for(var j=0; j<3; j++) {
    //         var contentInside = contentChildren[j+i+1] === undefined? undefined : $(contentChildren[j]);
    //         loadContent(extraContent[j]+'/main.html', contentInside);
    //     }
    // }
    console.log(i, iterationLength);
    for(var j=i+1; j<iterationLength; j++){
        $(contentChildren[j]).remove();
    }
    $('title').text('dllu/'+working_directory);
};

scout = function() {
    var zxcv = false;
    var qwer = false;
    $('#content a, #dllu').each(function() {
        var $this = $(this);
        if($this.attr('href')[0] === '#') {
            if(!loading) {
                qwer = true;
                if(cache_populate($this.attr('href'))) {
                    zxcv = true;
                }
            }
        }
    });
    if(!zxcv && qwer) {
        bad = true;
    } else {
        setTimeout(scout, 500);
    }
};

cache_populate = function(path) {
    if(path.indexOf('#') !== -1) {
        path = path.split('#')[1];
    }
    path = path.replace(/\/+$/, "");
    var path_split = path.split('/');
    if(lolcache[path] !== undefined) {
        return false;
    }

    var i = path_split.length;
    console.log('SCOUTING', path_split, i);
    if(path_split[i-1] === '' || path_split[i-1] === undefined) i--; //remove effect of trailing slash
    if(path === '') i = 0;

    var firstContentInside = $('#invisible').children('.content-inside')[0];
    if(firstContentInside !== undefined) {
        firstContentInside = $(firstContentInside);
    }
    if(i === 0) {
        loadContent('main.html', firstContentInside, path);
    } else {
        loadContent('nav.html', firstContentInside, path);
    }
    var p = '';
    var contentChildren = $('#invisible').children('.content-inside');
    var iterationLength = contentChildren.length;
    for(var j=1; j<=i; j++) {
        p += path_split[j-1] + '/';
        var contentInside = contentChildren[j] === undefined? undefined : $(contentChildren[j])
        if(j<i) {
            console.log('/branch', p);
            loadContent(p + 'nav.html', contentInside, path);
        } else {
            console.log('/node', p);
            loadContent(p + 'main.html', contentInside, path);
        }
    }
    console.log('SCOUTING', i, iterationLength);
    for(var j=i+1; j<iterationLength; j++){
        $(contentChildren[j]).remove();
    }
    return true;
};

debug = function() {
    $('#content').html('');
    $.each(lolcache, function(k, v) {
        $('#content').append($('<div class="content-inside">').append($('<section>').append(
            $('<h1>').text(k)).append($('<pre>').append('<code>').text(v))));
    });
};

arrangeTiles = function() {
    $('#content .portfolio').each(function() {
        var n = $(this).find('.portfoliotile').length;
        console.log('arranging', n);
        if(n===4 && window.innerWidth < 4*334+50) {
            $(this).find('br').remove();
            $('<br>').insertAfter($($(this).children()[1]));
        } else {
            $(this).find('br').remove();
        }
    });
};

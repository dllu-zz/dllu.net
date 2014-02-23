// dllu.js by dllu

window.onload = function() {
    var blogposts = document.getElementsByClassName('text');
    if(blogposts.length) {
        recolorblog();
        window.setInterval(recolorblog,4000);
    }
    if((window.location.pathname.length < 2) && window.location.hash.length > 2) {
        var path = window.location.hash.split('#')[1];
        window.location = window.location.origin + '/' + path;
    }
    resizeblog();
    var switcher = document.getElementById('switcher');
    if(switcher) switcher.onclick = function() {
        var switcher = document.getElementById('switcher');
        var portfolio = document.getElementsByClassName('portfolio');
        if(switcher.className === 'list') {
            switcher.className = '';
            for(var i=0, _i = portfolio.length; i<_i; i++) {
                portfolio[i].className = 'portfolio';
            }
        } else {
            switcher.className = 'list';
            for(var i=0, _i = portfolio.length; i<_i; i++) {
                portfolio[i].className = 'portfolio list';
            }
        }
    }
};

window.onresize = resizeblog = function() {
    var bloglist = document.getElementById('bloglist'), blogpost = document.getElementById('blogpost');
    if(bloglist && blogpost) {
        bloglist.style['height'] = null;
        blogpost.style['height'] = null;
        var h = Math.max(bloglist.offsetHeight, blogpost.offsetHeight)+1;
        bloglist.style['height'] = h + 'px';
        blogpost.style['height'] = (h - 51) + 'px';
    }
}

recolorblog = function() {
    var blogposts = document.getElementsByClassName('text');
    for(var i=0, _i=blogposts.length; i<_i; i++) {
        blogposts[i].style.backgroundColor = 'rgb('+~~(Math.random()*25+200)+','+~~(Math.random()*25+200)+','+~~(Math.random()*50+200)+')';
    }
}

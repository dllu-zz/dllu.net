// dllu.js by dllu

window.onload = function() {
    var blogposts = document.getElementsByClassName('text');
    if(blogposts.length) {
        recolorBlog();
        window.setInterval(recolorBlog,4000);
    }
    if((window.location.pathname.length < 2) && window.location.hash.length > 2) {
        var path = window.location.hash.split('#')[1];
        window.location = window.location.origin + '/' + path;
    }
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
    adjustTiles();
    window.onresize = adjustTiles;
};

recolorBlog = function() {
    var blogposts = document.getElementsByClassName('text');
    for(var i=0, _i=blogposts.length; i<_i; i++) {
        blogposts[i].style.backgroundColor = 'rgb('+~~(Math.random()*25+200)+','+~~(Math.random()*25+200)+','+~~(Math.random()*50+200)+')';
    }
}

adjustTiles = function() {
    var portfolios = document.getElementsByClassName('portfolio');

    for(var i=0, _i=portfolios.length; i<_i; i++) {
        portfolios[i].style.paddingLeft = ~~(portfolios[i].offsetWidth - (~~(portfolios[i].offsetWidth/316))*316)/2 + 'px';
        portfolios[i].style.textAlign = 'left';
    }
}

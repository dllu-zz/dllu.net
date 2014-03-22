// dllu.js by dllu

window.onload = function() {
    if((window.location.pathname.length < 2) && window.location.hash.length > 2) {
        var path = window.location.hash.split('#')[1];
        window.location = window.location.origin + '/' + path;
    }
};


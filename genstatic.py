#!/usr/bin/python

import os, codecs, time
from bs4 import BeautifulSoup
def renderstatic(path, html, index):
    children = os.listdir(path)
    if 'main.html' in children:
        spath = 's'
        _path = ''
        breadcrumbs = []
        for p in path.split('/'):
            if p == '.' or p == '' or p == 'site':
                continue
            spath = os.path.join(spath, p)
            _path = os.path.join(_path, p)
            breadcrumbs.append(_path)
            if not os.path.exists(spath):
                os.mkdir(spath)
        # bad
        cont = codecs.open(os.path.join(path, 'main.html'), 'r','utf-8').read()
        page = index.replace('<!--area for content-->', 
            html+'<div class="content-inside">'+cont+'</div>')
        page = page.replace('<title>\n   dllu', '<title>dllu'+path[4:])
        bc = ''
        for crumb in breadcrumbs:
            page = page.replace('href="/' + crumb + '/"', 'class="selected" href="/' + crumb + '/"')
            bc += '<a href="/' + crumb + '/">' + os.path.split(crumb)[1] + '</a>'
        page = page.replace('<div id="breadcrumbs">', '<div id="breadcrumbs">'+bc)
        spath = os.path.join(spath, 'index.html')
        print(spath, path)
        f = codecs.open(spath, 'w','utf-8')
        soup = BeautifulSoup(page)
        tiles = soup.findAll('span',attrs={'class':'portfoliotile'})
        for tile in tiles:
            im = tile.findChild('img')
            if im is not None and not im.has_attr('alt'):
                im.attrs['alt'] = tile.findNextSibling().text
        page = soup.prettify(formatter='minimal')
        f.write(page)
        f.close()
    if 'nav.html' in children:
        navstuff = codecs.open(os.path.join(path, 'nav.html'), 'r', 'utf-8').read()
        if len(navstuff)>1:
            html += '<div class="content-inside">'+navstuff+'</div>'
        for child in children:
            if os.path.isdir(os.path.join(path, child)):
                renderstatic(os.path.join(path, child), html, index)

def main():
    index = codecs.open('index.html','r','utf-8').read()
    soup = BeautifulSoup(index)
    index = soup.prettify()
    renderstatic('site', '', index)
    humans = codecs.open('humans.txt', 'r', 'utf-8').read()
    humans = humans.replace('_UPDATE_', time.strftime("%d %b %Y", time.localtime()))
    f = codecs.open('site/humans.txt', 'w', 'utf-8')
    f.write(humans)
    f.close()
    blogs = sorted(os.listdir('site/blog/'))[-1]
    gae = codecs.open('site/main.py', 'r', 'utf-8').read()
    gae = gae.replace('{LATEST}', blogs)
    gae2 = codecs.open('main.py', 'w', 'utf-8')
    gae2.write(gae)
    gae2.close()

if __name__ == '__main__':
    main()
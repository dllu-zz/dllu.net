#!/usr/bin/python

import os, codecs
from bs4 import BeautifulSoup
def renderstatic(path, html, index):
    children = os.listdir(path)
    if 'main.html' in children:
        spath = 's'
        breadcrumbs = []
        for p in os.path.split(path):
            if p == '.' or p == '':
                continue
            spath = os.path.join(spath, p)
            breadcrumbs.append(spath)
            if not os.path.exists(spath):
                os.mkdir(spath)
        # bad
        page = index.replace('<!--area for content-->', 
            html+'<div class="content-inside">'+(codecs.open(os.path.join(path, 'main.html'), 'r','utf-8').read())+'</div>')
        page = page.replace('<title>dllu', '<title>dllu'+path[1:])
        bc = ''
        for crumb in breadcrumbs:
            bc += '<a href="/' + crumb + '">' + os.path.split(crumb)[-1] + '</a>'
        page = page.replace('<div id="breadcrumbs">', '<div id="breadcrumbs">'+bc)
        spath = os.path.join(spath, 'index.html')
        print(spath, path, ups)
        f = codecs.open(spath, 'w','utf-8')
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
    renderstatic('.', '', index)

if __name__ == '__main__':
    main()
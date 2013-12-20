#!/bin/python3

import os
from bs4 import BeautifulSoup
def renderstatic(path, html, index):
    children = os.listdir(path)
    if 'main.html' in children:
        spath = 's'
        ups = '.'
        for p in os.path.split(path):
            if p == '.' or p == '':
                continue
            ups = os.path.join(ups, '..')
            spath = os.path.join(spath, p)
            if not os.path.exists(spath):
                os.mkdir(spath)
        page = index.replace('<!--area for content-->', html+'<div class="content-inside">'+(open(os.path.join(path, 'main.html'), 'r').read()))+'</div>'
        page = page.replace('href="#', 'href="s/')
        page = page.replace('href="', 'href="'+ups+'/../')
        page = page.replace('href="'+ups+'/../http://', 'href="http://')
        page = page.replace('="dllu.', '="'+ups+'/../dllu.')
        page = page.replace('src="', 'src="'+ups+'/../')
        page = page.replace('src="'+ups+'/../http://', 'src="http://')
        page = page.replace('<img', '<img class="loaded"')
        spath = os.path.join(spath, 'index.html')
        print(spath, path, ups)
        f = open(spath, 'w')
        f.write(page)
        f.close()

    if 'nav.html' in children:
        html += '<div class="content-inside">'+(open(os.path.join(path, 'nav.html'), 'r').read())+'</div>'
        for child in children:
            if os.path.isdir(os.path.join(path, child)):
                renderstatic(os.path.join(path, child), html, index)

def main():
    index = open('index.html','r').read()
    soup = BeautifulSoup(index)
    soup.find('script').extract()
    soup.find(attrs={'id':'javascript-alert'}).extract()
    index = soup.prettify()
    renderstatic('.', '', index)

if __name__ == '__main__':
    main()
#!/usr/bin/env python
# Generate a blog
import os
import sys
import markdown

def parsedate(date):
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	return str(int(date[9:11])) + " " + months[int(date[6:8])-1] + " " + date[1:5]

def main(prog_args):
	blogs = sorted(os.listdir('blog'), reverse=True)
	f_main = open('main.html', 'w')
	h_main = """<div class="portfolio">"""
	f_nav = open('nav.html', 'w')
	h_nav = """<div class="portfolio">"""
	m = markdown.Markdown()
	counter = 0
	for blog in blogs:
		if blog.split('.')[1] == 'markdown':
			b = blog.split('.')[0]
			try:
				os.mkdir(b)
			except OSError as e:
				if e.errno == 17:
					pass
				else:
					raise e
			blog_in = open(os.path.join('blog',blog),'r')
			blog_in_html = m.convert(blog_in.read())
			html = """<section id="%s">""" % b
			html += """<h3>%s</h3>""" % parsedate(b)
			html += blog_in_html
			html += """</section>"""
			blog_out = open(os.path.join(b,'main.html'),'w')
			blog_out.write(html)
			if counter < 5:
				h_main += """<a href="#blog/%s"><div class="portfoliotile text"><p>%s</p></div><div class="caption">%s</div></a>""" % (b, (blog_in_html.split('</h1>')[0].split('<h1>')[1]), parsedate(b))
			elif counter == 5:
				h_main += """<br><a href="#blog/%s"><div class="caption">%s</div></a>""" % (b, parsedate(b))
			else:
				h_main += """<a href="#blog/%s"><div class="caption">%s</div></a>""" % (b, parsedate(b))
			h_nav += """<a href="#blog/%s"><div class="caption">%s</div></a>""" % (b, parsedate(b))
	h_nav += """</div>"""
	h_main += """</div>"""
	f_main.write(h_main)
	f_nav.write(h_nav)
	return 0


if __name__ == "__main__":
    sys.exit( main(sys.argv[1:]))

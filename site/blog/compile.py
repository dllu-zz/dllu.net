#!/usr/bin/env python
# Generate a blog
import os
import sys
import markdown
import time

def parsedate(date):
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	return str(int(date[9:11])) + " " + months[int(date[6:8])-1] + " " + date[1:5]

def parsedate2(date):
	return (int(date[1:5]), int(date[6:8]), int(date[9:11]), 0, 0, 0, 0, 0, 0)

def main(prog_args):
	blogs = sorted(os.listdir('blog'), reverse=True)
	f_main = open('main.html', 'w')
	h_main = """<a href="/blog/rss.xml" id="rss"></a><ul class="portfolio">"""
	f_nav = open('nav.html', 'w')
	h_nav = """<ul id="bloglist">"""
	f_rss = open('rss.xml', 'w')
	rss = """<?xml version="1.0" ?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
		<channel>
			<atom:link href="http://dllu.net/blog/rss.xml" rel="self" type="application/rss+xml" />
			<title>Daniel Lu's Blog</title>
			<link>http://dllu.net/blog</link>
			<description>A blog of some things.</description>
			<language>en-ca</language>
			<lastBuildDate>%s</lastBuildDate>
			<generator>dllu secret blog engine</generator>
			""" % time.strftime("%a, %d %b %Y %H:%M:%S %z")
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
			html = """<section id="blogpost">"""
			html += """<h3>%s</h3>""" % parsedate(b)
			html += blog_in_html
			html += """
	<div id="disqus_thread"></div>
	<script type="text/javascript">
		/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
		var disqus_shortname = 'dllunet'; // required: replace example with your forum shortname

		/* * * DON'T EDIT BELOW THIS LINE * * */
		(function() {
			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
			dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		})();
	</script>
	<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
			"""
			html += """</section>"""
			blog_out = open(os.path.join(b,'main.html'),'w')
			blog_out.write(html)
			title = blog_in_html.split('</h1>')[0].split('<h1>')[1]
			h_main += """<li><a href="%s/"><span class="portfoliotile text"><span>%s</span></span><span class="caption">%s</span></a></li>""" % (b, title, parsedate(b))
			h_nav += """<li><a href="/blog/%s/"><span class="date">%s</span><span class="title">%s</span></a></li>""" % (b, parsedate(b), title)
			rss += """
			<item>
				<title>%s</title>
				<link>%s</link>
				<description>%s</description>
				<pubDate>%s</pubDate>
				<guid isPermaLink="true">%s</guid>
			</item>""" % (
				title, 
				"http://dllu.net/blog/"+b, 
				"Blog post of "+parsedate(b), 
				time.strftime("%d %b %Y %H:%M:%S %z",parsedate2(b)),
				"http://dllu.net/blog/"+b)
			counter+=1
	h_nav += """</ul>"""
	h_main += """</ul>"""
	rss += """
		</channel>
	</rss>"""
	f_main.write(h_main)
	f_nav.write(h_nav)
	f_rss.write(rss)
	return 0


if __name__ == "__main__":
	sys.exit( main(sys.argv[1:]))

cd site/blog
python compile.py
cd ../..
python genstatic.py
curl -X POST -s --data-urlencode 'input@site/dllu.css' http://cssminifier.com/raw > site/dllu.min.css
cp site/humans.txt readme.md
cp main.py ~/website/main.py
cp app.yaml ~/website/app.yaml
rsync -r --exclude=\.* s/ ~/website/static
rsync -r --exclude=\.* projects/ ~/website/static
rsync -r --exclude=\.* site/ ~/website/static
# dev_appserver.py ~/website
appcfg.py update ~/website

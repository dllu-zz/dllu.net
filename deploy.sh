cd blog
python compile.py
cd ..
python genstatic.py
rsync -r --exclude=\.* s/ ~/website/static
rsync -r --exclude=\.* projects/ ~/website/static
rsync -r --exclude=\.* site/ ~/website/static
# appcfg.py update ~/website

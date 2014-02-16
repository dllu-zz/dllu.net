cd blog
python compile.py
cd ..
python genstatic.py
rsync -r --exclude=\.* . ~/website/static
appcfg.py update ~/website

cd blog
./compile.py
cd ..
./genstatic.py
rsync -r --exclude=\.* . ~/website/static
appcfg.py update ~/website

cd blog
./compile.py
cd ..

rsync -r --exclude=\.* . ~/website/static
appcfg.py update ~/website

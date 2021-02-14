#!/bin/bash

# This script pushes code changes to the master branch and then merges the master branch with the gh-pages branch (which is what the live website uses)
# I got this from https://gist.github.com/mandiwise/44d1edce18f2ffb14f63

# This script can be run using the terminal command below, make sure the path is correct relative to your current terminal location, 
# and make sure you use the right filename (if this file is not called push_and_merge.sh, then change that part of the command):
# ~~~~~~~~~~~~~~~~~~~~~~~~
# bash push_and_merge.sh
# ~~~~~~~~~~~~~~~~~~~~~~~~
#
# Also note that you can provide an argument, for your git commit message:
# ~~~~~~~~~~~~~~~~~~~~~~~~
# bash push_and_merge.sh "This is my commit message!"
# ~~~~~~~~~~~~~~~~~~~~~~~~

# Reference: http://lea.verou.me/2011/10/easily-keep-gh-pages-in-sync-with-master/
git add .
git status # to see what changes are going to be commited
git commit -m "${1:-no commit message provided}" # $1 is the first command line argument (bash push_and_merge.sh "My Commit Message") -> My Commit Message" is $1
git push origin master

git checkout gh-pages # go to the gh-pages branch
git rebase master # bring gh-pages up to date with master
git push origin gh-pages # commit the changes
git checkout master # return to the master branch

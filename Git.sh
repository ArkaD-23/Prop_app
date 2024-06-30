#!/bin/bash

commit_message=$1

git add .

git status

echo "Commiting message............"
git commit -m "$commit_message"

git push origin master
#!/bin/bash

commit_message=$1

git add .

echo "Git Status............"
git status

echo "Commiting message............"
git commit -m "$commit_message"

echo "Pushing code.............."
sleep 5
git push origin master
#!/bin/bash

set -e

SSH_FILE="$HOME/.ssh/ui-deploy"
GH_REPO="git@github.com:${TRAVIS_REPO_SLUG}"

echo "GH_REPO=$GH_REPO"

# Decrypt the private key
openssl aes-256-cbc -K $encrypted_f756de08862a_key -iv $encrypted_f756de08862a_iv -in ui-deploy.enc -out "$SSH_FILE" -d

# Enable SSH authentication
chmod 600 "$SSH_FILE"
printf "%s\n" \
  "Host github.com" \
  "  IdentityFile $SSH_FILE" \
  "  LogLevel ERROR" >> ~/.ssh/config

export NODE_ENV=development
npm run build:storybook
cd .out
git config --global user.email $COMMIT_AUTHOR_EMAIL
git config --global user.name $COMMIT_AUTHOR_USERNAME
git init
git add .
git commit -m "Deploy Storybook to Github Pages"

git remote add origin "$GH_REPO"
git push --force --quiet origin master:gh-pages
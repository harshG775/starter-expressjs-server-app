# dev deployment staging step

- git pull origin dev
- git add -f dist package.json vercel.json readme.md
- git commit -m 'Build and deploy artifacts to staging'
- git push
- git switch dev

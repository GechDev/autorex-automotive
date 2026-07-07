$ErrorActionPreference = 'Stop'

$env:GIT_COMMITTER_DATE = '2026-07-31T17:03:19'
git add .
git commit -m "feat: modularize admin data tables and integrate shadcn ui components for consistent user experience" --date="2026-07-31T17:03:19"
$newCommit = (git rev-parse HEAD).Trim()

git checkout 23d4f73~1

git cherry-pick 23d4f73
$env:GIT_COMMITTER_DATE = '2026-07-29T10:34:11'
git commit --amend --no-edit --date="2026-07-29T10:34:11"

git cherry-pick a0dde9a
$env:GIT_COMMITTER_DATE = '2026-07-29T14:12:44'
git commit --amend --no-edit --date="2026-07-29T14:12:44"

git cherry-pick fd7c9c5
$env:GIT_COMMITTER_DATE = '2026-07-30T09:21:56'
git commit --amend --no-edit --date="2026-07-30T09:21:56"

git cherry-pick 5ae4581
$env:GIT_COMMITTER_DATE = '2026-07-31T15:48:29'
git commit --amend --no-edit --date="2026-07-31T15:48:29"

git cherry-pick $newCommit
$env:GIT_COMMITTER_DATE = '2026-07-31T17:03:19'
git commit --amend --no-edit --date="2026-07-31T17:03:19"

git branch -f main HEAD
git checkout main
Remove-Item Env:\GIT_COMMITTER_DATE
git push -f origin main

const { execSync } = require('child_process');

try {
  // Get all commits
  const log = execSync('git --no-pager log --format="%H|%s" --reverse main').toString().trim().split('\n');

  // Create orphan branch
  try { execSync('git branch -D temp-backdate'); } catch(e){}
  execSync('git checkout --orphan temp-backdate');
  
  // Clear the index and working tree to start fresh
  try { execSync('git rm -rf .'); } catch(e){}
  
  let day = 1;
  let count = 0;

  for (const line of log) {
    const splitIndex = line.indexOf('|');
    const hash = line.slice(0, splitIndex);
    const msg = line.slice(splitIndex + 1);
    
    count++;
    if (count > 4) {
      day++;
      count = 1;
    }
    
    const dateStr = `2026-07-${day.toString().padStart(2, '0')} 10:${(count*10).toString().padStart(2, '0')}:00`;
    console.log(`Recreating commit ${hash} as ${dateStr} - ${msg}`);
    
    // Check out files exactly as they were in this commit
    execSync(`git read-tree -u --reset ${hash}`);
    
    // Commit
    execSync(`git commit --no-verify -m "${msg}"`, {
      env: { ...process.env, GIT_AUTHOR_DATE: dateStr, GIT_COMMITTER_DATE: dateStr }
    });
  }

  // Swap to main
  execSync('git checkout -B main temp-backdate');
  execSync('git branch -D temp-backdate');
  
  console.log('Successfully backdated commits!');
} catch (error) {
  console.error(error.toString());
  if (error.stdout) console.error(error.stdout.toString());
  if (error.stderr) console.error(error.stderr.toString());
}

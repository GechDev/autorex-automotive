#!/bin/bash

# Get all commit hashes in chronological order
COMMITS=($(git log --format="%H" --reverse))

# Total commits: ${#COMMITS[@]}
COUNT=0
DAY=1

# Create the filter script content
FILTER_SCRIPT="case \$GIT_COMMIT in"

for HASH in "${COMMITS[@]}"; do
  # Calculate date: start from July 1, 2026. Increment day every 4 commits.
  if [ $COUNT -ge 4 ]; then
    DAY=$((DAY + 1))
    COUNT=0
  fi
  
  # Format day to 2 digits
  DAY_STR=$(printf "%02d" $DAY)
  TIME_STR=$(printf "%02d" $((COUNT * 2 + 10)))
  
  DATE_STR="2026-07-${DAY_STR} ${TIME_STR}:00:00 +0000"
  
  FILTER_SCRIPT="${FILTER_SCRIPT}
  ${HASH})
    export GIT_AUTHOR_DATE=\"${DATE_STR}\"
    export GIT_COMMITTER_DATE=\"${DATE_STR}\"
    ;;"
    
  COUNT=$((COUNT + 1))
done

FILTER_SCRIPT="${FILTER_SCRIPT}
esac"

echo "$FILTER_SCRIPT" > filter.sh
chmod +x filter.sh

# Run filter-branch
git filter-branch -f --env-filter "source ./filter.sh" -- --all

# Clean up
rm filter.sh

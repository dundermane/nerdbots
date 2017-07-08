IDS=$(git log -2 --format=oneline --reverse | cut -d" " -f1)
TO_ID=$(echo $IDS | cut -d" " -f1)
FROM_ID=$(echo $IDS | cut -d" " -f2)

echo "$FROM_ID $TO_ID master" | ./post-receive

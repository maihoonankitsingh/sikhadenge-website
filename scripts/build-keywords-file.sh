#!/usr/bin/env bash
set -euo pipefail

if [ $# -eq 0 ]; then
  cat seo-keywords/*.txt | sed '/^$/d' | sort -u > keywords.txt
else
  > keywords.txt
  for name in "$@"; do
    cat "seo-keywords/${name}.txt" >> keywords.txt
    printf "\n" >> keywords.txt
  done
  sed -i '/^$/d' keywords.txt
  sort -u keywords.txt -o keywords.txt
fi

echo "Built keywords.txt with $(wc -l < keywords.txt) keywords"

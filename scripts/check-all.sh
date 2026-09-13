#!/usr/bin/env bash

  set -euo pipefail
  
  here="$(dirname "$0")"

  if [ -z "${1:-}" ]; then
    file="sites.txt"
  else
    file="$1"
  fi
  if [ -f "$file" ]; then
    ok=0
    down=0
    > "$here/down.log"
    while IFS= read -r line; do
      case "$line" in ""|\#*)
        continue;;
      esac
      if "$here/check.sh" "$line"; then
        ok=$((ok+1))
      else
        down=$((down+1))
        echo "$line" >> "$here/down.log"
      fi
    done < "$file"
  else
    echo "Damn 找不到文件Bro: $file" >&2
    exit 2
  fi
  all=$((ok+down))
  echo "一共检查了'$all'个链接，OK数量为'$ok'个,DOWN为'$down'个"
  if [ "$ok" -eq "$all" ]; then
    echo "全部地址检测成功"
    exit 0
  else
    echo "存在部分或全部失败，详情请看 $here/down.log"
    exit 1
  fi

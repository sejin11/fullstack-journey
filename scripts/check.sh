#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 <url> [超时秒数]" >&2
  echo "Checks a URL with curl and reports OK or DOWN." >&2
}

if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
  usage
  exit 2
fi

url="$1"
timeout="${2:-5}"

code="$(curl -s -L -o /dev/null -w '%{http_code}' --max-time "$timeout" "$url")" || code="000"

#if [ "$code" = "200" ]; then
#  echo -e "$(date '+%F %T')\nOK: $url"
#  exit 0
#else
#  echo -e "$(date '+%F %T')\nDOWN: $url"
#  exit 1
#fi

case "$code" in
  2**)
    echo -e "$(date '+%T %F')\nOK: $url"
    exit 0
    ;;
  3**)
    echo -e "$(date '+%T %F')\nOK: $url"
    exit 0
    ;;
  *)
    echo -e "$(date '+%T %F')\nDOWN: $url"
    exit 1
    ;;
esac

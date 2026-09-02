#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 <url>" >&2
  echo "Checks a URL with curl and reports OK or DOWN." >&2
}

if [ "$#" -ne 1 ]; then
  usage
  exit 2
fi

url="$1"

code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 3 "$url")" || code="000"

if [ "$code" = "200" ]; then
  echo "OK: $url"
  exit 0
else
  echo "DOWN: $url"
  exit 1
fi


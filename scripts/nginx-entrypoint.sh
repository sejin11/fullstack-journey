#!/bin/sh
set -e

if [ -z "${NGINX_ENTRYPOINT_QUIET_LOGS:-}" ]; then
    exec 3>&1
else
    exec 3>/dev/null
fi

if [ "$1" = "nginx" ] || [ "$1" = "nginx-debug" ]; then
    if /usr/bin/find "/tmp/entrypoint.d/" -mindepth 1 -maxdepth 1 -type f -print -quit 2>/dev/null | read v; then
        echo >&3 "$0: 目录非空,开始配置"
        find "/tmp/entrypoint.d/" -follow -type f -print | sort -V | while read -r f; do
            case "$f" in
                *.envsh)
                    if [ -x "$f" ]; then . "$f"; else echo >&3 "$0: 忽略 $f"; fi
                    ;;
                *.sh)
                    if [ -x "$f" ]; then "$f"; else echo >&3 "$0: 忽略 $f"; fi
                    ;;
                *) echo >&3 "$0: 忽略 $f"; ;;
            esac
        done
        echo >&3 "$0: 配置完成,准备启动"
    else
        echo >&3 "$0: 目录为空,跳过配置"
    fi
fi

exec "$@"

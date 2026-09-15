#!/bin/bash

bdir="/tmp/backups/"

if [ ! -d "${bdir}" ]; then
  mkdir "${bdir}"
fi

if [ "$#" -ne 2 ]; then
    echo "error: Illegal number of parameters" >&2;
    exit 1
fi

if ! [[ -d $1 ]]; then
    echo "error: $1 is a not a directory" >&2; 
    exit 2
fi

re='^[0-9]+$'
if ! [[ $2 =~ $re ]] ; then
   echo "error: $2 Not a number" >&2; 
   exit 3
fi

srcdir="${1}"
bnum="$2"
bname=$(echo "${1}" | sed -r 's#/#-#g' | sed 's#^-##')
filename=${bname}-$(date '+%Y-%m-%d-%H%M%S').tar.gz

if ! tar --create --gzip --file="$bdir$filename" "${srcdir}" 2>/dev/null; then
    echo "error: failed to create backup of ${srcdir}" >&2
    exit 4
fi

find "$bdir" -name "${bname}*" -type f | sort > all.txt
total=$(wc -l < all.txt)

if [ "$bnum" -gt 0 ]; then
    keep=$((total - bnum))
    if [ "$keep" -gt 0 ]; then
        head -n "$keep" < all.txt | sed 's#.*#"&"#' | xargs rm -f
    fi  
else
    read -r -p "现在的操作会删除现存的共 $total 个备份，请再次确认是否要执行（默认为取消）[y/n]" ans     
    echo "你的输入是：[$ans]"
    case "$ans" in
        y|Y) echo "执行全部删除"
        find "$bdir" -name "${bname}*" -type f -delete ;;
        *) echo "删除操作取消" ;          
    esac
fi

exit 0
